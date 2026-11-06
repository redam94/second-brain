---
type: reference
title: "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm"
---

# Bibliographic Reference

**Authors:** Markus Kalisch, Peter Bühlmann  
**Year:** 2007  
**Journal:** Journal of Machine Learning Research, vol. 8, pp. 613–636  
**arXiv:** math/0510436  
**URL:** https://arxiv.org/abs/math/0510436  
**Note on availability:** arXiv domain is unreachable from this session's network policy. Paper freely available on arXiv.

## Abstract / Summary

Extends the PC algorithm to high-dimensional DAGs ($d \gg n$) with Gaussian data using Fisher's z-transform partial correlation test for conditional independence. Proves uniform consistency of the estimated CPDAG when the number of variables $d$ grows polynomially in the sample size $n$. The key condition is that the true graph is sparse (maximum degree $q = O(1)$), so the PC algorithm's level-$k$ CI tests only need to condition on sets of at most $q$ variables.

**Key contributions:**
1. High-dimensional consistency theorem for PC under sparsity and faithfulness
2. Partial correlation as the CI test for Gaussian data (Fisher z-transform)
3. The PC-stable variant that makes skeleton discovery order-independent
4. Simulation studies in $d \approx 500$-node graphs with moderate $n$
