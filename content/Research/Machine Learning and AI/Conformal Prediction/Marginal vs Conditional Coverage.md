---
title: Marginal vs Conditional Coverage
tags:
  - source/ingested
  - topic/machine-learning
  - topic/conformal-prediction
  - topic/uncertainty-quantification
  - type/concept
  - doc/paper
source: "[[raw/Angelopoulos Bates 2021 - Gentle Introduction to Conformal Prediction.pdf]]"
source_location: "Sec. 3.1 (pp. 12-14), Sec. 4.1-4.2 (pp. 16-18); Tibshirani et al. 2019 Sec. 4 (pp. 15-16); Lei & Candès 2020 Sec. 2.3 (p. 4), Thm. 1 Eq. 3.6 (p. 9); Romano et al. 2019 Sec. 2 (pp. 2-3)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Conformal Prediction"
doc_type: paper
depends_on:
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Conformity Scores and Adaptive Prediction Sets]]"
used_by:
  - "[[Conformal Prediction Under Covariate Shift]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Conformal Prediction - Overview]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
aliases:
  - Conditional Coverage
  - Marginal Coverage
  - Group-Balanced Conformal Prediction
  - Class-Conditional Conformal Prediction
  - Mondrian Conformal Prediction
---

# Marginal vs Conditional Coverage

> [!summary]
> Conformal prediction guarantees **marginal coverage**, $\mathbb P(Y_{\text{test}}\in\mathcal C(X_{\text{test}}))\ge1-\alpha$, an *average* over the covariate distribution. It does **not** guarantee **conditional coverage**, $\mathbb P(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\mid X_{\text{test}}=x)\ge1-\alpha$ for every $x$ — and no distribution-free method can: Vovk (2012) and Lei & Wasserman (2014) show any such method must output intervals of infinite expected length at every non-atom point. Practical responses are (i) **diagnose** with feature- and size-stratified coverage metrics, (ii) design **adaptive scores**, (iii) obtain exact coverage on a finite set of groups or classes by calibrating within each, and (iv) accept a **locally smoothed** relaxation via kernel-weighted conformal prediction.

## Overview

A&B's illustration (Sec. 3.1): two groups with population shares 90% and 10%. A procedure that *always* covers in group A and *never* covers in group B has 90% marginal coverage. Every error lands on the same people. Conditional coverage would require at least 90% in both groups — and that is only a necessary condition: the full property asks for $\ge1-\alpha$ coverage "for a particular person", i.e. for every subset of the population.

The distinction matters whenever prediction sets drive per-unit decisions (a patient, a customer, a geo) rather than aggregate accounting. Lei & Candès (Sec. 2.3) compare marginal coverage to RMSE: a measure of average performance that "does not say much about the validity of the predicted range for a patient with this $x$".

Four notions of coverage, differing in what is conditioned on, should be kept apart:

| Notion | Conditions on | Status |
|---|---|---|
| Marginal | nothing | guaranteed, finite-sample |
| Training-conditional | the calibration set | random, $\mathrm{Beta}(n+1-l,l)$ — see [[Split Conformal Prediction and the Coverage Guarantee#^thm-beta-coverage\|Beta law]] |
| Group / class-conditional | a discrete function of $X$, or the label $Y$ | guaranteed with per-group calibration |
| Object-conditional ("conditional coverage") | $X_{\text{test}}=x$ | impossible distribution-free |

## Main Content

> [!definition] Conditional coverage (A&B Eq. 7) ^def-conditional-coverage
> A set-valued predictor $\mathcal C$ has conditional coverage at level $1-\alpha$ if
>
> $$
> \mathbb P\big[Y_{\text{test}}\in\mathcal C(X_{\text{test}})\mid X_{\text{test}}\big]\ge1-\alpha\quad\text{almost surely.}
> $$
>
> The oracle quantile band $[q_{\alpha/2}(x),q_{1-\alpha/2}(x)]$ achieves it (Romano et al. Eq. 3), which is why quantile-based scores are a good starting point.

> [!theorem] Impossibility of distribution-free conditional coverage ^thm-impossibility
> (Vovk 2012; Lei & Wasserman 2014; as stated in Tibshirani et al. 2019, Sec. 4.) Any method satisfying $\mathbb P\{Y_{n+1}\in\hat C_n(x_0)\mid X_{n+1}=x_0\}\ge1-\alpha$ for almost all $x_0$ and **all** distributions $P$ must produce $\hat C_n(x_0)$ with **infinite expected length** at any non-atom point $x_0$, for any underlying $P$. Barber, Candès, Ramdas & Tibshirani (2019) show that most natural relaxations are likewise unachievable in a non-trivial way.

Intuition: without smoothness assumptions, $P_{Y\mid X=x_0}$ can differ arbitrarily from $P_{Y\mid X=x}$ at neighbouring $x$, and a continuous $X$ never repeats $x_0$ in the sample, so finite data carry no distribution-free information about that specific conditional law.

### Diagnosing conditional coverage (A&B Sec. 3.1)

> [!definition] Feature-stratified coverage (FSC) ^def-fsc
> Let a discrete (or binned) feature take values $g\in\{1,\dots,G\}$ and $\mathcal I_g$ be the validation indices in group $g$:
>
> $$
> \mathrm{FSC}=\min_{g\in\{1,\dots,G\}}\frac{1}{\lvert\mathcal I_g\rvert}\sum_{i\in\mathcal I_g}\mathbf 1\big\{Y_i^{(\text{val})}\in\mathcal C(X_i^{(\text{val})})\big\}.
> $$

> [!definition] Size-stratified coverage (SSC; Angelopoulos et al. 2021) ^def-ssc
> Bin the *set sizes* $\lvert\mathcal C(x)\rvert$ into $B_1,\dots,B_G$ (e.g. size 1, size 2, size $>2$) and let $\mathcal I_g$ index validation points in bin $g$; SSC is the same minimum-over-bins formula. It needs no pre-specified feature.

Under conditional coverage both equal $1-\alpha$ (up to sampling noise); values well below indicate a violation. A&B also recommend histogramming set sizes: a large mean signals a weak score or model, and a narrow spread signals no adaptivity. They stress that the smallest-average-size procedure "is not necessarily the best", and that adaptivity "is not implied by conformal prediction's coverage guarantee, but it is non-negotiable in practical deployments".

### Exact coverage on finitely many groups

> [!algorithm] Group-balanced conformal prediction (A&B Sec. 4.1, Proposition 1) ^alg-group-balanced
> Suppose the first feature $X_{i,1}\in\{1,\dots,G\}$ labels groups.
> 1. Stratify calibration scores by group: $s^{(g)}_1,\dots,s^{(g)}_{n^{(g)}}$.
> 2. Within each group compute $\hat q^{(g)}$ as the $\lceil(n^{(g)}+1)(1-\alpha)\rceil/n^{(g)}$ quantile.
> 3. Predict with the group's own threshold: $\mathcal C(x)=\{y:s(x,y)\le\hat q^{(x_1)}\}$.
>
> For i.i.d. data, $\mathbb P(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\mid X_{\text{test},1}=g)\ge1-\alpha$ for all $g$ (Vovk 2012). The group may be any post-processing of the features, e.g. binned age.

> [!algorithm] Class-conditional conformal prediction (A&B Sec. 4.2, Proposition 2) ^alg-class-conditional
> Stratify calibration scores by **true class** $k$ and compute $\hat q^{(k)}$ within each. Since the class is unknown at test time, loop over candidate labels and use each label's own threshold: $\mathcal C(x)=\{y:s(x,y)\le\hat q^{(y)}\}$. Then $\mathbb P(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\mid Y_{\text{test}}=y)\ge1-\alpha$ for every class $y$ — e.g. 95% coverage both when the truth is *cancer* and when it is *normal*.

The cost is sample size: each group is calibrated with $n^{(g)}$ points, so realised coverage in group $g$ fluctuates like $\mathrm{Beta}(n^{(g)}+1-l_g,\,l_g)$, and groups with $n^{(g)}<1/\alpha-1$ get trivial sets. The number of groups one can afford grows only linearly with $n$ — a finite-sample echo of the impossibility theorem.

### Approximate conditional coverage by localisation (Tibshirani et al. Sec. 4)

Relax the target to a kernel-smoothed neighbourhood of $x_0$:

$$
\frac{\int\mathbb P\{Y_{n+1}\in\hat C_n(x_0)\mid X_{n+1}=x\}\,K\!\big(\tfrac{x-x_0}{h}\big)\,dP_X(x)}{\int K\!\big(\tfrac{x-x_0}{h}\big)\,dP_X(x)}\ge1-\alpha .
$$

This is a covariate-shift problem with $d\tilde P_X/dP_X\propto K((\cdot-x_0)/h)$, so [[Conformal Prediction Under Covariate Shift|weighted conformal prediction]] with kernel weights $K((X_i-x_0)/h)$ attains it exactly. The caveat the authors emphasise: the band $\hat C_n(\cdot\,;x_0)$ is built *for the centre $x_0$* and must be recomputed for each new centre, so this does not yield a single band with the local guarantee simultaneously at all $x_0$. Small $h$ approaches true conditional coverage but shrinks the effective sample size and inflates widths.

### Asymptotic conditional coverage through a good score

If the conditional quantiles are estimated consistently, [[Conformalized Quantile Regression|CQR]]'s correction tends to zero and the band approaches the oracle band. Lei & Candès make this precise (Theorem 1, Eq. 3.6): under their condition A2 (consistent quantile estimates, bounded conditional density near the quantiles), for any $\epsilon>0$,

$$
\lim_{N,n\to\infty}\mathbb P_{X\sim P_X}\Big(\mathbb P\big(Y(1)\in\hat C_{N,n}(X)\mid X\big)\le1-\alpha-\epsilon\Big)=0 .
$$

So marginal validity is unconditional, while conditional validity is a *model-dependent bonus* — the reverse of the usual parametric situation where everything depends on the model.

## Examples

**Computing FSC and SSC.**

```python
import numpy as np

def stratified_coverage(covered, strata):
    """covered: bool array; strata: integer group or size-bin labels."""
    return min(covered[strata == g].mean() for g in np.unique(strata))

# fsc = stratified_coverage(covered, region_id)
# ssc = stratified_coverage(covered, np.digitize(set_sizes, [1.5, 2.5]))
```

**Worked numbers.** A 90% conformal interval for customer spend is calibrated on 2,000 customers, 1,800 retail and 200 wholesale. Wholesale residuals are five times larger. A constant-width split-conformal band with $\hat q$ at the pooled 90th percentile might cover 96% of retail and 36% of wholesale: $0.9\times0.96+0.1\times0.36=0.90$ — marginally valid, FSC $=0.36$. Remedies in increasing strength: a scale-aware score (CQR or $\lvert y-\hat f\rvert/\hat\sigma(x)$) to restore adaptivity; group-balanced calibration, which *guarantees* $\ge90\%$ in both segments but calibrates wholesale on only 200 points (index $\lceil201\times0.9\rceil=181$, realised coverage $\sim\mathrm{Beta}(181,20)$, mean $0.900$, s.d. $\approx0.021$); or both.

## Connections

- [[Split Conformal Prediction and the Coverage Guarantee]] — the marginal theorem and the training-conditional Beta law.
- [[Conformity Scores and Adaptive Prediction Sets]] — APS and scaled residuals are attempts to approximate conditional coverage through the score.
- [[Conformalized Quantile Regression]] — best-performing route to approximate conditional coverage in regression.
- [[Conformal Prediction Under Covariate Shift]] — supplies the kernel-localised relaxation, and shows what goes wrong when the marginal $P_X$ changes: a marginal guarantee under $P_X$ says nothing about coverage under $\tilde P_X$ *unless* conditional coverage holds.
- [[Conformal Inference for Counterfactuals and ITEs]] — ITE intervals are used for individual decisions, so Lei & Candès report conditional-coverage diagnostics alongside the marginal guarantee.
- [[Hierarchical Models]] — the Bayesian route to group-level calibration with partial pooling, in contrast to the no-pooling per-group conformal quantiles here.

## See Also

- [[Simulation-Based Calibration - Overview]] — SBC's guarantee is also an average (over the prior), and can likewise hide poor behaviour in sub-regions of parameter space.
- [[Multiple Testing Corrections]] — taking a minimum over many strata invites noise; assess FSC/SSC against the Beta/binomial spread rather than reading the raw minimum.
- [[Metalearners for CATE]] — the analogous average-versus-conditional distinction for treatment effects (ATE versus CATE).
