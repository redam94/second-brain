---
title: "Franks 2019 - NHANES and Job Training Applications"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Sec. 6.1-6.2, pp. 21-28; Eqs. 19-28; Figs. 2-3; Appendix B (pp. 31-38, Figs. 4-5)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Franks 2019 - Calibrating Sensitivity Parameters]]"
used_by: []
aliases:
  - NHANES anti-hypertensive sensitivity
  - JTPA job training quantile sensitivity
  - BART sensitivity example
  - Dirichlet process zero-inflated sensitivity
---

# Franks 2019 - NHANES and Job Training Applications

> [!summary]
> Two applications show the framework with flexible models. (1) NHANES III: BART response surfaces with normal residuals; ATE of taking two or more anti-hypertensives on diastolic blood pressure is about $-0.7$ mmHg and insignificant under unconfoundedness, becomes $-5.6$ mmHg at calibrated same-sign selection $(\gamma_0,\gamma_1)=(0.03,0.05)$. (2) JTPA job training: a Dirichlet-process mixture for log income and a Bernoulli model for employment, with QTEs sensitive to both income and employment selection.

## Overview

Both examples use the logistic-mEF machinery of [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]], calibrate with [[Franks 2019 - Calibrating Sensitivity Parameters]], and report posterior bands over a grid of $(\gamma_0,\gamma_1)$.

## Main Content

### 6.1 NHANES III: anti-hypertensives and diastolic blood pressure
**Data/setup.** Third National Health and Nutrition Examination Survey (CDC 1997). Treatment $t=1$: taking two or more anti-hypertensive medications; outcome: diastolic blood pressure (mmHg). Covariates: race, gender, age, income, BMI, insurance, etc. Follows Dorie et al. (2016).

**Model.**
$$
f^{obs}_t(Y(t)|T=t,X)\sim N(\mu_t(X),\sigma_t^2),\ (\mu_t(X),\sigma_t^2)\sim\text{BART}(X|T=t)\ (19\text{-}20),\quad f(T|Y(t),X)\sim\text{Bern}(\text{logit}^{-1}(\alpha_t(X)+\gamma_tY(t)))\ (21).
$$
Missing outcomes: $N(\mu_t(X)+\gamma_t\sigma_t^2,\sigma_t^2)$ (22; strict-sign note in [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]]). Independent BART priors per arm for the mean surface and residual variance; unlike Dorie et al., BART models only the observed potential outcomes with no latent confounder inside BART. The complete-data marginal is the mixture over units (Eq. 23):
$$
f(Y(t))\approx\sum_{i:T_i=t}\tfrac1{N_t}N(\mu_t(X_i),\sigma_t^2)+\sum_{j:T_j=1-t}\tfrac1{N_{1-t}}N(\mu_t(X_j)+\gamma_t\sigma_t^2,\sigma_t^2).
$$

**Calibration.** BMI has partial variance explained $\rho^2_{X_{BMI}|X_{-BMI}}\approx0.04$. Residual SDs $\hat\sigma_{r0}\approx11.2$, $\hat\sigma_{r1}\approx10.9$; Eq. 18 gives $\sigma_{rt}|\gamma_t|\approx0.52$, i.e. $|\gamma_0|\approx0.046$, $|\gamma_1|\approx0.048$. The sensitivity analysis is limited to $|\gamma|$ up to this scale.

**Results (Fig. 2).**
| Setting | Posterior mean ATE (mmHg) | Notes |
|---|---|---|
| $\gamma_0=\gamma_1=0$ (unconfoundedness) | about $-0.7$ | 95% credible interval contains 0 ("NS") |
| diagonal $\gamma_0=\gamma_1=\gamma$ | changes fastest | the text says the ATE is "no longer significantly different from 0 when $\gamma=0.01$" (printed as is: the unconfounded ATE is already labelled NS, so the intended contrast is probably the opposite, significance appearing along the diagonal) |
| $(\gamma_0,\gamma_1)=(0.03,0.05)$ | about $-5.6$ | roughly half a marginal SD more extreme; $\rho^2_{Y(0)|X}\approx\rho^2_{\text{insurance}|X_{-ins}}$, $\rho^2_{Y(1)|X}\approx\rho^2_{BMI|X_{-BMI}}$ (Fig. 4) |
- Consistent with Examples 5-7: the ATE is far more sensitive to the magnitudes when $\gamma_0,\gamma_1$ have the same sign.
- QTEs (Fig. 2b): $\tau_q$ increases with $q$ for every setting, because the estimated treated residual variance exceeds the control one; consistent with treatment-effect heterogeneity beyond covariates (Ding et al. 2018). Still sensitive to the normality assumption on residuals, motivating 6.2.
- **Appendix B** (separation of observed-data model and sensitivity): alternative pooled BART specification $\mu_t(X)=\mu(t,X)$ with shared mean surface and residual variance $\sigma_{1-t}^2$ gives the **largest** effect size under unconfoundedness among the models tried; the Bayesian Causal Forest (Hahn et al. 2017) is also fit. Both effect size and significance are sensitive to the (testable) outcome model and (untestable) treatment selection (Dorie et al. 2016).

### 6.2 JTPA job training: zero-inflated income and quantile effects
**Data/setup.** Abadie, Angrist & Imbens (2002) Job Training Partnership Act randomised trial. Only individuals randomly assigned to treatment are used; compare participants ($T=1$) with non-participants ($T=0$). Selection bias is a clear concern by construction. Covariates are excluded from effect estimation (used only for calibration). Outcome: income $Y(t)$, zero for the unemployed ($W(t)=0$), and $\log Y(t)>0$ otherwise.

**Observed model: two-part Dirichlet-process mixture.**
$$
f^{obs}_t(\log Y_i(t)|T=t,W=1)\sim N(\mu_{it},\sigma_{it}^2),\ (\mu_{it},\sigma_{it})\sim G,\ G\sim DP(\alpha G_0)\ (24\text{-}26)
$$
with conjugate normal-inverse-gamma $G_0$, fitted with the `dirichletprocess` R package (truncated stick-breaking).

**Selection specification (separate for employed and unemployed).**
$$
f(T=t|\log Y(t),W(t)=1)\sim\text{logit}^{-1}(\beta_t+\gamma_t\log Y(t))\ (27),\qquad f(T=t|W(t)=0)\sim\text{logit}^{-1}(\alpha_t+\omega_t1\{W(t)=0\})\ (28).
$$
Missing log incomes remain a DP-mixture of normals with different component means and weights (as in Example 4); missing employment is Bernoulli with additive log-odds shift $\omega_t$ (as in Example 2). The slice analysed sets $\gamma_0=\gamma_1=\gamma$.

**Calibration.** For employed individuals the variance in $T$ explained by $X$ (race, marital status, gender, age, high school diploma) is $\rho^2_X\approx0.01$; with $\text{Var}(m(X_A=\emptyset))=0$, Eq. 18 gives $|\gamma_t|\approx0.1$. For the unemployed, $\rho^2_{W(t)}\approx0.015$ gives $|\omega_t|\approx0.5$.

**Results (Fig. 3).**
- The implied counterfactual distributions differ a lot: the fraction unemployed among missing control outcomes of treated units is roughly **twice as large for $\omega=-0.1$ as for $\omega=0.1$**; the lower tail of log income among the employed is especially sensitive.
- QTEs are zero at the lowest quantiles in all settings (point mass at 0 in both arms) and start to diverge at $q$ determined by the unemployment shares: for $\omega=0$ or $-0.4$, $f(W(1)=0)<f(W(0)=0)$, so the QTE rises from 0 at $q=f(W(1)=1)$; for $\omega=0.4$, $f(W(1)=0)>f(W(0)=0)$ and the QTE dips briefly negative at $q=f(W(0)=1)$.
- Income under treatment generally has larger quantiles than under control; only with very large selection, e.g. $(\gamma,\omega)=(0.1,0.4)$, do effects lose significance and shift slightly negative. QTE shapes resemble Abadie et al. (2002) but with larger impacts due to the artificial set-up.

## Examples

> [!example] Order-of-magnitude check of the NHANES sensitivity
> With residual SDs near 11 mmHg ($\sigma^2\approx121$), the strict-sign mean shifts of the *fully missing* arm are $+\gamma_0\sigma_0^2=0.03\times125\approx+3.8$ mmHg for controls and $-\gamma_1\sigma_1^2=-0.05\times119\approx-5.9$ mmHg for treated. They move the two complete-data means in opposite directions (so the ATE moves by their weighted sum, with weights equal to the unobserved shares), which is why same-sign settings are the fast direction. The paper's change from $-0.7$ to $-5.6$ ($-4.9$ mmHg) is within that range. This is an arithmetic sanity check, not a reproduction.

```python
import numpy as np
def ate_under_selection(mu1, mu0, p1, s1, s0, g1, g0):
    """Plug-in ATE for normal arms. mu1,mu0: observed arm means over their own units;
    p1: share treated; s1,s0: residual SDs; strict signs: missing treated mean = mu1 - g1*s1^2, missing control = mu0 + g0*s0^2."""
    e1 = p1*mu1 + (1-p1)*(mu1 - g1*s1**2)
    e0 = (1-p1)*mu0 + p1*(mu0 + g0*s0**2)
    return e1 - e0
print(ate_under_selection(0.0, 0.7, 0.2, 10.9, 11.2, 0.0, 0.0), ate_under_selection(0.0, 0.7, 0.2, 10.9, 11.2, 0.05, 0.03))
```

## Connections

- Zero-inflated, quantile effects: relevant for marketing outcomes with many zero-purchase users (e.g. brand-lift and conversion data, see [[Conversion Lift Studies on Ad Platforms]]).
- The job-training benchmark is the same family used in LaLonde-type comparisons: [[Experimental Benchmarks for Observational Ad Measurement]].
- BART and Dirichlet processes: [[Chipman 2010 - BART - Overview]], [[Teh 2010 - Dirichlet Process - Overview]].

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]]
