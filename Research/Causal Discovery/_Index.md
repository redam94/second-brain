---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-11-08
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three algorithmic families
> are now covered: **NOTEARS** (continuous optimization), **PC** (constraint-based CI testing),
> and **GES** (score-based CPDAG search). 8 concept notes.
> - **Foundation:** Markov equivalence, CPDAGs, Meek's rules → [[Markov Equivalence and CPDAGs]]
> - **Constraint-based:** PC algorithm (skeleton + v-structures + Meek) → [[PC Algorithm]]
> - **Score-based:** GES / FGS (Insert/Delete in CPDAG space; Meek conjecture) → [[GES - Greedy Equivalence Search]]
> - **Continuous optimization:** NOTEARS overview → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the optimization (augmented Lagrangian, L-BFGS, Algorithm 1)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs FGS, PC, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence, v-structures, CPDAGs | [[Markov Equivalence and CPDAGs]] | concept | [[DAG Structure Learning Problem]] | Two DAGs are MEC iff same skeleton + v-structures (Verma & Pearl 1990) |
| Meek's four orientation rules | [[Markov Equivalence and CPDAGs]] | concept | — | R1–R4 propagate orientations to full CPDAG |
| PC skeleton recovery + CI tests | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | Incrementally tests CI for increasing conditioning-set size |
| PC v-structure orientation | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | $X_k \notin \text{SepSet}(X_i,X_j)$ → v-structure |
| GES Insert/Delete operators | [[GES - Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Local CPDAG operators preserving validity |
| GES consistency + Meek Conjecture | [[GES - Greedy Equivalence Search]] | theorem | [[Markov Equivalence and CPDAGs]] | GES → true CPDAG under faithfulness (Chickering 2002, Thm 15) |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

- [[Markov Equivalence and CPDAGs]] — CONTAINS: Markov condition, Verma-Pearl characterization (skeleton + v-structures), CPDAG definition (compelled vs reversible edges), Meek's four orientation rules (R1–R4), faithfulness definition, MEC example.
- [[PC Algorithm]] — CONTAINS: Phase 1 skeleton recovery (incrementing conditioning-set size; CI tests), Phase 2 v-structure orientation (SepSet criterion), Phase 3 Meek rules, consistency theorem, CI test options (Fisher z, χ², KCIT), PC-stable (Colombo & Maathuis 2014), limitations (exponential worst case, faithfulness, latent variables).
- [[GES - Greedy Equivalence Search]] — CONTAINS: decomposable scoring criterion, Insert operator, Delete operator, full two-phase GES algorithm (FES + BES), I-map definition, Meek Conjecture proof (Chickering 2002 Thm 15), GES consistency theorem, PC vs GES comparison table, FGS note.
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.

## Cross-Cutting Concepts
- **Markov equivalence / CPDAG**: the fundamental identification boundary — all three algorithms (PC, GES, NOTEARS) are evaluated on CPDAG metrics. See [[Markov Equivalence and CPDAGs]].
- **Faithfulness assumption**: required by both PC and GES for consistency; not required by NOTEARS. Appears in [[PC Algorithm]], [[GES - Greedy Equivalence Search]], [[Markov Equivalence and CPDAGs]].
- **Linear SEM / weighted adjacency matrix $W$**: the object of estimation for NOTEARS; appears in [[DAG Structure Learning Problem]] and threads through [[NOTEARS - Overview]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]].
- **Matrix exponential $e^{W\circ W}$**: the engine of both the constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]].

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed., MIT Press (PC algorithm, Chs. 5–6). PDF not downloaded — network restricted.
- Chickering (2002) — "Optimal structure identification with greedy search," *JMLR* 3:507–554 (GES + Meek Conjecture proof). PDF not downloaded — network restricted.
- Verma & Pearl (1990); Frydenberg (1990); Meek (1995) — Markov equivalence characterization + orientation rules (see [[Markov Equivalence and CPDAGs]]).

## See Also
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
