---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chan24a-autocd.pdf]]"
source_location: "§2 Related Work, Chickering (2002) described; Chan et al. PMLR 2024"
date_ingested: 2026-08-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES BES causal discovery"
  - "score-based causal discovery"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Chickering, 2002) is the canonical **score-based** algorithm for causal structure
> learning. Rather than testing conditional independences, it greedily searches the space of
> **Markov equivalence classes** (CPDAGs) using a decomposable score function (typically BIC
> or BDe). GES runs in two phases: a **Forward Equivalence Search** (FES) that adds edges to
> improve the score, and a **Backward Equivalence Search** (BES) that removes edges to further
> improve it. Under faithfulness and the assumption that the score is consistent (selects the
> true model in large samples), GES is **asymptotically correct** and provably converges to
> the true CPDAG. The Meek Conjecture — proved by Chickering (2002) — is the key theoretical
> result that makes this possible.

## Overview

GES was proposed in Chickering (2002) as a provably correct, efficient alternative to the
PC algorithm. Its key conceptual advance: instead of searching over individual DAGs (an
exponential space), it searches over **equivalence classes** (CPDAGs), which form a much
smaller space with a tractable neighborhood structure. Moving between adjacent CPDAGs
corresponds to a single **edge insertion** or **covered edge reversal** in any member-DAG.

The algorithm's correctness rests on the **Meek Conjecture** (proved in the same paper):
if DAG $H$ is an independence map of DAG $G$, there is a finite sequence of single-edge
additions and covered-edge reversals that transforms $G$ into $H$ while remaining an
independence map at every step. This ensures GES's greedy search can reach the true
CPDAG without getting stuck in local optima (in the large-sample limit).

## Main Content

### Score Functions

GES requires a **decomposable score** $Q$: a score that factors over nodes,
$Q(G) = \sum_{j=1}^d q(X_j, \text{pa}_G(X_j))$. Decomposability enables efficient local
updates when adding or removing an edge (only one node's score term changes).

> [!definition] Definition: BIC Score for Gaussian SEMs
> For a linear Gaussian DAG with $d$ variables, $n$ observations, and node $X_j$ with
> parents $\text{pa}(X_j)$:
> $$q_{\text{BIC}}(X_j, \text{pa}(X_j)) = \frac{n}{2}\ln\!\hat{\sigma}^2_{j|\text{pa}(j)} - \frac{|\text{pa}(j)|+1}{2}\ln n$$
> where $\hat{\sigma}^2_{j|\text{pa}(j)}$ is the residual variance of $X_j$ regressed on
> its parents. Lower BIC = better. The penalization $\frac{p}{2}\ln n$ controls complexity.
>
> **BIC is score-equivalent**: two Markov-equivalent DAGs receive the same BIC score, so
> the score is defined over equivalence classes, not individual DAGs — exactly what GES needs.
> ^def-bic-score

> [!definition] Definition: BDe Score (Discrete Data)
> For discrete Bayesian networks, the **Bayesian Dirichlet equivalent uniform (BDe)** score
> is the standard. It integrates out the conditional probability tables (CPTs) with a
> symmetric Dirichlet prior, yielding a closed-form Bayesian marginal likelihood.
> Like BIC, BDe is **score-equivalent** — the same score for Markov-equivalent DAGs.
> ^def-bde-score

### Phase 1 — Forward Equivalence Search (FES)

> [!definition] Definition: FES Algorithm
> **Input:** Data matrix $\mathbf{X}$; decomposable score $Q$; empty CPDAG $G = (\emptyset, \emptyset)$.
>
> **Repeat until no improvement:**
> 1. For each ordered pair of non-adjacent nodes $(X_i, X_j)$ and each subset
>    $T \subseteq \text{adj}(X_i) \cap \text{adj}(X_j)$ (the **clique condition set** $T$):
>    a. Compute the score change $\Delta Q(i, j, T)$ from inserting edge $X_i \to X_j$
>       with $T$ as the clique indicator.
>    b. Check that the insertion is **valid** (does not create a cycle or violate the CPDAG
>       structure rules).
> 2. Choose the pair $(i^*, j^*, T^*)$ with maximum valid $\Delta Q > 0$.
> 3. Apply the insertion: update $G$ and re-orient edges using Meek's rules.
>
> **Output:** A CPDAG $G_{\text{FES}}$ with a locally optimal score (all single insertions
> decrease the score).
>
> **Key property:** FES only adds edges, so it starts from the simplest model (empty graph)
> and grows toward the true skeleton.
> ^def-fes

### Phase 2 — Backward Equivalence Search (BES)

> [!definition] Definition: BES Algorithm
> **Input:** CPDAG $G_{\text{FES}}$ from Phase 1.
>
> **Repeat until no improvement:**
> 1. For each adjacent pair $(X_i, X_j)$ in current $G$ and each subset
>    $H \subseteq \text{adj}(X_i) \cap \text{adj}(X_j)$ (the clique indicator $H$):
>    a. Compute the score change $\Delta Q(i, j, H)$ from deleting edge $X_i - X_j$.
>    b. Check that the deletion is valid.
> 2. Choose the pair $(i^*, j^*, H^*)$ with maximum valid $\Delta Q > 0$.
> 3. Apply the deletion: update $G$ and re-orient with Meek's rules.
>
> **Output:** CPDAG $G_{\text{BES}}$ — the final GES output.
>
> **Why BES is needed:** BES corrects overfitting from FES. In finite samples, the score
> selects slightly too dense a graph during FES; BES prunes back to the correct skeleton.
> In the large-sample limit, FES alone suffices (BIC is consistent), but BES accelerates
> convergence in finite samples.
> ^def-bes

### The Meek Conjecture

> [!theorem] Theorem: Meek Conjecture (Chickering, 2002, Theorem 15)
> Let $G$ and $H$ be DAGs such that $H$ is an **independence map** of $G$ (every CI in
> $H$ is also in $G$). Then there exists a sequence of DAGs $G = G_0, G_1, \ldots, G_m = H$
> such that:
> 1. Each $G_{t+1}$ is obtained from $G_t$ by either:
>    - **Adding a single edge** (edge addition), or
>    - **Reversing a covered edge** $X \to Y$ where $\text{pa}(X) \cup \{X\} = \text{pa}(Y)$.
> 2. $H$ is an independence map of $G_t$ for all $t$.
>
> **Significance:** This proves that the equivalence class of $H$ is *reachable* from the
> equivalence class of $G$ via local moves in the CPDAG space, each of which can be evaluated
> by a single score-change computation. GES's greedy search is therefore sound in the
> large-sample limit: the correct CPDAG will be found by sequential score-improving insertions.
> ^thm-meek-conjecture

### Consistency Theorem

> [!theorem] Theorem: Consistency of GES (Chickering, 2002, Theorem 23)
> Under the following assumptions:
> 1. The data are generated from a faithful distribution over the true DAG $D^*$.
> 2. The score function $Q$ is **consistent**: $Q(G) > Q(H)$ for any $G$ that is not
>    an independence map of $D^*$ (when $n \to \infty$, BIC and BDe satisfy this).
>
> GES returns the CPDAG of $D^*$ in the limit $n \to \infty$.
>
> **Finite-sample behavior:** GES can be inconsistent for small $n$ due to score noise,
> but BIC's penalty term (growing as $\ln n$) ensures consistency as $n \to \infty$.
> ^thm-ges-consistency

### Complexity

| Resource | Bound |
|---------|-------|
| FES score evaluations | $O(d^2 \cdot 2^{\text{max-degree}})$ per step; $O(d^3)$ for sparse graphs |
| BES score evaluations | Same order as FES |
| Score computation (BIC, Gaussian) | $O(n \cdot |\text{pa}|^2)$ per node update |
| Memory | $O(d^2)$ for adjacency and score cache |

**FGES** (Fast GES, Ramsey et al., 2017): an improved version that uses efficient data
structures (priority queues for edge scores) and runs in $O(d^2 \log d)$ time on sparse
graphs. FGES is the implementation in the Tetrad software and is preferred for $d > 50$.

### Worked Example (d = 3 variables)

> [!example] GES on a Collider Graph
> **True DAG:** $X \to Z \leftarrow Y$ (collider at $Z$, v-structure). True CPDAG: same.
> **Data:** $n$ observations from this DAG.
>
> **FES starts from empty graph:**
> - Compare all insertions. Adding $X - Z$: score improves (captures $X \to Z$ dependence). Add.
> - Adding $Y - Z$: score improves. Add. Graph now has edges $X - Z$ and $Y - Z$.
> - Adding $X - Y$: score does NOT improve (X and Y are marginally independent under faithfulness). Skip.
> - FES terminates. CPDAG after FES: $X - Z - Y$ (edges, unoriented; X and Y non-adjacent).
>
> **BES:** Try removing each edge. Removing $X - Z$ decreases score (real dependence). Removing $Y - Z$ same. BES terminates.
>
> **Meek's rules + V-structure orientation:** Unshielded triple $X - Z - Y$ where $X, Y$ non-adjacent.
> The true separating set of $X, Y$ is $\emptyset$ (they are marginally independent), but $Z$ is a
> collider so $Z \notin \text{sep}(X,Y)$ → orient as $X \to Z \leftarrow Y$.
>
> **Output:** Correct CPDAG $X \to Z \leftarrow Y$.

## GES vs PC: Key Differences

| Dimension | PC | GES |
|---------|---|-----|
| **Approach** | Constraint-based (CI tests) | Score-based (BIC/BDe) |
| **Search space** | Individual DAGs via skeleton | Equivalence classes directly |
| **Output** | CPDAG | CPDAG |
| **Starting point** | Complete graph (removes edges) | Empty graph (adds edges) |
| **Key assumption** | Faithfulness + causal sufficiency + CI test quality | Faithfulness + score consistency |
| **Data type** | Governed by CI test choice | Governed by score choice |
| **Finite sample** | Sensitive to CI test power at large $k$ | Sensitive to BIC score noise |
| **Speed** | Fast for sparse graphs | Slower; FGES improves this |

## Software

| Package | Language | Notes |
|---------|---------|-------|
| `pcalg::ges()` | R | Reference implementation by Maathuis et al. |
| `causal-learn` | Python | `GES` class; BIC default |
| `juangamella/ges` | Python | Clean implementation of Chickering (2002) exactly |
| Tetrad / FGES | Java | Large-scale GES; supports mixed data |
| `gCastle` | Python | Includes `GES` |

## Connections

- **PC algorithm**: constraint-based alternative using CI tests — see [[PC Algorithm - Overview]].
- **NOTEARS**: third paradigm (continuous optimization); returns single DAG, not CPDAG — see [[NOTEARS - Overview]].
- **BIC score**: the same BIC used here connects to [[Overfitting and Information Criteria]].
- **Markov equivalence**: GES is defined over CPDAG space — see [[Markov Equivalence Classes and CPDAGs]].

## See Also
- [[PC Algorithm - Overview]] — constraint-based algorithm; direct comparison
- [[Markov Equivalence Classes and CPDAGs]] — the object GES searches over
- [[DAG Structure Learning Problem]] — problem setup and comparison to NOTEARS
- [[Causal Discovery Algorithm Comparison]] — unified comparison of all three approaches
- [[Overfitting and Information Criteria]] — BIC and model selection theory
