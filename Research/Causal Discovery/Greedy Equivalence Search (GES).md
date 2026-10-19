---
title: "Greedy Equivalence Search (GES)"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering2002-GES-reference.md]]"
source_location: "Chickering 2002, JMLR v3, pp. 507–554"
date_ingested: 2026-10-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES"
  - "Greedy Equivalence Search"
  - "Chickering 2002"
  - "FES BES causal"
---

# Greedy Equivalence Search (GES)

> [!summary]
> **GES** (Chickering 2002) is a **score-based** algorithm for causal structure learning that
> searches greedily in the space of **equivalence classes** (CPDAGs), not in the space of DAGs.
> It has two phases: a **Forward Equivalence Search (FES)** that adds edges until no score
> improvement is possible, and a **Backward Equivalence Search (BES)** that removes edges. Under
> faithfulness, causal sufficiency, and a decomposable score (e.g., BIC), GES is **consistent** —
> it returns the true CPDAG in the large-sample limit. Unlike PC, GES does not require CI tests,
> which makes it more robust in finite samples under parametric model assumptions.

## Overview

GES addresses the same problem as [[PC Algorithm]] but from the opposite direction: instead of
testing CI constraints, GES **scores DAGs** using a decomposable score (typically BIC) and
searches for the highest-scoring equivalence class.

The key insight in Chickering (2002) is that the search can be performed **directly in CPDAG
space** — operators on CPDAGs can be evaluated locally (each operator's score change depends only
on a small neighbourhood of the modified edges), making greedy search efficient.

**The Meek Conjecture** is the central theoretical lemma proved in Chickering (2002):

> [!theorem] Theorem: Meek Conjecture (Chickering 2002, Theorem 15)
> If a DAG $\mathcal{H}$ is an independence map of another DAG $\mathcal{G}$ (every independence
> in $\mathcal{G}$ is also in $\mathcal{H}$), then there exists a sequence of **covered edge
> reversals** in $\mathcal{G}$ that transforms $\mathcal{G}$ into $\mathcal{H}$, where each
> intermediate graph remains an independence map of $\mathcal{G}$.
>
> **Consequence for GES:** In the large-sample limit, the Forward Equivalence Search can reach
> the true equivalence class from the empty graph by repeatedly applying local FES operators,
> each improving the score — and the Backward phase can then remove unnecessary edges without
> dropping below the true class.
^thm-meek-conjecture

## Main Content

### Score Functions

GES requires a **decomposable score** $Q(\mathcal{G}, \mathbf{X})$: a score that factors over
the nodes as $Q = \sum_{j=1}^d Q_j(X_j, \mathsf{Pa}(X_j), \mathbf{X})$.

> [!definition] Definition: BIC Score (for Gaussian GES)
> For a Gaussian linear SEM with $n$ observations and $d$ variables, the **Bayesian Information
> Criterion** score for a DAG $\mathcal{G}$ is:
> $$\text{BIC}(\mathcal{G}) = -2 \hat{\ell}(\mathcal{G}) + |\mathcal{E}| \ln n,$$
> where $\hat\ell(\mathcal{G})$ is the maximized log-likelihood and $|\mathcal{E}|$ counts the
> number of edges (free parameters). The BIC decomposes as a sum over nodes:
> $$\text{BIC}(\mathcal{G}) = \sum_{j=1}^d \text{BIC}_j(X_j \mid \mathsf{Pa}(X_j)),$$
> where $\text{BIC}_j = n \ln \hat\sigma_j^2 + |\mathsf{Pa}(X_j)| \ln n$, with
> $\hat\sigma_j^2 = \frac{1}{n} \lVert X_j - \hat X_j^{\mathsf{Pa}} \rVert^2$ the residual variance.
>
> GES **maximizes** BIC (or equivalently, minimizes the negative BIC).
^def-bic-score

> [!definition] Definition: BDe/BDeu Score (for discrete GES)
> For discrete Bayesian networks with Dirichlet priors, the **Bayesian Dirichlet equivalent uniform
> (BDeu)** score (Heckerman et al. 1995) is:
> $$\text{BDe}(\mathcal{G}) = \sum_{j=1}^d \sum_{s \in \mathsf{dom}(\mathsf{Pa}(X_j))} \left[\ln\frac{\Gamma(\alpha_{js})}{\Gamma(\alpha_{js} + N_{js})} + \sum_{a \in \mathsf{dom}(X_j)} \ln \frac{\Gamma(\alpha_{jsa} + N_{jsa})}{\Gamma(\alpha_{jsa})}\right],$$
> where $\alpha_{jsa}$ are Dirichlet hyperparameters (often set to $\alpha_{jsa} = \alpha / (r_j q_j)$
> with $\alpha$ a single equivalent sample size hyperparameter) and $N_{jsa}$ is the count of
> $(X_j = a, \mathsf{Pa}(X_j) = s)$ in data.
^def-bdeu-score

### Phase 1: Forward Equivalence Search (FES)

> [!definition] Algorithm: Forward Equivalence Search (Chickering 2002, §5)
> Start with the empty graph (CPDAG = no edges).
>
> **Repeat until no improvement:**
> 1. For each valid **Insert operator** Insert$(X, Y, \mathbf{T})$ — where $X$ and $Y$ are
>    non-adjacent in the current CPDAG and $\mathbf{T}$ is a valid "clique" subset of undirected
>    neighbours of $Y$ — compute the score change $\Delta_{\text{Insert}}(X, Y, \mathbf{T})$.
> 2. Apply the operator with the highest positive score change.
> 3. Convert the resulting PDAG to its CPDAG (using Meek's rules [[CPDAG and Markov Equivalence#^thm-meek-rules]]).
>
> **Output:** The CPDAG with the locally maximum score; the FES terminates with a CPDAG that is an
> **I-map** (independence map) of the true distribution in the large-sample limit.
^def-fes

**Score change formula for Insert:**

> [!theorem] Local scoring of Insert operator (Chickering 2002, Lemma 9)
> The Insert$(X, Y, \mathbf{T})$ operator adds the edge $X \to Y$ with $\mathbf{T}$ becoming
> new parents of $Y$ along with $X$. Its score change is:
> $$\Delta_{\text{Insert}} = Q_Y(X_Y, \mathsf{Pa}(Y) \cup \mathbf{T} \cup \{X\}) - Q_Y(X_Y, \mathsf{Pa}(Y) \cup \mathbf{T}),$$
> computable from the **local** score at node $Y$ only — not the entire graph.
^thm-insert-local

### Phase 2: Backward Equivalence Search (BES)

> [!definition] Algorithm: Backward Equivalence Search (Chickering 2002, §6)
> Start from the CPDAG output by FES.
>
> **Repeat until no improvement:**
> 1. For each valid **Delete operator** Delete$(X, Y, \mathbf{H})$ — where $X$ and $Y$ are
>    adjacent and $\mathbf{H}$ is a valid subset of common neighbors — compute the score change
>    $\Delta_{\text{Delete}}(X, Y, \mathbf{H})$.
> 2. Apply the operator with the highest positive score change.
> 3. Convert the resulting PDAG to its CPDAG.
>
> **Output:** A CPDAG that is a **P-map** (perfect map) of the distribution in the large-sample limit.
^def-bes

**Why BES is needed:** FES may add *too many* edges (the I-map might not be the minimal I-map).
BES prunes to the perfect map — the minimal I-map, which corresponds to the true equivalence class.

### Consistency Theorem

> [!theorem] Theorem: GES Consistency (Chickering 2002, Theorem 16)
> Let $\mathcal{G}^*$ be the true DAG. Assume:
> 1. **Faithfulness**: $\mathbb{P}$ is faithful to $\mathcal{G}^*$.
> 2. **Causal sufficiency**: no hidden common causes.
> 3. **Decomposable score** that is **consistent** (score difference has correct sign with
>    probability $\to 1$ as $n \to \infty$; BIC satisfies this).
>
> Then GES outputs the CPDAG of $\mathcal{G}^*$ with probability $\to 1$ as $n \to \infty$.
>
> **Proof sketch:** (i) Using the Meek Conjecture, FES can reach the true equivalence class via
> greedy Insert operators that all improve the score in the population limit. (ii) BES removes all
> superfluous edges (those not in the true skeleton) because removing them increases the score
> in the population limit. (iii) In finite samples, consistency of BIC transfers to consistency
> of GES under faithfulness.
^thm-ges-consistency

### Runtime

- FES: at each step, evaluate all Insert operators — $O(d^2 \cdot d)$ = $O(d^3)$ evaluations
  per FES step, each taking $O(q_{\max}^3)$ for the regression — total $O(d^4 q_{\max}^3)$ in
  the worst case. In practice much faster due to adjacency sparsity.
- BES: similar complexity.
- **FGS (Fast GES)**: Ramsey et al. (2017) proposed a parallelised, thread-optimised version
  ("FGS" or "FGES") that scales to thousands of variables by exploiting conditional independence
  to cache scores.

## Examples

> [!example] Example: GES on the Sachs dataset
> The Sachs protein-signalling network (11 variables, 853 observations) is a standard benchmark.
> GES with BIC achieves SHD (Structural Hamming Distance) ≈ 12–14 on this dataset, comparable to
> PC at the same tuning. Both are outperformed slightly by NOTEARS (see [[NOTEARS Experiments]]).
> In large simulation studies (Chickering 2002, Table 1; Fig. 3 in Zheng et al. 2018), GES
> consistently beats PC on dense graphs and at smaller sample sizes.

> [!example] Example: GES vs. PC at finite sample
> With $n = 100$, $d = 10$ Gaussian linear SEM, maximum in-degree 2: GES (BIC) typically
> achieves SHD ~4–6, PC (Fisher Z, $\alpha = 0.01$) achieves SHD ~6–9. The difference arises
> because BIC-based scoring is more stable than multiple CI tests in the same conditioning set.
> At $n = 1000$ both methods converge to near-zero SHD.

## Connections

- **PC algorithm**: PC is constraint-based; GES is score-based. In the Gaussian large-sample
  limit both are consistent and return the same CPDAG — but they differ significantly at finite
  $n$, and GES generally wins when the parametric model is correct.
- **NOTEARS**: NOTEARS [[NOTEARS - Overview]] is also score-based (LS score) but uses **continuous
  optimization** rather than discrete greedy search. NOTEARS vs. GES comparisons in
  [[NOTEARS Experiments]] show NOTEARS matches GES on sparse graphs and beats it on denser ones.
- **Exact search**: GOBNILP and similar exact methods optimize the same BIC score as GES
  but find the **global** optimum — at exponential cost. GES finds the correct solution
  asymptotically without paying that cost.
- **Software**: `pcalg::ges()` in R. Python: `causal-learn`'s `GES` class.

## See Also
- [[CPDAG and Markov Equivalence]] — the search space GES operates in
- [[DAG Structure Learning Problem]] — the scoring program GES solves, and the NP-hardness motivation
- [[PC Algorithm]] — the constraint-based alternative
- [[NOTEARS Algorithm]] — the continuous optimization alternative using the same LS score idea
- [[NOTEARS Experiments]] — empirical benchmarks that include GES / FGS as a baseline
