---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-07-07
concept_count: 9
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are covered:
> **continuous optimization** (NOTEARS, Zheng et al. 2018), **constraint-based** (PC algorithm,
> Spirtes & Glymour 1991), and **score-based** (GES, Chickering 2002). 9 notes total.
>
> - Want the continuous-optimization approach? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness)? → [[DAG Structure Learning Problem]]
> - Need **the NOTEARS key theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$, acyclicity)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization algorithm? → [[NOTEARS Algorithm]]
> - Need NOTEARS empirical results (vs PC, GES, FGS)? → [[NOTEARS Experiments]]
> - Need to understand what all algorithms output (MEC, CPDAG)? → [[Markov Equivalence Classes and CPDAGs]]
> - Need the constraint-based PC algorithm? → [[PC Algorithm]]
> - Need the score-based GES algorithm (Chickering 2002 consistency)? → [[Greedy Equivalence Search (GES)]]
> - Need to choose between PC / GES / NOTEARS for your problem? → [[Causal Discovery Algorithms Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Acyclicity gradient | [[Smooth Characterization of Acyclicity]] | theorem | — | $\nabla h(W)=(e^{W\circ W})^T\circ 2W$ |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Hard thresholding | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | Round $|w|<\omega$ to 0 |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS/PC/GES on dense/large graphs; ≈ global optimum |
| Markov equivalence + CPDAGs | [[Markov Equivalence Classes and CPDAGs]] | concept | [[DAG Structure Learning Problem]], [[Directed Acyclic Graphs]] | Two DAGs equiv. iff same skeleton + v-structures (Verma–Pearl) |
| Meek's orientation rules | [[Markov Equivalence Classes and CPDAGs]] | theorem | — | 4 rules propagate all compelled orientations |
| Constraint-based skeleton + orientation | [[PC Algorithm]] | concept | [[Markov Equivalence Classes and CPDAGs]] | Oracle consistency (SGS 2000); PC-stable removes order-dependence |
| Score-based MEC navigation | [[Greedy Equivalence Search (GES)]] | concept | [[Markov Equivalence Classes and CPDAGs]] | GES consistent under locally-consistent score (Chickering 2002) |
| Paradigm comparison + practical guidance | [[Causal Discovery Algorithms Comparison]] | concept | [[PC Algorithm]], [[Greedy Equivalence Search (GES)]], [[NOTEARS - Overview]] | PC for sparse/transparent; GES for Gaussian/large-n; NOTEARS for speed/differentiability |

## Notes

- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods (exact / local / order / constraint / hybrid).
- [[Smooth Characterization of Acyclicity]] — CONTAINS: desiderata (a)–(d), **Prop. 1** (infinite series $\mathrm{tr}(I-B)^{-1}=d$), **Prop. 2** (matrix exp $\mathrm{tr}\,e^B=d$), **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$ + gradient), sign-cancellation example, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent + **Prop. 3** (linear convergence), L-BFGS / proximal quasi-Newton subproblem solve with soft-threshold closed form, thresholding, **Algorithm 1** full pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs FGS/PC/GES (Fig. 3), Table 1 global-optimum comparison, Sachs real-data result, limitations & future work.
- [[Markov Equivalence Classes and CPDAGs]] — CONTAINS: Causal Markov condition, Faithfulness, Verma–Pearl characterisation theorem (same skeleton + v-structures), CPDAG definition (directed = compelled, undirected = reversible), Meek's 4 orientation rules (with formal statements), identifiability limits, two worked examples.
- [[PC Algorithm]] — CONTAINS: PC setup (Markov + Faithfulness + causal sufficiency), skeleton learning pseudocode (CI test loop, conditioning sets from adjacents), CI test choices (Fisher Z, KCIT, $\chi^2$), v-structure orientation rule, PC-stable modification (Colombo & Maathuis 2014), oracle consistency theorem (SGS 2000), worked 4-variable example.
- [[Greedy Equivalence Search (GES)]] — CONTAINS: decomposable + locally consistent score definitions, BIC formula, Insert and Delete operators (Chickering 2002 Defs 12 & 14), two-phase algorithm (forward Insert + backward Delete), Chickering consistency theorem (Theorem 15) + proof strategy, BIC score change formula, FGES description, two worked examples.
- [[Causal Discovery Algorithms Comparison]] — CONTAINS: full comparison table (paradigm, output, guarantees, assumptions, scalability, software), decision guide (when to use each), shared faithfulness requirement, software code snippets (pcalg R, causal-learn Python), SHD/FDR/FPR evaluation metrics.

## Cross-Cutting Concepts
- **Linear SEM / weighted adjacency matrix $W$**: defined in [[DAG Structure Learning Problem]], used as NOTEARS's estimation target, and the implicit model underlying GES's BIC score.
- **Matrix exponential $e^{W\circ W}$**: the engine of both the NOTEARS constraint ([[Smooth Characterization of Acyclicity]]) and its $O(d^3)$ cost ([[NOTEARS Algorithm]], [[NOTEARS Experiments]]).
- **Markov Equivalence Class (MEC) / CPDAG**: the identifiable target for all three paradigms; defined in [[Markov Equivalence Classes and CPDAGs]], output by [[PC Algorithm]] and [[Greedy Equivalence Search (GES)]], and the comparison target for [[NOTEARS Experiments]].
- **Faithfulness assumption**: required by all three paradigms; without it, CI tests are misleading (PC), BIC is inconsistent (GES), and NOTEARS has wrong-graph local optima.
- **Nonconvexity / stationary points**: introduced in [[Smooth Characterization of Acyclicity]], handled in [[NOTEARS Algorithm]], empirically assessed in [[NOTEARS Experiments]]; GES avoids this by searching CPDAGs directly.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS: Continuous Optimization for Structure Learning*, NeurIPS 2018 (arXiv:1803.01422). Code: <https://github.com/xunzheng/notears>.
- [[raw/PC-GES-CausalDiscovery-Survey.md]] — Synthesis survey covering Spirtes, Glymour & Scheines (2000), Chickering (2002) JMLR, and Colombo & Maathuis (2014) JMLR, compiled 2026-07-07.

## See Also
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus (causal DAG semantics)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference (fork/pipe/collider)
- [[Summary Causal DAGs]] — downstream: summarizing/reducing a learned DAG structure
- [[LLM Expert Elicitation for Bayesian Networks]] — alternative: expert-elicited DAG construction
- [[BN Construction Methods Comparison]] — broader BN construction landscape
- [[Approximate Bayesian Computation for ABMs]] — upstream to structure learning on ABM outputs
