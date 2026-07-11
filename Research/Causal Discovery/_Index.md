---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-11
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithm families are covered:
> **constraint-based** (PC algorithm), **score-based** (GES/FGS), and **continuous optimisation** (NOTEARS).
> 10 concept notes + 2 raw sources.
>
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness, landscape of all methods)? → [[DAG Structure Learning Problem]]
> - Need the **foundational MEC theory** (Verma-Pearl, CPDAG, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - Need **constraint-based PC algorithm** (skeleton discovery, v-structures, CI tests, PC-stable)? → [[PC Algorithm]]
> - Need **score-based GES** (FES/BES phases, Meek conjecture, BIC score, FGS)? → [[Greedy Equivalence Search]]
> - Need the **acyclicity theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimisation (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
> - Need a **decision guide** (PC vs GES vs NOTEARS, when to use which)? → [[Causal Discovery Algorithms - Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence / CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Two DAGs equiv ↔ same skeleton + same v-structures (Verma-Pearl) |
| Faithfulness assumption | [[Markov Equivalence and CPDAGs]] | concept | — | CI in data ↔ d-sep in DAG |
| Meek orientation rules R1–R3 | [[Markov Equivalence and CPDAGs]] | theorem | — | Propagate orientations without new v-structures/cycles |
| PC algorithm (3 phases) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Skeleton → v-structures → Meek rules; output CPDAG |
| PC skeleton discovery | [[PC Algorithm]] | concept | — | Remove edges where $X \perp\!\!\!\perp Y \mid S$; CI tests grow by size |
| PC-stable (order-independent) | [[PC Algorithm]] | concept | — | Collect removals at each level $l$ before applying |
| GES forward/backward phases | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | FES then BES; score equivalence justifies MEC search |
| Score equivalence | [[Greedy Equivalence Search]] | theorem | — | All DAGs in MEC get same BIC/BDe score |
| Meek conjecture (proved) | [[Greedy Equivalence Search]] | theorem | — | Greedy path to true MEC always exists |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |
| PC vs GES vs NOTEARS | [[Causal Discovery Algorithms - Comparison]] | concept | all above | Decision guide: data type, sparsity, output format |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov condition, faithfulness, Verma-Pearl theorem, CPDAG definition, Meek rules R1–R3, worked examples (v-structures, unoriented chains), connection to interventional identification.
- [[PC Algorithm]] — CONTAINS: 3-phase algorithm (skeleton discovery, v-structure orientation, Meek propagation), soundness/consistency theorem, CI test table (Fisher Z, G², KCIT), PC-stable definition, order-dependence problem, 4-node worked example.
- [[Greedy Equivalence Search]] — CONTAINS: decomposable score, score equivalence theorem, FES/BES phase definitions, Meek conjecture proof statement, GES consistency theorem, FGS description, BIC formula, R and Python code examples.
- [[Causal Discovery Algorithms - Comparison]] — CONTAINS: full property comparison table, unified consistency theorem, CPDAG vs DAG output distinction, empirical comparison from NOTEARS paper, decision guide (when to use each), identifiability-beyond-MEC table (LiNGAM, FCI, ICP).
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **CPDAG / Markov equivalence**: the output of both PC ([[PC Algorithm]]) and GES ([[Greedy Equivalence Search]]), and the identifiability limit characterised in [[Markov Equivalence and CPDAGs]]. NOTEARS outputs a single DAG representative instead.
- **Faithfulness assumption**: shared by all three families; formally defined in [[Markov Equivalence and CPDAGs]]; required by [[PC Algorithm]] for CI test inference and [[Greedy Equivalence Search]] for score consistency; not required for NOTEARS's LS loss consistency proof.
- **BIC / decomposable scores**: used by GES ([[Greedy Equivalence Search]]), justified by score equivalence; also appears in the NP-hardness program (4) in [[DAG Structure Learning Problem]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note. PC and GES do not need a parametric SEM — any CI test or decomposable score suffices.
- **FGS (Fast GES)**: the NOTEARS baseline [[NOTEARS Experiments]]; described in detail in [[Greedy Equivalence Search]].

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-causal-structure-learning-survey.md]] — Synthesis survey (training-knowledge compilation) of Spirtes, Glymour & Scheines (2000), Chickering (2002), Colombo & Maathuis (2014). PDFs unavailable due to network policy (2026-07-11). Primary JMLR links: <https://jmlr.org/papers/v3/chickering02b.html> (GES), <https://jmlr.org/papers/v15/colombo14a.html> (PC-stable).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus (the causal reasoning layer that structure learning serves)
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[BN Construction Methods Comparison]] — expert elicitation alternative to data-driven structure learning
- [[Summary Causal DAGs]] — downstream use: assumes DAG is given; structure learning is what comes before
- [[LLM Expert Elicitation for Bayesian Networks]] — LLM-assisted elicitation of BN structure
