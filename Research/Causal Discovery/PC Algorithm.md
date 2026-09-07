---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo2014-PC-stable-source.md]]"
source_location: "§3–4, pp. 3930–3942 (PC-stable algorithm, consistency proofs)"
date_ingested: 2026-09-07
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[DAG Structure Learning Problem]]"
  - "[[Summary Causal DAGs]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-stable"
  - "Spirtes Glymour Scheines"
  - "constraint-based DAG learning"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes, Glymour & Scheines, 2000; named for **P**eter Spirtes and
> **C**lark Glymour) is the canonical constraint-based causal structure learning algorithm.
> It learns a DAG skeleton by systematically removing edges that are rendered CI by some
> conditioning set, then orients v-structures and applies Meek rules to produce a CPDAG.
> **PC-stable** (Colombo & Maathuis, 2014) fixes the original algorithm's order-dependence
> in high dimensions. Under faithfulness, Markov, and causal sufficiency, PC-stable
> consistently estimates the CPDAG of the true DAG as sample size grows.

## Overview

The PC algorithm operates in two major phases:
1. **Skeleton phase**: determine which pairs of variables are adjacent (connected by a directed
   or undirected path with no conditional independence) using a sequence of CI tests.
2. **Orientation phase**: determine edge directions using v-structure detection and Meek's
   orientation propagation rules.

The algorithm is elegant in that it never explicitly searches over DAGs; instead, it exploits
the Markov condition to prune the edge set via CI tests, and the faithfulness condition to
guarantee that removed edges correspond to absent graph edges.

## Main Content

### Algorithm 1: PC-Stable (Colombo & Maathuis, 2014)

> [!definition] PC-Stable Algorithm
> **Input:** Variables $V = \{X_1,\ldots,X_d\}$; CI test oracle at significance level $\alpha$.
>
> **Phase 1 — Skeleton Learning (order-independent):**
>
> Initialise: Complete undirected graph $\hat{\mathcal{S}} = K_d$; $\mathrm{Sep}[i,j] = \emptyset$ for all $(i,j)$.
>
> For $\ell = 0, 1, 2, \ldots$ while any adjacent pair has $|\mathrm{Adj}(X_i)\setminus\{X_j\}| \geq \ell$:
>
> &emsp;&emsp;(a) Collect edges to remove: $\text{Remove} := \emptyset$.
>
> &emsp;&emsp;For each adjacent pair $(X_i, X_j)$ in current $\hat{\mathcal{S}}$:
>
> &emsp;&emsp;&emsp;&emsp;For each $\mathbf{S} \subseteq \mathrm{Adj}(X_i)\setminus\{X_j\}$ with $|\mathbf{S}|=\ell$:
>
> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;If CI-test$(X_i, X_j \mid \mathbf{S})$ returns independence:
>
> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;$\text{Remove} := \text{Remove} \cup \{(X_i, X_j)\}$;
> $\mathrm{Sep}[i,j] := \mathrm{Sep}[j,i] := \mathbf{S}$; break.
>
> &emsp;&emsp;(b) Remove all edges in $\text{Remove}$ from $\hat{\mathcal{S}}$. ← **Key fix vs. original PC**
>
> **Phase 2 — V-structure orientation:**
>
> For each unshielded triple $(X_i, X_k, X_j)$ (i.e., $X_i - X_k - X_j$, $X_i \not\sim X_j$):
> If $X_k \notin \mathrm{Sep}[i,j]$: orient $X_i \to X_k \leftarrow X_j$.
>
> **Phase 3 — Meek rules:**
>
> Repeatedly apply Meek's R1–R4 (see [[Markov Equivalence Classes and CPDAGs#thm-meek-rules]])
> until no further orientations are possible.
>
> **Output:** CPDAG $\hat{\mathcal{C}}$.
^alg-pc-stable

**Critical distinction (PC vs PC-stable):** In the original PC, edges are removed
*immediately* after testing, which changes the adjacency sets $\mathrm{Adj}(X_i)$ mid-loop.
PC-stable collects all removals for level $\ell$ first (step a), then removes them (step b).
This makes the skeleton order-independent.

### Why V-structure Orientation Works

For an unshielded triple $X_i - X_k - X_j$ (with $X_i \not\sim X_j$):
- **$X_k$ is a collider** ($X_i \to X_k \leftarrow X_j$) iff $X_k \notin \mathrm{Sep}[i,j]$.
  Faithfulness implies: if $X_k$ is a collider, conditioning on it makes $X_i$ and $X_j$
  *dependent* (opens the collider path), so *any* set separating them cannot include $X_k$.
- **$X_k$ is not a collider** iff $X_k \in \mathrm{Sep}[i,j]$.
  Conditioning on $X_k$ blocks the chain/fork path, enabling separation.

The test $X_k \in \mathrm{Sep}[i,j]$ is therefore the correct oracle for collider detection.

### Worked Example: Four Variables

> [!example] PC on a Four-Variable DAG
> True DAG: $A \to C \leftarrow B \to D$.
> (V-structure: $A \to C \leftarrow B$; chain: $B \to D$; $A$ and $B$ are marginally independent.)
>
> **Level 0 (marginal independence):** Test all pairs. Only $A \perp\!\!\!\perp B$ passes
> (they have no common cause and no connecting path). Remove edge $A - B$.
>
> **Level 1 (conditioning on singletons):** Test remaining pairs.
> - $A \perp\!\!\!\perp D \mid \{B\}$? Yes (B blocks $A - C \leftarrow B \to D$). Wait — actually
>   $A$ and $D$ are independent marginally but connected through $C$? No: $A \to C \leftarrow B \to D$
>   means $A$ and $D$ are marginally independent (collider $C$ blocks without conditioning). So
>   at level 0, $A \perp\!\!\!\perp D$: remove $A - D$.
> - Other pairs: $A - C$ (not separable, $A$ and $C$ are adjacent), $B - C$ (adjacent),
>   $B - D$ (adjacent), $C - D$ (not in true DAG — test $C \perp\!\!\!\perp D \mid \{B\}$:
>   yes, $B$ d-separates them, so remove $C - D$).
>
> **Skeleton recovered:** $A - C$, $B - C$, $B - D$.
>
> **V-structures:** Only unshielded triple is $A - C - B$ (with $A \not\sim B$).
> $\mathrm{Sep}[A,B] = \emptyset$ (removed at level 0) and $C \notin \emptyset$,
> so orient $A \to C \leftarrow B$. ✓
>
> **Meek rules:** $B - D$ with $B \to C$ already oriented. Meek R1 ($B \to C - D$: not applicable).
> $D$ remains undirected since no rule fires. So $B - D$ stays undirected in the CPDAG.
>
> **Output CPDAG:** $A \to C \leftarrow B - D$. The edge $B - D$ is undirected because
> both $B \to D$ and $B \leftarrow D$ are consistent with the observed CI structure.

### Practical Considerations

**Choice of significance level $\alpha$:** Lower $\alpha$ → fewer edges removed → denser
graph (false positives in the skeleton). Higher $\alpha$ → more edges removed → sparser
graph (false negatives). Typical values: $\alpha \in \{0.01, 0.05\}$ for moderate $n$;
lower for large $n$ where the test has high power.

**High-dimensional setting:** When $d \gg n$, large conditioning sets $\mathbf{S}$ (level
$\ell \geq 2$) require many samples. The **PC algorithm with skeleton pruning** caps
$\ell$ at some $\ell_{\max}$ for computational feasibility, at the cost of possibly missing
some edge removals. The **MMHC** algorithm hybridizes PC skeleton learning with GES score
optimization.

**Software:**
- R: `pcalg` package — `pc()` and `skeleton()` functions implement PC-stable by default.
- Python: `causal-learn` — `PC()` class with multiple CI test options.

## Connections

- [[Constraint-Based Causal Discovery]] — the general paradigm; this note covers the specific PC algorithm
- [[Markov Equivalence Classes and CPDAGs]] — what PC outputs (a CPDAG) and why
- [[Greedy Equivalence Search (GES)]] — the score-based alternative to PC; both output CPDAGs
- [[DAG Structure Learning Problem]] — the general problem; NOTEARS is the continuous-optimization competitor
- [[NOTEARS Algorithm]] — competes on the same benchmarks (SHD, FDR, TPR) as PC in Zheng et al. 2018
- [[Directed Acyclic Graphs]] — d-separation, the CI criterion underlying the PC oracle
- [[BN Construction Methods Comparison]] — PC is one of the methods compared for Bayesian network learning

## See Also
- [[Constraint-Based Causal Discovery]] — CI testing, faithfulness, and the skeleton-learning framework
- [[Markov Equivalence Classes and CPDAGs]] — Meek rules, v-structures, MEC theory
- [[Greedy Equivalence Search (GES)]] — score-based alternative with different finite-sample properties
- [[Summary Causal DAGs]] — downstream use: PC can learn a causal graph to summarize ABM output
