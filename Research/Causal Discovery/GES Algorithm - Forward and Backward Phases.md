---
title: "GES Algorithm - Forward and Backward Phases"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-references.md]]"
source_location: "Chickering (2002), §4 (Forward Phase), §5 (Backward Phase), §6 (Proof of Consistency)"
date_ingested: 2026-10-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[GES - Overview]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by: []
aliases:
  - "GES forward phase"
  - "GES backward phase"
  - "Insert operator GES"
  - "Delete operator GES"
---

# GES Algorithm - Forward and Backward Phases

> [!summary]
> GES (Chickering 2002) traverses the space of CPDAGs using two types of local moves: **Insert**
> operators (Phase 1, forward) and **Delete** operators (Phase 2, backward). An Insert operator
> adds a directed edge $X \to Y$ and re-orients edges as needed to maintain the CPDAG property;
> a Delete operator removes an edge and re-orients. Both operators are **turning operators** —
> they produce a valid CPDAG at each step. Greedy application of Insert operators until no
> score-improving move exists, followed by greedy application of Delete operators, yields the
> GES algorithm whose consistency is guaranteed by the Meek Conjecture.

## Overview

The challenge of searching over CPDAGs is that adding or removing a single edge can require
re-orienting other edges to maintain the CPDAG property (valid Meek-completed graph representing
a MEC). Chickering (2002) characterizes the complete set of valid **turning operators** — local
moves in CPDAG space — and shows that Insert and Delete operators cover all such moves.

This note describes the operators in detail and shows how they combine to form the two phases.

## Main Content

### Notation and Score Decomposition

Following Chickering (2002), let $G$ be the current CPDAG on $d$ variables, $s(G)$ the score.
By decomposability:
$$s(G) = \sum_{i=1}^d s(X_i, \mathrm{Pa}_G(X_i)).$$

When an Insert/Delete operator changes the parent set of a node $Y$ from $\mathrm{Pa}(Y)$ to
$\mathrm{Pa}'(Y)$, the **score change** is:
$$\Delta s = s(Y, \mathrm{Pa}'(Y)) - s(Y, \mathrm{Pa}(Y)).$$
All other local family scores are unchanged (decomposability). This makes each step $O(d)$
evaluations, each taking $O(|\mathrm{Pa}|^3)$ time (matrix inversion for Gaussian BIC).

### The Insert Operator (Phase 1)

> [!definition] Definition: Insert$(X, Y, T)$ Operator
> Let $X$ and $Y$ be **non-adjacent** nodes in current CPDAG $G$, and let
> $T \subseteq \mathrm{Ne}(Y) \setminus \mathrm{Adj}(X)$ be a set of neighbors of $Y$ not adjacent
> to $X$ (the "turning set"). The operator Insert$(X, Y, T)$:
>
> 1. Inserts the directed edge $X \to Y$.
> 2. For each $T_i \in T$: orients the previously undirected edge $T_i - Y$ as $T_i \to Y$.
>
> **Validity condition (Chickering Lemma 12):** Insert$(X, Y, T)$ produces a valid CPDAG iff:
> - $T$ is a **clique** in $G$ (every pair in $T$ is adjacent), and
> - $T$ **separates** $X$ from $\mathrm{Ne}(Y) \setminus \mathrm{Adj}(X)$ in $H(G, Y)$
>   (the undirected induced subgraph on $\{Y\} \cup \mathrm{Ne}(Y)$).
>
> **Score change:** $\Delta s_{\text{Insert}} = s(Y, \mathrm{Pa}(Y) \cup \{X\} \cup T) - s(Y, \mathrm{Pa}(Y))$.
^def-insert-operator

> [!note] Intuition for the turning set $T$
> Adding $X \to Y$ may create a new v-structure at some neighbor $T_i - Y - X$ unless $T_i$ is
> also oriented toward $Y$. The turning set $T$ specifies which neighbors of $Y$ must be reoriented
> to $T_i \to Y$ to prevent spurious v-structures. The clique condition ensures $T$ forms a valid
> parent block; the separation condition ensures no unintended v-structures are created.

### Phase 1: Forward Greedy Search

```
ForwardPhase(empty CPDAG G₀, score s):
    G ← G₀  (empty graph)
    REPEAT:
        Best ← None;  ΔBest ← 0
        FOR each non-adjacent pair (X, Y):
            FOR each valid T ⊆ Ne(Y) \ Adj(X) satisfying validity conditions:
                Δ ← s(Y, Pa(Y) ∪ {X} ∪ T) - s(Y, Pa(Y))
                IF Δ > ΔBest:
                    ΔBest ← Δ;  Best ← Insert(X, Y, T)
        IF Best ≠ None:
            Apply Best to G
    UNTIL no score-improving Insert operator exists
    RETURN G₁ ← G
```

**Invariant:** After each step, $G$ is a valid CPDAG. The loop terminates because the number of
edges is bounded by $\binom{d}{2}$ and no edge is added twice (once inserted, it is never removed
in Phase 1).

**Forward phase termination (Chickering Thm. 14, consequence of Meek Conjecture):** In the
$n \to \infty$ limit with a locally consistent score, the forward phase terminates at a DAG $G_1$
that is in the MEC of $G^*$, possibly with extra edges.

### The Delete Operator (Phase 2)

> [!definition] Definition: Delete$(X, Y, H)$ Operator
> Let $X$ and $Y$ be **adjacent** in current CPDAG $G$, and let
> $H \subseteq \mathrm{Ne}(Y) \cap \mathrm{Adj}(X)$ (neighbors of $Y$ that are also adjacent to $X$;
> the "turning set" for deletion). The operator Delete$(X, Y, H)$:
>
> 1. Removes the edge between $X$ and $Y$ (whether directed $X \to Y$ or undirected $X - Y$).
> 2. For each $H_i \in H$: orients the previously undirected edge $H_i - Y$ as $H_i \to Y$.
>
> **Validity condition:** Delete$(X, Y, H)$ produces a valid CPDAG iff $H$ is a **clique** in $G$
> and $H$ separates $\mathrm{Ne}(Y) \cap \mathrm{Adj}(X) \setminus H$ from $X$ in the
> undirected subgraph on $\{Y\} \cup \mathrm{Ne}(Y)$.
>
> **Score change:** $\Delta s_{\text{Delete}} = s(Y, \mathrm{Pa}(Y) \setminus (\{X\} \cup H)) - s(Y, \mathrm{Pa}(Y))$.
^def-delete-operator

### Phase 2: Backward Greedy Search

```
BackwardPhase(CPDAG G₁ from Phase 1, score s):
    G ← G₁
    REPEAT:
        Best ← None;  ΔBest ← 0
        FOR each adjacent pair (X, Y):
            FOR each valid H ⊆ Ne(Y) ∩ Adj(X) satisfying validity conditions:
                Δ ← s(Y, Pa(Y) \ ({X} ∪ H)) - s(Y, Pa(Y))
                IF Δ > ΔBest:
                    ΔBest ← Δ;  Best ← Delete(X, Y, H)
        IF Best ≠ None:
            Apply Best to G
    UNTIL no score-improving Delete operator exists
    RETURN G₂ ← G   # the final CPDAG
```

**Backward phase result (Chickering Thm. 15):** In the $n \to \infty$ limit, the backward
phase removes all false edges added in Phase 1. The output $G_2$ is the CPDAG of $G^*$.

### GES Consistency Theorem

> [!theorem] Theorem: Consistency of GES (Chickering 2002, Thm. 15 + Cor. 3)
> Let $G^*$ be the true data-generating DAG and $s$ a score-equivalent, decomposable, and locally
> consistent scoring criterion (e.g., BIC for Gaussian data). Then:
>
> 1. **Forward phase:** As $n \to \infty$, Phase 1 terminates at a DAG $G_1$ whose skeleton
>    contains the skeleton of $G^*$ (i.e., all true edges are present; false edges may also be).
> 2. **Backward phase:** As $n \to \infty$, Phase 2 removes all false edges from $G_1$.
> 3. **Conclusion:** GES returns the **CPDAG of $G^*$** with probability tending to 1 as $n \to \infty$.
>
> The proof uses the Meek Conjecture (see [[GES - Overview]]) to guarantee that the forward phase
> can always reach the true DAG (no local maximum below the true score), and local consistency to
> guarantee that the backward phase removes precisely the false edges.
^thm-ges-consistency

### BIC Score for Gaussian Linear SEMs

For multivariate Gaussian data with mean zero and a linear SEM, the BIC local family score is:

> [!definition] Definition: Gaussian BIC Score
> For node $Y_i$ with parent set $\mathrm{Pa}_i$ in the data $\mathbf{X} \in \mathbb{R}^{n \times d}$:
>
> $$s_{\text{BIC}}(Y_i, \mathrm{Pa}_i) = -n \log \hat\sigma_i^2 - |\mathrm{Pa}_i| \cdot \log n,$$
>
> where $\hat\sigma_i^2 = \frac{1}{n} \lVert \mathbf{X}_i - \mathbf{X}_{\mathrm{Pa}_i} \hat\beta_i \rVert^2$
> is the residual variance from regressing $Y_i$ on its parents (OLS), and $|\mathrm{Pa}_i|$ is the
> number of parameters penalized.
>
> The penalty $\log n$ (rather than $2$ in AIC) ensures consistency: it penalizes spurious edges
> strongly enough that the false-edge score improvement $\to 0$ faster than the penalty $\to \infty$.
^def-bic-score

## Practical Implementation Notes

**Software:** The canonical implementations are:
- **R:** `pcalg::ges(score = new("GaussL0penObsScore", data))` — Maechler et al., JMLR 2012
- **Python:** `causal_learn.search.ScoreBased.GES` in the `causal-learn` library
- **Python (standalone):** `ges` package by Juan Gamella (https://github.com/juangamella/ges)

**Scalability:** Standard GES is $O(d^4)$ in the number of nodes. For large $d$ (hundreds to
thousands), use **FGES** (Fast GES, Ramsey et al. 2017) which caches edge scores and parallelizes
score evaluations — this is the "FGS" baseline evaluated against NOTEARS in [[NOTEARS Experiments]].

**Score choice:** For non-Gaussian data, the BIC is misspecified. Alternatives:
- BGe score (Geiger & Heckerman 1994) for linear Gaussian with unknown parameters
- BDe score (Heckerman et al. 1995) for discrete data
- Non-parametric scores for general distributions (e.g., Kraskov entropy estimators)

## Connections

- **Meek Conjecture** is the theoretical engine — see [[GES - Overview]] for the statement and
  significance.
- **MEC space** is the search space — see [[Markov Equivalence Classes and CPDAGs]] for how
  CPDAGs are defined and why they are the natural target.
- **Score vs. CI paradigm**: the Delete operator implicitly performs a conditional independence
  test (score improvement of removing an edge ≈ evidence of conditional independence), but uses
  a continuous score signal rather than a binary decision, which is typically more powerful.

## See Also
- [[GES - Overview]] — paper context, Meek Conjecture, comparison to PC
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG structure the operators maintain
- [[PC Algorithm]] — the CI-based alternative that also outputs a CPDAG
- [[DAG Structure Learning Problem]] — the landscape of methods
- [[NOTEARS Experiments]] — empirical comparison of GES/FGS vs. NOTEARS
- [[Causal Discovery/_Index|Causal Discovery Index]]
