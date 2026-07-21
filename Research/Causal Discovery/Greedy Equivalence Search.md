---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Discovery-Survey.md]]"
source_location: "Chickering (2002), JMLR 3:507–554, §3–5"
date_ingested: 2026-07-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Constraint vs Score-Based Causal Discovery]]"
aliases:
  - GES
  - greedy equivalence search
  - Chickering 2002
  - FGS
  - forward-backward score search
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002, JMLR) is the foundational
> score-based causal structure learning algorithm. Unlike greedy search over individual
> DAGs (which gets stuck among equivalent structures), GES searches directly over the space
> of **Markov equivalence classes** ([[Markov Equivalence and CPDAGs|CPDAGs]]) using two
> greedy phases: **forward search** (insert edges to increase score) and **backward search**
> (delete edges to increase score). GES is provably **consistent** under Markov, Faithfulness,
> and a locally consistent decomposable score (BIC, BDe, BGe). The key enabling result is
> Chickering's proof of the Meek Conjecture, which establishes that the CPDAG space is
> navigable by local insert/delete operators.

## Overview

Score-based structure learning searches for the DAG (or equivalence class) that maximises
a penalised goodness-of-fit score. The naive approach — hill-climbing over individual DAGs
with edge additions, removals, and reversals — has a well-known flaw: **equivalent DAGs
receive the same score** (since they encode the same CI structure), creating a flat landscape
that wastes computation cycling among equivalent structures and can miss better-scoring classes.

GES sidesteps this by working directly in the **space of CPDAGs** (one representative per
equivalence class) and using **insert/delete operators** that move between classes rather
than between individual DAGs. This is more efficient and theoretically better motivated.

## Main Content

### Decomposable Score Functions

GES requires a **decomposable score** — one that factors over variables and their parents:

> [!definition] Definition: Decomposable Score
> A score $\mathrm{Score}(\mathcal{G})$ is **decomposable** if it factors as:
> $$\mathrm{Score}(\mathcal{G}) = \sum_{j=1}^{d} s(X_j, \mathrm{Pa}_\mathcal{G}(X_j))$$
> where $s(X_j, \mathrm{Pa})$ depends only on $X_j$ and its parents' data.
> Decomposability enables **local updates**: only $s(X_j, \cdot)$ changes when $X_j$'s parents change.
^def-decomposable

> [!definition] Definition: Local Consistency
> A decomposable score is **locally consistent** if, for the true DAG $\mathcal{G}^*$:
>
> 1. If $X_k$ is a true parent of $X_j$: for large $n$, adding $X_k$ to $X_j$'s parents
>    strictly increases the score $s(X_j, \cdot)$ a.s.
> 2. If $X_k$ is not a true parent of $X_j$: for large $n$, adding $X_k$ strictly
>    decreases the score a.s.
>
> Local consistency ensures GES converges to the truth asymptotically.
^def-local-consistent

**Standard score choices:**

| Score | Setting | Formula |
|-------|---------|---------|
| **BIC** | Gaussian linear SEM | $s(X_j, \mathrm{Pa}) = \hat{\ell}(X_j \mid \mathrm{Pa}) - \frac{|\mathrm{Pa}|+1}{2}\log n$ |
| **BGe** | Bayesian Gaussian | Marginal log-likelihood under Normal-Wishart prior |
| **BDe(u)** | Discrete variables | $\log p(\mathbf{X}_j \mid \mathrm{Pa}, \mathbf{u})$ (Dirichlet-Multinomial) |

The BIC score is locally consistent for linear Gaussian SEMs; BDe(u) is locally consistent
for discrete SEMs with Dirichlet priors. Both yield consistent GES under the stated assumptions.

### The Meek Conjecture and Navigability

Before presenting the GES algorithm, the key theoretical result that makes it valid:

> [!theorem] Theorem: Navigability of the CPDAG Space (Chickering 2002, Theorem 15)
> **Meek Conjecture (proved):** Let $\mathcal{G}$ and $\mathcal{H}$ be two DAGs where
> $\mathcal{H}$ is an **I-map** of $\mathcal{G}$ (i.e. $\mathcal{H}$ encodes all the
> CI relations of $\mathcal{G}$, and possibly more). Then there exists a sequence of
> **covered edge reversals** that transforms $\mathcal{G}$ into $\mathcal{H}$ such that
> every intermediate graph is also an I-map of $\mathcal{G}$.
>
> **Combined with insert/delete operators:** The space of Markov equivalence classes
> (CPDAGs) is connected under the GES insert and delete operators. Starting from the
> empty CPDAG, GES can reach any CPDAG by a sequence of score-improving steps.
^thm-meek-conjecture

### GES Local Operators

GES moves between CPDAGs via two types of local operator:

> [!definition] Definition: Insert Operator (Chickering 2002, §3)
> $\mathrm{Insert}(X, Y, H)$ adds a directed edge $X \to Y$ to the current CPDAG and
> reorients a subset $H \subseteq \mathrm{Adj}(Y) \setminus \mathrm{Adj}(X)$ of edges
> incident to $Y$ to maintain valid CPDAG form.
>
> **Score change:**
> $$\delta\mathrm{score}(\mathrm{Insert}(X,Y,H)) = s(Y, \mathrm{Pa}(Y) \cup \{X\} \cup H) - s(Y, \mathrm{Pa}(Y))$$
> *(Only the local score of $Y$ changes; all other terms in the decomposable sum are unchanged.)*
^def-insert-op

> [!definition] Definition: Delete Operator (Chickering 2002, §3)
> $\mathrm{Delete}(X, Y, H)$ removes the edge between $X$ and $Y$ from the current CPDAG
> and reorients a subset $H$ of $Y$'s neighbours to maintain valid CPDAG form.
>
> **Score change:**
> $$\delta\mathrm{score}(\mathrm{Delete}(X,Y,H)) = s(Y, \mathrm{Pa}(Y) \setminus \{X\} \setminus H) - s(Y, \mathrm{Pa}(Y))$$
^def-delete-op

### The GES Algorithm

> [!definition] Definition: GES Algorithm (Chickering 2002, §4)
>
> **Phase 1: Forward Equivalence Search (FES)**
>
> 1. Start with the **empty CPDAG** (no edges; every variable is independent of every other).
> 2. **Repeat:**
>    a. Find the valid $\mathrm{Insert}(X^*, Y^*, H^*)$ operator that maximally increases the score.
>    b. If $\delta\mathrm{score} > 0$: apply it. Else: **stop**.
> 3. Return CPDAG $\mathcal{C}_\mathrm{FES}$.
>
> **Phase 2: Backward Equivalence Search (BES)**
>
> 1. Start from $\mathcal{C}_\mathrm{FES}$.
> 2. **Repeat:**
>    a. Find the valid $\mathrm{Delete}(X^*, Y^*, H^*)$ operator that maximally increases
>       (or least decreases) the score.
>    b. If $\delta\mathrm{score} \geq 0$: apply it. Else: **stop**.
> 3. Return CPDAG $\mathcal{C}_\mathrm{BES}$.
^def-ges-algorithm

**Intuition for two phases:**
- **FES** greedily builds up a dense equivalence class. With a penalised score like BIC,
  FES typically adds all true edges and often some false ones.
- **BES** then removes edges that are not justified by the score penalty (false positives
  from FES). The BES phase acts as a principled pruning step.

Unlike hill-climbing over individual DAGs, GES never wastes steps cycling among equivalent
DAGs — each step genuinely changes the equivalence class (and the score).

### Validity of Insert and Delete Operators

Not every triple $(X, Y, H)$ corresponds to a valid CPDAG-to-CPDAG move. Chickering (2002,
§3) derives **necessary and sufficient conditions** for an insert/delete operator to be valid:

**Insert$(X, Y, H)$ is valid iff:**
1. $X$ and $Y$ are not adjacent in the current CPDAG
2. $H \subseteq \mathrm{Adj}(Y) \setminus \mathrm{Adj}(X)$
3. Every undirected path between $X$ and $Y$ that passes through a node in $\mathrm{Adj}(Y) \setminus H$
   contains a vertex in $H \cup \mathrm{Adj}(X)$

**Delete$(X, Y, H)$ is valid iff:**
1. $X$ and $Y$ are adjacent in the current CPDAG
2. $H \subseteq \mathrm{Adj}(X) \cap \mathrm{Adj}(Y)$
3. $H$ is a clique

These conditions ensure the resulting graph is a valid CPDAG (represents a non-empty
equivalence class of DAGs).

### Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 19)
> Under:
> 1. Causal Markov condition (true distribution $p$ is Markov to $\mathcal{G}^*$)
> 2. Faithfulness ($p$ is faithful to $\mathcal{G}^*$)
> 3. Causal sufficiency (no hidden common causes)
> 4. A locally consistent, decomposable score (e.g. BIC, BGe, BDe)
>
> GES consistently identifies the true CPDAG:
> $$\mathrm{GES}(\text{data}, \mathrm{Score}) \xrightarrow{n \to \infty} \mathrm{CPDAG}(\mathcal{G}^*)$$
>
> **Proof sketch:** By local consistency, for large $n$: FES correctly adds all true edges
> (each increases the score) and no false ones block progress; BES correctly removes all
> false edges (each increases the score when removed). Together they identify the CPDAG.
^thm-ges-consistency

### Finite-Sample Properties and Variants

| Variant | Key change | Reference |
|---------|-----------|-----------|
| **FGES** (Fast GES) | Leverages decomposability for parallelism; scales to thousands of nodes | Ramsey et al. (2017) |
| **GIES** | Extends GES to interventional data; adds an intervention operator | Hauser & Bühlmann (2012) |
| **COR-GES** | Adds a cycle-check to handle near-violations of faithfulness | — |
| **BOSS** | Replaces FES/BES with Best Order Score Search; more accurate in finite samples | Bryan et al. (2023) |

## Examples

> [!example] Example: 4-Variable Chain (same as PC example)
> True DAG: $X_1 \to X_2 \to X_3 \to X_4$ (linear Gaussian, BIC score).
>
> **FES phase:** Starting from empty graph, GES computes $\delta\mathrm{score}$ for all
> possible inserts. The three true edges are each inserted (each gives a positive BIC
> improvement). After no more positive-score inserts are possible, FES terminates with
> CPDAG: $X_1 - X_2 - X_3 - X_4$ (all undirected, since the chain is reversible).
>
> **BES phase:** All delete operators reduce the score (the edges are needed). BES terminates
> with no changes.
>
> **Output CPDAG:** $X_1 - X_2 - X_3 - X_4$ — correct (same as PC's output).

> [!example] Example: Collider (V-structure)
> True DAG: $X_1 \to X_2 \leftarrow X_3$ with $X_1 \not\sim X_3$ (linear Gaussian).
>
> **FES phase:** GES inserts $X_1 \to X_2$ (score improves: $X_1$ explains $X_2$'s
> variance). Then inserts $X_2 \leftarrow X_3$ (score improves further). The CPDAG after
> FES has directed edges $X_1 \to X_2 \leftarrow X_3$ — the v-structure is embedded in
> the Insert operator's reorientation step (since $X_1 \not\sim X_3$ means $H = \emptyset$
> and the orientation is forced).
>
> **BES phase:** No deletes increase the score. Done.
>
> **Output CPDAG:** $X_1 \to X_2 \leftarrow X_3$ — correct.

## Connections

- **Versus PC**: [[PC Algorithm]] uses CI tests, while GES uses a global score. PC is
  more transparent (each edge removal is attributed to a specific CI test), but sensitive
  to CI test errors in finite samples. GES tends to be more efficient statistically when
  the score model is correctly specified.
- **Versus NOTEARS**: [[NOTEARS - Overview]] solves a continuous optimization problem and
  returns a single DAG without representing the equivalence class. It requires linearity;
  GES works for any decomposable score. Both appear as baselines in each other's papers —
  see [[NOTEARS Experiments]].
- **Score = penalised likelihood**: the BIC score penalises model complexity exactly as
  [[Overfitting and Information Criteria]] discusses. GES can be seen as information-criterion-
  based model selection extended to the causal structure space.
- **Grounding in equivalence theory**: GES's correctness rests on [[Markov Equivalence and CPDAGs]] —
  specifically, the fact that covered edge reversals connect all members of an equivalence class.

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG target of GES; the Meek Conjecture it proves
- [[PC Algorithm]] — the constraint-based alternative
- [[DAG Structure Learning Problem]] — formal setup; the landscape of prior approaches table
- [[NOTEARS - Overview]] — continuous optimization alternative; benchmarks include GES
- [[Constraint vs Score-Based Causal Discovery]] — systematic comparison of all paradigms
- [[Overfitting and Information Criteria]] — BIC and decomposable scores
