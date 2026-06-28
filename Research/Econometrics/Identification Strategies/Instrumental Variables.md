---
title: Instrumental Variables
aliases:
  - IV
  - 2SLS
  - Two-Stage Least Squares
  - Wald Estimator
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
doc_type: concept
source_location: "MHE Ch. 4, pp. 83-163"
depends_on:
  - "[[Omitted Variables Bias]]"
  - "[[Regression and the CEF]]"
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[Local Average Treatment Effects]]"
  - "[[Regression Discontinuity Designs]]"
  - "[[Discrete Choice Models]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[GMM Estimation and Instruments for Price Endogeneity]]"
---

# Instrumental Variables

> [!summary]
> IV methods solve the omitted variables problem by using a variable (the instrument) that is correlated with the treatment but uncorrelated with other determinants of the outcome. The key implementation is Two-Stage Least Squares (2SLS).

## The IV Setup

When the causal model $Y_i = \alpha + \rho s_i + \eta_i$ suffers from $Cov(s_i, \eta_i) \neq 0$, an instrument $z_i$ satisfies:

1. **Relevance (first stage)**: $Cov(s_i, z_i) \neq 0$ — the instrument affects treatment
2. **Exclusion restriction**: $Cov(\eta_i, z_i) = 0$ — the instrument only affects outcomes *through* treatment

The IV estimand:
$$\rho = \frac{Cov(Y_i, z_i)}{Cov(s_i, z_i)} = \frac{\text{reduced form}}{\text{first stage}}$$

## Two-Stage Least Squares

**Stage 1**: Regress $s_i$ on $z_i$ and covariates $X_i$ → get fitted values $\hat{s}_i$

**Stage 2**: Regress $Y_i$ on $\hat{s}_i$ and $X_i$ → coefficient on $\hat{s}_i$ is the 2SLS estimate of $\rho$

> [!tip] Use Canned Software
> Don't literally run 2SLS in two steps — the standard errors will be wrong. Use built-in IV commands (e.g., `ivregress` in Stata).

## The Wald Estimator

With a binary instrument:
$$\rho = \frac{E[Y_i|z_i=1] - E[Y_i|z_i=0]}{E[s_i|z_i=1] - E[s_i|z_i=0]}$$

The reduced-form difference in means, rescaled by the first-stage difference.

## Key Examples

### Returns to schooling (Angrist & Krueger, 1991)
- **Instrument**: Quarter of birth (affects schooling through compulsory attendance laws)
- **First stage**: Q1 births → ~0.15 fewer years of schooling
- **Result**: 2SLS estimates of ~0.08-0.11 (slightly above OLS ~0.07)

### Vietnam-era military service (Angrist, 1990)
- **Instrument**: Draft lottery number (randomly assigned)
- **First stage**: Draft-eligible men 16pp more likely to serve
- **Result**: Military service reduced 1981 earnings by ~$2,700 (15% of mean)

### Effect of family size on labor supply (Angrist & Evans, 1998)
- **Instruments**: Twins at second birth; same-sex sibling composition
- Different instruments give different estimates → suggests [[Local Average Treatment Effects|heterogeneous effects]]

## Local Average Treatment Effects (LATE)

With heterogeneous effects, IV estimates the causal effect on **compliers** — those whose treatment status is changed by the instrument. This is a [[Local Average Treatment Effects|local]] rather than population-average effect.

## See Also

- [[Local Average Treatment Effects]]
- [[Omitted Variables Bias]]
- [[Regression Discontinuity Designs]] — fuzzy RD is IV
- [[Differences-in-Differences]] — the main competing strategy for panel settings where IV instruments are unavailable
- [[Instrumental Variables and Principal Stratification]] — extends IV via principal stratification for non-compliance and censoring
- [[Mostly Harmless Econometrics - Overview]]
- [[Hierarchical Models]] — Bayesian partial pooling as an alternative approach to treatment effect heterogeneity
- [[Data Collection Models]] — ignorability through instrumental design vs. conditioning on observables
- [[Activity Bias in Advertising]] — real-world case where CIA fails and IV is the appropriate remedy
- [[Bayesian Propensity Score Weighting]] — Bayesian selection-on-observables alternative; compare with IV when exclusion restriction is questionable
- [[Parameter Estimation in Market Response]] — 2SLS used for price endogeneity in marketing mix models
- [[GMM Estimation and Instruments for Price Endogeneity]] — IV/GMM for price endogeneity in demand estimation
