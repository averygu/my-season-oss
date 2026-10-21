// capture.jsx — 拍摄模式：零负担 fragment 录入草图

const CAPTURE_KINDS = [
  { id: 'note', label: '一句话', action: '记一句', meta: 'TEXT', color: T.amber },
  { id: 'photo', label: '照片', action: '拍一张', meta: 'PHOTO', color: T.teal },
  { id: 'voice', label: '语音', action: '录一段', meta: 'VOICE', color: T.wine },
  { id: 'cast', label: '人物', action: '标人物', meta: 'CAST', color: T.violet },
];

function CaptureCard({ kicker, title, accent = T.amber, children, style = {} }) {
  return (
    <div style={{
      background: T.bg2, borderRadius: 12, border: `0.5px solid ${T.line}`,
      padding: 14, boxShadow: '0 4px 14px rgba(27,26,23,0.04)', ...style,
    }}>
      <Meta color={accent} style={{ marginBottom: 8, display: 'block' }}>{kicker}</Meta>
      <div style={{ fontFamily: T.serif, fontSize: 16, color: T.ink, fontWeight: 600, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function CaptureHero() {
  const ep = getCurrentEp();
  const rawCount = E18_FRAGMENTS.length;
  const slateStripes = [T.dark, T.bg2, T.dark, T.bg2, T.dark];
  return (
    <div style={{ padding: '52px 20px 18px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255,249,238,0.96), rgba(244,240,232,0.34) 72%, rgba(244,240,232,0))',
      }} />
      <div style={{ position: 'relative' }}>
        <TopBar
          style={{ padding: 0, marginBottom: 14 }}
          left={<Meta color={T.amber} dot={T.amber}>SHOOTING · S01E18</Meta>}
          right={<Meta color={T.ink3}>{ep.w} · {rawCount} 条素材</Meta>}
        />
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 18, border: `0.5px solid ${T.line}`,
          background: 'linear-gradient(135deg, rgba(251,249,244,0.98), rgba(237,230,216,0.78))',
          boxShadow: '0 18px 38px rgba(27,26,23,0.08)',
          padding: 14,
        }}>
          <div style={{
            position: 'absolute', left: 14, right: 14, bottom: 12, height: 1,
            background: 'repeating-linear-gradient(90deg, rgba(27,26,23,0.24) 0 22px, transparent 22px 34px)',
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 108px', gap: 12, alignItems: 'stretch' }}>
            <div style={{ minWidth: 0, padding: '4px 0 10px' }}>
              <div style={{ fontFamily: T.display, fontSize: 37, fontStyle: 'italic', color: T.ink, lineHeight: 1, fontWeight: 600, marginBottom: 8 }}>
                拍摄模式
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink2, lineHeight: 1.55, maxWidth: 208, marginBottom: 14 }}>
                把此刻先收进 E18 拍摄素材，剪辑日再决定它有没有剧情重量。
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip color={T.amber} bg="rgba(218,150,80,0.12)">拍摄素材</Chip>
                <Chip color={T.ink3} bg="rgba(27,26,23,0.04)">第 {rawCount + 1} 条素材</Chip>
              </div>
            </div>
            <div aria-hidden="true" style={{
              minHeight: 126, borderRadius: 13, overflow: 'hidden',
              background: 'linear-gradient(160deg, rgba(27,26,23,0.92), rgba(66,53,41,0.86))',
              border: '0.5px solid rgba(27,26,23,0.18)',
              boxShadow: 'inset 0 0 0 1px rgba(244,240,232,0.08)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', height: 22 }}>
                {slateStripes.map((color, i) => (
                  <div key={i} style={{
                    background: color,
                    opacity: i % 2 === 0 ? 1 : 0.78,
                    transform: 'skewX(-18deg) scaleX(1.35)',
                    transformOrigin: 'center',
                  }} />
                ))}
              </div>
              <div style={{ position: 'relative', flex: 1, padding: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Meta color={T.wine} dot={T.wine}>REC</Meta>
                  <Meta color="rgba(244,240,232,0.55)">00:10</Meta>
                </div>
                <div style={{
                  position: 'absolute', left: 10, right: 10, bottom: 10, height: 56,
                  border: '0.5px solid rgba(244,240,232,0.34)',
                  borderRadius: 8,
                }} />
                <div style={{
                  position: 'absolute', left: 18, bottom: 20,
                  fontFamily: T.mono, fontSize: 9, letterSpacing: 1.3,
                  color: 'rgba(244,240,232,0.72)',
                }}>S01 · E18</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KindRail() {
  return (
    <div style={{ padding: '0 20px', marginBottom: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {CAPTURE_KINDS.map((k, i) => (
          <div key={k.id} style={{
            minHeight: 74, borderRadius: 10, padding: '10px 8px',
            background: i === 0 ? T.dark : T.bg2,
            border: `0.5px solid ${i === 0 ? T.dark : T.line}`,
            boxShadow: i === 0 ? '0 8px 18px rgba(27,26,23,0.10)' : 'none',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: 100, marginBottom: 8,
              background: i === 0 ? k.color : 'rgba(27,26,23,0.05)',
              color: i === 0 ? T.bg : k.color, display: 'grid', placeItems: 'center',
              fontFamily: T.mono, fontSize: 10, fontWeight: 700,
            }}>{i + 1}</div>
            <div style={{ fontFamily: T.serif, fontSize: 13, color: i === 0 ? T.bg : T.ink, marginBottom: 2 }}>{k.action}</div>
            <Meta color={i === 0 ? 'rgba(244,240,232,0.52)' : T.ink4}>{k.label} · {k.meta}</Meta>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaptureInputs() {
  const cast = ['K', 'A', 'mom'].map(getCast).filter(Boolean);
  const wave = [5,10,7,15,9,19,12,24,14,18,11,21,8,13,6,10];
  return (
    <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
      <CaptureCard kicker="01 · 文字素材" title="记一句此刻想法">
        <div style={{
          minHeight: 66, borderRadius: 8, border: `0.5px solid ${T.line}`,
          background: 'rgba(244,240,232,0.72)', padding: '12px 13px',
          fontFamily: T.serif, fontSize: 14, color: T.ink2, lineHeight: 1.5,
        }}>刚刚有一秒觉得：这个 demo 真的可以上线。</div>
      </CaptureCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <CaptureCard kicker="02 · PHOTO" title="拍一张现场" accent={T.teal}>
          <div style={{ height: 94, borderRadius: 7, overflow: 'hidden', marginBottom: 8 }}>
            <PosterPlaceholder hue={T.teal} label="IMG" sub="20:41" dense />
          </div>
          <Meta color={T.ink3}>地点 · 楼下咖啡店</Meta>
        </CaptureCard>
        <CaptureCard kicker="03 · VOICE" title="录一段声音" accent={T.wine}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 32 }}>
            {wave.map((h, i) => <div key={i} style={{ width: 2, height: h, borderRadius: 2, background: i < 9 ? T.wine : 'rgba(27,26,23,0.12)' }} />)}
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip color={T.wine} bg="rgba(120,45,36,0.10)">录音中</Chip>
            <Meta color={T.ink4}>不转写</Meta>
          </div>
        </CaptureCard>
      </div>

      <CaptureCard kicker="04 · CAST TAG" title="标人物出场" accent={T.violet}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cast.map(c => (
            <Chip key={c.id} color={T[c.color] || T.violet} bg="rgba(27,26,23,0.04)">
              {c.name} · {c.tag}
            </Chip>
          ))}
          <Chip color={T.ink3} bg="transparent">+ 添加角色</Chip>
        </div>
      </CaptureCard>
    </div>
  );
}

function CapturePage() {
  const rawCount = E18_FRAGMENTS.length;
  const nextRawCount = rawCount + 1;
  const hasLargeArchive = rawCount >= 100;
  const saveCtaLabel = hasLargeArchive ? '继续收进 E18 拍摄素材' : '收进 E18 拍摄素材';
  const saveCountLabel = hasLargeArchive ? '100+ 素材' : `第 ${nextRawCount} 条素材`;
  return (
    <Screen label="08 拍摄模式">
      <CaptureHero />
      <KindRail />
      <CaptureInputs />
      <div style={{ height: 120 }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 20px 30px',
        background: 'linear-gradient(180deg, rgba(244,240,232,0), rgba(244,240,232,0.96) 30%, #F4F0E8)',
      }}>
        <button style={{
          width: '100%', border: 'none', borderRadius: 12,
          background: T.amber, color: T.bg, padding: '15px 18px',
          fontFamily: T.serif, fontSize: 15, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 22px rgba(27,26,23,0.10)',
        }}>
          <span>{saveCtaLabel}</span>
          <span style={{
            fontFamily: T.mono, fontSize: 10, letterSpacing: 1.2,
            padding: '3px 7px', borderRadius: 100,
            background: hasLargeArchive ? 'rgba(27,26,23,0.16)' : 'rgba(244,240,232,0.18)',
            border: `0.5px solid ${hasLargeArchive ? 'rgba(244,240,232,0.45)' : 'rgba(244,240,232,0.22)'}`,
          }}>{saveCountLabel}</span>
        </button>
      </div>
    </Screen>
  );
}

Object.assign(window, { CapturePage });
