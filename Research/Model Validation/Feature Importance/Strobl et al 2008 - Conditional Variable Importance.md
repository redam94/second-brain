---
title: "Strobl et al 2008 - Conditional Variable Importance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - type/definition
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "BMC Bioinformatics 9, 307 (2008); §2 Methods"
citation: "Strobl, C., Boulesteix, A.-L., Kneib, T., Augustin, T. & Zeileis, A. (2008). Conditional variable importance for random forests. BMC Bioinformatics, 9, 307."
date_ingested: 2026-10-13
folder: "Model Validation/Feature Importance"
doc_type: paper
depends_on:
  - "[[Strobl et al 2007 - Bias in Random Forest Variable Importance]]"
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures]]"
used_by:
  - "[[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]]"
  - "[[Fisher et al 2019 - Model Class Reliance]]"
  - "[[Dillon et al - SHAP Predictive Models and Causal Insights]]"
aliases:
  - "Strobl 2008"
  - "Conditional permutation importance"
  - "Conditional variable importance for random forests"
---

# Strobl et al 2008 - Conditional Variable Importance

> [!summary]
> Strobl and colleagues show that the standard (marginal) permutation importance of random forests **inflates the importance of predictors that are merely correlated with truly influential ones**, and propose a **conditional permutation importance** that permutes a variable only within strata of its correlated covariates. For model validation, it is the classic demonstration that a feature-importance ranking from a model trained on correlated drivers credits proxies.

## Overview

*Strobl, C., Boulesteix, A.-L., Kneib, T., Augustin, T. & Zeileis, A. (2008). BMC Bioinformatics 9, 307.*

Having fixed the scale/category bias in [[Strobl et al 2007 - Bias in Random Forest Variable Importance]], the authors turn to the more pervasive problem: correlated predictors. They ask what null hypothesis the usual permutation importance actually tests, and how to make it target the *partial* (conditional) contribution of a variable.

## Main Content

### Why marginal permutation importance credits correlated variables

Two mechanisms work together:

1. **Tree construction.** When building a tree, a correlated surrogate is nearly as good a split candidate as the true driver (see the Key Passage), so with random predictor subsets (`mtry`) the surrogate is frequently used in place of the driver and acquires real weight in the fitted forest.
2. **The permutation scheme.** Permuting $X_j$ marginally breaks its association with $Y$ *and* with all other predictors $Z$. The measured loss of accuracy therefore reflects departure from the joint null

$$H_0^{\text{marg}}:\ X_j \perp (Y, Z),$$

so a variable with no conditional effect but strong correlation with $Z$ can still produce a large importance.

> [!definition] Conditional permutation importance
> The target null hypothesis is conditional independence
> $$H_0^{\text{cond}}:\ X_j \perp Y \mid Z,$$
> where $Z$ are the covariates correlated with $X_j$. Within each tree, the permutation of $X_j$ is carried out **within the cells of a grid** formed by the cut-points of splits on $Z$ in that tree; this preserves the dependence between $X_j$ and $Z$ while breaking $X_j$'s residual link to $Y$. The importance is the mean OOB accuracy loss across trees under this restricted permutation.
^def-conditional-permutation-importance

The covariates to condition on are chosen among those whose association with $X_j$ exceeds a threshold (e.g. via a test-based criterion). The method is implemented as `varimp(..., conditional = TRUE)` for `cforest` objects in the R package `party`.

### Simulation evidence

In a linear-regression simulation with a block of strongly correlated predictors, one of which has **zero coefficient**, the marginal permutation importance assigns the zero-coefficient variable substantial importance because it is correlated with the influential ones; the conditional importance largely removes this artefact and better reflects the partial effects. The authors also show that the `mtry` setting changes how much importance spreads across correlated predictors, so the ranking depends on a tuning choice. An application to peptide-binding data illustrates that the conditional and marginal rankings can differ materially in practice.

### Interpretation

Neither measure is "wrong": they answer different questions. Marginal importance asks whether a variable carries *any* predictive information (alone or via its correlates); conditional importance asks whether it carries information *beyond* the covariates it is correlated with. Only the latter is a candidate for statements like "this driver matters given the others" — and even that remains a statement about association, not causation ([[Janzing et al 2020 - Feature Relevance Is a Causal Problem]]).

## Key Passages

> "a predictor variable that is per se only weakly or not at all associated with the response, but is highly correlated with another influential predictor variable, may appear equally well suited for splitting as the truly influential predictor variable." — Strobl et al. (2008), §2 Methods

## Implications for Model Validation

- When drivers are correlated (e.g. media channels flighted together, seasonal series, spend and reach measures), a marginal importance ranking will spread or shift credit to proxies; validate rankings with a conditional or refit-based method.
- State which null hypothesis an importance measure tests before using it to make claims.
- Sensitivity of rankings to `mtry`/column-subsampling is itself a red flag; report it.
- Conditioning removes proxy credit only for *observed* correlates; unobserved confounders still distort the picture ([[Dillon et al - SHAP Predictive Models and Causal Insights]]).

## Connections

- The marginal-versus-conditional distinction reappears for Shapley values as the interventional-versus-observational value function debate ([[Kumar et al 2020 - Problems with Shapley-Value Explanations]], [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]]).
- [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] gives a second reason marginal permutation misleads: it evaluates the model off the data manifold.
- Conditioning on correlates parallels adjustment for confounders in regression ([[Omitted Variables Bias]], [[Spurious Association and Confounds]]).

## See Also

- [[Strobl et al 2007 - Bias in Random Forest Variable Importance]] — predecessor on split-point bias
- [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] — extrapolation critique and "condition-and-relearn" alternatives
- [[Fisher et al 2019 - Model Class Reliance]] — importance range across near-optimal models
- [[Meinshausen and Buhlmann 2010 - Stability Selection]] — stability of selected sets under resampling
- [[Spurious Association and Confounds]] — the regression analogue of proxy credit
