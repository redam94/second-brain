---
title: History Matching for ABMs
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/concept
  - doc/paper
source: "[[Research/Agent-Based Modeling/raw/calibration_ABM.pdf]]"
source_location: "Sections 2.14–2.16, 3.19, 4.11–4.12, pp. 4–5, 8"
date_ingested: 2026-04-11
folder: "Agent-Based Modeling/Calibration and Validation/Calibration Methods"
doc_type: paper
depends_on:
  - "[[HM-ABC Calibration Framework]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
used_by:
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[ABM Calibration Case Studies]]"
aliases:
  - HM calibration
  - History matching ABM
  - wave-based calibration
---

# History Matching for ABMs

> [!summary]
> History Matching (HM) is an iterative wave-based procedure that eliminates implausible parameter regions for an ABM. In each wave, parameter samples are scored by an implausibility metric combining model error with all quantified uncertainties. Implausible regions are discarded; the retained non-implausible space is sampled more densely in the next wave. HM stops when the non-implausible space stops shrinking.

## Overview

HM originated in climate and physical modeling (Craig et al. 1997) and has been adapted for ABMs. Unlike Bayesian calibration, HM makes no probabilistic statements about parameters — it only labels a region as *implausible* ("could not plausibly produce the observed data") or *non-implausible* ("could"). This binary output is then used as an informed prior for ABC.

## Implausibility Score

> [!definition] Definition: Implausibility Score
> For a parameter set $x$ and observation $z^r$, the implausibility is:
> $$
> I^r(x) = \frac{d^2(z^r, f^r(x))}{V^r_s + V^r_o + V^r_m}
> $$
> where:
> - $d^2(z^r, f^r(x))$ = squared error between simulation output and expected output
> - $V^r_s$ = ensemble variance (stochastic variability across runs with same parameters)
> - $V^r_o$ = observation uncertainty
> - $V^r_m$ = model discrepancy variance
>
> A parameter set $x$ is **implausible** if $I^r(x) \geq c$. By Pukelsheim's $3\sigma$ rule, $c = 3$ ensures the correct parameter set has $I^r(x) < 3$ with probability $\geq 0.95$.
^implausibility-score

## Wave Structure

Each HM wave:
1. **Sample** $N$ parameter sets from the current non-implausible space using Latin Hypercube Sampling (LHS)
2. **Run** the model $K$ times for each sample (ensemble) to estimate $V^r_s$
3. **Calculate** implausibility $I^r(x)$ for each sample
4. **Discard** implausible samples ($I^r(x) \geq c$); retain non-implausible samples
5. The retained non-implausible region becomes the sampling space for the next wave

**Stopping criteria**: when all parameters are implausible, or when the non-implausible area does not decrease further between waves.

## Model Discrepancy

> [!definition] Definition: Model Discrepancy Variance ($V^r_m$)
> $$
> V^r_m = \frac{1}{N-1}\sum_{n=1}^N \left(d(z^r, f^r(x_n)) - E^r(X)\right)^2
> $$
> where $E^r(X)$ is the average model error across all $N$ parameter sets tested. This estimates how much variation in model output arises from imperfect model specification — the gap between the best model and reality.
>
> **Key implication**: Model discrepancy cannot be reduced by better calibration — it reflects fundamental model imperfection and must be explicitly acknowledged.
^model-discrepancy

## Ensemble Variance

> [!definition] Definition: Ensemble Variance ($V^r_s$)
> $$
> V^r_s = \frac{1}{N}\sum_{n=1}^N\left[\frac{1}{K-1}\sum_{k=1}^K\left(d(z^r, f^r_k(x_n)) - E^r_K(x_n)\right)^2\right]
> $$
> where $K$ is the ensemble size and $E^r_K(x_n) = \frac{1}{K}\sum_{k=1}^K d(z^r, f^r_k(x_n))$.
>
> Choose $K$ by running models across a range of ensemble sizes and selecting the smallest $K$ at which variance stabilises. In the SugarScape example, $K = 200$; in the birds model, $K = 30$.
^ensemble-variance

## Multiple Outputs

When the model produces multiple observed outputs ($R > 1$, e.g., small/medium/large farm counts in RISC), a separate implausibility measure is computed for each output and the maximum is used:
$$
I(x) = \max_r I^r(x)
$$

## Key Differences from Other Methods

| Aspect | HM | ABC | GA / Simulated Annealing |
|--------|----|-----|--------------------------|
| Output | Non-implausible region | Posterior distribution | Point estimate |
| Probabilistic statements | No | Yes | No |
| Handles uncertainty explicitly | Yes | Implicitly via $\varepsilon$ | No |
| Computational cost (runs) | 80–320 (birds) | 11,000+ (birds, no HM) | 256–290 (birds) |

## SugarScape Example

In the SugarScape toy model (2 parameters: metabolism $\in [1,4]$, vision $\in [1,16]$):
- Wave 1: Full grid tested; substantial implausible region identified (dark grey in figure)
- Wave 10: Non-implausible region narrowed to upper-right corner (high metabolism, high vision)
- HM correctly identifies that the true parameters {metabolism=4, vision=6} lie in this region

## Connections
- The three uncertainty components $V^r_m$, $V^r_s$, $V_o$ are defined in [[Uncertainty Quantification for ABM Calibration]]
- HM output feeds directly into [[Approximate Bayesian Computation for ABMs]] as the uniform prior
- Extends [[ABM Calibration Overview]] beyond GA point estimation
- Latin Hypercube Sampling used for space-filling design; related to [[Experimental Design for ABMs]]

## See Also
- [[HM-ABC Calibration Framework]] — the combined pipeline
- [[Approximate Bayesian Computation for ABMs]] — the next step after HM
- [[ABM Calibration Case Studies]] — worked HM examples on three models
