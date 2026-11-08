---
title: "Index: Applied Bayesian Model Families"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 361
---

# Applied Bayesian Model Families

> [!abstract] Routing Summary
> This topic fills the method gaps found by auditing the vault against the 117 PyMC worked examples at [redam94.github.io/pymc-challenges/examples.html](https://redam94.github.io/pymc-challenges/examples.html). It has 11 clusters built from 54 primary sources plus concept notes: 361 content notes and 74 indexes, ingested 2026-11-08. Every source Overview lists the examples it supports, and every method note has a PyMC-style sketch.
> - Robustness to hidden confounding, mediation, shrinking observational estimates toward experiments? → [[Causal Sensitivity and Mediation/_Index|Causal Sensitivity and Mediation]]
> - Dirichlet process, Pitman-Yor, Indian buffet process, LDA and topic models? → [[Bayesian Nonparametrics and Topic Models/_Index|Bayesian Nonparametrics and Topic Models]]
> - ChEES-HMC / MEADS GPU samplers, funnels, discrete latents, HMMs, stochastic volatility? → [[Advanced MCMC and Latent Discrete Models/_Index|Advanced MCMC and Latent Discrete Models]]
> - EVPI/EVSI, decision curves, sensor placement, uncertainty displays? → [[Decisions and Value of Information/_Index|Decisions and Value of Information]]
> - Bradley-Terry, Elo/TrueSkill, annotation models, IRT, market structure? → [[Rankings, Raters and Latent Traits/_Index|Rankings, Raters and Latent Traits]]
> - Occupancy, N-mixture, capture-recapture, multiple-systems estimation? → [[Counting the Unobserved/_Index|Counting the Unobserved]]
> - Nowcasting, Rt, Fay-Herriot, poll aggregation, mixed-frequency fusion? → [[Nowcasting, Small Areas and Polls/_Index|Nowcasting, Small Areas and Polls]]
> - GAMLSS centiles, compositional and circular data, quantile-regression intervals, extremes and attribution? → [[Distributional and Constrained Outcomes/_Index|Distributional and Constrained Outcomes]]
> - Hawkes/ETAS, LGCPs, Gaussian random fields, BYM2, graph/DAG learning, network models, phylogenetic regression? → [[Point Processes, Spatial Fields and Networks/_Index|Point Processes, Spatial Fields and Networks]]
> - ODE/PDE likelihoods, chaos, neural ODEs, Bayesian neural networks, BART, population PK? → [[Mechanistic and Scientific Models/_Index|Mechanistic and Scientific Models]]
> - Drift diffusion, radiocarbon, Lee-Carter mortality, threshold test, joint longitudinal-survival? → [[Applied Latent Models for Public Questions/_Index|Applied Latent Models for Public Questions]]
^routing-summary

## Clusters

| Cluster | Notes | PyMC examples | Primary sources |
|---|---|---|---|
| [[Causal Sensitivity and Mediation/_Index\|Causal Sensitivity and Mediation]] | 32 | E35, E62, E101-E103, E107 | Cinelli & Hazlett 2020; Imai, Keele & Yamamoto 2010; Franks, D'Amour & Feller 2019; Rosenman et al. 2020 |
| [[Bayesian Nonparametrics and Topic Models/_Index\|Bayesian Nonparametrics and Topic Models]] | 37 | E26, E30, E31, E72, E73, E75 | Teh 2010; Griffiths & Ghahramani 2011; Blei, Ng & Jordan 2003; Arora et al. 2012; De Blasi et al. 2015 |
| [[Advanced MCMC and Latent Discrete Models/_Index\|Advanced MCMC and Latent Discrete Models]] | 29 | E04, E12, E24, E48, E57, E59, E86 | Hoffman, Radul & Sountsov 2021; Hoffman & Sountsov 2022; Betancourt & Girolami 2015; Rabiner 1989 |
| [[Decisions and Value of Information/_Index\|Decisions and Value of Information]] | 37 | E16, E87, E89-E92, E100 | Heath et al. 2015; Vickers et al. 2019; Krause, Singh & Guestrin 2008; Kay et al. 2016; Hullman et al. 2015 |
| [[Rankings, Raters and Latent Traits/_Index\|Rankings, Raters and Latent Traits]] | 35 | E67-E69, E84, E85, E116 | Caron & Doucet 2012; Weng & Lin 2011; Paun et al. 2018; Bürkner 2021; Elrod & Keane 1995 |
| [[Counting the Unobserved/_Index\|Counting the Unobserved]] | 24 | E28, E30, E69, E109 | MacKenzie et al. 2002; Barker et al. 2018; Silverman 2020; Aleshin-Guendel et al. 2020 |
| [[Nowcasting, Small Areas and Polls/_Index\|Nowcasting, Small Areas and Polls]] | 27 | E38, E40, E90, E94-E99, E112 | McGough et al. 2020; Gostic et al. 2020; Molina & Marhuenda 2015; Linzer 2013; Bańbura et al. 2013 |
| [[Distributional and Constrained Outcomes/_Index\|Distributional and Constrained Outcomes]] | 39 | E37, E41, E70, E81, E83, E108, E113 | Stasinopoulos & Rigby 2007; Greenacre 2023; Tsagris & Stewart 2018; Pewsey & García-Portugués 2021; Ji et al. 2024; Philip et al. 2020 |
| [[Point Processes, Spatial Fields and Networks/_Index\|Point Processes, Spatial Fields and Networks]] | 43 | E07, E18-E21, E23, E65, E79, E86, E89 | Reinhart 2018; Simpson et al. 2016; Riebler et al. 2016; Hoff et al. 2002; Friedman & Koller 2000; Li et al. 2019 |
| [[Mechanistic and Scientific Models/_Index\|Mechanistic and Scientific Models]] | 33 | E08-E11, E15, E29, E46-E55, E60, E61, E64, E114, E115 | Chipman et al. 2010; Chen et al. 2018; Izmailov et al. 2021; Margossian et al. 2022 |
| [[Applied Latent Models for Public Questions/_Index\|Applied Latent Models for Public Questions]] | 31 | E25, E36, E39, E71, E110, E111, E117 | Wiecki et al. 2013; Bronk Ramsey 2009; Simoiu et al. 2017; Girosi & King 2007; Rizopoulos 2016 |

## Coverage of the PyMC examples

- **Already covered elsewhere in the vault** (not re-ingested): hierarchical models, the Bayesian workflow, GLMs, survival, HSGP, missing data, MRP/poststratification, state-space/Kalman, BSTS/CausalImpact, horseshoe priors, ICAR/BYM, copulas and covariance priors, VI, simulation-based inference, quasi-experiments, propensity scores, causal discovery (NOTEARS/PC/GES), MMM and geo experiments, discrete choice/BLP, meta-analysis, publication bias, bandits/Bayesian optimisation, sequential testing, quantile regression, transportability, CLV.
- **Deliberately skipped** (domain science or tooling, not statistical method): colour science E74-E77, xarray/ArviZ posterior wrangling E42-E44, the dSTORM neural localiser E88.
- **Covered only by concept notes** (no legally downloadable primary source): several topics are flagged in each cluster index. Follow-on primary sources are listed as gaps in [[Dream/_Index|Dream]].

## Sources

All primary-source PDFs are in this folder's `raw/` directory.

## See Also

- [[Bayesian Statistics/_Index|Bayesian Statistics]] — core inference, computation and workflow notes these clusters build on
- [[Evidence Synthesis, Generalization and Privacy/_Index|Evidence Synthesis, Generalization and Privacy]] — meta-analysis and transportability, also used by several examples
