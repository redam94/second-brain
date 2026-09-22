---
type: source-reference
---

# Source: Kalisch & Bühlmann (2007) — PC Algorithm

**Full citation:**
Markus Kalisch and Peter Bühlmann (2007). "Estimating High-Dimensional Directed Acyclic
Graphs with the PC-Algorithm."
*Journal of Machine Learning Research*, 8(22):613–636.

**Free PDF (network policy blocked download):**
https://arxiv.org/pdf/math/0510436

**Abstract:**
Considers PC-algorithm for estimating the skeleton of a high-dimensional DAG with
Gaussian distribution. Proves consistency of PC for very high-dimensional, sparse DAGs
where the number of nodes $p$ is allowed to grow as fast as $O(n^a)$ for any $a < \infty$,
provided the graph remains sparse (maximum degree bounded).

**Key contributions:**
1. Formal consistency proof of PC in high-dimensional sparse settings
2. Characterization of the CI test requirement (Fisher's Z for Gaussian)
3. Analysis of how skeleton-learning performance scales with $p$ and $n$
4. Empirical validation on gene-expression data

**Note:** PDF unavailable due to network egress policy. Notes written from training knowledge.
The PC algorithm itself originates in Spirtes, Glymour & Scheines (2000)
*Causation, Prediction, and Search*, 2nd Ed., MIT Press.
