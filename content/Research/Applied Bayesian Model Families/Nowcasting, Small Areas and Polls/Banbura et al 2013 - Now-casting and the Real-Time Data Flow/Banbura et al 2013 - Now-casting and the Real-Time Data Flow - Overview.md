---
title: "Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview"
tags:
  - source/ingested
  - topic/nowcasting
  - type/overview
  - doc/paper
source: "[[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]"
source_location: "Whole paper, ECB Working Paper 1564, pp. 1-55"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[Marginal Likelihood via the Kalman Filter]]"
used_by:
  - "[[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]]"
  - "[[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]]"
  - "[[Banbura 2013 - News Decomposition and Real-Time Vintages]]"
  - "[[Banbura 2013 - Partial Models and the Empirical GDP Application]]"
  - "[[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]]"
aliases:
  - "now-casting review overview"
---

# Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview

> [!summary]
> Bańbura, Giannone, Modugno & Reichlin (2013, ECB Working Paper 1564; Handbook of Economic Forecasting vol. 2) review now-casting: estimating the present value of a slowly published, low-frequency target (such as GDP) from a ragged, mixed-frequency stream of releases. Their preferred framework is a joint state-space (dynamic factor) model fitted at high frequency, in which mixed frequency and ragged edges are missing-data problems solved by the Kalman filter and smoother, and in which each release produces model-based "news" that revises the now-cast.

## Overview
**Problem.** Key statistics (GDP) are published with long lags, so the present must be inferred from earlier-released, higher-frequency indicators with varying publication delays (the "ragged" or "jagged" edge), possibly many series.

**Contributions.** (1) Notation for vintages and temporal aggregation; (2) joint state-space approaches (factor model, mixed-frequency VAR, daily model with flow variables); (3) the news decomposition of now-cast revisions; (4) partial models (bridge, MIDAS) for comparison; (5) an empirical application to US GDP with 24 series in real-time ALFRED vintages, finding that surveys matter, accuracy improves as information accumulates, and daily financial data add little.

## Motivating PyMC examples
[E98](https://redam94.github.io/pymc-challenges/examples.html) ("Mixed-frequency sensor fusion on real-time data vintages": monthly latent AR(1), Mariano-Murasawa aggregation, correlated GDP-GDI errors, ragged edge, revision noise), [E96](https://redam94.github.io/pymc-challenges/examples.html) (sensor fusion for a snow pillow), [E97](https://redam94.github.io/pymc-challenges/examples.html) (sea-level rise from three instruments), [E99](https://redam94.github.io/pymc-challenges/examples.html) (range-only localisation). The sensor-based ones are in [[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]].

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, Introduction | this note |
| 2 Problem and overview; notation; 2.1 Temporal aggregation | [[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]] |
| 2.2 Joint models in state space: factor model, estimation (PC, two-step, EM), daily model with flows, mixed-frequency VAR | [[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]] |
| 2.3 Now-cast updates and news | [[Banbura 2013 - News Decomposition and Real-Time Vintages]] |
| 2.4 Partial models: bridge equations, MIDAS | [[Banbura 2013 - Partial Models and the Empirical GDP Application]] |
| 3 Empirical application: data (Table 1), real-time design, benchmark, uncertainty, news, financial variables | [[Banbura 2013 - News Decomposition and Real-Time Vintages]]; [[Banbura 2013 - Partial Models and the Empirical GDP Application]] |
| 4 Conclusions | [[Banbura 2013 - Partial Models and the Empirical GDP Application]] |

## Connections
Direct application of [[Linear-Gaussian State-Space Models]], [[The Kalman Filter]] (missing-observation updates), [[Marginal Likelihood via the Kalman Filter]] (ML/EM estimation) and [[The RTS Smoother]] (smoothed factors and uncertainty).

## Relevance to marketing measurement
Weekly sales/spend with monthly or quarterly outcome series (survey tracker, finance data) is the same mixed-frequency problem. The news idea answers "why did our latest-weeks estimate of lift move after the finance data arrived?". Ragged edges (offline channels arriving later than digital) are handled the same way.

## See Also
[[Bayesian Structural Time-Series Model]]
