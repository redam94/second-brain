---
title: Conditional Independence Assumption
aliases:
  - CIA
  - Selection on Observables
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/identification
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Regression Foundations"
---

# Conditional Independence Assumption

> [!summary]
> The CIA states that, conditional on observed covariates $X_i$, potential outcomes are independent of treatment assignment. This is the key assumption that gives regression a causal interpretation — sometimes called "selection on observables."

## Formal Statement

For multi-valued treatment $s_i$ with potential outcomes $Y_{si} \equiv f_i(s)$:

$$Y_{si} \perp\!\!\!\perp S_i | X_i$$

This means that conditional on $X_i$, treatment is "as good as randomly assigned."

## From CIA to Causal Regression

Under the CIA with a linear constant-effects model $f_i(s) = \alpha + \rho s + \eta_i$:

1. Decompose $\eta_i = X_i'\gamma + v_i$ (the part explained by observables + remainder)
2. The CIA ensures $v_i$ is uncorrelated with $s_i$ conditional on $X_i$
3. This gives the causal regression: $Y_i = \alpha + \rho s_i + X_i'\gamma + v_i$

The coefficient $\rho$ has a causal interpretation as the average causal effect.

## When Does the CIA Hold?

- In **randomized experiments**, by design (possibly conditional on stratification variables)
- In **observational studies**, when you believe all confounders are observed and controlled for
- The big question: what are the right control variables $X_i$?

> [!warning] Bad Controls
> Not all controls are good. Variables that are themselves affected by treatment ("[[Omitted Variables Bias|bad controls]]") can introduce bias rather than remove it. Only include pre-treatment covariates or variables known to be unaffected by treatment.

## Related Concepts

| Concept | Relationship |
|---------|-------------|
| [[The Selection Problem\|Selection bias]] | What the CIA eliminates |
| [[Omitted Variables Bias\|OVB]] | What happens when CIA fails |
| [[Instrumental Variables\|IV]] | Alternative when CIA is implausible |
| Propensity score | Dimension-reducing tool under the CIA |

## See Also

- [[Regression and the CEF]]
- [[Omitted Variables Bias]]
- [[The Selection Problem]]
- [[Data Collection Models]] — Bayesian treatment of ignorability, the direct parallel to CIA
