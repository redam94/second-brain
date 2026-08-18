---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-18
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two approaches:
> **continuous optimization** (NOTEARS) and **constraint-based / score-based classical methods** (PC, GES).
>
> **NOTEARS cluster:**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need the key acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization algorithm (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **Constraint-based / score-based cluster (PC + GES):**
> - Need the assumptions underlying all constraint-based methods (CMC, faithfulness, sufficiency)? → [[Causal Markov and Faithfulness]]
> - Need the concept of Markov equivalence classes and CPDAGs? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the PC algorithm overview (high-level, comparison table)? → [[PC Algorithm - Overview]]
> - Need the PC algorithm phases in full detail (skeleton, v-structures, Meek rules R1–R4)? → [[PC Algorithm - Phases]]
> - Need the GES (Greedy Equivalence Search) score-based algorithm? → [[GES - Greedy Equivalence Search]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |
| CMC, Faithfulness, Causal Sufficiency | [[Causal Markov and Faithfulness]] | concept | [[Directed Acyclic Graphs]] | Faithfulness ↔ two-way d-sep/CI correspondence |
| Markov equivalence class, CPDAG, v-structure | [[Markov Equivalence Classes and CPDAGs]] | concept | [[Causal Markov and Faithfulness]] | Verma-Pearl: equivalent ↔ same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm - Overview]] | overview | [[DAG Structure Learning Problem]], [[Causal Markov and Faithfulness]] | Recovers CPDAG via CI tests |
| PC phases (skeleton, v-structures, Meek R1–R4) | [[PC Algorithm - Phases]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Skeleton $O(d^{q+2})$ CI tests; consistent in $d \gg n$ |
| GES (score-based, FES + BES) | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]], [[DAG Structure Learning Problem]] | Consistent under faithfulness + locally consistent score |

## Notes

**NOTEARS cluster:**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series), **Prop. 2** (matrix exp), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

**Constraint-based / score-based cluster (added 2026-08-18):**
- [[Causal Markov and Faithfulness]] — CONTAINS: CMC definition, Faithfulness definition and failure example, Causal Sufficiency, Identifiability theorem (recovery up to MEC), strong faithfulness condition (Kalisch & Bühlmann 2007).
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: V-structure definition, Verma-Pearl theorem (equivalence ↔ skeleton + v-structures), MEC definition, CPDAG definition + construction, identifiability of directed vs undirected edges, Meek's conjecture statement.
- [[PC Algorithm - Overview]] — CONTAINS: paradigm comparison table (constraint/score/continuous), PC assumptions, algorithm summary, consistency result, CI test options (Gaussian/discrete/nonparametric), PC vs GES vs NOTEARS comparison table.
- [[PC Algorithm - Phases]] — CONTAINS: **Phase 1** (skeleton algorithm, conditioning-set size increments, CI test choices, high-dimensional consistency theorem), **Phase 2** (v-structure orientation, why Sep detects colliders), **Phase 3** (Meek rules R1–R4 definitions and completeness theorem), order-dependence / PC-stable variant.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score definition, locally consistent score definition, **FES algorithm** (Insert operator), **BES algorithm** (Delete operator), score-gain formula for Insert, **GES consistency theorem** (Chickering 2002), FGES extension, GES vs PC comparison table, interventional extensions (GIES, Hauser & Bühlmann 2012).

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov equivalence class / CPDAG**: the common identification target of both PC ([[PC Algorithm - Overview]]) and GES ([[GES - Greedy Equivalence Search]]), defined in [[Markov Equivalence Classes and CPDAGs]].
- **Faithfulness assumption**: required by PC and GES for consistency proofs; defined in [[Causal Markov and Faithfulness]]; not required by NOTEARS (score recovery only).
- **Meek orientation rules R1–R4**: proved complete by Meek (1995); used in **Phase 3 of PC** ([[PC Algorithm - Phases]]) and in the theoretical proof of **GES** via the Meek conjecture ([[Markov Equivalence Classes and CPDAGs]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- [[raw/spirtes-glymour-scheines-2000-CPS.bib]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd Ed., MIT Press. PDF blocked by session egress proxy; see bib file for URL.
- [[raw/chickering-2002-ges.bib]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554. Also: Meek (1995). PDF blocked by session egress proxy; see bib file for URL.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference (fork/pipe/collider)
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[BN Construction Methods Comparison]] — expert-elicited vs data-driven BN structure
- [[Summary Causal DAGs]] — DAG summarization of ABM outputs (structure learning precedes this)
- [[Nonparametric Causal Inference]] — related causal-modeling material
