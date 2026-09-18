---
title: SDID vs DiD vs Synthetic Control
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/panel-data
  - topic/difference-in-differences
  - topic/synthetic-control
  - type/concept
  - doc/paper
source: "[[raw/Arkhangelsky 2021 - Synthetic Difference in Differences.pdf]]"
source_location: "§1 pp. 2-5; §3 (Tables 2-3, Fig. 2), pp. 11-18; §4-4.2 (eqs. 4.1-4.9), pp. 18-24; §6 pp. 31-34; Appendix Table 6"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Synthetic Difference-in-Differences - Overview]]"
  - "[[SDID Estimator - Unit and Time Weights]]"
  - "[[Differences-in-Differences]]"
  - "[[Synthetic Control]]"
  - "[[Synthetic Control Bias Theory]]"
used_by:
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[SDID for Geo Experiments and Marketing Panels]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
aliases:
  - SDID double robustness
  - SDID bias decomposition
  - SDID placebo simulations
  - DiD vs synthetic control comparison
---

# SDID vs DiD vs Synthetic Control

> [!summary]
> Under a latent factor model $Y = L + W\circ\tau + E$, every weighted double-differencing estimator has error $= $ bias $B(\omega,\lambda)$ from the systematic component $L$ plus noise $\varepsilon(\omega,\lambda)$. DiD kills $B$ only if $L$ is additive ($L_{it}=\alpha_i+\beta_t$); SC kills $B$ only if unit weights balance the latent unit factors *including levels*. SDID's bias can be written two ways — as a unit-weighted contrast of "time-regression residuals" or a time-weighted contrast of "unit-regression residuals" — so it vanishes if **either** set of weights does its job: a **double robustness** property. In placebo studies calibrated to CPS and Penn World Table data, SDID has the lowest or near-lowest RMSE in almost every design; DiD wins only when there is no interactive component, SC only when there are no additive fixed effects.

## Overview

The comparison is cleanest as a list of what each estimator *omits* from the SDID regression $\min \sum_{it}(Y_{it}-\mu-\alpha_i-\beta_t-W_{it}\tau)^2\hat\omega_i\hat\lambda_t$:

| | Omits | Consequence |
|---|---|---|
| **DiD** | both sets of weights | Relies entirely on additive parallel trends; all controls and all pre-periods count equally, however dissimilar. |
| **SC** | unit fixed effects $\alpha_i$ and time weights | Must match pre-period *levels*; any residual level imbalance passes straight into $\hat\tau$. Not invariant to $L_{it}\leftarrow L_{it}+\alpha_i$. |
| **DIFP** | time weights | SC on demeaned data (Doudchenko–Imbens; Ferman–Pinto). Isolates the value of fixed effects. |
| **MC** | — (different approach) | Matrix completion (Athey et al. 2017): impute $Y_{it}(0)$ from a nuclear-norm-regularised low-rank fit of $L$. |

The argument for including $\alpha_i$ in a weighted regression is "twofold" (§1, pp. 4-5): flexibility strengthens robustness, and unit fixed effects "often explain much of the variation in outcomes and can improve precision." SC weighting can absorb fixed effects on its own only if the weighted control average *exactly* equals the treated average pre-treatment; "in practice, this equality holds only approximately."

## Main Content

> [!definition] Latent factor (interactive fixed effects) model ^def-sdid-factor-model
> $$
> Y = L + W\circ\tau + E, \qquad L = \Gamma\Upsilon^\top, \qquad (W\circ\tau)_{it} = W_{it}\tau_{it}
> $$
> (eqs. 3.2, 4.1). $L$ is the **systematic component** ($\gamma_i$: latent unit factors, $\upsilon_t$: latent time factors, rank $R$); $E$ is the idiosyncratic error with $\mathbb E[E\mid W, L] = 0$, rows independent across units but **serially correlated within unit**. Assignment $W$ **may depend on $L$** (treatment is not randomised) but not on $E$. When $L_{it} = \alpha_i+\beta_t$, DiD is consistent; interactions in $L$ are how the model "discuss[es] inference in settings where DID is misspecified." This is the same model underlying [[Generalized Synthetic Control Method|GSC]] and [[Synthetic Control Bias Theory|Abadie's SC bias analysis]].

> [!theorem] Error decomposition (eq. 4.4) ^thm-sdid-error-decomp
> For any $\omega\in\Omega,\ \lambda\in\Lambda$ (so $\omega_{tr}^\top\tau_{tr,post}\lambda_{post}=\tau$):
> $$
> \hat\tau(\omega,\lambda)-\tau = \underbrace{\omega_{tr}^\top L_{tr,post}\lambda_{post} - \omega_{co}^\top L_{co,post}\lambda_{post} - \omega_{tr}^\top L_{tr,pre}\lambda_{pre} + \omega_{co}^\top L_{co,pre}\lambda_{pre}}_{\text{bias } B(\omega,\lambda)} + \underbrace{(\text{same contrast applied to } E)}_{\text{noise } \varepsilon(\omega,\lambda)}
> $$
> With $\Sigma = \sigma^2 I$, the noise variance is
> $$
> \operatorname{Var}[\varepsilon(\omega,\lambda)] = \sigma^2\left(N_{tr}^{-1} + \lVert\omega_{co}\rVert_2^2\right)\left(T_{post}^{-1} + \lVert\lambda_{pre}\rVert_2^2\right)
> $$
> so concentrated weights inflate variance — the rationale for the ridge penalty on $\omega$.

> [!theorem] Double robustness of the bias (§4.2, p. 23) ^thm-sdid-double-robust
> The bias can be grouped two ways:
> $$
> B(\omega,\lambda) = \left(\omega_{tr}^\top L_{tr,post} - \omega_{co}^\top L_{co,post}\right)\lambda_{post} - \left(\omega_{tr}^\top L_{tr,pre} - \omega_{co}^\top L_{co,pre}\right)\lambda_{pre}
> $$
> $$
> \phantom{B(\omega,\lambda)} = \omega_{tr}^\top\left(L_{tr,post}\lambda_{post} - L_{tr,pre}\lambda_{pre}\right) - \omega_{co}^\top\left(L_{co,post}\lambda_{post} - L_{co,pre}\lambda_{pre}\right)
> $$
> Hence $B\approx 0$ if **either** (a) the unit regression fits and generalises: $\tilde\omega_0 + \tilde\omega_{co}^\top L_{co,\cdot} \approx \tilde\omega_{tr}^\top L_{tr,\cdot}$ in both pre and post columns; **or** (b) the time regression fits and generalises: $\tilde\lambda_0 + L_{\cdot,pre}\tilde\lambda_{pre} \approx L_{\cdot,post}\tilde\lambda_{post}$ in both control and treated rows. "Even if neither model generalizes sufficiently well on its own, it suffices for one model to predict the generalization error of the other." The authors liken this to augmented inverse-probability weighting, where one trades off outcome-model and assignment-model accuracy.

> [!definition] Oracle weights and the three-term error (eqs. 4.5-4.8) ^def-sdid-oracle
> Oracle weights minimise the *expected* objectives: $(\tilde\omega_0,\tilde\omega) = \arg\min \mathbb E[\ell_{unit}]$, $(\tilde\lambda_0,\tilde\lambda)=\arg\min\mathbb E[\ell_{time}]$. They are deterministic functions of $L$ and $\Sigma$. Then
> $$
> \hat\tau^{sdid}-\tau = \underbrace{\varepsilon(\tilde\omega,\tilde\lambda)}_{\text{oracle noise}} + \underbrace{B(\tilde\omega,\tilde\lambda)}_{\text{oracle confounding bias}} + \underbrace{\hat\tau(\hat\omega,\hat\lambda)-\hat\tau(\tilde\omega,\tilde\lambda)}_{\text{deviation from oracle}}
> $$
> Theorem 1 gives conditions under which the first term dominates (see [[SDID Inference - Bootstrap, Jackknife and Placebo#^thm-sdid-asymptotic-normality|asymptotic normality]]).

**An honest caveat the paper states plainly** (p. 23): poor fit of the oracle regressions will usually show up as poor fit on the observed control cells, but "the assumption that one of these regressions generalizes to exposed rows or columns is an identification assumption without clear testable implications. It is essentially an assumption of no unexplained confounding: any exceptional behavior of the exposed observations, whether due to exposure or not, can be ascribed to it." SDID relaxes parallel trends; it does not abolish untestable assumptions.

### How SC works, in this language

SC never estimates $L$. It is a *balancing* estimator (in the spirit of Zubizarreta 2015; Athey, Imbens & Wager 2018): if $\hat\omega^{sc}$ balances the latent unit factors, $\sum_{tr}\hat\omega_i\Gamma_{i\cdot} - \sum_{co}\hat\omega_i\Gamma_{i\cdot}\approx 0$, then $\hat\tau^{sc}\approx\tau + \sum_i (2W_i-1)\hat\omega_i\bar\varepsilon_i$. SDID adds a second balancing device — $\hat\lambda$ balancing the latent *time* factors $\Upsilon$ — plus the additive invariance of DiD.

### Versus methods that estimate $L$ explicitly

Least-squares IFE (Bai 2009; Moon & Weidner) and [[Generalized Synthetic Control Method|GSC]] (Xu 2017) fit $L$ directly. Valid inference there requires the **rank of $L$ to be known** (or bounded) and a "$\beta_{\min}$-type" condition that non-zero singular values are well separated from zero. SDID's Assumption 3 needs only that the $\lfloor\sqrt{\min(T_{pre},N_{co})}\rfloor$-th singular value of $L_{co,pre}$ is small; "arbitrarily many non-zero but very small singular values" are allowed (§4.3, §6). Regularised variants (matrix completion, GSC with CV) are computationally convenient, but "results for inference about $\tau$ that go beyond what was available for least squares estimators are currently not available" (p. 33).

### Versus the augmented synthetic control method

Ben-Michael, Feller & Rothstein's ASCM (for $N_{tr}=T_{post}=1$):

$$
\hat\tau_{asc} = Y_{NT} - \left(\sum_{i=1}^{N-1}\hat\omega_i^{sc}Y_{iT} + \left(\hat m(Y_{N,pre}) - \sum_{i=1}^{N-1}\hat\omega_i^{sc}\hat m(Y_{i,pre})\right)\right)
$$

With a linear $\hat m(Y_{i,pre}) = \hat\lambda_0^{sdid} + Y_{i,pre}\hat\lambda_{pre}^{sdid}$ (least squares on controls, coefficients non-negative and summing to one) and SDID unit weights fit *without* intercept, the two coincide (eq. 6.1). "Weighted two-way bias-removal methods are a natural way of working with panels."

## Examples

### Placebo study 1 — CPS (DiD territory), §3.1, Table 2

Design: log wages of women, state $\times$ year cells, $N=50$, $T=40$; $L$ = rank-4 fit to the real data, decomposed into additive $F$ and interactive $M$; $E$ Gaussian AR(2); **true effect zero**; treatment $D_i\sim\text{Bernoulli}(\pi_i)$ with $\text{logit}\,\pi_i = \phi_\alpha\alpha_i + \phi_M M_i$ fit to real state policies (minimum wage, abortion, gun laws), so assignment correlates with $L$. Baseline: $T_{post}=10$, at most $N_{tr}=10$. 1000 replications. RMSE (bias):

| Design | SDID | SC | DID | MC | DIFP |
|---|---|---|---|---|---|
| Baseline (min. wage) | **0.028** (0.010) | 0.037 (0.020) | 0.049 (0.021) | 0.035 (0.015) | 0.032 (0.007) |
| No $M$ (TWFE correct) | 0.016 | 0.018 | **0.014** | **0.014** | 0.016 |
| No $F$ (no fixed effects) | 0.028 | **0.023** | 0.049 | 0.035 | 0.032 |
| Only noise | 0.016 | 0.014 | 0.014 | 0.014 | 0.016 |
| No noise | 0.006 | 0.017 | 0.047 | **0.004** | 0.011 |
| Random assignment | **0.024** (0.001) | 0.025 | 0.044 (0.002) | 0.031 | 0.027 |
| Outcome: unemployment rate | 0.191 (0.100) | **0.184** | 0.353 (0.304) | 0.247 | 0.187 |
| $N_{tr}=1$ | **0.063** | 0.072 | 0.126 | 0.081 | 0.083 |
| $T_{post}=N_{tr}=1$ | 0.112 | 0.124 | 0.153 | **0.108** | 0.117 |

Lessons drawn by the authors: each classical method wins only in the world built for it (DiD when $M=0$; SC when $F=0$); with pure noise all are equivalent; under **random assignment everything is unbiased but SDID is far more precise than DiD** (0.024 vs 0.044) — extending Bertrand–Duflo–Mullainathan: DiD's error is centred, but "this noise can be substantially reduced by using an estimator like SDID that can exploit predictable variation by matching on pre-exposure trends."

### Placebo study 2 — Penn World Table (SC territory), §3.2, Table 3

$N=111$ countries, $T=48$, log real GDP, $N_{tr}=10$, $T_{post}=10$; much stronger interactive component ($\lVert M\rVert_F/\sqrt{NT}=0.229$ vs $0.100$) and highly persistent noise (AR(2) coefficients $(.91,-.22)$).

| Assignment | SDID | SC | DID | MC | DIFP |
|---|---|---|---|---|---|
| Democracy | **0.031** (−0.005) | 0.038 (−0.004) | 0.197 (0.175) | 0.058 (0.043) | 0.039 (−0.007) |
| Education | **0.030** (−0.003) | 0.053 (0.025) | 0.172 (0.162) | 0.049 (0.040) | 0.039 (−0.005) |
| Random | **0.037** | 0.046 | 0.129 | 0.063 | 0.045 |

DiD collapses (bias $\approx$ RMSE); SDID "across all simulation settings dominates the other estimators."

### Rules of thumb

- Many treated units, plausibly additive $L$, short panel → DiD is fine and cheapest; SDID costs little.
- One treated unit, long pre-period, heterogeneous units → SC territory, but SDID (or DIFP) relaxes level matching and adds time weighting.
- Assignment plausibly correlated with latent trends → prefer SDID over DiD; the DiD bias is first-order (Fig. 2, left panel is visibly off-centre).
- Very short pre-period ($T_{pre}$ small) → SDID's asymptotics (both $N_{co}, T_{pre}\to\infty$) do not apply; fall back on DiD with [[Honest DiD - Sensitivity to Parallel Trends Violations|sensitivity analysis]].

## Connections

- [[Differences-in-Differences]] — additive-$L$ special case; parallel trends = "$M=0$".
- [[Synthetic Control]], [[Synthetic Control Bias Theory]] — the unit-factor balancing argument; Ferman & Pinto show plain SC is asymptotically biased with fixed $N$ unless time factors trend strongly.
- [[Generalized Synthetic Control Method]], [[Xu 2016 - Overview]] — explicit IFE estimation with stronger rank assumptions.
- [[Synthetic Control Extensions]] — augmented / penalised SC.
- [[Doubly-Robust Estimands for ATT(g,t)]] — the *covariate-based* double robustness in DiD; SDID's is over latent factors instead.
- [[Pre-Trend Testing and Its Pitfalls]] — SDID "addresses pretesting concerns" by constructing parallel trends rather than testing for them (§1, p. 4).

## See Also

- [[SDID Estimator - Unit and Time Weights]]
- [[SDID Inference - Bootstrap, Jackknife and Placebo]]
- [[Fixed-Effects Model]]
- [[Abadie 2021 - Overview]]
