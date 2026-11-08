---
title: "Roever 2020 - Normal-Normal Hierarchical Model and Likelihood"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 2.1 (pp. 6-7), Sec. 2.3 (p. 13), Eq. (1)-(3), (13)-(14)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]"
used_by:
  - "[[Roever 2020 - Priors for the Effect and Heterogeneity]]"
  - "[[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]"
aliases:
  - NNHM
  - normal-normal hierarchical model
  - random-effects model in bayesmeta
---

# Roever 2020 - Normal-Normal Hierarchical Model and Likelihood

> [!summary]
> The NNHM has two unknowns: the effect $\mu$ and the heterogeneity $\tau\ge0$. Study estimates $y_i$ are normal around study-specific $\theta_i$ with known standard errors $\sigma_i$, and the $\theta_i$ are exchangeable normal around $\mu$ with variance $\tau^2$. Integrating out $\theta_i$ gives $y_i\sim N(\mu,\sigma_i^2+\tau^2)$ and the likelihood in Eq. (13); $\tau=0$ is the fixed-effect model.

## Overview

The model is the same as the random-effects model of [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]], with notation $\sigma_i$ (standard error) instead of $\sqrt{v_i}$.

## Main Content

> [!definition] Normal-normal hierarchical model (Eq. 1-2)
> Data: $k$ estimates $y_i$ of $\mu$ with known standard errors $\sigma_i$, $i=1,\dots,k$.
> $$y_i\mid\theta_i,\sigma_i\sim N(\theta_i,\sigma_i^2),\qquad \theta_i\mid\mu,\tau\sim N(\mu,\tau^2),\ \tau\ge0 .$$
> The $\theta_i$ (true study-specific effects) are exchangeable. Sampling error magnitude is $\sigma_i$.
^def-nnhm

> [!definition] Marginal form (Eq. 3)
> Integrating out $\theta_i$: $y_i\mid\mu,\tau,\sigma_i\sim N(\mu,\sigma_i^2+\tau^2)$. The unknowns are $\mu$ (primary interest) and $\tau$ (usually a nuisance parameter), though shrinkage estimates of $\theta_i$ can also be of interest. If $\tau=0$, $\theta_1=\dots=\theta_k=\mu$ (fixed-effect model).
^def-nnhm-marginal

> [!definition] Likelihood (Eq. 13-14)
> $$p(\vec y\mid\mu,\tau,\vec\sigma)=(2\pi)^{-k/2}\prod_{i=1}^k\frac{1}{\sqrt{\sigma_i^2+\tau^2}}\exp\!\left(-\frac12\frac{(y_i-\mu)^2}{\sigma_i^2+\tau^2}\right),$$
> $$\log p(\vec y\mid\mu,\tau,\vec\sigma)=-\tfrac k2\log(2\pi)-\tfrac12\sum_{i=1}^k\left[\log(\sigma_i^2+\tau^2)+\frac{(y_i-\mu)^2}{\sigma_i^2+\tau^2}\right].$$
^def-nnhm-likelihood

Scope: the model is applied to other data types after transformation to a real-valued scale, e.g. log odds ratios from binary data (Hedges and Olkin 1985; Hartung et al. 2008; Borenstein et al. 2009; Viechtbauer 2010; Higgins and Green 2011), see [[Viechtbauer 2010 - Effect Size Measures and escalc]].

## Examples

> [!example] Marginal variance with and without heterogeneity
> Take $\sigma_1=0.6$ and $\tau=0.5$: marginal SD of $y_1$ is $\sqrt{0.36+0.25}=0.781$ versus $0.6$ under the fixed-effect model. The extra 30% spread is what a random-effects analysis propagates into the pooled SE.

```python
import numpy as np
def nnhm_loglik(mu, tau, y, sigma):
    v = sigma**2 + tau**2
    return -0.5*len(y)*np.log(2*np.pi) - 0.5*np.sum(np.log(v) + (y-mu)**2/v)
```

## Connections

- [[Hierarchical Models]]: the NNHM is the simplest hierarchical model with known first-level variances ("eight schools" structure, Gelman et al. 2014 Sec. 5.5).
- Marketing measurement: replace $y_i,\sigma_i$ with each experiment's lift estimate and standard error; $\tau$ is cross-experiment variability of true lift.

## See Also

- [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
