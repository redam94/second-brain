---
title: Empirical Bayes Interpretation of Shrinkage
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/textbook
source: "[[raw/Efron - Empirical Bayes and the James-Stein Estimator (LSI Ch1).pdf]]"
source_location: "Ch. 1, pp. 4-11"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Inference Fundamentals/Empirical Bayes"
doc_type: textbook
depends_on:
  - "[[James-Stein Estimator]]"
  - "[[Robbins Formula and Poisson Empirical Bayes]]"
  - "[[Empirical Bayes - Overview]]"
used_by:
  - "[[Hierarchical Models]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Gamma-Gamma Model of Monetary Value]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Parametric Empirical Bayes
  - Estimating the Prior
  - Shrinkage as Empirical Bayes
  - Borrowing Strength
---

# Empirical Bayes Interpretation of Shrinkage

> [!summary]
> Shrinkage estimators are **Bayes estimators with an estimated prior**. The James-Stein factor $(N-2)/S$ is nothing but an estimate of the prior shrinkage term $1/(A+1)$, formed from the marginal distribution of the pooled data. This *parametric empirical Bayes* viewpoint links the [[James-Stein Estimator]] to **hierarchical Bayesian models** (where the prior gets its own prior) and to **regularization / partial pooling**: shrinkage, ridge-type penalties, and random-effects models all "borrow strength" by learning a prior from many parallel cases. Efron frames it as **"learning from the experience of others."**

## Overview

The defining feature of empirical Bayes is that the prior is **not assumed but estimated**. Two equivalent readings of the [[James-Stein Estimator]]:

- **Frequentist:** a clever biased estimator that dominates the MLE for $N \geq 3$ (see [[Stein's Paradox and Risk Dominance]]).
- **Empirical Bayes:** the Bayes rule $\hat\mu^{(Bayes)} = (1 - \tfrac{1}{A+1})\boldsymbol{z}$ with the unknown hyperparameter replaced by a data estimate.

Both readings describe the same shrinkage. The EB reading is the bridge to modern hierarchical modeling and regularization.

## Main Content

> [!definition] Parametric empirical Bayes: estimate the hyperparameter ^parametric-eb
> Under $\mu_i \sim \mathcal{N}(M,A)$, $z_i\mid\mu_i \sim \mathcal{N}(\mu_i,\sigma_0^2)$, the Bayes posterior mean (eqs. 1.32-1.34) is
> $$
> \hat\mu_i^{(Bayes)} = M + B(z_i - M), \qquad B = \frac{A}{A+\sigma_0^2}.
> $$
> The hyperparameters $(M, A)$ are unknown, so we **estimate them from the marginal** $z_i \sim \mathcal{N}(M, A+\sigma_0^2)$: $\hat M = \bar z$ and the shrinkage factor from $E\{(N-3)\sigma_0^2/S\} = 1 - B$. Plugging in gives the EB estimator (eq. 1.35)
> $$
> \hat\mu_i^{(JS)} = \bar z + \left(1 - \frac{(N-3)\sigma_0^2}{S}\right)(z_i - \bar z).
> $$
> The shrinkage factor is **learned**, not specified — this is the essence of parametric EB.

> [!definition] Shrinkage toward a regression line (borrowing strength via covariates) ^reg-shrinkage
> The prior mean can itself depend on covariates: $\mu_i \overset{ind}{\sim} \mathcal{N}(M_0 + M_1\cdot\text{age}_i,\, A)$ (eq. 1.38). The EB estimate (eq. 1.39) then shrinks toward the **fitted regression line** $\hat\mu_i^{(reg)} = \hat M_0 + \hat M_1\cdot\text{age}_i$:
> $$
> \hat\mu_i^{(JS)} = \hat\mu_i^{(reg)} + \left(1 - \frac{(N-4)\sigma_0^2}{S}\right)(z_i - \hat\mu_i^{(reg)}), \qquad S = \sum(z_i - \hat\mu_i^{(reg)})^2.
> $$
> Tukey's phrase **"borrowing strength"** captures this: each case is improved by the experience of all the others, here channeled through a regression fit. This is the conceptual ancestor of random-effects regression.

> [!definition] Link to hierarchical Bayes and regularization ^hierarchical-link
> - **Hierarchical Bayes:** instead of *plugging in* point estimates $(\hat M, \hat A)$, place a hyperprior on $(M, A)$ and integrate. EB is the "plug-in" approximation to a fully Bayesian [[Hierarchical Models|hierarchical model]]; it ignores uncertainty in the estimated prior (which EB confidence intervals must later correct for).
> - **Regularization:** the shrinkage factor $B < 1$ is mathematically a **ridge/penalty** pulling estimates toward a center; minimizing $\sum(z_i-\mu_i)^2 + \lambda\sum(\mu_i-\bar z)^2$ reproduces shrinkage, with $\lambda$ the EB-estimated penalty. Shrinkage trades a little bias for a large variance reduction — the bias-variance tradeoff underlying [[Overfitting and Information Criteria]].
> - **Robbins (nonparametric EB):** the same "estimate the prior from the marginal" idea, but recovering the *entire* posterior-mean curve rather than one hyperparameter (see [[Robbins Formula and Poisson Empirical Bayes]]).

> [!definition] Schematic: case 1 learning from the others (Efron Fig. 1.1) ^learning-from-others
> The $N-1$ "other" cases are observed first, yielding estimates $(\hat M, \hat A)$ of the prior parameters. The estimated prior $\mathcal{N}(\hat M, \hat A)$ then **supplements the direct evidence** $z_1 \sim \mathcal{N}(\mu_1, 1)$ for estimating $\mu_1$. (In practice $\hat\mu_1^{(JS)}$ uses $z_1$ along with the others, which improves accuracy.) "Which others?" is the central design question — with thousands of parallel cases the borrowed experience is vast.

## Examples

> [!example] Baseball: shrinkage = estimated prior in action (Efron Table 1.1)
> With $\bar z = 0.265$, $\sigma_0^2 = \bar z(1-\bar z)/45$, the estimated shrinkage factor $1 - (N-3)\sigma_0^2/S$ pulls all 18 players toward $0.265$. Clemente ($z = .400$) is shrunk to $\hat\mu^{(JS)} = .294$; Alvis ($z = .156$) is pulled up to $.242$. The shrinkage factor was never assumed — it was estimated from how spread out the 18 averages are (the marginal $S$). The result: prediction error ratio $0.28$ vs the MLE.

> [!example] Limited translation = protecting against a misestimated prior
> Because EB plugs in a single estimated prior, outliers (Clemente) can be over-shrunk. The limited-translation estimator $\hat\mu_i^{(D)}$ (eq. 1.37) with $D = 1$ caps deviation at $\sigma_0 = 0.066$, so Clemente's prediction becomes $\hat\mu_1^{(D)} = 0.334$ rather than $\hat\mu_1^{(JS)} = 0.294$, losing only ~10% of the overall JS advantage. This is a pragmatic acknowledgment that the estimated prior is imperfect for unusual cases.

## Connections

- [[James-Stein Estimator]] — the shrinkage estimator interpreted here as estimated-prior Bayes.
- [[Robbins Formula and Poisson Empirical Bayes]] — the nonparametric form of estimating the prior.
- [[Stein's Paradox and Risk Dominance]] — why the estimated-prior shrinkage still wins frequentist-wise.
- [[Hierarchical Models]] — the fully Bayesian version that integrates over the prior's uncertainty.
- [[Partial Pooling as Multiple Comparisons Correction]] — partial pooling is shrinkage with an estimated prior.
- [[Overfitting and Information Criteria]] — shrinkage/regularization and the bias-variance tradeoff.
- [[Empirical Bayes - Overview]] — the umbrella program.

## See Also

- [[Multiple Comparisons - Bayesian Perspective]]
- [[Asymptotics and Frequentist Connections]]
- [[_Index]]
- [[Gamma-Gamma Model of Monetary Value]] — a marketing example of shrinkage toward the population mean
