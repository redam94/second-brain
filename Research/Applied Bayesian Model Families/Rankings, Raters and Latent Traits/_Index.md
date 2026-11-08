---
title: "Index: Rankings, Raters and Latent Traits"
tags:
  - type/index
  - source/ingested
  - topic/latent-traits
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 35
---

# Rankings, Raters and Latent Traits

> [!abstract] Routing Summary
> This cluster covers latent-ability and latent-truth models: Bradley-Terry and Plackett-Luce, online rating systems (Elo, Glicko, TrueSkill), annotation and diagnostic-test latent class models (Dawid-Skene, Hui-Walter), item response theory, and market structure from choice panels. It has 6 sub-folders and 35 notes, written to cover the methods used in the PyMC worked examples E67, E68, E69, E84, E85, E116 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Burkner 2021: [[Bürkner 2021 - Bayesian IRT with brms Overview]]
> - Caron 2012: [[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]]
> - Elrod and Keane 1995: [[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview]]
> - Paun 2018: [[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]
> - Weng and Lin 2011: [[Weng and Lin 2011 - Bayesian Online Ranking Overview]]
^routing-summary

## Sub-topics

- [[Burkner 2021 - Bayesian IRT with brms and Stan/_Index|Burkner 2021 - Bayesian IRT with brms and Stan]] (8 notes) — COVERS: Bürkner shows that a wide range of item response theory (IRT) models are multilevel (distributional, optionally non-linear) regressions: 1PL/Rasch, 2PL, 3PL, graded response, partial credit, count, response-time and drift-diffusion models, with covariates, differential item functioning (DIF), hierarchical priors and LOO/Bayes-factor comparison, all fitted by Stan HMC through the brms formula…
- [[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models/_Index|Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models]] (6 notes) — COVERS: Caron & Doucet show that Hunter's (2004) MM algorithms for Bradley-Terry (BT), home advantage, ties, team comparisons and Plackett-Luce (PL) are all EM algorithms for a *latent exponential-race* augmentation, and that the same augmentation gives conjugate **Gamma Gibbs samplers** with no Metropolis tuning. Gibbs mixes far better than a tailored Metropolis-Hastings sampler on small samples, and…
- [[Concept Notes/_Index|Concept Notes]] (4 notes) — COVERS: Concept notes: [[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]], [[Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)]], [[Item Response Theory Norms and You Are Here Placement (Concept Note)]], [[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]]
- [[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure/_Index|Elrod and Keane 1995 - Factor-Analytic Probit Market Structure]] (5 notes) — COVERS: Elrod & Keane propose a multinomial probit with a factor-analytic covariance (common factors for market structure plus equal unique variance) estimated from household panel data by simulated moments. On a laundry-detergent data set it beats the structureless Dirichlet-multinomial and equisimilar probit, Choice Map, SCULPTRE and Chintagunta's latent-class map on predictive log-likelihood and face…
- [[Paun 2018 - Comparing Bayesian Models of Annotation/_Index|Paun 2018 - Comparing Bayesian Models of Annotation]] (5 notes) — COVERS: Paun et al. compare six Bayesian annotation models (pooled MULTINOM, unpooled Dawid-Skene and MACE, partially pooled HIERD&S, ITEMDIFF, LOGRNDEFF) against majority vote on four crowdsourced datasets, along four axes: agreement with gold labels, predictive density, annotator characterization and item difficulty. Models with annotator structure win; unpooled models can overfit predictively; partial…
- [[Weng and Lin 2011 - Bayesian Approximation for Online Ranking/_Index|Weng and Lin 2011 - Bayesian Approximation for Online Ranking]] (7 notes) — COVERS: Weng & Lin derive closed-form, one-pass Bayesian skill updates (a Gaussian belief per player) for multi-team, multi-player games under Bradley-Terry, Thurstone-Mosteller and Plackett-Luce likelihoods, using Woodroofe's Stein-type identity. The Bradley-Terry and Plackett-Luce versions match TrueSkill's prediction accuracy on Halo 2 data, run about 10x faster on the free-for-all data (1.2 s vs 13…

## Motivating PyMC examples

E67, E68, E69, E84, E85, E116 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]
- [[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]
- [[raw/Elrod and Keane 1995 - A Factor-Analytic Probit Model for Market Structure in Panel Data.pdf]]
- [[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]
- [[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
