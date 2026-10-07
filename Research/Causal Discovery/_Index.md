---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-07
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 8 concept notes spanning 2 source papers.
>
> **Quick navigation:**
> - What is the object being learned? → [[Markov Equivalence Classes and CPDAGs]] (CPDAG, MEC, Verma-Pearl)
> - Constraint-based / CI-test approach? → [[PC Algorithm]] (skeleton, v-structures, Meek rules)
> - Score-based greedy search? → [[GES - Greedy Equivalence Search]] (FES, BES, BIC, SGES)
> - Continuous-optimization approach? → [[NOTEARS - Overview]]
> - The core mathematical setup (SEM, NP-hardness)? → [[DAG Structure Learning Problem]]
> - The acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - How NOTEARS is solved? → [[NOTEARS Algorithm]]
> - Empirical comparison of all three? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence classes & CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv. iff same skeleton + v-structures (Verma & Pearl 1990) |
| Constraint-based structure learning | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Recovers CPDAG via CI tests; consistent in high-$d$ sparse graphs |
| Score-based structure learning | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | FES+BES recovers CPDAG asymptotically; BIC score |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Verma-Pearl equivalence theorem (same skeleton + v-structures), PDAG/CPDAG definitions, covered edge reversal, IMAP ordering, Meek's orientation rules R1–R4, why interventions break equivalence.
- [[PC Algorithm]] — CONTAINS: 3 assumptions (Markov, faithfulness, sufficiency), Phase 1 skeleton algorithm (growing CI conditioning sets), Phase 2 v-structure orientation (sepset logic), Phase 3 Meek rules, soundness/completeness theorem, PC-stable (Colombo & Maathuis 2014), high-dim consistency (Kalisch & Bühlmann 2007), comparison table vs GES/NOTEARS, software (pcalg, causal-learn).
- [[GES - Greedy Equivalence Search]] — CONTAINS: score requirements (score-equivalent, decomposable, locally consistent), FES algorithm (insert operator, preconditions), BES algorithm (delete operator from Chickering & Meek Fig. 2), GES pseudocode, Theorem 1 (large-sample correctness), SGES extension (polynomial backward phase), complexity analysis, comparison table vs PC.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / Markov equivalence class**: the canonical output target; appears as the return value of both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]], and as the MEC of the matrix returned by [[NOTEARS - Overview]].
- **Faithfulness + Markov assumptions**: required by all three paradigms (constraint-based, score-based, continuous); see [[PC Algorithm]] §Assumptions.
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering-2002-GES-arxiv-final.pdf]] — Chickering & Meek, *Selective Greedy Equivalence Search: Finding Optimal Bayesian Networks Using a Polynomial Number of Score Evaluations* (Microsoft Research, 2015 expanded arXiv version of Chickering 2002). Covers GES, SGES, CPDAGs, insert/delete operators, and Meek's Conjecture.

## See Also
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, back-door criterion, do-calculus)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — Zeng 2025: summarizing DAGs learned from ABM output (assumes DAG given; structure learning precedes this)
- [[LLM Expert Elicitation for Bayesian Networks]] — after structure is learned (or given), eliciting CPTs
- [[Approximate Bayesian Computation for ABMs]] — ABM output as input to structure learning
