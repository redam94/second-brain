---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-02
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two main paradigms:
> **constraint-based** (PC algorithm) and **score-based** (GES); plus **continuous
> optimisation** (NOTEARS). 8 concept notes.
>
> **Theoretical foundation:**
> - Need the shared target (CPDAG, Markov equivalence, Verma-Pearl theorem)? → [[Markov Equivalence and CPDAGs]]
> - Need the problem setup (SEM, score functions, NP-hardness, prior methods landscape)? → [[DAG Structure Learning Problem]]
>
> **PC algorithm (constraint-based):**
> - Full algorithm with skeleton, v-structures, Meek rules, Fisher z-test, PC-stable? → [[PC Algorithm]]
>
> **GES algorithm (score-based):**
> - Full algorithm with Insert/Delete operators, BIC score, Chickering consistency theorem? → [[GES Algorithm]]
>
> **NOTEARS (continuous optimisation):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS/GES/PC, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence; CPDAG; Verma-Pearl theorem | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures |
| PC skeleton, v-structures, Meek rules | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent under faithfulness; $O(d^{q+2})$ |
| GES Insert/Delete, BIC, Chickering consistency | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent under faithfulness; greedy CPDAG search |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: d-separation def, skeleton def, v-structure def, **Verma-Pearl theorem** (same skeleton + v-structures ↔ MEC), CPDAG def, compelled vs reversible edges, comparison table (PC/GES/NOTEARS targets).
- [[PC Algorithm]] — CONTAINS: 3-phase algorithm (skeleton via CI tests, v-structure orientation from SepSets, Meek R1–R4), Fisher z-test formula, PC-stable (Colombo & Maathuis 2014), **consistency theorem** (Kalisch & Bühlmann 2007), complexity $O(d^{q+2})$, FCI extension for hidden confounders.
- [[GES Algorithm]] — CONTAINS: locally consistent score def, BIC score formula, **Insert operator** + FES, **Delete operator** + BES, **Meek Conjecture** (Thm. 2), **GES consistency theorem** (Thm. 15 + 16), GES vs PC comparison table, GIES extension.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **CPDAG**: the common target of PC and GES ([[Markov Equivalence and CPDAGs]]); NOTEARS produces a single DAG (one member of the MEC) rather than the CPDAG.
- **Faithfulness assumption**: required by all three algorithms for consistency — see [[Markov Equivalence and CPDAGs]] and [[PC Algorithm]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- [[raw/spirtes-glymour-scheines-2000-ref.md]] — Spirtes, Glymour & Scheines, *Causation, Prediction, and Search*, MIT Press 2000. (Reference file; PDF blocked by proxy.)
- [[raw/chickering2002-GES-ref.md]] — Chickering, "Optimal structure identification with greedy search," *JMLR* 3:507-554, 2002. (Reference file; PDF blocked by proxy.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — DAG summarization (Zeng 2025); structure learning precedes summarization
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven structure elicitation vs. data-driven discovery
