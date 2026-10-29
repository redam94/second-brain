---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-29
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three families of methods:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 8 concept notes + 1 paper.
> - Want an overview of all three methods? → [[DAG Structure Learning Problem]] (landscape table)
> - Need constraint-based structure learning (PC algorithm)? → [[PC Algorithm]]
> - Need score-based structure learning (GES / Chickering 2002)? → [[GES - Greedy Equivalence Search]]
> - Need Markov equivalence classes and CPDAGs? → [[Equivalence Classes and CPDAGs]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the key acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Equivalence Classes and CPDAGs]] | Two-phase: skeleton (CI tests) → orient (v-structures + Meek) → CPDAG |
| Score-based structure learning | [[GES - Greedy Equivalence Search]] | concept | [[Equivalence Classes and CPDAGs]] | GES consistent under faithfulness; Meek Conjecture proved |
| Markov equivalence / CPDAG | [[Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures ⟺ Markov equivalent |
| Meek's orientation rules | [[Equivalence Classes and CPDAGs]] | theorem | — | R1–R4 complete CPDAG from skeleton+v-structures |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[PC Algorithm]] — CONTAINS: 3 assumptions (Markov, faithfulness, sufficiency), Phase 1 skeleton recovery (CI test loop, separation sets), Phase 2 v-structure orientation, Phase 3 Meek's rules, PC-stable order-invariant variant, pcalg R code.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable BIC/BDeu score, Forward Equivalence Search (Insert operators), Backward Equivalence Search (Delete operators), consistency theorem (Meek Conjecture), complexity $O(d^3)$, FGS variant, pcalg R code.
- [[Equivalence Classes and CPDAGs]] — CONTAINS: Markov equivalence definition (Verma & Pearl 1990), CPDAG definition, directed vs. undirected edges, Meek's rules R1–R4, identifiable vs. non-identifiable edges.
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
- Chickering (2002) — "Optimal Structure Identification With Greedy Search", *JMLR* 3, pp. 507–554. [PDF: jmlr.org/papers/v3/chickering02b.html] (PDF unavailable due to session network policy; notes synthesised from training knowledge.)
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed., MIT Press. (PDF unavailable due to session network policy; notes synthesised from training knowledge.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
