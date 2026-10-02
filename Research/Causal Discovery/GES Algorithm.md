---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-ref.md]]"
source_location: "Chickering (2002), JMLR 3:507-554, §3-5"
date_ingested: 2026-10-02
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
  - "score-based causal discovery"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** causal
> discovery algorithm. It greedy searches the space of CPDAGs (Markov equivalence classes)
> in two phases: a **forward phase** that greedily adds edges until no score improvement is
> possible, then a **backward phase** that greedily removes edges. Under the **Markov**,
> **faithfulness**, and **locally consistent score** conditions, Chickering proved GES
> consistently identifies the true CPDAG as $n \to \infty$. GES is the score-based counterpart
> to the constraint-based [[PC Algorithm]].

## Overview

GES works in the space of **CPDAGs** — representations of Markov equivalence classes —
rather than in the space of individual DAGs. This is what makes it principled: moving between
CPDAGs via the Insert and Delete operators guarantees each intermediate graph is a valid CPDAG
of *some* DAG.

The key theoretical underpinning is **Chickering's proof of the Meek Conjecture** (2002): any
move from a sub-model of $G^*$ to a super-model of $G^*$ can be achieved via a sequence of
covered-edge reversals, each of which preserves the independence map property. This result
guarantees that the forward phase of GES reaches an independence map of the true distribution,
from which the backward phase can then prune to the CPDAG.

GES is asymptotically correct, whereas most practical implementations use BIC as the score —
which is consistent under Gaussian linear SEMs.

## Main Content

### Scoring functions

> [!definition] Definition: Locally consistent score (Chickering 2002, §3)
> A scoring function $S(\mathbf{X}, G)$ assigning a real number to a dataset–DAG pair is
> **locally consistent** if, in the large-sample limit:
> - If $X_j \not\perp\!\!\!\perp X_i \mid \text{pa}(X_j)$ in the true distribution (i.e. $X_i$
>   has a direct causal effect on $X_j$ not mediated by other parents): adding $X_i$ to
>   $\text{pa}(X_j)$ **increases** the score.
> - If $X_j \perp\!\!\!\perp X_i \mid \text{pa}(X_j)$ (i.e. $X_i$ is redundant given the
>   current parents): adding $X_i$ to $\text{pa}(X_j)$ **decreases** the score.
^def-locally-consistent

> [!definition] Definition: BIC score (Gaussian linear SEM)
> Under the linear SEM $X_j = \sum_{k \in \text{pa}(j)} w_{kj} X_k + \varepsilon_j$
> with Gaussian noise $\varepsilon_j \sim \mathcal{N}(0, \sigma_j^2)$, the **BIC** score is:
> $$S_{\text{BIC}}(\mathbf{X}, G) = \sum_{j=1}^d \left[ -\frac{n}{2}\ln \hat{\sigma}^2_j(G) - \frac{1}{2} |\text{pa}_G(j)| \ln n \right]$$
> where $\hat{\sigma}^2_j(G)$ is the MLE residual variance from the regression of $X_j$ on
> $\text{pa}_G(X_j)$.
>
> BIC is **decomposable** (decomposes as a sum over nodes) and **score-equivalent** (gives
> equal scores to all DAGs in the same MEC). Decomposability enables $O(1)$ incremental updates
> when a single edge is added or removed.
^def-bic-score

For discrete data, the **BDeu** (Bayesian Dirichlet equivalent uniform) score is used.
Both BIC and BDeu satisfy local consistency.

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Insert operator and FES (Chickering 2002, §4.1)
> The **Insert**$(X, Y, T)$ operator on CPDAG $H$:
> - Inserts a directed edge $X \to Y$ into $H$ (where $X$ and $Y$ are currently non-adjacent).
> - Orients any undirected edges among $T \cup \{X\}$ toward $Y$ (where $T \subseteq$
>   undirected neighbours of $Y$ not adjacent to $X$).
> - Returns the updated CPDAG after applying Meek's rules.
>
> **FES algorithm:**
> 1. Initialise $H \leftarrow$ empty CPDAG (no edges).
> 2. **Repeat:**
>    - Find the Insert$(X, Y, T)$ that maximises the score increase $\Delta S$.
>    - If $\Delta S > 0$: apply Insert$(X, Y, T)$, update $H$.
>    - Else: **Stop.**
> 3. Output the CPDAG $H^*$ (forward-phase solution).
^def-fes

**Key property of FES:** Under faithfulness and a locally consistent score, as $n \to \infty$,
FES terminates at an CPDAG that is an **independence map** (I-map) of the true distribution:
it may include some spurious edges (super-model), but it contains the true skeleton as a subset.
This is the content of Chickering's (2002) Theorem 15.

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Delete operator and BES (Chickering 2002, §4.2)
> The **Delete**$(X, Y, H)$ operator on CPDAG $H$:
> - Removes the edge $X - Y$ or $X \to Y$ from $H$.
> - Orients edges among $H \cap \text{adj}(Y) \setminus \{X\}$ consistently with the deletion.
> - Returns the updated CPDAG after applying Meek's rules.
>
> **BES algorithm:**
> 1. Initialise $H \leftarrow$ output of FES.
> 2. **Repeat:**
>    - Find the Delete$(X, Y, H)$ that maximises the score increase $\Delta S$.
>    - If $\Delta S > 0$: apply Delete$(X, Y, H)$, update $H$.
>    - Else: **Stop.**
> 3. Output the CPDAG $\hat{H}$ (final estimate).
^def-bes

**Key property of BES:** Starting from an I-map of the true distribution, BES removes spurious
edges greedily. Under faithfulness and a locally consistent score, each true edge's removal
*decreases* the score (asymptotically), so BES preserves all true edges and removes all spurious
ones, yielding the CPDAG of $G^*$.

### The Meek Conjecture and consistency

The hardest part of Chickering's (2002) proof is showing that the greedy approach does not
get stuck in local optima. This is established via the **Meek Conjecture**:

> [!theorem] Theorem: Meek Conjecture (proved by Chickering 2002, Thm. 2)
> Let $G^*$ be the true DAG and $H$ be a CPDAG whose unique DAG extension $G$ is a sub-model
> of $G^*$ (i.e., $G^*$ has all edges of $G$ plus some additional ones). Then there exists a
> sequence of Insert operators, each leading to a valid CPDAG and each step having a positive
> score increment (asymptotically), such that the sequence terminates at the CPDAG of $G^*$.
>
> Formally: there is a finite sequence of **covered-edge reversals** in $G$ such that after each
> reversal $G$ remains an independence map of $\mathbb{P}$, and the final graph is DAG-equivalent
> to $G^*$.
^thm-meek-conjecture

> [!theorem] Theorem: GES consistency (Chickering 2002, Thm. 15 + 16)
> Suppose:
> 1. The true DAG $G^*$ satisfies the **Markov condition** and the distribution $\mathbb{P}$
>    satisfies **faithfulness** w.r.t. $G^*$.
> 2. The score $S$ is **decomposable**, **score-equivalent**, and **locally consistent**.
>
> Then as $n \to \infty$, GES outputs the CPDAG of $G^*$ with probability $\to 1$.
>
> **Proof sketch:** FES reaches an I-map of $G^*$ (Thm. 15, via the Meek Conjecture). From
> any I-map, BES is guaranteed to remove exactly the spurious edges (Thm. 16, using local
> consistency of the score and faithfulness to rule out false negatives in BES).
^thm-ges-consistency

### Computational complexity

- **FES**: at most $\binom{d}{2}$ edge additions per outer iteration; each Insert operator
  can be evaluated in $O(d)$ using score decomposability. Total FES cost: $O(d^3)$ operations
  for sparse graphs; $O(d^4)$ in the worst case.
- **BES**: symmetric to FES; same complexity.
- **Fast GES (FGS)**: Ramsey et al. (2016) implement GES with parallelism and an adjacency
  graph for faster neighbour lookup; this is the **FGS** baseline in NOTEARS experiments.

### GES vs. PC: a comparison

| Property | GES | PC |
|----------|-----|-----|
| Paradigm | Score-based | Constraint-based |
| Target | CPDAG | CPDAG |
| Input | Scoring function (BIC/BDeu) | CI test + significance level $\alpha$ |
| Asymptotic guarantee | Recovers true CPDAG | Recovers true CPDAG |
| Sensitive to | Score choice, finite-sample score estimation | CI test choice, type-I/II errors, order (fixed by PC-stable) |
| Efficient for | Moderate $d$ with good score | Sparse graphs (low max degree $q^*$) |
| Key assumption | Markov + faithfulness + locally consistent score | Markov + faithfulness + consistent CI test |

### Extensions

- **GIES** (Greedy Interventional Equivalence Search; Hauser & Bühlmann 2012): extends GES
  to interventional data, targeting **I-CPDAGs** which represent smaller equivalence classes.
- **High-dimensional GES** (Nandy et al. 2018): under restricted eigenvalue conditions on the
  population covariance, GES with BIC is consistent even in high-dimensional settings with
  $d \gg n$.
- **FGES / FGS**: fast implementation using parallelism and priority queues; scales to
  thousands of variables.

## Examples

> [!example] Example: GES forward phase on three nodes
> True DAG: $X_1 \to X_2 \leftarrow X_3$ (a v-structure; CPDAG is the same).
>
> **FES:**
> - Start with empty graph. Best Insert: say Insert$(X_1, X_2, \emptyset)$ (score increases
>   because $X_1$ is a genuine cause of $X_2$). Apply.
> - Current graph: $\{X_1 \to X_2\}$. Best next Insert: Insert$(X_3, X_2, \emptyset)$.
>   Apply. Current: $\{X_1 \to X_2 \leftarrow X_3\}$.
> - No further insertion improves score. FES terminates.
>
> **BES:**
> - No deletion improves score (both edges are real). BES terminates immediately.
>
> Output CPDAG: $X_1 \to X_2 \leftarrow X_3$ (correctly identified v-structure).

## Connections

- **Contrast with NOTEARS**: NOTEARS solves a continuous optimisation problem over
  $\mathbb{R}^{d \times d}$ and outputs a **single DAG** (not a CPDAG). GES outputs the
  full CPDAG. See [[NOTEARS Experiments]] for a head-to-head comparison: GES (as FGS) is
  competitive on sparse graphs but loses on dense hub-heavy (SF-4) graphs, where NOTEARS's
  global updates dominate.
- **Score = BIC**: the BIC score used by GES is the same penalized log-likelihood used in
  NOTEARS's regularized LS score. The key difference: NOTEARS minimises over the continuous
  weight matrix; GES maximises a discrete score over CPDAGs.
- **Bayesian structure learning**: in the Bayesian setting, the BDeu or BGe score integrated
  over parameters replaces BIC; the MCMC-over-DAGs approach (Madigan & York 1995) samples
  from the posterior over DAGs rather than maximising.
- **causal-learn**: the `pcalg` R package provides `ges()`. Python: `causal-learn` library
  (`GES` class) and `lingam` package.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG theory; Insert/Delete operators modify CPDAGs
- [[PC Algorithm]] — constraint-based counterpart
- [[DAG Structure Learning Problem]] — problem formulation and landscape of methods
- [[NOTEARS - Overview]] — continuous optimisation alternative
- [[NOTEARS Experiments]] — GES (as FGS) vs. NOTEARS empirical comparison
