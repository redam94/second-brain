---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-22
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 9 concept notes + 3 sources.
>
> **Constraint-based (PC algorithm):**
> - Core theory (Markov equivalence, CPDAGs, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - PC algorithm full procedure (skeleton → v-structures → orientation)? → [[PC Algorithm]]
> - CI tests (Fisher's Z, G², KCI)? → [[Conditional Independence Tests for Structure Learning]]
>
> **Score-based (GES):**
> - GES algorithm (Forward/Backward phases, Insert/Delete operators)? → [[GES Algorithm]]
>
> **Continuous optimization (NOTEARS):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAGs | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]], [[Conditional Independence Tests for Structure Learning]] | Consistent CPDAG under faithfulness |
| CI tests (Fisher Z, G², KCI) | [[Conditional Independence Tests for Structure Learning]] | concept | [[Markov Equivalence and CPDAGs]] | Oracle for skeleton learning |
| GES algorithm (score-based) | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Two-phase greedy search; consistent under BIC/BDeu |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

**Constraint-based and score-based methods (added 2026-09-22):**
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Causal Markov + Faithfulness assumptions, Verma-Pearl theorem, v-structures (def + examples), CPDAG definition, Meek rules R1–R4 (with block IDs for linking), 3-variable worked example.
- [[PC Algorithm]] — CONTAINS: SGS vs PC efficiency argument, skeleton algorithm (pseudocode with adjacency-set restriction), v-structure orientation, Meek rules application, consistency theorem (Kalisch & Bühlmann), CI test oracle interface, PC-stable variant, limitations (faithfulness, order-dependence), 4-variable chain example.
- [[Conditional Independence Tests for Structure Learning]] — CONTAINS: Fisher's Z test (full formula + derivation), G²/χ² test for discrete, Kernel CI test (KCI), comparison table, $\alpha$ selection in high dimensions, software (`pcalg`, `causal-learn`).
- [[GES Algorithm]] — CONTAINS: decomposable/locally consistent score definition (BIC, BDeu), Insert operator $\Delta_I$ (with clique + blocking conditions), Delete operator $\Delta_D$, GES two-phase pseudocode, consistency theorem (Meek Conjecture), PC vs GES comparison table, FGES extension, 3-variable example.

**NOTEARS (continuous optimization):**
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
- [[raw/SOURCE-Chickering2002-GES.md]] — Chickering (2002), "Optimal Structure Identification With Greedy Search," *JMLR* 3:507–554. Free PDF: https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf (inaccessible in this session due to network policy).
- [[raw/SOURCE-Kalisch-Buehlmann2007-PC.md]] — Kalisch & Bühlmann (2007), "Estimating High-Dimensional DAGs with the PC-Algorithm," *JMLR* 8:613–636. arXiv: https://arxiv.org/pdf/math/0510436 (inaccessible in this session due to network policy). Original PC algorithm: Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, MIT Press.

## Cross-Cutting Concepts
- **Markov equivalence / CPDAG**: the fundamental identifiability limit — [[Markov Equivalence and CPDAGs]] (theory) → [[PC Algorithm]] (output) → [[GES Algorithm]] (search space).
- **Faithfulness assumption**: required by both PC and GES for consistency. Introduced in [[Markov Equivalence and CPDAGs]], applied in [[PC Algorithm#^thm-pc-consistency]] and [[GES Algorithm#^thm-ges-consistency]].
- **Meek rules**: orientation rules applied after skeleton recovery (PC) and after each Insert/Delete (GES). Fully stated in [[Markov Equivalence and CPDAGs#^def-meek-rules]].

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, back-door criterion
- [[Summary Causal DAGs]] — Zeng (2025) DAG summarization (assumes DAG is given; PC/GES produce the input)
- [[LLM Expert Elicitation for Bayesian Networks]] — human-in-the-loop DAG construction (complements data-driven PC/GES)
