---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-06
concept_count: 11
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three major paradigms are now
> documented: **NOTEARS** (continuous optimization, Zheng et al. 2018), **GES** (score-based
> greedy search over MEC space, Chickering 2002), and the **PC algorithm** (constraint-based
> CI testing, Spirtes & Glymour 1991; Kalisch & Bühlmann 2007).
>
> - Want the **problem setup** (SEM, score functions, NP-hardness, landscape of methods)?
>   → [[DAG Structure Learning Problem]]
> - Want **foundational MEC theory** (Markov equivalence, CPDAGs, Meek rules)?
>   → [[Markov Equivalence Classes and CPDAGs]]
> - Need the **constraint-based paradigm** (CI tests → skeleton → CPDAG)?
>   → [[Constraint-Based Causal Discovery]] then [[PC Algorithm]]
> - Need the **score-based paradigm** (GES, BIC, two-phase search)?
>   → [[GES - Overview]] then [[GES Algorithm - Forward and Backward Phases]]
> - Need the **continuous-optimization paradigm** (NOTEARS)?
>   → [[NOTEARS - Overview]] then [[NOTEARS Algorithm]]
> - Need empirical comparisons of all three?
>   → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |
| Markov equivalence, CPDAG, Meek rules | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures |
| Constraint-based paradigm | [[Constraint-Based Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | CI tests + faithfulness → CPDAG; no functional-form assumption |
| PC algorithm (Kalisch & Bühlmann 2007) | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery]] | Consistent for high-dim Gaussian; $d=O(n^a)$ any $a>0$ |
| Score-based paradigm (GES) | [[GES - Overview]] | overview | [[Markov Equivalence Classes and CPDAGs]] | Meek Conjecture → greedy 2-phase search recovers true CPDAG |
| Insert/Delete operators for GES | [[GES Algorithm - Forward and Backward Phases]] | concept | [[GES - Overview]] | Forward adds edges; Backward removes spurious ones |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Markov condition, faithfulness, v-structures, Markov equivalence theorem (skeleton + v-structures ⟺ equivalence), CPDAG definition, Meek rules R1–R4, simple MEC example.
- [[Constraint-Based Causal Discovery]] — CONTAINS: CI-based vs. score-based paradigm table, causal sufficiency, skeleton discovery via separating sets, v-structure orientation logic, CI test options (Fisher $z$, HSIC, KCI), computational complexity, FCI extension.
- [[PC Algorithm]] — CONTAINS: three-phase structure (skeleton / v-structures / Meek), PC skeleton phase pseudocode, PC-stable order-independent variant, Fisher $z$-test definition, **Consistency Theorem** (Kalisch & Bühlmann 2007, Thm. 3.1: $d=O(n^a)$), limitations table (FCI, PCMCI), software references.
- [[GES - Overview]] — CONTAINS: PC vs. GES comparison table, **Meek Conjecture** (Chickering 2002, Thm. 15), score-requirements (score-equivalence, decomposability, local consistency), two-phase structure, why two phases (overshoot + cleanup), complexity, historical context (FGS/BOSS extensions).
- [[GES Algorithm - Forward and Backward Phases]] — CONTAINS: Insert$(X,Y,T)$ operator definition + validity condition (clique + separation), Delete$(X,Y,H)$ operator definition + validity condition, Phase 1 / Phase 2 pseudocode, **GES Consistency Theorem** (Chickering 2002, Thm. 15 + Cor. 3), Gaussian BIC local score definition, software references.

## Cross-Cutting Concepts
- **Markov equivalence classes / CPDAGs**: the target output of both PC and GES; defined in [[Markov Equivalence Classes and CPDAGs]]; the reason a unique DAG cannot be recovered from observational data alone.
- **Linear SEM / weighted adjacency matrix $W$**: the object NOTEARS estimates; defined in [[DAG Structure Learning Problem]]; connects all three paradigms.
- **Score-equivalence / decomposability**: the BIC satisfies both; enables GES to search CPDAG space with local score evaluations; contrast with CI tests in PC.
- **Meek Conjecture**: the theoretical engine of GES's consistency; proved in Chickering (2002); uses the Transformational Characterization of MECs.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-references.md]] — Reference document for PC algorithm (Kalisch & Bühlmann 2007, JMLR 8; Spirtes, Glymour & Scheines 2000, MIT Press) and GES (Chickering 2002, JMLR 3). PDFs freely available at arXiv:math/0510436 and jmlr.org/papers/v3/chickering02b.html; network egress policy prevented download during ingest (2026-10-06).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, and causal reasoning in DAGs
- [[Summary Causal DAGs]] — DAG summarization for ABM outputs (structure learning precedes summarization)
- [[BN Construction Methods Comparison]] — knowledge-elicitation alternatives to structure learning
