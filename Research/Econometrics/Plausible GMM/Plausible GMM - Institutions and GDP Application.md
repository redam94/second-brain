---
title: "Plausible GMM - Institutions and GDP Application"
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian-statistics
  - type/example
  - doc/paper
source: "[[raw/Plausible GMM - A Quasi-Bayesian Approach]]"
source_location: "§3.1 Linear IV Example: Effect of Institutions on GDP (pp. 12-14)"
date_ingested: 2026-06-27
folder: "Econometrics/Plausible GMM"
doc_type: paper
depends_on:
  - "[[Plausible Moment Restriction Model]]"
  - "[[Quasi-Bayes for Plausible Moment Restrictions]]"
  - "[[Gaussian Local Prior Approximation]]"
  - "[[Instrumental Variables]]"
used_by:
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
aliases:
  - Acemoglu Johnson Robinson PGMM
  - institutions and GDP plausible IV
---

# Plausible GMM - Institutions and GDP Application

> [!summary]
> An empirical illustration of [[Plausible GMM - Overview|Plausible GMM]] revisiting Acemoglu, Johnson & Robinson (2001) — the effect of institutions on GDP, estimated by linear IV using settler mortality as the instrument ($T = 64$ ex-colonies). The exclusion restriction is treated as *plausible but not exact*: an augmented model adds a latent misspecification term $C_t = (1, W_t, D_t^\top)\pi$, and a proper prior on $\pi$ (hence on $\mu$) encodes the belief that the GDP elasticity w.r.t. settler mortality is, with high probability, no larger than ~10%. The quasi-posterior for the institutions coefficient $\beta_X$ stays informative and is **relatively robust** to the prior over misspecification, growing only modestly more diffuse as the prior widens.

## Overview

This is the first of the paper's two empirical applications (the second — IV quantile regression of 401(k) participation, revisiting Chernozhukov & Hansen 2004 — is in the Supplemental Appendix and not in the main PDF). It shows how to specify priors over both $\theta$ and the plausibility characteristic $\mu$, and how to read prior-sensitivity of the resulting quasi-posterior.

## Main Content

### Model and data

- **Outcome** $Y_t$: log PPP-adjusted GDP per capita, 1995, for $t = 1, \dots, 64$ ex-European colonies.
- **Regressor of interest** $X_t$: a ten-point index of protection against expropriation risk — a proxy for **institutional quality**.
- **Control** $W_t$: normalized distance from the equator (geography).
- **Instruments** $D_t$: log settler mortality (the **Linear IV(1)** baseline, just-identified); **Linear IV(2)** adds the proportion of the population of European descent in 1900 (over-identified).

> [!definition] Linear IV model and moment condition ($\S$3.1)
> $$
> Y_t = \alpha + \beta_X X_t + \beta_W W_t + U_t,
> \qquad \theta = (\alpha, \beta_X, \beta_W)^\top,
> $$
> with moment function
> $$
> g(Z_t, \theta) = (1, W_t, D_t^\top)^\top\,(Y_t - \alpha - X_t\beta_X - W_t\beta_W),
> $$
> where $D_t$ is the vector of instruments. See [[Instrumental Variables]] for the classical (exact-exclusion) version.
> ^def-iv-model

### Prior on the structural parameter $\theta$

$$
\theta \sim \mathcal{N}\!\left(0, \operatorname{diag}(100, 4, 64)\right).
$$
The variance for $\beta_X$ is set by economic reasoning: $X_t$ ranges over a 10-point scale (empirical 25th/75th percentiles $5.6$ and $7.8$), and a coefficient $\beta_X \approx 0.5$ already implies that moving from the 25th to 75th percentile of institutions is associated with ~1 log unit (~170%) higher GDP — economically large. So a magnitude $|\beta_X| > 4$ is given low prior probability (sd $= 2$). The same logic sets the priors on $\alpha$ and $\beta_W$.

### Prior on misspecification $\mu$ (the plausibility characteristic)

> [!definition] Augmented "plausible" model ($\S$3.1)
> Allow the exclusion/exogeneity restrictions to fail via a latent term linear in the exogenous variables:
> $$
> Y_t = \alpha + \beta_X X_t + \beta_W W_t + C_t + U_t,
> \qquad C_t = (1, W_t, D_t^\top)\,\pi.
> $$
> For Linear IV(1), the moment equation becomes, for a given $\pi$,
> $$
> \mathbb{E}[g(Z_t, \theta)] = \mathbb{E}\!\left[(1, W_t, D_t^\top)^\top (1, W_t, D_t^\top)\right]\pi = \mu.
> $$
> A proper prior over $\pi$ encodes subjective beliefs about misspecification.
> ^def-augmented

**Calibrating the prior.** Center $\pi$ at $0$ (the arguments for exclusion/exogeneity are compelling enough to center beliefs at "no violation"). For the entry associated with the **excluded instrument** $D_t$ (log settler mortality, centuries before 1995), one reasonably believes the direct effect is small: with high probability the GDP elasticity w.r.t. settler mortality is no larger than 10% (that entry of $\pi$ no larger than $0.1$). This is encoded as a mean-zero Gaussian with **standard deviation $0.05$**.

> [!definition] Baseline prior PGMM-g ($\S$3.1)
> $$
> \mu \sim \mathcal{N}\!\left(0,\ \Sigma_T\,\Omega_d\,\Sigma_T^\top\right),
> \qquad
> \Sigma_T = T^{-1}\sum_{t=1}^{T}(1, W_t, D_t^\top)^\top(1, W_t, D_t^\top),
> \qquad
> \Omega_d = 0.05^2\, I_3.
> $$
> For **Linear IV(2)** (extra instrument = proportion European descent), assuming its direct impact is, w.h.p., no greater than 1% (semi-elasticity), extend with
> $$
> \Omega_d = \operatorname{diag}\!\left(0.05^2 I_3,\ 0.005^2\right),
> $$
> the final diagonal entry corresponding to the new instrument. The $1/T$-scaled $\Sigma_T$ realizes the [[Gaussian Local Prior Approximation|local Gaussian prior]] $\mathcal{N}(\mu_0, \Lambda/T)$ in data-scaled form.
> ^def-pgmm-g

### Sensitivity priors

| Label | Prior over $\mu$ | Purpose |
|-------|------------------|---------|
| **CH** | dogmatic $\mu \equiv 0$ ([[Asymptotics and Frequentist Connections\|Chernozhukov–Hong]]) | exact moments — benchmark |
| **PGMM-g** | $\mathcal{N}(0, \Sigma_T \Omega_d \Sigma_T^\top)$ | baseline plausible prior |
| **PGMM(d)-g** | $\mathcal{N}(0, c\,\Sigma_T \Omega_d \Sigma_T^\top)$, $c = 4$ | more **diffuse** Gaussian |
| **PGMM-u** | Uniform over the elliptical region $C = \{(\Sigma_T\Omega_d\Sigma_T^\top)^{1/2}c : c^\top c \le \chi^2_{0.68}(q)\}$ | uniform over the 68% HDR of the Gaussian prior |

### Results (Figure 1)

> [!example] Prior-sensitivity of the institutions coefficient $\beta_X$ ($\S$3.1, Fig. 1)
> **Upper panel (marginal quasi-posteriors for $\beta_X$, Linear IV(1)).**
> - In terms of $\beta_X$, the quasi-posteriors are **relatively robust** to the prior over $\mu$.
> - They become **somewhat more diffuse** as prior dispersion increases ($\mu \equiv 0 \to$ PGMM-g $\to$ PGMM(d)-g), but the changes are **small** despite the large increase in prior dispersion for $\mu$.
> - The benchmark Gaussian (PGMM-g) and the related uniform (PGMM-u) produce **very similar** quasi-posteriors — by design of the uniform prior.
> - The marginal prior for $\beta_X$ (dotted) is far more diffuse than any posterior — the data + moments are informative.
>
> **Lower panel (95% HPD interval for $\beta_X$ vs. prior scale $c$).**
> - The posterior **midpoint** is stable around $\approx 2.1$ across $c \in \{0, 1, 4, 4.2, 4.5, 5.1\}$, declining slightly to $\approx 1.8$ at the largest scale.
> - Interval **bounds widen modestly** as $c$ grows, and the intervals exclude $0$ throughout the displayed range — institutions retain a positive, economically meaningful association with GDP even under substantial relaxation of the exclusion restriction.
> ^ex-figure1
>
> Linear IV(2) (over-identified) shows similar patterns (Supplemental Appendix Fig. SA.1); posteriors for elements of $\mu$ roughly align with their priors (Fig. SA.2).

**Takeaway.** Allowing for plausible (not exact) instrument validity makes inference **less precise but more honest**, and here the qualitative conclusion of Acemoglu–Johnson–Robinson — institutions matter for GDP — survives. The approach thus enhances the *credibility* of the empirical result. This is the [[Gaussian Local Prior Approximation#^ex-no-free-lunch|"no free lunch"]] principle in action.

## Connections

- A concrete instance of the [[Plausible Moment Restriction Model#^ex-iv-plausible|plausible IV exclusion-restriction example]].
- Uses the [[Gaussian Local Prior Approximation|local Gaussian prior]] (data-scaled $\Sigma_T$) and the [[Quasi-Bayes for Plausible Moment Restrictions|quasi-posterior]] (simulated, plus the Gaussian approximation).
- Classical exact-IV baseline: [[Instrumental Variables]]; the dogmatic posterior benchmark is [[Asymptotics and Frequentist Connections|Chernozhukov–Hong (2003)]].

## See Also

- [[Plausible GMM - Overview]] — the framework and its guarantees
- [[Gaussian Local Prior Approximation]] — why posteriors widen with prior dispersion
- [[Sensitivity Analysis in Observational Studies]] — the frequentist analogue of varying $\mu$
