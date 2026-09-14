---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Chickering (2002) — Optimal Structure Identification With Greedy Search, JMLR 3:507-554"
source_location: "§3 Preliminaries, §4 GES algorithm, §5 Consistency, §7 Experiments"
date_ingested: 2026-09-14
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
  - "FGS"
  - "Fast Greedy Search"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES - Greedy Equivalence Search

> [!summary]
> **Greedy Equivalence Search (GES)** (Chickering, 2002) is a **score-based** causal structure
> learning algorithm. Rather than searching over individual DAGs, it searches directly over the
> space of **Markov equivalence classes** (CPDAGs), using score-improving operators. Two phases
> — Forward Equivalence Search (FES: add edges) then Backward Equivalence Search (BES: remove
> edges) — provably recover the true CPDAG in the large-sample limit (under faithfulness,
> causal sufficiency, and a consistent score like BIC). GES avoids CI testing entirely, makes
> no tuning-parameter choices about significance levels, and scales better than [[PC Algorithm]]
> on high-dimensional sparse graphs.

## Overview

GES reframes structure learning as **greedy search in the space of Markov equivalence classes**.
Each search state is a CPDAG, and transitions are valid operators (Insert/Delete) that move from
one CPDAG to an adjacent one by a single edge addition or removal. Because the score is
**decomposable** (sums over nodes), each transition requires only *local* re-scoring.

The theoretical cornerstone is the **Meek Conjecture**, proved by Chickering (2002) as
Theorem 15 ([[#^thm-meek-conjecture]]): any two DAGs can be connected by a sequence of
covered-edge reversals and edge insertions, with each step improving the independence
structure. This guarantees that the FES phase can always reach the true DAG from the empty
graph, and BES can always return from an over-fitted CPDAG to the true one.

## Main Content

### Assumptions

> [!info] Assumptions required by GES
> 1. **Acyclicity**: the true structure is a DAG.
> 2. **Causal Markov condition**: distribution factorises over the DAG
>    (see [[Markov Equivalence and CPDAGs#^def-markov]]).
> 3. **Faithfulness**: CIs in the data correspond to d-separations
>    (see [[Markov Equivalence and CPDAGs#^def-faithfulness]]).
> 4. **Causal sufficiency**: no latent confounders
>    (see [[Markov Equivalence and CPDAGs#^def-causal-sufficiency]]).
> 5. **Decomposable score**: $Q(\mathsf{G}) = \sum_i Q_i(X_i, \mathrm{pa}(X_i))$.

### Score Function

GES requires a **locally consistent decomposable score** — a score that: (i) factors over
nodes, (ii) preferentially assigns a higher score to the true parent set, and (iii) penalises
overfit. The standard choice is **BIC**:

> [!definition] Definition: BIC Score (Schwarz, 1978; Chickering, 2002 §3)
> For Gaussian data with $n$ observations and $d$ variables:
> $$\mathrm{BIC}(\mathsf{G}) = \sum_{i=1}^d \mathrm{BIC}_i(X_i, \mathrm{pa}_\mathsf{G}(X_i))
>   = \sum_{i=1}^d \left[\log \hat{L}_i - \frac{|{\mathrm{pa}_\mathsf{G}(X_i)|+1}}{2}\log n\right],$$
> where $\hat{L}_i$ is the maximised Gaussian conditional likelihood of $X_i$ given its parents.
>
> For Gaussian data: $\mathrm{BIC}_i = -\frac{n}{2}\log \hat{\sigma}^2_i - \frac{|\mathrm{pa}(X_i)|+1}{2}\log n$
> where $\hat{\sigma}^2_i$ is the residual variance from regressing $X_i$ on its parents.
^def-bic

**Decomposability advantage:** Because $\mathrm{BIC}$ sums over nodes, only the local term
$\mathrm{BIC}_i$ changes when $X_i$'s parents change. This enables **score caching** —
FGS ([Ramsey et al., 2016]) exploits this to re-score only affected nodes at each step.

### Phase 1: Forward Equivalence Search (FES)

> [!example] Algorithm: FES
> **Start:** Empty CPDAG $\mathsf{H}_0$ (no edges), score $Q(\mathsf{H}_0)$.
>
> Repeat until convergence:
> 1. For every ordered pair $(X, Y)$ not adjacent in $\mathsf{H}$ and every valid
>    subset $T \subseteq \mathsf{NA}_{YX} \cap \mathsf{Ne}_\mathsf{H}(Y)$ (clique condition):
>    - Compute score gain $\Delta_\mathrm{ins}(X, Y, T) = Q\!\left(\mathsf{H} \oplus \mathrm{Insert}(X,Y,T)\right) - Q(\mathsf{H})$.
> 2. Select the highest-gain Insert with $\Delta_\mathrm{ins} > 0$.  Apply it.
> 3. Update $\mathsf{H}$ to the resulting CPDAG.
>
> **Terminate** when no Insert yields $\Delta_\mathrm{ins} > 0$.  Output $\mathsf{H}_\mathrm{FES}$.
^alg-fes

**Insert operator** $\mathrm{Insert}(X, Y, T)$: adds directed edge $X \to Y$ to a representative
DAG of $\mathsf{H}$, where $T \subseteq \mathsf{NA}_{YX}^{\mathsf{H}} \cap \mathrm{Ne}_{\mathsf{H}}(Y)$
must form a clique in $\mathsf{H}$ (ensures no new v-structure is created), then converts the
result to a CPDAG. $\mathsf{NA}_{YX}$ denotes the vertices adjacent to both $Y$ and $X$ (the
"neighbour-adjacent" set of $Y$ w.r.t. $X$).

### Phase 2: Backward Equivalence Search (BES)

> [!example] Algorithm: BES
> **Start:** $\mathsf{H}_\mathrm{FES}$ from Phase 1.
>
> Repeat until convergence:
> 1. For every edge $(X, Y)$ in $\mathsf{H}$ and every valid
>    subset $H \subseteq \mathsf{NA}_{YX}^\mathsf{H} \setminus \mathsf{Ne}_\mathsf{H}(X)$:
>    - Compute $\Delta_\mathrm{del}(X, Y, H) = Q\!\left(\mathsf{H} \ominus \mathrm{Delete}(X,Y,H)\right) - Q(\mathsf{H})$.
> 2. Select the highest-gain Delete with $\Delta_\mathrm{del} > 0$. Apply it.
> 3. Update $\mathsf{H}$ to the resulting CPDAG.
>
> **Terminate** when no Delete yields positive gain. **Output** $\mathsf{H}_\mathrm{GES}$.
^alg-bes

**Delete operator** $\mathrm{Delete}(X, Y, H)$: removes edge $X - Y$ (or $X \to Y$) from a
representative DAG of $\mathsf{H}$, where $H \subseteq \mathsf{NA}_{YX}^{\mathsf{H}} \setminus \mathrm{Ne}_{\mathsf{H}}(X)$
must form a clique; the condition ensures the deletion is "clique-valid" in the CPDAG sense.

> [!note] Why two phases?
> FES can include spurious edges that are justified by the empty starting graph's score but
> are incorrect in the true CPDAG. BES removes them by testing score-improvement under deletion.
> The two-phase structure mirrors forward–backward model selection in regression: FES is like
> forward stepwise entry, BES is like backward stepwise removal.

### Theoretical Foundation: The Meek Conjecture

> [!theorem] Theorem 15: Meek Conjecture (Chickering, 2002)
> Let $G$ and $H$ be DAGs such that $H$ is an **independence map** of $G$ (every
> d-separation in $H$ is also a d-separation in $G$, meaning $H$ encodes a *subset* of the
> independencies of $G$). Then there exists a sequence of **covered edge reversals** and
> **edge insertions** from $G$ to $H$ such that each intermediate graph remains an
> independence map of $G$.
>
> A **covered edge** $X \to Y$ satisfies $\mathrm{pa}(Y) = \mathrm{pa}(X) \cup \{X\}$.
^thm-meek-conjecture

**Consequence:** Starting from the empty DAG, FES can reach a DAG that is an independence
map of *any* target DAG — including the true one. Starting from any DAG, BES can reach the
true DAG by successive deletions. Together they guarantee completeness: no equivalence class
is unreachable. This is the result that justifies the two-phase greedy strategy.

> [!theorem] Consistency of GES (Chickering, 2002)
> Under acyclicity, CMC, faithfulness, causal sufficiency, and with the BIC score (or any
> locally consistent decomposable score), GES returns the **true CPDAG** of the
> data-generating distribution in the large-sample limit ($n \to \infty$).
^thm-ges-consistent

### FGS: Fast GES Implementation

**FGS** (Fast Greedy (equivalence) Search; Ramsey et al., 2016) is an efficient implementation of
GES with two optimisations:
1. **Score caching**: local scores $Q_i(X_i, \mathrm{pa}(X_i))$ are cached and recomputed only
   when $X_i$'s parents change.
2. **Lookup tables** for the clique validity condition of each Insert/Delete candidate.

FGS is the primary baseline in [[NOTEARS Experiments]], labelled "FGS" throughout that paper.
NOTEARS matches FGS on sparse graphs and outperforms it on dense and large graphs.

### Comparison with PC Algorithm

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (decomposable score) |
| Starting point | Complete graph (removes edges) | Empty graph (adds, then removes edges) |
| Output | CPDAG | CPDAG |
| Assumptions | Faithfulness + causal sufficiency + correct CI tests | Faithfulness + causal sufficiency + consistent score |
| Complexity | $O(d^{k_{\max}+2})$ in sparse graphs | $O(d^2)$ score evaluations per step; BIC: $O(n)$ per eval |
| Order-dependence | Yes (classic PC); No (PC-stable) | No (score is objective) |
| Tuning | Significance level $\alpha$ | BIC penalty (fixed; no tuning) |
| Finite-sample performance | Sensitive to $\alpha$ choice | Sensitive to score consistency rate |
| Software | `pcalg::pc()`, `causal-learn::PC` | `pcalg::ges()`, `causal-learn::GES` |

GES is generally preferred when:
- CI tests are unreliable (non-Gaussian, mixed, or small $n$).
- The graph is dense (many conditioning sets are needed in PC).
- A consistent score is readily available.

PC is preferred when:
- CI testing is cheap and reliable (large $n$, Gaussian data).
- The graph is very sparse (PC terminates early).
- Interpretability of the CI-test evidence is desired.

## Software

| Package | Language | Function | Notes |
|---------|----------|---------|-------|
| `pcalg` | R | `ges()` | Reference implementation; supports BIC, BDe, BGe |
| `causal-learn` | Python | `GES` | Supports multiple scores; active development |
| `TETRAD` | Java/GUI | `GES`, `FGS` | Ramsey et al.'s reference FGS implementation |
| `bnlearn` | R | — | BN-focused; uses `hc()` (hill-climbing, related) |

## Connections

- **[[Markov Equivalence and CPDAGs]]**: GES operates entirely in CPDAG space — each Insert and
  Delete move from one CPDAG to an adjacent one via score-improving operators. The Meek Conjecture
  proves completeness in this space.
- **[[PC Algorithm]]**: the constraint-based counterpart; both return CPDAGs under the same
  conditions in the large-sample limit. GES avoids CI testing and is order-independent by design.
- **[[NOTEARS - Overview]]** and **[[NOTEARS Experiments]]**: NOTEARS competes with FGS (fast GES)
  as its primary baseline; NOTEARS matches FGS on sparse graphs and outperforms it on dense/large
  graphs where GES's equivalence-class search space becomes large.
- **[[DAG Structure Learning Problem]]**: GES addresses program (4) — the traditional combinatorial
  score-based learning problem. The BIC score used in GES corresponds to the score functions $Q$
  in that problem formulation.
- **[[Approximate Bayesian Computation for ABMs]]**: GES-style score maximisation is conceptually
  related to minimising a discrepancy between model-implied and data-observed statistics — the
  ABM calibration analogue.
- **[[Method of Simulated Moments]]**: decomposable scores (like BIC) are related to the
  moment-matching objective in SMM; structural estimation of ABMs via SMM shares the "match
  model output to observed features" logic.

## See Also
- [[Markov Equivalence and CPDAGs]] — the equivalence class space GES searches
- [[PC Algorithm]] — constraint-based counterpart; same CPDAG output under same assumptions
- [[NOTEARS - Overview]] — continuous-optimization alternative; empirically compared vs FGS
- [[NOTEARS Experiments]] — empirical results where FGS is the main baseline
- [[DAG Structure Learning Problem]] — problem formulation and prior-method landscape
