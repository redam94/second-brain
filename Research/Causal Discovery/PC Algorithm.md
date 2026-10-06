---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-references.md]]"
source_location: "Kalisch & Bühlmann (2007), §2–4; Spirtes, Glymour & Scheines (2000), Ch. 6"
date_ingested: 2026-10-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "Kalisch-Bühlmann PC"
  - "pcalg"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after **P**eter Spirtes and **C**lark Glymour, who introduced it in
> 1991) is the canonical **constraint-based** causal structure-learning algorithm. It estimates
> the skeleton of a DAG via a growing series of conditional independence tests, orients v-structures
> from the separating sets, and propagates orientation via Meek rules — outputting a **CPDAG**
> (Markov equivalence class representative). Kalisch & Bühlmann (2007) proved that a
> **stable, order-independent** variant is **uniformly consistent** for very high-dimensional
> sparse Gaussian DAGs: the number of nodes $d$ may grow as fast as $O(n^a)$ for any $a > 0$.
> The `pcalg` R package and `causal-learn` Python library implement it.

## Overview

The PC algorithm solves the causal structure-learning problem under the Markov, Faithfulness,
and **causal sufficiency** assumptions (no hidden confounders). Its computational advantage over
exhaustive search comes from a key observation: in a sparse graph, most pairs of variables can be
separated by a small conditioning set, so the majority of CI tests are run at low order
(conditioning on 0, 1, or 2 variables).

The algorithm has three phases:

| Phase | Input | Operation | Output |
|-------|-------|-----------|--------|
| 1. Skeleton | Complete undirected graph | Progressive CI tests | Undirected skeleton + Sepsets |
| 2. V-structures | Skeleton + Sepsets | Check each unshielded triple | Partially directed graph |
| 3. Meek rules | Partially directed graph | Rules R1–R4 | CPDAG |

## Main Content

### Phase 1: Skeleton Discovery

> [!definition] Definition: PC Skeleton Phase (Algorithm 1 in Kalisch & Bühlmann 2007)
> **Input:** Variables $\mathbf{V} = \{X_1, \ldots, X_d\}$, CI test oracle $\mathsf{test}(X, Y, S)$,
> significance level $\alpha$.
>
> **Initialize:** Complete undirected graph $H = (\mathbf{V}, \mathbf{V} \times \mathbf{V})$;
> $\mathrm{Sepset}(X, Y) \leftarrow \varnothing$ for all pairs; order $\ell \leftarrow 0$.
>
> **Repeat** (for $\ell = 0, 1, 2, \ldots$):
> For each adjacent pair $(X, Y)$ in current $H$:
>   - For each $S \subseteq \mathrm{Adj}(H, X) \setminus \{Y\}$ with $|S| = \ell$:
>     - If $\mathsf{test}(X, Y, S) = \texttt{independent}$ (p-value $> \alpha$):
>       - Remove edge $X - Y$ from $H$
>       - Set $\mathrm{Sepset}(X, Y) \leftarrow S$ and $\mathrm{Sepset}(Y, X) \leftarrow S$
>       - Break inner loop
>
> **Until** no adjacent pair $(X, Y)$ in $H$ has $|\mathrm{Adj}(H, X)| > \ell$.
>
> **Output:** Skeleton $H$, Sepsets.
^alg-skeleton

The key invariant: at order $\ell$, the algorithm only tests conditioning sets drawn from the
**current adjacency set** — so once an edge is removed, it shrinks the search space for remaining edges.

> [!note] Stable (Order-Independent) Variant
> The original PC algorithm processes pairs in a fixed order, making the skeleton **order-dependent**:
> the same data with variables in a different order can yield a different result. Colombo & Maathuis
> (2014) introduced the **PC-stable** variant that stores the graph at the beginning of each
> order-$\ell$ round and uses that snapshot (not the dynamically-updated graph) to determine
> adjacencies for inner-loop subsets. PC-stable is **order-independent** and is the standard
> implementation in `pcalg` and `causal-learn`.

### Phase 2: V-Structure Orientation

> [!definition] Definition: V-Structure Orientation
> For each **unshielded triple** $(X, Z, Y)$ — where $X - Z$, $Y - Z$, and $X \not\!\!-\!\! Y$
> in the skeleton:
>
> - If $Z \notin \mathrm{Sepset}(X, Y)$: orient as v-structure $X \to Z \leftarrow Y$.
> - If $Z \in \mathrm{Sepset}(X, Y)$: leave $X - Z - Y$ unoriented (non-collider configuration).
>
> **Intuition:** If $Z$ was **not** in the separating set, then conditioning on $Z$ would create
> dependence between $X$ and $Y$. This is the hallmark of a collider at $Z$.
^alg-vstructure

### Phase 3: Meek Rule Propagation

After v-structures, apply Meek's orientation rules R1–R4 iteratively until no new orientations
can be made (see [[Markov Equivalence Classes and CPDAGs]] for the rules). The result is the CPDAG.

### PC Algorithm — Full Pseudocode

```
PC(data X, significance α):
    1. Initialize H ← complete undirected graph on X₁,...,Xd
    2. Sepset(Xi, Xj) ← ∅  for all i ≠ j
    3. ℓ ← 0

    4. WHILE ∃ adjacent pair (Xi, Xj) with |Adj(H, Xi)| - 1 ≥ ℓ:
         FOR each adjacent (Xi, Xj):
             FOR S ⊆ Adj(H, Xi)\{Xj} with |S| = ℓ:
                 IF Xi ⊥⊥ Xj | S  (p-value > α):
                     Remove Xi - Xj from H
                     Sepset(Xi, Xj) ← Sepset(Xj, Xi) ← S
                     BREAK
         ℓ ← ℓ + 1

    5. FOR each unshielded triple (Xi, Xk, Xj) in H:
         IF Xk ∉ Sepset(Xi, Xj): orient Xi → Xk ← Xj

    6. Apply Meek rules R1–R4 until convergence

    7. RETURN CPDAG H
```

### Consistency of the PC Algorithm

> [!theorem] Theorem: High-Dimensional Consistency of PC (Kalisch & Bühlmann 2007, Thm. 3.1)
> Let the data $X^{(1)}, \ldots, X^{(n)}$ be i.i.d. from a multivariate Gaussian distribution
> faithful to the true DAG $G^*$ on $d$ nodes. Assume:
> 1. **Sparseness**: $\max_{i} |\mathrm{Pa}_{G^*}(X_i)| \leq k$ for some $k < n$.
> 2. **Minimum partial correlation**: $\min \{|\rho_{ij|S}| : \text{true edge } i \to j, |S| \leq k\} \geq c_n$
>    for a sequence $c_n \to 0$ at a controlled rate.
>
> Then, using the Fisher $z$-test at level $\alpha_n = 2(1 - \Phi(\sqrt{n-k-3} \cdot c_n / 2))$,
> the PC algorithm recovers the CPDAG of $G^*$ **with probability tending to 1** as $n \to \infty$,
> even when $d = O(n^a)$ for any $a > 0$.
>
> **Key insight:** The result allows exponentially many variables relative to sample size, provided
> the graph is sparse. Sparseness controls the maximum conditioning set size $k$, bounding the
> statistical difficulty of the CI tests.
^thm-consistency

### CI Test for Gaussian Data

Under the Gaussian assumption, the PC algorithm uses the **Fisher $z$-transform** of partial
correlations:

> [!definition] Definition: Fisher $z$-Test for Conditional Independence
> For variables $X_i, X_j$ and conditioning set $S$, compute the sample partial correlation
> $\hat\rho_{ij|S}$ from the precision matrix block. Under $H_0: \rho_{ij|S} = 0$:
> $$T = \sqrt{n - |S| - 3} \cdot \mathrm{arctanh}(\hat\rho_{ij|S}) \xrightarrow{d} \mathcal{N}(0, 1).$$
> Reject $H_0$ (retain edge) if $|T| > z_{\alpha/2}$.
>
> The degrees-of-freedom adjustment $n - |S| - 3$ accounts for the $|S|$ conditioning variables.
^def-fisher-z

## Limitations and Extensions

| Limitation | Extension |
|-----------|-----------|
| Causal sufficiency (no hidden confounders) | **FCI** (Fast Causal Inference) — outputs PAG (Partial Ancestral Graph) |
| Order-dependence of original PC | **PC-stable** (Colombo & Maathuis 2014) — use adjacency snapshot |
| Gaussian CI test | Nonparametric tests: HSIC, KCI, kernel-based |
| $O(n^k)$ tests at max degree $k$ | MMPC, SI-HITON — local algorithms for high-degree graphs |
| Time series | **PCMCI** (Runge et al. 2019) — temporal extensions |

## Connections to Other Methods

- **Score-based alternative**: GES (see [[GES - Overview]]) searches directly over CPDAG space
  using a BIC-like score. In large samples, both recover the same CPDAG; in finite samples GES is
  often more accurate but assumes score-equivalence. NOTEARS (see [[NOTEARS - Overview]]) is a
  continuous-optimization alternative for linear SEMs.
- **Bayesian alternative**: [[BN Construction Methods Comparison]] and [[LLM Expert Elicitation
  for Bayesian Networks]] cover knowledge-elicitation approaches that bypass data-driven structure learning.
- **NOTEARS comparison**: the NOTEARS paper ran PC and GES as baselines; PC "was significantly weaker
  and only reported in the supplement" ([[NOTEARS Experiments]]).
- **Software**: in R, `pcalg::pc()` with `gaussCItest` (Gaussian) or `disCItest` (discrete); in
  Python, `causal_learn.search.ConstraintBased.PC`.

## See Also
- [[Constraint-Based Causal Discovery]] — the general framework the PC algorithm implements
- [[Markov Equivalence Classes and CPDAGs]] — what the algorithm outputs; Meek rules
- [[GES - Overview]] — the score-based alternative
- [[NOTEARS - Overview]] — the continuous-optimization alternative
- [[Directed Acyclic Graphs]] — d-separation used in the algorithm's foundation
- [[Causal Discovery/_Index|Causal Discovery Index]]
