---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/PC-GES-Constraint-Score-Survey.md]]"
source_location: "§3: The PC Algorithm; Spirtes, Glymour & Scheines (2000), Ch. 5"
date_ingested: 2026-07-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Skeleton Recovery and CI Tests]]"
  - "[[V-Structures and Meek Rules]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC algorithm causal discovery"
  - "Spirtes Glymour 1991"
  - "constraint-based causal discovery"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000, Ch. 5)
> is the canonical **constraint-based** algorithm for causal structure learning. It uses
> **conditional independence (CI) tests** to recover the skeleton of the true DAG, then
> orients as many edges as possible via **v-structure detection** and **Meek's orientation
> rules**, yielding the CPDAG of the true Markov equivalence class. Under the **faithfulness**
> assumption and with consistent CI tests, PC is asymptotically correct. Its key advantage
> over score-based methods is interpretability — each adjacency decision is justified by a
> specific CI test — and its key weakness is sensitivity to the order in which tests are run.

## Overview

Causal structure learning algorithms fall into two paradigms. The PC algorithm represents
the **constraint-based** paradigm: rather than assigning a score to whole graphs, it treats
each pair of variables as a mini-hypothesis test. If the data support $X \perp\!\!\!\perp Y \mid S$
for some set $S$, then $X$ and $Y$ are not adjacent in the graph (by the Markov condition);
otherwise, they are.

Named after its inventors **P**eter Spirtes and **C**lark Glymour, the algorithm was first
described in Spirtes & Glymour (1991) and given its definitive treatment in *Causation,
Prediction, and Search* (Spirtes, Glymour & Scheines 2000, Ch. 5). It is the starting point
for a large family of constraint-based algorithms: FCI (for latent variables), RFCI (robust
FCI), PC-stable (order-independent), and many others.

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions
> The PC algorithm is asymptotically correct under:
> 1. **Markov condition**: The data-generating distribution $\mathbb{P}$ satisfies the Markov
>    condition with respect to the true DAG $G^*$ — every variable is conditionally independent
>    of its non-descendants given its parents.
> 2. **Faithfulness (stability)**: All conditional independences in $\mathbb{P}$ are entailed
>    by the Markov condition of $G^*$. No path-cancellations create "extra" independences.
> 3. **Causal sufficiency**: All common causes of observed variables are themselves observed
>    (no latent confounders). Violated: use FCI instead.
> 4. **Consistent CI test**: The conditional independence oracle $\mathcal{I}$ is consistent —
>    it correctly answers $X \perp\!\!\!\perp Y \mid S$ in the large-sample limit.
^def-assumptions

### Algorithm Structure

The PC algorithm has two phases — a **skeleton-recovery phase** and an **orientation phase**:

```
PC(V, I):
  Phase 1: Recover skeleton C and separating sets Sep(·,·)
    See [[Skeleton Recovery and CI Tests]]

  Phase 2: Orient edges
    Step 2a: Identify v-structures (colliders)
    Step 2b: Apply Meek rules iteratively
    See [[V-Structures and Meek Rules]]

  Output: CPDAG C with all compelled/reversible orientations
```

### Theoretical Guarantee

> [!theorem] Theorem: PC Algorithm Consistency (Spirtes et al. 2000, Thm. 5.1)
> Let $G^*$ be the true causal DAG satisfying the Markov condition and faithfulness with
> respect to $\mathbb{P}$, and let $\mathcal{I}^*$ be the perfect CI oracle for $\mathbb{P}$.
> Then the output of PC with $\mathcal{I}^*$ is the **CPDAG** $\mathcal{C}(G^*)$ of the
> true MEC — the unique graphical representation of all DAGs Markov equivalent to $G^*$.
^thm-consistency

With finite samples and a consistent CI test (e.g., Fisher's $z$-test for Gaussians),
PC is **pointwise consistent**: for every $\varepsilon > 0$, the probability of returning the
wrong CPDAG goes to 0 as $n \to \infty$.

### Complexity

| Aspect | Bound |
|--------|-------|
| **Worst-case CI tests** | $O(d^2 \cdot 2^d)$ — exponential in worst case |
| **Sparse graph** (degree $k$) | $O(d^2 \cdot k \cdot \binom{k}{l_{\max}})$ — polynomial for fixed degree |
| **Gaussian CI test** | $O(n \cdot k^3)$ per test (partial correlation) |
| **Total time (sparse)** | $O(d^2 \cdot n \cdot k^{k+1})$ |

In practice, the algorithm is fast for **sparse** graphs because the adjacency sets shrink
rapidly — once an edge is removed, fewer conditioning sets need to be tested.

### Order-Dependence and PC-Stable

A known limitation of the original PC algorithm is **order-dependence**: the output
can vary with the order in which variables are presented, because the conditioning sets
for later tests depend on which edges were removed by earlier tests.

**PC-stable** (Colombo & Maathuis, 2014) eliminates this by completing *all* level-$\ell$
tests before removing any edges:

```
For each l = 0, 1, 2, ...:
  Record all edges to remove (those with CI evidence at level l)
  Remove all recorded edges simultaneously
  Update all adjacency sets
```

PC-stable is now the standard recommended implementation. It is available in the
`pcalg` R package and `causal-learn` Python package.

### Comparison with GES

| | PC (constraint-based) | GES (score-based) |
|--|--|-|
| **Mechanism** | CI tests per edge | Global BIC score |
| **Output** | CPDAG | CPDAG |
| **Key insight** | Faithfulness → CI tests identify adjacency | Score equivalence → search over MECs |
| **Order-dependence** | Yes (original); No (PC-stable) | No |
| **Finite-sample** | Sensitive to test threshold $\alpha$ | Sensitive to regularization in BIC |
| **Interpretability** | High — each edge decision justified by a CI test | Lower — whole-graph comparison |

### Software

```r
# R: pcalg package (Kalisch et al. 2012, JOSS 47(11))
library(pcalg)
pc.fit <- pc(suffStat = list(C = cor(X), n = nrow(X)),
             indepTest = gaussCItest,
             alpha = 0.05,
             p = ncol(X),
             skel.method = "stable")   # PC-stable
plot(pc.fit)
```

```python
# Python: causal-learn (Zheng et al. 2023, arXiv:2307.16405)
from causallearn.search.ConstraintBased.PC import pc
cg = pc(data, alpha=0.05, indep_test='fisherz')
cg.draw_pydot_graph()
```

## Connections

- **Foundational concept**: the Verma–Pearl characterization of MEC (skeleton + v-structures)
  is the theorem PC relies on — see [[Markov Equivalence and CPDAGs]].
- **Phase 1** (skeleton + separating sets): see [[Skeleton Recovery and CI Tests]].
- **Phase 2** (v-structure orientation + Meek rules): see [[V-Structures and Meek Rules]].
- **Alternative algorithm**: [[GES - Greedy Equivalence Search]] reaches the same output
  via BIC score maximization over CPDAGs instead of CI tests.
- **Continuous optimization alternative**: [[NOTEARS - Overview]] avoids the CPDAG
  altogether by solving a continuous matrix program — faster but assumes linear Gaussian SEM.
- **Extensions**: FCI handles latent variables (produces PAGs instead of CPDAGs); RFCI
  is a faster approximation. The vault's [[Summary Causal DAGs]] and [[LLM Expert
  Elicitation for Bayesian Networks]] work with the causal-graph outputs that PC could
  provide as input.

## See Also
- [[Markov Equivalence and CPDAGs]] — the Verma–Pearl theorem that PC's correctness rests on
- [[Skeleton Recovery and CI Tests]] — Phase 1: removing edges via conditional independence tests
- [[V-Structures and Meek Rules]] — Phase 2: orienting edges using collider detection and Meek's rules
- [[GES - Greedy Equivalence Search]] — the score-based alternative (Chickering 2002)
- [[DAG Structure Learning Problem]] — the broader estimation problem; NOTEARS's framing
- [[Directed Acyclic Graphs]] — causal semantics of DAGs used downstream
- [[BN Construction Methods Comparison]] — compares expert elicitation vs. data-driven BN structure learning
