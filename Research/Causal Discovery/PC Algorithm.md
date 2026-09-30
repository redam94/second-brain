---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed. (MIT Press); Spirtes & Glymour (1991); Kalisch & Bühlmann (2007) — PDFs not cached (proxy restriction; SGS book at MIT Press; Kalisch 2007 at DOI:10.18637/jss.v022.i11)"
source_location: "SGS (2000) Chs. 5–6; Kalisch & Bühlmann (2007) §2–3"
date_ingested: 2026-09-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm"
  - "constraint-based causal discovery"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after its inventors **P**eter Spirtes and **C**lark Glymour,
> 1991) is the foundational **constraint-based causal discovery** method. It recovers the
> **skeleton** of a DAG by performing conditional independence (CI) tests at increasing
> conditioning set size, then orients edges by detecting v-structures and propagating
> orientations via Meek's rules. Output is a **CPDAG** representing the Markov equivalence
> class of the true DAG. Assumes faithfulness, Causal Markov, and causal sufficiency.

## Overview

Constraint-based structure learning proceeds by a separation of concerns:
1. **Skeleton recovery**: determine which pairs of variables are *directly* connected (not
   conditionally independent given any subset of other variables).
2. **Orientation**: given the skeleton, determine which edges can be oriented from observational
   data using v-structure patterns and Meek's propagation rules.

PC implements this separation efficiently by exploiting **Markov blanket sparsity**: for sparse
graphs with maximum degree $k_{\max}$, only conditioning sets of size $\leq k_{\max}$ need to be
tested, reducing exponential CI tests to polynomial.

> [!note] Name and origin
> "PC" stands for **P**eter Spirtes and **C**lark Glymour. The algorithm was first published in
> Spirtes & Glymour (1991) and formally analyzed in Spirtes, Glymour & Scheines (2000)
> *Causation, Prediction, and Search* (SGS), the foundational text of constraint-based causal
> inference. It is also implemented in the `pcalg` R package (Kalisch & Bühlmann 2007).

## Main Content

### Inputs and assumptions

> [!definition] Definition: PC Algorithm Inputs and Assumptions
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$ ($n$ observations of $d$ variables).
> A **CI oracle** (or CI test) $\mathcal{I}(X_i, X_j \mid \mathbf{S})$ that returns a binary
> decision: $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ or not.
>
> **Assumptions:**
> - **Causal Markov Condition**: the distribution $\mathbb{P}$ is Markov to the true DAG $\mathsf{G}^*$
> - **Faithfulness**: all CIs in $\mathbb{P}$ arise from d-separation in $\mathsf{G}^*$
> - **Causal Sufficiency**: no hidden common causes
>
> **Output:** CPDAG $\mathcal{C}(\mathsf{G}^*)$ (see [[Markov Equivalence Classes and CPDAGs]])
^def-pc-inputs

### Phase 1: Skeleton recovery

> [!definition] Definition: PC Skeleton Recovery Algorithm (SGS §5.4)
> **Input:** $d$ variables, CI test $\mathcal{I}$.
>
> 1. Initialize $\mathsf{H}$ as the **complete undirected graph** on $d$ nodes.
>    Initialize the separation set $\mathrm{sep}(X_i, X_j) = \varnothing$ for all pairs.
>
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X_i, X_j)$ in $\mathsf{H}$:
>      - Let $\mathrm{Adj}(X_i) = $ adjacents of $X_i$ in current $\mathsf{H}$, excluding $X_j$.
>      - For each $\mathbf{S} \subseteq \mathrm{Adj}(X_i)$ with $|\mathbf{S}| = \ell$:
>        - If $\mathcal{I}(X_i, X_j \mid \mathbf{S})$ holds: remove edge $(X_i, X_j)$,
>          set $\mathrm{sep}(X_i, X_j) = \mathrm{sep}(X_j, X_i) = \mathbf{S}$. Break inner loop.
>    - If no edge was removed in this round, stop.
>
> **Output:** Skeleton (undirected graph $\mathsf{H}$) and separation sets $\mathrm{sep}(\cdot,\cdot)$.
^def-skeleton-recovery

> [!note] Efficiency via sparsity
> The key efficiency gain: edges are tested with conditioning sets drawn from
> **current adjacencies in $\mathsf{H}$**, not all possible subsets of $d-2$ variables.
> For a graph with maximum degree $k_{\max}$, Phase 1 requires at most
> $O\!\left(d^2 \binom{k_{\max}}{k_{\max}}\right) = O(d^2 k_{\max}^{k_{\max}})$ CI tests.
> For sparse graphs ($k_{\max} = 3$–$5$), this is polynomial in $d$.

### Phase 2: V-structure orientation

Given the skeleton $\mathsf{H}$ and separation sets, orient v-structures:

> [!definition] Definition: V-Structure Orientation Rule
> For each **unshielded triple** $X_i - X_k - X_j$ in $\mathsf{H}$ (meaning $X_i$ and $X_j$
> are **not** adjacent), orient as the v-structure (unshielded collider)
> $$X_i \to X_k \leftarrow X_j$$
> if and only if $X_k \notin \mathrm{sep}(X_i, X_j)$.
>
> **Intuition:** If $X_k$ was not used to explain away the dependence between $X_i$ and $X_j$
> (i.e., $X_k \notin \mathrm{sep}(X_i, X_j)$), then conditioning on $X_k$ would *create*
> dependence (explaining $X_k$'s common causes) — the signature of a collider.
^def-vstructure-rule

### Phase 3: Meek's orientation rules

After orienting v-structures, apply **Meek's rules** (Meek, 1995) iteratively to orient
remaining undirected edges without introducing new v-structures or cycles.
The rules are applied until no more edges can be oriented.

> [!theorem] Meek's Orientation Rules (Meek 1995)
> Let $\mathsf{H}$ be a partially directed graph with directed and undirected edges.
>
> **R1 (Tail to head, avoid v-structure):** If $A \to B - C$ and $A, C$ are non-adjacent,
> orient $B \to C$. (Otherwise $A \to B \leftarrow C$ would be a new v-structure.)
>
> **R2 (Acyclicity):** If $A \to B \to C$ and $A - C$, orient $A \to C$.
> (Otherwise $C \to A$ plus the chain would create a directed cycle.)
>
> **R3 (Double non-adjacent):** If $A - B \to C$, $A - D \to C$, $A - C$, and
> $B, D$ are non-adjacent, orient $A \to C$.
>
> **R4 (Chain):** If $A - B \to C \to D$ and $A - C$, $A, D$ non-adjacent, orient $A \to B$.
>
> Meek proved that R1–R4 are **complete**: applying them to exhaustion from the
> skeleton + v-structures yields the unique CPDAG.
^thm-meek-rules

### Algorithm summary

> [!definition] Definition: PC Algorithm (Full Pseudocode)
> **Phase 1** — Skeleton recovery:
> See [[#^def-skeleton-recovery]].
>
> **Phase 2** — Orient v-structures:
> For each unshielded triple $X_i - X_k - X_j$:
> if $X_k \notin \mathrm{sep}(X_i, X_j)$, orient $X_i \to X_k \leftarrow X_j$.
>
> **Phase 3** — Meek propagation:
> Repeat until convergence: apply R1, R2, R3, R4 ([[#^thm-meek-rules]]).
>
> **Output:** CPDAG over the $d$ variables.
^def-pc-full

### Consistency

> [!theorem] Theorem: PC Consistency (SGS 2000)
> In the limit $n \to \infty$ with an asymptotically consistent CI test (e.g., Fisher's
> Z-transform for Gaussian data, kernel-based KCI for non-linear data), the PC algorithm
> returns the true CPDAG $\mathcal{C}(\mathsf{G}^*)$ under Causal Markov + Faithfulness +
> Causal Sufficiency.
^thm-pc-consistency

### Conditional independence tests in practice

The CI test in Phase 1 is a plugin — any consistent test can be used:

| Data type | CI test | Notes |
|-----------|---------|-------|
| Continuous, linear, Gaussian | Fisher's $Z$ transform | $z = \frac{1}{2}\log\frac{1+\hat{\rho}}{1-\hat{\rho}}$, test $H_0: \rho_{\mathrm{partial}} = 0$ |
| Discrete / categorical | $\chi^2$ or $G^2$ test | Standard contingency table tests |
| Non-linear, non-Gaussian | Kernel CI test (KCI) | Hsic-based, Zhang et al. (2012) |
| Mixed | Mixed CI tests | PCMci for time series; mixed graphical models |

The **significance level $\alpha$** controls the false-positive/false-negative tradeoff:
- Small $\alpha$: fewer edges removed (denser graph, more false positives in skeleton).
- Large $\alpha$: more edges removed (sparser graph, risk missing true edges).

### Limitations and PC-stable

**Order dependence:** The original PC algorithm is order-dependent — the CPDAG output
can vary with the ordering of variables and edge tests. This is because edges are removed
from $\mathsf{H}$ during the loop, so conditioning sets available for later tests depend on
which edges were removed first.

**PC-stable** (Colombo & Maathuis, 2014, arXiv:1211.3295) fixes this by separating the
conditioning set update from the edge removal:
1. Run all CI tests for the current level $\ell$ before removing any edges.
2. Only then remove all edges that were found independent at level $\ell$.

PC-stable is the default in the `pcalg` R package (version ≥ 2.0) and `causal-learn` Python.

### Extensions

| Extension | What it relaxes | Reference |
|-----------|----------------|-----------|
| **FCI** (Fast Causal Inference) | Causal sufficiency; outputs PAG not CPDAG | Spirtes, Meek & Richardson (1995) |
| **RFCI** (Really Fast CI) | Faster FCI; fewer CI tests | Colombo et al. (2012) |
| **CPC** (Conservative PC) | Less sensitive to faithfulness violations | Ramsey et al. (2006) |
| **PCMCI** | Time-series; autocorrelation-aware | Runge et al. (2019) |

## Examples

> [!example] Example: Skeleton recovery on 4 variables (by hand)
> Variables $\{X_1, X_2, X_3, X_4\}$. True DAG: $X_1 \to X_2 \to X_3 \leftarrow X_4$
> (v-structure at $X_3$, no edge between $X_1 X_3$, $X_1 X_4$, $X_2 X_4$).
>
> **Level $\ell = 0$ (marginal independence):** Test all pairs marginally.
> $X_1 \perp\!\!\!\perp X_4$ (truly independent since no path): remove edge. 3 more edges survive (among $X_1, X_2, X_3$ chain and $X_4 \to X_3$).
> Actually $X_1 \not\perp X_3$ (there is a path $X_1 \to X_2 \to X_3$), so that edge stays provisionally.
> $X_2 \not\perp X_4$ marginally (through $X_3$ which is a collider — actually they ARE marginally independent since the path goes through a collider $X_3$). So edge $X_2 - X_4$ is removed at $\ell=0$.
>
> **Level $\ell = 1$:** Test $X_1 - X_3$ conditioning on $\{X_2\}$:
> $X_1 \perp\!\!\!\perp X_3 \mid X_2$ (since $X_2$ blocks the path). Remove edge, $\mathrm{sep}(X_1, X_3) = \{X_2\}$.
>
> **V-structure phase:** Unshielded triple $X_2 - X_3 - X_4$. Since $X_2 \notin \mathrm{sep}(X_2, X_4)$ (which is $\varnothing$), orient $X_2 \to X_3 \leftarrow X_4$.
> Triple $X_1 - X_2 - X_3$: $X_3$ is not non-adjacent to $X_1$ — wait, $X_1$ and $X_3$ are non-adjacent.
> Is $X_2 \in \mathrm{sep}(X_1, X_3)$? Yes ($\mathrm{sep}(X_1, X_3) = \{X_2\}$). So this is NOT a v-structure. Edge $X_1 - X_2$ remains unoriented — Meek R1 or R2 will not apply here until a directed edge adjacent to $X_1$ or $X_2$ is established.
> After Meek rules: $X_1 \to X_2$ (R1: $X_1 - X_2 \to X_3$ with $X_1, X_3$ non-adjacent implies $X_1 \to X_2$). Final CPDAG: $X_1 \to X_2 \to X_3 \leftarrow X_4$. Correct.
^ex-pc-4vars

## Connections

- **[[Markov Equivalence Classes and CPDAGs]]**: PC's output is a CPDAG — this note defines what that means.
- **[[GES Algorithm]]**: score-based alternative that avoids reliance on individual CI tests.
- **[[Directed Acyclic Graphs]]**: d-separation, which underlies every CI statement PC tests.
- **[[NOTEARS - Overview]]**: the NOTEARS paper explicitly benchmarks against PC (§4 Experiments).
- **[[DAG Structure Learning Problem]]**: the "Constraint-based" row in the landscape table.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — what PC returns and why
- [[GES Algorithm]] — score-based alternative
- [[Causal Structure Learning - Overview]] — comparison of all three paradigms
- [[NOTEARS Experiments]] — empirical comparison including PC as a baseline
