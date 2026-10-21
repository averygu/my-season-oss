// plotlines.jsx — 主线剧情 (含前置 / 追溯 / abandoned 三态)

function PlotHero() {
  const active = PLOTLINES.filter(p => p.state === 'active' || p.state === 'crisis').length;
  const promoted = PLOTLINES.filter(p => p.status === 'promoted').length;
  const abandoned = PLOTLINES.filter(p => p.state === 'abandoned').length;
  const archiveBands = [
    { label: 'PRE', value: '年初立下', color: T.amber },
    { label: 'PROMOTED', value: `${promoted} 条追溯`, color: T.violet },
    { label: 'ABANDONED', value: `${abandoned} 条归档`, color: T.abandoned },
  ];
  const actionLegend = [
    { label: '前置', meaning: '年初宣告', color: T.amber },
    { label: '追溯', meaning: '中途追认', color: T.violet },
    { label: '放弃', meaning: '主动归档/腾位', color: T.abandoned },
  ];
  return (
    <div style={{ padding: '52px 20px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255,249,238,0.98), rgba(244,240,232,0.28) 76%, rgba(244,240,232,0))',
      }} />
      <div style={{ position: 'relative' }}>
        <TopBar
          style={{ padding: 0, marginBottom: 14 }}
          left={<Meta color={T.amber}>S01 · PLOT BOARD</Meta>}
          right={<Meta color={T.ink3}>ACTIVE {active} · ARC FILE</Meta>}
        />
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 18, border: `0.5px solid ${T.line}`,
          background: 'linear-gradient(135deg, rgba(251,249,244,0.98), rgba(237,230,216,0.82))',
          boxShadow: '0 18px 38px rgba(27,26,23,0.08)',
          padding: 14,
        }}>
          <div style={{
            position: 'absolute', left: 14, right: 14, bottom: 12, height: 1,
            background: 'repeating-linear-gradient(90deg, rgba(27,26,23,0.24) 0 24px, transparent 24px 36px)',
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: '104px minmax(0, 1fr)', gap: 14, alignItems: 'stretch' }}>
            <div aria-hidden="true" style={{ minHeight: 150, position: 'relative' }}>
              {archiveBands.map((band, i) => (
                <div key={band.label} style={{
                  position: 'absolute',
                  left: i * 10,
                  top: i * 18,
                  width: 74,
                  height: 92,
                  borderRadius: 8,
                  background: `linear-gradient(150deg, ${band.color}, rgba(251,249,244,0.72))`,
                  border: '1px solid rgba(251,249,244,0.88)',
                  boxShadow: '0 10px 22px rgba(27,26,23,0.12)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(180deg, rgba(27,26,23,0.08) 0 7px, transparent 7px 14px)',
                  }} />
                  <div style={{
                    position: 'absolute', left: 8, right: 8, bottom: 8,
                    fontFamily: T.mono, fontSize: 8.5, letterSpacing: 0,
                    color: 'rgba(27,26,23,0.62)',
                  }}>
                    {band.label}
                    <div style={{ marginTop: 3, color: 'rgba(27,26,23,0.44)' }}>{band.value}</div>
                  </div>
                </div>
              ))}
              <div style={{
                position: 'absolute', left: 0, bottom: 0,
                fontFamily: T.mono, fontSize: 9, letterSpacing: 0,
                color: T.ink3,
              }}>ARC BOARD · S01</div>
            </div>
            <div style={{ minWidth: 0, padding: '4px 0 10px' }}>
              <Meta color={T.violet} style={{ marginBottom: 8, display: 'block' }}>
                ARCHIVE TITLE CARD
              </Meta>
              <div style={{
                fontFamily: T.display, fontSize: 37, fontStyle: 'italic', fontWeight: 600,
                color: T.ink, lineHeight: 1, marginBottom: 8, letterSpacing: 0,
              }}>主线剧情</div>
              <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink2, lineHeight: 1.55, marginBottom: 14 }}>
                前置、追溯、放弃都留在同一张本季剧情档案里。
              </div>
              <div style={{ display: 'grid', gap: 5, marginBottom: 12 }}>
                {actionLegend.map(item => (
                  <div key={item.label} aria-label={`${item.label} = ${item.meaning}`} style={{
                    display: 'grid', gridTemplateColumns: '42px minmax(0, 1fr)', alignItems: 'center',
                    minHeight: 23, padding: '3px 8px',
                    borderRadius: 7, border: `0.5px solid ${T.lineSoft}`,
                    background: 'rgba(251,249,244,0.62)',
                  }}>
                    <Meta color={item.color} style={{ fontSize: 9, letterSpacing: 0 }}>{item.label}</Meta>
                    <div style={{ fontFamily: T.serif, fontSize: 11.5, color: T.ink2, lineHeight: 1.2 }}>
                      = {item.meaning}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {[
                  { label: 'ACTIVE', value: active, color: T.amber },
                  { label: 'PROMOTED', value: promoted, color: T.violet },
                  { label: 'ABANDONED', value: abandoned, color: T.ink3 },
                ].map(stat => (
                  <div key={stat.label} style={{
                    minWidth: 0,
                    borderTop: `0.5px solid ${T.lineSoft}`,
                    paddingTop: 7,
                  }}>
                    <div style={{ fontFamily: T.serif, fontSize: 20, color: stat.color, fontWeight: 700, lineHeight: 1 }}>
                      {stat.value}
                    </div>
                    <Meta color={T.ink4} style={{ fontSize: 8.5, letterSpacing: 0 }}>{stat.label}</Meta>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlotRow({ p, onPromote }) {
  const c = T[p.color] || T.amber;
  const dim = p.state === 'abandoned';
  const crisis = p.state === 'crisis';
  const replacement = dim
    ? PLOTLINES.find(candidate => candidate.status === 'promoted' && candidate.id !== p.id && candidate.ep === p.last)
    : null;
  const heat = p.chart[p.chart.length - 1];
  return (
    <div style={{
      background: dim ? 'linear-gradient(135deg, rgba(27,26,23,0.035), rgba(251,249,244,0.98))' : T.bg2,
      border: `0.5px solid ${dim ? 'rgba(27,26,23,0.18)' : crisis ? T.wine : T.line}`,
      borderRadius: 14, padding: '14px 16px', marginBottom: 10,
      boxShadow: dim ? `inset 3px 0 0 ${T.abandoned}` : 'none',
      position: 'relative',
    }}>
      {/* status ribbon */}
      {p.status === 'pre' && (
        <div style={{
          position: 'absolute', top: -1, left: 14,
          background: 'rgba(245,200,120,0.78)', color: T.ink,
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.2,
          padding: '3px 7px', borderRadius: '0 0 4px 4px', fontWeight: 600,
        }}>前置 · {p.ep}</div>
      )}
      {p.status === 'promoted' && (
        <div style={{
          position: 'absolute', top: -1, right: 14,
          background: T.violet, color: T.bg,
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.2,
          padding: '3px 7px', borderRadius: '0 0 4px 4px', fontWeight: 600,
        }}>追溯 · {p.promotedAt}</div>
      )}
      {p.state === 'abandoned' && (
        <div style={{
          position: 'absolute', top: -1, right: 14,
          background: T.abandoned, color: T.ink,
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.2,
          padding: '3px 7px', borderRadius: '0 0 4px 4px',
        }}>已归档 · {p.abandonedAt}</div>
      )}
      {crisis && (
        <div style={{
          position: 'absolute', top: -1, right: 14,
          background: T.wine, color: T.ink,
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1.2,
          padding: '3px 7px', borderRadius: '0 0 4px 4px', fontWeight: 600,
        }}>CRISIS · {p.last}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, marginTop: 4,
          }}>
            <div style={{
              fontFamily: T.serif, fontSize: 17, fontWeight: 600, color: T.ink,
            }}>{p.name}</div>
          </div>
          <div style={{
            fontFamily: T.display, fontSize: 13, fontStyle: 'italic',
            color: T.ink3, marginBottom: 12,
          }}>“{p.subtitle}”</div>
          <div style={{ marginBottom: 8 }}>
            <Sparkline values={p.chart} color={dim ? T.ink4 : c} w={240} h={36} />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: T.mono, fontSize: 9.5, letterSpacing: 1, color: T.ink3,
            marginBottom: 12,
          }}>
            <span>{p.ep} → {p.last}</span>
            <span>HEAT {String(Math.round(heat * 100)).padStart(2,'0')} / 100</span>
          </div>
          <div style={{
            fontFamily: T.serif, fontSize: 13, color: T.ink2, lineHeight: 1.5,
            paddingTop: 12, borderTop: `0.5px solid ${T.lineSoft}`,
          }}>{p.pulse}</div>

          {/* action row */}
          {dim ? (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              <Chip color={T.ink2} bg="rgba(27,26,23,0.05)">ARCHIVE · 已归档</Chip>
              <Chip color={T.sage} bg="rgba(80,130,90,0.10)">
                腾位给 · {replacement ? replacement.name : '新主线'}
              </Chip>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {p.status === 'pre' && p.state === 'active' && (
                <Chip color={T.ink2} bg="rgba(27,26,23,0.04)">↓ 归档为 abandoned</Chip>
              )}
              {p.state === 'crisis' && (
                <Chip color={T.wine} bg="rgba(140,40,40,0.12)">→ 标记为已和解</Chip>
              )}
              {p.status === 'promoted' && (
                <Chip color={T.violet} bg="rgba(120,80,180,0.12)">已从 E{p.promotedAt.replace('E','')} 追溯升级</Chip>
              )}
              {p.state === 'dormant' && (
                <Chip color={T.amber} bg="rgba(245,200,120,0.10)">→ 在本集开一场戏</Chip>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Promote-fragment-to-plotline interaction — the "magic moment"
function PromotionCard() {
  return (
    <div style={{ padding: '0 20px', marginBottom: 24 }}>
      <SectionTitle kicker="THIS WEEK · 候选追溯" style={{ padding: 0 }}>等待你判断</SectionTitle>
      <div style={{
        background: 'linear-gradient(135deg, rgba(120,80,180,0.10), rgba(245,200,120,0.06))',
        border: `0.5px solid ${T.violet}`,
        borderRadius: 14, padding: '16px',
      }}>
        <Meta color={T.violet} style={{ marginBottom: 10, display: 'block' }}>
          AI · 候选信号（不自动升级）
        </Meta>
        <div style={{
          fontFamily: T.serif, fontSize: 15, color: T.ink, lineHeight: 1.5, marginBottom: 14,
        }}>
          你在 <span style={{ color: T.violet, fontWeight: 600 }}>E11、E14、E18</span> 三集都提到了
          「<span style={{ fontStyle: 'italic' }}>差点删掉重来</span>」。
          它可能是一条还没被命名的隐线。
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.65)', borderRadius: 10,
          padding: '12px 14px', marginBottom: 12,
          border: `0.5px solid ${T.line}`,
        }}>
          <Meta color={T.ink3} style={{ marginBottom: 6, display: 'block' }}>候选命名</Meta>
          <div style={{
            fontFamily: T.display, fontSize: 17, fontStyle: 'italic',
            color: T.ink, fontWeight: 500,
          }}>“The Almost-Quitting Pattern”</div>
          <div style={{ fontFamily: T.serif, fontSize: 13, color: T.ink2, marginTop: 4 }}>
            放弃想做的事的诱惑 / 这一季的反复 motif
          </div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '70px minmax(0, 1fr)', gap: 8, alignItems: 'center',
          background: 'rgba(251,249,244,0.58)', border: `0.5px solid rgba(120,80,180,0.22)`,
          borderRadius: 9, padding: '8px 10px', marginBottom: 12,
        }}>
          <Meta color={T.violet} style={{ fontSize: 9, letterSpacing: 0 }}>由你决定</Meta>
          <div style={{ fontFamily: T.serif, fontSize: 12.5, color: T.ink2, lineHeight: 1.35 }}>
            AI 只把重复素材提出来；是否追溯成主线，等你亲手判断。
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '10px 14px', borderRadius: 100,
            background: T.violet, color: T.bg, border: 'none', cursor: 'pointer',
            fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.2, fontWeight: 700,
          }}>追溯升级 · 从 E11 起算</button>
          <button style={{
            padding: '10px 14px', borderRadius: 100,
            background: 'transparent', color: T.ink2,
            border: `0.5px solid ${T.line}`, cursor: 'pointer',
            fontFamily: T.mono, fontSize: 10.5, letterSpacing: 1.2,
          }}>不是主线</button>
        </div>
      </div>
    </div>
  );
}

function PlotPage({ onNav }) {
  const promoted = PLOTLINES.filter(p => p.status === 'promoted');
  const active = PLOTLINES.filter(p => p.status !== 'promoted' && (p.state === 'active' || p.state === 'crisis'));
  const dormant = PLOTLINES.filter(p => p.status !== 'promoted' && p.state === 'dormant');
  const abandoned = PLOTLINES.filter(p => p.state === 'abandoned');

  return (
    <Screen label="04 Plot Lines">
      <PlotHero />
      <PromotionCard />

      <SectionTitle kicker={`PROMOTED · ${promoted.length} 条`}>追溯升级</SectionTitle>
      <div style={{ padding: '0 20px' }}>
        {promoted.map(p => <PlotRow key={p.id} p={p} />)}
      </div>

      <div style={{ height: 12 }} />
      <SectionTitle kicker={`ACTIVE · ${active.length} 条`}>正在推进</SectionTitle>
      <div style={{ padding: '0 20px' }}>
        {active.map(p => <PlotRow key={p.id} p={p} />)}
      </div>

      <div style={{ height: 12 }} />
      <SectionTitle kicker="DORMANT · 在等一场戏">沉默中</SectionTitle>
      <div style={{ padding: '0 20px' }}>
        {dormant.map(p => <PlotRow key={p.id} p={p} />)}
      </div>

      <div style={{ height: 12 }} />
      <SectionTitle kicker="ABANDONED · 这一季的我抛弃了">放弃的目标</SectionTitle>
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        {abandoned.map(p => <PlotRow key={p.id} p={p} />)}
      </div>

      {/* Footer note */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        <AICard kicker="AI · 系统提示" accent={T.ink3}>
          放弃一条主线不是失败，是为本季腾出一个空位。
          <span style={{ color: T.amber }}> 减肥</span>线归档后，
          <span style={{ color: T.sage }}> 身体感</span>线在 E14 长出来 —— 这种替换在叙事上比硬撑更有戏。
        </AICard>
      </div>

      <div style={{ height: 80 }} />
      <TabBar active="plot" onPick={(id) => onNav && onNav(id)} />
    </Screen>
  );
}

Object.assign(window, { PlotPage });
