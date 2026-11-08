---
title: "Stasinopoulos 2007 - Fitting Algorithms and Model Selection"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Stasinopoulos 2007 - GAMLSS in R.pdf]]"
source_location: "Sec. 1.5, Sec. 2, Sec. 4, pp. 11-13 and 44-45"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Stasinopoulos 2007 - GAMLSS in R"
doc_type: paper
depends_on:
  - "[[Stasinopoulos 2007 - GAMLSS Model Framework]]"
  - "[[Stasinopoulos 2007 - Distributions and Additive Terms]]"
used_by:
  - "[[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]]"
  - "[[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]"
aliases:
  - RS algorithm
  - CG algorithm
  - GAIC
  - GAMLSS model selection
---

# Stasinopoulos 2007 - Fitting Algorithms and Model Selection

> [!summary]
> Two penalized-likelihood algorithms maximise $\ell_p$ for fixed smoothing hyperparameters: **CG** (Cole-Green; uses cross derivatives) and **RS** (Rigby-Stasinopoulos; ignores cross derivatives, simpler, ideal when parameters are information-orthogonal). Model complexity (distribution, terms, smoothing df) is chosen with the generalised Akaike criterion GAIC($\#$), step-wise term search, or a validation global deviance (VGD). The GAIC penalty $\#$ is itself a tuning decision.

## Overview

Fitting uses additive backfitting (as in the R `gam` package), not mgcv's penalized IRLS; backfitting makes it easy to add new distributions and smoothers. Starting values are needed for the $\theta$'s (constants suffice), not for the $\beta$'s.

## Main Content

> [!definition] CG and RS algorithms
> - **CG**: a generalisation of Cole and Green (1992); uses first and expected (or approximate) second *and cross* derivatives of $\ell$ with respect to $\boldsymbol\theta=(\mu,\sigma,\nu,\tau)$.
> - **RS**: a generalisation of the MADAM (mean and dispersion additive model) algorithm of Rigby and Stasinopoulos (1996a,b); no cross derivatives; cycles through parameters. Not a special case of CG.
> - `method = mixed(10, 50)`: RS for the first 10 iterations to stabilise, then CG for up to 50 (CG converges faster near the maximum when parameters are highly non-orthogonal).
^def-rs-cg

Parameters $(\mu,\sigma)$ are *fully* information orthogonal only for NBI, GA, IG, LO and NO among Table 1/2 families, yet RS has been used for all, "although occasionally it can be slow to converge." Advantages listed: modular fitting (separate diagnostics per parameter), easy new distributions/terms, easily found starting values, general stability. A third algorithm, `nlgamlss()` (`gamlss.nl`), fits parametric (non-)linear models but needs starting values for all $\beta$.

**Caveats (p. 11).** (i) The penalised likelihood can have multiple local maxima — try different starting values; (ii) singularities like those of Crisp and Burridge (1994) can occur, especially in small samples; mitigate by penalising $\sigma$ going to zero.

> [!definition] GAIC
> $\text{GAIC}(\#)=-2\hat\ell+\#\cdot\text{df}$, with $\hat\ell$ the maximised log-likelihood and df the total effective degrees of freedom. $\#=2$ gives AIC; $\#=\log n$ gives the Schwarz Bayesian criterion (SBC/BIC). GAIC may have several local minima, especially for small $\#$; rerun from different starting values.
^def-gaic

> [!definition] Validation global deviance
> Split into training ($60\%$) and validation ($40\%$) data; fit on training; compute $\text{VGD}=-2\hat\ell_v$ with $\hat\ell_v$ the log-likelihood of the validation data under the training-fitted model; minimise VGD over hyperparameters (`VGD()` with `optim`). Suited to large data.
^def-vgd

### Package map (Sec. 2)

Six packages: `gamlss` (core), `gamlss.cens`, `gamlss.dist`, `gamlss.mx`, `gamlss.nl`, `gamlss.tr`. Function groups: fitting/updating (`gamlss`, `refit`, `update`, `histDist`); extraction (`AIC`, `GAIC`, `coef`, `fitted`, `predict`, `residuals`, `vcov`, with `what="mu"|"sigma"|"nu"|"tau"`); selection (`addterm`, `dropterm`, `find.hyper`, `stepGAIC`, `VGD`); diagnostics (`plot`, `rqres.plot`, `wp`, `Q.stats`, `prof.dev`, `term.plot`); centile tools (`centiles`, `centiles.split`, `centiles.com`, `centiles.pred`, `fitted.plot`). Saved residuals are *normalised randomised quantile residuals* (Dunn and Smyth 1996).

**Term selection.** `stepGAIC.VR()` (from MASS `stepAIC`) selects terms for any distribution parameter; `stepGAIC.CH()` (from `step.gam`) suits smooth terms and uses `gamlss.scope()`; `stepGAIC(additive=TRUE)` switches between them.

### Conclusions (Sec. 4)

GAMLSS is "a general framework for univariate regression type statistical problems": flexible response distribution, all parameters modelled, new distributions added easily. Limitations noted in text: the framework is univariate-response, and hyperparameter choice (df, $\xi$, $\#$) is computationally heavy — the head-circumference search with `find.hyper()` "takes a long time (approximately one hour!)".

## Examples

> [!example] Choosing the penalty
> For the BCT head-circumference model the pair $(\text{df}_\mu,\text{df}_\sigma,\text{df}_\nu,\text{df}_\tau,\xi)$ chosen with $\#=2$ was $(18.44,\,2.68,\,1.00,\,\approx6.8,\,\approx0.085)$ extra df, with GAIC(2) $=26780.56$; Rigby and Stasinopoulos (2006) chose $\#=3$ giving $(12.3,5.7,2,2,0.33)$; VGD selection gave $(15.77,8.05,2,2,0.28)$. Different criteria give different smoothness, not different qualitative stories. See [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]].
^ex-penalty-choice

## Connections

- Compare criteria with [[Overfitting and Information Criteria]] (AIC/WAIC/LOO). In Bayesian fits the hyperparameters become priors and are sampled.
- Posterior-predictive checks play the role of worm plots: [[Posterior Predictive Checking]].

## See Also

[[Stasinopoulos 2007 - GAMLSS in R - Overview]], [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]]
