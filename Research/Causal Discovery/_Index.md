---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-21
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithm families:
> **constraint-based** (PC), **score-based** (GES), and **continuous-optimization** (NOTEARS).
> 10 concept notes spanning problem setup, algorithm theory, and implementation.
>
> - Want a family comparison (PC vs GES vs NOTEARS)? → [[Causal Structure Learning - Methods Overview]]
> - Need foundations (Markov equivalence, CPDAG)? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the **PC algorithm** (skeleton + v-structures + Meek rules)? → [[PC Algorithm]]
> - Need CI tests (Fisher Z, chi-squared, kernel, order-independence)? → [[Conditional Independence Testing for Causal Discovery]]
> - Need the **GES algorithm** (Meek conjecture, FES/BES, BIC)? → [[GES Algorithm]]
> - Want NOTEARS in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Algorithm families: PC, GES, NOTEARS | [[Causal Structure Learning - Methods Overview]] | overview | [[DAG Structure Learning Problem]] | Three paradigms for learning the CPDAG |
| Markov equivalence + CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures ⟺ equivalent |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]], [[Conditional Independence Testing for Causal Discovery]] | Skeleton → v-structures → Meek rules → CPDAG |
| CI tests (Fisher Z, chi-squared, kernel) | [[Conditional Independence Testing for Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | $Z = \sqrt{n-|S|-3}\cdot\mathrm{atanh}(\hat\rho_{ij\cdot S})$ |
| GES algorithm (score-based) | [[GES Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Meek conjecture + FES/BES → CPDAG |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Causal Structure Learning - Methods Overview]] — CONTAINS: algorithm families (constraint-based/score-based/continuous-optimization), shared assumptions (CMC, faithfulness, sufficiency), comparison table, vault connections.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Verma-Pearl theorem (same skeleton + v-structures ⟺ Markov equivalent), CPDAG definition, when unique DAG identification is possible (LiNGAM, ANM, interventions).
- [[PC Algorithm]] — CONTAINS: three phases (skeleton, v-structure orientation, Meek rules R1–R4), correctness + high-dim consistency (Kalisch & Bühlmann 2007), three worked examples, PC-stable, FCI extension.
- [[Conditional Independence Testing for Causal Discovery]] — CONTAINS: Fisher's Z test (partial correlation, df correction), $\chi^2$/G-test for discrete data, kernel-based tests (KCI/HSIC), effect of significance level $\alpha$, PC-stable order-independence.
- [[GES Algorithm]] — CONTAINS: Meek conjecture proof, BIC/BDeu score definitions, Insert/Delete/Turn operators, FES + BES phases, correctness theorem, comparison table PC vs GES vs NOTEARS.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG (Markov equivalence class)**: the shared output target of PC, GES, and FCI — see [[Markov Equivalence Classes and CPDAGs]].
- **Faithfulness assumption**: required by all three families for consistency; connects [[PC Algorithm]], [[GES Algorithm]], and [[NOTEARS - Overview]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering02b-GES-citation.md]] — Chickering, D.M. (2002). *Optimal structure identification with greedy search*. JMLR 3, 507–554. (Citation stub; PDF not downloadable in this session due to network policy.)
- [[raw/kalisch07a-PC-citation.md]] — Kalisch, M. & Bühlmann, P. (2007). *Estimating high-dimensional directed acyclic graphs with the PC-Algorithm*. JMLR 8, 613–636. (Citation stub; PDF not downloadable in this session due to network policy.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — uses learned DAGs as input to the Zeng 2025 summarization method
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to structure learning
