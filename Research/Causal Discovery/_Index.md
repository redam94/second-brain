---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-18
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Covers three paradigms:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization**
> (NOTEARS). 9 concept notes.
> - Want a paradigm comparison? → [[Causal Discovery Methods Overview]]
> - Need the PC algorithm (CI tests → skeleton → v-structures → CPDAG)? → [[PC Algorithm]]
> - Need GES (score-based, two-phase greedy → CPDAG)? → [[Greedy Equivalence Search (GES)]]
> - Need the shared theoretical foundation (CPDAG, Verma-Pearl, Meek rules)? → [[Markov Equivalence Classes and CPDAGs]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Paradigm comparison: PC vs GES vs NOTEARS | [[Causal Discovery Methods Overview]] | overview | [[PC Algorithm]], [[Greedy Equivalence Search (GES)]], [[NOTEARS - Overview]] | Three paradigms; practical guidance table |
| CPDAG, Verma-Pearl, Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[Directed Acyclic Graphs]], [[DAG Structure Learning Problem]] | Equivalence iff same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Skeleton + v-structures + Meek → CPDAG |
| GES algorithm (score-based) | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence Classes and CPDAGs]] | FES + BES → CPDAG; Meek Conjecture proved |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Causal Discovery Methods Overview]] — CONTAINS: three-paradigm comparison table (PC/GES/NOTEARS), shared assumptions, practical guidance (when to use each), failure modes, identifiability beyond CPDAG (LiNGAM, equal-variance, ANM), ABM application context.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Causal Markov Condition, Faithfulness definition, **Verma-Pearl Theorem** (same skeleton + v-structures ↔ equivalent), **CPDAG definition** (essential graph), **Meek's 4 orientation rules (R1–R4)**, 3-variable worked example.
- [[PC Algorithm]] — CONTAINS: PC assumptions (Markov, Faithfulness, Sufficiency), skeleton phase algorithm (growing conditioning sets), v-structure phase (separating sets), Meek propagation, **consistency theorem** (Spirtes/Kalisch-Bühlmann), complexity table, order-dependence issue (PC-stable), CI test options table, 4-variable worked example, software (pcalg/causal-learn).
- [[Greedy Equivalence Search (GES)]] — CONTAINS: score properties (decomposable, equivalent, consistent), **GES algorithm** (FES forward phase + BES backward phase), **Meek Conjecture theorem** (Chickering 2002 Theorem 15), why two phases needed, complexity, FES 3-variable worked example, software (pcalg/causal-learn), FGES extension.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/Chickering2002-GES-reference.md]] — Chickering, D.M. (2002). *Optimal Structure Identification With Greedy Search*. JMLR 3:507–554. (PDF blocked at ingest time; reference note only.)
- [[raw/SpirtesGlymourScheines2000-PC-reference.md]] — Spirtes, Glymour & Scheines (2000). *Causation, Prediction, and Search* (2nd ed.). MIT Press. (Not downloadable; reference note only.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
