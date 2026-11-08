---
title: "Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (cites the literature listed under Sources)"
source_location: "Literature synthesis (see Sources)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions"
doc_type: paper
depends_on:
  - "[[Krause 2008 - GP Model and Posterior Variance]]"
  - "[[Value of Information Concept Note - EVPI, EVPPI and EVSI]]"
used_by:
  - "[[Research/Applied Bayesian Model Families/Decisions and Value of Information/Concept Notes - Value of Information and Adaptive Decisions/_Index|Index for this source]]"
aliases:
  - Monitor siting with EVSI
  - Kriging with known measurement error
---

# Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting

> [!summary]
> Concept note, no raw source. With a GP prior and a monitor of known error variance, the posterior variance after a reading is available in closed form and does not depend on the value read, so the EVSI of a candidate site is a closed-form function of how much it shrinks the variance of the decision-relevant quantity. Greedy selection is justified when gains show diminishing returns; whether joint value is submodular must be checked, not assumed.

## Overview

E89 (**Where should the next air monitors go?**) uses EPA AirData daily PM2.5 (419 sites in 19 states) and county populations with a "marginal Matern GP with known measurement error, exact county conditionals, closed-form EVSI checked by brute force, lazy greedy site selection, simulated joint value against summed gains, a search that lets county means move, a paired-instrument refit". Krause et al.'s paper supplies the design theory ([[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]); this note links it to EVSI.

## Main Content

> [!definition] Kriging with known measurement error
> Latent field $f\sim GP(0,K)$ observed as $y_i=f(x_i)+\epsilon_i$, $\epsilon_i\sim N(0,\sigma_i^2)$ with *known* $\sigma_i^2$ (a monitor's error variance). The posterior of $f(x^*)$ given sites $A$ is $N(\mu_{*|A},\sigma^2_{*|A})$ with $\sigma^2_{*|A}=K(x^*,x^*)-k_{*A}(K_{AA}+\Sigma_A)^{-1}k_{A*}$, $\Sigma_A=\mathrm{diag}(\sigma_i^2)$ ([[Krause 2008 - GP Model and Posterior Variance]], with noise).
^def-kriging-known-error

> [!theorem] EVSI of one new reading for a threshold decision
> Let a decision depend on whether a county mean $\mu_c$ exceeds a threshold $\tau_0$ (for example, issue an advisory), with net benefit $\propto(\mu_c-\tau_0)$ for acting. Before a reading, $\mu_c\sim N(m,s_0^2)$ (the GP marginal). A reading with known error $\sigma^2$ at a site correlated with $\mu_c$ yields a posterior with variance $s_1^2<s_0^2$ and a preposterior posterior mean $\sim N(m,s_0^2-s_1^2)$. By the closed form of [[Value of Information Concept Note - EVPI, EVPPI and EVSI]],
> $$
> \text{EVSI}_c=w_c\big[\tau\varphi((m-\tau_0)/\tau)+(m-\tau_0)\Phi((m-\tau_0)/\tau)-\max(m-\tau_0,0)\big],\quad\tau^2=s_0^2-s_1^2,
> $$
> with $w_c$ the stakes (for example population). EVSI is largest where the prior mean sits near the threshold and the site shrinks variance most.
^thm-evsi-site

*Greedy siting.* Maintain gains $\delta_y=\text{EVSI}(A\cup y)-\text{EVSI}(A)$ and use lazy evaluation ([[Krause 2008 - Lazy Evaluation and Local Kernels]]); lazy greedy is exact for any function with diminishing returns. MI is submodular (Krause Lemma 3), but EVSI and expected variance reduction are not guaranteed to be: Krause's counterexample for information gain ([[Krause 2008 - Related Work and Why Other Criteria Lack Guarantees]]) shows complementary sites (a second site worth more after the first) are possible. E89's "simulated joint value against summed gains" is the right empirical check for whether summing gains over-counts.

## Examples

Verified numbers (reusing the normal closed form): a county with prior mean at the threshold ($m-\tau_0=0$) and $s_0=1$; a reading shrinking variance to $s_1^2=0.5$ gives $\tau^2=0.5$, $\text{EVSI}=\tau\varphi(0)=0.707\times0.3989=0.282$ (per unit stakes). A reading that only shrinks to $s_1^2=0.9$ gives $\tau=0.316$ and EVSI $0.126$: halving the value of a weak monitor.

```python
import numpy as np
from scipy import stats
def evsi_site(m, tau0, s0sq, s1sq, w=1.0):
    d, tau = m - tau0, np.sqrt(s0sq - s1sq)
    return w*(tau*stats.norm.pdf(d/tau) + d*stats.norm.cdf(d/tau) - max(d, 0))
print(evsi_site(0, 0, 1, 0.5), evsi_site(0, 0, 1, 0.9))   # 0.2821 0.1262
```

PyMC-style sketch (untested): `pm.gp.Marginal` with `sigma=` set to the known per-site error SD; obtain $s_1^2$ for candidate sites from `gp.predict(Xnew, point=..., diag=True)` after conditioning on hypothetical sites.

## Connections
- Marketing: choosing which geos to instrument (holdout or measurement) when the decision turns on whether a geo's lift clears a hurdle; stakes $w_c$ are spend or population.
- Related designs: [[Expected Information Gain]], [[Bayesian Optimisation]], [[Acquisition Functions]].

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
- [[Value of Information Concept Note - When an Exact Gaussian Process Earns Its Price]]

## Sources
- Krause, Singh and Guestrin (2008); Raiffa and Schlaifer (1961); Cressie (1991) on kriging; E89 method list at <https://redam94.github.io/pymc-challenges/examples.html>. Closed forms derived here.
