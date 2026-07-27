---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Structure-Learning-Survey.md]]"
source_location: "Survey §3; Chickering (2002) JMLR 3:507-554"
date_ingested: 2026-07-27
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
  - "FGS"
  - "Fast GES"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based** causal discovery
> algorithm. It searches the space of **CPDAGs** (Markov equivalence classes) using a greedy two-phase
> strategy: a **forward phase** (GES-I) that greedily inserts edges, followed by a **backward phase**
> (GES-II) that greedily deletes edges. Under faithfulness and a consistent decomposable score (BIC),
> GES is **provably optimal**: it finds the CPDAG of the true DAG with probability 1 as $n \to \infty$.
> This is the **Meek Conjecture**, proven by Chickering (2002). FGS (Ramsey et al. 2017) extends GES
> to millions of variables via cached local scores.

## Overview

GES solves the same problem as PC — learning the CPDAG of the true DAG — but by an entirely different
mechanism. Instead of testing conditional independence directly, GES optimizes a **score** $Q(G, \mathbf{X})$
that measures how well a DAG $G$ fits the data $\mathbf{X}$.

The crucial insight of Chickering (2002) is that greedy search in the **space of equivalence classes**
(CPDAGs) is sufficient for global optimality — one need not search over all DAGs individually. Two moves
suffice: inserting an edge (forward phase) and deleting an edge (backward phase). Each move takes the
current CPDAG to an adjacent CPDAG in the space of MECs, increasing the score until no improvement is
possible.

**Why search in MEC space rather than DAG space?** DAG space is far larger than MEC space: many DAGs
belong to the same MEC and have identical scores (under any Markov-consistent score). Searching in MEC
space avoids visiting equivalent DAGs repeatedly and ensures the output is a CPDAG.

**Contrast with PC:** PC uses CI tests (a statistical test per conditioning set) and does not require
a parametric score. GES uses a score (BIC, BDe) and does not require a CI test. GES tends to be more
robust to CI test errors in high dimensions; PC is more interpretable (the edge removals have direct
CI interpretations).

## Main Content

### Decomposable Scores

> [!definition] Definition: Decomposable Score
> A scoring function $Q(G, \mathbf{X})$ is **decomposable** if it factors as:
> $$Q(G, \mathbf{X}) = \sum_{i=1}^d Q_i\!\left(\text{pa}_G(X_i),\; \mathbf{X}\right),$$
> where $Q_i$ depends only on node $X_i$ and its parent set $\text{pa}_G(X_i)$. When an edge is inserted or deleted, only the $Q_i$ for the affected node(s) change — all other terms remain constant.
^def-decomposable-score

Decomposability makes GES efficient: only local recomputations are needed after each graph operation.
Standard decomposable scores include:
- **BIC** (Bayesian Information Criterion): $Q_i = \log p(\mathbf{X}_i \mid \hat{\theta}_i, \mathbf{X}_{\text{pa}(i)}) - \frac{k_i}{2}\log n$, where $k_i$ counts free parameters.
- **BDe / BDeu** (Bayesian Dirichlet score): fully Bayesian score for discrete data; equivalent to BIC asymptotically.
- **BGe** (Bayesian Gaussian equivalent): for continuous Gaussian models.

### BIC Score for Gaussian Linear SEMs

> [!definition] Definition: BIC Score for GES
> For a Gaussian linear SEM with $n$ observations, the local BIC score for node $X_i$ with parent set $\text{pa}(X_i)$ is:
> $$\text{BIC}_i(\text{pa}(X_i)) = -\frac{n}{2}\log\hat{\sigma}_i^2 - \frac{|\text{pa}(X_i)| + 1}{2}\log n,$$
> where $\hat{\sigma}_i^2 = \frac{1}{n}\lVert \mathbf{X}_i - \mathbf{X}_{\text{pa}(i)}\hat{\beta}_i \rVert^2$ is the OLS residual variance.
> The **score gain** from adding a parent $X_j$ to $\text{pa}(X_i)$ is:
> $$\delta_{\text{BIC}} = \frac{n}{2}\log\frac{\hat{\sigma}_{i,\text{old}}^2}{\hat{\sigma}_{i,\text{new}}^2} - \frac{1}{2}\log n.$$
^def-bic-ges

BIC penalizes model complexity, preventing the forward phase from adding spurious edges. As $n \to \infty$,
the penalty $\frac{1}{2}\log n$ grows, making BIC consistent.

**Relationship to NOTEARS score.** The NOTEARS $\ell_1$-penalized LS score ([[DAG Structure Learning Problem#^def-score]]) is related to BIC: $-\frac{1}{2n}\lVert \mathbf{X} - \mathbf{X}W \rVert_F^2$ is the log-likelihood of a Gaussian SEM, and $\lambda\lVert W \rVert_1$ is an $\ell_1$ (Laplace) penalty rather than BIC's model-size penalty. Both target the same linear Gaussian SEM family, but via different regularization strategies.

### The GES Forward Phase: GES-I (Insert)

> [!theorem] Algorithm: GES Forward Phase
> **Initialize:** $C_0 \leftarrow$ empty CPDAG (no edges).
>
> **Repeat:**
> For each pair of non-adjacent nodes $(X, Y)$ in $C$, and each valid **insert operator** $\text{Insert}(X, Y, \mathbf{T})$:
> - $\mathbf{T} \subseteq \text{adj}(C, Y) \setminus \text{adj}(C, X)$ must form a **clique** in $C$
> - The operator: insert edge $X \to Y$; for each $T \in \mathbf{T}$, orient $T - Y$ as $T \to Y$; re-orient $C$ to valid CPDAG
> - Compute score gain $\delta Q = Q(C_\text{new}) - Q(C)$
>
> If $\max \delta Q > 0$: apply the best insert; else **stop** (forward phase complete).
>
> **Output:** CPDAG $C_\text{fwd}$.
^alg-ges-forward

The set $\mathbf{T}$ is the "clique set" — it ensures the insert operation produces a valid CPDAG. Specifically,
inserting $X \to Y$ while orienting $T - Y \to T \to Y$ (for $T \in \mathbf{T}$) is a legal move that preserves
CPDAG validity only when $\mathbf{T}$ is a clique in the graph induced by $\text{adj}(C, Y) \setminus \text{adj}(C, X)$.

**Intuition.** The forward phase is greedy ascent from the empty graph toward the true MEC.  Starting
from no edges, each insertion adds one edge (and possibly orients nearby edges) to increase the score. The
forward phase tends to overshoot (include too many edges) when the sample is finite; the backward phase
corrects this.

### The GES Backward Phase: GES-II (Delete)

> [!theorem] Algorithm: GES Backward Phase
> **Initialize:** $C \leftarrow C_\text{fwd}$ (output of forward phase).
>
> **Repeat:**
> For each edge between adjacent nodes $(X, Y)$ in $C$, and each valid **delete operator** $\text{Delete}(X, Y, \mathbf{H})$:
> - $\mathbf{H} \subseteq \text{adj}(C, X) \cap \text{adj}(C, Y)$ must form a **clique** in $C$, and $\mathbf{H}$ must be a clique in $C$
> - The operator: remove the edge between $X$ and $Y$; for each $H \in \mathbf{H}$, orient $H - Y$ as $H \to Y$; re-orient $C$ to valid CPDAG
> - Compute score gain $\delta Q = Q(C_\text{new}) - Q(C)$
>
> If $\max \delta Q > 0$: apply the best delete; else **stop** (backward phase complete).
>
> **Output:** Final estimated CPDAG $\hat{C}$.
^alg-ges-backward

### Chickering's Main Theorem (The Meek Conjecture)

> [!theorem] Theorem: Consistency of GES (Chickering 2002, Theorem 15+28)
> Assume:
> 1. **Markov condition** and **faithfulness** for the true distribution and DAG $G^*$.
> 2. **Consistent score:** $Q$ is a BIC-type score satisfying consistency — as $n \to \infty$, $Q(G, \mathbf{X}) > Q(G', \mathbf{X})$ whenever $G$ is in the true MEC $[G^*]$ and $G'$ is not.
>
> Then as $n \to \infty$, GES returns $\text{CPDAG}(G^*)$ with probability 1.
>
> **Key lemmas:**
> - *Lemma (Insert soundness):* Every CPDAG produced by GES-I is a valid equivalence class.
> - *Lemma (Forward completeness):* Starting from the empty graph, GES-I can reach the true CPDAG via a sequence of score-increasing insertions. (This is the "Meek Conjecture" half.)
> - *Lemma (Backward completeness):* Starting from any CPDAG above the true MEC in score, GES-II monotonically reaches the true MEC via score-increasing deletions.
^thm-ges-consistency

**Historical note.** The result was conjectured by Meek (1997) and remained open for five years. Chickering
(2002) proved it by characterizing exactly which edge insertions and deletions preserve CPDAG validity and
by showing that covered edge reversals connect any two Markov equivalent DAGs (see [[Markov Equivalence and CPDAGs#^def-covered-edge]]). The proof is one of the deepest results in causal structure learning.

### Complexity

**Forward phase:** At each step, consider all non-adjacent pairs $(X, Y)$ and all valid $\mathbf{T}$ sets.
In the worst case, this is $O(d^2 \cdot 2^d)$. Under bounded degree $\Delta$, it is $O(d^2 \cdot 2^\Delta)$ per step and $O(d \cdot 2^\Delta)$ steps — polynomial for sparse graphs.

**Score evaluation:** Each local BIC score computation is $O(n \cdot k^2)$ where $k = |\text{pa}(X_i)|$.
For sparse graphs, this is fast.

### FGS: Fast Greedy Equivalence Search

Ramsey et al. (2017) introduced **FGS** (Fast GES), which scales GES to millions of variables:

> [!definition] Definition: FGS (Fast GES)
> FGS accelerates GES by:
> 1. **Precomputing all local scores** $\delta Q_i(\text{pa}(X_i))$ for small parent sets at startup.
> 2. **Using a priority queue** of pending edge operations sorted by $\delta Q$, updated only for the affected nodes after each operation (all other entries remain valid due to decomposability).
> 3. This reduces per-step work from $O(d^2)$ to $O(\log d + k^2)$ where $k$ is the number of affected nodes.
^def-fgs

FGS achieves essentially the same accuracy as GES on benchmark datasets while being orders of magnitude
faster for large $d$. It is the benchmark used in [[NOTEARS Experiments]] (labelled "FGS" in Figure 3 and
Table 1 of Zheng et al. 2018).

## Examples

> [!example] Example: GES on a Three-Node DAG
> Suppose the true DAG is $X_1 \to X_2 \to X_3$ with Gaussian linear SEM. The true MEC contains three DAGs (all having $X_1 - X_2 - X_3$ skeleton, no v-structures). The CPDAG is $X_1 - X_2 - X_3$.
>
> *GES-I:*
> - From empty graph: test inserting $X_1 - X_2$, $X_2 - X_3$, $X_1 - X_3$. The BIC score improves most with inserting $X_1 - X_2$ (true edge). Insert.
> - Next: insert $X_2 - X_3$. Insert.
> - Try $X_1 - X_3$: BIC penalizes the extra edge; no improvement. Stop.
> - $C_\text{fwd}$: skeleton $X_1 - X_2 - X_3$, unoriented.
>
> *GES-II:*
> - Try deleting $X_1 - X_2$ or $X_2 - X_3$: BIC decreases. No deletion improves the score.
>
> *Output:* CPDAG $X_1 - X_2 - X_3$ ✓ (correct).
^ex-ges-three-node

> [!example] Example: GES Detects a V-Structure
> True DAG: $X_1 \to X_2 \leftarrow X_3$ (v-structure, $X_1 \not\sim X_3$). MEC contains only this DAG; CPDAG is $X_1 \to X_2 \leftarrow X_3$.
>
> *GES-I:* Inserts $X_1 - X_2$ and $X_2 - X_3$; does not insert $X_1 - X_3$ (no BIC improvement: $X_1 \perp\!\!\!\perp X_3$ in the true model). The clique set logic in GES-I orients the edges $X_1 \to X_2$ and $X_3 \to X_2$ to avoid creating a new undirected pattern at $X_2$ when $X_1$ and $X_3$ are non-adjacent.
>
> *GES-II:* No deletion improves BIC.
>
> *Output:* $X_1 \to X_2 \leftarrow X_3$ ✓ (unique CPDAG for a v-structure).
^ex-ges-vstructure

## Connections

- **NOTEARS experiments use FGS as the main baseline:** [[NOTEARS Experiments]] shows GES/FGS is competitive on sparse graphs but outperformed by NOTEARS on denser graphs and larger $d$. The reason: NOTEARS's continuous optimization avoids the local greedy search trap.
- **PC and GES solve the same problem by different means:** Under identical assumptions (faithfulness, oracle CI / oracle score), both recover the same CPDAG. In finite samples, PC is sensitive to CI test calibration; GES is sensitive to model misspecification in the BIC score.
- **NOTEARS vs. GES:** NOTEARS outputs a **single weighted DAG** (not a CPDAG), parameterized by $W \in \mathbb{R}^{d\times d}$. GES outputs a **CPDAG** (the MEC). NOTEARS's $\ell_1$ penalty breaks MEC symmetry by favoring sparser representatives; GES treats all members of the MEC identically.
- **Score connection to Bayesian inference:** The BIC approximates the log marginal likelihood $\log p(\mathbf{X} \mid G)$ via Laplace approximation. Full Bayesian structure learning (e.g., with MCMC over graph space) uses the exact log marginal likelihood — GES/FGS provides the MAP estimate.
- **Connection to ABM calibration (Gap #25):** [[Method of Simulated Moments]] describes SMM-based ABM calibration. For ABM-generated observational data, applying GES would yield a causal structure over aggregate statistics — see [[Summary Causal DAGs]] (Zeng 2025, §4) which assumes such a DAG is given.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition; Chickering (2002) relies on the covered-edge characterization
- [[PC Algorithm]] — constraint-based alternative; both output CPDAGs under faithfulness
- [[DAG Structure Learning Problem]] — NP-hardness of program (4); GES/FGS is "local / approximate search" in the landscape table
- [[NOTEARS - Overview]] and [[NOTEARS Experiments]] — continuous-optimization alternative; FGS is the benchmark
- [[Causal Discovery/_Index|Causal Discovery Index]]
