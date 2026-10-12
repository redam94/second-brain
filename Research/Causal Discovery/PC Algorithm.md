---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/causal-structure-learning-sources.md]]"
source_location: "Kalisch & Bühlmann (2007) JMLR 8:613-636; Spirtes, Glymour & Scheines (2000) §5"
date_ingested: 2026-10-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Conditional Independence Tests for Causal Discovery]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[GES Algorithm]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based causal discovery"
  - "skeleton identification algorithm"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after its inventors **P**eter Spirtes and **C**lark Glymour;
> Spirtes, Glymour & Scheines 1993/2000) is the canonical **constraint-based** structure
> learning algorithm. It recovers the **CPDAG** of a DAG by (1) identifying the **skeleton**
> via conditional independence (CI) tests, and (2) **orienting edges** using v-structure
> detection and Meek's rules. Kalisch & Bühlmann (2007) proved that PC is **uniformly
> consistent** even when $d$ grows with $n$, provided the true DAG is sparse.
> The algorithm is available in the R `pcalg` package and Python `causal-learn` library.

## Overview

The PC algorithm attacks the structure-learning problem from a fundamentally different
direction than score-based methods like [[GES Algorithm]] or continuous-optimization methods
like [[NOTEARS Algorithm]]. Instead of optimizing a score, it **tests** the data for
conditional independences and uses those tests to constrain the graph.

The key insight: if $X \perp Y \mid \mathbf{S}$ for some set $\mathbf{S}$, then (under
faithfulness) the edge $X\!-\!Y$ is absent in the true skeleton. The PC algorithm exploits
this by starting with a complete graph and **removing edges** wherever a CI holds. The
resulting skeleton, combined with v-structure detection and Meek's rules, yields the CPDAG.

### Assumptions

1. **Faithfulness**: every CI in $\mathbb{P}$ is captured by a d-separation in the true DAG $\mathcal{G}^*$.
2. **Causal sufficiency**: no hidden common causes (no latent confounders).
3. **Acyclicity**: the true graph is a DAG.
4. (For consistency) **Consistency of CI tests** at level $\alpha_n \to 0$ slowly enough.

## Main Content

### Phase 1: Skeleton identification

> [!definition] Algorithm: PC Phase 1 — Skeleton Identification
> **Input**: $n$ observations of $(X_1, \ldots, X_d)$, CI test oracle, maximum conditioning
> set size $l_{\max}$ (or $\infty$).
>
> **Initialize**: Complete undirected graph $\mathcal{C}$ on $d$ nodes; $\text{sepset}(i,j) = \emptyset$
> for all $i,j$.
>
> **For** $\ell = 0, 1, 2, \ldots$:
> - **For** each edge $(i,j)$ in $\mathcal{C}$ (in some order):
>   - Let $\text{Adj}(i, \mathcal{C})$ be the current adjacency set of $i$.
>   - **For each** $\mathbf{S} \subseteq \text{Adj}(i, \mathcal{C}) \setminus \{j\}$ with $|\mathbf{S}| = \ell$:
>     - Test $H_0: X_i \perp X_j \mid \mathbf{X}_\mathbf{S}$ at level $\alpha$.
>     - If **not rejected**: remove edge $(i,j)$; set $\text{sepset}(i,j) = \text{sepset}(j,i) = \mathbf{S}$; **break** inner loop.
> - **If** no edge was removed in this iteration, **stop**.
>
> **Return**: skeleton $\mathcal{C}$ and separating sets $\text{sepset}$.
^algo-pc-skeleton

> [!note] Why condition on growing sets?
> The algorithm tests order-0 (marginal) independences first (the cheapest tests), then
> order-1, order-2, … As edges are removed, the adjacency sets shrink, so larger
> conditioning sets are only tested when many neighbours survive — keeping the total
> number of CI tests manageable for sparse graphs.

> [!note] Computational complexity
> For sparse graphs (bounded maximum degree $q$), the total number of CI tests is
> $O(d^{q+2})$ — polynomial in $d$ for fixed $q$. This makes PC tractable where exact
> methods (scaling superexponentially) are not. The inner conditioning-set loop over
> $\binom{q}{\ell}$ sets is the bottleneck for dense neighbourhoods.

### Phase 2: V-structure identification

> [!definition] Algorithm: PC Phase 2 — V-Structure Orientation
> **For each** unshielded triple $i - k - j$ in the skeleton (i.e., $(i,j) \notin \mathcal{C}$):
> - If $k \notin \text{sepset}(i,j)$: orient as $i \to k \leftarrow j$ (v-structure).
> - Otherwise: leave $i - k - j$ unoriented (later orientation rules may resolve it).
^algo-pc-vstructure

> [!note] Why this identifies v-structures correctly
> Under faithfulness, if $k \notin \text{sepset}(i,j)$, then conditioning on $k$ renders
> $i$ and $j$ **dependent** — the signature of a collider. If $k \in \text{sepset}(i,j)$,
> conditioning on $k$ explains the dependence — the signature of a non-collider (chain or fork).

### Phase 3: Meek orientation rules

Apply Meek's rules R1–R4 (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]])
exhaustively to propagate orientations without creating new v-structures or cycles.

> [!definition] Full PC Algorithm (combined)
> **PC Algorithm**:
> 1. Run Phase 1 (skeleton).
> 2. Run Phase 2 (v-structures).
> 3. Apply Meek's R1–R4 until convergence.
>
> **Output**: the estimated CPDAG $\widehat{\mathcal{G}}$.
^algo-pc-full

### Consistency theorem

> [!theorem] Theorem: Uniform Consistency of PC (Kalisch & Bühlmann, 2007, Thm. 3.1)
> Let $\mathcal{G}^*$ be the true DAG over $d$ nodes with maximum degree $q^*$.
> Suppose the distribution is **Gaussian** and **faithful** to $\mathcal{G}^*$.
> Let $\alpha_n = \Phi\bigl(-c\sqrt{n/2-2}\bigr)$ for a constant $c > 0$, and apply
> **Fisher's $z$-test** for CI at level $\alpha_n$.
>
> Then as $n \to \infty$ with $d = d(n)$ growing at most polynomially in $n$:
> $$\Pr\bigl(\widehat{\mathcal{G}}_n = \mathcal{G}^*_{\text{CPDAG}}\bigr) \to 1.$$
>
> The key condition: $\log d = o(n^{1/3})$ (allows high-dimensional settings $d \gg n$)
> and the maximum degree $q^*$ remains bounded.
^thm-pc-consistency

> [!note] The role of sparsity
> Sparsity (bounded degree) is **essential** — it ensures the conditioning sets in Phase 1
> never grow too large, keeping the CI tests powerful. For dense graphs ($q^* \to \infty$),
> uniform consistency does not follow from this theorem.

### The order-dependence problem and PC-stable

The PC algorithm as stated is **order-dependent**: the output depends on the order in
which variables and edges are processed during Phase 1, because removing an edge can
change subsequent adjacency sets.

> [!theorem] Order-independence fix: PC-stable (Colombo & Maathuis, 2014)
> The **PC-stable** variant collects all edges to be removed in a given iteration $\ell$
> *before* removing any of them. This makes the skeleton determination order-independent.
> The v-structure phase may still be order-dependent; further modifications (e.g.,
> majority rule orientation) achieve full order-independence.
^thm-pc-stable

### CI tests in practice

For Gaussian data, the **Fisher $z$-test** is the standard CI test:

> [!definition] Fisher $z$-test for Partial Correlation
> Under the null $H_0: X_i \perp X_j \mid \mathbf{X}_\mathbf{S}$ with a Gaussian model,
> compute the **partial correlation** $\hat{\rho}_{ij \mid \mathbf{S}}$ and the
> **Fisher $z$-transform**:
> $$Z_{ij\mathbf{S}} = \frac{1}{2}\log\frac{1 + \hat{\rho}_{ij\mid\mathbf{S}}}{1 - \hat{\rho}_{ij\mid\mathbf{S}}}.$$
> Under $H_0$, $(n - |\mathbf{S}| - 3)^{1/2} Z_{ij\mathbf{S}} \xrightarrow{d} \mathcal{N}(0,1)$.
> Reject at level $\alpha$ if $|(n - |\mathbf{S}| - 3)^{1/2} Z_{ij\mathbf{S}}| > z_{\alpha/2}$.
^def-fisher-z

For non-Gaussian or non-linear data, kernel-based CI tests (e.g., KCI, HSIC) are
substituted — see [[Conditional Independence Tests for Causal Discovery]].

## Connections

- **CPDAG target**: like [[GES Algorithm]], PC outputs a CPDAG (see [[Markov Equivalence and CPDAGs]]).
- **Contrast with NOTEARS**: NOTEARS ([[NOTEARS Algorithm]]) assumes a linear SEM and targets a full
  DAG; PC makes no distributional assumptions beyond faithfulness and targets the MEC.
  The [[NOTEARS Experiments]] note reports that NOTEARS outperforms PC on dense/large graphs.
- **Constraint vs. score**: PC uses CI tests (hypothesis testing); GES uses a score (BIC).
  They are complementary — PC is preferred when the distributional family is unknown; GES
  when the model family is specified.
- **Hidden confounders**: PC's causal sufficiency assumption is strong. The **FCI** (Fast
  Causal Inference) algorithm extends PC to settings with latent common causes.
- **Bayesian networks**: the skeleton + orientation output is the input for inference
  algorithms in [[LLM-BN Decision Support Application]] and [[BN Construction Methods Comparison]].

## See Also
- [[Markov Equivalence and CPDAGs]] — defines CPDAG, v-structures, Meek rules
- [[Conditional Independence Tests for Causal Discovery]] — Fisher z, KCI, and other CI tests
- [[GES Algorithm]] — score-based alternative to PC
- [[NOTEARS - Overview]] — continuous optimization alternative; benchmarks include PC
- [[DAG Structure Learning Problem]] — the problem landscape (PC is in the "constraint-based" row)
- [[Directed Acyclic Graphs]] — d-separation, faithfulness, back-door criterion
