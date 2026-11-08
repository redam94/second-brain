---
title: "Index: Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
tags:
  - type/index
  - source/ingested
  - topic/latent-traits
parent: "[[../_Index|Rankings, Raters and Latent Traits]]"
date_updated: 2026-11-08
concept_count: 6
---

# Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models

> [!abstract] Routing Summary
> Full capture of Caron & Doucet (JCGS 2012; INRIA RR-7445 / arXiv:1011.1761): EM and Gamma-Gibbs algorithms for Bradley-Terry, home advantage, ties, team comparisons and Plackett-Luce, plus identifiability, hyperparameters and experiments. 6 notes.
> - Need the paper on one page or the section-to-note map? -> [[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]]
> - Need the BT likelihood, latent Gamma variable, EM/MM and Gibbs updates? -> [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]
> - Need home advantage, Rao-Kupper ties, or team comparisons? -> [[Caron 2012 - Home Advantage, Ties and Team Comparisons]]
> - Need Plackett-Luce for full rankings? -> [[Caron 2012 - Plackett-Luce Model for Full Rankings]]
> - Need identifiability, rescaling, learning the prior shape, random graphs, Tversky choice? -> [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]]
> - Need NASCAR/chess results and Table 1? -> [[Caron 2012 - Experiments NASCAR and Chess]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| BT log-likelihood, latent Gamma $Z_{ij}$ | [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]] | theorem | Overview | MM = EM; Gamma Gibbs |
| Home advantage $\theta$ | [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] | theorem | BT | $\theta\sim$ Gamma conditional |
| Rao-Kupper ties | [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] | theorem | BT | $\theta$ conditional is a Gamma mixture |
| Team BT | [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] | theorem | BT | winner-id latent $C_i$ |
| Plackett-Luce | [[Caron 2012 - Plackett-Luce Model for Full Rankings]] | theorem | BT | stage-wise exponentials |
| Dirichlet-Gamma identifiability | [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]] | theorem | BT | only $\pi$ identified; rescale step |
| NASCAR / chess | [[Caron 2012 - Experiments NASCAR and Chess]] | example | all | Gibbs beats M-H; Bayes beats MAP |

## Notes

- [[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]] — CONTAINS: contributions, model table, Source Map, PyMC example link.
- [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]] — CONTAINS: Def. BT, latent $Z$; Thm. EM and Gibbs; toy tournament; Python/PyMC.
- [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] — CONTAINS: Sec. 3.1-3.3 definitions and algorithms.
- [[Caron 2012 - Plackett-Luce Model for Full Rankings]] — CONTAINS: PL likelihood, latents, EM/Gibbs, creative-ranking example, Python.
- [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]] — CONTAINS: Sec. 5.
- [[Caron 2012 - Experiments NASCAR and Chess]] — CONTAINS: Sec. 6-7, Table 1.

## Sources

[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]

## See Also

[[Discrete Choice Models]] · [[Reward Modeling from Human Preferences]] · [[Hierarchical Models]]
