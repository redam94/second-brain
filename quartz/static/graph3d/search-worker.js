importScripts('./vendor/minisearch.min.js', './graph-data.js');
let searchIndex, content, graph, byId;
const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
function excerpt(text, query) {
  text = clean(text);
  const terms = query.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  const positions = terms.map(t => text.toLowerCase().indexOf(t)).filter(i => i >= 0);
  const start = positions.length ? Math.max(0, Math.min(...positions) - 55) : 0;
  return (start ? '…' : '') + text.slice(start, start + 190) + (text.length > start + 190 ? '…' : '');
}
self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'init') {
      const response = await fetch(data.url);
      if (!response.ok) throw new Error(`Content index returned HTTP ${response.status}`);
      content = await response.json();
      graph = GraphData.normalize(content);
      if (!graph.nodes.length) throw new Error('The content index contains no notes.');
      byId = new Map(graph.nodes.map(n => [n.id, n]));
      self.postMessage({ type: 'graph', graph });
      searchIndex = new MiniSearch({ fields: ['title', 'tags', 'content'],
        searchOptions: { boost: { title: 8, tags: 3 }, prefix: true, fuzzy: term => term.length >= 5 ? 0.2 : false, combineWith: 'AND' } });
      searchIndex.addAll(graph.nodes.map(n => ({ id: n.id, title: n.title,
        tags: n.tags.join(' '), content: clean(content[n.id].content) })));
      self.postMessage({ type: 'ready' });
    } else if (data.type === 'search') {
      if (!searchIndex) return;
      const started = performance.now();
      const hits = searchIndex.search(data.query, { filter: hit => {
        const n = byId.get(hit.id);
        return (!data.group || n.group === data.group) && (!data.tag || n.tags.includes(data.tag));
      } });
      self.postMessage({ type: 'results', requestId: data.requestId, total: hits.length,
        elapsed: performance.now() - started,
        hits: hits.slice(0, 40).map(h => ({ id: h.id, excerpt: excerpt(content[h.id].content, data.query) })) });
    } else if (data.type === 'detail') {
      self.postMessage({ type: 'detail', id: data.id, excerpt: clean(content[data.id]?.content).slice(0, 1100) });
    }
  } catch (error) {
    self.postMessage({ type: 'error', phase: data.type, message: String(error.message || error) });
  }
};
