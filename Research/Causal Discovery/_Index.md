---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-28
concept_count: 11
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Contains **11 notes** spanning
> the three main algorithm families: continuous-optimization (NOTEARS), constraint-based (PC),
> and score-based (GES), plus foundational theory (Markov equivalence, CPDAGs).
>
> - Want the fundamental identifiability theory (CPDAG, Markov equivalence)? → [[Markov Equivalence Classes and CPDAGs]]
> - Want the constraint-based approach (PC algorithm)? → [[PC Algorithm - Overview]]
> - Want Phase 1 details (skeleton, CI tests, $\alpha$)? → [[PC Algorithm - Skeleton Discovery]]
> - Want Phase 2–3 details (v-structures, Meek rules)? → [[PC Algorithm - V-Structures and Meek Rules]]
> - Want the score-based approach (GES)? → [[GES - Greedy Equivalence Search]]
> - Want a methods comparison (PC vs GES vs NOTEARS)? → [[Causal Discovery Methods - Comparison]]
> - Want the NOTEARS continuous-optimization approach? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need the key acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization details (augmented Lagrangian, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Verma-Pearl: same skeleton + v-structures → same CPDAG |
| PC algorithm (overview) | [[PC Algorithm - Overview]] | overview | [[Markov Equivalence Classes and CPDAGs]] | 3-phase: skeleton → v-structures → Meek rules |
| Skeleton discovery (Phase 1) | [[PC Algorithm - Skeleton Discovery]] | concept | [[PC Algorithm - Overview]] | CI tests at growing $\lvert S\rvert$; Sep sets |
| V-structures + Meek rules (Phases 2–3) | [[PC Algorithm - V-Structures and Meek Rules]] | concept | [[PC Algorithm - Skeleton Discovery]] | R1–R4 complete for CPDAG completion |
| Greedy Equivalence Search | [[GES - Greedy Equivalence Search]] | overview | [[Markov Equivalence Classes and CPDAGs]] | FES (Insert) + BES (Delete); consistent under BIC |
| Methods comparison | [[Causal Discovery Methods - Comparison]] | concept | [[PC Algorithm - Overview]], [[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]] | PC: CI-based; GES: score-based; NOTEARS: continuous |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Foundational Theory
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Markov property, faithfulness, Verma-Pearl theorem, CPDAG definition, identifiability limits.

### Constraint-Based Methods (PC Algorithm)
- [[PC Algorithm - Overview]] — CONTAINS: three-phase overview, assumptions (Markov + faithfulness), complexity table, PC-stable variant, software.
- [[PC Algorithm - Skeleton Discovery]] — CONTAINS: formal skeleton algorithm, CI test options (Fisher $z$, $\chi^2$, kernel), significance level $\alpha$, error propagation, PC-stable fix.
- [[PC Algorithm - V-Structures and Meek Rules]] — CONTAINS: immorality definition, v-structure orientation rule, Meek R1–R4 (full statement), order dependence, conservative PC.

### Score-Based Methods (GES)
- [[GES - Greedy Equivalence Search]] — CONTAINS: BIC score decomposability, Insert/Delete operators, FES + BES phases, Chickering 2002 consistency theorem, FGES, software.

### Synthesis
- [[Causal Discovery Methods - Comparison]] — CONTAINS: three-family taxonomy table, identifiability limits, assumptions comparison, practical guidance, ABM and BN connections.

### NOTEARS (Continuous Optimization)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), Prop. 1–2, sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF benchmarks, SHD/FDR vs FGS, Sachs real-data, limitations.

## Cross-Cutting Concepts
- **Markov equivalence class / CPDAG**: the fundamental identifiability target; appears in [[Markov Equivalence Classes and CPDAGs]] (theory), [[PC Algorithm - V-Structures and Meek Rules]] (how to build it), and [[GES - Greedy Equivalence Search]] (how to search over it).
- **Faithfulness assumption**: required by all three families; defined in [[Markov Equivalence Classes and CPDAGs]], invoked by [[PC Algorithm - Overview]] and [[GES - Greedy Equivalence Search#^thm-ges-consistency]].
- **Decomposable score (BIC)**: the score criterion shared by GES and NOTEARS; defined in [[GES - Greedy Equivalence Search#^def-decomposable]]; connects to [[Overfitting and Information Criteria]] and [[Choosing and Building Models]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS*, NeurIPS 2018.
- [[raw/chickering02b-GES-source.txt]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR v3. (PDF blocked by proxy; see source file.)
- [[raw/spirtes00-CPS-source.txt]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, MIT Press 2nd ed. (PDF blocked by proxy; see source file.)
- [[raw/kalisch07a-PC-source.txt]] — Kalisch & Bühlmann (2007), *Estimating High-Dimensional DAGs with the PC-Algorithm*, JMLR v8. (PDF blocked by proxy; see source file.)

## See Also
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven DAG construction (complement to data-driven)
- [[Summary Causal DAGs]] — downstream use of learned DAGs (Zeng 2025)
- [[Approximate Bayesian Computation for ABMs]] — ABM calibration context where structure learning is relevant
