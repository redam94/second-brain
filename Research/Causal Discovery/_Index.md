---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-28
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms: **constraint-based**
> (PC algorithm), **score-based** (GES), and **continuous-optimization** (NOTEARS). 10 concept notes.
> - Which algorithm should I use? → [[Causal Discovery Algorithm Comparison]]
> - What are we learning (Markov equivalence, CPDAG)? → [[Markov Equivalence Classes and CPDAGs]]
> - PC algorithm (constraint-based, CI tests)? → [[PC Algorithm - Overview]]
> - CI tests (Fisher Z, G², kernel tests)? → [[Conditional Independence Testing in Causal Discovery]]
> - GES (score-based, Meek Conjecture)? → [[GES - Greedy Equivalence Search]]
> - NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence / CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Verma–Pearl: equiv. ↔ same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm - Overview]] | concept | [[Markov Equivalence Classes and CPDAGs]] | 3 phases: skeleton → v-structures → Meek's rules |
| CI tests for skeleton recovery | [[Conditional Independence Testing in Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Fisher Z (Gaussian), G² (discrete), KCI (nonparametric) |
| GES (score-based) | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | FES + BES; Meek Conjecture → consistency |
| Algorithm comparison | [[Causal Discovery Algorithm Comparison]] | concept | [[PC Algorithm - Overview]], [[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]] | PC vs GES vs NOTEARS: trade-offs table |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-Based and Score-Based Methods (added 2026-08-28)
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Causal Markov condition, faithfulness, Verma–Pearl theorem, v-structures/unshielded colliders, CPDAG definition, Meek's orientation rules (R1–R4), identifiability ceiling.
- [[PC Algorithm - Overview]] — CONTAINS: 3 core assumptions, Phase 1 skeleton recovery algorithm (incremental conditioning), Phase 2 v-structure orientation, Phase 3 Meek's rules, complexity table, worked 4-node example, failure modes table, PC-stable, software.
- [[Conditional Independence Testing in Causal Discovery]] — CONTAINS: Fisher's Z test (partial correlation, Schur complement), $G^2$ discrete test, kernel-based CI tests (KCI, RCIT, CMIknn), multiple testing, sample-size effects, finite-sample limitations.
- [[GES - Greedy Equivalence Search]] — CONTAINS: BIC and BDe score definitions, FES algorithm (forward phase), BES algorithm (backward phase), Meek Conjecture (Theorem 15), GES Consistency Theorem (Theorem 23), complexity, PC vs GES comparison table, FGES, software.
- [[Causal Discovery Algorithm Comparison]] — CONTAINS: paradigm comparison (constraint-based / score-based / continuous-optimization), head-to-head table (PC vs GES vs NOTEARS), when-to-use guide, hybrid methods (MMHC, GFCI, BOSS, DAGMA), vault connections.

### NOTEARS — Continuous Optimization (added 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/lee25a-constraint-causal-discovery.pdf]] — Lee, Ribeiro & Kocaoglu, *Constraint-based Causal Discovery from a Collection of Conditioning Sets*, UAI 2025, PMLR 244:2486–2516. Background on PC algorithm and constraint-based paradigm.
- [[raw/chan24a-autocd.pdf]] — Chan, Claassen, Hoos, Heskes & Baratchi, *AutoCD: Automated Machine Learning for Causal Discovery Algorithms*, PMLR 246:106–132, 2024. Background on PC, GES, and the causal discovery algorithm landscape.
- Chickering (2002) — "Optimal Structure Identification with Greedy Search," *JMLR* 3:507–554. Primary source for GES (open access at jmlr.org, session network policy blocked download; notes synthesized from training knowledge).
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed., MIT Press. Primary source for PC algorithm (textbook; notes synthesized from training knowledge).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
