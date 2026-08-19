---
title: "Index: Consumer Behavior"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Agent-Based Modeling]]"
date_updated: 2026-04-10
doc_type: index
---

# Consumer Behavior

> [!abstract] Routing Summary
> This topic covers agent-based models of consumer behavior from two papers. Contains 2 sub-topics and 8 total notes.
> - For the Karakaya utility-based marketing model -> [[Karakaya Model/_Index|Karakaya Model]]
> - For the CUBES psychology-driven behavioral model -> [[CUBES Model/_Index|CUBES Model]]
> - For a comparison of decision architectures -> [[../Foundations/Modeling Approaches/Agent Decision Rules and Bounded Rationality]]

## Sub-topics
- [[Karakaya Model/_Index|Karakaya Model]] — COVERS: 4-component utility function (quality, promotion, WOM, price), logit purchase decisions, marketing strategy experiments in a monopolistic market
- [[CUBES Model/_Index|CUBES Model]] — COVERS: CUBES simulator architecture, five behavioral attitudes (mistrust, opportunism, conditioning, innovativeness, imitation), behavioral primitives with threshold activation, imitation and conditioning social processes

## Cross-Cutting Concepts
Concepts that span both models:
- **WOM influence**: Karakaya models WOM as a utility component ($U_{i3}$); CUBES models it through the imitation process with perception fields. Both find WOM critical for realistic dynamics.
- **Opinion leaders**: Karakaya treats them as exogenously assigned (M=200 with 3x influence multiplier); CUBES treats them as emergent from network position.
- **Heterogeneity**: Karakaya uses sensitivity parameters ($K_i$, $Pr_i$, $S_i$, $PrSen_i$); CUBES uses behavioral attitudes and socio-demographic profiles.
- **Bounded rationality**: Karakaya uses logit noise; CUBES uses threshold filtering.

## Sources
- [[raw/abm_consumer.pdf]] — Karakaya, Badur & Aytekin (2011)
- [[raw/abm_human_behaviour.pdf]] — Ben Said, Bouron & Drogoul (2002)
