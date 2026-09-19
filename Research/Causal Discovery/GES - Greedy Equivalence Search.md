---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/constraint-score-based-sources.md]]"
source_location: "Chickering (2002), §3–5; Hauser & Bühlmann (2012)"
date_ingested: 2026-09-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search, Chickering 2002) is the canonical **score-based**
> causal discovery algorithm. Instead of testing conditional independencies, it greedily
> **maximizes a score** (e.g. BIC) over the space of **CPDAGs** (Markov equivalence classes).
> Two phases — *forward* (insert edges) and *backward* (delete edges) — provably recover the
> true CPDAG under **faithfulness** and a **locally consistent, score-equivalent, decomposable
> score**: this is Chickering's (2002) **score-consistency theorem** (Theorem 15). GES is
> typically more robust than [[PC Algorithm]] in finite samples because scores aggregate
> evidence across the whole dataset, whereas CI tests lose power at high conditioning-set sizes.

## Overview

GES (Chickering 2002) was motivated by the observation that although DAG selection from
observational data is NP-hard in general (Chickering 1996), the search space can be
*reduced* by working in the space of **Markov equivalence classes** (CPDAGs) rather than
individual DAGs. Within equivalence classes, all DAGs share the same score (score equivalence),
so each CPDAG has a single well-defined score.

GES searches this equivalence-class space *greedily*: it starts from the empty CPDAG and
repeatedly applies local **operators** (Insert, Delete, Turn) that produce the largest
score improvement. The key insight (Chickering 2002, Theorem 10–14): these operators are
*complete* — any DAG can be reached from any other DAG via a sequence of Insert and Delete
operations that each correspond to moving one step in equivalence-class space.

## Main Content

### Score Properties

For GES to be consistent, the score function $Q: \mathbb{D} \to \mathbb{R}$ (mapping DAGs to reals) must satisfy:

> [!definition] Definition: Score Requirements for GES (Chickering 2002, §2)
> **1. Score equivalence:** $G \sim G'$ (same MEC) $\Rightarrow Q(G) = Q(G')$.  
> The score depends only on the CI structure, not on how edges are directed within the MEC.
>
> **2. Decomposability:** $Q(G) = \sum_{j=1}^d q(X_j, \mathrm{pa}_G(X_j))$, where
> $q(X_j, \mathrm{pa}_G(X_j))$ is a **local score** that depends only on $X_j$ and its parents.  
> This allows efficient incremental updates when a single edge is added or removed.
>
> **3. Local consistency:** If $Q$ is locally consistent (defined below), GES is guaranteed
> to converge to the true MEC.
^def-score-props

> [!definition] Definition: Local Consistency (Chickering 2002, Def. 18)
> Score $Q$ is **locally consistent** w.r.t. $\mathbb{P}$ if, for any DAG $G$ and any
> variable $X$ with parent set $\Pi$:
> - If $X \perp\!\!\!\perp (X \setminus (\Pi \cup \{X\})) \mid \Pi$ in $\mathbb{P}$ (parents suffice):  
>   adding any $Y \notin \Pi$ to the parent set **does not** increase the score.
> - If $X \not\!\perp\!\!\!\perp (X \setminus (\Pi \cup \{X\})) \mid \Pi$ (parents insufficient):  
>   there exists $Y \notin \Pi$ whose addition to the parent set **does** increase the score.
^def-local-consistency

**Standard consistent scores** for common settings:

| Data | Score | Formula |
|------|-------|---------|
| Gaussian, linear | **BIC** | $\log P(X \mid G, \hat{\theta}) - \frac{|\hat{\theta}_G|}{2} \log n$ |
| Discrete/categorical | **BDeu** | Bayesian Dirichlet equivalent uniform |
| Gaussian, Bayesian | **BGe** | Bayesian Gaussian equivalent |
| Universal | **MDL** | Minimum description length |

BIC is score equivalent and locally consistent for faithful Gaussian distributions
(Chickering 2002; Haughton 1988), making it the default for continuous data.

### Algorithm

#### Forward Phase (Insert Edges)

> [!theorem] GES Forward Phase (Chickering 2002, §4)
> **Input**: Empty CPDAG $\hat{G}_0$.  
> **Repeat** until score cannot be improved:
>
> 1. Consider all valid **Insert** operations $\mathrm{Insert}(X, Y, T)$:  
>    Add a directed edge $X \to Y$ (with $T \subseteq \mathrm{Adj}(X) \cap \mathrm{Adj}(Y)$,
>    the clique of "helper" nodes required for validity).
> 2. Select the Insert with the **largest score gain** $\Delta Q > 0$.
> 3. Apply Insert and update the CPDAG representation (PDAG-to-CPDAG completion).
>
> **Output**: A CPDAG $\hat{G}_F$ that is a **local maximum** of $Q$ in the forward direction —
> no single Insert can improve the score further.
>
> **Guarantee** (Chickering 2002, Theorem 13): $\hat{G}_F$ has **at least as many edges** as
> the true CPDAG (may include false positives; backward phase removes them).
^thm-forward

#### Backward Phase (Delete Edges)

> [!theorem] GES Backward Phase (Chickering 2002, §5)
> **Input**: CPDAG $\hat{G}_F$ from the forward phase.  
> **Repeat** until score cannot be improved:
>
> 1. Consider all valid **Delete** operations $\mathrm{Delete}(X, Y, H)$:  
>    Remove edge $X - Y$ or $X \to Y$ (with $H \subseteq \mathrm{Adj}(X) \cap \mathrm{Adj}(Y)$).
> 2. Select the Delete with the **largest score gain** $\Delta Q > 0$.
> 3. Apply Delete and update the CPDAG.
>
> **Output**: A CPDAG $\hat{G}_B$ that is a local maximum of $Q$ in both directions.
^thm-backward

#### Turning Phase (Hauser & Bühlmann 2012)

> [!theorem] GES Turning Phase (Hauser & Bühlmann 2012)
> A third phase applies **Turn** operations — reversing edge directions — to improve the
> score further. The Turn operator is needed because Insert and Delete together are not
> always sufficient to escape local optima in the score landscape.
>
> Hauser & Bühlmann (2012, *JMLR*) proved that the three-phase algorithm (Insert → Delete → Turn,
> iterated until convergence) is also consistent under the same assumptions as two-phase GES.
^thm-turning

### Score-Consistency Theorem

> [!theorem] Theorem 15: Score Consistency of GES (Chickering 2002)
> Let the true distribution $\mathbb{P}$ be **faithful** to DAG $G^*$, and let $Q_n$ be a
> **locally consistent, score-equivalent, decomposable** scoring criterion that is consistent
> (i.e. for each local family $(X_j, \Pi)$, $q_n(X_j, \Pi)$ converges to identifying the
> true local independencies as $n \to \infty$). Then:
>
> $$\Pr\!\left[\hat{G}^{\mathrm{GES}}_n = G^{*,\mathrm{CPDAG}}\right] \to 1 \quad \text{as } n \to \infty.$$
>
> **Proof sketch (Chickering 2002, §6):** By local consistency of $Q_n$, the forward phase
> adds each true edge before adding any false edge (Theorem 13); by score consistency the
> backward phase removes each false edge without removing any true edge (Theorem 14).
> Together they converge to the true CPDAG.
^thm-ges-consistency

### Comparison: PC vs. GES

| | **PC Algorithm** | **GES** |
|-|-----------------|---------|
| **Type** | Constraint-based | Score-based |
| **Input** | CI tests (with threshold $\alpha$) | Score function (BIC) |
| **Search space** | Skeleton → CPDAG | CPDAG → CPDAG |
| **Output** | CPDAG | CPDAG |
| **Consistency** | Under faithfulness + Markov + sufficiency | Under faithfulness + locally consistent score |
| **Finite-sample** | CI tests lose power at large conditioning sets | Scores aggregate all data; more robust |
| **Complexity** | $O(d^{q+2})$ for max degree $q$ (sparse) | Polynomial forward phase; exponential worst case |
| **Sensitivity** | Depends on $\alpha$ and CI test choice | Depends on score and penalty |
| **Latent confounders** | Fails (use FCI instead) | Fails (use GFCI or other extensions) |

### Comparison: GES vs. NOTEARS

| | **GES** | **NOTEARS** |
|-|---------|------------|
| **Output** | CPDAG (equivalence class) | Single DAG (weighted $W$) |
| **Search** | Discrete, in MEC space | Continuous, over $\mathbb{R}^{d\times d}$ |
| **Score** | BIC (closed-form, exact) | Least-squares + $\ell_1$ |
| **Acyclicity** | Enforced structurally by operators | Enforced by $h(W) = 0$ constraint |
| **Faithfulness** | Required for consistency | Not required (LS recovery results) |
| **Scalability** | Forward phase polynomial, but exponential worst case | Scales to hundreds of nodes via L-BFGS |

## Connections

- **Empirical comparison**: NOTEARS experiments (see [[NOTEARS Experiments]]) benchmark
  against GES (as "FGS" — the fast variant from Ramsey et al. 2017) and show that NOTEARS
  matches or beats GES/FGS on SHD and FDR at larger graph sizes, while GES remains
  competitive on small sparse graphs.
- **Score functions**: the BIC score used by GES is the frequentist analogue of the marginal
  likelihood used in [[Hierarchical Models]] and [[Bayesian Outcome Models]] — the BIC
  approximates $-2 \log P(X \mid G)$ marginalized over parameters.
- **Summary Causal DAGs** (see [[Summary Causal DAGs]]): in the Zeng 2025 framework,
  structure learning (via PC/GES) is the **preceding step** before DAG summarization — one
  first learns a full CPDAG and then summarizes it into a coarser causal representation.
- **ABM causal discovery**: ABM simulation outputs can serve as the data for PC/GES,
  learning the causal structure of the simulation's emergent dynamics —
  see [[Approximate Bayesian Computation for ABMs]] for the ABM perspective.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the CPDAG space that GES searches over
- [[PC Algorithm]] — constraint-based alternative with the same CPDAG output
- [[DAG Structure Learning Problem]] — landscape of structure learning methods including GES
- [[NOTEARS - Overview]] — continuous-optimization alternative benchmarked against GES
- [[NOTEARS Experiments]] — empirical comparison of NOTEARS vs. GES/FGS
