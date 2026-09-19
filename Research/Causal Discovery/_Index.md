---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-19
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> All three output the same target — a **CPDAG** (or single DAG for NOTEARS) — but approach it differently.
> - Want the foundational concept (MEC, CPDAG, Meek rules)? → [[Markov Equivalence Classes and CPDAGs]]
> - Want constraint-based discovery (PC algorithm, CI tests)? → [[PC Algorithm]]
> - Want score-based discovery (GES, BIC, forward/backward)? → [[GES - Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, skeleton, v-structures, CPDAG, Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures (Verma & Pearl 1990) |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Consistent recovery of true CPDAG under faithfulness + Markov + sufficiency |
| Score-based structure learning | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Score-consistent (Chickering 2002, Thm. 15); forward+backward+turn phases |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: d-separation, Markov property, Markov equivalence (Verma & Pearl 1990), skeleton def, v-structure def, CPDAG def, Meek orientation rules R1–R4, faithfulness assumption. **Prerequisite for PC and GES.**
- [[PC Algorithm]] — CONTAINS: three phases (skeleton construction via CI tests, v-structure identification from separating sets, Meek edge completion), CI test table (Gaussian/discrete/nonlinear), Fisher z-statistic, consistency theorem, complexity $O(d^{q+2})$, stable PC variant, toy 4-variable example.
- [[GES - Greedy Equivalence Search]] — CONTAINS: score equivalence, decomposability, local consistency (Chickering 2002 Def. 18), BIC/BDeu/BGe table, forward phase (Insert operator), backward phase (Delete operator), turning phase (Hauser & Bühlmann 2012), score-consistency theorem (Thm. 15), comparison table PC vs GES vs NOTEARS.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), proofs.
- [[NOTEARS Algorithm]] — CONTAINS: augmented Lagrangian $L^\rho$, L-BFGS subproblem, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Sachs real-data result, limitations.

## Cross-Cutting Concepts
- **CPDAG**: the shared output target of PC and GES; a canonical representative of a Markov equivalence class; defined in [[Markov Equivalence Classes and CPDAGs]], used to interpret results in [[NOTEARS Experiments]].
- **Faithfulness**: required by both PC (for CI tests) and GES (for score consistency); defined in [[Markov Equivalence Classes and CPDAGs#^def-faithfulness]].
- **Skeleton + v-structures**: the identifiable part of a causal DAG from observational data; discovered by PC in Phase 1–2, and the MEC encoded by GES's CPDAG output.
- **Linear SEM / weighted adjacency matrix $W$**: the object NOTEARS estimates; appears in [[DAG Structure Learning Problem]] and threads through NOTEARS notes.

## Paradigm Comparison

| Paradigm | Algorithm | Search Space | Output | Faithfulness? |
|----------|-----------|-------------|--------|--------------|
| Constraint-based | [[PC Algorithm]] | Skeleton → CPDAG via CI tests | CPDAG | Required |
| Score-based | [[GES - Greedy Equivalence Search]] | CPDAG space via BIC greedy search | CPDAG | Required |
| Continuous optimization | [[NOTEARS - Overview]] | $\mathbb{R}^{d\times d}$ via augmented Lagrangian | Single DAG | Not required |

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS*, NeurIPS 2018. Code: <https://github.com/xunzheng/notears>.
- [[raw/constraint-score-based-sources.md]] — Reference list for PC algorithm (Spirtes et al. 2000; Meek 1995), GES (Chickering 2002; Hauser & Bühlmann 2012), and MEC theory (Verma & Pearl 1990). PDFs freely available at JMLR; inaccessible from this session due to network policy.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus (econometric perspective)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Summary Causal DAGs]] — DAG summarization that presupposes structure learning as input
- [[LLM Expert Elicitation for Bayesian Networks]] — expert knowledge can constrain PC search space
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Approximate Bayesian Computation for ABMs]] — ABM simulations as input data for structure learning
