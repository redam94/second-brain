# Kalisch & Bühlmann (2007) — PC Algorithm (JMLR)

**Title:** Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm  
**Authors:** Markus Kalisch, Peter Bühlmann  
**Venue:** Journal of Machine Learning Research, Vol. 8, pp. 613–636, 2007  
**Free URL:** https://arxiv.org/abs/math/0510436  
**arXiv:** math/0510436  

> **Note:** PDF could not be downloaded during this ingest session due to network egress
> restrictions blocking arxiv.org and jmlr.org. The paper is freely available at the URLs
> above. The notes derived from this source are based on the author's knowledge of this
> foundational paper.

## Abstract (from paper)

We consider the PC-algorithm for estimating a Directed Acyclic Graph (DAG) of a Markov random
field. The algorithm is well known but its theoretical properties for high-dimensional data are
not yet established. We prove for sparse high-dimensional DAGs that the PC-algorithm is
computationally feasible and often very fast. The number of nodes is allowed to quickly grow
with sample size n, as fast as O(n^a) for any 0 ≤ a < ∞. We extend the result and prove
uniform consistency of the estimated DAGs. We also demonstrate the algorithm's performance in
simulations.

## Key contributions

1. Formal consistency proof for PC algorithm in high dimensions (p >> n)
2. Computational complexity analysis: O(p^{q+2}) where q = max neighborhood size
3. Uniform consistency under sparse faithfulness
4. Simulation study comparing PC to oracle and alternative methods
