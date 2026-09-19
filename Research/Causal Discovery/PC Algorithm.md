---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/constraint-score-based-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Meek (1995)"
date_ingested: 2026-09-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "constraint-based causal discovery"
  - "Spirtes Glymour 1991"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after **P**eter Spirtes and **C**lark Glymour) is the canonical
> **constraint-based** causal discovery method. It learns a **CPDAG** (Markov equivalence class)
> from data by (1) building a skeleton via conditional independence (CI) tests, (2) identifying
> **v-structures** (colliders) from the separating sets, and (3) completing edge orientations
> via **Meek's rules**. Under **faithfulness**, **causal Markov**, and **causal sufficiency**,
> PC is **sound and complete**: in the large-sample limit, it recovers the true CPDAG. In
> practice it uses partial correlations (Gaussian data) or kernel CI tests (non-linear data)
> and is implemented in the `pcalg` R package and `causal-learn` Python package.

## Overview

Constraint-based methods treat CI relations as **constraints** that the true DAG must respect.
If $X \perp\!\!\!\perp Y \mid Z$ in the data, then $X$ and $Y$ must be d-separated by $Z$
in the true DAG — any edge $X - Y$ is therefore absent. The PC algorithm exploits this to
prune a skeleton from a complete graph, then orients the surviving edges as far as data allows.

Named after Peter Spirtes and Clark Glymour (Carnegie Mellon), who introduced it in 1991
(Spirtes & Glymour 1991) and documented it in full in *Causation, Prediction, and Search*
(Spirtes, Glymour & Scheines 2000, Chapter 5). The skeleton-search step achieves the key
efficiency gain over naive testing: it only conditions on *neighbors* of the tested pair,
reducing the number of tests dramatically.

## Main Content

### Assumptions

> [!definition] Definition: Assumptions of the PC Algorithm
> The PC algorithm is **sound and complete** (consistent) under all three of:
>
> **1. Causal Markov Condition:** The joint distribution $\mathbb{P}$ satisfies the Markov
> property w.r.t. the true DAG $G^*$ — every d-separation in $G^*$ implies conditional
> independence in $\mathbb{P}$.
>
> **2. Causal Faithfulness:** The only CIs in $\mathbb{P}$ are those implied by d-separation
> in $G^*$ — no "accidental" path cancellations. (See [[Markov Equivalence Classes and CPDAGs]].)
>
> **3. Causal Sufficiency:** All common causes of observed variables are themselves observed —
> no **latent confounders**. (The FCI algorithm, an extension, relaxes this.)
^def-pc-assumptions

### Algorithm

The PC algorithm has three sequential phases.

#### Phase 1: Skeleton Construction

> [!theorem] Phase 1: Skeleton Construction (Spirtes & Glymour 1991)
> **Input**: $n$ observations of $d$ variables; a significance level $\alpha$ for CI tests.  
> **Output**: Undirected skeleton $\hat{G}$ and separating sets $\mathrm{Sep}(X, Y)$.
>
> 1. Start with the **complete undirected graph** $G^{(0)}$ on $d$ nodes.
> 2. Set the conditioning-set size $\ell = 0$.
> 3. **Repeat** (increasing $\ell$):
>    - For each adjacent pair $(X, Y)$ in the current graph:
>      - For each subset $S \subseteq \mathrm{Adj}(X) \setminus \{Y\}$ with $|S| = \ell$:
>        - Test $H_0: X \perp\!\!\!\perp Y \mid S$ (at level $\alpha$).
>        - If not rejected: **remove edge** $X - Y$ from the graph; record $\mathrm{Sep}(X,Y) = S$.  
>          Move to next pair $(X, Y)$.
>    - Increment $\ell$.
> 4. **Stop** when no adjacent pair has $|\mathrm{Adj}(X) \setminus \{Y\}| \geq \ell$.
>
> **Key efficiency:** Only subsets of the current *neighbors* of $X$ are tested, not all
> $\binom{d-2}{\ell}$ subsets of all variables. In sparse graphs this is exponentially faster.
^thm-phase1

#### Phase 2: V-Structure Identification

> [!theorem] Phase 2: Collider Orientation (Spirtes et al. 2000, §5.4)
> For every **unshielded triple** $(X, Z, Y)$ — i.e. $X \sim Z$, $Z \sim Y$, and $X \not\sim Y$
> in the skeleton — check if $Z \in \mathrm{Sep}(X, Y)$:
>
> - If $Z \notin \mathrm{Sep}(X, Y)$: orient $X \to Z \leftarrow Y$ as a **v-structure**.
> - If $Z \in \mathrm{Sep}(X, Y)$: leave $X - Z - Y$ unoriented.
>
> **Intuition:** If $Z$ is not in the separating set of $X$ and $Y$, then conditioning on $Z$
> would *create* dependence (collider activation) rather than remove it — so $Z$ must be a
> collider in the true DAG.
^thm-phase2

#### Phase 3: Edge Completion via Meek Rules

Apply Meek's four orientation rules (R1–R4; see [[Markov Equivalence Classes and CPDAGs#^thm-meek-rules]])
exhaustively until no further edge can be oriented.

**Output**: A CPDAG representing the Markov equivalence class of the true DAG $G^*$.

### Conditional Independence Tests

The choice of CI test determines the statistical assumptions:

| Setting | CI Test | Notes |
|---------|---------|-------|
| **Gaussian, linear** | Fisher's $z$-test on partial correlations | Fast; assumes normality |
| **Discrete/categorical** | $\chi^2$ or $G^2$ test | Standard for survey data |
| **Non-Gaussian, nonlinear** | Kernel-based tests (HSIC), CMIknn | Distribution-free; slower |
| **Mixed** | Generalized covariance measure (GCM) | Handles mixed types |

For Gaussian data with $n$ observations, the Fisher $z$-statistic is:
$$z_{X,Y|S} = \frac{\sqrt{n - |S| - 3}}{2} \log \frac{1 + \hat{\rho}_{XY|S}}{1 - \hat{\rho}_{XY|S}}$$
where $\hat{\rho}_{XY|S}$ is the sample partial correlation. Under $H_0: X \perp\!\!\!\perp Y | S$,
$z_{X,Y|S} \sim \mathcal{N}(0,1)$ asymptotically.

### Consistency

> [!theorem] Theorem: Consistency of PC (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Under **causal Markov**, **faithfulness**, and **causal sufficiency**, if the CI tests
> are consistent at level $\alpha_n \to 0$ (e.g. $\alpha_n = 1/\log n$):
>
> $$\hat{G}^{\mathrm{CPDAG}}_n \xrightarrow{p} G^{*,\mathrm{CPDAG}} \quad \text{as } n \to \infty.$$
>
> In the **high-dimensional** setting ($d \gg n$), Kalisch & Bühlmann (2007, *JMLR*) showed
> PC is still consistent if the true graph has **bounded degree** $q$ and
> $n \gtrsim (\log d)^c$ for some constant $c$.
^thm-pc-consistency

### Complexity

> [!theorem] Complexity of the Skeleton Phase
> The number of CI tests performed by PC is at most
> $$O\!\left(d^2 \binom{d-2}{q}\right),$$
> where $q$ is the maximum **in-degree** of the true DAG. For **sparse graphs** (small $q$),
> this is polynomial in $d$: $O(d^{q+2})$. For **dense graphs**, the worst case is exponential
> in $d$ — the number of conditioning sets grows unmanageably.
>
> **Stable PC** (Colombo & Maathuis 2014): makes skeleton construction order-independent by
> using the *complete* adjacency set from the *previous* iteration; otherwise, the ordering
> of variable pairs affects which edges are removed.
^thm-pc-complexity

## Examples

> [!example] Toy Example: PC on 4 Variables
> **True DAG**: $X_1 \to X_3 \leftarrow X_2$, $X_3 \to X_4$ (a chain with one collider).
>
> **Phase 1 (Skeleton):**  
> - Test $X_1 \perp X_2 \mid \emptyset$: they are marginally independent (no direct edge, no common ancestor) → remove $X_1 - X_2$.  
> - Test $X_1 \perp X_4 \mid X_3$: d-separated by $\{X_3\}$ → remove $X_1 - X_4$.  
> - Test $X_2 \perp X_4 \mid X_3$: d-separated by $\{X_3\}$ → remove $X_2 - X_4$.  
> - $\mathrm{Sep}(X_1, X_2) = \emptyset$, $\mathrm{Sep}(X_1, X_4) = \{X_3\}$, etc.  
> - Skeleton: $X_1 - X_3 - X_2$, $X_3 - X_4$.
>
> **Phase 2 (V-structures):**  
> - Triple $(X_1, X_3, X_2)$: $X_1 \not\sim X_2$; is $X_3 \in \mathrm{Sep}(X_1, X_2)$?  
>   $\mathrm{Sep}(X_1, X_2) = \emptyset$, so $X_3 \notin \emptyset$ → orient $X_1 \to X_3 \leftarrow X_2$.
>
> **Phase 3 (Meek rules):**  
> - R1 applied to $X_1 \to X_3 - X_4$ (and $X_1 \not\sim X_4$): orient $X_3 \to X_4$.  
> - Output CPDAG: $X_1 \to X_3 \leftarrow X_2 \to X_4$. ✓

## Connections

- **GES** (see [[GES - Greedy Equivalence Search]]) is the **score-based** counterpart: it
  searches over the same CPDAG space but using a score function (BIC) rather than CI tests.
  In practice, GES is often more robust for moderate $n$ because CI tests can lose power
  with many conditioning variables.
- **NOTEARS** (see [[NOTEARS - Overview]]) is a **continuous optimization** approach that
  bypasses the CPDAG space entirely: it recovers a single DAG via gradient descent, not
  an equivalence class. NOTEARS does not assume faithfulness in its statistical guarantees
  (only that the LS loss is minimized).
- **FCI** (Fast Causal Inference): the extension of PC to settings with **latent confounders**
  (relaxing causal sufficiency); outputs a PAG (partial ancestral graph) instead of a CPDAG.
- **Directed Acyclic Graphs** (in [[Directed Acyclic Graphs]]): covers d-separation and
  the do-calculus from the causal inference perspective; PC is the algorithm for learning
  the skeleton required by the do-calculus when only observational data is available.
- **LLM Expert Elicitation for Bayesian Networks** (in [[LLM Expert Elicitation for Bayesian Networks]]):
  expert elicitation can constrain the PC search space, combining data-driven CI tests
  with prior knowledge about forbidden/required edges.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — skeleton, v-structures, Meek rules, CPDAG definition
- [[GES - Greedy Equivalence Search]] — score-based alternative; same CPDAG output
- [[DAG Structure Learning Problem]] — the formal problem and landscape of prior methods
- [[NOTEARS - Overview]] — continuous-optimization alternative that bypasses CPDAG space
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
