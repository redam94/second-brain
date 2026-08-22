---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000); Kalisch & Bühlmann (2007)"
source_location: "SGS (2000) Ch. 5–6; Kalisch & Bühlmann (2007), JMLR 8:613–636"
date_ingested: 2026-08-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Skeleton Phase]]"
  - "[[PC Algorithm - Orientation Phase]]"
  - "[[Causal Structure Learning - Paradigm Comparison]]"
aliases:
  - "PC algorithm"
  - "SGS algorithm"
  - "constraint-based causal discovery"
  - "Spirtes Glymour Scheines"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, 1991; Spirtes, Glymour & Scheines 2000) is the
> canonical **constraint-based** method for learning causal structure from observational data.
> It starts from a complete undirected graph and eliminates edges by testing for **conditional
> independence**, then orients the remaining skeleton using **v-structure** detection and
> **Meek's orientation rules**. Under faithfulness, causal Markov, and causal sufficiency,
> PC consistently recovers the **CPDAG** — the Markov equivalence class of the true DAG.

## Overview

The PC algorithm (named after its authors **P**eter Spirtes and **C**lark Glymour) solves the
causal structure learning problem by directly testing what the data imply about
**conditional independence (CI)**: if $X \perp\!\!\!\perp Y \mid S$ in the distribution, then
no direct edge can exist between $X$ and $Y$ given the adjustment set $S$.

This places PC in the **constraint-based** paradigm, as distinguished from:
- **Score-based** methods (GES, hill-climbing) which optimize a goodness-of-fit criterion — see [[GES - Overview]]
- **Continuous optimization** methods (NOTEARS, DAGMA) which reformulate structure search over a continuous domain — see [[NOTEARS - Overview]]

See [[Causal Structure Learning - Paradigm Comparison]] for a systematic comparison.

## Identifying assumptions

> [!definition] The three PC assumptions
> 1. **Causal Markov condition**: Each variable $X_i$ is conditionally independent of its non-descendants given its parents $\text{pa}(X_i)$ in the true causal DAG $\mathcal{G}^*$. Equivalently, the joint distribution $\mathbb{P}$ satisfies the **Markov factorization** over $\mathcal{G}^*$:
>    $$\mathbb{P}(X_1,\dots,X_d) = \prod_{i=1}^d \mathbb{P}(X_i \mid X_{\text{pa}(i)}).$$
> 2. **Causal faithfulness**: Every conditional independence in $\mathbb{P}$ is entailed by **d-separation** in $\mathcal{G}^*$. There are no "accidental" cancellations making variables independent when the graph implies dependence.
> 3. **Causal sufficiency** (no hidden common causes): All common causes of the measured variables are themselves measured (no latent confounders or selection bias).
^def-pc-assumptions

**Why these matter.** The Markov condition enables reading independence from the graph (d-separation). Faithfulness ensures the converse: independence implies separation. Together they make CI tests **informative about graph structure**. Causal sufficiency rules out bidirected edges that would arise from unmeasured confounders. (Without it, one needs FCI instead of PC.)

> [!note] Faithfulness in practice
> Faithfulness fails on measure-zero parameter sets (e.g. two paths cancel exactly), so violations are rare in continuous distributions. In finite samples, "near-unfaithfulness" (weak but non-zero dependence) is the harder issue: the CI test does not reject, and the edge is wrongly removed. Kalisch & Bühlmann (2007) show that under sparsity and growing $p$, PC remains consistent even when $p \gg n$.

## Algorithm structure

The algorithm runs in two stages:

```
PC(data X, significance level α)
  Stage 1 — Skeleton learning:
    Start with complete undirected graph G on d nodes
    For k = 0, 1, 2, ...:
      For each adjacent pair (X_i, X_j) in G:
        Test X_i ⊥⊥ X_j | S for each S ⊆ adj(X_i)\{X_j} with |S| = k
        If any test accepts, remove edge X_i — X_j; record sep(i,j) = S
    Until no edge is removed in a full pass
    → Output: skeleton G, separation sets sep(·,·)

  Stage 2 — Orientation:
    (a) Detect v-structures (unshielded colliders)
    (b) Apply Meek's orientation rules (R1–R4) iteratively
    → Output: CPDAG Ĝ
```

See [[PC Algorithm - Skeleton Phase]] for the detailed skeleton-learning procedure and complexity analysis. See [[PC Algorithm - Orientation Phase]] for v-structures and Meek rules.

## Output: the CPDAG

The PC algorithm does not output a single DAG — it outputs a **Completed Partially Directed Acyclic Graph (CPDAG)**, also called the **essential graph** of the Markov equivalence class. A CPDAG has:
- **Directed edges** for relationships that are **identically oriented** in every DAG of the equivalence class (forced by v-structures and Meek rules)
- **Undirected edges** for relationships where both orientations are consistent with the data

> [!definition] CPDAG (essential graph)
> A CPDAG $\widehat{\mathcal{G}}$ represents all DAGs $\mathcal{G}$ such that:
> $$\text{skeleton}(\mathcal{G}) = \text{skeleton}(\widehat{\mathcal{G}})
> \quad \text{and} \quad
> \text{v-structures}(\mathcal{G}) = \text{v-structures}(\widehat{\mathcal{G}}).$$
> Two DAGs are **Markov equivalent** if and only if they have the same skeleton and the same v-structures (Verma & Pearl 1990). The equivalence class is the largest set of DAGs that produce identical observed distributions under the Markov + faithfulness assumptions.
^def-cpdag

## Consistency

> [!theorem] PC consistency (SGS 2000, Kalisch & Bühlmann 2007)
> Under faithfulness, causal Markov, and causal sufficiency, if the CI tests are exact (oracle tests), PC returns the CPDAG of the true DAG. In finite samples, Kalisch & Bühlmann (2007) show that if the true DAG is sparse (max in-degree bounded by $q$) and a consistent CI test is used (e.g. Fisher's z-test for Gaussian data), then as $n \to \infty$, PC consistently recovers the true CPDAG — even when $p = O(n^a)$ for $a < 1/(2q)$.
^thm-pc-consistency

## Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | Kalisch et al. (2012); includes PC, FCI, GES, IDA |
| `causal-learn` | Python (py-why) | Modern Python implementation; PC + skeleton-PC, FCI, GES |
| `cdt` | Python | Causal Discovery Toolbox; wraps both |

## Connections

- **[[DAG Structure Learning Problem]]** — the formal setup (SEM, score-based program) that PC addresses via the CI paradigm
- **[[Directed Acyclic Graphs]]** — d-separation and the back-door criterion that PC exploits
- **[[GES - Overview]]** — the score-based alternative that is asymptotically more efficient under Gaussianity
- **[[NOTEARS - Overview]]** — continuous-optimization alternative; NOTEARS paper reports PC as "significantly weaker" baseline (supplement)
- **[[Causal Structure Learning - Paradigm Comparison]]** — systematic comparison of constraint-based vs score-based vs continuous approaches
- **[[Summary Causal DAGs]]** — DAG summarization downstream of structure learning

## See Also
- [[PC Algorithm - Skeleton Phase]] — detailed edge-removal procedure, complexity, CI test choices
- [[PC Algorithm - Orientation Phase]] — v-structure detection and Meek's orientation rules
- [[GES - Overview]] — score-based competitor
- [[Causal Discovery/_Index|Causal Discovery Index]]
