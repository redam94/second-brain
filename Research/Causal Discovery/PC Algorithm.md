---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.pdf]]"
source_location: "§2.4 Background; Spirtes, Glymour & Scheines (2000), Ch. 5-6"
date_ingested: 2026-10-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based structure learning"
  - "PC-stable"
  - "skeleton phase"
  - "faithfulness assumption"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** algorithm for causal structure learning. It recovers the
> Markov equivalence class of the true DAG from i.i.d. observational data by: (1) building
> the **skeleton** via conditional independence (CI) tests — starting from a complete graph
> and removing edges when a separating set is found; (2) orienting **v-structures** (unshielded
> colliders); and (3) applying **Meek's rules** to propagate orientations. Under faithfulness,
> PC is asymptotically consistent. Its key weakness is sensitivity to CI testing errors,
> which can propagate through the graph.

## Overview

The PC algorithm (named after its creators **P**eter Spirtes and **C**lark Glymour) is the
foundational algorithm in the **constraint-based** paradigm for causal structure learning.
Unlike score-based methods ([[GES Algorithm]], [[NOTEARS - Overview]]) which evaluate a
statistical score for each candidate structure, PC tests **conditional independence (CI)
relations** in the data and uses the results to constrain the set of possible DAGs.

The algorithm exploits the **Markov property**: in a DAG, $X \perp Y \mid \mathbf{S}$ if
$\mathbf{S}$ d-separates $X$ and $Y$ (see [[Directed Acyclic Graphs]]). The faithfulness
assumption guarantees the converse: every observed CI corresponds to a d-separation in the
true DAG. Together, these mean that the pattern of CI relations uniquely determines the
Markov equivalence class of the true DAG (up to identifiability limits).

## Main Content

### The faithfulness assumption

> [!definition] Definition: Faithfulness (Spirtes, Glymour & Scheines 2000)
> A joint distribution $\mathbb{P}$ is **faithful** to DAG $\mathcal{G}$ if every
> conditional independence that holds in $\mathbb{P}$ is entailed by d-separation in
> $\mathcal{G}$. Formally:
> $$X \perp_{\mathbb{P}} Y \mid \mathbf{S} \implies X \perp_{\mathcal{G}} Y \mid \mathbf{S}
> \quad \text{(d-separation in } \mathcal{G})$$
>
> Faithfulness rules out **accidental cancellations**: path coefficients that happen to cancel
> in the joint distribution, creating a CI not implied by the graph structure.
> Without faithfulness, CI tests cannot distinguish structural absences from accidental zeros.
>
> **Faithfulness is violated** when, e.g., two paths from $X$ to $Y$ cancel each other out
> in a linear SEM (positive coefficient on one path, negative on another). This is a
> Lebesgue-measure-zero event for generic parameter choices, so faithfulness holds "almost
> everywhere."
^def-faithfulness

### Algorithm: Skeleton phase

The first phase builds the **skeleton** — the undirected graph indicating which pairs of
variables have a direct connection in the true DAG.

> [!definition] Definition: Skeleton Discovery (PC Algorithm, Phase 1)
> **Input:** Variables $\mathbf{V} = \{X_1, \ldots, X_d\}$, data $\mathbf{X}$, significance
> level $\alpha$, CI oracle $\perp_\alpha$.
>
> **Output:** Skeleton $\mathcal{S}$ (undirected graph) + separating sets
> $\text{Sepset}(X_i, X_j)$ for each removed edge.
>
> **Algorithm:**
> 1. Initialize: set $\mathcal{G} \leftarrow K_d$ (complete undirected graph on $d$ nodes).
>    Set $l \leftarrow -1$.
> 2. **Repeat** $l \leftarrow l + 1$:
>    - For each ordered pair of adjacent nodes $(X, Y)$ in $\mathcal{G}$:
>      - Let $\text{Adj}(X, \mathcal{G}) \setminus \{Y\}$ be the current adjacencies of $X$
>        excluding $Y$.
>      - For each subset $\mathbf{S} \subseteq \text{Adj}(X, \mathcal{G}) \setminus \{Y\}$
>        with $|\mathbf{S}| = l$:
>        - If $X \perp_\alpha Y \mid \mathbf{S}$ (CI test accepts at level $\alpha$):
>          - Remove edge $X - Y$ from $\mathcal{G}$.
>          - Set $\text{Sepset}(X, Y) \leftarrow \text{Sepset}(Y, X) \leftarrow \mathbf{S}$.
>          - Break (move to next pair).
> 3. **Until** no edge was removed at order $l$.
> 4. **Return** $\mathcal{G}$, $\{\text{Sepset}(X,Y)\}$.
>
> **Key invariant:** At order $l$, we test all possible conditioning sets of size $l$. The
> algorithm is correct because if $X$ and $Y$ are d-separated in the true DAG by some set
> $\mathbf{S}$, then $|\mathbf{S}|$ is bounded by the maximum degree of the true skeleton,
> so eventually $\mathbf{S}$ will be tested.
^def-pc-skeleton

**Complexity:** The skeleton phase makes at most $\binom{d}{2} \cdot \sum_{k=0}^{d-2}\binom{d-2}{k}$
CI tests, which in the worst case (dense graph) is exponential in $d$. In practice, sparse
graphs dramatically reduce the number of tests since the adjacency sets shrink quickly.

### Algorithm: Orientation phase

Given the skeleton and separating sets, the algorithm orients v-structures and then
propagates orientations using Meek's rules.

> [!definition] Definition: V-Structure Orientation (PC Algorithm, Phase 2)
> For each **unshielded triple** $(X, Z, Y)$ — that is, $X - Z - Y$ in the skeleton and
> $X \not\sim Y$:
>
> - If $Z \notin \text{Sepset}(X, Y)$: orient as $X \to Z \leftarrow Y$ (a **v-structure**).
> - If $Z \in \text{Sepset}(X, Y)$: leave $X - Z - Y$ unoriented (Z *blocks* the path,
>   consistent with Z being a non-collider).
>
> **Intuition:** The separating set $\text{Sepset}(X,Y)$ is the set that makes $X \perp Y$
> conditional on it. If $Z$ is *not* in the separating set, then conditioning on $Z$ does
> *not* create the independence — this is precisely the collider (v-structure) signature,
> where conditioning on Z creates dependence. If $Z$ *is* in the separating set, then $Z$
> is a non-collider on the path (either chain $X \to Z \to Y$ or fork $X \leftarrow Z \to Y$).
^def-pc-orient-v

> [!definition] Definition: Meek Rule Propagation (PC Algorithm, Phase 3)
> Apply Meek's orientation rules R1–R3 (see [[Markov Equivalence Classes and CPDAGs]]) to the
> PDAG produced by Phase 2, exhaustively until no further edges can be oriented.
>
> **Output:** The **CPDAG** representing the Markov equivalence class of the true DAG.
^def-pc-meek

### Consistency theorem

> [!theorem] Theorem: PC Consistency (Spirtes, Glymour & Scheines 2000)
> Under the following assumptions:
> 1. The data is i.i.d. from a distribution $\mathbb{P}$ that is **Markov** with respect to
>    some DAG $\mathcal{G}^*$ over $\mathbf{V}$.
> 2. $\mathbb{P}$ is **faithful** to $\mathcal{G}^*$.
> 3. Conditional independence tests are **correct** (type I error $\to 0$, type II error $\to 0$
>    as $n \to \infty$).
>
> Then as $n \to \infty$, the PC algorithm returns the CPDAG of $\mathcal{G}^*$ with
> probability 1.
^thm-pc-consistency

**Sufficient CI tests for consistency:**
- **Gaussian data:** Fisher's $z$-test for partial correlations (Kalisch & Bühlmann 2007
  show PC is consistent even in high-dimensional settings $d \gg n$ when the graph is sparse).
- **Discrete data:** $G^2$ test or $\chi^2$ test for discrete conditional independence.
- **Nonparametric:** Kernel-based HSIC test, or distance correlation; these require larger
  samples for good power.

### PC-stable: the order-independent variant

A practical problem with the original PC algorithm: the order in which edges are tested
in the skeleton phase can affect the adjacencies found (especially in finite samples),
since removing an edge changes the adjacency set used for later tests.

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> **PC-stable** modifies the skeleton phase to use the adjacency sets from the *start* of
> each level $l$, rather than updating them as edges are removed mid-level. Specifically:
>
> - At the start of each level $l$, fix the adjacency sets $\text{Adj}^{(l)}(X)$ for all
>   nodes.
> - For all pairs $(X,Y)$ at level $l$, use $\text{Adj}^{(l)}(X)$ and $\text{Adj}^{(l)}(Y)$
>   to generate conditioning sets — even when edges have been removed during level $l$.
>
> This makes the skeleton output **order-independent**: the same skeleton is returned
> regardless of the order in which edges are tested. PC-stable is now the standard
> implementation in `pcalg` (R) and `causal-learn` (Python).
^def-pc-stable

## Practical considerations

| Aspect | Detail |
|--------|--------|
| **CI test significance level** $\alpha$ | Lower $\alpha$ → sparser graph (more edges removed); higher $\alpha$ → denser graph. Typical: $\alpha \in \{0.01, 0.05\}$. |
| **Maximum conditioning set size** | Can cap at $l_{\max}$ for computational feasibility; PC with $l_{\max}=0$ recovers only marginal dependence. |
| **Error propagation** | A false edge removal in the skeleton means the separating set may be wrong, which corrupts v-structure detection — errors compound. |
| **High dimensions** | The number of CI tests grows as $O(d^{l_{\max}+2})$; for large $d$, use sparse-graph assumptions and PC-stable. |
| **Software** | `pcalg::pc()` (R), `causal-learn` (Python, successor to Causal Discovery Toolbox); TETRAD (Java, GUI). |

## Connections

- **[[GES Algorithm]]**: GES is the score-based alternative. GES searches the same CPDAG
  space as PC but using a decomposable score rather than CI tests. GES is generally more
  accurate on small-to-medium samples where CI test power is limited.
- **[[NOTEARS - Overview]]**: NOTEARS is a continuous optimization approach that does not
  output a CPDAG but rather a DAG. Chickering (2002) shows that NOTEARS-style methods
  belong to a broader class of algorithms that the DAG structure learning literature compares
  to PC and GES.
- **[[Markov Equivalence Classes and CPDAGs]]**: PC's output is a CPDAG; understanding
  what it means is prerequisite to interpreting PC results.
- **[[Directed Acyclic Graphs]]**: d-separation, which underlies the faithfulness assumption,
  is defined in terms of DAG structure (see [[Directed Acyclic Graphs]]).

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the graphical object PC outputs
- [[GES Algorithm]] — the score-based alternative, more efficient and consistent
- [[DAG Structure Learning Problem]] — formal problem setup
- [[NOTEARS Experiments]] — empirical comparison of PC against NOTEARS and GES (FGS)
- [[Directed Acyclic Graphs]] — d-separation and causal DAG semantics
- [[Causal Discovery/_Index|Causal Discovery Index]]
