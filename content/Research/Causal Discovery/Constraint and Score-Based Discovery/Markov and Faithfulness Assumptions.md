---
title: Markov and Faithfulness Assumptions
tags:
  - source/ingested
  - topic/causal-inference
  - type/definition
  - doc/paper
source: "[[raw/Glymour Zhang Spirtes 2019 - Review of Causal Discovery Methods.pdf]]"
source_location: "Sec. 2 (Directed Graphical Causal Models), pp. 2-3"
date_ingested: 2026-06-28
folder: "Causal Discovery/Constraint and Score-Based Discovery"
doc_type: paper
depends_on:
  - "[[Causal Discovery - Overview]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm and Constraint-Based Discovery]]"
  - "[[GES and Score-Based Discovery]]"
aliases:
  - Causal Markov Assumption
  - Causal Faithfulness Assumption
  - Markov Equivalence Class
  - CPDAG
  - d-separation
---

# Markov and Faithfulness Assumptions

> [!summary]
> Causal discovery from independence constraints rests on two assumptions that link the **graph** to the **probability distribution**. The **Causal Markov assumption** says the graph's **d-separations imply** conditional independencies in $P$. The **Causal Faithfulness assumption** says the **only** independencies in $P$ are those entailed by d-separation (no "accidental" cancellations). Together they make conditional independence a faithful readout of graph structure. Because many DAGs share the same d-separations, the recoverable object is a **Markov equivalence class**, represented as a **CPDAG**.

## Overview

A DGCM pairs a directed graph with a joint distribution. For an acyclic graph, the pairing is constrained by a graphical condition — **d-separation** — that must imply conditional independence in $P$. The two assumptions below formalize the bridge in both directions (graph $\Rightarrow$ independence, and independence $\Rightarrow$ graph) and underpin all constraint-based and (in weaker form) score-based discovery.

## Main Content

> [!definition] Paths, colliders, and d-separation
> A **path** from $X_1$ to $X_n$ is a sequence of distinct vertices with an edge between each consecutive pair. $X_i$ is a **collider** on a path $P$ iff $P$ contains $X_{i-1} \to X_i \leftarrow X_{i+1}$ (a common effect of its neighbors on the path). For disjoint sets $X, Y, S$: $X$ is **d-separated** from $Y$ given $S$ iff every path between a member of $X$ and a member of $Y$ is **blocked** by $S$, where a path is blocked if either (1) it contains a non-collider that is in $S$, or (2) it contains a collider that is **not** in $S$ and **none of whose descendants** are in $S$. ^d-separation

> [!definition] Local Markov condition
> Every variable $X$ in a DAG is independent of its **non-descendants** conditional on its **parents** (the variables with edges directed into $X$):
> $$
> X \perp \text{NonDesc}(X) \mid \text{Pa}(X).
> $$
> Intuitively, the direct causes (parents) "screen off" $X$ from all more remote causes. ^local-markov

> [!definition] Causal Markov Assumption
> When the Markov condition holds for a causal graph $\mathcal{G}$ and its population distribution $P$, this is the **Causal Markov assumption**: every d-separation in $\mathcal{G}$ **implies** the corresponding conditional independence in $P$. This gives the necessary direction graph $\Rightarrow$ independence. ^causal-markov

> [!definition] Causal Faithfulness Assumption
> d-separation and related graphical properties give only **necessary, not sufficient** conditions for independence — a distribution could have **extra** independencies (e.g., from exactly cancelling causal pathways) not entailed by the graph. When **no such extra** independencies occur — i.e., the only independencies in $P$ are those forced by d-separation — $P$ is said to be **faithful** to $\mathcal{G}$. Assuming this of the causal graph and its population distribution is the **Causal Faithfulness assumption**. It supplies the converse direction independence $\Rightarrow$ d-separation, letting algorithms read structure off observed independencies. ^causal-faithfulness

> [!theorem] Markov equivalence and the CPDAG
> Graphs with the **same** d-separation relations are **Markov equivalent** and imply the same conditional independence relations; the collection of all DAGs Markov equivalent to a given one is a **Markov Equivalence Class (MEC)**. Constraint-based search using only conditional independence cannot distinguish members of an MEC. The MEC is represented by a **pattern** or **CPDAG (Completed Partially Directed Acyclic Graph)** — a graph with a mixture of **directed** edges (orientation shared by all members) and **undirected** edges (orientation differs across members). ^mec-cpdag

> [!theorem] What is shared within an MEC
> Two DAGs are Markov equivalent iff they have (1) the same **skeleton** (same adjacencies, ignoring direction) and (2) the same **v-structures** (unshielded colliders $A \to B \leftarrow C$ with $A,C$ non-adjacent). These two invariants are exactly what conditional-independence tests can recover; everything else stays undirected in the CPDAG. ^equivalence-invariants

## Examples

- For the structure $X \to Z \to W$, $Y \to Z$ (Figure 1A), d-separation yields $X \perp Y$ and $\{X,Y\} \perp W \mid Z$ — precisely the independencies a faithful distribution must exhibit, and the ones [[PC Algorithm and Constraint-Based Discovery|PC]] tests for.
- A **faithfulness violation**: if $X \to Y$ has two pathways (direct and indirect) whose effects exactly cancel, then $X \perp Y$ holds in $P$ despite the edge — the distribution is unfaithful and constraint-based methods would wrongly delete the edge.

## Connections

- Provides the theoretical license for [[PC Algorithm and Constraint-Based Discovery]] (needs both assumptions) and [[GES and Score-Based Discovery]] (needs Markov plus a weaker-than-faithfulness condition).
- [[Functional Causal Models (LiNGAM, ANM)]] go **beyond** these assumptions to orient edges left undirected within an MEC.
- Built on the DAG/d-separation foundations in [[Directed Acyclic Graphs]] and [[Summary Causal DAGs]].

## See Also

- [[Causal Discovery - Overview]]
- [[PC Algorithm and Constraint-Based Discovery]]
- [[GES and Score-Based Discovery]]
- [[Directed Acyclic Graphs]]
