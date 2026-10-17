---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-17
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS).
> 9 concept notes across 3 families.
>
> **Constraint-based (PC family)**
> - Need the equivalence theory (CPDAGs, v-structures, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - Need the CI test engine (Fisher's Z, high-dimensional consistency)? → [[Conditional Independence Testing]]
> - Need the full PC algorithm (skeleton + v-structures + Meek)? → [[PC Algorithm]]
>
> **Score-based (GES family)**
> - Need the GES algorithm (Chickering 2002, insert/delete operators, two phases)? → [[GES - Greedy Equivalence Search]]
>
> **Continuous optimization (NOTEARS family)**
> - Want the paper in one page? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence (skeleton + v-structures) | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv iff same skeleton + v-structures (Verma–Pearl) |
| CPDAG / essential graph | [[Markov Equivalence and CPDAGs]] | definition | — | Directed edges = identified; undirected = ambiguous |
| Meek orientation rules | [[Markov Equivalence and CPDAGs]] | theorem | — | R1–R4 complete the CPDAG from skeleton + v-structures |
| Meek conjecture (covered edge reversals) | [[Markov Equivalence and CPDAGs]] | theorem | — | Proved by Chickering 2002; key lemma for GES |
| Fisher's Z CI test | [[Conditional Independence Testing]] | theorem | [[Markov Equivalence and CPDAGs]] | $\sqrt{n-\lvert S\rvert-3} \cdot Z_{XY\cdot S} \sim \mathcal{N}(0,1)$ under $H_0$ |
| High-dim PC consistency | [[Conditional Independence Testing]] | theorem | — | PC consistent when $d=O(n^a)$, degree $= O(\log n)$ (Kalisch & Bühlmann 2007) |
| PC skeleton discovery (FAS) | [[PC Algorithm]] | concept | [[Conditional Independence Testing]] | Remove $X-Y$ if $X \perp\!\!\!\perp Y \mid S$ for some $S \subseteq \mathrm{adj}(X)$ |
| PC v-structure + Meek orientation | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Orient $X \to Z \leftarrow Y$ iff $Z \notin \mathrm{sep}(X,Y)$ |
| GES Insert/Delete operators | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Single-edge moves on CPDAG space with $\Delta$BIC score |
| GES two-phase search | [[GES - Greedy Equivalence Search]] | concept | [[DAG Structure Learning Problem]] | Forward (add) + Backward (prune); consistent under faithfulness |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-based and equivalence theory (added 2026-10-17)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Verma–Pearl theorem, CPDAG definition, v-structure definition, Meek's R1–R4 orientation rules, Meek conjecture (Chickering 2002 proof), CPDAG example for chain/fork.
- [[Conditional Independence Testing]] — CONTAINS: partial correlation definition, Fisher's Z test theorem, high-dimensional PC consistency theorem (Kalisch & Bühlmann 2007), KCI test definition, G-test for discrete data, PC-stable order-independence issue.
- [[PC Algorithm]] — CONTAINS: causal sufficiency + faithfulness assumptions, FAS skeleton algorithm (pseudocode), v-structure orientation algorithm, Meek-rules Phase 3, consistency theorem (Spirtes et al. + Kalisch & Bühlmann), three-variable worked example.
- [[GES - Greedy Equivalence Search]] — CONTAINS: Insert operator definition, Delete operator definition, BIC/BDe score functions, GES two-phase algorithm (pseudocode), GES consistency theorem (Chickering 2002 Thm. 15), PC vs GES comparison table, three-variable worked example.

### NOTEARS family (added 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence class / CPDAG**: the correct output of any observational causal discovery algorithm; appears in [[Markov Equivalence and CPDAGs]] (theory) and as the target of both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]].
- **Faithfulness assumption**: required by both PC and GES for consistency; mentioned in [[DAG Structure Learning Problem]] and [[Directed Acyclic Graphs]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/SOURCE-spirtes-glymour-scheines-2000-CPS.txt]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd Ed., MIT Press. (Source stub; PDF download proxy-blocked.)
- [[raw/SOURCE-chickering02b-GES-JMLR.txt]] — Chickering (2002), "Optimal Structure Identification With Greedy Search," *JMLR* 3:507-554. (Source stub; PDF download proxy-blocked.)
- [[raw/SOURCE-kalisch-buhlmann-2007-PC-highdim.txt]] — Kalisch & Bühlmann (2007), "Estimating high-dimensional directed acyclic graphs with the PC-algorithm," *JMLR* 8:613-636. (Source stub; PDF download proxy-blocked.)

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, DAG reasoning
- [[Summary Causal DAGs]] — DAG summarization (assumes DAG is given; PC/GES are what precede it)
- [[LLM Expert Elicitation for Bayesian Networks]] — eliciting structure from experts (complement to data-driven PC/GES)
