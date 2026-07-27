---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Structure-Learning-Survey.md]]"
source_location: "Survey §2; Spirtes, Glymour & Scheines (2000) Chs. 5-6; Colombo & Maathuis (2014)"
date_ingested: 2026-07-27
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES Algorithm]]"
aliases:
  - "PC algorithm"
  - "constraint-based causal discovery"
  - "Spirtes Glymour Scheines"
  - "stable PC"
  - "skeleton learning"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the canonical
> **constraint-based** causal discovery method. It recovers the CPDAG of the true DAG by: (1) learning
> the **skeleton** via conditional independence (CI) tests, and (2) **orienting** edges using v-structure
> detection and Meek's rules. Under the **faithfulness** assumption and consistent CI tests, PC is
> asymptotically correct. The **stable PC** variant (Colombo & Maathuis 2014) eliminates order-dependence
> of the skeleton step, producing reproducible results in high dimensions.

## Overview

"PC" is named for its inventors, **P**eter Spirtes and **C**lark Glymour. First described in Spirtes &
Glymour (1991) and developed fully in the landmark book *Causation, Prediction, and Search* (Spirtes,
Glymour & Scheines, 2000), the algorithm became the standard benchmark for causal discovery.

The core idea is elegantly simple: **remove edges whose endpoints can be rendered conditionally independent
by conditioning on some set of other variables**. The faithfulness assumption guarantees that the only edges
in the true DAG are those whose endpoints are *not* d-separated by any subset of the remaining variables.
Start from the complete graph and prune aggressively; then orient the skeleton using colliders.

**Contrast with score-based methods (GES, NOTEARS):** PC treats CI tests as oracles and does not require
a parametric model or a score. It is distribution-free in principle (any consistent CI test works) but
sensitive to CI test errors, especially in high dimensions.

## Main Content

### Setup and Assumptions

**Input:**
- Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$
- A **CI test oracle** $\mathcal{T}(X, Y, \mathbf{S})$ returning a Boolean: "is $X \perp\!\!\!\perp Y \mid \mathbf{S}$?"
- Significance level $\alpha$ (for statistical tests)

**Output:** Estimated CPDAG $\hat{C}$ for the true DAG $G^*$.

> [!definition] Definition: Faithfulness Assumption
> A distribution $\mathbb{P}$ and DAG $G^*$ satisfy **faithfulness** if every conditional independence in $\mathbb{P}$ is entailed by $G^*$ via d-separation. Formally: for all disjoint sets $X, Y, \mathbf{Z}$,
> $$X \perp\!\!\!\perp_{\mathbb{P}} Y \mid \mathbf{Z} \implies X \perp\!\!\!\perp_{G^*} Y \mid \mathbf{Z}.$$
> The converse ($G^*$ implies $\mathbb{P}$) is the Markov condition, which is assumed always. Faithfulness adds that there are no "accidental" CIs — all independencies arise from the graph structure.
^def-faithfulness

Faithfulness fails when path coefficients cancel exactly (a measure-zero event for continuous parameters). It is often called the "generic" assumption: it holds for "almost all" parameter values in a given model class.

### The PC Algorithm (Original Version)

> [!theorem] Algorithm: PC (Spirtes, Glymour & Scheines 2000)
> **Phase 0 — Initialize.** Let $C \leftarrow K_d$ (complete undirected graph). Set $\text{Sep}(X,Y) \leftarrow \emptyset$ for all pairs.
>
> **Phase 1 — Skeleton learning.** For $\ell = 0, 1, 2, \ldots$ (increasing conditioning set size):
> - While there exists an adjacent pair $(X, Y)$ in $C$ with $|\text{adj}(C, X) \setminus \{Y\}| \geq \ell$:
>   - For each subset $\mathbf{S} \subseteq \text{adj}(C, X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$:
>     - If $\mathcal{T}(X, Y, \mathbf{S})$ returns true (independence found):
>       - Remove edge $X - Y$ from $C$
>       - Set $\text{Sep}(X, Y) \leftarrow \text{Sep}(Y, X) \leftarrow \mathbf{S}$
>       - **Break** to next pair $(X, Y)$
> - Increment $\ell$; stop when no pair satisfies the degree condition.
>
> **Phase 2 — V-structure orientation.** For each unshielded triple $X - Z - Y$ (with $X \not\sim Y$):
> - If $Z \notin \text{Sep}(X, Y)$: orient $X \to Z \leftarrow Y$ (collider / v-structure).
>
> **Phase 3 — Edge completion.** Apply Meek's rules R1–R4 (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]]) until no further edges can be oriented.
>
> **Return** $C$ (the estimated CPDAG).
^alg-pc

**Intuition for Phase 1.** The key insight is that the graph is being pruned level by level. At $\ell=0$,
test marginal independence (remove edges $X - Y$ if $X \perp\!\!\!\perp Y$). At $\ell=1$, test
conditional independence given singletons. The adjacencies at level $\ell$ are determined by which edges
survived all lower levels — this is what makes the algorithm efficient: by $\ell=2$, most edges have
already been pruned for sparse graphs.

**Intuition for Phase 2.** A collider $X \to Z \leftarrow Y$ is detectable: if $Z \notin \text{Sep}(X,Y)$,
then conditioning on $Z$ **opens** the path (explaining away), creating dependence. If
$Z \in \text{Sep}(X, Y)$, then $Z$ was used to separate $X$ and $Y$, meaning $Z$ is *not* a collider.

### Correctness Theorem

> [!theorem] Theorem: Consistency of PC (Spirtes et al. 2000, Theorem 5.1)
> Assume:
> 1. **Markov condition:** The true distribution $\mathbb{P}$ satisfies the Markov condition for $G^*$.
> 2. **Faithfulness:** $\mathbb{P}$ and $G^*$ satisfy faithfulness.
> 3. **Oracle CI test:** Each call to $\mathcal{T}(X, Y, \mathbf{S})$ returns the correct answer.
>
> Then PC returns the true CPDAG $\text{CPDAG}(G^*)$.
>
> **Statistical version:** With Fisher's Z test at level $\alpha_n \to 0$ (slower than $n^{-1/2}$), PC is consistent in the high-dimensional setting $d = O(n^a)$ for some $a < 1$ under additional sparsity and tail conditions (Kalisch & Bühlmann 2007).
^thm-pc-consistency

### Complexity

**Worst case:** The number of subsets of size $\ell$ tested per pair is $\binom{d-2}{\ell}$. Over all pairs and levels, the total tests is $O(d^2 \cdot 2^{d-2})$ — exponential in $d$.

**Sparse case (bounded degree $\Delta$):** If the maximum degree of the true graph is $\Delta$, Phase 1
terminates at $\ell \leq \Delta$ and performs at most $O(d^2 \cdot \binom{\Delta}{\lfloor\Delta/2\rfloor})$ tests — polynomial in $d$ for fixed $\Delta$.

In practice, real graphs are sparse (small $\Delta$), making PC tractable. The bottleneck is the CI test
computation, which is $O(n \cdot \ell^2)$ per Fisher-Z test.

### Stable PC (Colombo & Maathuis 2014)

The original PC algorithm is **order-dependent**: the skeleton in Phase 1 depends on the order in which
variable pairs are processed, because removing an edge changes the adjacency sets used in subsequent tests.

> [!definition] Definition: Order-Dependence in PC
> In the original PC, consider two pairs $(X, Y)$ and $(X, W)$. If $W$ was removed from the adjacency set of $X$ (due to finding $X \perp\!\!\!\perp W \mid \mathbf{S}_1$) before testing $(X, Y)$, then $W$ will not appear in the conditioning sets for $(X, Y)$. But if the pairs were processed in reverse order, $W$ might still be adjacent and could be used as a conditioning variable. The skeleton can thus differ based on processing order — especially in high dimensions.
^def-order-dependence

**Stable PC fix (Colombo & Maathuis 2014):**

> [!theorem] Algorithm: Stable PC
> Modify Phase 1 as follows: during each pass at level $\ell$, **record** all edges to be removed but **do not remove them** until the entire pass is complete. Specifically:
> - At the start of level $\ell$: compute the **adjacency sets** $\text{adj}(C, X)$ for all $X$ using the current $C$. Fix these adjacency sets for the entire level-$\ell$ pass.
> - For each pair $(X, Y)$ adjacent in $C$: test all $\mathbf{S} \subseteq \text{adj}(C, X) \setminus \{Y\}$ with $|\mathbf{S}|=\ell$ using the fixed adjacency sets.
> - After all tests at level $\ell$: remove all edges for which independence was found.
>
> This produces an **order-independent** skeleton: the same skeleton regardless of variable ordering.
^alg-stable-pc

Colombo & Maathuis (2014) prove that stable PC is also consistent (Theorem 3.4) and show empirically
that it reduces false positive edges in high-dimensional settings compared to the original PC.

### CI Tests in Practice

The most widely used CI test in PC is **Fisher's Z test** for Gaussian linear models:

> [!example] Example: Fisher's Z Test for PC
> For a Gaussian linear model, test $X \perp\!\!\!\perp Y \mid \mathbf{S}$ by computing the **partial correlation** $\rho_{XY \mid \mathbf{S}}$ (residuals of regressing $X$ and $Y$ on $\mathbf{S}$). The test statistic:
> $$z_{XY \mid \mathbf{S}} = \frac{\sqrt{n - |\mathbf{S}| - 3}}{2} \log\frac{1 + \hat{\rho}_{XY \mid \mathbf{S}}}{1 - \hat{\rho}_{XY \mid \mathbf{S}}}$$
> is approximately $N(0,1)$ under the null $\rho_{XY \mid \mathbf{S}} = 0$.
> Reject the null (keep the edge) if $|z_{XY \mid \mathbf{S}}| > \Phi^{-1}(1-\alpha/2)$.
^ex-fisher-z

For nonlinear or non-Gaussian models, use kernel-based CI tests (KCI, HSIC-based) at the cost of
higher computational complexity.

**R implementations:** `pcalg` package (Kalisch et al., JMLR 2012). `bnlearn`, `causal-learn` (Python).

### Failure Modes

| Failure mode | Cause | Consequence |
|---|---|---|
| False positive edges | Type II error in CI tests (under $\alpha$ too small, or high dimension) | Spurious edges in skeleton |
| False negative edges (missed edges) | Type I error in CI tests ($\alpha$ too large) or faithfulness violation | Missing true edges |
| Wrong orientation | V-structure mis-detection due to finite-sample errors | Incorrect arrow directions in CPDAG |
| Order-dependence (original PC) | Sequential edge removal changes conditioning sets | Inconsistent results across orderings |

## Connections

- **Output is always a CPDAG:** PC cannot distinguish members of the same MEC. See [[Markov Equivalence and CPDAGs]].
- **GES solves the same problem via a score:** [[GES Algorithm]] is the score-based alternative; both are asymptotically equivalent under faithfulness but have different finite-sample properties.
- **NOTEARS comparison:** [[NOTEARS - Overview]] outputs a single DAG (not a CPDAG) and requires a linear SEM; PC is distribution-free. The landscape table in [[DAG Structure Learning Problem]] places PC among "constraint-based" methods.
- **Faithfulness connects to the Conditional Independence Assumption:** The [[Conditional Independence Assumption]] (CIA) used in [[Propensity Score Matching - Overview]] and [[Frequentist Causal Estimation]] is the selection-on-observables assumption — a different use of CI than faithfulness here. Faithfulness is a *graphical* assumption about the DGP, CIA is an *identification* assumption for causal effects.
- **ABM output as observational data:** [[Summary Causal DAGs]] (Zeng 2025) uses DAG summarization — structure learning (via PC or GES) would precede the summarization step. This is the bridge to the vault's ABM work.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG definition, Verma & Pearl, Meek's rules
- [[GES Algorithm]] — score-based alternative; Chickering (2002)
- [[DAG Structure Learning Problem]] — the problem both PC and GES solve; NP-hardness of program (4)
- [[NOTEARS - Overview]] — continuous-optimization approach; comparison with PC in §3
- [[Directed Acyclic Graphs]] — DAG semantics, d-separation, back-door criterion
- [[Summary Causal DAGs]] — downstream use of a learned DAG structure
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-knowledge approach (no CI testing)
