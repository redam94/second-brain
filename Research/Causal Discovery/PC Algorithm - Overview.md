---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch07-PC-algorithm-REFERENCE.md]]"
source_location: "Kalisch & Bühlmann (2007) §1–3; Spirtes, Glymour & Scheines (2000) Ch. 5–6"
date_ingested: 2026-10-27
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
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "constraint-based structure learning"
  - "Spirtes Glymour Scheines"
  - "pcalg"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> foundational **constraint-based** causal structure learning algorithm. It recovers the
> **CPDAG** of the true DAG from observational data by exploiting conditional independence
> (CI) tests: edges are removed when a **separating set** $S_{XY}$ is found such that
> $X \perp\!\!\!\perp Y \mid S_{XY}$. Under the faithfulness assumption and with consistent
> CI tests, PC is asymptotically correct. Kalisch & Bühlmann (2007) prove it is
> uniformly consistent for **high-dimensional sparse Gaussian DAGs** even when $p \gg n$.

## Overview

Causal structure learning has two broad paradigms: *score-based* methods (GES, NOTEARS) that
search for the graph maximizing a goodness-of-fit score, and *constraint-based* methods that
test which conditional independences hold in the data and use these as constraints to identify
the graph. The **PC algorithm** is the canonical constraint-based approach. Its name honors
**P**eter Spirtes and **C**lark Glymour, its original developers.

The key insight: in a faithful distribution, **every conditional independence $X \perp Y \mid S$
implies a d-separation $X \perp_G Y \mid S$ in the true DAG**. By exhaustively testing CI
relations, PC can recover the DAG's skeleton and v-structures, and hence its CPDAG.

## Main Content

### Assumptions

> [!definition] Definition: Causal Markov Condition
> A distribution $\mathbb{P}$ over variables $V$ satisfies the **causal Markov condition** with
> respect to DAG $G$ if every variable $X_i$ is conditionally independent of its
> non-descendants given its parents:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}_G(X_i).$$
^def-causal-markov

> [!definition] Definition: Faithfulness
> A distribution $\mathbb{P}$ is **faithful** to DAG $G$ if every conditional independence
> in $\mathbb{P}$ corresponds to a d-separation in $G$:
> $$X \perp\!\!\!\perp Y \mid Z \text{ in } \mathbb{P} \quad\Longrightarrow\quad X \perp_G Y \mid Z.$$
> Together with the Markov condition, faithfulness makes CI tests a reliable guide to graph
> structure. Under faithfulness, CI and d-separation are equivalent.
^def-faithfulness

> [!note] Faithfulness vs. Markov condition
> Markov says: d-separation → CI. Faithfulness adds the converse: CI → d-separation.
> Faithfulness can fail in measure-zero sets of parameters (e.g., exact coefficient cancellations).
> Kalisch & Bühlmann (2007) use a *strong faithfulness* condition for finite-sample consistency.

> [!definition] Definition: Causal Sufficiency
> The observed variable set $V$ is **causally sufficient** if there are no unmeasured common
> causes (latent confounders) between any pair of variables in $V$. PC requires causal
> sufficiency; extensions (FCI algorithm) relax this.
^def-causal-sufficiency

### Algorithm phases

The PC algorithm has three phases: **skeleton recovery**, **v-structure orientation**, and
**Meek rule propagation**.

#### Phase 1: Skeleton recovery

> [!definition] Definition: PC Skeleton Recovery (SGS/PC algorithm, Phase 1)
> **Input:** $n$ i.i.d. observations of $p$ variables; a CI test with significance level $\alpha$.
>
> 1. Start with the **complete undirected graph** $C$ on $p$ nodes.
> 2. For each pair $(X, Y) \in C$, test CI given **increasing subsets** $S \subseteq \mathrm{Adj}(X) \setminus \{Y\}$:
>    - For $\ell = 0, 1, 2, \ldots$: for each pair $(X,Y)$ still adjacent, for each
>      $S \subseteq \mathrm{Adj}(X) \setminus \{Y\}$ with $|S| = \ell$:
>      - If the CI test accepts $X \perp\!\!\!\perp Y \mid S$: **remove edge** $X$–$Y$,
>        store $\hat{S}_{XY} \leftarrow S$ (the **separation set**), break inner loop.
>    - Increment $\ell$. Stop when $\ell > \max_{X} |\mathrm{Adj}(X)|$.
>
> **Output:** Skeleton $\hat{G}^{\text{skel}}$; separation sets $\{\hat{S}_{XY}\}$.
^def-skeleton-recovery

The key efficiency insight: CI tests are nested by *conditioning set size* $\ell$. For sparse
graphs, most edges are removed at small $\ell$, so the algorithm avoids high-dimensional
conditioning sets where power degrades. This is why PC is practical even for large $p$.

#### Phase 2: V-structure orientation

> [!definition] Definition: V-structure Orientation (Phase 2)
> For every **unshielded triple** $X - Z - Y$ (where $X$ and $Y$ are not adjacent):
> - If $Z \notin \hat{S}_{XY}$: orient as **collider** $X \to Z \leftarrow Y$ (v-structure).
> - Otherwise: leave undirected.
^def-vstructure-orientation

The logic: if $Z \notin \hat{S}_{XY}$ (the set that made $X$ and $Y$ independent), then
conditioning on $Z$ would make $X$ and $Y$ *more* dependent — the hallmark of a collider.

#### Phase 3: Meek rules

Apply the four **Meek orientation rules** (see [[Markov Equivalence Classes and CPDAGs]]) to
propagate orientations without creating new v-structures or directed cycles. The result is the
estimated **CPDAG** $\hat{\mathcal{C}}$.

### CI tests for Gaussian data

For jointly Gaussian data, the CI test uses **partial correlations**:

> [!definition] Definition: Fisher's Z-Test for Partial Correlation
> Under the Gaussian assumption, $X \perp\!\!\!\perp Y \mid S$ iff the partial correlation
> $\rho_{XY \cdot S} = 0$. The test statistic is:
> $$z = \sqrt{n - |S| - 3} \cdot \frac{1}{2} \ln \frac{1 + \hat{\rho}_{XY \cdot S}}{1 - \hat{\rho}_{XY \cdot S}},$$
> which is approximately $\mathcal{N}(0,1)$ under $H_0: \rho_{XY \cdot S} = 0$.
> Reject $H_0$ (keep edge $X$–$Y$) if $|z| > z_{1-\alpha/2}$.
^def-fishers-z

The partial correlation $\hat{\rho}_{XY \cdot S}$ can be computed from the sample covariance
matrix via recursive formula or matrix inversion, making Phase 1 computationally efficient.

### Consistency in high dimensions

> [!theorem] Theorem: High-Dimensional Consistency of PC (Kalisch & Bühlmann 2007, Thm. 3)
> Suppose data are i.i.d. $\mathcal{N}(0, \Sigma)$ from a DAG $G^*$ with $p$ nodes and
> maximum neighborhood size $q^*$. Let $\hat{\mathcal{C}}_n$ be the CPDAG output by PC
> with significance level $\alpha_n \to 0$ such that $\sqrt{n} \alpha_n \to \infty$.
>
> Under **strong faithfulness** (minimum partial correlations bounded away from zero),
> and if $q^* = O(n^\delta)$ for some $\delta \in [0, 1/2)$:
> $$\mathbb{P}(\hat{\mathcal{C}}_n = \mathcal{C}^*) \to 1 \quad \text{as } n \to \infty.$$
> This holds even when $p$ grows polynomially in $n$: $\log p = O(n^{1-2\delta})$.
^thm-consistency

> [!note] What "strong faithfulness" means in practice
> Kalisch & Bühlmann require that partial correlations not just be non-zero (faithfulness)
> but bounded below: $|\rho_{XY\cdot S}| \geq c$ for some $c > 0$ that decreases slowly
> as $n$ grows. This excludes distributions that are "nearly unfaithful" — where coefficient
> cancellations make a partial correlation close to (but not exactly) zero.

### Computational complexity

- **Phase 1** (skeleton): In the worst case, $O(p^{q^*+2})$ CI tests (all pairs, all subsets
  of size $\leq q^*$). For **sparse** graphs with $q^* = O(1)$, this is polynomial in $p$.
- The bottleneck for dense graphs is $q^*$ — PC degrades badly when nodes have many neighbors.
- **Order-independent PC** (Colombo & Maathuis 2014): the original PC is **not** order-independent
  (different variable orderings can yield different skeletons in finite samples). The `stable.v2`
  variant in the `pcalg` R package implements the order-independent version.

## Examples

> [!example] Example: PC on a Three-Variable System
> True DAG: $X \to Y \to Z$, with $X \not\to Z$ (Markov chain). Variables are jointly Gaussian.
>
> **Phase 1 skeleton recovery:**
> - $\ell = 0$: Test $X \perp Z$ (marginal). Fail to reject (X and Z are marginally dependent
>   through Y) → keep edge $X$–$Z$.
> - $\ell = 1$: Test $X \perp Z \mid Y$. Reject → remove edge $X$–$Z$.
>   Set $\hat{S}_{XZ} = \{Y\}$.
>   All other pairs ($X$–$Y$, $Y$–$Z$) tested: not independent → kept.
> - Skeleton: $X - Y - Z$ (correct).
>
> **Phase 2 v-structures:**
> - Unshielded triple: $X - Y - Z$ (X,Z not adjacent).
> - $Y \in \hat{S}_{XZ} = \{Y\}$ → Y is in the sep set → **not** a v-structure.
> - No v-structures found.
>
> **Phase 3 Meek rules:** No directed edges yet → no propagation possible.
>
> **Output CPDAG:** $X - Y - Z$ (all edges undirected). This is correct: the chain
> $X \to Y \to Z$ and the anti-chain $X \leftarrow Y \leftarrow Z$ are Markov equivalent.

## Connections

- **Contrast with GES**: PC tests CI constraints; GES maximizes a score. PC is often faster
  when $p$ is large and the graph is sparse; GES has stronger theoretical guarantees (consistent
  under weaker assumptions). See [[GES - Greedy Equivalence Search]].
- **Contrast with NOTEARS**: NOTEARS uses continuous optimization over a score — it does not
  test CI constraints. NOTEARS is compared against PC in [[NOTEARS Experiments]].
- **FCI algorithm**: The **Fast Causal Inference** algorithm relaxes causal sufficiency (allows
  latent confounders). It outputs a **PAG** (partial ancestral graph) instead of a CPDAG.
- **High-dimensional sparse graphs**: The vault's ABM and econometric models often have many
  variables with sparse connectivity — exactly the regime where PC is theoretically justified.
  See [[NOTEARS Experiments]] for benchmarks, and [[DAG Structure Learning Problem]] for context.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the output format of PC (CPDAGs, Meek rules)
- [[GES - Greedy Equivalence Search]] — score-based alternative, same output format
- [[DAG Structure Learning Problem]] — broader context and landscape of methods
- [[NOTEARS - Overview]] — continuous optimization alternative that benchmarks against PC
- [[Directed Acyclic Graphs]] — d-separation, faithfulness, and causal DAG semantics
- [[Summary Causal DAGs]] — DAG summarization for ABMs that assumes a given DAG (structure learning precedes this)
- [[LLM Expert Elicitation for Bayesian Networks]] — expert-elicitation approach to structure vs. data-driven learning here
