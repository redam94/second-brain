---
title: EM and Gradient Optimization for the Delayed Feedback Model
tags:
  - source/ingested
  - topic/research-methodology
  - topic/delayed-feedback
  - topic/censoring
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Chapelle 2014 - Modeling Delayed Feedback in Display Advertising.pdf]]"
source_location: "§4-6, pp. 4-8"
date_ingested: 2026-07-03
folder: "Research Methodology/Experimental Design/Delayed and Censored Feedback"
doc_type: paper
depends_on:
  - "[[Survival Analysis]]"
  - "[[Delayed Feedback Model for Conversion Prediction]]"
used_by: []
aliases:
  - Delayed Feedback Model optimization
  - DFM EM algorithm
  - Weighted censored exponential regression
---

# EM and Gradient Optimization for the Delayed Feedback Model

> [!summary]
> Chapelle (2014) fits the joint classifier-plus-delay model of [[Delayed Feedback Model for Conversion Prediction]] two equivalent ways: (1) an **EM algorithm** that infers the latent conversion indicator $C$ and reduces to a weighted logistic regression + a weighted censored exponential regression at each M-step, or (2) **direct gradient descent** on the (non-convex) regularized negative log-likelihood. Both reveal the same interpretable structure: an unlabeled (not-yet-converted) example contributes to the classifier's gradient in proportion to how implausible "still pending" has become, and contributes to the delay model's gradient as a **survival-analysis censored observation whose censoring time is down-weighted** by the same plausibility.

## Overview

The joint likelihood derived in [[Delayed Feedback Model for Conversion Prediction#thm-dfm-likelihood]] has $C$ (whether the user will ever convert) as a **latent variable** for every not-yet-converted example. This note covers how Chapelle actually optimizes that likelihood, which is important both practically (it's the part that makes the model trainable at scale with L-BFGS) and conceptually (it makes explicit the reduction to *weighted survival regression*, tightening the connection to [[Survival Analysis]]).

## Main Content

### Expectation-Maximization

> [!definition] E-step: posterior probability of eventual conversion (Chapelle Eq. 10)
> For an unlabeled example ($y_i=0$), define $w_i := \Pr(C=1\mid X=x_i, Y=0, E=e_i)$. Using Bayes' rule and the censored-survival term derived in [[Delayed Feedback Model for Conversion Prediction]]:
> $$w_i = \Pr(Y=0\mid C=1, X=x_i, E=e_i)\,\Pr(C=1\mid X=x_i) = \exp(-\lambda(x_i)e_i)\,p(x_i)$$
> For a labeled example ($y_i=1$), $w_i=1$ trivially (Eq. 3: observing a conversion resolves $C=1$ with certainty).
^def-em-estep

> [!theorem] M-step: decomposed weighted log-likelihood (Chapelle Eqs. 11–13)
> Treating each unlabeled example as a **soft mixture** of a positive example (weight $w_i$) and a negative example (weight $1-w_i$), the expected complete-data log-likelihood to maximize is:
> $$\sum_i w_i \log p(x_i) + (1-w_i)\log(1-p(x_i)) \;+\; \sum_i \big[\log\lambda(x_i)\big] y_i - \lambda(x_i)\, t_i\, w_i, \qquad t_i := \begin{cases} e_i & y_i=0 \\ d_i & y_i=1\end{cases}$$
> This objective **decomposes** into two independent, convex sub-problems:
> 1. A **weighted logistic regression** for $p(x)$ (soft labels $w_i$).
> 2. A **weighted/censored exponential regression** for $\lambda(x)$ — identical to standard survival-time exponential regression (Kalbfleisch & Prentice §3.5), except each *censored* observation's censoring time $t_i=e_i$ is scaled by $w_i$, the posterior probability that this example is even a "real" (eventually-converting) censored case rather than a true negative. When $w_i$ is small, that observation contributes almost nothing to the delay likelihood.
^thm-em-mstep

This EM approach converges but is a **nested optimization** (each M-step itself requires two inner convex optimizations), which is slow; Chapelle proposes solving the M-step approximately, or bypassing EM altogether with direct gradient descent.

### Direct joint (gradient) optimization

> [!definition] Definition: Regularized negative log-likelihood (Chapelle Eqs. 14–15)
> $$\arg\min_{\mathbf{w}_c,\mathbf{w}_d}\; L(\mathbf{w}_c,\mathbf{w}_d) + \frac{\mu}{2}\big(\lVert \mathbf{w}_c\rVert_2^2 + \lVert \mathbf{w}_d\rVert_2^2\big)$$
> $$L = -\!\!\sum_{i:y_i=1}\!\!\big[\log p(x_i) + \log\lambda(x_i) - \lambda(x_i) d_i\big] \;-\!\!\sum_{i:y_i=0}\!\!\log\big[1-p(x_i)+p(x_i)\exp(-\lambda(x_i)e_i)\big]$$
> This is exactly the likelihood of [[Delayed Feedback Model for Conversion Prediction#thm-dfm-likelihood]], optimized **directly** by L-BFGS rather than via EM. Chapelle notes $L$ is **not convex** overall (Fig. 3 shows two comparable basins in a toy example — low-conversion/short-delay vs. high-conversion/long-delay), though the ambiguity shrinks with more data and caused no observed local-minima issues in practice.
^def-em-joint-objective

The gradients (Eqs. 16–17) make the two limiting behaviors from [[Delayed Feedback Model for Conversion Prediction]] precise: as $\lambda(x_i)e_i\to 0$ an unlabeled example's contribution to $\partial L/\partial \mathbf{w}_c$ vanishes (no information yet); as $\lambda(x_i)e_i\to\infty$ its contribution converges to exactly the ordinary logistic-regression negative-example gradient $1/(1-p(x_i))$ — the model "gives up waiting" and treats it as confirmed-negative, automatically and smoothly, without any hand-tuned matching window.

### Connection to survival analysis, made precise

> [!theorem] Corollary: reduction to censored exponential regression
> In the degenerate case where every user eventually converts ($C\equiv 1$, so $w_i\equiv 1$), the delay term of Eq. 13 becomes a **standard right-censored exponential regression** exactly as in [[Survival Analysis]]: unconverted examples are censored observations at time $e_i$, converted examples are exact event times $d_i$. Without features this has the closed-form MLE
> $$\frac{1}{\hat\lambda} = \frac{\sum_i t_i}{\sum_i y_i}$$
> (total time-at-risk over number of observed events — the classic exponential MLE under censoring). The full Delayed Feedback Model is thus a **generalization of censored survival regression** in which each censored time is additionally down-weighted by the posterior probability $w_i$ that the unit was ever "at risk" of the event at all.
^thm-em-survival-reduction

## Examples

> [!example] Empirical validation against baselines (Chapelle §6.3–6.5, Table 1)
> Against **Naive** (unconverted = negative, underpredicts by 21% on average), **Rescale** (PU-learning correction assuming missing-at-random labels — assumption violated here, underpredicts 5.9% overall but 30% on recent campaigns), **Shifted** (fully-labeled but 30-day-stale training set), and **Short-Term-Conversion** (a two-model heuristic ratio), the jointly-optimized **DFM** achieves the lowest NLL among all non-oracle methods, with its advantage over Shifted and Rescale growing on **recent campaigns** — exactly where censoring bias is most severe and where a live system most needs a correct model.

## Connections

- **Directly fits** the model defined in [[Delayed Feedback Model for Conversion Prediction]]; read that note first for the likelihood being optimized here.
- **Formalizes** the informal link to [[Survival Analysis]]: the M-step's delay sub-problem literally *is* weighted censored exponential regression.
- **Contrasts with** the sequential/regret-based fitting problem in [[Bandit Models with Delayed and Censored Feedback]], which needs *online, anytime* delay-corrected estimators rather than a batch MLE.

## See Also
- [[Delayed Feedback Model for Conversion Prediction]] — the model and likelihood being optimized
- [[Survival Analysis]] — censored exponential regression, the classical special case
- [[Delayed and Censored Feedback - Overview]] — topic overview and reading order
- [[Bandit Models with Delayed and Censored Feedback]] — the online/regret-minimizing analogue
