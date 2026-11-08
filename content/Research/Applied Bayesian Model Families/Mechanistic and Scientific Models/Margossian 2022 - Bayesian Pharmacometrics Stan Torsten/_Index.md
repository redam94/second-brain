---
title: "Index: Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
tags:
  - type/index
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
parent: "[[../_Index|Mechanistic and Scientific Models]]"
date_updated: 2026-11-08
concept_count: 6
---

# Margossian 2022 - Bayesian Pharmacometrics Stan Torsten

> [!abstract] Routing Summary
> Full capture of Margossian, Zhang & Gillespie, *Flexible and efficient Bayesian pharmacometrics modeling using Stan and Torsten, Part I* (CPT:PSP 2022; arXiv 2109.10184): two-compartment PK, event schedules, Stan workflow and diagnostics, PPC and LOO, population model with allometric scaling, Friberg-Karlsson PK/PD with numerical and coupled ODE solvers. 6 notes.
> - Need the paper on one page or a section map? -> [[Margossian 2022 - Bayesian Pharmacometrics - Overview]]
> - Need the compartment ODE, event-schedule variables, likelihood and priors? -> [[Margossian 2022 - Compartment Models and Event Schedules]]
> - Need Stan blocks, $\hat R$, ESS or Table 2? -> [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]]
> - Need posterior predictive checks, PSIS-LOO or NPDE/PIT? -> [[Margossian 2022 - Posterior Predictive Checks and LOO]]
> - Need the hierarchical population model, allometric scaling or the flip-flop constraint? -> [[Margossian 2022 - Population Two-Compartment Model]]
> - Need the nonlinear PK/PD ODE, solver choice, coupled solvers, or the discussion? -> [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]]
> - Need dosing decisions from the posterior (PTA)? -> [[Population PK Dosing Decisions from the Posterior (Concept Note)]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Two-compartment oral model | [[Margossian 2022 - Compartment Models and Event Schedules]] | definition | linear ODE | $\hat c=u_{cent}/V_{cent}$, lognormal error |
| Event schedule (evid, addl, ii, ss) | [[Margossian 2022 - Compartment Models and Event Schedules]] | definition | NONMEM | doses and samples as rows |
| $\hat R$ and ESS | [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]] | definition | MCMC | $n_{eff}\approx100$ usually enough |
| Posterior predictive check | [[Margossian 2022 - Posterior Predictive Checks and LOO]] | algorithm | generated quantities | simulate $\tilde y$ from the posterior |
| PSIS-LOO | [[Margossian 2022 - Posterior Predictive Checks and LOO]] | definition | importance sampling | two-compartment beats one |
| Population model | [[Margossian 2022 - Population Two-Compartment Model]] | definition | hierarchical priors | $\vartheta_j\sim\text{logN}(\log\vartheta_{pop},\Omega)$ |
| Flip-flop constraint | [[Margossian 2022 - Population Two-Compartment Model]] | definition | identifiability | $k_{a}>\lambda_1$ |
| Friberg-Karlsson model | [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]] | definition | PK model | feedback $(\text{Circ}_0/y_{circ})^\gamma$, $E_{drug}=\min(\alpha\hat c,1)$ |
| Coupled solver | [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]] | definition | one-way coupling | analytic PK + numerical PD |

## Notes

- [[Margossian 2022 - Bayesian Pharmacometrics - Overview]] — CONTAINS: question, five builds, Source Map, motivating example E64, marketing analogy.
- [[Margossian 2022 - Compartment Models and Event Schedules]] — CONTAINS: ODE system, Table 1, likelihood and priors, matrix-exponential code with verified profile.
- [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]] — CONTAINS: HMC requirements, Stan blocks, $\hat R$/ESS, full Table 2 with interpretation.
- [[Margossian 2022 - Posterior Predictive Checks and LOO]] — CONTAINS: PPC algorithm, PSIS-LOO, one vs two compartments, NPDE/PIT remarks.
- [[Margossian 2022 - Population Two-Compartment Model]] — CONTAINS: population model, allometry, flip-flop, priors, PPC for new patients, noncentered PyMC sketch.
- [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]] — CONTAINS: FK equations, solving ODEs in Stan, coupled solvers, discussion, verified nadir simulation.

## Sources

Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten. Part II (divergences, prior predictive checks, solver tuning) is not covered.

## See Also

[[Hierarchical Models]], [[HMC and Stan in Practice]], [[Chen 2018 - Adjoint Sensitivity Method]].
