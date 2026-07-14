---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Causal-Structure-Learning-Survey.md]]"
source_location: "Chickering (2002) JMLR §3–6; Ramsey et al. (2017) (FGES); Meek (1995) UAI (Meek Conjecture)"
date_ingested: 2026-07-14
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Constraint-Based Causal Discovery]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "FGES"
  - "Fast Greedy Equivalence Search"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
  - "Chickering 2002"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering 2002) is the canonical **score-based** causal structure learning algorithm.
> It searches greedily over **Markov equivalence classes** (CPDAGs) rather than individual DAGs,
> in two phases: a **Forward Equivalence Search** (FES) that greedily adds edges, followed by a
> **Backward Equivalence Search** (BES) that greedily removes them. Under faithfulness and the
> Causal Markov Condition, GES is **consistent** — it recovers the true CPDAG in the limit
> $n\to\infty$. The paper also proves the **Meek Conjecture**, connecting covered edge reversals
> to MEC structure.

## Overview

Score-based causal discovery optimises a model-selection score (typically BIC) over candidate
structures, avoiding explicit conditional independence tests. GES navigates this optimisation by
working in the space of **Markov equivalence classes** — a key insight that avoids redundant
search over the many DAGs within a single equivalence class.

The central algorithmic innovation: **operators on CPDAGs** that move between equivalence
classes in small steps (edge insertions and deletions), each step provably computable in
polynomial time. The theoretical backbone is the **Meek Conjecture** (proved in the same paper),
which guarantees that any two equivalent DAGs are connected by a path of covered edge reversals.

## Main Content

### The Score Function

> [!definition] Definition: Consistent decomposable score (Chickering 2002 §2)
> A score $Q(G, \mathbf{X})$ is **consistent** if, as $n \to \infty$:
> 1. **Faithfulness:** If $G$ is faithful to the true distribution $P$, then $\mathbb{E}[Q(G)] > \mathbb{E}[Q(G')]$ for all $G' \not\equiv G$ (true MEC has the highest expected score).
> 2. **Penalisation:** For DAGs $G_1 \subsetneq G_2$ (same skeleton except $G_2$ has one more
>    edge), $\mathbb{E}[Q(G_1)] > \mathbb{E}[Q(G_2)]$ when the extra edge is absent in the truth.
>
> A score is **decomposable** if it factors over nodes:
> $$Q(G, \mathbf{X}) = \sum_{j=1}^{d} Q_j\!\left(\mathrm{Pa}_G(X_j),\,\mathbf{X}\right).$$
> Decomposability enables $O(1)$ score updates when a single edge is added or removed.
^def-score

> [!definition] Definition: BIC score for Gaussian linear SEM
> Under Gaussian linear SEM, the BIC score decomposes as:
> $$Q_{\mathrm{BIC}}(G, \mathbf{X}) = \sum_{j=1}^{d} \left[-\frac{n}{2}\ln \hat\sigma^2_{j\mid\mathrm{Pa}(j)} - \frac{\log n}{2}\bigl(|\mathrm{Pa}_G(X_j)| + 1\bigr)\right],$$
> where $\hat\sigma^2_{j\mid\mathrm{Pa}(j)}$ is the residual variance of regressing $X_j$ on its
> parents. The second term penalises model complexity ($|\mathrm{Pa}_G(X_j)|+1$ parameters
> for node $j$, including the intercept). BIC is consistent under Gaussianity (Schwarz 1978).
^def-bic

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Definition: Edge insertion operator $\mathrm{Insert}(X,Y,T)$ (Chickering 2002 §4.1)
> Given a CPDAG $H$, an operator $\mathrm{Insert}(X,Y,T)$ is **valid** if:
> - $X$ and $Y$ are not adjacent in $H$.
> - $T \subseteq \mathrm{Adj}_H(X) \cap \mathrm{Adj}_H(Y)$ (the "turn set" $T$ is a clique in $H$).
> - Every path from $Y$ to $X$ in $H$ passes through a node in $T$ (semi-directed path condition).
>
> A valid insertion adds a directed edge $X \to Y$ to a DAG in the equivalence class and moves
> to the new equivalence class. The score gain of the insertion is:
> $$\Delta Q_\mathrm{Insert}(X,Y,T) = Q_Y(\mathrm{Pa}_{G'}(Y)) - Q_Y(\mathrm{Pa}_G(Y)),$$
> where $G'$ is the DAG after insertion (score is local — only node $Y$ changes parents).
^def-insert

> [!definition] Definition: FES procedure (Chickering 2002, §5.1)
> 1. Start with $\widehat{H} = \emptyset$ (empty CPDAG).
> 2. Among all valid insertions $\mathrm{Insert}(X,Y,T)$: find the one with maximum $\Delta Q$.
> 3. If $\Delta Q > 0$: apply the insertion, update the CPDAG, go to step 2.
> 4. Else: **stop** — output FES CPDAG $\widehat{H}_{\mathrm{FES}}$.
^def-fes

> [!theorem] Theorem: FES skeleton lemma (Chickering 2002, Lemma 14)
> In the population limit, FES never inserts an edge $\{X,Y\}$ that is absent from the skeleton
> of the true DAG $G^*$. Every edge FES inserts corresponds to a true adjacency.
>
> **Implication.** FES can overshoot (insert too many edges within the true skeleton) but never
> adds a genuinely false edge. BES is needed to remove the surplus.
^thm-fes-skeleton

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Definition: Edge deletion operator $\mathrm{Delete}(X,Y,H)$ (Chickering 2002 §4.2)
> Given a CPDAG $H$, a deletion $\mathrm{Delete}(X,Y,H)$ is **valid** if $X$ and $Y$ are
> adjacent in $H$ and the deletion produces a valid CPDAG (acyclic, Markov equivalence class
> satisfies graphical conditions).
>
> The score gain is:
> $$\Delta Q_\mathrm{Delete}(X,Y,H) = Q_Y(\mathrm{Pa}_{G'}(Y)) - Q_Y(\mathrm{Pa}_G(Y)),$$
> (only node $Y$'s local score changes when the edge incident on $Y$ is removed).
^def-delete

> [!definition] Definition: BES procedure (Chickering 2002, §5.2)
> 1. Start with $\widehat{H}_{\mathrm{FES}}$ (output of FES).
> 2. Among all valid deletions $\mathrm{Delete}(X,Y,H)$: find the one with maximum $\Delta Q$.
> 3. If $\Delta Q > 0$: apply deletion, update CPDAG, go to step 2.
> 4. Else: **stop** — output $\widehat{H}_{\mathrm{BES}}$ as the final CPDAG.
^def-bes

### Main Consistency Theorem

The proof relies crucially on the **Meek Conjecture** (also proved in Chickering 2002):
any two Markov equivalent DAGs are connected by covered edge reversals (see
[[Markov Equivalence and CPDAGs#^thm-covered-reversals]]). This ensures that the GES
score function has a unimodal structure over equivalence classes (no local optima that are
not global, in the population limit).

> [!theorem] Theorem: GES consistency (Chickering 2002, Theorem 15)
> Let $G^*$ be the true DAG with CPDAG $H^*$. Assume:
> - The distribution $P$ satisfies the Causal Markov Condition w.r.t. $G^*$.
> - $P$ is faithful to $G^*$.
> - The score $Q$ is consistent and decomposable.
>
> Then, in the population limit ($n \to \infty$):
> $$\widehat{H}_{\mathrm{GES}} = H^* \quad \text{(i.e., GES recovers the true CPDAG).}$$
>
> **Proof sketch.** By the FES skeleton lemma, all edges in $\widehat{H}_{\mathrm{FES}}$ are
> in the skeleton of $G^*$. The Meek Conjecture guarantees that the score landscape over MECs
> is "unimodal" — moving from any MEC toward the true MEC $[G^*]$ via covered edge reversals
> always increases the score. FES reaches a neighbourhood of $H^*$; BES removes spurious edges
> by the BIC penalisation, landing exactly at $H^*$.
^thm-ges-consistency

### FGES: Scaling GES to High Dimensions

> [!definition] Definition: FGES — Fast GES (Ramsey et al. 2017)
> FGES parallelises the FES phase using a priority queue of candidate insertions ranked by
> $\Delta Q$. Key modifications:
> 1. **Priority queue (max-heap)** over all valid insertions; only the top-$k$ are checked
>    per step, reducing the bottleneck from $O(d^3)$ to $O(d^2 \log d)$ per FES step.
> 2. **Sparse updates**: after each insertion, only recompute $\Delta Q$ for pairs adjacent
>    to the modified node — reduces redundant work for sparse graphs.
> 3. **Parallelised BIC**: regress each $X_j$ on its parent set in parallel across nodes.
>
> **Scale**: FGES has been run on $d > 10^4$ variables in genomics applications (Ramsey et al.
> 2017, "a million variables and more"). The `pcalg` R implementation (`ges()`) handles
> thousands of variables; TETRAD's FGES handles $>10^4$.
^def-fges

### Comparison to PC

| Criterion | PC | GES |
|-----------|----|-----|
| **Core operation** | CI tests to remove edges | Score maximisation to add/remove edges |
| **Starting point** | Complete graph → remove | Empty graph → add → remove |
| **Output** | CPDAG | CPDAG |
| **Model assumptions** | Test-dependent (flexible) | Score-dependent (BIC: Gaussian) |
| **Consistency** | Yes (Kalisch & Bühlmann 2007) | Yes (Chickering 2002) |
| **Dense graphs** | Exponential tests ($O(d^q)$) | More scalable (FGES) |
| **Hidden confounders** | FCI extension available | No direct extension |
| **In NOTEARS experiments** | "Significantly weaker" | Weaker than FGS on SF-4 dense graphs |

### Practical Notes

**Score choices beyond BIC:**
- **BDeu** (Bayesian Dirichlet equivalent uniform): for discrete data; consistent with Dirichlet priors.
- **BGe** (Bayesian Gaussian equivalent): for Gaussian continuous data; equivalent to BIC asymptotically.
- **Penalised regression score**: $\sum_j \log \hat\sigma^2_{j|\mathrm{Pa}(j)} + \lambda |\mathrm{Pa}(j)|$.

**Software:**

| Package | Language | Call |
|---------|----------|------|
| `pcalg` (R) | R | `ges(score, labels, phases=c("forward","backward"))` |
| TETRAD | Java (py-tetrad wrapper) | FGES algorithm |
| `causal-learn` | Python | `GES(data, score_func="local_score_BIC")` |
| `cdt` | Python | Wraps pcalg/TETRAD via R bridge |

## Examples

> [!example] Example: GES on a 3-variable Gaussian SEM
> **True DAG:** $X_1 \to X_2$, $X_2 \to X_3$; no direct $X_1 \to X_3$ edge.
>
> **FES phase (from empty graph):**
> - Compute $\Delta Q_\mathrm{Insert}(X_1, X_2, \emptyset)$, $\Delta Q_\mathrm{Insert}(X_2, X_3, \emptyset)$, etc.
> - True edges give larger $\Delta Q$ (they reduce residual variance substantially).
> - After adding $X_1 \to X_2$ and $X_2 \to X_3$: score no longer improves for $X_1 \to X_3$
>   (BIC penalises the extra parameter since $X_1 \perp X_3 \mid X_2$).
>
> **BES phase:** No edge has positive $\Delta Q$ to remove (both edges are real).
>
> **Output CPDAG:** $X_1 - X_2 - X_3$ (undirected — the chain and fork are equivalent).
>
> **Lesson:** GES correctly identifies the skeleton and the MEC. The chain $X_1 \to X_2 \to X_3$
> and fork $X_1 \leftarrow X_2 \to X_3$ are observationally indistinguishable — both in the CPDAG.

> [!example] Example: Why BES is necessary
> **Scenario:** True DAG has $X_1 \to X_2$; FES also inserts $X_1 \to X_3$ (adjacent in truth
> via $X_1 \to X_2 \to X_3$, so marginal dependence is strong).
>
> **After FES:** CPDAG has edges $X_1 - X_2$, $X_2 - X_3$, and spurious $X_1 - X_3$.
>
> **BES phase:** $\Delta Q_\mathrm{Delete}(X_1, X_3, H) > 0$ because the penalised BIC prefers
> the sparser model (removing the spurious edge increases BIC). BES removes it.
>
> **Output CPDAG:** $X_1 - X_2 - X_3$ (correct skeleton, correct MEC).

## Connections

- **Meek Conjecture:** The proof of GES consistency depends on the Meek Conjecture
  ([[Markov Equivalence and CPDAGs#^thm-covered-reversals]]), which Chickering also proves in
  the same paper. This is the deepest result in the paper beyond the algorithm itself.
- **vs. NOTEARS:** Both GES and [[NOTEARS - Overview]] are score-based (both minimise a
  continuous objective), but NOTEARS parameterises individual DAGs via $W \in \mathbb{R}^{d\times d}$
  while GES works in equivalence-class space. In [[NOTEARS Experiments]], FGS (fast GES) is
  the primary baseline — NOTEARS outperforms it on dense scale-free graphs.
- **vs. PC:** GES is score-based; [[PC Algorithm]] is test-based. Both output CPDAGs under
  the same assumptions (CMC + faithfulness).
- **ABM calibration analogy:** The forward-backward two-phase structure of GES mirrors the
  general pattern in score-based estimation: [[Method of Simulated Moments]] (add moments
  greedily then prune) and ABC methods (propose, evaluate, prune). The conceptual parallel is
  noted in [[ABM Calibration Overview]].

## See Also
- [[Markov Equivalence and CPDAGs]] — the equivalence classes GES searches over
- [[Constraint-Based Causal Discovery]] — the alternative paradigm (CI tests)
- [[PC Algorithm]] — the test-based alternative
- [[NOTEARS - Overview]] — continuous-optimization alternative; GES (FGS) is its main benchmark
- [[NOTEARS Experiments]] — empirical comparison with GES/FGS
- [[DAG Structure Learning Problem]] — landscape of all methods
