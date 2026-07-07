---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-CausalDiscovery-Survey.md]]"
source_location: "Part 2: PC Algorithm; Spirtes, Glymour & Scheines (2000) Ch. 5–6; Colombo & Maathuis (2014)"
date_ingested: 2026-07-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Discovery Algorithms Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC"
  - "PC-stable"
  - "constraint-based causal discovery"
  - "skeleton learning"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991) is the canonical
> **constraint-based** causal structure learning algorithm. It recovers the CPDAG of the
> true DAG from observational data by (1) learning the skeleton via conditional independence
> (CI) tests and (2) orienting edges using v-structure detection and Meek's rules. Under
> faithfulness and causal sufficiency, PC is provably consistent with an oracle CI tester.
> The **PC-stable** variant (Colombo & Maathuis 2014) eliminates order-dependence in the
> skeleton phase, making it reproducible regardless of variable ordering.

## Overview

The PC algorithm represents the **constraint-based paradigm** in causal discovery: it uses
statistical independence tests as constraints to eliminate candidate edges, then orients the
surviving skeleton using graphical rules. The name comes from its inventors, **P**eter Spirtes
and **C**lark Glymour, collaborating with Richard Scheines on the *Causation, Prediction, and
Search* (CPS) framework.

The algorithm's appeal is transparency: every edge removal has an explicit CI test justification,
every orientation has an explicit graphical rule. Its vulnerability is error propagation: each
CI test error at the skeleton stage can cascade into misoriented edges.

## Main Content

### Setup and Assumptions

> [!definition] Definition: PC Algorithm Setup
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$;
> conditional independence oracle $\mathrm{CI}(X \perp\!\!\!\perp Y \mid S)$.
> **Output:** A CPDAG over the $d$ variables.
>
> **Three assumptions required for correctness:**
> 1. **Causal Markov condition** — the true joint $P$ is Markov to the true DAG $G^*$
> 2. **Faithfulness** — $P$ is faithful to $G^*$ (no accidental CIs)
> 3. **Causal sufficiency** — no unmeasured common causes (no hidden confounders)
^def-pc-setup

Causal sufficiency rules out latent variables. When hidden confounders may be present, the
**FCI algorithm** (Fast Causal Inference, Spirtes et al. 2000) extends PC to output a PAG
(Partial Ancestral Graph) that accounts for selection bias and latent variables.

### Phase 1: Skeleton Learning

> [!definition] Definition: PC Skeleton Learning Phase
> The skeleton phase removes edges between conditionally independent variable pairs.
>
> **Algorithm:**
> 1. Initialize: complete undirected graph $\hat{G}$; separation sets $\mathrm{sep}(X,Y) = \emptyset$.
> 2. For each conditioning set size $\ell = 0, 1, 2, \ldots$ until no edge $X - Y$ remains with
>    $|\mathrm{Adj}(\hat{G}, X) \setminus \{Y\}| \geq \ell$:
>    - For each edge $X - Y$ in $\hat{G}$:
>      - For each $S \subseteq \mathrm{Adj}(\hat{G}, X) \setminus \{Y\}$ with $|S| = \ell$:
>        - If CI test accepts $X \perp\!\!\!\perp Y \mid S$ at level $\alpha$:
>          - Remove $X - Y$ from $\hat{G}$; set $\mathrm{sep}(X,Y) = \mathrm{sep}(Y,X) = S$
>          - Break (move to next edge)
> 3. Return skeleton $\hat{G}$ and separation sets $\mathrm{sep}$.
^def-skeleton-phase

**Key design decisions:**
- Conditioning sets only draw from **adjacents** of $X$ (not all other variables), keeping
  $|S|$ small for sparse graphs. This exploits the graphical structure.
- Tests proceed from $\ell = 0$ (marginal independence) upward. Low-order tests are more
  powerful (fewer variables conditioned on); they remove edges early, reducing the conditioning
  sets needed for higher-order tests.
- Stopping condition: once all remaining edges $X - Y$ have at most $\ell$ non-$Y$ adjacents
  of $X$, no larger conditioning set can be formed — terminate.

**Complexity:** With $d$ variables, at most $d^2/2$ pairs, each tested with up to
$\binom{\delta - 1}{\ell}$ subsets at each level, where $\delta$ is the maximum degree.
For sparse graphs ($\delta = O(1)$), the total CI test count is $O(d^2)$. For dense
graphs ($\delta = O(d)$), the worst-case count is exponential.

### CI Test Choices

| Data type | CI test | Statistic |
|-----------|---------|-----------|
| Continuous (Gaussian) | Partial correlation (Fisher Z) | $z = \frac{1}{2}\ln\frac{1+\hat{\rho}}{1-\hat{\rho}}$, asymptotically $\mathcal{N}(0, 1/\sqrt{n-|S|-3})$ |
| Continuous (non-Gaussian) | Kernel-based CI test (KCIT) | MMD-based test statistic |
| Continuous (general) | Invariant causal prediction | See Peters et al. 2016 |
| Discrete | $\chi^2$ / $G^2$ test | Pearson chi-squared on contingency tables |
| Mixed | CMIknn | $k$-nearest-neighbor entropy estimator |

The Fisher Z partial correlation test is by far the most common, but requires the linearity
and Gaussianity assumptions. When these fail, kernel-based tests are more robust at the cost
of much higher computational cost.

### Phase 2: V-Structure Orientation

> [!definition] Definition: V-Structure Orientation Rule
> For every **unshielded triple** $X - Z - Y$ in the skeleton (where $X$ and $Y$ are
> non-adjacent):
> - If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (unshielded collider)
> - If $Z \in \mathrm{sep}(X, Y)$: leave $X - Z - Y$ unoriented
^def-vstructure-orientation

**Intuition:** The separation set $\mathrm{sep}(X, Y)$ is the set $S$ that made $X \perp\!\!\!\perp Y \mid S$.
If $Z$ was *not* in this set, then conditioning on $Z$ would not help explain away the
$X$–$Y$ dependence — in fact, conditioning on a collider $Z$ would *create* dependence.
If $Z$ *was* in the set, $Z$ is a non-collider on the path and should remain unoriented.

### Phase 3: Meek's Orientation Rules

Apply Meek's four rules iteratively until no new orientation is possible; see
[[Markov Equivalence Classes and CPDAGs#^thm-meek-rules|Meek's rules]] for the formal
statements. These rules extend the compelled orientations beyond v-structures by propagating
acyclicity and non-v-structure constraints.

### PC-Stable: Fixing Order-Dependence

The original PC algorithm has an **order-dependence bug** (Colombo & Maathuis 2014):
the skeleton found depends on the order in which edges are tested, because removing an edge
$X - Y$ immediately updates the adjacency set used for subsequent tests on other edges.
Different variable orderings can thus produce different skeletons — a reproducibility failure.

> [!definition] Definition: PC-Stable Algorithm (Colombo & Maathuis 2014, Algorithm 2)
> Modify the skeleton phase so that the graph $\hat{G}$ is **updated only after all pairs have
> been tested at conditioning set size $\ell$**, not after each individual test:
>
> 1. For each $\ell = 0, 1, 2, \ldots$:
>    - For each edge $X - Y$ in current $\hat{G}$: compute the set $C(X,Y)$ of all separating
>      sets of size $\ell$ found in $\mathrm{Adj}(\hat{G}, X) \setminus \{Y\}$ or
>      $\mathrm{Adj}(\hat{G}, Y) \setminus \{X\}$.
>    - **After all pairs tested at level $\ell$**: remove all edges $X - Y$ with
>      $C(X,Y) \neq \emptyset$; set $\mathrm{sep}(X,Y)$ from the first found $S$.
>
> This ensures the adjacency sets used to form conditioning sets are the same for all orderings
> at each level, making the skeleton **order-independent** in the population.
^def-pc-stable

PC-stable also produces an order-independent v-structure orientation via a similar
"collect-then-orient" approach.

### Consistency Theorem

> [!theorem] Theorem: PC Consistency (Spirtes, Glymour & Scheines 2000, Theorem 5.1)
> Assume the Causal Markov condition, Faithfulness, and Causal Sufficiency hold. Then, given
> an **oracle CI tester** (returns exact population CI statements), the PC algorithm outputs
> exactly $\mathrm{CPDAG}(G^*)$ — the CPDAG of the true data-generating DAG $G^*$.
^thm-pc-consistency

**Population vs. finite-sample:** In finite samples, CI tests commit Type I errors (spurious
independence) and Type II errors (missed independence). Both types cascade:
- Type I (remove true edge): skeleton error → misoriented v-structures downstream
- Type II (retain false edge): extra edges → incorrect orientation rules

This is why PC's finite-sample performance degrades with dimension. In contrast,
[[Greedy Equivalence Search (GES)]] directly optimizes a score, which is more robust to
individual test errors.

## Examples

> [!example] Example: Running PC on a 4-Variable DAG
> **True DAG:** $X_1 \to X_2 \to X_4$, $X_3 \to X_2$, $X_3 \to X_4$, no edge $X_1 - X_3$.
>
> **Skeleton phase (ℓ=0):** All 6 marginal independence tests. Assume $X_1 \perp\!\!\!\perp X_3$
> marginally (this holds if there is no path). Remove $X_1 - X_3$.
> All other pairs are marginally dependent. Remaining skeleton: $X_1 - X_2$, $X_2 - X_3$,
> $X_2 - X_4$, $X_3 - X_4$.
>
> **Skeleton phase (ℓ=1):** Test $X_1 \perp\!\!\!\perp X_4 \mid X_2$ and $X_1 \perp\!\!\!\perp X_4 \mid X_3$.
> Both hold: $X_1 \perp\!\!\!\perp X_4 \mid X_2$ (since $X_2$ blocks $X_1 \to X_2 \to X_4$) and
> $X_1 \perp\!\!\!\perp X_4 \mid X_3$ (since $X_3$ blocks $X_1 \leftarrow\!\!\cdot\!\!\to X_4$ path via $X_3$).
> Wait — $X_1$ and $X_3$ have no path except through $X_2$, so $X_1 \perp\!\!\!\perp X_4$ conditional
> on either $X_2$ (which blocks $X_1 \to X_2 \to X_4$) or $X_3$ (via the $X_3 \to X_4$ path
> being blocked). Remove $X_1 - X_4$.
>
> **Final skeleton:** $X_1 - X_2$, $X_2 - X_3$, $X_2 - X_4$, $X_3 - X_4$.
>
> **V-structure phase:** Unshielded triples:
> - $X_1 - X_2 - X_3$: is $X_2 \in \mathrm{sep}(X_1, X_3) = \emptyset$? No → orient $X_1 \to X_2 \leftarrow X_3$. ✓
> - $X_1 - X_2 - X_4$: is $X_2 \in \mathrm{sep}(X_1, X_4) = \{X_2\}$? Yes → leave undirected.
>
> **Meek's rules:** $X_1 \to X_2$ and $X_3 \to X_2$; with $X_2 - X_4$ and $X_3 - X_4$:
> Rule 2 orients $X_3 \to X_4$ (since $X_3 \to X_2 - X_4$ with acyclicity). Eventually
> $X_2 \to X_4$.
>
> **Output CPDAG:** $X_1 \to X_2 \leftarrow X_3 \to X_4 \leftarrow X_2$, matching the true DAG.

## Connections

- **Output representation:** PC's output is a CPDAG — see [[Markov Equivalence Classes and CPDAGs]]
  for the theory of what a CPDAG is and why it is the best possible from observational data.
- **Score-based alternative:** [[Greedy Equivalence Search (GES)]] achieves the same
  CPDAG identification goal via score optimization rather than CI testing. GES is more robust
  to finite-sample errors but requires a scoring function.
- **Continuous optimization:** [[NOTEARS - Overview]] takes a third approach — relaxing the
  combinatorial DAG constraint to a smooth constraint, allowing gradient-based optimization.
- **Hidden confounders:** When causal sufficiency is violated, the FCI algorithm (an extension
  of PC) outputs a PAG instead of a CPDAG, encoding which causal relations remain ambiguous
  due to unmeasured confounders.
- **Software:** `pcalg` package in R (`pc()` function); `causal-learn` Python package (`PC` class).
  TETRAD software (Java/GUI, from CMU) provides a graphical interface.
- **DAG-to-CPDAG context:** PC recovers the same CPDAG that GES targets; the two algorithms
  are complementary approaches to the same identifiable object — see [[Causal Discovery Algorithms Comparison]].

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the output representation and its theory
- [[DAG Structure Learning Problem]] — problem setup and landscape of approaches
- [[Greedy Equivalence Search (GES)]] — score-based algorithm targeting the same CPDAG
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[Causal Discovery Algorithms Comparison]] — practical guidance and tradeoffs
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, causal semantics
- [[Spurious Association and Confounds]] — fork/pipe/collider patterns in causal reasoning
