---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-19
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms: **constraint-based**
> (PC algorithm), **score-based greedy search** (GES), and **continuous optimization** (NOTEARS).
> 8 concept notes + 2 papers.
> - **Where do I start?** → [[Causal Structure Learning - Methods Comparison]] (three-way overview)
> - Need the **PC algorithm** (CI tests, skeleton, v-structures, Meek rules)? → [[PC Algorithm - Constraint-Based Causal Discovery]]
> - Need **GES** (greedy CPDAG search, BIC score, Meek Conjecture)? → [[GES - Greedy Equivalence Search]]
> - Need the **NOTEARS paper** in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS/GES, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Methods landscape & decision guide | [[Causal Structure Learning - Methods Comparison]] | concept | [[PC Algorithm - Constraint-Based Causal Discovery]], [[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]] | PC vs GES vs NOTEARS comparison table |
| Constraint-based discovery (CI tests) | [[PC Algorithm - Constraint-Based Causal Discovery]] | concept | [[DAG Structure Learning Problem]] | Skeleton → v-structures → Meek rules → CPDAG |
| Score-based greedy search | [[GES - Greedy Equivalence Search]] | concept | [[DAG Structure Learning Problem]] | FES + BES over CPDAGs; Meek Conjecture → consistency |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Causal Structure Learning - Methods Comparison]] — CONTAINS: PC vs GES vs NOTEARS table, observational equivalence limit, identifiability conditions, decision guide, software ecosystem.
- [[PC Algorithm - Constraint-Based Causal Discovery]] — CONTAINS: Markov/Faithfulness/Sufficiency assumptions, skeleton learning (CI tests with increasing conditioning set size), v-structure orientation (unshielded colliders, sep-sets), Meek's four orientation rules (R1–R4), CPDAG definition, Fisher's Z-test for Gaussian data, high-dimensional consistency (Kalisch & Bühlmann 2007), PC-stable variant.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score definition, BIC/BDeu score consistency, GES algorithm (FES + BES), insert/delete operators, Meek Conjecture / Theorem 15, GES consistency guarantee, FGES scaling, 3-node worked example.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / Markov equivalence class**: the common output of PC and GES; appears in [[PC Algorithm - Constraint-Based Causal Discovery]] (definition), [[GES - Greedy Equivalence Search]] (search space), and [[Causal Structure Learning - Methods Comparison]] (comparison table).
- **Faithfulness assumption**: required by both PC and GES; discussed in [[PC Algorithm - Constraint-Based Causal Discovery#^def-faithfulness]] and [[GES - Greedy Equivalence Search#^thm-ges-consistency]]; not required by NOTEARS's LS estimator.
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Meek rules / Meek Conjecture**: R1–R4 orientation rules proved in [[PC Algorithm - Constraint-Based Causal Discovery#^thm-meek-rules]]; Meek Conjecture proved by Chickering in [[GES - Greedy Equivalence Search#^thm-meek-conjecture]].
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/spirtes-glymour-scheines-2000-CPS.pdf]] — Spirtes, Glymour & Scheines, *Causation, Prediction, and Search*, 2nd Ed., MIT Press (2000). PC algorithm source.
- [[raw/chickering-2002-GES-JMLR.pdf]] — Chickering, "Optimal Structure Identification With Greedy Search," *JMLR* 3:507–554 (2002). GES source.
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

> [!warning] PDF download note
> The Spirtes et al. (2000) and Chickering (2002) source PDFs are cited above but could not be
> downloaded during this ingest session due to network proxy restrictions. The notes are written
> from knowledge of the primary sources. Download manually and place in `raw/` to complete provenance.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Summary Causal DAGs]] — downstream use of learned DAGs in ABM workflows
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven BN construction (complement to data-driven)
- [[Nonparametric Causal Inference]] — related causal-modeling material
