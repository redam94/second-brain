---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-04
concept_count: 11
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Now covers all three main
> paradigms: **NOTEARS** (continuous optimization), **PC algorithm** (constraint-based /
> independence tests), and **GES** (score-based / greedy equivalence search). 11 notes total.
>
> **NOTEARS cluster (Zheng et al. 2018):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS/GES/PC, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **PC + GES cluster (Spirtes/Glymour/Scheines 2000; Chickering 2002):**
> - Which method to use? → [[Causal Discovery Methods - Overview]]
> - What does any method output? (CPDAG, MEC, identifiability) → [[Markov Equivalence and CPDAGs]]
> - What is the constraint-based paradigm? (CMC, faithfulness, sufficiency) → [[Constraint-Based Causal Discovery]]
> - Need the full PC algorithm (skeleton + v-structures + Meek rules)? → [[PC Algorithm]]
> - Need the full GES algorithm (forward/backward phases, BIC)? → [[GES Algorithm]]
> - Need BIC / BDeu / BGe score details? → [[Score Functions for Structure Learning]]

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
| Markov equivalence (MEC) + CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + same v-structures ⟺ same MEC |
| CMC + Faithfulness + Sufficiency | [[Constraint-Based Causal Discovery]] | concept | [[Markov Equivalence and CPDAGs]] | CI tests ↔ d-separations; CPDAG identifiable |
| PC skeleton + v-structures + Meek | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery]] | Consistent recovery of CPDAG; $O(p^{q+2})$ |
| GES forward/backward over CPDAGs | [[GES Algorithm]] | concept | [[Score Functions for Structure Learning]] | BIC greedy search → true MEC (Meek Conjecture) |
| BIC / BDeu / BGe decomposability | [[Score Functions for Structure Learning]] | concept | [[DAG Structure Learning Problem]] | Decomposable + score-equivalent → GES applicable |
| Methods comparison (PC/GES/NOTEARS) | [[Causal Discovery Methods - Overview]] | overview | [[PC Algorithm]], [[GES Algorithm]] | Use PC for sparse, GES for dense, NOTEARS for linear |

## Notes

**NOTEARS cluster:**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series), **Prop. 2** (matrix exp), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

**Constraint-based + Score-based cluster (new, 2026-10-04):**
- [[Markov Equivalence and CPDAGs]] — CONTAINS: d-separation def, Markov equivalence def (Verma & Pearl), skeleton+v-structure characterization theorem, CPDAG def (Andersson et al.), Meek R1–R4 rules table, three-node MEC example.
- [[Constraint-Based Causal Discovery]] — CONTAINS: Causal Markov Condition, Faithfulness def, Causal Sufficiency def, identifiability theorem, constraint-based algorithm steps, paradigm comparison table.
- [[PC Algorithm]] — CONTAINS: Phase 1 skeleton algorithm (order $\ell$ search), CI test table (Fisher Z / chi-square / kernel), Phase 2 v-structure orientation, Phase 3 Meek propagation, consistency theorem (Kalisch & Bühlmann 2007, Thm. 3.1), PC-stable def, four-variable worked example.
- [[GES Algorithm]] — CONTAINS: decomposability def, score equivalence def, BIC formula, Phase 1 FGES (Insert operator), Phase 2 backward (Delete operator), GES consistency theorem (Chickering 2002, Thm. 15+17), FGES scalability note.
- [[Score Functions for Structure Learning]] — CONTAINS: BIC def + consistency, BDeu def + alpha hyperparameter, BGe def, properties table, connection to NOTEARS LS score.
- [[Causal Discovery Methods - Overview]] — CONTAINS: three-paradigm table, assumptions comparison table, scalability table, extensions (FCI/RFCI/LiNGAM/PCMCI/BOSS), when-to-use guide, vault connection notes.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov Equivalence Class (MEC) / CPDAG**: the fundamental output for both PC ([[PC Algorithm]]) and GES ([[GES Algorithm]]); defined in [[Markov Equivalence and CPDAGs]].
- **Faithfulness**: required by both PC and GES; the key identifying assumption explained in [[Constraint-Based Causal Discovery]].
- **Decomposable + score-equivalent scores (BIC/BDeu/BGe)**: the score properties that make GES tractable; detailed in [[Score Functions for Structure Learning]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- [[raw/kalisch-buhlmann-2007-pc-algorithm.md]] — Kalisch & Bühlmann (2007), *Estimating High-Dimensional DAGs with the PC-Algorithm*, JMLR 8:613–636. Freely available: https://arxiv.org/abs/math/0510436
- [[raw/chickering-2002-ges.md]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554. Freely available: https://jmlr.org/papers/v3/chickering02b.html

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Directed Acyclic Graphs]] — d-separation, backdoor criterion, do-calculus
- [[Summary Causal DAGs]] — DAG summarization (assumes DAG is given; structure learning is what precedes)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-based DAG construction (complement to data-driven discovery)
- [[Approximate Bayesian Computation for ABMs]] — ABC/MCMC calibration; PC/GES applies to ABM simulation outputs
