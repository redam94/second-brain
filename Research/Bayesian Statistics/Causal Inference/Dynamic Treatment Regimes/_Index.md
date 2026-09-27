---
title: "Index: Dynamic Treatment Regimes"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Causal Inference]]"
date_updated: 2026-09-27
concept_count: 3
---

# Dynamic Treatment Regimes

> [!abstract] Routing Summary
> This folder covers optimal dynamic treatment regimes (DTRs) — sequential decision rules that personalize treatment based on evolving patient history. Contains 3 notes from Schulte et al. (2014), *Statistical Science*.
> - Need the formal DTR setup (potential outcomes, Q-functions, backward induction)? → [[Dynamic Treatment Regimes Framework]]
> - Need Q-learning vs. A-learning estimation procedures and double robustness? → [[Q-Learning and A-Learning]]
> - Need the paper overview (structure, application, key results)? → [[Schulte 2014 - Overview]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Dynamic treatment regime | [[Dynamic Treatment Regimes Framework]] | concept | Potential outcomes | Optimal regime via backward induction on Q-functions |
| Q-learning | [[Q-Learning and A-Learning]] | concept | DTR framework | Backward OLS; requires all Q-functions correctly specified |
| A-learning | [[Q-Learning and A-Learning]] | concept | DTR framework | Doubly robust; models contrast functions only |

## Notes

- [[Schulte 2014 - Overview]] — CONTAINS: paper structure, core problem setup, methods summary table, STAR*D application context
- [[Dynamic Treatment Regimes Framework]] — CONTAINS: DTR definition, sequential randomization assumption, Q-function definition (§2–3), backward induction optimality theorem, midstream regime theorem (§4)
- [[Q-Learning and A-Learning]] — CONTAINS: Q-learning algorithm (backward OLS/WLS), contrast function definition, A-learning estimating equations, double robustness theorem, Q vs. A comparison table

## Sources

- [[raw/q- and a- learning.pdf]] — Schulte PJ, Tsiatis AA, Laber EB, Davidian M. 2014. "Q- and A-learning methods for estimating optimal dynamic treatment regimes." *Stat. Sci.* 29(4): 640–661. doi:10.1214/13-STS450
