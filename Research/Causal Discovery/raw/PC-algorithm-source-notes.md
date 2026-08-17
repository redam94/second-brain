---
title: "PC Algorithm — Synthesized Reference Notes"
type: reference-notes
original_sources:
  - "Spirtes, P. & Glymour, C. (1991). An algorithm for fast recovery of sparse causal graphs. *Social Science Computer Review*, 9(1):62–72. https://doi.org/10.1177/089443939100900106"
  - "Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*, 2nd ed. MIT Press. (Free online: https://www.stat.cmu.edu/~spirtes/pc.algorithm.books.html)"
note: |
  Original PDFs blocked by network egress policy (arxiv.org, jmlr.org, kilthub.cmu.edu
  all returned 403 during ingest on 2026-08-17). These notes synthesize the algorithm
  from the primary sources based on canonical descriptions. Download the PDFs when
  network access permits and re-reference from this folder.
date_synthesized: 2026-08-17
---

# PC Algorithm — Synthesized Reference Notes

This document synthesizes the PC (Peter–Clark) algorithm from its primary sources:
Spirtes & Glymour (1991) and Spirtes, Glymour & Scheines (2000), *Causation, Prediction,
and Search* (CPS), 2nd ed., MIT Press.

---

## 1. Background: Constraint-Based Structure Learning

The **constraint-based** paradigm for causal discovery exploits the Markov property of
DAGs: in a DAG, each variable is conditionally independent of its non-descendants given
its parents. Under the **faithfulness assumption** (every conditional independence
exhibited in the distribution corresponds to a d-separation in the DAG), conditional
independence (CI) tests on observational data provide information about the underlying
DAG structure.

**Key assumptions of the PC algorithm:**

1. **Causal Markov condition**: the data distribution is Markov relative to the true
   causal DAG $G$. Formally, $X_i \perp\!\!\!\perp \mathbf{X}_{ND(i)} \mid \mathbf{X}_{Pa(i)}$,
   where $ND(i)$ are non-descendants of $X_i$ and $Pa(i)$ are its parents.

2. **Faithfulness** (Reichenbach–Spirtes): every conditional independence in
   $\mathbb{P}$ corresponds to a d-separation in $G$. This rules out "accidental"
   cancellations of path effects.

3. **Causal sufficiency** (no hidden common causes): there are no latent confounders.
   Every common cause of observed variables is itself observed. (The FCI algorithm
   relaxes this.)

Under these three assumptions, the constraint-based approach is **sound and complete**:
it identifies the unique Markov equivalence class of the true DAG.

---

## 2. Markov Equivalence and CPDAGs

Two DAGs $G_1$ and $G_2$ are **Markov equivalent** if and only if they encode
identical conditional independences — i.e., they have the same **skeleton** (underlying
undirected graph) and the same **v-structures** (unshielded colliders $X \to Z \leftarrow Y$,
where $X$ and $Y$ are not adjacent).

**Theorem (Verma & Pearl 1990; Frydenberg 1990):** Two DAGs are Markov equivalent
iff they have the same skeleton and the same v-structures.

The equivalence class is represented by a **CPDAG** (Completed Partially Directed
Acyclic Graph), also called an **essential graph** or **pattern**:
- An edge $X \to Y$ in the CPDAG means that **every** member of the equivalence class
  has $X \to Y$ directed.
- An edge $X - Y$ (undirected) means the direction is **not determined** by the data:
  some members have $X \to Y$, others have $X \leftarrow Y$.

---

## 3. The PC Algorithm

### Phase 1: Skeleton Recovery (CI-based edge deletion)

**Input**: $n$ i.i.d. observations of $p$ variables $\mathbf{X} = (X_1, \ldots, X_p)$.

**Step 1a — Initialize**: Start with the complete undirected graph $C$ on $p$ nodes.

**Step 1b — Adjacency search**: Let $\ell = 0$. Repeat:
- For each adjacent pair $(X_i, X_j)$ in the current graph $C$:
  - Let $\mathrm{adj}(C, X_i) \setminus \{X_j\}$ be the current neighbours of $X_i$
    (excluding $X_j$).
  - For each subset $S \subseteq \mathrm{adj}(C, X_i) \setminus \{X_j\}$ with $|S| = \ell$:
    - Test $X_i \perp\!\!\!\perp X_j \mid S$ using a CI test.
    - If the test accepts independence: remove edge $X_i - X_j$ from $C$;
      record $\mathrm{sep}(i,j) = S$.  Break inner loop and go to next pair.
- Increment $\ell \leftarrow \ell + 1$.
- Stop when $\ell > \max_{X_i}\lvert\mathrm{adj}(C, X_i)\rvert$.

**Output of Phase 1**: A skeleton (undirected graph) $\hat{C}$ and separation sets
$\{\mathrm{sep}(i,j)\}$.

**Complexity**: The number of CI tests is $O\!\left(p^{d+2} \cdot \binom{p-2}{d}\right)$
where $d$ is the maximum degree of any node in the true skeleton. Under sparsity
(bounded degree), this is **polynomial in $p$**. Without sparsity, it is exponential.

**CI test choices**:
- **Gaussian/linear SEM**: Partial correlation test (Fisher's z-transform) at significance
  level $\alpha$. Tests $H_0: \rho_{ij \cdot S} = 0$.
- **Discrete data**: G² / chi-squared test on contingency tables.
- **Non-parametric**: Kernel-based CI tests (HSIC-based, e.g., Zhang et al. 2011),
  permutation tests.

### Phase 2: V-Structure Orientation

**Step 2 — Orient v-structures**: For every unshielded triple
$(X_i, X_k, X_j)$ — meaning $X_i$ and $X_k$ are adjacent, $X_k$ and $X_j$ are adjacent,
but $X_i$ and $X_j$ are **not** adjacent:
- If $X_k \notin \mathrm{sep}(i,j)$: orient as $X_i \to X_k \leftarrow X_j$
  (v-structure / unshielded collider).
- If $X_k \in \mathrm{sep}(i,j)$: leave $X_i - X_k - X_j$ unoriented.

**Intuition**: In a v-structure $X_i \to X_k \leftarrow X_j$, conditioning on $X_k$
(or its descendants) makes $X_i$ and $X_j$ dependent. Hence $X_k \notin \mathrm{sep}(i,j)$.
In a causal chain or fork, $X_k \in \mathrm{sep}(i,j)$ (marginal independence after
conditioning on $X_k$).

### Phase 3: Meek Orientation Rules

After Phase 2, some edges remain undirected. **Meek (1995)** proved that the following
four rules, applied exhaustively to the current PDAG, complete the orientation to a
unique CPDAG **without introducing new v-structures or directed cycles**:

**R1** (avoid new v-structure): If $X_i \to X_k - X_j$ and $X_i$ not adjacent to $X_j$,
orient $X_k \to X_j$.

**R2** (avoid cycle): If $X_i \to X_j$ and $X_i - X_k \to X_j$, orient $X_i \to X_k$.
(Without this, $X_i - X_k \to X_j$ with $X_i \to X_j$ would create a cycle if $X_k \to X_i$
were chosen.)

**R3**: If $X_i - X_k \to X_j$ and $X_i - X_l \to X_j$ and $X_i - X_j$ and
$X_k$ not adjacent to $X_l$, orient $X_i \to X_j$. (Any other orientation would
force another v-structure.)

**R4**: If $X_i - X_k \to X_l \to X_j$ and $X_i - X_j$ and $X_i$ not adjacent
to $X_l$, orient $X_i \to X_j$.

Apply R1–R4 until no further orientations can be made.

**Theorem (Meek 1995)**: The output of PC (skeleton + v-structures + R1–R4) is
the unique CPDAG of the Markov equivalence class of the true DAG, provided the
faithfulness and Markov assumptions hold and all CI tests are correct.

---

## 4. Identifiability Limits

Under the three assumptions, PC can only identify the **Markov equivalence class**
(CPDAG), **not** the unique DAG. Many edges remain undirected in the output. To
identify a unique DAG, additional assumptions are needed:
- **Non-Gaussianity** of the noise (LiNGAM, Shimizu et al. 2006): the true DAG
  is identifiable from observational data if at most one variable has Gaussian noise.
- **Equal variance** (Peters & Bühlmann 2014): identifiable from regression residuals.
- **Nonlinear additive noise** (Hoyer et al. 2009): identifiable in the nonlinear case.
- **Interventional data**: breaks equivalence by pinning distributions.

---

## 5. Variants of PC

| Variant | Key change | Reference |
|---------|-----------|-----------|
| PC-stable | Makes skeleton phase order-independent | Colombo & Maathuis 2014 |
| Conservative PC (CPC) | Marks uncertain v-structures as ambiguous | Ramsey et al. 2006 |
| RFCI | Relaxed FCI for latent variables | Colombo et al. 2012 |
| PC-Select | Focuses on Markov blanket of a target | Buhlmann et al. 2010 |
| High-dim PC | Kalisch & Bühlmann 2007: consistent for $p \gg n$ under sparsity | |
| FCI | Handles latent confounders; outputs PAGs | Spirtes et al. 1995/2000 |

---

## 6. Software Implementations

| Package | Language | Notes |
|---------|----------|-------|
| `pcalg` | R | Reference implementation; includes PC, FCI, GES, LINGAM |
| `causal-learn` | Python | Newer; includes PC, FCI, GES, NOTEARS, LiNGAM |
| `gCastle` | Python | Huawei; includes PC, GES, NOTEARS, RL-BIC |
| `py-causal` | Python | Wraps Tetrad (Java); PC, GES, FCI |
| Tetrad | Java | CMU group; most comprehensive; GUI + API |

---

## Key Citations

- Spirtes, P. & Glymour, C. (1991). "An algorithm for fast recovery of sparse causal
  graphs." *Social Science Computer Review*, 9(1):62–72.

- Spirtes, P., Glymour, C. & Scheines, R. (2000). *Causation, Prediction, and Search*,
  2nd ed. MIT Press. [Open access available from CMU]

- Meek, C. (1995). "Causal inference and causal explanation with background knowledge."
  *Proceedings of UAI*, pp. 403–410.

- Verma, T. & Pearl, J. (1990). "Equivalence and synthesis of causal models."
  *Proceedings of UAI*, pp. 220–227.

- Colombo, D. & Maathuis, M.H. (2014). "Order-independent constraint-based causal
  structure learning." *JMLR*, 15:3921–3962.

- Kalisch, M. & Bühlmann, P. (2007). "Estimating high-dimensional directed acyclic
  graphs with the PC-algorithm." *JMLR*, 8:613–636.
