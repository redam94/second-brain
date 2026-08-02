---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Survey.md]]"
source_location: "§2 — Chickering (2002), JMLR 3: 507-554"
date_ingested: 2026-08-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - Greedy Equivalence Search
  - GES algorithm
  - Chickering 2002
  - score-based structure learning
  - FGES
  - Fast Greedy Search
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical score-based causal
> structure learning algorithm. It searches the **CPDAG space** (Markov equivalence classes)
> rather than the space of individual DAGs, using two greedy phases: a **Forward Equivalence
> Search** (FES) that adds edges to maximize a decomposable score, and a **Backward Equivalence
> Search** (BES) that removes edges to clean up. Chickering (2002) proves GES is **consistent**
> under Markov + faithfulness, recovering the true CPDAG as $n \to \infty$. The proof requires
> establishing the "Meek Conjecture" about the lattice structure of CPDAG space. GES is the
> score-based counterpart to the constraint-based [[PC Algorithm - Constraint-Based Structure Learning]].

## Overview

The **score-based paradigm** assigns a real-valued score $Q(\mathcal{G})$ to each DAG $\mathcal{G}$
and searches for the structure that maximizes $Q$. Unlike constraint-based methods, no individual
CI test is required — statistical evidence is aggregated into a single number. The challenge is
that the space $\mathbb{D}$ of DAGs on $d$ nodes is combinatorial and grows
superexponentially — direct optimization over $\mathbb{D}$ is NP-hard
([[DAG Structure Learning Problem]]).

GES avoids this by searching over the **CPDAG space** (equivalence classes) using two local
operators — Insert and Delete — that move between adjacent classes. The key structural result
(Chickering 2002, proving Meek's 1997 conjecture) guarantees that greedy search in this space
converges to the global optimum in the large-sample limit.

## Main Content

### Score Functions

GES requires a **decomposable** score $Q$:

> [!definition] Decomposable Score (Chickering 2002)
> A score $Q(\mathcal{G}) = \sum_{j=1}^d Q_j(\mathrm{Pa}_{\mathcal{G}}(X_j))$ is
> **decomposable** if it decomposes as a sum of **local scores** $Q_j$ — one per variable,
> depending only on $X_j$ and its parents. Decomposability ensures that Insert/Delete operators
> (which change only one variable's parent set) require only one local-score evaluation.
^def-decomposable-score

Common decomposable scores:

| Score | Formula | Data type |
|-------|---------|-----------|
| **BIC** | $\hat{\ell}(\mathcal{G}) - \frac{1}{2}\log(n) \cdot \|\mathcal{G}\|$ | General (Gaussian BIC = GaussL2) |
| **BDe** | $\log P(D \mid \mathcal{G})$ (Bayesian Dirichlet prior) | Discrete |
| **BGe** | $\log P(D \mid \mathcal{G})$ (Bayesian Gaussian prior) | Continuous / Gaussian |

BIC is the most common choice in practice. Under Gaussian data, maximizing BIC is equivalent
to minimizing the NOTEARS least-squares score $F(W)$ with $\ell_0$ regularization.

### The CPDAG Lattice

> [!theorem] CPDAG Lattice Structure (Chickering 2002, Theorem 9)
> The set of CPDAGs on $d$ variables, ordered by the "I-map" relation ($\mathcal{C}_1 \leq \mathcal{C}_2$
> if $\mathcal{C}_1$ is an independence map of $\mathcal{C}_2$, i.e., fewer CIs), forms a
> **lattice**. The empty CPDAG (no edges) is the minimum; the complete CPDAG $K_d$ is the maximum.
>
> Adjacent elements in the lattice differ by exactly one Insert or Delete operation.
^thm-lattice

This lattice structure is what makes greedy search in CPDAG space meaningful: GES can climb
this lattice monotonically in two phases.

### Phase 1 — Forward Equivalence Search (FES)

> [!definition] Insert Operator (Chickering 2002, Def. 12)
> $\mathrm{Insert}(X, Y, \mathbf{T})$: Add edge $X \to Y$ to CPDAG $\mathcal{C}$, converting
> each $T \in \mathbf{T}$ from an undirected neighbor of $Y$ adjacent to $X$ to a directed
> parent $T \to Y$.
>
> **Validity condition:** Let $\mathbf{H} = \mathrm{Na}_{YX} \setminus \mathbf{T}$ (undirected
> neighbors of $Y$ adjacent to $X$ not in $\mathbf{T}$). The Insert is valid when:
> - $\mathbf{H}$ is a **clique** in $\mathcal{C}$.
> - $\mathbf{H} \cup \mathbf{T}$ **separates** $X$ from $Y$ in the current CPDAG skeleton.
> These conditions ensure the result is a valid CPDAG.
^def-insert

> [!definition] Forward Equivalence Search (FES)
> **Initialize:** $\mathcal{C} \leftarrow$ empty CPDAG (no edges).
>
> **Repeat:**
> - Evaluate $\Delta Q_{\mathrm{Insert}(X,Y,\mathbf{T})}$ for all valid Insert operators on all
>   non-adjacent pairs $(X, Y)$ and valid sets $\mathbf{T}$.
> - If $\max \Delta Q > 0$: apply the best Insert, update $\mathcal{C}$.
> - **Else:** **stop**.
>
> **Output:** A CPDAG $\mathcal{C}_{\mathrm{FES}}$ that is an I-map of the true CPDAG $\mathcal{C}^*$
> (a supergraph — may have extra edges).
^def-fes

**Score update:** Because $Q$ is decomposable, $\Delta Q_{\mathrm{Insert}(X,Y,\mathbf{T})} = Q_Y^{\text{new}} - Q_Y^{\text{old}}$ — only one local score changes.

**Key invariant:** After each Insert, $\mathcal{C}$ remains a valid CPDAG. This requires that the new edge $X \to Y$ with the newly directed edges $\mathbf{T} \to Y$ can be consistently embedded into some DAG in the equivalence class.

### Phase 2 — Backward Equivalence Search (BES)

> [!definition] Delete Operator (Chickering 2002, Def. 14)
> $\mathrm{Delete}(X, Y, \mathbf{H})$: Remove edge $X \to Y$ (or $X - Y$) from CPDAG $\mathcal{C}$,
> orienting each $H \in \mathbf{H}$ from $H \to Y$.
>
> **Validity condition:** $\mathbf{H} \subseteq \mathrm{Na}_{YX}$ (undirected neighbors of $Y$
> adjacent to $X$), and $\mathbf{H}$ is a clique in $\mathcal{C}$.
^def-delete

> [!definition] Backward Equivalence Search (BES)
> **Initialize:** $\mathcal{C} \leftarrow \mathcal{C}_{\mathrm{FES}}$.
>
> **Repeat:**
> - Evaluate $\Delta Q_{\mathrm{Delete}(X,Y,\mathbf{H})}$ for all valid Delete operators on
>   all adjacent pairs $(X, Y)$ and valid sets $\mathbf{H}$.
> - If $\max \Delta Q > 0$: apply the best Delete, update $\mathcal{C}$.
> - **Else:** **stop**.
>
> **Output:** A CPDAG $\hat{\mathcal{C}}$.
^def-bes

### Consistency Theorem (The Main Result)

> [!theorem] GES Consistency (Chickering 2002, Theorem 15)
> Let $Q$ be a **BIC** score (or any consistent decomposable score) for a linear Gaussian
> structural equation model. Under the Markov condition and faithfulness:
>
> **FES:** In the large-sample limit, FES terminates at a CPDAG $\mathcal{C}_{\mathrm{FES}}$
> that is an **I-map** of the true CPDAG $\mathcal{C}^*$ — i.e., $\mathcal{C}_{\mathrm{FES}}$
> has all the true edges plus possibly extra ones.
>
> **BES:** Starting from $\mathcal{C}_{\mathrm{FES}}$, BES terminates at $\hat{\mathcal{C}} = \mathcal{C}^*$.
>
> **Combined:** GES is a **consistent** estimator of the true CPDAG:
> $$\hat{\mathcal{C}} \xrightarrow{P} \mathcal{C}^* \quad \text{as } n \to \infty.$$
^thm-ges-consistency

> [!theorem] The Meek Conjecture (Chickering 2002, Theorem 14)
> **Claim:** If $\mathcal{H}$ is an I-map of $\mathcal{G}$ (i.e., $\mathcal{H}$ has all the
> edges of $\mathcal{G}$ and possibly more), then there exists a sequence of valid Insert/Delete
> operators transforming $\mathcal{H}$ into $\mathcal{G}$ (or more precisely, into a CPDAG
> in $[\mathcal{G}]$) such that after each step, $\mathcal{H}$ remains an I-map of $\mathcal{G}$.
>
> **Significance:** This is what enables BES to remove false edges from $\mathcal{C}_{\mathrm{FES}}$:
> there always exists a sequence of valid Deletes from any I-map down to the true CPDAG, and
> BES greedily follows this path. Proving this conjecture (Meek 1997) is the central technical
> contribution of Chickering (2002).
^thm-meek-conjecture

### Computational Complexity

> [!note] GES Cost
> - **FES:** $O(d^2)$ Insert operators per step, each costing $O(d^2)$ (to enumerate valid $\mathbf{T}$
>   sets and compute one local score). Typically $O(d^2)$ FES steps, giving $O(d^4)$ total.
> - **BES:** Similar analysis: $O(d^4)$ total.
> - **Overall:** $O(d^4)$ for Gaussian BIC — polynomial in $d$, and much cheaper than the
>   exponential cost of exact methods (GOBNILP).
>
> **FGES improvement:** Parallelized + priority-queue implementation gives $O(d^3)$ in practice
> on sparse graphs (Ramsey et al. 2017).

### FGES — Fast Greedy Equivalence Search

> [!note] FGES / FGS (Ramsey, Glymour, Sanchez-Romero & Harber 2017)
> FGES achieves order-of-magnitude speedups over GES by:
> 1. **Parallelizing** Insert/Delete evaluations across variable pairs.
> 2. **Priority queue:** After each step, only re-evaluate operators involving variables whose
>    score changed (exploiting decomposability); unchanged scores are cached.
> 3. **Symmetry:** Only evaluate $\mathrm{Insert}(X,Y,\mathbf{T})$ for non-adjacent $X, Y$
>    in the current CPDAG (not all pairs each step).
>
> FGES is **the FGS baseline in the NOTEARS experiments** ([[NOTEARS Experiments]]). It is the
> strongest score-based competitor to continuous optimization on sparse graphs.
^def-fges

### GIES — Interventional Extension

> [!note] GIES (Hauser & Bühlmann 2012)
> **GIES** (Greedy Interventional Equivalence Search) extends GES to **interventional data**
> — data collected under both observational and experimental conditions. Interventions sever
> incoming edges to intervened variables, breaking Markov equivalences.
>
> GIES searches over **I-equivalence classes** (CPDAGs under the interventional distribution),
> using extended Insert/Delete operators for the interventional setting. Under Markov + faithfulness,
> GIES is consistent — recovering the true I-Markov equivalence class, which can uniquely identify
> the full DAG when interventions cover all variables.
>
> This connects to the vault's experimental ideal: [[The Experimental Ideal]] describes
> randomization as the gold standard precisely because it breaks observational equivalences.

## Connections

- **vs. PC Algorithm:** [[PC Algorithm - Constraint-Based Structure Learning]] uses CI tests;
  GES uses scores. Both are consistent under Markov + faithfulness. GES may be less sensitive to
  CI test errors in finite samples, but requires a parametric score specification.
- **vs. NOTEARS:** [[NOTEARS Algorithm]] is a continuous optimization over matrices rather than
  CPDAG operators. NOTEARS does not output CPDAGs and has no finite-sample consistency guarantee
  of the same form — but is empirically superior on dense, high-$d$ graphs
  ([[NOTEARS Experiments]]).
- **BIC score connection:** The BIC score used by GES is the same criterion as the penalty in
  regularized LS (NOTEARS uses an $\ell_1$ penalty; GES uses BIC's $\log(n)$ penalty). Their
  shared statistical foundation is the BIC approximation to the Bayesian marginal likelihood.
- **Bayesian analogy:** GES with a BGe score (Bayesian Gaussian score) produces a structure
  estimate equivalent to maximizing the Bayesian posterior over DAGs. This connects to
  [[LLM Expert Elicitation for Bayesian Networks]], which also elicits a prior over structures.
- **Score decomposability and ABMs:** When ABM simulation output is used as data for structure
  learning, GES can be applied with any differentiable score function — connecting to
  [[Approximate Bayesian Computation for ABMs]] (ABC targets the full likelihood; GES targets
  a marginal score).

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the search space of GES; compelled/reversible edges
- [[PC Algorithm - Constraint-Based Structure Learning]] — CI-test-based alternative; same output target
- [[DAG Structure Learning Problem]] — the NP-hard combinatorial problem GES circumvents
- [[NOTEARS Algorithm]] — continuous optimization approach; GES is its primary score-based baseline
- [[NOTEARS Experiments]] — GES / FGS benchmarked against NOTEARS
- [[BN Construction Methods Comparison]] — GES, PC, and expert elicitation compared at a high level
