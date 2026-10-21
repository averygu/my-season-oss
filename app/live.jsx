// ─────────────────────────────────────────────────────────────
// M1 · Live 三屏 — 读写 SeasonStore 的真实可用版（app.html 专用）
// 与画布演示版（v2-mvp.jsx）同视觉语法、同组件原子；数据完全分离。
// M1 范围：记一句 / 标人物 落库 + 空状态 + 导出导入。photo/voice → M3，剪辑日 → M4。
// ─────────────────────────────────────────────────────────────

function liveEpNo(n) { return `E${String(n).padStart(2, '0')}`; }
function liveRow(f) {
  return { t: SeasonStore.fmtFragTime(f.ts), kind: f.kind, body: f.body, tag: f.tag };
}

// ── 拍一条 · 单层录入面（10 秒闭环）──────────────────────────────
function CaptureSheet({ open, onClose, epN, onSaved }) {
  const [body, setBody] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [error, setError] = React.useState('');
  if (!open) return null;
  const now = new Date();
  const ep = liveEpNo(epN === undefined ? SeasonStore.epOfDate(now) : epN);
  const canSave = body.trim().length > 0 || tag.trim().length > 0;
  const save = () => {
    if (!canSave) return;
    const f = SeasonStore.addFragment({ kind: tag.trim() ? 'cast' : 'note', body, tag: tag.trim() || undefined, ep: epN });
    if (!f) { setError('未保存：这一集已定剪或不可补录，文字仍保留。'); return; }
    setBody(''); setTag('');
    if (onSaved) onSaved(f);
    onClose();
  };
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(27,26,23,0.38)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.bg2, borderTop: `0.5px solid ${T.line}`,
        borderRadius: '14px 14px 0 0', padding: '18px 20px 34px',
        animation: 'fadeIn 0.18s ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <Meta color={T.amber}>{epN === undefined ? '+1 拍摄素材' : '补一条到'} · {ep}</Meta>
          <Meta color={T.ink4}>{SeasonStore.fmtFragTime(now.toISOString())}</Meta>
        </div>
        <textarea
          autoFocus
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={epN === undefined ? '这一刻……一句话就算一条' : '那时发生了什么……一句话就算一条'}
          rows={3}
          style={{
            width: '100%', border: `0.5px solid ${T.line}`, borderRadius: 6,
            background: 'rgba(255,255,255,0.7)', padding: '12px 14px',
            fontFamily: T.serif, fontSize: 16, lineHeight: 1.6, color: T.ink,
            outline: 'none', resize: 'none',
          }}
        />
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="@ 人物（可选）"
          style={{
            width: '100%', marginTop: 10, border: `0.5px solid ${T.line}`, borderRadius: 6,
            background: 'rgba(255,255,255,0.5)', padding: '10px 14px',
            fontFamily: T.sans, fontSize: 13, color: T.ink, outline: 'none',
          }}
        />
        {error && <div role="alert" style={{ color: T.wine, fontSize: 13, marginTop: 10 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={save} disabled={!canSave} style={{
            flex: 1, cursor: canSave ? 'pointer' : 'default',
            background: canSave ? T.amber : 'rgba(27,26,23,0.12)',
            color: canSave ? '#FFF' : T.ink4,
            border: 'none', borderRadius: 6, padding: '13px 0',
            fontFamily: T.serif, fontSize: 15, fontWeight: 600, letterSpacing: 1,
          }}>存进 {ep}</button>
          <button onClick={onClose} style={{
            cursor: 'pointer', background: 'transparent', color: T.ink3,
            border: `0.5px solid ${T.line}`, borderRadius: 6, padding: '13px 18px',
            fontFamily: T.sans, fontSize: 13,
          }}>取消</button>
        </div>
      </div>
    </div>
  );
}

// ── Live · 今天 ────────────────────────────────────────────────
function LiveTodayPage({ onCapture }) {
  const state = useSeasonStore();
  const now = new Date();
  const ep = SeasonStore.epOfDate(now);
  const epDay = SeasonStore.epDayOf(now);
  const daysLeft = SeasonStore.epDaysLeft(now);
  const todays = SeasonStore.fragmentsOfToday(now);
  return (
    <Screen label="Live 今天">
      <TopBar
        left={<Meta>S{String(state.season.number).padStart(2, '0')} · {liveEpNo(ep)} · 拍摄中</Meta>}
        right={<Meta color={T.ink4}>第 {epDay} / 14 天</Meta>}
      />
      <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: T.serif, fontSize: 12.5, color: T.ink3, letterSpacing: 0.4 }}>
          把一年当一季剧 —— 随手拍，两周剪一集
        </div>
      </div>

      <div style={{ padding: '30px 20px 0' }}>
        <button onClick={onCapture} style={{
          display: 'block', width: '100%', cursor: 'pointer',
          background: 'linear-gradient(180deg, rgba(255,239,210,0.6), rgba(251,249,244,0.92))',
          border: `0.5px solid ${T.line}`, borderRadius: 6,
          padding: '48px 20px 30px', textAlign: 'center',
          boxShadow: '0 20px 48px rgba(27,26,23,0.09)',
        }}>
          <div style={{ fontFamily: T.display, fontSize: 62, lineHeight: 1, color: T.amber, fontWeight: 500 }}>+</div>
          <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 600, color: T.ink, marginTop: 14, letterSpacing: 0.5 }}>拍一条</div>
          <div style={{ marginTop: 9 }}>
            <Meta color={T.ink3}>10 秒 · 存进 {liveEpNo(ep)} 素材</Meta>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            <Chip style={{ background: 'rgba(255,255,255,0.62)' }}>记一句</Chip>
            <Chip style={{ background: 'rgba(255,255,255,0.62)' }}>标人物</Chip>
          </div>
        </button>
        <div style={{ textAlign: 'center', marginTop: 13 }}>
          <Meta color={T.ink4}>今天已拍 {todays.length} 条 · 共 {state.fragments.length} 条素材</Meta>
        </div>
      </div>

      <div style={{ padding: '34px 20px 0' }}>
        {todays.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <Meta color={T.ink4}>今天还没拍 — 一句话就算一条</Meta>
          </div>
        ) : (
          todays.slice(-2).reverse().map((f) => <V2FragmentRow key={f.id} f={liveRow(f)} />)
        )}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, textAlign: 'center' }}>
        <Meta color={T.ink4}>
          剪辑日 · {daysLeft === 0 ? '就是今天' : `${daysLeft} 天后`} · {SeasonStore.fmtMonthDay(SeasonStore.epEndDate(now))}
        </Meta>
      </div>
    </Screen>
  );
}

// ── M4 · 剪辑日 Edit Night — 暗色剪辑室，三步取舍仪式 ─────────────
function EditNightOverlay({ epN, fragments, initial, onClose, onCut }) {
  const cream = (a) => `rgba(244,240,232,${a})`;
  const [kept, setKept] = React.useState(() => new Set(
    initial
      ? initial.fragmentIds.filter((id) => fragments.some((f) => f.id === id))
      : fragments.map((f) => f.id)
  ));
  const [title, setTitle] = React.useState(initial ? initial.title : '');
  const [mood, setMood] = React.useState(initial ? initial.mood : null);
  const [bottle, setBottle] = React.useState(initial ? !!initial.bottle : false);
  const [aiDraft, setAiDraft] = React.useState(null);
  const [aiState, setAiState] = React.useState({ status: 'idle', message: '' });
  const toggle = (id) => setKept((prev) => {
    const s = new Set(prev);
    if (s.has(id)) s.delete(id); else s.add(id);
    return s;
  });
  const canCut = title.trim().length > 0 && !!mood && kept.size > 0;
  const doCut = () => {
    if (!canCut) return;
    const r = SeasonStore.cutEpisode({
      n: epN, title, mood, bottle, fragmentIds: Array.from(kept),
    });
    if (r.ok) { onClose(); onCut && onCut(r.episode); }
  };
  const runRoughCut = async () => {
    setAiState({ status: 'loading', message: 'GPT-5.6 正在整理素材…' });
    try {
      const response = await fetch('/.netlify/functions/rough-cut', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ episode: epN, fragments: fragments.map(({ id, body, tag }) => ({ id, body, tag })) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '粗剪失败');
      setAiDraft(result.draft);
      setAiState({ status: 'ready', message: `${result.model} · 只提供候选，不替你定剪` });
    } catch (error) {
      setAiState({ status: 'error', message: `${error.message} · 手动剪辑仍可继续` });
    }
  };
  const kicker = (txt) => (
    <div style={{
      fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.6,
      color: 'oklch(0.72 0.14 55)', margin: '30px 0 12px',
    }}>{txt}</div>
  );
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 70,
      background: '#161512', color: cream(0.92), overflow: 'auto',
    }}>
      <div style={{ padding: '56px 20px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 1.6, color: 'oklch(0.72 0.14 55)' }}>
            EDIT NIGHT · {liveEpNo(epN)}
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: `0.5px solid ${cream(0.2)}`, borderRadius: 100,
            color: cream(0.65), fontSize: 12, padding: '4px 12px', cursor: 'pointer',
          }}>稍后再剪</button>
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 600, marginTop: 12 }}>
          {initial ? '重剪这一集' : '剪辑日'}
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.2, color: cream(0.45), marginTop: 8 }}>
          保留 {kept.size} / {fragments.length} · 划掉的不会删除，只是不入这一集
        </div>

        <div style={{ marginTop: 24, padding: '14px', border: `0.5px solid ${cream(0.16)}`, borderRadius: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: 'oklch(0.72 0.14 55)', letterSpacing: 1.3 }}>GPT-5.6 · AI 粗剪</div>
              <div style={{ fontSize: 11, color: cream(0.5), marginTop: 5 }}>场景分组 + 3 个标题 + 悬念证据</div>
            </div>
            <button onClick={runRoughCut} disabled={aiState.status === 'loading'} style={{
              border: `0.5px solid ${cream(0.25)}`, borderRadius: 100, padding: '7px 11px',
              background: cream(0.08), color: cream(0.82), cursor: 'pointer', fontSize: 11,
            }}>{aiState.status === 'loading' ? '整理中…' : aiDraft ? '重新粗剪' : '开始粗剪'}</button>
          </div>
          {aiState.status !== 'idle' && <div style={{ marginTop: 10, fontSize: 10.5, color: aiState.status === 'error' ? '#D99386' : cream(0.5) }}>{aiState.message}</div>}
          {aiDraft && (
            <div style={{ marginTop: 14 }}>
              {aiDraft.scenes.map((scene, i) => (
                <div key={i} style={{ borderTop: `0.5px solid ${cream(0.1)}`, padding: '9px 0' }}>
                  <div style={{ fontFamily: T.serif, fontSize: 13, color: cream(0.9) }}>{scene.name}</div>
                  <div style={{ fontSize: 10.5, lineHeight: 1.5, color: cream(0.48), marginTop: 3 }}>{scene.summary} · {scene.fragment_ids.length} 条证据</div>
                </div>
              ))}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 9 }}>
                {aiDraft.title_options.map((option) => (
                  <button key={option} onClick={() => setTitle(option)} style={{
                    border: `0.5px solid ${title === option ? 'oklch(0.72 0.14 55)' : cream(0.18)}`,
                    borderRadius: 100, padding: '6px 10px', background: 'transparent', color: cream(0.78), cursor: 'pointer', fontSize: 11,
                  }}>{option}</button>
                ))}
              </div>
              {aiDraft.cliffhanger_candidates.map((cliff, i) => (
                <div key={i} style={{ marginTop: 9, fontSize: 10.5, color: cream(0.55) }}>悬念 · {cliff.question} · {cliff.evidence_ids.length} 条证据</div>
              ))}
            </div>
          )}
        </div>

        {kicker('01 · 取舍素材')}
        <div>
          {fragments.map((f) => {
            const on = kept.has(f.id);
            return (
              <div key={f.id} onClick={() => toggle(f.id)} style={{
                display: 'flex', alignItems: 'baseline', gap: 10,
                padding: '11px 2px', cursor: 'pointer',
                borderTop: `0.5px solid ${cream(0.1)}`,
                opacity: on ? 1 : 0.34,
              }}>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: cream(0.4), flexShrink: 0, width: 58 }}>
                  {SeasonStore.fmtFragTime(f.ts)}
                </span>
                <span style={{
                  fontSize: 13, lineHeight: 1.5, color: cream(0.88), minWidth: 0, flex: 1,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{f.body}{f.tag ? ` @${f.tag}` : ''}</span>
                <span style={{
                  fontFamily: T.mono, fontSize: 11, flexShrink: 0,
                  color: on ? 'oklch(0.72 0.14 55)' : cream(0.3),
                }}>{on ? '✓' : '—'}</span>
              </div>
            );
          })}
        </div>

        {kicker('02 · 给这一集起名')}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="像剧集名一样起 — 一句话、一个画面"
          style={{
            width: '100%', background: cream(0.06), color: cream(0.92),
            border: `0.5px solid ${cream(0.16)}`, borderRadius: 6,
            padding: '13px 14px', fontFamily: T.serif, fontSize: 18, outline: 'none',
          }}
        />

        {kicker('03 · 这一集的情绪')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {Object.keys(MOODS).map((m) => {
            const on = mood === m;
            return (
              <button key={m} onClick={() => setMood(m)} style={{
                background: on ? cream(0.1) : 'transparent',
                border: `0.5px solid ${on ? (MOODS[m]?.color || cream(0.6)) : cream(0.16)}`,
                borderRadius: 100, color: on ? cream(0.95) : cream(0.55),
                padding: '7px 13px', fontSize: 12, cursor: 'pointer',
                fontFamily: T.sans, letterSpacing: 0.4,
              }}>{m}</button>
            );
          })}
        </div>

        <div onClick={() => setBottle(!bottle)} style={{
          marginTop: 26, padding: '12px 14px', cursor: 'pointer',
          border: `0.5px solid ${bottle ? 'oklch(0.72 0.14 55)' : cream(0.14)}`,
          borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        }}>
          <span style={{ fontSize: 12.5, color: cream(bottle ? 0.9 : 0.55) }}>
            这一集没有主线推进 — 安静的一集也合法
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.2, color: bottle ? 'oklch(0.72 0.14 55)' : cream(0.35) }}>
            BOTTLE
          </span>
        </div>

        <button onClick={doCut} disabled={!canCut} style={{
          width: '100%', marginTop: 30, padding: '15px 0',
          background: canCut ? T.amber : cream(0.08),
          color: canCut ? '#FFF' : cream(0.35),
          border: 'none', borderRadius: 6, cursor: canCut ? 'pointer' : 'default',
          fontFamily: T.serif, fontSize: 16, fontWeight: 600, letterSpacing: 1,
        }}>定剪 {liveEpNo(epN)} · {kept.size} 条入集</button>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, color: cream(0.4) }}>
            剪辑由你完成 · 不交给算法
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Live · 本集 ────────────────────────────────────────────────
function LiveEpisodePage({ onCut }) {
  const state = useSeasonStore();
  const now = new Date();
  const ep = SeasonStore.epOfDate(now);
  const frags = SeasonStore.fragmentsOfEp(ep);
  const people = new Set(frags.filter((f) => f.tag).map((f) => f.tag)).size;
  const cut = SeasonStore.getEpisode(ep);
  const params = new URLSearchParams(location.search);
  const previewEdit = params.has('editnight');
  const [editing, setEditing] = React.useState(params.get('editnight') === 'open');
  const onEditDay = SeasonStore.epDaysLeft(now) === 0;
  const editable = !cut && frags.length > 0 && (onEditDay || previewEdit);
  const moodColor = cut ? (MOODS[cut.mood]?.color || T.amber) : null;
  return (
    <Screen label="Live 本集">
      <TopBar
        left={<Meta>S{String(state.season.number).padStart(2, '0')} · {liveEpNo(ep)}</Meta>}
        right={<Meta color={T.ink4}>第 {SeasonStore.epDayOf(now)} / 14 天</Meta>}
      />
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{ fontFamily: T.serif, fontSize: 25, fontWeight: 600, color: T.ink, letterSpacing: 0.3 }}>
          {cut ? cut.title : '这一集还在拍'}
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cut ? (
            <React.Fragment>
              <Chip color={moodColor} style={{ borderColor: moodColor }}>{cut.mood}</Chip>
              <Chip>{cut.fragmentIds.length} 条入集</Chip>
              {cut.bottle && <Chip>BOTTLE</Chip>}
              <Chip color={T.ink3}>可继续补拍</Chip>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Chip>{frags.length} 条素材</Chip>
              <Chip>{people} 人物</Chip>
              <Chip color={T.amber}>{SeasonStore.fmtMonthDay(SeasonStore.epEndDate(now))} 定剪</Chip>
            </React.Fragment>
          )}
        </div>
      </div>

      <div style={{ padding: '4px 20px 168px' }}>
        {frags.length === 0 ? (
          <div style={{
            margin: '26px 0 0', padding: '30px 20px', textAlign: 'center',
            border: `0.5px dashed ${T.line}`, borderRadius: 6,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 1.4, color: T.ink4 }}>0 条素材</div>
            <div style={{ fontFamily: T.serif, fontSize: 14, color: T.ink2, marginTop: 8 }}>
              这一集还没素材 — 回「今天」拍第一条
            </div>
          </div>
        ) : (
          frags.map((f) => <V2FragmentRow key={f.id} f={liveRow(f)} dim={cut ? !cut.fragmentIds.includes(f.id) : false} />)
        )}
      </div>

      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 96, zIndex: 25 }}>
        {cut ? (
          <div style={{
            width: '100%', background: 'rgba(255,255,255,0.55)', border: `0.5px solid ${T.line}`,
            borderRadius: 6, padding: '13px 18px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 600, color: T.ink }}>
              已定剪 · {SeasonStore.fmtMonthDay(new Date(cut.cutAt))}
            </div>
            <div onClick={() => setEditing(true)} style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, marginTop: 5,
              color: T.ink3, cursor: 'pointer', textDecoration: 'underline',
            }}>重剪这一集</div>
          </div>
        ) : editable ? (
          <button onClick={() => setEditing(true)} style={{
            width: '100%', cursor: 'pointer', background: T.amber, color: '#FFF',
            border: 'none', borderRadius: 6, padding: '15px 18px', textAlign: 'center',
            boxShadow: '0 18px 40px rgba(27,26,23,0.28)',
          }}>
            <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 600, letterSpacing: 0.5 }}>
              开始剪辑 · 亲手定剪 {liveEpNo(ep)}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, marginTop: 5, opacity: 0.75 }}>
              {frags.length} 条素材 · 15–30 分钟
            </div>
          </button>
        ) : (
          <div style={{
            width: '100%', background: T.ink, color: T.darkInk,
            borderRadius: 6, padding: '15px 18px', textAlign: 'center', opacity: 0.92,
          }}>
            <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 600, letterSpacing: 0.5 }}>
              剪辑日 · {SeasonStore.fmtMonthDay(SeasonStore.epEndDate(now))}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4, marginTop: 5, opacity: 0.6 }}>
              {onEditDay && frags.length === 0 ? '今天是剪辑日 · 先拍一条才能剪' : '由你亲手剪成一集 · 到日点亮'}
            </div>
          </div>
        )}
      </div>

      {editing && (
        <EditNightOverlay
          epN={ep}
          fragments={frags}
          initial={cut}
          onClose={() => setEditing(false)}
          onCut={onCut}
        />
      )}
    </Screen>
  );
}

// ── Live · 本季 ────────────────────────────────────────────────
function LiveSeasonPage({ onCapture }) {
  const state = useSeasonStore();
  const now = new Date();
  const cur = SeasonStore.epOfDate(now);
  const total = state.season.episodeTotal;
  const fileRef = React.useRef(null);
  const [ioMsg, setIoMsg] = React.useState(null);
  const [editingEp, setEditingEp] = React.useState(null);
  const [viewingEp, setViewingEp] = React.useState(null);
  const [pastEp, setPastEp] = React.useState(null);

  const cutByN = Object.fromEntries(state.episodes.map((ep) => [ep.n, ep]));
  const fragsOf = (n) => state.fragments.filter((f) => f.ep === n);
  const openPastEpisode = (n) => {
    const cut = cutByN[n];
    if (n >= cur || cut) return;
    setIoMsg(null);
    setPastEp(n);
  };
  const markPastEmpty = (n) => {
    const r = SeasonStore.markOffSeason(n);
    if (r.ok) setPastEp(null);
    setIoMsg(r.ok
      ? { ok: true, text: `${liveEpNo(n)} 已标为空集` }
      : { ok: false, text: r.error });
  };

  const doExport = () => {
    const blob = new Blob([SeasonStore.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `my-season-${state.season.year}-backup.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setIoMsg({ ok: true, text: '已导出备份' });
  };
  const doImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const r = SeasonStore.importJSON(String(reader.result));
      setIoMsg(r.ok ? { ok: true, text: '已导入' } : { ok: false, text: r.error });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const dataRows = [
    { label: '导出 JSON', meta: '备份到文件', onClick: doExport },
    { label: '导入 JSON', meta: '从备份恢复', onClick: () => fileRef.current && fileRef.current.click() },
  ];
  const editingFrags = editingEp ? fragsOf(editingEp) : [];
  const reviewEp = viewingEp ? cutByN[viewingEp] : null;
  const reviewAllFrags = reviewEp ? fragsOf(reviewEp.n) : [];
  const reviewFrags = reviewEp
    ? reviewAllFrags.filter((f) => reviewEp.fragmentIds.includes(f.id))
    : [];
  const episodeStateLabel = (ep) => ep.offSeason ? '空集' : ep.mood;
  const seasonPosterLabel = (ep) => {
    if (ep.offSeason) return '空集';
    return ep.bottle ? `${ep.mood} · 无主线推进` : ep.mood;
  };
  const showsBottleState = (ep) => ep.bottle && !ep.offSeason;

  if (reviewEp) {
    const offSeason = !!reviewEp.offSeason;
    const mc = offSeason ? T.sage : (MOODS[reviewEp.mood]?.color || T.amber);
    return (
      <Screen label="Live 已剪回看">
        <div style={{ position: 'relative', height: 286, overflow: 'hidden' }}>
          <PosterPlaceholder h={286} hue={mc} dense />
          {offSeason && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(244,240,232,0.30)' }} />
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(244,240,232,0.05) 0%, rgba(244,240,232,0.34) 48%, #F4F0E8 100%)',
          }} />
          <button onClick={() => setViewingEp(null)} style={{
            position: 'absolute', left: 20, top: 52, cursor: 'pointer',
            background: 'rgba(251,249,244,0.72)', color: T.ink2,
            border: `0.5px solid ${T.line}`, borderRadius: 100,
            padding: '6px 11px', fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.1,
          }}>‹ 本季</button>
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 24 }}>
            <Meta color={mc}>EPISODE POSTER · {liveEpNo(reviewEp.n)}</Meta>
            <div style={{
              fontFamily: T.display, fontStyle: 'italic', fontWeight: 600,
              fontSize: 32, lineHeight: 1.08, color: T.ink, marginTop: 10,
            }}>{reviewEp.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              <Chip color={mc} style={{ borderColor: mc }}>{episodeStateLabel(reviewEp)}</Chip>
              <Chip>{reviewEp.fragmentIds.length} 条入集</Chip>
              {showsBottleState(reviewEp) && <Chip>无主线推进</Chip>}
              <Chip color={T.ink3}>{SeasonStore.fmtMonthDay(new Date(reviewEp.cutAt))} 定剪</Chip>
            </div>
          </div>
        </div>

        <div style={{ padding: '26px 20px 0' }}>
          <Meta color={T.ink4} style={{ display: 'block', marginBottom: 6 }}>入集素材</Meta>
          {reviewFrags.length === 0 ? (
            <div style={{
              marginTop: 12, padding: '24px 18px', textAlign: 'center',
              border: `0.5px dashed ${T.line}`, borderRadius: 6,
            }}>
              <div style={{ fontFamily: T.serif, fontSize: 14, color: T.ink2 }}>
                这一集没有入集素材
              </div>
              <div style={{ marginTop: 6 }}>
                <Meta color={T.ink4}>安静的一集也留在本季里</Meta>
              </div>
            </div>
          ) : (
            reviewFrags.map((f) => <V2FragmentRow key={f.id} f={liveRow(f)} />)
          )}
        </div>

        <div style={{ padding: '28px 20px 120px' }}>
          {offSeason ? (
            <button onClick={() => { SeasonStore.unmarkOffSeason(reviewEp.n); setViewingEp(null); }} style={{
              width: '100%', cursor: 'pointer',
              background: 'rgba(111,139,116,0.14)', color: T.ink,
              border: `0.5px solid ${T.sage}`, borderRadius: 6, padding: '14px 18px',
              fontFamily: T.serif, fontSize: 15, fontWeight: 600, letterSpacing: 0.5,
            }}>取消空集 · 这一集后来有事</button>
          ) : (
            <button onClick={() => setEditingEp(reviewEp.n)} disabled={reviewAllFrags.length === 0} style={{
              width: '100%', cursor: reviewAllFrags.length > 0 ? 'pointer' : 'default',
              background: reviewAllFrags.length > 0 ? T.ink : 'rgba(27,26,23,0.10)',
              color: reviewAllFrags.length > 0 ? T.darkInk : T.ink4,
              border: 'none', borderRadius: 6, padding: '14px 18px',
              fontFamily: T.serif, fontSize: 15, fontWeight: 600, letterSpacing: 0.5,
            }}>重剪这一集</button>
          )}
        </div>

        {editingEp && (
          <EditNightOverlay
            epN={editingEp}
            fragments={editingFrags}
            initial={cutByN[editingEp]}
            onClose={() => setEditingEp(null)}
            onCut={(ep) => {
              setEditingEp(null);
              setViewingEp(ep.n);
              setIoMsg({ ok: true, text: `${liveEpNo(ep.n)} 已重剪` });
            }}
          />
        )}
      </Screen>
    );
  }

  return (
    <Screen label="Live 本季">
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <PosterPlaceholder h={240} hue={T.amber} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(244,240,232,0.06) 0%, rgba(244,240,232,0.55) 62%, #F4F0E8 100%)',
        }} />
        <div style={{ position: 'absolute', inset: 0, padding: '56px 20px 0' }}>
          <Meta>SEASON {state.season.year}</Meta>
          <div style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 600,
            fontSize: 32, lineHeight: 1.18, color: T.ink, marginTop: 10,
          }}>{state.season.zhTitle}</div>
          <div style={{ marginTop: 10 }}>
            <Meta color={T.amber}>S{String(state.season.number).padStart(2, '0')} · {liveEpNo(cur)} / {total}</Meta>
          </div>
        </div>
      </div>

      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const curr = n === cur;
            const cut = cutByN[n];
            const frags = fragsOf(n);
            const past = n < cur;
            const recoverable = past && !cut;
            const tint = cut
              ? (cut.offSeason ? 'rgba(111,139,116,0.18)' : (MOODS[cut.mood]?.color || T.amber))
              : past
                ? (frags.length > 0 ? 'rgba(195,124,61,0.20)' : 'rgba(27,26,23,0.08)')
                : 'transparent';
            return (
              <button key={n} onClick={() => openPastEpisode(n)} disabled={!recoverable} aria-pressed={pastEp === n} title={
                recoverable
                  ? `${liveEpNo(n)} · 补素材 / ${frags.length > 0 ? '补剪' : '标为空集'}`
                  : liveEpNo(n)
              } style={{
                appearance: 'none', padding: 0,
                flex: 1, height: 17, borderRadius: 1.5,
                background: curr ? T.amber : tint,
                opacity: cut && !cut.offSeason ? 0.55 : 1,
                border: `0.5px solid ${curr ? T.amber : recoverable ? 'rgba(195,124,61,0.38)' : T.line}`,
                cursor: recoverable ? 'pointer' : 'default',
              }} />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <Meta color={T.ink4}>JAN</Meta>
          <Meta color={T.amber}>{liveEpNo(cur)} / {total}</Meta>
          <Meta color={T.ink4}>DEC</Meta>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Meta color={T.ink4}>点过去未剪格 · 补素材、补剪或标为空集</Meta>
        </div>
        {pastEp && !cutByN[pastEp] && (
          <div style={{ marginTop: 16, padding: 14, background: T.bg2, border: `0.5px solid ${T.line}`, borderRadius: 6 }}>
            <Meta color={T.amber}>{liveEpNo(pastEp)} · {fragsOf(pastEp).length} 条素材</Meta>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {[
                { label: '补一条', color: T.amber, action: () => onCapture(pastEp) },
                fragsOf(pastEp).length > 0
                  ? { label: '补剪', color: T.ink, action: () => { setEditingEp(pastEp); setPastEp(null); } }
                  : { label: '标为空集', color: T.sage, action: () => markPastEmpty(pastEp) },
                { label: '取消', color: T.ink3, action: () => setPastEp(null) },
              ].map((a) => <button key={a.label} onClick={a.action} style={{ flex: 1, minHeight: 44, border: `0.5px solid ${T.line}`, borderRadius: 6, background: a.color === T.amber ? T.amber : 'transparent', color: a.color === T.amber ? T.bg2 : a.color, fontFamily: T.sans, fontSize: 13, cursor: 'pointer' }}>{a.label}</button>)}
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Meta color={T.ink4}>已拍 {state.fragments.length} 条拍摄素材 · 已剪 {state.episodes.length} 集</Meta>
        </div>
      </div>

      <div style={{ padding: '26px 20px 0' }}>
        {state.episodes.length === 0 ? (
          <div style={{
            padding: '26px 20px', textAlign: 'center',
            border: `0.5px dashed ${T.line}`, borderRadius: 6,
          }}>
            <div style={{ fontFamily: T.serif, fontSize: 14, color: T.ink2 }}>还没有已剪的集</div>
            <div style={{ marginTop: 6 }}>
              <Meta color={T.ink4}>第一个剪辑日 · {SeasonStore.fmtMonthDay(SeasonStore.epEndDate(now))}</Meta>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {state.episodes.slice(-6).reverse().map((ep) => {
              const offSeason = !!ep.offSeason;
              const mc = offSeason ? T.sage : (MOODS[ep.mood]?.color || T.amber);
              return (
                <button key={ep.n} onClick={() => setViewingEp(ep.n)} style={{
                  appearance: 'none', border: 'none', background: 'transparent',
                  width: '100%', padding: 0, textAlign: 'left', cursor: 'pointer',
                }}>
                  <div style={{
                    position: 'relative', height: 148, borderRadius: 4,
                    overflow: 'hidden', border: `0.5px solid ${offSeason ? T.sage : T.line}`,
                  }}>
                    <PosterPlaceholder hue={mc} dense />
                    {offSeason && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(244,240,232,0.28)',
                      }} />
                    )}
                    <div style={{
                      position: 'absolute', inset: 0, padding: 9,
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                      <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1.2, color: T.amber }}>
                        {liveEpNo(ep.n)}
                      </div>
                      <div style={{
                        fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                        fontSize: 11, lineHeight: 1.25, color: T.ink,
                      }}>{ep.title}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <Meta color={mc} dot={mc}>
                      {seasonPosterLabel(ep)}
                    </Meta>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ padding: '28px 20px 120px' }}>
        <Meta color={T.ink4} style={{ display: 'block', marginBottom: 4 }}>数据</Meta>
        {dataRows.map((r) => (
          <div key={r.label} onClick={r.onClick} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '15px 0', borderBottom: `0.5px solid ${T.lineSoft}`, cursor: 'pointer',
          }}>
            <div style={{ fontFamily: T.serif, fontSize: 16.5, fontWeight: 600, color: T.ink }}>{r.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <Meta color={T.ink3}>{r.meta}</Meta>
              <span style={{ color: T.ink4, fontSize: 15 }}>›</span>
            </div>
          </div>
        ))}
        {ioMsg && (
          <div style={{ marginTop: 12 }}>
            <Meta color={ioMsg.ok ? T.sage : T.wine}>{ioMsg.text}</Meta>
          </div>
        )}
        <input ref={fileRef} type="file" accept=".json,application/json" onChange={doImport} style={{ display: 'none' }} />
      </div>
      {editingEp && (
        <EditNightOverlay
          epN={editingEp}
          fragments={editingFrags}
          initial={cutByN[editingEp]}
          onClose={() => setEditingEp(null)}
          onCut={(ep) => {
            setEditingEp(null);
            setIoMsg({ ok: true, text: `${liveEpNo(ep.n)} 已补剪` });
          }}
        />
      )}
    </Screen>
  );
}

// ── Live App 壳 — 3 tab 导航 + 拍摄 sheet ───────────────────────
function LiveApp() {
  const initialTab = (() => {
    const t = new URLSearchParams(location.search).get('tab');
    return ['today', 'episode', 'season'].includes(t) ? t : 'today';
  })();
  const [tab, setTab] = React.useState(initialTab);
  const [capturing, setCapturing] = React.useState(null);
  const [captureNotice, setCaptureNotice] = React.useState('');
  React.useEffect(() => {
    if (!captureNotice) return;
    const timer = setTimeout(() => setCaptureNotice(''), 3000);
    return () => clearTimeout(timer);
  }, [captureNotice]);
  const state = useSeasonStore();
  const now = new Date();
  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto',
      height: '100dvh', background: T.bg, overflow: 'hidden',
      fontFamily: T.sans, color: T.ink,
    }}>
      {tab === 'today' && <LiveTodayPage onCapture={() => setCapturing({})} />}
      {tab === 'episode' && <LiveEpisodePage onCut={() => setTab('season')} />}
      {tab === 'season' && <LiveSeasonPage onCapture={(ep) => setCapturing({ ep })} />}
      <V2TabBar
        active={tab}
        onPick={setTab}
        epLabel={liveEpNo(SeasonStore.epOfDate(now))}
        seasonLabel={`S${String(state.season.number).padStart(2, '0')}`}
      />
      {captureNotice && <div role="status" style={{ position: 'absolute', bottom: 92, left: 20, right: 20, padding: 12, borderRadius: 6, background: T.ink, color: T.bg2, textAlign: 'center', fontSize: 13, pointerEvents: 'none', zIndex: 55 }}>{captureNotice}</div>}
      {capturing && <CaptureSheet key={capturing.ep || 'today'} open epN={capturing.ep} onClose={() => setCapturing(null)} onSaved={(f) => setCaptureNotice(`已存进 ${liveEpNo(f.ep)}`)} />}
    </div>
  );
}

Object.assign(window, { LiveApp, LiveTodayPage, LiveEpisodePage, LiveSeasonPage, CaptureSheet, EditNightOverlay });
