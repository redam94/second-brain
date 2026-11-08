---
title: "Heath 2015 - Review of Expected Value of Information Methods - Overview"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/overview
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Whole paper, pp. 1-9 (arXiv:1507.02513v1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Decision Analysis]]"
  - "[[From Inference to Decision]]"
used_by:
  - "[[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]"
  - "[[Heath 2015 - Influenza Vaccine Case Study and Table 1]]"
  - "[[Value of Information Concept Note - EVPI, EVPPI and EVSI]]"
aliases:
  - Heath Manolopoulou Baio 2015
  - EVPPI computation review
---

# Heath 2015 - Review of Expected Value of Information Methods - Overview

> [!summary]
> Heath, Manolopoulou and Baio (2015, arXiv:1507.02513) review how to compute the **Expected Value of Partial Perfect Information (EVPPI)** from a probabilistic sensitivity analysis (PSA) sample. Four post-2007 methods (Strong-Oakley, Sadatsafavi et al., GAM regression, Gaussian-process regression) all agree with a 55-minute-per-parameter nested Monte Carlo benchmark, and the regression methods win because they are black-box, multi-parameter and cheap. Key takeaway: **EVPPI is a regression of simulated net benefit on the parameter of interest**, so it can be bought for the price of one PSA run.

## Overview

**Research question.** Value-of-information (VoI) analysis prices uncertainty in decision terms: how much would a decision maker gain, in expectation, by learning a parameter (or all parameters) exactly before choosing? The overall figure (EVPI) is easy; the useful, parameter-specific figure (EVPPI) is expensive because it needs a conditional expectation inside a maximum. The paper asks which approximation methods that avoid a nested simulation give accurate EVPPI.

**Contribution.** A formal EVPPI definition (Eq. 1), a systematic account of four recent estimation methods, and a 28-parameter influenza-vaccine case study (Table 1, Figs 1-2) in which all methods agree with the two-step Monte Carlo benchmark but differ in speed, input demands and applicability (single vs multiple parameters).

**Key results.**
- Single-parameter methods (Strong-Oakley; Sadatsafavi et al.) are sensitive to a tuning input (number of subsets $M$; number of decision changes) and are "largely superseded" by regression (Sec. 5).
- GAM regression is essentially free for one parameter but "mathematically unstable for larger subsets of parameters ($\geq 6$)".
- Gaussian-process regression is the only feasible option for larger parameter subsets with unknown interaction structure; cost grows as $N^3$ in the PSA sample size.
- Two-step MC took about 55 minutes for one parameter's EVPPI; GP regression took 2-4 seconds; GAM and single-parameter methods were negligible.

## Motivating PyMC examples

Worked examples from <https://redam94.github.io/pymc-challenges/examples.html> that use these ideas:
- **E87 - Pricing a model: should a charity buy a flight-level forecast?** Cost of a model (rate x gradients + memory + precision) is compared with the decision value it could add; EVPI is the ceiling on what any model or study can be worth. See [[Value of Information Concept Note - Pricing a Model with EVPI]].
- **E89 - Where should the next air monitors go?** Closed-form EVSI checked against brute force; see [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] and [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]].
- **E90 - Call it today or wait? Hospital thresholds, nowcasts and decision curves**: a threshold decision whose value is read off a decision curve; see [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]].

## Main Content

Estimators in the paper, in order of appearance:
1. Nested (two-step) Monte Carlo: [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]].
2. Strong-Oakley and Sadatsafavi et al. single-parameter methods: [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]].
3. Non-parametric regression (GAM, GP): [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]].

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, 1 Introduction | VoI motivation, EVPI vs EVPPI, uptake barriers (interpretation, computation) | [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]] |
| 2 Notation and basic concepts | Net benefit $nb_t=ke_t-c_t$, known-distribution net benefit, $\theta=(\phi,\psi)$, Eq. (1) | [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]] |
| 3 Intro, 3.1 Methods needing extra sampling or assumptions | Two-step MC, numerical integration, unit loss integral, linear-nuisance approximation (Madan et al.) | [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]] |
| 3.2, 3.2.1 Strong and Oakley | Sort-and-block algorithm, bias-controlled $M$ | [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]] |
| 3.2.2 Sadatsafavi et al. | Segmentation vector, cumulative-sum visual tool | [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]] |
| 3.3 Non-parametric regression | $NB_t(\theta^s)=g_t(\phi^s)+\varepsilon^s$, five-step algorithm, SAVI, BCEA | [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]] |
| 4.1 Case study - Vaccine | 28-parameter influenza model, $T=2$ options | [[Heath 2015 - Influenza Vaccine Case Study and Table 1]] |
| 4.2 Analysis | Tuning choices, MC settings, runtime | [[Heath 2015 - Influenza Vaccine Case Study and Table 1]] |
| 4.3 Results, Table 1, Figs 1-2 | EVPPI by parameter and method; EVPI/EVPPI vs willingness to pay; standard errors | [[Heath 2015 - Influenza Vaccine Case Study and Table 1]] |
| 5 Discussion | Supersession of single-parameter methods, GAM instability, GP $N^3$ cost | [[Heath 2015 - Discussion Limitations and Practical Guidance]] |
| References [1]-[33] | Bibliography | [[Heath 2015 - Discussion Limitations and Practical Guidance]] (key refs listed) |

## Examples

Toy end-to-end check (this vault, not in the paper): [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]] reproduces EVPI and EVPPI with a regression on 200,000 draws and matches the analytic values to three decimals.

## Connections

- Relevance to marketing measurement: EVPPI answers "which parameter of my MMM or lift model, if learned exactly, would most change the budget allocation?" which is the decision-theoretic version of a sensitivity analysis and tells you whether another geo experiment is worth running. It also bounds what a more expensive model can be worth (E87).
- Foundations: [[Decision Analysis]] and [[From Inference to Decision]] (BDA3 decision framing).
- Active-learning counterpart: [[Expected Information Gain]] values an experiment by information, EVPPI/EVSI by decision value.

## See Also

- [[Heath 2015 - Review of Expected Value of Information Methods/_Index|Index for this source]]
- [[Value of Information Concept Note - EVPI, EVPPI and EVSI]]
- [[Gaussian Process Regression]], [[Hilbert Space Gaussian Processes]] (the GP regression step is a standard GP fit)
