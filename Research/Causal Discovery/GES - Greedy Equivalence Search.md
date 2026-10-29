---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering02b-GES.pdf]]"
source_location: "Chickering (2002), §2–4; Chickering (1996), §3 (NP-hardness)"
date_ingested: 2026-10-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Equivalence Classes and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based structure learning"
  - "FGS"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** algorithm
> for causal structure learning. Rather than searching over individual DAGs (exponential space) or
> pairs of variables (as in [[PC Algorithm]]), GES searches over **Markov equivalence classes**
> represented as CPDAGs. The algorithm has two phases: a **forward phase** that greedily adds
> edges to maximize a decomposable score (BIC, BDeu), and a **backward phase** that greedily
> removes edges. Under the faithfulness assumption and in the large-sample limit, GES is
> **consistent**: it recovers the true CPDAG. The key theorem is the **Meek Conjecture** (now
> proved by Chickering): any CPDAG can be reached from any other by a sequence of covered edge
> reversals and edge additions/removals — this is what makes the greedy search space-complete.

## Overview

The [[PC Algorithm]] tests conditional independence to recover the skeleton of the true DAG,
then orients edges. GES takes a fundamentally different approach: it optimizes a **score
function** — the BIC or Bayesian Dirichlet score — defined over CPDAGs, using greedy operators
that add or remove edges within the equivalence class space.

The key insight is that **decomposable score functions** (those that factor as a sum over
nodes) can be evaluated locally: adding or removing an edge only changes two nodes' parent
sets, so the score difference is computable in $O(1)$ per move. This makes GES much more
efficient than exhaustive search over DAGs, while still being provably complete.

GES was introduced by Chickering (2002) and is implemented in the pcalg R package (as `ges()`)
and the Tetrad software (as FGS — Fast Greedy Search, a more efficient variant). In the
NOTEARS paper ([[NOTEARS Experiments]]), the baseline comparison algorithm is FGS.

## Main Content

### Score Functions

> [!definition] Definition: Decomposable Score (GES)
> A **decomposable score** $s(G, \mathbf{X})$ factors over the nodes of $G$:
> $$s(G, \mathbf{X}) = \sum_{i=1}^{d} s_i\!\left(\mathrm{Pa}_G(X_i), \mathbf{X}\right),$$
> where $\mathrm{Pa}_G(X_i)$ are the parents of $X_i$ in $G$ and $s_i$ is a local score
> depending only on $X_i$ and its parent values.
>
> **BIC score** (for Gaussian linear models):
> $$s_{\mathrm{BIC}}(G, \mathbf{X}) = -n\hat{\sigma}_i^2 - k_i \log n,$$
> where $\hat{\sigma}_i^2$ is the residual variance from regressing $X_i$ on $\mathrm{Pa}(X_i)$
> and $k_i = |\mathrm{Pa}(X_i)| + 1$ is the number of free parameters.
>
> **BDeu score** (Bayesian Dirichlet with equivalent uniform prior; for discrete data):
> $$s_{\mathrm{BDeu}}(G, \mathbf{X}) = \sum_i \log p(\mathbf{x}_i \mid \mathrm{Pa}(X_i), \mathbf{X})$$
> with a Dirichlet prior on the CPTs (see [[Bayesian Networks: Foundational Methodology]]).
^def-decomposable-score

> [!note] Why decomposability matters
> Because the score is a sum of local terms, the **score change** from adding or removing an
> edge $(X_i, X_j)$ only involves recomputing $s_j$ (the child's local score) — not the full
> graph score. This makes each GES operator $O(d)$ to evaluate, enabling efficient search.

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Forward Equivalence Search (Chickering 2002, §3)
> Start with the **empty CPDAG** (no edges).
>
> At each step, find the **Insert operator** $\mathrm{Insert}(X_i, X_j, H)$ — adding a directed
> edge $X_i \to X_j$ into the current CPDAG with orienting set $H \subseteq \mathrm{adj}(X_j)$
> — that **maximally increases** the score. Apply this operator and repeat.
>
> Stop when no Insert operator increases the score.
>
> **Valid Insert operator conditions** (Chickering 2002, Definition 14):
> The operator $\mathrm{Insert}(X_i, X_j, H)$ is valid iff:
> 1. $X_i \not\!\!\!- X_j$ (nodes are currently non-adjacent).
> 2. $H \subseteq \mathrm{adj}(X_j) \setminus \mathrm{adj}(X_i)$ (the orienting set).
> 3. The subgraph induced by $H \cup \{X_i\}$ is a clique.
> 4. Every semi-directed path from $X_j$ to $X_i$ goes through $H$.
^def-forward-ges

> [!note] Semi-directed path
> A **semi-directed path** from $A$ to $B$ is a path following directed edges $\to$ or
> undirected edges $-$, never traversing a directed edge in the reverse direction.

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Backward Equivalence Search (Chickering 2002, §3)
> Starting from the CPDAG returned by Phase 1 (which may be a supergraph of the true CPDAG),
> find the **Delete operator** $\mathrm{Delete}(X_i, X_j, H)$ — removing the edge between
> $X_i$ and $X_j$ with orienting set $H$ — that **maximally increases** the score. Apply
> and repeat.
>
> Stop when no Delete operator increases the score.
^def-backward-ges

The two-phase structure is necessary: the forward phase can add too many edges due to
greedy decisions early in the search. The backward phase corrects these by pruning edges
whose removal improves the score, arriving at a sparser and more accurate CPDAG.

### Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let $P$ be a distribution faithful to a DAG $G^*$. If:
> 1. The score $s$ is a **consistent BIC-type score** (penalized likelihood with
>    $\lambda = o(n)$ and $\lambda / \log n \to \infty$, e.g. $\lambda = \log n$), and
> 2. The distribution $P$ satisfies the **faithfulness assumption**,
>
> then GES **almost surely recovers the true CPDAG** $\mathcal{C}(G^*)$ as $n \to \infty$.
>
> The central result underlying this is the **Meek Conjecture** (proved by Chickering in
> the same paper): any two CPDAGs in the same superstructure can be connected by a sequence
> of Insert and Delete operators, guaranteeing that greedy search can always reach the
> global optimum in the large-sample limit.
^thm-ges-consistency

### Complexity

| Phase | Score evaluations | Practical scaling |
|-------|-----------------|------------------|
| FES (forward) | $O(d^2)$ per greedy step, $O(d^3)$ total | Fast for moderate $d$ (100–500 nodes) |
| BES (backward) | $O(d^2)$ per step | Fast in practice |
| **Total** | $O(d^3)$ in practice | Suitable for hundreds of variables |

GES scales much better than exhaustive score maximization over DAGs (which is NP-hard;
[[DAG Structure Learning Problem]]) and is typically faster than [[PC Algorithm]] for Gaussian
data because it avoids the exponential number of CI tests that PC requires for dense graphs.

### FGS: Scalable GES Variant

**FGS** (Fast Greedy Search; Ramsey 2015) is a parallelised variant of GES implemented in
Tetrad that scales to thousands of variables by caching local score computations and
exploiting sparsity. In [[NOTEARS Experiments]], the comparison baseline is FGS.

## Examples

> [!example] Example: GES in pcalg (Gaussian Linear Models)
> ```R
> library(pcalg)
>
> # Score: BIC for Gaussian linear models
> score <- new("GaussL0penObsScore", data = X)
>
> # Run GES
> ges.fit <- ges(score)
>
> # The CPDAG is in ges.fit$essgraph
> plot(ges.fit$essgraph)
> ```
>
> The `GaussL0penObsScore` uses the $\ell_0$-penalised Gaussian log-likelihood (equivalent
> to BIC). The penalty $\lambda$ defaults to $\log(n)/2$, corresponding to standard BIC.
>
> For interventional data (randomised experiments on subsets of variables), `GIES`
> (Interventional GES; Hauser & Bühlmann 2012) uses the same two-phase structure but
> scores each variable using the subset of observational and interventional data most
> informative for its parent set.

## Connections

- **[[PC Algorithm]]**: GES and PC are theoretically equivalent in the large-sample limit
  (both consistent under faithfulness), but differ in finite samples. GES typically has
  fewer false-positive edges (the score-based stopping criterion is more conservative than
  a fixed $\alpha$ CI test). PC is more flexible: any CI test can be used, including
  kernel methods for non-Gaussian data.
- **[[NOTEARS - Overview]]**: NOTEARS (2018) supersedes GES/FGS as the state-of-the-art
  for large-scale structure learning in dense graphs. [[NOTEARS Experiments]] shows NOTEARS
  matches or beats FGS on FDR and SHD across most simulation settings. GES is still
  preferred when a score decomposition is available and the data are discrete.
- **[[DAG Structure Learning Problem]]**: GES appears in the "Local / approximate search"
  row of the methods landscape table — it is the canonical representative of that category.
- **[[Equivalence Classes and CPDAGs]]**: GES's search space *is* the space of CPDAGs.
  Every GES operator preserves membership in the equivalence class space.
- **Bayesian model averaging over CPDAGs**: MC³ and other Bayesian structure learning
  methods place a prior over CPDAGs and use GES as a proposal step in MCMC.

## See Also
- [[Equivalence Classes and CPDAGs]] — the search space GES operates in
- [[PC Algorithm]] — the constraint-based alternative
- [[NOTEARS - Overview]] / [[NOTEARS Experiments]] — the continuous-optimization alternative
- [[DAG Structure Learning Problem]] — problem formulation, NP-hardness, method landscape
