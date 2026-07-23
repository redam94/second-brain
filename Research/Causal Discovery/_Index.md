---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-23
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigms are covered:
> **NOTEARS** (Zheng et al. 2018, continuous optimization) and the classical
> **constraint-based** (PC algorithm) and **score-based** (GES) approaches.
>
> **NOTEARS cluster (score-based, continuous optimization):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs PC, GES/FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **Classical methods cluster (added 2026-07-23):**
> - Need the MEC / CPDAG concept (what structure learning can identify)? → [[Markov Equivalence and CPDAGs]]
> - Need the constraint-based paradigm (CI tests, faithfulness, Meek rules)? → [[Constraint-Based Structure Learning]]
> - Need the PC algorithm (skeleton → v-structures → Meek)? → [[PC Algorithm]]
> - Need GES (score-based MEC search, BIC, FES + BES)? → [[GES - Greedy Equivalence Search]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats GES/PC on dense/large graphs; ≈ global optimum |
| Markov equivalence classes + CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv iff same skeleton + v-structures (Verma & Pearl 1990) |
| Constraint-based paradigm | [[Constraint-Based Structure Learning]] | concept | [[Markov Equivalence and CPDAGs]] | CI tests + faithfulness → CPDAG (3-phase: skeleton, v-struct, Meek) |
| PC algorithm | [[PC Algorithm]] | concept | [[Constraint-Based Structure Learning]] | Recover CPDAG via conditional independence tests (Spirtes et al. 2000) |
| GES algorithm | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Recover CPDAG via greedy BIC maximisation over MEC lattice (Chickering 2002) |

## Notes

**NOTEARS cluster:**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1**, **Prop. 2**, **Theorem 1** ($h(W)$+gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3**, L-BFGS subproblem, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS/PC (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result.

**Classical methods cluster:**
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Verma & Pearl (1990) characterisation theorem (same skeleton + v-structures iff equiv), CPDAG definition, Meek's 4 orientation rules (R1–R4), worked 3-node example, what observational data cannot reveal.
- [[Constraint-Based Structure Learning]] — CONTAINS: Markov condition, faithfulness definition, Fisher's z-test + discrete + kernel CI tests (table), 3-phase template (skeleton / v-structures / Meek), PC-stable motivation, high-dim consistency theorem (Kalisch & Bühlmann 2007).
- [[PC Algorithm]] — CONTAINS: PC skeleton algorithm (pseudocode), v-structure detection, Meek propagation, full PC procedure (code), high-dim consistency (Kalisch & Bühlmann 2007 theorem), PC-stable definition, worked 3-variable example.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score definition, INSERT/DELETE operators (Chickering 2002), FES algorithm, BES algorithm, GES consistency theorem (Thm. 15), complexity, PC vs GES comparison table, FGES, worked 4-variable example.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the estimation object in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov Equivalence Class / CPDAG**: the identifiable output of *all* structure learning algorithms on observational data — defined in [[Markov Equivalence and CPDAGs]], output by [[PC Algorithm]] and [[GES - Greedy Equivalence Search]], compared to NOTEARS in [[NOTEARS Experiments]].
- **Faithfulness assumption**: required by PC ([[Constraint-Based Structure Learning]]) and GES ([[GES - Greedy Equivalence Search]]); not required by NOTEARS.

## Sources

**NOTEARS:**
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS*, NeurIPS 2018.

**Classical methods (synthesised from training knowledge; PDFs blocked by session network policy):**
- [[raw/PC-GES-Causal-Discovery-Survey.md]] — Synthesis survey covering: Spirtes, Glymour & Scheines (2000); Verma & Pearl (1990); Meek (1995); Chickering (2002) JMLR; Kalisch & Bühlmann (2007) JMLR; Colombo & Maathuis (2014) JMLR.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-based alternative to algorithmic structure learning
- [[BN Construction Methods Comparison]] — overview of BN construction approaches
- [[Summary Causal DAGs]] — downstream use-case where structure learning is the preprocessing step
