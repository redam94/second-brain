---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-12
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic families:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> - Want the algorithmic landscape (all three families compared)? → [[Causal Structure Learning - Overview]]
> - Want the **PC algorithm** (skeleton + CI tests + Meek orientation)? → [[PC Algorithm]]
> - Want **GES** (Greedy Equivalence Search, score-based)? → [[GES Algorithm]]
> - Want **Markov equivalence classes and CPDAGs** (foundation for both PC and GES)? → [[Markov Equivalence and CPDAGs]]
> - Want **CI tests** (Fisher z, KCI, G-test for the PC algorithm)? → [[Conditional Independence Tests for Causal Discovery]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Algorithmic landscape (all 3 families) | [[Causal Structure Learning - Overview]] | overview | [[DAG Structure Learning Problem]] | PC / GES / NOTEARS comparison |
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | definition | [[DAG Structure Learning Problem]] | Two DAGs equiv iff same skeleton + v-structures |
| Meek's R1–R4 orientation rules | [[Markov Equivalence and CPDAGs]] | theorem | — | Exhaust rules → CPDAG |
| PC algorithm (skeleton + orientation) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent for $\log d = o(n^{1/3})$, bounded degree |
| CI tests (Fisher z, KCI, G-test) | [[Conditional Independence Tests for Causal Discovery]] | definition | [[Markov Equivalence and CPDAGs]] | Fisher $z$-transform; $T \sim \mathcal{N}(0,1)$ under $H_0$ |
| GES (two-phase greedy CPDAG search) | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Meek conjecture + BIC consistency → true CPDAG |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

**New (2026-10-12) — PC, GES, and CPDAG cluster:**
- [[Causal Structure Learning - Overview]] — CONTAINS: three-family comparison table (PC/GES/NOTEARS), identifiability boundary (linear SEM, non-Gaussian, interventions), ABM connection, software references.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Def (Markov compat, Markov equiv), **Verma-Pearl theorem** (equiv iff same skeleton + v-structures), CPDAG definition, 3-node example, **Meek's R1–R4** orientation rules.
- [[PC Algorithm]] — CONTAINS: Phase 1 skeleton algorithm (pseudocode), Phase 2 v-structure orientation, Meek rules call, **Kalisch-Bühlmann consistency theorem** ($\log d = o(n^{1/3})$), PC-stable order-independence fix, Fisher z-test definition.
- [[Conditional Independence Tests for Causal Discovery]] — CONTAINS: partial correlation definition, **Fisher z-test** (full statistic + normal approx), rank-based tests, **KCI test** (kernel), G-test (discrete), level choice and multiple-testing notes.
- [[GES Algorithm]] — CONTAINS: decomposable BIC score, **Meek conjecture** (Chickering 2002, Thm. 15), Phase 1 forward Insert operator (pseudocode + score change formula), Phase 2 backward Delete operator, **GES consistency theorem** (Chickering 2002, Thm. 26), PC vs GES comparison table.

**Existing NOTEARS cluster (2026-06-17):**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG as learning target**: PC and GES both output a CPDAG; NOTEARS outputs a DAG (exploiting linear SEM identifiability). Defined in [[Markov Equivalence and CPDAGs]]; used in [[PC Algorithm]], [[GES Algorithm]], [[NOTEARS Experiments]].
- **Faithfulness assumption**: required by PC and GES (tests/scores are informative only under faithfulness); NOTEARS avoids it via linear SEM. Discussed in [[Markov Equivalence and CPDAGs]] and [[PC Algorithm]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Meek conjecture**: proved by Chickering (2002), underlies GES correctness ([[GES Algorithm#^thm-meek-conjecture]]); Meek's orientation rules ([[Markov Equivalence and CPDAGs#^thm-meek-rules]]) used in both PC and GES.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/causal-structure-learning-sources.md]] — References for PC/GES/CPDAG cluster (Kalisch & Bühlmann 2007 JMLR; Chickering 2002 JMLR; Verma & Pearl 1990; Meek 1995; Colombo & Maathuis 2014). PDFs blocked by egress policy; notes written from training knowledge.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — DAG summarization (post-structure-learning step)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to data-driven structure learning
- [[BN Construction Methods Comparison]] — compares methods for building Bayesian networks
