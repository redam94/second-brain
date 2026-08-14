---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2016-selective-GES.pdf]]"
source_location: "§2 Related Work & §3 Notation and Background, pp. 1–4"
date_ingested: 2026-08-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Constraint-Based vs Score-Based Causal Discovery]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES"
  - "BES"
  - "SGES"
  - "Selective GES"
  - "FGES"
---

# GES - Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the canonical **score-based** algorithm for causal structure learning. It searches directly over the space of **CPDAGs** — Markov equivalence classes — in two greedy phases: a **Forward Equivalence Search (FES)** that adds edges to reach an IMAP of the truth, and a **Backward Equivalence Search (BES)** that removes edges to reach the true CPDAG. Under the **Causal Markov**, **Faithfulness**, and **score consistency** conditions, GES is **provably correct** in the large-sample limit (Theorem 1, Chickering 2002). Unlike [[PC Algorithm]], GES never queries conditional independence directly; all decisions are score comparisons, making it naturally compatible with continuous data and flexible likelihood specifications. **SGES** (Selective GES; Chickering & Meek 2016) recovers polynomial complexity by restricting the search to Π-consistent operators.

## Overview

Score-based causal discovery casts DAG learning as optimisation: find the DAG $\mathcal{G}^*$ maximising a score $s(\mathcal{G}, D)$ that measures how well $\mathcal{G}$ explains data $D$. The classical challenge is that the search space $\mathbb{D}$ of DAGs grows superexponentially — so greedy search over DAGs risks cycling without guarantees.

GES solves this by searching over **equivalence classes** rather than individual DAGs, using CPDAGs as representatives (see [[Markov Equivalence and CPDAGs]]). The key insight: there is a natural **neighbourhood structure** on the CPDAG space defined by the elementary operators that add, remove, or reverse a single edge while remaining within some equivalence class. GES greedily walks this neighbourhood in two directed phases, and its correctness follows from the IMAP ordering and score consistency.

## Main Content

### Score Requirements

GES requires a score $s(\mathcal{G}, D)$ satisfying three properties:

> [!definition] Definition: Score Requirements for GES
> 1. **Equivalence**: $\mathcal{G} \approx \mathcal{G}' \Rightarrow s(\mathcal{G}, D) = s(\mathcal{G}', D)$ — equivalent DAGs have equal scores; the score depends only on the equivalence class.
> 2. **Local consistency**: For large $n$, the score correctly identifies whether adding an edge to $\mathcal{G}$ improves fit when evaluated against the true distribution — i.e. score improvements track actual d-separation failures.
> 3. **Decomposability**: $s(\mathcal{G}, D) = \sum_i s_i(\mathrm{Pa}^\mathcal{G}(X_i), D)$ — the score factors as a sum of local family scores. This enables efficient incremental computation when a single edge is added or removed.
^def-score-requirements

**Standard scores satisfying all three**: BIC (Bayesian Information Criterion) for Gaussian linear SEMs; BDeu score for discrete data. Both are equivalent-consistent and decomposable by construction.

### The IMAP Partial Order

GES exploits the **IMAP partial order** on equivalence classes (see [[Markov Equivalence and CPDAGs#^def-imap]]). Recall: $[\mathcal{G}] \leq [\mathcal{H}]$ when $[\mathcal{H}]$ is an IMAP of $[\mathcal{G}]$ — meaning $\mathcal{H}$ encodes at least as many independence claims. The complete graph $K_d$ is at the top (no independence claims); the empty graph is at the bottom (all variables independent).

Under local consistency, score improvements correspond precisely to moving down the IMAP ordering toward the truth.

### Phase 1 — Forward Equivalence Search (FES)

**Goal**: Starting from the empty graph (or any IMAP of the true CPDAG), greedily climb toward the true equivalence class by adding edges — each addition removes one spurious independence claim.

> [!definition] Definition: Insert Operator
> $\mathrm{Insert}(X, Y, H)$ adds an edge $X \to Y$ to a CPDAG $\mathcal{C}$, where $H \subseteq \mathrm{Adj}(Y) \setminus \{X\}$ is the set of undirected neighbours of $Y$ that become oriented toward $Y$ as a result. The operator must produce a valid CPDAG; validity conditions on $H$ are checked before application.
^def-insert-operator

**FES loop**:
1. Begin with the empty graph $\mathcal{C}_0$.
2. Repeat: find the Insert operator $\mathrm{Insert}^* = \arg\max_{\mathrm{Insert}} \Delta s$ where $\Delta s > 0$.
3. Apply $\mathrm{Insert}^*$; update the CPDAG.
4. Stop when no Insert operator improves the score.

**Guarantee after FES**: The resulting CPDAG $\mathcal{C}_{\mathrm{FES}}$ is an **IMAP of the true CPDAG** — it may have extra edges (false positives) but no missing edges (no false negatives).

### Phase 2 — Backward Equivalence Search (BES)

**Goal**: Starting from $\mathcal{C}_{\mathrm{FES}}$ (an IMAP of the truth), greedily descend toward the true equivalence class by removing edges — each removal adds one valid independence claim.

> [!definition] Definition: Delete Operator
> $\mathrm{Delete}(X, Y, H)$ removes the edge between $X$ and $Y$ from a CPDAG $\mathcal{C}$, where $H \subseteq \mathrm{Adj}(Y) \setminus \{X\}$ specifies which neighbours of $Y$ become un-oriented as a result. Validity conditions on $H$ are checked before application.
^def-delete-operator

**BES loop**:
1. Begin with $\mathcal{C}_{\mathrm{FES}}$.
2. Repeat: find the Delete operator $\mathrm{Delete}^* = \arg\max_{\mathrm{Delete}} \Delta s$ where $\Delta s > 0$.
3. Apply $\mathrm{Delete}^*$; update the CPDAG.
4. Stop when no Delete operator improves the score.

**Guarantee after BES**: The resulting CPDAG $\mathcal{C}_{\mathrm{BES}}$ is the **true CPDAG** in the large-sample limit under faithfulness and score consistency.

### Consistency Theorem

> [!theorem] Theorem 1 (Chickering 2002): GES Consistency
> Suppose the data are i.i.d. from a distribution faithful to a DAG $\mathcal{G}^*$ with a causally sufficient variable set. Let $s$ be a locally consistent, equivalence-invariant, decomposable score. Then:
> $$\mathcal{C}_{\mathrm{BES}} \xrightarrow{n \to \infty} \mathrm{CPDAG}(\mathcal{G}^*) \quad \text{almost surely.}$$
> The two-phase GES algorithm recovers the true equivalence class in the large-sample limit.
^thm-ges-consistency

The proof has two parts, corresponding to the two phases: (1) FES terminates at an IMAP of the truth, and (2) BES terminates at the truth given an IMAP start.

### Complexity and SGES

**GES complexity**: The number of Insert/Delete operators considered per step is $O(d^2 \cdot 2^{k_{\max}})$ where $k_{\max}$ is the maximum adjacency size. For dense graphs this is exponential.

**SGES** (Selective Greedy Equivalence Search; Chickering & Meek 2016) — the source paper for this vault note cluster — achieves **polynomial complexity** by restricting BES to **Π-consistent delete operators**:

> [!definition] Definition: Π-Consistent Delete Operator (Chickering & Meek 2016)
> Given an ordering $\Pi$ on $V$, a Delete operator $\mathrm{Delete}(X, Y, H)$ is **Π-consistent** if a specific ordering-consistency condition holds on the variables in $H$. SGES's backward phase (selective BES) only considers Π-consistent operators, reducing the search space from exponential to polynomial in $d$.
^def-pi-consistent

The ordering $\Pi$ is obtained from the FES result. SGES's Theorem 2 shows that SGES finds the same optimum as GES on the same IMAP start, so it inherits GES's consistency guarantee while running in polynomial time.

**FGES** (Fast GES; Ramsey et al. 2017): An independently developed parallelised variant of GES that achieves large-scale performance by caching score deltas; used in TETRAD. FGES was the baseline labelled "FGS" in the [[NOTEARS Experiments]] benchmarks.

### Comparison to PC Algorithm

| Property | GES | PC |
|----------|-----|----|
| Approach | Score-based | Constraint-based (CI tests) |
| Starting point | Empty graph (FES forward) | Complete graph (remove edges) |
| Search space | CPDAG space, both phases | Skeleton → orientations |
| Assumptions | Markov, faithfulness, score consistency | Markov, faithfulness, causal sufficiency |
| Finite-sample | Score fluctuations; BIC consistent at $n^{-1/2}$ rate | CI test errors; multiple testing burden |
| Order dependence | None (operators are non-sequential) | PC has it; PC-stable fixes it |
| Output | CPDAG | CPDAG |
| Dense graphs | BES expensive without SGES | Skeleton phase expensive |

See [[Constraint-Based vs Score-Based Causal Discovery]] for a systematic treatment.

## Examples

> [!example] Example: GES on the Three-Node Fork
> True DAG: $X \leftarrow Y \rightarrow Z$ (fork). True CPDAG: $X - Y - Z$ (undirected chain — fork, chain, and reverse chain are equivalent).
>
> **FES**: From the empty graph, GES tests all Insert operators. Adding $Y - X$ and $Y - Z$ improves the score (the marginal independences $X \perp\!\!\!\perp Y$ and $Y \perp\!\!\!\perp Z$ are false). Adding $X - Z$ does not improve the score (because $X \perp\!\!\!\perp Z \mid Y$). FES terminates with $\mathcal{C}_\mathrm{FES} = \{X - Y, Y - Z\}$ — already the true skeleton with no spurious edges in this simple case.
>
> **BES**: No Delete operator improves the score. Terminates at $\mathcal{C}_\mathrm{BES} = X - Y - Z$ (correct CPDAG).

## Connections

- **Foundational concept**: [[Markov Equivalence and CPDAGs]] — GES operates natively in CPDAG space; Insert/Delete operators are defined over CPDAGs.
- **Contrast with NOTEARS**: [[NOTEARS - Overview]] and [[NOTEARS Experiments]] show that NOTEARS (continuous optimisation) outputs a DAG, not a CPDAG. This is a principled difference: NOTEARS picks an arbitrary representative of the equivalence class, while GES explicitly represents the class. Empirically, NOTEARS outperforms FGS (=FGES) on dense graphs; GES has the theoretical consistency guarantee.
- **SGES source**: [[raw/chickering2016-selective-GES.pdf]] is the primary source for this note, covering GES in §3 and SGES in full.
- **Problem setup**: [[DAG Structure Learning Problem]] defines the SEM, score $F(W)$, and the landscape of methods in which GES is situated.

## Software

- **pcalg** (R): `ges()` function. Supports BIC, BDeu, and custom scores. Also `gies()` for interventional data.
- **causal-learn** (Python): `ges()` in the `causallearn` package.
- **TETRAD / FGES** (Java/GUI): Parallelised FGES scales to thousands of variables.
- **py-tetrad** (Python wrapper for TETRAD): exposes FGES from Python.

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAGs, IMAP order, compelled/reversible edges
- [[PC Algorithm]] — constraint-based alternative targeting the same CPDAG
- [[Constraint-Based vs Score-Based Causal Discovery]] — paradigm comparison
- [[DAG Structure Learning Problem]] — score-based setup; landscape table of prior methods
- [[NOTEARS Experiments]] — empirical comparison where FGES (=FGS) is the primary baseline
