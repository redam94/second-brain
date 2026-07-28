---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "§3 — PC algorithm, CI tests, correctness, high-dimensional extension"
date_ingested: 2026-07-28
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Causal Structure Learning - Overview]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based structure learning"
  - "PC-stable"
  - "Spirtes Glymour Scheines"
  - "Fisher Z-test structure learning"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 1993/2000) is the canonical
> **constraint-based** method for causal structure learning. It recovers the skeleton of
> a causal DAG by testing conditional independence (CI) between variable pairs, orients
> v-structures from the separation sets, and applies [[Markov Equivalence and CPDAGs#Meek's Orientation Rules (R1–R4)|Meek's orientation rules]].
> Under the Markov condition and faithfulness, PC returns the true CPDAG in the large-sample
> limit. The **PC-stable** variant (Colombo & Maathuis, 2014) removes an order-dependence
> problem; the **high-dimensional** extension (Kalisch & Bühlmann, 2007) proves consistency
> when $p \gg n$ under sparsity.

## Overview

The name "PC" stands for **P**eter (Spirtes) and **C**lark (Glymour), the algorithm's
principal inventors, and was formalized in the book *Causation, Prediction, and Search*
(SGS, 2000). It addresses causal discovery under the assumption of **causal sufficiency**
(no latent confounders) and **faithfulness**. Its key insight: conditional independence
implies the absence of a direct causal path (after conditioning on appropriate sets), so
exhaustive CI testing can identify the DAG's skeleton.

PC is implemented in R's `pcalg` package and Python's `causal-learn` library. It appears
as a baseline in [[NOTEARS Experiments]], where it is compared against GES and NOTEARS.

## Main Content

### Algorithm (3-Phase Structure)

> [!definition] PC Algorithm
> **Input:** Variables $\mathbf{V} = \{X_1, \ldots, X_d\}$; CI test with significance level $\alpha$.
> **Output:** CPDAG of the Markov equivalence class of the true DAG.
>
> **Phase 1 — Skeleton estimation (constraint-based edge removal):**
> 1. Start with $\mathcal{C}$ = complete undirected graph on $\mathbf{V}$.
> 2. For conditioning set size $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$ in $\mathcal{C}$:
>      - For each $\mathbf{S} \subseteq \text{adj}_\mathcal{C}(X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$:
>        - If $X \perp\!\!\!\perp Y \mid \mathbf{S}$ (CI test passes):
>          - Remove edge $X - Y$; record $\mathbf{S}$ as $\text{sepset}(X, Y)$; break inner loop
>    - Stop when $\ell > \max$ adjacency degree or no edges were removed.
>
> **Phase 2 — V-structure orientation:**
> - For each triple $X - Z - Y$ in the skeleton where $X, Y$ **not adjacent**:
>   - If $Z \notin \text{sepset}(X, Y)$: orient $X \to Z \leftarrow Y$ (v-structure).
>   - Else: leave $X - Z - Y$ (Z was in the separating set, so Z is not a collider).
>
> **Phase 3 — Meek orientation rules:**
> - Repeatedly apply R1–R4 (see [[Markov Equivalence and CPDAGs]]) until no change.

^pc-algorithm

**Intuition for Phase 2:** If $Z$ is in $\text{sepset}(X, Y)$ — the set that renders $X \perp\!\!\!\perp Y$ — then conditioning on $Z$ blocks the $X-Z-Y$ path, so $Z$ is a *non-collider* on that path. If $Z \notin \text{sepset}(X, Y)$, the path $X-Z-Y$ is blocked without conditioning on $Z$: $Z$ must be a collider. This is the key link from CI tests to v-structure detection.

### Conditional Independence Tests

> [!definition] Fisher Z-Test (Gaussian data)
> For Gaussian variables, test $X \perp\!\!\!\perp Y \mid \mathbf{S}$ using the
> **partial correlation** $\hat{\rho}_{XY|\mathbf{S}}$:
>
> $$Z = \frac{1}{2}\ln\frac{1 + \hat{\rho}_{XY|\mathbf{S}}}{1 - \hat{\rho}_{XY|\mathbf{S}}}
> \qquad (\text{Fisher's z-transformation})$$
>
> Under $H_0: \rho_{XY|\mathbf{S}} = 0$:
> $$\sqrt{n - |\mathbf{S}| - 3} \cdot Z \;\xrightarrow{d}\; \mathcal{N}(0, 1)$$
>
> Reject independence if $|Z_\text{stat}| > z_{\alpha/2}$.
>
> **Limitation:** Valid only for Gaussian data. Misspecified if variables are non-Gaussian
> or relationships are non-linear (partial correlation is zero iff uncorrelated for Gaussians).

^fisher-z-test

> [!definition] G² Test (Discrete data)
> For discrete variables, test $X \perp\!\!\!\perp Y \mid \mathbf{S}$ via the likelihood-ratio statistic:
>
> $$G^2 = 2 \sum_{x, y, \mathbf{s}} n_{xy\mathbf{s}} \ln \frac{n_{xy\mathbf{s}} \cdot n_{\mathbf{s}}}{n_{x\mathbf{s}} \cdot n_{y\mathbf{s}}}$$
>
> Under $H_0$: $G^2 \sim \chi^2$ with $(|\mathcal{X}|-1)(|\mathcal{Y}|-1)\prod_{k}|\mathcal{S}_k|$ degrees of freedom.

> [!definition] Non-Parametric Tests (non-linear/non-Gaussian)
> - **HSIC** (Hilbert-Schmidt Independence Criterion): $\text{HSIC}(X, Y \mid \mathbf{S})$ based
>   on kernel embeddings. Consistent against all alternatives.
> - **KCI** (Kernel Conditional Independence test, Zhang et al., 2012): extends HSIC to
>   conditional independence. Implemented in `causal-learn`.

### Correctness under Faithfulness

> [!theorem] PC Consistency (Spirtes, Glymour & Scheines, 2000)
> Suppose:
> 1. The true distribution $P$ is Markov with respect to some DAG $G$.
> 2. $P$ is faithful to $G$.
> 3. A perfect CI oracle is used (no Type I or Type II errors).
>
> Then the PC algorithm returns the **CPDAG of $G$** — the unique CPDAG representing the
> Markov equivalence class of $G$.
>
> In finite samples, with a CI test at level $\alpha = \alpha(n) \to 0$ as $n \to \infty$,
> PC is **pointwise consistent** (the probability of returning the wrong CPDAG goes to 0).

^pc-consistency

**Caveat:** Finite-sample PC can accumulate errors across CI tests (multiple testing problem). The graph estimated may differ from the true CPDAG when $n$ is small or many CI tests are performed.

### PC-Stable: Removing Order-Dependence

The original PC algorithm has an **order-dependence** problem: the skeleton and v-structures can differ depending on the ordering of variables and edges, because edges removed early in one iteration affect which conditioning sets are available for later tests in the same iteration.

> [!definition] PC-Stable (Colombo & Maathuis, 2014)
> **PC-stable** removes order-dependence by:
> - **Storing** all CI relations found in iteration $\ell$ before removing any edges
> - **Using** adjacency sets from the *beginning* of iteration $\ell$ (not mid-iteration updates)
>   for all conditioning sets in that $\ell$-round
>
> Result: PC-stable produces the **same skeleton and v-structures regardless of variable ordering**
> (given fixed CI tests). It is the default implementation in `pcalg::pc()`.

### High-Dimensional Extension

> [!theorem] High-Dimensional Consistency (Kalisch & Bühlmann, 2007)
> Suppose the true DAG $G = G_n$ has maximum vertex degree $q = O(n^{1-\beta})$ for some
> $\beta > 0$, and suppose $P$ is faithful to $G$ with minimum partial correlation
> $\rho_{\min} = \rho_{\min}(n)$ bounded below (sparsity + signal conditions).
>
> Then PC with Fisher Z-test at level $\alpha = \alpha(n) \to 0$ appropriately is consistent
> even as $p = p(n) \to \infty$ (specifically $\ln p = o(n^{1-2\beta})$):
> $$P(\widehat{\text{CPDAG}}_n = \text{CPDAG}(G_n)) \to 1 \text{ as } n \to \infty$$
>
> This enables PC for **gene expression networks** and other high-dimensional settings
> ($p$ in thousands, $n$ in hundreds).

### Failure Modes

1. **Faithfulness violations**: when two paths cancel exactly (zero partial correlation despite adjacency), PC incorrectly removes edges. These cases have measure zero but can appear in adversarial or near-cancellation settings.

2. **Large conditioning sets**: when the graph is dense ($q$ large), testing $X \perp\!\!\!\perp Y \mid \mathbf{S}$ for $|\mathbf{S}|$ large is statistically unreliable (low power) and computationally expensive.

3. **Latent confounders**: causal sufficiency assumed. If there are hidden common causes, use **FCI** (Fast Causal Inference) which outputs a PAG (partial ancestral graph) instead.

4. **Multiple testing accumulation**: each CI test at level $\alpha$ contributes false positives. In large graphs, use Bonferroni correction or FDR control on the CI tests.

## Examples

> [!example] PC on a Simple 3-Variable System
> Variables: $\{X, Y, Z\}$, true DAG: $X \to Z \leftarrow Y$ (v-structure, $X \perp\!\!\!\perp Y$).
>
> **Phase 1 (skeleton):**
> - Test $X \perp\!\!\!\perp Y \mid \emptyset$: if true (they are marginally independent), remove $X - Y$.
>   Set $\text{sepset}(X, Y) = \emptyset$.
> - Test $X \perp\!\!\!\perp Z \mid \emptyset$: not independent (X → Z) → keep $X - Z$.
> - Test $Y \perp\!\!\!\perp Z \mid \emptyset$: not independent (Y → Z) → keep $Y - Z$.
> - $\ell = 1$: No adjacency sets of size 1 make $X \perp\!\!\!\perp Z$ or $Y \perp\!\!\!\perp Z$.
>
> **Skeleton:** $X - Z - Y$ (same as true skeleton).
>
> **Phase 2 (v-structures):**
> - Triple $X - Z - Y$, $X$ and $Y$ not adjacent.
> - Is $Z \in \text{sepset}(X, Y) = \emptyset$? **No** → orient $X \to Z \leftarrow Y$.
>
> **Phase 3 (Meek rules):** No undirected edges remain.
>
> **Output CPDAG:** $X \to Z \leftarrow Y$ ✓ — matches true structure.

## Connections

- [[GES - Greedy Equivalence Search]]: score-based alternative; GES and PC target the same CPDAG but differ fundamentally in approach
- [[NOTEARS Experiments]]: PC is a baseline algorithm in the NOTEARS benchmarks (SGS/PC row in Table 1)
- [[Markov Equivalence and CPDAGs]]: CPDAGs and Meek rules — PC's Phase 2 and 3 output
- [[LLM Expert Elicitation for Bayesian Networks]]: structure elicitation as expert-knowledge complement to PC-based discovery; Zeng 2025 (§4 of [[Summary Causal DAGs]]) assumes the DAG is given — PC would precede summarization
- [[BN Construction Methods Comparison]]: PC is one of three BN structure learning strategies (expert, score-based, constraint-based)
- [[Directed Acyclic Graphs]]: d-separation and the Markov condition underlie PC's correctness

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAGs, v-structures, Meek rules (Phases 2–3 of PC)
- [[GES - Greedy Equivalence Search]] — score-based alternative
- [[Causal Structure Learning - Overview]] — paradigm map and comparison table
- [[NOTEARS - Overview]] — continuous-optimization alternative; PC is a baseline in NOTEARS experiments
- [[BN Construction Methods Comparison]] — PC among BN learning strategies
- [[Causal Discovery/_Index|Causal Discovery Index]]
