---
title: "Franks 2019 - Calibrating Sensitivity Parameters"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Sec. 5.1-5.2, pp. 17-21; Eqs. 15-18; Proposition 3 and proof (Appendix A, pp. 30-31); Examples 5-7; Fig. 4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Franks 2019 - Logistic Selection with Exponential Family Mixtures]]"
used_by:
  - "[[Franks 2019 - NHANES and Job Training Applications]]"
  - "[[Franks 2019 - Discussion Limits and Bayesian Sketch]]"
aliases:
  - calibration identity
  - implicit R-squared calibration
  - sign of sensitivity parameters
  - benchmarking sensitivity parameters against observed covariates
---

# Franks 2019 - Calibrating Sensitivity Parameters

> [!summary]
> The sign of $(\gamma_0,\gamma_1)$ says how potential outcomes are over- or under-represented among treated and control units; same-sign parameters bias the two arms in opposite directions so the ATE moves fast, opposite signs bias both arms the same way so it moves slowly. Magnitude is calibrated by the **implicit $R^2$** of the latent-logistic treatment model: choose a target partial variance explained by $Y(t)$ given $X$, equal to that of an important covariate $X_j$, and solve Proposition 3's identity $|\gamma_t|=\frac1{\sigma_{rt}}\sqrt{\frac{\rho^2_*}{1-\rho^2_*}(\text{Var}(m(X))+\pi^2/3)}$.

## Overview

For interpretation take $s(Y(t))=Y(t)$, so $f(T=1|Y(t),X)=\text{logit}^{-1}(\alpha_t(X)+\gamma_tY(t))$ and $\gamma_0,\gamma_1$ are scalars. Positive $\gamma_1$ means large $Y(1)$ is over-represented among the treated, so the observed treated mean exceeds the unobserved one; positive $\gamma_0$ means large $Y(0)$ is more likely to be treated, so the observed control mean is smaller than the unobserved one (see the sign-convention warning in [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]]).

## Main Content

### Interpreting signs (Sec. 5.1)

| Example | Story | Signs | ATE sensitivity |
|---|---|---|---|
| 5 same sign | expensive treatment, unobserved income $U$ raises both $P(T=1|U)$ and $Y(t)=\alpha+\tau t+\psi U+\varepsilon$, $\psi>0$ | $\gamma_0>0,\gamma_1>0$ | arm means biased in opposite directions: ATE changes **rapidly** |
| 6 opposite sign | "perfect doctor" (Rubin 2003) assigns the better arm; $Y(1)-Y(0)$ independent of $[Y(1)+Y(0)]/2$, e.g. independent normals | $\gamma_0<0,\gamma_1>0$ | both arm means biased the same way: ATE changes **slowly** |
| 7 single-arm | job-training: $U=1$ gives access to an alternative program (so less likely to enrol); $Y(0)=\alpha(X)+\psi U+\varepsilon$, $\psi>0$, $Y(1)=\alpha(X)+\tau+\varepsilon$ | $\gamma_1=0,\gamma_0<0$ | only the control mean is biased: **moderate** |

### Calibrating magnitude (Sec. 5.2.1)
Latent-variable form of the logistic treatment model: $Z=m(X)+\epsilon$, $\epsilon\sim\text{Logistic}(0,1)$, $T=1\{Z\ge0\}$ with $m(X)=\text{logit}(e(X))$. Because $\text{Var}(\epsilon)=\pi^2/3$, $\text{Var}(Z)=\text{Var}(m(X))+\pi^2/3$. Following Imbens (2003)'s "implicit $R^2$":

> [!definition] Variance explained by $X$ and partial variance explained by $Y(t)$ (Eqs. 15-16)
> $$
> \rho_X^2=\frac{\text{Var}(m(X))}{\text{Var}(m(X))+\pi^2/3},\qquad \rho^2_{Y(t)|X}=\frac{\rho^2_{X,Y(t)}-\rho_X^2}{1-\rho_X^2},
> $$
> the fraction of *previously unexplained* latent variance in $T$ that adding $Y(t)$ to the predictors explains. Both lie in $[0,1]$.
^def-implicit-r2

**Calibration rule.** Pick a target $\rho^2_*$ for the unidentified $\rho^2_{Y(t)|X}$ by analogy with an observed covariate: $\rho^2_*=\rho^2_{X_j|X_{-j}}$ (partial variance explained by $X_j$ given the rest), chosen by expertise. Alternatives: calibrate $\rho^2_{Y(t)|X_A}$ for a core subset $X_A\subset X$ (Sec. 6.2 uses $X_A=\emptyset$). This mirrors the "as strong as $X_j$" bounds of [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]], except it constrains the *potential outcome* rather than a latent confounder, and is robust to multicollinearity among the predictors (footnote 4 rejects calibrating $\gamma_t$ against regression coefficients, Oster 2017).

### Mapping to $\gamma_t$ (Sec. 5.2.2)

> [!theorem] Proposition 3 (calibration identity)
> Suppose $\text{logit}\,e(X,Y(t))$ is linear in $Y(t)$ as in (7), $m(X)=\text{logit}\,e(X)$ and $\sigma_{rt}=\sqrt{E[\text{Var}(Y(t)|X)]}$. Then
> $$
> \rho^2_{Y(t)|X}=\frac{\sigma_{rt}^2\gamma_t^2}{\text{Var}(m(X))+\pi^2/3+\sigma_{rt}^2\gamma_t^2}\quad(17),\qquad |\gamma_t|=\frac1{\sigma_{rt}}\sqrt{\frac{\rho^2_{Y(t)|X}}{1-\rho^2_{Y(t)|X}}\Big(\text{Var}(m(X))+\frac{\pi^2}{3}\Big)}\quad(18).
> $$
^prop-calibration-identity

*Proof (Appendix A).* Write $Y(t)=\mu_t(X)+R(t)$, $\tilde R(t)=R(t)/\sigma_{rt}$ (unit-scaled residual), $\tilde\gamma_t=\sigma_{rt}\gamma_t$, $\alpha_t^*(X)=\alpha_t(X)+\gamma_t\mu_t(X)$. Then $m(X,Y(t))=\alpha^*_t(X)+\tilde\gamma_t\tilde R(t)$, and since $\tilde R(t)$ is orthogonal to $\alpha_t^*(X)$ with unit variance, $\text{Var}(m(X,\tilde R(t)))=\text{Var}(m(X))+\tilde\gamma_t^2$. So $\rho^2_{X,Y(t)}=\frac{\text{Var}(m(X))+\tilde\gamma_t^2}{\text{Var}(m(X))+\tilde\gamma_t^2+\pi^2/3}$; substituting in (16) gives $\rho^2_{Y(t)|X}=1-\frac{\text{Var}(m(X))+\pi^2/3}{\text{Var}(m(X))+\pi^2/3+\tilde\gamma_t^2}$. Solving for $|\tilde\gamma_t|$ gives $|\tilde\gamma_t|=\sqrt{\frac{\rho_*^2}{1-\rho_*^2}(\text{Var}(m(X))+\pi^2/3)}$, then divide by $\sigma_{rt}$.

Practical notes: only $\text{Var}(m(X))$ (from any propensity model) and $\sigma_{rt}$ are needed. $\sigma_{rt}=\sigma_{rt}(\gamma_t)$ depends on $\gamma_t$ through the complete-data distribution; solve $\sigma_{rt}(\gamma_t)|\gamma_t|=\sqrt{\cdot}$ numerically unless observed and missing residual SDs coincide (e.g. normal model with $\psi_t=0$).

Fig. 4 plots $\gamma_t$ against $\rho^2_{Y|X}$ (monotone) for NHANES, with horizontal reference lines for the partial variance explained by age, BMI, insurance and pulse.

## Examples

> [!example] Numerical check of the identity
> Simulation without covariates ($X=\emptyset$, so $\text{Var}(m)=0$): $Y\sim N(1,2^2)$, latent $Z=-0.5+0.4Y+\epsilon$, $\epsilon\sim\text{Logistic}(0,1)$. Empirical $R^2(Z,Y)=0.1625$; Eq. 17 gives $\frac{(2\cdot0.4)^2}{\pi^2/3+(0.8)^2}=0.1629$.
^ex-calibration-check

```python
import numpy as np
def gamma_from_rho2(rho2, var_m, sigma_r):
    """Proposition 3 / Eq. 18: |gamma| for a target partial variance explained rho2 of the potential outcome."""
    return np.sqrt(rho2/(1-rho2)*(var_m + np.pi**2/3))/sigma_r

# JTPA setting of the paper: no covariates in the selection model => var_m = 0
# (the paper reports |gamma| ~ 0.1 for rho2 = 0.01 on log income; sigma_r here is a stand-in for the log-income SD)
print(gamma_from_rho2(0.01, 0.0, 1.8))
# NHANES: sigma_r*|gamma| = 0.52 for rho2 = 0.04 => |gamma_0| ~ 0.52/11.2 = 0.046, |gamma_1| ~ 0.52/10.9 = 0.048
print(0.52/11.2, 0.52/10.9)
```

## Connections

- The marketing analogue: "how much of the (log-odds of) ad delivery would a hidden targeting score have to explain beyond the observed features?" - an implicit-$R^2$ target set by an important observed feature such as past purchase.
- Compared with the OVB treatment: [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] (robustness value on $R^2$ scale).

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Franks 2019 - NHANES and Job Training Applications]]
