---
title: "Index: Point Processes, Spatial Fields and Networks"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 37
---

# Point Processes, Spatial Fields and Networks

> [!abstract] Routing Summary
> This cluster covers dependence in space, time and graphs: self-exciting (Hawkes/ETAS) and log-Gaussian Cox processes, Gaussian random fields and kriging, BYM2 areal models, Bayesian graph and DAG learning (graphical horseshoe, order MCMC, BGe), latent-space and block network models, phylogenetic regression. It has 9 sub-folders and 37 notes, written to cover the methods used in the PyMC worked examples E07, E18-E21, E23, E65, E79, E86, E89 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Friedman 2000: [[Friedman 2000 - Being Bayesian about Network Structure - Overview]]
> - Hoff 2002: [[Hoff 2002 - Latent Space Models Overview]]
> - Li 2019: [[Li 2019 - Graphical Horseshoe Estimator - Overview]]
> - Reinhart 2018: [[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]]
> - Riebler 2016: [[Riebler 2016 - BYM2 Intuitive Spatial Model - Overview]]
> - Simpson 2016: [[Simpson 2016 - Going Off Grid - Overview]]
^routing-summary

## Sub-topics

- [[Friedman 2000 - Being Bayesian about Network Structure/_Index|Friedman 2000 - Being Bayesian about Network Structure]] (5 notes) — COVERS: Friedman and Koller (UAI 2000; the journal version is *Machine Learning* 2003) compute the Bayesian posterior probability of structural features of a Bayesian network (edges, Markov blankets) by (i) a closed-form sum over *all* DAGs with at most $k$ parents consistent with a fixed node ordering, and (ii) MCMC over orderings rather than over structures. Ordering space is much smaller and smoother,…
- [[Hoff 2002 - Latent Space Approaches to Social Network Analysis/_Index|Hoff 2002 - Latent Space Approaches to Social Network Analysis]] (5 notes) — COVERS: Hoff, Raftery and Handcock (JASA 2002) model a network $Y$ by giving each actor a latent position $z_i$ in a low-dimensional Euclidean "social space" and letting tie probability depend on distance, conditionally independent given positions: $\text{logit}\,P(y_{ij}=1)=\alpha+\beta^\top x_{ij}-|z_i-z_j|$. The latent geometry automatically yields reciprocity and transitivity, supports MLE or MCMC…
- [[Li 2019 - Graphical Horseshoe Estimator/_Index|Li 2019 - Graphical Horseshoe Estimator]] (4 notes) — COVERS: Li, Craig and Bhadra (2019) place horseshoe priors on the off-diagonal entries of a Gaussian precision matrix $\Omega$ (diagonal flat, $\Omega$ positive definite) and give a full block Gibbs sampler. Theory: a smaller Kullback-Leibler risk upper bound than priors with bounded density at zero when $\Omega_0$ is sparse (Thm 3.2), and a posterior mean within $O(1/|\hat\omega|)$ of least squares for…
- Network Outcome Models Concept Notes (1 notes) — COVERS: Concept notes (no raw source): [[Network Outcome Models - Stochastic Block Models and Network Checks]]
- [[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes/_Index|Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes]] (7 notes) — COVERS: Reinhart (2018, *Statistical Science*) reviews self-exciting spatio-temporal point processes (Hawkes processes and ETAS-type models): event rates that depend on the history of earlier events, so that events *trigger* further events. The paper unifies estimation (maximum likelihood, EM with branching structure), stochastic declustering, simulation, inference, Bayesian methods and diagnostics, and…
- [[Riebler 2016 - BYM2 Intuitive Spatial Model/_Index|Riebler 2016 - BYM2 Intuitive Spatial Model]] (5 notes) — COVERS: Riebler, Sorbye, Simpson and Rue (2016, *Statistical Methods in Medical Research*; arXiv:1601.01180) explain and test the **BYM2** parameterisation of the Besag-York-Mollie disease-mapping model: $b=\tau_b^{-1/2}(\sqrt{1-\phi}\,v+\sqrt\phi\,u^\star)$ with a **scaled** structured component $u^\star$. Then $\tau_b$ is a marginal precision independent of the graph, $\phi$ is the share of variance…
- [[Simpson 2016 - Going Off Grid LGCP Inference/_Index|Simpson 2016 - Going Off Grid LGCP Inference]] (6 notes) — COVERS: Simpson, Illian, Lindgren, Sorbye and Rue (Biometrika 2016) show how to fit log-Gaussian Cox processes (LGCPs) without binning points to a fine lattice: represent the latent field with a finite basis $Z(s)=\sum_iz_i\phi_i(s)$ (SPDE/Matern on a triangulation), approximate only the intensity integral by a quadrature rule, and obtain an exact-in-the-points Poisson-form likelihood. A lattice of…
- Spatial Fields Concept Notes (1 notes) — COVERS: Concept notes (no raw source): [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]
- Structure Learning and Phylogenetics Concept Notes (3 notes) — COVERS: Concept notes (no raw source): [[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]], [[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]], [[Phylogenetic Regression - Brownian Motion, OU and Pagel Lambda]]

## Motivating PyMC examples

E07, E18-E21, E23, E65, E79, E86, E89 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Friedman 2000 - Being Bayesian about Network Structure.pdf]]
- [[raw/Hoff 2002 - Latent Space Approaches to Social Network Analysis.pdf]]
- [[raw/Li 2019 - The Graphical Horseshoe Estimator.pdf]]
- [[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]
- [[raw/Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping.pdf]]
- [[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
