---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/tutorial
source: "[[raw/causal-learn-README.md]]"
source_location: "Package Overview: Constraint-based methods"
date_ingested: 2026-08-09
folder: "Causal Discovery"
doc_type: tutorial
depends_on:
  - "[[Causal Discovery Landscape]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "PC algorithm"
  - "PC causal discovery"
  - "Spirtes Glymour Scheines"
  - "Peter-Clark algorithm"
---

# Constraint-Based Causal Discovery

> [!summary]
> **Constraint-based methods** learn causal structure by treating **conditional independence
> (CI) tests** as constraints: if $X \perp\!\!\!\perp Y \mid S$ in the data, then $X$ and $Y$
> must be d-separated by $S$ in the true DAG. The **PC algorithm** (Spirtes, Glymour &
> Scheines, *Causation, Prediction, and Search*, 2000) is the canonical instance: it performs
> a skeleton-discovery phase (using CI tests to remove edges), then orients edges via
> v-structure detection and Meek orientation rules, returning the CPDAG of the true
> Markov equivalence class in the large-sample limit.

## Overview

Constraint-based discovery exploits the **one-to-one correspondence** between d-separations
in the generating DAG $\mathsf{G}$ and conditional independencies in the distribution $P$
(under Markov + Faithfulness — see [[Causal Discovery Landscape]]). By testing CIs at
increasing conditioning set sizes, the PC algorithm efficiently recovers the skeleton
(undirected version) of the true CPDAG, then orients as many edges as possible without
inducing new CIs or cycles.

The algorithm was introduced by Spirtes & Glymour (1991) and elaborated in the foundational
monograph *Causation, Prediction, and Search* (Spirtes, Glymour & Scheines, 2000, MIT Press).
Software implementations: `pcalg` (R package, Kalisch et al. 2012), `causal-learn` (Python,
py-why/causal-learn on GitHub).

## Main Content

### Phase 1: Skeleton discovery

> [!definition] Definition: Skeleton (PC §1)
> The **skeleton** of a DAG $\mathsf{G}$ is the undirected graph $\mathsf{G}^{\rm skel}$
> obtained by replacing all directed edges with undirected edges. Equivalently, the skeleton
> is the undirected graph whose edges are the pairs $(X_i, X_j)$ that are **not** d-separated
> by any subset $S$ of the remaining variables.
^def-skeleton

The PC algorithm starts from the **complete undirected graph** (all $\binom{d}{2}$ edges)
and removes edges $X_i - X_j$ whenever it finds a **separating set** $S$ such that
$X_i \perp\!\!\!\perp X_j \mid S$.

> [!theorem] Algorithm: PC Skeleton Discovery (Spirtes et al. 2000, Algorithm PC-1)
> **Input**: data on variables $V = \{X_1,\dots,X_d\}$, CI test $\mathcal{T}$ at level $\alpha$
>
> **Initialize**: $\mathsf{H} \leftarrow$ complete undirected graph on $V$; $\mathrm{sep}(i,j) \leftarrow \emptyset$ for all $i,j$; $k \leftarrow 0$
>
> **Repeat** until no edge is removed:
> 1. For each edge $i{-}j$ in $\mathsf{H}$:
>    - Let $\mathrm{adj}(\mathsf{H}, i) = $ current adjacencies of $i$ in $\mathsf{H}$
>    - For each subset $S \subseteq \mathrm{adj}(\mathsf{H}, i)\setminus\{j\}$ with $|S|=k$:
>      - If $\mathcal{T}(X_i \perp\!\!\!\perp X_j \mid X_S)$ rejects at level $\alpha$: remove $i{-}j$, set $\mathrm{sep}(i,j)\leftarrow S$; **break**
> 2. $k \leftarrow k+1$
>
> **Output**: skeleton $\mathsf{H}^*$; separating sets $\mathrm{sep}(\cdot,\cdot)$
^alg-skeleton

**Key efficiency gain**: by incrementing the conditioning set size $k$ from 0, the algorithm
exploits the fact that if $X_i$ and $X_j$ are d-separated at all, they are typically separated
by a small set (e.g. their Markov blankets). Testing larger sets only when smaller ones fail
reduces the total number of CI tests from $O(2^d)$ to $O(d^2 \cdot k_{\max})$ in practice.

### Phase 2: V-structure orientation

After skeleton discovery, some edges can be **oriented** into **v-structures** (colliders
$X \to Z \leftarrow Y$ where $X$ and $Y$ are not adjacent):

> [!definition] Definition: V-structure (Immorality) (Spirtes et al. 2000)
> A **v-structure** (also called *immorality*) is an unshielded triple $X_i \to X_k \leftarrow X_j$
> where $X_i$ and $X_j$ are **not** adjacent. The triple is **unshielded** if there is no
> direct edge between $X_i$ and $X_j$.
^def-vstructure

> [!theorem] Algorithm: V-structure detection (Spirtes et al. 2000, Algorithm PC-2)
> For each unshielded triple $X_i {-} X_k {-} X_j$ (where $X_i$ and $X_j$ are not adjacent):
> - If $X_k \notin \mathrm{sep}(i, j)$: orient as $X_i \to X_k \leftarrow X_j$
> - Else: the triple is a **chain** or **fork** through $X_k$ (not a v-structure)
^alg-vstructure

**Intuition**: if removing $X_k$ from the conditioning set makes $X_i$ and $X_j$
**dependent** (i.e., $X_k \notin \mathrm{sep}(i,j)$), then $X_k$ is a **collider** on
the path $X_i - X_k - X_j$, so both arrows must point into $X_k$.

### Phase 3: Meek orientation rules

After v-structure orientation, some edges remain undirected. The **Meek rules** (Meek 1995)
propagate orientations to orient additional edges without creating new v-structures or cycles:

> [!theorem] Theorem: Meek Orientation Rules (Meek 1995)
> Apply the following rules repeatedly until no new edge can be oriented:
>
> - **R1** (Avoid new v-structure): If $X_i \to X_k {-} X_j$ and $X_i, X_j$ not adjacent,
>   then orient $X_k \to X_j$ (to avoid creating a new v-structure at $X_k$).
> - **R2** (Acyclicity): If $X_i \to X_k \to X_j$ and $X_i {-} X_j$, orient $X_i \to X_j$
>   (to avoid creating a cycle if $X_j \to X_i$ were chosen).
> - **R3** (Double v-structure avoidance): If $X_i {-} X_k \to X_j$, $X_i {-} X_l \to X_j$,
>   $X_i {-} X_j$, and $X_k, X_l$ not adjacent, orient $X_i \to X_j$.
> - **R4**: An additional rule handles the case where a chain with two colliders forces an orientation.
>
> **Output**: CPDAG — the Markov equivalence class of the true DAG.
^thm-meek-rules

### Soundness and completeness

> [!theorem] Theorem: PC Consistency (Spirtes, Glymour & Scheines 2000; Kalisch & Bühlmann 2007)
> Under the Causal Markov condition, Faithfulness, and Causal Sufficiency, in the limit of
> infinite sample size ($n\to\infty$) with consistent CI tests, the PC algorithm returns the
> CPDAG of the true generating DAG with probability 1.
>
> Under high-dimensional asymptotics ($d=d(n)\to\infty$ faster than $n$), with Gaussian CI
> tests using partial correlation / Fisher's $z$-test, PC is consistent if the true graph is
> **sparse** (bounded maximum degree) and $\log d = o(n^{1/3})$ (Kalisch & Bühlmann 2007).
^thm-pc-consistency

### Conditional independence tests

The choice of CI test is data-dependent:

| Data type | CI test | Statistic |
|-----------|---------|-----------|
| Continuous, Gaussian | Fisher's $z$-test on partial correlation | $z = \frac{1}{2}\log\frac{1+\hat\rho_{ij|S}}{1-\hat\rho_{ij|S}} \sim N(0, (n-|S|-3)^{-1})$ |
| Continuous, non-Gaussian | Kernel-based CI test (HSIC), distance correlation | Non-parametric |
| Discrete / categorical | $\chi^2$ test, $G$-test | $G^2 = 2\sum O \log(O/E)$ |
| Mixed | Mixed conditional independence tests | Depends on variable types |

## Examples

> [!example] Example: PC algorithm on a 4-variable DAG
> **True DAG**: $A \to B \to D$, $C \to B$, $A \to D$.
> **True v-structure**: $A - B \leftarrow C$ (unshielded triple $A, B, C$ with $B$ as collider)
>
> **Phase 1 — Key CI test result**: $A \perp\!\!\!\perp C \mid B$? NO (B is a collider, conditioning
> opens the path). $A \perp\!\!\!\perp C \mid \emptyset$? YES (d-separated with empty set).
> → Remove edge $A - C$; $\mathrm{sep}(A,C) = \emptyset$.
>
> **Phase 2 — V-structure**: Triple $A - B - C$, unshielded ($A,C$ not adjacent).
> $B \notin \mathrm{sep}(A,C) = \emptyset$ → orient $A \to B \leftarrow C$.
>
> **Phase 3 — Meek R1**: $A \to B \to D$ and $A - D$ with $A,D$ adjacent → orient $A \to D$.
>
> **Result CPDAG**: $A \to B \leftarrow C$, $B \to D$, $A \to D$.

## Connections

- **vs. GES** ([[GES - Greedy Equivalence Search]]): GES optimizes a score over CPDAGs;
  PC tests CIs. In practice, score-based methods often outperform PC in finite samples
  because BIC is more robust than CI tests to sampling error.
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS sidesteps the Markov equivalence
  class entirely, learning a specific DAG via continuous optimization. NOTEARS treats PC
  as a baseline in experiments.
- **FCI extension**: PC assumes causal sufficiency; **FCI** (Fast Causal Inference) drops
  this and handles hidden common causes, outputting a **PAG** (Partial Ancestral Graph).
- **d-separation** is defined in [[Directed Acyclic Graphs]]; the Markov blanket and
  faithfulness assumptions are elaborated there.
- [[Spurious Association and Confounds]] covers the fork/pipe/collider patterns (v-structures
  are the collider pattern) from a causal inference perspective.

## See Also
- [[Causal Discovery Landscape]] — overview comparing PC, GES, NOTEARS
- [[GES - Greedy Equivalence Search]] — score-based alternative
- [[DAG Structure Learning Problem]] — formal problem and NP-hardness
- [[Directed Acyclic Graphs]] — d-separation, Markov condition fundamentals
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicitation alternative to data-driven structure learning
