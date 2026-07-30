# Survey: Constraint-Based and Score-Based Causal Structure Learning (PC & GES)

**Synthesis from training knowledge** — papers freely available online but blocked by session network policy.

Primary sources:
- Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd ed. MIT Press. (Full book freely available at cs.cmu.edu/~scheines/causation.html)
- Chickering, D. M. (2002). Optimal structure identification with greedy search. *Journal of Machine Learning Research*, 3, 507–554. (Open access at jmlr.org/papers/v3/chickering02b.html)
- Kalisch, M., & Bühlmann, P. (2007). Estimating high-dimensional directed acyclic graphs with the PC-algorithm. *Journal of Machine Learning Research*, 8, 613–636. (Open access at jmlr.org/papers/v8/kalisch07a.html)
- Colombo, D., & Maathuis, M. H. (2014). Order-independent constraint-based causal structure learning. *Journal of Machine Learning Research*, 15, 3921–3962. (arXiv:1211.3295)
- Heinze-Deml, C., Maathuis, M. H., & Meinshausen, N. (2018). Causal structure learning. *Annual Review of Statistics and Its Application*, 5, 371–391. (arXiv:1706.09141)

---

## 1. Markov Equivalence and CPDAGs

### 1.1 The identification problem

From observational data alone, a DAG G is identified only up to its Markov equivalence class. Two DAGs G₁ and G₂ encode the *same* set of conditional independence (CI) relations if and only if they are **Markov equivalent**.

### 1.2 Characterization (Verma & Pearl 1990; Meek 1995)

**Theorem (Verma-Pearl-Meek)**: Two DAGs G₁ and G₂ are Markov equivalent if and only if they have:
1. The **same skeleton** (same set of undirected edges, ignoring direction), AND
2. The **same set of v-structures** (unshielded colliders): patterns A → C ← B where A and B are non-adjacent.

**Corollary**: Without additional assumptions (e.g. non-Gaussianity, interventions), the best any algorithm can do from observational data is identify the Markov equivalence class, not a unique DAG.

### 1.3 CPDAGs

The canonical representative of a Markov equivalence class is a **Completed Partially Directed Acyclic Graph (CPDAG)**, sometimes called the *essential graph*:
- An edge X → Y in the CPDAG is **directed** if it has the same direction in every member of the equivalence class (it is a *compelled* edge).
- An edge X — Y in the CPDAG is **undirected** if some members have X → Y and others have X ← Y (it is a *reversible* edge).

Every Markov equivalence class has a unique CPDAG. CPDAGs are not DAGs: they may contain undirected edges, but the directed edges must form no directed cycles.

### 1.4 Meek orientation rules

Given the skeleton and v-structures, Meek (1995) provides four rules (R1–R4) for orienting additional edges without introducing new v-structures or directed cycles. These rules are applied exhaustively to produce the CPDAG from the partially oriented graph.

- **R1**: If A → B — C and A not adjacent to C, orient B — C as B → C (to avoid a new v-structure).
- **R2**: If A → C and A — B → C (a directed path A→B→C plus A→C and a shortcut A—B), orient A — B as A → B (to avoid a cycle).
- **R3/R4**: More complex rules for double-triangle patterns.

### 1.5 The identifiable edges

For linear Gaussian SEMs: the equivalence class is all we can identify. But:
- For **linear non-Gaussian SEMs** (LiNGAM, Shimizu et al. 2006), the full DAG is identifiable.
- For **nonlinear additive noise models** (Peters, Mooij, Janzing & Schölkopf 2014), the full DAG is identifiable.
- With **interventional data**, some or all ambiguities in the CPDAG can be resolved.

---

## 2. PC Algorithm (Spirtes & Glymour 1991; SGS 2000)

The **PC algorithm** (named after Peter Spirtes and Clark Glymour) is the foundational constraint-based causal discovery algorithm. It works by testing conditional independence (CI) in the data and using those test results to reconstruct the CPDAG.

### 2.1 Assumptions

1. **Causal Markov condition**: Every variable X is independent of its non-descendants given its parents in G.
2. **Faithfulness (Causal Faithfulness Assumption, CFA)**: Every conditional independence in the distribution is entailed by the d-separation relations in G. (No "cancellation" of paths.)
3. **Causal sufficiency**: There are no hidden common causes (no unmeasured confounders). All common causes of measured variables are themselves measured.
4. **I.i.d. data**: Observations are independent and identically distributed.

Under these assumptions, the conditional independencies in the data perfectly characterize the CPDAG.

### 2.2 Algorithm (three phases)

**Input**: Data matrix X (n × d); significance level α for CI tests.
**Output**: Estimated CPDAG Ĝ.

#### Phase 1: Skeleton estimation

```
Initialize: G̃ ← complete undirected graph on d nodes; Sep(X,Y) ← ∅ for all X,Y.
For ℓ = 0, 1, 2, ...:
  For each adjacent pair (X,Y) in G̃:
    For each subset S ⊆ adj(X, G̃) \ {Y} with |S| = ℓ:
      If X ⊥⊥ Y | S (by CI test at level α):
        Remove edge X—Y from G̃
        Record Sep(X,Y) ← S
        Break (move to next pair)
  If no adjacencies remain with adj degree > ℓ, stop.
```

For Gaussian data, the CI test is based on Fisher's z-transformation of the partial correlation:
$$z_{XY|S} = \frac{1}{2}\log\frac{1+\hat{\rho}_{XY|S}}{1-\hat{\rho}_{XY|S}}, \quad \text{reject } X \perp\!\!\!\perp Y | S \text{ if } |\sqrt{n-|S|-3}\, z_{XY|S}| > \Phi^{-1}(1-\alpha/2).$$

For discrete or non-Gaussian data, kernel-based tests (HSIC, KCI) or mutual information tests can be used.

#### Phase 2: V-structure orientation

```
For each unshielded triple X — Z — Y (X,Y non-adjacent):
  If Z ∉ Sep(X,Y):
    Orient as X → Z ← Y (v-structure / immorality)
```

#### Phase 3: Meek rule propagation

Apply Meek's rules R1–R4 repeatedly until no more edges can be oriented. The result is the CPDAG.

### 2.3 Order dependence and PC-stable (Colombo & Maathuis 2014)

The original PC algorithm has a subtle **order-dependence**: the skeleton produced in Phase 1 can vary depending on the order in which variables are processed, because removing an edge changes the adjacencies used to define conditioning sets for later tests. In high dimensions, this can produce highly variable results.

**PC-stable fix**: Use the adjacency set from the *previous* iteration ℓ−1 (not the current, partially updated one) to define conditioning sets at iteration ℓ. This ensures every edge X—Y is tested using the same adjacency sets, making the algorithm **order-independent in the skeleton** phase.

Colombo & Maathuis (2014) prove that PC-stable produces the same output regardless of variable ordering (under perfect CI information). The `pcalg` R package implements PC-stable by default.

### 2.4 High-dimensional consistency (Kalisch & Bühlmann 2007)

Under high-dimensional asymptotics where both d (nodes) and n (samples) grow, PC (and PC-stable) are consistent under:

1. **Sparse graph**: The maximum degree q of the true CPDAG satisfies q = o(n^{1/(2+2κ)}) for some κ > 0.
2. **Calibrated significance level**: α = α_n → 0 at an appropriate rate as n → ∞ (e.g. α_n = 2(1 - Φ(c_n)) where c_n = c√log n for some c).
3. **Strong faithfulness** or **restricted faithfulness**: Partial correlations bounded away from zero at rate related to n.

Key result: With these conditions, the probability that PC outputs the correct CPDAG goes to 1 as n → ∞, even when d ≫ n.

The `pcalg` R package (Kalisch et al., 2012, J. Statistical Software) provides the reference implementation for both PC and GES in R.

### 2.5 Complexity

- For each pair (X,Y), PC tests CI conditioning on subsets of all adjacent variables, up to the maximum degree q.
- Total tests: O(d² · q · C(d,q)) in the worst case; O(d^{q+2}) under sparsity.
- Practical complexity for sparse graphs with maximum degree q is roughly O(d² · n^q).

### 2.6 Extensions and variants

- **FCI (Fast Causal Inference)**: Drops causal sufficiency, outputs PAG (partial ancestral graph) representing the equivalence class of MAGs (maximal ancestral graphs).
- **RFCI**: Faster variant of FCI.
- **CCD (Cyclic Causal Discovery)**: Extends to cyclic graphs.
- **PCMCI (Runge et al. 2019)**: Adapts PC for time-series causal discovery with lag selection.

---

## 3. GES — Greedy Equivalence Search (Chickering 2002)

### 3.1 Core idea

GES is a **score-based** approach: rather than testing CIs, it optimizes a **decomposable score function** S(G) over the space of equivalence classes (CPDAGs). GES sidesteps the combinatorial NP-hard problem of searching all DAGs by searching the *CPDAG space* greedily, using three phases.

**Decomposable score**: S(G) = Σᵢ S(Xᵢ, paᵢ(G)) where the sum is over nodes and paᵢ(G) is the parent set of Xᵢ. The BIC score and BGe (Bayesian Gaussian equivalent) score are both decomposable.

**BIC score for Gaussian data**:
$$S_{\text{BIC}}(G) = -2 \log L(\hat\theta; \mathbf{X} | G) + k(G) \log n,$$
where $k(G)$ is the number of free parameters (edge count) and $\hat\theta$ are the MLE parameters. Minimizing BIC = maximizing the penalized likelihood.

### 3.2 The three phases of GES

#### Phase 1: Forward Equivalence Search (FES)
- **Start**: Empty CPDAG (no edges).
- **Greedy step**: At each iteration, find the **Insert(X, Y, T)** operator that maximally increases S. The Insert operator adds edge X → Y and a set T of edges from each node in T to Y, maintaining the CPDAG invariant.
- **Stop**: When no single Insert increases S.

#### Phase 2: Backward Equivalence Search (BES)
- **Start**: CPDAG produced by FES.
- **Greedy step**: Find the **Delete(X, Y, H)** operator that maximally increases S. Delete removes the edge between X and Y and all edges between H and Y for some H.
- **Stop**: When no single Delete increases S.

#### Phase 3 (optional): Turning
- Some formulations add a third phase that flips covered directed edges (A → B where pa(A) = pa(B) \ {A}) to gain further score improvements.

### 3.3 The Meek Conjecture and GES consistency theorem

**Meek Conjecture** (proved by Chickering 2002, Theorem 15):
> Let G be a DAG and H be a DAG such that H is an I-map of G (the independence model of G is a subset of the independence model of H — i.e. H is "more independent"). Then there exists a sequence of "covered edge reversals" transforming G into H, with the score improving at each step.

A **covered edge** X → Y has exactly the same parents for X and Y minus {X}: pa(X) = pa(Y) \ {X}. Reversing a covered edge produces a Markov-equivalent DAG (same CPDAG), so the search stays in the same equivalence class.

**GES Consistency Theorem** (Chickering 2002, Theorems 12–15): Under a consistent scoring criterion (e.g. BIC, BGe) and faithfulness, GES provably outputs the true CPDAG in the limit n → ∞. More precisely:
1. **FES termination**: The DAG at which FES terminates is the true equivalence class or a "minimal I-map" of it.
2. **BES correctness**: BES then removes all spurious edges, leaving the true CPDAG.

The Meek Conjecture is the key: it guarantees that the local search in CPDAG space does not get trapped in bad local optima in the limit.

### 3.4 The forward-backward structure

Why is FES-then-BES needed? The forward phase tends to *overfit*: it may add edges beyond those in the true DAG. The backward phase then *prunes* spurious edges. This is the greedy-search analogue of model selection: first overfit, then regularize.

Under correct model specification and faithfulness:
- After FES: the true DAG is a subgraph of the estimated DAG.
- After BES: the estimated CPDAG equals the true CPDAG.

### 3.5 FGS: Fast GES (Ramsey et al. 2017)

**FGS (Fast Greedy Equivalence Search)** is an efficient implementation of GES for very large graphs (d up to thousands). The key optimization: precompute parent score improvements and maintain priority queues, making FGS scale to genomics and large social-network DAGs where vanilla GES is too slow. Used as the primary baseline in the NOTEARS experiments.

### 3.6 PC vs. GES: key comparison

| Dimension | PC Algorithm | GES |
|-----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (optimize BIC/BGe) |
| Input requirement | CI test + significance level α | Decomposable score function |
| Output | CPDAG | CPDAG |
| Theoretical guarantee | Consistent under faithfulness + sufficiency | Consistent under faithfulness + sufficiency |
| Order dependence | Yes (original PC); No (PC-stable) | No (GES is order-independent) |
| Gaussian setting | Partial correlation test | BIC / BGe score |
| High-dimensional | Consistent (Kalisch & Bühlmann 2007) | Consistent (implied by Meek Conjecture) |
| Scalability | Better for sparse graphs | FGS scales to d~1000+ |
| Nonparametric | Yes (kernel CI tests: HSIC, KCI) | Harder (score must be decomposable) |
| Handles hidden vars? | No (use FCI) | No (use RFCI-score extensions) |

### 3.7 Both vs. NOTEARS

| Dimension | PC / GES | NOTEARS |
|-----------|---------|---------|
| Search space | CPDAG space (equiv. classes) | Continuous ℝ^{d×d} (DAG space) |
| Output | CPDAG (equivalence class) | DAG (specific representative) |
| Model assumption | CI faithfulness; any distribution | Linear SEM with additive noise |
| Score function | CI test / BIC | Least-squares loss |
| Search method | Greedy / combinatorial | Continuous optimization (L-BFGS) |
| Parallelizable | Partially (FGS) | Yes (gradient) |
| Acyclicity enforcement | Explicit (by search over CPDAGs) | Smooth constraint h(W) = 0 |

---

## 4. Software

- **`pcalg` (R)**: Reference implementation of PC, PC-stable, GES, FCI. Kalisch et al. (2012), *J. Statistical Software*, 47(11). (JSS is open access.)
- **`causal-learn` (Python)**: Python port of PC, GES, FCI, LiNGAM. Based on the `Tetrad` Java library (CMU).
- **`Tetrad` (Java)**: Original CMU implementation by the SGS group, includes PC, GES, FCI, and many variants.
- **`ges` (Python)**: Lightweight Python implementation of GES (Gamella & Heinze-Deml, 2020).
- **`tigramite` (Python)**: PCMCI implementation for time-series causal discovery.

---

## 5. Key citations

- Spirtes, P., & Glymour, C. (1991). An algorithm for fast recovery of sparse causal graphs. *Social Science Computer Review*, 9(1), 62–72. [Original PC paper]
- Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd ed. MIT Press. [SGS book, chapters 5–7 on PC]
- Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models. *UAI Proceedings*. [Markov equivalence characterization]
- Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI Proceedings*. [Meek orientation rules R1–R4]
- Chickering, D. M. (2002). Optimal structure identification with greedy search. *JMLR*, 3, 507–554. [GES + Meek Conjecture proof]
- Chickering, D. M. (1995). A transformational characterization of equivalent Bayesian network structures. *UAI Proceedings*. [Covered edge reversals]
- Kalisch, M., & Bühlmann, P. (2007). Estimating high-dimensional DAGs with the PC-algorithm. *JMLR*, 8, 613–636. [High-dimensional consistency of PC]
- Colombo, D., & Maathuis, M. H. (2014). Order-independent constraint-based causal structure learning. *JMLR*, 15, 3921–3962. [PC-stable]
- Kalisch, M., Mächler, M., Colombo, D., Maathuis, M. H., & Bühlmann, P. (2012). Causal inference using graphical models with the R package pcalg. *J. Statistical Software*, 47(11). [Software reference]
- Ramsey, J., Glymour, M., Sanchez-Romero, R., & Glymour, C. (2017). A million variables and more: The fast greedy equivalence search algorithm for graphical models. *International Journal of Data Science and Analytics*, 3(4), 209–219. [FGS]
