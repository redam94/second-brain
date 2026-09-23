importScripts('./vendor/minisearch.min.js', './graph-data.js');
let searchIndex, content, graph, byId;
const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
const fold = value => value.toLowerCase().replace(/[\s_]+/g, '-');
// "#bayes" or "tag:causal-inference" narrow by tag (substring of the full tag, e.g. topic/bayesian-statistics).
function parseQuery(query) {
  const tags = [];
  const text = query.replace(/(?:^|\s)(?:#|tag:)([^\s#]+)/gi, (_, tag) => { tags.push(fold(tag)); return ' '; });
  return { text: clean(text), tags };
}
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
      const started = performance.now();
      self.postMessage({ type: 'insights', insights: GraphData.analyze(graph.nodes, graph.links), elapsed: performance.now() - started });
      searchIndex = new MiniSearch({ fields: ['title', 'tags', 'section', 'content'],
        searchOptions: { boost: { title: 8, tags: 3, section: 2 }, prefix: true, fuzzy: term => term.length >= 5 ? 0.2 : false,
          // Well-connected notes are better entry points, so they win close calls.
          boostDocument: id => 1 + Math.log1p(byId.get(id).degree) / 10 } });
      searchIndex.addAll(graph.nodes.map(n => ({ id: n.id, title: n.title, section: n.group.replaceAll('-', ' '),
        tags: n.tags.join(' '), content: clean(content[n.id].content) })));
      self.postMessage({ type: 'ready' });
    } else if (data.type === 'search') {
      if (!searchIndex) return;
      const started = performance.now();
      const { text, tags } = parseQuery(data.query);
      const keep = n => (!data.group || n.group === data.group) && (!data.tag || n.tags.includes(data.tag))
        && tags.every(t => n.tags.some(tag => tag.toLowerCase().includes(t)));
      const filter = hit => keep(byId.get(hit.id));
      let hits, loose = false;
      if (text) {
        hits = searchIndex.search(text, { filter, combineWith: 'AND' });
        // Every word must match first; fall back to any word rather than showing nothing.
        if (!hits.length && text.includes(' ')) { hits = searchIndex.search(text, { filter, combineWith: 'OR' }); loose = hits.length > 0; }
      } else {
        hits = graph.nodes.filter(keep).sort((a, b) => b.degree - a.degree).map(n => ({ id: n.id }));
      }
      self.postMessage({ type: 'results', requestId: data.requestId, total: hits.length, loose, tags,
        elapsed: performance.now() - started, ids: hits.map(h => h.id),
        hits: hits.slice(0, 40).map(h => ({ id: h.id, excerpt: text ? excerpt(content[h.id].content, text) : '' })) });
    } else if (data.type === 'detail') {
      self.postMessage({ type: 'detail', id: data.id, excerpt: clean(content[data.id]?.content).slice(0, 1100) });
    }
  } catch (error) {
    self.postMessage({ type: 'error', phase: data.type, message: String(error.message || error) });
  }
};
