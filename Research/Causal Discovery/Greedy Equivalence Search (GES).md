---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-CausalDiscovery-Survey.md]]"
source_location: "Part 3: GES; Chickering (2002) JMLR Vol. 3, pp. 507–554"
date_ingested: 2026-07-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Algorithms Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "greedy equivalence search"
  - "Chickering 2002"
  - "FCI"
  - "FGES"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> causal structure learning algorithm. Unlike constraint-based PC, GES never runs CI tests;
> instead it navigates directly over the space of **Markov equivalence classes (CPDAGs)** via
> greedy forward/backward moves guided by a decomposable score (e.g., BIC). Chickering (2002)
> proves GES is **consistent** in the large-sample limit: it recovers the true CPDAG whenever
> the scoring function is locally consistent. GES underpins the FGES parallel implementation
> used in large-scale analyses.

## Overview

GES belongs to the **score-based paradigm** of causal discovery: it defines a score over
DAGs (or equivalently, over CPDAGs) and searches for the highest-scoring structure.

The key innovation in GES is its search space. Earlier score-based methods (hill-climbing,
simulated annealing) searched over the exponentially large space of individual DAGs. GES
instead navigates the space of **Markov equivalence classes (MECs)**, using
graph-theoretic operators that map one MEC to an adjacent MEC while rigorously maintaining
the CPDAG representation. This is why GES is both theoretically principled (it provably
converges to the correct MEC) and computationally efficient (score decomposability means
only local recomputation is needed after each move).

## Main Content

### Decomposable, Locally Consistent Scoring Functions

> [!definition] Definition: Decomposable Scoring Function
> A scoring function $S(G, \mathbf{X})$ is **decomposable** if it factors over nodes:
> $$S(G, \mathbf{X}) = \sum_{j=1}^{d} S_j\!\left(\mathrm{Pa}_G(j),\ \mathbf{X}\right),$$
> where $S_j(\mathrm{Pa}_G(j), \mathbf{X})$ depends only on the data of node $j$ and its
> parents in $G$.
^def-decomposable-score

> [!definition] Definition: Locally Consistent Scoring Function (Chickering 2002, Def. 9)
> A scoring function $S$ is **locally consistent** if, for any DAG $G$ over $d$ nodes,
> any node $X$, and any set $Y \notin \mathrm{Pa}_G(X)$:
> $$X \not\perp\!\!\!\perp Y \mid \mathrm{Pa}_G(X) \implies S(\mathrm{Pa}_G(X) \cup \{Y\}, \mathbf{X}) > S(\mathrm{Pa}_G(X), \mathbf{X}),$$
> $$X \perp\!\!\!\perp Y \mid \mathrm{Pa}_G(X) \implies S(\mathrm{Pa}_G(X) \cup \{Y\}, \mathbf{X}) \leq S(\mathrm{Pa}_G(X), \mathbf{X}).$$
> In words: the score increases when we add a variable that truly belongs in the parent set,
> and decreases (or stays flat) when we add one that does not.
^def-locally-consistent

**BIC as a locally consistent score:**
$$\mathrm{BIC}(G, \mathbf{X}) = \ell(\hat{\theta}_G;\, \mathbf{X}) - \frac{d_f(G)}{2} \log n$$
where $d_f(G)$ is the number of free parameters. BIC is consistent (by BIC model selection
theory) and decomposable, making it the standard choice for GES with Gaussian linear SEMs.

For non-Gaussian continuous data, **BGe** (Bayesian Gaussian equivalent score) and
**BDEU** (for discrete data) are also locally consistent decomposable scores.

### The Insert and Delete Operators

GES searches by applying *operators* that move from one CPDAG to an adjacent CPDAG,
corresponding to adding or removing a single edge.

> [!definition] Definition: Insert Operator (Chickering 2002, Def. 12)
> $\mathrm{Insert}(X, Y, T)$: inserts an edge between $X$ and $Y$ in the current CPDAG,
> orienting $X \to Y$, and simultaneously orienting a set $T$ of undirected neighbors of $Y$
> to point into $Y$.
>
> **Validity condition:** The operator is valid iff:
> 1. $X$ and $Y$ are non-adjacent in the current CPDAG
> 2. $T \subseteq \mathrm{Ne}_H(Y) \setminus \mathrm{Adj}_H(X)$ (undirected neighbors of $Y$
>    that are non-adjacent to $X$)
> 3. The new PDAG remains a valid CPDAG (no directed cycle, no new v-structure inconsistency)
^def-insert-operator

> [!definition] Definition: Delete Operator (Chickering 2002, Def. 14)
> $\mathrm{Delete}(X, Y, H)$: removes the edge between $X$ and $Y$ (whether directed
> $X \to Y$ or undirected $X - Y$), and reorients a set $H \subseteq \mathrm{Ne}_H(Y) \cap
> \mathrm{Adj}_H(X)$ to become directed away from $Y$.
>
> **Validity condition:** $H$ induces a clique in the current CPDAG's undirected component.
^def-delete-operator

**Score change computation:** Because the scoring function is decomposable, the change in
score from an Insert or Delete only requires recomputing $S_j(\mathrm{Pa}(j), \mathbf{X})$
for nodes $j$ whose parent sets change — typically just $Y$ and the nodes in $T$ or $H$.

### The Two-Phase Algorithm

> [!definition] Definition: GES Algorithm (Chickering 2002, Algorithm 1)
> **Phase 1 — Forward (Insert):**
> 1. Start from the empty CPDAG $C_0$ (no edges).
> 2. While any valid $\mathrm{Insert}(X, Y, T)$ increases the score:
>    - Apply the operator with the largest score increase $\Delta S > 0$.
> 3. Return $C_\mathrm{forward}$.
>
> **Phase 2 — Backward (Delete):**
> 1. Start from $C_\mathrm{forward}$.
> 2. While any valid $\mathrm{Delete}(X, Y, H)$ increases the score:
>    - Apply the operator with the largest score increase $\Delta S > 0$.
> 3. Return $C_\mathrm{final}$.
^def-ges-algorithm

**Why two phases?** The forward phase can overfit: it greedily adds edges to increase the
score, potentially adding spurious ones. The backward phase removes edges whose removal
improves the score (indicating they were added in error). The combination is necessary and
sufficient for the consistency theorem — neither phase alone suffices.

### Chickering (2002) Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15)
> Let $P$ be a distribution faithful to a DAG $G^*$ satisfying the Causal Markov condition.
> Let $S$ be a locally consistent, decomposable scoring function. Then in the large-sample
> limit ($n \to \infty$), the CPDAG output by GES is $\mathrm{CPDAG}(G^*)$.
^thm-ges-consistency

**Proof strategy (sketch):**
1. *Forward phase terminates at a supergraph:* In the population, every valid Insert that
   adds a true edge increases the score. The greedy forward phase therefore never stops before
   adding all true edges (it may add some spurious ones too).
2. *Backward phase removes spurious edges:* Every spurious edge added in phase 1 can be
   removed by a valid Delete that increases the score (since the spurious edge's parent set
   contributes a local score decrease in the population).
3. *Termination gives $\mathrm{CPDAG}(G^*)$:* At convergence of both phases, the remaining
   CPDAG maximizes the score — which, under local consistency, equals $\mathrm{CPDAG}(G^*)$.

**Contrast with PC:** PC is consistent given an oracle CI tester but is sensitive to
finite-sample test errors. GES is consistent given a locally consistent score; with BIC
and a Gaussian linear SEM, GES is provably consistent for all $n$ large enough. In practice,
GES typically outperforms PC in the Gaussian setting when $n$ is moderately large ($n \geq 500d$).

### Score Change Formula for BIC (Gaussian Case)

For a Gaussian linear SEM, the local score for node $Y$ given parents $\Pi$ is:
$$S_Y(\Pi, \mathbf{X}) = -\frac{n}{2}\log\hat{\sigma}^2_{Y|\Pi} - \frac{|\Pi|+1}{2}\log n$$
where $\hat{\sigma}^2_{Y|\Pi}$ is the residual variance of regressing $Y$ on $\Pi$.

Adding a new parent $X$ to $\Pi$ changes the score by:
$$\Delta S = -\frac{n}{2}\left(\log\hat{\sigma}^2_{Y|\Pi\cup\{X\}} - \log\hat{\sigma}^2_{Y|\Pi}\right) - \frac{1}{2}\log n$$

The Insert is score-improving iff $\hat{\sigma}^2_{Y|\Pi\cup\{X\}} < \hat{\sigma}^2_{Y|\Pi} \cdot e^{-\log(n)/n}$,
which holds for a true parent $X$ as $n \to \infty$ (consistency) but may not hold for a
spurious $X$ (it gets removed in the backward phase).

### FGES: Parallelised GES at Scale

**FGES** (Fast GES; Ramsey et al. 2017) extends GES to thousands of variables by:
1. Parallelizing score evaluations across pairs $(X, Y)$
2. Only re-evaluating adjacencies that changed after each Insert/Delete
3. Using a priority queue over valid operators, sorted by $\Delta S$

FGES is available in the **TETRAD** software package (tetrad.cmu.edu) and the `causal-learn`
Python package. It scales to $d = 1000$ variables in reasonable time.

## Examples

> [!example] Example: GES on a 3-Variable Chain
> **True DAG:** $X_1 \to X_2 \to X_3$. True CPDAG: $X_1 - X_2 - X_3$ (chain, no v-structure).
>
> **Forward phase:**
> Start: empty graph. Best Insert: Insert($X_1$, $X_2$, $\emptyset$) — adds $X_1 \to X_2$
> with $\Delta S > 0$ (since $X_1$ and $X_2$ are dependent). Apply.
> Next best: Insert($X_2$, $X_3$, $\emptyset$) — adds $X_2 \to X_3$. Apply.
> Check Insert($X_1$, $X_3$, $\emptyset$): $X_1 \perp\!\!\!\perp X_3 \mid X_2$, so BIC score
> decreases (or stays flat) for adding $X_1 \to X_3$. Do not apply.
> Forward phase returns: $X_1 \to X_2 \to X_3$.
>
> **Backward phase:**
> Check all valid Deletes. Delete($X_1$, $X_2$, $\emptyset$) — removes $X_1 - X_2$:
> score decreases (true edge). Delete($X_2$, $X_3$, $\emptyset$): score decreases. No delete
> is score-improving. Backward phase does nothing.
>
> **Output CPDAG:** $X_1 - X_2 - X_3$ (after converting $X_1 \to X_2 \to X_3$ to CPDAG,
> since there is no v-structure; both edges become undirected). ✓

> [!example] Example: GES Removes a Spurious Edge Added in Forward Phase
> **True DAG:** $X_1 \to X_2 \leftarrow X_3$ (v-structure; $X_1, X_3$ non-adjacent).
>
> **Forward phase:**
> Insert($X_1$, $X_2$, $\emptyset$): $\Delta S > 0$. Insert($X_3$, $X_2$, $\emptyset$): $\Delta S > 0$.
> Now Insert($X_1$, $X_3$, $\{X_2\}$): because $X_1$ and $X_3$ are marginally dependent
> (both are parents of $X_2$, creating a v-structure), the forward phase may add $X_1 - X_3$.
>
> **Backward phase:**
> Delete($X_1$, $X_3$, $\emptyset$): since $X_1 \perp\!\!\!\perp X_3$ in $P$ (no direct path),
> removing $X_1 - X_3$ increases the BIC score. Apply delete.
>
> **Output CPDAG:** $X_1 \to X_2 \leftarrow X_3$ (v-structure preserved). ✓

## Connections

- **Output representation:** GES outputs a CPDAG — exactly the same target as PC. See
  [[Markov Equivalence Classes and CPDAGs]] for the theory.
- **Contrast with PC:** PC uses CI tests and processes the data one independence at a time;
  GES uses a global score and jointly considers all edges. PC is faster for very sparse graphs
  with an accurate CI oracle; GES is more robust in finite samples and in dense graphs.
- **NOTEARS comparison:** [[NOTEARS - Overview]] solves a continuous relaxation of the same
  problem (finding a sparse DAG) but does not navigate MECs and has no asymptotic consistency
  guarantee of this type. NOTEARS outputs a single DAG (not a CPDAG); GES outputs the MEC.
- **Decomposable score connection:** The decomposability of BIC means GES score changes reduce
  to simple OLS regressions — see [[DAG Structure Learning Problem]] for the LS score that
  NOTEARS uses, which is the same local score GES updates.
- **ABM calibration:** The output CPDAG from GES (or PC) run on ABM simulation output provides
  the causal skeleton that can be used for structural inference — see gap discussion connecting
  to [[Approximate Bayesian Computation for ABMs]] and [[Summary Causal DAGs]].

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the output representation and Verma–Pearl theorem
- [[DAG Structure Learning Problem]] — problem landscape and score formulation
- [[PC Algorithm]] — constraint-based algorithm for the same identifiable target
- [[NOTEARS - Overview]] — continuous-optimization alternative (outputs DAG, not CPDAG)
- [[Causal Discovery Algorithms Comparison]] — practical guidance on PC vs GES vs NOTEARS
- [[Directed Acyclic Graphs]] — causal DAG semantics
- [[Summary Causal DAGs]] — downstream use of learned causal structures
