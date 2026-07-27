# Synthesis Survey: PC Algorithm and Greedy Equivalence Search (GES)

> **Note:** External PDF downloads were blocked by the session network proxy.
> This file is a synthesis survey created from training-knowledge of the primary sources listed below.
> It serves as the `source` reference for the vault notes created in this ingest run.
> Previous run (2026-06-28, Gap #1 PSM) used the same approach.

## Primary Sources

1. **Spirtes, Glymour & Scheines (2000)** — *Causation, Prediction, and Search*, 2nd Ed., MIT Press.
   Original source for the PC algorithm (named for **P**eter Spirtes and **C**lark Glymour).
   Chapter 5 introduces the skeleton-learning phase; Chapter 6 covers orientation.

2. **Verma & Pearl (1990)** — "Equivalence and synthesis of causal models." *UAI 1990*, pp. 220–227.
   Proves the characterization of Markov equivalence: two DAGs are equivalent iff they share
   skeleton and v-structures.

3. **Meek (1995)** — "Causal inference and causal explanation with background knowledge."
   *UAI 1995*, pp. 403–410. Gives the four orientation rules that complete a CPDAG from
   skeleton + v-structures.

4. **Chickering (2002)** — "Optimal structure identification with greedy search."
   *Journal of Machine Learning Research* 3:507–554.
   Proves the "Meek Conjecture": two-phase greedy search (insert then delete) in CPDAG space
   recovers the true CPDAG under faithfulness + sufficient data.

5. **Colombo & Maathuis (2014)** — "Order-independent constraint-based causal structure learning."
   *JMLR* 15:3741–3782. arXiv:1211.3295.
   Identifies and fixes order-dependence in PC: the *stable* PC replaces sequential edge
   removal with a symmetric skeleton step, removing the dependence on variable ordering.

---

## 1. Markov Equivalence and CPDAGs

### 1.1 Conditional Independence and DAG Semantics

A DAG $G = (\mathbf{V}, \mathbf{E})$ with $d$ nodes defines a set of **Markov assumptions**: each
node $X_i$ is conditionally independent of its non-descendants given its parents $\text{pa}_G(X_i)$.

The full set of conditional independence (CI) relationships implied by a DAG is characterized by
**d-separation** (Pearl 1988): $X \perp\!\!\!\perp_G Y \mid \mathbf{Z}$ iff $X$ and $Y$ are
d-separated by $\mathbf{Z}$ in $G$.

### 1.2 Markov Equivalence

**Definition (Markov equivalence).** Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if they
entail exactly the same set of CI relationships:
$$G_1 \sim G_2 \quad \iff \quad \{(X, Y, \mathbf{Z}) : X \perp\!\!\!\perp_{G_1} Y \mid \mathbf{Z}\} = \{(X, Y, \mathbf{Z}) : X \perp\!\!\!\perp_{G_2} Y \mid \mathbf{Z}\}.$$

**Theorem (Verma & Pearl 1990).** $G_1 \sim G_2$ if and only if they have the same:
1. **Skeleton** — the undirected graph obtained by ignoring edge directions, and
2. **V-structures** (immoralities) — unshielded colliders $X \to Z \leftarrow Y$ where $X$ and $Y$ are non-adjacent.

This is a purely graphical characterization: equivalence depends only on (skeleton, v-structures).

### 1.3 The Markov Equivalence Class (MEC) and CPDAG

The **Markov equivalence class** $[G]$ of $G$ is the set of all DAGs Markov equivalent to $G$.

A **CPDAG** (Completed Partially Directed Acyclic Graph) is the unique canonical representative of
the MEC: it is a mixed graph with both directed ($\to$) and undirected ($-$) edges where:
- $X \to Y$ in the CPDAG iff every DAG in $[G]$ has $X \to Y$
- $X - Y$ in the CPDAG iff $[G]$ contains DAGs with both $X \to Y$ and $X \leftarrow Y$

**Meek's rules (1995):** Given a skeleton and v-structures, apply the following rules until no
more edges can be oriented:
- **R1:** $X \to Y - Z$ and $X \not\sim Z$ → orient $Y \to Z$ (would create new v-structure if not)
- **R2:** $X \to Y \to Z$ and $X - Z$ → orient $X \to Z$ (acyclicity)
- **R3:** $X - Z$, $X - W_1$, $X - W_2$, $W_1 \to Z$, $W_2 \to Z$, $W_1 \not\sim W_2$ → orient $X \to Z$
- **R4:** $X - Y - Z$, $W \to Y$, $W - X$, $W \not\sim Z$ → orient $Y \to Z$

Applying R1–R4 exhaustively to (skeleton + v-structures) produces the CPDAG.

---

## 2. The PC Algorithm

### 2.1 Overview

PC is the canonical **constraint-based** structure learning algorithm (Spirtes & Glymour 1991).
"Constraint-based" means it learns from CI tests rather than by optimizing a score.

**Input:** Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; CI test oracle (e.g., Fisher's Z or
kernel-based CIT); significance level $\alpha$.
**Output:** Estimated CPDAG for the true DAG $G^*$.

**Core assumption (faithfulness):** Every CI relationship in the distribution is entailed by
$G^*$ — no accidental cancellations of paths. Under faithfulness, CI tests on the data recover
exactly the CI relationships encoded by $G^*$.

### 2.2 Algorithm

**Step 1 — Complete graph.** Start with the complete undirected graph $C = K_d$ (all edges present).
Also maintain a **separation set** $\text{Sep}(X, Y) = \emptyset$ for each pair.

**Step 2 — Skeleton learning (adjacency phase).**
For $\ell = 0, 1, 2, \ldots$ until no edge has $\text{adj}(C, X) \setminus \{Y\} \geq \ell$:
  For each adjacent pair $(X, Y)$ in $C$:
    For each subset $\mathbf{S} \subseteq \text{adj}(C, X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$:
      If $X \perp\!\!\!\perp Y \mid \mathbf{S}$:
        Remove edge $X - Y$ from $C$; set $\text{Sep}(X, Y) = \text{Sep}(Y, X) = \mathbf{S}$; break.

**Step 3 — V-structure orientation.**
For each triple $X - Z - Y$ with $X \not\sim Y$:
  If $Z \notin \text{Sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure).

**Step 4 — Edge completion (Meek's rules).**
Apply R1–R4 until no change.

### 2.3 Correctness and Complexity

**Theorem (Spirtes et al. 2000).** Under **faithfulness** and with a **consistent** CI test (correct
for any fixed $\mathbf{S}$), PC recovers the true CPDAG $[G^*]$ in the large-sample limit.

**Complexity:** The number of CI tests in Step 2 is at most $\sum_{\ell=0}^{d} \binom{d-1}{\ell}$
per pair, which is exponential in $d$ in the worst case. However, under **sparsity** (bounded
maximum degree $\Delta$), Step 2 requires at most $O(d^{\Delta+2})$ tests — polynomial.

### 2.4 Stable PC (Colombo & Maathuis 2014)

The original PC is **order-dependent**: the skeleton learned in Step 2 depends on the order in
which pairs $(X, Y)$ are processed, because removing an edge changes the adjacency sets used
in subsequent tests.

**Stable PC** fixes this by:
1. In each pass of Step 2, **recording** which edges should be removed but not removing them until
   the entire pass (all pairs, all sets of size $\ell$) is complete. Edges are removed at the end
   of each pass.
2. This makes the skeleton (and therefore the CPDAG) order-independent.

Colombo & Maathuis (2014) show that stable PC is also consistent, and performs better in
high-dimensional settings where order effects are amplified.

### 2.5 Choice of CI Test

- **Fisher's Z test:** For Gaussian data, tests $\rho_{XY \mid \mathbf{S}} = 0$ using the Fisher
  Z-transform. Standard in practice.
- **G²/Chi-square test:** For discrete data (contingency tables).
- **Kernel-based independence tests (KCI, HSIC):** Non-parametric; handle nonlinear dependencies.
- **Partial correlation oracle:** Population-level PC assuming Gaussian linear model; basis for
  consistency proofs.

---

## 3. GES: Greedy Equivalence Search

### 3.1 Overview

GES (Chickering 2002) is the canonical **score-based** structure learning algorithm. It searches
directly in the space of **CPDAGs** (equivalence classes), not in the space of individual DAGs.

**Input:** Data matrix $\mathbf{X}$; decomposable score $Q$ (e.g., BIC, BDe(u), BGe).
**Output:** Estimated CPDAG.

**Decomposability:** A score $Q(G, \mathbf{X}) = \sum_{i=1}^d Q_i(\text{pa}_G(X_i), \mathbf{X})$
decomposes into a sum of local scores, one per node. This is key: when an edge is inserted or
deleted, only the affected local scores change.

### 3.2 Forward Phase: GES-I (Insert)

Initialize with the empty CPDAG $C_0 = \emptyset$ (no edges).

Repeat:
  Find the **edge insertion** operator $\text{Insert}(X, Y, \mathbf{T})$ that maximally increases $Q$:
  - $\mathbf{T} \subseteq \text{adj}(C, Y) \setminus \text{adj}(C, X)$ is a "clique set"
  - The operator inserts $X \to Y$ into $C$ and turns the edges $T - Y$ into $T \to Y$
  - After insertion, re-orient $C$ to restore CPDAG validity (using Meek's rules)
  If best $\delta Q > 0$: apply the insertion; else stop.

### 3.3 Backward Phase: GES-II (Delete)

Starting from the CPDAG $C_{\text{fwd}}$ found in GES-I:

Repeat:
  Find the **edge deletion** operator $\text{Delete}(X, Y, \mathbf{H})$ that maximally increases $Q$:
  - $\mathbf{H} \subseteq \text{adj}(C, X) \cap \text{adj}(C, Y)$ is the "cut set"
  - The operator removes the edge between $X$ and $Y$ and turns $H - Y$ into $H \to Y$
  - After deletion, re-orient to restore CPDAG validity
  If best $\delta Q > 0$: apply the deletion; else stop.

### 3.4 Chickering's Main Theorem

**Theorem (Chickering 2002, "Meek Conjecture").** Under faithfulness and with a consistent
scoring function (e.g., BIC with $n \to \infty$), the two-phase GES algorithm identifies the
CPDAG of the true DAG $G^*$ with probability approaching 1 as $n \to \infty$.

**Key steps of the proof:**
1. *Forward phase soundness:* Every CPDAG reachable in GES-I is a valid equivalence class
   (Lemma 15 — "Insert is sound").
2. *Forward phase completeness:* The forward phase reaches the MEC of the true DAG or one
   with a higher score (Lemma 28 — "Covered edges").
3. *Backward phase:* Starting from any CPDAG "above" the true MEC in score, GES-II
   monotonically reaches the true MEC (the optimal CPDAG).

The proof resolves the "Meek conjecture": that the two-phase search in equivalence-class space
achieves global optimality, despite searching locally.

### 3.5 BIC Score for GES

The BIC (Bayesian Information Criterion) score is:
$$\text{BIC}(G, \mathbf{X}) = \log p(\mathbf{X} \mid \hat{\theta}_G) - \frac{|\theta_G|}{2} \log n,$$
where $|\theta_G|$ is the number of free parameters and $\hat{\theta}_G$ is the MLE.

For Gaussian linear SEMs:
$$\text{BIC}_i(\text{pa}(X_i)) = -\frac{n}{2}\log\hat{\sigma}_i^2 - \frac{|\text{pa}(X_i)| + 1}{2}\log n,$$
where $\hat{\sigma}_i^2$ is the residual variance from regressing $X_i$ on its parents.

BIC is consistent: it selects the true DAG (or its MEC) as $n \to \infty$ under faithfulness.

### 3.6 FGS: Fast GES

Ramsey et al. (2016) introduced **FGS** (Fast GES), which exploits the decomposability of BIC
more aggressively: it precomputes all local scores and uses a priority queue to avoid recomputing
unchanged local scores after each edge operation. FGS is the baseline against which NOTEARS
is compared in the NOTEARS experiments (see [[NOTEARS Experiments]]).

---

## 4. Comparison: PC, GES, and NOTEARS

| Criterion | PC | GES | NOTEARS |
|---|---|---|---|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC/BGe) | Score-based (continuous optimization) |
| Search space | DAG skeleton → CPDAG | CPDAG space (MEC) | $\mathbb{R}^{d \times d}$ (continuous) |
| Acyclicity enforcement | Implicit (CI-test-driven) | Implicit (CPDAG validity) | Explicit algebraic constraint $h(W)=0$ |
| Faithfulness required? | Yes | Yes | No (statistical guarantees via sparsity) |
| Output | CPDAG | CPDAG | Weighted DAG (a single graph, not MEC) |
| Complexity | Exponential worst case; poly for sparse | Poly in $d$ and $|\text{pa}|$ | $O(d^3)$ per L-BFGS step |
| Linear SEM assumption | No (any distribution) | No (any with decomposable score) | Yes (linear SEM) |
| Extensions | FCI (latent variables), RFCI | fGES, BGES, CCD | DAG-GNN, Gran-DAG, DYNOTEARS |

---

## 5. Key References

- Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd Ed. MIT Press.
- Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models. *UAI*, 220–227.
- Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI*, 403–410.
- Chickering, D. M. (2002). Optimal structure identification with greedy search. *JMLR*, 3, 507–554.
- Colombo, D., & Maathuis, M. H. (2014). Order-independent constraint-based causal structure learning. *JMLR*, 15, 3741–3782. arXiv:1211.3295.
- Ramsey, J., Glymour, M., Sanchez-Romero, R., & Glymour, C. (2017). A million variables and more: the Fast Greedy Equivalence Search algorithm for learning high-dimensional Markov equivalence classes. *International Journal of Data Science and Analytics*, 3, 207–214.
