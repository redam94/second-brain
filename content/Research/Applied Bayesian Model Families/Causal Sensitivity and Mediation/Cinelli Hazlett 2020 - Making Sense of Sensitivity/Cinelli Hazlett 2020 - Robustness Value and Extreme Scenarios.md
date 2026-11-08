---
title: "Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 4.3, 5.3, pp. 11-13, 19-20; Eqs. 18-20; Supp. A.2-A.5, Supp. D Table 2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Darfur Application and Reporting]]"
  - "[[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]]"
aliases:
  - robustness value
  - RV
  - extreme scenario sensitivity
  - partial R2 of treatment with outcome
---

# Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios

> [!summary]
> The **robustness value** $RV_q$ is the single partial-$R^2$ a confounder must have with *both* treatment and outcome to cut the estimate by $100q\%$; $RV_{q,\alpha}$ adds the requirement that significance be lost. The **extreme-scenario** statistic $R^2_{Y\sim D|X}$ is the minimal treatment partial $R^2$ of a confounder that explains *all* residual outcome variance and still zeroes the effect. Both come from $t$ and $df$ alone.

## Overview

Both measures are consequences of the relative-bias identity $\text{rel. bias}=BF/|f_{Y\sim D|X}|$ ([[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas#^thm-relative-bias|relative bias theorem]]). Throughout, $f_{Y\sim D|X}=t_{\hat\tau_{res}}/\sqrt{df}$.

## Main Content

> [!definition] Robustness value (Eq. 18)
> Let $f_q:=q\,|f_{Y\sim D|X}|$. The **robustness value** for a proportional reduction $q$ of the point estimate is
> $$
> RV_q=\tfrac12\left(\sqrt{f_q^4+4f_q^2}-f_q^2\right).
> $$
> A confounder with $R^2_{Y\sim Z|D,X}=R^2_{D\sim Z|X}=RV_q$ reduces $\hat\tau_{res}$ by exactly $100q\%$. Any confounder with *both* partial $R^2$ below $RV_q$ cannot. $RV\equiv RV_{q=1}$ (bring the estimate to zero).
^def-robustness-value

*Derivation (Supp. A.2).* Set $R^2_{Y\sim Z|D,X}=R^2_{D\sim Z|X}=RV$. Then $BF=\sqrt{RV}\cdot\sqrt{RV/(1-RV)}$ must equal $f_q$. Squaring, $RV^2=f_q^2(1-RV)$, i.e. $RV^2+f_q^2RV-f_q^2=0$ (Eq. 34); the positive root is Eq. 35. Because $BF$ is increasing in both arguments, anything below the diagonal point is also insufficient.

> [!definition] Robustness value with statistical significance (Eqs. 19-20)
> With $t^*_{\alpha,df-1}$ the critical $t$ and $f_{\alpha,df-1}:=|t^*_{\alpha,df-1}|/\sqrt{df-1}$, define $f_{q,\alpha}:=f_q-f_{\alpha,df-1}$.
> If $f_{q,\alpha}<0$ then $RV_{q,\alpha}=0$; otherwise
> $$
> RV_{q,\alpha}=\tfrac12\left(\sqrt{f_{q,\alpha}^4+4f_{q,\alpha}^2}-f_{q,\alpha}^2\right).
> $$
> A confounder with both partial $R^2$ equal to $RV_{q,\alpha}$ makes the adjusted test fail to reject $H_0:\tau=(1-q)|\hat\tau_{res}|$ at level $\alpha$ (equivalently the $1-\alpha$ CI covers $(1-q)|\hat\tau_{res}|$).
^def-robustness-value-alpha

Caveats (Supp. A.4): because a confounder lowers residual variance of $Y$ (VRF), a larger $R^2_{Y\sim Z|D,X}$ can *help* significance. The "nothing weaker on both axes can overturn" guarantee holds when $RV_{q,\alpha}>1-1/f_q^2$ (Eq. 46), which usually holds, e.g. for $q=1$ whenever $R^2_{Y\sim D|X}\le50\%$. Otherwise set $RV_{q,\alpha}=(f_q^2-f^{*2}_{\alpha,df-1})/(1+f_q^2)$ (Eq. 48). As $df\to\infty$, $RV_{q,\alpha}\to RV_q$; with $t^*=0$ it equals $RV_q$.

> [!theorem] Extreme-scenario interpretation of $R^2_{Y\sim D|X}$
> If a confounder explains all residual outcome variance ($R^2_{Y\sim Z|D,X}=1$), it brings the estimate to zero iff $R^2_{D\sim Z|X}\ge R^2_{Y\sim D|X}$. So $R^2_{Y\sim D|X}=t^2/(t^2+df)$ is the minimal treatment association such a worst-case confounder must have.
^thm-extreme-scenario

*Proof (Supp. A.2).* Set $q=1$, $R^2_{Y\sim Z|D,X}=1$ in $BF=|f_{Y\sim D|X}|$: $f_{D\sim Z|X}=|f_{Y\sim D|X}|$, i.e. $R^2_{D\sim Z|X}/(1-R^2_{D\sim Z|X})=R^2_{Y\sim D|X}/(1-R^2_{Y\sim D|X})$, hence the partial $R^2$ values coincide.

For intermediate cases the paper plots curves of the adjusted estimate against $R^2_{D\sim Z|X}$ for $R^2_{Y\sim Z|D,X}\in\{100\%,75\%,50\%\}$ (Fig. 3).

### Bias factor table (Supp. D, Table 2)
Reading: compute $|f|=t/\sqrt{df}$. To zero the estimate, $BF>|f|$; for a change of $100q\%$ use $q|f|$. For Darfur $|f|\approx0.15$: $R^2_{D\sim Z|X}=5\%,\,R^2_{Y\sim Z|D,X}=40\%$ gives $BF=0.145<0.15$ (robust) but $R^2_{D\sim Z|X}=40\%,\,R^2_{Y\sim Z|D,X}=5\%$ gives $0.183>0.15$ (not robust). Excerpt (rows: $R^2_{D\sim Z|X}$, columns $R^2_{Y\sim Z|D,X}$):

| $R^2_D \backslash R^2_Y$ | 5% | 10% | 20% | 40% | 60% | 80% |
|---|---|---|---|---|---|---|
| 5% | 0.051 | 0.073 | 0.103 | 0.145 | 0.178 | 0.205 |
| 10% | 0.075 | 0.105 | 0.149 | 0.211 | 0.258 | 0.298 |
| 20% | 0.112 | 0.158 | 0.224 | 0.316 | 0.387 | 0.447 |
| 40% | 0.183 | 0.258 | 0.365 | 0.516 | 0.632 | 0.730 |

### Frank (2000) impact thresholds for non-zero nulls (Supp. A.5)
Counterexample: no $X$, standardised variables, $n=1000$, $\hat\tau_{res}=0.5$, $\text{se}=0.0274$, target $\hat\tau=-0.5$ (relative bias 2). Solving with $R_{Y\sim Z}=R_{D\sim Z}$ gives impact $2/3$, but a confounder with impact as low as $0.51$ also works, so impact thresholds do not generalise beyond the zero null; the RV does.

## Examples

> [!example] Darfur robustness value
> $t=4.18$, $df=783$: $f=4.18/\sqrt{783}=0.1494$, $RV=\tfrac12(\sqrt{0.1494^4+4\cdot0.1494^2}-0.1494^2)=0.1386\approx13.9\%$. With $\alpha=0.05$: $t^*_{0.05,782}=1.963$, $f_{\alpha}=1.963/\sqrt{782}=0.0702$, $f_{1,\alpha}=0.0792$, giving $RV_\alpha=7.7\%$ (paper 7.6%). $R^2_{Y\sim D|X}=4.18^2/(4.18^2+783)=2.2\%$.
^ex-darfur-rv

```python
import numpy as np
from scipy import stats
def rv(t, df, q=1.0, alpha=None):
    f = q*abs(t)/np.sqrt(df)
    if alpha is not None:
        f -= stats.t.ppf(1-alpha/2, df-1)/np.sqrt(df-1)
        if f <= 0: return 0.0
    return 0.5*(np.sqrt(f**4+4*f**2)-f**2)
print(rv(4.18,783), rv(4.18,783,alpha=.05), 4.18**2/(4.18**2+783))
```

## Connections

- E-value comparison: [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]].
- Use of the RV with expert bounds: [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]].
- Marketing use (e.g. is a brand-lift or MMM coefficient robust?): [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]].

## See Also

[[Sensitivity Analysis in Observational Studies]], [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
