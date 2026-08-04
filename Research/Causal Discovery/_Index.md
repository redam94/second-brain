---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-04
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two families of methods are
> now covered: **constraint-based** (PC algorithm) and **score-based** (GES, NOTEARS).
> 8 concept notes + 2 papers.
>
> - Want the background concept (CPDAG, equivalence class, Meek rules)? → [[CPDAG and Markov Equivalence]]
> - Need constraint-based learning (CI tests, skeleton, v-structures)? → [[PC Algorithm]]
> - Need score-based greedy search (BIC/BGe, FES+BES, Meek conjecture)? → [[GES - Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, Meek rules | [[CPDAG and Markov Equivalence]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures |
| PC algorithm — skeleton + v-structures + Meek | [[PC Algorithm]] | concept | [[CPDAG and Markov Equivalence]] | Consistent under Markov + faithfulness + sufficiency |
| GES — FES + BES, Meek Conjecture | [[GES - Greedy Equivalence Search]] | concept | [[CPDAG and Markov Equivalence]] | Provably score-optimal CPDAG under faithfulness |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[CPDAG and Markov Equivalence]] — CONTAINS: d-separation, Markov condition, Markov equivalence theorem (Verma & Pearl 1990), CPDAG definition, three-node example, faithfulness, Meek rules R1–R4, why only CPDAGs are identifiable from observational data.
- [[PC Algorithm]] — CONTAINS: PC assumptions (Markov, faithfulness, causal sufficiency), Phase 1 skeleton recovery (Algorithm 1, separating sets), Phase 2 v-structure orientation, Phase 3 Meek propagation, consistency theorem (SGS 2000), high-dimensional consistency (Kalisch & Bühlmann 2007), PC-stable, CI test table (Gaussian, discrete, nonparametric), R `pcalg` code, failure modes table.
- [[GES - Greedy Equivalence Search]] — CONTAINS: Meek Conjecture / Chickering Theorem 15, decomposable score definition, consistent score + BIC formula, edge insertion (FES definition), edge deletion (BES definition), GES consistency theorem, BGe score for Gaussian data, R `pcalg::ges` code, Python `ges` code, fast GES (fGES), GES vs PC comparison table.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **CPDAG (essential graph)**: the output of both PC ([[PC Algorithm]]) and GES ([[GES - Greedy Equivalence Search]]); defined and explained in [[CPDAG and Markov Equivalence]].
- **Faithfulness assumption**: required by PC, GES, and (implicitly) NOTEARS; defined in [[CPDAG and Markov Equivalence#^def-faithfulness]].

## Method Comparison

| Method | Family | Search Space | Output | Complexity | Best For |
|--------|--------|-------------|--------|-----------|---------|
| PC / PC-stable | Constraint-based | Skeleton + PDAG | CPDAG | $O(d^{q^*})$ | Nonparametric, sparse |
| GES / fGES | Score-based | CPDAG space | CPDAG | $O(d^2)$ per step | Gaussian/discrete, moderate $d$ |
| NOTEARS | Score-based continuous | $\mathbb{R}^{d \times d}$ | DAG | $O(d^3)$ matrix exp | Any differentiable model |

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-structure-learning-survey.md]] — Synthesis survey (2026-08-04): PC algorithm (Spirtes & Glymour 1991; SGS 2000; Kalisch & Bühlmann 2007; Colombo & Maathuis 2014) and GES (Chickering 2002; Hauser & Bühlmann 2012). Source PDFs blocked by egress policy; notes written from training knowledge.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert elicitation alternative to algorithmic discovery
- [[BN Construction Methods Comparison]] — comparison of BN construction approaches (expert vs. algorithmic)
- [[Summary Causal DAGs]] — DAG summarization methods that presuppose a learned DAG
- [[Directed Acyclic Graphs]] — DAG formalism for causal reasoning (d-separation, back-door, do-calculus)
