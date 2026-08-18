---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-ges.bib]]"
source_location: "Chickering (2002), JMLR 3:507–554. Also: Meek (1995); Hauser & Bühlmann (2012) for GES with interventions."
date_ingested: 2026-08-18
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Causal Markov and Faithfulness]]"
used_by:
  - "[[PC Algorithm - Overview]]"
  - "[[NOTEARS Experiments]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES"
  - "BES"
  - "Forward Equivalence Search"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. Rather than searching over individual DAGs, GES
> searches the space of **Markov equivalence classes** (CPDAGs) directly, avoiding redundant
> evaluation of equivalent models. In Phase 1 (FES), it greedily adds edges using an
> **Insert** operator; in Phase 2 (BES), it greedily removes edges using a **Delete** operator.
> Under faithfulness and a locally consistent decomposable score, GES provably recovers the
> true CPDAG in the large-sample limit.

## Overview

The central insight of GES is to **search over the space of equivalence classes** rather than
the exponentially larger space of DAGs. Two key observations enable this:

1. The Markov equivalence class (MEC) space has a graph structure where neighboring MECs
   differ by the addition or removal of a single edge — enabling greedy local moves.
2. A **locally consistent** score increases when a true edge is added and decreases when a
   spurious edge is removed, so greedy ascent reaches the correct MEC.

Chickering (2002) also proves Meek's conjecture ([[Markov Equivalence Classes and CPDAGs]]),
which is the theoretical engine ensuring the forward phase can reach the true CPDAG.

## The Score Function

GES requires a score $Q: \mathcal{G} \to \mathbb{R}$ with two properties:

> [!definition] Definition: Decomposable Score (Chickering 2002, §3.1)
> A score $Q(\mathcal{G})$ is **decomposable** if it factorizes over families:
> $$Q(\mathcal{G}) = \sum_{j=1}^d q(X_j \mid \text{Pa}_{\mathcal{G}}(X_j)),$$
> where each local score $q(X_j \mid \text{Pa})$ depends only on the variable $X_j$
> and its parent set. This property makes score evaluation of single edge changes $O(d)$
> rather than $O(d^2)$.
^def-decomposable-score

> [!definition] Definition: Locally Consistent Score (Chickering 2002, §3.2)
> A decomposable score $Q$ is **locally consistent** with respect to the true distribution
> $\mathbb{P}$ (and true DAG $\mathcal{G}^*$) if, for any two adjacent DAGs differing by
> one edge addition $X \to Y$:
> 1. If $X \notin \text{Pa}_{\mathcal{G}^*}(Y)$ and $X$ is not an ancestor of $Y$ in $\mathcal{G}^*$:
>    $Q(\mathcal{G} + \{X \to Y\}) < Q(\mathcal{G})$ (adding a spurious edge decreases score).
> 2. If $X \in \text{Pa}_{\mathcal{G}^*}(Y)$ and $\text{Pa}_\mathcal{G}(Y) \not\supseteq \text{Pa}_{\mathcal{G}^*}(Y)$:
>    $Q(\mathcal{G} + \{X \to Y\}) > Q(\mathcal{G})$ (adding a true parent increases score).
^def-locally-consistent

> [!note] Standard scores satisfying both properties
> - **BDeu** (Bayesian Dirichlet equivalent uniform): for discrete data with multinomial CPTs.
>   Bayesian score with Dirichlet prior. Satisfies both properties under faithfulness.
> - **BGe** (Bayesian Gaussian equivalent): for continuous Gaussian data. Corresponds to
>   integrating out the SEM coefficients under a normal-inverse-Wishart prior.
> - **BIC** (Bayesian Information Criterion): $\text{BIC} = \ell(\hat\theta; \mathbf{X}) - \frac{k}{2}\log n$,
>   where $k$ counts parameters. Locally consistent and asymptotically equivalent to BGe.

## GES Algorithm

### Phase 1: Forward Equivalence Search (FES)

> [!theorem] Algorithm: Forward Equivalence Search (Chickering 2002, §5)
> **Input:** Data $\mathbf{X}$, decomposable locally consistent score $Q$.
> **Output:** CPDAG $\mathcal{C}_1$ (intermediate — tends to overfit).
>
> 1. Initialize $\mathcal{C}_0 \leftarrow$ empty CPDAG.
> 2. **Repeat** until no Insert operator improves the score:
>    a. For each pair $(X, Y)$ not adjacent in $\mathcal{C}$:
>       - For each valid set $\mathbf{T} \subseteq \text{Ne}_\mathcal{C}(Y) \setminus \text{adj}_\mathcal{C}(X)$:
>         - Compute score gain of $\text{Insert}(X, Y, \mathbf{T})$.
>    b. Apply the Insert operator with the highest score gain (if positive).
> 3. **Output** $\mathcal{C}_1$.
^alg-fes

The **Insert operator** $\text{Insert}(X, Y, \mathbf{T})$ adds the edge $X \to Y$ and orients
$T_i \to Y$ for each $T_i \in \mathbf{T}$ (where $\mathbf{T}$ is a subset of neighbors of
$Y$ not adjacent to $X$). The validity condition ensures the resulting graph remains a CPDAG.

The forward phase starts from the empty graph and greedily climbs the score landscape. The
Meek conjecture guarantees that the true CPDAG is always reachable from the empty graph
via single-edge insertions, so FES can reach the true MEC — but it typically overshoots
(includes spurious edges) in finite samples.

### Phase 2: Backward Equivalence Search (BES)

> [!theorem] Algorithm: Backward Equivalence Search (Chickering 2002, §6)
> **Input:** CPDAG $\mathcal{C}_1$ from FES.
> **Output:** Final CPDAG $\hat{\mathcal{C}}$.
>
> 1. **Repeat** until no Delete operator improves the score:
>    a. For each edge $(X, Y)$ (directed or undirected) in $\mathcal{C}$:
>       - For each valid set $\mathbf{H} \subseteq \text{Ne}_\mathcal{C}(Y) \cap \text{adj}_\mathcal{C}(X)$:
>         - Compute score gain of $\text{Delete}(X, Y, \mathbf{H})$.
>    b. Apply the Delete operator with the highest score gain (if positive).
> 2. **Output** $\hat{\mathcal{C}}$.
^alg-bes

The **Delete operator** $\text{Delete}(X, Y, \mathbf{H})$ removes the edge $(X, Y)$ and
orients $Y \to H_i$ for each $H_i \in \mathbf{H}$. Starting from the slightly overfitted
$\mathcal{C}_1$, BES prunes back to the true MEC.

### Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15 + Corollary 3)
> Let $\mathcal{G}^*$ be the true DAG and $\mathcal{C}^*$ its CPDAG. Assume:
> 1. The distribution $\mathbb{P}$ is faithful to $\mathcal{G}^*$ ([[Causal Markov and Faithfulness]]).
> 2. The score $Q$ is decomposable and locally consistent with $\mathbb{P}$.
>
> Then GES (FES followed by BES) returns $\hat{\mathcal{C}} = \mathcal{C}^*$ exactly
> in the large-sample limit (as $n \to \infty$).
>
> **Key step in proof:** Meek's conjecture (Chickering 2002, Theorem 15) ensures the forward
> phase finds a path through the MEC space from the empty graph to $\mathcal{C}^*$ via
> single-edge insertions with monotonically increasing score. Local consistency ensures each
> such step is taken.
^thm-ges-consistency

### Finite-sample and high-dimensional behavior

In finite samples, GES with BIC is consistent under the same conditions as PC in the Gaussian
case, when $d$ is fixed and $n \to \infty$. For growing $d$, **FGES** (Fast GES, Ramsey et
al. 2017) extends GES with parallel computation and a priority-queue implementation, running
in $O(d^2 q^2)$ time rather than $O(d^4)$ for the naive implementation, enabling scaling
to $d \sim 10^4$ variables.

## Score Gain Formula

> [!definition] Definition: Insert Score Gain (decomposable case)
> For a decomposable score and Insert$(X, Y, \mathbf{T})$:
> $$\Delta Q(\text{Insert}) = q\!\left(Y \mid \text{Pa}_{\mathcal{G}}(Y) \cup \{X\} \cup \mathbf{T}\right) - q\!\left(Y \mid \text{Pa}_{\mathcal{G}}(Y) \cup (\mathbf{T} \setminus \{X\})\right),$$
> where $q(\cdot \mid \cdot)$ is the local score for node $Y$.
> Because of decomposability, only the local score for $Y$ changes — all other terms cancel.
^def-insert-gain

This factorization means each edge operation requires evaluating only **one local score
difference**, making GES much faster than computing $Q(\mathcal{G})$ from scratch.

## Comparison with PC

| Aspect | GES | PC |
|--------|-----|----|
| Operating domain | MEC space (CPDAGs) | Same (via CI tests) |
| Key operation | Score optimization | CI testing |
| Forward phase | Start empty, add edges | Start complete, remove edges |
| Number of tests | No CI tests (score evaluations instead) | $O(d^{q+2})$ CI tests |
| Faithfulness usage | Required for consistency proof | Required for consistency proof |
| Finite-sample robustness | Depends on score accuracy | Depends on CI test calibration |
| Multiple comparisons | Score handles automatically | Multiple CI tests inflate Type I error |
| Missing data | Easier (score on observed likelihood) | Harder (CI tests require complete cases) |
| Software | `pcalg::ges()` (R), `causal-learn` (Python) | `pcalg::pc()` (R), `causal-learn` (Python) |

The **choice between PC and GES** in practice often comes down to data type and sample size.
PC with Fisher's z-test is fast and interpretable for Gaussian data with moderate $d$.
GES with BIC is preferred when the CI test calibration is uncertain or multiple testing
corrections are a concern.

## Extensions

- **FGES** (Ramsey et al. 2017): faster parallel implementation scaling to $d \sim 10^4$. The
  algorithm benchmarked against NOTEARS in [[NOTEARS Experiments]].
- **GES with interventional data** (Hauser & Bühlmann 2012, "Characterization and greedy
  learning of interventional Markov equivalence classes"): extends GES to data with
  known interventions, recovering a finer equivalence class (**I-MEC**).
- **GIES** (Greedy Interventional Equivalence Search): the interventional extension of GES.
- **RGES** (Regularized GES): adds an $\ell_0$ penalty to the BIC score for sparsity control.

## Connections to the Vault

- **Benchmarks**: [[NOTEARS Experiments]] benchmarks NOTEARS against FGS (Fast GES) on
  Erdős-Rényi and scale-free graphs — GES is one of the key baselines.
- **BN application**: [[BN Construction Methods Comparison]] compares structure-learning
  methods for the Bayesian network application in the CUBES project; GES is a natural candidate.
- **ABM structure learning**: [[Summary Causal DAGs]] discusses learning DAG summaries of ABM
  dynamics; GES could be applied to simulation output data.
- **Score-SEM connection**: the BGe score optimized by GES corresponds to integrating out
  the linear SEM coefficients in [[DAG Structure Learning Problem]] under a conjugate prior.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the search space of GES (CPDAGs, MECs, Meek conjecture)
- [[PC Algorithm - Overview]] — the constraint-based complement of GES
- [[DAG Structure Learning Problem]] — score functions, NP-hardness context, landscape of methods
- [[NOTEARS - Overview]] — continuous-optimization contrast that does not search the MEC space
- [[Causal Markov and Faithfulness]] — faithfulness assumption underpinning GES consistency
