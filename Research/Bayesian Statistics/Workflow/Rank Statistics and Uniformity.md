---
title: Rank Statistics and Uniformity
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/theorem
  - doc/paper
source: "[[raw/1804.06788-Talts-SBC.pdf]]"
source_location: "Sec. 4.1 & Appendix B, pp. 5, 18-19 (Thm. 1/2, Eqs. 2-4.1)"
date_ingested: 2026-06-17
date_updated: 2026-07-13
folder: "Bayesian Statistics/Workflow"
doc_type: paper
depends_on:
  - "[[Data-Averaged Posterior Self-Consistency]]"
used_by:
  - "[[The SBC Algorithm]]"
  - "[[Interpreting SBC Histograms]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Q - Four Meanings of Calibration]]"
aliases:
  - Rank Statistic
  - SBC Uniformity Theorem
---

# Rank Statistics and Uniformity

> [!summary]
> The core SBC theorem: if a prior draw $\tilde\theta$ and its posterior sample $\{\theta_1,\dots,\theta_L\}$ come from a correctly computed analysis, then the **rank** of any one-dimensional function of $\tilde\theta$ among the posterior values is *uniformly distributed* over the integers $0,\dots,L$. This converts the data-averaged posterior identity into a sharp, artifact-free, integer-valued test of computational correctness.

## Overview

Cook, Gelman & Rubin (2006) tested an empirical *CDF* value, which is continuous-in-principle but discrete in practice and prone to boundary artifacts. SBC instead tests a **rank statistic**, which is inherently integer-valued and admits an *exact* uniform distribution under correct computation — no continuity correction or asymptotics required. This sidesteps the discretization and central-limit-theorem problems described in [[Simulation-Based Calibration - Overview]].

## Main Content

Consider one iteration of the generative-then-fit process:
$$\tilde\theta \sim \pi(\theta), \qquad \tilde y \sim \pi(y \mid \tilde\theta), \qquad \{\theta_1,\dots,\theta_L\} \sim \pi(\theta \mid \tilde y). \tag{2}$$
By the self-consistency identity (see [[Data-Averaged Posterior Self-Consistency]]), the prior draw $\tilde\theta$ and an *exact* posterior sample are distributed according to the same distribution.

> [!definition] Rank statistic (Eq. 4.1)
> For any one-dimensional random variable / test function $f:\Theta \to \mathbb{R}$, the **rank statistic** of the prior draw relative to the posterior sample is the number of posterior values whose $f$-image falls below the prior draw's:
> $$r\big(\{f(\theta_1),\dots,f(\theta_L)\},\, f(\tilde\theta)\big) = \sum_{l=1}^{L} \mathbb{I}\big[f(\theta_l) < f(\tilde\theta)\big] \;\in\; \{0,1,\dots,L\}.$$
> Here $L$ is the number of posterior draws, $\theta_l$ the $l$-th posterior draw, $\tilde\theta$ the prior draw (ground truth), and $\mathbb{I}[\cdot]$ the indicator. There are $L+1$ possible rank values (the prior draw can fall in any of the $L+1$ gaps among the $L$ ordered posterior values).
> ^def-rank

> [!theorem] Theorem 1 — Uniformity of the rank statistic
> Let $\tilde\theta \sim \pi(\theta)$, $\tilde y \sim \pi(y \mid \tilde\theta)$, and $\{\theta_1,\dots,\theta_L\} \sim \pi(\theta \mid \tilde y)$ for *any* joint distribution $\pi(y,\theta)$. Then the rank statistic of any one-dimensional random variable over $\theta$ is **uniformly distributed over the integers** $[0,L]$ (i.e. each of the $L+1$ values has probability $\tfrac{1}{L+1}$).
> **Conditions (made explicit in Appendix B / Theorem 2):** the $L$ posterior draws $\{\theta_1,\dots,\theta_L\}$ must be sampled *independently* from the *exact* posterior $\pi(\theta\mid\tilde y)$ (the proof uses order statistics and assumes independence); the pushforward posterior densities must be absolutely continuous (no ties). Both independence and correct (exact) sampling are required — violating either breaks uniformity, which is exactly what makes deviations diagnostic.
> ^thm-uniformity

**Proof sketch (Appendix B).** Relabel the posterior draws so $f_1 \le f_2 \le \dots \le f_L$ (with $f_l = f(\theta_l)$, $\tilde f = f(\tilde\theta)$). Writing the PMF of the rank via the multinomial/order-statistic combinatorial factor $\tfrac{L!}{r!(L-r)!}$ and the events $\{f_l < \tilde f\}^r$, $\{f_l \ge \tilde f\}^{L-r}$, one uses that conditioning on $\tilde y$ makes the posterior draws independent of the conditioning configuration, $\pi(f_l \mid f, y) = \pi(f_l \mid y)$, and crucially that **the model used to simulate the data is the same as the one used to fit it**, so $\pi(f_l \mid y) = \pi(f \mid y)$ (the posterior draw and the prior draw share a distribution given $y$). Substituting the probability-integral change of variables $u(y) = \int_{-\infty}^{f} \mathrm{d}f'\,\pi(f'\mid y)$ collapses the inner integral to $\int_0^1 u^r (1-u)^{L-r}\,\mathrm{d}u = \tfrac{r!(L-r)!}{(L+1)!}$ (a Beta integral). The combinatorial prefactor cancels it, leaving
$$\pi(r) = \frac{1}{L+1}\int \mathrm{d}y\,\pi(y) = \frac{1}{L+1},$$
uniform over the $L+1$ ranks. $\square$

**Why ranks, not CDF values.** The rank is integer-valued by construction, so the uniform distribution is *discrete uniform* on $\{0,\dots,L\}$ — exact and finite-sample, with no $\Phi^{-1}$-at-0-or-1 boundary problem and no continuity correction (contrast Cook, Gelman & Rubin 2006 / Blom 1958).

## Examples

> [!example] Multidimensional models
> **Setup:** $\theta$ has many components. **Result:** compute a separate rank statistic (and histogram) for each one-dimensional function $f$ of interest — e.g. each parameter, or a derived quantity like a regional average. **Interpretation:** because the theorem holds for *any* one-dimensional $f$, SBC can target inferentially important summaries; the procedure is simply repeated per quantity (see [[The SBC Algorithm]]).
> ^ex-multidim

> [!example] Correct sampler → uniform ranks
> **Setup:** Stan (dynamic HMC) on a linear regression, $L=100$. **Result:** the rank histogram is consistent with discrete uniform $U[0,100]$ within the expected variation (Fig. 2). **Interpretation:** confirms correct posterior sampling — the opposite of the spurious deviations the old CDF-based procedure produced on the same model (Fig. 1).
> ^ex-correct

## Connections

- **Depends on:** [[Data-Averaged Posterior Self-Consistency]] — the rank theorem is the testable embodiment of that identity.
- **Used by:** [[The SBC Algorithm]] (computes and histograms ranks); [[Interpreting SBC Histograms]] (deviations from uniformity diagnose error type); [[Simulation-Based Calibration - Overview]].
- **Caveat:** the independence condition is violated by autocorrelated MCMC draws → handled by thinning in [[Interpreting SBC Histograms]] and Algorithm 2.

## See Also

- [[Data-Averaged Posterior Self-Consistency]]
- [[The SBC Algorithm]]
- [[Interpreting SBC Histograms]]
- [[Simulation-Based Calibration - Overview]]
- [[MCMC Basics]]
- [[SBC Case Studies]] — the empirical demonstration of these theorems: ∪-shape (misspecified prior), sloped histogram (biased HMC), ADVI failure, subtle INLA bias via ECDF-difference
