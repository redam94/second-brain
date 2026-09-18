---
title: The Peeking Problem and Optional Stopping
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/sequential-analysis
  - topic/ab-testing
  - type/concept
  - doc/paper
source: "[[raw/Johari 2015 - Always Valid Inference.pdf]]"
source_location: "Secs. 1-3 (pp. 1-13); companion sources: [[raw/Larsen 2022 - Statistical Challenges in Online Controlled Experiments.pdf]] Sec. 5 (pp. 18-21); [[raw/Kohavi 2012 - Trustworthy Online Controlled Experiments Five Puzzling Outcomes.pdf]] Sec. 3.3; [[raw/Howard 2021 - Time-uniform Nonparametric Confidence Sequences.pdf]] Sec. 1 and Fig. 1"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[Online Experimentation - Overview]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Always-Valid p-values and the mSPRT]]"
  - "[[Confidence Sequences]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - Peeking Problem
  - Optional Stopping
  - Continuous Monitoring of A/B Tests
  - Repeated Significance Testing
  - Data-Dependent Stopping
---

# The Peeking Problem and Optional Stopping

> [!summary]
> A fixed-horizon $p$-value is only valid at the sample size chosen **before** looking at data. A/B dashboards recompute $p_n$ after every visitor, and users stop the first time $p_n < \alpha$. The stopping time is then a function of the data, the event "$p_T \le \alpha$" becomes "$\min_{n \le N} p_n \le \alpha$", and the type I error climbs far above $\alpha$. Johari, Pekelis & Walsh report that with 10,000 samples it "can easily increase fivefold"; in the limit the law of the iterated logarithm guarantees a false rejection with probability one. The cure is not to forbid looking, because early stopping is genuinely valuable, but to report quantities whose guarantee holds **at every stopping time**: [[Always-Valid p-values and the mSPRT|always-valid p-values]] and [[Confidence Sequences|confidence sequences]].

## Overview

Johari et al. (Sec. 1) argue that the classical $p$-value succeeded in industry because it is a good *user interface*: the platform publishes one number, and each user applies her own threshold $\alpha$ with no knowledge of the experiment's internals. That contract holds only "when p-values and confidence intervals are used as intended". On an online platform the user also controls the experimental design, in particular the sample size, and adjusts it in response to the very statistics she is reading. The paper's Figure 1 is an A/A test (treatment identical to control) on a commercial dashboard whose "chance to beat baseline" $1 - p_n$ wanders above 95%: a false positive created by nothing except continuous monitoring.

The incentive to peek is rational. Long experiments carry opportunity cost; harmful treatments should be aborted quickly (Larsen et al. Sec. 5 cite this as the main reason platforms *want* optional stopping); and most users do not know the effect size they are looking for, so they cannot fix a horizon by a [[Power Analysis and Sample Size|power calculation]] in advance. "The ability to trade off maximum detection with minimum run-time dynamically is a crucial benefit of the availability of real-time data."

## Main Content

> [!definition] Decision rule, fixed-horizon test, sequential test (Johari et al. Sec. 3) ^def-decision-rule
> Let $(X_n)_{n \ge 1}$ be i.i.d. from $F_\theta$ with filtration $(\mathcal F_n)$, and test $H_0: \theta = \theta_0$. A **decision rule** is a pair $(T, \delta)$ with $T$ a (possibly infinite) stopping time for $(\mathcal F_n)$ and $\delta \in \{0,1\}$ an $\mathcal F_T$-measurable rejection indicator. It is **fixed-horizon** if $T = n$ is deterministic. A **sequential test** is a family $(T(\alpha), \delta(\alpha))_{\alpha \in (0,1)}$ that is nested ($T$ non-increasing and $\delta$ non-decreasing in $\alpha$) with $\mathbb P_{\theta_0}(\delta(\alpha) = 1) \le \alpha$.

> [!definition] Fixed-horizon p-value ^def-fixed-pvalue
> For the UMP test with statistic $\tau_n$ and critical value $k(\alpha)$, $p_n = \inf\{\alpha : \tau_n \ge k(\alpha)\}$. All that type I error control needs is **super-uniformity at the chosen $n$**:
>
> $$
> \forall s \in [0,1]: \quad \mathbb P_{\theta_0}(p_n \le s) \le s .
> $$
>
> This is a statement about one pre-specified $n$. It says nothing about $p_T$ for a data-dependent $T$.

### Why peeking inflates error

A peeker who stops at $T = \inf\{n : p_n \le \alpha\} \wedge N$ rejects whenever *any* of the looks is significant:

$$
\mathbb P_{\theta_0}(\text{reject}) = \mathbb P_{\theta_0}\Big(\min_{n \le N} p_n \le \alpha\Big) = \mathbb P_{\theta_0}\Big(\bigcup_{n \le N} \{p_n \le \alpha\}\Big) \;\ge\; \mathbb P_{\theta_0}(p_N \le \alpha).
$$

Each look has marginal error $\alpha$; the union is strictly larger, and although successive $z$-statistics are highly correlated the union keeps growing with the number of looks.

> [!theorem] Sampling to a foregone conclusion ^thm-foregone
> Let $S_n$ be a sum of i.i.d. mean-zero, unit-variance observations and $Z_n = S_n/\sqrt n$. By the law of the iterated logarithm, $\limsup_n S_n / \sqrt{2 n \log\log n} = 1$ almost surely, so for any fixed critical value $z_{\alpha/2}$
>
> $$
> \mathbb P_{\theta_0}\big(\exists n : |Z_n| > z_{\alpha/2}\big) = 1 .
> $$
>
> A patient peeker rejects a true null with certainty. A boundary can only be valid uniformly in time if it grows at least like $\sqrt{n \log\log n}$; Howard et al.'s Corollary 1 is the matching nonasymptotic statement, and it is why the boundaries in [[Confidence Sequences]] have a $\log\log$ or $\log$ factor.

Howard et al.'s Figure 1 shows this for Rademacher data: the cumulative miscoverage of pointwise 95% CLT intervals keeps climbing over $10^5$ observations to many times the nominal 0.05 (10,000 replications), whereas a curved uniform boundary holds its miscoverage under 0.05 for all $t$ simultaneously.

### Behavioural amplifiers

Kohavi et al. (2012, Sec. 3.3) describe how the same arithmetic misleads even without formal testing. With $\mathrm{sd}(\hat\tau_n) \propto 1/\sqrt n$, the cumulative estimate on day 1 has a 67% chance (day 2: 55%) of lying outside the *final* 21-day 95% band even when the true effect is zero. Because cumulative estimates are autocorrelated they drift smoothly back towards the truth, and feature owners read the drift as a *trend* ("it is about to cross zero"). Real novelty and primacy effects exist but are rare; in their experience no experiment went from significantly negative to significantly positive. Peeking is thus one branch of the [[Garden of Forking Paths]]: the stopping rule is an analysis decision made after seeing data, a canonical [[Researcher Degrees of Freedom|researcher degree of freedom]]. And since the peeker stops at a moment when the estimate is unusually far from zero, the reported effect is exaggerated, a [[Type S and Type M Errors|type M error]], even when the effect is real.

### The menu of remedies

1. **Discipline.** Fix $n$ by power analysis and look once. Valid, but discards the benefit of streaming data and is rarely obeyed; [[Pre-registration and Open Science - Overview|pre-registering]] the stopping rule is the procedural version of this.
2. **Group sequential designs** (Pocock 1977; O'Brien & Fleming 1979; Lan & DeMets 1983 alpha-spending). Pre-specify $K$ interim looks and split $\alpha$ across them. Standard in clinical trials and "rapidly gaining in popularity" for OCEs (Larsen et al. Sec. 5), but the looks must be planned and a maximum sample size fixed.
3. **Wald's SPRT** (1945). For simple $H_0: \theta_0$ vs $H_1: \theta_1$, monitor $\Lambda_n = \prod_{i \le n} f(y_i \mid \theta_1)/f(y_i \mid \theta_0)$ and stop to reject when $\Lambda_n > A = (1-\beta)/\alpha$, stop to accept when $\Lambda_n < B = \beta/(1-\alpha)$, otherwise continue. It terminates with probability one and needs about half the fixed-sample $n$ on average, but requires a point alternative, and as an interface it is a "black box" until the single stopping time: it gives no inference at other times and must be tuned to one user's power/run-time preference (Johari et al. Sec. 2.1).
4. **Always-valid inference.** Replace the point alternative by a mixture to get a test of power one, and publish it as a $p$-value process valid at *any* stopping time. See [[Always-Valid p-values and the mSPRT]]; the interval-valued dual is [[Confidence Sequences]].
5. **Bayesian monitoring.** Posterior probabilities do not depend on the stopping rule as a matter of coherence (the likelihood principle), and Deng et al. (2016) use Bayesian testing for OCEs (Larsen Sec. 5). But the *frequentist* false-positive rate of "stop when $\mathbb P(\tau > 0 \mid \text{data}) > 0.95$" is inflated in the same way as peeking at $p$-values, so a platform that promises error rates still needs option 2 or 4. See [[Forking Paths and Bayesian Approaches]].
6. **Bandits.** If the goal is to *maximise reward during the test* rather than to estimate an effect, adaptive allocation ([[Multi-Armed Bandits and Thompson Sampling - Overview]]) is the right tool. Johari et al. (Sec. 2.3) note that platforms usually also want a confidence interval on the losing variant for cost-benefit and roadmap decisions, which is why hypothesis testing remains dominant.

### What optional stopping costs

There is no free lunch (Larsen et al. Sec. 5): uniform validity is paid for with wider intervals at any given $n$ (within roughly a factor of two of the CLT width; see [[Confidence Sequences]]); early stopping leaves sub-segment (heterogeneous effect) analyses underpowered; the point estimate at a data-dependent stopping time is biased away from zero; and monitoring many guardrail metrics simultaneously compounds with [[Multiple Testing Corrections|multiplicity]].

## Examples

**Simulation (own illustration, not from the papers).** 4,000 A/A experiments, $N = 10{,}000$ standard-normal observations each, two-sided $z$-test at $\alpha = 0.05$, rejecting if *any* look is significant:

| Monitoring schedule | False positive rate |
|---|---|
| Final look only | 0.052 |
| 5 equally spaced looks | 0.145 |
| 10 looks (every 1,000) | 0.203 |
| Every 100 observations | 0.375 |
| Every observation from $n = 10$ | 0.604 |
| mSPRT, $\tau^2 = 0.01$, every observation | 0.035 |

Ten innocuous-looking weekly check-ins quadruple the error rate, consistent with the "fivefold" figure in Johari et al.; continuous monitoring makes a false positive more likely than not. The last row previews [[Always-Valid p-values and the mSPRT]].

```python
import numpy as np
rng = np.random.default_rng(0)
S = np.cumsum(rng.standard_normal((4000, 10_000)), axis=1)
n = np.arange(1, 10_001)
z = np.abs(S) / np.sqrt(n)
looks = np.arange(999, 10_000, 1000)             # 10 looks
print((z[:, looks] > 1.96).any(axis=1).mean())   # ~0.20, not 0.05
```

## Connections

- [[Online Experimentation - Overview]] — where peeking sits among the statistical challenges of OCEs.
- [[Always-Valid p-values and the mSPRT]] — the constructive solution in $p$-value form.
- [[Confidence Sequences]] — the same guarantee in interval form, nonparametric.
- [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]] — optional stopping as a data-contingent analysis choice.
- [[Type S and Type M Errors]] — stopping on significance selects exaggerated estimates.
- [[Multiple Testing Corrections]] — peeking is multiplicity over *time*; metrics and variants add multiplicity over *hypotheses*.
- [[Sequential and Adaptive BED]] — the Bayesian design-side view of adapting an experiment to accumulating data.
- [[Delayed and Censored Feedback - Overview]] — with delayed conversions, early looks are biased as well as noisy, since recent cohorts are incompletely observed.

## See Also

- [[Power Analysis and Sample Size]]
- [[Pre-registration and Open Science - Overview]]
- [[Prediction vs Postdiction]]
- [[UCB and Greedy Algorithms for Bandits]]
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]
