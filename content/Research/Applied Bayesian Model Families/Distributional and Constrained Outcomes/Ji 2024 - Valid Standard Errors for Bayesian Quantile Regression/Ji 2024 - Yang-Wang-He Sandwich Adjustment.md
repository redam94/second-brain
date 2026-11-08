---
title: "Ji 2024 - Yang-Wang-He Sandwich Adjustment"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/theorem
  - doc/paper
source: "[[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]]"
source_location: "Sec. 2.2, Eqs. (1)-(3), pp. 6-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
doc_type: paper
depends_on:
  - "[[Ji 2024 - Asymmetric Laplace Working Likelihood]]"
used_by:
  - "[[Ji 2024 - Simulation Results and Applications]]"
aliases:
  - Yang Wang He 2016 adjustment
  - Sriram sandwich likelihood
  - adjusted posterior covariance AL
---

# Ji 2024 - Yang-Wang-He Sandwich Adjustment

> [!summary]
> With a flat prior and fixed $\sigma$, the AL posterior of $\beta(\tau)$ is asymptotically normal centred at the Koenker-Bassett estimate with covariance $\sigma D_1^{-1}/n$ - proportional to the arbitrary $\sigma$. The frequentist sampling covariance is the quantile-regression sandwich $\tau(1-\tau)D_1^{-1}D_0D_1^{-1}/n$. Yang, Wang and He (2016) substitute the former into the latter to rescale the posterior covariance; asymptotically invariant to $\sigma$, but in finite samples sensitive to it.

## Overview

The original paper (Yang, Wang and He 2016, *Posterior inference in Bayesian quantile regression with asymmetric Laplace likelihood*, Int. Stat. Rev.) is paywalled and was not obtained; this note records the adjustment as restated and tested by Ji et al. (2024). Sriram (2015) proposed a related two-step "sandwich likelihood".

## Main Content

> [!theorem] Asymptotic posterior (Eq. 1; Yang et al. 2016; Sriram 2015 for $\sigma=1$)
> With flat (improper) priors on $\beta(\tau)$ and fixed $\sigma$,
> $$
> p_n(\beta(\tau)\mid\mathcal D)\xrightarrow{d}N\!\left(\hat\beta(\tau),\ \frac{\sigma D_1^{-1}}{n}\right),\qquad D_1=\lim_{n\to\infty}\frac1n\sum_{i=1}^nf_\text{ALD}(y_i\mid\mu_{0i},\sigma,\tau)\,x_ix_i',
> $$
> where $\mu_{0i}=x_i'\beta_0(\tau)$ is evaluated at the true parameter. Sriram (2015, Remark 4) extends this to arbitrary fixed $\sigma$ and arbitrary proper priors.
^thm-al-posterior

> [!theorem] Frequentist sampling distribution (Eq. 2; Koenker 2005, p. 74)
> $$
> \sqrt n\left(\hat\beta(\tau)-\beta_0\right)\xrightarrow{d}N\!\left(0,\ \tau(1-\tau)D_1^{-1}D_0D_1^{-1}\right),\qquad D_0=\lim\frac1n\sum x_ix_i'.
> $$
> (The paper prints the same symbols $D_1,D_0$ in Eqs. 1 and 2. In Koenker's (2005) standard result, $D_1$ is built from the *true* conditional density of $y$ at the $\tau$-th quantile; treat the identification of the two matrices as the paper's, not independently verified here.)
^thm-sandwich

> [!definition] Adjusted covariance (Eq. 3)
> Substitute $\frac n\sigma\hat\Sigma(\sigma)$ for $D_1^{-1}$-type factors (from Eq. 1) and the finite-sample $n^{-1}\sum x_ix_i'$ for $D_0$ in the sandwich:
> $$
> \hat\Sigma_\text{adj}(\sigma)=\frac{\tau(1-\tau)}{\sigma^2}\,\hat\Sigma(\sigma)\left(\sum_{i=1}^nx_ix_i'\right)\hat\Sigma(\sigma),
> $$
> with $\hat\Sigma(\sigma)$ the posterior covariance from the AL posterior with the given $\sigma$. Credible intervals use $\hat\Sigma_\text{adj}$ instead of $\hat\Sigma$. Because $\hat\Sigma\propto\sigma$, $\hat\Sigma_\text{adj}$ is asymptotically free of $\sigma$.
^def-sandwich-adjust

**Sriram's two-step sandwich likelihood.** Step 1: posterior means $\tilde\beta(\tau)$ and covariance $\hat\Sigma(\sigma)$ under the AL with fixed $\sigma$. Step 2: replace the AL by a multivariate normal "sandwich likelihood" with mean $\tilde\beta$ and covariance from Eq. 3 and recompute; credible sets merge asymptotically with frequentist confidence sets.

**Finite-sample caveat (Ji et al.).** "In finite samples, the posterior distribution may not be well approximated by a multivariate normal ... depending on $n$, $\tau$, $\sigma$ and the data-generating process," so the choice of $\sigma$ matters. Yang et al. recommend $\sigma$ = its ML estimate under the AL at the *median* $\tau=0.5$ (no proof given). Ji et al. find with $\sigma=10$, $\tau=0.7$ the adjustment is over 50% too wide for $n<500$ (Fig. 3) and at $\tau=0.9,\sigma=10$ the average Yang SE is 0.2 versus 0.09 for IJ (coverage 0.99).

## Examples

> [!example] Python: applying Eq. 3 to AL posterior draws
> ```python
> import numpy as np
> def yang_adjusted_cov(draws, X, tau, sigma):
>     """draws: (S, p) posterior draws of beta(tau) under AL with fixed sigma."""
>     Sigma = np.cov(draws, rowvar=False)
>     XtX = X.T @ X
>     return tau * (1 - tau) / sigma**2 * Sigma @ XtX @ Sigma
> # CI: beta_hat +/- 1.645 * sqrt(diag(adj)) for 90%
> ```
> Multiply by the units: if the response is rescaled by $c$, $\sigma$ and $\hat\Sigma$ rescale so $\hat\Sigma_\text{adj}$ scales by $c^2$, as it should.
^ex-yang-python

## Connections

[[Ji 2024 - Infinitesimal Jackknife Standard Errors]] avoids estimating $D_1$ through the AL scale; learning-rate view: [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]].

## See Also

[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
