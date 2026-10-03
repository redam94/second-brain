---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-03
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic paradigms
> are now covered: **NOTEARS** (continuous optimization, Zheng et al. 2018), the **PC
> algorithm** (constraint-based, Spirtes & Glymour 1991), and **GES** (score-based greedy
> search, Chickering 2002). 8 concept notes across 3 paradigms.
>
> - Want to understand what algorithms are *searching for*? → [[Markov Equivalence Classes and CPDAGs]]
> - **Constraint-based** (uses CI tests, outputs CPDAG)? → [[PC Algorithm]]
> - **Score-based greedy search** (uses BIC/Bayesian score, outputs CPDAG)? → [[GES Algorithm]]
> - **Continuous optimization** (NOTEARS, outputs a DAG)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results comparing PC/GES/NOTEARS? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures ↔ same equivalence class |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | CI tests → skeleton + v-structures + Meek rules → CPDAG |
| Score-based greedy search | [[GES Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | FES + BES over CPDAG space → true CPDAG (asymptotically) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Foundational concepts (2026-10-03, gap #9 fill)
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: definition of Markov equivalence (Verma & Pearl), v-structures, compelled/reversible edges, CPDAG definition, **Meek's 4 orientation rules R1–R3** with proofs, worked example.
- [[PC Algorithm]] — CONTAINS: faithfulness assumption, skeleton phase pseudocode (conditioning-set iteration, sepset recording), v-structure orientation, Meek rule application, **consistency theorem** (Spirtes et al. 2000), PC-stable (Colombo & Maathuis 2014), practical considerations table, CI test options.
- [[GES Algorithm]] — CONTAINS: decomposable/score-equivalent/consistent score definitions, BIC formula, **FES pseudocode** (Insert operator with $\text{NA}_{Y,X}$ subsets), **BES pseudocode** (Delete operator with $\mathbf{H}$ subsets), **Theorem 1** (GES consistency), **Theorem 3** (BES correctness under composition), covered edge definition, GES vs PC comparison table.

### NOTEARS (2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **Markov equivalence class / CPDAG**: the common *output target* of both PC and GES (see [[Markov Equivalence Classes and CPDAGs]]); NOTEARS outputs a DAG *within* this class.
- **Faithfulness assumption**: required by both PC and GES for consistency; NOTEARS avoids the faithfulness requirement for the optimization but needs it for statistical recovery guarantees.
- **Score decomposability**: the $\sum_i s(X_i, \mathbf{Pa}_i)$ structure enables efficient GES operator evaluation — same form as NOTEARS's LS score ([[DAG Structure Learning Problem]]).

## Paradigm Comparison

| Paradigm | Algorithm | Input Primitive | Output | Consistency Assumption | Software |
|----------|-----------|----------------|--------|----------------------|----------|
| Constraint-based | [[PC Algorithm]] | CI tests | CPDAG | Faithfulness + consistent CI test | `pcalg::pc()`, `causal-learn` |
| Score-based | [[GES Algorithm]] | Decomposable score | CPDAG | Faithfulness + consistent score | `pcalg::ges()`, TETRAD |
| Continuous optimization | [[NOTEARS - Overview]] | LS score (gradient) | DAG | DAG-perfect (Markov + faithfulness) | `notears` (Python) |

## Sources
- [[raw/chickering2002-GES.pdf]] — Chickering & Meek (2002), "Finding Optimal Bayesian Networks," *UAI 2002*. 9-page conference paper covering the GES two-phase algorithm, consistency theorems, and the composition property.
- [[raw/chickering-ges-full.pdf]] — Chickering & Meek (2015), "Selective Greedy Equivalence Search," arXiv preprint. Full SGES paper with GES algorithm description (§3), CPDAG operator definitions, and complexity analysis.
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- *Primary reference for PC algorithm (no local PDF):* Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd ed., MIT Press.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Summary Causal DAGs]] — uses structure learning output for ABM DAG summarization
