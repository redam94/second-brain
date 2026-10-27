---
type: source-reference
title: "Kalisch & Bühlmann (2007) — PC-Algorithm for High-Dimensional DAGs"
citation: "Kalisch, M. & Bühlmann, P. (2007). Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm. *Journal of Machine Learning Research*, 8(22), 613–636."
url: "https://arxiv.org/abs/math/0510436"
jmlr_url: "https://jmlr.org/papers/v8/kalisch07a.html"
note: "PDF unavailable for local download at ingest time (proxy policy). Access via arXiv:math/0510436 or JMLR v8."
date_referenced: 2026-10-27
---

# Source Reference: Kalisch & Bühlmann 2007

**Citation:** Kalisch, M. & Bühlmann, P. (2007). Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm. *Journal of Machine Learning Research*, 8(22), 613–636.

**arXiv:** https://arxiv.org/abs/math/0510436  
**JMLR:** https://jmlr.org/papers/v8/kalisch07a.html

**Abstract summary:** Studies the PC-algorithm for learning the skeleton and Markov equivalence class of a Gaussian DAG in high dimensions. Proves uniform consistency of the skeleton and v-structure estimates when the number of nodes $p$ grows polynomially in the sample size $n$, under a sparsity assumption (bounded neighborhood size).

**Key results:**
- PC-algorithm is consistent for high-dimensional sparse Gaussian DAGs
- Consistency holds even when $p \gg n$ if the true DAG is sparse
- The algorithm's accuracy degrades gracefully with dimension under faithfulness + sparsity

**Software:** R package `pcalg` (Kalisch, Mächler, Colombo, Maathuis & Bühlmann)
