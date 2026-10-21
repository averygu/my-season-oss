// shared.jsx — design tokens, demo data, shared atoms for 我的这一季
// All exports are placed on window.

// ─────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────
const T = {
  // Surface — ChatGPT Atlas warm cream palette
  bg:       '#F4F0E8',         // base (warm cream)
  bg2:      '#FBF9F4',         // raised card (lighter cream)
  bg3:      '#EDE6D8',         // elevated / contrast band
  line:     'rgba(27,26,23,0.12)',
  lineSoft: 'rgba(27,26,23,0.06)',

  // Ink — deep warm charcoal (Atlas-style)
  ink:      '#1B1A17',
  ink2:     'rgba(27,26,23,0.70)',
  ink3:     'rgba(27,26,23,0.50)',
  ink4:     'rgba(27,26,23,0.30)',

  // Accents — readable on cream
  amber:    'oklch(0.62 0.16 55)',     // signature burnt amber
  amberDim: 'oklch(0.55 0.13 55)',
  wine:     'oklch(0.45 0.16 25)',     // deep wine
  teal:     'oklch(0.50 0.09 200)',
  sage:     'oklch(0.55 0.07 145)',
  rose:     'oklch(0.58 0.13 15)',
  violet:   'oklch(0.50 0.13 300)',

  // Status semantics
  open:     'oklch(0.62 0.16 55)',
  resolved: 'oklch(0.55 0.07 145)',
  abandoned:'oklch(0.55 0.03 30)',
  promoted: 'oklch(0.50 0.13 300)',

  // Inverse surface (for hero overlays / dark badges)
  dark:     '#1B1A17',
  darkInk:  '#F4F0E8',

  // Type
  serif:    '"Noto Serif SC", "Source Han Serif SC", "Songti SC", Georgia, serif',
  sans:     '"PingFang SC", "Helvetica Neue", -apple-system, system-ui, sans-serif',
  mono:     '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
  display:  '"Playfair Display", "Noto Serif SC", Georgia, serif',
};

// Mood vocabulary — tuned for cream background readability
const MOODS = {
  '温柔':       { color: 'oklch(0.62 0.10 25)' },
  '混乱':       { color: 'oklch(0.55 0.16 35)' },
  '尴尬':       { color: 'oklch(0.62 0.10 80)' },
  '反转':       { color: 'oklch(0.50 0.14 305)' },
  '暧昧':       { color: 'oklch(0.58 0.12 15)' },
  '崩溃':       { color: 'oklch(0.45 0.16 25)' },
  '治愈':       { color: 'oklch(0.55 0.09 145)' },
  '黑色幽默':   { color: 'oklch(0.40 0.04 30)' },
  '空白':       { color: 'oklch(0.55 0.03 250)' },
  '重启':       { color: 'oklch(0.62 0.16 55)' },
  '安静的进展': { color: 'oklch(0.55 0.08 200)' },
  '抽离':       { color: 'oklch(0.50 0.03 250)' },
};

// ─────────────────────────────────────────────────────────────
// Fictional demo persona and cast — 小宁, E18 / 24, Season 2026
// ─────────────────────────────────────────────────────────────
const SEASON = {
  year: 2026,
  title: 'Becoming Someone I Actually Like',
  zhTitle: '把自己活成我喜欢的样子',
  number: 1,
  episodeTotal: 24,
  episodeCurrent: 18,
  posterTagline: 'A LIFE SERIES BY 小宁',
  arc: 'ARC 03 · MIDSEASON CRISIS',
};

// 8 plot lines (前置 / 追溯 / abandoned 状态都有)
const PLOTLINES = [
  {
    id: 'product',
    name: '事业线',
    subtitle: '做出能上线的 AI App',
    status: 'pre',           // pre-declared
    state: 'active',
    heat: 0.78,
    ep: 'E03',
    last: 'E18',
    momentum: '+',
    pulse: '本周第三次重写 onboarding。开始相信 demo 周能交付。',
    color: 'amber',
    chart: [0.2,0.25,0.4,0.35,0.5,0.45,0.55,0.6,0.65,0.55,0.6,0.7,0.62,0.7,0.78,0.7,0.75,0.78],
  },
  {
    id: 'intimacy',
    name: '亲密关系线',
    subtitle: '重新学会靠近一个人',
    status: 'promoted',      // 追溯升级
    state: 'active',
    heat: 0.62,
    ep: 'E07',
    last: 'E17',
    promotedAt: 'E13',
    momentum: '~',
    pulse: '小岚在 E07 出场时被标为 filler。E13 停电那夜被追溯升级为隐线。',
    color: 'rose',
    chart: [0.3,0.32,0.3,0.4,0.45,0.55,0.6,0.5,0.55,0.65,0.62,0.7,0.68,0.62,0.55,0.6,0.62,0.62],
  },
  {
    id: 'body',
    name: '身体线',
    subtitle: '减肥 12 公斤',
    status: 'pre',
    state: 'abandoned',
    abandonedAt: 'E11',
    heat: 0.18,
    ep: 'E01',
    last: 'E11',
    pulse: '在 E11 主动归档为 abandoned — 替换为「身体感」这条新追溯线。',
    color: 'abandoned',
    chart: [0.5,0.55,0.6,0.55,0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.18,0.18,0.18,0.18,0.18,0.18,0.18],
  },
  {
    id: 'sense',
    name: '身体感线',
    subtitle: '不和身体对抗，听它说话',
    status: 'promoted',
    state: 'active',
    heat: 0.55,
    ep: 'E11',
    last: 'E18',
    promotedAt: 'E14',
    pulse: '从 abandoned 的减肥废墟里长出来。E14 第一次连续走路一周。',
    color: 'sage',
    chart: [0,0,0,0,0,0,0,0,0,0,0.2,0.25,0.3,0.35,0.42,0.48,0.52,0.55],
  },
  {
    id: 'roommate',
    name: '室友线',
    subtitle: '和小禾的边界',
    status: 'pre',
    state: 'crisis',
    heat: 0.42,
    ep: 'E02',
    last: 'E16',
    pulse: 'E16 客厅那场争吵后冷战。本集 E18 还没和解 — cliffhanger #02。',
    color: 'wine',
    chart: [0.4,0.5,0.55,0.6,0.62,0.65,0.6,0.55,0.5,0.55,0.6,0.62,0.55,0.45,0.32,0.4,0.42,0.42],
  },
  {
    id: 'mom',
    name: '生活线',
    subtitle: '搬家后的一顿聚餐',
    status: 'pre',
    state: 'dormant',
    heat: 0.28,
    ep: 'E04',
    last: 'E15',
    pulse: '搬家后一直没约上聚餐。大家的空闲时间还没对上，等一个新提议。',
    color: 'ink2',
    chart: [0.4,0.5,0.45,0.4,0.35,0.4,0.3,0.35,0.3,0.32,0.28,0.3,0.28,0.25,0.28,0.3,0.28,0.28],
  },
  {
    id: 'self',
    name: '自我认知线',
    subtitle: '我到底是不是那种「能做出来」的人',
    status: 'pre',
    state: 'active',
    heat: 0.66,
    ep: 'E01',
    last: 'E18',
    pulse: '本季最长的一条线。每一集都在被推进，只是大多时候是暗推。',
    color: 'teal',
    chart: [0.3,0.35,0.4,0.42,0.45,0.5,0.48,0.52,0.55,0.6,0.58,0.6,0.62,0.64,0.6,0.65,0.66,0.66],
  },
  {
    id: 'money',
    name: '金钱线',
    subtitle: '存款见底前必须有产出',
    status: 'pre',
    state: 'active',
    heat: 0.52,
    ep: 'E01',
    last: 'E18',
    pulse: '银行卡余额是这一季最沉默也最响的配角。',
    color: 'amberDim',
    chart: [0.7,0.68,0.65,0.62,0.6,0.58,0.55,0.55,0.52,0.5,0.5,0.48,0.5,0.52,0.5,0.52,0.52,0.52],
  },
];

// Cast — 9 角色
const CAST = [
  {
    id: 'A',
    name: '小岚',
    full: '小岚',
    role: '大学时的暧昧对象',
    tag: 'Plot Twist',
    status: 'ambiguous',     // 升温中 / 暧昧
    statusZh: '靠近中',
    debut: 'E07',
    appearances: [7,9,12,13,14,17],
    keywords: ['有趣', '边界感强', '不主动'],
    aiSummary: '触发你想要被看见、又怕被看穿的双重感受。出现频率与你的 self-doubt 曲线高度同步。',
    color: 'rose',
    promotedAt: 'E13',
  },
  {
    id: 'M',
    name: '小禾',
    full: '小禾',
    role: '合租两年的室友',
    tag: 'Mirror',
    status: 'crisis',
    statusZh: '裂痕中',
    debut: 'E01',
    appearances: [1,2,4,5,7,9,11,14,16,17],
    keywords: ['整洁', '回避冲突', '记仇'],
    aiSummary: '是你的镜子。你和她吵架的内容，往往是你和自己未解决的部分。',
    color: 'wine',
  },
  {
    id: 'K',
    name: '小川',
    full: '小川',
    role: '现在做投资人的旧朋友',
    tag: 'Mentor',
    status: 'stable',
    statusZh: '稳定',
    debut: 'E02',
    appearances: [2,5,8,11,15,18],
    keywords: ['冷静', '直接', '有信号'],
    aiSummary: '每次和你聊完你都会做一个具体决定。是这一季少数能持续推动主线的人。',
    color: 'teal',
  },
  {
    id: 'mom',
    name: '小棠',
    full: '小棠',
    role: '邻里朋友',
    tag: 'Open Loop',
    status: 'distant',
    statusZh: '待约中',
    debut: 'E01',
    appearances: [1,4,8,15],
    keywords: ['热心', '爱做饭', '等约时间'],
    aiSummary: '搬家后还没约成的一顿饭，把几个小片段连成了生活线。',
    color: 'amberDim',
  },
  {
    id: 'J',
    name: '小晴',
    full: '小晴',
    role: '私教',
    tag: 'Cameo',
    status: 'ended',
    statusZh: '已退场',
    debut: 'E03',
    appearances: [3,5,8,11],
    keywords: ['专业', '客气', '消失了'],
    aiSummary: '减肥线 abandoned 后她也自然退场。是这一季的第一个 closed loop。',
    color: 'abandoned',
  },
  {
    id: 'S',
    name: '小榆',
    full: '小榆',
    role: '远程认识的开发者',
    tag: 'Comfort',
    status: 'warm',
    statusZh: '稳定升温',
    debut: 'E06',
    appearances: [6,9,10,12,15,16,17,18],
    keywords: ['可靠', '同频', '没见过面'],
    aiSummary: '从未见面但出场最频繁。是事业线背后真正的支援者。',
    color: 'sage',
  },
  {
    id: 'X',
    name: '小野',
    full: '小野',
    role: '替补私教',
    tag: 'Cameo',
    status: 'stable',
    statusZh: '客串',
    debut: 'E12',
    appearances: [12,14,17],
    keywords: ['话少', '规律'],
    aiSummary: '接替小晴的课程，没有戏剧性，但维持了一条最低限度的身体线。',
    color: 'ink2',
  },
  {
    id: 'D',
    name: '小舟',
    full: '小舟',
    role: '旧邻居',
    tag: 'Stable',
    status: 'stable',
    statusZh: '稳定',
    debut: 'E04',
    appearances: [4,8,15],
    keywords: ['少话', '关键时刻在'],
    aiSummary: '是生活线里一直保持联系的朋友。',
    color: 'teal',
  },
  {
    id: 'N',
    name: '小夏',
    full: '小夏',
    role: '认识三个月的陌生熟人',
    tag: 'Chaos',
    status: 'unstable',
    statusZh: '失联中',
    debut: 'E10',
    appearances: [10,11,13],
    keywords: ['热情', '突然消失', '让你想太多'],
    aiSummary: '出现时强烈，离开时无声。E13 之后再无消息 — 是 cliffhanger #04。',
    color: 'violet',
  },
];

// Episodes — 18 done so far
const EPISODES = [
  { n: 1,  title: 'I Said I Would',                     mood: '重启',     w: 'W01' },
  { n: 2,  title: 'Two Days In, Already Behind',        mood: '混乱',     w: 'W03' },
  { n: 3,  title: 'The Gym Membership Defense',         mood: '反转',     w: 'W05' },
  { n: 4,  title: 'Dinner With My Neighbors',           mood: '温柔',     w: 'W07' },
  { n: 5,  title: 'Soft Launch of a New Me',            mood: '安静的进展', w: 'W09' },
  { n: 6,  title: 'Slack Notification at 2am',          mood: '治愈',     w: 'W11' },
  { n: 7,  title: 'Coffee, But Awkward',                mood: '尴尬',     w: 'W13', special: true },
  { n: 8,  title: 'A Walk That Actually Helped',        mood: '安静的进展', w: 'W15' },
  { n: 9,  title: 'I Texted First',                     mood: '暧昧',     w: 'W17' },
  { n: 10, title: 'Everyone New, No One Close',         mood: '空白',     w: 'W19' },
  { n: 11, title: 'I Quit Trying to Lose Weight',       mood: '黑色幽默', w: 'W21', special: true },
  { n: 12, title: 'Two Demos and a Crash',              mood: '混乱',     w: 'W23' },
  { n: 13, title: 'The Night the Lights Went Out',      mood: '暧昧',     w: 'W25', special: true },
  { n: 14, title: 'I Walked Every Day This Week',       mood: '治愈',     w: 'W27' },
  { n: 15, title: 'Dinner Plans, Still Pending',         mood: '抽离',     w: 'W29' },
  { n: 16, title: 'The Living Room Argument',           mood: '崩溃',     w: 'W31' },
  { n: 17, title: 'Working on It, Not Talking About It', mood: '安静的进展', w: 'W33' },
  { n: 18, title: 'I Almost Gave Up, Then Ordered Coffee', mood: '反转', w: 'W35', current: true },
];

// E18 fragments (拍摄模式收集到的素材，等待剪辑)
const E18_FRAGMENTS = [
  { t: '周一 09:12', kind: 'note',  body: '今天又一次想要把整个项目删掉重来。' },
  { t: '周一 14:40', kind: 'cast',  body: '和小川通电话 22 分钟。', tag: 'K' },
  { t: '周二 08:05', kind: 'photo', body: '楼下早餐摊', alt: 'breakfast cart, early light' },
  { t: '周二 23:11', kind: 'note',  body: '改完第三版 onboarding，发现自己居然没那么讨厌它。' },
  { t: '周三 11:30', kind: 'voice', body: '07:42 的语音', alt: 'voice memo · 7m 42s' },
  { t: '周三 19:50', kind: 'cast',  body: '收到小岚的一条消息，没回。', tag: 'A' },
  { t: '周四 07:01', kind: 'note',  body: '走了 4.2 公里。第一次不是为了减肥。' },
  { t: '周四 22:33', kind: 'note',  body: '小禾没出门吃饭。我也没问。' },
  { t: '周五 16:18', kind: 'note',  body: '差点点了「关闭项目」。然后出门买了一杯咖啡。' },
  { t: '周六 10:00', kind: 'photo', body: '工位 · 第三轮 demo 录制', alt: 'desk, second monitor, take 3' },
  { t: '周六 21:20', kind: 'cast',  body: '小榆帮我 review 了一整晚。', tag: 'S' },
  { t: '周日 09:45', kind: 'note',  body: '小棠发来聚餐邀请，还没定时间。' },
];

// Cliffhangers
const CLIFFHANGERS = [
  {
    id: 'mom-call',
    title: '和小棠约一次聚餐',
    since: 'E15',
    plot: 'mom',
    lastMove: '2 集前',
    weight: 'heavy',
    body: 'E15 搬家后约好聚餐。备选时间换了几次，还没有定下来。',
    stale: 7,
    state: 'open',
  },
  {
    id: 'm-cold',
    title: '和小禾的冷战',
    since: 'E16',
    plot: 'roommate',
    lastMove: '本集',
    weight: 'medium',
    body: 'E16 客厅争吵后还没说话。两个人都在等对方先。',
    stale: 2,
    state: 'open',
  },
  {
    id: 'a-message',
    title: '小岚发的那条消息',
    since: 'E17',
    plot: 'intimacy',
    lastMove: '本集',
    weight: 'light',
    body: '已读，没回。不是不想回，是不知道该用哪种语气。',
    stale: 1,
    state: 'open',
  },
  {
    id: 'n-ghosted',
    title: '小夏的突然消失',
    since: 'E13',
    plot: null,
    lastMove: '5 集前',
    weight: 'fading',
    body: '从 E13 之后再无消息。或许已经不重要了。',
    stale: 5,
    state: 'fading',
  },
  {
    id: 'product-launch',
    title: 'Demo 周到底定哪天',
    since: 'E14',
    plot: 'product',
    lastMove: '本集',
    weight: 'heavy',
    body: '已经推迟了两次。再推一次就不只是技术问题。',
    stale: 4,
    state: 'open',
  },
  {
    id: 'gym-card',
    title: '健身房年卡的 8 个月',
    since: 'E11',
    plot: 'body',
    lastMove: '7 集前',
    weight: 'closed',
    body: '在 E11 一起 abandoned。剩下的钱当作上一版自己的告别费。',
    stale: 7,
    state: 'abandoned',
  },
];

// Previously On — auto-generated weave
const PREVIOUSLY = [
  '过去三集你一直在准备 demo，同时和小禾处于沉默状态。',
  '你三次提到「想要重来」，AI 把它标为本季 reused theme。',
  '亲密关系线在 E17 出现一个微小的入口（小岚的消息），你没回。',
  '身体感线连续四集在缓慢上升 — 是这一季最稳定的一条线。',
];

// ─────────────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────────────

// Striped placeholder poster — for episode covers / cast portraits
function PosterPlaceholder({ w = '100%', h = '100%', label, sub, hue = T.amber, dense = false, vertical = false, style = {} }) {
  const stripeBg = `repeating-linear-gradient(${vertical ? '180deg' : '135deg'},
    rgba(27,26,23,0.05) 0 ${dense ? 6 : 14}px,
    rgba(27,26,23,0.00) ${dense ? 6 : 14}px ${dense ? 12 : 28}px)`;
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: hue,
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: stripeBg }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(120% 80% at 50% 110%, rgba(255,235,195,0.35) 0%, transparent 55%)`,
        mixBlendMode: 'overlay',
      }} />
      {label && (
        <div style={{
          position: 'absolute', left: 10, bottom: 8,
          fontFamily: T.mono, fontSize: 9, letterSpacing: 1.2,
          color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase',
        }}>
          {label}
          {sub && <div style={{ color: 'rgba(255,255,255,0.45)', marginTop: 2, letterSpacing: 0.6 }}>{sub}</div>}
        </div>
      )}
    </div>
  );
}

// Mono meta-text — small uppercase tag with optional dot
function Meta({ children, color = T.ink3, dot, style = {} }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
      textTransform: 'uppercase', color,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      ...style,
    }}>
      {dot && <span style={{
        width: 5, height: 5, borderRadius: '50%', background: dot,
        display: 'inline-block', flexShrink: 0,
      }} />}
      {children}
    </span>
  );
}

// Episode badge — like S01E18
function EpBadge({ ep, total, style = {} }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 11, letterSpacing: 1.5,
      color: T.amber,
      ...style,
    }}>S0{SEASON.number}·E{String(ep).padStart(2,'0')}{total ? `/${total}` : ''}</span>
  );
}

// Sparkline chart — used by plotlines
function Sparkline({ values, color = T.amber, w = 120, h = 30, current = null }) {
  if (!values || !values.length) return null;
  const max = Math.max(...values, 0.01);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - (v / max) * h * 0.9 - h * 0.05;
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const last = pts[pts.length - 1];
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <path d={d} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <circle cx={last[0]} cy={last[1]} r="2.2" fill={color} />
    </svg>
  );
}

// Section divider with mono caption
function SectionTitle({ kicker, children, action, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '0 20px', marginBottom: 12, ...style,
    }}>
      <div>
        {kicker && <Meta style={{ display: 'block', marginBottom: 4 }}>{kicker}</Meta>}
        <div style={{
          fontFamily: T.serif, fontSize: 19, fontWeight: 600,
          color: T.ink, letterSpacing: 0.2,
        }}>{children}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// AI insight card chrome — must look "structured", never "chat"
function AICard({ kicker = 'AI · 编剧室判断', children, accent = T.amber, style = {} }) {
  return (
    <div style={{
      position: 'relative',
      borderLeft: `2px solid ${accent}`,
      padding: '14px 16px 14px 18px',
      background: 'linear-gradient(90deg, rgba(255,239,210,0.55), rgba(255,239,210,0.10))',
      boxShadow: 'inset 0 0 0 0.5px rgba(27,26,23,0.06)',
      borderRadius: '0 12px 12px 0',
      ...style,
    }}>
      <Meta color={accent} style={{ marginBottom: 8, display: 'block' }}>{kicker}</Meta>
      <div style={{
        fontFamily: T.serif, fontSize: 15, lineHeight: 1.55,
        color: T.ink, letterSpacing: 0.1,
      }}>{children}</div>
    </div>
  );
}

// Tag chip
function Chip({ children, color = T.ink2, bg = 'rgba(27,26,23,0.05)', style = {} }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 9px', borderRadius: 100,
      fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1.2,
      textTransform: 'uppercase', color, background: bg,
      border: `0.5px solid ${T.line}`,
      ...style,
    }}>{children}</span>
  );
}

// Phone screen scaffold — dark surface with proper safe areas
function Screen({ children, label, scrollable = true }) {
  return (
    <div data-screen-label={label} style={{
      width: '100%', height: '100%', background: T.bg,
      color: T.ink, fontFamily: T.sans, position: 'relative',
      overflow: scrollable ? 'auto' : 'hidden',
    }}>
      {children}
    </div>
  );
}

// Top bar inside phone (after status bar) — mono kicker + glyph row
function TopBar({ left, right, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '52px 20px 0', position: 'relative', zIndex: 5,
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{left}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>{right}</div>
    </div>
  );
}

// Bottom tab bar — mono labels, no rounded chrome
function TabBar({ active = 'season', onPick }) {
  const tabs = [
    { id: 'season',  label: '本季',     icon: 'S' },
    { id: 'episode', label: '本集',     icon: 'E' },
    { id: 'cast',    label: '人物',     icon: 'C' },
    { id: 'plot',    label: '主线',     icon: 'P' },
    { id: 'cliff',   label: '悬念',     icon: '...' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 28, paddingTop: 10,
      background: 'linear-gradient(180deg, rgba(244,240,232,0) 0%, rgba(244,240,232,0.95) 35%, #F4F0E8 70%)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      zIndex: 30,
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onPick && onPick(t.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            padding: '6px 10px', color: on ? T.amber : T.ink3,
          }}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, letterSpacing: 1.4,
              fontWeight: on ? 600 : 400,
            }}>{t.icon}</div>
            <div style={{
              fontFamily: T.sans, fontSize: 9.5, letterSpacing: 0.6,
              fontWeight: on ? 600 : 400,
            }}>{t.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// Helper — get current Episode object
function getCurrentEp() { return EPISODES[SEASON.episodeCurrent - 1]; }
function getEp(n) { return EPISODES[n - 1]; }
function getPlot(id) { return PLOTLINES.find(p => p.id === id); }
function getCast(id) { return CAST.find(c => c.id === id); }

Object.assign(window, {
  T, MOODS, SEASON, PLOTLINES, CAST, EPISODES, E18_FRAGMENTS, CLIFFHANGERS, PREVIOUSLY,
  PosterPlaceholder, Meta, EpBadge, Sparkline, SectionTitle, AICard, Chip, Screen, TopBar, TabBar,
  getCurrentEp, getEp, getPlot, getCast,
});
