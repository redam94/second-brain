---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-29
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are documented:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization**
> (NOTEARS). 9 concept notes across all three paradigms.
>
> **Start here for the full picture:** → [[Causal Discovery Algorithm Comparison]]
>
> **PC algorithm (constraint-based):**
> - Foundational theory (Markov equivalence, CPDAGs, Meek rules) → [[Markov Equivalence and CPDAGs]]
> - The PC algorithm (skeleton recovery + orientation) → [[PC Algorithm]]
>
> **GES (score-based):**
> - GES operators (FES/BES phases, Chickering 2002 optimality theorem) → [[GES Algorithm]]
>
> **NOTEARS (continuous optimization):**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Same skeleton + v-structures ↔ Markov equivalent; Meek R1–R4 |
| PC algorithm | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Skeleton by CI tests; orient by v-structures + Meek; consistent under faithfulness |
| GES algorithm | [[GES Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | FES + BES over CPDAGs; BIC score; Chickering's Meek conjecture proof |
| Algorithm comparison | [[Causal Discovery Algorithm Comparison]] | concept | [[PC Algorithm]], [[GES Algorithm]], [[NOTEARS - Overview]] | PC: flexible CI test; GES: BIC score; NOTEARS: continuous, wins dense |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### PC algorithm and GES (added 2026-08-29)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence definition, v-structure definition, Verma-Pearl characterization theorem, CPDAG definition, Meek orientation rules R1–R4, identifiability table (what breaks the CPDAG limit).
- [[PC Algorithm]] — CONTAINS: faithfulness + CMC + causal sufficiency definitions, skeleton algorithm (full pseudocode), v-structure orientation, Meek rule application, consistency theorem (Spirtes et al. 2000, Thm 5.4.2), CI test table (Gaussian/discrete/kernel), complexity, PC-stable, pcalg/causal-learn code.
- [[GES Algorithm]] — CONTAINS: decomposable BIC score, insert/delete operator definitions, FES phase (pseudocode), BES phase (pseudocode), GES consistency theorem (Chickering 2002, Thm 15 = Meek conjecture), local score delta formula, FGES note, pcalg/causal-learn code.
- [[Causal Discovery Algorithm Comparison]] — CONTAINS: full comparison table (PC/GES/NOTEARS on 15 dimensions), paradigm summaries, decision guide (when to use each), failure mode table, connections to BN elicitation and ABM structural learning.

### NOTEARS (added 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering2002-GES-citation.md]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR 3:507–554. PDF (open access, blocked this session): https://jmlr.org/papers/volume3/chickering02b/chickering02b.pdf
- [[raw/spirtes2000-CPS-citation.md]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd Ed., MIT Press. Free PDF: https://archive.illc.uva.nl/cil/uploaded_files/inlineitem/Spirtes_Glymour_Scheines_2000_Causation_Prediction_.pdf

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
