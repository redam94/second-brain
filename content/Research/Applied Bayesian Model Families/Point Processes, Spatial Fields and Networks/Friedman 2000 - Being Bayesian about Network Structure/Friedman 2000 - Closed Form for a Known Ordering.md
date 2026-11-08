---
title: "Friedman 2000 - Closed Form for a Known Ordering"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]]"
source_location: "Sec. 3, pp. 203-205, eq. 5-8, Prop. 3.1-3.2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Friedman 2000 - Being Bayesian about Network Structure"
doc_type: paper
depends_on:
  - "[[Friedman 2000 - Bayesian Structure Learning Framework]]"
used_by:
  - "[[Friedman 2000 - MCMC over Orderings and Computational Tricks]]"
aliases:
  - "ordering sum over DAGs"
  - "Buntine decomposition"
  - "edge posterior given ordering"
---

# Friedman 2000 - Closed Form for a Known Ordering

> [!summary]
> Given a total ordering $\prec$, the parent sets of different nodes can be chosen independently, so $\sum_{G\in\mathcal G_k,\,G\text{ consistent with}\prec}P(G)P(D\mid G)=\prod_i\sum_{U\in\mathcal U_{i,\prec}}p(X_i,U)\,\text{score}(X_i,U\mid D)$ at cost about $n^{k+1}$. Edge posteriors given the ordering are ratios of restricted sums (Prop. 3.1); Markov-blanket posteriors follow by independence (Prop. 3.2).

## Overview
This is the core trick. Without an ordering, choosing $X_i$ as a parent of $X_j$ forbids $X_j$ as a parent of $X_i$, coupling families through acyclicity; the ordering removes that coupling. The decomposition was first noted by Buntine and was used for averaging by the present paper.

## Main Content

> [!theorem] Marginal likelihood given an ordering (eq. 5-6)
> Let $\mathcal U_{i,\prec}=\{U:U\prec X_i,|U|\le k\}$ (all members of $U$ precede $X_i$). Then
> $$
> P(D\mid\prec)=\sum_{G\in\mathcal G_k}P(G\mid\prec)P(D\mid G)\ \propto\ \prod_{i=1}^n\ \sum_{U\in\mathcal U_{i,\prec}}p(X_i,U)\,\text{score}(X_i,U\mid D).
> $$
> Number of allowed families per node is at most $\binom nk\le n^k$, so the cost is at most $n\cdot n^k=n^{k+1}$ score evaluations.

^thm-order-marginal-likelihood

*Proof sketch.* Under $\prec$, each graph is an independent choice of $U_i\in\mathcal U_{i,\prec}$ for every $i$; by Theorem 2.1 and structure modularity the weight of $G$ is $\prod_i p(X_i,U_i)\,\text{score}(X_i,U_i)$, so the sum over the product set factorises.

> [!theorem] Feature posteriors given an ordering (Prop. 3.1, eq. 7-8)
> Edge: $P(f_{X_j\to X_i}\mid\prec,D)=\dfrac{\sum_{U\in\mathcal U_{i,\prec},\,U\ni X_j}p(X_i,U)\text{score}(X_i,U\mid D)}{\sum_{U\in\mathcal U_{i,\prec}}p(X_i,U)\text{score}(X_i,U\mid D)}$ (the other nodes' terms cancel). Parent set: $P(\text{Pa}(X_i)=U\mid D,\prec)=\dfrac{p(X_i,U)\text{score}(X_i,U\mid D)}{\sum_{U'}p(X_i,U')\text{score}(X_i,U'\mid D)}$.

^thm-edge-posterior-order

> [!theorem] Proposition 3.2 (Markov blanket)
> For $X_i\prec X_j$, $P(f^{M}_{X_i,X_j}\mid D,\prec)=1-(1-p_1)\prod_{X_t\succ X_j}(1-q_t)$, where $p_1=P(f_{X_i\to X_j}\mid D,\prec)$ and $q_t=P(X_i,X_j\in\text{Pa}(X_t)\mid D,\prec)$ (families restricted to contain both); all events are independent given the ordering.

^thm-markov-blanket-order

Features like "there is a directed path $X_i\leadsto X_j$" have no closed form; instead sample whole networks given the ordering by drawing each family from eq. 8 and evaluate $f$ on the samples.

## Examples

> [!example] Numerical verification of eq. 6 on four variables
> Random local scores with $k=2$, ordering $(X_2,X_0,X_3,X_1)$: the product of per-node sums (closed form) equals the brute-force sum over all consistent graphs, 37.5456 both; $P(X_2\to X_0\mid\prec,D)=0.6259$.

```python
import itertools, numpy as np
rng = np.random.default_rng(0); n, k = 4, 2
score = {i: {frozenset(U): np.exp(rng.normal()) for r in range(k+1)
             for U in itertools.combinations([j for j in range(n) if j != i], r)} for i in range(n)}
order = [2, 0, 3, 1]; pos = {v: t for t, v in enumerate(order)}
fam = lambda i: [U for U in score[i] if all(pos[u] < pos[i] for u in U)]
closed = np.prod([sum(score[i][U] for U in fam(i)) for i in range(n)])
brute = sum(np.prod([score[i][U] for i, U in enumerate(G)]) for G in itertools.product(*[fam(i) for i in range(n)]))
print(closed, brute)
```

PyMC connection: E20's "exact BGe + dynamic programming over all orders" replaces the order-MCMC with exact summation over orderings (feasible for about 10-15 nodes via subset dynamic programming); the per-family scores are the same `score` terms.

## Connections
[[Friedman 2000 - MCMC over Orderings and Computational Tricks]] samples orderings; [[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]] gives Gaussian scores.

## See Also
[[Friedman 2000 - Being Bayesian about Network Structure - Overview]]
