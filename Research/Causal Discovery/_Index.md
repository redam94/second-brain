---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-17
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigms are now covered:
> **constraint-based** (PC algorithm; CI testing) and **score-based** (GES; continuous optimization).
>
> - Need the **problem setup** (SEM, score functions, landscape of methods)? → [[DAG Structure Learning Problem]]
> - Need **Markov equivalence** (MECs, CPDAGs, Meek rules — prerequisite for PC and GES)? → [[Markov Equivalence and CPDAGs]]
> - Need **constraint-based paradigm** (assumptions, CI tests, faithfulness)? → [[Constraint-Based Structure Learning]]
> - Need the **PC algorithm** (skeleton + v-structures + Meek completion)? → [[PC Algorithm]]
> - Need **GES** (Forward/Backward Equivalence Search, BIC score, CPDAG search)? → [[Greedy Equivalence Search]]
> - Need **NOTEARS** in one page (continuous optimization, the 4 contributions)? → [[NOTEARS - Overview]]
> - Need the **key acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the **optimization** (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need **empirical results** (NOTEARS vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Problem setup: SEM, score, NP-hardness | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures |
| CI-test paradigm, faithfulness, causal sufficiency | [[Constraint-Based Structure Learning]] | concept | [[Markov Equivalence and CPDAGs]] | Faithfulness: CI ⟺ d-separation |
| PC algorithm (3 phases) | [[PC Algorithm]] | concept | [[Constraint-Based Structure Learning]] | Consistent recovery of CPDAG under Markov + faithfulness |
| GES (FES + BES, BIC score) | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Meek conjecture + FES/BES → consistent CPDAG |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Prerequisite Theory
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence definition (Verma & Pearl 1990), v-structures, MEC, CPDAG definition, Meek's 4 orientation rules (R1–R4), DAG extension algorithms.
- [[Constraint-Based Structure Learning]] — CONTAINS: Global Markov property, faithfulness definition and violations, causal sufficiency, separation sets, CI test types by data distribution, score-based vs constraint-based comparison table.

### Constraint-Based Methods (PC Algorithm Family)
- [[PC Algorithm]] — CONTAINS: PC skeleton algorithm (Phase 1), v-structure orientation (Phase 2), Meek rule completion (Phase 3), full pseudocode, consistency theorem, Kalisch-Bühlmann high-dimensional result, software table (pcalg, causal-learn).

### Score-Based Methods (GES Family)
- [[Greedy Equivalence Search]] — CONTAINS: Score-equivalence + decomposability requirements, BIC/BDeu/BGe scoring, FES algorithm (Phase 1), BES algorithm (Phase 2), turning phase (Hauser & Bühlmann 2012), GES consistency theorem, Meek conjecture, FGS super-consistency, software table (pcalg, ges, Tetrad, causal-learn), Python/R code examples.

### Continuous Optimization (NOTEARS)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class (MEC)**: all three main approaches (PC, GES, NOTEARS) target recovering the same object; PC and GES return a CPDAG representing the MEC, while NOTEARS returns a specific DAG in the MEC.
- **Faithfulness assumption**: required by PC (explicit CI testing) and GES (score-consistent recovery); *not* required by NOTEARS (least-squares consistency under Loh-Bühlmann results).
- **CPDAG representation**: PC and GES both output a CPDAG — see [[Markov Equivalence and CPDAGs]] for meaning and [[Markov Equivalence and CPDAGs#^thm-meek-rules|Meek's rules]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed., MIT Press. [Primary source for PC algorithm; proxy-blocked at time of ingest 2026-09-17]
- Chickering (2002) — "Optimal Structure Identification with Greedy Search." *JMLR* 3:507–554. [Primary source for GES and Meek conjecture; proxy-blocked at time of ingest 2026-09-17]
- Meek (1995) — "Causal inference and causal explanation with background knowledge." *UAI*. [Meek rules; proxy-blocked]
- Kalisch & Bühlmann (2007) — "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm." *JMLR* 8:613–636. [High-dimensional PC; proxy-blocked]

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — DAG summarization (assumes DAG is given; structure learning precedes it)
- [[LLM Expert Elicitation for Bayesian Networks]] — elicitation-based DAG construction (complement to data-driven learning)
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
