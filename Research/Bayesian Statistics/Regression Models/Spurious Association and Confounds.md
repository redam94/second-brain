---
title: "Spurious Association and Confounds"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - topic/confounding
  - topic/regression
  - type/concept
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-06-15
folder: "Bayesian Statistics/Regression Models"
aliases:
  - "Waffle House divorce"
  - "Multivariate regression"
  - "Post-treatment bias"
  - "Masked relationship"
doc_type: concept
source_location: "Statistical Rethinking Ch. 5"
depends_on:
  - "[[Linear Models in Statistical Rethinking]]"
  - "[[Bayesian Linear Regression]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Moderation Analysis]]"
  - "[[Counterfactual Inference]]"
  - "[[Missing Data - Statistical Rethinking]]"
  - "[[Confirmatory Factor Analysis and SEM]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Statistical Rethinking - Overview]]"
---

# Spurious Association and Confounds

> [!summary]
> Chapter 5 of Statistical Rethinking covers multivariate regression — using multiple predictors to distinguish genuine causal effects from spurious correlations. Three key phenomena: spurious association (confounds make unrelated variables appear correlated), masked relationships (confounds hide real effects), and post-treatment bias (controlling for consequences of treatment).

## The Waffle House Example

Waffle House density correlates with divorce rate across U.S. states. But this is **spurious** — both variables correlate with being a Southern state. Multiple regression reveals that once you control for median age at marriage, the Waffle House association vanishes.

## Three Reasons for Multiple Regression

1. **Control for confounds** — reveal that an association is spurious, or unmask a hidden one
2. **Multiple causation** — estimate independent contributions of multiple causes
3. **Interactions** — the importance of one variable may depend on another

## Spurious Association

When a confound $C$ causes both predictor $X$ and outcome $Y$, a bivariate regression of $Y$ on $X$ will show a "significant" effect that disappears when $C$ is included.

## Masked Relationships

When two predictors have opposing effects and are correlated, each can mask the other's true effect. Only by including both predictors do the true effects emerge.

## When Adding Variables Hurts

### Post-treatment bias

> [!warning] Never Control for Post-Treatment Variables
> If treatment → mediator → outcome, controlling for the mediator blocks the treatment's indirect effect. Example: soil treatment → fungus reduction → plant growth. Controlling for fungus makes treatment appear ineffective.

This connects directly to the econometric concept of [[Conditional Independence Assumption|bad controls]] — variables affected by treatment should not be included as controls.

### Multicollinearity

When two predictors are highly correlated, their individual effects become unidentifiable — the posterior for each is wide even though they jointly predict well.

## Categorical Variables

- **Binary**: use a single dummy variable ($k-1$ dummies for $k$ categories)
- **Index variable**: assign each category an integer index and estimate a vector of intercepts — more natural for multilevel models
- **Contrasts**: compute posterior distributions of *differences* between categories from samples

> [!tip] Don't Compare Marginal Significance
> Even if $\beta_f$ is "significant" and $\beta_m$ is not, the *difference* $\beta_f - \beta_m$ may not be significant. Always compute the contrast directly.

## See Also

- [[Conditional Independence Assumption]] — the econometric parallel to controlling for confounds
- [[Omitted Variables Bias]] — what happens when you *don't* control for confounds
- [[The Selection Problem]] — the fundamental challenge these methods address
- [[Moderation Analysis]] — Ch 6 of Statistical Rethinking, the natural next step: when interaction terms are needed alongside confound control
- [[Counterfactual Inference]] — explicit counterfactual framing of what it means for a regression to "control for" a variable
- [[Linear Models in Statistical Rethinking]] — Ch 4, the single-predictor foundation
- [[Bayesian Linear Regression]] — BDA3's formal treatment
- [[Statistical Rethinking - Overview]]
- [[Data Collection Models]] — ignorability is the formal condition under which controlling for confounds gives a causal interpretation
- [[Directed Acyclic Graphs]] — DAG framework for identifying forks, pipes, and colliders that this chapter reasons about informally
- [[Regression and the CEF]] — MHE's econometric treatment of multivariate regression as CEF approximation, the frequentist parallel to Statistical Rethinking's confound analysis
