---
title: Estimands in Longitudinal Research
tags:
  - source/ingested
  - topic/causal-inference
  - topic/longitudinal-methods
  - type/concept
  - doc/paper
source: "[[Research Methodology/raw/rohrer-murayama-2023.pdf]]"
source_location: "pp. 7–11 (Setting the analysis goal; Making the most of within-persons data)"
date_ingested: 2026-04-11
date_updated: 2026-07-27
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Within-Between Persons Distinction - Overview]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Causal Estimands]]"
used_by: []
aliases:
  - longitudinal estimands
  - estimands psychological research
  - theoretical estimand longitudinal
---

# Estimands in Longitudinal Research

> [!summary]
> Rohrer & Murayama argue that researchers should begin with a well-defined theoretical estimand — a causal quantity that exists outside any statistical model — before choosing a longitudinal design or analysis. The estimand determines which assumptions are needed, which design is appropriate, and how to interpret model coefficients. Applying a "sophisticated" longitudinal model without a clear estimand often produces results whose causal meaning is uncertain.

## Overview

Psychological research often applies longitudinal models (fixed effects, CLPM, dynamic panel) as defaults — because they seem methodologically rigorous, because journals reward them, or because they are the "new" thing. But causal inference requires more: a precisely defined causal quantity that the analysis is designed to recover.

Insufficient conceptual clarity leads to:
1. Contradictory results across studies (different analysts implicitly target different estimands)
2. Inability to adjudicate methodological debates (which depend on which effect is at stake)
3. Model coefficients misinterpreted as causal effects when they capture something else

## The Theoretical Estimand

> [!definition] Definition: Theoretical Estimand
> A causal quantity defined in terms of potential outcomes that exists outside any statistical model — it is a property of the world.
>
> For a binary treatment: $\tau = E[Y^{a=1} - Y^{a=0}]$
>
> For longitudinal settings, the estimand should specify:
> - **What intervention** is being considered (e.g., "fix talkativeness to high vs. low for one hour")
> - **At what time** the outcome is measured (e.g., "immediately after" vs. "one week later")
> - **For whom** (ATE, ATT, individual-level effect)
> - **Under what conditions** (what else is allowed to vary)
^theoretical-estimand

Once the estimand is set, the statistical model is just a tool for estimating it — not a substitute for the conceptual work.

## Why Estimands Come First

The estimand clarifies:
- **Whether the question is causal at all**: Many questions in psychology are descriptive (trajectories, predictions) and should not be dressed up as causal
- **Which design is appropriate**: Randomized experiment vs. longitudinal observational vs. cross-sectional
- **Which statistical model is appropriate**: FE vs. CLPM vs. DPM vs. regression
- **What time scale matters**: The lag between cause and effect determines measurement frequency
- **What confounders matter**: Time-invariant vs. time-varying, depending on the causal pathway

## The Recommended Workflow

1. **Define the estimand**: What causal effect are you trying to estimate? Use potential outcomes notation.
2. **Identify required assumptions**: What conditions must hold for the estimand to be identified from data?
3. **Assess plausibility**: Are those assumptions defensible given the setting and available data?
4. **Choose design and model**: Select the study design and statistical model that, under the stated assumptions, recovers the estimand.
5. **Interpret results**: Map model coefficients back to the estimand — be explicit about what they do and do not tell us.

## Challenges for Psychological Constructs

> [!theorem] Problem: Consistency in Psychology (Box 4)
> The potential outcomes framework requires **consistency**: $Y_i^{a=A_i} = Y_i$. This assumes the treatment is well-defined — the same intervention for everyone, with no side effects that differ across individuals.
>
> Psychological variables are often **"fat-handed"** treatments (Eronen 2020): different ways of inducing high talkativeness (genetic, situational, conversational encouragement) may have different effects on downstream outcomes. This violates consistency, making causal effects ill-defined.
>
> **Implication**: Causal inference is easier for concrete, manipulable interventions than for abstract psychological constructs. Researchers should try to be specific about *which version* of the treatment is implicitly being contemplated.
^consistency-psychology

> [!theorem] Problem: The Causal Web
> In psychology, variables are embedded in dense causal webs. An intervention on talkativeness may simultaneously affect extraversion expression, social network dynamics, and self-perception. The causal effect of the intervention reflects all these pathways, not just the direct $X \to Y$ link. This makes it hard to pin down which hypothetical states of the world are being contrasted.
^causal-web

## Time Lag and Measurement Frequency

The appropriate measurement lag depends on the true time scale of the causal effect. Key considerations:
- If the effect is contemporaneous (instantaneous), the cross-lagged model misses it
- If the effect operates over months, daily diary measurements cannot detect it
- High-frequency sampling may overburden participants and interfere with the causal system (e.g., repeatedly asking about mood changes mood)

## The Case Against "Describe First, Infer Later"

Some argue researchers should always start with descriptive analyses before attempting causal ones. Rohrer & Murayama are skeptical of this as a general strategy:
- Descriptive and causal models are often differently specified (different covariates, lags)
- Committing to a causal estimand upfront forces researchers to be explicit about assumptions
- Pre-specifying the estimand reduces researcher degrees of freedom

## Connections
- Extends [[Causal Estimands]] to the longitudinal setting
- The consistency challenge connects to Box 4 discussion of causal graph approaches (Pearl) vs. potential outcomes (Hernán & Robins)
- [[Garden of Forking Paths]] — without a pre-specified estimand, the menu of longitudinal models creates analytic flexibility
- [[Researcher Degrees of Freedom]] — post-hoc model selection from FE/CLPM/DPM inflates error rates
- [[Potential Outcomes Framework]] — the formal basis for all estimand definitions here
- [[Counterfactual Inference]] — the underlying logic

## See Also
- [[Within-Between Persons Distinction - Overview]] — paper overview and three main claims
- [[Fixed-Effects Model]] — one answer to a specific class of (contemporaneous, within-person) estimands
- [[Cross-Lagged and Dynamic Panel Models]] — models for lagged reciprocal estimands
- [[Within-Between Persons Causal Inference]] — how each level helps for different estimands
- [[Table 2 Fallacy]] — estimand ambiguity in multi-covariate regression: which coefficient is the "target" estimand?
- [[Survival Analysis]] — the ICH E9(R1) estimand framework extends to time-to-event outcomes; hazard ratios conflate estimand and estimator
