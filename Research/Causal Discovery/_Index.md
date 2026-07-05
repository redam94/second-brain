---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-05
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from observational data. Two paradigms:
> **constraint-based** (PC algorithm, Spirtes et al. 2000) and **score-based** (GES, Chickering 2002),
> both outputting CPDAGs; and **continuous optimization** (NOTEARS, Zheng et al. 2018) outputting
> fully directed DAGs. 8 concept notes covering all three paradigms.
>
> - New to structure learning? → [[DAG Structure Learning Problem]] (problem setup) then [[Markov Equivalence Classes and CPDAGs]] (what all methods output)
> - Need the **constraint-based / PC algorithm**? → [[PC Algorithm]]
> - Need the **score-based / GES** method? → [[GES - Greedy Equivalence Search]]
> - Need the **NOTEARS continuous-optimization** paper? → [[NOTEARS - Overview]]
> - Need **the key acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need **empirical results** (GES vs NOTEARS on ER/SF graphs)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Two DAGs equiv ↔ same skeleton + v-structures |
| Meek's 4 orientation rules | [[Markov Equivalence Classes and CPDAGs]] | theorem | — | R1–R4 complete for CPDAG construction |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | CI tests → skeleton + v-structures → CPDAG |
| Stable-PC (order-independent) | [[PC Algorithm]] | concept | — | Separate test/update phases; collect all sep sets |
| GES forward + backward phases | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Greedy BIC optimization over CPDAG space |
| Chickering's consistency (Thm 15) | [[GES - Greedy Equivalence Search]] | theorem | — | GES recovers true CPDAG as $n\to\infty$ |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

**Constraint-Based and Score-Based (added 2026-07-05):**
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Verma-Pearl theorem (same skeleton + v-structures ↔ equiv), CPDAG definition, Meek's 4 rules (R1–R4), identifiability ceiling, when full DAG is identifiable (non-Gaussian, interventional).
- [[PC Algorithm]] — CONTAINS: Markov + faithfulness assumptions, Phase 1 skeleton discovery (conditioning sets, CI tests), Phase 2 v-structure orientation, Phase 3 Meek propagation, Fisher z-test / G-test / KCIT, order-dependence problem, stable-PC (Colombo & Maathuis 2014), consistency theorem.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable BIC score, GES forward phase (valid insert operators), backward phase (valid delete operators), Chickering Theorem 15 (consistency), FGES scaling, comparison table (PC vs GES vs NOTEARS), pcalg R / causal-learn Python code.

**Continuous Optimization — NOTEARS (added 2026-06-17):**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class (MEC)**: the core object that both PC and GES identify — introduced in [[Markov Equivalence Classes and CPDAGs]], used in [[PC Algorithm]] and [[GES - Greedy Equivalence Search]].
- **CPDAG**: the canonical representative of a MEC — constructed by PC (Phases 1–3) and GES (via CPDAG-space search); contrasts with NOTEARS's fully-directed DAG output.
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Faithfulness assumption**: required by both PC and GES for consistency; not needed by NOTEARS (different paradigm).

## Sources
- [[raw/PC-GES-Structure-Learning-Survey.md]] — Synthesis survey compiled from: Spirtes, Glymour & Scheines (2000) *CPS*; Chickering (2002) JMLR 3:507–554; Colombo & Maathuis (2014) JMLR 15:3921–3962; Meek (1995) UAI; Verma & Pearl (1990) UAI. External PDFs blocked by session network policy; compiled from training knowledge.
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, fork/chain/collider; the semantics that MECs and CI tests are built on
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference; v-structures in practice
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven DAG construction (complement to algorithmic structure learning)
- [[Summary Causal DAGs]] — DAG summarization, which presupposes structure learning has already occurred
- [[Nonparametric Causal Inference]] — related causal-modeling material
