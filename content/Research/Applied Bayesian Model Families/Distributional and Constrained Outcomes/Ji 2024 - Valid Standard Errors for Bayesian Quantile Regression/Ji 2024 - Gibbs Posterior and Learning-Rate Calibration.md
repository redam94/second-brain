---
title: "Ji 2024 - Gibbs Posterior and Learning-Rate Calibration"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]]"
source_location: "Sec. 1, 2.1-2.2, 7 (concept note; Gibbs posterior theory is from Syring and Martin 2019 and Bissiri et al. 2016, no raw source)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
doc_type: paper
depends_on:
  - "[[Ji 2024 - Asymmetric Laplace Working Likelihood]]"
  - "[[Ji 2024 - Simulation Results and Applications]]"
used_by:
  - "[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]"
aliases:
  - Gibbs posterior
  - learning rate calibration
  - generalized Bayes quantile regression
  - tempered posterior
---

# Ji 2024 - Gibbs Posterior and Learning-Rate Calibration

> [!summary]
> Concept note, no raw source for the theory. The AL "likelihood" with scale $\sigma$ is a **Gibbs (generalised-Bayes) posterior** $\pi(\beta\mid D)\propto\exp\{-\omega\sum_i\rho_\tau(y_i-x_i'\beta)\}\pi(\beta)$ with learning rate $\omega=1/\sigma$. $\omega$ sets the spread, not the mode. Calibrate $\omega$ (e.g. by bootstrap so that intervals attain nominal coverage) to get honest quantile credible intervals. Ji et al. cite this route as an alternative (Syring and Martin 2019) but do not pursue it.

## Overview

Ji et al. (Sec. 2.2): "For the broader class of approaches that choose a likelihood because its maximum minimizes a loss function, Syring and Martin (2019) suggest selecting the scale parameter so that the credible intervals have approximately correct empirical coverage. Such an approach could be used in AL-based Bayesian quantile regression but is not further pursued here." Sec. 1 notes that "the general approach of constructing a posterior through a loss function is discussed by, for instance, Syring and Martin (2019)."

## Main Content

> [!definition] Gibbs posterior with learning rate
> For a loss $\ell_\beta(y,x)$ with risk minimiser $\beta^*=\arg\min_\beta E\,\ell_\beta$, prior $\pi$, and learning rate $\omega>0$:
> $$
> \pi_\omega(\beta\mid D)\propto\exp\Big\{-\omega\sum_{i=1}^n\ell_\beta(y_i,x_i)\Big\}\,\pi(\beta).
> $$
> For quantile regression with $\ell_\beta=\rho_\tau(y-x'\beta)$, $\omega=1/\sigma$ reproduces the AL posterior with fixed $\sigma$ (up to the constant $\tau(1-\tau)/\sigma$ factor in $\sigma$ that does not depend on $\beta$). Bissiri, Holmes and Walker (2016) justify it as a coherent belief update for a loss-targeted parameter. $\omega=1$ is "Bayes" only if the loss is a true negative log-likelihood.
^def-gibbs

> [!theorem] Why the interval is mis-scaled (consequence of Eq. 1 in Ji et al.)
> Under regularity, $\pi_\omega(\beta\mid D)\approx N(\hat\beta,\ \omega^{-1}H^{-1}/n)$ where $H=\lim\frac1n\sum f_\text{ALD}$-type curvature of the risk, while the sampling covariance of $\hat\beta$ is the sandwich $H^{-1}VH^{-1}/n$ with $V=\operatorname{Var}\{\rho_\tau'(y-x'\beta)x\}$. Credible sets have the right coverage only if $\omega^{-1}H^{-1}=H^{-1}VH^{-1}$, i.e. $\omega$ equals a matrix ratio that depends on the unknown density of the errors at the quantile - not on anything the modeller sets. For scalar parameters: $\omega^*=H/V$.
^thm-learning-rate

> [!definition] Bootstrap-calibrated learning rate (algorithm, Syring and Martin 2019 style)
> 1. Compute the loss minimiser $\hat\beta$ (e.g. Frisch-Newton LP).
> 2. For $b=1..B$: resample $(y,x)$ pairs, recompute $\hat\beta^{(b)}$.
> 3. For a grid of $\omega$: draw from $\pi_\omega$ (MCMC) and find $\omega$ s.t. the posterior covariance (or the credible-interval width) matches the bootstrap covariance of $\hat\beta^{(b)}$, or such that the bootstrap-estimated coverage of $100(1-a)\%$ credible intervals equals $1-a$. A stochastic-approximation (Robbins-Monro) version updates $\omega$ iteratively.
> 4. Report the Gibbs posterior at the calibrated $\omega^*$.
^def-calibration

**Relation to the paper's methods.** IJ SEs ([[Ji 2024 - Infinitesimal Jackknife Standard Errors]]) replace the bootstrap by a one-run approximation and correct the *standard error* post hoc; Gibbs calibration corrects the *posterior itself* (including shape - useful for the skewed posteriors at extreme $\tau$ where the mean is biased, Fig. 8). The Yang-Wang-He adjustment ([[Ji 2024 - Yang-Wang-He Sandwich Adjustment]]) is asymptotically the matrix version of $\omega^*$.

**"When it lies"** (E83): the AL mode is right (consistent point estimate, also valid for the quantile process), the spread is wrong (arbitrary $\sigma$), and there is a units trap ($\sigma=1$ means different weights for dollars vs thousands). Coverage simulations in [[Ji 2024 - Simulation Results and Applications]] quantify it.

## Examples

> [!example] Python: Gibbs posterior for a quantile by Metropolis, calibrated by bootstrap
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> y = rng.standard_normal(300); tau = 0.9
> rho = lambda u: u * (tau - (u < 0))
> def post_sd(omega, n_it=4000):
>     b, out = np.quantile(y, tau), []
>     for _ in range(n_it):
>         prop = b + 0.2 * rng.standard_normal()
>         if np.log(rng.random()) < -omega * (rho(y - prop).sum() - rho(y - b).sum()):
>             b = prop
>         out.append(b)
>     return np.std(out[1000:])
> boot_sd = np.std([np.quantile(rng.choice(y, len(y)), tau) for _ in range(500)])
> grid = np.exp(np.linspace(-2, 3, 12))
> sds = np.array([post_sd(w) for w in grid])
> omega_star = grid[np.argmin(np.abs(sds - boot_sd))]     # calibrated learning rate
> print(boot_sd, omega_star)
> ```
> Rescaling $y$ by $c$ changes $\omega^*$ by $1/c$, which removes the units trap.
^ex-gibbs-python

**PyMC sketch (untested).** `pm.Potential("gibbs", -omega * pt.sum(rho(y - X @ beta)))` with `omega` fixed to the calibrated value (not a free parameter: sampling it would reward ever-larger $\omega$).

## Connections

[[Quantile Regression]], [[Simulation-Based Calibration - Overview]] (coverage as a calibration target), [[Conformalized Quantile Regression]] (alternative finite-sample guarantee), [[Overfitting and Information Criteria]].

## See Also

[[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
