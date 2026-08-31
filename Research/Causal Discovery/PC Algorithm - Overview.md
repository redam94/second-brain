---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-CPS.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5–6; Kalisch & Bühlmann (2007, JMLR 8:613–636)"
date_ingested: 2026-08-31
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[CPDAG and Markov Equivalence]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Causal Discovery Methods - Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "Spirtes Glymour 1991"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter–Clark, Spirtes & Glymour 1991; Spirtes, Glymour & Scheines
> 2000) is the foundational **constraint-based** algorithm for causal discovery. It recovers
> the **CPDAG** of the true DAG by testing for conditional independences: first constructing
> the undirected skeleton by removing edges between conditionally independent variable pairs,
> then orienting edges by identifying v-structures and applying Meek's rules. Under
> **causal faithfulness** and causal sufficiency, PC is sound and complete — it returns the
> correct CPDAG in the large-sample limit. Its computational complexity is exponential in
> the maximum degree $q$ of the true DAG but polynomial in $d$ for sparse graphs.

## Overview

Constraint-based algorithms take a fundamentally different approach to structure learning
than score-based methods ([[GES - Greedy Equivalence Search]]) and continuous optimization
([[NOTEARS - Overview]]). Instead of optimizing a score, they directly test whether pairs
of variables are **conditionally independent** given various conditioning sets — exploiting
the d-separation structure of the true DAG.

The PC algorithm is the most widely used constraint-based method. Its name honours the
initials of its creators, Peter Spirtes and Clark Glymour. The algorithm requires:

1. **A conditional independence oracle** (or test) that, for any variables $X, Y$ and
   set $S$, answers: "Is $X \perp\!\!\!\perp Y \mid S$?"
2. **Two structural assumptions**: the Markov condition and faithfulness.

The algorithm outputs a [[CPDAG and Markov Equivalence|CPDAG]], the canonical representation
of the Markov equivalence class of the true DAG.

## Main Content

### Structural Assumptions

> [!definition] Causal Markov Condition
> A DAG $G$ over $V$ satisfies the **Causal Markov Condition** for distribution $P$ if every
> variable $X \in V$ is conditionally independent of its non-descendants given its parents:
> $$X \perp\!\!\!\perp \mathrm{NonDesc}(X) \mid \mathrm{Pa}(X).$$
> Equivalently: $P$ is Markov with respect to $G$ (the d-separation criterion holds).
^def-markov

> [!definition] Causal Faithfulness (Spirtes et al. 2000)
> Distribution $P$ is **faithful** to DAG $G$ if every conditional independence in $P$
> is entailed by d-separation in $G$:
> $$X \perp\!\!\!\perp_P Y \mid S \implies X \perp\!\!\!\perp_G Y \mid S.$$
> Faithfulness rules out "accidental" cancellations where path effects cancel to zero.
> Under faithfulness, *all and only* the independences in $P$ are the d-separation statements
> of $G$ — meaning conditional independence tests can recover the skeleton exactly.
^def-faithfulness

> [!definition] Causal Sufficiency
> A set of observed variables $V$ is **causally sufficient** if every common cause of two
> or more variables in $V$ is itself in $V$ — i.e., there are no unobserved confounders.
> PC assumes causal sufficiency. The **FCI algorithm** relaxes this assumption.
^def-sufficiency

### Algorithm

> [!theorem] PC Algorithm (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000)
>
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times d}$, conditional independence test CI.
>
> **Phase 1: Skeleton Learning**
> 1. Start with the complete undirected graph $H$ on $d$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$ in $H$:
>      - Find all subsets $S \subseteq \mathrm{Adj}(X) \setminus \{Y\}$ with $|S| = \ell$.
>      - If $\text{CI}(X, Y \mid S)$ — i.e., $X \perp\!\!\!\perp Y \mid S$ — then:
>        - Remove edge $(X, Y)$ from $H$.
>        - Record $\mathrm{Sep}(X, Y) = S$ (the separating set).
>        - Break (move to next pair).
>    - Terminate when no adjacent pair has $|\mathrm{Adj}(X) \setminus \{Y\}| \geq \ell$.
>
> **Phase 2: V-Structure Orientation**
> - For each unshielded triple $X - Z - Y$ (where $X \not\sim Y$):
>   - If $Z \notin \mathrm{Sep}(X, Y)$, orient as $X \to Z \leftarrow Y$ (v-structure).
>
> **Phase 3: Meek Orientation Rules**
> - Repeatedly apply Meek's rules R1–R4 (see [[CPDAG and Markov Equivalence#^def-meek-rules]])
>   until no more orientations can be made.
>
> **Output:** CPDAG $\hat{\mathcal{C}}$ over $V$.
^alg-pc

> [!note] Why start from the complete graph and delete?
> PC runs conditional independence tests in order of increasing conditioning set size $\ell$.
> This exploits the **Markov blanket property**: if $X$ and $Y$ are d-separated, the
> separating set $S$ has size at most $\max_v |\mathrm{Pa}(v)|$ (the maximum in-degree of the
> true DAG). Starting from $\ell = 0$ (unconditional test) and increasing $\ell$ avoids
> testing large conditioning sets for most pairs.

### Correctness

> [!theorem] Soundness and Completeness of PC (Spirtes et al. 2000; Meek 1995)
> Under causal sufficiency, the Markov condition, and faithfulness, the PC algorithm with
> an oracle conditional independence test returns the **true CPDAG** of the data-generating
> DAG $G^*$:
> $$\hat{\mathcal{C}} = \mathcal{C}(G^*) \quad \text{(in the large-sample limit)}.$$
>
> **High-dimensional consistency** (Kalisch & Bühlmann 2007): PC remains consistent even
> when $d \gg n$, provided:
> - The maximum neighborhood size $q$ is bounded: $|\mathrm{Adj}(X)| \leq q$ for all $X$,
> - The CI test has appropriate type-I error control,
> - $n, d$ satisfy $(\log d)^2 = o(n^{1/(2q+2)})$.
^thm-pc-correctness

### Conditional Independence Tests

The CI oracle is replaced in practice by a statistical test. Common choices:

| Setting | Test | Null | Parameter |
|---------|------|------|-----------|
| Gaussian data | Fisher's $z$-test on partial correlations | $\rho_{XY\cdot S} = 0$ | Significance level $\alpha$ |
| Discrete data | $G^2$ or $\chi^2$ test on contingency tables | $X \perp\!\!\!\perp Y \mid S$ | $\alpha$ |
| Non-parametric | Kernel-based CI tests (KCI, HSIC) | $\text{HSIC}(X, Y \mid S) = 0$ | $\alpha$, bandwidth |
| Mixed data | Generalized Covariance Measure (GCM) | residual covariance $= 0$ | $\alpha$ |

For **Gaussian** $P$: $X \perp\!\!\!\perp Y \mid S \iff \rho_{XY \cdot S} = 0$, where $\rho_{XY \cdot S}$
is the partial correlation. The Fisher $z$-transform converts: $z = \frac{1}{2}\log\frac{1+\hat\rho}{1-\hat\rho}$,
and $\sqrt{n - |S| - 3}\,|z| \approx \mathcal{N}(0,1)$ under the null.

### Complexity

- **Number of CI tests**: $O\!\left(\binom{d}{2} \binom{d-2}{q}\right) = O(d^{q+2}/q!)$ where $q$ is the
  maximum neighborhood size in the skeleton.
- **Per-test cost**: for partial correlations, $O(q^3)$ (inverting the $q \times q$ sub-matrix).
- **Total**: $O(d^{q+2} q^3 / q!)$ — polynomial in $d$ for fixed $q$, but exponential in $q$.
- For **dense** graphs ($q = O(d)$), PC is exponentially expensive; [[NOTEARS - Overview]]
  and [[GES - Greedy Equivalence Search]] are preferable.

### Order-Dependence Issue

A practical limitation: the PC algorithm's output can depend on the **order** in which
variables are presented. This arises because the conditioning sets $\mathrm{Adj}(X)$ change
as edges are removed, so the test for $(X, Y)$ depends on which other edges were removed
earlier. Colombo & Maathuis (2014) introduced **PC-stable**, which fixes this by freezing
adjacency sets at the start of each $\ell$-level.

### Software

- **R package `pcalg`**: `pc()` function; also implements GES, RFCI, FCI (Kalisch et al. 2012,
  *Journal of Statistical Software*, 47(11)).
- **Python `causal-learn`**: `PC` class; also implements GES, LiNGAM, GRaSP.
- **TETRAD**: Java GUI + API from Carnegie Mellon (Ramsey et al., 2018).

## Examples

> [!example] PC Algorithm on Three Variables (Linear Gaussian)
> **Setup:** $Z \to X$, $Z \to Y$, no direct $X$–$Y$ edge. Gaussian noise.
> **Data:** $n = 1000$ observations of $(X, Y, Z)$.
>
> **Phase 1:**
> - $\ell = 0$: Test $X \perp\!\!\!\perp Y$ (unconditional). Result: **dependent** (because of common cause $Z$). Edge kept.
> - $\ell = 1$: Test $X \perp\!\!\!\perp Y \mid \{Z\}$. Result: **independent** (Z is the fork). Edge removed; $\mathrm{Sep}(X,Y) = \{Z\}$.
> - Skeleton: $X - Z - Y$.
>
> **Phase 2:**
> - Unshielded triple $X - Z - Y$. Check: $Z \in \mathrm{Sep}(X,Y) = \{Z\}$? **Yes.**
> - → No v-structure; $Z$ is not a collider.
>
> **Phase 3:** Meek rules cannot orient further from a single undirected triple.
>
> **Output CPDAG:** $X - Z - Y$ (all undirected) — correctly indicating that
> $X \to Z \to Y$, $X \leftarrow Z \leftarrow Y$, and $X \leftarrow Z \to Y$ are all Markov equivalent.

## Connections

- **vs. GES** ([[GES - Greedy Equivalence Search]]): GES is score-based (optimizes BIC),
  PC is CI-test-based. GES is generally more accurate for small–medium $d$; PC is simpler
  to implement and more interpretable.
- **vs. NOTEARS** ([[NOTEARS - Overview]]): NOTEARS assumes a linear SEM and estimates the
  full weighted adjacency matrix $W$ rather than a CPDAG. NOTEARS is score-based.
- **FCI** (Fast Causal Inference): extends PC to handle latent confounders (relaxes causal
  sufficiency). Output is a **PAG** (Partial Ancestral Graph).

## See Also
- [[CPDAG and Markov Equivalence]] — the CPDAG representation and Meek rules
- [[GES - Greedy Equivalence Search]] — score-based alternative
- [[NOTEARS - Overview]] — continuous optimization approach
- [[DAG Structure Learning Problem]] — the general problem formulation
- [[Causal Discovery Methods - Comparison]] — when to use PC vs GES vs NOTEARS
- [[Directed Acyclic Graphs]] — d-separation and causal semantics
