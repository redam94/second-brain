---
title: "IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Methods intro (p. 3); Appendix 1, pp. 9-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
used_by:
  - "[[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]"
  - "[[IntHout 2014 - Simulation Design]]"
aliases:
  - Hartung-Knapp-Sidik-Jonkman variance
  - HKSJ confidence interval
  - Knapp-Hartung random effects
---

# IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification

> [!summary]
> DL and HKSJ share the same pooled estimate $\hat y_R$ (weights $w_i^\tau=1/(\hat\epsilon_i^2+\hat\tau^2)$). They differ only in the variance and reference distribution: DL uses $1/\sum w_i^\tau$ with normal tests; HKSJ uses the weighted residual variance $\sum w_i^\tau(y_i-\hat y_R)^2/((k-1)\sum w_i^\tau)$ with a $t_{k-1}$ reference. Equivalently, $\text{Var}_{HKSJ}=q\cdot\text{Var}_{DL}$ with $q=\sum w_i^\tau(y_i-\hat y_R)^2/(k-1)$.

## Overview

Appendix 1 gives the entire formal basis. Notation follows the paper (not metafor's $v_i$): $\epsilon_i^2$ is the within-study variance.

## Main Content

> [!definition] Random-effects model (Appendix 1)
> For $k$ studies, $y_i=\delta_i+e_i$, $\delta_i=\delta+d_i$, with $e_i\sim N(0,\epsilon_i^2)$ and $d_i\sim N(0,\tau^2)$ independent. $\epsilon_i^2$ is the within-study variance (estimation error of $\delta_i$) and $\tau^2$ the between-study heterogeneity. For dichotomous outcomes with zero events in one or both arms, 0.5 was added to all cells of that study before analysis.
^def-intHout-model

> [!definition] DerSimonian-Laird estimate
> Fixed-effects weights $w_i=1/\hat\epsilon_i^2$, fixed-effects estimate $\hat y_F=\sum w_iy_i/\sum w_i$, heterogeneity statistic $Q=\sum w_i(y_i-\hat y_F)^2$ and
> $$
> \hat\tau^2=\max\!\left(0,\ \frac{Q-(k-1)}{\sum w_i-\sum w_i^2/\sum w_i}\right).
> $$
> Random-effects weights $w_i^\tau=1/(\hat\epsilon_i^2+\hat\tau^2)$, estimate $\hat y_R=\sum w_i^\tau y_i/\sum w_i^\tau$. DL variance and test:
> $$
> \text{var}_{DL}=\frac{1}{\sum w_i^\tau},\qquad z=\hat y_R/\sqrt{\text{var}_{DL}}\ \sim N(0,1),\quad CI=\hat y_R\pm1.96\sqrt{\text{var}_{DL}}.
> $$
> (The formula for $\hat\tau^2$ is the DerSimonian-Laird (1986) moment estimator, see [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]].)
^def-dl-intHout

> [!definition] HKSJ estimate (Hartung 1999; Hartung and Knapp 2001a,b; Sidik and Jonkman 2002)
> Same $\hat y_R$ and $w_i^\tau$, but
> $$
> \text{var}_{HKSJ}=\frac{\sum_{i=1}^kw_i^\tau\,(y_i-\hat y_R)^2}{(k-1)\sum_{i=1}^kw_i^\tau},\qquad t=\hat y_R/\sqrt{\text{var}_{HKSJ}}\sim t_{k-1},\quad CI=\hat y_R\pm t_{k-1,\,0.975}\sqrt{\text{var}_{HKSJ}}.
> $$
^def-hksj

> [!theorem] HKSJ as a rescaled DL variance
> $$
> \text{var}_{HKSJ}=q\cdot\text{var}_{DL},\qquad q=\frac{1}{k-1}\sum_{i=1}^kw_i^\tau(y_i-\hat y_R)^2 .
> $$
> *Proof.* Divide $\text{var}_{HKSJ}$ by $1/\sum w_i^\tau$. $\square$
> Consequences (interpretation added in this vault, not stated in the paper): (i) $q$ is the random-effects heterogeneity statistic per degree of freedom; if the model fits ($\tau$ estimated well) its expectation is about 1 and HKSJ is close to DL apart from the $t$-quantile; (ii) when $\tau^2$ is underestimated (typical with small $k$) $q>1$ and HKSJ widens the interval; (iii) the weights enter only as ratios, so HKSJ can be computed from DL weights reported as percentages ("Sum = 100"), which is what enables the conversion in [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]; (iv) the paper does not truncate $q$ at 1, so $\text{var}_{HKSJ}<\text{var}_{DL}$ is possible (observed in Example 2 where HKSJ's CI is slightly narrower).
^thm-hksj-scaling

> [!definition] Heterogeneity measure $I^2$ (Higgins and Thompson 2002)
> $$
> I^2=\frac{Q-(k-1)}{Q},\qquad\text{population form}\quad I^2=\frac{\tau^2}{\tau^2+\epsilon^2},
> $$
> where $\epsilon^2$ is the within-study variance of a "typical" study (Borenstein et al. 2009). Used in the simulations to set $\tau^2=\epsilon^2I^2/(1-I^2)$ ([[IntHout 2014 - Simulation Design]]).
^def-i2-intHout

Both methods give the identical point estimate; "the methods differ with respect to the calculation of the confidence interval and the statistical test. For DL, these are based on the normal distribution, whereas for the HKSJ method, they are based on the $t$-distribution with the degrees of freedom equal to the number of trials minus one, and a weighted version of the DL standard error."

## Examples

> [!example] The two variances on the zinc data
> Five studies, DL weights as percentages $w=(24.0,22.2,21.3,15.5,17.0)$ (sum 100), $\hat y_R=-0.39$: $\sum w(y-\hat y)^2=20.31$, so $\text{var}_{HKSJ}=20.31/(4\times100)=0.0508$ and $\text{SE}=0.225$, versus the DL SE implied by the published DL CI ($-0.77$ to $-0.02$) of about $0.19$. With $t_{4,0.975}=2.78$ the HKSJ CI is $[-1.02,0.24]$, so DL $p=0.04$ becomes HKSJ $p=0.16$. Full steps: [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]].

```python
import numpy as np
from scipy import stats
def dl_and_hksj(y, v):
    k = len(y); w = 1/v; yF = (w*y).sum()/w.sum(); Q = (w*(y-yF)**2).sum()
    tau2 = max(0, (Q-(k-1))/(w.sum()-(w**2).sum()/w.sum()))
    wt = 1/(v+tau2); yR = (wt*y).sum()/wt.sum()
    var_dl = 1/wt.sum(); q = (wt*(y-yR)**2).sum()/(k-1); var_hk = q*var_dl
    p_dl = 2*stats.norm.sf(abs(yR)/np.sqrt(var_dl)); p_hk = 2*stats.t.sf(abs(yR)/np.sqrt(var_hk), k-1)
    return dict(est=yR, tau2=tau2, q=q, se_dl=var_dl**.5, se_hk=var_hk**.5, p_dl=p_dl, p_hk=p_hk)
```

## Connections

- metafor equivalence: `rma(yi, vi, method="DL", knha=TRUE)` ([[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]); Röver (2020) lists these as the "exceptions" that account for uncertainty in $\tau$ via inflated SE and Student-$t$ ([[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]]).
- On BCG, DL gives $\hat\tau^2=0.3088$ and $\hat\mu=-0.7141$ (computed here), versus REML+HKSJ 95% CI $[-1.108,-0.321]$ on the log RR, wider than the Wald $[-1.067,-0.362]$ ([[Viechtbauer 2010 - BCG Vaccine Worked Example]]).

## See Also

- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
- [[IntHout 2014 - Simulation Results and Error Rates]]
