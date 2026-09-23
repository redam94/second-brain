/* Shared, dependency-free data handling. No text from notes is interpreted as HTML. */
(function (root) {
  function normalize(index) {
    const entries = Object.entries(index).filter(([, n]) => n && typeof n === 'object');
    const nodes = entries.map(([id, n]) => {
      const parts = id.split('/');
      const group = parts[0] === 'Research' && parts.length > 2 ? parts[1] : parts[0];
      return { id, title: String(n.title || id), group, tags: Array.isArray(n.tags) ? n.tags.map(String) : [],
        isHub: /^(?:_?index|_vault_index)$/i.test(parts.at(-1)),
        excerpt: String(n.content || '').replace(/\s+/g, ' ').slice(0, 200), degree: 0 };
    });
    const byId = new Map(nodes.map(n => [n.id, n]));
    const links = [], seen = new Set(), omitted = new Set();
    for (const [source, n] of entries) {
      for (const target of Array.isArray(n.links) ? n.links : []) {
        if (!byId.has(target)) { omitted.add(target); continue; }
        const key = JSON.stringify([source, target]);
        if (source === target || seen.has(key)) continue;
        seen.add(key); links.push({ source, target });
      }
    }
    const adjacent = adjacency(nodes, links);
    for (const n of nodes) n.degree = adjacent.get(n.id).size;
    return { nodes, links, omittedTargets: omitted.size };
  }
  const idOf = node => typeof node === 'object' ? node.id : node;
  function adjacency(nodes, links) {
    const adjacent = new Map(nodes.map(n => [n.id, new Set()]));
    for (const l of links) {
      const source = idOf(l.source), target = idOf(l.target);
      if (adjacent.has(source) && adjacent.has(target)) {
        adjacent.get(source).add(target); adjacent.get(target).add(source);
      }
    }
    return adjacent;
  }
  function neighborhood(id, hops, adjacent) {
    const found = new Set([id]); let frontier = [id];
    for (let i = 0; i < hops; i++) {
      const next = [];
      for (const current of frontier) for (const neighbor of adjacent.get(current) || []) {
        if (!found.has(neighbor)) { found.add(neighbor); next.push(neighbor); }
      }
      frontier = next;
    }
    return found;
  }
  // Encode each path segment: titles can contain ?, #, parentheses and non-ASCII text.
  function noteURL(id, base) {
    if (!id || id === 'index') return new URL('./', base).href;
    return new URL(id.split('/').map(encodeURIComponent).join('/'), base).href;
  }
  root.GraphData = { normalize, adjacency, neighborhood, idOf, noteURL };
  if (typeof module !== 'undefined') module.exports = root.GraphData;
})(typeof self !== 'undefined' ? self : globalThis);
