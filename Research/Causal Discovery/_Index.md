---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-10-19
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic paradigms:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization** (NOTEARS). 9 concept notes.
> - Understand the target output first? → [[CPDAG and Markov Equivalence]]
> - Want the PC algorithm? → [[PC Algorithm]] (constraint-based, CI tests)
> - What CI tests does PC use? → [[Conditional Independence Testing for Causal Discovery]]
> - Want the GES algorithm? → [[Greedy Equivalence Search (GES)]] (score-based)
> - Want NOTEARS (continuous optimization)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, thresholding, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[CPDAG and Markov Equivalence]] | concept | [[DAG Structure Learning Problem]] | Two DAGs equiv iff same skeleton + v-structures |
| Meek orientation rules R1–R4 | [[CPDAG and Markov Equivalence]] | theorem | [[Directed Acyclic Graphs]] | Exhaustive rules yield unique CPDAG |
| PC algorithm — skeleton phase | [[PC Algorithm]] | concept | [[CPDAG and Markov Equivalence]] | Remove edges via CI tests, increasing conditioning set size |
| PC algorithm — orientation phase | [[PC Algorithm]] | concept | [[Conditional Independence Testing for Causal Discovery]] | V-structures + Meek rules → CPDAG |
| PC-stable high-dim consistency | [[PC Algorithm]] | theorem | [[PC Algorithm]] | $q_{\max}^4 \log d = o(n)$ → uniform consistency |
| Fisher's Z partial correlation test | [[Conditional Independence Testing for Causal Discovery]] | theorem | [[CPDAG and Markov Equivalence]] | $Z_{ij\|S} \sim \mathcal{N}(0,1)$ under $H_0$ |
| G-squared / HSIC / KCIT | [[Conditional Independence Testing for Causal Discovery]] | concept | — | Tests for discrete / non-parametric CI |
| GES — Forward phase (FES) | [[Greedy Equivalence Search (GES)]] | concept | [[CPDAG and Markov Equivalence]] | Insert operators, local BIC scoring |
| GES — Backward phase (BES) | [[Greedy Equivalence Search (GES)]] | concept | [[Greedy Equivalence Search (GES)]] | Delete operators prune to perfect map |
| Meek Conjecture + GES consistency | [[Greedy Equivalence Search (GES)]] | theorem | [[CPDAG and Markov Equivalence]] | GES returns true CPDAG in large-sample limit |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Constraint-based and Score-based (new 2026-10-19)
- [[CPDAG and Markov Equivalence]] — CONTAINS: Markov property def, faithfulness def, Markov equivalence theorem (same skeleton + v-structures), CPDAG def (compelled vs reversible edges), Meek rules R1–R4, 3-node example.
- [[PC Algorithm]] — CONTAINS: Phase I skeleton algorithm (pseudocode, PC-stable variant), Phase II v-structure rule + Meek rules, consistency theorem (fixed-$d$ and high-dim Kalisch & Bühlmann 2007), runtime analysis.
- [[Conditional Independence Testing for Causal Discovery]] — CONTAINS: partial correlation def, Fisher's Z-test theorem, G-squared test, HSIC def, KCIT, comparison table (test × data type), $\alpha$ as tuning parameter, multiple testing issue.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: BIC and BDeu score defs, FES algorithm (Insert operator, local scoring lemma), BES algorithm (Delete operator), Meek Conjecture theorem, GES consistency theorem, runtime, GES vs PC at finite $n$ example.

### NOTEARS (continuous optimization, 2026-06-17)
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation; appears in [[DAG Structure Learning Problem]] (definition) and threads through every note.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/chickering2002-GES-reference.md]] — Chickering (2002), *Optimal Structure Identification With Greedy Search*, JMLR v3 pp. 507–554. GES algorithm + Meek Conjecture proof.
- [[raw/spirtes-glymour-scheines-2000-CPS-reference.md]] — Spirtes, Glymour & Scheines (2000), *Causation, Prediction, and Search*, 2nd Ed., MIT Press. PC algorithm, FCI algorithm, faithfulness. Also: Kalisch & Bühlmann (2007), JMLR v8, PC-stable + high-dim consistency.

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
