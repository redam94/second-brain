---
type: synthesis-survey
sources:
  - "Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed., MIT Press"
  - "Spirtes & Glymour (1991) — 'An Algorithm for Fast Recovery of Sparse Causal Graphs', *Social Science Computer Review*"
  - "Chickering (2002) — 'Optimal Structure Identification with Greedy Search', *JMLR* 3:507-554"
  - "Verma & Pearl (1990) — 'Equivalence and Synthesis of Causal Models', *Proc. 6th UAI*"
  - "Andersson, Madigan & Perlman (1997) — 'A Characterization of Markov Equivalence Classes for Acyclic Digraphs', *Ann. Statist.* 25(2):505-541"
  - "Meek (1995) — 'Causal Inference and Causal Explanation with Background Knowledge', *Proc. 11th UAI*"
note: >
  Primary sources are freely available (JMLR open access; MIT Press open-access edition
  of Spirtes et al.) but were blocked by the session's egress proxy policy.
  This survey was compiled from training knowledge of the papers listed above.
  See also: https://jmlr.org/papers/v3/chickering02b.html (Chickering 2002, open access)
date_compiled: 2026-07-08
---

# Synthesis Survey: Constraint-Based and Score-Based Causal Structure Learning
## PC Algorithm and Greedy Equivalence Search (GES)

This survey synthesizes the two classical paradigms for causal structure learning
that preceded and were benchmarked against the NOTEARS approach:
(1) **constraint-based learning** (PC algorithm) and (2) **score-based learning**
(GES / Greedy Equivalence Search). Both methods output a **CPDAG** — a Completed
Partially Directed Acyclic Graph representing a Markov equivalence class of DAGs.

---

## Part I: Background — Markov Equivalence and CPDAGs

### 1.1 When Are Two DAGs Indistinguishable?

Given only observational data, we generally cannot identify a unique causal DAG.
Multiple DAGs can encode exactly the same set of conditional independence (CI)
relationships. Two DAGs $G$ and $H$ are **Markov equivalent** if and only if
(Verma & Pearl, 1990):

1. They have the **same skeleton** (same set of adjacent node pairs, ignoring direction).
2. They have the **same v-structures** (same set of unshielded colliders $X \to Z \gets Y$
   where $X$ and $Y$ are not adjacent).

**Example.** The three DAGs $X \to Y \to Z$, $X \gets Y \to Z$, and $X \gets Y \gets Z$
are all Markov equivalent: same skeleton ($X-Y-Z$ chain), no v-structures. But
$X \to Y \gets Z$ (with $X, Z$ non-adjacent) is NOT equivalent — it introduces a
v-structure at $Y$.

### 1.2 CPDAGs as Canonical Representatives

A **Completed Partially Directed Acyclic Graph (CPDAG)** is the unique canonical
representative of a Markov equivalence class (Andersson, Madigan & Perlman, 1997):

- **Directed edge** $X \to Y$: this direction holds in **all** DAGs in the class.
- **Undirected edge** $X - Y$: the direction is arbitrary; both $X \to Y$ and $X \gets Y$
  appear in distinct DAGs of the class.

Every CPDAG satisfies:
1. It is a **partially directed acyclic graph** (PDAG): a directed graph may contain
   directed and undirected edges but no directed cycles.
2. It has a **consistent DAG extension** (it is not an arbitrary PDAG — not every PDAG
   has one).
3. It is **complete**: it encodes exactly the set of orientations implied by the
   skeleton + v-structures, using Meek's four orientation rules.

### 1.3 Meek's Orientation Rules

Given a skeleton and a set of v-structures, four deterministic rules orient further edges
without introducing new v-structures or directed cycles (Meek, 1995):

- **R1 (Non-Collider):** $Z \to X - Y$ and $Z$ not adjacent to $Y$ ⟹ orient $X \to Y$.
  *(Orienting $Y \to X$ would create a new collider at $X$.)*
- **R2 (Acyclicity):** $X \to Z \to Y$ and $X - Y$ ⟹ orient $X \to Y$.
  *(Orienting $Y \to X$ creates a directed cycle.)*
- **R3 (Ambiguity):** $X - Z \to Y$, $X - W \to Y$, $X - Y$, $Z$ and $W$ not adjacent
  ⟹ orient $X \to Y$.
- **R4 (Chordal):** $X - Z \to W \gets Y$, $X - W$, $X$ and $Z$ adjacent but $Y$ and
  $Z$ not adjacent ⟹ orient $X \to W$.

These rules are applied repeatedly until no further orientations are possible. The result
is the unique CPDAG for the Markov equivalence class.

---

## Part II: The PC Algorithm (Constraint-Based Structure Learning)

**Source:** Spirtes, Glymour & Scheines (2000), Ch. 5–6; Spirtes & Glymour (1991).

### 2.1 Core Idea

The PC algorithm recovers the CPDAG of the true causal DAG by performing **conditional
independence (CI) tests** to determine which variables are d-separated, then orienting
edges using v-structures and Meek rules. It is *constraint-based*: the graph structure
is the set of constraints (conditional independences) satisfied by the data.

### 2.2 Assumptions

For the PC algorithm to return the true CPDAG asymptotically:

1. **Causal Markov Condition.** Each variable is independent of its non-descendants
   given its parents in the true DAG.
2. **Faithfulness Assumption.** Every conditional independence that holds in $P$ is
   *d-separated* in the true DAG — there are no "accidental" independences from
   cancellation of path coefficients.
3. **Causal Sufficiency.** There are no unmeasured common causes (no latent confounders).
   *(The FCI algorithm relaxes this.)*
4. **Correct CI tests** (in finite samples: tests must be of the correct level and
   consistent).

### 2.3 The Algorithm

#### Phase 1: Skeleton Recovery

**Initialize:** Start with the complete undirected graph $K_d$ on $d$ nodes.

**Main loop:** For $k = 0, 1, 2, \ldots$:

For each edge $X - Y$ in the current skeleton:
  - For each subset $\mathbf{S} \subseteq \mathrm{adj}(X) \setminus \{Y\}$ with
    $|\mathbf{S}| = k$:
    - Test $H_0: X \perp\!\!\!\perp Y \mid \mathbf{S}$
    - If the test accepts $H_0$:
      - Remove edge $X - Y$
      - Store $\mathrm{sepset}(X, Y) = \mathrm{sepset}(Y, X) = \mathbf{S}$
      - Break (move to next edge)

Terminate when all edges have been tested for the current $k$ and $k$ exceeds the
maximum adjacency size.

**Complexity:** The number of tests is at most $\binom{d}{2} \cdot 2 \cdot \sum_{k=0}^{d-2} \binom{d-2}{k}$,
which is exponential in $d$ in the worst case. In practice, sparse graphs (small maximum
degree $\delta$) require only $O(d^{\delta+1})$ tests — the key sparsity benefit.

#### Phase 2: V-Structure Identification

For each path $X - Z - Y$ in the skeleton where $X$ and $Y$ are **not** adjacent:
- If $Z \notin \mathrm{sepset}(X, Y)$: orient $X \to Z \gets Y$ (collider at $Z$).
- Otherwise: leave $X - Z - Y$ unoriented.

**Intuition:** If $Z$ were NOT in the separating set of $X$ and $Y$, then conditioning
on $Z$ would make $X$ and $Y$ dependent (the defining property of a collider). So $Z$
must be a collider.

#### Phase 3: Edge Propagation via Meek Rules

Apply Meek's four rules (R1–R4) iteratively until no more edges can be oriented.

**Output:** The CPDAG of the true DAG's Markov equivalence class.

### 2.4 Conditional Independence Tests in PC

#### Gaussian / linear case

For Gaussian data, partial correlations are sufficient. Test $X \perp\!\!\!\perp Y \mid \mathbf{S}$
by computing the partial correlation $\hat{\rho}_{XY|\mathbf{S}}$ and applying the
Fisher $z$-transform:

$$z = \sqrt{n - |\mathbf{S}| - 3} \cdot \operatorname{arctanh}(\hat{\rho}_{XY|\mathbf{S}}) \xrightarrow{H_0} \mathcal{N}(0,1)$$

Reject at level $\alpha$ if $|z| > z_{1-\alpha/2}$.

**Key point:** As the conditioning set $|\mathbf{S}|$ grows, the effective sample size
$n - |\mathbf{S}| - 3$ shrinks, reducing test power. This is why PC is most reliable
with large $n$ or small conditioning sets (sparse graphs).

#### Discrete data

Use the $G^2$ (likelihood ratio) or $\chi^2$ test, conditioning on levels of $\mathbf{S}$.
Degrees of freedom scale as $|\mathcal{X}|^{|\mathbf{S}|}$, requiring exponentially more
data for large conditioning sets.

#### Non-parametric / non-Gaussian

- **KCI (Kernel Conditional Independence) test** (Zhang et al., 2012): Hilbert-space
  embedding approach, consistent for arbitrary distributions.
- **RCIT (Randomized Conditional Independence Test)**: computationally efficient approximation.
- **RCoT (Randomized Conditional Correlation Test)**: regression-based residual test.

### 2.5 Multiple Testing in PC

The skeleton recovery phase of PC performs $O(d^2)$ CI tests (often far more). Bonferroni
correction is too conservative given the dependence structure; the BH procedure
(Benjamini-Hochberg, 1995) with FDR control is the standard choice in practice.

The significance level $\alpha$ controls the **sparsity–accuracy trade-off**:
- Small $\alpha$: fewer edges removed → denser graph (possible spurious edges)
- Large $\alpha$: more edges removed → sparser graph (possible missing edges)

### 2.6 Software: `pcalg` and `causal-learn`

**R:** The `pcalg` package (Kalisch et al., 2012) implements PC, FCI (latent
confounders), and GES via:

```r
library(pcalg)
suffStat <- list(C = cor(X), n = nrow(X))
pc.fit <- pc(suffStat, indepTest = gaussCItest, alpha = 0.01, p = ncol(X))
```

**Python:** The `causal-learn` package (Zheng et al., 2024):

```python
from causallearn.search.ConstraintBased.PC import pc
cg = pc(data, alpha=0.05, indep_test='fisherz')
```

---

## Part III: GES — Greedy Equivalence Search (Score-Based)

**Source:** Chickering (2002), JMLR 3:507-554.

### 3.1 Core Idea

GES searches directly over the space of **Markov equivalence classes** (CPDAGs) rather
than individual DAGs, using a decomposable score (e.g., BIC or BDe). By working in
CPDAG space, GES avoids the problem of multiple DAGs representing the same distribution.
It proceeds in two greedy phases: forward (add edges) and backward (remove edges).

### 3.2 Decomposable Scores

A score $S(G, \mathcal{D})$ is **decomposable** if it factors over nodes:

$$S(G, \mathcal{D}) = \sum_{i=1}^d s(X_i, \mathrm{Pa}_G(X_i), \mathcal{D})$$

This factorization enables efficient computation: when a single edge changes, only the
affected node's local score term changes. Standard choices:

- **BIC:** $s(X_i, \mathrm{Pa}_i, \mathcal{D}) = \hat{\ell}(X_i | \mathrm{Pa}_i) - \frac{k_i}{2} \log n$
  where $k_i$ counts free parameters for $X_i | \mathrm{Pa}_i$.
- **BDe (Bayesian Dirichlet score):** Log marginal likelihood under a Dirichlet prior.
  Consistent and Markov equivalent DAGs receive identical scores.

**Characterization:** Chickering proves that BIC and BDe are *consistent* (the true
CPDAG achieves the highest score asymptotically) under the faithfulness assumption.

### 3.3 The GES Algorithm

#### Phase 1: Forward Equivalence Search (FES)

**Initialize:** $\mathcal{C}_0 = $ empty CPDAG (no edges).

**Iterate:** At each step, find the **insert operator** $\operatorname{Insert}(X, Y, \mathbf{T})$
(adding an edge from $X$ to $Y$ with a specified subset $\mathbf{T}$ of $Y$'s neighbours
that are turned from neighbours to parents) that maximally increases $S$.

Formally, the Insert operator:
1. Adds edge $X \to Y$ to the current DAG representative of $\mathcal{C}$.
2. Orients each $T \in \mathbf{T}$ toward $Y$: $T \to Y$.
3. Converts the result back to a CPDAG using Meek rules.

The operator is **valid** (i.e., the result is still a legal CPDAG) iff certain
graphical conditions hold (Chickering 2002, Theorem 15).

Continue until no Insert operator increases the score.

#### Phase 2: Backward Equivalence Search (BES)

**Initialize:** $\mathcal{C}_{\mathrm{FES}}$ = CPDAG from Phase 1.

**Iterate:** Find the **delete operator** $\operatorname{Delete}(X, Y, \mathbf{H})$
that maximally increases $S$.

The Delete operator:
1. Removes the edge between $X$ and $Y$.
2. Re-orients edges in $\mathbf{H}$ (a subset of $Y$'s current neighbours).
3. Converts back to CPDAG using Meek rules.

Continue until no Delete operator increases the score.

**Output:** Final CPDAG $\mathcal{C}_{\mathrm{GES}}$.

### 3.4 The Meek Conjecture (Proved in Chickering 2002)

The consistency proof of GES rests on a fundamental structural result called the
**Meek Conjecture** (conjectured in Meek 1995, proved in Chickering 2002):

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 2)
> Let $G$ and $H$ be DAGs such that $H$ is an **independence map** (I-map) of $G$
> (i.e., every d-separation in $H$ holds in $G$). Then there exists a finite sequence
> of **covered edge reversals** in $G$ that reaches a DAG $G'$ such that $G'$ is an
> I-map of $G$ and $G'$ is Markov equivalent to $H$.
>
> A **covered edge** $X \to Y$ is one where $\mathrm{Pa}(X) = \mathrm{Pa}(Y) \setminus \{X\}$
> — reversing it preserves the Markov equivalence class.

**Significance:** This theorem shows that GES's Insert operator can always reach any
DAG in the CPDAG space from the empty graph, and the Delete operator can always trim
spurious edges. Together, they prove GES is consistent.

### 3.5 Consistency of GES

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 18)
> Let $G^*$ be the true causal DAG and $\mathcal{C}^*$ its CPDAG. Assume:
> 1. **Faithfulness:** every conditional independence in $P$ is d-separation in $G^*$.
> 2. **Consistent score:** $S$ is a consistent scoring criterion (BIC or BDe).
>
> Then as $n \to \infty$, GES returns $\mathcal{C}^*$ with probability 1.

**Note on finite samples:** Unlike the asymptotic guarantee, in finite samples GES can
include spurious edges (FES may overshoot) or miss true edges. The BES phase is designed
to correct spurious edges added by FES. In practice, BIC's log-factor penalty in BIC
controls overfitting better than cross-validation.

### 3.6 Software: `pcalg` and FGES

```r
library(pcalg)
score <- new("GaussL0penObsScore", data = X, lambda = 0.5 * log(nrow(X)))
ges.fit <- ges(score)
```

FGES (Fast GES, Ramsey et al. 2017) is an optimized parallel implementation in the
Tetrad software / `py-causal` Python wrapper:

```python
from pycausal.pycausal import pycausal as pc_obj
from pycausal import search as s
ges = s.ges(df, scoreId='sem-bic', maxDegree=-1)
```

---

## Part IV: Comparison — PC vs GES vs NOTEARS

| Aspect | PC | GES | NOTEARS |
|--------|-----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Search space** | Skeleton + orientations | CPDAG space | $\mathbb{R}^{d \times d}$ |
| **Core operation** | CI tests | Score maximization | Gradient descent |
| **Assumptions** | Faithfulness + sufficiency | Faithfulness | Linear SEM |
| **Output** | CPDAG | CPDAG | Directed DAG (or weighted adjacency) |
| **Consistency** | Yes (asymptotic) | Yes (asymptotic) | Stationary point (not global) |
| **Scalability** | Up to ~20 nodes | Up to ~100 nodes | Up to thousands |
| **Non-Gaussianity** | Requires kernel CI tests | BIC adapts | Needs extension |
| **Benchmark** | Spirtes et al. 2000 | Chickering 2002 | Zheng et al. 2018 |

### Key trade-offs

- **PC is interpretable in terms of CI tests**: each removed edge has an explicit statistical
  justification. This is useful for presenting results to domain experts.
- **GES avoids multiple testing**: PC runs $O(d^\delta)$ tests, each with its own type I
  error rate; GES uses a single global score that implicitly handles this via its penalty term.
- **NOTEARS scales to very high dimensions** where PC/GES become computationally intractable,
  but it assumes a linear SEM and only finds local optima.
- **PC can handle latent confounders** (via the FCI extension); GES and NOTEARS assume
  causal sufficiency.

---

## Part V: Key References

1. Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search*
   (2nd ed.). MIT Press. Free online: https://mitpress.mit.edu/9780262527927/
2. Spirtes, P., & Glymour, C. (1991). An algorithm for fast recovery of sparse causal
   graphs. *Social Science Computer Review*, 9(1), 62–72.
3. Chickering, D. M. (2002). Optimal structure identification with greedy search.
   *Journal of Machine Learning Research*, 3, 507–554. https://jmlr.org/papers/v3/chickering02b.html
4. Verma, T., & Pearl, J. (1990). Equivalence and synthesis of causal models. In *Proc.
   6th Conference on Uncertainty in Artificial Intelligence*, 220–227.
5. Andersson, S. A., Madigan, D., & Perlman, M. D. (1997). A characterization of Markov
   equivalence classes for acyclic digraphs. *Annals of Statistics*, 25(2), 505–541.
6. Meek, C. (1995). Causal inference and causal explanation with background knowledge.
   In *Proc. 11th Conference on Uncertainty in Artificial Intelligence*, 403–410.
7. Kalisch, M., et al. (2012). Causal inference using graphical models with the R package
   pcalg. *Journal of Statistical Software*, 47(11), 1–26.
