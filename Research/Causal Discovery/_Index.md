---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-05
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithm families are now
> covered: **NOTEARS** (continuous optimization), **PC** (constraint-based, CI tests), and
> **GES** (score-based greedy). 10 notes total.
>
> **NOTEARS (continuous optimization):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **PC Algorithm (constraint-based):**
> - Need the full PC algorithm (skeleton + v-structures + Meek rules)? → [[PC Algorithm]]
> - Need CI test details (Fisher z, G-test, KCI)? → [[Conditional Independence Tests for Causal Discovery]]
>
> **GES (score-based greedy):**
> - Need GES (FES + BES phases, Meek conjecture, correctness)? → [[Greedy Equivalence Search]]
>
> **Shared foundations:**
> - Need Markov equivalence, CPDAG, Meek rules? → [[Markov Equivalence Classes and CPDAGs]]
> - Need to compare PC vs GES vs NOTEARS? → [[Constraint-Based vs Score-Based Causal Discovery]]

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
| Markov equivalence + CPDAG + Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Equiv ↔ same skeleton + v-structures; CPDAG as canonical rep |
| Fisher z-test + CI tests for PC | [[Conditional Independence Tests for Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | $\sqrt{n-\|S\|-3}\,\mathrm{arctanh}(\hat\rho_{ij\|S})\sim\mathcal{N}(0,1)$ under H₀ |
| PC algorithm skeleton + orientation | [[PC Algorithm]] | concept | [[Conditional Independence Tests for Causal Discovery]] | Recovers true CPDAG under faithfulness; consistent in HD |
| GES FES + BES + Meek conjecture | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Consistent under BIC + faithfulness (Chickering 2002 Thm 17) |
| PC vs GES vs NOTEARS comparison | [[Constraint-Based vs Score-Based Causal Discovery]] | overview | [[PC Algorithm]], [[Greedy Equivalence Search]] | Decision guide + shared identifiability ceiling |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: skeleton def, v-structure def, Verma–Pearl theorem (equiv ↔ skeleton + v-structures), CPDAG def, Meek rules R1–R4 with soundness/completeness, chain/fork/collider examples.
- [[Conditional Independence Tests for Causal Discovery]] — CONTAINS: CI def, partial correlation def, **Fisher's z-test** (full statement + decision rule), G-test for discrete data, KCI overview, test-selection table.
- [[PC Algorithm]] — CONTAINS: Markov + faithfulness assumptions, **PC-Skeleton** pseudocode, v-structure orientation rule, Meek rules application, **correctness theorem** (Spirtes et al.), **high-dimensional consistency theorem** (Kalisch & Bühlmann 2007), 4-variable worked example, limitations table, PC-stable note.
- [[Greedy Equivalence Search]] — CONTAINS: decomposable score def, BIC score def, **FES pseudocode**, **BES pseudocode**, Insert/Delete operators, **Meek Conjecture / Chickering Theorem 15**, **GES correctness theorem** (Thm 17), turning phase (Hauser & Bühlmann), 3-variable and v-structure examples.
- [[Constraint-Based vs Score-Based Causal Discovery]] — CONTAINS: algorithm taxonomy table, PC strengths/weaknesses, GES strengths/weaknesses, NOTEARS strengths/weaknesses, decision guide table, identifiability ceiling, evaluation metrics (SHD, FDR, TPR).

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering2002-GES.txt]] — Chickering, D. M. (2002). *Optimal structure identification with greedy search*. JMLR 3, 507–554. [PDF blocked by network policy; open-access at jmlr.org]
- [[raw/kalisch2007-PC.txt]] — Kalisch, M. & Bühlmann, P. (2007). *Estimating high-dimensional directed acyclic graphs with the PC-Algorithm*. JMLR 8, 613–636. [PDF blocked by network policy; open-access at jmlr.org / arXiv math/0510436]
- Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*. 2nd ed. MIT Press. [foundational reference for PC algorithm; not downloaded]

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
