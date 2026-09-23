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
  let theme = {};
  const readTheme = () => {
    theme = { bg: cssVar('--light'), faint: cssVar('--lightgray'), gray: cssVar('--gray'), dark: cssVar('--dark'), accent: cssVar('--secondary') };
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bg);
  };
  readTheme();
  const pretty = s => s.replaceAll('-', ' ');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 0 : 700;
  let graph, worker, model, byId, adjacent, palette, selected = null, hovered = null;
  let relation = 'incoming', latestRequest = 0, debounce, searchReady = false, visible = new Set();
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
  function initialize(data) {
    model = data; byId = new Map(model.nodes.map(n => [n.id, n]));
    adjacent = GraphData.adjacency(model.nodes, model.links);
    const groups = [...new Set(model.nodes.map(n => n.group))].sort();
    buildPalette();
    for (const g of groups) { const o = document.createElement('option'); o.value = g; o.textContent = pretty(g); $('topic').append(o); }
    for (const t of [...new Set(model.nodes.flatMap(n => n.tags))].sort()) {
      const o = document.createElement('option'); o.value = t; o.textContent = t; $('tag').append(o);
    }
    $('topic').disabled = $('tag').disabled = $('reset').disabled = false;
    try {
      graph = new ForceGraph3D($('graph'), { controlType: 'orbit', rendererConfig: { antialias: true, alpha: false } })
        .backgroundColor(theme.bg).showNavInfo(false).nodeRelSize(2.5)
        .nodeVal(n => 1.8 + Math.log2(1 + n.degree)).nodeResolution(10).nodeOpacity(.95)
        .nodeLabel(n => { const el = document.createElement('span'); el.textContent = n.title; return el; })
        .linkOpacity(.25).linkWidth(0).warmupTicks(50).cooldownTicks(110)
        .onNodeClick(n => select(n.id))
        .onNodeHover(n => { hovered = n?.id || null; styleGraph(); $('graph').style.cursor = n ? 'pointer' : 'grab'; })
        .onEngineStop(() => { if (fitPending) { graph.zoomToFit(duration, 80); fitPending = false; } if (firstFit) { firstFit = false; openHash(); } });
      graph.renderer().setPixelRatio(Math.min(devicePixelRatio, 2));
      graph.d3Force('charge').strength(-52);
      graph.d3Force('link').distance(38);
      new ResizeObserver(resize).observe($('graph').parentElement);
      resize(); applyView(true); $('loading').hidden = true;
    } catch (e) {
      graph = null;
      error('3D rendering is unavailable in this browser. Search and note links remain available.');
    }
    renderResults();
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
    graph.nodeColor(n => n.id === active ? theme.dark : active && !nearby?.has(n.id) ? theme.faint : palette.get(n.group));
    graph.linkVisibility(l => $('all-links').checked || (!!selected && Number($('scope').value) > 0) || (!!active && (GraphData.idOf(l.source) === active || GraphData.idOf(l.target) === active)));
    graph.linkColor(l => active && (GraphData.idOf(l.source) === active || GraphData.idOf(l.target) === active) ? theme.accent : theme.gray);
    graph.linkDirectionalArrowLength(l => active && (GraphData.idOf(l.source) === active || GraphData.idOf(l.target) === active) ? 2.3 : 0)
      .linkDirectionalArrowRelPos(.85);
  }
  function select(id, writeHash = true) {
    const n = byId?.get(id); if (!n) return;
    selected = id; hovered = null;
    if (!passes(n)) { $('topic').value = ''; $('tag').value = ''; }
    $('detail').hidden = false; $('detail-title').textContent = n.title;
    $('detail-topic').textContent = pretty(n.group); $('detail-excerpt').textContent = n.excerpt;
    $('detail-tags').replaceChildren(...n.tags.map(t => { const tag = document.createElement('span'); tag.textContent = t; return tag; }));
    $('open-note').href = GraphData.noteURL(n.id, noteBase);
    worker?.postMessage({ type: 'detail', id }); renderNeighbors(); applyView(false); resize();
    if (graph && Number.isFinite(n.x)) {
      // Approach from the current viewing direction, using the selected node as the target.
      const c = graph.cameraPosition(), dx = c.x - n.x, dy = c.y - n.y, dz = c.z - n.z;
      const distance = Math.hypot(dx, dy, dz) || 1, scale = 180 / distance;
      graph.cameraPosition({ x: n.x + dx * scale, y: n.y + dy * scale, z: n.z + (dz ? dz * scale : 180) }, n, duration);
    }
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
    const notes = model.nodes.filter(n => passes(n) && ($('hubs').checked || !n.isHub)).sort((a,b) => b.degree - a.degree || a.title.localeCompare(b.title));
    $('results-title').textContent = 'Places to begin'; $('result-count').textContent = String(notes.length);
    $('results').replaceChildren(...notes.slice(0,25).map(n => listButton(n)));
    if (!notes.length) empty($('results'), 'No notes match these filters.');
    $('search-status').textContent = searchReady ? 'Title, tags and full text · Typo-tolerant search' : 'Preparing full-text search…';
  }
  function clearSelection() {
    selected = hovered = null; $('detail').hidden = true;
    history.replaceState(null, '', location.pathname + location.search); applyView(true); resize(); renderResults();
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
  $('scope').onchange = () => applyView(true); $('all-links').onchange = styleGraph;
  $('reset').onclick = () => { $('topic').value = $('tag').value = $('search').value = ''; $('all-links').checked = false; clearSelection(); };
  $('close-detail').onclick = clearSelection;
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
      if (data.type === 'ready') { searchReady = true; $('search').disabled = false; renderResults(); if (!graph) openHash(); }
      if (data.type === 'results' && data.requestId === latestRequest) {
        $('results-title').textContent = 'Search results'; $('result-count').textContent = String(data.total);
        $('results').replaceChildren(...data.hits.map(h => listButton(byId.get(h.id), h.excerpt)));
        if (!data.hits.length) empty($('results'), 'No matches. Try fewer words or clear the topic and tag filters.');
        $('search-status').textContent = `${data.total > 40 ? 'Showing top 40 · ' : ''}${Math.round(data.elapsed)} ms search · Enter opens first result`;
      }
      if (data.type === 'detail' && data.id === selected) $('detail-excerpt').textContent = data.excerpt + (data.excerpt.length >= 1100 ? '…' : '');
      if (data.type === 'error') error(data.message, data.phase === 'init');
    };
    worker.postMessage({ type: 'init', url: indexURL.href });
  } catch (e) { error('Open this app through a local web server or GitHub Pages, rather than opening the HTML file directly.'); }
})();
