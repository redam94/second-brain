---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-references.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Chs. 5–6; Kalisch & Bühlmann (2007), §1–2"
date_ingested: 2026-10-06
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI-based structure learning"
  - "constraint-based structure learning"
  - "independence-based causal discovery"
---

# Constraint-Based Causal Discovery

> [!summary]
> **Constraint-based** causal structure learning discovers the skeleton and orientation of a DAG by
> conducting a series of **conditional independence (CI) tests** on observed variables, treating CI
> relations as "constraints" that the true DAG must respect. Under the Markov and Faithfulness
> assumptions, every CI relation $X \perp\!\!\!\perp Y \mid S$ in the distribution corresponds to
> a d-separation $X \perp_d Y \mid S$ in the true DAG. The canonical algorithm is the
> **PC algorithm** (Spirtes & Glymour 1991; Kalisch & Bühlmann 2007). Constraint-based methods
> are **distribution-free** — they use only CI test decisions, not a parametric score — and output
> a **CPDAG** rather than a unique DAG.

## Overview

There are two main paradigms for causal structure learning from data:

| Paradigm | Approach | Key assumption beyond Markov + Faithfulness | Output |
|----------|----------|---------------------------------------------|--------|
| **Constraint-based** | CI testing → skeleton + v-structures + Meek rules | None (beyond Markov + Faithfulness + causal sufficiency) | CPDAG |
| **Score-based** | Greedy search over DAG/MEC space maximising a score | Score-equivalence, decomposability, consistency (e.g. BIC) | CPDAG (GES) or DAG (greedy hill-climbing) |
| **Continuous-optimization** | Continuous relaxation of the acyclicity constraint | Linear SEM (NOTEARS) or specific functional forms | DAG |

Constraint-based methods have two major practical advantages:
1. **No functional-form assumption**: the only distributional assumption is in the CI test choice (e.g., Fisher $z$-test for Gaussian data, or non-parametric tests for arbitrary distributions).
2. **Transparency**: each edge inclusion/exclusion is justified by a specific CI test that can be reported and scrutinized.

The main limitation is **sample complexity**: CI tests at high conditioning-set orders are statistically
noisy, and the number of tests grows exponentially in the maximum degree of the graph.

## Main Content

### Core Assumptions

> [!definition] Definition: Causal Sufficiency
> A set of observed variables $\mathbf{V}$ is **causally sufficient** with respect to the true DAG
> $G^*$ if there are no latent common causes (hidden confounders) of any pair of variables in
> $\mathbf{V}$. All standard versions of the PC algorithm assume causal sufficiency.
>
> **When it fails**: if there are hidden confounders $U$ with $X \leftarrow U \rightarrow Y$, the
> algorithm may spuriously orient or include edges. FCI (Fast Causal Inference) is the extension
> to the non-causally-sufficient case.
^def-causal-sufficiency

The three key assumptions for identifiability in the constraint-based framework are:
1. **Markov condition**: $P$ factorizes according to $G^*$ (see [[Markov Equivalence Classes and CPDAGs]]).
2. **Faithfulness**: all CI relations in $P$ arise from d-separation in $G^*$ (no accidental cancellations).
3. **Causal sufficiency**: no hidden common causes.

### From CI Tests to the Skeleton

The key insight is that **d-separation implies conditional independence** (by the Markov condition)
and, under faithfulness, the converse holds too:
$$X \perp\!\!\!\perp Y \mid S \text{ in } P \iff X \perp_d Y \mid S \text{ in } G^*.$$

This means: if we find a set $S$ such that $X \perp\!\!\!\perp Y \mid S$, we know there is no edge
between $X$ and $Y$ in $G^*$. If no such set exists, there **is** an edge. The procedure is:

> [!definition] Definition: Skeleton Learning via CI Tests
> **Skeleton** = the undirected graph $H$ with an edge $X - Y$ iff $X$ and $Y$ are **not**
> conditionally independent given any subset $S \subseteq \mathbf{V} \setminus \{X, Y\}$.
>
> Equivalently, $X$ and $Y$ have no edge iff there exists a **separating set**
> $\mathrm{Sepset}(X, Y) = S$ such that $X \perp\!\!\!\perp Y \mid S$.
>
> The PC algorithm's skeleton phase tests sets $S$ of increasing size $|S| = 0, 1, 2, \ldots$
> until either independence is found (no edge) or the maximum conditioning set size is reached
> (edge retained). This is the **order-independent** PC algorithm of Colombo & Maathuis (2014)
> in its stable variant.
^def-skeleton

### From Skeleton to CPDAG

Once the skeleton is known, orientation proceeds in two steps:

**Step 1 — V-structure orientation:**
For each unshielded triple $X - Z - Y$ (where $X \not\!\!-\!\! Y$):
- If $Z \notin \mathrm{Sepset}(X, Y)$: orient as v-structure $X \to Z \leftarrow Y$
  *(because $Z$ is a collider: conditioning on $Z$ creates dependence)*
- If $Z \in \mathrm{Sepset}(X, Y)$: do not orient (Z is a non-collider on this path)

**Step 2 — Meek rule propagation:**
Apply Meek's four orientation rules R1–R4 (see [[Markov Equivalence Classes and CPDAGs]]) to orient
all additional compelled edges, yielding the CPDAG.

### Conditional Independence Tests

The choice of CI test determines what distributional assumptions are made:

| Data type | Standard CI test | Notes |
|-----------|-----------------|-------|
| Gaussian / linear | **Fisher $z$-test** on partial correlations | $\rho_{XY \mid S}$; under $H_0$: independence, $\sqrt{n - |S| - 3}\, \mathrm{arctanh}(\hat\rho_{XY\mid S}) \sim \mathcal{N}(0,1)$ |
| Non-Gaussian / nonlinear | **HSIC** (Hilbert-Schmidt Independence Criterion) | Kernel-based; nonparametric |
| Discrete / categorical | **G-test** or **$\chi^2$ test** in CPT | Contingency table CI tests |
| General | **KCI** (Kernel CI), **CMI** estimation | High-dimensional conditioning sets |

The Fisher $z$-test is the classical choice and powers Kalisch & Bühlmann (2007)'s high-dimensional
consistency results. The level $\alpha$ of the CI test acts as a regularization parameter: larger
$\alpha$ produces sparser skeletons.

### Computational Complexity

The worst-case number of CI tests for $d$ variables and maximum degree $k$ is:
$$O\!\left( d^2 \cdot \binom{d-2}{k} \right).$$
This is **exponential in $k$** (the maximum neighborhood size). For sparse graphs with bounded degree
$k \ll d$, the algorithm is computationally feasible even for $d \gg n$. For dense graphs, constraint-based
methods become impractical — score-based methods (GES, NOTEARS) scale better in that regime.

## Examples

> [!example] Example: Three-Variable Case
> Variables $\{X, Y, Z\}$ with true DAG $X \to Z \leftarrow Y$, $X \not\!\!-\!\! Y$.
>
> 1. **Skeleton phase**: Test $X \perp\!\!\!\perp Y$ (order 0): NOT independent.
>    Test $X \perp\!\!\!\perp Y \mid Z$ (order 1): INDEPENDENT. → No edge $X - Y$; $\mathrm{Sepset}(X,Y) = \{Z\}$.
>    Test $X \perp\!\!\!\perp Z$: NOT independent → edge $X - Z$.
>    Test $Y \perp\!\!\!\perp Z$: NOT independent → edge $Y - Z$.
>    **Skeleton:** $X - Z - Y$.
>
> 2. **V-structure**: Triple $(X, Z, Y)$; $Z \notin \mathrm{Sepset}(X,Y) = \{Z\}$?
>    Wait — $Z \in \{Z\}$, so actually $Z$ IS in Sepset. Let me correct: here $Z \in \mathrm{Sepset}(X,Y)$...
>
>    Actually the classic example: $X \to Z \leftarrow Y$ with $X \perp\!\!\!\perp Y$ unconditionally.
>    Sepset($X$, $Y$) = ∅ (empty set makes $X$ and $Y$ independent, i.e. $Z \notin$ Sepset).
>    Therefore orient as $X \to Z \leftarrow Y$. ✓

## Connections

- **Output is a CPDAG**, not a unique DAG — the identifiability limits of observational data
  under faithfulness; see [[Markov Equivalence Classes and CPDAGs]].
- **Score-based alternative** (GES): directly searches over MECs using a decomposable score;
  see [[GES - Overview]]. Often more accurate in practice when the score is well-specified.
- **Continuous-optimization alternative** (NOTEARS): see [[NOTEARS - Overview]]. Much faster
  for dense graphs; requires linear SEM assumption; outputs a single DAG not a CPDAG.
- **Extension to latent confounders**: FCI (Fast Causal Inference) algorithm handles hidden common
  causes; outputs a **PAG** (Partial Ancestral Graph) instead of a CPDAG.
- **Extension to time series**: PCMCI (Runge et al. 2019) adapts the PC skeleton phase for
  time-lagged dependencies.

## See Also
- [[PC Algorithm]] — the canonical constraint-based algorithm with consistency guarantees
- [[Markov Equivalence Classes and CPDAGs]] — what the algorithm outputs
- [[GES - Overview]] — the score-based alternative
- [[DAG Structure Learning Problem]] — the broader landscape including NOTEARS
- [[Directed Acyclic Graphs]] — d-separation and do-calculus
- [[Causal Discovery/_Index|Causal Discovery Index]]
