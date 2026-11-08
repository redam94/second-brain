---
title: "Unidentified Parameters - Partial Identification and Bayesian Updating"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/concept
source: "concept note, no raw source (literature cited: Kadane 1974; Poirier 1998; Manski 2003; Gustafson 2015; Franks et al. 2019 in the vault)"
source_location: "Concept note synthesising the unidentified-parameter logic used in Franks 2019 Sec. 2.4, Imai 2010 Corollary 1 and Cinelli-Hazlett 2020 Sec. 6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Unidentified Parameters and Question Contracts (concept)"
doc_type: concept
depends_on:
  - "[[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]]"
  - "[[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]"
used_by:
  - "[[Unidentified Parameters - Keeping the Answer on the Question]]"
aliases:
  - partial identification Bayesian
  - ridge posterior unidentified
  - prior-to-posterior learning in nonidentified models
---

# Unidentified Parameters - Partial Identification and Bayesian Updating

> [!summary]
> When the likelihood depends on the parameters only through an identified function $\phi=g(\theta)$, Bayesian updating changes the distribution of $\phi$ and leaves the conditional prior of the rest, $p(\theta\mid\phi)$, untouched. The marginal posterior of an unidentified component therefore stays prior-dependent, however large the sample, while the identified combination concentrates. This is the formal reason sensitivity parameters (Franks' $\gamma_t$, Imai's $\rho$, Cinelli-Hazlett's confounder $R^2$ values) must be set from outside the data and reported as such. *Concept note: no single raw source; the literature is cited, not ingested.*

## Overview

Three vault sources show the same structure:
- Imai-Keele-Yamamoto: the data identify $(\beta_2,\sigma_1,\sigma_2,\tilde\rho)$ but not $\rho$; the ACME bounds are $(-\infty,\infty)$ ([[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]).
- Franks et al.: with Tukey's factorization the observed-data model is free of $\gamma$, so the data cannot inform it; latent-confounder models that do identify $\gamma$ blur sensitivity analysis and model checking ([[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]]).
- Cinelli-Hazlett: robustness is an identification problem independent of sample size ([[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]).

## Main Content

> [!definition] Identification and partial identification
> A parameter vector $\theta$ is **identified** if distinct values imply distinct data distributions. The likelihood $p(y|\theta)=p(y|\phi)$ depends on $\theta$ only via $\phi=g(\theta)$ (the identified part); the rest of $\theta$ is **unidentified** and the data constrain it only through the set $\{\theta:g(\theta)=\phi\}$ (the *identified set*; Manski 2003).
^def-identified-set

> [!theorem] Learning only moves the identified part (Kadane 1974; Poirier 1998; Gustafson 2015)
> Let $\theta=(\phi,\psi)$ after a one-to-one reparameterisation, with $p(y|\theta)=p(y|\phi)$. Then
> $$
> p(\phi,\psi\mid y)=p(\phi\mid y)\,p(\psi\mid\phi),
> $$
> i.e. the posterior of $\psi$ given $\phi$ equals the prior of $\psi$ given $\phi$, and $p(\psi|y)=\int p(\psi|\phi)\,p(\phi|y)\,d\phi$ differs from the prior only through the learned $\phi$.
^thm-conditional-prior-unchanged

*Proof.* Bayes: $p(\phi,\psi|y)\propto p(y|\phi)\,p(\phi,\psi)=p(y|\phi)p(\phi)\,p(\psi|\phi)\propto p(\phi|y)\,p(\psi|\phi)$.

Consequences:
1. Posterior uncertainty about $\psi$ does not shrink to zero as $n\to\infty$; it converges to a limit determined by the prior's $p(\psi|\phi)$ at the true $\phi$ (Gustafson: "the limits of limited data").
2. The marginal posterior of an individual component can look informative if the prior is tight or if correlated with an identified combination (a ridge), while the mass lies along a curve.
3. Two analysts with different priors on $\psi$ will not converge; **prior sensitivity is the result**, not a robustness check on it.
4. A better prior on $\psi|\phi$ is the only way to improve the answer, along with extra data that identify more of $\theta$ (e.g. a lift test, below).

### Ridge posteriors
If $y_i\sim N(a+b,1)$ with $a,b$ unidentified separately, $s=a+b$ is identified and $d=a-b$ is not; priors on $a,b$ induce a negatively correlated ridge. The posterior of each of $a,b$ has a width that tracks the prior scale and the correlation tends to $-1$ as $n$ grows. Sampling such posteriors in MCMC produces narrow ridges that are hard to explore; reparameterising to $(s,d)$ separates the learned from the unlearned.

> [!example] Ridge: $n=50$, $y_i\sim N(1.5,1)$ (true $a=1$, $b=0.5$)
> Priors $a,b\sim N(0,\sigma_p^2)$ independently. Sample mean $\bar y=1.629$. Posterior of $s=a+b$: mean $1.625$, SD $0.141$ for any $\sigma_p$ (data-dominated). Posterior of $d=a-b$: its prior, $N(0,2\sigma_p^2)$, unchanged. Posterior of $a$:
>
> | prior SD $\sigma_p$ | post. mean of $a$ | post. SD of $a$ |
> |---|---|---|
> | 1 | 0.806 | 0.711 |
> | 2 | 0.812 | 1.416 |
> | 5 | 0.814 | 3.536 |
>
> Posterior correlation of $(a,b)$ at $\sigma_p=2$ is $-0.995$. The width of $a$ is almost entirely the prior's.
^ex-ridge

```python
import numpy as np
rng = np.random.default_rng(0); n = 50
y = rng.normal(1.5, 1, n); ybar = y.mean()
for sp in (1, 2, 5):
    pv = 2*sp**2                       # prior variance of s = a+b (and of d = a-b)
    pvs = 1/(1/pv + n); pm = pvs*n*ybar
    print(sp, "s: mean", round(pm, 3), "sd", round(pvs**.5, 3), "| a: sd", round(np.sqrt((pvs + pv)/4), 3))
```

### Where this bites in the vault's methods
| Method | Identified part | Unidentified part | What to report |
|---|---|---|---|
| Mediation (Imai 2010) | $\beta_2,\sigma_1,\sigma_2,\tilde\rho$ | $\rho$ | ACME as a function of $\rho$ |
| OVB sensitivity (Cinelli-Hazlett) | $\hat\tau_{res}$, SE, $df$ | $R^2_{Y\sim Z|D,X},R^2_{D\sim Z|X}$ | RV, contours, bounds |
| Tukey factorization (Franks) | $f^{obs}_t$, $f(T|X)$ | selection slopes $\gamma_t$ | estimand over a calibrated $\gamma$ grid |
| Calibrating observational to RCT (Rosenman) | contrast $\hat\tau_o-\hat\tau_r$ | split of that contrast into bias vs. noise (only $\tau_\xi$-level learning) | prior sensitivity of $\tau_\xi$ |
| MMM baseline vs media | total sales given spend | the split between baseline trend and media effect (when collinear) | answer with and without the lift-test constraint |

## Examples

Full marketing example: see [[Unidentified Parameters - Keeping the Answer on the Question]].

## Connections

- Silverman (2020) multiple-systems estimation faces the same issue with empty overlaps: [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]]; Simoiu's identification ridge in threshold tests: [[Simoiu 2017 - Limitations Extensions and Identification Ridge]].
- Priors in MMM: [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]], [[Bayesian Estimation and Priors for MMM]].
- Diagnosing it with prior predictive checks: [[Prior Predictive Checking]].

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Sensitivity Analysis in Observational Studies]]
