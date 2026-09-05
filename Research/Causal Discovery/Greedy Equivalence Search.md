---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.txt]]"
source_location: "Chickering (2002) JMLR, §2–5; Meek Conjecture proof"
date_ingested: 2026-09-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Constraint-Based vs Score-Based Causal Discovery]]"
aliases:
  - "GES"
  - "Chickering 2002"
  - "greedy equivalence search"
  - "FES BES"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering, 2002) is the canonical **score-based**
> algorithm for causal structure learning. Rather than testing conditional independencies,
> GES searches directly over the space of Markov equivalence classes (CPDAGs) using a
> decomposable score (typically BIC or BDeu). GES has two phases: **Forward Equivalence
> Search** (FES) greedily adds edges; **Backward Equivalence Search** (BES) greedily removes
> edges. Chickering proves that GES is **correct and complete** under faithfulness: with a BIC
> score and large enough samples, GES identifies the CPDAG of the true DAG. The key theoretical
> tool is the **Meek Conjecture** (proven as Theorem 15 in the paper).

## Overview

GES was introduced by Chickering (2002) as a response to the NP-hardness of exact DAG
score maximization (Chickering, 1996). Instead of searching over individual DAGs, GES
performs a **greedy hill-climbing search over equivalence classes**, represented as CPDAGs.
This is the key computational innovation: operators that add or remove edges from a CPDAG
can be applied while remaining in the space of valid CPDAGs — no separate acyclicity checking
is needed.

GES is the score-based counterpart of [[PC Algorithm]]: both output a CPDAG, but PC uses
conditional independence tests while GES uses a likelihood score. GES avoids the
**multiple-testing problem** of PC but requires a correctly specified score and is more
computationally intensive on dense graphs.

## Main Content

### Score Functions

> [!definition] Decomposable Score
> A score $s(G, \mathbf{X})$ is **decomposable** if it can be written as a sum over nodes:
> $$s(G, \mathbf{X}) = \sum_{i=1}^{d} s_i(\mathrm{pa}_G(i), \mathbf{X}),$$
> where $s_i$ depends only on $X_i$ and its parent set $\mathrm{pa}_G(i)$.
>
> A decomposable score is **score-equivalent** if Markov equivalent DAGs receive the same
> score: $G \sim G' \Rightarrow s(G, \mathbf{X}) = s(G', \mathbf{X})$.
>
> Both BIC and BDeu are decomposable and score-equivalent.
^def-decomposable-score

> [!definition] BIC Score (Schwarz, 1978; applied to DAG learning)
> For a linear Gaussian DAG, the **BIC score** for node $X_i$ with parent set $\mathrm{pa}(i) = S$:
> $$s_i^{\mathrm{BIC}}(S, \mathbf{X}) = \hat{\ell}_i(S, \mathbf{X}) - \frac{\log n}{2}\cdot|S|,$$
> where $\hat{\ell}_i$ is the maximum log-likelihood of the regression of $X_i$ on $X_S$
> (least-squares residual variance), and $|S|$ is the number of parents.
>
> For Gaussian SEMs: $s_i^{\mathrm{BIC}}(S, \mathbf{X}) = -\frac{n}{2}\log \hat{\sigma}^2_{i|S} - \frac{\log n}{2}|S|$,
> where $\hat{\sigma}^2_{i|S}$ is the residual variance from regressing $X_i$ on $X_S$.
>
> **Total BIC:** $s^{\mathrm{BIC}}(G, \mathbf{X}) = \sum_{i=1}^d s_i^{\mathrm{BIC}}(\mathrm{pa}_G(i), \mathbf{X})$.
^def-bic-score

**BDeu** (Bayesian Dirichlet equivalent uniform) is the analogous score for discrete data,
computed from Dirichlet priors on multinomial parameters.

### Phase 1: Forward Equivalence Search (FES)

> [!definition] FES Phase
> **Input:** Data $\mathbf{X}$, decomposable score $s$.
> **Output:** CPDAG $G_1$ at the end of the forward phase.
>
> 1. Initialize: $G_0 = \emptyset$ (empty CPDAG).
> 2. **Repeat** until no Insert operator improves the score:
>    a. For each pair $(X, Y)$ not adjacent in the current CPDAG $G$:
>       For each valid **Insert operator** $\text{Insert}(X, Y, T)$
>       (where $T \subseteq \mathrm{adj}(Y) \setminus \mathrm{adj}(X)$ satisfies validity conditions):
>       - Compute score gain $\Delta s = s(G_\text{after}) - s(G_\text{before})$.
>    b. Apply the Insert operator with the largest positive $\Delta s$.
>    c. Convert the resulting PDAG to a CPDAG (Dor & Tarsi, 1992).
> 3. Return $G_1$.
^def-fes

The **Insert operator** $\text{Insert}(X, Y, T)$ adds a directed edge $X \to Y$ to a CPDAG
by orienting it and adjusting a subset $T$ of $Y$'s current neighbours. A validity condition
ensures the resulting graph is still a PDAG that can be completed to a CPDAG.

**Efficiency via decomposability:** Because the score is decomposable, the gain $\Delta s$ only
involves terms for $Y$ and nodes in $T$ — a local computation that avoids recomputing the
global score.

### Phase 2: Backward Equivalence Search (BES)

> [!definition] BES Phase
> **Input:** CPDAG $G_1$ from FES.
> **Output:** Final CPDAG $G_2$.
>
> 1. **Repeat** until no Delete operator improves the score:
>    a. For each adjacent pair $(X, Y)$ in the current CPDAG $G$:
>       For each valid **Delete operator** $\text{Delete}(X, Y, H)$
>       (where $H \subseteq \mathrm{adj}(X) \cap \mathrm{adj}(Y)$):
>       - Compute score gain $\Delta s = s(G_\text{after}) - s(G_\text{before})$.
>    b. Apply the Delete operator with the largest positive $\Delta s$.
>    c. Convert the resulting PDAG to a CPDAG.
> 2. Return $G_2$.
^def-bes

The **Delete operator** $\text{Delete}(X, Y, H)$ removes edge $X - Y$ (or $X \to Y$) from
a CPDAG and adjusts orientations among the subset $H$ of common neighbours.

### The Meek Conjecture and GES Correctness

The correctness proof for GES hinges on the **Meek Conjecture** (conjectured by Meek, 1997;
proven by Chickering, 2002):

> [!theorem] Meek Conjecture / Chickering's Theorem (Chickering, 2002, Theorem 15)
> Let $G$ be a DAG and $H$ be a DAG that is an **I-map** (independence map) of $G$ — i.e.,
> every conditional independence in $G$ is also in $H$, so $H$ may have *more* edges than $G$.
> Then there exists a sequence of **edge additions** and **covered edge reversals** that:
> 1. Transforms $H$ into $G$ (or a Markov equivalent DAG), and
> 2. Each step produces an I-map of $G$ (the I-map property is preserved throughout).
>
> A **covered edge** $X \to Y$ is one where $\mathrm{pa}(X) = \mathrm{pa}(Y) \setminus \{X\}$.
^thm-meek-conjecture

This theorem implies that GES's greedy path (always choosing the best Insert or Delete) can
navigate from the empty DAG to the true CPDAG without ever having to "backtrack" past a
non-I-map — justifying the greedy approach.

> [!theorem] GES Correctness (Chickering, 2002, Theorems 16–17)
> Assume:
> 1. The true distribution $\mathbb{P}$ is Markov and faithful with respect to DAG $G^*$.
> 2. The score is decomposable, score-equivalent, and **consistent** (meaning it prefers a DAG
>    $G$ over $H$ in large samples if and only if $G$ is closer to $G^*$ in the inclusion order).
>    BIC satisfies consistency under standard regularity conditions.
>
> Then in the large-sample limit ($n \to \infty$):
> - **FES is correct**: $G_1$ is the unique I-map of $G^*$ with the minimum number of edges
>   (the minimal I-map), i.e. $G_1 = \mathrm{CPDAG}(G^*)$ when $G^*$ is already a minimal I-map.
> - **BES is correct**: $G_2 = \mathrm{CPDAG}(G^*)$.
>
> Therefore GES identifies the true CPDAG in the large-sample limit.
^thm-ges-correctness

### Turning Phase (Hauser & Bühlmann, 2012)

An optional **third phase** — not in Chickering's original paper — was added by Hauser & Bühlmann
(2012): the **Turning Phase** applies *turning operators* (reversals of covered edges) that can
escape local optima between FES and BES. This extended algorithm is called **GIES** (Greedy
Interventional Equivalence Search) in the interventional setting, and the turning phase is now
standard in most implementations (included in `causal-learn` as GES phase 3).

## Examples

> [!example] Example: GES on 3 variables
> True DAG: $X_1 \to X_2 \to X_3$ (chain). Markov equivalence class: $\{X_1 \to X_2 \to X_3,\;
> X_1 \leftarrow X_2 \to X_3,\; X_1 \leftarrow X_2 \leftarrow X_3\}$. CPDAG: $X_1 - X_2 - X_3$.
>
> **FES start:** Empty graph.
> - Best Insert: add $X_1 - X_2$ (largest BIC gain). Score: $-n\log\hat\sigma^2_{1|2}$.
> - Best Insert: add $X_2 - X_3$.
> - Best Insert: try $X_1 - X_3$ — no gain (independent given $X_2$) → stop FES.
> - $G_1 = X_1 - X_2 - X_3$ (undirected skeleton, no v-structures).
>
> **BES start:** $G_1 = X_1 - X_2 - X_3$.
> - Try removing $X_1 - X_2$: score decreases → keep.
> - Try removing $X_2 - X_3$: score decreases → keep.
> - No improvement → stop BES.
> - $G_2 = X_1 - X_2 - X_3$ = correct CPDAG. ✓

> [!example] Example: V-structure identification
> True DAG: $X_1 \to X_2 \leftarrow X_3$ (v-structure). CPDAG: same (all edges compelled).
>
> **FES:** Adds $X_1 - X_2$ and $X_3 - X_2$ first (marginal dependencies); adding $X_1 - X_3$
> gives no BIC gain (they are marginally independent). The orientation $X_1 \to X_2 \leftarrow X_3$
> scores strictly higher than $X_1 \leftarrow X_2 \to X_3$ (BIC correctly identifies the
> v-structure since it distinguishes the conditional distributions).
>
> $G_2 = X_1 \to X_2 \leftarrow X_3$. ✓

## Connections

- **Score vs. tests:** GES uses a score; PC uses CI tests. Scores are immune to multiple
  testing issues but require a correctly specified parametric family. See [[PC Algorithm]].
- **Versus NOTEARS:** Both are score-based but differ in search strategy: GES searches the
  CPDAG space greedily; NOTEARS formulates a continuous constrained optimization over the
  full matrix $W$. See [[NOTEARS - Overview]].
- **FGES (Fast GES):** Ramsey et al. (2017) introduce a parallelized version of GES
  (implemented in the TETRAD software) that scales to thousands of variables.
- **Software:** `pcalg::ges` (R), `causal-learn` (Python), TETRAD (Java, FGES).

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the search space of GES
- [[PC Algorithm]] — the constraint-based complement
- [[DAG Structure Learning Problem]] — score formulation shared with NOTEARS
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[Constraint-Based vs Score-Based Causal Discovery]] — when to use GES vs PC
