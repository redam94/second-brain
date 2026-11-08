---
title: "Weng and Lin 2011 - Bayesian Online Ranking Overview"
tags:
  - source/ingested
  - topic/latent-traits
  - type/overview
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Full paper, JMLR 12:267-300 (PDF pp. 1-34)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[The Kalman Filter]]"
  - "[[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]"
used_by:
  - "[[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]]"
  - "[[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]]"
aliases:
  - Weng-Lin online ranking
  - Bayesian approximation method for online ranking
---

# Weng and Lin 2011 - Bayesian Online Ranking Overview

> [!summary]
> Weng & Lin derive closed-form, one-pass Bayesian skill updates (a Gaussian belief per player) for multi-team, multi-player games under Bradley-Terry, Thurstone-Mosteller and Plackett-Luce likelihoods, using Woodroofe's Stein-type identity. The Bradley-Terry and Plackett-Luce versions match TrueSkill's prediction accuracy on Halo 2 data, run about 10x faster on the free-for-all data (1.2 s vs 13 s) and need under 100 lines of F# (TrueSkill: over 500). They bridge Elo, Glicko and TrueSkill.

## Overview

**Citation.** Weng, R. C. and Lin, C.-J. (2011), *A Bayesian approximation method for online ranking*, Journal of Machine Learning Research 12: 267-300 (open access).

**Problem.** Online systems must rate many players after each game. Elo and Glicko (Glickman 1999) handle two-player games; TrueSkill (Herbrich et al. 2007) handles multi-team games with factor graphs and expectation propagation but has no closed-form update there.

**Idea.** Give each player a Gaussian belief $\theta_{ij}\sim N(\mu_{ij},\sigma_{ij}^2)$; approximate the posterior mean and variance by evaluating Stein-identity expectations at the prior mean:
$$\mu_i\leftarrow\mu_i+\Omega_i,\qquad\sigma_i^2\leftarrow\sigma_i^2\max(1-\Delta_i,\kappa).$$
Under Bradley-Terry, $\Omega_i=\sum_{q\ne i}\frac{\sigma_i^2}{c_{iq}}(s_{iq}-\hat p_{iq})$ is an **Elo update whose step size $\sigma_i^2/c_{iq}$ is player-specific and shrinks as uncertainty falls**.

## Motivating PyMC examples

See <https://redam94.github.io/pymc-challenges/examples.html>: **E67** (Ranking from head-to-head results: Bradley-Terry, dynamic skill ratings and Plackett-Luce) compares Gaussian random-walk skills with Elo.

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note |
| 2.1 Modeling ranked data (TM, BT, Elo, PL), Fig. 1 | [[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]] |
| 2.2 Approximation techniques, Lemma 1, Corollary 2 | [[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]] |
| 3.1-3.4 Method, error analysis, factorization, individual skill update | [[Weng and Lin 2011 - Update Rules Derivation and Error Correction]] |
| 3.5 BT full-pair (Algorithm 1), 4.1 BT partial-pair (Algorithm 2) | [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]] |
| 4.2 Thurstone-Mosteller (Algorithm 3), 4.3 Plackett-Luce (Algorithm 4) | [[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]] |
| 5 Glicko (Algorithm 5) | [[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]] |
| 6 Experiments, Tables 2-5 | [[Weng and Lin 2011 - Halo 2 Experiments and Results]] |
| 7 Discussion; Appendices A-F | [[Weng and Lin 2011 - Update Rules Derivation and Error Correction]] (A-C), [[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]] (D-F), [[Weng and Lin 2011 - Halo 2 Experiments and Results]] (7) |

## Main Content

| Method | Likelihood | Update | Multi-team |
|---|---|---|---|
| Elo | logistic or Gaussian | $\theta\leftarrow\theta+K(s-p)$, fixed $K$ | no |
| Glicko | Bradley-Terry | closed form per rating period | no |
| TrueSkill | Thurstone-Mosteller + draws | EP message passing | yes, iterative |
| Weng-Lin | BT / TM / PL | closed form per game | yes |

## Examples

Numerical two-player update: [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]].

## Relevance to marketing measurement

A dynamic rating is a state-space filter for the latent "strength" of competing options (creatives, offers, vendors, model responses) when only win/loss/ranking feedback is available. The variance $\sigma_i^2$ is an uncertainty signal for adaptive allocation. It resembles a Kalman observation update ([[The Kalman Filter]], [[Linear-Gaussian State-Space Models]]) but the paper has no dynamics step: for drifting skill add variance inflation $\sigma^2\leftarrow\sigma^2+\tau^2$ between games (as Glicko and TrueSkill do; this is an extension, not in the paper).

## Connections

- Batch counterpart with Gibbs: [[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]].
- Concept note: [[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]].

## See Also

[[Reward Modeling from Human Preferences]] · [[Discrete Choice Models]]
