---
title: Empirical Bayes - Overview
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/overview
  - doc/textbook
source: "[[raw/Efron - Empirical Bayes and the James-Stein Estimator (LSI Ch1).pdf]]"
source_location: "Ch. 1, pp. 1-12"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Inference Fundamentals/Empirical Bayes"
doc_type: textbook
depends_on:
  - "[[Robbins Formula and Poisson Empirical Bayes]]"
  - "[[James-Stein Estimator]]"
  - "[[Stein's Paradox and Risk Dominance]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
used_by:
  - "[[Hierarchical Models]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
aliases:
  - Empirical Bayes
  - EB
  - Empirical Bayes Estimation
---

# Empirical Bayes - Overview

> [!summary]
> **Empirical Bayes (EB)** estimates the prior distribution from the data itself, made possible when we face many similar problems simultaneously. Efron's Chapter 1 traces its two path-breaking roots: **Robbins'** general empirical Bayes program (frequentists achieving full Bayesian efficiency in large-scale parallel studies) and **Stein's** shrinkage estimators (the James-Stein estimator). The key insight is **"learning from the experience of others"**: when estimating $N$ parallel means, each case borrows strength from the marginal distribution of all the data, shrinking individual estimates toward a common center. This yields estimators that **dominate the MLE** in dimension $\geq 3$ (Stein's paradox).

## Overview

Charles Stein shocked the statistical world in 1955 by proving that maximum likelihood estimation for Gaussian models, in common use for over a century, is **inadmissible** beyond simple one- or two-dimensional situations. Stein-type estimators pointed the way toward a radically different *empirical Bayes* approach to high-dimensional inference.

Empirical Bayes has two historical branches:

1. **Robbins' branch** — explicitly named "empirical Bayes," more general in scope, aimed to show how frequentists could achieve full Bayesian efficiency in large-scale parallel studies. Allows for hypothesis testing (where many true effects pile up at a point, usually $0$). See [[Robbins Formula and Poisson Empirical Bayes]].
2. **Stein's branch** — concerns estimation; produced the practically useful James-Stein shrinkage estimators applicable even in much smaller data sets. See [[James-Stein Estimator]].

Although the connection was not immediately recognized, both were halves of one energetic post-war empirical Bayes initiative. Large-scale parallel studies were rare in the 1950s, so Robbins' theory lacked applied impact then; the 21st-century arrival of high-throughput technologies (e.g., microarrays producing thousands of parallel cases) made the Robbins viewpoint central. Empirical Bayes theory **blurs the distinction between estimation and testing as well as between frequentist and Bayesian methods**.

## Main Content

> [!definition] Bayes rule and the marginal density ^bayes-marginal
> An unknown parameter vector $\boldsymbol{\mu}$ with prior density $g(\boldsymbol{\mu})$ gives rise to observable data $\boldsymbol{z}$ via density $f_{\boldsymbol{\mu}}(\boldsymbol{z})$:
> $$
> \boldsymbol{\mu} \sim g(\cdot) \quad \text{and} \quad \boldsymbol{z}\mid\boldsymbol{\mu} \sim f_{\boldsymbol{\mu}}(\boldsymbol{z}).
> $$
> The posterior is $g(\boldsymbol{\mu}\mid\boldsymbol{z}) = g(\boldsymbol{\mu})\,f_{\boldsymbol{\mu}}(\boldsymbol{z})/f(\boldsymbol{z})$, where the **marginal distribution** of $\boldsymbol{z}$ is
> $$
> f(\boldsymbol{z}) = \int g(\boldsymbol{\mu})\,f_{\boldsymbol{\mu}}(\boldsymbol{z})\,d\boldsymbol{\mu}.
> $$
> **EB's central move:** the marginal $f(\boldsymbol{z})$ is observable from the data, so it can be used to recover features of the prior $g$ without that prior ever being specified.

> [!definition] The empirical Bayes principle ^eb-principle
> When $N$ structurally identical problems are under simultaneous consideration — $z_i \sim \mathcal{N}(\mu_i, 1)$ for $i = 1,\dots,N$ — the unknown prior (or its hyperparameters) can be **estimated from the marginal distribution of the pooled data**. Each individual estimate is then formed using a "prior" learned from all $N$ cases. This is only possible because we have many similar problems together; a single problem provides no leverage on the prior.

The two-groups / marginal-density view underlies both branches: Robbins recovers the entire posterior-mean function from the empirical marginal frequencies (Poisson case), while James-Stein estimates a single hyperparameter (the prior variance $A$) from the marginal sum of squares. See [[Empirical Bayes Interpretation of Shrinkage]].

## Examples

> [!example] Baseball batting averages (Efron's Table 1.1)
> Batting averages $z_i$ for **18 major league players** early in the 1970 season are used to predict their true season-long averages $\mu_i$ (computed over ~370 later at-bats). Using the James-Stein estimates (with grand average $\bar{z} = 0.265$), the ratio of total prediction errors was
> $$
> \frac{\sum_{1}^{18}(\hat\mu_i^{(JS)}-\mu_i)^2}{\sum_{1}^{18}(\hat\mu_i^{(MLE)}-\mu_i)^2} = 0.28,
> $$
> a roughly **3.5x improvement** for the empirical Bayes estimates. The full worked numbers are in [[James-Stein Estimator]] and [[Stein's Paradox and Risk Dominance]].

> [!example] Kidney function and age (Efron's Figure 1.2)
> $N = 157$ healthy volunteers had kidney function scored versus age (function decreases with age). To predict the score of a new donor aged 55, the least-squares regression value ($-1.46$) is preferred over the single age-55 volunteer's observed score ($-0.01$). Tukey's term **"borrowing strength"** captures this regression-based "learning from the experience of others." See [[Empirical Bayes Interpretation of Shrinkage]] for the regression-shrinkage form (1.39).

## Connections

- [[Robbins Formula and Poisson Empirical Bayes]] — the nonparametric branch; recover the posterior mean directly from marginal frequencies.
- [[James-Stein Estimator]] — the parametric shrinkage estimator and its grand-mean form.
- [[Stein's Paradox and Risk Dominance]] — why the MLE is inadmissible for $N \geq 3$.
- [[Empirical Bayes Interpretation of Shrinkage]] — estimating the prior, link to hierarchical Bayes and regularization.
- [[Hierarchical Models]] — the fully Bayesian version where the prior gets its own prior.
- [[Partial Pooling as Multiple Comparisons Correction]] — shrinkage as a multiplicity device.
- [[Multiple Comparisons - Bayesian Perspective]] — the testing-side application of EB.

## See Also

- [[Asymptotics and Frequentist Connections]]
- [[Overfitting and Information Criteria]]
- [[_Index]]
