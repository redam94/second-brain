---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-12
concept_count: 10
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from observational data. Two paradigms:
> **constraint-based** (PC algorithm: tests conditional independence to learn edges) and
> **score-based** (GES: greedily improves a decomposable score). A third approach, **continuous
> optimization** (NOTEARS), recasts DAG learning as a smooth program. All three target the CPDAG.
>
> **Jump to:**
> - Problem setup (SEM, acyclicity, NP-hardness)? → [[DAG Structure Learning Problem]]
> - What is a CPDAG / Markov equivalence? → [[Markov Equivalence and CPDAGs]]
> - General framework of CI-based discovery? → [[Constraint-Based Causal Discovery]]
> - The PC algorithm (full pseudocode)? → [[PC Algorithm]]
> - Which CI test to use in PC? → [[Conditional Independence Tests for Structure Learning]]
> - Score-based discovery (BIC/BGe search)? → [[Greedy Equivalence Search (GES)]]
> - NOTEARS (continuous optimization overview)? → [[NOTEARS - Overview]]
> - NOTEARS acyclicity theorem ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - NOTEARS optimization (augmented Lagrangian, Algorithm 1)? → [[NOTEARS Algorithm]]
> - NOTEARS empirical results (vs PC, FGS)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence / CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures ↔ equivalent |
| Meek orientation rules | [[Markov Equivalence and CPDAGs]] | theorem | — | R1–R4 propagate orientations to CPDAG |
| Constraint-based framework | [[Constraint-Based Causal Discovery]] | concept | [[Markov Equivalence and CPDAGs]] | CI = d-separation → CPDAG identifiable |
| PC algorithm | [[PC Algorithm]] | concept | [[Constraint-Based Causal Discovery]] | Oracle consistent; $O(d^{k+2})$ tests |
| CI test choice | [[Conditional Independence Tests for Structure Learning]] | concept | [[Constraint-Based Causal Discovery]] | Fisher-Z / $G^2$ / KCIT |
| GES (score-based search) | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence and CPDAGs]] | Chickering Thm 15: asymptotically optimal |
| Continuous reformulation | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS/PC/GES on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-Based and Score-Based Discovery (added 2026-07-12)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov condition, faithfulness, Verma-Pearl theorem (skeleton+v-structures), CPDAG definition, covered edge reversals (Chickering 1995 Thm), Meek orientation rules R1–R4, identifiability limits.
- [[Constraint-Based Causal Discovery]] — CONTAINS: CI→d-separation duality, three-phase structure (skeleton/v-structure/Meek), skeleton theorem, v-structure orientation rule, FCI extension (hidden confounders), faithfulness violations (Conservative PC), complexity $O(d^{k+2})$.
- [[PC Algorithm]] — CONTAINS: full pseudocode (Algorithm PC), Phase 1 skeleton loop (subset search), Phase 2 v-structure orientation, Phase 3 Meek propagation, oracle correctness theorem (Spirtes et al. Thm 5.1), PC-stable / Conservative PC variants, Fisher-Z, $G^2$, KCIT options, comparison table vs GES vs NOTEARS.
- [[Conditional Independence Tests for Structure Learning]] — CONTAINS: Fisher-Z test (partial correlation, Z-transform, calibration), $G^2$ chi-squared test (discrete data), KCIT kernel test (Zhang et al. 2011, HSIC-based), comparison table (data type, assumptions, cost per test), multiple-testing correction in PC.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: BIC and BGe scores, score equivalence definition, GES two-phase pseudocode (FES + BES), Insert/Delete operator definitions, Chickering Theorem 15 (oracle consistency), GES vs PC comparison table, FGES (Ramsey 2017 speedup), R `pcalg::ges()` code example.

### NOTEARS (continuous optimization, added 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **CPDAG / Markov equivalence class**: the common output of PC and GES; the best identifiable from observational data alone — [[Markov Equivalence and CPDAGs]], [[PC Algorithm]], [[Greedy Equivalence Search (GES)]].
- **Faithfulness assumption**: required by both PC and GES; can be violated by coefficient cancellations — [[Constraint-Based Causal Discovery]], [[Markov Equivalence and CPDAGs]].
- **Computational complexity $O(d^{k+2})$**: shared by PC (CI tests) and GES (score evaluations) for graphs with max degree $k$ — [[PC Algorithm]], [[Greedy Equivalence Search (GES)]].
- **Linear SEM / weighted adjacency matrix $W$**: the NOTEARS object of estimation; connects to the SEM background in [[DAG Structure Learning Problem]] and [[Confirmatory Factor Analysis and SEM]].
- **Matrix exponential $e^{W\circ W}$**: the engine of NOTEARS — [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].

## Sources
- [[raw/spirtes-glymour-scheines-2000-PC-algorithm.md]] — Synthesis survey of Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search* (MIT Press, 2nd Ed.) and Spirtes & Glymour (1991); direct PDF download blocked by session network policy.
- [[raw/chickering-2002-GES-JMLR.md]] — Synthesis survey of Chickering (2002) "Optimal Structure Identification with Greedy Search," *JMLR* 3:507–554 (open access: jmlr.org/papers/v3/chickering02b); direct download blocked by session network policy.
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Directed Acyclic Graphs]] — DAG formalism, d-separation, back-door criterion
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[BN Construction Methods Comparison]] — broader Bayesian network structure comparison
- [[Summary Causal DAGs]] — DAG summarization methods that assume the DAG is given
