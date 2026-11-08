---
title: "Chipman 2010 - BART - Overview"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
  - type/overview
  - doc/paper
source: "[[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]"
source_location: "Whole paper, pp. 266-298 (arXiv 35 pp.)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chipman 2010 - BART"
doc_type: paper
depends_on:
  - "[[Nonparametric Causal Inference]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]]"
  - "[[Chipman 2010 - Backfitting MCMC and Posterior Inference]]"
aliases:
  - BART paper overview
  - Bayesian Additive Regression Trees overview
---

# Chipman 2010 - BART - Overview

> [!summary]
> Chipman, George & McCulloch (2010, *Annals of Applied Statistics* 4(1):266-298) define BART: a sum of $m$ regression trees, each held to be a *weak learner* by a regularization prior, fitted by a Gibbs-style "Bayesian backfitting" MCMC. The result is a Bayesian nonparametric regression with full posterior draws of the function $f(x)=E(Y\mid x)$, pointwise intervals, partial dependence, model-free variable selection and a probit classifier. Key takeaway: BART is a **prior over functions** whose defaults (m = 200, k = 2, nu = 3, q = 0.90) work off the shelf.

## Overview

**Research question.** Can ensemble-of-trees methods (boosting, bagging, random forests) be given a coherent probability model, so that regularization is a *prior* and uncertainty is a *posterior*, without losing predictive accuracy?

**Contribution.**
1. A model: $Y=\sum_{j=1}^m g(x;T_j,M_j)+\varepsilon$, $\varepsilon\sim N(0,\sigma^2)$ plus a prior $p(T_j)$, $p(\mu_{ij}\mid T_j)$, $p(\sigma)$ built from a handful of interpretable hyperparameters ([[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]]).
2. Posterior computation by backfitting MCMC with conjugate $\mu$ integrated out, four Metropolis-Hastings tree moves and no reversible-jump ([[Chipman 2010 - Backfitting MCMC and Posterior Inference]]).
3. A probit extension for binary $Y$ via Albert-Chib latent variables ([[Chipman 2010 - Probit BART for Classification]]).
4. Empirical evidence: a 42-dataset bake-off, Friedman's five-dimensional function with up to $p=1000$ predictors, and a drug-discovery classification ([[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]], [[Chipman 2010 - Drug Discovery Classification and Execution Time]]).
5. Extensions and related work (BART inside larger models; SBART, BACT, CBART, ...) ([[Chipman 2010 - Extensions, Discussion and Practical Use]]).

**Headline results.** Median relative RMSE across 840 train/test splits: BART-cv 1.037, BART-default 1.055, random forests 1.053, neural net 1.055, boosting 1.068, lasso 1.196. On Friedman with $p=1000$, BART-cv RMSE (0.99, 1.06) beats boosting (1.08, 1.33) and random forests (1.62, 1.68).

## Source Map

| Paper section | Pages (journal) | Covered in |
|---|---|---|
| 1 Introduction (ensembles, backfitting, outline) | 266-269 | this note; [[Chipman 2010 - Extensions, Discussion and Practical Use]] |
| 2.1 Sum-of-trees model | 269-270 | [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]] |
| 2.2.1-2.2.5 Prior: independence, $T_j$, $\mu_{ij}\mid T_j$, $\sigma$, choice of $m$ | 270-274 | [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]] |
| 3.1 Bayesian backfitting MCMC | 274-276 | [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] |
| 3.2 Posterior inference statistics (mean, intervals, partial dependence, variable usage) | 276-278 | [[Chipman 2010 - Backfitting MCMC and Posterior Inference]] |
| 4 BART probit | 278-280 | [[Chipman 2010 - Probit BART for Classification]] |
| 5.1 Bake-off on 42 datasets (Tables 1-3, Fig. 2) | 280-283 | [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]] |
| 5.2 Friedman function (Figs. 3-8, Table 4) | 283-290 | [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]] |
| 5.3 Drug discovery (Fig. 9-10, Table 5) | 290-294 | [[Chipman 2010 - Drug Discovery Classification and Execution Time]] |
| 6 Execution time (Figs. 11-12) | 294-296 | [[Chipman 2010 - Drug Discovery Classification and Execution Time]] |
| 7 Extensions and related work | 296-297 | [[Chipman 2010 - Extensions, Discussion and Practical Use]] |
| 8 Discussion | 297 | [[Chipman 2010 - Extensions, Discussion and Practical Use]] |
| References | 297-298 | not transcribed; key ones cited inline |

## Motivating PyMC examples

Listed at https://redam94.github.io/pymc-challenges/examples.html :
- **E15 - Bayesian additive regression trees** (Capital Bikeshare rentals; LaLonde job training): the BART prior over functions, `pmb.BART` inside an ordinary PyMC model, PGBART + NUTS, diagnosing in function space, partial dependence / ICE.
- Also relevant to **E11** and **E29** as the "prior over functions" counterpart to neural nets (see [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]]).

> [!note] PyMC implementation differs
> `pymc-bart` samples trees with **PGBART** (particle Gibbs), not the Metropolis-Hastings grow/prune/change/swap moves described here, and lets BART sit as a function-valued component of any PyMC likelihood. The prior (sum of weak trees, depth penalty $\alpha(1+d)^{-\beta}$, shrinkage $1/\sqrt m$) is the same idea.

## Relevance to marketing measurement

- BART is the standard flexible outcome model for **heterogeneous treatment effects** and doubly-robust-style causal estimators; see [[Nonparametric Causal Inference]] and [[Honest Trees and Causal Forests]].
- For MMM, BART can model baseline demand with many controls, but it has no built-in monotonicity, saturation or adstock; it is better as a control-variable component than as the response curve (this is an editorial caution, not a claim from the paper).
- Posterior-draw uncertainty on $f(x)$ supports decisions under uncertainty ([[Decision Analysis]]).

## Connections

Prior-over-functions peers: [[Gaussian Process Regression]], [[Hilbert Space Gaussian Processes]]. Forest comparison: [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]], [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]. Computation: [[MCMC Basics]], [[HMC and Stan in Practice]].

## See Also

[[Model Selection and Overfitting]], [[Prior Predictive Checking]].
