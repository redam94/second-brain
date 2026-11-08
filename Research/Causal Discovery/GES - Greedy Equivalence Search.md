---
title: "GES - Greedy Equivalence Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Chickering (2002), JMLR 3:507–554 [PDF not downloaded — network restricted]"
source_location: "§1–5; Theorem 15 (Meek Conjecture proof); Algorithm 1 (Insert); Algorithm 2 (Delete)"
date_ingested: 2026-11-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
  - "[[PC Algorithm]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FGS"
  - "Chickering 2002"
---

# GES — Greedy Equivalence Search

> [!summary]
> **GES** (Greedy Equivalence Search; Chickering 2002) is the foundational **score-based**
> algorithm for causal structure learning. Unlike PC ([[PC Algorithm]]), which searches over
> skeletons via CI tests, GES searches directly over the space of **Markov equivalence classes**
> (CPDAGs) using **Insert** and **Delete** operators that locally modify the CPDAG while
> preserving its validity. GES consists of two greedy phases: a **forward phase** that adds
> edges and a **backward phase** that removes them. Under faithfulness + a consistent scoring
> criterion, GES is **statistically consistent** — it recovers the true CPDAG in the
> large-sample limit. Chickering (2002) proves this by establishing the **Meek Conjecture**:
> every I-map of a DAG is reachable from the empty DAG by a sequence of score-improving
> Insert operators.

## Overview

The key insight behind GES is to search not over the combinatorial space of DAGs (which is
NP-hard — see [[DAG Structure Learning Problem]]) but over the **quotient space** of Markov
equivalence classes (MECs), represented as CPDAGs. This reduces the search space from
super-exponentially many DAGs to a smaller (but still exponential) number of MECs, while
the **greedy** strategy makes it tractable.

GES builds on two earlier ideas:
1. **Score-based learning**: score functions like BIC decompose over nodes, enabling local moves.
2. **CPDAG operators** (Chickering 1995): Insert and Delete operators move between adjacent MECs
   with a provable property: each operator corresponds to exactly one edge addition/removal.

The forward/backward two-phase design is key: the forward phase often over-estimates the number
of edges (over-fitting), and the backward phase corrects this by removing spurious edges.

## Main Content

### Score decomposability

> [!definition] Definition: Decomposable scoring criterion
> A scoring criterion $S(G, \mathbf{X})$ is **decomposable** if it factors as
> $$S(G, \mathbf{X}) = \sum_{j=1}^{d} s\bigl(X_j,\, \text{Pa}_G(X_j),\, \mathbf{X}\bigr)$$
> where the **local score** $s(X_j, \text{Pa}_G(X_j), \mathbf{X})$ depends only on node $X_j$
> and its parents in $G$.
>
> **Standard examples:** BIC $= \hat\ell - \frac{k}{2}\log n$ (penalized log-likelihood);
> BDeu and BGe (Bayesian scores); MDL. All are decomposable.
>
> **Why it matters:** Decomposability allows updating the score of a CPDAG change *locally* —
> only the local scores of affected nodes change, not the entire score. This makes greedy
> operators $O(d^2)$ per edge insertion/deletion.
^def-decomposable-score

### The Insert and Delete operators

> [!definition] Definition: Insert operator (Chickering 1995, 2002)
> Let $\mathcal{E}$ be a CPDAG, $X$ and $Y$ non-adjacent nodes. The **Insert($X$, $Y$, $T$)**
> operator, where $T \subseteq \text{Adj}_\mathcal{E}(Y) \setminus \text{Adj}_\mathcal{E}(X)$
> and $T$ is a **clique** (every pair in $T$ is adjacent), does the following:
> 1. Insert the edge $X \to Y$.
> 2. For every $Z \in T$: orient $Z \to Y$ (if $Z - Y$ was undirected).
> 3. Apply Meek's rules to exhaustion.
>
> The result is a valid CPDAG. The score change from Insert is:
> $$\Delta_+(X,Y,T) = s\bigl(Y, \text{Pa}(Y) \cup \{X\} \cup T\bigr) - s\bigl(Y, \text{Pa}(Y)\bigr)$$
> where $\text{Pa}(Y)$ denotes the current parent set of $Y$ in $\mathcal{E}$.
^def-insert-operator

> [!definition] Definition: Delete operator (Chickering 2002)
> Let $\mathcal{E}$ be a CPDAG with an edge $X \to Y$ or $X - Y$, and $H \subseteq
> \text{Adj}_\mathcal{E}(X) \cap \text{Adj}_\mathcal{E}(Y)$ a clique. The **Delete($X$, $Y$, $H$)**
> operator:
> 1. Removes the edge between $X$ and $Y$.
> 2. For every $Z \in H$: orients $Z - Y$ as $Z \to Y$ (turns neighborhood members into parents).
> 3. Applies Meek's rules to exhaustion.
>
> Score change: $\Delta_-(X,Y,H) = s\bigl(Y, \text{Pa}(Y) \cup H \setminus \{X\}\bigr) - s\bigl(Y, \text{Pa}(Y)\bigr)$.
^def-delete-operator

### The two-phase GES algorithm

> [!definition] Algorithm: GES (Chickering 2002)
> **Input:** Data $\mathbf{X}$; decomposable scoring criterion $S$.
>
> **Phase 1 — Forward Equivalence Search (FES):**
> 1. Start with the empty CPDAG $\mathcal{E}_0$ (no edges).
> 2. While there exists an Insert($X$, $Y$, $T$) with $\Delta_+(X,Y,T) > 0$:
>    - Apply the Insert with the highest $\Delta_+$.
> 3. Output $\mathcal{E}^*_{\text{fwd}}$ (local maximum in the forward direction).
>
> **Phase 2 — Backward Equivalence Search (BES):**
> 4. Start with $\mathcal{E}^*_{\text{fwd}}$.
> 5. While there exists a Delete($X$, $Y$, $H$) with $\Delta_-(X,Y,H) > 0$:
>    - Apply the Delete with the highest $\Delta_-$.
> 6. Output $\hat{\mathcal{E}}$ (the final CPDAG).
>
> **Output:** CPDAG $\hat{\mathcal{E}}$.
^alg-ges

**Why two phases?** In finite samples, the forward phase tends to include too many edges (variance
of score estimates encourages spurious additions). The backward phase removes edges whose local
score contribution is negative, correcting the over-estimation. Under population-level scores
(infinite data), the forward phase alone suffices — it reaches the true CPDAG exactly.

### The Meek Conjecture and GES consistency

The key theoretical result of Chickering (2002) is a **proof of the Meek Conjecture**, which
implies GES's consistency.

> [!definition] Definition: I-map
> DAG $H$ is an **independence map (I-map)** of DAG $G$ if every CI relation entailed by $G$
> is also entailed by $H$ (but $H$ may entail additional CI relations). Equivalently,
> every d-separation in $G$ is also a d-separation in $H$.
^def-imap

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> Let $G$ be a DAG and $H$ be a DAG that is an I-map of $G$. Then there exists a sequence of
> **Insert operators** that transforms the CPDAG $\mathcal{E}(H)$ into the CPDAG $\mathcal{E}(G)$
> such that at each step:
> 1. The resulting graph is a valid CPDAG.
> 2. The resulting DAG is an I-map of $G$ (the I-map property is maintained throughout).
>
> **Corollary:** If $H$ is any CPDAG and $G$ is a DAG that $H$ is an I-map of, GES's forward
> phase can reach $\mathcal{E}(G)$ from $\mathcal{E}(H)$.
>
> **Proof idea:** The proof constructs the sequence using **covered edge reversals** — reversals
> of edges $X \to Y$ where $\text{Pa}(X) = \text{Pa}(Y) \setminus \{X\}$. It shows (a) every
> I-map different from $G$ has a covered edge whose reversal moves closer to $G$; (b) covered
> edge reversals correspond to Insert operators; (c) covered edge reversals preserve the I-map
> property. This provides the constructive path from $H$ to $G$.
^thm-meek-conjecture

> [!theorem] Theorem: Consistency of GES (Chickering 2002)
> Let $P$ be a distribution **faithful** to a DAG $G$ satisfying the **positivity condition**
> (all conditional distributions are non-degenerate). Let $S_n$ be a **consistent scoring
> criterion** (assigns higher expected score to $G$ than any other DAG as $n \to \infty$;
> e.g., BIC). Then as $n \to \infty$:
> $$\hat{\mathcal{E}} \xrightarrow{P} \mathcal{E}(G).$$
> GES recovers the **true CPDAG** with probability tending to 1.
>
> **Key steps in the proof:**
> 1. The Meek Conjecture ensures the forward phase can reach $\mathcal{E}(G)$ from the empty graph
>    (the empty DAG is an I-map of every DAG).
> 2. Under faithfulness, $G$ scores strictly better than any other DAG in the large-sample limit,
>    so the forward phase *will* reach $\mathcal{E}(G)$ (not get stuck at a subgraph).
> 3. The backward phase only removes edges whose deletion improves the score;
>    under consistency of $S_n$, all false edges are removed and no true edges are.
^thm-ges-consistency

### Comparison with PC

| Property | PC | GES |
|----------|-----|-----|
| Approach | Constraint-based (CI tests) | Score-based (optimize $S$) |
| Search space | Skeleton → orient v-structures | CPDAGs (Insert/Delete in MEC space) |
| Consistency requirement | Faithfulness + consistent CI test | Faithfulness + consistent score |
| Finite-sample behavior | Sensitive to $\alpha$ (CI test level) | Sensitive to penalty parameter (e.g., BIC $\lambda$) |
| Scalability | Good for sparse, high-$d$ (bounded degree) | Better for small-$d$, large-$n$ |
| Output | CPDAG | CPDAG |
| Latent variables | No (use FCI) | No |
| Key assumption | Faithfulness + causal sufficiency | Faithfulness + causal sufficiency |

Both PC and GES output CPDAGs and are consistent under faithfulness. The choice depends on:
- **High-$d$, sparse:** PC (CI tests scale better with sparsity)
- **Low-$d$, continuous data:** GES (score decomposition is clean)
- **Large $n$:** Both converge; GES more stable (no multiple-testing issues)

### FGS (Fast GES)

Ramsey, Glymour & Sanchez-Romero (2017) introduced **FGS** (Fast Greedy Search), a
parallelized implementation of GES that caches local scores and parallelizes the Insert
enumeration step. FGS is what NOTEARS benchmarks against in [[NOTEARS Experiments]] ("FGS"
is the label used in the NOTEARS paper for the GES-family algorithm).

## Connections

- **BIC scoring and regularization:** With BIC, GES minimizes $-2\hat\ell + k\log n$ —
  equivalent to $\ell_0$-penalized log-likelihood. This connects to regularization in linear
  regression and to the [[Empirical Bayes]] perspective on model selection.
- **Bayesian structure learning:** BDeu and BGe scores replace BIC with Bayesian marginal
  likelihoods. GES with these scores is fully Bayesian in its score, though the search
  remains frequentist (MAP point estimate).
- **NOTEARS vs. GES:** NOTEARS ([[NOTEARS - Overview]]) works in $\mathbb{R}^{d\times d}$ directly,
  bypassing the CPDAG operators. NOTEARS and GES/FGS are complementary: NOTEARS is differentiable
  and works for large $d$; GES is combinatorial but has provable global guarantees under faithfulness.
- **IDA and ancestral IDA:** Given a CPDAG from GES, one can estimate total causal effects by
  averaging over all DAGs in the MEC (IDA algorithm, Maathuis et al. 2009).

## See Also
- [[Markov Equivalence and CPDAGs]] — CPDAG structure, Insert/Delete operators, Meek's rules
- [[PC Algorithm]] — constraint-based alternative; same CPDAG output
- [[DAG Structure Learning Problem]] — NP-hardness motivation for GES's greedy approach
- [[NOTEARS Experiments]] — GES/FGS as a baseline in the NOTEARS evaluation
- [[Directed Acyclic Graphs]] — the causal semantics of DAGs
