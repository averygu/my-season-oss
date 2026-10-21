// episode.jsx — Episode 详情 + 剪辑模式 (E18)

function EpisodeHero() {
  const ep = getCurrentEp();
  const moodColor = MOODS[ep.mood].color;
  return (
    <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
      {/* Episode poster art — color-blocked still + abstract scene */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(120% 80% at 80% 0%, oklch(0.58 0.14 50) 0%, transparent 55%),
          linear-gradient(160deg, ${moodColor} 0%, oklch(0.40 0.10 30) 100%)
        `,
      }} />
      <svg viewBox="0 0 390 440" preserveAspectRatio="xMidYMax slice" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
      }}>
        <defs>
          <linearGradient id="ep-cup" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,235,205,0.95)" />
            <stop offset="100%" stopColor="rgba(220,175,120,0.85)" />
          </linearGradient>
        </defs>
        {/* Window frame implying a cafe interior */}
        <rect x="20" y="80" width="170" height="240" fill="rgba(255,225,185,0.16)" />
        <rect x="20" y="80" width="170" height="240" fill="none" stroke="rgba(20,15,10,0.35)" strokeWidth="1.5" />
        <line x1="105" y1="80" x2="105" y2="320" stroke="rgba(20,15,10,0.35)" strokeWidth="1" />
        <line x1="20" y1="200" x2="190" y2="200" stroke="rgba(20,15,10,0.35)" strokeWidth="1" />
        {/* coffee cup silhouette, oversized poster prop */}
        <ellipse cx="290" cy="370" rx="74" ry="14" fill="rgba(20,15,10,0.45)" />
        <path d="M 230 250 L 350 250 L 340 360 Q 340 380 290 380 Q 240 380 240 360 Z" fill="url(#ep-cup)" />
        <path d="M 350 270 Q 380 280 380 310 Q 380 340 350 340" fill="none" stroke="rgba(255,235,205,0.95)" strokeWidth="6" />
        {/* steam */}
        <path d="M 270 230 Q 265 215 275 200 Q 285 185 278 170" fill="none" stroke="rgba(255,235,205,0.55)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 295 230 Q 300 215 290 200 Q 282 185 290 170" fill="none" stroke="rgba(255,235,205,0.45)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(8deg,
          rgba(255,235,200,0.04) 0 2px, rgba(0,0,0,0.04) 2px 4px)`,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 110,
        background: 'linear-gradient(180deg, rgba(20,15,10,0.55), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 220,
        background: 'linear-gradient(180deg, transparent 0%, rgba(244,240,232,0.55) 60%, #F4F0E8 100%)',
      }} />

      <div style={{ position: 'absolute', top: 56, left: 20, right: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{
          background: 'rgba(244,240,232,0.85)', border: `0.5px solid rgba(20,15,10,0.15)`,
          color: T.ink, fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          padding: '6px 11px', borderRadius: 100, cursor: 'pointer', fontWeight: 600,
        }}>‹ 本季</button>
        <span style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          color: 'rgba(255,245,225,0.95)', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', background: 'rgba(20,15,10,0.35)', borderRadius: 100,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F4D9A0' }} />
          {ep.mood.toUpperCase()}
        </span>
      </div>

      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 88 }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 2.2,
          color: '#F4D9A0', marginBottom: 14, fontWeight: 600,
        }}>S0{SEASON.number} · EPISODE {String(ep.n).padStart(2,'0')} · {ep.w}</div>
        <div style={{
          fontFamily: T.display, fontSize: 38, fontStyle: 'italic',
          fontWeight: 600, color: '#F8EFDD', lineHeight: 0.95,
          letterSpacing: -0.6, marginBottom: 10, textWrap: 'balance',
          textShadow: '0 2px 24px rgba(20,15,10,0.4)',
        }}>“{ep.title}”</div>
        <div style={{
          fontFamily: T.serif, fontSize: 14, color: 'rgba(248,239,221,0.78)',
        }}>「我差点放弃，然后下楼买了杯咖啡。」</div>
      </div>
    </div>
  );
}

function EditModeButton({ onOpen }) {
  const rawCount = E18_FRAGMENTS.length;
  return (
    <div style={{ padding: '20px', marginTop: -8 }}>
      <button onClick={onOpen} style={{
        width: '100%', cursor: 'pointer',
        background: T.amber, color: T.bg,
        border: 'none', borderRadius: 12,
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        boxShadow: '0 8px 24px rgba(27,26,23,0.08), 0 0 0 0.5px oklch(0.85 0.10 70)',
      }}>
        <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: T.mono, fontSize: 9, letterSpacing: 1.5,
            fontWeight: 700, marginBottom: 3, opacity: 0.7,
          }}>EDIT NIGHT · 周日晚 · 4 天后</div>
          <div style={{
            fontFamily: T.serif, fontSize: 16, fontWeight: 700,
          }}>进入剪辑模式</div>
          <div style={{
            fontFamily: T.sans, fontSize: 11, marginTop: 4, opacity: 0.78,
            lineHeight: 1.25,
          }}>{rawCount} 条 raw 素材 · 亲手定剪成 E18</div>
        </div>
        <div style={{
          fontFamily: T.mono, fontSize: 11, letterSpacing: 1.4,
          fontWeight: 700, flexShrink: 0,
        }}>{rawCount} FRAGMENTS</div>
      </button>
    </div>
  );
}

function CaptureEntryButton({ onOpen }) {
  return (
    <button onClick={onOpen} aria-label="进入拍摄模式" style={{
      position: 'absolute', right: 20, bottom: 92, zIndex: 40,
      cursor: 'pointer', border: `0.5px solid rgba(244,240,232,0.72)`,
      borderRadius: 100, background: T.dark, color: T.bg,
      padding: '10px 11px 10px 14px',
      display: 'flex', alignItems: 'center', gap: 9,
      boxShadow: '0 10px 28px rgba(27,26,23,0.16)',
    }}>
      <span style={{
        fontFamily: T.serif, fontSize: 13.5, fontWeight: 700,
      }}>拍摄</span>
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        display: 'grid', placeItems: 'center',
        background: T.amber, color: T.bg,
        fontFamily: T.mono, fontSize: 11, fontWeight: 700,
      }}>+1</span>
    </button>
  );
}

function FragmentList({ onCapture }) {
  const hasFragments = E18_FRAGMENTS.length > 0;
  return (
    <div style={{ padding: '0 20px', marginBottom: 32 }}>
      <SectionTitle
        kicker="拍摄模式 · RAW FOOTAGE"
        action={<Meta color={T.amber}>+ 新增</Meta>}
        style={{ padding: 0 }}
      >本集素材</SectionTitle>

      <div style={{
        background: T.bg2, borderRadius: 12,
        border: `0.5px solid ${T.line}`,
        padding: '4px 0',
      }}>
        {hasFragments ? E18_FRAGMENTS.map((f, i) => {
          const cast = f.tag ? getCast(f.tag) : null;
          return (
            <div key={i} style={{
              padding: '11px 16px',
              borderBottom: i < E18_FRAGMENTS.length - 1 ? `0.5px solid ${T.lineSoft}` : 'none',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{
                fontFamily: T.mono, fontSize: 9.5, letterSpacing: 0.8,
                color: T.ink3, width: 70, flexShrink: 0, paddingTop: 3,
              }}>{f.t}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {f.kind === 'note' && (
                  <div style={{
                    fontFamily: T.serif, fontSize: 14, color: T.ink,
                    lineHeight: 1.5,
                  }}>{f.body}</div>
                )}
                {f.kind === 'cast' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 24, height: 30, borderRadius: 3, overflow: 'hidden',
                      flexShrink: 0,
                    }}>
                      <PosterPlaceholder hue={T[cast?.color] || T.amber} label={f.tag} dense />
                    </div>
                    <div style={{
                      fontFamily: T.serif, fontSize: 14, color: T.ink2,
                    }}>{f.body}</div>
                  </div>
                )}
                {f.kind === 'photo' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 56, height: 42, borderRadius: 4, overflow: 'hidden',
                      flexShrink: 0,
                    }}>
                      <PosterPlaceholder hue={T.teal} label="IMG" dense />
                    </div>
                    <div>
                      <div style={{ fontFamily: T.serif, fontSize: 13, color: T.ink2 }}>{f.body}</div>
                      <div style={{ fontFamily: T.mono, fontSize: 9, color: T.ink4, marginTop: 2, letterSpacing: 0.6 }}>{f.alt}</div>
                    </div>
                  </div>
                )}
                {f.kind === 'voice' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 2.5,
                      height: 28, padding: '0 10px',
                      background: 'rgba(27,26,23,0.05)', borderRadius: 100,
                      border: `0.5px solid ${T.line}`,
                    }}>
                      {[3,7,5,9,4,8,6,10,5,7,4,6,3].map((h, j) => (
                        <div key={j} style={{
                          width: 1.5, height: h * 1.6, borderRadius: 1,
                          background: T.amberDim,
                        }} />
                      ))}
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.ink3, letterSpacing: 0.6 }}>
                      {f.alt}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }) : (
          <div style={{
            padding: '22px 18px 20px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <Meta color={T.amber}>0 RAW · 可随时补拍</Meta>
            <div style={{
              fontFamily: T.serif, fontSize: 17, color: T.ink,
              fontWeight: 600, lineHeight: 1.35,
            }}>这一集还没有素材</div>
            <div style={{
              fontFamily: T.sans, fontSize: 12.5, color: T.ink3,
              lineHeight: 1.55,
            }}>
              空白不是断链。先收一句话、一张图或一个人物标签，剪辑日再决定它有没有剧情重量。
            </div>
            <button onClick={onCapture} style={{
              alignSelf: 'flex-start', marginTop: 2, cursor: 'pointer',
              border: `0.5px solid rgba(218,150,80,0.32)`,
              background: 'rgba(218,150,80,0.12)', color: T.amber,
              borderRadius: 100, padding: '7px 12px',
              fontFamily: T.mono, fontSize: 10, letterSpacing: 1.1,
              fontWeight: 700,
            }}>拍摄 +1 RAW</button>
          </div>
        )}
      </div>

      {hasFragments && <div style={{ marginTop: 14 }}>
        <AICard kicker="AI · 编剧室 · 等剪辑日">
          这一集的素材里有 <span style={{ color: T.amber, fontWeight: 600 }}>3 次「想要重来」</span>，
          一次没定下时间的聚餐，以及一条没有回复的小岚消息。
          先把它们收成剪辑日的候选信号：可能指向 <span style={{ color: T.amber }}>反转</span>，
          也可能只是这集的背景噪音。最终剧情点等你亲手定剪。
        </AICard>
      </div>}
    </div>
  );
}

// Plot threads on this episode
function EpisodeThreads() {
  const advanced = [
    { id: 'product',  delta: '+12', why: '完成第三轮 demo', kind: 'advance' },
    { id: 'sense',    delta: '+5',  why: '走了 4.2 公里', kind: 'advance' },
    { id: 'intimacy', delta: '~',   why: '小岚的消息已读未回', kind: 'hover' },
    { id: 'mom',      delta: '–3',  why: '聚餐时间还没定', kind: 'recede' },
    { id: 'roommate', delta: '0',   why: '冷战延续', kind: 'frozen' },
  ];
  return (
    <div style={{ padding: '0 20px', marginBottom: 32 }}>
      <SectionTitle kicker="THIS EPISODE · 推进了什么" style={{ padding: 0 }}>主线动量</SectionTitle>
      <div style={{
        background: T.bg2, borderRadius: 12, border: `0.5px solid ${T.line}`,
        overflow: 'hidden',
      }}>
        {advanced.map((a, i) => {
          const p = getPlot(a.id);
          const c = T[p.color] || T.amber;
          const promoted = p.status === 'promoted';
          const origin = promoted ? `追溯 · ${p.promotedAt}` : `前置 · ${p.ep}`;
          const sym = a.kind === 'advance' ? '↑' : a.kind === 'recede' ? '↓' : a.kind === 'hover' ? '◦' : '—';
          const symColor = a.kind === 'advance' ? T.sage : a.kind === 'recede' ? T.wine : T.ink3;
          return (
            <div key={a.id} style={{
              padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < advanced.length - 1 ? `0.5px solid ${T.lineSoft}` : 'none',
            }}>
              <div style={{
                width: 24, textAlign: 'center', fontFamily: T.mono, fontSize: 14,
                color: symColor, fontWeight: 600,
              }}>{sym}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, minWidth: 0 }}>
                  <div style={{
                    flex: 1, minWidth: 0, fontFamily: T.serif, fontSize: 14, color: T.ink,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    flexShrink: 0, fontFamily: T.mono, fontSize: 9, letterSpacing: 0,
                    fontWeight: 600, color: promoted ? T.violet : T.ink3,
                    padding: '2px 6px', borderRadius: 100,
                    background: promoted ? 'rgba(120,80,180,0.10)' : 'rgba(27,26,23,0.04)',
                    border: `0.5px solid ${promoted ? 'rgba(120,80,180,0.24)' : T.lineSoft}`,
                  }}>
                    {origin}
                  </div>
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.ink3 }}>
                  {a.why}
                </div>
              </div>
              <div style={{
                fontFamily: T.mono, fontSize: 10, letterSpacing: 0.8,
                color: symColor, padding: '3px 8px',
                background: 'rgba(27,26,23,0.04)', borderRadius: 100,
                minWidth: 36, textAlign: 'center',
              }}>{a.delta}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const E18_ON_STAGE_CAST_IDS = ['K', 'A', 'S', 'M', 'mom'];

function getE18OnStageCast() {
  return E18_ON_STAGE_CAST_IDS.map(getCast);
}

function EpisodeCast() {
  const onstage = getE18OnStageCast();
  return (
    <div style={{ padding: '0 20px', marginBottom: 32 }}>
      <SectionTitle kicker={`ON STAGE · ${onstage.length} 角色`} style={{ padding: 0 }}>本集出场</SectionTitle>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
        {onstage.map(c => (
          <div key={c.id} style={{ flexShrink: 0, width: 64, textAlign: 'center' }}>
            <div style={{
              width: 64, height: 80, borderRadius: 4, overflow: 'hidden',
              border: `0.5px solid ${T.line}`,
            }}>
              <PosterPlaceholder hue={T[c.color]} label={c.id} dense />
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 12, color: T.ink, marginTop: 6 }}>{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Edit-mode modal — composing the episode card
function EditModeOverlay({ open, onClose }) {
  if (!open) return null;
  const ep = getCurrentEp();
  const onstage = getE18OnStageCast();
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(10,10,11,0.92)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      overflow: 'auto',
      animation: 'fadeIn .25s ease',
    }}>
      <div style={{ padding: '56px 20px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Meta color={T.amber}>EDIT NIGHT · E18</Meta>
          <button onClick={onClose} style={{
            background: 'rgba(244,240,232,0.10)', border: `0.5px solid rgba(244,240,232,0.20)`,
            color: T.bg, width: 32, height: 32, borderRadius: 100,
            fontFamily: T.mono, fontSize: 14, cursor: 'pointer',
          }}>✕</button>
        </div>

        <div style={{
          fontFamily: T.display, fontSize: 24, fontStyle: 'italic',
          color: T.bg, marginBottom: 4, fontWeight: 500,
        }}>“正在剪辑这一集”</div>
        <div style={{ fontFamily: T.sans, fontSize: 13, color: 'rgba(244,240,232,0.6)', marginBottom: 28 }}>
          5 个判断 · 你必须亲手做 · 不交给算法
        </div>

        {/* Step 1 — title */}
        <div style={{ marginBottom: 22 }}>
          <Meta color="rgba(244,240,232,0.7)" style={{ marginBottom: 8, display: 'block' }}>1 · 本集标题</Meta>
          <div style={{
            background: T.bg2, border: `0.5px solid ${T.line}`,
            borderRadius: 10, padding: '12px 14px',
            fontFamily: T.display, fontSize: 17, fontStyle: 'italic',
            color: T.ink, fontWeight: 500,
          }}>“I Almost Gave Up, Then Ordered Coffee”</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {['↻ 重生成', '“Coffee Saved Me, Briefly”', '“The Day I Didn\u2019t Quit”'].map((s, i) => (
              <Chip key={i} color={i === 0 ? T.amber : T.ink3} bg={i === 0 ? 'rgba(218,150,80,0.18)' : 'rgba(27,26,23,0.04)'}>
                {s}
              </Chip>
            ))}
          </div>
        </div>

        {/* Step 2 — synopsis */}
        <div style={{ marginBottom: 22 }}>
          <Meta color="rgba(244,240,232,0.7)" style={{ marginBottom: 8, display: 'block' }}>2 · 这一集发生了什么</Meta>
          <div style={{
            background: T.bg2, border: `0.5px solid ${T.line}`,
            borderRadius: 10, padding: '14px',
            fontFamily: T.serif, fontSize: 14, color: T.ink, lineHeight: 1.55,
          }}>
            又一次想要把整个项目删掉。改完第三版 onboarding 反而开始有点喜欢它。
            走了 4.2 公里，第一次不是为了减肥。小禾的冷战还在继续。小棠的聚餐还没定时间。
            周五差点点了「关闭项目」，最后下楼买了一杯咖啡。
          </div>
        </div>

        {/* Step 3 — cast */}
        <div style={{ marginBottom: 22 }}>
          <Meta color="rgba(244,240,232,0.7)" style={{ marginBottom: 8, display: 'block' }}>3 · 出场人物</Meta>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {onstage.map(c => (
              <div key={c.id} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: T.bg2, border: `0.5px solid ${T.line}`,
                padding: '5px 10px 5px 6px', borderRadius: 100,
              }}>
                <div style={{
                  width: 18, height: 22, borderRadius: 2, overflow: 'hidden',
                }}>
                  <PosterPlaceholder hue={T[c.color] || T.amber} dense />
                </div>
                <span style={{ fontFamily: T.serif, fontSize: 12, color: T.ink }}>{c.name}</span>
              </div>
            ))}
            <div style={{
              padding: '5px 10px',
              border: `0.5px dashed ${T.line}`, borderRadius: 100,
              fontFamily: T.mono, fontSize: 10, color: T.ink3, letterSpacing: 1,
            }}>+ 添加</div>
          </div>
        </div>

        {/* Step 4 — plotlines */}
        <div style={{ marginBottom: 22 }}>
          <Meta color="rgba(244,240,232,0.7)" style={{ marginBottom: 8, display: 'block' }}>4 · 推进了哪条主线</Meta>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'product', dir: '↑', sel: true,  c: T.amber },
              { id: 'sense', dir: '↑', sel: true, c: T.sage },
              { id: 'intimacy', dir: '◦', sel: true, c: T.rose },
              { id: 'mom', dir: '↓', sel: true, c: T.amberDim },
              { id: 'roommate', dir: '—', sel: false, c: T.wine },
            ].map(option => {
              const plot = getPlot(option.id);
              const promoted = plot?.status === 'promoted';
              const origin = promoted ? `追溯升级 · ${plot.promotedAt}` : `前置 · ${plot?.ep}`;
              return (
                <div key={option.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 8,
                  background: option.sel ? 'rgba(244,240,232,0.05)' : 'transparent',
                  border: `0.5px solid ${option.sel ? 'rgba(244,240,232,0.14)' : 'transparent'}`,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 100,
                    border: `1.5px solid ${option.sel ? option.c : 'rgba(244,240,232,0.30)'}`,
                    background: option.sel ? option.c : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: T.mono, fontSize: 11, color: T.bg, fontWeight: 700,
                  }}>{option.sel ? '✓' : ''}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: T.serif, fontSize: 14,
                      color: option.sel ? T.bg : 'rgba(244,240,232,0.50)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {plot?.name || option.id}
                    </div>
                    <div style={{
                      marginTop: 5, display: 'inline-flex', alignItems: 'center',
                      maxWidth: '100%', padding: '2px 6px', borderRadius: 100,
                      background: promoted ? 'rgba(120,80,180,0.20)' : 'rgba(244,240,232,0.06)',
                      border: `0.5px solid ${promoted ? 'rgba(216,180,254,0.42)' : 'rgba(244,240,232,0.12)'}`,
                      fontFamily: T.mono, fontSize: 9, letterSpacing: 0.8,
                      color: promoted ? 'rgba(216,180,254,0.95)' : 'rgba(244,240,232,0.48)',
                      fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {origin}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: T.mono, fontSize: 13, color: option.sel ? option.c : 'rgba(244,240,232,0.30)', fontWeight: 600,
                  }}>{option.dir}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 5 — mood + bottle */}
        <div style={{ marginBottom: 28 }}>
          <Meta color="rgba(244,240,232,0.7)" style={{ marginBottom: 8, display: 'block' }}>5 · 本集情绪基调</Meta>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {Object.keys(MOODS).map(m => {
              const sel = m === '反转';
              return (
                <div key={m} style={{
                  padding: '6px 11px', borderRadius: 100,
                  fontFamily: T.serif, fontSize: 13,
                  color: sel ? T.bg : 'rgba(244,240,232,0.70)',
                  background: sel ? MOODS[m].color : 'rgba(244,240,232,0.05)',
                  border: `0.5px solid ${sel ? 'transparent' : 'rgba(244,240,232,0.18)'}`,
                  fontWeight: sel ? 600 : 400,
                }}>{m}</div>
              );
            })}
          </div>
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 8,
            border: `0.5px dashed rgba(244,240,232,0.18)`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, border: `1px solid rgba(244,240,232,0.30)` }} />
            <div style={{ fontFamily: T.serif, fontSize: 13, color: 'rgba(244,240,232,0.70)', flex: 1 }}>
              标记为 <span style={{ color: T.bg }}>Bottle Episode</span>（无主线推进 · 也合法）
            </div>
          </div>
        </div>

        <button style={{
          width: '100%', padding: '15px',
          background: T.amber, color: T.bg, border: 'none', borderRadius: 12,
          fontFamily: T.serif, fontSize: 15, fontWeight: 700, cursor: 'pointer',
          letterSpacing: 0.5,
        }}>定剪 · 把 E18 收进 Season ›</button>

        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <Meta color="rgba(244,240,232,0.4)">剪辑由你完成 · 不交给算法</Meta>
        </div>
      </div>
    </div>
  );
}

function EpisodePage({ onNav }) {
  const [edit, setEdit] = React.useState(false);
  return (
    <Screen label="02 Episode 详情">
      <EpisodeHero />
      <EditModeButton onOpen={() => setEdit(true)} />
      <FragmentList onCapture={() => onNav && onNav('capture')} />
      <EpisodeThreads />
      <EpisodeCast />
      <div style={{ height: 100 }} />
      <TabBar active="episode" onPick={(id) => onNav && onNav(id)} />
      <CaptureEntryButton onOpen={() => onNav && onNav('capture')} />
      <EditModeOverlay open={edit} onClose={() => setEdit(false)} />
    </Screen>
  );
}

Object.assign(window, { EpisodePage });
