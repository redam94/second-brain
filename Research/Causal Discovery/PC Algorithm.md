---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-Kalisch-Buehlmann2007-PC.md]]"
source_location: "Spirtes et al. (2000) Ch. 5; Kalisch & Bühlmann (2007) §2"
date_ingested: 2026-09-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Tests for Structure Learning]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "SGS algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter-Clark; Spirtes, Glymour & Scheines 1993/2000) is the
> canonical **constraint-based** method for causal structure learning. Starting from a
> complete undirected graph, it removes edges whose endpoints are conditionally independent
> given some separating set, then orients edges into v-structures and applies Meek rules.
> Under Causal Markov and Faithfulness, it consistently recovers the **CPDAG** of the true
> DAG. Its key advantage over exhaustive search (SGS) is efficiency: it conditions only on
> *adjacency sets*, dramatically reducing the number of CI tests in sparse graphs.

## Overview

Constraint-based structure learning treats the conditional independence (CI) structure of
the data as the fundamental object. A CI test asks: "Is $X \perp\!\!\!\perp Y \mid S$?" for
some subset $S$ of other variables. The true DAG implies a specific pattern of
independences (via d-separation); the algorithm recovers the skeleton and CPDAG by
testing systematically which independences hold.

The **SGS algorithm** (Spirtes-Glymour-Scheines, the predecessor) is conceptually pure but
exponentially expensive: it tests all possible subsets $S \subseteq \mathbf{V} \setminus \{X,Y\}$.
The **PC algorithm** improves this by restricting $S$ to subsets of the **adjacency sets**
of $X$ and $Y$, exploiting the fact that a separating set of adjacent variables always
exists (if one exists at all). This makes PC polynomial-time in sparse graphs.

## Main Content

### Three-Phase Structure

The PC algorithm has three phases:

1. **Skeleton learning** — determine which pairs of variables are adjacent
2. **V-structure orientation** — identify and orient unshielded colliders
3. **Edge orientation via Meek rules** — propagate orientations to compelled edges

### Phase 1: Skeleton Learning

> [!definition] PC Skeleton Algorithm
> **Input:** Variables $\mathbf{V} = \{V_1, \ldots, V_p\}$, CI test oracle, significance level $\alpha$
>
> **Output:** Skeleton graph $\mathcal{H}$ (undirected), separator sets $\text{Sep}(X,Y)$ for each
> non-adjacent pair
>
> 1. Initialize $\mathcal{H}$ as the complete undirected graph on $\mathbf{V}$.
> 2. Set $l \leftarrow 0$.
> 3. **Repeat** until no more edges are removed:
>    - For each adjacent pair $(X, Y)$ in $\mathcal{H}$:
>      - For each $S \subseteq \text{Adj}(X, \mathcal{H}) \setminus \{Y\}$ with $|S| = l$:
>        - If $X \perp\!\!\!\perp Y \mid S$ (CI test passes):
>          - Remove edge $X - Y$ from $\mathcal{H}$
>          - Set $\text{Sep}(X,Y) \leftarrow S$, $\text{Sep}(Y,X) \leftarrow S$
>          - Break (move to next pair)
>    - Increment $l \leftarrow l + 1$.
^alg-pc-skeleton

**Key insight**: Testing only $S \subseteq \text{Adj}(X, \mathcal{H})$ is valid by the
*adjacency faithfulness* property: if $X \perp\!\!\!\perp Y \mid S$ for any $S$, then
there exists a separating set $S^* \subseteq \text{Adj}(X) \cup \text{Adj}(Y)$.

**Complexity**: In a graph with maximum degree $q$, each adjacency set has at most $q$
elements. The number of CI tests for a given pair is $O(q^l)$. For fixed $q$, the total
work is $O(p^2 q^q)$ — polynomial in $p$, not exponential.

### Phase 2: V-Structure Orientation

> [!definition] V-Structure Identification
> For each **unshielded triple** $(X, Z, Y)$ in the skeleton — meaning $X - Z$, $Z - Y$,
> but $X$ and $Y$ are **not** adjacent:
>
> If $Z \notin \text{Sep}(X, Y)$, then orient $X \to Z \leftarrow Y$ (a v-structure).
> If $Z \in \text{Sep}(X, Y)$, leave $X - Z - Y$ unoriented.
^alg-pc-vstructures

**Why this works**: In the true DAG, if $(X, Z, Y)$ is a v-structure ($X \to Z \leftarrow Y$),
then $Z$ is not in any set that d-separates $X$ and $Y$ (conditioning on $Z$ *opens* the
path rather than closing it). If it is a chain or fork ($X \to Z \to Y$ or $X \leftarrow Z \to Y$),
then $Z$ *is* in the separating set. The algorithm reads off this distinction from the
recorded $\text{Sep}(X,Y)$.

### Phase 3: Meek Orientation Rules

Apply Meek Rules R1–R4 (see [[Markov Equivalence and CPDAGs#^def-meek-rules]]) repeatedly
until no more edges can be oriented. The output is the CPDAG.

> [!theorem] Theorem: Consistency of PC (Kalisch & Bühlmann, 2007)
> Under the Causal Markov Condition, Faithfulness, and with a consistent CI test at
> level $\alpha = \alpha(n) \to 0$ (slowly enough), the PC algorithm is
> **consistent**: it recovers the true CPDAG with probability tending to 1 as $n \to \infty$.
>
> For Gaussian data with Fisher's Z test, this holds even when $p \to \infty$ as fast as
> $p = O(n^a)$ for any $a < \infty$, provided the true graph is **sparse** (bounded
> maximum degree $q$).
^thm-pc-consistency

### The CI Test Oracle

Phase 1 calls a CI test as a subroutine. See [[Conditional Independence Tests for Structure Learning]]
for details. Common choices:
- **Fisher's Z test** (Gaussian): $z(r_{XY|S})$ where $r_{XY|S}$ is the partial correlation
- **G² / χ² test** (discrete): chi-squared test on contingency tables
- **KCI** (Kernel CI test): nonparametric, handles nonlinear/non-Gaussian distributions

The significance level $\alpha$ controls the false-positive rate for edge removal.
In practice $\alpha = 0.01$ or $0.05$ is used, trading off false edges (too low) vs
missing edges (too high).

### Limitations and Extensions

**Faithfulness violations**: PC can produce incorrect results if the faithfulness assumption
fails (e.g., exact cancellation of path effects). In practice, near-violations inflate
the number of required CI tests.

**Order-dependence**: The original PC is order-dependent — different orderings of variable
pairs can produce different skeletons. The **PC-stable** variant (Colombo & Maathuis, 2014)
resolves this by considering all CI tests at each level $l$ before removing any edges.

**High-dimensional performance**: Kalisch & Bühlmann (2007) show PC is consistent for
$p \gg n$ when the graph is sparse. In practice, FDR-controlling CI tests (e.g., partial
correlation with Bonferroni correction) improve performance.

**Comparison to score-based methods**: PC tests conditional independences explicitly and
does not require a score function, making it model-free (beyond CI tests). GES requires
a Bayesian score but is asymptotically optimal; see [[GES Algorithm]].

## Examples

> [!example] Example: Four-Variable Chain
> $\mathbf{V} = \{X_1, X_2, X_3, X_4\}$, true DAG: $X_1 \to X_2 \to X_3 \to X_4$.
>
> **Phase 1 (skeleton learning):**
> - Test $X_1 \perp\!\!\!\perp X_3$: not independent (path $X_1 \to X_2 \to X_3$ is active).
>   But $X_1 \perp\!\!\!\perp X_3 \mid X_2$: independent! Remove $X_1 - X_3$; Sep$(X_1, X_3) = \{X_2\}$.
> - Similarly: $X_2 \perp\!\!\!\perp X_4 \mid X_3$, remove $X_2 - X_4$.
> - $X_1 \perp\!\!\!\perp X_4 \mid \{X_2\}$? No. $X_1 \perp\!\!\!\perp X_4 \mid \{X_3\}$? No. 
>   $X_1 \perp\!\!\!\perp X_4 \mid \{X_2, X_3\}$? Yes! Remove $X_1 - X_4$.
> - Skeleton: $X_1 - X_2 - X_3 - X_4$.
>
> **Phase 2 (v-structures):** Unshielded triple $(X_1, X_2, X_3)$: $X_2 \in \text{Sep}(X_1, X_3)$
> → not a v-structure. Triple $(X_2, X_3, X_4)$: $X_3 \in \text{Sep}(X_2, X_4)$ → not a v-structure.
>
> **Phase 3 (Meek):** No compelled orientations. **Output:** $X_1 - X_2 - X_3 - X_4$.
>
> This is correct: all three orientations ($\to\to\to$, $\leftarrow\leftarrow\leftarrow$, $\to\leftarrow\to$,
> etc., excluding v-structures) are Markov equivalent.

## Connections

- **GES** ([[GES Algorithm]]) is the score-based counterpart: instead of testing independences,
  it greedily optimizes a Bayesian score over CPDAGs. Both output CPDAGs; they agree
  asymptotically under their respective assumptions.
- **NOTEARS** ([[NOTEARS - Overview]]) is a score-based method that outputs a specific DAG
  (not a CPDAG) via continuous optimization. NOTEARS Experiments ([[NOTEARS Experiments]])
  benchmarks PC as a baseline.
- **Bayesian Networks** ([[Bayesian Networks Foundational Methodology]]) use d-separation
  (the CI oracle PC assumes) as a first-class concept.
- **DAG Summarization** ([[Summary Causal DAGs]]): the Zeng 2025 approach assumes the DAG
  is given; PC/GES are the methods that *produce* the DAG.

## See Also
- [[Conditional Independence Tests for Structure Learning]] — the CI oracle
- [[Markov Equivalence and CPDAGs]] — the output object and theoretical foundation
- [[GES Algorithm]] — the score-based alternative
- [[DAG Structure Learning Problem]] — background and NP-hardness
- [[NOTEARS - Overview]] — continuous-optimization approach (benchmarks PC)
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, do-calculus
