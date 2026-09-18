---
title: Shifted-Beta-Geometric Model for Contractual Retention
tags:
  - source/ingested
  - topic/market-response
  - topic/customer-lifetime-value
  - topic/retention
  - topic/survival-analysis
  - type/method
  - doc/paper
source: "[[raw/Fader Hardie 2007 - How to Project Customer Retention.pdf]]"
source_location: "Fader & Hardie (2007), J. Interactive Marketing 21(1) 76-90, preprint May 2006: Secs. 1-4, pp. 1-16 (Eqs. 1-8, Table 1, Figs. 1-6); Appendix A-B, pp. 17-24 (Eqs. B1-B3)"
date_ingested: 2026-09-18
folder: "Market Response Models/Customer Lifetime Value"
doc_type: paper
depends_on:
  - "[[Customer Lifetime Value - Overview]]"
  - "[[Single-Parameter Models]]"
  - "[[Survival Analysis]]"
used_by:
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
aliases:
  - sBG Model
  - sBG
  - Shifted-Beta-Geometric
  - Beta-Geometric Retention Model
  - How to Project Customer Retention
  - Ruse of Heterogeneity
---

# Shifted-Beta-Geometric Model for Contractual Retention

> [!summary]
> In a **contractual, discrete-time** business (annual subscriptions, memberships) churn is observed, so the task is not to infer who is alive but to **project the survivor curve** beyond the data in order to compute expected tenure and CLV. Fader & Hardie (2007) show that curve-fitting regressions (linear, quadratic, exponential in $t$) extrapolate disastrously, while a two-parameter probability model does not. The **shifted-beta-geometric (sBG)** story: at each renewal a customer churns with a constant personal probability $\theta$, and $\theta\sim\text{beta}(\alpha,\beta)$ across customers. It yields $S(t)=B(\alpha,\beta+t)/B(\alpha,\beta)$ and the aggregate retention rate $r_t=(\beta+t-1)/(\alpha+\beta+t-1)$, which **rises with tenure even though no individual becomes more loyal** — a pure sorting effect, the "ruse of heterogeneity". Fitted to seven years of data, it projects year-12 survival to within a few percent.

## Overview

The paper reanalyses two survival series ("Regular" and "High End" segments) from Berry & Linoff's *Data Mining Techniques* (2004), whose sidebar concluded that "parametric approaches do not work". Given seven years of data the three regressions fit well in-sample ($R^2$ of 0.922, 0.998, 0.963 for High End) but at year 12 "the linear and exponential models underestimate year 12 survival by 81% and 30%, respectively, while the quadratic model overestimates year 12 survival by 92%"; the linear model goes negative after year 14 and the quadratic eventually *increases*. Fader & Hardie's reply is that the failure belongs to arbitrary functions of time, not to parametric models: a model built from "a simple story of customer behavior" extrapolates well.

Basic identities (Sec. 1): with $r_t$ the retention rate in period $t$,

$$
S(t)=\prod_{i=1}^{t} r_i,\qquad r_t=\frac{S(t)}{S(t-1)},\qquad \text{expected tenure}=\sum_{t=0}^{\infty}S(t),\qquad E(CLV)=\sum_{t=0}^{\infty} m\frac{S(t)}{(1+d)^t}.
$$

Using only the observed $S(0),\dots,S(5)$ *truncates* these sums and understates tenure and CLV; a projected survivor function is also needed for the *residual* value of, say, a three-year customer.

## Main Content

> [!definition] sBG assumptions ^def-sbg-assumptions
> The story (Sec. 3): at the end of each period a customer flips a coin — heads, cancel; tails, renew; the coin's bias does not change over time for a given customer; and the bias varies across customers. Formally:
> 1. Lifetime $T$ is (shifted) geometric given the churn probability $\theta$:
>    $P(T=t\mid\theta)=\theta(1-\theta)^{t-1}$ and $S(t\mid\theta)=(1-\theta)^t$ for $t=1,2,\dots$
> 2. $\theta\sim\text{beta}(\alpha,\beta)$ with density $\theta^{\alpha-1}(1-\theta)^{\beta-1}/B(\alpha,\beta)$.
>
> The authors stress this is a "paramorphic representation", not a claim that people flip coins, and that one should "only add supposed richer 'touches of reality' if the model does not 'work'."

> [!theorem] sBG distribution, survivor function and retention rate ^thm-sbg-results
> Taking expectations over the beta (Eqs. 5–6, 8):
>
> $$
> P(T=t\mid\alpha,\beta)=\frac{B(\alpha+1,\beta+t-1)}{B(\alpha,\beta)},\qquad
> S(t\mid\alpha,\beta)=\frac{B(\alpha,\beta+t)}{B(\alpha,\beta)},
> $$
>
> $$
> r_t=\frac{S(t)}{S(t-1)}=\frac{\beta+t-1}{\alpha+\beta+t-1}.
> $$
>
> A forward recursion avoids beta functions entirely (Eq. 7): $P(T=1)=\alpha/(\alpha+\beta)$ and
>
> $$
> P(T=t)=\frac{\beta+t-2}{\alpha+\beta+t-1}\,P(T=t-1),\qquad t=2,3,\dots
> $$

> [!theorem] The ruse of heterogeneity ^thm-ruse-of-heterogeneity
> $r_t$ is strictly increasing in $t$ and tends to 1, although every individual's retention probability $1-\theta$ is constant. "There are no underlying time dynamics at the level of the individual customer; the observed phenomenon of retention rates increasing over time is simply due to heterogeneity (i.e., the high churn customers drop out early in the observation period, with the remaining customers having lower churn probabilities)." The term is Vaupel & Yashin's (1985). Equivalently, the posterior of $\theta$ for a customer who has survived $t$ renewals is $\text{beta}(\alpha,\beta+t)$ — the beta-binomial update of [[Single-Parameter Models]] — whose mean $\alpha/(\alpha+\beta+t)$ equals $1-r_{t+1}$.

The shape of the beta is itself a diagnostic (Fig. 3): $\alpha,\beta<1$ gives a U-shaped, polarized base (many near-certain churners and many near-certain stayers); $\alpha,\beta>1$ gives a fairly homogeneous base; otherwise the density is J- or reverse-J-shaped.

> [!algorithm] Maximum likelihood estimation from a cohort table ^alg-sbg-mle
> Observe a cohort of $n$ customers for $K$ periods, with $n_t$ lost in period $t$ (Appendix B, Eq. B3):
>
> $$
> LL(\alpha,\beta)=\sum_{t=1}^{K} n_t\ln P(T=t\mid\alpha,\beta)+\Big(n-\sum_{t=1}^{K}n_t\Big)\ln S(K\mid\alpha,\beta).
> $$
>
> 1. Convert the survival percentages into per-period losses $n_t/n = S(t-1)-S(t)$; $n$ factors out, so proportions suffice.
> 2. Compute $P(T=t)$ by the recursion and $S(K)=1-\sum_{t\le K}P(T=t)$.
> 3. Maximize over $\alpha,\beta>0$ (Excel Solver from starting values 1, 1).
> 4. Project $S(t)=\prod_{i\le t}r_i$ for $t>K$ and sum for tenure or CLV.
>
> The last term is a right-censoring contribution, exactly as in [[Survival Analysis]].

### Results

Fitting the first seven years: Regular $\hat\alpha=0.704$, $\hat\beta=1.182$; High End $\hat\alpha=0.668$, $\hat\beta=3.806$ (the body of the preprint prints 0.688, but Appendix B reports the maximum at $\alpha=0.668$ with $LL=-1.611$, and refitting Table 1 confirms 0.668). Mean churn probabilities are $E(\theta)=\alpha/(\alpha+\beta)=0.37$ and $0.15$ respectively; both mixing densities are reverse-J-shaped: "most customers have fairly low churn probabilities, but there is a sizeable sub-segment within each one that will tend to depart very quickly." The paper reports year-12 errors of "only 4% and 2%" and that model-based $r_t$ tracks the observed retention-rate curve through year 12, a harder test than $S(t)$ because $r_t$ is not cumulative.

### Limits, relatives and extensions (Sec. 4)

- **Right tool for one job.** sBG is for projecting an aggregate survivor curve. Logit or machine-learning churn models with time-varying covariates answer a different question — who is at risk *next period* — and "cannot easily be used to address the problem of projecting the survivor function into the future, as we do not have future values of the time-varying covariates."
- **Setting.** sBG is for discrete-time contractual settings; see the [[Customer Lifetime Value - Overview#^def-two-by-two|two-by-two classification]]. The continuous-time analogue is the exponential-gamma (Lomax / Pareto II) — the same lifetime distribution that sits inside the [[Pareto-NBD Model]].
- **Relatives.** Buchanan & Morrison's (1988) "list falloff" model of declining direct-mail response rates is the same beta-mixed constant-probability structure; Rao & Steckel (1995) add time-invariant covariates via the beta-logistic.
- **Duration dependence.** To allow genuine individual-level dynamics, replace the memoryless geometric with a discrete Weibull: the beta-discrete-Weibull (BdW) generalizes sBG; Weibull-gamma generalizes the exponential-gamma.
- **Multiple cohorts.** Options are pooling, separate fits, or beta-logistic cohort dummies. "A more elegant solution would be to add another layer of heterogeneity" — let $\alpha,\beta$ vary across cohorts in a hierarchical Bayes model so recent cohorts with few periods "borrow" information from older ones. This is what PyMC-Marketing's cohort-indexed sBG does ([[Bayesian and Hierarchical Extensions of CLV Models]]).

## Examples

**Reproducing the High End projection.** Table 1 gives observed survival of 86.9, 74.3, 65.3, 59.3, 55.1, 51.7, 49.1% for years 1–7 and 46.8, 44.5, 42.7, 40.9, 39.4% for years 8–12. With $(\alpha,\beta)=(0.668,3.806)$ (own calculation):

| Year $t$ | $r_t$ (model) | $S(t)$ model | $S(t)$ actual |
|---|---|---|---|
| 1 | 0.851 | 0.851 | 0.869 |
| 2 | 0.878 | 0.747 | 0.743 |
| 4 | 0.911 | 0.610 | 0.593 |
| 7 | 0.936 | 0.489 | 0.491 |
| 10 | 0.950 | 0.414 | 0.427 |
| 12 | 0.957 | 0.378 | 0.394 |

Year-12 survival is off by about 4% (High End) and 2% (Regular: 0.170 vs 0.173), matching the magnitudes in the paper; in this replication the model sits slightly *below* the actuals, whereas the preprint text says "overestimates". Compare the exponential regression's 30% miss. For a customer who has already renewed seven times, next-year retention is $r_8=(3.806+7)/(0.668+3.806+7)=0.942$, versus 0.851 for a brand-new customer — the basis for a residual-CLV calculation.

```python
import numpy as np
from scipy.special import betaln
from scipy.optimize import minimize

S_obs = np.array([1, .869, .743, .653, .593, .551, .517, .491])   # years 0..7
lost = -np.diff(S_obs)                                             # n_t / n

def negll(theta):
    a, b = np.exp(theta); t = np.arange(1, 8)
    logp = betaln(a + 1, b + t - 1) - betaln(a, b)                 # Eq. 5
    logS = betaln(a, b + 7) - betaln(a, b)                         # Eq. 6
    return -(lost @ logp + S_obs[-1] * logS)                       # Eq. B3 / n

a, b = np.exp(minimize(negll, [0, 0], method="Nelder-Mead").x)     # 0.668, 3.806
r = lambda t: (b + t - 1) / (a + b + t - 1)                        # Eq. 8
```

## Connections

- [[Customer Lifetime Value - Overview]] — contractual CLV as a discounted sum of $S(t)$; the taxonomy of settings.
- [[BG-NBD Model]] — reuses the beta-geometric dropout, but over *transactions* with unobserved churn.
- [[Pareto-NBD Model]] — its Pareto lifetime is the continuous-time counterpart (gamma-mixed exponential).
- [[Single-Parameter Models]] — beta-binomial conjugacy: surviving $t$ renewals updates $\text{beta}(\alpha,\beta)$ to $\text{beta}(\alpha,\beta+t)$.
- [[Survival Analysis]] — survivor function, hazard ($1-r_t$ is the discrete hazard), right censoring; decreasing aggregate hazards from frailty.
- [[Heterogeneity in Agent Models]] — a clean example of an aggregate "dynamic" produced entirely by static heterogeneity plus selection; an ABM calibrated to match rising retention with a homogeneous loyalty-growth rule would be misattributing the mechanism.
- [[Hierarchical Models]] — the proposed cross-cohort layer on $(\alpha,\beta)$.

## See Also

- [[Delayed and Censored Feedback - Overview]] — censoring in online conversion data.
- [[Monsters and Mixtures]] — beta-binomial and other continuous mixtures for over-dispersion.
- [[Empirical Bayes - Overview]] — fitting a prior to a population and reading individual posteriors off it.
- [[Bayesian and Hierarchical Extensions of CLV Models]] — covariates and cohort pooling for sBG.
