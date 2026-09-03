---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-09-03
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / causal discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous-optimization** (NOTEARS).
> 10 concept notes total.
>
> **Start here:**
> - Want to compare PC, GES, and NOTEARS at a glance? → [[Causal Discovery Methods Comparison]]
> - Need the fundamental output representation (CPDAG)? → [[Markov Equivalence and CPDAGs]]
> - Want the constraint-based framework and assumptions? → [[Constraint-Based Causal Discovery]]
> - Need the PC algorithm steps (pseudocode + consistency)? → [[PC Algorithm]]
> - Need the GES algorithm and score operators? → [[Greedy Equivalence Search]]
> - Want the NOTEARS paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, CPDAG definition | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equivalent iff same skeleton + v-structures (Verma & Pearl 1990) |
| Constraint-based framework + CI test taxonomy | [[Constraint-Based Causal Discovery]] | concept | [[Markov Equivalence and CPDAGs]] | Markov, Faithfulness, Sufficiency + CI-test-agnostic skeleton learning |
| PC algorithm (pseudocode, PC-stable, consistency) | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery]] | Consistent CPDAG recovery under faithfulness; $O(d^{k+2})$ CI tests |
| GES operators + correctness proof | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | BIC-greedily consistent; proves Meek conjecture (Chickering 2002) |
| PC vs. GES vs. NOTEARS decision guide | [[Causal Discovery Methods Comparison]] | concept | [[PC Algorithm]], [[Greedy Equivalence Search]], [[NOTEARS - Overview]] | Practitioner's guide: when each method dominates |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; compares PC, GES, NOTEARS |

## Notes

### Foundational concepts (new — 2026-09-03)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: def. Markov equivalence (Verma & Pearl 1990), skeleton + v-structure characterization theorem, CPDAG definition (compelled vs reversible edges), example of three equivalent DAGs, identifiability limits.
- [[Constraint-Based Causal Discovery]] — CONTAINS: Causal Markov Condition, Faithfulness, Causal Sufficiency definitions; CI test taxonomy (Fisher's z, G², KCI); three-phase structure of constraint-based methods; SGS vs PC complexity comparison.
- [[PC Algorithm]] — CONTAINS: full pseudocode (Phase 1 skeleton, Phase 2 v-structures, Phase 3 Meek R1–R3 rules), complexity theorem $O(d^{k+2})$, consistency theorem (low-dim + high-dim, Kalisch & Bühlmann 2007), PC-stable definition, software table.
- [[Greedy Equivalence Search]] — CONTAINS: BIC score definition, Insert/Delete CPDAG operators with score-change formulas, GES two-phase algorithm pseudocode, consistency theorem (Meek conjecture proof, Chickering 2002), FGES note.
- [[Causal Discovery Methods Comparison]] — CONTAINS: full comparison table (9 properties × 3 methods), per-paradigm decision notes, empirical comparison from [[NOTEARS Experiments]], practitioner decision flowchart, ABM context note.

### NOTEARS cluster (existing — 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class / CPDAG**: the identifiable object from observational data; defined in [[Markov Equivalence and CPDAGs]], used as output by [[PC Algorithm]] and [[Greedy Equivalence Search]].
- **Faithfulness assumption**: required by all three paradigms; defined in [[Constraint-Based Causal Discovery]], invoked in [[PC Algorithm#thm-consistency]], [[Greedy Equivalence Search#thm-ges-consistency]], and [[DAG Structure Learning Problem]].
- **BIC score**: the canonical consistent score for GES; defined in [[Greedy Equivalence Search#def-bic-score]]; invoked in [[DAG Structure Learning Problem]] (Program 4 landscape table).
- **Linear SEM / weighted adjacency matrix $W$**: the NOTEARS estimation target; defined in [[DAG Structure Learning Problem]]; not used by PC or GES (which are model-agnostic for the structure).
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/spirtes2000-SGS-reference.md]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd Ed. MIT Press. Free PDF: https://www.cs.cmu.edu/~scheines/pubs/cps2.pdf (network access blocked in ingest session; reference stub created).
- [[raw/chickering02b-GES-reference.md]] — Chickering (2002), "Optimal Structure Identification with Greedy Search," *JMLR* 3, 507–554. Free PDF: https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf (network access blocked; reference stub).
- [[raw/kalisch07a-PC-highdim-reference.md]] — Kalisch & Bühlmann (2007), "Estimating High-Dimensional DAGs with the PC-Algorithm," *JMLR* 8, 613–636. Free PDF: https://jmlr.org/papers/volume8/kalisch07a/kalisch07a.pdf (network access blocked; reference stub).
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — applying structure learning to ABM simulation output
- [[Directed Acyclic Graphs]] — DAG d-separation and back-door criterion
