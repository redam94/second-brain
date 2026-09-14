---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000) — Causation, Prediction, and Search, 2nd ed. MIT Press"
source_location: "Ch. 3–4 (d-separation, Markov condition, equivalence); Verma & Pearl (1990)"
date_ingested: 2026-09-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "MEC"
  - "Markov equivalence class"
  - "CPDAG"
  - "essential graph"
  - "faithfulness assumption"
  - "causal faithfulness"
  - "causal sufficiency"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they share the same skeleton and the same
> v-structures (Verma & Pearl, 1990). Their shared equivalence class is represented by a
> **Completed Partially Directed Acyclic Graph (CPDAG)**, which has directed edges where all
> class members agree and undirected edges where they disagree. Under the **faithfulness
> assumption**, purely observational data can at best identify this equivalence class — not a
> unique DAG. Both [[PC Algorithm]] and [[GES - Greedy Equivalence Search]] output a CPDAG as
> their estimate of the true class.

## Overview

A fundamental identifiability barrier limits what observational data can reveal about causal
structure: many different DAGs produce *identical* conditional independence (CI) patterns.
**Markov equivalence** formalises exactly when two DAGs are observationally indistinguishable,
and the **CPDAG** (also called the *essential graph*) is the canonical representative of an
equivalence class.

This concept underlies both families of causal structure learning algorithms:
- **Constraint-based** methods (e.g. [[PC Algorithm]]) test CIs to identify the skeleton and
  v-structures, and return a CPDAG.
- **Score-based** methods (e.g. [[GES - Greedy Equivalence Search]]) search the space of CPDAGs
  directly, with each search state representing an equivalence class.

## Main Content

### The Causal Markov Condition

> [!definition] Definition: Causal Markov Condition (CMC)
> A DAG $\mathsf{G} = (\mathsf{V}, \mathsf{E})$ satisfies the **Causal Markov Condition** for
> distribution $\mathbb{P}$ if every node $X_i$ is conditionally independent of all its
> non-descendants given its parents:
> $$X_i \perp\!\!\!\perp X_j \mid \mathrm{pa}(X_i) \quad \text{for all } X_j \notin \mathrm{de}(X_i) \cup \{X_i\}.$$
> Equivalently, the joint distribution **factors** as
> $$\mathbb{P}(X_1,\dots,X_d) = \prod_{i=1}^d \mathbb{P}(X_i \mid \mathrm{pa}(X_i)).$$
^def-markov

The CMC connects graph structure to probabilistic independence via **d-separation** (see
[[Directed Acyclic Graphs]]): every d-separation in $\mathsf{G}$ implies a CI in $\mathbb{P}$.
The factorisation statement is equivalent to this.

### Markov Equivalence

> [!definition] Definition: Markov Equivalence
> Two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ on the same node set are **Markov equivalent**,
> written $\mathsf{G}_1 \sim \mathsf{G}_2$, if they entail *exactly* the same set of
> conditional independencies under the CMC — i.e., a set $\mathbf{Z}$ d-separates $X$ from $Y$
> in $\mathsf{G}_1$ if and only if it does so in $\mathsf{G}_2$.
^def-markov-equiv

> [!theorem] Theorem: Graphical Characterisation of Markov Equivalence (Verma & Pearl, 1990)
> Two DAGs $\mathsf{G}_1$ and $\mathsf{G}_2$ are Markov equivalent **if and only if** they have:
> 1. **Identical skeletons** (same undirected edges when directions are removed), and
> 2. **Identical v-structures** — unshielded colliders of the form
>    $X_i \to X_k \leftarrow X_j$ with $X_i \not\sim X_j$ (no edge between $X_i$ and $X_j$).
^thm-markov-equiv

**Significance:** This purely graphical test — skeleton + v-structures — completely determines
Markov equivalence without enumerating all CI implications. It is the basis for the
v-structure identification step in [[PC Algorithm]].

### Faithfulness Assumption

> [!definition] Definition: Faithfulness (Causal Faithfulness)
> A distribution $\mathbb{P}$ is **faithful** to DAG $\mathsf{G}$ if *every* CI in $\mathbb{P}$
> is entailed by d-separation in $\mathsf{G}$:
> $$X_i \perp\!\!\!\perp X_j \mid \mathbf{Z} \text{ in } \mathbb{P}
>   \implies X_i \text{ is d-separated from } X_j \text{ by } \mathbf{Z} \text{ in } \mathsf{G}.$$
> Combined with the CMC, faithfulness gives a two-way equivalence: CIs in $\mathbb{P}$
> correspond exactly to d-separations in $\mathsf{G}$.
^def-faithfulness

**Why faithfulness can fail:** In a linear SEM, faithfulness fails when path coefficients cancel
exactly — e.g. $X \to Z \to Y$ and $X \to Y$ with coefficients $+1$ and $-1$ along the paths.
This is a measure-zero event for generic coefficients, so faithfulness holds almost surely.

**Consequence of faithfulness:** Under faithfulness, CI tests on observational data reveal
exactly the d-separations in the true DAG. This is what makes constraint-based structure
learning asymptotically correct.

### Causal Sufficiency

> [!definition] Definition: Causal Sufficiency
> A set of observed variables is **causally sufficient** if every common cause of two or more
> observed variables is itself observed — i.e., there are no **latent confounders**.
^def-causal-sufficiency

**Relaxation:** The **FCI algorithm** (Fast Causal Inference; Spirtes et al., 2000) and its
variants relax causal sufficiency, returning a **PAG (Partial Ancestral Graph)** that represents
equivalence classes of **MAGs** (Maximal Ancestral Graphs) in the presence of latent variables.

### The CPDAG (Essential Graph)

> [!definition] Definition: CPDAG
> The **CPDAG** of a Markov equivalence class $[\mathsf{G}]$ is the unique PDAG in which:
> - An edge between $X_i$ and $X_j$ is **directed** ($X_i \to X_j$) if it points the same way
>   in **every** member of $[\mathsf{G}]$.
> - An edge is **undirected** ($X_i - X_j$) if it is directed $X_i \to X_j$ in some members
>   and $X_j \to X_i$ in others.
>
> The CPDAG uniquely represents the MEC: every CPDAG corresponds to exactly one MEC, and
> from a CPDAG one can enumerate all DAGs in the MEC by orienting each undirected edge
> consistently without creating new v-structures or cycles.
^def-cpdag

> [!example] Example: 3-node equivalence classes
> **Chain / fork class:** $X \to Y \to Z$, $X \leftarrow Y \to Z$, $X \leftarrow Y \leftarrow Z$ all share
> skeleton $X - Y - Z$ and no v-structures. Their CPDAG is the **undirected chain** $X - Y - Z$.
>
> **Collider (v-structure):** $X \to Y \leftarrow Z$ (with $X \not\sim Z$) has a unique skeleton
> and v-structure; its CPDAG is $X \to Y \leftarrow Z$ (both edges directed, invariant across the class).
>
> The two CPDAGs encode very different causal claims: the chain/fork CPDAG leaves the causal
> flow direction unresolved, while the collider CPDAG identifies $Y$ as a definite common effect.
^ex-cpdag-3node

### Identifiability Limit

Under faithfulness and causal sufficiency, observational data identifies the **CPDAG** but not
a unique DAG. To identify a unique DAG (or further orient CPDAG edges) one needs additional
assumptions such as:
- **Non-Gaussianity** of noise (LiNGAM: Shimizu et al., 2006 — additive noise models are
  identifiable up to a unique DAG, not just an MEC, when noise is non-Gaussian).
- **Equal noise variances** in linear Gaussian SEMs (Peters & Bühlmann, 2014).
- **Interventional data** (hard or soft interventions break Markov equivalence).

## Connections

- **[[PC Algorithm]]**: outputs a CPDAG via CI testing; the v-structure step implements
  [[#^thm-markov-equiv]] directly, and Phase 3 applies Meek rules to complete the CPDAG.
- **[[GES - Greedy Equivalence Search]]**: searches the space of CPDAGs using Insert/Delete
  operators; each search state *is* a CPDAG, and the score is evaluated on the CPDAG's
  corresponding DAG class.
- **[[NOTEARS - Overview]]**: operates on the weighted adjacency matrix $W$ of a linear SEM;
  implicitly assumes linear faithfulness (non-zero $w_{ij}$ for all true edges). The NOTEARS
  output is a DAG (after thresholding), not a CPDAG — it may produce different orientations
  across runs due to its continuous relaxation.
- **[[DAG Structure Learning Problem]]**: the NP-hardness of DAG search and the landscape of
  prior approaches including constraint-based (PC) and score-based (GES) methods.
- **[[Directed Acyclic Graphs]]**: d-separation and the do-calculus — the semantic content that
  CPDAGs represent as a set of possible causal structures.
- **[[Spurious Association and Confounds]]**: the fork / pipe / collider taxonomy that underlies
  v-structure identification and d-separation reasoning.
- **[[BN Construction Methods Comparison]]**: Bayesian network construction methods including
  automated structure learning (PC, GES) vs. expert elicitation.

## See Also
- [[PC Algorithm]] — constraint-based algorithm outputting this CPDAG
- [[GES - Greedy Equivalence Search]] — score-based algorithm searching CPDAG space
- [[DAG Structure Learning Problem]] — score-based problem formulation and prior-method landscape
- [[Directed Acyclic Graphs]] — d-separation, do-calculus, and causal DAG semantics
- [[Spurious Association and Confounds]] — fork / pipe / collider patterns
