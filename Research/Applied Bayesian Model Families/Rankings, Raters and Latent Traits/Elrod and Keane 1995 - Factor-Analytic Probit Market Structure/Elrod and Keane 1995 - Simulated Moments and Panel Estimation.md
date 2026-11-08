---
title: "Elrod and Keane 1995 - Simulated Moments and Panel Estimation"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Elrod and Keane 1995 - A Factor-Analytic Probit Model for Market Structure in Panel Data.pdf]]"
source_location: "Fitting probit models to panel data, p. 5; Technical Appendix, pp. 13-15 (Eqs. A1-A7)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Elrod and Keane 1995 - Factor-Analytic Probit Market Structure"
doc_type: paper
depends_on:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]]"
used_by:
  - "[[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]]"
aliases:
  - method of simulated moments probit panel
  - Keane 1990 transition probabilities GHK
---

# Elrod and Keane 1995 - Simulated Moments and Panel Estimation

> [!summary]
> Probit choice probabilities need $(J-1)$-dimensional integrals. McFadden's (1989) method of simulated moments (MSM) replaces them by simulation with few draws per household because the score equations are linear in the probabilities. For panels, Keane (1990) rewrites the score in terms of sequential transition probabilities (choice at $t$ given all earlier choices), simulated with the GHK algorithm, avoiding $J^T$ sequences.

## Overview

Numerical integration is too slow beyond about 3-4 brands. Gibbs sampling with data augmentation (Albert & Chib 1993; McCulloch & Rossi 1994) is mentioned as a later alternative (footnote 4, outside the scope). Cross-sectional MSM cannot separate consumer heterogeneity from autocorrelation with only two periods.

## Main Content

> [!definition] Score and method-of-moments estimator (cross-section)
> With $d_{ij}=1$ if household $i$ chose $j$ and $p_{ij}$ its choice probability, the score is $\partial L(\theta)/\partial\theta=\sum_i\sum_jd_{ij}\,\partial\ln p_{ij}/\partial\theta$ (A1). Since $\sum_jp_{ij}=1$, $\sum_j\partial p_{ij}/\partial\theta=0$ (A2), and subtracting gives
> $$\sum_{i=1}^N\sum_{j=1}^Jw_{ij}(d_{ij}-p_{ij})\approx0,\quad w_{ij}=\frac{\partial p_{ij}/\partial\theta}{p_{ij}}\ (\text{A3-A4}).$$
> With optimal weights (A4) the MOM estimator is asymptotically equivalent to ML; with other weights it is consistent and asymptotically normal but inefficient.
> ^def-mom-score

> [!theorem] Method of simulated moments (McFadden 1989)
> Because (A3) is *linear* in the $p_{ij}$, simulation errors tend to cancel (unlike simulated ML, where the log is non-linear), so MSM is consistent for a fixed number of simulations per household. Start with initial weights and update them as estimates improve; practical limits: small probabilities are hard to simulate accurately and weights have $p_{ij}$ in the denominator; feasible for roughly 20-24 alternatives.
> ^thm-msm

> [!definition] Panel MSM via transition probabilities (Keane 1990)
> Cross-sectional use of MSM on panels requires simulating $J^T$ sequence probabilities. Instead, with $C_{it}=j$ the choice of household $i$ at occasion $t$:
> $\partial L/\partial\theta\approx\sum_i\sum_{t=1}^{T_i}\sum_jw_{ijt}(d_{ijt}-p^*_{ijt})$ with $w_{ijt}=(\partial p^*_{ijt}/\partial\theta)/p^*_{ijt}$ (A5-A6) and $p^*_{ijt}=\Pr(d_{ijt}=1\mid D_{i,t-1})$ (A7), the transition probability given all earlier choices.
> The number of probabilities per household is $JT$ rather than $J^T$, and none involves choices from sets larger than $J$ - avoiding tiny probabilities from very large choice sets.
> ^def-panel-msm

Transition probabilities are simulated by the **GHK simulator** (Geweke 1991; Hajivassiliou & McFadden 1990; Hajivassiliou, McFadden & Ruud 1992): sequentially draw truncated normal utilities, giving accurate simulated probabilities for truncated multivariate normals. Keane (1994a) proves the estimates are consistent and asymptotically normal as the number of simulations grows and shows the method works with few simulates per choice. It allowed fitting households with up to 24 repeated choices among 8 brands.

## Examples

> [!example] GHK for a two-brand toy
> **Setup.** Probability that brand 1 beats brand 2 under $(u_1,u_2)\sim N(0,\Sigma)$.
> **Solution.** The difference $u_1-u_2$ is normal; the probability is $\Phi(\cdot)$ - GHK matters for $J>3$ where no closed form exists: draw $u_1$ truncated so brand 1 exceeds the rest, using conditional normals, and multiply the sequence of normal CDF factors.
> **Interpretation.** The simulator is smooth in parameters, which is why the score-based MSM can be solved by Newton-type updates.

## Connections

- Modern Bayesian estimation of probit and logit panel models (Gibbs/HMC) supersedes MSM; see [[Random Coefficients Logit Model]] and [[HMC and Stan in Practice]].

## See Also

[[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]]
