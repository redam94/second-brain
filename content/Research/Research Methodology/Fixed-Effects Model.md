---
title: Fixed-Effects Model
tags:
  - source/ingested
  - topic/causal-inference
  - topic/longitudinal-methods
  - type/concept
  - doc/paper
source: "[[Research/Research Methodology/raw/rohrer-murayama-2023.pdf]]"
source_location: "Box 1, pp. 4–5"
date_ingested: 2026-04-11
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Within-Between Persons Causal Inference]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Cross-Lagged and Dynamic Panel Models]]"
  - "[[Estimands in Longitudinal Research]]"
aliases:
  - FE model
  - within-person mean centering
  - fixed effects longitudinal
  - within-persons estimator
---

# Fixed-Effects Model

> [!summary]
> The fixed-effects (FE) model (equivalently: within-person mean centering) controls for unobserved time-invariant confounders by focusing only on within-person deviations from individual means. It targets **contemporaneous** effects of X on Y. Key causal assumptions: no lagged dynamics, no time-varying confounders, and homogeneous slopes across persons. Violations of any of these bias the FE estimate.

## Overview

The FE approach demeans each person's observations, removing all between-person variation. Equivalently, person-level dummy variables are included. The estimator then captures the average within-person association between deviations of X and Y from their person-specific means.

It is widely used in economics (panel data), epidemiology, and increasingly in psychology via experience-sampling and diary study designs.

## Causal DAG (Box 1)

> [!definition] Definition: Fixed-Effects Causal Graph
> The standard FE model assumes the DAG (Hamaker & Muthén 2020, adapted in Box 1):
> - $U$ (unobserved time-invariant confounder) → each $X_t$ and each $Y_t$
> - $X_t \to Y_t$ (contemporaneous effect — the estimand)
> - **No cross-lagged paths**: $X_{t-1} \not\to Y_t$, $Y_{t-1} \not\to X_t$
> - **No autoregressive paths among Y**: $Y_{t-1} \not\to Y_t$
> - $X$ treated as exogenous (no arrows from $Y$ to $X$)
>
> By demeaning, the FE estimator controls for $U$ without measuring it. The estimated coefficient on $X_t$ reflects the causal effect of X on Y within persons, **under the stated assumptions**.
^fe-dag

## What FE Controls and Does Not Control

| Source of Variation | FE Controls? | Reason |
|---------------------|-------------|--------|
| Time-invariant confounders ($U$) | **Yes** | Demeaning removes all person-level variance |
| Time-varying confounders | **No** | Vary within-person; survive demeaning |
| Lagged effects ($X_{t-1} \to Y_t$) | **No** | Assumed absent in the FE model |
| Heterogeneous slopes ($\beta_i$) | **No** | FE estimates one average slope for all |
| Reciprocal dynamics ($Y \to X$) | **No** | $X$ treated as exogenous |

## Assumptions for Causal Identification

> [!theorem] FE Causal Assumptions (Box 1)
> For the FE estimate to identify a causal contemporaneous effect of $X$ on $Y$:
> 1. **No lagged dynamics**: $X_{t-1}$ does not affect $Y_t$ (no cross-lagged paths from X to Y); $Y_{t-1}$ does not affect $Y_t$ beyond what is already captured (no autoregressive paths among Y that would create endogeneity)
> 2. **Strict exogeneity / no time-varying confounders**: All confounders affecting both $X_t$ and $Y_t$ have **constant effects** over the study duration (so they are removed by demeaning)
> 3. **Homogeneous slopes**: The within-person effect of $X$ on $Y$ is the same for all individuals (no heterogeneous $\beta_i$)
^fe-assumptions

## Limitations

1. **Lagged dynamics**: If talkativeness today causally affects well-being tomorrow (not just today), the FE contemporaneous estimate misses this causal pathway entirely

2. **Time-varying confounders**: Social events, stress, fatigue — anything that changes within a person and affects both $X$ and $Y$ — confounds the within-person estimate

3. **Heterogeneous slopes**: Different people may have different $X \to Y$ effects. FE estimates a population average that may not represent anyone's true effect. If slope heterogeneity correlates with X levels, estimates are further biased (Rüttenauer & Ludwig 2020)

4. **No reciprocal dynamics**: The FE model treats X as exogenous — it cannot model the feedback loop $Y \to X$ that is often theoretically important in psychology

5. **Consistency**: The causal effect only makes sense if there is a well-defined intervention on X (see [[Estimands in Longitudinal Research]], Box 4 on psychological interventions)

## Connections
- The canonical within-persons approach; see [[Within-Between Persons Causal Inference]] for when it helps
- The DAG formalises assumptions in [[Directed Acyclic Graphs]] notation
- Compare to [[Cross-Lagged and Dynamic Panel Models]] — for lagged and reciprocal effects
- In economics: FE is standard for panel data with unobserved heterogeneity; see [[Regression and the CEF]] for the CEF interpretation

## See Also
- [[Cross-Lagged and Dynamic Panel Models]] — for lagged reciprocal effects; addresses some FE limitations
- [[Within-Between Persons Causal Inference]] — when FE is and is not sufficient for causal claims
- [[Estimands in Longitudinal Research]] — how to define the right target before choosing FE
- [[Directed Acyclic Graphs]] — the formal causal graph underlying FE
