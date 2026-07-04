---
title: Delayed Feedback Model for Conversion Prediction
tags:
  - source/ingested
  - topic/research-methodology
  - topic/delayed-feedback
  - topic/censoring
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Chapelle 2014 - Modeling Delayed Feedback in Display Advertising.pdf]]"
source_location: "§2-3, pp. 1-4"
date_ingested: 2026-07-03
folder: "Research Methodology/Experimental Design/Delayed and Censored Feedback"
doc_type: paper
depends_on:
  - "[[Survival Analysis]]"
  - "[[Delayed and Censored Feedback - Overview]]"
used_by:
  - "[[EM and Gradient Optimization for the Delayed Feedback Model]]"
  - "[[Bandit Models with Delayed and Censored Feedback]]"
aliases:
  - Delayed Feedback Model
  - DFM
  - Chapelle 2014 conversion model
---

# Delayed Feedback Model for Conversion Prediction

> [!summary]
> Chapelle (2014) models **post-click conversion probability** in display advertising, where conversions can occur up to 30 days after a click. Labeling every not-yet-converted click as a negative example (the **Naive** approach) systematically underestimates the conversion rate, most severely for the freshest data. The fix is a **jointly-trained pair of models** — a logistic-regression classifier $\Pr(C=1\mid X)$ for "will this click ever convert" and an exponential hazard model $\Pr(D\mid X, C=1)$ for "how long until it converts, given it does" — combined into a single likelihood that treats a not-yet-converted click as **right-censored** rather than negative.

## Overview

In a cost-per-conversion (CPA) ad marketplace, the value of an impression is $\text{eCPM} = \text{CPA}\times\Pr(\text{click})\times\Pr(\text{conversion}\mid\text{click})$ (Eq. 1). Estimating $\Pr(\text{conversion}\mid\text{click})$ accurately is essential, but conversions can lag the click by minutes to weeks: on Criteo's data, only 35% of conversions happen within an hour, ~50% after 24 hours, and 13% after two weeks (Fig. 1).

### Why naive labeling is biased

Building a training set requires deciding, for each click, whether it "counts" as a positive or negative example. Two bad options bracket the problem:
- **Short matching window**: label a click negative if no conversion is seen within, say, 2 days. Many of these will convert later — they are **mislabeled false negatives**, biasing the conversion-rate estimate down.
- **Long matching window** (e.g. 30 days): correctly labeled, but the training set is now at least 30 days stale, producing a **stalled model** that can't react to new campaigns (Criteo saw new-campaign traffic reach 11.3% of volume after just 26 days — Fig. 2, §2.4).

Chapelle's solution avoids a matching window altogether: a click is labeled **positive** if a conversion is observed, and left **unlabeled** (not negative) otherwise, since a conversion may still occur in the future. This is learning from positive-and-unlabeled (PU) data — but with a crucial twist that breaks standard PU-learning theory (Elkan & Noto 2008): those methods assume a positive example's label is missing *at random* (missing-label probability constant). Here it is not — **the probability that a label is still missing depends strongly on the elapsed time since the click**, which is exactly why a second, explicit delay model is needed.

## Main Content

### Random variables and notation

Each click event is characterized by five variables (Chapelle §3):

| Symbol | Meaning |
|---|---|
| $X$ | feature vector |
| $Y\in\{0,1\}$ | has a conversion **already** been observed |
| $C\in\{0,1\}$ | will the user **ever** convert (latent if $Y=0$) |
| $D$ | delay between click and conversion (undefined if $C=0$) |
| $E$ | elapsed time since the click |

> [!definition] Core relations (Chapelle Eqs. 2–4)
> $$Y = 0 \iff C = 0 \text{ or } E < D \qquad\qquad Y = 1 \implies C = 1$$
> i.e. "no conversion observed yet" means either the user will *never* convert, or the conversion just hasn't had time to happen. If a conversion **has** occurred, $C$ is trivially resolved to 1.
>
> The only independence assumption needed is that $(C,D)\perp E \mid X$:
> $$\Pr(C, D \mid X, E) = \Pr(C, D\mid X)$$
> (elapsed time only affects whether the conversion has been *observed* yet, not the underlying propensity/delay).
^def-dfm-variables

This is a direct generalization of [[Survival Analysis|classical right-censoring]]: a not-yet-converted click with elapsed time $E$ is right-censored at $E$ — we know the (potential) conversion delay is at least $E$. The departure from standard survival analysis is that survival analysis assumes the event is certain eventually (every patient dies); here $C=0$ (never converts) is a first-class outcome, which is why a *separate* Bernoulli model for $C$ is required in addition to the delay/hazard model for $D$.

### The joint model

Two generalized linear models are fit jointly:

> [!definition] Definition: Conversion classifier and delay model (Chapelle Eq. 5)
> $$\Pr(C=1\mid X=x) = p(x) = \frac{1}{1+\exp(-\mathbf{w}_c\cdot x)} \qquad\text{(logistic regression)}$$
> $$\Pr(D=d \mid X=x, C=1) = \lambda(x)\exp(-\lambda(x) d), \qquad \lambda(x) = \exp(\mathbf{w}_d\cdot x) \qquad\text{(exponential hazard)}$$
> $\lambda(x)$ is the **hazard function** of survival analysis, feature-dependent via a log-linear parametrization that guarantees $\lambda(x) > 0$. Other delay distributions (Weibull, Gamma, Log-Normal) are possible, but exponential fits the empirical Criteo delay distributions well (Fig. 5, §6.2), aside from some short/long-delay mismatch consistent with a mixture of a short and a long timescale.
^def-dfm-joint-model

### The likelihood

> [!theorem] Theorem: Delayed-feedback likelihood (Chapelle Eqs. 6, 8–9)
> **Observed conversion** ($y_i=1$, with observed delay $d_i$):
> $$\Pr(Y=1, D=d_i\mid X=x_i, E=e_i) = \lambda(x_i)\exp(-\lambda(x_i)d_i)\, p(x_i)$$
> **No conversion observed yet** ($y_i=0$, elapsed time $e_i$) — obtained via the law of total probability over $C$, using $\Pr(D>E\mid C=1,X,E)=\int_{e_i}^\infty \lambda(x)e^{-\lambda(x)t}\,dt = \exp(-\lambda(x_i)e_i)$:
> $$\Pr(Y=0\mid X=x_i, E=e_i) = \underbrace{1-p(x_i)}_{\text{never converts}} + \underbrace{p(x_i)\exp(-\lambda(x_i)e_i)}_{\text{will convert, but }D>e_i\text{ (censored)}}$$
> This single expression is the crux of the method: it is a **mixture** of "true negative" and "positive-but-censored," weighted by the classifier's own $p(x_i)$ and the delay survival function $\exp(-\lambda(x_i)e_i)$ evaluated at the elapsed time. It correctly discounts the "certainly a negative" interpretation as $e_i$ grows relative to the predicted mean delay $\lambda(x_i)^{-1}$.
^thm-dfm-likelihood

Two limiting regimes make the mixture interpretable (used later to derive gradients in [[EM and Gradient Optimization for the Delayed Feedback Model]]):
- $\lambda(x_i)e_i \ll 1$ (elapsed time short vs. predicted mean delay): the click looks statistically like "too early to tell" and contributes almost no gradient signal to the classifier — correctly, since we cannot yet infer non-conversion.
- $\lambda(x_i)e_i \gg 1$ (elapsed time long vs. predicted mean delay): the mixture collapses onto the negative-class term, and the click is effectively treated as a confirmed negative, exactly like ordinary logistic regression.

### Why this needs both models, jointly

The paper stresses that $p(x)$ and $\lambda(x)$ **cannot be identified separately from unlabeled examples**: observing many clicks without conversions is consistent both with a *low conversion rate and a short delay* and with a *high conversion rate and a long delay* — the negative log-likelihood surface has (at least) two comparable basins (Fig. 3, a toy example with 1 positive and 10 unlabeled samples). This ambiguity is a small-sample phenomenon; the paper reports it vanishes as data accumulates and was not observed to cause local-minima problems in practice (§4.2).

## Examples

> [!example] Toy convergence example (Chapelle §6.1, Fig. 4)
> Simulated data with true conversion rate $p=0.1$ and delays $\sim\text{Exponential}(\text{mean}=4\text{ days})$, no features (constant $p,\lambda$), retrained daily. The proposed **DFM** model recovers the true conversion rate accurately after just **2 days** of data (less than the 4-day mean delay), whereas the **Naive** method (unconverted clicks = negatives) systematically underpredicts, especially early in a campaign — directly illustrating the bias this note opened with.

> [!example] Real-traffic evaluation (Chapelle §6, Table 1)
> On Criteo logs (7 test days, 3-week rolling training windows, ~6M examples/day), DFM improves negative log-likelihood by ~3% over Naive overall, and even more on **recent campaigns** (where staleness/censoring bias is worst), beating a Shifted-window baseline (unbiased but 30 days stale), a Rescale baseline (PU-learning correction assuming missing-at-random labels), and a Short-Term-Conversion heuristic — approaching the Oracle upper bound (labels revealed by looking into the future).

## Connections

- **Generalizes** [[Survival Analysis|right-censored survival regression]]: in the degenerate case where every user eventually converts ($C\equiv 1$), the delay-model term of the joint log-likelihood reduces exactly to a standard censored exponential regression (Kalbfleisch & Prentice §3.5), with a closed-form MLE $1/\hat\lambda = \sum_i t_i / \sum_i y_i$ for the no-features case.
- **Fitting** this joint model (via EM or direct gradient descent) is covered in [[EM and Gradient Optimization for the Delayed Feedback Model]].
- **Extended into sequential decision-making** by [[Bandit Models with Delayed and Censored Feedback]], which adds a hard observation-window censoring mechanism and formal regret bounds on top of this same $(C,D)$ structure.

## See Also
- [[Delayed and Censored Feedback - Overview]] — how this fits with the bandit-theoretic extension
- [[Survival Analysis]] — the right-censoring concept this model generalizes with an added "never happens" outcome
- [[EM and Gradient Optimization for the Delayed Feedback Model]] — how $p(x)$ and $\lambda(x)$ are actually fit
- [[Bandit Models with Delayed and Censored Feedback]] — the same $(C,D)$ structure inside a regret-minimizing bandit
