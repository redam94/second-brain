---
title: "Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; general demography (Chiang 1984; Preston, Heuveline and Guillot 2001; Arriaga 1984)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Concept Notes - Life Tables and Replication Forecasting"
doc_type: concept-note
depends_on:
  - "[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]"
used_by:
  - "[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]"
aliases:
  - "life table years of life lost"
  - "excess mortality counterfactual path"
  - "abridged life table"
---

# Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path

> [!summary]
> Concept note, no raw source. An abridged life table turns age-specific death rates $m_x$ into survivors $l_x$, person-years $L_x$ and life expectancy $e_x$. Years of life lost (YLL) from an event such as the COVID-19 pandemic is the excess in deaths times remaining life expectancy, or the gap between observed life expectancy and the expectancy on a counterfactual "path we were on" extrapolated from pre-event trends (e.g. Lee-Carter). Citations are to the standard literature; numbers below are a toy computed here.

## Overview

Motivating PyMC example: **E111** "The path we were on: years of life Europe lost to COVID, and whether it came back" (Eurostat deaths, population and life expectancy by age, 2000-2024; abridged life table checked against Eurostat; census breaks measured by age; Lee-Carter by SVD vs a Bayesian negative-binomial version; pooled sensitivities with zero-sum rows; an unidentified level shown failing) - see [the gallery](https://redam94.github.io/pymc-challenges/examples.html). This note gives the formal background; the forecasting model is in [[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]].

## Main Content

> [!definition] Abridged life-table functions (Chiang 1984; Preston et al. 2001)
> For age intervals $[x,x+n)$: death rate $m_x=D_x/P_x$ (deaths over person-years); fraction of the interval lived by those dying $f_x$ (so $a_x=nf_x$); death probability $q_x=\dfrac{n\,m_x}{1+n(1-f_x)m_x}$ (open interval $q=1$); survivors $l_{x+n}=l_x(1-q_x)$, deaths $d_x=l_xq_x$; person-years $L_x=n(l_{x+n}+f_xd_x)$ and, for the open interval, $L_\omega=l_\omega/m_\omega$; $T_x=\sum_{y\ge x}L_y$; life expectancy $e_x=T_x/l_x$.
^def-life-table

> [!definition] Years of life lost and excess mortality
> **Excess deaths** $=D^{\text{obs}}_x-D^{\text{exp}}_x$ against an expected (counterfactual) count. **YLL** $=\sum_x(D^{\text{obs}}_x-D^{\text{exp}}_x)\,e^*_x$ with $e^*_x$ remaining life expectancy at the age of death (period or reference table). Alternative summary: **life-expectancy gap** $e_0^{\text{cf}}-e_0^{\text{obs}}$, decomposed by age with Arriaga's (1984) method. The *counterfactual* defines what excess means: a pre-event average, a linear extrapolation of $\gamma_t$ in Lee-Carter (random walk with drift), or a Bayesian forecast with predictive uncertainty.
^def-yll

**Why the path matters.** Mortality has fallen for decades, so comparing 2020 with a 2015-2019 mean understates the excess. A Lee-Carter or RWD counterfactual extrapolates the decline, but Girosi and King (2007) warn that linear forecasts make age profiles fan out ([[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]]) and that Lee-Carter is biased when the real covariance is not aligned with the drift ([[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]]); short horizons (a few years) are far less affected. Practical pitfalls (E111): census breaks in population denominators, open-interval treatment, level identification in the Bayesian model, and whether mortality "came back" to the path (a recovery question, not only a loss).

## Examples

> [!example] Toy abridged table and a one-year shock
> Setup: five age groups $[0,1),[1,5),[5,50),[50,80),80+$ with $f=(0.1,0.4,0.5,0.5,\cdot)$ and $m=(0.004,0.0004,0.0015,0.012,0.09)$. Baseline life table: $q=(0.00399,0.0016,0.0653,0.3051,1)$, $l=(100000,99601,99442,92949,64592)$, $e_0=79.07$, $e_{50}=33.15$, $e_{80}=11.11$. Shock: death rates of the last two groups rise 20%. New $e_0=76.75$, a life-expectancy loss of $2.33$ years. With toy populations $(10000,40000,450000,300000,100000)$, excess deaths are $720$ (50-79) and $1800$ (80+), total $2520$. A crude YLL using remaining expectancy at the start of the group is $720\cdot33.15+1800\cdot11.11\approx43{,}900$ years; using expectancy at the age of death (nearer 65 than 50 in the 50-79 group) would be smaller, so this is an upper bound for that group.
^ex-life-table
```python
import numpy as np
def life_table(m, n=np.array([1,4,45,30,np.inf]), f=np.array([0.1,0.4,0.5,0.5,0.0]), l0=1e5):
    q = np.where(np.isinf(n), 1.0, n*m/(1+n*(1-f)*m)); l = np.zeros(len(m)); l[0] = l0
    for i in range(len(m)-1): l[i+1] = l[i]*(1-q[i])
    d = l*q; L = np.zeros(len(m))
    for i in range(len(m)-1): L[i] = n[i]*(l[i+1] + f[i]*d[i])
    L[-1] = l[-1]/m[-1]; return l, d, np.cumsum(L[::-1])[::-1]/l      # e_x
```

**PyMC-style sketch of the counterfactual (untested).**
```python
with pm.Model():
    # Lee-Carter negative binomial on pre-event years 2000-2019, forecast 2020-2024 as RWD
    mu = exposure * pm.math.exp(alpha[:, None] + beta[:, None] * gamma[None, :])
    pm.NegativeBinomial("deaths", mu=mu, alpha=phi, observed=deaths_pre)
    gamma_future = pm.Deterministic("gamma_f", gamma[-1] + drift*steps + pm.math.cumsum(pm.Normal("xi", 0, sigma_rw, shape=H)))
# excess_draw = observed_deaths - exposure*exp(alpha + beta*gamma_future); YLL per draw with a life_table(...)
```

## Connections
[[Survival Analysis]] (life tables are discrete-time hazards), [[Forecast Evaluation and Backtesting]], [[Hierarchical Models]] (pooling countries), [[Factor Analysis and PPCA]], [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]] (Poisson/NB likelihood on counts).

> [!tip] Relevance to marketing measurement
> "Excess relative to the path we were on" is the same logic as counterfactual lift in a time-series causal model: the quality of the pre-period forecast and its uncertainty determine whether an estimated effect is distinguishable from drift.

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
