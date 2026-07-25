---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/survey-PC-algorithm-constraint-based-causal-discovery.md]]"
source_location: "Spirtes et al. (2000) §6; Spirtes (2010) §3; Colombo & Maathuis (2014)"
date_ingested: 2026-07-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Tests for Causal Discovery]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "PC-stable"
  - "SGS algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 2000; named after Peter Spirtes and
> Clark Glymour) is the canonical **constraint-based** method for causal structure learning.
> It recovers the **CPDAG** (Markov equivalence class representative) from observational
> data by: (1) pruning a complete graph to a skeleton via **conditional independence tests**,
> and (2) orienting edges into v-structures and applying Meek's rules. Under causal Markov,
> faithfulness, causal sufficiency, and consistent CI tests, PC converges to the true CPDAG
> as $n \to \infty$. The variant **PC-stable** (Colombo & Maathuis 2014) removes an
> order-dependence flaw in the original algorithm.

## Overview

Causal discovery from observational data asks: given data on variables $X_1, \ldots, X_d$,
what can we learn about the causal DAG generating them? The PC algorithm answers by
exploiting the **Markov and faithfulness conditions**: every conditional independence
observable in the data corresponds to a d-separation in the true DAG, and vice versa.
The algorithm's strategy is to test conditional independences and build the skeleton and
v-structures, then apply Meek's rules to complete the orientation.

The PC algorithm is in the "constraint-based" family, contrasted with:
- **Score-based methods** ([[GES - Greedy Equivalence Search]]): optimise a score function.
- **Continuous optimisation** ([[NOTEARS - Overview]]): solve a continuous program over real matrices.
- **Functional causal models** (LiNGAM, ANM): exploit non-Gaussianity or functional form.

## Main Content

### Assumptions

> [!definition] PC Algorithm Assumptions
>
> **A1. Causal Markov Condition:** Each variable is conditionally independent of its
> non-descendants given its parents in the true DAG $G^*$.
>
> **A2. Causal Faithfulness Assumption:** Every conditional independence in $P$ arises
> from a d-separation in $G^*$. No independence is "accidental" from parameter cancellation.
>
> **A3. Causal Sufficiency:** All common causes of observed variables are also observed
> (no hidden confounders). Violated in the presence of unmeasured common causes.
>
> **A4. Consistent CI test:** The conditional independence oracle (or test at level $\alpha$)
> is consistent — as $n \to \infty$, it correctly identifies all true independences and
> dependences.
^def-assumptions

### Algorithm: Phase 1 — Skeleton construction

> [!definition] PC Algorithm Phase 1 (Spirtes et al. 2000, §6.1)
>
> **Input:** $d$ variables, data $\mathbf{X} \in \mathbb{R}^{n \times d}$, CI test, level $\alpha$.
>
> 1. Initialize: complete undirected graph $\hat{G} = K_d$, separating sets $\text{Sep}(i,j) = \emptyset$.
> 2. For $k = 0, 1, 2, \ldots$:
>    - For every adjacent pair $(X_i, X_j)$ in current $\hat{G}$:
>      - For every $\mathbf{S} \subseteq \text{Adj}_{\hat{G}}(X_i) \setminus \{X_j\}$
>        with $|\mathbf{S}| = k$:
>        - If $\text{CI-test}(X_i, X_j \mid \mathbf{S})$ is not rejected at level $\alpha$:
>          remove edge $(X_i, X_j)$ from $\hat{G}$;
>          store $\text{Sep}(i,j) = \text{Sep}(j,i) = \mathbf{S}$;
>          break (next pair).
>    - If no edges were removed at level $k$: **stop**.
> 3. Return skeleton $\hat{G}^{\text{skel}}$ and separating sets $\{\text{Sep}(i,j)\}$.
^def-phase1

**Key idea:** At level $k=0$, test marginal independence. Only if the pair passes
do we test conditional independence given sets of size $k=1$, then $k=2$, etc. This is
far more efficient than SGS (which tests all subsets).

**Termination:** The algorithm terminates because removing an edge shrinks the adjacency
sets, bounding the maximum conditioning set size by $\max_j |\text{Adj}(X_j)| - 1$.

**Complexity:** $O\!\left(\binom{d}{2}\binom{d-2}{k^*}\right)$ CI tests, where $k^*$ is
the maximum adjacency degree of $G^*$. Polynomial in $d$ for bounded-degree graphs.

### Algorithm: Phase 2 — V-structure orientation

> [!definition] PC Algorithm Phase 2: V-structure orientation
>
> For every unshielded triple $X_i - X_k - X_j$ (where $X_i, X_j$ are non-adjacent):
> - If $X_k \notin \text{Sep}(i, j)$: orient as $X_i \to X_k \leftarrow X_j$ (v-structure / collider).
> - If $X_k \in \text{Sep}(i, j)$: leave unoriented (non-collider / chain/fork).
^def-phase2

**Identifiability:** V-structures are the only edge orientations identifiable from
observational data under Markov + faithfulness alone. The asymmetry: $X \to Z \leftarrow Y$
creates a dependence between $X$ and $Y$ *conditional* on $Z$ (Berkson's paradox /
collider bias), while the chain $X \to Z \to Y$ and fork $X \leftarrow Z \rightarrow Y$
both make $X \perp Y \mid Z$.

### Algorithm: Phase 3 — Meek orientation rules

Apply Meek's rules R1–R4 (defined in [[Markov Equivalence Classes and CPDAGs]]) iteratively
until no more edges can be oriented. These propagate orientation constraints while preserving
the equivalence class.

**Output:** The estimated **CPDAG** $\hat{\mathcal{C}}$, representing the estimated Markov
equivalence class of the true DAG.

### Consistency theorem

> [!theorem] Theorem: PC Algorithm Consistency (Spirtes et al. 2000, Theorem 5.1)
> Under Assumptions A1–A4 (Markov, Faithfulness, Causal Sufficiency, Consistent CI test):
>
> As $n \to \infty$, the PC algorithm outputs the true CPDAG $\mathcal{C}^*$ with
> probability tending to 1.
>
> **In the oracle setting** (perfect CI oracle), PC returns $\mathcal{C}^*$ exactly.
^thm-consistency

### PC-stable: removing order-dependence (Colombo & Maathuis 2014)

The original PC algorithm has a subtle **order-dependence flaw** in Phase 1: the skeleton
at level $k$ determines which conditioning sets are used at level $k+1$, and edges removed
for different orderings of variable pairs can interact, producing different skeletons.

> [!definition] PC-stable (Colombo & Maathuis 2014)
> PC-stable modifies Phase 1 to be order-independent:
>
> At each level $k$:
> 1. For all pairs $(X_i, X_j)$ and all $|\mathbf{S}|=k$ subsets: **record** (but do not
>    remove) all pairs for which independence was found.
> 2. After all pairs at level $k$ are tested: **simultaneously remove** all flagged edges.
>
> This ensures the skeleton at level $k$ (used to define conditioning sets at level $k+1$)
> is the same regardless of processing order.
>
> PC-stable has the same asymptotic guarantee as PC but is order-independent.
^def-pc-stable

### FCI: extension to hidden variables

The **FCI** (Fast Causal Inference) algorithm (Spirtes et al. 2000) generalises PC to
settings where causal sufficiency is violated (hidden common causes / selection bias).

- FCI outputs a **PAG** (Partial Ancestral Graph) with circle endpoints (◦) encoding
  whether an endpoint is a tail (→, no hidden causes) or arrowhead (←, possible hidden).
- **RFCI** (Colombo et al. 2012): faster variant of FCI with the same asymptotic guarantees.

## Examples

> [!example] Example: Four-variable PC run
> Variables $\{A, B, C, D\}$; true DAG: $A \to B \to D$ and $C \to B$ and $C \to D$.
> The true CPDAG has the v-structure $A \to B \leftarrow C$ (since $A, C$ non-adjacent)
> and $C \to D$ is compelled (R1: $C$ is parent of both $B$ and $D$; orienting $D \to C$
> would create a new v-structure).
>
> **Phase 1 output:** Remove edge $A-C$ (since $A \perp C$) and $A-D$ (since $A \perp D \mid B$).
> **Phase 2:** $A - B - C$ with $B \notin \text{Sep}(A, C) = \emptyset$ → v-structure $A \to B \leftarrow C$.
> **Phase 3 (R1):** $C - D - B$ with $C \to B$ already oriented → $C \to D$.

## Connections

- **Faithfulness violations:** Near-faithfulness (very weak dependencies) causes the PC
  algorithm to miss edges. This is a fundamental limitation of constraint-based methods:
  the faithfulness assumption is untestable.
- **Causal discovery in practice:** On finite samples, PC tends to produce sparser graphs
  than GES. With small $n$ relative to $d$, high-order conditioning sets are poorly estimated.
- **NOTEARS as a complement:** NOTEARS ([[NOTEARS - Overview]]) does not require faithfulness
  — it minimises a score subject to acyclicity. On the Sachs real-data experiment, NOTEARS
  matched PC in accuracy.
- **Bayesian networks (BNs):** PC produces the CPDAG of the implied Bayesian network
  structure. For the probabilistic BN machinery (variable elimination, belief propagation),
  see [[LLM-BN Decision Support Application]] and [[BN Construction Methods Comparison]].
- **Summary Causal DAGs:** PC learns full-resolution DAGs; [[Summary Causal DAGs]] describes
  methods for coarsening learned DAGs into higher-level causal summaries.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG output and its properties
- [[Conditional Independence Tests for Causal Discovery]] — the CI test primitive
- [[GES - Greedy Equivalence Search]] — score-based alternative to PC; both output CPDAGs
- [[NOTEARS - Overview]] — continuous optimisation alternative
- [[DAG Structure Learning Problem]] — formal problem statement
- [[Directed Acyclic Graphs]] — causal semantics and d-separation
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge alternative to algorithmic discovery
