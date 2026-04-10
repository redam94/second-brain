---
title: Bayesian Propensity Scores and Inverse Probability Weighting
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian-statistics
  - type/concept
  - doc/tutorial
  - method/stan
source: "[[raw/How to use Bayesian propensity scores and inverse probability weights]]"
source_location: "Andrew Heiss blog, 2021-12-18"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: tutorial
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Counterfactual Inference]]"
aliases:
  - IPW
  - IPTW
  - inverse probability weighting
  - propensity score weighting
  - Bayesian IPW
---

# Bayesian Propensity Scores and Inverse Probability Weighting

> [!summary]
> Inverse probability of treatment weights (IPTW) re-balance observational data by up-weighting surprising treatment assignments and down-weighting expected ones, creating pseudo-populations that permit causal inference. However, propensity scores have no natural place in a Bayesian likelihood, requiring a two-stage marginalization approach (Liao & Zigler 2020) to bring uncertainty from the treatment model into the outcome model.

## Overview

Inverse probability weighting is a model-based approach to causal inference: instead of blocking all backdoor paths via regression adjustment (see [[Directed Acyclic Graphs]]), IPW creates a **pseudo-population** where treatment assignment is independent of the confounders. This makes the treated and untreated groups directly comparable for estimating the Average Treatment Effect (ATE).

The frequentist version is straightforward but discards uncertainty in the propensity scores. Combining IPW with Bayesian inference is mathematically non-trivial because weights are not part of the data-generating process for the Bayesian likelihood — a problem identified by Robins, Hernán, and Wasserman (2007) and solved via marginalization by Liao and Zigler (2020).

**Running example**: Effect of mosquito nets on malaria risk, with confounders income, health, and nighttime temperature. True ATE = −10 malaria risk points (known from data simulation).

## Main Content

### Frequentist IPW: The Two-Stage Process

> [!definition] Inverse Probability of Treatment Weight (IPTW)
> Given binary treatment $T_i \in \{0,1\}$ and propensity score $e_i = P(T_i = 1 \mid X_i)$, the **IPTW** for unit $i$ is:
> $$\text{IPTW}_i = \frac{T_i}{e_i} + \frac{1 - T_i}{1 - e_i}$$
> Treated units get weight $1/e_i$ (higher weight when treatment was unlikely); untreated units get weight $1/(1-e_i)$ (higher weight when non-treatment was unlikely).

^def-iptw

The two-stage frequentist procedure:

1. **Design/treatment stage**: Model $P(T=1 \mid X)$ using logistic regression (or any classifier) with DAG-identified confounders as predictors → yields propensity scores $\hat{e}_i$.
2. **Analysis/outcome stage**: Run a weighted regression of $Y$ on $T$ using IPTWs as weights → coefficient on $T$ estimates the ATE.

```r
# Stage 1: Treatment model (design stage)
model_treatment_freq <- glm(net ~ income + temperature + health,
                            data = nets, family = binomial(link = "logit"))

# Stage 2: Propensity scores → weights
nets_with_weights <- augment(model_treatment_freq, nets, type.predict = "response") %>%
  rename(propensity = .fitted) %>%
  mutate(iptw = (net_num / propensity) + ((1 - net_num) / (1 - propensity)))

# Stage 3: Outcome model with IPTWs
model_outcome_freq <- lm(malaria_risk ~ net, data = nets_with_weights, weights = iptw)
# → coefficient for net ≈ -10.1 ✓
```

### Pseudo-Populations and What IPTWs Do

IPTWs create two comparable **pseudo-populations** from the observed data:

- **Treated pseudo-population**: Up-weight treated individuals who had a *low* propensity to be treated (surprising treatment); down-weight treated individuals with a *high* propensity (expected treatment).
- **Untreated pseudo-population**: Symmetric — up-weight untreated individuals with *high* propensity.

After reweighting, the covariate distributions of treated and untreated groups mirror the overall population distribution, eliminating confounding. This is the observational analogue of randomization.

### The Fundamental Problem with Bayesian IPW

> [!theorem] Robins–Hernán–Wasserman (2007)
> In standard Bayesian inference, the posterior for the ATE $\Delta$ given data $(T, X, Y)$ follows:
> $$P[\Delta \mid (T, X, Y)] \propto P[(T, X, Y) \mid \Delta] \times P[\Delta]$$
> The likelihood $P[(T,X,Y) \mid \Delta]$ contains no weight parameter. Propensity scores and IPTWs are **not part of the data-generating process** and therefore have no place in the Bayesian likelihood — there is no weight parameter on which to place a prior.
> 
> **Corollary**: "Bayesian inference must ignore the propensity score." Simply plugging IPTWs into a Bayesian weighted likelihood does not produce coherent Bayesian inference.

^thm-robins-hernan

### The Liao–Zigler Solution: Marginalization Over the Treatment Model

Liao and Zigler (2020) resolve this by treating propensity scores as a **nuisance parameter** $\nu$ and marginalizing it out:

> [!definition] Liao–Zigler Two-Stage Bayesian Estimand
> Let $\nu$ denote the propensity score (a function of $T$ and $X$). The ATE estimand marginalizing over $\nu$ is:
> $$f(\Delta \mid T, X, Y) = \int_\nu \underbrace{f(\Delta \mid T, X, Y, \nu)}_{\text{outcome model with } \nu} \cdot \underbrace{f(\nu \mid T, X)}_{\text{treatment model}} \, d\nu$$
> The treatment model $f(\nu \mid T, X)$ encodes uncertainty in the propensity scores. The integral removes $\nu$ from the final estimand.

^def-liao-zigler

In practice, this integral is approximated by **Monte Carlo**:

1. Fit a **Bayesian treatment model** (logistic regression in brms) to get a posterior distribution over propensity scores.
2. Draw $K$ posterior samples of propensity scores → $K$ sets of IPTWs.
3. For each of the $K$ sets of weights, run an **outcome model**.
4. Pool the $K$ outcome model results → final posterior over ATE.

This is analogous to **multiple imputation** (Rubin's rules) or **bootstrapping**: run the same model on $K$ slightly different datasets and combine results.

### Full Bayesian Implementation in R/brms

**Step 1: Bayesian treatment model**

```r
library(brms)

model_treatment <- brm(
  bf(net ~ income + temperature + health, decomp = "QR"),
  family = bernoulli(),   # logistic regression
  data = nets,
  chains = 4, cores = 4, iter = 1000,
  seed = 1234, backend = "cmdstanr"
)
```

**Step 2: Extract K = 2,000 posterior propensity score draws**

```r
pred_probs_chains <- posterior_epred(model_treatment)
# dim(pred_probs_chains) = [2000, 1752]  (K draws × N individuals)
```

**Step 3: For each of K draws, compute IPTWs and run outcome model**

```r
pred_probs_nested <- pred_probs_chains %>%
  as_tibble(.name_repair = "unique") %>%
  mutate(draw = 1:n()) %>%
  pivot_longer(-draw, names_to = "row", values_to = "prob") %>%
  mutate(row = as.numeric(str_remove(row, "..."))) %>%
  group_by(draw) %>%
  nest() %>% ungroup()

outcome_models <- pred_probs_nested %>%
  mutate(outcome_model = map(data, ~{
    df <- bind_cols(nets, .) %>%
      mutate(iptw = (net_num / prob) + ((1 - net_num) / (1 - prob)))
    lm(malaria_risk ~ net, data = df, weights = iptw)
  })) %>%
  mutate(tidied  = map(outcome_model, ~tidy(.)),
         ate     = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(estimate)),
         ate_se  = map_dbl(tidied, ~filter(., term == "netTRUE") %>% pull(std.error)))
```

**Step 4: Pool results** — the distribution of `ate` across the 2,000 draws is the approximate Bayesian posterior for the ATE $\Delta$. The spread of this distribution reflects uncertainty from *both* the treatment model (propensity score uncertainty) and the outcome model (sampling uncertainty).

### Why Use Bayesian IPW Over Frequentist IPW?

| Aspect | Frequentist IPW | Bayesian IPW (Liao–Zigler) |
|--------|----------------|---------------------------|
| Uncertainty in propensity scores | Ignored (single point estimate) | Propagated through $K$ draws |
| Inference framework | p-values, confidence intervals | Posterior distribution, credible intervals |
| Probability of direction | Not available | $P(\Delta < 0 \mid \text{data})$ directly |
| ROPE / practical equivalence | Not available | Posterior mass in ROPE region |
| Complexity | Simple | Two-stage + $K$ outcome models |

## Examples

> [!example] Mosquito Net and Malaria Risk
> **Setup**: 1,752 individuals; binary treatment (net use); outcome = malaria risk (0–100 scale); confounders = income, health, nighttime temperature; true ATE = −10 risk points.
>
> **Frequentist result**: $\hat{\Delta} = -10.1$ (SE = 0.66)
>
> **Bayesian Liao–Zigler result**: Posterior over ATE with mean ≈ −10, narrow credible interval. The posterior additionally captures uncertainty from propensity score estimation — slightly wider than frequentist SEs.
>
> **Interpretation**: We can directly state "the probability that nets reduce malaria risk is $P(\Delta < 0 \mid \text{data}) \approx 0.99$" rather than relying on null hypothesis rejection.

^ex-mosquito-nets

## Connections

- **[[Directed Acyclic Graphs]]**: DAG analysis identifies which confounders to include in the treatment model; the IPW procedure then closes the backdoor paths by reweighting.
- **[[The Selection Problem]]**: IPW directly targets the selection problem by making the treatment and control groups comparable on observables.
- **[[Conditional Independence Assumption]]**: IPTW achieves conditional independence of treatment and outcome given confounders — exactly CIA — but via pseudo-populations rather than conditioning.
- **[[Bayesian Linear Regression]]**: The Bayesian outcome model is a standard Bayesian regression, just weighted by the IPTWs from each posterior draw.
- **[[Counterfactual Inference]]**: Both approaches estimate causal effects as counterfactual gaps; IPW creates pseudo-populations while counterfactual models predict the missing potential outcome directly.

## See Also

- [[Directed Acyclic Graphs]] — identify confounders and valid adjustment sets before building the treatment model
- [[Conditional Independence Assumption]] — formal condition that IPW satisfies in the pseudo-population
- [[Counterfactual Inference]] — alternative approach: directly model the counterfactual outcome
- [[Differences-in-Differences]] — quasi-experimental alternative when CIA cannot be achieved by observable adjustment
- [[Bayesian Linear Regression]] — the machinery underlying the Bayesian outcome model
