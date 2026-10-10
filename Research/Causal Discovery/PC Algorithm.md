---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo-maathuis2014-PC-source.md]]"
source_location: "§2–§4 (Colombo & Maathuis 2014); Spirtes et al. 2000 Ch.5"
date_ingested: 2026-10-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Greedy Equivalence Search (GES)]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "PC-stable"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991) is the canonical **constraint-based** causal
> structure learning algorithm. It recovers the **CPDAG** of the true DAG by (1) finding the
> skeleton through conditional independence (CI) tests, (2) orienting v-structures, and (3)
> propagating remaining edge directions via Meek rules. Under the **faithfulness** and **causal
> sufficiency** assumptions, PC is **consistent**: it returns the true CPDAG in the large-sample
> limit. A stabilized version, **PC-stable** (Colombo & Maathuis 2014), removes order-dependence
> in the skeleton phase. Software: R package `pcalg`; Python `causal-learn`.

## Overview

PC (named for **P**eter Spirtes and **C**lark Glymour) takes a radically different approach to
structure learning from score-based methods like [[Greedy Equivalence Search (GES)]].
Instead of optimizing a score, it directly tests the *conditional independence* relations in the
data. The key insight: each missing edge corresponds to a CI statement, and CI relations can
often be tested from data. By systematically finding *which edges are absent* (the
conditional independences), PC recovers the Markov structure of the underlying DAG.

The algorithm's three-phase structure directly mirrors the characterization of Markov equivalence
in [[Markov Equivalence Classes and CPDAGs]]: (1) learn the skeleton, (2) identify v-structures,
(3) apply Meek rules.

## Main Content

### Assumptions

PC requires two assumptions for consistency:

> [!definition] Definition: Causal Sufficiency
> The observed variables $X_1, \ldots, X_d$ are **causally sufficient** if there are no
> latent common causes (hidden confounders) among them. Every common cause of two observed
> variables is itself observed.
>
> Violation: if $X$ and $Y$ both have a hidden common cause $U$, PC may falsely retain the
> edge $X - Y$ (since $X \not\perp Y$ even conditional on observed variables).
^def-causal-sufficiency

> [!definition] Definition: Faithfulness (Spirtes et al. 2000)
> A distribution $\mathbb{P}$ is **faithful** to DAG $G$ if every conditional independence
> in $\mathbb{P}$ corresponds to a d-separation in $G$, and vice versa. Formally:
> $$X \perp_{\mathbb{P}} Y \mid S \iff X \perp_{G} Y \mid S \quad \text{for all } X, Y, S.$$
>
> Faithfulness rules out "accidental" cancellations where two paths cancel each other out to
> produce a CI that is not implied by the graph structure. It holds almost everywhere in
> parameter space (Meek 1995 — the set of unfaithful distributions has measure zero).
^def-faithfulness

### Phase 1: Skeleton discovery

PC begins with a **complete undirected graph** and removes edges by finding conditional
independences. The key efficiency: CI tests are performed from smallest to largest conditioning
set size $k$, so that most edges are removed with small (cheap) conditioning sets.

> [!theorem] Theorem: Skeleton Recovery (Spirtes et al. 2000, §5.4)
> **Algorithm (skeleton phase):**
>
> 1. Initialize: $H = K_d$ (complete graph over $d$ nodes), $\text{sep}(X,Y) = \emptyset$ for all $X,Y$.
> 2. For $k = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$ in $H$:
>      - For each subset $S \subseteq \text{adj}(H, X) \setminus \{Y\}$ with $|S| = k$:
>        - If $X \perp Y \mid S$: remove edge $X - Y$ from $H$; set $\text{sep}(X,Y) = \text{sep}(Y,X) = S$; break.
>    - Stop when no conditioning set of size $k$ exists for any adjacent pair.
> 3. Output: skeleton $H$ and separating sets $\text{sep}(X,Y)$.
>
> **Correctness:** Under faithfulness and causal sufficiency, the output skeleton equals the
> skeleton of the true DAG. Each removed edge corresponds to a true CI; each retained edge
> is truly adjacent in the DAG (no true CI holds for any conditioning set).
^thm-skeleton

**Complexity:** The skeleton phase has worst-case complexity $O(d^k \cdot \binom{d}{k})$ CI
tests, where $k$ is the maximum adjacency. For sparse graphs (bounded degree), this is
polynomial in $d$. For dense graphs, it degrades to exponential.

**Order-dependence problem:** The original PC algorithm updates adjacencies as edges are removed
during the loop, so later tests use an already-pruned graph. This means the result depends on
the order variables are processed. Colombo & Maathuis (2014) fix this with **PC-stable**:

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014, §3)
> In **PC-stable**, the set of adjacencies $\text{adj}(H, X)$ used as potential conditioning
> sets for level $k$ is **frozen at the beginning of level $k$** (saved before any edges are
> removed at that level). Edges are still removed during the level, but the conditioning sets
> used are those from the *start* of the level.
>
> **Result:** The skeleton of PC-stable is **order-independent** — the same regardless of
> variable ordering. The v-structures may still be order-dependent (as determining which
> separating set to use can differ), but Colombo & Maathuis also provide an order-independent
> v-structure orientation procedure.
^def-pc-stable

### Phase 2: V-structure orientation

Using the skeleton $H$ and separating sets from Phase 1, orient unshielded colliders:

> [!theorem] Theorem: V-Structure Identification (Spirtes et al. 2000, §5.4.2)
> **For every triple $(X, Z, Y)$** in the skeleton such that:
> - $X - Z$ is an edge, $Z - Y$ is an edge, but $X$ and $Y$ are **not** adjacent, and
> - $Z \notin \text{sep}(X, Y)$,
>
> orient the edges as $X \to Z \leftarrow Y$ (a v-structure).
>
> **Why:** If $Z$ is in the separating set of $X$ and $Y$, then $X \perp Y \mid Z$, which
> means conditioning on $Z$ blocks the path $X - Z - Y$. This is consistent with $Z$ being a
> *non-collider* on the path (chain or fork at $Z$). If $Z \notin \text{sep}(X,Y)$, then $Z$
> does not block the path — it must be a *collider* (v-structure) to be consistent with
> $X \not\perp Y \mid Z$.
^thm-v-structure-orient

### Phase 3: Meek orientation rules

After orienting v-structures, apply the **Meek (1995) orientation rules** exhaustively to orient
as many remaining edges as possible without introducing new v-structures or directed cycles.
See [[Markov Equivalence Classes and CPDAGs]] for the full statement of rules R1–R4.

The result is the **CPDAG** of the true DAG (under faithfulness and causal sufficiency in the
population limit).

### Consistency result

> [!theorem] Theorem: Consistency of PC (Spirtes et al. 2000; Colombo & Maathuis 2014)
> Let $\mathbb{P}$ be faithful to a DAG $G^*$ over $d$ nodes, with no latent confounders
> (causal sufficiency). As sample size $n \to \infty$, if the CI test is consistent (correct
> in the limit), then **PC returns the true CPDAG** of $G^*$ with probability tending to 1.
>
> For finite samples, PC is consistent at rate $O(\log n)$ for Gaussian data with the
> Fisher $z$-test under the Gaussian faithfulness assumption (Kalisch & Bühlmann 2007).
^thm-pc-consistency

### High-dimensional extension

Kalisch & Bühlmann (2007) extend PC to high-dimensional settings ($d \gg n$) using the
partial correlation test. Under sparsity (bounded neighborhood size), PC-HITON and the
standard PC algorithm with $\alpha$-level CI tests recover the skeleton with bounded FDR.

The key insight: because PC only tests CI relations for nodes within adjacency neighborhoods
(and neighborhoods are sparse), the number of tests grows polynomially with $d$ even when
$d \gg n$.

### CI tests used in practice

The choice of CI test is separate from the algorithm structure:

| Setting | CI test | Notes |
|---------|---------|-------|
| Continuous Gaussian | Partial correlation / Fisher $z$-test | Default, efficient |
| Continuous non-Gaussian | Kernel-based tests (KCI, HSIC) | Nonparametric, expensive |
| Discrete | $\chi^2$ test, $G^2$ test | Standard for categorical data |
| Mixed | Conditional mutual information | Combined approach |

## Examples

> [!example] Example: PC on a 4-node DAG
> **True DAG:** $X_1 \to X_2 \to X_4$, $X_3 \to X_2$, and $X_1 \to X_3$.
>
> **Phase 1 (skeleton):**
> - Start with complete graph $K_4$: all 6 edges present.
> - $k=0$: test marginal independence. $X_1 \perp X_4$? No (path $X_1 \to X_2 \to X_4$).
>   $X_1 \perp X_3$? No (direct edge). ... No edges removed at $k=0$.
> - $k=1$: test conditional independence given one variable.
>   $X_1 \perp X_4 \mid X_2$? Yes (blocked by $X_2$). Remove $X_1 - X_4$.
>   $X_3 \perp X_4 \mid X_2$? Yes. Remove $X_3 - X_4$.
>   No more removals. Skeleton: $X_1 - X_2$, $X_2 - X_4$, $X_1 - X_3$, $X_2 - X_3$.
>
> **Phase 2 (v-structures):**
> - Triple $(X_1, X_2, X_3)$: $X_1$ and $X_3$ are adjacent → shielded, skip.
> - Triple $(X_1, X_2, X_4)$: $X_1$ and $X_4$ non-adjacent, $\text{sep}(X_1, X_4) = \{X_2\}$,
>   $X_2 \in \text{sep}(X_1,X_4)$ → not a v-structure.
> - No unshielded colliders found in this example.
>
> **Phase 3 (Meek rules):**
> - No additional orientations forced.
>
> **Output CPDAG:** $X_1 - X_2 - X_4$, $X_1 - X_3 - X_2$ (all edges undirected — the true
> DAG is not uniquely identifiable from observational data alone in this case).

## Connections

- **vs. GES**: [[Greedy Equivalence Search (GES)]] is score-based and operates directly over
  the CPDAG search space; PC is constraint-based and works with CI tests. In practice, GES
  tends to be more accurate (score optimization is more statistically efficient than CI testing),
  but PC can handle non-parametric settings more naturally via kernel CI tests.
- **vs. NOTEARS**: [[NOTEARS - Overview]] is a score-based continuous optimization method that
  outputs a single DAG (not a CPDAG). PC is explicitly designed to output the CPDAG.
- **Latent confounders**: the FCI algorithm (Fast Causal Inference, Spirtes et al. 2000) is the
  extension of PC to settings with latent confounders. It outputs a **PAG** (Partial Ancestral
  Graph) rather than a CPDAG.
- **Faithfulness assumption**: the Markov assumption is necessary for any causal inference;
  faithfulness is an additional (strong) assumption that CI tests can reveal the full graph.
  Violations occur with structural near-cancellations.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — CPDAGs, v-structures, Meek rules
- [[Greedy Equivalence Search (GES)]] — score-based alternative to PC
- [[DAG Structure Learning Problem]] — the general problem PC is solving
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion (causal DAG reasoning)
- [[NOTEARS - Overview]] — continuous optimization, no CI tests needed
