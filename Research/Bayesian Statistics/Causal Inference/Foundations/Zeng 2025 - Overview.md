---
title: "Zeng 2025 - Overview: Causal DAG Summarization"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/causal-dag
  - type/overview
  - doc/paper
source: "[[raw/Zeng et al. - 2025 - Causal DAG Summarization (Full Version).pdf]]"
source_location: "Full paper, arXiv 2504.14937v1"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Frequentist Causal Estimation]]"
used_by:
  - "[[Summary Causal DAGs]]"
  - "[[CaGReS Algorithm]]"
  - "[[s-Separation in Summary DAGs]]"
  - "[[Do-Calculus in Summary Causal DAGs]]"
aliases:
  - Zeng 2025
  - CaGReS paper
  - causal DAG summarization
---

# Zeng 2025 — Causal DAG Summarization

> [!summary]
> Zeng et al. (2025) introduce the problem of *causal DAG summarization* — reducing a high-dimensional causal DAG to a smaller, interpretable summary DAG that preserves its causal inference utility. They prove the optimal summarization is NP-hard, introduce the concept of *summary causal DAGs* (via node contractions), prove soundness and completeness of do-calculus over summary DAGs, and propose CaGReS — an efficient greedy algorithm that produces reliable, robust summary DAGs outperforming existing baselines on 6 real-world datasets.

## Overview

Causal DAGs encode causal structure and conditional independence (CI) statements, enabling reliable causal inference via Pearl's do-calculus. But real-world causal DAGs (e.g., from cloud monitoring systems) can have dozens or hundreds of variables, making them cognitively overwhelming and hard to use for inference.

**The core problem**: How do you simplify a high-dimensional causal DAG into a smaller *summary DAG* while preserving:
1. The causal dependencies present in the original DAG.
2. The CI statements encoded by the original DAG.
3. The ability to perform valid causal inference (do-calculus) using the summary.

Existing graph summarization methods (SsumM, K-Snap, Transit-Cluster, CIC) are designed for general graphs and fail to preserve causal information. Zeng et al. develop a summarization technique tailored specifically for causal inference.

## Key Contributions

1. **Summary causal DAG formalization** — Define summary causal DAGs as applying *node contraction* to the input DAG, grouping semantically related nodes into clusters. A summary DAG $(\mathcal{H}, f)$ consists of a summary graph $\mathcal{H}$ plus a partition function $f: \mathcal{V}(\mathcal{G}) \to \mathcal{V}(\mathcal{H})$.

2. **NP-hardness** — Finding the optimal summary DAG (minimizing added edges subject to a size constraint) is NP-hard (Theorem 3.2).

3. **Canonical causal DAG** — Introduce the canonical causal DAG $\mathcal{G}_\mathcal{H}$, which shows that node contraction is equivalent to edge addition. The RB of $\mathcal{H}$ equals the RB of its canonical DAG (Theorem 4.1). This is the key connection enabling efficient algorithm design.

4. **s-Separation** — Extend d-separation to summary DAGs via *s-separation*, a sound and complete algorithm for identifying valid CIs in summary DAGs (Theorem 4.2).

5. **Do-Calculus soundness and completeness** — Prove that Pearl's do-calculus rules are sound (Theorem 6.1) and complete (Theorem 6.2) for summary causal DAGs.

6. **CaGReS algorithm** — A greedy algorithm that merges node pairs by minimizing the cost (number of edges added to the canonical causal DAG). Uses semantic similarity constraint, caching, and low-cost-merge optimization. Time complexity: $O((n-k) \cdot n^2)$.

7. **Robustness evaluation** — Summary DAGs produced by CaGReS are more robust to input DAG errors (missing/extraneous edges) than direct analysis of the original DAG.

## Experimental Summary

Evaluated on 6 datasets: REDSHIFT (cloud performance monitoring, 12 nodes), FLIGHTS (domestic flight statistics, 21 nodes), ADULT (census data, 13 nodes), GERMAN (bank data, 23 nodes), ACCIDENTS (traffic accidents, 41 nodes), URLS (malicious URL features, 60 nodes). Plus synthetic data via DoWhy.

**CaGReS consistently outperforms baselines** (k-Snap, Transit-Cluster, CIC, Random, Brute-Force) on:
- Average percentage overlap with ground-truth adjustment sets (usability, C1)
- Fewer additional edges in canonical causal DAG (quality, C2)
- Superior runtime vs. Brute-Force while maintaining quality vs. k-Snap (effectiveness, C3)
- Only CaGReS and k-Snap handle DAGs with >20 nodes in reasonable time; CaGReS produces sparser summaries (C4)

## Connections

- Extends the foundational framework in [[Directed Acyclic Graphs]] — builds directly on d-separation, do-calculus, and the Recursive Basis (RB).
- Summary DAGs preserve ATE estimation validity — connects to [[Frequentist Causal Estimation]] (adjustment for confounders) and [[Potential Outcomes Framework]] (confounder control).
- The robustness result (summary DAGs filter extraneous edges) is relevant to [[Frequentist Causal Estimation]] — misspecified confounders lead to biased ATE estimates.
- The NP-hardness motivates CaGReS as a practical solution — analogous to how MCMC methods address intractable posteriors in [[Introduction to Bayesian Computation|Bayesian Inference]].

## See Also
- [[Summary Causal DAGs]] — formal definition and NP-hardness
- [[Canonical Causal DAGs]] — the node-contraction-as-edge-addition connection
- [[CaGReS Algorithm]] — the greedy algorithm
- [[s-Separation in Summary DAGs]] — sound and complete CI identification
- [[Do-Calculus in Summary Causal DAGs]] — soundness and completeness proofs
