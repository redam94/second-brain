---
title: "Markov Equivalence and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-ref.md]]"
source_location: "Spirtes et al. (2000) Ch. 4; Verma & Pearl (1990); Meek (1995)"
date_ingested: 2026-08-26
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[GES Algorithm]]"
aliases:
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "equivalence class of DAGs"
---

# Markov Equivalence and CPDAGs

> [!summary]
> Two DAGs are **Markov equivalent** if and only if they encode the same conditional
> independence structure — i.e., they have the same **skeleton** and the same
> **v-structures** (unshielded colliders). The Markov equivalence class of a DAG
> can be uniquely represented by a **CPDAG** (Completed Partially Directed Acyclic
> Graph): a mixed graph whose directed edges are shared by every DAG in the class
> and whose undirected edges can point either way. Both the PC algorithm and GES
> recover the true CPDAG from data, not the true DAG — identifiability up to Markov
> equivalence is the best possible from purely observational data.

## Overview

From observational (non-interventional) data, a learner can only identify a DAG up to
its **Markov equivalence class**: any two DAGs in the same class imply exactly the same
statistical independencies over the observed variables, making them indistinguishable
without interventions. Understanding this limitation is prerequisite to interpreting
the output of any constraint-based or score-based structure learning algorithm.

The key insight is that orientation information is only partially recoverable: **some**
edges have their direction determined by the v-structure pattern and Meek's rules,
while **others** remain undirected (reversible without changing any CI relation).

## Main Content

### Skeleton

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $\mathcal{G} = (V, E)$ is the **undirected** graph obtained by
> replacing every directed edge $X \to Y$ with an undirected edge $X - Y$. It captures
> the *adjacency structure* (which pairs of variables are directly connected) without
> encoding edge directions.
^def-skeleton

### V-structures (Unshielded Colliders)

> [!definition] Definition: V-structure (Unshielded Collider)
> A **v-structure** in a DAG is a triple $(X, Z, Y)$ where:
> 1. $X \to Z \leftarrow Y$ (Z is a **collider** on the path $X - Z - Y$), and
> 2. $X$ and $Y$ are **not adjacent** in $\mathcal{G}$ (the triple is "unshielded").
>
> Notation: $X \to Z \leftarrow Y$ with $X \not\!\!- Y$.
>
> V-structures are the **only** directed patterns identifiable from the skeleton alone.
> In a v-structure, conditioning on $Z$ (or any descendant of $Z$) **induces** a
> dependence between $X$ and $Y$ that is absent unconditionally — the "explaining away" effect.
^def-vstructure

### The Markov Equivalence Theorem

The characterization of equivalence classes is due to Verma & Pearl (1990):

> [!theorem] Theorem: Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ over the same variables are **Markov equivalent**
> (encode the same set of conditional independencies) **if and only if** they have:
> 1. The same **skeleton** (same undirected adjacency structure), and
> 2. The same **v-structures** (same set of unshielded colliders).
>
> Equivalently: $\mathcal{G}_1$ and $\mathcal{G}_2$ imply the same d-separations over
> every pair $(X, Y)$ given every subset $S$ of remaining variables.
^thm-markov-equivalence

> [!example] Example: Three Equivalent DAGs
> The three DAGs $X \to Y \to Z$, $X \leftarrow Y \to Z$, and $X \leftarrow Y \leftarrow Z$
> all have the same skeleton ($X - Y - Z$) and no v-structures. They are Markov equivalent
> and cannot be distinguished from observational data. However, $X \to Y \leftarrow Z$
> is in a different equivalence class (it has a v-structure at $Y$): observationally,
> $X \perp Z$ but $X \not\!\!\perp Z \mid Y$.
^ex-equivalence

### CPDAG Representation

> [!definition] Definition: CPDAG (Completed Partially Directed Acyclic Graph)
> The **CPDAG** of a Markov equivalence class $[\mathcal{G}]$ is the unique mixed graph
> $\mathcal{C}$ over the same vertex set where:
> - **Directed edge** $X \to Y$ in $\mathcal{C}$: the edge $X - Y$ has the **same direction**
>   in every DAG belonging to $[\mathcal{G}]$ (the orientation is "compelled").
> - **Undirected edge** $X - Y$ in $\mathcal{C}$: both $X \to Y$ and $X \leftarrow Y$
>   appear in some DAG of $[\mathcal{G}]$ (the orientation is "reversible").
>
> Theorem (Andersson, Madigan & Perlman 1997): The CPDAG exists and is unique for
> every Markov equivalence class.
^def-cpdag

### Constructing the CPDAG: Meek's Algorithm

Given any DAG $\mathcal{G}$ in the class, the CPDAG is constructed in two steps (Meek 1995):

**Step 1 — Identify compelled edges.**
An edge $X \to Y$ is compelled if reversing it would either create a new v-structure
or destroy an existing one. These become directed in the CPDAG.

**Step 2 — Apply Meek's four orientation rules** to a PDAG whose directed edges are
the v-structure edges from Step 1 and whose undirected edges are the rest. Each rule
is applied exhaustively until no further orientations are possible:

> [!definition] Meek's Orientation Rules (Meek 1995)
> Apply repeatedly to the PDAG until quiescence:
>
> **R1 (Avoid new v-structure):** If $Z \to X - Y$ and $Z \not\!\!- Y$, orient $X \to Y$.
> *(Orienting $Y \to X$ would create a new v-structure $Z \to X \leftarrow Y$.)*
>
> **R2 (Acyclicity):** If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$.
> *(Orienting $Y \to X$ would create a cycle.)*
>
> **R3 (Avoid new v-structure):** If $X - Z \to Y$, $X - W \to Y$, $X - Y$, and
> $Z \not\!\!- W$, orient $X \to Y$.
>
> **R4 (Avoid new v-structure):** If $X - Z \to W \to Y$, $X - Y$, $X - W$, and
> $Z \not\!\!- Y$, orient $X \to Y$.
>
> **Completeness (Meek 1995):** These four rules are **complete** — they derive all
> and only the compelled edge orientations.
^def-meek-rules

## Implications for Structure Learning

The Markov equivalence limit has important practical consequences:

| Question | Answer |
|----------|--------|
| Can we always recover the full DAG from observational data? | **No.** Only the CPDAG is recoverable without interventions or additional assumptions (e.g., non-Gaussianity → LiNGAM; equal noise variances → specific identifiability). |
| What does a constraint-based algorithm (PC) output? | The **CPDAG** of the true data-generating DAG. |
| What does a score-based algorithm (GES) output? | The **CPDAG** that maximizes the score (BIC/BDe) over the equivalence class. |
| When is the full DAG identifiable? | When the CPDAG is fully directed — i.e., every edge is compelled. This happens when all v-structures connect the skeleton into a "fully identifiable" pattern. |
| How many DAGs per equivalence class? | Can be exponentially many; the CPDAG summarizes them all compactly. |

## Connections

- **[[DAG Structure Learning Problem]]** — defines the score-based formulation; CPDAG is the target of both combinatorial and continuous methods.
- **[[PC Algorithm]]** — outputs the CPDAG by testing conditional independencies to find the skeleton and v-structures, then applying Meek rules.
- **[[GES Algorithm]]** — searches directly in the space of CPDAGs, using score-based moves that stay within equivalence classes.
- **[[NOTEARS - Overview]]** — recovers a DAG (not a CPDAG) because it works in the continuous matrix space $\mathbb{R}^{d \times d}$; post-processing with the Dor-Tarsi algorithm can extract the equivalence class.
- **[[Directed Acyclic Graphs]]** — the Bayesian network d-separation semantics that underlie the Markov property and the equivalence theorem.
- **[[Spurious Association and Confounds]]** — fork, pipe, and collider patterns in causal reasoning; the v-structure is precisely the collider pattern $X \to Z \leftarrow Y$.

## See Also
- [[PC Algorithm]] — constraint-based algorithm that outputs the CPDAG
- [[GES Algorithm]] — score-based algorithm that searches in CPDAG space
- [[DAG Structure Learning Problem]] — problem formulation and prior method landscape
- [[Directed Acyclic Graphs]] — d-separation and the Markov condition
- [[NOTEARS - Overview]] — continuous optimization alternative that recovers a DAG
