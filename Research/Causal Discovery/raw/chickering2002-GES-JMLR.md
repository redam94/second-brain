---
type: source-stub
note: "PDF download blocked by network egress policy (jmlr.org not reachable). Open access paper."
---

# Optimal Structure Identification with Greedy Search

**Author:** David Maxwell Chickering  
**Year:** 2002  
**Journal:** Journal of Machine Learning Research  
**Volume:** 3, pages 507–554  
**Open access:** https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf  
**JMLR page:** https://jmlr.org/papers/v3/chickering02b.html

## Abstract (paraphrased)

Proves the **Meek Conjecture**: if a DAG $H$ is an independence map of a faithful DAG $G$, then there exists a sequence of covered-edge reversals transforming $G$ into an equivalent DAG from which $H$ can be obtained by edge additions. Uses this to prove correctness of the **Greedy Equivalence Search (GES)** algorithm, which in the limit of large samples identifies a perfect map of the generative distribution.

## Relevance to vault

This paper is the primary source for **GES** (Greedy Equivalence Search) — the score-based causal discovery algorithm. Also proves:
- NP-hardness of optimal structure identification (cited as "Chickering 1996")
- Score equivalence property of BDe/BGe scores
- Meek Conjecture proof (the forward phase finds the CPDAG's skeleton; the backward phase orients it)
