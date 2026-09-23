---
title: Propensity Score in Bayesian Causal Inference
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§5, pp. 10–13"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: paper
depends_on:
  - "[[General Structure of Bayesian CI]]"
  - "[[Bayesian Outcome Models]]"
  - "[[Frequentist Causal Estimation]]"
used_by:
  - "[[Sensitivity Analysis in Observational Studies]]"
aliases:
  - Bayesian propensity score
  - propensity score Bayesian
---

# Propensity Score in Bayesian Causal Inference

> [!summary]
> The propensity score $e(x) = \Pr(Z=1 \mid X=x)$ is central to Frequentist causal inference for ensuring balance, but under ignorability it drops from the Bayesian likelihood. Despite this, incorporating the propensity score into Bayesian analysis is essential for robust inference, particularly in observational studies with limited overlap. Three strategies exist: (1) include as a covariate in the outcome model, (2) use dependent priors linking assignment and outcome models, (3) posterior predictive p-values.

## The Central Tension

A major debate in Bayesian causal inference concerns the role of the propensity score. The tension:

- **Likelihood argument**: Under ignorability (Assumptions 2.1 and 3.2), the propensity score model $\Pr(Z_i \mid X_i; \theta_Z)$ drops from the likelihood. The Bayesian posterior for causal estimands depends *only on the outcome model*. In this view, the propensity score seems irrelevant.

- **Practical argument**: The propensity score is ubiquitous in Frequentist causal inference for constructing IPW, matching, and doubly-robust estimators — all of which ensure **overlap and balance**, reducing sensitivity to the outcome model.

**Resolution** (Li et al.): Even though the propensity score is ignorable in the likelihood sense, **the design stage** (ensuring covariate overlap and balance) is critical regardless of inferential mode. Three strategies exist for incorporating the propensity score into Bayesian inference.

## Strategy 1: Propensity Score as Covariate in Outcome Model

The propensity score was first proposed by Zigler (2016) as the *only* covariate in a Bayesian outcome model: $\mu(Y \mid e(X)) = \Pr(Y(z) \mid e(X))$.

The more common approach: include $\hat{e}(X)$ as an **additional covariate** in the outcome model alongside $X$:
$$\mu(z, x, e(x))$$
This effectively conducts outcome regression on propensity score strata.

**Bayesian double robustness** (Wang et al. 2012; Saarela et al. 2016):
- When the outcome model is **correct**: $\mu(z, X_i, e(X_i))$ reduces to $\mu(z, X_i)$ because $e(X_i)$ is a function of $X_i$ — so the propensity score is redundant
- When the outcome model is **misspecified**: the results are robust because the treatment and control groups are approximately balanced in covariate propensity score strata

**Implementation** (BCF, Hahn et al. 2020):
For the Bayesian Causal Forest, the propensity score enters the prognostic function $g_1(\cdot)$ — adding estimated $\hat{e}(X)$ as an input significantly improves empirical CATE estimation (see [[Bayesian Outcome Models#^def-bcf]]).

**Key subtlety**: The propensity score enters the outcome model as a **two-stage procedure**:
1. Estimate $\hat{e}(X)$ from data
2. Plug $\hat{e}(X)$ into the Bayesian outcome model $\mu(z, x, \hat{e}(x))$

This is **not dogmatically Bayesian** (it doesn't propagate uncertainty from the first stage), but provides more robust posterior inference to model misspecification. The joint modeling approach (estimating $e$ and $\mu$ simultaneously) has a **feedback problem**: the outcome model fit informs propensity score estimation, distorting its balancing property and biasing causal estimates.

## Strategy 2: Dependent Priors

Rather than modifying the likelihood, one imposes **dependent priors** that link the assignment and outcome models while keeping them mathematically separate.

**Example 1** (Antonelli et al. 2019): Simultaneous variable selection for propensity score and outcome models.
- Logistic propensity score model: $\text{logit}\Pr(Z_i=1 \mid X_i) = \alpha'X_i$
- Linear outcome model: $Y_i \mid Z_i, X_i \sim \mathcal{N}(Z_i\beta^T + \beta^T X_i, \sigma^2)$
- **Spike-and-slab priors** on $\alpha_j$ and $\beta_j$ with dependence hyperparameter $\omega \in [1, \infty)$
- $\omega$ controls the strength of prior dependence: larger $\omega$ implies stronger prior that a variable selected in the outcome model is also selected in the propensity score model
- Advantage: jointly selects variables relevant to either treatment or outcome, ensuring important confounders are included

**Example 2** (Zigler & Dominici 2014):
- $Y_i(1) \mid X_i \sim \mathcal{N}(\mu_1, \sigma_1^2(e(X_i)))$ and $Y_i(0) \mid X_i \sim \mathcal{N}(\mu_0, \sigma_0^2(1-e(X_i)))$, with flat priors on $\mu_1$ and $\mu_0$
- The **posterior mean of the PATE** $\approx$ the Hájek IPW estimator:
$$\hat{\tau}^{\text{Hájek}} = \frac{\sum_i Z_i Y_i / e(X_i)}{\sum_i Z_i / e(X_i)} - \frac{\sum_i (1-Z_i)Y_i / (1-e(X_i))}{\sum_i (1-Z_i) / (1-e(X_i))}$$
when propensity scores are known. This provides a Bayesian justification for the Hájek IPW estimator.

Dependent priors achieve desirable finite-sample results and are more reasonable in real-world studies. However, specification is case-dependent and there is no general solution.

## Strategy 3: Posterior Predictive P-values

A not-dogmatically-Bayesian strategy: specify both a propensity score model $e(X_i; \theta_Z)$ and an outcome model $\mu(X_i; \theta_Y)$, obtain posterior draws from their respective predictive distributions, and plug the posterior draws into the **doubly-robust estimator** $\hat{\tau}^{\text{DR}}$ (see [[Frequentist Causal Estimation#^def-dr]]).

This gives a **posterior predictive distribution of $\hat{\tau}^{\text{DR}}$** (Ding & Liu 2016).

- Provides a straightforward way to integrate Bayesian modeling with Frequentist procedures (doubly-robust estimation)
- Enables **proper uncertainty quantification**
- Simulation studies show advantages over the Frequentist p-value (Ding & Liu 2016 §76)

**Joint modeling alternative**: Draw posterior inference simultaneously for $\theta_Z$ and $\theta_Y$ — but the feedback problem (outcome model informs propensity score estimation) violates unconfoundedness assumption and biases causal estimates. The suggested remedy: fit a Bayesian model for $\epsilon = Y - \hat{\mu}(X)$ first, then plug in (§11 of paper).

## Summary Table

| Strategy | Approach | Key advantage | Limitation |
|----------|----------|---------------|-----------|
| Covariate in outcome model | $\mu(z,x,\hat{e}(x))$ | Double robustness; practical | Two-stage; not fully Bayesian |
| Dependent priors | Joint prior on $(\theta_Z, \theta_Y)$ | Proper uncertainty propagation; finite-sample gains | Case-dependent; no general recipe |
| Posterior predictive | Plug draws into $\hat{\tau}^{\text{DR}}$ | Integrates Bayesian + Frequentist | Not dogmatically Bayesian |

## Connections

- [[General Structure of Bayesian CI]] — why propensity score drops from likelihood under ignorability
- [[Bayesian Outcome Models]] — outcome models that the propensity score enters
- [[Frequentist Causal Estimation]] — Hájek IPW and doubly-robust estimators
- [[Bayesian Propensity Score Weighting]] — Bayesian IPW via Liao-Zigler two-stage method (Heiss blog)

## See Also
- [[Sensitivity Analysis in Observational Studies]] — sensitivity analysis when unconfoundedness fails
- [[Bayesian Outcome Models#^warn-reg-confounding]] — regularization-induced confounding in high dimensions
