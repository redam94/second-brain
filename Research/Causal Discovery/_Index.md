---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-11
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> - Want the PC algorithm (constraint-based)? → [[PC Algorithm - Overview]]
> - Need the skeleton phase (CI tests, sepsets)? → [[PC Algorithm - Skeleton Phase]]
> - Need v-structures and Meek rules (CPDAG construction)? → [[PC Algorithm - Orientation Phase]]
> - Want score-based search (GES, Meek conjecture)? → [[Greedy Equivalence Search]]
> - Want NOTEARS (continuous optimization)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the NOTEARS acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need NOTEARS empirical results (vs GES, PC, SHD/FDR)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| PC algorithm overview + assumptions | [[PC Algorithm - Overview]] | overview | [[DAG Structure Learning Problem]] | Constraint-based; consistent for $p \gg n$ under sparsity |
| Skeleton via CI tests + Stable-PC | [[PC Algorithm - Skeleton Phase]] | concept | [[PC Algorithm - Overview]] | $O(p^{q+2})$ tests; Stable-PC fixes order-dependence |
| V-structures + Meek rules → CPDAG | [[PC Algorithm - Orientation Phase]] | concept | [[PC Algorithm - Skeleton Phase]] | CPDAGs identify MEC; Meek rules are complete |
| GES: score-based MEC search | [[Greedy Equivalence Search]] | concept | [[DAG Structure Learning Problem]] | Asymptotically optimal under faithfulness + BIC |
| Meek conjecture (covered reversals) | [[Greedy Equivalence Search]] | theorem | [[PC Algorithm - Orientation Phase]] | All MECs reachable via covered edge reversals |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats GES/PC on dense/large graphs; ≈ global optimum |

## Notes

### PC Algorithm (constraint-based)
- [[PC Algorithm - Overview]] — CONTAINS: algorithm overview, faithfulness + causal sufficiency assumptions, CPDAG target, Markov equivalence, high-dimensional consistency theorem (Kalisch & Bühlmann 2007), PC vs GES vs NOTEARS comparison.
- [[PC Algorithm - Skeleton Phase]] — CONTAINS: complete-to-sparse skeleton algorithm pseudocode, separating sets (sepsets), CI test options (Fisher z, χ², kernel), complexity bound $O(p^{q+2})$, order-dependence problem and Stable-PC fix (Colombo & Maathuis 2014).
- [[PC Algorithm - Orientation Phase]] — CONTAINS: v-structure (immorality) definition, sepset-based orientation rule, Meek rules R1–R4 with pseudocode, completeness theorem, CPDAG interpretation (directed = identified; undirected = not), worked example (3-variable v-structure).

### GES (score-based)
- [[Greedy Equivalence Search]] — CONTAINS: decomposable score definition (BIC, BDe), Insert/Delete operators on CPDAGs, GES algorithm pseudocode (forward + backward phases), Meek conjecture proof (Chickering 2002 Thm. 15), asymptotic optimality theorem, PC vs GES tradeoff table, FGES extension.

### NOTEARS (continuous optimization)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS/PC/GES (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG**: the output of both PC ([[PC Algorithm - Orientation Phase]]) and GES ([[Greedy Equivalence Search]]) — the unique CPDAG for a Markov equivalence class.
- **Faithfulness assumption**: required by both PC and GES; a violation breaks CI-based skeleton recovery and score-based MEC search alike.
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018.
- [[raw/PC-algorithm-sources.md]] — Spirtes, Glymour & Scheines (2000); Kalisch & Bühlmann (2007 JMLR); Meek (1995); Colombo & Maathuis (2014). PDFs at jmlr.org and arXiv:math/0510436.
- [[raw/chickering2002-GES.md]] — Chickering (2002 JMLR v3), "Optimal Structure Identification with Greedy Search." PDF at jmlr.org/papers/v3/chickering02b.html.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — causal DAG summarization (structure learning precedes summarization)
