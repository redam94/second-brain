---
title: Causal Machine Learning - Overview
tags:
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/treatment-effects
  - topic/semiparametric-inference
  - type/overview
  - doc/paper
source: "[[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]]"
source_location: "Chernozhukov et al. §1 (pp. 2-11); Wager & Athey §1-2 (pp. 1-9); Athey, Tibshirani & Wager §1-2 (pp. 1-11); Nie & Wager §1-2 (pp. 1-4)"
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Metalearners for CATE]]"
used_by:
  - "[[Regularization Bias and the Partially Linear Model]]"
  - "[[Neyman Orthogonality]]"
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Honest Trees and Causal Forests]]"
  - "[[Generalized Random Forests - Local Moment Equations]]"
  - "[[Asymptotic Normality and Inference for Forests]]"
  - "[[R-Learner and Orthogonal CATE Estimation]]"
aliases:
  - Causal ML
  - Double Machine Learning Overview
  - DML and Causal Forests Overview
  - Debiased Machine Learning
---

# Causal Machine Learning - Overview

> [!summary]
> **Causal machine learning** asks how flexible predictive learners (lasso, forests, boosting, neural nets) can be used inside a causal analysis *without* their regularization bias and overfitting contaminating the causal estimate or its confidence interval. Two research programs answer this. **Double/Debiased ML** (Chernozhukov, Chetverikov, Demirer, Duflo, Hansen, Newey & Robins 2018) targets a *low-dimensional* parameter $\theta_0$ (ATE, ATTE, LATE, a partially-linear coefficient) and obtains $\sqrt N$-consistent, asymptotically normal estimates by combining a [[Neyman Orthogonality|Neyman-orthogonal score]] with [[Cross-Fitting and Sample Splitting|cross-fitting]]. **Causal forests / generalized random forests** (Wager & Athey 2018; Athey, Tibshirani & Wager 2019) target the *function* $\tau(x)=\mathbb E[Y(1)-Y(0)\mid X=x]$ and obtain pointwise Gaussian confidence intervals by combining [[Honest Trees and Causal Forests|honest trees]], subsampling, and a [[Generalized Random Forests - Local Moment Equations|local-moment-equation]] view of forests. The [[R-Learner and Orthogonal CATE Estimation|R-learner]] (Nie & Wager 2021) is the bridge: it turns the DML orthogonal score into a *loss function* for $\tau(\cdot)$.

## Overview

All four papers work under the [[Potential Outcomes Framework]] with selection on observables — the [[Conditional Independence Assumption]] $\{Y(0),Y(1)\}\perp W\mid X$ plus [[Common Support and Overlap|overlap]] — or under an instrumental-variables analogue. Identification is therefore *not* what is new. What is new is the **estimation regime**: the confounders $X$ are high-dimensional or enter in an unknown nonlinear way, so the nuisance functions (outcome regression, propensity score) must be learned by ML methods that converge *slower* than $N^{-1/2}$ and whose function classes are too complex for classical Donsker-type arguments.

The cluster's storyline:

1. **The problem.** Plugging an ML fit $\hat g$ into a naive estimating equation gives an estimator of $\theta_0$ whose bias is of order $\sqrt n\, n^{-\varphi_g}\to\infty$ — see [[Regularization Bias and the Partially Linear Model]]. This is the frequentist face of the regularization-induced confounding that Bayesian causal forests address with a propensity-augmented prior.
2. **Fix 1 — orthogonal scores.** Use a moment function whose Gateaux derivative with respect to the nuisance vanishes at the truth ([[Neyman Orthogonality]]). The first-order effect of nuisance error disappears; what remains is a *product* of errors, $\|\hat m-m_0\|\cdot\|\hat g-g_0\|$, which is $o(N^{-1/2})$ as soon as each nuisance converges at $o(N^{-1/4})$.
3. **Fix 2 — sample splitting.** Estimate nuisances on one fold and evaluate the score on another ([[Cross-Fitting and Sample Splitting]]). This kills the overfitting bias caused by reusing observation $i$ in both $\hat\eta$ and the score, and replaces entropy/Donsker conditions with a one-line Chebyshev argument.
4. **The payoff for averages.** [[DML Estimators for ATE and the Interactive Model]] — the AIPW/doubly-robust score is the canonical orthogonal score; cross-fit it and you get efficient, uniformly valid inference for ATE, ATTE and LATE with any ML learner.
5. **From averages to functions.** [[Honest Trees and Causal Forests]] embed the same sample-splitting idea *inside each tree* (honesty), and [[Generalized Random Forests - Local Moment Equations]] recasts a forest as an adaptive kernel that solves any local moment condition — CATE, conditional quantiles, IV effects — with a gradient-based splitting rule and DML-style *local centering*.
6. **Inference for functions.** [[Asymptotic Normality and Inference for Forests]] — subsampled honest forests are asymptotically Gaussian and unbiased at a fixed $x$, with variance estimated by the infinitesimal jackknife or the bootstrap of little bags.
7. **The loss-function view.** [[R-Learner and Orthogonal CATE Estimation]] — Robinson's residual-on-residual decomposition as a generic objective with a quasi-oracle error bound.

## Main Content

> [!definition] The two target types ^def-two-targets
> **Low-dimensional target** (DML): a finite-dimensional $\theta_0$ solving $\mathbb E_P[\psi(W;\theta_0,\eta_0)]=0$ with an infinite-dimensional nuisance $\eta_0$ (e.g. $\eta_0=(g_0,m_0)$). Goal: $\sqrt N(\tilde\theta_0-\theta_0)\rightsquigarrow\mathcal N(0,\sigma^2)$.
> **Function-valued target** (forests, R-learner): $\theta(x)$ solving the *local* moment condition $\mathbb E[\psi_{\theta(x),\nu(x)}(O_i)\mid X_i=x]=0$ for every $x$. Goal: $(\hat\theta(x)-\theta(x))/\sigma_n(x)\Rightarrow\mathcal N(0,1)$ pointwise, with $\sigma_n^2(x)\asymp s/n$ up to logs — slower than $\sqrt n$, as any nonparametric rate must be.

> [!theorem] The common recipe ^thm-common-recipe
> Every method in this cluster is an instance of three design rules:
> 1. **Orthogonalize** — residualize both outcome and treatment on $X$ (Robinson 1988) or, equivalently, add the influence-function correction to the plug-in (AIPW).
> 2. **Split** — never let the same observation both *choose* the model (nuisance fit, tree splits) and *evaluate* it (score, leaf estimate). DML does this across $K$ folds; honest forests do it within each subsample.
> 3. **Re-use efficiently** — swap fold roles and average (cross-fitting), or re-randomize the split over thousands of subsampled trees, so no data are wasted asymptotically.

| | DML | Causal forest / GRF | R-learner |
|---|---|---|---|
| Target | $\theta_0$ (ATE, ATTE, LATE, PLR coefficient) | $\tau(x)$, $\theta(x)$ pointwise | $\tau(\cdot)$ as a function |
| Orthogonality device | Neyman-orthogonal score | local centering of $Y_i,W_i$ | R-loss (residual-on-residual) |
| Splitting device | $K$-fold cross-fitting | honesty + subsampling | $Q$-fold cross-fitting |
| Nuisance rate needed | $o(N^{-1/4})$ (product rate $o(N^{-1/2})$) | Lipschitz signals; $s\asymp n^\beta$ | $o(n^{-1/4})$ |
| Guarantee | $\sqrt N$-normality, uniform CIs, efficiency | pointwise normality, consistent variance | oracle-rate regret bound |
| Key result | Thm 3.1, 4.1, 5.1 | W&A Thm 1, 11; ATW Thm 5 | N&W Thm 3 |

**Relevance to marketing measurement / applied work.** (i) In observational ad-effect or promotion studies the controls (user history, geography, seasonality features) are high-dimensional; DML gives a defensible "lift" coefficient — Chernozhukov et al. explicitly call $\theta_0$ in the partially linear model the *"lift parameter in business applications"* — with honest standard errors, where a hand-specified regression invites [[Omitted Variables Bias]] and a naive ML plug-in invites regularization bias. (ii) In randomized geo or user-level experiments the propensity is *known*, the second-order term vanishes identically ($\lambda_N'=0$), and ML covariate adjustment only needs to be consistent — DML is then a variance-reduction device analogous to regression adjustment in [[Geo-Experiment Methodology - Overview|geo experiments]]. (iii) Causal forests are the workhorse for **uplift / heterogeneous-response targeting** with confidence intervals, complementing the Bayesian BART route in [[Nonparametric Causal Inference]]. (iv) GRF's IV forest gives heterogeneous effects when exposure is endogenous but an encouragement/eligibility instrument exists. (v) For [[Bayesian Media Mix Modeling - Overview|media mix models]], the partially-linear decomposition is a useful diagnostic: residualize spend and sales on the control set with flexible learners and check whether the residual-on-residual slope agrees with the structural model's media coefficient.

## Examples

A minimal mental model using the Pennsylvania Reemployment Bonus experiment (Chernozhukov et al. §6.1): outcome $Y=\log$ unemployment duration, $D$ = assignment to the generous bonus arm, $X$ = demographics and claim characteristics. With lasso, regression trees, random forests, boosting, a neural net, an ensemble, and a "best-per-nuisance" hybrid as nuisance learners, the DML2 estimate of the ATE ranges only from $-0.073$ to $-0.085$ with standard error $\approx 0.036$ in every column, for both 2-fold and 5-fold cross-fitting and for both the partially linear and the fully interactive model. The practical lesson: once the score is orthogonal and cross-fit, **the choice of ML learner is second-order** — exactly what the theory predicts.

Contrast with the observational 401(k) example (§6.2): the interactive-model ATE of eligibility on net financial assets ranges from \$6,830 (lasso, 2-fold) to \$8,105 (forest, 5-fold), and the partially linear model gives \$7,717–\$9,247 — still broadly consistent, but learner choice matters more when confounding by income is strong and nonlinear.

## Connections

- [[Frequentist Causal Estimation]] — outcome regression, IPW and the doubly-robust estimator; DML is "DR + ML nuisances + cross-fitting" with a general theory of *why* it works.
- [[Metalearners for CATE]], [[S-Learner]], [[T-Learner and Minimax Rate]], [[X-Learner]], [[Künzel 2019 - Overview]] — the vault's existing CATE toolkit; the R-learner and causal forest are the orthogonalized alternatives, and Nie & Wager show the X-learner lacks the quasi-oracle property.
- [[Nonparametric Causal Inference]] — BART as the Bayesian tree-ensemble counterpart to causal forests.
- [[Doubly-Robust Estimands for ATT(g,t)]] — the same DR/orthogonal-score logic in staggered DiD.
- [[Propensity Score Matching - Overview]], [[Propensity Score and the Balancing Property]], [[Common Support and Overlap]] — the propensity score is one of the two nuisances everywhere in this cluster; overlap is a maintained assumption.
- [[Instrumental Variables]], [[Local Average Treatment Effects]] — the partially linear IV model, the DML LATE score, and the instrumental forest.
- [[Horseshoe and Regularized Horseshoe Priors]] — Bayesian shrinkage induces the same regularization bias on a treatment coefficient when confounders are shrunk.

## See Also

- [[Omitted Variables Bias]] and [[Table 2 Fallacy]] — why only $\theta_0$, not the nuisance coefficients, carries a causal interpretation.
- [[Quantile Regression]] — GRF's quantile forest is its nonparametric, locally weighted analogue.
- [[GMM Estimation and Instruments for Price Endogeneity]] and [[Plausible GMM - Overview]] — moment-condition estimation; DML and GRF are moment-condition methods with ML nuisances / local weights.
- [[Synthetic Control Extensions]] — ML regularization applied to panel counterfactuals.
- [[Sensitivity Analysis in Observational Studies]] — none of these methods protects against unobserved confounding.
- Sources: [[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]], [[raw/Wager Athey 2018 - Heterogeneous Treatment Effects using Random Forests.pdf]], [[raw/Athey Tibshirani Wager 2019 - Generalized Random Forests.pdf]], [[raw/Nie Wager 2021 - Quasi-Oracle Estimation of Heterogeneous Treatment Effects.pdf]].
