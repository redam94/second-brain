---
title: "Concept - Label Switching and Label-Invariant Summaries"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; literature: Stephens 2000, Jasra-Holmes-Stephens 2005, Meila 2007, Wade and Ghahramani 2018"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models"
doc_type: concept
depends_on:
  - "[[Teh 2010 - DP Mixture Models and Applications]]"
  - "[[Blei 2003 - LDA Beyond Text Baskets and Sessions]]"
used_by:
  - "[[Concept - DP Mixtures for Image Segmentation]]"
  - "[[Blei 2003 - LDA Beyond Text Baskets and Sessions]]"
aliases:
  - "label switching in mixtures and topic models"
  - "label-invariant diagnostics"
  - "co-clustering matrix"
  - "Hungarian alignment"
---

# Concept - Label Switching and Label-Invariant Summaries

> [!summary]
> Concept note (no raw source). Mixtures, DP mixtures, LDA and IBP have exchangeable component labels, so the posterior is invariant under relabelling and component-indexed quantities are meaningless across draws. Diagnose and report only label-invariant functionals, or align labels explicitly (Hungarian algorithm, Stephens relabelling).

## Main Content
> [!definition] Label switching
> If the prior and likelihood are invariant to a permutation $\rho$ of component indices, then $p(\theta_{\rho(1:K)}\mid y)=p(\theta_{1:K}\mid y)$: the posterior has (at least) $K!$ symmetric modes. An MCMC chain may jump between them (label switching) or sit in one, and different chains may sit in different ones (Stephens 2000, JRSSB; Jasra, Holmes, Stephens 2005, Stat. Sci.).

^def-label-switching

**Consequences.** Component-wise posterior means are averages over modes; $\hat R$/ESS on component parameters are inflated or misleading; trace plots show jumps; for the DP/stick-breaking prior the weights are only stochastically ordered, so there is no built-in ordering either.

**Remedies.**
1. *Label-invariant functionals* (preferred): log-likelihood, posterior predictive density on a grid, number of occupied components $K_+=\#\{k:n_k>0\}$, co-assignment matrix $C_{ij}=P(z_i=z_j\mid y)$, $\sum_k\pi_k\phi_k$ (mixture-implied word or item distribution), region boundary probabilities.
2. *Point partition*: minimise expected Binder or variation-of-information loss over $C$ and sampled partitions ([[Concept - DP Mixtures for Image Segmentation]]).
3. *Post-hoc relabelling*: Hungarian algorithm to match each draw's components to a reference by minimising a cost (L1 distance of component distributions, or negative overlap of cluster membership); Stephens' KL-based relabelling minimises expected loss.
4. *Identifiability constraints* (e.g. $\mu_1<\dots<\mu_K$): easy but can distort the posterior if components overlap.

> [!theorem] Hungarian alignment (assignment problem)
> Given a $K\times K$ cost matrix $c_{ab}$ between reference component $a$ and draw component $b$, the permutation $\rho^*=\arg\min_\rho\sum_ac_{a,\rho(a)}$ is found exactly in $O(K^3)$ (Kuhn-Munkres); this resolves label switching for a fixed reference when the cost reflects component similarity.

^thm-hungarian

## Examples
> [!example] Aligning topics across restarts or chains
> Compare topic-word matrices from two fits by L1 distances and `linear_sum_assignment`; see the runnable snippet in [[Blei 2003 - LDA Beyond Text Baskets and Sessions]]. For DP mixtures, compare label-free summaries; compute $K_+$ per draw and its histogram.

^ex-alignment

```python
import numpy as np
def occupied(z):                       # K+ for one draw of assignments
    return len(np.unique(z))
def coassign(Z):                       # Z: (draws, items) assignments
    return (Z[:, :, None] == Z[:, None, :]).mean(0)
```

## Connections
[[MCMC Basics]], [[Efficient MCMC]], [[Monsters and Mixtures]] (non-identifiability in mixtures), [[Concept - Topic Model Evaluation and Stability]].

## See Also
[[Teh 2010 - DP Mixture Models and Applications]]
