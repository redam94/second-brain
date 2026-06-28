---
title: PC Algorithm and Constraint-Based Discovery
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Glymour Zhang Spirtes 2019 - Review of Causal Discovery Methods.pdf]]"
source_location: "Sec. 3.1 (PC), 3.2 (FCI), pp. 3-5; Figs. 1-2"
date_ingested: 2026-06-28
folder: "Causal Discovery/Constraint and Score-Based Discovery"
doc_type: paper
depends_on:
  - "[[Markov and Faithfulness Assumptions]]"
  - "[[Causal Discovery - Overview]]"
used_by:
  - "[[GES and Score-Based Discovery]]"
  - "[[Functional Causal Models (LiNGAM, ANM)]]"
aliases:
  - PC Algorithm
  - Constraint-Based Causal Discovery
  - FCI
  - Fast Causal Inference
  - PAG
  - MAG
  - Meek Rules
---

# PC Algorithm and Constraint-Based Discovery

> [!summary]
> **Constraint-based** methods recover causal structure from the **conditional-independence (CI) constraints** in data. The **PC algorithm** (Spirtes-Glymour-Scheines) does this in two stages: (1) **skeleton discovery** — start fully connected and delete edges whose endpoints are CI given some conditioning set of growing size; (2) **orientation** — orient unshielded triples that are v-structures (colliders), then propagate orientations via **Meek's rules**. PC assumes **no latent confounders** and outputs a **CPDAG**. **FCI** generalizes PC to tolerate (and sometimes detect) unmeasured confounders, outputting a **PAG** over **MAGs**.

## Overview

PC is one of the oldest causal-discovery algorithms consistent under i.i.d. sampling with no latent confounders. It is a search **architecture** into which any CI decision procedure can be plugged — a hypothesis test for conditional independence, or a score-difference such as $\Delta\text{BIC}$ between models with and without an edge. It rests on the [[Markov and Faithfulness Assumptions]]: under the causal Markov + faithfulness assumptions and no latent confounder, two variables are directly causally connected (adjacent) **iff** there is **no** subset of the remaining variables conditional on which they become independent.

## Main Content

> [!definition] Adjacency criterion (the basis of PC)
> Under causal Markov + faithfulness and no latent confounder: $A$ and $B$ are adjacent (share an edge) **iff** $A \not\perp B \mid S$ for **every** subset $S$ of the other variables. Equivalently, an edge is removable iff some conditioning set renders the pair independent. ^adjacency-criterion

> [!theorem] PC algorithm — skeleton discovery
> 1. Form the **complete undirected graph** over all variables.
> 2. Remove edges between **unconditionally** independent pairs ($A \perp B$).
> 3. For each adjacent pair $(A,B)$ and each single neighbor $C$ of $A$ (or of $B$), remove the edge if $A \perp B \mid C$.
> 4. For each adjacent pair $(A,B)$ and each size-2 neighbor set $\{C,D\}$, remove the edge if $A \perp B \mid \{C,D\}$.
> 5. Continue with conditioning sets of increasing size $n$ until no adjacent pair $(A,B)$ has a neighbor subset of size $n$ left to test.
>
> Crucially, **record the separating set** $S_{AB}$ (the conditioning set that removed each edge) — it is needed for orientation. For sparse graphs PC is feasible on tens of thousands of variables (the linear/multinomial CI test is cheap). ^pc-skeleton

> [!theorem] PC algorithm — edge orientation
> 6. **Collider (v-structure) orientation.** For every unshielded triple $A - B - C$ (with $A,C$ **non-adjacent**), orient as a **v-structure** $A \to B \leftarrow C$ **iff $B$ is NOT in the separating set** $S_{AC}$ that removed the $A$–$C$ edge. (If $B$ were a non-collider, conditioning on it would have been required to separate $A$ and $C$.)
> 7. **Orientation propagation (Meek's rules).** Repeatedly apply rules that orient further edges to avoid creating (a) new unshielded colliders and (b) directed cycles. The canonical rule illustrated: if $A \to B - C$ and $A,C$ are non-adjacent, orient $B \to C$ (else a new collider $A\to B \leftarrow C$ would appear). Iterate until no rule applies. ^pc-orientation

> [!definition] Output: CPDAG, and undirected residue
> The output is a **pattern / CPDAG** representing a Markov equivalence class. Some edges may remain **undirected**: their endpoints are known to be adjacent but the data cannot determine direction (both orientations occur within the MEC). This is strictly more informative than a "conditional independence graph" (which uses CI given *all* other variables and reduces to a partial-correlation graph in the Gaussian case). ^pc-output

> [!theorem] FCI — Fast Causal Inference (latent confounders)
> FCI generalizes PC to **tolerate unmeasured confounders**, and is asymptotically correct in their presence. As in PC, it first prunes an undirected graph via CI tests, then orients. Edge ends carry **"o" marks** meaning "arrowhead or tail, undetermined." Output is a **PAG (Partial Ancestral Graph)**, a representative of an equivalence class of **MAGs (Maximal Ancestral Graphs)**:
> - $A \leftrightarrow B$ (**bidirected**) indicates at least one **unmeasured confounder** of $A$ and $B$.
> - $A \, o\!\!\to B$ / $A \, o\!\!-\!\!o\, B$ encode remaining uncertainty about tails/heads.
>
> FCI can sometimes **rule out** confounding: e.g., in Figure 1A data, if $Z$ and $W$ have no confounder then $X \perp W \mid Z$, which FCI detects. Variants: **RFCI** (faster, less info), **GFCI** (combines GES + FCI; more accurate in simulations). ^fci

## Examples

- **Figure 1 worked example.** True graph $X \to Z \to W$, $Y \to Z$. (B) start complete; (C) remove $X-Y$ since $X \perp Y$; (D) remove $X-W$ and $Y-W$ since $\{X,Y\} \perp W \mid Z$; (E) since $Z \notin S_{XY}$, orient the triple $X - Z - Y$ as the v-structure $X \to Z \leftarrow Y$; (F) propagation orients $Z \to W$ (avoiding a new collider), recovering the structure uniquely.
- **Figure 2 (FCI).** Variables $X \to Y \leftarrow U \to Z \to W$ with $U$ unmeasured. FCI removes edges by CI, orients $X \, o\!\!\to Y \leftarrow\!\!o\, Z$ and finds $Y \leftrightarrow Z$, signaling the latent confounder $U$ of $Y$ and $Z$ — something **no** purely CI-based method without latent-variable handling could express.

## Connections

- Requires both [[Markov and Faithfulness Assumptions]]; outputs the **CPDAG** defined there.
- Score-based counterpart that converges to the same MEC: [[GES and Score-Based Discovery]].
- The undirected edges PC leaves can be oriented further by [[Functional Causal Models (LiNGAM, ANM)]] (noise-asymmetry methods) — and FCM/CI hybrids first run PC then apply FCMs.
- Part of the discovery landscape in [[Causal Discovery - Overview]]; contrast continuous-optimization [[NOTEARS - Overview]].

## See Also

- [[Causal Discovery - Overview]]
- [[Markov and Faithfulness Assumptions]]
- [[GES and Score-Based Discovery]]
- [[Functional Causal Models (LiNGAM, ANM)]]
