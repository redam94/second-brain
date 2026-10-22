---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-22
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic families:
> **NOTEARS** (continuous optimization, Zheng et al. 2018), **PC** (constraint-based, Spirtes et al. 2000),
> and **GES** (score-based, Chickering 2002). 10 concept notes + 2 papers.
>
> **NOTEARS cluster:**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **PC / GES cluster (added 2026-10-22):**
> - Need the identifiability foundations (what a CPDAG is, Meek rules)? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the Markov / Faithfulness / Sufficiency assumptions? → [[Causal Discovery Assumptions]]
> - Need the PC algorithm (skeleton phase, v-structures, Meek orientation)? → [[PC Algorithm]]
> - Need order-independence fix + high-$d$ consistency? → [[Stable PC and High-Dimensional Extensions]]
> - Need score-based search over equivalence classes? → [[GES Algorithm]]

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
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures |
| CMC, Faithfulness, Causal Sufficiency | [[Causal Discovery Assumptions]] | concept | [[Directed Acyclic Graphs]] | Together make distribution identifiable to CPDAG |
| PC algorithm (skeleton + orientation) | [[PC Algorithm]] | concept | [[Causal Discovery Assumptions]], [[Markov Equivalence Classes and CPDAGs]] | Two-phase CI-test-based CPDAG recovery |
| Stable-PC; high-$d$ consistency | [[Stable PC and High-Dimensional Extensions]] | concept | [[PC Algorithm]] | Order-independent skeleton; consistent for $d=O(n^a)$ |
| GES: FES + BES over CPDAGs | [[GES Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]], [[Causal Discovery Assumptions]] | Score-based greedy search consistent under faithfulness |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Def. Markov equivalence (same skeleton + v-structures), Def. CPDAG, three-variable example, **Meek's 4 orientation rules** (R1–R4) with proofs, equivalence class size discussion.
- [[Causal Discovery Assumptions]] — CONTAINS: **Causal Markov Condition** (factorisation formula), **Faithfulness** (when it fails, adjacency faithfulness variant), **Causal Sufficiency** (FCI extension for violations), **Acyclicity**, identifiability theorem.
- [[PC Algorithm]] — CONTAINS: full 2-phase algorithm (skeleton + orientation), CI test table (Gaussian/nonparametric/discrete), skeletal correctness theorem, v-structure orientation rule, consistency theorem, Sachs example, `pcalg` usage.
- [[Stable PC and High-Dimensional Extensions]] — CONTAINS: order-dependence definition, **Stable-PC algorithm** (batch updates), Conservative-PC, **Kalisch & Bühlmann (2007) consistency theorem** ($d=O(n^a)$, sparse degree), `pcalg` R code.
- [[GES Algorithm]] — CONTAINS: decomposable score definition, score table (BIC/BDeu/BGe/L0), **FES algorithm** (forward search), **BES algorithm** (backward search), **consistency theorem**, **Meek Conjecture** (covered edges), FGES extension.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **CPDAG as identifiable output**: the object that PC, GES, and (approximately) NOTEARS all target; defined in [[Markov Equivalence Classes and CPDAGs]] and underpins every algorithm's consistency statement.
- **Faithfulness**: the non-generic assumption that PC and GES require for consistency; introduced in [[Causal Discovery Assumptions]], exploited by [[PC Algorithm]] skeleton correctness and [[GES Algorithm]] Meek Conjecture.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/spirtes-glymour-scheines-2000-CPS-book.md]] — Spirtes, Glymour & Scheines, *Causation, Prediction, and Search*, 2nd Ed., MIT Press, 2000. (Citation stub; PDF blocked by network policy.)
- [[raw/chickering-2002-GES-JMLR.md]] — Chickering, "Optimal Structure Identification With Greedy Search," JMLR 3:507–554, 2002. (Citation stub; PDF not downloaded.)
- [[raw/kalisch-buhlmann-2007-pc-highdim.md]] — Kalisch & Bühlmann, "Estimating High-Dimensional DAGs with the PC-Algorithm," JMLR 8:613–636, 2007. (Citation stub; PDF blocked by network policy.)
- [[raw/colombo-maathuis-2014-stable-pc.md]] — Colombo & Maathuis, "Order-Independent Constraint-Based Causal Structure Learning," JMLR 15:3921–3962, 2014. (Citation stub; PDF blocked by network policy.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[BN Construction Methods Comparison]] — alternative (expert-based) approach to graph construction
- [[Summary Causal DAGs]] — DAG summarization assumes structure known; structure learning precedes it
