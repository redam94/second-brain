---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-SGS-reference.md]]"
source_location: "Ch. 3 (Assumptions), Ch. 5 (PC Algorithm framework), Spirtes, Glymour & Scheines (2000)"
date_ingested: 2026-09-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Causal Discovery Methods Comparison]]"
aliases:
  - "CI-test-based causal discovery"
  - "independence-based structure learning"
  - "SGS algorithm"
---

# Constraint-Based Causal Discovery

> [!summary]
> **Constraint-based causal discovery** recovers causal structure by testing **conditional
> independence (CI) constraints** implied by the causal DAG via the Markov property. The
> canonical algorithm is [[PC Algorithm|PC]] (Peter-Clark; Spirtes, Glymour & Scheines, 1991).
> The approach rests on three assumptions — **Causal Markov Condition**, **Faithfulness**, and
> **Causal Sufficiency** — and outputs the [[Markov Equivalence and CPDAGs|CPDAG]] of the
> true data-generating DAG in the large-sample limit. Constraint-based methods are
> complementary to score-based methods (→ [[Greedy Equivalence Search|GES]]) and
> continuous-optimization methods (→ [[NOTEARS - Overview|NOTEARS]]).

## Overview

The intuition behind constraint-based discovery is simple: if $X$ causes $Y$, then $X$ and $Y$
cannot be made conditionally independent by adjusting for any set $Z$. Conversely, if
$X \perp\!\!\!\perp Y \mid Z$ in the distribution, the causal DAG must have a structure that
**d-separates** $X$ from $Y$ given $Z$. By testing all pairs $(X, Y)$ against all possible
conditioning sets $Z$, we can read off the skeleton and — by examining which separating sets
predict colliders — orient the edges into v-structures.

This idea, formalized in Spirtes, Glymour & Scheines (2000) as the SGS algorithm and then
refined into the polynomial-time PC algorithm, gives a sound and asymptotically complete
procedure for recovering the CPDAG from observational data.

## Main Content

### Core assumptions

> [!definition] Assumption 1: Causal Markov Condition (CMC)
> Each variable $X_i$ is **conditionally independent** of its non-descendants given its
> **parents** $\mathrm{Pa}(X_i)$ in the DAG $G$:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i).$$
> Equivalently: the joint distribution $\mathbb{P}$ **factorizes** according to $G$:
> $$\mathbb{P}(X_1,\dots,X_d) = \prod_{i=1}^{d} \mathbb{P}\!\left(X_i \mid \mathrm{Pa}(X_i)\right).$$
> The CMC is implied by the structural equation model (SEM) interpretation of $G$ when the
> noise variables are jointly independent.
^def-markov-condition

> [!definition] Assumption 2: Faithfulness
> Every **conditional independence** present in the distribution $\mathbb{P}$ is
> **entailed by the DAG $G$** (via d-separation). Formally: for any three disjoint sets
> $A, B, Z \subseteq V$:
> $$A \perp\!\!\!\perp B \mid Z \text{ in } \mathbb{P} \implies A \text{ d-sep from } B \text{ given } Z \text{ in } G.$$
> Faithfulness rules out "accidental" cancellations in the parameter space where two causal
> paths exactly cancel, producing a CI not entailed by the graph structure. Faithfulness holds
> generically (for almost all parameter values in Lebesgue measure) for linear SEMs.
^def-faithfulness

> [!definition] Assumption 3: Causal Sufficiency
> There are **no hidden common causes** (latent confounders) between any pair of observed
> variables in $V$. Formally: for any two variables $X_i, X_j \in V$, there is no latent
> variable $L \notin V$ such that $L \to X_i$ and $L \to X_j$ in the true causal graph.
> Causal sufficiency is required by the PC algorithm. When it is violated (latent confounders
> present), the **FCI algorithm** (Fast Causal Inference; Spirtes, Glymour & Scheines, 2000,
> Ch. 6) extends the approach to produce a **MAG** (Maximal Ancestral Graph) or **PAG**
> (Partial Ancestral Graph) instead of a CPDAG.
^def-causal-sufficiency

> [!note] When assumptions fail
> - **CMC violated**: rarely; would require the SEM's noise variables to be dependent.
> - **Faithfulness violated**: can occur when paths cancel (e.g., a positive direct effect
>   and a negative mediated effect sum to zero). Kalisch & Bühlmann (2007) show that
>   faithfulness holds uniformly (except on a Lebesgue-measure-zero parameter set) even
>   in high dimensions.
> - **Causal sufficiency violated**: common in practice (e.g., unobserved individual
>   heterogeneity). Use FCI instead of PC.

### Conditional independence tests

The constraint-based framework is test-agnostic — any valid CI test can be plugged in.

| Data type | Test | Statistic |
|-----------|------|-----------|
| Continuous Gaussian | **Fisher's z-test** | $z = \frac{1}{2}\ln\frac{1+\hat\rho_{XY|Z}}{1-\hat\rho_{XY|Z}}$, where $\hat\rho_{XY|Z}$ is the sample partial correlation. Under $H_0: X\perp\!\!\!\perp Y\mid Z$, $\sqrt{n-|Z|-3}\, z \sim \mathcal{N}(0,1)$. |
| Discrete | **$G^2$ test** | $G^2 = 2\sum_{x,y,z} n_{xyz}\ln\frac{n_{xyz} n_z}{n_{xz} n_{yz}}$, approximately $\chi^2$ with $(|X|-1)(|Y|-1)|Z|$ d.f. |
| Non-parametric | **KCI test** (Kernel CI) | Kernel-based test; no parametric assumptions; computationally expensive ($O(n^3)$). |
| General (regression-based) | **Partial regression** | Test residual independence after regressing out $Z$ from $X$ and $Y$. |

> [!note] Significance level and the type-I / type-II error tradeoff
> The significance level $\alpha$ of the CI test controls the density of the learned skeleton:
> - **Small $\alpha$** (e.g. 0.01): fewer edges removed → denser graph (underfitting; false
>   positives in adjacencies).
> - **Large $\alpha$** (e.g. 0.10): more edges removed → sparser graph (overfitting; false
>   negatives). Kalisch & Bühlmann (2007) show optimal consistency requires $\alpha$ shrinking
>   at rate $O(1/\log n)$ as $n\to\infty$.

### Three-phase structure of constraint-based algorithms

All constraint-based algorithms share this structure:

> [!example] Three phases of constraint-based causal discovery
>
> **Phase 1 — Skeleton learning** (CI testing):
> Start with the complete undirected graph $K_d$. For each pair $(X_i, X_j)$ and each subset
> $Z \subseteq V \setminus \{X_i, X_j\}$, test $X_i \perp\!\!\!\perp X_j \mid Z$. If the test
> accepts at level $\alpha$, remove edge $X_i - X_j$ and record the **separating set**
> $\mathrm{sep}(X_i, X_j) = Z$. The result is an undirected **skeleton** $\hat{S}$.
>
> **Phase 2 — V-structure orientation**:
> For each **unshielded triple** $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are not adjacent),
> orient $X_i \to X_k \leftarrow X_j$ if and only if $X_k \notin \mathrm{sep}(X_i, X_j)$.
> (If $X_k$ is not in the separating set, then conditioning on $X_k$ makes $X_i$ and $X_j$
> dependent, which is the hallmark of an unshielded collider.)
>
> **Phase 3 — Orientation propagation** (Meek rules):
> Apply Meek's (1995) orientation rules exhaustively to orient remaining undirected edges
> without introducing new v-structures or directed cycles. Output: the CPDAG $\hat{\mathcal{C}}$.
^ex-three-phases

### SGS vs. PC

The original **SGS algorithm** (Spirtes, Glymour & Scheines, 1991) searches all possible
conditioning sets in Phase 1, making it **exponential** in the maximum degree. The **PC
algorithm** is a polynomial-time refinement:

| Property | SGS | PC |
|----------|-----|-----|
| Conditioning sets tested | All subsets of $V\setminus\{X_i,X_j\}$ | Subsets of **adjacency sets** only |
| Complexity | Exponential in $d$ | Polynomial if max degree $k$ is bounded: $O(d^{k+2})$ CI tests |
| Soundness | Complete under CMC + Faithfulness | Same |
| Order-dependence | None | Yes (fixed by [[PC Algorithm#pc-stable|PC-stable]]) |

## Connections

- **Score-based comparison**: GES (→ [[Greedy Equivalence Search]]) optimizes a score function
  (BIC) over equivalence classes instead of testing CI constraints. GES avoids the significance
  level choice but requires a distributional assumption for the score.
- **NOTEARS** (→ [[NOTEARS - Overview]]): a continuous-optimization method that does not
  test CI constraints. NOTEARS assumes a linear SEM; constraint-based methods are
  model-agnostic (any distribution can be used with an appropriate CI test).
- **FCI**: when causal sufficiency fails (latent confounders exist), FCI extends the constraint-
  based framework to output a PAG over a MAG. [[Summary Causal DAGs]] covers the ABM-specific
  DAG summarization context where this matters.

## See Also
- [[PC Algorithm]] — the canonical constraint-based algorithm
- [[Markov Equivalence and CPDAGs]] — the CPDAG output of constraint-based methods
- [[DAG Structure Learning Problem]] — problem formulation and landscape of methods
- [[Directed Acyclic Graphs]] — d-separation and the causal semantics constraint-based methods exploit
- [[Greedy Equivalence Search]] — the score-based alternative
- [[Causal Discovery Methods Comparison]] — PC vs. GES vs. NOTEARS
