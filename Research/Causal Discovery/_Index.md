---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-22
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from observational data. Three paradigms
> are now covered: **NOTEARS** (continuous optimization), **PC** (constraint-based), and **GES**
> (score-based). 10 concept notes spanning the full methodological landscape.
>
> - Want the paradigm landscape? → [[Causal Structure Learning - Paradigm Comparison]]
> - **PC algorithm** (constraint-based, CI tests): → [[PC Algorithm - Overview]], [[PC Algorithm - Skeleton Phase]], [[PC Algorithm - Orientation Phase]]
> - **GES** (score-based, Chickering 2002): → [[GES - Overview]]
> - **NOTEARS** (continuous optimization): → [[NOTEARS - Overview]], [[NOTEARS Algorithm]], [[Smooth Characterization of Acyclicity]]
> - Problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Empirical results (NOTEARS vs FGS/GES, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Paradigm landscape: PC, GES, NOTEARS | [[Causal Structure Learning - Paradigm Comparison]] | concept | [[DAG Structure Learning Problem]] | Three paradigms; when to use which |
| PC algorithm: overview, assumptions, CPDAG output | [[PC Algorithm - Overview]] | overview | [[DAG Structure Learning Problem]] | Faithfulness + Markov → consistent CPDAG |
| PC skeleton phase: CI tests, sep-sets | [[PC Algorithm - Skeleton Phase]] | concept | [[PC Algorithm - Overview]] | Remove edges via $X_i \perp\!\!\!\perp X_j \mid S$ |
| PC orientation: v-structures + Meek rules | [[PC Algorithm - Orientation Phase]] | concept | [[PC Algorithm - Skeleton Phase]] | R1–R4 orientation rules → complete CPDAG |
| GES: Greedy Equivalence Search | [[GES - Overview]] | overview | [[DAG Structure Learning Problem]] | Chickering Thm. 15: consistent CPDAG recovery |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | NOTEARS beats GES/FGS on dense/large graphs |

## Notes

### PC Algorithm (Constraint-Based)
- [[PC Algorithm - Overview]] — CONTAINS: three assumptions (Markov, faithfulness, sufficiency), two-phase overview, CPDAG definition, consistency theorem (Kalisch & Bühlmann 2007), software table.
- [[PC Algorithm - Skeleton Phase]] — CONTAINS: skeleton-learning procedure (Def.), faithfulness ↔ CI theorem, Fisher's z-test (Ex.), separation sets (Def.), high-dimensional consistency (Kalisch & Bühlmann 2007), complexity.
- [[PC Algorithm - Orientation Phase]] — CONTAINS: v-structure definition (Def.), detection procedure (Def.), Meek's R1–R4 rules (Def.), CPDAG reading guide (Def.), completeness theorem (Meek 1995), four-node example.

### GES (Score-Based)
- [[GES - Overview]] — CONTAINS: score requirements (Def.: score equivalence + decomposability), Gaussian BIC formula, GES three-phase algorithm (Def.: Insert, Delete, Turn operators), Chickering consistency Thm. 15 (Thm.), Meek conjecture, comparison table with PC, FGS/fast GES note.

### Paradigm Comparison
- [[Causal Structure Learning - Paradigm Comparison]] — CONTAINS: three-paradigm overview (constraint/score/continuous), assumptions table, consistency table, computational table, practical decision guide, extensions table (FCI, DAGMA, NOTEARS-MLP).

### NOTEARS (Continuous Optimization)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** ($\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** ($\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent, L-BFGS / proximal quasi-Newton, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence / CPDAG**: the output representation shared by all three paradigms; v-structures determine equivalence — [[PC Algorithm - Orientation Phase]] (detection) and [[GES - Overview]] (search over equivalence classes).
- **Faithfulness assumption**: required by both PC and GES; fails on measure-zero parameter sets — [[PC Algorithm - Overview]] has the key note.
- **Linear SEM / weighted adjacency matrix $W$**: the underlying data model for NOTEARS; appears in [[DAG Structure Learning Problem]] and connects to [[Confirmatory Factor Analysis and SEM]].
- **Matrix exponential $e^{W\circ W}$**: the engine of NOTEARS's constraint — [[Smooth Characterization of Acyclicity]] and [[NOTEARS Algorithm]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed., MIT Press. [PDF not downloaded — proxy restriction]
- Chickering (2002) — "Optimal Structure Identification With Greedy Search", *JMLR* 3:507–554. [PDF not downloaded — proxy restriction]
- Kalisch & Bühlmann (2007) — "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm", *JMLR* 8:613–636. [PDF not downloaded — proxy restriction]

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Directed Acyclic Graphs]] — d-separation and the back-door criterion (used by all three paradigms)
- [[Summary Causal DAGs]] — downstream application: summarizing learned DAGs from ABM output
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-based (non-data-driven) DAG construction
- [[Approximate Bayesian Computation for ABMs]] — learned DAGs can inform ABM calibration
