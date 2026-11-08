---
title: "Cinelli Hazlett 2020 - Darfur Application and Reporting"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Sec. 2, 5.1-5.3, pp. 3-4, 16-20; Table 1; Figs. 2-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]]"
  - "[[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]]"
aliases:
  - Darfur sensitivity example
  - minimal reporting for sensitivity
---

# Cinelli Hazlett 2020 - Darfur Application and Reporting

> [!summary]
> Applied to Hazlett's (2019) Darfur study, the toolkit shows that being directly harmed raises pro-peace attitudes by 0.097 and that a confounder would need to explain 13.9% of the residual variance of *both* treatment and outcome (7.6% for losing significance) to explain it away. A confounder as strong as `Female` (bound $R^2_Y=12\%$, $R^2_D=1\%$) cannot; three times as strong lowers the effect to about a third and takes the $t$-value below 2.

## Overview

**Setting (Sec. 2).** Villages in Darfur were attacked from 2003 with aerial bombing and Janjaweed raids. Within a village, violence was arguably indiscriminate, except that women were targeted for sexual assault. The investigator claims village and gender suffice for adjustment and runs

$$\text{PeaceIndex}=\hat\tau_{res}\,\text{DirectHarm}+\hat\beta_f\,\text{Female}+\text{Village}\,\hat\beta_v+X\hat\beta+\hat\varepsilon_{res}\qquad(1)$$

with controls age, farmer/herder/merchant indicators, household size, past voting. A critic proposes a missing `Center` indicator (model 2), or more complex stories about Wealth and Political Attitudes acting non-linearly. Sample: $df=783$.

## Main Content

### Minimal reporting (Sec. 5.1, Table 1)
Proposed additions to a regression table: $R^2_{Y\sim D|X}$, $RV$, $RV_{\alpha=0.05}$, and bounds.

| Treatment | Est. | SE | $t$ | $R^2_{Y\sim D|X}$ | $RV$ | $RV_{\alpha=0.05}$ |
|---|---|---|---|---|---|---|
| Directly Harmed | 0.097 | 0.023 | 4.18 | 2.2% | 13.9% | 7.6% |

Bound (Z as strong as `Female`): $R^2_{Y\sim Z|D,X}=12\%$, $R^2_{D\sim Z|X}=1\%$.

Reading the table:
- $RV=13.9\%$: confounders explaining at least 13.9% of both residual variances can erase the point estimate; those explaining less than 13.9% on both cannot.
- $RV_\alpha=7.6\%$: about half as strong suffices to lose 5% significance.
- $R^2_{Y\sim D|X}=2.2\%$: extreme scenario. Even a confounder explaining all residual outcome variance needs $\ge2.2\%$ of residual treatment variance to erase the effect; the `Female` bound (1%) is below that.
- Because $12\%<13.9\%$ and $1\%<2.2\%$, a `Female`-strength confounder cannot fully explain away the estimate.

### Sensitivity contour plots (Sec. 5.2, Fig. 2)
Axes: partial $R^2$ of confounder with treatment (x) and outcome (y). Contours show the adjusted estimate (Fig. 2a) or $t$ (Fig. 2b). The 45-degree-line crossing of the zero contour *is* the RV. Reference points: $1\times,2\times,3\times$ `Female`.

| Benchmark | $R^2_{D\sim Z|X}$ | $R^2_{Y\sim Z|D,X}$ | Adjusted estimate (paper) | $t$ (paper) |
|---|---|---|---|---|
| unadjusted | 0 | 0 | 0.097 | 4.2 |
| 1x Female | 1% | 12% | about 77% of 0.097 (0.08) | 3.44 |
| 2x Female | 2% | 24% | about 55% (0.05) | 2.6 |
| 3x Female | 3% | 36% | about 32% (0.03) | 1.63 |

Interpretation: the sign is robust even at $3\times$; statistical significance is robust at $1\times$ and $2\times$, but not guaranteed at $3\times$. The question moves from "is any confounding possible?" to "could confounders three times as strong as `Female` exist, and what are they?".

### Extreme scenarios (Sec. 5.3, Fig. 3)
Curves of the adjusted estimate against $R^2_{D\sim Z|X}$ for $R^2_{Y\sim Z|D,X}\in\{100\%,75\%,50\%\}$. The 100% curve hits zero at $R^2_{D\sim Z|X}=2.2\%$, above the red ticks for $1\times$ and $2\times$ `Female`. Useful when the analyst can limit the confounder's association with treatment (a known assignment process) but not its association with the outcome.

### Caveats stated in the paper
- Exact for one linear confounder; conservative for many ([[Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders]]).
- Domain knowledge is needed for the claim "gender was probably the strongest determinant of targeting"; without it the benchmark is not informative.

## Examples

```python
# Reproduce the Darfur Table 1 row and the 1x-3x Female contour points
import numpy as np
from scipy import stats
tau, se, df = 0.097, 0.023, 783
t = tau/se
f = t/np.sqrt(df)
rv = lambda f: 0.5*(np.sqrt(f**4 + 4*f**2) - f**2)
fa = stats.t.ppf(0.975, df-1)/np.sqrt(df-1)
print("t", round(t,2), "R2_YD|X", round(t**2/(t**2+df),3),
      "RV", round(rv(f),3), "RV_alpha", round(rv(f-fa),3))
```

Output: $t=4.22$ (the paper's 4.18 uses unrounded inputs), $R^2_{Y\sim D|X}\approx2.2\%$, $RV\approx0.14$, $RV_\alpha\approx0.077$.

## Connections

- Marketing analogue: report $RV$ and $R^2_{Y\sim D|X}$ for a regression estimate of an ad effect; see [[Observational vs Experimental Methods in Advertising]].
- Uses [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] and [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]].

## See Also

[[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]], [[Sensitivity Analysis in Observational Studies]]
