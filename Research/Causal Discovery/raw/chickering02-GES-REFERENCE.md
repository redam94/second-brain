---
type: source-reference
title: "Chickering (2002) — Optimal Structure Identification with Greedy Search (GES)"
citation: "Chickering, D. M. (2002). Optimal Structure Identification With Greedy Search. *Journal of Machine Learning Research*, 3(Nov), 507–554."
url: "https://jmlr.org/papers/v3/chickering02b.html"
note: "PDF unavailable for local download at ingest time (proxy policy). Access via JMLR v3 or via author's Microsoft Research page."
date_referenced: 2026-10-27
---

# Source Reference: Chickering 2002

**Citation:** Chickering, D. M. (2002). Optimal Structure Identification With Greedy Search. *Journal of Machine Learning Research*, 3(Nov), 507–554.

**JMLR:** https://jmlr.org/papers/v3/chickering02b.html

**Abstract summary:** Proves the *Meek Conjecture*: if DAG H is an independence map (I-map) of DAG G, then G can be transformed into H via a sequence of edge additions and covered edge reversals. This immediately implies that, under large-sample conditions (score-equivalent, decomposable, consistent scoring function), the two-phase Greedy Equivalence Search (GES) identifies the correct Markov equivalence class with probability converging to 1.

**Key results:**
1. Proof of the Meek Conjecture (Theorem 15)
2. The Insert and Delete operators on CPDAGs work correctly for GES
3. Under faithfulness + consistent BIC-like score, GES is asymptotically correct
4. GES runs in $O(d^2)$ structure comparisons per step (practically fast for sparse graphs)

**Software:** R package `pcalg`, Python packages `causal-learn` and `ges`
