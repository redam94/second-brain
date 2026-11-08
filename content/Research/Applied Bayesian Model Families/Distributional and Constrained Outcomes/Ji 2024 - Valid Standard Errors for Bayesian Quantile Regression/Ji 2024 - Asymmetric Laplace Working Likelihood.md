---
title: "Ji 2024 - Asymmetric Laplace Working Likelihood"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/definition
  - doc/paper
source: "[[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]]"
source_location: "Sec. 1-2.1, pp. 1-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
doc_type: paper
depends_on:
  - "[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]"
used_by:
  - "[[Ji 2024 - Yang-Wang-He Sandwich Adjustment]]"
  - "[[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]]"
aliases:
  - asymmetric Laplace likelihood
  - check function
  - pinball loss working likelihood
  - AL scale mixture representation
---

# Ji 2024 - Asymmetric Laplace Working Likelihood

> [!summary]
> Linear quantile regression models $Q_\tau(y\mid x)=x'\beta(\tau)$ and estimates $\beta(\tau)$ by minimising the check loss. Yu and Moyeed (2001) turned this into Bayesian inference by *pretending* errors are asymmetric Laplace: its likelihood is the exponentiated negative check loss. The AL is not a plausible data-generating distribution, so the posterior is a loss-based ("quasi") posterior whose mode is right and whose spread is arbitrary.

## Overview

Alternatives to the AL (nonparametric likelihoods: Kottas and Krnjajić 2009, Reich et al. 2010; empirical likelihoods: Otsu 2008, Yang and He 2012) exist but the AL dominates in software: R `brms`, `bayesQR`, Stata `bayes:qreg`.

## Main Content

> [!definition] Check loss
> $\rho_\tau(u)=u\{\tau-I(u<0)\}=\begin{cases}u\tau&u\ge0\\-u(1-\tau)&u<0\end{cases}$. Quantile estimator: $\hat\beta(\tau)=\arg\min_\beta\sum_{i=1}^n\rho_\tau(y_i-x_i'\beta)$ (Koenker and Bassett 1978; linear programming).
^def-check-loss

> [!definition] Asymmetric Laplace density
> $$
> f_\text{ALD}(y_i\mid\mu_i,\sigma,\tau)=\frac{\tau(1-\tau)}{\sigma}\exp\left\{-\rho_\tau\!\left(\frac{y_i-\mu_i}{\sigma}\right)\right\},\quad\mu_i=x_i'\beta(\tau).
> $$
> For fixed $\sigma$, maximising the likelihood in $\beta$ is exactly minimising $\sum\rho_\tau(y_i-\mu_i)$. The AL is right-skewed for $\tau<0.5$ and left-skewed for $\tau>0.5$, i.e. its skewness depends on the quantile you happen to ask about - impossible for one data-generating process (Koenker and Machado 1999: "rather implausible"; Sriram et al. 2013 "misspecified"; Sriram 2015, Yang et al. 2016 "working likelihood"; Geraci 2019 "pseudo-likelihood").
^def-ald

> [!definition] Scale-mixture-of-normals representation (Kotz et al. 2001; Kozumi and Kobayashi 2011)
> $\epsilon_i=y_i-\mu_i=\sigma\left(\theta_1\nu_i+\theta_2\sqrt{\nu_i}\,z_i\right)$ with $\theta_1=\dfrac{1-2\tau}{\tau(1-\tau)}$, $\theta_2^2=\dfrac{2}{\tau(1-\tau)}$, $z_i\sim N(0,1)$, $\nu_i\sim\text{Exp}(1)$ independent. This gives conditionally Gaussian full conditionals and Gibbs/EM algorithms; with Stan it is not needed.
^def-al-mixture

**Role of $\sigma$.** $\sigma$ "weights the information in the data relative to that in the prior" (Syring and Martin 2019); it controls posterior spread. Practice: $\sigma=1$ with no discussion (Yu and Moyeed 2001; Yu and Stander 2007 call it a nuisance parameter), an estimated $\sigma$ with inverse Gamma prior (Kozumi and Kobayashi 2011; Yue and Rue 2011; Wang 2012; Sriram 2015; `bayesQR` and `bayes:qreg` use IG(0.01,0.01)), uniform$(0,10)$ (Reich et al. 2010) or half-$t$(3) (`brms`). Sriram et al. (2013) prove posterior *consistency* of the point estimate with $\sigma=1$ or with a prior on $\sigma$. The AL also enables censoring (Yu and Stander 2007), random effects/latent variables (Geraci and Bottai 2007, 2014; Wang 2012) and joint longitudinal-survival models (Huang and Chen 2016).

**Units trap.** Because $\sigma$ has units of $y$, "$\sigma=1$" means something different when $y$ is in dollars versus thousands of dollars; the same prior-data weighting changes with units (cf. Fig. 8: $\sigma=100$ with the original response is equivalent to $\sigma=1$ with a response rescaled).

## Examples

> [!example] Python: AL log-likelihood equals negative check loss
> ```python
> import numpy as np
> def check_loss(u, tau): return u * (tau - (u < 0))
> def al_loglik(y, mu, sigma, tau):
>     u = (y - mu) / sigma
>     return np.log(tau * (1 - tau) / sigma) - check_loss(u, tau)
> rng = np.random.default_rng(1); y = rng.standard_normal(500)
> tau = 0.9
> grid = np.linspace(0, 2, 401)
> ll = [al_loglik(y, m, 1.0, tau).sum() for m in grid]
> loss = [check_loss(y - m, tau).sum() for m in grid]
> print(grid[np.argmax(ll)], grid[np.argmin(loss)], np.quantile(y, tau))   # all agree
> ```
^ex-al-python

## Connections

Frequentist: [[Quantile Regression]]. The corrected posterior: [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]], [[Ji 2024 - Infinitesimal Jackknife Standard Errors]], [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]].

## See Also

[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
