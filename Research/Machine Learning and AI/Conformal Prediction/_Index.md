---
title: Conformal Prediction - Index
tags:
  - type/index
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
parent: "[[Machine Learning and AI/_Index|Machine Learning and AI]]"
---

# Conformal Prediction - Index

> [!abstract] Routing Summary
> Distribution-free, finite-sample uncertainty quantification for black-box predictors. Anchored by Angelopoulos & Bates (2021), "A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification", with Romano, Patterson & Candès (2019) on conformalized quantile regression, Tibshirani, Barber, Candès & Ramdas (2019) on covariate shift, and Lei & Candès (2020) on counterfactuals and individual treatment effects.
>
> - Need the big picture, the four-step recipe, full vs split conformal, or the extensions map? → [[Conformal Prediction - Overview]]
> - Need the algorithm, the exchangeability proof, or how many calibration points to use? → [[Split Conformal Prediction and the Coverage Guarantee]]
> - Need to choose a score (softmax, APS, scaled residuals, posterior predictive density)? → [[Conformity Scores and Adaptive Prediction Sets]]
> - Need heteroscedasticity-adaptive regression intervals? → [[Conformalized Quantile Regression]]
> - Need to know what the guarantee does *not* promise, or per-group / per-class coverage? → [[Marginal vs Conditional Coverage]]
> - Deployment population differs from calibration population? → [[Conformal Prediction Under Covariate Shift]]
> - Need intervals for potential outcomes or individual treatment effects? → [[Conformal Inference for Counterfactuals and ITEs]]
> - Time series or drifting data? → [[Conformal Prediction - Overview#^thm-drift|drift-weighted bound]]
> - Need a quick diagnostic for an implementation? → [[Split Conformal Prediction and the Coverage Guarantee#^thm-beta-coverage|Beta law of realised coverage]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Conformal framework | [[Conformal Prediction - Overview]] | overview | Permutation tests; Quantile Regression | Any model + any score + exchangeable calibration data ⟹ $\mathbb P(Y\in\mathcal C(X))\ge1-\alpha$; sets are inverted permutation tests |
| Split conformal and guarantee | [[Split Conformal Prediction and the Coverage Guarantee]] | method | Overview | $\hat q=\lceil(n+1)(1-\alpha)\rceil$-th score; coverage in $[1-\alpha,\,1-\alpha+\tfrac1{n+1}]$; realised coverage $\sim\mathrm{Beta}(n+1-l,l)$ |
| Score design | [[Conformity Scores and Adaptive Prediction Sets]] | concept | Split conformal | Score fixes usefulness, not validity; APS cumulative-mass score; $\hat f\pm u(x)\hat q$; conformalized Bayes |
| CQR | [[Conformalized Quantile Regression]] | method | Split conformal; Scores; Quantile Regression | $E_i=\max\{\hat q_{lo}-Y_i,Y_i-\hat q_{hi}\}$; avg length 1.40 vs 1.81 (local) vs 2.16+ (split) at 90% |
| Coverage notions | [[Marginal vs Conditional Coverage]] | concept | Split conformal; Scores | Distribution-free conditional coverage ⟹ infinite length; FSC/SSC metrics; group-balanced and class-conditional calibration |
| Weighted conformal | [[Conformal Prediction Under Covariate Shift]] | method | Split conformal; Coverage notions | Weights $w=d\tilde P_X/dP_X$ restore coverage; weighted exchangeability; airfoil 82.2% → 90.8% |
| Causal bridge | [[Conformal Inference for Counterfactuals and ITEs]] | application | Weighted conformal; CQR; Potential Outcomes; Propensity score | Counterfactual = covariate shift with $w\propto1/e(x)$; exact in RCTs; doubly robust in observational studies |

## Notes

- [[Conformal Prediction - Overview]] — CONTAINS: marginal-coverage definition, distribution-free definition, four-step recipe, Theorem 1, split/full/cross-conformal comparison table, full conformal definition and Theorem 5, permutation-test interpretation, conformal risk control (Theorem 2), outlier detection, distribution-drift bound (Theorem 4) with rolling/decay weights, relevance to marketing measurement, softmax-score code.
- [[Split Conformal Prediction and the Coverage Guarantee]] — CONTAINS: split conformal algorithm, $\delta_\infty$ formulation, quantile lemma with proof sketch, coverage theorem (lower and upper bounds) and A&B three-line proof, assumptions checklist, Beta law of training-conditional coverage, calibration-size table ($n(\epsilon)$), beta-binomial coverage check with mean/variance formulas, 9-point worked example, score-caching code.
- [[Conformity Scores and Adaptive Prediction Sets]] — CONTAINS: softmax-threshold score, APS score and set, scaled-residual score with list of uncertainty scalars, locally adaptive conformal and its training-residual bias, conformalized Bayes (posterior predictive density score, Hoff optimality), score-selection table, adaptivity evaluation, APS code, worked softmax contrast.
- [[Conformalized Quantile Regression]] — CONTAINS: conditional quantile and oracle interval, pinball loss, Algorithm 1 (split CQR), signed-score interpretation, Theorem 1 with proof, asymmetric Theorem 2, practical tuning advice (nominal quantile tuning, shared network, quantile crossing, ties), Table 1 results across 11 datasets, sklearn code, sales-forecast sketch.
- [[Marginal vs Conditional Coverage]] — CONTAINS: four coverage notions table, conditional coverage definition, impossibility theorem (Vovk; Lei & Wasserman), FSC and SSC metrics, group-balanced and class-conditional algorithms (Propositions 1–2), kernel-localised relaxation, asymptotic conditional coverage via CQR (Lei & Candès Eq. 3.6), stratified-coverage code, retail/wholesale worked numbers.
- [[Conformal Prediction Under Covariate Shift]] — CONTAINS: covariate shift model, weighted probabilities $p_i^w(x)$, Corollary 1, weighted split algorithm, weighted exchangeability (Definition 1, Lemmas 2–3, Theorem 2), classifier-odds weight estimation, effective sample size, airfoil experiment table, discussion extensions (graphical shift, missing covariates, local coverage), hand-worked weighted quantile, NumPy code.
- [[Conformal Inference for Counterfactuals and ITEs]] — CONTAINS: ITE vs CATE motivation, coverage targets (ATE/ATT/ATC/general), counterfactual-as-covariate-shift derivation, weight table, weighted split-CQR (Algorithm 1), Proposition 1 (finite-sample and weight-error bounds), exactness for randomized experiments, double-robustness Theorem 1 (A1/A2), naive and nested ITE procedures (Algorithms 2–3, Theorem 2), simulation and NLSM findings vs Causal Forest / X-learner / BART, geo-experiment code sketch.

## External / Cross-Folder Links

- [[Permutation Tests and Exact Inference]], [[Fisher Randomization Test and the Sharp Null]], [[Randomization Inference - Overview]] — the exchangeability / permutation logic that conformal prediction inverts.
- [[Quantile Regression]] — classical quantile regression, the base learner for CQR.
- [[Potential Outcomes Framework]], [[Causal Estimands]] — setup and targets for counterfactual intervals.
- [[Propensity Score and the Balancing Property]], [[Bayesian Inverse Probability Weighting]], [[Bayesian Inverse Probability Weighting]], [[Common Support and Overlap]], [[Covariate Balance Diagnostics]] — the likelihood-ratio weights used by weighted conformal prediction.
- [[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]] — CATE estimators whose intervals are benchmarked against conformal ITE intervals.
- [[Posterior Predictive Checking]], [[Cross Validation Checking]], [[Simulation-Based Calibration - Overview]], [[Stacking and Predictive Model Averaging]] — Bayesian predictive checking and calibration, for contrast and combination.
- [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Structural Time-Series Model]], [[Synthetic Control Inference and Diagnostics]], [[Geo-Experiment Design and Power Analysis]] — applied settings in marketing measurement.

## Sources

- [[raw/Angelopoulos Bates 2021 - Gentle Introduction to Conformal Prediction.pdf]] — Angelopoulos, A. N. & Bates, S. (2021, v6 Dec. 2022), "A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification," arXiv:2107.07511.
- [[raw/Romano Patterson Candes 2019 - Conformalized Quantile Regression.pdf]] — Romano, Y., Patterson, E. & Candès, E. J. (2019), "Conformalized Quantile Regression," NeurIPS 2019, arXiv:1905.03222.
- [[raw/Tibshirani et al 2019 - Conformal Prediction Under Covariate Shift.pdf]] — Tibshirani, R. J., Barber, R. F., Candès, E. J. & Ramdas, A. (2019), "Conformal Prediction Under Covariate Shift," NeurIPS 2019, arXiv:1904.06019.
- [[raw/Lei Candes 2020 - Conformal Inference of Counterfactuals and ITEs.pdf]] — Lei, L. & Candès, E. J. (2021), "Conformal Inference of Counterfactuals and Individual Treatment Effects," *Journal of the Royal Statistical Society: Series B*, arXiv:2006.06138.
