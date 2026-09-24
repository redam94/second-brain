---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-24
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> (1) **Continuous optimization** (NOTEARS, Zheng et al. 2018), (2) **Constraint-based**
> (PC algorithm, Spirtes & Glymour 1991), and (3) **Score-based** (GES, Chickering 2002).
> The shared concept underlying (2) and (3) is the Markov Equivalence Class (CPDAG).
>
> - Want a side-by-side comparison of all three methods? → [[Causal Structure Learning - Method Comparison]]
> - Need the MEC / CPDAG concept and Meek rules? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the PC algorithm (constraint-based, CI tests)? → [[PC Algorithm]]
> - Need the CI test mechanics (Fisher Z, G², KCI)? → [[Conditional Independence Testing]]
> - Need GES (score-based, FES/BES, Chickering 2002)? → [[GES - Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need NOTEARS optimization (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures ↔ MEC |
| Meek orientation rules | [[Markov Equivalence Classes and CPDAGs]] | definition | — | R1–R4 complete PDAG to CPDAG |
| PC algorithm (skeleton) | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Remove edges by CI tests; O(d² q^ℓ) |
| PC algorithm (orientation) | [[PC Algorithm]] | concept | [[Conditional Independence Testing]] | V-structures + Meek → CPDAG |
| Fisher Z-test | [[Conditional Independence Testing]] | definition | — | $Z = \sqrt{n-q-3}\,\mathrm{artanh}(r_{XY\|Z})$ |
| G² test (discrete) | [[Conditional Independence Testing]] | definition | — | log-likelihood ratio ~ χ² |
| KCI (nonparametric) | [[Conditional Independence Testing]] | definition | — | RKHS kernel embedding, O(n³) |
| GES Insert/Delete operators | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Local BIC gain over CPDAGs |
| GES consistency theorem | [[GES - Greedy Equivalence Search]] | theorem | [[DAG Structure Learning Problem]] | Recovers true CPDAG asymptotically |
| Method comparison | [[Causal Structure Learning - Method Comparison]] | overview | [[PC Algorithm]], [[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]] | PC (CI) vs GES (score) vs NOTEARS (cont. opt.) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Shared Foundations
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Def (Markov equivalence, Verma & Pearl 1990), Theorem (graphical characterization — skeleton + v-structures), Def (CPDAG), Def (Meek rules R1–R4 with proof sketches), example 3-node MEC.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).

### Constraint-Based (PC Algorithm)
- [[PC Algorithm]] — CONTAINS: PC assumptions (Markov, faithfulness, sufficiency), skeleton algorithm (pseudocode with sep-set recording), v-structure orientation rule, Meek rules dispatch, PC consistency theorem (Spirtes et al. 2000 + Kalisch & Bühlmann 2007), variants table (PC-stable, FCI, RFCI, PC-JCI).
- [[Conditional Independence Testing]] — CONTAINS: Fisher Z-test (partial correlation formula, statistic, decision rule), G² test (log-likelihood ratio, chi-square approximation, sparse-count warning), KCI kernel test (RKHS formulation, null distribution, bandwidth), comparison table of CI tests.

### Score-Based (GES)
- [[GES - Greedy Equivalence Search]] — CONTAINS: GES overview and Meek Conjecture context, score definitions (BIC, decomposability, score-equivalence), Insert operator definition and FES phase pseudocode, Delete operator definition and BES phase pseudocode, GES consistency theorem (Chickering 2002, Theorem 15), Hauser-Bühlmann Turn operator, 3-node worked example.

### Synthesis
- [[Causal Structure Learning - Method Comparison]] — CONTAINS: Feature comparison table (PC vs GES vs NOTEARS), core tradeoffs for each method, empirical benchmark rankings, method selection guide by data regime.

### NOTEARS (Continuous Optimization)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series), **Prop. 2** (matrix exp), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3**, L-BFGS subproblem, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / MEC**: the shared output target for PC and GES; defined in [[Markov Equivalence Classes and CPDAGs]] and used as input/output in both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]].
- **Faithfulness assumption**: required by both PC and GES for consistency; connects to the pathological distributions that violate it (measure zero under Gaussian).
- **Decomposable BIC score**: used by GES ([[GES - Greedy Equivalence Search]]) and by NOTEARS as a benchmark comparison point ([[NOTEARS Experiments]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object NOTEARS estimates; defined in [[DAG Structure Learning Problem]] and threads through all NOTEARS notes.

## Sources

### Constraint-Based & Score-Based
- **Spirtes & Glymour (1991)** — "An algorithm for fast recovery of sparse causal graphs," *Social Science Computer Review* 9:62–72. Original PC paper.
- **Spirtes, Glymour & Scheines (2000)** — *Causation, Prediction, and Search*, 2nd ed., MIT Press. CPS book; Chapters 5–6 for PC algorithm.
- **Chickering (2002)** — "Optimal structure identification with greedy search," *JMLR* 3:507–554. GES + Meek Conjecture proof. Open access: jmlr.org/papers/v3/chickering02b.

### NOTEARS
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Directed Acyclic Graphs]] — DAG semantics for causal inference (d-separation, back-door)
- [[Summary Causal DAGs]] — DAG summarization; structure learning precedes summarization
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — BN construction; structure learning is the data-driven alternative
