---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-14
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two families of algorithms are
> covered: **constraint-based** (PC algorithm, CI testing) and **score-based** (GES, NOTEARS).
> The shared foundation is the concept of Markov equivalence and CPDAGs. 8 concept notes + 1 paper.
>
> - **Start here for foundations:** What is a CPDAG? Faithfulness? → [[Markov Equivalence and CPDAGs]]
> - **Constraint-based approach** (CI tests → CPDAG)? → [[PC Algorithm]]
> - **Score-based approach** (BIC greedy search → CPDAG)? → [[GES - Greedy Equivalence Search]]
> - **Continuous optimization approach** (gradient descent → DAG)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness, landscape table)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS, thresholding)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS/GES, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, faithfulness | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv ↔ same skeleton + v-structures |
| PC algorithm (constraint-based, 3 phases) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | CI tests → CPDAG; consistent under faithfulness |
| GES algorithm (score-based, FES + BES) | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | BIC greedy search in CPDAG space; Meek Conjecture |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: Causal Markov condition, Markov equivalence definition, Verma-Pearl theorem (skeleton + v-structures), faithfulness assumption, causal sufficiency, CPDAG definition, 3-node equivalence class example.
- [[PC Algorithm]] — CONTAINS: 3-phase algorithm (skeleton recovery, v-structure identification, Meek rules), skeleton recovery pseudocode, v-structure rule, Meek's R1–R4 orientation rules, CI test table (Gaussian/non-Gaussian), complexity analysis, PC-stable variant, asymptotic correctness theorem, software table.
- [[GES - Greedy Equivalence Search]] — CONTAINS: FES algorithm (edge addition phase), BES algorithm (edge deletion phase), Insert/Delete operators, BIC score decomposition, Meek Conjecture (Theorem 15 in Chickering 2002), GES consistency theorem, FGS fast implementation, PC vs GES comparison table, software table.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **Markov equivalence**: the fundamental identifiability limit — all three algorithms (PC, GES, NOTEARS) grapple with it; PC and GES output CPDAGs representing it, NOTEARS returns a single DAG.
- **Faithfulness**: assumed by PC and GES for correctness; implicitly assumed by NOTEARS (non-zero linear SEM coefficients).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note. PC and GES are model-agnostic (work for any faithfulness-compatible distribution).
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]]. GES sidesteps this by searching CPDAGs; PC avoids it entirely.
- **BIC score / local decomposability**: used in GES ([[GES - Greedy Equivalence Search#^def-bic]]) and related to the least-squares score in NOTEARS ([[DAG Structure Learning Problem#^def-score]]).

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed. MIT Press. (PDF unavailable; proxy-blocked at time of ingest.)
- Chickering (2002) — *Optimal Structure Identification With Greedy Search*, JMLR 3:507-554. (PDF available at jmlr.org; proxy-blocked at time of ingest.)
- Colombo & Maathuis (2014) — *Order-independent constraint-based causal structure learning*, JMLR 15:3921-3962. (Covers PC-stable; proxy-blocked at time of ingest.)

## See Also

- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Spurious Association and Confounds]] — fork / pipe / collider patterns underlying CI reasoning
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-based alternative to automated structure learning
- [[BN Construction Methods Comparison]] — comparison of BN construction methods
- [[Summary Causal DAGs]] — DAG summarisation for ABM observational data (uses structure as input)
- [[Approximate Bayesian Computation for ABMs]] — ABM calibration; structure learning is the ABM analogue
