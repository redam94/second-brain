---
title: Pre-Trend Testing and Its Pitfalls
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/difference-in-differences
  - topic/event-study
  - topic/inference
  - type/concept
  - doc/paper
source:
  - "[[raw/Roth 2022 - Pretest with Caution.pdf]]"
  - "[[raw/Roth 2023 - Whats Trending in Difference-in-Differences.pdf]]"
source_location: "Roth 2022 (AER: Insights 4(3)) §I (Tables 1-3, Fig. 1), pp. 307-313; §II (Props. 1-4, eq. 4), pp. 314-318; §III p. 319. Roth, Sant'Anna, Bilinski & Poe 2023 §4.3-4.4.1"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Event Study Designs and Dynamic Treatment Effects]]"
  - "[[Differences-in-Differences]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Honest DiD - Sensitivity to Parallel Trends Violations]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - Pre-trends test
  - Parallel trends pre-test
  - Pretest bias
  - Pretest with Caution
  - Roth 2022
---

# Pre-Trend Testing and Its Pitfalls

> [!summary]
> The standard defence of parallel trends — "no pre-treatment event-study coefficient is significant" — fails in two distinct ways (Roth 2022). **Low power:** in simulations calibrated to 12 published AEA-journal event studies, a *linear* differential trend that the pre-test catches only 50–80% of the time often produces bias as large as the estimated treatment effect, and nominal 95% intervals that exclude the truth up to 98% of the time. **Pre-test bias:** the datasets that pass the pre-test are a selected sample. Conditional on passing, $\mathbb E[\hat\beta_{post}] = \tau_{post} + \delta_{post} + \Sigma_{12}\Sigma_{22}^{-1}(\mathbb E[\hat\beta_{pre}\mid\text{pass}]-\beta_{pre})$, and under homoskedasticity with a monotone trend the extra term has the *same sign* as the trend bias — passing the test makes things worse. The prescription is not to stop plotting event studies but to report power against relevant violations and to replace the binary test with [[Honest DiD - Sensitivity to Parallel Trends Violations|sensitivity analysis]].

## Overview

Using the decomposition from [[Event Study Designs and Dynamic Treatment Effects#^def-event-study-decomposition|the event-study note]], $\beta=\tau+\delta$ with $\tau_{pre}=0$: the pre-test examines $H_0:\delta_{pre}=0$, while the assumption actually needed is $\delta_{post}=0$. Roth et al. (2023, §4.4) list four problems with this practice:

1. **Parallel pre-trends do not imply parallel post-trends.** Kahn-Lang & Lang's example: boys' and girls' average heights evolve in parallel until about 13 and then diverge — not a causal effect of bar mitzvahs.
2. **Low power.** Failing to reject is not evidence of absence. As Bilinski & Hatfield put it, pre-tests "reverse the traditional roles of type I and type II error": parallel trends is the null, so the 5% guarantee protects against *falsely finding* a violation, not against missing one.
3. **Pre-test bias.** Conditioning the analysis on passing distorts estimation and inference.
4. **No guidance after rejection.** "With enough precision, we will nearly always reject that the parallel trends assumption holds exactly," yet a small violation may still allow useful inference.

Roth (2022) quantifies (2) and (3).

## Main Content

> [!definition] Roth's finite-sample normal model and the NIS pre-test ^def-pretest-model
> $$
> \hat\beta = \begin{pmatrix}\hat\beta_{pre}\\ \hat\beta_{post}\end{pmatrix}\sim\mathcal N(\beta,\Sigma), \qquad \beta = \begin{pmatrix}\delta_{pre}\\ \delta_{post}\end{pmatrix} + \begin{pmatrix}0\\ \tau_{post}\end{pmatrix}, \qquad \hat\beta_{pre}\in\mathbb R^K,\ \hat\beta_{post}\in\mathbb R^M
> $$
> with partition $\operatorname{Var}\begin{pmatrix}\hat\beta_{post}\\ \hat\beta_{pre}\end{pmatrix} = \begin{pmatrix}\Sigma_{11}&\Sigma_{12}\\ \Sigma_{21}&\Sigma_{22}\end{pmatrix}$. The most common test in practice passes when **no individual lead is significant**:
> $$
> \hat\beta_{pre}\in B_{NIS}(\Sigma) = \{\beta\in\mathbb R^K : |\beta_t|\le1.96\,\sigma_t\ \ \forall t\}
> $$
> In Roth's survey all 12 papers show pointwise CIs, 5 of 12 explicitly discuss individual significance, only one reports a joint test, and **none** discusses what magnitude of pre-trend the data could rule out. Normality is imposed exactly so that any distortion is attributable to trends or pre-testing rather than to asymptotic approximation; it covers TWFE, Callaway–Sant'Anna, Sun–Abraham and other asymptotically normal event-study estimators (Remark 1).

### Pitfall 1 — low power

For each paper Roth finds the linear-trend slope $\gamma$ ($\delta_t=\gamma t$) at which the NIS test rejects with probability 0.5 or 0.8 ($\gamma_{0.5},\gamma_{0.8}$), then computes the bias and coverage of the usual estimator $\hat\tau = l^\top\hat\beta_{post}$ with CI $\hat\tau\pm1.96\sigma_{\hat\tau}$.

- Under $\gamma_{0.8}$ — the conventional "minimum detectable" benchmark — the bias in the average post-period effect "is often of a magnitude comparable to, and in some cases larger than, the estimated treatment effect" (Fig. 1).
- Null rejection rates of nominal 5% tests for $\bar\tau$ (Table 2, unconditional): under $\gamma_{0.5}$ they range from 0.09 to 0.76; under $\gamma_{0.8}$ from 0.14 to **0.98**. In the most extreme $\gamma_{0.5}$ case a 95% CI covers the truth only 24% of the time.

> [!example] Two-period intuition ^ex-pretest-symmetry
> One lead, one lag ($K=M=1$), equal variances, true effect zero, linear trend so $\delta_{pre}=-\delta_{post}$. By symmetry, the probability that the lead's CI excludes zero equals the probability that the lag's CI excludes zero. So a trend the pre-test catches half the time *also* generates a spuriously significant "treatment effect" half the time — "ten times more often than a 95 percent CI is supposed to reject." More post-periods make it worse (linear bias grows with horizon); more pre-periods help — but only if early pre-periods are informative, which they are not when "treatment status [is] determined only by events close to the time of treatment."

Non-linear violations can be worse still: a convex (e.g. exponential) differential trend is small pre-treatment, hence rarely detected, but large post-treatment; a concave trend is the benign case.

### Pitfall 2 — pre-test bias

> [!theorem] Proposition 1 — conditional mean after pre-testing ^thm-pretest-prop1
> For any acceptance region $B(\Sigma)$,
> $$
> \mathbb E\left[\hat\beta_{post}\mid\hat\beta_{pre}\in B(\Sigma)\right] = \tau_{post} + \delta_{post} + \Sigma_{12}\Sigma_{22}^{-1}\left(\mathbb E\left[\hat\beta_{pre}\mid\hat\beta_{pre}\in B(\Sigma)\right]-\beta_{pre}\right)
> $$
> *Proof sketch.* $\tilde\beta_{post} = \hat\beta_{post}-\Sigma_{12}\Sigma_{22}^{-1}\hat\beta_{pre}$ is uncorrelated with, hence (by normality) independent of, $\hat\beta_{pre}$; take conditional expectations of $\hat\beta_{post} = \tilde\beta_{post}+\Sigma_{12}\Sigma_{22}^{-1}\hat\beta_{pre}$.
>
> Three terms: the target, the unconditional trend bias, and a **pre-test bias** equal to the regression of post on pre coefficients times the truncation-induced shift in the mean of the leads. Corollary: if parallel trends truly holds ($\delta=0$) and the test is symmetric, $\hat\beta_{post}$ remains unbiased after pre-testing.

> [!theorem] Proposition 2 — bias is exacerbated under monotone trends ^thm-pretest-prop2
> **Assumption 1:** $\Sigma$ has common diagonal $\sigma^2$ and common off-diagonal $\rho>0$, $\sigma^2>\rho$ — implied by homoskedastic errors in the non-staggered TWFE event study, where $\hat\beta_s = \beta_s+\Delta\bar\epsilon_s-\Delta\bar\epsilon_0$ gives $\rho=\sigma^2/2$. If $\delta_{pre}<0$ elementwise and $\delta_{post}>0$ (an upward differential trend), then
> $$
> \mathbb E\left[\hat\beta_{post}\mid\hat\beta_{pre}\in B_{NIS}(\Sigma)\right]\ >\ \beta_{post}\ >\ \tau_{post}
> $$
> (and symmetrically for downward trends). *Intuition:* with a true negative lead, draws that pass the test have leads that are unusually *high* (close to zero); since leads and lags are positively correlated through the shared reference period, the lags in those draws are unusually high too.

> [!theorem] Propositions 3-4 — variance shrinks after pre-testing ^thm-pretest-prop34
> $$
> \operatorname{Var}\left[\hat\beta_{post}\mid\hat\beta_{pre}\in B\right] = \operatorname{Var}[\hat\beta_{post}] + \Sigma_{12}\Sigma_{22}^{-1}\left(\operatorname{Var}[\hat\beta_{pre}\mid\hat\beta_{pre}\in B]-\operatorname{Var}[\hat\beta_{pre}]\right)\left(\Sigma_{12}\Sigma_{22}^{-1}\right)^\top
> $$
> and if $B$ is convex (true for individual and joint significance tests), the conditional variance is weakly smaller. So under *true* parallel trends conventional CIs tend to **over-cover** after a pre-test; under violated parallel trends the bias dominates and they **under-cover**.

Empirically (Table 3), the additional bias from conditioning, as a percentage of the unconditional bias under $\gamma_{0.5}$, ranges from $-29\%$ to $+103\%$ for the first-period effect $\tau_1$ and from $-25\%$ to $+48\%$ for the average effect $\bar\tau$; it has the same sign as the trend bias in all but two ($\bar\tau$) or three ($\tau_1$) of the twelve papers. The share is larger for early periods because trend bias grows with horizon while pre-test bias need not.

### Pre-tests as a publication filter

With a fraction $\theta$ of studies having violation $\bar\delta$ and the rest none (eq. 4):

$$
\frac{\text{Bias}^{Pretest}}{\text{Bias}^{NoTest}} = \underbrace{\frac{\mathbb P(\delta=\bar\delta\mid\hat\beta_{pre}\in B)}{\mathbb P(\delta=\bar\delta)}}_{\text{relative share of biased studies}\ (\le1)}\cdot\underbrace{\frac{\mathbb E[\hat\beta_{post}-\tau_{post}\mid\delta=\bar\delta,\hat\beta_{pre}\in B]}{\bar\delta_{post}}}_{\text{bias ratio when a biased study passes}\ (\text{often}>1)}
$$

Screening helps only if the first factor is small enough. It converges to one — screening is useless or harmful — when $\theta\to1$ (low ex-ante credibility) or when the Bayes factor $\mathbb P(\text{pass}\mid\bar\delta)/\mathbb P(\text{pass}\mid0)\to1$ (an underpowered test). This is a selection mechanism in the same family as publication bias and the "garden of forking paths."

### What to do instead (Roth 2022 §III; Roth et al. 2023 §4.4.1, §4.6)

1. **Report power.** Use the `pretrends` R package to compute the slope (or a hypothesised non-linear path) detectable with 50%/80% power and the implied bias — a design-stage exercise akin to [[Power Analysis and Sample Size]].
2. **Non-inferiority / equivalence pre-tests** (Bilinski & Hatfield; Dette & Schumann): test $H_0:\max_{r<0}|\beta_r|\ge c$ so that a *large* pre-trend is detected with probability $\ge1-\alpha$. Better, but still no guarantee for the treatment-effect CI and still a pre-test.
3. **Avoid the pre-test altogether**: Freyaldenhoven, Hansen & Shapiro's covariate-proxy approach, or [[Honest DiD - Sensitivity to Parallel Trends Violations|Rambachan & Roth's honest confidence sets]].
4. **Construct rather than test** parallel trends: SDID reweights units and periods so that trends are parallel by design and still delivers valid large-panel inference; its authors note that it "addresses pretesting concerns recently expressed in Roth [2018]" (Arkhangelsky et al. §1) — see [[SDID vs DiD vs Synthetic Control]].
5. **Bring context.** "Bringing economic knowledge to bear on how parallel trends might plausibly be violated … will yield stronger, more credible inferences than relying on the statistical significance of pre-trends tests alone."

## Examples

**Selected rows from Roth's survey** (Table 1: observed leads; Table 2: null rejection probability of a nominal 5% test for $\bar\tau$ under $\gamma_{0.8}$):

| Paper | # pre-periods | Max $\lvert t\rvert$ | Unconditional | Conditional on passing |
|---|---|---|---|---|
| Bailey & Goodman-Bacon (2015) | 5 | 1.67 | 0.94 | 0.95 |
| Deryugina (2017) | 4 | 1.09 | 0.84 | **1.00** |
| Deschenes et al. (2017) | 5 | 2.24 | 0.14 | 0.25 |
| Lafortune et al. (2017) | 5 | 1.38 | 0.98 | 0.99 |
| Bosch & Campos-Vazquez (2014) | 11 | 2.36 | 0.86 | 0.61 |

Caveats Roth states: the sample is published papers (selected on passing), and the calibration uses linear violations.

**Simulating pre-test bias** for a geo/store event study:

```python
import numpy as np
rng = np.random.default_rng(0)
K, M, sigma2 = 4, 4, 1.0
Sigma = np.full((K + M, K + M), sigma2 / 2) + np.eye(K + M) * sigma2 / 2   # Assumption 1, rho = sigma^2/2
t = np.r_[-np.arange(K, 0, -1), np.arange(1, M + 1)]                        # relative time
gamma = 0.35                                                                 # differential slope, true tau = 0
b = rng.multivariate_normal(gamma * t, Sigma, size=200_000)
passed = (np.abs(b[:, :K]) <= 1.96 * np.sqrt(sigma2)).all(axis=1)
tau_bar = b[:, K:].mean(axis=1)
print("power of pre-test:", 1 - passed.mean())
print("unconditional bias:", tau_bar.mean(), " conditional on passing:", tau_bar[passed].mean())
# -> power ~0.41; unconditional bias ~0.87; conditional-on-passing bias ~1.21
# conditional bias exceeds unconditional bias (+38%), as Proposition 2 predicts
```

**Marketing reading.** "The pre-period lift chart is flat, so the test is clean" is this exact pre-test. With 4–8 noisy pretest weeks, the detectable differential slope is large; over a multi-week test window a slope half that size accumulates into a lift-sized bias. Report what trend the pretest *could* have detected, and prefer designs (randomised geos, SDID-style reweighting) that make the question moot.

## Connections

- [[Event Study Designs and Dynamic Treatment Effects]] — supplies $\hat\beta_{pre}$, $\hat\beta_{post}$ and $\Sigma$.
- [[Differences-in-Differences]] — where "include leads to test for pre-trends" is first recommended.
- [[Identifying Assumptions for Staggered DiD]] — what the pre-test is meant to probe; Callaway–Sant'Anna placebo $ATT$s are subject to the same critique (Roth 2022, Remark 1).
- [[Multiple Testing Corrections]] — the NIS criterion is a union of $K$ individual tests; its size and power depend on $K$ and on $\Sigma$.
- [[Covariate Balance and Matching Diagnostics]] — the same "absence of evidence" problem arises with balance tests after matching.
- [[Sensitivity Analysis in Observational Studies]] — the general alternative to assumption pre-testing.

## See Also

- [[Honest DiD - Sensitivity to Parallel Trends Violations]]
- [[Synthetic Difference-in-Differences - Overview]]
- [[Simultaneous Inference via Multiplier Bootstrap]]
- [[Standard Errors and Clustering]]
