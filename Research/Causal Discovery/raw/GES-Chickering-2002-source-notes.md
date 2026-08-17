---
title: "GES (Chickering 2002) — Synthesized Reference Notes"
type: reference-notes
original_sources:
  - "Chickering, D.M. (2002). Optimal structure identification with greedy search. *Journal of Machine Learning Research*, 3(Nov):507–554. https://jmlr.org/papers/v3/chickering02b.html"
  - "Meek, C. (1995). Causal inference and causal explanation with background knowledge. *Proceedings of UAI*, pp. 403–410."
note: |
  Original PDFs blocked by network egress policy (jmlr.org returned 403 during ingest
  on 2026-08-17). These notes synthesize GES from the primary source and from
  survey papers (e.g., Heinze-Deml et al. 2018 arXiv:1706.09141). Download the
  PDFs when network access permits.
date_synthesized: 2026-08-17
---

# GES (Chickering 2002) — Synthesized Reference Notes

This document synthesizes the Greedy Equivalence Search (GES) algorithm from its
primary source: Chickering (2002), "Optimal structure identification with greedy
search," *JMLR* 3:507–554.

---

## 1. Motivation: Searching CPDAG Space

The score-based paradigm for DAG learning assigns a score to each candidate DAG
(typically BIC or BDe) and searches for the highest-scoring DAG. The challenge:
the space of DAGs over $p$ nodes is superexponential in $p$, making exhaustive
search intractable.

**Key insight of GES**: instead of searching over individual DAGs, search over
**Markov equivalence classes** (represented as CPDAGs). Since equivalent DAGs
have the same score (BIC depends only on the skeleton and v-structures when data
is i.i.d. from a Markov distribution), there are **fewer equivalence classes than
DAGs**, and the score function is well-defined over this space.

GES performs a **two-phase greedy search** over the CPDAG space:
1. **FES** (Forward Equivalence Search): greedily add edges.
2. **BES** (Backward Equivalence Search): greedily remove edges.

---

## 2. Score Function

GES requires a **locally consistent** score — a score where:
1. For any DAG $G$ and $I$-map $G'$ of $G$ (with one fewer edge), $\mathrm{score}(G') < \mathrm{score}(G)$.
2. For any DAG $G$ and perfect $I$-map $G^*$ (the true structure), $\mathrm{score}(G^*) \geq \mathrm{score}(G)$.

Standard locally consistent scores:
- **BIC** (Bayesian Information Criterion): $\mathrm{BIC}(G) = \log p(\mathbf{X} \mid \hat{\theta}_G) - \frac{d}{2}\log n$,
  where $d$ is the number of free parameters and $n$ is sample size. BIC is
  consistent (identifies the true model as $n \to \infty$) for multivariate Gaussian
  data (linear SEM with Gaussian noise).
- **BDe** (Bayesian Dirichlet equivalent): for discrete Bayesian networks; uses
  the Dirichlet posterior closed-form marginal likelihood. Consistent for discrete data.
- **BGe** (Bayesian Gaussian equivalent): for Gaussian data; uses the Normal-Wishart
  marginal likelihood.

The score decomposes **locally**: $\mathrm{score}(G) = \sum_{i=1}^p s(X_i, \mathrm{Pa}_G(X_i))$,
meaning the score for each node depends only on its parents. This enables efficient
local updates when a single edge is added or removed.

---

## 3. CPDAG Operators

GES operates on the space of CPDAGs using two operators defined in Chickering (2002):

### 3a. Insert Operator (FES phase)

$\mathrm{Insert}(X, Y, T)$ — adds an edge $X \to Y$ to a CPDAG $C$, where $T$ is a
subset of the undirected neighbours of $Y$ in $C$ that are **not** adjacent to $X$.

After insertion, $T \cup \{X\}$ becomes a clique (all edges oriented toward $Y$), and
Meek's rules (R1–R4) are applied to propagate orientations.

**Score change** from inserting $X \to Y$ with turn set $T$:
$$\Delta_{\mathrm{Insert}}(X,Y,T) = s(Y, \mathrm{Pa}(Y) \cup \{X\} \cup T) - s(Y, \mathrm{Pa}(Y) \cup T \setminus \{X\})$$

The Insert operator is **valid** for a given CPDAG iff the resulting graph remains a CPDAG
(i.e., is acyclic and has a valid equivalence class representation). Chickering (2002) gives
necessary and sufficient conditions for validity.

### 3b. Delete Operator (BES phase)

$\mathrm{Delete}(X, Y, H)$ — removes the edge between $X$ and $Y$ (or reverses $X \to Y$),
where $H \subseteq \mathrm{Ne}(Y) \cap \mathrm{adj}(X)$ is the "turn set."

**Score change** from deleting:
$$\Delta_{\mathrm{Delete}}(X,Y,H) = s(Y, (\mathrm{Pa}(Y) \cup H) \setminus \{X\}) - s(Y, \mathrm{Pa}(Y) \cup H)$$

---

## 4. GES Algorithm

```
Algorithm GES(data X, score s):

Phase 1 — FES (Forward Equivalence Search):
  C ← empty CPDAG (no edges)
  repeat:
    Find the valid Insert(X, Y, T) that maximizes Δ_Insert(X, Y, T) > 0
    If no such Insert exists: break
    C ← Insert(X, Y, T) applied to C, then apply Meek rules R1–R4
  return C_FES ← C

Phase 2 — BES (Backward Equivalence Search):
  C ← C_FES
  repeat:
    Find the valid Delete(X, Y, H) that maximizes Δ_Delete(X, Y, H) > 0
    If no such Delete exists: break
    C ← Delete(X, Y, H) applied to C, then apply Meek rules R1–R4
  return C_BES ← C

Output: C_BES (estimated CPDAG)
```

### Why two phases?

FES builds up from the empty graph — adding edges until the score no longer
improves. It may overshoot the true structure (add spurious edges that together
improve the score). BES then removes edges that, given the current graph, are not
supported by the data.

**Analogy to greedy regression**: Forward stepwise regression (adds variables) +
backward elimination. GES is the equivalence-class version of this strategy applied
to DAG structures.

---

## 5. The Meek Conjecture (Now Theorem)

The central theoretical result that GES relies on is the **Meek Conjecture**, which
Chickering (2002) proves as Theorem 15:

> **Theorem (Chickering 2002)**: Let $G^*$ be the true DAG (or any DAG in the true
> equivalence class), and let $G$ be any DAG in the GES search path during FES. If
> $G$ is a **perfect $I$-map** of $G^*$ (the Markov conditions of $G^*$ imply those
> of $G$), then there exists a sequence of valid edge insertions that connects $G$ to
> $G^*$, and each intermediate graph in the sequence is also a perfect $I$-map of $G^*$.

**Implication**: FES cannot "get stuck" below the true graph — it can always make
progress toward the true equivalence class by adding edges. Hence in the population
limit ($n \to \infty$, exact CI tests), FES reaches a CPDAG that is at least as
complex as the true CPDAG (possibly with extra edges). BES then removes the excess.

---

## 6. Consistency of GES

**Theorem (Chickering 2002)**: Under the faithfulness assumption, causal Markov
condition, causal sufficiency, and with a locally consistent score that satisfies
the consistency condition, GES is **consistent** — in the limit of large sample size,
GES recovers the true CPDAG.

**Proof sketch**:
1. FES consistency: by the Meek Conjecture, FES reaches a graph that is an $I$-map
   of the true CPDAG. The score function being locally consistent ensures FES does not
   stop before reaching the true I-map.
2. BES consistency: starting from the FES output, BES removes spurious edges while
   the locally consistent score guarantees that true edges are not removed.
3. Together: GES converges to the unique CPDAG representing the true Markov equivalence
   class.

---

## 7. Complexity of GES

- **FES phase**: In the worst case, the number of Insert evaluations is $O(p^2 \cdot 2^p)$
  (exponential in $p$ due to the turn set $T$). However, under sparsity (bounded in-degree
  $d$), the number of valid Inserts per step is $O(p^2 \cdot p^d)$, and the number of FES
  steps is bounded by the number of edges in the true graph.
- **BES phase**: Similar complexity.
- **In practice**: GES is much faster than brute-force search and comparable to PC
  for sparse graphs.
- **FGES** (Fast GES, Ramsey et al. 2017): an optimised parallel implementation
  that makes GES practical for thousands of variables.

---

## 8. GES vs. PC: Key Differences

| Property | PC | GES |
|----------|-----|-----|
| Search type | Constraint-based (CI tests) | Score-based (BIC/BDe) |
| Search space | DAG skeleton → CPDAG | CPDAG space directly |
| Tuning parameter | CI test significance $\alpha$ | None (score-based) |
| Data requirement | Large $n$ for valid CI tests | Moderate $n$ (score is more efficient) |
| Consistency guarantee | Yes (under faithfulness + Markov + sufficiency) | Yes (same + locally consistent score) |
| Handling high-dim | PC is consistent for $p \gg n$ under sparsity (Kalisch & Bühlmann 2007) | GES typically requires $n > p$ |
| Typical output | CPDAG | CPDAG |
| Software | `pcalg` R, `causal-learn` Python | `pcalg` R, `causal-learn` Python |

---

## 9. Score-Based vs Constraint-Based: Which to Use?

- **PC** is preferred when: the correct CI test is available for the data type,
  sample size is very small (CI tests are well-calibrated), or interpretability
  of the decision (which CI test triggered which edge removal) matters.
- **GES** is preferred when: a good score function is available, consistency
  guarantees under a specific data model are desired, or the significance level
  tuning of PC creates instability.
- **NOTEARS** is preferred when: a continuous optimization approach is desired,
  the SEM is linear, and avoiding combinatorial search is a priority.

---

## Key Citations

- Chickering, D.M. (2002). "Optimal structure identification with greedy search."
  *Journal of Machine Learning Research*, 3(Nov):507–554.

- Meek, C. (1995). "Causal inference and causal explanation with background knowledge."
  *Proceedings of UAI*, pp. 403–410.

- Ramsey, J., Glymour, M., Sanchez-Romero, R. & Glymour, C. (2017). "A million
  variables and more: the Fast Greedy Equivalence Search algorithm for learning
  high-dimensional graphical causal models." *Statistics and Computing*, 27:1–9.

- Heinze-Deml, C., Maathuis, M.H. & Meinshausen, N. (2018). "Causal structure
  learning." *Annual Review of Statistics and Its Application*, 5:371–391.
  arXiv:1706.09141.
