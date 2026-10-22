---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/textbook
source: "[[raw/spirtes-glymour-scheines-2000-CPS-book.md]]"
source_location: "Ch. 3–4 (d-separation, Markov equivalence); Meek (1995) orientation rules"
date_ingested: 2026-10-22
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
  - "[[Stable PC and High-Dimensional Extensions]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "essential graph"
  - "Markov equivalence"
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if they encode exactly the same conditional independence
> relations — formally, if they have the same **skeleton** (underlying undirected graph) and
> the same **v-structures** (immoralities: $X \to Z \gets Y$ with $X, Y$ non-adjacent).
> A **CPDAG** (Completed Partially Directed Acyclic Graph) is the unique canonical
> representative of an equivalence class: directed edges appear wherever every DAG in the
> class agrees on the direction; undirected edges mark those that can be flipped without
> changing any CI relation. CPDAGs are the identifiable output of constraint-based
> (PC) and score-based (GES) causal discovery algorithms.

## Overview

From observational data alone — with no interventions — a causal DAG is identifiable only
up to its **Markov equivalence class**. Different DAGs that imply the same CI structure
are indistinguishable by any statistical test. Understanding equivalence classes is therefore
not a theoretical nicety but a fundamental limit on what observational causal discovery can
achieve.

## Main Content

### Markov equivalence

> [!definition] Definition: Markov Equivalence (Verma & Pearl 1990; Spirtes et al. 2000)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ over the same vertex set $\mathbf{V}$ are
> **Markov equivalent** if and only if they have:
> 1. The same **skeleton** (same set of adjacencies / undirected edges), and
> 2. The same **v-structures** (unshielded colliders $X \to Z \gets Y$ where $X$ and $Y$
>    are non-adjacent).
>
> *Equivalently*, $\mathcal{G}_1$ and $\mathcal{G}_2$ are Markov equivalent iff they encode
> exactly the same conditional independence (CI) model, i.e. $\mathcal{I}(\mathcal{G}_1)
> = \mathcal{I}(\mathcal{G}_2)$ where $\mathcal{I}(\mathcal{G})$ is the set of d-separations.
^def-markov-equiv

> [!example] Example: Three-Variable Equivalence Class
> The three DAGs $X \to Y \to Z$, $X \gets Y \gets Z$, and $X \gets Y \to Z$ all have the
> same skeleton ($X$–$Y$–$Z$) and no v-structures. They are all Markov equivalent: each
> implies only $X \perp\!\!\!\perp Z \mid Y$ and no other non-trivial CI.
>
> By contrast, $X \to Y \gets Z$ (with $X$ and $Z$ non-adjacent) is in its **own** class
> — it has the v-structure $X \to Y \gets Z$, which implies $X \not\!\perp\!\!\!\perp Z$ and
> $X \perp\!\!\!\perp Z \mid Y$ *is not* true (collider activation).
^ex-three-var

### CPDAG (essential graph)

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of an equivalence class $[\mathcal{G}]$ is the unique **PDAG**
> (Partially Directed Acyclic Graph) $\mathcal{C}$ such that:
> - $\mathcal{C}$ has the same skeleton as every DAG in $[\mathcal{G}]$.
> - An edge $X \to Y$ is **directed** in $\mathcal{C}$ iff it is directed in the
>   **same direction** in every DAG in $[\mathcal{G}]$ (a "compelled" edge).
> - An edge $X - Y$ is **undirected** in $\mathcal{C}$ iff it can be oriented
>   either way in some DAG of $[\mathcal{G}]$ (a "reversible" edge).
>
> The CPDAG is also called the **essential graph**. It uniquely identifies the
> equivalence class.
^def-cpdag

> [!note] CPDAGs vs. DAGs
> Not every PDAG is a valid CPDAG. A valid CPDAG must satisfy: (i) each undirected connected
> component forms a chordal graph; (ii) each directed edge in the CPDAG is a compelled edge
> in every DAG it represents. The `pcalg` package contains `dag2cpdag()` for the conversion.

### Meek's orientation rules: DAG → CPDAG

Given any DAG $\mathcal{G}$ in a class, its CPDAG can be constructed by a two-step process:

1. **Mark compelled edges** (all edges involved in v-structures are compelled).
2. **Apply Meek's 4 rules** repeatedly until no further orientation is possible.

> [!theorem] Theorem: Meek (1995) — Completeness of 4 Rules
> The following four rules, applied exhaustively to a PDAG, produce the unique CPDAG:
>
> **R1 (Away-from-v-structure):** If $\alpha \to \beta - \gamma$ and $\alpha, \gamma$
> non-adjacent, orient $\beta - \gamma$ as $\beta \to \gamma$.
> *Reason:* Otherwise $\gamma \to \beta$ creates a new v-structure $\alpha \to \beta \gets \gamma$.
>
> **R2 (Away-from-cycle):** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$ (undirected),
> orient $\alpha - \gamma$ as $\alpha \to \gamma$.
> *Reason:* Otherwise $\gamma \to \alpha$ creates a directed cycle $\alpha \to \beta \to \gamma \to \alpha$.
>
> **R3 (Double-into-v-structure):** If $\alpha - \beta \to \gamma \gets \delta - \alpha$
> with $\beta, \delta$ non-adjacent and $\alpha - \gamma$ undirected, orient $\alpha \to \gamma$.
> *Reason:* Any DAG member must have either $\alpha \to \gamma$ or $\gamma \to \alpha$; the
> latter forces both $\gamma \to \beta$ and $\gamma \to \delta$, but then the entire edge must
> be consistent — working through both cases shows $\alpha \to \gamma$ is compelled.
>
> **R4 (Zap-from-cycle):** If $\alpha - \beta \to \gamma$ and $\delta \to \gamma, \delta \to \beta$
> with $\alpha - \delta$ undirected and $\alpha, \gamma$ non-adjacent, orient $\alpha \to \beta$.
^thm-meek-rules

### The size of equivalence classes

Empirically and theoretically:
- Chains $X_1 - X_2 - \cdots - X_k$ belong to classes of size $2^{k-1}$ (each interior edge
  is reversible, flanking edges are compelled by v-structures at ends if they exist).
- Dense graphs tend to have smaller equivalence classes (more v-structures fix edge directions).
- Sparse graphs (trees, chains) can have exponentially large equivalence classes.

## Connections

- **PC algorithm outputs a CPDAG**: the skeleton + v-structure + Meek rules procedure is exactly
  the [[PC Algorithm]], run on a CI oracle. See [[PC Algorithm]].
- **GES operates over CPDAGs directly**: the FES and BES phases of [[GES Algorithm]] navigate
  the space of equivalence classes, scoring CPDAGs rather than individual DAGs.
- **NOTEARS outputs a DAG**: the continuous-optimization approach of [[NOTEARS - Overview]]
  returns a single DAG, not a CPDAG — it must assume identifiability (e.g. non-Gaussian noise
  via LiNGAM) or report one DAG from the equivalence class.
- **Interventional identifiability**: with interventions, additional edges become compelled,
  shrinking the equivalence class. Interventional CPDAGs (I-CPDAGs) represent the remaining
  ambiguity.
- **DAG construction in the vault**: [[BN Construction Methods Comparison]] and
  [[LLM Expert Elicitation for Bayesian Networks]] assume a DAG is supplied; the equivalence
  class is the answer to "what can be learned from data before expert knowledge is added."

## See Also
- [[PC Algorithm]] — the constraint-based algorithm that identifies the CPDAG
- [[GES Algorithm]] — the score-based algorithm that searches over CPDAGs
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, the causal DAG formalism
- [[DAG Structure Learning Problem]] — how NOTEARS frames DAG learning as continuous optimization
- [[NOTEARS - Overview]] — continuous-optimization approach to structure learning
