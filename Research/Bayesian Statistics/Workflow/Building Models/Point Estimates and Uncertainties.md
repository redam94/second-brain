---
title: "Point Estimates and Uncertainties"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 6.2, pp. 106-108 (Figure 6.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Simulation to Express Uncertainty]]"
  - "[[Posterior Sampling and Summarization]]"
used_by:
  - "[[Visualizing High-Dimensional Inference]]"
  - "[[How Many Digits to Report]]"
  - "[[Approximate Algorithms and Approximate Models]]"
aliases:
  - "mad sd"
  - "Shortest probability interval"
  - "Premature collapsing of the wave function"
  - "Why not the mode"
---

# Point Estimates and Uncertainties

> [!summary]
> How to collapse posterior draws into numbers, and when not to. Three practical recommendations:
> **don't use the mode**; prefer **median and mad sd** when the posterior is long-tailed; and use the
> **shortest probability interval** when the distribution butts against a boundary. The deeper point is
> about *joint* summaries — a vector of good marginal estimates can land far outside the joint
> posterior (the banana), and even with clean geometry, **the curve at the posterior mean is not the
> mean of the curves.**

## Overview

> [!important] The estimate is the distribution
> "**Whatever summary is chosen, the 'estimate' remains the posterior distribution (or functions of it),
> not the summary.**"
>
> Communicating uncertainty is a challenge at every stage: encoding prior information while accounting
> for data variation and model uncertainty; summarizing the posterior; and finally **interpreting**
> uncertain inferences — "for example Gigerenzer, Hertwig, et al. (2005) discuss the challenges even of
> a simple question such as **the probability of rain tomorrow.**"

### Why not the mode

> [!warning] Against the posterior mode (Ch. 6.2, pp. 106-107)
> Classical inference uses the MLE with a standard error from the curvature of the log likelihood at the
> estimate; the Bayesian analogue uses the posterior mode and curvature there (BDA3 §4.1-4.2).
>
> "**In general however, we recommend not using the mode. The mode is not the only point summary of a
> distribution, and it can be misleading if the distribution is highly skewed, which can be more of a
> problem for a joint mode in high dimensions.**"
>
> **The concrete illustration.** In least squares regression with $k$ predictors,
> $y_i \sim \text{normal}(X_i\beta, \sigma)$:
> $$\hat\sigma_{\text{MLE}} = \sqrt{\frac{\sum_{i=1}^n (y_i - X_i\hat\beta)^2}{n}} \qquad\text{but}\qquad \hat\sigma_{\text{adj}} = \sqrt{\frac{\sum_{i=1}^n (y_i - X_i\hat\beta)^2}{n-k}}$$
> **"has lower mean squared error."** The mode is not even optimal for the simplest possible case.
>
> **The one advantage of the mode:** "they are **easy to compute using optimization.**" But "in general
> we prefer to use posterior simulation draws, in which case it is easy enough to estimate the posterior
> mean and standard deviation of any model parameter or quantity of interest using the sample mean and
> standard deviation of its simulation draws."

## Main Content

### Univariate summaries

> [!definition] Posterior sd is not Monte Carlo standard error (Ch. 6.2, p. 107)
> When reporting the posterior **mean**, also report the **standard deviation of the posterior
> simulations**. "This is a computation of the **posterior standard deviation**, not the **Monte Carlo
> standard error (MCSE)** of the mean."
>
> **The asymptotic behavior distinguishes them:** "As the number of simulation draws increases, **the
> posterior standard deviation of the simulations should converge to a stable value $\text{sd}(\theta|y)$,
> while the MCSE should decline to zero.**"
>
> "**The MCSE is useful to give a sense of computational uncertainty, but, for most problems, once the
> chains have mixed well, the posterior standard deviation is more relevant for making inferences from
> the fitted model.**" See [[Effective Sample Size and Monte Carlo Standard Error]].
^def-posterior-sd-vs-mcse

> [!definition] The mad sd (Ch. 6.2, p. 107)
> $$\text{mad sd}(z) = 1.483 \cdot \text{median}\left(|z - \text{median}(z)|\right)$$
> "where the factor of **1.483** is to place this on the scale of the normal distribution: **if
> $z \sim \text{normal}(\mu,\sigma)$, then $\text{median}(z) = \mu$ and $\text{mad sd}(z) = \sigma$.**"
>
> **Why use it:** "The advantage of these median-based summaries is that they are **more computationally
> stable, which can matter for long-tailed posterior distributions.**"
>
> (The book elsewhere quotes the factor as 1.48; 1.483 is the more precise value — $1/\Phi^{-1}(0.75)$.)
^def-mad-sd

> [!definition] Central vs. shortest probability intervals
> **Central intervals** are the default: the 25% and 75% quantiles of the draws for a 50% interval, the
> 5% and 95% quantiles for a 90% interval.
>
> **But:** "when a distribution **butts up against a boundary**, the central interval will **never reach
> the edge.** Then it can make more sense to summarize by the **shortest probability interval**,
> computed as the shortest interval containing the specified percentage of draws" (Liu, Gelman, and
> Zheng 2015). "These shortest intervals are also called **highest posterior density intervals.**"
^def-spin

> [!warning] When no point summary works
> "**There are posterior distributions for which no point summary makes sense**, for example for a scalar
> summary with **multiple modes**. In multiple dimensions, **it is possible for each parameter to have a
> reasonable point estimate, but these estimates might not together be compatible with the joint
> distribution.**"
>
> **The practical exception the authors flag:** "For parameters that are **constrained to be positive
> for which not much information is available** (for example, **the scale parameter in a multilevel model
> with a small number of groups**), the posterior will typically have a **long tail, and an interval can
> be more useful than a point estimate and uncertainty.**" — precisely the $\tau$ of the
> [[Relating a Model to Subject-Matter Assumptions|8 schools model]].

### Multivariate summaries: two ways marginals mislead

> [!warning] The banana (Ch. 6.2, p. 108)
> "Consider a two-dimensional problem with a **banana-shaped posterior** with marginal posterior mean
> (or median) estimates $\hat\theta_1$ and $\hat\theta_2$: **the point $(\hat\theta_1, \hat\theta_2)$ can
> be far from the main mass of the joint distribution even if each parameter estimate is a good summary
> on its own.**" (Shen and Broderick 2025 supply simple examples.)
>
> **The recommendation:** "resolve this problem by **propagating the joint uncertainty using the full
> simulation draws and then summarizing quantities of interest as needed, rather than trying to work
> with a point estimate of the parameter vector.**"
>
> > **"By analogy to quantum physics, we refer to this as avoiding premature collapsing of the wave
> > function."**
^wrn-banana

> [!example] Even with clean geometry: the curve at the mean ≠ the mean of the curves (Figure 6.2)
> Revisiting the bioassay logistic regression of [[Bioassay - A First Probabilistic Program]], with
> $E(y|x,a,b) = \text{logit}^{-1}(a+bx)$.
>
> **The quantity of interest**, averaging over the posterior:
> $$E(y \mid x, \text{data}) = \int E(y \mid x,a,b)\; p(a,b \mid \text{data})\; da\, db$$
> "We don't have to evaluate any integrals to compute this; **we just average $E(y|x,a,b)$ over our
> simulation draws of $a,b$, computing this at a grid of $x$ values** in the range being graphed."
>
> **The result:** "$E(y|x,\text{data})$ has a **shallower curve** than $E(y|x,\hat{a},\hat{b})$, **as a
> consequence of the nonlinearity of the logit transformation.**"
>
> Figure 6.2b plots both: the blue curve uses the posterior **mode** of $(a,b)$; the red curve averages
> over the posterior. "**The red curve is a better summary of the fitted model.**"
>
> This is the general phenomenon — for a nonlinear $h$, $E[h(\theta)] \neq h(E[\theta])$ — made
> visible. It is the same warning as the $a/b$ ratio in
> [[Simulation to Express Uncertainty]], now applied to a whole fitted curve rather than a scalar.

### When any summary will do

> [!important] The reassuring caveat
> "**Our posterior distributions for quantities of interest are typically well behaved, and any summary
> will work reasonably well.**"
>
> The advice above matters at the margins: long tails, boundaries, multimodality, and nonlinear
> transformations. The default of *median and mad sd per parameter* is fine most of the time — which is
> why it is what Stan's `print()` produces.

## Connections

- "Avoid premature collapsing of the wave function" is the same rule as
  [[Simulation to Express Uncertainty|"simulate first, summarize last"]], stated for parameter vectors
  rather than derived scalars.
- The mode's shortcomings here are why [[Approximate Algorithms and Approximate Models]] treats
  optimization-based approximations (Laplace, variational) as *approximations to be checked* rather
  than as estimators.
- How many digits of a summary are meaningful is a separate question, treated in
  [[How Many Digits to Report]].

## See Also
- [[Simulation to Express Uncertainty]] — where the draws come from and how to propagate them
- [[Visualizing High-Dimensional Inference]] — displaying many parameters at once without collapsing
- [[Effective Sample Size and Monte Carlo Standard Error]] — the MCSE this section distinguishes from sd
- [[Posterior Sampling and Summarization]] — BDA3 background
