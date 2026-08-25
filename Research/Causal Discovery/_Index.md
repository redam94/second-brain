---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-25
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Covers three paradigms:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 9 concept notes across 3 methods.
> - Want the constraint-based approach (CI tests → skeleton → CPDAG)? → [[PC Algorithm - Overview]]
> - Need the 3 phases of PC (skeleton discovery, v-structures, Meek rules)? → [[PC Algorithm - Skeleton and Orientation]]
> - Want the score-based approach (BIC over CPDAGs)? → [[GES - Overview]]
> - Need Insert/Delete/Turn operators and FES/BES algorithm? → [[GES - Forward and Backward Search]]
> - Want the continuous-optimization approach? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs PC, GES, FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Constraint-based causal discovery | [[PC Algorithm - Overview]] | overview | [[DAG Structure Learning Problem]] | CI tests → CPDAG under faithfulness |
| PC phases: skeleton, v-structures, Meek | [[PC Algorithm - Skeleton and Orientation]] | concept | [[PC Algorithm - Overview]] | 3-phase procedure; stable PC removes order-dependence |
| Score-based CPDAG search | [[GES - Overview]] | overview | [[DAG Structure Learning Problem]] | BIC-optimal CPDAG; consistent under faithfulness |
| Insert/Delete/Turn operators and FES/BES | [[GES - Forward and Backward Search]] | concept | [[GES - Overview]] | Local score-change formulas; FES complete, BES sound |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats PC and GES on dense/large graphs; ≈ global optimum |

## Notes

**Constraint-based (PC algorithm)**
- [[PC Algorithm - Overview]] — CONTAINS: Causal Markov / Faithfulness / Causal Sufficiency assumptions; Markov equivalence; CPDAG definition; complexity table; stable PC; FCI extension mention.
- [[PC Algorithm - Skeleton and Orientation]] — CONTAINS: Phase 1 skeleton discovery (depth-$k$ CI testing, stable PC algorithm, CI test choices table); Phase 2 v-structure detection; Phase 3 Meek rules R1–R4 with complete statements; examples (chain, fork vs. v-structure).

**Score-based (GES)**
- [[GES - Overview]] — CONTAINS: score-equivalence definition; Gaussian BIC score formula; CPDAG neighbourhood theorem; GES 3-phase algorithm; consistency theorem (FES completeness + BES soundness); PC vs. GES comparison table.
- [[GES - Forward and Backward Search]] — CONTAINS: Insert$(X,Y,T)$ definition and validity; Delete$(X,Y,H)$ definition; Turn$(X,Y,C)$; score-change formulas (local, node-$Y$ only); FES and BES pseudocode; examples (v-structure FES, why BES needed).

**Continuous optimization (NOTEARS)**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs PC/GES/FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-canonical-references.md]] — Canonical citations for PC (Spirtes, Glymour & Scheines 2000; Spirtes & Glymour 1991), GES (Chickering 2002, JMLR), Turning phase (Hauser & Bühlmann 2012), and Meek rules (Meek 1995). PDFs freely available but inaccessible due to network proxy during this run.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
