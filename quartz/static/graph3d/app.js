/* Drop this directory in quartz/static/graph3d. All URLs remain under the Pages project path. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const noteBase = new URL('../../', location.href);
  const indexURL = new URL('../contentIndex.json', location.href);
  // Topic colors per theme, tuned against the Quartz background (--light) of each mode.
  const topicColors = {
    light: ['#5c6b22','#2f7d6b','#b0632a','#3e6aa8','#7d4f9a','#b0474d','#2b7f93','#8a8420','#5a58b0','#9a6532','#3f8a52','#6f7f5a','#5e6670','#a07a45'],
    dark: ['#a8b850','#8bc6b2','#e2b786','#a5bde7','#c6a4d8','#e0989b','#78bbc9','#d2cf84','#afaee6','#d2a67b','#82ba90','#b6c8ad','#a6abb1','#d8c5aa'],
  };
  const themeName = () => document.documentElement.getAttribute('saved-theme') === 'dark' ? 'dark' : 'light';
  const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  // Mix two #rrggbb colors; WebGL materials need concrete colors, not CSS color-mix().
  const mix = (a, b, t) => '#' + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - t) + parseInt(b.slice(i, i + 2), 16) * t).toString(16).padStart(2, '0')).join('');
  let theme = {};
  const readTheme = () => {
    const bg = cssVar('--light'), text = cssVar('--darkgray');
    theme = { bg, faint: cssVar('--lightgray'), dark: cssVar('--dark'), accent: cssVar('--secondary'),
      link: mix(text, bg, .55), linkFaint: mix(text, bg, .9) };
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bg);
  };
  readTheme();
  const pretty = s => s.replaceAll('-', ' ');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 0 : 700;
  let graph, worker, model, byId, adjacent, palette, selected = null, hovered = null;
  let relation = 'incoming', latestRequest = 0, debounce, searchReady = false, visible = new Set(), matches = null;
  let insights = null, pair = null, fromInsights = false;
  let fitPending = true, firstFit = true;
  const listButton = (n, snippet) => {
    const b = document.createElement('button'); b.className = 'result';
    b.dataset.note = n.id;
    if (n.id === selected) b.classList.add('selected');
    const title = document.createElement('strong'); title.textContent = n.title;
    const meta = document.createElement('small');
    const dot = document.createElement('span'); dot.className = 'dot'; dot.dataset.group = n.group; dot.style.background = palette.get(n.group);
    meta.append(dot, `${pretty(n.group)} · ${n.degree} connections`); b.append(title, meta);
    if (snippet) { const p = document.createElement('span'); p.className = 'snippet'; p.textContent = snippet; b.append(p); }
    b.onclick = () => select(n.id); return b;
  };
  function error(message, fatal = true) {
    $('search-status').textContent = message;
    if (fatal) { $('loading').hidden = false; $('loading').replaceChildren();
      const title = document.createElement('strong'); title.textContent = 'The explorer could not load';
      const p = document.createElement('p'); p.textContent = message;
      $('loading').append(title, p);
    }
  }
  function buildPalette() {
    const colors = topicColors[themeName()], groups = [...new Set(model.nodes.map(n => n.group))].sort();
    palette = new Map(groups.map((g, i) => [g, colors[i % colors.length]]));
  }
  function applyTheme() {
    readTheme();
    if (!model) return;
    buildPalette();
    for (const dot of document.querySelectorAll('.dot[data-group]')) dot.style.background = palette.get(dot.dataset.group);
    if (graph) { graph.backgroundColor(theme.bg); styleGraph(); }
  }
  function setTheme(name, persist = true) {
    document.documentElement.setAttribute('saved-theme', name);
    if (persist) try { localStorage.setItem('theme', name); } catch (_) { /* Storage may be blocked. */ }
    applyTheme();
  }
  // Tags are namespaced (topic/, type/, doc/, method/, source/); group them instead of one flat list.
  const tagGroups = [['topic', 'Topics'], ['type', 'Note type'], ['doc', 'Document'], ['method', 'Methods'], ['source', 'Source']];
  function buildTagOptions() {
    const counts = new Map();
    for (const n of model.nodes) for (const t of n.tags) counts.set(t, (counts.get(t) || 0) + 1);
    const groups = new Map(), other = [];
    for (const [tag, count] of counts) {
      if (count > model.nodes.length * .8) continue; // e.g. source/ingested: on almost every note, filters nothing.
      const [prefix] = tag.split('/'), known = tagGroups.some(([p]) => p === prefix) && tag.includes('/');
      if (!known) { other.push([tag, count]); continue; }
      if (!groups.has(prefix)) groups.set(prefix, []);
      groups.get(prefix).push([tag, count]);
    }
    const addGroup = (label, items) => {
      if (!items.length) return;
      const g = document.createElement('optgroup'); g.label = label;
      for (const [tag, count] of items.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
        const o = document.createElement('option'); o.value = tag;
        o.textContent = `${pretty(tag.includes('/') ? tag.slice(tag.indexOf('/') + 1) : tag)} (${count})`; g.append(o);
      }
      $('tag').append(g);
    };
    for (const [prefix, label] of tagGroups) addGroup(label, groups.get(prefix) || []);
    addGroup('Other', other);
  }
  function setTagFilter(tag) {
    $('tag').value = [...$('tag').options].some(o => o.value === tag) ? tag : '';
    $('tag').dispatchEvent(new Event('change'));
  }
  function initialize(data) {
    model = data; byId = new Map(model.nodes.map(n => [n.id, n]));
    adjacent = GraphData.adjacency(model.nodes, model.links);
    const groups = [...new Set(model.nodes.map(n => n.group))].sort();
    buildPalette();
    for (const g of groups) { const o = document.createElement('option'); o.value = g; o.textContent = pretty(g); $('topic').append(o); }
    buildTagOptions();
    $('topic').disabled = $('tag').disabled = $('reset').disabled = false;
    try {
      graph = new ForceGraph3D($('graph'), { controlType: 'orbit', rendererConfig: { antialias: true, alpha: false } })
        .backgroundColor(theme.bg).showNavInfo(false).nodeRelSize(3.4)
        .nodeVal(n => 1.8 + Math.log2(1 + n.degree)).nodeResolution(10).nodeOpacity(.95)
        .nodeLabel(n => { const el = document.createElement('span'); el.textContent = n.title; return el; })
        .linkOpacity(.45).warmupTicks(50).cooldownTicks(110)
        .onNodeClick(n => select(n.id))
        .onNodeHover(n => { hovered = n?.id || null; styleGraph(); $('graph').style.cursor = n ? 'pointer' : 'grab'; })
        .onEngineStop(() => { if (fitPending) { graph.zoomToFit(duration, 80, focusFilter()); fitPending = false; } if (firstFit) { firstFit = false; openHash(); } });
      graph.renderer().setPixelRatio(Math.min(devicePixelRatio, 2));
      graph.d3Force('charge').strength(-52);
      graph.d3Force('link').distance(38);
      // Weak pull toward the origin so unlinked notes stay near the cluster instead of drifting off
      // (otherwise zoom-to-fit frames them and the connected graph shrinks to a speck).
      graph.d3Force('gravity', alpha => {
        for (const n of graph.graphData().nodes) { n.vx -= n.x * .035 * alpha; n.vy -= n.y * .035 * alpha; n.vz -= n.z * .035 * alpha; }
      });
      new ResizeObserver(resize).observe($('graph').parentElement);
      resize(); applyView(true); $('loading').hidden = true;
    } catch (e) {
      graph = null;
      error('3D rendering is unavailable in this browser. Search and note links remain available.');
    }
    renderResults();
  }
  // With a note selected, frame it, its direct links and any paired note rather than the whole view.
  function focusFilter() {
    if (!selected) return undefined;
    const near = adjacent.get(selected);
    return n => n.id === selected || n.id === pair || near.has(n.id);
  }
  function resize() {
    if (!graph) return;
    const rect = $('graph').parentElement.getBoundingClientRect();
    graph.width(rect.width).height(rect.height);
  }
  function passes(n) { return (!$('topic').value || n.group === $('topic').value) && (!$('tag').value || n.tags.includes($('tag').value)); }
  function applyView(fit = false) {
    if (!model) return;
    const scope = selected ? Number($('scope').value) : 0;
    const neighborhood = scope ? GraphData.neighborhood(selected, scope, adjacent) : null;
    const nodes = model.nodes.filter(n => (n.id === selected || ((($('hubs').checked || !n.isHub) && passes(n)))) && (!neighborhood || neighborhood.has(n.id)));
    visible = new Set(nodes.map(n => n.id));
    const links = model.links.filter(l => visible.has(l.source) && visible.has(l.target));
    if (graph) {
      fitPending = fit;
      // Clone links because the force engine replaces IDs with node objects.
      graph.graphData({ nodes, links: links.map(l => ({ ...l })) }); styleGraph();
    }
    $('counts').textContent = `${nodes.length} / ${model.nodes.length} notes · ${links.length.toLocaleString()} references`;
    $('legend').replaceChildren();
    for (const group of [...new Set(nodes.map(n => n.group))].sort()) {
      const label = document.createElement('span'), dot = document.createElement('i');
      dot.className = 'dot'; dot.dataset.group = group; dot.style.background = palette.get(group); label.append(dot, pretty(group)); $('legend').append(label);
    }
    $('view-status').textContent = !nodes.length ? 'No notes match these filters.' : scope ? `${scope === 1 ? 'Direct connections' : 'Two-link neighborhood'} · filters apply` : 'Select a note to reveal its connections.';
  }
  function styleGraph() {
    if (!graph) return;
    const active = hovered || selected;
    const nearby = active ? adjacent.get(active) : null;
    // Search hits stay in color and everything else fades, so results show where they sit in the graph.
    const lit = id => active ? id === active || id === pair || nearby.has(id) : !matches || matches.has(id);
    const touches = l => !!active && (GraphData.idOf(l.source) === active || GraphData.idOf(l.target) === active);
    graph.nodeColor(n => n.id === active || (n.id === pair && !hovered) ? theme.dark : lit(n.id) ? palette.get(n.group) : theme.faint);
    graph.linkVisibility(l => $('show-links').checked || touches(l));
    graph.linkColor(l => touches(l) ? theme.accent : !active && lit(GraphData.idOf(l.source)) && lit(GraphData.idOf(l.target)) ? theme.link : theme.linkFaint);
    graph.linkWidth(l => touches(l) ? .45 : 0);
    graph.linkDirectionalArrowLength(l => touches(l) ? 2.3 : 0).linkDirectionalArrowRelPos(.85);
  }
  function select(id, writeHash = true) {
    const n = byId?.get(id); if (!n) return;
    selected = id; hovered = pair = null;
    showInsights(false);
    if (!passes(n)) { $('topic').value = ''; $('tag').value = ''; }
    $('detail').hidden = false; $('detail-title').textContent = n.title;
    $('detail-topic').textContent = pretty(n.group); $('detail-excerpt').textContent = n.excerpt;
    $('detail-tags').replaceChildren(...n.tags.map(t => {
      const tag = document.createElement('button'); tag.textContent = t; tag.title = `Show notes tagged ${t}`;
      tag.classList.toggle('active', t === $('tag').value); tag.onclick = () => setTagFilter(t); return tag;
    }));
    $('open-note').href = GraphData.noteURL(n.id, noteBase);
    worker?.postMessage({ type: 'detail', id }); renderNeighbors(); applyView(true); resize();
    if (writeHash) history.replaceState(null, '', '#note=' + encodeURIComponent(id));
    for (const b of $('results').children) b.classList.toggle('selected', b.dataset.note === id);
  }
  function renderNeighbors() {
    if (!selected) return;
    const incoming = model.links.filter(l => l.target === selected).map(l => l.source);
    const outgoing = model.links.filter(l => l.source === selected).map(l => l.target);
    $('incoming').textContent = `Backlinks (${incoming.length})`; $('outgoing').textContent = `Outgoing (${outgoing.length})`;
    $('incoming').classList.toggle('active', relation === 'incoming'); $('outgoing').classList.toggle('active', relation === 'outgoing');
    const ids = relation === 'incoming' ? incoming : outgoing;
    $('neighbors').replaceChildren(...ids.map(id => byId.get(id)).sort((a,b) => a.title.localeCompare(b.title)).map(n => listButton(n)));
    if (!ids.length) empty($('neighbors'), 'No references in this direction.');
  }
  function empty(parent, message) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = message; parent.append(p); }
  function renderResults() {
    if (!model) return;
    clearTimeout(debounce); latestRequest++;
    const query = $('search').value.trim();
    if (query && searchReady) {
      const requestId = latestRequest;
      $('search-status').textContent = 'Searching…';
      debounce = setTimeout(() => worker.postMessage({ type: 'search', query, group: $('topic').value, tag: $('tag').value, requestId }), 90);
      return;
    }
    if (matches) { matches = null; styleGraph(); }
    const notes = model.nodes.filter(n => passes(n) && ($('hubs').checked || !n.isHub)).sort((a,b) => b.degree - a.degree || a.title.localeCompare(b.title));
    $('results-title').textContent = 'Places to begin'; $('result-count').textContent = String(notes.length);
    $('results').replaceChildren(...notes.slice(0,25).map(n => listButton(n)));
    if (!notes.length) empty($('results'), 'No notes match these filters.');
    $('search-status').textContent = searchReady ? 'Searches titles, tags and full text · Type #tag to filter by tag' : 'Preparing full-text search…';
  }
  function clearSelection() {
    selected = hovered = pair = null; $('detail').hidden = true;
    if (fromInsights) { fromInsights = false; showInsights(true); }
    history.replaceState(null, '', location.pathname + location.search); applyView(true); resize(); renderResults();
  }
  function showInsights(open) {
    $('insights').hidden = !open; $('insights-toggle').setAttribute('aria-expanded', String(open));
    if (open) $('detail').hidden = true;
    resize();
  }
  // Open note a with b highlighted; hops=2 keeps the shared neighbours of an unlinked pair in view.
  function focusPair(a, b, hops) {
    $('scope').value = String(hops); select(a); pair = b; fromInsights = true; styleGraph();
  }
  function renderInsights() {
    const { stats, sections, pagerank, bridges, surprising, missing } = insights;
    const pct = x => `${Math.round(x * 100)}%`;
    const tiles = [
      [stats.notes.toLocaleString(), 'content notes'],
      [stats.links.toLocaleString(), 'unique links between them'],
      [stats.avgDegree.toFixed(1), 'links per note on average'],
      [pct(stats.largestShare), `in the main web · ${stats.components} separate clusters`],
      [pct(stats.crossShare), 'of links cross sections'],
      [pct(stats.reciprocity), 'of links are linked back'],
    ];
    $('insight-stats').replaceChildren(...tiles.map(([value, label]) => {
      const d = document.createElement('div'); d.className = 'stat';
      const v = document.createElement('strong'); v.textContent = value;
      const l = document.createElement('span'); l.textContent = label; d.append(v, l); return d;
    }));
    $('insight-sections').replaceChildren(...[...sections].sort((x, y) => y.openness - x.openness).map(sec => {
      const b = document.createElement('button'); b.className = 'section-bar'; b.title = `${sec.notes} notes · ${sec.internal} internal and ${sec.external} cross-section links. Click to filter.`;
      const name = document.createElement('span'); name.className = 'name';
      const dot = document.createElement('i'); dot.className = 'dot'; dot.dataset.group = sec.group; dot.style.background = palette.get(sec.group);
      name.append(dot, pretty(sec.group));
      const track = document.createElement('span'); track.className = 'track';
      const fill = document.createElement('span'); fill.className = 'fill'; fill.style.width = pct(sec.openness); track.append(fill);
      const value = document.createElement('span'); value.className = 'pct'; value.textContent = pct(sec.openness);
      b.append(name, track, value);
      b.onclick = () => { $('topic').value = sec.group; $('topic').dispatchEvent(new Event('change')); };
      return b;
    }));
    const noteList = (el, items) => { el.replaceChildren(...items.map(({ id }) => { const b = listButton(byId.get(id)); b.onclick = () => { fromInsights = true; select(id); }; return b; })); };
    noteList($('insight-pagerank'), pagerank); noteList($('insight-bridges'), bridges);
    const pairList = (el, items, hops, describe) => el.replaceChildren(...items.map(p => {
      const a = byId.get(p.a), b = byId.get(p.b), btn = document.createElement('button'); btn.className = 'result pair';
      const t1 = document.createElement('strong'); t1.textContent = a.title;
      const t2 = document.createElement('strong'); const arrow = document.createElement('span'); arrow.className = 'arrow'; arrow.textContent = hops === 1 ? '↔' : '⇢';
      t2.append(arrow, b.title);
      const meta = document.createElement('small'); meta.textContent = describe(p, a, b);
      btn.append(t1, t2, meta); btn.onclick = () => focusPair(p.a, p.b, hops); return btn;
    }));
    pairList($('insight-surprising'), surprising, 1, (p, a, b) => `${pretty(a.group)} ↔ ${pretty(b.group)} · ${p.shared} shared neighbour${p.shared === 1 ? '' : 's'}`);
    pairList($('insight-missing'), missing, 2, p => `Not linked · ${p.shared} neighbours in common`);
    if (!missing.length) empty($('insight-missing'), 'No strong candidates.');
    $('insight-note').textContent = `Index notes are excluded because they link to everything. ${stats.isolated} notes have no links at all.`;
  }
  function openHash() {
    if (location.hash.startsWith('#note=')) {
      try { select(decodeURIComponent(location.hash.slice(6)), false); } catch (_) { /* Ignore malformed URL fragments. */ }
    }
  }
  $('search').addEventListener('input', renderResults);
  $('search').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); $('results').querySelector('button')?.click(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); $('results').querySelector('button')?.focus(); }
  });
  $('results').addEventListener('keydown', e => {
    const buttons = [...$('results').querySelectorAll('button')], i = buttons.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); buttons[Math.min(i + 1, buttons.length - 1)]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); if (i <= 0) $('search').focus(); else buttons[i - 1]?.focus(); }
  });
  for (const id of ['topic', 'tag', 'hubs']) $(id).addEventListener('change', () => { selected = null; $('detail').hidden = true; history.replaceState(null, '', location.pathname + location.search); applyView(true); renderResults(); });
  $('scope').onchange = () => applyView(true); $('show-links').onchange = styleGraph;
  $('reset').onclick = () => { $('topic').value = $('tag').value = $('search').value = ''; $('show-links').checked = true; clearSelection(); };
  $('close-detail').onclick = clearSelection;
  $('insights-toggle').onclick = () => { const open = $('insights').hidden; if (open && selected) { fromInsights = false; clearSelection(); } showInsights(open); };
  $('close-insights').onclick = () => showInsights(false);
  for (const id of ['incoming','outgoing']) $(id).onclick = () => { relation = id; renderNeighbors(); };
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('search').focus(); $('search').select(); }
    if (e.key === 'Escape') { if ($('search').value) { $('search').value = ''; renderResults(); } else if (selected) clearSelection(); }
  });
  // Theme toggle and sync behave like the Quartz site (shared localStorage key 'theme').
  $('darkmode').onclick = () => setTheme(themeName() === 'dark' ? 'light' : 'dark');
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setTheme(e.matches ? 'dark' : 'light'));
  window.addEventListener('storage', e => { if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) setTheme(e.newValue, false); });
  document.addEventListener('visibilitychange', () => { if (graph) document.hidden ? graph.pauseAnimation() : graph.resumeAnimation(); });
  window.addEventListener('hashchange', () => location.hash ? openHash() : clearSelection());
  try {
    worker = new Worker('./search-worker.js');
    worker.onerror = () => error('Search could not start. Serve this directory over HTTP and check that its vendor files are included.');
    worker.onmessage = ({ data }) => {
      if (data.type === 'graph') initialize(data.graph);
      if (data.type === 'insights' && model) { insights = data.insights; renderInsights(); $('insights-toggle').disabled = false; }
      if (data.type === 'ready') { searchReady = true; $('search').disabled = false; renderResults(); if (!graph) openHash(); }
      if (data.type === 'results' && data.requestId === latestRequest) {
        $('results-title').textContent = 'Search results'; $('result-count').textContent = String(data.total);
        $('results').replaceChildren(...data.hits.map(h => listButton(byId.get(h.id), h.excerpt)));
        if (!data.hits.length) empty($('results'), data.tags.length ? 'No notes match. Check the #tag spelling or clear the section and tag filters.' : 'No matches. Try fewer words or clear the section and tag filters.');
        matches = new Set(data.ids); styleGraph();
        const shown = data.ids.filter(id => visible.has(id)).length;
        $('search-status').textContent = [data.loose && 'No note has every word; showing notes with any of them', data.total > 40 && 'Showing top 40',
          data.total && `${shown} highlighted in the graph`, 'Enter opens first result'].filter(Boolean).join(' · ');
      }
      if (data.type === 'detail' && data.id === selected) $('detail-excerpt').textContent = data.excerpt + (data.excerpt.length >= 1100 ? '…' : '');
      if (data.type === 'error') error(data.message, data.phase === 'init');
    };
    worker.postMessage({ type: 'init', url: indexURL.href });
  } catch (e) { error('Open this app through a local web server or GitHub Pages, rather than opening the HTML file directly.'); }
})();
