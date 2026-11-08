---
title: "IntHout 2014 - Converting DL Results to HKSJ Worked Examples"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Easy method for the conversion, Examples 1-2 (pp. 6-8), Tables 3-4; Appendix 3 and Tables 5-6 (p. 11)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]"
used_by:
  - "[[IntHout 2014 - Discussion, Limitations and Recommendations]]"
aliases:
  - post-hoc HKSJ conversion
  - zinc common cold meta-analysis example
  - HKSJ from published DL results
---

# IntHout 2014 - Converting DL Results to HKSJ Worked Examples

> [!summary]
> Given only a published DL forest plot (effect sizes $y_i$ and DL weights $w_i$, e.g. in percent), you can recompute a HKSJ interval and $p$-value by hand: form $\sum w_i(y_i-\bar y)^2/\sum w_i$, divide by $k-1$, take the square root for the SE, and use a $t_{k-1}$ quantile. For a zinc/common-cold review ($k=5$, $I^2=75\%$) this turns DL $p=0.04$ into HKSJ $p=0.16$; for a log-hazard-ratio example ($k=10$, $I^2=0$) the results barely change.

## Overview

The conversion applies to continuous outcomes and to log-transformed ratio outcomes (RR, OR, HR, Poisson rate). An Excel file (Additional file 1) and R code (Appendix 3) are provided. Only three columns are needed: study ID, study result $y_i$ and DL weight $w_i$.

## Main Content

### Recipe

> [!definition] Post-hoc HKSJ procedure (Examples 1-2)
> 1. **SE.** (a) With overall DL estimate $\bar y$, compute $w_i(y_i-\bar y)^2$ for each study. (b) Sum them and divide by $\sum w_i$. (c) Divide by $k-1$. This is the HKSJ variance of the pooled effect. (d) Square root = SE. (For ratio outcomes, work on the natural-log scale: $\ln y_i$, $\ln\bar y$.)
> 2. **CI.** Half-width = SE $\times\,t_{k-1,\,0.975}$ (Excel `TINV(0.05,k-1)`, SPSS `IDF.T(.975,k-1)`, SAS `tinv(.975,k-1)`); CI = $\bar y\pm$ half-width (exponentiate for ratios).
> 3. **$p$-value.** $t=\bar y/\text{SE}$; two-sided $p$ from $t_{k-1}$ (Excel `TDIST(|t|,k-1,2)`; SPSS `2*(1-CDF.T(|t|,k-1))`; SAS `cdf('T',t,k-1)`).
^def-conversion-recipe

### Example 1: continuous outcome (zinc for the common cold)

Cochrane review (Singh and Das 2011), outcome severity of cold symptoms, 513 participants, SMD. DL: 5 studies, $I^2=75.0\%$, $\tau^2=0.13$.

| Study | $y_i$ (SMD) | $w_i$ (DL) | $(y_i-\bar y)^2$ | $w_i(y_i-\bar y)^2$ |
|---|---|---|---|---|
| Kurugol 2006a | -0.04 | 24.0 | 0.1225 | 2.94 |
| Kurugol 2007 | -0.07 | 22.2 | 0.1024 | 2.27 |
| Petrus 1998 | -0.31 | 21.3 | 0.0064 | 0.14 |
| Prasad 2000 | -1.36 | 15.5 | 0.9409 | 14.58 |
| Prasad 2008 | -0.54 | 17.0 | 0.0225 | 0.38 |
| | $\bar y=-0.39$ | Sum 100.0 | | Sum 20.31 |

Steps: $20.31/100=0.2031$; $/(k-1)=0.2031/4=0.0508$; SE $=\sqrt{0.0508}=0.225$; $t_{4,0.975}=2.78$; half-width $2.78\times0.225=0.63$; CI $=-0.39\pm0.63=[-1.02,0.24]$; $t=-0.39/0.225=-1.73$; two-sided $p=0.16$.

| Method | Estimate | 95% CI | Test |
|---|---|---|---|
| DL | SMD -0.39 | [-0.77, -0.02] | $z=2.05$, $p=0.04$ |
| HKSJ | SMD -0.39 | [-1.02, 0.24] | $t=1.73$, df 4, $p=0.16$ |

"The results of the DL and HKSJ analyses differ substantially": significance disappears.

**R (metafor)**, Appendix 3: `y <- c(-0.04,-0.07,-0.31,-1.36,-0.54); w <- c(24.0,22.2,21.3,15.5,17.0); rma.uni(y, vi=1/w, method="FE", knha=TRUE)`. The DL weights are supplied as fixed-effect weights with `knha=TRUE`, so that the HKSJ adjustment is applied to random-effects weights; the resulting warnings ("HKSJ not meant to be used with fixed effects") can be ignored. Output (Table 5): estimate -0.3938, SE 0.2254, $t=-1.7473$, $p=0.1555$, CI $[-1.0195,0.2319]$ (the hand calculation rounds to 1.73 and 0.16).

### Example 2: log-transformed outcome (hazard ratio, post-remission therapy for adult ALL, donor vs no donor)

Cochrane review (Pidala et al. 2011). DL: 10 studies, $I^2=0.0$, $\tau^2=0.0$. DL pooled HR 0.86 [0.77, 0.97], $z=-2.48$, $p=0.013$.

| Study | HR $y_i$ | $w_i$ | $\ln y_i$ | $(\ln y_i-\ln\bar y)^2$ | $w_i(\cdot)^2$ |
|---|---|---|---|---|---|
| Cornelissen 2009 | 0.81 | 5.0 | -0.21 | 0.00 | 0.02 |
| De Witte 1994 | 0.67 | 2.1 | -0.40 | 0.06 | 0.13 |
| Fielding 2009 | 0.80 | 11.5 | -0.22 | 0.01 | 0.06 |
| Goldstone 2008 | 0.91 | 46.7 | -0.09 | 0.00 | 0.15 |
| Hunault 2004 | 0.56 | 2.9 | -0.58 | 0.18 | 0.53 |
| Labar 2004 | 0.98 | 9.3 | -0.02 | 0.02 | 0.16 |
| Ribera 2005 | 1.24 | 3.9 | 0.22 | 0.13 | 0.52 |
| Sebban 1994 | 0.75 | 12.7 | -0.29 | 0.02 | 0.24 |
| Takeuchi 2002 | 0.95 | 3.9 | -0.05 | 0.01 | 0.04 |
| Ueda 1998 | 0.66 | 2.0 | -0.42 | 0.07 | 0.14 |
| | $\bar y=0.86$ ($\ln=-0.15$) | Sum 100.0 | | | Sum 1.99 |

Steps: $1.99/100=0.0199$; $/(k-1)=0.0199/9=0.0022$; SE $=0.047$; $t_{9,0.975}=2.26$; half-width on ln scale $2.26\times0.047=0.106$; ln CI $-0.15\pm0.106=[-0.26,-0.04]$; HR CI $[e^{-0.26},e^{-0.04}]=[0.77,0.96]$; $t=-0.15/0.047=-3.19$; $p=0.011$.

| Method | HR | 95% CI | Test |
|---|---|---|---|
| DL | 0.86 | [0.77, 0.97] | $z=-2.48$, $p=0.013$ |
| HKSJ (hand) | 0.86 | [0.77, 0.96] | $t=-3.19$, df 9, $p=0.011$ |
| HKSJ (R, Table 6) | 0.8643 | [0.7772, 0.9613] | ln estimate -0.1458, SE 0.0470, $t=-3.1031$, $p=0.0127$ |

"The results of the DL and HKSJ analyses hardly differ", consistent with homogeneity ($I^2=0$). The small hand-versus-R gap ($p=0.011$ vs $0.0127$) comes from intermediate rounding of $\ln\bar y=-0.15$.

> [!example] Why HKSJ can be narrower than DL here (computed, not in the paper)
> The DL SE implied by the DL statistics is $|\ln\bar y|/|z|=0.1458/2.48=0.0588$ (also from the DL CI: $(\ln0.97-\ln0.77)/(2\times1.96)=0.0587$). The HKSJ SE is $0.0470$, so $q=(0.0470/0.0588)^2\approx0.64<1$: with $I^2=0$ the observed spread is smaller than the weights predict, so the HKSJ variance is smaller than the DL one. The larger $t_{9}$ quantile (2.26 vs 1.96) roughly cancels this: half-width $0.106$ vs $0.115$ on the log scale.
^ex-hr-q

## Examples

> [!example] Independent Python reproduction
> Both examples reproduce exactly: Example 1 gives $\bar y=-0.39377$, SE 0.22536, $t=-1.7473$, $p=0.15551$, CI $[-1.0195,0.2319]$, and weighted sum 20.31; Example 2 gives ln estimate -0.14580, SE 0.046985, $t=-3.1031$, $p=0.01266$, HR 0.8643 [0.7772, 0.9613].
^ex-hksj-reproduction

```python
import numpy as np
from scipy import stats
def hksj_from_dl(y, w, log_scale=False):
    y = np.log(y) if log_scale else np.asarray(y); w = np.asarray(w); k = len(y)
    yb = (w*y).sum()/w.sum(); var = (w*(y-yb)**2).sum()/((k-1)*w.sum()); se = var**.5
    tq = stats.t.ppf(.975, k-1); t = yb/se; p = 2*stats.t.sf(abs(t), k-1)
    ci = (yb-tq*se, yb+tq*se)
    return (np.exp(yb), np.exp(ci[0]), np.exp(ci[1]), t, p) if log_scale else (yb, *ci, t, p)
hksj_from_dl([-0.04,-0.07,-0.31,-1.36,-0.54], [24.0,22.2,21.3,15.5,17.0])               # (-0.394, -1.019, 0.232, -1.747, 0.1555)
hksj_from_dl([.81,.67,.80,.91,.56,.98,1.24,.75,.95,.66], [5.0,2.1,11.5,46.7,2.9,9.3,3.9,12.7,3.9,2.0], log_scale=True)
```

## Connections

- Marketing: when a vendor deck gives only a forest plot of per-test lift estimates and percent weights, this recipe lets an analyst recompute a $t$-based interval without the raw data. Caveat: the weights must be the *random-effects* weights from the vendor's analysis.
- Same machinery as `knha=TRUE` ([[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]).

## See Also

- [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
