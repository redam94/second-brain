---
title: Model Class Reliance - Toy Example and Bootstrap Coverage Simulations
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/interpretability
  - type/example
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "§9 p. 34; §9.1 pp. 34-36 (Fig. 6); §9.2 pp. 36-37 (Conditions 20-21); §9.2.1 pp. 37-38 (Fig. 7)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Model Reliance - Permutation Importance as a U-Statistic]]"
  - "[[Model Class Reliance - Binary Search Computation]]"
  - "[[Simulation Studies for Evaluating Statistical Methods (ADEMP)]]"
used_by:
  - "[[Model Class Reliance - Recidivism Case Study]]"
  - "[[Model Class Reliance - Discussion, Limitations and Extensions]]"
aliases:
  - MCR Simulation Study
  - MCR Bootstrap Coverage
  - MCR-Linear vs Standard-Linear
  - AR MR MCR Polynomial Classifier Example
---

# Model Class Reliance - Toy Example and Bootstrap Coverage Simulations

> [!summary]
> **§9.1** uses a 2-D classification toy problem (one class inside, one on a ring) with degree-3 polynomial classifiers and hinge loss to contrast **AR** (refit without $X_1$), **MR** ($\widehat{MR}(f_{\text{ref}})=3.47$) and **MCR** (the range of MR over 15+ near-optimal classifiers). **§9.2** is a Monte Carlo study of misspecification. The true function is quadratic with nonlinearity $\gamma\in\{0,\dots,0.5\}$ and is fit with a *linear* class. Bootstrap MCR intervals ("MCR-Linear") keep 95% coverage of $MR(f_0)$ up to $\gamma=0.3$, where a standard bootstrap of one fitted model's MR breaks down. Both fail for $\gamma\ge0.4$. MCR intervals are about 2-4 times wider, larger $n$ makes misspecification coverage *worse*, and the remaining coverage errors come from the class not containing an MR-matching model (Condition 20), not from the bootstrap (Condition 21).
^summary

## Overview

The two experiments have different jobs. The toy example builds intuition for the three importance notions in a single sample. The simulation tests the central claim: MCR can cover the reliance of an *unknown* true function $f_0$ even when the class is misspecified, provided some good model in the class matches $f_0$'s reliance. Read through [[Simulation Studies for Evaluating Statistical Methods (ADEMP)|ADEMP]]: the **A**im is coverage of $MR(f_0)$; the **D**ata-generating mechanisms vary $\gamma$ and $n$; the **E**stimand is $MR(f_0)$ for $X_1$ and $X_2$; the **M**ethods are MCR-Linear and Standard-Linear; the **P**erformance measure is coverage of nominal 95% CIs.

## Main Content

### §9.1 Illustrative toy example (pp. 34-36)

**Framing (§9.1, p. 34).** The goal is intuition for how MR, MCR and AR differ, so all three are shown in a *single sample* and compared as empirical quantities ($\widehat{MR}$, $\widehat{MCR}_-$, $\widehat{MCR}_+$ against AR). The reason given is that AR is typically interpreted either as an **in-sample measure** (Breiman 2001) or as an **intermediate step toward variable rankings** (Gevrey et al. 2003; Olden et al. 2004), not as an estimate of a population quantity. So the comparison is like-for-like only at the sample level.

> [!example] Design of the polynomial-classifier toy example (§9.1)
> **Data.**
> - $X=(X_1,X_2)\in\mathbb R^2$ and $Y\in\{-1,1\}$.
> - $X\mid Y=-1\sim$ independent bivariate normal with means 0 and variances $\tfrac19$.
> - $X\mid Y=1$: the same draw plus $(C_1,C_2)=(\cos U,\sin U)$ with $U\sim\text{Uniform}[-\pi,\pi]$, a point uniform on the unit circle. So class $+1$ is a noisy ring around class $-1$.
> - Two samples of size 300: one for training, one for testing.
>
> **Prediction and loss.** Predict $\mathrm{sign}\,f(X_1,X_2)$. Use hinge loss $(1-yf)_+$, a convex surrogate for 0-1 loss $\mathbb 1[y\ne\mathrm{sign}f]$.
>
> **Class.** Degree-3 polynomial classifiers
> $$
> \mathcal F_{d3}=\{f_\theta:f_\theta=\theta_1+\theta_2x_1+\theta_3x_2+\theta_4x_1^2+\theta_5x_2^2+\theta_6x_1x_2+\theta_7x_1^3+\theta_8x_2^3+\theta_9x_1^2x_2+\theta_{10}x_1x_2^2;\ \|\theta_{[-1]}\|_2^2\le r_{d3}\},
> $$
> with $r_{d3}$ chosen by 10-fold CV on the training data.
>
> **Reference and threshold.** $\mathcal A_{d3}$ minimizes hinge loss over the convex feasible region. $f_{\text{ref}}=\mathcal A_{d3}(\text{training})$, and $\epsilon=0.10\times$ the CV loss of $\mathcal A_{d3}$, so $\mathcal R(\epsilon)$ contains models within about 10% of $f_{\text{ref}}$'s loss. AR, MR and MCR are computed on the **test** sample, with $\widehat{MR}$ via $\hat e_{\text{divide}}$.
^ex-toy-design

**Results.**
- **AR** (Fig. 6-A). Refitting without $X_1$ gives $\hat f_2$ (blue dashed); refitting with only $X_1$ gives $\hat f_1$ (solid blue). Comparing $\hat f_2$ with $f_{\text{ref}}$ gives AR-*necessity*; comparing $\hat f_1$ with $f_{\text{ref}}$ gives AR-*sufficiency*. Single-input boundaries are straight lines.
- **MR** (Fig. 6-C). $\widehat{MR}(\hat f_2)=1$, as expected for a model that never sees $X_1$, and $\widehat{MR}(f_{\text{ref}})=3.47$. "Each $\widehat{MR}$ value has an interpretation contained to a single model" (p. 35). It compares one model across data distributions, not different models on marginals of one joint distribution.
- **MCR** (Fig. 6-B). Fifteen well-performing models in $\hat{\mathcal R}(\epsilon,f_{\text{ref}},\mathcal F_{d3})$ appear as grey oval-like boundaries. $\hat f_{+,\epsilon}$ (solid green) and $\hat f_{-,\epsilon}$ (dashed green) approximately maximize and minimize empirical reliance on $X_1$. In Fig. 6-C, every model in $\hat{\mathcal R}(\epsilon)$ has $\widehat{MR}$ between $\widehat{MR}(\hat f_{-,\epsilon})$ and $\widehat{MR}(\hat f_{+,\epsilon})$, up to small approximation error.
- **Takeaway:** "unlike AR, MCR is only a function of models that fit the data well" (p. 35).

> [!example] Figure 6 (p. 36): AR, MCR and MR for polynomial classifiers
> Panels (A) and (B) show **the same 300 draws** from the simulated data set.
> - **(A)** For AR: points (x for $Y=1$, o for $Y=-1$) with the $f_{\text{ref}}$ boundary (dotted black) and the single-feature models formed by dropping a covariate, $\hat f_1$ and $\hat f_2$. The caption explains that these are drawn as **straight lines because each takes only a single input**.
> - **(B)** For MCR: the same points with the classification boundaries of several two-feature models with low in-sample loss (grey). The model with minimal dependence on $X_1$, $\hat f_{-,\epsilon}$, is the **dashed green oval**, and the model with maximal dependence, $\hat f_{+,\epsilon}$, is the **solid green oval**.
> - **(C)** A strip plot of empirical MR on $X_1$ (y-axis about 1.0-4.0) for $\hat f_1$, $\hat f_2$, $f_{\text{ref}}$, the good models, $\hat f_{+,\epsilon}$ and $\hat f_{-,\epsilon}$. No good model exceeds $\widehat{MCR}_+(\epsilon)$ or falls below $\widehat{MCR}_-(\epsilon)$.
^fig-6

### §9.2 Bootstrap CIs under misspecification (pp. 36-38)

> [!definition] Conditions 20-21 (p. 36)
> - **Condition 20 (nearly correct model class):** $\mathcal F$ contains a well-performing $\tilde f\in\mathcal R(\epsilon,f_{\text{ref}},\mathcal F)$ with $MR(\tilde f)=MR(f_0)$. Equivalently, $MR(f_0)$ is "well supported" by $\mathcal F$ even if $f_0\notin\mathcal F$.
> - **Condition 21 (bootstrap coverage):** bootstrap CIs for empirical MCR give appropriate coverage of population MCR.
>
> Condition 20 makes $[MCR_-,MCR_+]\ni MR(f_0)$. Condition 21 makes that interval estimable in finite samples. Coverage of $MR(f_0)$ requires both.
>
> **Goals of §9.2 (p. 37).** The *primary* goal is to assess whether CIs derived from MCR give appropriate coverage of $MR(f_0)$, which depends on both conditions. As a *secondary* goal, the authors want to assess Conditions 20 and 21 **individually**. That is why the design needs population-level MCR (computed on the finite population of 20,000), so that the two failure sources can be told apart. The result (item 5 below) is that coverage failures trace to Condition 20, while Condition 21 holds conservatively.
>
> **Source typo.** The sentence interpreting Condition 20 reads that "the model reliance value of $MR(f_c)$ is 'well supported' by the class $\mathcal F$, even if $\mathcal F$ does not contain $f_0$" (p. 37). Given Condition 20's statement, $MR(f_c)$ should read $MR(f_0)$. No $f_c$ is defined in §9.2.
^def-cond20-21

> [!algorithm] Simulation design: MCR-Linear vs Standard-Linear (§9.2, pp. 36-37)
> **Population.** A finite population of 20,000 observations, so population MCR can be computed exactly. Samples are drawn with replacement from it.
>
> **Data-generating model.** For $\gamma\in\{0,0.1,0.2,0.3,0.4,0.5\}$:
> - $Y=f_0(X)+E$ with $f_0(x)=\sum_{j=1}^p\big(j\,x_{[j]}-\gamma x_{[j]}^2\big)$ and $p=2$, so $X_2$ has twice the linear coefficient of $X_1$;
> - $X\sim$ bivariate normal with $\mathbb E X_1=\mathbb E X_2=0$ and $\mathrm{Cov}(X_1,X_2)=1/4$. The paper prints $\mathrm{Var}(X_1)=\mathrm{Var}(X_2)=0$, an evident typo since a nonzero covariance requires positive variances; unit variances are the natural reading;
> - $E\sim N(0,\sigma_E^2)$ with $\sigma_E^2:=\mathrm{Var}(f_0(X))$, i.e. signal-to-noise 1.
>
> **Sample sizes.** $n=400$ with $n_{tr}=200$ training, and $n=800$ with $n_{tr}=300$.
>
> **MCR-Linear.**
> 1. Split sample $\mathcal Z_s$ into training and analysis subsets.
> 2. Fit $f_{\text{ref},s}$ on the training subset, within $\mathcal F_{\text{lm}}=\{f_\beta:f_\beta(x)=\beta_1+\sum_{j=1}^2x_{[j]}\beta_{j+1},\ \beta\in\mathbb R^3\}$.
> 3. Set $\epsilon=0.1\times\sigma_E^2$.
> 4. Draw 500 bootstrap samples from the analysis subset. In each, compute $\widehat{MCR}_-(\epsilon)$ and $\widehat{MCR}_+(\epsilon)$ by optimizing over $\hat{\mathcal R}(\epsilon,f_{\text{ref},s},\mathcal F_{\text{lm}})$.
> 5. CI = [2.5th percentile of $\widehat{MCR}_-$, 97.5th percentile of $\widehat{MCR}_+$].
> 6. Repeat for $X_1$ and for $X_2$.
>
> **Standard-Linear (comparator).**
> 1. Draw 500 bootstrap samples from $\mathcal Z_s$.
> 2. In each, train $f_b\in\mathcal F_{\text{lm}}$ on $n_{tr}$ points and compute $\widehat{MR}(f_b)$ on the rest.
> 3. CI = 2.5th-97.5th percentiles of $\widehat{MR}(f_b)$.
>
> **Estimand and performance.** Coverage of $MR(f_0)$ by nominal 95% CIs.
^alg-sim-design

> [!theorem] Results (§9.2.1, pp. 37-38; Fig. 7)
> 1. MCR-Linear gives proper coverage up to moderate misspecification ($\gamma=0.3$), where Standard-Linear begins to break down.
> 2. For $\gamma\ge0.4$, both MCR-Linear and Standard-Linear fail to reach 95% coverage.
> 3. Larger $n$ generally *worsens* coverage under misspecification: "methods become more certain of biased results" (p. 37).
> 4. MCR-Linear intervals are roughly **2-4 times wider** than Standard-Linear, partly because they target a range $[MCR_-,MCR_+]$ (defined using $f_{\text{ref},s}$) rather than a point.
> 5. MCR-Linear's coverage errors come mostly from violations of **Condition 20**. **Condition 21** holds conservatively in every scenario: at least 95.9% of bootstrap CIs contained population MCR.
^thm-sim-results

> [!example] Figure 7 (p. 38): MR coverage
> - **Layout:** two panels, reliance on $X_1$ (left) and on $X_2$ (right). The x-axis is the degree of nonlinearity $\gamma\in\{0,\dots,0.5\}$ and the y-axis is coverage from about 0.7 to 1.0, with a dashed line at the 95% target.
> - **Series:** colour = method (Standard vs MCR); line style = sample size (400 vs 800).
> - **Pattern:** MCR curves stay at or near 1.0 longer than the Standard curves. All curves drop at high $\gamma$, and the $n=800$ curves drop further.
>
> Exact coverage values are shown only graphically.
^fig-7

**Interpretation (p. 38).** MCR is *generic*. It assumes no specific route for misspecification, so it "is less powerful than sensitivity analyses which make that assumption correctly". It still adds robustness, and with a strong enough signal it returns an informative interval, as in the COMPAS analysis.

## Examples

> [!example] Why larger samples hurt under misspecification
> Standard-Linear's CI shrinks around $MR(\hat f_{\text{lin}})$. Under curvature, the best *linear* fit splits signal between $X_1$ and $X_2$ differently from $f_0$, so its MR is biased. More data makes the CI tighter around the wrong value. MCR's interval also tightens, but it keeps every *nearly* optimal linear fit, and some of these may match $MR(f_0)$. That is Condition 20. The same logic applies when a linear MMM is fit to saturating media effects: more weeks of data do not fix a misspecified response curve ([[Shape of the Marketing Response Function]]).
^ex-why-larger-samples-hurt

## Connections

- Bootstrapping a single selected model ignores model-selection uncertainty, one face of the [[Garden of Forking Paths]]. MCR's bootstrap over the *Rashomon set* partly restores it.
- Simulation-design checklist: [[Designing Simulated-Data Experiments]], [[Simulation Studies for Evaluating Statistical Methods (ADEMP)]], [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]. The paper reports no Monte Carlo SEs for coverage and gives no explicit number of simulation repetitions in the text.
- Coverage under misspecification is a recurring validation theme: [[Cross Validation Checking]], [[Simulation-Based Calibration - Overview]].

## See Also
- [[Model Class Reliance - Recidivism Case Study]]: the same bootstrap applied to real data
- [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]]: why theory alone is not used for CIs
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
