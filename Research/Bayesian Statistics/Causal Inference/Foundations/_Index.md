---
title: "Index: Causal Inference Foundations"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Causal Inference]]"
date_updated: 2026-04-10
concept_count: 9
---

# Causal Inference Foundations

> [!abstract] Routing Summary
> This folder covers foundational causal inference concepts — potential outcomes, estimands, frequentist estimators — plus causal DAG graph theory and summarization. Contains 9 notes.
> - Need the potential outcomes setup, SUTVA, ignorability, overlap? → [[Potential Outcomes Framework]]
> - Need formal definitions of ITE, SATE, CATE, PATE, MATE? → [[Causal Estimands]]
> - Need Frequentist estimators (IPW, outcome modeling, doubly-robust)? → [[Frequentist Causal Estimation]]
> - Need overview of causal DAG summarization (problem formulation + CaGReS results)? → [[Zeng 2025 - Overview]]
> - Need the formal definition of summary causal DAGs + NP-hardness proof? → [[Summary Causal DAGs]]
> - Need node contraction = edge addition (Theorem 4.1, canonical DAG)? → [[Canonical Causal DAGs]]
> - Need the CaGReS greedy algorithm (GetCost, optimizations, complexity)? → [[CaGReS Algorithm]]
> - Need s-separation for CI identification in summary DAGs? → [[s-Separation in Summary DAGs]]
> - Need do-calculus soundness/completeness for summary DAGs + ATE computation? → [[Do-Calculus in Summary Causal DAGs]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| SUTVA | [[Potential Outcomes Framework]] | definition | — | No interference, no multiple versions |
| Ignorability | [[Potential Outcomes Framework]] | definition | — | Unconfoundedness + overlap → identification |
| Propensity score | [[Potential Outcomes Framework]] | definition | SUTVA | $e(x) = \Pr(Z=1\mid X=x)$; balancing score |
| ITE | [[Causal Estimands]] | definition | Potential Outcomes Framework | $\tau_i = Y_i(1) - Y_i(0)$ |
| CATE | [[Causal Estimands]] | definition | ITE | $\tau(x) = \mu_1(x) - \mu_0(x)$ |
| PATE / SATE / MATE | [[Causal Estimands]] | definition | ITE | Population vs. sample vs. empirical-$X$ average |
| IPW estimator | [[Frequentist Causal Estimation]] | theorem | Ignorability | Consistent if propensity score model correct |
| Doubly-robust estimator | [[Frequentist Causal Estimation]] | theorem | IPW + outcome model | Consistent if *either* model correct |
| Summary causal DAG | [[Summary Causal DAGs]] | definition | [[Directed Acyclic Graphs]] | Pair $(\mathcal{H}, f)$; node contraction; NP-hard to optimize (Theorem 3.2) |
| Canonical causal DAG | [[Canonical Causal DAGs]] | theorem | [[Summary Causal DAGs]] | $\text{RB}(\mathcal{H}) \equiv \text{RB}(\mathcal{G}_\mathcal{H})$ (Theorem 4.1); contraction = edge addition |
| CaGReS algorithm | [[CaGReS Algorithm]] | concept | [[Canonical Causal DAGs]] | Greedy; $O((n-k)\cdot n^2)$; minimizes added edges; 4 optimizations |
| s-Separation | [[s-Separation in Summary DAGs]] | theorem | [[Canonical Causal DAGs]] | Sound + complete for CI in summary DAGs (Theorem 4.2) |
| Do-calculus on summary DAGs | [[Do-Calculus in Summary Causal DAGs]] | theorem | [[s-Separation in Summary DAGs]] | Soundness (Thm 6.1) + completeness (Thm 6.2); ATE valid on summary DAG |

## Notes

- [[Potential Outcomes Framework]] — CONTAINS: SUTVA (Assumption), Ignorability/Overlap (Assumption 2.1), identification equation, design vs. analysis stage distinction
- [[Causal Estimands]] — CONTAINS: ITE, SATE, CATE, PATE, MATE formal definitions with LaTeX; principal causal effects (IV preview)
- [[Frequentist Causal Estimation]] — CONTAINS: outcome modeling estimator, IPW (definition), Hájek IPW, doubly-robust estimator (definition + double robustness theorem), matching/weighting overview
- [[Zeng 2025 - Overview]] — CONTAINS: paper overview (arXiv 2504.14937); 4 contributions; experimental summary over 6 datasets; comparison to baselines
- [[Summary Causal DAGs]] — CONTAINS: Def 1 (summary DAG), Def 2 (compatibility), node contraction operation, 3 summarization constraints, Theorem 3.2 (NP-hardness), REDSHIFT example
- [[Canonical Causal DAGs]] — CONTAINS: Def 5 (canonical causal DAG), Def CI Sets equivalence, Theorem 4.1 (RB equivalence = contraction ↔ edge addition), why adding edges preserves validity
- [[CaGReS Algorithm]] — CONTAINS: Algorithm 1 (CaGReS pseudocode), Algorithm 2 (GetCost), 4 optimizations (semantic constraint, caching, low-cost merges, $O((n-k)\cdot n^2)$ complexity), FLIGHTS example
- [[s-Separation in Summary DAGs]] — CONTAINS: Def 6 (valid CI), Def 7 (s-separation), s-separation algorithm, Theorem 4.2 (soundness + completeness), example with $\mathcal{H}_1$
- [[Do-Calculus in Summary Causal DAGs]] — CONTAINS: Theorem 6.1 (soundness), Theorem 6.2 (completeness), ATE formula, REDSHIFT ATE example with robustness illustration

## Sources

- [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — §2, pp. 2–5
- [[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]] — Zeng, Cafarella, Kenig, Markakis, Youngmann & Salimi. arXiv 2504.14937v1. Causal DAG summarization via node contraction; CaGReS algorithm.

## See Also
- [[Bayesian Inference/_Index|Bayesian Inference]] — how Bayesian CI builds on these foundations
- [[Directed Acyclic Graphs]] — prerequisite DAG theory (d-separation, do-calculus, RB)
- [[Code Prompts for Causal Structure]] — how DAG structure maps to code `if` statements for LLM reasoning
