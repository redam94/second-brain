---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-ges.txt]]"
source_location: "Chickering (2002) §1–5; Hauser & Bühlmann (2012) §3 (turning phase)"
date_ingested: 2026-09-20
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[Summary Causal DAGs]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
aliases:
  - "GES"
  - "Greedy equivalence search"
  - "score-based causal discovery"
  - "Chickering 2002"
  - "FES BES"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering, 2002) is the canonical **score-based**
> causal discovery algorithm. It searches the space of **CPDAGs** (Markov equivalence
> classes) greedily, guided by a **locally decomposable, score-equivalent** criterion
> such as BIC or BDe. Chickering's key contribution is a proof of the **Meek Conjecture**:
> any two adjacent equivalence classes differ by a single edge insertion or a covered edge
> reversal, so a two-phase greedy search (Forward Equivalence Search then Backward
> Equivalence Search) is **asymptotically consistent** — it recovers the true CPDAG in
> the large-sample limit under faithfulness and causal sufficiency.

## Overview

Constraint-based methods like the [[PC Algorithm]] infer edges from CI test results.
Score-based methods take a different approach: they assign a **score** to each DAG (or
equivalence class) that quantifies how well it fits the data, and search for the
highest-scoring structure.

GES works directly in the space of **equivalence classes** (CPDAGs) rather than the
space of DAGs. This is the insight: the search space is exponentially smaller because
many DAGs share the same CPDAG. A **decomposable score** (local contributions per
variable) enables efficient scoring of each candidate step.

## Main Content

### Score Requirements

> [!definition] Definition: Score-Equivalent and Locally Decomposable Score
> A score $Q: \mathbb{D} \to \mathbb{R}$ (defined on DAGs) must satisfy two properties
> for GES to be well-defined:
>
> 1. **Score-equivalence**: DAGs in the same Markov equivalence class receive the same score,
>    $$G_1 \sim G_2 \quad\Longrightarrow\quad Q(G_1) = Q(G_2).$$
>    This ensures the score is a function of the CPDAG, not the individual DAG.
>
> 2. **Local decomposability**: the score factors as
>    $$Q(G) = \sum_{j=1}^{d} s_j\bigl(X_j \mid \mathrm{pa}_j(G)\bigr),$$
>    where $s_j(X_j \mid \mathrm{pa}_j)$ is a **local score** depending only on variable
>    $X_j$ and its parent set $\mathrm{pa}_j$. This allows efficient incremental updates:
>    adding/removing one edge changes only two local scores.
^def-score-requirements

> [!example] Example: Standard Scores Satisfying Both Properties
>
> - **Gaussian BIC**: $s_j(X_j \mid S) = -\frac{n}{2}\log\hat{\sigma}_{j\mid S}^2 - \frac{|S|+1}{2}\log n$,
>   where $\hat{\sigma}_{j\mid S}^2$ is the residual variance from regressing $X_j$ on $S$.
>   BIC penalizes model complexity and is score-equivalent.
>
> - **BDe/BDeu** (Bayesian Dirichlet equivalent/uniform): the marginal likelihood of $X_j$
>   given its parents for discrete data, using a Dirichlet prior on the CPTs. Score-equivalent
>   and locally decomposable by design.
>
> - **BGe** (Bayesian Gaussian equivalent): the marginal likelihood for Gaussian data with a
>   conjugate Normal-Wishart prior. Score-equivalent and locally decomposable.
^ex-scores

### The Meek Conjecture (Chickering 2002)

The theoretical foundation of GES is Chickering's proof of the **Meek Conjecture** —
the result that guarantees greedy search in CPDAG space cannot get trapped in isolated
local optima that differ from the global optimum by more than a single step.

> [!theorem] Theorem: Meek Conjecture (Chickering, 2002, Theorem 15)
> Let $G$ and $H$ be DAGs such that $H$ is an **I-map** of $G$ (i.e., every CI encoded
> by $H$ is also encoded by $G$, meaning $H$ "believes" fewer independencies than $G$).
> Then there exists a finite sequence of **single edge insertions** and **covered edge
> reversals** transforming $G$ into $H$ such that $H$ remains an I-map of $G$ after
> each operation.
>
> A **covered edge** $X \to Y$ is one where $\mathrm{pa}(X) = \mathrm{pa}(Y) \setminus \{X\}$
> (reversing it does not change the Markov equivalence class).
>
> **Consequence**: any two CPDAGs in the CPDAG space are connected by a sequence of
> single-edge-insertion or covered-reversal steps. GES can therefore reach the global
> optimum from any starting point by greedy local moves.
^thm-meek-conjecture

### The GES Algorithm

> [!theorem] Algorithm: Greedy Equivalence Search (Chickering, 2002)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, score function $Q$.
> **Output:** CPDAG $\hat{C}$ maximising $Q$ over all equivalence classes.
>
> **Phase 1 — Forward Equivalence Search (FES):**
> - Start with $C \leftarrow$ the empty CPDAG (no edges).
> - Repeat until no improvement:
>   - Find the **insert operator** $\mathrm{Insert}(X, Y, T)$ — adding edge $X \to Y$
>     with $T \subseteq \mathrm{Ne}_Y(C) \setminus \mathrm{Adj}_X(C)$ becoming parents of $Y$ —
>     that maximises the score increase $\Delta Q$.
>   - If $\Delta Q > 0$: apply the operator, update the CPDAG.
> - **Termination**: no single insertion increases the score.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> - Start with $C \leftarrow$ output of FES.
> - Repeat until no improvement:
>   - Find the **delete operator** $\mathrm{Delete}(X, Y, H)$ — removing edge $X - Y$
>     or $X \to Y$ — that maximises the score increase $\Delta Q$.
>   - If $\Delta Q > 0$: apply the operator, update the CPDAG.
> - **Return** final $C$.
^alg-ges

**Why two phases?** FES adds edges greedily from the empty graph, so it can
over-add (include edges that improve the score in the forward direction but shouldn't
be there). BES then prunes edges that don't earn their penalty. The combination is
asymptotically optimal; neither phase alone is sufficient.

### Turning Phase (Hauser & Bühlmann, 2012)

An extension by Hauser & Bühlmann (2012) adds a **Turning Phase** (TP) after FES and
BES:
- Tries covered edge reversals $\mathrm{Turn}(X, Y, C)$ that increase the score.
- Repeatable: run FES → BES → TP, or TP → FES → BES until convergence.
- Empirically improves recovery rates, especially for smaller samples.

This extension is included in the `ges` Python package (Gamella, 2021) as the default.

### Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering, 2002, Theorem 23)
> Let $\mathbb{P}$ be a distribution faithful to a DAG $G^*$ on $d$ nodes. Suppose the
> score $Q_n$ (estimated from $n$ i.i.d. samples) is **consistent** in the sense that:
> $$Q_n(G) - Q_n(G') \xrightarrow{p} Q_\infty(G) - Q_\infty(G') \text{ as } n\to\infty,$$
> where $Q_\infty$ is the population score (e.g., negative entropy).
>
> Then as $n \to \infty$, the output of GES converges in probability to the CPDAG of $G^*$:
> $$\hat{C}_{\mathrm{GES}} \xrightarrow{p} \mathrm{CPDAG}(G^*).$$
>
> **Note**: the same assumptions hold as for PC — faithfulness and causal sufficiency.
> The key difference is that GES does not require the user to specify a significance
> level $\alpha$; the penalty in BIC (or the prior in BDe/BGe) plays this role.
^thm-ges-consistency

### Comparison with PC Algorithm

| Property | PC | GES |
|----------|----|------|
| **Paradigm** | Constraint-based (CI tests) | Score-based (decomposable score) |
| **Search space** | Adjacency + separating sets | CPDAG space |
| **Starting point** | Complete graph | Empty graph |
| **Parameter** | Significance level $\alpha$ | Score penalty / prior |
| **Output** | CPDAG | CPDAG |
| **Consistency** | Yes (faithfulness + causal sufficiency) | Yes (faithfulness + causal sufficiency) |
| **Computational cost** | $O(d^2 q^q)$ CI tests | $O(d^2)$ per greedy step, but more steps |
| **Finite sample** | Order-dependent (PC-stable fixes) | Provably optimal at each step |
| **Non-Gaussian data** | Requires kernel CI tests | BIC still works (consistency holds) |
| **Latent confounders** | FCI extension | Not directly (FCI-like extensions exist) |

**Practical guidance:**
- **PC** tends to be faster for very sparse graphs (small $q$) because it avoids
  scoring all possible parent sets.
- **GES** tends to be more accurate in the intermediate-sample regime because score
  functions integrate evidence across the full sample, while CI tests are binary
  (pass/fail) per conditioning set.
- **NOTEARS** ([[NOTEARS - Overview]]) avoids both paradigms but requires a linear SEM
  assumption. The NOTEARS experiments ([[NOTEARS Experiments]]) compare against GES/FGS
  directly.

### FGS / FGES (Fast GES)

**FGES** (Ramsey et al., 2017) is an optimised, parallelised GES variant that scales to
millions of nodes by exploiting the local decomposability of the score more aggressively:
it caches partial scores and avoids re-scoring unchanged parts of the graph. FGES
is used as the state-of-the-art GES baseline in NOTEARS experiments
([[NOTEARS Experiments]]).

## Software

- **Python**: `ges` package (Gamella, 2021) — transparent implementation; `causal-learn` (`ges` function)
- **R**: `pcalg` package — `ges()` function
- **Java/Python**: `Tetrad` — includes FGS (Fast GES) / FGES for large graphs
- **Default score**: Gaussian BIC for continuous data; BDeu for discrete; mixed-data variants available

## Connections

- **Compared to PC** ([[PC Algorithm]]): score-based vs. constraint-based; same asymptotic
  target (CPDAG), different computational path and finite-sample behaviour.
- **Compared to NOTEARS** ([[NOTEARS - Overview]]): NOTEARS uses a continuous relaxation
  of the DAG constraint and gradient-based optimization; GES uses combinatorial search in
  CPDAG space. NOTEARS is compared against GES/FGS in [[NOTEARS Experiments]].
- **Score functions**: BIC score for GES is closely related to the LS score $F(W)$ in NOTEARS
  ([[DAG Structure Learning Problem]]) — both are derived from Gaussian likelihood.
- **ABM calibration context**: [[Approximate Bayesian Computation for ABMs]] and
  [[Summary Causal DAGs]] provide contexts where one would apply GES to ABM output.
  The [[DAG Structure Learning Problem]] note places GES in the "local/approximate search"
  camp — now covered in detail here.

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG space GES searches over
- [[PC Algorithm]] — the constraint-based alternative
- [[DAG Structure Learning Problem]] — problem setup, NP-hardness, and prior methods landscape
- [[NOTEARS - Overview]] — continuous optimization alternative; benchmarks against GES
- [[NOTEARS Experiments]] — empirical comparison of NOTEARS vs. FGS/GES
- [[Directed Acyclic Graphs]] — DAG semantics and d-separation
- [[Summary Causal DAGs]] — downstream application of structure learning to ABM output
