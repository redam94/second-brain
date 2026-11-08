---
title: "Index: Bareinboim Pearl 2016 - Causal Inference and Data Fusion"
tags:
  - type/index
  - source/ingested
  - topic/causal-transportability
parent: "[[../_Index|Causal Transportability]]"
date_updated: 2026-11-08
concept_count: 12
---

# Bareinboim Pearl 2016 - Causal Inference and Data Fusion

> [!abstract] Routing Summary
> This folder fully captures Bareinboim and Pearl (2016), *Causal inference and the data-fusion problem* (PNAS 113(27): 7345-7352): the four generalization tasks, the two principles of causal inference, backdoor/front-door/z-identification, the selection-backdoor criterion for sampling bias, clinical-trial generalization with post-treatment variables, transport formulas (Eqs. 15-17) and multi-source data fusion. 4 notes plus this index.
> - Need the paper on one page or the section-to-note map? -> [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]]
> - Need the SCM, counterfactual semantics, d-separation, do-calculus, backdoor, front-door or z-identification? -> [[Bareinboim 2016 - SCM Principles and Confounding Bias]]
> - Need selection bias, S-backdoor (Definition 4, Theorem 1) or the clinical-trial Eq. 14? -> [[Bareinboim 2016 - Sample Selection Bias and Recoverability]]
> - Need transport formulas 15-17, the transportability criterion or data fusion (Summary Result 3)? -> [[Bareinboim 2016 - Transportability and Data Fusion]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Four tasks / designs (Fig. 1) | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] | concept | - | design = (population, regime, sampling) |
| Two principles of causal inference | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] | theorem | SCM | structural counterfactuals; structural independences |
| Backdoor criterion and adjustment | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] | definition | d-separation | $\sum_zP(y\mid x,z)P(z)$ |
| Front-door adjustment | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] | theorem | do-calculus | Eq. 10 |
| z-identification | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] | theorem | do-calculus | iff $X$ intercepts $Z\to Y$ paths and Q identifiable in $G_{\overline Z}$ |
| Selection backdoor criterion | [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] | definition | backdoor | Def. 4 |
| Recovery under S-backdoor | [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] | theorem | Def. 4 | $\sum_zP(y\mid x,z,S=1)P(z)$ |
| Clinical trial generalization | [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] | theorem | S-admissibility | Eq. 14 with $P(z\mid x)$ |
| Transport formulas | [[Bareinboim 2016 - Transportability and Data Fusion]] | theorem | selection diagrams | Eqs. 15-17 |
| Transportability iff criterion | [[Bareinboim 2016 - Transportability and Data Fusion]] | theorem | do-calculus | rule sequence separating $do$ from $S$ |
| Data fusion | [[Bareinboim 2016 - Transportability and Data Fusion]] | concept | transportability | consistent estimator from limited sources (Summary Result 3) |

## Notes

- [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]] — CONTAINS: abstract; thesis; contributions; Source Map; key results table.
- [[Bareinboim 2016 - SCM Principles and Confounding Bias]] — CONTAINS: Fig. 1 task table; SCM; Eq. 1; two principles; Definitions 1-3; Rules 1-3; Eqs. 8-12; Fig. 3; Summary Result 1; numeric backdoor example.
- [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] — CONTAINS: Fig. 4A-F; Definition 4; Eq. 13; Theorem 1; Eq. 14; S-ignorability critique; Summary Result 2; simulation.
- [[Bareinboim 2016 - Transportability and Data Fusion]] — CONTAINS: selection diagram; Fig. 5A-D; Eqs. 15-17; transportability criterion; data fusion; Summary Result 3; conclusion; marketing fusion illustration.

## Sources

- [[raw/Bareinboim 2016 - Causal Inference and the Data-Fusion Problem.pdf]] — Bareinboim E and Pearl J (2016), PNAS 113(27): 7345-7352 (UCLA TR R-450 reprint, 8 pp.), the sole source.

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]] — full single-source theory.
- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]] — estimators.
- [[Directed Acyclic Graphs]], [[DAGs and Causal Identification]], [[Do-Calculus in Summary Causal DAGs]], [[Instrumental Variables]].
