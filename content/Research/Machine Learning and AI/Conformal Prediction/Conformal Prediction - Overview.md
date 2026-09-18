---
title: Conformal Prediction - Overview
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - type/overview
  - doc/paper
source: "[[raw/Angelopoulos Bates 2021 - Gentle Introduction to Conformal Prediction.pdf]]"
source_location: "Sec. 1 (pp. 4-6), Sec. 4 (pp. 16-22), Sec. 6-7 (pp. 27-29), App. D (pp. 50-51)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Quantile Regression]]"
used_by:
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Conformity Scores and Adaptive Prediction Sets]]"
  - "[[Conformalized Quantile Regression]]"
  - "[[Marginal vs Conditional Coverage]]"
  - "[[Conformal Prediction Under Covariate Shift]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
aliases:
  - Conformal Inference
  - Conformal Prediction
  - Distribution-Free Uncertainty Quantification
  - Distribution-Free Predictive Inference
---

# Conformal Prediction - Overview

> [!summary]
> **Conformal prediction** (a.k.a. conformal inference) wraps *any* fitted predictor $\hat f$ — a neural net, a gradient-boosted forest, a Bayesian posterior predictive — and converts its heuristic notion of uncertainty into a **prediction set** $\mathcal C(X_{\text{test}})$ with a finite-sample, distribution-free guarantee $\mathbb P(Y_{\text{test}} \in \mathcal C(X_{\text{test}})) \ge 1-\alpha$. The only assumption is **exchangeability** of calibration and test points; no model has to be correct and no asymptotics are invoked. The cluster is anchored on Angelopoulos & Bates (2021), with Romano, Patterson & Candès (2019) for [[Conformalized Quantile Regression|CQR]], Tibshirani, Barber, Candès & Ramdas (2019) for [[Conformal Prediction Under Covariate Shift|weighted conformal prediction under covariate shift]], and Lei & Candès (2020) for the [[Conformal Inference for Counterfactuals and ITEs|causal bridge to counterfactuals and ITEs]].

## Overview

Angelopoulos & Bates frame conformal prediction as a machine that takes "any heuristic notion of uncertainty from any model and converts it to a rigorous one" (Sec. 1.1). The procedure needs three ingredients: a pre-trained model $\hat f$, a **score function** $s(x,y)\in\mathbb R$ where larger means worse agreement between $x$ and $y$, and $n$ fresh calibration pairs unseen during training. The recipe (Sec. 1.1, p. 5):

1. Identify a heuristic notion of uncertainty from the pre-trained model.
2. Define the score function $s(x,y)$.
3. Compute $\hat q$ as the $\lceil (n+1)(1-\alpha)\rceil / n$ empirical quantile of the calibration scores $s_i = s(X_i, Y_i)$.
4. Output $\mathcal C(X_{\text{test}}) = \{y : s(X_{\text{test}}, y) \le \hat q\}$.

This is **split** (inductive) conformal prediction, the variant used almost everywhere in practice; its guarantee and proof are in [[Split Conformal Prediction and the Coverage Guarantee]]. Because validity holds for *any* score, the score determines only the **usefulness** (size, adaptivity) of the sets — never their validity. Designing scores is therefore the main engineering decision; see [[Conformity Scores and Adaptive Prediction Sets]] and [[Conformalized Quantile Regression]].

The guarantee is **marginal**: it averages over the calibration data and the test point. It does *not* say that coverage is $1-\alpha$ for a particular $x$; that stronger *conditional* property is provably impossible without assumptions. [[Marginal vs Conditional Coverage]] covers the distinction, the impossibility result, diagnostics (FSC/SSC metrics) and partial fixes (group-balanced and class-conditional conformal).

When test covariates come from a different distribution than the calibration covariates, exchangeability fails but can be restored by likelihood-ratio reweighting — see [[Conformal Prediction Under Covariate Shift]]. That single idea is what lets Lei & Candès treat the missing potential outcome as a covariate-shift prediction problem with propensity-score weights: [[Conformal Inference for Counterfactuals and ITEs]].

## Main Content

> [!definition] Prediction set and marginal coverage ^def-marginal-coverage
> Given calibration data $(X_1,Y_1),\dots,(X_n,Y_n)$ and a fresh test point $(X_{\text{test}},Y_{\text{test}})$ from the same distribution, a set-valued function $\mathcal C$ is **valid** at level $\alpha$ if
>
> $$
> 1-\alpha \;\le\; \mathbb P\big(Y_{\text{test}} \in \mathcal C(X_{\text{test}})\big) \;\le\; 1-\alpha+\frac{1}{n+1}.
> $$
>
> The probability is over the randomness in *both* the calibration points and the test point (A&B Eq. 1). The upper bound requires continuous scores (no ties).

> [!definition] Distribution-free ^def-distribution-free
> In the sense of A&B Sec. 7, a method is distribution-free if it is (1) agnostic to the model, (2) agnostic to the data distribution, and (3) valid in finite samples. Permutation tests, quantile regression, rank tests and the bootstrap have a claim to the term only in weaker or asymptotic senses.

> [!theorem] Conformal coverage guarantee (Vovk, Gammerman & Saunders; A&B Theorem 1) ^thm-conformal-coverage
> Suppose $(X_i,Y_i)_{i=1,\dots,n}$ and $(X_{\text{test}},Y_{\text{test}})$ are i.i.d. (exchangeable suffices). With $\hat q$ and $\mathcal C$ defined as in steps 3–4 above,
>
> $$
> \mathbb P\big(Y_{\text{test}} \in \mathcal C(X_{\text{test}})\big) \ge 1-\alpha .
> $$

### The family of conformal methods

| Variant | Model fits | Data use | Where |
|---|---|---|---|
| Split / inductive conformal | 1 | separate train and calibration folds | [[Split Conformal Prediction and the Coverage Guarantee]] |
| Full / transductive conformal | $(n+1)\cdot\lvert\mathcal Y\rvert$ | all data for fitting and calibration | A&B Sec. 6.1, below |
| Cross-conformal, CV+, jackknife+ | $K$ or $n$ | all data, intermediate cost | A&B Sec. 6.2 (pointer only) |
| Weighted conformal | 1 (split) | calibration scores reweighted by $d\tilde P_X/dP_X$ | [[Conformal Prediction Under Covariate Shift]] |

> [!definition] Full conformal prediction ^def-full-conformal
> For exchangeable $(X_1,Y_1),\dots,(X_{n+1},Y_{n+1})$ and each candidate $y\in\mathcal Y$: fit a **permutation-invariant** model $\hat f^{\,y}$ on the augmented data $(X_1,Y_1),\dots,(X_n,Y_n),(X_{n+1},y)$; compute $s_i^y = s(X_i,Y_i,\hat f^{\,y})$ and $s_{n+1}^y = s(X_{n+1},y,\hat f^{\,y})$; let $\hat q^{\,y}$ be the $\lceil(n+1)(1-\alpha)\rceil/n$ quantile of $s^y_1,\dots,s^y_n$. Then
>
> $$
> \mathcal C(X_{n+1}) = \{y : s^y_{n+1} \le \hat q^{\,y}\}
> $$
>
> satisfies $\mathbb P(Y_{n+1}\in\mathcal C(X_{n+1}))\ge 1-\alpha$ (A&B Theorem 5). Historically this came first; split conformal was later recognised as a special case in which the model is frozen.

**Conformal prediction is a permutation test, inverted.** A&B (Sec. 6.1, p. 28) note that $s^y_{n+1}\le\hat q^{\,y}$ is exactly the acceptance region of a level-$\alpha$ permutation test of exchangeability between the hypothesised point $(X_{n+1},y)$ and the data. The prediction set is the set of $y$ values the test fails to reject. This is the same logical move as inverting a [[Fisher Randomization Test and the Sharp Null|Fisher randomization test]] to obtain a confidence set, and explains why exchangeability — the working assumption of [[Permutation Tests and Exact Inference]] — is the *only* assumption needed.

### Extensions catalogued by Angelopoulos & Bates (Sec. 4)

- **Group-balanced** and **class-conditional** conformal (Secs. 4.1–4.2): calibrate separately per group or per true class → [[Marginal vs Conditional Coverage]].
- **Conformal risk control** (Sec. 4.3, Theorem 2): for any bounded loss $\ell(\mathcal C_\lambda(x),y)\le B$ monotone non-increasing in $\lambda$, choose $\hat\lambda=\inf\{\lambda:\hat R(\lambda)\le\alpha-(B-\alpha)/n\}$; then $\mathbb E[\ell(\mathcal C_{\hat\lambda}(X_{\text{test}}),Y_{\text{test}})]\le\alpha$. Miscoverage is the special case $\ell=\mathbf 1\{Y\notin\mathcal C\}$. With $B=1$, $\alpha=0.1$, $n=1000$ the empirical risk target is $0.0991$ rather than $0.1$.
- **Outlier detection** (Sec. 4.4): score only $x$; flag outlier if $s(x)>\hat q$; false-positive rate $\le\alpha$ on clean data. Equivalent to a conformal $p$-value below $\alpha$.
- **Covariate shift** (Sec. 4.5) → [[Conformal Prediction Under Covariate Shift]].
- **Distribution drift** (Sec. 4.6): down-weight old calibration scores; see the theorem below.

> [!theorem] Coverage under distribution drift (Barber et al.; A&B Theorem 4) ^thm-drift
> Let the calibration points be drawn independently from possibly different distributions, fix weights $w_i\in[0,1]$, normalise $\tilde w_i=w_i/(w_1+\dots+w_n+1)$, take $\hat q=\inf\{q:\sum_i\tilde w_i\mathbf 1\{s_i\le q\}\ge1-\alpha\}$, and let $\epsilon_i=d_{\mathrm{TV}}\big((X_i,Y_i),(X_{\text{test}},Y_{\text{test}})\big)$. Then
>
> $$
> \mathbb P\big(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\big)\;\ge\;1-\alpha-2\sum_{i=1}^n\tilde w_i\,\epsilon_i .
> $$
>
> Practical schedules: a rolling window $w_i=\mathbf 1\{i\ge n-K\}$ or exponential decay $w_i=0.99^{\,n-i+1}$. With $\epsilon_i=0$ there is no coverage loss for any weights. The price is a smaller effective sample size and hence more variable realised coverage. This is the honest route for time-series data, where exchangeability is false.

> [!note] Relevance to marketing measurement and applied work
> - **Black-box response models.** Any ML demand or conversion model (boosted trees, neural nets) can be given valid predictive intervals with a held-out calibration fold and ~10 lines of code, without trusting the model's own variance estimates.
> - **MMM and time series.** Weekly MMM data are *not* exchangeable, so vanilla split conformal is not justified for forecasts from a [[Bayesian Media Mix Modeling - Overview|Bayesian MMM]] or a [[Bayesian Structural Time-Series Model]]. The drift-weighted version above gives a quantified coverage loss rather than a guarantee. Conformal intervals complement — they do not replace — posterior predictive intervals checked with [[Posterior Predictive Checking]] and [[Cross Validation Checking]].
> - **Bayes + conformal.** Using the posterior predictive density as the score ("conformalizing Bayes", A&B Sec. 2.4) keeps the Bayesian model's shape information while making coverage robust to misspecification.
> - **Geo experiments and counterfactuals.** Predicting the untreated outcome of treated geos is a counterfactual prediction problem; placebo/permutation inference in [[Synthetic Control Inference and Diagnostics]] is a close cousin of the conformal construction, and [[Conformal Inference for Counterfactuals and ITEs]] makes the link formal under ignorability.
> - **Uplift / targeting.** ITE intervals allow "treat only if the lower bound is positive" rules with controlled error, in contrast to CATE point estimates from [[Metalearners for CATE]].

## Examples

A complete split-conformal classifier in the style of A&B Figure 2 (softmax score $s(x,y)=1-\hat f(x)_y$):

```python
import numpy as np

def conformal_sets(cal_probs, cal_labels, test_probs, alpha=0.1):
    n = len(cal_labels)
    scores = 1.0 - cal_probs[np.arange(n), cal_labels]      # 1: conformal scores
    q_level = np.ceil((n + 1) * (1 - alpha)) / n            # 2: finite-sample corrected level
    qhat = np.quantile(scores, q_level, method="higher")
    return test_probs >= (1.0 - qhat)                       # 3: boolean matrix = prediction sets
```

With $n\approx500$ calibration images and $\alpha=0.1$, at least 90% of true-class softmax outputs on future data lie above $1-\hat q$, so collecting every class above that threshold covers the truth with probability $\ge 0.9$ — whether or not the softmax probabilities are calibrated. A&B Figure 1 shows the resulting ImageNet sets growing as the `fox squirrel` images become progressively harder.

## Connections

- [[Split Conformal Prediction and the Coverage Guarantee]] — the algorithm, the exchangeability proof, the Beta law of realised coverage, and calibration-set sizing.
- [[Conformity Scores and Adaptive Prediction Sets]] — APS for classification, scaled residuals, conformalized Bayes.
- [[Conformalized Quantile Regression]] — the recommended regression score; adapts to heteroscedasticity.
- [[Marginal vs Conditional Coverage]] — what the guarantee does *not* promise, and how to diagnose it.
- [[Conformal Prediction Under Covariate Shift]] — weighted exchangeability and likelihood-ratio weights.
- [[Conformal Inference for Counterfactuals and ITEs]] — propensity-weighted conformal intervals for potential outcomes.
- [[Permutation Tests and Exact Inference]] and [[Randomization Inference - Overview]] — the same exchangeability/permutation logic used for finite-sample exact testing.
- [[Quantile Regression]] — the classical base learner that CQR conformalizes.

## See Also

- [[Simulation-Based Calibration - Overview]] — a different meaning of "calibration": SBC checks that a Bayesian *inference algorithm* recovers the posterior; conformal calibrates *predictive sets* against held-out outcomes.
- [[Posterior Predictive Checking]] and [[Cross Validation Checking]] — model-based predictive checks that conformal methods can sit alongside.
- [[Stacking and Predictive Model Averaging]] — improving the base predictor, which shrinks conformal sets without affecting validity.
- [[Uncertainty Calibration for Linear Solvers]] — calibration of uncertainty in probabilistic numerics.
- [[Multiple Testing Corrections]] — relevant to conformal $p$-values for outlier detection and to Learn-then-Test (A&B App. A).
- [[Time-Series Foundation Models (Chronos)]] — conformal calibration of zero-shot forecasts
