---
title: "Bayesian Inverse Probability Weighting"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - type/concept
  - method/brms
  - method/stan
  - doc/tutorial
source: "[[raw/How to use Bayesian propensity scores and inverse probability weights]]"
source_location: "Full post — Andrew Heiss blog (2021-12-18)"
date_ingested: 2026-04-11
folder: "Bayesian Statistics/Advanced Models"
doc_type: tutorial
depends_on:
  - "[[Nonparametric Causal Inference]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[The Selection Problem]]"
  - "[[Hierarchical Models]]"
used_by: []
aliases:
  - Bayesian IPW
  - Bayesian propensity scores
  - Liao-Zigler method
  - IPTW Bayesian
---

# Bayesian Inverse Probability Weighting

> [!summary]
> Inverse probability weighting (IPW) cannot be used naively with Bayesian inference because weights are not part of the likelihood. The Liao-Zigler (2020) method resolves this by treating propensity scores as a parameter $\nu$, drawing $K$ samples of propensity scores from the posterior of a Bayesian treatment model, computing weights for each draw, running the outcome model $K$ times, and combining results with Rubin's rules. This propagates treatment-model uncertainty into the ATE estimate.

## Overview

**The problem**: We want to use both Bayesian inference (posterior distributions, no null hypotheses) and inverse probability weighting (to close DAG backdoor paths). These seem incompatible.

**Why IPW doesn't fit Bayes**: The ATE estimand is:
$$\Delta_\text{ATE} = E\left[E(Y_i \mid T_i = 1, X_i) - E(Y_i \mid T_i = 0, X_i)\right]$$

To estimate this Bayesianly, we compute $P[\Delta \mid (T, X, Y)] \propto P[(T, X, Y) \mid \Delta] \times P[\Delta]$. IPTWs have no place in this equation — weights are not part of the data-generating likelihood.

**The solution** (Liao & Zigler 2020): Marginalize over the posterior distribution of propensity scores.

## Standard Frequentist IPW

> [!definition] Inverse Probability of Treatment Weights (IPTW)
> For a binary treatment $T \in \{0, 1\}$, given propensity score $\hat{e}(X) = P(T=1 \mid X)$:
> $$
> \text{IPTW}_i = \frac{T_i}{\hat{e}(X_i)} + \frac{1 - T_i}{1 - \hat{e}(X_i)}
> $$
>
> Using these weights in an outcome model creates **pseudo-populations**: treat and control groups with matched covariate distributions, as if randomized.
^def-iptw

> [!example] Frequentist IPW: Mosquito Net and Malaria Risk
> **Setup**: Observational data on mosquito net use ($T$) and malaria risk ($Y$, 0-100). Confounders: income, health, temperature. True ATE = −10 (nets reduce malaria risk by 10 points).
>
> ```r
> library(tidyverse); library(brms); library(broom)
>
> # Step 1: Treatment model — predict net use from confounders
> model_treatment_freq <- glm(net ~ income + temperature + health,
>                             data = nets, family = binomial())
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

### What Pseudo-Populations Do

Visualizing the weighted propensity score distributions shows that IPTW makes the treated and untreated groups look alike:
- **Treated, low propensity** → high weight (surprising to be treated)
- **Untreated, high propensity** → high weight (surprising to not be treated)
- Result: both groups have similar propensity distributions → comparable

## Why Bayesian IPW is Hard

> [!definition] The Fundamental Problem
> Robins, Hernán, and Wasserman (2015) show that propensity scores cannot be incorporated into standard Bayesian inference because:
>
> 1. The Bayesian estimand is $P[\Delta \mid (T, X, Y)] \propto P[(T, X, Y) \mid \Delta] \times P[\Delta]$
> 2. Propensity scores (and weights) have no role in the likelihood $P[(T, X, Y) \mid \Delta]$
> 3. We cannot set a prior on a weight parameter — there is no weight parameter in the model
>
> Conclusion: "Bayesian inference must ignore the propensity score" (Robins et al. 2015)
^def-bayes-ipw-problem

## Liao-Zigler Method: A Legal Bayesian Approach

> [!definition] Liao-Zigler Two-Stage Method
> Instead of using a single set of weights, treat propensity scores as a parameter $\nu$ and marginalize over them:
>
> $$
> \underbrace{f(\Delta \mid T, X, Y)}_\text{ATE without $\nu$} = \int_\nu \underbrace{f(\Delta \mid T, X, Y, \nu)}_\text{outcome model with $\nu$} \; \underbrace{f(\nu \mid T, X)}_\text{treatment model} \; d\nu
> $$
>
> **Practical algorithm**:
> 1. Fit a Bayesian treatment model $\nu \mid T, X$ to get posterior propensity scores
> 2. Draw $K$ samples of propensity scores from the posterior
> 3. For each draw $k$: compute IPTW and run outcome model → ATE estimate $\hat{\Delta}_k$
> 4. Combine using **Rubin's rules**: $\bar{\Delta} = \frac{1}{K}\sum_k \hat{\Delta}_k$
>
> This propagates treatment-model uncertainty into the final ATE estimate.
^def-liao-zigler

> [!example] Bayesian IPW: Mosquito Nets (R/brms)
> ```r
> # Step 1: Bayesian treatment model
> model_treatment <- brm(
>   bf(net ~ income + temperature + health, decomp = "QR"),
>   family = bernoulli(),  # logistic regression
>   data = nets,
>   chains = 4, cores = 4, iter = 1000,
>   seed = 1234, backend = "cmdstanr"
> )
>
> # Step 2: Extract 2000 posterior draws of propensity scores
> pred_probs_chains <- posterior_epred(model_treatment)
> # dim: [2000 draws × 1752 people]
>
> # Step 3: For each of the K=2000 draws, compute IPTW and run outcome model
> pred_probs_nested <- pred_probs_chains %>%
>   as_tibble(.name_repair = "unique") %>%
>   mutate(draw = 1:n()) %>%
>   pivot_longer(-draw, names_to = "row", values_to = "prob") %>%
>   mutate(row = as.numeric(str_remove(row, "..."))) %>%
>   group_by(draw) %>%
>   nest() %>% ungroup()
>
> outcome_models <- pred_probs_nested %>%
>   mutate(outcome_model = map(data, ~{
>     df <- bind_cols(nets, .) %>%
>       mutate(iptw = (net_num / prob) + ((1 - net_num) / (1 - prob)))
>     lm(malaria_risk ~ net, data = df, weights = iptw)
>   })) %>%
>   mutate(
>     tidied  = map(outcome_model, ~tidy(.)),
>     ate     = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(estimate)),
>     ate_se  = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(std.error))
>   )
>
> # Step 4: Combine with Rubin's rules
> rubin_se <- function(ates, sigmas) sqrt(mean(sigmas^2) + var(ates))
>
> mean(outcome_models$ate)            # ATE ≈ -10.1 (matches frequentist)
> rubin_se(outcome_models$ate, outcome_models$ate_se)  # SE ≈ 1.02 (larger!)
> ```
>
> **Key insight**: The combined SE (1.02) is larger than the naive mean SE (0.659) because Rubin's rules add the variance of the ATEs across draws — this properly accounts for treatment-model uncertainty.
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

1. **Is the result truly Bayesian?** The outcome model here is frequentist (OLS). The distribution of ATEs is a mathematical transformation of the treatment model's posterior, but the uncertainty in the outcome model is not quantified Bayesianly. Strictly speaking, this is only quasi-Bayesian.

2. **Full Bayesian outcome model**: Running `brm()` 2,000 times is computationally prohibitive. A fully Bayesian solution would use one `brm()` run where the weights change per iteration (possible via custom `brms` Stan code, as noted by Jordan Nafa in the [follow-up post](https://www.andrewheiss.com/blog/2021/12/20/fully-bayesian-ate-iptw/)).

3. **Efficiency**: This approach is equivalent to bootstrapping the treatment uncertainty. The interpretation of the resulting "posterior-like" distribution as a credible interval is debatable.

## Comparison: Approaches to Bayesian Causal Inference

| Method | Treatment of Confounders | Fully Bayesian? |
|--------|-------------------------|----------------|
| Standard IPW (frequentist) | Single propensity score | No |
| Liao-Zigler | Posterior propensity scores, Rubin's rules | Quasi-Bayesian |
| BART + propensity scores | BART model; see [[Nonparametric Causal Inference]] | Yes |
| Structural/outcome model | Direct Bayesian regression on outcomes | Yes (but requires correct model) |

## Connections

- [[Nonparametric Causal Inference]] — BART-based ATE estimation using propensity scores; fully Bayesian approach
- [[Directed Acyclic Graphs]] — DAG identifies which variables to include in the treatment model
- [[The Selection Problem]] — IPW is one solution to the selection-into-treatment problem
- [[Differences-in-Differences]] — Another quasi-experimental approach; IPW adjusts for observed confounders while DiD adjusts for time-invariant unobservables
- [[Counterfactual Inference]] — Bayesian counterfactual prediction in time-series settings

## See Also

- [[Nonparametric Causal Inference]] — BART-based fully Bayesian causal inference
- [[Directed Acyclic Graphs]] — How to identify the correct adjustment set for IPW
- [[The Selection Problem]] — The fundamental problem that IPW addresses
