---
title: Interpreting SBC Histograms
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/1804.06788-Talts-SBC.pdf]]"
source_location: "Sec. 4.2, 5.1, 5.2, pp. 6-11 (Figs. 3-8)"
date_ingested: 2026-06-17
folder: "Bayesian Statistics/Workflow"
doc_type: paper
depends_on:
  - "[[The SBC Algorithm]]"
  - "[[Rank Statistics and Uniformity]]"
  - "[[Data-Averaged Posterior Self-Consistency]]"
used_by:
  - "[[SBC Case Studies]]"
  - "[[Simulation-Based Calibration - Overview]]"
aliases:
  - SBC Histogram Shapes
  - Reading SBC Diagnostics
---

# Interpreting SBC Histograms

> [!summary]
> The diagnostic power of SBC is that the *shape* of the deviation from uniformity tells you *how* the computed posterior is wrong. Uniform = correct. ∩-shaped (peak in the middle) = posterior over-dispersed (too wide). ∪-shaped (spikes at both ends) = posterior under-dispersed (too narrow). Sloped/asymmetric = posterior biased. Boundary spikes specifically also signal autocorrelation in MCMC, fixed by thinning.

## Overview

Deviations of the rank histogram from discrete uniform $U[0,L]$ are interpretable because each failure mode of the computed posterior — over-dispersion, under-dispersion, bias — distorts the rank distribution in a distinct, recognizable way. The reasoning mirrors the forecast-calibration literature (Anderson 1996; Hamill 2001). Each rank histogram is read against its 99% gray band (see [[The SBC Algorithm]]); deviations clearly outside the band flag problems.

Intuition: the rank of the prior draw $\tilde\theta$ measures where it falls within the *computed* data-averaged posterior. Under correct computation the data-averaged posterior equals the prior ([[Data-Averaged Posterior Self-Consistency]]), so $\tilde\theta$ lands uniformly. Distortions of the computed data-averaged posterior relative to the prior produce the characteristic shapes below.

## Main Content

> [!definition] Histogram shape → failure mode
> Let the computed data-averaged posterior be compared to the prior. The rank histogram shapes (Figs. 3-7) are:
> - **Uniform / flat (Fig. 3):** ranks consistent with $U[0,L]$. Computed posterior = exact; samples are independent draws from the correct posterior of a correctly specified model. ✅
> - **∩-shaped — symmetric peak in the middle (Fig. 5):** computed data-averaged posterior is **over-dispersed** (wider) relative to the prior ⇒ on average the computed posterior is **too wide** (over-conservative). Prior draws land in the central ranks too often.
> - **∪-shaped — symmetric spikes at both extremes (Fig. 6):** computed data-averaged posterior is **under-dispersed** (narrower) than the prior ⇒ on average the computed posterior is **too narrow** (overconfident). Prior draws fall outside the bulk, hitting extreme ranks.
> - **Sloped / asymmetric (Fig. 7):** the data-averaged posterior is **biased** (shifted) relative to the prior ⇒ the posterior is biased in the *same* direction; ranks are biased in the *opposite* direction. Posterior samples biased to **smaller** values → **higher** ranks; biased to **larger** values → **lower** ranks.
> ^def-shapes

A misbehaving analysis can show several deviations at once, but because the signatures are distinct they can usually be separated when large enough. Importantly, SBC tells you not just *that* a problem exists but *how* it will affect inferences.

> [!definition] Autocorrelation signature & thinning correction
> Correlated posterior samples (from MCMC) cluster relative to the preceding prior sample, **biasing ranks toward the extremes** and producing spikes at the boundaries (Fig. 4) — visually similar to the under-dispersed ∪-shape. This violates Theorem 1's independence assumption. The correction is **thinning**:
> - Under ergodicity, an MCMC estimator obeys a CLT $\tfrac{1}{N_{\mathrm{eff}}}\sum_{n=1}^{N_{\mathrm{eff}}} f(\theta_n) \sim \mathrm{N}\!\big(\mathbb{E}[f], \mathbb{V}[f]/N_{\mathrm{eff}}[f]\big)$ with effective sample size
> $$N_{\mathrm{eff}}[f] = \frac{N_{\mathrm{samp}}}{1 + 2\sum_{m=0}^{\infty}\rho_m[f]},$$
> where $\rho_m[f]$ is the lag-$m$ autocorrelation. Roughly, $N_{\mathrm{samp}}$ correlated draws carry the information of $N_{\mathrm{eff}}$ independent draws.
> - **Thin** by keeping every $T$-th state so that $2\sum_{m=T}^{\infty}\rho_m[f] < \epsilon$ ⇒ negligible autocorrelation. In practice, when $N_{\mathrm{eff}}[f] \le N$, thinning by $\lceil N/N_{\mathrm{eff}}[f]\rceil$ suffices (this is Algorithm 2's step). Antithetic chains (e.g. dynamic HMC) can have $N_{\mathrm{eff}} > N$; first thin by 2 to remove negative odd-lag correlations, then thin as above.
> - More conservative thinning (Geyer 1992) can remove autocorrelation entirely but yields much smaller samples with no observed SBC benefit.
> - **Deviations that thinning cannot fix** are strong evidence that the MCMC estimators do *not* obey a CLT and the chain is not adequately exploring the target — a genuine algorithmic failure, not an artifact.
> ^def-autocorr

> [!definition] Visualizing small deviations (Sec. 5.2)
> For deviations too small to see in the histogram: (a) re-bin the histogram multiple times (but watch for multiple-testing bias); (b) pair the SBC histogram with the **empirical CDF (ECDF)** of the ranks (Fig. 8b), which reduces variation at the extremes and highlights low/high-rank deviations; (c) plot the **ECDF difference** — the ECDF minus the expected uniform stepwise-linear behavior — which makes small deviations most evident (Fig. 8c). Subtler still: rank quantiles or averages, though these are harder to interpret. The authors currently recommend the SBC histogram whenever possible; a robust suite of summary statistics is an open research area.
> ^def-smalldev

## Examples

> [!example] Over- vs under-dispersion side by side
> **Setup:** Fig. 5 (∩) shows a broad computed data-averaged posterior over a narrow prior; Fig. 6 (∪) shows a narrow computed posterior over a broad prior.
> **Result:** ∩ ⇒ posterior too wide on average; ∪ ⇒ posterior too narrow (overconfident) on average.
> **Interpretation:** the dispersion mismatch in the $f(\theta)$ density panel directly predicts the histogram shape — a fast visual diagnosis of the error's direction.
> ^ex-dispersion

> [!example] Autocorrelation masquerading as under-dispersion
> **Setup:** Un-thinned MCMC with positively correlated draws (Fig. 4; also Fig. 11b for 8-schools $\tau$).
> **Result:** boundary spikes at ranks $0$ and $L$, resembling a ∪-shape.
> **Interpretation:** before declaring the posterior under-dispersed, thin to $L$ effective draws; if the spikes vanish (Fig. 11a) it was autocorrelation, not a sampling error.
> ^ex-autocorr

## Connections

- **Depends on:** [[The SBC Algorithm]] (produces the histograms); [[Rank Statistics and Uniformity]] (uniform = null); [[Data-Averaged Posterior Self-Consistency]] (why distortions map to shapes).
- **Applied in:** [[SBC Case Studies]] — misspecified prior (∪), HMC bias on centered 8-schools (sloped), un-thinned autocorrelation (boundary spikes), ADVI gross bias, INLA subtle low-rank deviation seen only via ECDF difference.
- **Complements:** posterior predictive checks in [[Model Checking]]; convergence/$\hat R$/$N_{\mathrm{eff}}$ diagnostics in [[MCMC Basics]] and [[Efficient MCMC]].

## See Also

- [[The SBC Algorithm]]
- [[Rank Statistics and Uniformity]]
- [[SBC Case Studies]]
- [[Simulation-Based Calibration - Overview]]
- [[Model Checking]]
- [[Bayesian Workflow - Overview]] — SBC histogram interpretation is a key step in the broader Bayesian workflow
