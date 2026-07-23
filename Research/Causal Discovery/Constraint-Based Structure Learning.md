---
title: "Constraint-Based Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Kalisch & Bühlmann (2007) — synthesised from training knowledge"
date_ingested: 2026-07-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "Constraint-based causal discovery"
  - "CI-test-based structure learning"
  - "Inductive Causation algorithm"
---

# Constraint-Based Structure Learning

> [!summary]
> **Constraint-based structure learning** recovers a causal DAG from observational data
> by testing for **conditional independences (CIs)** in the data and using the results
> to constrain the skeleton and edge orientations. Under the Markov and faithfulness
> assumptions, every CI in the data corresponds to a d-separation in the true DAG —
> so CI tests directly read off the graph's structure. The output is always a **CPDAG**
> (the Markov Equivalence Class representative), not a unique DAG. The [[PC Algorithm]]
> is the canonical instantiation.

## Overview

Constraint-based methods exploit a bijection between statistical independence statements
in $\mathbb{P}$ and graph-separation statements in $G$ — a bijection that holds under
the combined Markov + faithfulness assumptions. The key insight is that each CI test
$X \perp Y \mid S$ is a *constraint* that eliminates all DAGs where $X$ and $Y$ are
**not** d-separated by $S$. Running enough tests constrains the space of consistent DAGs
to a single Markov equivalence class.

This paradigm is the **oldest** algorithmic approach to structure learning, predating both
NOTEARS ([[NOTEARS - Overview]]) and GES ([[GES - Greedy Equivalence Search]]). Its
advantage over score-based methods: CI tests make no parametric distributional assumption
(any valid CI test works). Its disadvantage: CI test errors compound across the many tests
run during skeleton search, especially in finite samples.

## Main Content

### Foundational assumptions

Constraint-based structure learning rests on two pillars.

> [!definition] Definition: Causal Markov Condition
> Let $G$ be a DAG over variables $V = \{X_1,\dots,X_d\}$. $G$ satisfies the
> **causal Markov condition** with respect to joint distribution $\mathbb{P}$ if
> every variable $X_i$ is conditionally independent of its non-descendants in $G$
> given its parents:
> $$X_i \perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i) \quad \text{in } \mathbb{P}.$$
> Equivalently (via the global Markov property): $X \perp Y \mid S$ in $\mathbb{P}$
> whenever $X$ and $Y$ are d-separated by $S$ in $G$.
^def-markov-condition

> [!definition] Definition: Faithfulness (Causal Stability)
> $\mathbb{P}$ is **faithful** to $G$ if the converse also holds: every CI
> in $\mathbb{P}$ is entailed by a d-separation in $G$:
> $$X \perp Y \mid S \text{ in } \mathbb{P} \implies d\text{-sep}_G(X, Y \mid S).$$
>
> **Consequence**: Combining Markov + faithfulness gives
> $X \perp Y \mid S \text{ in } \mathbb{P} \iff d\text{-sep}_G(X, Y \mid S).$
> This is the key identity that makes CI tests informative about $G$.
^def-faithfulness

Faithfulness can fail in measure-zero parameter settings (e.g., two paths of exactly
opposite sign that cancel out). It is therefore a generic-position assumption, and
checking for near-violations is part of good empirical practice.

### Conditional independence tests

The choice of CI test is the main statistical decision in constraint-based learning.
Different choices impose different distributional assumptions:

| Data type | Test | Statistic | Notes |
|-----------|------|-----------|-------|
| Gaussian, linear | **Fisher's z-test** | $z = \frac{1}{2}\log\frac{1+r_{XY\cdot S}}{1-r_{XY\cdot S}}$; $\sim \mathcal{N}(0,(n-|S|-3)^{-1})$ | Exact for multivariate Gaussian; common default |
| Discrete | **G²-test** | $2\sum O\log(O/E)$; $\chi^2_{df}$ | df = $(|\mathcal{X}|-1)(|\mathcal{Y}|-1)\prod|S|$ |
| Discrete | **Pearson χ²** | $\sum(O-E)^2/E$ | df same as G² |
| Nonparametric | **Kernel HSIC** | Hilbert-Schmidt norm of cross-covariance operator in RKHS | No distributional assumption; high statistical power for nonlinear dependence |
| General | **Mutual information** | $\hat I(X;Y\mid S)$ via density estimation | High variance in small samples |

For **linear Gaussian** data, Fisher's z-test with partial correlation is
asymptotically exact and computationally efficient:

> [!theorem] Fisher's Z-Transform Test for Partial Independence
> Let $r_{XY \cdot S}$ be the sample partial correlation between $X$ and $Y$
> controlling for $S$. Under $H_0: X \perp Y \mid S$ in a Gaussian model:
> $$z_{XY\cdot S} = \frac{1}{2}\log\frac{1+r_{XY\cdot S}}{1-r_{XY\cdot S}}
> \xrightarrow{d} \mathcal{N}\!\left(0,\; \frac{1}{n-|S|-3}\right)$$
> for sample size $n$ and conditioning set size $|S|$. Reject independence
> at level $\alpha$ when $|z_{XY\cdot S}| > z_{\alpha/2}/\sqrt{n-|S|-3}$.
^thm-fisher-z

### Three-phase structure

Every constraint-based algorithm follows the same three-phase template:

**Phase 1 — Skeleton recovery:**
Determine which pairs $(X_i, X_j)$ are adjacent in the true DAG. Two variables
are adjacent iff no separating set $S$ exists (i.e., $X_i \not\perp X_j \mid S$
for all $S \subseteq V \setminus \{X_i, X_j\}$). The algorithm searches for separating
sets of increasing size $|S| = 0, 1, 2, \ldots$ and removes edges when independence
is found, storing $\text{sep}(X_i, X_j) = S$.

**Phase 2 — V-structure (immorality) identification:**
For each **unshielded triple** $X - Z - Y$ (where $X$ and $Y$ are non-adjacent),
test whether $Z \in \text{sep}(X, Y)$:
- If $Z \notin \text{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure).
- If $Z \in \text{sep}(X, Y)$: do not orient (the triple is a chain or fork).

> [!note] Why this works
> In a chain $X \to Z \to Y$ or fork $X \leftarrow Z \to Y$, conditioning on $Z$
> blocks the path, so $X \perp Y \mid Z$ — meaning $Z \in \text{sep}(X,Y)$.
> In a v-structure $X \to Z \leftarrow Y$, $Z$ is **not** in the separating set:
> $X \perp Y$ marginally but $X \not\perp Y \mid Z$ (collider activation / explaining away).
> This asymmetry is the observable signature of v-structures.

**Phase 3 — Meek orientation propagation:**
Apply Meek's four rules (see [[Markov Equivalence and CPDAGs]]) to orient additional
undirected edges, until no more orientations are forced. The result is the CPDAG.

### Statistical consistency

> [!theorem] Consistency of Constraint-Based Learning (Spirtes, Glymour & Scheines 2000; Kalisch & Bühlmann 2007)
> Under the Markov and faithfulness conditions, with **oracle** CI tests (infinite
> sample size, zero error rate), constraint-based algorithms recover the true CPDAG.
>
> In **finite samples** (Kalisch & Bühlmann 2007): the PC algorithm is consistent
> in the high-dimensional regime ($p \gg n$) when the graph has bounded maximum degree $q$,
> the partial correlations are bounded away from zero (signal condition), and the
> CI test significance level $\alpha = O(n^{-\kappa})$ for $\kappa \in (0, 1/2)$.
^thm-consistency

### Computational complexity

With maximum adjacency $q$ (number of neighbours of the most connected node):

- **Skeleton phase**: $O(p^{q+2})$ CI tests (for each of $O(p^2)$ pairs, at most $O(p^q)$ conditioning sets of size $q$).
- For **sparse** graphs ($q$ bounded): $O(p^2)$ edges, each tested with $O(p^q)$ subsets — manageable.
- For **dense** graphs: exponential in $q$ — constraint-based methods are impractical.

This sparsity dependence is the main reason constraint-based methods are preferred in
settings where the true graph is believed sparse (biology, social sciences) and
score-based methods like [[GES - Greedy Equivalence Search]] are preferred in dense settings.

### The order-independence problem (PC-stable)

A practical limitation of the original PC skeleton phase: the algorithm's output can
depend on the **ordering** in which edges are tested and removed. When a finite-sample
CI test mistakenly retains an edge at level $\ell$, subsequent adjacency sets for other
tests change, causing inconsistencies across orderings.

**Fix — PC-stable** (Colombo & Maathuis 2014): Collect all edges to remove at level
$\ell$ **before** removing any of them. This makes the skeleton phase fully
order-independent at the cost of one extra pass per level.

## Connections

- **Score-based alternative**: [[GES - Greedy Equivalence Search]] avoids CI tests entirely
  by maximising a decomposable score over MECs. Less sensitive to distributional assumptions
  on the test; more sensitive to score misspecification.
- **Hybrid approach**: MMHC (Max-Min Hill Climbing) uses constraint-based skeleton recovery
  (MMPC) followed by score-based orientation search — combines advantages of both.
- **NOTEARS paradigm**: [[NOTEARS - Overview]] lists constraint-based methods as one of the
  prior-work camps; its continuous optimization approach is distinct from both.
- **Causal inference assumption**: The faithfulness assumption here directly parallels the
  [[Conditional Independence Assumption]] used in selection-on-observables identification —
  both require the distribution to reflect the causal structure of the graph.

## See Also
- [[Markov Equivalence and CPDAGs]] — why CI tests identify an MEC, not a DAG
- [[PC Algorithm]] — the canonical constraint-based algorithm
- [[GES - Greedy Equivalence Search]] — the score-based alternative
- [[DAG Structure Learning Problem]] — problem setup and landscape of methods
- [[Conditional Independence Assumption]] — related assumption in causal identification
- [[Directed Acyclic Graphs]] — d-separation and DAG semantics underlying constraint-based testing
