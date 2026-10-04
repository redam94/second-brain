---
title: "Score Functions for Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/chickering-2002-ges.md]]"
source_location: "§3 Background on Bayesian Scoring, pp. 510–519"
date_ingested: 2026-10-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[NOTEARS Algorithm]]"
aliases:
  - "BIC score structure learning"
  - "BDeu score"
  - "BGe score"
  - "decomposable score"
  - "score equivalence"
---

# Score Functions for Structure Learning

> [!summary]
> Score-based causal discovery (e.g., [[GES Algorithm]], [[NOTEARS - Overview]]) maximizes a
> **score function** $S(G, \mathbf{X})$ over DAGs or their Markov equivalence classes. A score
> must be **decomposable** (local recomputation when edges change) and **score equivalent** (all
> DAGs in the same MEC score equally) for GES to work efficiently. The **BIC score** satisfies
> both properties for Gaussian data, and is *consistent* — it selects the true MEC asymptotically.
> **BDeu** is the equivalent for discrete data; **BGe** for Bayesian Gaussian estimation.

## Overview

Score functions transform the combinatorial problem of DAG search (Program (4) in
[[DAG Structure Learning Problem]]) into a numerical optimization problem. Two properties
are critical for efficient greedy search:

1. **Decomposability**: enables local score updates when one edge is added/removed.
2. **Score equivalence**: ensures that all DAGs in the same MEC get the same score, so the
   search can be done over CPDAGs rather than individual DAGs.

A score that satisfies both is called a **decomposable, score-equivalent** score. BIC, BDeu,
and BGe all satisfy both.

## Main Content

### BIC / MDL score (Gaussian data)

The Bayesian Information Criterion (BIC) is the standard score for continuous Gaussian data.
For a Gaussian linear SEM $X_j = \sum_{k \in \text{Pa}(j)} w_{kj} X_k + \varepsilon_j$,
$\varepsilon_j \sim \mathcal{N}(0, \sigma_j^2)$:

> [!definition] Definition: BIC Score for Gaussian DAGs
> $$S_{\text{BIC}}(G, \mathbf{X}) = \sum_{j=1}^p s^{\text{BIC}}_j(X_j, \text{Pa}_G(X_j), \mathbf{X}),$$
> where the local score is
> $$s^{\text{BIC}}_j = \ell_j - \frac{|\text{Pa}_G(X_j)| + 1}{2} \log n.$$
> Here $\ell_j = -\frac{n}{2}\bigl[\log(2\pi\hat\sigma_j^2) + 1\bigr]$ is the maximized
> log-likelihood of node $j$'s regression on its parents, and the penalty counts
> $|\text{Pa}_G(X_j)| + 1$ parameters (regression coefficients + variance).
^def-bic

The BIC penalizes additional edges by $\frac{\log n}{2}$ each. It is **consistent**: as
$n \to \infty$, the BIC selects the true structure over any non-equivalent DAG.

> [!note] Connection to NOTEARS's LS score
> NOTEARS uses a regularized least-squares score $F(W) = \frac{1}{2n}\|X - XW\|_F^2 + \lambda\|W\|_1$
> (see [[DAG Structure Learning Problem]]). The LS loss is proportional to the BIC Gaussian
> log-likelihood; the $\ell_1$ penalty plays the role of BIC's parameter penalty. The key
> difference is that NOTEARS uses the $\ell_1$ penalty (shrinkage / sparsity) while BIC uses
> a discrete $\ell_0$ penalty (number of non-zeros), making NOTEARS a continuous relaxation.

### BDeu score (discrete data)

For discrete variables $X_j \in \{1,\dots,r_j\}$ with parent configuration space
$\text{Pa}_G(X_j)$ taking values in $\{1,\dots,q_j\}$:

> [!definition] Definition: BDeu Score (Heckerman et al. 1995)
> $$s^{\text{BDeu}}_j(X_j, \text{Pa}_G(X_j)) = \sum_{k=1}^{q_j}\!\!\left[\log\frac{\Gamma(\alpha / q_j)}{\Gamma(\alpha/q_j + N_{jk})} + \sum_{l=1}^{r_j}\log\frac{\Gamma(\alpha/(q_j r_j) + N_{jkl})}{\Gamma(\alpha/(q_j r_j))}\right],$$
> where $N_{jk} = \sum_l N_{jkl}$ is the number of observations with parents in configuration $k$,
> $N_{jkl}$ is the count of $X_j = l$ with parents in configuration $k$, and $\alpha > 0$ is the
> **equivalent sample size** hyperparameter controlling prior strength.
>
> BDeu is the Bayesian Dirichlet score with a **uniform** prior (equal prior weight to each
> parameter configuration), making it the unique decomposable, score-equivalent Bayesian score
> for discrete data under the BDe family.
^def-bdeu

BDeu is consistent for fixed $p$; for growing $p$, consistency requires careful handling of
$\alpha$ (it acts like a regularizer — small $\alpha$ penalizes large parent sets more heavily).

### BGe score (Bayesian Gaussian equivalent)

> [!definition] Definition: BGe Score (Geiger & Heckerman 1994)
> The BGe score is the marginal likelihood of $X$ under a Gaussian DAG model with a
> Normal-Wishart prior on the parameters. It is the exact Bayesian equivalent of BIC and also
> satisfies decomposability and score equivalence. For large $n$, $\text{BGe} \approx \text{BIC}$
> up to a constant.
>
> BGe is preferred in low-$n$ settings where the BIC approximation is inaccurate, and in
> Bayesian Model Averaging over DAGs (where the prior matters).
^def-bge

### Properties summary

| Property | BIC | BDeu | BGe |
|----------|-----|------|-----|
| Data type | Continuous (Gaussian) | Discrete (multinomial) | Continuous (Gaussian) |
| Decomposable? | ✓ | ✓ | ✓ |
| Score equivalent? | ✓ | ✓ | ✓ |
| Consistent? | ✓ (fixed $p$; high-$p$ under sparsity) | ✓ (fixed $p$) | ✓ (fixed $p$) |
| Bayesian? | ✗ (approximate ML) | ✓ (marginal likelihood) | ✓ (marginal likelihood) |
| Penalty | $\frac{\log n}{2}$ per parameter | Dirichlet prior $\alpha$ | Normal-Wishart prior |

### Consistency and the faithfulness connection

Score consistency — the property that the true MEC achieves the highest score asymptotically —
does **not** require faithfulness. But GES's greedy search does (to prove that greedy transitions
lead to the global optimum). This is a subtle distinction:

- **Score alone**: BIC is consistent (as $n\to\infty$, $S_{\text{BIC}}(G^*) > S_{\text{BIC}}(G)$
  for $G \not\equiv G^*$) without faithfulness.
- **GES correctness**: Chickering's proof additionally needs faithfulness to show that the greedy
  path never gets "stuck" at a wrong equivalence class.

## See Also
- [[DAG Structure Learning Problem]] — the optimization problem these scores parameterize
- [[GES Algorithm]] — uses BIC/BDeu as its objective
- [[NOTEARS Algorithm]] — uses regularized LS as its (related) objective
- [[Overfitting and Information Criteria]] — BIC and information criteria in the model selection context
