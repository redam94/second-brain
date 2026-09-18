---
title: "Bayesian Inverse Probability Weighting"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - topic/econometrics
  - type/concept
  - method/brms
  - method/stan
  - method/r
  - doc/tutorial
source: "[[raw/How to use Bayesian propensity scores and inverse probability weights]]"
source_location: "Full post — Andrew Heiss blog (2021-12-18)"
date_ingested: 2026-04-11
date_updated: 2026-09-18
folder: "Bayesian Statistics/Advanced Models"
doc_type: tutorial
depends_on:
  - "[[Nonparametric Causal Inference]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[DAGs and Causal Identification]]"
  - "[[The Selection Problem]]"
  - "[[Hierarchical Models]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Propensity Score Matching - Overview]]"
  - "[[Li et al 2022 - Overview]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Differences-in-Differences]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
aliases:
  - Bayesian IPW
  - Bayesian propensity scores
  - Bayesian Propensity Score Weighting
  - IPTW Bayesian
  - inverse probability treatment weights
  - Liao-Zigler method
---

# Bayesian Inverse Probability Weighting

> [!summary]
> Propensity scores and inverse probability treatment weights (IPTW) cannot be naively inserted into a Bayesian model because weights are not part of the data-generating likelihood. The Liao-Zigler (2020) method resolves this by treating propensity scores as a parameter $\nu$: draw $K$ samples of propensity scores from the posterior of a Bayesian treatment model, compute weights for each draw, run the outcome model $K$ times, and combine the results with Rubin's rules. This propagates treatment-model uncertainty into the ATE estimate.

## Overview

**The problem**: We want to use both Bayesian inference (posterior distributions, no null hypotheses) and inverse probability weighting (to close DAG backdoor paths). Inverse probability weighting (IPW) adjusts for confounding by creating pseudo-populations where treated and untreated groups have similar covariate distributions. When combined with Bayesian inference, however, a fundamental incompatibility arises: **weights are not a parameter in any Bayesian likelihood**.

**The solution** (Liao & Zigler 2020): Marginalize over the posterior distribution of propensity scores.

This note documents the frequentist IPW workflow, the conceptual problem with Bayesian weights, and the Liao & Zigler solution with a full R/brms implementation.

> [!example] Mosquito Nets and Malaria Risk
> **Setup**: 1,752 individuals; binary treatment (mosquito net use); outcome (malaria risk 0–100). Confounders identified by DAG: income, health, temperature.
> **True effect (simulated)**: −10 malaria risk points.
> **Results** (derived in the sections below):
> - Frequentist IPTW: ATE = −10.1 ± 0.66 SE
> - Bayesian Liao-Zigler: ATE = −10.1 ± 1.02 SE (wider, correctly incorporating treatment model uncertainty)
^ex-nets

## Standard Frequentist IPW Workflow

> [!definition] Inverse Probability of Treatment Weights (IPTW)
> For a binary treatment $T \in \{0, 1\}$ with propensity score $e(X) = P(T=1 \mid X)$, estimated as $\hat{e}(X)$:
> $$
> \text{IPTW}_i = \frac{T_i}{\hat{e}(X_i)} + \frac{1 - T_i}{1 - \hat{e}(X_i)}
> $$
>
> Using these weights in an outcome model creates **pseudo-populations**: treated and control groups with matched covariate distributions across the confounders $X$, as if randomized.
^def-iptw

The frequentist workflow consists of four steps:

1. **Treatment model** (design stage): Fit logistic regression `net ~ confounders` to get $\hat{e}(X_i)$.
2. **Propensity scores**: $\hat{e}_i$ = predicted probability of treatment.
3. **Weights**: Compute IPTW from $\hat{e}_i$.
4. **Outcome model** (analysis stage): Fit weighted regression `outcome ~ treatment` with IPTW weights; the coefficient on treatment is the ATE.

> [!example] Frequentist IPW: Mosquito Net and Malaria Risk
> **Setup**: Observational data on mosquito net use ($T$) and malaria risk ($Y$, 0-100). Confounders: income, health, temperature. True ATE = −10 (nets reduce malaria risk by 10 points).
>
> ```r
> library(tidyverse); library(brms); library(broom)
>
> # Step 1: Treatment model — predict net use from confounders
> model_treatment_freq <- glm(net ~ income + temperature + health,
>                             data = nets, family = binomial(link = "logit"))
>
> # Steps 2-3: Propensity scores → IPTW
> nets_with_weights <- augment(model_treatment_freq, nets,
>                              type.predict = "response") %>%
>   rename(propensity = .fitted) %>%
>   mutate(iptw = (net_num / propensity) + ((1 - net_num) / (1 - propensity)))
>
> # Step 4: Outcome model weighted by IPTW
> model_outcome_freq <- lm(malaria_risk ~ net,
>                          data = nets_with_weights, weights = iptw)
> tidy(model_outcome_freq)
> # netTRUE: estimate = -10.1 ✓
> ```
>
> The IPTW successfully recovers the −10 ATE by creating pseudo-populations of comparable treated and untreated individuals.
^ex-freq-ipw

### What IPTW is Doing: Pseudo-Populations

The weights rescale the sample to make treated and untreated groups comparable. Visualizing the weighted propensity score distributions shows that IPTW makes the two groups look alike:
- **Treated, low propensity** → high weight (surprising to be treated)
- **Untreated, high propensity** → high weight (surprising to not be treated)
- Result: after weighting, the two groups mirror each other's propensity score distributions, allowing causal interpretation of the outcome model coefficient.

## Why Bayesian IPW is Hard

> [!definition] Average Treatment Effect (ATE)
> $$
> \Delta_{\text{ATE}} = E\!\left[ E(Y_i \mid T_i=1, X_i) - E(Y_i \mid T_i=0, X_i) \right]
> $$
> The estimand $f(\Delta \mid \mathbf{T}, \mathbf{X}, \mathbf{Y})$ depends on treatment $T$, covariates $X$, and outcome $Y$.
^def-ate

A correct Bayesian model for this estimand would use:
$$
P[\Delta \mid (\mathbf{T}, \mathbf{X}, \mathbf{Y})] \propto P[(\mathbf{T}, \mathbf{X}, \mathbf{Y}) \mid \Delta] \times P[\Delta]
$$

**The weights are nowhere in this expression.** IPTWs would conceptually appear in the likelihood, but they are not part of the data-generating process.

> [!definition] The Fundamental Problem
> Robins, Hernán, and Wasserman (2015) show that propensity scores cannot be incorporated into standard Bayesian inference because:
>
> 1. The Bayesian estimand is $P[\Delta \mid (T, X, Y)] \propto P[(T, X, Y) \mid \Delta] \times P[\Delta]$
> 2. Propensity scores (and weights) have no role in the likelihood $P[(T, X, Y) \mid \Delta]$
> 3. We cannot set a prior on a weight parameter — there is no weight parameter in the model
>
> Conclusion: **"Bayesian inference must ignore the propensity score"** (Robins et al. 2015)
^def-bayes-ipw-problem

## Liao-Zigler Method: A Legal Bayesian Approach

Liao & Zigler (2020) treat the propensity score as a latent parameter $\nu$ and, instead of using a single set of weights, marginalize over its posterior distribution:

> [!theorem] Liao-Zigler Marginalization
> $$
> \underbrace{f(\Delta \mid \mathbf{T}, \mathbf{X}, \mathbf{Y})}_{\text{ATE without } \nu} = \int_\nu \underbrace{f(\Delta \mid \mathbf{T}, \mathbf{X}, \mathbf{Y}, \nu)}_{\text{outcome model given } \nu} \underbrace{f(\nu \mid \mathbf{T}, \mathbf{X})}_{\text{Bayesian treatment model}} \, d\nu
> $$
> The propensity score $\nu$ is estimated Bayesianly in the treatment model, then integrated out to produce a $\nu$-free ATE.
^thm-liao-zigler

> [!definition] Liao-Zigler Two-Stage Method
> **Practical algorithm** for evaluating the marginalization integral:
> 1. Fit a **Bayesian treatment model** $\nu \mid T, X$ to get a posterior distribution over propensity scores
> 2. Draw $K$ samples of propensity scores from the posterior
> 3. For each draw $k$: compute IPTW and run the **frequentist outcome model** → ATE estimate $\hat{\Delta}_k$
> 4. Combine the $K$ ATEs using **Rubin's rules**: $\bar{\Delta} = \frac{1}{K}\sum_k \hat{\Delta}_k$, with SEs combined to capture between-model variance
>
> This propagates treatment-model uncertainty into the final ATE estimate.
^def-liao-zigler

This is analogous to **multiple imputation** (or bootstrapping): run the same model on slightly different data (different weights) and combine the results.

## R/brms Implementation

### Step 1: Bayesian Treatment Model

```r
library(brms)
library(tidyverse)

model_treatment <- brm(
  bf(net ~ income + temperature + health,
     decomp = "QR"),       # QR decomposition for numerical stability
  family = bernoulli(),    # logistic regression
  data = nets,
  chains = 4, cores = 4, iter = 1000,
  seed = 1234, backend = "cmdstanr"
)
```

### Step 2: Extract K Posterior Propensity Score Samples

```r
# posterior_epred gives P(net=1 | confounders, theta^(k)) for each posterior draw k
pred_probs_chains <- posterior_epred(model_treatment)
# dim: (2000 draws) × (1752 people)
```

### Step 3: Nest Propensity Scores, Compute Weights, Run K Outcome Models

```r
# Nest each draw's propensity scores into its own row
pred_probs_nested <- pred_probs_chains %>%
  as_tibble(.name_repair = "unique") %>%
  mutate(draw = 1:n()) %>%
  pivot_longer(-draw, names_to = "row", values_to = "prob") %>%
  mutate(row = as.numeric(str_remove(row, "\\.\\.\\."))) %>%
  group_by(draw) %>%
  nest() %>%
  ungroup()

# For each draw: compute IPTW and run outcome model
outcome_models <- pred_probs_nested %>%
  mutate(outcome_model = map(data, ~{
    df <- bind_cols(nets, .) %>%
      mutate(iptw = (net_num / prob) + ((1 - net_num) / (1 - prob)))
    lm(malaria_risk ~ net, data = df, weights = iptw)
  })) %>%
  mutate(
    tidied  = map(outcome_model, tidy),
    ate     = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(estimate)),
    ate_se  = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(std.error))
  )
```

### Step 4: Combine with Rubin's Rules

```r
# Average ATE (≈ -10, matching the true effect)
mean(outcome_models$ate)
# [1] -10.1

# Combine standard errors with Rubin's rules
rubin_se <- function(ates, sigmas) {
  sqrt(mean(sigmas^2) + var(ates))
}
rubin_se(outcome_models$ate, outcome_models$ate_se)
# [1] 1.02  (larger than naive average of SEs: 0.659)
```

> [!example] Bayesian IPW: Mosquito Nets (R/brms) — Result
> With $K = 2000$ posterior draws of propensity scores, the combined ATE is ≈ −10.1, matching the frequentist estimate.
>
> **Key insight**: The combined SE (1.02) is larger than the naive mean SE (0.659) because Rubin's rules add the variance of the ATEs across draws. This correctly inflates the SE to account for uncertainty in the treatment model's propensity scores — uncertainty that a purely frequentist approach ignores.
^ex-bayesian-ipw

## Rubin's Rules for Combining Results

> [!definition] Rubin's Rules
> When combining results from $K$ models fitted to slightly different datasets (or draws), the combined ATE and standard error are:
> $$
> \bar{\Delta} = \frac{1}{K}\sum_{k=1}^K \hat{\Delta}_k
> $$
> $$
> \text{SE}_\text{combined} = \sqrt{\underbrace{\frac{1}{K}\sum_{k=1}^K \hat{\sigma}_k^2}_\text{avg within-draw variance} + \underbrace{\text{Var}(\hat{\Delta}_k)}_\text{between-draw variance}}
> $$
>
> The between-draw variance captures the uncertainty from the treatment model. Simply averaging SEs is incorrect; Rubin's rules give the proper pooled SE.
^def-rubin-rules

## Limitations and Open Questions

1. **Is the result truly Bayesian?** The outcome model is still *frequentist* (`lm()`/OLS). The distribution of 2,000 ATEs resembles a posterior and is a mathematical transformation of the treatment model's posterior, but it is not formally one — the uncertainty all comes from the treatment model, and the uncertainty in the outcome model is not quantified Bayesianly. Strictly speaking, this is only quasi-Bayesian.

2. **Full Bayesian outcome model**: Running `brm()` 2,000 times — one model per set of weights — is computationally prohibitive. A technically correct, fully Bayesian solution uses a single `brm()` run where the weights change per iteration (possible via custom `brms` Stan code, subsequently developed by Jordan Nafa; see the [follow-up post](https://www.andrewheiss.com/blog/2021/12/20/fully-bayesian-ate-iptw/)).

3. **Efficiency**: This approach is equivalent to bootstrapping the treatment uncertainty. The interpretation of the resulting "posterior-like" distribution as a credible interval is debatable.

## Comparison: Approaches to Bayesian Causal Inference

| Method | Treatment of Confounders | Fully Bayesian? |
|--------|-------------------------|----------------|
| Standard IPW (frequentist) | Single propensity score | No |
| Liao-Zigler | Posterior propensity scores, Rubin's rules | Quasi-Bayesian |
| BART + propensity scores | BART model; see [[Nonparametric Causal Inference]] | Yes |
| Structural/outcome model | Direct Bayesian regression on outcomes | Yes (but requires correct model) |

## Connections

- [[Nonparametric Causal Inference]] — BART-based ATE estimation using propensity scores; a fully Bayesian alternative that directly models the response surface without weights
- [[Directed Acyclic Graphs]] — DAG identifies which variables to include in the treatment model
- [[DAGs and Causal Identification]] — The DAG determines which confounders to include in the treatment model
- [[The Selection Problem]] — IPW is one solution to the selection-into-treatment problem
- [[Bayesian Linear Regression]] — The outcome model component; Bayesian extension is the ultimate goal
- [[Differences-in-Differences]] — Another quasi-experimental identification strategy; IPW adjusts for observed confounders while DiD adjusts for time-invariant unobservables; also benefits from Bayesian implementation
- [[Counterfactual Inference]] — Bayesian counterfactual prediction in time-series settings

## See Also

- [[Frequentist Causal Estimation]] — the frequentist side: classical IPW, doubly robust estimators, and AIPW
- [[Propensity Score in Bayesian CI]] — the role of the propensity score within the full Bayesian causal inference pipeline
- [[General Structure of Bayesian CI]] — formal Bayesian causal inference architecture that situates Bayesian IPTW within the broader framework
- [[Li et al 2022 - Overview]] — critical review of Bayesian CI that discusses IPW and the Liao-Zigler approach in broader context
- [[Propensity Score Matching - Overview]] — frequentist counterpart: matching units (not weighting) to achieve balance
- [[Covariate Balance and Matching Diagnostics]] — SMD, love plots, overlap plots for diagnosing balance after either matching or weighting
- [[Synthetic Control]] — alternative for single-unit treatment; unit weights that sum to 1, not normalized by propensity scores
- [[Missing Data Models]] — multiple imputation (Rubin's rules were originally designed for missing data)
- [[Conformal Prediction Under Covariate Shift]] — same propensity-odds weights
