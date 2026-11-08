---
title: "Dorie 2019 - Motivation and Shortcomings of Method Comparisons"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Secs. 1-2, pp. 2-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]"
used_by:
  - "[[Dorie 2019 - Estimands, Ignorability and Design Choices]]"
  - "[[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]"
aliases:
  - Shortcomings of causal method comparisons
  - File drawer effect in method comparison
---

# Dorie 2019 - Motivation and Shortcomings of Method Comparisons

> [!summary]
> Method papers usually compare an inventor's method with a few, often naive, competitors on uncalibrated simulations or on a single constructed observational study, and inconclusive results go to the file drawer. The competition responds with 30 methods submitted by knowledgeable proponents, testing grounds built by non-competing organisers from real covariates across many data-generating processes, multiple metrics, and public code.

## Overview

Causal inference without randomisation requires fair comparisons between treated and control units; researchers are incentivised to condition on many pre-treatment covariates, which needs strong parametric assumptions or a flexible fit. This tension "has motivated a veritable explosion in the development of semi-parametric and nonparametric causal inference methodology in the past three decades." Footnote 2: some caution against conditioning on all covariates because some can amplify bias under non-ignorability (Pearl; Middleton et al.; Steiner and Kim), while others find it rare that adding a pre-treatment covariate is not preferable (Ding and Miratrix).

## Main Content

### 2.1 Shortcomings of the existing literature

> [!definition] Four shortcomings listed
> 1. **Few methods compared and unfair comparisons.** Comparisons are typically with traditional or naively implemented or off-the-shelf competitors (needing careful tuning), because authors know their own method best; and authors may pick metrics that favour their method (bias rather than RMSE; ignoring coverage).
> 2. **Testing grounds not calibrated to real life.** Simulations test few DGPs, use multivariate normal covariates unlike real data, or are over-tuned to one specialised setting. Theoretical (asymptotic) properties are hard to map to small samples. Compromises: real covariates with simulated outcome/treatment (Hill 2011) or a saturated parametric fit to simulate outcomes (Kern et al. 2016).
> 3. **Constructed observational studies** (LaLonde and Maynard 1987; Hill, Reiter and Zanutto 2004; Shadish, Clark and Steiner 2008) replace the experiment's randomised control with observational data. Pros: calibrated to reality. Cons: (a) each represents **one DGP**; (b) ignorability is unknown, so failure to match the experiment could be violated ignorability or poor fit; (c) with only two estimates there is no yardstick for "close enough."
> 4. **File drawer effect** (Rosenthal 1979): inconclusive comparisons are unpublished, so researchers cannot see them.
^def-method-comparison-shortcomings

### 2.2 How the competition responds

| Shortcoming | Competition response |
|---|---|
| Few/unfair comparisons | Broad call; 30 methods; each submitted by knowledgeable researchers (black-box version they believed would work, or own analysis); many metrics across many data features; organisers from diverse fields (varied norms about parametric assumptions, effect sizes, nonlinearity, number of covariates, bias ranges) to reduce favouring one method class; organisers did not submit methods (a linear baseline was added) |
| Uncalibrated testing grounds | Covariates from a real study (hypothetical effect of birth weight on IQ); DGPs varying nonlinearity, overlap/imbalance, percent treated, alignment, heterogeneity |
| Constructed-study limits | Simulated truth is known, ignorability holds by construction, many DGPs |
| File drawer | Simulation and evaluation code published at github.com/vdorie/aciccomp (2016); anyone can test any method with any metric |

**No leaderboard.** Unlike a Kaggle competition there was no public leaderboard or repeat submission opportunity (footnote 6); these "can induce better performance (Athanasopoulos and Hyndman 2011) but also lead to overfitting to the test data (Wind and Winther 2014)."

**Other competitions.** Guyon's competitions focused on causes of effects or temporal ordering; this is described as the first with the statistical focus on estimating the effect of a cause in observational studies across data-feature complications.

## Examples

> [!example] Why a metric choice can flip a conclusion
> **Setup.** Method P is unbiased but noisy; method Q is shrunk toward zero (bias $-0.05$) with small variance.
> **Metrics.** Bias favours P ($0$ vs $-0.05$). RMSE: if P's SD is $0.20$ and Q's is $0.05$, RMSE is $0.20$ vs $\sqrt{0.05^2+0.05^2}=0.071$; Q wins. Coverage of nominal 95% intervals adds a third view.
> **Interpretation.** This is the paper's complaint that authors "might focus on bias rather than root mean squared error or ... ignore confidence interval coverage." The competition reports all of them.
^ex-metric-choice

## Connections

- The same unfair-comparison and file-drawer concerns appear as lottery mechanisms in [[Dehghani 2021 - The Benchmark Lottery - Overview]] and [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]].
- The constructed-observational-study design is the approach of [[Experimental Benchmarks for Observational Ad Measurement]]: compare observational lift estimates with a randomised benchmark. Dorie et al.'s critique (single DGP, unknowable ignorability, no closeness yardstick) applies directly.
- Reproducibility via released code mirrors the datasheet's reproducibility objective: [[Gebru 2021 - Motivation, Objectives and Development Process]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Estimands, Ignorability and Design Choices]]
