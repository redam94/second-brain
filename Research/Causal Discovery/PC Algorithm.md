---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes & Glymour (1991); Spirtes, Glymour & Scheines (2000) CPS Ch. 5"
source_location: "Algorithm 4.1 (skeleton) and Algorithm 4.2 (orientation), CPS 2nd ed."
date_ingested: 2026-09-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Testing]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Structure Learning - Method Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991) is the canonical **constraint-based**
> method for learning causal DAG structure from observational data. It has two phases:
> (1) **skeleton discovery** — start from a complete undirected graph and remove edges
> whenever a conditional independence (CI) is found, recording the conditioning set; and
> (2) **orientation** — orient v-structures and apply Meek rules to produce the CPDAG.
> Under the Causal Markov condition, faithfulness, and causal sufficiency, PC is
> asymptotically consistent: in the oracle setting (exact CI tests) it recovers the
> true MEC of the data-generating DAG.

## Overview

Named after **P**eter Spirtes and **C**lark Glymour, the PC algorithm was the first
computationally practical method for learning large causal graphs. Its insight:
conditional independence in the data is a *fingerprint* of the causal structure. By
systematically testing all pairs of variables for CI, conditional on growing subsets of
their neighbors, PC constructs the skeleton and locates the v-structures that
characterize the Markov equivalence class (MEC).

The two phases are conceptually clean: Phase 1 answers "which pairs are adjacent in
the DAG?"; Phase 2 answers "which edges are orientable?".

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions
> Let $G^*$ be the true data-generating DAG. PC requires:
>
> **1. Causal Markov Condition.** Each variable is d-separated from its non-descendants
> given its parents in $G^*$, i.e., $\mathbb{P}(X_i \mid X_{\text{pa}(i)}, X_{\text{non-desc}(i)}) = \mathbb{P}(X_i \mid X_{\text{pa}(i)})$.
>
> **2. Faithfulness.** Every conditional independence in $\mathbb{P}$ is entailed by
> $G^*$ via d-separation: $\mathbb{P}(X_A \perp\!\!\!\perp X_B \mid X_C) \Rightarrow (A \perp\!\!\!\perp_d B \mid C)_{G^*}$.
> *(No accidental cancelations of paths.)*
>
> **3. Causal Sufficiency.** No unmeasured common causes (no hidden confounders). Every
> common cause of observed variables is itself observed.
>
> **4. (For finite samples)** An appropriate CI test for the data type.
^def-pc-assumptions

> [!warning] Faithfulness Violations
> Faithfulness can fail if two causal paths cancel — e.g., direct and indirect effects
> of equal magnitude and opposite sign. In such cases PC will remove genuine edges.
> The probability of faithful distributions is 1 under Gaussian noise (Lebesgue measure 1),
> but near-violations inflate finite-sample error rates.

### Phase 1: Skeleton Discovery

> [!definition] Definition: PC Skeleton Algorithm (Spirtes & Glymour 1991)
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n\times d}$; CI oracle or test at level $\alpha$.
>
> 1. Initialize $C \leftarrow K_d$ (complete undirected graph on $d$ nodes).
>    Initialize $\operatorname{sep}(X_i, X_j) \leftarrow \emptyset$ for all $i \neq j$.
>
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - **For** each adjacent pair $(X_i, X_j)$ in $C$ (in any order):
>      - **For** each $S \subseteq \operatorname{adj}_C(X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>        - **If** $X_i \perp\!\!\!\perp X_j \mid X_S$ (test or oracle):
>          - Remove edge $X_i - X_j$ from $C$.
>          - Set $\operatorname{sep}(X_i, X_j) \leftarrow \operatorname{sep}(X_j, X_i) \leftarrow S$.
>          - **Break** (next pair).
>    - **If** $\max_{X_i - X_j \in C} |\operatorname{adj}_C(X_i) \setminus \{X_j\}| < \ell$: **Stop**.
>
> **Output:** Skeleton $C$ (undirected graph) and separation sets $\operatorname{sep}(\cdot,\cdot)$.
^def-pc-skeleton

> [!note] Key Efficiency Insight
> The conditioning sets $S$ are drawn only from the *current neighbors* of $X_i$ in $C$,
> not from all $d-2$ other variables. As edges are removed, $|\operatorname{adj}(X_i)|$
> shrinks, so later iterations test smaller sets. For sparse graphs (bounded degree $q$),
> the algorithm terminates at $\ell = q$ and the total number of CI tests is
> $O(d^2 \binom{q}{\ell})$ — polynomial in $d$ for fixed $q$.

### Phase 2: Orientation

**Step 1 — Orient v-structures.**

> [!definition] Definition: V-Structure Orientation Rule
> For each triple $(X_i, X_k, X_j)$ such that:
> - $X_i - X_k$ is an edge in $C$ (adjacent),
> - $X_k - X_j$ is an edge in $C$ (adjacent),
> - $X_i$ and $X_j$ are **not** adjacent in $C$ (unshielded triple), and
> - $X_k \notin \operatorname{sep}(X_i, X_j)$,
>
> orient the edges as $X_i \to X_k \leftarrow X_j$ (a v-structure).
^def-vstructure-orient

> [!note] Why this rule is correct (oracle setting)
> By faithfulness, $X_k \notin \operatorname{sep}(X_i, X_j)$ means $X_i \not\perp\!\!\!\perp X_j \mid X_k$,
> i.e., conditioning on $X_k$ *creates* dependence — the hallmark of a collider. If $X_k$
> were a non-collider on the path $X_i \to X_k \to X_j$ or $X_i \leftarrow X_k \leftarrow X_j$,
> then $X_k \in \operatorname{sep}(X_i, X_j)$ would be required.

**Step 2 — Apply Meek orientation rules.**

Apply the Meek rules R1–R4 repeatedly until no further orientations are possible.
See [[Markov Equivalence Classes and CPDAGs]] for the full statement of R1–R4.

> [!definition] Definition: PC Output
> **Output:** A CPDAG $H$. Under the assumptions in [[#Assumptions]], in the oracle setting
> $H$ is the unique CPDAG of the MEC of $G^*$.
^def-pc-output

### Complexity and Finite-Sample Behavior

> [!theorem] Theorem: Consistency of PC (Spirtes et al. 2000)
> Under the Causal Markov condition, faithfulness, and causal sufficiency, in the oracle
> setting (exact CI decisions), the PC algorithm returns the CPDAG of the true DAG $G^*$.
>
> In the finite-sample setting, PC is **uniformly consistent** for sparse graphs: if the
> CI test has level $\alpha_n \to 0$ at a rate $\alpha_n \to 0$ slowly enough as $n \to \infty$,
> and the true graph has maximum degree $q$ bounded, then PC recovers the true CPDAG
> with probability tending to 1. (Kalisch & Bühlmann 2007 formalize this for Gaussian data.)
^thm-pc-consistency

**Worst-case complexity:** $O(d^2 \cdot 2^d)$ CI tests (exponential) due to the exponential
number of possible conditioning sets. In practice, sparse graphs make this tractable.

**Finite-sample sensitivity:** Two main failure modes in practice:
1. *False edge removals*: CI tests reject a true edge due to low power at small $n$ or
   large conditioning set size $|S|$.
2. *False v-structure orientations*: Type-I error in CI tests causes colliders to be missed.

### Variants and Extensions

| Variant | Description |
|---------|-------------|
| **PC-stable** (Colombo & Maathuis 2014) | Order-independent skeleton: collect all removals at level $\ell$ before applying any, eliminating dependence on variable ordering |
| **RFCI** (Colombo et al. 2012) | Relaxed FCI: handles hidden confounders; outputs PAG instead of CPDAG |
| **FCI** (Spirtes et al. 2000) | Full causal inference: allows hidden confounders and selection bias; more conservative orientation rules |
| **PC-JCI** | Joint causal inference for multi-context data |

## Examples

> [!example] Example: 4-Node Chain $X_1 \to X_2 \to X_3 \to X_4$
> **Gaussian oracle setting.**
>
> Level $\ell = 0$: Test all 6 pairs unconditionally. Only $X_1 \perp\!\!\!\perp X_4$
> (marginally), so the edge $X_1 - X_4$ is removed. $\operatorname{sep}(X_1, X_4) = \emptyset$.
>
> Level $\ell = 1$: Test pairs conditioning on single neighbors. Find
> $X_1 \perp\!\!\!\perp X_3 \mid X_2$, $X_2 \perp\!\!\!\perp X_4 \mid X_3$. Remove those edges.
>
> Skeleton after: $X_1 - X_2 - X_3 - X_4$ (the correct skeleton).
>
> V-structure check: No unshielded triple has its center outside its separation set
> (each adjacent triple shares a separator). Meek rules: R1 applies to orient edges
> in the chain direction if further information is available; without it, all three
> edges remain undirected in the CPDAG $X_1 - X_2 - X_3 - X_4$.
>
> **Interpretation:** The chain, fork ($X_1 \leftarrow X_2 \to X_3$, etc.), and reverse
> chain are all in the same MEC — observational data alone cannot determine the causal
> direction.

## Connections

- **CI test determines performance**: the quality of the CI test dominates PC's accuracy
  in finite samples — see [[Conditional Independence Testing]].
- **GES comparison**: GES searches directly over CPDAGs using a score; PC uses CI tests.
  GES is generally more accurate in low-$n$ settings; PC can scale better at low $d$.
  See [[Causal Structure Learning - Method Comparison]].
- **NOTEARS comparison**: NOTEARS optimizes continuously over real matrices and can miss
  the MEC entirely; PC outputs a CPDAG with the correct theoretical guarantees under the
  oracle setting — see [[NOTEARS - Overview]].
- **Hidden confounders**: if causal sufficiency fails, PC returns a spuriously dense graph.
  FCI (extension of PC) handles this setting.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG output and Meek rules
- [[Conditional Independence Testing]] — the CI tests PC uses as subroutines
- [[GES - Greedy Equivalence Search]] — the score-based alternative
- [[Causal Structure Learning - Method Comparison]] — PC vs GES vs NOTEARS
- [[DAG Structure Learning Problem]] — the general problem setup
