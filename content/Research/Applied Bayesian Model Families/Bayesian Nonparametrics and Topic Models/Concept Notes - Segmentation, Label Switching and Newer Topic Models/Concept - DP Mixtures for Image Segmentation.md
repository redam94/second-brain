---
title: "Concept - DP Mixtures for Image Segmentation"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; literature cited from memory (Martin 2001; Arbelaez 2011; Achanta 2012; Sudderth and Jordan 2008)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models"
doc_type: concept
depends_on:
  - "[[Teh 2010 - DP Mixture Models and Applications]]"
  - "[[Teh 2010 - Stick-Breaking Construction]]"
  - "[[Concept - Label Switching and Label-Invariant Summaries]]"
used_by:
  - "[[Concept - Topic Model Evaluation and Stability]]"
aliases:
  - "image segmentation with unknown number of regions"
  - "superpixel DP mixture"
  - "BSDS500 DP segmentation"
---

# Concept - DP Mixtures for Image Segmentation

> [!summary]
> Concept note (no raw source). Segment an image into an unknown number of regions by (1) over-segmenting into superpixels (SLIC), (2) fitting a truncated stick-breaking DP mixture to superpixel features, (3) summarising the posterior with label-invariant quantities (co-assignment, boundary probabilities, a Binder or VI point partition), and (4) checking against human segmentations. The number of regions is a posterior output, but it is sensitive to $\alpha$, truncation and the kernel.

## Overview
Motivating example **E75** ("Image segmentation with an unknown number of regions, checked against people"): ten photographs from BSDS500 at half resolution (two training, eight test) with the segmentations of 5-6 people each; SLIC superpixels, a truncated stick-breaking DP mixture in PyMC, why NUTS struggles on it (label switching, chains in different modes, a binding truncation), label-invariant summaries (co-assignment, boundary probability). URL: [PyMC challenges examples](https://redam94.github.io/pymc-challenges/examples.html).

## Main Content
**Data and benchmark.** The Berkeley Segmentation Dataset (Martin, Fowlkes, Tal, Malik, ICCV 2001) provides human-drawn segmentations; BSDS500 (Arbelaez, Maire, Fowlkes, Malik, TPAMI 2011) extends it to 500 images (200 train, 100 validation, 200 test) with several human annotators per image. Different humans choose different numbers of regions, so no single "true" $K$ exists; evaluation uses boundary- and partition-based agreement with the set of human segmentations.

**Superpixels.** SLIC (Achanta et al., TPAMI 2012) runs a localised $k$-means in a joint colour (CIELAB) and position space, producing compact, boundary-adherent superpixels. This reduces $\sim10^5$ pixels to a few hundred nodes $s=1..S$, each with features $y_s$ (mean colour, optionally texture) and a spatial neighbour graph.

> [!definition] Truncated DP mixture for superpixels
> $$
> \alpha\sim\text{Gamma}(a,b),\ \beta_k\sim\text{Beta}(1,\alpha),\ \pi_k=\beta_k\prod_{l<k}(1-\beta_l)\ (k\le K,\ \beta_K=1),\ \mu_k\sim\text{N}(m_0,S_0),\ \Sigma_k\sim\text{LKJ/InvWishart},
> $$
> $$
> z_s\mid\pi\sim\text{Categorical}(\pi),\qquad y_s\mid z_s=k\sim\text{N}(\mu_k,\Sigma_k).
> $$
> Regions are the occupied components; spatial contiguity is not built in (add position features, a Potts/MRF prior on $z$, or dependent PY priors as in Sudderth and Jordan 2008, NIPS).

^def-dpm-superpixel

**Why NUTS struggles.** (1) Labels are exchangeable, so each of $K!$ relabellings is a mode and chains can settle in different ones, which defeats $\hat R$ on component parameters; (2) when $K$ is too small the truncation binds (the last component keeps non-negligible mass), changing the implied prior on the number of regions; (3) component means/weights are poorly identified when components are empty. Use truncation checks and label-free summaries ([[Concept - Label Switching and Label-Invariant Summaries]]).

> [!theorem] Boundary probability from co-assignment
> For neighbouring superpixels $s,t$, the posterior probability of a region boundary between them is $b_{st}=1-P(z_s=z_t\mid y)=1-C_{st}$, with $C_{st}$ the co-assignment probability. It is invariant to labelling and can be compared with human boundary maps.

^thm-boundary-prob

**Point segmentation.** Choose the partition minimising posterior expected Binder or variation-of-information loss (Binder 1978; Dahl 2006; Lau and Green 2007; Wade and Ghahramani 2018), picked from the sampled partitions or by greedy search.

## Examples
> [!example] PyMC-style model sketch (untested; PyMC 5)
> ```python
> import pymc as pm, numpy as np
> # Y: (S, 3) superpixel mean-Lab features, K truncation
> with pm.Model() as seg:
>     alpha = pm.Gamma("alpha", 2.0, 1.0)
>     w = pm.StickBreakingWeights("w", alpha=alpha, K=K - 1)
>     mu = pm.Normal("mu", Y.mean(0), 20.0, shape=(K, 3))
>     sd = pm.HalfNormal("sd", 10.0, shape=(K, 3))
>     comps = pm.Normal.dist(mu=mu, sigma=sd)              # diagonal components
>     pm.Mixture("y", w=w, comp_dists=comps, observed=Y)   # z summed out
> # Post-process: draw z_s | rest per posterior sample, then build co-assignment
> ```

^ex-segmentation-pymc

> [!example] Co-assignment and Binder point estimate from label-switched draws
> The code builds $C_{ij}=\Pr(z_i=z_j)$ from draws that are randomly relabelled, then selects the draw with minimum expected Binder loss. Output: row 3 of $C$ is $[0.9,0.9,1,0.1,0.1,0.1]$ and the Binder-optimal partition is $[1,1,1,0,0,0]$.

^ex-binder-point

```python
import numpy as np
rng = np.random.default_rng(0)
base = np.array([0, 0, 0, 1, 1, 1]); draws = []
for _ in range(200):
    z = base.copy()
    if rng.random() < .1: z[2] = 1               # an uncertain item
    if rng.random() < .5: z = 1 - z              # label switching
    draws.append(z)
Z = np.array(draws)
C = (Z[:, :, None] == Z[:, None, :]).mean(0)      # co-assignment, label-invariant
def binder(z, C):
    S = z[:, None] == z[None, :]; iu = np.triu_indices(len(z), 1)
    return (S * (1 - C) + (~S) * C)[iu].sum()
best = min(range(len(Z)), key=lambda i: binder(Z[i], C))
print(C.round(2)[2], Z[best])
```

## Relevance to marketing measurement
The same pipeline (over-segment, then DP mixture, then label-free summaries) applies to geo regions (clustering DMAs into response regimes using spatial adjacency) and to creative images (clustering by visual features). Treat the number of regimes as a modelling output tied to $\alpha$ and the kernel, never as a causal quantity.

## Connections
[[Teh 2010 - DP Mixture Models and Applications]], [[Teh 2010 - Stick-Breaking Construction]], [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]] (flatter prior on $K$), [[Monsters and Mixtures]].

## See Also
[[Research/Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models/_Index|Concept notes index]]
