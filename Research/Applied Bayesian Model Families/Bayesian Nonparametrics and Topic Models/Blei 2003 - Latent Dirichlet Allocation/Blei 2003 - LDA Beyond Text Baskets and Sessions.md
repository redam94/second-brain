---
title: "Blei 2003 - LDA Beyond Text Baskets and Sessions"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Sec. 7.3 (collaborative filtering), Sec. 2 (non-text remark), Sec. 8 (extensions); concept extension for PyMC examples E72 and E73"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
depends_on:
  - "[[Blei 2003 - LDA Generative Model and Exchangeability]]"
  - "[[Blei 2003 - Smoothed LDA, Examples and Experiments]]"
used_by:
  - "[[Concept - Topic Model Evaluation and Stability]]"
  - "[[Concept - Label Switching and Label-Invariant Summaries]]"
aliases:
  - "LDA for baskets"
  - "topic models beyond text"
  - "LDA label switching Hungarian alignment"
---

# Blei 2003 - LDA Beyond Text Baskets and Sessions

> [!summary]
> Replace words by items: shopping baskets, web sessions, headline tests or colour bins. The paper's own EachMovie experiment (Sec. 7.3) is the non-text precedent. In a probabilistic program, topics per token are summed out so that only $\theta_d$ and $\phi_k$ are sampled; label switching and sparsity then drive the diagnostics (Hungarian alignment, label-free summaries).

## Main Content
**Mapping (the paper's remark in Sec. 2, "not tied to text").** Document = unit with a bag of discrete observations: a customer (items purchased), a web session (pages visited), a headline test, a poster (colour bins). Topic = a mixture over items/pages/colours. For marketing: customers as documents and products as words.

**Collapsed likelihood.** From the continuous-mixture view: for document $d$ with item counts $n_{dv}$, $p(n_d\mid\theta_d,\phi)=\prod_vp_{dv}^{n_{dv}}$ with $p_d=\theta_d^T\phi$ (multinomial). This removes the $N_d$ discrete variables $z_{dn}$ and leaves a continuous model that gradient-based samplers can handle.

> [!example] PyMC-style sketch (untested; PyMC 5)
> ```python
> import pymc as pm, numpy as np
> # counts: (D, V) array of item counts; K topics
> with pm.Model() as lda:
>     theta = pm.Dirichlet("theta", a=np.full(K, 0.1), shape=(D, K))
>     phi   = pm.Dirichlet("phi",   a=np.full(V, 0.1), shape=(K, V))
>     p = pm.math.dot(theta, phi)                 # (D, V), z summed out
>     pm.Multinomial("n", n=counts.sum(1), p=p, observed=counts)
> ```
> Caveats: multimodal posterior, label switching across chains, funnel-like geometry for small Dirichlet concentrations; diagnose with label-free summaries and expect NUTS to struggle on sparse, high-dimensional simplices.

^ex-lda-pymc-sketch

**Label switching and alignment.** Topic labels are exchangeable under the prior, so a posterior sample's topic index $k$ is meaningless across draws/chains. To compare estimated topics $\hat\phi$ to truth (known-truth check) or across restarts, match topics by minimum cost assignment (Hungarian algorithm) on L1 distance and then compare. Label-free summaries: $\theta_d^T\phi$ (predicted item distribution), co-assignment of items/documents, topic coherence.

```python
import numpy as np
from scipy.optimize import linear_sum_assignment
rng = np.random.default_rng(0)
K, V = 3, 6
true = rng.dirichlet(np.ones(V) * .3, K)
est = np.abs(true[[2, 0, 1]] + rng.normal(0, .001, (K, V))); est /= est.sum(1, keepdims=True)
cost = np.abs(true[:, None, :] - est[None, :, :]).sum(2)     # L1 distances
r, c = linear_sum_assignment(cost)
print(c, cost[r, c].round(3))        # [1 2 0] matches the permutation; L1 ~ 0.005
```

## Examples
> [!example] Baskets (UCI Online Retail, E72 setting)
> Customers $\times$ products matrix with $\approx3{,}661\times2{,}087$ entries (counts): a topic is a product bundle; $\theta_d$ is the customer's mix of bundles. Held-out evaluation: hold out purchases within customers and compare $\theta_d^T\phi$ log-predictive; this is the collaborative-filtering protocol of Sec. 7.3 (hold out one item, predict it).

^ex-lda-baskets

## Relevance to marketing measurement
Topic proportions can be used as customer descriptors in downstream models ([[Customer Lifetime Value - Overview]], [[BG-NBD Model]] covariates). They are noisy estimates: propagate posterior uncertainty rather than plugging in point values, and avoid reading topics as causal segments.

## Connections
[[Concept - Topic Model Evaluation and Stability]], [[Concept - Short-Text Topic Models GSDMM and BTM]] (when documents have only a few tokens), [[Monsters and Mixtures]].

## See Also
[[Blei 2003 - Latent Dirichlet Allocation - Overview]]
