---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/pcalg
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Chickering (2002) — synthesised from training knowledge"
date_ingested: 2026-07-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES algorithm"
  - "FES"
  - "BES"
  - "Chickering 2002"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. Instead of testing conditional independences,
> GES greedily maximises a **decomposable score** (typically BIC) over the space of
> Markov Equivalence Classes (MECs), represented as CPDAGs. It has two phases:
> **Forward Equivalence Search** (FES, greedily adds edges) followed by **Backward
> Equivalence Search** (BES, greedily removes edges). Under the Markov and faithfulness
> conditions with a correct scoring criterion, GES is **consistent** — it recovers
> the true MEC with probability tending to 1. NOTEARS lists GES (as "FGS") as its
> primary comparison in the experiments.

## Overview

Score-based structure learning maximizes a function $Q(G)$ over DAGs $G$. The key
computational challenge: the space of DAGs is combinatorial. GES resolves this by
searching over **MECs** (represented as CPDAGs) rather than individual DAGs — and
crucially, moving between adjacent MECs via well-characterised local operations.

The central insight of Chickering (2002) is that two MECs are **adjacent** in the
MEC lattice if they differ by exactly one edge-addition or edge-deletion, and these
moves correspond to computable local changes to the CPDAG. This lets GES do greedy
search over the lattice without ever enumerating the DAGs inside each MEC.

## Main Content

### Score decomposability

GES requires the score to be **decomposable** — expressible as a sum over local
family scores:

> [!definition] Definition: Decomposable Score
> A score $Q(G)$ is **decomposable** if it factors as
> $$Q(G) = \sum_{j=1}^{p} q\!\left(X_j,\, \text{Pa}_G(X_j)\,;\, \mathbf{X}\right),$$
> where $q(X_j, \text{Pa}_j; \mathbf{X})$ depends only on the data for $X_j$ and its
> parents in $G$.
^def-decomposable-score

Decomposability means that adding or removing a single edge only requires recomputing
the score for the affected variable's family — all other terms remain unchanged. This
enables $O(p)$ score updates per move.

**Common decomposable scores**:

| Score | Setting | Formula |
|-------|---------|---------|
| **BIC** (Schwarz 1978) | Gaussian linear SEM | $\sum_j [\hat\ell_j - \frac{d_j}{2}\log n]$ where $\hat\ell_j$ = Gaussian log-lik, $d_j$ = # params for $X_j$ |
| **BDe / BDeu** (Heckerman et al. 1995) | Discrete BN | Dirichlet-multinomial marginal likelihood; uniform prior over DAGs |
| **BGe** (Geiger & Heckerman 1994) | Gaussian BN | Bayesian Gaussian score; marginalises parameters |

BIC is the most common choice. Its consistency (converging to the true model with
enough data) holds under correct model specification.

### GES operators: INSERT and DELETE

GES moves through the MEC lattice by applying two types of operators to the CPDAG:

> [!definition] Definition: INSERT and DELETE Operators (Chickering 2002)
> Let $\mathcal{C}$ be the current CPDAG.
>
> **INSERT$(X, Y, T)$**: Adds a directed edge $X \to Y$ to $\mathcal{C}$, where
> $T \subseteq \text{Ne}(Y) \cap \text{adj}(X)$ (a clique in the "neighbourhood" of
> $Y$ that becomes parents of $Y$ by this operation). The operator is valid iff
> the resulting graph is a CPDAG.
>
> **Score gain**: $\Delta_\text{ins}(X,Y,T) = q(Y, \text{Pa}(Y) \cup \{X\} \cup T) - q(Y, \text{Pa}(Y))$.
>
> **DELETE$(X, Y, H)$**: Removes the edge between $X$ and $Y$, where
> $H \subseteq \text{Ne}(Y) \cap \text{adj}(X)$ specifies which neighbours become
> non-parents. The operator is valid iff the resulting graph is a CPDAG.
>
> **Score gain**: $\Delta_\text{del}(X,Y,H) = q(Y, \text{Pa}(Y) \setminus (\{X\} \cup H)) - q(Y, \text{Pa}(Y))$.
^def-ges-operators

The validity conditions (that the resulting graph is a valid CPDAG) can be checked
locally in $O(p)$ time using the graphical characterisation of Meek (1995).

### Forward Equivalence Search (FES)

> [!definition] Algorithm: FES (Chickering 2002, §3)
> **Input**: $p$ variables, data $\mathbf{X}$, decomposable score $Q$.
>
> 1. Initialise $\mathcal{C} \leftarrow$ empty CPDAG.
> 2. **While** $\exists$ valid INSERT$(X,Y,T)$ with $\Delta_\text{ins}(X,Y,T) > 0$:
>    - Select INSERT$(X^*, Y^*, T^*)$ with maximum score gain.
>    - Apply INSERT$(X^*, Y^*, T^*)$ to $\mathcal{C}$; update $\mathcal{C}$.
> 3. **Return** $\mathcal{C}_\text{FES}$.
^alg-ges-fes

FES produces a CPDAG that is **too dense**: it may include edges not in the true
MEC that increase the finite-sample BIC score but are not present in the oracle model.

> [!note] Why start from the empty graph?
> The empty graph has a well-defined CPDAG representation. Starting from the empty graph
> makes FES well-posed. Starting from a complete graph would cause INSERT to be a no-op;
> BES (below) handles sparsification.

### Backward Equivalence Search (BES)

> [!definition] Algorithm: BES (Chickering 2002, §3)
> **Input**: CPDAG $\mathcal{C}_\text{FES}$ from FES; same data and score.
>
> 1. Start with $\mathcal{C} \leftarrow \mathcal{C}_\text{FES}$.
> 2. **While** $\exists$ valid DELETE$(X,Y,H)$ with $\Delta_\text{del}(X,Y,H) > 0$:
>    - Select DELETE$(X^*, Y^*, H^*)$ with maximum score gain.
>    - Apply DELETE$(X^*, Y^*, H^*)$ to $\mathcal{C}$; update $\mathcal{C}$.
> 3. **Return** $\mathcal{C}_\text{BES}$.
^alg-ges-bes

BES removes spurious edges added by FES in finite samples. Together, FES + BES = GES.

### Consistency theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let $G^*$ be the true DAG over $p$ variables, $\mathcal{C}^* = \text{CPDAG}(G^*)$.
> Assume:
> 1. **(Causal Markov condition)** The data distribution satisfies the Markov condition
>    with respect to $G^*$.
> 2. **(Faithfulness)** The distribution is faithful to $G^*$.
> 3. **(Score consistency)** The score $Q$ is **locally consistent** — it asymptotically
>    prefers the correct parent set for each variable. BIC satisfies this under the
>    Gaussian linear SEM.
>
> Then in the limit $n \to \infty$, GES returns $\mathcal{C}^*$ — the true CPDAG.
>
> **Finite-sample note**: In practice, BIC with $\lambda = 1$ can be conservative; tuning
> $\lambda > 1$ (stronger penalty) reduces false-positive edges at the cost of power.
^thm-ges-consistency

The consistency proof proceeds in two steps: (1) show that the FES output CPDAG subsumes
the true CPDAG (over-complete); (2) show that BES deletes exactly the spurious edges,
leaving the true CPDAG.

### Complexity

- **FES**: Each INSERT operator evaluation is $O(p)$; the number of valid operators per step
  is $O(p^2)$ in the worst case. Total FES iterations: $O(E^*)$ where $E^*$ = true edge count.
  FES cost: $O(p^2 \cdot E^*)$.
- **BES**: Similarly $O(p^2 \cdot E^*)$.
- **Practical speed**: For sparse true graphs (small $E^*$), GES is fast. The bottleneck is
  score evaluation (sufficient statistics can be pre-computed for BIC).

### GES vs PC: Comparison

| Dimension | PC Algorithm | GES |
|-----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC maximisation) |
| Assumption | Markov + faithfulness + CI test validity | Markov + faithfulness + score consistency |
| Finite-sample sensitivity | CI test errors propagate to orientation | BIC errors cancel partially (FES over-adds, BES removes) |
| Computational cost | $O(p^{q+2})$ CI tests ($q$ = max degree) | $O(p^2 E^*)$ (sparse true graph) |
| Handles $p \gg n$ | Yes (PC-stable + high-dim CI tests) | Limited (high-dim BIC selection unstable) |
| Software (R) | `pcalg::pc()` | `pcalg::ges()` |
| Software (Python) | `causal-learn: PC()` | `causal-learn: GES()` |
| Primary limitation | Sensitive to CI test threshold $\alpha$ | Requires Gaussian/linear for BIC consistency |
| Preferred when | Very sparse graphs, non-Gaussian or nonlinear data with kernel CI tests | Moderate density, Gaussian data, known parametric form |

### FGES: Fast GES for large graphs

The original GES algorithm has $O(p^2)$ operators to evaluate per step. For $p$ in the
hundreds or thousands, this is slow. Ramsey et al. (2017) introduce **FGES** (Fast GES),
which parallelises the operator evaluation and caches sufficient statistics, scaling to
$p \sim 10{,}000$ variables. FGES is available in TETRAD and `causal-learn`.

## Examples

> [!example] Example: Four-Variable Gaussian SEM
> True DAG: $X_1 \to X_2$, $X_1 \to X_3$, $X_2 \to X_4$, $X_3 \to X_4$.
> True CPDAG: same edges, all directed (unique DAG in its MEC — no ambiguous v-structures).
>
> **FES trace** (BIC score):
> - Iter 1: INSERT($X_1, X_2, \emptyset$) has highest gain → add $X_1 \to X_2$.
> - Iter 2: INSERT($X_1, X_3, \emptyset$) → add $X_1 \to X_3$.
> - Iter 3: INSERT($X_2, X_4, \emptyset$) → add $X_2 \to X_4$.
> - Iter 4: INSERT($X_3, X_4, \emptyset$) → add $X_3 \to X_4$.
> - Iter 5: No INSERT with positive gain. FES terminates.
>
> **BES trace**: No DELETE with positive gain. BES terminates immediately.
>
> **Output**: $X_1 \to X_2$, $X_1 \to X_3$, $X_2 \to X_4$, $X_3 \to X_4$ — matches true CPDAG.

## Connections

- **NOTEARS comparison**: [[NOTEARS Experiments]] compares NOTEARS against "FGS" (= FGES),
  showing NOTEARS is competitive on dense Erdős-Rényi graphs and faster asymptotically.
- **PC comparison**: GES and PC both output the CPDAG; GES tends to be more accurate when
  the true model is parametrically correct (Gaussian data, BIC), while PC is more robust
  to parametric misspecification via nonparametric CI tests.
- **DAG structure learning problem**: GES directly solves the combinatorial program (4) from
  [[DAG Structure Learning Problem]] via greedy MEC search.
- **Software**: `pcalg::ges()` (R), `causal-learn: GES()` (Python), TETRAD FGES (Java).

## See Also
- [[Markov Equivalence and CPDAGs]] — the MEC lattice GES searches over
- [[DAG Structure Learning Problem]] — problem setup (BIC score definition, NP-hardness)
- [[PC Algorithm]] — the constraint-based counterpart
- [[Constraint-Based Structure Learning]] — paradigm comparison
- [[NOTEARS - Overview]] — the continuous-optimisation alternative; GES is its primary baseline
- [[NOTEARS Experiments]] — benchmarks comparing GES (FGS) against NOTEARS
