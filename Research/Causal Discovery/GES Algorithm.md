---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/causal-structure-learning-sources.md]]"
source_location: "Chickering (2002) JMLR 3:507-554; Chickering (1995) UAI (Meek conjecture)"
date_ingested: 2026-10-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
  - "score-based structure learning"
---

# GES Algorithm

> [!summary]
> **GES (Greedy Equivalence Search)** is the canonical **score-based** structure
> learning algorithm (Chickering, 2002). Instead of testing conditional independences,
> GES greedily searches the **space of CPDAGs** — Markov equivalence classes — using
> a **decomposable score** (typically BIC). It operates in two phases: a **forward phase**
> that adds edges until no score-improving addition exists, followed by a **backward phase**
> that removes edges until no improvement remains. Chickering proved that GES is
> **consistent** (recovers the true CPDAG in the large-sample limit) under faithfulness
> and assuming the score is consistent. GES is the score-based baseline that [[NOTEARS Experiments]]
> benchmarks NOTEARS against as "FGS" (the fast GPU-based GES implementation).

## Overview

### Why search over CPDAGs rather than DAGs?

Two Markov-equivalent DAGs have the **same** marginal likelihood (and hence the same
BIC score, since BIC approximates the log-marginal). Searching over individual DAGs
therefore wastes computation revisiting equivalent models. GES exploits this:

- The search space is **CPDAGs** (one representative per equivalence class).
- The score function is **constant** across equivalence classes — evaluating BIC on any DAG
  in the class gives the same value.
- **Local operators** on CPDAGs (edge additions and deletions) are well-defined and
  correspond to moves between adjacent equivalence classes.

The Chickering (2002) paper's central technical contribution is:

1. Defining efficient **CPDAG-space operators** and their score increments.
2. Proving the **Meek conjecture** (a key lemma enabling the correctness of the search).
3. Establishing **consistency** of two-phase greedy search in the large-sample limit.

## Main Content

### Decomposable scores

A score $Q(\mathcal{G})$ is **locally decomposable** if it factors over the nodes:
$$Q(\mathcal{G}) = \sum_{i=1}^{d} q_i\bigl(\mathbf{X}_i, \mathbf{X}_{\text{pa}_{\mathcal{G}}(i)}\bigr),$$
where $q_i$ depends only on node $i$ and its parents. This enables **local score updates**:
adding or removing an edge changes only the terms for the affected nodes.

> [!definition] BIC Score (Bayesian Information Criterion, discrete case)
> For a DAG $\mathcal{G}$ with $d$ discrete variables over $n$ observations:
> $$\text{BIC}(\mathcal{G}) = \log P(\mathbf{X} \mid \hat{\theta}_\mathcal{G}, \mathcal{G}) - \frac{\dim(\mathcal{G})}{2}\log n,$$
> where $\hat{\theta}_\mathcal{G}$ is the MLE under $\mathcal{G}$ and $\dim(\mathcal{G})$ is the
> number of free parameters. BIC is **consistent**: it selects the true model with
> probability $\to 1$ as $n \to \infty$ (under faithfulness and model identifiability).
>
> For Gaussian $\mathcal{G}$, the log-likelihood is $-\frac{n}{2}\log|\hat{\Sigma}|$, and
> $\dim(\mathcal{G}) = d + |\mathcal{E}|$ (one residual variance + one regression coefficient per edge).
^def-bic-score

> [!note] BIC vs. BGe/BDe
> BIC is an asymptotic approximation to the **BGe** score (Bayesian Gaussian equivalent)
> or **BDe** score (Bayesian Dirichlet equivalent). The exact Bayesian scores require
> priors over parameters but have better finite-sample behaviour. GES is valid with any
> consistent decomposable score.

### The Meek conjecture (Chickering, 2002)

The correctness of GES's two-phase greedy strategy rests on a key structural lemma:

> [!theorem] Theorem: Meek Conjecture (Chickering, 2002, Thm. 15)
> Let $\mathcal{G}$ and $\mathcal{H}$ be DAGs on the same node set, with $\mathcal{H}$ being
> an **independence map** of $\mathcal{G}$ (every d-separation in $\mathcal{H}$ holds in $\mathcal{G}$,
> i.e., $\mathcal{G}$ is "more independent" than $\mathcal{H}$). Then there exists a finite
> sequence of **covered edge reversals** in $\mathcal{G}$ (reversing an edge $X \to Y$ such that
> $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$) and **edge additions** transforming $\mathcal{G}$
> into $\mathcal{H}$, such that $\mathcal{H}$ remains an independence map of the intermediate
> DAG at each step.
^thm-meek-conjecture

> [!note] Why the Meek conjecture matters for GES
> Phase 1 of GES (forward phase) adds edges. The Meek conjecture guarantees that if the
> true DAG $\mathcal{G}^*$ is in the forward phase's "reach" from the empty graph, there
> is a monotone greedy path (each step improving the score) from the empty CPDAG to the
> CPDAG of $\mathcal{G}^*$. Without this theorem, greedy search might get stuck before
> reaching the truth.

### Phase 1: Forward phase (Insert operators)

> [!definition] Algorithm: GES Phase 1 — Forward Phase
> **Initialize**: Start from the empty CPDAG $\hat{\mathcal{G}}_0 = \varnothing$.
>
> **Repeat**:
> - Compute the **score change** $\Delta Q(X, Y, \mathbf{H})$ for all valid **Insert** operators
>   $(X, Y, \mathbf{H})$: adding edge $X \to Y$ with $\mathbf{H} \subseteq \text{Ne}(Y)$ (neighbours
>   of $Y$ that become parents) and updating the CPDAG accordingly.
> - **If** any $\Delta Q > 0$: apply the highest-scoring Insert operator, update the CPDAG.
> - **Else**: stop.
>
> **Output**: CPDAG $\hat{\mathcal{G}}_1$ at the end of Phase 1.
^algo-ges-forward

> [!note] "H" in the Insert operator
> An Insert$(X, Y, \mathbf{H})$ operation adds the edge $X \to Y$ and also orients all
> edges between $Y$ and nodes in $\mathbf{H}$ to point into $Y$. This ensures the result
> remains a valid CPDAG. The set $\mathbf{H}$ is required to be a **clique** in the current
> CPDAG (neighbours of $Y$ not yet parents), chosen optimally.

> [!note] Score change factorization
> Because the score is decomposable, the score increment from Insert$(X, Y, \mathbf{H})$ is:
> $$\Delta Q = q_Y\bigl(\text{pa}(Y) \cup \{X\} \cup \mathbf{H}\bigr) - q_Y\bigl(\text{pa}(Y)\bigr) + \sum_{Z \in \mathbf{H}} \bigl[q_Z(\text{pa}(Z) \setminus \{Y\}) - q_Z(\text{pa}(Z))\bigr].$$
> This only involves **local** recomputations around $Y$ and nodes in $\mathbf{H}$.

### Phase 2: Backward phase (Delete operators)

> [!definition] Algorithm: GES Phase 2 — Backward Phase
> **Initialize**: Start from $\hat{\mathcal{G}}_1$ (output of Phase 1).
>
> **Repeat**:
> - Compute $\Delta Q(X, Y, \mathbf{H})$ for all valid **Delete** operators: removing an edge
>   between $X$ and $Y$ (directed or undirected) while updating the CPDAG.
> - **If** any $\Delta Q > 0$: apply the highest-scoring Delete operator, update the CPDAG.
> - **Else**: stop.
>
> **Output**: final CPDAG $\hat{\mathcal{G}}$.
^algo-ges-backward

> [!note] Why a backward phase is necessary
> In finite samples, the forward phase may **overshoot** (add more edges than the true graph
> has), because statistical noise can make spurious edges appear to improve the score.
> The backward phase removes such spurious edges. The two-phase structure ensures that
> the algorithm does not simply stop at the first local optimum encountered by forward search.

### Consistency theorem

> [!theorem] Theorem: Consistency of GES (Chickering, 2002, Thm. 26)
> Let $\mathcal{G}^*$ be the true DAG, faithful to distribution $\mathbb{P}$.
> Suppose the score $Q_n$ is **consistent** — i.e., for large $n$:
> - $Q_n(\mathcal{G}) > Q_n(\mathcal{H})$ whenever $\mathcal{H}$ is a strict subset of
>   $\text{I-map}(\mathcal{G})$ (fewer independences),
> - and $Q_n(\mathcal{G}) > Q_n(\mathcal{H})$ whenever $\mathcal{H}$ has the wrong
>   MEC (BIC and BGe/BDe satisfy this).
>
> Then GES recovers the true CPDAG $\mathcal{G}^*_\text{CPDAG}$ with probability $\to 1$ as
> $n \to \infty$.
^thm-ges-consistency

### Practical complexity

> [!note] Complexity of GES
> The naive implementation has complexity $O(d^5)$ per iteration (iterating over all
> edge-pairs and possible $\mathbf{H}$ sets). The **FGS** (Fast GES; Ramsey et al., 2017)
> implementation achieves near-linear time in sparse graphs through:
> - Lazy evaluation of score increments (only recompute affected nodes).
> - Caching and incremental updates to the CPDAG data structure.
>
> FGS is the implementation that [[NOTEARS Experiments]] uses as the "GES" baseline.

### Score-based vs. CI-test comparison

| Property | GES (score-based) | PC (constraint-based) |
|---|---|---|
| Primary primitive | Score function (BIC) | CI test (Fisher z, KCI) |
| Multiple testing | Implicit in score | Explicit (multiple tests) |
| Output | CPDAG | CPDAG |
| Assumptions | Faithfulness + consistent score | Faithfulness + CI test consistency |
| Complexity | $O(d^5)$ naive; $O(d^{q+2})$ FGS | $O(d^{q+2})$ |
| High-dimensional | Requires consistency of BIC | Kalisch & Bühlmann 2007 guarantees |
| Non-Gaussian | BGe score; linear SEM assumption | Kernel CI tests |
| Overfitting bias | Mitigated by backward phase | Controlled by $\alpha$ level |

## Connections

- **NOTEARS vs. GES**: NOTEARS exploits a **linear SEM** structure to convert DAG
  learning to continuous optimization; GES makes no linearity assumption and searches
  over CPDAGs. The [[NOTEARS Experiments]] note reports NOTEARS beating FGS (GES) on
  dense/large graphs; for sparse graphs, FGS is competitive.
- **Bayesian structure learning**: GES with a BGe prior is closely related to MCMC over
  DAG posteriors — both use the same Bayesian score. GES gives a point estimate (MAP);
  MCMC gives a posterior. See [[DAG Structure Learning Problem]] for the Bayesian perspective.
- **FGES / Ramsey (2017)**: the "FGS" baseline in NOTEARS benchmarks is the fast-GES
  implementation from the TETRAD project (Carnegie Mellon), which scales to thousands of nodes.
- **PC + GES hybrid (MMHC)**: the Max-Min Hill-Climbing (MMHC) algorithm uses PC's CI tests
  to restrict the skeleton search, then GES-style score improvements — a hybrid.

## See Also
- [[Markov Equivalence and CPDAGs]] — defines CPDAGs, v-structures, and the Meek rules
- [[PC Algorithm]] — constraint-based alternative; same CPDAG target
- [[Conditional Independence Tests for Causal Discovery]] — CI tests used by PC
- [[DAG Structure Learning Problem]] — problem setup; GES is in the "local/approximate search" row
- [[NOTEARS Experiments]] — benchmarks PC and FGS (GES) against NOTEARS
