---
title: "Plausible GMM - Overview"
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian-statistics
  - type/overview
  - doc/paper
source: "[[raw/Plausible GMM - A Quasi-Bayesian Approach]]"
source_location: "Abstract, §1 Introduction, §2 (pp. 1-11)"
date_ingested: 2026-06-27
folder: "Econometrics/Plausible GMM"
doc_type: paper
depends_on:
  - "[[Plausible Moment Restriction Model]]"
  - "[[Quasi-Bayes for Plausible Moment Restrictions]]"
  - "[[Gaussian Local Prior Approximation]]"
used_by:
  - "[[Plausible GMM - Institutions and GDP Application]]"
aliases:
  - PGMM
  - Plausible GMM
  - Quasi-Bayesian GMM
---

# Plausible GMM - Overview

> [!summary]
> Chernozhukov, Hansen, Kong & Wang (2026) extend the quasi-Bayesian posterior (QBP) framework of GMM to settings where moment conditions are **not assumed to hold exactly**. Instead of the dogmatic restriction $\mu_* \equiv 0$, a researcher places a proper prior $\pi(\mu)$ over the degree of misspecification $\mu_*$ (the "plausibility characteristic"), turning misspecification into a partial-identification problem driven by parameter over-parameterization. The resulting quasi-posterior stays informative under both global and local misspecification, and — under local Gaussian priors — is approximately Gaussian centered on a GMM estimator whose weighting matrix endogenously trades off moment precision against plausibility. The central lesson is "no free lunch": relaxing the exact-moment assumption necessarily yields wider, less precise inference.

## Overview

Structural estimation in economics is built on **moment conditions** — IV exclusion restrictions, unconfoundedness, parallel trends, Euler equations — argued from institutional knowledge and economic reasoning. Classical [[Instrumental Variables|GMM/IV]] estimation proceeds *as if* these restrictions hold exactly. But it is rarely possible to be confident they do, and estimates built on exactly-true moments can be substantially distorted when the moments are even slightly wrong.

This paper formalizes the idea that moment restrictions are **plausible but not certain**. A researcher encodes subjective beliefs about possible violations via a proper prior over a misspecification vector $\mu_*$, then performs quasi-Bayesian inference on the structural parameter $\theta_*$. See [[Plausible Moment Restriction Model]] for the formal setup and [[Quasi-Bayes for Plausible Moment Restrictions]] for the inferential machinery.

## Main Content

### Research question

How can a researcher perform credible inference on a structural parameter $\theta_*$ defined by moment conditions, while **explicitly allowing** the moment conditions to be only approximately valid, and while encoding subjective economic beliefs about the size of the violation?

### Key contributions

1. **Plausible GMM (PGMM) framework** — extends quasi-Bayesian posteriors (QBPs) to a non-dogmatic prior over $\mu_*$. The structural model becomes $m(\theta) = \mu$, with $\mu$ governed by prior $\pi(\mu)$. Because $\theta_*$ and $\mu_*$ are **not jointly identified**, the prior has a non-negligible effect even asymptotically — this is a genuine partial-identification regime. See [[Plausible Moment Restriction Model]].

2. **Quasi-posterior concentration / new Bernstein–von Mises results** — the quasi-posterior converges to a **mixture of Gaussians** whose weights and components depend heavily on $\pi(\mu)$. With a dogmatic prior $\mu \equiv \mu_*$ this reduces to the classical [[Asymptotics and Frequentist Connections|Chernozhukov–Hong (2003)]] result (collapse to a Gaussian centered at $\theta(\mu_*)$ with efficient-GMM variance). (Formal statements live in §4 / Supplemental Appendix; see [[Gaussian Local Prior Approximation]] for the tractable special case.)

3. **Approximately optimal Bayesian decisions** — quasi-Bayes decision rules approximate Bayes-optimal rules under the maintained prior over misspecification (extending Andrews & Mikusheva 2022 to the non-dogmatic case).

4. **Frequentist coverage** — Bayesian credible regions from the quasi-posterior have correct frequentist coverage under a **two-stage sampling thought experiment** (nature first draws $\mu_* \sim \pi(\mu)$, then data is generated with $m(\theta(\mu_*)) = \mu_*$); equivalently, an *ex ante* coverage guarantee. A union-of-confidence-intervals construction $\cup_{\mu_* \in C} CI(\mu_*, \alpha)$ delivers uniform coverage when $\mu_0$ is a fixed unknown in a known set $C$.

5. **Endogenous robust weighting** — under Gaussian priors with variance $\propto 1/T$, QBPs are centered on a GMM estimator whose weighting matrix trades off moment precision against misspecification, *emerging from the quasi-posterior itself* rather than being imposed via a minimax criterion. This connects to Armstrong & Kolesár (2021): in the Gaussian limit experiment the Bayes credible interval under a two-point least-favorable prior coincides with their robust confidence interval. See [[Gaussian Local Prior Approximation]].

### Relation to the literature

| Strand | Relation |
|--------|----------|
| Quasi-Bayes / LTE ([[Asymptotics and Frequentist Connections\|Chernozhukov–Hong 2003]], Kim 2002, Gallant 2016, Florens–Simoni 2021, Andrews–Mikusheva 2022) | PGMM **extends** QBPs from the dogmatic $\mu_*\equiv 0$ case to a non-dogmatic prior over $\mu_*$. |
| Local-misspecification / sensitivity (Armstrong & Kolesár 2021; Bonhomme & Weidner 2022; Andrews, Roth & Pakes 2024) | Armstrong–Kolesár fix $m(\theta_*) = C_T = c/\sqrt T$ and do minimax-robust inference. PGMM obtains an analogous trade-off from a **quasi-Bayesian** perspective via a prior on $\mu_*$. |
| Bayesian partial identification (Chib, Shin & Simoni 2018; Gustafson 2015; Andrews, Marmer & Yu 2024) | PGMM allows **all** elements of $\mu_*$ to be free (no pseudo-true value), so posteriors need not concentrate on a unique point. |
| Frequentist-coverage-for-identified-sets (Chen, Christensen & Tamer 2018; Conley, Hansen & Rossi 2012) | PGMM imposes a *prior* on $\mu_*$ rather than profiling it out, which changes the asymptotics. |

## Examples

See [[Plausible GMM - Institutions and GDP Application]] — a revisit of Acemoglu, Johnson & Robinson (2001) on institutions and GDP using linear IV, demonstrating that inference on the institutions coefficient $\beta_X$ is relatively robust to the prior over misspecification while honestly reflecting added uncertainty. (A second application to [[Local Average Treatment Effects|IV quantile regression]] of 401(k) participation, revisiting Chernozhukov & Hansen 2004, is in the Supplemental Appendix — see [[#Gaps]].)

## Connections

- Generalizes the **dogmatic** GMM/QBP setup (moment conditions exact, $\mu_* \equiv 0$) to a **plausible** one (proper prior over violations).
- Sits between frequentist **sensitivity analysis** ([[Sensitivity Analysis in Observational Studies]]) and **Bayesian partial identification** — it is subjective-Bayesian in motivation but delivers a notion of frequentist coverage.
- The criterion function is the continuous-updating [[Method of Simulated Moments|GMM]] objective; the quasi-posterior is the [[Simulation-Based Estimation - Overview|simulation/MCMC]]-based Laplace-type estimator of Chernozhukov–Hong.

## See Also

- [[Plausible Moment Restriction Model]] — the formal setup and the IV running example
- [[Quasi-Bayes for Plausible Moment Restrictions]] — criterion function, quasi-posterior, decisions
- [[Gaussian Local Prior Approximation]] — the tractable Gaussian-prior special case (Eq. 5)
- [[Plausible GMM - Institutions and GDP Application]] — empirical illustration
- [[Asymptotics and Frequentist Connections]] — Bernstein–von Mises background

## Gaps

The downloaded arXiv PDF (v2, 14 pp.) contains only the main body through the start of §3.1. **Not captured from primary source** (described only via the introduction): the formal §4 results (the Bernstein–von Mises concentration theorems, the precise decision-theoretic and coverage statements, the increasing-$(k,q)$ asymptotics), and the **second empirical application** (Chernozhukov–Hansen 2004 IV quantile regression of 401(k) participation on assets). These live in the Supplemental Appendix ("SA") and Online Materials ("OM"). Ingest those to complete the theorem-level coverage.
