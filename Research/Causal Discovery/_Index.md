---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-07
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Two paradigms are covered:
> **constraint-based** (PC algorithm, CI tests) and **score-based** (GES, NOTEARS).
> - Want the PC algorithm (constraint-based, CI tests)? → [[PC Algorithm]]
> - Want GES (score-based, greedy over MEC)? → [[Greedy Equivalence Search (GES)]]
> - Need the MEC / CPDAG theory underlying both? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the CI testing paradigm explained? → [[Constraint-Based Causal Discovery]]
> - Want NOTEARS (continuous optimization)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs GES, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. ↔ same skeleton + v-structures (Verma & Pearl 1990) |
| CI testing, skeleton learning, faithfulness | [[Constraint-Based Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | PC/PC-stable consistent under Markov + faithfulness |
| PC-stable algorithm (full pseudocode) | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery]] | Order-independent skeleton; outputs CPDAG |
| GES — FES/BES/turning phases | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Consistent via Meek Conjecture (Chickering 2002) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats GES on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-Based Methods (new, 2026-09-07)
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: MEC definition, CPDAG definition, Verma-Pearl theorem (same skeleton + v-structures ↔ equivalence), Meek's R1–R4 orientation rules, what observational data can/cannot identify
- [[Constraint-Based Causal Discovery]] — CONTAINS: faithfulness and Markov condition (defs), Fisher z-test for Gaussian CI, skeleton-learning algorithm, order-dependence problem, PC-stable fix, consistency theorem, contrast with score-based methods
- [[PC Algorithm]] — CONTAINS: PC-stable algorithm (full pseudocode, Algorithm 1), v-structure orientation logic, worked four-variable example, choice of $\alpha$, high-dimensional issues, R/Python software

### Score-Based Methods (new, 2026-09-07)
- [[Greedy Equivalence Search (GES)]] — CONTAINS: BIC score-equivalence, decomposable score definition, Insert/Delete/Turn operators, GES three-phase pseudocode, Meek Conjecture (Chickering Thm. 15), GES consistency theorem, PC vs. GES comparison table

### NOTEARS (continuous optimization, 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs GES/FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov Equivalence Class (MEC) / CPDAG**: the identifiable target of all observational methods;
  appears in [[Markov Equivalence Classes and CPDAGs]] (theory), [[PC Algorithm]] (output), and
  [[Greedy Equivalence Search (GES)]] (search space).
- **Faithfulness**: the key assumption distinguishing CI structure in data from graph structure;
  discussed in [[Constraint-Based Causal Discovery]] and assumed implicitly by [[Greedy Equivalence Search (GES)]].
- **BIC / Score functions**: the basis for GES and NOTEARS score comparison; defined in
  [[Greedy Equivalence Search (GES)]] and referenced in [[DAG Structure Learning Problem]].
- **Linear SEM / weighted adjacency matrix $W$**: NOTEARS-specific; [[DAG Structure Learning Problem]]
  defines it; threads through [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].

## Sources

### Added 2026-09-07
- [[raw/chickering02b-GES-source.md]] — Chickering (2002), "Optimal Structure Identification With Greedy Search," *JMLR* 3:507–554. (Source stub; PDF at https://jmlr.org/papers/v3/chickering02b.html)
- [[raw/colombo2014-PC-stable-source.md]] — Colombo & Maathuis (2014), "Order-Independent Constraint-Based Causal Structure Learning," *JMLR* 15:3921–3962. (Source stub; arXiv:1211.3295)

### Added 2026-06-17
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus (DAG *reasoning*, not learning)
- [[Summary Causal DAGs]] — downstream use: learned causal structure summarizing ABM output
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to data-driven structure learning
- [[BN Construction Methods Comparison]] — broader BN construction landscape
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
