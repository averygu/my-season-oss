# North Star · Season 2026

This is the immutable reference every improvement run measures against.
"Improvement" is defined as: **closer to this north star, or fixing a
regression away from it**.

If you can't show how a candidate change brings the prototype closer to
one of the principles below, it is not an improvement — it is busywork.
File it under `## Needs human input` rather than ship it.

---

## §1 · What this product actually is

不是日记 app, 不是目标管理 app, 是**叙事化的人生经营系统**。
把一年当作一季美剧来经营 —— 每两周一集，年底回看时能看到完整的剧情结构：
主线、人物、伏笔、抛弃的目标、追溯升级的线索。

- 普通日记问"今天做了什么" —— 回忆视角。
- 这个 app 问："这一集发生了什么？主线推进了吗？新角色登场了吗？伏笔埋下了吗？" —— **叙事视角**。

差别不在皮肤，在底层数据结构和使用节奏。视觉是叙事的载体，不是装饰。

---

## §2 · 五个底层判断（少一个都退化）

### 判断 1 · 拍摄与剪辑分离
- 拍摄模式：录原始 fragment（10 秒级、零负担）—— 一张照片、一句话、几个人名 tag、一个情绪
- 剪辑模式：每两周一次主动行为（15–30 分钟），把 fragments 编成一集
- **关键：剪辑必须由用户亲手做，不能交给算法**。仪式感来自亲手取舍，不来自缝合。

### 判断 2 · 24 集 / Bi-weekly / Additive
- 一年 24 集，每两周一集
- 任意时间点都可补 fragment 到任意已有集
- 漏录不破链 —— ADHD 友好
- **没有每日打卡，没有 streak**。streak 直接违反 additive 设计。

### 判断 3 · 双向剧情线（前置 + 追溯 + 放弃）
- **前置主线 (Pre-declared)**：年初宣告
- **追溯主线 (Promoted)**：年中事件可追认为主线（参考老友记 Ross/Rachel —— 第 7 集才被追溯升级为本季隐线）
- **放弃主线 (Abandoned)**：归档不是失败，是叙事价值 —— "被这一季的我抛弃的目标"本身就是一种结构

### 判断 4 · Filler Episode 合法化
- 明确允许"本集无主线推进"，标记为 bottle episode 或 off-season
- 防止退化成 goal-tracker，避免"没进展不敢录 → arc 断 → 不打开"的螺旋

### 判断 5 · 高频面必须极简（2026-06-10 · 来自真实朋友测试）
- 反馈原话：「界面复杂、功能多、文字多，不知道怎么开始最小使用」
- 信息架构基准：3 tab = 今天(拍) / 本集(剪) / 本季(看)，对应使用频率 高 / 中 / 低
- 默认首屏只有一个主行动「拍一条」；今天屏可见文字预算 ≤ 20 词
- 产品解释只允许一句话：「把一年当一季剧 —— 随手拍，两周剪一集」
- 深度叙事（人物 / 主线 / 悬念 / 前情 / 季终）退到「本季」二级入口——是回看的奖赏，不是日常的负担
- **给新用户加理解 ≠ 加文字**。修「看不懂」优先减层级、减元素、减字；加解释文案是最后手段

---

## §3 · Visual / brand grammar

- 暖米白底 (`#F4F0E8`) + 深炭灰字 (`#1B1A17`) — ChatGPT Atlas 风格
- Hero 位是流媒体首映海报，不是公司化 chrome
- 字体：Noto Serif SC（标题）+ Playfair Display（display）+ JetBrains Mono（编号/元数据）+ system sans
- 配色语义：burnt amber（推进）/ wine（危机）/ violet（追溯升级）/ sage（温和长期）/ abandoned-grey（已放弃）
- 档案馆式编号感：`S01·E18`, `ARC 03`, `HEAT 78` —— 编号是仪式

---

## §4 · Quality bar（每个候选任务都过这三关）

任意一关 No → 不取这条任务；改写它，或移到 `## Needs human input`。

1. **Falsifiable**（可验证）— 改完之后第三个人能客观判断它落地了吗？
   - ✓ "EditModeOverlay 上 5 个 step kicker 在暗背景下对比度从 X 升到 ≥ 4.5"
   - ✗ "让 modal 看起来更舒服"

2. **North-star aligned**（能挂钩）— 这个改动让原型更靠近 §1–§3 哪一条？
   写出来一句话。如果挂不上，就是"代码洁癖"，不是"产品改进"。
   - ✓ "B-008 拍摄入口缺失 → 直接对应判断 1（拍摄与剪辑分离）"
   - ✗ "重构 Sparkline 组件让代码更整洁" —— 与 north star 无关

3. **Not busywork**（不是凑数）— 一个有品味的产品设计师审 PR 时，会觉得这个改动值得他的 review 时间吗？
   - ✓ TabBar 5 个 tab 长短不齐 —— 视觉一致性是真问题
   - ✗ 把所有 `marginBottom: 32` 改成 `30` —— 假问题

---

## §5 · Audit lenses（empty-backlog 时按运行号轮换）

不要用一个固定 checklist。每次 `## Backlog` 空了，根据 JOURNAL 里最新的
Run #N，**只用一个镜头**把整份代码 + 设计审一遍，产出 3–6 条新 BACKLOG，然后
本轮结束。下次 empty-backlog 自动用下一个镜头。

| `N % 8` | 镜头 | 问什么 |
|---|---|---|
| 0 | **Brand / 海报感** | Hero 还像电影海报吗？字体层级是否电影感？mono meta 该出现的地方都出现了吗？还有 Netflix-暗色 残留吗？ |
| 1 | **判断 1 · 拍摄/剪辑分离** | 拍摄模式入口在哪？fragment 录入流真的"零负担"吗？AI 是否在偷偷替代用户取舍？|
| 2 | **判断 2 · Additive 不破链** | 漏录真的不破链吗？UI 上有没有暗藏 streak 心智？空集 / 跳过的集视觉是否合法？|
| 3 | **判断 3 · 双向剧情线** | 追溯升级的 UI 重量够不够（这是核心差异化）？放弃归档是否被表达为"腾位"而非"失败"？前置 vs 追溯在视觉上能不能一眼区分？|
| 4 | **判断 4 · Filler 合法化** | bottle episode 是 UI 一等公民还是被默认打折？无主线推进的集还吸引人吗？|
| 5 | **新用户 30 秒** | 一个第一次打开的人，30 秒内能抓到这个 app 是干嘛的吗？哪个跳跃太大？哪个术语没解释（"Cliffhanger"、"Promoted"）？修复方向默认是减层级 / 减元素 / 减字，而不是加解释（判断 5）|
| 6 | **跨屏数据一致** | Cast 出场次数、Plot heat、Cliff stale —— 这些数字在不同 artboard 互相印证还是各自瞎编？有 magic numbers 吗？|
| 7 | **空 / 满 / 错状态** | 0 fragment / 100 fragment / AI 不可用 / 网断 / 字体没加载 / 第一次开 app —— 哪些状态从未被设计过？|

每次 audit 用的镜头要在 JOURNAL 里写明：`**Lens:** §5.{N % 8}`。轮转的好处是
agent 永远不会"看不见"自己的盲区 —— 单一镜头会忽略某类问题，多镜头组合就不会。

---

## §6 · Drift guards（防止运行半年后变成另一个产品）

这个 agent 设计为完全无人值守 —— 用户不会在循环里。两条**全自愈**的 drift guard
保证它不会越跑越偏：

### 6.1 · 每 7 次 shipped 后强制"凝聚审计"（自愈版）

读最近 7 条 `✅ shipped` 的 JOURNAL entries，问 "这些改动加在一起还是同一个产品吗？
有没有哪条违背 §1–§3？哪两条互相冲突？"

- **答 Yes（无漂移）**：在 JOURNAL 当前 entry 里写 `**Cohesion check:** clean`，
  正常进入本轮的 pick → implement 流程。
- **答 No（检测到漂移）**：
  1. 写 `DRIFT_REPORT.md` 列出冲突点和最可能的元凶 commit（具体到 Run #N）
  2. 在 BACKLOG.md 顶部 file 一条 P0 自指任务：`B-DRIFT-N · 修复 Run #N 引入的漂移`，
     success criterion 引用 DRIFT_REPORT.md
  3. **本轮就此结束**（不实施新改动），下次 schedule 醒来 agent 看到 P0 在顶，
     自然会先修 drift 再做别的
- 不需要任何人工干预 —— drift 是一个自动产生、自动消化的任务。

### 6.2 · 单文件高频改动锁
同一个文件被连续 3 次 shipped run 修改 → 该文件锁定 24 小时（agent 不能再碰它）。
强制让其他文件 / 其他 lens 有机会被审视，避免"在一个 button padding 上反复刷漆"。

锁的实现：在 JOURNAL 写一条 `**Locked-files:** app/episode.jsx (until 2026-05-08 14:00)`。
Agent 启动时扫所有未过期 lock。被锁文件上的 BACKLOG 任务自动跳过（不取，
不删，等锁过期再取）。

---

## §7 · Self-recovery conditions（卡住时怎么自动调整方向）

Agent 不会因为这些条件而真正停下 —— 它们是**自动换挡**信号，让 agent 在
卡住时切换工作模式，而不是空转或硬撑：

1. **§4 quality bar 连续 3 轮全部 fail** → BACKLOG 顶部那批任务全是凑数的。
   忽略 BACKLOG，强制走一次 §5 audit-lens cycle 重新填 backlog。
   下一轮自然会从新填的、过 bar 的任务里取。
2. **同一 lens 连续 2 次 audit 产出 < 3 条 backlog** → 该镜头暂时榨干。
   写 `**Lens-cooldown:** §5.X (until YYYY-MM-DD)` 到 JOURNAL，跳到下一个 lens。
   24 小时后该 lens 自动解冻。
3. **JOURNAL 累积 60 条 ✅ shipped** → 触发一次"季度复盘"。本轮不 ship 代码，
   产出 `RETRO.md` 总结这 60 条改动里哪些方向最有效、哪些是徒劳，建议
   下一阶段 focus 在哪几个 lens。**写完 retro 后正常进入下一轮 cycle**
   （不再像旧版那样停下等审）。RETRO.md 自身就是给将来的人/agent 留的备忘。

这些机制确保 agent 在任何"看起来无事可做"的情况下都能自动找到一条新路径，
不会变成空转的死循环也不会硬撑产出垃圾。
