---
title: "Index: Pearl Bareinboim 2014 - External Validity and Transportability"
tags:
  - type/index
  - source/ingested
  - topic/causal-transportability
parent: "[[../_Index|Causal Transportability]]"
date_updated: 2026-11-08
concept_count: 14
---

# Pearl Bareinboim 2014 - External Validity and Transportability

> [!abstract] Routing Summary
> This folder fully captures Pearl and Bareinboim (2014), *External Validity: From Do-Calculus to Transportability Across Populations* (Statistical Science 29(4): 579-595): selection diagrams, the formal definition of transportability, Theorem 1 (do-calculus criterion), Theorems 2-3 with S-admissibility, Corollaries 1-2, Examples 1-10, the transport formulas (3.1)-(3.4), (5.9), (5.10) and their appendix derivations. 8 notes plus this index, with a marketing reading and runnable checks.
> - Need the paper on one page or the section-to-note map? -> [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
> - Need SEM, $do(x)$, identifiability, d-separation or the three do-calculus rules? -> [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]]
> - Need the LA-to-NYC examples and Eqs. 3.1-3.4? -> [[Pearl 2014 - Motivating Examples and Transport Formulas]]
> - Need Definition 4 (selection diagram), Definitions 5-7, Theorem 1? -> [[Pearl 2014 - Selection Diagrams and Definition of Transportability]]
> - Need S-admissibility, Theorems 2-3, Corollaries 1-2, Examples 7-10? -> [[Pearl 2014 - S-Admissibility and the Graphical Criterion]]
> - Need the step-by-step derivation of Eqs. 5.9 and 5.10? -> [[Pearl 2014 - Appendix Derivations of Transport Formulas]]
> - Need limits, meta-transportability, and the comparison with meta-analysis? -> [[Pearl 2014 - Conclusions, Extensions and Limits]]
> - Need to transport a geo or lift result to a new market (worked numbers)? -> [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Structural equation model | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] | definition | [[Directed Acyclic Graphs]] | $v_i=f_i(pa_i,u)$ with $P(u)$ |
| Identifiability | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] | definition | SEM | $P(M_1)=P(M_2)\Rightarrow Q(M_1)=Q(M_2)$ |
| d-separation | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] | definition | DAG | blocking of paths |
| Do-calculus Rules 1-3 | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] | theorem | d-separation | complete for $P(y\mid do(x),z)$ |
| Transport formula (3.1) | [[Pearl 2014 - Motivating Examples and Transport Formulas]] | example | Rules | $\sum_zP(y\mid do(x),z)P^*(z)$ |
| Transport formula (3.4), surrogate | [[Pearl 2014 - Motivating Examples and Transport Formulas]] | example | (3.1) | $\sum_zP(y\mid do(x),z)P^*(z\mid x)$ |
| Selection diagram (Def. 4) | [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] | definition | SEM | $S_i\to V_i$ where mechanisms may differ |
| Transportability (Def. 5) | [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] | definition | Def. 4, identifiability | $R(\Pi^*)$ computable from $P,P^*,I$ |
| Trivial / direct transportability (Defs. 6-7) | [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] | definition | Def. 5 | identifiable in target / $R(\Pi^*)=R(\Pi)$ |
| Theorem 1 | [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] | theorem | Rules | $S$ only as conditioning in do-free terms |
| S-admissibility (Def. 8), Theorem 2, Corollaries 1-2 | [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] | theorem | Thm 1 | $(Y\perp S\mid Z,X)_{D_{\overline X}}$ licenses reweighting |
| Theorem 3 (three conditions) | [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] | theorem | Thm 2 | recursive, sufficient, not complete |
| Derivations of (5.9), (5.10) | [[Pearl 2014 - Appendix Derivations of Transport Formulas]] | example | Thm 3 | what to measure where |
| Meta-transportability, caveats | [[Pearl 2014 - Conclusions, Extensions and Limits]] | concept | all | worst-case nonparametric licenses |

## Notes

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]] — CONTAINS: research question, contributions, key result, full Source Map (every section, Definition, Theorem, Figure to note).
- [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] — CONTAINS: Sec. 1 motivation; inference-engine inputs/outputs; Definitions 1-3; Rules 1-3; Manski footnote; Python d-separation test.
- [[Pearl 2014 - Motivating Examples and Transport Formulas]] — CONTAINS: Examples 1-3; Eqs. 3.1-3.4; proxy analysis; surrogate endpoint; numeric check and Python.
- [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] — CONTAINS: Definition 4-7; Theorem 1 with proof; Examples 4-6; Manski remark; hierarchy of transport notions.
- [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] — CONTAINS: Theorems 2-3 with proofs (Eqs. 5.1-5.7); Definition 8; Corollaries 1-2; Examples 7-10; limits; Python S-admissibility check.
- [[Pearl 2014 - Appendix Derivations of Transport Formulas]] — CONTAINS: line-by-line derivations of (5.9) and (5.10) with justifications; Monte Carlo verification.
- [[Pearl 2014 - Conclusions, Extensions and Limits]] — CONTAINS: worst-case character; statistical transportability; relation to meta-analysis; limited experiments and meta-transportability; caveats; checklist.
- [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]] — CONTAINS: mapping table; market-mix worked example (1.40 vs 0.96); mediator example (3.2 vs 2.3); checks before reporting.

## Sources

- Pearl 2014 - External Validity From Do-Calculus to Transportability — Pearl J and Bareinboim E (2014), Statistical Science 29(4): 579-595 (arXiv 1503.01603), the sole source. The marketing note is interpretation.

## See Also

- [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]] — PNAS survey placing this paper in a unified taxonomy.
- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]] — potential-outcomes review with estimators.
- [[Directed Acyclic Graphs]], [[DAGs and Causal Identification]], [[Do-Calculus in Summary Causal DAGs]], [[Geo-Experiment Methodology - Overview]].
