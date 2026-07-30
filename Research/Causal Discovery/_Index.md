---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-30
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from observational data. Three paradigms
> are covered: **constraint-based** (PC algorithm, Spirtes & Glymour 1991), **score-based**
> (GES, Chickering 2002), and **continuous-optimization** (NOTEARS, Zheng et al. 2018).
> 8 concept notes.
>
> **New to causal discovery?** Start with the theory and then a method:
> - What's the identifiability limit (CPDAGs, Markov equivalence)? → [[Markov Equivalence and CPDAGs]]
> - Constraint-based (CI tests → CPDAG): → [[PC Algorithm]]
> - Score-based (BIC → CPDAG): → [[GES - Greedy Equivalence Search]]
> - Continuous-optimization (linear SEM → DAG): → [[NOTEARS - Overview]]
>
> **NOTEARS cluster** (Zheng et al. 2018):
> - Paper overview → [[NOTEARS - Overview]]
> - Problem setup (SEM, score functions, NP-hardness) → [[DAG Structure Learning Problem]]
> - Key theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$) → [[Smooth Characterization of Acyclicity]]
> - Optimization (augmented Lagrangian, L-BFGS) → [[NOTEARS Algorithm]]
> - Empirical results (vs FGS, SHD/FDR, Sachs) → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence; CPDAGs; Meek rules | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + same v-structures |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Consistent CPDAG recovery; PC-stable is order-independent |
| Score-based structure learning | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | FES+BES provably consistent via Meek Conjecture |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence definition, Verma-Pearl-Meek theorem (same skeleton + v-structures ↔ equivalence), CPDAG definition (compelled vs reversible edges), Meek rules R1–R4, what remains non-identifiable from observational data.
- [[PC Algorithm]] — CONTAINS: assumptions (Markov, faithfulness, sufficiency), three phases (skeleton→v-structures→Meek), Fisher z-test for partial correlations, order-dependence problem, PC-stable fix (Colombo & Maathuis 2014), high-dimensional consistency theorem (Kalisch & Bühlmann 2007), FCI/RFCI/PCMCI variants.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score (BIC, BGe), Insert/Delete operators on CPDAG space, FES+BES three-phase algorithm, Meek Conjecture proof (Chickering 2002), GES consistency theorem, FGS (Fast GES) for large $d$, PC vs. GES vs. NOTEARS comparison tables.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Cross-Cutting Concepts

- **CPDAG as output**: Both PC and GES output CPDAGs (equivalence classes), not unique DAGs. NOTEARS outputs a DAG because the linear SEM assumption breaks the symmetry of equivalence classes. See [[Markov Equivalence and CPDAGs]].
- **Faithfulness**: Required by all three paradigms. Without it, PC removes true edges (CI tests fail) and GES may overfit. Faithfulness can fail when linear effects cancel across paths — practically rare but theoretically possible.
- **Consistency under sparsity**: All three methods are consistent as $n \to \infty$ under appropriate sparsity conditions. NOTEARS under linear-SEM faithfulness; PC under strong faithfulness (Kalisch & Bühlmann 2007); GES via the Meek Conjecture.
- **Causal sufficiency**: PC and GES require no hidden confounders; drop this with FCI (PC extension) or score-based FCI variants (GES extension).
- **FGS**: The "Fast GES" implementation used as primary baseline in [[NOTEARS Experiments]]; labeled FGS throughout.

## Sources

- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/pc-ges-causal-discovery-survey.md]] — Synthesis survey from training knowledge: Spirtes, Glymour & Scheines (2000) SGS book; Chickering (2002) JMLR; Kalisch & Bühlmann (2007) JMLR; Colombo & Maathuis (2014) JMLR. Papers freely available online at jmlr.org (JMLR is always open-access); blocked by session network policy.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[BN Construction Methods Comparison]] — expert-based structure learning (contrast to algorithmic)
- [[LLM Expert Elicitation for Bayesian Networks]] — LLM-assisted elicitation of DAG structure
- [[Summary Causal DAGs]] — downstream use of learned causal DAGs
