---
title: "Causal Discovery - Landscape"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/overview
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-source.md]]"
source_location: "Synthesis note — covers PC (Spirtes & Glymour 1991; Kalisch & Bühlmann 2007) and GES (Chickering 2002)"
date_ingested: 2026-11-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "Structure learning landscape"
  - "Causal discovery methods overview"
---

# Causal Discovery — Landscape

> [!summary]
> Three main paradigms exist for learning causal DAGs from observational data:
> **constraint-based** (PC algorithm — uses conditional independence tests),
> **score-based search** (GES — greedy search in equivalence class space), and
> **continuous optimization** (NOTEARS — optimizes a smooth objective over real matrices).
> All three return different representations: PC and GES return a **CPDAG** (Markov equivalence
> class), while NOTEARS returns a single DAG. Choosing between them depends on data type,
> dimensionality, and whether identifiability of a unique DAG is required.

## Overview

The [[DAG Structure Learning Problem]] asks: given $n$ i.i.d. observations of
$(X_1, \ldots, X_d)$, recover the directed acyclic graph $\mathcal{G}^*$ that generated the data.
This problem is **NP-hard in general** (Chickering 1996), because the space of DAGs is
superexponential in $d$. Three major paradigms have emerged to make it tractable.

## The three paradigms

### 1. Constraint-based: PC algorithm

The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) recovers the
Markov equivalence class of the true DAG by conducting a sequence of **conditional independence
(CI) tests**. It operates entirely at the level of the distribution, without specifying a score
function or likelihood. See [[PC Algorithm]] for the full algorithm.

**Core assumption:** *Faithfulness* — every conditional independence in the distribution is
implied by d-separation in the true DAG (no accidental cancellations).

**Returns:** A **CPDAG** representing the Markov equivalence class. Some edges are oriented
(v-structures + Meek propagation), some remain undirected (equivalence class ambiguity).

**Complexity:** $O(d^q)$ CI tests in the worst case, where $q$ is the maximum degree.
With sparse graphs, this is polynomial in $d$.

### 2. Score-based search: GES

**GES** (Greedy Equivalence Search; Chickering 2002) uses a **decomposable score** (BIC, BDeu)
to search directly in the space of Markov equivalence classes (CPDAGs). It runs two greedy
phases — Forward (insert edges) and Backward (delete edges) — to find a local score maximum.
See [[GES - Greedy Equivalence Search]] for the full algorithm.

**Core assumption:** Faithfulness + score consistency (the score ranks the true equivalence class
highest asymptotically).

**Returns:** A **CPDAG** — same representation as PC, different estimation approach.

**Complexity:** Quadratic number of candidate insertions/deletions per step; each score evaluation
is $O(n)$. Scales to thousands of variables with the Fast GES (FGES) variant.

### 3. Continuous optimization: NOTEARS

**NOTEARS** (Zheng et al. 2018) recasts structure learning as **continuous optimization** over
$\mathbb{R}^{d \times d}$, replacing the discrete acyclicity constraint
$\mathcal{G}(W) \in \mathbb{D}$ with a smooth equality constraint
$h(W) = \mathrm{tr}(e^{W \circ W}) - d = 0$.
See [[NOTEARS - Overview]], [[Smooth Characterization of Acyclicity]], and [[NOTEARS Algorithm]].

**Core assumption:** Linear SEM; Gaussian or non-Gaussian noise.

**Returns:** A single **DAG** (weighted adjacency matrix $W$), not just an equivalence class.

**Complexity:** $O(d^3)$ per iteration (matrix exponential). Each augmented Lagrangian outer
iteration runs L-BFGS to convergence.

## Comparison table

| Property | PC | GES | NOTEARS |
|----------|----|----|---------|
| Paradigm | Constraint-based | Score-based search | Continuous optimization |
| Input | Distribution (CI tests) | Data + score function | Data + loss function |
| Search space | Skeleton / v-structures | CPDAG equivalence classes | $\mathbb{R}^{d\times d}$ |
| Output | CPDAG (equiv. class) | CPDAG (equiv. class) | Single DAG |
| Key assumption | Faithfulness | Faithfulness + score | Linear SEM |
| Asymptotically correct? | Yes (under faithfulness) | Yes (under faithfulness) | Stationary point, not global optimum |
| High-dimensional? | Yes (Kalisch & Bühlmann 2007) | Via FGES | Yes ($O(d^3)$, but linear SEM) |
| Main software | `pcalg` (R), `causal-learn` | `pcalg`, TETRAD, `causal-learn` | `notears` (Python) |

## Which to use?

- **PC** is preferred when: (1) you want model-free CI tests (kernel-based, for non-linear
  relationships), (2) sparsity is expected and you can bound the max degree, (3) you want a
  non-parametric justification.
- **GES** is preferred when: (1) you have a well-specified score (BIC for Gaussian, BDeu for
  discrete), (2) you want score-based model comparison, (3) the forward/backward structure gives
  useful anytime behavior.
- **NOTEARS** is preferred when: (1) a linear SEM is appropriate, (2) you want a *unique* DAG
  rather than an equivalence class, (3) you want to leverage continuous optimization machinery
  (automatic differentiation, GPU acceleration in extensions).

## Faithfulness and identifiability

All three methods require some form of **identifiability**. Without additional assumptions, the
**Markov equivalence class** is the most that can be identified from observational data —
PC and GES explicitly target this. NOTEARS implicitly restricts to a parametric class (linear
SEM) that can be further identified under non-Gaussianity (cf. LiNGAM).

## Connections to the rest of the vault

- The PC algorithm's notion of d-separation and CI structure is explained in [[Directed Acyclic Graphs]]
  (the back-door criterion, d-separation semantics)
- GES's decomposable score is related to the Bayesian score in [[Directed Acyclic Graphs]] and the
  full BN machinery in [[LLM Expert Elicitation for Bayesian Networks]]
- NOTEARS is fully covered in [[NOTEARS - Overview]] through [[NOTEARS Experiments]]
- Structure learning is a precursor to the DAG summarization work in [[Summary Causal DAGs]]

## See Also
- [[PC Algorithm]] — constraint-based algorithm, full detail
- [[GES - Greedy Equivalence Search]] — score-based search, full detail
- [[CPDAG and Markov Equivalence Classes]] — what both PC and GES return
- [[NOTEARS - Overview]] — continuous-optimization approach
- [[DAG Structure Learning Problem]] — problem formulation and NP-hardness
