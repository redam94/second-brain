---
title: "Index: Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
tags:
  - type/index
  - source/ingested
  - topic/latent-traits
parent: "[[../_Index|Rankings, Raters and Latent Traits]]"
date_updated: 2026-11-08
concept_count: 7
---

# Weng and Lin 2011 - Bayesian Approximation for Online Ranking

> [!abstract] Routing Summary
> Full capture of Weng & Lin (JMLR 2011): closed-form online Bayesian skill updates under Bradley-Terry, Thurstone-Mosteller and Plackett-Luce, the Glicko derivation, and Halo 2 results. 7 notes.
> - Need the paper on a page or the section map? -> [[Weng and Lin 2011 - Bayesian Online Ranking Overview]]
> - Need ranking models, Elo, the W-Stein identity? -> [[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]]
> - Need the $\Omega,\Delta$ derivation, error correction, team skills? -> [[Weng and Lin 2011 - Update Rules Derivation and Error Correction]]
> - Need the BT full-pair/partial-pair algorithm and code? -> [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]
> - Need TM (TrueSkill) or PL rules? -> [[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]]
> - Need Glicko step-by-step? -> [[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]]
> - Need Tables 2-5? -> [[Weng and Lin 2011 - Halo 2 Experiments and Results]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| W-Stein identity | [[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]] | theorem | Overview | posterior moments from $\partial f/f$ |
| $\Omega,\Delta$ update | [[Weng and Lin 2011 - Update Rules Derivation and Error Correction]] | definition | W-Stein | $\mu+\Omega$, $\sigma^2\max(1-\Delta,\kappa)$ |
| BT full/partial | [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]] | theorem | $\Omega,\Delta$ | Elo with uncertain step size |
| TM / PL | [[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]] | theorem | BT | TM k=2 = TrueSkill |
| Glicko | [[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]] | theorem | BT | 5-step approximation |
| Experiments | [[Weng and Lin 2011 - Halo 2 Experiments and Results]] | example | all | BT-full ~ TrueSkill, 10x faster |

## Notes

- [[Weng and Lin 2011 - Bayesian Online Ranking Overview]] — CONTAINS: summary, source map, comparison table.
- [[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]] — CONTAINS: rank notation, TM/BT/PL/Elo definitions, Fig. 1, Lemma 1, Cor. 2.
- [[Weng and Lin 2011 - Update Rules Derivation and Error Correction]] — CONTAINS: Eqs. 25-30, error analysis, factorizations, team skill updates.
- [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]] — CONTAINS: Algorithms 1-2, worked update, Python.
- [[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]] — CONTAINS: Algorithms 3-4, draw margin, safeguards.
- [[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]] — CONTAINS: Glicko steps I-V, Algorithm 5, worked example.
- [[Weng and Lin 2011 - Halo 2 Experiments and Results]] — CONTAINS: Tables 2-5, runtime, discussion.

## Sources

Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking

## See Also

[[The Kalman Filter]] · [[Reward Modeling from Human Preferences]]
