---
title: "Roever 2020 - Marginal Likelihood and Conditional Posteriors"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package.pdf]]"
source_location: "Sec. 2.4-2.6 (pp. 13-16, Eq. 15-26), App. A.3 (pp. 39-40, Eq. 32-44)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
doc_type: paper
depends_on:
  - "[[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]]"
  - "[[Roever 2020 - Priors for the Effect and Heterogeneity]]"
used_by:
  - "[[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]"
  - "[[Roever 2020 - DIRECT Algorithm Implementation and Calibration]]"
  - "[[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]]"
aliases:
  - marginal posterior of heterogeneity
  - conditional posterior of the effect given tau
  - normal mixture posterior of mu
---

# Roever 2020 - Marginal Likelihood and Conditional Posteriors

> [!summary]
> With a uniform or normal prior on $\mu$, integrating $\mu$ out of the NNHM likelihood is Gaussian and gives a closed-form marginal likelihood for $\tau$, and the conditional posterior $\mu\mid\tau,y$ is exactly normal with the familiar inverse-variance mean $\hat\mu(\tau)$ and SD $\hat\sigma(\tau)$. The marginal posterior of $\tau$ is then one-dimensional, so the joint posterior factors as $p(\mu,\tau\mid y)=p(\mu\mid\tau,y)\,p(\tau\mid y)$ and the effect's marginal is a continuous normal mixture. This is the core of the whole package.

## Overview

The same quantities $\hat\mu(\tau)$ and $\hat\sigma(\tau)$ are the frequentist fixed-effect ($\tau=0$) and random-effects ($\tau=\hat\tau$) estimate and standard error, which is the bridge to [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]].

## Main Content

### Marginal likelihood, uniform effect prior

> [!theorem] Marginal likelihood of $\tau$ (Eq. 15-18, derivation Eq. 32-44)
> For $p(\mu)\propto1$,
> $$
> p(\vec y\mid\tau,\vec\sigma)=\int p(\vec y\mid\mu,\tau,\vec\sigma)\,d\mu=(2\pi)^{-\frac{k-1}{2}}\prod_{i=1}^k\frac{1}{\sqrt{\sigma_i^2+\tau^2}}\exp\!\left(-\frac12\frac{(y_i-\hat\mu(\tau))^2}{\sigma_i^2+\tau^2}\right)\frac{1}{\sqrt{\sum_{i=1}^k\frac{1}{\sigma_i^2+\tau^2}}},
> $$
> where, with $w_i(\tau)=1/(\sigma_i^2+\tau^2)$,
> $$
> \hat\mu(\tau)=E[\mu\mid\tau,\vec y,\vec\sigma]=\frac{\sum_iw_i(\tau)y_i}{\sum_iw_i(\tau)},\qquad \hat\sigma(\tau)=\sqrt{\text{Var}(\mu\mid\tau,\vec y,\vec\sigma)}=\frac{1}{\sqrt{\sum_iw_i(\tau)}}\quad(\text{Eq. 17}).
> $$
> Log form (Eq. 18):
> $$
> \log p(\vec y\mid\tau,\vec\sigma)=-\tfrac12\Big[(k-1)\log(2\pi)+\sum_{i=1}^k\log(\sigma_i^2+\tau^2)+\sum_{i=1}^k\frac{(y_i-\hat\mu(\tau))^2}{\sigma_i^2+\tau^2}+\log\Big(\sum_{i=1}^k\frac1{\sigma_i^2+\tau^2}\Big)\Big].
> $$
^thm-marginal-likelihood

> [!theorem] Derivation (Appendix A.3)
> Expand the exponent as a quadratic in $\mu$: $\sum_i\frac{(y_i-\mu)^2}{\sigma_i^2+\tau^2}=a+b\mu+c\mu^2$ with $a=\sum\frac{y_i^2}{\sigma_i^2+\tau^2}$, $b=-2\sum\frac{y_i}{\sigma_i^2+\tau^2}$, $c=\sum\frac1{\sigma_i^2+\tau^2}$. Complete the square: $=\frac{(\mu-\hat\mu(\tau))^2}{\hat\sigma(\tau)^2}+\Delta(\tau)$ with $\hat\mu=-b/2c$, $\hat\sigma=\sqrt{1/c}$ and
> $$
> \Delta(\tau)=a-\frac{b^2}{4c}=\sum_i\frac{(y_i-\hat\mu(\tau))^2}{\sigma_i^2+\tau^2}.
> $$
> The remaining Gaussian integral over $\mu$ equals $\sqrt{2\pi}\,\hat\sigma(\tau)$, and $(2\pi)^{-k/2}\sqrt{2\pi}=(2\pi)^{-(k-1)/2}$, giving the stated result. $\square$
^thm-marginal-likelihood-derivation

### Conjugate normal effect prior

> [!theorem] Marginal likelihood with $\mu\sim N(\mu_p,\sigma_p^2)$ (Eq. 19-22)
> The prior parameters enter like an extra data point $(\mu_p,\sigma_p)$:
> $$
> \hat\mu(\tau)=\frac{\mu_p/\sigma_p^2+\sum_iy_i/(\sigma_i^2+\tau^2)}{1/\sigma_p^2+\sum_i1/(\sigma_i^2+\tau^2)},\qquad \hat\sigma(\tau)=\frac{1}{\sqrt{1/\sigma_p^2+\sum_i1/(\sigma_i^2+\tau^2)}}\quad(\text{Eq. 21}),
> $$
> $$
> \log p(\vec y\mid\tau,\vec\sigma)=-\tfrac12\Big[k\log(2\pi)+\log\sigma_p^2+\sum_i\log(\sigma_i^2+\tau^2)+\tfrac{(\mu_p-\hat\mu)^2}{\sigma_p^2}+\sum_i\tfrac{(y_i-\hat\mu)^2}{\sigma_i^2+\tau^2}+\log\Big(\tfrac1{\sigma_p^2}+\sum_i\tfrac1{\sigma_i^2+\tau^2}\Big)\Big]\quad(\text{Eq. 22}).
> $$
> As $\sigma_p\to\infty$ it reduces to the uniform-prior case (Eq. 17-18).
^thm-marginal-likelihood-normal-prior

> [!theorem] Conditional posterior of the effect (Sec. 2.5)
> For a uniform or normal effect prior, $\mu\mid\tau,\vec y,\vec\sigma\sim N(\hat\mu(\tau),\hat\sigma(\tau)^2)$. $\hat\mu(\tau)$ is the conditional maximum likelihood estimate and $\hat\sigma(\tau)$ its conditional standard error: $\tau=0$ gives the fixed-effect estimate, $\tau>0$ a random-effects estimate (Hedges and Olkin 1985, Sec. 6).
^thm-conditional-posterior

### Marginal and joint posterior

> [!theorem] Factorisation and normal-mixture marginal (Eq. 23-26)
> $$
> p(\tau\mid\vec y,\vec\sigma)\propto p(\vec y\mid\tau,\vec\sigma)\,p(\tau),\qquad p(\mu,\tau\mid\vec y,\vec\sigma)=p(\mu\mid\tau,\vec y,\vec\sigma)\,p(\tau\mid\vec y,\vec\sigma),
> $$
> $$
> p(\mu\mid\vec y,\vec\sigma)=\int p(\mu\mid\tau,\vec y,\vec\sigma)\,p(\tau\mid\vec y,\vec\sigma)\,d\tau\approx\sum_jp(\mu\mid\tau_j)\,w_j,\quad\sum_jw_j=1.
> $$
> The prior independence $p(\mu,\tau)=p(\mu)p(\tau)$ is what makes this work. The normalising constant of $p(\tau\mid y)$ is a one-dimensional integral for any $p(\tau)$ if the posterior is proper. The effect's marginal is a continuous mixture of normals (Seidel 2010; Lindsay 1995). Grid points $\tau_j$ and weights $w_j$ come from the DIRECT algorithm ([[Roever 2020 - DIRECT Algorithm Implementation and Calibration]]).
^thm-posterior-factorisation

## Examples

> [!example] Posterior for $\tau$ and $\mu$ on a grid
> The complete worked example (six studies) is in [[Roever 2020 - Pediatric Liver Transplant Worked Example]]. Core code:

```python
import numpy as np
from scipy import stats
def posterior_grid(y, sigma, mu_prior=(0.0, 4.0), tau_scale=0.5, tmax=4.0, n=40001):
    mup, sp = mu_prior; tg = np.linspace(0, tmax, n)
    def cond(t):                                   # mu_hat(tau), sigma_hat(tau), Eq. 21
        P = 1/sp**2 + (1/(sigma**2+t**2)).sum()
        return (mup/sp**2 + (y/(sigma**2+t**2)).sum())/P, P**-.5
    def logml(t):                                  # Eq. 22 via p(y|m,t) p(m) / p(m|y,t) at m = mu_hat
        m, s = cond(t)
        return stats.norm.logpdf(y, m, np.sqrt(sigma**2+t**2)).sum() + stats.norm.logpdf(m, mup, sp) - stats.norm.logpdf(m, m, s)
    lp = np.array([logml(t) for t in tg]) + stats.halfnorm.logpdf(tg, scale=tau_scale)
    p = np.exp(lp-lp.max()); p /= np.trapezoid(p, tg)      # p(tau | y)
    ms = np.array([cond(t) for t in tg])                    # conditional normals p(mu | tau, y)
    return tg, p, ms                                        # mu-marginal = sum_j N(ms[j]) * p[j] * dtau
```

## Connections

- [[Hierarchical Models]]: the "conditional posterior given the hyperparameter, then average over the hyperparameter posterior" pattern is the standard hierarchical-model decomposition (Gelman et al. 2014 Sec. 5.4).
- The frequentist Knapp-Hartung/HKSJ method ([[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]) can be read as an approximate way of widening $\hat\sigma(\hat\tau)$ for the $\tau$ uncertainty that this note integrates over exactly.

## See Also

- [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
