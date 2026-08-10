---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/causal-learn-pc-source.py]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5–6; Colombo & Maathuis (2014)"
date_ingested: 2026-08-10
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Skeleton Discovery and CI Testing]]"
  - "[[CPDAG Orientation - V-Structures and Meek Rules]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes Glymour algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991) is the foundational
> **constraint-based** method for causal structure learning. It learns a CPDAG from
> observational data by testing for conditional independence: (1) discover the skeleton
> by removing edges between variables made independent by some conditioning set; (2)
> orient v-structures (colliders); (3) apply Meek's orientation rules. Under
> faithfulness and causal sufficiency, PC is **consistent**: it recovers the true CPDAG
> in the large-sample limit. Its computational complexity is exponential in the worst
> case (dense graphs) but polynomial for sparse graphs with bounded degree.

## Overview

The PC algorithm, named after its creators **Peter Spirtes** and **Clark Glymour**
(Spirtes, Glymour & Scheines 2000; building on Spirtes & Glymour 1991), is the
oldest and most widely studied algorithm for learning causal DAGs from data without
interventions. It belongs to the **constraint-based** family: it uses the results of
statistical independence tests as constraints that the learned graph must satisfy.

The algorithm contrasts sharply with **score-based** methods like GES
([[GES - Greedy Equivalence Search]]) and **continuous optimization** approaches like
NOTEARS ([[NOTEARS - Overview]]). PC requires no score function — only a black-box
conditional independence oracle. This makes it flexible (any CI test can plug in) but
sensitive to test errors.

## Main Content

### Assumptions

> [!definition] Definition: PC Algorithm Assumptions
> The PC algorithm requires three assumptions about the data-generating process:
>
> 1. **Acyclicity**: the true causal graph is a DAG (no feedback cycles).
> 2. **Causal sufficiency**: all common causes of observed variables are themselves
>    observed — no hidden confounders. (Violated: use FCI instead.)
> 3. **Faithfulness**: the distribution $\mathbb{P}$ is faithful to the true DAG
>    $\mathcal{G}^*$ — every conditional independence in $\mathbb{P}$ corresponds to a
>    d-separation in $\mathcal{G}^*$ (no "coincidental" cancellations of path effects).
^def-pc-assumptions

### The three phases

The PC algorithm proceeds in three sequential phases:

| Phase | Input | Output | Details |
|-------|-------|--------|---------|
| **1. Skeleton discovery** | Complete undirected graph | Skeleton + sep sets | Remove edges via CI tests |
| **2. V-structure orientation** | Skeleton + sep sets | PDAG with v-structures | Orient colliders $X_i \to X_k \leftarrow X_j$ |
| **3. Meek orientation rules** | PDAG with v-structures | CPDAG | Propagate orientations without new v-structures/cycles |

For full details of phases 1 and 2–3 see [[PC Skeleton Discovery and CI Testing]] and
[[CPDAG Orientation - V-Structures and Meek Rules]] respectively.

### High-level pseudocode

```
Input: data X, significance level α
Output: CPDAG Ĉ

Phase 1 — Skeleton Discovery:
  G = complete undirected graph on {X₁,...,Xd}
  sep = empty separating set dictionary
  for l = 0, 1, 2, ...:
    for each adjacent pair (Xᵢ, Xⱼ) in G:
      for each set S ⊆ adj(Xᵢ)\{Xⱼ} with |S| = l:
        if Xᵢ ⊥ Xⱼ | S  (p-value > α):
          remove edge Xᵢ—Xⱼ from G
          sep(i,j) = sep(j,i) = S
          break
    if no adj pair has |adj(Xᵢ)\{Xⱼ}| ≥ l+1: stop

Phase 2 — V-structures:
  for each pair (Xᵢ, Xⱼ) non-adjacent in G with common neighbor Xₖ:
    if Xₖ ∉ sep(i,j):
      orient Xᵢ → Xₖ ← Xⱼ in G

Phase 3 — Meek rules:
  Repeatedly apply R1–R4 until no new orientations
  Return CPDAG Ĉ = G
```

### Consistency guarantee

> [!theorem] Theorem: Consistency of PC (Spirtes, Glymour & Scheines 2000)
> Let $\mathcal{G}^*$ be a DAG generating i.i.d. data $X_1, \ldots, X_n$ from a
> distribution faithful to $\mathcal{G}^*$. If the conditional independence oracle is
> perfect (population-level), the PC algorithm outputs the **CPDAG of $\mathcal{G}^*$**
> — it identifies the true Markov equivalence class exactly.
>
> In finite samples with a consistent CI test (e.g. Fisher's Z at $\alpha \to 0$ as
> $n \to \infty$), PC is **asymptotically consistent**: the probability of outputting
> the correct CPDAG converges to 1 as $n \to \infty$.
^thm-pc-consistency

### Computational complexity

The skeleton-discovery phase dominates cost. In the worst case (complete graph throughout),
the number of CI tests is:
$$\sum_{l=0}^{d-2} d(d-1) \binom{d-2}{l} = O\!\left(d^2 \cdot 2^d\right),$$
exponential in $d$. However, for **sparse graphs** with maximum degree $k$, the conditioning
sets are bounded to $\binom{k}{l}$ per pair, yielding total complexity $O(d^{k+2})$ — polynomial
for fixed $k$. Many real-world and scientific DAGs are sparse, making PC practically tractable.

### Stable PC (order-independent variant)

The original PC algorithm is **order-dependent**: the output can differ based on the
order in which edges are tested. Colombo & Maathuis (2014) introduced **Stable PC**:

> [!definition] Definition: Stable PC (Colombo & Maathuis 2014)
> In Stable PC, during each skeleton-discovery iteration at level $l$:
> - Tests are run for **all** pairs at level $l$ before **any** edge is deleted.
> - Adjacency sets for conditioning are determined by the graph at the *start* of
>   iteration $l$, not updated mid-iteration.
>
> This makes the output invariant to the ordering of variables and edge tests, improving
> reproducibility. Implemented as `stable=True` in the causal-learn PC function.
^def-stable-pc

### Comparison with other methods

| Property | PC | GES | NOTEARS |
|----------|-----|-----|---------|
| Paradigm | Constraint-based | Score-based | Continuous optimization |
| Output | CPDAG | CPDAG | DAG (weighted) |
| Requires | CI test + α | Decomposable score | Linear SEM + LS score |
| Hidden confounders | ✗ (use FCI) | ✗ | ✗ |
| Non-Gaussian | CI test choice | Score choice | ✓ (any noise) |
| Complexity (sparse) | $O(d^{k+2})$ | $O(d^2 k^2)$ per step | $O(d^3)$ |
| Sensitivity | Test errors compound | Score landscape | Nonconvex landscape |

## Connections

- **Faithfulness**: see [[Markov Equivalence Classes and CPDAGs]] for why faithfulness
  is necessary and what it implies for identifiability
- **D-separation oracle**: the CI tests implement a statistical approximation to the
  d-separation criterion in [[Directed Acyclic Graphs]]
- **FCI algorithm**: drops causal sufficiency — handles hidden confounders by outputting
  PAGs (Partial Ancestral Graphs) instead of CPDAGs
- **GES**: the score-based alternative that searches CPDAG space directly; often more
  accurate in moderate dimensions → [[GES - Greedy Equivalence Search]]
- **causal-learn**: Python implementation — `causallearn.search.ConstraintBased.PC`
  with `indep_test` ∈ {`fisherz`, `chisq`, `gsq`, `kci`}

## See Also
- [[PC Skeleton Discovery and CI Testing]] — Phase 1 in detail: CI tests, sep sets
- [[CPDAG Orientation - V-Structures and Meek Rules]] — Phases 2–3: Meek rules
- [[Markov Equivalence Classes and CPDAGs]] — why PC targets a CPDAG, not a DAG
- [[GES - Greedy Equivalence Search]] — the score-based complement to PC
- [[DAG Structure Learning Problem]] — the general problem landscape
- [[NOTEARS - Overview]] — continuous-optimization alternative
