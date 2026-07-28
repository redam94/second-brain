---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-28
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Contains 9 concept notes across
> two algorithmic paradigms: **NOTEARS** (continuous optimization) and the classical
> **constraint-based** (PC) and **score-based** (GES) families.
>
> - **New to structure learning?** → [[Causal Structure Learning - Overview]] (paradigm map)
> - **What is a CPDAG / equivalence class?** → [[Markov Equivalence and CPDAGs]]
> - **PC algorithm (constraint-based)?** → [[PC Algorithm]]
> - **GES (score-based)?** → [[GES - Greedy Equivalence Search]]
> - **NOTEARS (continuous optimization)?** → [[NOTEARS - Overview]]
> - Need the NOTEARS problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS/PC, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Paradigm map: constraint vs score vs continuous | [[Causal Structure Learning - Overview]] | overview | [[DAG Structure Learning Problem]] | Three families; all target CPDAG |
| Markov equivalence; CPDAG; Meek rules | [[Markov Equivalence and CPDAGs]] | concept/theorem | [[Directed Acyclic Graphs]] | Two DAGs equivalent ↔ same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept/theorem | [[Markov Equivalence and CPDAGs]] | Skeleton via CI tests → v-structures → Meek rules |
| Fisher Z-test (PC) | [[PC Algorithm]] | definition | — | $\sqrt{n-\|S\|-3}\cdot\frac{1}{2}\ln\frac{1+\hat\rho}{1-\hat\rho}\sim\mathcal{N}(0,1)$ |
| GES algorithm (score-based) | [[GES - Greedy Equivalence Search]] | concept/theorem | [[Markov Equivalence and CPDAGs]] | Insert→Delete on CPDAG space; BIC consistent |
| Meek Conjecture | [[GES - Greedy Equivalence Search]] | theorem | [[Markov Equivalence and CPDAGs]] | I-map → perfect map via covered reversals + insertions |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Classical Methods (PC & GES) — added 2026-07-28
- [[Causal Structure Learning - Overview]] — CONTAINS: three-paradigm map (constraint/score/continuous), why CPDAGs not DAGs, faithfulness assumption, complexity/tradeoff table, software ecosystem.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov condition (def), faithfulness (def), Markov equivalence (def), **Verma-Pearl theorem** (skeleton + v-structures), v-structure / immorality / collider (def), CPDAG / essential graph (def), **Meek orientation rules R1–R4** (def + completeness), worked 3-variable example.
- [[PC Algorithm]] — CONTAINS: 3-phase algorithm (pseudocode), **Fisher Z-test** (def + formula), G² test (def), kernel CI tests (HSIC, KCI), **PC consistency theorem** (SGS 2000), PC-stable (Colombo & Maathuis 2014 — order-independence fix), **high-dimensional consistency theorem** (Kalisch & Bühlmann 2007), failure modes (faithfulness violations, latent confounders, multiple testing), worked 3-variable example.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score (def), BIC/BDeu/BGe table, Insert/Delete operators (def), **GES algorithm pseudocode**, **Meek Conjecture** (proved by Chickering 2002 — covered edge reversal path), **GES consistency theorem**, PC vs GES comparison table, software table, worked 3-variable forward-phase example.

### NOTEARS (Continuous Optimization)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / Markov equivalence class**: the target output of both PC and GES; defined in [[Markov Equivalence and CPDAGs]], output of [[PC Algorithm]] and [[GES - Greedy Equivalence Search]].
- **Faithfulness assumption**: required by PC ([[PC Algorithm#PC Consistency under Faithfulness|PC consistency]]) and GES ([[GES - Greedy Equivalence Search#GES Correctness (Meek Conjecture)|Meek Conjecture]]); not needed by NOTEARS (but NOTEARS assumes linear SEM).
- **V-structures (immoralities)**: the only identifiable features that distinguish Markov-equivalent DAGs ([[Markov Equivalence and CPDAGs]]); detected by PC via separation sets ([[PC Algorithm]]), implicit in GES score ([[GES - Greedy Equivalence Search]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/PC-GES-Causal-Structure-Learning-Survey.md]] — Synthesis survey (2026-07-28) from training knowledge of: Chickering (2002) JMLR 3:507–554 (GES), Kalisch & Bühlmann (2007) JMLR 8:613–636 (high-dim PC), Colombo & Maathuis (2014) JMLR 15:3741–3782 (PC-stable), Spirtes, Glymour & Scheines (2000) MIT Press (PC algorithm). Downloads blocked by session network policy.
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, Markov condition, causal DAG reasoning (prerequisite)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference; colliders as v-structures
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge complement to algorithmic discovery
- [[BN Construction Methods Comparison]] — PC and GES in the broader BN learning landscape
- [[Summary Causal DAGs]] — DAG summarization (post-discovery); PC/GES would precede this step
- [[Nonparametric Causal Inference]] — related causal-modeling material
