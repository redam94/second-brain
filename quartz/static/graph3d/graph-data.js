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
  // With `subset` (a Set of note ids) the same analysis runs on that sub-graph alone, plus a `boundary`
  // report on the links that leave it.
  function analyze(allNodes, allLinks, { top = 10, subset = null } = {}) {
    const content = allNodes.filter(n => !n.isHub);
    const nodes = subset ? content.filter(n => subset.has(n.id)) : content;
    const ids = new Set(nodes.map(n => n.id)), byId = new Map(nodes.map(n => [n.id, n]));
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
    // The same breadth-first passes give path lengths: the average, and the two notes farthest apart.
    const between = new Map(nodes.map(v => [v.id, 0]));
    let pathSum = 0, pathPairs = 0, farthest = null;
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
        if (w === s) continue;
        between.set(w, between.get(w) + (delta.get(w) || 0));
        const d = dist.get(w); pathSum += d; pathPairs++;
        if (!farthest || d > farthest.distance) farthest = { a: s, b: w, distance: d };
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
    // The same pass over neighbour pairs gives local clustering: how many of a note's neighbours link to each other.
    const aa = new Map(); let clusteringSum = 0, clusteringNotes = 0;
    for (const [w, set] of adj) {
      if (set.size < 2) continue;
      const weight = 1 / Math.log(set.size), list = [...set]; let closed = 0;
      clusteringNotes++;
      for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
        const [a, b] = list[i] < list[j] ? [list[i], list[j]] : [list[j], list[i]];
        if (adj.get(a).has(b)) { closed++; continue; }
        const key = a + '\u0000' + b, cur = aa.get(key);
        if (cur) { cur.score += weight; cur.shared++; } else aa.set(key, { a, b, score: weight, shared: 1 });
      }
      clusteringSum += closed / (list.length * (list.length - 1) / 2);
    }
    const missing = [...aa.values()].filter(p => p.shared >= 3).sort((x, y) => y.score - x.score);

    // One appearance per note keeps a single prolific note from filling a list.
    const varied = list => { const used = new Set(), keep = [];
      for (const p of list) { if (used.has(p.a) || used.has(p.b)) continue; used.add(p.a); used.add(p.b); keep.push(p); if (keep.length === top) break; }
      return keep; };
    const ranked = (map, k) => [...map].sort((x, y) => y[1] - x[1]).slice(0, k).map(([id, value]) => ({ id, value, degree: deg(id) }));
    const reciprocal = directed.filter(l => directedKeys.has(l.target + '\u0000' + l.source)).length;
    const sections = [...sectionStats].map(([group, st]) => ({ group, ...st,
      openness: st.internal + st.external ? st.external / (st.internal + st.external) : 0 })).sort((x, y) => y.notes - x.notes);

    // Section mixing matrix: links between every pair of sections (symmetric; the diagonal is links inside a section).
    const groups = sections.map(s => s.group);
    const matrix = { groups, counts: groups.map(a => groups.map(b => pairLinks.get(sectionPair(a, b)) || 0)) };

    // Degree distribution in doubling bins.
    const bins = [[0, 0], [1, 1], [2, 2], [3, 4], [5, 8], [9, 16], [17, 32], [33, Infinity]];
    const degreeHist = bins.map(([lo, hi]) => ({ label: lo === hi ? String(lo) : hi === Infinity ? `${lo}+` : `${lo}–${hi}`,
      count: nodes.filter(v => deg(v.id) >= lo && deg(v.id) <= hi).length }));

    // Detected clusters (Louvain): groups of notes that link to each other more than to the rest, whatever folder they sit in.
    const groupCounts = list => { const c = new Map(); for (const id of list) c.set(byId.get(id).group, (c.get(byId.get(id).group) || 0) + 1);
      return [...c].sort((x, y) => y[1] - x[1]).map(([group, count]) => ({ group, count })); };
    let modularity = 0, agree = 0, clustered = 0;
    const communities = [];
    for (const members of louvain([...ids].sort(), adj)) {
      const inside = new Set(members); let internal2 = 0, total = 0;
      const within = new Map(members.map(id => [id, 0]));
      for (const id of members) for (const w of adj.get(id)) { total++; if (inside.has(w)) { internal2++; within.set(id, within.get(id) + 1); } }
      if (m) modularity += internal2 / (2 * m) - (total / (2 * m)) ** 2;
      if (members.length < 3) continue;
      const sectionMix = groupCounts(members), lead = [...within].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1)).slice(0, 5).map(([id]) => id);
      clustered += members.length; agree += sectionMix[0].count;
      communities.push({ ids: members, size: members.length, label: byId.get(lead[0]).title, top: lead, sections: sectionMix.slice(0, 3),
        internal: internal2 / 2, external: total - internal2 });
    }
    communities.sort((x, y) => y.size - x.size || (x.label < y.label ? -1 : 1));

    // Densest core (k-core): the largest k where a group of notes each link to at least k others in the group.
    const left = new Map(nodes.map(v => [v.id, deg(v.id)])), coreOf = new Map(); let kMax = 0;
    for (let k = 0; left.size; k++) {
      const queue = [...left].filter(([, d]) => d <= k).map(([id]) => id);
      for (let qi = 0; qi < queue.length; qi++) {
        const v = queue[qi]; if (!left.has(v)) continue;
        left.delete(v); coreOf.set(v, k); kMax = k;
        for (const w of adj.get(v)) if (left.has(w)) { const d = left.get(w) - 1; left.set(w, d); if (d <= k) queue.push(w); }
      }
    }
    const coreIds = kMax >= 2 ? nodes.filter(v => coreOf.get(v.id) === kMax).map(v => v.id) : [];
    const byDegree = list => list.map(id => ({ id, value: deg(id) })).sort((x, y) => y.value - x.value || (x.id < y.id ? -1 : 1));

    // Possibly misfiled: most of a note's links go to one other section.
    const misfiled = [];
    for (const v of nodes) {
      if (deg(v.id) < 4) continue;
      const [lead] = groupCounts(adj.get(v.id)), share = lead.count / deg(v.id);
      if (lead.group !== v.group && share >= .6) misfiled.push({ id: v.id, group: lead.group, share, value: share * Math.log(deg(v.id)) });
    }
    misfiled.sort((x, y) => y.value - x.value);

    // One-way notes: linked from nowhere, or linking to nothing.
    const inDeg = new Map(nodes.map(v => [v.id, 0]));
    for (const l of directed) inDeg.set(l.target, inDeg.get(l.target) + 1);
    const unreferenced = nodes.filter(v => !inDeg.get(v.id) && out.get(v.id).length).map(v => ({ id: v.id, value: out.get(v.id).length })).sort((x, y) => y.value - x.value);
    const deadEnds = nodes.filter(v => inDeg.get(v.id) && !out.get(v.id).length).map(v => ({ id: v.id, value: inDeg.get(v.id) })).sort((x, y) => y.value - x.value);

    // Boundary of a sub-graph: links from its notes to content notes outside it.
    let boundary = null;
    if (subset) {
      const contentIds = new Set(content.map(v => v.id)), groupOf = new Map(content.map(v => [v.id, v.group]));
      const outside = new Map(nodes.map(v => [v.id, new Set()]));
      for (const l of allLinks) {
        if (ids.has(l.source) && !ids.has(l.target) && contentIds.has(l.target)) outside.get(l.source).add(l.target);
        else if (ids.has(l.target) && !ids.has(l.source) && contentIds.has(l.source)) outside.get(l.target).add(l.source);
      }
      const toGroup = new Map(); let links = 0;
      for (const set of outside.values()) for (const w of set) { links++; toGroup.set(groupOf.get(w), (toGroup.get(groupOf.get(w)) || 0) + 1); }
      boundary = { links, share: links + m ? links / (links + m) : 0,
        gateways: [...outside].filter(([, set]) => set.size).map(([id, set]) => ({ id, value: set.size })).sort((x, y) => y.value - x.value).slice(0, top),
        outside: [...toGroup].sort((x, y) => y[1] - x[1]).slice(0, 5).map(([group, count]) => ({ group, count })) };
    }

    return {
      stats: { notes: n, links: m, avgDegree: n ? 2 * m / n : 0, density: n > 1 ? 2 * m / (n * (n - 1)) : 0,
        components, largestShare: n ? largest / n : 0, isolated: nodes.filter(v => !deg(v.id)).length,
        crossShare: m ? crossLinks / m : 0, reciprocity: directed.length ? reciprocal / directed.length : 0,
        clustering: clusteringNotes ? clusteringSum / clusteringNotes : 0,
        avgPath: pathPairs ? pathSum / pathPairs : 0, diameter: farthest ? farthest.distance : 0,
        modularity, sectionAgreement: clustered ? agree / clustered : 0,
        unreferenced: unreferenced.length, deadEnds: deadEnds.length },
      sections, matrix, degreeHist, communities, farthest, boundary,
      core: { k: kMax, size: coreIds.length, ids: coreIds, top: byDegree(coreIds).slice(0, top) },
      pagerank: ranked(rank, top), bridges: ranked(between, top),
      surprising: varied(surprising), missing: varied(missing),
      misfiled: misfiled.slice(0, top), unreferenced: unreferenced.slice(0, top), deadEnds: deadEnds.slice(0, top),
    };
  }
  // Louvain community detection on an undirected, unweighted graph. Deterministic: fixed visiting order, no randomness.
  // Returns the communities as arrays of ids.
  function louvain(ids, adj) {
    const index = new Map(ids.map((id, i) => [id, i]));
    let members = ids.map(id => [id]), self = ids.map(() => 0);
    let nbrs = ids.map(id => { const w = new Map(); for (const other of adj.get(id)) w.set(index.get(other), 1); return w; });
    const m2 = nbrs.reduce((sum, w) => sum + w.size, 0); // twice the link count
    if (!m2) return members;
    for (let level = 0; level < 12; level++) {
      const k = nbrs.length, comm = Array.from({ length: k }, (_, i) => i);
      const weight = nbrs.map((w, i) => { let sum = self[i]; for (const x of w.values()) sum += x; return sum; });
      const tot = weight.slice();
      let moved = false;
      for (let pass = 0, improved = true; improved && pass < 25; pass++) {
        improved = false;
        for (let i = 0; i < k; i++) {
          const own = comm[i], toComm = new Map();
          for (const [j, w] of nbrs[i]) toComm.set(comm[j], (toComm.get(comm[j]) || 0) + w);
          tot[own] -= weight[i];
          let best = own, bestGain = (toComm.get(own) || 0) - tot[own] * weight[i] / m2;
          for (const [c, w] of toComm) { const gain = w - tot[c] * weight[i] / m2; if (gain > bestGain + 1e-12) { best = c; bestGain = gain; } }
          tot[best] += weight[i];
          if (best !== own) { comm[i] = best; improved = moved = true; }
        }
      }
      if (!moved) break;
      // Collapse each community into one node and repeat on the smaller graph.
      const remap = new Map(); for (const c of comm) if (!remap.has(c)) remap.set(c, remap.size);
      const size = remap.size, nextMembers = Array.from({ length: size }, () => []), nextNbrs = Array.from({ length: size }, () => new Map()), nextSelf = new Array(size).fill(0);
      for (let i = 0; i < k; i++) {
        const c = remap.get(comm[i]);
        for (const id of members[i]) nextMembers[c].push(id);
        nextSelf[c] += self[i];
        for (const [j, w] of nbrs[i]) { const d = remap.get(comm[j]); if (d === c) nextSelf[c] += w; else nextNbrs[c].set(d, (nextNbrs[c].get(d) || 0) + w); }
      }
      members = nextMembers; nbrs = nextNbrs; self = nextSelf;
    }
    return members;
  }
  // Encode each path segment: titles can contain ?, #, parentheses and non-ASCII text.
  function noteURL(id, base) {
    if (!id || id === 'index') return new URL('./', base).href;
    return new URL(id.split('/').map(encodeURIComponent).join('/'), base).href;
  }
  root.GraphData = { normalize, adjacency, neighborhood, idOf, noteURL, analyze };
  if (typeof module !== 'undefined') module.exports = root.GraphData;
})(typeof self !== 'undefined' ? self : globalThis);
