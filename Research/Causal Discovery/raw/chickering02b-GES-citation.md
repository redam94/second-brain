---
type: citation
---

# Citation: Chickering (2002) — Optimal Structure Identification With Greedy Search

**Full citation:**
Chickering, D. M. (2002). Optimal structure identification with greedy search.
*Journal of Machine Learning Research*, 3, 507–554.

**DOI / URL:**
https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

**Note:** PDF download was unavailable in the session that created these notes
(network egress policy blocked jmlr.org). Notes derived from training knowledge
of the paper content and published descriptions.

## Abstract (summary)

Introduces the **Greedy Equivalence Search (GES)** algorithm for learning Bayesian
network structure. Proves the **Meek conjecture**: if H is an independence map of G
(both DAGs), there exists a finite sequence of single edge-additions and covered
edge-reversals in G, each of which maintains the I-map property, transforming G into H.
This result implies GES correctly identifies the CPDAG of the data-generating distribution
under faithfulness and score-equivalence assumptions. Introduces three operators on CPDAG
space (Insert, Delete, Turn) that are scored locally. Shows GES runs in polynomial time
under fixed maximum degree.

## Key results referenced in vault notes

- **Meek conjecture proof** → [[GES Algorithm]]
- **GES three phases** (FES / BES / Turning) → [[GES Algorithm]]
- **Score-equivalence and local decomposability** → [[GES Algorithm]]
- **NP-hardness of exact DAG learning** (Chickering 1996; Chickering et al. 2004) → [[DAG Structure Learning Problem]]
