---
title: "Do-Calculus in Summary Causal DAGs: Soundness, Completeness, and ATE Computation"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/causal-dag
  - type/theorem
  - doc/paper
source: "[[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]]"
source_location: "§6, pp. 13–15"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[s-Separation in Summary DAGs]]"
  - "[[Canonical Causal DAGs]]"
  - "[[Frequentist Causal Estimation]]"
used_by: []
aliases:
  - do-calculus summary DAG
  - ATE on summary DAG
---

# Do-Calculus in Summary Causal DAGs: Soundness, Completeness, and ATE Computation

> [!summary]
> Section 6 proves that Pearl's do-calculus rules remain sound (Theorem 6.1) and complete (Theorem 6.2) when applied to summary causal DAGs. This means causal effect identification — including ATE computation — can be performed directly on the summary DAG rather than the original. The proof relies on the equivalence between the RB of the summary DAG and its canonical DAG (Theorem 4.1). ATE computation on summary DAGs uses the same backdoor/do-calculus machinery as on original DAGs, with adjustment sets derived from s-separation.

## Overview

The fundamental utility of causal DAGs is enabling causal effect identification via do-calculus. If summarization invalidated do-calculus, summary DAGs would be useless for inference. Section 6 shows this does not happen: the do-calculus rules remain sound and complete for summary causal DAGs, making them directly usable for causal inference.

## Main Content

### Background: Do-Calculus

Pearl's do-calculus consists of three rules for manipulating interventional distributions $P(\cdot \mid \text{do}(\cdot))$. These rules allow deriving interventional distributions from observational data when identification is possible.

> [!definition] ATE via Do-Calculus
> The **Average Treatment Effect** (ATE) of treatment $T$ on outcome $O$ is:
> $$\text{ATE}(T, O) = \mathbb{E}[O \mid \text{do}(T=1)] - \mathbb{E}[O \mid \text{do}(T=0)]$$
>
> To estimate ATE from observational data, one must control for **confounding variables** — variables that affect both $T$ and $O$ — using the backdoor criterion or do-calculus.
>
> The backdoor criterion requires finding a set $Z$ of variables that blocks all backdoor paths from $T$ to $O$ (paths that start with an edge into $T$). If such $Z$ exists:
> $$P(O \mid \text{do}(T)) = \sum_Z P(O \mid T, Z) P(Z)$$
^def-ate-do-calculus

### 6.1 Do-Calculus Soundness in Summary Causal DAGs

> [!theorem] Theorem 6.1 — Soundness of Do-Calculus for Summary Causal DAGs
> Let $(\mathcal{H}, f)$ be a summary causal DAG for $\mathcal{G}$, and let $\mathcal{G}_\mathcal{H}$ be the corresponding canonical causal DAG. Let $P(\cdot \mid \text{do}(\cdot))$ denote the interventional distribution compatible with the summary causal DAG $(\mathcal{H}, f)$.
>
> Pearl's do-calculus rules are **sound** for summary causal DAGs: any causal relationship derived by applying the three do-calculus rules to $(\mathcal{H}, f)$ is valid — i.e., it holds in the interventional distribution compatible with $(\mathcal{H}, f)$.
>
> **Proof sketch**: The do-calculus rules are defined in terms of d-separation in the manipulated graph. By s-separation (Theorem 4.2), all CIs derived from $(\mathcal{H}, f)$ hold in every compatible DAG $\mathcal{G} \in \{\mathcal{G}_i\}_\mathcal{H}$. Therefore, applying do-calculus to $(\mathcal{H}, f)$ produces results that are valid across all compatible DAGs.
^thm-do-calculus-soundness

### 6.2 Do-Calculus Completeness in Summary Causal DAGs

> [!theorem] Theorem 6.2 — Completeness of Do-Calculus for Summary Causal DAGs
> Let $(\mathcal{H}, f)$ be a summary causal DAG for $\mathcal{G}$, and let $X, Y \subseteq \mathcal{V}(\mathcal{H})$ be disjoint sets. Let $Z(W)$ be the set of nodes that are not ancestors of any node in $W$.
>
> If $Y$ is d-connected to $Z$ in $(\mathcal{H}, f)$ given $f^{-1}(Z)$ in $\mathcal{G}_\mathcal{H}^{\overline{f(X)}}$ (the manipulated graph with edges into $f(X)$ removed), then there exists a causal DAG $\mathcal{G}^* \in \{\mathcal{G}_i\}_\mathcal{H}$ compatible with $(\mathcal{H}, f)$, such that $f(Y)$ is d-connected to $f(Z)$ in $\mathcal{G}^{*\overline{X}}$. More formally:
> $$P(Y \mid \text{do}(X)) \text{ is identifiable from } (\mathcal{H}, f) \iff P(f(Y) \mid \text{do}(f(X))) \text{ is identifiable from } \mathcal{G}_\mathcal{H}$$
>
> **Significance**: Do-calculus is also complete for summary DAGs — any identifiable causal effect in the summary DAG is also identifiable in the canonical causal DAG (and vice versa). This means the summary DAG does not lose identifiability relative to the canonical representation.
>
> **Proof sketch**: Relies on the equivalence between the RB of $\mathcal{H}$ and $\mathcal{G}_\mathcal{H}$ (Theorem 4.1) and the Shpitser-Pearl completeness of do-calculus for DAGs.
^thm-do-calculus-completeness

### ATE Computation on Summary Causal DAGs

Practical causal inference using a summary DAG follows the same steps as on the original DAG:

> [!example] ATE from Summary DAG (REDSHIFT Example)
> **Original DAG**: 12 nodes, 23 edges (GPT-4 constructed, with 21 correct + 1 inverted + 1 missed edge).
>
> **Query**: What is the causal effect of `Query Template` on `Elapsed Time`?
>
> **Using CaGReS summary ($k = 5$)**:
> 1. Compute the summary DAG with CaGReS — 5 cluster nodes, ~9 edges.
> 2. Identify the treatment cluster containing `Query Template` and outcome cluster containing `Elapsed Time`.
> 3. Find the adjustment set $Z$ using the backdoor criterion on the summary DAG (via s-separation).
> 4. Estimate $\text{ATE} = \mathbb{E}[O \mid \text{do}(T=1), Z] - \mathbb{E}[O \mid \text{do}(T=0), Z]$.
>
> **Robustness advantage**: The summary DAG subsumes the extraneous edges added by GPT-4 (5 random edges). Estimating ATE on the 28-edge erroneous DAG would require adjusting for incorrect confounders. The summary DAG filters this noise: the erroneous edges from the original DAG's monitoring view (e.g., `Plan Time → Lock Wait Time`) are subsumed by groupings that prioritize the core causal paths.
^ex-ate-redshift

### The Minimization Principle for ATE

> [!theorem] ATE Minimization (Robustness)
> To minimize the adjustment set $U$ in causal estimations from the summary DAG $(\mathcal{H}, f)$, the adjustment set should be ordered before all nodes in the treatment cluster in $\mathcal{G}_\mathcal{H}$. Alternatively, an upper and lower bound on the adjustment set can be derived by considering all subsets of $U$'s cluster in $\mathcal{H}$.
^thm-ate-minimization

## Connections

- The soundness result validates CaGReS as a practical tool for causal inference: the summary DAG it produces is guaranteed to give valid causal conclusions.
- Directly applies [[Frequentist Causal Estimation]] adjustment methods (backdoor criterion, IPW, outcome modeling) — these work identically on summary DAGs by Theorems 6.1–6.2.
- The completeness result implies that if you can identify a causal effect in the original DAG, you can identify it in the summary DAG — no loss of identifiability from summarization.
- Connects to [[Potential Outcomes Framework]] — the ATE formula $\mathbb{E}[O \mid \text{do}(T=1)] - \mathbb{E}[O \mid \text{do}(T=0)]$ is the do-calculus version of the potential outcomes ATE $\mathbb{E}[Y(1) - Y(0)]$.

## See Also
- [[s-Separation in Summary DAGs]] — the CI identification that enables do-calculus
- [[CaGReS Algorithm]] — produces the summary DAG used here
- [[Summary Causal DAGs]] — formal definition of the object
- [[Canonical Causal DAGs]] — the proof foundation for Theorems 6.1–6.2
- [[General Structure of Bayesian CI]] — Bayesian estimation framework that consumes the identification results proven here
- [[Propensity Score in Bayesian CI]] — a specific adjustment-set estimator derived from do-calculus backdoor criterion
- [[Frequentist Causal Estimation]] — frequentist adjustment methods (backdoor, IPW) that follow from do-calculus identification
