---
title: "Griffiths 2011 - Applications of the IBP"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Sec. 6 (6.1-6.9), pp. 1211-1214; Sec. 8, pp. 1221-1222"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Griffiths 2011 - The Indian Buffet Process and Its Properties]]"
used_by:
  - "[[Griffiths 2011 - The Indian Buffet Process - Overview]]"
aliases:
  - "IBP applications"
  - "applications of Indian buffet process"
---

# Griffiths 2011 - Applications of the IBP

> [!summary]
> Section 6 reviews nine uses of the IBP prior: choice behaviour, protein complexes, dyadic data, similarity judgments, link prediction, ICA/sparse factor analysis, hidden-cause structure learning, structured Markov transition matrices, and faster inference algorithms.

## Main Content

| Sec. | Application | Role of $Z$ | Inference notes |
|---|---|---|---|
| 6.1 | Choice behaviour (Gorur et al. 2006) | latent option features, Tversky elimination-by-aspects likelihood | non-conjugate; auxiliary-variable sampler like Neal's Algorithm 8 |
| 6.2 | Protein interactions (Chu et al. 2006) | protein $i$ belongs to complex $k$; binding prob depends on $\sum_kz_{ik}z_{jk}$ | validated on yeast RNA-processing complexes (affinity purification / mass spectrometry) |
| 6.3 | Binary matrix factorisation, dyadic data (Meeds et al. 2007) | two IBP matrices (movies, viewers) linked by weights $W$ | two-parameter IBP; new-feature MH proposal; split-merge move |
| 6.4 | Similarity judgments (Navarro and Griffiths 2007) | additive clustering $s_{ij}\approx\sum_kw_kf_{ik}f_{jk}$ | numbers 0-9: even and odd features both recovered; singleton features drawn from prior |
| 6.5 | Link prediction (Miller et al. 2010) | scores $ZWZ^T$ squashed to link probability | strictly more expressive than stochastic blockmodels |
| 6.6 | ICA / sparse FA (Knowles and Ghahramani 2007; Rai and Daume 2009) | which sources are active | gene-signature discovery in ovarian cancer microarrays; factor regression |
| 6.7 | Hidden causes (Wood et al. 2006; Wood and Griffiths 2007) | hidden cause $k$ is parent of observed $i$ (noisy-OR) | particle filter (SMC) alternative |
| 6.8 | Markov transition structure (Fox et al. 2010) | which states each state transitions to | birth-death MCMC moves; motion-capture action components |
| 6.9 | Other inference | - | Doshi-Velez and Ghahramani 2009: keep $A$ uncollapsed for $O(N)$ per iteration and parallelism; mean-field VI (Doshi-Velez et al. 2009) for infinite ICA, better in high dimensions |

**Conclusions (Sec. 8).** The recipe "take the infinite limit of a finite exchangeable model" transfers from latent classes to latent features and may extend to other combinatorial structures (Titsias 2008; Orbanz 2010). The IBP also serves as a prior for any sparse binary matrix with unknown column count, such as bipartite adjacency matrices.

## Examples
> [!example] Marketing reading of Sec. 6.3
> Customers by products: rows are customers, columns are latent "needs"; $Z$ marks which needs a customer has, $W$ maps needs to purchase propensity; a two-parameter IBP controls how many needs are common. This is the dyadic binary factorisation of Meeds et al., not a statement from the paper about marketing.

^ex-ibp-marketing-dyadic

## Connections
[[Social Network Models]] for latent-feature link prediction; [[Customer Lifetime Value - Overview]] for the customer-heterogeneity setting.

## See Also
[[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]], [[Griffiths 2011 - The Indian Buffet Process - Overview]]
