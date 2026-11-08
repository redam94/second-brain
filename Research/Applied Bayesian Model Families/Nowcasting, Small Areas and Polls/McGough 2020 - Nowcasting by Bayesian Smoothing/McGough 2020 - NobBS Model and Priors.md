---
title: "McGough 2020 - NobBS Model and Priors"
tags:
  - source/ingested
  - topic/nowcasting
  - type/definition
  - doc/paper
source: "[[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]"
source_location: "Methods: Bayesian nowcast model, R package, pp. 13-16"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/McGough 2020 - Nowcasting by Bayesian Smoothing"
doc_type: paper
depends_on:
  - "[[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[McGough 2020 - Evaluation Design and Results]]"
  - "[[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]]"
aliases:
  - "NobBS model"
  - "Nowcasting by Bayesian Smoothing model"
---

# McGough 2020 - NobBS Model and Priors

> [!summary]
> NobBS models each reporting-triangle cell as Poisson or negative-binomial with mean $\lambda_{t,d}=e^{\alpha_t}\beta_d$, a geometric random walk on $\alpha_t$ and a Dirichlet prior on the delay vector $\beta$. Priors are weak by default but can encode a known delay shape; the total nowcast is $N_t=\sum_d n_{t,d}$ including unobserved cells drawn from the posterior predictive.

## Overview
The model is a multiplicative (log-additive) decomposition: a time signal times a delay profile. It is "hierarchical" in the sense that all weeks share $\beta$ and the random-walk variance (see [[Hierarchical Models]]), and a state-space model in the sense that $\alpha_t$ is a latent random walk ([[Linear-Gaussian State-Space Models]]).

## Main Content

> [!definition] Observation model
> Poisson (dengue): $n_{t,d}\sim\text{Pois}(\lambda_{t,d})$. Negative binomial (ILI, extra-Poisson variation): $n_{t,d}\sim\text{NB}(r,p_{t,d})$ with $p_{t,d}=r/(r+\lambda_{t,d})$, so the mean is $\lambda_{t,d}$ and the variance exceeds it. ^def-nobbs-obs

> [!definition] Mean structure
> $\log\lambda_{t,d}=\alpha_t+\log\beta_d$, i.e. $\lambda_{t,d}=e^{\alpha_t}\beta_d$. $\alpha_t$ is the true epidemiologic signal for week $t$ (so $e^{\alpha_t}$ is the expected total $N_t$); $\beta_d$ is the probability of reporting at delay $d$, $\sum_{d=0}^{D}\beta_d=1$. ^def-nobbs-mean

> [!definition] Priors
> - Delay vector: $\beta\sim\text{Dirichlet}(\theta_0,\dots,\theta_D)$. Default $\theta_d=0.1$ (weak, equal weight per delay). In the paper's analyses $\theta$ encodes a pseudo-count of $n=10$ hypothetical cases spread by the empirical delay pattern in the training period; an equal-weight prior made no material difference. $\theta_D$ can represent "delay $\ge D$".
> - Signal: first-order random walk, $\alpha_1\sim N(0,\text{precision }0.001)$, $\alpha_t\sim N(\alpha_{t-1},\tau_\alpha^{-1})$ for $t>1$. Because $\alpha_t$ is on the log scale this is a geometric random walk.
> - Random-walk precision: $\tau_\alpha\sim\text{Ga}(0.01,0.01)$ (default). A stronger prior such as Ga(10, 0.1) forces small week-to-week changes and a smoother curve.
> - NB dispersion: $r\sim\text{Ga}(60,20)$, mildly informative (moderate departure from Poisson). ^def-nobbs-priors

> [!theorem] Nowcast quantity
> At nowcast time $T$ the posterior of $N_t=\sum_{d=0}^{D}n_{t,d}$ is obtained by drawing the unobserved cells ($t+d>T$) from their predictive distribution given the posterior of $(\alpha,\beta,\tau_\alpha,r)$; observed cells enter as known. For the latest week only $n_{T,0}$ is known, and the nowcast is driven by $n_{T,0}/\beta_0$ shrunk toward $\alpha_{T-1}$ by the random walk. ^thm-nobbs-nowcast

Implementation: JAGS in R with 10,000 posterior samples; trace plots checked visually. The CRAN `NobBS` package accepts one record per case (onset date, report date), default Poisson with no moving window, $D=$ series length $-1$, and customisable priors. A prior such as $\theta=(3,30,50,10,4,3)$ expresses "3% same week, 30% after one week, ..." (paper's dengue example).

## Examples

> [!example] Why the random walk helps
> Suppose delay-0 reports jump from 13 to 29 in one week with $\beta_0=0.29$. A pure scale-up gives $29/0.29=100$. The random walk on $\alpha_t$ says last week's total was near $13/0.29\approx45$ and pulls the new estimate toward it in proportion to the learned step variance, so the nowcast lands between 45 and 100. The paper documents exactly this behaviour on 3 Aug 1998 and 16 Aug 2010: an outlier at $d=0$ drove an overestimate corrected the following week. ^ex-rw-shrinkage

```python
import numpy as np
rng=np.random.default_rng(0)
T,D=60,6; beta=np.array([.05,.3,.3,.2,.1,.04,.01])
alpha=np.cumsum(rng.normal(0,.1,T))+4
lam=np.exp(alpha)[:,None]*beta[None,:]
n=rng.poisson(lam)
obs=np.add.outer(np.arange(T),np.arange(D+1))<=T-1   # observed cells
nowcast_naive=np.where(obs,n,0).sum(1)
print(nowcast_naive[-3:], n.sum(1)[-3:])               # truncated vs truth
```

## Connections
[[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]] defines the cells; results in [[McGough 2020 - Evaluation Design and Results]]; limitations (delay assumed constant inside the window) in [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]]. The delay-hazard alternative for E38 is in [[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]].

## See Also
[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]] · [[Bayesian Structural Time-Series Model]]
