---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Structure-Learning-Survey.md]]"
source_location: "§2 — Spirtes, Glymour & Scheines (2000) CPS Ch. 5–6; Colombo & Maathuis (2014)"
date_ingested: 2026-07-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - constraint-based causal discovery
  - stable-PC
  - conservative PC
  - Peter-Clark algorithm
  - SGS algorithm
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 2000) is the canonical **constraint-based**
> method for causal structure learning. It discovers the skeleton of a DAG by running **conditional
> independence (CI) tests** on all pairs of variables, then orients edges using v-structure rules
> and Meek's propagation rules to produce a **CPDAG**. PC is consistent in large samples under
> the Markov and faithfulness assumptions, but its skeleton and v-structures depend on the order
> in which variables are processed — the **stable-PC** variant (Colombo & Maathuis, 2014) fixes
> this order-dependence problem.

## Overview

The PC algorithm is the oldest and most widely used structure-learning algorithm, implemented in
virtually every causal discovery software package. It occupies a distinct niche from score-based
methods (GES) and continuous-optimization methods (NOTEARS):

- **Strengths**: model-free (any CI test works, including nonparametric ones); handles nonlinear
  and mixed-type data; interpretable output; scales well on sparse graphs.
- **Weaknesses**: order-dependent in finite samples; CI tests lose power for large conditioning
  sets; less systematic than GES on dense graphs.

The name "PC" refers to **Peter Spirtes and Clark Glymour**, whose 1991 paper introduced the
algorithm. The full treatment is in Chapter 5–6 of *Causation, Prediction, and Search* (CPS).

## Main Content

### Assumptions

> [!definition] Assumption: Markov Condition and Faithfulness
> Let $G$ be the true causal DAG and $P$ the true joint distribution over observed variables.
>
> **Markov condition:** Every $d$-separation relation in $G$ implies a conditional independence
> in $P$: $X \perp_G Y \mid Z \implies X \perp_P Y \mid Z$.
>
> **Faithfulness (Stability):** Every conditional independence in $P$ corresponds to a d-separation
> in $G$: $X \perp_P Y \mid Z \implies X \perp_G Y \mid Z$.
>
> Together: $X \perp_G Y \mid Z \iff X \perp_P Y \mid Z$. Faithfulness closes the gap left by
> the Markov condition alone, and is what allows CI tests to determine graph structure.
^def-assumptions

> [!note] When does Faithfulness fail?
> Faithfulness fails in measure-zero cases: e.g., when two directed paths between $X$ and $Y$
> cancel each other out exactly (path cancellation). This is nongeneric in the sense that small
> parameter perturbations break it — but it can occur in practice with near-cancellations, causing
> PC to delete edges that should exist.

### Phase 1: Skeleton Discovery

> [!definition] Algorithm: Skeleton Discovery (PC Phase 1)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$.
>
> 1. Start with complete undirected graph $C$ on $d$ vertices.
> 2. Initialize $\ell \leftarrow 0$.
> 3. While there exists an adjacent pair $(X_i, X_j)$ in $C$ with $|\text{Adj}(X_i) \setminus \{X_j\}| \geq \ell$:
>    - For each adjacent pair $(X_i, X_j)$ in $C$:
>      - For each subset $S \subseteq \text{Adj}(X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>        - Perform CI test: $X_i \perp\!\!\!\perp X_j \mid S$ at level $\alpha$
>        - If test accepts (p-value $> \alpha$):
>          - Remove edge $(X_i, X_j)$ from $C$
>          - Record $\text{sep}(X_i, X_j) \leftarrow S$
>          - Break (move to next pair)
>    - Increment $\ell \leftarrow \ell + 1$
>
> **Output:** Skeleton $C$ and separation sets $\text{sep}(X_i, X_j)$ for all non-adjacent pairs.
^def-phase1

**Why condition set size increases from 0?** Testing $\ell = 0$ first checks if variables are
marginally independent. Moving to $\ell = 1$ checks if they become independent after conditioning
on one variable. This respects the adjacency structure: if $X_i$ and $X_j$ have $k$ common
neighbors, they might need all $k$ in the conditioning set to be separated.

**Computational cost:** On a sparse true graph with maximum degree $k$, Phase 1 performs at most
$O(d^2 \cdot \binom{d}{k})$ CI tests — polynomial in $d$ for fixed $k$. On dense graphs ($k = O(d)$),
this blows up exponentially.

### Phase 2: V-Structure Orientation

> [!definition] Algorithm: V-Structure Orientation (PC Phase 2)
> For every **unshielded triple** $(X_i, X_k, X_j)$ — where $X_i - X_k - X_j$ in $C$
> and $(X_i, X_j)$ is **not adjacent** — orient the triple as follows:
>
> - If $X_k \notin \text{sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (v-structure).
> - If $X_k \in \text{sep}(X_i, X_j)$: leave $X_i - X_k - X_j$ unoriented.
>
> **Intuition:** If $X_k$ does not separate $X_i$ and $X_j$, and they share $X_k$ as a common
> neighbor, then $X_k$ must be a collider on the path — a v-structure. If $X_k$ does separate
> them, then $X_k$ is either a fork or chain node — not a collider.
^def-phase2

### Phase 3: Meek Rule Propagation

Apply Meek's four orientation rules ([[Markov Equivalence Classes and CPDAGs#^thm-meek-rules]])
exhaustively until no more edges can be oriented. This extends the partial orientation from
v-structures to the full CPDAG.

**Output:** The CPDAG of the Markov equivalence class containing the true DAG.

### Conditional Independence Tests

The choice of CI test is the main modeling decision in PC:

| Data type | CI test | Key statistic |
|-----------|---------|---------------|
| Continuous, Gaussian | Fisher's z-test | $z_{ij\|S} = \frac{1}{2}\ln\frac{1+\hat\rho_{ij\|S}}{1-\hat\rho_{ij\|S}}\sqrt{n-\|S\|-3}$ |
| Discrete | G-test (log-likelihood ratio) | $G = 2\sum_{x,y,s} n_{xys}\ln\frac{n_{xys} n_s}{n_{xs} n_{ys}}$ |
| Nonlinear / nonparametric | Kernel CI test (KCIT) | Permutation test on RKHS statistics |
| Mixed (continuous + discrete) | Conditional distance correlation | Nonparametric; handles all types |

**Fisher's z-test** is by far the most common. Under Gaussian linear SEMs:
$$\hat\rho_{ij|S} = \text{partial correlation of } X_i, X_j \text{ given } X_S$$
Under H₀: $X_i \perp X_j \mid X_S$, the test statistic is $\sim \mathcal{N}(0,1)$.

> [!note] Choosing significance level $\alpha$
> A smaller $\alpha$ means fewer edges deleted → denser estimated skeleton. A larger $\alpha$ means
> more edges deleted → sparser skeleton. Common choices: $\alpha = 0.01$ or $\alpha = 0.05$.
> For high-dimensional settings ($d > n$), a shrinkage estimator for the partial correlations
> (e.g., Meinshausen & Bühlmann, 2006) is recommended.

### Order-Dependence and Stable-PC

A critical practical issue: in finite samples, the **PC algorithm is order-dependent** — the
CPDAG it returns can differ based on the order in which variables are enumerated. This occurs
because:

1. **Skeleton order-dependence:** When testing pair $(X_i, X_j)$ with conditioning sets of size
   $\ell$, the algorithm stops at the first $S$ that yields independence. Different orderings may
   find different $S$ first.
2. **V-structure order-dependence:** Which separation set is recorded as $\text{sep}(X_i, X_j)$
   affects v-structure detection in Phase 2. If the true sep set is $\{Z\}$ but another set
   $\{W\}$ is found first, the presence of $Z$ vs. $W$ determines whether nearby triples become
   v-structures.

> [!definition] Algorithm: Stable-PC (Colombo & Maathuis, 2014)
> Fix order-dependence by **separating the testing and updating phases**:
>
> **Skeleton-stable modification:**
> - In each round of size $\ell$: test ALL pairs $(X_i, X_j)$ with all subsets of size $\ell$
>   **before** removing any edges. Collect all edges to be removed. Only then remove them all
>   simultaneously.
> - This ensures the adjacency structure used for finding conditioning sets is the same for all
>   pairs tested in round $\ell$, regardless of variable order.
>
> **V-structure-stable modification:**
> - Record ALL separation sets (not just the first): $\text{Sep}(X_i, X_j) = \{S : X_i \perp X_j \mid S\text{ passes}\}$.
> - Orient triple $X_i - X_k - X_j$ as v-structure iff $X_k \notin S$ for **at least one** $S \in \text{Sep}(X_i, X_j)$.
>   (The original PC uses "the" separation set; stable-PC uses "any.")
^def-stable-pc

> [!theorem] Order-Independence of Stable-PC (Colombo & Maathuis, 2014, Thm. 2)
> The skeleton and v-structures produced by the stable-PC algorithm are **independent of the
> ordering of variables and of the ordering of conditioning sets** — given the same data and the
> same CI test, the output is unique.
^thm-stable-pc

**Conservative-PC** (Maathuis, Kalisch & Bühlmann, 2009): an even more conservative variant.
Orient triple as v-structure only if $X_k \notin S$ for **every** $S \in \text{Sep}(X_i, X_j)$.
This avoids false v-structures at the cost of potentially missing true ones.

### Consistency and Statistical Properties

> [!theorem] Consistency of PC (Spirtes et al., 2000; Meek, 1995)
> Under the **Markov condition** and **faithfulness**, in the **oracle setting** (correct CI tests):
> PC correctly identifies the CPDAG of the true DAG.
>
> In finite samples with consistent CI tests (e.g., Fisher's z with $\alpha_n \to 0$ at appropriate
> rate): PC is consistent — it returns the true CPDAG with probability → 1 as $n \to \infty$.
^thm-consistency

## Examples

> [!example] PC on a Five-Variable DAG
> **True DAG:** $X_1 \to X_3 \leftarrow X_2$, $X_3 \to X_4$, $X_3 \to X_5$, $X_4 - X_5$ missing
>
> **Phase 1 (sketch):**
> - $\ell=0$: Test all pairs marginally. $X_1 \perp X_2$ marginally (no common cause)? Yes → remove $X_1 - X_2$.
>   $X_4 \perp X_5 \mid \emptyset$? No (both caused by $X_3$) → keep.
> - $\ell=1$: Test $X_4 \perp X_5 \mid X_3$? Yes (d-separated by $X_3$) → remove $X_4 - X_5$;
>   record $\text{sep}(X_4, X_5) = \{X_3\}$.
>
> **Phase 2 (sketch):**
> - Unshielded triple: $X_1 - X_3 - X_2$. Is $X_3 \in \text{sep}(X_1, X_2) = \emptyset$? No →
>   orient as $X_1 \to X_3 \leftarrow X_2$ (v-structure).
>
> **Phase 3:** R2 propagates $X_3 \to X_4$ and $X_3 \to X_5$ via Meek's rules.
^ex-pc-five-var

## Connections

- **Markov Equivalence** ([[Markov Equivalence Classes and CPDAGs]]): PC Phase 1 + 2 uses the
  Verma-Pearl theorem — the separation sets identify v-structures (the distinguishing features of
  equivalence classes).
- **GES** ([[GES - Greedy Equivalence Search]]): the alternative score-based method that avoids
  CI tests and instead searches the CPDAG space directly. In NOTEARS's experiments, PC was
  "significantly weaker" than FGS (the FGES variant of GES) on standard benchmarks.
- **NOTEARS** ([[NOTEARS - Overview]]): the continuous-optimization approach that contrasts with
  PC's combinatorial search — in NOTEARS experiments, PC is benchmarked in the supplement and
  found less competitive than NOTEARS on larger/denser graphs.
- **d-Separation** ([[Directed Acyclic Graphs]]): the CI tests in PC are empirical tests of
  d-separation; the faithfulness assumption ensures these tests recover graph structure.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG structure PC outputs; Meek's rules used in Phase 3
- [[GES - Greedy Equivalence Search]] — score-based alternative; comparison table in raw survey
- [[Directed Acyclic Graphs]] — d-separation, fork/chain/collider — the CI patterns PC tests
- [[DAG Structure Learning Problem]] — context among all causal discovery methods
- [[NOTEARS - Overview]] — the continuous-optimization approach benchmarked against PC
- [[Spurious Association and Confounds]] — v-structures in practice (Berkson's bias = collider bias)
