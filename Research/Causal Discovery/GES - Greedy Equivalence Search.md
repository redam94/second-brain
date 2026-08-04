---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-structure-learning-survey.md]]"
source_location: "Chickering (2002), §2–5; Hauser & Bühlmann (2012)"
date_ingested: 2026-08-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "FES"
  - "BES"
  - "Chickering 2002"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** algorithm
> for learning CPDAGs from data. It searches directly in the space of Markov equivalence classes
> (represented as CPDAGs) using a **decomposable score** (BIC or BGe). GES has two phases:
> the **Forward Equivalence Search** (FES) adds edge insertions that increase the score, and
> the **Backward Equivalence Search** (BES) removes edge deletions that further increase the score.
> Under the Markov condition, faithfulness, and a consistent decomposable score, GES is
> **guaranteed to return the CPDAG of the true DAG** in the large-sample limit — making it the
> first algorithm with a provable score-optimality guarantee for causal structure learning.
> GES (or its fast variant fGES) routinely outperforms PC in practice on standard benchmarks.

## Overview

Constraint-based methods like the [[PC Algorithm]] search the skeleton space and use CI tests
to prune edges. Score-based methods like GES take a different approach: they directly navigate
the space of **Markov equivalence classes** (CPDAGs) by greedily applying operations that improve
a score. This is analogous to greedy hill-climbing in the space of DAGs, but GES is smarter —
it works in equivalence-class space, where each point represents an entire family of Markov-equivalent
DAGs, and it provably reaches the global optimum (under faithfulness and a consistent score).

### The Meek Conjecture (now Theorem)

The central theoretical contribution of Chickering (2002) is a proof of the **Meek Conjecture**
— a result that had been stated without proof by Meek (1997) and was required to establish the
correctness of GES.

> [!theorem] Theorem: Meek Conjecture / Chickering (2002), Theorem 15
> Let $\mathcal{G}$ and $\mathcal{H}$ be DAGs such that $\mathcal{H}$ is an independence-map
> (I-map) of $\mathcal{G}$ (i.e., every d-separation in $\mathcal{H}$ also holds in $\mathcal{G}$).
> Then there exists a sequence of DAGs $\mathcal{G} = \mathcal{G}_0, \mathcal{G}_1, \ldots,
> \mathcal{G}_t = \mathcal{H}$ such that:
> - Each $\mathcal{G}_{i+1}$ is obtained from $\mathcal{G}_i$ by a **covered edge reversal**
>   (reversing an edge $X \rightarrow Y$ where $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$), or
>   an **edge addition** (adding an edge consistent with acyclicity), and
> - $\mathcal{G}_{i+1}$ is an I-map of $\mathcal{G}_i$ for each $i$.
>
> **Consequence for GES:** This guarantees that the forward phase of GES can always reach the
> equivalence class of $\mathcal{H}$ from any starting DAG by a sequence of score-improving steps.
^thm-meek-conjecture

## Main Content

### Score Requirements

> [!definition] Definition: Decomposable Score
> A score $Q(\mathcal{G}, \mathbf{X})$ is **decomposable** (or **locally consistent**) if it
> factorizes over the nodes of the DAG:
> $$Q(\mathcal{G}, \mathbf{X}) = \sum_{i=1}^d q_i(X_i, \text{pa}_{\mathcal{G}}(X_i), \mathbf{X}),$$
> where $q_i$ depends only on variable $X_i$ and its parent set $\text{pa}_{\mathcal{G}}(X_i)$.
>
> Decomposability enables **local updates**: when an edge is added or removed, only the affected
> node's score term changes, so the full score need not be recomputed from scratch.
^def-decomposable-score

> [!definition] Definition: Consistent Score
> A score $Q$ is **consistent** if, as $n \to \infty$:
> 1. If $\mathcal{G}^*$ is a perfect map of $p$, then $Q(\mathcal{G}^*, \mathbf{X}) > Q(\mathcal{G}, \mathbf{X})$
>    for all $\mathcal{G}$ not in the equivalence class of $\mathcal{G}^*$ (with probability 1).
> 2. The score correctly penalizes extra edges (avoids overfitting).
>
> The **BIC score** satisfies consistency:
> $$Q_{\text{BIC}}(\mathcal{G}, \mathbf{X}) = \log p(\mathbf{X} \mid \hat{\theta}_{\mathcal{G}}, \mathcal{G}) - \frac{\log n}{2} |\mathcal{G}|,$$
> where $|\mathcal{G}|$ is the number of free parameters. For Gaussian data, the BGe score
> (Bayesian Gaussian equivalent) is the standard Bayesian version.
^def-consistent-score

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Edge Insertion
> An **insertion** of edge $X \rightarrow Y$ into CPDAG $\mathcal{C}$ is an operator that:
> 1. Adds the directed edge $X \rightarrow Y$,
> 2. Orients a specific subset $T \subseteq \text{neighbors}(Y) \setminus \text{adj}(X)$ as
>    $T \rightarrow Y$ (to maintain the PDAG validity: no new unshielded colliders except
>    those in $T$),
> 3. Applies Meek rules to complete the PDAG.
>
> An insertion is **valid** if the resulting PDAG is still a CPDAG of some DAG.
^def-insertion

> [!definition] Definition: Forward Equivalence Search (FES)
> **Start:** $\mathcal{C}_0 \leftarrow$ empty graph.
>
> **Repeat:**
> 1. Find the valid insertion $(X \rightarrow Y, T)$ that maximally increases the score:
>    $$\Delta Q = Q(\mathcal{C}^{\text{after}}) - Q(\mathcal{C}^{\text{before}}).$$
> 2. If $\Delta Q > 0$: apply the insertion, update $\mathcal{C}$.
> 3. Else: stop. Return $\mathcal{C}_{\text{FES}}$.
>
> **Guarantee:** Under faithfulness and consistency of $Q$, FES converges to a CPDAG in the
> equivalence class of $\mathcal{G}^*$ (not necessarily $\mathcal{C}(\mathcal{G}^*)$ itself, but
> Markov-equivalent to it). The BES phase then refines it to $\mathcal{C}(\mathcal{G}^*)$.
^def-fes

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Edge Deletion
> A **deletion** of edge $X - Y$ or $X \rightarrow Y$ from CPDAG $\mathcal{C}$ is an operator that:
> 1. Removes the edge between $X$ and $Y$,
> 2. Unorients a specific subset $H \subseteq \text{neighbors}(Y) \cap \text{adj}(X)$ (to maintain
>    PDAG validity),
> 3. Applies Meek rules to complete the PDAG.
^def-deletion

> [!definition] Definition: Backward Equivalence Search (BES)
> **Start:** $\mathcal{C}_{\text{BES}} \leftarrow \mathcal{C}_{\text{FES}}$ (output of FES).
>
> **Repeat:**
> 1. Find the valid deletion that maximally increases the score:
>    $$\Delta Q = Q(\mathcal{C}^{\text{after}}) - Q(\mathcal{C}^{\text{before}}).$$
> 2. If $\Delta Q > 0$: apply the deletion, update $\mathcal{C}$.
> 3. Else: stop. Return $\mathcal{C}_{\text{BES}}$.
>
> **Guarantee (Chickering 2002, Theorem 15 + Corollary 2):** Under faithfulness and consistency of $Q$:
> BES returns the unique CPDAG $\mathcal{C}(\mathcal{G}^*)$ of the true DAG.
^def-bes

### Main Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Corollary 2)
> Let $p(X)$ satisfy the Markov condition and faithfulness for DAG $\mathcal{G}^*$.
> Let $Q$ be a decomposable, consistent score. Then the GES algorithm (FES + BES) returns the
> **CPDAG** $\mathcal{C}(\mathcal{G}^*)$ of the true DAG with probability tending to 1 as $n \to \infty$.
>
> **Key steps:**
> 1. FES starts at empty graph and uses the Meek Conjecture (now Theorem 15) to guarantee that
>    score-improving insertions exist as long as the current CPDAG is not equivalent to $\mathcal{G}^*$.
> 2. FES terminates at a CPDAG in the Markov equivalence class of $\mathcal{G}^*$.
> 3. BES uses score-improving deletions to navigate *within* the equivalence class (removing
>    spurious edges due to finite-sample score estimation) and terminates at $\mathcal{C}(\mathcal{G}^*)$.
^thm-ges-consistency

> [!note] Why two phases?
> The FES phase can overshoot — it may add edges that are not in $\mathcal{G}^*$ because with
> finite samples the score may be slightly higher with an extra edge. BES corrects this by
> greedily removing score-improving deletions. Together, FES builds a supergraph and BES prunes
> it back to the correct CPDAG.

### Score Example: BGe for Gaussian Data

For Gaussian data $X \sim \mathcal{N}(0, \Sigma)$, the **BGe score** (Bayesian Gaussian equivalent)
is the standard choice:

$$Q_{\text{BGe}}(\mathcal{G}, \mathbf{X}) = \log p(\mathbf{X} \mid \mathcal{G}) = \sum_{i=1}^d \log p(\mathbf{X}_i \mid \mathbf{X}_{\text{pa}(i)}, \mathcal{G}),$$

where each term is a closed-form Gaussian marginal likelihood with a conjugate Normal-Wishart prior.
The BGe score is decomposable and consistent. For large $n$, BGe and BIC are asymptotically equivalent.

### Software Implementation

```r
library(pcalg)

# Gaussian data: use BGe score
score <- new("GaussL0penObsScore", X)  # BGe with lambda=0 (BIC-like)

ges_fit <- ges(score)
summary(ges_fit)
plot(ges_fit$essgraph, main = "GES CPDAG")

# Access the result
print(ges_fit$essgraph)  # essential graph (CPDAG)
```

```python
# Python: using the ges package (Gamella 2022)
import ges
import numpy as np

data = np.loadtxt("data.csv", delimiter=",")
cpdag, score = ges.fit_bic(data)
print(cpdag)  # adjacency matrix of CPDAG (0/1/2 for none/tail/head)
```

### Fast GES (fGES)

The **fGES** algorithm (Ramsey et al. 2017) accelerates GES by:
1. Parallelising the search for best insertions/deletions across variables,
2. Pre-caching score computations,
3. Exploiting decomposability to update only affected nodes.

fGES can handle hundreds to thousands of variables where standard GES becomes impractical. It is
the default algorithm in the **TETRAD** software suite (Spirtes, Ramsey & colleagues) and is the
baseline referred to as "FGS" in the [[NOTEARS Experiments]] benchmarks.

## GES vs PC

| Property | GES | PC |
|----------|-----|----|
| **Search space** | CPDAG (equivalence class space) | Skeleton + PDAG |
| **Atomic operation** | Edge insertion / deletion | CI test |
| **Score / test** | Decomposable score (BIC, BGe) | Any CI test |
| **Parametric assumption** | Yes (score requires model) | No (nonparametric test) |
| **Guaranteed optimality** | Yes (under faithfulness + consistent score) | Yes (asymptotically) |
| **Practical accuracy** | Generally higher | Lower (sensitive to CI test errors) |
| **Scaling** | $O(d^2)$ score evaluations per step | Exponential in max degree |
| **Hidden confounders** | Not handled (use FCI equivalent) | Not handled (use FCI) |
| **Standard implementation** | `pcalg::ges`, fGES in TETRAD | `pcalg::pc`, `bnlearn::pc.stable` |

In the [[NOTEARS Experiments]] benchmarks, FGS (fast GES) is the primary competitor. NOTEARS
outperforms FGS on denser graphs (scale-free topology) but FGS remains strong on Erdős-Rényi
random graphs with Gaussian noise, where its score is correctly specified.

## Connections

- **Relates to [[CPDAG and Markov Equivalence]]**: GES navigates the CPDAG space; the Meek
  Conjecture guarantees that the FES phase can reach the correct equivalence class.
- **Contrast with [[PC Algorithm]]**: PC uses CI tests; GES uses scores. GES is better when
  the score model is correct; PC is better when the data structure is far from parametric assumptions.
- **Contrast with [[NOTEARS - Overview]]**: NOTEARS targets a DAG (not a CPDAG) via continuous
  optimization. GES searches in the discrete CPDAG space via greedy operators.
- **Relation to [[DAG Structure Learning Problem]]**: the "local / approximate search" row in the
  methods table ([[DAG Structure Learning Problem#Landscape of prior approaches]]) covers GES;
  NOTEARS replaces the discrete search with a continuous one.

## See Also
- [[CPDAG and Markov Equivalence]] — the mathematical object GES searches in
- [[PC Algorithm]] — the constraint-based alternative; both output CPDAGs
- [[DAG Structure Learning Problem]] — problem setup and methods landscape
- [[NOTEARS - Overview]] — the continuous-optimization successor that GES is benchmarked against
- [[NOTEARS Experiments]] — empirical comparison of NOTEARS vs FGS (fast GES) and PC
- [[Directed Acyclic Graphs]] — foundational DAG theory and causal reasoning
- [[BN Construction Methods Comparison]] — comparison of expert elicitation, constraint-based, and score-based BN construction
