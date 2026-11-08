---
title: "Index: De Blasi 2015 - Gibbs-Type Priors"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/index
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Index"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
parent: "[[../_Index|Bayesian Nonparametrics and Topic Models]]"
date_updated: 2026-11-08
concept_count: 7
---

# De Blasi 2015 - Gibbs-Type Priors

> [!abstract] Routing Summary
> Fully captures De Blasi, Favaro, Lijoi, Mena and Prunster (2015), *Are Gibbs-type priors the most natural generalization of the Dirichlet process?*, IEEE TPAMI 37(2) (arXiv 1503.00163; 44 pp.): EPPF, Pitman-Yor, Gibbs-type classification, priors on the number of clusters, unseen-species prediction and consistency. Seven notes.
> - Need the paper on one page or the Source Map? -> [[De Blasi 2015 - Gibbs-Type Priors - Overview]]
> - Need EPPF definitions, DP/PY EPPF, predictive rules, PyMC sketch? -> [[De Blasi 2015 - EPPF and Predictive Structure]]
> - Need Proposition 1, Gibbs-type definition, sigma-diversity? -> [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]]
> - Need PY/NGG/Gnedin/finite-species weights? -> [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]
> - Need the prior/posterior on number of clusters, Table 1? -> [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]]
> - Need unseen-species estimators, Good-Toulmin, Naegleria data? -> [[De Blasi 2015 - Species Sampling and Unseen Species Prediction]]
> - Need consistency results and dependent processes? -> [[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Species sampling model | [[De Blasi 2015 - EPPF and Predictive Structure]] | definition | de Finetti | discrete $\tilde p$ with iid atoms |
| EPPF | [[De Blasi 2015 - EPPF and Predictive Structure]] | definition | species sampling | partition law; addition rule |
| DP and PY EPPF | [[De Blasi 2015 - EPPF and Predictive Structure]] | theorem | EPPF | $\theta^k\prod(n_i-1)!/(\theta)_n$; PY product form |
| Proposition 1 | [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] | theorem | EPPF | DP iff new-prob depends on $n$ only |
| Gibbs-type prior | [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] | definition | Prop. 1 | $V_{n,k}\prod(1-\sigma)_{n_i-1}$ |
| sigma-diversity | [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] | theorem | Gibbs-type | $K_n/c_n(\sigma)\to S_\sigma$ |
| PY, NGG, finite species | [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]] | definition | Gibbs-type | weights $V_{n,k}$ |
| Prior on $K_n$ | [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]] | theorem | EPPF | $V_{n,k}\mathscr C(n,k;\sigma)/\sigma^k$ |
| New-species law | [[De Blasi 2015 - Species Sampling and Unseen Species Prediction]] | theorem | Gibbs-type | depends on $K_n$ only |
| PY estimators | [[De Blasi 2015 - Species Sampling and Unseen Species Prediction]] | theorem | new-species law | $\hat K_m^{(n)}$, $\hat U_{n+m,0}$ |
| Consistency | [[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]] | theorem | Gibbs-type | limit $\alpha P^*+(1-\alpha)P_0$ |

## Notes
- [[De Blasi 2015 - Gibbs-Type Priors - Overview]] — CONTAINS: question, contributions, key results, Source Map, E30 link, marketing relevance.
- [[De Blasi 2015 - EPPF and Predictive Structure]] — CONTAINS: species sampling definition, EPPF, DP/PY EPPFs and predictives, brute-force check, PyMC EPPF sketch.
- [[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]] — CONTAINS: Prop. 1 with proof, Gibbs-type definition, predictive stages, sigma-diversity, product partition models.
- [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]] — CONTAINS: PY weights, finite species, Gnedin/Poisson/geometric, NGG, support.
- [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]] — CONTAINS: prior on $K_n$ theorem, five-prior comparison, Table 1, prior-K code.
- [[De Blasi 2015 - Species Sampling and Unseen Species Prediction]] — CONTAINS: new-species law, PY estimators, asymptotics, Table 2, Naegleria recomputation.
- [[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]] — CONTAINS: general convergence, negative-sigma conditions, illustrations, dependent processes, conclusions.

## Sources
- [[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]] — De Blasi P, Favaro S, Lijoi A, Mena RH, Prunster I (2015), IEEE TPAMI 37(2):212-229.

## See Also
[[Teh 2010 - Dirichlet Process - Overview]], [[Griffiths 2011 - The Indian Buffet Process - Overview]], [[Nonparametric Models Overview]]
