---
title: "Mostly Harmless Econometrics: An Empiricist's Companion"
aliases:
  - MHE
  - Angrist and Pischke
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - type/book-overview
  - type/overview
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
authors:
  - Joshua D. Angrist
  - Jörn-Steffen Pischke
year: 2008
publisher: Princeton University Press
doc_type: overview
source_location: "MHE pp. 3-243 (full book)"
depends_on:
  - "[[Regression and the CEF]]"
  - "[[Instrumental Variables]]"
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Research Questions in Econometrics]]"
  - "[[The Experimental Ideal]]"
  - "[[Standard Errors and Clustering]]"
  - "[[Quantile Regression]]"
---

# Mostly Harmless Econometrics

> [!summary]
> A practical guide to the core methods of applied econometrics, focused on causal inference. The book covers regression, instrumental variables, differences-in-differences, regression discontinuity, quantile regression, and inference issues — emphasizing conceptual robustness over model-dependent assumptions.

## Core Toolkit

The authors identify three essential tools for applied econometricians:

1. **[[Regression and the CEF|Regression]]** — designed to control for variables that may mask causal effects
2. **[[Instrumental Variables|Instrumental variables]]** — for analyzing real and natural experiments
3. **[[Differences-in-Differences|Differences-in-differences]]** — using repeated observations to control for unobserved omitted factors

## Four Research FAQs

Every empirical project should answer these questions:

1. *What is the causal relationship of interest?*
2. *What experiment could ideally capture this causal effect?*
3. *What is your identification strategy?*
4. *What is your mode of statistical inference?*

## Structure

| Part | Chapters | Topics |
|------|----------|--------|
| I — Introduction | Ch 1-2 | [[Research Questions in Econometrics\|Questions about Questions]], [[The Experimental Ideal]] |
| II — The Core | Ch 3-5 | [[Regression and the CEF\|Regression]], [[Instrumental Variables\|IV]], [[Differences-in-Differences\|DD & Panel Data]] |
| III — Extensions | Ch 6-8 | [[Regression Discontinuity Designs\|RD]], [[Quantile Regression]], [[Standard Errors and Clustering\|Standard Errors]] |

## Key Principles

- The **[[Regression and the CEF|CEF]]** is the central object; regression approximates it
- Estimators in common use have simple, robust interpretations that are **not heavily model-dependent**
- If the estimates you get are not what you want, the fault lies in the econometrician, not the econometrics
- The book emphasizes **finite-sample inference** issues rather than asymptotic efficiency

## See Also

- [[The Selection Problem]] — the fundamental challenge of causal inference
- [[Conditional Independence Assumption]] — the key assumption for causal regression
- [[Omitted Variables Bias]] — what goes wrong without proper controls
- [[BDA3 - Overview]] — Bayesian counterpart covering inference, regression, and model-based causal analysis
- [[Bayesian Workflow - Overview]] — iterative Bayesian approach to the same empirical questions
