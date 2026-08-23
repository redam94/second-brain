---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Based-Survey.md]]"
source_location: "Part 2: Greedy Equivalence Search (Chickering 2002, JMLR 3: 507–554)"
date_ingested: 2026-08-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Overview]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES algorithm"
  - "Chickering 2002"
  - "Greedy Equivalence Search"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
---

# Greedy Equivalence Search

> [!summary]
> **Greedy Equivalence Search (GES)** (Chickering 2002, JMLR) is the canonical **score-based**
> algorithm for causal structure learning. Rather than searching over DAGs, GES searches directly
> in the space of **Markov equivalence classes** (CPDAGs), adding edges in the Forward Equivalence
> Search (FES) phase and removing them in the Backward Equivalence Search (BES) phase. The key
> theoretical result is Chickering's proof of the **Meek Conjecture** (Meek 1997): a covered-edge-
> reversal path connects any two CPDAGs, ensuring GES is complete. Under a locally consistent
> scoring criterion (BIC or BDe) and faithfulness, GES is asymptotically consistent.

## Overview

GES improves on earlier score-based approaches (greedy hill-climbing, K2) by operating in the
**space of Markov equivalence classes** rather than the space of DAGs. This has two key advantages:

1. **Avoids redundant search**: Many distinct DAGs are Markov equivalent (see [[Markov Equivalence
   and CPDAGs]]). Searching in DAG space visits equivalent graphs repeatedly; GES collapses each
   equivalence class to its CPDAG and treats the class as a single search point.
2. **Principled two-phase structure**: The forward phase (FES) greedily adds edges; the backward
   phase (BES) greedily removes edges. Chickering (2002) proved this is complete: starting from
   the empty graph, GES can reach the CPDAG of any faithful distribution.

The completeness proof rests on the **Meek Conjecture**, which Chickering proved: there always
exists a path of covered-edge reversals connecting any two DAGs in the same equivalence class.

## Main Content

### Scoring Criterion

> [!definition] Definition: Locally Consistent Scoring Criterion (Chickering 2002, §2)
> A scoring criterion $S(G, \mathbf{X})$ mapping DAGs to real numbers is **locally consistent** if,
> for any two DAGs $G$ and $G'$ that differ only by a covered edge reversal:
> - $S(G', \mathbf{X}) > S(G, \mathbf{X})$ if $G'$ has strictly fewer independencies than the
>   data-generating distribution $P$ (i.e., $G'$ is a strictly better I-map of $P$ than $G$).
> - $S(G', \mathbf{X}) \leq S(G, \mathbf{X})$ if $G$ and $G'$ have the same independence model
>   relative to $P$.
>
> A scoring criterion that is **locally consistent** under these conditions: the **BIC score**
> and the **BDe score** (for discrete data under a uniform Dirichlet prior).
^def-local-consistency

> [!note] BIC Score
> For Gaussian data with known structure $G$, the BIC score is:
> $$S_{\mathrm{BIC}}(G, \mathbf{X}) = \ell(G, \mathbf{X}) - \frac{\log n}{2} |G|$$
> where $\ell(G, \mathbf{X}) = \sum_{i=1}^d \ell_i(X_i \mid \mathrm{Pa}_G(X_i))$ is the
> Gaussian log-likelihood and $|G| = \sum_i (|\mathrm{Pa}(X_i)| + 1)$ counts parameters.
> The $\frac{\log n}{2}|G|$ penalty prevents overfitting by penalizing model complexity.
>
> BIC decomposes **locally**: the score change from adding edge $X \to Y$ depends only on
> $X$'s local score $\ell_Y(X_Y \mid \mathrm{Pa}(X_Y) \cup \{X\})$ minus the current score.
> This **local decomposability** is what makes GES efficient — only $O(1)$ re-computation per
> move.

### The Insert and Delete Operators

GES navigates the CPDAG space via two operators. Each operator adds or removes one edge and
re-orients the graph to a valid CPDAG.

> [!definition] Definition: Insert Operator (Chickering 2002, Def. 12)
> $\mathrm{Insert}(X, Y, T)$ for a CPDAG $H$:
> 1. Orient all undirected edges $Y - Z$ for $Z \in T$ as $Z \to Y$.
> 2. Add the directed edge $X \to Y$.
> 3. Re-orient $H$ to its CPDAG using Meek rules.
>
> Here $T \subseteq \mathrm{Adj}(H, Y) \setminus \mathrm{Adj}(H, X)$ is a "clique set" that
> specifies which of $Y$'s current neighbors get directed toward $Y$ by the insert.
> The Insert operator is valid only when the resulting graph is a DAG in some member of the
> new equivalence class (Chickering 2002, Lemma 13).
^def-insert-op

> [!definition] Definition: Delete Operator (Chickering 2002, Def. 14)
> $\mathrm{Delete}(X, Y, H)$ for a CPDAG with edge $X \to Y$ or $X - Y$:
> 1. Reverse (undo) the orientations of edges $X - Z$ or $X \to Z$ for $Z \in H$.
>    (Make them undirected.)
> 2. Remove the edge $X - Y$ (or $X \to Y$).
> 3. Re-orient the resulting graph to its CPDAG using Meek rules.
>
> Here $H \subseteq \mathrm{Adj}(H, X) \cap \mathrm{Adj}(H, Y)$ is the "H-set."
^def-delete-op

### The Forward Equivalence Search (FES)

> [!theorem] Algorithm: Forward Equivalence Search (Chickering 2002, §4.1)
> **Input**: Data $\mathbf{X}$; scoring criterion $S$ (e.g., BIC).
> **Initialize**: CPDAG $H = \emptyset$ (empty graph, no edges).
>
> **Repeat**:
>
> 1. **Score all valid inserts**: For each pair $(X, Y)$ not adjacent in $H$,
>    and each valid set $T \subseteq \mathrm{Adj}(H, Y) \setminus \mathrm{Adj}(H, X)$
>    (where $T$ forms a clique in $H$), compute the **score gain**:
>    $$\Delta^+(X, Y, T) = S(\mathrm{Insert}(X, Y, T)(H)) - S(H)$$
>
> 2. **Select the best insert**: Let $(X^*, Y^*, T^*)$ be the triple maximizing $\Delta^+$.
>    If $\Delta^+(X^*, Y^*, T^*) > 0$, apply $\mathrm{Insert}(X^*, Y^*, T^*)$ to $H$.
>
> **Until** no positive-gain insert exists.
>
> **Output**: CPDAG $H_{\mathrm{FES}}$ (typically dense; possibly overfitted at finite $n$).
^alg-fes

**Intuition**: FES starts from the empty graph and greedily adds edges that most improve the
score. Because the BIC decomposes locally, the score gain of inserting $X \to Y$ with parent
set $T$ into $H$ involves only the local score of $Y$'s updated parent set. The valid insert
condition ensures the result is a legal CPDAG.

### The Backward Equivalence Search (BES)

> [!theorem] Algorithm: Backward Equivalence Search (Chickering 2002, §4.2)
> **Input**: CPDAG $H_{\mathrm{FES}}$ from the FES phase.
>
> **Repeat**:
>
> 1. **Score all valid deletes**: For each edge $(X, Y)$ in $H$ (directed or undirected),
>    and each valid H-set $H \subseteq \mathrm{Adj}(H, X) \cap \mathrm{Adj}(H, Y)$
>    (where $H$ forms a clique and $\mathrm{Adj}(H, X) \cap \mathrm{Adj}(H, Y) \setminus H$
>    is also a clique), compute:
>    $$\Delta^-(X, Y, H) = S(\mathrm{Delete}(X, Y, H)(H)) - S(H)$$
>
> 2. **Select the best delete**: Let $(X^*, Y^*, H^*)$ be the triple maximizing $\Delta^-$.
>    If $\Delta^-(X^*, Y^*, H^*) > 0$, apply $\mathrm{Delete}(X^*, Y^*, H^*)$ to $H$.
>
> **Until** no positive-gain delete exists.
>
> **Output**: CPDAG $\hat{H}$ (the GES estimate of the true CPDAG).
^alg-bes

**Why BES?** The FES phase can overshoot on finite data — adding more edges than the true DAG
has, because the BIC penalty is calibrated for asymptotic consistency. BES undoes the overfitting
by removing edges when the score improvement from deletion is positive.

### The Meek Conjecture

The completeness of GES (the guarantee that FES + BES can reach *any* CPDAG) rests on
Chickering's proof of the following conjecture.

> [!theorem] Theorem: Meek Conjecture (Meek 1997; proved Chickering 2002, Theorem 1)
> Let $G$ be a DAG, and let $H$ be another DAG on the same vertex set. If $G$ is an **I-map**
> of $H$ (i.e., every conditional independence in $G$ is also in $H$ — $G$ has a superset of
> $H$'s edges in some sense), then there exists a sequence of **covered edge reversals**
> transforming $G$ into $H$ such that each intermediate DAG is also an I-map.
>
> A **covered edge** $X \to Y$ satisfies: $\mathrm{Pa}(Y) = \mathrm{Pa}(X) \cup \{X\}$.
> Reversing a covered edge produces a Markov-equivalent DAG (same CPDAG), so covered reversals
> navigate *within* an equivalence class.
>
> **Consequence for GES**: Starting from any CPDAG (e.g., the FES output), BES can reach the
> true CPDAG via a sequence of Delete moves (which correspond to covered edge reversals within
> the equivalence class), ensuring GES is complete — it cannot get stuck in a suboptimal CPDAG.
^thm-meek-conjecture

### Consistency of GES

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let $P$ be a distribution that is Markov and faithful to DAG $G^*$ with causal sufficiency.
> Under a locally consistent scoring criterion $S$:
>
> - As $n \to \infty$, the FES phase terminates at the **CPDAG of $G^*$** (with probability
>   tending to 1), AND
> - BES applied to the FES output also terminates at the **CPDAG of $G^*$**.
>
> Therefore GES (FES + BES) is **asymptotically consistent**.
^thm-ges-consistency

**Key mechanism**: At large $n$, the BIC score correctly penalizes spurious edges (FDR → 0) and
does not remove true edges (power → 1). The Meek conjecture ensures no structural barriers to
reaching the true CPDAG.

### Computational Complexity

For graphs with maximum degree $\Delta$:
- **FES**: At each step, $O(p^2 \cdot 2^\Delta)$ score computations in the worst case;
  $O(p^2)$ for bounded-degree graphs.
- **BES**: Similar.
- **Total**: $O(p^4)$ for bounded-degree graphs; exponential for dense graphs.

Local score decomposability (BIC, BDe) means each score computation involves only the local
conditional likelihood $\ell(X_Y \mid \mathrm{Pa}(X_Y))$ — a regression with at most $\Delta$
predictors. In practice, GES is fast on sparse graphs.

### FGES: Fast Greedy Equivalence Search

**FGES** (Ramsey et al. 2017) is a parallelized and optimized variant of GES, scaled to
thousands of variables. Available in the **TETRAD** software suite. Key improvements:
- Parallelizes score computations across variable pairs.
- Uses caching to avoid recomputing unchanged local scores.
- Extends to non-Gaussian noise (using score functions that match the distributional assumption).

## PC vs. GES: Comparison

| Property | [[PC Algorithm]] (constraint-based) | GES (score-based) |
|----------|-------------------------------------|-------------------|
| **Approach** | CI tests on skeleton | Score optimization over CPDAGs |
| **Starting point** | Complete graph (prune to skeleton) | Empty graph (FES adds, BES removes) |
| **Key parameter** | Significance level $\alpha$ | Score penalty (BIC: $\frac{\log n}{2}$) |
| **Finite-sample bias** | Affected by $\alpha$ choice and multiple testing | BIC penalty calibrated for consistency |
| **Consistency** | Yes (consistent CI test) | Yes (locally consistent score) |
| **Dense graphs** | Exponential in worst case | $O(p^4)$ per step (if bounded degree) |
| **Model assumptions** | Agnostic (test-based) | Distributional (Gaussian BIC or discrete BDe) |
| **Output** | CPDAG | CPDAG |
| **Software (R)** | `pcalg::pc()` | `pcalg::ges()` |
| **Practical edge** | Fast for very sparse graphs | More robust in finite samples (BIC calibration) |

In the NOTEARS experiments (Zheng et al. 2018), GES and PC are compared as baselines;
NOTEARS outperforms both on dense graphs while being comparable for sparse cases. See
[[NOTEARS Experiments]].

## Software

- **R**: `pcalg` package — `ges()` function with BIC or BDe score.
- **Python**: `causal-learn` (`py-why/causal-learn`) — `GES` class.
- **Java**: TETRAD (Carnegie Mellon) — full FGES implementation, scalable to $p > 1000$.
- **Benchmark**: The `bnlearn` R package also contains GES and many competitors.

## Connections

- **Constraint-based complement**: [[PC Algorithm]] is the constraint-based counterpart.
  GES and PC target the same object (the CPDAG) and are consistent under the same assumptions.
  In practice, GES tends to have better finite-sample properties due to BIC's built-in
  regularization.
- **NOTEARS as a non-equivalent alternative**: [[NOTEARS - Overview]] solves a continuous
  optimization program — conceptually different from GES's combinatorial search. NOTEARS
  does not output a CPDAG and is not guaranteed to find a Markov-equivalent structure.
- **Score-based Bayesian networks**: The BDe score used in GES is the standard score for
  learning Bayesian network structure from discrete data. See [[Directed Acyclic Graphs]] and
  [[LLM Expert Elicitation for Bayesian Networks]].
- **ABM + structural learning**: The vault's ABM section (e.g., [[Summary Causal DAGs]]) uses
  assumed DAG structures from domain knowledge. GES could be used to *learn* such structures
  from ABM output data — connecting `Causal Discovery` to `Agent-Based Modeling`.

## See Also
- [[Markov Equivalence and CPDAGs]] — the search space: equivalence classes, CPDAGs, Meek rules
- [[PC Algorithm]] — constraint-based alternative; same target (CPDAG), different approach
- [[Causal Structure Learning - Overview]] — paradigm comparison with NOTEARS
- [[DAG Structure Learning Problem]] — problem formulation; prior methods landscape (GES cited)
- [[NOTEARS - Overview]] — continuous optimization baseline compared against GES
- [[NOTEARS Experiments]] — GES used as a baseline in empirical comparison
