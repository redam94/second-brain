---
title: "Index: Treatment Effect Estimation"
tags:
  - type/index
  - source/ingested
parent: "[[../Causal Inference/_Index|Bayesian Causal Inference]]"
date_updated: 2026-04-10
concept_count: 6
---

# Treatment Effect Estimation

> [!abstract] Routing Summary
> This folder covers metalearner algorithms for estimating heterogeneous treatment effects (CATE) using machine learning base learners. Based on Künzel, Sekhon, Bickel & Yu (PNAS 2019). Contains 6 notes.
> - Need the general CATE estimation framework and notation? → [[Metalearners for CATE]]
> - Need the single-model approach (CATE = predicted difference from one model)? → [[S-Learner]]
> - Need the two-model approach + minimax rate theorem? → [[T-Learner and Minimax Rate]]
> - Need the main contribution: X-learner for unbalanced groups? → [[X-Learner]]
> - Need empirical results (voter turnout, transphobia)? → [[Metalearner Simulation Results]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Metalearner framework | [[Metalearners for CATE]] | definition | [[Causal Estimands]] | $\hat{\tau}^S$, $\hat{\tau}^T$, $\hat{\tau}^X$ as wrappers around base ML |
| S-learner | [[S-Learner]] | concept | [[Metalearners for CATE]] | Single model; treatment may be regularized to zero |
| T-learner | [[T-Learner and Minimax Rate]] | theorem | [[Metalearners for CATE]] | Rate: $\min(m,n)^{-a_0}$; optimal when balanced |
| X-learner | [[X-Learner]] | theorem | [[T-Learner and Minimax Rate]] | Rate: $m^{-a_\tau} + n^{-a_0}$; optimal for unbalanced groups |
| Empirical validation | [[Metalearner Simulation Results]] | example | [[X-Learner]] | X-RF best on voter turnout (38K treated, 191K control) |

## Concept Dependency Chain

```
Potential Outcomes Framework + Causal Estimands (existing)
  └─► Metalearners for CATE (framework)
        ├── S-Learner (single model; simple but regularization risk)
        ├── T-Learner (separate models; limited by small group)
        │     └─► Theorem 1: minimax rate = min(m,n)^{-a_0}
        └── X-Learner (cross-imputation; exploits large group)
              └─► Theorem 2: rate = m^{-a_τ} + n^{-a_0} (adapts to CATE smoothness)
                    └─► Metalearner Simulation Results (voter turnout, transphobia)
```

## Notes

- [[Künzel 2019 - Overview]] — CONTAINS: paper overview, PNAS 2019; metalearner concept, key results summary
- [[Metalearners for CATE]] — CONTAINS: potential outcomes notation; EMSE definition; families $S(a)$; three metalearner comparison table
- [[S-Learner]] — CONTAINS: definition $\hat{\tau}^S = \hat{\mu}(x,1) - \hat{\mu}(x,0)$; regularization failure mode; when S-learner works
- [[T-Learner and Minimax Rate]] — CONTAINS: definition of two separate models; Theorem 1 (minimax rate $n^{-a_0}$); unbalanced failure mode
- [[X-Learner]] — CONTAINS: full 3-step algorithm; imputed ITEs $\tilde{D}_i^1$, $\tilde{D}_i^0$; propensity score weighting; Theorem 2 (adaptive rate)
- [[Metalearner Simulation Results]] — CONTAINS: simulation study; voter turnout application (ATE = 8.1%, unbalanced); transphobia canvassing (ATE = 0.22)

## Sources

- [[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]] — Künzel SR, Sekhon JS, Bickel PJ, Yu B. 2019. *PNAS* 116(10): 4156–4165.

## Cross-Links to Existing Vault Notes

- [[Causal Estimands]] — CATE is the target quantity throughout (ITE, SATE, CATE, PATE defined)
- [[Potential Outcomes Framework]] — foundational setup (potential outcomes, ignorability)
- [[Propensity Score in Bayesian CI]] — propensity score $e(x)$ used as weight in X-learner
- [[Nonparametric Causal Inference]] — BART is a common base learner for metalearners
- [[The Experimental Ideal]] — randomization justifies metalearner assumptions (ignorability)
