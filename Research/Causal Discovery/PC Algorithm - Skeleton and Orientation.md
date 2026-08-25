---
title: "PC Algorithm - Skeleton and Orientation"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-canonical-references.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) Ch. 5, Algorithm 5.3; Meek (1995)"
date_ingested: 2026-08-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Overview]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "PC algorithm phases"
  - "skeleton discovery CI testing"
  - "Meek orientation rules"
  - "v-structure detection"
---

# PC Algorithm - Skeleton and Orientation

> [!summary]
> The PC algorithm proceeds in three phases: (1) **skeleton discovery** — iteratively
> remove edges from the complete graph by testing conditional independence, storing
> the separating set for each removed edge; (2) **v-structure orientation** — for each
> unshielded triple $X - Z - Y$, orient $X \to Z \leftarrow Y$ iff $Z \notin \text{sep}(X,Y)$;
> (3) **Meek rules (R1–R4)** — propagate oriented edges to avoid new v-structures or
> directed cycles. The output is the CPDAG of the true equivalence class under faithfulness
> and causal sufficiency.

## Overview

This note gives the complete algorithmic content for PC. For motivation, assumptions,
and connections, see [[PC Algorithm - Overview]]. The three phases are largely
independent: Phase 1 produces the skeleton and separating sets; Phases 2 and 3 use
those outputs to orient edges.

## Main Content

### Phase 1: Skeleton Discovery

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $\mathcal{G}$ is the undirected graph obtained by replacing
> every directed edge $X_i \to X_j$ with an undirected edge $X_i - X_j$.
^def-skeleton

The skeleton discovery phase identifies which pairs of variables are adjacent in the
true DAG, using conditional independence as the criterion for non-adjacency.

> [!theorem] Algorithm: PC Skeleton Discovery (Spirtes et al. 2000, Alg. 5.3, Phase 1)
>
> **Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$, significance level $\alpha$.
>
> **Initialize:** Complete undirected graph $\mathcal{H}$ on $d$ nodes; separating sets
> $\text{sep}(i,j) \leftarrow \emptyset$ for all $i \neq j$; depth $k \leftarrow 0$.
>
> **Repeat** while $\exists$ adjacent pair $(X_i, X_j)$ with $|\mathrm{Adj}(X_i) \setminus \{X_j\}| \geq k$:
> 1. For each ordered pair $(X_i, X_j)$ adjacent in $\mathcal{H}$:
>    - For each $\mathbf{S} \subseteq \mathrm{Adj}(X_i) \setminus \{X_j\}$ with $|\mathbf{S}| = k$:
>      - Perform CI test: $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$.
>      - If $p\text{-value} > \alpha$ (fail to reject): remove edge $X_i - X_j$;
>        set $\text{sep}(X_i, X_j) \leftarrow \mathbf{S}$; break inner loop.
> 2. $k \leftarrow k + 1$.
>
> **Output:** Skeleton graph $\mathcal{H}$; separating sets $\{\text{sep}(i,j)\}$.
^alg-skeleton

**Key properties:**
- **Increasing depth**: start with marginal tests ($k=0$), then condition on 1 variable,
  then 2, etc. Early stages remove many edges cheaply; later stages only test pairs that
  survived earlier pruning.
- **Termination**: the depth reaches at most $\max_i |\mathrm{Adj}(X_i)| - 1$ — the
  maximum degree of the skeleton minus 1.
- **Order-dependence**: in the original formulation, the neighbor sets $\mathrm{Adj}(X_i)$
  are updated after each removal, so results depend on testing order. Stable PC (see below)
  fixes this.

> [!note] Stable PC (Colombo & Maathuis 2014)
> **Stable PC** runs depth $k$ using the *fixed* adjacency from depth $k-1$:
> - At the start of depth $k$, snapshot $\mathrm{Adj}^{(k-1)}(X_i)$ for all $i$
> - Use snapshots (not live updates) throughout depth $k$
> - Only update the actual skeleton after all depth-$k$ tests are done
>
> This makes the skeleton **order-independent**: the result is the same regardless of
> the order pairs are tested within each depth. This is the default in causal-learn
> (`stable=True`) and pcalg.

### CI test choices

The CI test must be appropriate for the data type:

| Data type | Test | Null distribution |
|-----------|------|-----------------|
| Gaussian / linear | Fisher's Z transform | $z$-statistic under $H_0$ |
| Discrete / categorical | $\chi^2$ or G-test | $\chi^2$ distribution |
| Nonparametric | Kernel CI test (KCI) | Permutation / bootstrap |
| Mixed continuous-discrete | CMIknn | k-NN entropy estimation |

For Gaussian data: $\hat{\rho}_{ij \mid \mathbf{S}}$ = partial correlation of $X_i$ and $X_j$
controlling for $\mathbf{S}$; $z = \tanh^{-1}(\hat{\rho}_{ij\mid\mathbf{S}}) \sim N(0, 1/(n-|\mathbf{S}|-3))$
under $H_0: \rho_{ij\mid\mathbf{S}} = 0$.

### Phase 2: V-Structure Orientation

After the skeleton is learned, the separating sets are used to detect **v-structures**
(immoralities) — the only edge orientations that are identifiable from observational data.

> [!definition] Definition: Unshielded Triple
> A triple $(X_i, X_k, X_j)$ is **unshielded** if $X_i$ and $X_j$ are not adjacent
> in $\mathcal{H}$ but both are adjacent to $X_k$.
^def-unshielded-triple

> [!theorem] Algorithm: V-Structure Detection (Phase 2)
> For each unshielded triple $(X_i, X_k, X_j)$ in the skeleton:
> - If $X_k \notin \text{sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (v-structure)
> - If $X_k \in \text{sep}(X_i, X_j)$: leave $X_i - X_k - X_j$ undirected
^alg-vstructure

**Intuition:** The separating set $\text{sep}(X_i, X_j)$ is the set of conditioning
variables that renders $X_i \perp X_j$. For a true v-structure $X_i \to X_k \leftarrow X_j$:
- Marginally: $X_i$ and $X_j$ are independent (no path) — so $\text{sep}(X_i,X_j)$ can be $\emptyset$
- Conditionally on $X_k$: $X_i$ and $X_j$ become *dependent* (explaining-away / Berkson's paradox)
- Therefore $X_k$ is NOT in the separating set $\Rightarrow$ v-structure

For a chain or fork through $X_k$ (e.g., $X_i \to X_k \to X_j$ or $X_i \leftarrow X_k \to X_j$):
- $X_k$ blocks the path when conditioned on, so $\text{sep}(X_i,X_j) \ni X_k$
- Therefore $X_k$ IS in the separating set $\Rightarrow$ no v-structure

### Phase 3: Meek Orientation Rules

After v-structure orientation, the CPDAG may still contain undirected edges that can be
further oriented *without* creating new v-structures or directed cycles. Meek (1995)
proved that four rules suffice to complete all such orientations.

> [!theorem] Meek Rules R1–R4 (Meek 1995)
> Apply these rules exhaustively until no more edges can be oriented:
>
> **R1 (Avoid new v-structure):** If $\alpha \to \beta - \gamma$ and $\alpha$ is not
> adjacent to $\gamma$, then orient $\beta \to \gamma$.
> *Reason:* If $\beta - \gamma$ stayed undirected and we later needed $\gamma \to \beta$,
> we would create a new v-structure $\alpha \to \beta \leftarrow \gamma$, contradicting
> the skeleton.
>
> **R2 (Avoid directed cycle):** If $\alpha \to \beta \to \gamma$ and $\alpha - \gamma$,
> then orient $\alpha \to \gamma$.
> *Reason:* If we oriented $\gamma \to \alpha$ we would create a cycle $\alpha \to \beta \to \gamma \to \alpha$.
>
> **R3 (Unique parent):** If $\alpha - \beta$, and there exist $\gamma \to \beta$ and
> $\delta \to \beta$ with $\alpha - \gamma$, $\alpha - \delta$, and $\gamma$ not adjacent
> to $\delta$, then orient $\alpha \to \beta$.
> *Reason:* Otherwise, both $\gamma - \alpha - \delta$ triples would create v-structures.
>
> **R4 (Avoid non-identifiable orientation):** If $\alpha - \beta$, $\beta \to \gamma$,
> $\gamma \to \delta$, $\alpha - \delta$, and $\alpha$ not adjacent to $\gamma$,
> then orient $\alpha \to \beta$.
^thm-meek-rules

> [!note] Completeness of Meek Rules
> Meek (1995) proved that R1–R4 are **complete**: applying them exhaustively to the
> v-structure-oriented graph yields the unique CPDAG for the equivalence class. Any
> remaining undirected edges are genuinely unidentifiable from observational data.

## Examples

> [!example] Example: Full PC Run on a 4-Variable Chain
> **True DAG:** $A \to B \to C \to D$.
>
> **Phase 1 (skeleton):**
> - $A \perp C \mid B$: yes (B blocks chain). Remove $A-C$.
> - $A \perp D \mid B$: yes (B blocks). Remove $A-D$.
> - $B \perp D \mid C$: yes (C blocks). Remove $B-D$.
> - Remaining: $A-B$, $B-C$, $C-D$. Sep sets: $\text{sep}(A,C)=\{B\}$, etc.
>
> **Phase 2 (v-structures):**
> - Unshielded triple $A-B-C$: $B \in \text{sep}(A,C)=\{B\}$ ✓ → no v-structure, leave $A-B-C$ undirected.
> - Unshielded triple $B-C-D$: $C \in \text{sep}(B,D)=\{C\}$ ✓ → no v-structure.
> - No v-structures found.
>
> **Phase 3 (Meek rules):**
> - No directed edges to propagate from.
> - CPDAG: $A - B - C - D$ (all edges undirected).
>
> **Interpretation:** A chain ($A \to B \to C \to D$), its reverse, and the three
> "diamonds" ($A \leftarrow B \to C \to D$, etc.) are all Markov equivalent. PC
> correctly identifies that direction cannot be determined from observational data alone.

> [!example] Example: Fork vs. V-structure Disambiguation
> **Setting:** $A - C - B$ unshielded. Two cases:
>
> Case 1 — true DAG is **fork** $A \leftarrow C \to B$:
> - $A \perp B \mid C$: yes → $\text{sep}(A,B) = \{C\}$ → $C \in \text{sep}$ → no v-structure
> - CPDAG leaves $A - C - B$ undirected
>
> Case 2 — true DAG is **v-structure** $A \to C \leftarrow B$:
> - $A \perp B$ marginally: yes → $\text{sep}(A,B) = \emptyset$ → $C \notin \text{sep}$ → v-structure!
> - CPDAG orients $A \to C \leftarrow B$ ✓

## Connections

- **PC vs. GES**: PC uses CI tests (constraint-based); GES uses BIC scores (score-based).
  For large $d$ with sparse graphs, both are polynomial; GES is often more accurate but
  requires score-equivalence. See [[GES - Overview]].
- **NOTEARS comparison**: The NOTEARS experiments (Table 1 in [[NOTEARS Experiments]])
  show that PC performs worse than NOTEARS on dense or large graphs because the maximum
  conditioning set size grows with the degree.
- **FCI extension**: when hidden confounders exist, the v-structure detection must be
  augmented with PAG-specific steps; FCI (Fast Causal Inference) handles this.
- **Interventional PC (IPC)**: with known interventions, oriented edges from interventional
  data directly constrain the skeleton and orientation steps.

## See Also

- [[PC Algorithm - Overview]] — assumptions (Markov, Faithfulness, Sufficiency), CPDAG definition
- [[GES - Overview]] — score-based alternative (same CPDAG output, different procedure)
- [[GES - Forward and Backward Search]] — Insert/Delete operators and BIC scoring
- [[NOTEARS Algorithm]] — continuous-optimization alternative; PC is a baseline
- [[DAG Structure Learning Problem]] — NP-hardness context; landscape of methods
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion used in interpretation
