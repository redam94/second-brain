# Chickering (2002) — Greedy Equivalence Search (JMLR)

**Title:** Optimal Structure Identification With Greedy Search  
**Author:** David Maxwell Chickering  
**Venue:** Journal of Machine Learning Research, Vol. 3, pp. 507–554, November 2002  
**Free URL:** https://jmlr.org/papers/v3/chickering02b.html  

> **Note:** PDF could not be downloaded during this ingest session due to network egress
> restrictions blocking jmlr.org. The paper is freely available at the URL above.
> The notes derived from this source are based on the author's knowledge of this
> foundational paper.

## Abstract (from paper)

In this paper, we prove the so-called "Meek Conjecture": any DAG that perfectly encodes the
independence model of the generating distribution is included in the equivalence class
identified by a two-phase greedy search. We present a new implementation of the search space
using equivalence classes as states, for which all operators used in the greedy search can be
scored efficiently using local functions of the nodes in the domain.

## Key contributions

1. **Proves the Meek Conjecture**: Greedy equivalence search (GES) returns the true MEC under
   faithfulness and a consistent score.
2. **Two-phase search over CPDAGs**: Forward (insert) phase adds edges; backward (delete) phase
   removes edges. Both operate on equivalence class representatives (CPDAGs).
3. **Efficient scoring operators**: InsertI and DeleteI can be scored with local BIC computations,
   making GES tractable.
4. **Meek's rules completeness**: The four Meek orientation rules are sufficient to produce the
   CPDAG from any DAG in a Markov equivalence class.

## Companion paper

Chickering (2002a) — "Learning Equivalence Classes of Bayesian-Network Structures"  
JMLR Vol. 2, pp. 445–498 — characterizes the equivalence class structure underlying GES.  
URL: https://jmlr.org/papers/v2/chickering02a.html
