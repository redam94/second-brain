---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-14
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Contains two algorithm families:
> **NOTEARS** (continuous optimisation) and **PC + GES** (constraint-based and score-based).
> - Want a paradigm overview? → [[Constraint-Based vs Score-Based Causal Discovery]]
> - Need the shared output format (CPDAGs, Markov equivalence)? → [[Markov Equivalence and CPDAGs]]
> - Constraint-based (PC algorithm, CI tests, Meek rules)? → [[PC Algorithm]]
> - Score-based (GES, FES+BES, SGES polynomial variant)? → [[GES - Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence classes & CPDAGs | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]], [[Directed Acyclic Graphs]] | Skeleton + v-structures characterise equivalence (Verma & Pearl 1991) |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | CI tests → skeleton → v-structures → Meek rules → CPDAG |
| Score-based structure learning | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | FES+BES recovers true CPDAG (Chickering 2002 Thm 1) |
| Paradigm comparison | [[Constraint-Based vs Score-Based Causal Discovery]] | concept | [[PC Algorithm]], [[GES - Greedy Equivalence Search]] | PC/GES output CPDAGs; NOTEARS outputs a DAG |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### PC / GES cluster (ingested 2026-08-14)

- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov equivalence definition, Verma & Pearl (1991) skeleton+v-structure theorem, CPDAG definition, compelled/reversible edges, IMAP partial order, covered edge definition, three-node examples. Source: chickering2016-selective-GES.pdf §3.
- [[PC Algorithm]] — CONTAINS: Causal Markov/Faithfulness/Causal Sufficiency assumptions, Phase 1 skeleton (growing conditioning sets), Phase 2 v-structure orientation, Phase 3 Meek rules (R1–R4), PC-stable order-independence fix, FCI/RFCI/CPC extensions, software (pcalg, causal-learn, TETRAD). Source: chickering2016-selective-GES.pdf §2.
- [[GES - Greedy Equivalence Search]] — CONTAINS: Score requirements (equivalence, local consistency, decomposability), Insert operator (FES), Delete operator (BES), Theorem 1 (Chickering 2002 consistency), SGES polynomial variant (Π-consistent operators), FGES/Ramsey 2017 parallelisation, GES vs PC table, software. Source: chickering2016-selective-GES.pdf §2–3.
- [[Constraint-Based vs Score-Based Causal Discovery]] — CONTAINS: three-paradigm overview (constraint, score, continuous), side-by-side comparison table (PC vs GES vs NOTEARS), when-to-use guidance, misspecification robustness analysis. Source: chickering2016-selective-GES.pdf §1–2.

### NOTEARS cluster (ingested 2026-06-17)

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts

- **CPDAG**: the canonical output of both PC and GES; defined in [[Markov Equivalence and CPDAGs]], used by [[PC Algorithm]] and [[GES - Greedy Equivalence Search]], absent from NOTEARS (which outputs a DAG — a noted limitation in [[NOTEARS Experiments]]).
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].
- **Score consistency**: the shared requirement linking [[GES - Greedy Equivalence Search]] (theoretical) and [[NOTEARS Experiments]] (empirical); BIC satisfies it for Gaussian linear SEMs.

## Sources

- [[raw/chickering2016-selective-GES.pdf]] — Chickering & Meek, *Selective Greedy Equivalence Search*, JMLR 2016 (arXiv). Covers GES (§3), SGES (§4–5), PC in related work (§2), Markov equivalence background (§3).
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation and Markov conditions (prerequisite)
