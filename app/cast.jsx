// cast.jsx — Cast 人物图谱

function CastHero() {
  const castCount = CAST.length;
  const leads = CAST.slice(0, 4);
  const featured = leads.slice(0, 3);
  const supportingCount = CAST.length - leads.length;
  return (
    <div style={{ padding: '52px 20px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255,249,238,0.98), rgba(244,240,232,0.26) 76%, rgba(244,240,232,0))',
      }} />
      <div style={{ position: 'relative' }}>
        <TopBar
          style={{ padding: 0, marginBottom: 14 }}
          left={<Meta color={T.amber}>S01 CAST · {castCount} 角色</Meta>}
          right={<Meta color={T.ink3}>MAIN {leads.length} · SUPPORT {supportingCount}</Meta>}
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
          <div style={{ display: 'grid', gridTemplateColumns: '116px minmax(0, 1fr)', gap: 14, alignItems: 'stretch' }}>
            <div aria-hidden="true" style={{ minHeight: 150, position: 'relative' }}>
              {featured.map((c, i) => (
                <div key={c.id} style={{
                  position: 'absolute',
                  left: i * 18,
                  top: i * 9,
                  width: 76,
                  height: 118,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(251,249,244,0.86)',
                  boxShadow: '0 10px 22px rgba(27,26,23,0.14)',
                }}>
                  <PosterPlaceholder hue={T[c.color] || T.amber} label={c.id} sub={c.tag.toUpperCase()} dense />
                </div>
              ))}
              <div style={{
                position: 'absolute', left: 0, bottom: 0,
                fontFamily: T.mono, fontSize: 9, letterSpacing: 0,
                color: T.ink3,
              }}>CAST SHEET · S01</div>
            </div>
            <div style={{ minWidth: 0, padding: '4px 0 10px' }}>
              <Meta color={T.violet} style={{ marginBottom: 8, display: 'block' }}>
                OPENING CREDITS
              </Meta>
              <div style={{
                fontFamily: T.display, fontSize: 37, fontStyle: 'italic', fontWeight: 600,
                color: T.ink, lineHeight: 1, marginBottom: 8, letterSpacing: 0,
              }}>本季人物</div>
              <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink2, lineHeight: 1.55, marginBottom: 14 }}>
                这一季的关系不是联系人列表，而是一张会随着剧情改写的演员表。
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {leads.map(c => (
                  <div key={c.id} style={{ minWidth: 0, borderTop: `0.5px solid ${T.lineSoft}`, paddingTop: 7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: T[c.color] || T.amber, flexShrink: 0 }} />
                      <div style={{ fontFamily: T.serif, fontSize: 12.5, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.full}
                      </div>
                    </div>
                    <Meta color={T.ink4}>{c.tag}</Meta>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* relationship temperature legend */}
        <div style={{
          display: 'flex', gap: 14, marginTop: 16, flexWrap: 'wrap',
        }}>
          {[
            { c: T.sage, l: '稳定' },
            { c: T.rose, l: '靠近' },
            { c: T.wine, l: '裂痕' },
            { c: T.violet, l: '失联' },
            { c: T.abandoned, l: '退场' },
          ].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.c }} />
              <span style={{ fontFamily: T.mono, fontSize: 9.5, letterSpacing: 0, color: T.ink3 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CastCard({ c, onSelect, selected }) {
  const color = T[c.color] || T.amber;
  return (
    <div onClick={onSelect} style={{
      cursor: 'pointer',
      background: T.bg2, border: `0.5px solid ${selected ? color : T.line}`,
      borderRadius: 14, overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ height: 158, position: 'relative' }}>
        <PosterPlaceholder hue={color} label={c.id} sub={c.tag.toUpperCase()} />
        {/* status pill */}
        <div style={{
          position: 'absolute', top: 8, right: 8,
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: 1,
          padding: '3px 7px', borderRadius: 100,
          background: 'rgba(244,240,232,0.92)', color,
          border: `0.5px solid ${color}`, fontWeight: 600,
        }}>{c.statusZh}</div>
        {c.promotedAt && (
          <div style={{
            position: 'absolute', top: 0, left: 0,
            background: T.violet, color: '#F8EFDD',
            fontFamily: T.mono, fontSize: 8, letterSpacing: 1, fontWeight: 600,
            padding: '3px 6px', borderRadius: '0 0 4px 0',
          }}>PROMOTED · {c.promotedAt}</div>
        )}
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4,
        }}>
          <div style={{
            fontFamily: T.serif, fontSize: 16, fontWeight: 600, color: T.ink,
          }}>{c.full}</div>
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.ink3, marginBottom: 10 }}>
          {c.role}
        </div>
        {/* appearance dots */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
          {Array.from({ length: SEASON.episodeCurrent }).map((_, i) => {
            const ep = i + 1;
            const on = c.appearances.includes(ep);
            return (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 1,
                background: on ? color : 'rgba(27,26,23,0.07)',
              }} />
            );
          })}
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: T.mono, fontSize: 9, letterSpacing: 0.8, color: T.ink3,
        }}>
          <span>登场 {c.debut}</span>
          <span>出现 {c.appearances.length} 集</span>
        </div>
      </div>
    </div>
  );
}

function CastDetail({ c }) {
  if (!c) return null;
  const color = T[c.color] || T.amber;
  return (
    <div style={{
      margin: '0 20px', padding: '16px',
      background: T.bg2, borderRadius: 14, border: `0.5px solid ${color}`,
      marginBottom: 16,
    }}>
      <Meta color={color} style={{ marginBottom: 10, display: 'block' }}>
        FOCUS · {c.full}
      </Meta>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {c.keywords.map(k => (
          <Chip key={k} color={T.ink2} bg="rgba(27,26,23,0.04)">{k}</Chip>
        ))}
      </div>
      <AICard kicker="AI · 关系动态" accent={color} style={{ background: 'transparent', borderRadius: 0, padding: '10px 0 10px 14px' }}>
        {c.aiSummary}
      </AICard>
      {/* relationship temperature slider */}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <Meta color={T.ink3}>关系状态</Meta>
          <Meta color={color}>{c.statusZh}</Meta>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['疏远','观察','靠近','稳定','复杂','结束'].map((s, i) => {
            const sel = (c.statusZh === '靠近中' && s === '靠近') ||
                        (c.statusZh === '裂痕中' && s === '复杂') ||
                        (c.statusZh === '稳定' && s === '稳定') ||
                        (c.statusZh === '已退场' && s === '结束') ||
                        (c.statusZh === '失联中' && s === '复杂') ||
                        (c.statusZh === '稳定升温' && s === '稳定') ||
                        (c.statusZh === '回避中' && s === '观察') ||
                        (c.statusZh === '客串' && s === '观察');
            return (
              <div key={s} style={{
                flex: 1, padding: '7px 4px', textAlign: 'center',
                fontFamily: T.serif, fontSize: 11.5,
                color: sel ? T.bg : T.ink3,
                background: sel ? color : 'rgba(27,26,23,0.04)',
                borderRadius: 6,
                fontWeight: sel ? 600 : 400,
              }}>{s}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CastPage({ onNav }) {
  const [sel, setSel] = React.useState('A');
  const selected = getCast(sel);
  const endedCast = CAST.filter(c => c.statusZh === '已退场');
  const lostCast = CAST.filter(c => c.statusZh === '失联中');
  const endedInitials = endedCast.map(c => c.name).join('、');
  const lostInitials = lostCast.map(c => c.name).join('、');
  return (
    <Screen label="03 Cast 人物图谱">
      <CastHero />

      <div style={{ marginBottom: 18 }}>
        <SectionTitle kicker="MAIN · 在本集起作用">主要人物</SectionTitle>
        <div style={{
          padding: '0 20px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        }}>
          {CAST.slice(0, 4).map(c => (
            <CastCard key={c.id} c={c} onSelect={() => setSel(c.id)} selected={sel === c.id} />
          ))}
        </div>
      </div>

      {selected && <CastDetail c={selected} />}

      <div style={{ marginBottom: 24 }}>
        <SectionTitle kicker="SUPPORTING · CAMEOS">配角与客串</SectionTitle>
        <div style={{
          padding: '0 20px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        }}>
          {CAST.slice(4).map(c => (
            <CastCard key={c.id} c={c} onSelect={() => setSel(c.id)} selected={sel === c.id} />
          ))}
        </div>
      </div>

      {/* AI footer */}
      <div style={{ padding: '0 20px', marginBottom: 32 }}>
        <AICard kicker="AI · 本季人物模式">
          这一季你和 <span style={{ color: T.amber }}>Comfort</span> 标签的人（小榆、小舟）相处时间最长，
          但情绪起伏最大的是 <span style={{ color: T.rose }}>Plot Twist</span>（小岚）和
          <span style={{ color: T.wine }}> Mirror</span>（小禾）。
          有 {endedCast.length} 个角色已退场（{endedInitials}），{lostCast.length} 个角色失联（{lostInitials}）。
        </AICard>
      </div>

      <div style={{ height: 80 }} />
      <TabBar active="cast" onPick={(id) => onNav && onNav(id)} />
    </Screen>
  );
}

Object.assign(window, { CastPage });
