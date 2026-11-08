---
title: "Index: Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
tags:
  - type/index
  - source/ingested
  - topic/nowcasting
parent: "[[../_Index|Nowcasting, Small Areas and Polls]]"
date_updated: 2026-11-08
concept_count: 5
---

# Banbura et al 2013 - Now-casting and the Real-Time Data Flow

> [!abstract] Routing Summary
> Full capture of Bańbura, Giannone, Modugno & Reichlin (2013), ECB Working Paper 1564 (substitute for the closed-access Mariano & Murasawa 2003, whose aggregation scheme it reproduces), plus one concept note on sensor fusion (E96-E99). 6 notes.
> - Need paper on a page and section map? -> [[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]]
> - Need stock/flow aggregation and Mariano-Murasawa weights? -> [[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]]
> - Need dynamic factor model, PC / two-step / EM, mixed-frequency VAR? -> [[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]]
> - Need news, nowcast revision, real-time vintages? -> [[Banbura 2013 - News Decomposition and Real-Time Vintages]]
> - Need bridge, MIDAS, the US GDP exercise? -> [[Banbura 2013 - Partial Models and the Empirical GDP Application]]
> - Need multi-instrument fusion, identification, localisation? -> [[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Mariano-Murasawa aggregation | [[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]] | definition | [[Linear-Gaussian State-Space Models]] | weights 1,2,3,2,1 |
| Dynamic factor nowcast | [[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]] | definition | [[The Kalman Filter]] | EM ML is state of the art |
| News | [[Banbura 2013 - News Decomposition and Real-Time Vintages]] | theorem | Kalman moments | revision = weighted news |
| Bridge / MIDAS | [[Banbura 2013 - Partial Models and the Empirical GDP Application]] | definition | none | no news available |
| Sensor fusion | [[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]] | concept | all above | rank, bias, drift checks |

## Notes
- [[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]] — CONTAINS: summary, E96-E99 links, Source Map.
- [[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]] — CONTAINS: stock/flow, aggregation theorem, MM approximation, Python.
- [[Banbura 2013 - Factor Models, Estimation and the Ragged Edge]] — CONTAINS: DFM, estimation, daily model, VAR, Kalman-with-missing code.
- [[Banbura 2013 - News Decomposition and Real-Time Vintages]] — CONTAINS: news theorem, real-time design, 2008Q4 episode.
- [[Banbura 2013 - Partial Models and the Empirical GDP Application]] — CONTAINS: bridge, MIDAS, Table 1 data, findings.
- [[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]] — CONTAINS: multi-sensor model, E96-E99 patterns, PyMC sketch.

## Sources
- [[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]

## See Also
[[Linear-Gaussian State-Space Models]] · [[Marginal Likelihood via the Kalman Filter]] · [[The RTS Smoother]]
