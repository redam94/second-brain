---
title: "Teh 2010 - Extensions and Reference Map"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Generalizations and Extensions; Future Directions; Cross References; Recommended Reading; refs [1]-[18], pp. 10-13"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
depends_on:
  - "[[Teh 2010 - Dirichlet Process - Overview]]"
used_by:
  - "[[De Blasi 2015 - Gibbs-Type Priors - Overview]]"
aliases:
  - "DP extensions"
  - "Teh 2010 reference list"
---

# Teh 2010 - Extensions and Reference Map

> [!summary]
> The DP generalises along several axes: a discount parameter (Pitman-Yor), other representations (Polya trees, normalised random measures, Poisson-Kingman, species sampling, stick-breaking priors), dependence across covariates (dependent DP) and groups (hierarchical DP). Teh lists open directions: inference, new objects, consistency theory and applications.

## Main Content
**Generalisations (pp. 10-11).**
- **Pitman-Yor process** $\text{PY}(\alpha,d,H)$: adds a discount $d\in[0,1)$; $d=0$ is the DP. It has CRP and stick-breaking analogues and fits power-law data (Goldwater et al. 2006; Teh 2006 language model). Fully treated in [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]].
- Other priors obtained by generalising a representation: Polya trees, normalised random measures, Poisson-Kingman models, species sampling models, stick-breaking priors.
- **Dependent DP** (MacEachern 1999): one random measure per covariate value. **Hierarchical DP** (Teh et al. 2006): one measure per group (task), with dependence through a shared DP base.

**Future directions.** Efficient inference (split-merge, large-step auxiliary-variable MCMC, SMC, EP, variational); extensions to new random distributions; consistency and convergence theory; applications to clustering, transfer learning, relational learning, cognition, sequence learning and regression.

> [!definition] Reference map (Teh refs [1]-[18]) with where each is used
> | Ref | Citation | Role in entry |
> |---|---|---|
> | [1] | Ferguson 1973, Ann. Stat. 1(2) | Defines DP; gamma-process construction |
> | [2] | Ewens 1972, Theor. Pop. Biol. 3 | Origin of CRP law |
> | [3] | Escobar and West 1995, JASA 90 | DP mixture density estimation, Gibbs |
> | [4] | Neal 2000, JCGS 9 | MCMC survey for DP mixtures |
> | [5] | Neal 1992 | Early infinite mixture |
> | [6] | Rasmussen 2000, NIPS 12 | Infinite Gaussian mixture |
> | [7] | Blackwell and MacQueen 1973 | Urn; existence via de Finetti |
> | [8] | Sethuraman 1994, Stat. Sinica 4 | Stick-breaking |
> | [9] | Aldous 1985 | Exchangeability; CRP |
> | [10] | Pitman 2002 (TR 621) | Combinatorial stochastic processes |
> | [11] | Ishwaran and James 2001, JASA 96 | Gibbs for stick-breaking priors |
> | [12] | Lo 1984 | DP kernel density estimates |
> | [13] | Pitman and Yor 1997, Ann. Prob. 25 | Two-parameter Poisson-Dirichlet |
> | [14] | Goldwater, Griffiths, Johnson 2006 | Power-law generators |
> | [15] | Teh 2006 (ACL) | PY language model |
> | [16] | MacEachern 1999 | Dependent processes |
> | [17] | Teh, Jordan, Beal, Blei 2006, JASA 101 | Hierarchical DP |
> | [18] | Hjort, Holmes, Muller, Walker (eds) 2010 | Bayesian Nonparametrics book |

^def-teh-reference-map

## Examples
Teh's claim that the "$d=0$ reduces to DP" can be checked against the Pitman-Yor predictive rule in [[De Blasi 2015 - EPPF and Predictive Structure]]: setting $\sigma=0$ in $(\theta+\sigma k)/(\theta+n)$ gives $\theta/(\theta+n)$, the CRP.

## Connections
HDP-based topic models (Teh et al. 2006) pick $K$ for LDA nonparametrically: [[Blei 2003 - Latent Dirichlet Allocation - Overview]] covers the finite-$K$ case; [[Concept - Neural and Embedding Topic Models]] mentions alternatives.

## See Also
[[Teh 2010 - Dirichlet Process - Overview]]
