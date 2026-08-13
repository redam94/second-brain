---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-13
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms: continuous
> optimization (NOTEARS), constraint-based (PC), and score-based search (GES). 9 concept notes + 2 papers.
> - Want a one-page comparison of all three paradigms? → [[Causal Structure Learning - Overview]]
> - Want the paper in one page (NOTEARS)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need Markov equivalence, CPDAGs, v-structures? → [[Markov Equivalence and CPDAGs]]
> - Need the PC (constraint-based) algorithm? → [[PC Algorithm]]
> - Need GES (score-based) algorithm and Theorem 1? → [[Greedy Equivalence Search (GES)]]
> - Need **the NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Three-paradigm comparison | [[Causal Structure Learning - Overview]] | overview | [[DAG Structure Learning Problem]], [[Markov Equivalence and CPDAGs]] | PC vs GES vs NOTEARS tradeoffs |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Markov equivalence, CPDAG, v-structures | [[Markov Equivalence and CPDAGs]] | concept | [[Directed Acyclic Graphs]], [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures (Verma & Pearl) |
| Covered edge | [[Markov Equivalence and CPDAGs]] | concept | — | $\mathrm{Pa}(X)=\mathrm{Pa}(Y)\setminus\{X\}$; links DAGs in a class |
| d-separation | [[Markov Equivalence and CPDAGs]] | definition | — | Criterion for reading CI from DAG |
| Faithfulness, causal sufficiency | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Allows CPDAG recovery from CI tests |
| PC three-phase algorithm | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Skeleton → v-structures → Meek rules → CPDAG |
| PC-stable order-independence | [[PC Algorithm]] | concept | — | Batch edge removals per level $\ell$ |
| GES INSERT/DELETE operators | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence and CPDAGs]] | Score-improving moves in CPDAG space |
| GES Theorem 1 consistency | [[Greedy Equivalence Search (GES)]] | theorem | [[DAG Structure Learning Problem]] | GES → true CPDAG in limit of large $n$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Causal Structure Learning - Overview]] — CONTAINS: paradigm comparison table (PC vs GES vs NOTEARS), identifiability ceiling, CPDAG as target, when-to-use guide.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: skeleton/v-structure definitions, **Verma-Pearl theorem** (equivalent iff same skeleton + v-structures), **CPDAG definition** (compelled vs. reversible edges, uniqueness), **covered edge** definition, **d-separation** definition, covered-edge connectivity theorem.
- [[PC Algorithm]] — CONTAINS: Markov condition, faithfulness, causal sufficiency definitions; **three-phase pseudocode** (skeleton, v-structures, Meek R1–R4); CI test options (Fisher z, $\chi^2$, KCI); **asymptotic consistency theorem**; high-dim consistency (Kalisch & Bühlmann); **PC-stable** order-independence fix.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: score-equivalent / decomposable / locally-consistent definitions; **GES pseudocode** (FES + BES); **INSERT operator** (score + transformation); **DELETE operator** (score + transformation, verbatim from SGES §3.1); **Theorem 1** consistency; complexity table; SGES extension note.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence / CPDAG**: the common target of PC and GES; defined in [[Markov Equivalence and CPDAGs]], used throughout [[PC Algorithm]] and [[Greedy Equivalence Search (GES)]].
- **Faithfulness assumption**: required by PC ([[PC Algorithm]]) and GES ([[Greedy Equivalence Search (GES)]]); not required by NOTEARS.
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering-meek-sges.pdf]] — Chickering & Meek, *Selective Greedy Equivalence Search: Finding Optimal Bayesian Networks Using a Polynomial Number of Score Evaluations*, Microsoft Research (arXiv). Provides full GES formalization in §3.1.
- Spirtes, Glymour & Scheines, *Causation, Prediction, and Search*, 2nd ed., MIT Press (2000) — primary PC algorithm reference. PDF unavailable via download (proxy policy); content sourced via reference literature.
- Chickering, D.M. (2002). *Optimal structure identification with greedy search*. JMLR 3:507–554 — primary GES reference. PDF unavailable via download (proxy policy); content sourced via SGES paper and reference literature.
- Colombo & Maathuis (2014). *Order-independent constraint-based causal structure learning*. JMLR 15:3741–3782 — PC-stable reference.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
