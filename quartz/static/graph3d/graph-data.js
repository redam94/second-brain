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
  // Graph analytics over content notes (index/hub notes excluded: they link to everything and swamp every ranking).
  // Returns plain data; the UI decides what to show.
  function analyze(allNodes, allLinks, top = 8) {
    const nodes = allNodes.filter(n => !n.isHub), ids = new Set(nodes.map(n => n.id)), byId = new Map(nodes.map(n => [n.id, n]));
    const directed = allLinks.filter(l => ids.has(l.source) && ids.has(l.target));
    const adj = adjacency(nodes, directed), deg = id => adj.get(id).size;
    const directedKeys = new Set(directed.map(l => l.source + '\u0000' + l.target));
    const edges = [];
    for (const [a, set] of adj) for (const b of set) if (a < b) edges.push([a, b]);
    const n = nodes.length, m = edges.length;

    // Connected components (undirected).
    const comp = new Map(); let components = 0, largest = 0;
    for (const start of ids) {
      if (comp.has(start)) continue;
      let size = 0; const stack = [start]; comp.set(start, components);
      while (stack.length) { const v = stack.pop(); size++; for (const w of adj.get(v)) if (!comp.has(w)) { comp.set(w, components); stack.push(w); } }
      largest = Math.max(largest, size); components++;
    }

    // PageRank on the directed link graph (damping .85); dangling notes spread rank evenly.
    const out = new Map(nodes.map(v => [v.id, []]));
    for (const l of directed) out.get(l.source).push(l.target);
    let rank = new Map(nodes.map(v => [v.id, 1 / n]));
    for (let iter = 0; iter < 40; iter++) {
      const next = new Map(nodes.map(v => [v.id, .15 / n])); let dangling = 0;
      for (const [v, targets] of out) {
        const r = rank.get(v);
        if (!targets.length) dangling += r; else for (const t of targets) next.set(t, next.get(t) + .85 * r / targets.length);
      }
      for (const [v, r] of next) next.set(v, r + .85 * dangling / n);
      rank = next;
    }

    // Betweenness centrality (Brandes, undirected, unweighted).
    const between = new Map(nodes.map(v => [v.id, 0]));
    for (const s of ids) {
      const stack = [], pred = new Map(), sigma = new Map([[s, 1]]), dist = new Map([[s, 0]]), queue = [s];
      for (let qi = 0; qi < queue.length; qi++) {
        const v = queue[qi]; stack.push(v);
        for (const w of adj.get(v)) {
          if (!dist.has(w)) { dist.set(w, dist.get(v) + 1); queue.push(w); }
          if (dist.get(w) === dist.get(v) + 1) { sigma.set(w, (sigma.get(w) || 0) + sigma.get(v)); (pred.get(w) || pred.set(w, []).get(w)).push(v); }
        }
      }
      const delta = new Map();
      while (stack.length) {
        const w = stack.pop();
        for (const v of pred.get(w) || []) delta.set(v, (delta.get(v) || 0) + sigma.get(v) / sigma.get(w) * (1 + (delta.get(w) || 0)));
        if (w !== s) between.set(w, between.get(w) + (delta.get(w) || 0));
      }
    }
    const pairsCount = (n - 1) * (n - 2); // undirected sums count each pair twice
    for (const [v, b] of between) between.set(v, pairsCount ? b / pairsCount : 0);

    // Section mixing: how many links stay inside each section vs. leave it.
    const sectionPair = (a, b) => a < b ? a + '\u0000' + b : b + '\u0000' + a;
    const pairLinks = new Map(), sectionStats = new Map();
    for (const v of nodes) { const st = sectionStats.get(v.group) || { notes: 0, internal: 0, external: 0 }; st.notes++; sectionStats.set(v.group, st); }
    let crossLinks = 0;
    for (const [a, b] of edges) {
      const ga = byId.get(a).group, gb = byId.get(b).group, key = sectionPair(ga, gb);
      pairLinks.set(key, (pairLinks.get(key) || 0) + 1);
      if (ga === gb) sectionStats.get(ga).internal++;
      else { crossLinks++; sectionStats.get(ga).external++; sectionStats.get(gb).external++; }
    }

    // Surprising connections: cross-section links whose ends share few neighbours, between sections that rarely link.
    const surprising = [];
    for (const [a, b] of edges) {
      const ga = byId.get(a).group, gb = byId.get(b).group;
      if (ga === gb || deg(a) < 3 || deg(b) < 3) continue;
      let shared = 0;
      for (const w of adj.get(a)) if (w !== b && adj.get(b).has(w)) shared++;
      const union = deg(a) + deg(b) - 2 - shared;
      const overlap = union > 0 ? shared / union : 0;
      const pairShare = pairLinks.get(sectionPair(ga, gb)) / m;
      surprising.push({ a, b, shared, score: (1 - overlap) * -Math.log(pairShare) });
    }
    surprising.sort((x, y) => y.score - x.score);

    // Likely missing links: unlinked pairs with many specific shared neighbours (Adamic-Adar).
    const aa = new Map();
    for (const [w, set] of adj) {
      if (set.size < 2) continue;
      const weight = 1 / Math.log(set.size), list = [...set];
      for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
        const [a, b] = list[i] < list[j] ? [list[i], list[j]] : [list[j], list[i]];
        if (adj.get(a).has(b)) continue;
        const key = a + '\u0000' + b, cur = aa.get(key);
        if (cur) { cur.score += weight; cur.shared++; } else aa.set(key, { a, b, score: weight, shared: 1 });
      }
    }
    const missing = [...aa.values()].filter(p => p.shared >= 3).sort((x, y) => y.score - x.score);

    // One appearance per note keeps a single prolific note from filling a list.
    const varied = list => { const used = new Set(), keep = [];
      for (const p of list) { if (used.has(p.a) || used.has(p.b)) continue; used.add(p.a); used.add(p.b); keep.push(p); if (keep.length === top) break; }
      return keep; };
    const ranked = (map, k) => [...map].sort((x, y) => y[1] - x[1]).slice(0, k).map(([id, value]) => ({ id, value, degree: deg(id) }));
    const reciprocal = directed.filter(l => directedKeys.has(l.target + '\u0000' + l.source)).length;
    return {
      stats: { notes: n, links: m, avgDegree: n ? 2 * m / n : 0, density: n > 1 ? 2 * m / (n * (n - 1)) : 0,
        components, largestShare: n ? largest / n : 0, isolated: nodes.filter(v => !deg(v.id)).length,
        crossShare: m ? crossLinks / m : 0, reciprocity: directed.length ? reciprocal / directed.length : 0 },
      sections: [...sectionStats].map(([group, st]) => ({ group, ...st,
        openness: st.internal + st.external ? st.external / (st.internal + st.external) : 0 })).sort((x, y) => y.notes - x.notes),
      pagerank: ranked(rank, top), bridges: ranked(between, top),
      surprising: varied(surprising), missing: varied(missing),
    };
  }
  // Encode each path segment: titles can contain ?, #, parentheses and non-ASCII text.
  function noteURL(id, base) {
    if (!id || id === 'index') return new URL('./', base).href;
    return new URL(id.split('/').map(encodeURIComponent).join('/'), base).href;
  }
  root.GraphData = { normalize, adjacency, neighborhood, idOf, noteURL, analyze };
  if (typeof module !== 'undefined') module.exports = root.GraphData;
})(typeof self !== 'undefined' ? self : globalThis);
