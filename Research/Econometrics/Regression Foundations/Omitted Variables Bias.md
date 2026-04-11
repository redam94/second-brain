---
title: Omitted Variables Bias
aliases:
  - OVB
  - OVB Formula
tags:
  - source/ingested
  - topic/econometrics
  - topic/regression
  - topic/bias
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Regression Foundations"
doc_type: concept
source_location: "MHE Ch. 3, pp. 21-82"
depends_on:
  - "[[Regression and the CEF]]"
  - "[[Conditional Independence Assumption]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Instrumental Variables]]"
  - "[[Differences-in-Differences]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
---

# Omitted Variables Bias

> [!summary]
> The OVB formula describes the mechanical relationship between regression coefficients in models with different sets of control variables. It shows how omitting relevant variables biases the coefficients on included variables.

## The Formula

If the "long" (correct) regression is:
$$Y_i = \alpha^l + \rho^l s_i + A_i'\gamma^l + v_i^l$$

and the "short" (omitted variable) regression is:
$$Y_i = \alpha^s + \rho^s s_i + v_i^s$$

Then:
$$\rho^s = \rho^l + \gamma^l \cdot \delta_{As}$$

where $\delta_{As}$ is the coefficient from regressing the omitted variable $A_i$ on $s_i$.

## Interpreting the Bias

The bias has two components:
1. $\gamma^l$ — the effect of the omitted variable on the outcome
2. $\delta_{As}$ — the correlation between the omitted variable and the included regressor

| $\gamma^l$ | $\delta_{As}$ | Bias direction |
|-----------|-------------|----------------|
| Positive | Positive | Upward (overestimate) |
| Positive | Negative | Downward (underestimate) |
| Negative | Positive | Downward |
| Negative | Negative | Upward |

## Schooling Example

For returns to schooling where "ability" ($A_i$) is omitted:
- Ability likely has positive effect on wages ($\gamma > 0$)
- Ability is positively correlated with schooling ($\delta > 0$)
- Therefore OLS without ability controls likely **overestimates** the return to schooling

> [!note] The OVB Formula is Mechanical
> It describes the relationship between short and long regressions whether or not either has a causal interpretation. It applies to any pair of nested regression specifications.

## See Also

- [[Conditional Independence Assumption]]
- [[Regression and the CEF]]
- [[Instrumental Variables]]
- [[Bayesian Linear Regression]] — Bayesian shrinkage as regularization that partially mitigates OVB in high-dimensional settings
- [[The Experimental Ideal]] — randomization eliminates OVB by construction; the gold-standard contrast to observational confounding
- [[Research Questions in Econometrics]] — FAQ #3 (identification strategy) is directly aimed at the OVB threat
