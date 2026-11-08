---
title: "Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Sec. 3 intro and 3.1, pp. 3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]"
used_by:
  - "[[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]]"
  - "[[Heath 2015 - Influenza Vaccine Case Study and Table 1]]"
aliases:
  - Two-step Monte Carlo EVPPI
  - Unit loss integral approximation
---

# Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations

> [!summary]
> Before 2013 the EVPPI could be computed by (i) a two-step nested Monte Carlo, (ii) numerical integration, or two fast methods that need restrictions: (iii) the unit loss integral (normal $\phi$) and (iv) a linear-in-nuisance approximation. The paper's case study uses nested MC as the "true value" benchmark (55 minutes for one parameter).

## Overview

Section 3 opens with the observation that EVPPI is rarely available analytically because $NB_t(\theta)$ is a complicated function and "it is generally challenging to calculate analytically the expectation of a maximum". The earlier review the paper builds on (its reference [13]) gave four methods; Sec. 3.1 summarises them in one page, then Sec. 3.2-3.3 present the new ones.

## Main Content

> [!definition] Two-step (nested) Monte Carlo EVPPI
> Draw $S_{\text{outer}}$ values $\phi^s$. For each, draw $S_{\text{inner}}$ values $\psi\mid\phi^s$ and average $NB_t(\phi^s,\psi)$ to estimate $\mathbb{E}_{\psi\mid\phi^s}[NB_t]$. Then
> $$\widehat{\text{EVPPI}}=\frac1{S_{\text{outer}}}\sum_s\max_t\widehat{\mathbb{E}}_{\psi\mid\phi^s}[NB_t]-\max_t\widehat{\mathbb{E}}_\theta[NB_t].$$
> Brennan et al. (2007) formalised this. It needs a conditional sampler for $\psi\mid\phi$ (in a Bayesian model, another MCMC run per outer draw) and is biased upward at finite inner size because $\max$ of noisy means exceeds the mean of the max.
^def-two-step-mc

The paper's judgement: "Although theoretically Monte Carlo simulation can give any desired accuracy, the number of nested simulations necessary ... would generally require an infeasibly long computation time".

> [!definition] Numerical-integration variant
> Replaces the inner simulation by quadrature to reduce nested samples; "does not offer a significant computational saving" and is "impractical for high-dimensional subsets of $\phi$".
^def-numint

> [!definition] Unit loss integral approximation
> Assumes $\phi$ is approximately normal, so that for two options the expected loss is analytic, using the normal unit-loss integral. For a normal incremental net benefit the loss integral has a closed form, shown in the Examples below (this vault's illustration; the paper does not write it out).
^def-unit-loss

> [!definition] Linear-nuisance approximation (Oakley/Madan et al.)
> If $NB_t$ is linear in $\psi$ and $\psi$ is independent of $\phi$ then $\mathbb{E}_{\psi\mid\phi}[NB_t]$ can be read from existing PSA samples with no extra simulation. It "deteriorates if the independence assumption is not valid". Madan et al. relax it by re-parameterising: if $NB_t$ is non-linear in $\psi$ but $\psi\perp\phi$, set $\psi'=f(\psi)$ so that $NB_t$ is linear in $\psi'$.
^def-linear-nuisance

## Examples

**Unit-loss closed form check.** With $NB_1\sim N(0.3,0.25)$ from $\phi$ alone, $\text{EVPPI}=0.5\,\varphi(0.6)+0.3\,\Phi(0.6)-0.3\approx0.0843$, matching the regression estimate $0.0845$ in the sibling note.

## Connections

- All four methods in this note "rely on additional information about the model" (extra sampling or structure); the methods in [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]] and [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]] reuse only the PSA sample.
- Marketing: a nested MC for an MMM would mean refitting a Bayesian model per outer draw, which is why regression-on-draws is the practical route.

## See Also
- [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
