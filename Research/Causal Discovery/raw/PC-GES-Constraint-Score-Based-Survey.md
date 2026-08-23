---
title: "PC Algorithm and GES: Constraint-Based and Score-Based Causal Discovery"
source: "https://doi.org/10.7551/mitpress/1754.001.0001"
author:
  - "[[Peter Spirtes]]"
  - "[[Clark Glymour]]"
  - "[[Richard Scheines]]"
  - "[[David Maxwell Chickering]]"
published: "2000 / 2002"
created: 2026-08-23
description: >
  Survey of the two classical approaches to causal structure learning from observational data:
  (1) the PC algorithm (Spirtes, Glymour & Scheines 2000) — constraint-based recovery of the
  Markov equivalence class via conditional independence tests; (2) Greedy Equivalence Search
  (Chickering 2002, JMLR) — score-based greedy search over equivalence classes with consistency
  guarantees. Both target the CPDAG of the data-generating DAG under the faithfulness and Markov
  assumptions. Source PDFs (jmlr.org, NOTEARS arXiv) blocked by session network policy; content
  drawn from comprehensive coverage of these papers in the causal discovery literature.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/causal-discovery"
  - "topic/causal-inference"
---

# PC Algorithm and GES: Foundational Causal Structure Learning

This survey covers the two classical paradigms for learning causal structure (DAGs) from
observational data:

1. **Constraint-based methods**: PC algorithm (Spirtes & Glymour 1991; Spirtes, Glymour &
   Scheines 2000 — the "SGS" book, 2nd ed., MIT Press).
2. **Score-based methods**: Greedy Equivalence Search / GES (Chickering 2002, JMLR 3: 507–554).

Both methods are contrasted with the **continuous optimization** approach in the vault's existing
notes: [[NOTEARS - Overview]].

---

## Background: Markov Equivalence and CPDAGs

### The Markov Condition

> **Definition (Markov Condition, SGS §2):** A DAG $G = (\mathbf{V}, \mathbf{E})$ satisfies the
> **Markov condition** with respect to distribution $P$ if every variable $X_i$ is independent
> of its non-descendants given its parents in $G$:
> $$X_i \perp \!\!\! \perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i)$$
> Equivalently (by the d-separation criterion), two variables $X$ and $Y$ are conditionally
> independent given $Z$ in $P$ whenever they are d-separated by $Z$ in $G$:
> $$(X \perp \!\!\! \perp Y \mid Z)_G \Rightarrow (X \perp \!\!\! \perp Y \mid Z)_P$$

### The Faithfulness Condition

> **Definition (Faithfulness, SGS §2):** Distribution $P$ is **faithful** to DAG $G$ if the
> conditional independencies in $P$ correspond *exactly* to the d-separations in $G$:
> $$(X \perp \!\!\! \perp Y \mid Z)_P \Leftrightarrow (X \perp \!\!\! \perp Y \mid Z)_G$$
> Faithfulness rules out "accidental" independencies caused by cancellation of paths
> (e.g., two directed paths from $X$ to $Y$ with equal and opposite coefficients in a linear SEM).

Without faithfulness, learning is impossible from independence tests alone: a path that "should"
be dependent may appear independent by coefficient cancellation.

### Markov Equivalence and the Skeleton/V-Structure Theorem

Two DAGs are **Markov equivalent** if they encode exactly the same set of conditional
independence constraints (i.e., they have the same d-separation relations).

> **Theorem (Verma & Pearl 1990; Meek 1995):** Two DAGs $G_1$ and $G_2$ on the same vertex
> set are Markov equivalent if and only if:
> 1. They have the same **skeleton** (undirected adjacency structure), AND
> 2. They have the same **unshielded colliders** (V-structures: $X \to Z \leftarrow Y$ where
>    $X$ and $Y$ are not adjacent).

This characterization is the theoretical engine of constraint-based discovery.

### CPDAGs (Completed Partially Directed Acyclic Graphs)

A **Markov equivalence class** is a set of DAGs that encode the same independence model. It is
represented uniquely by a **CPDAG** (also called an **essential graph** by Andersson et al. 1997):

- **Directed edges** in the CPDAG appear with the same orientation in **every** DAG in the class.
- **Undirected edges** in the CPDAG change orientation across different DAGs in the class.

> **CPDAG characterization (Meek 1995):** A graph $H$ is a CPDAG if and only if:
> (a) $H$ has no directed cycles, and
> (b) Each undirected edge $X - Y$ in $H$ belongs to at least one DAG in the equivalence class,
>     and reversing it (to form $X \leftarrow Y$) produces a DAG that is also in the same class.

### Meek's Orientation Rules

After identifying V-structures, additional edges can be oriented by Meek's (1995) four rules
that preserve equivalence (avoid creating new V-structures or directed cycles):

| Rule | Condition | Conclusion |
|------|-----------|------------|
| **R1** | $A \to B - C$ and $A - C$ absent | Orient $B \to C$ (else new V-structure $A \to B \leftarrow C$) |
| **R2** | $A \to C \leftarrow B$ and $A - B$ present | Orient $A \to B$ (else directed cycle $A - B \to C \to A$) |
| **R3** | $A - B$, $A - C$, $B \to D$, $C \to D$, $B - C$ absent | Orient $A \to D$ |
| **R4** | $A - B$, $B \to C \to D$, $A - C$ present, $A - D$ absent | Orient $A \to B$ |

Apply R1–R4 exhaustively until no more edges can be oriented.

---

## Part 1: The PC Algorithm (Spirtes, Glymour & Scheines 2000)

The name "PC" stands for its inventors: **P**eter Spirtes and **C**lark Glymour.
Originally described in Spirtes & Glymour (1991), fully developed in SGS (2000) Chapter 5.

### Assumptions

1. **Markov condition**: the data-generating distribution $P$ satisfies the Markov condition
   with respect to a DAG $G$.
2. **Faithfulness**: $P$ is faithful to $G$.
3. **Causal sufficiency**: no hidden common causes (no unmeasured confounders).
4. **Oracle**: a perfect conditional independence test (asymptotically approximated by
   partial correlations for Gaussian data, mutual information for discrete data).

Under these conditions, the PC algorithm is **consistent**: it returns the CPDAG of $G$ in the
limit of infinite data.

### Algorithm: Three Phases

#### Phase 1 — Skeleton Discovery (Conditional Independence Testing)

```
Input: Variables V, independence oracle (or statistical CI test)
Output: Skeleton C (undirected graph) and separation sets Sep(X,Y) for all removed edges

1. Start with complete undirected graph C over V
2. Initialize l = 0 (conditioning set size)
3. REPEAT:
   For each edge X — Y in C:
     If there exists a set Z ⊆ Adj(X,C) \ {Y} with |Z| = l such that X ⊥ Y | Z:
       Remove edge X — Y from C
       Record Sep(X,Y) = Sep(Y,X) = Z
   Increment l = l + 1
4. UNTIL no more edges can be removed
```

**Key insight**: the algorithm exploits the PC property that, in a faithful distribution,
if $X \perp\!\!\!\perp Y \mid Z$ for some $Z$, then $Z \subseteq \mathrm{Adj}(X)$ or
$Z \subseteq \mathrm{Adj}(Y)$ — so we only need to test conditioning sets among the
*current neighbours* of each pair, making the search tractable.

**Complexity**: In the worst case (dense graphs), exponential. For sparse graphs (bounded degree
$d$), only $O(p^2 \binom{d}{l})$ conditional independence tests are needed at depth $l$. This
makes PC very efficient on sparse graphs (the typical assumption in practice).

#### Phase 2 — V-Structure (Unshielded Collider) Orientation

```
For each triple X — Y — Z in skeleton where X and Z are NOT adjacent:
  If Y ∉ Sep(X,Z):   // Y was NOT used to separate X and Z
    Orient as X → Y ← Z  (unshielded collider / V-structure)
  // Otherwise leave X — Y — Z undirected (Y IS in the separation set)
```

**Rationale**: If Y is not in Sep(X,Z), then Y "blocks" the path X — Y — Z when we
condition on it. The only structure that produces this pattern of dependence/independence
is the V-structure $X \to Y \leftarrow Z$.

#### Phase 3 — Meek Rule Propagation

```
Apply orientation rules R1, R2, R3, R4 exhaustively until no more edges can be oriented.
```

**Output**: A CPDAG representing the Markov equivalence class of the true DAG $G$.

### Consistency Theorem

> **Theorem (Spirtes, Glymour & Scheines 2000, Theorem 5.1):** Let $(G, P)$ be a faithful
> causal structure with no hidden variables (causal sufficiency). With a perfect conditional
> independence oracle:
> - The PC algorithm terminates in finite time, and
> - The output CPDAG is exactly the CPDAG of $G$.
>
> For finite samples with a consistent CI test at level $\alpha_n \to 0$ as $n \to \infty$,
> the PC algorithm is consistent: output converges to the true CPDAG in probability.

### Practical Notes

- **Gaussian case**: Use Fisher's $z$-transform for partial correlations as the CI test.
  For $X, Y, Z$ with correlation matrix $\Sigma$, the partial correlation is:
  $$\rho_{XY|Z} = -\frac{\Sigma^{-1}_{XY}}{\sqrt{\Sigma^{-1}_{XX}\Sigma^{-1}_{YY}}}$$
  and the test statistic is $\sqrt{n-|Z|-3} \cdot \frac{1}{2}\log\frac{1+\hat{\rho}}{1-\hat{\rho}} \sim N(0,1)$ under $H_0$.
- **Discrete case**: Use G-test (likelihood ratio) or $\chi^2$ test of conditional independence.
- **Significance level**: The choice of $\alpha$ affects sparsity — larger $\alpha$ gives
  sparser skeleton (fewer false edges); smaller $\alpha$ gives denser graph (more false edges).
  No universally correct choice; $\alpha \in [0.01, 0.05]$ is common practice.
- **Order-dependence**: The original PC algorithm is **order-dependent**: the skeleton and
  V-structures can vary depending on the order in which variables are tested. The **PC-stable**
  variant (Colombo & Maathuis 2014) fixes this by running the skeleton phase in a way that is
  invariant to variable ordering.
- **FCI extension**: The **Fast Causal Inference (FCI)** algorithm extends PC to allow hidden
  common causes (relaxes causal sufficiency), producing a **PAG** (Partial Ancestral Graph).

### Software

- **R**: `pcalg` package (`pc()` function) — full PC-stable and FCI implementation
- **Python**: `causal-learn` (py-why/causal-learn) — `PC` class
- **Tigramite**: `pcmci` for time-series causal discovery (extension of PC)

---

## Part 2: Greedy Equivalence Search (Chickering 2002)

Chickering, D.M. (2002). Optimal Structure Identification With Greedy Search.
*Journal of Machine Learning Research* **3**: 507–554.

### Key Innovation

GES searches directly in the **space of Markov equivalence classes** (CPDAGs), not the space of
DAGs. Each step in the search adds or removes an edge and re-orients the resulting graph to its
CPDAG. This avoids:
(a) Checking for acyclicity at every step (handled by the CPDAG representation)
(b) Redundant search through equivalent DAGs

The algorithm is **complete**: Chickering (2002) proved the **Meek Conjecture** (Meek 1997),
which guarantees that the GES search path connects any two CPDAGs — ensuring GES can escape
local optima reachable from any starting point.

### Scoring Criterion

GES uses a **locally consistent scoring criterion** $S(G, \mathbf{X})$:

> **Definition (Local Consistency):** Scoring criterion $S$ is locally consistent if, for any
> DAG $G$ and its Markov-equivalent DAG $G'$ obtained by covered edge reversal:
> 1. $S(G', \mathbf{X}) > S(G, \mathbf{X})$ if $G'$ is a better I-map (strictly closer to $P$)
> 2. $S(G', \mathbf{X}) < S(G, \mathbf{X})$ if $G$ is the better I-map

The canonical choices:
- **BIC score** (Bayesian Information Criterion) for continuous data: $S(G) = \ell(G, \mathbf{X}) - \frac{\log n}{2}|G|$
  where $\ell$ is the log-likelihood and $|G|$ is the number of parameters. Locally consistent.
- **BDe score** (Bayesian Dirichlet equivalent) for discrete data: proportional to the marginal
  likelihood under a Dirichlet prior. Locally consistent under a uniform parameter prior.

### Algorithm: Two Phases

#### Phase 1 — Forward Equivalence Search (FES)

```
Input: Data X, scoring criterion S
Start: Empty graph H = ∅

REPEAT:
  For each pair (X, Y) not adjacent in H, and each subset T ⊆ Adj(H, X):
    Compute score gain Δ(S) of inserting edge X → Y with T as parents
  If max Δ(S) > 0:
    Apply the best insert(X, Y, T) to H
    Orient H to its CPDAG
UNTIL no positive-gain insert exists
```

**The Insert operator**: `insert(X, Y, T)` inserts $X \to Y$, directing all previously
undirected edges in $T$ toward $Y$, and then re-orients the graph to its CPDAG.
This is the "covered clique" step that ensures the result is a valid CPDAG.

#### Phase 2 — Backward Equivalence Search (BES)

```
Input: CPDAG H from FES
REPEAT:
  For each edge X — Y or X → Y in H, and each subset H ⊆ Adj(H, X) ∩ Adj(H, Y):
    Compute score gain Δ(S) of deleting edge X-Y with H as the "H-set"
  If max Δ(S) > 0:
    Apply the best delete(X, Y, H) to H
    Orient H to its CPDAG
UNTIL no positive-gain delete exists
```

**The Delete operator**: `delete(X, Y, H)` removes the edge $X - Y$ (or $X \to Y$),
un-directs edges in $H$ (making them undirected), and re-orients the graph to its CPDAG.

**Why two phases?** The FES phase can overshoot (add too many edges at finite $n$). The BES
phase prunes overfitted edges and can be understood as a form of the Occam's razor principle.
Together, they implement a forward-backward greedy search that is asymptotically consistent.

### The Meek Conjecture (Proved by Chickering 2002)

> **Theorem (Chickering 2002, Theorem 1 — Meek Conjecture):** Let $G$ be a DAG that is a
> perfect I-map of distribution $P$, and let $H$ be any other DAG that is also a perfect I-map
> of $P$ (i.e., $H$ encodes a superset of the independencies of $G$, but is a DAG). Then there
> exists a sequence of **covered edge reversals** in $G$ that transforms $G$ into $H$ through
> a sequence of intermediate DAGs, each of which is also an I-map.
>
> **Covered edge**: Edge $X \to Y$ is **covered** if $\mathrm{Pa}(Y) = \mathrm{Pa}(X) \cup \{X\}$
> (i.e., $Y$ has exactly the same parents as $X$ plus $X$ itself).
>
> **Significance**: The covered edge reversal path means GES can move from any starting CPDAG
> to the optimal CPDAG by a sequence of legal (score-improving) moves. Without this, GES could
> get stuck in a local optimum in the CPDAG space.

### Consistency of GES

> **Theorem (Chickering 2002, Theorem 15):** Let $(G^*, P)$ be a faithful causal structure
> satisfying causal sufficiency. Under a locally consistent scoring criterion $S$:
> - In the limit $n \to \infty$, FES terminates at the CPDAG of $G^*$, and
> - BES applied to the FES output also terminates at the CPDAG of $G^*$.
>
> Therefore GES is consistent: the output converges in probability to the true CPDAG.

### Comparison: PC vs. GES

| Property | PC (constraint-based) | GES (score-based) |
|----------|----------------------|-------------------|
| **Approach** | Conditional independence tests | Score maximization (BIC/BDe) |
| **Starting point** | Complete graph → remove edges | Empty graph → add, then remove |
| **Search space** | CI test results (skeleton) | Equivalence class space (CPDAGs) |
| **Assumptions** | Faithfulness, Markov, causal sufficiency | Faithfulness, Markov, causal sufficiency |
| **Consistency** | Yes (with consistent CI test) | Yes (with locally consistent score) |
| **Finite-sample bias** | Level $\alpha$ choice affects sparsity | Regularization via BIC penalty $\frac{\log n}{2}$ |
| **Computation** | Exponential worst-case; fast for sparse | $O(p^4)$ in FES, $O(p^4)$ in BES for bounded degree |
| **Handles hidden variables?** | FCI extension (yes) | No (without extension) |
| **Software (R)** | `pcalg::pc()` | `pcalg::ges()` |
| **Software (Python)** | `causal-learn` `PC` | `causal-learn` `GES` |

### NOTEARS Comparison

Both PC and GES are compared by Zheng et al. (2018) as baselines in the NOTEARS experiments
(see [[NOTEARS Experiments]]). NOTEARS uses the **SHD** (Structural Hamming Distance) and FDR
as metrics; GES consistently matches or beats PC on dense graphs but can struggle on
non-Gaussian data (where BIC's Gaussian log-likelihood is misspecified).

---

## References

- Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd ed.
  MIT Press. (1st ed. 1993, Springer.) Full book: https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/.g/scottd/fullbook.pdf
- Chickering, D.M. (2002). Optimal structure identification with greedy search.
  *Journal of Machine Learning Research* **3**: 507–554. https://jmlr.org/papers/v3/chickering02b.html
- Meek, C. (1995). Causal inference and causal explanation with background knowledge.
  *UAI Proceedings*: 403–410.
- Verma, T. & Pearl, J. (1990). Equivalence and synthesis of causal models.
  *UAI Proceedings*: 220–227.
- Colombo, D. & Maathuis, M.H. (2014). Order-independent constraint-based causal structure
  learning. *Journal of Machine Learning Research* **15**: 3921–3962. (PC-stable)
- Spirtes, P. & Glymour, C. (1991). An algorithm for fast recovery of sparse causal graphs.
  *Social Science Computer Review* **9**(1): 62–72. (Original PC paper)
