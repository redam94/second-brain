---
title: "Weng and Lin 2011 - Ranking Models and the W-Stein Approximation"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Sec. 2, pp. 268-274 (Fig. 1, Lemma 1, Corollary 2); Appendices A-B"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[Weng and Lin 2011 - Bayesian Online Ranking Overview]]"
used_by:
  - "[[Weng and Lin 2011 - Update Rules Derivation and Error Correction]]"
aliases:
  - W-Stein identity
  - Woodroofe-Stein identity ranking
---

# Weng and Lin 2011 - Ranking Models and the W-Stein Approximation

> [!summary]
> Section 2 reviews how ranked data are modelled (Thurstone-Mosteller, Bradley-Terry, Plackett-Luce, Elo) and states Woodroofe's extension of Stein's lemma, which makes posterior mean and variance for Gaussian-prior skills computable from derivatives of the outcome likelihood.

## Overview

A game with $k$ teams gives ranks $r(i)$ (smaller is better). Ties share a rank and the next team skips ahead: ranks $(2,2,4,1)$ for teams 1-4 mean teams 1 and 2 tie for second and team 3 is fourth. The inverse map $\bar r(a)$ lists teams in order, any one-to-one map with $r(\bar r(a))\le r(\bar r(a+1))$.

## Main Content

> [!definition] Performance-ordering model
> Each team has an unobserved performance $X_i$; the outcome is the event $X_{\bar r(1)}>X_{\bar r(2)}>\dots>X_{\bar r(k)}$.
> - **Thurstone-Mosteller (TM):** $X_i\sim N(\theta_i,\beta_i^2)$, so $P(X_i>X_q)=\Phi\bigl((\theta_i-\theta_q)/\sqrt{\beta_i^2+\beta_q^2}\bigr)$.
> - **Bradley-Terry (BT):** $P(X_i>X_q)=v_i/(v_i+v_q)$, from Gumbel performances with location $\theta_i=\log v_i$ (logistic difference).
> ^def-performance-ordering

> [!definition] Plackett-Luce (PL)
> $P(\bar r(1),\dots,\bar r(k))=\prod_{a=1}^{k}\dfrac{e^{\theta_{\bar r(a)}}}{\sum_{b\ge a}e^{\theta_{\bar r(b)}}}$: choose the favourite, then the next favourite from the remainder.
> ^def-pl-weng

> [!definition] Elo update
> $\theta_i\leftarrow\theta_i+K(s-P(i\text{ wins}))$ with $s=1$ for a win and 0 otherwise; the logistic variant is BT. USCF uses $K=32$ for amateurs and $p^*_{iq}=10^{\theta_i/400}/(10^{\theta_i/400}+10^{\theta_q/400})$.
> ^def-elo

**Figure 1.** Win probability vs. $\theta_i-\theta_q\in[-6,6]$ for the Gaussian model with $(\beta_i^2+\beta_q^2)^{1/2}=4/\sqrt{2\pi}\approx1.6$ (chosen so slopes agree at 0) and the logistic model. They nearly coincide near equal skill, but the logistic gives a weaker team a higher chance, which is why chess federations prefer it.

**Why not MCMC.** MCMC does not reuse earlier analysis when new data arrive, so for sequential updating the authors use deterministic approximations: Laplace, variational Bayes, expectation propagation (TrueSkill's choice).

> [!theorem] Lemma 1 (W-Stein identity, Woodroofe 1989)
> Let $d\Gamma(z)=f(z)\phi_k(z)\,dz$ with $f$ almost differentiable, $\phi_k$ the standard $k$-variate normal density, and $h$ a real function. Then
> $$
> \int h\,d\Gamma=\int f\,d\Phi_k\cdot\int h\,d\Phi_k+\int (Uh)^\top\nabla f\,d\Phi_k,
> $$
> provided integrals are finite, where $Uh=[g_1,\dots,g_k]^\top$, $g_j(z)=e^{z_j^2/2}\int_{z_j}^\infty[h_j(z_{1:j-1},w)-h_{j-1}(z_{1:j-1})]e^{-w^2/2}\,dw$.
> ^thm-w-stein

> [!theorem] Corollary 2 (posterior moments)
> If $Z$ has density $C\phi_k(z)f(z)$, then
> $E[Z_i]=E\!\left[\dfrac{\partial_i f(Z)}{f(Z)}\right]$ and $E[Z_iZ_q]=\delta_{iq}+E\!\left[\dfrac{\nabla^2f(Z)}{f(Z)}\right]_{iq}$.
> ^thm-stein-moments

*Proof sketch (Appendix A).* Exchange the order of integration (Fubini); the same device proves Stein's lemma. For $h(z)=z_i$, $Uh=e_i$; for $h(z)=z_iz_j$ with $i<j$, $Uh=z_ie_j$ (Appendix B works $k=3$, $h=z_1z_2$).

## Examples

> [!example] Why the identity gives an Elo step
> **Setup.** Two teams; $f$ = probability that team 1 wins, a logistic function of $\theta_1-\theta_2$; priors $N(\mu_i,\sigma_i^2)$.
> **Solution.** Corollary 2 gives $E[\theta_1]=\mu_1+\sigma_1E[\partial_{z_1}f/f]$, the average relative gradient of the outcome probability. Evaluating at the prior mean gives $\mu_1+(\sigma_1^2/c)(1-\hat p)$ (see [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]).
> **Interpretation.** The shift is the surprise $(s-\hat p)$ scaled by uncertainty: an Elo step with automatic, uncertainty-driven $K$.
> ^ex-stein-elo

## Connections

Gaussian belief updating of skill is a Kalman-style observation update ([[The Kalman Filter]]).

## See Also

[[Weng and Lin 2011 - Update Rules Derivation and Error Correction]]
