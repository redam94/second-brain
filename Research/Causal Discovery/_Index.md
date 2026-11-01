---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-11-01
concept_count: 12
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **continuous optimization** (NOTEARS), **constraint-based** (PC algorithm), and **score-based
> search** (GES). 11 concept notes + 1 landscape overview.
> - Want the three-paradigm comparison (PC vs. GES vs. NOTEARS)? → [[Causal Discovery - Landscape]]
> - Want **PC algorithm** (constraint-based, CI tests)? → [[PC Algorithm]]
> - Want **GES** (score-based, Chickering 2002)? → [[GES - Greedy Equivalence Search]]
> - Want **CPDAG / Markov equivalence classes**? → [[CPDAG and Markov Equivalence Classes]]
> - Want **CI testing** (Fisher Z, HSIC, G²)? → [[Conditional Independence Testing in PC]]
> - Want **v-structures and Meek rules**? → [[V-Structures and Meek Orientation Rules]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Three-paradigm comparison (PC/GES/NOTEARS) | [[Causal Discovery - Landscape]] | overview | [[DAG Structure Learning Problem]] | When to use each algorithm |
| Markov equivalence, CPDAG, faithfulness | [[CPDAG and Markov Equivalence Classes]] | concept/def | [[Directed Acyclic Graphs]] | Equivalence class = common identifiable object |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept/def | [[CPDAG and Markov Equivalence Classes]] | Consistent CPDAG recovery; high-dim (Kalisch & Bühlmann 2007) |
| Fisher Z, HSIC, CI tests | [[Conditional Independence Testing in PC]] | concept/def | [[PC Algorithm]] | $H_0: \rho_{ij\cdot S}=0$; Fisher Z statistic |
| V-structures, Meek rules | [[V-Structures and Meek Orientation Rules]] | concept/theorem | [[PC Algorithm]] | Completeness of Meek rules for CPDAG |
| GES (score-based search) | [[GES - Greedy Equivalence Search]] | concept/def | [[CPDAG and Markov Equivalence Classes]] | Meek conjecture → GES consistent under faithfulness |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### PC algorithm cluster (added 2026-11-01)
- [[Causal Discovery - Landscape]] — CONTAINS: three-paradigm table (PC / GES / NOTEARS), when-to-use guide, faithfulness and identifiability, connections to rest of vault.
- [[CPDAG and Markov Equivalence Classes]] — CONTAINS: Markov condition def, faithfulness def, Markov equivalence (Verma-Pearl characterization), CPDAG def and characterization theorem, identifiability limits, exceptions (LiNGAM, ANM).
- [[PC Algorithm]] — CONTAINS: full algorithm (Phases I/II/III), skeleton discovery pseudocode, chain example, v-structure example, high-dim consistency theorem (Kalisch & Bühlmann), CI test table, pcalg/causal-learn code.
- [[Conditional Independence Testing in PC]] — CONTAINS: partial correlation def, Fisher's Z statistic def and example, precision matrix formula, multiple testing discussion, KCI (kernel-based) def, G²-test for discrete data.
- [[V-Structures and Meek Orientation Rules]] — CONTAINS: unshielded triple def, v-structure identification theorem (sep set criterion), all 4 Meek rules with proofs, completeness theorem, 4-node worked example.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score def, Meek conjecture (Theorem 18), covered edge def, GES algorithm (FES + BES phases), score increment decomposability, GES consistency theorem, FGES, pcalg/causal-learn code.

### NOTEARS cluster (2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence / CPDAG**: the identifiable object from observational data; central to PC and GES ([[CPDAG and Markov Equivalence Classes]]), contrasted with NOTEARS's single-DAG output.
- **Faithfulness assumption**: required by all three paradigms; [[CPDAG and Markov Equivalence Classes]] and [[PC Algorithm]] discuss when it holds and when it fails.
- **Linear SEM / weighted adjacency matrix $W$**: the NOTEARS object of estimation; appears in [[DAG Structure Learning Problem]] and threads through [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **Meek rules**: used in Phase III of [[PC Algorithm]] and internally by [[GES - Greedy Equivalence Search]] to maintain valid CPDAGs; completeness proved in [[V-Structures and Meek Orientation Rules]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/kalisch2007-PC-algorithm-source.md]] — Kalisch & Bühlmann (2007), *Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm*, JMLR 8:613–636. (URL: https://jmlr.org/papers/v8/kalisch07a.html; PDF blocked by session proxy)
- [[raw/chickering2002-GES-source.md]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554. (URL: https://jmlr.org/papers/v3/chickering02b.html; PDF blocked by session proxy)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, Markov conditions
- [[Summary Causal DAGs]] — DAG summarization (assumes DAG is given; structure learning precedes this)
