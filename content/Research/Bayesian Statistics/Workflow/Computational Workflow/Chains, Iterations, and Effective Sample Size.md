---
title: "Chains, Iterations, and Effective Sample Size"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 11.4, pp. 197-199 (Figure 11.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Initial Values, Adaptation, and Warmup]]"
  - "[[MCMC Basics]]"
  - "[[Efficient MCMC]]"
used_by:
  - "[[Effective Sample Size and Monte Carlo Standard Error]]"
  - "[[How Many Digits to Report]]"
  - "[[Fit Fast, Fail Fast]]"
aliases:
  - "R-hat"
  - "Rhat"
  - "Potential scale reduction factor"
  - "R-star"
  - "Four chains"
  - "Traceplots"
---

# Chains, Iterations, and Effective Sample Size

> [!summary]
> How many chains, how long, and how to know when to stop. The section's most useful corrective is
> arithmetic: **10 independent draws already give a posterior-mean estimate only $\sqrt{1.1} = 1.05$ times
> as uncertain as infinite draws.** "**Just 10 simulations are enough to obtain posterior accuracy within
> 5% of the computational ideal.**" The reason we run thousands is not accuracy but **diagnostics** — "we
> don't usually need a lot of simulation draws, but we do want them to approximately come from the target
> distribution." Recommended defaults: **at least four chains**, run until $\hat{R} < 1.01$ for all
> quantities of interest, with $\hat{R} \approx 1.1$ acceptable during exploration.

## Overview

> [!definition] The two challenges of MCMC (Ch. 11.4, p. 197)
> 1. **Forgetting the initial values.** "**The distribution of simulations depends on initial values, and the
>    user needs to run MCMC long enough that initial values have essentially been forgotten. Even if the
>    initial value would be within the typical set, a single draw is not representative of the
>    distribution.**"
> 2. **Monte Carlo error.** "**Inferences are based on simulations rather than deterministic estimates; as a
>    result the user must account for Monte Carlo error or else average over enough simulation draws that
>    such error is negligible. Markov chain Monte Carlo iterations have dependence, which makes the Monte
>    Carlo error usually larger than with the same number of independent draws.**"
^def-two-mcmc-challenges

> [!definition] Convergence vs. mixing time
> "**With increasing number of MCMC iterations, the draws should collectively represent the posterior better
> and better. Theoretically, convergence of Markov chains can be quantified by measuring some discrepancy
> such as total variation compared to the distribution represented by the draws from the target
> distribution. The convergence can be made faster by discarding the initial transition phase iterations to
> reduce the initial value bias.**
>
> **If a chain is initialized with a draw from the target distribution, the time needed for a chain to
> explore the distribution sufficiently can be called mixing time. As the target distribution is unknown, we
> estimate the convergence and mixing time by comparing several independent Markov chains.**"

## Main Content

### Intuition from independent draws

> [!example] Figure 11.2 — how noisy is a 95% interval? (Ch. 11.4, pp. 197-198)
> Five replications of a 95% interval for a unit normal parameter, from 100 and from 1000 **independent**
> draws. The correct answer is $(-1.96, 1.96)$.
>
> | 100 draws | 1000 draws |
> |---|---|
> | $(-1.79, 1.69)$ | $(-1.83, 1.97)$ |
> | $(-1.80, 1.85)$ | $(-2.01, 2.04)$ |
> | $(-1.64, 2.15)$ | $(-2.10, 2.13)$ |
> | $(-2.08, 2.38)$ | $(-1.97, 1.95)$ |
> | $(-1.68, 2.10)$ | $(-2.10, 1.97)$ |
>
> **Two readings of the same table, both correct:**
> - "**From one perspective, these estimates are pretty bad: even with 1000 simulations, either bound can
>   easily be off by more than 0.1, and the entire interval width can easily be off by 10%.**"
> - "**On the other hand, for the goal of inference about the parameter, even the far-off estimates above
>   aren't so bad: the interval $(-2.08, 2.38)$ has 97% probability coverage, and $(-1.79, 1.69)$ has 92%
>   coverage.**"
>
> **Which reading applies depends on the goal:** "**If the goal is to precisely determine the endpoints of the
> interval to determine if a coefficient is 'statistically significant' or simply to present a replicable
> value for publication, then many simulations are required** — even in this extremely easy problem, 1000
> independent draws are not enough to pin down the interval endpoints to one decimal place. **However, if
> the goal is to get an interval for the mean with approximate 95% coverage in the target distribution, even
> 100 draws are reasonable.**"

> [!important] The 10-draw calculation
> "**For many purposes even 10 simulation draws would be enough. The Monte Carlo standard error of the
> average of 10 independent draws of $\theta$ is $1/\sqrt{10}$ times the standard deviation of $\theta$ in
> the target distribution; thus inference about the posterior mean based on 10 simulations is
> $\sqrt{1.1} = 1.05$ times as uncertain as from infinite draws. Just 10 simulations are enough to obtain
> posterior accuracy within 5% of the computational ideal.**
>
> **This does not tell the whole story — the posterior mean is not the only summary of interest, and 5%
> isn't nothing — but it does convey that just a few simulations are enough to get most of the way there,
> which is one reason that we focus on monitoring convergence. We don't usually need a lot of simulation
> draws, but we do want them to approximately come from the target distribution.**"
>
> **And the qualification that explains the actual defaults:** "**While 10 independent simulation draws might
> be sufficient, 10 or even 100 MCMC iterations are rarely sufficient, as diagnosing convergence and
> measuring the sampling efficiency usually themselves require more iterations to do well.**"
>
> The logic is worth internalizing: **the iteration count is driven by the diagnostics, not by the
> estimate.** The estimate converged long ago; you are paying for the ability to know that.
^imp-ten-draws

### Monitoring convergence with multiple chains

> [!definition] $\hat{R}$, the potential scale reduction factor (Gelman and Rubin 1992)
> "$\hat{R}$ **is computed for each scalar quantity of interest, as the standard deviation of that quantity
> from all the chains included together (after the warmup steps have been discarded), divided by the root
> mean square of the separate within-chain standard deviations.**
>
> **The idea is that [if] the simulations from multiple chains have not mixed well, the variance of all the
> chains mixed together should be higher than the variance of individual chains.**
>
> **At convergence** … "**the ratio $\hat{R}$ should equal 1. If $\hat{R}$ is greater than 1, this implies
> that the chains have not fully mixed and that further simulation might increase the precision of
> inferences.**"
>
> **Robustness improvements:** "For quantities of interest that are far from normally distributed, **it can
> make sense to first perform a rank-normal transformation**" (Vehtari, Gelman, Simpson, et al. 2021); a
> **nested-$\hat{R}$** variant for "a large number of short chains" is given by Margossian, Hoffman, et al.
> (2025).
>
> **The multivariate companion:** "$\hat{R}$ **is used for univariate marginal quantities, and $R^*$**
> (Lambert and Vehtari 2022) **can detect convergence issues jointly for all parameters.**"
^def-rhat

> [!important] The thresholds, with their caveats (Ch. 11.4, p. 198)
> - **Run at least four independent chains by default.** "**Multiple chains are more likely to reveal
>   multimodality and poor adaptation or mixing. Complex, misspecified, or nonidentifiable models arise in
>   our work all the time.**"
> - **$\hat{R} < 1.01$ for all parameters and quantities of interest** for final results.
> - **$\hat{R} \approx 1.1$ is acceptable in early model exploration** (illustrated in Ch. 27).
>
> **Two honest caveats attached to the 1.01 rule:**
> 1. "**We recognize that this rule can declare convergence prematurely, which is one reason why we always
>    recommend comparing results to estimates from simpler models.**"
> 2. "$\hat{R}$ **itself is also stochastic, and if we examine $\hat{R}$ for many quantities, it is possible
>    just by chance that sometimes $\hat{R}$ will be bigger than 1.01, even if the chains are mixing well.**"
>
> **Why not a hypothesis test:** "**We never reach exact convergence, and so it does not make sense to try to
> check convergence using statistical hypothesis tests of the null hypothesis of perfect mixing. Instead, we
> use statistical estimation — post-processing of simulation results — to summarize the mixing of the
> simulated chains, comparing variation within and between chains.**"

> [!definition] A nonparametric alternative
> "**Mixing of chains can also be monitored nonparametrically, for example by computing the 80% (say) central
> interval from each chain and then determining its coverage with respect to the empirical distribution of
> all the other chains combined together.** … **At convergence, the average coverage of these 80%
> separate-chain intervals should be 80%; a much lesser value indicates poor mixing**" (Brooks and Gelman
> 1998; Brooks, Giudici, and Phillipe 2003).

> [!important] Traceplots — when they help
> "**When convergence is poor, it can help to look at traceplots — time series of the progress of multiple
> chains, looking at one or two parameters or quantities of interest at a time.** … **Traceplots can be
> helpful for gaining insight for the convergence issues but are rarely interesting if the chains have mixed
> well.**"
>
> Examples in [[Failure Modes and Steps Forward]] (§12.3).

### How long to run

> [!definition] The two questions (Ch. 11.4, p. 199)
> "1. **How many chains and iterations do we need to assess that the algorithm is sampling from something
>    close to the target distribution?**
> 2. **How many draws do we need so that the reported posterior summaries would not change in important ways
>    if the inference would be repeated?**
>
> **The first question requires assessment of mixing of Markov chains; the second question is more general
> and arises with any stochastic algorithm.**"
^def-two-stopping-questions

> [!warning] Against premature optimization of the sampler
> "**It might seem like a safe and conservative choice to run MCMC until the effective sample size is in the
> thousands or Monte Carlo standard error is tiny in comparison to the required precision — but if this takes
> a long time, it limits the number of models that can be fit in the exploration stage.**
>
> **More often than not, we often have model problems (including coding errors) that become apparent after
> running only a few iterations, so that the remaining computation is wasted. In this respect, running many
> iterations for a newly-written model is similar to premature optimization in software engineering.**
>
> **For the final model, the required number of iterations depends on the desired Monte Carlo accuracy for
> the quantities of interest.**"
>
> The direct statement of the [[Fit Fast, Fail Fast]] principle, applied to iteration counts.

> [!important] Where to spend parallelism
> "**Another choice in computation is how to best make use of available parallelism, beyond the default of
> running 4 or 8 separate chains on multiple cores. Instead of increasing the number of iterations, effective
> variance reduction can also be obtained by increasing the number of parallel chains**" (Hoffman and Ma
> 2020; Margossian, Hoffman, et al. 2025).
>
> **When the algorithm is trustworthy, diagnostics become unnecessary:** "**In general, if we would know that
> the inference algorithm is working perfectly and producing independent draws from the posterior, we would
> not need convergence diagnostics** … **When we don't trust the algorithm, it turns out that often we need
> more iterations to be confident about approximate convergence.**"

## Examples

> [!example] Exercise 11.5 — a case $\hat{R}$ catches, and one it misses (Ch. 11.8, p. 206)
> **(a)** Simulate two chains, one from a **unit normal** and one from a **$t_3$** distribution (independent
> draws), and compute $\hat{R}$ as implemented in the `posterior` package. "**This should correctly reveal
> poor mixing. Explain how this happens.**"
>
> **(b)** "**Create data from two chains that do not mix well, but where $\hat{R}$ is less than 1.01, so this
> poor mixing is not revealed. Explain the problem and suggest an improved $\hat{R}$ that would catch this
> problem.**"
>
> Part (b) is the more instructive half: $\hat{R}$ compares **variances**, so two chains with matching
> variances but different shapes or locations-in-shape can slip through. This is precisely what the
> rank-normalization and $R^*$ extensions address.

> [!example] Exercise 11.1 — how many draws to pin down a quantile (Ch. 11.8, p. 205)
> "Suppose $\theta$ is approximately normally distributed in a posterior summarized by $n$ **independent**
> draws. **How large does $n$ have to be so that the 2.5% and 97.5% quantiles of $\theta$ are specified to an
> accuracy of $0.1\,\text{sd}(\theta|y)$?** (a) Figure this out mathematically, without simulation. (b) Check
> your answer using simulation."

## Connections

- The "diagnostics drive the iteration count" argument is the reason
  [[Effective Sample Size and Monte Carlo Standard Error]] is a *reporting* tool rather than a stopping
  rule on its own.
- $\hat{R}$'s stochasticity and its false negatives are why the book pairs it with the completely different
  check of [[Simulation-Based Calibration - Overview|SBC]] — a diagnostic of the *algorithm*, not of the
  chains.
- The four-chain default and the multimodality caveat connect to
  [[Challenge of Multimodality - Differential Equation for Planetary Motion]].

## See Also
- [[Effective Sample Size and Monte Carlo Standard Error]] — quantifying the dependence between draws
- [[How Many Digits to Report]] — turning MCSE into a reporting decision
- [[Failure Modes and Steps Forward]] — what to do when $\hat{R}$ will not come down
- [[Efficient MCMC]] — BDA3 background on convergence assessment
