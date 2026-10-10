---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-10
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> (1) **NOTEARS** (continuous optimization), (2) **PC algorithm** (constraint-based, CI tests),
> (3) **GES** (score-based, greedy equivalence search). 8 concept notes + 2 papers.
> - Want the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Want **Markov equivalence classes and CPDAGs** (prerequisite for PC and GES)? → [[Markov Equivalence Classes and CPDAGs]]
> - Want **constraint-based discovery** (CI tests, PC-stable, faithfulness)? → [[PC Algorithm]]
> - Want **score-based discovery** (GES, forward/backward phases, consistency)? → [[Greedy Equivalence Search (GES)]]
> - Want the NOTEARS paper overview (continuous optimization)? → [[NOTEARS - Overview]]
> - Need **the key acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs GES, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs are MEC-equivalent iff same skeleton + v-structures |
| Meek orientation rules | [[Markov Equivalence Classes and CPDAGs]] | theorem | — | R1–R4: sound and complete for CPDAG recovery |
| PC-stable skeleton | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | CI tests from empty graph; order-independent version |
| GES forward phase (FES) | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Greedy Insert operators; starts from empty CPDAG |
| GES backward phase (BES) | [[Greedy Equivalence Search (GES)]] | concept | — | Greedy Delete operators; corrects false positives |
| GES consistency | [[Greedy Equivalence Search (GES)]] | theorem | — | Recovers true CPDAG as $n\to\infty$ (Chickering 2002, Thm. 15) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-based and score-based methods (added 2026-10-10)
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Def. Markov equivalence (same skeleton + v-structures), Def. CPDAG, Def. v-structure, Meek R1–R4 orientation rules (with full statement), faithful extension, 3-node example.
- [[PC Algorithm]] — CONTAINS: Causal sufficiency + faithfulness definitions, Phase 1 skeleton algorithm (with PC-stable modification for order-independence), Phase 2 v-structure orientation, Phase 3 Meek rules, consistency theorem, CI test options table, 4-node worked example.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: Decomposable score definition (BIC/BDe/BGe), Insert/Delete/Turn CPDAG operator definitions, FES (forward phase) algorithm, BES (backward phase) algorithm, Consistency Theorem 15 (Chickering 2002), complexity analysis, 4-node worked example.

### NOTEARS notes (added 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class / CPDAG**: the shared output target of PC and GES; [[Markov Equivalence Classes and CPDAGs]] is the prerequisite for both.
- **Faithfulness assumption**: required by both PC ([[PC Algorithm]]) and GES ([[Greedy Equivalence Search (GES)]]) for consistency; absent in NOTEARS (which uses a different identification strategy).
- **Decomposable score (BIC)**: used by GES ([[Greedy Equivalence Search (GES)]]) as the objective; also underpins NOTEARS's LS score ([[DAG Structure Learning Problem]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/chickering2002-GES-source.md]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554. (PDF unavailable from this environment; source record with URL.)
- [[raw/colombo-maathuis2014-PC-source.md]] — Colombo & Maathuis (2014), *Order-Independent Constraint-Based Causal Structure Learning*, JMLR 15:3921–3962. (PDF unavailable from this environment; source record with URL.)
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
