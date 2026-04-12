---
title: "Survival Analysis"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/survival-analysis
  - topic/time-to-event
  - topic/cox-model
  - type/concept
  - doc/paper
source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6110618/"
date_ingested: 2026-04-08
folder: "Research Methodology/Experimental Design"
aliases:
  - "Time-to-event analysis"
  - "Kaplan-Meier"
  - "Cox proportional hazards"
  - "Hazard ratio"
  - "Censoring"
doc_type: overview
source_location: "PMC6110618 (review article)"
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Regression and the CEF]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Multiple Testing Corrections]]"
---

# Survival Analysis

> [!summary]
> Survival analysis studies the time until an event of interest occurs. Its defining feature is **censoring** — some subjects don't experience the event during the study, so their exact event time is unknown. The three core methods are Kaplan-Meier estimation, the log-rank test, and Cox proportional hazards regression.

## Core Concepts

### Survival Function $S(t)$

The probability of surviving (no event) past time $t$:

$$
S(t) = P(T > t)
$$

Displayed as a step-function that declines at each event time.

### Hazard Function $h(t)$

The instantaneous rate of event occurrence at time $t$, given survival to $t$:

$$
h(t) = \lim_{\Delta t \to 0} \frac{P(t \leq T < t + \Delta t \mid T \geq t)}{\Delta t}
$$

The **hazard ratio (HR)** compares hazard rates between groups — HR > 1 means higher event rate.

### Censoring

| Type | Description |
|------|-------------|
| **Right censoring** | Event hasn't occurred by study end or subject lost to follow-up (most common) |
| **Left censoring** | Event occurred before observation began |
| **Interval censoring** | Event occurred between two known timepoints |

> [!warning]
> Censoring must be **noninformative** — the reason for censoring should be unrelated to the event risk. If sicker patients drop out more (informative censoring), results are biased.

## The Three Core Methods

### 1. Kaplan-Meier Estimator

Nonparametric estimate of $S(t)$:

$$
\hat{S}(t) = \prod_{t_i \leq t} \left(1 - \frac{d_i}{n_i}\right)
$$

where $d_i$ = events at time $t_i$ and $n_i$ = subjects at risk just before $t_i$.

- Produces the familiar step-function survival curve
- Reports **median survival** (time when $\hat{S}(t) = 0.5$) and survival at fixed timepoints (e.g., 5-year survival)
- Cannot adjust for covariates

### 2. Log-Rank Test

Tests $H_0$: no difference in survival between groups.

- Compares the *entire* survival distribution, not just specific timepoints
- Distribution-free (no parametric assumptions)
- **Limitation**: poor power when survival curves cross (one group favored early, another late)
- Cannot estimate effect size or adjust for confounders

### 3. Cox Proportional Hazards Model

The workhorse for multivariable survival analysis:

$$
h(t \mid X) = h_0(t) \exp(\beta_1 X_1 + \beta_2 X_2 + \ldots + \beta_p X_p)
$$

- $h_0(t)$: baseline hazard (left unspecified — semiparametric)
- $\exp(\beta_j)$: hazard ratio for covariate $X_j$
- Adjusts for confounders while estimating treatment effects
- **No distributional assumptions** on survival times

#### Proportional Hazards Assumption

> [!warning]
> The model assumes that hazard ratios are **constant over time**. If the treatment effect changes over the study period (e.g., surgery helps early but not late), the PH assumption is violated. Always test this before interpreting results.

## When to Use Each

| Method | Purpose | Covariates? | Effect size? |
|--------|---------|-------------|-------------|
| **Kaplan-Meier** | Visualize & describe survival | No | No |
| **Log-Rank** | Compare groups (unadjusted) | No | No |
| **Cox PH** | Multivariable analysis | Yes | Yes (HR) |

## Sample Size for Survival Studies

Power depends on the **number of events**, not total sample size:
1. Calculate events needed to detect a minimum HR at desired power
2. Estimate proportion of subjects who will experience the event
3. Derive total sample size

**Rule of thumb**: at least 10 events per covariate in a Cox model.

## Advanced Extensions

- **Parametric models**: Weibull, exponential — more efficient if distributional assumptions hold
- **Competing risks**: multiple event types that preclude each other (e.g., death from cancer vs. death from other causes)
- **Recurrent events**: events that can happen multiple times (e.g., hospitalizations)
- **Frailty models**: random effects for clustered data (analogous to [[Hierarchical Models]])

## Connection to Bayesian Methods

Bayesian survival analysis places priors on hazard functions or regression coefficients:
- **Bayesian Cox models**: priors on $\beta$ provide regularization, especially useful with many covariates
- **Nonparametric Bayesian**: [[Nonparametric Models Overview|Dirichlet process]] priors on the baseline hazard
- Posterior predictive checks ([[Model Checking]]) apply directly — simulate event times and compare to data

## See Also

- [[The Experimental Ideal]] — experimental design that survival analysis often evaluates
- [[Generalized Linear Models]] — Cox model shares the GLM structure
- [[Missing Data Models]] — censoring is a form of missing data
- [[Power Analysis and Sample Size]] — sample size calculation for survival studies
