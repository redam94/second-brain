---
title: "CPDAG and Markov Equivalence"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS-reference.md]]"
source_location: "Spirtes et al. 2000 Ch. 3 & 10; Chickering 2002 §2-3"
date_ingested: 2026-10-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[NOTEARS - Overview]]"
aliases:
  - "essential graph"
  - "CPDAG"
  - "Completed Partially Directed Acyclic Graph"
  - "Markov equivalence class"
  - "Markov equivalence"
---

# CPDAG and Markov Equivalence

> [!summary]
> Two DAGs are **Markov equivalent** if they encode the same set of conditional independence (CI)
> relations — equivalently, if they have the same **skeleton** (undirected edge set) and the same
> **v-structures** (unshielded colliders $X \to Z \leftarrow Y$). Their equivalence class is
> represented by a **Completed Partially Directed Acyclic Graph (CPDAG)** — also called the
> essential graph — in which edges that are shared across all members of the class are directed,
> and ambiguous edges are undirected. Both the PC algorithm and GES return a CPDAG, not a single DAG, because observational data alone cannot distinguish between Markov equivalent structures.

## Overview

**Why Markov equivalence matters for causal discovery.**
Observational data, however large, cannot distinguish between DAGs that imply the same CI
structure. A canonical example: the chain $X \to Y \to Z$, the fork $X \leftarrow Y \to Z$,
and the chain $X \leftarrow Y \leftarrow Z$ all imply $X \perp\!\!\!\perp Z \mid Y$ and
$X \not\perp\!\!\!\perp Z$ — the same CI relations — so no finite sample can distinguish them.
The equivalence class therefore represents the **identification boundary** for observational data.

Going beyond this boundary requires **interventional** data (see the [[Directed Acyclic Graphs]] note for the
do-calculus) or parametric restrictions (e.g., non-Gaussian errors enable ICA-based identification, as
in LiNGAM — [[NOTEARS - Overview]] §3).

## Main Content

### Markov Property and Faithfulness

> [!definition] Definition: Markov Property
> A distribution $\mathbb{P}(X_1, \dots, X_d)$ satisfies the **Markov property** with respect to a DAG
> $\mathcal{G} = (\mathsf{V}, \mathsf{E})$ if, for every node $X_i$,
> $$X_i \perp\!\!\!\perp \mathsf{NonDesc}(X_i) \mid \mathsf{Pa}(X_i),$$
> where $\mathsf{Pa}(X_i)$ are the parents and $\mathsf{NonDesc}(X_i)$ are non-descendants of $X_i$.
> Equivalently: $\mathbb{P}$ factorises as $\prod_{i=1}^d p(X_i \mid \mathsf{Pa}(X_i))$.
^def-markov-property

> [!definition] Definition: Faithfulness
> $\mathbb{P}$ is **faithful** to $\mathcal{G}$ if every CI relation in $\mathbb{P}$ is entailed by
> the Markov property of $\mathcal{G}$ via d-separation. Formally: $X_i \perp\!\!\!\perp X_j \mid
> \mathbf{S} \implies X_i$ and $X_j$ are d-separated by $\mathbf{S}$ in $\mathcal{G}$.
>
> **Faithfulness is an assumption, not a theorem.** It excludes distributions where CI holds by
> "accident" (coefficient cancellation). Unfaithful distributions exist but form a measure-zero set
> under reasonable parametric families, which is the standard justification for the assumption.
^def-faithfulness

Under faithfulness + Markov, the CI structure of the distribution **exactly identifies** the
equivalence class of the true DAG — but not the DAG itself.

### V-structures (Unshielded Colliders)

> [!definition] Definition: V-structure (Unshielded Collider)
> A triple $(X, Z, Y)$ in a DAG forms a **v-structure** (also called an unshielded collider or
> immorality) if:
> 1. $X \to Z \leftarrow Y$ (both $X$ and $Y$ are parents of $Z$), and
> 2. There is **no** direct edge between $X$ and $Y$ (they are non-adjacent).
>
> The v-structure is the only asymmetric feature visible in CI tests: conditioning on $Z$ (or its
> descendants) *activates* the path between $X$ and $Y$, whereas conditioning on $Z$ in a chain
> or fork *blocks* the path.
^def-vstructure

### Markov Equivalence Theorem

> [!theorem] Theorem: Markov Equivalence (Verma & Pearl 1990; Spirtes et al. 1993)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ on the same node set are **Markov equivalent** (encode
> the same set of CI relations under faithfulness) if and only if they have:
> 1. The same **skeleton** (same set of adjacencies, ignoring edge directions), and
> 2. The same **v-structures** (same set of unshielded colliders).
>
> **Consequence:** The entire equivalence class is determined by (skeleton, v-structures). All other
> edges have direction that cannot be identified from observational data alone.
^thm-markov-equivalence

### Completed Partially Directed Acyclic Graph (CPDAG)

> [!definition] Definition: CPDAG / Essential Graph
> The **CPDAG** (or essential graph) of a Markov equivalence class is the unique graph on the same
> node set such that:
> - An edge $X - Y$ is **directed** ($X \to Y$) if *every* DAG in the equivalence class has the
>   edge directed as $X \to Y$. These are called **compelled** edges.
> - An edge $X - Y$ is **undirected** if some DAGs have $X \to Y$ and others have $X \leftarrow Y$.
>   These are called **reversible** edges.
>
> The CPDAG is the canonical representative of the equivalence class. It uniquely exists and is
> itself a partially directed acyclic graph (PDAG).
^def-cpdag

> [!example] Example: CPDAG for a 3-node graph
> Consider three DAGs: (A) $X \to Y \to Z$, (B) $X \leftarrow Y \to Z$, (C) $X \leftarrow Y
> \leftarrow Z$. All three have the same skeleton $X - Y - Z$ and no v-structures ($Y$ is not a
> collider in any of them). So all three are Markov equivalent. Their CPDAG is $X - Y - Z$
> (all edges undirected).
>
> Now consider $X \to Z \leftarrow Y$ (with no $X-Y$ edge). This has the v-structure $(X, Z, Y)$.
> Its CPDAG is $X \to Z \leftarrow Y$ (directed edges, since this is the unique DAG in its class).

### Meek's Orientation Rules

After identifying v-structures, additional edges can sometimes be oriented by **acyclicity and
avoiding new v-structures**. Meek (1995) identified four exhaustive rules:

> [!theorem] Meek's Rules R1–R4 (Meek 1995)
> Given a PDAG with known skeleton and v-structures, apply the following rules until no further
> edges can be oriented:
>
> **R1 (Away from collider):** If $\alpha \to \beta - \gamma$ and $\alpha$ and $\gamma$ are
> non-adjacent, orient $\beta \to \gamma$ (orienting $\gamma \leftarrow \beta$ would make $\beta$
> a new collider in $\alpha \to \beta \leftarrow \gamma$, introducing a spurious v-structure).
>
> **R2 (Away from cycle):** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$, orient
> $\alpha \to \gamma$ (otherwise $\gamma \to \alpha$ would create a directed cycle $\alpha \to \beta
> \to \gamma \to \alpha$).
>
> **R3 (Double triangle):** If $\alpha - \beta$, $\alpha - \lambda$, $\alpha - \gamma$, $\lambda
> \to \beta$, $\gamma \to \beta$, and $\lambda$ and $\gamma$ are non-adjacent, orient
> $\alpha \to \beta$.
>
> **R4 (Zhan's rule):** If $\alpha - \beta$, $\alpha - \lambda$, $\lambda \to \gamma \to \beta$,
> and $\alpha$ and $\gamma$ are non-adjacent, orient $\alpha \to \beta$.
>
> **Completeness:** Applying R1–R4 exhaustively to any PDAG with correct skeleton and v-structures
> yields the unique CPDAG.
^thm-meek-rules

## Examples

> [!example] Example: Which edges are compelled in a 4-node graph
> Consider the DAG $X_1 \to X_2 \to X_4$, $X_3 \to X_4$, $X_1 \to X_3$. The v-structure is
> $(X_2, X_4, X_3)$ since $X_2 - X_4 \leftarrow X_3$ with no $X_2 - X_3$ edge. So $X_2 \to X_4$
> and $X_3 \to X_4$ are compelled. Applying R1 to the triple $X_1 \to X_2 \to X_4$: since $X_1$
> and $X_4$ might be adjacent (they are not in this graph), check... actually, $X_1 - X_3$ must be
> oriented: since $X_1 \to X_2 \to X_4 \leftarrow X_3$, the path $X_1 - X_3 \to X_4$ with $X_1$
> and $X_4$ non-adjacent would apply R1 to orient $X_1 \to X_3$. Final CPDAG: all edges directed.

## Connections

- **PC algorithm output**: PC returns the CPDAG of the true DAG (under faithfulness + causal
  sufficiency). See [[PC Algorithm]].
- **GES output**: GES searches directly in CPDAG space and returns the highest-scoring CPDAG.
  See [[Greedy Equivalence Search (GES)]].
- **NOTEARS output**: NOTEARS returns a specific DAG (a weighted matrix $W$); different random
  seeds/regularizations may return different members of the same CPDAG equivalence class.
- **Interventional identification**: with interventional data, edges within an equivalence class
  can sometimes be oriented. The DAG-based do-calculus ([[Directed Acyclic Graphs]]) operates on a
  single causal DAG that may not be fully identified from observational data — this is the gap CPDAGs
  make precise.
- **d-separation**: the Markov property is stated in terms of d-separation, covered in [[Directed Acyclic Graphs]].

## See Also
- [[PC Algorithm]] — uses CI tests to recover skeleton + v-structures → CPDAG
- [[Greedy Equivalence Search (GES)]] — score-based search in CPDAG space
- [[Conditional Independence Testing for Causal Discovery]] — the tests PC uses to establish v-structures
- [[Directed Acyclic Graphs]] — d-separation, the back-door criterion, and causal DAG semantics
- [[DAG Structure Learning Problem]] — NP-hardness motivation, NOTEARS framing
