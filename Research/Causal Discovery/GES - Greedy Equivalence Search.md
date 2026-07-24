---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Survey.md]]"
source_location: "§4: GES; Chickering (2002) JMLR 3, 507–554"
date_ingested: 2026-07-24
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
  - "FES forward equivalence search"
  - "BES backward equivalence search"
  - "FGES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. Rather than searching over individual DAGs,
> GES greedily searches the **CPDAG space** (Markov equivalence classes). It proceeds
> in two phases: **FES** (Forward Equivalence Search) adds edges that improve the BIC
> score; **BES** (Backward Equivalence Search) deletes edges that further improve BIC.
> Chickering (2002) proves GES is **consistent** under faithfulness and Gaussianity:
> it converges to the true CPDAG as $n \to \infty$. GES is the score-based analogue of
> [[PC Algorithm - Overview]] and was the state-of-the-art reference algorithm in the
> [[NOTEARS Experiments]] benchmark.

## Overview

The NP-hardness of exact DAG learning (maximizing BIC over all DAGs) motivates greedy
heuristics. But naive greedy search over individual DAGs is flawed: it can get stuck at
sub-optimal DAGs within the same Markov equivalence class (MEC), and must repeatedly
check acyclicity.

GES (Chickering 2002) solves both problems by searching directly over the space of
**CPDAGs** (one per MEC). The key enablers:

1. **Score equivalence**: all DAGs in the same MEC receive the same BIC score, so the
   space of CPDAGs is the right search domain.
2. **Meek conjecture** (proved by Chickering 2002): any two MECs with a subset relationship
   are connected by a single CPDAG-space edit (insert or delete one edge), so the search
   space is locally explorable.
3. **Score decomposability**: BIC decomposes over nodes, so the score change from
   inserting or deleting one edge can be computed in $O(|S|^3)$ time.

## Main Content

### Setup: Score Decomposability

> [!definition] Definition: Decomposable Score
> A scoring criterion $Q(G)$ over DAGs is **decomposable** if it factors over nodes:
> $$Q(G) = \sum_{i=1}^d Q_i\bigl(X_i, \text{pa}_G(X_i)\bigr),$$
> where $Q_i(X_i, S)$ depends only on $X_i$ and its parent set $S$ in $G$.
>
> The **BIC score** is decomposable:
> $$Q_i\bigl(X_i, \text{pa}(X_i)\bigr) = -\frac{n}{2}\log\hat\sigma_i^2 - \frac{|\text{pa}(X_i)|+1}{2}\log n,$$
> where $\hat\sigma_i^2$ is the OLS residual variance from regressing $X_i$ on $\text{pa}(X_i)$.
> The penalty term $-\frac{|\text{pa}(X_i)|+1}{2}\log n$ grows with the number of parents,
> preventing overfitting.
^def-decomposable-score

> [!theorem] Theorem: Score Equivalence of BIC
> Markov equivalent DAGs receive the same BIC score:
> $G_1 \sim_M G_2 \implies Q(G_1) = Q(G_2)$.
> *Consequence*: GES can work with CPDAGs rather than individual DAGs — the BIC score
> is well-defined on CPDAGs, not just on DAGs.
^thm-score-equiv

### Phase 1: FES — Forward Equivalence Search

> [!definition] Definition: Insert Operator (Chickering 2002, §4.2)
> Given CPDAG $\mathcal{C}$, the **Insert$(X, Y, T)$** operator adds a directed edge
> $X \to Y$ by:
> 1. Selecting $T \subseteq \text{Ne}(Y, \mathcal{C}) \setminus \text{Adj}(X, \mathcal{C})$
>    — a subset of $Y$'s undirected neighbors that are not adjacent to $X$.
> 2. In any member DAG of $\mathcal{C}$, inserting $X \to Y$ and orienting the edges
>    $T \to Y$ (converting $T$ from undirected to directed parents of $Y$).
> 3. Computing the new CPDAG by running Meek's rules on the modified graph.
>
> The score change is:
> $$\Delta Q = Q_Y(X_Y, \text{pa}(Y) \cup \{X\} \cup T) - Q_Y(X_Y, \text{pa}(Y) \cup T).$$
^def-insert

> [!definition] Definition: FES Algorithm
> **Phase 1 of GES** (Forward Equivalence Search):
> 1. Start with $\mathcal{C}_0 = $ empty graph (all variables isolated).
> 2. **Repeat**:
>    - Find the Insert$(X, Y, T)$ operator that maximizes $\Delta Q > 0$.
>    - If no such operator exists: stop.
>    - Apply Insert$(X, Y, T)$; update CPDAG via Meek rules.
> 3. Return the current CPDAG $\mathcal{C}_{FES}$.
^def-fes

FES produces a CPDAG that is an **I-map** of the true distribution — it may have extra
edges, but no missing ones (under faithfulness).

### Phase 2: BES — Backward Equivalence Search

> [!definition] Definition: Delete Operator (Chickering 2002, §4.3)
> Given CPDAG $\mathcal{C}$, the **Delete$(X, Y, H)$** operator removes the edge
> $X - Y$ (or $X \to Y$) by:
> 1. Selecting $H \subseteq \text{Ne}(Y, \mathcal{C}) \cap \text{Adj}(X, \mathcal{C})$
>    — a subset of $Y$'s undirected neighbors that are also adjacent to $X$.
> 2. Orienting $H \to Y$ (or $Y \to H$ depending on the direction), removing the $X - Y$ edge.
> 3. Computing the new CPDAG via Meek rules.
>
> The score change is:
> $$\Delta Q = Q_Y(X_Y, \text{pa}(Y) \setminus (\{X\} \cup H)) - Q_Y(X_Y, \text{pa}(Y)).$$
^def-delete

> [!definition] Definition: BES Algorithm
> **Phase 2 of GES** (Backward Equivalence Search):
> 1. Start from $\mathcal{C}_{FES}$.
> 2. **Repeat**:
>    - Find the Delete$(X, Y, H)$ operator that maximizes $\Delta Q > 0$.
>    - If no such operator exists: stop.
>    - Apply Delete$(X, Y, H)$; update CPDAG via Meek rules.
> 3. Return the current CPDAG $\mathcal{C}_{GES}$.
^def-bes

BES prunes spurious edges added by FES in finite samples, recovering the true MEC.

### Correctness Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Thm. 15)
> Under faithfulness, causal sufficiency, and a decomposable score satisfying:
> - **Consistency**: $\arg\max_{pa} Q_i(X_i, pa) = \text{pa}^*_{G^*}(X_i)$ as $n \to \infty$,
> - **Score equivalence**: equivalent DAGs have equal scores,
>
> GES converges in probability to the **CPDAG** $\mathcal{C}(G^*)$ of the true DAG $G^*$.
>
> The proof shows: (1) FES never leaves the set of I-maps of $\mathbb{P}$ (soundness);
> (2) BES recovers the true MEC from any I-map (completeness). The key graph-theoretic
> lemma is the **Meek Conjecture** — proved in this paper.
^thm-ges-consistency

### The Meek Conjecture (Proved by Chickering 2002)

> [!theorem] Theorem: Meek Conjecture / Covered Edge Reversal (Chickering 2002, Thm. 2)
> Let $G_1$ and $G_2$ be two Markov equivalent DAGs. Then there exists a sequence
> $G_1 = H_0, H_1, \dots, H_k = G_2$ of DAGs such that:
> - Each $H_t$ and $H_{t+1}$ are Markov equivalent, and
> - $H_{t+1}$ is obtained from $H_t$ by reversing a single **covered edge**.
>
> A **covered edge** $X \to Y$ in $H_t$ satisfies $\text{pa}(X) = \text{pa}(Y) \setminus \{X\}$.
>
> *Significance*: This means the MEC space is "connected" via elementary moves, so GES's
> greedy insert/delete search can reach any MEC from any starting point.
^thm-meek-conjecture

### Comparison with PC

| Dimension | GES | PC |
|-----------|-----|-----|
| **Paradigm** | Score-based (BIC) | Constraint-based (CI tests) |
| **Search object** | CPDAGs | Skeleton → CPDAG |
| **Key assumption** | Score equivalence + faithfulness | Faithfulness + causal sufficiency |
| **Output** | CPDAG | CPDAG |
| **Consistency** | Yes (large $n$) | Yes (large $n$, consistent CI test) |
| **Finite-sample behavior** | BIC penalty controls overfitting | $\alpha$-level controls false edges |
| **Order-dependence** | No | Yes (PC-stable fixes) |
| **Interpretability** | Less (global score changes) | More (each edge = one CI test) |
| **Scalability** | $O(d^4)$ in sparse settings | $O(d^2 \cdot n)$ for fixed degree |

### FCI Extension for Latent Variables

For settings where **causal sufficiency fails** (latent common causes), neither GES nor PC
is appropriate. The RFCI-PAG algorithm (Colombo et al. 2012) combines the score-based
approach with PAG (Partial Ancestral Graph) representations, handling latent variables
correctly.

### Software

```r
# R: pcalg package
library(pcalg)
score <- new("GaussL0penObsScore", X)     # BIC-based score object
ges.fit <- ges(score)
summary(ges.fit)
plot(ges.fit$essgraph)

# FGES (faster, parallel) is available in the TETRAD Java toolbox
```

```python
# Python: causal-learn (Zheng et al. 2023)
from causallearn.search.ScoreBased.GES import ges
record = ges(data, score_func='local_score_BIC')
record['G'].draw_pydot_graph()
```

**FGES** (Fast GES; Ramsey et al. 2017) is a parallelised variant that achieves
$O(d^2)$ scaling in sparse graphs — it is the algorithm called "FGS" in the NOTEARS
benchmark (see [[NOTEARS Experiments]]).

## Connections

- **CPDAG as search object**: GES can only work in CPDAG space because of score equivalence
  (Theorem \ref{thm-score-equiv}) and the Meek conjecture. Both are in [[Markov Equivalence and CPDAGs]].
- **Comparison benchmark**: the [[NOTEARS Experiments]] note benchmarks NOTEARS against
  FGS (Fast GES) — it is the state-of-the-art score-based baseline that NOTEARS matches or
  beats on dense/large graphs.
- **BIC score**: the BIC penalization connects to model selection in [[Overfitting and Information Criteria]]
  and the broader Bayesian model comparison literature in [[Choosing and Building Models]].
- **DAG structure learning problem**: GES solves the same problem as NOTEARS (program (4)
  in [[DAG Structure Learning Problem]]) but via CPDAG search rather than continuous optimization.
- **LLM + BN workflows**: [[BN Construction Methods Comparison]] compares data-driven
  structure learning (GES/PC could serve this role) with expert elicitation methods —
  GES provides the fully automated alternative to the hybrid LLM approach.

## See Also
- [[Markov Equivalence and CPDAGs]] — score equivalence and CPDAG structure (required reading for GES)
- [[PC Algorithm - Overview]] — the constraint-based alternative to GES
- [[V-Structures and Meek Rules]] — Meek rules used inside GES to maintain valid CPDAGs
- [[DAG Structure Learning Problem]] — problem formulation shared by GES and NOTEARS
- [[NOTEARS - Overview]] — continuous optimization approach; GES is its benchmark baseline
- [[NOTEARS Experiments]] — empirical comparison of GES (as FGS) vs. NOTEARS
- [[Overfitting and Information Criteria]] — BIC score in model selection
- [[BN Construction Methods Comparison]] — expert elicitation vs. data-driven structure learning
