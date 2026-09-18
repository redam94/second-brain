---
title: Causal Machine Learning - Index
tags:
  - type/index
  - source/ingested
  - topic/causal-inference
  - topic/machine-learning
  - topic/treatment-effects
date_ingested: 2026-09-18
folder: "Econometrics/Causal Machine Learning"
parent: "[[Econometrics/_Index|Econometrics]]"
---

# Causal Machine Learning - Index

> [!abstract] Routing Summary
> The ML-meets-causal-inference bridge: how to use flexible learners for nuisance functions and effect heterogeneity while keeping valid frequentist inference. Anchored by Chernozhukov et al. (2018) on Double/Debiased ML, Wager & Athey (2018) on causal forests, Athey, Tibshirani & Wager (2019) on generalized random forests, and Nie & Wager (2021) on the R-learner.
>
> - Need the big picture, a DML-vs-forest-vs-R-learner comparison, or marketing relevance? → [[Causal Machine Learning - Overview]]
> - Need to know *why* plugging ML into a regression breaks inference? → [[Regularization Bias and the Partially Linear Model]]
> - Need the formal definition of an orthogonal score, how to construct one, or the $o(N^{-1/4})$ rate condition? → [[Neyman Orthogonality]]
> - Need the DML1/DML2 algorithms, choice of $K$, variance estimator, or median-over-splits? → [[Cross-Fitting and Sample Splitting]]
> - Need the AIPW / ATTE / LATE scores and the theorem for ATE inference with ML nuisances? → [[DML Estimators for ATE and the Interactive Model]]
> - Need what a causal tree is, what honesty means, or double-sample vs propensity trees? → [[Honest Trees and Causal Forests]]
> - Need forests for arbitrary moment conditions (quantiles, partial effects, IV), gradient splitting, or local centering? → [[Generalized Random Forests - Local Moment Equations]]
> - Need the CLT for forests, the subsample-size condition, infinitesimal jackknife or bootstrap of little bags? → [[Asymptotic Normality and Inference for Forests]]
> - Need a loss function for CATE usable with any learner, or a way to cross-validate / stack CATE models? → [[R-Learner and Orthogonal CATE Estimation]]
> - Which estimator do I use? → average effect with CI: [[DML Estimators for ATE and the Interactive Model#^thm-dml-ate|cross-fit AIPW]]; constant/"lift" coefficient with continuous treatment: [[Regularization Bias and the Partially Linear Model#^thm-dml-plr|DML-PLR]]; $\tau(x)$ with pointwise CIs: [[Generalized Random Forests - Local Moment Equations#^def-local-centering|centered causal forest]]; $\tau(\cdot)$ with a preferred learner: [[R-Learner and Orthogonal CATE Estimation#^alg-r-learner|R-learner]].

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Framing and comparison | [[Causal Machine Learning - Overview]] | overview | Potential Outcomes; CIA; Frequentist Causal Estimation | Orthogonalize + split + re-use; DML for scalars, forests for functions, R-learner as bridge |
| Regularization bias in PLR | [[Regularization Bias and the Partially Linear Model]] | concept | Overview; CIA; OVB | Naive plug-in bias $\sqrt n\,n^{-\varphi_g}\to\infty$; double residualization gives product bias $\sqrt n\,n^{-(\varphi_m+\varphi_g)}$; Thm 4.1 |
| Neyman orthogonality | [[Neyman Orthogonality]] | theorem | PLR note | $\partial_\eta\mathbb E\psi(W;\theta_0,\eta_0)[\eta-\eta_0]=0$; constructions (Lemma 2.1, IF adjustment); nuisance rate $o(N^{-1/4})$, or $o(1)$ when $\lambda_N'=0$ |
| Cross-fitting | [[Cross-Fitting and Sample Splitting]] | method | Orthogonality | DML1/DML2; Chebyshev replaces Donsker; $K=4$–5; $s_gs_m\ll N$ vs $s_g^2+s_m^2\ll N$; median over $S$ splits |
| DML for ATE/ATTE/LATE | [[DML Estimators for ATE and the Interactive Model]] | method / theorem | Orthogonality; Cross-fitting; DR estimation | AIPW score; Thm 5.1 $\sqrt N$-normal, efficient (Hahn bound) under product-rate condition; 401(k) and bonus examples |
| Honest causal trees and forests | [[Honest Trees and Causal Forests]] | method | Potential Outcomes; CIA; Overlap | Leaf difference-in-means; honesty; double-sample and propensity trees; variance-of-$\hat\tau$ splitting; CF vs $k$-NN simulations |
| Generalized random forests | [[Generalized Random Forests - Local Moment Equations]] | method | Causal forests; Orthogonality | Forest weights $\alpha_i(x)$ solve local moment equation; $\Delta$-criterion and gradient tree; quantile, CAPE/causal, IV forests; local centering |
| Forest asymptotics and CIs | [[Asymptotic Normality and Inference for Forests]] | theorem | Causal forests; GRF | W&A Thm 1/11 with $s\asymp n^\beta$, $\beta>\beta_{\min}$; Hájek projection + incrementality; $\hat V_{IJ}$; ATW Thm 5 via pseudo-forest; bootstrap of little bags |
| R-learner | [[R-Learner and Orthogonal CATE Estimation]] | method | PLR note; Orthogonality; Cross-fitting; Metalearners | R-loss from Robinson's transformation; quasi-oracle regret bound (Thm 3); X-learner counterexample; R-stacking |

## Notes

- [[Causal Machine Learning - Overview]] — CONTAINS: two target types (scalar vs function), the common orthogonalize/split/re-use recipe, DML vs GRF vs R-learner comparison table, relevance to marketing measurement (lift, geo experiments, uplift, MMM diagnostics), Pennsylvania bonus and 401(k) headline numbers.
- [[Regularization Bias and the Partially Linear Model]] — CONTAINS: PLR model definition, naive estimator decomposition $a+b$, orthogonalized estimator decomposition $a^*+b^*+c^*$, Robinson partialling-out score, Theorem 4.1 with variance $\sigma^2$, efficiency and sparsity-tightness remarks, Figure 1 simulation, Python cross-fit PLR sketch.
- [[Neyman Orthogonality]] — CONTAINS: Gateaux derivative and Definitions 2.1–2.2 (exact and near-orthogonality), PLR orthogonality check, Neyman's $\mu_0=J_{\theta\beta}J_{\beta\beta}^{-1}$ construction, GMM/concentrating-out/conditional-moment constructions, influence-function adjustment, Assumptions 3.1–3.2 rate conditions, Theorem 3.1 uniform normality, catalogue of orthogonal scores.
- [[Cross-Fitting and Sample Splitting]] — CONTAINS: overfitting-bias example ($N^\epsilon$ blow-up), Chebyshev argument, Donsker failure in high dimension, DML1 and DML2 definitions, Remark 3.1 recommendations, variance estimator and uniform CIs, median/mean aggregation over splits, cross-fitting vs cross-validation, empirical 2-fold vs 5-fold table, pseudocode.
- [[DML Estimators for ATE and the Interactive Model]] — CONTAINS: interactive regression model, AIPW (ATE) and ATTE scores, orthogonality verification, closed-form cross-fit estimator, Assumption 5.1 and Theorem 5.1, rate double-robustness, LATE score and Theorem 5.2 condition, overlap/trimming cautions, 401(k) ATE and LATE tables, Python AIPW sketch.
- [[Honest Trees and Causal Forests]] — CONTAINS: setup (unconfoundedness, overlap), causal tree/forest definitions, honesty definition, Procedure 1 (double-sample) and Procedure 2 (propensity trees), splitting-rule rationale, why honesty removes bias, random-split/$\alpha$-regular/symmetric conditions, simulation Tables 1–3, `grf` usage.
- [[Generalized Random Forests - Local Moment Equations]] — CONTAINS: local moment condition, forest weights, Proposition 1 $\Delta$-criterion, gradient tree labeling/regression steps, Algorithm 1, quantile forests vs Meinshausen, CAPE/causal forest estimator and pseudo-outcomes, local centering, instrumental forest and Angrist–Evans application, Table 1 MSE comparison, `grf` usage.
- [[Asymptotic Normality and Inference for Forests]] — CONTAINS: forest as U-statistic, Theorems 1 and 11, $\beta_{\min}$ formula and worked values, leaf-diameter and bias bounds, Hájek projection and $\nu$-incrementality, $k$-PNN predictors, Lemma 7/Theorems 8–9, infinitesimal jackknife formula, GRF pseudo-forest coupling and Theorem 5, delta-method variance, bootstrap of little bags, scope caveats.
- [[R-Learner and Orthogonal CATE Estimation]] — CONTAINS: Robinson's transformation, two-step R-learner algorithm, weighted-regression implementation trick, U-learner instability, quasi-oracle Theorem 3 with RKHS assumptions, X-learner counterexample, R-stacking, relation to centered causal forests, voting-study and simulation results, Python sketch.

## External / Cross-Folder Links

- [[Potential Outcomes Framework]], [[Causal Estimands]], [[Conditional Independence Assumption]], [[Common Support and Overlap]] — identification assumptions maintained throughout.
- [[Frequentist Causal Estimation]], [[Doubly-Robust Estimands for ATT(g,t)]] — doubly-robust estimation, which DML generalizes and justifies with ML nuisances.
- [[Metalearners for CATE]], [[S-Learner]], [[T-Learner and Minimax Rate]], [[X-Learner]], [[Künzel 2019 - Overview]] — the existing CATE metalearner cluster.
- [[Nonparametric Causal Inference]] — BART, the Bayesian tree-ensemble counterpart.
- [[Propensity Score Matching - Overview]], [[Propensity Score and the Balancing Property]], [[Matching Methods and Distance Measures]] — propensity-score and matching methods.
- [[Instrumental Variables]], [[Local Average Treatment Effects]], [[GMM Estimation and Instruments for Price Endogeneity]] — IV and moment-condition estimation.
- [[Quantile Regression]] — parametric counterpart of quantile forests.
- [[Omitted Variables Bias]], [[Table 2 Fallacy]], [[Horseshoe and Regularized Horseshoe Priors]] — regularization and nuisance-coefficient interpretation.
- [[Geo-Experiment Methodology - Overview]], [[Bayesian Media Mix Modeling - Overview]] — applied marketing-measurement contexts.

## Sources

- [[raw/Chernozhukov 2018 - Double Debiased Machine Learning.pdf]] — Chernozhukov, V., Chetverikov, D., Demirer, M., Duflo, E., Hansen, C., Newey, W. & Robins, J. (2018), "Double/Debiased Machine Learning for Treatment and Structural Parameters," *The Econometrics Journal* 21(1). arXiv:1608.00060.
- [[raw/Wager Athey 2018 - Heterogeneous Treatment Effects using Random Forests.pdf]] — Wager, S. & Athey, S. (2018), "Estimation and Inference of Heterogeneous Treatment Effects using Random Forests," *Journal of the American Statistical Association* 113(523). arXiv:1510.04342.
- [[raw/Athey Tibshirani Wager 2019 - Generalized Random Forests.pdf]] — Athey, S., Tibshirani, J. & Wager, S. (2019), "Generalized Random Forests," *Annals of Statistics* 47(2). arXiv:1610.01271.
- [[raw/Nie Wager 2021 - Quasi-Oracle Estimation of Heterogeneous Treatment Effects.pdf]] — Nie, X. & Wager, S. (2021), "Quasi-Oracle Estimation of Heterogeneous Treatment Effects," *Biometrika* 108(2). arXiv:1712.04912.
