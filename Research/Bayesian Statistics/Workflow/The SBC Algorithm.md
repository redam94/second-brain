---
title: The SBC Algorithm
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/1804.06788-Talts-SBC.pdf]]"
source_location: "Sec. 4.1 (Algorithm 1, p. 6), Sec. 5.1 (Algorithm 2, p. 9)"
date_ingested: 2026-06-17
folder: "Bayesian Statistics/Workflow"
doc_type: paper
depends_on:
  - "[[Rank Statistics and Uniformity]]"
  - "[[Data-Averaged Posterior Self-Consistency]]"
used_by:
  - "[[Interpreting SBC Histograms]]"
  - "[[SBC Case Studies]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]]"
aliases:
  - SBC Algorithm
  - Algorithm 1
  - Algorithm 2
---

# The SBC Algorithm

> [!summary]
> The SBC procedure: for each of $N$ replications, draw a ground truth from the prior, simulate data from it, fit the algorithm to get $L$ posterior draws, then compute the rank of the prior draw within those draws for each one-dimensional quantity of interest. Histogram the ranks across replications; under correct computation they form a discrete uniform $U[0,L]$. Algorithm 2 adds a thinning step so the procedure works with correlated MCMC samples.

## Overview

SBC operationalizes the uniformity theorem ([[Rank Statistics and Uniformity]]). Its only requirement is a generative model. It is expensive — you fit $N$ simulated datasets before ever touching your real data — but the $N$ fits are *embarrassingly parallel* (clusters/cloud; the paper's examples ran in at most a few hours). Even a handful of simulations catches gross problems.

## Main Content

> [!definition] Algorithm 1 — Simulation-Based Calibration (ideal / independent samples)
> Initialize a histogram with bins centered around $0,1,\dots,L$.
> **for** $n$ in $1,\dots,N$ **do**
> 1. Draw a prior sample $\tilde\theta \sim \pi(\theta)$.
> 2. Draw a simulated dataset $\tilde y \sim \pi(y \mid \tilde\theta)$.
> 3. Draw posterior samples $\{\theta_1,\dots,\theta_L\} \sim \pi(\theta \mid \tilde y)$ (via the algorithm under test).
> 4. **for** each one-dimensional random variable $f$ **do**: compute the rank statistic $r(\{f(\theta_1),\dots,f(\theta_L)\}, f(\tilde\theta)) = \sum_{l=1}^L \mathbb{I}[f(\theta_l) < f(\tilde\theta)]$ and increment that quantity's histogram.
>
> Analyze each histogram for uniformity against discrete $U[0,L]$.
> ^def-alg1

**Parameter choices.**
- **$N$** = number of replications (independent $(\tilde\theta,\tilde y)$ datasets). Limited by compute; controls the sensitivity of the histogram. The paper used $N=10{,}000$ for the regression/8-schools experiments and $N=1000$ for the expensive INLA spatial model.
- **$L$** = number of posterior draws per dataset → $L+1$ possible ranks → bins span $\{0,\dots,L\}$. The experiments use $L=100$, so ranks follow $U[0,100]$. Reducing $L$ speeds the procedure at the cost of sensitivity.
- **Choosing $L+1$ as a power of 2** makes re-binning easy: e.g. take $L+1 = 1024$ ⇒ $L = 1023$ draws when compute-limited.
- **Confidence band:** each histogram is overlaid with a gray band covering 99% of the variation expected under uniformity. Formally the band runs from the 0.005 to the 0.995 percentile of $\mathrm{Binomial}(N, (L+1)^{-1})$, so on average only ~1 bin in 100 should poke outside it under correct computation.
- **Re-binning for noise reduction:** pair neighboring ranks into $B = L/2$ (or fewer) coarser bins; experience shows $N/B \approx 20$ gives a good trade-off between expressiveness and variance reduction.

> [!definition] Algorithm 2 — SBC for correlated MCMC (with thinning)
> Initialize a histogram with bins centered around $0,\dots,L$.
> **for** $n$ in $1,\dots,N$ **do**
> 1. Draw $\tilde\theta \sim \pi(\theta)$; draw $\tilde y \sim \pi(y \mid \tilde\theta)$.
> 2. Run the Markov chain for $L'$ iterations to generate correlated posterior samples $\{\theta_1,\dots,\theta_{L'}\} \sim \pi(\theta \mid \tilde y)$.
> 3. Compute the effective sample size $N_{\mathrm{eff}}[f]$ of $\{\theta_1,\dots,\theta_{L'}\}$ for the function $f$.
> 4. **if** $N_{\mathrm{eff}}[f] < L$ **then** rerun the Markov chain for $L' \cdot L / N_{\mathrm{eff}}[f]$ iterations.
> 5. Uniformly thin the correlated sample to $L$ states and truncate any leftover draws at $L$.
> 6. Compute the rank statistic (Eq. 4.1) and increment the histogram.
>
> Analyze the histogram for uniformity.
> ^def-alg2

The thinning in Algorithm 2 restores the *independence* condition that Theorem 1 requires (see [[Interpreting SBC Histograms]] for the autocorrelation rationale). When running SBC over multiple quantities, thin the chain once using the *largest* thinning value determined over all quantities; the paper recommends a minimum $N_{\mathrm{eff}}$ based on empirical quantiles of $f(\theta)$ (e.g. 19 equispaced quantiles).

## Examples

> [!example] Standard experiment configuration
> **Setup:** $L = 100$ posterior draws per fit so ranks follow $U[0,100]$; $N = 10{,}000$ replications for the regression and 8-schools studies, $N = 1000$ for INLA.
> **Result:** Each parameter / quantity gets its own rank histogram with a 99% gray band.
> **Interpretation:** Uniform histogram ⇒ calibrated computation; structured deviations ⇒ specific failure modes (see [[Interpreting SBC Histograms]], [[SBC Case Studies]]).
> ^ex-config

## Connections

- **Depends on:** [[Rank Statistics and Uniformity]] (Eq. 4.1 + Theorem 1 justify the test); [[Data-Averaged Posterior Self-Consistency]] (steps 1-3 realize a joint draw).
- **Feeds:** [[Interpreting SBC Histograms]] (output interpretation); [[SBC Case Studies]] (Algorithm 1 for non-correlated samplers like ADVI/INLA; Algorithm 2 for thinned MCMC; Algorithm 1 deliberately used un-thinned to *expose* autocorrelation in 8-schools).
- **Workflow:** the concrete tool for the validation step in [[Fitting and Validating Computation]] / [[Bayesian Workflow - Overview]].

## See Also

- [[Rank Statistics and Uniformity]]
- [[Interpreting SBC Histograms]]
- [[SBC Case Studies]]
- [[Simulation-Based Calibration - Overview]]
- [[Efficient MCMC]]
- [[Model Checking]] — SBC is a principled form of prior predictive / computational model checking
- [[Approximate Bayesian Computation for ABMs]] — ABC likewise validates models by comparing simulated and observed summary statistics; a simulation-based analogue in the ABM calibration domain
