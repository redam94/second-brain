---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/1803.01422-NOTEARS.pdf]]"
source_location: "§2.2, §5 (background and experiments); primary: Chickering (2002) JMLR 3:507-554"
date_ingested: 2026-08-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[PC Algorithm]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FGS"
  - "Fast Greedy Search"
  - "Chickering 2002"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Chickering, 2002) is the canonical **score-based** algorithm for causal structure
> learning. Unlike the PC algorithm, which recovers structure via CI testing, GES greedily
> maximizes a **decomposable score** (e.g. BIC) by operating directly in the space of **Markov
> equivalence classes** (CPDAGs). GES runs in two phases: a *forward* phase that adds edges until
> no single addition improves the score, and a *backward* phase that removes edges until no
> removal improves the score. Chickering (2002) proves GES is **consistent** — it recovers the
> true CPDAG in the large-sample limit — by establishing the "Meek conjecture" as a lemma.
> A high-speed variant, **FGS** (Ramsey et al., 2016), scales GES to thousands of variables.

## Overview

Score-based structure learning frames DAG discovery as combinatorial optimization of a
goodness-of-fit score $Q : \mathbb{D} \to \mathbb{R}$ over the space of DAGs:
$$\min_{\mathcal{G} \in \mathbb{D}} Q(\mathcal{G}).$$

This is NP-hard in general (Chickering, 1996). The insight behind GES is to search in
**CPDAG space** (equivalence classes) rather than DAG space. Because the score is
*Markov-equivalent-class-invariant* (any DAG in a class has the same score under a
decomposable score + faithfulness), this change of search space is lossless. The greedy
search can then be implemented as a sequence of **elementary CPDAG operators** — single edge
insertions and deletions in equivalence class space — each of which corresponds to a set of
single-edge operations on individual DAGs.

GES was the state-of-the-art algorithm cited as comparison in NOTEARS (Zheng et al., 2018
§2.2, §5), where it appears both directly and via the FGS variant.

## Main Content

### Score function: BIC and decomposability

> [!definition] Definition: BIC score for DAGs
> The **Bayesian Information Criterion** score for a DAG $\mathcal{G}$ with parent sets
> $\text{Pa}(X_j) = \Pi_j$ is:
> $$Q_{\text{BIC}}(\mathcal{G}) = \sum_{j=1}^d \left[\hat{\ell}_j - \frac{|\Pi_j| + 1}{2}\log n\right]$$
> where $\hat{\ell}_j$ is the maximised log-likelihood of node $X_j$ given its parents, and
> $|\Pi_j|$ is the number of parents (number of parameters in node $j$'s local distribution).
>
> For Gaussian data: $\hat{\ell}_j = -\frac{n}{2}\log\hat{\sigma}^2_{j|\Pi_j}$ where
> $\hat{\sigma}^2_{j|\Pi_j}$ is the residual variance from regressing $X_j$ on $\Pi_j$.
^def-bic-score

> [!definition] Definition: Decomposability
> A score $Q(\mathcal{G})$ is **decomposable** (or **locally consistent**) if it factors as a
> sum of **local scores** — one per node — that depend only on the node and its parents:
> $$Q(\mathcal{G}) = \sum_{j=1}^d q_j(X_j, \Pi_j).$$
>
> Decomposability is the key property enabling GES: adding a single edge changes only the
> local score of the child node, so the score change $\Delta Q$ for any elementary operator
> can be computed in $O(n \cdot |\Pi_j|^2)$ time without re-evaluating the whole graph.
^def-decomposable-score

BIC, BDe (Bayesian Dirichlet equivalent), BGe (Bayesian Gaussian equivalent), and the LS
score used by NOTEARS are all decomposable.

### The two phases of GES

> [!definition] Definition: GES Algorithm (Chickering, 2002)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; decomposable score $Q$.
> **Output**: CPDAG $\hat{\mathcal{C}}$ (estimated Markov equivalence class).
>
> **Phase 1 — Forward Equivalence Search (FES):**
> 1. Start with the empty graph CPDAG $\hat{\mathcal{C}} = \varnothing$.
> 2. Repeat:
>    - For each **valid edge insertion operator** $\mathcal{I}(X_i, X_j, \mathcal{H})$
>      (inserting $X_i \to X_j$ after flipping a subset $\mathcal{H}$ of edges):
>      - Compute the **score gain** $\Delta Q(\mathcal{I})$.
>    - If $\max_{\mathcal{I}} \Delta Q(\mathcal{I}) > 0$: apply the best insertion.
>    - Else: exit loop.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> 1. Start from the CPDAG $\hat{\mathcal{C}}$ at the end of FES.
> 2. Repeat:
>    - For each **valid edge deletion operator** $\mathcal{D}(X_i, X_j, \mathcal{H})$:
>      - Compute $\Delta Q(\mathcal{D})$.
>    - If $\max_{\mathcal{D}} \Delta Q(\mathcal{D}) > 0$: apply the best deletion.
>    - Else: exit loop.
> 3. Output the final CPDAG $\hat{\mathcal{C}}$.
^def-ges-algorithm

### Elementary CPDAG operators

The edge insertion and deletion operators are the technical heart of GES. They are
*defined on CPDAG space* rather than individual DAGs:

**Edge insertion** $\mathcal{I}(X_i, X_j, \mathcal{H})$: Insert $X_i \to X_j$ in some DAG
$\mathcal{G}$ in the current equivalence class, then orient $\mathcal{H}$ (a set of edges
incident to $X_j$) into $X_j$. The resulting DAG is converted to its CPDAG.

**Edge deletion** $\mathcal{D}(X_i, X_j, \mathcal{H})$: Delete an edge $X_i \to X_j$ or
$X_i - X_j$ from some DAG in the class, then re-orient the affected $\mathcal{H}$ edges.

Chickering (2002) provides validity conditions (based on clique structure and v-structure
consistency) ensuring each operator yields a valid CPDAG.

### Consistency: the Meek conjecture

The central theoretical result of Chickering (2002) is the **proof of the Meek conjecture**,
used to establish consistency:

> [!theorem] Theorem: Meek Conjecture (proved in Chickering, 2002, Theorem 15)
> If a DAG $H$ is an **independence map** (I-map) of another DAG $G$ — meaning every
> CI relation in $H$ is also in $G$ — then there exists a finite sequence of **covered edge
> reversals** in $G$ such that:
> 1. After each reversal, $H$ remains an I-map of the modified $G$.
> 2. After all reversals, $G = H$.
>
> A **covered edge** $X_i \to X_j$ is one where $\text{Pa}(X_j) = \text{Pa}(X_i) \cup \{X_i\}$.
^thm-meek-conjecture

> [!theorem] Theorem: Consistency of GES (Chickering, 2002, Theorem 18)
> Under the **causal Markov condition** and **faithfulness**, with a locally consistent score
> (BIC), as $n \to \infty$ the GES algorithm recovers the **true CPDAG** with probability 1.
>
> **Proof sketch**: The Meek conjecture guarantees that FES can always "reach" the true
> equivalence class from any sparser class via a sequence of score-improving insertions.
> BES then removes any spurious edges added by FES. Together, they converge to the true class.
^thm-ges-consistency

This consistency result is what distinguished GES from earlier greedy DAG algorithms (e.g.
hill-climbing), which had no such guarantee.

### FGS: the high-dimensional variant

**FGS** (Fast Greedy Search, Ramsey et al., 2016) scales GES to high-dimensional problems
($d \sim 10^3$-$10^6$) by:
1. **Parallelising** the score evaluations across edges
2. **Restricting the parent set search** using a knowledge graph or FGES (Fast GES) heuristic
3. Using **sparse score caching** to avoid redundant computation

FGS is the variant used as comparison in NOTEARS (Zheng et al., 2018 §5): "For GES, we used
the fast greedy search (FGS) implementation from Ramsey et al. (2016)."

### Score-based vs. constraint-based comparison

| Property | GES | PC Algorithm |
|----------|-----|-------------|
| **Paradigm** | Score-based | Constraint-based (CI testing) |
| **Assumptions** | Faithfulness + Markov + decomposable score | Faithfulness + Markov + correct CI tests |
| **Output** | CPDAG | CPDAG |
| **Phase structure** | Forward (add) + Backward (remove) | Skeleton → V-structures → Meek |
| **Dense graph performance** | Generally better (score is global) | Degrades (exponential CI tests) |
| **Consistency** | Proved (Chickering 2002) | Proved (Spirtes et al. 2000, Kalisch & Bühlmann 2007) |
| **NOTEARS comparison** | "FGS is very competitive when edges are small (ER-2), but rapidly deteriorates for even modest numbers of edges (SF-4)" (Zheng et al. 2018) | "Significantly lower accuracy than FGS or NOTEARS" (Zheng et al. 2018) |

## Examples

> [!example] Example: GES Forward Phase on a 3-node graph
> **True graph**: $X_1 \to X_2 \leftarrow X_3$ (v-structure; equivalence class is a singleton).
>
> **Start**: $\hat{\mathcal{C}} = \varnothing$.
>
> **FES Step 1**: Try all edge insertions. The BIC score gain is positive for inserting edges
> incident to the v-structure. Suppose inserting $X_1 - X_2$ gives the highest gain; after
> applying, CPDAG has $X_1 - X_2$.
>
> **FES Step 2**: Add $X_3 - X_2$. CPDAG has $X_1 - X_2 - X_3$.
>
> **FES Step 3**: Test inserting $X_1 - X_3$. No score gain (the chain $X_1 - X_2 - X_3$
> already blocks this path). FES terminates.
>
> **BES**: Try deleting edges. No deletion improves the score.
>
> **v-structure orientation**: BIC penalises the equivalent class that has no v-structure
> (chain) versus the one with a v-structure. Since $X_2$ has two parents in the true graph,
> the v-structure class scores higher; BES should have oriented $X_1 \to X_2 \leftarrow X_3$.
>
> *Note*: The precise orientation logic is handled by the CPDAG operator validity conditions
> in Chickering (2002); the above is a simplified illustration.

## Connections

- [[Markov Equivalence and CPDAGs]] — GES operates in CPDAG space; every operator maps one
  CPDAG to another
- [[PC Algorithm]] — the constraint-based alternative; both target CPDAGs but differ in
  mechanism
- [[NOTEARS - Overview]] — NOTEARS shows that continuous optimization can outperform GES/FGS
  on dense graphs
- [[DAG Structure Learning Problem]] — GES solves the score-based formulation (Program 4)
- [[BN Construction Methods Comparison]] — broader survey of Bayesian network structure
  elicitation approaches in the vault

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, Meek conjecture, Meek rules
- [[PC Algorithm]] — constraint-based complement
- [[DAG Structure Learning Problem]] — the problem landscape
- [[NOTEARS Experiments]] — empirical comparison including GES/FGS
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-driven alternative
