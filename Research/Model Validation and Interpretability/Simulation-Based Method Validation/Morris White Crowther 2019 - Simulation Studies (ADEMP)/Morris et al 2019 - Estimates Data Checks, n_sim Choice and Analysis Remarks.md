---
title: "Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§5 intro p.13; §5.1 Checking the estimates data pp.13-14; §5.3 Sample size for simulation studies pp.17-18 (Eq. 1 p.18); §5.4 Remarks on analysis pp.18-19; §7.1 n_sim calculation p.21. arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
used_by:
  - "[[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
aliases:
  - Number of simulation repetitions
  - n_sim formula
  - Simulation sample size (Monte Carlo)
  - Estimating the true estimand by simulation
  - Meta-model of simulation performance
---

# Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks

> [!summary]
> The analysis side of Morris, White & Crowther (2019, §5 minus the performance-measure table). **§5.1:** the first performance measure is the **number of missing estimates** (non-convergence), which are unlikely to be missing completely at random; then **plot the estimates** before summarising (five plot types, including the zip plot). **§5.3:** choose $n_{\text{sim}}$ by inverting the Monte Carlo SE formula — **Eq. 1** $n_{\text{sim}}=E(\text{Cov})(1-E(\text{Cov}))/\text{MCSE}_{\text{req}}^2$, giving **1,900** repetitions for 95% coverage known to ±0.5 pp and **10,000** in the worst case; for bias, $n_{\text{sim}}=\text{Var}(\hat\theta)/\text{MCSE}_{\text{req}}^2$ (**1,600** in the worked example). **§5.4:** truth replaces a control arm; benchmarks are nominal coverage and the Cramér-Rao bound; unknown $\theta$ can be estimated from one huge simulated dataset on a separate RNG stream; and many DGMs call for a **meta-model** of performance with **common seeds** across DGMs.
^summary-estimates-nsim-analysis

## Overview

§5 opens: "We advocate two preliminaries: checking for missing estimates and plots of the estimates data" (p.13). Only then are performance measures computed ([[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]). Sample size for the simulation itself, $n_{\text{sim}}$, is the step the review found almost nobody justified: 4 of 87 ([[Morris et al 2019 - Motivation and Review of Simulation Practice]]).

## Main Content

### §5.1 Checking the estimates data (pp.13-14)

> [!definition] Missing estimates as the first performance measure (§5.1, p.13)
> "The number of missing values, e.g. of $\hat\theta_i$ and $\widehat{\text{SE}}(\hat\theta_i)$ (for example due to non-convergence), is the first performance measure to assess."
> - Explore repetitions that failed (re-run from the stored RNG state) and make code more robust.
> - Missingness creates a missing-data problem for every other measure. "It seems implausible that values would be missing completely at random"; failures depend on characteristics of the simulated dataset.
> - Evaluating an *analyst's procedure* (switch model on non-convergence) reduces missingness but "changes the nature of the method being evaluated" ([[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-pure-vs-procedure|pure vs procedural method]]).
> - With several methods, if one always returns $\hat\theta_i$, another's missingness may relate to the first's values.
> - With a non-trivial proportion missing, further analysis "should be tentative, particularly when comparing methods with different numbers of $\hat\theta_i$ missing." **Non-trivial** = "any proportion that could meaningfully alter estimated performance. If we are interested in detecting tiny biases, even 1% may be non-trivial."
^def-missing-estimates

> [!example] Unbiased but never close to the truth (§5.1, p.13; Kahan 2013)
> A two-stage procedure for factorial trials was unbiased both conditionally and unconditionally, yet the histogram of $\hat\theta_i$ was **bimodal**, with modes equally spaced either side of $\theta$ and almost no $\hat\theta_i$ near $\theta$. This "would have been missed had the analysis proceeded straight to the estimation of performance."
^ex-bimodal

> [!algorithm] Exploratory plots for estimand-targeting studies (§5.1, p.13)
> For each DGM, estimand and method:
> 1. **Univariate plot** of $\hat\theta_i$ and $\widehat{\text{SE}}(\hat\theta_i)$ — inspect the distribution, look for outliers.
> 2. **Bivariate plot** of $\widehat{\text{SE}}(\hat\theta_i)$ vs $\hat\theta_i$ — find bivariate outliers.
> 3. **Method-vs-method scatter** of $\hat\theta_i$ (and possibly $\widehat{\text{SE}}(\hat\theta_i)$) — look for correlation and systematic differences; with more than two methods, every pair or each vs a comparator.
> 4. **Limits-of-agreement** (difference vs mean) for $\hat\theta_i$ (and possibly SE) against a reference method.
> 5. **Zip plot:** confidence intervals fractionally ranked by $|z|$, $z=(\hat\theta_i-\theta)/\text{ModSE}_i$ — for understanding coverage.
>
> All five are demonstrated in §7 (Figures 3-5): [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]; the zip plot is defined in [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^def-zip-plot|the reporting note]].
^alg-exploratory-plots

### §5.3 Sample size for simulation studies (pp.17-18)

"In choosing $n_{\text{sim}}$, the central issue is Monte Carlo error: key performance measures need to be estimated to an acceptable degree of precision" (p.17). Common choices are 500 and 1,000 (also reported by Burton et al. 2006).

**How the reviewed studies justified $n_{\text{sim}}$ (p.17).** Four reviewed studies did not report $n_{\text{sim}}$; of the 87 that did (the paper does not reconcile 4 + 87 with its sample of 100), only four gave any justification: "To evaluate the asymptotic biases" [52]; "errors can be reduced by the large number of simulation replicates" [53]; computing time, plus a reviewer's point that with 10,000 meta-analyses the SE of an estimated percentage is guaranteed to be below 0.5 [26]; and, "most positively", Marozzi's explicit derivation of the Monte Carlo SE [54]. "Clearly this is a sub-optimal state of affairs."

**Better models of justification (p.17).** The paper points to three worked justifications: the worked illustrative example in §7 (the bias-based $n_{\text{sim}}=1{,}600$ calculation, see [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]); Keogh & Morris (2018) [55], multiple imputation in Cox regression with time-varying covariate effects; and Morris, Fisher, Kenward & Carpenter (2017) [56], two-stage vs one-stage meta-analysis of Gaussian individual patient data.

**One repetition can be enough (p.17):** when demonstrating large-sample bias — in White (1997) the single $\hat\theta$ "was many model standard errors from its true value."

> [!theorem] Eq. (1): $n_{\text{sim}}$ for a target Monte Carlo SE of coverage (§5.3, p.18)
> Plug the expected coverage into the coverage MCSE $\sqrt{\text{Cov}(1-\text{Cov})/n_{\text{sim}}}$ and rearrange:
> $$n_{\text{sim}}=\frac{E(\text{Coverage})\times(1-E(\text{Coverage}))}{(\text{Monte Carlo SE}_{\text{req}})^2}\tag{1}$$
> "with a similar expression if $n_{\text{sim}}$ is to be determined based on power."
>
> - Expected coverage 95%, required MCSE 0.5%: $n_{\text{sim}}=\dfrac{95\times5}{0.5^2}=1{,}900$ repetitions.
> - **Worst case** is coverage 50% (a binary summary has maximal variance at $p=0.5$): $n_{\text{sim}}=\dfrac{50\times50}{0.5^2}=10{,}000$ keeps the MCSE below 0.5%.
^thm-nsim-coverage

> [!theorem] $n_{\text{sim}}$ for a target Monte Carlo SE of bias (§7.1, p.21)
> $$\text{Monte Carlo SE(Bias)}=\sqrt{\text{Var}(\hat\theta)/n_{\text{sim}}}\quad\Longrightarrow\quad n_{\text{sim}}=\frac{\text{Var}(\hat\theta)}{\text{MCSE}_{\text{req}}^2}.$$
> Use a **conservative** $\text{Var}(\hat\theta)$ from a small pilot run. Worked example: $\text{SD}(\hat\theta)\le0.2\Rightarrow\text{Var}(\hat\theta)\le0.04$; required MCSE(Bias) $<0.005$; so $n_{\text{sim}}=0.04/0.005^2=1{,}600$. Then check the implied MCSE for other measures: at 95% coverage $\sqrt{95\times5/1600}=0.54$ pp, and 1.25 pp at the worst case of 50% coverage. The plan is revised "if, for example, $\text{SD}(\hat\theta)>0.2$."
^thm-nsim-bias

> [!algorithm] Choosing $n_{\text{sim}}$ (synthesis of §5.3 and §7.1)
> 1. Name the **key performance measure** (from the Aims).
> 2. Choose the **required MCSE** — the smallest difference in that measure that would matter, divided by ~2.
> 3. Get a conservative guess for the variance term: $\text{Var}(\hat\theta)$ from a pilot (for bias), or the expected/worst-case proportion (coverage, power, type I error).
> 4. Solve $n_{\text{sim}}=\text{variance term}/\text{MCSE}_{\text{req}}^2$.
> 5. Compute the resulting MCSE for every other reported measure; accept or enlarge.
> 6. After running, recompute MCSEs from the actual results; continue from the stored final RNG state if precision is insufficient.
^alg-choose-nsim

**Increasing $n_{\text{sim}}$ is cheap (p.18).** "A convenient feature of simulation studies is that the Monte Carlo SE can be assessed and $n_{\text{sim}}$ increased much more cheaply than with other empirical studies. The cost is computational time." To continue rather than restart, record the **end state** of the RNG (use it as the seed for further repetitions) or use a different stream ([[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]]).

### §5.4 Remarks on analysis (pp.18-19)

> [!definition] Comparators and benchmarks instead of controls (§5.4, p.18)
> In biomedical experiments, effects are estimated as contrasts against a control. Simulation studies have a known truth, so "the contrast vs. a control is not often of interest" (hence the term *comparator*). Bias for method A is computed against $\theta$, not as a difference from a control method's $\bar\theta$. Benchmarks exist for other measures too:
> - **Coverage:** the nominal %.
> - **Precision:** the **Cramér-Rao lower bound**.
^def-benchmarks

> [!algorithm] Estimating an unknown true $\theta$ by simulation (§5.4, p.18)
> When $\theta$ does not appear in the DGM — e.g. data generated from a **conditional** logistic model but the estimands are the **marginal** odds ratio, risk ratio and risk difference (Williamson, Forbes & White 2014):
> 1. Simulate **one very large dataset** from the DGM, so large "that it is fair to assume that the variance of '$\theta$' is negligible, particularly compared to that of $\bar\theta$."
> 2. Compute $\theta$ from it.
> 3. Ensure its RNG states **do not overlap** with the main study's: use a separate stream, or run the $\theta$-estimation immediately before the main run.
>
> Review: of 74 studies with some $\theta$, 9 estimated it, 57 used a known $\theta$, 8 were unclear. "Estimating $\theta$ is in our view a sensible and pragmatic approach."
^alg-estimate-theta

This is how a marketing simulator obtains "true" ROAS or incremental contribution when the DGM is specified in terms of latent response curves rather than the reported estimand ([[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]).

> [!definition] Meta-models of performance and matched repetitions (§5.4, p.18)
> §5.2 estimates performance once per DGM, which suits few DGMs. For complex studies, "it is natural to fit a model (termed 'meta-model' by Skrondal) for performance in terms of the data-generating mechanisms." An advantage: repetitions can be **matched** across DGMs, reducing the MCSE of comparisons. E.g. two DGMs with $\theta=1$ and $\theta=2$ can use the **same starting seed** so results are correlated within $i$. (This is why §4.1.1 says reusing seeds across DGMs "may in fact be advantageous.")
^def-meta-model

## Examples

> [!example] $n_{\text{sim}}$ for a power-style question in marketing-model validation
> A team wants the rate at which a driver-ranking pipeline puts a **zero-effect** channel in its top 3 (a false-discovery rate), expected near 10%, known to ±1 pp. Eq. (1) in power form: $n_{\text{sim}}=0.10\times0.90/0.01^2=900$ per DGM; worst case 2,500. If each repetition refits a model on 104 weekly rows in a few seconds, 900 × 18 DGMs is an overnight run — no excuse for $n_{\text{sim}}=1$. Illustrative, not from the paper.
^ex-power-style-question-marketing

> [!example] Checking an estimates dataset before summarising
> If a Bayesian MMM fails to converge (divergences, $\hat R>1.01$) in 6% of repetitions, and failures concentrate in DGMs with highly correlated spend, then the bias on the remaining 94% describes the method only when it happens to work — the "pure" evaluation of §3.4. Report the failure rate by DGM as the first performance measure, and decide in the protocol whether the method includes a fallback (stronger priors, reparameterisation). Illustrative.
^ex-checking-an-estimates-dataset

> [!important] From "one fake dataset" to a planned $n_{\text{sim}}$
> The Bayesian-workflow advice in [[Designing Simulated-Data Experiments]] starts with one simulated dataset ("a few simple checks are just about always worthwhile") and escalates to SBC when subtle problems are suspected. Eq. (1) tells you how far a single run is from a measurement. With one repetition there is no usable coverage estimate (it is 0% or 100%), and a single hit or miss of a 95% interval cannot distinguish 95% from 80% coverage. To tell 95% from 90% at roughly 2 MCSE you need MCSE ≈ 2.5 pp, so $n_{\text{sim}}\approx 0.95\times0.05/0.025^2\approx 76$. For bias, the bias-based form $n_{\text{sim}}=\text{Var}(\hat\theta)/\text{MCSE}_{\text{req}}^2$ means a single run detects a bias only if it is several empirical SEs large ("catastrophic failure of parameter recovery"). Smaller biases need the planned $n_{\text{sim}}$. The same arithmetic sizes an SBC run: its rank histogram is a set of coverage checks, each with binomial Monte Carlo error ([[The SBC Algorithm]]). *Worked arithmetic by the note author; the 76 figure is not in the paper.*
^imp-single-run-vs-nsim

## Connections

- [[Power Analysis and Sample Size]] uses the same binomial-variance inversion for real experiments; [[Geo-Experiment Design and Power Analysis]] applies power-by-simulation (use 5 in [[Morris et al 2019 - Motivation and Review of Simulation Practice#^def-five-uses|§1]]).
- [[Effective Sample Size and Monte Carlo Standard Error]] — the MCMC analogue of choosing enough draws for a target MCSE.
- [[Simulated Moments Estimation - Overview]] — another place where simulation noise must be budgeted.
- The Cramér-Rao benchmark connects to [[Asymptotics and Frequentist Connections]].

## See Also

- [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] — the MCSE formulas being inverted
- [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]] — the 1,600-repetition calculation in context
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
