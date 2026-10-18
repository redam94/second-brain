---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/Chickering2002-GES-reference.md]]"
source_location: "Chickering (2002), JMLR 3:507–554"
date_ingested: 2026-10-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Methods Overview]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering 2002) is the foundational **score-based** algorithm for causal structure
> learning. Unlike [[PC Algorithm]] (which uses conditional independence tests), GES directly
> optimizes a decomposable scoring function — typically BIC — over the space of **Markov
> equivalence classes** (CPDAGs). It proceeds in two greedy phases: a **forward phase** that
> adds edges until no score improvement is possible, followed by a **backward phase** that
> removes edges. Under faithfulness, acyclicity, and causal sufficiency, GES recovers the
> true CPDAG in the large-sample limit — this is the **Meek Conjecture** that Chickering's
> paper proves.

## Overview

Score-based structure learning maximizes a *score* $Q(\mathcal{G})$ over the space of graphs.
The challenge is that the space of DAGs grows superexponentially in $d$
(see [[DAG Structure Learning Problem]]). GES sidesteps full enumeration by working with
**equivalence classes** as states: since many DAGs have the same score under a score-equivalent
scoring function, the effective search space is the space of CPDAGs, which is smaller and
has a clean graph-theoretic structure.

The key technical insight is that **local operators on CPDAGs** (inserting or deleting one
edge at a time, maintaining the CPDAG representation) correspond to moving between adjacent
equivalence classes, and greedy improvement of these operators is globally consistent under
Chickering's theorem.

## Main Content

### Score Functions

GES requires a **decomposable, score-equivalent, consistent** scoring function:

> [!definition] Definition: Score Properties for GES
>
> - **Decomposable:** $Q(\mathcal{G}) = \sum_{i=1}^d Q_i(X_i, \mathrm{Pa}_\mathcal{G}(X_i))$
>   — the global score is a sum of local family scores. This enables efficient local updates.
>
> - **Score-equivalent:** $Q(\mathcal{G}) = Q(\mathcal{G}')$ whenever $\mathcal{G}$ and
>   $\mathcal{G}'$ are Markov equivalent — the score depends only on the equivalence class.
>   This is what makes the equivalence-class search space well-defined.
>
> - **Consistent:** As $n \to \infty$, the score correctly identifies the true DAG (up to
>   the equivalence class): $\arg\max_\mathcal{G} Q(\mathcal{G}) \to [\mathcal{G}^*]$.
>
> **BIC (Bayesian Information Criterion)** satisfies all three for Gaussian linear SEMs:
> $$Q_\text{BIC}(\mathcal{G}) = \ell(\hat\theta; \mathbf{X}, \mathcal{G}) - \frac{|\theta_\mathcal{G}|}{2}\log n,$$
> where $\ell$ is the log-likelihood at the MLE $\hat\theta$ and $|\theta_\mathcal{G}|$
> counts free parameters. The BDe(u) score is the analogous Bayesian score for discrete data.
^def-score-properties

### The Two Phases of GES

> [!definition] Algorithm: Greedy Equivalence Search (Chickering 2002)
>
> **Phase 1 — Forward Equivalence Search (FES):**
> Start from the empty graph (empty CPDAG).
> Repeat until no move improves the score:
> - Consider all valid **insert operators** $I(X_i, X_j, \mathbf{T})$: add edge $X_i \to X_j$
>   (with turn-set $\mathbf{T}$ to maintain CPDAG validity).
> - Apply the highest-scoring insert operator.
>
> FES terminates at a local maximum of the score in the *forward direction*.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> Starting from the CPDAG output by FES.
> Repeat until no move improves the score:
> - Consider all valid **delete operators** $D(X_i, X_j, \mathbf{H})$: remove edge $X_i \to X_j$
>   (with $\mathbf{H}$ to maintain CPDAG validity).
> - Apply the highest-scoring delete operator.
>
> BES terminates at a local maximum in the *backward direction*.
>
> **Output:** The CPDAG at the end of BES.
^def-ges-algorithm

### The Meek Conjecture (Chickering's Theorem)

The central theoretical result of Chickering (2002):

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Under:
> - The **Causal Markov Condition** and **Faithfulness** (see [[Markov Equivalence Classes and CPDAGs#^def-faithfulness]]),
> - **Causal Sufficiency** (no hidden confounders),
> - A **consistent, decomposable, score-equivalent** score (e.g., BIC),
>
> as $n \to \infty$, GES returns the **true CPDAG** $\mathcal{G}^*$ with probability 1.
>
> **Proof sketch:**
> - FES: In the large-sample limit, the BIC correctly ranks edge additions. Chickering shows
>   that every greedy insert move corresponds to moving to a "better" equivalence class until
>   the true class is reached.
> - BES: Analogously, every greedy delete move is valid, terminating at the true CPDAG.
>
> This proves the "Meek Conjecture" — Meek had conjectured but not proved that the two-phase
> greedy search recovers the true equivalence class under these conditions.
^thm-ges-consistency

### Why Two Phases Are Needed

> [!note] Why not just one forward phase?
> FES alone could stop in a class that contains *too many* edges — it adds edges greedily
> but may not remove spurious ones that improved the score by overfitting. BES then
> prunes these: it is structurally *not* the same as running FES "in reverse" because
> the operators and their validity conditions are different.
>
> Intuitively: FES finds a *supergraph* of the true CPDAG; BES prunes it back.
> The combination is necessary for consistency.

### Comparison with Forward/Backward Stepwise Regression

GES is analogous to forward-backward stepwise regression, but with key differences:
1. The "variables" are edges, not predictors.
2. The search space is CPDAGs (equivalence classes), not individual DAGs.
3. The operators must maintain the CPDAG representation — not every edge addition/removal
   is valid without additional orientation adjustments.
4. GES is *provably consistent* under faithfulness; stepwise regression is not in general.

### Complexity

| Component | Complexity |
|-----------|-----------|
| FES/BES inner loop | $O(d^2)$ candidate operators per step |
| Score evaluation (BIC, Gaussian) | $O(n \cdot q^2)$ per family, where $q$ = in-degree |
| Total steps to convergence | $O(d^2)$ in practice (sparse graphs) |
| Overall | $O(d^4)$ in the sparse-graph regime |

GES is generally faster than PC for dense graphs and large $n$, because score evaluation
is $O(n)$ while CI testing can be slower for non-Gaussian data.

## Examples

> [!example] Example: FES on a 3-Variable Chain
> True DAG: $X_1 \to X_2 \to X_3$. CPDAG: $X_1 - X_2 - X_3$ (chain and fork are equivalent).
>
> **FES:**
> - Start: empty graph.
> - Best insert: add $X_1 - X_2$ (largest score gain from using $X_2$ to predict $X_1$ or vice versa).
> - Next best: add $X_2 - X_3$.
> - Trying $X_1 - X_3$: after conditioning on $X_2$, no gain → not added.
> - FES output: $X_1 - X_2 - X_3$.
>
> **BES:** No deletion improves the score. Final CPDAG: $X_1 - X_2 - X_3$.
>
> **Interpretation:** Correct skeleton identified; chain/fork direction unidentifiable from
> observational data (faithfully represented by undirected edges).

## Connections

- **Constraint-based alternative:** [[PC Algorithm]] achieves the same consistency result
  but via CI tests rather than score optimization. PC can be faster on very sparse graphs;
  GES tends to be more robust to CI test misspecification.
- **Hybrid methods (MMHC):** The Max-Min Hill Climbing (MMHC) algorithm uses PC-like CI
  tests in a first pass to restrict the search space, then score-based hill climbing — a
  hybrid combining both paradigms.
- **NOTEARS** ([[NOTEARS - Overview]]): a continuous-optimization score-based method that
  does *not* search over equivalence classes; it optimizes a continuous score subject to
  a smooth acyclicity constraint. NOTEARS can recover the true DAG (not just CPDAG) under
  identifiability conditions, but is not consistent in the same equivalence-class sense.
- **High-dimensional extensions (FGS/FGES):** The **FGES** algorithm (Fast GES; Ramsey et al. 2017)
  parallelizes the score computations in FES and BES, scaling to thousands of variables.
  It is the current default in the **Tetrad** software.

## Software

| Package | Language | Functions |
|---------|----------|----------|
| **pcalg** | R | `ges()` — full GES with BIC, BDe; returns `$essgraph` (CPDAG) |
| **causal-learn** | Python | `ges()` from `causallearn.search.ScoreBased.GES` |
| **Tetrad / FGES** | Java (GUI) | Parallel FGES for large graphs |

**Usage example (causal-learn):**
```python
from causallearn.search.ScoreBased.GES import ges

Record = ges(data)
# Record['G'] is the CPDAG (GeneralGraph object)
# Record['score'] is the final BIC score
```

**Usage example (pcalg, R):**
```r
library(pcalg)
score <- new("GaussL0penObsScore", data = X)
ges.fit <- ges(score)
# ges.fit$essgraph is the essential graph (CPDAG)
```

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG representation and Meek rules
- [[PC Algorithm]] — constraint-based alternative, same consistency target
- [[DAG Structure Learning Problem]] — the NP-hard optimization problem GES approximates
- [[NOTEARS - Overview]] — continuous optimization alternative (score-based, not equivalence-class-based)
- [[Causal Discovery Methods Overview]] — PC vs GES vs NOTEARS comparison
