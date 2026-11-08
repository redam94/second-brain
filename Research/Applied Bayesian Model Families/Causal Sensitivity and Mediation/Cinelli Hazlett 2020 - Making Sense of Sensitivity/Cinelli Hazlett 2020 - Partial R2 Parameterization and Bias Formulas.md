---
title: "Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 4.1-4.2, pp. 8-11; Eqs. 7-17; Supp. A.1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]]"
  - "[[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]]"
  - "[[Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders]]"
aliases:
  - partial R2 omitted variable bias
  - bias factor
  - relative bias formula
---

# Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas

> [!summary]
> Re-expressing the OVB in terms of $R^2_{Y\sim Z|D,X}$ and $R^2_{D\sim Z|X}$ gives exact, scale-free formulas for the adjusted estimate and its standard error that need only $\text{se}(\hat\tau_{res})$ and $df$ from the regression table. The relative bias equals a **bias factor** $\left|R_{Y\sim Z|D,X}f_{D\sim Z|X}\right|$ divided by the treatment-outcome partial Cohen's $f$, so robustness is determined by identification strength, not by sample size.

## Overview

Notation: $R^2_{A\sim B|C}$ is the partial $R^2$ of $B$ for $A$ after controlling for $C$; it is symmetric: $R^2_{Z\sim D|X}=\text{cor}(Z^{\perp X},D^{\perp X})^2=R^2_{D\sim Z|X}$. Partial Cohen's $f^2=R^2/(1-R^2)$. $df$ is the residual degrees of freedom of the **restricted** regression actually run.

## Main Content

> [!theorem] OVB in partial-$R^2$ form (Eqs. 8, 12, 13)
> For a single omitted $Z$ (with $\hat\tau$ the full-model estimate),
> $$|\widehat{\text{bias}}|=\sqrt{\frac{R^2_{Y\sim Z|D,X}\,R^2_{D\sim Z|X}}{1-R^2_{D\sim Z|X}}}\;\frac{\text{sd}(Y^{\perp X,D})}{\text{sd}(D^{\perp X})}=\sqrt{\frac{R^2_{Y\sim Z|D,X}R^2_{D\sim Z|X}}{1-R^2_{D\sim Z|X}}}\;\sqrt{df}\;\widehat{\text{se}}(\hat\tau_{res})$$
> $$\widehat{\text{se}}(\hat\tau)=\widehat{\text{se}}(\hat\tau_{res})\sqrt{\frac{1-R^2_{Y\sim Z|D,X}}{1-R^2_{D\sim Z|X}}}\sqrt{\frac{df}{df-1}}$$
^thm-ovb-partial-r2

*Proof sketch (Eq. 7 and Supp. A).* Write $\hat\gamma=\text{cov}(Y^{\perp X,D},Z^{\perp X,D})/\text{var}(Z^{\perp X,D})$ (FWL again) and $\hat\delta=\text{cov}(D^{\perp X},Z^{\perp X})/\text{var}(D^{\perp X})$. Multiply: $\hat\gamma\hat\delta=\text{cor}(Y^{\perp X,D},Z^{\perp X,D})\,\text{cor}(D^{\perp X},Z^{\perp X})\,\dfrac{\text{sd}(Y^{\perp X,D})}{\text{sd}(D^{\perp X})}\cdot\dfrac{\text{sd}(Z^{\perp X})}{\text{sd}(Z^{\perp X,D})}$. The factor $\text{var}(Z^{\perp X,D})/\text{var}(Z^{\perp X})=1-R^2_{D\sim Z|X}$, which converts $\text{cor}(D,Z)$ to $\sqrt{R^2_{D\sim Z|X}/(1-R^2_{D\sim Z|X})}$. For the standard error, use $\text{se}(\hat\tau_{res})=\dfrac{\text{sd}(Y^{\perp X,D})}{\text{sd}(D^{\perp X})\sqrt{df}}$ and the analogous full-model expression, where adding $Z$ shrinks residual variance of $Y$ by $1-R^2_{Y\sim Z|D,X}$ and inflates the variance of $D^{\perp X}$-based precision by $1/(1-R^2_{D\sim Z|X})$.

> [!theorem] Relative bias and the bias factor (Eq. 14)
> With $f_{Y\sim D|X}=t_{\hat\tau_{res}}/\sqrt{df}$ the partial Cohen's $f$ of the treatment with the outcome,
> $$\text{relative bias}=\frac{|\widehat{\text{bias}}|}{|\hat\tau_{res}|}=\frac{\left|R_{Y\sim Z|D,X}\,f_{D\sim Z|X}\right|}{|f_{Y\sim D|X}|}=\frac{BF}{|f_{Y\sim D|X}|},\qquad BF:=|R_{Y\sim Z|D,X}\,f_{D\sim Z|X}|.$$
^thm-relative-bias

Consequences:
- Given a confounder (which fixes $BF$), robustness depends only on $f_{Y\sim D|X}$: "robustness to confounding is an identification problem, impervious to sample size". A large $t$ from large $n$ with small $R^2_{Y\sim D|X}$ is still fragile.
- **Asymmetry.** $R^2_{Y\sim Z|D,X}$ enters $BF$ with a bound of one; $f_{D\sim Z|X}$ is unbounded as $R^2_{D\sim Z|X}\to1$. This permits "extreme-scenario" analysis in which the confounder explains all residual outcome variance ([[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]]).

> [!theorem] Variance decomposition (Eq. 15)
> $$\frac{\widehat{\text{var}}(\hat\tau)}{\widehat{\text{var}}(\hat\tau_{res})}=\underbrace{(1-R^2_{Y\sim Z|D,X})}_{\text{VRF}}\times\underbrace{\frac{1}{1-R^2_{D\sim Z|X}}}_{\text{VIF}}\times\underbrace{\frac{df}{df-1}}_{\text{change in df}}.$$
^thm-variance-decomposition

A confounder reduces residual variance of $Y$ (VRF, helps precision) but inflates variance via collinearity with $D$ (VIF, hurts precision), and costs one degree of freedom.

### Equivalent parameterisations (Sec. 4.2)
- **Partial correlations**: square them to get partial $R^2$.
- **Not conditioning on $D$** (Eq. 16): given $R_{Y\sim Z|X}$ and $R_{D\sim Z|X}$,
  $$R_{Y\sim Z|D,X}=\frac{R_{Y\sim Z|X}-R_{Y\sim D|X}R_{D\sim Z|X}}{\sqrt{1-R^2_{Y\sim D|X}}\sqrt{1-R^2_{D\sim Z|X}}}.$$
  Useful because $D$ is usually post-treatment relative to $Z$, making $Y$-$Z$ association given $D$ awkward.
- **Added explanatory power** (Eq. 17): $R^2_{Y\sim Z|D,X}=\dfrac{R^2_{Y\sim D+X+Z}-R^2_{Y\sim D+X}}{1-R^2_{Y\sim D+X}}$, $R^2_{D\sim Z|X}=\dfrac{R^2_{D\sim X+Z}-R^2_{D\sim X}}{1-R^2_{D\sim X}}$ - how much would the full outcome and treatment regressions improve had $Z$ been included.
- **From $t$-values** (Supp. A.1): $R^2=t^2/(t^2+df)$, $f^2=t^2/df$.

## Examples

> [!example] Darfur with a confounder as strong as `Female`
> Inputs: $\hat\tau_{res}=0.097$, $\text{se}=0.023$, $df=783$, hypothesised $R^2_{Y\sim Z|D,X}=0.12$, $R^2_{D\sim Z|X}=0.01$.
> 1. $\sqrt{0.12\cdot0.01/0.99}=0.0348$.
> 2. Bias $=0.0348\times\sqrt{783}\times0.023=0.0224$, so $\hat\tau=0.097-0.0224=0.0746$ (77% of the original).
> 3. $\widehat{\text{se}}(\hat\tau)=0.023\sqrt{0.88/0.99}\sqrt{783/782}=0.0217$, giving $t\approx3.44$ (paper Fig. 2b: 3.44).
> For 2x and 3x ($R^2_{Y}=0.24,0.36$; $R^2_D=0.02,0.03$) the code below gives estimates 0.052 and 0.029 ($t$ 2.56, 1.56) vs the paper's 55% and 32% ($t$ 2.6, 1.63); the small gap is rounding of the printed inputs.
^ex-darfur-1x

```python
import numpy as np
def adjusted(tau, se, df, r2yz, r2dz):
    bias = np.sqrt(r2yz*r2dz/(1-r2dz))*np.sqrt(df)*se
    se_adj = se*np.sqrt((1-r2yz)/(1-r2dz))*np.sqrt(df/(df-1))
    return tau-bias, se_adj, (tau-bias)/se_adj
for k,(a,b) in enumerate([(.12,.01),(.24,.02),(.36,.03)],1):
    print(k, adjusted(0.097,0.023,783,a,b))
```

## Connections

- Relative bias formula underlies [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] (solve $BF=q|f|$ with equal partial $R^2$).
- Bounds on the two parameters from observed covariates: [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]].
- Predecessors on the raw scale: [[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]].

## See Also

[[Omitted Variables Bias]], [[Logic of Regression Adjustment]], [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
