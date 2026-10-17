---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-chickering02b-GES-JMLR.txt]]"
source_location: "Chickering (2002) JMLR Vol. 3, pp. 507-554"
date_ingested: 2026-10-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by: []
aliases:
  - "GES algorithm"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the foundational **score-based**
> algorithm for causal structure learning. Unlike the PC algorithm, which tests conditional
> independence constraints, GES optimizes a statistical score (BIC, BDe) by searching over
> **Markov equivalence classes** (CPDAGs) rather than individual DAGs. It has two phases:
> a **forward** phase adding edges (improving score) and a **backward** phase removing edges
> (further improving score). Chickering proved that GES recovers the true CPDAG in the
> large-sample limit under faithfulness and causal sufficiency, using the Meek conjecture
> as the key structural lemma. GES is implemented as `ges()` in the `pcalg` R package.

## Overview

The PC algorithm and GES address the same causal discovery problem from complementary
angles:

| Property | PC (constraint-based) | GES (score-based) |
|----------|----------------------|-------------------|
| Core operation | CI tests | Score evaluation (BIC/BDe) |
| Search space | Implicitly over skeletons | Explicitly over CPDAGs |
| Tuning parameter | Significance level $\alpha$ | Score choice (BIC penalty) |
| Finite-sample behavior | Sensitive to $\alpha$; exact at correct $\alpha$ | Score can absorb estimation error |
| Computational cost | $O(d^{q+2})$ with degree bound $q$ | $O(d^2)$ per operator; $O(d^4)$ in practice |
| Consistency | Yes (faithful + causal sufficiency) | Yes (faithful + causal sufficiency) |

GES's key insight is that searching over **equivalence classes** (CPDAGs) rather than
individual DAGs avoids redundant exploration: all DAGs in the same class are equivalent,
so only one representative need be evaluated.

## Main Content

### The search space: operators on CPDAGs

GES defines two score-based operators on CPDAGs that correspond to single-edge modifications:

> [!definition] Definition: Insert Operator (Chickering 2002, §4.1)
> Let $\mathcal{C}$ be a CPDAG. The **insert operator** $\mathrm{Insert}(X, Y, T)$ adds an
> oriented edge $X \to Y$ to (a representative DAG in) $\mathcal{C}$, where
> $T \subseteq \mathrm{Ne}_{\mathcal{C}}(Y) \setminus \mathrm{Ad}_{\mathcal{C}}(X)$
> (the set $T$ of $Y$'s undirected neighbours that will become new parents of $Y$).
>
> After inserting, the result is converted to a new CPDAG $\mathcal{C}'$ using the Meek
> rules. The score change is:
> $$\Delta \mathrm{score}(\mathrm{Insert}(X,Y,T)) = \mathrm{score}(Y \mid \mathrm{Pa}(Y) \cup \{X\} \cup T) - \mathrm{score}(Y \mid \mathrm{Pa}(Y) \setminus T).$$
^def-insert

> [!definition] Definition: Delete Operator (Chickering 2002, §4.2)
> The **delete operator** $\mathrm{Delete}(X, Y, H)$ removes the edge between $X$ and $Y$
> from $\mathcal{C}$ (regardless of its current orientation), where
> $H \subseteq \mathrm{Ne}_{\mathcal{C}}(Y) \cap \mathrm{Ad}_{\mathcal{C}}(X)$
> (nodes that become non-adjacent to $Y$ after the deletion).
>
> The score change is:
> $$\Delta \mathrm{score}(\mathrm{Delete}(X,Y,H)) = \mathrm{score}(Y \mid \mathrm{Pa}(Y) \setminus (\{X\} \cup H)) - \mathrm{score}(Y \mid \mathrm{Pa}(Y) \cup H).$$
^def-delete

### Score functions

GES works with any **decomposable** score: a score $Q(\mathsf{G}) = \sum_{j=1}^d q(X_j \mid \mathrm{Pa}_\mathsf{G}(X_j))$ that decomposes over nodes. Standard choices:

- **BIC** (Bayesian Information Criterion) for continuous Gaussian data:
  $$Q_\text{BIC}(X_j \mid \mathrm{Pa}(X_j)) = \hat{\ell}_j - \frac{|\mathrm{Pa}(X_j)| + 1}{2} \log n,$$
  where $\hat{\ell}_j$ is the local log-likelihood for $X_j$ given its parents.

- **BDe** (Bayesian Dirichlet equivalent) for discrete data: the marginal log-likelihood
  under a Dirichlet prior, which is available in closed form for complete data.

Both satisfy the **score equivalence** property: Markov-equivalent DAGs receive the same
score. This is what makes searching over equivalence classes meaningful — the score
distinguishes between equivalence classes but not within them.

### The GES algorithm

> [!theorem] Algorithm: GES (Chickering 2002, §5)
>
> **Input**: Data $\mathbf{X}$; a decomposable score $Q$.
> **Output**: CPDAG $\hat{\mathcal{C}}$.
>
> **Phase 1 — Forward (Insert) Phase**:
> Start from the **empty graph** $\mathcal{C}_0$ (no edges).
> Repeat until no Insert operator improves the score:
> - Find the highest-scoring $\mathrm{Insert}(X, Y, T)$ with $\Delta Q > 0$.
> - Apply it: $\mathcal{C} \leftarrow \mathrm{Insert}(X, Y, T)(\mathcal{C})$, then orient.
>
> **Phase 2 — Backward (Delete) Phase**:
> Start from $\hat{\mathcal{C}}^{(1)}$ (output of Phase 1).
> Repeat until no Delete operator improves the score:
> - Find the highest-scoring $\mathrm{Delete}(X, Y, H)$ with $\Delta Q > 0$.
> - Apply it: $\mathcal{C} \leftarrow \mathrm{Delete}(X, Y, H)(\mathcal{C})$, then orient.
>
> **Output**: $\hat{\mathcal{C}} = \hat{\mathcal{C}}^{(2)}$ (output of Phase 2).
^thm-ges-algorithm

> [!note] Why two phases?
> The forward phase can **overshoot** — add edges not in the true graph, because the score
> improves on finite data even for spurious edges. The backward phase then removes these
> spurious edges. In the large-sample limit, the forward phase reaches exactly the true
> equivalence class and the backward phase makes no changes.

### Consistency theorem

> [!theorem] GES Consistency (Chickering 2002, Theorem 15 + Corollary 1)
> Assume:
> (a) Causal sufficiency (no latent confounders),
> (b) Faithfulness,
> (c) The score $Q$ is **score consistent**: for any two non-equivalent DAGs $\mathsf{G}_1,\mathsf{G}_2$, if $\mathsf{G}_1$ has higher population score then the sample score of $\mathsf{G}_1$ exceeds that of $\mathsf{G}_2$ with probability $\to 1$.
>
> Then as $n \to \infty$, GES returns the CPDAG of the **true** DAG $\mathsf{G}^*$ with probability
> tending to 1.
>
> The proof uses the **Meek conjecture** (proved in the same paper as Theorem 15) as its key
> structural lemma: the forward phase can always reach an equivalence class that is an
> independence map of the true graph, and the backward phase can then prune to the true class.
^thm-ges-consistency

### Comparison with the PC algorithm

> [!note] GES vs PC: empirical and theoretical trade-offs
>
> - **Finite-sample behavior**: GES is generally more stable than PC because the BIC score
>   smoothly trades off fit vs. complexity; PC's outcome is binary (reject/accept CI test)
>   and sensitive to the choice of $\alpha$.
> - **Computational cost**: GES is $O(d^2)$ evaluations per step (scanning all node pairs)
>   with $O(d^4)$ overall in the worst case; PC is $O(d^{q+2})$ with degree bound $q$,
>   which for very sparse graphs can be faster.
> - **Parallelism**: the forward/backward phase structure makes GES harder to parallelize
>   than the edge-by-edge testing of PC.
> - **Non-Gaussianity**: GES with BIC assumes Gaussianity for its score; PC can use
>   non-parametric CI tests (KCI) and remains valid under non-Gaussianity.
> - **NOTEARS comparison** (from [[NOTEARS Experiments]]): NOTEARS outperforms GES on
>   dense and large graphs; GES (implemented as FGS) outperforms NOTEARS on very sparse
>   graphs (ER-2) in some settings.

## Examples

> [!example] Example: GES Forward Phase on Three Variables
>
> **True DAG**: $X \to Z \leftarrow Y$ (v-structure; BIC score under true graph is highest).
>
> **Step 0**: $\mathcal{C}_0 = \emptyset$ (empty graph). Score = $Q(\emptyset)$.
>
> **Step 1**: Try all Insert$(X_i, X_j, T)$ operators. The highest-scoring insert might be
> $\mathrm{Insert}(X, Z, \emptyset)$: adds $X \to Z$. New score $Q > Q(\emptyset)$ since
> adding $X$ as parent of $Z$ reduces $Z$'s local prediction error. Apply.
>
> **Step 2**: Next highest insert: $\mathrm{Insert}(Y, Z, \emptyset)$: adds $Y \to Z$.
> Score improves further. Apply. Now have $X \to Z \leftarrow Y$.
>
> **Step 3**: Try remaining inserts (e.g. $X - Y$). None improve score.
> End of Phase 1: CPDAG = $X \to Z \leftarrow Y$. (Correct CPDAG!)
>
> **Phase 2**: Try all Deletes. None improve the score. Output: $X \to Z \leftarrow Y$. ✓
^ex-ges-forward

## Connections

- **Markov equivalence**: GES only works because decomposable scores assign the same
  value to equivalent DAGs — searching over CPDAGs rather than DAGs avoids redundant steps.
  See [[Markov Equivalence and CPDAGs]].
- **PC algorithm**: achieves equivalent consistency results via CI tests rather than scores.
  In the large-sample limit, PC and GES return the same CPDAG. See [[PC Algorithm]].
- **NOTEARS**: score-based like GES but optimizes continuously over weight matrices rather
  than searching over CPDAGs. More scalable but does not explicitly use the CPDAG structure.
  See [[NOTEARS - Overview]].
- **FGS** (Fast GES): Ramsey et al. (2016) accelerated GES for large graphs using caching
  and queue-based scoring — this is the "FGS" baseline in [[NOTEARS Experiments]].
- **Implementation**: `ges()` in the `pcalg` R package; `GES()` in `causal-learn` Python.

## See Also
- [[Markov Equivalence and CPDAGs]] — the theoretical foundation (CPDAG, Meek conjecture)
- [[PC Algorithm]] — the constraint-based complement
- [[Conditional Independence Testing]] — CI tests used by PC (not GES)
- [[DAG Structure Learning Problem]] — the general problem and scoring formulation
- [[NOTEARS Experiments]] — empirical benchmarks where GES (FGS) is a baseline
