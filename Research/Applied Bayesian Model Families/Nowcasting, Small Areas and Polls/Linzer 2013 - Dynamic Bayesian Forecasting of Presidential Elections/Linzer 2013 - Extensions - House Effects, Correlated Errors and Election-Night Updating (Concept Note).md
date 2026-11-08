---
title: "Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]"
source_location: "Concept note, no raw source (extends Secs. 2-3, pp. 125-128)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections"
doc_type: paper
depends_on:
  - "[[Linzer 2013 - Reverse Random-Walk Model and Priors]]"
  - "[[Linzer 2013 - Forecast Computation and Electoral College Simulation]]"
used_by:
  - "[[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]]"
aliases:
  - "house effects and correlated state errors"
  - "election night importance reweighting"
  - "interval-censored race calls"
---

# Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)

> [!summary]
> Concept note, no raw source. It collects the extensions that the PyMC examples E40, E94 and E95 add to Linzer's model: pollster/mode/population effects, a shared polling error, correlated state innovations, a fundamentals prior learned from history, and, on election night, updating the frozen forecast by importance reweighting with race calls treated as interval (censored) data. Literature to consult: Jackman (2005, *Aust J Polit Sci*, "Pooling the polls"); Gelman & King (1993); Heidemanns, Gelman & Morris (2020, *Harvard Data Science Review*, updated Economist model); Rubin (1987, SIR); Kish (1965, effective sample size).

## Overview
Linzer (2013) deliberately omits house effects ("impractical") and treats states as conditionally independent given $\delta_j$. Later models (Jackman 2005; Heidemanns et al. 2020) add them back.

## Main Content

> [!definition] Poll-level model with house, mode and population effects
> For poll $k$ in state $i$, day $j$, pollster $f$, mode $m$ and population $p$: $\hat\pi_k\sim N\big(\mu_{i,j}+a_f+b_m+c_p+\epsilon_k^{\text{poll}},\ s_k^2\big)$ with $s_k^2=\hat\pi_k(1-\hat\pi_k)/n_k$, pollster effects $a_f\sim N(0,\sigma_a^2)$ (partial pooling), and a **shared** (non-sampling) polling error $\eta_{i}$ common to all polls of the same race. Because truth and a common bias are not separately identified from polls alone, E40 uses a rotation (reparameterisation) that puts the unidentified combination under the fundamentals prior. ^def-house-effects

> [!definition] Correlated state innovations
> Replace independent state random walks with $\Delta\beta_{\cdot,j}\sim N(0,\Sigma)$, $\Sigma=\text{diag}(\sigma)\,\Omega\,\text{diag}(\sigma)$, with $\Omega$ from an LKJ prior or a kernel on demographic distance (ACS state covariates). This makes simultaneous misses across similar states likely and widens the tails of the electoral-vote distribution (compare [[Linzer 2013 - Forecast Computation and Electoral College Simulation]]). ^def-corr-state

> [!definition] Fundamentals prior learned from history
> Instead of fixing $h_i$ by hand (Linzer's Time-for-Change plus home-state rule), fit a regression of past state results (1976-2016 in E40; 2016-2026 in E94 for midterms with FEC money and partisan lean) on incumbency, economy, previous result and covariates, and use its predictive distribution for $\beta_{iJ}$ (and $\tau_i^{-1}$ = its predictive variance, replacing the analyst's $\tau_i$). ^def-learned-prior

### Election-night updating (E95)

> [!theorem] Importance reweighting of a frozen forecast
> Let posterior draws $\theta^{(m)}$, $m=1..M$, of race margins $x_r^{(m)}$ come from the pre-election model. A race call $c_r$ is data: the call "Democrat wins race $r$" is the event $\{x_r+\varepsilon_r>0\}$ where $\varepsilon_r\sim N(0,\sigma_r^2)$ is race-level noise between the frozen margin and the final tally. Integrating $\varepsilon_r$ out, the likelihood is the interval probability
> $$L_r(x_r)=\Phi\!\Big(\tfrac{b_r-x_r}{\sigma_r}\Big)-\Phi\!\Big(\tfrac{a_r-x_r}{\sigma_r}\Big),$$
> with $(a_r,b_r)=(0,\infty)$ for a Democratic call, $(-\infty,0)$ for a Republican call, $(-c,c)$ for "too close to call", and a normal density $N(\text{margin}_r^{\text{final}};x_r,\sigma_r^2)$ once a final margin is known. Weights $w^{(m)}\propto\prod_{r\in\text{called}}L_r(x_r^{(m)})$, and any functional (seat count, control probability) is $\sum_m w^{(m)}g(\theta^{(m)})/\sum_m w^{(m)}$. Effective sample size $\text{ESS}=(\sum_mw^{(m)})^2/\sum_m (w^{(m)})^2$ signals degeneracy; when ESS gets small, refit. The identical posterior arises from refitting in PyMC with `pm.Potential(...)` adding $\sum_r\log L_r$. ^thm-importance

## Examples

> [!example] One race, 4 draws
> Margins (D-R, points) $x=(-3,-1,1,3)$, $\sigma_r=2$, the AP calls the race for the Democrat. $L(x)=1-\Phi(-x/2)=\Phi(x/2)$ gives $(0.067,0.309,0.691,0.933)$; normalised weights $=(0.033,0.153,0.343,0.462)$ (sum 1). The reweighted mean margin is $-3(0.033)-1(0.153)+1(0.343)+3(0.462)=1.48$, up from 0, and ESS $=1/\sum w^2\approx 2.9$ of 4. ^ex-reweight

```python
import numpy as np
from scipy.stats import norm
def reweight(margins, calls, sigma=2.0, close=1.0):
    """margins: M x R draws; calls: dict race_idx -> 'D','R','TCTC'."""
    logw=np.zeros(len(margins))
    for r,c in calls.items():
        a,b={'D':(0,np.inf),'R':(-np.inf,0),'TCTC':(-close,close)}[c]
        logw+=np.log(norm.cdf((b-margins[:,r])/sigma)-norm.cdf((a-margins[:,r])/sigma)+1e-300)
    w=np.exp(logw-logw.max()); w/=w.sum()
    return w, 1.0/np.sum(w**2)
```

## Connections
Linzer's final posterior is exactly the object that gets frozen and reweighted. Marketing: the same "reweight frozen posterior draws by new aggregate data" is a cheap way to update an MMM posterior with a newly arrived experiment result (importance sampling with ESS check) before a full refit; see [[Bayesian Workflow - Overview]].

## See Also
[[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]] · [[Hierarchical Models]]
