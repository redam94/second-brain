---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-08
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from observational data. Contains 9 notes
> across two paradigms: **constraint-based** (PC algorithm; conditional independence tests) and
> **score-based** (GES via greedy equivalence search; NOTEARS via continuous optimization).
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the general causal structure learning problem (SEM, scores, NP-hardness)? → [[DAG Structure Learning Problem]]
> - **Need the PC algorithm (constraint-based CI testing)?** → [[PC Algorithm]]
> - **Need GES (score-based equivalence class search)?** → [[GES - Greedy Equivalence Search]]
> - **Need Markov equivalence classes, CPDAGs, Meek rules?** → [[Markov Equivalence and CPDAGs]]
> - **Need the paradigm-level overview (CMC, faithfulness, CI tests)?** → [[Constraint-Based Causal Discovery - Overview]]
> - Need the key acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

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
| Constraint-based paradigm | [[Constraint-Based Causal Discovery - Overview]] | overview | [[DAG Structure Learning Problem]] | CMC + faithfulness → CPDAG from CI tests |
| Markov equivalence; CPDAG | [[Markov Equivalence and CPDAGs]] | theorem | [[Constraint-Based Causal Discovery - Overview]] | Same skeleton + same v-structures ↔ equiv. class; Meek rules orient edges |
| PC algorithm | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery - Overview]], [[Markov Equivalence and CPDAGs]] | Skeleton phase (growing S) + orientation (v-structures + Meek) → CPDAG |
| GES (score-based equiv. search) | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]], [[DAG Structure Learning Problem]] | FES + BES over CPDAGs with decomposable score → CPDAG |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Constraint-Based Causal Discovery - Overview]] — CONTAINS: CMC (def + factorization), Faithfulness (def), Causal Sufficiency (def), d-separation criterion, CI test options (Gaussian/non-Gaussian/discrete), what is recoverable from data (Markov equiv. class), method landscape table (PC/FCI/GES/NOTEARS/LiNGAM).
- [[Markov Equivalence and CPDAGs]] — CONTAINS: **Verma–Pearl Theorem** (skeleton + v-structures ↔ Markov equiv.), unshielded collider def, CPDAG def + uniqueness theorem, **Meek Rules R1–R4** (full statements + intuitions), worked 3-DAG example, what remains unidentifiable (interventions, non-Gaussianity, ANMs).
- [[PC Algorithm]] — CONTAINS: skeleton phase **pseudocode** (growing conditioning-set loop), v-structure orientation rule (Sepset logic), Meek rule application, **consistency theorem** (CMC + faithfulness), complexity $O(p^{2\Delta})$, PC-stable def, software table (pcalg / causal-learn / TETRAD / bnlearn).
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score def, **Meek conjecture** (proved by Chickering 2002) + implication, FES phase **pseudocode** (Insert operator), BES phase **pseudocode** (Delete operator), **GES consistency theorem**, FGES def (Ramsey 2017, $p=10^6$), comparison table PC vs GES, comparison with NOTEARS.

## Cross-Cutting Concepts

- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; also the implicit target of GES and PC (which recover the CPDAG of the true DAG from which $W$ was drawn).
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov equivalence class / CPDAG**: the shared output target of both PC ([[PC Algorithm]]) and GES ([[GES - Greedy Equivalence Search]]) — see [[Markov Equivalence and CPDAGs]].
- **Faithfulness assumption**: required by both PC and GES ([[Constraint-Based Causal Discovery - Overview]]); NOTEARS sidesteps it by making parametric SEM assumptions.
- **Three paradigms**: constraint-based (PC) vs. score-based (GES) vs. continuous-optimization (NOTEARS); all covered now.

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/spirtes-2000-causation-prediction-search-ref.txt]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, MIT Press. Reference stub (PDF blocked by network policy; freely available from CMU authors' pages). Covers PC algorithm and constraint-based paradigm.
- [[raw/chickering-2002-GES-ref.txt]] — Chickering (2002), "Optimal Structure Identification With Greedy Search", *JMLR* 3:507-554. Reference stub (PDF at jmlr.org/papers/volume3/chickering02b/ but blocked by network policy). Covers GES algorithm and Meek conjecture proof.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, backdoor criterion, causal identification
- [[Summary Causal DAGs]] — DAG summarization (assumes the DAG is *given*, not learned)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert knowledge for DAG construction (contrast with data-driven learning)
- [[BN Construction Methods Comparison]] — survey of DAG construction approaches
