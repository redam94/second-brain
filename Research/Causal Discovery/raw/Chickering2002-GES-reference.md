---
type: reference
cannot_download: true
reason: "jmlr.org blocked by proxy at ingest time (2026-10-18)"
---

# Chickering (2002) — Optimal Structure Identification With Greedy Search

**Full citation:** Chickering, D.M. (2002). Optimal Structure Identification With Greedy Search.
*Journal of Machine Learning Research*, 3(Nov):507–554.

**Official URL:** https://jmlr.org/papers/v3/chickering02b.html
**PDF:** https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

**Abstract (from JMLR page):**
Introduces the Greedy Equivalence Search (GES) algorithm for learning Bayesian network structure.
GES searches over equivalence classes of DAGs using two phases (forward edge-addition and backward
edge-deletion), each greedy with respect to a decomposable, score-equivalent scoring function.
Chickering proves the "Meek Conjecture": GES finds the true CPDAG in the large-sample limit
when the generating distribution is faithful to a DAG and the score is BIC (or equivalent).
The key technical contribution is proving that the greedy local operators on equivalence classes
are globally consistent under faithfulness.

**Key results:**
- Theorem: GES converges to the true equivalence class as n → ∞ under faithfulness + acyclicity
- Algorithm: Two-phase (FES + BES) greedy search over CPDAGs
- Score: BIC (or any score-equivalent, decomposable, consistent score)

**Note:** PDF could not be downloaded at ingest time due to network policy. Notes created from
secondary sources and training knowledge.
