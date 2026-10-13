---
title: "Jin 2017 MMM - Simulation Design, Signal Strength and Priors"
tags:
  - source/ingested
  - topic/market-response
  - topic/model-validation
  - topic/mcmc
  - type/definition
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 5 intro and 5.1, pp. 10-13 (Eq. 17, Tables 1-3, Figure 4); Appendix Figure 18, pp. 31-32"
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]"
  - "[[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]"
  - "[[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]]"
  - "[[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]"
aliases:
  - Jin 2017 simulation setting
  - Jin Table 1 generating parameters
  - Jin Table 2 signal strength
  - Jin Table 3 priors
  - MMM signal strength metric
---

# Jin 2017 MMM - Simulation Design, Signal Strength and Priors

> [!summary]
> Section 5.1 sets up the synthetic dataset that every simulation in the paper reuses (Sections 5, 6 and 7). It has **two years of weekly data**, three media and one price control. Sales come from the full model (Eq. 7) with **delayed adstock + $\beta$Hill**. Table 1 gives the true parameters. Table 2 gives each component's **share of sales variance** (Eq. 17): Media 1 18.1%, Media 2 19.4%, Media 3 5.8%, price 22.5%, noise 12.9%. Table 3 gives the priors. The authors say this signal is as strong as or stronger than most real MMM data, so the later bias results are, if anything, **optimistic**. One fit took 52 s with the custom Gibbs sampler (10,000 iterations) and 1149 s with STAN (1000 iterations).
^summary

## Overview

Every simulation-based claim in the paper depends on this data-generating process (DGP), so its details matter. They include how spend is generated, how correlated the channels are, how strong each signal is, and how the priors sit relative to the truth. A model that recovers truth under *this* DGP has passed a fairly easy test. The vault's [[Designing Simulated-Data Experiments]] and the ADEMP checklist ([[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]) explain why the DGP has to be reported this fully.

## Main Content

> [!definition] Data-generating mechanism (Sec. 5.1, p. 11)
> - **Length:** 2 years of weekly observations.
> - **Media ($M=3$):** each spend series is a **sinusoidal seasonality with a one-year period plus white noise**, then scaled to $[0,1]$. Because of this construction, all media share the **same marginal distribution** of weekly spend. Figure 4d shows Media 1's histogram spread across 0 to 1.
> - **Control ($C=1$):** price, generated as an **ARIMA** time series.
> - **Response:** sales $y_t$ from Eq. (7) with **delayed adstock** (Eq. 3) followed by **$\beta$Hill** (Eq. 5). The response is not transformed.
> - **Correlation:** the text says the media are "very weakly correlated with a correlation of 0.09". The correlation heat-map of one typical dataset (Fig. 4e) shows pairwise values: media1-media2 0.11, media1-media3 0.17, media2-media3 0.16, price-media1 -0.10, price-media2 0.18, price-media3 0.01.
^dgp

> [!definition] Table 1 — generating parameters (p. 11)
> **(a) Media-specific**
>
> | Parameter | Media 1 | Media 2 | Media 3 |
> |---|---|---|---|
> | $\alpha$ (retention) | 0.6 | 0.8 | 0.8 |
> | $\theta$ (peak delay, weeks) | 5 | 3 | 4 |
> | $K$ (half-saturation) | 0.2 | 0.2 | 0.2 |
> | $S$ (slope) | 1 | 2 | 2 |
> | $\beta$ (max effect) | 0.8 | 0.6 | 0.3 |
>
> **(b) Other**
>
> | Parameter | Value |
> |---|---|
> | $L$ (max carryover, weeks) | 13 |
> | $\tau$ (baseline) | 4 |
> | $\gamma$ (price effect) | -0.5 |
> | $\epsilon$ | normal$(0, 0.05^2)$ |
>
> Note that $K=0.2$ lies **inside** the observed spend range $[0,1]$. Section 7.2 later breaks this assumption on purpose with $K=2$.
^table1

> [!definition] Signal-strength metric (Eq. 17, p. 11)
> For medium $m$, the share of sales variance it explains is
> $$\frac{\operatorname{Var}\!\big(\beta_m\,\text{Hill}(x^*_{t,m};K_m,S_m)\big)}{\operatorname{Var}(y_t)},$$
> with the same ratio used for price ($\gamma z_t$) and noise ($\epsilon_t$).
^eq17

> [!definition] Table 2 — variance of sales explained (p. 13)
>
> | Media 1 | Media 2 | Media 3 | Price | Noise |
> |---|---|---|---|---|
> | 18.1% | 19.4% | 5.8% | 22.5% | 12.9% |
>
> The shares sum to **less than 100%** (78.7%). The authors explain this as covariance between the slightly positively correlated components: the variance of a sum of positively correlated terms exceeds the sum of their variances. They advise comparing each medium against the **noise** row. Media 1 and 2 are comparable in strength, while Media 3 is much weaker.
^table2

> [!warning] The simulation is easier than real data
> The authors say the signal strength here "is similar as or stronger than that of most media mix data sets we have seen" (p. 11). Real data often has high noise from omitted variables and small media effects (Chan & Perry 2017). They chose this setting to "better illustrate the model and how well it can be estimated". The underestimation in [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] is therefore probably a **lower bound** on what real two-year MMMs suffer.
^easier-than-real

> [!definition] Table 3 — priors used in estimation (p. 13)
>
> | Parameter | Prior | Parameter | Prior |
> |---|---|---|---|
> | $\alpha$ | beta$(3,3)$ | $\tau$ | normal$(0,5)$ |
> | $\theta$ | uniform$(0,12)$ | $\gamma$ | normal$(0,1)$ |
> | $K$ | beta$(2,2)$ | $\operatorname{Var}(\epsilon)$ | inverse gamma$(0.05, 0.0005)$ |
> | $S$ | gamma$(3,1)$ | | |
> | $\beta$ | half normal$(0,1)$ | | |
>
> The priors were "chosen to contain the true parameter values, but with significant variance around the true values". They are weakly informative and **correctly located**, so the small-sample bias in Section 6 is not caused by a misplaced prior. One thing to note about their shape: beta$(3,3)$ has mean 0.5, below the true $\alpha$ of 0.6-0.8. Beta$(2,2)$ has mean 0.5, above the true $K=0.2$. Half-normal$(0,1)$ has its mode at 0, below every true $\beta$. In the STAN code (Appendix) the $\beta$ prior is written as `normal(0,1)` on a parameter declared `<lower=0>`, which is equivalent to half-normal.
^table3

## Examples

> [!example] Sampler timing on one simulated dataset (p. 11)
> - Custom C++ Gibbs (slice) sampler, **10,000 iterations: 52 seconds**.
> - STAN (HMC/NUTS), **1000 iterations: 1149 seconds**.
>
> Per iteration the Gibbs sampler is roughly 220 times faster (my arithmetic: 1149/1000 s vs 52/10000 s). HMC iterations are usually more informative, so effective-sample-size-per-second would be the fairer comparison (see [[Effective Sample Size and Monte Carlo Standard Error]]). The paper does not report it. See [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]].
^sampler-timing-on-one

> [!example] Figure 18 — posteriors on one simulated dataset (Appendix, pp. 31-32)
> Figure 18 shows posterior densities of (a) $\beta$, (b) $\alpha$, (c) $\theta$, (d) $K$, (e) $S$ and (f) the $\beta$Hill curves, each for Media 1-3, on **one** two-year simulated dataset. The caption does not define the lines. In panels (a)-(e) a solid vertical line (red in most panels, thin black in a few) sits at the Table 1 value in every panel, so it marks the truth; a dashed black line marks a posterior summary (median or mean, not stated). In (f) the red curve equals the true $\beta\text{Hill}$ (e.g. Media 1 at $x=1$: $0.8/(1+0.2)=0.67$), the blue curve is a posterior central curve and the grey shading is posterior density. Tick marks along the bottom of (f) show observed spend.
>
> **Sampler.** The paper does not say which sampler produced Fig. 18. It is cited (p. 11) directly after the timing sentence that covers both samplers, and the Appendix STAN program is described as estimating the model "on the simulated data set in Section 5". Either could be the source.
>
> **Readings against Table 1 (approximate, read off the plots):**
>
> | Panel | Medium | Truth | Posterior range (x-axis) | Mode / dashed line | Verdict |
> |---|---|---|---|---|---|
> | (a) $\beta$ | 1 | 0.8 | about 0.1-3.0, peak density about 1.3 | mode about 0.6, dashed about 0.75 | centred near truth, long right tail to about 3 |
> | (a) $\beta$ | 2 | 0.6 | about 0.2-2.8, peak about 2.0 | mode about 0.5, dashed about 0.6 | on truth, tail to about 2.8 |
> | (a) $\beta$ | 3 | 0.3 | about 0-2.2, peak about 3.6 | mode about 0.1, dashed about 0.15 | **pulled toward 0**, half the true value |
> | (b) $\alpha$ | 1 | 0.6 | about 0.3-0.87, peak about 5.3 | mode about 0.7, dashed about 0.66 | slightly high |
> | (b) $\alpha$ | 2 | 0.8 | about 0.53-0.91, peak about 7.9 | mode and dashed about 0.72 | slightly low, truth in upper shoulder |
> | (b) $\alpha$ | 3 | 0.8 | **about 0.05-1.0** (nearly all of $[0,1]$), peak about 2.0 | dashed about 0.53 | barely informed; truth in upper tail |
> | (c) $\theta$ | 1 | 5 | about 4.5-5.65, peak about 3.0 | about 5.07 | tight, on truth |
> | (c) $\theta$ | 2 | 3 | about 2.6-4.0, peak about 2.1 | about 3.3 | tight, biased up by about 0.3 week |
> | (c) $\theta$ | 3 | 4 | spike at 4 (peak about 0.62) plus a small bump near 2 and a thin tail to 12 | about 4 | mode on truth, but heavy tail over the prior range |
> | (d) $K$ | 1 | 0.2 | about 0-1.0, peak about 2.5 | mode about 0.3, dashed about 0.4 | **biased up**, spread over most of $[0,1]$ |
> | (d) $K$ | 2 | 0.2 | about 0.05-0.35 (thin tail to 0.95), peak about 6.2 | about 0.22 | tight, on truth |
> | (d) $K$ | 3 | 0.2 | about 0-1.0, flat and multimodal, peak about 1.5 | dashed about 0.48 | **biased up**, nearly prior-shaped (beta(2,2)) |
> | (e) $S$ | 1 | 1 | about 0.2-5, peak about 0.78 | mode about 1, dashed about 1.15 | on truth, right tail |
> | (e) $S$ | 2 | 2 | about 0.3-6, peak about 0.58 | mode about 1.7, dashed about 2.0 | on truth, wide |
> | (e) $S$ | 3 | 2 | about 0-12, peak about 0.33 | mode about 1.5, dashed about 2.0 | very wide, tail to 12 |
>
> **Panel (f), $\beta$Hill curves** (x = spend 0-1; y-axes run to about 1.0, 1.2-1.3 and 0.8):
>
> | Medium | True curve at $x=1$ (red) | Blue curve at $x=1$ | Where the gap opens | Shading |
> |---|---|---|---|---|
> | 1 | about 0.67 | about 0.53 | from about $x=0.05$; at $x=0.2$ about 0.40 vs 0.24 | reaches the top of the axis (about 1.0) |
> | 2 | about 0.58 | about 0.56 | curves almost coincide (S-shape, $S=2$) | reaches about 1.2 |
> | 3 | about 0.29 | about 0.11 | from about $x=0.15$; truth plateaus by $x\approx0.5$ | reaches about 0.8 |
>
> **What this shows.** On this one dataset Media 2 is recovered well, Media 1's curve is too low because $K$ is biased up, and Media 3's curve is less than half the truth because $\beta$ is pulled toward 0 and $K$ up. The pattern matches the 500-replicate averages in Table 4 (two years: Media 1 -32.5%, Media 2 -18.1%, Media 3 -25.3% at $x=1$), although the single-dataset Media 2 gap is smaller than the replicate average. The adstock parameters are tight for Media 1-2 but the Media 3 retention rate spreads over almost all of $[0,1]$. Even on one dataset the adstock is not uniformly well recovered. See [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)#^table4]].
^fig18

> [!example] Figure 4 — the simulated data (p. 12)
> Panels: (a) weekly sales, about 5.0-5.4 over about 100 weeks; (b) price, about -0.5 to 0.25; (c) the three media spend series, overlaid and seasonal; (d) histogram of weekly Media 1 spend over $[0,1]$; (e) correlation matrix of media and price (values above).
^figure-4-the-simulated

## Connections

- Reused by: [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]] (Sec. 5.2), [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] (Sec. 6), [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] (Sec. 7).
- The DGP leaves out synergy, endogenous targeting and funnel effects. The later [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] simulator was built to add them (see also [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]]).
- Prior choices are discussed generally in [[Bayesian Estimation and Priors for MMM#^prior-specs]], [[Prior Distributions]] and [[Constructing Priors for Effect Sizes]].
- Reporting a DGP in full like this is what [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] asks for.

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map
- [[Designing Simulated-Data Experiments]]
- [[Simulated-Data Experimentation as Virtual Replication]]
- [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] — example of simulation validation with known truth
