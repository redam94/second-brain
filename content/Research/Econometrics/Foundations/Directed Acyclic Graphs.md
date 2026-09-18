---
title: "Directed Acyclic Graphs"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/article
source: "[[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]]"
source_location: "Full article — Graham Harrison, Towards Data Science, 2023-04-06"
date_ingested: 2026-04-11
date_updated: 2026-08-03
folder: "Econometrics/Foundations"
doc_type: article
depends_on:
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Bayesian Inverse Probability Weighting]]"
  - "[[Nonparametric Causal Inference]]"
  - "[[Differences-in-Differences]]"
  - "[[Instrumental Variables]]"
  - "[[PC Algorithm and Constraint-Based Discovery]]"
aliases:
  - DAGs
  - directed acyclic graph
  - causal graph
  - do-calculus
  - backdoor adjustment
---

# Directed Acyclic Graphs

> [!summary]
> A Directed Acyclic Graph (DAG) is a causal diagram representing proposed cause-and-effect relationships between variables. DAGs make confounding explicit and provide algorithmic tools (backdoor adjustment, d-separation) to identify valid adjustment sets — the minimum set of variables to condition on to isolate the causal effect of a treatment on an outcome.

## Overview

Causal inference requires more than data — it requires a model of the causal structure. A DAG supplements data with encoded assumptions about which variables cause which, enabling us to:
1. Identify confounding sources (backdoor paths)
2. Determine the optimal adjustment set (which variables to control for)
3. Derive the do-calculus formula for the intervention distribution $P(Y \mid do(X))$

> [!definition] Causal Inference
> **Causal inference** is the process of reasoning and drawing conclusions about cause-and-effect relationships between variables while accounting for potential confounding factors and biases. It asks: "What is the effect of $X$ on $Y$, independent of other variables that affect both?"
^def-causal-inference

## DAG Structure

> [!definition] Directed Acyclic Graph (DAG)
> A DAG consists of:
> - **Nodes**: variables (treatments, outcomes, confounders, mediators)
> - **Directed edges** (arrows): causal relationships $A \to B$ means "$A$ causes $B$"
> - **Acyclic**: no variable can cause itself (no cycles)
>
> Key roles:
> - **Treatment** (exposure): the intervention or variable whose causal effect we want to measure
> - **Outcome**: the variable we measure the effect on
> - **Confounder**: a variable that causes both treatment and outcome, creating spurious association
^def-dag

## Confounders and the Identification Problem

> [!definition] Confounder
> A **confounder** is a variable $C$ that causes both the treatment $T$ and the outcome $Y$ (i.e., $T \leftarrow C \rightarrow Y$). Its presence creates a spurious association between $T$ and $Y$ that does not reflect a direct causal effect.
>
> Example: Gender (G) affects both whether someone takes a drug (D) and their natural recovery (R). Simply observing D and R gives a biased estimate of the drug's effect.
^def-confounder

**Approaches to de-confounding**:

| Method | Applicable | Mechanism |
|--------|-----------|-----------|
| Randomized Controlled Trial (RCT) | Future studies | Breaks $C \to T$ by random assignment |
| Stratification | Observed data | Compute effects separately per stratum of $C$; weight-average |
| Conditioning/Backdoor Adjustment | Observed data (DAG-based) | Mathematical formula using observational data |
| Inverse Probability Weighting | Observed data | See [[Bayesian Inverse Probability Weighting]] |
| Instrumental Variables | Observed data | See [[Instrumental Variables]] |
| Difference-in-Differences | Panel data | See [[Differences-in-Differences]] |

## Paths and Junctions

> [!definition] Path
> A **path** is a sequence of edges connecting treatment $X$ and outcome $Y$ in a DAG, regardless of the direction of the arrows. Example in a DAG $X \leftarrow Z_1 \rightarrow Z_3 \rightarrow Y$: one path is $X \leftarrow Z_1 \rightarrow Z_3 \rightarrow Y$.
^def-path

### Three Junction Patterns

> [!definition] Fork
> A **fork** at node $B$: $A \leftarrow B \rightarrow C$
>
> $B$ is a common cause of $A$ and $C$. Without conditioning on $B$, there is a spurious correlation between $A$ and $C$ (e.g., age → shoe size AND age → reading ability → shoe size correlates with reading ability).
>
> **Rule**: Conditioning on $B$ **blocks** the path. Not conditioning leaves it **open**.
^def-fork

> [!definition] Chain
> A **chain** at node $B$: $A \rightarrow B \rightarrow C$
>
> $B$ mediates the effect of $A$ on $C$. If we condition on the intermediate variable $B$, we "freeze" it, blocking the flow of information from $A$ to $C$.
>
> **Rule**: Conditioning on $B$ **blocks** the path. Not conditioning leaves it **open**.
> (Same rule as forks — counterintuitive but true)
^def-chain

> [!definition] Collider
> A **collider** at node $B$: $A \rightarrow B \leftarrow C$
>
> $B$ is jointly caused by $A$ and $C$. A collider is naturally **blocked** (no spurious association between $A$ and $C$). BUT conditioning on $B$ **opens** the path and creates a spurious association.
>
> **Rule**: Conditioning on $B$ **unblocks** the path. Not conditioning leaves it **blocked**.
> (Opposite of forks and chains!)
^def-collider

> [!example] Collider in Action: Sports College
> - Sporting ability (S) → Bursary (B) ← Academic ability (A)
> - $B$ is a collider: without conditioning, S and A are uncorrelated (athletes are not necessarily more/less academic)
> - After conditioning on $B$ (studying only bursary recipients): S and A become negatively correlated! Students with low sports ability must have high academic ability to receive the bursary, and vice versa.
> - This is **Berkson's bias** (selection bias from conditioning on a collider).
^ex-collider

## Three Rules for Paths

> [!theorem] Path Blocking Rules
> 1. **Fork** ($A \leftarrow B \rightarrow C$): conditioning on $B$ **blocks** the path; leaving unconditioned leaves it **open**
> 2. **Chain** ($A \rightarrow B \rightarrow C$): conditioning on $B$ **blocks** the path; leaving unconditioned leaves it **open**
> 3. **Collider** ($A \rightarrow B \leftarrow C$): conditioning on $B$ **opens** the path; leaving unconditioned leaves it **blocked**
>
> Additionally: if a **descendant** of a collider $B$ is conditioned on, the same effect occurs (the path is opened).
^thm-path-rules

### Simpson's Paradox

When a confounder creates a spurious correlation, we see an aggregate correlation that reverses or changes within subgroups. Fork structures generate Simpson's paradox: an association that exists "overall" disappears when you condition on the fork node.

## Backdoor Criterion and Adjustment Sets

> [!definition] Backdoor Path
> A **backdoor path** from treatment $X$ to outcome $Y$ is any path that starts with an arrow **pointing into $X$** (i.e., a path that goes "backwards" from $X$). Equivalently, any path containing a fork with the fork pointing into $X$.
>
> More precisely (Pearl): *A back-door path is any path from X to Y that starts with an arrow pointing into X.* (The Book of Why, p158)
>
> **Front-door paths** start with an arrow **pointing out of $X$**.
^def-backdoor-path

> [!definition] Valid Adjustment Set
> A **valid adjustment set** $Z$ is any set of nodes such that, when conditioned on:
> 1. All **backdoor paths** from $X$ to $Y$ are **blocked**
> 2. At least one **front-door path** from $X$ to $Y$ remains **open**
> 3. No new spurious paths are created
>
> Pearl's official rules:
> 1. Block all spurious paths between $X$ and $Y$
> 2. Leave all directed paths from $X$ to $Y$ unperturbed (or open them if needed)
> 3. Create no new spurious paths
>
> There can be zero, one, or multiple valid adjustment sets. The **optimal adjustment set** minimizes the number of variables conditioned on.
^def-valid-adjustment-set

> [!example] Finding Adjustment Sets in a Complex DAG
> Given paths:
> 1. $X \leftarrow Z_1 \rightarrow Z_3 \rightarrow Y$ (backdoor, via fork at $Z_1$)
> 2. $X \leftarrow Z_1 \rightarrow Z_3 \leftarrow Z_2 \rightarrow Y$ (complex — $Z_3$ is collider here!)
> 3. $X \leftarrow Z_3 \rightarrow Y$ (backdoor, via fork at $Z_3$)
> 4. $X \leftarrow Z_3 \leftarrow Z_2 \rightarrow Y$ (backdoor)
> 5. $X \rightarrow W \leftarrow Y$ (front-door, but $W$ is a collider — naturally blocked)
>
> Analysis:
> - Condition on $Z_3$: blocks paths 1, 3, 4. BUT opens path 2 (since $Z_3$ is a collider in path 2).
> - Add conditioning on $Z_1$ or $Z_2$: closes path 2.
> - Path 5 ($X \rightarrow W \leftarrow Y$): $W$ is a collider. Must condition on $W$ to open this front-door path!
>
> **Valid adjustment sets**: $\{Z_1, Z_3, W\}$ and $\{Z_2, Z_3, W\}$ and $\{Z_1, Z_2, Z_3, W\}$
> **Optimal**: $\{Z_1, Z_3, W\}$ or $\{Z_2, Z_3, W\}$ (minimum size)
^ex-adjustment-set

## Backdoor Adjustment Formula

> [!theorem] Backdoor Adjustment (do-Calculus)
> If $Z$ is a valid adjustment set, the causal effect of intervention $do(X=x)$ on $Y$ is:
> $$
> P(Y \mid do(X = x)) = \sum_z P(Y \mid X = x, Z = z) P(Z = z)
> $$
>
> The left side is an **interventional** distribution (what would happen if we set $X=x$). The right side is expressed entirely in terms of **observational** distributions (what we can measure from data).
>
> This is what makes conditioning on a valid adjustment set equivalent to (simulating) a randomized controlled trial on historical observational data.
^thm-backdoor-adjustment

## d-Separation and d-Connection

> [!definition] d-Separation
> A path $p$ is **d-separated** by a set of conditioning nodes $Z$ if and only if:
> 1. $p$ contains a fork $A \leftarrow B \rightarrow C$ or chain $A \rightarrow B \rightarrow C$ such that middle node $B \in Z$, OR
> 2. $p$ contains a collider $A \rightarrow B \leftarrow C$ such that $B \notin Z$ and no descendant of $B$ is in $Z$
>
> **d-separation = the path is blocked by the conditioning set $Z$**
^def-d-separation

> [!definition] d-Connection
> A path is **d-connected** by $Z$ (i.e., *unblocked*) when:
> 1. It contains a chain/fork and the middle node is NOT in $Z$, OR
> 2. It contains a collider and the collider OR a descendant is in $Z$
>
> Note: the empty conditioning set $Z = \emptyset$ is valid — a path with only chains/forks and no colliders is naturally d-connected without conditioning.
^def-d-connection

## Glossary of Additional Terms

| Term | Definition |
|------|-----------|
| **Exogenous variable** | A node with no incoming arrows; its causes are outside the model. Denoted $U$ in structural causal models |
| **Endogenous variable** | A node with incoming arrows; its causes are inside the model. Denoted $V$ |
| **Unobserved confounder** | A confounder not measured or included; shown as a dashed U-node with bidirected arrows to both treatment and outcome |
| **Unconditional dependence** | A path is naturally open with no conditioning |
| **Unconditional independence** | A path is naturally blocked (collider) with no conditioning |
| **Conditional dependence** | A path that has been opened by conditioning (on a collider) |
| **Conditional independence** | A path that has been closed by conditioning (on a fork/chain middle node) |

## Key Insights from DAG Analysis

1. **More conditioning is not always better**: conditioning on a collider opens a spurious path; conditioning on a mediator blocks the causal pathway you want to measure
2. **The optimal adjustment set is minimal**: condition on just enough to block all backdoors, no more
3. **DAGs make assumptions explicit**: writing down a DAG requires committing to a causal story, making the assumptions falsifiable
4. **Data alone cannot reveal causality**: DAGs must supplement the data with domain knowledge

## Connections

- [[The Selection Problem]] — DAGs formalize the problem of selection bias
- [[The Experimental Ideal]] — RCTs break all backdoor paths; DAGs show why
- [[Bayesian Inverse Probability Weighting]] — IPW uses the adjustment set from a DAG
- [[Nonparametric Causal Inference]] — BART + propensity scores also uses DAGs to identify confounders
- [[Instrumental Variables]] — IVs are variables that affect treatment but have no direct arrow to the outcome
- [[Differences-in-Differences]] — DiD adjusts for time-invariant confounders not in the DAG

## See Also

- [[The Selection Problem]] — Potential outcomes framework for the same problem
- [[Bayesian Inverse Probability Weighting]] — Practical application of DAG adjustment sets
- [[Instrumental Variables]] — When backdoor adjustment is insufficient (unobserved confounders)
- [[Regression and the CEF]] — regression is the estimator applied once a valid adjustment set is identified from the DAG
- [[Conditional Independence Assumption]] — CIA is the statistical assumption that a valid DAG adjustment set justifies
- [[PC Algorithm and Constraint-Based Discovery]] — learning the DAG from data (vs reasoning about a given DAG)
