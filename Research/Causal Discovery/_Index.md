---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-17
concept_count: 11
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic paradigms
> are documented: **PC** (constraint-based, CI tests), **GES** (score-based, CPDAG search),
> and **NOTEARS** (continuous optimization). 11 concept notes across 2 paper clusters.
>
> **NOTEARS cluster** (Zheng et al. 2018):
> - Paper overview → [[NOTEARS - Overview]]
> - Problem setup (SEM, score functions, NP-hardness) → [[DAG Structure Learning Problem]]
> - Key theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity) → [[Smooth Characterization of Acyclicity]]
> - Optimization (augmented Lagrangian, L-BFGS, thresholding) → [[NOTEARS Algorithm]]
> - Empirical results (vs FGS, SHD/FDR, Sachs data) → [[NOTEARS Experiments]]
>
> **PC + GES cluster** (Spirtes et al. 2000; Chickering 2002):
> - What is a CPDAG and Markov equivalence? → [[Markov Equivalence Classes and CPDAGs]]
> - PC algorithm overview (assumptions, phases, complexity) → [[PC Algorithm - Overview]]
> - Phase 1: skeleton via CI tests → [[Constraint-Based Skeleton Learning]]
> - Phases 2–3: v-structures + Meek rules → [[V-Structures and Meek Orientation Rules]]
> - GES: score-based CPDAG search + Meek Conjecture → [[GES - Greedy Equivalence Search]]
> - PC vs GES vs NOTEARS decision guide → [[Causal Discovery Algorithm Comparison]]

## Concept Map

### NOTEARS Cluster (Zheng et al. 2018)

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

### PC + GES Cluster (Spirtes et al. 2000; Chickering 2002)

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG definition | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures (Verma & Pearl 1990) |
| PC algorithm overview (3 phases) | [[PC Algorithm - Overview]] | overview | [[Markov Equivalence Classes and CPDAGs]] | Consistent recovery of CPDAG under faithfulness + Markov + sufficiency |
| Skeleton via CI tests (Phase 1) | [[Constraint-Based Skeleton Learning]] | concept | [[PC Algorithm - Overview]] | $O(p^{d+2})$ CI tests; PC-stable for order-independence |
| V-structures + Meek rules (Phases 2–3) | [[V-Structures and Meek Orientation Rules]] | concept | [[Constraint-Based Skeleton Learning]] | R1–R4 rules complete CPDAG without new v-structures (Meek 1995) |
| GES: FES + BES over CPDAG space | [[GES - Greedy Equivalence Search]] | overview | [[Markov Equivalence Classes and CPDAGs]], [[V-Structures and Meek Orientation Rules]] | Meek Conjecture ⟹ GES is consistent (Chickering 2002 Theorem 18) |
| PC vs GES vs NOTEARS comparison | [[Causal Discovery Algorithm Comparison]] | concept | all above | Selection guide: PC (high-dim), GES (data-efficient), NOTEARS (linear/fast) |

## Notes

### NOTEARS Cluster
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

### PC + GES Cluster
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: v-structure definition, Verma-Pearl theorem, CPDAG definition (directed = shared by all, undirected = direction-undetermined), I-map and perfect map definitions.
- [[PC Algorithm - Overview]] — CONTAINS: three core assumptions (Markov, faithfulness, sufficiency), three-phase structure (skeleton → v-structures → Meek), complexity $O(p^{d+2})$, contrast with GES and NOTEARS, FCI extension.
- [[Constraint-Based Skeleton Learning]] — CONTAINS: adjacency search algorithm, CI test choices (partial correlation, G², kernel HSIC), PC-stable fix for order-dependence, complexity theorem, two worked examples (chain + v-structure).
- [[V-Structures and Meek Orientation Rules]] — CONTAINS: v-structure orientation rule (Phase 2), Meek's R1–R4 rules with intuitions, PC completeness theorem (Meek 1995), worked example (R1 in action).
- [[GES - Greedy Equivalence Search]] — CONTAINS: locally consistent score definition, Insert + Delete operator definitions + score-change formulas, GES algorithm (FES + BES), Meek Conjecture/Theorem 15, consistency theorem (Theorem 18), FGES overview.
- [[Causal Discovery Algorithm Comparison]] — CONTAINS: assumptions table, output DAG vs CPDAG, statistical properties, complexity, when-to-use guidance, empirical benchmarks from NOTEARS experiments, software landscape.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: in NOTEARS, $W$ *is* the graph ([[DAG Structure Learning Problem]]). In PC/GES, a linear SEM is one possible model for which the LS score and partial correlation CI test are consistent.
- **Matrix exponential $e^{W\circ W}$**: the engine of the NOTEARS acyclicity constraint ([[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov equivalence**: shared framework for PC ([[Markov Equivalence Classes and CPDAGs]]) and GES ([[GES - Greedy Equivalence Search]]); NOTEARS does not directly exploit it.
- **Meek's R1–R4 rules**: used by PC (Phase 3) and by GES (after each Insert/Delete). [[V-Structures and Meek Orientation Rules]] is the canonical reference.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- [[raw/PC-algorithm-source-notes.md]] — Synthesized reference notes for Spirtes & Glymour (1991) and Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, MIT Press. (PDFs at https://doi.org/10.1177/089443939100900106 and CMU open-access; blocked by network egress on 2026-08-17.)
- [[raw/GES-Chickering-2002-source-notes.md]] — Synthesized reference notes for Chickering (2002), "Optimal structure identification with greedy search," *JMLR* 3:507–554. (PDF at https://jmlr.org/papers/v3/chickering02b.html; blocked by network egress on 2026-08-17.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — downstream use of learned DAGs (Zeng 2025 summarisation work)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge-based DAG construction (vs data-driven learning)
