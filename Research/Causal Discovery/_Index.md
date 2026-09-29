---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-29
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigm clusters:
> **NOTEARS** (continuous-optimization, Zheng et al. 2018) and **PC/GES** (constraint-based
> and score-based classical algorithms, Spirtes et al. 2000; Chickering 2002). 10 notes.
>
> **NOTEARS cluster:**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **PC / GES cluster (added 2026-09-29):**
> - Need the theoretical foundation for all discovery algorithms? → [[Markov Equivalence and CPDAGs]]
> - Need the constraint-based algorithm (PC-stable, v-structures, Meek rules)? → [[PC Algorithm]]
> - Need the CI tests PC relies on (Fisher's z, G², KCI)? → [[Conditional Independence Tests for Structure Learning]]
> - Need the score-based algorithm (GES, FES/BES phases, Meek conjecture)? → [[Greedy Equivalence Search (GES)]]
> - Need a comparison of PC vs. GES vs. NOTEARS with practical guidance? → [[Causal Discovery Algorithms - Comparison]]

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
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | theorem | [[DAG Structure Learning Problem]] | Verma-Pearl: same skeleton + v-structures ↔ equiv.; Meek R1–R4 |
| PC algorithm (PC-stable) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]], [[Conditional Independence Tests for Structure Learning]] | Skeleton via CI tests; orient via v-structures + Meek rules |
| CI tests for structure learning | [[Conditional Independence Tests for Structure Learning]] | concept | [[Markov Equivalence and CPDAGs]] | Fisher's z (Gaussian), G² (discrete), KCI (nonparam.) |
| Greedy Equivalence Search | [[Greedy Equivalence Search (GES)]] | theorem | [[Markov Equivalence and CPDAGs]], [[DAG Structure Learning Problem]] | FES + BES over CPDAG space; Meek conjecture guarantees consistency |
| Algorithm comparison | [[Causal Discovery Algorithms - Comparison]] | concept | [[PC Algorithm]], [[Greedy Equivalence Search (GES)]], [[NOTEARS - Overview]] | Decision guide: PC (non-param), GES (score), NOTEARS (linear, large $d$) |

## Notes

### NOTEARS cluster
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

### PC / GES cluster (added 2026-09-29)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Causal Markov + faithfulness defs, Verma–Pearl Markov equivalence theorem, CPDAG definition, Meek orientation rules R1–R4, simple 3-variable worked example.
- [[PC Algorithm]] — CONTAINS: PC assumptions (Markov, faithfulness, sufficiency), skeleton phase pseudocode + complexity, v-structure orientation, PC consistency theorem, PC-stable (order-independence fix), Conservative PC (CPC), worked 3-var example.
- [[Conditional Independence Tests for Structure Learning]] — CONTAINS: Fisher's z-test with formula + decision rule, G² statistic for discrete data, Kernel CI Test (KCI) for nonparam., α–sparsity tradeoff table, multiple testing note.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: BIC score decomposability, BDe score, Meek Conjecture (Theorem 15 from Chickering 2002), FES pseudocode + Insert operator, BES pseudocode + Delete operator, GES consistency theorem.
- [[Causal Discovery Algorithms - Comparison]] — CONTAINS: PC/GES/NOTEARS comparison table (assumptions, output, complexity, tuning), when-to-use guide, common pitfalls, empirical benchmark summary, software ecosystem table.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **Markov equivalence class / CPDAG**: the output space of PC and GES; defined in [[Markov Equivalence and CPDAGs]], used by [[PC Algorithm]] and [[Greedy Equivalence Search (GES)]].
- **Faithfulness**: assumed by both PC and GES; failure causes both algorithms to remove true edges.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering02b-GES-SOURCE.txt]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554. (PDF at jmlr.org/papers/v3/chickering02b.html — not downloaded, proxy blocked.)
- [[raw/colombo-maathuis-2014-PC-SOURCE.txt]] — Colombo & Maathuis (2014), *Order-Independent Constraint-Based Causal Structure Learning*, JMLR 15:3921–3962. (PDF at arXiv:1211.3295 — not downloaded, proxy blocked.) Also covers: Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, MIT Press.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[BN Construction Methods Comparison]] — expert-elicitation vs. data-driven alternatives
- [[Summary Causal DAGs]] — downstream use of learned DAG structures
- [[Directed Acyclic Graphs]] — d-separation, backdoor adjustment, do-calculus
