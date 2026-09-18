---
title: Robbins Formula and Poisson Empirical Bayes
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/theorem
  - doc/textbook
source: "[[raw/Efron - Empirical Bayes and the James-Stein Estimator (LSI Ch1).pdf]]"
source_location: "Ch. 1, pp. 1-2"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Inference Fundamentals/Empirical Bayes"
doc_type: textbook
depends_on:
  - "[[Empirical Bayes - Overview]]"
used_by:
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Robbins Formula
  - Robbins' Formula
  - Poisson Empirical Bayes
  - Nonparametric Empirical Bayes
---

# Robbins Formula and Poisson Empirical Bayes

> [!summary]
> **Robbins' formula** is the foundational *nonparametric* empirical Bayes result: in the Poisson model, the Bayes posterior mean of an unobserved rate can be expressed **entirely through the marginal density** $f$ of the observed counts, with no need to specify the prior $g$. For an observed count $x$, the EB estimate of the true rate is $(x+1)\,f(x+1)/f(x)$, where $f$ is replaced by the empirical frequency of counts across the many parallel cases. This is the most general expression of Efron's theme that the prior can be learned from the experience of others.

## Overview

Herbert Robbins was the principal developer of the program *explicitly named* "empirical Bayes." His branch aimed to show how a frequentist, by exploiting the **marginal distribution of pooled data across many parallel cases**, could achieve full Bayesian efficiency — without ever specifying the prior. Where Stein's branch (the [[James-Stein Estimator]]) is parametric (estimate one hyperparameter $A$), Robbins' Poisson construction is nonparametric: the entire posterior-mean function is read off from observed marginal frequencies.

The setup: many independent units, unit $i$ has an unknown Poisson rate $\theta_i$ drawn from an unknown prior $g$, and we observe a count $x_i \mid \theta_i \sim \text{Poisson}(\theta_i)$. We want the Bayes estimate $E[\theta \mid x]$ for a unit observed to have count $x$.

## Main Content

> [!definition] Poisson marginal density ^poisson-marginal
> With prior $g(\theta)$ and likelihood $f_\theta(x) = e^{-\theta}\theta^x/x!$, the **marginal probability** of observing count $x$ is
> $$
> f(x) = \int_0^\infty e^{-\theta}\frac{\theta^x}{x!}\,g(\theta)\,d\theta.
> $$
> Crucially, $f(x)$ is **directly estimable** from the data as the observed fraction of units having count $x$.

> [!theorem] Robbins' formula (Poisson empirical Bayes) ^robbins-formula
> The Bayes posterior mean of $\theta$ given an observed count $x$ depends on the prior $g$ **only through the marginal $f$**:
> $$
> E[\theta \mid x] = (x+1)\,\frac{f(x+1)}{f(x)}.
> $$
> **Proof idea.** Using $\theta \cdot e^{-\theta}\theta^x/x! = (x+1)\, e^{-\theta}\theta^{x+1}/(x+1)!$, the numerator of the posterior mean $\int \theta\, f_\theta(x)\,g(\theta)\,d\theta$ equals $(x+1)\,f(x+1)$, while the denominator is $f(x)$. The prior $g$ cancels out entirely.

> [!definition] Empirical Bayes estimator ^robbins-eb-estimator
> Replace the unknown marginal $f$ by the empirical frequencies $\hat{f}(x) = (\#\{i : x_i = x\})/N$ across the $N$ parallel units:
> $$
> \hat{E}[\theta \mid x] = (x+1)\,\frac{\hat{f}(x+1)}{\hat{f}(x)} = (x+1)\,\frac{\#\{i : x_i = x+1\}}{\#\{i : x_i = x\}}.
> $$
> No parametric form for the prior is ever assumed — the "prior may exist only as a motivational device." This is the purest realization of the empirical Bayes principle (see [[Empirical Bayes - Overview]]).

The same marginal-density logic powers the parametric (Gaussian) branch: there the marginal $\boldsymbol{z} \sim \mathcal{N}(0,(A+1)I)$ lets one estimate $1/(A+1)$ via $(N-2)/S$, giving the [[James-Stein Estimator]]. Robbins' version is more general because it estimates the **whole** posterior-mean curve rather than a single hyperparameter.

## Examples

> [!example] Insurance claims (classic Robbins application)
> Suppose a large portfolio of auto-insurance policyholders each have an unknown accident rate $\theta_i$, and last year we observed $x_i$ claims for policyholder $i$. To predict next year's expected claims for someone who filed $x$ claims, Robbins' formula gives $(x+1)\,\hat f(x+1)/\hat f(x)$. If $\hat f(0)=7840$, $\hat f(1)=1317$, $\hat f(2)=239$ policyholders, then a customer with $0$ claims has predicted rate $(0+1)\cdot 1317/7840 \approx 0.168$, and one with $1$ claim has $(1+1)\cdot 239/1317 \approx 0.363$ — each shrunk relative to the raw count, learned purely from the marginal counts.

> [!example] Relation to Efron's batting data
> While Efron's worked Chapter 1 example (18 baseball players, [[James-Stein Estimator]]) uses the Gaussian/parametric branch, it shares Robbins' driving idea: each player's prediction is improved by exploiting the marginal distribution of all players' early-season averages rather than that player's data alone.

## Connections

- [[Empirical Bayes - Overview]] — the broader EB program and the marginal-density view this specializes.
- [[James-Stein Estimator]] — the parametric Gaussian counterpart; estimates one hyperparameter from the marginal.
- [[Empirical Bayes Interpretation of Shrinkage]] — both branches are instances of estimating the prior from data.
- [[Multiple Comparisons - Bayesian Perspective]] — Robbins' testing branch (effects piling up at $0$) connects to large-scale multiplicity.

## See Also

- [[Hierarchical Models]]
- [[Asymptotics and Frequentist Connections]]
- [[_Index]]
