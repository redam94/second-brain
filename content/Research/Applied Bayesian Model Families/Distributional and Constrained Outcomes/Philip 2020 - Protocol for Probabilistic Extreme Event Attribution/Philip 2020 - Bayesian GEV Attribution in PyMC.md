---
title: "Philip 2020 - Bayesian GEV Attribution in PyMC"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]]"
source_location: "Sec. 4.2-4.3 (concept translation to Bayesian inference is not in the paper)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
doc_type: paper
depends_on:
  - "[[Philip 2020 - Extreme Value Distributions for Attribution]]"
  - "[[Philip 2020 - Trend Models and Natural Variability]]"
used_by:
  - "[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]"
aliases:
  - Bayesian extreme value attribution
  - non-stationary GEV PyMC
  - geophysical shape prior
---

# Philip 2020 - Bayesian GEV Attribution in PyMC

> [!summary]
> The protocol's frequentist recipe (penalised ML + bootstrap) translates to a Bayesian non-stationary GEV with a weakly informative shape prior replacing the $|\xi|\le0.4$ penalty. $PR$, FAR, return levels and $\Delta I$ become posterior functionals. The main computational hazard is the support wall: when $\xi<0$ every observation must lie below the endpoint, which makes NUTS diverge unless the model is re-parameterised. Code is **untested**.

## Overview

Concept note, not in the paper. It follows E37 (Pacific Northwest heatwave 2021) where annual maxima at Sea-Tac and Portland and GISTEMP GMST are used, with `pymc_extras.GenExtreme` checked against `scipy`.

## Main Content

> [!definition] Non-stationary GEV with shift fit
> $x_t\sim\text{GEV}(\mu_t,\sigma,\xi)$, $\mu_t=\mu_0+\alpha T'_t$ ($T'$ = smoothed GMST anomaly), constant $\sigma,\xi$ (Philip et al. 2020, Sec. 4.3.1). Posterior functionals: $p_j=1-\text{GEV}_\text{cdf}(x_\text{ev};\mu_0+\alpha T'_j,\sigma,\xi)$, $PR=p_1/p_0$, $\text{FAR}=1-1/PR$, $\Delta I=\alpha(T_1'-T_0')$.
^def-bayes-gev

**Priors.** $\mu_0\sim N(\bar x,s_x)$ (weakly informative on the data scale); $\sigma\sim\text{HalfNormal}(s_x)$ - on the log scale if desired; $\alpha\sim N(0,\text{scale})$ with units of the variable per degree; **geophysical shape prior** replacing the paper's penalty $|\xi|\lesssim0.4$ (Katz et al. 2002): Martins and Stedinger (2000) use $\xi+0.5\sim\text{Beta}(6,9)$ on $(-0.5,0.5)$ (a standard hydrology prior, not from this paper).

> [!example] PyMC 5 sketch (untested; verify the sign convention of `xi` in `pymc_extras.GenExtreme`)
> ```python
> import numpy as np, pymc as pm, pytensor.tensor as pt
> from pymc_extras.distributions import GenExtreme     # check: shape sign vs scipy c = -xi
>
> with pm.Model() as gev_shift:
>     T = pm.Data("T", T_anom)                         # smoothed GMST anomalies
>     mu0 = pm.Normal("mu0", x.mean(), x.std())
>     sigma = pm.HalfNormal("sigma", x.std())
>     xi_raw = pm.Beta("xi_raw", 6, 9)
>     xi = pm.Deterministic("xi", xi_raw - 0.5)        # (-0.5, 0.5), mean about -0.1
>     alpha = pm.Normal("alpha", 0, 3)
>     mu = mu0 + alpha * T
>     GenExtreme("y", mu=mu, sigma=sigma, xi=xi, observed=x)
>     idata = pm.sample(2000, tune=2000, target_accept=0.95)
>
> # attribution functionals from posterior draws
> from scipy import stats
> post = idata.posterior.stack(s=("chain", "draw"))
> def p_exceed(Tval):
>     c = -post["xi"].values
>     return stats.genextreme.sf(x_event, c, loc=post["mu0"].values + post["alpha"].values * Tval,
>                                scale=post["sigma"].values)
> PR = p_exceed(T1) / p_exceed(T0)
> print(np.median(PR), np.percentile(PR, [2.5, 97.5]))
> ```
^ex-pymc-gev

**Removing the support wall.** For $\xi<0$ the upper endpoint is $b=\mu_t-\sigma/\xi$ and every observation must satisfy $x<b$. Leaving the observed-data logp to return $-\infty$ outside the support creates a cliff for NUTS. Re-parameterise through the endpoint instead: for the shift fit define the detrended maximum $m=\max_t(x_t-\alpha T'_t)$ and sample an excess $\delta>0$ so that $b_0=m+\delta$ is the endpoint of the base distribution; then $\sigma=-\xi\,(b_0-\mu_0)$ (for $\xi<0$), with $\delta\sim\text{HalfNormal}$. Then support is satisfied by construction for $\xi<0$ and the sampler explores smoothly (E37's "reparameterisation that removes support-wall divergences"); positive $\xi$ has no upper wall but needs $x>\mu-\sigma/\xi$ (lower wall).

**Trigger-event handling.** The paper excludes the trigger event from the fit but requires non-zero probability. Bayesian analogue: fit without it, then confirm $P(x_\text{ev}<b)>0$ across draws; or include it as a sensitivity run (shows how much the "dice loaded" estimate rises when the record is included - selection bias).

**Diagnostics.** Return-level plot with posterior bands; q-q of probability-integral-transformed observations; prior sensitivity of $\xi$ (tail inference is dominated by the prior for short records); compare $PR$ using GMST shift vs scale fit.

## Examples

> [!example] Heat-event numbers to expect
> Annual maxima of daily temperature typically have $\xi<0$ (bounded). When the event is near the endpoint the posterior of $PR$ is heavy-tailed or includes $\infty$ draws - report as "extremely unlikely in the counterfactual" and the lower bound of $PR$ (Philip et al. 2020: emphasise the more stable lower bound).
^ex-heat-numbers

## Connections

[[Prior Predictive Checking]] for $\xi$, [[Hierarchical Models]] (pooling several stations' $\xi$), [[Posterior Predictive Checking]].

## See Also

[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
