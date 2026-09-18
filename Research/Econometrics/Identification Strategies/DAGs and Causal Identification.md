---
title: "DAGs and Causal Identification"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/article
source: "[[raw/Unlock the Secrets of Causal Inference with a Master Class in Directed Acyclic Graphs]]"
source_location: "Toward Data Science, Graham Harrison, 2023-04-06"
date_ingested: 2026-04-15
folder: "Econometrics/Identification Strategies"
doc_type: article
depends_on:
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Differences-in-Differences]]"
  - "[[Instrumental Variables]]"
  - "[[Bayesian Inverse Probability Weighting]]"
  - "[[Synthetic Control]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
aliases:
  - DAG
  - d-separation
  - backdoor criterion
---

# DAGs and Causal Identification

> [!summary]
> Directed Acyclic Graphs (DAGs) are the primary tool for representing, visualizing, and reasoning about causal structures in observational data. They encode causal assumptions, identify confounders, and guide which variables to condition on to isolate treatment effects. Key concepts include forks, chains, colliders, d-separation, and the backdoor adjustment formula.

## Overview

Causal inference cannot be established from data alone — data must be supplemented by a causal model that encodes assumptions about the direction and nature of relationships between variables. DAGs provide this model in a compact, visual, and mathematically precise way.

> [!definition] Causal Inference
> **Causal inference** is the process of reasoning and the application of conclusions drawn from cause-and-effect relationships between variables while taking into account potential confounding factors and biases.
^def-causal-inference

**Core vocabulary:**
- **Treatment** ($X$): The action or intervention whose effect we want to measure (the "independent variable").
- **Outcome** ($Y$): The variable we want to understand (the "dependent variable").
- **Confounder**: A variable that causally affects both treatment and outcome, creating spurious association between them.

## Basic DAG Structure

A DAG consists of **nodes** (variables) connected by **directed edges** (arrows indicating causal direction). The graph is *acyclic* — no variable can cause itself through a chain of relationships.

> [!definition] Path in a DAG
> A **path** is any sequence of causal links (arrows) connecting the treatment and outcome, regardless of arrow direction. In the DAG $Z_1 \to Z_3 \to Y \leftarrow Z_2$, the path $X \leftarrow Z_1 \to Z_3 \leftarrow Z_2 \to Y$ is a valid path even though arrows point in multiple directions.
^def-path

## Confounding and De-confounding

### Confounders

A **confounder** $G$ is a variable that causes both treatment $D$ and outcome $R$: $D \leftarrow G \to R$. The confounder creates a spurious association between $D$ and $R$ — observing the relationship without adjusting for $G$ will yield a biased estimate of the causal effect.

**Approaches to de-confounding:**

| Approach | When applicable | Mechanism |
|----------|-----------------|-----------|
| Randomized Control Trial (RCT) | Prospective study | Random assignment breaks $G \to D$ link |
| Stratification | Observational, discrete confounders | Compute effect within strata of $G$, then average |
| Conditioning / Backdoor adjustment | Observational, any | Mathematical adjustment using Pearl's formula |
| Controlling | Real-world trial | Hold $G$ fixed experimentally |

### Conditioning vs. Controlling

- **Conditioning**: Achieves the effect of an RCT mathematically on historical data using backdoor adjustment.
- **Controlling**: Literally holds a variable constant in a real-world trial.

**Key insight from Pearl**: We should condition *only* on confounders — conditioning on too many variables can introduce new biases (see: colliders below).

## The Three Junction Patterns

Every node in the interior of a path (not treatment or outcome endpoints) participates in exactly one of three **junction** patterns:

### Fork

$$A \leftarrow B \rightarrow C$$

$B$ is a **common cause** of $A$ and $C$ — a confounder. Conditioning on $B$ **blocks** the path; leaving $B$ unconditioned leaves the path **open**.

> [!example] Shoe Size and Reading Ability
> Age ($A$) causes both shoe size ($S$) and reading ability ($R$): $S \leftarrow A \rightarrow R$.
> - **Unconditioned**: Strong spurious correlation between $S$ and $R$ (larger shoes → better readers — confounded by age).
> - **Conditioned on age**: Flat regression line — no correlation between $S$ and $R$ within a fixed age group.
> This is **Simpson's Paradox**: an association that appears or disappears when you aggregate/disaggregate.
^ex-fork

> **Rule**: Conditioning on the intermediate node in a fork **blocks** the path.

### Chain

$$A \rightarrow B \rightarrow C$$

$B$ is a **mediator** — it transmits the causal effect of $A$ on $C$. Conditioning on $B$ **blocks** the path (kills the causal transmission); leaving $B$ unconditioned leaves the path **open**.

> [!example] Drug → Blood Pressure → Recovery
> $D \to B \to R$: the drug affects recovery *through* blood pressure.
> - **Unconditioned**: Strong correlation between $D$ and $R$.
> - **Conditioned on $B$**: $D$ and $R$ become uncorrelated — the mediating pathway is blocked.
^ex-chain

> **Rule**: Conditioning on the intermediate node in a chain **blocks** the path.

**Note**: Chains and forks produce identical data patterns — you cannot tell them apart from data alone, which is why DAGs are necessary.

### Collider

$$A \rightarrow B \leftarrow C$$

$B$ is a **collider** — two causal arrows collide at $B$. This is the critical pattern where intuition fails:
- **Unconditioned**: path is **blocked** (no spurious association between $A$ and $C$).
- **Conditioned on $B$**: path is **unblocked** — conditioning on the collider *creates* a spurious association.

> [!example] Sports Ability, Academic Ability, and Bursaries
> $S \to B \leftarrow A$: both sporting ($S$) and academic ability ($A$) cause bursary awards ($B$).
> - **Unconditioned**: No correlation between $S$ and $A$ (high ability in either is rare independently).
> - **Conditioned on $B$**: At a fixed bursary score, students with low sports ability tend to have high academic ability and vice versa — a *negative* correlation is induced.
^ex-collider

> **Rule**: Conditioning on the intermediate node in a collider **unblocks** the path.

### Summary of Conditioning Rules

| Junction | Unconditioned | Conditioned |
|----------|---------------|-------------|
| Fork $A \leftarrow B \rightarrow C$ | Open (spurious) | Blocked |
| Chain $A \to B \to C$ | Open | Blocked |
| Collider $A \to B \leftarrow C$ | **Blocked** | **Open** (spurious!) |

## Backdoor Paths and Backdoor Adjustment

> [!definition] Backdoor Path
> A **backdoor path** from treatment $X$ to outcome $Y$ is any path starting with an arrow *pointing into* $X$ (i.e., $X \leftarrow \ldots$). These paths carry spurious information and must be blocked.
> A **front-door path** starts with an arrow *out of* $X$ (i.e., $X \to \ldots$). These paths carry the causal effect and must remain open.
^def-backdoor

> [!definition] Backdoor Adjustment Formula
> To estimate the causal effect of $X$ on $Y$ with confounder $Z$:
> $$P(Y \mid do(X)) = \sum_z P(Y \mid X, Z = z) \cdot P(Z = z)$$
> The $do(\cdot)$ operator represents an *intervention* (setting $X$ to a value), not mere observation. The right-hand side is expressed entirely in observable quantities.
^def-backdoor-formula

**Intuition**: Stratify by $Z$, compute the $X$→$Y$ effect within each stratum, then average over the population distribution of $Z$.

## Valid Adjustment Sets

> [!definition] Valid Adjustment Set
> A set of nodes $\mathcal{Z}$ is a **valid adjustment set** if, when conditioned on, it:
> 1. Blocks and closes all backdoor paths from $X$ to $Y$, and
> 2. Leaves at least one front-door path from $X$ to $Y$ unblocked and open.
^def-valid-adjustment

**Finding valid adjustment sets** in practice: Use `dagitty` (R) or `dowhy` (Python):
```r
library(dagitty)
adjustmentSets(dag)  # returns all valid adjustment sets
```

The **optimal adjustment set** is a valid adjustment set with the minimum number of nodes.

### Worked Example

For the DAG with paths:
1. $X \leftarrow Z_1 \to Z_3 \to Y$ (backdoor)
2. $X \leftarrow Z_1 \to Z_3 \leftarrow Z_2 \to Y$ (backdoor; $Z_3$ is a collider here)
3. $X \leftarrow Z_3 \to Y$ (backdoor; $Z_3$ is a fork)
4. $X \leftarrow Z_3 \leftarrow Z_2 \to Y$ (backdoor)
5. $X \to W \leftarrow Y$ (front-door; $W$ is a collider — must condition on $W$ to open this path)

**Valid adjustment sets**: $\{Z_1, Z_3, W\}$, $\{Z_2, Z_3, W\}$, $\{Z_1, Z_2, Z_3, W\}$.

## d-Separation and d-Connection

> [!definition] d-Separation
> A path $p$ is **d-separated** (blocked) by conditioning set $\mathcal{Z}$ if and only if:
> 1. $p$ contains a fork $A \leftarrow B \to C$ or chain $A \to B \to C$ where $B \in \mathcal{Z}$, **or**
> 2. $p$ contains a collider $A \to B \leftarrow C$ where $B \notin \mathcal{Z}$ *and no descendant of $B$ is in $\mathcal{Z}$*.
> If none of these apply, the path is **d-connected** (unblocked).
^def-d-separation

**Practical note**: The descendant-of-collider condition (condition 2) is rare in practice but appears frequently in the technical literature. Conditioning on a descendant of a collider has the same effect as conditioning on the collider itself.

## Terminology Reference

| Term | Meaning |
|------|---------|
| **Exogenous variable** | Has no incoming arrows — causes others but is not caused within the model |
| **Endogenous variable** | Has at least one incoming arrow — its value is explained within the model |
| **Unobserved confounder** | A confounder that is not measured; creates an unresolvable backdoor path |
| **Unconditional dependence** | A path that is open without any conditioning |
| **Conditional independence** | A path that is blocked by conditioning on a set of nodes |
| **Mediator** | Middle node of a chain; transmits causal effect |
| **Covariate** | A variable that affects the outcome but is not of primary interest; may be added to improve precision but is not required for identification |

## Connections

- [[The Selection Problem]] — DAGs make selection bias explicit by showing which variables confound treatment assignment
- [[The Experimental Ideal]] — RCTs eliminate backdoor paths by randomizing treatment; DAGs show why this works
- [[Bayesian Inverse Probability Weighting]] — Uses DAGs to identify which confounders to include in the propensity score model
- [[Missing Data Models]] — Uses DAGs to distinguish MCAR/MAR/MNAR and identify valid imputation strategies
- [[Nonparametric Causal Inference]] — BART + propensity scores uses DAG-identified confounders
- [[Differences-in-Differences]] — Common trends assumption can be encoded as a DAG restriction

## See Also

- [[Synthetic Control]] — Uses the potential outcomes framework; DAGs clarify the no-interference assumption
- [[Instrumental Variables]] — An instrument must be exogenous in the DAG (no backdoor path from $Z$ to $Y$ except through $X$)
