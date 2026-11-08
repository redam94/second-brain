---
title: "Friedman 2000 - MCMC over Orderings and Computational Tricks"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]]"
source_location: "Sec. 4, pp. 205-206"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Friedman 2000 - Being Bayesian about Network Structure"
doc_type: paper
depends_on:
  - "[[Friedman 2000 - Closed Form for a Known Ordering]]"
used_by:
  - "[[Friedman 2000 - Experiments Mixing and Feature Recovery]]"
aliases:
  - "order MCMC"
  - "ordering Metropolis sampler"
---

# Friedman 2000 - MCMC over Orderings and Computational Tricks

> [!summary]
> Put a uniform prior over the $n!$ orderings and run Metropolis over orderings with the closed-form $P(D\mid\prec)$ as target. Proposals: swap two nodes (cheap, small steps) or cut the deck (big steps). Feature posteriors are estimated by averaging $P(f\mid\prec_t,D)$ over sampled orderings. Computational tricks (candidate-parent restriction, cached top families, pruning, incremental updates) make 37-node problems feasible.

## Overview
The induced prior over structures is non-uniform: graphs consistent with more orderings are favoured (a naive-Bayes graph is consistent with $(n-1)!$ orderings, a chain with one). The authors argue standard priors are chosen for convenience and the uniform prior over DAGs is itself far from uniform over equivalence classes (PDAGs).

## Main Content

> [!theorem] Order-MCMC estimator
> Let $\prec_1,\dots,\prec_T$ be draws from a chain with stationary distribution $P(\prec\mid D)\propto P(D\mid\prec)P(\prec)$. For any feature with closed form, $\hat P(f\mid D)=\frac1T\sum_tP(f\mid\prec_t,D)$ (Rao-Blackwellised). Metropolis acceptance: $\min\big\{1,\ \frac{P(\prec'\mid D)q(\prec\mid\prec')}{P(\prec\mid D)q(\prec'\mid\prec)}\big\}$.

^thm-order-mcmc

Proposal operators: (1) **flip** two nodes in the ordering; (2) **cut the deck**; choose flip with probability $p$, cut with $1-p$, instantiation uniform.

### Computational tricks (Sec. 4.2)
1. **Candidate parents:** each node keeps only the $m_p$ best single-edge parents, selected before MCMC by $\text{score}(X_i\leftarrow X_j)$.
2. **Cache top families:** precompute and sort the $m_f$ highest-scoring families per node; with worst cached score $\ell_i$, if the best cached family consistent with the current ordering exceeds $\ell_i$ by a factor $\gamma$ use only cached families, else enumerate fully.
3. **Pruning:** families extending a low-scoring family are skipped using incremental value $\Delta(Y;X_i)=\text{score}(X_i,Y)-\text{score}(X_i)$: if $\text{score}(X_i,U)+\Delta(Y;X_i)$ is below the best family found for every other parent $Y$, prune all extensions.
4. **Incremental update:** after a flip of $i_j,i_k$ only terms for nodes between them change, and only for families containing $i_j$ or $i_k$ (subtract old, add new); a cut recomputes everything. A flip step is much cheaper but the chain moves slowly.
Alarm settings in the paper: $k=3$, $m_p=20$, 4000 cached families, $\gamma=10$ (score difference of 10 bits, a factor $2^{10}$).

## Examples

> [!example] Skeleton of order-MCMC (Python)
> Setup: `log_P_D_given_order(order)` returns $\log\sum$ from eq. 6 (via per-node `logsumexp` of local scores). Swap proposal is symmetric, so the acceptance ratio is the likelihood ratio under a uniform ordering prior.

```python
import numpy as np
def order_mcmc(logP, n, T, rng):
    o = rng.permutation(n); cur = logP(o); out = []
    for _ in range(T):
        i, j = rng.choice(n, 2, replace=False); p = o.copy(); p[i], p[j] = p[j], p[i]
        new = logP(p)
        if np.log(rng.uniform()) < new - cur: o, cur = p, new
        out.append(o.copy())
    return out        # average P(edge | order_t, D) over `out` for edge posteriors
```

## Connections
Why order space helps is in [[Friedman 2000 - Experiments Mixing and Feature Recovery]]. For continuous optimisation of DAG structure see [[NOTEARS - Overview]].

## See Also
[[Friedman 2000 - Being Bayesian about Network Structure - Overview]]
