---
title: "Weng and Lin 2011 - Halo 2 Experiments and Results"
tags:
  - source/ingested
  - topic/latent-traits
  - type/example
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Sec. 6-7, pp. 290-293 (Tables 2-5)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]"
  - "[[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]]"
used_by:
  - "[[Weng and Lin 2011 - Bayesian Online Ranking Overview]]"
aliases:
  - Weng-Lin Halo 2 prediction error
  - online ranking experiments TrueSkill comparison
---

# Weng and Lin 2011 - Halo 2 Experiments and Results

> [!summary]
> On the Halo 2 beta data (Bungie/Microsoft Research) used by TrueSkill, BT-full and PL match TrueSkill's pairwise prediction error (e.g. 30.59% vs 30.82% free-for-all) while TM-full is worse; damping variance reduction ($\gamma_q=1/k$) rescues TM-full. Weng-Lin is about 10x faster than TrueSkill.

## Overview

**Data.** Halo 2 beta test, four game types (Table 2). **Setup (follows Herbrich et al. 2007):** $\mu_i=25$, $\sigma_i^2=(25/3)^2$, $\beta^2=(25/6)^2$, draw margin $\varepsilon=0.1$ (TM), $\kappa=10^{-4}$, $\gamma_q=\sigma_i/c_{iq}$ (BT-full, BT-partial, TM-full) and $\gamma_q=\sigma_i/c$ (PL). **Metric.** Before each game, predict the order of every pair of teams with different ranks by the current $\mu$ (ties in $\mu$ count as wrong); error = fraction of mispredicted team pairs from the second game on.

## Main Content

> [!example] Table 2 - data and prediction errors
> | Game type | # games | # players | BT-full | BT-partial | PL | TM-full | TrueSkill |
> |---|---|---|---|---|---|---|---|
> | Free for All | 5,943 | 60,022 | 30.59% | 32.40% | 31.74% | 44.65% | 30.82% |
> | Small Teams | 27,539 | 4,992 | 33.97% | 33.97% | 33.97% | 36.46% | 35.23% |
> | Head to Head | 6,227 | 1,672 | 32.53% | 32.53% | 32.53% | 32.41% | 32.44% |
> | Large Teams | 1,199 | 2,576 | 37.30% | 37.30% | 37.30% | 39.37% | 38.15% |
> ^tab-halo-errors

Free for All: up to 8 single-player teams; Small Teams: up to 12 players in 2 teams; Head to Head: 2 players; Large Teams: up to 16 players in 2 teams. TrueSkill column copied from Herbrich et al. (2007).

**Reading.** (1) With two teams, BT-full = BT-partial = PL (Small/Large/Head-to-Head identical). (2) For multi-team games BT-full beats BT-partial (more pairs = more information). (3) BT beats TM; TM-full is far worse on Free for All (44.65%) and has numerical issues. (4) TM-full shares TrueSkill's likelihood yet does worse, so the one-pass approximation costs accuracy when the likelihood is Gaussian. (5) BT-full and PL are competitive with TrueSkill (better on 3 of 4 game types; head-to-head TM-full 32.41 vs TrueSkill 32.44 is a tie in practice).

> [!example] Table 3 - damped variance reduction, $\gamma_q=1/k$
> | Game type | BT-full | PL | TM-full |
> |---|---|---|---|
> | Free for All | 31.24% | 31.73% | 33.13% |
> | Small Teams | 33.84% | 33.84% | 36.50% |
> | Head to Head | 32.55% | 32.55% | 32.74% |
> | Large Teams | 37.30% | 37.30% | 39.13% |
> **Interpretation.** For TM-full on Free for All, error falls from 44.65% to 33.13%: $\sigma_i$ was collapsing to zero too fast and $\mu_i$ drifting to huge values. BT-full and PL barely change.

> [!example] Table 4 - difficult pairs (rank difference at most 2), Free for All
> | BT-full | BT-partial | PL | TM-full | TrueSkill |
> |---|---|---|---|---|
> | 35.44% | 36.70% | 36.31% | 46.11% | 35.58% |
> ^tab-halo-hard

> [!example] Table 5 - few past games per player
> | Avg. past appearances at most | (a) FFA pairs | BT-full | TrueSkill | (b) H2H pairs | BT-full | TrueSkill |
> |---|---|---|---|---|---|---|
> | 5 | 23,567 | 38.74% | 39.15% | 2,367 | 38.70% | 38.36% |
> | 10 | 69,145 | 36.22% | 36.41% | 3,748 | 35.17% | 34.61% |
> | 20 | 148,654 | 34.54% | 34.52% | 4,852 | 33.29% | 33.02% |
> | 40 | 276,203 | 32.64% | 32.64% | 5,501 | 32.61% | 32.61% |
> | no restriction | 595,500 | 30.59% | 30.74% | 5,715 | 32.53% | 32.49% |
> The rerun TrueSkill code gives 30.74% and 32.49%, slightly different from the 30.82%/32.44% copied in Table 2. Predictions are harder with few past games.

**Run time.** F# on one machine: TrueSkill 13 s on Free for All; BT-full 1.2 s. Code: under 100 lines vs over 500.

**Glicko single-game.** 33.88% on Head-to-Head (vs 32.53% BT-full).

**Recommendations (Sec. 6.2).** TM is not recommended (numerical safeguards, worse accuracy). Use BT-full or PL.

### 7 Discussion

Huang & Frey (2008) cumulative-distribution-network reports better accuracy but uses a full covariance over all players (impractical at scale). Guiver & Snelson (2009) apply power EP to PL (offline, NASCAR 2002 and MovieLens); the online setting is left for future work. The approximation is a heuristic.

## Examples

> [!example] Reading the "few games" table for a cold-start problem
> **Setup.** New creatives with at most 5 prior comparisons. 
> **Interpretation.** Error of about 38.7% (barely above a coin flip with ~50% baseline) - cold-start ratings are noisy, so use uncertainty ($\sigma$) in allocation rather than only $\mu$.

## Connections

Offline Bayesian fits (Caron & Doucet) vs these online filters: [[Caron 2012 - Experiments NASCAR and Chess]].

## See Also

[[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]]
