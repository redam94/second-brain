---
title: "Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature cited in body)"
source_location: "Concept note; literature: Matheron 1963; Cressie 1993; Stein 1999; Rasmussen & Williams 2006; Lindgren et al. 2011; Whittle 1954"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Spatial Fields Concept Notes"
doc_type: paper
depends_on:
  - "[[Simpson 2016 - Matern SPDE and GMRF Representation]]"
used_by:
  - "[[Simpson 2016 - Going Off Grid - Overview]]"
aliases:
  - "Gaussian random fields"
  - "kriging"
  - "geostatistics"
  - "field-level inference"
---

# Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference

> [!summary]
> Concept note (no raw source). A Gaussian random field (GRF) is a collection $Z(s)$ with Gaussian finite-dimensional laws, fixed by a mean and covariance function. Kriging is the GRF conditional mean/variance; Matern covariance controls smoothness; for stationary periodic fields the covariance is diagonal in Fourier/Hartley modes, which is what field-level inference exploits. Used in PyMC examples E79 (CMB sky patch) and E89 (air-monitor placement).

## Overview
Covers the geostatistics background shared by [[Simpson 2016 - Going Off Grid - Overview]], [[Hilbert Space Gaussian Processes]] and [[Gaussian Process Regression]].

### Motivating PyMC examples
<https://redam94.github.io/pymc-challenges/examples.html>: **E79** CMB field-level inference (GRF on a flat-sky patch, joint sky + bandpower posterior, Hartley basis, naive masked-power bias); **E89** marginal Matern GP with known measurement error, exact county conditionals, closed-form EVSI; also E07/E86 (LGCP latent fields).

## Main Content

> [!definition] Gaussian random field and covariance functions
> $Z(s)\sim\text{GRF}(m,c)$ if $(Z(s_1),\dots,Z(s_n))\sim N(m,K)$ with $K_{ij}=c(s_i,s_j)$ positive semi-definite. Stationary isotropic: $c(s,s')=c(\|s-s'\|)$. Matern: $c(h)=\sigma^2\frac{2^{1-\nu}}{\Gamma(\nu)}(\kappa h)^\nu K_\nu(\kappa h)$; $\nu=1/2$ exponential, $\nu\to\infty$ squared exponential; sample paths are $\lceil\nu\rceil-1$ times differentiable (Stein 1999).

^def-grf

> [!theorem] Kriging (simple kriging = GRF conditioning)
> With data $y=Z(X)+\varepsilon$, $\varepsilon\sim N(0,\sigma^2I)$ (known measurement error), prediction at $s_*$:
> $$\mathbb E[Z(s_*)\mid y]=m(s_*)+k_*^\top(K+\sigma^2I)^{-1}(y-m),\quad \mathrm{Var}=c(s_*,s_*)-k_*^\top(K+\sigma^2I)^{-1}k_*.$$
> Ordinary/universal kriging adds an unknown constant or trend with a flat prior, equivalent to a GP with a vague mean prior.

^thm-kriging

> [!definition] Spectral view and the Hartley/Fourier basis
> A stationary GRF on a periodic rectangle with power spectrum $P(k)$ has Fourier coefficients $a_k$ that are independent with $\mathrm{Var}(a_k)\propto P(k)$ (complex pairs conjugate-symmetric). The real Hartley transform (cas basis) gives real independent coefficients, so the prior on $a$ is diagonal: $a_k\sim N(0,P(k))$. Field-level inference samples the map $Z=\Phi a$ jointly with the bandpowers (parameters of $P$), instead of summarising by an estimated power spectrum.

^def-spectral-grf

Why field-level: a masked sky's naive pseudo-power spectrum is biased (mask couples modes); the joint posterior for $(a,\theta_P)$ with the likelihood $y=M\Phi a+\text{noise}$ is unbiased by construction but high-dimensional, with funnel geometry between $a$ and the bandpower (hence centred / non-centred / partial non-centring choices at low and high signal-to-noise: $a=\sqrt{P}\,\tilde a$ vs $a$ directly; partially $a=P^{\gamma/2}\tilde a$-style schemes, per Papaspiliopoulos et al. 2007 on parameterisations, not specific to E79).

## Examples

> [!example] Closed-form EVSI for a threshold decision (E89-style)
> Setup: decision-relevant quantity $\theta\sim N(m,s^2)$ (e.g. a county PM2.5 mean from the Matern GP posterior), act if $\theta>c$. One extra measurement with noise variance $n^2$. Preposterior variance of the posterior mean $v=s^4/(s^2+n^2)$. Expected value of sample information = $\sqrt v\,L(|m-c|/\sqrt v)$ with unit-normal loss $L(z)=\varphi(z)-z[1-\Phi(z)]$. Brute force Monte Carlo below gives 0.1974 vs 0.1975.

```python
import numpy as np
from scipy.stats import norm
m,s2,c,n2 = 0.3,1.0,0.0,0.5
sd = np.sqrt(s2**2/(s2+n2)); L = lambda z: norm.pdf(z)-z*norm.sf(z)
print("closed form:", sd*L(abs(m-c)/sd))
rng=np.random.default_rng(0); th=rng.normal(m,np.sqrt(s2),2_000_000); y=th+rng.normal(0,np.sqrt(n2),th.size)
post=(m/s2+y/n2)/(1/s2+1/n2); print("MC:", np.mean(np.maximum(post-c,0))-max(m-c,0))
```
With spatially correlated sites the value of measuring several sites is not the sum of single-site gains; E89 checks this by simulating joint value against summed gains. This note only gives the single-decision closed form.

PyMC sketch (untested), Matern GP with known noise:
```python
with pm.Model():
    ell = pm.Gamma("ell", 3, 1/50); eta = pm.Exponential("eta", 1)
    gp = pm.gp.Marginal(cov_func=eta**2*pm.gp.cov.Matern32(2, ls=ell))
    gp.marginal_likelihood("y", X=X, y=y, sigma=sigma_known)   # known per-site error
    f_new = gp.conditional("f_new", Xnew=X_new)               # kriging
```

## Connections
- [[Simpson 2016 - Matern SPDE and GMRF Representation]]: sparse GMRF alternative to dense kriging.
- Marketing measurement: geo-experiments with spatially correlated outcomes; kriging/Matern GPs can model residual spatial correlation between DMAs, and EVSI-style reasoning guides which markets to measure next (analogy; see [[Hilbert Space Gaussian Processes]]).

## See Also
[[Simpson 2016 - Going Off Grid LGCP Inference/_Index|Simpson 2016 - Going Off Grid LGCP Inference]] | [[Spatial Models - BYM]]
