---
title: Always-Valid p-values and the mSPRT
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/sequential-analysis
  - topic/hypothesis-testing
  - type/method
  - doc/paper
source: "[[raw/Johari 2015 - Always Valid Inference.pdf]]"
source_location: "Secs. 4-7 (pp. 13-37), Theorems 1-5, Propositions 1-4; critique from [[raw/Larsen 2022 - Statistical Challenges in Online Controlled Experiments.pdf]] Sec. 5 (pp. 19-20)"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[The Peeking Problem and Optional Stopping]]"
  - "[[Online Experimentation - Overview]]"
used_by:
  - "[[Confidence Sequences]]"
  - "[[Sample Ratio Mismatch and Trustworthiness Checks]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - Always Valid Inference
  - Always-Valid p-value
  - Anytime-Valid p-value
  - mSPRT
  - Mixture Sequential Probability Ratio Test
  - Sequential Test of Power One
---

# Always-Valid p-values and the mSPRT

> [!summary]
> Johari, Pekelis & Walsh (2015; *Operations Research* 2022) keep the familiar $p$-value interface but change its guarantee: an **always-valid $p$-value process** $(p_n)$ satisfies $\mathbb P_{\theta_0}(p_T \le s) \le s$ at **every stopping time** $T$, so users may watch the dashboard continuously and stop whenever they like. Theorem 1 shows such processes are in one-to-one correspondence with sequential tests that never accept $H_0$ (tests of **power one**). The recommended construction is Robbins' **mixture sequential probability ratio test (mSPRT)**: average the likelihood ratio over a prior $H$ on the alternative, reject when it exceeds $1/\alpha$, and publish $p_n = \min\{p_{n-1}, 1/\Lambda_n^H\}$. The mSPRT is first-order efficient for every user type simultaneously (Theorem 2), its mixing variance should roughly match the spread of true effects (Theorem 3), it beats a tuned fixed-horizon test on expected run time (Proposition 4), and its $p$-values plug into Bonferroni and Benjamini–Hochberg (Sec. 7). It was deployed at Optimizely in January 2015.

## Overview

The [[The Peeking Problem and Optional Stopping|peeking problem]] arises because a fixed-horizon $p$-value is super-uniform only at a pre-specified $n$. Classical sequential tests fix this but behave like black boxes that emit one decision at one stopping time tailored to one user's preferences. A platform serves thousands of users with unknown and heterogeneous trade-offs between power and run time, so Johari et al. ask for a *streaming* statistic that (i) controls type I error under any data-dependent stopping rule and (ii) leads each user, whatever her patience, to a near-optimal trade-off, without the platform knowing her preferences.

## Main Content

### Always validity and its duality with sequential tests

> [!definition] Always-valid p-value and confidence interval (Defs. 1-2) ^def-always-valid
> A sequence of fixed-horizon $p$-values $(p_n)$ is an **always-valid $p$-value process** if for any (possibly infinite) stopping time $T$ with respect to $(\mathcal F_n)$,
>
> $$
> \forall s \in [0,1]: \quad \mathbb P_{\theta_0}(p_T \le s) \le s .
> $$
>
> A sequence $(\mathrm{CI}_n)$ is an **always-valid $(1-\alpha)$ confidence interval process** if $\mathbb P_\theta(\theta \in \mathrm{CI}_T) \ge 1 - \alpha$ for all $\theta$ and all stopping times $T$.

> [!theorem] Duality with sequential tests (Theorem 1, Proposition 1) ^thm-duality
> 1. If $(T(\alpha), \delta(\alpha))$ is a sequential test, then $p_n = \inf\{\alpha : T(\alpha) \le n,\ \delta(\alpha) = 1\}$ is an always-valid $p$-value process.
> 2. Conversely, any always-valid $(p_n)$ yields a sequential test $\tilde T(\alpha) = \inf\{n : p_n \le \alpha\}$, $\tilde\delta(\alpha) = \mathbf 1\{\tilde T(\alpha) < \infty\}$.
> 3. If $(p_n^{\tilde\theta})$ is always valid for $H_0: \theta = \tilde\theta$ for each $\tilde\theta$, then $\mathrm{CI}_n = \{\theta : p_n^\theta > \alpha\}$ is an always-valid confidence interval process.
>
> The proof of (1) is one line: nestedness gives $\{p_n \le s\} \subset \{\delta(s + \varepsilon) = 1\}$ for every $n$, so $\mathbb P_{\theta_0}(p_T \le s) \le \mathbb P_{\theta_0}(\cup_n \{p_n \le s\}) \le s + \varepsilon$.

The $p$-value in (1) is monotone non-increasing in $n$ and is the a.s. smallest always-valid $p$-value attached to that test. Monotone always-valid $p$-values correspond one-to-one with sequential tests that "do not give up for failure" ($\delta = 0 \Rightarrow T = \infty$). Operationally: the user stops whenever she wants and thresholds $p_T$ at her own $\alpha$. If she waits for $p_n \le \alpha$ she recovers the underlying sequential test; if she quits earlier she gives up power but never validity. Howard et al. (Lemma 3) show the stopping-time definition is equivalent to the uniform statement $\mathbb P_{\theta_0}(\exists n : p_n \le \alpha) \le \alpha$; see [[Confidence Sequences]].

### The mSPRT

> [!definition] Mixture sequential probability ratio test (Sec. 5.2, Eqs. 7-9) ^def-msprt
> Let data come from a one-parameter exponential family $f_\theta(x) = f_0(x)\exp(\theta x - \psi(\theta))$ and let $H$ be a mixing distribution on $\Theta$ with positive continuous density. With sample mean $s_n$, the **mixture likelihood ratio** is
>
> $$
> \Lambda_n^H(s_n) = \int_\Theta \left(\frac{f_\theta(s_n)}{f_{\theta_0}(s_n)}\right)^{n} dH(\theta),
> $$
>
> and the mSPRT is $T^H(\alpha) = \inf\{n : \Lambda_n^H(S_n) \ge \alpha^{-1}\}$, $\delta^H(\alpha) = \mathbf 1\{T^H(\alpha) < \infty\}$. The associated always-valid $p$-value is $p_0 = 1$, $p_n = \min\{p_{n-1},\, 1/\Lambda_n^H\}$.

**Why the threshold is $1/\alpha$.** Under $H_0$ each likelihood ratio $\prod_{i \le n} f_\theta(X_i)/f_{\theta_0}(X_i)$ is a non-negative martingale with mean one, and so is any mixture of them. Ville's maximal inequality gives $\mathbb P_{\theta_0}(\exists n : \Lambda_n^H \ge 1/\alpha) \le \alpha$ (the "standard martingale techniques" of Siegmund 1985 cited in the paper). Wald's SPRT uses a single $\theta_1$; mixing over alternatives is what makes the test consistent against *every* $\theta \ne \theta_0$:

$$
\mathbb P_\theta\big(T(\alpha) < \infty,\ \delta(\alpha) = 1\big) = 1 \quad \text{for all } \theta \ne \theta_0 \qquad \text{(power one; Robbins \& Siegmund 1974).}
$$

**Gaussian closed form.** For $X_i \sim N(\theta, \sigma^2)$ and $H = N(\theta_0, \tau^2)$, carrying out the integral gives

$$
\Lambda_n = \sqrt{\frac{\sigma^2}{\sigma^2 + n\tau^2}}\; \exp\!\left\{\frac{n^2 \tau^2 (\bar X_n - \theta_0)^2}{2\sigma^2(\sigma^2 + n\tau^2)}\right\}.
$$

(Derived here from Eq. 7 and checked numerically; the paper states the integral form only.) Setting $\Lambda_n = 1/\alpha$ and writing $S = n(\bar X_n - \theta_0)/\sigma$, $\rho = \sigma^2/\tau^2$ gives the rejection boundary $|S| \ge \sqrt{(n + \rho)\log\big((n+\rho)/(\alpha^2 \rho)\big)}$, which is exactly the two-sided **normal mixture boundary** of Howard et al.; see [[Confidence Sequences#^def-normal-mixture]].

### Efficiency for unknown users

Users are modelled as **$(M, \alpha)$ types**: stop at the first $n$ with $p_n \le \alpha$ or at a maximum patience $M$, whichever is first. Performance is the *power profile* $\nu(\theta) = \mathbb P_\theta(\delta = 1)$ and the *relative run-length profile* $\rho(\theta) = \mathbb E_\theta(T)/M$. The key asymptotic (Pollak & Siegmund 1975) is that for any $H$, as $\alpha \to 0$,

$$
\frac{T^H(\alpha)}{\log(1/\alpha)} \to I(\theta, \theta_0)^{-1}, \qquad I(\theta,\theta_0) = (\theta - \theta_0)\psi'(\theta) - (\psi(\theta) - \psi(\theta_0)),
$$

the inverse Kullback–Leibler divergence. Three regimes follow (Sec. 5.3): **aggressive** users ($M \gg \log(1/\alpha)$) get $\rho \to 0$, $\nu \to 1$ (Prop. 2); **conservative** users ($M \ll \log(1/\alpha)$) get no power from *any* rule (Prop. 3); and for **Goldilocks** users ($M \sim \log(1/\alpha)$):

> [!theorem] First-order efficiency (Theorem 2) ^thm-msprt-efficiency
> Define the relative efficiency $\phi(M,\alpha) = \inf_{(T,\delta)} \inf_{\theta \ne \theta_0} \rho(\theta)/\rho(\theta;\alpha,M)$, the infimum over all feasible rules ($T \le M$, size $\le \alpha$) that are at least as powerful at every $\theta$. For any mixing distribution $H$, if $\alpha \to 0$ and $M \to \infty$ with $M = O(\log \alpha^{-1})$, then $\phi(M, \alpha) \to 1$.

No competitor can be uniformly faster while being uniformly at least as powerful, and one statistic achieves this for all $M$ at once.

> [!theorem] Choosing the mixing distribution (Theorem 3, Eq. 12) ^thm-mixing
> If true effects follow a prior $\theta \sim G$, the average relative run length is minimised to second order by $\gamma^* \in \arg\min_\gamma -\mathbb E_{\theta \sim G}\big[\mathbf 1_{A}\, I(\theta,\theta_0)^{-1} \log h_\gamma(\theta)\big]$, where $A = \{\theta : I(\theta, \theta_0) \ge \log(1/\alpha)/M\}$ is the set of detectable effects. For unit-variance normal data, $G = N(0, \tau^2)$ and $H_\gamma = N(0, \gamma^2)$,
>
> $$
> \gamma_*^2 = \tau^2\, \frac{\Phi(-b)}{\tfrac{1}{b}\phi(b) - \Phi(-b)}, \qquad b = \left(\frac{2\log \alpha^{-1}}{M\tau^2}\right)^{1/2}.
> $$
>
> The mixing variance is the prior variance of effects, corrected for truncation at $M$: weight larger effects when samples are scarce and smaller effects when data are ample.

Simulations (Sec. 5.6.1) show robustness: misspecifying $\gamma$ by one order of magnitude costs less than 5% average power and at most 10% run length; two orders of magnitude cost about 20% power and 40% run length. A platform can therefore fit $\tau^2$ empirically from its archive of past experiments, which is an [[Empirical Bayes - Overview|empirical-Bayes]] step; the paper shrinks observed effects with [[James-Stein Estimator|James–Stein]] before fitting $G$.

**Against fixed horizon (Prop. 4).** For a Goldilocks user, the expected relative run length of the truncated mSPRT divided by that of the fixed-horizon UMP test with the *same average power* tends to 0. On 10,000 real Optimizely experiments (Sec. 6.2, Fig. 5) the mSPRT usually finished before the fixed-horizon test calibrated to 80% average power; a user could beat it only by guessing the true effect to within about 50% relative error, which is "rarely achievable in practice". Against other always-valid boundaries of the form $S_n > \sqrt{2\beta(n,\alpha)/n}$ (Robbins 1970; the LIL-based bound of Kaufmann et al. 2014), the tuned mSPRT had about 5% more power and 20-40% shorter run length at practical $M$ (Sec. 5.6.3): the LIL bound wins only asymptotically.

### Two-stream A/B tests (Sec. 6.1)

Visitors are modelled as arriving in pairs $W_n = (X_n, Y_n)$, one per arm. For normal data with known common $\sigma^2$, $Y_n - X_n \sim N(\theta, 2\sigma^2)$ is a one-parameter family for any value of the nuisance mean, so the Gaussian mSPRT applies with $\sigma^2$ replaced by $2\sigma^2$ and gives **exact** uniform type I error control for the composite null $\theta = 0$. For Bernoulli data the pair does not reduce to a one-parameter family; the platform uses a CLT approximation with plug-in variance $\bar p_0(1-\bar p_0) + \bar p_1(1-\bar p_1)$, which is only *approximately* always valid (accurate for small $\alpha$, where the test does not stop before the normal approximation kicks in).

### Multiple testing (Sec. 7)

Evaluated at any stopping time, always-valid $p$-values are a legitimate set of fixed-horizon $p$-values. Hence **Bonferroni** (FWER) and **BH under general dependence** (BH-G, threshold $p_{(j)} \le \alpha j / (m\sum_{r \le m} 1/r)$) *commute* with always validity (Props. 7-8), and dashboards can show always-valid $q$-values. Plain BH under independence does not commute in general, because a stopping time that depends on all experiments correlates the $p$-values; Theorem 5 gives a sufficient condition under which FDR is still controlled (it holds, for example, for "stop at the first time $x$ hypotheses are rejected"). Theorem 4 gives FCR-controlling corrected intervals: use level $1 - R^{BH}\alpha/m$ for rejected and $1 - (R^{BH}+1)\alpha/m$ for non-rejected experiments. See [[Multiple Testing Corrections]].

### Limitations (Larsen et al. Sec. 5)

Optimality is proven only for exponential families, which excludes the ratio metrics common in industry; the pairing of observations is artificial; repeated observations from one user violate independence; adaptive (bandit) allocation is not covered; and the estimate at the stopping time is biased even though the error rate is controlled. Extensions include bootstrap mSPRT for unknown likelihoods (Abhishek & Mannor 2017), multinomial mSPRT for sequential [[Sample Ratio Mismatch and Trustworthiness Checks|SRM]] detection (Lindon & Malek 2020), and the nonparametric generalisation in [[Confidence Sequences]].

## Examples

**Simulation (own illustration).** Unit-variance normal stream, $H_0: \theta = 0$, $\alpha = 0.05$ (threshold $\Lambda_n \ge 20$), $N = 10{,}000$, 4,000 replications, checked after every observation.

| | $\tau^2 = 10^{-3}$ | $\tau^2 = 10^{-2}$ | $\tau^2 = 10^{-1}$ |
|---|---|---|---|
| False positive rate under $\theta = 0$ | 0.020 | 0.035 | 0.036 |

Naive continuous peeking gives 0.60 on the same data. With a true effect $\theta = 0.05$ (the fixed-horizon test needs $n = 3{,}140$ for 80% power) and $\tau^2 = 0.0025$: power by $N$ is 0.99, median stopping time 2,843, mean 3,359. About 55% of runs stop before the fixed-horizon $n$; the price of anytime validity is a right tail of longer runs, and the payoff is that large effects stop very early.

```python
import numpy as np

def msprt_pvalues(x, sigma2, tau2, theta0=0.0):
    """Always-valid p-values for a N(theta, sigma2) stream, mixing N(theta0, tau2).
    For a paired two-arm test pass x = y_treat - y_ctrl and sigma2 = 2 * sigma2_arm."""
    n = np.arange(1, len(x) + 1)
    xbar = np.cumsum(x) / n
    log_lam = (0.5 * np.log(sigma2 / (sigma2 + n * tau2))
               + n**2 * tau2 * (xbar - theta0)**2 / (2 * sigma2 * (sigma2 + n * tau2)))
    return np.minimum.accumulate(np.minimum(1.0, np.exp(-log_lam)))
```

## Connections

- [[The Peeking Problem and Optional Stopping]] — the problem this construction solves.
- [[Confidence Sequences]] — the interval-valued dual; Howard et al. generalise the Gaussian mSPRT to nonparametric sub-Gaussian and bounded data.
- [[Multiple Testing Corrections]] — Bonferroni and BH applied to always-valid $p$-values.
- [[Power Analysis and Sample Size]] — the mSPRT replaces a pre-committed $n$ with a patience limit $M$; expected run time scales like $\log(1/\alpha)/I(\theta,\theta_0)$.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — the alternative when reward during the test matters more than inference; always-valid inference under adaptive allocation is left open by the paper.
- [[Empirical Bayes - Overview]] and [[James-Stein Estimator]] — how the mixing distribution is fitted from a portfolio of past experiments.
- [[Sequential and Adaptive BED]] — Bayesian sequential design; the mSPRT statistic is a Bayes factor with prior $H$ used with a frequentist threshold.

## See Also

- [[Online Experimentation - Overview]]
- [[Type S and Type M Errors]]
- [[Regret Bounds for Thompson Sampling]]
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]
