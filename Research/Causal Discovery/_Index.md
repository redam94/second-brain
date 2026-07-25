---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-25
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic families are
> now covered: **NOTEARS** (continuous optimisation), **PC** (constraint-based CI testing),
> and **GES** (score-based greedy CPDAG search). 9 concept notes.
>
> **By algorithm family:**
> - NOTEARS (continuous optimisation): [[NOTEARS - Overview]] → [[DAG Structure Learning Problem]] → [[Smooth Characterization of Acyclicity]] → [[NOTEARS Algorithm]] → [[NOTEARS Experiments]]
> - PC algorithm (constraint-based): [[Markov Equivalence Classes and CPDAGs]] → [[Conditional Independence Tests for Causal Discovery]] → [[PC Algorithm]]
> - GES (score-based): [[Markov Equivalence Classes and CPDAGs]] → [[GES - Greedy Equivalence Search]]
>
> **By question:**
> - What *is* a DAG equivalence class? → [[Markov Equivalence Classes and CPDAGs]]
> - How does PC work step-by-step? → [[PC Algorithm]]
> - What CI test does PC use? → [[Conditional Independence Tests for Causal Discovery]]
> - How does GES search CPDAG space? → [[GES - Greedy Equivalence Search]]
> - How does NOTEARS reformulate the combinatorial problem? → [[Smooth Characterization of Acyclicity]]
> - How do the three families compare? → [[GES - Greedy Equivalence Search#Connections]] and [[PC Algorithm#Connections]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Same skeleton + v-structures $\iff$ Markov equivalent; CPDAG = unique representative |
| CI tests (Fisher $Z$, $G^2$, KCIT) | [[Conditional Independence Tests for Causal Discovery]] | concept | [[Markov Equivalence Classes and CPDAGs]] | $T = \sqrt{n-|\mathbf{Z}|-3}\cdot Z \sim \mathcal{N}(0,1)$ under $H_0$ |
| PC algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Conditional Independence Tests for Causal Discovery]] | Recover CPDAG via CI tests + Meek rules; consistent under faithfulness |
| GES — Forward + Backward phase | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Meek conjecture proven: FES+BES recovers true CPDAG in limit |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Verma-Pearl theorem (same skeleton + v-structures ↔ Markov equivalence), CPDAG definition (Andersson et al. 1997), Meek rules R1–R4, identifiability ceiling, three-variable examples.
- [[Conditional Independence Tests for Causal Discovery]] — CONTAINS: Fisher $Z$ test (partial correlation, $\mathcal{N}(0,1)$ statistic), $G^2$ discrete test, KCIT kernel test, role of $\alpha$, multiple testing challenge.
- [[PC Algorithm]] — CONTAINS: all four assumptions (Markov, faithfulness, causal sufficiency, consistent CI test), Phase 1 skeleton construction pseudocode, Phase 2 v-structure orientation, Phase 3 Meek rules, consistency theorem, PC-stable (order-independence fix), FCI for hidden variables.
- [[GES - Greedy Equivalence Search]] — CONTAINS: score decomposability (Def.), FES insert operator (def., clique condition), BES delete operator, BIC score formula, Theorem 15 (Meek conjecture), FGES cached implementation, PC vs. GES comparison table.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation in NOTEARS; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **CPDAG / equivalence class**: the output of both PC and GES; the maximum identifiable object from observational data. Defined in [[Markov Equivalence Classes and CPDAGs]], output by [[PC Algorithm]] and [[GES - Greedy Equivalence Search]].
- **Faithfulness assumption**: required by all three families for consistency. Untestable from data; near-violations cause failures in finite samples across PC, GES, and NOTEARS.
- **Score vs. CI duality**: GES score differences (BIC) correspond to Fisher $Z$ CI statistics for Gaussian data — the two paradigms are asymptotically equivalent.
- **Matrix exponential $e^{W\circ W}$**: the engine of NOTEARS's acyclicity constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/survey-PC-algorithm-constraint-based-causal-discovery.md]] — Synthesis survey: Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search*; Spirtes (2010) JMLR v11; Meek (1995) UAI; Colombo & Maathuis (2014) JMLR v15. PDFs blocked by session network policy.
- [[raw/survey-GES-chickering2002-greedy-equivalence-search.md]] — Synthesis survey: Chickering (2002) *Optimal Structure Identification With Greedy Search*, JMLR v3. PDF blocked by session network policy.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to algorithmic structure learning
- [[BN Construction Methods Comparison]] — overview of BN structure methods (includes expert elicitation, search algorithms)
