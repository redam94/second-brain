---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-26
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Contains three families:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> - What do both PC and GES return? → [[Markov Equivalence Classes and CPDAGs]]
> - Want the constraint-based (CI-test) approach? → [[PC Algorithm]]
> - Want the score-based (BIC) greedy approach? → [[Greedy Equivalence Search]]
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence; CPDAG; Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures |
| Meek Conjecture (proven) | [[Markov Equivalence Classes and CPDAGs]] | theorem | — | CPDAG space connected under Insert/Delete |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Returns CPDAG; uses CI tests; consistent under faithfulness |
| PC-stable (order-independent) | [[PC Algorithm]] | concept | — | Fixed adjacency snapshots → same skeleton any variable order |
| GES: FES + BES phases | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Returns CPDAG; optimizes BIC; consistent under faithfulness |
| Insert / Delete operators in CPDAG space | [[Greedy Equivalence Search]] | theorem | [[Markov Equivalence Classes and CPDAGs]] | Local score change = node-local regression difference |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### New (2026-10-26) — PC Algorithm and GES
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Verma & Pearl theorem (skeleton + v-structures characterization), CPDAG definition, Meek rules (R1–R4), Meek Conjecture proof (Chickering 2002), identifiability limits, LiNGAM / equal-variance extensions.
- [[PC Algorithm]] — CONTAINS: Faithfulness + Causal Sufficiency assumptions, PC skeleton algorithm (full pseudocode), v-structure orientation, PC-stable fix (Colombo & Maathuis 2014), CI tests table (Fisher's Z, chi-squared, KCI), consistency theorem (Kalisch & Bühlmann 2007), FCI/RFCI extensions, software table.
- [[Greedy Equivalence Search]] — CONTAINS: Decomposable score definition (BIC/BGe/BDe), FES phase (Insert operator), BES phase (Delete operator), Insert/Delete operator definitions, GES consistency theorem, PC vs GES comparison table, FGES extension, software table.

### Existing (2026-06-17) — NOTEARS
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / equivalence class**: the fundamental output of PC and GES; defined in [[Markov Equivalence Classes and CPDAGs]], targeted by both algorithms; contrast with the single-DAG output of NOTEARS.
- **Faithfulness assumption**: required by all three methods; defined in [[PC Algorithm]].
- **Linear SEM / weighted adjacency matrix $W$**: NOTEARS's parameterization; appears in [[DAG Structure Learning Problem]] and threads through [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/chickering2002-GES.txt]] — Chickering (2002), *Optimal Structure Identification with Greedy Search*, JMLR 3:507–554. [PDF blocked; metadata only]
- [[raw/colombo-maathuis2014-PC-algorithm.txt]] — Colombo & Maathuis (2014), *Order-Independent Constraint-Based Causal Structure Learning*, JMLR 15:3921–3962. [PDF blocked; metadata only]
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — DAG summarization that takes a learned DAG as input; PC/GES/NOTEARS precede this step
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge approach to building BNs (complement to data-driven discovery)
