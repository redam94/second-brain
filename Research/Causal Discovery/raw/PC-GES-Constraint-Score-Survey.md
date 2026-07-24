# PC Algorithm and GES: Constraint-Based and Score-Based Causal Structure Learning

> [!note] Source type
> This is a synthesis survey compiled from training knowledge of the primary literature,
> created because direct PDF downloads were blocked by the session network policy.
> Primary sources referenced: Spirtes, Glymour & Scheines (2000) *Causation, Prediction,
> and Search*, 2nd ed., MIT Press (Ch. 5–6); Chickering (2002) "Optimal Structure
> Identification with Greedy Search" *JMLR* 3, 507–554; Meek (1995) "Causal inference
> and causal explanation with background knowledge" *UAI*; Verma & Pearl (1990)
> "Equivalence and synthesis of causal models" *UAI*.

---

## 1. The Causal Structure Learning Task

Given $n$ i.i.d. observations of $d$ random variables $X_1, \dots, X_d$, recover the
structure of the DAG (Bayesian network) that generated the data. Two paradigms:

- **Constraint-based** (PC, FCI): use conditional independence tests to rule out
  edges; recover the Markov equivalence class (MEC).
- **Score-based** (GES, hill-climbing, exact methods): assign a decomposable score
  (BIC, BDe) to each MEC candidate; greedily search over MECs.

Both return a **CPDAG** (completed partially directed acyclic graph), not a unique DAG —
because observational data alone cannot orient every edge without additional assumptions.

---

## 2. Markov Equivalence

### Definitions

**Skeleton**: the underlying undirected graph ignoring edge orientations.

**V-structure (immorality)**: a triple $(X, Z, Y)$ where $X \to Z \leftarrow Y$ and
$X, Y$ are not adjacent. The edge $Z \leftarrow X$ and $Z \leftarrow Y$ have $Z$ as a
common effect with no direct $X$-$Y$ connection.

**Markov equivalence class (MEC)**: the set of all DAGs that encode the same conditional
independences (CI relations). Two DAGs $G_1, G_2$ are Markov equivalent iff:
1. They have the same skeleton, and
2. They have the same set of v-structures.

This is the **Verma–Pearl theorem** (Verma & Pearl 1990; also Frydenberg 1990).

**Essential graph / CPDAG**: the unique graphical representation of an MEC where:
- An edge is **directed** ($X \to Y$) iff it has that direction in *every* DAG in the MEC.
- An edge is **undirected** ($X - Y$) iff it is directed differently in different DAGs in the MEC.

Key fact: CPDAGs are chain graphs (a mix of directed and undirected edges satisfying
acyclicity in a generalized sense).

---

## 3. The PC Algorithm (Spirtes & Glymour 1991)

Named after its inventors **P**eter Spirtes and **C**lark Glymour; presented fully in
Spirtes, Glymour & Scheines (2000) Ch. 5.

### Assumptions

1. **Markov condition**: $X_i \perp \!\!\! \perp X_{nd(i)} \mid X_{pa(i)}$ in the true DAG.
2. **Faithfulness**: all conditional independences in $\mathbb{P}$ are entailed by the
   Markov condition of the true DAG (no cancellation of paths).
3. **Causal sufficiency**: no unmeasured common causes (latent variables) — this
   distinguishes PC from FCI.
4. i.i.d. observations.

### Phase 1: Skeleton Recovery

**Goal**: determine which pairs $(X_i, X_j)$ are adjacent in the DAG.

**Algorithm 5.4.1 (SGS skeleton algorithm, simplified as PC)**:

```
1. Start with a complete undirected graph C over {X_1, ..., X_d}.
2. For l = 0, 1, 2, ...:
   For each pair (X_i, X_j) that are adjacent in C:
     If there exists a set S ⊆ Adj(C, X_i) \ {X_j} with |S| = l
     such that X_i ⊥⊥ X_j | S:
       Remove edge X_i - X_j from C.
       Record Sep(X_i, X_j) = Sep(X_j, X_i) = S.
       Break (move to next pair).
   Increment l; stop if no pair has |Adj(C, X_i) \ {X_j}| ≥ l.
3. Return skeleton C and separating sets Sep(·,·).
```

**Key efficiency insight**: the PC algorithm (unlike the full SGS algorithm) only tests
subsets $S$ of the *current adjacency set* of $X_i$, not all subsets of all variables.
This exploits the faithfulness assumption: if $X_i \perp \!\!\! \perp X_j \mid S$ in $\mathbb{P}$,
then $S$ must be a subset of the Markov blanket of $X_i$, which is a subset of $X_i$'s
adjacency set. This reduces the conditioning set size from $2^d$ to manageable.

**Conditional independence test**: Any consistent test can be used:
- **Gaussian data**: Fisher's z-transform of partial correlations.
  $\hat\rho_{XY|S}$ is the partial correlation of $(X,Y)$ given $S$; reject $H_0: X \perp Y \mid S$ if
  $|z(\hat\rho_{XY|S})| = |\tanh^{-1}(\hat\rho_{XY|S})| \cdot \sqrt{n - |S| - 3} > z_{\alpha/2}$.
- **Discrete data**: $G^2$ or $\chi^2$ tests on contingency tables.
- **Kernel/nonparametric**: HSIC-based independence tests (Gretton et al. 2007).

### Phase 2: V-Structure Orientation

**Goal**: orient as many edges as possible using only the skeleton and separating sets.

**Step 1 — Identify v-structures**:
For each triple $(X_i, X_k, X_j)$ where $X_i - X_k - X_j$ in the skeleton and $X_i, X_j$
are *not* adjacent:
- If $X_k \notin \text{Sep}(X_i, X_j)$, orient as $X_i \to X_k \leftarrow X_j$ (a v-structure).
- If $X_k \in \text{Sep}(X_i, X_j)$, leave both edges undirected.

**Step 2 — Meek rules (Meek 1995)**: Apply the following four orientation rules
*exhaustively* until no more edges can be oriented:

| Rule | Pattern → Orientation | Justification |
|------|----------------------|---------------|
| **R1** | $A \to B - C$ (A not adj. C) → $B \to C$ | Otherwise $A \to B \leftarrow C$ would be a new v-structure not in the skeleton |
| **R2** | $A \to B \to C$ with $A - C$ → $A \to C$ | Otherwise $A - C$ in a cycle $A \to B \to C \to A$ |
| **R3** | $A - B$, $A - C$, $B \to D \leftarrow C$, $A - D$ → $A \to D$ | Acyclicity |
| **R4** | $A - B$, $B \to C \to D$, $A - D$ → $A \to D$ | Meek's fourth rule |

The output is the CPDAG of the true MEC. Remaining undirected edges are edges whose
orientation is not identifiable from observational data.

### Complexity and Order-Dependence

- **Time complexity**: $O(d^2 \cdot 2^{|adj|})$ in the worst case, where $|adj|$ is the maximum
  degree. In practice, $O(d^2 n)$ for sparse graphs with bounded degree.
- **Order-dependence**: the original PC algorithm is order-dependent — the adjacency sets
  tested depend on which edges have been removed so far. The **PC-stable** algorithm
  (Colombo & Maathuis 2014) removes this dependence by completing all $\ell$-tests
  before removing edges.
- **Consistency**: under faithfulness, the PC algorithm is **pointwise consistent** — it
  converges to the true CPDAG as $n \to \infty$.

---

## 4. GES: Greedy Equivalence Search (Chickering 2002)

GES (Chickering 2002) is the canonical score-based algorithm. Rather than searching
over individual DAGs, it searches over **Markov equivalence classes**, represented as
CPDAGs. The key insight: CPDAGs form a space with a well-defined edit-distance (via
the insert/delete operators), and BIC is locally computable in this space.

### Assumptions

1. **Faithfulness** (faithfulness assumption, same as PC).
2. **Causal sufficiency** (no latent confounders).
3. **Gaussian SEM** (for BIC score derivation; score-equivalence for other distributions).
4. **Score decomposability**: the score $Q(G)$ decomposes as $Q(G) = \sum_{i=1}^d Q_i(X_i, \text{pa}(X_i))$.
   This holds for BIC, BDe, and other standard scores.

### Score: BIC

$$Q(G) = \log P(\mathbf{X} \mid \hat\theta_G, G) - \frac{|G|}{2}\log n,$$

where $|G|$ is the number of free parameters and $\hat\theta_G$ is the MLE. For a Gaussian
DAG, $Q_i(X_i, \text{pa}(X_i)) = -\frac{n}{2}\log\hat\sigma_i^2 - \frac{|pa_i|+1}{2}\log n$,
where $\hat\sigma_i^2$ is the residual variance of the regression of $X_i$ on its parents.

**Score equivalence**: Markov equivalent DAGs receive the same BIC score (because they
have the same likelihood). This is why GES can operate on equivalence classes.

### Algorithm: Two Phases

#### Phase 1 — Forward (FES: Forward Equivalence Search)

Start with the empty graph (empty CPDAG $\mathcal{C}_0$). Greedily apply **insert operators**
that increase the BIC score:

**Insert$(X, Y, T)$**: insert edge $X \to Y$ in the representative DAG of $\mathcal{C}$,
where $T \subseteq \text{Ne}(Y) \setminus \text{Adj}(X)$ (non-adjacent neighbors of $Y$
that become parents of $Y$). This produces a new CPDAG.

Chickering (2002) proves that every valid insert of a single edge corresponds to a
sequence of basic CPDAG-space operators (covered edge reversals + edge insertions),
and that the resulting graph is always a valid CPDAG (Theorem 14 in the paper).

FES continues until no single-edge insert increases the score. At this point the
algorithm has found the highest-scoring equivalence class reachable by adding edges.

#### Phase 2 — Backward (BES: Backward Equivalence Search)

Starting from the CPDAG produced by FES, greedily apply **delete operators** that
increase the score:

**Delete$(X, Y, H)$**: delete the edge $X - Y$ (or $X \to Y$) in $\mathcal{C}$, orienting
some subset $H$ of neighbors of $Y$ as $Y \to H$.

BES continues until no single-edge deletion increases the score.

### Correctness Theorem

> **Theorem (Chickering 2002, Thm. 15)**: Under faithfulness and causal sufficiency,
> if the BIC score is used, GES is **consistent** — as $n \to \infty$ it returns the
> CPDAG of the data-generating distribution with probability 1.

The proof establishes:
1. *Soundness of FES*: FES never leaves the set of I-maps of the true distribution.
2. *Completeness of BES*: BES recovers the true MEC from any I-map.
3. *Meek Conjecture* (proved in the paper): Between any two DAGs in nested MECs, there
   exists a sequence of covered edge reversals. This establishes the graph-theoretic
   foundation for the CPDAG search space.

### FCI Extension (Spirtes et al. 2000, Ch. 6)

When **causal sufficiency fails** (latent common causes exist), PC is replaced by **FCI
(Fast Causal Inference)**. FCI produces a **PAG (Partial Ancestral Graph)** — a graph
with circle endpoints marking where ancestors are unknown. FCI runs two skeleton-recovery
passes (to handle inducing paths) and a richer orientation rule set.

---

## 5. Comparison Table

| Feature | PC | GES | NOTEARS |
|---------|-----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Input** | CI test p-values | Decomposable score (BIC) | Data matrix $\mathbf{X}$ |
| **Search space** | Adjacency graph | CPDAG space | $\mathbb{R}^{d\times d}$ |
| **Output** | CPDAG | CPDAG | Estimated DAG $\hat{W}$ |
| **Consistency** | Yes (faithfulness + sufficiency) | Yes (faithfulness + sufficiency) | Yes (linear SEM) |
| **Key assumption** | Faithfulness | Faithfulness + Score equiv. | Linear Gaussian SEM |
| **Handles latents?** | No (FCI extension does) | No | No |
| **Complexity** | Exponential worst-case | Exponential worst-case | Polynomial (approximate) |
| **Software** | `pcalg` (R), `causal-learn` (Python) | `pcalg` (R), `causal-learn` | `notears` (Python) |

---

## 6. Software Implementations

**R: `pcalg` package** (Kalisch et al. 2012, *JSS* 47(11)):
```r
library(pcalg)
# PC algorithm
pc.fit <- pc(suffStat = list(C = cor(X), n = n),
             indepTest = gaussCItest,
             alpha = 0.05,
             p = ncol(X))
# GES
score <- new("GaussL0penObsScore", X)
ges.fit <- ges(score)
```

**Python: `causal-learn` package** (Zheng et al. 2023):
```python
from causallearn.search.ConstraintBased.PC import pc
from causallearn.search.ScoreBased.GES import ges

# PC
cg = pc(data)
# GES
record = ges(data)
```

---

## 7. Key References

- Spirtes, Glymour & Scheines (2000). *Causation, Prediction, and Search*, 2nd ed. MIT Press.
- Chickering (2002). "Optimal structure identification with greedy search." *JMLR* 3, 507–554.
- Meek (1995). "Causal inference and causal explanation with background knowledge." *UAI*.
- Verma & Pearl (1990). "Equivalence and synthesis of causal models." *UAI*.
- Colombo & Maathuis (2014). "Order-independent constraint-based causal structure learning." *JMLR* 15, 3741–3782.
- Kalisch et al. (2012). "Causal inference using graphical models with the R package pcalg." *JSS* 47(11).
