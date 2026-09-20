---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-20
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are represented:
> **constraint-based** (PC algorithm; CI tests), **score-based** (GES; greedy CPDAG search),
> and **continuous optimization** (NOTEARS; differentiable acyclicity constraint).
> - Want the shared theoretical framework (equivalence classes, CPDAGs, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - Want the **PC algorithm** (constraint-based, CI tests, skeleton + v-structures)? → [[PC Algorithm]]
> - Want **GES** (score-based, CPDAG search, BIC/BDe, Meek Conjecture)? → [[Greedy Equivalence Search]]
> - Want the problem setup (SEM, score functions, NP-hardness, landscape table)? → [[DAG Structure Learning Problem]]
> - Want the NOTEARS paper overview? → [[NOTEARS - Overview]]
> - Need the matrix-exponential acyclicity theorem? → [[Smooth Characterization of Acyclicity]]
> - Need the augmented-Lagrangian optimization? → [[NOTEARS Algorithm]]
> - Need empirical comparisons vs. FGS, PC, GES, LiNGAM? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Equivalence iff same skeleton + v-structures (Verma–Pearl) |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent CPDAG recovery even for $d \gg n$ (Kalisch & Bühlmann) |
| GES algorithm (score-based) | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Meek Conjecture → greedy CPDAG search is asymptotically consistent |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $\|w\|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

**Constraint-Based and Score-Based Causal Discovery (added 2026-09-20):**
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Verma–Pearl theorem (equiv. iff same skeleton + v-structures), CPDAG definition, Meek rules (R1–R4), faithfulness assumption, identifiability table.
- [[PC Algorithm]] — CONTAINS: PC assumptions, skeleton discovery algorithm, separating sets, v-structure orientation, Meek propagation, CI test choices (Fisher z, G², KCIT), Kalisch-Bühlmann consistency theorem for high-dimensional sparse DAGs, PC-stable, FCI extension.
- [[Greedy Equivalence Search]] — CONTAINS: score requirements (score-equivalence + decomposability), standard scores (BIC, BDe, BGe), Meek Conjecture (Chickering 2002, Thm. 15), GES algorithm (FES + BES + turning phase), GES consistency theorem, PC vs. GES comparison table, FGES, software.

**NOTEARS cluster (added 2026-06-17):**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **Markov equivalence / CPDAG**: the fundamental identification limit; introduced in [[Markov Equivalence and CPDAGs]], targeted by both [[PC Algorithm]] and [[Greedy Equivalence Search]], contrasted with the continuous-optimization approach of [[NOTEARS - Overview]].
- **Faithfulness assumption**: required by all three paradigms; see [[Markov Equivalence and CPDAGs#^def-faithfulness]] and [[PC Algorithm#^def-pc-assumptions]].
- **Score functions (BIC / BDe / BGe)**: the GES scoring criterion ([[Greedy Equivalence Search]]) is the discrete counterpart of the LS score $F(W)$ in NOTEARS ([[DAG Structure Learning Problem]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering2002-ges.txt]] — Chickering, *Optimal Structure Identification With Greedy Search*, JMLR 2002 (PDF blocked by egress proxy; see stub for URL).
- [[raw/kalisch2007-pc-algorithm.txt]] — Kalisch & Bühlmann, *Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm*, JMLR 2007 (PDF blocked by egress proxy; see stub for URL).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Directed Acyclic Graphs]] — d-separation and DAG causal reasoning (Econometrics/Foundations/)
- [[Summary Causal DAGs]] — DAG summarisation for ABM output; structure learning is the natural upstream step
- [[LLM Expert Elicitation for Bayesian Networks]] — elicitation-based alternative to data-driven discovery
- [[BN Construction Methods Comparison]] — comparison of BN construction strategies
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
