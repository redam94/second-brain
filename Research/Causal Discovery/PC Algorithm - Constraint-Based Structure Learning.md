---
title: "PC Algorithm - Constraint-Based Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Survey.md]]"
source_location: "§1 — Spirtes, Glymour & Scheines (2000), Ch. 5; Kalisch & Bühlmann (2007)"
date_ingested: 2026-08-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - Peter-Clark algorithm
  - PC algorithm
  - constraint-based structure learning
  - conditional independence structure learning
  - SGS algorithm
---

# PC Algorithm - Constraint-Based Structure Learning

> [!summary]
> The **PC algorithm** (Peter Spirtes and Clark Glymour, 1991/2000) learns the Markov equivalence
> class of a DAG from observational data using **conditional independence tests** as its primitive
> operation. Starting from a complete graph, it prunes non-adjacent pairs by finding conditioning
> sets that d-separate them (Phase 1 — skeleton); orients v-structures using the separating sets
> (Phase 2); and propagates orientations via Meek's rules (Phase 3). Output: a CPDAG. Under
> Markov + faithfulness + consistent CI tests, the PC algorithm is consistent. For Gaussian data,
> it is high-dimensionally consistent with polynomial cost when true in-degree is bounded
> (Kalisch & Bühlmann 2007).

## Overview

The **constraint-based paradigm** exploits a fundamental link: under Markov + faithfulness, the
conditional independence structure of the distribution $P$ is equivalent to the d-separation
structure of the true generating DAG $\mathcal{G}^*$. If we can query CIs of $P$ reliably,
we can reconstruct the skeleton and v-structures of $\mathcal{G}^*$ — i.e. its
[[Markov Equivalence Classes and CPDAGs|CPDAG]].

The PC algorithm is the computationally efficient version of the original SGS algorithm
(Spirtes, Glymour & Scheines 1991), which tested all $O(2^d)$ conditioning subsets.
PC reduces this to $O(d^{q+2})$ tests by restricting conditioning sets to the **current
adjacency set** of each pair — starting with small conditioning sets ($\ell = 0$) and growing.

## Main Content

### Setup

> [!definition] Inputs and Assumptions (Spirtes et al. 2000, Ch. 5)
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$ (or a black-box CI test oracle).
>
> **Output:** A CPDAG $\hat{\mathcal{C}}$ over $d$ variables.
>
> **Assumptions:**
> 1. **Markov condition:** $\mathcal{G}^*$ is a DAG satisfying $X \perp_P Y \mid \mathbf{Z}$
>    whenever $X$ and $Y$ are d-separated by $\mathbf{Z}$ in $\mathcal{G}^*$.
> 2. **Faithfulness:** Every CI in $P$ is entailed by d-separation in $\mathcal{G}^*$.
> 3. **Causal sufficiency:** No unmeasured common causes. (Relaxed by FCI.)
> 4. **CI test consistency:** The test for $H_0: X \perp Y \mid \mathbf{S}$ has asymptotically
>    correct size and power.
^def-setup

### Phase 1 — Skeleton Learning

> [!definition] Phase 1: Adjacency Search (SGS 2000 / PC Algorithm)
> **Initialize:** $G \leftarrow K_d$ (complete graph), $\mathrm{Sep}(X,Y) \leftarrow \emptyset$ for all pairs.
>
> **For** $\ell = 0, 1, 2, \ldots$ (conditioning set size):
> - **For** each ordered pair $(X, Y)$ with $Y \in \mathrm{Adj}_G(X)$:
>   - **For** each $\mathbf{S} \subseteq \mathrm{Adj}_G(X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$:
>     - Test $H_0: X \perp Y \mid \mathbf{S}$ at level $\alpha$.
>     - If not rejected: **remove** edge $X - Y$ from $G$; set $\mathrm{Sep}(X,Y) = \mathbf{S}$; **break**.
> - **Until** no pair has $|\mathrm{Adj}_G(X) \setminus \{Y\}| \geq \ell$.
>
> **Output:** Undirected skeleton $G$ and separating sets $\{\mathrm{Sep}(X,Y)\}$.
^def-phase1

**Why it works:** By the Markov condition and faithfulness, two variables $X$ and $Y$ are
adjacent in $\mathcal{G}^*$ if and only if there is no $\mathbf{S}$ that d-separates them.
For non-adjacent pairs, the true separating set is always a subset of $\mathrm{Pa}(X)$ or
$\mathrm{Pa}(Y)$ in $\mathcal{G}^*$ — so restricting to adjacencies is sufficient.

**Order dependence (key limitation):** The set $\mathrm{Adj}_G(X)$ changes as edges are removed,
making Phase 1 order-dependent in finite samples. Different orderings of the variable pairs
tested may produce different skeletons. The **PC-stable** fix (Colombo & Maathuis 2014) performs
all removals at level $\ell$ *before* updating adjacencies used for level $\ell+1$, producing a
unique, order-independent skeleton.

### Phase 2 — V-Structure Orientation

> [!definition] Phase 2: Collider Orientation
> **For** each "unshielded triple" $X - Z - Y$ in $G$ (i.e., $X$ adjacent to $Z$, $Z$ adjacent
> to $Y$, but $X$ not adjacent to $Y$):
> - If $Z \notin \mathrm{Sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (a **v-structure**).
> - Otherwise: leave $X - Z - Y$ unoriented.
^def-phase2

> [!note] Intuition for v-structure orientation
> The separating set $\mathrm{Sep}(X,Y)$ is the set that makes $X \perp Y$ conditional on it.
> If $Z \notin \mathrm{Sep}(X,Y)$, then conditioning on $Z$ would make $X$ and $Y$ *dependent*
> (collider activation). This is exactly the signature of $X \to Z \leftarrow Y$: $X \perp Y$
> marginally but $X \not\perp Y \mid Z$. If $Z \in \mathrm{Sep}(X,Y)$, the triple is a fork or
> pipe — conditioning on $Z$ blocks the path, consistent with non-collider configurations.

### Phase 3 — Meek Rules

> [!definition] Phase 3: Meek Orientation Rules
> Apply Meek's four rules iteratively until no further orientations are possible.
> See [[Markov Equivalence Classes and CPDAGs#def-meek-rules|Meek Rules]] for the full statement.
>
> Key rules:
> - **R1:** $\alpha \to \beta - \gamma$ with $\alpha \not\sim \gamma \Rightarrow \beta \to \gamma$
>   (avoid new v-structure at $\beta$).
> - **R2:** $\alpha \to \beta \to \gamma$, $\alpha - \gamma \Rightarrow \alpha \to \gamma$
>   (avoid cycle).
>
> **Output:** CPDAG $\hat{\mathcal{C}}$.
^def-phase3

### Conditional Independence Tests

The choice of CI test determines the statistical properties of the PC algorithm:

> [!definition] Gaussian CI Test (Fisher's z-transform)
> For Gaussian data, test $X \perp Y \mid \mathbf{S}$ via the partial correlation:
> $$\hat{\rho}_{XY \cdot \mathbf{S}} = \frac{-(\hat{\boldsymbol{\Sigma}}^{-1}_{\{X,Y\}\cup\mathbf{S}})_{XY}}
>   {\sqrt{(\hat{\boldsymbol{\Sigma}}^{-1}_{\{X,Y\}\cup\mathbf{S}})_{XX}
>          (\hat{\boldsymbol{\Sigma}}^{-1}_{\{X,Y\}\cup\mathbf{S}})_{YY}}}$$
> Fisher's z-transform: $z(\hat{\rho}_{XY \cdot \mathbf{S}}) = \frac{1}{2}\log\frac{1+\hat{\rho}}{1-\hat{\rho}}$
> is approximately $\mathcal{N}(0, 1/(n - |\mathbf{S}| - 3))$ under $H_0$.
>
> Reject if $|z(\hat{\rho})| > \Phi^{-1}(1 - \alpha/2)$.
^def-gaussian-ci

| Data type | Test |
|-----------|------|
| Gaussian / continuous | Fisher's z-transform of partial correlation |
| Discrete / categorical | Conditional G-test or chi-squared test |
| Non-parametric | Kernel-based HSIC test (Gretton et al. 2008) |
| Time series | ccm, PCMCI (Runge et al. 2019) |

### Consistency Theorem

> [!theorem] PC Consistency (Spirtes et al. 2000, Theorem 5.1)
> Under the Markov condition, faithfulness, and asymptotically consistent CI tests, the PC
> algorithm **recovers the true CPDAG** $\mathcal{C}^*$ as $n \to \infty$:
> $$\hat{\mathcal{C}} \xrightarrow{P} \mathcal{C}^* \quad \text{as } n \to \infty.$$
^thm-consistency

> [!theorem] High-Dimensional Consistency (Kalisch & Bühlmann 2007, Theorem 3)
> For Gaussian data with $d$ variables and a DAG of bounded maximum in-degree $q$:
> - The number of CI tests is $O(d^{q+2})$ — **polynomial** in $d$ when $q$ is bounded.
> - With $n \geq C \log d$ samples (for some constant $C$ depending on $q$ and the minimum
>   partial correlation), PC recovers the true CPDAG with high probability, even when $d \gg n$.
>
> **Implication:** The PC algorithm is a **high-dimensional consistent** estimator for Gaussian
> linear DAGs with sparse structure — applicable in the $d \gg n$ regime of modern genomics.
^thm-hd-consistency

### Computational Cost

| Phase | Cost |
|-------|------|
| Phase 1 (skeleton) | $O\!\left(d^{q+2} \cdot T_{\text{CI}}\right)$ where $q$ = max true in-degree, $T_{\text{CI}}$ = CI test cost |
| Phase 2 (v-structure) | $O(d^3)$ — loop over all unshielded triples |
| Phase 3 (Meek rules) | $O(d^2)$ per iteration, $O(d^3)$ total |
| **Total** | $O\!\left(d^{q+2} \cdot T_{\text{CI}}\right)$ dominated by Phase 1 |

For Gaussian data with $q$ bounded, $T_{\text{CI}} = O(q^3)$ (partial correlation via matrix
inversion), so total cost is $O(d^{q+2} \cdot q^3)$ — polynomial in $d$.

### Key Variants and Extensions

> [!note] PC-Stable (Colombo & Maathuis 2014 — arXiv:1211.3295)
> Fixes the order-dependence of the original PC algorithm by separating the *identification* and
> *removal* phases: all CI tests at level $\ell$ are performed using the adjacency sets from
> the previous level $\ell - 1$. This yields a unique, order-independent skeleton.
> **Recommended default** for reproducible skeleton estimation.
^def-pc-stable

> [!note] FCI — Fast Causal Inference (Spirtes, Meek & Richardson 1995)
> Relaxes causal sufficiency (allows unmeasured common causes / latent variables). FCI learns a
> **PAG** (Partial Ancestral Graph) that represents a set of **MAGs** (Maximal Ancestral Graphs)
> over the observed variables. It adds a second phase to PC's Phase 1 to check for possible
> hidden common causes, and extends Phase 2 with additional orientation rules involving "circle"
> edge marks. Output: $X \ast\!\!\!-\!\!\!\ast Y$ where $\ast$ can be an arrowhead, a tail, or
> a circle (unknown).
^def-fci

> [!note] RFCI — Really Fast Causal Inference (Colombo et al. 2012)
> A computationally cheaper alternative to FCI that produces a PAG over a subset of the MAGs
> (not always conservative FCI), trading some completeness for speed.

### Comparison to Score-Based Methods

See [[GES - Greedy Equivalence Search]] for the full comparison. Key distinction:

- **PC** requires a CI oracle; performance degrades when CI tests have low power (small $n$,
  many variables, weak dependencies).
- **GES** uses a score; consistent under Markov + faithfulness without requiring individual
  CI test consistency — score errors average out.
- **NOTEARS** ([[NOTEARS Algorithm]]) is a continuous optimization approach that does not output
  CPDAGs; it is not comparable under the same theoretical framework but outperforms both on
  dense, large-$d$ problems empirically ([[NOTEARS Experiments]]).

## Examples

> [!example] PC on a Three-Variable Chain
> **True DAG:** $X \to Z \to Y$ (chain).
>
> **Phase 1 ($\ell=0$):** Test each pair marginally.
> - $X \perp Y$? No (dependent: $X \to Z \to Y$ is an open path). Keep $X - Y$.
> - $X \perp Z$? No. Keep $X - Z$.
> - $Z \perp Y$? No. Keep $Z - Y$.
> No edges removed at $\ell = 0$.
>
> **Phase 1 ($\ell=1$):** Test each pair conditioning on the third.
> - $X \perp Y \mid Z$? **Yes** (the path $X \to Z \to Y$ is blocked by $Z$). Remove $X - Y$;
>   $\mathrm{Sep}(X,Y) = \{Z\}$.
> - Others remain dependent.
>
> **Skeleton:** $X - Z - Y$ (the true skeleton).
>
> **Phase 2:** Unshielded triple $X - Z - Y$. Is $Z \in \mathrm{Sep}(X,Y) = \{Z\}$? **Yes**.
> Leave unoriented.
>
> **CPDAG:** $X - Z - Y$ — an undirected chain. This correctly represents that $X \to Z \to Y$,
> $X \leftarrow Z \to Y$, and $X \leftarrow Z \leftarrow Y$ are all Markov equivalent.

> [!example] PC on a V-Structure
> **True DAG:** $X \to Z \leftarrow Y$, $X \not\sim Y$ (collider at $Z$).
>
> **Phase 1 ($\ell=0$):** $X \perp Y$? **Yes** (no path between them without passing through
> collider $Z$, which is inactive when $Z$ is not conditioned on). Remove $X - Y$.
> $\mathrm{Sep}(X,Y) = \emptyset$.
>
> **Phase 1 ($\ell=1$):** Remaining pairs $X - Z$ and $Z - Y$ have no conditioning sets of
> size 1 (only one neighbor each). Stop.
>
> **Skeleton:** $X - Z - Y$.
>
> **Phase 2:** Unshielded triple $X - Z - Y$. Is $Z \in \mathrm{Sep}(X,Y) = \emptyset$? **No**.
> Orient: $X \to Z \leftarrow Y$.
>
> **CPDAG:** $X \to Z \leftarrow Y$ — the v-structure is correctly recovered.

## Connections

- **Theoretical foundation:** The correctness of Phase 2 depends on faithfulness: if $X \perp Y$
  in $P$ but $Z$ is not in any d-separating set, then $Z$ must be a collider on the true path
  $X - Z - Y$. See [[Markov Equivalence Classes and CPDAGs]].
- **Score-based alternative:** [[GES - Greedy Equivalence Search]] does not use CI tests;
  it searches CPDAG space by maximizing a score. Under the same assumptions, both GES and PC are
  consistent, but they have different finite-sample behavior.
- **ABM context:** ABM output data (repeated simulation traces) can be treated as observational
  data for structure learning. [[Summary Causal DAGs]] and the CaGReS algorithm (Zeng 2025)
  learn summary DAGs from ABM runs — a constraint-based approach on simulated data.
- **Expert elicitation alternative:** [[LLM Expert Elicitation for Bayesian Networks]] provides
  a complementary approach: instead of testing CIs from data, expert knowledge elicits the DAG
  directly. Structure learning from data and expert elicitation are surveyed and compared in
  [[BN Construction Methods Comparison]].

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — CPDAGs, Meek rules, the identifiability wall
- [[GES - Greedy Equivalence Search]] — score-based alternative; Chickering (2002)
- [[DAG Structure Learning Problem]] — the optimization problem NOTEARS/GES/PC all address
- [[NOTEARS Experiments]] — benchmarks comparing PC, GES, FGS, NOTEARS
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Approximate Bayesian Computation for ABMs]] — uses simulation output as observational data for inference
