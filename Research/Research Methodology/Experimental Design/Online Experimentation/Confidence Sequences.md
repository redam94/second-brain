---
title: Confidence Sequences
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/sequential-analysis
  - topic/concentration-inequalities
  - type/concept
  - doc/paper
source: "[[raw/Howard 2021 - Time-uniform Nonparametric Confidence Sequences.pdf]]"
source_location: "Secs. 1-4.2 and 6 (pp. 1-15, 18-20): Definitions 1-2, Lemmas 1-3, Theorems 1 and 4, Propositions 2-3, Corollary 2, Eqs. 1-27"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[The Peeking Problem and Optional Stopping]]"
  - "[[Always-Valid p-values and the mSPRT]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Online Experimentation - Overview]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
aliases:
  - Confidence Sequence
  - Anytime-Valid Confidence Intervals
  - Always-Valid Confidence Intervals
  - Time-Uniform Confidence Intervals
  - Uniform Boundaries
  - Finite LIL Bound
---

# Confidence Sequences

> [!summary]
> A $(1-\alpha)$ **confidence sequence** is a sequence of intervals $(\mathrm{CI}_t)_{t \ge 1}$ with $\mathbb P(\forall t \ge 1: \theta_t \in \mathrm{CI}_t) \ge 1 - \alpha$: the coverage statement holds *simultaneously for all sample sizes*, hence at any data-dependent stopping time. Howard, Ramdas, McAuliffe & Sekhon (*Annals of Statistics* 2021) build them from **uniform boundaries** $u(v)$ for a centred sum $S_t$ measured against an "intrinsic time" $V_t$, under a nonparametric **sub-$\psi$** condition (a supermartingale bound on $\exp\{\lambda S_t - \psi(\lambda)V_t\}$). Two constructions matter in practice: the closed-form **stitched** boundary, growing at the law-of-the-iterated-logarithm rate $\sqrt{v\log\log v}$, and **conjugate mixture** boundaries such as the normal mixture $u(v) = \sqrt{(v+\rho)\log((v+\rho)/(\alpha^2\rho))}$, which is exactly the Gaussian [[Always-Valid p-values and the mSPRT|mSPRT]] made nonparametric. The cost of anytime validity is less than a doubling of the fixed-sample CLT width over five orders of magnitude of $t$.

## Overview

The paper is motivated directly by A/B testing: experiments "are inherently sequential", results "are often monitored continuously using inferential methods that assume a fixed sample", and most tests "are run with little formal planning and fluid decision-making" compared with clinical trials (Sec. 1). See [[The Peeking Problem and Optional Stopping]]. The authors want intervals with four properties:

- **(P1) Nonasymptotic and nonparametric** — coverage at every sample size without distributional assumptions.
- **(P2) Unbounded sample size** — no horizon needs to be fixed; one may tune for a planned $n$ but always keep sampling.
- **(P3) Arbitrary stopping rules** — no assumption on how the experimenter decides to stop or act.
- **(P4) Asymptotically zero width** — widths shrink at $1/\sqrt t$ up to log factors.

Fixed-sample CLT intervals satisfy none of P1-P3. The idea dates to Darling & Robbins (1967); the same objects are called *repeated confidence intervals* (Jennison & Turnbull), *always-valid confidence intervals* (Johari et al.) and *anytime confidence intervals* in the bandit literature, where they drive best-arm identification.

## Main Content

> [!definition] Confidence sequence (Eq. 1) ^def-confidence-sequence
> For $\alpha \in (0,1)$, a $(1-\alpha)$-confidence sequence for a (possibly time-varying) estimand $(\theta_t)$ is a sequence of sets $(\mathrm{CI}_t)_{t=1}^\infty$, typically intervals $(L_t, U_t)$, such that
>
> $$
> \mathbb P\big(\forall t \ge 1 : \theta_t \in \mathrm{CI}_t\big) \ge 1 - \alpha .
> $$

> [!theorem] Equivalent forms of time-uniformity (Lemma 3) ^thm-equivalence
> For an adapted sequence of events $(A_t)$ the following are equivalent: (a) $\mathbb P(\bigcup_{t} A_t) \le \alpha$; (b) $\mathbb P(A_T) \le \alpha$ for all *random* times $T$, not necessarily stopping times; (c) $\mathbb P(A_\tau) \le \alpha$ for all stopping times $\tau$. Taking $A_t = \{\theta_t \notin \mathrm{CI}_t\}$ shows the definition above coincides with Johari et al.'s stopping-time definition; taking $A_t = \{p_t \le \alpha\}$ shows an always-valid $p$-value is equivalently one with $\mathbb P_0(\exists t: p_t \le \alpha) \le \alpha$.

So confidence sequences, always-valid $p$-values and sequential tests are three views of one object: reject $H_0: \theta = \theta^\star$ the first time $\theta^\star \notin \mathrm{CI}_t$. Whenever the radius $u(V_t)/t \to 0$ this is a **test of power one**.

### From tail bounds to sequences

Let $\mu_t = t^{-1}\sum_{i \le t}\mathbb E_{i-1}X_i$ be the running average conditional mean and $S_t = \sum_{i \le t}(X_i - \mathbb E_{i-1}X_i)$. If $\mathbb P(\exists t: S_t \ge u_\alpha(V_t)) \le \alpha$ for some adapted **intrinsic time** $V_t$ (a variance process; $V_t = t$ in the simplest case), then $\bar X_t - u_\alpha(V_t)/t$ is a lower confidence sequence for $\mu_t$. Apply the same to $-S_t$ and take a union bound for two-sided sequences.

> [!definition] Sub-$\psi$ process and uniform boundary (Definitions 1-2) ^def-sub-psi
> $(S_t)$ is **sub-$\psi$ with variance process $(V_t)$** if for each $\lambda \in [0, \lambda_{\max})$ there is a supermartingale $L_t(\lambda)$ with $\mathbb E L_0 \le 1$ and
>
> $$
> \exp\{\lambda S_t - \psi(\lambda)V_t\} \le L_t(\lambda) \quad \text{a.s. for all } t .
> $$
>
> A function $u$ is a **sub-$\psi$ uniform boundary with crossing probability $\alpha$** if $\sup \mathbb P(\exists t \ge 1: S_t \ge u(V_t)) \le \alpha$ over all sub-$\psi$ pairs $(S_t, V_t)$.

$\psi$ plays the role of a cumulant generating function. The catalogue is sub-Gaussian $\psi_N(\lambda) = \lambda^2/2$, sub-Bernoulli, sub-Poisson, sub-exponential, and **sub-gamma** $\psi_{G,c}(\lambda) = \lambda^2/(2(1-c\lambda))$. Any process with an MGF near zero is sub-gamma (Prop. 1), so a sub-gamma boundary is a universal fallback.

> [!theorem] Linear boundary (Lemma 1) ^thm-linear-boundary
> For any $\lambda \in [0,\lambda_{\max})$,
>
> $$
> u(v) = \frac{\log(1/\alpha)}{\lambda} + \frac{\psi(\lambda)}{\lambda}\, v
> $$
>
> is a sub-$\psi$ uniform boundary with crossing probability $\alpha$.

This is Ville's inequality applied to one exponential supermartingale; in the Gaussian case it is Wald's SPRT line. Because $u(v)/v \not\to 0$, the resulting interval never shrinks to zero (P4 fails): a single $\lambda$ is a single point alternative. Two ways to bend the line give the paper's main tools.

### Stitching (Theorem 1)

Split intrinsic time into geometric epochs $\eta^k \le V_t < \eta^{k+1}$, use a linear boundary tuned to each epoch with error budget $\alpha/h(k)$ where $\sum_k 1/h(k) \le 1$, and union-bound ("peeling"). With $h(k) \propto (k+1)^s$ this yields the **polynomial stitched boundary**, a *finite LIL bound*, $\mathcal S_\alpha(v) \sim \sqrt{s k_1^2\, v \log\log v}$ with $s k_1^2$ arbitrarily close to 2. With $\eta = 2$, $s = 1.4$, $m = 1$, for i.i.d. 1-sub-Gaussian observations:

$$
\bar X_t \pm 1.7\sqrt{\frac{\log\log(2t) + 0.72\log(10.4/\alpha)}{t}} \qquad \text{(two-sided, Eq. 2).}
$$

Corollary 1 recovers the classical upper LIL, $\limsup_t S_t/\sqrt{2V_t\log\log V_t} \le 1$, confirming the rate is unimprovable.

### Conjugate mixtures (Lemma 2)

Integrate the exponential supermartingale against a distribution $F$ on $\lambda$: $m(s,v) = \int \exp\{\lambda s - \psi(\lambda)v\}\,dF(\lambda)$ is again bounded by a supermartingale, and $\mathcal M_\alpha(v) = \sup\{s : m(s,v) < 1/\alpha\}$ is a uniform boundary. This is Robbins' **method of mixtures**, the same device as the mSPRT.

> [!definition] Two-sided normal mixture boundary (Eq. 14) ^def-normal-mixture
> For a sub-Gaussian process, mixing over $\lambda \sim N(0, 1/\rho)$ gives the closed form
>
> $$
> u(v) = \sqrt{(v + \rho)\,\log\!\left(\frac{v+\rho}{\alpha^2 \rho}\right)},
> $$
>
> so for i.i.d. observations with variance (proxy) $\sigma^2$ the confidence sequence is $\bar X_t \pm \sigma\, u(t)/t$. The tuning parameter $\rho > 0$ sets *where* the boundary is tightest: $u(v)/\sqrt v$ is minimised at $v = m$ with $m/\rho = -W_{-1}(-\alpha^2/e) - 1$ (Prop. 3, $W_{-1}$ the lower Lambert branch).

Every mixture with a density positive at the origin grows like $\sqrt{v\log v}$ (Prop. 2), slightly faster than the LIL rate. The authors argue this is the better practical trade: linear boundaries degrade fastest away from their optimised time, mixtures much more slowly, stitched boundaries slowest, and mixtures are tighter over the range one actually cares about (Sec. 3.5, Fig. 4). In the sub-Gaussian case mixture boundaries are *unimprovable* (Sec. 3.6). Analogous beta-binomial, gamma-Poisson and gamma-exponential mixtures cover the other $\psi$ families. In a parametric exponential family, rejecting when the mixture sequence excludes $\mu^\star$ **is** the mSPRT (Sec. 6); confidence sequences are its nonparametric generalisation.

### Empirical-Bernstein sequence and the sequential ATE

> [!theorem] Empirical-Bernstein confidence sequence (Theorem 4) ^thm-empirical-bernstein
> Suppose $X_t \in [a,b]$ a.s., let $(\hat X_t)$ be any $[a,b]$-valued *predictable* sequence, and let $u$ be a sub-exponential uniform boundary with scale $c = b - a$ and crossing probability $\alpha$. Then
>
> $$
> \mathbb P\left(\forall t \ge 1: |\bar X_t - \mu_t| < \frac{u\big(\sum_{i \le t}(X_i - \hat X_i)^2\big)}{t}\right) \ge 1 - 2\alpha .
> $$

The intrinsic time is the *observed* sum of squared prediction errors, so the width adapts to the true variance (like a $t$-test) with no variance knowledge, no common mean and no independence. Better predictions $\hat X_i$ (trends, seasonality, regression on covariates, ML) shrink the interval, but coverage holds for *any* predictions. This is the sequential counterpart of [[CUPED and Regression-Adjusted Variance Reduction|CUPED]].

**Sequential ATE under the Neyman–Rubin model (Sec. 4.2).** Potential outcomes $Y_t(0), Y_t(1) \in [0,1]$ are fixed; the only randomness is assignment $Z_t$ with $P_t = \mathbb E_{t-1}Z_t \in [p_{\min}, 1-p_{\min}]$, which may depend on the past (biased-coin and adaptive designs are allowed). With predictable guesses $\hat Y_t(k)$, the augmented IPW pseudo-outcome

$$
X_t = \hat Y_t(1) - \hat Y_t(0) + \frac{Z_t - P_t}{P_t(1-P_t)}\big(Y_t^{\text{obs}} - \hat Y_t(Z_t)\big)
$$

is conditionally unbiased for $Y_t(1) - Y_t(0)$, and Corollary 2 gives $\mathbb P(\forall t: |\bar X_t - \mathrm{ATE}_t| < u(V_t)/t) \ge 1 - 2\alpha$ for a sub-exponential boundary with scale $2/p_{\min}$. This is a design-based, finite-sample, always-valid interval for the running sample ATE, in the spirit of [[Randomization Inference - Overview]]. In the paper's simulation the bound is about twice the CLT width for $t$ from $10^2$ to $10^5$, while the CLT interval fails to cover at many times. Howard et al. note that Optimizely's two-sample mSPRT relied on asymptotics "which lack rigorous justification"; this construction supplies it.

### Running intersection

If $\theta$ is truly constant, $\widetilde{\mathrm{CI}}_t = \bigcap_{s \le t}\mathrm{CI}_s$ is also valid and never wider (equivalently $\min_{s \le t} p_s$ is always valid). But under drift the intersection can become *empty*; Optimizely's fix was to reset the experiment. The authors recommend the non-intersected sequence and a time-varying estimand $\mathrm{ATE}_t$, which stays meaningful under non-stationarity such as novelty effects or day-of-week cycles.

## Examples

**Width penalty (own computation from Eqs. 2 and 14, $\alpha = 0.05$, unit variance).** Ratio of the confidence-sequence radius to the fixed-sample $1.96/\sqrt t$:

| $t$ | Normal mixture, $\rho = 100$ | Normal mixture, $\rho = 1000$ | Stitched (Eq. 2) |
|---|---|---|---|
| $10^2$ | 1.87 | 4.17 | 2.04 |
| $10^3$ | 1.55 | 1.87 | 2.10 |
| $10^4$ | 1.67 | 1.55 | 2.15 |
| $10^5$ | 1.83 | 1.67 | 2.18 |

The mixture is tightest near $t \approx 10\rho$ and degrades slowly on both sides, so choose $\rho$ about one tenth of the planned sample size. A factor 1.6 in width is a factor of about 2.5 in sample size for the same precision at a *fixed* time, but the experimenter may stop the moment the interval excludes zero, which for large effects happens far earlier.

```python
import numpy as np

def normal_mixture_cs(x, sigma, alpha=0.05, rho=1000.0):
    """Two-sided anytime-valid CI for the mean of a sigma-sub-Gaussian stream."""
    t = np.arange(1, len(x) + 1)
    xbar = np.cumsum(x) / t
    radius = sigma * np.sqrt((t + rho) * np.log((t + rho) / (alpha**2 * rho))) / t
    return xbar - radius, xbar + radius

# Two-arm test with paired arrivals: x = y_treat - y_ctrl, sigma = sqrt(2) * sigma_arm.
# Stop (or ship) the first time the interval excludes 0; validity holds at any stopping time.
```

Reference implementations of all boundaries are in the authors' `confseq` R/Python package.

## Connections

- [[The Peeking Problem and Optional Stopping]] — pointwise intervals fail under monitoring because no $\sqrt{v}$ boundary survives the LIL.
- [[Always-Valid p-values and the mSPRT]] — dual object; the normal mixture boundary equals the Gaussian mSPRT threshold with $\rho = \sigma^2/\tau^2$.
- [[CUPED and Regression-Adjusted Variance Reduction]] — predictions $\hat X_t$ in the empirical-Bernstein sequence play the role of the control variate.
- [[Randomization Inference - Overview]] and [[Potential Outcomes Framework]] — the sequential ATE result is design-based with fixed potential outcomes.
- [[UCB and Greedy Algorithms for Bandits]] — UCB indices are one-sided confidence sequences; best-arm identification stops when sequences separate.
- [[Regret Bounds for Thompson Sampling]] — TS regret analysis only needs *some* valid upper confidence bound $U_t$ to exist; time-uniform boundaries are the sharpest generic source of such bounds.
- [[Multiple Testing Corrections]] — a Bonferroni split of $\alpha$ across metrics keeps simultaneous anytime coverage.

## See Also

- [[Online Experimentation - Overview]]
- [[Multi-Armed Bandits and Thompson Sampling - Overview]]
- [[Sequential and Adaptive BED]]
- [[Permutation Tests and Exact Inference]]
- [[Power Analysis and Sample Size]]
