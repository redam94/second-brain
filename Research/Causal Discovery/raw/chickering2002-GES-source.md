# Source Record: Chickering (2002) — GES

**Note:** PDF download was attempted but blocked by network egress policy (jmlr.org is not accessible from this session). This file records the source metadata.

## Citation

David Maxwell Chickering (2002). **"Optimal Structure Identification With Greedy Search."**
*Journal of Machine Learning Research* 3(Nov):507–554.

## Free access

- JMLR page: https://jmlr.org/papers/v3/chickering02b.html
- JMLR PDF:   https://jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

## Abstract (summary)

Proves the Meek Conjecture (1995): if DAG H is an independence map of DAG G, then there exists
a finite sequence of edge additions and covered edge reversals transforming G into a DAG equivalent
to H, such that each intermediate graph is an independence map of G. This underpins Greedy
Equivalence Search (GES), a two-phase algorithm that searches over Markov equivalence classes
(represented as CPDAGs) using three operators (Insert, Delete, Turn) and a decomposable score
(BIC, BDe). GES is shown to be consistent: it recovers the true CPDAG in the large-sample limit
under faithfulness and causal sufficiency.

## Key results

- Theorem 15: GES is consistent (recovers true CPDAG asymptotically under faithfulness + causal sufficiency)
- Meek Conjecture proof (Theorem 4)
- Three CPDAG operators: Insert(X, Y, T), Delete(X, Y, H), Turn(X, Y, C)
- Score-equivalent, decomposable scores (BIC, BDe) make the search tractable
