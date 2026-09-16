---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000) — Causation, Prediction, and Search, 2nd Ed., MIT Press"
source_location: "Ch. 5–6 (skeleton and orientation algorithms)"
date_ingested: 2026-09-16
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 2000) learns a causal DAG's skeleton and
> orientation from observational data using **conditional independence (CI) tests** — without
> assuming a parametric model. Given faithfulness, causal Markov, and causal sufficiency, it
> recovers the **CPDAG** (completed partially directed acyclic graph) representing the unique
> Markov equivalence class of the true DAG, asymptotically. The algorithm's efficiency comes
> from a key insight: the separating set of two non-adjacent variables in the true DAG lies
> among their *adjacent* neighbours, so the search space for CI tests is manageable.

## Overview

Causal structure learning divides into two paradigms: **constraint-based** methods (test CIs,
extract the graph that encodes them) and **score-based** methods (search for the DAG that
maximises a model score). The PC algorithm is the canonical constraint-based method. It is
named after its developers **P**eter Spirtes and **C**lark Glymour.

The algorithm requires three assumptions:

> [!definition] Causal Markov Condition
> Each variable $X_i$ is conditionally independent of its non-descendants given its parents:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i)$$
> This holds for any probability distribution that is *Markovian* with respect to a DAG $\mathcal{G}$.
^def-markov

> [!definition] Faithfulness Assumption
> The only conditional independencies in the joint distribution $P$ are those **entailed** by
> d-separation in the true DAG $\mathcal{G}^*$. No independencies arise by "accidental" cancellation
> of paths. Formally: $X_i \perp\!\!\!\perp X_j \mid S \iff X_i \perp_d X_j \mid S$ in $\mathcal{G}^*$.
^def-faithfulness

> [!definition] Causal Sufficiency
> All common causes of observed variables are themselves observed (no latent confounders,
> no selection bias). This is the assumption violated in, e.g., twin studies or uncontrolled
> observational settings with hidden confounders.
^def-sufficiency

The output is not a DAG but a **CPDAG** — an equivalence class representative encoding which
edges are definitely oriented and which are not identifiable from observational data alone.

## Main Content

### Three Phases of PC

#### Phase 1: Skeleton Learning

**Goal:** Find the *undirected* skeleton — which pairs of variables have any edge between them.

> [!algorithm] Algorithm: PC Skeleton
> 1. Start with the *complete* undirected graph $G$ on $p$ nodes.
> 2. For order $\ell = 0, 1, 2, \ldots$:
>    - For each edge $\{X_i, X_j\}$ in $G$: test $X_i \perp\!\!\!\perp X_j \mid S$
>      for all $S \subseteq \text{Adj}(X_i, G) \setminus \{X_j\}$ with $|S| = \ell$.
>    - If any such $S$ yields $X_i \perp\!\!\!\perp X_j \mid S$: remove edge $\{X_i, X_j\}$
>      and record $\text{SepSet}(X_i, X_j) = S$.
>    - Stop when no remaining edge has $|\text{Adj}(X_i, G)| - 1 \geq \ell$.
^alg-skeleton

The **key efficiency insight**: if $X_i$ and $X_j$ are not adjacent in the true DAG $\mathcal{G}^*$,
then under faithfulness and causal Markov, they are d-separated by some subset of *neighbors* of
$X_i$ (or $X_j$). So CI tests only need subsets of current adjacencies — not all $2^{p-2}$ subsets.
Worst-case complexity remains exponential in the maximum degree, but is far better in sparse graphs.

#### Phase 2: V-Structure Identification

**Goal:** Orient colliders (v-structures, immoralities) — triples $X \to Z \leftarrow Y$ where
$X$ and $Y$ are *not* adjacent. These are the only orientations identifiable from observational data
alone (under faithfulness).

> [!algorithm] Algorithm: V-Structure Orientation
> For each unshielded triple $X - Z - Y$ (X adj to Z, Z adj to Y, X not adj to Y):
> - Orient as $X \to Z \leftarrow Y$ if and only if $Z \notin \text{SepSet}(X, Y)$.
^alg-vstructure

**Intuition:** If we removed the $X$–$Y$ edge because $X \perp\!\!\!\perp Y \mid S$ for some
$S$ not containing $Z$, then conditioning on $Z$ would *activate* the path $X - Z - Y$
(it's a collider) — which would violate the independence. Hence $Z$ is genuinely a collider,
and must be oriented as such.

#### Phase 3: Meek Rules for Edge Orientation

**Goal:** Propagate known orientations to remaining undirected edges, avoiding new v-structures
or directed cycles. The four **Meek rules** (Meek, 1995) are sound and complete:

> [!theorem] Meek Orientation Rules
> Apply the following rules repeatedly until no more edges can be oriented:
>
> **R1 (Acyclicity):** Orient $a - b$ as $a \to b$ if $\exists c$ with $c \to a$ and $c \not\!\!- b$.
> *(If $b \to a$ were true, then $c \to a \leftarrow b$ would be a new v-structure — forbidden.)*
>
> **R2 (Transitivity):** Orient $a - b$ as $a \to b$ if $\exists c$ with $a \to c \to b$.
> *(Otherwise we create the directed cycle $b \to \cdots \to a \to c \to b$.)*
>
> **R3 (Collider path):** Orient $a - b$ as $a \to b$ if $\exists c, d$ with $c \to b \leftarrow d$,
> $c - a$, $d - a$, and $c \not\!\!- d$.
>
> **R4:** Orient $a - c$ as $a \to c$ if $\exists b$ with $b \to c \to d$, $a - b$, $a - d$, $b \not\!\!- d$.
^thm-meek-rules

#### Output: CPDAG

The final output is a CPDAG: a mixed graph in which some edges are directed ($\to$) and some
remain undirected ($-$). Every undirected edge represents an equivalence within the Markov
equivalence class — any consistent orientation of those edges gives a valid DAG fitting the data.

### Conditional Independence Tests

The CI test $X \perp\!\!\!\perp Y \mid S$ must be chosen to match the data-generating process:

| Data type | CI test | Statistic |
|-----------|---------|-----------|
| Gaussian | Fisher's Z (partial correlation) | $Z = \frac{1}{2}\ln\frac{1+\hat{\rho}}{1-\hat{\rho}} \cdot \sqrt{n - |S| - 3}$ |
| Discrete | $G^2$ (likelihood ratio) | $G^2 = 2\sum_{x,y,s} \hat{p}(x,y,s) \ln \frac{\hat{p}(x,y,s)\hat{p}(s)}{\hat{p}(x,s)\hat{p}(y,s)}$ |
| General nonlinear | Kernel-based (KCI, HSIC) | Hilbert-Schmidt independence criterion with kernel ridge regression |

The significance threshold $\alpha$ acts as a sparsity control: smaller $\alpha$ → fewer edges removed
→ denser graph. No principled Bayesian interpretation — it is a frequentist decision rule.

### Order-Dependence and Stable PC

A subtle problem with vanilla PC: the skeleton and v-structures can depend on the **ordering** of
variable pairs tested, because removing an edge changes the adjacency sets used by subsequent tests.
Colombo & Maathuis (2014) introduced **Stable PC** (PC-stable): perform all skeleton tests at each
order $\ell$ using adjacencies from the *beginning* of that order level, producing order-independent
output with the same asymptotic guarantees.

### Theoretical Guarantees

> [!theorem] Consistency of PC (Spirtes et al. 2000; Meek 1995)
> Under causal Markov, faithfulness, causal sufficiency, and a consistent CI test (type-I error
> $\alpha_n \to 0$ and power $\to 1$ as $n \to \infty$), the PC algorithm recovers the CPDAG of
> the true DAG $\mathcal{G}^*$ with probability tending to 1.
^thm-pc-consistency

**Practical caveats:**
- Faithfulness can fail when path coefficients cancel — rare but cannot be detected from data.
- Causal sufficiency fails whenever there are unmeasured confounders — extremely common in
  observational studies (use FCI algorithm instead).
- With $p$ variables and $n$ observations, Fisher's Z test is valid only under Gaussianity;
  for misspecified tests, consistency breaks down.
- High-dimensional settings: Kalisch & Bühlmann (2007) prove consistency of PC under sparse
  graphs even when $p \gg n$ (with suitable $\alpha_n$ shrinking with $n$).

## Examples

> [!example] PC on a Three-Variable Graph
> **Setup:** True DAG is $X \to Z \leftarrow Y$ with $X \perp\!\!\!\perp Y$ (X and Y are
> independent marginals with a common effect Z).
>
> **Phase 1 (Skeleton):**
> Test $X \perp\!\!\!\perp Y \mid \emptyset$: YES (marginally independent). Remove $X - Y$.
> Test $X \perp\!\!\!\perp Z$: NO (Z is a descendant of X). Keep $X - Z$.
> Test $Y \perp\!\!\!\perp Z$: NO. Keep $Y - Z$.
> → Skeleton: $X - Z - Y$.
>
> **Phase 2 (V-structures):**
> Unshielded triple $X - Z - Y$: $\text{SepSet}(X,Y) = \emptyset \not\ni Z$.
> → Orient: $X \to Z \leftarrow Y$. ✓
>
> **Phase 3:** No undirected edges remain.
>
> **Output:** CPDAG = $X \to Z \leftarrow Y$ (fully identified from observational data).

## Connections

- **NOTEARS** ([[NOTEARS - Overview]]): solves the same DAG learning problem but via continuous
  optimization over the full adjacency matrix $W$, bypassing CI tests entirely. NOTEARS assumes
  a linear SEM and Gaussianity; PC makes no such parametric assumption.
- **GES** ([[GES Algorithm]]): score-based alternative operating on the same CPDAG space. GES
  maximizes a decomposable score (BIC); PC tests independence. Both recover the same CPDAG
  asymptotically under faithfulness.
- **DAG reasoning** ([[Directed Acyclic Graphs]]): PC discovers the DAG structure; the DAG is
  then used for d-separation queries, do-calculus, and identification of causal effects.
- **Bayesian networks** ([[BN Construction Methods Comparison]]): PC is one of three main BN
  construction routes — expert knowledge, score-based learning, and CI-based learning (PC).
- **Faithfulness vs. Markov** ([[Spurious Association and Confounds]]): the faithfulness assumption
  ensures the distribution's independence structure is fully determined by d-separation in $\mathcal{G}^*$.
  It fails in degenerate cases (e.g., structural cancellations, deterministic relationships).

## See Also
- [[GES Algorithm]] — score-based alternative that searches CPDAG space directly
- [[DAG Structure Learning Problem]] — the formal combinatorial problem; landscape of methods
- [[NOTEARS - Overview]] — continuous optimization approach to the same problem
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[BN Construction Methods Comparison]] — constraint-based vs. score-based vs. expert-knowledge
- [[Summary Causal DAGs]] — DAG summarization for ABM outputs (structure learning precedes summarization)
