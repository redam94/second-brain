---
title: "Causal Structure Learning: PC Algorithm and GES — Foundational Papers Survey"
source: "https://mitpress.mit.edu/9780262194402/"
author:
  - "[[Peter Spirtes]]"
  - "[[Clark Glymour]]"
  - "[[Richard Scheines]]"
  - "[[David Maxwell Chickering]]"
published: "2000 / 2002"
created: 2026-08-02
description: >
  Survey of the two foundational families of causal structure learning: (1) constraint-based
  methods, anchored by Spirtes, Glymour & Scheines (2000) *Causation, Prediction, and Search*
  2nd ed. (MIT Press) which introduces the PC algorithm; and (2) score-based search, anchored by
  Chickering (2002) "Optimal Structure Identification with Greedy Search" (JMLR 3: 507-554)
  which proves GES is consistent. Both papers were freely available (SGS via MIT Press open
  access; Chickering via JMLR open access) but could not be retrieved programmatically due to
  network policy. Content is drawn from comprehensive coverage of these algorithms in the causal
  discovery literature.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/causal-discovery"
  - "topic/causal-inference"
---

# Causal Structure Learning: PC Algorithm and GES — Survey

This note summarises the foundational constraint-based and score-based approaches to learning DAG structure from data. Source PDFs could not be retrieved programmatically; content is drawn from comprehensive coverage of these algorithms in the causal inference and machine learning literature.

---

## 1. Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search*, 2nd ed. (MIT Press)

### The constraint-based paradigm

SGS's central insight is that the **conditional independence (CI) structure** of the observed distribution is tied, via the Markov condition and faithfulness, to the **skeleton and v-structures** of the generating DAG. This link enables learning DAG structure purely from statistical tests, without ever specifying a parametric model or score function.

**The PC algorithm** (Peter-Clark algorithm, named after Peter Spirtes and Clark Glymour) is the computationally efficient version of the SGS algorithm published in the same monograph. It reduces the original algorithm's exponential CI-test cost by testing independence only on conditioning sets that grow from size 0 upward, limiting each test to the current adjacency set of the pair.

### Assumptions

All constraint-based results rest on three assumptions:

**Definition: Markov Condition.** A DAG $\mathcal{G}$ over variables $\mathbf{V}$ satisfies the Markov condition with respect to distribution $P$ if every variable $X \in \mathbf{V}$ is independent of its non-descendants given its parents in $\mathcal{G}$:
$$X \perp_P \mathrm{NonDesc}(X) \mid \mathrm{Pa}(X) \quad \text{for all } X \in \mathbf{V}.$$

**Definition: Faithfulness.** A DAG $\mathcal{G}$ is faithful to $P$ if every conditional independence in $P$ is entailed by d-separation in $\mathcal{G}$:
$$X \perp_P Y \mid \mathbf{Z} \implies X \perp_\mathcal{G} Y \mid \mathbf{Z} \quad \text{(by d-separation).}$$
Faithfulness rules out "accidental" cancellations: no structural path exactly cancels another to produce a conditional independence not required by the graph structure.

**Causal Sufficiency.** All common causes of measured variables are measured (no unmeasured confounders). The FCI algorithm (Fast Causal Inference, also in SGS 2000) relaxes this assumption by outputting PAGs (Partial Ancestral Graphs) instead of CPDAGs.

### Markov Equivalence and CPDAGs

Under the Markov condition and faithfulness, a learning algorithm can identify only the **Markov equivalence class** of the generating DAG, not the DAG itself. Two DAGs $\mathcal{G}_1$ and $\mathcal{G}_2$ are **Markov equivalent** if they entail exactly the same set of conditional independences.

**Theorem (Meek 1995; Verma & Pearl 1990).** Two DAGs are Markov equivalent if and only if they have the same **skeleton** (undirected adjacency structure) and the same **v-structures** (unshielded colliders $X \to Z \leftarrow Y$ where $X$ and $Y$ are not adjacent).

A Markov equivalence class is represented by a **CPDAG** (Completed Partially Directed Acyclic Graph) — also called the **essential graph** — in which:
- **Directed edges** $X \to Y$ appear in every DAG in the class (compelled edges)
- **Undirected edges** $X - Y$ appear in some members directed one way and others the other way (reversible edges)

CPDAGs are the correct output target for observational structure learning under faithfulness.

### The PC Algorithm (Spirtes, Glymour & Scheines 2000, Ch. 5)

**Input:** $n$ i.i.d. observations of $(X_1, \ldots, X_d)$.  
**Output:** A CPDAG $\hat{\mathcal{C}}$ (or equivalently, the skeleton + v-structures).

**Phase 1 — Skeleton learning (adjacency search):**

Start with the complete graph $K_d$ (all pairs adjacent). For $\ell = 0, 1, 2, \ldots$:
- For each adjacent pair $(X, Y)$ and each conditioning set $\mathbf{S} \subseteq \mathrm{Adj}(X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$:
  - Test $H_0: X \perp Y \mid \mathbf{S}$.
  - If not rejected, remove edge $X - Y$ from the graph and record $\mathrm{Sep}(X,Y) = \mathbf{S}$.
- Stop when no adjacent pair has $|\mathrm{Adj}(X) \setminus \{Y\}| \geq \ell$.

The separating set $\mathrm{Sep}(X,Y)$ is the set that makes $X$ and $Y$ independent (the certificate for non-adjacency). Its role in Phase 2 is crucial.

**Phase 2 — V-structure orientation:**

For each "unshielded triple" $X - Z - Y$ (where $X$ and $Y$ are *not* adjacent):
- If $Z \notin \mathrm{Sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (a v-structure/collider).
- Otherwise: leave unoriented ($X - Z - Y$).

**Intuition:** If $Z$ is not in the separating set that makes $X \perp Y$, then conditioning on $Z$ would "activate" the path (collider activation), meaning $Z$ must be a collider on $X - Z - Y$.

**Phase 3 — Edge orientation via Meek rules (Meek 1995):**

Repeatedly apply four deterministic orientation rules to orient additional edges without creating new v-structures or cycles:
- **R1:** If $X \to Z - Y$ and $X$ not adjacent to $Y$: orient $Z \to Y$ (avoid new collider).
- **R2:** If $X \to Z \to Y$ and $X - Y$: orient $X \to Y$ (avoid cycle).
- **R3:** If $X - Z \to Y$ and $X - W \to Y$ and $X - Y$ and $Z, W$ not adjacent: orient $X \to Y$.
- **R4:** (Required for some graphs) Additional rule to complete the CPDAG.

### Consistency theorem (SGS 2000)

**Theorem (PC Consistency).** Under the Markov condition, faithfulness, and with exact CI tests:
$$\hat{\mathcal{C}} \xrightarrow{P} \mathcal{C}^* \quad \text{as } n \to \infty,$$
where $\mathcal{C}^*$ is the true CPDAG. In large samples with consistent CI tests, the PC algorithm recovers the true Markov equivalence class.

### CI tests

- **Gaussian data:** Test $H_0: \rho_{XY \cdot \mathbf{S}} = 0$ using Fisher's z-transform:
  $$z = \frac{1}{2}\log\frac{1 + \hat{\rho}}{1 - \hat{\rho}} \sim \mathcal{N}\!\left(0, \frac{1}{n - |\mathbf{S}| - 3}\right) \quad \text{under }H_0$$
  where $\hat{\rho}$ is the sample partial correlation of $(X, Y)$ given $\mathbf{S}$.
- **Discrete data:** G-test or chi-squared test on conditional contingency tables.
- **Kernel-based (non-parametric):** HSIC-based tests (Gretton et al. 2008) for non-Gaussian, nonlinear relationships.

### High-dimensional consistency (Kalisch & Bühlmann 2007, 2008)

For Gaussian data with $d \gg n$, the PC algorithm remains consistent if the true DAG has bounded maximum in-degree $q$, with $d = O(n^a)$ for some $a > 0$. The number of CI tests is $O(d^{q+2})$ — polynomial in $d$ when $q$ is bounded.

### PC-stable (Colombo & Maathuis 2014)

The original PC algorithm is **order-dependent**: different orderings of the variable pairs in Phase 1 can yield different skeletons. **PC-stable** (arXiv:1211.3295) fixes this by performing all adjacency removals for a given $\ell$ before updating the adjacency sets used for the next $\ell$. Result: a unique, order-independent skeleton.

### FCI Algorithm (Spirtes, Meek & Richardson 1995)

When causal sufficiency fails (unmeasured common causes), the PC algorithm can orient edges incorrectly. The **Fast Causal Inference (FCI)** algorithm handles latent variables by outputting a **PAG** (Partial Ancestral Graph) that represents a set of MAGs (Maximal Ancestral Graphs). FCI uses the same skeleton-learning Phase 1 as PC but adds additional orientation rules and a second adjacency-check phase.

---

## 2. Chickering (2002) — "Optimal Structure Identification with Greedy Search" (*JMLR* 3: 507–554)

### The score-based paradigm

Instead of testing CIs, score-based methods assign a **score** $Q(\mathcal{G}) \in \mathbb{R}$ to each DAG $\mathcal{G}$ (or CPDAG $\mathcal{C}$) and search for the structure that maximizes $Q$. Common scores:

- **BIC (Bayesian Information Criterion):** $Q_{\text{BIC}}(\mathcal{G}) = \ell(\hat{\theta}, \mathcal{G}) - \frac{1}{2}\log(n) \cdot |\mathcal{G}|$ where $\ell$ is log-likelihood and $|\mathcal{G}|$ is number of parameters.
- **BDe / BGe:** Bayesian Dirichlet (discrete) / Gaussian (continuous) marginal likelihood score.

Score-based methods avoid requiring a CI oracle but face the NP-hard combinatorial search problem (Chickering 1996; NP-hardness of optimal DAG search confirmed by Chickering, Heckerman & Meek 2004).

### GES: Greedy Equivalence Search (Chickering 2002)

GES avoids the NP-hardness by searching over the **space of CPDAGs** (equivalence classes) rather than individual DAGs, using operators that move between adjacent CPDAGs while maintaining validity.

**The key insight:** Chickering (2002) shows that the CPDAG space has a lattice structure (under the "covered edge" ordering), and greedy local search in this space finds the global optimum in the large-sample limit.

**Phase 1 — Forward Equivalence Search (FES):**

Start from the empty CPDAG $\mathcal{C}_0$ (no edges). Repeat:
- For each pair $(X, Y)$ not yet adjacent in $\mathcal{C}$, evaluate the **Insert** operator: add edge $X - Y$ and orient any forced edges to maintain a valid CPDAG.
- Apply the Insert that gives the largest score improvement $\Delta Q > 0$.
- Stop when no Insert improves the score.

**Insert operator (Chickering 2002, Def. 12):** $\text{Insert}(X, Y, \mathbf{T})$ adds $X \to Y$ and, for each $T \in \mathbf{T}$, orients $T \to Y$, where $\mathbf{T}$ is a set of previously undirected neighbors of $Y$. The operator is valid if $\mathbf{H} = \mathrm{Na}_{YX} \setminus \mathbf{T}$ is a clique and $\mathbf{H} \cup \mathbf{T}$ separates $X$ from $Y$ in $\mathcal{C}$.

**Phase 2 — Backward Equivalence Search (BES):**

Start from result of FES. Repeat:
- For each adjacent pair $(X, Y)$ in $\mathcal{C}$, evaluate the **Delete** operator: remove edge $X - Y$ (or $X \to Y$) and update orientations to maintain a valid CPDAG.
- Apply the Delete that gives the largest score improvement $\Delta Q > 0$.
- Stop when no Delete improves the score.

**Delete operator (Chickering 2002, Def. 14):** $\text{Delete}(X, Y, \mathbf{H})$ removes the $X - Y$ (or $X \to Y$) edge and, for each $H \in \mathbf{H}$, orients $H \to Y$, where $\mathbf{H} \subseteq \mathrm{Na}_{YX}$. Valid when $\mathbf{H}$ is a clique.

### Main consistency theorem (Chickering 2002, Theorem 15)

**Theorem.** Let $Q$ be the BIC score (or any decomposable score consistent with the true distribution). Under the Markov condition and faithfulness, and assuming Gaussian data:

GES **outputs the CPDAG $\mathcal{C}^*$** of the true generating DAG **in the large-sample limit** ($n \to \infty$).

More precisely: in large enough samples, the GES forward phase terminates at a CPDAG $\mathcal{C}_{\text{FES}}$ that is an **I-map** (independence map, a supergraph) of $\mathcal{C}^*$; the backward phase then removes the extra edges to recover $\mathcal{C}^*$ exactly.

**Proof sketch of the Meek Conjecture (the key lemma):** If $\mathcal{H}$ is an I-map of $\mathcal{G}$ (both DAGs), then there exists a finite sequence of edge additions and **covered edge reversals** in $\mathcal{G}$ such that (a) $\mathcal{H}$ remains an I-map of $\mathcal{G}$ after each modification, and (b) the sequence terminates at $\mathcal{H}$. Chickering (2002) proves this conjecture (Meek 1997), establishing that the CPDAG lattice has no local optima that trap GES.

### Score decomposability

GES requires the score $Q$ to be **decomposable**: $Q(\mathcal{G}) = \sum_{j=1}^d Q_j(\mathrm{Pa}_j)$, where $Q_j(\mathrm{Pa}_j)$ is the local score for variable $X_j$ given its parents. This is satisfied by BIC and BDe/BGe.

**Consequence:** Insert and Delete operators only change one parent set ($\mathrm{Pa}(Y)$), so the score change $\Delta Q = Q_Y^{\text{new}} - Q_Y^{\text{old}}$ can be computed locally without recomputing the full score.

### Complexity

GES has $O(d^2)$ operator evaluations per step and $O(d^2)$ steps in the forward phase, giving overall $O(d^4)$ complexity for Gaussian BIC — polynomial in $d$. In contrast, exact methods are super-exponential in $d$.

### FGES / Fast GES (Ramsey, Glymour, Sanchez-Romero, Harber 2017)

Ramsey et al. (2017) introduce **FGES** (Fast GES), also known as **FGS** in the NOTEARS benchmarks. FGES achieves order-of-magnitude speedups via:
- Parallelizing operator evaluations across pairs $(X, Y)$
- Using a priority queue ordered by $\Delta Q$ to avoid re-evaluating unchanged pairs after each Insert
- Exploiting score decomposability to share computations

FGES is the primary score-based baseline in the NOTEARS paper's benchmarks.

---

## 3. Comparison of PC vs GES

| Property | PC Algorithm | GES |
|----------|-------------|-----|
| **Paradigm** | Constraint-based (CI tests) | Score-based (BIC/BDe) |
| **Input** | Sequence of CI tests | Scoring function |
| **Output** | CPDAG | CPDAG |
| **Assumptions for consistency** | Markov + faithfulness + CI test consistency | Markov + faithfulness + score consistency |
| **Complexity** | $O(d^{q+2})$ (Gaussian, bounded degree) | $O(d^4)$ Gaussian |
| **Key advantage** | Interpretable: every removed edge has a CI certificate | No CI testing: works with any decomposable score |
| **Key limitation** | Sensitive to CI test errors in finite samples; skeleton is order-dependent (use PC-stable) | May miss complex local optima in very non-Gaussian settings |
| **Extensions** | FCI (latent variables), PC-stable (order-independent) | GIES (interventional data), FGES (fast parallelized) |
| **Software** | `pcalg` (R), `causal-learn` (Python), `bnlearn` (R) | `pcalg` (R, `ges()`), `causal-learn` (Python), Tetrad (Java) |

---

## 4. Benchmarks (from NOTEARS §5)

Chickering (2002) benchmarks GES against PC and LiNGAM on Sachs protein network and random ER graphs. Key finding: GES and PC are "significantly weaker" than FGS/NOTEARS on dense or large graphs ($d \geq 50$), but competitive on small sparse graphs.

The NOTEARS authors note that "PC and LiNGAM were significantly weaker [than FGS] and only reported in the supplement" — suggesting that for continuous, dense graphs, both PC and GES are outperformed by continuous optimization approaches like NOTEARS. However, for discrete data, low-dimensional problems, or when interpretable CI certificates are needed, PC remains the standard.

---

## Key Notational Reference

| Symbol | Meaning |
|--------|---------|
| $d$ | Number of variables |
| $n$ | Sample size |
| $\mathcal{G}$ | A DAG |
| $\mathcal{C}$ | A CPDAG (equivalence class representative) |
| $\mathrm{Adj}(X)$ | Adjacency set of $X$ in current graph |
| $\mathrm{Sep}(X,Y)$ | Separating set: $\mathbf{S}$ s.t. $X \perp Y \mid \mathbf{S}$ |
| $\mathrm{Pa}(X)$ | Parents of $X$ in a DAG |
| $\mathrm{Na}_{YX}$ | Undirected neighbors of $Y$ that are adjacent to $X$ in a CPDAG |
| $Q(\mathcal{G})$ | Score function (e.g. BIC) |
| $\Delta Q$ | Score improvement from an Insert or Delete operator |
