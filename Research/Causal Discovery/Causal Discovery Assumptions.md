---
title: "Causal Discovery Assumptions"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/textbook
source: "[[raw/spirtes-glymour-scheines-2000-CPS-book.md]]"
source_location: "Ch. 2–3 (Causal Markov Condition, Faithfulness); Pearl (2000) Ch. 1"
date_ingested: 2026-10-22
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Spurious Association and Confounds]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "Causal Markov Condition"
  - "Faithfulness Assumption"
  - "Causal Sufficiency"
---

# Causal Discovery Assumptions

> [!summary]
> Constraint-based and score-based causal discovery algorithms (PC, GES, NOTEARS) require
> three key assumptions about the data-generating process: the **Causal Markov Condition**
> (the DAG d-separates exactly the CI relations), **Faithfulness** (no CI not entailed by
> d-separation), and **Causal Sufficiency** (no unmeasured confounders). Together these
> assumptions make the distribution "faithful to a DAG," enabling consistent recovery of
> the CPDAG. Faithfulness is the most controversial: it rules out exact cancellation of
> path coefficients, which is a non-generic but practitioner-relevant failure mode.

## Overview

Every causal discovery algorithm has to answer: "given data alone, what aspects of the causal
structure are statistically identifiable?" The Causal Markov Condition and Faithfulness jointly
define the identifiable object (the CPDAG). Causal Sufficiency rules out latent common causes.
Understanding when these assumptions hold — and what to do when they fail — is essential for
responsible use of structure-learning methods.

## Main Content

### Assumption 1: The Causal Markov Condition (CMC)

> [!definition] Definition: Causal Markov Condition (Spirtes et al. 2000, §2.3)
> A DAG $\mathcal{G} = (\mathbf{V}, \mathbf{E})$ and a probability distribution $P$ over
> $\mathbf{V}$ satisfy the **Causal Markov Condition** iff:
> $$\text{For every } X \in \mathbf{V}: \quad X \perp\!\!\!\perp \text{NonDescendants}(X) \mid \text{Parents}(X).$$
> Equivalently, $P$ **factors** according to $\mathcal{G}$:
> $$P(X_1, \dots, X_d) = \prod_{i=1}^d P(X_i \mid \text{Pa}(X_i)).$$
^def-cmc

> [!note] CMC as d-separation
> The CMC is equivalent to requiring that every d-separation in $\mathcal{G}$ corresponds
> to a conditional independence in $P$. This is sometimes called **global Markov** property.
> Local, pairwise, and global Markov conditions coincide for DAG models (Lauritzen 1996).

The CMC is nearly universally assumed and is violated only in very unusual circumstances
(feedback loops, measurement error creating spurious associations). It is the foundational
assumption that justifies reading d-separations off the graph as CI relations.

### Assumption 2: Faithfulness

> [!definition] Definition: Faithfulness (Spirtes et al. 2000, §3.4)
> A distribution $P$ and a DAG $\mathcal{G}$ are **faithful** to each other iff:
> $$X \perp\!\!\!\perp Y \mid Z \text{ in } P \quad \Longrightarrow \quad X \text{ d-sep } Y \mid Z \text{ in } \mathcal{G}.$$
> That is, every CI in $P$ is *also* a d-separation in $\mathcal{G}$ — there are no
> "spurious" independencies created by exact coefficient cancellations across paths.
^def-faithfulness

> [!note] When faithfulness fails
> Faithfulness is violated when structural equation coefficients cancel exactly. Example:
> $X \to Z \to Y$ with edge weight $+1$ and $X \to Y$ with edge weight $-1$ could cancel
> to make $X \perp\!\!\!\perp Y$ even though $X$ directly causes $Y$. Such exact cancellations
> are non-generic (measure zero in continuous parameter spaces) but can occur in practice
> due to equilibrium constraints or researcher-imposed restrictions.
>
> **Adjacency faithfulness** (Ramsey et al. 2006): the weaker assumption that only directly
> connected variables are non-adjacent in the true CI model — allows for cancellations among
> indirect paths, as long as adjacent pairs are always dependent. PC is consistent under
> adjacency faithfulness alone for skeleton recovery.

> [!note] Faithfulness vs. Markov
> Markov: graph → distribution (the DAG implies these CI relations).
> Faithfulness: distribution → graph (every CI in the data is entailed by the graph).
> Together, they imply that the CI model of the distribution *equals* the d-separation
> model of the DAG — the distribution is "perfect" for the DAG.

### Assumption 3: Causal Sufficiency

> [!definition] Definition: Causal Sufficiency (Spirtes et al. 2000, §3.5)
> A set of variables $\mathbf{V}$ is **causally sufficient** for a population $\mathbf{U}$
> iff every common cause of any two variables in $\mathbf{V}$ is itself in $\mathbf{V}$.
> In other words: there are **no unmeasured confounders** (latent common causes).
^def-causal-suff

> [!note] When causal sufficiency fails
> Most real datasets violate causal sufficiency to some degree. When it fails:
> - PC and GES may output spurious adjacencies (variables with a hidden common cause appear
>   "adjacent" since they are d-connected given any subset of observed variables).
> - Extensions like **FCI** (Fast Causal Inference, Spirtes et al. 2000) and **RFCI**
>   (Richardson & Spirtes 2002; Colombo et al. 2012) relax causal sufficiency by allowing
>   **Partial Ancestral Graphs (PAGs)** — output graphs that represent uncertainty about
>   whether edges are due to direct causation or a hidden common cause.
> - In these extensions, edges are annotated with circle endpoints (○) indicating ambiguity.

### Acyclicity

> [!definition] Acyclicity Assumption
> The causal graph $\mathcal{G}$ is a **directed acyclic graph** (DAG): there are no
> directed cycles among the observed variables.
^def-acyclicity

This is the most restrictive structural assumption. Feedback systems (economic equilibria,
biological regulatory networks) violate it. Extensions to cyclic models exist but are much
harder to identify.

### The four assumptions in one statement

Under the Causal Markov Condition, Faithfulness, Causal Sufficiency, and Acyclicity:

> [!theorem] Theorem: Identifiability to CPDAG (Spirtes et al. 2000; Meek 1995)
> If $P$ and $\mathcal{G}$ satisfy CMC + Faithfulness + Causal Sufficiency + Acyclicity,
> then the **Markov equivalence class** (CPDAG) of $\mathcal{G}$ is identifiable from
> an infinite observational sample — i.e., from the population CI model.
>
> Individual DAG orientation (beyond the CPDAG) requires additional assumptions such as:
> - Non-Gaussian noise: allows full DAG identification via LiNGAM (Shimizu et al. 2006)
> - Equal variances in Gaussian SEMs (Peters & Bühlmann 2014)
> - Interventional data
^thm-identifiability

## Connections

- **Contrast with Bayesian identification**: The Bayesian approach to structural equation
  models ([[Confirmatory Factor Analysis and SEM]]) imposes priors and can make posterior
  statements about individual DAGs, but observational identifiability of direction is still
  limited by the Markov equivalence class absent additional structure.
- **Violation of sufficiency in advertising**: [[Activity Bias in Advertising]] documents
  a setting where unobserved user intent is a common cause of both exposure and outcome —
  a failure of causal sufficiency. PC/GES would draw spurious edges in this setting.
- **Selection bias**: [[The Selection Problem]] involves conditioning on a collider (selection),
  which additionally violates the CMC for the observed distribution.
- **Contrast with the do-calculus**: [[Directed Acyclic Graphs]] covers the do-calculus and
  back-door criterion — those tools assume the DAG is *known*. Causal discovery assumptions
  are needed when the DAG must be *learned*.

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the identifiable object under these assumptions
- [[PC Algorithm]] — constraint-based algorithm that exploits CMC + Faithfulness + Sufficiency
- [[GES Algorithm]] — score-based algorithm with the same assumptions
- [[Directed Acyclic Graphs]] — d-separation, back-door, do-calculus
- [[Spurious Association and Confounds]] — colliders, mediators, confounders in the vault
