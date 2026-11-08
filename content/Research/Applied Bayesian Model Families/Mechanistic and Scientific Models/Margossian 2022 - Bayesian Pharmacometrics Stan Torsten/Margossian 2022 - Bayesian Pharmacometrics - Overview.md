---
title: "Margossian 2022 - Bayesian Pharmacometrics - Overview"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/overview
  - doc/paper
source: "[[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Whole paper, Sec. 1-5, 35 pp."
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Margossian 2022 - Compartment Models and Event Schedules]]"
  - "[[Population PK Dosing Decisions from the Posterior (Concept Note)]]"
aliases:
  - Stan and Torsten tutorial overview
  - Bayesian pharmacometrics tutorial Part I
---

# Margossian 2022 - Bayesian Pharmacometrics - Overview

> [!summary]
> Margossian, Zhang & Gillespie (CPT: Pharmacometrics & Systems Pharmacology, 2022; arXiv 2109.10184, "Part I") is a worked tutorial on a full Bayesian workflow for pharmacokinetic/pharmacodynamic (PK/PD) models: a two-compartment oral-dose model, a hierarchical **population** model with allometric scaling, and a nonlinear Friberg-Karlsson PK/PD ODE system, in Stan with the Torsten extension. Takeaway: ODE likelihoods + hierarchical priors + posterior predictive checks + PSIS-LOO form a complete, reusable recipe.

## Overview

**Problem.** Pharmacometric models are ODE systems driven by a *clinical event schedule* (doses, infusions, measurements). Mixed-effects (population) structure pools patients. Existing tools (NONMEM, Monolix, nlmixr) are specialized; the authors argue Stan's flexibility (non-normal random effects, custom priors, multiple submodels) and diagnostics are valuable, and Torsten supplies event-schedule handling, analytic PK solvers and group parallelization.

**What the paper builds.**
1. A single-patient linear two-compartment model with first-order absorption, lognormal residuals, 1200 mg q12h x 14 doses (simulated) ([[Margossian 2022 - Compartment Models and Event Schedules]]).
2. The Stan program structure and the inference checks: $\hat R$, bulk/tail ESS, trace plots ([[Margossian 2022 - Stan Workflow and MCMC Diagnostics]]).
3. Posterior predictive checks and leave-one-out comparison of one vs two compartments ([[Margossian 2022 - Posterior Predictive Checks and LOO]]).
4. A hierarchical population model with allometric weight scaling and a flip-flop identifiability constraint ([[Margossian 2022 - Population Two-Compartment Model]]).
5. A nonlinear PK/PD model (Friberg-Karlsson myelosuppression) solved with numerical ODE solvers, plus Torsten's coupled solver ([[Margossian 2022 - Nonlinear PKPD and ODE Solvers]]).

## Source Map

| Paper section | Covered in |
|---|---|
| 1 Introduction (why Stan, Torsten; NONMEM comparison) | this note; [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]] (Sec. 5 discussion) |
| Bayesian inference notation and workflow; setting up Stan/Torsten | [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]] |
| 2.1-2.2 Two-compartment model, event schedule (Table 1), statistical model and priors | [[Margossian 2022 - Compartment Models and Event Schedules]] |
| 2.3-2.4 Stan program blocks, calling from R | [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]] |
| 2.5 Checking inference ($\hat R$, ESS; Table 2; Fig. 1) | [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]] |
| 2.6-2.7 Posterior predictive checks, LOO (Figs. 2-4) | [[Margossian 2022 - Posterior Predictive Checks and LOO]] |
| 3 Population model (Figs. 5-6), NPDE/PIT remarks | [[Margossian 2022 - Population Two-Compartment Model]] |
| 4 Nonlinear PK/PD (Friberg-Karlsson, Figs. 7-8), ODE solving, coupled solvers | [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]] |
| 5 Current/potential role, Part II preview | [[Margossian 2022 - Nonlinear PKPD and ODE Solvers]] |

## Motivating PyMC examples

Listed at https://redam94.github.io/pymc-challenges/examples.html :
- **E64 - Population pharmacokinetics: hierarchical compartment models and dosing decisions** (theophylline, 12 subjects; warfarin PK/PD, 32 subjects): one-compartment oral model in closed form, hierarchical priors, dosing decisions from the posterior. See also [[Population PK Dosing Decisions from the Posterior (Concept Note)]].
- **E54** (patch-clamp conductance model) and **E50-E61** (reaction-diffusion, signaling) use the same pattern: mechanistic ODE/PDE as the likelihood mean plus a measurement model; see [[Likelihoods Built on Differential Equations (Concept Note)]].

> [!note] Source substitution
> The brief suggested this paper as the open popPK/NLME source (alternative: Gelman, Bois & Jiang 1996, JASA, not freely available). The classic Gelman-Bois-Jiang population PK paper is cited in the concept note but was not ingested.

## Relevance to marketing measurement

Structurally this is a Bayesian hierarchical nonlinear model with latent dynamics driven by an intervention schedule: doses are 'spend events', compartments are carry-over stocks, clearance is decay. The pharmacometric practice of (i) putting hierarchical priors on log-scale mechanistic rates, (ii) checking with PPCs on new hypothetical subjects, and (iii) PSIS-LOO model comparison transfers to adstock/saturation MMMs with geo-level partial pooling; see [[Hierarchical Models]] and [[Bayesian Estimation and Priors for MMM]]. This is an analogy, not a claim from the paper.

## Connections

[[HMC and Stan in Practice]], [[Prior Predictive Checking]], [[Posterior Predictive Checking]], [[Overfitting and Information Criteria]], [[Chen 2018 - Adjoint Sensitivity Method]] (sensitivities for the ODE gradients), [[Linear-Gaussian State-Space Models]].

## See Also

[[Chen 2018 - Neural ODEs - Overview]], [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]].
