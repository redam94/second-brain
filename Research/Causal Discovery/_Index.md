---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-02
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three families are now covered:
> (1) **NOTEARS** (continuous optimization), (2) **PC algorithm** (constraint-based / CI tests),
> (3) **GES** (score-based greedy search). 8 concept notes + 2 sources.
>
> **NOTEARS cluster (Zheng et al. 2018):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **Constraint-based and score-based cluster (SGS 2000 / Chickering 2002):**
> - Need the shared foundational concept (CPDAGs, Meek rules, identifiability)? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the PC algorithm (CI tests, Phase 1/2/3, consistency, high-dim)? → [[PC Algorithm - Constraint-Based Structure Learning]]
> - Need GES (score-based, Insert/Delete, Chickering 2002 theorem)? → [[GES - Greedy Equivalence Search]]

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
| Markov equivalence + CPDAGs | [[Markov Equivalence Classes and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Two DAGs equiv. ↔ same skeleton + v-structures |
| PC algorithm phases | [[PC Algorithm - Constraint-Based Structure Learning]] | concept | [[Markov Equivalence Classes and CPDAGs]] | 3 phases: skeleton → v-struct → Meek rules |
| GES Insert/Delete search | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Consistent; Meek conjecture proved |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Markov equivalence definition, skeleton+v-structure characterization theorem, CPDAG definition, Meek rules R1–R4, compelled vs. reversible edges, three-variable examples (chain vs. collider), identifiability wall.
- [[PC Algorithm - Constraint-Based Structure Learning]] — CONTAINS: Phase 1 skeleton learning (adjacency search with growing conditioning sets), separating sets $\mathrm{Sep}(X,Y)$, Phase 2 v-structure orientation, Phase 3 Meek rules, Gaussian CI test (Fisher's z), PC consistency theorem, Kalisch-Bühlmann high-dimensional consistency ($O(d^{q+2})$), order-dependence + PC-stable fix, FCI extension for latent variables, chain and v-structure examples.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable scores (BIC/BDe/BGe), CPDAG lattice structure theorem, FES phase (Insert operator, validity conditions), BES phase (Delete operator), Chickering (2002) consistency theorem (Theorem 15), Meek conjecture (Theorem 14) proof sketch, GES cost $O(d^4)$, FGES parallelized variant, GIES interventional extension.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **CPDAG (Markov equivalence class)**: the shared output target of both PC and GES — defined in [[Markov Equivalence Classes and CPDAGs]], built by [[PC Algorithm - Constraint-Based Structure Learning]] and [[GES - Greedy Equivalence Search]].
- **Faithfulness assumption**: required by both PC and GES consistency; not required by NOTEARS (which assumes only Markov). Faithfulness can fail on measure-zero sets of parameter values.
- **BIC score**: connects GES ([[GES - Greedy Equivalence Search]]) to NOTEARS's score $F(W)$ (same statistical criterion, different optimization strategy).
- **Benchmark comparison (PC vs GES vs NOTEARS)**: [[NOTEARS Experiments]] shows FGS (fast GES) is competitive with NOTEARS on sparse graphs but falls behind on dense/large; PC is weaker still. Context: score-based methods outperform CI-test-based when sample sizes are moderate.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-Survey.md]] — Synthesis survey of Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search* (PC algorithm) and Chickering (2002) "Optimal Structure Identification with Greedy Search" (*JMLR* 3: 507-554). Source PDFs unavailable due to network policy; content drawn from training knowledge.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicited DAG construction (vs. algorithmic discovery)
- [[BN Construction Methods Comparison]] — PC, GES, expert elicitation compared at application level
- [[Summary Causal DAGs]] — ABM-derived summary DAGs; CaGReS algorithm learns structure from ABM runs
