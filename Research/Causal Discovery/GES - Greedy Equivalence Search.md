---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-Synthesis-Survey.md]]"
source_location: "Part III, §3.1–3.6"
date_ingested: 2026-07-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by: []
aliases:
  - "Greedy Equivalence Search"
  - "GES algorithm"
  - "Chickering 2002"
  - "FGES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering, 2002) is a **score-based** causal
> discovery algorithm that searches directly over the space of
> [[Markov Equivalence and CPDAGs|Markov equivalence classes]] (CPDAGs) using a
> decomposable score (BIC or BDe). Two greedy phases — **forward search** (add edges)
> and **backward search** (remove edges) — provably converge to the true CPDAG under
> the faithfulness assumption. GES avoids the multiple-testing problem of the
> [[PC Algorithm - Overview|PC algorithm]] and has a clean global consistency guarantee
> via the **Meek Conjecture** (proved in Chickering 2002 as Theorem 2).

## Overview

The key insight of GES is that by searching over **Markov equivalence classes** rather
than individual DAGs, one avoids the combinatorial explosion of the DAG space while
retaining theoretical guarantees. In the CPDAG space, the Insert and Delete operators
(defined by Chickering) map between adjacent equivalence classes — each move is a
single-edge change that can be evaluated by comparing local BIC/BDe scores.

GES bridges the gap between score-based Bayesian network learning and identifiability:
the score is defined over DAGs, but the search proceeds over equivalence classes so the
result is the correct identifiable object.

## Main Content

### Decomposable Scores

> [!definition] Definition: Decomposable Score
> A score $S(G, \mathcal{D})$ is **decomposable** if it factors over nodes:
> $$S(G, \mathcal{D}) = \sum_{i=1}^d s(X_i, \mathrm{Pa}_G(X_i), \mathcal{D})$$
> Each local term $s(X_i, \mathrm{Pa}_i, \mathcal{D})$ depends only on node $i$ and its
> parents in $G$. Decomposability enables efficient updates: when a single edge changes,
> only two local terms change.
^def-decomposable-score

**BIC (Bayesian Information Criterion):**
$$s_{\mathrm{BIC}}(X_i, \mathrm{Pa}_i, \mathcal{D}) = \hat{\ell}(X_i \mid \mathrm{Pa}_i; \hat{\theta}) - \frac{k_i}{2} \log n$$
where $\hat{\ell}$ is the maximum log-likelihood and $k_i$ is the dimension of the local
parameter space (number of free parameters for $X_i \mid \mathrm{Pa}_i$).

**BDe (Bayesian Dirichlet score):**
The log marginal likelihood under a Dirichlet conjugate prior for discrete variables.
BDe has the property that **Markov equivalent DAGs receive the same score** (score
equivalence), making it the natural choice for CPDAG search.

> [!theorem] Theorem: Score Equivalence (Chickering, 2002, Theorem 5)
> Under a Dirichlet prior, the BDe score satisfies **score equivalence**: Markov
> equivalent DAGs receive the same score. Hence the BDe score is well-defined over
> Markov equivalence classes, and GES's greedy moves in CPDAG space are consistent
> with optimising a single score over the entire search space.
^thm-score-equiv

### The Insert and Delete Operators

GES searches CPDAG space using two operators that correspond to single-edge changes.

> [!definition] Definition: Insert Operator (Chickering, 2002, §3.2)
> $\operatorname{Insert}(X, Y, \mathbf{T})$ adds a directed edge $X \to Y$ to the current
> CPDAG $\mathcal{C}$ and reorients a set $\mathbf{T} \subseteq \mathrm{Ne}(Y) \setminus \mathrm{Adj}(X)$
> (neighbours of $Y$ not adjacent to $X$) from $T - Y$ to $T \to Y$. The result is then
> completed via Meek rules to a new CPDAG $\mathcal{C}'$.
>
> The operator is **valid** iff:
> 1. $X$ and $Y$ are not adjacent in $\mathcal{C}$.
> 2. $\mathbf{T}$ is a **clique** in $\mathcal{C}$ (all pairs in $\mathbf{T}$ are adjacent).
> 3. $\mathbf{T}$ **separates** $X$ from $\mathrm{Ne}(Y) \setminus \mathbf{T}$ in the
>    undirected subgraph of $\mathcal{C}$.
^def-insert

> [!definition] Definition: Delete Operator (Chickering, 2002, §3.3)
> $\operatorname{Delete}(X, Y, \mathbf{H})$ removes an edge between $X$ and $Y$ and
> reorients edges in $\mathbf{H} \subseteq \mathrm{Ne}(Y) \cap \mathrm{Adj}(X)$ from
> $H - Y$ to $H \to Y$. The result is completed via Meek rules.
>
> The operator is **valid** iff $\mathbf{H}$ is a clique and separates
> $\mathrm{Ne}(Y) \setminus \mathbf{H}$ from $X$.
^def-delete

### The GES Algorithm

> [!definition] Definition: GES Algorithm (Chickering, 2002, Algorithm 1)
> **Input:** Data $\mathcal{D}$, decomposable score $S$.
>
> **Phase 1 — Forward Equivalence Search (FES):**
> - $\mathcal{C}_0 \leftarrow$ empty CPDAG.
> - **Repeat:** Find the valid Insert operator $\operatorname{Insert}(X, Y, \mathbf{T})$
>   maximising $\Delta S = S(\mathcal{C}') - S(\mathcal{C})$.
> - **If** $\Delta S > 0$: apply the operator, $\mathcal{C} \leftarrow \mathcal{C}'$.
> - **Else:** terminate Phase 1.
>
> **Phase 2 — Backward Equivalence Search (BES):**
> - $\mathcal{C} \leftarrow \mathcal{C}_{\mathrm{FES}}$.
> - **Repeat:** Find the valid Delete operator $\operatorname{Delete}(X, Y, \mathbf{H})$
>   maximising $\Delta S = S(\mathcal{C}') - S(\mathcal{C})$.
> - **If** $\Delta S > 0$: apply the operator, $\mathcal{C} \leftarrow \mathcal{C}'$.
> - **Else:** terminate Phase 2.
>
> **Output:** Final CPDAG $\mathcal{C}_{\mathrm{GES}}$.
^def-ges-algorithm

**Why two phases?** The FES phase can overshoot — adding edges that are not in the true
graph when sample size is finite. The BES phase corrects these spurious edges by removing
them. The two-phase structure is essential for the consistency proof.

### The Meek Conjecture and Consistency

The theoretical heart of GES is the **Meek Conjecture**, proved by Chickering as the key
lemma for consistency.

> [!theorem] Theorem: Meek Conjecture (Chickering, 2002, Theorem 2)
> Let $G$ and $H$ be DAGs such that $H$ is an **independence map (I-map)** of $G$ —
> i.e., every d-separation in $H$ holds in $G$.
>
> Then there exists a finite sequence of **covered edge reversals** in $G$, each
> producing an I-map of $G$, terminating at a DAG $G'$ Markov equivalent to $H$.
>
> A **covered edge** $X \to Y$ satisfies $\mathrm{Pa}(X) = \mathrm{Pa}(Y) \setminus \{X\}$.
> Reversing it ($X \gets Y$) preserves the Markov equivalence class.
^thm-meek-conjecture

**Significance for GES.** The Meek conjecture guarantees that GES's greedy search can
always navigate between any two CPDAGs via a sequence of Insert/Delete operators, ensuring
the algorithm doesn't get stuck in a region of the CPDAG space disconnected from the true
CPDAG. This is the key ingredient for the main consistency result:

> [!theorem] Theorem: GES Consistency (Chickering, 2002, Theorem 18)
> Let $G^*$ be the true causal DAG with CPDAG $\mathcal{C}^*$. Assume:
> 1. **Faithfulness:** Every CI in $P$ is d-separation in $G^*$.
> 2. **Consistent score:** $S$ is consistent — for any DAG $G$, as $n \to \infty$:
>    $$S(G^*, \mathcal{D}) > S(G, \mathcal{D}) \text{ if } G \not\in [\mathcal{C}^*],
>    \quad S(G^*, \mathcal{D}) = S(G, \mathcal{D}) \text{ if } G \in [\mathcal{C}^*].$$
>    (Both BIC and BDe satisfy this.)
>
> Then as $n \to \infty$, GES returns $\mathcal{C}^*$ with probability 1.
^thm-ges-consistency

**Contrast with PC.** Both algorithms are consistent under faithfulness. PC's consistency
relies on the faithfulness of the CI tests; GES's consistency relies on the consistency of
the score. The difference is that GES has a single global score to maximize, while PC
controls many individual test errors.

### Finite-Sample Behavior

In finite samples:
- **FES overshoot:** The BIC penalty may be insufficient to prevent adding all true edges
  and some spurious ones. This is corrected by BES.
- **BES undershooting:** If FES misses a true edge, BES cannot add it back (BES only removes).
  For this reason, GES is sometimes combined with a follow-up round of FES (the **GES+**
  or **GIES** variant for interventional data).
- **Score tuning:** The BIC penalty coefficient $\lambda$ (replacing $1/2$ by a tunable
  $\lambda / 2$) allows trading off density vs. accuracy — similar to $\alpha$ in PC.

### Software: `pcalg` and FGES

**R (`pcalg`):**
```r
library(pcalg)
# Gaussian data with BIC-penalized L0 score
score <- new("GaussL0penObsScore", data = X, lambda = 0.5 * log(nrow(X)))
ges.fit <- ges(score)
plot(ges.fit$essgraph)  # plot the CPDAG
```

**Python (`causal-learn`):**
```python
from causallearn.search.ScoreBased.GES import ges
Record = ges(data, score_func='local_score_BIC')
```

**FGES (Fast GES, Ramsey et al., 2017):** A parallelized implementation in the
CMU Tetrad software suite. FGES exploits the decomposable score's locality — each
thread evaluates Insert operators for different node pairs simultaneously. It handles
$d > 1000$ nodes in practice.

## Connections

- **vs. PC.** [[PC Algorithm - Overview]] is constraint-based (CI tests); GES is score-based
  (global BIC/BDe). Both target the same CPDAG and are consistent under faithfulness.
  GES avoids multiple testing; PC edges have explicit statistical justifications.
- **vs. NOTEARS.** [[NOTEARS - Overview]] searches $\mathbb{R}^{d \times d}$ (the real matrix
  space), producing a fully directed weighted graph. GES searches the discrete CPDAG space.
  NOTEARS scales to $d \gg 100$; GES is computationally feasible up to $d \approx 100$ in
  standard implementations (FGES pushes this to $d > 1000$).
- **Score connection to Bayesian information.** The BDe score is the log-marginal-likelihood
  under Dirichlet priors — connecting GES to [[Bayesian Outcome Models]] and the Bayesian
  model comparison approach in [[Overfitting and Information Criteria]].
- **Hybrid methods.** MMHC (Max-Min Hill-Climbing, Tsamardinos et al., 2006) combines the
  skeleton restriction from PC-style CI testing with the score-based phase of GES — one of
  the best-performing algorithms in practice for medium-dimensional problems ($d \leq 50$).

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG output and Meek conjecture context
- [[PC Algorithm - Overview]] — constraint-based alternative with explicit CI test justifications
- [[Conditional Independence Testing for Causal Discovery]] — the CI tests PC uses that GES avoids
- [[DAG Structure Learning Problem]] — full landscape including GES, PC, exact methods
- [[NOTEARS - Overview]] — continuous optimization alternative benchmarked against GES
- [[Causal Discovery/_Index|Causal Discovery Index]]
