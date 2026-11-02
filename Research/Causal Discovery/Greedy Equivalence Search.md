---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-PC-algorithm-source.md]]"
source_location: "Chickering (2002), JMLR 3:507–554; §§2–5"
date_ingested: 2026-11-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Overview]]"
aliases:
  - "GES"
  - "Chickering 2002"
  - "score-based structure learning"
  - "greedy equivalence search"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical *score-based* algorithm
> for learning DAG structure. Rather than searching over individual DAGs, GES operates in the
> space of **Markov equivalence classes (MECs)**, represented as CPDAGs. It has two phases:
> a **Forward Phase** that greedily adds edges (Insert operators) and a **Backward Phase** that
> greedily removes edges (Delete operators). Under local consistency, score-equivalence, and
> faithfulness, GES returns the correct MEC with probability converging to 1. Its consistency
> proof relies on the [[Markov Equivalence and CPDAGs#thm-meek-conjecture|Meek Conjecture]]
> (also proven in Chickering 2002).

## Overview

The classic approach to Bayesian network structure learning is to search over the space of DAGs
using a score (e.g., BIC, BDe). The NP-hardness of finding the optimal DAG ([[DAG Structure Learning Problem]])
motivates *greedy* search. But greedy search over DAGs has a redundancy problem: many DAGs are
Markov equivalent, so the search repeats equivalent structures.

Chickering's insight: **search over MECs instead of DAGs**. Each MEC is uniquely represented
by its CPDAG ([[Markov Equivalence and CPDAGs]]). Because Markov equivalent DAGs receive the
same score under any *score-equivalent* score (e.g., BIC), we can score MECs rather than
individual DAGs. GES is the greedy search algorithm that implements this idea.

## Main Content

### Score Function

GES requires a **locally consistent, decomposable, score-equivalent** scoring criterion.

> [!definition] Score Properties for GES
> A scoring criterion $S(G, \mathbf{X})$ is:
>
> - **Score-equivalent:** $S(G_1, \mathbf{X}) = S(G_2, \mathbf{X})$ whenever $G_1 \equiv G_2$
>   (same MEC). BIC and the BDe score satisfy this.
>
> - **Decomposable:** $S(G, \mathbf{X}) = \sum_{i=1}^p s(X_i, \text{pa}_G(X_i), \mathbf{X})$
>   — the score factors over nodes. This enables local score updates when a single edge changes.
>
> - **Locally consistent:** If $X \not\perp\!\!\!\perp Y \mid \text{pa}(X)$ in $P$, then adding
>   $Y$ as a parent of $X$ strictly increases the score as $n \to \infty$. This is satisfied
>   by BIC under faithfulness.
>
> **BIC score (Schwarz 1978):**
> $$S_{\text{BIC}}(G, \mathbf{X}) = \ell(\hat{\theta}_{MLE}; G, \mathbf{X}) - \frac{\log n}{2} \cdot |\theta_G|$$
> where $\ell(\cdot)$ is the log-likelihood and $|\theta_G|$ is the number of free parameters.
> The penalty $\frac{\log n}{2}$ per parameter is crucial for consistency.

^def-score-properties

### The Two Phases of GES

#### Forward Phase (Insert operators)

> [!definition] GES Forward Phase
> **Start:** The empty CPDAG $\mathcal{E}_0$ (no edges).
>
> **Repeat** until no improvement:
> - Find the **Insert** operator $I(X, Y, \mathbf{S})$ that maximizes the score increase,
>   where inserting edge $X \to Y$ with parent set augmentation by $\mathbf{S}$:
>   $$\Delta_{\text{Insert}}(X, Y, \mathbf{S}) = S(G + \{X \to Y\}, \mathbf{X}) - S(G, \mathbf{X})$$
> - A valid Insert$(X, Y, \mathbf{S})$ requires: $X \not\sim Y$ in the current CPDAG, and
>   $\mathbf{S} \subseteq \text{adj}(Y) \setminus \{X\}$ is a clique, and the result is still
>   a valid CPDAG after orienting $X \to Y$ and applying Meek rules.
> - Apply the best Insert if $\Delta > 0$.
>
> **Property:** At the end of the Forward Phase, the algorithm has reached a local maximum of
> the score in the "forward direction" — no single edge insertion improves the score.
>
> **Note on starting point:** Starting from the empty graph means the Forward Phase explores
> in order of increasing model complexity, similar to forward selection in regression.

^def-ges-forward

#### Backward Phase (Delete operators)

> [!definition] GES Backward Phase
> **Start:** CPDAG from end of Forward Phase.
>
> **Repeat** until no improvement:
> - Find the **Delete** operator $D(X, Y, \mathbf{S})$ that maximizes the score increase,
>   where deleting edge $X - Y$ (or $X \to Y$) with $\mathbf{S} \subseteq \mathcal{N}(X,Y)$
>   (common neighbours of $X$ and $Y$):
>   $$\Delta_{\text{Delete}}(X, Y, \mathbf{S}) = S(G - \{X - Y\}, \mathbf{X}) - S(G, \mathbf{X})$$
> - Apply the best Delete if $\Delta > 0$.
>
> **Why a Backward Phase is needed:** The Forward Phase can add spurious edges that it could
> not see as spurious at insertion time (because they were masked by other edges). The Backward
> Phase cleans these up. Together, both phases are needed for the consistency guarantee.

^def-ges-backward

### Pseudocode

```
Algorithm: GES
Input:  Data X (n × p), score function S
Output: CPDAG Ê

Phase 1 (Forward):
  Ê ← empty CPDAG
  Repeat:
    best_δ ← 0
    For each (Xi, Xj) not adjacent in Ê:
      For each valid S ⊆ adj(Xj) \ {Xi}:
        δ ← ΔInsert(Xi, Xj, S)
        If δ > best_δ: store (Xi, Xj, S, δ)
    If best_δ > 0: apply best Insert; update Ê with Meek rules.
    Else: Break.

Phase 2 (Backward):
  Repeat:
    best_δ ← 0
    For each adjacent (Xi, Xj) in Ê:
      For each valid S ⊆ N(Xi, Xj) in Ê:
        δ ← ΔDelete(Xi, Xj, S)
        If δ > best_δ: store (Xi, Xj, S, δ)
    If best_δ > 0: apply best Delete; update Ê with Meek rules.
    Else: Break.

Return Ê.
```

### Consistency Theorem

> [!theorem] GES Consistency (Chickering 2002, Theorem 15 + Corollary 1)
> Let $G^*$ be the true DAG generating distribution $P^*$, and let $S$ be locally consistent,
> decomposable, and score-equivalent (e.g., BIC). Assume faithfulness and causal sufficiency.
>
> Then as $n \to \infty$:
> $$\Pr\!\left(\text{GES returns the MEC of } G^*\right) \to 1.$$
>
> **How the proof works:**
> 1. The BIC score is locally consistent w.p. $\to 1$ as $n \to \infty$ (standard result).
> 2. Forward Phase consistency: at the true MEC, no Insert has positive expected $\Delta$
>    (faithfulness → non-adjacent variables have higher BIC without an edge).
> 3. The Meek Conjecture ([[Markov Equivalence and CPDAGs#thm-meek-conjecture]]) guarantees
>    that Forward Phase can reach a CPDAG that is a supergraph of $\mathcal{E}^*$ without
>    skipping over $\mathcal{E}^*$.
> 4. Backward Phase removes spurious edges added in Forward Phase, converging to exactly $\mathcal{E}^*$.
>
> **Caveat:** GES finds a local maximum of the score, not the global maximum. But under local
> consistency, all local maxima correspond to the true MEC asymptotically.

^thm-ges-consistency

### GES vs. PC: Comparison

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC/BDe) |
| Search space | DAGs/CPDAGs via CI testing | CPDAG operators (Insert/Delete) |
| Oracle input | CI oracle $X \perp\!\!\!\perp Y \mid \mathbf{S}$? | Score oracle $S(G, \mathbf{X})$ |
| Error source | Type I/II errors in CI tests | Score approximation (finite $n$) |
| High-dim. extension | PC-stable (Colombo & Maathuis 2014) | GIES (intervention-aware) |
| Software | `pcalg::pc` (R), `causal-learn` (Python) | `pcalg::ges` (R), `causal-learn` (Python) |
| Flexibility | Kernel CI tests work for any distribution | Requires parametric score |
| Starting point | Fully connected skeleton → prune | Empty graph → add edges |

### Extensions of GES

- **GIES (Hauser & Bühlmann 2012):** Extends GES to *interventional* data by using a
  different score that accounts for intervention targets, enabling full DAG identification
  (not just MEC).
- **FGES (Ramsey et al. 2017):** Parallelized GES using a GPU-accelerated score; scales to
  thousands of variables.
- **RGES (Hauser & Bühlmann 2015):** A restricted version with lower computational complexity.
- **SP (Solus, Wang & Uhler 2021):** *Sparsest permutation* algorithm — searches over
  permutations rather than CPDAGs; consistent under weaker conditions than GES.

## Examples

> [!example] GES on Gene Expression Data
> Hauser & Bühlmann (2012) apply GIES (interventional GES) to the Sachs protein signaling data
> (11 variables, $n=853$ observational + 9 interventional datasets). GIES correctly orients
> most edges that PC/GES leave undirected, demonstrating the value of interventional data.
> This is the same Sachs benchmark used in [[NOTEARS Experiments]].

## Connections

- **DAG Structure Learning Problem** ([[DAG Structure Learning Problem]]): GES is the canonical
  score-based solver for the structure learning program (Problem 3) defined there.
- **NOTEARS** ([[NOTEARS - Overview]]): GES explicitly searched over the combinatorial MEC
  space; NOTEARS reformulates this as a continuous problem. In the [[NOTEARS Experiments]],
  NOTEARS is benchmarked against GES (labeled "FGS" — Fast GES — in NOTEARS notation).
- **Bayesian network construction** ([[BN Construction Methods Comparison]]): GES is one of the
  data-driven BN structure learning methods alongside expert elicitation
  ([[LLM Expert Elicitation for Bayesian Networks]]) and constraint-based methods ([[PC Algorithm]]).

## See Also
- [[Markov Equivalence and CPDAGs]] — the MEC space GES searches over
- [[PC Algorithm]] — constraint-based alternative; comparison table above
- [[DAG Structure Learning Problem]] — the scoring program GES optimizes
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[Causal Structure Learning - Overview]] — places GES in the taxonomy of approaches
