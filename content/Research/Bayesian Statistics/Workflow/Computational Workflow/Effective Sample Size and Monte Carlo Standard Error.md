---
title: "Effective Sample Size and Monte Carlo Standard Error"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/definition
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 11.5, pp. 200-201 (Eq. 11.1-11.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Chains, Iterations, and Effective Sample Size]]"
  - "[[Efficient MCMC]]"
used_by:
  - "[[How Many Digits to Report]]"
  - "[[Fit Fast, Fail Fast]]"
  - "[[Point Estimates and Uncertainties]]"
aliases:
  - "ESS"
  - "Bulk-ESS"
  - "Tail-ESS"
  - "MCSE"
  - "Rank-normal transformation"
---

# Effective Sample Size and Monte Carlo Standard Error

> [!summary]
> The formal definitions behind `ess_bulk`, `ess_tail`, and `mcse_*` in every Stan summary. Two design
> choices distinguish this book's ESS from textbook formulas: the autocorrelations are estimated by
> combining **within-chain numerators with between-chain denominators**, which makes the estimate stable
> and appropriately pessimistic before convergence; and the draws are **rank-normalized** first, which makes
> the diagnostic well defined "**even for distributions with infinite mean or variance, a case where
> previous ESS estimates fail.**"

## Overview

> [!definition] Effective sample size (Ch. 11.5, p. 200)
> "**Simulation draws from MCMC will typically be correlated, and $M$ chains of $N$ iterations will not be as
> useful for most purposes as $MN$ independent draws from the target distribution — even if the chains have
> mixed well.**
>
> **Roughly speaking, the effective sample size (ESS) for a quantity of interest captures how many
> independent draws contain the same amount of information as the dependent sample obtained by the MCMC
> algorithm.**
>
> **We are doing this at the same time we are monitoring mixing, so we use between-chain as well as
> within-chain information in computing the ESS.**"
>
> "**ESS is only an approximate measure of efficiency because in general we are interested in summaries other
> than the posterior mean, but it is helpful in calibrating our intuitions, especially when comparing
> different simulation algorithms.**"
^def-ess

> [!definition] Monte Carlo standard error
> "Given $S = MN$ simulation draws, **the accuracy of the average of the simulation draws of a quantity of
> interest $\theta$ is an estimate of the posterior mean $E(\theta|y)$, and $\text{sd}(\theta)$** [divided by
> the effective sample size] **is called the Monte Carlo standard error (MCSE).**
>
> **Effective sample size, which we call $S_{\text{eff}}$, can be computed by dividing any variance estimate
> for an MCMC estimate by the variance estimate assuming independent draws.**"
>
> Distinguish carefully from the posterior standard deviation — see
> [[Point Estimates and Uncertainties#Univariate summaries]]: as draws increase, **the posterior sd converges
> to a stable value while the MCSE declines to zero.**

## Main Content

### The formulas

> [!definition] ESS from autocorrelations (Eq. 11.1-11.2, Ch. 11.5, p. 201)
> $$
> S_{\text{eff}} = \frac{MN}{\sum_{t=-\infty}^{\infty} \rho_t} = \frac{MN}{1 + 2\sum_{t=1}^{\infty} \rho_t} \tag{11.1}
> $$
> with the autocorrelation at lag $t$ written in the variogram form
> $$
> \rho_t = 1 - \frac{E\big((\theta^s - \theta^{s-t})^2\big)}{2\,\text{var}(\theta)} \tag{11.2}
> $$
^def-ess-formula

> [!important] The key trick: split numerator and denominator across chains
> "**The key idea is that the numerator of this expression, $E((\theta^s - \theta^{s-t})^2)$, can be
> estimated from each individual chain, and the denominator, $2\,\text{var}(\theta)$, can be estimated from
> all the chains mixed together.**
>
> **This enables a more stable estimate of the autocorrelations, and thus effective sample size, even before
> convergence. In particular, if the chains have not mixed well,
> $\dfrac{E((\theta^s - \theta^{s-t})^2)}{2\,\text{var}(\theta)}$ will not approach 1 as $t$ increases, so
> the autocorrelations in (11.2) will not decline to 0, and their infinite sum will be unbounded.**"
>
> **This is the design feature that makes ESS a convergence diagnostic and not merely an efficiency measure.**
> Poorly mixed chains have a within-chain variogram that never reaches the between-chain variance, so the
> autocorrelations plateau above zero and **ESS collapses toward zero automatically** — no separate test
> needed.
>
> **The practical truncation:** "**With chains of length $N$, we can only compute a finite number of terms in
> (11.1), and these become unstable at some point; to estimate the sum we use a truncation rule proposed by
> Geyer (1992).**"
>
> **And the resulting conservatism:** "**The effective sample size $S_{\text{eff}}$ described here is
> different from similar formulas in the literature in that we use multiple chains and between-chain variance
> in the computation, which typically gives us more conservative claims (lower values of $S_{\text{eff}}$)
> compared to single chain estimates, especially when mixing of the chains is poor.**"
^imp-cross-chain-trick

### Rank normalization, and the two ESS variants

> [!definition] The rank-normal transformation (Ch. 11.5, p. 201)
> "**We can make this procedure even more robust by rank-transforming the simulations before computing
> variances and correlations.** For simulation draws $i$, we use
> $$
> z_i = \Phi^{-1}\!\left(\frac{r_i - 3/8}{MN + 1/4}\right)
> $$
> **where $\Phi^{-1}$ is the inverse of the normal cumulative distribution function and $r_i$ is the rank of
> the draw (with all chains mixed together), and then we apply the calculations of $\hat{R}$ and
> $S_{\text{eff}}$ to these transformed ranks $z$ rather than the raw values.**"
>
> (The $3/8$ and $1/4$ are the Blom plotting-position constants, which make the transformed values close to
> normal order statistics.)
^def-rank-normal

> [!definition] Bulk-ESS and Tail-ESS
> **Bulk effective sample size** — "**the effective sample size based on the rank normalized draws.
> Bulk-ESS is useful for diagnosing problems due to trends or different locations of the chains. Further, it
> is well defined even for distributions with infinite mean or variance, a case where previous ESS estimates
> fail.**"
>
> **Tail effective sample size** — "**To get a better sense of the sampling efficiency in the distributions'
> tails, we also compute the minimum of the effective sample sizes of the 5% and 95% quantiles.**"
>
> The pair is reported as `ess_bulk` and `ess_tail` in the Stan summaries throughout this book. The
> thresholds quoted elsewhere: **above 400** as the recommendation (from
> [[Bioassay - A First Probabilistic Program]]), **above 100** as the floor (from
> [[Multiple-Choice Exam - A Full Workflow Walkthrough]]).
^def-bulk-tail-ess

> [!important] ESS is scale-free; MCSE is not
> The practical division of labor, drawn out in [[How Many Digits to Report]]:
> - **ESS** is a **scale-free** check that you probably have enough iterations — "**we don't need to compare
>   ESS values for posterior standard deviations or for domain knowledge of the quantity of interest, making
>   it faster to check that we have high enough ESS for many quantities of interest.**"
> - **MCSE** is what you actually need before reporting a number, because "**high ESS does not alone
>   guarantee certain accuracy, as the MCSE depends also on the quantity of interest.**"
>
> The two can diverge sharply: in the Kilpisjärvi example, ESS is similar for the mean and both tail
> quantiles (3816, 2525, 3153) while the **MCSE for the quantiles is nearly three times that of the mean**
> (0.036 and 0.033 vs. 0.013).

> [!warning] When ESS and MCSE are undefined
> "**Some quantities of interest may have posterior distribution with infinite variance, and then the ESS and
> MCSE are not defined for the expectation. In such cases use, for example, median instead of mean and mean
> absolute deviation (MAD) instead of standard deviation. ESS and MCSE for (non-extreme) quantiles can be
> derived from the (non-extreme) cumulative probabilities that always have finite mean and variance.**"
>
> Note that the rank-normalized **bulk-ESS remains well defined** in these cases even though the
> mean-based MCSE does not — one of the main reasons for the rank transformation.

## Connections

- The cross-chain variogram trick means ESS and $\hat{R}$ are two views of the same computation; both are
  from Vehtari, Gelman, Simpson, et al. (2021), and both are reported together for that reason.
- MCSE turns into a concrete reporting decision in [[How Many Digits to Report]]: **halving MCSE requires
  quadrupling the iterations.**
- ESS as an efficiency measure is how competing algorithms are compared in
  [[Approximate Algorithms and Approximate Models]] — with the ambiguity the book flags at the end of
  §11.5.

## See Also
- [[Chains, Iterations, and Effective Sample Size]] — the convergence context these quantities live in
- [[How Many Digits to Report]] — MCSE applied to a worked example
- [[Point Estimates and Uncertainties]] — posterior sd vs. MCSE
- [[Efficient MCMC]] — BDA3 background on autocorrelation and efficiency
