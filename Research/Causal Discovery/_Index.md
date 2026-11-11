---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-11-11
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three complementary paradigms
> are covered:
> - **Constraint-based** (PC algorithm): test for conditional independence, orient by v-structures
> - **Score-based** (GES): greedy search over Markov equivalence classes maximising BIC
> - **Continuous optimisation** (NOTEARS): recast DAG learning as smooth equality-constrained program
>
> Both PC and GES output a **CPDAG** (Markov equivalence class) — see [[Markov Equivalence and CPDAG]].
> NOTEARS outputs a DAG directly.
>
> - Want the continuous-optimisation approach? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness, landscape of methods)? → [[DAG Structure Learning Problem]]
> - Need **constraint-based** structure learning (PC algorithm, CI tests, Meek rules)? → [[PC Algorithm]]
> - Need **score-based** structure learning (GES, BIC scoring, two-phase search)? → [[GES Algorithm]]
> - Need the **CPDAG / Markov equivalence** framework underlying PC and GES? → [[Markov Equivalence and CPDAG]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS, thresholding)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, v-structures, CPDAG | [[Markov Equivalence and CPDAG]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures (Verma–Pearl) |
| Constraint-based learning (CI tests) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAG]] | Consistent CPDAG recovery under faithfulness + sparsity |
| Score-based greedy search | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAG]] | GES consistent: BIC + covered-edge moves recover true CPDAG |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]], [[PC Algorithm]], [[GES Algorithm]] | NOTEARS beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAG]] — CONTAINS: Markov condition, faithfulness, v-structures (definition + example), Verma–Pearl theorem (skeleton + v-structures ↔ equivalence), CPDAG definition, Meek orientation rules R1–R4, Chickering covered-edge theorem.
- [[PC Algorithm]] — CONTAINS: three phases (skeleton via CI tests, v-structure orientation, Meek completion), Fisher's Z / HSIC / G-test CI tests, $O(p^{d^*+2})$ complexity, high-dimensional consistency (Kalisch & Bühlmann 2007), PC-stable (order-independent), 3-node worked example, limitations (causal sufficiency, faithfulness, CI test errors).
- [[GES Algorithm]] — CONTAINS: decomposable score (BIC, BDe), score equivalence, two-phase FES+BES algorithm (Insert/Delete operators), Meek completion, GES consistency theorem (Chickering 2002 Main Theorem), FGS as fast variant, PC vs GES comparison table.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **Markov equivalence / CPDAG**: the common output format for both PC ([[PC Algorithm]]) and GES ([[GES Algorithm]]); defined in [[Markov Equivalence and CPDAG]].
- **Faithfulness + Markov condition**: required by all three paradigms for consistency; defined in [[Markov Equivalence and CPDAG]].
- **NP-hardness of DAG learning**: motivates both constraint-based heuristics and continuous relaxation; stated in [[DAG Structure Learning Problem]].
- **Benchmarks (FGS / GES vs NOTEARS)**: [[NOTEARS Experiments]] compares continuous optimisation (NOTEARS) against score-based search (FGS); PC is a secondary baseline.

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/pc-ges-structure-learning-sources.md]] — Spirtes, Glymour & Scheines (2000); Chickering (2002) JMLR; Kalisch & Bühlmann (2007) JMLR; Meek (1995); Verma & Pearl (1990). PDF download blocked by proxy on 2026-11-11; free URLs listed in stub.

## See Also

- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, do-calculus (causal inference angle)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Summary Causal DAGs]] — Zeng 2025 DAG summarization (assumes DAG is given; structure learning precedes this)
- [[Nonparametric Causal Inference]] — related causal-modeling material
