---
title: "Directed Acyclic Graphs (DAGs)"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/article
source: "[[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]]"
source_location: "Towards Data Science, Graham Harrison, 2023-04-06"
date_ingested: 2026-04-10
folder: "Econometrics/Foundations"
doc_type: article
depends_on:
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Differences-in-Differences]]"
  - "[[Instrumental Variables]]"
  - "[[Bayesian Propensity Scores and IPW]]"
  - "[[Nonparametric Causal Inference]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - DAG
  - causal diagram
  - directed acyclic graph
---

# Directed Acyclic Graphs (DAGs)

> [!summary]
> A Directed Acyclic Graph (DAG) is a causal diagram encoding cause-and-effect relationships between variables using directed edges, with no cycles. DAGs identify which variables must be conditioned on (the **adjustment set**) to isolate a treatment's causal effect from confounding—providing the graphical foundation for *do*-calculus and the backdoor adjustment formula.

## Overview

Data alone cannot establish causation. A DAG supplements data with **domain knowledge** about causal structure, enabling rigorous identification of causal effects from observational data. Developed by Judea Pearl (*The Book of Why*, *Causal Inference in Statistics*), DAG-based reasoning has become central to causal inference.

> [!definition] Directed Acyclic Graph
> A **DAG** is a set of nodes (variables) and directed edges (arrows $A \to B$ meaning "$A$ causally affects $B$") with no directed cycles. The **treatment** is the variable whose effect we seek; the **outcome** is the measured response.
^def-dag

Key terminology:
- **Treatment** ($X$, $D$, or $T$): the intervention being studied.
- **Outcome** ($Y$): the response variable of interest.
- **Confounder**: a variable that causally affects both treatment and outcome, mixing their association.
- **Path**: any sequence of edges connecting treatment and outcome (ignoring arrow direction).

## Junctions: Forks, Chains, and Colliders

Every node in a path that has two connecting arrows is a **junction**. There are exactly three junction patterns:

> [!definition] Fork
> Pattern: $A \leftarrow B \rightarrow C$. Node $B$ is a **common cause** of $A$ and $C$, creating a spurious association between $A$ and $C$ (confounding).
> - **Unconditioned**: path is **open** (information flows $A \leftrightarrow C$).
> - **Conditioned on $B$**: path is **blocked** ($A \perp C \mid B$).
^def-fork

> [!definition] Chain
> Pattern: $A \rightarrow B \rightarrow C$. Node $B$ **mediates** the effect of $A$ on $C$.
> - **Unconditioned**: path is **open**.
> - **Conditioned on $B$** (the mediator): path is **blocked**. This removes the indirect effect—usually undesirable when estimating total causal effect of $A$ on $C$.
^def-chain

> [!definition] Collider
> Pattern: $A \rightarrow B \leftarrow C$. Node $B$ is a **common effect** of $A$ and $C$.
> - **Unconditioned**: path is **blocked** (no spurious association between $A$ and $C$).
> - **Conditioned on $B$** (or any descendant of $B$): path is **opened** (collider bias / selection bias).
^def-collider

### Conditioning Rules Summary

| Junction | Unconditioned | Conditioned on middle node |
|----------|--------------|---------------------------|
| Fork $A \leftarrow B \rightarrow C$ | Open (biased) | **Blocked** (desired) |
| Chain $A \rightarrow B \rightarrow C$ | Open | **Blocked** (removes mediation) |
| Collider $A \rightarrow B \leftarrow C$ | **Blocked** (desired) | **Opened** (creates bias!) |

> [!example] Simpson's Paradox via Fork
> **Setup**: Age $A$ → Shoe-size $S$ and Age $A$ → Reading ability $R$ (fork: $S \leftarrow A \rightarrow R$). There is no causal link $S \to R$.
>
> **Unconditioned**: Shoe size and reading ability are spuriously correlated (because both increase with age).
>
> **Conditioned on age** (fixing to 8-year-olds): correlation vanishes — the path is blocked.
>
> **Implication**: Naive regression of $R$ on $S$ would find a positive coefficient, but this is entirely due to the confounding fork through $A$.

## Paths and Backdoor Paths

> [!definition] Backdoor Path
> A **back-door path** is any path from treatment $X$ to outcome $Y$ that begins with an arrow **pointing into** $X$ (i.e., a fork with $X$ at the tip). Back-door paths transmit confounding.
>
> A **front-door path** is any path from $X$ to $Y$ that begins with an arrow **pointing out of** $X$ — this is the causal pathway of interest.
^def-backdoor

A path $p$ is **d-separated** (blocked) by conditioning set $Z$ if and only if:
1. $p$ contains a chain or fork with the middle node in $Z$, **or**
2. $p$ contains a collider whose collision node (and all its descendants) is **not** in $Z$.

**d-connection** is the converse: a path is open given $Z$.

## Backdoor Adjustment

> [!theorem] Backdoor Adjustment Formula
> If a set of variables $Z$ **blocks all backdoor paths** from $X$ to $Y$ and **does not block any front-door path**, then the interventional distribution satisfies:
>
> $$P(Y \mid \text{do}(X=x)) = \sum_z P(Y \mid X=x, Z=z)\, P(Z=z)$$
>
> This converts an interventional (causal) quantity into observational probabilities—the foundation of stratification and regression adjustment for confounding.
^thm-backdoor

The key insight is that conditioning on $Z$ (the valid adjustment set) **simulates a randomized trial** on observational data, removing confounding without requiring an RCT.

## Valid Adjustment Sets

> [!definition] Valid Adjustment Set
> A set of nodes $Z$ is a **valid adjustment set** if, when conditioned upon, it:
> 1. **Blocks all back-door paths** between $X$ and $Y$.
> 2. **Leaves at least one front-door path open** (unperturbed or unblocked).
> 3. **Creates no new spurious paths** (avoids opening colliders).
>
> The **optimal adjustment set** is the valid adjustment set with fewest nodes.
^def-adjustment-set

### Worked Example: Finding Valid Adjustment Sets

Consider the DAG with paths:
1. $X \leftarrow Z_1 \rightarrow Z_3 \rightarrow Y$ (back-door via fork at $Z_1$)
2. $X \leftarrow Z_1 \rightarrow Z_3 \leftarrow Z_2 \rightarrow Y$ (M-shaped; $Z_3$ is a collider here)
3. $X \leftarrow Z_3 \rightarrow Y$ (back-door via fork at $Z_3$)
4. $X \leftarrow Z_3 \leftarrow Z_2 \rightarrow Y$ (back-door via fork at $Z_2$)
5. $X \rightarrow W \leftarrow Y$ (front-door; $W$ is a collider)

**Analysis**:
- Path 3 can be blocked by conditioning on $Z_3$ (it's a fork there).
- But conditioning on $Z_3$ **opens** path 2 (where $Z_3$ is a collider!).
- Path 2 is then re-blocked by conditioning on $Z_1$ or $Z_2$.
- Path 5 (front-door) is naturally blocked by the collider $W$, but we need it **open**. We must condition on $W$ to open it.

Valid adjustment sets: $\{Z_1, Z_3, W\}$ or $\{Z_2, Z_3, W\}$ or $\{Z_1, Z_2, Z_3, W\}$.
Optimal: $\{Z_1, Z_3, W\}$ or $\{Z_2, Z_3, W\}$.

## Additional Jargon

**d-separation**: A set $Z$ d-separates nodes $X$ and $Y$ if every path between them is blocked by $Z$. This corresponds to conditional independence: $X \perp Y \mid Z$.

**Covariate vs. Confounder**: A **covariate** affects the outcome but does not necessarily affect the treatment. A **confounder** affects both. Per Pearl's view, only variables that are confounders (and certain mediators) need to be included in the adjustment set—adding irrelevant covariates is unnecessary and can introduce bias if a collider is inadvertently conditioned on.

**Controlling vs. Conditioning**: "Controlling" (in a real-world trial) holds a variable fixed experimentally. "Conditioning" achieves the same effect mathematically on observational data via the backdoor adjustment formula.

## Approaches to Removing Confounding

| Method | Applicable to | Mechanism |
|--------|-------------|-----------|
| **RCT** | Prospective study | Randomization breaks $G \to T$ arrows |
| **Stratification** | Observational data | Compute effect within strata of $Z$, then aggregate |
| **Backdoor adjustment** | Observational data | Regress/weight controlling for valid adjustment set $Z$ |
| **Instrumental variables** | Observational + instrument | Exploit exogenous variation uncorrelated with confounders |
| **IPW / propensity scores** | Observational data | Re-weight observations to create pseudo-populations |

## Connections

- **[[The Selection Problem]]**: Selection bias is formally a confounding fork. Potential outcomes framework and DAG notation both capture the same problem.
- **[[The Experimental Ideal]]**: RCTs graphically correspond to deleting all arrows into the treatment node — equivalent to the interventional *do*-operator.
- **[[Bayesian Propensity Scores and IPW]]**: Propensity score methods use DAGs to identify the minimal adjustment set, then re-weight observations.
- **[[Nonparametric Causal Inference]]**: BART-based methods use propensity scores derived from DAG-identified confounders.
- **[[Missing Data Models]]**: DAG-based analysis of missingness mechanisms (MCAR, MAR, MNAR) follows the same fork/collider logic.
- **[[Differences-in-Differences]]**: The common trends assumption can be stated as a DAG condition on time-invariant unobserved confounders.

## See Also
- [[The Selection Problem]] — potential outcomes framework for selection bias
- [[The Experimental Ideal]] — why RCTs are the gold standard
- [[Bayesian Propensity Scores and IPW]] — using DAG-identified confounders with IPW
- [[Nonparametric Causal Inference]] — BART + propensity scores
- [[Instrumental Variables]] — identification without DAG-closing all backdoors
