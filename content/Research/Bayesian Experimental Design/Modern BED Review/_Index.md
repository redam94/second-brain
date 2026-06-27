---
title: "Index: Modern BED Review"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Experimental Design]]"
date_updated: 2026-06-27
concept_count: 5
---

# Modern BED Review

> [!abstract] Routing Summary
> **Rainforth, Foster, Ivanova & Bickford Smith (2023), *Modern Bayesian Experimental Design* (Statistical Science).** A review of how ML advances transformed BED into a deployable framework. Contains 5 notes + overview.
> - New here / structure of the review / the three big messages? → [[Modern Bayesian Experimental Design - Overview]]
> - EIG vs Fisher information, alphabetic optimality, why Bayesian? → [[Information-Theoretic Design Objectives]]
> - Nested estimation, MLMC debiasing, variational & implicit bounds? → [[The Computational Revolution in EIG Estimation]]
> - Black-box optimizers vs stochastic-gradient design? → [[Optimization and Gradient Schemes for BED]]
> - Deep adaptive design (DAD), policy networks, total EIG? → [[From Designs to Policies (Deep Adaptive Design)]]
> - Misspecification, active-learning/RL links, scaling, applications? → [[Open Challenges and Future Directions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Review structure; three messages; relation to Foster papers | [[Modern Bayesian Experimental Design - Overview]] | overview | [[Sequential and Adaptive BED]] | ML advances make EIG cheap to estimate & optimize; policies are the leap |
| EIG vs FIM; alphabetic optimality; why Bayesian | [[Information-Theoretic Design Objectives]] | concept | [[Expected Information Gain]] | FIM is a matrix that depends on unknown $\theta$; Bayesian avoids both flaws |
| Nested estimation; MLMC debiasing; variational; implicit | [[The Computational Revolution in EIG Estimation]] | concept | [[Nested Estimation and Nested Monte Carlo]] | MLMC → unbiased $\mathcal{O}(C^{-1/2})$; normalized $q$ → variational bound |
| Black-box vs gradient optimization; unified SGA; bias propagation | [[Optimization and Gradient Schemes for BED]] | concept | [[Unified SGD BOED - Overview]] | SGA on a lower bound (Eq. 15) replaces BO/grid; debiasing makes it consistent |
| DAD; policy network; total EIG; non-myopic; iDAD/RL | [[From Designs to Policies (Deep Adaptive Design)]] | concept | [[Sequential and Adaptive BED]] | $\xi_t=\pi_\phi(h_{t-1})$ trained offline on TEIG; real-time, non-myopic |
| Policy scaling; active learning/RL; misspecification; applications | [[Open Challenges and Future Directions]] | concept | [[From Designs to Policies (Deep Adaptive Design)]] | BED especially sensitive to misspecification; embrace richer models |

## Notes

- [[Modern Bayesian Experimental Design - Overview]] — CONTAINS: review section→note map; three big messages; how the review synthesizes/generalizes Foster 2019 & 2020 and goes beyond to policies.
- [[Information-Theoretic Design Objectives]] — CONTAINS: EIG as one of a family of posterior-utility objectives; FIM definition + two flaws (matrix; depends on $\theta$); alphabetic A/D/E-optimality; why-Bayesian arguments; model-dependence caveat.
- [[The Computational Revolution in EIG Estimation]] — CONTAINS: MLMC debiasing (Goda 2022, Eqs. 9–11, antithetic coupling, $\mathcal{O}(C^{-1/2})$); variational upper/lower bounds (Eqs. 12–14); implicit-model estimation; debiasing-vs-variational trade-off table.
- [[Optimization and Gradient Schemes for BED]] — CONTAINS: estimator-wrapping optimizers (BO, evolutionary, coordinate exchange); unified SGA lower bound (Eq. 15); implicit-model & MLMC gradient routes; Kleinegesse–Gutmann parallel; bias-propagation and discrete-design difficulties.
- [[From Designs to Policies (Deep Adaptive Design)]] — CONTAINS: design-policy definition; total EIG (Eqs. 16–17); offline-train/live-deploy (Fig. 2); non-myopia; lineage (Huan–Marzouk → DAD → iDAD → RL); empirical quality gains.
- [[Open Challenges and Future Directions]] — CONTAINS: policy-based BAD scaling; active-learning (BALD) & Bayesian-RL links; misspecification catastrophic-failure (linear-regression extremes example); likelihood-principle protection; implicit-simulator & richer-model directions.

## Sources
- [[../raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]] — Rainforth, T., Foster, A., Ivanova, D.R., Bickford Smith, F. (2023), *Modern Bayesian Experimental Design*, **Statistical Science** (accepted). arXiv:2302.14545.

## See Also
- [[Foundations/_Index|Foundations]] — the EIG, nested estimation, and adaptive-design core
- [[Research/Bayesian Experimental Design/Variational EIG Estimators/_Index|Variational EIG Estimators]] — the §3.3.1 variational bounds in detail
- [[Research/Bayesian Experimental Design/Gradient-Based Unified BOED/_Index|Gradient-Based Unified BOED]] — the §3.4 unified gradient approach in detail
