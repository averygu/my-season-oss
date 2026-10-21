// season-home.jsx — 主页：Season Dashboard
// 流媒体首映风格 hero + Continue this Episode + 主线状态 + Cast 缩略 + Cliffhangers + Previously On

// Streaming-style poster — large block of color, oversized title, name-on-marquee.
// Looks like a Netflix / A24 first-frame splash.
function SeasonRhythmStrip() {
  const beats = ['24 集', '两周一集', '拍摄 → 剪辑'];
  return (
    <div style={{
      position: 'absolute', left: 22, right: 22, bottom: 72,
      display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1.35fr',
      alignItems: 'center', gap: 8,
      padding: '8px 10px',
      background: 'rgba(251,249,244,0.76)',
      border: `0.5px solid rgba(27,26,23,0.14)`,
      borderRadius: 8,
      boxShadow: '0 8px 22px rgba(27,26,23,0.10)',
      backdropFilter: 'blur(10px)',
    }}>
      {beats.map((beat, i) => (
        <React.Fragment key={beat}>
          {i > 0 && (
            <span style={{
              width: 3, height: 3, borderRadius: '50%',
              background: i === 2 ? T.amber : T.ink4,
            }} />
          )}
          <span style={{
            fontFamily: T.mono,
            fontSize: i === 2 ? 10 : 9.5,
            letterSpacing: i === 2 ? 0.8 : 1.1,
            color: i === 2 ? T.ink : T.ink2,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>{beat}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function HeroPoster() {
  return (
    <div style={{ position: 'relative', height: 540, overflow: 'hidden' }}>
      {/* Poster art — saturated sunset gradient, faux-still */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(120% 70% at 30% 110%, oklch(0.72 0.18 50) 0%, transparent 55%),
          radial-gradient(100% 80% at 80% 20%, oklch(0.55 0.18 25) 0%, transparent 55%),
          linear-gradient(180deg, oklch(0.45 0.14 30) 0%, oklch(0.62 0.16 55) 100%)
        `,
      }} />
      {/* Poster grain — thin diagonal stripes */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(8deg,
          rgba(255,235,200,0.04) 0 2px,
          rgba(0,0,0,0.04) 2px 4px)`,
      }} />
      {/* Subject silhouette — abstract back-of-head against horizon */}
      <svg viewBox="0 0 390 540" preserveAspectRatio="xMidYMax slice" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
      }}>
        <defs>
          <linearGradient id="silh" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(20,15,10,0.0)" />
            <stop offset="60%" stopColor="rgba(20,15,10,0.35)" />
            <stop offset="100%" stopColor="rgba(20,15,10,0.85)" />
          </linearGradient>
          <linearGradient id="sun" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,225,180,0.85)" />
            <stop offset="100%" stopColor="rgba(255,200,140,0.0)" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="200" r="62" fill="url(#sun)" opacity="0.9" />
        <circle cx="280" cy="200" r="40" fill="rgba(255,238,210,0.55)" />
        {/* horizon */}
        <rect x="0" y="360" width="390" height="180" fill="rgba(20,15,10,0.55)" />
        {/* shoulder + head silhouette, off-center */}
        <path d="M 60 540 L 60 440 Q 60 380 130 365 Q 175 357 175 320 Q 175 280 215 280 Q 250 282 250 322 Q 252 360 295 372 Q 360 388 360 450 L 360 540 Z"
          fill="url(#silh)" opacity="0.95" />
      </svg>

      {/* Top scrim for status bar legibility */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 130,
        background: 'linear-gradient(180deg, rgba(20,15,10,0.55) 0%, rgba(20,15,10,0) 100%)',
      }} />
      {/* Bottom scrim — fades into cream page background */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 240,
        background: 'linear-gradient(180deg, rgba(244,240,232,0) 0%, rgba(244,240,232,0.55) 60%, #F4F0E8 100%)',
      }} />

      {/* Top meta row — below dynamic island */}
      <div style={{
        position: 'absolute', top: 56, left: 20, right: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          color: 'rgba(255,245,225,0.95)', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F4D9A0' }} />
          SEASON 0{SEASON.number} · 2026
        </span>
        <span style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          color: 'rgba(255,245,225,0.85)', textTransform: 'uppercase',
        }}>{SEASON.arc}</span>
      </div>

      {/* Streaming-style poster title block */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 110,
        padding: '0 22px',
      }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5,
          color: '#F4D9A0', marginBottom: 16, fontWeight: 600,
        }}>{SEASON.posterTagline}</div>

        {/* Big poster title — Playfair, oversized */}
        <div style={{
          fontFamily: T.display, fontSize: 64, lineHeight: 0.92,
          fontWeight: 700, color: '#F8EFDD', letterSpacing: -2.2,
          marginBottom: 6, textShadow: '0 2px 24px rgba(20,15,10,0.35)',
        }}>我的</div>
        <div style={{
          fontFamily: T.display, fontSize: 64, lineHeight: 0.92,
          fontWeight: 700, color: '#F8EFDD', letterSpacing: -2.2,
          marginBottom: 18, fontStyle: 'italic', textShadow: '0 2px 24px rgba(20,15,10,0.35)',
        }}>这一季<span style={{ color: '#F4D9A0' }}>.</span></div>

        <div style={{
          fontFamily: T.display, fontSize: 14, fontStyle: 'italic',
          color: 'rgba(248,239,221,0.82)', letterSpacing: 0.3, marginBottom: 4,
          fontWeight: 400,
        }}>“{SEASON.title}”</div>
        <div style={{
          fontFamily: T.serif, fontSize: 13, color: 'rgba(248,239,221,0.65)',
          marginBottom: 10,
        }}>—— {SEASON.zhTitle}</div>
      </div>

      <SeasonRhythmStrip />

      {/* Episode counter rail — sits in the cream fade-zone for contrast */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 28,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          color: T.ink, fontWeight: 600,
        }}>EP {String(SEASON.episodeCurrent).padStart(2,'0')}</span>
        <div style={{ flex: 1, height: 2, background: 'rgba(27,26,23,0.15)', position: 'relative', borderRadius: 1 }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${(SEASON.episodeCurrent / SEASON.episodeTotal) * 100}%`,
            background: T.amber, borderRadius: 1,
          }} />
          {[6, 12, 18].map(n => (
            <div key={n} style={{
              position: 'absolute',
              left: `${(n / SEASON.episodeTotal) * 100}%`,
              top: -3, width: 1.5, height: 8,
              background: n <= SEASON.episodeCurrent ? T.amber : T.ink4,
            }} />
          ))}
        </div>
        <span style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          color: T.ink3,
        }}>OF {SEASON.episodeTotal}</span>
      </div>
    </div>
  );
}

function ContinueEpisode({ onOpen, onCapture }) {
  const ep = getCurrentEp();
  const fragmentCount = E18_FRAGMENTS.length;
  return (
    <div style={{ padding: '0 20px', marginTop: -22, position: 'relative', zIndex: 4 }}>
      <div style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        background: T.bg2, border: `0.5px solid ${T.line}`,
        borderRadius: 14, padding: '16px 18px',
        display: 'flex', alignItems: 'center', gap: 14,
        boxShadow: '0 4px 16px rgba(27,26,23,0.06), 0 1px 4px rgba(27,26,23,0.04)',
        color: T.ink, fontFamily: T.sans,
      }}>
        <button onClick={onOpen} style={{
          flex: 1, minWidth: 0, border: 'none', background: 'transparent',
          padding: 0, display: 'flex', alignItems: 'center', gap: 14,
          textAlign: 'left', color: T.ink, fontFamily: T.sans, cursor: 'pointer',
        }}>
          <div style={{
            width: 56, height: 78, flexShrink: 0,
            borderRadius: 4, overflow: 'hidden',
          }}>
            <PosterPlaceholder hue={MOODS[ep.mood].color} label="E18" dense />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Meta color={T.amber} style={{ marginBottom: 5 }}>正在拍摄 · 还剩 4 天到剪辑日</Meta>
            <div style={{
              fontFamily: T.serif, fontSize: 15, fontWeight: 600,
              color: T.ink, lineHeight: 1.3, marginBottom: 4,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>E18 · {ep.title}</div>
            <div style={{
              fontFamily: T.sans, fontSize: 12, color: T.ink3,
            }}>{fragmentCount} 条拍摄素材 · 待剪辑</div>
          </div>
          <div style={{
            fontFamily: T.mono, fontSize: 18, color: T.amber,
            paddingRight: 2, flexShrink: 0,
          }}>›</div>
        </button>
        <button onClick={onCapture} style={{
          width: 70, height: 48, flexShrink: 0, border: 'none',
          borderRadius: 10, background: T.amber, color: T.bg,
          boxShadow: '0 6px 14px rgba(218,150,80,0.24)',
          display: 'grid', placeItems: 'center', alignContent: 'center', gap: 1,
          fontFamily: T.sans, cursor: 'pointer',
        }}>
          <span style={{ fontFamily: T.serif, fontSize: 13, fontWeight: 700 }}>拍摄 +1</span>
          <span style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.1 }}>RAW</span>
        </button>
      </div>
    </div>
  );
}

// Main plotline strip — horizontal scroller
function PlotlineRail() {
  const archived = PLOTLINES.filter(p => p.state === 'abandoned').length;
  const open = PLOTLINES.length - archived;
  const visible = PLOTLINES.slice(0, 8);
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle
        kicker={`MAIN PLOT · ${open} OPEN · ${archived} ARCHIVED`}
        action={<Meta color={T.ink3}>本季</Meta>}
      >主线剧情</SectionTitle>
      <div style={{
        display: 'flex', gap: 12, padding: '0 20px',
        overflowX: 'auto', paddingBottom: 4,
      }}>
        {visible.map(p => {
          const c = T[p.color] || T.amber;
          const archivedPlot = p.state === 'abandoned';
          const crisis = p.state === 'crisis';
          const heat = p.chart[p.chart.length - 1];
          const replacement = archivedPlot
            ? PLOTLINES.find(next => next.status === 'promoted' && next.ep === p.abandonedAt)?.name
            : null;
          return (
            <div key={p.id} style={{
              flexShrink: 0, width: 168,
              background: T.bg2,
              border: `0.5px solid ${archivedPlot ? 'rgba(27,26,23,0.18)' : T.line}`,
              boxShadow: archivedPlot ? `inset 3px 0 0 ${T.abandoned}` : 'none',
              borderRadius: 12, padding: '12px 14px 14px',
              position: 'relative',
            }}>
              {p.status === 'promoted' && (
                <div style={{
                  position: 'absolute', top: -1, right: 10,
                  background: T.violet, color: T.bg,
                  fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1,
                  padding: '2px 6px', borderRadius: '0 0 4px 4px',
                  fontWeight: 600,
                }}>追溯 · {p.promotedAt}</div>
              )}
              {archivedPlot && (
                <div style={{
                  position: 'absolute', top: -1, right: 10,
                  background: T.abandoned, color: T.ink,
                  fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1,
                  padding: '2px 6px', borderRadius: '0 0 4px 4px',
                }}>ARCHIVED</div>
              )}
              <Meta color={crisis ? T.wine : c} dot={crisis ? T.wine : c} style={{ marginBottom: 10 }}>
                {p.ep} → {p.last}
              </Meta>
              <div style={{
                fontFamily: T.serif, fontSize: 15, fontWeight: 600,
                color: T.ink, marginBottom: 2,
              }}>{p.name}</div>
              <div style={{
                fontFamily: T.sans, fontSize: 11, color: T.ink3,
                marginBottom: 12, lineHeight: 1.4, height: 30,
                overflow: 'hidden',
              }}>{p.subtitle}</div>
              {archivedPlot && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  maxWidth: '100%', marginBottom: 10,
                  padding: '3px 7px', borderRadius: 100,
                  background: 'rgba(27,26,23,0.06)',
                  border: `0.5px solid ${T.line}`,
                  fontFamily: T.mono, fontSize: 9, letterSpacing: 0.8,
                  color: T.ink2, whiteSpace: 'nowrap',
                }}>
                  腾位{replacement ? `给 · ${replacement}` : '归档'}
                </div>
              )}
              <Sparkline values={p.chart} color={c} w={140} h={26} />
              <div style={{
                marginTop: 6,
                fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1,
                color: T.ink3,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>HEAT {String(Math.round(heat * 100)).padStart(2,'0')}</span>
                <span style={{ color: crisis ? T.wine : T.ink3 }}>
                  {crisis ? 'CRISIS' : p.state === 'dormant' ? 'DORMANT' : p.momentum === '+' ? 'RISING' : 'STEADY'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Cast strip
function CastStrip() {
  const visible = CAST.slice(0, 7);
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle
        kicker={`CAST · ${CAST.length} 角色`}
        action={<Meta color={T.amber}>查看全部 ›</Meta>}
      >本季人物</SectionTitle>
      <div style={{
        display: 'flex', gap: 14, padding: '0 20px',
        overflowX: 'auto', paddingBottom: 6,
      }}>
        {visible.map(c => (
          <div key={c.id} style={{
            flexShrink: 0, width: 76,
          }}>
            <div style={{
              width: 76, height: 100, borderRadius: 6,
              overflow: 'hidden', position: 'relative',
              border: `0.5px solid ${T.line}`,
            }}>
              <PosterPlaceholder
                hue={T[c.color] || T.amber}
                label={c.id}
                dense
              />
              {c.status === 'crisis' && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 6, height: 6, borderRadius: '50%',
                  background: T.wine,
                  boxShadow: `0 0 0 2px ${T.bg}`,
                }} />
              )}
              {c.status === 'ambiguous' && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 6, height: 6, borderRadius: '50%',
                  background: T.rose,
                  boxShadow: `0 0 0 2px ${T.bg}`,
                }} />
              )}
            </div>
            <div style={{
              fontFamily: T.serif, fontSize: 13, fontWeight: 600,
              color: T.ink, marginTop: 8,
            }}>{c.name}</div>
            <div style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: 0.8,
              color: T.ink3, marginTop: 2, textTransform: 'uppercase',
            }}>{c.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cliffhanger preview — list 3
function CliffPreview({ onOpen }) {
  const open = CLIFFHANGERS.filter(c => c.state === 'open');
  const openCount = open.length;
  const preview = open.slice(0, 3);
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle
        kicker={openCount === 0 ? 'BOTTLE EPISODE · 0 OPEN' : `UNRESOLVED · ${openCount} OPEN`}
        action={<Meta color={T.amber} onClick={onOpen} style={{ cursor: 'pointer' }}>全部 ›</Meta>}
      >未完待续</SectionTitle>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {openCount === 0 ? (
          <div style={{
            background: T.bg2,
            padding: '14px 16px',
            borderRadius: 12,
            border: `0.5px solid ${T.line}`,
            boxShadow: 'inset 3px 0 0 rgba(111,139,116,0.34)',
          }}>
            <Meta color={T.sage} style={{ marginBottom: 7, display: 'block' }}>
              安静收束 · 不强行推进
            </Meta>
            <div style={{
              fontFamily: T.serif, fontSize: 14.5, fontWeight: 600,
              color: T.ink, marginBottom: 5,
            }}>这一集没有未完待续</div>
            <div style={{
              fontFamily: T.serif, fontSize: 12.5, color: T.ink2, lineHeight: 1.45,
            }}>没有悬着的线索也是合法的一集。</div>
          </div>
        ) : preview.map((c, i) => (
          <div key={c.id} style={{
            background: T.bg2, padding: '14px 16px',
            borderRadius: i === 0 ? '12px 12px 0 0' : i === preview.length - 1 ? '0 0 12px 12px' : 0,
            display: 'flex', alignItems: 'center', gap: 12,
            border: `0.5px solid ${T.line}`,
            borderBottom: i === preview.length - 1 ? `0.5px solid ${T.line}` : 'none',
          }}>
            <div style={{
              width: 3, alignSelf: 'stretch', borderRadius: 2,
              background: c.weight === 'heavy' ? T.amber : c.weight === 'medium' ? T.wine : T.ink4,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: T.serif, fontSize: 14, fontWeight: 500,
                color: T.ink, marginBottom: 4,
              }}>{c.title}</div>
              <Meta color={T.ink3}>
                <span>开启于 {c.since}</span>
                <span style={{ color: T.ink4 }}>·</span>
                <span>{c.lastMove}</span>
              </Meta>
            </div>
            <div style={{
              fontFamily: T.mono, fontSize: 9, letterSpacing: 1.2,
              color: c.stale > 4 ? T.wine : T.ink3,
              padding: '3px 7px',
              border: `0.5px solid ${c.stale > 4 ? T.wine : T.line}`,
              borderRadius: 100,
            }}>{c.stale}集未动</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviouslyOn() {
  const aiUnavailable = true;
  const manualEpisodes = EPISODES.slice(-3).reverse();

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle kicker={aiUnavailable ? 'MANUAL · PREVIOUSLY ON' : 'AI · PREVIOUSLY ON'}>前情提要</SectionTitle>
      <div style={{ padding: '0 20px' }}>
        {aiUnavailable ? (
          <div style={{
            padding: '14px 16px',
            borderRadius: 6,
            border: `0.5px solid ${T.line}`,
            background: 'rgba(255,255,255,0.42)',
            boxShadow: 'inset 3px 0 0 rgba(127,111,92,0.34)',
          }}>
            <Meta color={T.wine} style={{ marginBottom: 8, display: 'block' }}>
              AI 暂不可用 · 手动回看仍可继续
            </Meta>
            <div style={{
              fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.55,
              color: T.ink, marginBottom: 12,
            }}>
              自动前情没有装载时，本季不会断档。先按最近三集手动回看，再决定这一集要接住哪条线。
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {manualEpisodes.map(ep => (
                <div key={ep.n} style={{
                  display: 'grid', gridTemplateColumns: '38px 1fr auto',
                  gap: 8, alignItems: 'center',
                  padding: '8px 0',
                  borderTop: `0.5px solid ${T.lineSoft}`,
                }}>
                  <span style={{
                    fontFamily: T.mono, fontSize: 10, letterSpacing: 1,
                    color: T.amber,
                  }}>E{String(ep.n).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: T.serif, fontSize: 14,
                    color: T.ink, lineHeight: 1.25,
                  }}>{ep.title}</span>
                  <Meta color={MOODS[ep.mood]?.color || T.ink3}>{ep.mood}</Meta>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AICard kicker="编剧室 · 自动从过去三集编织">
            {PREVIOUSLY.map((line, i) => (
              <div key={i} style={{
                marginBottom: i < PREVIOUSLY.length - 1 ? 8 : 0,
                display: 'flex', gap: 10, alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: T.mono, fontSize: 10, color: T.amber,
                  letterSpacing: 1, flexShrink: 0,
                }}>{String(i + 1).padStart(2,'0')}</span>
                <span>{line}</span>
              </div>
            ))}
          </AICard>
        )}
      </div>
    </div>
  );
}

// Recent episodes — last 6
function RecentEpisodes() {
  const recent = EPISODES.slice(-6).reverse();
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle
        kicker={`EPISODES · ${SEASON.episodeCurrent}/${SEASON.episodeTotal}`}
        action={<Meta color={T.amber}>归档 ›</Meta>}
      >最近几集</SectionTitle>
      <div style={{
        display: 'flex', gap: 12, padding: '0 20px',
        overflowX: 'auto', paddingBottom: 4,
      }}>
        {recent.map(ep => {
          const moodColor = MOODS[ep.mood]?.color || T.amber;
          return (
            <div key={ep.n} style={{
              flexShrink: 0, width: 130,
            }}>
              <div style={{
                width: 130, height: 184, borderRadius: 4,
                overflow: 'hidden', position: 'relative',
                border: `0.5px solid ${T.line}`, marginBottom: 10,
              }}>
                <PosterPlaceholder hue={moodColor} dense />
                {/* poster overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                  <div style={{
                    fontFamily: T.mono, fontSize: 9, letterSpacing: 1.2,
                    color: T.amber,
                  }}>E{String(ep.n).padStart(2,'0')}</div>
                  <div>
                    <div style={{
                      fontFamily: T.display, fontSize: 12, fontStyle: 'italic',
                      color: T.ink, lineHeight: 1.2, fontWeight: 500,
                    }}>{ep.title}</div>
                  </div>
                </div>
                {ep.special && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    background: T.amber, color: T.bg,
                    fontFamily: T.mono, fontSize: 8, letterSpacing: 1,
                    padding: '3px 6px', fontWeight: 600,
                  }}>SPECIAL</div>
                )}
                {ep.current && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    border: `1.5px solid ${T.amber}`,
                  }} />
                )}
              </div>
              <Meta color={MOODS[ep.mood]?.color || T.ink3} dot={MOODS[ep.mood]?.color}>
                {ep.mood}
              </Meta>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SeasonHome({ onNav }) {
  return (
    <Screen label="01 Season 首页">
      <HeroPoster />
      <ContinueEpisode
        onOpen={() => onNav && onNav('episode')}
        onCapture={() => onNav && onNav('capture')}
      />
      <div style={{ height: 36 }} />
      <PreviouslyOn />
      <RecentEpisodes />
      <PlotlineRail />
      <CastStrip />
      <CliffPreview onOpen={() => onNav && onNav('cliff')} />

      {/* Footer signature */}
      <div style={{
        padding: '12px 20px 110px',
        textAlign: 'center',
      }}>
        <Meta color={T.ink4}>
          —— 下一次剪辑日 · 4 天后 · 周日晚 ——
        </Meta>
      </div>

      <TabBar active="season" onPick={(id) => onNav && onNav(id)} />
    </Screen>
  );
}

Object.assign(window, { SeasonHome });
