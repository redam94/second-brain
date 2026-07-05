# Constraint-Based and Score-Based Causal Structure Learning: A Synthesis Survey

**Synthesized from:**
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed. MIT Press [CPS]
- Chickering (2002) — "Optimal Structure Identification with Greedy Search," JMLR 3:507–554
- Colombo & Maathuis (2014) — "Order-Independent Constraint-Based Causal Structure Learning," JMLR 15:3921–3962
- Meek (1995) — "Causal inference and causal explanation with background knowledge," UAI
- Verma & Pearl (1990) — "Equivalence and synthesis of causal models," UAI
- Glymour, Zhang & Spirtes (2019) — "Review of Causal Discovery Methods Based on Graphical Models," Frontiers in Genetics 10:524

**Note:** External PDFs were inaccessible due to session network policy. This survey was compiled
from author training knowledge of the above papers (which are freely available at the URLs found
in the research phase but could not be downloaded).

---

## 1. Background: Markov Equivalence

### 1.1 The Identifiability Ceiling

A fundamental constraint on causal structure learning from observational data is that the
**data distribution alone cannot distinguish between all DAGs** — only between Markov equivalence
classes. Two DAGs G and G' are **Markov equivalent** if they encode exactly the same conditional
independence (d-separation) relations. Consequently, any purely observational method can at best
identify the **equivalence class** of the true DAG, not the DAG itself.

> **Theorem (Verma & Pearl, 1990; Frydenberg, 1990):** Two DAGs G and G' are Markov equivalent
> if and only if they have:
> 1. The same **skeleton** (same undirected adjacency structure), AND
> 2. The same **v-structures** (unshielded colliders: triples X → Z ← Y where X and Y are not adjacent)
>
> A v-structure X → Z ← Y is "shielded" if X and Y are adjacent; shielded colliders do not
> affect Markov equivalence.

### 1.2 CPDAGs (Completed Partially Directed Acyclic Graphs)

The **CPDAG** (also called the **essential graph**) of a Markov equivalence class (MEC) is a
unique graph that represents all DAGs in the MEC simultaneously:
- An **edge is directed** (X → Y) in the CPDAG iff it has the same orientation in every DAG in the MEC.
- An **edge is undirected** (X — Y) in the CPDAG iff both orientations (X → Y and X ← Y) appear in
  different DAGs within the MEC.

**Algorithm to construct the CPDAG** (Meek, 1995; Dor & Tarsi, 1992):
1. Start with the skeleton and all v-structures oriented.
2. Apply Meek's four orientation rules repeatedly until no more edges can be oriented:
   - **R1:** If Z → X — Y and Z and Y are not adjacent: orient X → Y (prevents creating new v-structures)
   - **R2:** If X → Z → Y and X — Y: orient X → Y (prevents cycles)
   - **R3:** If X — Z₁ → Y, X — Z₂ → Y, Z₁ and Z₂ not adjacent, X — Y: orient X → Y
   - **R4:** (Meek's fourth rule, needed for completeness) If X — Z → Y → W, X — W, X not adjacent to Y: orient X → W

---

## 2. Constraint-Based Causal Discovery: The PC Algorithm

### 2.1 Core Idea

Constraint-based methods use **conditional independence (CI) tests** as constraints to determine
which edges belong in the skeleton and how to orient them. The name "PC" comes from "Peter and
Clark" (Spirtes and Glymour).

**Key assumption (Faithfulness / Stability):** The data-generating process satisfies faithfulness:
every conditional independence in the distribution corresponds to d-separation in the true DAG.
Without faithfulness, d-separation implies conditional independence (Markov property), but not
vice versa — faithfulness closes this gap.

### 2.2 The PC Algorithm (Spirtes et al., 2000; SGS Algorithm)

**Input:** Data X ∈ ℝ^{n×d}, significance level α for CI tests.
**Output:** CPDAG representing the MEC of the true DAG.

**Phase 1: Skeleton Discovery**

1. Start with a complete undirected graph C on d vertices.
2. For each pair (X, Y): for conditioning set size l = 0, 1, 2, ...:
   - For each subset S ⊆ Adj(X) \ {Y} with |S| = l:
     - Perform CI test: X ⊥⊥ Y | S
     - If test passes (p-value > α): remove edge X-Y from C; record sep(X,Y) = S; break
3. Stop increasing l when l ≥ max degree of C.

**Phase 2: V-Structure Orientation**

For every remaining unshielded triple X — Z — Y (X and Y not adjacent):
- If Z ∉ sep(X, Y): orient as X → Z ← Y (v-structure / unshielded collider)
- If Z ∈ sep(X, Y): leave unoriented

**Phase 3: Meek Rule Propagation**

Apply R1–R4 repeatedly until no more orientations can be derived.

### 2.3 Conditional Independence Tests

The CI test in Phase 1 depends on the data type:
- **Continuous Gaussian data**: Fisher's z-test on partial correlations (Spirtes et al., 2000)
  - $z_{X,Y|S} = \frac{1}{2}\ln\frac{1+\hat{\rho}_{XY|S}}{1-\hat{\rho}_{XY|S}} \cdot \sqrt{n - |S| - 3}$
  - Under H₀: X ⊥⊥ Y | S, this is ~ N(0,1)
- **Discrete data**: G-test (log-likelihood ratio) or chi-squared test on contingency tables
- **Non-parametric / nonlinear**: Kernel-based CI tests (KCIT, Zhang et al. 2012); kernel independence tests
- **Mixed data**: Generalized partial correlation tests (Hauser & Bühlmann, 2012)

### 2.4 Order-Dependence Problem and Stable-PC (Colombo & Maathuis, 2014)

In finite samples, the PC algorithm is **order-dependent**: the skeleton and v-structures found
can differ depending on the order in which variables are processed. This is because:
- When edge X-Y is removed because S₁ makes them independent, we record sep(X,Y) = S₁.
- But there may be another set S₂ that also makes X ⊥⊥ Y | S₂, with S₂ not containing a common neighbor Z.
- This affects v-structure detection: Z ∉ sep(X,Y) with sep = S₁ but Z ∈ sep(X,Y) with sep = S₂.

**Stable-PC fix (Colombo & Maathuis, 2014):**
- **Skeleton-stable:** In each round of size l, test ALL pairs and ALL subsets before removing any edges
  (rather than removing each edge as soon as a CI test passes). This separates the update and test phases.
- **V-structure-stable:** For the v-structure detection step, collect ALL separation sets (all S that
  make X ⊥⊥ Y | S) rather than just the first one found, and orient X — Z — Y as a v-structure iff
  Z ∉ sep(X,Y) for ALL separation sets. This is more conservative.

**Conservative PC (cPC):** Maathuis, Kalisch & Bühlmann (2009) proposed an even more conservative rule:
orient a triple as a v-structure only if Z is NOT in any separating set.

### 2.5 Consistency and Complexity

- **Consistency:** Under faithfulness and assuming correct CI tests (oracle setting), PC returns
  the true CPDAG. In finite samples with consistent CI tests (e.g., Fisher's z at shrinking α_n),
  PC is consistent.
- **Complexity:** The skeleton discovery phase involves at most $O(d^2 \cdot 2^d)$ CI tests in
  the worst case, but with sparse graphs (bounded degree k) it requires $O(d^{k+2})$ tests —
  polynomial in d for fixed k.
- **Practical performance:** PC is efficient for sparse graphs. It struggles with dense graphs
  because conditioning sets become large and CI tests lose power.

---

## 3. Score-Based Causal Discovery: Greedy Equivalence Search (GES)

### 3.1 Core Idea

GES (Chickering, 2002) is a **score-based method** that searches directly over the space of
CPDAGs (Markov equivalence classes) rather than over DAGs. It uses a **decomposable score** —
one that can be computed as a sum over node-parent score terms — so edge insertions and deletions
can be scored locally.

**Key score (BIC / MDL for Gaussian linear SEMs):**

$$\text{BIC}(G; X) = -\frac{n}{2}\sum_{j=1}^d \log\widehat{\sigma}^2_j(PA_j(G)) + \frac{\log n}{2} \cdot |G|$$

where $\widehat{\sigma}^2_j(PA_j(G))$ is the residual variance of regressing $X_j$ on its parents
in G, and $|G|$ is the total number of edges (parameter count). The first term is fit; the second
is a complexity penalty.

**Decomposability:** The BIC score decomposes as:
$$\text{BIC}(G; X) = \sum_{j=1}^d \text{LocalScore}(X_j, PA_j(G); X)$$

This means adding/removing a single edge changes only two local score terms — making greedy
search tractable.

### 3.2 The GES Algorithm (Chickering, 2002)

**Input:** Data X ∈ ℝ^{n×d}, decomposable score S.
**Output:** CPDAG representing the estimated MEC.

**Phase 1: Forward (Insert) Phase**

1. Initialize CPDAG H ← empty graph (no edges, score = S(∅))
2. Repeat:
   a. For every pair (X, Y) not adjacent in H, and for every valid insert operator Insert(X,Y,T) with T ⊆ {neighbors of Y adjacent to X}:
      - Compute ΔScore = S(Insert(X,Y,T; H)) − S(H)
   b. If max ΔScore > 0: apply the best insert; update H.
   c. Else: stop.

**Phase 2: Backward (Delete) Phase**

1. Continue from Phase 1's output.
2. Repeat:
   a. For every adjacent pair (X, Y) in H, and for every valid delete operator Delete(X,Y,H') with H' ⊆ {neighbors of both X and Y}:
      - Compute ΔScore = S(Delete(X,Y,H'; H)) − S(H)
   b. If max ΔScore > 0: apply the best delete; update H.
   c. Else: stop.

The output of each phase is a CPDAG. The key operations (Insert and Delete) on CPDAGs are
defined carefully by Chickering to preserve the CPDAG invariant after each step.

### 3.3 Chickering's Optimality Theorem

> **Theorem 15 (Chickering, 2002):** Let S be a consistent score (e.g., BIC). Then:
> 1. GES Phase 1 terminates at a CPDAG that contains the true MEC (as a subgraph).
> 2. GES Phase 2 terminates at the CPDAG of the true MEC.
>
> This holds in the **large-sample limit** (n → ∞) under the Markov and faithfulness assumptions.

**Proof idea:** The consistency of BIC ensures that the score assigns higher values to models
that better approximate the true distribution. The key insight is that the CPDAG space has a
"lattice" structure with the true MEC at the global maximum of the score. GES's forward phase
climbs this lattice; the backward phase trims any overshoot.

**Finite-sample behavior:** In practice with finite n, GES may overfit (Phase 1 inserts too
many edges) or underfit. FGES (Fast GES, Ramsey et al. 2017) improves scalability using clever
data structures and scoring tricks, and is the baseline used in the NOTEARS experiments.

### 3.4 Comparison to PC

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| Paradigm | Constraint-based (CI tests) | Score-based (BIC/MDL) |
| Search space | Edge-by-edge, then orient | CPDAG-by-CPDAG |
| Key assumption | Faithfulness + correct CI tests | Faithfulness + consistent score |
| Output | CPDAG | CPDAG |
| Scalable? | Yes (sparse graphs) | Yes (FGES variant) |
| Non-Gaussian? | With kernel CI tests | Score must be adapted |
| Optimality | Consistent (oracle CI tests) | Consistent (large n, Thm 15) |
| Finite-sample | Order-dependent (stable-PC fixes) | May over/underfit |
| Software | pcalg (R), causal-learn (Python) | pcalg (R), FGES in TETRAD |

---

## 4. Software Ecosystem

### 4.1 pcalg (R)

The primary R package implementing both PC and GES, maintained by Markus Kalisch and Maathuis.
```r
library(pcalg)
# PC algorithm
pc_fit <- pc(suffStat = list(C = cor(X), n = nrow(X)),
             indepTest = gaussCItest,
             alpha = 0.05,
             p = ncol(X))
# GES
ges_fit <- ges(score = new("GaussL0penObsScore", data = X))
```

### 4.2 causal-learn (Python)

Python reimplementation of pcalg algorithms (Zheng, Huang, Zhang, et al., 2023):
```python
from causallearn.search.ConstraintBased.PC import pc
from causallearn.search.ScoreBased.GES import ges

# PC
cg = pc(data)  # returns CausalGraph

# GES
Record = ges(data)
```

### 4.3 TETRAD (Java)

The original software system from the Spirtes–Scheines group at CMU. Implements FGES (Fast GES),
PC, FCI, and many extensions. Command-line and GUI interfaces available.

---

## 5. Relationship to NOTEARS and the Broader Landscape

| Method | Paradigm | Constraint | Search | Output |
|--------|----------|-----------|--------|--------|
| PC | Constraint-based | CI tests (d-sep) | Edge-by-edge | CPDAG |
| GES / FGES | Score-based | Decomposable score | CPDAG space | CPDAG |
| NOTEARS | Continuous optimization | Smooth acyclicity h(W)=0 | Real matrix space | DAG (weighted) |
| LiNGAM | Functional model | Non-Gaussian noise | Linear regression | DAG (unique) |

**Key differences from NOTEARS:**
- PC and GES are **algorithm families** designed around the MEC structure — they explicitly
  search the CPDAG space. NOTEARS bypasses MEC reasoning by working on the real matrix W.
- PC and GES output **CPDAGs** (some edges may be undirected); NOTEARS outputs a **fully
  directed DAG**.
- NOTEARS requires a parametric SEM assumption (linear, differentiable score); PC works with
  any CI test; GES works with any decomposable score.
- PC scales polynomially in sparse settings; GES scales via FGES; NOTEARS is O(d³) per iteration.
