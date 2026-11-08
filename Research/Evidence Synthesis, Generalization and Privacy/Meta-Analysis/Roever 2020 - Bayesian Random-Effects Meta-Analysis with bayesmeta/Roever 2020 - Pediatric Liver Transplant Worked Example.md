---
title: "Roever 2020 - Pediatric Liver Transplant Worked Example"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 3.1-3.4 (pp. 19-32), Tables 2-3, Figures 2-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Roever 2020 - Priors for the Effect and Heterogeneity]]"
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
  - "[[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]"
  - "[[Viechtbauer 2010 - Effect Size Measures and escalc]]"
used_by:
  - "[[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]"
aliases:
  - Crins 2014 IL-2RA example
  - bayesmeta worked example
  - liver transplant meta-analysis
---

# Roever 2020 - Pediatric Liver Transplant Worked Example

> [!summary]
> Six controlled studies of interleukin-2 receptor antagonists (IL-2RA) after pediatric liver transplantation (Crins et al. 2014) are meta-analysed with `bayesmeta`. With $\mu\sim N(0,4^2)$ and $\tau\sim\text{half-normal}(0.5)$ the posterior median log-OR is $-1.57$ (95% interval $[-2.23,-0.93]$), posterior probability of a non-beneficial effect $6\times10^{-5}$, and an implied median risk difference of $-0.33$ at 50% control risk. A grid-based Python reproduction matches the printed summary to three or more decimals.

## Overview

**Question.** Does IL-2RA prevent acute rejection (AR) events after pediatric liver transplantation? Treatment strategies and responses differ between adults and children, so a pediatric-specific systematic review of six controlled studies was performed.

## Main Content

### Data

Generic 2x2 table: event yes/no for treatment ($a,b$, $n_1=a+b$) and control ($c,d$, $n_2$). First study (Heffron 2003): IL-2RA 14 events, 47 none (61); control 15 events, 5 none (20). Odds ratio $\frac{14/47}{15/5}=0.0993$; $y_1=\log(0.0993)=-2.31$, $\sigma_1=\sqrt{1/14+1/47+1/15+1/5}=0.60$ (the paper writes the SE formula over the 2x2 counts).

| $i$ | Study | IL-2RA events/total | Control events/total | $y_i$ (log-OR) | $\sigma_i$ | Randomised |
|---|---|---|---|---|---|---|
| 1 | Heffron 2003 | 14/61 | 15/20 | -2.31 | 0.60 | yes |
| 2 | Gibelli 2004 | 16/28 | 19/28 | -0.46 | 0.56 | no |
| 3 | Schuller 2005 | 3/18 | 8/12 | -2.30 | 0.88 | no |
| 4 | Ganschow 2005 | 9/54 | 29/54 | -1.76 | 0.46 | no |
| 5 | Spada 2006 | 4/36 | 11/36 | -1.26 | 0.64 | yes |
| 6 | Gras 2008 | 0/50 | 3/34 | -2.42 | 1.53 | no |

Study 6 has a zero cell, so a continuity correction (0.5 added to each cell) was applied (Sweeting et al. 2004). Effect sizes via `metafor::escalc(measure="OR", ai, n1i, ci, n2i, ...)` return `yi` and `vi` = squared SE; `bayesmeta()` needs SEs, hence `sigma=sqrt(vi)` ([[Viechtbauer 2010 - Effect Size Measures and escalc]]). A `bayesmeta()` call can also take the `escalc` data frame directly.

### The analysis

`bayesmeta(y, sigma, labels, mu.prior.mean=0, mu.prior.sd=4, tau.prior=function(t) dhalfnormal(t, scale=0.5))`. The effect prior is the vague unit-information prior; the half-normal(0.5) puts about 95% of prior mass on $\tau\le0.98$ and about 5% on "fairly extreme" values.

| | $\tau$ | $\mu$ |
|---|---|---|
| ML joint | 0.3258 | -1.5783 |
| ML marginal | 0.4644 | -1.5780 |
| MAP joint | 0.0869 | -1.5594 |
| MAP marginal | 0.2453 | -1.5691 |

Marginal posterior summary:

| | $\tau$ | $\mu$ | $\theta_{k+1}$ (prediction) |
|---|---|---|---|
| mode | 0.2453 | -1.5691 | -1.5633 |
| median | 0.3445 | -1.5735 | -1.5702 |
| mean | 0.3811 | -1.5764 | -1.5764 |
| sd | 0.2594 | 0.3295 | 0.5672 |
| 95% lower | 0.0000 | -2.2312 | -2.7661 |
| 95% upper | 0.8607 | -0.9264 | -0.4073 |

(shortest credible intervals). Forest plot (Fig. 2): raw estimates with 95% CI plus shrinkage intervals, "mean" $-1.57$ $[-2.23,-0.93]$ and "prediction" $-1.57$ $[-2.77,-0.41]$. Fig. 3 (`plot(ma01)`): top-left forest, top-right joint posterior of $(\tau,\mu)$ with conditional mean $\hat\mu(\tau)$ and 95% band, ML cross and MAP cross; bottom marginal densities of $\mu$ and $\tau$.

### Querying the posterior (`$dposterior`, `$pposterior`, `$qposterior`, `$rposterior`, `$post.interval`)

| Query | Result |
|---|---|
| $P(\mu>0\mid y)$ (non-beneficial effect) | $6.187\times10^{-5}$ |
| $P(\tau>1\mid y)$ ("fairly extreme") | 0.02097 |
| 99% upper limit of $\tau$ | 1.1092 |
| 99% interval for $\tau$, shortest | [0, 1.1092] |
| 99% interval for $\tau$, central | [0.003548, 1.2054] (the 0.005 and 0.995 quantiles) |

Monte Carlo (`rposterior(n, tau.sample=FALSE)` is much faster if only $\mu$ is needed): assume control AR risk $p_c=0.5$; $\text{logit}\,p_t=\text{logit}\,p_c+\mu^*$; risk difference $p_t-p_c$ has median $-0.328$ and 95% interval $[-0.403,-0.215]$ from 10,000 draws.

**Shrinkage** (`ma01$theta[,1:2]`):

| | Heffron 2003 | Gibelli 2004 |
|---|---|---|
| $y$, $\sigma$ | -2.3097, 0.5995 | -0.4595, 0.5564 |
| posterior median | -1.7411 | -1.2822 |
| posterior mean, sd | -1.7779, 0.4229 | -1.2340, 0.4489 |
| 95% interval | [-2.6561, -0.9920] | [-2.0455, -0.3089] |

### Prior variations (Sec. 3.4)

- **Prior predictive**: see the table in [[Roever 2020 - Priors for the Effect and Heterogeneity]] (97.5% quantiles 1.092, 2.185, 5.051 for half-normal(0.5), half-normal(1.0), half-Cauchy(0.5)).
- **Empirical prior** (Turner et al. 2015): `TurnerEtAlPrior(outcome="surgical", comparator1="pharmacological", comparator2="placebo / control")`, log-normal with quantiles (2.5%, 50%, 97.5%) = (0.0623, 0.3430, 1.8873). Result "very similar" to the half-normal analysis (Fig. 1 shows the two densities).
- **Non-informative**: omit `mu.prior.*` for the uniform effect prior; `tau.prior="Jeffreys"` for Jeffreys (default is `"uniform"`).

## Examples

> [!example] Reproducing the printed posterior without `bayesmeta`
> A fine $\tau$ grid with Eq. 22 and Eq. 21 ([[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]) gives: $\tau$ posterior mean 0.3811, sd 0.2594, median 0.3445, $P(\tau>1)=0.02097$, 99% quantile 1.1092; $\mu$ mean $-1.5764$, sd 0.3294, median $-1.5735$, $P(\mu>0)=6.1\times10^{-5}$; study-1 shrinkage mean $-1.778$, median $-1.742$; REML $\hat\tau=0.4670$, $\hat\mu=-1.5915$, SE 0.3341. All agree with the paper. The $y_i,\sigma_i$ come from the counts with the 0.5 correction in study 6.
^ex-bayesmeta-reproduction

```python
import numpy as np
from scipy import stats
a=np.array([14,16,3,9,4,0.]); n1=np.array([61,28,18,54,36,50.]); c=np.array([15,19,8,29,11,3.]); n2=np.array([20,28,12,54,36,34.])
b, d = n1-a, n2-c
z = (a==0)|(b==0)|(c==0)|(d==0)                              # continuity correction for studies with a zero cell
a, b, c, d = [np.where(z, x+.5, x) for x in (a, b, c, d)]
y = np.log(a*d/(b*c)); s = np.sqrt(1/a+1/b+1/c+1/d)
# then call posterior_grid(y, s) from the Marginal Likelihood note, with tau ~ half-normal(0.5), mu ~ N(0, 4^2)
```

## Connections

- Marketing: the workflow (compute effect and SE per study, state an informative $\tau$ prior from the plausible spread of effects, report the predictive interval and the probability of a harmful or null effect, then run prior sensitivity) is a template for pooling a handful of lift or geo experiments. "$P(\mu>0\mid y)$" is a direct decision quantity; the risk-difference translation (via an assumed baseline) is the analogue of converting a log-lift into incremental conversions at a baseline conversion rate.
- Frequentist re-analysis of a comparable problem: [[Viechtbauer 2010 - BCG Vaccine Worked Example]].

## See Also

- [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] (the two-randomised-study subset analysis)
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
