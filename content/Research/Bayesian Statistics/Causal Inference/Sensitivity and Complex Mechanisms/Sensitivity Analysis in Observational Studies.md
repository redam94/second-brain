---
title: Sensitivity Analysis in Observational Studies
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§6, pp. 12–14"
date_ingested: 2026-04-10
date_updated: 2026-07-06
folder: "Bayesian Statistics/Causal Inference/Sensitivity and Complex Mechanisms"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[General Structure of Bayesian CI]]"
used_by:
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
aliases:
  - E-value
  - Rosenbaum bounds
  - sensitivity analysis causal
---

# Sensitivity Analysis in Observational Studies

> [!summary]
> Unconfoundedness is untestable in observational studies. Sensitivity analysis assesses how robust causal conclusions are to unmeasured confounding. Two main parametrization classes: (1) distributions involving unmeasured confounders $U$, and (2) distributions of potential outcomes directly. The E-value (VanderWeele & Ding 2017) provides a model-free, easy-to-compute measure of robustness; copula-based methods provide a flexible Bayesian approach.

## Overview

**Unconfoundedness** (no unmeasured confounding, [[Potential Outcomes Framework#^def-ignorability]]) holds by design in randomized experiments but is fundamentally untestable in observational studies. Sensitivity analysis asks: *How would conclusions change if there is an unmeasured confounder?*

Two broad classes of sensitivity analysis methods differ in how they parametrize the confounding. Both can be used in a Bayesian framework.

## Parametrization via Unmeasured Confounders ($U$)

### Setup (Cornfield et al. 1959; Rosenbaum & Rubin 1983)

Let $U$ be an **unmeasured binary confounder** such that conditional on $(X, U)$, unconfoundedness holds: $Z \perp\!\!\!\perp \{Y(0), Y(1)\} \mid X, U$.

The joint distribution of all variables factorizes as:
$$
\Pr(Y(1), Y(0), Z, X, U) = \Pr(Y(1), Y(0) \mid X, U) \cdot \Pr(Z \mid X, U) \cdot \Pr(U \mid X) \cdot \Pr(X)
$$

Sensitivity parameters: the association between $U$ and treatment ($Z$), and between $U$ and outcome ($Y$). The observed-data distribution is identified; the sensitivity parameters are not.

### Cornfield Inequality

> [!theorem] Theorem: Cornfield Inequality
> If a hidden confounder $U$ could explain away the observed association between treatment $Z$ and outcome $Y$, the association between $U$ and $Z$, and between $U$ and $Y$, must both be *at least as large as* the observed association between $Z$ and $Y$.
^thm-cornfield

Originally motivated by the debate over whether smoking causes lung cancer — a hidden genetic factor would need an implausibly large association with both smoking and cancer to explain away the observed effect.

### Rosenbaum & Rubin (1983) Logistic Model

For a binary $Z$ and binary $U$ with binary $X$ (as a stratification variable):
- Logistic model for $\Pr(Z \mid X, U)$, logistic for $\Pr(Z \mid X)$, Bernoulli for $U$
- Sensitivity parameters: log-odds ratio for $U \to Z$ and $U \to Y$
- Treat as fixed (Frequentist) or as priors (Bayesian); compute $\tau^P$ over a plausible range

**Bayesian analogue** (Dorie et al. 2016): Straightforward — place priors on sensitivity parameters, use data augmentation to impute $U$, obtain posterior for $\tau^P$.

### E-Value (VanderWeele & Ding 2017)

> [!definition] Definition: E-Value
> The **E-value** is the minimum strength of association (on the risk ratio scale) that an unmeasured confounder $U$ would need to have with *both* the treatment $Z$ and outcome $Y$ — above and beyond measured covariates — to fully explain away the observed treatment-outcome association.
>
> Mathematically, define the sensitivity parameters as the treatment-confounder ($Z$) association and the outcome-confounder ($Y$) association. Based on Ding & VanderWeele (2016), the resulting threshold is the E-value.
^def-e-value

**Advantages**:
- Model-free — avoids specifying a model for the unmeasured confounder
- Simple to calculate from summary statistics
- Intuitive: a larger E-value means more robust conclusions
- Avoids the "repeating the analysis" requirement of other sensitivity methods

**Limitation**: The analysis must make additional (arguably stronger) assumptions than the original analysis to assess unmeasured confounding.

## Parametrization via Distributions of Potential Outcomes

### Motivation

An alternative parametrization, motivated by an alternative mathematical expression of unconfoundedness:
$$
\Pr(Y(z) \mid Z=1, X) = \Pr(Y(z) \mid Z=0, X), \quad z=0,1
$$

This says the distributions of potential outcomes in the two treatment arms are comparable (for the same $X$). Sensitivity analysis in this class models the **difference** between $\Pr(Y(z) \mid Z=1, X)$ and $\Pr(Y(z) \mid Z=0, X)$, rather than modeling an unobserved $U$.

### Copula-Based Sensitivity (Franks, D'Amour, Feller 2020)

> [!definition] Definition: Copula-Based Sensitivity Analysis
> Franks et al. (2020) used a **copula** to connect the two identifiable marginal distributions of outcomes:
> - $\Pr(Y(z) \mid Z=1, X)$ — identifiable from treated units
> - $\Pr(Y(z) \mid Z=0, X)$ — identifiable from control units
>
> The copula parameters are the **sensitivity parameters** — they parametrize the non-identifiable joint distribution. Bayesian inference places priors on the copula parameters.
^def-copula-sensitivity

- Separates identifiable from non-identifiable parameters clearly — transparent parametrization
- Bayesian framework naturally handles the non-identified copula parameters as sensitivity priors
- Connects to [[Copula Estimation]] vault note

### Rosenbaum's Sensitivity Parameter $\Gamma$

Rosenbaum's original framework uses $\Gamma$ as the sensitivity parameter: the ratio of the odds of treatment for two units with the same observed covariates but potentially different unmeasured factors.

- For a **sharp null** hypothesis of no treatment effect, repeat the Fisher randomization test with a matched sample to find the threshold $\Gamma^*$ at which the p-value crosses significance
- Larger $\Gamma^*$ implies more robust conclusions
- Grounded in Fisherian randomization inference; **no natural Bayesian analogue**

## Comparison of Methods

| Method | Parametrization | Bayesian-friendly? | Key feature |
|--------|----------------|-------------------|-------------|
| Cornfield/Rosenbaum & Rubin | Hidden binary $U$ | Yes (prior on $U$ parameters) | Directly models confounder |
| E-value | Treatment/outcome associations | Yes (Bayesian E-value) | Model-free; easy to report |
| Copula (Franks et al. 2020) | Potential outcome distributions | Yes (prior on copula params) | Transparent parametrization |
| Rosenbaum's $\Gamma$ | Odds ratio for treatment | Difficult | Fisher randomization basis |

## Identifiability and Transparent Parametrization

A key insight from §6: sensitivity analysis is a form of **transparent parametrization** — explicitly separating identified parameters (which the data inform) from non-identified parameters (sensitivity parameters, which require prior information or a range of values).

This connects to the broader theme of identifiability in Bayesian causal inference (see [[General Structure of Bayesian CI#^warn-prior-dogmatism]]): even non-identified parameters have posteriors in the Bayesian framework, making it especially important to be explicit about what the data can and cannot tell us.

## Connections

- [[General Structure of Bayesian CI]] — identifiability and transparent parametrization in Bayesian CI
- [[Potential Outcomes Framework]] — unconfoundedness assumption being tested
- [[Copula Estimation]] — vault note on copula methods used in the Franks et al. approach

## See Also
- [[Instrumental Variables and Principal Stratification]] — alternative approach when unconfoundedness is untenable
- [[Frequentist Causal Estimation]] — doubly-robust estimators whose bias sensitivity analysis quantifies
- [[Propensity Score Matching - Overview]] — PSM is the most common observational method; sensitivity analysis (E-value, Rosenbaum bounds) is routinely reported alongside PSM estimates
- [[Nonparametric Causal Inference]] — BART-based ATE/ATT estimation; sensitivity analysis quantifies robustness of these estimates to unmeasured confounding
- [[Honest DiD - Sensitivity to Parallel Trends Violations]] — both report a breakdown point
