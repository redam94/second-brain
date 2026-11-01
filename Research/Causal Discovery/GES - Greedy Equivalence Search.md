---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/chickering2002-GES-source.md]]"
source_location: "Chickering (2002) JMLR 3:507–554, §3–§5"
date_ingested: 2026-11-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence Classes]]"
  - "[[V-Structures and Meek Orientation Rules]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[Causal Discovery - Landscape]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES BES"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** algorithm
> for learning the Markov equivalence class of a causal DAG. It operates in the space of
> **CPDAGs** via two greedy phases: Forward Equivalence Search (FES, insert edges to increase
> score) and Backward Equivalence Search (BES, delete edges to increase score). GES is
> asymptotically correct under faithfulness and a consistent decomposable score (e.g., BIC),
> with the correctness guaranteed by the **Meek conjecture** — proved as the main theoretical
> result of the paper. NOTEARS's empirical comparisons use GES (as "FGS") as a primary baseline.

## Overview

Where [[PC Algorithm]] uses **conditional independence tests** to read off the CI structure of
the distribution, GES uses a **score function** to compare models. The two approaches should, in
large samples, identify the same CPDAG — they are approaching the same target from different
angles.

**The key insight of GES:** the space of DAGs is exponential, but the space of **Markov
equivalence classes** (CPDAGs) has useful structure — any two equivalent DAGs are connected by
covered edge reversals (the Meek conjecture), and covered edge reversals do not decrease the
score asymptotically. This makes greedy search in CPDAG space **globally optimal in the
large-sample limit**.

## Main Content

### Decomposable score

GES requires a **decomposable score** — a score that factors over nodes and their parent sets.

> [!definition] Definition: Decomposable score
> A score $Q(\mathcal{G}, \mathbf{X})$ is **decomposable** if it factors as:
> $$Q(\mathcal{G}, \mathbf{X}) = \sum_{j=1}^{d} Q_j\bigl(X_j, \text{pa}_\mathcal{G}(X_j), \mathbf{X}\bigr)$$
> where each term $Q_j$ depends only on $X_j$, its parents $\text{pa}_\mathcal{G}(X_j)$, and the data.
>
> **Standard choices:**
> - **BIC** (Bayesian Information Criterion): $Q_j = \ell_j(\hat{\theta}_j, \mathbf{X}) - \frac{|\theta_j|}{2}\log n$,
>   where $\ell_j$ is the local log-likelihood maximized over parameters $\theta_j$, and $|\theta_j|$
>   is the number of free parameters for node $j$'s conditional distribution
> - **BDeu** (Bayesian Dirichlet equivalent uniform): exact marginal likelihood for discrete DAGs
>   under a uniform-strength Dirichlet prior; exactly decomposable
>
> Decomposability is essential: it means the score change from inserting/deleting one edge is
> computable without re-fitting the entire model.
^def-decomposable-score

### The Meek conjecture (key theorem)

> [!theorem] Theorem: Meek conjecture (Chickering 2002, Lemma 18)
> Let $\mathcal{G}_1$ and $\mathcal{G}_2$ be Markov-equivalent DAGs ($\mathcal{G}_1 \sim \mathcal{G}_2$).
> Then there exists a sequence of **covered edge reversals**
> $$\mathcal{G}_1 = \mathcal{H}_0 \to \mathcal{H}_1 \to \cdots \to \mathcal{H}_m = \mathcal{G}_2$$
> where each $\mathcal{H}_{t+1}$ is obtained from $\mathcal{H}_t$ by reversing a single covered edge,
> and every intermediate graph $\mathcal{H}_t$ is a DAG.
>
> Moreover, in the large-sample limit:
> $$Q(\mathcal{H}_{t+1}) \geq Q(\mathcal{H}_t) \quad \text{for all } t,$$
> i.e., the score is **non-decreasing** along covered edge reversals within an equivalence class.
^thm-meek-conjecture

**Why this matters for GES:** The theorem means that every local maximum of the score in
CPDAG space is a global maximum within the equivalence class. Therefore, if FES reaches the
correct equivalence class, BES (which operates within the class) will not depart from it.

> [!definition] Definition: Covered edge
> An edge $X \to Y$ in DAG $\mathcal{G}$ is **covered** if $\text{pa}_\mathcal{G}(X) = \text{pa}_\mathcal{G}(Y) \setminus \{X\}$
> — the parents of $X$ are exactly the parents of $Y$, excluding $X$ itself.
> Reversing a covered edge produces a Markov-equivalent DAG (Chickering 1995).
^def-covered-edge

### The GES algorithm

> [!definition] Definition: GES Algorithm (Chickering 2002)
>
> **Input:** Data $\mathbf{X}$; decomposable score $Q$
>
> **Phase I — Forward Equivalence Search (FES):**
> 1. Start with $\mathcal{C}_0$ = empty CPDAG (no edges)
> 2. Repeat:
>    - Enumerate all **valid edge insertions** $\text{Insert}(X, Y, T)$: add edge $X \to Y$ where
>      $T \subseteq \text{neighbors}(Y)$ become oriented toward $Y$. An insertion is **valid** if
>      the resulting graph is still a CPDAG.
>    - Choose the insertion that maximally increases $Q$: select $\text{Insert}^* = \arg\max_{\text{Insert}} \Delta Q$
>    - If $\Delta Q > 0$: apply $\text{Insert}^*$, update $\mathcal{C}$; else break
> 3. Output $\mathcal{C}_{\text{FES}}$
>
> **Phase II — Backward Equivalence Search (BES):**
> 4. Start with $\mathcal{C}_{\text{FES}}$
> 5. Repeat:
>    - Enumerate all **valid edge deletions** $\text{Delete}(X, Y, H)$: remove edge $X \to Y$ or
>      $X - Y$, where $H \subseteq \text{neighbors}(Y)$ become undirected. A deletion is **valid**
>      if the result is a CPDAG.
>    - Choose the deletion that maximally increases $Q$
>    - If $\Delta Q > 0$: apply deletion, update $\mathcal{C}$; else break
> 6. Output $\mathcal{C}_{\text{GES}}$ (final CPDAG)
^def-ges-algorithm

### Score increments (decomposability in action)

The key algorithmic efficiency of GES comes from **score decomposability**: inserting edge
$X \to Y$ with parent augmentation set $T$ changes the score by:
$$\Delta Q_{\text{Insert}} = Q_Y\bigl(X_Y, \text{pa}(Y) \cup \{X\} \cup T\bigr) - Q_Y\bigl(X_Y, \text{pa}(Y) \cup T\bigr)$$
Only the local score term for node $Y$ changes — all other terms are unaffected. This makes
each score evaluation $O(n)$ (linear in data) rather than $O(nd)$.

### Consistency theorem

> [!theorem] Theorem: GES asymptotic correctness (Chickering 2002, Theorem 15)
> Assume:
> 1. The true distribution $\mathbb{P}$ is faithful to some DAG $\mathcal{G}^*$
> 2. The score $Q$ is **consistent**: for large $n$, the score is maximized by (and only by) the
>    true equivalence class $[\mathcal{G}^*]$
> 3. The score is decomposable
>
> Then GES identifies $[\mathcal{G}^*]$ as $n \to \infty$:
> $$P\bigl(\mathcal{C}_{\text{GES}} = \mathcal{C}^*\bigr) \to 1 \quad \text{as } n \to \infty.$$
^thm-ges-consistency

**BIC consistency:** Under Gaussian data and assuming faithfulness, the BIC score is consistent
for structure learning (Haughton 1988; Schwarz 1978). Combined with Theorem above: GES + BIC
is a consistent structure learning procedure.

### FGES: Fast GES for large graphs

**FGES** (Fast GES, Ramsey et al. 2017) parallelizes the search over candidate insertions and
deletions, enabling GES to scale to thousands of variables. Key modifications:
- Maintains a **sorted list** of candidate insertions/deletions
- Uses **memoization** of score increments (recomputes only when the neighborhood changes)
- Parallelizes score evaluations across CPU cores

FGES is implemented in the TETRAD package and `causal-learn` Python.

### Comparison: GES vs. PC

| Property | GES | PC |
|----------|-----|-----|
| Input | Score function + data | CI test + data |
| Multiple testing | None (single score) | Many CI tests (type I/II errors) |
| Tuning | Score penalty (BIC: $\frac{k}{2}\log n$) | Significance level $\alpha$ |
| Finite samples | Score misspecification possible | CI test errors possible |
| Non-parametric | Requires parametric score (BIC/BDeu) | Model-free CI tests available |
| Equivalence class | Directly via CPDAG operators | Via skeleton + v-structures + Meek |

In practice: GES tends to be more robust to the multiple-testing issue that plagues PC in
high dimensions. PC (Kalisch & Bühlmann 2007 version) handles high dimensions better through
theory, but FGES handles large $d$ better in practice through parallelism.

## Software

```r
# pcalg R package
library(pcalg)
score <- new("GaussL0penObsScore", data = X)  # BIC-based score
ges.fit <- ges(score)
# ges.fit$essgraph is the CPDAG

# causal-learn Python
from causallearn.search.ScoreBased.GES import ges
Record = ges(X)  # X is numpy array, returns CPDAG
```

## Connections

- **Meek rules** are used internally by GES to maintain the CPDAG after each insertion/deletion.
  See [[V-Structures and Meek Orientation Rules]].
- **NOTEARS experiments** compare NOTEARS against GES (as "FGS") in [[NOTEARS Experiments]] —
  NOTEARS outperforms GES on dense graphs but GES is faster on sparse ones.
- **CPDAG representation** is the common output format of both GES and PC — see
  [[CPDAG and Markov Equivalence Classes]].
- **DAG structure learning landscape**: see [[Causal Discovery - Landscape]] for the three-way
  comparison of PC, GES, and NOTEARS.

## See Also
- [[PC Algorithm]] — constraint-based alternative
- [[CPDAG and Markov Equivalence Classes]] — the search space GES operates in
- [[V-Structures and Meek Orientation Rules]] — orientation propagation used by GES internally
- [[Causal Discovery - Landscape]] — when to use GES vs. PC vs. NOTEARS
- [[DAG Structure Learning Problem]] — the optimization problem GES solves
- [[NOTEARS Experiments]] — empirical comparison against GES
