---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-survey.md]]"
source_location: "§2, Spirtes & Glymour (1991); SGS (2000) Chs. 5–7; Kalisch & Bühlmann (2007); Colombo & Maathuis (2014)"
date_ingested: 2026-07-30
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "PC-algorithm"
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "constraint-based causal discovery"
  - "Spirtes Glymour PC"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; SGS 2000) is the foundational
> **constraint-based** method for causal structure learning from observational data.
> It reconstructs the CPDAG (Markov equivalence class) by testing conditional independence
> (CI) in the data: first estimating the undirected skeleton by removing edges whose endpoints
> are CI given some subset of the other variables, then orienting v-structures, then propagating
> Meek rules. The algorithm is consistent under faithfulness and causal sufficiency, scales
> to high dimensions when the true graph is sparse (Kalisch & Bühlmann 2007), and its
> order-dependence is fixed by **PC-stable** (Colombo & Maathuis 2014).

## Overview

The PC algorithm occupies the "constraint-based" column in the landscape of structure
learning methods — see [[DAG Structure Learning Problem]]. While score-based methods
like [[GES - Greedy Equivalence Search]] and [[NOTEARS - Overview]] optimize a numerical
criterion, PC works directly from conditional independence tests: it asks, for each pair
of variables, whether they are independent given some set of other variables, and uses
those answers to prune edges and orient the resulting skeleton.

The output is a **CPDAG** — the canonical representative of the Markov equivalence class.
See [[Markov Equivalence and CPDAGs]] for why observational data cannot identify a unique
DAG under the linear Gaussian model, and for the definition of CPDAGs, v-structures,
and Meek rules.

## Main Content

### Assumptions

> [!definition] Assumptions of the PC Algorithm (SGS 2000)
> 1. **Causal Markov condition**: The joint distribution $P$ factors as $\prod_i p(x_i \mid \mathrm{pa}_i(G))$.
> 2. **Causal Faithfulness Assumption (CFA)**: Every CI in $P$ is entailed by d-separation in $G$.
>    (No accidental cancellations of path effects.)
> 3. **Causal sufficiency**: All common causes of measured variables are themselves measured —
>    no latent confounders. (Dropped in [[GES - Greedy Equivalence Search#^sec-extensions|FCI]].)
> 4. **I.i.d. observations**: $n$ independent draws from a fixed distribution $P$.
^def-assumptions

Faithfulness is the critical assumption: it guarantees that every CI in the data corresponds
to a real d-separation in the true DAG, so no edges are spuriously removed by the tests.

### The three phases

#### Phase 1: Skeleton estimation

> [!theorem] PC Skeleton Procedure (SGS 2000, Algorithm 3.4)
> **Input**: $n$ i.i.d. samples from $P$; CI test at level $\alpha$.
> **Output**: Undirected skeleton $\tilde{G}$; separating sets $\mathrm{Sep}(X,Y)$.
>
> 1. Start with the **complete** undirected graph $\tilde{G}$ on $d$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$ in $\tilde{G}$:
>      - For each $S \subseteq \mathrm{adj}(\tilde{G}, X) \setminus \{Y\}$ with $|S| = \ell$:
>        - If $X \perp\!\!\!\perp Y \mid S$ (by the CI test at level $\alpha$):
>          - Remove $X\text{—}Y$ from $\tilde{G}$; set $\mathrm{Sep}(X,Y) = S$.
>          - Move to the next pair.
>    - If no remaining pair has $|\mathrm{adj}(\tilde{G}, X)| > \ell$, **stop**.
>
> The key idea: start with $\ell = 0$ (marginal independence tests), proceed to $\ell = 1$
> (first-order conditional), $\ell = 2$, …, stopping when the adjacency sets are too small
> to form conditioning sets of size $\ell$.
^thm-skeleton

**Soundness**: Under faithfulness, every removed edge $X\text{—}Y$ is absent from the true
skeleton because there exists a true d-separating set $S$ for $X$ and $Y$. No edges present
in the true skeleton are removed (under exact CI tests).

**Efficiency**: The key insight is that conditioning sets of size $\ell$ are formed from
**adjacencies** in the *current* graph — so as edges are removed, fewer sets need to be tested.
Under sparsity (max degree $q$), the algorithm terminates at $\ell = q$ and runs in time
$O(d^2 \cdot \binom{q}{q}) = O(d^2 \cdot q^{\ell})$ — polynomial under bounded $q$.

#### Conditional independence test for Gaussian data

For $X,Y$ continuous and joint Gaussian, the partial correlation $\rho_{XY \mid S}$ is zero
iff $X \perp\!\!\!\perp Y \mid S$. Test using Fisher's $z$-transformation:

$$z_{XY|S} = \frac{1}{2}\log\frac{1+\hat{\rho}_{XY|S}}{1-\hat{\rho}_{XY|S}}$$

Reject $H_0: X \perp\!\!\!\perp Y \mid S$ (remove the edge) if:
$$\bigl|\sqrt{n - |S| - 3}\;\; z_{XY|S}\bigr| \;>\; \Phi^{-1}\!\bigl(1 - \tfrac{\alpha}{2}\bigr).$$

For non-Gaussian or discrete data, kernel-based tests (HSIC, KCI) or $G^2$ tests are used
instead — the PC algorithm is agnostic to the choice of test.

#### Phase 2: V-structure orientation

> [!theorem] V-structure orientation (SGS 2000, Rule R0)
> For each **unshielded triple** $X \text{—} Z \text{—} Y$ (i.e. $X$ and $Y$ are *not*
> adjacent in $\tilde{G}$):
> $$\text{If } Z \notin \mathrm{Sep}(X,Y): \quad\text{orient as } X \to Z \leftarrow Y.$$
>
> **Intuition**: If $Z$ is not in the separating set for $(X,Y)$, then conditioning on $Z$
> *opens* rather than blocks the $X$–$Y$ path (collider logic). This is the fingerprint of
> a v-structure (immorality).
^thm-vstructure

#### Phase 3: Meek rule propagation

Apply Meek's orientation rules R1–R4 (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]])
exhaustively to the partially oriented graph until no more edges can be directed. The result
is the **CPDAG**.

### Order dependence and PC-stable

**The problem**: In Phase 1, removing edge $X\text{—}Y$ shrinks $\mathrm{adj}(\tilde{G}, X)$,
which changes the conditioning sets available for later tests. The result: running PC in a
different variable order can produce different skeletons — not just due to finite-sample
noise, but as a *systematic* property of the algorithm.

> [!theorem] PC-stable (Colombo & Maathuis 2014)
> Replace the adjacency set in Phase 1 with the **skeleton from the previous iteration**
> $\ell - 1$ rather than the current (partially updated) graph. Specifically:
>
> At iteration $\ell$: for each pair $(X, Y)$, candidate conditioning sets are formed from
> $\mathrm{adj}_{(\ell-1)}(X) \setminus \{Y\}$ — the adjacencies of $X$ *before* any
> edges were removed at iteration $\ell$.
>
> This makes the skeleton **order-independent**: every pair $(X,Y)$ is tested using the same
> conditioning sets regardless of the order in which other pairs are processed.
^thm-pc-stable

PC-stable incurs slightly more CI tests than original PC (it re-tests some pairs with larger
conditioning sets that could already have been removed), but the difference is negligible in
practice. The `pcalg` R package implements PC-stable by default.

### High-dimensional consistency

> [!theorem] Consistency of PC (Kalisch & Bühlmann 2007, Theorem 2)
> Let $G^*$ be the true DAG with maximum degree $q$ and CPDAG $C^*$. Suppose:
> 1. **Sparse graph**: $q = o(n^{1/(2+2\kappa)})$ for some $\kappa > 0$.
> 2. **Bounded signals**: All non-zero partial correlations $\geq c/\sqrt{n}$ for some $c > 0$
>    (**strong faithfulness**).
> 3. **Calibrated level**: Significance level $\alpha_n \to 0$ with $n$ (e.g. $\alpha_n = 2(1-\Phi(c\sqrt{\log n}))$).
>
> Then $P(\hat{C}_n = C^*) \to 1$ as $n \to \infty$, even when $d = d_n \to \infty$.
^thm-consistency

This justifies using PC in high-dimensional genomics and neuroimaging applications where
$d \gg n$ — provided the true graph is sparse and partial correlations are not too small.

### Extensions

| Variant | Change from base PC | Use case |
|---------|--------------------|---------:|
| **PC-stable** (Colombo & Maathuis 2014) | Order-independent skeleton | Always preferred |
| **FCI** (Richardson & Spirtes 2002) | Drops causal sufficiency; outputs PAG | Latent confounders present |
| **RFCI** (Colombo et al. 2012) | Faster FCI | Large graphs with hidden vars |
| **CCD** (Richardson 1996) | Cyclic graphs | Feedback loops |
| **PCMCI** (Runge et al. 2019) | Adds lag selection for time series | Time-series causal discovery |

## Examples

> [!example] Toy: Chain vs. fork vs. collider
> **True DAG**: $A \to B \to C$ (chain / mediation).
> - $A \perp\!\!\!\perp C \mid B$ (marginally dependent, conditionally independent given B).
> - Sep$(A,C) = \{B\}$, so the B—C edge is retained.
> - Triple $A$—$B$—$C$ is unshielded. $B \in \mathrm{Sep}(A,C) = \{B\}$, so no v-structure.
> - Result: skeleton $A$—$B$—$C$ with no v-structure. The CPDAG has $A$—$B$—$C$ (both edges undirected).
>   The chain $A\to B\to C$, the fork $A\leftarrow B\to C$, and the reverse chain $A\leftarrow B\leftarrow C$
>   are all Markov equivalent — PC cannot distinguish them.
>
> **True DAG**: $A \to C \leftarrow B$ (v-structure / collider), $A$ and $B$ non-adjacent.
> - $A \perp\!\!\!\perp B$ (marginally), but $A \not\!\perp\!\!\!\perp B \mid C$.
> - Sep$(A,B) = \emptyset$ (empty set marginally separates them).
> - Triple $A$—$C$—$B$ is unshielded. $C \notin \mathrm{Sep}(A,B) = \emptyset$. Orient: $A \to C \leftarrow B$.
> - Result: CPDAG correctly shows the collider $A \to C \leftarrow B$ with both edges directed.
>   This direction IS identifiable.

## Connections

- **GES vs. PC**: GES is the score-based alternative; both target CPDAGs. PC is more flexible
  (any CI test); GES is order-independent and has stronger consistency guarantees via Meek Conjecture.
  See [[GES - Greedy Equivalence Search]].
- **NOTEARS vs. PC**: NOTEARS searches $\mathbb{R}^{d\times d}$ via continuous optimization and outputs
  a DAG; PC searches the skeleton by CI tests and outputs a CPDAG. The NOTEARS paper reports PC
  as "significantly weaker" in experiments (supplement), but this reflects the specific Gaussian
  linear SEM setting — PC is more general. See [[NOTEARS - Overview]].
- **Causal discovery in the ABM context**: PC could be applied to observational ABM output
  data to recover the causal DAG linking agent-level variables — the connection flagged in
  [[Summary Causal DAGs]] §4 (Zeng 2025). See [[LLM Expert Elicitation for Bayesian Networks]]
  for the expert-based alternative to algorithmic discovery.
- **Bayesian network learning**: PC (constraint-based) and GES (score-based) are the two main
  frequentist structure-learning paradigms; [[BN Construction Methods Comparison]] covers the
  expert-based approach. See also [[Directed Acyclic Graphs]] for d-separation.

## See Also
- [[Markov Equivalence and CPDAGs]] — what CPDAGs are; why they are the output of PC
- [[GES - Greedy Equivalence Search]] — score-based alternative; comparison table
- [[DAG Structure Learning Problem]] — landscape of structure-learning methods
- [[NOTEARS - Overview]] — continuous-optimization alternative; outputs a DAG
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion
- [[BN Construction Methods Comparison]] — expert-based vs. data-driven structure learning
- [[Summary Causal DAGs]] — downstream use of a learned causal DAG
