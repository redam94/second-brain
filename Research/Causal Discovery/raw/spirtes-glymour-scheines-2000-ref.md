---
type: source-reference
pdf_available: false
network_blocked: true
---

# Source Reference: Spirtes, Glymour & Scheines (2000)

**Full citation:** Peter Spirtes, Clark N. Glymour & Richard Scheines. *Causation, Prediction, and Search*, 2nd edition. MIT Press, 2000. (Originally Springer, 1993.)

**URL / access:** https://www.cs.cmu.edu/afs/cs.hku.hk/archive/Mirror/cs.cmu.edu/~jmvr/causation.prediction.and.search.pdf (book; various mirrors exist)

**Original algorithm paper:** Peter Spirtes & Clark Glymour (1991). "An algorithm for fast recovery of sparse causal graphs." *Statistics and Computing*, 1(2), 67–72.

**Note:** PDF download blocked by network policy during ingest session 2026-10-02. Notes written from authoritative knowledge of the algorithm.

## Key content covered by notes derived from this source

- PC algorithm (Peter-Clark), formalized in SGS 2000, §5
- Skeleton estimation via conditional independence testing
- V-structure orientation from separation sets
- Meek orientation rules (Meek 1995, applied in SGS 2000)
- Consistency under faithfulness and Markov conditions (Theorem 5.3 SGS 2000)
- FCI algorithm extension for hidden confounders (Chapter 6)

## Also relevant

- Colombo & Maathuis (2014) — "Order-Independent Constraint-Based Causal Structure Learning." *JMLR*, 15, 3921–3962. https://jmlr.org/papers/v15/colombo14a.html
  - PC-stable variant removing order-dependence from skeleton phase
  - Adjacency-faithful variant (PC-select)
- Kalisch & Bühlmann (2007) — "Estimating high-dimensional directed acyclic graphs with the PC-algorithm." *JMLR*, 8, 613–636. https://jmlr.org/papers/v8/kalisch07a.html
  - High-dimensional consistency under sparse faithfulness
