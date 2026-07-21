---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) §5; Kalisch & Bühlmann (2007) JMLR; Colombo & Maathuis (2014) JMLR"
date_ingested: 2026-07-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - Peter-Clark algorithm
  - PC-stable
  - constraint-based causal discovery
  - skeleton learning
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines 2000; named for **P**eter Spirtes
> and **C**lark Glymour) is the foundational constraint-based causal discovery method.
> It recovers the [[Markov Equivalence and CPDAGs|CPDAG]] of the true DAG from
> observational data using conditional independence (CI) tests in three phases:
> (1) skeleton discovery by pruning a complete graph via increasingly conditioned CI tests,
> (2) v-structure orientation (unshielded colliders), and (3) Meek rule propagation.
> Under Markov + Faithfulness + causal sufficiency, PC is **consistent**. The PC-stable
> variant (Colombo & Maathuis, 2014) eliminates order-dependence.

## Overview

Causal structure learning from observational data is possible because d-separation
in the true DAG corresponds to conditional independence in the distribution
(under Markov + Faithfulness). The PC algorithm operationalises this: it
**reads off the DAG structure from the pattern of conditional independencies** in the data.

The core insight is that an edge $X - Y$ should exist iff $X$ and $Y$ are
conditionally dependent given every subset of the remaining variables. PC exploits
the **adjacency-first search** property: if no small conditioning set renders $X \perp Y$,
no large one will either (faithfulness implies the separating set, if any, can always be
found among adjacencies of $X$ or $Y$).

## Main Content

### Input and Output

**Input:**
- Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; $n$ observations, $d$ variables
- Significance level $\alpha \in (0, 1)$ for CI tests
- A conditional independence test $\perp_\alpha$ appropriate for the data distribution

**Output:**
- CPDAG $\widehat{\mathcal{C}}$ (completed partially directed acyclic graph)
- Separating sets $\mathrm{sep}(X_i, X_j)$ for non-adjacent pairs

### Phase 1: Skeleton Discovery

> [!definition] Definition: PC Skeleton Phase (Spirtes et al. 2000, Algorithm 5.2)
>
> **Initialise:** Complete undirected graph $\mathcal{G}$ on $d$ nodes.
>
> **For** $\ell = 0, 1, 2, \ldots$:
> - **For** each ordered pair $(X_i, X_j)$ with edge in $\mathcal{G}$:
>   - Let $\mathcal{A} = \mathrm{Adj}(\mathcal{G}, X_i) \setminus \{X_j\}$
>   - **For** each $S \subseteq \mathcal{A}$ with $|S| = \ell$:
>     - **If** $X_i \perp_\alpha X_j \mid S$: remove edge $X_i - X_j$; record $\mathrm{sep}(X_i, X_j) = S$; **break**
> - **If** no edge removed in this $\ell$-round: **stop**
>
> **Return** skeleton $\mathcal{G}$ and separating sets.
^def-pc-skeleton

**Why adjacency-first?** Under faithfulness, if $X_i$ and $X_j$ are not adjacent in the
true DAG, they are d-separated by some subset of $X_i$'s or $X_j$'s neighbours. The
algorithm can therefore restrict the search for separating sets to adjacencies, pruning
as it goes.

**Complexity:** $O(d^{k+2})$ CI tests in the worst case, where $k$ is the maximum
adjacency size (bounded in-degree in the true DAG). For sparse graphs (bounded $k$),
this is polynomial in $d$. Worst case over complete graphs is exponential.

### Phase 2: V-Structure Orientation

After the skeleton is found, orient **unshielded colliders** (v-structures):

> [!definition] Definition: V-Structure Orientation Rule
> For each unshielded triple $X_i - X_k - X_j$ in the skeleton (where $X_i \not\sim X_j$):
>
> - If $X_k \notin \mathrm{sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$
>   *(a v-structure / collider)*
> - Otherwise: leave undirected
^def-vstructure

**Why this works:** In an unshielded triple, if $X_i$ and $X_j$ are marginally dependent
but become independent given $X_k$ (or given $S$ containing $X_k$), then $X_k$ is a
non-collider (mediator or fork): the conditioning opens a path through $X_k$.
Conversely, if $X_k \notin \mathrm{sep}(X_i, X_j)$, conditioning on $X_k$ would
*create* (not destroy) dependence — the hallmark of a collider.

### Phase 3: Meek Rule Propagation

Apply the four Meek (1995) orientation rules repeatedly until no further orientations
can be made (see [[Markov Equivalence and CPDAGs#^def-meek-rules]] for the full rules):

| Rule | Pattern | Orient | Reason |
|------|---------|--------|--------|
| R1 | $A \to B - C$, $A \not\sim C$ | $B \to C$ | Avoid new v-structure |
| R2 | $A \to B \to C$, $A - C$ | $A \to C$ | Avoid directed cycle |
| R3 | $D - A \to C$, $D - B \to C$, $D - C$, $A \not\sim B$ | $C \to D$ | Unambiguous orientation |
| R4 | $A - B \to C \to D$, $A - D$, $A \not\sim C$ | $A \to B$ | Avoid new v-structure |

The Meek rules are **complete**: the CPDAG cannot be further oriented by any argument
that relies only on the skeleton, v-structures, and acyclicity.

### Conditional Independence Tests

The choice of CI test determines the class of distributions the algorithm is valid for:

| Setting | Test | Statistic | Degrees of freedom |
|---------|------|-----------|-------------------|
| Multivariate Gaussian | Partial correlation | Fisher's $z$: $\hat{z} = \frac{1}{2}\log\frac{1+\hat{\rho}_{XY|S}}{1-\hat{\rho}_{XY|S}} \cdot \sqrt{n - |S| - 3}$ | Asymptotically $\mathcal{N}(0,1)$ |
| Discrete / categorical | G-test | $G^2 = 2\sum_{x,y,s} n_{xys}\log\frac{n_{xys} n_s}{n_{xs} n_{ys}}$ | $\chi^2_{(r_x-1)(r_y-1)r_s}$ |
| Non-parametric | KCIT (kernel) | HSIC-based statistic | Permutation / $\Gamma$ approx |
| General | Conditional permutation | Permute $X_i$ within strata of $S$ | Permutation |

For the Gaussian case, Fisher's $z$-test is the standard choice in `pcalg`:
$$\hat{z}_{ij|S} = \frac{1}{2}\log\frac{1+\hat{\rho}_{ij|S}}{1-\hat{\rho}_{ij|S}} \cdot \sqrt{n - |S| - 3} \overset{H_0}{\sim} \mathcal{N}(0,1)$$
where $\hat{\rho}_{ij|S}$ is the sample partial correlation of $X_i$ and $X_j$ given $S$,
computed efficiently from the full correlation matrix via the recursive formula.

### PC-stable: Order-Independent PC

A known issue: the original PC algorithm is **order-dependent** — the CPDAG it returns
can depend on the order in which variables are indexed. This happens because pruned
edges affect which conditioning sets are available for later pairs.

> [!note] PC-stable (Colombo & Maathuis, 2014)
> **Fix:** Compute all CI tests at level $\ell$ before removing any edges at level $\ell$.
> Specifically, separate the decisions (which edges to mark for removal) from the updates
> (actually removing those edges) within each $\ell$-round.
>
> **Result:** PC-stable is **order-independent**: the skeleton is identical regardless
> of variable ordering. PC-stable is the default in `pcalg` (R) and `causal-learn` (Python).

### Correctness and Consistency

> [!theorem] Theorem: PC Consistency (Spirtes et al. 2000, Theorem 5.1)
> Assume:
> 1. **Causal Markov condition**: the true distribution $p$ is Markov to $\mathcal{G}^*$
> 2. **Faithfulness**: $p$ is faithful to $\mathcal{G}^*$
> 3. **Causal sufficiency**: all common causes of observed variables are observed
> 4. **Consistent CI test**: $\alpha_n \to 0$ appropriately with $n$
>
> Then PC-stable consistently identifies the true CPDAG:
> $$\widehat{\mathcal{C}}_n \xrightarrow{p} \mathrm{CPDAG}(\mathcal{G}^*) \text{ as } n \to \infty$$
^thm-pc-consistency

**High-dimensional extension (Kalisch & Bühlmann, 2007):** For multivariate Gaussian
distributions with bounded maximum in-degree $k$, PC with Fisher's $z$-test is consistent
even when $d \gg n$, provided $\log d = o(n^{1/3})$. This allows exponentially many
variables relative to sample size, covering high-dimensional genomic and financial applications.

### FCI: Relaxing Causal Sufficiency

When the causal sufficiency assumption is implausible (hidden common causes may exist),
the **FCI (Fast Causal Inference)** algorithm (Spirtes et al. 2000, Chapter 6) extends PC:

- Adds a second skeleton phase to detect **ancestral** vs. **non-ancestral** relationships
- Outputs a **PAG** (Partial Ancestral Graph) with additional edge marks: `o→` (uncertain
  tail), `↔` (bidirected, indicating a hidden common cause), `o-o` (undetermined)
- FCI requires more CI tests than PC but is valid in the presence of latent confounders

## Examples

> [!example] Example: 4-Variable Chain
> True DAG: $X_1 \to X_2 \to X_3 \to X_4$ (linear Gaussian with Gaussian noise).
>
> **Phase 1 (skeleton):** PC tests all pairs. It finds:
> - $X_1 \perp X_3 \mid X_2$: removes edge $X_1 - X_3$
> - $X_1 \perp X_4 \mid X_2$ (or $X_3$): removes $X_1 - X_4$
> - $X_2 \perp X_4 \mid X_3$: removes $X_2 - X_4$
> - No separating set for adjacent pairs: keeps $X_1 - X_2$, $X_2 - X_3$, $X_3 - X_4$
>
> **Phase 2 (v-structures):** No unshielded triples where the middle node is not in the
> separating set — all unshielded triples are non-colliders (middle node separates endpoints).
>
> **Phase 3 (Meek):** No rule fires without a directed seed edge.
>
> **Output CPDAG:** $X_1 - X_2 - X_3 - X_4$ (all undirected) — correctly representing
> the equivalence class $\{X_1 \to X_2 \to X_3 \to X_4, X_1 \leftarrow X_2 \to X_3 \to X_4, \ldots\}$.

> [!example] Example: Collider (V-structure)
> True DAG: $X_1 \to X_2 \leftarrow X_3$ with $X_1 \not\sim X_3$.
>
> **Phase 1:** $X_1 \perp X_3$ (marginally independent), so edge $X_1 - X_3$ is removed
> with $\mathrm{sep}(X_1, X_3) = \emptyset$. Edges $X_1 - X_2$ and $X_2 - X_3$ remain.
>
> **Phase 2:** Unshielded triple $X_1 - X_2 - X_3$; $\mathrm{sep}(X_1, X_3) = \emptyset$,
> and $X_2 \notin \emptyset$, so orient $X_1 \to X_2 \leftarrow X_3$.
>
> **Output CPDAG:** $X_1 \to X_2 \leftarrow X_3$ — the v-structure is fully identified
> from observational data (the singleton equivalence class).

## Connections

- **Faithfulness violations**: If the distribution is nearly-faithful (path coefficients nearly
  cancel), CI tests may spuriously accept or reject independence, and PC's output can be wrong.
  Robustness to near-violations is an active research area (Uhler et al., 2013).
- **Versus GES**: PC uses CI tests (hypothesis tests), while [[Greedy Equivalence Search]] uses
  a global score. GES tends to be more statistically efficient in large samples; PC is more
  interpretable (which CI test caused each edge removal?).
- **Versus NOTEARS**: [[NOTEARS - Overview]] solves a continuous optimization problem and returns
  a **single DAG** (not a CPDAG) — it does not represent the equivalence class. NOTEARS
  assumes linearity; PC does not.
- **Role in benchmarking**: NOTEARS was explicitly benchmarked against PC (and GES/FGS) in the
  original paper — see [[NOTEARS Experiments]].

## See Also
- [[Markov Equivalence and CPDAGs]] — the theoretical target of PC: CPDAG, v-structures, Meek rules
- [[Greedy Equivalence Search]] — the score-based alternative to PC
- [[DAG Structure Learning Problem]] — the formal problem PC solves
- [[NOTEARS - Overview]] — continuous optimization approach; benchmarked against PC
- [[Constraint vs Score-Based Causal Discovery]] — when to use PC vs GES vs NOTEARS
- [[Directed Acyclic Graphs]] — d-separation and the DAG semantics PC exploits
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns that PC's phases detect
