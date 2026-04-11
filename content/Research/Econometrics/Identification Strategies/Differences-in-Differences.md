---
title: "Differences-in-Differences"
aliases:
  - DD
  - Diff-in-Diff
  - DiD
  - Fixed Effects
  - Panel Data
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/panel-data
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
folder: "Econometrics/Identification Strategies"
doc_type: concept
source_location: "MHE Ch. 5, pp. 165-186"
depends_on:
  - "[[The Selection Problem]]"
  - "[[Regression and the CEF]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Bayesian Difference in Differences]]"
  - "[[Standard Errors and Clustering]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
  - "[[Generalized Synthetic Control Method]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
---

# Differences-in-Differences

> [!summary]
> DD strategies use data with a time or cohort dimension to control for unobserved-but-fixed omitted variables. The key assumption is **common trends**: treatment and control groups would follow parallel paths in the absence of treatment.

## Individual Fixed Effects

For panel data with individual $i$ observed at time $t$:

$$Y_{it} = \alpha_i + \lambda_t + \rho D_{it} + X_{it}\delta + \varepsilon_{it}$$

- $\alpha_i$: individual fixed effect (absorbs all time-invariant unobservables)
- $\lambda_t$: year effect (common time trend)
- Estimation: **deviations from means** (subtract individual averages) or **first-differencing**

> [!warning] Attenuation Bias
> Fixed effects estimates are susceptible to attenuation from measurement error — year-to-year changes in mismeasured variables are mostly noise.

## The DD Setup

When treatment varies at a group level (e.g., state policy changes):

$$Y_{ist} = \gamma_s + \lambda_t + \beta D_{st} + \varepsilon_{ist}$$

The DD estimator:
$$\hat{\beta}_{DD} = (\bar{Y}_{treat,after} - \bar{Y}_{treat,before}) - (\bar{Y}_{control,after} - \bar{Y}_{control,before})$$

### Key Example: Minimum Wage (Card & Krueger, 1994)
- NJ raised minimum wage from $4.25 to $5.05; PA did not
- DD estimate: employment *increased* by 2.76 FTE in NJ relative to PA
- Challenges the standard competitive labor market prediction

## Common Trends Assumption

The identifying assumption: $E(Y_{0ist}|s,t) = \gamma_s + \lambda_t$

- Treatment and control groups can have different *levels* but must share the same *trend*
- Testable with pre-treatment data (look for parallel pre-trends)
- State-specific trends as robustness check (requires 3+ periods)

## Regression DD

$$Y_{ist} = \alpha + \gamma \cdot NJ_s + \lambda \cdot d_t + \beta(NJ_s \cdot d_t) + \varepsilon_{ist}$$

Advantages:
- Easy to add covariates, additional states, and time periods
- Facilitates continuous "treatment intensity" designs
- Can include leads and lags to test for pre-trends

## Fixed Effects vs. Lagged Dependent Variables

- If unobserved $a_i$ is the confounder → use **fixed effects**
- If past outcomes predict treatment → use **lagged dependent variable**
- These bracket the true effect: one tends to overestimate, the other underestimate

## See Also

- [[The Experimental Ideal]] — the benchmark DD approximates
- [[Instrumental Variables]] — alternative quasi-experimental design
- [[Regression Discontinuity Designs]] — another strategy when treatment follows a rule
- [[Conditional Independence Assumption]] — what DD relaxes by using panel structure
- [[Omitted Variables Bias]] — the confounder fixed effects absorb
- [[Standard Errors and Clustering]] — clustering at the group level is essential for DD
- [[Research Questions in Econometrics]] — FAQ #3: identification strategies
- [[Mostly Harmless Econometrics - Overview]]
- [[Hierarchical Linear Models]] — Bayesian multilevel approach to varying intercepts and panel data
- [[Model Checking]] — posterior predictive checks for validating common trends assumptions
