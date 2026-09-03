---
title: "Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering02b-GES-reference.md]]"
source_location: "Full paper; key results in §3 (Insert/Delete operators) and §4 (Correctness proof)"
date_ingested: 2026-09-03
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Discovery Methods Comparison]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search algorithm"
  - "Chickering 2002"
  - "FGS"
  - "FGES"
---

# Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering, 2002) is the canonical **score-based causal
> discovery** algorithm. Unlike [[PC Algorithm|PC]] (which tests conditional independence
> constraints), GES directly optimizes a **score function** (typically BIC) by greedily
> searching over the space of [[Markov Equivalence and CPDAGs|CPDAGs]]. Two phases:
> (1) **Forward**: insert edges while score improves; (2) **Backward**: delete edges while score
> improves. Chickering (2002) proves GES is **asymptotically consistent** — it recovers the
> true CPDAG in the large-sample limit under faithfulness — answering the "Meek conjecture."
> **FGES** (Fast GES; Ramsey et al., 2017) scales GES to millions of variables using parallel
> operations on the skeleton.

## Overview

GES operates in a space that PC never explicitly enters: the **space of Markov equivalence
classes** (represented as CPDAGs). Instead of testing CI constraints to rule out edges, GES
searches by **scoring** candidate CPDAGs. The BIC score is *consistent* — it asymptotically
prefers the true model — and the two-phase greedy search over equivalence-class space is
provably optimal.

The key algorithmic insight is that **moving between CPDAGs** (by inserting or deleting single
edges) can be scored *locally* using only a node's parents and Markov blanket, without
recomputing the entire joint score. This makes each GES operator $O(d)$ to score, keeping
the forward and backward phases efficient.

## Main Content

### Scoring function

> [!definition] Definition: BIC Score for DAG Learning
> For a DAG $G$ with parameters $\hat{\Theta}$ fit by maximum likelihood from $n$ observations
> of $d$ variables:
> $$\mathrm{BIC}(G) = \log \mathcal{L}(\hat{\Theta} \mid \mathbf{X}, G) - \frac{\log n}{2} |\Theta_G|,$$
> where $|\Theta_G|$ is the number of free parameters in $G$. For **Gaussian linear SEMs**,
> $\mathrm{BIC}$ decomposes as a sum over nodes:
> $$\mathrm{BIC}(G) = \sum_{i=1}^{d} \mathrm{BIC}_i(X_i \mid \mathrm{Pa}_G(X_i)),$$
> with each local term $\mathrm{BIC}_i = n\log\hat\sigma_i^2 - |\mathrm{Pa}(X_i)|\log n$
> (residual variance of regressing $X_i$ on its parents, penalized for parent count).
>
> The decomposability of BIC into local terms is what enables efficient GES operator scoring:
> inserting edge $X \to Y$ only affects the local score of $Y$.
^def-bic-score

> [!note] Why BIC is used
> BIC is a **consistent model-selection criterion**: as $n\to\infty$, it selects the
> true model with probability $\to 1$ under the model class. For structure learning,
> BIC with a Gaussian likelihood consistently identifies the true CPDAG under faithfulness
> (Chickering 2002, Th. 15). In finite samples, BIC may be too permissive (dense graphs);
> practitioners sometimes use a BIC multiplier $\kappa \cdot \log n$ with $\kappa > 1$
> for sparser graphs.

### CPDAG operators

GES moves between CPDAGs using two types of **valid operators**:

> [!definition] Insert Operator $\mathrm{Insert}(X, Y, H)$
> Given the current CPDAG $\mathcal{C}$ and an edge $X - Y$ **not** in $\mathcal{C}$,
> and a subset $H \subseteq \mathrm{Adj}(Y, \mathcal{C}) \setminus \{X\}$:
>
> 1. Insert the directed edge $X \to Y$ into $\mathcal{C}$.
> 2. For each $H_k \in H$: orient the previously undirected edge $H_k - Y$ as $H_k \to Y$.
> 3. Apply Meek orientation rules to restore CPDAG validity.
>
> The subset $H$ must be chosen so that the resulting graph is a valid CPDAG.
> The **score change** from inserting $(X, Y, H)$ is:
> $$\Delta\mathrm{Insert}(X,Y,H) = \mathrm{BIC}_Y\!\left(X \cup \mathrm{Pa}_{\mathcal{C}}(Y) \cup H\right) - \mathrm{BIC}_Y\!\left(\mathrm{Pa}_{\mathcal{C}}(Y)\right),$$
> i.e., the gain in local score of $Y$ from adding $X$ (and newly compelled parents $H$) to
> $Y$'s parent set.
^def-insert-op

> [!definition] Delete Operator $\mathrm{Delete}(X, Y, H)$
> Given an edge $X \to Y$ or $X - Y$ in the current CPDAG $\mathcal{C}$, and a subset
> $H \subseteq \mathrm{Adj}(Y, \mathcal{C}) \setminus \{X\}$:
>
> 1. Delete the edge between $X$ and $Y$ from $\mathcal{C}$.
> 2. For each $H_k \in H$: orient the edge $H_k - Y$ if undirected (reversing its role).
> 3. Apply Meek rules.
>
> The **score change** from deleting $(X, Y, H)$ is:
> $$\Delta\mathrm{Delete}(X,Y,H) = \mathrm{BIC}_Y\!\left(\mathrm{Pa}_{\mathcal{C}}(Y) \setminus \{X\} \cup H\right) - \mathrm{BIC}_Y\!\left(\mathrm{Pa}_{\mathcal{C}}(Y) \cup H\right),$$
> i.e., the gain in local score from removing $X$ from $Y$'s parent set.
^def-delete-op

### The GES algorithm

> [!example] GES Algorithm (Chickering, 2002)
>
> **Input:** Data $\mathbf{X}\in\mathbb{R}^{n\times d}$, scoring function (e.g. BIC).
>
> **Output:** Estimated CPDAG $\hat{\mathcal{C}}$.
>
> ---
>
> **Phase 1 — Forward (Insert) Phase**:
>
> 1. Initialize $\mathcal{C}$ = **empty graph** (no edges).
> 2. **Repeat** until no Insert operator improves the score:
>    a. Evaluate $\Delta\mathrm{Insert}(X, Y, H)$ for all valid $(X, Y, H)$ triples.
>    b. Find the triple $(X^\star, Y^\star, H^\star) = \arg\max \Delta\mathrm{Insert}$.
>    c. If $\Delta\mathrm{Insert}(X^\star, Y^\star, H^\star) > 0$:
>       Apply $\mathrm{Insert}(X^\star, Y^\star, H^\star)$ to $\mathcal{C}$.
>    d. Else: **stop** Phase 1.
>
> *Result after Phase 1*: a dense CPDAG that likely has some spurious edges.
>
> ---
>
> **Phase 2 — Backward (Delete) Phase**:
>
> 3. **Repeat** until no Delete operator improves the score:
>    a. Evaluate $\Delta\mathrm{Delete}(X, Y, H)$ for all valid $(X, Y, H)$ triples.
>    b. Find the triple $(X^\star, Y^\star, H^\star) = \arg\max \Delta\mathrm{Delete}$.
>    c. If $\Delta\mathrm{Delete}(X^\star, Y^\star, H^\star) > 0$:
>       Apply $\mathrm{Delete}(X^\star, Y^\star, H^\star)$ to $\mathcal{C}$.
>    d. Else: **stop** Phase 2.
>
> **Return** the final CPDAG $\hat{\mathcal{C}}$.
^algo-ges

> [!note] Why start from the empty graph?
> Starting from the empty graph ensures Phase 1 only adds edges that are supported by the
> data. An alternative (not part of standard GES) would start from a fully connected graph
> and use only the Delete phase, but this is computationally more expensive.

### Correctness theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 15 — proof of the Meek Conjecture)
> Under the following conditions:
> 1. **Faithfulness**: the distribution $\mathbb{P}$ is faithful to the true DAG $G^\star$.
> 2. **Causal Sufficiency**: no hidden common causes.
> 3. **Consistent scoring**: the score function satisfies a local score equivalence property
>    and is consistent (e.g. BIC with Gaussian likelihood).
>
> GES returns the CPDAG $\mathcal{C}^\star$ of the true DAG $G^\star$ with probability $\to 1$
> as $n\to\infty$.
>
> **Proof sketch**: Phase 1 correctly identifies all edges in the true Markov equivalence
> class by adding exactly those edges that improve the population score. Phase 2 removes
> all spurious edges added in Phase 1 (overshoots are removed by the Delete operators).
> The key lemma is that at every point in the greedy search, the current CPDAG is in the
> same (or a "simpler") equivalence class than the true DAG — so GES never "jumps over"
> the correct class. This is the content of Meek's conjecture, which Chickering proves.
^thm-ges-consistency

### FGES: scaling GES to high dimensions

> [!note] FGES (Fast GES; Ramsey et al., 2017)
> FGES (also called FGS or Fast Greedy Equivalence Search) extends GES to large $d$ via:
>
> 1. **Parallelism**: score Insert/Delete operators in parallel across multiple cores.
> 2. **Adjacency pruning**: maintain a sparse working graph (using PC-style skeleton first).
> 3. **Caching**: cache local BIC scores to avoid recomputation.
>
> FGES scales to $d \sim 10^6$ variables in genomics settings. It is implemented in the
> TETRAD software suite and is the default implementation in `causal-learn`.
>
> NOTEARS ([[NOTEARS Experiments]]) compares against FGS (the name used in the 2018 paper);
> NOTEARS outperforms FGS on dense ER graphs and matches it on sparse ones.

## Connections

- **PC algorithm** (→ [[PC Algorithm]]): the constraint-based counterpart. PC tests CI constraints;
  GES optimizes a score. PC has no distributional assumption (only a CI test); GES needs a
  likelihood (BIC requires a distributional family for the score). Both output CPDAGs.
- **NOTEARS** (→ [[NOTEARS - Overview]]): continuous optimization; does not search over equivalence
  classes. NOTEARS can learn edge weights, not just structure; GES only identifies adjacency and
  orientation up to the MEC.
- **Score-function connection to BDe(u)/BGe priors**: with BDe(u) (Dirichlet-equivalent uniform)
  or BGe (Bayesian Gaussian equivalent) scores, GES is a Bayesian structure-learning algorithm.
  These scores have the same asymptotic behavior as BIC under regularity conditions.
- **MMHC (Max-Min Hill-Climbing)**: a hybrid method that uses constraint-based skeleton
  discovery (like PC Phase 1) followed by score-based orientation (like GES Phase 1–2).
  Often outperforms pure GES or PC in finite-sample settings.

## See Also
- [[Markov Equivalence and CPDAGs]] — the CPDAG space GES operates over
- [[DAG Structure Learning Problem]] — the combinatorial program (Program 4) GES solves approximately
- [[PC Algorithm]] — constraint-based counterpart
- [[NOTEARS - Overview]] — continuous-optimization alternative
- [[NOTEARS Experiments]] — empirical comparison of NOTEARS vs. FGS
- [[Causal Discovery Methods Comparison]] — when to use GES vs. PC vs. NOTEARS
