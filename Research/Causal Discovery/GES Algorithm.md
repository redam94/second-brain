---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES.pdf]]"
source_location: "Full paper (Chickering & Meek, UAI 2002); see also chickering-ges-full.pdf §3-4"
date_ingested: 2026-10-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "FES"
  - "BES"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
  - "Chickering 2002"
  - "score-based structure learning"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002, JMLR) is the canonical **score-based**
> algorithm for causal structure learning. It searches over the space of Markov equivalence
> classes (CPDAGs) using a decomposable score (BIC or Bayesian criterion), executing a greedy
> two-phase strategy: **FES** (Forward Equivalence Search) adds edges greedily until a local
> score maximum is reached; **BES** (Backward Equivalence Search) then removes edges greedily.
> Under faithfulness and a consistent scoring criterion, GES returns the true CPDAG
> asymptotically. Unlike [[PC Algorithm]], GES is not sensitive to CI test errors and exploits
> score decomposability for efficient evaluation.

## Overview

GES (Chickering 2002, published in JMLR; conference version Chickering & Meek 2002 UAI) solves
the [[DAG Structure Learning Problem]] by **directly searching the space of equivalence
classes** rather than the space of DAGs. This is the critical algorithmic insight: instead of
searching over the super-exponential space of DAGs and checking acyclicity at each step, GES
represents each search state as a **CPDAG** and performs operators that correspond to
single-edge modifications, keeping the representation compact and valid at every step.

The algorithm is called "greedy" because at each step it applies the single operator with the
highest positive score increment. It is called "equivalence" search because each search state
is an equivalence class of DAGs, represented by its CPDAG.

> [!note] Why search equivalence classes?
> Searching DAG space requires checking acyclicity at each step (O(d²) per edge addition)
> and misses score equivalences — if two DAGs have the same score (because they are Markov
> equivalent), searching DAG space can arbitrarily select between them. Searching CPDAG
> space makes the score function well-defined (all DAGs in a class have the same score)
> and enables a clean two-phase structure.

## Main Content

### Decomposable scoring criterion

GES requires a **decomposable, score-equivalent, asymptotically consistent** scoring
criterion.

> [!definition] Definition: Decomposable Score (Chickering & Meek 2002, §2.3)
> A scoring criterion $S(\mathcal{G}, \mathbf{D})$ is **decomposable** if it can be written as:
> $$S(\mathcal{G}, \mathbf{D}) = \sum_{i=1}^{d} s\!\left(X_i,\, \mathbf{Pa}_i^{\mathcal{G}}\right)$$
> where $s(X_i, \mathbf{Pa}_i^{\mathcal{G}})$ depends only on $X_i$ and its current parents.
>
> Decomposability means that when an operator changes only one node's parent set, the score
> change is computed by evaluating just that node's local score — a massive computational saving.
^def-decomposable-score

> [!definition] Definition: Score Equivalence (Chickering & Meek 2002, §2.3)
> A scoring criterion is **score equivalent** if all DAGs in the same Markov equivalence class
> receive the same score: $\mathcal{G} \approx \mathcal{G}' \implies S(\mathcal{G},\mathbf{D}) =
> S(\mathcal{G}',\mathbf{D})$.
>
> Score equivalence ensures the score is a *function of the equivalence class*, so GES's
> CPDAG-space search is well-defined.
^def-score-equiv

> [!definition] Definition: Asymptotically Consistent Score
> A score is **asymptotically consistent** (locally consistent in Chickering's formulation)
> if in the large-sample limit it: (1) prefers any DAG member that adds a true edge; and
> (2) prefers any DAG member that removes a false edge.
>
> Both the **Bayesian scoring criterion** (BDe / BDeu; Heckerman et al. 1995) and **BIC**
> (Bayesian Information Criterion; approximation to Bayesian score) satisfy all three
> properties:
> $$\text{BIC}(X_i, \mathbf{Pa}_i) = \hat{\ell}(X_i \mid \mathbf{Pa}_i) - \frac{d_i}{2}\log n$$
> where $\hat{\ell}$ is the maximized log-likelihood and $d_i$ is the dimension of the
> local model for $X_i$ given $\mathbf{Pa}_i$.
^def-consistent-score

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: FES — Forward Equivalence Search
> **Input:** Data $\mathbf{D}$, scoring criterion $S$.
>
> **Initialization:** $\mathcal{C} \leftarrow$ empty CPDAG (no edges — the all-independence
> equivalence class).
>
> **Repeat:**
> - For each ordered pair $(X, Y)$ of nodes and each subset $\mathbf{T} \subseteq
>   \text{NA}_{Y,X}^{\mathcal{C}}$ (neighbors of $Y$ that are adjacent to $X$ in $\mathcal{C}$):
>   - Compute the **Insert score**:
>     $$\Delta_+(X, Y, \mathbf{T}) = s(Y,\; \mathbf{Pa}_Y^{\mathcal{C}} \cup \mathbf{T} \cup \{X\})
>     - s(Y,\; \mathbf{Pa}_Y^{\mathcal{C}} \cup \mathbf{T})$$
>     subject to preconditions: $X \not\sim Y$ in $\mathcal{C}$; $\mathbf{T} \cup \{X\}$ is a
>     clique in $\text{NA}_{Y,X}^{\mathcal{C}} \cup \{X\}$; and inserting $X \to Y$ and orienting
>     $T \to Y$ for $T \in \mathbf{T}$ preserves acyclicity.
>   - Record $(X,Y,\mathbf{T})$ with its score $\Delta_+(X,Y,\mathbf{T})$.
> - Select the operator with the **highest positive score** $\Delta_+(X^*,Y^*,\mathbf{T}^*)$.
> - If no operator has positive score: **halt**.
> - Apply the Insert operator: add edge $X^* \to Y^*$, orient $T \to Y^*$ for $T \in \mathbf{T}^*$,
>   convert to CPDAG.
>
> **Return:** Local maximum CPDAG $\mathcal{C}_{\text{FES}}$.
^def-fes

**Intuition:** FES starts with no edges and greedily adds edges that eliminate false
independence constraints. At each step it checks whether adding $X \to Y$ — with specific
neighboring nodes $\mathbf{T}$ forced toward $Y$ — increases the score. The subsets $\mathbf{T}$
over $\text{NA}_{Y,X}$ parameterize all valid ways to "insert" an edge into the CPDAG without
changing the equivalence class representation incorrectly.

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: BES — Backward Equivalence Search
> **Input:** $\mathcal{C}_{\text{FES}}$ (FES output), Data $\mathbf{D}$, scoring criterion $S$.
>
> **Repeat:**
> - For each pair $(X, Y)$ adjacent in $\mathcal{C}$ and each subset $\mathbf{H} \subseteq
>   \text{NA}_{Y,X}^{\mathcal{C}}$ with $\overline{\mathbf{H}} = \text{NA}_{Y,X}^{\mathcal{C}} \setminus
>   \mathbf{H}$ a clique:
>   - Compute the **Delete score**:
>     $$\Delta_-(X, Y, \mathbf{H}) = s(Y,\; \mathbf{Pa}_Y^{\mathcal{C}} \cup \overline{\mathbf{H}})
>     - s(Y,\; \mathbf{Pa}_Y^{\mathcal{C}} \cup \mathbf{H} \cup \{X\})$$
>   - Record $(X,Y,\mathbf{H})$ with its score $\Delta_-(X,Y,\mathbf{H})$.
> - Select the operator with the **highest positive score** $\Delta_-(X^*,Y^*,\mathbf{H}^*)$.
> - If no operator has positive score: **halt**.
> - Apply the Delete operator: remove edge $X^*$–$Y^*$, orient $Y^* \to H$ for $H \in \mathbf{H}^*$,
>   convert to CPDAG.
>
> **Return:** Final CPDAG $\mathcal{C}_{\text{GES}}$.
^def-bes

**Intuition:** BES starts from the FES local maximum and greedily removes edges that represent
spurious dependencies. The Delete operator removes edge $X$–$Y$ and simultaneously orients
certain neighbors $\mathbf{H}$ away from $Y$, reflecting the fact that removing an edge can
reveal non-collider orientations that were previously compelled by that edge's presence.

### GES pseudocode

```
Algorithm GES(D):
  Input: Data D
  Output: CPDAG C

  C ← FES(D)           // Phase 1: start empty, add edges greedily
  C ← BES(D, C)        // Phase 2: remove edges greedily from FES output
  return C
```

### Consistency theorem

> [!theorem] Theorem 1 (Chickering 2002): GES Consistency
> Let $\mathcal{C}$ be the CPDAG returned by GES applied to $m$ records sampled from a
> distribution that is perfect with respect to DAG $\mathcal{G}$. Then in the limit of large
> $m$, $\mathcal{C} \approx \mathcal{G}$.
>
> **Interpretation:** When the generative distribution is DAG-perfect over the observed
> variables (faithfulness holds), GES with a locally consistent score recovers the true
> Markov equivalence class as data grows.
^thm-ges-consistency

> [!theorem] Theorem 4 / Theorem 3 (Chickering & Meek 2002): GES Under Composition
> If $p$ satisfies the **composition property** — that $X \not\!\perp_p Y \mid \mathbf{Z}$
> implies there exists $Y' \in \mathbf{Y}$ (a single node in $\mathbf{Y}$) not independent
> of $X$ given $\mathbf{Z}$ — then in the limit of large $m$, GES using any locally
> consistent scoring criterion finds an **inclusion-optimal** model.
>
> The composition property is weaker than faithfulness and holds whenever the generative
> distribution is perfect with respect to a DAG, a chain graph, or a Markov random field —
> even with hidden variables and selection bias. This substantially broadens GES's
> consistency guarantees beyond DAG-perfect distributions.
^thm-ges-composition

### Why two phases?

The two-phase structure is not arbitrary. The key theorem underpinning GES is:

> [!theorem] Theorem 3 (Chickering & Meek 2002): BES Correctness
> If $\mathcal{E}^*$ includes $p$ (the true distribution), then in the limit of large $m$,
> the result of running BES starting from $\mathcal{E}^*$ and using any locally consistent
> scoring criterion, results in an **inclusion-optimal model**.
>
> **Consequence:** The role of FES is only to produce a CPDAG $\mathcal{C}$ such that
> $\mathcal{G} \leq \mathcal{C}$ (the true DAG is included). BES then provably refines from
> there to the optimal model. In theory, one could replace FES with any algorithm that
> returns an IMAP of $\mathcal{G}$ — even the complete graph (all variables connected) —
> and BES would still converge to the correct answer. In practice, FES's sparse greedy
> search makes the problem tractable.
^thm-bes-correctness

## Covered Edge: a key concept

> [!definition] Definition: Covered Edge (Chickering 2002)
> An edge $X \to Y$ in DAG $\mathcal{G}$ is **covered** if $X$ and $Y$ have the same
> parents except that $X$ is a parent of $Y$ but not of itself:
> $$\mathbf{Pa}(Y)^{\mathcal{G}} = \mathbf{Pa}(X)^{\mathcal{G}} \cup \{X\}$$
>
> Every edge reversal in GES's operator sequence is a reversal of a *covered edge*.
> Covered edge reversals preserve the DAG's Markov equivalence class.
^def-covered-edge

## Comparison: GES vs PC Algorithm

| Property | GES | PC |
|----------|-----|----|
| **Paradigm** | Score-based | Constraint-based (CI tests) |
| **Search space** | CPDAG space | Skeleton + v-structures |
| **Output** | CPDAG | CPDAG |
| **Consistency assumption** | Faithfulness + consistent score | Faithfulness + consistent CI tests |
| **Sample efficiency** | Better (uses all data via score) | Worse (CI power limited for small $n$) |
| **Error propagation** | Score errors do not compound | CI errors in skeleton → wrong v-structures |
| **High $d$ behavior** | Score evaluation is expensive; FGS/FGES adds parallelism | PC-stable handles large $d$ if graph is sparse |
| **Software** | `pcalg::ges()` (R); `causal-learn` (Python); TETRAD `GES` | `pcalg::pc()` (R); `causal-learn` (Python) |
| **Primary reference** | Chickering (2002), JMLR | Spirtes, Glymour & Scheines (2000) |

**Practical guidance:** GES is generally preferred when samples are small-to-moderate (where
CI test power is limited) or when a well-calibrated score is available. PC is preferred when
computational cost matters (no exponential subsets to evaluate) and samples are large.

## Connections

- **[[Markov Equivalence Classes and CPDAGs]]**: GES searches the space of CPDAGs directly.
  Every state in the FES and BES loops *is* a CPDAG.
- **[[DAG Structure Learning Problem]]**: GES uses the decomposable score $S(\mathcal{G},\mathbf{D})
  = \sum_i s(X_i, \mathbf{Pa}_i)$ — a continuously differentiable function of the graph
  structure that NOTEARS also uses for the linear SEM score.
- **[[PC Algorithm]]**: the constraint-based alternative; PC and GES both output CPDAGs and
  both require faithfulness.
- **[[NOTEARS Experiments]]**: NOTEARS benchmarks against FGS (a parallelized GES variant),
  showing NOTEARS matches or exceeds GES/FGS on dense and high-dimensional graphs.
- **[[Method of Simulated Moments]]**: GES is a score-based method; ABM calibration via SMM
  is conceptually related — both match model-implied quantities (score / moments) to data.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the search space of GES
- [[PC Algorithm]] — constraint-based alternative
- [[DAG Structure Learning Problem]] — formal setup and score definition
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[NOTEARS Experiments]] — empirical comparison including GES/FGS
- [[Causal Discovery/_Index|Causal Discovery Index]]
