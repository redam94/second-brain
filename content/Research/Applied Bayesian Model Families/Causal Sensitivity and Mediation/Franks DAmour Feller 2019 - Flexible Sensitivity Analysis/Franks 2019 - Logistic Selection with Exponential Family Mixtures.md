---
title: "Franks 2019 - Logistic Selection with Exponential Family Mixtures"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/theorem
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Sec. 4.1-4.2, pp. 12-17; Eqs. 7-14; Propositions 1-2; Examples 2-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]]"
used_by:
  - "[[Franks 2019 - Calibrating Sensitivity Parameters]]"
  - "[[Franks 2019 - NHANES and Job Training Applications]]"
aliases:
  - logistic-mEF
  - exponential tilting missing outcome
  - logistic selection sensitivity
---

# Franks 2019 - Logistic Selection with Exponential Family Mixtures

> [!summary]
> If the log-odds of treatment are linear in a sufficient statistic $s(Y(t))$ of the potential outcome and the observed outcome is an exponential family (or a mixture of them), then the missing-outcome distribution is available in closed form: the natural parameter shifts by $\gamma_t$ and mixture weights are re-weighted. Condition 1 holds automatically and the normalising constant is tractable, so the observed-data model is fit once and the sensitivity analysis is a post-processing step.

## Overview

> [!definition] Logistic selection (Eq. 7)
> $$
> f(T=1|Y(t),X)=\text{logit}^{-1}\{\alpha_t(X)+\gamma_t'\,s_t(Y(t))\}.
> $$
> $\gamma=(\gamma_0,\gamma_1)$ are the **sensitivity parameters** (how treatment depends marginally on each potential outcome); $\alpha_t(X)$ is identified by the data once $\gamma_t$ is set. Parameters are assumed independent of covariates (extension: $\gamma_t(X)$).
^def-logistic-selection

Properties: for any $\gamma_t$ giving a proper missing distribution, a unique $\alpha_t(X)$ satisfies Condition 1 (Robins et al. 2000); the missing distribution is free of $\alpha_t(X)$ (Rotnitzky et al. 2001; Scharfstein et al. 2003):
$$
f^{mis}(Y(t)|T=1{-}t,X)=f^{obs}(Y(t)|T=t,X)\,\frac{\exp(\gamma_t's_t(Y(t)))}{C(\gamma_t,X)},\quad C(\gamma_t,X)=\int e^{\gamma_t's_t(y)}f^{obs}(y|T=t,X)\,dy\quad(8)
$$
and $\gamma_0,\gamma_1$ are variation independent. The difficulty is computing $C$; Scharfstein et al. used the empirical CDF or MCMC on the joint space; the logistic-mEF class avoids it.

> [!warning] Sign convention
> As printed, Eqs. 8, 10, 12 and 22 use $+\gamma_t$ in the tilt for both arms. Derivation from (7): the odds of the *other* arm is $f(T{=}1{-}t|y)/f(T{=}t|y)$, which equals $e^{+(\alpha_0+\gamma_0y)}$ for $t=0$ but $e^{-(\alpha_1+\gamma_1y)}$ for $t=1$. So with selection defined as $P(T=1|Y(t))$ for both arms, the missing control mean shifts by $+\gamma_0\sigma_0^2$ and the missing treated mean by $-\gamma_1\sigma_1^2$ in the normal case. The interpretation in Sec. 5.1 (Examples 5-7: $\gamma_1>0$ means treated observed mean exceeds the unobserved) and the results in Fig. 2 are consistent with this strict version, so the printed "+" for $t=1$ is best read as a notational shortcut where $\gamma_1$ is defined through selection into the arm. Check your implementation with a simulation (the code below does this).

## Main Content

> [!theorem] Proposition 1 (single exponential family)
> Let $f^{obs}_t(Y(t)|T=t,X)=h(Y(t))\,g(\eta_t(X))\,e^{s(Y(t))'\eta_t(X)}$ with natural parameter $\eta_t(X)$. Under logistic selection (7), if $\eta_t^*(X)=\eta_t(X)+\gamma_t$ lies in the natural parameter space, the missing outcomes are in the same family,
> $$
> f^{mis}_{\gamma_t,t}(Y(t)|T=1{-}t,X)=h(Y(t))\,g(\eta_t^*(X))\,e^{s(Y(t))'\eta_t^*(X)},\qquad C(\gamma_t,X)=\frac{g(\eta_t(X))}{g(\gamma_t+\eta_t(X))}.
> $$
^prop-single-ef

> [!theorem] Proposition 2 (mixtures of exponential families)
> Let $f^{obs}_t=\sum_k\pi_kh_k(Y(t))g_k(\eta_{tk})e^{s(Y(t))'\eta_{tk}}$ with common sufficient statistic $s$. Under logistic selection with $\eta_{tk}^*=\eta_{tk}+\gamma_t$ inside each component's natural parameter space, the missing distribution is a $K$-component mixture of the same families,
> $$
> f^{mis}=\sum_k\pi_k^*h_k(Y)g_k(\eta_{tk}^*)e^{s(Y)'\eta_{tk}^*},\qquad\pi_k^*=\frac{\pi_k\,g_k(\eta_k)/g_k(\eta_k^*)}{\sum_{k'}\pi_{k'}\,g_{k'}(\eta_{k'})/g_{k'}(\eta_{k'}^*)}\quad(12\text{-}13),
> $$
> and $C(\gamma_t,X)=\sum_k\pi_k\,g_k(\eta_{tk})/g_k(\gamma_t+\eta_{tk})$. Includes Dirichlet-process mixtures and BART observed models.
^prop-mixture-ef

### Worked cases

> [!example] Example 2: binary outcome
> $f^{obs}_t=\text{Bern}(\text{logit}^{-1}\mu_t(X))$ and selection $\propto\text{Bern}(\text{logit}^{-1}(\alpha_t(X)+\gamma_tY(t)))$. Then the unobserved arm is $\text{Bern}(\text{logit}^{-1}(\mu_t(X)+\gamma_t))$: an **additive log-odds shift**.
^ex-binary-shift

> [!example] Example 3: normal outcome, quadratic selection
> $f^{obs}_t=N(\mu_t(X),\sigma_t^2)$, sufficient statistics $(Y,Y^2)$, selection $\text{logit}^{-1}(\alpha_t(X)+\gamma_tY(t)+\psi_tY(t)^2)$. Then
> $$
> f^{mis}=N\!\left(\frac{\mu_t(X)+\gamma_t\sigma_t^2}{1-2\psi_t\sigma_t^2},\ \frac{\sigma_t^2}{1-2\psi_t\sigma_t^2}\right)\quad(11).
> $$
> With $\psi_t=0$ the standard deviations of observed and missing distributions coincide (mean shift $\gamma_t\sigma_t^2$). Propriety requires $\psi_t<1/(2\sigma_t^2)$ (footnote 3).
^ex-normal-tilt

> [!example] Example 4: normal mixture
> $f^{obs}_t=\sum_k\pi_kN(\mu_{tk}(X),\sigma_{tk}^2)$, $\psi_t=0$: $f^{mis}=\sum_k\pi_k^*N(\mu_{tk}+\gamma_t\sigma_{tk}^2,\sigma_{tk}^2)$ with
> $$
> \pi_k^*\propto\pi_k\exp\!\Big\{\gamma_t\mu_{tk}(X)+\tfrac12\gamma_t^2\sigma_{tk}^2\Big\}=\pi_k\,E_k\big[e^{\gamma_tY}\big].
> $$
> (This is the expansion of $g_k(\eta_k)/g_k(\eta_k^*)$ for a Gaussian component, i.e. the moment generating function of component $k$ at $\gamma_t$. The paper prints a different-looking exponent, $\tfrac12\{\mu_{tk}^2/\sigma_{tk}^2-(\mu_{tk}/\sigma_{tk}-\gamma_t)^2\}$, which does not match this derivation dimensionally, so the form above is this note's own derivation.) Both the mixture weights and the component means move with $\gamma_t$: for $\gamma_t>0$ components with larger mean or variance are up-weighted.
^ex-normal-mixture

The same machinery handles semi-continuous data (zero-inflated income, see [[Franks 2019 - NHANES and Job Training Applications]]) and any Dirichlet-process mixture of exponential families.

## Examples

```python
import numpy as np
# Verify the Gaussian tilt: sample from the observed arm, importance-weight with exp(+-gamma*y), compare to closed form
rng = np.random.default_rng(1)
mu, sig, gamma = 3.0, 2.0, 0.15
y = rng.normal(mu, sig, 1_000_000)
for sign, name in [(+1, "control arm  (missing = treated)"), (-1, "treated arm  (missing = control)")]:
    w = np.exp(sign*gamma*y); w /= w.sum()
    print(name, "weighted mean", (w*y).sum(), " closed form", mu + sign*gamma*sig**2)
```

PyMC-style sketch (untested): fit the observed arm once, then for each posterior draw compute the shifted complete-data mean:

```python
# mu_post: posterior draws of mu_t(x_i) per unit, sigma_post: draws of sigma_t, p_t: share of units observed in arm t
# ate_draw(gamma0, gamma1) = [p1*mu1_obs + (1-p1)*(mu1_miss)] - [p0*mu0_obs + (1-p0)*mu0_miss]
# mu1_miss = mu1 - gamma1*sigma1**2   (strict sign)    mu0_miss = mu0 + gamma0*sigma0**2
```

## Connections

- Tilts correspond to partial-pooling free "bias parameters" in [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]], where the bias is estimated from an experiment instead of postulated.
- BART observed model: [[Chipman 2010 - BART - Overview]]; DP mixtures: [[Teh 2010 - Dirichlet Process - Overview]].

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Franks 2019 - Calibrating Sensitivity Parameters]]
