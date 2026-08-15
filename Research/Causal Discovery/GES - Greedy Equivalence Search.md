---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SGES-Chickering-Meek-2015.pdf]]"
source_location: "§1 (Introduction), §3 (Notation and Background), §4 (GES Review), pp. 1–6"
date_ingested: 2026-08-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[PC Algorithm]]"
used_by:
  - "[[NOTEARS Algorithm]]"
aliases:
  - GES
  - Greedy Equivalence Search
  - SGES
  - Selective GES
  - Chickering 2002
  - score-based structure learning
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering, 2002) is the canonical **score-based**
> algorithm for causal structure learning. It searches the space of **CPDAGs** directly,
> using insert/delete operators to move between Markov equivalence classes (MECs) while
> greedily maximising a decomposable score (e.g., BIC). Under faithfulness and a
> consistent scoring criterion, GES is **asymptotically correct**: with enough data it
> recovers the true CPDAG in two greedy passes. **SGES** (Chickering & Meek, 2015)
> achieves the same guarantee in polynomial time using selective scoring.

## Overview

Where PC (the constraint-based approach) asks *"are these variables conditionally
independent?"*, GES asks *"which graph structure best explains the data according to
a score?"* The two approaches are complementary: PC is fast and directly interpretable
but depends on CI test reliability; GES is statistically consistent and works well
when a principled score (e.g., BIC, BDeu) is available.

GES, introduced by Chickering (2002) in JMLR, was the first algorithm to search the
CPDAG space *directly* rather than the DAG space. Every step of GES moves from one
equivalence class to an adjacent one, so the output is always a valid CPDAG.

## Scoring Criterion

> [!definition] Decomposable Scoring Criterion
> A score $\text{Score}(\mathcal{G}, \mathcal{D})$ is **decomposable** if it factorises
> over nodes:
> $$\text{Score}(\mathcal{G}, \mathcal{D}) = \sum_{i=1}^{d} s(X_i, \text{Pa}_i^{\mathcal{G}})$$
> where $s(X_i, \text{Pa}_i^{\mathcal{G}})$ depends only on $X_i$ and its parents
> $\text{Pa}_i^{\mathcal{G}}$ in $\mathcal{G}$.
>
> **BIC score** (Gaussian linear SEM):
> $$s(X_i, \text{Pa}_i) = -\frac{n}{2} \log \hat{\sigma}_i^2 - \frac{|\text{Pa}_i| + 1}{2} \log n$$
> where $\hat{\sigma}_i^2$ is the residual variance from regressing $X_i$ on its parents.
>
> Decomposability is what makes GES's insert/delete operators tractable: each move
> changes only a subset of node-parent scores.
^def-decomposable-score

## IMAP Partial Order

GES navigates a **lattice of equivalence classes** ordered by the IMAP relation:

> [!definition] IMAP Ordering
> Equivalence class $[\mathcal{F}]$ is an **IMAP** of $[\mathcal{E}]$ — written
> $[\mathcal{E}] \preceq [\mathcal{F}]$ — if every CI implied by $\mathcal{F}$ is
> also implied by $\mathcal{E}$. Equivalently, $\mathcal{F}$ has *at least as many
> edges* as $\mathcal{E}$ (more edges = fewer CIs implied).
>
> The empty graph (all CIs) is at the bottom; the complete graph (no CIs) is at the top.
> The true class $[\mathcal{G}^*]$ is somewhere in between.
^def-imap

The FES phase climbs *up* this lattice (adding edges); the BES phase descends back
*down* (removing spurious ones).

## The GES Algorithm

GES has two phases, each making greedy single-operator moves:

### Phase 1 — Forward Equivalence Search (FES)

> [!theorem] Forward Equivalence Search (FES)
> **Initialisation:** Start from the empty CPDAG (no edges — the maximally
> independence-rich model).
>
> **Repeat:**
> 1. For every valid **insert operator** $\text{Insert}(X, Y, T)$ — adding a directed
>    edge $X \to Y$ to the current CPDAG $\mathcal{C}$, where $T \subseteq
>    \text{Adj}(Y, \mathcal{C}) \setminus \text{Adj}(X, \mathcal{C})$ is a clique
>    that becomes adjacent to both $X$ and $Y$:
>    - Compute the score change $\Delta(X, Y, T) = s(Y, \text{Pa}_Y^{\text{new}}) - s(Y, \text{Pa}_Y^{\text{old}})$.
> 2. Apply the insert operator with the **maximum positive** $\Delta$.
> 3. Stop when no insert operator improves the score.
>
> **Output:** A CPDAG $\mathcal{C}_{\text{FES}}$ that is an IMAP of the true class.
^thm-fes

The Insert operator is carefully defined so the resulting graph is always a valid
CPDAG (no spurious v-structures, no cycles). This is the main technical content of
Chickering (2002): proving that the space of CPDAGs is closed under Insert/Delete.

### Phase 2 — Backward Equivalence Search (BES)

> [!theorem] Backward Equivalence Search (BES)
> **Initialisation:** Start from $\mathcal{C}_{\text{FES}}$.
>
> **Repeat:**
> 1. For every valid **delete operator** $\text{Delete}(X, Y, H)$ — removing the edge
>    between $X$ and $Y$ from the current CPDAG, where $H \subseteq \text{Adj}(X, \mathcal{C}) \cap \text{Adj}(Y, \mathcal{C})$:
>    - Compute the score change $\Delta(X, Y, H) = s(Y, \text{Pa}_Y^{\text{new}}) - s(Y, \text{Pa}_Y^{\text{old}})$.
> 2. Apply the delete operator with the **maximum positive** $\Delta$.
> 3. Stop when no delete operator improves the score.
>
> **Output:** The final CPDAG $\mathcal{C}_{\text{GES}}$.
^thm-bes

BES removes edges that were added by FES due to finite-sample noise or model
misspecification, recovering a sparser graph closer to the true CPDAG.

## Optimality Theorem

> [!theorem] GES Consistency (Chickering, 2002, Theorem 15)
> Assume:
> 1. **Faithfulness** holds for the true DAG $\mathcal{G}^*$.
> 2. The scoring criterion is **consistent**: with probability → 1 as $n \to \infty$,
>    the score prefers models closer to $\mathcal{G}^*$ (e.g., BIC satisfies this).
> 3. **Causal sufficiency**: no hidden confounders.
>
> Then GES returns the true CPDAG $\mathcal{C}^*$ with probability → 1 as $n \to \infty$.
>
> Furthermore, after the FES phase, $\mathcal{C}_{\text{FES}}$ is an IMAP of $[\mathcal{G}^*]$
> (it may have extra edges, but never missing ones). The BES phase then prunes to
> exactly $\mathcal{C}^*$.
^thm-ges-consistency

This is the core guarantee that separates GES from pure hill-climbing in DAG space:
because each operator produces a valid CPDAG, the search cannot get "stuck" in a
class that differs from the true one in both orientation and adjacency simultaneously.

## SGES — Selective GES

SGES (Chickering & Meek, 2015) addresses GES's main practical limitation: the FES
phase evaluates $O(d^3)$ candidate insert operators per iteration, making it $O(d^5)$
overall for dense graphs.

> [!theorem] SGES Complexity Reduction (Chickering & Meek, 2015, Theorem 1)
> **Selective Insert** restricts the candidate set in FES to operators where the
> score improvement is estimated to exceed a threshold, using a *selective* subset of
> node-parent families.
>
> Under the same faithfulness and consistency assumptions as GES, SGES returns the
> true CPDAG with probability → 1, while running in **$O(d^3 \log d)$** time in
> the Gaussian linear SEM setting — polynomial in $d$ versus GES's $O(d^5)$.
>
> The key insight: the true CPDAG can be recovered without evaluating all possible
> insert operators — only those that would change the score by more than a
> computable bound need to be tried.
^thm-sges

## Covered Edges and Reversibility

A crucial structural fact underlying GES's operator design:

> [!definition] Covered Edge
> An edge $X \to Y$ in a DAG is **covered** if $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$
> (i.e., $X$ and $Y$ have exactly the same parents, except that $X$ is not its own parent).
>
> **Key property**: Reversing a covered edge $X \to Y$ to $X \leftarrow Y$ yields
> another DAG in the *same MEC* if no new v-structure is created.  
> Covered edges are exactly the reversible edges — they correspond to undirected edges
> in the CPDAG.
^def-covered-edge

The Insert/Delete operators in GES are essentially controlled reversals and additions
of covered edges — this is what keeps every intermediate graph a valid CPDAG.

## Comparison: PC vs GES

| Dimension | PC | GES |
|-----------|----|------|
| Approach | Constraint-based (CI tests) | Score-based (BIC / BDeu) |
| Search space | Skeleton then orientation | CPDAG space directly |
| Assumption | Faithfulness + causal sufficiency | Same + consistent score |
| Output | CPDAG | CPDAG |
| Complexity (worst) | $O(d^{k+2})$ CI tests | $O(d^5)$ score evaluations |
| High-dim. result | Consistent ($p \gg n$, Kalisch 2007) | Consistent ($n \to \infty$) |
| Advantage | Fast under sparsity; no score needed | Better when CI tests noisy; principled score |
| Key weakness | CI test reliability; order-dependence | Slow FES on dense graphs |
| Package | `pcalg::pc()` (R) | `pcalg::ges()` (R) |

## Connections

- [[Markov Equivalence Classes and CPDAGs]] — GES searches the space of CPDAGs; every
  GES move produces a valid CPDAG using Insert/Delete operators
- [[PC Algorithm]] — the constraint-based alternative; same output (CPDAG), different path
- [[DAG Structure Learning Problem]] — the formal score-based formulation GES optimises
- [[NOTEARS Algorithm]] — continuous-optimization approach; avoids CPDAG search but
  requires post-processing to obtain a CPDAG

## See Also
- [[PC Algorithm]] — constraint-based alternative producing the same CPDAG output
- [[Markov Equivalence Classes and CPDAGs]] — essential background on what GES navigates
- [[DAG Structure Learning Problem]] — score functions and SEM setup
- [[NOTEARS Algorithm]] — continuous optimization complement
