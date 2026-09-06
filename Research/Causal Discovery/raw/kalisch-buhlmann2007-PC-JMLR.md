---
type: source-stub
note: "PDF download blocked by network egress policy (jmlr.org / arxiv.org not reachable). Open access paper."
---

# Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm

**Authors:** Markus Kalisch, Peter Bühlmann  
**Year:** 2007  
**Journal:** Journal of Machine Learning Research  
**Volume:** 8, pages 613–636  
**Open access (JMLR):** https://www.jmlr.org/papers/v8/kalisch07a.html  
**arXiv preprint:** https://arxiv.org/pdf/math/0510436

## Abstract (paraphrased)

Proves that the **PC algorithm** is **consistent** in high-dimensional settings where the number of variables $p$ can grow as $O(n^a)$ for any $0 < a < \infty$, as long as the true DAG is sparse (bounded maximum degree). The key: the number of conditional independence tests is polynomial in $p$ for sparse graphs, avoiding the exponential blowup that naive methods would suffer.

## Relevance to vault

This paper provides the **theoretical consistency guarantee** for the PC algorithm in high dimensions — the key reference for why PC scales to real problems. The sparse-faithfulness assumption is introduced here. The `pcalg` R package by the same authors implements PC and GES.

## Key results

- PC with a Gaussian CI test (partial correlations) is consistent for faithful distributions on sparse DAGs with $p = O(n^a)$ variables
- Skeleton recovery: PC recovers the true skeleton with probability → 1
- V-structure recovery: PC recovers all v-structures with probability → 1
- The `pcalg::pc()` and `pcalg::ges()` R functions implement the algorithms
