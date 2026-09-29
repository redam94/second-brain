---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/chickering02b-GES-SOURCE.txt]]"
source_location: "Chickering (2002) §3–7; Chickering (2002a) §5"
date_ingested: 2026-09-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Algorithms - Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
  - "FES BES"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering 2002) is the canonical **score-based** causal structure learning algorithm.
> Rather than searching over individual DAGs, GES searches over **Markov equivalence classes**
> represented as CPDAGs, using a scoring function (typically BIC or BDe) to measure fit.
> GES proceeds in two phases: a **Forward Equivalence Search (FES)** that greedily adds edges,
> and a **Backward Equivalence Search (BES)** that greedily removes them. Chickering proved the
> **Meek Conjecture** — that any two equivalence classes differ by a sequence of single-edge
> operators — and used it to guarantee that GES is **consistent**: it recovers the true CPDAG
> as $n \to \infty$ under faithfulness and causal sufficiency.

## Overview

Score-based methods for structure learning optimize a scoring function $Q(\mathcal{G})$ over
graphs. The fundamental challenge is that the DAG space $\mathbb{D}$ is discrete and grows
superexponentially — see [[DAG Structure Learning Problem#^thm-program4]]. GES's key
innovation is **operating in equivalence-class space** (CPDAGs) rather than DAG space.
Because each equivalence class has a unique CPDAG representation, the search space is
dramatically smaller: the number of distinct CPDAGs is much smaller than the number of DAGs.
Moreover, neighboring equivalence classes differ by single **turning operators** (Insert/Delete
edges), enabling greedy local search with known optimality properties.

## Main Content

### Scoring functions

> [!definition] Definition: BIC Score for Structure Learning
> The **Bayesian Information Criterion (BIC)** score for a DAG $\mathcal{G}$ given data
> $\mathbf{X}$ with $n$ observations is:
>
> $$Q_{\text{BIC}}(\mathcal{G}) = \log p(\mathbf{X} \mid \hat{\theta}_\mathcal{G}, \mathcal{G}) - \frac{\dim(\mathcal{G})}{2} \log n$$
>
> where $\hat{\theta}_\mathcal{G}$ is the MLE under $\mathcal{G}$ and $\dim(\mathcal{G})$ counts
> free parameters. For linear-Gaussian SEMs:
>
> $$Q_{\text{BIC}}(\mathcal{G}) = -\frac{n}{2} \sum_{j=1}^d \log \hat{\sigma}_j^2(\mathcal{G}) - \frac{|\mathcal{E}|}{2} \log n$$
>
> where $\hat{\sigma}_j^2$ is the residual variance of $X_j$ regressed on its parents in $\mathcal{G}$.
>
> **Decomposability**: BIC (and BDe) decompose as $Q(\mathcal{G}) = \sum_{j=1}^d Q_j(X_j, \text{Pa}(X_j))$,
> meaning score improvements from adding/removing an edge are local and cheap to compute.
^def-bic-score

> [!definition] Definition: BDe Score (Discrete Data)
> The **Bayesian Dirichlet equivalent (BDe)** score is a closed-form marginal likelihood for
> discrete DAGs with Dirichlet priors on CPTs. It is:
> - **Score-equivalent**: all Markov-equivalent DAGs receive the same BDe score.
> - **Locally consistent**: if $\mathcal{G}^*$ is the true DAG, BDe assigns higher score to
>   $\mathcal{G}^*$ than to any non-I-map of $\mathcal{G}^*$ in the large-sample limit.
^def-bde-score

Score equivalence means GES can unambiguously work in CPDAG space: the score of an
equivalence class is the common score of all its member DAGs.

### The Meek Conjecture (proved by Chickering)

The correctness of GES hinges on a deep graph-theoretic result.

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> For any two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ such that $\mathcal{G}_1$ is an
> **I-map** of $\mathcal{G}_2$ (i.e., $\mathcal{G}_2$'s independence model is a subset of
> $\mathcal{G}_1$'s), there exists a sequence of **covered edge reversals** from $\mathcal{G}_1$
> to $\mathcal{G}_2$ such that each intermediate DAG is also an I-map of $\mathcal{G}_2$.
>
> A **covered edge** $X_i \to X_j$ is one where $\text{Pa}(X_j) = \text{Pa}(X_i) \cup \{X_i\}$
> (reversing it doesn't change the score because both DAGs have the same parents for $X_j$,
> only $X_i$ has an extra parent).
>
> **Consequence**: any two distinct equivalence classes can be connected by a sequence of
> single **Insert** or **Delete** edge operators that monotonically improve the BIC score
> (under a consistent scoring function). This guarantees GES cannot get stuck in a local
> optimum that is surrounded by only worsening moves.
^thm-meek-conjecture

### Phase 1: Forward Equivalence Search (FES)

> [!theorem] Algorithm: Forward Equivalence Search (FES)
> **Start**: empty CPDAG $\mathcal{C} = \emptyset$ (no edges).
>
> **Repeat** until no score-improving Insert is possible:
>   For each non-adjacent pair $(i, j)$ and each valid **Insert($i, j, \mathbf{H}$)** operator:
>     Compute score gain $\Delta Q = Q(\text{Insert}(i,j,\mathbf{H})) - Q(\mathcal{C})$.
>   Apply the Insert with largest positive $\Delta Q$.
>
> **Insert($X_i, X_j, \mathbf{H}$)** operator: adds the directed edge $X_i \to X_j$ to $\mathcal{C}$,
> where $\mathbf{H} \subseteq \text{NE}(X_j) \setminus \text{Adj}(X_i)$ (subset of neighbors of
> $X_j$ not adjacent to $X_i$); the operator re-orients edges in $\mathbf{H}$ to become parents
> of $X_j$.
>
> **Validity**: an Insert is valid if it produces a legal CPDAG (i.e., a PDAG that is
> consistent with at least one DAG). Validity can be checked efficiently.
>
> **FES result**: a local maximum in CPDAG space — an I-map of $\mathcal{G}^*$ under faithfulness
> and correct scoring.
^alg-fes

**Why start from the empty graph?** The empty graph is a conservative DAG (it has no edges,
hence all variables are independent). FES builds up from independence, adding edges only
where the score improvement justifies it.

### Phase 2: Backward Equivalence Search (BES)

> [!theorem] Algorithm: Backward Equivalence Search (BES)
> **Start**: CPDAG produced by FES.
>
> **Repeat** until no score-improving Delete is possible:
>   For each adjacent pair $(i, j)$ and each valid **Delete($i, j, \mathbf{H}$)** operator:
>     Compute score gain $\Delta Q = Q(\text{Delete}(i,j,\mathbf{H})) - Q(\mathcal{C})$.
>   Apply the Delete with largest positive $\Delta Q$.
>
> **Delete($X_i, X_j, \mathbf{H}$)** operator: removes the edge between $X_i$ and $X_j$,
> where $\mathbf{H} \subseteq \text{NE}(X_j) \cap \text{Adj}(X_i)$ specifies edges to
> re-orient after deletion.
>
> **BES result**: a CPDAG that is both a **local maximum of BIC** in FES *and* BES.
^alg-bes

**Why run BES?** FES may overshoot — it adds all edges that improve the score, including some
that are "unnecessary" given the structure of neighbors. BES prunes back edges whose deletion
also improves the score. Together FES + BES find a locally optimal CPDAG.

### Consistency guarantee

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 17)
> Under:
> 1. Faithfulness,
> 2. Causal sufficiency (no latent confounders),
> 3. A **locally consistent** scoring function (e.g., BIC, BDe), and
> 4. Large-sample limit ($n \to \infty$),
>
> GES returns the **correct CPDAG** of the data-generating distribution.
>
> **Proof sketch**: FES terminates at the true CPDAG (an I-map that scores highest);
> BES does not remove any true edge. The Meek Conjecture guarantees no local optimum trap.
^thm-ges-consistency

## Connections

- **PC vs. GES**: PC uses CI tests (assumption-free); GES uses a parametric score (BIC/BDe).
  In the linear-Gaussian case both are consistent; GES tends to outperform PC in practice
  with moderate $n$. See [[Causal Discovery Algorithms - Comparison]].
- **NOTEARS**: NOTEARS optimizes a continuous relaxation of a score function over all
  $\mathbb{R}^{d\times d}$ rather than over CPDAGs — a global optimization vs. GES's local
  equivalence-class search. [[NOTEARS - Overview]] benchmarks NOTEARS against GES.
- **FGS (Fast GES)**: Ramsey et al. (2017) "A million variables and more: the Fast Greedy
  Equivalence Search algorithm" — parallelized GES for high-dimensional data.
- **RGES, AGES, ARGES**: extensions that handle interventional data or hidden variables.
- **Software**: `GES()` in pcalg (R), `GES` in causal-learn (Python), Tetrad (Java).

## See Also
- [[Markov Equivalence and CPDAGs]] — the search space of GES
- [[DAG Structure Learning Problem]] — score formulation and prior methods
- [[PC Algorithm]] — constraint-based alternative
- [[Causal Discovery Algorithms - Comparison]] — structured comparison of all three approaches
- [[NOTEARS - Overview]] — where GES fits among prior methods (used as baseline)
- [[NOTEARS Experiments]] — empirical comparison of GES vs. NOTEARS
