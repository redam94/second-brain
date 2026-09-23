---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-23
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigms are covered:
> **constraint-based** methods (PC algorithm, uses CI tests) and **score-based** methods
> (GES / NOTEARS, optimizes a score function). Supporting background: Markov equivalence
> and CPDAGs.
>
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need the PC algorithm (constraint-based, CI testing, skeleton → v-structures → Meek)? → [[PC Algorithm]]
> - Need GES (score-based, FES + BES, Meek Conjecture, asymptotic consistency)? → [[Greedy Equivalence Search]]
> - Need the CI tests PC uses (Fisher's Z, G-test, KCIT)? → [[Conditional Independence Testing]]
> - Need the MEC/CPDAG theory (Verma–Pearl, Meek rules, identifiability limit)? → [[Markov Equivalence and CPDAGs]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |
| Markov equivalence, CPDAGs | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Verma–Pearl: same skeleton + v-structures ↔ equivalent; Meek rules complete CPDAG |
| CI tests (Fisher's Z, G-test, KCIT) | [[Conditional Independence Testing]] | concept | [[Markov Equivalence and CPDAGs]] | $T=\sqrt{n-\lvert S\rvert-3}\,\lvert\mathrm{arctanh}(\hat\rho_{ij\cdot S})\rvert$ vs $z_{\alpha/2}$ |
| PC algorithm | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]], [[Conditional Independence Testing]] | Skeleton + v-structures + Meek → CPDAG; PC-stable fixes order dependence |
| GES algorithm | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]], [[DAG Structure Learning Problem]] | FES (empty→full) + BES (pruning); Meek Conjecture → asymptotic consistency |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: global Markov condition, faithfulness def., **Verma–Pearl characterization** (same skeleton + v-structures ↔ Markov equivalent), CPDAG def., **Meek's R1–R4 orientation rules**, identifiability limit for observational data, 3-node example.
- [[Conditional Independence Testing]] — CONTAINS: partial correlation def., **Fisher's Z test** (statistic $T$, decision rule), conditional G-test / chi-squared (discrete), KCIT (kernel, non-parametric), role of $\alpha$ and multiple testing, BIC-equivalent $\alpha$ (Kalisch–Bühlmann 2007), separation sets.
- [[PC Algorithm]] — CONTAINS: assumptions (faithfulness, causal sufficiency), **skeleton learning algorithm** (sequential CI tests with increasing $|S|$), **v-structure orientation** (sep-set rule), Meek rule application, **PC-stable** (order independence fix), finite-sample behaviour.
- [[Greedy Equivalence Search]] — CONTAINS: decomposable score def., BIC score formula, **FES algorithm** (greedy edge insertion from empty CPDAG), **BES algorithm** (greedy edge deletion), **Meek Conjecture** (Chickering 2002 Theorem 15), **asymptotic consistency theorem**, PC vs GES comparison table, FGES, 3-variable example.

## Cross-Cutting Concepts

- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov equivalence classes (MECs) / CPDAGs**: the correct output of observational causal discovery; defined in [[Markov Equivalence and CPDAGs]], output by both [[PC Algorithm]] and [[Greedy Equivalence Search]], referenced by [[DAG Structure Learning Problem]].
- **Faithfulness assumption**: required by both PC and GES for consistency; defined in [[Markov Equivalence and CPDAGs#^def-faithfulness]].

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/spirtes2000-CPS-and-PC-algorithm.md]] — Spirtes, Glymour & Scheines, *Causation, Prediction, and Search*, 2nd ed., MIT Press 2000. (Source PDF not downloadable from environment; notes written from primary knowledge.)
- [[raw/chickering2002-GES-JMLR.md]] — Chickering, "Optimal Structure Identification with Greedy Search," JMLR Vol. 3, 2002, pp. 507–554. (Source PDF not downloadable from environment; notes written from primary knowledge.)
- [[raw/chickering2015-selective-GES.pdf]] — Chickering, "Selective Greedy Equivalence Search: Finding Optimal Bayesian Networks Using a Polynomial Number of Score Evaluations," UAI 2015. (Supporting reference.)

## See Also

- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion; prerequisite for all notes in this folder
- [[Summary Causal DAGs]] — Zeng 2025 DAG summarization (downstream application of structure learning)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge approach to BN construction
- [[BN Construction Methods Comparison]] — comparison of construction methods including structure learning
