---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-31
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **NOTEARS** (continuous optimization), **PC** (constraint-based), and **GES** (score-based).
> - Want an overview of all three methods? → [[Causal Discovery Methods - Comparison]]
> - Need the CPDAG / Markov equivalence class concept (shared foundation)? → [[CPDAG and Markov Equivalence]]
> - Need the **PC algorithm** (constraint-based, CI tests)? → [[PC Algorithm - Overview]]
> - Need **GES** (score-based, Chickering 2002, Meek Conjecture)? → [[GES - Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[CPDAG and Markov Equivalence]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv iff same skeleton + v-structures (Verma & Pearl 1990) |
| PC algorithm (constraint-based) | [[PC Algorithm - Overview]] | concept | [[CPDAG and Markov Equivalence]] | Sound & complete CPDAG under faithfulness; $O(d^{q+2})$ |
| GES algorithm (score-based) | [[GES - Greedy Equivalence Search]] | concept | [[CPDAG and Markov Equivalence]] | Meek Conjecture → correct CPDAG under faithfulness + Gaussian |
| Methods comparison: PC vs GES vs NOTEARS | [[Causal Discovery Methods - Comparison]] | concept | All three methods | Decision guide by $d$, distribution, output format |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-Based and Score-Based Methods (new 2026-08-31)
- [[CPDAG and Markov Equivalence]] — CONTAINS: Def of Markov equivalence (Verma & Pearl 1990), v-structures, CPDAG existence/uniqueness theorem (Meek 1995), Meek orientation rules R1–R4, identifiability limits from observational data.
- [[PC Algorithm - Overview]] — CONTAINS: Causal Markov/faithfulness/sufficiency defs, PC algorithm full pseudocode (3 phases), correctness theorem, high-dimensional consistency (Kalisch & Bühlmann 2007), CI test options (Fisher z, χ², kernel), complexity $O(d^{q+2})$, order-dependence issue (PC-stable), software (pcalg, causal-learn).
- [[GES - Greedy Equivalence Search]] — CONTAINS: BIC/BGe score defs, **Meek Conjecture** (Chickering 2002, Thm 15), GES two-phase algorithm pseudocode, Insert/Delete operator defs, GES consistency theorem (Thm 18), complexity $O(d^4 q^3)$, FGES extension, software.
- [[Causal Discovery Methods - Comparison]] — CONTAINS: Side-by-side comparison table (PC vs GES vs NOTEARS vs exact), paradigm decision guide, identifiability conditions (LiNGAM, ANM), ABM application, hybrid methods (MMHC, GFCI, FGES, DAGMA).

### NOTEARS (Continuous Optimization)
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
- [[raw/spirtes2000-CPS.txt]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search* (2nd ed.), MIT Press. **Note**: PDF blocked by network egress policy; reference file created.
- [[raw/chickering2002-GES.txt]] — Chickering (2002), "Optimal Structure Identification With Greedy Search", *JMLR* 3:507–554. **Note**: PDF blocked by network egress policy; reference file created.
- [[raw/kalisch2007-PC.txt]] — Kalisch & Bühlmann (2007), "Estimating High-Dimensional DAGs with the PC-Algorithm", *JMLR* 8:613–636. **Note**: PDF blocked by network egress policy; reference file created.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
