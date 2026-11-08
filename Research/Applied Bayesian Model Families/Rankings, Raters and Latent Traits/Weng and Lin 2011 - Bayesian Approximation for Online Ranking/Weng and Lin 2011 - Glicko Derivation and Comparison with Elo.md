---
title: "Weng and Lin 2011 - Glicko Derivation and Comparison with Elo"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Sec. 5, pp. 286-290 (Algorithm 5); Sec. 2.1, Eq. 6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]"
used_by:
  - "[[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]]"
aliases:
  - Glicko five-step approximation
  - Glickman 1999 derivation
---

# Weng and Lin 2011 - Glicko Derivation and Comparison with Elo

> [!summary]
> The paper re-derives Glicko (Glickman 1999) in five steps (integrate out opponents under their priors, logistic-to-normal approximation, CLT, Taylor expansion) and reports a single-game version. Glicko's rating-period update is justified when each player plays about 5-10 games per period; its one-game form is a weaker approximation than BT-full.

## Overview

Prior skill $\theta\sim N(\mu,\sigma^2)$; during a rating period the player plays $n_j$ games against opponent $j=1..m$ with $\theta_j\sim N(\mu_j,\sigma_j^2)$; outcomes $s_{jk}\in\{1,\tfrac12,0\}$. Glicko works on the Elo scale (base 10, divisor 400).

## Main Content

> [!definition] Glicko approximation steps
> (I) Approximate the opponents' posterior by their priors: $P(\theta_1..\theta_m\mid D)\approx\prod_j\phi(\theta_j\mid\mu_j,\sigma_j^2)$ (Glickman: "integrating out the opponents' strengths over their prior rather than their posterior").
> (II) Define $P(D\mid\theta)=\prod_{j,k}\int\bigl(\tfrac{10^{(\theta-\theta_j)/400}}{1+10^{(\theta-\theta_j)/400}}\bigr)^{s_{jk}}\phi(\theta_j)d\theta_j$.
> (III) Replace each logistic cdf with a normal cdf of equal mean and variance so the integral closes: $\approx\bigl(\tfrac{10^{g(\sigma_j^2)(\theta-\mu_j)/400}}{1+10^{g(\sigma_j^2)(\theta-\mu_j)/400}}\bigr)^{s_{jk}}$ with $g(\sigma^2)=1/\sqrt{1+3q^2\sigma^2/\pi^2}$, $q=\ln 10/400$; then approximate the likelihood by a normal $\phi(\theta\mid\hat\theta,\delta^2)$, $\delta^{-2}\approx q^2\sum_jn_jg(\sigma_j^2)^2p_j(1-p_j)$.
> (IV) Obtain $\hat\theta-\mu$ from a first-order Taylor expansion of the score equation $\sum_{jk}g(\sigma_j^2)s_{jk}=h(\hat\theta)$.
> (V) Combine: $\sigma^{-2}\leftarrow\sigma^{-2}+\delta^{-2}$ and $\mu\leftarrow\mu+\dfrac{q}{\sigma^{-2}+\delta^{-2}}\sum_{j,k}g(\sigma_j^2)(s_{jk}-p_j(\mu))$.
> ^def-glicko-steps

> [!theorem] Algorithm 5 (Glicko, single game)
> $q=\ln10/400$, $g(\sigma^2)=(1+3q^2\sigma^2/\pi^2)^{-1/2}$, $p_j^*=1/(1+10^{-g(\sigma_j^2)(\mu_i-\mu_j)/400})$, $(\delta_i^2)^*=\bigl[q^2g(\sigma_j^2)^2p_j^*(1-p_j^*)\bigr]^{-1}$;
> $\mu_i\leftarrow\mu_i+\dfrac{q}{\sigma_i^{-2}+(\delta_i^2)^{*-1}}\,g(\sigma_j^2)(s_{ij}-p_j^*)$, $\;\sigma_i^2\leftarrow\bigl[\sigma_i^{-2}+(\delta_i^2)^{*-1}\bigr]^{-1}$.
> ^thm-glicko-single

**Caveat.** With one game the likelihood is monotone, so its mode is $\pm\infty$ and the CLT step has no justification; the algebra survives but Glicko treats games in a rating period as simultaneous. The paper reports single-game Glicko error 33.88% on Head-to-Head, slightly worse than BT-full (32.53%).

**Comparison with Algorithm 1.** Both use BT. Glicko: precision-weighted (information-additive) update with $g(\cdot)$ attenuating opponents' uncertainty; Weng-Lin: opponent uncertainty enters via $c_{iq}$ and update is applied per game and extends to multi-team ranks.

## Examples

> [!example] Glicko step for a new player
> **Setup.** Player $\mu=1500$, $\sigma=350$; opponent $\mu_j=1400$, $\sigma_j=30$; one win ($s=1$).
> **Solution.** $q=0.005756$; $g(900)\approx0.9955$ for $\sigma_j=30$ (variance 900); $p^*=1/(1+10^{-0.9955\cdot100/400})\approx0.640$; $(\delta^2)^{*-1}=q^2g^2p^*(1-p^*)\approx7.6\times10^{-6}$; $\sigma^{-2}=8.16\times10^{-6}$; new $\mu\approx1500+q\,g(s-p^*)/(8.16+7.6)10^{-6}\approx1500+131\approx1631$.
> **Interpretation.** A high-$\sigma$ newcomer moves a long way after a single game, as with Weng-Lin; the step shrinks as $\sigma$ falls.
> ^ex-glicko-step

## Connections

- Both reduce to Elo when variance terms are dropped. See [[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]].

## See Also

[[Weng and Lin 2011 - Halo 2 Experiments and Results]]
