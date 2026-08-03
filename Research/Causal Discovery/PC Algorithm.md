---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Part 2 — The PC Algorithm"
date_ingested: 2026-08-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - PC algorithm
  - Peter-Clark algorithm
  - constraint-based causal discovery
  - PC-stable
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** causal structure learning algorithm. It recovers the CPDAG of
> the true data-generating DAG by (1) removing edges via conditional independence (CI) tests,
> (2) orienting v-structures from separation sets, and (3) applying Meek's rules. Under
> Causal Markov + Faithfulness + Causal Sufficiency, PC is consistent. Its main practical
> weaknesses are order-dependence in the original formulation (fixed by **PC-stable**, Colombo
> & Maathuis 2014) and exponential complexity in the maximum variable degree.

## Overview

PC stands for **P**eter Spirtes and **C**lark Glymour, the algorithm's inventors. It is the
most widely implemented constraint-based structure learner and a standard baseline in every
causal discovery benchmark. NOTEARS (Zheng et al. 2018) explicitly benchmarks against PC as
one of its main comparators — see [[NOTEARS Experiments]].

The algorithm's logic is elegant: under faithfulness, two variables are d-separated given $S$
if and only if they are conditionally independent given $S$ in the distribution. By testing all
possible separation sets, PC can reconstruct the skeleton. By examining which node is *not*
in the separation set of a non-adjacent pair, PC can orient v-structures.

## Main Content

### Three assumptions

> [!definition] Definition: Causal Markov Condition
> A variable $X_i$ is conditionally independent of all its non-descendants given its parents
> $\text{pa}(X_i)$ in the causal DAG $G$:
> $$X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{pa}(X_i).$$
> Equivalently: the joint distribution $P$ is Markov with respect to $G$.
^def-causal-markov

> [!definition] Definition: Faithfulness (Causal Faithfulness Condition)
> Every conditional independence in $P$ is implied by a d-separation in $G$ — there are no
> "accidental" independences from exact parameter cancellations. Formally: $X \perp\!\!\!\perp Y \mid S$
> in $P$ if and only if $X \perp_d Y \mid S$ in $G$.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> There are no hidden common causes: every common cause of any two observed variables is also
> observed. Equivalently, all confounders are measured. (Relaxing this requires FCI instead of PC.)
^def-causal-sufficiency

### Phase 1 — Skeleton recovery

**Input**: A dataset $D$ with $d$ variables. A significance level $\alpha$ for CI tests.

1. Start with the **complete undirected graph** $C^0$ on $d$ nodes.
2. Initialise the separation set $\text{sep}(X,Y) = \varnothing$ for all pairs.
3. For $k = 0, 1, 2, \ldots$ until no edge can be removed:
   - For each adjacent pair $(X, Y)$ in the current graph $C^{k}$:
     - For each $S \subseteq \text{adj}(X, C^k) \setminus \{Y\}$ with $|S| = k$:
       - Perform CI test: $X \perp\!\!\!\perp Y \mid S$?
       - If yes (test passes at level $\alpha$): remove edge $X - Y$; set $\text{sep}(X,Y) = S$; break.
4. Output: skeleton $\hat{C}^{\text{skel}}$ and separation sets $\{\text{sep}(X,Y)\}$.

> [!note] Computational complexity
> The number of CI tests is $O(d^2 \cdot d^{k_{\max}})$ where $k_{\max}$ is the maximum
> degree in the true skeleton. For sparse graphs (bounded degree), this is polynomial in $d$.
> For dense graphs, it is exponential. This is PC's main scalability bottleneck.

### Phase 2 — V-structure orientation

For each unshielded triple $X - Z - Y$ (X and Y are non-adjacent):
- If $Z \notin \text{sep}(X,Y)$: orient as $X \to Z \leftarrow Y$ (Z is a **collider** / v-structure).
- If $Z \in \text{sep}(X,Y)$: leave as $X - Z - Y$ (Z is a **non-collider**).

The logic: if Z is *not* in the set that made X and Y independent, then conditioning on Z
"activates" the path (collider logic), meaning Z must be a collider.

### Phase 3 — Meek's orientation rules

Apply Meek's rules R1–R4 exhaustively (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]])
to orient remaining undirected edges without creating new v-structures or directed cycles.

**Output**: A CPDAG representing the Markov equivalence class of the true DAG.

### Order-dependence and PC-stable

> [!warning] Order-dependence in original PC
> The original PC algorithm is **order-dependent**: the skeleton output can vary depending on
> the ordering of variables and edges because the adjacency set $\text{adj}(X)$ is updated
> as edges are removed during skeleton recovery. A CI test that would have been performed in
> one variable order may be skipped in another because the edge was already removed.
^warn-order-dependence

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> **PC-stable** fixes order-dependence by separating adjacency-set computation from edge
> removal:
> - In each iteration $k$: compute **all** CI tests using adjacency sets from the *beginning*
>   of that iteration.
> - After all tests for iteration $k$ are done: remove all edges whose tests passed.
>
> This ensures that the same adjacency sets are used for all tests within an iteration,
> making the skeleton output **invariant to variable order**. Colombo & Maathuis (2014)
> also provide an order-independent majority-rule voting procedure for v-structure orientation.
^def-pc-stable

### Consistency

> [!theorem] Theorem: PC Consistency (Spirtes et al. 2000; Colombo & Maathuis 2014)
> Under Causal Markov + Faithfulness + Causal Sufficiency, with a consistent CI test (i.e.,
> one that converges to the correct answer as $n \to \infty$), PC-stable returns the CPDAG
> of the true data-generating DAG with probability approaching 1 as $n \to \infty$.
^thm-pc-consistency

### Practical CI tests

| Data type | Standard CI test | Notes |
|-----------|-----------------|-------|
| Gaussian (linear) | Partial correlation + Fisher z-test | Exact under normality; robust for large n |
| Discrete | Chi-squared / G-test | Requires adequate cell counts |
| Mixed / nonparametric | Kernel-based (HSIC), distance correlation | Slower; use for non-Gaussian or non-linear |
| Time series | CCM (convergent cross-mapping), conditional transfer entropy | For dynamical systems |

### Limitations and extensions

| Issue | Approach |
|-------|---------|
| Hidden common causes | **FCI** (Fast Causal Inference) — outputs PAG instead of CPDAG |
| Selection bias | **FCI** with background knowledge |
| Order-dependence | **PC-stable** (Colombo & Maathuis 2014) |
| High dimensions | **RFCI** (really fast causal inference) — skips some tests |
| Time series | **PCMCI** (Runge et al. 2019) — conditions on time-lagged parents |

## Examples

> [!example] Example: 4-variable DAG recovery
> **True DAG**: $A \to B \to C \leftarrow D$, $A - C$ edge absent, $A - D$ edge absent.
>
> **Skeleton phase** ($k=0$): Test all pairs unconditionally. $A \perp\!\!\!\perp D$? Yes → remove $A-D$.
> $B \perp\!\!\!\perp D$? No. All other pairs also pass at $k=0$ or fail at $k=0$.
>
> **$k=1$**: $A \perp\!\!\!\perp C \mid B$? Yes (B blocks the path $A \to B \to C$) → remove $A-C$.
>   sep$(A,C) = \{B\}$. Similarly check remaining pairs.
>
> **Skeleton**: $A - B - C - D$ (path graph), no $A-C$ or $A-D$ edges.
>
> **V-structure phase**: Unshielded triple $A - B - D$? No — $B$ and $D$ are adjacent.
>   Unshielded triple $A - C - D$: $C \notin \text{sep}(A,D) = \varnothing$ (if $A \perp\!\!\!\perp D$ with
>   empty set) — but $A$ and $C$ are not adjacent. Consider triple $B - C - D$:
>   $C \notin \text{sep}(B,D) = ?$. If $B \perp\!\!\!\perp D \mid \{C\}$? Let's say yes → sep$(B,D) = \{C\}$.
>   Then $C \in$ sep$(B,D)$, so $B - C - D$ is not a collider at $C$.
>   Now triple $A - B - \text{?} - D$: need to find all unshielded triples.
>   The true collider $B \to C \leftarrow D$: sep$(B,D) = ?$ If $B$ and $D$ not adjacent and
>   $C \notin \text{sep}(B,D)$, orient $B \to C \leftarrow D$.
^ex-pc-recovery

## Connections

- **NOTEARS comparison**: NOTEARS benchmarks against PC in [[NOTEARS Experiments]]; PC
  performs well on sparse graphs but is outperformed by NOTEARS on dense/large graphs.
- **Score-based alternative**: [[GES - Greedy Equivalence Search]] is the score-based
  counterpart; GES avoids the CI testing paradigm entirely, using BIC instead.
- **ABM context**: PC could be applied to ABM output data to recover the causal structure
  among ABM variables — see [[Approximate Bayesian Computation for ABMs]] for the
  complementary Bayesian calibration perspective.
- **Expert elicitation**: [[LLM Expert Elicitation for Bayesian Networks]] elicits the DAG
  from domain knowledge; PC learns it from data. The two approaches are complementary.
- **BN construction**: [[BN Construction Methods Comparison]] surveys approaches including
  data-driven structure learning — PC is the canonical constraint-based entry there.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAGs, Verma-Pearl theorem, Meek's rules (prerequisites)
- [[GES - Greedy Equivalence Search]] — score-based alternative; both output CPDAGs
- [[DAG Structure Learning Problem]] — problem formulation and landscape of all approaches
- [[NOTEARS - Overview]] — continuous optimization alternative (already in vault)
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion used for causal inference
- [[BN Construction Methods Comparison]] — broader survey of Bayesian network construction
