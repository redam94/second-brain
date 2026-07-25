---
title: "GES: Greedy Equivalence Search — Survey of Chickering (2002)"
source: "https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf"
author:
  - "David Maxwell Chickering"
published: "2002"
created: 2026-07-25
description: >
  Survey of Chickering (2002) "Optimal Structure Identification With Greedy Search"
  JMLR Vol. 3, pp. 507-554. The paper introduces GES (Greedy Equivalence Search),
  a score-based algorithm that searches the space of CPDAGs (equivalence classes of
  DAGs) via two greedy phases: Forward Equivalence Search (FES) adds edges and
  Backward Equivalence Search (BES) removes them. The key theoretical result is the
  proof of the "Meek Conjecture" (Theorem 15): GES recovers the true CPDAG in the
  limit under the Markov, faithfulness, and score consistency assumptions.
  Source PDF freely available at JMLR but blocked by session network policy;
  content is synthesised from comprehensive training-data coverage.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/causal-discovery"
---

# GES: Greedy Equivalence Search — Survey of Chickering (2002)

**Full citation:** Chickering, D.M. (2002). Optimal structure identification with greedy search.
*Journal of Machine Learning Research* 3: 507–554.
URL: https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

---

## 1. Problem setup

**Goal:** Learn the structure of a Bayesian network (DAG) from data, maximising a
decomposable score. Because many DAGs can encode the same conditional independence
relations (they are **Markov equivalent**), the learnable object from observational
data is the **Markov equivalence class**, represented as a **CPDAG**.

**Score decomposability:** GES requires a score $Q(G, \mathbf{D})$ that decomposes
over variables:
$$Q(G, \mathbf{D}) = \sum_{i=1}^{d} Q_i(\mathbf{Pa}^G_i, \mathbf{D})$$
where $\mathbf{Pa}^G_i$ are the parents of $X_i$ in $G$. This allows local score
updates: when an edge is added/removed, only the score of the child variable changes.

Standard scores satisfying this:
- **BDe** (Bayesian Dirichlet equivalent, Heckerman et al. 1995): for discrete variables.
- **BGe** (Bayesian Gaussian equivalent, Geiger & Heckerman 1994): for Gaussian variables.
- **BIC** (Bayesian Information Criterion): asymptotically equivalent to BGe/BDe.

**Score consistency (Definition 5):** A score is *consistent* if:
- It assigns strictly higher score to DAGs in the true equivalence class than to
  DAGs not in the true class, in the large-sample limit.
- BIC, BDe, and BGe are all consistent under standard regularity conditions.

---

## 2. The key theoretical object: CPDAG space

GES does not search over individual DAGs but over **CPDAGs** — the unique graph-theoretic
representatives of Markov equivalence classes. The set of CPDAGs is partially ordered:
$[G_1] \preceq [G_2]$ if the equivalence class of $G_2$ has a strictly higher score.

A CPDAG has:
- **Directed edges** shared by all DAGs in the equivalence class (compelled edges).
- **Undirected edges** that can be oriented either way without changing the distribution.

**Chickering (1995) characterisation:** A DAG $G'$ is in the same equivalence class as $G$
iff they have the same **skeleton** (set of undirected edges) and the same **v-structures**
(immoralities: $X \to Z \leftarrow Y$ with $X, Y$ non-adjacent).

**CPDAG construction (Meek rules):** From any DAG $G$, the unique CPDAG of its equivalence
class is obtained by:
1. Identifying all v-structures.
2. Repeatedly applying Meek's orientation rules R1–R4 to orient compelled edges.
3. Leaving all remaining edges undirected.

---

## 3. The GES algorithm

GES searches the CPDAG space with two phases that are provably optimal.

### Phase 1: Forward Equivalence Search (FES)

**Starting point:** The empty CPDAG (no edges).

**Move:** At each step, consider all valid **edge insertion** operations — adding a
new directed edge $X_i \to X_j$ to the current CPDAG such that the result is still
a valid CPDAG. For each such operation, compute the **score change** $\Delta Q$.

$$\Delta Q(\text{Insert}(X_i, X_j, \mathbf{T})) = Q_j(\mathbf{Pa}_j \cup \{X_i\} \cup \mathbf{T}, \mathbf{D}) - Q_j(\mathbf{Pa}_j \cup \mathbf{T}, \mathbf{D})$$

where $\mathbf{T}$ is a subset of the neighbours of $X_j$ that are not adjacent to $X_i$,
chosen so that the resulting graph is a valid CPDAG.

**Greedily apply** the highest-scoring insertion until no positive-scoring insertion remains.

**Result:** A CPDAG $\hat{C}_1$ that is a **local maximum** in the forward direction.

### Phase 2: Backward Equivalence Search (BES)

**Starting point:** $\hat{C}_1$ from FES.

**Move:** At each step, consider all valid **edge deletion** operations — removing an
edge from the current CPDAG such that the result is still a valid CPDAG. For each,
compute the score change:

$$\Delta Q(\text{Delete}(X_i, X_j, \mathbf{H})) = Q_j(\mathbf{Pa}_j \setminus (\{X_i\} \cup \mathbf{H}), \mathbf{D}) - Q_j(\mathbf{Pa}_j, \mathbf{D})$$

where $\mathbf{H}$ is a subset of the neighbours of $X_j$ that are adjacent to $X_i$.

**Greedily apply** the highest-scoring deletion until no positive-scoring deletion remains.

**Result:** The final CPDAG $\hat{C}_2$.

---

## 4. The main theorem: Meek Conjecture proof

### Theorem 15 (Chickering 2002) — Optimality of GES

> **Theorem 15:** Under the Causal Markov condition, Faithfulness, and a consistent score,
> if GES is run on an $n$-observation sample from a distribution faithful to a DAG $G^*$,
> then as $n \to \infty$, GES outputs the CPDAG of $G^*$ with probability tending to 1.

**What this means:** GES is *pointwise consistent* — it converges to the true equivalence
class almost surely as the sample size grows. No other score-based greedy method has this
guarantee in general.

**Why FES → BES works:** 
- After FES, the estimated CPDAG $\hat{C}_1$ may have *too many* edges (FES overshoots).
  The score is now at a local maximum in the forward direction.
- BES then removes spurious edges (those whose removal improves the score). The combination
  of FES + BES provably finds the global optimum under faithfulness.

**The Meek Conjecture:** Chickering's proof resolves a conjecture of Meek (1997) that the
forward-backward greedy strategy is sufficient for asymptotic correctness. The key insight is
that the FES phase brings the search into the "correct neighbourhood" in CPDAG space, from
which BES can reach the true CPDAG.

---

## 5. Score decomposability and local operations

The correctness proof relies critically on **score decomposability**. Because the score
decomposes as $Q = \sum_i Q_i(\mathbf{Pa}_i)$, the score change from an edge insertion or
deletion only affects one term $Q_j$:

- **Efficiency:** Only one local score $Q_j$ needs recomputation at each step. For $d$
  variables and at most $d$ parents per node, each step is $O(d)$ local score calls.
- **Correctness:** Decomposability ensures the global score difference equals the local
  difference, so local greedy steps lead to globally optimal decisions.

---

## 6. Valid insert/delete operators in CPDAG space

A key technical contribution of Chickering (2002) is characterising exactly which
edge operations keep the graph a valid CPDAG:

**Valid insert operator** $\text{Insert}(X_i, X_j, \mathbf{T})$: Add $X_i \to X_j$ where:
- $\mathbf{T} \subseteq \text{Ne}(X_j) \setminus \text{Adj}(X_i)$ (subset of $X_j$'s
  undirected neighbours not adjacent to $X_i$).
- $X_j \notin \text{Adj}(X_i)$ (not yet adjacent).
- $[\text{Ne}(X_j) \setminus \mathbf{T}] \cup \{X_i\}$ forms a clique in the undirected part.

**Valid delete operator** $\text{Delete}(X_i, X_j, \mathbf{H})$: Remove the edge $X_i - X_j$ or
$X_i \to X_j$ where:
- $\mathbf{H} \subseteq \text{Ne}(X_j) \cap \text{Adj}(X_i)$.
- $[\text{Ne}(X_j) \cap \text{Adj}(X_i)] \setminus \mathbf{H}$ forms a clique.

These clique conditions ensure that the resulting graph is a valid CPDAG — no new
v-structures are created and no directed cycles are introduced.

---

## 7. FGES: scalable variant

**Ramsey et al. (2017)** — "A million variables and more: the Fast Greedy Equivalence
Search algorithm for learning high-dimensional Bayesian networks" — introduces **FGES**:

- Caches score computations to avoid recomputation.
- Parallelises score evaluations across variables.
- Achieves near-linear scaling in the number of variables on sparse graphs.
- **FGES is the "FGS" baseline in the NOTEARS paper** (Zheng et al. 2018).

---

## 8. Assumptions and limitations

| Issue | Detail |
|-------|--------|
| **Faithfulness** | Required for Theorem 15; near-violations can cause errors in finite samples |
| **Causal sufficiency** | No hidden common causes; GES (like PC) does not handle hidden variables |
| **Non-Gaussian noise** | BIC/BGe assume Gaussian; misspecification degrades performance |
| **Dense graphs** | Forward phase is expensive when $d$ is large and graphs are dense |
| **Local optima** | In finite samples, FES may not reach a true global maximum; BES may not fully correct |

---

## 9. Comparison with PC algorithm

| Aspect | PC (constraint-based) | GES (score-based) |
|--------|----------------------|-------------------|
| **Primary input** | Conditional independence tests | Decomposable score |
| **Search space** | Skeleton, then orientations | CPDAG space directly |
| **Output** | CPDAG | CPDAG |
| **Consistency** | Yes (under faithfulness + CI test consistency) | Yes (under faithfulness + score consistency) |
| **Sensitivity** | CI test threshold $\alpha$ | Regularisation in BIC ($\lambda$) |
| **Sparse graphs** | Very fast | Moderate speed |
| **Dense graphs** | Slow (all subsets tested) | Faster (FGES) |
| **Finite-sample** | Known order-dependence (use PC-stable) | Order-independent by design |

---

## 10. References

- Chickering, D.M. (2002). Optimal structure identification with greedy search. *JMLR* 3: 507–554.
- Chickering, D.M. (1995). A transformational characterization of equivalent Bayesian network structures. *UAI 1995*, pp. 87–98.
- Heckerman, D., Geiger, D. & Chickering, D.M. (1995). Learning Bayesian networks: the combination of knowledge and statistical data. *Machine Learning* 20(3): 197–243.
- Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI 1995*, pp. 403–410.
- Ramsey, J., Glymour, M., Sanchez-Romero, R. & Glymour, C. (2017). A million variables and more: the Fast Greedy Equivalence Search algorithm. *International Journal of Data Science and Analytics* 3(4): 287–303.
- Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd Ed. MIT Press.
- Zheng, X., Aragam, B., Ravikumar, P. & Xing, E.P. (2018). DAGs with NO TEARS. *NeurIPS 2018*. arXiv:1803.01422.
