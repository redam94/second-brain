---
title: "Bürkner 2021 - Worked Examples Ordinal and Response-Time Models"
tags:
  - source/ingested
  - topic/latent-traits
  - type/example
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 5.2-5.3, pp. 35-44; Sec. 6-7, pp. 44-48 (Table 3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]"
used_by:
  - "[[Bürkner 2021 - Bayesian IRT with brms Overview]]"
aliases:
  - graded response model brms example
  - drift diffusion IRT example
  - IRT R package comparison
---

# Bürkner 2021 - Worked Examples Ordinal and Response-Time Models

> [!summary]
> Treating VerbAgg responses as three-category ordinal (graded response model) increases precision for high-ability persons; free per-item thresholds are not supported by LOO ($\Delta\text{LOOIC}=-4.7$, SE 14.1); a partial credit model with category-specific effects shows trait anger matters more for perhaps vs yes than for no vs perhaps. Response-time and drift-diffusion models of a mental-rotation test show rotation lowers drift rate and raises non-decision time but not boundary separation.

## Overview

Section 6 compares brms with eRm, ltm, TAM, mirt, sirt, lme4, lavaan, blavaan, MCMCglmm. Section 7 concludes.

## Main Content

### 5.2 Ordinal models (VerbAgg, `resp` = no/perhaps/yes)

- **GRM:** `resp ~ 1 + (1 | item) + (1 | id)`, `cumulative` + logit: overall thresholds $\tau$ shared, item-specific shifts. Person estimates agree with the binary 1PL but are **more precise for large abilities** because yes vs perhaps are kept separate (Fig. 9).
- **Free thresholds per item:** `resp | thres(gr = item) ~ 1 + (1 | id)`, non-hierarchical priors required (order constraint). $\Delta\text{LOOIC}=-4.7$ (SE 14.1) favours the simpler shifted-threshold model.
- **Generalised GRM (2PL for ordinal):** `disc ~ 1 + (1|i|item)` with `constant(1)` on the person SD; discrimination does not vary across items (Fig. 10).
- **Covariates in the GRM:** $b_{\text{Anger}}^{\text{1PL}}=0.06$ (95% CI $[0.02,0.09]$) vs $b_{\text{Anger}}^{\text{GRM}}=0.07$ ($[0.04,0.11]$). Plot category probabilities, not scores (equidistant categories are doubtful).
- **Category-specific effects need the PCM** (`acat`, `cs(Anger)`), since GRM category-specific effects can imply negative probabilities (Bürkner & Vuorre 2019): $b_{\text{PCM1}}=0.03$ ($[0,0.05]$) for no vs perhaps; $b_{\text{PCM2}}=0.10$ ($[0.07,0.13]$) for perhaps vs yes.

### 5.3 Response-time models (rotation data; diffIRT; 121 subjects x 10 items)

Items show two 3D objects rotated by 50, 100 or 150 degrees; response same/different (correct/incorrect) and time in seconds recorded.
- **Exgaussian:** `time ~ rotate + (1|p|person) + (1|i|item)` plus `sigma ~ ...` and `beta ~ ...` with log links, `adapt_delta = 0.99`. Mean and spread increase with rotation; skewness stays about constant (consistent with Wagenmakers & Brown 2007).
- **Three-parameter Wiener drift diffusion** (ability test; person and item parameters positive and combined multiplicatively, i.e. additively on the log scale; bias fixed at 0.5): `time | dec(resp) ~ rotate + ...`, `bs ~ ...`, `ndt ~ ...`, `brmsfamily("wiener","log", link_bs="log", link_ndt="log")`, with manual inits (`ndt` intercept $=-3$). Drift rate decreases slightly from 50 to 100 degrees and then is flat; non-decision time increases from 50 to 100; boundary separation unaffected, with small item SD (0.05, 95% CI $[0,0.16]$).

### 6 Package comparison (Table 3 features)

| Package | Model scope |
|---|---|
| eRm | conditional ML; 1PL and PCM only |
| ltm, TAM, mirt | marginal ML; binary/categorical/ordinal, discrimination, 3PL/4PL; mirt most flexible |
| sirt | collection of special-purpose IRT functions |
| lavaan / blavaan | SEM; multidimensional 1PL/2PL, some ordinal; blavaan Bayesian (MH-Gibbs) |
| lme4 | multilevel; no 2PL, ordinal or categorical |
| MCMCglmm | Bayesian multilevel; no non-linear 2PL |
| brms | Bayesian (adaptive HMC); widest families, non-linear, distributional, multilevel, splines, mixtures, custom families, joint models |
The IRT packages ship DIF tests; psychotree adds recursive-partitioning DIF. brms needs more setup and has a steeper learning curve.

### 7 Conclusion

Beyond flexibility, Bayesian IRT replaces binary decisions based on p-values with probabilities and averaging over uncertainty.

## Examples

> [!example] Reading category-specific effects for marketing surveys
> **Setup.** A 3-point purchase-intent item (no/maybe/yes) and a covariate (ad exposure frequency).
> **Solution.** Fit `acat` with `cs(exposure)`.
> **Interpretation.** If exposure moves maybe to yes but not no to maybe, a GRM with one coefficient would average over the two transitions and mislead.

## Connections

Ordinal-category models relate to ordered logit in [[Discrete Choice Models]]; sequential-sampling (Wiener) models are decision models for response-time data.

## See Also

[[Bürkner 2021 - Bayesian IRT with brms Overview]]
