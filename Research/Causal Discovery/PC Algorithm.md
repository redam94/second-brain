---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo-maathuis-2014-PC-SOURCE.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5; Colombo & Maathuis (2014) §2–4"
date_ingested: 2026-09-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Tests for Structure Learning]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[Causal Discovery Algorithms - Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991) is the canonical
> **constraint-based** method for causal structure learning. It recovers the CPDAG
> of a faithful, causally sufficient DAG using only conditional independence tests
> — no parametric model for the joint distribution is required. Phase 1 learns the
> skeleton by systematically testing for conditional independence; Phase 2 orients
> edges to produce the CPDAG. Under faithfulness and causal sufficiency, PC is
> **pointwise consistent**: it recovers the correct CPDAG as $n \to \infty$. The
> **PC-stable** variant (Colombo & Maathuis 2014) removes the algorithm's notorious
> order-dependence.

## Overview

The PC algorithm takes its name from its inventors, Peter Spirtes and Clark Glymour,
whose 1991 paper and 2000 textbook (*Causation, Prediction, and Search*) established it
as the reference algorithm for constraint-based discovery. The key insight is that, under
faithfulness, the conditional independence structure of the data is a **read-off** of the
d-separation structure of the underlying DAG — so one can reconstruct the graph by
systematically testing for independence.

The algorithm is **agnostic about the functional form** of the structural equations: it
makes no parametric assumption beyond access to a reliable CI oracle. This is its key
advantage over score-based methods (GES) in heavily non-Gaussian or non-linear settings.

## Main Content

### Assumptions

> [!definition] Definition: Assumptions for PC Consistency
> The PC algorithm requires three assumptions:
>
> 1. **Causal Markov Condition**: the observed variables satisfy the Markov condition
>    w.r.t. the true underlying DAG $\mathcal{G}^*$.
> 2. **Faithfulness**: all conditional independencies in the distribution are entailed
>    by $\mathcal{G}^*$ (no "accidental" cancellations). See [[Markov Equivalence and CPDAGs#^def-faithfulness]].
> 3. **Causal sufficiency**: there are no latent common causes among observed variables
>    (no unmeasured confounders). Violated sufficiency requires the FCI algorithm instead.
^def-pc-assumptions

### Phase 1: Skeleton learning

**Input**: $n$ i.i.d. observations of $\mathbf{X} = (X_1,\dots,X_d)$, significance level $\alpha$.
**Output**: Undirected skeleton $\mathcal{H}$ and separation sets $\mathrm{Sepset}(i,j)$ for all non-adjacent pairs.

> [!theorem] Algorithm: PC Skeleton Phase
> **Initialise**: $\mathcal{H}$ = complete undirected graph on $d$ nodes; $\ell = 0$.
>
> **Repeat** until no CI test rejects at conditioning-set size $\ell$:
>   For each adjacent pair $(i,j)$ in $\mathcal{H}$:
>     For each subset $\mathbf{Z} \subseteq \mathrm{Adj}(i) \setminus \{j\}$ with $|\mathbf{Z}| = \ell$:
>       If $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ (test accepts at level $\alpha$):
>         Remove edge $i - j$ from $\mathcal{H}$.
>         Set $\mathrm{Sepset}(i,j) = \mathrm{Sepset}(j,i) = \mathbf{Z}$.
>         **Break** (move to next pair).
>   $\ell \leftarrow \ell + 1$.
>
> **Complexity**: $O\bigl(d^{k+2}\bigr)$ CI tests where $k$ = max degree in the skeleton
> (sparse graphs: fast; dense graphs: exponential in $k$). This is the key computational
> bottleneck.
^alg-pc-skeleton

**Key detail**: the conditioning sets grow from size 0 (marginal independence) up to size
$|\mathrm{Adj}(i)| - 1$. Testing marginal independence first is efficient because irrelevant
edges are often removed early, reducing later conditioning-set sizes.

### Phase 2: V-structure orientation

After skeleton learning, edges are oriented by identifying **unshielded colliders** (v-structures).

> [!theorem] Algorithm: V-Structure Identification
> For each triple $(i, k, j)$ such that $i - k - j$ in $\mathcal{H}$ and $i, j$ **not adjacent**:
>   If $k \notin \mathrm{Sepset}(i, j)$:
>     Orient as $i \to k \leftarrow j$ (v-structure / collider).
>
> **Intuition**: if removing the edge $i - j$ was justified by a separating set that does
> **not** include $k$, then $k$ must be a collider on the path $i - k - j$ (conditioning on $k$
> would have *opened* the path and made $i$ and $j$ dependent). See [[Markov Equivalence and CPDAGs#^thm-verma-pearl]].
^alg-vstructures

### Phase 3: Meek orientation rules

Apply Meek's four orientation rules exhaustively to orient remaining undirected edges without
creating new v-structures or cycles. See [[Markov Equivalence and CPDAGs#^thm-meek-rules]].

> [!theorem] Theorem: PC Consistency (Spirtes, Glymour & Scheines 2000, Theorem 5.1)
> Under the Causal Markov Condition, faithfulness, causal sufficiency, and correct CI oracle
> (correct decisions with probability → 1), the PC algorithm is **pointwise consistent**: it
> returns the correct CPDAG of $\mathcal{G}^*$ almost surely as $n \to \infty$.
>
> In finite samples: the type I and type II error rates of the CI tests propagate through
> the algorithm, causing both false edges (type I: declaring dependence when independent)
> and missing edges (type II: declaring independence when dependent).
^thm-pc-consistency

### Order-dependence and PC-stable

The original PC algorithm is **order-dependent**: when multiple conditioning sets of the same
size $\ell$ could separate $i$ and $j$, the algorithm takes the first one found — which
depends on the ordering of variables and adjacencies. Colombo & Maathuis (2014) show this
can produce highly variable results in high-dimensional settings.

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> **PC-stable** modifies Phase 1: instead of immediately removing an edge when a separating
> set is found, it **stores all separating sets** found at level $\ell$ and removes the
> **union of detected edges** at the end of each level (before incrementing $\ell$).
>
> **Effect**: the adjacencies used in forming conditioning sets at level $\ell$ are the
> same for all variable orderings — removing the order-dependence of the skeleton phase.
> PC-stable is **provably order-independent** in the skeleton phase, and produces more
> **reproducible** and **less variable** results in practice, especially for $d \gg n$.
^def-pc-stable

### Conservative PC (CPC)

> [!definition] Definition: Conservative PC (Ramsey et al. 2006)
> In Phase 2, a triple $(i, k, j)$ is oriented as a v-structure $i \to k \leftarrow j$
> **only if $k$ is absent from all** conditioning sets that d-separated $i$ and $j$. If
> $k$ is present in some separating sets and absent from others, the triple is marked as
> **ambiguous** and left unoriented.
>
> CPC avoids false v-structure orientations from conflicting CI tests, at the cost of
> leaving more edges undirected.
^def-cpc

## Examples

> [!example] Example: PC on a Three-Variable Graph
> True DAG: $X_1 \to X_3 \leftarrow X_2$, $X_1$ and $X_2$ non-adjacent.
>
> **Phase 1** ($\ell = 0$): Test $X_1 \perp\!\!\!\perp X_2$. Since $X_1 \not\perp X_2$ (they share
> collider $X_3$ but are correlated if $X_3$ is observed — wait, actually marginal independence
> holds here since $X_3$ is a collider and not conditioned on). **Accept $H_0$**: remove edge
> $X_1 - X_2$. No other edges removed.
>
> **Phase 1** ($\ell = 1$): Test $X_1 \perp\!\!\!\perp X_3 \mid X_2$ and $X_2 \perp\!\!\!\perp X_3 \mid X_1$.
> Both reject (true edges). Skeleton: $X_1 - X_3 - X_2$.
>
> **Phase 2**: Triple $(1, 3, 2)$ with $1, 2$ non-adjacent. $\mathrm{Sepset}(1,2) = \emptyset$,
> and $3 \notin \emptyset$ → orient as $X_1 \to X_3 \leftarrow X_2$. Correct CPDAG recovered.

## Connections

- **GES**: the score-based complement to PC — searches CPDAG space using BIC score.
  See [[Greedy Equivalence Search (GES)]].
- **NOTEARS**: the continuous-optimization approach; avoids CI testing entirely but requires
  a linear SEM assumption. See [[NOTEARS - Overview]].
- **CI tests**: the algorithmic heart of PC; choice of test affects both power and consistency.
  See [[Conditional Independence Tests for Structure Learning]].
- **Software**: `pcalg` (R, Maathuis group), `causal-learn` (Python, causal-discovery-toolbox),
  `Tetrad` (Java, CMU). The `pcalg` implementation defaults to PC-stable and offers
  Fisher's z, G², and KCI tests.

## See Also
- [[Markov Equivalence and CPDAGs]] — what PC returns (a CPDAG)
- [[Conditional Independence Tests for Structure Learning]] — the oracle PC relies on
- [[Greedy Equivalence Search (GES)]] — score-based alternative
- [[Causal Discovery Algorithms - Comparison]] — when to use PC vs. GES vs. NOTEARS
- [[DAG Structure Learning Problem]] — the broader structure learning problem
- [[BN Construction Methods Comparison]] — expert-elicitation vs. data-driven alternatives
