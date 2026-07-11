# Synthesis Survey: Constraint-Based and Score-Based Causal Structure Learning

> **Provenance note**: PDFs for the primary sources (Spirtes, Glymour & Scheines 2000;
> Chickering 2002; Colombo & Maathuis 2014) were unavailable for download due to the
> remote-session network policy (arXiv, JMLR blocked). This survey is written from the
> author's training-knowledge of these papers and is used as the raw synthesis source
> for the vault notes. — Ingested 2026-07-11.

---

## Primary Sources

| Ref | Citation | Open location |
|-----|---------|--------------|
| SGS2000 | Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search*, 2nd ed., MIT Press | MIT Press open-access (2nd ed.); CMU Philosophy Dept page |
| C2002 | Chickering, D.M. (2002) "Optimal structure identification with greedy search." *JMLR* 3:507–554 | https://jmlr.org/papers/v3/chickering02b.html |
| CM2014 | Colombo, D. & Maathuis, M.H. (2014) "Order-independent constraint-based causal structure learning." *JMLR* 15:3921–3962 | https://jmlr.org/papers/v15/colombo14a.html ; arXiv:1211.3295 |
| MR1995 | Meek, C. (1995) "Causal inference and causal explanation with background knowledge." *UAI* 11:403–410 | (orientation rules R1–R4) |
| Z2018 | Zheng et al. (2018) "DAGs with NO TEARS." *NeurIPS* | arXiv:1803.01422 (already in raw/) |

---

## 1. Markov Equivalence and CPDAGs

### 1.1 The identifiability ceiling for observational data

A core negative result underlies all causal discovery work: *observational data alone cannot distinguish two DAGs that encode the same set of conditional independence (CI) relations*. Any two DAGs that encode the same CI relations are **Markov equivalent**, and the best an algorithm working on observational data can do — without additional assumptions like non-Gaussianity (LiNGAM) or interventional data — is to identify the **Markov equivalence class (MEC)** of the true DAG.

### 1.2 Characterisation via skeleton and v-structures

**Definition (Skeleton)**: The skeleton of a DAG G is the undirected graph obtained by ignoring all edge orientations.

**Definition (V-structure / immorality)**: A v-structure is a triple $(X, Z, Y)$ where $X \to Z \leftarrow Y$ and there is no edge between $X$ and $Y$. (Also called a "collider" in the causal inference notation: Z is a collider on the unshielded triple $X - Z - Y$.)

**Theorem (Verma & Pearl 1990)**: Two DAGs $G_1$ and $G_2$ are Markov equivalent if and only if:
1. They have the **same skeleton** (same set of undirected edges), AND
2. They have the **same v-structures** (same immoralities).

This is the fundamental characterisation. It means the only edges that can be oriented from observational data are those involved in v-structures, plus edges that must be oriented to avoid introducing new v-structures or cycles (Meek 1995 orientation rules).

### 1.3 The CPDAG (essential graph)

**Definition (CPDAG)**: The *Completed Partially Directed Acyclic Graph* is the unique graphical representation of a Markov equivalence class. An edge in the CPDAG is:
- **Directed** ($X \to Y$): if and only if the edge is oriented the same way in *every* DAG in the MEC (a "compelled" edge).
- **Undirected** ($X - Y$): if there exist members of the MEC with the edge in each direction.

CPDAGs are also called *essential graphs* (Anderson, Madigan & Perlman 1997).

**Algorithm to compute CPDAG from a DAG**:
1. Find all v-structures; orient them.
2. Apply Meek's 4 orientation rules (R1–R4) to propagate orientation without creating new v-structures or cycles.
3. Every remaining undirected edge is in the equivalence class.

### 1.4 Meek's orientation rules (R1–R4)

These rules complete the CPDAG from skeleton + v-structures:

- **R1**: If $Z \to X - Y$ and $Z$ not adjacent to $Y$, orient as $X \to Y$ (otherwise $Z \to X \leftarrow Y$ would be a new v-structure).
- **R2**: If $X \to Z \to Y$ and $X - Y$, orient $X \to Y$ (otherwise a directed cycle forms).
- **R3**: If $X - Z_1 \to Y$ and $X - Z_2 \to Y$ and $Z_1$ not adjacent to $Z_2$ and $X - Y$, orient $X \to Y$.
- **R4**: (Used in the FCI algorithm for MAGs, less commonly for CPDAGs of DAGs alone.)

### 1.5 The faithfulness assumption

Both PC and GES require the **faithfulness assumption** (also called the "stability" or "SGS faithfulness" assumption):

**Definition (Faithfulness)**: A distribution $\mathbb{P}$ is faithful to DAG $G$ if *every* CI relation in $\mathbb{P}$ is entailed by d-separation in $G$. Equivalently: no CI relation arises from canceling path coefficients rather than graph structure.

Faithfulness is the bridge that makes CI testing informative for structure: under faithfulness, $X \perp\!\!\!\perp Y \mid Z$ in the data if and only if $Z$ d-separates $X$ and $Y$ in the true DAG.

---

## 2. The PC Algorithm (Spirtes & Glymour 1991, SGS 2000)

Named after **P**eter Spirtes and **C**lark Glymour.

### 2.1 Input and output

- **Input**: Data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$; a CI oracle (in practice, a statistical test); significance level $\alpha$.
- **Output**: A CPDAG.
- **Assumptions**: Markov condition + faithfulness.

### 2.2 Phase 1: Skeleton discovery (adjacency search)

Start from the **complete undirected graph** $C_d$ on all $d$ variables.

For $l = 0, 1, 2, \ldots$:
1. For each pair of adjacent nodes $(X, Y)$, test $X \perp\!\!\!\perp Y \mid S$ for all subsets $S \subseteq \mathrm{adj}(X) \setminus \{Y\}$ (or $\mathrm{adj}(Y) \setminus \{X\}$) with $|S| = l$.
2. If any such test accepts $X \perp\!\!\!\perp Y \mid S^*$: remove the edge $X - Y$ from the graph, and record $\mathrm{sep}(X, Y) := S^*$.
3. Increment $l$ and repeat until no adjacent pair has $|\mathrm{adj}| - 1 \geq l$.

**Key property**: Testing subsets of increasing size means that only low-order CI tests are needed for sparse graphs. Under the assumption that max in-degree $\leq k$, the number of tests is $O(d^{k+2})$.

### 2.3 Phase 2: V-structure orientation

For each unshielded triple $(X, Z, Y)$ — meaning $X$ adj $Z$, $Z$ adj $Y$, but $X$ NOT adj $Y$:
- If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure).
- Else: leave $X - Z - Y$ undirected.

**Intuition**: If $Z$ was in the separating set of $X$ and $Y$, conditioning on $Z$ blocked the path — $Z$ is not a collider. If $Z$ was NOT in the separating set, the only way to block the unshielded path $X - Z - Y$ (consistent with Markov) is if $Z$ is a collider: $X \to Z \leftarrow Y$.

### 2.4 Phase 3: Edge orientation propagation

Apply Meek's rules R1–R3 repeatedly until no further orientation is possible.

**Output**: CPDAG.

### 2.5 Soundness and completeness

**Theorem (SGS 2000; Meek 1995)**: Under the Markov condition and faithfulness, the PC algorithm is *sound* (all orientations it makes are correct) and *complete* (the output CPDAG represents the MEC of the true DAG), with probability approaching 1 as $n \to \infty$ using a consistent CI test.

### 2.6 The order-dependence problem

A subtle pathology of the original PC: **the output can depend on the order in which variables are processed** in Phase 1. Specifically, when two CI tests contradict each other (due to finite-sample errors), which edge gets removed depends on the order of variable enumeration.

**PC-stable** (Colombo & Maathuis 2014): A modification that fixes this by collecting all adjacencies at level $l$ before removing any, making the skeleton fully order-independent.

**Conservative PC (CPC)**: More conservatively handles ambiguous v-structures — if a triple $(X, Z, Y)$ is "ambiguous" (some separating sets contain $Z$, some don't), it marks the triple as non-definite rather than orienting it.

### 2.7 CI tests used in practice

| Data type | Standard test | Notes |
|-----------|-------------|-------|
| Continuous / Gaussian | Fisher's Z-test on partial correlations | $Z = \frac{1}{2}\log\frac{1+\hat\rho}{1-\hat\rho}\sqrt{n - |S| - 3}$ |
| Discrete | G²-test or χ²-test | Suffers from sparsity in high dimensions |
| Nonparametric | Kernel CI test (KCIT), HSIC-based tests | Slower; needed for non-Gaussian continuous data |

### 2.8 Software

- **pcalg** (R): `pc()` function with `gaussCItest` or custom CI tests; `pcalg` package by Kalisch, Maechler, Hauser.
- **causal-learn** (Python): formerly `cdt`, now `causal-learn` by CMU Causality Lab; implements PC, FCI, GES.
- **TETRAD** (Java): GUI + API; reference implementation from the SGS group at CMU.

---

## 3. GES: Greedy Equivalence Search (Chickering 2002)

### 3.1 The MEC search space

GES does not search over individual DAGs; it searches over **Markov equivalence classes**, represented as CPDAGs. The number of MECs is smaller than the number of DAGs, and crucially, by the score equivalence property (see below), all DAGs in the same MEC receive the same score — so it makes sense to move in MEC space.

### 3.2 Score equivalence

**Definition (Decomposable score)**: A score $Q(G, \mathbf{X})$ is *decomposable* if it factors as $Q(G) = \sum_{j=1}^d Q_j(\mathrm{pa}_G(X_j), X_j)$ — each term depends only on the local family (a variable and its parents). Examples: BIC/MDL, BDe/BGe (Bayesian Dirichlet/Gaussian equivalent).

**Theorem (Chickering 2002)**: For any decomposable, consistent score, $Q(G_1) = Q(G_2)$ for all $G_1, G_2$ in the same MEC.

*Score equivalence* means no score can distinguish members of the same MEC — it is safe (and necessary) to work at the MEC level.

### 3.3 GES phases

**Phase 1 — Forward Equivalence Search (FES)**:
- Start from the empty CPDAG (no edges).
- Greedily apply the *insert* operator: add the edge $X \to Y$ (or equivalently update the CPDAG) that gives the maximum score improvement.
- Continue until no insert operator increases the score.

**Phase 2 — Backward Equivalence Search (BES)**:
- Start from the CPDAG returned by FES.
- Greedily apply the *delete* operator: remove an edge that gives the maximum score improvement (or minimum score decrease).
- Continue until no delete improves the score.

**Why two phases?** FES can add too many edges (overfitting) in finite samples; BES prunes them. Together they are analogous to forward-backward variable selection in regression.

### 3.4 The Meek conjecture (proved by Chickering 2002)

**Theorem (Meek conjecture, proved in Chickering 2002)**: If $G$ and $H$ are DAGs over the same variable set, and $H$ is an independence map (I-map) of $G$ (every d-separation in $H$ holds in $G$), then there exists a finite sequence of *covered edge reversals* and *edge additions* transforming $G$ into $H$, such that after each operation, the resulting graph remains an I-map of $G$.

**Significance**: This proves that the GES greedy search on the CPDAG space can reach the true MEC without getting trapped — the path from any starting CPDAG to the true MEC is always accessible. It is the theoretical foundation for GES's completeness.

**Covered edge**: $X \to Y$ is *covered* if $\mathrm{pa}(Y) = \mathrm{pa}(X) \cup \{X\}$. Covered edge reversals preserve Markov equivalence.

### 3.5 Consistency

**Theorem (Chickering 2002)**: Under faithfulness and Markov conditions, and using a consistent, decomposable, score-equivalent scoring function, GES identifies the true MEC with probability approaching 1 as $n \to \infty$.

The BIC score satisfies all the required properties; so does the BGe (Bayesian Gaussian equivalent) score.

### 3.6 FGS (Fast GES, Ramsey et al. 2017)

Ramsey et al. (2017) propose *FGS* (Fast Greedy Search), a parallelized, Java-based implementation of GES that scales to thousands of variables by:
- Parallelizing the score computation across edge candidates.
- Restricting the search to a sparse subset of candidate parents (using a preliminary skeleton estimate).

FGS is the baseline that NOTEARS (2018) competes against.

### 3.7 Software

- **pcalg** (R): `ges()` function with `gaussCItest` or BIC score.
- **causal-learn** (Python): `GES` class.
- **TETRAD** / **FGES** (Java): reference FGS/FGES implementation.

---

## 4. Comparison: PC, GES, NOTEARS

| Property | PC | GES | NOTEARS |
|----------|-----|-----|---------|
| Paradigm | Constraint-based | Score-based | Continuous optimization |
| Core assumption | Faithfulness + Markov | Faithfulness + Markov | Markov (faithfulness not needed for LS consistency) |
| Output | CPDAG (MEC) | CPDAG (MEC) | DAG (single) |
| Search space | Undirected graph → CPDAG | CPDAG space directly | $\mathbb{R}^{d\times d}$ |
| Score/test | CI tests (flexible) | Decomposable score (BIC, BDe) | LS + ℓ₁ penalization |
| Consistency | Yes, asymptotic | Yes, asymptotic | Yes (for linear Gaussian/non-Gaussian SEM) |
| Scalability | $O(d^{k+2})$ CI tests, k=max degree | $O(d^3)$ per step | $O(d^3)$ per AL iteration |
| Order dependence | Yes (PC-stable fixes) | No | No |
| Non-Gaussian data | Via kernel CI tests | Via non-Gaussian score | Natively (z_j non-Gaussian) |
| Software (R) | pcalg::pc() | pcalg::ges() | — |
| Software (Python) | causal-learn | causal-learn | notears (github) |

**When to prefer each**:
- **PC**: when domain-appropriate CI tests are available and the graph is sparse. Non-parametric CI tests allow non-Gaussian and discrete data. Cheap for sparse graphs.
- **GES**: when a parametric model is justified (Gaussian linear SEM), and a BIC/BGe score is available. More principled than PC under the score-based framework. Better in practice for medium-density graphs.
- **NOTEARS**: when scalability to high dimensions ($d > 100$) is needed, or when a continuous optimization framework is preferred (e.g., gradient-based hyperparameter tuning). Outputs a single DAG rather than an MEC. No faithfulness needed for the LS score consistency proof.

---

## 5. Additional software: causal-learn (Python) / pcalg (R)

### 5.1 causal-learn (Python)
Package: `causal-learn` (formerly `cdt`), maintained by CMU Causality Lab.
```python
from causallearn.search.ConstraintBased.PC import pc
from causallearn.search.ScoreBased.GES import ges
from causallearn.utils.cit import fisherz

# PC algorithm
cg = pc(data, alpha=0.05, indep_test=fisherz)
cg.draw_pydot_graph()

# GES
Record = ges(data, score_func='local_score_BIC')
```

### 5.2 pcalg (R)
```r
library(pcalg)

# PC algorithm
pc.fit <- pc(suffStat = list(C = cor(X), n = nrow(X)),
             indepTest = gaussCItest,
             alpha = 0.05, p = ncol(X))

# GES
ges.fit <- ges(new("BIC", data = X))
```

### 5.3 Structure metrics

When comparing algorithms, the standard metrics are:
- **SHD** (Structural Hamming Distance): number of edge additions, deletions, and reversals needed to convert output to true DAG/CPDAG.
- **FDR** (False Discovery Rate): proportion of discovered edges that are false.
- **TPR** (True Positive Rate / Recall): proportion of true edges recovered.
- **Adjacency precision/recall**: for the undirected skeleton.
- **Arrowhead precision/recall**: for the oriented edges.
