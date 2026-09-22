---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-Chickering2002-GES.md]]"
source_location: "Chickering (2002) §4–6"
date_ingested: 2026-09-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
  - "score-based causal discovery"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based**
> method for causal structure learning. Unlike the PC algorithm, which tests conditional
> independences, GES greedily optimizes a Bayesian score (BIC or BDeu) directly over the
> space of **Markov equivalence classes** (CPDAGs). A two-phase search — Forward (Insert
> edges) then Backward (Delete edges) — is provably **consistent**: under Faithfulness and
> a decomposable, locally consistent score, GES converges to the CPDAG of the true DAG as
> $n \to \infty$.

## Overview

Score-based structure learning poses DAG discovery as model selection: find the DAG
$\mathcal{G}$ that best explains the data under a score $S(\mathcal{G}, \mathbf{X})$
(typically BIC or a Bayesian score such as BDeu). The challenge is that the space of
DAGs is superexponential in $p$, so exhaustive search is infeasible.

GES's key insight is to search over **equivalence classes** (CPDAGs) rather than individual
DAGs. Two equivalent DAGs always have the same score under a **decomposable score** (one
that factors over local families), so there is no need to distinguish them. The CPDAG space
is larger than the space of individual DAGs but has a cleaner graph structure that enables
efficient greedy search via local operators.

## Main Content

### Decomposable Scores

> [!definition] Decomposable / Locally Consistent Score
> A score $S(\mathcal{G}, \mathbf{X})$ is **decomposable** if it factors over local families:
> $$S(\mathcal{G}, \mathbf{X}) = \sum_{i=1}^p s(V_i, \text{Pa}(V_i), \mathbf{X})$$
> where $s(V_i, \text{Pa}_i, \mathbf{X})$ depends only on the variable $V_i$ and its
> parent set $\text{Pa}_i$ in $\mathcal{G}$.
>
> A decomposable score is **locally consistent** if, given any two DAGs $\mathcal{G}$ and
> $\mathcal{G}'$ that differ only in that $\mathcal{G}'$ contains an extra edge $X \to Y$:
> - If $X \not\perp\!\!\!\perp Y \mid \text{Pa}(Y)$ (edge is "real"): $s(Y, \text{Pa}'(Y)) > s(Y, \text{Pa}(Y))$.
> - If $X \perp\!\!\!\perp Y \mid \text{Pa}(Y)$ (edge is spurious): $s(Y, \text{Pa}'(Y)) \leq s(Y, \text{Pa}(Y))$.
^def-decomposable-score

Standard choices:
- **BIC**: $s(V_i, \text{Pa}_i) = \log P(\mathbf{x}_i \mid \hat\theta_{\text{MLE}}) - \frac{d_i}{2}\log n$,
  where $d_i = |\text{Pa}_i| + 1$ (linear Gaussian) or the number of free parameters (discrete).
- **BDeu** (Bayesian Dirichlet equivalent uniform): proper Bayesian score for discrete data,
  integrates out parameters against a uniform (Dirichlet) prior.

Both BIC and BDeu are decomposable and locally consistent under faithfulness in large samples.

### The Insert and Delete Operators

GES operates on CPDAGs using two local operators that add or remove an edge while
maintaining the CPDAG validity.

> [!definition] Insert Operator $\text{Insert}(X, Y, T)$
> Given CPDAG $\mathcal{C}$ and $X - Y$ not adjacent:
> - $T \subseteq \text{Adj}(Y, \mathcal{C}) \setminus \{X\}$ (subset of Y's adjacency, excluding X)
> - $T \cup \text{Adj}(X, \mathcal{C}) \cap \text{Adj}(Y, \mathcal{C})$ must be a **clique**
> - Every undirected path between $X$ and $Y$ in $\mathcal{C}$ must be **blocked** by $T$
>
> Effect: Add $X \to Y$ and orient $T \to Y$ (making them into parents of $Y$), then
> apply Meek rules to restore CPDAG form.
>
> **Score change:** $\Delta_I(X, Y, T) = s(Y, \text{Pa}(Y) \cup T \cup \{X\}) - s(Y, \text{Pa}(Y) \cup T)$
^def-insert-operator

> [!definition] Delete Operator $\text{Delete}(X, Y, H)$
> Given CPDAG $\mathcal{C}$ with $X \to Y$ or $X - Y$:
> - $H \subseteq \text{Adj}(X, \mathcal{C}) \cap \text{Adj}(Y, \mathcal{C})$ (subset of common adjacencies)
> - $H \cup \text{Pa}(Y) \setminus \{X\}$ must be a **clique**
>
> Effect: Remove edge $X - Y$ or $X \to Y$, orient $H \to X$ (making $H$ parents of $X$
> rather than $Y$), then restore CPDAG form with Meek rules.
>
> **Score change:** $\Delta_D(X, Y, H) = s(Y, \text{Pa}(Y) \cup H \setminus \{X\}) - s(Y, \text{Pa}(Y) \cup H)$
^def-delete-operator

### The GES Algorithm

> [!definition] GES Algorithm (Chickering, 2002)
> **Input:** Data $\mathbf{X}$, decomposable score $S$
>
> **Output:** CPDAG $\hat{\mathcal{C}}$
>
> **Phase 1 — Forward (FES, Forward Equivalence Search):**
> 1. Initialize $\mathcal{C} \leftarrow$ empty graph (no edges).
> 2. **Repeat** until no Insert increases the score:
>    - Find $\arg\max_{X,Y,T} \Delta_I(X, Y, T)$ over all valid Inserts.
>    - If $\Delta_I > 0$: apply $\text{Insert}(X, Y, T)$, update $\mathcal{C}$.
>
> **Phase 2 — Backward (BES, Backward Equivalence Search):**
> 1. **Repeat** until no Delete increases the score:
>    - Find $\arg\max_{X,Y,H} \Delta_D(X, Y, H)$ over all valid Deletes.
>    - If $\Delta_D > 0$: apply $\text{Delete}(X, Y, H)$, update $\mathcal{C}$.
>
> 2. Return $\mathcal{C}$.
^alg-ges

**Intuition for two phases:** The Forward phase overshoots — it adds edges greedily and
typically ends with a DAG that is too dense (has extra false-positive edges). The Backward
phase then prunes away the spurious edges. The critical theoretical result (Meek Conjecture,
proved in Chickering 2002) guarantees that the true CPDAG is reachable via this two-phase
path from the empty graph.

### Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering, 2002, Thm. 15)
> Let $P$ be faithful to a DAG $\mathcal{G}^*$. Assume $S$ is a locally consistent,
> decomposable score (e.g., BIC with Gaussian or BDeu with discrete data). As $n \to \infty$,
> GES recovers the CPDAG $\mathcal{C}^*$ of $\mathcal{G}^*$ with probability tending to 1.
>
> **Key lemma (Meek Conjecture, proved here):** For any DAG $H$ that is an independence
> map of $G^*$, there exists a finite sequence of Insert operations (edge additions and
> covered reversals) from $H$ to $G^*$ such that after each step, $H$ remains an
> independence map of $G^*$.
^thm-ges-consistency

**Covered edge reversal**: Edge $X \to Y$ is **covered** if $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$.
Reversing a covered edge gives a Markov-equivalent DAG. The Meek Conjecture proves that
any DAG can be reached from any other via a sequence of covered reversals and edge
additions, allowing the greedy search to escape local optima.

### Comparison with PC

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| Paradigm | Constraint-based | Score-based |
| Input | CI test oracle | Decomposable score |
| Output | CPDAG | CPDAG |
| Starting point | Complete graph → skeleton | Empty graph → CPDAG |
| Consistency | Under faithful CI tests | Under faithful, loc. consistent score |
| Finite-sample behavior | Controlled by $\alpha$ | Controlled by score penalty |
| Non-Gaussian data | Needs kernel CI test | BIC still valid (misspecified) |
| Software | `pcalg::pc()` | `pcalg::ges()`, `causal-learn` |

In practice, **PC tends to be faster** for sparse graphs (fewer CI tests); **GES tends
to be more accurate** when the score is well-specified, because it optimizes a global
criterion rather than making local binary (independence/dependence) decisions.

### Extensions and Modern Variants

- **FGES** (Fast GES, Ramsey et al. 2017): replaces exhaustive search over Insert/Delete
  with a parallelized, greedy-first variant. Scales to hundreds of variables.
- **GES with non-Gaussian scores**: BIC for nonlinear additive models; ABIC for
  non-Gaussian additive noise models.
- **Order-independent GES**: equivalent to PC-stable; resolves sensitivity to operator
  ordering.

## Examples

> [!example] Example: Three-Variable Model
> True DAG: $X \to Z \to Y$ (chain). Data generated from linear Gaussians.
>
> **Forward phase:**
> - Empty graph. Best Insert: add $Z \to Y$ (or equivalent) with highest $\Delta_I$.
>   Say BIC improves by $+12$.
> - Next best Insert: $X \to Z$, $\Delta_I = +8$.
> - No further Inserts improve score.
> - After FES: CPDAG $X - Z - Y$ (skeleton with no compelled directions).
>
> **Backward phase:**
> - All Delete operators reduce the score (removing real edges).
> - No Deletes applied.
>
> **Output:** $X - Z - Y$. Correct CPDAG (the three orientations $X\to Z\to Y$,
> $X\leftarrow Z\leftarrow Y$, $X\leftarrow Z\to Y$ are all equivalent under these data).

## Connections

- [[PC Algorithm]] is the constraint-based counterpart. Both output CPDAGs; both are
  consistent under faithfulness.
- [[DAG Structure Learning Problem]] surveys the landscape of methods (including NOTEARS,
  MMHC, exact search), of which GES is the primary score-based greedy approach.
- [[NOTEARS Experiments]] benchmarks GES as a baseline ("FGS", an earlier name for
  the fast variant), showing NOTEARS matches GES on dense graphs and surpasses it on
  large $p$.
- [[Markov Equivalence and CPDAGs]] provides the theoretical foundation (equivalence
  classes, Insert/Delete operators, Meek rules).

## See Also
- [[PC Algorithm]] — constraint-based alternative
- [[Markov Equivalence and CPDAGs]] — theoretical foundation
- [[Conditional Independence Tests for Structure Learning]] — what PC uses instead of scores
- [[DAG Structure Learning Problem]] — general problem context
- [[NOTEARS - Overview]] — continuous-optimization approach benchmarked against GES
