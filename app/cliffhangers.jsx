// cliffhangers.jsx — 未完待续板

function CliffHero() {
  const open = CLIFFHANGERS.filter(c => c.state === 'open').length;
  const fading = CLIFFHANGERS.filter(c => c.state === 'fading').length;
  const closed = CLIFFHANGERS.filter(c => c.state === 'abandoned').length;
  const lead = CLIFFHANGERS.find(c => c.state === 'open' && c.weight === 'heavy') || CLIFFHANGERS[0];
  const stats = [
    { label: '未解决', value: open, color: T.amber },
    { label: '淡出', value: fading, color: T.violet },
    { label: '已闭环', value: closed, color: T.ink3 },
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
          left={<Meta color={T.amber}>S01 · 悬念板</Meta>}
          right={<Meta color={T.ink3}>未解决 {open} · 悬念热度 {lead.stale}</Meta>}
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
            background: 'repeating-linear-gradient(90deg, rgba(27,26,23,0.24) 0 18px, transparent 18px 30px)',
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: '104px minmax(0, 1fr)', gap: 14, alignItems: 'stretch' }}>
            <div aria-hidden="true" style={{ minHeight: 150, position: 'relative' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  left: i * 12,
                  top: i * 16,
                  width: 72,
                  height: 94,
                  borderRadius: 8,
                  background: i === 0
                    ? `linear-gradient(150deg, ${T.wine}, rgba(251,249,244,0.76))`
                    : `linear-gradient(150deg, ${T.amber}, rgba(251,249,244,0.74))`,
                  border: '1px solid rgba(251,249,244,0.88)',
                  boxShadow: '0 10px 22px rgba(27,26,23,0.12)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(135deg, rgba(27,26,23,0.08) 0 8px, transparent 8px 16px)',
                  }} />
                  <div style={{
                    position: 'absolute', left: 8, right: 8, bottom: 8,
                    fontFamily: T.mono, fontSize: 8.5, letterSpacing: 0,
                    color: 'rgba(27,26,23,0.62)',
                  }}>
                    未解决
                    <div style={{ marginTop: 3, color: 'rgba(27,26,23,0.44)' }}>{lead.since} · {lead.lastMove}</div>
                  </div>
                </div>
              ))}
              <div style={{
                position: 'absolute', left: 0, bottom: 0,
                fontFamily: T.mono, fontSize: 9, letterSpacing: 0,
                color: T.ink3,
              }}>悬念板 · S01</div>
            </div>
            <div style={{ minWidth: 0, padding: '4px 0 10px' }}>
              <Meta color={T.wine} style={{ marginBottom: 8, display: 'block' }}>
                悬念板
              </Meta>
              <div style={{
                fontFamily: T.display, fontSize: 37, fontStyle: 'italic', fontWeight: 600,
                color: T.ink, lineHeight: 1, marginBottom: 8, letterSpacing: 0,
              }}>未完待续</div>
              <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink2, lineHeight: 1.55, marginBottom: 14 }}>
                占据注意力的不是已经发生的事，是还没有给出结尾的镜头。
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {stats.map(stat => (
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

function CliffCard({ c }) {
  const weightColor = c.weight === 'heavy' ? T.amber
                     : c.weight === 'medium' ? T.wine
                     : c.weight === 'closed' ? T.abandoned
                     : T.ink3;
  const states = ['Still Open', 'Resolved', 'Abandoned', 'Promoted', 'No Longer Matters'];
  const stateLabels = {
    'Still Open': '仍悬着',
    'Resolved': '已闭环',
    'Abandoned': '已放弃',
    'Promoted': '升主线',
    'No Longer Matters': '自然淡出',
  };
  const currentState = c.state === 'fading' ? 'No Longer Matters'
                      : c.state === 'abandoned' ? 'Abandoned'
                      : 'Still Open';
  const dim = c.state === 'abandoned' || c.state === 'fading';
  const staleLabel = `${c.stale}集未动`;
  return (
    <div style={{
      background: T.bg2, border: `0.5px solid ${dim ? T.line : weightColor}`,
      borderRadius: 14, padding: '16px', marginBottom: 12,
      opacity: dim ? 0.6 : 1, position: 'relative',
    }}>
      {/* weight bar */}
      <div style={{
        position: 'absolute', left: 0, top: 16, bottom: 16, width: 3,
        background: weightColor, borderRadius: '0 2px 2px 0',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <Meta color={weightColor}>
          {c.weight === 'heavy' ? '重' : c.weight === 'medium' ? '中' : c.weight === 'closed' ? '已闭环' : c.weight === 'fading' ? '淡出' : '轻'}
          <span style={{ marginLeft: 8, color: T.ink3 }}>· 开启于 {c.since}</span>
        </Meta>
        <Meta color={c.stale > 4 ? T.wine : T.ink3}>
          {staleLabel}
        </Meta>
      </div>

      <div style={{
        fontFamily: T.serif, fontSize: 17, fontWeight: 600,
        color: T.ink, marginBottom: 6,
        textDecoration: c.state === 'abandoned' ? 'line-through' : 'none',
      }}>{c.title}</div>

      <div style={{
        fontFamily: T.serif, fontSize: 13.5, color: T.ink2,
        lineHeight: 1.55, marginBottom: 12,
      }}>{c.body}</div>

      {/* state pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {states.map(s => {
          const sel = s === currentState;
          const c2 = s === 'Resolved' ? T.sage
                   : s === 'Abandoned' ? T.abandoned
                   : s === 'Promoted' ? T.violet
                   : s === 'No Longer Matters' ? T.ink3
                   : T.amber;
          return (
            <div key={s} style={{
              padding: '4px 10px', borderRadius: 100,
              fontFamily: T.mono, fontSize: 9, letterSpacing: 1,
              color: sel ? T.bg : T.ink3,
              background: sel ? c2 : 'transparent',
              border: `0.5px solid ${sel ? c2 : T.line}`,
              fontWeight: sel ? 600 : 400,
              textTransform: 'uppercase',
            }}>{stateLabels[s]}</div>
          );
        })}
      </div>

      {/* plot link */}
      {c.plot && (
        <div style={{
          marginTop: 10, paddingTop: 10,
          borderTop: `0.5px solid ${T.lineSoft}`,
          fontFamily: T.mono, fontSize: 9.5, letterSpacing: 0.8, color: T.ink3,
        }}>
          → 关联主线 · {getPlot(c.plot)?.name}
        </div>
      )}
    </div>
  );
}

function OpenLoopEmptyState() {
  return (
    <div style={{
      background: T.bg2,
      border: `0.5px solid ${T.line}`,
      borderRadius: 14,
      padding: '16px',
      marginBottom: 12,
      boxShadow: 'inset 3px 0 0 rgba(111,139,116,0.34)',
    }}>
      <Meta color={T.sage} style={{ marginBottom: 8, display: 'block' }}>
        BOTTLE EPISODE · 0 OPEN
      </Meta>
      <div style={{
        fontFamily: T.serif,
        fontSize: 17,
        fontWeight: 600,
        color: T.ink,
        marginBottom: 6,
      }}>
        这一集没有未完待续
      </div>
      <div style={{
        fontFamily: T.serif,
        fontSize: 13.5,
        color: T.ink2,
        lineHeight: 1.55,
        marginBottom: 12,
      }}>
        没有悬着的线索不是缺页。本集可以安静收束、自然淡出，或留作一集合法的 bottle episode。
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['安静收束', '自然淡出', '不强行推进'].map(label => (
          <div key={label} style={{
            padding: '4px 9px',
            borderRadius: 100,
            border: `0.5px solid ${T.line}`,
            background: 'rgba(111,139,116,0.08)',
            fontFamily: T.mono,
            fontSize: 9,
            letterSpacing: 1,
            color: T.ink3,
          }}>{label}</div>
        ))}
      </div>
    </div>
  );
}

function CliffPage({ onNav }) {
  const open = CLIFFHANGERS.filter(c => c.state === 'open');
  const fading = CLIFFHANGERS.filter(c => c.state === 'fading');
  const closed = CLIFFHANGERS.filter(c => c.state === 'abandoned');

  return (
    <Screen label="05 Cliffhangers">
      <CliffHero />

      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <AICard kicker="AI · 这一周轻提示">
          <span style={{ color: T.wine, fontWeight: 600 }}>搬家后的聚餐</span>是本季权重最高的悬念，
          已经停留 7 集。它不会自己消失，但你可以在 E18 给它一个动作。
          —— 不要求立刻定下，只问你愿不愿意把它从 cliffhanger 变成 plot move。
        </AICard>
      </div>

      <SectionTitle kicker={`STILL OPEN · ${open.length}`}>未解决</SectionTitle>
      <div style={{ padding: '0 20px' }}>
        {open.length === 0
          ? <OpenLoopEmptyState />
          : open.map(c => <CliffCard key={c.id} c={c} />)}
      </div>

      <div style={{ height: 8 }} />
      <SectionTitle kicker={`FADING · ${fading.length}`}>正在淡出</SectionTitle>
      <div style={{ padding: '0 20px' }}>
        {fading.map(c => <CliffCard key={c.id} c={c} />)}
      </div>

      <div style={{ height: 8 }} />
      <SectionTitle kicker={`CLOSED · ${closed.length}`}>已闭环</SectionTitle>
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        {closed.map(c => <CliffCard key={c.id} c={c} />)}
      </div>

      <div style={{ height: 80 }} />
      <TabBar active="cliff" onPick={(id) => onNav && onNav(id)} />
    </Screen>
  );
}

Object.assign(window, { CliffPage });
