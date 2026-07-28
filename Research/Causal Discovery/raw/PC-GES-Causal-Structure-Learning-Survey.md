---
type: synthesis-survey
created: 2026-07-28
note: >
  Synthesis survey created from training knowledge of the following freely available
  sources. Downloads blocked by session network policy (arxiv.org and jmlr.org return
  403 from egress proxy). Primary sources verified to be freely available but
  inaccessible this session:
  - Chickering (2002) "Optimal Structure Identification With Greedy Search" — JMLR Vol. 3 pp. 507-554
    URL: http://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf
  - Kalisch & Bühlmann (2007) "Estimating High-Dimensional DAGs with the PC-Algorithm" — JMLR Vol. 8 pp. 613-636
    URL: https://arxiv.org/abs/math/0510436
  - Colombo & Maathuis (2014) "Order-Independent Constraint-Based Causal Structure Learning" — JMLR Vol. 15 pp. 3741-3782
    URL: https://arxiv.org/abs/1211.3295
  - Spirtes, Glymour & Scheines (2000) "Causation, Prediction, and Search" 2nd Ed. MIT Press
---

# Constraint-Based and Score-Based Causal Structure Learning: Survey

## 1. The Two Paradigms

Causal structure learning algorithms fall into three families:

| Family | Example | Core Idea |
|--------|---------|-----------|
| **Constraint-based** | PC, FCI | Test conditional independence (CI); remove edges between CI pairs |
| **Score-based** | GES, hill-climbing | Assign a score to each DAG/CPDAG; search for the maximum |
| **Hybrid** | MMHC | Skeleton from CI tests, then score-based orientation |

NOTEARS (Zheng et al., 2018) belongs to a fourth family — continuous-optimization — which recasts DAG structure learning as a smooth constrained program. See the existing NOTEARS notes.

---

## 2. Markov Equivalence Theory

### 2.1 Markov Equivalence

**Definition (Markov condition).** A DAG G over variables $\mathbf{V}$ satisfies the *Markov condition* with respect to distribution $P$ if each variable is independent of its non-descendants, conditional on its parents.

**Definition (Faithfulness).** $P$ is *faithful* to G if every conditional independence (CI) in P is entailed by the Markov condition applied to G. This rules out "accidental" cancellations.

**Definition (Markov equivalence).** Two DAGs $G_1$ and $G_2$ are *Markov equivalent* if they encode the same set of conditional independencies (same d-separation statements).

**Theorem (Verma & Pearl, 1990).** Two DAGs are Markov equivalent iff they have the same skeleton AND the same set of **v-structures** (immoralities).

- *Skeleton*: the underlying undirected graph (ignoring arrow directions)
- *V-structure (immorality)*: a triple $X \to Z \leftarrow Y$ where $X$ and $Y$ are **not** adjacent. Also called a *collider*.

### 2.2 CPDAGs

The **completed PDAG (CPDAG)** is the unique graph representing a Markov equivalence class (MEC):
- Directed edges in the CPDAG are shared by **all** DAGs in the MEC (they are "compelled")
- Undirected edges in the CPDAG can be oriented in either direction (they are "reversible")

CPDAGs are also called **essential graphs**.

**Meek's orientation rules (R1–R4)** (Meek, 1995) orient additional edges in a PDAG into a CPDAG without introducing new v-structures or directed cycles:

- **R1**: If $X \to Y - Z$ and $X$ not adjacent to $Z$, then orient $Y \to Z$.
  (Otherwise $X \to Y \leftarrow Z$ would be a new v-structure.)
- **R2**: If $X \to Y \to Z$ and $X - Z$, then orient $X \to Z$.
  (Otherwise a directed cycle $X \to Z \to \ldots \to X$ would exist.)
- **R3**: If $X - Z \to Y$ and $X - W \to Y$ and $X - Z$ and $W$ not adjacent, then orient $X \to Y$.
- **R4**: If $X - Z \to Y$, $X - W \to Z$, $W$ adjacent to $Z$, $X$ not adjacent to $Y$, then $X \to Z$.

These four rules are *complete* for orienting PDAGs to CPDAGs.

---

## 3. The PC Algorithm

### 3.1 Origin

The PC algorithm is named after **P**eter Spirtes and **C**lark Glymour (Spirtes, Glymour & Scheines, 1993/2000). It is the canonical constraint-based algorithm for learning the CPDAG of the data-generating DAG.

### 3.2 Algorithm

**Input:** A set of variables $\mathbf{V}$, a CI oracle (or test), a significance level $\alpha$.
**Output:** A CPDAG representing the Markov equivalence class of the true DAG.

```
Phase 1: Skeleton estimation
  C ← complete undirected graph on V
  for l = 0, 1, 2, ... (conditioning set size):
    for each adjacent pair (X, Y) in C:
      for each set S ⊆ adj_C(X) \ {Y} with |S| = l:
        if CItest(X, Y | S):
          remove edge X - Y from C
          store S as sepset(X, Y)
          break
    if no removal in this l-iteration: stop

Phase 2: V-structure orientation
  for each triple X - Z - Y in skeleton where X, Y not adjacent:
    if Z ∉ sepset(X, Y):
      orient X → Z ← Y   (Z is a collider / v-structure)

Phase 3: Meek orientation rules
  Repeat until no change:
    Apply rules R1, R2, R3, R4 to orient additional edges
```

### 3.3 Conditional Independence Tests

For **Gaussian** (continuous) data:
- **Fisher Z-test**: $T = \frac{1}{2}\ln\frac{1 + \hat{\rho}_{XY|S}}{1 - \hat{\rho}_{XY|S}}$ where $\hat{\rho}$ is the partial correlation. Under $H_0$: $X \perp\!\!\!\perp Y | S$, $\sqrt{n - |S| - 3} \cdot T \sim N(0,1)$.
- Fails for non-linear relationships.

For **discrete** data:
- **G² statistic** (likelihood ratio): $G^2 = 2\sum_{x,y,s} n_{xys} \ln\frac{n_{xys} n_{s}}{n_{xs} n_{ys}}$. Under $H_0$: $\chi^2$ with $(|\mathcal{X}|-1)(|\mathcal{Y}|-1)\prod_{s}|\mathcal{S}_s|$ df.

For **non-linear, non-Gaussian**:
- **HSIC** (Hilbert-Schmidt Independence Criterion): kernel-based test, consistent against all alternatives.
- **KCI** (Kernel Conditional Independence test, Zhang et al., 2012).

### 3.4 Correctness

**Theorem (SGS, 2000).** If:
1. The true distribution $P$ satisfies the Markov condition with respect to some DAG $G$
2. $P$ is faithful to $G$
3. A perfect CI oracle is used

Then the PC algorithm returns the CPDAG of $G$.

**Faithfulness is not testable** from data, but Meek (1995) showed faithfulness holds for "almost all" parameterizations of any DAG model (measure-zero exceptions).

### 3.5 Order-Dependence Problem and PC-stable

The original PC algorithm is **order-dependent**: the skeleton and v-structures can differ depending on the order in which variables and edges are considered. Colombo & Maathuis (2014) introduce **PC-stable**, which resolves this by:
- Storing all found CI relations before removing any edges in iteration $l$
- Using the entire adjacency set from the beginning of each $l$-round for conditioning

PC-stable produces the same output regardless of variable ordering (given the same CI tests).

### 3.6 High-Dimensional Extension (Kalisch & Bühlmann, 2007)

Under the assumption of **sparse** graphs and **Gaussian** faithfulness, the PC algorithm is consistent even when $p = p(n) \gg n$ (high-dimensional):

**Theorem (Kalisch & Bühlmann, 2007).** If the underlying true DAG $G$ has maximum degree $q = O(n^{1-\beta})$ for some $\beta > 0$, and if the minimum partial correlation among adjacent nodes is bounded below, then PC is consistent as $n \to \infty$ with a threshold $\alpha = \alpha(n) \to 0$ at an appropriate rate.

In practice: use `pcalg::pc()` in R with `alpha` chosen by cross-validation or set to 0.01–0.05.

### 3.7 Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` (Kalisch et al., 2012) | R | Reference implementation; also has GES, RFCI, FCI |
| `causal-learn` (Zheng et al., 2023) | Python | Includes PC, GES, NOTEARS, LiNGAM, GRaSP |
| `py-causal` | Python | Wraps Tetrad Java package |
| `cdt` (Causal Discovery Toolbox) | Python | Wrappers for many algorithms |

---

## 4. Greedy Equivalence Search (GES)

### 4.1 Origin

Chickering (2002) "Optimal Structure Identification With Greedy Search" proves the **Meek Conjecture** and constructs GES as its algorithmic consequence. GES operates directly on the space of CPDAGs (equivalence classes), not individual DAGs.

### 4.2 Intuition

GES works on the space of Markov equivalence classes (CPDAGs), which is much smaller than the space of DAGs. It uses a **consistent scoring criterion** (e.g., BIC) that assigns higher scores to better-fitting models.

Key fact: the BIC score of a CPDAG is the *maximum* BIC score of any DAG in its equivalence class, because each CPDAG has a unique "optimal DAG" (the one that maximizes score among Markov-equivalent DAGs).

### 4.3 Score Function

GES uses a **decomposable** score: $S(G) = \sum_{i=1}^d S(X_i, Pa_{G}(X_i))$

Common choices:
- **BIC**: $S(X, Pa) = \ell(\hat{\theta}; X, Pa) - \frac{k}{2}\ln n$ where $k$ = number of parameters. Consistent under faithfulness.
- **BDeu** (Bayesian Dirichlet equivalent uniform): for discrete data. Bayesian marginal likelihood with prior.

### 4.4 Algorithm

**Input:** A set of variables $\mathbf{V}$, a decomposable score function $S$.
**Output:** A CPDAG.

```
Initialize: C ← empty CPDAG (no edges)

Phase 1: Forward (Insert) phase
  Repeat until no improvement:
    Find the edge (X, Y) and subset H ⊆ adj_C(Y) \ {X} such that:
      - Insert(X, Y, H) is a valid CPDAG operator
      - Δscore = S(Insert(X,Y,H)(C)) - S(C) > 0
    Apply Insert(X, Y, H) to C
  
Phase 2: Backward (Delete) phase
  Repeat until no improvement:
    Find the edge (X, Y) and subset H ⊆ adj_C(X) ∩ adj_C(Y) such that:
      - Delete(X, Y, H) is a valid CPDAG operator
      - Δscore = S(Delete(X,Y,H)(C)) - S(C) > 0
    Apply Delete(X, Y, H) to C
```

The *Insert* and *Delete* operators are CPDAG-valid moves (they always produce valid CPDAGs). Chickering (2002) defines them precisely and proves that every valid CPDAG move can be decomposed into a sequence of inserts and deletes.

### 4.5 Correctness (Meek Conjecture)

**Theorem (Chickering, 2002 — Meek Conjecture).** If $G_1$ is an **independence map** (I-map) of $G_2$ (every independence in $G_1$ holds in $G_2$), then there exists a sequence of **covered edge reversals** and **edge additions** transforming $G_1$ into a perfect map of $G_2$.

This enables the forward phase to start from the empty graph and reach the CPDAG of the true DAG by successive valid moves, each increasing the score.

**Theorem (Chickering, 2002).** Under the Markov condition, faithfulness, and assuming the distribution is faithful to a DAG with a perfect map, GES with a consistent score returns the true CPDAG in the large-sample limit.

**Comparison to PC:**
| Property | PC | GES |
|----------|----|----|
| Paradigm | Constraint-based | Score-based |
| Handles missing data | No (by default) | Through score modification |
| Consistency | Faithful + CI oracle | Faithful + consistent score |
| Computational complexity | $O(n^q)$ (CI tests) | $O(p^2 \cdot \text{score evals})$ |
| Handles Markov equivalence natively | No — outputs CPDAG from DAG search | Yes — searches CPDAG space directly |
| Extension to latent variables | FCI (acyclic), RFCI | Not directly |

### 4.6 Software

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg::ges()` | R | Reference GES implementation |
| `causal-learn` (py-ges) | Python | gamella/ges on GitHub |
| `gCastle` | Python | Huawei research; includes GES and many others |

---

## 5. Comparison: PC vs GES vs NOTEARS

| Property | PC | GES | NOTEARS |
|-----------|----|-----|---------|
| Paradigm | Constraint | Score | Continuous opt |
| Search space | Skeleton, then CPDAG | CPDAG directly | ℝ^{d×d} |
| Score | — (CI tests) | BIC / BDeu | LS + L1 |
| Acyclicity | Maintained by construction | Maintained by CPDAG operators | h(W)=0 equality constraint |
| Output | CPDAG | CPDAG | DAG (not CPDAG) |
| High-dimensional | Yes (KB 2007) | Harder | Better for large d |
| Handles non-linearity | Kernel CI tests | Kernel scores | Limited (linear SEM) |
| Implemented in | pcalg, causal-learn | pcalg, py-ges | notears, causal-learn |

---

## 6. The FCI Algorithm (Extension to Latent Variables)

PC assumes **causal sufficiency** (no hidden common causes). When this fails, use **FCI** (Fast Causal Inference, SGS 2000) or **RFCI** (Richardson & Spirtes, 2002). FCI outputs a **PAG** (Partial Ancestral Graph) instead of a CPDAG, using circle marks to indicate uncertainty about edge types.

---

## 7. Key References

1. Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed., MIT Press.
   (Original PC and FCI algorithms)

2. Chickering (2002) — "Optimal Structure Identification With Greedy Search," JMLR 3:507–554.
   (GES algorithm + proof of Meek conjecture)

3. Kalisch & Bühlmann (2007) — "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm," JMLR 8:613–636.
   (High-dimensional consistency of PC under faithfulness)

4. Colombo & Maathuis (2014) — "Order-Independent Constraint-Based Causal Structure Learning," JMLR 15:3741–3782.
   (PC-stable; resolves order-dependence)

5. Meek (1995) — "Causal Inference and Causal Explanation with Background Knowledge," UAI 1995.
   (Orientation rules R1–R4)

6. Verma & Pearl (1990) — "Equivalence and Synthesis of Causal Models," UAI 1990.
   (Markov equivalence = same skeleton + same v-structures)

7. Zheng, Aragam, Ravikumar & Xing (2018) — "DAGs with NO TEARS," NeurIPS 2018.
   (Continuous optimization approach, existing vault notes)
