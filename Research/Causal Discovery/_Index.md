---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-12
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three major paradigms:
> **constraint-based** (PC algorithm), **score-based greedy search** (GES/FGS), and
> **continuous optimization** (NOTEARS). 8 concept notes + 1 paper.
> - **New to causal structure learning?** → [[DAG Structure Learning Problem]] (problem setup) then [[Markov Equivalence and CPDAGs]] (what algorithms target)
> - Need the **PC algorithm** (constraint-based, CI testing)? → [[PC Algorithm]]
> - Need **GES** (score-based greedy, Chickering 2002)? → [[GES - Greedy Equivalence Search]]
> - Need the **NOTEARS** continuous optimization approach? → [[NOTEARS - Overview]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization details (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Problem setup (SEM, score, NP-hardness) | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. $\iff$ same skeleton + v-structures |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | CI tests → skeleton → v-structures → CPDAG; consistent under faithfulness |
| Score-based greedy equivalence search | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | FES + BES; proved consistent (Meek conjecture); FGS scales to $d \sim 10^3$ |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program via $h(W)=0$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: d-separation, v-structures/immoralities, Verma-Pearl theorem (equiv. iff same skeleton + v-structures), CPDAG definition, Meek orientation rules (R1–R4), faithfulness assumption. *Added 2026-08-12.*
- [[PC Algorithm]] — CONTAINS: full 3-phase pseudocode (skeleton search → v-structures → Meek propagation), partial correlation CI test (Fisher z-transformation), Kalisch & Bühlmann high-dim. consistency theorem, PC-stable variant, software (`pcalg`, `causal-learn`). *Added 2026-08-12.*
- [[GES - Greedy Equivalence Search]] — CONTAINS: BIC score + decomposability, GES 2-phase algorithm (FES/BES), CPDAG operators (edge insertion/deletion), Meek conjecture (Chickering 2002 Thm 15), GES consistency theorem, FGS variant, score-based vs. constraint-based comparison table. *Added 2026-08-12.*
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / Markov equivalence class**: the target of both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]]; defined in [[Markov Equivalence and CPDAGs]].
- **Linear SEM / weighted adjacency matrix $W$**: NOTEARS's object of estimation; appears in [[DAG Structure Learning Problem]] and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: in score-based methods (GES, NOTEARS alike); introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], benchmarked in [[NOTEARS Experiments]].
- **Faithfulness assumption**: required by PC and GES; discussed in [[Markov Equivalence and CPDAGs]]; not required by the NOTEARS LS score under Gaussianity.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Provides background on PC and GES as comparison methods (§2.2, §5). Code: <https://github.com/xunzheng/notears>.
- *Spirtes, Glymour & Scheines (2000)* — *Causation, Prediction, and Search*, MIT Press. Primary source for PC algorithm. Not in raw/ (proxy-blocked during ingest); cited by name in notes.
- *Chickering (2002)* — "Optimal structure identification with greedy search," JMLR 3:507–554. Primary source for GES and proof of the Meek conjecture. Not in raw/ (proxy-blocked); cited by name in notes.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven alternative to data-driven structure learning
- [[Summary Causal DAGs]] — DAG summarization (assumes DAG is given; structure learning is what precedes this)
