# My Season · 我的这一季

**Capture moments. Edit episodes. Keep authorship of your own story.**

My Season is an early-stage narrative memory app. It treats a year as a season of 24 episodes: capture short fragments, return for a two-week edit, and review the season over time. The central rule is **AI rough cut, human final cut**. AI proposes interpretations; the user decides what an episode means.

中文：把一年当一季剧——随手记录，两周剪一集。原始素材与 AI 候选分开保存，最终取舍由你确认。

## What works

- Capture text fragments and person tags.
- Edit an episode manually: include/exclude fragments, choose a title and mood, then confirm.
- Add fragments to past, unedited episodes; review completed episodes; mark or undo a quiet/off-season episode.
- Save records in browser storage; export/import JSON.
- Optionally request scene groups, three titles and evidence-linked questions from a server-side AI adapter. AI failure leaves the manual flow available.

Photo/voice storage, accounts, cloud sync and automatic life-story analysis are not implemented. The design canvas contains illustrative sample content and concepts beyond the runnable app.

## Run locally

Clone or download the repository, then from its root run:

```sh
python3 -m http.server 8765
```

Open **http://localhost:8765/app.html** for the runnable app. **http://localhost:8765/index.html** opens the separate design canvas.

No npm installation or build step is needed. This existing prototype requires HTTP hosting: direct `file://` opening is not supported. React/Babel are loaded from unpkg and fonts from Google, so those resources need a network connection. Static hosting is sufficient for the manual workflow; AI needs the optional server described below.

## Architecture

| File | Responsibility |
|---|---|
| `app/store.js` | Browser-local fragments, episodes and JSON import/export |
| `app/live.jsx` | Capture, editing, season review and optional AI candidates |
| `netlify/functions/rough-cut.mjs` | Server-side Responses API adapter and evidence validation |
| `app.html` | Runnable app entry |
| `index.html`, `design-canvas.jsx` | Separate prototype/design reference |
| `NORTH_STAR.md` | Product principles and original design constraints |

AI does not edit the original fragment text or confirm an episode. The server validates that accepted fragment IDs form a complete, non-duplicated partition and that questions cite supplied IDs. This checks references, not whether every generated interpretation is factually correct.

## Optional AI, privacy and cost

Deploy the app and `netlify/functions/rough-cut.mjs` on the same Netlify origin and configure `OPENAI_API_KEY` in the Functions runtime. The key belongs on the server; never put it in HTML, browser storage, a public issue or Git. The committed adapter requests `gpt-5.6`; check model availability for your own account. A successful current live-model call is not claimed by this release.

Clicking **开始粗剪** sends the episode number and that episode's fragment IDs, text and person tags to the deployment's Function, which forwards accepted input to OpenAI. The current adapter takes only the first 24 fragments, truncates each body to 600 characters and each tag to 80 characters, then validates that accepted subset. Larger input is not fully represented. The API request uses `store: false`; this is not a blanket promise of zero retention across all services.

The Function currently has **no authentication, rate limit or per-user budget**. Before enabling AI on a shared deployment, implement server-side access controls, quotas and abuse protection. A server-side key or CORS setting alone does not prevent third-party calls. AI uses the deployment owner's OpenAI account and may incur model and hosting charges. The manual flow needs no API key.

Records belong to the current browser/origin's localStorage, with an in-memory fallback if storage fails. There is no cloud backup. Clearing browser data, switching browsers or changing domains may make records unavailable. Export important records first. Exported JSON is plain text; importing replaces the current dataset instead of merging it. Use fictional material for public bug reports and shared demos.

## Development and verification

This repository has no packaged automated test suite. Before submitting a change, check affected JavaScript/JSX, open the runnable app, and exercise capture → reload → manual edit → season review. Test import only with a disposable browser dataset because it replaces current data. AI validation should use mocked upstream responses before a separately authorized live call.

Known gaps include AI input truncation and deployment abuse controls. The prototype is not a production multi-user service.

## Contributing

Issues and focused pull requests are welcome, especially around evidence integrity, data portability, recoverable editing and accessibility. Include reproducible steps using fictional fragments. Read `NORTH_STAR.md` before proposing product changes; preserve the separation between raw material, AI candidates and the user's final decisions.

This public edition starts from a reviewed source snapshot. Private development history, assistant settings and personal pitch materials are excluded. It does not claim download volume, broad adoption or that the public repository contains the prior private commit history.

## License

Project code is available under the [MIT License](LICENSE). External libraries, fonts and other third-party resources retain their own licenses.
