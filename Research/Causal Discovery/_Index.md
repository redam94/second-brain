---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-21
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> **continuous optimization** (NOTEARS, Zheng et al. 2018), **constraint-based** (PC algorithm,
> Spirtes et al. 2000), and **score-based** (GES, Chickering 2002).
> - Want the full paradigm comparison? → [[Constraint vs Score-Based Causal Discovery]]
> - Need the shared theory (CPDAG, Markov equivalence, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - Need the PC algorithm (CI tests, skeleton, v-structures)? → [[PC Algorithm]]
> - Need GES (score-based, FES + BES phases)? → [[Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the formal problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization details (augmented Lagrangian, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs PC/GES/FGS, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures (Verma-Pearl) |
| PC algorithm: skeleton + v-structures + Meek | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent CPDAG recovery under Markov + Faithfulness |
| GES: FES + BES over CPDAG space | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent CPDAG recovery with locally consistent score |
| Paradigm comparison: PC vs GES vs NOTEARS | [[Constraint vs Score-Based Causal Discovery]] | concept | [[PC Algorithm]], [[Greedy Equivalence Search]], [[NOTEARS - Overview]] | Decision guide for method selection |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-Based and Score-Based Methods (2026-07-21)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence definition, Verma-Pearl theorem (equivalence ↔ same skeleton + v-structures), CPDAG definition, 3-variable example, Meek rules (R1–R4), covered edge reversals, Meek Conjecture, table of what breaks the CPDAG ceiling (non-Gaussianity, interventions).
- [[PC Algorithm]] — CONTAINS: PC skeleton phase (adjacency-first search, pseudocode), v-structure orientation rule, Meek propagation, CI test table (Gaussian/discrete/kernel), PC-stable order-independence fix, consistency theorem (SGS 2000), high-dimensional extension (Kalisch & Bühlmann 2007), FCI extension for hidden confounders, two worked examples (chain, collider).
- [[Greedy Equivalence Search]] — CONTAINS: decomposable score definition, local consistency, BIC/BGe/BDe table, Meek Conjecture (Chickering Theorem 15), Insert/Delete operator definitions (with score-change formulas), GES algorithm pseudocode (FES + BES), validity conditions for operators, consistency theorem (Chickering Theorem 19), FGES/GIES/BOSS variants table, two worked examples.
- [[Constraint vs Score-Based Causal Discovery]] — CONTAINS: shared assumptions (Markov + Faithfulness + Causal Sufficiency), CPDAG ceiling, what breaks it (LiNGAM, ANM, GIES, interventions), strengths/weaknesses of each paradigm, decision guide table, software ecosystem map, identifiability summary table.

### NOTEARS (Zheng et al. 2018)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **Markov equivalence class / CPDAG**: the object that PC and GES both consistently identify; appears in [[Markov Equivalence and CPDAGs]] (theory), [[PC Algorithm]] (via CI tests), [[Greedy Equivalence Search]] (via score search).
- **Faithfulness assumption**: required by all three paradigms; discussed in [[Markov Equivalence and CPDAGs]] and [[Constraint vs Score-Based Causal Discovery]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through all NOTEARS notes.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Conditional independence test**: the primitive operation of PC; discussed in [[PC Algorithm]] (CI test table) and [[Constraint vs Score-Based Causal Discovery]] (paradigm comparison).

## Sources
- [[raw/PC-GES-Causal-Discovery-Survey.md]] — Synthesis survey of Spirtes, Glymour & Scheines (2000) "Causation, Prediction, and Search" (2nd Ed.) and Chickering (2002) "Optimal Structure Identification with Greedy Search", JMLR 3:507–554. PDFs freely available but blocked by session network policy; content synthesised from training knowledge.
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, backdoor criterion, do-calculus (what to do with a learned DAG)
- [[Summary Causal DAGs]] — DAG summarization for ABM outputs (downstream of structure learning)
- [[LLM Expert Elicitation for Bayesian Networks]] — non-data-driven structure construction
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — fork/pipe/collider DAG semantics
- [[Nonparametric Causal Inference]] — related causal-modeling material
