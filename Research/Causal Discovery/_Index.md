---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-09
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Covers three paradigms:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization**
> (NOTEARS). 8 concept notes + 3 papers/sources.
> - Want a map of all three paradigms? → [[Causal Discovery Landscape]]
> - Constraint-based (PC algorithm, CI tests, Meek rules)? → [[Constraint-Based Causal Discovery]]
> - Score-based (GES, BIC, forward/backward/turning phases)? → [[GES - Greedy Equivalence Search]]
> - Continuous optimization paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| All paradigms overview | [[Causal Discovery Landscape]] | overview | [[DAG Structure Learning Problem]] | Constraint vs. score vs. continuous optimization |
| PC algorithm (CI-based) | [[Constraint-Based Causal Discovery]] | concept | [[Causal Discovery Landscape]] | Skeleton → v-structures → Meek rules → CPDAG |
| GES (score-based) | [[GES - Greedy Equivalence Search]] | concept | [[Causal Discovery Landscape]] | Forward/backward/turning → CPDAG; BIC score |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | NOTEARS ≥ GES/FGS; close to global optimum |

## Notes

- [[Causal Discovery Landscape]] — CONTAINS: three-paradigm comparison table (PC vs GES vs NOTEARS), Markov/Faithfulness/Causal Sufficiency assumptions, CPDAG definition, identifiability conditions, software ecosystem.
- [[Constraint-Based Causal Discovery]] — CONTAINS: PC algorithm skeleton phase (Algorithm PC-1, conditioning-set increment), v-structure detection (Algorithm PC-2), Meek orientation rules (R1–R4), PC consistency theorem (Kalisch & Bühlmann 2007), CI test selection table, 4-variable worked example.
- [[GES - Greedy Equivalence Search]] — CONTAINS: score-equivalent/locally-decomposable score definitions, Gaussian BIC formula, Insert/Delete/Turn operators, forward/backward/turning phase algorithms, GES consistency theorem (Chickering 2002), Python usage (`ges.fit_bic`), 3-variable chain and v-structure worked examples.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG** (Completed Partially Directed Acyclic Graph): the output of all three paradigms; represents the Markov equivalence class. Introduced in [[Causal Discovery Landscape]], used throughout.
- **Markov + Faithfulness + Causal Sufficiency**: the standard identifiability triple; defined in [[Causal Discovery Landscape]], assumed in [[Constraint-Based Causal Discovery]] and [[GES - Greedy Equivalence Search]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **BIC score**: used in GES ([[GES - Greedy Equivalence Search]]) and compared against in [[NOTEARS Experiments]]; connects to [[Overfitting and Information Criteria]].

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/ges-algorithm-juangamella-README.md]] — juangamella, *GES: Python implementation of the GES algorithm (Chickering 2002)*, GitHub (2021). Source: <https://github.com/juangamella/ges>.
- [[raw/causal-learn-README.md]] — py-why, *causal-learn: Causal discovery for Python*, GitHub (2023). Source: <https://github.com/py-why/causal-learn>.

## See Also

- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Directed Acyclic Graphs]] — DAG fundamentals (d-separation, Markov condition)
- [[Summary Causal DAGs]] — downstream use of a known DAG (structure learning precedes this)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicitation alternative to data-driven structure learning
- [[BN Construction Methods Comparison]] — comparison of BN construction approaches
- [[Nonparametric Causal Inference]] — related causal-modeling material
