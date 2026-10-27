---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-27
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Covers three paradigms:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 8 concept notes spanning all three approaches.
>
> **What output do all methods produce?** → [[Markov Equivalence Classes and CPDAGs]]
>
> **Constraint-based (CI tests):**
> - Need the PC algorithm (phases, CI tests, consistency)? → [[PC Algorithm - Overview]]
>
> **Score-based (BIC over MECs):**
> - Need GES (FES/BES, Meek Conjecture, correctness)? → [[GES - Greedy Equivalence Search]]
>
> **Continuous optimization:**
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence classes / CPDAGs | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs ≡ iff same skeleton + v-structures |
| Meek orientation rules | [[Markov Equivalence Classes and CPDAGs]] | definition | — | 4 rules propagate compelled orientations to form CPDAG |
| PC algorithm (constraint-based) | [[PC Algorithm - Overview]] | concept | [[Markov Equivalence Classes and CPDAGs]] | CI tests; consistent for Gaussian $p \gg n$ (Kalisch & Bühlmann 2007) |
| Fisher's z CI test | [[PC Algorithm - Overview]] | definition | — | $z = \sqrt{n-|S|-3}\cdot\mathrm{atanh}(\hat\rho_{XY\cdot S})$ |
| GES forward/backward phases | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | FES + BES; asymptotically correct (Chickering 2002) |
| Meek Conjecture (Theorem 15) | [[GES - Greedy Equivalence Search]] | theorem | — | Guarantees FES can reach true MEC from empty graph |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Def. Markov equivalence, Verma-Pearl characterization theorem (skeleton + v-structures), CPDAG/essential graph definition, Meek's 4 orientation rules, MEC size discussion.
- [[PC Algorithm - Overview]] — CONTAINS: Causal Markov condition, faithfulness, causal sufficiency; Phase 1 (skeleton via CI tests, increasing conditioning sets); Phase 2 (v-structure orientation); Phase 3 (Meek rules); Fisher's z CI test; Kalisch-Bühlmann consistency theorem for $p \gg n$; order-independent PC; FCI extension.
- [[GES - Greedy Equivalence Search]] — CONTAINS: Decomposable + score-equivalent scoring (BIC); FES (forward, Insert operator); BES (backward, Delete operator); turning phase (Hauser & Bühlmann); Meek Conjecture (Theorem 15 of Chickering 2002); GES correctness corollary; FGS acceleration; PC vs. GES vs. NOTEARS comparison.
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
- [[raw/kalisch07-PC-algorithm-REFERENCE.md]] — Kalisch & Bühlmann (2007), *Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm*, JMLR 8(22). arXiv:math/0510436. *(PDF unavailable for local download at ingest time; URL referenced in note.)*
- [[raw/chickering02-GES-REFERENCE.md]] — Chickering (2002), *Optimal Structure Identification with Greedy Search*, JMLR 3:507–554. *(PDF unavailable for local download at ingest time; URL referenced in note.)*

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
