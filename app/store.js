// ─────────────────────────────────────────────────────────────
// M1 · 数据层 — localStorage 持久化 + 真实双周日历 + 导出/导入
// 纯 JS（无 JSX）：可被 app.html 直接加载，也可在 node 中做静态断言。
// 画布 index.html 不加载本文件 —— 演示数据与真实数据彻底分离。
// ─────────────────────────────────────────────────────────────

(function () {
  const STORE_KEY = 'my-season/v1';
  const MS_DAY = 86400000;

  // ── 真实日历：一年 24 集，从 1 月 1 日起每 14 天一集（M2 再精化边界仪式）──
  function yearStart(date) { return new Date(date.getFullYear(), 0, 1); }
  function dayOfYear(date) { return Math.floor((date - yearStart(date)) / MS_DAY); } // 0-based
  function epOfDate(date) {
    return Math.max(1, Math.min(24, Math.floor(dayOfYear(date) / 14) + 1));
  }
  function epDayOf(date) { return (dayOfYear(date) % 14) + 1; }              // 第 1–14 天
  function epDaysLeft(date) { return 14 - epDayOf(date); }                   // 剪辑日倒计时
  function epEndDate(date) {
    const ep = epOfDate(date);
    return new Date(yearStart(date).getTime() + (ep * 14 - 1) * MS_DAY);
  }
  function fmtMonthDay(date) { return `${date.getMonth() + 1}月${date.getDate()}日`; }
  function fmtFragTime(iso) {
    const d = new Date(iso);
    const wd = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()];
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${wd} ${hh}:${mm}`;
  }

  // ── 安全存储（无痕模式 / node 环境下降级为内存）─────────────────────
  const memoryStore = {};
  function storageGet() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return memoryStore[STORE_KEY] || null; }
  }
  function storageSet(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) { memoryStore[STORE_KEY] = v; }
  }

  // ── 状态 ────────────────────────────────────────────────────
  function seedState(now) {
    return {
      version: 1,
      createdAt: (now || new Date()).toISOString(),
      season: {
        year: (now || new Date()).getFullYear(),
        number: 1,
        zhTitle: '我的这一季',
        title: 'My Season',
        episodeTotal: 24,
      },
      fragments: [],  // { id, ts, kind: note|photo|voice|cast, body, tag?, ep }
      episodes: [],   // M4 剪辑日产物：{ n, title, mood, cutAt, fragmentIds }
    };
  }

  function validState(s) {
    return !!s && s.version === 1 && !!s.season &&
      Array.isArray(s.fragments) && Array.isArray(s.episodes);
  }

  let state = null;
  const listeners = new Set();

  function load() {
    if (state) return state;
    try {
      const raw = storageGet();
      const parsed = raw ? JSON.parse(raw) : null;
      state = validState(parsed) ? parsed : seedState();
    } catch (e) { state = seedState(); }
    return state;
  }
  function persist() { storageSet(JSON.stringify(state)); }
  function notify() { listeners.forEach((fn) => { try { fn(); } catch (e) {} }); }
  function setState(next) { state = next; persist(); notify(); }

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  const SeasonStore = {
    epOfDate, epDayOf, epDaysLeft, epEndDate, fmtMonthDay, fmtFragTime,

    get() { return load(); },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    addFragment(input) {
      const now = new Date();
      const cur = load();
      const currentEp = epOfDate(now);
      const ep = input.ep === undefined ? currentEp : input.ep;
      if (input.ep !== undefined && (!Number.isInteger(ep) || ep < 1 ||
          ep > cur.season.episodeTotal || ep >= currentEp ||
          cur.episodes.some((e) => e.n === ep))) return null;
      const f = {
        id: newId(),
        ts: now.toISOString(),
        kind: input.kind || 'note',
        body: String(input.body || '').trim(),
        ep,
      };
      if (input.tag) f.tag = String(input.tag).trim();
      if (!f.body && !f.tag) return null; // 空素材不入库
      setState(Object.assign({}, load(), { fragments: load().fragments.concat(f) }));
      return f;
    },

    removeFragment(id) {
      const cur = load();
      setState(Object.assign({}, cur, { fragments: cur.fragments.filter((f) => f.id !== id) }));
    },

    fragmentsOfEp(n) { return load().fragments.filter((f) => f.ep === n); },

    getEpisode(n) { return load().episodes.find((e) => e.n === n) || null; },

    // M4 · 剪辑日定剪：亲手取舍素材 + 命名 + 情绪。重复定剪同一集 = 重剪（替换）。
    cutEpisode(input) {
      const n = Number(input.n);
      const title = String(input.title || '').trim();
      const mood = String(input.mood || '').trim();
      const ids = Array.isArray(input.fragmentIds) ? input.fragmentIds.filter(Boolean) : [];
      if (!n || n < 1 || n > load().season.episodeTotal) return { ok: false, error: '集数无效' };
      if (!title) return { ok: false, error: '这一集还没有名字' };
      if (!mood) return { ok: false, error: '选一个情绪' };
      if (ids.length === 0) return { ok: false, error: '至少保留一条素材' };
      const ep = {
        n, title, mood,
        bottle: !!input.bottle,
        fragmentIds: ids,
        cutAt: new Date().toISOString(),
      };
      const cur = load();
      const others = cur.episodes.filter((e) => e.n !== n);
      setState(Object.assign({}, cur, { episodes: others.concat(ep).sort((a, b) => a.n - b.n) }));
      return { ok: true, episode: ep };
    },

    markOffSeason(n) {
      const epN = Number(n);
      const cur = load();
      if (!epN || epN < 1 || epN > cur.season.episodeTotal) return { ok: false, error: '集数无效' };
      if (cur.episodes.some((e) => e.n === epN)) return { ok: false, error: '这一集已有剪辑' };
      if (cur.fragments.some((f) => f.ep === epN)) return { ok: false, error: '已有素材，应进入补剪' };
      const ep = {
        n: epN,
        title: '安静的一集',
        mood: '空白',
        bottle: true,
        offSeason: true,
        fragmentIds: [],
        cutAt: new Date().toISOString(),
      };
      setState(Object.assign({}, cur, {
        episodes: cur.episodes.concat(ep).sort((a, b) => a.n - b.n),
      }));
      return { ok: true, episode: ep };
    },

    unmarkOffSeason(n) {
      const epN = Number(n);
      const cur = load();
      const ep = cur.episodes.find((e) => e.n === epN);
      if (!ep || !ep.offSeason) return { ok: false, error: '这一集不是空集' };
      setState(Object.assign({}, cur, {
        episodes: cur.episodes.filter((e) => e.n !== epN),
      }));
      return { ok: true };
    },
    fragmentsOfToday(now) {
      const d = (now || new Date());
      const key = d.toISOString().slice(0, 10);
      return load().fragments.filter((f) => String(f.ts).slice(0, 10) === key);
    },

    exportJSON() { return JSON.stringify(load(), null, 2); },
    importJSON(text) {
      try {
        const parsed = JSON.parse(text);
        if (!validState(parsed)) return { ok: false, error: '不是有效的 My Season 数据（version/结构不符）' };
        setState(parsed);
        return { ok: true };
      } catch (e) { return { ok: false, error: 'JSON 解析失败：' + e.message }; }
    },

    reset() { setState(seedState()); },
  };

  // ── React 绑定（仅浏览器 + React 存在时定义）────────────────────────
  function makeHook() {
    return function useSeasonStore() {
      return React.useSyncExternalStore(SeasonStore.subscribe, SeasonStore.get);
    };
  }

  if (typeof window !== 'undefined') {
    window.SeasonStore = SeasonStore;
    if (typeof React !== 'undefined') window.useSeasonStore = makeHook();
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SeasonStore, epOfDate, epDayOf, epDaysLeft, epEndDate, seedState };
  }
})();
