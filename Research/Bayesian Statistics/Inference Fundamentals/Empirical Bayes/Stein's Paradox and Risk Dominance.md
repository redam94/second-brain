---
title: Stein's Paradox and Risk Dominance
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/theorem
  - doc/textbook
source: "[[raw/Efron - Empirical Bayes and the James-Stein Estimator (LSI Ch1).pdf]]"
source_location: "Ch. 1, pp. 5-9"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Inference Fundamentals/Empirical Bayes"
doc_type: textbook
depends_on:
  - "[[James-Stein Estimator]]"
  - "[[Empirical Bayes - Overview]]"
used_by:
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Stein's Paradox
  - Stein Paradox
  - Inadmissibility of the MLE
  - Risk Dominance
---

# Stein's Paradox and Risk Dominance

> [!summary]
> **Stein's paradox** (1955-1961): for $N \geq 3$, the James-Stein estimator **everywhere dominates** the MLE $\hat{\boldsymbol{\mu}}^{(MLE)} = \boldsymbol{z}$ in total squared-error risk — its risk is strictly smaller for *every* value of $\boldsymbol{\mu}$, making the century-old MLE **inadmissible** in dimension $\geq 3$. The result is frequentist, not Bayesian: it holds regardless of any prior belief. The proof rests on **Stein's unbiased estimate of risk** (an integration-by-parts identity). The paradox is that estimating unrelated quantities jointly (Clemente's average, Munson's average) beats estimating each alone.

## Overview

Charles Stein's 1955 result shocked statisticians: maximum likelihood estimation for Gaussian models — in routine use for over a century — is **inadmissible** beyond one or two dimensions. The MLE has constant risk $R^{(MLE)}(\boldsymbol{\mu}) = N$ for every $\boldsymbol{\mu}$, treating every point of the parameter space equally, which seems reasonable for general estimation. Yet for $N \geq 3$ it can be uniformly beaten.

The shock did **not** come from the empirical Bayes risk comparison (eqs. 1.24-1.25). Those are based on the zero-centric Bayesian model where shrinkage toward $\mathbf 0$ is naturally expected to help. The "rude surprise" came from a theorem with **no prior at all**: James and Stein (1961) proved domination for every fixed $\boldsymbol{\mu}$. (Stein 1956 first showed $\hat{\boldsymbol{\mu}}^{(0)} = \boldsymbol{z}$ could be improved; the explicit form 1.23 came with his student Willard James in 1961.)

## Main Content

> [!theorem] James-Stein dominance / inadmissibility of the MLE ^js-dominance
> For $N \geq 3$, the [[James-Stein Estimator]] everywhere dominates the MLE in expected total squared error (Efron eq. 1.26):
> $$E_{\boldsymbol{\mu}}\left\{\|\hat{\boldsymbol{\mu}}^{(JS)} - \boldsymbol{\mu}\|^2\right\} < E_{\boldsymbol{\mu}}\left\{\|\hat{\boldsymbol{\mu}}^{(MLE)} - \boldsymbol{\mu}\|^2\right\} \quad \text{for every choice of } \boldsymbol{\mu}.$$
> This is **frequentist**: it implies the superiority of $\hat{\boldsymbol{\mu}}^{(JS)}$ no matter what one's prior beliefs about $\boldsymbol{\mu}$ may be. Since versions of the MLE underlie linear regression and ANOVA, its apparent uniform inferiority was a cause for alarm.

> [!definition] Stein's unbiased risk estimate (the proof identity) ^sure
> The proof starts from the algebraic identity (eq. 1.27)
> $$(\hat\mu_i - \mu_i)^2 = (z_i - \hat\mu_i)^2 - (z_i - \mu_i)^2 + 2(\hat\mu_i - \mu_i)(z_i - \mu_i).$$
> Summing and taking expectations under $\boldsymbol{z} \sim \mathcal{N}_N(\boldsymbol{\mu}, I)$, **integration by parts** on the normal density gives the key covariance identity
> $$\operatorname{cov}_{\boldsymbol{\mu}}(\hat\mu_i, z_i) = E_{\boldsymbol{\mu}}\!\left\{\frac{\partial \hat\mu_i}{\partial z_i}\right\}$$
> (valid whenever $\hat\mu_i$ is continuously differentiable in $\boldsymbol{z}$), which reduces the risk to (eq. 1.30)
> $$E_{\boldsymbol{\mu}}\|\hat{\boldsymbol{\mu}} - \boldsymbol{\mu}\|^2 = E_{\boldsymbol{\mu}}\left\{\|\boldsymbol{z}-\hat{\boldsymbol{\mu}}\|^2\right\} - N + 2\sum_{i=1}^N E_{\boldsymbol{\mu}}\!\left\{\frac{\partial \hat\mu_i}{\partial z_i}\right\}.$$

> [!theorem] Exact risk of James-Stein ^js-exact-risk
> Applying the risk identity (1.30) to $\hat{\boldsymbol{\mu}}^{(JS)}$ (eq. 1.31) yields
> $$E_{\boldsymbol{\mu}}\left\{\|\hat{\boldsymbol{\mu}}^{(JS)} - \boldsymbol{\mu}\|^2\right\} = N - E_{\boldsymbol{\mu}}\!\left\{\frac{(N-2)^2}{S}\right\}, \qquad S = \sum z_i^2.$$
> Since the subtracted term is **strictly positive whenever $N > 2$**, the JS risk is strictly below the MLE risk $N$ for all $\boldsymbol{\mu}$ — proving the theorem.

> [!definition] Risk is total, not individual ^total-vs-individual
> The theorem concerns **total** squared-error loss $\sum(\hat\mu_i - \mu_i)^2$, with no guarantee for individual cases. Most individual effects are improved, but genuinely unusual cases can be made **worse** — JS over-shrinks outliers toward the crowd. This is why standalone MLE methods remain popular (protecting individual inferences), and why compromises like the limited-translation estimator exist (see [[James-Stein Estimator]]).

## Examples

> [!example] Simulation showing the individual-vs-total tradeoff (Efron Table 1.2, $N=10$)
> One thousand simulations of $\boldsymbol{z} \sim \mathcal{N}_{10}(\boldsymbol{\mu}, I)$, with $\mu_{10} = 4$ a far outlier:
>
> | $i$ | $\mu_i$ | $\text{MSE}_i^{(MLE)}$ | $\text{MSE}_i^{(JS)}$ |
> |---|---|---|---|
> | 1 | $-.81$ | .95 | .61 |
> | 4 | $-.08$ | .99 | .58 |
> | 9 | 1.89 | 1.00 | .88 |
> | 10 | **4.00** | 1.08 | **2.04!!** |
> | **Total Sqerr** | | **10.12** | **8.13** |
>
> JS beats the MLE for the nine ordinary cases but has **nearly twice** the error for the outlier $\mu_{10}$. Overall the total mean squared error still favors $\hat{\boldsymbol{\mu}}^{(JS)}$ — as it must, by the theorem.
>
> The values are consistent with $\mu_i \overset{ind}{\sim} \mathcal{N}(0,A)$; the total error $8.13$ matches the empirical Bayes risk prediction (Exercise 1.5).

> [!example] The "paradox" in the baseball data
> Clemente (top of Table 1.1) performs independently of Munson (near the bottom). Why should Clemente's good early performance change our prediction for Munson? It does for $\hat{\boldsymbol{\mu}}^{(JS)}$ — mainly through the grand mean $\bar z$ in eq. 1.35 — but not for $\hat{\boldsymbol{\mu}}^{(MLE)}$. There is **indirect evidence** lurking *among* the players, supplementing each player's own average. Formal Bayes supplies this via a prior; for empirical Bayes "the prior may exist only as a motivational device." Note Clemente was genuinely an extraordinary hitter and should *not* have been shrunk so far toward his cohort — exactly the individual-case risk the theorem does not protect.

## Connections

- [[James-Stein Estimator]] — the estimator whose risk is bounded here.
- [[Empirical Bayes - Overview]] — Stein's branch of the EB initiative.
- [[Empirical Bayes Interpretation of Shrinkage]] — why dominance and shrinkage are two faces of estimating the prior.
- [[Partial Pooling as Multiple Comparisons Correction]] — pooling reduces total risk by the same mechanism.
- [[Asymptotics and Frequentist Connections]] — admissibility/inadmissibility as a frequentist decision-theory notion.

## See Also

- [[Hierarchical Models]]
- [[Multiple Comparisons - Bayesian Perspective]]
- [[_Index]]
