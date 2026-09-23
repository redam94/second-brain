---
title: "Q: Does peeking (optional stopping) matter for a Bayesian? Reconcile the frequentist peeking problem, always-valid p-values / mSPRT and confidence sequences with the likelihood principle, Thompson sampling and sequential Bayesian experimental design."
tags:
  - type/qa
  - topic/bayesian-statistics
  - topic/online-experimentation
  - topic/research-methodology
  - topic/multi-armed-bandits
  - topic/calibration
date_asked: 2026-09-18
answered_from:
  - "[[The Peeking Problem and Optional Stopping]]"
  - "[[Always-Valid p-values and the mSPRT]]"
  - "[[Confidence Sequences]]"
  - "[[Garden of Forking Paths]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Data Collection Models]]"
  - "[[Varieties of Bayesian Theory]]"
  - "[[Asymptotics and Frequentist Connections]]"
  - "[[Decision Analysis]]"
  - "[[From Inference to Decision]]"
  - "[[Type S and Type M Errors]]"
  - "[[Bernoulli Bandit and Thompson Sampling Algorithm]]"
  - "[[Regret Bounds for Thompson Sampling]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[Lindley's Information Measure]]"
  - "[[Open Challenges and Future Directions]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Data-Averaged Posterior Self-Consistency]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
related_questions:
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
aliases:
  - "Bayesian optional stopping"
  - "Is Bayesian inference immune to peeking"
  - "Stopping rules and the likelihood principle"
---

# Does peeking (optional stopping) matter for a Bayesian?

> [!summary]
> It depends on which guarantee you are asking about. The **posterior given the model** is untouched by a data-dependent stopping rule, which is why Thompson sampling and sequential BED can "peek" after every observation. But three things are *not* protected: **frequentist error rates** of a posterior-threshold rule (a flat-prior "stop at 95%" rule is literally the peeking $z$-test), **behaviour at a fixed true effect** (sign errors and exaggeration conditional on having stopped), and **robustness to the prior** (stopping selects the small-$n$ datasets where the prior does the most work). The bridge between camps is that the mSPRT statistic *is* a Bayes factor: "stop when the Bayes factor exceeds $1/\alpha$" is the one Bayesian stopping rule that carries an anytime frequentist guarantee.

## Answer

### 1. The frequentist problem in one line

A fixed-horizon $p$-value is super-uniform only at a pre-specified $n$. A peeker rejects if *any* look is significant, so the error is $\mathbb P_{\theta_0}(\min_{n \le N} p_n \le \alpha)$, and by the law of the iterated logarithm $\mathbb P_{\theta_0}(\exists n : |Z_n| > z_{\alpha/2}) = 1$: sampling to a foregone conclusion ([[The Peeking Problem and Optional Stopping#^thm-foregone]]). The note's A/A simulation gives false-positive rates of 0.05 (one look), 0.20 (10 looks) and 0.60 (every observation). In the vocabulary of [[Garden of Forking Paths]], the stopping rule is an analysis choice $\phi(y)$ made after seeing data, so the reported statistic is $T(y;\phi(y))$ while its reference distribution assumes $T(y;\phi)$.

### 2. Why the posterior does not care

[[The Peeking Problem and Optional Stopping]] states the Bayesian position: "posterior probabilities do not depend on the stopping rule as a matter of coherence (the likelihood principle)". *Synthesis* (the vault has no derivation): let the rule stop at $n$ with probability $s_n(y_{1:n})$ that depends on the observed data only. The density of what was observed is

$$
p(T = n,\, y_{1:n} \mid \theta) = \underbrace{s_n(y_{1:n}) \prod_{k<n}\big(1 - s_k(y_{1:k})\big)}_{\text{free of } \theta} \;\prod_{i \le n} f(y_i \mid \theta),
$$

so the first factor cancels in $p(\theta \mid y) \propto p(\theta)\prod_i f(y_i\mid\theta)$. These are exactly the two ignorability conditions of [[Data Collection Models]]: the collection mechanism depends only on *observed* data, and its parameters are distinct from $\theta$. The same logic covers adaptive *allocation*. In [[Bernoulli Bandit and Thompson Sampling Algorithm]] the update $(\alpha_k,\beta_k) \leftarrow (\alpha_k + r_t, \beta_k + 1 - r_t)$ is plain Bayes even though $x_t$ was chosen from the history, and in [[Sequential and Adaptive BED]] "the posterior after step $t-1$ simply becomes the prior for step $t$". [[Lindley's Information Measure]] goes further and *designs* the stopping rule: continue "until a preassigned amount of information has been attained", which for a two-point parameter space is exactly Wald's SPRT.

Ignorability fails when stopping uses information outside the model: a second KPI, a sales team's read of the market, or, most commonly in media, **delayed conversions**, where recent cohorts are incompletely observed so early looks are biased and not merely noisy.

### 3. The mSPRT is a Bayes factor with a frequentist threshold

The mixture likelihood ratio of [[Always-Valid p-values and the mSPRT#^def-msprt]],

$$
\Lambda_n^H = \int_\Theta \prod_{i \le n} \frac{f_\theta(x_i)}{f_{\theta_0}(x_i)}\, dH(\theta),
$$

is the Bayes factor for $H_1: \theta \sim H$ against the point null. Under $H_0$ it is a non-negative martingale with mean one, so Ville's inequality gives $\mathbb P_{\theta_0}(\exists n: \Lambda_n^H \ge 1/\alpha) \le \alpha$, and $p_n = \min\{p_{n-1}, 1/\Lambda_n^H\}$ is valid at every stopping time. [[Confidence Sequences]] are the interval dual: the normal-mixture boundary $u(v)=\sqrt{(v+\rho)\log((v+\rho)/(\alpha^2\rho))}$ is the Gaussian mSPRT with $\rho = \sigma^2/\tau^2$ ([[Confidence Sequences#^def-normal-mixture]]), and Lemma 3 shows that "valid at all stopping times" and "valid uniformly in $n$" are the same statement ([[Confidence Sequences#^thm-equivalence]]).

What is genuinely shared is more than the formula. Theorem 3 ([[Always-Valid p-values and the mSPRT#^thm-mixing]]) says the run-time-optimal mixing variance is the variance of true effects across experiments (corrected for truncation), fitted from the archive by empirical Bayes. The frequentist-optimal $H$ is the prior a Bayesian should have used.

What only looks similar: a posterior *tail probability* under a continuous prior, $\mathbb P(\theta > 0 \mid y)$, is not a martingale under $\theta = 0$ and has no Ville bound. With a flat prior it equals $\Phi(Z_n)$, so "stop at 0.95" is the peeking test with a new label.

### 4. What stays valid and what does not

| Quantity | Under optional stopping | Why (source) |
|---|---|---|
| Posterior $p(\theta\mid y)$ given model and prior | **Valid** | Stopping factor is free of $\theta$; ignorable design ([[Data Collection Models]]) |
| Calibration *averaged over the prior* | **Valid if effects really come from the prior** | Stopped data are still a draw from the joint, so the identity in [[Data-Averaged Posterior Self-Consistency#^thm-self-consistency]] applies |
| Expected-utility decision $E(\theta \mid y) > c/b$ | **Valid** | The decision uses only the posterior ([[From Inference to Decision#^def-expected-value-rule]], [[Decision Analysis]]) |
| Bayes factor $\ge 1/\alpha$ against a point null | **Valid in both senses** | It is the mSPRT |
| Type I error of "stop when $\mathbb P(\theta>0\mid y) > c$" | **Not controlled** | Same union-over-looks inflation as $p$-values |
| Sign and magnitude *at a fixed true* $\theta$, conditional on stopping | **Not protected** | Stopping selects extreme estimates ([[Type S and Type M Errors]]) |
| Flat-prior or raw estimate at the stopping time | **Biased away from zero** | Larsen et al. via the peeking notes |
| Insensitivity to the prior | **Lost** | Early stops happen at small $n$, before the Bernstein–von Mises regime of [[Asymptotics and Frequentist Connections]] |
| Conditioning on "the model" | **Not covered** | In the M-open stance of [[Varieties of Bayesian Theory]] the model changes after looking, a fork the likelihood principle does not address |
| Reuse of adaptively collected data for non-Bayesian analysis | **Not protected** | Rainforth's caveat in [[Open Challenges and Future Directions#^ex-misspecification]] |

The second and sixth rows are the distinction [[Simulation-Based Calibration - Overview]] draws between checking a posterior at one ground truth and checking it over the joint distribution: "behavior on a single simulation does not characterize the algorithm". [[Varieties of Bayesian Theory]] says the same of optimality: Bayes is optimal "averaging over the prior predictive distribution", and real properties should be judged over "all datasets the model would be applied to". [[Regret Bounds for Thompson Sampling]] makes the identical split between **Bayesian regret** (integrated over the prior) and **conditional regret** at a fixed $\theta'$, noting that TS "is designed around the Bayesian objective" and that worst-case guarantees need extra assumptions.

> [!example] Own simulation: posterior-threshold stopping (not from the sources)
> Unit-variance stream, $N = 10{,}000$, a look every 100 observations, stop when $\mathbb P(\theta>0\mid y)$ leaves $[0.05, 0.95]$; 20,000 replications.
>
> | Scenario | Analysis prior | Result |
> |---|---|---|
> | A/A, $\theta = 0$ | flat | 59.5% of runs stop with a directional claim |
> | A/A, $\theta = 0$ | $N(0, 0.02^2)$ | 20.4% |
> | A/A, $\theta = 0$ | $N(0, 0.005^2)$ | 0.0% |
> | $\theta \sim N(0, 0.02^2)$ | the true prior | claimed sign confidence 0.957, actual 0.957; mean $\lvert E(\theta\mid y)\rvert$ 0.0214 vs true 0.0217 |
> | $\theta \sim N(0, 0.02^2)$ | flat | claimed 0.965, actual 0.811; mean estimate 0.081 vs true 0.018; median stop at $n = 1{,}000$ instead of 4,100 |
> | fixed $\theta = 0.005$ | $N(0, 0.02^2)$ | 19.5% of stopped runs have the wrong sign; positive stops exaggerate 4.0x (flat prior: 34.7%, 16x) |
> | fixed $\theta = 0.02$ | $N(0, 0.02^2)$ | wrong sign 0.4%, exaggeration 1.04x (flat prior: 10.8%, 3.5x) |
>
> With the right prior the stopped posterior is calibrated exactly, stopping rule and all. With the wrong prior the miscalibration is first-order, and at a fixed small effect even the right prior exaggerates.

This is why [[From Inference to Decision#^wrn-bayesian-threshold]] says distrust of point estimates "is not necessarily appropriate for inferences that have already been partially pooled": the informative prior is doing the job that the $\sqrt{n\log\log n}$ boundary does for the frequentist.

### 5. Thompson sampling and sequential BED are peeking by design

TS re-reads the posterior before every impression and is asymptotically optimal for regret. There is no contradiction, because its objective contains no error rate and its guarantee is prior-averaged. The vault's caveats: TS is poor at best-arm identification; platforms usually also want an interval on the losing variant, which is why testing stays dominant; and the mSPRT paper leaves adaptive allocation open. One vault result does cover it: the sequential ATE sequence in [[Confidence Sequences]] allows assignment probabilities $P_t \in [p_{\min}, 1-p_{\min}]$ that depend on the past, giving an anytime-valid interval under bandit-style allocation.

### Practical Implications

A protocol for a geo or user-level media test:

1. **Write the monitoring rule before launch**: primary KPI, model, prior, look schedule, maximum duration, decision rule. For a Bayesian the stopping rule is ignorable only if it is a function of modelled data, so pre-specification is what makes the ignorability argument true ([[Garden of Forking Paths]]).
2. **Use an archive prior.** Fit the effect-size prior from past tests (Gelman's marketing A/B calibration is $\sigma_0 = 0.01$ on log spend). The same variance is the optimal mSPRT mixing variance, so one number serves both analyses.
3. **Set a minimum run length** of one full weekly cycle plus the adstock and conversion-delay window. No stopping rule rescues looks that are biased by incomplete cohorts or carryover.
4. **Simulate the whole procedure, not just the final analysis**: draw $\theta$ from the prior *and* fix it at zero and at break-even iROAS; report how often the rule stops, the sign error and the exaggeration ratio. This is SBC applied to the stopped design.
5. **Decide with expected value, report with shrinkage.** Ship if $E(\theta\mid y) > c/b$; publish the posterior mean and interval, never the raw lift at the stopping time. A stop-on-success lift passed into an MMM as a prior carries its exaggeration with it.
6. **If anyone is promised an error rate** (finance, a platform partner, a paper), report a confidence sequence or mSPRT $p$-value alongside the posterior. Set $\rho$ near one tenth of planned $n$; the width cost is under a factor of two. Stopping for harm can be aggressive; stopping for success should clear the anytime bound.
7. **For always-on bandit allocation**, read out from the model posterior or the adaptive-assignment confidence sequence, not from naive arm means.

**Decision rule.** Ask who consumes the result. *Only my own expected-utility decision, with a prior I would bet on*: peek freely. *A claim others will threshold, or a prior I picked for convenience*: use anytime-valid inference, which is a Bayes factor with the archive prior anyway. *An estimate that feeds another model*: shrink it and record the stopping rule.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[The Peeking Problem and Optional Stopping]] | Error inflation, LIL theorem, remedy menu, Bayesian-monitoring caveat |
| [[Always-Valid p-values and the mSPRT]] | Mixture likelihood ratio, Ville bound, optimal mixing variance |
| [[Confidence Sequences]] | Interval dual, Lemma 3, width cost, adaptive-assignment ATE sequence |
| [[Data Collection Models]] | Ignorability conditions applied here to stopping rules |
| [[Lindley's Information Measure]] | Information-threshold stopping equals Wald's SPRT |
| [[Sequential and Adaptive BED]] · [[Open Challenges and Future Directions]] | Posterior-as-prior updating; misspecification and the likelihood principle |
| [[Bernoulli Bandit and Thompson Sampling Algorithm]] · [[Regret Bounds for Thompson Sampling]] | Adaptive allocation with plain Bayes updates; Bayesian vs conditional regret |
| [[Simulation-Based Calibration - Overview]] · [[Data-Averaged Posterior Self-Consistency]] | Prior-averaged calibration vs a single fixed truth |
| [[From Inference to Decision]] · [[Decision Analysis]] | Expected-value decision rule; thresholds; $\sigma_0$ calibration |
| [[Type S and Type M Errors]] | Selection on significance exaggerates |
| [[Varieties of Bayesian Theory]] · [[Asymptotics and Frequentist Connections]] | M-open conditioning; when the prior washes out |
| [[Garden of Forking Paths]] · [[Forking Paths and Bayesian Approaches]] | Stopping rule as a data-contingent analysis choice |
| Johari 2015 - Always Valid Inference | Secs. 3-5 |
| Howard 2021 - Time-uniform Nonparametric Confidence Sequences | Secs. 1-4.2, 6 |

## Related Concepts

- [[Empirical Bayes - Overview]] — how the mixing distribution / effect prior is fitted from past experiments
- [[Constructing Priors for Effect Sizes]] — exaggeration factors and meta-analytic priors
- [[Multiple Testing Corrections]] — peeking is multiplicity over time; always-valid $p$-values plug into Bonferroni and BH-G
- [[Delayed and Censored Feedback - Overview]] — the main way stopping becomes non-ignorable in media tests
- [[Pre-registration and Open Science - Overview]] — the procedural fix for the stopping-rule fork
- [[Q - Four Meanings of Calibration]] — prior-averaged vs fixed-parameter calibration in context

## Gaps

- **No note on the likelihood principle or stopping-rule ignorability.** [[Data Collection Models]] covers surveys, experiments, observational studies and censoring but not sequential designs; the derivation in Section 2 is synthesis.
- **No Bayesian optimal stopping or value-of-information for sample size**: when is another week of test worth its cost? [[Decision Analysis]] gives only the terminal decision.
- **Group-sequential / alpha-spending designs** get one paragraph. For geo tests with 6-10 weekly looks they are the natural frequentist tool.
- **No treatment of e-values / test martingales** as the general theory behind Section 3, and nothing on inference after bandit allocation beyond one section of the confidence-sequence note.

## Follow-Up Questions

- For a weekly-look geo test, how much wider is a confidence sequence than an O'Brien-Fleming boundary, and than the Bayesian interval under the archive prior?
- How should a stop-on-success experiment be down-weighted when used as an MMM prior?
- Can the adaptive-assignment confidence sequence be combined with Thompson sampling on creatives to give regret control and a valid readout at once?
