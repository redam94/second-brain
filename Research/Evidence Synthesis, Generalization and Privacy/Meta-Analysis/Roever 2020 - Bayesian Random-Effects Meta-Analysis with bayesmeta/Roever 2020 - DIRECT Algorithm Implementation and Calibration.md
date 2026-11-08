---
title: "Roever 2020 - DIRECT Algorithm Implementation and Calibration"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 2.11 (p. 18), App. A.4 (p. 40, Eq. 45), App. A.5 (pp. 41-42, Fig. 8)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
used_by:
  - "[[Roever 2020 - Pediatric Liver Transplant Worked Example]]"
aliases:
  - DIRECT algorithm
  - discrete normal mixture approximation
  - simulation-based calibration of bayesmeta
  - probability integral transform check
---

# Roever 2020 - DIRECT Algorithm Implementation and Calibration

> [!summary]
> `bayesmeta()` evaluates the 2-D posterior without MCMC: the marginal of $\tau$ is computed by one-dimensional numerical integration, and the marginal of $\mu$ (and of each $\theta_i$ and the prediction) is a finite mixture of normals whose support points $\tau_j$ and weights $w_j$ are chosen by the DIRECT algorithm (Röver and Friede 2017) to bound the Kullback-Leibler divergence by $\delta$ (default 1%). Correctness is verified by simulation-based calibration using probability integral transform (PIT) values.

## Overview

The algorithm is only summarised in this paper (details: Röver and Friede 2017, *Discrete approximation of a mixture distribution via restricted divergence*). This note records what is specified here.

## Main Content

### Internals (Sec. 2.11)

- The posterior is 2-D; $p(\tau\mid y)$ known up to a constant, $p(\mu\mid\tau,y)$ normal (Eq. 24).
- Joint density = likelihood $\times$ priors (analytic); $\tau$-marginal normalised with R's `integrate()`; CDF by numerical integration; quantiles by root-finding `uniroot()` on the CDF.
- $\mu$-marginal $\approx\sum_jN(\hat\mu(\tau_j),\hat\sigma(\tau_j)^2)\,w_j$ (Eq. 26). The tuning parameters of the DIRECT algorithm are `delta` ($\delta$, bound on divergence) and `epsilon` ($\epsilon$). In the example, 17 components suffice to keep the Kullback-Leibler divergence below $\delta=1\%$; they are stored in `...$support`.
- Mixture density and CDF are linear combinations of component densities/CDFs; random generation and moments are simple (Seidel 2010; Lindsay 1995). Heavy reliance on `integrate()`, `uniroot()`, `optimize()`, `optim()`.

> [!definition] Symmetrised divergence between two normals (App. A.4, Eq. 45)
> For $N(\mu_A,\sigma_A^2)$ and $N(\mu_B,\sigma_B^2)$:
> $$D_s(p_A\,\|\,p_B)=\frac{(\mu_A-\mu_B)^2}{2}\left(\frac1{\sigma_A^2}+\frac1{\sigma_B^2}\right)+\frac{(\sigma_A^2-\sigma_B^2)^2}{2\sigma_A^2\sigma_B^2}.$$
> The DIRECT algorithm uses this to decide how close neighbouring $\tau_j$ must be. For the shrinkage distributions the maximum divergence across the effect posterior and all $k$ shrinkage distributions is used so a single $\tau$-grid serves all three mixture types.
^def-symmetrised-divergence

(The paper's Eq. 45 is typeset with nested fractions that did not extract cleanly; the closed form above is the standard symmetrised Kullback-Leibler divergence $KL(A\|B)+KL(B\|A)$ for two normals, which is the quantity the text names.)

### Calibration check (App. A.5)

> [!theorem] PIT uniformity under correct Bayesian computation (Cook, Gelman and Rubin 2006; Gneiting et al. 2007)
> If $\theta^*\sim p(\theta)$, $y^*\sim p(y\mid\theta^*)$ and $p^*=P(\theta\le\theta^*\mid y^*)$ is the posterior CDF at the true value, then $p^*\sim U(0,1)$ exactly for any sample size and any proper prior. Hence uniformity of PIT values over many simulations validates software. Bayesian credible intervals are calibrated *on average over the prior* (versus frequentist coverage at each parameter value).
^thm-pit-uniform

Simulation protocol (1000 replicates): $\mu\sim N(0,4^2)$, $\tau\sim\text{half-normal}(0.5)$, $k\in\{2,3,5,10,20\}$ drawn at random, $\sigma_i\sim U(0.2,1.0)$, $y_i\sim N(\mu,\sigma_i^2+\tau^2)$; analyse with matching priors; record `pposterior(mu=mu)` and `pposterior(tau=tau)`. Fig. 8: empirical CDFs of PIT values for $\mu$ and $\tau$ are in close agreement with the uniform. One-sided 95% credible limits show about 95% empirical coverage. For $\tau$, a curve above the diagonal reads as conservative (tendency to overestimate heterogeneity); for $\mu$, a conservative procedure sits below the diagonal at the low end and above at the high end (wider intervals).

## Examples

```python
import numpy as np
from scipy import stats
def calibration_check(posterior_cdf_mu, nsim=1000, seed=1):
    """PIT of mu under the prior-generating process of Röver's App. A.5.
    posterior_cdf_mu(y, sigma) -> callable F(mu) must be supplied by the analysis under test."""
    rng = np.random.default_rng(seed); pit = []
    for _ in range(nsim):
        mu = rng.normal(0, 4); tau = abs(rng.normal(0, 0.5)); k = rng.choice([2,3,5,10,20])
        sigma = rng.uniform(0.2, 1.0, k); y = rng.normal(mu, np.sqrt(sigma**2+tau**2))
        pit.append(posterior_cdf_mu(y, sigma)(mu))
    return np.array(pit)          # should be ~ U(0,1): check with stats.kstest(pit, "uniform")
```

## Connections

- Marketing: any in-house Bayesian aggregation tool (a pooled-incrementality model, an MMM prior builder) should be validated this way (prior-predictive data in, PIT uniformity out); see [[Posterior Sampling and Summarization]] and the validation cluster in [[Model Validation and Interpretability - Overview]].

## See Also

- [[Roever 2020 - Pediatric Liver Transplant Worked Example]]
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
