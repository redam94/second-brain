---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-11-06
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic paradigms:
> (1) **constraint-based** (PC algorithm), (2) **score-based** (GES), and (3) **continuous
> optimization** (NOTEARS). All three return a [[Markov Equivalence and CPDAGs|CPDAG]].
> - What is a CPDAG / Markov equivalence class? → [[Markov Equivalence and CPDAGs]]
> - **PC algorithm** (constraint-based, CI tests)? → [[PC Algorithm]]
> - **GES** (score-based, Chickering 2002)? → [[Greedy Equivalence Search]]
> - **NOTEARS** paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness, landscape table)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need NOTEARS optimization (augmented Lagrangian, L-BFGS, thresholding)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, v-structures, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent ↔ same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Skeleton from CI tests + orient v-structures + Meek rules |
| Fisher z-test + high-dim consistency | [[PC Algorithm]] | theorem | [[Markov Equivalence and CPDAGs]] | Consistent when $d=O(n^a)$, sparse $q$ (Kalisch & Bühlmann 2007) |
| GES: FES + BES phases | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Greedy score maximization in CPDAG space |
| GES consistency + Meek Conjecture | [[Greedy Equivalence Search]] | theorem | [[Markov Equivalence and CPDAGs]] | Returns true CPDAG as $n\to\infty$ (Chickering 2002) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov condition, faithfulness assumption, v-structures (unshielded colliders), **Theorem** (Verma & Pearl 1991: equiv ↔ skeleton + v-structures), CPDAG definition (directed/undirected edges), Meek's 4 orientation rules (R1–R4), covered edges, 3-variable worked example.
- [[PC Algorithm]] — CONTAINS: Assumptions A1–A3 (Markov, faithfulness, causal sufficiency), **Algorithm: skeleton discovery** (level-ℓ CI testing), **Algorithm: v-structure orientation** (Sepset rule), Fisher's z-test for Gaussian data, **Theorem: high-dim consistency** (Kalisch & Bühlmann 2007), complexity analysis, PC-stable variant, comparison table PC vs GES.
- [[Greedy Equivalence Search]] — CONTAINS: BIC score definition, **Algorithm: FES phase** (Insert operator, local score change), **Algorithm: BES phase** (Delete operator), **Theorem: GES consistency** (Chickering 2002, Thm. 15), **Theorem: Meek Conjecture** (Chickering 2002, Thm. 2), fGES variant, GES vs PC trade-offs, 3-variable chain + v-structure examples.
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
- [[raw/spirtes-glymour-scheines-2000-ref.md]] — Spirtes, Glymour & Scheines, *Causation, Prediction, and Search*, MIT Press 2000. Source of PC algorithm (PDF download blocked by network policy; reference stub only).
- [[raw/chickering-2002-ges-ref.md]] — Chickering, "Optimal structure identification with greedy search", *JMLR* 3:507–554, 2002. Source of GES + Meek Conjecture (PDF download blocked; reference stub only).
- [[raw/kalisch-buhlmann-2007-pc-ref.md]] — Kalisch & Bühlmann, "Estimating high-dimensional directed acyclic graphs with the PC-algorithm", *JMLR* 8:613–636, 2007 (arXiv:math/0510436). High-dimensional PC (download blocked; reference stub only).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
