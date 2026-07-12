---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-PC-algorithm.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) CPS, Ch. 5; Spirtes & Glymour (1991)"
date_ingested: 2026-07-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Tests for Structure Learning]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "PC causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter–Clark, named for its authors) is the canonical constraint-based causal
> discovery algorithm. It recovers the **CPDAG** of the true causal DAG from observational data in
> three phases: (1) **skeleton discovery** — start from a complete graph and remove edges whose
> endpoints can be d-separated by some conditioning set; (2) **v-structure orientation** — use the
> recorded separation sets to identify unshielded colliders; (3) **Meek orientation propagation** —
> apply four orientation rules to further orient reversible edges. Under Markov + faithfulness, PC is
> asymptotically consistent: in the large-sample limit with oracle CI information, it recovers the
> true CPDAG exactly.

## Overview

The PC algorithm was introduced by Spirtes & Glymour (1991) and fully developed in Spirtes,
Glymour & Scheines (2000). It operationalises the insight that, under the Markov condition and
faithfulness, **conditional independence = d-separation**: every CI relation in the data
corresponds to a d-separation in the true graph. Starting from a complete graph (all pairs adjacent),
PC systematically removes edges by finding conditioning sets that d-separate pairs, then orients
what remains.

The algorithm's computational savings over exhaustive search come from the **order-independence
of skeleton search**: for sparse graphs with maximum degree $k$, at most $O(d^{k+2})$ CI tests
are needed (polynomial in $d$ for bounded $k$).

## Main Content

### Input and Output

> [!definition] PC Algorithm: Input and Output
> **Input:** Observational data matrix $\mathbf{X} \in \mathbb{R}^{n\times d}$ on $d$ variables;
> significance level $\alpha$ for CI tests; a CI testing procedure (see
> [[Conditional Independence Tests for Structure Learning]]).
>
> **Output:** A CPDAG $\mathcal{C}$ over $d$ nodes, representing the Markov equivalence class of
> the true data-generating DAG (under Markov + faithfulness).
^def-pc-io

### Phase 1: Skeleton Discovery

> [!definition] PC Phase 1 — Skeleton Discovery (Spirtes et al. 2000, Algorithm B)
> **Initialise** $G^0$ as the complete undirected graph on $\{X_1, \ldots, X_d\}$.
> **Set** $\ell \leftarrow 0$.
>
> **Repeat:**
> For each ordered pair $(X_i, X_j)$ adjacent in the current skeleton:
> - For each subset $\mathbf{S} \subseteq \text{Adj}(X_i) \setminus \{X_j\}$ with $|\mathbf{S}| = \ell$:
>   - Test $H_0: X_i \perp X_j \mid \mathbf{S}$ at level $\alpha$.
>   - If not rejected: remove edge $X_i$–$X_j$, record $\text{SepSet}(X_i, X_j) \leftarrow \mathbf{S}$, and go to next pair.
> **Increment** $\ell \leftarrow \ell + 1$.
>
> **Stop** when, for every adjacent pair $(X_i, X_j)$, $|\text{Adj}(X_i) \setminus \{X_j\}| < \ell$.
>
> **Note:** The algorithm tests *subsets of neighbours of $X_i$* (not all subsets of all variables),
> making complexity proportional to the local graph density.
^def-pc-phase1

> [!note] Why start from a complete graph?
> PC begins at the "maximally connected" point and removes edges — the opposite of greedy
> edge-addition. This is consistent with the **faithfulness assumption**: non-adjacent pairs *must*
> be separated by some set $\mathbf{S}$, and PC finds that set. If faithfulness held and PC were
> run with oracle CI information, every non-adjacent pair would be found separable and correctly removed.

> [!note] Order-independence issue
> The original PC algorithm is **order-dependent**: the order in which pairs are examined affects
> which separation sets are found (when multiple separating sets exist), which can affect v-structure
> orientation. **Conservative PC** (Ramsey et al. 2012) and **PC-stable** (Colombo & Maathuis 2014)
> fix this by processing all pairs at level $\ell$ before moving to $\ell+1$, making the skeleton
> order-independent.

### Phase 2: V-Structure Orientation

> [!definition] PC Phase 2 — V-Structure Orientation
> For each **unshielded triple** $(X_i, X_k, X_j)$ in the skeleton (i.e., $X_i$–$X_k$–$X_j$
> with no edge between $X_i$ and $X_j$):
> - If $X_k \notin \text{SepSet}(X_i, X_j)$: orient $X_i \to X_k \leftarrow X_j$ (a **v-structure**).
> - If $X_k \in \text{SepSet}(X_i, X_j)$: do not orient (may be determined in Phase 3).
^def-pc-phase2

The recorded separation sets from Phase 1 are used here — this is why storing $\text{SepSet}(X_i,X_j)$
is essential, not just the skeleton. See [[Markov Equivalence and CPDAGs]] for why v-structures are
uniquely identifiable.

### Phase 3: Orientation Propagation (Meek Rules)

> [!definition] PC Phase 3 — Meek Orientation Rules
> Apply Meek's (1995) rules **repeatedly** until no new orientations can be derived. Full rules are
> stated in [[Markov Equivalence and CPDAGs#^def-meek-rules]].
>
> **R1 (No new v-structure):** $X \to Y$ – $Z$, no $X$–$Z$ edge $\Rightarrow Y \to Z$.
> **R2 (Acyclicity):** $X \to Y \to Z$, $X$–$Z$ undirected $\Rightarrow X \to Z$.
> **R3, R4:** Handle more complex configurations.
>
> Remaining undirected edges after all rules are exhausted represent truly unidentifiable directions —
> both orientations are consistent with the data.
^def-pc-phase3

### Full Pseudocode

> [!example] Algorithm: PC (Spirtes et al. 2000)
> ```
> PC(Data X, significance α, CI-test):
>   G ← complete undirected graph on {X₁,...,Xd}
>   SepSet ← empty map (pairs → conditioning sets)
>
>   # Phase 1: Skeleton
>   ℓ ← 0
>   repeat:
>     for each adjacent pair (Xᵢ, Xⱼ) in G:
>       for each S ⊆ Adj(Xᵢ) \ {Xⱼ} with |S| = ℓ:
>         if CI-test(Xᵢ, Xⱼ | S, X) not rejected at α:
>           remove edge Xᵢ–Xⱼ from G
>           SepSet(Xᵢ,Xⱼ) ← S; SepSet(Xⱼ,Xᵢ) ← S
>           break
>     ℓ ← ℓ + 1
>   until ∀ adjacent (Xᵢ,Xⱼ): |Adj(Xᵢ)\{Xⱼ}| < ℓ
>
>   # Phase 2: V-structures
>   for each unshielded triple Xᵢ–Xk–Xⱼ (Xᵢ,Xⱼ not adjacent):
>     if Xk ∉ SepSet(Xᵢ,Xⱼ):
>       orient Xᵢ→Xk←Xⱼ
>
>   # Phase 3: Meek rules
>   repeat:
>     apply R1, R2, R3, R4 to G
>   until no changes
>
>   return G  ← CPDAG
> ```
^algo-pc

### Correctness and Consistency

> [!theorem] Theorem: PC Oracle Correctness (Spirtes et al. 2000, Theorem 5.1)
> If the Markov condition and faithfulness hold, and CI tests are exact (oracle), then PC returns
> the **CPDAG** of the true data-generating DAG.
^thm-pc-correct

> [!theorem] Theorem: PC Statistical Consistency (follows from faithfulness + test consistency)
> Under the Markov and faithfulness assumptions, if the CI test is **consistent** at level
> $\alpha_n \to 0$ (with $\alpha_n$ shrinking appropriately with $n$), then PC returns the true
> CPDAG **with probability approaching 1** as $n \to \infty$.
^thm-pc-consistent

### Complexity

> [!theorem] Complexity: PC Algorithm
> Let $d$ be the number of variables and $k$ the maximum degree of any node in the true skeleton.
> The number of CI tests performed is at most $O\!\left(d^{k+2}\right)$, which is **polynomial in $d$
> for any fixed $k$** (i.e. for sparse graphs). Each CI test costs $O(n)$ for Fisher-Z or $O(n \log n)$
> for $G^2$. Total runtime: $O(d^{k+2} \cdot n)$.
>
> For dense graphs ($k = \Theta(d)$), PC is exponential, matching the intractability of the problem.
^thm-pc-complexity

### Comparison: PC vs GES vs NOTEARS

| Property | PC | GES | NOTEARS |
|----------|----|-----|---------|
| **Paradigm** | Constraint-based (CI tests) | Score-based (greedy) | Continuous optimization |
| **Output** | CPDAG | CPDAG | Single DAG |
| **Identifiability** | Equivalence class only | Equivalence class only | Full DAG (linear SEM assumed) |
| **Assumption** | Markov + faithfulness | Markov + faithfulness + score equiv. | Linear SEM |
| **Tuning** | Significance $\alpha$ | None | $\lambda$ (sparsity) |
| **Scalability** | $O(d^{k+2})$ tests | $O(d^{k+2})$ score evaluations | $O(d^3)$ per iteration |
| **Error propagation** | Skeleton errors propagate | Local score errors; can backtrack | Smooth, gradient-based |

## Software

> [!note] Software Implementations
> - **R**: `pcalg` package — `pc()` and `ges()` functions; supports Fisher-Z, $G^2$, kernel-CI.
>   Reference: Kalisch et al. (2012), *Journal of Statistical Software* 47(11).
>   Install: `install.packages("pcalg")`
> - **Python**: `causal-learn` (formerly `causal-discovery-toolbox`) — `PC` class.
>   Install: `pip install causal-learn`
> - **Python**: `gcastle` (Huawei) — includes PC, GES, NOTEARS, and 20+ others.
>   Install: `pip install gcastle`
> - **TETRAD** (Java): original CMU implementation, with GUI; also Python wrapper `py-tetrad`.
^note-software

## Connections

- **Parent of constraint-based causal discovery**: PC is the prototypical algorithm; FCI
  (Fast Causal Inference) extends it to allow hidden confounders.
- **Used in NOTEARS benchmarks**: NOTEARS Experiments compares against PC (constraint-based), FGS,
  and GES — see [[NOTEARS Experiments]].
- **Paired with GES in practice**: PC and GES often give similar results but with different finite-sample
  behaviour. GES avoids test multiplicity; PC avoids search non-identifiability.
- **CI tests are the key modelling choice**: Fisher-Z for Gaussian data, $G^2$ for discrete,
  kernel-HSIC for non-linear — see [[Conditional Independence Tests for Structure Learning]].
- **Connects to broader causal inference**: the CPDAG output by PC is the starting point for
  computing adjustment sets, natural direct/indirect effects, and other causal quantities — see
  [[Directed Acyclic Graphs]].

## See Also
- [[Constraint-Based Causal Discovery]] — the general framework PC instantiates
- [[Markov Equivalence and CPDAGs]] — Verma-Pearl theorem, CPDAG, Meek rules (Phase 3 details)
- [[Conditional Independence Tests for Structure Learning]] — which CI test to use in Phase 1
- [[Greedy Equivalence Search (GES)]] — score-based alternative
- [[NOTEARS - Overview]] — continuous optimization alternative with full DAG identification
- [[NOTEARS Experiments]] — benchmarks comparing PC vs GES vs NOTEARS
- [[DAG Structure Learning Problem]] — formal problem setup
