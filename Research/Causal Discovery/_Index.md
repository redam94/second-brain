---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-16
concept_count: 7
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Covers three paradigms:
> **NOTEARS** (continuous optimization), **PC algorithm** (constraint-based / CI testing),
> and **GES** (score-based / CPDAG search). 7 concept notes.
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **constraint-based discovery** (CI tests, skeleton, v-structures, Meek rules)? → [[PC Algorithm]]
> - Need **score-based discovery** (BIC, FES, BES, Chickering theorem)? → [[GES Algorithm]]
> - Need the NOTEARS acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs PC, GES, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Constraint-based discovery: skeleton, v-structures, Meek | [[PC Algorithm]] | concept | [[DAG Structure Learning Problem]] | Recovers CPDAG via CI tests under faithfulness |
| GES: FES + BES over CPDAG space | [[GES Algorithm]] | concept | [[DAG Structure Learning Problem]], [[PC Algorithm]] | True CPDAG w.p.→1 (Chickering 2002 Thm. 15) |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS/GES on dense/large graphs; ≈ global optimum |

## Notes

- [[PC Algorithm]] — CONTAINS: faithfulness + Markov + sufficiency assumptions, skeleton algorithm (order-$\ell$ CI tests), v-structure rule (SepSet criterion), Meek rules R1–R4, stable PC (order-independence), CI test table (Fisher Z / G² / KCI), consistency theorem, 3-variable worked example.
- [[GES Algorithm]] — CONTAINS: decomposable score def., BIC formula, FES operator (Insert), BES operator (Delete), turning phase (Hauser & Bühlmann), Chickering consistency theorem (Meek conjecture), score-equivalence + non-identifiability, PC vs. GES vs. NOTEARS comparison table, 3-variable worked example.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS/GES/PC (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / Markov equivalence class**: all algorithms recover a CPDAG, not a DAG — some edges remain unoriented ([[PC Algorithm]], [[GES Algorithm]], [[NOTEARS Experiments]]).
- **Faithfulness assumption**: required by PC and GES; can fail when path coefficients cancel; NOTEARS sidesteps it but assumes linearity ([[PC Algorithm]], [[GES Algorithm]]).
- **CI tests vs. score maximisation**: the defining split between constraint-based ([[PC Algorithm]]) and score-based ([[GES Algorithm]], [[NOTEARS - Overview]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object NOTEARS estimates; appears in [[DAG Structure Learning Problem]] and threads through the NOTEARS notes.
- **Matrix exponential $e^{W\circ W}$**: the engine of the NOTEARS acyclicity constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed., MIT Press. Freely available via MIT Press (CPS book). Primary source for [[PC Algorithm]].
- Chickering (2002) — "Optimal Structure Identification with Greedy Search," *JMLR* 3:507–554. Open access at jmlr.org. Primary source for [[GES Algorithm]]. (PDFs not downloaded — network egress policy blocked jmlr.org and arxiv.org in this session.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[BN Construction Methods Comparison]] — constraint-based vs. score-based vs. expert-knowledge BN construction
- [[Summary Causal DAGs]] — DAG summarization for ABM outputs (structure learning precedes summarization)
