---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/tutorial
source: "[[raw/ges-algorithm-juangamella-README.md]]"
source_location: "Full README: algorithm description, implementation, phases"
date_ingested: 2026-08-09
folder: "Causal Discovery"
doc_type: tutorial
depends_on:
  - "[[Causal Discovery Landscape]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Constraint-Based Causal Discovery]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is a **score-based** causal discovery
> algorithm that searches over **Markov equivalence classes** (CPDAGs) rather than individual
> DAGs. It operates in three phases: a **forward phase** (adds edges that improve the BIC
> score), a **backward phase** (removes edges that improve the score), and an optional
> **turning phase** (reverses covered edges, Hauser & Bühlmann 2012). Under Markov,
> Faithfulness, and causal sufficiency, GES consistently identifies the true CPDAG in the
> large-sample limit. GES is one of two baselines against which NOTEARS is benchmarked in
> [[NOTEARS Experiments]].

## Overview

GES was developed by Chickering (2002) to prove the **Meek conjecture**: that from any
DAG $\mathsf{G}$ that is an independence map of another DAG $\mathsf{H}$, one can reach
$\mathsf{H}$ via a finite sequence of edge insertions and *covered edge reversals* such
that $\mathsf{H}$ remains an independence map after each step. This structural result
implies that a greedy search over equivalence classes, scored with a decomposable score,
will find the true equivalence class in the infinite-data limit.

**Paper**: Chickering, D.M. (2002). *Optimal Structure Identification With Greedy Search.*
Journal of Machine Learning Research, 3, 507–554.

**Extension**: Hauser, A. & Bühlmann, P. (2012). *Characterization and Greedy Learning of
Interventional Markov Equivalence Classes of Directed Acyclic Graphs.*
JMLR 13, 2409–2464. (Adds the **turning phase** and extends to interventional data.)

**Python implementation**: `ges` (juangamella, `pip install ges`); also in `pcalg` (R) and
`causal-learn` (py-why, Python).

## Main Content

### Scoring criterion

GES uses a **score function** $\mathcal{S}$ that must be:

> [!definition] Definition: Score-equivalent and locally decomposable score (Chickering 2002)
> A score function $\mathcal{S}$ on DAGs is:
> - **Score-equivalent**: $\mathcal{S}(\mathsf{G}) = \mathcal{S}(\mathsf{G}')$ whenever
>   $\mathsf{G}$ and $\mathsf{G}'$ are Markov equivalent (same equivalence class). This allows
>   scoring CPDAGs unambiguously.
> - **Locally decomposable**: $\mathcal{S}(\mathsf{G}) = \sum_{i=1}^d s_i(X_i, \mathrm{pa}_\mathsf{G}(X_i))$,
>   a sum of local family scores, each depending only on $X_i$ and its parents. This allows
>   efficient incremental score updates when a single edge is added or removed.
^def-score-properties

The canonical score is the **Gaussian BIC** (Bayesian Information Criterion):

> [!definition] Definition: Gaussian BIC score (Chickering 2002)
> For a DAG $\mathsf{G}$ and data $\mathbf{X}\in\mathbb{R}^{n\times d}$, the Gaussian BIC score is:
> $$\mathcal{S}_{\rm BIC}(\mathsf{G}) = \log \hat{L}(\mathsf{G}) - \frac{|\mathsf{G}|}{2}\log n$$
> where $\hat{L}(\mathsf{G})$ is the maximum Gaussian likelihood of $\mathsf{G}$ fitted to
> $\mathbf{X}$, and $|\mathsf{G}|$ is the number of free parameters. Locally, for node $i$
> with parent set $\mathrm{pa}(i)$:
> $$s_i(X_i, \mathrm{pa}(i)) = -\frac{n}{2}\log\hat\sigma_i^2 - \frac{|\mathrm{pa}(i)|+1}{2}\log n$$
> where $\hat\sigma_i^2$ is the residual variance from regressing $X_i$ on $\mathrm{pa}(i)$.
> Higher scores are better (convention: maximize BIC).
^def-bic

BIC is score-equivalent for Gaussian DAGs because the Gaussian log-likelihood only depends
on second moments, which are identical across a Markov equivalence class.

### Phase 1: Forward phase (insert operators)

> [!definition] Definition: Insert operator $\mathrm{Insert}(X, Y, T)$
> Given a CPDAG $\mathcal{C}$ with $X$ and $Y$ **not** adjacent:
> - Let $T \subseteq \mathrm{adj}(\mathcal{C}, Y)\setminus \mathrm{adj}(\mathcal{C}, X)$
>   be a set of nodes adjacent to $Y$ but not $X$ (the "turning" set for the new edge).
> - The operator inserts $X \to Y$ into $\mathcal{C}$, with $T \to Y$ for all $t \in T$,
>   then converts the resulting PDAG to a CPDAG.
^def-insert

> [!theorem] Algorithm: GES Forward Phase (Chickering 2002, Algorithm 1)
> **Initialize**: $\mathcal{C}_0 \leftarrow$ empty CPDAG (no edges)
>
> **Repeat**:
> 1. For all non-adjacent pairs $(X, Y)$ and valid $T$: compute score gain
>    $\Delta\mathcal{S} = s_Y(\mathrm{pa}(Y) \cup \{X\} \cup T) - s_Y(\mathrm{pa}(Y) \cup T)$
> 2. If $\max \Delta\mathcal{S} > 0$: apply $\mathrm{Insert}(X^*, Y^*, T^*)$ to get $\mathcal{C}_1$
> 3. Else: stop
>
> **Output**: $\mathcal{C}_{\rm fwd}$ — a local maximum of the score from the empty graph
^alg-forward

**Property**: The forward phase terminates because the score strictly increases at each step
and the number of CPDAGs is finite.

### Phase 2: Backward phase (delete operators)

> [!definition] Definition: Delete operator $\mathrm{Delete}(X, Y, H)$
> Given a CPDAG $\mathcal{C}$ with $X$ and $Y$ adjacent (directed or undirected):
> - Let $H \subseteq \mathrm{adj}(\mathcal{C}, X) \cap \mathrm{adj}(\mathcal{C}, Y)$
>   be a subset of the common neighbours.
> - The operator removes the edge $X{-}Y$ and orients $H \to Y$, then converts to CPDAG.
^def-delete

> [!theorem] Algorithm: GES Backward Phase (Chickering 2002, Algorithm 2)
> **Initialize**: $\mathcal{C}_{\rm fwd}$ (output of forward phase)
>
> **Repeat**:
> 1. For all adjacent pairs $(X, Y)$ and valid $H$: compute score gain
>    $\Delta\mathcal{S} = s_Y(\mathrm{pa}(Y)\setminus(\{X\}\cup H)) - s_Y(\mathrm{pa}(Y))$
> 2. If $\max \Delta\mathcal{S} > 0$: apply $\mathrm{Delete}(X^*, Y^*, H^*)$
> 3. Else: stop
>
> **Output**: $\mathcal{C}_{\rm bwd}$ — a local maximum where no deletion improves the score
^alg-backward

**Why a backward phase?** The forward phase may over-insert edges — adding an edge to reach
a high-scoring equivalence class can require passing through a lower-scoring one. The backward
phase cleans up these spurious edges.

### Phase 3: Turning phase (Hauser & Bühlmann 2012)

> [!definition] Definition: Covered edge (Chickering 2002)
> An edge $X \to Y$ in a DAG is **covered** if $\mathrm{pa}(X) = \mathrm{pa}(Y)\setminus\{X\}$,
> i.e. $Y$'s parents are exactly $X$'s parents plus $X$ itself. Covered edge reversals are the
> atomic moves between DAGs within the same Markov equivalence class.
^def-covered-edge

> [!theorem] Algorithm: GES Turning Phase (Hauser & Bühlmann 2012)
> **Initialize**: $\mathcal{C}_{\rm bwd}$
>
> **Repeat**:
> 1. For all (undirected) edges $X{-}Y$ and valid "turning sets" $C$: compute score gain
>    $\Delta\mathcal{S}$ for the turn operator (equivalent to reversing the edge $X \leftrightarrow Y$
>    along with re-orienting $C \to X$ / $C \to Y$)
> 2. If $\max \Delta\mathcal{S} > 0$: apply the turn
> 3. Else: stop
>
> **Output**: $\mathcal{C}_{\rm GES}$ — final CPDAG
^alg-turning

The turning phase was shown by Hauser & Bühlmann (2012) to empirically improve structure
recovery and is now included in most implementations.

### Theoretical guarantee

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Under the Causal Markov condition, Faithfulness, Causal Sufficiency, and for a
> **score-equivalent and locally decomposable score** that is **consistent** (i.e. the
> score function correctly identifies the true independence structure in the limit $n\to\infty$),
> GES (forward + backward phases) identifies the CPDAG of the true DAG with probability 1
> as $n\to\infty$.
>
> The Gaussian BIC score satisfies these conditions when the true distribution is Gaussian.
^thm-ges-consistency

**Proof sketch**: The Meek conjecture (proved by Chickering 2002) guarantees that there
exists a path in CPDAG space from any starting point to the true CPDAG via Insert/Delete
operators that each strictly improve the true population score. In the large-sample limit,
the empirical score approximates the population score, so GES follows this path.

### Python usage (ges package)

```python
import ges
import numpy as np

# n observations of d variables (data matrix: n x d)
data = np.random.randn(1000, 5)

# Run GES with the Gaussian BIC score
estimate_cpdag, total_score = ges.fit_bic(data)

# estimate_cpdag: adjacency matrix of CPDAG
# estimate_cpdag[i,j] != 0 means i -> j
# estimate_cpdag[i,j] != 0 AND estimate_cpdag[j,i] != 0 means i - j (undirected)
print(estimate_cpdag)
```

## Examples

> [!example] Example: GES on a 3-variable chain
> **True DAG**: $X_1 \to X_2 \to X_3$ (chain). **True CPDAG**: $X_1 - X_2 - X_3$
> (the chain $X_1 \to X_2 \to X_3$ and $X_3 \to X_2 \to X_1$ are Markov equivalent).
>
> **Forward phase**: Start empty. Best insert: add $X_1 - X_2$ (strong correlation),
> score increases. Next: add $X_2 - X_3$. No more beneficial inserts. $\mathcal{C}_{\rm fwd} = X_1 - X_2 - X_3$.
>
> **Backward phase**: No edge removal improves score. $\mathcal{C}_{\rm bwd} = X_1 - X_2 - X_3$.
>
> **Output**: $X_1 - X_2 - X_3$ — the correct CPDAG (chain/fork equivalence class).
> Note: the direction cannot be determined from observational data for a chain.

> [!example] Example: GES distinguishes a v-structure
> **True DAG**: $X_1 \to X_2 \leftarrow X_3$ ($X_1, X_3$ marginally dependent through
> $X_2$). **True CPDAG**: $X_1 \to X_2 \leftarrow X_3$ (v-structures are unique to their
> equivalence class, so the full orientation is identifiable).
>
> **Forward phase**: The $X_1 - X_3$ edge scores poorly (they are marginally independent).
> The edges $X_1 - X_2$ and $X_3 - X_2$ score well.
>
> **V-structure orientation**: During PDAG→CPDAG conversion after inserting both edges,
> the algorithm detects that $X_2$ is a collider ($X_1, X_3$ not adjacent, $X_2$ as
> common child) and orients $X_1 \to X_2 \leftarrow X_3$.
>
> **Output**: $X_1 \to X_2 \leftarrow X_3$ — correct, fully oriented CPDAG.

## Connections

- **vs. PC** ([[Constraint-Based Causal Discovery]]): PC uses CI tests; GES optimizes a
  score. In finite samples, GES is often more accurate because BIC integrates over
  evidence while a CI test makes a binary accept/reject decision. Both return CPDAGs.
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS uses continuous optimization, not
  search over CPDAGs. NOTEARS paper benchmarks against GES (and FGS) in
  [[NOTEARS Experiments]], finding NOTEARS competitive with or better than GES on dense/large graphs.
- **FGS** (Fast Greedy Search, Ramsey et al. 2017): A faster BIC-based implementation
  using the same operators but avoiding full PDAG→CPDAG conversions. Available in Tetrad.
- **GIES** (Greedy Interventional Equivalence Search, Hauser & Bühlmann 2012): extends
  GES to handle interventional data alongside observational data.
- **Scored-based search** also connects to [[Overfitting and Information Criteria]]
  (BIC as a complexity-penalized likelihood) and [[Bayesian Linear Regression]] (BGe score
  is the fully Bayesian analogue of BIC for Gaussian data).

## See Also
- [[Causal Discovery Landscape]] — overview comparing all three paradigms
- [[Constraint-Based Causal Discovery]] — PC algorithm (constraint-based alternative)
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[NOTEARS Experiments]] — benchmarks where GES is a baseline
- [[DAG Structure Learning Problem]] — problem setup, NP-hardness, score definitions
- [[Directed Acyclic Graphs]] — Markov condition, faithfulness, d-separation
