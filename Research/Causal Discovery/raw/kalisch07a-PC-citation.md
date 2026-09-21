---
type: citation
---

# Citation: Kalisch & Bühlmann (2007) — Estimating High-Dimensional DAGs with the PC-Algorithm

**Full citation:**
Kalisch, M., & Bühlmann, P. (2007). Estimating high-dimensional directed acyclic graphs
with the PC-Algorithm. *Journal of Machine Learning Research*, 8, 613–636.

**DOI / URL:**
https://www.jmlr.org/papers/v8/kalisch07a.html
(arXiv preprint: https://arxiv.org/abs/math/0510436)

**Note:** PDF download was unavailable in the session that created these notes
(network egress policy blocked jmlr.org and arxiv.org). Notes derived from training
knowledge of the paper content.

## Abstract (summary)

Establishes **high-dimensional consistency of the PC algorithm** for Gaussian distributions.
The number of nodes $p$ can grow as fast as $O(n^a)$ for any $0 < a < \infty$ (i.e. $p$
can be much larger than $n$), provided the true DAG is **sparse** (bounded in-degree $q$)
and the minimum partial correlation among adjacent nodes is bounded away from zero.
Under these conditions, the PC algorithm with significance level $\alpha_n \to 0$
consistently estimates the skeleton and the CPDAG of the true DAG.

## Key results referenced in vault notes

- **High-dimensional consistency of PC** under sparsity → [[PC Algorithm]]
- **Skeleton consistency** (false positive / false negative edge rates) → [[PC Algorithm]]
- **Gaussian CI testing via partial correlations** → [[Conditional Independence Testing for Causal Discovery]]

## Related citation: Spirtes, Glymour & Scheines (2000)

Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search* (2nd ed.).
MIT Press. — The original PC algorithm reference (Ch. 5–6). Not freely available as PDF.
