---
title: "Li et al. 2022 - Bayesian Causal Inference: A Critical Review"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "Full paper"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[General Structure of Bayesian CI]]"
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Sensitivity Analysis in Observational Studies]]"
aliases:
  - Li Ding Mealli 2022
  - Bayesian CI Review 2022
---

# Bayesian Causal Inference: A Critical Review

> [!summary]
> Li, Ding, and Mealli (2022) provide a comprehensive critical review of the Bayesian perspective on causal inference within the potential outcomes framework. The paper identifies issues unique to Bayesian causal inference — including identifiability, the role of the propensity score, prior choice, and the design stage — and extends the discussion to instrumental variables and time-varying treatments.

## Overview

**Citation**: Li F, Ding P, Mealli F. 2023. Bayesian causal inference: a critical review. *Phil. Trans. R. Soc. A* **381**: 20220153. https://doi.org/10.1098/rsta.2022.0153

**Authors**:
- Fan Li (Duke University)
- Peng Ding (UC Berkeley)
- Fabrizia Mealli (University of Florence and EUI)

**Published**: Part of the theme issue *'Bayesian inference: challenges, perspectives, and prospects'*

**Keywords**: causal inference, design, ignorability, potential outcomes, propensity score

## Research Question and Contribution

The paper addresses: *What is the Bayesian approach to causal inference, and what are its unique strengths and challenges?*

Three Frequentist inferential approaches exist within the potential outcomes framework: Fisher randomization testing, Neymanian repeated-sampling evaluation, and Bayesian inference. This review focuses on the Bayesian approach, which has been underrepresented in the literature relative to Frequentist methods.

**Key contributions**:
1. Systematic review of Bayesian causal inference structure (factorization, prior independence, estimands)
2. Identifies *regularization-induced confounding* as a critical high-dimensional challenge
3. Reviews three strategies for incorporating the propensity score into Bayesian analysis
4. Covers sensitivity analysis to unmeasured confounding (E-value, copula methods)
5. Extends to complex mechanisms: IV/principal stratification and time-varying treatments
6. Articulates when Bayesian > Frequentist and cautions against "being Bayesian for its own sake"

## Paper Structure

| Section | Topic | Notes |
|---------|-------|-------|
| §2 | Estimands, identification, frequentist methods | [[Causal Estimands]], [[Potential Outcomes Framework]], [[Frequentist Causal Estimation]] |
| §3 | General Bayesian CI structure | [[General Structure of Bayesian CI]] |
| §4 | Model specification (outcome models, high-dim) | [[Bayesian Outcome Models]] |
| §5 | Propensity score role | [[Propensity Score in Bayesian CI]] |
| §6 | Sensitivity analysis | [[Sensitivity Analysis in Observational Studies]] |
| §7 | Complex mechanisms | [[Instrumental Variables and Principal Stratification]], [[Time-Varying Treatments and G-computation]] |
| §8 | Discussion/conclusions | (below) |

## Key Takeaways

> [!tip] Central message
> The Bayesian approach offers a unified inferential framework for any causal estimand via imputation of missing potential outcomes. However, **the design stage** (ensuring covariate overlap and balance) remains critical regardless of inferential mode — Bayesian analysis cannot substitute for good design.

**Strengths of Bayesian causal inference**:
1. Unified framework for any estimand — including complex ones like ITEs, principal strata effects
2. Automatic uncertainty quantification for any functional of the posterior
3. Natural incorporation of prior knowledge
4. Rich model library for complex data (spatial, temporal, functional, SUTVA violations)

**Weaknesses / open questions**:
1. Identifiability blurs in Bayesian paradigm — *all* parameters have posteriors even when non-identified
2. Prior independence assumption (Assumption 3.2) can act as strongly informative prior in high dimensions (*prior dogmatism*)
3. Propensity score role is contentious — drops from likelihood under ignorability, yet essential for overlap/balance
4. High-dimensional settings: open question on optimal design stage procedure
5. Computationally demanding relative to Frequentist alternatives

**Meta-level conclusion**: "Being Bayesian should be dictated by its practical utility in a specific context rather than an unconditional commitment to the Bayesian doctrine."

## Connections

- [[Potential Outcomes Framework]] — foundational setup reviewed in §2
- [[General Structure of Bayesian CI]] — core inference architecture (§3)
- [[Bayesian Inverse Probability Weighting|Bayesian Propensity Scores and IPW]] — existing vault note on Bayesian IPW (Heiss blog), extended here
- [[Nonparametric Causal Inference]] — existing vault note; BART and GP models discussed in §4
- [[Copula Estimation]] — copula-based sensitivity analysis in §6

## See Also
- [[Causal Estimands]] — formal definitions of ITE, SATE, CATE, PATE, MATE
- [[Propensity Score in Bayesian CI]] — three strategies for incorporating propensity scores
- [[Sensitivity Analysis in Observational Studies]] — E-value and copula parametrizations
