---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5–6; Meek (1995), UAI"
date_ingested: 2026-09-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Tests for Causal Discovery]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - PC algorithm
  - Peter-Clark algorithm
  - constraint-based structure learning
  - PC stable
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter-Clark; Spirtes & Glymour 1991) is the canonical constraint-based
> method for learning a DAG's Markov equivalence class from observational data. It proceeds in
> two phases: (1) **skeleton learning** — begin with a complete graph, then remove edge $i-j$ when
> a conditioning set $S_{ij}$ making $X_i \perp X_j \mid X_{S_{ij}}$ is found; (2) **orientation**
> — orient v-structures (unshielded colliders) and apply Meek's rules to propagate directions.
> The output is the **CPDAG** of the true DAG, with soundness and completeness guarantees under
> causal Markov, faithfulness, and causal sufficiency. PC is the foundational baseline for all
> constraint-based causal discovery and is implemented in the `pcalg` (R) and `causal-learn` (Python) packages.

## Overview

Structure learning algorithms fall into two paradigms (see [[DAG Structure Learning Problem]]):
**score-based** (search for the DAG/CPDAG maximising a score) and **constraint-based** (use CI
tests to determine which edges exist and how they orient). The PC algorithm is the prototype of the
constraint-based approach.

**Why constraint-based?** Score-based methods like [[GES - Greedy Equivalence Search]] optimize a
global score over the combinatorial DAG space — exact optimization is NP-hard, so GES uses greedy
search. PC instead relies on a weaker condition: given enough data, the CI tests will correctly
determine the skeleton and v-structures. This gives PC stronger theoretical guarantees when the
faithfulness assumption holds and CI tests are consistent.

**Assumptions (PC):**
1. **Causal Markov condition** — the true data-generating DAG $\mathcal{G}^*$ satisfies the Markov condition.
2. **Faithfulness** — the distribution is faithful to $\mathcal{G}^*$ (no accidental cancellations).
3. **Causal sufficiency** — no latent common causes; all common causes of observed variables are observed.

Under these three conditions, PC returns the correct CPDAG with probability tending to 1 as $n \to \infty$
(for consistent CI tests).

## Main Content

### Phase 1: Skeleton learning

The key insight: under Markov + faithfulness, $X_i$ and $X_j$ are **non-adjacent** in $\mathcal{G}^*$
iff there exists a set $S \subseteq V \setminus \{i, j\}$ that d-separates them: $X_i \perp X_j \mid X_S$.

PC exploits this by searching for such separating sets, starting from small to large:

> [!theorem] Algorithm: PC Phase 1 — Skeleton Learning (Spirtes & Glymour 1991)
>
> **Input:** Data $\mathbf{X}^{(n)}$, significance level $\alpha$, CI test $T$
>
> **Initialize:** $C \leftarrow$ complete undirected graph on $d$ nodes; $\text{Sepset}[i,j] \leftarrow \emptyset$ for all $i,j$.
>
> **For** $\ell = 0, 1, 2, \ldots$ until no edge removed in pass $\ell$:
> - **For** each adjacent pair $(i, j)$ in $C$ (in any order):
>   - **For** each $S \subseteq \text{adj}(C, i) \setminus \{j\}$ with $|S| = \ell$ (or by symmetry $\text{adj}(C,j)\setminus\{i\}$):
>     - If $T$ fails to reject $X_i \perp X_j \mid X_S$ at level $\alpha$:
>       - Remove edge $i - j$ from $C$
>       - $\text{Sepset}[i,j] \leftarrow \text{Sepset}[j,i] \leftarrow S$
>       - Break (move to next pair)
>
> **Output:** Skeleton $C$ and separation sets $\text{Sepset}[\cdot]$
>
> **Complexity:** $O\!\left(d^{p_{\max}+2}\right)$ CI tests where $p_{\max}$ = max adjacency
> (bounded by max in-degree of $\mathcal{G}^*$ in the sparse case).
^thm-pc-phase1

**Why small to large $|S|$?** Starting with $|S|=0$ (marginal independence) first removes the
most obvious non-edges cheaply. Later passes use smaller adjacency sets because earlier passes
have already pruned the graph — conditioning sets never need to exceed the current adjacency degree.

**Key correctness property:** If the true adjacency set of $X_i$ in $\mathcal{G}^*$ is
$\text{Pa}(i) \cup \text{Ch}(i) \cup \text{Sp}(i)$ (parents + children + spouses), then
the d-separation of non-adjacent $X_i, X_j$ can always be achieved by conditioning on a subset
of these. The algorithm will find the separator.

### Phase 2: V-structure orientation

After obtaining the skeleton, orient v-structures (unshielded colliders):

> [!theorem] Algorithm: PC Phase 2 — V-structure and Meek Orientation
>
> **Input:** Skeleton $C$, separation sets $\text{Sepset}[\cdot]$
>
> **Step 2a (V-structures):** For each triple $(i, k, j)$ where $i-k-j$ in $C$ but $i \not\sim j$:
> - If $k \notin \text{Sepset}[i,j]$: orient $i \to k \leftarrow j$ (collider / v-structure)
>
> *(Intuition: if $k$ is in the separator, conditioning on $k$ d-separates $i$ and $j$ through the
> chain $i-k-j$. If $k$ is NOT in the separator, making $k$ a collider explains why $i \perp j$
> marginally but $i \not\perp j \mid k$.)*
>
> **Step 2b (Meek Rules):** Apply Meek's four rules (R1–R3 + acyclicity) exhaustively to orient
> remaining undirected edges without creating new v-structures or directed cycles.
> See [[Markov Equivalence Classes and CPDAGs#^thm-meek-rules]].
>
> **Output:** CPDAG $\hat{\mathcal{C}}$
^thm-pc-phase2

**Worked example.** Variables $A, B, C, D$. True DAG: $A \to C \leftarrow B$, $C \to D$.

Phase 1 tests: $A \perp B$ (marginally, no conditioning set): $\text{Sepset}[A,B] = \emptyset$.
Result: skeleton $A - C - B - D$ with $A \not\sim B$, $A \not\sim D$, $B \not\sim D$.

Phase 2: Triple $(A, C, B)$ — $C \notin \text{Sepset}[A,B] = \emptyset$, so orient $A \to C \leftarrow B$.
Meek R1: $A \to C - D$ and $A \not\sim D$, so orient $C \to D$.
Result: CPDAG $A \to C \leftarrow B$, $C \to D$ (correct).

### Soundness and completeness

> [!theorem] Theorem: PC Consistency (Spirtes et al. 2000, Theorem 5.1)
> Under causal Markov, faithfulness, causal sufficiency, and a consistent CI test $T_n$ (i.e.,
> $P(\text{reject }H_0 \mid H_0 \text{ false}) \to 1$ and $P(\text{reject }H_0 \mid H_0 \text{ true}) \to 0$
> as $n \to \infty$ for any $\alpha_n \to 0$ at the right rate):
>
> $$P\!\left(\hat{\mathcal{C}}_n = \mathcal{C}(\mathcal{G}^*)\right) \to 1 \quad \text{as } n \to \infty.$$
>
> That is, PC returns the true CPDAG with probability tending to 1 (in the large-$n$ limit).
^thm-pc-consistency

The key challenge is finite samples: with limited data, CI tests have limited power, and false
positives (spurious non-rejections) can cause the algorithm to miss edges or mis-orient v-structures.

### Order-independence: PC-stable

The original PC algorithm is **order-dependent**: the skeleton learned in Phase 1 depends on
the order in which variables and conditioning sets are processed, because removing an edge in one
pass changes the adjacency sets used in subsequent passes.

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> **PC-stable** is a modified version of PC that completes each adjacency level $\ell$ using
> only the adjacency structure at the *start* of that level, not the one modified mid-pass.
> This makes the skeleton uniquely determined by the data (order-independent) at every $\ell$.
>
> PC-stable has the same asymptotic guarantees as PC and is the default implementation in
> `pcalg::pc()` (`u2pd = "stable"`) and `causal-learn`.
^def-pc-stable

### High-dimensional PC ($d \gg n$)

**PC with Gaussian BIC / partial correlation** scales to thousands of variables when the true
skeleton is sparse ($p_{\max}$ small). Kalisch & Bühlmann (2007) establish consistency in the
high-dimensional Gaussian case with $\alpha = C n^{-a}$ for $a \in (0, 1/2)$.

In practice:
- `pcalg::pc()` in R with `test = gaussCItest` — uses the Fisher Z-test efficiently.
- `causal-learn::PC` in Python — flexible test choice, supports Fisher Z, Chi2, KCI.

## Comparison to NOTEARS and GES

| Property | PC | GES | NOTEARS |
|----------|-----|-----|---------|
| Paradigm | Constraint-based | Score-based | Continuous optimization |
| Output | CPDAG | CPDAG | DAG |
| Identifiability | MEC (Markov equiv class) | MEC | MEC (linear Gaussian) |
| Main assumption | Faithfulness + sufficiency | Faithfulness + sufficiency | Faithfulness (linear SEM) |
| Latent variables | No (use FCI) | No (use FCI) | No |
| Scalability | $O(d^{p_{\max}+2})$ CI tests | $O(d^2)$ score evals | $O(d^3)$ (matrix exp) |
| Finite-sample | Sensitive to $\alpha$ choice | Sensitive to score/BIC penalty | Sensitive to $\lambda$ |

## Connections

- **NOTEARS vs. PC:** [[NOTEARS - Overview]] cites PC as a "constraint-based" baseline in its
  method landscape table. PC's order-sensitivity and scalability issues motivated NOTEARS's
  continuous optimization approach, though both target the same object (MEC/CPDAG in the
  Gaussian linear setting).
- **GES vs. PC:** [[GES - Greedy Equivalence Search]] is score-based rather than test-based.
  GES often outperforms PC empirically on dense graphs where the adjacency sets are large and
  CI tests lose power.
- **FCI (beyond causal sufficiency):** The FCI algorithm (Fast Causal Inference, Spirtes et al.
  2000) relaxes causal sufficiency (allows latent common causes). FCI uses the same CI-test skeleton
  as PC but outputs a **PAG** (Partial Ancestral Graph) that marks edges possibly involving latent
  ancestors.
- **Causal DAG notes:** [[Directed Acyclic Graphs]] covers d-separation, do-calculus, and the
  back-door criterion — the downstream causal inference that PC's CPDAG output feeds into.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG that PC outputs
- [[Conditional Independence Tests for Causal Discovery]] — the tests used in Phase 1
- [[GES - Greedy Equivalence Search]] — the score-based alternative
- [[NOTEARS - Overview]] — continuous optimization approach, contrast
- [[DAG Structure Learning Problem]] — formal setup and prior method landscape
- [[Directed Acyclic Graphs]] — causal reasoning with DAGs
- [[Summary Causal DAGs]] — DAG summarization that assumes a DAG is given
