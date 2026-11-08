---
title: "Index: Hoffman Sountsov 2022 - MEADS"
tags:
  - type/index
  - source/ingested
  - topic/advanced-mcmc
parent: "[[../_Index|Advanced MCMC and Latent Discrete Models]]"
date_updated: 2026-11-08
concept_count: 10
---

# Hoffman Sountsov 2022 - MEADS

> [!abstract] Routing Summary
> This folder fully captures Hoffman & Sountsov (2022), *Tuning-Free Generalized Hamiltonian Monte Carlo* (AISTATS, PMLR 151): GHMC with persistent slice sampling, ensemble-chain adaptation (ECA), the MEADS heuristics and eigenvalue estimator, Tables 1-2, ablations and Appendices A-E. 6 notes. Motivating PyMC examples: E86, E12.
> - Need the paper on one page or the section map? → [[Hoffman 2022 - MEADS - Overview]]
> - Need GHMC, the rejection gauntlet or Neal's persistent slice algorithm? → [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]
> - Need ECA invariance, the K-fold scheme or why hogwild is invalid? → [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]
> - Need step size, damping, slice drift or the $\text{tr}(\Sigma^2)/\text{tr}(\Sigma)$ estimator and Algorithm 3? → [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]
> - Need Table 2, the bias metric or the ablations? → [[Hoffman 2022 - MEADS - Experiments and Ablations]]
> - Need the XOR hogwild counterexample or the Hessian identity proof? → [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| GHMC / Langevin limit | [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] | definition | — | $\gamma=\alpha/(2\epsilon)$ |
| Rejection gauntlet | [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] | theorem | GHMC | $P^{acc}_{GHMC}\le P^{acc}_{HMC}$ |
| Persistent MH GHMC | [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] | algorithm | slice sampling | triangle-wave $u$ clusters rejections |
| ECA invariance | [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]] | theorem | product measure | conditioning on other chains is valid |
| K-fold ECA | [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]] | definition | ECA | 75% utilisation at $K=4$ |
| Step size $\epsilon$ | [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] | theorem | Hessian identity | $\epsilon=0.5/\sqrt{\lambda_{\max}(-\bar H)}$ |
| Damping and drift | [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] | definition | eigenvalue estimator | $\alpha=1-e^{-2\epsilon\gamma}$, $\delta=\alpha/2$ |
| Ratio eigenvalue estimator | [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] | definition | — | $\text{tr}(\Sigma^2)/\text{tr}(\Sigma)$ in $O(N^2D)$ |
| Table 2 | [[Hoffman 2022 - MEADS - Experiments and Ablations]] | example | MEADS | fewer gradients than NUTS on 7 of 8 targets |
| Hogwild XOR | [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]] | example | ECA | collapses to $(0,0)$ |
| Hessian identity | [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]] | theorem | — | $-\mathbb E\nabla^2\log p=\mathbb E[(\nabla\log p)^\top\nabla\log p]$ |

## Notes

- [[Hoffman 2022 - MEADS - Overview]] — CONTAINS: research question, contributions, Source Map, PyMC examples, marketing relevance.
- [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] — CONTAINS: Def. leapfrog per dimension; GHMC; Thm. rejection gauntlet; Def. persistent GHMC; tested numpy step.
- [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]] — CONTAINS: Thm. ECA invariance; parallel ECA; K-fold update; active-chain example; fold bookkeeping code.
- [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] — CONTAINS: Step size, damping floor, slice drift, ratio estimator, Algorithm 3, Appendix C, tested estimator.
- [[Hoffman 2022 - MEADS - Experiments and Ablations]] — CONTAINS: Bias metric, Tables 1-2, readings, Figure 3, Appendix A-B ablations, speed-up code.
- [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]] — CONTAINS: Appendix D XOR counterexample with simulation; Appendix E full proof; 1-D check.

## Sources
- [[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]] — Hoffman MD, Sountsov P (2022), AISTATS, PMLR 151, 15 pages including supplement.

## See Also
- [[Hoffman 2021 - ChEES-HMC - Overview]] — baseline.
- [[Betancourt 2015 - HMC for Hierarchical Models - Overview]].
- [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]] — Gibbs-interleaved GHMC direction.
- [[Efficient MCMC]].
