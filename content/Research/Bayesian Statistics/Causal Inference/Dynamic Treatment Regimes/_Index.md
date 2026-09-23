---
title: "Index: Dynamic Treatment Regimes"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Causal Inference]]"
date_updated: 2026-06-27
concept_count: 5
---

# Dynamic Treatment Regimes

> [!abstract] Routing Summary
> Estimating **optimal dynamic treatment regimes (DTRs)** — sequences of decision rules for personalized, multi-stage treatment — from clinical-trial or observational data (Schulte, Tsiatis, Laber & Davidian 2014). Covers the two main methods, **Q-learning** and **A-learning**, and the bias–variance / robustness trade-off between them. Contains 5 notes.
> - New here / want the comparison? → [[Q- and A-learning - Overview]]
> - Potential outcomes, optimal-regime definition, identification assumptions? → [[Dynamic Treatment Regimes Framework]]
> - Q-functions, value functions, backward induction, midstream regimes? → [[Optimal Regime via Dynamic Programming]]
> - Backward-regression estimation (the simple method)? → [[Q-learning]]
> - Contrast/advantage functions, g-estimation, double robustness, simulations? → [[A-learning and Robustness]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| DTR review; Q vs A-learning | [[Q- and A-learning - Overview]] | overview | [[Potential Outcomes Framework]] | Q-learning more efficient when correct; A-learning more robust |
| Sequential potential outcomes; optimal regime; assumptions | [[Dynamic Treatment Regimes Framework]] | definition | [[Causal Estimands]] | $d^{\text{opt}}$ identified under consistency + sequential randomization + positivity |
| Q-functions, value functions, backward induction | [[Optimal Regime via Dynamic Programming]] | theorem | [[Dynamic Treatment Regimes Framework]] | $d_k^{\text{opt}}=\arg\max_{a_k}Q_k$; observed = potential under assumptions; presentation-invariant |
| Backward-regression estimation of Q-functions | [[Q-learning]] | concept | [[Optimal Regime via Dynamic Programming]] | Consistent only if all $Q_k$ correct; value-to-go response is nonlinear |
| Contrast/advantage functions, g-estimation, double robustness | [[A-learning and Robustness]] | concept | [[Q-learning]] | Consistent if contrast + (propensity OR nuisance) correct; robust but less efficient |

## Notes

- [[Q- and A-learning - Overview]] — CONTAINS: research question, Q-vs-A comparison table, three key findings, relation to metalearners/g-computation.
- [[Dynamic Treatment Regimes Framework]] — CONTAINS: notation; Def. sequential potential outcomes (Eq. 1); Def. DTR & optimal regime (Eqs. 3-4); the 4 identification assumptions; feasible regimes; SMART vs. observational designs.
- [[Optimal Regime via Dynamic Programming]] — CONTAINS: backward-induction recursion (Eqs. 5-8); Def. Q- and value functions (Eqs. 9-14); identification theorem (Eq. 19); midstream presentation-invariance theorem (Eq. 25).
- [[Q-learning]] — CONTAINS: backward WLS/OLS estimating equations (Eqs. 26-28); linear two-decision example (Eq. 29); nonlinearity/misspecification of the value-to-go response; flexible-model remedies.
- [[A-learning and Robustness]] — CONTAINS: Def. contrast/advantage function; g-estimation equations (Eqs. 30-31); double-robustness property; efficiency-vs-robustness trade-off and simulation findings (Figs. 1-6).

## Sources
- q- and a- learning — Schulte, Tsiatis, Laber & Davidian (2014), "Q- and A-learning Methods for Estimating Optimal Dynamic Treatment Regimes", *Statistical Science* 29(4):640–661. Demonstrated on the STAR\*D depression study (§7).

## See Also
- [[Time-Varying Treatments and G-computation]] — related sequential-treatment identification
- [[Metalearners for CATE]] — single-stage analog (S/T/X-learners)
- [[Potential Outcomes Framework]] / [[Causal Estimands]] — the underlying causal-inference foundations
