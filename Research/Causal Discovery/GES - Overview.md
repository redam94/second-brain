---
title: "GES - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - type/theorem
  - doc/paper
source: "Chickering (2002), 'Optimal structure identification with greedy search', JMLR 3:507–554 (https://jmlr.org/papers/v3/chickering02b.html)"
source_location: "Full paper (48 pp.); Thm. 15 (FES consistency), Thm. 17 (BES consistency)"
date_ingested: 2026-09-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[NOTEARS - Overview]]"
  - "[[BN Construction Methods Comparison]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES BES"
---

# GES - Overview

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> algorithm for causal structure learning. It searches the space of Markov equivalence
> classes (CPDAGs) greedily in two phases: a **forward phase** (FES) that adds edges
> to the current CPDAG by choosing the edge addition that most increases a decomposable
> score (e.g., BIC), and a **backward phase** (BES) that removes edges to escape
> over-connected traps. Chickering proved the **Meek Conjecture** to show that GES
> is **asymptotically consistent**: in the large-sample limit, GES recovers the true
> CPDAG of the generating distribution under the Markov, faithfulness, and causal
> sufficiency assumptions. GES is substantially more sample-efficient than PC and is
> the score-based complement to constraint-based discovery.

## Overview

While the PC algorithm (see [[PC Algorithm - Overview]]) reads causal structure from
conditional independence tests, GES reads it from a **global score function** that
measures how well a DAG/CPDAG fits the data. The key innovation of Chickering (2002)
is to search *equivalence class space* (CPDAGs) rather than DAG space — each move in
the search is an **operator** that transforms one CPDAG into an adjacent one by adding
or removing a single edge, while maintaining the CPDAG's validity.

The paper also **proves the Meek Conjecture** — the result that a specific sequence
of moves always connects any two Markov-equivalent-or-superior DAGs — which is the
theoretical backbone of GES's consistency guarantee.

## Main Content

### Score Functions for Structure Learning

GES requires a **decomposable** score: a scoring criterion that factorises as a sum
over nodes of local scores:

$$S(G, \mathbf{X}) = \sum_{i=1}^{p} s\!\left(X_i, \text{Pa}_G(X_i), \mathbf{X}\right)$$

This decomposability enables efficient computation of score changes: when an edge
$X_j \to X_i$ is added or removed, only the local score for $X_i$ changes.

The two main score functions used in practice:

| Score | Formula | Assumptions | Notes |
|-------|---------|-------------|-------|
| **BIC** | $\log P(\mathbf{X} \mid G, \hat{\theta}_{\text{MLE}}) - \frac{d_G}{2}\log n$ | Gaussian linear SEM | Large-sample consistent; penalises complexity |
| **BGe** | Bayesian Gaussian equivalent score (Heckerman & Geiger 1995) | Gaussian linear SEM | Bayesian; marginalises parameters; score-equivalent |
| **BDeu** | Bayesian Dirichlet equivalent uniform | Discrete variables | Uniform Dirichlet prior; score-equivalent |

**Score equivalence:** A score $S$ is *score-equivalent* if $S(G_1, \mathbf{X}) = S(G_2, \mathbf{X})$
whenever $G_1$ and $G_2$ are Markov equivalent. BIC, BGe, and BDeu are all score-equivalent.
Score equivalence is required for GES's search to be well-defined on equivalence classes.

### The Two Phases of GES

```
Input:  Data X ∈ ℝ^{n×p}, score function S
Output: CPDAG Ê representing the estimated equivalence class

Phase 1 — Forward Equivalence Search (FES):
  Start with Ê = empty graph (null CPDAG)
  Repeat:
    For each edge (i,j) not in Ê:
      Compute score change ΔS from inserting (i,j) into Ê (as a CPDAG operator)
    If max ΔS > 0: apply the insertion with highest ΔS; update Ê
    Else: stop FES
  Output: Ê_FES (superset of true skeleton, with high probability)

Phase 2 — Backward Equivalence Search (BES):
  Start with Ê = Ê_FES
  Repeat:
    For each edge (i,j) in Ê:
      Compute score change ΔS from deleting (i,j) from Ê (as a CPDAG operator)
    If max ΔS > 0: apply the deletion with highest ΔS; update Ê
    Else: stop BES
  Output: Ê (the final CPDAG)
```

### CPDAG Operators: Insert and Delete

Each step of GES applies a **CPDAG operator** — a move from one CPDAG to an adjacent
one. Chickering defines these formally as:

> [!definition] Insert Operator $I(X, Y, H)$
> For a pair $(X,Y)$ not adjacent in the current CPDAG $\mathcal{E}$ and a subset
> $H \subseteq \text{Ne}_\mathcal{E}(Y) \cap \text{Ne}_\mathcal{E}(X)$ (neighbours of $Y$
> in $\mathcal{E}$ that are also neighbours of $X$):
> - Insert the edge $X \to Y$.
> - Direct all edges in $H$ toward $Y$ (turning undirected edges into directed ones).
> - Re-apply Meek rules to propagate orientations to a valid CPDAG.
>
> The score change is $\Delta S = s(Y, \text{Pa}(Y) \cup \{X\} \cup H) - s(Y, \text{Pa}(Y))$.
^def-insert-operator

> [!definition] Delete Operator $D(X, Y, H)$
> For an adjacent pair $(X,Y)$ in $\mathcal{E}$ and $H \subseteq \text{Ne}_\mathcal{E}(Y) \cap
> \text{Ad}_\mathcal{E}(X)$:
> - Remove the edge $X - Y$ (or $X \to Y$).
> - Modify orientations of edges in $H$ as specified.
> - Re-apply Meek rules.
>
> The score change is $\Delta S = s(Y, \text{Pa}(Y) \setminus (\{X\} \cup H)) - s(Y, \text{Pa}(Y))$.
^def-delete-operator

These operators are **well-defined**: they always produce a valid CPDAG, and they
are **closed** over the space of CPDAGs.

### The Meek Conjecture and Consistency

The main theoretical contribution of Chickering (2002) is the proof of:

> [!theorem] Theorem (Chickering 2002): The Meek Conjecture
> Let $G$ be a DAG and $H$ be any independence map (I-map) of $G$ (i.e., $H$ encodes
> at least the CIs of $G$, possibly more). Then there exists a sequence of **edge
> additions** and **covered edge reversals** in $G$ that:
> 1. Produces $H$ after all modifications, and
> 2. After each individual modification, the intermediate graph remains an I-map of $G$.
>
> (A *covered edge* $X \to Y$ is one where $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$;
> reversing it produces a Markov equivalent DAG.)
^thm-meek-conjecture

**Significance:** This theorem guarantees that the equivalence class space is
**connected** in a way that allows greedy search to reach the truth. It implies:

> [!theorem] Theorem (Chickering 2002, Thm. 15 & 17): GES Consistency
> Under the Causal Markov condition, faithfulness, causal sufficiency, and a
> consistent decomposable score (e.g., BIC with $n \to \infty$):
>
> 1. (**FES consistency**) The forward phase terminates at a CPDAG whose skeleton
>    is a *superset* of the true skeleton. No true edge is missing.
> 2. (**BES consistency**) The backward phase, starting from the FES output,
>    terminates at the true CPDAG of the generating distribution.
>
> Together: GES identifies the **true Markov equivalence class** in the large-sample limit.
^thm-ges-consistency

### GES vs. PC: A Comparison

| Dimension | GES | PC |
|-----------|-----|-----|
| **Approach** | Score-based; greedily maximize BIC/BGe | Constraint-based; test CI one at a time |
| **CI tests?** | Not explicitly; implicit in score | Yes — many explicit tests |
| **Consistency** | Yes (Chickering 2002) | Yes (Spirtes et al. 2000) |
| **Sample efficiency** | Higher (global score = joint signal) | Lower (many separate tests) |
| **Search space** | Equivalence class space (CPDAGs) | DAG space (adjacency) |
| **Sensitive to** | Score function choice; $n$ for BIC | $\alpha$ level; CI test power |
| **Output** | CPDAG | CPDAG |
| **Complexity** | $O(p^4)$ per step (moderate $p$) | $O(p^{q+2})$ where $q$ = max degree |
| **Implementation** | `pcalg::ges`, `causal-learn::GES` | `pcalg::pc`, `causal-learn::PC` |

### FGES: Fast GES

For large $p$, standard GES is slow because every step examines $O(p^2)$ possible
edges. **FGES** (Fast GES; Ramsey et al. 2017) uses:
- **Priority queues** to cache and update score changes incrementally.
- **Parallelism** across score computations.
- Complexity: $O(p q \log p)$ per step for sparse graphs with max degree $q$.

FGES is implemented in the **Tetrad** toolbox (Java) and the **causal-learn** Python library.

### Relation to NOTEARS

NOTEARS (see [[NOTEARS - Overview]]) and GES are complementary score-based approaches:

| Dimension | GES | NOTEARS |
|-----------|-----|---------|
| **Search space** | Equivalence classes (CPDAGs) | Weighted matrices $W \in \mathbb{R}^{d\times d}$ |
| **Output** | CPDAG (equivalence class) | Single DAG |
| **Score** | Decomposable BIC/BGe | Least squares + $\ell_1$ |
| **Consistency guarantee** | Yes (asymptotic) | Stationary point only |
| **Computational approach** | Discrete greedy operators | Continuous augmented Lagrangian |
| **Assumptions** | Faithfulness + decomposable score | Linear SEM |

GES searches the *right* space (equivalence classes) with a guaranteed path to the
optimum. NOTEARS searches a continuous relaxation of DAG space and finds a stationary point.

## Examples

> [!example] Example: FES Step on Empty Graph
> **Current state:** Empty CPDAG (no edges). BIC score = $S_0$.
>
> **FES step:** Evaluate score change $\Delta S_{ij} = s(X_j, \{X_i\}) - s(X_j, \emptyset)$
> for all pairs $(i,j)$.
>
> This equals $-\frac{n}{2}\log(1 - r_{ij}^2)$ (for Gaussian BIC), where $r_{ij}$ is the
> sample correlation between $X_i$ and $X_j$.
>
> The edge with the highest $|\Delta S_{ij}| > 0$ is added first. At each subsequent step,
> the score change accounts for the current parent set of $X_j$.

> [!example] Example: BES Removing a Spurious Edge
> After FES, suppose the CPDAG contains the edge $X_1 - X_3$ (spurious; the variables
> are conditionally independent given $X_2$). FES kept this edge because, marginally,
> $X_1$ and $X_3$ are correlated (through $X_2$) and adding the edge increased the score.
>
> **BES step:** Evaluate $\Delta S$ from deleting $X_1 - X_3$. After conditioning on $X_2$
> (now in the parent set from FES), the local score for $X_3$ is better without $X_1$ as a
> parent ($\Delta S > 0$). BES removes the edge.
>
> This is why BES is needed: FES overshoots (adds spurious edges that looked beneficial
> without conditioning), and BES removes the excess.

## Connections

- **[[PC Algorithm - Overview]]** — Constraint-based complement to GES; both output CPDAGs.
- **[[Equivalence Classes and CPDAGs]]** — The search space of GES; CPDAGs, compelled edges,
  Meek rules.
- **[[DAG Structure Learning Problem]]** — Formal problem statement; score functions.
- **[[NOTEARS - Overview]]** — Continuous-optimization alternative to GES.
- **[[Smooth Characterization of Acyclicity]]** — The acyclicity constraint that NOTEARS
  replaces the discrete CPDAG operators with.
- **[[BN Construction Methods Comparison]]** — How GES fits in the broader BN structure
  learning landscape (constraint / score / hybrid).
- **[[LLM Expert Elicitation for Bayesian Networks]]** — A complementary approach to
  structure learning via expert knowledge elicitation.

## See Also
- [[PC Algorithm - Overview]] — Constraint-based complement
- [[Equivalence Classes and CPDAGs]] — Shared mathematical framework
- [[DAG Structure Learning Problem]] — Problem formulation and score functions
- [[NOTEARS - Overview]] — Continuous-optimization complement
- [[BN Construction Methods Comparison]] — Broader landscape of structure learning
