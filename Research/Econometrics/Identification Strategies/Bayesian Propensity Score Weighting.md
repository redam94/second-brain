---
title: "Bayesian Propensity Score Weighting"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - topic/econometrics
  - type/concept
  - doc/tutorial
  - method/brms
  - method/r
  - method/stan
source: "[[raw/How to use Bayesian propensity scores and inverse probability weights]]"
source_location: "Andrew Heiss blog, 2021-12-18"
date_ingested: 2026-04-15
folder: "Econometrics/Identification Strategies"
doc_type: tutorial
depends_on:
  - "[[DAGs and Causal Identification]]"
  - "[[The Selection Problem]]"
  - "[[Nonparametric Causal Inference]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Differences-in-Differences]]"
aliases:
  - IPTW Bayesian
  - inverse probability treatment weights
  - propensity score Bayesian
  - Liao-Zigler method
  - Bayesian Propensity Scores and IPW
---

# Bayesian Propensity Score Weighting

> [!summary]
> Propensity scores and inverse probability treatment weights (IPTW) cannot be naively inserted into a Bayesian model because they are not part of the data-generating process. Liao & Zigler (2020) resolve this by marginalizing over the posterior distribution of propensity scores: run the outcome model K times with K different weight sets drawn from the Bayesian treatment model's posterior, then combine results with Rubin's rules.

## Overview

Inverse probability weighting (IPW) adjusts for confounding by creating pseudo-populations where treated and untreated groups have similar covariate distributions. When combined with Bayesian inference, however, a fundamental incompatibility arises: **weights are not a parameter in any Bayesian likelihood**.

This note documents the conceptual problem and the Liao & Zigler (2020) solution, with full R/brms implementation.

## Standard Frequentist IPW Workflow

The frequentist workflow for IPW consists of four steps:

> [!definition] Inverse Probability of Treatment Weight (IPTW)
> For a binary treatment $T \in \{0,1\}$ with propensity score $\pi(X) = P(T=1 \mid X)$:
> $$\text{IPTW}_i = \frac{T_i}{\pi(X_i)} + \frac{1 - T_i}{1 - \pi(X_i)}$$
> Applying these weights to an outcome model creates a **pseudo-population** where treated and untreated groups are comparable across confounders $X$.
^def-iptw

**Steps:**
1. **Treatment model** (design stage): Fit logistic regression `net ~ confounders` to get $\hat\pi(X_i)$.
2. **Propensity scores**: $\hat\pi_i$ = predicted probability of treatment.
3. **Weights**: Compute IPTW from $\hat\pi_i$.
4. **Outcome model** (analysis stage): Fit weighted regression `outcome ~ treatment` with IPTW weights; coefficient on treatment = ATE.

```r
# Step 1: Frequentist treatment model
model_treatment_freq <- glm(net ~ income + temperature + health,
                            data = nets, family = binomial(link = "logit"))

# Steps 2-3: Propensity scores and IPTW
nets_with_weights <- augment(model_treatment_freq, nets,
                             type.predict = "response") %>%
  rename(propensity = .fitted) %>%
  mutate(iptw = (net_num / propensity) + ((1 - net_num) / (1 - propensity)))

# Step 4: Outcome model
model_outcome_freq <- lm(malaria_risk ~ net, data = nets_with_weights, weights = iptw)
# Coefficient on net ≈ -10 (recovers the true -10 malaria risk point decrease)
```

### What IPTW is Doing: Pseudo-populations

The weights rescale the sample to make treated and untreated groups comparable:
- Treated individuals with **low** $\hat\pi$ (surprisingly treated) receive **high** weight.
- Untreated individuals with **high** $\hat\pi$ (surprisingly untreated) receive **high** weight.

After weighting, the two groups mirror each other's propensity score distributions, allowing causal interpretation of the outcome model coefficient.

## The Fundamental Problem with Bayesian Propensity Scores

> [!definition] Average Treatment Effect (ATE)
> $$\Delta_{\text{ATE}} = E\!\left[ E(Y_i \mid T_i=1, X_i) - E(Y_i \mid T_i=0, X_i) \right]$$
> The estimand $f(\Delta \mid \mathbf{T}, \mathbf{X}, \mathbf{Y})$ depends on treatment $T$, covariates $X$, and outcome $Y$.
^def-ate

A correct Bayesian model would use:
$$P[\Delta \mid (\mathbf{T}, \mathbf{X}, \mathbf{Y})] \propto P[(\mathbf{T}, \mathbf{X}, \mathbf{Y}) \mid \Delta] \times P[\Delta]$$

**The weights are nowhere in this expression.** IPTWs appear conceptually in the likelihood but they are not part of the data-generating process — there is no "weight parameter" to set a prior on. As Robins, Hernán, and Wasserman (2015) state: **"Bayesian inference must ignore the propensity score."**

## The Liao-Zigler Solution

Liao & Zigler (2020) treat the propensity score as a latent parameter $\nu$ and marginalize over its posterior distribution:

> [!theorem] Liao-Zigler Marginalization
> $$\underbrace{f(\Delta \mid \mathbf{T}, \mathbf{X}, \mathbf{Y})}_{\text{ATE without } \nu} = \int_\nu \underbrace{f(\Delta \mid \mathbf{T}, \mathbf{X}, \mathbf{Y}, \nu)}_{\text{outcome model given } \nu} \underbrace{f(\nu \mid \mathbf{T}, \mathbf{X})}_{\text{Bayesian treatment model}} \, d\nu$$
> The propensity score $\nu$ is estimated Bayesianly in the treatment model, then integrated out to produce a $\nu$-free ATE.
^thm-liao-zigler

**Practical algorithm:**
1. Fit a **Bayesian treatment model** to get a posterior distribution over propensity scores.
2. Draw $K$ samples of propensity scores from the posterior.
3. For each of the $K$ samples, compute weights and run the **frequentist outcome model**.
4. Combine the $K$ ATEs using **Rubin's rules** (averaging ATEs; combining SEs to capture between-model variance).

This is analogous to **multiple imputation**: run the same model on slightly different data (different weights) and combine results.

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

**Key point**: Rubin's rules correctly inflate the SE to account for uncertainty in the treatment model's propensity scores — uncertainty that a purely frequentist approach ignores.

> [!example] Mosquito Nets and Malaria Risk
> **Setup**: 1,752 individuals; binary treatment (mosquito net use); outcome (malaria risk 0–100). Confounders identified by DAG: income, health, temperature.
> **True effect (simulated)**: −10 malaria risk points.
> **Results**:
> - Frequentist IPTW: ATE = −10.1 ± 0.66 SE
> - Bayesian Liao-Zigler: ATE = −10.1 ± 1.02 SE (wider, correctly incorporating treatment model uncertainty)
^ex-nets

## Limitations and Open Questions

1. The outcome model is still *frequentist* (`lm()`). The distribution of 2,000 ATEs resembles a posterior but is not formally one — the uncertainty all comes from the treatment model, not the outcome model.
2. To run a fully Bayesian outcome model (`brm()`) with these weights, one would need 2,000 separate `brm()` calls — computationally prohibitive.
3. A technically correct solution (single `brm()` call with per-iteration weights) was subsequently developed by Jordan Nafa.

## Connections

- [[DAGs and Causal Identification]] — The DAG determines which confounders to include in the treatment model
- [[Nonparametric Causal Inference]] — Alternative approach: BART directly models the response surface without weights
- [[Bayesian Linear Regression]] — The outcome model component; Bayesian extension is the ultimate goal
- [[Differences-in-Differences]] — Another identification strategy; also benefits from Bayesian implementation

## See Also

- [[Synthetic Control]] — Alternative to IPTW for single-unit treatment; uses weights differently
- [[Counterfactual Inference]] — Bayesian approach to predicting counterfactual outcomes
- [[Missing Data Models]] — Multiple imputation (which Rubin's rules were originally designed for)
