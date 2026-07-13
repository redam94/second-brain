---
title: SBC Case Studies
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/example
  - doc/paper
source: "[[raw/1804.06788-Talts-SBC.pdf]]"
source_location: "Sec. 6 & Appendix A, pp. 9-14, 17-18 (Figs. 9-13, Listings 1-4)"
date_ingested: 2026-06-17
date_updated: 2026-07-13
folder: "Bayesian Statistics/Workflow"
doc_type: paper
depends_on:
  - "[[The SBC Algorithm]]"
  - "[[Interpreting SBC Histograms]]"
used_by:
  - "[[Simulation-Based Calibration - Overview]]"
aliases:
  - SBC Experiments
  - SBC Worked Examples
---

# SBC Case Studies

> [!summary]
> The paper's experiments (Sec. 6) show SBC catching real, distinct failure modes across four algorithm/model combinations: a misspecified prior (correct code, wrong model → ∪-shape), biased HMC on a centered hierarchical model (8-schools funnel → sloped + autocorrelation spikes), a grossly biased ADVI variational approximation, and a subtle INLA bias in spatial disease mapping detectable only via the ECDF difference. All use $L=100$ posterior draws ⇒ ranks $\sim U[0,100]$.

## Overview

Each case implements SBC and reads the resulting rank histogram against the 99% band ([[Interpreting SBC Histograms]]). Sections 6.1-6.3 used $N=10{,}000$ replications; the expensive INLA study (6.4) used $N=1000$. The linear regression data-generating process and inference model are Listings 1-2 (Stan); 8-schools centered/non-centered are Listings 3-4.

## Main Content

> [!example] 6.1 Misspecified prior — under-dispersion (∪-shape)
> **Setup:** Linear regression (Listing 2). Prior *samples* drawn with $\beta \sim \mathrm{N}(0, 10^2)$ but the inference prior set to $\beta \sim \mathrm{N}(0, 1^2)$ — a common probabilistic-programming mistake (prior used to *generate* differs from prior used to *fit*).
> **Result:** Even with exact computation, the posterior for $\beta$ is under-dispersed relative to the (wider) generating prior; the SBC histogram shows the characteristic **∪-shape** with boundary spikes (Fig. 9).
> **Interpretation:** SBC detects *model* mis-implementation, not just buggy algorithms. The ∪ matches the over-confident / too-narrow signature of Fig. 6.
> ^ex-prior

> [!example] 6.2 Biased MCMC — centered 8-schools (sloped + autocorrelation)
> **Setup:** Hierarchical 8-schools model (Rubin 1981), **centered** parameterization (Listing 3): $\mu,\tau \sim \mathrm{N}(0,5)$, $\theta_j \sim \mathrm{N}(\mu,\tau)$, $y \sim \mathrm{N}(\theta,\sigma)$. This induces a funnel geometry that contracts to strong curvature at small $\tau$ — hard for any MCMC to explore. Fit with Stan's dynamic HMC; SBC run with **Algorithm 1** (un-thinned, deliberately, since the bias dominates and post-thinning to $L=100$ is impractical given the low effective sample rate).
> **Result:** Rank histograms for $\theta[1]$ and $\tau$ show HMC samples **biased toward larger $\tau$** than were used to generate the data (Fig. 10) — a sloped/asymmetric histogram consistent with the known funnel pathology. The **non-centered** parameterization (Listing 4) behaves correctly: thinned (Algorithm 2) it is uniform (Fig. 11a); un-thinned it shows large autocorrelation spikes at $L=100$ (Fig. 11b).
> **Interpretation:** SBC flags biased MCMC even when general-purpose divergence diagnostics are unavailable — especially valuable for hierarchical models. The centered/non-centered contrast also cleanly separates a true *bias* (Fig. 10) from an *autocorrelation artifact* (Fig. 11b), the latter removable by thinning.
> ^ex-8schools

> [!example] 6.3 ADVI fails on a simple model — gross bias
> **Setup:** Automatic Differentiation Variational Inference (ADVI) in Stan 2.17.1 applied to the *simple* linear regression (Listing 2). SBC run with **Algorithm 1** (ADVI produces independent, non-autocorrelated draws).
> **Result:** ADVI **drastically underestimates the posterior for the slope $\beta$**; the rank histogram is strongly biased toward larger $\beta$ values (Fig. 12), a sharp contrast with HMC's uniform histogram on the same model (Fig. 2).
> **Interpretation:** Even on an easy model a variational approximation can be badly miscalibrated; SBC exposes it immediately.
> ^ex-advi

> [!example] 6.4 INLA — subtle bias in spatial disease mapping
> **Setup:** Spatial HIV-prevalence model for the 2003 Kenya DHS (Corsi et al. 2012; setup from Wakefield, Simpson & Godwin 2016). $y_{ij} \sim \mathrm{Bin}(N_{ij}, p_{ij})$, $p_{ij} = \mathrm{logit}^{-1}(\beta_0 + S(x_i) + \epsilon_{ij})$ with a Gaussian process $S(\cdot)$ approximated via SPDE (Lindgren, Rue & Lindström 2011), Matérn-type covariance $c(x_1,x_2;\rho,\sigma) = \tfrac{\sqrt 8 \sigma^2}{\rho}\|x_1-x_2\| K_1(\tfrac{\sqrt8}{\rho}\|x_1-x_2\|)$. Priors: $\beta_0 \sim \mathrm{N}(-2.5, 1.5^2)$; penalized-complexity priors on $\rho,\sigma,\tau$. Quantity of interest: average prevalence $\tfrac{1}{|A|}\int_A \mathrm{logit}^{-1}(\beta_0+S(x))\,dx$. Fit with R-INLA (approximate posterior sampler), $N=1000$.
> **Result:** The raw SBC histogram (Fig. 13a) shows no obvious deviation — but the gray band is wide, so the histogram is too noisy to be conclusive. The **ECDF** and especially the **ECDF-difference** plots (Fig. 13b,c) reveal that **low ranks occur slightly more often** than uniform ⇒ a small genuine bias.
> **Interpretation:** INLA is a fine approximation where prevalence is moderate (Kenya, ~5.4%) but inaccurate where binomial counts carry little information (near-zero prevalence, e.g. Australia ~0.1%). The subtlety required the ECDF-difference view from [[Interpreting SBC Histograms]] (Sec. 5.2) rather than the histogram alone.
> ^ex-inla

## Examples

(The four experiments above are the worked examples; the regression data-generating process / inference model are Stan Listings 1-2, the 8-schools centered/non-centered models Listings 3-4 in Appendix A.)

## Connections

- **Uses:** [[The SBC Algorithm]] — Algorithm 1 for independent/biased samplers (ADVI, INLA, centered 8-schools to expose bias) and Algorithm 2 for thinned MCMC (non-centered 8-schools).
- **Reads via:** [[Interpreting SBC Histograms]] — ∪ (misspecified prior), sloped (HMC/ADVI bias), boundary spikes (autocorrelation), ECDF-difference (subtle INLA bias).
- **Validates the algorithms discussed in:** [[Simulation-Based Calibration - Overview]] (HMC, ADVI, INLA) and the parameterization issues in [[Computational Troubleshooting]] (centered vs non-centered, funnel geometry).

## See Also

- [[The SBC Algorithm]]
- [[Interpreting SBC Histograms]]
- [[Simulation-Based Calibration - Overview]]
- [[Rank Statistics and Uniformity]]
- [[Efficient MCMC]]
- [[HMC and Stan in Practice]] — the centered/non-centered parameterization in case study 6.2 is a key HMC design choice
- [[Computational Troubleshooting]] — covers the funnel geometry and non-centered reparameterization as a remedy
