---
title: "PC Algorithm and GES: Survey of Foundational Literature"
source_urls:
  - "https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/.g/scottd/fullbook.pdf"
  - "https://jmlr.org/papers/v3/chickering02b.html"
  - "https://arxiv.org/abs/2303.15027"
author:
  - "[[Peter Spirtes]]"
  - "[[Clark Glymour]]"
  - "[[Richard Scheines]]"
  - "[[David Maxwell Chickering]]"
published: "2000 / 2002"
created: 2026-07-21
description: >
  Survey of the two classical causal structure learning paradigms: (1) the PC (Peter-Clark) algorithm from Spirtes, Glymour & Scheines (2000) "Causation, Prediction, and Search" — a constraint-based algorithm using conditional independence tests; and (2) GES (Greedy Equivalence Search) from Chickering (2002) "Optimal Structure Identification with Greedy Search" JMLR 3:507-554 — a score-based algorithm searching over Markov equivalence classes. Both PDFs were freely available but blocked by session network policy; this document synthesises content from comprehensive coverage in the causal discovery literature. Also draws on Colombo & Maathuis (2014) "Order-independent constraint-based causal structure learning" JMLR 15:3741-3782 (PC-stable).
tags:
  - "clippings"
  - "doc/paper"
  - "topic/causal-discovery"
  - "topic/causal-inference"
---

# PC Algorithm and GES: Survey of Foundational Literature

This note summarises the two principal references for classical causal structure learning, as the source PDFs could not be retrieved programmatically. Content is drawn from comprehensive coverage of these works in the causal inference and machine learning literature.

---

## 1. Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd Ed.

### 1.1 Background and Setting

Spirtes, Glymour & Scheines (SGS) develop a unified framework for learning causal structure from observational data, combining:

1. **Causal graph semantics**: DAGs encode causal relationships; d-separation encodes conditional independence
2. **The Markov condition**: if $X$ and $Y$ are d-separated by $Z$ in the DAG, then $X \perp Y \mid Z$ in the distribution
3. **The faithfulness (stability) condition**: if $X \perp Y \mid Z$ in the distribution, then $X$ and $Y$ are d-separated by $Z$ in the DAG — the converse of Markov

Faithfulness rules out distributions with "accidental" independencies — e.g. when path coefficients precisely cancel. Under both conditions, conditional independence relations in the distribution are in exact correspondence with d-separation in the DAG.

### 1.2 Markov Equivalence and the CPDAG

A key observation: observational data cannot distinguish among DAGs that encode the same conditional independence relations. Two DAGs are **Markov equivalent** (also: observationally equivalent, distribution equivalent) iff they have:
1. The same **skeleton** (same undirected edges when directions are ignored)
2. The same **v-structures** (unshielded colliders $X \to Z \leftarrow Y$ where $X$ and $Y$ are not adjacent)

This is the Verma-Pearl (1990) characterisation of Markov equivalence. Each equivalence class is uniquely represented by a **CPDAG** (Completed Partially Directed Acyclic Graph), also called a **pattern**: edges that have the same orientation in all member DAGs are directed; edges where some members disagree are undirected.

**Implications for identifiability:** Without additional assumptions (e.g. functional form restrictions, non-Gaussianity, interventional data), observational data identifies only the CPDAG, not a specific DAG. Individual causal directions within undirected CPDAG edges are not identified from purely observational data.

### 1.3 PC Algorithm

The **PC algorithm** (named for **P**eter Spirtes and **C**lark Glymour) learns the CPDAG using conditional independence (CI) tests.

#### Phase 1: Skeleton discovery

**Input:** $n$ i.i.d. samples from $p(X_1, \ldots, X_d)$; significance level $\alpha$.
**Output:** Undirected skeleton and separating sets $\mathrm{sep}(X_i, X_j)$ for non-adjacent pairs.

```
1. Start with complete undirected graph G on d nodes.
2. For l = 0, 1, 2, ...:
   a. For each ordered pair (Xi, Xj) with an edge in G:
      - Let Adj(G, Xi) = current adjacency set of Xi in G
      - For each subset S ⊆ Adj(G, Xi) \ {Xj} with |S| = l:
          * Test H0: Xi ⊥ Xj | S
          * If test is not rejected (p-value > α):
              - Remove edge Xi-Xj from G
              - Record sep(Xi, Xj) = sep(Xj, Xi) = S
              - Break (proceed to next pair)
   b. If no edges were removed in step (a), stop.
```

The algorithm increases $l$ (the conditioning set size) one at a time. Because the graph is pruned as edges are removed, later tests condition only on adjacencies in the current (sparser) graph.

**Complexity:** Worst case exponential in the maximum neighborhood size $k$: $O(d^{k+2})$ CI tests. For sparse graphs with bounded $k$, this is polynomial in $d$.

#### Phase 2: V-structure orientation

For each unshielded triple $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are not adjacent):

- If $X_k \notin \mathrm{sep}(X_i, X_j)$: orient as $X_i \to X_k \leftarrow X_j$ (a v-structure / collider)
- Otherwise: leave undirected

**Key insight:** In an unshielded triple, $X_k$ is in the separating set iff it is a non-collider on the path. So non-colliders (mediators and forks) have $X_k \in \mathrm{sep}$, while colliders do not.

#### Phase 3: Meek orientation rules (propagation)

Apply the following rules repeatedly until no new orientations are possible:

**R1 (Acyclicity):** If $A \to B - C$ and $A$ and $C$ are not adjacent, orient $B \to C$.
*Reason:* If $B \leftarrow C$, then $A \to B \leftarrow C$ would be a new v-structure, contradicting Phase 2.

**R2 (Avoid cycles):** If $A \to B \to C$ and $A - C$, orient $A \to C$.
*Reason:* If $C \to A$, there would be a directed cycle $A \to B \to C \to A$.

**R3 (Orientation disambiguation):** If $A - C$, $B - C$, $A \to D$, $B \to D$, $A - B$ not adjacent, and $D - C$ undirected, orient $C \to D$.
*Reason:* Ensures no new v-structure is created.

**R4 (Shortcut):** If $A - B \to C \to D$ and $A - D$ and $A$ not adjacent to $C$, orient $A \to B$.

These rules (due to Meek 1995) are **complete**: applying them exhaustively yields the full CPDAG — no additional edge can be oriented from the skeleton and v-structures alone without additional assumptions.

#### Correctness theorem

**Theorem (SGS 2000, Theorem 5.1):** Assume the Causal Markov condition, Faithfulness, and causal sufficiency (no hidden common causes). Then, as $n \to \infty$ with a consistent CI test:

$$\mathrm{PC}(\text{data}, \alpha_n \to 0) \xrightarrow{p} \mathrm{CPDAG}(\mathcal{G}^*)$$

The PC algorithm consistently identifies the CPDAG of the true DAG $\mathcal{G}^*$.

**High-dimensional consistency:** Kalisch & Bühlmann (2007) extend PC to the high-dimensional setting ($d \gg n$) with Gaussian faithfulness and Fisher's z-test: consistency holds when $\log(d) = o(n^{1/3})$ — allowing exponentially many variables relative to sample size.

### 1.4 CI Tests Used in Practice

| Setting | Test | Statistic |
|---------|------|-----------|
| Gaussian / linear | Partial correlation | Fisher's $z$-transform: $z = \frac{1}{2}\log\frac{1+\hat\rho}{1-\hat\rho} \cdot \sqrt{n-|S|-3}$ |
| Discrete / categorical | G-test or $\chi^2$ | $G^2 = 2\sum_{x,y,s} n_{xys} \log \frac{n_{xys} n_{s}}{n_{xs} n_{ys}}$ |
| Non-parametric / non-linear | Kernel CI test (KCIT) | Maximum Mean Discrepancy / HSIC; computationally expensive |
| General / permutation | Conditional permutation test | Permute $X_i$ holding $S$ fixed |

### 1.5 PC-stable and Order-Independence

A known issue: the original PC algorithm is **order-dependent** — the CPDAG returned can depend on the order in which variables are enumerated. Colombo & Maathuis (2014) propose **PC-stable** which computes all conditional independencies at the same conditioning-set size $l$ before removing any edges, making the result **order-independent**. PC-stable is the default in modern implementations (`pcalg` R package, `causal-learn` Python).

### 1.6 FCI: Allowing Hidden Common Causes

The **Fast Causal Inference (FCI)** algorithm (also SGS 2000) extends PC to the case where causal sufficiency fails — i.e. there may be unobserved confounders. FCI returns a **PAG** (Partial Ancestral Graph) whose edges encode uncertainty about whether observed edges reflect direct causation or hidden confounding. FCI is slower (more CI tests) but valid without causal sufficiency.

---

## 2. Chickering (2002) — *Optimal Structure Identification with Greedy Search*, JMLR 3:507–554

### 2.1 Background

Chickering's paper makes two major contributions:

1. **Proves the Meek Conjecture** (Theorem 15): establishes the navigability of the equivalence class space via covered edge reversals — the theoretical backbone of GES's validity.
2. **Proposes GES** (Greedy Equivalence Search): a polynomial-time score-based algorithm that searches over CPDAGs rather than individual DAGs.

### 2.2 Covered Edge Reversals and the Meek Conjecture

**Definition (Covered edge):** An edge $X \to Y$ is **covered** in DAG $\mathcal{G}$ if:
$$\mathrm{Pa}_\mathcal{G}(X) = \mathrm{Pa}_\mathcal{G}(Y) \setminus \{X\}$$
That is, the parents of $X$ equal the parents of $Y$ minus $X$ itself.

**Proposition:** Reversing a covered edge (replacing $X \to Y$ with $X \leftarrow Y$) yields a DAG in the **same** Markov equivalence class — i.e. the CPDAG is unchanged.

**Meek Conjecture (proved by Chickering 2002, Theorem 15):** If $\mathcal{H}$ is an I-map of $\mathcal{G}$ (i.e. $\mathcal{H}$ encodes all CI relations of $\mathcal{G}$), then there exists a sequence of covered edge reversals that transforms $\mathcal{G}$ into $\mathcal{H}$ such that every intermediate graph is also an I-map of $\mathcal{G}$.

**Significance:** This establishes that the space of Markov equivalence classes is connected under local moves (covered edge reversals within a class) and insert/delete moves (adding or removing edges between classes). GES can navigate this space with local operators.

### 2.3 GES Algorithm

GES searches directly over CPDAGs using two types of **local operators** that move between equivalence classes:

**Insert operator** $\mathrm{Insert}(X, Y, H)$: adds the directed edge $X \to Y$ to the CPDAG and re-orients a set $H \subseteq \mathrm{Adj}(Y) \setminus \mathrm{Adj}(X)$ of edges incident to $Y$ to maintain valid CPDAG form.

**Delete operator** $\mathrm{Delete}(X, Y, H)$: removes the edge between $X$ and $Y$ and re-orients a subset $H$ of $Y$'s neighbours.

#### Phase 1: Forward Equivalence Search (FES)

```
1. Start with the empty CPDAG (no edges).
2. Repeat:
   a. Among all valid Insert operators, find (X*, Y*, H*) = argmax_{{X,Y,H}} δscore(Insert(X,Y,H))
   b. If δscore > 0: apply Insert(X*, Y*, H*)
   c. Else: STOP
3. Return current CPDAG C_FES
```

Each insert operator adds the edge $X \to Y$ and reorients adjacencies of $Y$ to maintain CPDAG form. The score change decomposes as:

$$\delta\mathrm{score}(\mathrm{Insert}(X,Y,H)) = \mathrm{score}(Y, \mathrm{Pa}(Y) \cup \{X\} \cup H) - \mathrm{score}(Y, \mathrm{Pa}(Y))$$

#### Phase 2: Backward Equivalence Search (BES)

```
1. Start from C_FES.
2. Repeat:
   a. Among all valid Delete operators, find (X*, Y*, H*) = argmax_{{X,Y,H}} δscore(Delete(X,Y,H))
   b. If δscore ≥ 0: apply Delete(X*, Y*, H*)
   c. Else: STOP
3. Return current CPDAG C_BES
```

BES removes edges that do not improve the score. Because the score used (BIC, BDe) penalises complexity, BES acts as a pruning step that removes edges that were greedily added in FES but are not supported by the data.

### 2.4 Decomposable Score Functions

GES requires a **decomposable score**: a score that factors over nodes and their parents,

$$\mathrm{score}(\mathcal{G}) = \sum_{j=1}^{d} \mathrm{score}(X_j, \mathrm{Pa}_\mathcal{G}(X_j))$$

Common choices:

| Score | Setting | Form |
|-------|---------|------|
| BIC | Gaussian linear SEM | $\hat{\ell}(X_j, \mathrm{Pa}) - \frac{|\mathrm{Pa}|+1}{2}\log n$ |
| BDe(u) | Discrete variables | $\log p(X_j \mid \mathrm{Pa}, \text{prior hyperparams})$ (Dirichlet-Multinomial) |
| BGe | Gaussian (Bayesian) | Marginal log-likelihood under Normal-Wishart prior |

**Local consistency:** A score is **locally consistent** if, for any DAG $\mathcal{G}$ and variable $X_j$:
- If $X_k$ is a parent of $X_j$ in $\mathcal{G}^*$: $\mathrm{score}(X_j, \mathrm{Pa} \cup \{X_k\}) > \mathrm{score}(X_j, \mathrm{Pa})$ for large $n$ a.s.
- If $X_k$ is not a parent of $X_j$ in $\mathcal{G}^*$: $\mathrm{score}(X_j, \mathrm{Pa} \cup \{X_k\}) < \mathrm{score}(X_j, \mathrm{Pa})$ for large $n$ a.s.

BIC is locally consistent for linear Gaussian SEMs. BDe(u) is locally consistent for discrete SEMs.

### 2.5 Consistency Theorem

**Theorem (Chickering 2002, Theorem 19):** Under:
1. Causal Markov condition and Faithfulness
2. Causal sufficiency (no hidden common causes)
3. A locally consistent, decomposable score

GES consistently identifies the true CPDAG:
$$\mathrm{GES}(\text{data}) \xrightarrow{n \to \infty} \mathrm{CPDAG}(\mathcal{G}^*)$$

**Comparison to PC:** Like PC, GES identifies the CPDAG (not a unique DAG). Unlike PC, GES uses the global score rather than individual CI tests, making it more reliable in finite samples under the correct distributional assumptions. GES also avoids the order-dependence issue of PC.

---

## 3. Comparison: Constraint-Based vs Score-Based vs Continuous

| Dimension | Constraint-based (PC) | Score-based (GES) | Continuous (NOTEARS) |
|-----------|----------------------|-------------------|----------------------|
| Target | CPDAG | CPDAG | Single DAG |
| Method | CI tests (hypothesis tests) | Score maximization | Continuous optimization |
| Assumptions | Markov + Faithfulness + Causal sufficiency | Markov + Faithfulness + Causal sufficiency + locally consistent score | Markov + Faithfulness + Linearity |
| Search space | Undirected graph → CPDAG | CPDAGs directly | $\mathbb{R}^{d \times d}$ |
| Outputs equivalence class | Yes | Yes | No (returns single DAG) |
| Handles hidden confounders | Via FCI extension | Not directly | No |
| Finite-sample accuracy | Sensitive to CI test power | More stable (uses full score) | Depends on score / regularization |
| Computation | $O(d^{k+2})$ CI tests ($k$ = max degree) | $O(d^2)$ operators per step | $O(d^3)$ per L-BFGS step |
| Software | `pcalg` (R), `causal-learn` (Python), Tetrad | `pcalg` (R), Tetrad | `notears` (Python) |
| Key reference | Spirtes et al. 2000 (SGS) | Chickering 2002 | Zheng et al. 2018 |

---

## 4. Software Implementations

### pcalg (R)
The reference R package for both PC and GES:
```r
library(pcalg)
# PC algorithm
skel <- skeleton(suffStat = list(C=cor(X), n=nrow(X)),
                 indepTest = gaussCItest, alpha = 0.05,
                 p = ncol(X))
pc_result <- pc(suffStat = list(C=cor(X), n=nrow(X)),
                indepTest = gaussCItest, alpha = 0.05,
                p = ncol(X))
# GES
score <- new("GaussL0penObsScore", X)
ges_result <- ges(score)
```

### causal-learn (Python)
Python implementation of PC and many extensions:
```python
from causallearn.search.ConstraintBased.PC import pc
from causallearn.search.ScoreBased.GES import ges

# PC
cg = pc(data)  # returns CausalGraph

# GES
record = ges(data)
```

### Tetrad (Java)
The original implementation by the SGS group at CMU; GUI and command-line interfaces for PC, FCI, GES, and many variants.
