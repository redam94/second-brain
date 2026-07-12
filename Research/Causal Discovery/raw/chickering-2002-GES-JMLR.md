# Chickering (2002) — Optimal Structure Identification with Greedy Search

**Citation:** Chickering, D. M. (2002). Optimal structure identification with greedy search. *Journal of Machine Learning Research*, 3, 507–554.

**Source:** Journal of Machine Learning Research (JMLR), Vol. 3 — fully open access journal. PDF available at https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf. Direct download blocked by session network policy (403 from proxy).

**Synthesis:** This file documents key material from Chickering (2002) based on training knowledge of the published text, supplemented by Chickering (1995) "A transformational characterization of equivalent Bayesian network structures" (*UAI 1995*) and Meek (1997) "Graphical models: Selecting causal and statistical models" (PhD thesis, CMU).

---

## Paper Structure

- §1–2: Background on DAG and equivalence classes (CPDAGs)
- §3: The GES (Greedy Equivalence Search) algorithm
- §4: Correctness proof (consistency in the large-sample limit)
- §5: Complexity and comparison to greedy hill-climbing
- §6: Empirical experiments

---

## Background: Bayesian Network Scoring

### BIC (Bayesian Information Criterion) Score
For a Bayesian network $G$ on $d$ variables with $n$ observations:
$$\text{BIC}(G) = \log P(\mathcal{D} \mid \hat{\theta}_G, G) - \frac{\log n}{2} \cdot \dim(G)$$
where $\hat{\theta}_G$ are the MLEs under $G$ and $\dim(G)$ is the number of free parameters. The BIC score is **decomposable**: the global score is the sum of local scores per node $i$ given its parent set $\text{Pa}(i)$:
$$\text{BIC}(G) = \sum_{i=1}^{d} S(X_i, \text{Pa}(X_i))$$
This decomposability is crucial for the efficiency of greedy search.

### BGe Score (Bayesian Gaussian Equivalent)
Under a Normal-Wishart prior conjugate to the multivariate Gaussian likelihood, the marginal likelihood of data $\mathcal{D}$ given $G$ is available in closed form (Geiger & Heckerman, 1994). BGe scores are also decomposable and satisfy the **score equivalence** property (next section).

### Score Equivalence
A scoring criterion $S$ is **score equivalent** if Markov equivalent DAGs receive identical scores: $G_1 \sim G_2 \Rightarrow S(G_1) = S(G_2)$. Both BIC and BGe are score equivalent. This property means score-based search naturally explores *equivalence classes* of DAGs, not individual DAGs — motivating the CPDAG representation.

---

## Markov Equivalence and CPDAGs

Two DAGs $G_1$ and $G_2$ are **Markov equivalent** iff they have the same skeleton and the same v-structures (Verma & Pearl, 1990). The **CPDAG** (Completed Partially Directed Acyclic Graph) is the unique mixed graph (directed + undirected edges) that represents an entire Markov equivalence class $[G]$:
- Directed edge $X \to Y$ in the CPDAG iff $X \to Y$ in *every* DAG in $[G]$ (the direction is compelled).
- Undirected edge $X$ – $Y$ in the CPDAG iff both $X \to Y$ and $X \leftarrow Y$ appear in different DAGs in $[G]$ (the direction is reversible).

**Chickering (1995, Theorem 4)** provides a **transformational characterization**: $G_1 \sim G_2$ iff $G_1$ can be transformed into $G_2$ by a sequence of **covered edge reversals**. An edge $X \to Y$ is **covered** if $\text{Pa}(Y) = \text{Pa}(X) \cup \{X\}$.

---

## The GES Algorithm

GES operates directly in the space of CPDAGs (equivalence classes), not individual DAGs. It has **two phases**:

### Phase 1: Forward Equivalence Search (FES)
Start from the empty graph (single equivalence class: the empty DAG, i.e., no edges). At each step:
- Examine all possible **insertions** of an edge into the current CPDAG representation.
- Select the insertion that gives the maximum increase in score.
- Repeat until no insertion increases the score.

**Key: Insert operator.** The insert operator adds an undirected edge $X$ – $Y$ to the current CPDAG, then applies orientation rules to maintain a valid CPDAG. Chickering characterizes when an insert is valid (the resulting graph is still a CPDAG) and gives an $O(d^2)$ algorithm to identify valid insertions.

**Score monotonicity:** Each insert increases the score by $\Delta = S(X_i, \text{Pa}(X_i) \cup \{X_j\}) - S(X_i, \text{Pa}(X_i)) > 0$ (or similar, depending on which variable is the "child"). By decomposability, only the local score of the modified node needs to be recomputed.

### Phase 2: Backward Equivalence Search (BES)
Start from the CPDAG output of FES. At each step:
- Examine all possible **deletions** of an edge from the current CPDAG.
- Select the deletion that gives the maximum increase in score.
- Repeat until no deletion increases the score.

The backward phase is needed to remove edges that were added in FES due to overfitting. In the large-sample limit, all added edges are correct and BES makes no deletions.

### The Delete Operator
Symmetric to Insert: removes an undirected (or one orientation of a directed) edge from the CPDAG, maintaining CPDAG validity.

---

## Correctness Theorem

> **Theorem (Chickering 2002, Thm. 15):** Assuming (1) faithfulness, (2) the Markov condition, and (3) score equivalence, in the large-sample limit ($n \to \infty$), GES returns the CPDAG of the true data-generating DAG.

The proof proceeds in two parts:
1. **FES consistency:** In the large-sample limit, the forward phase terminates at a CPDAG that is a supergraph of the true CPDAG (all true edges are included, possibly with extra edges).
2. **BES consistency:** In the large-sample limit, the backward phase removes all spurious edges added by FES, leaving exactly the true CPDAG.

This is an **oracle-consistency** result — it holds asymptotically. In finite samples, the estimated score is used and GES may return an incorrect CPDAG. But BIC is a consistent score, so the probability of error $\to 0$ as $n \to \infty$.

---

## Comparison: GES vs. PC Algorithm

| Property | GES (score-based) | PC (constraint-based) |
|----------|-------------------|----------------------|
| **Approach** | Greedy search over CPDAGs by score optimization | CI testing to remove edges |
| **Output** | CPDAG (directly) | CPDAG |
| **Consistency** | Yes (large sample, faithful) | Yes (large sample, faithful) |
| **Finite-sample** | BIC score, fast even for $n < d$ | Depends on CI test choice |
| **Complexity** | $O(d^2)$ per step, $O(d^{k+2})$ total (sparse) | $O(d^{k+2})$ CI tests (sparse) |
| **Correct for** | Any score-equivalent decomposable score | Any CI test |
| **Tuning** | None (score self-determines sparsity) | $\alpha$ (significance level for CI tests) |
| **Robustness** | Score choice matters (BIC assumes Gaussian) | CI test choice matters (Fisher-Z assumes Gaussian) |

---

## Algorithm Summary (Pseudocode)

```
GES(Data D):
  G ← empty CPDAG (no edges, d isolated nodes)
  
  # Phase 1: Forward
  repeat:
    best_insert ← argmax_{valid inserts (X,Y,T)} ΔScore(insert(X,Y,T,G))
    if ΔScore(best_insert) > 0:
      G ← Insert(X, Y, T, G)
    else:
      break
  
  # Phase 2: Backward
  repeat:
    best_delete ← argmax_{valid deletes (X,Y,H)} ΔScore(delete(X,Y,H,G))
    if ΔScore(best_delete) > 0:
      G ← Delete(X, Y, H, G)
    else:
      break
  
  return G  # CPDAG
```

---

## Software Implementations

- **R**: `pcalg` package (Kalisch et al. 2012, JOSS) — functions `ges()` and `pc()`.
- **Python**: `causal-learn` (formerly `causal-discovery-toolbox`) — `GES`, `PC` classes.
- **Python**: `gcastle` by Huawei — includes GES, PC, NOTEARS, and many others.
- **TETRAD** (Java): the original implementation from Carnegie Mellon. GUI and programmatic access.

---

## Extensions of GES

- **GIES** (Hauser & Bühlmann, 2012): GES for **interventional data** (multiple environments with different targets). Adds a third "turning phase" between FES and BES.
- **FCI** (Fast Causal Inference, Spirtes et al. 2000): Extension of PC to the **hidden confounders** setting. Returns a PAG (Partial Ancestral Graph) instead of a CPDAG.
- **RFCI** (Colombo et al. 2012): Faster version of FCI.
- **NOTEARS** (Zheng et al. 2018): Continuous relaxation — see [[NOTEARS - Overview]].

---

## References

- Chickering, D.M. (2002). Optimal structure identification with greedy search. *JMLR*, 3, 507–554.
- Chickering, D.M. (1995). A transformational characterization of equivalent Bayesian network structures. *UAI 1995*, pp. 87–98.
- Geiger, D., & Heckerman, D. (1994). Learning Gaussian networks. *UAI 1994*.
- Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models. *UAI 1990*.
- Hauser, A., & Bühlmann, P. (2012). Characterization and greedy learning of interventional Markov equivalence classes of directed acyclic graphs. *JMLR*, 13, 2409–2464.
- Kalisch, M., et al. (2012). Causal inference using graphical models with the R package pcalg. *Journal of Statistical Software*, 47(11).
