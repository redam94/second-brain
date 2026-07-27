---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-27
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of directed
> acyclic graphs (DAGs / Bayesian networks) from data. Three families of method are now covered:
> **NOTEARS** (continuous optimization), **PC algorithm** (constraint-based, CI tests), and
> **GES** (score-based, CPDAG search). 8 concept notes + 2 raw sources.
> - Want the full three-method landscape? → [[DAG Structure Learning Problem]] (landscape table)
> - Need **Markov equivalence / CPDAG** (the shared output object of PC and GES)? → [[Markov Equivalence and CPDAGs]]
> - Need the PC algorithm (CI-test-based skeleton + orientation)? → [[PC Algorithm]]
> - Need GES (score-based, Chickering 2002, Meek Conjecture proof)? → [[GES Algorithm]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (NOTEARS vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence; CPDAG; Meek's rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | $G_1 \sim G_2$ iff same skeleton + v-structures (Verma & Pearl 1990) |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Asymptotically recovers true CPDAG under faithfulness (Spirtes et al. 2000) |
| Stable PC (order-independent) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Fix: batch edge removal per level (Colombo & Maathuis 2014) |
| GES forward + backward phases | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Meek Conjecture: optimal CPDAG under faithfulness + BIC (Chickering 2002) |
| BIC score for GES | [[GES Algorithm]] | definition | [[DAG Structure Learning Problem]] | $\text{BIC}_i = -\frac{n}{2}\log\hat{\sigma}_i^2 - \frac{k_i+1}{2}\log n$ |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### PC / GES (Constraint-Based and Score-Based — added 2026-07-27)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence definition; Verma & Pearl (1990) skeleton+v-structure theorem; CPDAG definition (directed iff invariant across MEC, undirected otherwise); Meek's four orientation rules R1–R4 (with conditions); covered edges; three-node worked example. *Foundation for both PC and GES.*
- [[PC Algorithm]] — CONTAINS: faithfulness assumption (def); PC algorithm pseudocode (Phase 0 init, Phase 1 skeleton with $\text{Sep}(X,Y)$ tracking, Phase 2 v-structure orientation, Phase 3 Meek completion); consistency theorem (Spirtes et al. 2000); complexity ($O(d^{\Delta+2})$ under bounded degree); stable PC fix (Colombo & Maathuis 2014 — batch edge removal per level); Fisher's Z CI test; failure modes table.
- [[GES Algorithm]] — CONTAINS: decomposable score definition; BIC score for Gaussian linear SEMs; GES-I (Insert) algorithm (clique set $\mathbf{T}$, CPDAG re-orientation); GES-II (Delete) algorithm (cut set $\mathbf{H}$); Chickering (2002) main theorem (consistency, Meek Conjecture, key lemmas); FGS (Fast GES, Ramsey et al. 2017 — priority queue, precomputed scores); two worked examples (three-node + v-structure); PC vs GES vs NOTEARS comparison.

### NOTEARS (Continuous Optimization — added 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **Faithfulness assumption**: required by both PC ([[PC Algorithm#^def-faithfulness]]) and GES ([[GES Algorithm#^thm-ges-consistency]]); NOTEARS avoids it (uses sparsity + linear SEM instead).
- **CPDAG as the output object**: both PC and GES output a CPDAG ([[Markov Equivalence and CPDAGs#^def-cpdag]]); NOTEARS outputs a single weighted DAG.
- **Meek's rules**: used in PC Phase 3 ([[PC Algorithm]]) and after every edge operation in GES ([[GES Algorithm]]).
- **FGS / GES as baseline**: [[NOTEARS Experiments]] benchmarks against FGS; the GES definition and comparison now live in [[GES Algorithm]].
- **Linear SEM / weighted adjacency matrix $W$**: the NOTEARS object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through all NOTEARS notes.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-Structure-Learning-Survey.md]] — Synthesis survey (training knowledge) of PC algorithm (Spirtes, Glymour & Scheines 2000), GES (Chickering 2002 JMLR), stable PC (Colombo & Maathuis 2014 JMLR), Markov equivalence (Verma & Pearl 1990), and Meek's rules (Meek 1995). External PDF downloads blocked by session network proxy (same pattern as 2026-06-28 PSM run).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference; fork/chain/collider
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge approach (no CI testing needed)
- [[Summary Causal DAGs]] — downstream use of a learned DAG (Zeng 2025 assumes DAG is given; PC/GES supply it)
