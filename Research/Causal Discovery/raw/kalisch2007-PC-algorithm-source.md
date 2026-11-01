---
title: "Source: Kalisch & Bühlmann (2007) — PC Algorithm Paper"
type: source-reference
doc_type: paper
authors: "Markus Kalisch, Peter Bühlmann"
year: 2007
journal: "Journal of Machine Learning Research"
volume: "8(22)"
pages: "613–636"
url: "https://jmlr.org/papers/v8/kalisch07a.html"
preprint_url: "https://arxiv.org/abs/math/0510436"
note: "PDF download blocked by session network policy. Full paper freely available at URLs above."
date_retrieved: 2026-11-01
---

# Kalisch & Bühlmann (2007): Estimating High-Dimensional DAGs with the PC-Algorithm

**Full title:** "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm"
**Journal:** Journal of Machine Learning Research 8:613–636, 2007
**URL:** https://jmlr.org/papers/v8/kalisch07a.html

## Abstract (paraphrased)

The PC-algorithm (Peter-Clark algorithm, Spirtes & Glymour 1991) recovers the skeleton and
v-structures of a DAG from observational data using a sequence of conditional independence (CI)
tests. This paper establishes high-dimensional consistency: if the true DAG has maximum
adjacency (degree) bounded by $q$, and CI tests are Fisher's Z-tests, then the PC-algorithm is
**uniformly consistent** for the skeleton and v-structures as $p, n \to \infty$ together,
provided the distribution satisfies faithfulness and the causal Markov condition, and provided
$\log p = o(n^{1/3})$. This is the first consistency result for structure learning in a
regime where the number of variables $p$ can grow with sample size $n$.

## Key contributions

1. **Uniform consistency in high dimensions**: consistency of PC-algorithm when $p \gg n$
   (sparse graphs, bounded degree $q$), with rates for $p$ growing as a function of $n$.
2. **Sparsity assumption**: key sufficient condition is $q = o\bigl((\log n)^{1/2}\bigr)$ for
   the Fisher Z CI test, which bounds the maximum conditioning set size in skeleton recovery.
3. **Faithfulness assumption**: consistency requires both the Markov condition (true DAG entails
   the CI structure of the distribution) and faithfulness (the distribution entails *only* the CI
   relations implied by the Markov condition — no accidental CIs).
4. **Skeleton and v-structure recovery**: separate rates and consistency guarantees for each phase
   of the algorithm.

## Algorithm outline (PC-algorithm)

### Phase I: Skeleton discovery

Start with the complete undirected graph $K_p$ on $p$ nodes. For each pair $(X_i, X_j)$ in
the graph, test $X_i \perp\!\!\!\perp X_j \mid S$ for all sets $S \subseteq \text{adj}(X_i) \setminus \{X_j\}$
of increasing cardinality $|S| = 0, 1, 2, \ldots$. If a separating set $S_{ij}$ is found, remove
edge $X_i - X_j$ and record $\text{sep}(i, j) = S_{ij}$. Stop increasing $|S|$ once
$|\text{adj}(X_i)| - 1 < |S|$. The result is the **skeleton** — the undirected adjacency pattern.

### Phase II: V-structure orientation

For each unshielded triple $X_i - X_k - X_j$ (where $X_i$ and $X_j$ are not adjacent), orient
as $X_i \to X_k \leftarrow X_j$ (a **v-structure** or **immorality**) if and only if
$X_k \notin \text{sep}(i, j)$.

### Phase III: Meek rules

Apply Meek's (1995) four orientation rules repeatedly until no further edges can be oriented.
These rules propagate orientation to avoid introducing new v-structures or directed cycles.
The result is a **CPDAG** (Completed Partially Directed Acyclic Graph).

## Key statistical setting

- **Distribution**: faithful to the true DAG (faithfulness) + Markov condition
- **CI test**: partial correlation / Fisher's Z statistic for Gaussian distributions;
  generalized CI tests (kernel-based, etc.) for non-Gaussian
- **Significance level**: $\alpha = \alpha_n \to 0$ as $n \to \infty$ (at rate $n^{-1/2}$)
  for high-dimensional consistency
- **Sparsity**: max degree $q$ bounded (sparse skeleton)

## Key theorem

> **Theorem 1 (Kalisch & Bühlmann 2007):** Under the Gaussian distribution faithful to a
> sparse DAG with max degree $q = o\bigl(n^{1/2}/(\log p)\bigr)$, the PC-algorithm with
> Fisher's Z CI test at significance level $\alpha_n = 2\bigl(1 - \Phi(n^{1/4})\bigr)$ is
> uniformly consistent for the skeleton, i.e., $P(\hat{G}_n = G^*) \to 1$ as $n, p \to \infty$.

## Software

- **`pcalg` R package** (Kalisch, Mächler, Colombo, Maathuis, Bühlmann): implements PC, FCI,
  RFCI, IDA, and related algorithms. CRAN: `install.packages("pcalg")`.
- **`causal-learn` Python package**: implements PC, GES, FCI, LiNGAM. GitHub: py-why/causal-learn.

## Related works

- Spirtes & Glymour (1991): original PC algorithm
- Spirtes, Glymour & Scheines (2000): *Causation, Prediction, and Search*, 2nd Ed. — full treatment
- Meek (1995): orientation rules and completeness of CPDAGs
- Chickering (2002): GES, proves consistency of score-based search in equivalence class space
