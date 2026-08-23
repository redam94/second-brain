---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-23
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are documented:
> **constraint-based** (PC algorithm), **score-based** (Greedy Equivalence Search / GES), and
> **continuous optimization** (NOTEARS). All target recovery of the Markov equivalence class
> (CPDAG) of the generating DAG under the Markov, faithfulness, and causal-sufficiency assumptions.
> - Want a paradigm comparison (PC vs. GES vs. NOTEARS)? → [[Causal Structure Learning - Overview]]
> - Need the theoretical foundation (Markov equivalence, CPDAGs, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - Need the constraint-based algorithm (independence tests)? → [[PC Algorithm]]
> - Need the score-based algorithm (BIC optimization, FES + BES)? → [[Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Three paradigms: constraint / score / continuous | [[Causal Structure Learning - Overview]] | overview | [[DAG Structure Learning Problem]], [[Markov Equivalence and CPDAGs]] | PC, GES, NOTEARS are consistent under same assumptions; differ in output granularity |
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]], [[Directed Acyclic Graphs]] | Verma-Pearl theorem: same skeleton + V-structures iff Markov equivalent |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Phases 1–3; consistent under faithfulness + causal sufficiency |
| Greedy Equivalence Search (score-based) | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]], [[DAG Structure Learning Problem]] | FES + BES; Meek Conjecture → complete; BIC-consistent |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats GES/PC on dense/large graphs; ≈ global optimum |

## Notes

### Paradigm Overview and Theory
- [[Causal Structure Learning - Overview]] — CONTAINS: three-paradigm comparison table (PC / GES / NOTEARS), identification limit theorem, common assumptions, when-to-use guide, ABM connection.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov condition (Def), faithfulness (Def), Markov equivalence (Def), Verma-Pearl characterization theorem, CPDAG definition, CPDAG characterization theorem, Meek's four orientation rules (R1–R4), examples (3-variable case, unfaithfulness example).
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).

### Constraint-Based and Score-Based Methods (new 2026-08-23)
- [[PC Algorithm]] — CONTAINS: assumptions (Markov, faithfulness, causal sufficiency), Phase 1 skeleton algorithm, Phase 2 V-structure orientation, Phase 3 Meek propagation, full pseudocode, consistency theorem (SGS Theorem 5.1), PC-stable extension, Gaussian partial correlation CI test, finite-sample considerations, software (pcalg, causal-learn).
- [[Greedy Equivalence Search]] — CONTAINS: locally consistent scoring criterion (Def), BIC score formula, Insert operator (Def), Delete operator (Def), FES algorithm, BES algorithm, Meek Conjecture (Theorem 1 of Chickering 2002), GES consistency theorem (Theorem 15), PC vs GES comparison table, FGES parallelization, software (pcalg, causal-learn, TETRAD).

### NOTEARS Notes
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs GES/PC (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence and CPDAGs**: the common target of [[PC Algorithm]] and [[Greedy Equivalence Search]]; defined in [[Markov Equivalence and CPDAGs]]; contrasted with the single-DAG output of [[NOTEARS - Overview]].
- **Faithfulness assumption**: required by all three paradigms; fails with path-coefficient cancellation; discussed in [[Markov Equivalence and CPDAGs]] and referenced in [[PC Algorithm]] and [[Greedy Equivalence Search]].
- **Meek's orientation rules**: used in Phase 3 of [[PC Algorithm]] and in every Insert/Delete step of [[Greedy Equivalence Search]]; formally stated in [[Markov Equivalence and CPDAGs]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].

## Sources
- [[raw/PC-GES-Constraint-Score-Based-Survey.md]] — Synthesis survey of Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search* (MIT Press) and Chickering (2002) "Optimal structure identification with greedy search" (*JMLR* 3: 507–554). Created 2026-08-23 from training knowledge (source PDFs blocked by session network policy).
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Directed Acyclic Graphs]] — DAG reasoning: d-separation, back-door criterion, do-calculus
- [[Spurious Association and Confounds]] — DAG semantics for causal inference; V-structures = colliders
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to algorithmic discovery
- [[Summary Causal DAGs]] — downstream application: summarizing learned DAGs from ABM output
- [[Nonparametric Causal Inference]] — related causal-modeling material
