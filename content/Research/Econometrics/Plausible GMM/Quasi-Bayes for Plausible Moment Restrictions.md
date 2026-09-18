---
title: "Quasi-Bayes for Plausible Moment Restrictions"
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
  - method/mcmc
source: "[[raw/Plausible GMM - A Quasi-Bayesian Approach]]"
source_location: "§2.2 Quasi-Bayes for Plausible Moment Restrictions (pp. 7-10)"
date_ingested: 2026-06-27
folder: "Econometrics/Plausible GMM"
doc_type: paper
depends_on:
  - "[[Plausible Moment Restriction Model]]"
  - "[[Method of Simulated Moments]]"
used_by:
  - "[[Gaussian Local Prior Approximation]]"
  - "[[Plausible GMM - Institutions and GDP Application]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
aliases:
  - quasi-Bayesian posterior
  - QBP
  - quasi-posterior
  - Laplace-type estimator
---

# Quasi-Bayes for Plausible Moment Restrictions

> [!summary]
> The inference engine of [[Plausible GMM - Overview|Plausible GMM]]. A continuous-updating GMM criterion $Q_T(\theta,\mu)$ is exponentiated and combined with the joint prior $\pi(\theta,\mu) = \pi(\theta\mid\mu)\pi(\mu)$ to form a **quasi-posterior** $p_T(\theta,\mu)$. Because it is built directly from the sample criterion and the prior, it remains well defined even when $(\theta,\mu)$ is not point-identified. Marginalizing gives $p_T(\theta)$ (the chief object of interest) and $p_T(\mu)$ (posterior beliefs about plausibility); minimizing quasi-posterior expected loss gives optimal decisions. The posterior generally requires MCMC.

## Overview

Given the [[Plausible Moment Restriction Model]] $m(\theta) = \mu$ with prior $\pi(\mu)$, we want to update beliefs about the structural parameter $\theta$. Because $(\theta,\mu)$ is partially identified, a *likelihood* is unavailable/awkward; instead we use a **quasi-Bayesian posterior (QBP)** — the Laplace-type estimator approach of [[Asymptotics and Frequentist Connections|Chernozhukov & Hong (2003)]] — which replaces the log-likelihood with a GMM criterion function.

## Main Content

> [!definition] Definition: Continuous-updating GMM criterion ($\S$2.2, Eq. 1)
> Let $\widehat{m}(\theta) := \tfrac{1}{T}\sum_{t=1}^{T} g(Z_t, \theta)$ be the empirical moment. The criterion for $(\theta,\mu)$ is
> $$
> Q_T(\theta, \mu) = -T\,\bigl(\widehat{m}(\theta) - \mu\bigr)^{\top}\,\widehat{\Omega}_T(\theta)^{-1}\,\bigl(\widehat{m}(\theta) - \mu\bigr),
> $$
> where $\widehat{\Omega}_T(\theta)$ is a positive-definite estimate of
> $$
> \Omega(\theta) = \lim_{T\to\infty}\operatorname{Var}\!\left(\sqrt{T}\,(\widehat{m}(\theta) - m(\theta))\right).
> $$
> Under i.i.d. $Z_t$ one may use the centered outer-product
> $$
> \widehat{\Omega}_T(\theta) = \frac{1}{T}\sum_{t=1}^{T}\bigl(g(Z_t,\theta) - \widehat{m}(\theta)\bigr)\bigl(g(Z_t,\theta) - \widehat{m}(\theta)\bigr)^{\top}.
> $$
> This is the **continuous-updating** GMM objective, now penalizing the distance between the empirical moment $\widehat m(\theta)$ and the plausibility characteristic $\mu$ (rather than from $0$).
> ^def-criterion

> [!definition] Definition: Quasi-posterior ($\S$2.2, Eq. 2)
> With joint prior $\pi(\theta,\mu) = \pi(\theta\mid\mu)\,\pi(\mu)$ and joint support $\Xi$, the **quasi-posterior** is
> $$
> p_T(\theta,\mu) = \frac{\exp\!\left(\tfrac{1}{2}Q_T(\theta,\mu)\right)\pi(\theta,\mu)}{\displaystyle\int_{\Xi}\exp\!\left(\tfrac{1}{2}Q_T(\theta,\mu)\right)\pi(\theta,\mu)\,d\mu\,d\theta}.
> $$
> Constructed from the sample criterion and prior alone, it is **well defined even when $(\theta,\mu)$ is not point-identified**. A flat prior on $\theta$, $\pi(\theta\mid\mu) \propto 1$, is common; the framework also allows economically motivated informative priors on $\theta$.
> ^def-quasi-posterior

> [!definition] Definition: Marginal quasi-posteriors ($\S$2.2)
> Integrate out the other parameter:
> $$
> p_T(\theta) = \int_{\mathcal{M}} p_T(\theta,\mu)\,d\mu,
> \qquad
> p_T(\mu) = \int_{\Theta} p_T(\theta,\mu)\,d\theta.
> $$
> $p_T(\theta)$ captures posterior information about the economically meaningful parameter (the **chief object of interest**). $p_T(\mu)$ summarizes posterior beliefs about the plausibility term — how much misspecification the data + prior suggest.
> ^def-marginals

> [!definition] Definition: Optimal quasi-Bayes decision ($\S$2.2, Eq. 3)
> For a loss $\ell(\theta,\mu,d)$ and decision $d \in \mathcal{D}$, the optimal decision minimizes quasi-posterior expected risk:
> $$
> s_T(p_T) \in \arg\min_{d \in \mathcal{D}} \int_{\Xi} \ell(\theta,\mu,d)\, p_T(\theta,\mu)\, d\mu\, d\theta.
> $$
> In most applications the loss depends only on $\theta$, but $\ell$ is allowed to depend on $\mu$ as well.
> ^def-decision

### Interpretation and computation

- **Approximate Bayesian interpretation.** The quasi-posterior and its summaries (optimal decisions, credible intervals) admit an approximate Bayesian interpretation. Florens & Simoni (2021) and Andrews & Mikusheva (2022) show that, under the *dogmatic* prior $\mu \equiv 0$, this object corresponds to a genuine posterior for $\theta$ as the prior becomes diffuse; augmenting the parameter space to include $\mu$ extends this.
- **Non-dogmatic prior matters.** With a non-degenerate prior over $\mu$, the optimal Bayes decision depends explicitly on **both** the prior for $\theta$ (as in Andrews–Mikusheva) **and** the prior for $\mu$.
- **Frequentist anchor.** Under correct specification ($m(\theta_*) \equiv 0$) and strong identification, Chernozhukov–Hong (2003) show inference from the quasi-posterior is asymptotically equivalent to **efficient GMM**; posterior means/credible intervals are usable as point estimators/confidence intervals even when $Q_T$ is hard to optimize directly. With a non-degenerate prior over $\mu$, credible intervals no longer deliver the *usual* frequentist coverage but retain an approximate Bayes interpretation (Moon & Schorfheide 2012; Gustafson 2015) and an *ex ante* two-stage coverage (see [[Plausible GMM - Overview]]).
- **Computation.** $p_T(\theta,\mu)$ is generally not analytic; it is approximated by **Markov Chain Monte Carlo** (Robert & Casella 2005) or other methods. A tractable Gaussian approximation under a local prior is given in [[Gaussian Local Prior Approximation]].

## Examples

See [[Plausible GMM - Institutions and GDP Application]], where this quasi-posterior is simulated under several priors over $\mu$ and compared to the dogmatic ($\mu \equiv 0$) Chernozhukov–Hong posterior.

## Connections

- The criterion $Q_T$ is the continuous-updating [[Method of Simulated Moments|GMM]] objective; the QBP is the [[Simulation-Based Estimation - Overview|simulation-based]] Laplace-Type Estimator (LTE) of Chernozhukov–Hong.
- Replaces a likelihood with a criterion function — same device as in [[Asymptotics and Frequentist Connections|quasi-Bayes asymptotics]].
- The shift from "$\widehat m(\theta)$ near $0$" to "$\widehat m(\theta)$ near $\mu$" is exactly the [[Plausible Moment Restriction Model|plausibility relaxation]].

## See Also

- [[Plausible Moment Restriction Model]] — the model $m(\theta)=\mu$ this conditions on
- [[Gaussian Local Prior Approximation]] — closed-form Gaussian approximation to $p_T(\theta)$
- [[Plausible GMM - Overview]] — concentration, decision, and coverage results that build on this
