---
title: "Local Average Treatment Effects"
aliases:
  - LATE
  - Compliers
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/instrumental-variables
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Identification Strategies"
doc_type: theorem
source_location: "MHE Ch. 4, pp. 83-163"
depends_on:
  - "[[Instrumental Variables]]"
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Regression Discontinuity Designs]]"
  - "[[Quantile Regression]]"
---

# Local Average Treatment Effects

> [!summary]
> When treatment effects are heterogeneous, IV estimates the average causal effect on **compliers** — individuals whose treatment status is changed by the instrument. This is the LATE, introduced by Imbens and Angrist (1994).

## The Four Types

With binary instrument $z_i$ and binary treatment $D_i$:

| Type | $D_i$ when $z_i=0$ | $D_i$ when $z_i=1$ | Behavior |
|------|-------------------|-------------------|----------|
| **Compliers** | 0 | 1 | Follow the instrument |
| **Always-takers** | 1 | 1 | Always treated |
| **Never-takers** | 0 | 0 | Never treated |
| **Defiers** | 1 | 0 | Do the opposite |

## The LATE Theorem

Under **monotonicity** (no defiers) and **exclusion restriction**:

$$
\frac{E[Y_i|z_i=1] - E[Y_i|z_i=0]}{E[D_i|z_i=1] - E[D_i|z_i=0]} = E[Y_{1i} - Y_{0i} | \text{complier}]
$$

The Wald/IV estimand is the average treatment effect on compliers.

## Why LATE Matters

- Different instruments identify different complier populations → different LATEs
- Example: twins and sex-composition instruments for family size give different estimates because they affect different women
- **LATE ≠ ATE** in general — the policy-relevant parameter depends on context

## Characterizing Compliers

You can't identify individual compliers, but you can describe them statistically:
- Compliance rate: $P(\text{complier}) = E[D_i|z_i=1] - E[D_i|z_i=0]$
- Complier characteristics: compute $P(\text{complier}|X=x) / P(\text{complier})$ using Bayes' rule

## See Also

- [[Instrumental Variables]]
- [[Regression Discontinuity Designs]] — fuzzy RD estimates LATE at the cutoff
- [[Differences-in-Differences]] — parallel-trends DiD is also a complier-flavored estimand under heterogeneous effects
- [[The Selection Problem]] — LATE is fundamentally a solution to the selection problem for non-compliant units
- [[Mostly Harmless Econometrics - Overview]]
- [[Hierarchical Models]] — Bayesian partial pooling as an alternative framework for treatment effect heterogeneity
- [[Regression and the CEF]] — the CEF provides the population target that LATE identifies in the complier subpopulation
- [[Bayesian Difference in Differences]] — DiD treatment effects under heterogeneous compliance connect to the LATE framework
