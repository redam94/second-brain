---
title: Directed Acyclic Graphs for Causal Inference
tags:
  - source/ingested
  - topic/econometrics
  - topic/research-methodology
  - type/concept
  - doc/article
source: "[[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]]"
source_location: "Towards Data Science, Graham Harrison, 2023"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: article
depends_on:
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[Bayesian Propensity Scores and IPW]]"
  - "[[Differences-in-Differences]]"
  - "[[Instrumental Variables]]"
aliases:
  - DAG
  - DAGs
  - directed acyclic graph
  - causal graph
---

# Directed Acyclic Graphs for Causal Inference

> [!summary]
> A Directed Acyclic Graph (DAG) is a visual and mathematical tool for representing causal relationships among variables. DAGs make explicit which variables confound a treatment-outcome relationship, enabling principled identification of causal effects in observational data via backdoor adjustment, stratification, or conditioning — without requiring randomized experiments.

## Overview

Causation cannot be inferred from data alone. A DAG supplements observational data with domain knowledge about causal structure, encoding which variables cause which others. This allows researchers to identify the minimal set of variables to condition on (the **adjustment set**) in order to isolate the causal effect of treatment on outcome.

DAGs are central to the potential outcomes / do-calculus framework developed by Judea Pearl (*The Book of Why*; *Causal Inference in Statistics*) and are the standard language for [[The Selection Problem]] and [[Conditional Independence Assumption]] in applied econometrics and epidemiology.

## Main Content

### Basic Vocabulary

> [!definition] Directed Acyclic Graph (DAG)
> A **DAG** is a graph $G = (V, E)$ where:
> - $V$ is a set of **nodes** (variables)
> - $E$ is a set of **directed edges** (arrows), representing direct causal relationships
> - The graph contains no **cycles** (no variable can be its own cause)
>
> An arrow $X \to Y$ means "$X$ has a direct causal effect on $Y$."

^def-dag

> [!definition] Treatment, Outcome, Confounder
> - **Treatment** (exposure): the variable whose causal effect we want to measure, often denoted $X$ or $D$
> - **Outcome**: the response variable, often denoted $Y$ or $R$
> - **Confounder**: a variable $Z$ that has causal arrows into **both** the treatment and the outcome, inducing spurious association between them (a fork: $X \leftarrow Z \rightarrow Y$)

^def-treatment-confounder

### Paths and Junctions

> [!definition] Path
> A **path** is any sequence of edges connecting two nodes in a DAG, regardless of edge direction. Paths carry information (association) unless they are **blocked**.

Every node in the interior of a path (not the treatment or outcome endpoint) must be a **junction** — a node with one incoming and one outgoing edge. There are exactly three junction patterns:

#### Fork (Common Cause / Confounder)

$$Z \rightarrow X, \quad Z \rightarrow Y \quad \Longrightarrow \quad X \leftarrow Z \rightarrow Y$$

A fork at $Z$ means $Z$ causes both $X$ and $Y$, creating spurious association between $X$ and $Y$.

> [!theorem] Fork Rule
> In a fork $X \leftarrow Z \rightarrow Y$:
> - **Without conditioning** on $Z$: the path is **open** (information flows, $X$ and $Y$ appear correlated)
> - **Conditioning** on $Z$: the path is **blocked** ($X$ and $Y$ become independent given $Z$)

^thm-fork-rule

*Example*: Age ($Z$) causes both shoe size ($X$) and reading ability ($Y$). Within each age group, shoe size and reading ability are uncorrelated — the apparent association disappears when we condition on age (Simpson's Paradox).

#### Chain (Mediator)

$$X \rightarrow Z \rightarrow Y$$

A chain at $Z$ means $Z$ is an **intermediary** (mediator) on the causal path from $X$ to $Y$.

> [!theorem] Chain Rule
> In a chain $X \rightarrow Z \rightarrow Y$:
> - **Without conditioning** on $Z$: the path is **open**
> - **Conditioning** on $Z$: the path is **blocked**

^thm-chain-rule

*Warning*: Conditioning on a mediator blocks the very causal pathway you want to measure. Only condition on mediators deliberately (e.g., mediation analysis).

#### Collider (Common Effect)

$$X \rightarrow Z \leftarrow Y$$

A collider at $Z$ means both $X$ and $Y$ cause $Z$. This is the most counter-intuitive junction.

> [!theorem] Collider Rule
> In a collider $X \rightarrow Z \leftarrow Y$:
> - **Without conditioning** on $Z$: the path is **blocked** (no spurious association)
> - **Conditioning** on $Z$: the path is **opened** (conditioning induces spurious association — "collider bias")

^thm-collider-rule

*Example*: Sporting ability ($S$) and academic ability ($A$) both cause bursary awards ($B$). Among all students they are uncorrelated. But conditioning on bursary recipients (e.g., studying only scholarship students) induces a negative correlation — high sports ability predicts low academic ability, purely as an artifact of selection.

### Junction Summary Table

| Pattern | Structure | Without conditioning | Conditioning on middle node |
|---------|-----------|---------------------|----------------------------|
| Fork | $X \leftarrow Z \rightarrow Y$ | Open (confounder) | Blocked |
| Chain | $X \rightarrow Z \rightarrow Y$ | Open (mediation) | Blocked |
| Collider | $X \rightarrow Z \leftarrow Y$ | Blocked | Opened (collider bias) |

### Backdoor Paths and Backdoor Adjustment

> [!definition] Backdoor Path
> A **backdoor path** from treatment $X$ to outcome $Y$ is any path that starts with an arrow **pointing into $X$** (i.e., has a "back door"). Backdoor paths carry confounding.
>
> A **front-door path** is any path from $X$ to $Y$ that starts with an arrow **pointing out of $X$** — these carry the causal effect of interest.

^def-backdoor

> [!definition] Valid Adjustment Set
> A set of variables $\mathbf{Z}$ is a **valid adjustment set** if, when we condition on $\mathbf{Z}$, all backdoor paths are blocked and at least one front-door path remains open.
>
> The **backdoor adjustment formula** for estimating the causal effect of $X$ on $Y$ adjusting for $\mathbf{Z}$:
> $$P(Y \mid \text{do}(X)) = \sum_z P(Y \mid X, Z=z) \cdot P(Z=z)$$
> The left side is an **interventional** quantity (what happens if we set $X$); the right side is expressed entirely in **observational** quantities.

^def-valid-adj-set

The **optimal adjustment set** is the valid adjustment set with the fewest variables — do the minimum conditioning necessary.

> [!example] Finding a Valid Adjustment Set
> **Setup**: DAG with paths:
> 1. $X \leftarrow Z_1 \rightarrow Z_3 \rightarrow Y$ (backdoor, Z₁ is fork)
> 2. $X \leftarrow Z_1 \rightarrow Z_3 \leftarrow Z_2 \rightarrow Y$ (backdoor, Z₃ is collider)
> 3. $X \leftarrow Z_3 \rightarrow Y$ (backdoor, Z₃ is fork)
> 4. $X \leftarrow Z_3 \leftarrow Z_2 \rightarrow Y$ (backdoor, Z₂ is fork)
> 5. $X \rightarrow W \leftarrow Y$ (front-door, W is collider)
>
> **Finding adjustment sets**:
> - Conditioning on $Z_3$ blocks path 3 (fork), but **opens** path 2 (collider at $Z_3$).
> - Additionally conditioning on $Z_1$ or $Z_2$ blocks the newly opened path 2.
> - Path 5 has collider $W$ unconditioned → path 5 is naturally blocked → must condition on $W$ to open the front-door path.
>
> **Valid adjustment sets**: $\{Z_1, Z_3, W\}$ or $\{Z_2, Z_3, W\}$ or $\{Z_1, Z_2, Z_3, W\}$.
> **Optimal**: $\{Z_1, Z_3, W\}$ or $\{Z_2, Z_3, W\}$ (3 nodes each).

^ex-valid-adj

### Approaches to De-confounding

| Method | Mechanism | Requirement |
|--------|-----------|-------------|
| Randomized Control Trial (RCT) | Breaks $Z \to X$ arrow by random assignment | Prospective study; ethically feasible |
| Stratification | Weight outcomes by strata of $Z$ | Finite set of discrete strata |
| Backdoor adjustment / conditioning | Statistical control via regression or matching | Valid adjustment set identified from DAG |
| Inverse Probability Weighting | Creates pseudo-population balancing confounders | See [[Bayesian Propensity Scores and IPW]] |

## Connections

- **[[The Selection Problem]]**: DAGs make the selection-into-treatment mechanism explicit, showing exactly which variables create self-selection bias.
- **[[Conditional Independence Assumption]]**: The CIA is equivalent to requiring all backdoor paths to be blocked by the conditioning set; DAGs make this testable and transparent.
- **[[Bayesian Propensity Scores and IPW]]**: Propensity score methods use a DAG to identify the confounders to include in the treatment model.
- **[[Differences-in-Differences]]**: The parallel trends assumption can be interpreted through DAGs as blocking the backdoor path through time-invariant unobservables.
- **[[Instrumental Variables]]**: An instrument $Z$ is valid if (a) $Z \to X$ (relevance) and (b) there is no backdoor path from $Z$ to $Y$ not through $X$ (exclusion restriction) — both are DAG conditions.

## See Also

- [[Conditional Independence Assumption]] — formal statement of when conditioning suffices for causal identification
- [[The Selection Problem]] — why observational data conflates selection with treatment effects
- [[Bayesian Propensity Scores and IPW]] — using the DAG-identified confounders to build propensity score models
- [[Instrumental Variables]] — alternative when valid adjustment set doesn't exist
- [[Differences-in-Differences]] — handles time-invariant unobservables that DAG adjustment cannot
