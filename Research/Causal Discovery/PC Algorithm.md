---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Based-Survey.md]]"
source_location: "Part 1: The PC Algorithm (SGS 2000, Ch. 5)"
date_ingested: 2026-08-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search]]"
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC causal discovery"
  - "SGS algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** method for learning causal DAG structure from observational
> data. It recovers the **CPDAG** of the generating DAG in three phases: (1) skeleton discovery
> via conditional independence tests over increasingly large conditioning sets; (2) V-structure
> orientation using the separation sets; (3) Meek rule propagation to complete the CPDAG. Under
> faithfulness, Markov, and causal sufficiency, PC is asymptotically consistent. Named after
> inventors **P**eter Spirtes and **C**lark Glymour.

## Overview

The PC algorithm is the oldest and most widely used constraint-based causal discovery method.
Its central insight is that **conditional independence relations in the data uniquely determine
the skeleton and V-structures of the generating DAG** (under faithfulness), and therefore
determine the Markov equivalence class — the best possible target from passive observation.

Unlike score-based methods ([[Greedy Equivalence Search]]) or continuous optimization
([[NOTEARS - Overview]]), PC proceeds by a **sequence of statistical tests** rather than
optimization. Each test asks: "Are variables $X$ and $Y$ independent given some subset $Z$?"
A positive answer removes the edge $X - Y$ from the skeleton and records $Z$ as the
"separation set" that explains the independence. The separation sets are then used in Phase 2
to recover V-structures without any additional tests.

The key computational speedup: by the **d-separation characterization**, if $X \perp\!\!\!\perp Y \mid Z$
for any $Z$, then $Z$ must be a subset of the *neighbors* of $X$ or the *neighbors* of $Y$ in
the current skeleton. This means we only test conditioning sets drawn from the adjacency list —
not all $2^{d-2}$ subsets.

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions (SGS 2000)
> The PC algorithm is sound and complete under:
> 1. **Markov condition**: $P$ satisfies the Markov condition with respect to the true DAG $G^*$.
> 2. **Faithfulness**: $P$ is faithful to $G^*$ (no accidental independencies).
> 3. **Causal sufficiency**: No unmeasured common causes (no hidden confounders).
> 4. **Consistency of CI test**: The conditional independence oracle is perfect (or a consistent
>    statistical test with significance $\alpha_n \to 0$ as $n \to \infty$).
^def-pc-assumptions

Causal sufficiency is the most restrictive assumption. The **FCI** (Fast Causal Inference) algorithm
drops it at the cost of producing a PAG (Partial Ancestral Graph) with additional edge types.

### Phase 1 — Skeleton Discovery

> [!theorem] PC Skeleton Algorithm (SGS 2000, Algorithm 5.4.1, Phase I)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n \times d}$ over variables $\mathbf{V}$; CI test at level $\alpha$.
> **Output**: Skeleton $\mathcal{C}$ (undirected graph); separation sets $\mathrm{Sep}(X,Y)$ for each removed edge.
>
> 1. Start with the **complete undirected graph** $\mathcal{C}$ on $\mathbf{V}$.
> 2. Initialize conditioning set size $l = 0$.
> 3. **Repeat**:
>    - For each ordered pair $(X, Y)$ with $X - Y$ in $\mathcal{C}$:
>      - Let $\mathrm{Adj}(\mathcal{C}, X) \setminus \{Y\}$ be the current neighbors of $X$ minus $Y$.
>      - For each subset $Z \subseteq \mathrm{Adj}(\mathcal{C}, X) \setminus \{Y\}$ with $|Z| = l$:
>        - If $X \perp\!\!\!\perp Y \mid Z$ (CI test accepts independence):
>          - Remove edge $X - Y$ from $\mathcal{C}$
>          - Set $\mathrm{Sep}(X,Y) = \mathrm{Sep}(Y,X) = Z$
>          - Break inner loop (move to next pair)
>    - Increment $l \leftarrow l + 1$.
> 4. **Until** $l > \max_{X \in \mathbf{V}} |\mathrm{Adj}(\mathcal{C}, X) \setminus \{X\}|$
>    (no neighbor set is large enough to form a conditioning set of size $l$).
>
> **Note**: Both $(X,Y)$ and $(Y,X)$ are considered; if either produces independence, the edge
> is removed. The standard implementation removes on the first evidence of independence found.
^alg-pc-skeleton

> [!note] Why neighbor-restricted conditioning sets are sufficient
> In a faithful distribution, if $X \perp\!\!\!\perp Y \mid Z$ for *any* $Z$, then there exists
> a $Z' \subseteq \mathrm{Adj}(G^*, X)$ or $Z' \subseteq \mathrm{Adj}(G^*, Y)$ such that
> $X \perp\!\!\!\perp Y \mid Z'$. This is because d-separating sets for non-adjacent pairs can always
> be chosen from the parent sets. Therefore, restricting conditioning sets to current neighbors
> is *without loss of generality* under faithfulness.

**Complexity**: At conditioning depth $l$, the number of CI tests is at most $O(p^2 \binom{\Delta-1}{l})$
where $\Delta$ is the maximum degree. For **sparse graphs** (bounded $\Delta$), this is $O(p^2)$.
For dense graphs, worst-case complexity is exponential.

**Statistical test for Gaussian data**: Under multivariate Gaussian, test $H_0: \rho_{XY|Z} = 0$
using Fisher's $z$-transform:

$$z_{XY|Z} = \frac{1}{2}\log\frac{1 + \hat{\rho}_{XY|Z}}{1 - \hat{\rho}_{XY|Z}}$$

Under $H_0$: $\sqrt{n - |Z| - 3} \cdot z_{XY|Z} \approx N(0, 1)$.
Here $\hat{\rho}_{XY|Z}$ is the sample partial correlation obtained from the inverse of the
sample covariance matrix restricted to $\{X,Y\} \cup Z$:
$$\hat{\rho}_{XY|Z} = -\frac{[\hat{\Sigma}^{-1}_{|XY\cup Z|}]_{XY}}{\sqrt{[\hat{\Sigma}^{-1}_{|XY\cup Z|}]_{XX} [\hat{\Sigma}^{-1}_{|XY\cup Z|}]_{YY}}}$$

### Phase 2 — V-Structure (Unshielded Collider) Orientation

> [!theorem] PC V-Structure Orientation (SGS 2000, Algorithm 5.4.1, Phase II)
> **Input**: Skeleton $\mathcal{C}$, separation sets $\mathrm{Sep}(\cdot, \cdot)$.
> **Output**: Partially oriented graph $\mathcal{P}$ (with some edges directed).
>
> For each **unshielded triple** $X - Y - Z$ in $\mathcal{C}$ (i.e., $X$ and $Z$ are NOT adjacent):
> - If $Y \notin \mathrm{Sep}(X, Z)$: orient as $X \to Y \leftarrow Z$ (V-structure).
> - If $Y \in \mathrm{Sep}(X, Z)$: leave $X - Y - Z$ undirected.
^alg-pc-vstructure

**Rationale**: By the Verma-Pearl theorem ([[Markov Equivalence and CPDAGs]]), $X \to Y \leftarrow Z$
is an unshielded collider if and only if $Y$ is NOT in any separation set of $X$ and $Z$.
Here:
- $Y \in \mathrm{Sep}(X,Z)$: conditioning on $Y$ blocks the path $X - Y - Z$. This is consistent
  with $X - Y - Z$ being a **chain** ($X \to Y \to Z$ or $X \leftarrow Y \leftarrow Z$) or a
  **fork** ($X \leftarrow Y \to Z$) — all Markov equivalent.
- $Y \notin \mathrm{Sep}(X,Z)$: conditioning on $Y$ *opens* the path (the collider "explains"
  the correlation). This is the unique signature of the collider $X \to Y \leftarrow Z$.

### Phase 3 — Meek Rule Propagation

> [!theorem] PC Orientation Rules (Meek 1995, implemented in Phase III)
> Apply Meek's rules R1–R4 exhaustively (see [[Markov Equivalence and CPDAGs]] §Meek's
> Orientation Rules) until no further edges can be oriented. The result is the CPDAG.
^alg-pc-meek

### Full Algorithm Summary

```
PC Algorithm (SGS 2000)
Input:  Data X, CI test, significance level α
Output: CPDAG ĈP of the true DAG G*

Step 1 (Skeleton): 
  C = complete undirected graph
  Sep = empty lookup table
  l = 0
  REPEAT:
    For each adjacent (X,Y) in C:
      For each Z ⊆ Adj(C,X)\{Y} with |Z| = l:
        If CItest(X,Y|Z) accepts H₀ (independence):
          Remove X—Y from C; Sep(X,Y) = Sep(Y,X) = Z; break
    l += 1
  UNTIL l > max_degree(C)

Step 2 (V-structures):
  P = C (undirected skeleton)
  For each unshielded triple X—Y—Z in C (X,Z non-adjacent):
    If Y ∉ Sep(X,Z): orient P: X→Y←Z

Step 3 (Meek propagation):
  Repeat R1,R2,R3,R4 on P until stable

Return P (the CPDAG)
```

### Consistency Theorem

> [!theorem] Theorem: PC Consistency (SGS 2000, Theorem 5.1)
> Let $P$ be a distribution that is Markov and faithful to DAG $G^*$ on $d$ variables,
> with no hidden common causes. Let $\hat{P}_n$ be the empirical distribution from $n$ i.i.d.
> observations, and let the CI test be consistent at level $\alpha_n$ with $\alpha_n \to 0$
> as $n \to \infty$.
>
> Then as $n \to \infty$, the PC algorithm outputs the CPDAG of $G^*$ with probability
> tending to 1.
^thm-pc-consistency

### Finite-Sample Considerations

- **Multiple testing**: Phase 1 performs $O(p^2 \cdot 2^d)$ tests in the worst case. No standard
  multiple testing correction is applied (each test is at level $\alpha$). This can cause
  inflated false positive / false negative rates.
- **Order dependence**: The original PC is order-dependent — results can change based on the
  order in which variable pairs are tested. **PC-stable** (Colombo & Maathuis 2014) fixes this
  by completing all deletions at depth $l$ before incrementing to $l+1$.
- **Choice of $\alpha$**: Larger $\alpha$ → sparser graph (more edges removed → false negatives).
  Smaller $\alpha$ → denser graph (fewer edges removed → false positives). Common choice: $\alpha \in [0.01, 0.05]$.
- **High-dimensional data**: PC is consistent in the high-dimensional regime $p \gg n$ if the
  graph is sparse and $\alpha_n$ decays appropriately (Kalisch & Bühlmann 2007).

## Examples

> [!example] Example: Four-Variable Chain with Hidden Collider
> True DAG: $X_1 \to X_2 \to X_3 \leftarrow X_4$ (V-structure at $X_3$).
> Skeleton: $X_1 - X_2 - X_3 - X_4$; non-adjacent: $(X_1, X_3)$, $(X_1, X_4)$, $(X_2, X_4)$.
>
> **Phase 1**: With a faithful Gaussian distribution:
> - $X_1 \perp\!\!\!\perp X_3 \mid X_2$ → remove $X_1 - X_3$, Sep($X_1, X_3$) = {$X_2$}
> - $X_1 \perp\!\!\!\perp X_4 \mid \{X_2\}$ or $\{X_3\}$ → remove, Sep($X_1, X_4$) = {$X_2, X_3$}
> - $X_2 \perp\!\!\!\perp X_4 \mid X_3$ → remove, Sep($X_2, X_4$) = {$X_3$}
>
> **Phase 2**: Check unshielded triple $X_2 - X_3 - X_4$:
> - $X_3 \notin$ Sep($X_2, X_4$) = {$X_3$}? No, $X_3 \in$ Sep → leave undirected.
>
> Wait — Sep($X_2, X_4$) = {$X_3$}, so $X_3 \in$ Sep($X_2, X_4$). No V-structure here.
> For triple $X_1 - X_2 - X_3$ (if still in skeleton... since $X_1 - X_3$ was removed):
> Sep($X_1, X_3$) = {$X_2$}. $X_2 \in$ Sep → no V-structure. Correct.
>
> **V-structure $X_3$**: Consider non-adjacent pair $(X_2, X_4)$.
> The unshielded triple is $X_2 - X_3 - X_4$. Sep($X_2, X_4$) = {$X_3$}.
> Is $X_3 \in$ Sep? Yes → no V-structure. But the true DAG has a collider at $X_3$!
>
> Resolution: In this example, conditioning on $X_3$ blocks the path $X_2 \leftarrow X_3 \to X_4$
> if it's a fork, or opens it if it's a collider. The PC algorithm correctly detects:
> Sep($X_2, X_4$) = {$X_3$} only if $X_3$ blocks. For the true collider, conditioning on $X_3$
> *opens* the path, so Sep($X_2, X_4$) should be $\emptyset$. With a correct CI oracle,
> $X_2 \not\perp\!\!\!\perp X_4 \mid X_3$ (the collider is activated by conditioning) but
> $X_2 \perp\!\!\!\perp X_4 \mid \emptyset$. So Sep($X_2, X_4$) = $\emptyset$, and $X_3 \notin$ Sep.
> Phase 2 correctly orients $X_2 \to X_3 \leftarrow X_4$.

## Connections

- **Score-based alternative**: [[Greedy Equivalence Search]] searches directly over CPDAGs using
  a score (BIC), without performing CI tests. GES is generally more robust to model misspecification
  in finite samples.
- **Continuous optimization alternative**: [[NOTEARS - Overview]] and [[NOTEARS Algorithm]] treat
  DAG learning as a smooth optimization — conceptually simpler but targets a single DAG, not the
  CPDAG.
- **PC appears in [[NOTEARS Experiments]]** as one of the baselines that NOTEARS beats on
  dense graphs and is comparable to on sparse graphs.
- **Equivalence class target**: [[Markov Equivalence and CPDAGs]] defines the CPDAG and Meek rules
  that PC's Phase 3 applies.
- **Bayesian networks**: The PC output (CPDAG) defines a set of faithful distributions. In the BN
  literature, this is the learned Bayesian network skeleton + V-structures.

## See Also
- [[Markov Equivalence and CPDAGs]] — theoretical foundation: faithfulness, Markov condition, CPDAG
- [[Greedy Equivalence Search]] — score-based alternative to PC
- [[Causal Structure Learning - Overview]] — paradigm comparison (PC vs. GES vs. NOTEARS)
- [[DAG Structure Learning Problem]] — problem setup, score functions, NP-hardness landscape
- [[NOTEARS - Overview]] — continuous optimization approach to DAG learning
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, causal interpretation
- [[Summary Causal DAGs]] — summarizing learned DAGs from ABM outputs
