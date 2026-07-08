---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-Synthesis-Survey.md]]"
source_location: "Part II, §2.1–2.6"
date_ingested: 2026-07-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Testing for Causal Discovery]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 2000; named for its inventors
> **P**eter Spirtes and **C**lark Glymour) is the canonical constraint-based causal
> discovery algorithm. It recovers the [[Markov Equivalence and CPDAGs|CPDAG]] of the
> true causal DAG using three sequential phases: (1) skeleton recovery by conditional
> independence (CI) testing, (2) v-structure identification, and (3) edge orientation
> via Meek's rules. Under the faithfulness assumption and causal sufficiency, PC is
> **asymptotically consistent**. Its key advantage over score-based methods is
> interpretability: every removed edge has an explicit statistical justification.

## Overview

PC occupies a different algorithmic paradigm from [[NOTEARS - Overview|NOTEARS]]: rather
than solving a continuous optimization problem over the weight matrix, PC treats the graph
as a set of **conditional independence constraints** to be tested in the data. The algorithm
is constraint-based in the sense that it builds the graph by eliminating adjacencies wherever
the data statistically support independence.

The output is a **CPDAG** — it cannot, in general, fully orient all edges because
observational data cannot distinguish Markov-equivalent DAGs. Where NOTEARS returns a
fully directed matrix $W$, PC returns the identifiable equivalence class, making the
remaining orientation ambiguity explicit.

## Main Content

### Assumptions

PC is consistent under three assumptions:

> [!definition] Definition: Assumptions for PC Consistency
> 1. **Causal Markov Condition.** Each variable $X_i$ is conditionally independent of
>    its non-descendants given its parents $\mathrm{Pa}(X_i)$ in the true DAG $G^*$.
>    This is equivalent to saying that $G^*$ is a Markov blanket for $P$.
> 2. **Faithfulness Assumption.** Every conditional independence that holds in $P$ is
>    represented by a d-separation in $G^*$. No CI relationships arise from "accidental"
>    cancellations of path coefficients.
> 3. **Causal Sufficiency.** There are no unobserved common causes (latent confounders)
>    in $G^*$. *(The FCI algorithm relaxes this assumption.)*
^def-assumptions

**The faithfulness assumption is the key empirical risk.** Real data can violate
faithfulness: in linear SEMs, equal and opposite path coefficients can cancel, creating
a CI relationship not represented by any d-separation. When faithfulness fails, PC
may add spurious edges or fail to remove true non-edges.

### Algorithm: Three Phases

#### Phase 1: Skeleton Recovery

> [!definition] Definition: PC Skeleton Recovery
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, CI test, significance level $\alpha$.
>
> **Initialise:** Complete undirected graph $G = K_d$; $\mathrm{sepset}(X,Y) = \emptyset$
> for all pairs.
>
> **For** $k = 0, 1, 2, \ldots$:
> - **For** each adjacent pair $(X, Y)$ in $G$:
>   - **For** each $\mathbf{S} \subseteq \mathrm{adj}(X) \setminus \{Y\}$ with $|\mathbf{S}| = k$:
>     - Test $H_0: X \perp\!\!\!\perp Y \mid \mathbf{S}$ at level $\alpha$.
>     - If the test **fails to reject** (accepts independence):
>       - Remove edge $X - Y$ from $G$.
>       - Set $\mathrm{sepset}(X, Y) = \mathrm{sepset}(Y, X) = \mathbf{S}$.
>       - Break to next pair.
> - If no edges were removed for conditioning size $k$: terminate.
>
> **Output:** Skeleton $G$ and separation sets $\mathrm{sepset}(\cdot, \cdot)$.
^def-pc-skeleton

**Computational complexity.** In the worst case (complete graph, no edges removed),
the number of CI tests grows exponentially. In sparse graphs with maximum degree $\delta$,
it is $O(d^{\delta+1})$ — polynomial in $d$ for fixed $\delta$. This sparsity dependence
is a major practical advantage of PC over exhaustive search.

#### Phase 2: V-Structure Identification (Collider Detection)

> [!definition] Definition: V-Structure Orientation
> **For** each unshielded path $X - Z - Y$ in $G$ (i.e., $X$ and $Y$ are NOT adjacent):
> - **If** $Z \notin \mathrm{sepset}(X, Y)$: orient $X \to Z \gets Y$ (unshielded collider).
> - **Else:** leave $X - Z - Y$ undirected.
^def-vstructure

**Intuition.** If $Z$ were in the separating set of $X$ and $Y$, then conditioning on $Z$
would be what made $X$ and $Y$ independent — implying $Z$ is NOT a collider. If $Z$ is
absent from the separating set, then $Z$ must be a collider $X \to Z \gets Y$ (the only
structure consistent with $X \perp\!\!\!\perp Y$ but $X \not\perp\!\!\!\perp Y \mid Z$).

#### Phase 3: Edge Orientation via Meek Rules

Apply [[Markov Equivalence and CPDAGs#^def-meek-rules|Meek's four rules]] (R1–R4)
iteratively until no further orientations are possible.

**Output:** CPDAG of the true DAG's Markov equivalence class.

### An End-to-End Example

> [!example] Example: 4-Node Graph
> **True DAG:** $A \to B \to C \to D$, $A \to C$ (so $A, B, C, D$ with edges $A \to B$,
> $B \to C$, $C \to D$, $A \to C$).
>
> **Phase 1 (Skeleton):**
> - Test all pairs at $k=0$. $D \perp\!\!\!\perp A, B$ marginally? Yes (given the DAG structure).
>   → Remove $D-A$ and $D-B$.
> - Test remaining pairs at $k=1$. $A \perp\!\!\!\perp C \mid B$? No (there is also the direct edge
>   $A \to C$). $A \perp\!\!\!\perp D \mid C$? Yes (d-separated). All tests pass.
> - Skeleton recovered: $A - B$, $A - C$, $B - C$, $C - D$.
>
> **Phase 2 (V-structures):**
> - Path $A - B - C$: $A \sim C$ (adjacent), so no unshielded triple.
> - Path $A - C - D$: $A \not\sim D$ (not adjacent); $\mathrm{sepset}(A, D) = \{C\}$; $C \in
>   \mathrm{sepset}$ → NOT a v-structure. Leave undirected.
> - Path $B - C - D$: $B \not\sim D$; $\mathrm{sepset}(B, D) = \{C\}$; $C \in \mathrm{sepset}$
>   → NOT a v-structure. Leave undirected.
>
> **Phase 3 (Meek):** Apply R1–R4. Some edges get oriented. Final CPDAG:
> undirected edges $A - B$, $B - C$ (all three DAGs equivalent in this class are valid);
> directed $C \to D$ is forced by the d-separation structure.

### Consistency Theorem

> [!theorem] Theorem: PC Consistency (Spirtes, Glymour & Scheines, 2000)
> Let $G^*$ be the true causal DAG with CPDAG $\mathcal{C}^*$. Assume the Causal Markov
> Condition, Faithfulness, and Causal Sufficiency hold. If the CI tests are correct (i.e.,
> accept $H_0$ iff $X \perp\!\!\!\perp Y \mid \mathbf{S}$ in $P$), then PC outputs $\mathcal{C}^*$.
>
> In finite samples with consistent tests (as $n \to \infty$ at appropriate rates), PC
> output converges to $\mathcal{C}^*$ in probability.
^thm-pc-consistency

### Limitations

1. **Faithfulness violations.** Near-violations (small but nonzero partial correlations)
   cause low-powered tests — edges may be missed or spuriously retained.
2. **Causal sufficiency.** PC cannot handle latent confounders. The **FCI (Fast Causal
   Inference)** algorithm (Spirtes et al., 2000) extends PC to the non-sufficient case,
   outputting a PAG (Partial Ancestral Graph).
3. **Order-dependence.** Original PC's output can depend on the variable ordering.
   **PC-stable** (Colombo & Maathuis, 2014) eliminates this.
4. **Sample complexity.** Tests with large conditioning sets are unreliable in finite
   samples. PC requires $n \gg 2^{\delta}$ for reliable recovery.
5. **Scalability.** For $d > 100$ nodes, CI tests with large $|\mathbf{S}|$ become
   unreliable. Methods like **PC-Select** or **MMHC** are preferred.

## Connections

- **vs. GES.** [[GES - Greedy Equivalence Search]] is the score-based alternative: it
  uses a global BIC/BDe score rather than per-test CI decisions. Under faithfulness,
  both recover $\mathcal{C}^*$ asymptotically. GES avoids the multiple-testing burden;
  PC has more interpretable individual edge justifications.
- **vs. NOTEARS.** [[NOTEARS - Overview]] is a *continuous* approach to a *directed*
  graph; it does not output CPDAGs (only a single directed adjacency). PC is *discrete*
  (equivalence class) and *constraint-based* (CI tests). NOTEARS scales better to large
  $d$; PC is more principled about identifiability.
- **vs. Bayesian network construction.** [[LLM Expert Elicitation for Bayesian Networks]]
  and [[BN Construction Methods Comparison]] build BNs from domain knowledge; PC is the
  *data-driven* alternative — useful when expert knowledge is unavailable or to validate
  prior knowledge with data.
- **Connection to ABM validation.** [[Summary Causal DAGs]] and [[DAG Structure Learning Problem]]
  note that ABM outputs can serve as "observational data" for causal discovery — PC and GES
  are the natural tools for learning the causal structure from such ABM-generated data.

## See Also
- [[Markov Equivalence and CPDAGs]] — the output object: CPDAG definition and Meek rules
- [[Conditional Independence Testing for Causal Discovery]] — Fisher z, G², KCI tests used in Phase 1
- [[GES - Greedy Equivalence Search]] — score-based alternative with same asymptotic target
- [[DAG Structure Learning Problem]] — full landscape of methods including PC in context
- [[Directed Acyclic Graphs]] — DAG semantics (d-separation, do-calculus)
- [[Causal Discovery/_Index|Causal Discovery Index]]
