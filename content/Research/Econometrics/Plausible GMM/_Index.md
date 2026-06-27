---
title: "Index: Plausible GMM"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-06-27
concept_count: 5
---

# Plausible GMM

> [!abstract] Routing Summary
> Quasi-Bayesian inference for structural / moment-condition models when the moment restrictions are **plausible but not exact** (Chernozhukov, Hansen, Kong & Wang 2026). A proper prior $\pi(\mu)$ is placed on the degree of misspecification $\mu_*$, turning misspecification into a partial-identification problem. Contains 5 notes.
> - New here / want the big picture? → [[Plausible GMM - Overview]]
> - The model $m(\theta)=\mu$ and the IV motivation? → [[Plausible Moment Restriction Model]]
> - The criterion function & quasi-posterior (Eqs. 1–3)? → [[Quasi-Bayes for Plausible Moment Restrictions]]
> - Closed-form Gaussian approximation & "no free lunch" (Eq. 5)? → [[Gaussian Local Prior Approximation]]
> - Worked empirical example (institutions → GDP)? → [[Plausible GMM - Institutions and GDP Application]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Plausibility characteristic $\mu_*$; dogmatic vs. plausible prior | [[Plausible Moment Restriction Model]] | definition | [[Instrumental Variables]] | $m(\theta_*)=\mu_*$; classical GMM is the dogmatic $\mu_*\equiv 0$ case |
| Plausible IV exclusion restriction | [[Plausible Moment Restriction Model]] | example | — | $\mathbb{E}[D_t(Y_t-\theta X_t)]=\mu\sim\mathcal{N}(0,\sigma^2)$ |
| CU-GMM criterion $Q_T$; quasi-posterior $p_T$ | [[Quasi-Bayes for Plausible Moment Restrictions]] | concept | [[Method of Simulated Moments]] | $p_T\propto \exp(\tfrac12 Q_T)\pi$; well defined without point ID |
| Local Gaussian prior $\mu\sim\mathcal{N}(\mu_0,\Lambda/T)$ | [[Gaussian Local Prior Approximation]] | theorem | [[Quasi-Bayes for Plausible Moment Restrictions]] | $\theta\approx\mathcal{N}(\widehat\theta,V/T)$, $V=(G^\top \widehat A_{T,\theta}G)^{-1}$ |
| Plausibility-adjusted weighting / no free lunch | [[Gaussian Local Prior Approximation]] | theorem | — | $A_\theta\ne\Omega^{-1}$; $V\ge$ efficient-GMM var; $\to$ efficient GMM as $\Lambda\to 0$ |
| Institutions → GDP plausible IV | [[Plausible GMM - Institutions and GDP Application]] | example | [[Instrumental Variables]] | Posterior for $\beta_X$ robust to prior over $\mu$; excludes 0 |

## Notes

- [[Plausible GMM - Overview]] — CONTAINS: research question, 5 contributions (PGMM framework, BvM concentration, optimal decisions, ex-ante frequentist coverage, endogenous robust weighting), literature map, gaps.
- [[Plausible Moment Restriction Model]] — CONTAINS: Def. moment function & target $m(\theta_*)=\mu_*$; Def. dogmatic vs. plausible prior; Def. roots & support assumption; Example: plausible IV exclusion restriction.
- [[Quasi-Bayes for Plausible Moment Restrictions]] — CONTAINS: Def. CU-GMM criterion $Q_T$ (Eq. 1); Def. quasi-posterior $p_T$ (Eq. 2); Def. marginals; Def. optimal quasi-Bayes decision (Eq. 3); MCMC note.
- [[Gaussian Local Prior Approximation]] — CONTAINS: Def. local Gaussian prior (Eq. 4); Def. plausibility-adjusted weighting $\widehat A_{T,\theta}$; Result: Gaussian quasi-posterior approximation (Eq. 5); three features (center, inflated variance, sampling dist.); "no free lunch".
- [[Plausible GMM - Institutions and GDP Application]] — CONTAINS: linear IV model & moments; prior on $\theta$; augmented misspecification model $C_t=(1,W_t,D_t^\top)\pi$; PGMM-g / PGMM(d)-g / PGMM-u / CH priors; Figure 1 prior-sensitivity of $\beta_X$.

## Sources
- [[raw/Plausible GMM - A Quasi-Bayesian Approach]] — Chernozhukov, Hansen, Kong & Wang (2026), arXiv:2507.00555 (econ.EM). Main body §1–§3.1 only; §4 theorems + 401(k) application are in the unincluded Supplemental Appendix.

## See Also
- [[Instrumental Variables]] — classical exact-exclusion IV (the relaxed case here)
- [[Method of Simulated Moments]] / [[Simulation-Based Estimation - Overview]] — GMM family
- [[Asymptotics and Frequentist Connections]] — Bernstein–von Mises / quasi-Bayes background
- [[Sensitivity Analysis in Observational Studies]] — frequentist analogue of a prior over $\mu$
