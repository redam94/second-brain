---
title: "Bürkner 2021 - Response Families and Distributional IRT"
tags:
  - source/ingested
  - topic/latent-traits
  - type/definition
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 2.1, pp. 3-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - Bayesian IRT with brms Overview]]"
used_by:
  - "[[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]"
aliases:
  - IRT response distributions
  - distributional IRT
---

# Bürkner 2021 - Response Families and Distributional IRT

> [!summary]
> IRT models are specified by a response distribution $D$ (the "family") whose parameters are predicted from person and item parameters. Bürkner reviews the families used for binary, categorical, ordinal, count, proportion, response-time and joint choice-and-time data.

## Overview

General form: $y_n\sim D(\psi_{1n},\dots,\psi_{Kn})$ with data in **long** format (one row per person-item response), which fits multilevel syntax.

## Main Content

> [!definition] Families and their IRT models
> | Response type | Family | Resulting IRT model |
> |---|---|---|
> | Binary | Bernoulli, $\psi^y(1-\psi)^{1-y}$ | 1PL, 2PL, 3PL |
> | Unordered categorical, $C$ levels | Categorical, $\prod_c\psi_c^{I_c(y)}$ | nominal; $C=2$ equals Bernoulli |
> | Ordinal | Cumulative: $P(y=c)=F(\tau_c-\psi)-F(\tau_{c-1}-\psi)$, logistic $F$ | Graded response model (GRM; Samejima) |
> | Ordinal | Adjacent category: $P(y=c)=\dfrac{\exp\sum_{j<c}(\psi-\tau_j)}{\sum_r\exp\sum_{j<r}(\psi-\tau_j)}$, thresholds need not be ordered | Partial credit model (PCM; Rasch; generalised PCM used in PISA) |
> | Count | Poisson, $\psi^ye^{-\psi}/y!$ | Rasch-Poisson-counts model |
> | Proportion of total ($C=2$) | Beta, mean-precision $(\mu,\phi)$ | comparative judgement |
> | Compositional ($C>2$) | Dirichlet | comparative judgement |
> | Response time | Exgaussian, shifted lognormal | RT-IRT |
> | Choice + response time | Wiener diffusion: drift, boundary separation, non-decision time, bias | drift-diffusion IRT |
> ^def-irt-families

**Notes.** In the Wiener model the initial bias is typically fixed at 0.5 for IRT, giving the three-parameter drift-diffusion model. Exgaussian lets one parameterize the mean directly (easier interpretation) at some theoretical cost versus the shifted lognormal. Response times vary over persons and items in mean, spread and right-skew, so three parameters are warranted.

## Examples

> [!example] Choosing a family for a survey battery
> **Setup.** A brand-attribute grid collects (a) agree/disagree, (b) 5-point agree scales, (c) seconds to respond.
> **Solution.** (a) Bernoulli-logit (1PL/2PL); (b) cumulative-logit (GRM) with item-specific threshold shifts; (c) exgaussian with person and item effects on location, scale, skew.
> **Interpretation.** One framework, one sampler, one set of post-processing tools for all three.

## Connections

- Ordinal thresholds link to ordered-logit models in [[Discrete Choice Models]]; the Wiener process is a sequential-sampling choice model (cf. [[Reward Modeling from Human Preferences]] for preference responses).

## See Also

[[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]
