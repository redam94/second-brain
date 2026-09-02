---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-02
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Contains two paradigms:
> **constraint-based** (PC algorithm, uses conditional independence tests) and **score-based**
> (GES, greedy search over CPDAGs) alongside **continuous optimization** (NOTEARS).
> - Need the foundational Markov equivalence / CPDAG concept? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the constraint-based algorithm (PC)? → [[PC Algorithm]]
> - Need CI test details (Fisher Z, Chi2, KCI)? → [[Conditional Independence Tests for Causal Discovery]]
> - Need the score-based algorithm (GES)? → [[GES - Greedy Equivalence Search]]
> - Need the continuous optimization approach (NOTEARS)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization algorithm? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent ↔ same skeleton + v-structures (Verma-Pearl) |
| Meek orientation rules | [[Markov Equivalence Classes and CPDAGs]] | theorem | — | R1–R3 propagate orientation without new v-structures |
| Fisher Z-test (Gaussian CI) | [[Conditional Independence Tests for Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | $Z_{ij\|S} \sim N(0,1)$ under $H_0: \rho_{ij\|S}=0$ |
| KCI kernel test (non-Gaussian) | [[Conditional Independence Tests for Causal Discovery]] | concept | — | Consistent CI test; $O(n^3)$ cost |
| PC algorithm skeleton + orientation | [[PC Algorithm]] | concept | [[Conditional Independence Tests for Causal Discovery]] | Outputs CPDAG; consistent under faithfulness |
| PC-stable (order-independent) | [[PC Algorithm]] | concept | [[PC Algorithm]] | Unique skeleton at each adjacency level |
| GES forward/backward search | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Greedy Insert/Delete over CPDAGs; consistent |
| GES BIC score | [[GES - Greedy Equivalence Search]] | concept | — | $Q_\mathrm{BIC} = \log P(\mathbf{X}\|\hat\theta) - \frac{k}{2}\log n$ |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-based (PC algorithm)
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: d-separation (def), faithfulness (def), Markov equivalence (def), Verma-Pearl theorem, CPDAG definition, Meek's rules (R1–R3), score equivalence; LiNGAM comparison.
- [[Conditional Independence Tests for Causal Discovery]] — CONTAINS: partial correlation (def), Fisher Z-test (theorem), $\chi^2$/G-test, KCI kernel test (def); $\alpha$ threshold effects table; high-dimensional PC notes.
- [[PC Algorithm]] — CONTAINS: Phase 1 skeleton algorithm (theorem), Phase 2 v-structure + Meek orientation (theorem), PC-consistency theorem, PC-stable (def); worked 4-variable example; comparison table PC/GES/NOTEARS.

### Score-based (GES)
- [[GES - Greedy Equivalence Search]] — CONTAINS: Gaussian BIC score (def), FES forward search algorithm (theorem), BES backward search algorithm (theorem), Turning operator (def), GES consistency theorem; FGS scalable variant; comparison table PC/GES.

### Continuous optimization (NOTEARS)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class (MEC) / CPDAG**: the fundamental identifiable object; all three algorithms output a DAG or CPDAG in the same MEC. See [[Markov Equivalence Classes and CPDAGs]].
- **Faithfulness assumption**: required by all three methods. Ensures CI tests and scores correctly reflect graph structure. Without it, all guarantees break.
- **Sparsity regularization**: $\ell_1$ in NOTEARS ([[DAG Structure Learning Problem]]), BIC penalty in GES ([[GES - Greedy Equivalence Search]]), implicit via $\alpha$ in PC ([[PC Algorithm]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-sources.md]] — Citation file for PC algorithm (Spirtes et al. 2000; Meek 1995) and GES (Chickering 2002; Hauser & Bühlmann 2012). PDFs freely available at JMLR and MIT Press; blocked by egress proxy during ingestion (2026-09-02).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — DAG *elicitation* (contrast with structure *learning*)
- [[Summary Causal DAGs]] — DAG summarization downstream of structure learning
