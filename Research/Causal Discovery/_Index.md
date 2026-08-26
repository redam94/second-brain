---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-26
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> (1) **constraint-based** (PC algorithm), (2) **score-based** (GES), and (3) **continuous
> optimization** (NOTEARS). All three output the CPDAG of the generating DAG, which is
> described in [[Markov Equivalence and CPDAGs]].
>
> - Want the CPDAG concept and Meek rules? → [[Markov Equivalence and CPDAGs]]
> - Want the PC algorithm (constraint-based, CI tests)? → [[PC Algorithm]]
> - Want GES (score-based, globally optimal)? → [[GES Algorithm]]
> - Want NOTEARS (continuous optimization, score-based)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS, thresholding)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs PC, GES, FGS, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]], [[Directed Acyclic Graphs]] | Two DAGs equiv. iff same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Recovers CPDAG via CI tests; consistent in high-$p$ (Kalisch & Bühlmann 2007) |
| GES (score-based) | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Globally optimal CPDAG by BIC (Chickering 2002, Thm. 18) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Foundational Concepts
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence theorem (Verma & Pearl 1990), CPDAG definition, v-structures, Meek's four orientation rules (R1–R4), equivalence class identifiability limit.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).

### Constraint-Based Methods
- [[PC Algorithm]] — CONTAINS: Three-phase algorithm (skeleton discovery → v-structure orientation → Meek rules), Fisher's z CI test for Gaussian data, PC-stable variant, high-dimensional consistency theorem (Kalisch & Bühlmann 2007), comparison table with GES.

### Score-Based Methods
- [[GES Algorithm]] — CONTAINS: BIC score decomposability, Forward Equivalence Search (FES), Backward Equivalence Search (BES), Insert/Delete CPDAG operators, Meek Conjecture proof / global optimality theorem (Chickering 2002 Thm. 18), FGES variant, comparison with PC.

### NOTEARS (Continuous Optimization)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS/GES/PC (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG as output target**: All three paradigms output a CPDAG. Defined in [[Markov Equivalence and CPDAGs]] (definition) and explains the "best possible" identifiability from observational data.
- **Faithfulness assumption**: Required by both PC ([[PC Algorithm#^thm-kb-consistency]]) and GES ([[GES Algorithm#^thm-ges-optimality]]). NOTEARS does not require faithfulness (it minimizes a continuous score) but relies on the linear SEM assumption.
- **Score decomposability**: The key property enabling GES efficiency ([[GES Algorithm#^def-decomposable-score]]); appears implicitly in NOTEARS's LS score ([[DAG Structure Learning Problem#^def-score]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object of NOTEARS estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.

## Three-Paradigm Comparison

| Dimension | PC | GES | NOTEARS |
|-----------|-----|-----|---------|
| Paradigm | Constraint-based | Score-based | Continuous optimization |
| Starting point | Complete graph | Empty graph | Zero matrix |
| Global optimality | No | Yes (in limit) | No (stationary point) |
| Output | CPDAG | CPDAG | DAG (via thresholding) |
| Distributional assumptions | CI test only | Gaussian/discrete | Linear SEM, Gaussian |
| High-dim. scaling | $O(p^{q+2})$ sparse | $O(p^2 k^q)$ | $O(p^3)$ per step (matrix exp) |
| Software | `pcalg`, `causal-learn` | `pcalg`, `causal-learn`, `tetrad` | Original Python code, `gcastle` |

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018.
- [[raw/kalisch2007-PC-algorithm-ref.md]] — Kalisch & Bühlmann (2007), *Estimating High-Dimensional DAGs with the PC-Algorithm*, JMLR 8:613-636. [arXiv:math/0510436]
- [[raw/chickering2002-GES-JMLR-ref.md]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507-554. [https://jmlr.org/papers/v3/chickering02b.html]

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Directed Acyclic Graphs]] — d-separation and the Markov condition
- [[Summary Causal DAGs]] — DAG summarization (presupposes structure learning output)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to data-driven learning
