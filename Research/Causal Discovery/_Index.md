---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-03
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 8 concept notes + 2 raw sources (1 PDF, 1 synthesis survey).
>
> **Conceptual foundations (start here):**
> - Need the problem setup, NP-hardness, landscape of methods? → [[DAG Structure Learning Problem]]
> - Need Markov equivalence, CPDAGs, Meek's rules? → [[Markov Equivalence and CPDAGs]]
>
> **Constraint-based (PC algorithm):**
> - [[PC Algorithm]] — three phases, PC-stable, CI tests, faithfulness, consistency
>
> **Score-based (GES):**
> - [[GES - Greedy Equivalence Search]] — FES/BES phases, BIC, Meek Conjecture proof, consistency
>
> **Continuous optimization (NOTEARS):**
> - [[NOTEARS - Overview]] — paper summary: combinatorial → continuous program
> - [[Smooth Characterization of Acyclicity]] — the key theorem $h(W)=\mathrm{tr}\,e^{W\circ W}-d$
> - [[NOTEARS Algorithm]] — augmented Lagrangian, L-BFGS, Algorithm 1
> - [[NOTEARS Experiments]] — empirical results vs FGS/PC/GES, Sachs data

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Problem formulation + landscape | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | NP-hard; table of exact/local/constraint/hybrid methods |
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Verma-Pearl theorem; skeleton + v-structures = MEC |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | 3-phase CI test algorithm; PC-stable fixes order-dependence |
| Score-based structure learning | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | FES+BES; Meek Conjecture proof; consistent under BIC |
| Continuous reformulation | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS/PC/GES on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: d-separation (Pearl 1988), Verma-Pearl theorem (skeleton+v-structures), CPDAG definition, Meek's orientation rules R1–R4, covered edge reversals. Foundation for PC and GES.
- [[PC Algorithm]] — CONTAINS: Causal Markov, Faithfulness, Causal Sufficiency definitions; 3-phase algorithm (skeleton, v-structures, Meek rules); order-dependence warning; PC-stable fix (Colombo & Maathuis 2014); consistency theorem; CI test comparison table.
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable score definition, BIC score, local consistency, FES algorithm, BES algorithm, Meek Conjecture statement and proof sketch, GES consistency theorem, FGES extension.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class (MEC) / CPDAG**: the recoverable object from observational data; central to [[Markov Equivalence and CPDAGs]], [[PC Algorithm]], and [[GES - Greedy Equivalence Search]].
- **Faithfulness assumption**: required by all three paradigms (PC, GES, NOTEARS); defined in [[PC Algorithm#^def-faithfulness]] and [[DAG Structure Learning Problem]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through [[NOTEARS Algorithm]] and [[NOTEARS Experiments]].
- **Matrix exponential $e^{W\circ W}$**: the engine of the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Meek Conjecture**: proved by Chickering (2002) in [[GES - Greedy Equivalence Search#^thm-meek-conjecture]]; also underpins the CPDAG orientation rules in [[Markov Equivalence and CPDAGs#^def-covered-edge]].

## Paradigm comparison

| Paradigm | Algorithm | Output | Assumptions | Strengths | Weaknesses |
|----------|-----------|--------|-------------|-----------|------------|
| Constraint-based | PC / PC-stable | CPDAG | Markov, Faithfulness, Sufficiency | Works with any CI test; non-Gaussian data | Exponential in max degree; sensitive to α |
| Score-based | GES / FGES | CPDAG | Markov, Faithfulness, Sufficiency | Consistent; proven completeness; BIC natural | Gaussian-data assumption; slower than NOTEARS |
| Continuous opt. | NOTEARS | Single DAG | Markov (linear SEM) | Scales to dense/large graphs; simple code | No MEC quantification; linear SEM required |

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422).
- [[raw/PC-GES-Causal-Discovery-Survey.md]] — Synthesis survey (2026-08-03) from Spirtes et al. (2000), Chickering (2002), Colombo & Maathuis (2014), Meek (1995), Verma & Pearl (1990). PDFs unavailable due to session network policy.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus (causal inference use of DAGs)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — fork/pipe/collider DAG patterns for causal reasoning
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicited DAG structure (complement to data-driven discovery)
- [[BN Construction Methods Comparison]] — broader survey of Bayesian network construction methods
- [[Summary Causal DAGs]] — Zeng 2025 summarization (assumes DAG given; structure learning precedes this)
