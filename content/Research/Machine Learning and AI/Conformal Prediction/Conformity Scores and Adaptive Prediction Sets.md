---
title: Conformity Scores and Adaptive Prediction Sets
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - type/concept
  - doc/paper
source: "[[raw/Angelopoulos Bates 2021 - Gentle Introduction to Conformal Prediction.pdf]]"
source_location: "Sec. 1.1 'Choice of score function' (p. 6), Sec. 2.1-2.4 (pp. 6-11), Sec. 3.1 (pp. 12-14); Romano et al. 2019 Sec. 5 (pp. 7-8)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Conformal Prediction - Overview]]"
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
used_by:
  - "[[Conformalized Quantile Regression]]"
  - "[[Marginal vs Conditional Coverage]]"
aliases:
  - Nonconformity Scores
  - Conformal Score Functions
  - Adaptive Prediction Sets
  - APS
  - Locally Adaptive Conformal Prediction
  - Conformalizing Bayes
---

# Conformity Scores and Adaptive Prediction Sets

> [!summary]
> The **score function** $s(x,y)$ is the only design choice in conformal prediction. Validity holds for *every* score — even pure noise — but "the usefulness of the prediction sets is primarily determined by the score function" (A&B p. 6). A good score ranks inputs by the magnitude of model error, so that sets are small for easy inputs and large for hard ones (**adaptivity**). This note catalogues the scores in Angelopoulos & Bates Sec. 2 — softmax threshold, **adaptive prediction sets (APS)**, scaled residuals $\lvert y-\hat f(x)\rvert/u(x)$, and the posterior predictive density — together with Romano et al.'s critique of locally adaptive residual scores that motivates [[Conformalized Quantile Regression]].

## Overview

After fixing the recipe in [[Split Conformal Prediction and the Coverage Guarantee]], all remaining freedom lies in $s$. A&B's thought experiment: if the scores are random noise, the conformal set is a random subset of the label space, large enough to cover with probability $1-\alpha$ — valid and useless. If instead the scores correctly rank examples from smallest to largest model error, sets shrink on easy inputs and grow on hard ones. The score "incorporates almost all the information we know about our problem and data, including the underlying model itself"; the main difference between conformal classification and conformal regression is simply the choice of score.

Convention: larger score = worse agreement between $x$ and $y$ (a *nonconformity* score). The prediction set is always the sub-level set $\{y:s(x,y)\le\hat q\}$, with $\hat q$ the $\lceil(n+1)(1-\alpha)\rceil/n$ calibration quantile.

## Main Content

### Classification

> [!definition] Softmax-threshold score (A&B Sec. 1) ^def-softmax-score
> $s(x,y)=1-\hat f(x)_y$, one minus the softmax output of the true class. The set is $\mathcal C(x)=\{y:\hat f(x)_y\ge1-\hat q\}$. This procedure yields the **smallest average set size** among conformal classifiers (Sadinle et al.), but "tends to undercover hard subgroups and overcover easy ones" (A&B p. 6): a single global probability threshold ignores how the remaining mass is spread.

> [!definition] Adaptive prediction sets, APS (Romano, Sesia & Candès; Angelopoulos et al.; A&B Sec. 2.1) ^def-aps
> Let $\pi(x)$ be the permutation of $\{1,\dots,K\}$ sorting $\hat f(x)$ from most to least likely. Define
>
> $$
> s(x,y)=\sum_{j=1}^{k}\hat f(x)_{\pi_j(x)},\qquad\text{where } y=\pi_k(x),
> $$
>
> the cumulative softmax mass accumulated until the true label is reached. The prediction set (modified slightly to avoid empty sets) is
>
> $$
> \mathcal C(x)=\{\pi_1(x),\dots,\pi_k(x)\},\qquad k=\sup\Big\{k':\sum_{j=1}^{k'}\hat f(x)_{\pi_j(x)}<\hat q\Big\}+1 .
> $$

APS is motivated by an **oracle**: if $\hat f(x)$ were the true conditional distribution of $Y\mid X=x$, greedily including top classes until their mass exceeds $1-\alpha$ would give exact *conditional* coverage. Since $\hat f$ is only heuristic, conformal calibration replaces $1-\alpha$ by $\hat q$. Unlike the softmax-threshold score, APS uses the softmax outputs of *all* classes, not just the true one. The trade-off is larger average sets in exchange for better approximate [[Marginal vs Conditional Coverage|conditional coverage]]; A&B point to Angelopoulos, Bates, Malik & Jordan (2021) for "significant practical improvements" on set size.

### Regression with a scalar uncertainty estimate

> [!definition] Scaled-residual score (A&B Sec. 2.3) ^def-scaled-residual
> Given a point predictor $\hat f(x)$ and any uncertainty scalar $u(x)>0$ that is large when the model is unsure,
>
> $$
> s(x,y)=\frac{\lvert y-\hat f(x)\rvert}{u(x)},\qquad \mathcal C(x)=\big[\hat f(x)-u(x)\hat q,\;\hat f(x)+u(x)\hat q\big].
> $$
>
> $\hat q$ is a **multiplicative correction factor** for the heuristic uncertainty: $\mathbb P[\lvert Y_{\text{test}}-\hat f(X_{\text{test}})\rvert\le u(X_{\text{test}})\hat q]\ge1-\alpha$.

Choices of $u(x)$ listed by A&B: a Gaussian-likelihood network's $\hat\sigma(x)$ (e.g. trained with `GaussianNLLLoss`); a second model $\hat r(x)$ fit to $\lvert y-\hat f(x)\rvert$; variance of $\hat f(x)$ across an **ensemble**; variance under **MC dropout**; variance under small input perturbations; variance over noise samples of a generative model; sensitivity to adversarial perturbation. All are treated identically. With $u\equiv1$ this reduces to the absolute-residual score and a constant-width band.

Two caveats from the sources:

1. *Symmetry and $\alpha$-scaling.* The sets are symmetric about $\hat f(x)$, and "uncertainty scalars do not necessarily scale properly with $\alpha$": there is no reason a $\hat\sigma$ is proportional to the relevant quantile of $Y\mid X$ at every level. A&B "tend to prefer quantile regression when possible".
2. *Training-residual bias* (Romano et al. Sec. 5). In **locally adaptive conformal prediction** $\hat\sigma(x)$ is a MAD estimate fit to residuals on the *proper training set*, often with an offset, $\tilde R_i=R_i/(\hat\sigma(X_i)+\gamma)$. Those residuals "are biased by an optimization procedure designed to minimize them", so an over-parameterised $\hat\mu$ (training error near zero) gives a nearly useless $\hat\sigma$, forcing $\hat q$ to be large and destroying adaptivity. On homoscedastic data the extra estimation noise in $\hat\sigma$ actually *inflates* intervals relative to plain split conformal.

Both caveats point to [[Conformalized Quantile Regression]], whose score $\max\{\hat t_{\alpha/2}(x)-y,\;y-\hat t_{1-\alpha/2}(x)\}$ is asymmetric-capable and trained directly for the target quantiles.

### Conformalizing Bayes

> [!definition] Posterior-predictive density score (A&B Sec. 2.4) ^def-conformal-bayes
> For a Bayesian model with posterior predictive density $\hat f(y\mid x)$, set
>
> $$
> s(x,y)=-\hat f(y\mid x),\qquad \mathcal C(x)=\{y:\hat f(y\mid x)>-\hat q\}.
> $$
>
> The set is a **super-level set of the posterior predictive density** — the shape of a highest-density region, with the cut-off chosen by conformal calibration rather than by integrating the density to $1-\alpha$.

A Bayesian who believed the model would use $S(x)=\{y:\hat f(y\mid x)>t\}$ with $\int_{S(x)}\hat f(y\mid x)\,dy=1-\alpha$. That relies on "a correctly specified model and asymptotically large $n$". The conformal version is valid without those assumptions, and under the technical conditions of Hoff (A&B ref. [11]) it has the smallest average size (Bayes risk) among conformal procedures with $1-\alpha$ coverage — an argument A&B liken to the Neyman–Pearson lemma. Multi-modal predictive densities naturally produce unions of intervals.

> [!tip] Score-selection heuristics
> | Goal | Score | Set shape |
> |---|---|---|
> | Smallest average classification set | $1-\hat f(x)_y$ | global probability threshold |
> | Adaptive classification sets | APS cumulative mass | top-$k(x)$ classes |
> | Regression, quantile learner available | CQR score | $[\hat t_{lo}(x)-\hat q,\hat t_{hi}(x)+\hat q]$ |
> | Regression, only $\hat\sigma(x)$ or an ensemble | $\lvert y-\hat f\rvert/u(x)$ | $\hat f(x)\pm u(x)\hat q$ |
> | Bayesian model with a predictive density | $-\hat f(y\mid x)$ | HPD-shaped, possibly disconnected |

### Evaluating adaptivity (A&B Sec. 3.1)

The procedure with the smallest average set is not necessarily best. A&B recommend: (i) histogram set sizes — a wide spread suggests the procedure distinguishes easy from hard inputs; (ii) verify the large sets occur on the *hard* examples via feature-stratified (FSC) and size-stratified (SSC) coverage, defined in [[Marginal vs Conditional Coverage]].

## Examples

APS in NumPy, following A&B Figure 3:

```python
import numpy as np

def aps_calibrate(cal_smx, cal_labels, alpha=0.1):
    n = len(cal_labels)
    pi = cal_smx.argsort(1)[:, ::-1]                               # classes sorted by prob
    srt = np.take_along_axis(cal_smx, pi, axis=1).cumsum(axis=1)   # cumulative mass
    scores = np.take_along_axis(srt, pi.argsort(1), axis=1)[np.arange(n), cal_labels]
    return np.quantile(scores, np.ceil((n + 1) * (1 - alpha)) / n, method="higher")

def aps_predict(val_smx, qhat):
    pi = val_smx.argsort(1)[:, ::-1]
    srt = np.take_along_axis(val_smx, pi, axis=1).cumsum(axis=1)
    return np.take_along_axis(srt <= qhat, pi.argsort(1), axis=1)  # boolean set matrix
```

**Worked contrast.** Softmax vectors $(0.55,0.40,0.05)$ and $(0.55,0.15,0.15,0.15)$ with $\hat q_{\text{APS}}=0.93$. APS keeps classes while the cumulative mass *before* adding the next class is below $0.93$: for the first input the cumulative sums are $0.55,0.95$, giving the set $\{1,2\}$; for the second, $0.55,0.70,0.85,1.0$, giving all four classes. A softmax-threshold rule whose own calibration gave the cut-off $1-\hat q=0.2$ would return $\{1,2\}$ and $\{1\}$ respectively — confidently excluding three classes that jointly carry 45% of the mass. This is the under-coverage on hard inputs that APS repairs.

**Conformalizing a Bayesian regression.** For a PyMC/Stan regression, evaluate the posterior predictive density at each held-out $y_i$ (average the likelihood over posterior draws), take $s_i$ as its negative, compute $\hat q$, and report $\{y:\hat f(y\mid x)>-\hat q\}$. If $\hat q$ implies a density cut-off far lower than the nominal HPD cut-off, the posterior predictive is over-confident — a quantitative complement to [[Posterior Predictive Checking]].

## Connections

- [[Split Conformal Prediction and the Coverage Guarantee]] — why any score is valid.
- [[Conformalized Quantile Regression]] — the preferred regression score and the empirical comparison against scaled residuals.
- [[Marginal vs Conditional Coverage]] — adaptivity is the practical proxy for conditional coverage.
- [[Conformal Prediction - Overview]] — where scores sit in the four-step recipe.
- [[Posterior Predictive Checking]] — the posterior predictive is the raw material of the conformalized-Bayes score.
- [[Quantile Regression]] — the classical estimator behind the CQR score.

## See Also

- [[Stacking and Predictive Model Averaging]] — ensembles supply both a better $\hat f$ and a disagreement-based $u(x)$.
- [[Hierarchical Models]] — partial pooling gives group-varying predictive scales that make natural uncertainty scalars.
- [[Simulation-Based Calibration - Overview]] — checks the Bayesian computation; conformalized Bayes guards against model misspecification instead.
