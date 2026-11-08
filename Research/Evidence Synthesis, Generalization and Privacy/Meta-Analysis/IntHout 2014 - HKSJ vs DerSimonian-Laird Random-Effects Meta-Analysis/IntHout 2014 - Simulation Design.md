---
title: "IntHout 2014 - Simulation Design"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Background (pp. 2-3), Methods: simulations (p. 3), Appendix 2 (pp. 10-11)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]"
used_by:
  - "[[IntHout 2014 - Simulation Results and Error Rates]]"
aliases:
  - trial size mixtures simulation
  - DL vs HKSJ simulation design
---

# IntHout 2014 - Simulation Design

> [!summary]
> The simulation generates null meta-analyses (true overall effect 0) of 2 to 20 trials with explicit trial-size mixtures (equal sizes; one small trial; 25/50/75% large trials; one large trial ten times larger), five heterogeneity levels ($I^2=0,0.25,0.5,0.75,0.9$) and three outcome types (continuous, OR, RR), with 10,000 replications per scenario. The output is the empirical Type I error of DL and HKSJ at nominal 5%.

## Overview

Motivation: previous simulations either pooled over size mixtures or tested few combinations. The authors hypothesised from Borm et al. (2009) that methods (including HKSJ) would perform worse with one large and several small trials, a common pattern: in a random sample of 186 Cochrane reviews the ratio of largest to smallest trial ranged 1 to 1650 (median 5, IQR 3 to 10); 60% had no large trials, 40% had a trial at least twice the median size, 25% at least 5 times, 10% at least 10 times. Also: median Cochrane meta-analysis has 3 studies (Q1-Q3: 2-6), only 1% have 28 or more (Davey et al. 2011), and detectable heterogeneity is present in about half.

## Main Content

### Scenario grid (Appendix 2)

| Factor | Levels |
|---|---|
| Number of trials per series $k$ | 2 to 20 |
| Average group size per trial | 25, 50, 100, 250, 500, 1000 |
| Size mixtures | equal; 25%, 50% or 75% large trials; exactly one large; exactly one small |
| Size ratio large : small | 10 : 1 (e.g. average group size 100 with six small and two large gives group sizes 31 and 308) |
| Heterogeneity $I^2$ | 0, 0.25, 0.5, 0.75, 0.9 (none, low, moderate, high, very high) |
| Outcome | continuous; binary analysed as OR or RR; event rate $p_0\in\{0.1,0.3,0.5,0.7,0.9\}$ |
| Replications | 10,000 series per scenario; nominal two-sided $\alpha=0.05$ |

Software: SAS 9.2. Estimand: error rate = share of series with $p<0.05$ when the true overall effect is zero. Group sizes had no impact on error rates in the continuous case (as expected).

### Data-generating algorithm

> [!definition] A. Normally distributed outcomes
> 1. Heterogeneity from $I^2$: $\tau^2=\epsilon^2\dfrac{I^2}{1-I^2}$ with $\epsilon^2=\dfrac1k\sum_{i=1}^k\dfrac{2\sigma^2}{n_i}$ ($n_i$ group size of trial $i$, outcome SD $\sigma=1$ w.l.o.g. since results depend only on $\tau/\sigma$).
> 2. For each trial: true effect $\delta_i\sim N(0,\tau^2)$; observed effect $\sim N(\delta_i,2\sigma^2/n_i)$; estimated variance from a $\chi^2$ with $2n_i-2$ df.
> 3. Each series analysed by DL and by HKSJ.
> 4. Error rate = percentage of series with $p<0.05$.
^def-sim-normal

> [!definition] B. Odds ratio outcomes
> Choose overall event rate $p_0$. $\epsilon^2=\dfrac1k\sum_i\dfrac1{n_i}\left(\dfrac2{p_0}+\dfrac2{1-p_0}\right)$ then $\tau^2$ as in A. For each trial draw $\delta_i=\ln\text{OR}_i\sim N(0,\tau^2)$; event rates $p_a,p_b$ with $\ln\frac{p_a}{1-p_a}=\ln\frac{p_0}{1-p_0}-\delta_i/2$ and $\ln\frac{p_b}{1-p_b}=\ln\frac{p_0}{1-p_0}+\delta_i/2$; observed event rates $P_a,P_b$ from Bernoulli sampling; $\ln(\text{OR})$ and variance $\left(\frac1{P_a}+\frac1{1-P_a}+\frac1{P_b}+\frac1{1-P_b}\right)/n_i$. Zero-event arms: add 0.5 to all cells.
^def-sim-or

> [!definition] C. Risk ratio outcomes
> $\epsilon^2=\dfrac1k\sum_i\dfrac1{n_i}\left(\dfrac2{p_0}-2\right)$; $\delta_i=\ln\text{RR}_i\sim N(0,\tau^2)$; $\ln p_a=\ln p_0-\delta_i/2$ and $\ln p_b=\ln p_0+\delta_i/2$ (event rates below 0.01 or above 0.99 replaced by 0.01 or 0.99); observed rates from Bernoulli sampling; $\ln\text{RR}$ with variance $\left(\frac1{P_a}+\frac1{P_b}-2\right)/n_i$.
^def-sim-rr

(The extracted formula for $\epsilon^2$ in B and C is typeset as a fraction in the PDF; the forms above are the standard large-sample variances of ln OR and ln RR evaluated at $p_0$ and are consistent with the printed variance formulas for the trial-level estimates.)

## Examples

> [!example] A compact replication of the null experiment (continuous outcome)
> The block reproduces the qualitative result with my own implementation (10,000 series per cell; estimated variances from $\chi^2_{2n-2}/(2n-2)$). With $I^2=0.5$ and equal sizes (100 per arm), DL rejects 9.5%, 8.4%, 7.6% of true nulls at $k=3,5,10$ while HKSJ rejects 4.8%, 5.0%, 5.1%. With one trial ten times larger (1000 vs 100), DL rejects 19.5%, 15.0%, 9.3% and HKSJ 10.5%, 10.3%, 6.7%. These fall inside the bands the paper reports in [[IntHout 2014 - Simulation Results and Error Rates]] (e.g. equal sizes, $k=5$: DL 5.7-12.7%, HKSJ 4.7-5.5%; one large, $k=5$: DL 11.6-14.5%, HKSJ 5.3-9.9%).
^ex-sim-replication

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(1)
def one_series(sizes, I2):
    sizes = np.asarray(sizes, float); k = len(sizes)
    eps2 = np.mean(2/sizes); tau2 = eps2*I2/(1-I2)          # sigma = 1
    delta = rng.normal(0, np.sqrt(tau2), k)
    y = rng.normal(delta, np.sqrt(2/sizes))
    v = 2*rng.chisquare(2*sizes-2)/(2*sizes-2)/sizes         # estimated within-trial variance
    w = 1/v; yF = (w*y).sum()/w.sum(); Q = (w*(y-yF)**2).sum()
    t2 = max(0, (Q-(k-1))/(w.sum()-(w**2).sum()/w.sum())); wt = 1/(v+t2); yR = (wt*y).sum()/wt.sum()
    se_dl = wt.sum()**-.5; se_hk = np.sqrt((wt*(y-yR)**2).sum()/((k-1)*wt.sum()))
    return (2*stats.norm.sf(abs(yR)/se_dl) < .05, 2*stats.t.sf(abs(yR)/se_hk, k-1) < .05)
rates = np.mean([one_series([100]*4 + [1000], 0.5) for _ in range(10000)], axis=0)   # (DL, HKSJ)
```

## Connections

- Marketing: the same design can be reused to stress-test any in-house aggregation rule for experiment portfolios (simulate null portfolios with realistic size mixtures and measure the false-positive rate of "significant lift"); see the ADEMP-style simulation notes in [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- Design choice rationale (include a large-trial scenario) follows from evidence that single large trials can mislead (Borm et al. 2009; IntHout et al. 2012).

## See Also

- [[IntHout 2014 - Simulation Results and Error Rates]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
