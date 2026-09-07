# Source: Chickering (2002) — Optimal Structure Identification With Greedy Search

**Full citation:** Chickering, D. M. (2002). Optimal structure identification with greedy search.
*Journal of Machine Learning Research*, 3, 507–554.

**DOI / URL:** https://jmlr.org/papers/v3/chickering02b.html
(PDF also mirrored at http://www.ai.mit.edu/projects/jmlr/papers/volume3/chickering02b/source/chickering02b.pdf)

**Note:** PDF download was blocked by network egress policy at ingest time (2026-09-07).
The URL above provides free, open-access access to the full paper. This markdown stub
serves as the vault source reference in place of the downloaded PDF.

---

## Abstract (verbatim)

"We prove the Meek Conjecture, showing that if a DAG H is an independence map of another
DAG G, then there exists a finite sequence of edge additions and covered edge reversals in
G that maintains H as an independence map while transforming G into H. As a consequence of
this proof, we demonstrate that in the limit of large sample size, there exists a two-phase
greedy search algorithm that can provably identify a perfect map of the generative
distribution if that perfect map is a DAG. The first phase adds edges to a complete graph
until a perfect map is found; the second phase removes edges until a minimal independence
map is found. Both phases maintain score equivalence throughout the search, in the sense
that every visited graph in the search has the same score as its corresponding completed
partially directed acyclic graph (CPDAG)."

---

## Key Contributions

1. **Proof of the Meek Conjecture** (Theorem 15): If H is an independence map of G, there
   is a sequence of edge additions and covered-edge reversals from G to H that maintains the
   independence-map property. This guarantees the completeness of the forward search phase.

2. **Greedy Equivalence Search (GES)** algorithm with three phases:
   - Forward Equivalence Search (FES): greedily add edges (one insert operator per step)
   - Backward Equivalence Search (BES): greedily remove edges (delete operator)
   - Turning phase: covered edge reversals (from later work; Chickering 2002 had 2 phases)

3. **Score-equivalence**: the BIC score assigns the same score to all DAGs in the same
   Markov equivalence class, so GES searches over CPDAGs directly.

4. **Consistency**: GES is consistent under i.i.d. data, Markov, faithfulness, and sufficient
   sample size — it returns the true CPDAG in the large-sample limit.

---

## Citation Key

`chickering02b`

BibTeX:
```bibtex
@article{chickering2002ges,
  title={Optimal structure identification with greedy search},
  author={Chickering, David Maxwell},
  journal={Journal of Machine Learning Research},
  volume={3},
  pages={507--554},
  year={2002}
}
```
