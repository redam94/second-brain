---
title: "Index: Chipman 2010 - BART"
tags:
  - type/index
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
parent: "[[../_Index|Mechanistic and Scientific Models]]"
date_updated: 2026-11-08
concept_count: 7
---

# Chipman 2010 - BART

> [!abstract] Routing Summary
> Full capture of Chipman, George & McCulloch (2010), *BART: Bayesian additive regression trees* (Ann. Appl. Stat. 4(1):266-298): sum-of-trees model, regularization prior, backfitting MCMC, probit classification, the 42-dataset bake-off, Friedman simulations, drug discovery and runtime. 7 notes.
> - Need the paper on one page, headline numbers, or the section-to-note map? -> [[Chipman 2010 - BART - Overview]]
> - Need the model, tree prior $\alpha(1+d)^{-\beta}$, leaf prior $\sigma_\mu=0.5/(k\sqrt m)$, $\sigma$ prior and defaults? -> [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]]
> - Need the Gibbs/backfitting sampler, tree moves, partial dependence or variable-usage? -> [[Chipman 2010 - Backfitting MCMC and Posterior Inference]]
> - Need binary outcomes (probit BART, Albert-Chib)? -> [[Chipman 2010 - Probit BART for Classification]]
> - Need Tables 1-4 (42 datasets, RRMSE, Friedman $p$=10/100/1000)? -> [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]]
> - Need the drug-discovery AUC table (Table 5) or runtime scaling? -> [[Chipman 2010 - Drug Discovery Classification and Execution Time]]
> - Need extensions (linear terms, random effects, multivariate), discussion, or practical caveats? -> [[Chipman 2010 - Extensions, Discussion and Practical Use]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Sum-of-trees model; overcomplete basis | [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]] | definition | CART | $Y=\sum_j g(x;T_j,M_j)+\varepsilon$ |
| Depth-penalized tree prior | [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]] | definition | CGM98 | sizes 1,2,3,4,>=5 get 0.05,0.55,0.28,0.09,0.03 |
| Leaf and noise priors; default $(m,k,\nu,q)$ | [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]] | definition | data range | (200, 2, 3, 0.90) |
| Backfitting reduction | [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] | theorem | conjugacy | draw $T_j$ given partial residual $R_j$ |
| Tree moves | [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] | algorithm | MH | grow .25 prune .25 change .40 swap .10 |
| Variable usage $v_i$ | [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] | definition | posterior draws | small $m$ selects relevant predictors |
| Probit BART | [[Chipman 2010 - Probit BART for Classification]] | definition | Albert-Chib | $\sigma_\mu=3/(k\sqrt m)$ |
| RRMSE bake-off | [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]] | example | 42 datasets | BART-cv median 1.037 |
| Friedman function | [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]] | example | simulation | defaults fail at $p=1000$ |
| Drug discovery AUC | [[Chipman 2010 - Drug Discovery Classification and Execution Time]] | example | probit BART | RF .768, BART-cv .748 |
| Modular extensions | [[Chipman 2010 - Extensions, Discussion and Practical Use]] | definition | eqs. 28-29 | partially parametric and SUR forms |

## Notes

- [[Chipman 2010 - BART - Overview]] — CONTAINS: question, contributions, headline results, Source Map, motivating PyMC example E15, marketing relevance.
- [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]] — CONTAINS: tree and sum-of-trees definitions, prior factorization, tree/leaf/noise priors, choice of $m$, hyperparameter table, runnable check of the 0.05/0.55/0.28/0.09/0.03 sizes, PyMC sketch.
- [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] — CONTAINS: backfitting theorem, tree-move algorithm, posterior summaries, partial dependence, variable usage, coverage statistics.
- [[Chipman 2010 - Probit BART for Classification]] — CONTAINS: probit model, leaf prior, Albert-Chib Gibbs algorithm, latent draw snippet.
- [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]] — CONTAINS: Tables 1-4, RRMSE definition, robustness, high-$p$ behaviour, why defaults degrade, data generator.
- [[Chipman 2010 - Drug Discovery Classification and Execution Time]] — CONTAINS: drug discovery setup, Table 5, variable selection, runtime experiments and interpretation, lift check.
- [[Chipman 2010 - Extensions, Discussion and Practical Use]] — CONTAINS: comparison to boosting/bagging, extensions, follow-on work, discussion, practitioner caveats.

## Sources

Chipman 2010 - BART Bayesian Additive Regression Trees (arXiv 0806.3286v2).

## See Also

[[Nonparametric Causal Inference]], [[Gaussian Process Regression]], [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]].
