---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source_location: "Spirtes, Glymour & Scheines (2000), Causation, Prediction, and Search, 2nd ed., Ch. 5–6; Colombo & Maathuis (2014), Order-independent constraint-based causal structure learning"
date_ingested: 2026-08-13
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "PC"
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "Spirtes-Glymour-Scheines"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 1993/2000) is the canonical
> **constraint-based** causal structure-learning algorithm. It recovers the Markov equivalence
> class (CPDAG) of the true DAG by systematically testing conditional independences (CIs) in
> data — no score function is needed. Three phases: (1) skeleton estimation by removing edges
> that fail CI tests, (2) v-structure orientation, (3) Meek-rule propagation to orient remaining
> edges. Under faithfulness and causal sufficiency the output CPDAG is asymptotically correct.
> PC-stable (Colombo & Maathuis, 2014) fixes order-dependence by batching skeleton updates.

## Overview

While NOTEARS and GES rely on a **score** to evaluate candidate DAGs, the PC algorithm takes
a fundamentally different route: it treats the problem as one of **hypothesis testing**. Under
the faithfulness assumption, every conditional independence $(X \perp Y \mid \mathbf{Z})$ in
the joint distribution corresponds to a d-separation in the true DAG, and vice versa. The PC
algorithm uses this correspondence exhaustively to whittle a complete graph down to the true
skeleton and then orient as many edges as possible.

The algorithm is named after its authors **P**eter Spirtes and **C**lark Glymour and is
described in their influential book *Causation, Prediction, and Search* (Spirtes, Glymour &
Scheines, 2000). It is the most widely implemented constraint-based algorithm and the reference
point against which score-based methods (GES, NOTEARS) are benchmarked.

## Main Content

### Assumptions

> [!definition] Definition: Causal Markov Condition
> The joint distribution $P$ over variables $\mathbf{V}$ satisfies the **Causal Markov
> Condition** with respect to DAG $G$ if every variable $X_i$ is conditionally independent
> of its non-descendants given its parents:
> $$X_i \perp \mathbf{V} \setminus (\mathrm{De}(X_i) \cup \mathrm{Pa}(X_i)) \mid \mathrm{Pa}(X_i).$$
> Equivalently, all d-separations in $G$ hold as conditional independences in $P$.
^def-markov-condition

> [!definition] Definition: Faithfulness
> $P$ is **faithful** to $G$ if the Markov condition holds and **no additional** conditional
> independences exist in $P$ beyond those entailed by d-separation in $G$. Formally:
> $$X \perp_P Y \mid \mathbf{Z} \iff X \perp_G Y \mid \mathbf{Z} \quad \forall\, X, Y, \mathbf{Z}.$$
> Faithfulness is generic (holds for almost all parameter values) but can fail for specific
> parametric cancellations.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> The observed set of variables $\mathbf{V}$ is **causally sufficient** if every common cause
> of two or more variables in $\mathbf{V}$ is itself in $\mathbf{V}$ — there are no latent
> confounders. The PC algorithm requires causal sufficiency; the FCI algorithm relaxes this.
^def-causal-sufficiency

### Algorithm: Three Phases

> [!theorem] Algorithm: PC (Spirtes, Glymour & Scheines, 2000)
> **Input:** Observations $\mathbf{X} \in \mathbb{R}^{n \times d}$; a conditional independence
> oracle (or test at level $\alpha$).
>
> **Output:** CPDAG $\hat{C}$ of the Markov equivalence class of the true DAG $G$.
>
> ---
> **Phase 1 — Skeleton estimation:**
> 1. Start with the *complete* undirected graph $K_d$ on $d$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$: if there exists a set $\mathbf{S} \subseteq
>      \mathrm{Adj}(X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$ such that
>      $X \perp Y \mid \mathbf{S}$, remove edge $X - Y$ and record $\mathbf{S}_{XY} \leftarrow \mathbf{S}$.
>    - Stop when no adjacent pair has $|\mathrm{Adj}(X) \setminus \{Y\}| \geq \ell$.
>
> **Phase 2 — V-structure orientation:**
> - For each unshielded triple $X - Y - Z$ (where $X \not\sim Z$):
>   if $Y \notin \mathbf{S}_{XZ}$, orient as $X \to Y \leftarrow Z$ (a v-structure).
>
> **Phase 3 — Meek-rule propagation:**
> - Repeatedly apply the four Meek (1995) orientation rules to orient further edges:
>   - **R1:** $X \to Y - Z$ and $X \not\sim Z$ ⟹ orient $Y \to Z$ (avoids new v-structure).
>   - **R2:** $X \to Y \to Z$ and $X - Z$ ⟹ orient $X \to Z$ (avoids cycle).
>   - **R3:** $X - Y$, $X - W$, $W \to Z$, $Y \to Z$, $X \not\sim Z$ ⟹ orient $X \to Z$.
>   - **R4:** $X - Y - Z \to W$ and $X \to W$, $Y \not\sim W$ ⟹ orient $Y \to Z$.
> - Stop when no new orientations can be derived.
^alg-pc

> [!note] Conditioning-set size schedule
> Phase 1 iterates over conditioning sets in order of increasing size $\ell$. At level
> $\ell = 0$, it tests marginal independence; at $\ell = 1$, pairwise conditional independence
> on single variables; and so on. The maximum $\ell$ reached is at most $d - 2$ but is typically
> small (2–4) for sparse graphs. This schedule gives PC its polynomial average-case complexity
> under bounded-degree assumptions.

### Conditional Independence Tests

In practice, exact CI tests are unavailable from finite data. Common substitutes:

| Setting | Test | Statistic |
|---------|------|-----------|
| Gaussian data | Partial correlation = 0 | Fisher's z-transform; $\alpha$-level threshold |
| Discrete data | Conditional $G^2$ or $\chi^2$ test | Asymptotic $\chi^2$ distribution |
| Non-parametric | Kernel-based CI test (KCI) | Permutation-based |
| High-dimensional | Sparse partial correlation (LASSO-based) | Regularized |

For Gaussian data the standard test is: $z = \frac{1}{2}\log\frac{1+\hat\rho}{1-\hat\rho}$,
where $\hat\rho$ is the sample partial correlation of $X$ and $Y$ given $\mathbf{S}$, and
$z \cdot \sqrt{n - |\mathbf{S}| - 3} \sim \mathcal{N}(0,1)$ asymptotically.

### Consistency

> [!theorem] Theorem: Asymptotic Consistency of PC (Spirtes et al., 2000)
> Assume: (a) the data are i.i.d. from a distribution faithful to DAG $G$, (b) causal
> sufficiency, and (c) the CI oracle is perfect (population-level). Then PC returns the
> CPDAG $C^*$ of $G$ — the unique CPDAG Markov-equivalent to $G$.
>
> Under consistent CI tests (type-I and type-II errors $\to 0$ as $n \to \infty$), the
> output $\hat{C}$ satisfies $\hat{C} \to C^*$ almost surely.
^thm-pc-consistency

> [!note] High-dimensional consistency
> Kalisch & Bühlmann (2007) showed that PC with Fisher's z-test is consistent in the
> high-dimensional setting ($d \gg n$) under a sparse-graph assumption (bounded vertex degree
> $q$), requiring only $n = \Omega((\log d)^c)$ samples for some $c > 0$.

### Order-Dependence and PC-Stable

A practical deficiency of the original PC algorithm: the **order in which variables are
processed** in Phase 1 affects which edges are removed and which adjacency sets $\mathbf{S}_{XY}$
are stored, leading to different skeleton estimates from the same data depending on variable
ordering. This is not a finite-sample fluke — it persists even with perfect tests.

> [!definition] Algorithm: PC-stable (Colombo & Maathuis, 2014)
> **PC-stable** fixes order-dependence by batching skeleton updates:
>
> - In each iteration $\ell$, **record** all edges to be deleted (all pairs $(X,Y)$ for which
>   a separating set of size $\ell$ is found) but **do not remove** them until the entire
>   iteration is complete.
> - Only after processing every adjacent pair at level $\ell$ are edges deleted and adjacency
>   lists updated for the next level.
>
> This makes Phase 1 **order-independent**: the skeleton and separation sets produced at each
> level $\ell$ are identical regardless of variable ordering. The v-structure and Meek-rule
> phases are then also order-independent given the fixed skeleton.
^def-pcstable

## Connections

- **vs. GES** ([[Greedy Equivalence Search (GES)]]): PC uses CI tests; GES uses a score. PC's
  skeleton grows with $O(d^q)$ CI tests for bounded degree $q$; GES's FES phase makes $O(d^2)$
  score evaluations per step. In practice PC is faster for sparse graphs; GES is more
  principled for finite samples.
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS is score-based and returns a single DAG
  (not a CPDAG); it does not require faithfulness but assumes a linear SEM.
- **Faithfulness and identifiability**: The CPDAG output identifies precisely which causal
  directions are recoverable from observational data (directed edges = compelled) and which
  are not (undirected edges = reversible). See [[Markov Equivalence and CPDAGs]].
- **FCI extension**: If causal sufficiency fails (latent confounders), the FCI algorithm
  (also by Spirtes et al.) replaces PC and outputs a PAG (Partial Ancestral Graph) instead
  of a CPDAG.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, covered edges, v-structure theorem
- [[DAG Structure Learning Problem]] — NP-hardness context and landscape of prior approaches
- [[Greedy Equivalence Search (GES)]] — score-based complement to PC
- [[Causal Structure Learning - Overview]] — comparison of constraint-based vs. score-based
- [[Directed Acyclic Graphs]] — foundational DAG and d-separation definitions
