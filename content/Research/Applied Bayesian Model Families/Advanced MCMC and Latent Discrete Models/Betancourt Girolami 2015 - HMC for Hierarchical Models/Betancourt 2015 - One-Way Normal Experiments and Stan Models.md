---
title: "Betancourt 2015 - One-Way Normal Experiments and Stan Models"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/example
  - doc/paper
source: "[[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]"
source_location: "Sec. IV-V, Appendix A, References, pp. 8-11; Table I; Figure 12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Betancourt Girolami 2015 - HMC for Hierarchical Models"
doc_type: paper
depends_on:
  - "[[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]"
  - "[[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]"
  - "[[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]]"
used_by:
aliases:
  - "One-way normal benchmark"
  - "Stan funnel model"
---

# Betancourt 2015 - One-Way Normal Experiments and Stan Models

> [!summary]
> The benchmark is a one-way normal model with 800 latent $\theta_i$ and constant noise $\sigma=10$ (true $\mu=8$, $\tau=3$). Euclidean HMC (Stan) is at least an order of magnitude more efficient than random-walk Metropolis and Metropolis-within-Gibbs for both centred and non-centred parameterisations; the non-centred EHMC achieves $2.94\times10^{-2}$ s per effective sample, versus 1.44 s and 1.95 s. The appendix gives all Stan models.

## Overview

Data generation: $\mu=8$, $\tau=3$; $\theta_i\sim\mathcal N(\mu,\tau^2)$ and $y_i\sim\mathcal N(\theta_i,\sigma^2)$ with $\sigma=10$ (`alpha <- 10` in Stan), $N=800$. Weakly informative priors $\mu\sim\mathcal N(0,5^2)$ and $\tau\sim\text{Half-Cauchy}(0,2.5)$ (sampling on $\lambda=\log\tau$). Both the centred form $y_i\sim\mathcal N(\theta_i,\sigma_i^2)$, $\theta_i\sim\mathcal N(\mu,\tau^2)$ and the non-centred $y_i\sim\mathcal N(\tau\vartheta_i+\mu,\sigma_i^2)$, $\vartheta_i\sim\mathcal N(0,1)$ are fitted "in order to not overestimate the success of HMC". Algorithms: random-walk Metropolis, Metropolis-within-Gibbs (priors non-conjugate), and EHMC with diagonal metric (Stan NUTS; RHMC not run). HMC's more accurate marginal variance estimates were used to scale the competitors' transitions (a "friendly gesture"). Step size for each algorithm was made as large as possible while still giving estimates consistent with a baseline from EHMC at high target acceptance (Fig. 12 plots $\hat R_\tau$ for each algorithm to show the estimates are mutually consistent).

## Main Content

### Table I

| Algorithm | Parameterisation | Step size | Avg. acceptance | Time (s) | Time/ESS (s) |
|---|---|---|---|---|---|
| Metropolis | Centred | $5.00\times10^{-3}$ | 0.822 | $4.51\times10^4$ | 1220 |
| Gibbs | Centred | 1.50 | 0.446 | $9.54\times10^4$ | 297 |
| EHMC | Centred | $1.91\times10^{-2}$ | 0.987 | $1.00\times10^4$ | **16.2** |
| Metropolis | Non-centred | 0.0500 | 0.461 | 398 | 1.44 |
| Gibbs | Non-centred | 2.00 | 0.496 | 817 | 1.95 |
| EHMC | Non-centred | 0.164 | 0.763 | 154 | **$2.94\times10^{-2}$** |

> [!theorem] Reading Table I (computed)
> - Centred: EHMC Time/ESS is 75x better than Metropolis (1220/16.2) and 18x better than Gibbs (297/16.2).
> - Non-centred: 49x better than Metropolis (1.44/0.0294) and 66x better than Gibbs (1.95/0.0294).
> - Reparameterising the EHMC alone gives a 551x gain (16.2/0.0294). The centred EHMC required acceptance 0.987, far from the canonical 0.651, showing the adaptation hazard of [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]].
> - "The advantage of HMC scales with increasing dimensionality ... in the most complex models HMC is often the only practical solution."
^thm-table1-bg

```python
cp  = {"Metropolis":1220., "Gibbs":297., "EHMC":16.2}
ncp = {"Metropolis":1.44, "Gibbs":1.95, "EHMC":2.94e-2}
for name,d in (("CP",cp),("NCP",ncp)):
    print(name, {k: round(v/d["EHMC"],1) for k,v in d.items()})
print("EHMC CP/NCP:", round(cp["EHMC"]/ncp["EHMC"]))   # 551
```

### Appendix A: Stan models (as given)

- **Funnel**: `transformed data { int J = 25 }`; `parameters { real theta[J]; real v; }`; `model { v ~ normal(0,3); theta ~ normal(0, exp(v/2)); }`.
- **Pseudo-data generator**: `mu=8, tau=3, alpha=10, N=800`; generated quantities draw $\theta_i\sim\mathcal N(\mu,\tau)$, $\sigma_i=\alpha$, $y_i\sim\mathcal N(\theta_i,\sigma_i)$.
- **One-way normal (centred)**: `mu ~ normal(0,5); tau ~ cauchy(0,2.5); theta ~ normal(mu, tau); y ~ normal(theta, sigma);` run with NUTS, `adapt delta=0.999`, `max_depth=20`, 100,000 warmup and 1,000,000 samples thinned by 1000 (baseline settings in the paper's configuration block).
- **One-way normal (non-centred)**: `var_theta ~ normal(0,1); theta = tau*var_theta + mu;` baseline `adapt delta=0.99` (5000 warmup, 100,000 samples); nominal `adapt delta=0.8` (5000 warmup, 50,000 samples).

### Conclusion
EHMC with careful parameterisation, or RHMC with SoftAbs, delivers inference whose performance scales with hierarchy size and complexity of local distributions, including those not amenable to analytic manipulation. The drawback is implementation difficulty (integration, derivatives), removed by Stan with automatic differentiation.

### References (selected)
Gelman et al. BDA3 (2013); Neal (2003) slice sampling (funnel); Rue, Martino and Chopin (2009) INLA; Liu, Rubin and Wu (1998) and Liu and Wu (1999) parameter expansion; Gelman et al. (2008); Papaspiliopoulos, Roberts and Sköld (2007) non-centred parameterisation; Duane et al. (1987); Neal (2011); Betancourt and Stein (2011) geometry of HMC; Betancourt (2013) 1304.1920; Hoffman and Gelman (2011) NUTS; Hairer et al. (2006); Girolami and Calderhead (2011) RHMC; Betancourt (2013) SoftAbs; Stan (ref [20]).

## Examples (PyMC-style)

PyMC 5 non-centred version of the benchmark (*untested sketch*):
```python
import numpy as np, pymc as pm
rng = np.random.default_rng(1); N = 800
theta0 = rng.normal(8, 3, N); y = rng.normal(theta0, 10)
with pm.Model():
    mu = pm.Normal("mu", 0, 5); tau = pm.HalfCauchy("tau", 2.5)
    z = pm.Normal("z", 0, 1, shape=N)
    pm.Normal("y", mu + tau*z, 10, observed=y)
    idata = pm.sample(target_accept=0.8)
```

## Connections

Compare the sampler-efficiency framing with [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]. The one-way normal is the minimal [[Hierarchical Models]] example.

## See Also
[[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Hierarchical Linear Models]], [[HMC and Stan in Practice]]
