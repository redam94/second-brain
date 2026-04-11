---
title: "CausalImpact Empirical Application"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/time-series
  - topic/bayesian-statistics
  - type/example
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "§4, pp. 264-267"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[Counterfactual Impact Estimation]]"
  - "[[Spike-and-Slab Prior for Covariate Selection]]"
used_by: []
aliases:
  - CausalImpact advertising example
  - Google advertising campaign CausalImpact
---

# CausalImpact Empirical Application

> [!summary]
> Brodersen et al. demonstrate CausalImpact on a Google advertiser's online advertising campaign: 6-week geo-targeted campaign across US designated market areas (DMAs). Three analyses — randomized controls, observational controls, and a placebo test — all yield consistent results, validating that the counterfactual approach works even without a randomized control group.

## Setup

**Intervention:** Online advertising campaign run by a Google advertiser. Product-related ads displayed alongside Google search results for specific keywords, for 6 consecutive weeks, geo-targeted to 95 out of 190 DMAs (randomized treatment-control assignment).

**Outcome:** Total search-related visits to the advertiser's website (organic + paid clicks).

**Pre-intervention period:** ~1 year of baseline data before campaign launch.

**Model configuration:**
- Structural block 1: Local level component with inverse-Gamma prior ($s/\nu = 0.1\sigma_y$, $\nu = 32$)
- Structural block 2: Static regression component with spike-and-slab prior ($M = 3$ expected predictors, expected $R^2 = 0.8$, prior $df = 50$)
- 10,000 MCMC iterations

## Analysis 1: Randomized Control (Best Case)

**Control set:** Untreated DMAs (randomly assigned — gold standard).

> [!example] Example: Advertising Effect with Randomized Controls
> **Pre-campaign fit:** Excellent — model accurately tracks pre-campaign trajectory including spike in "week −2" and dip in "week −1".
>
> **Post-campaign:** Observed clicks consistently *higher* than counterfactual predictions.
>
> **Estimated effect:** Cumulative lift of **88,400 additional clicks** (**22% increase**, central 95% CI: [13%, 30%]).
>
> **Timing:** Effect peaked ~3 weeks into campaign, faded ~1 week after campaign end.
>
> **Comparison to classical analysis:** Two-stage linear model (Vaver & Koehler 2011) estimated 84,700 clicks, 95% CI [19%, 22%]. CausalImpact estimate deviates by < 5%, but produces *wider* intervals (correctly representing posterior uncertainty rather than confidence intervals).

## Analysis 2: Observational Controls

**Control set:** Keyword search volume for advertiser's industry (Google Trends data) — discarding randomized control regions entirely.

> [!example] Example: Advertising Effect with Observational Controls
> **Key advantage:** Industry search series capture non-seasonal variation and market-specific trends.
>
> **Estimated effect:** Cumulative lift of **85,900 additional clicks** (**21% increase**, central 95% CI: [12%, 30%]).
>
> **Comparison to Analysis 1:** Virtually identical estimate (deviation < 1%), demonstrating that observational controls can substitute for randomized controls in this setting.
>
> **Interpretation:** Publicly available Google Trends data make this approach broadly applicable even when randomization is infeasible.

## Analysis 3: Placebo Test

**Target:** Untreated (control) DMAs — should show *no* effect since they received no intervention.

> [!example] Example: Placebo Test for Causal Specificity
> **Estimated effect:** 2% lift [-6%, 10%] in clicks in untreated regions.
>
> **Result:** Not significant (95% CI crosses zero).
>
> **Interpretation:** Confirms that the campaign effect is specific to treated regions. No evidence of spillover or confounding by industry-wide trends.

## Model Priors Used

| Component | Prior |
|-----------|-------|
| Local level diffusion variance | Inverse-Gamma: $s/\nu = 0.1\sigma_y$, $\nu = 32$ |
| Expected model size | $M = 3$ |
| Expected $R^2$ | 0.8 |
| Prior $df$ | 50 |

**Why static regression:** The large number of control regions (up to 190 DMAs) makes static regression coefficients an appropriate choice; covariate stability is high since controls are of the same type as the treatment metric.

## Key Takeaways

1. **Observational ≈ Randomized:** Using industry keyword searches as controls yields nearly identical estimates to using randomized controls — the model's spike-and-slab prior selects the right predictors
2. **Placebo validates specificity:** Null result in untreated regions confirms the effect is causal (not an industry-wide trend)
3. **Uncertainty quantification:** CausalImpact produces posterior intervals that correctly widen slowly (high pre-campaign predictive strength → narrow intervals)
4. **Practical:** Full analysis in < 30 seconds using CausalImpact R package

## Connections

- Uses [[Counterfactual Impact Estimation]] framework (pointwise + cumulative impact)
- Uses [[Spike-and-Slab Prior for Covariate Selection]] to select control series
- Validates [[Bayesian Structural Time-Series Model]] against randomized experiment

## See Also

- [[Brodersen 2015 - Overview]] — paper context
- [[Counterfactual Impact Estimation]] — methodology for computing the causal effect
