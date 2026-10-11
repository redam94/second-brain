---
type: source-reference
note: "Network policy blocked direct PDF download. Full paper freely available at: https://jmlr.org/papers/v3/chickering02b.html"
---

# Source Reference: Chickering (2002) — GES

## Citation

David Maxwell Chickering (2002). "Optimal Structure Identification with Greedy Search."  
*Journal of Machine Learning Research*, 3 (Nov), pp. 507–554.  
URL: https://jmlr.org/papers/v3/chickering02b.html  
(JMLR is open access — paper freely available)

## Companion paper

David Maxwell Chickering (2002). "Learning Equivalence Classes of Bayesian-Network Structures."  
*Journal of Machine Learning Research*, 2 (Jan), pp. 445–498.  
URL: https://jmlr.csail.mit.edu/papers/v2/chickering02a.html  
(Provides the Insert/Delete/Reverse operator theory for CPDAGs)

## Key contributions

1. **Proves the Meek conjecture** (partially stated in Meek 1995): any two DAGs in the same Markov equivalence class (MEC) can be connected by a sequence of *covered edge reversals*, each staying within the MEC. This is the theoretical foundation for GES's greedy forward/backward search to be asymptotically optimal.

2. **Greedy Equivalence Search (GES)**: a two-phase algorithm that searches over CPDAGs (representations of MECs) using Insert and Delete operators, provably returning the true CPDAG in the large-sample limit under faithfulness and Gaussianity.

3. **Insert/Delete operators**: defines operators on CPDAGs that maintain CPDAG validity and correspond to well-defined changes in the MEC, enabling a greedy local search over MECs rather than individual DAGs.

## Related work

- Chickering (1995) — "A transformational characterization of equivalent Bayesian network structures" (UAI 1995): the covered edge reversal result.
- Meek (1995) — Orientation rules and MEC characterization.
- Hauser & Bühlmann (2012) — "Characterization and Greedy Learning of Interventional Markov Equivalence Classes" — GES extension to interventional data.
