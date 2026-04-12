---
title: Within-Between Persons Causal Inference
tags:
  - source/ingested
  - topic/causal-inference
  - topic/longitudinal-methods
  - type/concept
  - doc/paper
source: "[[Research/Research Methodology/raw/rohrer-murayama-2023.pdf]]"
source_location: "pp. 2–5 (Within-persons not necessary, not sufficient, can be helpful)"
date_ingested: 2026-04-11
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Within-Between Persons Distinction - Overview]]"
  - "[[Potential Outcomes Framework]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Fixed-Effects Model]]"
  - "[[Estimands in Longitudinal Research]]"
aliases:
  - within-persons causal inference
  - between-persons causal inference
  - within vs between persons
---

# Within-Between Persons Causal Inference

> [!summary]
> The within/between-persons distinction matters for causal inference because different types of confounders operate at each level. Between-persons data from randomized experiments recovers average causal effects. Within-persons (fixed-effects) data eliminates time-invariant confounders but not time-varying ones. Neither level is universally superior — the right choice depends on the estimand and the confounding structure of the substantive problem.

## Overview

A **between-persons association** compares how people who differ in their average X differ in their average Y. A **within-persons association** compares how individual $i$'s Y changes when $i$'s X changes from its usual level.

These can be statistically independent and can even have opposite signs — a classic Simpson's paradox situation in longitudinal data.

## Between-Persons Data and Average Causal Effects

> [!theorem] Theorem: Between-Persons Data Under Randomization (pp. 2–3)
> Individual causal effect: $Y_i^{a=1} - Y_i^{a=0}$.
> Average treatment effect (ATE):
> $$
> E[Y^{a=1} - Y^{a=0}] = E[Y^{a=1}] - E[Y^{a=0}]
> $$
> Under randomization (exchangeability: $Y^a \perp\!\!\!\perp A$):
> $$
> = E[Y \mid A=1] - E[Y \mid A=0]
> $$
> **Between-persons comparisons from randomized experiments recover the ATE without requiring longitudinal data.** The consistency assumption ($Y_i^{a=A_i} = Y_i$) and the exchangeability induced by randomization are sufficient.
^between-persons-ATE

Going beyond experiments requires strong assumptions — CIA ([[Conditional Independence Assumption]]), IV ([[Instrumental Variables]]), etc. — that may or may not be defensible.

## Why Within-Persons Data Is Not Necessary

- Randomized experiments are between-persons comparisons and do recover causal effects
- Multiple observations per person are not required for causal inference in the average sense
- The value of longitudinal data is in *enhancing* causal claims (removing certain confounders, tracking dynamics), not in being necessary for them

## Why Within-Persons Data Is Not Sufficient

> [!theorem] Problem: Time-Varying Confounders Survive Within-Person Designs
> Within-persons designs (fixed effects, within-person mean centering) control for **time-invariant** confounders $U$ whose effects do not change over the study duration.
>
> But **time-varying confounders** — events, moods, social circumstances that fluctuate within a person — survive demeaning. They can confound within-person associations even after all between-person variance is removed.
>
> **Example** (talkativeness $X$ and happiness $Y$):
> - Social events on day $t$ increase both $X_t$ and $Y_t$
> - The fixed-effects model demeans each person's $X$ and $Y$, removing stable extraversion
> - But social events (within-person, time-varying) still confound the residual association
^time-varying-confounders

## Why Within-Persons Data Can Be Very Helpful

1. **Removes time-invariant confounders**: Stable personality traits, demographics, genetics — a large and important class of potential confounders — are eliminated by fixed-effects demeaning without having to measure them

2. **Individual-level causal effects**: Longitudinal within-person data enables estimation of individual-level effects $Y_i^{a=1} - Y_i^{a=0}$ for specific people, not just averages

3. **Mechanism and dynamics**: Reciprocal dynamics, mediation pathways, and temporal ordering of cause and effect can only be studied with longitudinal data

## Confounding at Each Level

| Confounding Type | Between-Persons | Within-Persons (FE) |
|-----------------|-----------------|---------------------|
| Time-invariant traits (stable personality) | Confounds (unless randomized) | **Controlled** |
| Time-varying circumstances (social events, moods) | Partially (with covariate adjustment) | **Not controlled** |
| Reciprocal dynamics ($Y \to X$) | Not directly modeled | Not directly modeled (requires CLPM/DPM) |

## The Noncausal Research Question

Not all longitudinal research needs to be causal. Descriptive questions — "what is the age trajectory of happiness on average in this population?" — are legitimate and important. The distinction:
- **Descriptive/predictive**: Associations and trajectories as they are
- **Causal**: What would happen if we intervened to change X?

Problems arise when researchers implicitly claim causal interpretations for noncausal analyses, or use causal language without causal designs.

## Connections
- [[Potential Outcomes Framework]] provides the formal basis for individual and average causal effects
- [[The Selection Problem]] is the core challenge at the between-persons level (without randomization)
- [[Directed Acyclic Graphs]] make the confounding structure explicit for each level
- [[Fixed-Effects Model]] is the canonical implementation of within-persons causal analysis
- [[Cross-Lagged and Dynamic Panel Models]] extend within-persons to lagged reciprocal effects

## See Also
- [[Fixed-Effects Model]] — the within-persons approach, assumptions, and limitations
- [[Estimands in Longitudinal Research]] — how to define the right target before choosing a level
- [[Within-Between Persons Distinction - Overview]] — paper overview
