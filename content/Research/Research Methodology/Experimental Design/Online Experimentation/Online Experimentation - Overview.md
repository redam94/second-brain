---
title: Online Experimentation - Overview
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Larsen 2022 - Statistical Challenges in Online Controlled Experiments.pdf]]"
source_location: "Secs. 1-2, 5-7 (pp. 2-11, 18-25); companion sources: [[raw/Kohavi 2012 - Trustworthy Online Controlled Experiments Five Puzzling Outcomes.pdf]] Secs. 3.3-3.5; [[raw/Deng 2013 - CUPED Improving Sensitivity with Pre-Experiment Data.pdf]]; [[raw/Johari 2015 - Always Valid Inference.pdf]]; [[raw/Howard 2021 - Time-uniform Nonparametric Confidence Sequences.pdf]]"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[CUPED and Regression-Adjusted Variance Reduction]]"
  - "[[The Peeking Problem and Optional Stopping]]"
  - "[[Always-Valid p-values and the mSPRT]]"
  - "[[Confidence Sequences]]"
  - "[[Sample Ratio Mismatch and Trustworthiness Checks]]"
  - "[[Interference and Marketplace Experiments]]"
  - "[[Switchback Experiment Design and Analysis]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
aliases:
  - Online Controlled Experiments
  - OCE
  - A/B Testing Statistics
  - Large-Scale A/B Testing
---

# Online Experimentation - Overview

> [!summary]
> **Online controlled experiments (OCEs, "A/B tests")** are randomized experiments run on live traffic at very large scale: thousands of experiments per year, millions of units per experiment, results streaming into a dashboard in near real time. The identification logic is the textbook [[The Experimental Ideal|experimental ideal]]; what is new is the *statistical engineering* needed to make it work at scale. Larsen et al. (2022) organise the open problems into sensitivity (effects of interest are fractions of a percent), optional stopping (dashboards invite peeking), long-term and heterogeneous effects, and interference (SUTVA fails in networks and marketplaces). This cluster covers the four pillars that the rest of the vault's experimental-design material does not: **variance reduction** ([[CUPED and Regression-Adjusted Variance Reduction|CUPED]]), **sequential / always-valid inference** ([[The Peeking Problem and Optional Stopping|peeking]], [[Always-Valid p-values and the mSPRT|mSPRT]], [[Confidence Sequences|confidence sequences]]), **trustworthiness checks** ([[Sample Ratio Mismatch and Trustworthiness Checks|SRM, A/A tests]]), and **interference-robust designs** ([[Interference and Marketplace Experiments|two-sided and cluster randomization]], [[Switchback Experiment Design and Analysis|switchbacks]]).

## Overview

Larsen, Stallrich, Sengupta, Deng, Kohavi & Stevens (2022) set out a common notation (Sec. 1.2). There are $K$ variants (usually $K = 2$), $n$ experimental units (users, cookies, sessions) randomized *in real time* as they arrive, a response $Y_i$ per unit that is itself an aggregate of raw event data (e.g. clicks per user summed over sessions), and a **metric** that summarises the responses. In practice an experiment computes hundreds of metrics: debugging metrics, organisational **guardrail** metrics that must not regress, and a small set forming the **Overall Evaluation Criterion (OEC)** that drives the ship / no-ship decision.

With potential outcomes $Y_i(0), Y_i(1)$ ([[Potential Outcomes Framework]]), the estimand is the average treatment effect, *the difference between treating everyone and treating no-one*:

$$
\tau = \mu(\mathbf 1) - \mu(\mathbf 0) = \frac{1}{n}\sum_{i=1}^n \mathbb E\,[Y_i(1) - Y_i(0)],
$$

estimated by the difference in group means $\hat\tau = \bar Y_1 - \bar Y_0$ and tested with $\hat\tau / \hat\sigma_{\hat\tau}$ under a CLT normal approximation. Effects are usually reported as relative **lift**. That baseline analysis silently relies on four things, each of which fails in a characteristic way online.

## Main Content

> [!definition] Online controlled experiment (OCE) ^def-oce
> A randomized experiment conducted on live traffic of a digital product, in which arriving units are assigned in real time to one of $K$ variants by a deterministic hash of the unit identifier, responses are logged as telemetry, and analysis is automated by an experimentation platform. Synonyms in industry: A/B test, split test, flight (Microsoft), bucket test (Yahoo), weblab (Amazon), live traffic experiment (Google).

### The four failure modes of the naive two-sample test

| Assumption of the textbook test | How it fails online | Remedy (note) |
|---|---|---|
| Sample size is large enough | Effects of interest are $\ll 1\%$; required $n \propto \sigma^2/\delta^2$ explodes | [[CUPED and Regression-Adjusted Variance Reduction]], triggered analysis |
| $n$ is fixed in advance and the test is run once | Dashboards update continuously; users stop when $p < 0.05$ | [[The Peeking Problem and Optional Stopping]] → [[Always-Valid p-values and the mSPRT]], [[Confidence Sequences]] |
| The realised sample *is* the randomized sample | Telemetry loss, bot filters, redirects and triggering conditions differ by arm | [[Sample Ratio Mismatch and Trustworthiness Checks]] |
| SUTVA: unit $i$'s outcome ignores others' assignments | Social networks, shared inventory, auctions, surge pricing | [[Interference and Marketplace Experiments]], [[Switchback Experiment Design and Analysis]] |

> [!example] Why "big data" is still underpowered (Larsen et al. Sec. 2) ^ex-power
> An e-commerce site converts 5% of visitors with a mean purchase of 25 USD and $\sigma = 6$ USD, so revenue per visitor is 1.25 USD. Using the rule of thumb $n_0 = n_1 = 16\sigma^2/\delta^2$ (80% power, 5% level; see [[Power Analysis and Sample Size]]):
>
> - To detect a **5%** change, $\delta = 1.25 \times 0.05$: $n = 16 \cdot 36 / 0.0625^2 = 147{,}456$ users per arm.
> - To detect a **0.02%** change (a 10M USD swing for a 50B USD business), $\delta = 1.25 \times 0.0002$: $n \approx 9.2$ **billion** users per arm, more than the population of Earth.
>
> Deng et al. (2013) make the same point: sensitivity scales with the *square* of the effect, so detecting a $0.5\%$ delta needs $100\times$ the users of a $5\%$ delta. This is why halving the variance (which halves the required $n$) is worth as much as doubling traffic.

### Sensitivity

Three reasons for low power (Larsen Sec. 2): (i) the effect is homogeneous but tiny; (ii) the feature only touches a small **triggered** sub-population $\Theta \subset \Omega$, so the population-level effect $\tau_\Omega$ is a diluted version of $\tau_\Theta$; (iii) interest is in sub-segments. The standard tools are metric transformation and capping, **control variates / stratification using pre-experiment data** (see [[CUPED and Regression-Adjusted Variance Reduction]]), and triggered analysis restricted to users who could have seen the change.

Kohavi et al. (2012, Sec. 3.4) add a surprising caveat: *running longer does not always help*. The width of the confidence interval for the percent change is proportional to $\mathrm{CV}/\sqrt{n}$, where $\mathrm{CV} = \sigma/\mu$. For cumulative count metrics such as Sessions/User the standard deviation grows faster than the mean as the window lengthens, so CV increases and $\mathrm{CV}/\sqrt n$ stays almost flat (less than 10% change over 31 days in their Bing data). For such metrics power comes from more users per day, not more days.

### Early results mislead

Kohavi et al. (2012, Sec. 3.3) show that under a true null the day-1 cumulative effect has a 67% chance of lying outside the *final* 95% band, and day-2 a 55% chance; because cumulative estimates are autocorrelated they also appear to "trend" towards zero. Stakeholders read this as a novelty or primacy effect. The statistical counterpart of this behavioural trap is the [[The Peeking Problem and Optional Stopping|peeking problem]], and its resolution is inference that is valid *uniformly over time*: [[Always-Valid p-values and the mSPRT]] and [[Confidence Sequences]].

### Trust before inference

At scale the experimentation platform is itself a measurement instrument that can be broken. Platforms therefore run **A/A tests** (both arms identical; the $p$-value distribution should be uniform), check for **sample ratio mismatch**, guard against **carryover** from re-used hash buckets (Kohavi 2012, Sec. 3.5 report carryover lasting three weeks to more than three months), and choose an OEC that cannot be "won" by degrading the product. See [[Sample Ratio Mismatch and Trustworthiness Checks]].

### Interference

When units interact (messages between friends; riders competing for the same drivers; bidders in the same auction) the difference in means no longer estimates $\tau$, because neither arm experiences the all-treated or all-control world. Larsen et al. (Sec. 6) distinguish **network** interference (handled by graph-cluster or ego-cluster randomization) from **marketplace** interference (handled by [[Switchback Experiment Design and Analysis|switchbacks]], two-sided randomization, or budget-split designs). Both remedies buy unbiasedness with a much smaller effective sample size. See [[Interference and Marketplace Experiments]].

### Relevance to marketing measurement and applied work

Most of this machinery transfers directly to media and marketing experiments:

- **CUPED is the user-level cousin of geo pre-period modelling.** The [[Time-Based Regression Estimator for Geo Experiments|TBR estimator]] and the pre-period covariates in [[Geo-Experiment Design and Power Analysis]] exploit exactly the same fact: a pre-treatment measurement of the outcome is independent of assignment and highly predictive, so adjusting for it reduces variance without bias.
- **Always-valid inference is the frequentist alternative to bandits** for campaigns that are monitored daily. It answers "can I stop this lift test now?" while keeping a valid interval on the *losing* arm, which [[Multi-Armed Bandits and Thompson Sampling - Overview|Thompson sampling]] does not provide. See also [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]].
- **Advertising markets are marketplaces.** Auction-based media buying has the cannibalization bias described in [[Interference and Marketplace Experiments]]; a treatment arm that bids more aggressively wins impressions *from the control arm*. Geo experiments are cluster-randomized designs chosen for precisely this reason, and switchbacks are the time-axis analogue when there is only one market.
- **SRM is the first thing to check in a conversion-lift study**: differential ad-blocking, tracking loss or [[Activity Bias in Advertising|activity-based exposure]] all change *who is observed* by arm, which is a selection problem rather than a noise problem.
- **ABM validation.** The mean-field marketplace model of Johari et al. (2020) is a small agent-based simulator used to study estimator bias; the same strategy (simulate the counterfactual worlds, then score designs) applies to agent-based market models.

## Examples

A minimal "trustworthy analysis" pipeline for one experiment, combining the notes in this cluster:

```python
def analyse(experiment):
    # 1. Trust: is the realised split the configured split?
    if srm_pvalue(experiment.n_treat, experiment.n_ctrl, ratio=0.5) < 0.001:
        return "INVALID: sample ratio mismatch, diagnose before reading metrics"

    # 2. Sensitivity: adjust each user's metric with the pre-period value
    theta = cov(Y, X_pre) / var(X_pre)          # pooled across arms
    Y_adj = Y - theta * (X_pre - X_pre.mean())

    # 3. Inference that survives continuous monitoring
    delta, se = diff_in_means(Y_adj, arm)
    lo, hi = confidence_sequence(delta, se, n, alpha=0.05, rho=tuned_for(n_planned))

    # 4. Decide: stop only when the always-valid interval excludes zero
    return (lo, hi)
```

Each step is developed in its own note; step 2 is valid *because* $X_\text{pre}$ is measured before assignment, and step 3 can be evaluated as often as desired.

## Connections

- [[The Experimental Ideal]] — randomization as the source of identification that all of these methods protect.
- [[Potential Outcomes Framework]] — notation for the ATE and for SUTVA, the assumption that fails under interference.
- [[Power Analysis and Sample Size]] — the $16\sigma^2/\delta^2$ logic behind the sensitivity problem.
- [[Multiple Testing Corrections]] — hundreds of metrics and variants per experiment; always-valid $p$-values can be fed to Bonferroni and Benjamini–Hochberg (see [[Always-Valid p-values and the mSPRT]]).
- [[Type S and Type M Errors]] — underpowered experiments that *do* reach significance (especially after peeking) exaggerate effect sizes.
- [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]] — optional stopping, metric selection and segment slicing are the online versions of forking paths.
- [[Randomization Inference - Overview]] — design-based inference, used for exact tests in switchback experiments.
- [[Standard Errors and Clustering]] — when the randomization unit (user) differs from the analysis unit (page view), naive standard errors are wrong; the delta method or clustering is required.
- [[Delayed and Censored Feedback - Overview]] — conversions that arrive after the experiment window interact with early stopping.

## See Also

- [[Logic of Regression Adjustment]]
- [[Sequential and Adaptive BED]]
- [[Geo-Experiment Methodology - Overview]]
- [[Observational vs Experimental Methods in Advertising]]
- [[Pre-registration and Open Science - Overview]]
- [[Multiple Comparisons - Bayesian Perspective]]
- [[User-Level Ad Experiments - Overview]] — the advertising-specific application of user-randomized tests
