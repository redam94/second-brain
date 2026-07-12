---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-PC-algorithm.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) CPS, Chs. 3 & 5"
date_ingested: 2026-07-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Conditional Independence Tests for Structure Learning]]"
aliases:
  - "constraint-based structure learning"
  - "independence-based causal discovery"
  - "CPC algorithm"
  - "faithfulness-based causal discovery"
---

# Constraint-Based Causal Discovery

> [!summary]
> Constraint-based causal discovery algorithms learn the structure of a causal DAG from
> observational data by testing whether pairs of variables are conditionally independent — and
> using those independence constraints to rule out graph structures. Under the **Markov** and
> **faithfulness** assumptions, the set of conditional independence relations in the data uniquely
> determines the **CPDAG** of the data-generating DAG. The PC algorithm is the canonical
> constraint-based method; FCI extends it to the hidden-confounders setting. The approach is
> sample-efficient for sparse graphs but sensitive to errors in individual CI tests.

## Overview

The constraint-based paradigm stands in contrast to **score-based** methods (like [[Greedy Equivalence Search (GES)]]) and **continuous optimization** methods (like [[NOTEARS - Overview]]). Where GES searches for the graph that best *fits* the data according to a scoring function, constraint-based methods search for the graph that is *consistent with* the conditional independence structure of the data.

The key insight: under Markov + faithfulness, **conditional independence = d-separation**. So testing CI is equivalent to learning which pairs of nodes are d-separated by which sets — and the skeleton, v-structures, and CPDAG follow from the pattern of independencies.

## Main Content

### The Fundamental Identification Result

> [!theorem] Theorem: CI-to-CPDAG Identification (Spirtes et al. 2000, §5)
> Under the Markov condition and faithfulness, there exists a unique CPDAG $\mathcal{C}$ such
> that for all disjoint $\mathbf{X}, \mathbf{Y}, \mathbf{Z}$:
> $$\mathbf{X} \perp_P \mathbf{Y} \mid \mathbf{Z} \iff \mathbf{X} \perp_{\mathcal{C}} \mathbf{Y} \mid \mathbf{Z}.$$
> Constraint-based algorithms recover $\mathcal{C}$ by estimating the CI structure of $P$.
^thm-identification

### Three Phases of Constraint-Based Discovery

All constraint-based algorithms (PC, CPC, FCI) follow the same logical structure:

> [!definition] Phase Structure of Constraint-Based Discovery
>
> **Phase 1 — Skeleton Learning:** Identify which pairs of variables are adjacent in the graph
> (i.e., no conditioning set renders them independent). Tests pairs $(X_i, X_j)$ for CI,
> starting with empty conditioning set, increasing to larger sets.
>
> **Phase 2 — V-Structure Orientation:** Identify unshielded colliders $X \to Z \leftarrow Y$.
> Uses the separation sets recorded in Phase 1: if $Z \notin \text{SepSet}(X,Y)$, then orient
> the unshielded triple as a v-structure.
>
> **Phase 3 — Orientation Propagation:** Apply Meek's orientation rules (see
> [[Markov Equivalence and CPDAGs]]) repeatedly to propagate known orientations without
> introducing new v-structures or directed cycles. The result is the CPDAG.
^def-three-phases

### The Skeleton

The **skeleton** is the undirected graph obtained by removing edge orientation from the true DAG.
Two variables $X_i$ and $X_j$ are **adjacent** in the true skeleton iff there is no set
$\mathbf{S}$ that d-separates them: $X_i \not\perp X_j \mid \mathbf{S}$ for all $\mathbf{S}$.

Conversely, $X_i$ and $X_j$ are **non-adjacent** iff there exists some **separation set**
$\text{SepSet}(X_i, X_j)$ such that $X_i \perp X_j \mid \text{SepSet}(X_i, X_j)$.

> [!theorem] Theorem: Skeleton Correctness (Spirtes et al. 2000, Theorem 5.1)
> In the oracle case (exact CI information), the skeleton phase of any correct constraint-based
> algorithm recovers the true skeleton and the correct separation sets for all non-adjacent pairs.
^thm-skeleton

### V-Structure Identification

V-structure orientation is the key step that breaks the symmetry between Markov-equivalent DAGs:

> [!definition] V-Structure Orientation Rule
> For each unshielded triple $X$–$Z$–$Y$ (where $X$ and $Y$ are not adjacent):
> - If $Z \notin \text{SepSet}(X,Y)$: orient as $X \to Z \leftarrow Y$ (a **v-structure** / collider).
> - If $Z \in \text{SepSet}(X,Y)$: leave $X$–$Z$–$Y$ undirected for now (non-collider pattern).
^def-v-structure-rule

**Why this works:** If $X \perp Y \mid \mathbf{S}$ and $Z \notin \mathbf{S}$, then $Z$ cannot be
on the conditioning path "opening" $X$–$Y$ independence. For a collider $X \to Z \leftarrow Y$,
conditioning on $Z$ *activates* (rather than blocks) the path — so $Z$ would need to be in $\mathbf{S}$
to render $X$ and $Y$ independent. Its absence from $\text{SepSet}(X,Y)$ thus confirms the collider.

### Complexity

> [!theorem] Complexity: Constraint-Based Skeleton Learning
> If the true DAG has maximum **in-degree** (or **degree**) $k$, then skeleton learning requires
> at most $O\!\left(\binom{d}{2} \binom{d-2}{k}\right)$ CI tests, which is polynomial in $d$ for
> fixed $k$: $O(d^{k+2})$.
>
> In the sparse case ($k$ fixed), constraint-based algorithms are far more scalable than exhaustive
> search ($2^{d(d-1)/2}$ possible graphs). In the dense case ($k = O(d)$), they revert to
> exponential complexity.
^thm-complexity

### Assumptions and Their Violations

> [!note] When Faithfulness Fails
> Faithfulness can fail when path coefficients "cancel" — e.g., in a linear SEM
> $X \to Z$ (path 1) and $X \to Y \to Z$ (path 2) where the coefficients have opposite signs and
> exactly cancel. The resulting extra independence ($X \perp Z$) does not follow from the graph
> structure. Constraint-based algorithms then incorrectly remove the $X$–$Z$ edge.
> **Conservative PC (CPC)** (Ramsey et al. 2012) guards against this by using a more conservative
> v-structure orientation rule.

> [!note] When Causal Sufficiency Fails: the FCI Algorithm
> The above assumes **causal sufficiency**: no hidden common causes among measured variables. When
> unmeasured confounders exist (e.g., $X \leftarrow H \to Y$ for unmeasured $H$), the PC algorithm
> can wrongly orient or insert spurious edges. The **FCI** (Fast Causal Inference) algorithm
> (Spirtes et al. 2000, Ch. 6) relaxes causal sufficiency, returning a **PAG** (Partial Ancestral
> Graph) instead of a CPDAG.

## Examples

> [!example] Example: 4-Variable Constraint-Based Discovery
> **True DAG:** $X_1 \to X_2 \to X_4$, $X_3 \to X_2$, $X_3 \to X_4$ (no edge $X_1$–$X_3$,
> no edge $X_1$–$X_4$).
>
> **Phase 1 (Skeleton):**
> - Test $X_1 \perp X_3 \mid \emptyset$: likely independent (no path) → remove $X_1$–$X_3$ edge;
>   $\text{SepSet}(X_1,X_3) = \emptyset$.
> - Test $X_1 \perp X_4 \mid \{X_2\}$: $X_1$–$X_2$–$X_4$ is blocked → remove $X_1$–$X_4$ edge.
> - All other pairs found adjacent.
>
> **Phase 2 (V-Structures):**
> - Unshielded triple $X_1$–$X_2$–$X_3$: $X_2 \notin \text{SepSet}(X_1,X_3) = \emptyset$
>   → orient as $X_1 \to X_2 \leftarrow X_3$.
>
> **Phase 3 (Meek Rules):**
> - R1: From $X_1 \to X_2$ and $X_2$–$X_4$, with $X_1$–$X_4$ absent → $X_2 \to X_4$.
> - No more rules fire.
>
> **Output CPDAG:** $X_1 \to X_2 \leftarrow X_3$, $X_2 \to X_4$, $X_3$ – $X_4$ (edge $X_3 \to X_4$
> remains undirected — both orientations are consistent with the data).

## Connections

- **Contrast with Score-Based (GES):** Constraint-based uses CI tests; score-based uses a scoring
  criterion. Both target the CPDAG. CI tests give binary outputs (adjacent or not); scores give
  continuous gradients. GES avoids accumulation of test errors; PC avoids local optima in search.
- **Contrast with NOTEARS:** NOTEARS identifies a single DAG (not the equivalence class) by assuming
  a linear SEM with a specific loss — see [[NOTEARS - Overview]]. Constraint-based methods make
  no parametric assumptions beyond the CI test used.
- **Conditional Independence Tests:** The specific CI test used in Phase 1 determines the statistical
  assumptions — see [[Conditional Independence Tests for Structure Learning]].
- **CPDAG Output:** Meek orientation rules and the CPDAG representation — see [[Markov Equivalence and CPDAGs]].

## See Also
- [[PC Algorithm]] — the canonical constraint-based algorithm
- [[Markov Equivalence and CPDAGs]] — Verma-Pearl theorem, CPDAG definition, Meek rules
- [[Conditional Independence Tests for Structure Learning]] — Fisher-Z, chi-squared, kernel-based tests
- [[Greedy Equivalence Search (GES)]] — score-based alternative for CPDAG recovery
- [[NOTEARS - Overview]] — continuous optimisation alternative
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, Markov condition
- [[DAG Structure Learning Problem]] — formal problem statement (SEM, score functions)
