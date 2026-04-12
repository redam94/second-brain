---
title: Cross-Lagged and Dynamic Panel Models
tags:
  - source/ingested
  - topic/causal-inference
  - topic/longitudinal-methods
  - type/concept
  - doc/paper
source: "[[Research/Research Methodology/raw/rohrer-murayama-2023.pdf]]"
source_location: "Box 2 (pp. 5–6), Box 3 (p. 7)"
date_ingested: 2026-04-11
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Fixed-Effects Model]]"
  - "[[Within-Between Persons Causal Inference]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Estimands in Longitudinal Research]]"
aliases:
  - CLPM
  - cross-lagged panel model
  - dynamic panel model
  - DPM
  - RI-CLPM
  - random intercept cross-lagged panel model
---

# Cross-Lagged and Dynamic Panel Models

> [!summary]
> The cross-lagged panel model (CLPM) and dynamic panel model (DPM) both target **lagged reciprocal** causal effects in longitudinal data. The CLPM does not control for stable time-invariant confounders (traits), causing its cross-lagged paths to absorb between-person trait variance. The DPM (including the random intercept CLPM) extends CLPM to control for these, combining advantages of FE and CLPM. Both models assume no contemporaneous causal effects — an assumption often violated in psychological data.

## Cross-Lagged Panel Model (CLPM)

> [!definition] Definition: CLPM Structure (Box 2)
> The CLPM models reciprocal lagged effects between $X$ and $Y$:
> - $X_{t-1} \to Y_t$ (cross-lagged: past X predicts current Y)
> - $Y_{t-1} \to X_t$ (cross-lagged: past Y predicts current X)
> - $X_{t-1} \to X_t$ (autoregressive path)
> - $Y_{t-1} \to Y_t$ (autoregressive path)
> - Unobserved $U$ may confound $X_t$ and $Y_t$
>
> The CLPM targets **Granger causality**: $X$ Granger-causes $Y$ if past $X$ predicts current $Y$ controlling for past $Y$. Granger causality implies predictability, and implies causation only when additional assumptions are met.
^clpm-definition

### CLPM Bias from Stable Trait Confounders

> [!theorem] CLPM Bias (Box 2, Fig. 2b)
> If individuals have stable traits $U_X$ and $U_Y$ that persistently influence $X$ and $Y$ respectively (e.g., extroverts are habitually talkative and habitually happier), these create a confounding path:
> $$
> U_X \to X_{t-1} \to Y_t \leftarrow U_Y
> $$
> The CLPM does not control for $U_X$ or $U_Y$. Their influence inflates or deflates estimated cross-lagged paths. The CLPM conflates trait-level between-person associations with genuine lagged within-person causal effects.
^clpm-bias

## Dynamic Panel Model (DPM)

> [!definition] Definition: DPM Structure (Box 3)
> The DPM (Lüdtke & Robitzsch 2022; Usami et al. 2019; also implemented as the **random intercept CLPM, RI-CLPM** — Hamaker et al. 2015) addresses the CLPM's failure to control for stable traits by:
> - Adding person-specific random intercepts (latent means) for both $X$ and $Y$
> - These intercepts absorb $U_X$ and $U_Y$, removing stable trait confounding
> - Cross-lagged paths then reflect within-person lagged effects, not between-person trait differences
>
> The DPM thus combines: FE model's control for time-invariant confounders + CLPM's lagged reciprocal structure.
^dpm-definition

## Comparison of the Three Models

| Feature | FE Model | CLPM | DPM / RI-CLPM |
|---------|---------|------|---------------|
| Target | Contemporaneous effects | Lagged reciprocal | Lagged reciprocal |
| Controls time-invariant confounders | **Yes** | **No** | **Yes** |
| Controls time-varying confounders | No | No | No |
| Models reciprocal dynamics | No | Yes | Yes |
| Allows heterogeneous slopes | No | No | No |
| Key violated assumption | Lagged dynamics | Stable traits confound | Contemporaneous effects |

## Shared Critical Assumption: No Contemporaneous Effects

All three models assume that X and Y do not causally influence each other **at the same time point**. In psychology, this is frequently violated:
- Happiness and talkativeness may affect each other within the same day
- Stress and physical symptoms may co-occur simultaneously
- Measurement occasions often span hours or days, during which contemporaneous effects accumulate

If contemporaneous effects exist, the cross-lagged estimates from CLPM/DPM reflect a mixture of lagged and contemporaneous effects, producing biased estimates.

## Additional Concerns

1. **Time lag misspecification**: If the true causal effect operates over a different time scale than the measurement interval, lagged estimates will be attenuated or distorted. High-frequency sampling can overburden participants and may itself interfere with the causal system

2. **No heterogeneous slopes**: Like FE, neither CLPM nor DPM allows individuals to differ in their within-person $X \to Y$ effect sizes. Population-average cross-lagged paths may not represent any individual's true dynamics

3. **Reciprocal contemporaneous effects** create trade-offs: if both $X_t \to Y_t$ and $Y_t \to X_t$, standard model specifications (targeting either contemporaneous or lagged effects) are misspecified

## Model Selection Is Not a Substitute for Estimand Specification

Researchers sometimes choose between FE, CLPM, and DPM based on model fit statistics rather than substantive theory. This is a mistake:
- Different models target different estimands
- Choosing post-hoc based on fit constitutes researcher degrees of freedom
- Model fit cannot adjudicate between models targeting different causal quantities

## Connections
- [[Fixed-Effects Model]] — the contemporaneous version; DPM combines FE with CLPM
- [[Directed Acyclic Graphs]] — the causal graphs (Boxes 2b and 3 in the paper) clarify confounding paths
- [[Estimands in Longitudinal Research]] — the right model emerges from the estimand, not from model fit
- Cross-lagged effects connect to [[Carryover Effects and Distributed Lags]] (Koyck/ADL models in marketing) — same underlying idea of temporal lags in causal effects
- [[Researcher Degrees of Freedom]] — post-hoc model choice from the FE/CLPM/DPM menu inflates false positives

## See Also
- [[Fixed-Effects Model]] — the contemporaneous within-persons approach
- [[Estimands in Longitudinal Research]] — choosing the right model starts with the estimand
- [[Within-Between Persons Causal Inference]] — the broader context for both models
- [[Within-Between Persons Distinction - Overview]] — paper overview
