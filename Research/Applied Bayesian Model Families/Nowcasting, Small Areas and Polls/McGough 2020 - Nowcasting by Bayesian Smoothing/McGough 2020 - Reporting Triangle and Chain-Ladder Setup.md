---
title: "McGough 2020 - Reporting Triangle and Chain-Ladder Setup"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]"
source_location: "Introduction and Methods: Surveillance data, Reporting triangle, pp. 2-3, 13"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/McGough 2020 - Nowcasting by Bayesian Smoothing"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
used_by:
  - "[[McGough 2020 - NobBS Model and Priors]]"
aliases:
  - "reporting triangle"
  - "right truncation"
  - "chain ladder"
---

# McGough 2020 - Reporting Triangle and Chain-Ladder Setup

> [!summary]
> Reported counts form a $T\times D$ reporting triangle $n_{t,d}$: cases with onset in week $t$ reported after delay $d$. The lower-right corner is unobserved (right truncation), and nowcasting means filling it in to recover $N_t=\sum_d n_{t,d}$. NobBS adapts the actuarial log-linear chain-ladder model to do this.

## Overview

Delays come from onset-to-care delays, lab processing, provider reporting, and system-level processing (paper's Introduction). Nowcasting ("predicting the present") originated in actuarial claims reserving and was applied to AIDS in the 1980s-90s and to foodborne outbreaks. Most methods model only the delay distribution (reverse-time hazard model, chain ladder) and treat weekly counts as independent; NobBS adds temporal dependence.

## Main Content

> [!definition] Reporting triangle
> Let $t=1,\dots,T$ index the onset week ("now" is $T$) and $d=0,\dots,D$ the delay in weeks. $n_{t,d}$ is the number of cases with onset in $t$ reported with delay $d$. At time $T$ only cells with $t+d\le T$ are observed. The target is $N_t=\sum_{d=0}^{D} n_{t,d}$. ^def-reporting-triangle

> [!definition] Right truncation
> Data are right-truncated: at week $t$, delays longer than $T-t$ cannot be seen, so only $d=0$ is known for $t=T$. Counts in the latest rows are biased low unless corrected. ^def-right-truncation

> [!definition] Log-linear chain-ladder model
> The marginal cell counts follow $\log\lambda_{t,d}=\mu+\alpha_t+\beta_d$ (actuarial form, ref. 15 in the paper); NobBS drops the intercept and writes $\lambda_{t,d}=e^{\alpha_t}\beta_d$ with $\beta$ a probability vector. ^def-chain-ladder

Maximum delay $D$ is set by data (dengue: $D=10$ weeks, since >99% of cases in the first two years were reported within 10 weeks; ILI: $D=26$ within a 27-week window). Cases with delay $>W$ (window) are excluded, and delays up to 6 months were kept for ILI because longer delays had irregularities. Data: ~53,000 dengue cases in Puerto Rico (1992-2010, 1092 weeks; onset by clinician vs lab-report completion) and 2.77 million ILI cases from ILINet (3.75 years, 196 weeks; delay = week of care-seeking to week posted in FluView).

## Examples

> [!example] A small triangle
> With $T=4$, $D=2$ and "now" = week 4, the observed cells satisfy $t+d\le 4$ (illustrative numbers):
>
> | onset $t$ | $d=0$ | $d=1$ | $d=2$ |
> |---|---|---|---|
> | 1 | 10 | 20 | 5 |
> | 2 | 12 | 24 | 6 |
> | 3 | 11 | 22 | ? |
> | 4 | 13 | ? | ? |
>
> Complete rows give $\hat\beta\approx(0.29,0.57,0.14)$. Row 4 has only $d=0$ observed, so a crude chain-ladder scale-up gives $\hat N_4\approx 13/0.29\approx 45$, versus the naive reading of 13 (a spurious "collapse"). NobBS does this probabilistically and borrows strength from adjacent weeks through the random walk. ^ex-triangle

## Connections
PyMC sketch of the same structure (untested):

```python
# n_obs[t, d] observed where t + d <= T; mask the rest
import pymc as pm, numpy as np
with pm.Model():
    beta = pm.Dirichlet("beta", a=np.full(D+1, 0.1))
    tau = pm.Gamma("tau", 0.01, 0.01)
    alpha = pm.GaussianRandomWalk("alpha", sigma=1/pm.math.sqrt(tau), shape=T)
    lam = pm.math.exp(alpha[:, None]) * beta[None, :]
    pm.Poisson("n", lam[obs_mask], observed=n_obs[obs_mask])
```

## See Also
[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]] · [[McGough 2020 - NobBS Model and Priors]] · [[Survival Analysis]] · [[Missing Data Models]]
