---
title: "Nowcasting Concepts - Delay Hazard Models and the Renewal Equation"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]"
source_location: "Concept note, no raw source (extends McGough 2020 Methods and Gostic 2020 renewal sections)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/McGough 2020 - Nowcasting by Bayesian Smoothing"
doc_type: paper
depends_on:
  - "[[McGough 2020 - NobBS Model and Priors]]"
  - "[[Gostic 2020 - Generation Interval and the Renewal Equation]]"
used_by:
  - "[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]]"
aliases:
  - "discrete-time delay hazard nowcast"
  - "renewal equation as triangular solve"
---

# Nowcasting Concepts - Delay Hazard Models and the Renewal Equation

> [!summary]
> Concept note, no raw source. It writes the reporting-delay model as a discrete hazard (the Hoehle & an der Heiden 2014 route that McGough compares against) with weekday and drift effects, shows why truncated data fake a "wave is ending", and expresses the renewal equation as a triangular recursion so that $R_t$ can be a latent series fitted jointly with the nowcast. These are the ingredients of PyMC examples E38 and E90. Literature: Hoehle & an der Heiden (2014, 'Bayesian nowcasting during the STEC O104:H4 outbreak in Germany, 2011', *Biometrics* 70(4): 993-1002); Guenther et al. (2021, *Biom J*, Bavaria COVID-19 nowcasts); Cori et al. (2013, *AJE* 178(9)); Fraser (2007).

## Overview
E38: German COVID-19 hospitalisation triangle (RKI, Hospitalization Nowcast Hub) with real as-of-then snapshots. E90: a hierarchical negative-binomial hazard nowcast across 16 states used to decide whether a hospital threshold is crossed ("call it today or wait?") with decision curves.

## Main Content

> [!definition] Discrete delay hazard
> For onset day $t$ and delay $d=0,1,\dots,D$, the hazard $h_{t,d}=\Pr(\text{reported at delay }d\mid\text{not reported before }d)$. The delay pmf is $p_{t,d}=h_{t,d}\prod_{k<d}(1-h_{t,k})$ and the reporting CDF $F_{t,d}=1-\prod_{k\le d}(1-h_{t,k})$. Model $\text{logit}\,h_{t,d}=a_d+\gamma_{\text{wd}(t+d)}+\kappa\,(t+d)$-type drift terms (reporting-weekday effect and a slow weekly drift). ^def-hazard

> [!definition] Cell likelihood
> $n_{t,d}\sim\text{NegBin}(\mu_{t,d},\phi)$, $\mu_{t,d}=N_t\,p_{t,d}$, $N_t=e^{\alpha_t}$ with $\alpha_t$ a random walk (or GP). Observed cells satisfy $t+d\le T$; the nowcast is $\hat N_t=\sum_{d\le T-t}n_{t,d}+\sum_{d>T-t}\hat\mu_{t,d}$ (observed part plus posterior-predictive for the future cells). Compare multiplicative NobBS: $p_{t,d}\to\beta_d$ constant ([[McGough 2020 - NobBS Model and Priors]]). Hierarchical version (E90): state-level $\alpha_{s,t}$ with partial pooling of $a_d$ across states ([[Hierarchical Models]]). ^def-hazard-lik

> [!theorem] Spurious "wave ending"
> If $N_t$ grows at rate $r>0$ and reporting CDF is $F_k$ at lag $k$, the reported count for onset day $T-k$ is $N_{T-k}F_k$. The ratio of the latest day's reported count to day $T-m$'s is $e^{rm}F_0/F_m$, which is below 1 whenever $F_0<F_me^{-rm}$; so reported counts can decline in the last days even in exponential growth. Nowcasting divides by $F_k$ (inflating by $1/F_k$) to remove it; using as-of-then snapshots rather than a final preprocessed file is the only honest backtest. ^thm-wave-end

> [!definition] Renewal equation as triangular solve
> $I_t=R_t\sum_{s=1}^{S}w_sI_{t-s}$ (with susceptible depletion ignored) is lower-triangular in $t$: given $I_{1:S}$ seeds and $R_{1:T}$, each $I_t$ follows from earlier ones, i.e. $I=(\text{Id}-\text{diag}(R)\,W)^{-1}\text{seed}$. Place $\log R_t$ on a random walk, observe $I$ through the delay hazard model, and fit $R_t$ and the nowcast jointly (so uncertainty in the latest incidence flows into $R_t$). Generation interval $w$ is supplied externally ([[Gostic 2020 - Generation Interval and the Renewal Equation]]). ^def-renewal-solve

> [!definition] Decision use (E90)
> Declare "threshold crossed" when $\Pr(\text{7-day incidence}>c\mid\text{data})>p^*$. Choose $p^*$ by net benefit across thresholds (decision curve) rather than a fixed 0.5; waiting reduces false alarms but costs time. See [[Vickers 2019 - Net Benefit and Threshold Probability]]. ^def-decision-call

## Examples

> [!example] Exponential growth check
> $r=0.1$/day, $F=(0.2,0.5,0.8,1)$ for lags $0..3$. Reported ratio of today to 3 days ago $=e^{0.3}\cdot0.2/1=0.27$ instead of the true $e^{0.3}=1.35$: the series looks like a 73% crash. Dividing each day by its $F_k$ gives back 1.35. ^ex-wave

```python
import numpy as np
def renewal(R, w, seed):
    S=len(w); I=list(seed)
    for t in range(len(seed), len(R)):
        I.append(R[t]*sum(w[s-1]*I[t-s] for s in range(1,min(S,t)+1)))
    return np.array(I)
w=np.array([.1,.3,.3,.2,.1])
I=renewal(np.full(60,1.2), w, [10]*5)   # R=1.2 -> growth
```

```python
# PyMC sketch (untested): hazard nowcast
import pymc as pm, pytensor.tensor as pt
with pm.Model():
    a = pm.Normal("a", 0, 1.5, shape=D+1)
    gam = pm.ZeroSumNormal("gam", sigma=0.3, shape=7)
    h = pm.math.sigmoid(a[d_idx] + gam[wd_idx])
    # p_d = h_d * prod_{k<d}(1-h_k): build via cumulative sum of log(1-h) over d for each t
    ...
    N = pt.exp(pm.GaussianRandomWalk("alpha", sigma=pm.HalfNormal("s",.2), shape=T))
    pm.NegativeBinomial("n", mu=N[t_idx]*p[obs], alpha=pm.Exponential("phi",.1), observed=n_obs)
```

## Connections
For $R_t$ biases from observation delay and truncation see [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]]. Survival analysis perspective: [[Survival Analysis]] (reverse-time hazard = hazard in the time-to-report).

## See Also
[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]]
