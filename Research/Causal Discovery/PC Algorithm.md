---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-structure-learning-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5–6; Kalisch & Bühlmann (2007)"
date_ingested: 2026-11-11
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAG]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "constraint-based structure learning"
  - "skeleton learning"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991) is the canonical
> **constraint-based** method for causal structure learning. It recovers the
> [[Markov Equivalence and CPDAG|CPDAG]] of the true DAG from i.i.d. observational data by
> performing a sequence of **conditional independence (CI) tests** to first find the graph
> skeleton (which pairs of variables are adjacent), then orient edges using v-structures
> and Meek's rules. Under the faithfulness and Markov assumptions with no latent common
> causes (causal sufficiency), PC is **asymptotically correct**. Its computational
> complexity scales with the **maximum node degree** $d^*$, not the number of nodes $p$,
> making it practical for sparse graphs.

## Overview

The PC algorithm belongs to the **constraint-based** family of structure learning methods,
which treat conditional independence relations as constraints that any candidate DAG must
satisfy. The idea is elegant: by the Markov condition, every missing edge in the true DAG
corresponds to a conditional independence that holds in the data, and faithfulness ensures
no *extra* independences. PC exploits this by systematically testing for independence and
removing edges accordingly.

The algorithm is named after its authors Peter Spirtes and Clark Glymour, who introduced it
in the early 1990s as a computationally efficient alternative to the earlier but slower
SGS algorithm (Spirtes, Glymour & Scheines). The key efficiency gain over SGS: rather than
conditioning on all possible subsets of $\mathbf{V} \setminus \{X, Y\}$, PC only conditions
on subsets of the **adjacencies** of $X$ or $Y$ in the current skeleton — drastically
reducing the search space for sparse graphs.

## Main Content

### Assumptions

> [!definition] PC Algorithm Assumptions
> Let $P$ be the data-generating distribution over $\mathbf{V} = \{V_1, \ldots, V_p\}$,
> and let $\mathcal{G}^*$ be the true DAG. PC requires:
>
> 1. **Causal Markov condition**: $P$ satisfies the Markov condition with respect to $\mathcal{G}^*$
>    (every variable is independent of its non-descendants given its parents — [[Markov Equivalence and CPDAG#^def-markov-condition]]).
>
> 2. **Faithfulness**: $P$ is faithful to $\mathcal{G}^*$ — no additional conditional
>    independences beyond those entailed by d-separation in $\mathcal{G}^*$
>    ([[Markov Equivalence and CPDAG#^def-faithfulness]]).
>
> 3. **Causal sufficiency**: there are no **latent common causes** (no unmeasured
>    confounders). Every common cause of any two measured variables is itself in $\mathbf{V}$.
>    (Violation of this assumption calls for the **FCI algorithm**, an extension of PC.)
>
> 4. **Acyclicity**: $\mathcal{G}^*$ is a DAG (no directed cycles).
^def-pc-assumptions

### The Three-Phase Algorithm

> [!definition] PC Algorithm (Spirtes, Glymour & Scheines, 2000)
>
> **Phase 1 — Skeleton learning (CI-based edge removal):**
>
> 1. Start with the **complete undirected graph** $\mathcal{H}$ on $\mathbf{V}$ (all pairs adjacent).
> 2. For each pair $(X_i, X_j)$ adjacent in $\mathcal{H}$, with conditioning-set size $\ell = 0, 1, 2, \ldots$:
>    - For each subset $\mathbf{S} \subseteq \mathrm{Adj}(X_i, \mathcal{H}) \setminus \{X_j\}$
>      (or $\mathrm{Adj}(X_j, \mathcal{H}) \setminus \{X_i\}$) with $|\mathbf{S}| = \ell$:
>      - Perform the CI test: $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$?
>      - If YES: remove edge $X_i - X_j$; record $\text{SepSet}(X_i, X_j) = \mathbf{S}$; break.
> 3. Increment $\ell$ until $\ell = \max_{X} |\mathrm{Adj}(X, \mathcal{H})| - 1$.
> 4. Output: skeleton $\mathcal{S}$ and separation sets $\{\text{SepSet}(X_i, X_j)\}$.
>
> **Phase 2 — V-structure orientation:**
>
> For every triple $(X_i, X_k, X_j)$ such that $X_i - X_k - X_j$ in $\mathcal{S}$ and
> $X_i$ is NOT adjacent to $X_j$ in $\mathcal{S}$:
> - If $X_k \notin \text{SepSet}(X_i, X_j)$: orient $X_i \to X_k \leftarrow X_j$
>   (a v-structure / immorality).
>
> **Phase 3 — CPDAG completion (Meek's rules):**
>
> Repeatedly apply Meek's orientation rules R1–R4 ([[Markov Equivalence and CPDAG#^def-meek-rules]])
> until no new orientations can be derived. The result is the CPDAG of $\mathcal{G}^*$.
^def-pc-algorithm

### Conditional Independence Tests

The choice of CI test determines the applicability domain of PC:

| Data type | Test | Statistic | Notes |
|-----------|------|-----------|-------|
| **Gaussian** | Fisher's Z-test | $Z = \frac{1}{2}\ln\frac{1+\hat\rho}{1-\hat\rho}$ on partial correlation $\hat\rho$ | Exact for Gaussian; $n$-asymptotic generally |
| **Non-Gaussian continuous** | Kernel CI test (HSIC-based) | Hilbert–Schmidt independence criterion | Nonparametric; costly for large $n$ |
| **Discrete / categorical** | G-test (likelihood ratio) or $\chi^2$ | $G = 2\sum O\ln(O/E)$ | Standard for binary / multinomial data |
| **Mixed** | Conditional distance correlation | — | Handles mixed variable types |

For Gaussian data, the Fisher's Z-test on partial correlations is both computationally
efficient and statistically powerful. The partial correlation $\rho_{XY|\mathbf{S}}$ is
the correlation between the residuals of regressing $X$ and $Y$ on $\mathbf{S}$; under
the Gaussian assumption it is zero iff $X \perp\!\!\!\perp Y \mid \mathbf{S}$.

### Complexity and Efficiency

> [!theorem] Complexity of PC (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Let $p$ = number of nodes, $n$ = sample size, $d^*$ = maximum adjacency degree in the
> true skeleton. The number of CI tests performed by PC is at most
> $$O\!\left(p^2 \binom{p}{d^*}\right) = O\!\left(p^{d^*+2}\right).$$
> When $d^*$ is small (sparse graph), this is **polynomial in $p$** even for large $p$.
^thm-pc-complexity

The key observation is that conditioning sets grow only as large as the adjacency
neighbourhood. For a graph where every node has at most $d^*$ neighbours, PC performs at
most $p^2 \binom{d^*}{d^*/2}$ tests. This is what makes PC scale to hundreds of variables
in practice, whereas the SGS algorithm tests all possible subsets of $\mathbf{V}$.

### High-Dimensional Consistency

> [!theorem] Consistency of PC in High Dimensions (Kalisch & Bühlmann, 2007)
> Suppose the true DAG $\mathcal{G}^*$ satisfies the Markov condition, $P$ is faithful to
> $\mathcal{G}^*$, the graph is **sparse** (maximum degree $d^*$ fixed as $p, n \to \infty$),
> and the Fisher's Z CI test is used at significance level $\alpha_n \to 0$ slowly enough.
> Then under a Gaussian distribution, the PC algorithm returns a CPDAG that equals the
> CPDAG of $\mathcal{G}^*$ with probability tending to 1 even when $p = O(n^a)$ for any
> $a < 1$ (high-dimensional, $p > n$ regime).
^thm-pc-consistency

This was a landmark result: PC is consistent even when the number of variables far exceeds
the sample size, provided the graph is sparse.

### PC-Stable: Order-Independent Version

The original PC algorithm is **order-dependent**: the skeleton and v-structures found can
depend on the ordering in which pairs are tested and edges are removed (later tests
condition on a skeleton that depends on earlier removals). Colombo & Maathuis (2014)
introduced **PC-stable**, which saves the adjacency sets from iteration $\ell$ before
removing any edges at that level, then removes all rejected edges simultaneously. PC-stable
is order-independent and is now the preferred implementation.

## Examples

> [!example] Example: Three-Node Gaussian DAG
> **Data**: $n = 1000$ observations from $X \to Z \leftarrow Y$, $X \perp\!\!\!\perp Y$,
> $X \not\perp\!\!\!\perp Y \mid Z$.
>
> **Phase 1 (skeleton)**:
> - Test $X \perp\!\!\!\perp Y \mid \emptyset$: not independent ($\rho_{XY} \neq 0$? Actually
>   with $X \to Z \leftarrow Y$, $X \perp\!\!\!\perp Y$, so $\hat\rho_{XY} \approx 0$).
>   Remove edge $X - Y$. Record $\text{SepSet}(X, Y) = \emptyset$.
> - Test $X \perp\!\!\!\perp Z \mid \emptyset$: dependent ($\rho_{XZ} \neq 0$). Keep edge.
> - Test $Y \perp\!\!\!\perp Z \mid \emptyset$: dependent. Keep edge.
> - Skeleton: $X - Z - Y$.
>
> **Phase 2 (v-structures)**:
> - Triple $(X, Z, Y)$: non-adjacent $X, Y$; $Z \notin \text{SepSet}(X,Y) = \emptyset$.
>   Orient: $X \to Z \leftarrow Y$. ✓
>
> **Phase 3 (Meek rules)**: No additional orientations possible.
>
> **Output CPDAG**: $X \to Z \leftarrow Y$ — correctly identifies the v-structure.

## Limitations

> [!warning] Key Limitations of PC
> 1. **Causal sufficiency required**: latent confounders cause PC to introduce spurious edges
>    or miss true edges. Use FCI (Fast Causal Inference) or RFCI for the latent-variable case.
> 2. **Faithfulness can fail**: in linear Gaussian models, exact cancellation of path
>    coefficients creates unfaithfulness (measure-zero in theory, but possible in practice
>    with strong regularities).
> 3. **CI test reliability**: in finite samples, CI tests make errors. Test errors in Phase 1
>    propagate to Phase 2 and 3. With high-dimensional data and many tests, type I error
>    accumulation is a concern.
> 4. **Order dependence**: original PC depends on variable ordering (addressed by PC-stable).
> 5. **Linear/Gaussian assumption**: Fisher's Z-test assumes linearity; nonparametric tests
>    exist but are more computationally expensive.

## Connections

- **[[GES Algorithm]]**: score-based alternative that is order-independent and may be more
  efficient for Gaussian data; both output the CPDAG but via different mechanisms.
- **[[NOTEARS - Overview]]**: NOTEARS outputs a DAG (not CPDAG) by operating in continuous
  weight space; the [[NOTEARS Experiments]] paper uses PC as a baseline.
- **[[Markov Equivalence and CPDAG]]**: the PC algorithm's output is defined and understood
  only through this framework.
- **[[Directed Acyclic Graphs]]**: d-separation in the DAG drives Phase 1 and Phase 2 logic.
- **FCI / RFCI** (not yet covered): extensions of PC that handle latent confounders by
  producing PAGs (Partial Ancestral Graphs) instead of CPDAGs.

## See Also
- [[Markov Equivalence and CPDAG]] — CPDAG definition, v-structures, Meek rules
- [[GES Algorithm]] — score-based alternative; both target the same CPDAG
- [[DAG Structure Learning Problem]] — landscape of structure-learning methods
- [[NOTEARS - Overview]] — continuous-optimization approach; uses PC as empirical baseline
- [[Directed Acyclic Graphs]] — d-separation and DAG semantics
