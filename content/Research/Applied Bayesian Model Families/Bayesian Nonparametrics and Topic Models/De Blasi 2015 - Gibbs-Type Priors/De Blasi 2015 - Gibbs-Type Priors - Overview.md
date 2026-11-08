---
title: "De Blasi 2015 - Gibbs-Type Priors - Overview"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/overview
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Whole paper (IEEE TPAMI 37(2):212-229; arXiv 1503.00163), pp. 1-44 incl. appendix and references"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[Teh 2010 - Dirichlet Process - Overview]]"
  - "[[Nonparametric Models Overview]]"
used_by:
  - "[[De Blasi 2015 - EPPF and Predictive Structure]]"
  - "[[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]]"
  - "[[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]"
  - "[[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]]"
  - "[[De Blasi 2015 - Species Sampling and Unseen Species Prediction]]"
  - "[[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]]"
aliases:
  - "Gibbs-type priors overview"
  - "Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process"
---

# De Blasi 2015 - Gibbs-Type Priors - Overview

> [!summary]
> De Blasi, Favaro, Lijoi, Mena and Prunster review Gibbs-type priors: discrete nonparametric priors whose probability of a new value depends on the sample size $n$ and the number of distinct values $k$ but not on the frequencies. They contain the Dirichlet process (DP), Pitman-Yor (PY) and normalised generalised gamma (NGG) processes, with a discount $\sigma$ controlling whether $K_n$ grows like $\log n$, $n^\sigma$ or saturates. Key takeaway: a prior on the number of clusters flatter than the DP's is available in closed form, and the same EPPF gives exact unseen-species predictions.

## Overview
**Research question.** Beyond the Dirichlet process, what is a tractable and principled family of discrete random probability measures, and what do its exchangeable partitions say about clustering, prediction of new species and consistency?

**Contribution.** (i) A predictive classification of species sampling models (Prop. 1); (ii) the product-form EPPF $V_{n,k}\prod(1-\sigma)_{n_i-1}$; (iii) special cases (DP, PY, NGG, Gnedin); (iv) effects on mixture-model clustering; (v) Bayesian nonparametric estimators for species variety and discovery probabilities; (vi) frequentist consistency and dependent extensions.

**Key results.** $P(\text{new}\mid\cdot)=V_{n+1,k+1}/V_{n,k}$; PY: $(\theta+\sigma k)/(\theta+n)$; $K_n/c_n(\sigma)\to S_\sigma$ a.s.; PY estimator $\hat K_m^{(n)}=(k+\theta/\sigma)\big[\frac{(\theta+n+\sigma)_m}{(\theta+n)_m}-1\big]$; consistency at discrete $P_0$ but inconsistency at diffuse $P_0$ unless $\sigma=0$.

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract; 1 Introduction | this note |
| 1.1 Discrete measures, EPPF, predictive distributions (Eqs. 1-11) | [[De Blasi 2015 - EPPF and Predictive Structure]] |
| 1.2 Applications to species sampling and mixtures | [[De Blasi 2015 - EPPF and Predictive Structure]] |
| 1.3 Outline | this note |
| 2 Gibbs-type priors (Prop. 1, Eqs. 13-17, Remark 2) | [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] |
| 2.1 Product partition models | [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] |
| 2.2 Sub-classes (PY, sigma-stable, finite species, Gnedin, NGG, support) | [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]] |
| 3 Hierarchical mixtures (Eqs. 26-27, Figs 1-4, Table 1) | [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]] |
| 4 Prediction in species sampling (4.1 overall, 4.2 rare; Eqs. 28-43, Table 2, Fig. 5) | [[De Blasi 2015 - Species Sampling and Unseen Species Prediction]] |
| 5 Frequentist asymptotics (5.1 general, 5.2 illustrations) | [[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]] |
| 6 Dependent processes; 7 Concluding remarks | [[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]] |
| Appendix (proof of Prop. 1); References [1]-[76] | [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] |

## Motivating PyMC examples
- **E30** Exchangeable partitions: Polya urns, the Chinese restaurant process, Pitman-Yor and unseen species (Moby-Dick word tokens; Barro Colorado Island 50-ha tree census). The listed method string includes: urn simulation and de Finetti limits, the EPPF checked by brute force, NUTS on $(\alpha,d)$ with no latent assignments, stable log rising factorial, frequency-of-frequencies and Heaps-curve PPCs, exact held-out predictive from EPPF ratios.
- **E26** (DP mixtures; prior on $K$ and sensitivity to $\alpha$); **E75** (image segmentation with unknown regions).
URL: [PyMC challenges examples](https://redam94.github.io/pymc-challenges/examples.html).

## Relevance to marketing measurement
Unseen-species estimation transfers to "how many new items/customers/creatives will appear": e.g. expected number of new SKUs bought in a future sample, or share of future transactions that are first-time item purchases. PY priors also give heavy-tailed cluster sizes, matching the long tail of product popularity. Use with caution: the predictions assume exchangeability, which fails with trends and seasonality.

## Connections
[[Teh 2010 - Dirichlet Process - Overview]], [[Teh 2010 - Extensions and Reference Map]], [[Nonparametric Models Overview]], [[Pareto-NBD Model]] (customer-base "unseen" counts, different mechanism).

## See Also
[[Research/Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors/_Index|De Blasi 2015 index]]
