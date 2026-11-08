---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000), Causation, Prediction, and Search, 2nd Ed., MIT Press; Spirtes & Glymour (1991), Statistics and Computing 1:65–74 [PDFs not downloaded — network restricted]"
source_location: "SGS (2000) Ch. 5–6; Spirtes & Glymour (1991) §2–4"
date_ingested: 2026-11-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "SGS algorithm"
  - "constraint-based causal discovery"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991; fully developed in
> Spirtes, Glymour & Scheines 2000) is the foundational **constraint-based** algorithm for
> causal structure learning. It recovers the skeleton of the true DAG by systematically
> testing for conditional independence (CI) among pairs of variables, then orients
> v-structures and propagates orientations via Meek's rules to produce a **CPDAG**.
> PC is statistically consistent under the **faithfulness** assumption and polynomial in
> the number of nodes when the true graph has bounded degree.

## Overview

Constraint-based discovery takes a **hypothesis-testing** view: a CI relation
$X \perp\!\!\!\perp Y \mid S$ in the data implies (under faithfulness) a d-separation in the
true DAG, hence the absence of a direct edge $X - Y$ given $S$. The PC algorithm exploits this
to prune an initially complete graph, then orients the remaining edges as far as possible.

The name "PC" refers to the developers: **P**eter Spirtes and **C**lark Glymour. The algorithm
was seminal in that it demonstrated polynomial-time identification of the CPDAG is possible
when the graph is sparse. It competes with score-based methods ([[GES - Greedy Equivalence Search]])
and continuous optimization approaches ([[NOTEARS - Overview|NOTEARS]]), and is the prototype for
many later constraint-based algorithms (FCI, RFCI, PCMCI).

## Main Content

### The three phases of PC

#### Phase 1 — Skeleton Recovery (CI testing)

> [!definition] Algorithm: PC Phase 1 — Skeleton Recovery
> **Input:** Data $\mathbf{X}$ over $(X_1, \ldots, X_d)$; a CI oracle $\text{CI}(X_i, X_j \mid S)$
> (in practice: a statistical test at level $\alpha$).
>
> **Algorithm:**
> 1. Initialize: set $\hat{G}$ to the **complete undirected graph** $K_d$.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X_i, X_j)$ in $\hat{G}$:
>      - For each $S \subseteq \text{Adj}_{\hat{G}}(X_i) \setminus \{X_j\}$ with $|S| = \ell$:
>        - If $\text{CI}(X_i, X_j \mid S)$: remove edge $X_i - X_j$ from $\hat{G}$;
>          record $\text{SepSet}(X_i, X_j) \leftarrow S$; **break** (move to next pair).
>    - If no edge was removed in this round: **stop**.
>
> **Output:** Skeleton $\hat{G}$ and separation sets $\text{SepSet}(X_i, X_j)$ for all removed edges.
^alg-pc-skeleton

The separation set $\text{SepSet}(X_i, X_j)$ records *why* the edge was removed — the
conditioning set that makes $X_i$ and $X_j$ conditionally independent. It is used in Phase 2
to orient v-structures.

> [!note] Complexity and the bounded-degree assumption
> In the worst case, Phase 1 tests exponentially many CI relations. However, if every node has
> true degree at most $k$ (a **degree bound**), only $O\binom{d-1}{\leq k}$ sets $S$ need be
> tested per pair — polynomial in $d$ for fixed $k$. This is why PC is typically applied to
> **sparse** graphs. The worst case with no degree bound is exponential.

#### Phase 2 — V-structure Orientation

> [!definition] Algorithm: PC Phase 2 — V-structure Orientation
> For every **unshielded triple** $X_i \!-\! X_k \!-\! X_j$ (where $X_i$ and $X_j$ are
> not adjacent):
> - If $X_k \notin \text{SepSet}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$
>   (a **v-structure / immorality**).
> - Otherwise: leave $X_i \!-\! X_k \!-\! X_j$ undirected.
>
> **Justification:** $X_i \perp\!\!\!\perp X_j \mid S$ was established with $X_k \notin S$,
> meaning conditioning on $X_k$ **activates** (opens) the path $X_i - X_k - X_j$. This
> is the signature of a collider: $X_k$ is a collider on this path.
^alg-pc-vstructure

#### Phase 3 — Meek's Orientation Rules

Apply [[Markov Equivalence and CPDAGs#^def-meek-rules|Meek's four rules]] repeatedly to the
partially oriented graph until no new orientations can be added. The result is the CPDAG of
the true underlying DAG's Markov equivalence class.

> [!definition] Full PC Algorithm (summary)
> **PC** $({\bf X}, \alpha)$:
> 1. Run Phase 1 to recover skeleton + separation sets.
> 2. Run Phase 2 to orient v-structures.
> 3. Apply Meek's rules (R1–R4) to exhaustion.
>
> **Output:** CPDAG $\hat{\mathcal{E}}$.
^alg-pc-full

### Statistical properties

> [!theorem] Theorem: Consistency of PC (Spirtes et al. 2000; Meek 1995)
> Let $P$ be a distribution **faithful** to a DAG $G$ over $(X_1,\ldots,X_d)$. If the CI
> oracle is **perfect** (no errors), then PC outputs the **CPDAG of $G$** exactly.
>
> In the finite-sample setting, if each CI test has vanishing Type I and Type II error rates
> as $n \to \infty$, then PC is **consistent**: $\hat{\mathcal{E}} \xrightarrow{P} \mathcal{E}(G)$
> as $n \to \infty$.
^thm-pc-consistency

**What "faithful" buys:** Faithfulness means every CI in $P$ corresponds to a d-separation in $G$.
Under faithfulness, every removed edge corresponds to a genuine absence in $G$, and every remaining
edge is genuinely present. Without faithfulness, edge removal can be incorrect.

### CI tests in practice

The choice of CI test drives PC's performance. Common choices:

| Data type | Test | Null hypothesis |
|-----------|------|----------------|
| Continuous, Gaussian | Partial correlation test: $\rho_{XY|S} = 0$ (Fisher's $z$-transform) | $X \perp\!\!\!\perp Y \mid S$ under bivariate normality |
| Discrete | $\chi^2$ or $G^2$ test | $X \perp\!\!\!\perp Y \mid S$ in multinomial model |
| Nonparametric | Kernel-based CI tests (KCIT, HSIC; Zhang et al. 2012) | $X \perp\!\!\!\perp Y \mid S$ nonparametrically |
| Time series | PCMCI (Runge et al. 2019): lagged CI tests | Temporal version of PC |

For Gaussian data, the Fisher $z$-test is:
$$z(X_i, X_j \mid S) = \frac{1}{2}\ln\frac{1+\hat\rho_{ij|S}}{1-\hat\rho_{ij|S}},
\qquad \sqrt{n - |S| - 3}\,z \sim \mathcal{N}(0,1)$$
where $\hat\rho_{ij|S}$ is the **partial correlation** of $X_i$ and $X_j$ given $S$.

### PC-stable and order-dependence

A known limitation of the original PC is **order-dependence**: the skeleton recovered can depend
on the order in which edges are tested, because the adjacency sets used to form conditioning
sets shrink as edges are removed.

> [!note] PC-stable (Colombo & Maathuis 2014)
> **PC-stable** fixes order-dependence by separating the CI testing phase:
> - In each round $\ell$, store all edges to be removed *without* actually removing them.
> - Remove all stored edges simultaneously at the end of each round.
> This ensures the adjacency sets used in round $\ell$ are the same regardless of the
> order pairs are tested. PC-stable is the recommended default over original PC.

## Limitations

1. **Faithfulness required:** Violations (e.g., exact cancellation of paths) can cause PC to
   incorrectly remove edges or fail to identify v-structures.
2. **Exponential worst case:** Without a degree bound, Phase 1 is exponential in $d$.
3. **Multiple testing:** At level $\alpha$, Phase 1 runs $O(d^2 2^d)$ tests in the worst case,
   causing inflated family-wise error rate. Bonferroni correction is conservative; $\alpha$ is
   typically chosen by cross-validation.
4. **Latent variables:** PC assumes **causal sufficiency** — no unmeasured common causes. The
   **FCI algorithm** (Fast Causal Inference; Spirtes et al. 2000) relaxes this, outputting a
   **PAG** (Partial Ancestral Graph) that represents uncertainty from latent variables.
5. **Linear Gaussian assumption of CI tests:** Partial-correlation tests assume Gaussian data.
   Violations can be handled with nonparametric CI tests at higher computational cost.

## Connections

- **Comparison to GES:** GES ([[GES - Greedy Equivalence Search]]) is score-based and
  searches over CPDAGs; PC is constraint-based and searches over skeletons. GES tends to be
  more accurate in the low-$d$, large-$n$ regime; PC scales better to sparse high-$d$ settings.
  NOTEARS provides a third approach via continuous optimization.
- **Comparison to NOTEARS:** NOTEARS works in DAG space (not CPDAG space) and does not require
  CI tests — it directly optimizes a score. See [[NOTEARS Experiments]] for a head-to-head
  comparison where NOTEARS matches or exceeds PC and GES on SHD.
- **FCI / RFCI:** FCI extends PC to allow latent confounders and selection bias, outputting PAGs.
  RFCI (Colombo et al. 2012) is a computationally efficient variant.
- **PCMCI:** Extends PC to time-series causal discovery with lagged edges (Runge et al. 2019).

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG structure, v-structures, Meek's rules
- [[GES - Greedy Equivalence Search]] — score-based alternative to PC
- [[DAG Structure Learning Problem]] — the broader problem context
- [[NOTEARS Experiments]] — empirical comparison including PC as a baseline
- [[Directed Acyclic Graphs]] — d-separation and the graphical semantics underlying CI tests
- [[Spurious Association and Confounds]] — collider, fork, pipe structures
