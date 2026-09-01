---
title: "PC Algorithm - Overview"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/pc-ges-causal-discovery-sources.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Chs. 5–6; Kalisch & Bühlmann (2007)"
date_ingested: 2026-09-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm - Skeleton and Independence Tests]]"
  - "[[PC Algorithm - Orientation and CPDAGs]]"
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - "PC algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes Glymour Scheines"
  - "constraint-based causal discovery"
---

# PC Algorithm - Overview

> [!summary]
> The **PC algorithm** (Peter Spirtes and Clark Glymour, 1991/1993) is the canonical
> **constraint-based** approach to learning a DAG's Markov equivalence class from data.
> Unlike score-based methods (GES, NOTEARS) that optimize a criterion over graph space,
> PC conducts **conditional independence tests** (CI tests) to prune edges from a complete
> graph and then orients the remaining skeleton into a **CPDAG** (Completed Partially
> Directed Acyclic Graph). It is consistent under faithfulness and causal sufficiency,
> and is one of the two main baselines against which NOTEARS is benchmarked.

## Overview

Causal structure learning from observational data has two classical paradigms:
**constraint-based** methods and **score-based** methods. The PC algorithm is the
founding exemplar of the constraint-based approach (the other paradigm is exemplified
by [[GES Algorithm - Overview]]).

The key idea is that the **causal Markov condition** encodes conditional independences
into the DAG's skeleton and v-structure pattern. Under the **faithfulness assumption**
(every CI in the distribution corresponds to a d-separation in the true DAG), the
pattern of conditional independences uniquely determines the **Markov equivalence class**
of the true DAG. PC recovers this class by testing conditional independences.

### Historical context

The algorithm is named after its inventors **P**eter Spirtes and **C**lark Glymour.
It was published in Spirtes, Glymour & Scheines (SGS), *Causation, Prediction, and
Search* (1993; 2nd ed. 2000, MIT Press), which is the foundational text for algorithmic
causal inference alongside Pearl's *Causation* (2000). The book presents both the PC
algorithm and the related **FCI algorithm** (Fast Causal Inference) for settings with
latent confounders (relaxing causal sufficiency).

## Main Content

### Three core assumptions

> [!definition] Assumptions for PC Consistency (SGS, §5)
> 1. **Causal Markov Condition**: Every variable $X_i$ is conditionally independent of
>    its non-descendants given its parents: $X_i \perp\!\!\!\perp \text{NonDesc}(X_i) \mid \text{Pa}(X_i)$.
>    Equivalently, the distribution $\mathbb{P}$ is Markov with respect to the true DAG $G^*$.
>
> 2. **Faithfulness**: Every conditional independence in $\mathbb{P}$ is entailed by a
>    **d-separation** in $G^*$. No "accidental" CI from canceling path coefficients.
>    Without faithfulness, the CI pattern underdetermines the graph.
>
> 3. **Causal Sufficiency**: There are no hidden common causes (no latent confounders).
>    All common causes of measured variables are themselves measured.
>    (FCI relaxes this assumption.)
^def-assumptions

### Two phases of the PC algorithm

The algorithm proceeds in two phases:

**Phase 1 — Skeleton recovery** (see [[PC Algorithm - Skeleton and Independence Tests]])
- Start with a complete undirected graph $K_d$ on $d$ nodes.
- For each pair $(X_i, X_j)$ and for conditioning sets $S$ of increasing size
  $|S| = 0, 1, 2, \ldots$: test $X_i \perp\!\!\!\perp X_j \mid S$ where $S \subseteq \text{Adj}(X_i) \setminus \{X_j\}$.
- Remove edge $(X_i, X_j)$ if a separating set $\text{Sep}(i,j)$ is found; store it.
- Output: undirected skeleton $\hat{H}$, separating sets $\widehat{\text{Sep}}$.

**Phase 2 — Orientation** (see [[PC Algorithm - Orientation and CPDAGs]])
- Orient **v-structures** (unshielded colliders): for each unshielded triple
  $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are non-adjacent), orient
  $X_i \to X_k \leftarrow X_j$ if $X_k \notin \widehat{\text{Sep}}(i,j)$.
- Apply **Meek's orientation rules R1–R4** to complete the CPDAG.
- Output: CPDAG $\hat{C}$.

### What the PC algorithm returns

> [!definition] CPDAG (Completed Partially Directed Acyclic Graph)
> A CPDAG represents an entire **Markov equivalence class** of DAGs:
> - **Directed edges** in the CPDAG have the same orientation in every DAG in the class.
> - **Undirected edges** can be oriented in either direction without changing the set of
>   conditional independences.
>
> The Markov equivalence class is fully characterized by the **skeleton + v-structures**
> (Verma & Pearl, 1990): two DAGs are Markov equivalent iff they share both.
^def-cpdag

### Why PC cannot fully identify the DAG

Under purely observational data and the faithfulness assumption alone, **the best one
can identify is the Markov equivalence class** — the CPDAG. Undirected edges in the CPDAG
correspond to non-identifiable edge directions; interventional data or additional
assumptions (e.g. non-Gaussianity in LiNGAM, additive noise in ANM) are needed to
orient them further.

### Computational complexity

The key insight that makes PC tractable is the **recursive adjacency conditioning**:
instead of conditioning on all $2^{d-2}$ subsets, PC only conditions on subsets of
the *current adjacency set*, which shrinks as edges are removed. Assuming the true
skeleton has bounded maximum neighborhood size $q$, the number of CI tests is at most
$O(d^2 \cdot \binom{d-2}{q}) = O(d^{q+2})$ — polynomial in $d$ for fixed $q$.

## Connections

- **vs. GES**: GES is a **score-based** method; PC is **constraint-based**. Both output
  CPDAGs. GES is provably optimal for the BIC score; PC is consistent but sensitive to
  CI test errors in finite samples. See [[Constraint vs Score-Based Causal Discovery]].
- **vs. NOTEARS**: NOTEARS is also score-based (continuous optimization of the LS score),
  listed in [[DAG Structure Learning Problem]] as complementary to constraint-based PC.
  The NOTEARS benchmarks use PC as a baseline (Table 1 in the NOTEARS paper).
- **FCI extension**: When causal sufficiency fails (latent confounders), the **FCI algorithm**
  (Fast Causal Inference, also from SGS) replaces the CPDAG with a **PAG** (Partial
  Ancestral Graph) that represents a larger class of models.
- **LiNGAM**: If the SEM errors are non-Gaussian, LiNGAM (Shimizu et al. 2006) can fully
  identify the DAG (not just its equivalence class) from ICA on the residuals.
- **PC-stable**: Colombo & Maathuis (2014) show the original PC skeleton recovery is
  order-dependent. PC-stable fixes this by marking all edges to remove before
  removing any at each adjacency level.

## See Also
- [[PC Algorithm - Skeleton and Independence Tests]] — Phase 1 formal description
- [[PC Algorithm - Orientation and CPDAGs]] — Phase 2: v-structures and Meek's rules
- [[GES Algorithm - Overview]] — the complementary score-based approach
- [[Constraint vs Score-Based Causal Discovery]] — comparison of the two paradigms
- [[DAG Structure Learning Problem]] — the SEM formulation and landscape of prior methods
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
- [[Causal Discovery/_Index|Causal Discovery Index]]
