---
title: "Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/concept-note
source: "concept note, no raw source (cites Elo 1978; Glickman 1999; Herbrich et al. 2007; Weng and Lin 2011)"
source_location: "Synthesis; see Weng and Lin 2011 notes for the derivations"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Concept Notes"
doc_type: concept
depends_on:
  - "[[Weng and Lin 2011 - Bayesian Online Ranking Overview]]"
  - "[[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]]"
used_by:
  - "[[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]]"
aliases:
  - Elo as approximate filtering
  - random walk skill ratings
  - Gaussian random walk Bradley-Terry
---

# Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)

> [!summary]
> Elo, Glicko and TrueSkill are approximate Bayesian filters for a latent-skill state-space model: skills drift as a random walk and each game is a noisy logistic or probit observation. Elo is the fixed-gain version, Glicko and TrueSkill track an uncertainty (variance) that sets a time-varying gain. A batch Gaussian-random-walk Bradley-Terry fit (as in the PyMC example E67) is the smoother for the same model. Concept note, no raw source: mechanics are derived from the ingested papers and checked in code.

## Overview

**State-space model.** Skill $\theta_{i,t}=\theta_{i,t-1}+\eta_{i,t}$, $\eta_{i,t}\sim N(0,\tau^2)$ (random-walk drift); game $g$ between $i$ and $j$ at time $t$: $y_g\sim\text{Bernoulli}\bigl(\sigma(\theta_{i,t}-\theta_{j,t})\bigr)$ (Bradley-Terry; probit gives Thurstone-Mosteller). See [[Linear-Gaussian State-Space Models]] for the linear-Gaussian analogue and [[The Kalman Filter]]. The observation here is non-Gaussian, so exact filtering is intractable and approximations (Elo, Glicko, TrueSkill/EP, the Weng-Lin Stein approximation) or smoothing by MCMC are used.

## Main Content

> [!definition] Elo as a fixed-gain stochastic-gradient filter
> $\theta_i\leftarrow\theta_i+K(s-p_{ij})$, $p_{ij}=\sigma(\theta_i-\theta_j)$. $K(s-p)$ is a scaled gradient of the Bernoulli log-likelihood $\ell=s\log p+(1-s)\log(1-p)$, because $\partial\ell/\partial\theta_i=s-p$. It ignores uncertainty; $K$ plays the role of the Kalman gain at steady state.
> ^def-elo-filter

> [!definition] Variance-tracking filters (Glicko, TrueSkill, Weng-Lin)
> Maintain $(\mu_i,\sigma_i^2)$. After a game: $\mu_i\leftarrow\mu_i+\dfrac{\sigma_i^2}{c_{ij}}(s-\hat p_{ij})$ and $\sigma_i^2\leftarrow\sigma_i^2(1-\Delta)$ with $\Delta\propto\sigma_i^2\hat p(1-\hat p)/c_{ij}^2$ (Weng-Lin Algorithm 1). Between rating periods or games, **add drift variance** $\sigma_i^2\leftarrow\sigma_i^2+\tau^2$, which is what keeps ratings responsive (Glicko's rating-deviation inflation; TrueSkill's dynamics factor). That drift step is the missing piece in the one-game updates of the paper, which are pure observation updates.
> ^def-variance-filter

| Method | Likelihood | Belief | Gain | Source |
|---|---|---|---|---|
| Elo | logistic/Gaussian | point | fixed $K$ | Elo (1978) |
| Glicko | logistic | $N(\mu,\sigma^2)$ per period | variance-based | Glickman (1999) |
| TrueSkill | probit + draws | Gaussian, EP messages | variance-based | Herbrich et al. (2007) |
| Weng-Lin | BT / TM / PL | Gaussian, Stein approximation | variance-based | Weng & Lin (2011) |
| Batch random-walk BT | logistic | full posterior (MCMC) | smoother | E67-style PyMC model |

> [!theorem] Fixed gain approximates steady-state filter gain
> For a random-walk skill with process variance $q$ and Bernoulli-logit observations, the extended-Kalman gain $G_t=P_t h_t/S_t$ (with $h=p(1-p)$) converges to a constant when $q$ and the information per game balance; a fixed Elo step $K$ matches it for a chosen $K$. Too large $K$ over-reacts to noise, too small lags drift.
> ^thm-steady-gain

## Examples

> [!example] Elo vs an extended-Kalman filter on a simulated random-walk matchup
> **Setup.** Two players, $\theta_{i,t}$ random walks with $\tau=0.03$ per game, 3,000 games, Bernoulli-logit outcomes; estimate the skill difference $d_t$.
> **Solution.** Elo with $K=0.15$ gives mean squared error $0.115$ for $d_t$ (after 500 burn-in games); an extended Kalman filter with process variance $2\tau^2$ gives $0.098$, with its steady-state gain around $0.105$ (seed 3).
> **Interpretation.** A well-tuned fixed gain is close to the optimal filter; the variance-tracking filter wins mainly on new players or after gaps, where its gain is larger.
> ^ex-elo-vs-ekf

```python
import numpy as np
rng = np.random.default_rng(3)
T, tau = 3000, 0.03
theta = np.cumsum(rng.normal(0, tau, (T, 2)), 0)
sig = lambda x: 1/(1+np.exp(-x))
d = theta[:, 0] - theta[:, 1]; y = rng.random(T) < sig(d)
K, e = 0.15, 0.0; m, P, q = 0.0, 1.0, 2*tau**2
errE, errK = [], []
for t in range(T):
    errE.append((e-d[t])**2); errK.append((m-d[t])**2)
    e += K*(y[t]-sig(e))                          # Elo
    P += q; p = sig(m); h = p*(1-p)               # EKF predict
    S = h*P*h + p*(1-p); G = P*h/S
    m += G*(y[t]-p); P = (1-G*h)*P                # EKF update
print(np.mean(errE[500:]), np.mean(errK[500:]))
```

PyMC-style batch smoother (untested): `skill = pm.GaussianRandomWalk("skill", sigma=tau, shape=(T, K))` for $K$ players over $T$ periods; likelihood `pm.Bernoulli("y", logit_p=skill[t_idx, i_idx]-skill[t_idx, j_idx], observed=y)`; compare held-out log-score and Brier score against the online filters (E67).

## Connections

- Derivations: [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]], [[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]].
- Static/batch Bayesian estimation with ties and home advantage: [[Caron 2012 - Home Advantage, Ties and Team Comparisons]].
- Marketing use: online ranking of creatives or offers from head-to-head feedback ([[Reward Modeling from Human Preferences]] for the preference-model analogue).

## See Also

[[Caron 2012 - Plackett-Luce Model for Full Rankings]] · [[Hierarchical Models]]
