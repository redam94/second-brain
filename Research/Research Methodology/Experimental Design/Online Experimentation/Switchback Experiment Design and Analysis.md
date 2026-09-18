---
title: Switchback Experiment Design and Analysis
tags:
  - source/ingested
  - topic/research-methodology
  - topic/online-experimentation
  - topic/interference
  - topic/experimental-design
  - topic/randomization-inference
  - type/method
  - doc/paper
source: "[[raw/Bojinov 2020 - Design and Analysis of Switchback Experiments.pdf]]"
source_location: "Secs. 1-4 and 6 (pp. 1-19, 29-30): Assumptions 1-4, Definition 1, Eqs. 1-12, Proposition 1, Theorems 1-3, Corollaries 1-2, Algorithm 1"
date_ingested: 2026-09-18
folder: "Research Methodology/Experimental Design/Online Experimentation"
doc_type: paper
depends_on:
  - "[[Interference and Marketplace Experiments]]"
  - "[[Randomization Inference - Overview]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Online Experimentation - Overview]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
aliases:
  - Switchback Experiments
  - Switchback Design
  - Time-Split Experiments
  - Crossover Design for Marketplaces
  - Carryover Effects in Switchback Experiments
---

# Switchback Experiment Design and Analysis

> [!summary]
> A **switchback experiment** treats an entire market (a city, a marketplace, a set of SKUs) as *one* unit and randomizes it between treatment and control **over time**. Because everyone shares the same condition at any instant, cross-unit [[Interference and Marketplace Experiments|interference]] disappears; what replaces it is **carryover**: past assignments affect current outcomes. Bojinov, Simchi-Levi & Zhao (2020; *Management Science* 2023) assume only that carryover lasts at most $m$ periods, target the lag-$m$ effect of *sustained* treatment versus *sustained* control, estimate it with a Horvitz–Thompson estimator, and solve a minimax design problem. Results: **fair coins are optimal** (Theorem 1) and the optimal design **re-randomizes once every $m$ periods**, with first and last blocks of length $2m$ (Theorem 2). Inference is design-based: an exact Fisher randomization test, or a finite-population CLT with a conservative variance estimate (Theorem 3).

## Overview

Switchbacks are "among the most prevalent designs used in the technology sector". A ride-hailing platform testing a pricing algorithm cannot split drivers, because treated and control drivers serve the same riders; a retailer testing a promotion algorithm cannot split SKUs, because promoted items cannibalise the others. Both are used as motivating applications (Sec. 1). The second use case is a small number of heterogeneous units (N-of-1 trials, algorithmic trading venues), where alternating treatments within a unit identifies a unit-level effect.

Compared with the structural approach of Johari et al. in [[Interference and Marketplace Experiments]], this paper makes **no outcome-model assumptions**. Potential outcomes are fixed and the assignment path is the only randomness, exactly as in [[Randomization Inference - Overview]]. The three difficulties it addresses are: (i) the variance is governed by the number of *assignments*, not the number of users; (ii) carryover; (iii) super-population inference is meaningless for a single unit.

## Main Content

### Setup and estimand

Time is $t \in [T] = \{1,\dots,T\}$, the assignment path is $w_{1:T} \in \{0,1\}^T$ and potential outcomes are $Y_t(w_{1:T})$.

> [!definition] Assumptions on the potential outcomes ^def-switchback-assumptions
> 1. **Non-anticipation**: $Y_t(w_{1:t}, w'_{t+1:T}) = Y_t(w_{1:t}, w''_{t+1:T})$; outcomes do not depend on future assignments. This is guaranteed by design, since the platform, not the units, controls future treatment.
> 2. **$m$-carryover**: there is a fixed $m$ with $Y_t(w'_{1:t-m-1}, w_{t-m:T}) = Y_t(w''_{1:t-m-1}, w_{t-m:T})$; only the last $m+1$ assignments matter, so write $Y_t(w_{t-m:t})$. Example: the effect of surge pricing dissipates in one to two hours.
> 3. **Bounded outcomes**: $|Y_t(\cdot)| \le B$ (used for the minimax problem and the variance bound).

> [!definition] Lag-$p$ causal effect of consecutive treatments (Eq. 1) ^def-lag-p-effect
>
> $$
> \tau_p(\mathbb Y) = \frac{1}{T-p}\sum_{t=p+1}^{T}\big[Y_t(\mathbf 1_{p+1}) - Y_t(\mathbf 0_{p+1})\big].
> $$
>
> With $p = m$ this is the average effect of *permanently deploying* the policy versus never deploying it: the time-series version of the global treatment effect.

> [!definition] Regular switchback experiment (Definition 1) ^def-regular-switchback
> Choose randomization points $\mathbb T = \{t_0 = 1 < t_1 < \dots < t_K\}$ and probabilities $q_k$. At each $t_k$ flip a coin with $\Pr(W_{t_k} = 1) = q_k$ and hold that assignment through period $t_{k+1} - 1$. The design is the induced distribution $\eta_{\mathbb T, \mathbb Q}$ over the $2^{K+1}$ feasible paths.

### Estimation

> [!theorem] Horvitz–Thompson estimator is unbiased (Eq. 4, Proposition 1) ^thm-ht-unbiased
>
> $$
> \hat\tau_p = \frac{1}{T-p}\sum_{t=p+1}^{T}\left\{ Y_t^{\text{obs}}\,\frac{\mathbf 1\{W_{t-p:t} = \mathbf 1_{p+1}\}}{\Pr(W_{t-p:t} = \mathbf 1_{p+1})} - Y_t^{\text{obs}}\,\frac{\mathbf 1\{W_{t-p:t} = \mathbf 0_{p+1}\}}{\Pr(W_{t-p:t} = \mathbf 0_{p+1})}\right\}.
> $$
>
> Under Assumptions 1-2 and any regular switchback with $p = m$, $\mathbb E[\hat\tau_p] = \tau_p$.

Only periods whose whole window $t-m, \dots, t$ is all-treated or all-control contribute: these are the observations that actually reveal $Y_t(\mathbf 1_{m+1})$ or $Y_t(\mathbf 0_{m+1})$. Periods just after a switch are contaminated by carryover and are discarded, a data-driven "washout". The inverse probabilities are known by design; under fair coins they are $2^{-j}$, where $j$ is the number of coin flips the window spans, which avoids the instability of extreme-weight Horvitz–Thompson estimators.

### Optimal design

The criterion is minimax risk $\min_{\mathbb T, \mathbb Q}\max_{\mathbb Y} \mathbb E(\hat\tau_p - \tau_p)^2$ over bounded potential outcomes; because $\hat\tau_p$ is unbiased, risk equals variance.

> [!theorem] Fair coins and optimal switching frequency (Theorems 1-2) ^thm-optimal-switchback
> Under Assumptions 1-3:
>
> 1. Any optimal design has $q_0 = q_1 = \dots = q_K = 1/2$.
> 2. The optimal randomization points solve the subset-selection problem
>
> $$
> \min_{\mathbb T \subset [T]} \left\{ 4\sum_{k=0}^{K}(t_{k+1} - t_k)^2 + 8m(t_K - t_1) + 4m^2K - 4m^2 + 4\sum_{k=1}^{K-1}\big[(m - t_{k+1} + t_k)^+\big]^2 \right\}.
> $$
>
> If $m = 0$, $\mathbb T^* = \{1, 2, \dots, T\}$ (flip every period). If $m > 0$ and $T = nm$ with $n \ge 4$,
>
> $$
> \mathbb T^* = \{1,\ 2m+1,\ 3m+1,\ \dots,\ (n-2)m+1\}.
> $$

The trade-off is direct. **Too many** switch points make long all-treated or all-control windows rare, so few periods are usable and their weights are large. **Too few** leave only a handful of independent coin flips. The optimum is to flip once per carryover length, with longer first and last blocks. For $T = 12$, $m = 2$: $\mathbb T^* = \{1, 5, 7, 9\}$, i.e. blocks of length 4, 2, 2, 4. Two practical corollaries:

- **Granularity does not matter, physical time does** (Example 7). If carryover lasts two hours, the design flips every two hours whether a period is defined as 30 minutes ($m = 4$) or an hour ($m = 2$). Periods should be *shorter* than the carryover: with one-hour periods and one-minute carryover, orders of magnitude of usable data are thrown away (Sec. 6).
- **Robustness at small $m$** (Example 8). The optimal designs for $m = 0$ and $m = 1$ are $\{1,2,\dots,T\}$ and $\{1,3,4,\dots,T-1\}$, almost identical.

### Inference

**Exact test (Sec. 4.1, Algorithm 1).** Under the sharp null $Y_t(w_{t-m:t}) = Y_t(w'_{t-m:t})$ for all windows and $t$, the observed outcomes would have occurred under any path. Draw $I$ fresh paths $w^{[i]}$ from the design, recompute $\hat\tau^{[i]}$ holding $Y^{\text{obs}}$ fixed, and report $\hat p_F = I^{-1}\sum_i \mathbf 1\{|\hat\tau^{[i]}| \ge |\hat\tau|\}$. This is a [[Fisher Randomization Test and the Sharp Null|Fisher randomization test]] whose reference distribution is the switchback design itself; no time-series model is needed despite arbitrary autocorrelation in the outcomes.

**Asymptotic test for the average effect (Sec. 4.2).** For the weak null $\tau_m = 0$ (compare [[Sharp vs Weak Null Hypotheses]]), let $\bar Y_k^{\text{obs}} = \sum_{t=(k+1)m+1}^{(k+2)m} Y_t^{\text{obs}}$ be block sums under the optimal design with $n = T/m$. Lemma 2 gives the exact variance, which involves unobservable cross-products $\bar Y_k(\mathbf 1)\bar Y_k(\mathbf 0)$; Corollary 1 bounds it by a quantity with the unbiased estimator

$$
\hat\sigma_U^2 = \frac{1}{(T-m)^2}\left\{ 8(\bar Y_0^{\text{obs}})^2 + \sum_{k=1}^{n-3} 32\,(\bar Y_k^{\text{obs}})^2\, \mathbf 1\{W_{km+1} = W_{(k+1)m+1}\} + 8(\bar Y_{n-2}^{\text{obs}})^2 \right\}.
$$

> [!theorem] Finite-population CLT (Theorem 3) ^thm-switchback-clt
> Fix $m$, let $T = nm$, use the optimal design, and assume $\operatorname{Var}(\hat\tau_m) \ge \Omega(n^{-1})$ (Assumption 4; implied by potential outcomes bounded away from zero). Then as $n \to \infty$,
>
> $$
> \frac{\hat\tau_m - \tau_m}{\sqrt{\operatorname{Var}(\hat\tau_m)}} \xrightarrow{d} N(0,1).
> $$
>
> Replacing the variance by $\hat\sigma_U^2$ gives the conservative test $z = |\hat\tau_m|/\hat\sigma_U$, $\hat p_N = 2 - 2\Phi(z)$, and conservative confidence intervals.

**Misspecified carryover (Sec. 4.3).** If $p > m$, then $\tau_p = \tau_m$ and everything remains valid, merely less efficient. If $p < m$, the exact test is still valid for the sharp null, but $\hat\tau_p$ is **biased** for $\tau_m$; asymptotic normality holds around $\mathbb E\hat\tau_p$ (Corollary 2). Err on the side of a larger $p$.

**Identifying $m$ (Sec. 4.4).** Run optimal designs with $p_1 < p_2$ on two comparable units or on two well-separated epochs. Under $H_0: m \le p_1$ both estimate $\tau_m$, so $z = |\hat\tau_{p_1} - \hat\tau_{p_2}|/\sqrt{\hat\sigma_{p_1}^2 + \hat\sigma_{p_2}^2}$ is asymptotically standard normal; rejection says carryover is longer than $p_1$. Combine with a search over $p$. The authors warn that each such test needs $T/m > 100$.

**Planning the horizon (Sec. 6).** With $p = m$ fixed, the sample size is $n = T/m$, the number of coin flips. Choose $n$ from simulated rejection-rate curves given a signal-to-noise guess, as in a [[Power Analysis and Sample Size|power analysis]]. With several markets, run the optimal design independently in each and pool.

## Examples

**Design and analysis sketch.**

```python
import numpy as np

def optimal_points(T, m):                    # Theorem 2, requires T = n*m with n >= 4
    n = T // m
    return [1] + [k * m + 1 for k in range(2, n - 1)]

def sample_path(T, points, rng):             # fair coin at each randomization point
    w, bounds = np.empty(T, int), points + [T + 1]
    for a, b in zip(bounds[:-1], bounds[1:]):
        w[a - 1:b - 1] = rng.integers(0, 2)
    return w

def ht_estimate(y, w, points, m):
    T = len(y)
    block = np.searchsorted(points, np.arange(1, T + 1), side="right")
    est = 0.0
    for t in range(m, T):
        k = len(set(block[t - m:t + 1]))     # coin flips spanned, so Pr(window) = 2**-k
        win = w[t - m:t + 1]
        if win.all():       est += y[t] * 2**k
        elif not win.any(): est -= y[t] * 2**k
    return est / (T - m)

def randomization_pvalue(y, w, points, m, rng, draws=5000):   # Algorithm 1
    obs = ht_estimate(y, w, points, m)
    null = [ht_estimate(y, sample_path(len(y), points, rng), points, m) for _ in range(draws)]
    return np.mean(np.abs(null) >= abs(obs))
```

**Simulation (own illustration).** $T = 120$, $m = 2$, outcome $Y_t = \log t + 1.0\,w_t + 0.5\,w_{t-1} + 0.5\,w_{t-2} + \varepsilon_t$ with $\varepsilon_t \sim N(0,1)$, so the sustained-treatment effect is $\tau_2 = 2$. Over 20,000 assignment paths:

| Design and estimator | Mean | SD |
|---|---|---|
| Optimal $\mathbb T^* = \{1, 5, 7, \dots, 117\}$, Horvitz–Thompson | 1.99 | 2.57 |
| Flip every period, Horvitz–Thompson | 1.96 | 2.93 |
| Optimal design, naive difference in means of treated vs control periods | 1.26 | 0.36 |

The naive contrast is precise but **biased by 37%**, because it counts periods just after a switch whose outcomes still carry the previous regime. Horvitz–Thompson is unbiased under either design and the optimal design has lower variance, but the absolute variance is large: the estimator weights *levels* of $Y_t$, so a secular trend ($\log t$ here) inflates it. In practice one centres the outcomes or uses regression adjustment, and above all lengthens $T$. This is the bias-variance price of switchbacks noted by Larsen et al. (Sec. 6), who also mention fixed "burn-in" periods after each switch as the simpler common practice.

**Marketing reading.** A national TV or paid-social test with a single market is a switchback. Adstock is the carryover, so $m$ should be set from the adstock half-life and flights re-randomized about once per $m$; on/off pulsing weekly when carryover lasts three weeks estimates a badly attenuated effect. See [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]. The design-based analysis contrasts with the model-based time-series counterfactual of the [[Time-Based Regression Estimator for Geo Experiments|TBR estimator]], which relies on stable control geos instead of repeated randomization.

## Connections

- [[Interference and Marketplace Experiments]] — the problem switchbacks solve; alternative remedies are cluster and two-sided randomization.
- [[Randomization Inference - Overview]] and [[Fisher Randomization Test and the Sharp Null]] — the exact test is an FRT over assignment paths.
- [[Sharp vs Weak Null Hypotheses]] and [[Studentized Randomization Tests]] — the sharp null gets an exact test; the average effect gets a conservative finite-population CLT, the same split as in cross-sectional experiments.
- [[Potential Outcomes Framework]] — path-dependent potential outcomes $Y_t(w_{1:T})$ generalise the two-outcome model.
- [[Geo-Experiment Design and Power Analysis]] — geo designs randomize across space, switchbacks across time; they can be combined by running independent switchbacks per region.
- [[TBR Design Sensitivity and the Stationarity Assumption]] — both designs are vulnerable to non-stationarity, handled here by repeated randomization rather than by modelling.
- [[Power Analysis and Sample Size]] — effective $n$ is the number of coin flips $T/m$.
- [[Delayed and Censored Feedback - Overview]] — delayed conversions are a form of carryover in the outcome measurement and lengthen the effective $m$.

## See Also

- [[Online Experimentation - Overview]]
- [[Permutation Tests and Exact Inference]]
- [[Differences-in-Differences]]
- [[Standard Errors and Clustering]]
- [[Sequential and Adaptive BED]]
