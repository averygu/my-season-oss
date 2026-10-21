// ─────────────────────────────────────────────────────────────
// V2 · MVP 重设计 — 2026-06-10 朋友测试反馈驱动
// 论点：按使用频率重排版面 —— 高频(拍一条·10秒)独占首屏，
// 中频(两周剪一集)一屏，低频(回看一季)一屏。3 tab：今天/本集/本季。
// 每屏一个主行动；今天屏文字预算 ≤ 20 词；深度叙事退到「本季」二级入口。
// 见 NORTH_STAR §2 判断 5。
// ─────────────────────────────────────────────────────────────

const V2_KIND_GLYPH = { note: '「」', photo: '▣', voice: '≋', cast: '@' };

// 演示时间锚点：与 v1 首页「剪辑日 · 4 天后 · 周日晚」一致 → 演示中的"今天"是周三
const V2_TODAY = '周三';

function v2EpNo() { return `E${String(SEASON.episodeCurrent).padStart(2, '0')}`; }

// ── 三 tab 底栏（沿用 v1 TabBar 视觉语法，5 → 3）──────────────
function V2TabBar({ active, onPick, epLabel, seasonLabel }) {
  const tabs = [
    { id: 'today',   label: '今天', icon: '+' },
    { id: 'episode', label: '本集', icon: epLabel || v2EpNo() },
    { id: 'season',  label: '本季', icon: seasonLabel || `S${String(SEASON.number).padStart(2, '0')}` },
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
            padding: '6px 22px', color: on ? T.amber : T.ink3,
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

// ── 素材行（今天屏 / 本集屏共用的极简行）───────────────────────
function V2FragmentRow({ f, dim = false }) {
  const voiceDur = f.kind === 'voice' && f.alt
    ? (f.alt.includes('·') ? f.alt.split('·').pop().trim() : f.alt)
    : null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 0', borderTop: `0.5px solid ${T.lineSoft}`,
    }}>
      <span style={{
        fontFamily: T.mono, fontSize: 9, letterSpacing: 0.5,
        color: T.ink4, flexShrink: 0, width: 58,
      }}>{f.t}</span>
      <span style={{
        fontFamily: T.mono, fontSize: 10, color: dim ? T.ink4 : T.amber, flexShrink: 0,
      }}>{V2_KIND_GLYPH[f.kind] || '·'}</span>
      {f.kind === 'photo' && (
        <div style={{
          width: 24, height: 18, flexShrink: 0, borderRadius: 2,
          backgroundColor: T.amber,
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(27,26,23,0.08) 0 3px, rgba(27,26,23,0.00) 3px 6px)',
          opacity: dim ? 0.4 : 0.82,
          border: '0.5px solid rgba(27,26,23,0.12)',
        }} />
      )}
      <span style={{
        fontSize: 13, lineHeight: 1.5, color: T.ink2, minWidth: 0, flex: 1,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{f.body}</span>
      {voiceDur && (
        <Chip style={{ flexShrink: 0, opacity: dim ? 0.5 : 1 }}>{voiceDur}</Chip>
      )}
      {f.tag && <Chip style={{ flexShrink: 0 }}>{f.tag}</Chip>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 · 屏 1 「今天」 — 唯一的高频面：拍一条，10 秒，关掉
// ─────────────────────────────────────────────────────────────
function TodayPage() {
  const todays = E18_FRAGMENTS.filter(f => f.t.startsWith(V2_TODAY));
  const captureKinds = [
    { id: 'note', label: '记一句' },
    { id: 'photo', label: '拍一张' },
    { id: 'voice', label: '录一段' },
    { id: 'cast', label: '标人物' },
  ];
  const [captureOpen, setCaptureOpen] = React.useState(false);
  const [captureKind, setCaptureKind] = React.useState('note');
  const [draft, setDraft] = React.useState('');
  const saveDraft = () => {
    if (!draft.trim()) return;
    setDraft('');
    setCaptureOpen(false);
  };
  return (
    <Screen label="V2 今天">
      <TopBar
        left={<Meta>S01 · {v2EpNo()} · 拍摄中</Meta>}
        right={<Meta color={T.ink4}>第 11 天</Meta>}
      />

      {/* 一句话 pitch — v2 全部的产品解释 */}
      <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
        <div style={{
          fontFamily: T.serif, fontSize: 12.5, color: T.ink3, letterSpacing: 0.4,
        }}>把一年当一季剧 —— 随手拍，两周剪一集</div>
      </div>

      {/* 主行动 · 拍一条 */}
      <div style={{ padding: '30px 20px 0' }}>
        {!captureOpen ? (
          <button onClick={() => setCaptureOpen(true)} style={{
            display: 'block', width: '100%', cursor: 'pointer',
            background: 'linear-gradient(180deg, rgba(255,239,210,0.6), rgba(251,249,244,0.92))',
            border: `0.5px solid ${T.line}`, borderRadius: 6,
            padding: '48px 20px 30px', textAlign: 'center',
            boxShadow: '0 20px 48px rgba(27,26,23,0.09)',
          }}>
            <div style={{
              fontFamily: T.display, fontSize: 62, lineHeight: 1,
              color: T.amber, fontWeight: 500,
            }}>+</div>
            <div style={{
              fontFamily: T.serif, fontSize: 22, fontWeight: 600,
              color: T.ink, marginTop: 14, letterSpacing: 0.5,
            }}>拍一条</div>
            <div style={{ marginTop: 9 }}>
              <Meta color={T.ink3}>10 秒 · 存进 {v2EpNo()} RAW</Meta>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 8,
              marginTop: 24, flexWrap: 'wrap',
            }}>
              {captureKinds.map(k => (
                <Chip key={k.id} style={{ background: 'rgba(255,255,255,0.62)' }}>{k.label}</Chip>
              ))}
            </div>
          </button>
        ) : (
          <div style={{
            background: 'linear-gradient(180deg, rgba(255,239,210,0.55), rgba(251,249,244,0.96))',
            border: `0.5px solid ${T.line}`, borderRadius: 6,
            padding: '18px 16px 16px',
            boxShadow: '0 20px 48px rgba(27,26,23,0.09)',
          }}>
            <div style={{ display: 'flex', gap: 7, marginBottom: 12, flexWrap: 'wrap' }}>
              {captureKinds.map(k => {
                const on = k.id === captureKind;
                return (
                  <button key={k.id} onClick={() => setCaptureKind(k.id)} style={{
                    cursor: 'pointer', border: `0.5px solid ${on ? T.amber : T.lineSoft}`,
                    borderRadius: 999, padding: '6px 9px',
                    background: on ? 'rgba(200,105,43,0.14)' : 'rgba(255,255,255,0.58)',
                    color: on ? T.amber : T.ink3,
                    fontFamily: T.sans, fontSize: 11, lineHeight: 1,
                  }}>{k.label}</button>
                );
              })}
            </div>
            <textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="这一刻……"
              rows={3}
              style={{
                width: '100%', border: `0.5px solid ${T.line}`, borderRadius: 6,
                background: 'rgba(255,255,255,0.72)', padding: '11px 12px',
                fontFamily: T.serif, fontSize: 15, lineHeight: 1.55, color: T.ink,
                outline: 'none', resize: 'none',
              }}
            />
            <button onClick={saveDraft} disabled={!draft.trim()} style={{
              width: '100%', marginTop: 10, cursor: draft.trim() ? 'pointer' : 'default',
              background: draft.trim() ? T.amber : 'rgba(27,26,23,0.12)',
              color: draft.trim() ? '#FFF' : T.ink4,
              border: 'none', borderRadius: 6, padding: '12px 0',
              fontFamily: T.serif, fontSize: 15, fontWeight: 600, letterSpacing: 0.8,
            }}>存进 {v2EpNo()}</button>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 13 }}>
          <Meta color={T.ink4}>今天已拍 {todays.length} 条 · 共 {E18_FRAGMENTS.length} RAW</Meta>
        </div>
      </div>

      {/* 今天的素材（最多 2 条，零管理负担） */}
      <div style={{ padding: '34px 20px 0' }}>
        {todays.length === 0 ? (
          <div style={{
            borderTop: `0.5px solid ${T.lineSoft}`,
            padding: '13px 0 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div style={{
              fontFamily: T.serif, fontSize: 15, fontWeight: 600, color: T.ink2,
            }}>今天还没拍</div>
            <Meta color={T.ink4}>一句话就算一条</Meta>
          </div>
        ) : (
          todays.slice(-2).reverse().map((f, i) => <V2FragmentRow key={i} f={f} />)
        )}
      </div>

      {/* 节奏锚点 */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 96, textAlign: 'center' }}>
        <Meta color={T.ink4}>剪辑日 · 4 天后 · 周日晚</Meta>
      </div>

      <V2TabBar active="today" />
    </Screen>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 · 屏 2 「本集」 — 这两周攒了什么 + 剪辑日预告
// ─────────────────────────────────────────────────────────────
function EpisodeLitePage() {
  const rawCount = E18_FRAGMENTS.length;
  const isRawEmpty = rawCount === 0;
  const castTagged = new Set(
    E18_FRAGMENTS.filter(f => f.kind === 'cast' && f.tag).map(f => f.tag)
  ).size;
  return (
    <Screen label="V2 本集">
      <TopBar
        left={<Meta>S01 · {v2EpNo()}</Meta>}
        right={<Meta color={T.ink4}>第 11 天 / 14</Meta>}
      />

      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{
          fontFamily: T.serif, fontSize: 25, fontWeight: 600,
          color: T.ink, letterSpacing: 0.3,
        }}>这一集还在拍</div>
        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
          <Chip>{rawCount} RAW</Chip>
          <Chip>{castTagged} 人物</Chip>
          <Chip color={T.amber}>周日定剪</Chip>
        </div>
      </div>

      {/* 素材流 — 内容即版面 */}
      <div style={{ padding: '4px 20px 168px' }}>
        {isRawEmpty ? (
          <div style={{
            borderTop: `0.5px solid ${T.lineSoft}`,
            padding: '16px 0 0',
          }}>
            <div style={{
              border: `0.5px solid ${T.line}`,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.52)',
              padding: '15px 14px',
            }}>
              <Meta color={T.amber}>0 RAW · 可补拍</Meta>
              <div style={{
                marginTop: 8,
                fontFamily: T.serif,
                fontSize: 16,
                fontWeight: 600,
                color: T.ink,
              }}>还没有可剪素材</div>
              <div style={{ marginTop: 6 }}>
                <Meta color={T.ink4}>先拍一条；空集也可留作 bottle/off-season</Meta>
              </div>
            </div>
          </div>
        ) : (
          E18_FRAGMENTS.map((f, i) => <V2FragmentRow key={i} f={f} />)
        )}
      </div>

      {/* 剪辑日 CTA — 仪式预告，不提前开剪 */}
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 96, zIndex: 25 }}>
        <button style={{
          width: '100%', cursor: 'pointer',
          background: T.ink, color: T.darkInk,
          border: 'none', borderRadius: 6,
          padding: '15px 18px', textAlign: 'center',
          boxShadow: '0 18px 40px rgba(27,26,23,0.28)',
        }}>
          <div style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 600, letterSpacing: 0.5 }}>
            剪辑日 · 周日晚
          </div>
          <div style={{
            fontFamily: T.mono, fontSize: 9, letterSpacing: 1.4,
            marginTop: 5, opacity: 0.6,
          }}>{isRawEmpty ? '先拍一条素材 · 再亲手定剪' : '由你亲手剪成一集 · 不交给算法'}</div>
        </button>
      </div>

      <V2TabBar active="episode" />
    </Screen>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 · 屏 3 「本季」 — 一年的形状：海报 + 24 格 + 深度入口
// ─────────────────────────────────────────────────────────────
function SeasonLitePage() {
  const cur = SEASON.episodeCurrent;
  const total = SEASON.episodeTotal;
  const recent = EPISODES.slice(-6).reverse();
  const isRecentEmpty = recent.length === 0;
  const openCliffs = CLIFFHANGERS.filter(c => c.state === 'open').length;
  const entrances = [
    { label: '人物',   meta: `${CAST.length}` },
    { label: '主线',   meta: `${PLOTLINES.length}` },
    { label: '悬念',   meta: `${openCliffs} 未解决` },
    { label: '季终预览', meta: '如果现在结束' },
  ];
  return (
    <Screen label="V2 本季">
      {/* 紧凑海报 hero */}
      <div style={{ position: 'relative', height: 286, overflow: 'hidden' }}>
        <PosterPlaceholder h={286} hue={T.amber} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(244,240,232,0.06) 0%, rgba(244,240,232,0.55) 62%, #F4F0E8 100%)',
        }} />
        <div style={{ position: 'absolute', inset: 0, padding: '60px 20px 0' }}>
          <Meta>{SEASON.posterTagline}</Meta>
          <div style={{
            fontFamily: T.display, fontStyle: 'italic', fontWeight: 600,
            fontSize: 34, lineHeight: 1.18, color: T.ink, marginTop: 12,
          }}>{SEASON.zhTitle}</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <Meta color={T.amber}>SEASON {SEASON.year}</Meta>
            <Meta color={T.ink3}>{SEASON.arc}</Meta>
          </div>
        </div>
      </div>

      {/* 24 格进度 — 已剪的集染上各自的情绪色 */}
      <div style={{ padding: '6px 20px 0' }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const ep = EPISODES[i];
            const curr = n === cur;
            const done = n < cur && ep;
            const skipped = n < cur && !ep;
            const tint = done ? (MOODS[ep.mood]?.color || T.amber) : null;
            return (
              <div key={n} title={ep ? `E${n} ${ep.title}` : skipped ? `E${n} 漏录 · 可补` : `E${n}`} style={{
                flex: 1, height: 17, borderRadius: 1.5,
                background: curr ? T.amber : done ? tint : skipped ? 'rgba(27,26,23,0.08)' : 'transparent',
                opacity: done ? 0.55 : 1,
                border: `0.5px solid ${curr ? T.amber : skipped ? 'rgba(195,124,61,0.30)' : T.line}`,
              }} />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <Meta color={T.ink4}>JAN</Meta>
          <Meta color={T.amber}>{v2EpNo()} / {total}</Meta>
          <Meta color={T.ink4}>DEC</Meta>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Meta color={T.ink4}>漏录的集不破链 · 之后可补</Meta>
        </div>
      </div>

      {/* 海报墙 · 最近 6 集 */}
      <div style={{ padding: '30px 20px 0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
        }}>
          {isRecentEmpty ? (
            <div style={{
              gridColumn: '1 / -1', minHeight: 148, borderRadius: 4,
              border: `0.5px solid ${T.line}`,
              background: 'rgba(255,255,255,0.58)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.36)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 16, textAlign: 'center',
            }}>
              <div>
                <Meta color={T.amber}>0 已剪集</Meta>
                <div style={{
                  marginTop: 8, fontFamily: T.serif, fontSize: 17,
                  fontWeight: 600, color: T.ink,
                }}>还没有已剪的集</div>
                <div style={{
                  marginTop: 6, fontFamily: T.sans, fontSize: 11,
                  lineHeight: 1.5, color: T.ink3,
                }}>第一张海报会在你亲手定剪后出现</div>
              </div>
            </div>
          ) : recent.map(ep => {
            const mc = MOODS[ep.mood]?.color || T.amber;
            return (
              <div key={ep.n}>
                <div style={{
                  position: 'relative', height: 148, borderRadius: 4,
                  overflow: 'hidden', border: `0.5px solid ${T.line}`,
                }}>
                  <PosterPlaceholder hue={mc} dense />
                  <div style={{
                    position: 'absolute', inset: 0, padding: 9,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    <div style={{
                      fontFamily: T.mono, fontSize: 9, letterSpacing: 1.2, color: T.amber,
                    }}>E{String(ep.n).padStart(2, '0')}</div>
                    <div style={{
                      fontFamily: T.display, fontStyle: 'italic', fontWeight: 500,
                      fontSize: 11, lineHeight: 1.25, color: T.ink,
                    }}>{ep.title}</div>
                  </div>
                  {ep.current && (
                    <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${T.amber}` }} />
                  )}
                </div>
                <div style={{ marginTop: 6 }}>
                  <Meta color={mc} dot={mc}>{ep.mood}</Meta>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 深度入口 — v1 的人物/主线/悬念/季终全部收进这里 */}
      <div style={{ padding: '30px 20px 120px' }}>
        <Meta color={T.ink4} style={{ display: 'block', marginBottom: 4 }}>深入这一季</Meta>
        {entrances.map(e => (
          <div key={e.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '15px 0', borderBottom: `0.5px solid ${T.lineSoft}`,
            cursor: 'pointer',
          }}>
            <div style={{
              fontFamily: T.serif, fontSize: 16.5, fontWeight: 600, color: T.ink,
            }}>{e.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <Meta color={T.ink3}>{e.meta}</Meta>
              <span style={{ color: T.ink4, fontSize: 15 }}>›</span>
            </div>
          </div>
        ))}
      </div>

      <V2TabBar active="season" />
    </Screen>
  );
}

Object.assign(window, {
  TodayPage, EpisodeLitePage, SeasonLitePage, V2TabBar,
  V2FragmentRow, V2_KIND_GLYPH, v2EpNo,
});
