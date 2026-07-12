---
title: "Bayesian Propensity Scores and Inverse Probability Weights"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - topic/propensity-score
  - topic/ipw
  - type/concept
  - doc/tutorial
source: "[[Clippings/How to use Bayesian propensity scores and inverse probability weights]]"
source_location: "Heiss (2021) blog post; Liao & Zigler (2020) §2-3"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: concept
depends_on:
  - "[[Propensity Score in Bayesian CI]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Frequentist Causal Estimation]]"
used_by:
  - "[[Bayesian Outcome Models]]"
aliases:
  - Bayesian IPW
  - Liao-Zigler two-stage Bayesian IPW
  - Bayesian inverse probability weights
---

# Bayesian Propensity Scores and Inverse Probability Weights

> [!summary]
> Combining Bayesian inference with inverse probability weighting (IPW) is non-trivial: under ignorability the propensity score drops from the Bayesian likelihood, so standard IPW cannot be directly plugged in. Liao & Zigler (2020) propose a two-stage procedure — fit a Bayesian treatment model (stage 1), then plug posterior-predictive propensity score draws into the outcome model (stage 2) — which propagates uncertainty from the design stage through to causal estimates. Implemented in **brms** by Heiss (2021).

## The Problem

In Frequentist causal inference, the classic IPW workflow is:
1. Fit a logistic treatment model to get propensity scores $\hat{e}(X_i) = \Pr(Z_i = 1 \mid X_i)$
2. Compute IPTW: $w_i = \dfrac{Z_i}{\hat{e}(X_i)} + \dfrac{1 - Z_i}{1 - \hat{e}(X_i)}$
3. Weight the outcome model by $w_i$

Naively applying this in a Bayesian framework fails: Robins, Hernán & Wasserman show that Bayesian inference must ignore the propensity score when the model is correctly specified — the likelihood for $Y$ under ignorability depends only on the outcome model, not on $e(X)$. Plugging a point-estimate propensity score into a Bayesian outcome model ignores uncertainty in stage 1 and produces overconfident posteriors.

## Liao-Zigler Two-Stage Solution

**Liao, S. X. & Zigler, C. M. (2020). Uncertainty in the design stage of two-stage Bayesian propensity score analysis.** *Statistics in Medicine*, 39(17), 2305–2320.

The solution propagates uncertainty across both stages:

**Stage 1 — Bayesian treatment model:**
$$\text{logit}\,\Pr(Z_i = 1 \mid X_i) = \alpha_0 + \alpha' X_i$$

Fit with Bayesian priors on $\alpha$. Draw $S$ posterior samples $\{\alpha^{(s)}\}_{s=1}^S$. For each draw, compute $e^{(s)}(X_i) = \text{logistic}(\alpha_0^{(s)} + \alpha'^{(s)} X_i)$ and the weights $w_i^{(s)}$.

**Stage 2 — Bayesian outcome model with propagated uncertainty:**
For each posterior draw $s$, compute the weighted posterior for the outcome model:

$$Y_i \mid Z_i, X_i, w_i^{(s)} \sim \mathcal{N}(\mu_0 + \mu_T Z_i, \sigma^2)$$

weighted by $w_i^{(s)}$. The final causal estimate $\hat{\tau}^{\text{Bayesian-IPW}}$ averages over the joint uncertainty from both stages.

This is **not a joint Bayesian model** — it avoids the feedback problem (see [[Propensity Score in Bayesian CI#Strategy 1]]) by keeping the two stages separate while propagating uncertainty via posterior draws.

> [!definition] Definition: Liao-Zigler Estimator
> The two-stage Bayesian IPW estimator is:
> $$\hat{\tau}^{\text{LZ}} = \frac{1}{S}\sum_{s=1}^S \hat{\tau}^{\text{IPW}}(w^{(s)})$$
> where $w^{(s)}$ are IPT weights derived from the $s$-th posterior draw of the propensity score model.
^liao-zigler-estimator

## Implementation (brms)

Heiss (2021) implements this in R using **brms** for both stages:

```r
# Stage 1: Bayesian treatment model
model_treatment <- brm(
  treatment ~ confounders,
  family = bernoulli(link = "logit"),
  data = df,
  chains = 4
)

# Extract posterior propensity scores
ps_draws <- posterior_epred(model_treatment)  # S × N matrix
# Compute IPTW for each draw
iptw_draws <- apply(ps_draws, 1, function(ps) {
  df$treatment / ps + (1 - df$treatment) / (1 - ps)
})

# Stage 2: Weighted outcome model for each draw (or use average weights)
mean_weights <- rowMeans(iptw_draws)
model_outcome <- brm(
  outcome ~ treatment,
  data = df,
  prior = c(prior(normal(0, 1), class = b)),
  data2 = list(weights = mean_weights)
)
```

## Relationship to Other Bayesian Strategies

| Strategy | How propensity score enters | Reference |
|----------|---------------------------|-----------|
| Covariate in outcome model | $\hat{e}(X)$ as predictor in $\mu$ | Zigler (2016); BCF |
| Dependent priors | Joint prior on $(\alpha, \beta)$ | Antonelli et al. (2019) |
| Posterior predictive IPW (Liao-Zigler) | Draw $w^{(s)}$ from stage 1 posterior | Liao & Zigler (2020) |

For the full taxonomy of strategies, see [[Propensity Score in Bayesian CI]].

## Connections

- [[Propensity Score in Bayesian CI]] — comprehensive treatment of all three Bayesian propensity score strategies (Strategy 3 is this approach)
- [[Frequentist Causal Estimation]] — Hájek IPW estimator this Bayesian version generalizes
- [[General Structure of Bayesian CI]] — why propensity score drops from the likelihood under ignorability
- [[Bayesian Outcome Models]] — alternative Bayesian strategy that models outcomes directly

## See Also

- [[Clippings/How to use Bayesian propensity scores and inverse probability weights]] — full Heiss (2021) tutorial with worked R/brms code
- [[Sensitivity Analysis in Observational Studies]] — when unconfoundedness fails after weighting
