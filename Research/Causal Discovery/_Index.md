---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-10
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigms are now covered:
> **NOTEARS** (continuous optimization, Zheng et al. 2018) and **constraint-based / score-based**
> classical methods (PC algorithm and GES, added 2026-08-10). 10 concept notes + 3 raw sources.
>
> **Need the conceptual foundation?**
> - What are Markov equivalence classes and CPDAGs? → [[Markov Equivalence Classes and CPDAGs]]
>
> **Constraint-based (PC algorithm):**
> - Overview of PC algorithm (assumptions, 3 phases, consistency)? → [[PC Algorithm - Overview]]
> - Phase 1 — Skeleton discovery via CI tests (Fisher's Z, G², KCI)? → [[PC Skeleton Discovery and CI Testing]]
> - Phases 2–3 — V-structures and Meek orientation rules? → [[CPDAG Orientation - V-Structures and Meek Rules]]
>
> **Score-based (GES):**
> - GES overview (FES, BES, Turning phase, Chickering consistency theorem)? → [[GES - Greedy Equivalence Search]]
>
> **Continuous optimization (NOTEARS):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs GES, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| **— Foundational —** | | | | |
| Markov equivalence of DAGs | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures ↔ same CIs |
| CPDAG (essential graph) | [[Markov Equivalence Classes and CPDAGs]] | definition | — | Unique canonical MEC representative |
| Meek completeness | [[Markov Equivalence Classes and CPDAGs]] | theorem | — | R1–R3 exhaustive application → full CPDAG |
| **— Constraint-Based (PC) —** | | | | |
| PC algorithm overview | [[PC Algorithm - Overview]] | overview | [[Markov Equivalence Classes and CPDAGs]] | Consistent CPDAG recovery under faithfulness |
| Skeleton discovery + sep sets | [[PC Skeleton Discovery and CI Testing]] | concept | [[PC Algorithm - Overview]] | Remove edges via $X_i \perp X_j \mid S$; complexity $O(d^{k+2})$ |
| V-structure + Meek rules | [[CPDAG Orientation - V-Structures and Meek Rules]] | concept | [[PC Skeleton Discovery and CI Testing]] | R1–R3 orient all compelled edges |
| **— Score-Based (GES) —** | | | | |
| GES (Chickering 2002) | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | FES + BES = true CPDAG (Meek Conjecture proved) |
| **— Continuous Optimization (NOTEARS) —** | | | | |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats GES on dense/large graphs; ≈ global optimum |

## Notes

### Foundational
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Markov condition, faithfulness def, skeleton def, v-structure def, **characterisation theorem** (same skeleton + v-structures ↔ Markov equiv), CPDAG def, small MEC example, Meek completeness theorem, identifiability limit.

### Constraint-Based: PC Algorithm
- [[PC Algorithm - Overview]] — CONTAINS: 3-phase overview pseudocode, **PC consistency theorem**, complexity table, Stable PC def, PC vs GES vs NOTEARS comparison table, FCI note for hidden confounders.
- [[PC Skeleton Discovery and CI Testing]] — CONTAINS: skeleton discovery formal algorithm, **adjacency-set sufficiency theorem**, separating sets role, Fisher's Z def, G-squared def, KCI description, Stable PC skeleton def, complexity table.
- [[CPDAG Orientation - V-Structures and Meek Rules]] — CONTAINS: v-structure orientation rule, MEC example, **Meek R1–R4** definitions, **Meek completeness theorem**, PDAG-to-CPDAG completion algorithm, covered edge/Turning Phase note.

### Score-Based: GES
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable/score-equivalent score defs, Gaussian BIC score def, **Insert operator** def, FES algorithm, **FES I-map theorem**, **Delete operator** def, BES algorithm, **GES consistency theorem (Meek Conjecture)**, **Turn operator** def, Turning Phase, PC vs GES comparison table.

### Continuous Optimization: NOTEARS
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs GES (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/ges-python-implementation-readme.md]] — juangamella/ges Python implementation README (GitHub), documenting Chickering (2002) *Optimal Structure Identification With Greedy Search* (JMLR v3) and Hauser & Bühlmann (2012) *GIES* (JMLR v13).
- [[raw/causal-learn-pc-source.py]] — causal-learn PC algorithm source (py-why/causal-learn, GitHub), implementing Spirtes, Glymour & Scheines (2000) with Stable PC (Colombo & Maathuis 2014).
- [[raw/causal-learn-ges-source.py]] — causal-learn GES source (py-why/causal-learn, GitHub), implementing Chickering (2002) with BIC and multiple score options.

## Cross-Cutting Concepts
- **Faithfulness assumption**: required by both PC and GES; appears in [[Markov Equivalence Classes and CPDAGs]] (definition) and both algorithm overview notes.
- **Conditional independence oracle**: the shared abstraction — PC tests it explicitly ([[PC Skeleton Discovery and CI Testing]]), GES encodes it implicitly in the score ([[GES - Greedy Equivalence Search]]).
- **CPDAG / essential graph**: the common output of PC and GES; the canonical MEC representation ([[Markov Equivalence Classes and CPDAGs]]) that NOTEARS's DAG output is evaluated against ([[NOTEARS Experiments]]).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference (fork/pipe/collider = non-collider/chain/fork)
- [[Directed Acyclic Graphs]] — DAG fundamentals and d-separation; prerequisite to this folder
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — structure learning precedes the DAG summarization in Zeng 2025 (§4)
