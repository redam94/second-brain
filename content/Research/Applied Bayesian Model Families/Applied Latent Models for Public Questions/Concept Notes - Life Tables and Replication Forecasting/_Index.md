---
title: "Index: Concept Notes - Life Tables and Replication Forecasting"
tags:
  - type/index
  - source/ingested
  - topic/applied-latent-models
parent: "[[../_Index|Applied Latent Models for Public Questions]]"
date_updated: 2026-11-08
concept_count: 2
---

# Concept Notes - Life Tables and Replication Forecasting

> [!abstract] Routing Summary
> Two concept notes (no raw source) covering topics from the PyMC examples that have no single open primary source in this run.
> - Need life tables, years of life lost, or the counterfactual mortality path (E111)? -> [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]]
> - Need forecasting replication from published effects (E117)? -> [[Concept Note - Forecasting Replication from Published Effects]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Abridged life table | [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]] | definition | - | $e_x=T_x/l_x$ |
| Years of life lost | [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]] | definition | life table | excess deaths x remaining expectancy |
| Publication filter | [[Concept Note - Forecasting Replication from Published Effects]] | definition | - | $f_{pub}=w\,m/Z$ |
| Replication forecast | [[Concept Note - Forecasting Replication from Published Effects]] | theorem | filter, mixture | toy $P(\text{replicate})=0.23$ |

## Notes

- [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]] — CONTAINS: life-table functions, YLL, counterfactual path, toy numbers, PyMC sketch.
- [[Concept Note - Forecasting Replication from Published Effects]] — CONTAINS: step-selection filter, null/real mixture, replication forecast, toy numbers, code.

## Sources
- No raw source. Literature cited in the notes: Chiang (1984), Preston, Heuveline and Guillot (2001), Arriaga (1984); Hedges (1992), Andrews and Kasy (2019), Open Science Collaboration (2015).

## See Also
- [[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
