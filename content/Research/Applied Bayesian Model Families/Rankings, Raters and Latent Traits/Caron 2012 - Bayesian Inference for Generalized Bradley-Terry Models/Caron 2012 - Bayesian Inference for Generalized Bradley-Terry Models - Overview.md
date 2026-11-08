---
title: "Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview"
tags:
  - source/ingested
  - topic/latent-traits
  - type/overview
  - doc/paper
source: "[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]"
source_location: "Full paper, pp. 1-21 (INRIA RR-7445 / arXiv:1011.1761v1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[MCMC Basics]]"
used_by:
  - "[[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]"
  - "[[Caron 2012 - Home Advantage, Ties and Team Comparisons]]"
  - "[[Caron 2012 - Plackett-Luce Model for Full Rankings]]"
aliases:
  - Caron and Doucet Generalized Bradley-Terry
---

# Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview

> [!summary]
> Caron & Doucet show that Hunter's (2004) MM algorithms for Bradley-Terry (BT), home advantage, ties, team comparisons and Plackett-Luce (PL) are all EM algorithms for a *latent exponential-race* augmentation, and that the same augmentation gives conjugate **Gamma Gibbs samplers** with no Metropolis tuning. Gibbs mixes far better than a tailored Metropolis-Hastings sampler on small samples, and Bayesian shrinkage fixes the "undefeated/winless player" non-existence of the MLE.

## Overview

**Citation.** Caron, F. and Doucet, A. (2012), *Efficient Bayesian inference for generalized Bradley-Terry models*, Journal of Computational and Graphical Statistics 21(1): 174-196. The PDF in the vault is the INRIA research report version RR-7445 (Nov 2010), 21 pages, arXiv:1011.1761. (The published version is the authority for page numbers; section numbering below follows the report.)

**Research question.** Hunter (2004) gave fast maximum-likelihood MM algorithms for BT-type models, but Bayesian inference relied on hand-tuned Metropolis-Hastings proposals. Can a latent-variable view yield (i) EM interpretations of MM and (ii) simple posterior samplers?

**Contributions.**
1. MM algorithms of Hunter (2004) = EM algorithms for a Gamma/exponential latent variable augmentation.
2. New EM algorithms for group comparisons and random graphs (degree-sequence model).
3. First Gibbs samplers for the whole family (basic BT, home advantage, ties, groups, PL, features, classification).

**Key results.** With a conjugate $\text{Gamma}(a,b)$ prior on skills, the EM update is $\lambda_i=(a-1+w_i)/(b+\sum_j n_{ij}/(\lambda_i+\lambda_j))$ and the Gibbs conditional is $\lambda_i\mid z\sim\text{Gamma}(a+w_i,\;b+\sum_j z_{ij})$. On simulated PL data the Gibbs lag-1 autocorrelation stays lower than the M-H of Gormley & Murphy (2009) at small $n$; on NASCAR 2002 the Bayesian model predicts held-out races and handles drivers who always finished last; on 65,053 chess games the full Bayesian predictive beats MAP on test MSE.

## Motivating PyMC examples

See <https://redam94.github.io/pymc-challenges/examples.html>:
- **E67** - Ranking from head-to-head results: Bradley-Terry, dynamic skill ratings and Plackett-Luce (ATP tennis, Formula 1). The PyMC version uses a logistic (log-skill) parameterisation with sum-to-zero identification instead of the Gamma/Gibbs scheme here; the two are equivalent models for $\lambda_i=e^{\beta_i}$.

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, 1 Introduction (BT, extensions, MM vs EM, contributions) | 1-4 | this note; [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]] |
| 2 Bradley-Terry model (Thurstonian vs exponential latent variables, EM, data augmentation) | 4-6 | [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]] |
| 3.1 Home advantage | 6-7 | [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] |
| 3.2 Ties (Rao-Kupper) | 7-9 | [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] |
| 3.3 Group comparisons | 9-10 | [[Caron 2012 - Home Advantage, Ties and Team Comparisons]] |
| 4 Multiple comparisons (Plackett-Luce) | 10-11 | [[Caron 2012 - Plackett-Luce Model for Full Rankings]] |
| 5.1 Identifiability (Dirichlet-Gamma, rescaling step, alternative EM) | 11-13 | [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]] |
| 5.2 Hyperparameter estimation | 13 | [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]] |
| 5.3 Further extensions (random graphs, Tversky/Restle choice, classification) | 13-15 | [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]] |
| 6.1 Synthetic data (Fig. 1) | 15-16 | [[Caron 2012 - Experiments NASCAR and Chess]] |
| 6.2 NASCAR 2002 (Figs. 2-3, Table 1) | 16-18 | [[Caron 2012 - Experiments NASCAR and Chess]] |
| 6.3 Chess data (Figs. 4-5) | 18-20 | [[Caron 2012 - Experiments NASCAR and Chess]] |
| 7 Conclusion, references | 19-21 | this note |

## Main Content

The common idea: each comparison is an **exponential race**. Element $i$ has "arrival rate" $\lambda_i$; the first to arrive wins. Marginalising the race times recovers the BT/PL probabilities, but conditioning on *aggregated* waiting times gives conjugate Gamma updates. The family covered:

| Model | Win probability | Latent variable |
|---|---|---|
| BT | $\lambda_i/(\lambda_i+\lambda_j)$ | $Z_{ij}\sim\text{Gamma}(n_{ij},\lambda_i+\lambda_j)$ |
| Home advantage | $\theta\lambda_i/(\theta\lambda_i+\lambda_j)$ | $Z_{ij}\sim\text{Gamma}(n_{ij},\theta\lambda_i+\lambda_j)$ |
| Ties (Rao-Kupper) | $\lambda_i/(\lambda_i+\theta\lambda_j)$ | $Z_{ij}\sim\text{Gamma}(s_{ij},\lambda_i+\theta\lambda_j)$ |
| Teams | $\sum_{T^+}\lambda/\sum_T\lambda$ | $Z_i\sim\text{Exp}(\sum_{T}\lambda)$, winner id $C_i$ |
| Plackett-Luce | $\prod_j\lambda_{\rho_j}/\sum_{k\ge j}\lambda_{\rho_k}$ | $Z_{ij}\sim\text{Exp}(\sum_{k\ge j}\lambda_{\rho_k})$ |

## Examples

Headline numerical results are reproduced in [[Caron 2012 - Experiments NASCAR and Chess]].

## Relevance to marketing measurement

Paired and ranked comparisons arise in creative A/B/n pairwise preference tests, conjoint-like "which do you prefer" surveys, brand-preference rankings and LLM/human preference evaluation (see [[Reward Modeling from Human Preferences]]). PL is the ranked-choice generalisation of the multinomial logit in [[Discrete Choice Models]]; the Gamma-Gibbs scheme is a cheap sampler when full HMC is unnecessary.

## Connections

- BT is a logit on skill differences: $\log\lambda_i-\log\lambda_j$; PL is "exploded logit" (see [[Discrete Choice Models]]).
- Dynamic skills: [[Weng and Lin 2011 - Bayesian Online Ranking Overview]].
- Hierarchical priors on skills: [[Hierarchical Models]].

## See Also

[[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]] · [[Caron 2012 - Experiments NASCAR and Chess]]
