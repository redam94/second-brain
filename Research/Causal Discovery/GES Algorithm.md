---
title: "GES Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-citation.md]]"
source_location: "Chickering (2002), JMLR Vol. 3, pp. 507–554, §3–5"
date_ingested: 2026-08-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Causal Discovery Algorithm Comparison]]"
aliases:
  - "Greedy Equivalence Search"
  - "GES"
  - "Chickering 2002"
  - "score-based causal discovery"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
---

# GES Algorithm

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** causal
> structure learning algorithm. It searches directly over the space of **Markov equivalence classes
> (CPDAGs)** in two greedy phases: a forward phase (FES) that starts from the empty graph and
> inserts edges, followed by a backward phase (BES) that removes edges. Under the faithfulness
> assumption and causal sufficiency, GES recovers the true CPDAG in the large-sample limit —
> this is the *Meek conjecture*, proven by Chickering. GES avoids the exponential-time exact
> combinatorial search while being provably asymptotically optimal.

## Overview

GES is a **score-based** method: rather than testing conditional independence as the [[PC Algorithm]]
does, it evaluates a **score function** $Q(\mathsf{G})$ — typically the BIC (Bayesian Information
Criterion) — and greedily optimizes it. The key technical contribution is defining and exploiting
**operators** that move between adjacent equivalence classes, allowing search over CPDAGs without
ever materializing individual DAGs in the equivalence class.

The algorithm is implemented in the `pcalg` R package (`ges()`) and the `causal-learn` Python
library (`GES`).

## Main Content

### Score decomposability

GES requires a **locally decomposable** score: one that factors over individual nodes given their
parent sets.

> [!definition] Definition: Score Decomposability (Chickering 2002, §2)
> A score function $Q$ is **locally decomposable** if, for any DAG $\mathsf{G}$:
> $$Q(\mathsf{G}) = \sum_{i=1}^d q(X_i, \mathrm{Pa}(X_i))$$
> where $q(X_i, \mathrm{Pa}(X_i))$ depends only on the local family $(X_i, \mathrm{Pa}(X_i))$.
^def-decomposable-score

> [!example] Example: BIC score
> For multivariate Gaussian data with $n$ observations:
> $$q(X_i, \mathrm{Pa}(X_i)) = -\frac{n}{2}\ln\hat\sigma^2_i - \frac{|\mathrm{Pa}(X_i)| + 1}{2}\ln n$$
> where $\hat\sigma^2_i$ is the residual variance of regressing $X_i$ on $\mathrm{Pa}(X_i)$.
> The BIC score penalizes complexity via $-\frac{p}{2}\ln n$ (with $p$ parameters), making it
> consistent: as $n\to\infty$, the true graph has the highest BIC score with probability 1.
^ex-bic-score

Decomposability means that **score changes from a single edge insertion/deletion are computable
locally**, without recomputing the whole graph score. This is the key to GES's efficiency.

### Search space: the Markov equivalence class DAG

Instead of searching over $|\mathbb{D}|$ (super-exponential) individual DAGs, GES searches
over **Markov equivalence classes**, represented as CPDAGs. The number of equivalence classes is
much smaller, and adjacent classes are connected by **elementary operators**.

> [!definition] Definition: Insert Operator $I(X, Y, H)$ (Chickering 2002, §4.1)
> Given a CPDAG $\mathsf{C}$, the **insert operator** $I(X, Y, H)$ adds a directed edge
> $X \to Y$ where $H \subseteq \mathrm{Ne}_{\mathsf{C}}(Y) \setminus \mathrm{Adj}_{\mathsf{C}}(X)$
> and orients each $T \in H$ toward $Y$. The result is a new CPDAG.
>
> *Validity condition:* $Y \notin \mathrm{Adj}(X)$ in $\mathsf{C}$; $H$ is clique in $\mathsf{C}$;
> and the insertion does not create a new v-structure or cycle.
^def-insert-operator

> [!definition] Definition: Delete Operator $D(X, Y, H)$ (Chickering 2002, §4.2)
> Given a CPDAG $\mathsf{C}$, the **delete operator** $D(X, Y, H)$ removes the edge $X - Y$ (or
> $X \to Y$) and un-orients $H \subseteq \mathrm{Ne}_{\mathsf{C}}(Y) \cap \mathrm{Adj}_{\mathsf{C}}(X)$.
> The result is a new CPDAG.
^def-delete-operator

### Phase 1: Forward Equivalence Search (FES)

> [!theorem] FES Phase (Chickering 2002, §4, Theorem 15 direction 1)
>
> **Input:** Data $\mathbf{X}$, score $Q$, initially empty CPDAG $\mathsf{C}_0$ (no edges).  
>
> **Repeat:**
> 1. Evaluate the score gain $\Delta(I) = Q(\mathsf{C}') - Q(\mathsf{C})$ for every valid insert
>    operator $I(X, Y, H)$ over all pairs $(X, Y)$ and all valid conditioning sets $H$.
> 2. Apply the insert with maximum $\Delta(I) > 0$ → update CPDAG to $\mathsf{C}'$.
> 3. **Until** no insert increases the score.
>
> **Output:** CPDAG $\mathsf{C}_{\mathrm{FES}}$.
^alg-fes

> [!note] Why does FES overshoot?
> FES only adds edges — it cannot remove them. Starting from the empty graph, it will add all true
> edges but may also add spurious edges that increase the score in finite samples. The BES phase
> corrects this. Chickering proves that: (1) every edge the true CPDAG has is added by FES in the
> large-sample limit, and (2) every spurious edge added can be removed by BES.

### Phase 2: Backward Equivalence Search (BES)

> [!theorem] BES Phase (Chickering 2002, §4, Theorem 15 direction 2)
>
> **Input:** CPDAG $\mathsf{C}_{\mathrm{FES}}$ from Phase 1.  
>
> **Repeat:**
> 1. Evaluate $\Delta(D) = Q(\mathsf{C}') - Q(\mathsf{C})$ for every valid delete operator
>    $D(X, Y, H)$.
> 2. Apply the delete with maximum $\Delta(D) > 0$ → update to $\mathsf{C}'$.
> 3. **Until** no delete increases the score.
>
> **Output:** Final CPDAG $\mathsf{C}_{\mathrm{GES}}$.
^alg-bes

### Consistency (the Meek conjecture)

> [!theorem] Theorem: GES Consistency — Meek Conjecture (Chickering 2002, Theorem 15)
> Assume:
> 1. Data is generated by some faithful DAG $\mathsf{G}^*$ with causal sufficiency.
> 2. The score $Q$ is locally decomposable and consistent (BIC satisfies this).
>
> Then as $n \to \infty$, GES returns the CPDAG of $\mathsf{G}^*$ with probability 1.
>
> *Proof structure:* Chickering shows (Lemmas 1–14) that in the large-sample limit:
> - FES adds exactly the edges of the true CPDAG (no more, no fewer).
> - BES removes exactly the spurious edges FES might have added.
> The two phases together form an exact recovery procedure.
^thm-ges-consistency

> [!note] The Meek conjecture
> David Meek conjectured (ca. 1997) that the BES step could correct all FES overshoot, making
> the full GES procedure optimal. Chickering's 2002 paper proves this conjecture as Theorem 15.
> The name "GES" and the split into FES/BES phases reflects this conjecture-turned-theorem.

### Score evaluation efficiency

Because $Q$ is decomposable, the score gain of $I(X, Y, H)$ reduces to:
$$\Delta\bigl(I(X,Y,H)\bigr) = q(Y, \mathrm{Pa}(Y) \cup \{X\} \cup H) - q(Y, \mathrm{Pa}(Y) \cup H)$$

Only the local score at $Y$ changes; all other terms in $\sum_i q(\cdot)$ cancel. This localisation
is why GES is computationally feasible despite the exponential operator space.

### Complexity

- **Operators per step:** At most $O(d^2 \cdot 2^d)$ insert operators in the worst case; typically
  far fewer because the conditioning set $H \subseteq \mathrm{Ne}(Y) \setminus \mathrm{Adj}(X)$
  is small in sparse graphs.
- **Practical:** For sparse graphs with max degree $\Delta$, the inner loop over $H$ has at most
  $2^\Delta$ candidates per $(X,Y)$ pair — polynomial in $d$ for fixed $\Delta$.
- **FGES** (Fast GES; Ramsey et al. 2017): optimized implementation caching adjacency sets, parallelizing
  score evaluations. Scales to $d \sim 10^6$ variables. Used as the NOTEARS paper's primary baseline.

### Software

```python
# causal-learn (Python)
from causallearn.search.ScoreBased.GES import ges

Record = ges(data, score_func='local_score_BIC')
# Record['G'] is a GeneralGraph object; Record['score'] is final BIC score
```

```r
# pcalg (R)
library(pcalg)
score <- new("GaussL0penObsScore", data)
fitted.ges <- ges(score)
# fitted.ges$essgraph is the CPDAG
```

## Limitations

1. **Faithfulness required.** Like PC, GES needs faithfulness; exact cancellations of paths cause
   incorrect structure recovery.
2. **Causal sufficiency.** Hidden confounders create spurious edges not removable by BES.
3. **Score specification.** BIC is consistent for Gaussian data but not necessarily for other
   distributions; non-Gaussian GES variants exist (e.g. penalized likelihood with correct marginal).
4. **Finite-sample performance.** FES may add many spurious edges in small $n$; BES then needs to
   remove them. The NOTEARS experiments show FGS/GES deteriorates rapidly for dense graphs.
5. **Non-identifiability.** Like all faithful-distribution methods, the output is a CPDAG, not a
   unique DAG. Additional assumptions are needed for full DAG recovery.

## Connections

- **PC algorithm** ([[PC Algorithm]]): constraint-based alternative; same asymptotic target (CPDAG);
  different paradigm (CI testing vs score search).
- **NOTEARS** ([[NOTEARS - Overview]]): continuous optimization; outputs a DAG, not CPDAG; empirically
  outperforms GES on dense graphs (see [[NOTEARS Experiments]]).
- **Markov equivalence** ([[Markov Equivalence and CPDAGs]]): the CPDAG is the correct output for
  score-based structure learning from observational data.
- **Score functions** ([[DAG Structure Learning Problem]]): BIC is the JMLR paper's score; the
  BDe score connects to Bayesian structure learning.

## See Also
- [[Markov Equivalence and CPDAGs]] — the search space GES operates in
- [[PC Algorithm]] — constraint-based alternative; comparison in [[Causal Discovery Algorithm Comparison]]
- [[DAG Structure Learning Problem]] — score decomposability and the landscape of prior methods
- [[NOTEARS Algorithm]] — continuous optimization; FGS is NOTEARS's main benchmark
- [[Causal Discovery/_Index|Causal Discovery Index]]
