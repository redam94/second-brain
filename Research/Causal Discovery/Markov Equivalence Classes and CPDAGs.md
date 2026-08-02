---
title: "Markov Equivalence Classes and CPDAGs"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Survey.md]]"
source_location: "§1 (SGS 2000), §2 (Chickering 2002) — shared foundational concept"
date_ingested: 2026-08-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Constraint-Based Structure Learning]]"
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - CPDAG
  - essential graph
  - Markov equivalence
  - equivalence class of DAGs
---

# Markov Equivalence Classes and CPDAGs

> [!summary]
> Two DAGs encode identical conditional independences — and hence are indistinguishable from
> observational data — if and only if they share the same **skeleton** and the same
> **v-structures**. The set of all such equivalent DAGs is a **Markov equivalence class**,
> represented by a single **CPDAG** (Completed Partially Directed Acyclic Graph). Observational
> constraint-based and score-based learning algorithms ([[PC Algorithm - Constraint-Based Structure Learning]],
> [[GES - Greedy Equivalence Search]]) output a CPDAG, not a unique DAG — identifiability stops
> at the equivalence class.

## Overview

When learning a DAG from purely observational data, we cannot in general distinguish between
DAGs that imply the same joint distribution. The Markov condition links a DAG's structure to
conditional independences in the distribution; faithfulness says the distribution encodes only
those CI relations the DAG requires. Together, these two assumptions imply that observational
data pins down the generating DAG only up to its **Markov equivalence class**.

Understanding CPDAGs is essential for reading the output of both the PC algorithm and GES,
for interpreting partial identifiability results, and for understanding why intervention data
(randomized experiments) breaks equivalences that observational data cannot.

## Main Content

### Conditional Independence and d-Separation

The connection between DAG structure and conditional independences runs through **d-separation**.

> [!definition] d-separation (Pearl 1988)
> In a DAG $\mathcal{G}$, a set $\mathbf{Z}$ **d-separates** $X$ from $Y$ — written
> $X \perp_\mathcal{G} Y \mid \mathbf{Z}$ — if $\mathbf{Z}$ blocks every path between $X$ and
> $Y$. A path is blocked by $\mathbf{Z}$ if:
> - it contains a **non-collider** $W$ (fork $X \leftarrow W \to Y$ or pipe $X \to W \to Y$)
>   with $W \in \mathbf{Z}$, **or**
> - it contains a **collider** $W$ ($X \to W \leftarrow Y$) with $W \notin \mathbf{Z}$ and no
>   descendant of $W$ in $\mathbf{Z}$.
>
> **Markov condition:** $X \perp_\mathcal{G} Y \mid \mathbf{Z} \implies X \perp_P Y \mid \mathbf{Z}$.  
> **Faithfulness:** $X \perp_P Y \mid \mathbf{Z} \implies X \perp_\mathcal{G} Y \mid \mathbf{Z}$.
^def-dsep

Together, Markov + faithfulness give a **bijection**: the distribution $P$ and the DAG $\mathcal{G}$
encode exactly the same set of conditional independences. The CI structure of $P$ is therefore the
fingerprint of the equivalence class.

### Markov Equivalence

> [!definition] Markov Equivalence (Verma & Pearl 1990)
> Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ on the same vertex set are **Markov equivalent**
> if they entail the same set of conditional independences, i.e. for all disjoint
> $\mathbf{X}, \mathbf{Y}, \mathbf{Z} \subseteq \mathbf{V}$:
> $$\mathbf{X} \perp_{\mathcal{G}_1} \mathbf{Y} \mid \mathbf{Z}
>   \iff \mathbf{X} \perp_{\mathcal{G}_2} \mathbf{Y} \mid \mathbf{Z}.$$
> The **Markov equivalence class** $[\mathcal{G}]$ of $\mathcal{G}$ is the set of all DAGs
> Markov equivalent to $\mathcal{G}$.
^def-markov-equivalence

> [!theorem] Characterization of Markov Equivalence (Verma & Pearl 1990; Meek 1995)
> $\mathcal{G}_1 \sim \mathcal{G}_2$ (Markov equivalent) **if and only if** they have:
> 1. The same **skeleton** (same undirected edges, ignoring directions), **and**
> 2. The same set of **v-structures** (unshielded colliders $X \to Z \leftarrow Y$ where $X$
>    and $Y$ are not adjacent).
>
> **Proof idea:** d-separation in a DAG is determined entirely by the skeleton and
> v-structures. Changing edge directions can only change v-structures (which alter collider
> blocking). Two DAGs with identical skeleton and v-structures therefore have identical
> d-separation — hence identical CIs under faithfulness.
^thm-equiv-characterization

### CPDAG (Completed Partially Directed Acyclic Graph)

> [!definition] CPDAG / Essential Graph (Meek 1995; Andersson et al. 1997)
> The **CPDAG** of an equivalence class $[\mathcal{G}]$ is the unique graph $\mathcal{C}$ on
> the same vertex set such that:
> - $\mathcal{C}$ has a **directed** edge $X \to Y$ if and only if every DAG in $[\mathcal{G}]$
>   has $X \to Y$ (compelled / forced edges).
> - $\mathcal{C}$ has an **undirected** edge $X - Y$ if and only if $[\mathcal{G}]$ contains
>   DAGs with both $X \to Y$ and $X \leftarrow Y$ (reversible edges).
>
> Equivalently, $\mathcal{C}$ is the union of all DAGs in $[\mathcal{G}]$.
^def-cpdag

> [!example] Example: Three CPDAGs for three variables
> Consider variables $X, Y, Z$ with $Y$ adjacent to both $X$ and $Z$, but $X$ not adjacent to
> $Z$ (a chain/fork/collider triple):
>
> - **Fork:** $X \leftarrow Y \to Z$ ≡ **Chain:** $X \to Y \to Z$ ≡ **Reverse chain:** $X \leftarrow Y \leftarrow Z$  
>   These are Markov equivalent (same skeleton $X - Y - Z$, no v-structure). CPDAG: $X - Y - Z$.
>
> - **Collider:** $X \to Y \leftarrow Z$  
>   This is NOT equivalent to the above — it has a v-structure at $Y$. CPDAG: $X \to Y \leftarrow Z$.
>
> **Key fact:** The fork, chain, and reverse chain are observationally indistinguishable. The
> collider is distinguishable because it makes $X$ and $Z$ marginally independent but dependent
> given $Y$ — the opposite pattern from the others.

### Compelled vs. Reversible Edges

> [!theorem] Chickering's Characterization of Compelled Edges (Chickering 1995)
> In a CPDAG $\mathcal{C}$, an edge $X \to Y$ is **compelled** (appears as directed) if and
> only if for every DAG $\mathcal{G} \in [\mathcal{G}]$, the edge is directed $X \to Y$ in
> $\mathcal{G}$.
>
> An edge $X - Y$ is **reversible** if and only if there exist DAGs in $[\mathcal{G}]$ with
> $X \to Y$ and also DAGs with $X \leftarrow Y$.
>
> **Chickering (1995) algorithm:** Given a DAG $\mathcal{G}$, the CPDAG $\mathcal{C}$ is
> computed in $O(d + |\mathcal{E}|)$ time by:
> 1. Finding all v-structures (orient their edges as directed in $\mathcal{C}$).
> 2. Applying Meek's four orientation rules iteratively to orient additional edges.
> 3. All remaining edges are reversible and appear undirected.
^thm-compelled

### Meek's Four Orientation Rules

Meek (1995) gives four deterministic rules that, applied exhaustively, complete the CPDAG from
the skeleton and v-structures:

> [!definition] Meek Rules (Meek 1995)
> Apply these rules in any order until no further orientations are possible:
>
> **R1 (no new v-structure):** If $\alpha \to \beta - \gamma$ and $\alpha$ not adjacent to $\gamma$:
> orient $\beta \to \gamma$. *Reason: $\gamma \to \beta \leftarrow \alpha$ would create a new
> v-structure at $\beta$.*
>
> **R2 (acyclicity):** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$: orient $\alpha \to \gamma$.
> *Reason: $\gamma \to \alpha$ would create a cycle $\alpha \to \beta \to \gamma \to \alpha$.*
>
> **R3 (uniqueness of the v-structure):** If $\alpha - \beta \to \gamma$, $\alpha - \delta \to \gamma$,
> $\alpha - \gamma$, and $\beta$ not adjacent to $\delta$: orient $\alpha \to \gamma$.
> *Reason: either $\beta \to \alpha$ or $\delta \to \alpha$ would create an inconsistent collider.*
>
> **R4 (fourth Meek rule):** Less commonly needed; handles certain combinations of directed and
> undirected edges.
^def-meek-rules

### Why CPDAGs are the identifiability limit (observational data only)

> [!note] Identifiability wall
> Under the Markov condition and faithfulness, **no observational learning algorithm** can
> identify the generating DAG beyond its Markov equivalence class. Every DAG in $[\mathcal{G}]$
> produces the same joint distribution, and observational data can only see the distribution.
>
> To break equivalences, one needs:
> - **Interventional data:** perfect or imperfect interventions that sever incoming edges, used
>   by [[GES - Greedy Equivalence Search#GIES|GIES]] and the ICP algorithm.
> - **Non-Gaussian errors + linear SEM:** LiNGAM (Shimizu et al. 2006) exploits non-Gaussianity
>   to fully identify the DAG (not just the CPDAG).
> - **Restricted function classes:** ANM (additive noise models) with nonlinear mechanisms.

## Connections

- **Output of PC algorithm:** The PC algorithm's Phase 2 + Phase 3 output a CPDAG — see
  [[PC Algorithm - Constraint-Based Structure Learning]].
- **Output of GES:** GES's Insert/Delete operators always produce valid CPDAGs; consistency
  theorem guarantees recovering the true CPDAG — see [[GES - Greedy Equivalence Search]].
- **NOTEARS:** Does not output CPDAGs; outputs a single DAG estimate. The NOTEARS paper notes
  this and warns about comparing to GES/PC which output CPDAGs (App. D.1 of [[NOTEARS Experiments]]).
- **Expert-elicited structure:** [[BN Construction Methods Comparison]] and
  [[LLM Expert Elicitation for Bayesian Networks]] elicit individual DAGs — fully identified
  structures — rather than CPDAGs, by using domain knowledge to break equivalences.
- **Causal DAG reasoning:** Once the CPDAG is known, [[Directed Acyclic Graphs]] provides
  the tools (back-door criterion, do-calculus) to reason about interventions — but with CPDAGs
  rather than DAGs, one must average over all equivalent members when computing identifiable effects.

## See Also
- [[PC Algorithm - Constraint-Based Structure Learning]] — uses CPDAGs as its output
- [[GES - Greedy Equivalence Search]] — searches CPDAG space directly
- [[DAG Structure Learning Problem]] — the optimization landscape; NOTEARS approach
- [[Directed Acyclic Graphs]] — DAG semantics for causal reasoning (do-calculus, back-door)
- [[Canonical Causal DAGs]] — specific DAG motifs (fork, pipe, collider) that generate distinct equivalence classes
- [[Summary Causal DAGs]] — ABM-derived summary DAGs; algorithmic structure learning via [[CaGReS Algorithm]] then outputs a PAG (related representation)
