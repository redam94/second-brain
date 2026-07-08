---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-08
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Now covers three paradigms:
> **NOTEARS** (continuous optimization), **PC algorithm** (constraint-based CI testing), and
> **GES** (score-based equivalence search). 9 concept notes + 2 papers.
>
> **By paradigm:**
> - Continuous optimization (NOTEARS): → [[NOTEARS - Overview]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]]
> - Constraint-based (PC): → [[PC Algorithm - Overview]], [[Conditional Independence Testing for Causal Discovery]]
> - Score-based (GES): → [[GES - Greedy Equivalence Search]]
> - Shared foundation: → [[Markov Equivalence and CPDAGs]], [[DAG Structure Learning Problem]], [[Smooth Characterization of Acyclicity]]
>
> **By question:**
> - Problem setup (SEM, NP-hardness, landscape of methods)? → [[DAG Structure Learning Problem]]
> - What is the identifiable object from observational data? → [[Markov Equivalence and CPDAGs]]
> - How does the PC algorithm work step-by-step? → [[PC Algorithm - Overview]]
> - What CI tests does PC use? → [[Conditional Independence Testing for Causal Discovery]]
> - How does GES search CPDAG space? → [[GES - Greedy Equivalence Search]]
> - The NOTEARS acyclicity theorem? → [[Smooth Characterization of Acyclicity]]

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
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv iff same skeleton + same v-structures |
| CI testing (Fisher z, KCI) | [[Conditional Independence Testing for Causal Discovery]] | concept | [[Markov Equivalence and CPDAGs]] | $z = \sqrt{n-\|S\|-3}\cdot\operatorname{arctanh}(\hat\rho_{XY\|S}) \sim N(0,1)$ |
| PC algorithm (3 phases) | [[PC Algorithm - Overview]] | overview | [[Conditional Independence Testing for Causal Discovery]] | Consistent recovery of CPDAG under faithfulness |
| GES (Insert/Delete on CPDAGs) | [[GES - Greedy Equivalence Search]] | overview | [[Markov Equivalence and CPDAGs]] | BIC-greedy search; Meek conjecture → consistent |

## Notes

**NOTEARS cluster (Zheng et al., 2018)**
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

**PC and GES cluster (Spirtes, Glymour & Scheines 2000; Chickering 2002)**
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Verma-Pearl equivalence theorem (same skeleton + same v-structures), CPDAG definition, Meek's 4 orientation rules, size of equivalence classes, identifiability limit.
- [[Conditional Independence Testing for Causal Discovery]] — CONTAINS: Fisher z-transform for Gaussian data, G² test for discrete data, KCI/RCIT for non-parametric, multiple testing (BH-FDR), sparsity–accuracy trade-off, `pcalg`/`causal-learn` code.
- [[PC Algorithm - Overview]] — CONTAINS: 3-phase algorithm (skeleton via CI tests, v-structure detection, Meek rules), consistency theorem, faithfulness assumption, order-dependence and PC-stable fix, limitations (FCI for latent confounders).
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable scores (BIC, BDe), Insert/Delete operators on CPDAG space, 2-phase algorithm (FES + BES), **Meek conjecture proof**, GES consistency theorem, `pcalg`/FGES code.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov equivalence class / CPDAG**: the identifiable target for PC and GES; absent from NOTEARS (which outputs a single directed graph).
- **Faithfulness assumption**: required for both PC consistency (correct CI test decisions) and GES consistency (consistent BIC score). See [[Markov Equivalence and CPDAGs]].
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Three-Way Algorithm Comparison

| Aspect | PC | GES | NOTEARS |
|--------|-----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Core operation** | CI tests | Score maximization | Gradient descent on $W$ |
| **Output** | CPDAG | CPDAG | Directed weighted $W$ |
| **Consistency** | Asymptotic (faithfulness) | Asymptotic (faithfulness) | Stationary point only |
| **Scalability** | $d \lesssim 50$ (standard) | $d \lesssim 100$ (GES), $d > 1000$ (FGES) | $d \gg 100$ |
| **Key assumption** | Faithfulness + sufficiency | Faithfulness + BIC/BDe | Linear SEM |
| **Key reference** | Spirtes et al. (2000) | Chickering (2002) | Zheng et al. (2018) |

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- [[raw/PC-GES-Synthesis-Survey.md]] — Synthesis survey of Spirtes, Glymour & Scheines (2000), Chickering (2002 JMLR), Verma & Pearl (1990), Andersson et al. (1997), and Meek (1995). Primary sources freely available (JMLR open access; MIT Press open access) but blocked by egress proxy policy during this session (2026-07-08).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, do-calculus
- [[LLM Expert Elicitation for Bayesian Networks]] — human-knowledge alternative to algorithmic discovery
- [[Summary Causal DAGs]] — ABM-output summarization, presupposes a discovered DAG
