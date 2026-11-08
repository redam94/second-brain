---
title: "Linzer 2013 - Reverse Random-Walk Model and Priors"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]"
source_location: "Secs. 2-3, Eqs 1-3, pp. 125-128"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
used_by:
  - "[[Linzer 2013 - Forecast Computation and Electoral College Simulation]]"
  - "[[Linzer 2013 - 2008 Application and Results]]"
aliases:
  - "reverse random walk"
  - "Linzer model"
---

# Linzer 2013 - Reverse Random-Walk Model and Priors

> [!summary]
> Poll counts are binomial in a state-day vote share $\pi_{ij}$ whose logit is a slow state trend $\beta_{ij}$ plus a fast national campaign effect $\delta_j$. Both follow random walks that run backwards from Election Day, where $\beta_{iJ}$ gets an informative normal prior centred on the fundamentals forecast and $\delta_J=0$.

## Overview
Notation: states $i=1,\dots,50$; campaign days $j=1,\dots,J$ with $J$ = Election Day; polls $k=1,\dots,K_j$ with $n_k$ respondents expressing a major-party preference, $y_k$ of whom support the Democrat; $h_i$ the historical forecast of Democratic two-party share in state $i$. Undecided respondents are excluded. A poll is dated at its last field day.

## Main Content

> [!definition] Observation model (Eq 1)
> $y_k\sim\text{Binomial}(\pi_{i[k]j[k]},\,n_k)$, where $i[k],j[k]$ are the poll's state and day. Real polls are overdispersed (house effects, other non-sampling error); the paper argues the resulting overconfidence is minimal, that estimating firm effects is impractical because most pollsters run few polls, and that deflating $n_k$ would underestimate volatility and worsen overconfidence. ^def-linzer-obs

> [!definition] Decomposition (Eq 2)
> $\pi_{ij}=\text{logit}^{-1}(\beta_{ij}+\delta_j)$. $\beta_{ij}$: long-term state-level dynamics; $\delta_j$: national short-term departure from the forecast ($\delta_j<0$ means the Democrat is polling below the forecast). Separating them lets states with no polls borrow the common pattern. Identification: $\delta_J\equiv0$, so $\pi_{iJ}=\text{logit}^{-1}(\beta_{iJ})$. ^def-linzer-decomp

> [!definition] Informative prior from fundamentals (Eq 3)
> $\beta_{iJ}\sim N\big(\text{logit}(h_i),\,\tau_i^{-1}\big)$ with analyst-chosen precision $\tau_i=s_i^{-2}$. Smaller $\tau_i$ upweights polls; larger $\tau_i$ keeps forecasts near $h_i$. Sensitivity (Sec 4.4): $\tau_i$ should not generally exceed 20. ^def-linzer-prior

> [!definition] Reverse random walks
> $\beta_{ij}\mid\beta_{i,j+1}\sim N(\beta_{i,j+1},\sigma_\beta^2)$ and $\delta_j\mid\delta_{j+1}\sim N(\delta_{j+1},\sigma_\delta^2)$ for $j<J$, with uniform priors on $\sigma_\beta$ and $\sigma_\delta$. The walk "begins" on Election Day (as in Strauss 2007), so after the last poll the path reverts toward the prior mean. Reason (Gelman & King 1993): fundamentals predict where opinion ends up but not the path. ^def-linzer-rw

> [!theorem] Behaviour (qualitative, from the text)
> The forecast of $\pi_{iJ}$ is a compromise between the latest polls and $h_i$. If the election is close in time, $\delta_j\approx0$ and $\beta_{ij}$ has little time to revert, so polls dominate. If it is far, the post-poll path depends on the prior: with large $\tau_i$ $\beta_{ij}\to\text{logit}(h_i)$ quickly; with small $\tau_i$ the path is driven by $\delta_j$ returning to 0, so a candidate behind the forecast ($\delta_j<0$) gains and one ahead loses. ^thm-linzer-behaviour

**Windowing.** To speed MCMC when forecasting far ahead, split the campaign into $J/W$ windows of $W$ days ($W=3$-5) and replace $\beta_{ij}$ by $\beta_{it[j]}$; $\delta_j$ stays daily because it fluctuates daily whereas $\beta$ changes gradually. **Estimation.** WinBUGS/R; 3 chains of 200,000 iterations, burn-in half, thinning 300; $\hat R\approx1$.

**Poll error sources (Sec 2.1).** Sampling variability (half or more of the total variation), house effects, timing (early polls weakly correlated with the outcome), and campaign events such as conventions.

## Examples

> [!example] Scale of the reverse random walk
> With $\sigma_\beta=0.02$ per day, the state trend moves by $0.02\sqrt{30}\approx0.11$ on the logit scale over 30 days (about 2.7 points of vote share near 50%), whereas a prior with $\tau=10$ has sd $\approx0.32$ (about 8 points). So 30 days from Election Day the prior still dominates $\beta_{iJ}$ unless polls say otherwise, and only the common $\delta_j$ (daily sd $\sigma_\delta$, typically larger) lets sparsely polled states learn the national mood. ^ex-linzer-shrink

```python
# PyMC 5 sketch of the reverse random walk (untested)
import pymc as pm, numpy as np, pytensor.tensor as pt
with pm.Model():
    sb = pm.HalfNormal("sb", 0.05); sd = pm.HalfNormal("sd", 0.05)
    # reverse RW: build forward in reversed time, then flip
    beta_rev = pm.GaussianRandomWalk("beta_rev", sigma=sb, shape=(S, T),
        init_dist=pm.Normal.dist(logit_h[:, None], 1/np.sqrt(tau)))
    delta_rev = pm.GaussianRandomWalk("delta_rev", sigma=sd, shape=T)
    delta = delta_rev - delta_rev[0]            # delta_J = 0 (index 0 = election day)
    beta, d = beta_rev[:, ::-1], delta[::-1]
    p = pm.math.invlogit(beta[state_idx, day_idx] + d[day_idx])
    pm.Binomial("y", n=n_resp, p=p, observed=y_dem)
```

## Connections
Compare with filtering/smoothing in [[Linear-Gaussian State-Space Models]] and [[The RTS Smoother]]: the reverse walk is a smoother-style prior anchored at the terminal time.

## See Also
[[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]]
