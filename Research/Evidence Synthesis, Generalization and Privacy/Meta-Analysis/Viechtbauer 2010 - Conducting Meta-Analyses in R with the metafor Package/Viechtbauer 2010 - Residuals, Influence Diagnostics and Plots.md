---
title: "Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 3.5, pp. 21-29 (Table 1; Figures 3-7)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
used_by:
  - "[[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]]"
aliases:
  - metafor influence diagnostics
  - externally standardized residuals in meta-analysis
  - radial Galbraith plot
  - leave-one-out meta-analysis
---

# Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots

> [!summary]
> Because studies differ in precision, outliers and influential cases must be judged relative to each study's standard error. metafor adapts regression diagnostics (externally standardized residuals, DFFITS, Cook's distance, covariance ratios, DFBETAS, leave-one-out $\hat\tau^2$ and $Q_E$, hat values, weights) and offers forest, funnel, radial and normal Q-Q plots. On BCG, studies 7 and 13 are outlying but only modestly influential, while study 4 is the most influential through high leverage.

## Overview

Table 1 of the paper lists every function available on a fitted `rma.uni` object. It is reproduced here because it is the package's API map.

| Function | Description |
|---|---|
| `print()`, `summary()` | standard print; alternative that adds fit statistics |
| `coef()`, `vcov()` | coefficients with SEs, test statistics, $p$, CI; covariance matrix |
| `fitstats()` | (restricted) log-likelihood, deviance, AIC, BIC |
| `fitted()`, `predict()` | fitted/predicted values (with CIs, also for new data) |
| `blup()` | best linear unbiased predictions of true outcomes |
| `residuals()`, `rstandard()`, `rstudent()` | raw, internally standardized, externally standardized (studentized deleted) residuals |
| `hatvalues()`, `weights()` | hat-matrix diagonal; fitting weights |
| `influence()`, `leave1out()` | case/deletion diagnostics; leave-one-out for FE/RE models |
| `forest()`, `funnel()`, `radial()`, `qqnorm()`, `plot()`, `addpoly()` | graphics |
| `ranktest()`, `regtest()`, `trimfill()` | funnel asymmetry tests, trim and fill |
| `confint()` | CI for (residual) heterogeneity (and for coefficients) |
| `cumul()` | cumulative meta-analysis |
| `anova()`, `permutest()` | model comparison (LRT), permutation tests |

## Main Content

### Residuals

> [!definition] Standardized residuals
> `residuals()` gives raw residuals; `rstandard()` the internally and `rstudent()` the externally standardized (studentized deleted) residuals. If a study fits the model, its standardized residual is asymptotically $N(0,1)$. A large value flags a study that does not fit. The size of a residual must be judged against the precision of that study's predicted effect, the residual heterogeneity and the sampling variability, which is hard to do by eye.
^def-standardized-residuals

For the BCG mixed model (latitude + year), `rstudent` returns, for example: study 1 $z=0.2978$; study 4 $-1.4032$; study 7 $-2.5961$; study 12 $1.4677$; study 13 $2.1302$. Studies 7 and 13 have "large" residuals. Study 12 deviates a lot but is the least precise study, so its standardized residual is moderate.

### Influence diagnostics (`influence()`)

Returns: externally standardized residuals, DFFITS, Cook's distances, covariance ratios, DFBETAS, $\hat\tau^2$ with each study removed in turn (`tau2.del`), the residual-heterogeneity statistic with each removed (`QE.del`), hat values and weights in percent. `plot(inf, plotdfb=TRUE)` yields two figure pages (Fig. 3 plus DFBETAS).

> [!example] Reading Figure 3 (BCG, latitude + year)
> Studies 7 and 13 add residual heterogeneity (removing either gives much smaller $\hat\tau^2$) but have modest influence on fit (small Cook's distance). Study 4 barely changes residual heterogeneity but has large Cook's distance and hat value (coloured red); a plot of latitude against year (`plot(dat$ablat, dat$year)`) shows why: it is the late, high-latitude trial, a high-leverage point in covariate space.
^ex-influence-bcg

### Leave-one-out analysis

For models without moderators `leave1out()` refits dropping each study. For BCG (RE model, `transf=exp`) the pooled RR stays between 0.452 (dropping TPT Madras, study 8) and 0.533 (dropping study 4):

| Dropped | RR | $Q$ | $\hat\tau^2$ | $I^2$ (%) | $H^2$ |
|---|---|---|---|---|---|
| 1 | 0.493 | 151.583 | 0.336 | 93.226 | 14.762 |
| 4 | 0.533 | 96.563 | 0.263 | 90.412 | 10.430 |
| 6 | 0.491 | 128.187 | 0.360 | 90.912 | 11.003 |
| 8 | 0.452 | 67.986 | 0.273 | 87.031 | 7.711 |
| 13 | 0.460 | 149.788 | 0.304 | 92.344 | 13.062 |

(rows 2, 3, 5, 7, 9-12 are in the paper; all have $p<0.001$ for the effect). No single study reverses the conclusion; study 8 (the largest trial, null effect) accounts for much of the heterogeneity ($Q$ falls from 152 to 68 without it).

### Plots

- **Forest plot** (`forest()`, Fig. 1 and 4): observed effects drawn proportional to precision, pooled polygon; `addpoly()` adds predicted effects, e.g. at 10, 30, 50 degrees latitude: RR 0.96 [0.67, 1.39], 0.54 [0.44, 0.66], 0.30 [0.21, 0.42] (Fig. 4).
- **Funnel plot** (`funnel()`, Fig. 5; Light and Pillemer 1984; Sterne and Egger 2001): observed outcomes (x) against standard error (y, reversed) with a pseudo-CI $\pm1.96\,\text{SE}$ around the model estimate; for moderator models the x-axis shows residuals centred at 0. Used to diagnose heterogeneity and some forms of publication bias.
- **Radial (Galbraith) plot** (`radial()`, Fig. 6; Galbraith 1988a,b, 1994): FE model plots $z_i=y_i/\sqrt{v_i}$ against $x_i=1/\sqrt{v_i}$, with an arc on the right projecting the line from the origin through a point onto the effect scale; RE model uses $\sqrt{v_i+\hat\tau^2}$ in both axes.
- **Normal Q-Q plot** (`qqnorm()`, Fig. 7; Wang and Bushman 1998): quantiles of externally standardized residuals against $N(0,1)$ quantiles, slope-1 line through the origin and a simulated pseudo-confidence envelope (`reps=1000`, Friedman supersmoother, `bass` 0 to 10).

## Examples

See the leave-one-out table above and the Figure 3 reading. A short recipe for "externally studentized residual" in the RE model, in Python:

```python
import numpy as np
def rstudent_re(y, v, tau2):
    k = len(y); out = []
    for i in range(k):
        m = np.arange(k) != i
        w = 1/(v[m]+tau2); mu_i = (w*y[m]).sum()/w.sum(); se2_i = 1/w.sum()
        out.append((y[i]-mu_i)/np.sqrt(v[i]+tau2+se2_i))   # tau2 held fixed (metafor re-estimates it per deletion)
    return np.array(out)
```

## Connections

- Marketing: the same screens apply to a portfolio of geo tests. A single large, precise test near zero (like TPT Madras) can drive heterogeneity, and leave-one-out tells you whether a conclusion such as "channel X is incremental" rests on one experiment.
- Influential-case logic is the frequentist counterpart of the robustness and prior-sensitivity checks emphasised in [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]].

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]]
