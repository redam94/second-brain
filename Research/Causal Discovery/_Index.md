---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-06
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Now covers three paradigms:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization**
> (NOTEARS). 9 concept notes + 1 paper.
>
> **By algorithm:**
> - PC algorithm (constraint-based, CI tests) → [[PC Algorithm]]
> - GES (score-based, Chickering 2002) → [[GES - Greedy Equivalence Search]]
> - NOTEARS (continuous optimization) → [[NOTEARS - Overview]]
>
> **By concept:**
> - Markov equivalence and CPDAGs (shared output of PC and GES) → [[Markov Equivalence Classes and CPDAGs]]
> - Comparison of all three paradigms → [[Causal Structure Learning - Comparison]]
>
> **NOTEARS internals:**
> - Problem setup (SEM, score functions, NP-hardness) → [[DAG Structure Learning Problem]]
> - Key acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$) → [[Smooth Characterization of Acyclicity]]
> - Optimization (augmented Lagrangian, L-BFGS, Algorithm 1) → [[NOTEARS Algorithm]]
> - Empirical results (vs PC, GES/FGS, SHD/FDR, Sachs data) → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Same skeleton + v-structures ↔ Markov equivalent |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Skeleton via CI tests + v-struct orient → CPDAG |
| PC consistency in high dims | [[PC Algorithm]] | theorem | [[PC Algorithm]] | $p=O(n^a)$, sparse graph → correct CPDAG w.p.1 |
| GES (score-based) | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Forward+backward greedy on CPDAGs → correct CPDAG |
| Meek Conjecture | [[GES - Greedy Equivalence Search]] | theorem | [[GES - Greedy Equivalence Search]] | Covered-edge reversals connect equivalent DAGs → GES is consistent |
| Algorithm comparison | [[Causal Structure Learning - Comparison]] | concept | [[PC Algorithm]], [[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]] | PC < GES < NOTEARS (dense/large $p$); GES > PC (finite sample) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-based (PC)
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Def. Markov equivalence (Verma & Pearl 1990), CPDAG definition, Meek orientation rules R1–R4, identifiability limit, examples (chain/fork/collider).
- [[PC Algorithm]] — CONTAINS: 3-phase skeleton–v-structure–Meek algorithm, separation sets, v-structure rule, consistency theorem (Kalisch & Bühlmann 2007), complexity, Sachs example, software.

### Score-based (GES)
- [[GES - Greedy Equivalence Search]] — CONTAINS: BIC score + decomposability, Insert/Delete CPDAG operators, 2-phase algorithm, Meek Conjecture (Chickering 2002 Thm 15), GES consistency theorem, FGES extension, PC vs GES table.

### Synthesis
- [[Causal Structure Learning - Comparison]] — CONTAINS: identifiability limit theorem, assumption comparison table, full algorithm comparison table, empirical benchmarks (NOTEARS paper), decision guide, ABM applications.

### NOTEARS internals
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
- [[raw/spirtes-glymour-scheines-2000-CPS.md]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd ed., MIT Press. (PDF blocked by network policy; open access at MIT Press and CMU.)
- [[raw/chickering2002-GES-JMLR.md]] — Chickering (2002), "Optimal structure identification with greedy search," *JMLR* 3:507-554. (PDF blocked; open access at jmlr.org.)
- [[raw/kalisch-buhlmann2007-PC-JMLR.md]] — Kalisch & Bühlmann (2007), "Estimating high-dimensional DAGs with the PC-algorithm," *JMLR* 8:613-636. (PDF blocked; open access at jmlr.org and arXiv:math/0510436.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, causal DAG reasoning
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — vault application: DAG summarization presupposes structure learning
- [[Approximate Bayesian Computation for ABMs]] — ABC as an alternative calibration method for ABMs producing observational data
