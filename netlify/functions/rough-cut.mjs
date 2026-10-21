function roughCutSchema() { return {
  type: 'object', additionalProperties: false,
  required: ['scenes', 'title_options', 'cliffhanger_candidates'],
  properties: {
    scenes: { type: 'array', minItems: 1, maxItems: 5, items: {
      type: 'object', additionalProperties: false, required: ['name', 'summary', 'fragment_ids'],
      properties: { name: { type: 'string' }, summary: { type: 'string' }, fragment_ids: {
        type: 'array', minItems: 1, items: { type: 'string' },
      } },
    } },
    title_options: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'string' } },
    cliffhanger_candidates: { type: 'array', maxItems: 3, items: {
      type: 'object', additionalProperties: false, required: ['question', 'evidence_ids'],
      properties: { question: { type: 'string' }, evidence_ids: {
        type: 'array', minItems: 1, items: { type: 'string' },
      } },
    } },
  },
}; }

const reply = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

function validateDraft(draft, fragments) {
  const ids = new Set(fragments.map((f) => f.id));
  const grouped = draft.scenes.flatMap((scene) => scene.fragment_ids);
  const validPartition = grouped.length === ids.size && new Set(grouped).size === ids.size && grouped.every((id) => ids.has(id));
  const validCliffs = draft.cliffhanger_candidates.every((c) => c.evidence_ids.every((id) => ids.has(id)));
  if (draft.title_options.length !== 3 || new Set(draft.title_options).size !== 3 || !validPartition || !validCliffs) throw new Error('invalid_evidence');
  return draft;
}

export default async function handler(request) {
  if (request.method !== 'POST') return reply(405, { error: '只接受 POST' });
  const apiKey = Netlify.env.get('OPENAI_API_KEY');
  if (!apiKey) return reply(503, { error: 'AI 尚未配置，可继续手动剪辑' });
  try {
    const input = await request.json();
    const fragments = (Array.isArray(input.fragments) ? input.fragments : []).slice(0, 24).map((f) => ({
      id: String(f.id || ''), body: String(f.body || '').slice(0, 600), tag: f.tag ? String(f.tag).slice(0, 80) : undefined,
    })).filter((f) => f.id && (f.body || f.tag));
    if (!fragments.length) return reply(400, { error: '至少需要一条素材' });

    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-5.6', store: false, reasoning: { effort: 'low' }, max_output_tokens: 1200,
        instructions: '你是 My Season 的粗剪助理。把每条素材恰好放入一个场景；给出恰好三个克制、具体、像剧集名的中文标题；只从证据中提出未解决问题。不得删除素材、替用户定剪、心理诊断或编造 fragment id。',
        input: JSON.stringify({ episode: Number(input.episode), fragments }),
        text: { verbosity: 'low', format: { type: 'json_schema', name: 'my_season_rough_cut', strict: true, schema: roughCutSchema() } },
      }),
    });
    if (!upstream.ok) return reply(502, { error: 'GPT-5.6 暂时不可用，可继续手动剪辑' });
    const data = await upstream.json();
    const text = data.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;
    const draft = validateDraft(JSON.parse(text), fragments);
    return reply(200, { draft, model: data.model || 'gpt-5.6' });
  } catch (error) {
    return reply(502, { error: error.message === 'invalid_evidence' ? 'AI 证据校验未通过，可重试或手动剪辑' : '粗剪失败，可继续手动剪辑' });
  }
}
