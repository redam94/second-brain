---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-15
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are documented:
> constraint-based ([[PC Algorithm]]), score-based ([[GES Algorithm]]), and continuous optimization
> ([[NOTEARS - Overview]]). All three output a **CPDAG** (or single DAG) under faithfulness and consistency.
> - Want the paradigm comparison (PC vs. GES vs. NOTEARS)? → [[Causal Structure Learning - Paradigm Overview]]
> - Want the core identifiability concept (CPDAGs, Meek rules)? → [[Markov Equivalence Classes and CPDAGs]]
> - Want the PC algorithm (constraint-based, CI tests)? → [[PC Algorithm]]
> - Want the GES algorithm (score-based, CPDAG search)? → [[GES Algorithm]]
> - Need CI test details (Fisher z, chi-square, KCI)? → [[Conditional Independence Tests for Structure Learning]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Paradigm comparison: PC vs. GES vs. NOTEARS | [[Causal Structure Learning - Paradigm Overview]] | overview | [[DAG Structure Learning Problem]] | Three paradigms; choose by data type and graph density |
| Markov equivalence; CPDAG; Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. ↔ same skeleton + v-structures |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]], [[Conditional Independence Tests for Structure Learning]] | Consistent under faithfulness; PC-stable fixes order-dependence |
| Conditional independence tests | [[Conditional Independence Tests for Structure Learning]] | concept | [[DAG Structure Learning Problem]] | Fisher z (Gaussian), chi-square (discrete), KCI (nonparametric) |
| GES algorithm (score-based) | [[GES Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Consistent; Meek Conjecture enables greedy CPDAG search |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

**Gap 9 additions (2026-09-15):** PC algorithm, GES, and shared foundations
- [[Causal Structure Learning - Paradigm Overview]] — CONTAINS: paradigm comparison table (constraint-based / score-based / continuous optimization), assumptions, identifiability limits, when-to-use guide.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: skeleton and v-structure definitions, Markov equivalence theorem (Verma & Pearl 1990), CPDAG definition (Meek 1995), Meek's four orientation rules with full statements, worked example.
- [[Conditional Independence Tests for Structure Learning]] — CONTAINS: Markov + faithfulness definitions, Fisher z-transform test (theorem + formula), chi-square test, KCI kernel test, significance threshold effect, multiple-testing considerations.
- [[PC Algorithm]] — CONTAINS: full three-phase algorithm (skeleton recovery, v-structure detection, Meek orientation), consistency theorem (SGS 2000), PC-stable variant (Colombo & Maathuis 2014), worked four-node example, software table.
- [[GES Algorithm]] — CONTAINS: decomposable score definition, BIC score definition, covered-edge definition, Meek Conjecture theorem (Chickering 2002), GES algorithm (forward + backward phases), consistency theorem, worked three-node example, software table.

**Original NOTEARS cluster (2026-06-17):**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence / CPDAG**: the identifiability limit for all three paradigms; appears in [[Markov Equivalence Classes and CPDAGs]] (foundation), [[PC Algorithm]] (output), [[GES Algorithm]] (search space), [[NOTEARS Experiments]] (FGS outputs CPDAG; requires care in comparison).
- **Faithfulness**: required by all three paradigms; defined in [[Conditional Independence Tests for Structure Learning]], assumed in [[PC Algorithm#^def-pc-assumptions]], [[GES Algorithm#^thm-ges-consistency]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, MIT Press — primary source for PC algorithm (Ch. 5). PDF unavailable (network policy).
- Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554 — primary source for GES. PDF unavailable (network policy); open-access at jmlr.org/papers/volume3/chickering02b/.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — post-learning DAG summarization (Zeng 2025)
- [[LLM Expert Elicitation for Bayesian Networks]] — building DAGs from expert knowledge
