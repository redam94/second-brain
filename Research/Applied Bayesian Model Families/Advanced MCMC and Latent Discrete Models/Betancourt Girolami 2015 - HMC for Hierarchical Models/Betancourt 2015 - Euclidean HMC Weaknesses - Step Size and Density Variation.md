---
title: "Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]"
source_location: "Sec. III-III.A, pp. 4-7; Figures 5-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Betancourt Girolami 2015 - HMC for Hierarchical Models"
doc_type: paper
depends_on:
  - "[[Betancourt 2015 - Hierarchical Geometry and the Funnel]]"
  - "[[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]"
used_by:
  - "[[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]]"
  - "[[Betancourt 2015 - One-Way Normal Experiments and Stan Models]]"
aliases:
  - "Euclidean HMC limits on hierarchical models"
  - "Density variation limit d/2"
  - "Characteristic length scale of HMC"
---

# Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation

> [!summary]
> Euclidean HMC (Gaussian momentum, constant metric) removes random-walk behaviour but has two weaknesses that hierarchical models accentuate: (1) the integrator's step size introduces a characteristic length scale that must satisfy $\epsilon\sqrt{\lambda_i}<2$ for the curvature, and adaptation toward 0.651 acceptance can bias inference; (2) because $H$ is conserved, potential-energy variation within one trajectory is limited to the kinetic-energy variation, only about $d/2$.

## Overview

HMC introduces momentum $p$ with joint $\pi(p,q)=\pi(p\mid q)\pi(q)$, Hamiltonian $H(p,q)=T(p\mid q)+V(q)$ with $T=-\log\pi(p\mid q)$ and potential $V=-\log\pi(q)$, and evolves by Hamilton's equations $\dot q=\partial T/\partial p$, $\dot p=-\partial T/\partial q-\partial V/\partial q$. Optimal integration time depends on position; dynamic choices break detailed balance unless done as in NUTS (integrating forward and backward).

## Main Content

> [!definition] Euclidean HMC
> $\pi(p\mid q)=\mathcal N(p\mid0,\Sigma)$, kinetic energy $T(p,q)=\tfrac12p^\top\Sigma^{-1}p$. The metric $\Sigma$ effects a global rotation and rescaling of the target (often identity in practice).
^def-euclidean-hmc

### 1. Characteristic length scale

> [!theorem] Step-size stability
> Symplectic integrators introduce a length scale (step size $\epsilon$). A stable solution requires, for each eigenvalue $\lambda_i$ of $M_{ij}=(\Sigma^{-1})_{ik}\,\partial^2V/\partial q_k\partial q_j$,
> $$\epsilon\sqrt{\lambda_i}<2.$$
> So $\epsilon$ must match the curvature or the numerical trajectory diverges before exploring the distribution. Computational efficiency scales with the condition number of $M$ averaged over the target (footnote 3), which is why a global decorrelation that helps RWM/Gibbs also helps EHMC.
^thm-step-stability-bg

**Adaptation hazard.** Tuning $\epsilon$ for an optimal acceptance probability requires a precise estimate of the global acceptance probability. When the chain is highly autocorrelated or misses high-curvature regions (divergent integrator), estimates are unreliable, so adaptation can be too aggressive for the neighbourhood where the chain started, biasing inference. This is common in hierarchical models because of spatially varying curvature.

> [!theorem] Practical rule (Figure 5)
> Relax the adaptation criterion until inferences are stable: compare latent-parameter inferences as the target acceptance is gradually raised and select the step size only once inferences have stabilised and divergent transitions are rare. At minimum run an auxiliary chain with a smaller step size to check consistency.
> Figure 5 ((50+1)-dimensional funnel): as step size decreases (a) the average acceptance rises above the canonical 0.651 while (b) the output converges to a consistent distribution (modified potential scale reduction $\hat R_v$ falling toward 1); (c) at the canonical acceptance rate the integrator already begins to diverge (the percentage of divergent transitions is plotted against step size).
^thm-adaptation-rule

### 2. Limited density variations

> [!theorem] Density variation limit
> $H=T+V$ is conserved along a trajectory, so any variation in potential energy is compensated by opposite variation in kinetic energy. In Euclidean HMC $T$ is a $\chi^2$-type variate whose expected variation is only half the dimension $d$, so
> $$\Delta V=\Delta T\sim\frac d2.$$
> Hierarchical models have huge density variation across the funnel, so for all but the smallest hierarchy the trajectories cannot span the marginal variation, random-walk behaviour returns and efficiency plummets (Fig. 6, Fig. 7: with a unit metric, $v$ has chain mean $-0.02$ and standard deviation $3.94$ versus the true 3, mixing better than Gibbs/RWM but still poorly).
^thm-density-variation-limit

**Non-centring helps again.** It removes explicit hierarchical correlations, thus reduces density variation and greatly improves EHMC (Fig. 8). Efficacy depends on data strength: CP wins when data are strong (then partial pooling matters little), NCP wins as the common variance $\sigma^2$ grows and data become effectively sparse, and the disparity grows with dimension. Fig. 8 uses a 10-dimensional one-way normal, bands showing quartiles over 50 runs of Stan's NUTS with a diagonal metric (metric and step size adapted in warmup); the optimal average acceptance probability was relaxed until estimates of $\tau$ stabilised ($\hat R$) and divergent transitions did not appear (Fig. 9).

> [!example] Scale of the limit
> For the funnel with scale $e^{v/2}$ (Stan form) and $n=100$ local coordinates, $V(\theta,v)=\tfrac n2v+\tfrac12e^{-v}\sum_i\theta_i^2+\tfrac{v^2}{18}$ (up to a constant). The term $\tfrac n2v$ alone changes by 50 nats per unit of $v$, and $v$ spans several units ($\sigma_v=3$), so potential-energy variation across the funnel is of order hundreds of nats, whereas $\Delta T\sim d/2\approx50$. A single trajectory cannot afford that energy. (This is an illustrative calculation, not a figure from the paper.)
^ex-scale-of-limit

```python
# Divergence check (PyMC/ArviZ, untested): treat divergences as a geometry warning, not a tuning nuisance
import arviz as az
idata = pm.sample(target_accept=0.95)              # relax adaptation, as the paper advises
print(az.summary(idata, var_names=["tau"]), idata.sample_stats["diverging"].sum().item())
```

## Connections

[[Betancourt 2015 - Riemannian HMC and the SoftAbs Metric]] removes limitation 2 via the log-determinant term; the same limited-energy argument explains why ChEES/MEADS ([[Hoffman 2021 - ChEES Criterion and Algorithm 1]]) do not fix funnels. Practical Stan guidance: [[HMC and Stan in Practice]]; typical-set geometry: [[The Typical Set and the Log Posterior Density]].

## See Also
[[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Efficient MCMC]]
