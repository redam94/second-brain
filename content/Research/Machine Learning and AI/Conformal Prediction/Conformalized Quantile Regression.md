---
title: Conformalized Quantile Regression
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - topic/regression
  - type/method
  - doc/paper
source: "[[raw/Romano Patterson Candes 2019 - Conformalized Quantile Regression.pdf]]"
source_location: "Sec. 1-4 (pp. 1-7), Sec. 5 (pp. 7-8), Sec. 6 and Table 1 (pp. 8-11), App. A; Angelopoulos & Bates 2021 Sec. 2.2 (pp. 8-9)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Conformity Scores and Adaptive Prediction Sets]]"
  - "[[Quantile Regression]]"
used_by:
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Marginal vs Conditional Coverage]]"
  - "[[Conformal Prediction - Overview]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
aliases:
  - CQR
  - Conformal Quantile Regression
  - Split CQR
---

# Conformalized Quantile Regression

> [!summary]
> **CQR** (Romano, Patterson & Candès, NeurIPS 2019) fits lower and upper conditional quantile functions $\hat q_{\alpha_{lo}},\hat q_{\alpha_{hi}}$ on a training fold, then uses a calibration fold to compute a single additive correction $Q_{1-\alpha}(E,\mathcal I_2)$ that widens (or *narrows*) the plug-in band so that $\mathbb P\{Y_{n+1}\in C(X_{n+1})\}\ge1-\alpha$ in finite samples for any distribution and any quantile learner. It inherits adaptivity to **heteroscedasticity** from quantile regression and distribution-free validity from conformal prediction. Across 11 benchmark datasets CQR intervals averaged length $1.40$–$1.41$ versus $1.81$–$1.82$ for locally adaptive conformal and $2.16$–$3.06$ for standard split conformal, all at ~90% coverage.

## Overview

Two desiderata for a prediction interval (Sec. 1): (i) valid coverage in finite samples without strong distributional assumptions; (ii) intervals as short as possible *at each point* of the input space, which under heteroscedasticity means lengths that track local variability.

- **Standard split conformal** with absolute residuals satisfies (i) but gives $C(x)=\hat\mu(x)\pm Q_{1-\alpha}(R,\mathcal I_2)$, of *fixed* length $2Q_{1-\alpha}(R,\mathcal I_2)$ independent of $x$. Lei et al. observe that full conformal bands also vary only slightly when the regression algorithm is moderately stable.
- **Plain [[Quantile Regression|quantile regression]]** satisfies (ii): estimate the 5% and 95% conditional quantiles and report $[\hat q_{0.05}(x),\hat q_{0.95}(x)]$. But validity "is guaranteed only for specific models, under certain regularity and asymptotic conditions", and the authors' experiments show quantile neural networks can substantially under-cover.

CQR conformalizes the quantile band. Where the econometric treatment in [[Quantile Regression]] (Koenker–Bassett) targets *inference on coefficients* of a linear quantile model, CQR is agnostic about the learner — quantile random forests, quantile neural nets, gradient boosting with pinball loss — and targets *predictive coverage*.

## Main Content

> [!definition] Conditional quantile function and oracle interval ^def-cond-quantile
> With $F(y\mid X=x)=\mathbb P\{Y\le y\mid X=x\}$, the $\alpha$-th conditional quantile is $q_\alpha(x)=\inf\{y\in\mathbb R:F(y\mid X=x)\ge\alpha\}$. For $\alpha_{lo}=\alpha/2$, $\alpha_{hi}=1-\alpha/2$, the oracle interval $C(x)=[q_{\alpha_{lo}}(x),q_{\alpha_{hi}}(x)]$ satisfies **conditional** coverage $\mathbb P\{Y\in C(X)\mid X=x\}\ge1-\alpha$, and its length adapts to $x$.

> [!definition] Pinball (check) loss ^def-pinball
> Quantile regression solves $\hat\theta=\arg\min_\theta\tfrac1n\sum_i\rho_\alpha(Y_i,f(X_i;\theta))+\mathcal R(\theta)$ with
>
> $$
> \rho_\alpha(y,\hat y)=\begin{cases}\alpha\,(y-\hat y) & y-\hat y>0,\\ (1-\alpha)(\hat y-y) & \text{otherwise.}\end{cases}
> $$
>
> At $\alpha=0.5$ this is half the absolute error and targets the conditional median. Any learner can be converted to a quantile learner by swapping MSE for the pinball loss (A&B Sec. 2.2).

> [!algorithm] Split conformal quantile regression (Romano et al., Algorithm 1) ^alg-cqr
> **Input:** data $(X_i,Y_i)_{i=1}^n$, level $\alpha\in(0,1)$, quantile regression algorithm $\mathcal A$.
> 1. Randomly split $\{1,\dots,n\}$ into disjoint $\mathcal I_1$ (proper training) and $\mathcal I_2$ (calibration).
> 2. Fit $\{\hat q_{\alpha_{lo}},\hat q_{\alpha_{hi}}\}\leftarrow\mathcal A(\{(X_i,Y_i):i\in\mathcal I_1\})$.
> 3. For $i\in\mathcal I_2$ compute the conformity score
>
> $$
> E_i=\max\{\hat q_{\alpha_{lo}}(X_i)-Y_i,\;Y_i-\hat q_{\alpha_{hi}}(X_i)\}.
> $$
>
> 4. Let $Q_{1-\alpha}(E,\mathcal I_2)$ be the $(1-\alpha)(1+1/\lvert\mathcal I_2\rvert)$-th empirical quantile of $\{E_i\}$.
> 5. **Output:** $C(x)=\big[\hat q_{\alpha_{lo}}(x)-Q_{1-\alpha}(E,\mathcal I_2),\;\hat q_{\alpha_{hi}}(x)+Q_{1-\alpha}(E,\mathcal I_2)\big]$.

**Reading the score.** $E_i$ is a *signed* distance to the nearest band edge. If $Y_i$ is below the lower estimate, $E_i=\lvert Y_i-\hat q_{\alpha_{lo}}(X_i)\rvert>0$; if above the upper, $E_i=\lvert Y_i-\hat q_{\alpha_{hi}}(X_i)\rvert>0$; if inside, $E_i\le0$ is the (negative) distance to the closer edge. The score therefore "accounts for both undercoverage and overcoverage": when the plug-in band is too wide, most $E_i$ are negative, $Q_{1-\alpha}<0$, and conformalization **shrinks** the band. This is one reason CQR beats un-conformalized quantile forests in the experiments despite using half the data for training.

> [!theorem] CQR coverage (Romano et al., Theorem 1) ^thm-cqr
> If $(X_i,Y_i)$, $i=1,\dots,n+1$, are exchangeable, then the split-CQR interval satisfies
>
> $$
> \mathbb P\{Y_{n+1}\in C(X_{n+1})\}\ge1-\alpha .
> $$
>
> If moreover the scores $E_i$ are almost surely distinct,
>
> $$
> \mathbb P\{Y_{n+1}\in C(X_{n+1})\}\le1-\alpha+\frac{1}{\lvert\mathcal I_2\rvert+1}.
> $$

*Proof.* $Y_{n+1}\in C(X_{n+1})\iff E_{n+1}\le Q_{1-\alpha}(E,\mathcal I_2)$. Conditional on the proper training set the scores $\{E_i\}_{i\in\mathcal I_2}\cup\{E_{n+1}\}$ are exchangeable, so the inflated-quantile lemma ([[Split Conformal Prediction and the Coverage Guarantee#^thm-quantile-lemma|quantile lemma]]) gives both bounds; take expectations over $\mathcal I_1$.

> [!theorem] Asymmetric (two-tailed) CQR (Romano et al., Theorem 2) ^thm-cqr-asym
> Calibrate the tails separately: let $Q_{1-\alpha_{lo}}(E_{lo},\mathcal I_2)$ be the $(1-\alpha_{lo})$-th empirical quantile of $\{\hat q_{\alpha_{lo}}(X_i)-Y_i\}$ and $Q_{1-\alpha_{hi}}(E_{hi},\mathcal I_2)$ that of $\{Y_i-\hat q_{\alpha_{hi}}(X_i)\}$, and set $C(X_{n+1})=[\hat q_{\alpha_{lo}}(X_{n+1})-Q_{1-\alpha_{lo}},\;\hat q_{\alpha_{hi}}(X_{n+1})+Q_{1-\alpha_{hi}}]$. Under exchangeability each one-sided bound holds with probability $\ge1-\alpha_{lo}$ and $\ge1-\alpha_{hi}$ respectively, hence $\mathbb P\{Y_{n+1}\in C(X_{n+1})\}\ge1-\alpha$ for $\alpha=\alpha_{lo}+\alpha_{hi}$.

The symmetric version lets miscoverage be "spread arbitrarily over the left and right tails"; the asymmetric version controls each tail, at the price of longer intervals (average length $1.40\to1.58$ for CQR neural nets, $1.41\to1.57$ for CQR random forests).

### Practical guidance from the paper (Sec. 4, 6.2)

1. **Tune the nominal quantiles.** Quantile forests are often too conservative, quantile nets occasionally so. Treat $(\alpha_{lo},\alpha_{hi})$ of the base learner as hyper-parameters chosen by cross-validation to minimise average interval length; "this tuning does not invalidate the coverage guarantee". In the experiments CQR selected quantiles *below* the nominal level.
2. **Share parameters.** Use one network with a two-dimensional output for the lower and upper quantiles instead of two networks.
3. **Quantile crossing** ($\hat q_{lo}(x)>\hat q_{hi}(x)$) is rare for 5%/95% but can affect neural nets; a rearrangement post-processing step reduced CQR-NN length from $1.40$ to $1.35$.
4. **Ties** break the upper bound only: CQR random forests were over-conservative on the two Facebook datasets because of ties among scores.
5. A full-conformal (no-split) variant exists (footnote 2).

### Empirical results (Table 1; $\alpha=0.1$; 11 datasets $\times$ 20 splits = 2,200 experiments)

| Method | Avg. length | Avg. coverage (%) |
|---|---|---|
| Ridge (split conformal) | 3.06 | 90.03 |
| Ridge Local | 2.94 | 90.13 |
| Random Forests | 2.24 | 89.99 |
| Random Forests Local | 1.82 | 89.95 |
| Neural Net | 2.16 | 89.92 |
| Neural Net Local | 1.81 | 89.95 |
| **CQR Random Forests** | **1.41** | 90.33 |
| **CQR Neural Net** | **1.40** | 90.05 |
| Quantile Random Forests (no guarantee) | 2.23 | 92.62 |
| Quantile Neural Net (no guarantee) | 1.49 | 88.51 |

Responses were rescaled by their mean absolute value; 80/20 train-test, with the training portion halved into $\mathcal I_1,\mathcal I_2$. Every conformal method attains ~90%; un-conformalized quantile nets under-cover (88.5%) and quantile forests over-cover (92.6%). CQR was shortest on 10 of 11 datasets. On the simulated heteroscedastic-with-outliers example (Figure 2): split 2.91, locally adaptive 2.86, CQR 1.99 average length.

Why locally adaptive conformal loses is discussed in [[Conformity Scores and Adaptive Prediction Sets]]: its $\hat\sigma(x)$ is trained on optimistically biased training residuals.

## Examples

```python
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor as GBR

def cqr(X_tr, y_tr, X_cal, y_cal, X_new, alpha=0.1):
    lo = GBR(loss="quantile", alpha=alpha / 2).fit(X_tr, y_tr)
    hi = GBR(loss="quantile", alpha=1 - alpha / 2).fit(X_tr, y_tr)
    E = np.maximum(lo.predict(X_cal) - y_cal, y_cal - hi.predict(X_cal))   # signed scores
    n = len(y_cal)
    Q = np.quantile(E, min(1.0, (1 - alpha) * (1 + 1 / n)), method="higher")
    return lo.predict(X_new) - Q, hi.predict(X_new) + Q                    # Q may be negative
```

**Applied sketch.** Weekly store-level sales forecasting with promotional covariates: variance scales with store size and spikes in promo weeks. A constant-width split-conformal band is too wide for small stores and too narrow for promo weeks of large ones, although it is 90% valid *on average*. CQR's band widens where the fitted quantiles diverge. Two cautions: (a) stores-within-week may be treated as exchangeable, weeks-within-store generally not (see the drift result in [[Conformal Prediction - Overview]]); (b) if the scoring population differs from the calibration population, use the weighted variant in [[Conformal Prediction Under Covariate Shift]].

## Connections

- [[Quantile Regression]] — the classical estimator (check loss, QTEs) that CQR wraps; CQR supplies the finite-sample predictive guarantee the asymptotic theory lacks.
- [[Split Conformal Prediction and the Coverage Guarantee]] — the exchangeability lemma behind Theorem 1.
- [[Conformity Scores and Adaptive Prediction Sets]] — CQR versus scaled-residual and locally adaptive scores.
- [[Marginal vs Conditional Coverage]] — CQR's guarantee is marginal, but it inherits asymptotic conditional coverage when the quantile learner is consistent.
- [[Conformal Inference for Counterfactuals and ITEs]] — Lei & Candès use **weighted split-CQR** as their workhorse.
- [[Conformal Prediction - Overview]] — placement in the cluster.

## See Also

- [[Regression and the CEF]] — conditional-mean regression, the target that standard split conformal wraps.
- [[Model Selection and Overfitting]] — the training-residual bias that undermines locally adaptive scores is an overfitting phenomenon.
- [[Cross Validation Checking]] — CV is used inside CQR to tune nominal quantiles without touching the calibration fold.
