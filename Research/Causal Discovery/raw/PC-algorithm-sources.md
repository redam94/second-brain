---
type: source-reference
note: "Network policy blocked direct PDF download. Full papers are freely available at: https://arxiv.org/abs/math/0510436 (Kalisch & Bühlmann 2007) and in Spirtes, Glymour & Scheines (2000) MIT Press."
---

# Source Reference: PC Algorithm

## Primary Sources

### Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed.
- Publisher: MIT Press (Adaptive Computation and Machine Learning series)
- ISBN: 978-0-262-19440-2
- Availability: MIT Press; 1st edition (1993) via SpringerLink
- Relevant chapters: Ch. 5–6 (constraint-based algorithms, the PC algorithm)
- Original source for the PC algorithm (named for **P**eter Spirtes and **C**lark Glymour)

### Kalisch & Bühlmann (2007) — "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm"
- Journal: *Journal of Machine Learning Research*, Vol. 8, pp. 613–636
- arXiv: math/0510436
- DOI: not applicable (JMLR open access)
- URL: https://jmlr.org/papers/v8/kalisch07a.html
- Contribution: proves uniform consistency of PC under Gaussian model when $p \to \infty$ with $n$; introduces `pcalg` R package

### Meek (1995) — "Causal inference and causal explanation with background knowledge"
- Proceedings: UAI 1995, pp. 403–410
- URL: https://dl.acm.org/doi/10.5555/2074158.2074204
- Contribution: the four Meek orientation rules (R1–R4) that complete the CPDAG after v-structure identification

### Colombo & Maathuis (2014) — "Order-independent constraint-based causal structure learning"
- Journal: *Journal of Machine Learning Research*, Vol. 15, pp. 3741–3782
- arXiv: 1211.3295
- Contribution: Stable-PC — fixes order-dependence of the original PC algorithm's skeleton phase

## Software
- `pcalg` (R): Kalisch et al., CRAN — implements PC, FCI, RFCI, GES
- `causal-learn` (Python): https://github.com/py-why/causal-learn — successor to `cdt`
- `py-why` ecosystem: DoWhy, causal-learn
