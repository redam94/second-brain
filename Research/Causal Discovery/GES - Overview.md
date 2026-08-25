---
title: "GES - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-canonical-references.md]]"
source_location: "Chickering (2002), JMLR Vol. 3, pp. 507-554; §1 Introduction, §2 Background"
date_ingested: 2026-08-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[GES - Forward and Backward Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES algorithm"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES - Overview

> [!summary]
> **GES (Greedy Equivalence Search)**, introduced by Chickering (2002), is the foundational
> **score-based** algorithm for causal structure learning. Its key insight is to search
> over **Markov equivalence classes** (represented as CPDAGs) rather than individual
> DAGs, using a **decomposable score** (typically BIC) that assigns the same value to all
> equivalent DAGs. GES proceeds in two phases — Forward Equivalence Search (FES) adds
> edges greedily; Backward Equivalence Search (BES) removes them — and is provably
> **consistent** for faithful Gaussian linear SEMs: in large samples it recovers the
> true CPDAG. Hauser & Bühlmann (2012) added a Turning phase that makes GES
> score-optimal under the BIC.

## Overview

GES occupies a central position among causal discovery methods. While [[PC Algorithm - Overview|PC]]
explicitly tests conditional independence statements, GES never runs a single CI test:
it evaluates a **score function** that summarizes how well a CPDAG fits the data,
and greedily moves through the CPDAG space.

The critical insight motivating GES is that the score-equivalence of BIC — all
DAGs in the same Markov equivalence class receive the same BIC score — means the
CPDAG space is a well-defined domain for optimization. Chickering (2002) proves that
this space has elegant structure: any two CPDAGs can be connected by sequences of
**Insert**, **Delete**, and **Turn** operations, each changing the CPDAG by exactly
one edge insertion, deletion, or reversal.

GES was later extended to **fGES** (fast GES, Ramsey et al. 2017) using parallelism
and sparse graph priors, and is the foundation of the widely-used **TETRAD** software
suite (CMU).

## Main Content

### Score-equivalence and the BIC score

> [!definition] Definition: Score-Equivalence
> A score function $S(\mathcal{G}, \mathbf{X})$ is **score-equivalent** if it assigns
> the same score to all DAGs $\mathcal{G}, \mathcal{G}'$ in the same Markov equivalence
> class:
> $$[\mathcal{G}] = [\mathcal{G}'] \;\Rightarrow\; S(\mathcal{G}, \mathbf{X}) = S(\mathcal{G}', \mathbf{X}).$$
> Score-equivalence holds for BIC (Gaussian linear SEM), BDeu (multinomial),
> and any score derived from the marginal likelihood of a parameter-independent,
> parameter-modular prior.
^def-score-equivalence

> [!definition] Definition: Gaussian BIC Score (Chickering 2002, §2.3)
> For a Gaussian linear SEM with data $\mathbf{X} \in \mathbb{R}^{n \times d}$, the
> **BIC score** (Bayesian Information Criterion) of DAG $\mathcal{G}$ is:
> $$\text{BIC}(\mathcal{G}) = \sum_{i=1}^d \left[
>   -\frac{n}{2} \log \hat{\sigma}^2_{i \mid \mathrm{pa}_\mathcal{G}(X_i)}
>   - \frac{|\mathrm{pa}_\mathcal{G}(X_i)| + 1}{2} \log n
> \right],$$
> where $\hat{\sigma}^2_{i \mid \mathrm{pa}_\mathcal{G}(X_i)}$ is the OLS residual
> variance of $X_i$ regressed on its parents $\mathrm{pa}_\mathcal{G}(X_i)$.
>
> **Decomposability:** $\text{BIC}(\mathcal{G}) = \sum_{i=1}^d s(X_i, \mathrm{pa}_\mathcal{G}(X_i))$.
> The score decomposes as a sum of **local scores** — one per node, depending only
> on that node and its parents. This enables efficient computation: when an operator
> changes only a few parent sets, only the affected local scores need recomputation.
^def-bic-score

The BIC penalty $\frac{|\mathrm{pa}|+1}{2}\log n$ per parameter controls sparsity:
larger $n$ increases the penalty for additional parents, enforcing parsimony as data
grows. The causal-learn implementation exposes this via `lambda_value` (default 0.5,
corresponding to $\frac{\log n}{2}$ per parameter — the standard BIC).

### The CPDAG search space

GES operates in the **CPDAG space** — the set of all CPDAGs on $d$ nodes. Unlike the
DAG space (which is a directed acyclic graph of size superexponential in $d$), the
CPDAG space has a tractable geometric structure:

> [!theorem] Theorem: CPDAG Neighbourhood (Chickering 2002, Thm. 15)
> Two CPDAGs $\mathcal{C}$ and $\mathcal{C}'$ are **neighbours** in the CPDAG space
> (reachable by one operator) iff they differ in the status of exactly one edge:
> - **Insert** $\mathcal{C} \xrightarrow{+e} \mathcal{C}'$: one edge $X \to Y$ is added
> - **Delete** $\mathcal{C} \xrightarrow{-e} \mathcal{C}'$: one edge is removed
> - **Turn** $\mathcal{C} \xrightarrow{\leftrightsquigarrow e} \mathcal{C}'$: one edge is reversed
>
> The **score change** $\Delta\text{BIC}$ for each operator can be computed locally
> (touching only nodes $X$ and $Y$ and their neighbourhood $T$), without re-scoring
> the entire graph.
^thm-cpdag-neighbourhood

### GES algorithm structure

> [!theorem] Algorithm: Greedy Equivalence Search (Chickering 2002)
>
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, score function $S$ (e.g. BIC).
>
> **Phase 1 — Forward Equivalence Search (FES):**
> 1. Initialize $\mathcal{C} \leftarrow$ empty CPDAG (no edges).
> 2. **Repeat:** find the Insert operator $(X, Y, T)$ that maximally increases $S(\mathcal{C})$.
>    If no operator increases $S$: stop Phase 1.
>    Else: apply Insert$(X, Y, T)$ to $\mathcal{C}$.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> 3. **Repeat:** find the Delete operator $(X, Y, H)$ that maximally increases $S(\mathcal{C})$.
>    If no operator increases $S$: stop Phase 2.
>    Else: apply Delete$(X, Y, H)$ to $\mathcal{C}$.
>
> *(Optional, Hauser & Bühlmann 2012)*
> **Phase 3 — Turning:**
> 4. **Repeat:** find the Turn operator $(X, Y, C)$ that maximally increases $S(\mathcal{C})$.
>    If no operator increases $S$: stop.
>    Else: apply Turn$(X, Y, C)$ to $\mathcal{C}$.
>
> **Output:** CPDAG $\mathcal{C}$ — the estimated Markov equivalence class of the true DAG.
^alg-ges

For the formal definitions of Insert, Delete, and Turn operators, and their score-change
formulas, see [[GES - Forward and Backward Search]].

### Correctness and consistency

> [!theorem] Theorem: GES Consistency (Chickering 2002, Thm. 15 + Cor. 2)
> Under the **Causal Markov condition**, **Faithfulness**, and **Causal Sufficiency**
> (same assumptions as PC), and using a **score-equivalent decomposable score** with
> the property that the score of the true CPDAG exceeds that of any other CPDAG
> in the limit $n \to \infty$:
>
> 1. **FES completeness:** FES starting from the empty CPDAG will include every edge
>    of the true skeleton in the CPDAG it produces (no false negatives after Phase 1).
> 2. **BES soundness:** BES removes all and only the false edges added by FES
>    (no false positives after Phase 2).
> 3. **Combined:** GES (FES + BES) converges to the true CPDAG as $n \to \infty$.
^thm-ges-consistency

The BIC satisfies the required score property asymptotically (it is consistent for model
selection under standard regularity conditions). The Turning phase (Phase 3) further
ensures that GES finds the **global BIC optimum** over CPDAGs, not just a local one.

### PC vs. GES: key comparison

| Dimension | PC | GES |
|-----------|-----|-----|
| Method type | Constraint-based (CI tests) | Score-based (BIC optimization) |
| Search space | Implicit (skeleton + orientation) | CPDAG space (explicit) |
| Computational scaling | Depends on max degree; exponential in dense regime | $O(d^2 \cdot$ local score cost$)$ per operator |
| Accuracy | Good for sparse graphs; affected by CI test errors | Generally more accurate; harder to make false-positive CI mistakes |
| Order-dependence | Original PC is order-dependent (stable PC fixes this) | No order-dependence (score is deterministic) |
| Latent confounders | Requires FCI extension | Requires extension (GFCI, etc.) |
| Software | `pcalg::pc()` (R), `causal-learn pc()` (Python) | `pcalg::ges()` (R), `causal-learn ges()` (Python) |

## Connections

- **NOTEARS**: NOTEARS (see [[NOTEARS - Overview]]) is a third paradigm — continuous
  optimization over real matrices. The [[NOTEARS Experiments]] show that NOTEARS beats
  both PC and GES on dense graphs, while GES is competitive on sparse graphs.
- **DAG Structure Learning Problem**: The "traditional combinatorial program" in
  [[DAG Structure Learning Problem]] is exactly what GES is solving — Program (4)
  in NOTEARS notation.
- **Equivalence to BN fitting**: GES is equivalent to finding the highest-BIC Bayesian
  network, connecting to [[LLM Expert Elicitation for Bayesian Networks]] where the BN
  structure is given; GES is how you learn it from data.
- **fGES and TETRAD**: The fast GES (fGES) implementation parallelizes operator search
  and uses sparse graph priors; it underlies the TETRAD software that is also used in
  [[BN Construction Methods Comparison]].

## See Also

- [[GES - Forward and Backward Search]] — Insert/Delete/Turn operator definitions and score formulas
- [[PC Algorithm - Overview]] — constraint-based alternative
- [[PC Algorithm - Skeleton and Orientation]] — full 3-phase PC procedure
- [[DAG Structure Learning Problem]] — problem setup, SEM, NP-hardness
- [[NOTEARS - Overview]] — continuous-optimization alternative; both PC and GES are baselines
- [[NOTEARS Experiments]] — empirical comparison of PC, GES, FGS, and NOTEARS
