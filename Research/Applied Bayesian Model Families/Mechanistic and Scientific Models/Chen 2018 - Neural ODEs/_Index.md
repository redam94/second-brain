---
title: "Index: Chen 2018 - Neural ODEs"
tags:
  - type/index
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
parent: "[[../_Index|Mechanistic and Scientific Models]]"
date_updated: 2026-11-08
concept_count: 6
---

# Chen 2018 - Neural ODEs

> [!abstract] Routing Summary
> Full capture of Chen, Rubanova, Bettencourt & Duvenaud (2018), *Neural Ordinary Differential Equations* (NeurIPS; arXiv 1806.07366v6) including appendices on the adjoint proof, the instantaneous change of variables and the latent-ODE algorithm. 6 notes.
> - Need the paper on one page or a section map? -> [[Chen 2018 - Neural ODEs - Overview]]
> - Need adjoint sensitivities, the vector-Jacobian-product algorithm, or how to give a custom Op its gradient? -> [[Chen 2018 - Adjoint Sensitivity Method]]
> - Need ODE-Nets vs ResNets, MNIST Table 1, tolerance and depth behaviour? -> [[Chen 2018 - ODE-Nets for Supervised Learning]]
> - Need Theorem 1 ($-\operatorname{tr}$ change of variables) or continuous normalizing flows? -> [[Chen 2018 - Continuous Normalizing Flows]]
> - Need irregular-time-series latent ODEs, the Poisson-process likelihood, or Table 2? -> [[Chen 2018 - Latent ODE Time-Series Model]]
> - Need caveats (uniqueness, tolerances, reconstruction error), related work, or statistical implications? -> [[Chen 2018 - Scope, Limitations and Statistical Use]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Adjoint state $a(t)$ and adjoint ODE | [[Chen 2018 - Adjoint Sensitivity Method]] | theorem | chain rule | $\dot a=-a^\top\partial f/\partial z$ |
| Algorithm 1 (reverse-mode ODE) | [[Chen 2018 - Adjoint Sensitivity Method]] | algorithm | VJP | one backward solve gives $\partial L/\partial z_0,\partial L/\partial\theta$ |
| ODE-Net | [[Chen 2018 - ODE-Nets for Supervised Learning]] | example | ResNet | 0.42% MNIST error, $O(1)$ memory |
| Instantaneous change of variables | [[Chen 2018 - Continuous Normalizing Flows]] | theorem | Picard uniqueness | $\partial_t\log p=-\operatorname{tr}(\partial f/\partial z)$ |
| Latent ODE | [[Chen 2018 - Latent ODE Time-Series Model]] | definition | VAE | RMSE 0.164 vs RNN 0.394 at 30/100 points |
| Poisson-process likelihood | [[Chen 2018 - Latent ODE Time-Series Model]] | definition | latent trajectory | rate $\lambda(z(t))$ integrated in the same solve |
| Picard uniqueness | [[Chen 2018 - Scope, Limitations and Statistical Use]] | theorem | Lipschitz | trajectories cannot cross |

## Notes

- [[Chen 2018 - Neural ODEs - Overview]] — CONTAINS: question, contributions, edition note (corrected Fig. 3c), Source Map, motivating PyMC examples E09/E11, marketing relevance.
- [[Chen 2018 - Adjoint Sensitivity Method]] — CONTAINS: adjoint definition, theorem and proof sketch, Algorithm 1 and time-gradient extension, verified scalar worked example, mapping to PyTensor Ops with jax.vjp.
- [[Chen 2018 - ODE-Nets for Supervised Learning]] — CONTAINS: Table 1, error control, backward vs forward cost, depth, Euler-step illustration.
- [[Chen 2018 - Continuous Normalizing Flows]] — CONTAINS: Theorem 1 with proof sketch, linear-cost trace property, planar CNF, density matching and maximum-likelihood experiments, verified 1-D check.
- [[Chen 2018 - Latent ODE Time-Series Model]] — CONTAINS: generative model, VAE training, Poisson-process likelihood, spiral experiments, Table 2, forward-pass code.
- [[Chen 2018 - Scope, Limitations and Statistical Use]] — CONTAINS: Picard theorem, limitation table, related-work table, four statistical implications, tolerance recipe.

## Sources

[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]].

## See Also

[[Universal Differential Equations and Scientific ML (Concept Note)]], [[ODE Filters and Smoothers]], [[Normalizing Flows for Variational Inference]].
