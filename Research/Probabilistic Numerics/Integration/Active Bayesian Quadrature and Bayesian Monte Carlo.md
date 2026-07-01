---
title: Active Bayesian Quadrature and Bayesian Monte Carlo
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 10, pp. 80-86; Ch. 12, pp. 107-118"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Integration"
doc_type: textbook
depends_on:
  - "[[Bayesian Quadrature]]"
  - "[[The Numerical Agent]]"
  - "[[Gaussian Process Regression]]"
  - "[[Convergence and Priors in Bayesian Quadrature]]"
used_by:
  - "[[Lessons from Integration]]"
aliases:
  - Bayesian Monte Carlo
  - WSABI
  - Active BQ
  - Warped Bayesian Quadrature
  - Uncertainty Sampling
  - Model Evidence Integration
---

# Active Bayesian Quadrature and Bayesian Monte Carlo

> [!summary]
> Because a *Gaussian* BQ model has a posterior variance that is independent of the observed values, its optimal design is fixed a priori and no genuine adaptivity is possible. Adaptive Bayesian quadrature schemes therefore adopt **non-Gaussian, warped models** — modelling the log-integrand (BBQ) or the square-root of the integrand (WSABI) — so that non-negative integrands (likelihoods, model evidence) are respected and evaluations can inform *where to look next*. These schemes use **uncertainty sampling** on the integrand variance to place nodes actively, turning the solver into a true learning agent; empirically WSABI beats Monte Carlo and annealed importance sampling in wall-clock time. Bayesian Monte Carlo (O'Hagan) is the ancestral GP-based integrator this all specialises.

## Overview

This note collects the *active* / *adaptive* branch of Bayesian quadrature and its relation to Bayesian Monte Carlo. The motivation is twofold. (1) **Non-negative integrands.** Many important integrals — probabilistic **model evidence** $p(\mathcal D)=\int p(\mathcal D\mid x)p(x)\,\mathrm dx$, marginal likelihoods, partition functions — have non-negative integrands, often spanning many orders of magnitude. A plain GP on $f$ ignores non-negativity and the large dynamic range. (2) **Genuine adaptivity.** From [[Bayesian Quadrature]], a Gaussian model's variance ignores $Y$, so node selection is open-loop; to let collected values steer future evaluations we must leave the Gaussian family. Both motivations lead to **warped** GP models. The agent then chooses evaluations to reduce uncertainty (see [[The Numerical Agent]]) — the posterior variance drives active node selection, the third pillar of the recurring PN thesis.

## Main Content

### Bayesian Monte Carlo (O'Hagan 1991)

**Bayesian Monte Carlo (BMC)** is the original GP-based integrator: put a GP prior on $f$, condition on evaluations, and report the induced Gaussian on $F=\int f\,\mathrm d\nu$ — exactly the construction of [[Bayesian Quadrature]] with $\nu$ a probability measure (so $F=\mathbb E_\nu[f]$). BMC replaces the Monte Carlo average with the BQ posterior mean $\ell_X^\top k_{XX}^{-1}Y$, retaining a calibrated error bar. It is the point of departure for all schemes below; "Bayesian quadrature" and "Bayesian Monte Carlo" are often used interchangeably for the non-adaptive GP integrator.

### Model evidence: the canonical non-negative integrand

> [!definition] Model evidence / marginal likelihood as a quadrature problem
> $$ \underbrace{p(\mathcal D)}_{F}=\int \underbrace{p(\mathcal D\mid x)}_{f(x)}\ \underbrace{p(x)\,\mathrm dx}_{\mathrm d\nu(x)}. \tag{10.11}$$
> The integrand $f(x)=p(\mathcal D\mid x)\ge0$ (a likelihood) is non-negative with large dynamic range; $\nu=p$ is the prior. Solving such integrals is a key step in Bayesian inference and, speculatively, toward AI.
> ^def-model-evidence

To date, *all* adaptive BQ schemes target this non-negative setting.

### Warped models for non-negativity

> [!definition] BBQ — doubly-Bayesian quadrature (Osborne et al. 2012)
> Model the **logarithm** of the integrand with a GP, (approximately) enforcing $f>0$ and accommodating the large dynamic range: $\log f\sim\mathcal{GP}$. Uses the *integral* variance (Eq. 10.4) as its loss — arguably the most desirable model (log-GP) with the most desirable loss (integral square-error). But it requires a first-order (linearised) approximation of $\exp$ and maintaining candidate points $x_c$; it is computationally demanding and expresses the dynamic-range prior only weakly.
> ^def-bbq

> [!definition] WSABI — warped sequential active Bayesian integration (Gunter et al. 2014)
> Model the **square-root** of the integrand (minus a constant $\alpha\in\mathbb R$) with a GP: given data $\mathcal D$,
> $$ f(x)=\alpha+\tfrac12\tilde f(x)^2, \qquad p(\tilde f\mid\mathcal D)=\mathcal{GP}(\tilde f;\tilde m,\tilde{\mathbb V}), $$
> with $\tilde m,\tilde{\mathbb V}$ the usual GP posterior mean/covariance. Squaring guarantees $f\ge\alpha$. A squared-GP has *smaller* dynamic range than an exponentiated GP (a step back from BBQ in expressiveness), but the required approximations are far cheaper. Two implementations of the square transform:
> - **Linearised (WSABI-L):**
> $$ m^{\mathcal L}(x)=\alpha+\tfrac12\tilde m(x)^2,\qquad \mathbb V^{\mathcal L}(x,x')=\tilde m(x)\tilde{\mathbb V}(x,x')\tilde m(x'). \tag{10.12}$$
> - **Moment-matched (WSABI-M):**
> $$ m^{\mathcal M}(x)=\alpha+\tfrac12\big(\tilde m(x)^2+\tilde{\mathbb V}(x,x)\big),\quad \mathbb V^{\mathcal M}(x,x')=\tfrac12\tilde{\mathbb V}(x,x')^2+\tilde m(x)\tilde{\mathbb V}(x,x')\tilde m(x'). \tag{10.13}$$
> In either case the resulting posterior over the integrand is again a GP, so the standard GP quadrature equations apply. A closely related scheme, **MMLT** (moment-matched log transformation, Chai & Garnett 2019), moment-matches the *exponential* transform, cheaper than BBQ.
> ^def-wsabi

### Uncertainty sampling: the active design rule

Both WSABI and MMLT use the **pointwise variance in the integrand** (not the integral) as loss, sampling where the function is most uncertain — **uncertainty sampling**:
$$ x_{i+1}=\arg\max_x \mathbb V(x,x), $$
with $\mathbb V(x,x)=\mathbb V^{\mathcal L}(x,x)$ (linearised) or $\mathbb V^{\mathcal M}(x,x)$ (moment-matched). Reducing pointwise variance should also reduce integral variance in the limit — but the link to the *ultimate* goal (integral square-error) is indirect.

> [!theorem] Weak adaptivity (Kanagawa & Hennig 2019)
> A general adaptive BQ scheme with sequential design $x_{i+1}=\arg\max_x a_i(x)$, where
> $$ a_i(x)=T\big(q^2(x)\,\tilde{\mathbb V}(x,x)\big)\,b_i(x), $$
> ($\tilde{\mathbb V}$ the GP posterior variance, $q$ a positive function e.g. the integration measure, $T$ the warping/transformation, $b_i$ an "adaptivity" function) is **weakly adaptive** — and hence consistent, subject to regularity — if $b_i$ is bounded away from $0$ and $\infty$. Moment-matched WSABI and MMLT satisfy this; linearised WSABI needs a minor modification. Weak adaptivity guarantees the scheme is not "too adaptive": it can be "stuck for a while, but not forever", giving a worst-case rate *approaching* that of non-adaptive BQ.
> ^thm-weak-adaptivity

Weak adaptivity plays a role analogous to *detailed balance* / *ergodicity* for MCMC: a weak consistency guarantee that licenses a "zoo" of empirically-evaluated adaptive schemes. Empirically, adaptive schemes usually *improve* on non-adaptive BQ (stronger than the theory guarantees).

### When uncertainty sampling helps — and when it is wasteful

> [!example] Pathological case for integrand-variance loss (Garnett's example)
> Let $F=\int_0^{2\pi}\sin(x+\phi)\,\mathrm dx$ where the phase $\phi$ is unknown. The pointwise integrand variance $\operatorname{var}(f(x))$ depends on $p(\phi)$ and is generally non-zero, so uncertainty sampling would take (possibly many) evaluations. But the *integral* is $F=0$ with certainty ($p(F)=\delta(F)$, $\operatorname{var}(F)=0$) regardless of $\phi$! Targeting integrand variance is thus wasteful here; targeting integral variance takes zero evaluations. In practice, however, uncertainty sampling gives algorithms that are substantially faster (in wall-clock time) than integral-variance schemes like BBQ.

### Speed: computation as investment

WSABI must maintain a full GP ($\mathcal O(N^3)$ in evaluations), manage GP hyperparameters, and solve a global optimisation problem to pick each node — substantial overhead versus Monte Carlo's near-free PRNG draws. Yet:

> [!example] WSABI beats Monte Carlo and AIS in wall-clock time
> On an 8-dimensional GP-regression marginal-likelihood benchmark (yacht hydrodynamics) and a 4-dimensional GP-classification citation-network task, WSABI reaches a given estimation error in *less wall-clock time* than Monte Carlo and even annealed importance sampling (AIS). The heavy per-iteration overhead does not prevent faster overall convergence: the computation spent on Bayesian inference is an **investment** that pays dividends in fewer, better-placed evaluations — a central lesson for [[Lessons from Integration]]. This speed is *because of*, not despite, the Bayesian modelling.

## Connections

- **Extends** the Gaussian [[Bayesian Quadrature]] to non-Gaussian warped models where the variance depends on data, enabling true adaptivity.
- **Instantiates** the agent view of [[The Numerical Agent]]: the posterior variance is a utility driving active evaluation.
- **BMC** is the non-adaptive GP integrator of [[Bayesian Quadrature]] applied to $F=\mathbb E_\nu[f]$.
- **Contrasts** integrand-variance (uncertainty sampling; WSABI/MMLT) vs integral-variance (BBQ) losses; connects to calibration in [[Convergence and Priors in Bayesian Quadrature]].
- **Supplies** the "computation as investment" and "randomness can be wasteful" lessons of [[Lessons from Integration]].

## See Also
- [[Bayesian Quadrature]] — the Gaussian base model these warp; why Gaussian BQ is open-loop.
- [[The Numerical Agent]] — the solver-as-agent framing of active node selection.
- [[Convergence and Priors in Bayesian Quadrature]] — consistency and rates for adaptive schemes.
- [[Lessons from Integration]] — WSABI as evidence that Bayesian overhead is an investment.
