---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-05
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **NOTEARS** (continuous optimization), **PC algorithm** (constraint-based), and **GES**
> (score-based). 10 concept notes spanning the full landscape.
> - Want the full landscape in one page? → [[Causal Discovery Methods - Overview]]
> - Need the assumptions (Markov, Faithfulness, Causal Sufficiency)? → [[Causal Discovery Assumptions]]
> - Need the target representation (CPDAG, MEC, compelled/reversible edges)? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the **PC algorithm** (CI tests, skeleton, Meek rules, high-D consistency)? → [[PC Algorithm]]
> - Need **GES** (Insert/Delete operators, BIC score, consistency theorem)? → [[GES - Greedy Equivalence Search]]
> - Want the paper in one page (NOTEARS)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS/GES/PC, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Full landscape: constraint/score/continuous | [[Causal Discovery Methods - Overview]] | overview | [[DAG Structure Learning Problem]] | Three paradigms; observational data identifies CPDAG |
| Markov equivalence; CPDAG; compelled edges | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | $G_1 \sim G_2$ iff same skeleton + v-structures |
| CMC, Faithfulness, Causal Sufficiency | [[Causal Discovery Assumptions]] | concept | [[Directed Acyclic Graphs]] | All three needed for PC/GES consistency |
| PC skeleton + v-structure + Meek rules | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]], [[Causal Discovery Assumptions]] | Consistent CPDAG under faithfulness; $O(d^2 \cdot d^q)$ CI tests |
| GES Insert/Delete; BIC; two-phase greedy | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]], [[DAG Structure Learning Problem]] | Globally optimal CPDAG under faithfulness (Chickering 2002, Thm. 15) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS/GES/PC on dense/large graphs; ≈ global optimum |

## Notes

**New (2026-10-05) — Constraint-Based and Score-Based Discovery:**
- [[Causal Discovery Methods - Overview]] — CONTAINS: landscape table (constraint/score/continuous), identifiability ceiling, MEC as observable target, FCI for non-sufficient settings, empirical comparison (NOTEARS ≈ GES > PC).
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Verma-Pearl characterization (skeleton + v-structures), compelled/reversible edge definitions, CPDAG formal definition, MEC count table, GES Insert/Delete/Turn operator definitions.
- [[Causal Discovery Assumptions]] — CONTAINS: Causal Markov Condition (formal + factorization equivalence), Faithfulness (formal + path-cancellation violation example), Causal Sufficiency (formal + FCI extension), PC/GES consistency theorem.
- [[PC Algorithm]] — CONTAINS: skeleton algorithm pseudocode, v-structure orientation rule, Meek's four rules (R1–R4) with proofs, CI test table (Fisher Z/kernel/chi-sq), high-D consistency theorem (Kalisch & Bühlmann 2007), order-dependence and PC-stable fix.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score definition, BIC/BDeu/BGe score table, Insert and Delete operator definitions, forward/backward phase algorithms, consistency theorem (Chickering 2002, Thm. 15), Meek Conjecture, GES vs. PC comparison table, FGES and GGES extensions.

**Existing (2026-06-17) — NOTEARS:**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1**, **Prop. 2**, **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3**, L-BFGS / proximal quasi-Newton, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class / CPDAG**: the observable target; cannot be improved upon from observational data alone. Shared target of PC, GES, and post-thresholding NOTEARS.
- **Faithfulness assumption**: required for all three paradigms; its failure modes (path cancellation) and weaker variants (adjacency-faithfulness) documented in [[Causal Discovery Assumptions]].
- **Linear SEM / weighted adjacency matrix $W$**: NOTEARS's parameterization; GES uses scores over DAG space; PC uses CI tests — all three ultimately estimate the same MEC.
- **Matrix exponential $e^{W\circ W}$**: the engine of the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/CITATIONS-constraint-score-based-discovery.md]] — Bibliography for PC algorithm (Spirtes et al. 2000; Kalisch & Bühlmann 2007 arXiv:math/0510436) and GES (Chickering 2002, JMLR v3; Chickering 2002a, JMLR v2). PDFs freely available but blocked by session network proxy; notes written from training knowledge.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — structure learning is the step before DAG summarization (Zeng 2025)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to data-driven discovery
- [[Approximate Bayesian Computation for ABMs]] — ABM outputs as observational data for structure learning
