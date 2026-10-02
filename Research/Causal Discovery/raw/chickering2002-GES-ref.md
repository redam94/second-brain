---
type: source-reference
pdf_available: false
network_blocked: true
---

# Source Reference: Chickering (2002)

**Full citation:** David Maxwell Chickering (2002). "Optimal structure identification with greedy search." *Journal of Machine Learning Research*, 3, 507–554.

**URL / access:** https://jmlr.org/papers/v3/chickering02b.html (open-access JMLR; PDF blocked by proxy during ingest 2026-10-02)

**Note:** PDF download blocked by network policy. Notes written from authoritative knowledge.

## Key content covered by notes derived from this source

- GES (Greedy Equivalence Search): two-phase algorithm over CPDAG space
- Insert operator (forward phase) and Delete operator (backward phase)
- Proof of the Meek Conjecture: any move from submodel to supermodel can be achieved via covered-edge reversals maintaining the independence map property
- Local consistency of scoring functions (BIC, BDeu)
- Proof of consistency: GES recovers the true CPDAG with probability → 1 as n → ∞ under Markov + faithfulness + locally consistent score
- Decomposability of BIC score for efficient incremental updates

## Also relevant

- Chickering (2002b) — "Learning equivalence classes of Bayesian-network structures." *JMLR*, 2, 445–498.
  - Formal characterization of CPDAG equivalence classes
- Nandy, Hauser & Maathuis (2018) — "High-dimensional consistency in score-based and hybrid structure learning." *Annals of Statistics*, 46(6), 3151–3183.
  - High-dimensional consistency of GES under restricted eigenvalue conditions
- Hauser & Bühlmann (2012) — "Characterization and greedy learning of interventional Markov equivalence classes." *JMLR*, 13, 2409–2464.
  - GIES: extension of GES to interventional data
