---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-01
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> (1) **constraint-based** (PC algorithm: CI tests → skeleton → CPDAG); (2) **score-based
> combinatorial** (GES: greedy BIC maximization over equivalence classes → CPDAG);
> (3) **score-based continuous** (NOTEARS: smooth acyclicity constraint → DAG via L-BFGS).
> - Want the full paradigm comparison? → [[Constraint vs Score-Based Causal Discovery]]
> - Need the **PC algorithm** (constraint-based)? → [[PC Algorithm - Overview]]
> - Need **GES** (score-based, provably optimal)? → [[GES Algorithm - Overview]]
> - Need **NOTEARS** (continuous optimization)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs PC, FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Constraint-based vs score-based vs continuous | [[Constraint vs Score-Based Causal Discovery]] | concept | [[PC Algorithm - Overview]], [[GES Algorithm - Overview]], [[DAG Structure Learning Problem]] | Three paradigms, each with different failure modes; practical selection guide |
| PC algorithm (overview) | [[PC Algorithm - Overview]] | overview | [[DAG Structure Learning Problem]], [[Directed Acyclic Graphs]] | Two phases (skeleton + orientation) → CPDAG; consistent under faithfulness |
| PC skeleton recovery | [[PC Algorithm - Skeleton and Independence Tests]] | concept | [[PC Algorithm - Overview]] | Fisher Z-tests on partial correlations; $O(d^{q+2})$ tests for sparse graphs; Kalisch-Bühlmann $d \gg n$ consistency |
| PC orientation + CPDAGs | [[PC Algorithm - Orientation and CPDAGs]] | theorem | [[PC Algorithm - Skeleton and Independence Tests]] | V-structures via Sep sets; Meek R1–R4 rules complete CPDAG; Verma-Pearl equivalence theorem |
| GES (Greedy Equivalence Search) | [[GES Algorithm - Overview]] | overview | [[DAG Structure Learning Problem]], [[PC Algorithm - Orientation and CPDAGs]] | BIC-scored forward/backward search over CPDAG space; Chickering 2002 Theorem 15 → asymptotically optimal |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$; landscape of methods |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats PC and FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-Based Methods (PC Algorithm)
- [[PC Algorithm - Overview]] — CONTAINS: assumptions (Markov, faithfulness, causal sufficiency), two-phase description, what PC returns (CPDAG), identifiability limits, complexity $O(d^{q+2})$, PC-stable, FCI, LiNGAM extensions.
- [[PC Algorithm - Skeleton and Independence Tests]] — CONTAINS: Algorithm: PC Skeleton Recovery (pseudocode), adjacency conditioning design choice, Fisher Z-transformation CI test (formula), non-Gaussian variants, PC-stable definition, Kalisch-Bühlmann 2007 high-dimensional consistency theorem (Thm 3.1), complexity table.
- [[PC Algorithm - Orientation and CPDAGs]] — CONTAINS: V-structure orientation rule (Sep-set criterion), worked example (Rain/Sprinkler/Wet-Grass), Verma-Pearl Markov equivalence theorem, Meek's four orientation rules R1–R4 (with proofs of why each holds), CPDAG definition (directed = invariant; undirected = ambiguous), identifiability table (what observational data can/cannot recover).

### Score-Based Methods (GES)
- [[GES Algorithm - Overview]] — CONTAINS: decomposable score definition, BIC formula, locally consistent score (Def 4.3), GES two-phase algorithm (FES + BES pseudocode), Insert operator (Def 5.1 + score gain), Delete operator (Def 5.2), Chickering 2002 optimality theorem (Thm 15 + Meek Conjecture Lemma 12), FGES parallelization.

### Synthesis
- [[Constraint vs Score-Based Causal Discovery]] — CONTAINS: shared assumptions, PC failure modes (CI test errors, order-dependence, faithfulness violations), GES failure modes (local optima, finite-sample BIC), NOTEARS differences (no CI tests, outputs DAG not CPDAG, stationarity not optimality), NOTEARS benchmark results (Table 1), practical selection guide (8 scenarios), ABM connection to Summary Causal DAGs.

### NOTEARS (Continuous Score-Based)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs PC and FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **CPDAG (Completed Partially Directed Acyclic Graph)**: the shared output format of PC and GES; appears as definition in [[PC Algorithm - Orientation and CPDAGs]] and as the search space in [[GES Algorithm - Overview]]. NOTEARS outputs a DAG (a single graph, not a CPDAG).
- **Faithfulness assumption**: required by all three methods for consistency; the primary assumption that can fail in practice (canceling path coefficients). Covered in [[PC Algorithm - Overview]] (discussion), [[Constraint vs Score-Based Causal Discovery]] (table).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; PC and GES operate on the graph without parameterizing edges. Definition in [[DAG Structure Learning Problem]].
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]], contrasted with GES's provable optimality in [[Constraint vs Score-Based Causal Discovery]].

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/pc-ges-causal-discovery-sources.md]] — Comprehensive literature reference for PC/GES: Spirtes, Glymour & Scheines (2000), Kalisch & Bühlmann (2007, JMLR), Chickering (2002, JMLR), Meek (1995, UAI), Verma & Pearl (1990, UAI), Colombo & Maathuis (2014, JMLR). (External PDF downloads blocked by session egress policy; content from training knowledge.)

## See Also
- [[Directed Acyclic Graphs]] — causal reasoning, d-separation, back-door criterion once the DAG is known
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — downstream use: structure learning → DAG summarization pipeline
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicitation alternative to algorithmic structure learning
