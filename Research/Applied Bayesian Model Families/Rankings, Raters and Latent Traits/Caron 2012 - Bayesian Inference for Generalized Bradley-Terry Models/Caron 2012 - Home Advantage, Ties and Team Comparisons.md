---
title: "Caron 2012 - Home Advantage, Ties and Team Comparisons"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]"
source_location: "Sec. 3, pp. 6-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
doc_type: paper
depends_on:
  - "[[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]"
used_by:
  - "[[Caron 2012 - Experiments NASCAR and Chess]]"
aliases:
  - Rao-Kupper ties EM Gibbs
  - BT home advantage EM Gibbs
---

# Caron 2012 - Home Advantage, Ties and Team Comparisons

> [!summary]
> Three standard Bradley-Terry extensions - a home-field multiplier $\theta$, the Rao-Kupper tie model, and team (group) comparisons - each get an EM update and a Gibbs sampler from the same exponential-race augmentation. The tie parameter needs a non-Gamma step.

## Overview

Notation as in [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]]; $\mathcal G(\alpha,\beta)$ = Gamma with shape $\alpha$, rate $\beta$.

## Main Content

### 3.1 Home advantage (Agresti 1990)

> [!definition] Home-advantage model
> $P(i\text{ beats }j)=\dfrac{\theta\lambda_i}{\theta\lambda_i+\lambda_j}$ if $i$ is home, $\dfrac{\lambda_i}{\lambda_i+\theta\lambda_j}$ if $j$ is home. $\theta>1$ is a home advantage, $\theta<1$ a disadvantage.
> ^def-home-adv

Let $a_{ij}$ ($b_{ij}$) = number of times $i$ at home beats (loses to) $j$, $n_{ij}=a_{ij}+b_{ij}$ the number of home games of $i$ against $j$, $c=\sum_{i\ne j}a_{ij}$ total home wins, $w_i$ total wins. Then
$\ell(\lambda,\theta)=c\log\theta+\sum_iw_i\log\lambda_i-\sum_{i\ne j}n_{ij}\log(\theta\lambda_i+\lambda_j)$. Latent $Z_{ij}\sim\mathcal G(n_{ij},\theta\lambda_i+\lambda_j)$ over ordered pairs, priors $\lambda_i\sim\mathcal G(a,b)$, $\theta\sim\mathcal G(a_\theta,b_\theta)$.

> [!theorem] EM and Gibbs for home advantage
> EM: $\lambda_i^{(t)}=(a-1+w_i)\Big/\Bigl(b+\sum_{j\ne i}\bigl[\tfrac{\theta^{(t-1)}n_{ij}}{\theta^{(t-1)}\lambda_i^{(t-1)}+\lambda_j^{(t-1)}}+\tfrac{n_{ji}}{\theta^{(t-1)}\lambda_j^{(t-1)}+\lambda_i^{(t-1)}}\bigr]\Bigr)$, $\;\theta^{(t)}=(a_\theta-1+c)\Big/\Bigl(b_\theta+\sum_{i\ne j}\tfrac{n_{ij}\lambda_i^{(t)}}{\theta^{(t-1)}\lambda_i^{(t-1)}+\lambda_j^{(t-1)}}\Bigr)$ (the latter uses the denominators at iteration $t-1$).
> Gibbs: $Z_{ij}\sim\mathcal G(n_{ij},\theta\lambda_i+\lambda_j)$; $\lambda_i\sim\mathcal G\bigl(a+w_i,\,b+\theta\sum_jZ_{ij}+\sum_jZ_{ji}\bigr)$; $\theta\sim\mathcal G\bigl(a_\theta+c,\,b_\theta+\sum_i\lambda_i\sum_jZ_{ij}\bigr)$.
> ^thm-home-adv

For $a=a_\theta=1$, $b=b_\theta=0$ the EM equals Hunter's MM (2004, p. 389).

### 3.2 Ties (Rao & Kupper 1967)

> [!definition] Rao-Kupper tie model
> $P(i\succ j)=\dfrac{\lambda_i}{\lambda_i+\theta\lambda_j}$, $\;P(i\sim j)=\dfrac{(\theta^2-1)\lambda_i\lambda_j}{(\lambda_i+\theta\lambda_j)(\theta\lambda_i+\lambda_j)}$, $\theta>1$.
> ^def-rao-kupper

With $t_{ij}=t_{ji}$ the number of ties between $i$ and $j$ and $s_{ij}=w_{ij}+t_{ij}$ (as defined in the report), $\ell(\lambda,\theta)=\sum_{i\ne j}\bigl[s_{ij}\log\frac{\lambda_i}{\lambda_i+\theta\lambda_j}+\frac{t_{ij}}{2}\log(\theta^2-1)\bigr]$. Latent $Z_{ij}\sim\mathcal G(s_{ij},\lambda_i+\theta\lambda_j)$ and a flat prior on $\theta\in[1,\infty)$ give:

> [!theorem] EM and Gibbs for ties
> EM: $\lambda_i^{(t)}=\bigl(a-1+\sum_js_{ij}\bigr)\big/\bigl(b+\sum_{j\ne i}[\tfrac{s_{ij}}{\lambda_i+\theta\lambda_j}+\tfrac{\theta s_{ji}}{\theta\lambda_i+\lambda_j}]\bigr)$ (quantities from $t-1$); $\theta^{(t)}=\frac1{2c^{(t)}}+\sqrt{1+\frac1{4c^{(t)2}}}$ with $c^{(t)}=\sum_{i\ne j}s_{ij}\lambda_j/(\lambda_i+\theta\lambda_j)$.
> Gibbs: $Z$ and $\lambda_i\sim\mathcal G(a+\sum_js_{ij},\,b+\sum_jZ_{ij}+\theta\sum_jZ_{ji})$ as usual; but $\theta$ has the non-standard conditional $p(\theta\mid D,Z,\lambda)\propto(\theta^2-1)^T\exp(-\theta\sum Z_{ij})\mathbf 1_{\theta>1}$, $T=\tfrac12\sum t_{ij}$ total ties.
> ^thm-ties

Substituting $\theta'=\theta-1$ turns $(\theta^2-1)^T=(\theta'^2+2\theta')^T$ into a binomial expansion, so the $\theta$ conditional is an exact **mixture of Gamma distributions** with $T+1$ components. With many ties (the chess data) the mixture is too large and a Metropolis random walk (sd 0.1) is used instead.

### 3.3 Group comparisons (Huang et al. 2006)

> [!definition] Team Bradley-Terry
> For comparison $i=1,\dots,n$ with winning team $T_i^+$, losing team $T_i^-$, $T_i=T_i^+\cup T_i^-$:
> $P(T_i^+\text{ beats }T_i^-)=\dfrac{\sum_{j\in T_i^+}\lambda_j}{\sum_{j\in T_i}\lambda_j}$.
> ^def-team-bt

Latents: $Z_i\sim\text{Exp}(\sum_{j\in T_i}\lambda_j)$ and a winner-identity indicator $C_i$ with $P(C_i=k)=\lambda_k/\sum_{j\in T_i^+}\lambda_j$, $k\in T_i^+$.

> [!theorem] EM and Gibbs for team comparisons
> EM: $\lambda_k^{(t)}=\dfrac{a-1+\lambda_k^{(t-1)}\sum_i\alpha_{ik}/\sum_{j\in T_i^+}\lambda_j^{(t-1)}}{b+\sum_i\gamma_{ik}/\sum_{j\in T_i}\lambda_j^{(t-1)}}$ ($\alpha_{ik}=\mathbf 1\{k\in T_i^+\}$, $\gamma_{ik}=\mathbf 1\{k\in T_i\}$).
> Gibbs: sample $Z_i$, $C_i$, then $\lambda_k\sim\mathcal G\bigl(a+\sum_i\delta_{k,C_i},\,b+\sum_i\gamma_{ik}Z_i\bigr)$.
> ^thm-team-bt

Individual skills are estimated from team outcomes only - useful whenever an outcome (e.g. a campaign mix) is a sum of component strengths. Caveat: the model is additive in $\lambda$, not in $\log\lambda$.

## Examples

> [!example] Home advantage in a league
> **Setup.** Teams A, B; A at home beats B 7 of 10 times; B at home beats A 5 of 10 times.
> **Solution.** Home wins $c=7+5=12$ of 20 games; with equal skills $\theta=\frac{12/20}{8/20}=1.5$ (odds of a home win), i.e. a 60% home win rate.
> **Interpretation.** $\theta$ is the multiplicative advantage in the odds scale; the skill estimates are then net of venue.
> ^ex-home-adv

## Connections

- Ties are an ordered-logit style "threshold" model ($\theta>1$ widens the tie band); see [[Discrete Choice Models]].
- Time-varying versions: [[Weng and Lin 2011 - Bayesian Online Ranking Overview]] treats draws via $\kappa$ and teams via summed skills.

## See Also

[[Caron 2012 - Plackett-Luce Model for Full Rankings]] · [[Caron 2012 - Experiments NASCAR and Chess]]
