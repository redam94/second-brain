# Synthesis Survey: Constraint-Based and Score-Based Causal Structure Learning

> **Note on sources.** Direct PDF downloads of the primary papers were blocked by the session's
> network policy (arXiv and JMLR inaccessible). This survey is synthesised from training knowledge
> of the following sources:
>
> - Spirtes, P. & Glymour, C. (1991). An algorithm for fast recovery of sparse causal graphs.
>   *Social Science Computer Review*, 9(1), 62–72. [PC algorithm — original paper]
> - Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd ed.
>   MIT Press. [Full treatment of constraint-based methods; freely available at
>   https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/glossary/cps.pdf]
> - Verma, T. & Pearl, J. (1990). Equivalence and synthesis of causal models. *UAI 1990*.
>   [Characterization of Markov equivalence: same skeleton + same v-structures]
> - Meek, C. (1995). Causal inference and causal explanation with background knowledge. *UAI 1995*.
>   [Four orientation rules that complete the CPDAG; "Meek Conjecture" later proved by Chickering]
> - Andersson, S.A., Madigan, D. & Perlman, M.D. (1997). A characterization of Markov equivalence
>   classes for acyclic digraphs. *Annals of Statistics*, 25(2), 505–541.
>   [CPDAG characterization, Markov equivalence class representation]
> - Chickering, D.M. (2002). Optimal structure identification with greedy search.
>   *Journal of Machine Learning Research*, 3, 507–554.
>   [GES; proves Meek Conjecture; JMLR open access]
> - Kalisch, M. & Bühlmann, P. (2007). Estimating high-dimensional directed acyclic graphs with
>   the PC-algorithm. *JMLR*, 8, 613–636. arXiv:math/0510436.
>   [Consistency of PC in high dimensions; stable-PC variant]
> - Ramsey, J., Glymour, M., Sanchez-Romero, R. & Glymour, C. (2017). A million variables and
>   more: the Fast Greedy Equivalence Search algorithm for learning high-dimensional graphical
>   models. *Journal of Data Science and Statistics*, 1, 141–162.
>   [FGES — parallelized GES for large graphs; implemented in TETRAD/py-causal]

---

## 1. The Causal Structure Learning Setting

Given $n$ i.i.d. observations of $(X_1,\ldots,X_d)$, learn the structure of the DAG $G$ that
generated them. Two fundamentally different paradigms exist:

| Paradigm | Approach | Canonical methods |
|----------|----------|-------------------|
| **Constraint-based** | Test conditional independences; remove edges from a complete graph | PC, FCI, RFCI |
| **Score-based** | Maximise a model-selection score over (equivalence classes of) DAGs | GES, FGES, BOSS |
| **Continuous optimization** | Relax the combinatorial DAG constraint to a continuous one | NOTEARS (→ [[NOTEARS - Overview]]) |

---

## 2. Foundational Assumptions

### 2.1 Causal Markov Condition (CMC)

Each variable is conditionally independent of its non-descendants given its parents:
$$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}_G(X_i).$$
This implies the global Markov property: every d-separation in $G$ entails a CI in $P$.

### 2.2 Faithfulness

Every conditional independence in $P$ is entailed by d-separation in $G$. Formally, for every
triple $(X_i, X_j, S)$:
$$X_i \perp\!\!\!\perp X_j \mid X_S \;\Rightarrow\; d\text{-sep}_G(i,j\mid S).$$
Faithfulness rules out "exact cancellations" where structural coefficients conspire to produce
extra independences not present in the graph. Violation is measure-zero for continuous
distributions (Meek 1995), though it can occur for specific parameterisations.

### 2.3 d-separation (Pearl 1988)

$X$ is d-separated from $Y$ given $Z$ in $G$ (written $X \perp_G Y \mid Z$) if every
undirected path from $X$ to $Y$ is *blocked* by $Z$. A path is blocked if it contains:
1. A **non-collider** node $M \in Z$ (fork $X \leftarrow M \rightarrow Y$ or pipe $X \rightarrow M \rightarrow Y$), OR
2. A **collider** $M$ ($X \rightarrow M \leftarrow Y$) where $M \notin Z$ and no descendant of $M$ is in $Z$.

---

## 3. Markov Equivalence and CPDAGs

### 3.1 Verma–Pearl characterisation

> **Theorem (Verma & Pearl 1990).** Two DAGs $G_1$ and $G_2$ are Markov equivalent (entail
> the same conditional independences for all faithful distributions) **if and only if** they have
> the same **skeleton** (underlying undirected graph) and the same **v-structures**
> (unshielded colliders $X_i \rightarrow X_k \leftarrow X_j$ where $X_i$ is not adjacent to $X_j$).

### 3.2 CPDAG (Completed Partially Directed Acyclic Graph)

The Markov equivalence class (MEC) is uniquely represented by a CPDAG:
- **Directed edge** $X_i \rightarrow X_j$: present in **every** DAG in the MEC (compelled edge)
- **Undirected edge** $X_i - X_j$: some DAGs in the MEC have $\rightarrow$, others $\leftarrow$ (reversible edge)

An edge $X_i \rightarrow X_j$ is *compelled* iff it participates in a v-structure (Chickering 2002,
Lemma 5). The CPDAG can be computed from any DAG in the MEC via the `pdag2dag` algorithm.

### 3.3 Covered edges

An edge $X_i \rightarrow X_j$ is **covered** if $\mathrm{Pa}(X_i) = \mathrm{Pa}(X_j) \setminus \{X_i\}$.
Covered edges are exactly the reversible edges in the CPDAG (Meek 1995, Chickering 1995).

> **Theorem (Chickering 1995, Meek Conjecture — proved in Chickering 2002).** Two DAGs $G_1$ and
> $G_2$ are Markov equivalent iff one can be obtained from the other by a sequence of **covered
> edge reversals** (flipping $X_i \rightarrow X_j$ to $X_i \leftarrow X_j$ where the edge is covered).

---

## 4. The PC Algorithm (Spirtes & Glymour 1991)

### 4.1 Algorithm overview

The PC algorithm (named after its inventors **P**eter Spirtes and **C**lark Glymour) learns the
CPDAG in three phases:

**Input:** Variables $X_1,\ldots,X_d$; conditional independence oracle (or test at level $\alpha$).
**Output:** CPDAG $\widehat{H}$ of the true DAG $G$.

#### Phase 1 — Skeleton learning (conditional independence testing)

1. Start with the complete undirected graph $C = K_d$.
2. For $\ell = 0, 1, 2, \ldots$:
   - For each adjacent pair $(X_i, X_j)$ in the current graph:
     - For each $S \subseteq \mathrm{Adj}(X_i) \setminus \{X_j\}$ with $|S| = \ell$:
       - If $X_i \perp\!\!\!\perp X_j \mid X_S$: remove edge $i-j$, record $\mathrm{sep}(i,j) = S$. Break.
   - Stop when no adjacent pair has $|\mathrm{Adj}(X_i)| - 1 \ge \ell$.
3. Output: skeleton $\widehat{S}$ and separation sets $\mathrm{sep}(i,j)$.

The key insight: edges are tested with increasing conditioning set sizes. Since the true
separation set $\mathrm{sep}^*(i,j)$ must be a subset of the parents (and thus bounded by
the maximum degree), this terminates efficiently for sparse graphs.

#### Phase 2 — V-structure orientation

For each **unshielded triple** $(X_i, X_j, X_k)$ (skeleton: $i-j-k$ but $i \not\sim k$):
- If $X_j \notin \mathrm{sep}(i,k)$: orient as $X_i \rightarrow X_j \leftarrow X_k$ (collider at $j$).

*Justification:* If $j$ was not in the separation set that made $i$ and $k$ independent, then
conditioning on $j$ activates the path $i \rightarrow j \leftarrow k$ — meaning $j$ is a collider.

#### Phase 3 — Meek orientation rules (propagation)

Apply repeatedly until no new edges can be oriented:

- **R1** (avoid new v-structure): $\alpha \rightarrow \beta - \gamma$, and $\alpha \not\sim \gamma$:
  orient $\beta \rightarrow \gamma$ (otherwise $\alpha \rightarrow \beta \leftarrow \gamma$ would be a new unshielded collider)
- **R2** (avoid cycle): $\alpha \rightarrow \beta \rightarrow \gamma$, and $\alpha - \gamma$:
  orient $\alpha \rightarrow \gamma$ (otherwise $\alpha \leftarrow \gamma \rightarrow \beta \rightarrow \gamma$ creates cycle)
- **R3** (enforce consistency): $\alpha - \beta \rightarrow \gamma$, $\alpha - \delta \rightarrow \gamma$,
  $\alpha - \gamma$, $\beta \not\sim \delta$: orient $\alpha \rightarrow \gamma$
- **R4** (chain inference): $\alpha - \beta \rightarrow \gamma \rightarrow \delta$, $\alpha - \delta$,
  $\alpha \not\sim \gamma$, $\beta \sim \delta$: orient $\alpha \rightarrow \delta$

Rules R1–R4 are sound and **complete**: every edge that can be oriented without changing the MEC
will be oriented (Meek 1995).

### 4.2 Conditional independence tests in practice

| Data type | Test | Statistic |
|-----------|------|-----------|
| Continuous Gaussian | Fisher's z-test on partial correlations | $z = \frac{1}{2}\ln\frac{1+\hat\rho_{ij\mid S}}{1-\hat\rho_{ij\mid S}} \cdot \sqrt{n - |S| - 3}$ |
| Continuous non-Gaussian | Kernel CI test (HSIC-based) | $\widehat{\mathrm{HSIC}}(X_i, X_j \mid X_S)$ |
| Discrete | $G^2$ test or conditional mutual information | $G^2 = 2\sum_{x,y,s} n_{xys}\ln\frac{n_{xys} n_s}{n_{xs} n_{ys}}$ |

### 4.3 Consistency (Kalisch & Bühlmann 2007)

> **Theorem (Kalisch & Bühlmann 2007).** Assume the causal Markov condition, faithfulness, and
> that the maximum adjacency size in the true DAG satisfies $q = o(\log n / \log p)$.
> Using Fisher's z-test at level $\alpha_n \to 0$ with $n^{1/3}\alpha_n \to \infty$ (e.g.
> $\alpha_n = 1/\log n$):
>
> $$\Pr[\widehat{H}_n = H^*] \to 1 \quad \text{as } n \to \infty,$$
>
> where $H^*$ is the true CPDAG, and $p = O(n^a)$ for any fixed $a > 0$.

This allows the number of variables to grow *polynomially* in $n$ — a strong consistency result.

### 4.4 Stable PC (Colombo & Maathuis 2014)

The original PC algorithm is **order-dependent**: the skeleton may change if variables are
permuted, because the adjacency set $\mathrm{Adj}(X_i)$ changes as edges are removed, affecting
which conditioning sets are tested. The **stable PC** variant fixes this by using the adjacency
list from the *start* of each level $\ell$ (not updating mid-level), making it order-independent.

---

## 5. GES: Greedy Equivalence Search (Chickering 2002)

### 5.1 Overview

GES searches over **Markov equivalence classes** (represented as CPDAGs) rather than individual
DAGs. This avoids the redundancy of searching over all $|\mathrm{MEC}|$ Markov equivalent DAGs
for each equivalence class.

**Input:** Data $\mathbf{X}^{(1)},\ldots,\mathbf{X}^{(n)}$; decomposable score function $Q$.
**Output:** CPDAG $\widehat{H}$.

### 5.2 Score function

GES uses any **consistent, decomposable score** $Q(G, \mathbf{X})$ — one that (a) is correct in
the limit ($Q$ is maximised at the true MEC as $n\to\infty$) and (b) decomposes as
$Q(G) = \sum_j Q_j(\mathrm{Pa}_G(X_j))$. The canonical choice is **BIC**:
$$Q_{\mathrm{BIC}}(G, \mathbf{X}) = \log P(\mathbf{X} \mid \hat\theta_G, G) - \frac{\log n}{2}|G|,$$
where $|G|$ counts free parameters. Under Gaussianity this becomes:
$$Q_j = -\frac{n}{2}\log\hat\sigma^2_{j|\mathrm{Pa}(j)} - \frac{\log n}{2}(|\mathrm{Pa}(j)|+1).$$

### 5.3 Two phases

#### Phase 1 — Forward Equivalence Search (FES)

1. Start from the empty CPDAG $\widehat{H} = \emptyset$.
2. Repeatedly find the **edge insertion** $\mathrm{Insert}(X, Y, T)$ (where $T \subseteq \mathrm{Adj}(X) \cap \mathrm{Adj}(Y)$ is the "turn set") that maximally increases $Q$.
3. Apply the insertion and update the CPDAG representation.
4. Stop when no insertion increases $Q$.

An insertion $\mathrm{Insert}(X, Y, T)$ is **valid** iff $T$ is a clique in $\widehat{H}$, every
path from $X$ to $Y$ in $\widehat{H}$ goes through $T$, and the resulting graph remains acyclic.

FES may overshoot — it can add edges not in the true graph. Chickering proves:

> **Lemma (Chickering 2002).** In the population limit ($n\to\infty$), FES never adds an edge
> with endpoints $\{X_i, X_j\}$ not in the skeleton of the true DAG.

#### Phase 2 — Backward Equivalence Search (BES)

1. Start from the CPDAG output by FES.
2. Repeatedly find the **edge deletion** $\mathrm{Delete}(X, Y, H)$ that maximally increases $Q$.
3. Apply the deletion and update the CPDAG.
4. Stop when no deletion increases $Q$.

BES removes the spurious edges added by FES.

### 5.4 Main consistency theorem

> **Theorem (Chickering 2002, Theorem 15).** Under the causal Markov condition, faithfulness,
> and consistency of $Q$ (BIC achieves consistency under Gaussianity):
>
> As $n \to \infty$, GES outputs the CPDAG $H^*$ of the true DAG $G$ with probability 1.

This is a **global** consistency result — GES recovers the true equivalence class, not just a
locally optimal one. The proof uses the Meek Conjecture (also proved in Chickering 2002) to
characterise paths through equivalence-class space.

### 5.5 Practical notes

- **FGES** (Ramsey et al. 2017): fast parallelised GES; handles $d > 10^4$ variables using
  a priority-queue FES + efficient CPDAG update.
- **Software**: `pcalg` R package (`ges()` function); TETRAD/py-causal Python bindings;
  `cdt` (Causal Discovery Toolbox).
- **Limitation**: GES assumes **no hidden variables**. The **FCI** algorithm (Spirtes et al.
  2000) extends constraint-based methods to the presence of latent confounders.

---

## 6. Comparison: PC vs GES vs NOTEARS

| Criterion | PC | GES | NOTEARS |
|-----------|----|-----|---------|
| **Paradigm** | Constraint-based | Score-based | Continuous optimization |
| **Search space** | Tests CI over skeleton | CPDAGs (MECs) | $\mathbb{R}^{d\times d}$ |
| **Assumes Gaussian?** | No (test-dependent) | Can use any score | No (LS loss works for non-Gaussian) |
| **Output** | CPDAG | CPDAG | DAG (weighted adjacency $W$) |
| **Hidden confounders?** | Extend to FCI | No | No |
| **Scalability** | Good (sparse graphs) | Good (FGES variant) | Good ($O(d^3)$ per iteration) |
| **Consistency** | Yes (Kalisch & Bühlmann 2007) | Yes (Chickering 2002) | Yes (for linear SEM) |
| **In NOTEARS experiments** | "Significantly weaker" (supplement only) | Weaker than FGS on dense graphs | Outperforms both on SF-4 |

---

## 7. Software

| Package | Language | Methods | Notes |
|---------|----------|---------|-------|
| `pcalg` | R | PC, GES, FCI, RFCI, LINGAM | Primary reference implementation |
| `TETRAD`/`py-causal` | Java (Python wrapper) | PC, FCI, GES, FGES, BOSS | FGES for large $d$ |
| `causal-learn` | Python | PC, GES, FCI, NOTEARS, + more | Unified interface |
| `cdt` (Causal Discovery Toolbox) | Python | Wraps most methods | Also includes pairwise methods |
| `notears` | Python | NOTEARS, NOTEARS-MLP | Original repo |
