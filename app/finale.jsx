// finale.jsx — Season Finale 预览（demo 在 E18 但展示「如果现在结束会是什么样」）

function FinaleHero() {
  return (
    <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
      {/* Finale poster — speculative warm dusk */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(140% 90% at 50% 100%, oklch(0.72 0.18 60) 0%, transparent 60%),
          linear-gradient(170deg, oklch(0.40 0.15 25) 0%, oklch(0.52 0.16 35) 100%)
        `,
      }} />
      <svg viewBox="0 0 390 440" preserveAspectRatio="xMidYMax slice" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
      }}>
        <defs>
          <linearGradient id="fin-fig" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(20,15,10,0)" />
            <stop offset="100%" stopColor="rgba(20,15,10,0.85)" />
          </linearGradient>
        </defs>
        {/* receding figure walking toward horizon */}
        <line x1="0" y1="320" x2="390" y2="320" stroke="rgba(255,235,200,0.25)" strokeWidth="0.8" />
        <ellipse cx="195" cy="430" rx="240" ry="14" fill="rgba(20,15,10,0.45)" />
        <path d="M 175 430 L 175 360 Q 175 340 195 335 Q 215 332 215 360 L 215 430 Z" fill="url(#fin-fig)" />
        <circle cx="195" cy="320" r="14" fill="rgba(20,15,10,0.85)" />
        {/* big sun behind */}
        <circle cx="195" cy="220" r="80" fill="rgba(255,225,180,0.45)" />
        <circle cx="195" cy="220" r="50" fill="rgba(255,235,200,0.7)" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(8deg, rgba(255,235,200,0.04) 0 2px, rgba(0,0,0,0.04) 2px 4px)`,
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
        }}>‹ 关闭</button>
        <span style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 1.4,
          color: '#F4D9A0', textTransform: 'uppercase', fontWeight: 600,
          padding: '4px 10px', background: 'rgba(20,15,10,0.4)', borderRadius: 100,
        }}>PREVIEW · 还有 6 集</span>
      </div>
      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 80 }}>
        <div style={{
          fontFamily: T.mono, fontSize: 10, letterSpacing: 2.5,
          color: '#F4D9A0', marginBottom: 14, fontWeight: 600,
        }}>SEASON FINALE · A PROVISIONAL TRAILER</div>
        <div style={{
          fontFamily: T.display, fontSize: 42, fontWeight: 600,
          color: '#F8EFDD', letterSpacing: -1.2, marginBottom: 10, lineHeight: 0.95,
          fontStyle: 'italic', textShadow: '0 2px 24px rgba(20,15,10,0.4)',
        }}>如果这一季<br/>现在结束</div>
        <div style={{
          fontFamily: T.serif, fontSize: 13, color: 'rgba(248,239,221,0.78)',
        }}>—— AI 基于你已选素材生成预览 · 不替代最终定剪</div>
      </div>
    </div>
  );
}

function StatCard({ kicker, value, sub, color = T.amber }) {
  return (
    <div style={{
      background: T.bg2, border: `0.5px solid ${T.line}`,
      borderRadius: 12, padding: '14px 16px',
    }}>
      <Meta color={color} style={{ marginBottom: 8, display: 'block' }}>{kicker}</Meta>
      <div style={{
        fontFamily: T.serif, fontSize: 32, fontWeight: 700, color: T.ink,
        lineHeight: 1, marginBottom: 4,
      }}>{value}</div>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.ink3 }}>{sub}</div>
    </div>
  );
}

function NarrativeBlock({ kicker, lines }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <Meta color={T.amber} style={{ marginBottom: 12, display: 'block' }}>{kicker}</Meta>
      <div style={{
        fontFamily: T.serif, fontSize: 16, color: T.ink, lineHeight: 1.65,
        letterSpacing: 0.1,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: 8 }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

function MomentRow({ ep, label, kicker, color }) {
  const e = getEp(ep);
  const moodColor = MOODS[e.mood]?.color || T.amber;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
    }}>
      <div style={{ width: 50, height: 70, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
        <PosterPlaceholder hue={moodColor} label={`E${ep}`} dense />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Meta color={color || T.amber} style={{ marginBottom: 4, display: 'block' }}>{kicker}</Meta>
        <div style={{
          fontFamily: T.display, fontSize: 14, fontStyle: 'italic',
          color: T.ink, fontWeight: 500, lineHeight: 1.3,
        }}>“{e.title}”</div>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.ink3, marginTop: 3, letterSpacing: 0.6 }}>
          E{String(ep).padStart(2,'0')} · {e.mood}
        </div>
      </div>
    </div>
  );
}

function SeasonKeywords() {
  const words = ['重启', '边界', '产出', '亲密', '抽离', '替换', '咖啡', '不交付'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {words.map((w, i) => {
        const sizes = [22, 18, 16, 20, 15, 17, 14, 19];
        const colors = [T.amber, T.ink, T.ink2, T.rose, T.ink2, T.violet, T.amberDim, T.wine];
        return (
          <span key={w} style={{
            fontFamily: T.serif, fontSize: sizes[i], fontWeight: 600,
            color: colors[i], letterSpacing: -0.2,
            padding: '4px 10px', borderRadius: 100,
            background: 'rgba(27,26,23,0.04)',
            border: `0.5px solid ${T.line}`,
          }}>{w}</span>
        );
      })}
    </div>
  );
}

function FinalePage({ onNav }) {
  const activePlotlineCount = PLOTLINES.filter(p => p.state === 'active' || p.state === 'crisis').length;
  const promotedCount = PLOTLINES.filter(p => p.status === 'promoted').length;
  const archivedPlotlineCount = PLOTLINES.filter(p => p.state === 'abandoned').length;
  const castCount = CAST.length;
  const openCliffhangerCount = CLIFFHANGERS.filter(c => c.state === 'open').length;
  const editedEpisodeCount = EPISODES.length;
  const remainingEpisodeCount = Math.max(0, SEASON.episodeTotal - editedEpisodeCount);
  const episodeProgress = `${editedEpisodeCount} / ${SEASON.episodeTotal}`;

  return (
    <Screen label="06 Finale 预览">
      <FinaleHero />

      <div style={{ padding: '20px 20px 0' }}>
        {/* opening line */}
        <div style={{
          fontFamily: T.display, fontSize: 22, fontStyle: 'italic',
          color: T.ink, lineHeight: 1.4, marginBottom: 28,
          fontWeight: 500, textWrap: 'balance',
        }}>
          “这一季的你，认识了 9 个人，结束了 1 段关系，<br />
          抛弃了 1 个目标，长出了 {promotedCount} 条没人替你写的隐线。”
        </div>

        {/* stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28,
        }}>
          <StatCard kicker="活跃主线" value={activePlotlineCount} sub="主线推进中" color={T.amber} />
          <StatCard kicker="追溯隐线" value={promotedCount} sub="追溯升级的隐线" color={T.violet} />
          <StatCard kicker="已归档" value={archivedPlotlineCount} sub="减肥线 · E11" color={T.abandoned} />
          <StatCard kicker="出场人物" value={castCount} sub="出场角色" color={T.teal} />
          <StatCard kicker="未解悬念" value={openCliffhangerCount} sub="还在响的悬念" color={T.wine} />
          <StatCard kicker="已剪集数" value={episodeProgress} sub={`还剩 ${remainingEpisodeCount} 集`} color={T.ink2} />
        </div>

        {/* keywords */}
        <Meta color={T.amber} style={{ marginBottom: 12, display: 'block' }}>本季关键词</Meta>
        <div style={{ marginBottom: 28 }}>
          <SeasonKeywords />
        </div>

        {/* narrative */}
        <NarrativeBlock kicker="这一季的我成为了谁" lines={[
          '从 E01 到 E18，你做了一件别人看不见的事 —— 你不再用「减肥」假装自己在改变。',
          '你把它放下，让一条更小、更慢、更不轰动的线 —— 「身体感」 —— 长出来。',
          '事业线一直都在被推进，只是大多时候它看起来不像进度。',
        ]} />

        <NarrativeBlock kicker="改变剧情走向的 3 个时刻" lines={[]} />
        <MomentRow ep={7} label="小岚的重逢" kicker="EPISODE 07 · 第一次出场" color={T.rose} />
        <MomentRow ep={11} label="减肥归档" kicker="EPISODE 11 · 第一次主动放弃" color={T.abandoned} />
        <MomentRow ep={13} label="停电那夜" kicker="EPISODE 13 · 追溯升级的转折点" color={T.violet} />

        <div style={{ height: 24 }} />
        <NarrativeBlock kicker="留给下半季的伏笔" lines={[
          '和小棠的聚餐。搬家以后，大家还没找到都空闲的一晚。',
          '和小禾的冷战。两个人都在等对方先开口。',
          '产品 demo 周。已推迟两次。',
        ]} />

        {/* episode I'd rewatch */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,200,120,0.08), rgba(140,40,40,0.06))',
          border: `0.5px solid ${T.amber}`,
          borderRadius: 14, padding: '18px',
          marginBottom: 22,
        }}>
          <Meta color={T.amber} style={{ marginBottom: 10, display: 'block' }}>
            如果这一季只剩一集可以重看
          </Meta>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 76, height: 100, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
              <PosterPlaceholder hue={MOODS['治愈'].color} label="E14" />
            </div>
            <div style={{ flex: 1 }}>
              <Meta color={T.ink3} style={{ marginBottom: 4, display: 'block' }}>EP 14 · 治愈</Meta>
              <div style={{
                fontFamily: T.display, fontSize: 17, fontStyle: 'italic',
                color: T.ink, lineHeight: 1.25, fontWeight: 500, marginBottom: 6,
              }}>“I Walked Every Day This Week”</div>
              <div style={{ fontFamily: T.serif, fontSize: 12.5, color: T.ink3, lineHeight: 1.5 }}>
                没有戏剧性，但是这一季最稳定的一集。是「身体感线」第一次被你看见。
              </div>
            </div>
          </div>
        </div>

        {/* trailer for next season */}
        <div style={{
          background: T.bg2, border: `0.5px solid ${T.line}`,
          borderRadius: 14, padding: '18px',
          marginBottom: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${T.violet} 0%, transparent 70%)`,
            opacity: 0.18,
          }} />
          <Meta color={T.violet} style={{ marginBottom: 10, display: 'block' }}>
            COMING NEXT · S02 PREVIEW
          </Meta>
          <div style={{
            fontFamily: T.display, fontSize: 22, fontStyle: 'italic',
            color: T.ink, lineHeight: 1.3, fontWeight: 500, marginBottom: 10,
          }}>“下一季会发生什么？”</div>
          <div style={{ fontFamily: T.serif, fontSize: 13.5, color: T.ink2, lineHeight: 1.6 }}>
            产品上线了吗？搬家后的第一次聚餐会定在哪天？
            小岚还会留在 cast list 里吗？「身体感」会成长为本季最重要的隐线吗？
          </div>
          <Meta color={T.ink4} style={{ marginTop: 14, display: 'block' }}>
            — 还有 6 集 · 剧本由你写 —
          </Meta>
        </div>
      </div>

      <div style={{ height: 100 }} />
      <TabBar active="season" onPick={(id) => onNav && onNav(id)} />
    </Screen>
  );
}

Object.assign(window, { FinalePage });
