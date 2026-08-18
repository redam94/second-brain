---
title: "The Typical Set and the Log Posterior Density"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/definition
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 11 intro and 11.1, pp. 193-195 (Figure 11.1)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Expressing a Bayesian Model with Probability Distributions]]"
  - "[[MCMC Basics]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Initial Values, Adaptation, and Warmup]]"
  - "[[Approximations Based on Joint and Conditional Posterior Modes]]"
  - "[[Point Estimates and Uncertainties]]"
aliases:
  - "Typical set"
  - "lp__"
  - "Why the mode is not typical"
  - "The annulus"
---

# The Typical Set and the Log Posterior Density

> [!summary]
> The geometric concept that explains why **optimization and sampling are different problems**. In a
> $d$-dimensional unit normal with large $d$, the region containing almost all the posterior mass is an
> **annulus at distance $\approx \sqrt{d}$ from the origin** — and the mode is not in it. The worked
> 100-dimensional example makes it concrete: the log density **at the mode is $-91.9$**, while the 99%
> typical set spans **$(-162.0, -125.6)$**. Optimization drives straight through the typical set to a
> point that is not representative; HMC must **cycle around the annulus** instead.

## Overview

> [!definition] Typical set via the log posterior density (Ch. 11.1, p. 193)
> Writing
> $$lp = \log p(\theta|y) \qquad\text{(the target function, or log posterior density)}$$
> $$p(lp \mid y) \qquad\text{(the posterior density of the target function)}$$
> the **typical set** (at some level of coverage) is "**the set of parameter values for which the log
> density (the target function) is close to its median.**"
>
> "For all but the simplest models we can only compute $p(\theta|y)$ up to an arbitrary multiplicative
> constant, so **we can only compute $lp$ up to an arbitrary additive constant; this shifting has no
> effect on the values of $\theta$.**"
>
> **The information-theoretic alternative, and why it is not used here.** Another definition is
> $$\left|\log p(\theta|y) + H\right| < \epsilon$$
> for some $\epsilon$, where $H$ is the **entropy**
> $$H = -E(lp \mid y) = -\int \log\big(p(\theta|y)\big)\, p(\theta|y)\, d\theta$$
> "**This can be considered a special case of the concept of typical set in information theory.** … For
> reasons discussed in Gelman (2020c), however, **we prefer the definition of typical set that uses a
> central posterior interval for $lp$.**"
>
> **How to compute it from draws:** "calculate $lp = \log p(\theta|y)$ for each simulation draw, then
> order them and determine their 99% interval, then collect all the vectors $\theta$ that fall in those
> draws."
^def-typical-set

## Main Content

### The geometric picture

> [!important] The annulus, and what it implies about algorithms (Ch. 11.1, p. 194)
> "**In a $d$-dimensional unit normal distribution with a high value of $d$, the typical set looks like an
> annulus or sphere or doughnut, corresponding to the points whose distance from the origin is
> approximately $\sqrt{d}$.**
>
> **This intuition helps us understand the different challenges of optimization, which goes straight to the
> center of the sphere, passing right through the typical set, and Hamiltonian Monte Carlo and similar
> algorithms, which essentially have to cycle around the sphere rather than directly cutting through the
> center.**"
>
> **The consequence stated bluntly:** "**An important consequence is that the posterior mode may not be
> typical.**"

> [!example] The 100-dimensional demonstration (Ch. 11.1, p. 194, Figure 11.1)
> ```r
> library("mvtnorm")
> n_sims <- 1e4
> d <- 100
> theta <- rmvnorm(n_sims, rep(0,d), diag(d))
> lp <- dmvnorm(theta, rep(0,d), diag(d), log=TRUE)
> H <- -mean(lp)
> ```
>
> | Quantity | Value | How obtained |
> |---|---|---|
> | **Entropy $H$** | **141.9** | analytically $0.5d(\log(2\pi)+1)$; here estimated from 10,000 draws "just to keep things simple and general" |
> | **$lp$ at the mode** | $-0.5d\log(2\pi) = \mathbf{-91.9}$ | analytic |
> | **99% typical set for $lp$** | $\mathbf{(-162.0,\, -125.6)}$ | quantiles of the draws |
>
> > **"The mode is not a typical value of the distribution!"**
>
> ```r
> print(quantile(lp, c(0.005, 0.995)))
> typical <- lp > quantile(lp, 0.005) & lp < quantile(lp, 0.995)
> theta_typical <- theta[typical,]
> ```
>
> The interval can also be computed exactly from the $\chi^2_d$ distribution:
> ```r
> -0.5*(d*log(2*pi) + qchisq(c(0.005, 0.995), d))
> ```
>
> **The stated purpose:** "**In an applied analysis there would be no reason to perform this computation; we
> do it here just to clarify the definition. Our use of the typical set is more conceptual, to help us
> understand the different behaviors of optimization and sampling.**"
>
> **Reading Figure 11.1:** "**On the space of $\log p(\theta|y)$, the typical set is the large mass in the
> middle of the distribution; on the space of $\theta$, it is an annulus corresponding to the values that
> are not too near or too far from the mode.**"
^ex-100d-typical-set

> [!important] Why chains start far away and pass through
> "**In optimization or Markov chain simulation it is usual to start far from the mode (because
> high-dimensional space is vast, so it's unlikely that a starting point would happen to be very close to
> the center of the distribution), and then the paths will rapidly move toward the mode, going through the
> typical set in the process.**"
>
> This is the geometry behind the **warmup** phase of [[Initial Values, Adaptation, and Warmup]].

### The typical set is not invariant to reparameterization

> [!warning] Nonlinear transformations change the typical set (Ch. 11.1, p. 195)
> "**If you transform $\theta$ nonlinearly, you'll need to divide the density by the absolute value of the
> determinant of the Jacobian of the transformation, that is, adding $-\log|\det(\text{Jacobian})|$ to the
> log density. The typical set of $\theta$ is the inverse image of a set defined on the log density … and
> changing $\log p(\theta|y)$ by subtracting $\log|\det \text{Jacobian}|$ will change the mapping and thus
> change the inverse image.**
>
> **This is not a big deal, nor is it a problem — if you nonlinearly transform $\theta$, you're changing the
> geometry of the problem, so it makes sense that the typical set changes too. We should just be clear on
> it.**"
>
> **The demonstration.** Define $\phi = \exp(\theta)$ elementwise:
> ```r
> phi <- exp(theta)
> jacobian <- apply(phi, 1, prod)
> lp_phi <- - log(jacobian) + lp
> ```
>
> **What the issue is *not*:** "**The issue here is not about cancellation of density and area in computing
> total probability, nor is it about $E(lp_\phi)$ being different from $E(lp)$.**"
>
> **What it *is*:** "**Rather, the issue is that sets of constant $lp_\phi$ are different from sets of
> constant $lp$. The rule for being in the typical set of $\theta$ is different from the rule for being in
> the typical set of $\phi$, because the inverse image sets are different.**"
^wrn-typical-set-not-invariant

This is why reparameterization is a genuine computational intervention rather than cosmetics — the same
fact that makes the centered/non-centered choice in
[[Modeling Ideas to Address Computing Problems]] matter so much.

> [!important] The conclusion, and its qualification
> "**If we want our simulations to be in the areas of parameter space where $lp = \log p(\theta|y)$ is near
> its expectation, then we don't particularly want to be at the mode of $p(\theta|y)$. By definition, the
> log density is at an extreme value, not at its expectation, when $\theta$ is at its mode.**
>
> **We have just said that we don't want to be right at the mode, but finding the mode-based approximations
> can be sometimes useful**" — see [[Approximations Based on Joint and Conditional Posterior Modes]].

### The algorithmic context

> [!important] What the book fits models with, and what may come next (Ch. 11 intro, p. 193)
> "In the case studies we have used **NUTS-HMC as implemented in Stan** (Hoffman and Gelman 2014; Betancourt
> 2017a; Stan Development Team 2025) **as it is computationally efficient and has a robust and efficient
> implementation.**
>
> **Other HMC variants may become more popular in the future:**
> - **ChEES-HMC** (Hoffman, Radul, and Sountsov 2021) — "**for highly parallel GPU computation**";
> - **delayed-rejection HMC** (Modi, Barnett, and Carpenter 2021) — "**for multiscale posteriors**";
> - **microcanonical HMC** (Robnik et al. 2023) — "**for high-dimensional posteriors.**"
>
> Also worth noting the framing of "fitting": "**While this originally referred to finding a point estimate
> for the parameters, the term 'fitting' now also refers to the process of obtaining simulations or other
> posterior summaries given data.**"

## Connections

- `lp__` in every Stan summary table is this quantity — see
  [[Bioassay - A First Probabilistic Program]] and [[Multiple-Choice Exam - A Full Workflow Walkthrough]].
  Its own $\hat{R}$ and ESS are worth checking because it aggregates all parameters.
- "The mode is not typical" is the geometric version of the argument against modal summaries in
  [[Point Estimates and Uncertainties]].
- Non-invariance under reparameterization is the theoretical basis for why
  [[Failure Modes and Steps Forward|the funnel]] is a property of *parameterization*, not of the model.

## See Also
- [[Initial Values, Adaptation, and Warmup]] — the transient phase from initialization into the typical set
- [[Approximations Based on Joint and Conditional Posterior Modes]] — when mode-based approximations help anyway
- [[HMC and Stan in Practice]] — the algorithm that navigates the annulus
- [[Efficient MCMC]] — BDA3 background
