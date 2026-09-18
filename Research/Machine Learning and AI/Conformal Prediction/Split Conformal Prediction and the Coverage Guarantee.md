---
title: Split Conformal Prediction and the Coverage Guarantee
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - type/method
  - doc/paper
source: "[[raw/Angelopoulos Bates 2021 - Gentle Introduction to Conformal Prediction.pdf]]"
source_location: "Sec. 1.1 (pp. 5-6), Sec. 3.2-3.3 (pp. 14-16), App. C-D (pp. 49-51); Tibshirani et al. 2019 Sec. 1.1-1.2 (pp. 1-3); Romano et al. 2019 Sec. 3 (pp. 3-4)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Conformal Prediction - Overview]]"
  - "[[Permutation Tests and Exact Inference]]"
used_by:
  - "[[Conformity Scores and Adaptive Prediction Sets]]"
  - "[[Conformalized Quantile Regression]]"
  - "[[Marginal vs Conditional Coverage]]"
  - "[[Conformal Prediction Under Covariate Shift]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - Split Conformal
  - Inductive Conformal Prediction
  - Conformal Coverage Guarantee
  - Quantile Lemma
---

# Split Conformal Prediction and the Coverage Guarantee

> [!summary]
> **Split (inductive) conformal prediction** freezes a model trained on one fold, scores a disjoint **calibration fold** of size $n$, and thresholds test-time scores at the $\lceil(n+1)(1-\alpha)\rceil$-th smallest calibration score. Exchangeability makes the rank of the test score uniform on $\{1,\dots,n+1\}$, which yields $1-\alpha\le\mathbb P(Y_{\text{test}}\in\mathcal C(X_{\text{test}}))\le 1-\alpha+\tfrac1{n+1}$ for *any* model, score and data distribution. Conditional on a particular calibration set, realised coverage is a $\mathrm{Beta}(n+1-l,\,l)$ random variable with $l=\lfloor(n+1)\alpha\rfloor$, which is what determines how large $n$ must be (roughly 1000).

## Overview

Full conformal prediction (see [[Conformal Prediction - Overview#^def-full-conformal|the definition in the overview]]) refits the model for every candidate label. Split conformal (Papadopoulos et al. 2002; Lei et al. 2015) avoids this by treating the model as *fixed*: the training fold $\mathcal I_1$ is used only to fit $\hat f$, and the calibration fold $\mathcal I_2$ only to compute scores. Conditional on $\mathcal I_1$, the score function is a fixed measurable map, so the calibration scores and the test score inherit exchangeability from the data. Tibshirani et al. (Sec. 2.2) emphasise that split conformal "can be seen as a special case of conformal prediction, in which the regression function $\mu_0$ is treated as fixed", so every result for full conformal carries over.

The cost is statistical: only part of the data trains the model and only part calibrates. The benefit is computational triviality — one model fit and one quantile.

## Main Content

> [!algorithm] Split conformal prediction ^alg-split-conformal
> **Input:** data $(X_i,Y_i)_{i=1}^{N}$, miscoverage level $\alpha$, learning algorithm $\mathcal A$, score function template $s$.
> 1. Randomly split indices into a proper training set $\mathcal I_1$ and a calibration set $\mathcal I_2$ with $\lvert\mathcal I_2\rvert=n$.
> 2. Fit $\hat f\leftarrow\mathcal A(\{(X_i,Y_i):i\in\mathcal I_1\})$. Any algorithm is allowed; unlike full conformal it need not treat data symmetrically (Romano et al., footnote 3).
> 3. Compute calibration scores $s_i=s(X_i,Y_i)$ for $i\in\mathcal I_2$.
> 4. Set $\hat q$ to the $\lceil(n+1)(1-\alpha)\rceil/n$ empirical quantile of $\{s_i\}$, i.e. the $\lceil(n+1)(1-\alpha)\rceil$-th smallest score; $\hat q=\infty$ if that index exceeds $n$.
> 5. **Output:** $\mathcal C(x)=\{y:s(x,y)\le\hat q\}$.
>
> For regression with $s(x,y)=\lvert y-\hat\mu(x)\rvert$ this is $\mathcal C(x)=[\hat\mu(x)-\hat q,\;\hat\mu(x)+\hat q]$ (Romano et al. Eq. 8), a band of **constant width** $2\hat q$.

An equivalent formulation (Tibshirani et al. Eq. 5, 9) replaces the inflated level by an augmented sample: $\hat q=\mathrm{Quantile}(1-\alpha;\,s_{1:n}\cup\{\infty\})$. Placing a point mass at $+\infty$ stands in for the unknown test score, and is the form that generalises to [[Conformal Prediction Under Covariate Shift|weighted conformal prediction]].

> [!theorem] Quantile lemma (Tibshirani et al. 2019, Lemma 1) ^thm-quantile-lemma
> If $V_1,\dots,V_{n+1}$ are exchangeable random variables, then for any $\beta\in(0,1)$,
>
> $$
> \mathbb P\big\{V_{n+1}\le\mathrm{Quantile}(\beta;\,V_{1:n}\cup\{\infty\})\big\}\ge\beta .
> $$
>
> If ties occur with probability zero, the probability is also at most $\beta+1/(n+1)$.

*Proof sketch.* Replacing $\infty$ by $V_{n+1}$ does not change whether $V_{n+1}$ is below the quantile, so the event equals "$V_{n+1}$ is among the $\lceil\beta(n+1)\rceil$ smallest of $V_1,\dots,V_{n+1}$". By exchangeability the rank of $V_{n+1}$ is uniform on $\{1,\dots,n+1\}$, so this has probability $\lceil\beta(n+1)\rceil/(n+1)\in[\beta,\beta+\tfrac{1}{n+1}]$ when there are no ties. Romano et al. (Appendix A, Lemma 2 "inflation of quantiles") state the same fact with the $(1-\alpha)(1+1/n)$ level.

> [!theorem] Split conformal coverage (A&B Theorems D.1–D.2; Romano et al. Theorem 1) ^thm-split-coverage
> If $(X_i,Y_i)$, $i\in\mathcal I_2$, and $(X_{\text{test}},Y_{\text{test}})$ are exchangeable, then
>
> $$
> \mathbb P\big(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\big)\ge1-\alpha ,
> $$
>
> and if the scores have a continuous joint distribution,
>
> $$
> \mathbb P\big(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\big)\le1-\alpha+\frac1{n+1}.
> $$
>
> The result holds conditionally on the proper training set.

The A&B proof (App. D) is three lines. Sort the calibration scores $s_1<\dots<s_n$. The events $\{Y_{\text{test}}\in\mathcal C(X_{\text{test}})\}$ and $\{s_{\text{test}}\le s_{\lceil(n+1)(1-\alpha)\rceil}\}$ coincide. By exchangeability $\mathbb P(s_{\text{test}}\le s_k)=k/(n+1)$ for every integer $k$, so coverage equals $\lceil(n+1)(1-\alpha)\rceil/(n+1)\ge1-\alpha$. When $\alpha<1/(n+1)$, $\hat q=\infty$ and $\mathcal C=\mathcal Y$ trivially covers.

> [!important] What is and is not assumed
> - **Assumed:** exchangeability of calibration and test points (i.i.d. is sufficient, not necessary), and that the score function does not depend on the calibration or test data.
> - **Not assumed:** correctness of $\hat f$, any parametric family, homoscedasticity, large $n$. A useless model yields valid but uninformative (huge) sets.
> - **Broken by:** time-series dependence, covariate shift, label shift, tuning the model on the calibration fold, or re-using the calibration fold for early stopping.

### Coverage conditional on the calibration set

The guarantee averages over calibration draws. For one fixed calibration set the coverage over an infinite test set is random (Vovk 2012; A&B Sec. 3.2):

> [!theorem] Beta law of realised coverage ^thm-beta-coverage
> With continuous scores,
>
> $$
> \mathbb P\big(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\,\big|\,\{(X_i,Y_i)\}_{i=1}^n\big)\sim\mathrm{Beta}(n+1-l,\;l),\qquad l=\lfloor(n+1)\alpha\rfloor .
> $$
>
> The distribution concentrates around $1-\alpha$ at rate $O(n^{-1/2})$.

For $\alpha=0.1$ and $n=1000$ realised coverage is "typically between .88 and .92", the basis of A&B's rule of thumb that about 1000 calibration points suffice. Their Table 1 gives the $n$ needed so that coverage is within $1-\alpha\pm\epsilon$ with probability $1-\delta=0.9$ at $\alpha=0.1$:

| $\epsilon$ | 0.1 | 0.05 | 0.01 | 0.005 | 0.001 |
|---|---|---|---|---|---|
| $n(\epsilon)$ | 22 | 102 | 2491 | 9812 | 244390 |

### Checking an implementation (A&B Sec. 3.3, App. C)

Run $R$ random calibration/validation splits of cached scores and record empirical coverages $C_j=\tfrac1{n_{\text{val}}}\sum_i\mathbf 1\{Y^{(\text{val})}_{i,j}\in\mathcal C_j(X^{(\text{val})}_{i,j})\}$. Each $C_j$ is $\tfrac1{n_{\text{val}}}\mathrm{Binom}(n_{\text{val}},\mu)$ with $\mu\sim\mathrm{Beta}(n+1-l,l)$, i.e. beta-binomial. The average $\bar C$ has

$$
\mathbb E[\bar C]=1-\frac{l}{n+1},\qquad
\sqrt{\operatorname{Var}\bar C}=\sqrt{\frac{l(n+1-l)(n+n_{\text{val}}+1)}{n_{\text{val}}R(n+1)^2(n+2)}}=O\!\Big(\frac{1}{\sqrt{R\min(n,n_{\text{val}})}}\Big).
$$

Deviations of $\bar C$ from $1-\alpha$ much larger than this indicate a bug (most commonly leakage between training and calibration folds, or a wrong quantile level).

## Examples

**By hand.** Nine calibration residuals $\lvert y-\hat\mu(x)\rvert$: $0.2, 0.3, 0.5, 0.6, 0.9, 1.1, 1.4, 2.0, 3.5$.

- $\alpha=0.2$: $\lceil10\times0.8\rceil=8$, so $\hat q=2.0$ and $\mathcal C(x)=\hat\mu(x)\pm2.0$. The test residual is equally likely to fall in any of the 10 gaps, and 8 of them lie at or below $2.0$: coverage is exactly $8/10=0.8$ (not $8/9$, the naive empirical quantile's implied level — the $+1$ accounts for the test point).
- $\alpha=0.1$: $\lceil10\times0.9\rceil=9$, so $\hat q=3.5$, coverage exactly $0.9$.
- $\alpha=0.05$: $\lceil10\times0.95\rceil=10>n$, so $\hat q=\infty$. With $n=9$ one cannot certify more than 90%: informative sets need $n\ge1/\alpha-1$.

**Coverage check with score caching** (A&B Figure 12):

```python
import numpy as np

def coverage_check(scores, n, alpha=0.1, R=1000, seed=0):
    rng = np.random.default_rng(seed)
    cov = np.empty(R)
    for r in range(R):
        rng.shuffle(scores)
        cal, val = scores[:n], scores[n:]
        qhat = np.quantile(cal, np.ceil((n + 1) * (1 - alpha)) / n, method="higher")
        cov[r] = (val <= qhat).mean()      # covered  <=>  s(X, Y) <= qhat
    return cov.mean(), cov                 # mean should be ~ 1 - l/(n+1)
```

## Connections

- [[Conformal Prediction - Overview]] — context, full conformal, and the extensions map.
- [[Permutation Tests and Exact Inference]] — the uniform-rank argument is the same one that makes permutation $p$-values exact; conformal sets are inverted permutation tests. Compare the Monte Carlo $p$-value $(1+\#\{T_\pi\ge T\})/(1+B)$ with the $(n+1)$ in the conformal quantile: both add one for the observed/test point.
- [[Fisher Randomization Test and the Sharp Null]] — finite-sample exactness from symmetry of a known assignment mechanism, versus symmetry of sampling here.
- [[Conformity Scores and Adaptive Prediction Sets]] and [[Conformalized Quantile Regression]] — replacing the absolute residual so that widths vary with $x$.
- [[Marginal vs Conditional Coverage]] — the guarantee above is marginal over $X$; the Beta law is "training-conditional" coverage, a different notion again.
- [[Conformal Prediction Under Covariate Shift]] — generalises the quantile lemma to weighted exchangeability.

## See Also

- [[Cross Validation Checking]] — hold-out logic for predictive evaluation in Bayesian workflow; conformal calibration folds play an analogous role but deliver a guarantee rather than a diagnostic.
- [[Posterior Predictive Checking]] — model-based predictive intervals whose frequentist coverage depends on model correctness.
- [[Simulation-Based Calibration - Overview]] — rank-uniformity is also the engine of SBC, but applied to posterior draws versus prior draws rather than test scores versus calibration scores.
- [[Power Analysis and Sample Size]] — analogous planning question; here the sample-size driver is the Beta spread of realised coverage.
