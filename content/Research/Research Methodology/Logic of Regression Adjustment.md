---
title: "Logic of Regression Adjustment"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/research-methodology
  - type/concept
  - doc/article
source: "[[raw/These Are Not the Effects You Are Looking For]]"
source_location: "The Logic of Regression Adjustment"
date_ingested: 2026-06-26
folder: "Research Methodology"
doc_type: article
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[DAGs and Causal Identification]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Table 2 Fallacy]]"
  - "[[Bayesian Inverse Probability Weighting]]"
  - "[[Nuisance Parameter Bias Simulation]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
aliases:
  - regression adjustment
  - statistical control
  - backdoor regression
---

# Logic of Regression Adjustment

> [!summary]
> Regression adjustment uses measured confounders to identify the causal effect of a treatment by blocking backdoor paths in a DAG. It recovers the Population Average Treatment Effect (PATE) for the primary treatment — not for the confounders themselves. The adjustment set is a methodological tool for a single causal path, not a license to interpret all included coefficients.

## Overview

Regression adjustment is one of several strategies — alongside randomization, propensity-score weighting, and matching — for estimating causal effects from observational data. Its logic stems from the potential outcomes framework (Rubin 1974, 1976) and is made precise by DAG-based identification theory (Pearl).

The key insight: **adjusting for confounders $\mathcal{Z}$ makes treatment assignment "as good as random" conditional on $\mathcal{Z}$**, thus isolating the causal path $X \to Y$.

## Potential Outcomes Setup

Following Rubin's potential outcomes framework, define:
- $Y_i$: observed outcome for unit $i$
- $X_i \in \{0, 1\}$: observed treatment status
- $Z$: set of measured confounders influencing both treatment assignment and outcome

> [!definition] Potential Outcomes Causal Effect
> The **unit-level causal effect** of treatment $X$ is the difference in potential outcomes:
> $$
> Y_i(X_i = 1, Z_i) - Y_i(X_i = 0, Z_i)
> $$
> Since we observe each unit under only one treatment status (the **fundamental problem of causal inference**), unit-level effects are unobservable. We target population-level summaries instead.
^def-potential-outcomes-effect

> [!definition] Population Average Treatment Effect (PATE)
> In a Bayesian framework, the posterior distribution of the **PATE** is:
> $$
> \text{PATE} = \int E\left[Y_{ij}(X_{ij} = 1, Z_{ij})\right] - E\left[Y_{ij}(X_{ij} = 0, Z_{ij})\right] \, dZ_{ij}
> $$
> This is the expected change in outcome if *all* units were treated versus if *no* units were treated, integrated over the distribution of confounders $Z$.
^def-pate

## What Regression Adjustment Identifies

Given the simple confounded DAG $X \leftarrow Z \to Y$ with unobserved confounder $U$ creating $Z \leftarrow U \to Y$, the backdoor criterion requires conditioning on $Z$ to block the path $X \leftarrow Z \to Y$. After adjustment:

$$
E[Y \mid X, Z] = \alpha + \beta_X X + \beta_Z Z + \ldots
$$

The coefficient $\beta_X$ consistently estimates the causal effect of $X$ on $Y$ **if**:
1. The conditional independence assumption (CIA) holds: $Y(x) \perp X \mid Z$
2. $Z$ is sufficient to block all backdoor paths into $X$
3. Overlap: $0 < P(X = 1 \mid Z) < 1$ for all values of $Z$

Under these conditions, $\beta_X$ recovers the causal effect of $X \to Y$. The coefficient $\beta_Z$, however, does **not** recover the causal effect of $Z \to Y$ — because the CIA was invoked for $X$, not for $Z$.

> [!theorem] Single-Path Identification
> Let $\mathcal{Z}$ be a valid adjustment set satisfying the backdoor criterion for the causal path $X \to Y$. Then regression of $Y$ on $X$ and $\mathcal{Z}$ identifies the causal effect $X \to Y$. It does **not** identify the causal effect of any $z_k \in \mathcal{Z}$ on $Y$ unless a separate valid adjustment set for the path $z_k \to Y$ is also conditioned on.
^thm-single-path

## The Adjustment Set as a Sacrifice

Nafa (2022) frames the adjustment set not as a collection of "co-causes" to be interpreted, but as a *sacrifice*: variables we include specifically and only to block confounding paths for the treatment we care about.

> The relationship between treatment and outcome is the path we care about and the adjustment set is a sacrifice we make on the altar of causal identification.
> — A. Jordan Nafa (2022)

This reframing has practical implications:
- **Choose the adjustment set based on DAG analysis** — not on whether variables "seem important" or "have large coefficients"
- **Minimal sufficient adjustment sets** are preferable: include only what is needed to block backdoor paths
- **Do not include colliders** or descendants of colliders (conditioning on them opens new biasing paths)
- **Avoid the kitchen-sink approach**: adding more variables does not necessarily improve causal identification

## Strategies for Causal Identification of Multiple Paths

If a researcher genuinely wants causal estimates for *both* $X \to Y$ and $Z \to Y$, they must:

1. Specify a separate DAG analysis for the path $Z \to Y$
2. Find a valid adjustment set $\mathcal{W}$ satisfying the backdoor criterion for $Z \to Y$ (which may differ from $\mathcal{Z}$)
3. Defend the identifying assumptions for both paths separately
4. Fit separate models or use a joint identification strategy

Identifying multiple paths simultaneously requires all of:
- Separate exogenous variation for each path of interest (e.g., multiple instruments)
- Strong domain-theoretic justification for independence of unobserved confounders
- Or experimental / quasi-experimental designs that address each path independently

## Connections

- [[DAGs and Causal Identification]] — Provides the formal backdoor criterion and rules for valid adjustment sets
- [[Potential Outcomes Framework]] — The PATE definition and potential outcomes notation underpinning this framework
- [[Table 2 Fallacy]] — The downstream error: misinterpreting confounder coefficients as causally identified
- [[Bayesian Inverse Probability Weighting]] — An alternative adjustment strategy using propensity scores; same identification conditions apply
- [[The Selection Problem]] — Why adjustment is necessary: non-random treatment assignment creates backdoor paths

## See Also

- [[Conditional Independence Assumption]] — The CIA / unconfoundedness assumption required for regression adjustment
- [[Omitted Variables Bias]] — What happens when adjustment set $\mathcal{Z}$ is *insufficient* (fails to block all backdoor paths)
- [[Regression and the CEF]] — The statistical relationship between regression and the Conditional Expectation Function
- [[CUPED and Regression-Adjusted Variance Reduction]] — adjustment for precision rather than identification
