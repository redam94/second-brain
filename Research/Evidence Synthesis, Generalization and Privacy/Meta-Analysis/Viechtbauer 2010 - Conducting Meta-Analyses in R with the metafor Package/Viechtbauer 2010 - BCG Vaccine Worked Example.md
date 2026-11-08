---
title: "Viechtbauer 2010 - BCG Vaccine Worked Example"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 3.2 (pp. 9-11) and Sec. 3.4 (pp. 13-21), Figures 1-2"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - Effect Size Measures and escalc]]"
  - "[[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]"
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
used_by:
  - "[[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]]"
  - "[[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]]"
aliases:
  - BCG vaccine meta-analysis
  - dat.bcg example
  - Colditz 1994 BCG data
---

# Viechtbauer 2010 - BCG Vaccine Worked Example

> [!summary]
> Thirteen trials of the BCG tuberculosis vaccine (Colditz et al. 1994) run through the whole metafor workflow. The random-effects model gives an average relative risk of 0.49 (95% CI 0.34 to 0.70) with very high heterogeneity ($I^2=92\%$); absolute latitude of the trial site explains most of it, with efficacy increasing away from the equator. All key numbers below were independently reproduced in Python.

## Overview

The data object `dat.bcg` holds treated (vaccinated) and control TB-positive/negative counts, absolute latitude (`ablat`) and allocation method (`alloc`). Outcome: log relative risk (negative = fewer infections among vaccinated). Rationale for latitude: non-pathogenic environmental mycobacteria near the equator may give natural protection (Ginsberg 1998).

## Main Content

### Data and effect sizes (Sec. 3.2)

| Trial | Author, year | tpos | tneg | cpos | cneg | ablat | alloc | $y_i$ | $v_i$ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Aronson 1948 | 4 | 119 | 11 | 128 | 44 | random | -0.8893 | 0.325585 |
| 2 | Ferguson & Simes 1949 | 6 | 300 | 29 | 274 | 55 | random | -1.5854 | 0.194581 |
| 3 | Rosenthal et al 1960 | 3 | 228 | 11 | 209 | 42 | random | -1.3481 | 0.415368 |
| 4 | Hart & Sutherland 1977 | 62 | 13536 | 248 | 12619 | 52 | random | -1.4416 | 0.020010 |
| 5 | Frimodt-Moller et al 1973 | 33 | 5036 | 47 | 5761 | 13 | alternate | -0.2175 | 0.051210 |
| 6 | Stein & Aronson 1953 | 180 | 1361 | 372 | 1079 | 44 | alternate | -0.7861 | 0.006906 |
| 7 | Vandiviere et al 1973 | 8 | 2537 | 10 | 619 | 19 | random | -1.6209 | 0.223017 |
| 8 | TPT Madras 1980 | 505 | 87886 | 499 | 87892 | 13 | random | 0.0120 | 0.003962 |
| 9 | Coetzee & Berjak 1968 | 29 | 7470 | 45 | 7232 | 27 | random | -0.4694 | 0.056434 |
| 10 | Rosenthal et al 1961 | 17 | 1699 | 65 | 1600 | 42 | systematic | -1.3713 | 0.073025 |
| 11 | Comstock et al 1974 | 186 | 50448 | 141 | 27197 | 18 | systematic | -0.3394 | 0.012412 |
| 12 | Comstock & Webster 1969 | 5 | 2493 | 3 | 2338 | 33 | systematic | 0.4459 | 0.532506 |
| 13 | Comstock et al 1976 | 27 | 16886 | 29 | 17825 | 33 | systematic | -0.0173 | 0.071405 |

Except for two trials (8 and 12, with positive log RR), all point to protection (trial 13 is essentially null at -0.017).

### Random-effects model (REML)

Output: $\hat\tau^2=0.3132$ (SE 0.1664), $\hat\tau=0.5597$, $I^2=92.22\%$, $H^2=12.86$, $Q(12)=152.2330$ ($p<.0001$). Model results: $\hat\mu=-0.7145$, SE 0.1798, $z=-3.9744$, 95% CI $[-1.0669,-0.3622]$. Back-transformed: $\exp(\hat\mu)=0.49$ (0.34 to 0.70), "the risk of a tuberculosis infection in vaccinated individuals is on average half as large". `confint()` gives $\tau^2$ [0.1197, 1.1115], $\tau$ [0.3460, 1.0543], $I^2$ [81.92, 97.68]%, $H^2$ [5.53, 43.07]: wide, "we should not give too much credence to the exact point estimates".

**Credibility interval** (`predict(res, transf=exp)`): 0.49 with CI 0.34 to 0.70 and credibility (prediction) interval 0.15 to 1.55 for the relative risk in a new trial (footnote 3: computed treating $\tau^2$ as known, "A method for calculating a credibility interval that accounts for the uncertainty in the estimate of $\tau^2$ will be implemented in the future"). Reproduced: $\exp(\hat\mu\pm1.96\sqrt{\hat\tau^2+\text{SE}^2})=(0.155,1.549)$.

**Figure 1 (forest plot)** shows per-trial RR [95% CI], e.g. Hart & Sutherland 0.24 [0.18, 0.31], TPT Madras 1.01 [0.89, 1.14], Comstock & Webster 1.56 [0.37, 6.53], and the RE polygon 0.49 [0.34, 0.70] on a log axis (0.05 to 4).

### Mixed-effects model: latitude and year

`rma(yi, vi, mods = ~ ablat + year)` gives residual $\hat\tau^2=0.1108$ (SE 0.0845), $\hat\tau=0.3328$, $Q_E(10)=28.3251$ ($p=0.0016$), $Q_M(2)=12.2043$ ($p=0.0022$).

| Term | Estimate | SE | $z$ | $p$ | 95% CI |
|---|---|---|---|---|---|
| intercept | -3.5455 | 29.0959 | -0.1219 | 0.9030 | -60.5724, 53.4814 |
| ablat | -0.0280 | 0.0102 | -2.7371 | 0.0062 | -0.0481, -0.0080 |
| year | 0.0019 | 0.0147 | 0.1299 | 0.8966 | -0.0269, 0.0307 |

Share of heterogeneity explained: $(0.3132-0.1108)/0.3132=65\%$. Only latitude matters: one more degree of absolute latitude changes the mean log RR by about -0.03. The residual test is still significant, suggesting other unmodelled moderators.

**Predicted RR by latitude (year = 1970)** (`predict(..., newmods=cbind(seq(10,60,10),1970), transf=exp)`):

| Latitude | Pred RR | 95% CI | Credibility interval |
|---|---|---|---|
| 10 | 0.9345 | 0.5833, 1.4973 | 0.4179, 2.0899 |
| 20 | 0.7062 | 0.5149, 0.9686 | 0.3421, 1.4579 |
| 30 | 0.5337 | 0.4196, 0.6789 | 0.2663, 1.0697 |
| 40 | 0.4033 | 0.2956, 0.5502 | 0.1958, 0.8306 |
| 50 | 0.3048 | 0.1916, 0.4848 | 0.1369, 0.6787 |
| 60 | 0.2303 | 0.1209, 0.4386 | 0.0921, 0.5761 |

Interpretation: no detectable protection near the equator (10 degrees: CI includes 1), more than halved risk at 40 degrees, about a quarter at 60 degrees. Figure 2 plots observed RR (bubble size inversely proportional to SE) against latitude, with studies 4, 7, 12 and 13 labelled for later diagnostics ([[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]]).

### Categorical moderator: allocation method

Separate means (no intercept): random -0.9658 (SE 0.2672, $p=0.0003$), alternate -0.5180 (0.4412, $p=0.2404$), systematic -0.4289 (0.3449, $p=0.2137$). Reparameterised with intercept = random: alternate vs random +0.4478 (SE 0.5158), systematic vs random +0.5369 (0.4364); omnibus $Q_M(2)=1.7675$, $p=0.4132$. So allocation method does not significantly moderate efficacy, even though only random allocation shows a significant effect alone. This illustrates the fallacy of comparing "significant in one subgroup, not in another" instead of testing the difference.

### Knapp-Hartung and a Type I error check

Model `~ factor(alloc) + ablat`, `knha=TRUE`: see [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]] for numbers ($F(3,9)=3.4471$, $p=0.0650$; ablat $p=0.0186$). Simulation: draw a standard-normal moderator unrelated to the outcome 10,000 times, regress with DL estimation, record $p$: empirical Type I error about 0.09 without and 0.06 with `knha=TRUE` (nominal 0.05).

## Examples

> [!example] Independent reproduction of the headline numbers
> The block below recomputes $y_i,v_i$ from the counts and reproduces $\hat\tau^2_{REML}=0.3132$, $\hat\mu=-0.7145$ (SE 0.1798), $I^2=92.22\%$, $H^2=12.86$, the BLUPs ($-0.8002,-1.2517,\dots,-0.1467$) and the latitude+year meta-regression ($\hat\tau^2=0.1108$, $\hat\beta_{ablat}=-0.0280$, $Q_E=28.325$). A HKSJ-style $t$ interval with REML weights (computed here, not in the paper) is $[-1.108,-0.321]$, RR 0.33 to 0.73, slightly wider than the Wald interval.
^ex-bcg-reproduction

```python
import numpy as np
from scipy import optimize
tp=np.array([4,6,3,62,33,180,8,505,29,17,186,5,27]); tn=np.array([119,300,228,13536,5036,1361,2537,87886,7470,1699,50448,2493,16886])
cp=np.array([11,29,11,248,47,372,10,499,45,65,141,3,29]); cn=np.array([128,274,209,12619,5761,1079,619,87892,7232,1600,27197,2338,17825])
n1, n2 = tp+tn, cp+cn
y = np.log(tp/n1) - np.log(cp/n2)
v = 1/tp - 1/n1 + 1/cp - 1/n2
nll = lambda t: .5*(np.log(v+t).sum() + np.log((1/(v+t)).sum())
                    + ((y - ((y/(v+t)).sum()/(1/(v+t)).sum()))**2/(v+t)).sum())
tau2 = optimize.minimize_scalar(nll, bounds=(0,5), method="bounded").x       # 0.3132
w = 1/(v+tau2); mu = (w*y).sum()/w.sum(); se = w.sum()**-.5                  # -0.7145, 0.1798
print(tau2, mu, se, np.exp(mu), np.exp(mu-1.96*se), np.exp(mu+1.96*se))      # RR 0.49 [0.34, 0.70]
lam = tau2/(tau2+v); blup = lam*y + (1-lam)*mu                                # shrinkage toward mu
```

## Connections

- The BCG story (heterogeneity driven by a moderator, with a pooled average masking it) is the template for pooling marketing experiments: a pooled "average iROAS" across channels or geographies can be uninformative, and a meta-regression on a moderator such as baseline awareness may carry the signal. See [[Marketing Generalizations Overview]].
- Compare with the Bayesian re-analysis style in [[Roever 2020 - Pediatric Liver Transplant Worked Example]].

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]]
