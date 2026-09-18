---
title: SDID Inference - Bootstrap, Jackknife and Placebo
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/panel-data
  - topic/inference
  - type/method
  - doc/paper
source: "[[raw/Arkhangelsky 2021 - Synthetic Difference in Differences.pdf]]"
source_location: "§4.3 (Assumptions 1-4, Theorem 1), pp. 24-26; §5 (Algorithms 2-4, Theorem 2, Table 4), pp. 26-31"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Synthetic Difference-in-Differences - Overview]]"
  - "[[SDID Estimator - Unit and Time Weights]]"
  - "[[SDID vs DiD vs Synthetic Control]]"
  - "[[Standard Errors and Clustering]]"
used_by:
  - "[[SDID for Geo Experiments and Marketing Panels]]"
aliases:
  - SDID standard errors
  - SDID variance estimation
  - SDID placebo variance
  - SDID jackknife
  - SDID asymptotic normality
---

# SDID Inference - Bootstrap, Jackknife and Placebo

> [!summary]
> Theorem 1 of Arkhangelsky et al. shows $\hat\tau^{sdid}$ is asymptotically normal with an *oracle* variance $V_\tau\sim 1/(N_{tr}T_{post})$, which licenses the usual interval $\hat\tau^{sdid}\pm z_{\alpha/2}\sqrt{\hat V_\tau}$. Three estimators of $V_\tau$ are offered: a **unit-level (clustered) bootstrap** (Alg. 2; best coverage, expensive, needs many treated units), a **fixed-weight jackknife** (Alg. 3; cheap, provably conservative, undefined for $N_{tr}=1$), and a **placebo** estimator (Alg. 4; the only option when $N_{tr}=1$, but it requires homoskedasticity across units). In the paper's simulations all three deliver roughly 93–97% coverage for SDID where DiD intervals fall as low as 30%.

## Overview

Classical SC has no asymptotic theory — hence the permutation/RMSPE-ratio approach in [[Synthetic Control Inference and Diagnostics]]. Classical DiD has cluster-robust standard errors ([[Standard Errors and Clustering]]; Bertrand, Duflo & Mullainathan 2004) but these are only meaningful if the point estimate is approximately unbiased. SDID's contribution is a large-panel normal limit under a **factor model in which DiD is misspecified**, plus variance estimators that respect within-unit serial correlation. The paper's moral from Table 4: "If the point estimates $\hat\tau$ from DID and SC are dominated by bias, then we should not expect confidence intervals that only focus on variance to achieve coverage."

## Main Content

> [!definition] Assumptions 1-4 (§4.3) ^def-sdid-assumptions
> 1. **Errors.** Rows $E_{i\cdot}$ are i.i.d. Gaussian with covariance $\Sigma\in\mathbb R^{T\times T}$ (homoskedastic across units, arbitrary across time) whose eigenvalues are bounded and bounded away from zero.
> 2. **Sample sizes.** $N_{tr}T_{post}\to\infty$; $N_{co},T_{pre}\to\infty$ with $T_{pre}/N_{co}$ bounded above and below; and $N_{co}/\left(N_{tr}T_{post}\max(N_{tr},T_{post})\log^2 N_{co}\right)\to\infty$. One of $T_{post}$, $N_{tr}$ may stay fixed, **not both**. The treated block must be small relative to the control block.
> 3. **Spectrum of $L$.** With $R = \lfloor\sqrt{\min(T_{pre},N_{co})}\rfloor$, $\sigma_R(L_{co,pre})/R = o\left(\min\{N_{tr}^{-1/2}\log^{-1/2}N_{co},\ T_{post}^{-1/2}\log^{-1/2}T_{pre}\}\right)$. Sufficient: $\operatorname{rank}(L) < \sqrt{\min(T_{pre},N_{co})}$. No lower bound on non-zero singular values.
> 4. **Oracle weights cancel $L$** (the identifying assumption). The oracle unit weights are dispersed, $\lVert\tilde\omega_{co}\rVert_2 = o([(N_{tr}T_{post})\log N_{co}]^{-1/2})$, and fit the pre-period well; the oracle time weights are close to the autoregression vector $\psi$ and fit the control block well; and jointly the oracle bias is negligible, $B(\tilde\omega,\tilde\lambda) = o((N_{tr}T_{post})^{-1/2})$ (eqs. 4.11-4.13).
>
> A correctly specified TWFE model with uncorrelated homoskedastic errors satisfies all four (fn. 10): $R=2$, $\tilde\omega_{co,i}=1/N_{co}$, $\tilde\lambda_{pre,t}=1/T_{pre}$, and additive $L$ makes (4.13) hold exactly.

> [!theorem] Theorem 1 — asymptotic linearity and normality ^thm-sdid-asymptotic-normality
> Under model (4.1) with $L$, $W$ fixed, Assumptions 1-4, and $\zeta$ satisfying $(N_{tr}T_{post})^{1/2}\log N_{co} = o(\zeta^2)$:
> $$
> \hat\tau^{sdid}-\tau = \frac{1}{N_{tr}}\sum_{i=N_{co}+1}^{N}\left(\frac{1}{T_{post}}\sum_{t=T_{pre}+1}^{T}\varepsilon_{it} - E_{i,pre}\psi\right) + o_p\left((N_{tr}T_{post})^{-1/2}\right)
> $$
> and therefore
> $$
> \frac{\hat\tau^{sdid}-\tau}{V_\tau^{1/2}}\Rightarrow\mathcal N(0,1), \qquad V_\tau = \frac{1}{N_{tr}}\operatorname{Var}\left[\frac{1}{T_{post}}\sum_{t=T_{pre}+1}^{T}\varepsilon_{it} - E_{i,pre}\psi\right]
> $$
> with $N_{tr}T_{post}V_\tau$ bounded and bounded away from zero. Here $\psi = \Sigma_{pre,pre}^{-1}\Sigma_{pre,post}\lambda_{post}$. The variance is **optimal**: it equals what one would get knowing $L$ and $\Sigma$ and averaging $\tau_{it}$ plus *unpredictable* noise. Note that only the treated units' errors appear — the control block is large enough that its noise is second order.

> [!algorithm] Algorithm 2 — (clustered) bootstrap ^alg-sdid-bootstrap
> For $b=1,\dots,B$: resample $N$ **rows** (units) of $(Y,W)$ with replacement; if the draw has no treated or no control units, discard and redraw; **re-run the full SDID algorithm** (weights included) to get $\hat\tau^{(b)}$. Set $\hat V_\tau^{cb} = \frac1B\sum_b\left(\hat\tau^{(b)}-\frac1B\sum_{b}\hat\tau^{(b)}\right)^2$. Unit-level resampling respects serial correlation (Bertrand et al. 2004). Downside: cost — every replication re-solves two constrained QPs.

> [!algorithm] Algorithm 3 — fixed-weight jackknife ^alg-sdid-jackknife
> Holding $\hat\omega,\hat\lambda$ **fixed**, for each unit $i$ compute $\hat\tau^{(-i)}$ from the weighted TWFE regression omitting unit $i$. Set
> $$
> \hat V_\tau^{jack} = \frac{N-1}{N}\sum_{i=1}^{N}\left(\hat\tau^{(-i)}-\hat\tau\right)^2
> $$
> Runs SDID's optimisation only once. Undefined for $N_{tr}=1$.

> [!theorem] Theorem 2 — the jackknife is conservative ^thm-sdid-jackknife
> If the elements of $L$ are bounded and Theorem 1's conditions hold, then for any $0<\alpha<1$,
> $$
> \liminf\ \mathbb P\left[\tau\in\hat\tau^{sdid}\pm z_{\alpha/2}\sqrt{\hat V_\tau^{jack}}\right]\ \ge\ 1-\alpha
> $$
> If moreover treatment effects are constant, $\tau_{it}=\tau$, and the time weights are predictive on the treated units, $T_{post}N_{tr}^{-1}\lVert\hat\lambda_0 + L_{tr,pre}\hat\lambda_{pre} - L_{tr,post}\hat\lambda_{post}\rVert_2^2\to_p 0$, coverage is **exact**. This relies on SDID's specific structure: the analogous jackknife for SC "would be severely biased upwards, and would not be exact even in the well-specified fixed effects model," so the authors do not recommend it for SC. (Under heterogeneous effects the jackknife implicitly treats the estimand as random, producing excess variance — fn. 11.)

> [!algorithm] Algorithm 4 — placebo variance ^alg-sdid-placebo
> Using **control units only**: for $b=1,\dots,B$, sample $N_{tr}$ of the $N_{co}$ controls without replacement to "receive the placebo"; build the placebo assignment $W^{(b)}_{co,\cdot}$; compute SDID $\hat\tau^{(b)}$ on $(Y_{co,\cdot},W^{(b)}_{co,\cdot})$. Set $\hat V_\tau^{placebo}$ = the sample variance of the $\hat\tau^{(b)}$. Plug into the Gaussian interval (5.1). Works with $N_{tr}=1$.

### What the placebo method assumes

- **Homoskedasticity across units is essential**: "if the exposed and unexposed units have different noise distributions then there is no way we can learn $V_\tau$ from unexposed units alone." With one treated unit, nonparametric variance estimation is impossible in general, so this assumption is "effectively necessary."
- It is an adaptation of **Conley & Taber (2011)** inference for DiD with few treated units.
- It is *related to* but **not** a randomisation test (fn. 12): "in many synthetic controls applications, the exposed unit was not chosen at random, in which case placebo tests do not have the formal properties of randomization tests (Firpo & Possebom 2018; Hahn & Shi 2016), and so may need to be interpreted via a more qualitative lens." Contrast the design-based guarantees in [[Fisher Randomization Test and the Sharp Null]] and [[Permutation Tests and Exact Inference]], which hold when assignment *is* randomised — as in a designed geo experiment.
- Unlike the ADH permutation $p$-value, Algorithm 4 yields a **variance** and hence a confidence interval, not just a rank-based $p$-value.

### Choosing among the three

| | Bootstrap | Jackknife | Placebo |
|---|---|---|---|
| Re-estimates weights? | yes | no (fixed) | yes |
| Cost | high ($B$ full fits) | one fit + $N$ cheap regressions | high ($B$ full fits on controls) |
| $N_{tr}=1$ | not defined | not defined | **yes** |
| Guarantee | heuristic, best in simulations for large panels | conservative (Thm 2) | needs homoskedasticity across units |
| Heteroskedastic units | fine | fine | invalid |

## Examples

**Coverage of nominal 95% intervals (Table 4, 400 replications), selected rows:**

| Design | Boot: SDID / SC / DID | Jack: SDID / DID | Placebo: SDID / SC / DID |
|---|---|---|---|
| CPS baseline | 0.96 / 0.93 / 0.89 | 0.93 / 0.92 | 0.95 / 0.89 / 0.96 |
| CPS random assignment | 0.96 / 0.96 / 0.92 | 0.93 / 0.94 | 0.96 / 0.96 / 0.94 |
| CPS unemployment rate | 0.91 / 0.90 / **0.57** | 0.86 / **0.64** | 0.88 / 0.89 / **0.62** |
| CPS $N_{tr}=1$ | — | — | 0.97 / 0.95 / 0.96 |
| CPS resampled to $N=400$ | 0.95 / 0.92 / 0.96 | 0.96 / 0.95 | 0.96 / 0.91 / 0.96 |
| PWT democracy | 0.93 / 0.96 / **0.55** | 0.94 / **0.59** | 0.98 / 0.97 / 0.79 |
| PWT education | 0.95 / 0.95 / **0.30** | 0.95 / **0.34** | 0.99 / 0.90 / 0.94 |

(Column assignment follows the table header; the printed caption lists the three methods in a different order.) The bootstrap "performs particularly well, yielding nearly nominal 95% coverage"; the authors caution that the simulated noise was Gaussian and homoskedastic across units, "assumptions that are both heavily used by the placebo estimator." DiD under-coverage is a *bias* problem, not a variance problem.

**California Prop 99:** $N_{tr}=1$, so only Algorithm 4 applies; it gives $\widehat{se}=8.4$ for $\hat\tau^{sdid}=-15.6$, i.e. a 95% interval of roughly $[-32,\ 1]$ packs per capita.

Jackknife sketch given fixed weights (each leave-one-out estimate is just the double difference with the remaining weights renormalised within the control or treated group):

```python
def sdid_jackknife_var(Y, N0, T0, w, l):
    N, T = Y.shape; N1, T1 = N - N0, T - T0
    lam = np.r_[-l, np.ones(T1) / T1]
    delta = Y @ lam                         # adjusted outcome per unit, eq. (2.5)
    full = np.r_[w, np.ones(N1) / N1]
    sign = np.r_[-np.ones(N0), np.ones(N1)]
    tau = (sign * full) @ delta
    taus = []
    for i in range(N):
        keep = np.arange(N) != i
        wi = full[keep].copy(); grp = sign[keep]
        for g in (-1, 1):                   # renormalise within group
            wi[grp == g] /= wi[grp == g].sum()
        taus.append((grp * wi) @ delta[keep])
    return (N - 1) / N * np.sum((np.array(taus) - tau) ** 2)
```

## Connections

- [[Standard Errors and Clustering]] — unit-level resampling is the panel analogue of clustering by unit; serial correlation is the reason.
- [[Synthetic Control Inference and Diagnostics]] — ADH permutation inference; SDID's placebo estimator uses the same placebo logic to build a variance.
- [[Randomization Inference - Overview]] — when geos *are* randomised, placebo reassignment regains a design-based justification.
- [[Simultaneous Inference via Multiplier Bootstrap]] — the bootstrap used for staggered-DiD event-study bands; a different bootstrap for a related target.
- [[Generalized Synthetic Control Method]] — uses a parametric bootstrap under an explicitly estimated factor model.

## See Also

- [[SDID Estimator - Unit and Time Weights]]
- [[SDID vs DiD vs Synthetic Control]]
- [[Power Analysis and Sample Size]]
- [[Honest DiD - Sensitivity to Parallel Trends Violations]]
