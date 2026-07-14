---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-14
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigms are now covered:
> **NOTEARS** (continuous optimization, Zheng et al. 2018) and **constraint-based + score-based**
> methods (PC algorithm and GES, added 2026-07-14). 9 concept notes + 2 source documents.
>
> **NOTEARS (continuous optimization):**
> - Paper in one page? → [[NOTEARS - Overview]]
> - Problem setup (SEM, score, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Key theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Optimization (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Empirical results (vs FGS, SHD/FDR, Sachs)? → [[NOTEARS Experiments]]
>
> **Constraint-based + score-based methods (PC, GES):**
> - Foundations (d-separation, faithfulness, CMC)? → [[Constraint-Based Causal Discovery]]
> - What are equivalence classes and CPDAGs? → [[Markov Equivalence and CPDAGs]]
> - The PC algorithm (skeleton → v-structures → Meek rules)? → [[PC Algorithm]]
> - The GES algorithm (forward FES + backward BES)? → [[Greedy Equivalence Search (GES)]]

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
| d-sep, CMC, Faithfulness | [[Constraint-Based Causal Discovery]] | concept | [[Directed Acyclic Graphs]], [[DAG Structure Learning Problem]] | Faithfulness ↔ CPDAG identifiable from CIs |
| MEC, CPDAG, covered edges | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + same v-structures ↔ Markov equivalent |
| PC algorithm (3 phases) | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery]], [[Markov Equivalence and CPDAGs]] | Consistent for $d=O(n^a)$ under sparsity |
| GES (FES + BES) | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence and CPDAGs]], [[DAG Structure Learning Problem]] | Consistent under faithfulness; proves Meek Conjecture |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Constraint-Based Causal Discovery]] — CONTAINS: d-separation definition (Pearl 1988), Causal Markov Condition (CMC), faithfulness definition + genericity theorem, fundamental identifiability theorem, CI test table (Fisher z, kernel, $G^2$), FCI extension.
- [[Markov Equivalence and CPDAGs]] — CONTAINS: **Verma–Pearl characterisation** (same skeleton + same v-structures ↔ equivalent), v-structure definition, CPDAG definition (compelled vs reversible edges), **covered edge theorem** (Meek Conjecture), computing CPDAGs, 4-variable example.
- [[PC Algorithm]] — CONTAINS: **Phase 1** skeleton learning (full pseudocode), **Phase 2** v-structure orientation (soundness theorem), **Phase 3** Meek rules R1–R4 (completeness), **Kalisch–Bühlmann consistency theorem**, stable PC variant, complexity table, software table.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: consistent decomposable score, BIC formula, Insert/Delete operators, **FES** (forward greedy), **BES** (backward greedy), **Chickering consistency theorem** (Th. 15), FGES description, PC vs GES comparison table, software table.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **Markov equivalence class / CPDAG**: the output target of both PC and GES — defined in [[Markov Equivalence and CPDAGs]], produced by [[PC Algorithm]], searched over by [[Greedy Equivalence Search (GES)]].
- **Faithfulness**: the non-cancellation assumption linking CI tests to graph structure — formal definition in [[Constraint-Based Causal Discovery]], used implicitly in [[NOTEARS - Overview]] (LS consistency results do not require faithfulness, a key advantage).
- **Three paradigms**: constraint-based ([[PC Algorithm]]), score-based ([[Greedy Equivalence Search (GES)]]), continuous-optimization ([[NOTEARS - Overview]]) — compared head-to-head in [[NOTEARS Experiments]] and [[Greedy Equivalence Search (GES)]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-Causal-Structure-Learning-Survey.md]] — Synthesis survey (2026-07-14) covering Spirtes & Glymour (1991), Spirtes, Glymour & Scheines (2000), Verma & Pearl (1990), Meek (1995), Chickering (2002), Kalisch & Bühlmann (2007), Ramsey et al. (2017). Direct PDF downloads blocked by session proxy; survey compiled from training knowledge of these papers.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[LLM Expert Elicitation for Bayesian Networks]] — BN construction from expert knowledge (complements algorithmic structure learning)
- [[Summary Causal DAGs]] — Zeng 2025 DAG summarization assumes the DAG is given; structure learning is the upstream step
