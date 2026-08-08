---
title: "Index: Causal Discovery"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-08-08
concept_count: 8
---

# Causal Discovery

> [!abstract] Routing Summary
> This folder covers **causal structure learning / discovery** — learning the structure of
> directed acyclic graphs (DAGs / Bayesian networks) from data. Three paradigms are now covered:
> **constraint-based** (PC algorithm), **score-based** (GES), and **continuous optimization**
> (NOTEARS). The shared output object — the CPDAG — is documented in a dedicated foundation note.
>
> - Need the shared foundation (Markov equivalence, CPDAG, Meek rules)? → [[Markov Equivalence and CPDAGs]]
> - Need the **constraint-based** approach (CI tests, skeleton, v-structures)? → [[PC Algorithm]]
> - Need the **score-based** approach (BIC score, Insert/Delete operators, FES/BES)? → [[Greedy Equivalence Search]]
> - Need the **continuous-optimization** approach (NOTEARS paper in one page)? → [[NOTEARS - Overview]]
> - Need the problem setup (SEM, score functions, NP-hardness, landscape)? → [[DAG Structure Learning Problem]]
> - Need **the key NOTEARS theorem** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$)? → [[Smooth Characterization of Acyclicity]]
> - Need the NOTEARS optimization (augmented Lagrangian, L-BFGS)? → [[NOTEARS Algorithm]]
> - Need empirical results (vs GES/FGS, SHD/FDR, Sachs data)? → [[NOTEARS Experiments]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Markov equivalence + CPDAG | [[Markov Equivalence and CPDAGs]] | concept | [[Directed Acyclic Graphs]] | Two DAGs ≡ iff same skeleton + same v-structures (Verma & Pearl) |
| Faithfulness assumption | [[Markov Equivalence and CPDAGs]] | concept | — | CI in $P$ ↔ d-sep in $G^*$ |
| Meek orientation rules (R1–R4) | [[Markov Equivalence and CPDAGs]] | theorem | — | Exhaustive propagation → CPDAG |
| PC Algorithm (constraint-based) | [[PC Algorithm]] | concept | [[Markov Equivalence and CPDAGs]] | CI tests on increasing $\|S\|$; skeleton + v-structures + Meek |
| Fisher's Z CI test | [[PC Algorithm]] | definition | — | $z = \tfrac{1}{2}\ln\tfrac{1+r_{xy\cdot S}}{1-r_{xy\cdot S}}$ |
| PC consistency theorem | [[PC Algorithm]] | theorem | [[Markov Equivalence and CPDAGs]] | $P(\hat{\mathcal{C}}_n = \mathcal{C}^*) \to 1$ |
| GES / Greedy Equivalence Search | [[Greedy Equivalence Search]] | concept | [[Markov Equivalence and CPDAGs]] | Two-phase greedy search in CPDAG space |
| BIC decomposable score | [[Greedy Equivalence Search]] | definition | — | $\text{BIC}=\sum_i \log \hat{P}(X_i\|\text{Pa}_i) - \tfrac{k_i}{2}\log n$ |
| Insert / Delete / Turn operators | [[Greedy Equivalence Search]] | definition | [[Markov Equivalence and CPDAGs]] | Each transforms CPDAG → adjacent CPDAG |
| GES consistency (Chickering, 2002) | [[Greedy Equivalence Search]] | theorem | [[Markov Equivalence and CPDAGs]] | $P(\hat{\mathcal{C}} = \mathcal{C}^*) \to 1$ via Meek Conjecture proof |
| Continuous reformulation of DAG learning | [[NOTEARS - Overview]] | overview | [[DAG Structure Learning Problem]] | Combinatorial → continuous program |
| Linear SEM + LS score | [[DAG Structure Learning Problem]] | concept | [[Confirmatory Factor Analysis and SEM]] | $F(W)=\frac{1}{2n}\lVert X-XW\rVert_F^2+\lambda\lVert W\rVert_1$ |
| Matrix-exponential acyclicity | [[Smooth Characterization of Acyclicity]] | theorem | [[DAG Structure Learning Problem]] | $h(W)=\mathrm{tr}\,e^{W\circ W}-d=0 \iff$ DAG |
| Augmented-Lagrangian ECP | [[NOTEARS Algorithm]] | concept | [[Smooth Characterization of Acyclicity]] | $\min_W F(W)$ s.t. $h(W)=0$; <10 dual steps |
| Structure-recovery benchmarks | [[NOTEARS Experiments]] | example | [[NOTEARS Algorithm]] | Beats FGS on dense/large graphs; ≈ global optimum |

## Notes

### Shared Foundation (new 2026-08-08)
- [[Markov Equivalence and CPDAGs]] — CONTAINS: Causal Markov condition, d-separation, Verma-Pearl theorem (same skeleton + same v-structures ↔ MEC), CPDAG/essential graph definition, compelled vs. reversible edges, faithfulness assumption, Meek's four orientation rules (R1–R4), why observational data identifies CPDAG but not DAG.

### Constraint-Based: PC Algorithm (new 2026-08-08)
- [[PC Algorithm]] — CONTAINS: three phases (skeleton learning → v-structure orientation → Meek propagation), PC Skeleton algorithm pseudocode, v-structure orientation rule (Sep sets), Fisher's Z CI test, CI test comparison table (Gaussian/discrete/nonparametric), PC consistency theorem (Spirtes et al. 2000), FCI extension (hidden variables), complexity $O(d^{q+2})$ for max degree $q$, practical limitations (order-dependence, multiple testing, density sensitivity), PC-stable variant.

### Score-Based: GES (new 2026-08-08)
- [[Greedy Equivalence Search]] — CONTAINS: decomposable score definition, BIC score formula, BDe score (discrete data), Insert/Delete/Turn operator definitions (Chickering 2002), FES phase pseudocode, BES phase pseudocode, GES consistency theorem (Meek Conjecture proof sketch), score-change formulae (local computation), complexity $O(d^3 \cdot 2^q)$, PC vs GES vs NOTEARS comparison table, software references (causal-learn, pcalg R).

### Continuous Optimization: NOTEARS
- [[NOTEARS - Overview]] — CONTAINS: research question, the 4 contributions, NOTEARS acronym, undirected-GM analogy, lineage.
- [[DAG Structure Learning Problem]] — CONTAINS: Defs (data/SEM, induced graph $\mathsf{G}(W)$, linear SEM, LS score $F$), Programs (3) & (4), NP-hardness, landscape table of prior methods.
- [[Smooth Characterization of Acyclicity]] — CONTAINS: **Theorem 1** ($h(W)=\mathrm{tr}\,e^{W\circ W}-d$), gradient, proofs.
- [[NOTEARS Algorithm]] — CONTAINS: ECP (9), augmented Lagrangian $L^\rho$, dual ascent, L-BFGS subproblem, **Algorithm 1** pseudocode.
- [[NOTEARS Experiments]] — CONTAINS: ER/SF + Gauss/Exp/Gumbel design, SHD/FDR vs GES/FGS, Sachs real-data result, limitations.

## Cross-Cutting Concepts
- **CPDAG / Markov Equivalence Class**: the common output object of PC and GES; the structure that observational data can identify. [[Markov Equivalence and CPDAGs]] is the foundation; [[PC Algorithm]] and [[Greedy Equivalence Search]] both produce it.
- **Faithfulness assumption**: required by PC (for CI tests to reveal skeleton) and GES (for score consistency). Defined in [[Markov Equivalence and CPDAGs#^def-faithfulness]]; motivates why structure learning cannot always recover the true DAG.
- **Linear SEM / weighted adjacency matrix $W$**: NOTEARS's model; appears in [[DAG Structure Learning Problem]] (definition) and threads through every NOTEARS note. PC and GES are model-agnostic (work for any distribution under CMC + faithfulness).
- **Nonparametric causal sufficiency vs. hidden variables**: PC/GES assume causal sufficiency; FCI and RFCI relax this. NOTEARS does not address hidden variables. [[Directed Acyclic Graphs]] covers the causal-inference implications.

## Sources
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng, Aragam, Ravikumar & Xing, *DAGs with NO TEARS*, NeurIPS 2018.
- [[raw/sources-constraint-and-score-based-causal-discovery.md]] — Reference list for PC and GES notes: Spirtes, Glymour & Scheines (2000); Chickering (2002) JMLR; Verma & Pearl (1990); Meek (1995). PDFs freely available online (JMLR open-access; CMU servers) but not downloadable in this session due to proxy restrictions.

## See Also
- [[Directed Acyclic Graphs]] — d-separation and causal DAG semantics (back-door, front-door)
- [[Confirmatory Factor Analysis and SEM]] — structural equation models in the Bayesian setting
- [[Spurious Association and Confounds]] — DAG semantics for causal inference
- [[Nonparametric Causal Inference]] — related causal-modeling material
- [[Summary Causal DAGs]] — DAG summarization (upstream of structure learning)
