---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-08
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three approaches are now
> covered: **NOTEARS** (continuous optimization), the **PC algorithm** (constraint-based),
> and **GES** (score-based). 10 concept notes spanning all three major paradigms.
>
> **NOTEARS (continuous optimization):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need the key theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]
>
> **PC Algorithm (constraint-based):**
> - What is the PC algorithm and when to use it? → [[PC Algorithm - Overview]]
> - How does skeleton/adjacency discovery work (CI tests)? → [[PC Algorithm - Skeleton Discovery]]
> - How does orientation work (v-structures, Meek rules)? → [[PC Algorithm - Orientation Rules]]
>
> **GES (score-based):**
> - What is GES (Greedy Equivalence Search)? → [[GES - Overview]]
>
> **Shared framework:**
> - What is a CPDAG / Markov equivalence class? → [[Equivalence Classes and CPDAGs]]

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
| Markov equivalence + CPDAG | [[Equivalence Classes and CPDAGs]] | concept+theorem | [[DAG Structure Learning Problem]] | Equiv. iff same skeleton + v-structures (Verma & Pearl 1990) |
| PC algorithm full pipeline | [[PC Algorithm - Overview]] | overview | [[Equivalence Classes and CPDAGs]] | Sound & asymptotically complete under Markov + faithfulness |
| Skeleton via CI testing | [[PC Algorithm - Skeleton Discovery]] | concept | [[PC Algorithm - Overview]] | Adjacency restriction: test only subsets of $\text{Adj}(i)$ |
| Fisher's Z-test for CI | [[PC Algorithm - Skeleton Discovery]] | concept | [[PC Algorithm - Overview]] | $Z_{XY|S}=\tanh^{-1}(\hat\rho_{XY|S})\cdot\sqrt{n-|S|-3}$ |
| V-structure detection (sepset) | [[PC Algorithm - Orientation Rules]] | concept+theorem | [[PC Algorithm - Skeleton Discovery]] | Orient $i\to k\leftarrow j$ iff $k\notin\widehat{\text{sep}}(i,j)$ |
| Meek's 4 rules | [[PC Algorithm - Orientation Rules]] | theorem | [[Equivalence Classes and CPDAGs]] | R1–R4 are complete: identify all compelled edges (Meek 1995) |
| GES: FES+BES over equivalence classes | [[GES - Overview]] | overview | [[Equivalence Classes and CPDAGs]] | Consistent under Markov+faithfulness (Chickering 2002) |
| Meek Conjecture | [[GES - Overview]] | theorem | [[Equivalence Classes and CPDAGs]] | Sequence of additions+covered reversals connects any two I-maps |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Equivalence Classes and CPDAGs]] — CONTAINS: Markov condition, faithfulness, v-structures (immoralities), Verma-Pearl equivalence theorem, CPDAG definition (compelled vs. reversible edges), identifiability table, 3-variable example.
- [[PC Algorithm - Overview]] — CONTAINS: two-phase design (skeleton → CPDAG), assumptions table (Markov/faithfulness/sufficiency), soundness & completeness theorem, complexity analysis, variants table (PC-stable, CPC, FCI, RFCI, PCMCI), PC vs. GES comparison table.
- [[PC Algorithm - Skeleton Discovery]] — CONTAINS: adjacency restriction lemma, skeleton algorithm pseudocode, CI test table (Fisher Z, KCIT, χ², CMIknn), Fisher Z formula, PC-stable definition, sepset criterion for orientation, 4-variable worked example.
- [[PC Algorithm - Orientation Rules]] — CONTAINS: v-structure algorithm (sepset criterion), orientation correctness theorem, Meek's 4 rules (R1–R4) with proofs, completeness theorem (Meek 1995), full Phase 2 pseudocode, conservative PC example.
- [[GES - Overview]] — CONTAINS: decomposable score functions (BIC/BGe/BDeu), FES+BES algorithm, Insert/Delete CPDAG operators, Meek Conjecture theorem, GES consistency theorem (Thm. 15 & 17), GES vs. PC table, FGES, GES vs. NOTEARS table, 2 worked examples.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **Markov equivalence / CPDAG**: shared output format for PC and GES; defined in [[Equivalence Classes and CPDAGs]]; recovered by PC (via CI tests) and GES (via score maximization).
- **Faithfulness assumption**: required by both PC ([[PC Algorithm - Overview]]) and GES ([[GES - Overview]]); NOTEARS does not require it explicitly.
- **Meek's rules**: appear as Phase 2 of PC ([[PC Algorithm - Orientation Rules]]) and as the implicit CPDAG-operator structure of GES ([[GES - Overview]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed., MIT Press. Source for PC algorithm notes. (PDF access blocked; cited from comprehensive knowledge.)
- Chickering (2002) — "Optimal structure identification with greedy search," *JMLR* 3:507–554. Source for GES note. Open-access at <https://jmlr.org/papers/v3/chickering02b.html>. (Download blocked by proxy.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[BN Construction Methods Comparison]] — broader landscape of BN structure learning
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-based structure elicitation (complement to data-driven discovery)
- [[Summary Causal DAGs]] — DAG summarization; structure learning is the prerequisite step
