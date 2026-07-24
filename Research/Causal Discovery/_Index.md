---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-24
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two algorithmic paradigms
> are now covered: **NOTEARS** (Zheng et al., 2018) — continuous optimization — and the
> **PC / GES** family — constraint-based (CI tests) and score-based (BIC) search over
> Markov equivalence classes. 10 concept notes across 3 source papers.
>
> **NOTEARS (continuous optimization):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **PC Algorithm (constraint-based):**
> - Shared foundation (CPDAG, MEC, Verma–Pearl theorem)? → [[Markov Equivalence and CPDAGs]]
> - Overview + assumptions + comparison table? → [[PC Algorithm - Overview]]
> - Phase 1: skeleton + separating sets + CI tests? → [[Skeleton Recovery and CI Tests]]
> - Phase 2: v-structures + Meek rules? → [[V-Structures and Meek Rules]]
>
> **GES (score-based):**
> - FES + BES + Meek conjecture + consistency proof? → [[GES - Greedy Equivalence Search]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | concept + theorem | [[DAG Structure Learning Problem]] | Verma–Pearl: same skeleton + v-structures ↔ equivalent |
| PC algorithm overview | [[PC Algorithm - Overview]] | overview | [[Markov Equivalence and CPDAGs]] | Constraint-based; outputs CPDAG via CI tests |
| Skeleton + separating sets | [[Skeleton Recovery and CI Tests]] | concept | [[PC Algorithm - Overview]] | Adjacency restriction + Fisher $z$-test |
| V-structures + Meek rules | [[V-Structures and Meek Rules]] | theorem | [[Skeleton Recovery and CI Tests]] | R1–R4 complete orientation of all compelled edges |
| GES FES + BES phases | [[GES - Greedy Equivalence Search]] | concept + theorem | [[Markov Equivalence and CPDAGs]] | BIC score + Meek conjecture → consistent CPDAG recovery |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Def (skeleton, v-structure, MEC, CPDAG), **Verma–Pearl theorem** (same skeleton + v-structures ↔ Markov equivalent), score equivalence, covered edge reversals, identifiability limits (LiNGAM, interventions).
- [[PC Algorithm - Overview]] — CONTAINS: four assumptions (Markov, faithfulness, sufficiency, consistent test), two-phase structure, consistency theorem, complexity table, order-dependence + PC-stable fix, comparison with GES, R/Python code.
- [[Skeleton Recovery and CI Tests]] — CONTAINS: full skeleton algorithm (Alg. 5.4.1), adjacency restriction theorem, partial correlation / Fisher $z$-test definition, CI test comparison table (HSIC, CMIknn, etc.), PC-stable modification, worked example.
- [[V-Structures and Meek Rules]] — CONTAINS: unshielded triple definition, v-structure identification theorem (Sep set criterion), all four **Meek rules R1–R4** with justifications, orientation algorithm pseudocode, what remains undirected and why.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable BIC score definition, score equivalence theorem, **Insert operator** (FES), **Delete operator** (BES), **GES consistency theorem** (Chickering 2002, Thm. 15), **Meek conjecture** (covered edge reversals), PC vs GES comparison table, FGES note, R/Python code.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **CPDAG as algorithm output**: the shared output of PC ([[V-Structures and Meek Rules]]) and GES ([[GES - Greedy Equivalence Search]]); its theoretical foundation is in [[Markov Equivalence and CPDAGs]].
- **Faithfulness assumption**: required by all three algorithms — the wedge between conditional independence in $\mathbb{P}$ and d-separation in $G^*$.
- **BIC score**: GES's scoring criterion; connects to [[Overfitting and Information Criteria]] and the model comparison literature.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-Constraint-Score-Survey.md]] — Synthesis survey from training knowledge covering: Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search*, Ch. 5–6 (PC algorithm); Chickering (2002) "Optimal structure identification with greedy search", *JMLR* 3, 507–554 (GES); Meek (1995) UAI (orientation rules); Verma & Pearl (1990) UAI (Markov equivalence theorem). Created 2026-07-24 (session network policy blocked direct PDF downloads).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference; fork/pipe/collider = non-collider/collider in PC
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — causal semantics (d-separation, back-door) used by all discovery algorithms
- [[BN Construction Methods Comparison]] — expert elicitation vs. PC/GES for BN structure learning
- [[Summary Causal DAGs]] — downstream use of CPDAGs in the Zeng 2025 ABM summarization work
- [[Overfitting and Information Criteria]] — BIC score used in GES
