---
title: "Chipman 2010 - Backfitting MCMC and Posterior Inference"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
  - type/theorem
  - doc/paper
source: "[[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]"
source_location: "Sec. 3, pp. 274-278"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chipman 2010 - BART"
doc_type: paper
depends_on:
  - "[[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Chipman 2010 - Probit BART for Classification]]"
  - "[[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]]"
aliases:
  - Bayesian backfitting
  - BART posterior inference
  - BART variable importance
---

# Chipman 2010 - Backfitting MCMC and Posterior Inference

> [!summary]
> BART is sampled with a Gibbs sampler over $(T_j,M_j)$, $j=1..m$, and $\sigma$. Each tree's full conditional depends on the data only through the partial residual $R_j=y-\sum_{k\ne j}g(x;T_k,M_k)$, so each update is a single-tree Bayesian CART step with $M_j$ integrated out. Posterior draws of $f=\sum_j g_j$ give means, intervals, partial dependence and a model-free variable-usage measure.

## Overview

The posterior $p((T_1,M_1),\dots,(T_m,M_m),\sigma\mid y)$ (eq. 9) lives on an enormous space, but its conditional structure is simple enough for a Gibbs sampler. The authors call it **Bayesian backfitting** because it is a stochastic version of Hastie-Tibshirani backfitting for additive models.

## Main Content

### The Gibbs sampler

> [!theorem] Backfitting reduction (eqs. 10-16)
> Let $T_{(j)},M_{(j)}$ denote all trees except the $j$th. The Gibbs sampler draws, for $j=1,\dots,m$, $(T_j,M_j)\mid T_{(j)},M_{(j)},\sigma,y$, then $\sigma\mid T_{1:m},M_{1:m},y$. Because the conditional depends on $(T_{(j)},M_{(j)},y)$ only through
> $$
> R_j\equiv y-\sum_{k\neq j}g(x;T_k,M_k),\tag{12}
> $$
> the draw is equivalent to $(T_j,M_j)\mid R_j,\sigma$ (eq. 13), the posterior of the single-tree model $R_j=g(x;T_j,M_j)+\varepsilon$ with $R_j$ playing the role of data. With the conjugate leaf prior,
> $$
> p(T_j\mid R_j,\sigma)\propto p(T_j)\int p(R_j\mid M_j,T_j,\sigma)\,p(M_j\mid T_j,\sigma)\,dM_j
> $$
> is available in closed form up to a constant (eq. 14), so the draw splits into $T_j\mid R_j,\sigma$ (eq. 15, Metropolis-Hastings) and $M_j\mid T_j,R_j,\sigma$ (eq. 16, independent normals). The $\sigma$ draw is a standard inverse-gamma draw.
^thm-bart-backfitting

*Proof sketch.* The full conditional of tree $j$ is proportional to prior times likelihood; the likelihood involves $y-\sum_{k\ne j}g_k-g_j$, hence only $R_j$. Conjugacy lets $M_j$ be marginalized, giving a marginal likelihood for the tree structure alone.

> [!algorithm] Tree proposal moves (CGM98)
> Proposals for $T_j$ and their probabilities: **grow** a terminal node (0.25); **prune** a pair of sibling terminal nodes (0.25); **change** a nonterminal rule (0.40); **swap** a rule between parent and child (0.10). Because $M_j$ is integrated out, grow/prune need no reversible-jump machinery over varying-dimension continuous spaces.
^alg-bart-tree-moves

Initialization: $m$ single-node trees; iterate until convergence. Each iteration a tree can change size by one terminal node or change one or two rules. Fit "is freely reallocated from one tree to another" because the parameters are unidentified; it is common to see a tree grow large and then collapse to a single node. The authors liken this to *sculpting with small dabs of clay*.

**Mixing.** The single-tree CGM98 sampler gets stuck near one large tree; backfitting with many weak trees mixes dramatically better. Restarts give "remarkably similar" results, so the authors run one long chain. (Modern practice still checks convergence; see the function-space diagnostics in [[HMC and Stan in Practice]]. The `pymc-bart` package does diagnose in function space rather than in tree space, because tree parameters are not identified.)

### Posterior summaries

After burn-in the draws $f^*_k=\sum_j g(\cdot;T_j^*,M_j^*)$, $k=1..K$, are a dependent sample from $p(f\mid y)$ (eq. 17).

| Quantity | Estimator | Eq. |
|---|---|---|
| $f(x)$ / prediction | $\frac1K\sum_k f_k^*(x)$ (or median) | 18 |
| $(1-\alpha)$ interval for $f(x)$ | $\alpha/2$ and $1-\alpha/2$ quantiles of $f^*_k(x)$ | - |
| Partial dependence | $f(x_s)=\frac1n\sum_{i=1}^n f(x_s,x_{ic})$; average the draws $f^*_k(x_s)=\frac1n\sum_i f^*_k(x_s,x_{ic})$; quantiles give intervals | 19 |
| Variable usage | $z_{ik}$ = share of splitting rules in draw $k$ that use $x_i$; $v_i=\frac1K\sum_k z_{ik}$ | 20 |

> [!definition] Average variable-usage measure $v_i$
> For each posterior draw $k$ let $z_{ik}$ be the proportion of all splitting rules using component $x_i$. Then $v_i=\frac1K\sum_{k=1}^K z_{ik}$. As $m$ is made smaller, trees compete for a few slots, and $v_i$ concentrates on predictors that genuinely improve prediction. With large $m$, redundancy lets irrelevant predictors in, so the measure is less effective.
^def-bart-variable-usage

Intervals "behave sensibly, for example, by widening at $x$ values far from the data". In the Friedman example the 90% posterior intervals covered the true $f(x)$ at 89% (in-sample) and 96% (out-of-sample) for one data set, and 87% / 93% on average over 200 replicates; the authors point out these are not frequentist guarantees, and that near the edges of the $x$ space the prior shrinkage lowers coverage.

## Examples

**Partial residual loop (conceptual NumPy).**
```python
# Skeleton of one BART sweep; tree internals omitted.
for j in range(m):
    R_j = y - (fit_sum - tree_fit[j])              # partial residual, eq. 12
    tree[j] = metropolis_hastings_tree(R_j, sigma, tree[j])   # grow/prune/change/swap
    leaf_values[j] = draw_leaves(tree[j], R_j, sigma)         # eq. 16, normals
    fit_sum += tree_fit_new[j] - tree_fit[j]
sigma = draw_sigma(y - fit_sum)                    # inverse-gamma, eq. 11
```
Mark: pseudocode only.

**Reading variable usage.** In the Friedman example ($n=500$, $p=10$), as $m$ falls through 200, 100, 50, 20, 10, the usage $v_i$ of $x_6,\dots,x_{10}$ collapses to near zero and $x_1,\dots,x_5$ are exactly recovered. The paper caution: spurious splits inflate usage, and putting more tree-prior mass on small trees (smaller $\alpha$) may make "every split count".

## Connections

- The Gibbs-with-partial-residual structure is the same as backfitting in additive models and underlies all later BART variants (PGBART, dbarts, BCF; see [[Nonparametric Causal Inference]]).
- Model-free variable importance via split counts relates to the biases discussed in [[Strobl 2007 - Split-Selection Bias in CART Trees]] and [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]; treat $v_i$ as a screen, not a test.
- Partial dependence on correlated marketing variables extrapolates; compare [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]].

## See Also

[[Chipman 2010 - BART - Overview]], [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]], [[Efficient MCMC]].
