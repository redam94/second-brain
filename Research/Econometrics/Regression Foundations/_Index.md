---
title: "Index: Regression Foundations"
tags:
  - type/index
  - source/ingested
parent: "[[Econometrics/_Index|Econometrics]]"
date_updated: 2026-04-09
concept_count: 3
doc_type: index
folder: "Research/Econometrics/Regression Foundations"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Regression Foundations

> [!abstract] Routing Summary
> This folder covers regression mechanics and interpretation from MHE Chapter 3. Contains 3 notes.
> - Need the CEF and why regression approximates it? -> [[Regression and the CEF]]
> - Need when regression is causal (selection on observables)? -> [[Conditional Independence Assumption]]
> - Need the OVB formula and direction of bias? -> [[Omitted Variables Bias]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Regression as best linear approximation to CEF, Frisch-Waugh, robust SEs | [[Regression and the CEF]] | concept | [[The Selection Problem]], [[The Experimental Ideal]], [[Research Questions in Econometrics]] | Regression is the minimum MSE linear approximation to the CEF |
| CIA / selection on observables: when regression is causal | [[Conditional Independence Assumption]] | concept | [[Regression and the CEF]], [[The Selection Problem]], [[The Experimental Ideal]] | CIA + overlap -> regression estimates causal effects |
| OVB formula, direction of bias, schooling example | [[Omitted Variables Bias]] | concept | [[Regression and the CEF]], [[Conditional Independence Assumption]], [[The Selection Problem]] | OVB = (effect of omitted var) x (relationship to included var) |

## Notes
- [[Regression and the CEF]] — CONTAINS: Conditional expectation function, regression as CEF approximation, Frisch-Waugh theorem, robust standard errors, saturated models
- [[Conditional Independence Assumption]] — CONTAINS: CIA / selection on observables, overlap condition, propensity score, matching, when regression is causal
- [[Omitted Variables Bias]] — CONTAINS: OVB formula, short vs long regression, direction of bias, schooling returns example, bad controls

## Sources

- [[raw/Mostly Harmless Econometrics.pdf]] — Mostly Harmless Econometrics (Angrist & Pischke, 2008), Chapter 3

## See Also

- [[Bayesian Linear Regression]] — Bayesian perspective on the same regression concepts
- [[Spurious Association and Confounds]] — DAG-based approach to confounding (Statistical Rethinking)
