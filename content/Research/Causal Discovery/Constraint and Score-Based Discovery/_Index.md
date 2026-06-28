---
title: Constraint and Score-Based Discovery
tags:
  - type/index
  - source/ingested
  - topic/causal-inference
parent: "[[Research/Causal Discovery/_Index|Causal Discovery]]"
date_updated: 2026-06-28
concept_count: 5
---

# Constraint and Score-Based Discovery

> [!abstract] Routing Summary
> Recovering causal structure (DAG / CPDAG / PAG) from observational data, from Glymour, Zhang & Spirtes (2019), "Review of Causal Discovery Methods Based on Graphical Models."
> - Need the big picture / which method to use? → [[Causal Discovery - Overview]]
> - Need the assumptions linking d-separation to independence (Markov, faithfulness, CPDAG/MEC)? → [[Markov and Faithfulness Assumptions]]
> - Need conditional-independence search (skeleton, v-structures, Meek rules; FCI/PAGs for confounders)? → [[PC Algorithm and Constraint-Based Discovery]]
> - Need score-optimizing search (greedy forward/backward over equivalence classes, BIC)? → [[GES and Score-Based Discovery]]
> - Need to orient direction *beyond* the equivalence class via noise asymmetry? → [[Functional Causal Models (LiNGAM, ANM)]]

## Concept Map

| Note | Type | Role |
|---|---|---|
| [[Causal Discovery - Overview]] | overview | Goal of structure learning; three method families; Table 1 comparison; practical issues |
| [[Markov and Faithfulness Assumptions]] | definition | d-separation, local Markov, causal Markov + faithfulness, Markov equivalence class / CPDAG |
| [[PC Algorithm and Constraint-Based Discovery]] | concept | CI tests, skeleton, collider orientation, Meek rules; FCI, PAGs/MAGs for latent confounders |
| [[GES and Score-Based Discovery]] | concept | Greedy two-phase search over equivalence classes, BIC; GFCI hybrid |
| [[Functional Causal Models (LiNGAM, ANM)]] | concept | LiNGAM, ANM, PNL; identify direction via noise independence asymmetry |

## Notes

- [[Causal Discovery - Overview]] — CONTAINS: definition of causal discovery / DGCMs; goal (recover DAG/CPDAG/PAG from observational data); the three families (constraint / score / FCM); Table 1 method comparison; practical challenges (time series, measurement error, selection bias, missing data).
- [[Markov and Faithfulness Assumptions]] — CONTAINS: paths/colliders/d-separation; local Markov condition; Causal Markov assumption; Causal Faithfulness assumption (no extra independencies); Markov Equivalence Class and CPDAG; equivalence invariants (skeleton + v-structures).
- [[PC Algorithm and Constraint-Based Discovery]] — CONTAINS: adjacency criterion; PC skeleton discovery (growing conditioning sets, separating sets); v-structure orientation rule; Meek orientation propagation; CPDAG output; FCI for latent confounders (PAG/MAG, bidirected edges, "o" marks); RFCI/GFCI.
- [[GES and Score-Based Discovery]] — CONTAINS: score functions (BIC); GES forward (FES) and backward (BES) phases; search over equivalence classes; convergence to same MEC as PC; weaker-than-faithfulness condition; GFCI hybrid for confounders.
- [[Functional Causal Models (LiNGAM, ANM)]] — CONTAINS: general FCM $Y=f(X,\varepsilon)$, noise-independence asymmetry test; LiNGAM (linear non-Gaussian, ICA/DirectLiNGAM, Darmois–Skitovich); ANM (nonlinear additive noise); PNL (post-nonlinear, most general); identifiability beyond the equivalence class; limitations.

## Sources

- [[raw/Glymour Zhang Spirtes 2019 - Review of Causal Discovery Methods.pdf]] — Glymour, Zhang & Spirtes (2019), *Review of Causal Discovery Methods Based on Graphical Models*, Frontiers in Genetics 10:524.
