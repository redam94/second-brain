---
title: "Bayesian Propensity Scores and Inverse Probability Weights"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - type/concept
  - method/brms
  - method/stan
  - doc/tutorial
source: "[[raw/How to use Bayesian propensity scores and inverse probability weights]]"
source_location: "Andrew Heiss blog, 2021-12-18"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Advanced Models"
doc_type: tutorial
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[The Selection Problem]]"
  - "[[Bayesian Workflow - Overview]]"
  - "[[Hierarchical Linear Models]]"
used_by:
  - "[[Nonparametric Causal Inference]]"
aliases:
  - Bayesian IPW
  - Bayesian propensity score analysis
  - two-stage Bayesian propensity score
---

# Bayesian Propensity Scores and Inverse Probability Weights

> [!summary]
> Propensity scores and IPTWs are incompatible with standard Bayesian inference because weights are not part of the likelihood. The Liao & Zigler (2020) solution: treat propensity scores as a new parameter $\nu$, draw $K$ posterior samples from a Bayesian treatment model, compute weights for each draw, run $K$ outcome models, and combine results via Rubin's rules—marginalising out $\nu$ to obtain a Bayesian-compatible ATE.

## Overview

Inverse probability weighting (IPW) is a key tool for causal inference with observational data. Combined with DAG-based [[Directed Acyclic Graphs|adjustment set]] identification, it creates pseudo-populations that remove confounding. However, there is a **fundamental incompatibility** between IPW and Bayesian inference: propensity scores and weights are not parameters of any likelihood, making it mathematically impossible to place priors on them or incorporate them into a standard Bayesian model.

The resolution comes from Liao & Zigler (2020), who propose a two-stage method that marginalises over the posterior distribution of propensity scores.

## Standard (Frequentist) IPW

For binary treatment $T \in \{0,1\}$ and confounders $X$ identified via DAG:

> [!definition] Inverse Probability of Treatment Weight (IPTW)
> Given propensity score $e_i = P(T_i = 1 \mid X_i)$, the IPTW for individual $i$ is:
> $$w_i = \frac{T_i}{e_i} + \frac{1 - T_i}{1 - e_i}$$
> Weighting observations by $w_i$ creates a **pseudo-population** where treatment is independent of $X$, enabling unconfounded estimation of the ATE.
^def-iptw

**Four-step frequentist procedure**:

```r
# Step 1: Treatment model (design stage)
model_treatment_freq <- glm(net ~ income + temperature + health,
                            data = nets,
                            family = binomial(link = "logit"))

# Steps 2–3: Propensity scores and IPTW
nets_with_weights <- augment(model_treatment_freq, nets,
                             type.predict = "response") %>%
  rename(propensity = .fitted) %>%
  mutate(iptw = (net_num / propensity) + ((1 - net_num) / (1 - propensity)))

# Step 4: Outcome model (analysis stage) with weights
model_outcome_freq <- lm(malaria_risk ~ net,
                         data = nets_with_weights,
                         weights = iptw)
# Coefficient for `net` ≈ -10 (true effect)
```

### Pseudo-populations Explained

IPTWs **re-scale** observations so that treated and untreated groups have similar propensity score distributions. People with a low probability of treatment who nevertheless were treated receive high weight (surprising!); people with high probability of treatment who were treated receive low weight (unsurprising). The result: comparable pseudo-populations that remove confounding.

## Why Bayesian IPW is Problematic

The ATE estimand is:

$$\Delta_{\text{ATE}} = E\left[E(Y_i \mid T_i=1, X_i) - E(Y_i \mid T_i=0, X_i)\right]$$

In Bayesian estimation, we want:

$$P[\Delta \mid (T, X, Y)] \propto P[(T, X, Y) \mid \Delta] \times P[\Delta]$$

The problem: **weights $w_i$ do not appear anywhere in the likelihood**. They are a mathematical transformation of propensity scores, not a parameter of the data-generating process for $Y$, $T$, or $X$. Robins, Hernán, & Wasserman (2015) conclude: *"Bayesian inference must ignore the propensity score."*

## The Liao–Zigler Solution

> [!theorem] Two-Stage Bayesian Propensity Score Analysis
> Let $\nu$ denote the vector of propensity scores. The ATE estimand can be written as:
> $$\underbrace{f(\Delta \mid T, X, Y)}_{\text{ATE without }\nu} = \int_\nu \underbrace{f(\Delta \mid T, X, Y, \nu)}_{\text{outcome model with }\nu} \cdot \underbrace{f(\nu \mid T, X)}_{\text{treatment model}} \, d\nu$$
>
> **Key**: marginalise over the posterior of $\nu$ from the treatment model. This eliminates $\nu$ from the final estimand while incorporating propensity score uncertainty.
^thm-liao-zigler

### Practical Algorithm

1. **Bayesian treatment model**: Fit a Bayesian logistic regression $P(T=1 \mid X)$ with `brms`. Extract $K$ posterior draws of propensity scores — a $K \times N$ matrix.

```r
model_treatment <- brm(
  bf(net ~ income + temperature + health, decomp = "QR"),
  family = bernoulli(),
  data = nets, chains = 4, cores = 4, iter = 1000,
  seed = 1234, backend = "cmdstanr"
)

# K=2000 posterior draws × N=1752 people
pred_probs_chains <- posterior_epred(model_treatment)
dim(pred_probs_chains)  # [1] 2000 1752
```

2. **Nest propensity scores**: Organise 2,000 draws so each row is one complete set of propensity scores for all individuals.

```r
pred_probs_nested <- pred_probs_chains %>%
  as_tibble(.name_repair = "unique") %>%
  mutate(draw = 1:n()) %>%
  pivot_longer(-draw, names_to = "row", values_to = "prob") %>%
  mutate(row = as.numeric(str_remove(row, "..."))) %>%
  group_by(draw) %>% nest() %>% ungroup()
```

3. **Run $K$ outcome models**: For each posterior draw, compute IPTW and run an outcome model.

```r
outcome_models <- pred_probs_nested %>%
  mutate(outcome_model = map(data, ~{
    df <- bind_cols(nets, .) %>%
      mutate(iptw = (net_num / prob) + ((1 - net_num) / (1 - prob)))
    lm(malaria_risk ~ net, data = df, weights = iptw)
  })) %>%
  mutate(tidied = map(outcome_model, ~tidy(.)),
         ate    = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(estimate)),
         ate_se = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(std.error)))
```

4. **Combine with Rubin's rules**: Average ATEs; combine standard errors accounting for both within-model and between-model variance.

```r
# Point estimate
mean(outcome_models$ate)        # ≈ -10.1

# Rubin's rules for SE
rubin_se <- function(ates, sigmas) sqrt(mean(sigmas^2) + var(ates))
rubin_se(outcome_models$ate, outcome_models$ate_se)  # ≈ 1.02
```

> [!example] Mosquito Nets and Malaria Risk
> **Setup**: Simulated dataset ($N=1752$). Binary treatment: mosquito net use ($T$). Outcome: malaria risk score (0–100, higher = more risk). True ATE = −10 points.
>
> **DAG confounders**: income → net, health → net, temperature → net; income → health. Adjustment set identified via `dagitty::adjustmentSets()`: $\{$income, health, temperature$\}$.
>
> **Frequentist result**: ATE = −10.1 (SE = 0.66). Correct.
>
> **Bayesian Liao–Zigler result**: Mean ATE = −10.1, Rubin SE = 1.02. Extra uncertainty from the treatment model (propensity score uncertainty) is appropriately propagated.
>
> **Interpretation**: Mosquito nets reduce malaria risk by ~10 points on the 0–100 scale. The larger Bayesian SE reflects genuine uncertainty about the propensity score itself.

## Key Insight: Uncertainty Propagation

The frequentist approach generates a single set of propensity scores with no uncertainty. The Bayesian approach generates 2,000 sets, each reflecting different plausible true propensity scores. Running 2,000 outcome models and combining with Rubin's rules **propagates this design-stage uncertainty into the analysis stage**—a more honest representation of what we know.

The distribution of 2,000 ATEs looks like a posterior distribution but is not strictly Bayesian (the outcome model is frequentist OLS). A fully Bayesian outcome model using `brms` would require running it 2,000 times (computationally demanding), but Jordan Nafa's approach (see follow-up post) makes this feasible.

## Connections

- **[[Directed Acyclic Graphs]]**: DAGs identify the correct adjustment set for the treatment model. Conditioning on the wrong set (collider bias) or missing confounders leads to biased propensity scores.
- **[[The Selection Problem]]**: IPW is one of three main approaches (alongside matching and regression adjustment) to address selection bias; propensity scores operationalise the [[The Experimental Ideal|Rosenbaum-Rubin theorem]].
- **[[Nonparametric Causal Inference]]**: BART-based methods offer a fully Bayesian alternative without requiring explicit propensity score weighting.
- **[[Bayesian Workflow - Overview]]**: Bayesian treatment model should be checked with posterior predictive checks; the two-stage approach inherits all standard Bayesian workflow considerations.
- **[[Missing Data Models]]**: Liao–Zigler multiple-model approach is structurally identical to multiple imputation (Rubin's rules applied to K imputed datasets). The philosophical connection is explicit.

## See Also
- [[Directed Acyclic Graphs]] — identifying confounders and adjustment sets
- [[Nonparametric Causal Inference]] — BART + propensity scores as alternative
- [[Bayesian Difference in Differences]] — Bayesian causal inference for panel data
- [[The Selection Problem]] — potential outcomes and selection bias foundations
