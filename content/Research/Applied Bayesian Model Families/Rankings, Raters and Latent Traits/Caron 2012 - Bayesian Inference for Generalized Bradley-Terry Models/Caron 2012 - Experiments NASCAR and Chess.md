---
title: "Caron 2012 - Experiments NASCAR and Chess"
tags:
  - source/ingested
  - topic/latent-traits
  - type/example
  - doc/paper
source: "[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]"
source_location: "Sec. 6-7, pp. 15-21 (Figs. 1-5, Table 1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
doc_type: paper
depends_on:
  - "[[Caron 2012 - Plackett-Luce Model for Full Rankings]]"
  - "[[Caron 2012 - Home Advantage, Ties and Team Comparisons]]"
used_by:
  - "[[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]]"
aliases:
  - NASCAR 2002 Plackett-Luce
  - Bradley-Terry chess experiment
---

# Caron 2012 - Experiments NASCAR and Chess

> [!summary]
> Three experiments: a synthetic PL study showing the Gibbs sampler mixes better than a tailored Metropolis-Hastings (M-H) sampler on small samples; NASCAR 2002, where Bayesian PL handles drivers who always finished last and predicts future races; and 65,053 chess games where a Bayesian BT-with-ties predictive beats MAP.

## Overview

Prior throughout: $\lambda_k\sim\mathcal G(a,b)$ with $b=Ka-1$ so the MAP sums to one. $b$ only sets the scale.

## Main Content

### 6.1 Synthetic data (Fig. 1)

500 datasets of $n$ rankings of $K=4$ items ($a=5$); 10,000 Gibbs iterations each; sample lag-1 autocorrelation of the four skills averaged over skills and datasets (with 90% bands) plotted against $n\in[1,10^4]$ on a log axis. Compared with a modified Gormley & Murphy (2009) M-H sampler (gamma proposal $\mathcal G(a+w_k,\,b+\sum_{i,j}\delta_{ijk}/\sum_{k'\ge j}\lambda_{\rho_{ik'}}^{(t-1)})$, unnormalised data).

**Finding.** The M-H sampler is acceptable for large $n$ (their voting data) but its autocorrelation approaches 1 at small $n$; Gibbs stays low across sizes. (Read from the figure; no table of numbers is printed.)

### 6.2 NASCAR 2002 (Figs. 2-3, Table 1)

87 drivers in 36 races, 43 per race. Hunter (2004) noted the MLE does not exist for the raw data, since four drivers placed last in every race entered and had to be removed. The Bayesian model keeps them.

**Protocol.** Predict race $r+1$ using MAP from races $1..r$, starting from $r=5$ (races 6-36); score by test log-likelihood. Fig. 2 plots mean and 90% interval vs prior shape $a\in[1,10^3]$ (log axis): test log-likelihood on an axis from about $-110$ to $-125$, with a horizontal line marking the uniform-prior ($a=1,b=0$) result. (The text does not state the optimum; read the exact curve from the original figure.) Gibbs: 50,000 iterations, 2,000 burn-in, flat improper prior on $a$ sampled as in Sec. 5.2, identified skills reported on the real line as $\beta_i=\log\pi_i-\log(1/83)$.

**Fig. 3.** Posterior of $\beta_i$ for P. Jones and S. Pruett (1 race each; wide posteriors) vs M. Martin and T. Stewart (36 races; narrow).

> [!example] Table 1 - ML and MMSE skill estimates (selected rows)
> | Driver | Races | Avg place | MLE | MMSE | SD |
> |---|---|---|---|---|---|
> | P. Jones | 1 | 4.00 | 2.74 | 0.11 | 0.48 |
> | S. Pruett | 1 | 6.00 | 2.21 | 0.10 | 0.48 |
> | M. Martin | 36 | 12.17 | 0.67 | 0.79 | 0.17 |
> | T. Stewart | 36 | 12.61 | 0.42 | 0.60 | 0.17 |
> | R. Wallace | 36 | 13.17 | 0.65 | 0.78 | 0.17 |
> | J. Johnson | 36 | 13.50 | 0.53 | 0.68 | 0.17 |
> | S. Marlin | 29 | 13.86 | 0.33 | 0.49 | 0.19 |
> | M. Bliss | 1 | 14.00 | 0.82 | 0.04 | 0.48 |
> | J. Gordon | 36 | 14.06 | 0.33 | 0.53 | 0.17 |
> | K. Busch | 36 | 14.06 | 0.24 | 0.46 | 0.17 |
> | C. Long | 2 | 40.50 | -1.73 | -0.67 | 0.46 |
> | C. Fittipaldi | 1 | 41.00 | -1.85 | -0.51 | 0.50 |
> | H. Fukuyama | 2 | 41.00 | -2.17 | -0.81 | 0.50 |
> | J. Small | 1 | 41.00 | -1.94 | -0.60 | 0.51 |
> | M. Shepherd | 5 | 41.20 | -1.86 | -1.05 | 0.39 |
> | K. Shelmerdine | 2 | 41.50 | -1.73 | -0.72 | 0.46 |
> | A. Cameron | 1 | 42.00 | -1.41 | -0.44 | 0.49 |
> | D. Marcis | 1 | 42.00 | -1.38 | -0.43 | 0.49 |
> | D. Trickle | 3 | 42.00 | -1.72 | -0.87 | 0.42 |
> | J. Varde | 1 | 42.00 | -1.55 | -0.48 | 0.50 |
> **Interpretation.** One-race drivers (Jones, Pruett) have extreme MLEs (2.74, 2.21) that the posterior mean pulls to about 0.1 with sd 0.48 - classic partial pooling. Full-season drivers barely move (e.g. Martin 0.67 to 0.79) and have sd 0.17. MMSE ordering is more sensible than raw average place. The sd column quantifies the uncertainty the MLE cannot.
> ^ex-nascar-table1

### 6.3 Chess (Figs. 4-5)

Game-by-game results over 100 months: 65,053 games among 8,631 players; outcome win=1, tie=0.5, loss=0. BT with ties (Rao-Kupper) is fitted on the first 95 months and the last 5 months are predicted; $a_\theta=1,b_\theta=0$; $\theta^{(0)}=1.5$; Gibbs 10,000 iterations, 1,000 burn-in; $\theta$ updated with an M-H normal random walk (sd 0.1) because the exact Gamma mixture has too many components.

**Fig. 4 (test MSE vs $a$).** MAP and Gibbs predictive MSE both lie between about 0.36 and 0.395; both improve with moderate $a$ (penalising skills) and the **full Bayesian predictive is better than MAP**. Fig. 5: autocorrelation of $\theta$ and the largest skills decays rapidly (good mixing).

## Examples

> [!example] Shrinkage reading of the NASCAR table
> **Setup.** Posterior mean vs MLE for one-race drivers.
> **Solution.** Fit PL with prior $\mathcal G(a,Ka-1)$ and compare. MLE 2.74 vs MMSE 0.11 for Jones.
> **Interpretation.** A single 4th place beats most of the field once, which the MLE treats as proof of excellence; the posterior treats it as weak evidence.

## Connections

- Same logic as shrinking brand or creative scores that have few comparisons ([[Hierarchical Models]]; [[Multiple Comparisons - Bayesian Perspective]]).
- Chess/Elo background: [[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]].

## See Also

[[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]] · [[Weng and Lin 2011 - Bayesian Online Ranking Overview]]
