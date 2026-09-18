---
title: "Q: For one geo-test dataset, when would Time-Based Regression, CausalImpact (BSTS), synthetic control, generalized synthetic control, synthetic difference-in-differences and Bayesian DiD give different answers, and which assumption drives each difference?"
tags:
  - type/qa
  - topic/causal-inference
  - topic/market-response
  - topic/geo-experiments
  - topic/synthetic-control
  - topic/difference-in-differences
date_asked: 2026-09-18
answered_from:
  - "[[Geo-Experiment Methodology - Overview]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[SDID for Geo Experiments and Marketing Panels]]"
  - "[[SDID vs DiD vs Synthetic Control]]"
  - "[[SDID Estimator - Unit and Time Weights]]"
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[Synthetic Control]]"
  - "[[Synthetic Control Bias Theory]]"
  - "[[Synthetic Control Requirements]]"
  - "[[Synthetic Control Inference and Diagnostics]]"
  - "[[Synthetic Control Extensions]]"
  - "[[Generalized Synthetic Control Method]]"
  - "[[Bayesian Difference in Differences]]"
  - "[[Differences-in-Differences]]"
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Local Linear Trend and Seasonality]]"
  - "[[Counterfactual Impact Estimation]]"
  - "[[Spike-and-Slab Prior for Covariate Selection]]"
  - "[[Honest DiD - Sensitivity to Parallel Trends Violations]]"
  - "[[Standard Errors and Clustering]]"
related_questions:
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - The Kalman Filter Across BSTS State-Space Models and ODE Solvers]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
aliases:
  - Geo-test estimator comparison
  - TBR vs CausalImpact vs synthetic control vs SDID
  - Why do geo-lift estimators disagree
  - Which geo experiment estimator should I use
---

# For one geo-test dataset, when would Time-Based Regression, CausalImpact (BSTS), synthetic control, generalized synthetic control, synthetic difference-in-differences and Bayesian DiD give different answers, and which assumption drives each difference?

> [!summary]
> All six estimators impute the same missing block — the treated geos' untreated outcomes during the test window — and differ only in **what structure they assume the untreated panel has** and **how they are allowed to extrapolate from it**. DiD and Bayesian DiD assume additive geo + time effects; TBR assumes one *stable linear relation* to a fixed control aggregate; CausalImpact adds a drifting state and sparse, unconstrained control regressions; synthetic control (SC) assumes the treated geo sits inside the donors' convex hull *in levels*; generalized SC (GSC) assumes a correctly-ranked factor model it can estimate; SDID needs only that *either* its unit weights *or* its time weights generalise. They agree when the panel is additive, stationary and assignment is random; each pairwise disagreement points at one specific broken assumption, so the spread across estimators is itself a diagnostic. Separately, they can disagree for non-causal reasons: different **estimands** (volume-weighted cumulative lift vs. average per-geo log lift) and different **inference** assumptions (i.i.d. errors over time, homoskedastic geos, known factor rank).

## Answer

### 1. One panel, one missing block

Write the geo $\times$ week panel under the latent factor model the vault's SC, GSC and SDID notes all share ([[SDID vs DiD vs Synthetic Control]], [[Synthetic Control Bias Theory]], [[Generalized Synthetic Control Method]]):

$$
Y_{it} = L_{it} + W_{it}\tau_{it} + E_{it}, \qquad L_{it} = \alpha_i + \beta_t + \gamma_i^\top\upsilon_t
$$

$\alpha_i$ is geo size, $\beta_t$ shared seasonality, and $\gamma_i^\top\upsilon_t$ the **interactive** part — geo-specific loadings on common shocks (ski vs. beach seasonality, exposure to a retailer, sensitivity to macro demand). Assignment $W$ may depend on $L$ but not on $E$. Every estimator below is a rule for imputing $L_{tr,post}$:

| Estimator | How the counterfactual is built | Identifying assumption on $L$ | Where it extrapolates | Native inference |
|---|---|---|---|---|
| **DiD / TWFE** ([[Differences-in-Differences]]) | Uniform unit weights, uniform time weights, double difference | $\gamma_i^\top\upsilon_t = 0$: common trends, $E(Y_0 \mid s,t)=\gamma_s+\lambda_t$ | None needed if additive; otherwise bias is first-order | Cluster-robust SEs ([[Standard Errors and Clustering]]) |
| **Bayesian DiD** ([[Bayesian Difference in Differences]]) | Same contrast as a PyMC linear model with a **single shared linear slope** `trend * t` and a prior $\Delta\sim\mathcal N(0,1)$ | Parallel trends "in parametric form"; in the vault's version the common trend is also *linear* | Same as DiD | Posterior of $\Delta$ under i.i.d. Normal errors |
| **GBR** ([[Geo-Experiment Design and Power Analysis]]) | Cross-geo WLS of test-period response on pretest response and spend delta | Randomisation; a lagged-outcome control rather than a geo fixed effect | — | OLS/WLS CI; power from number of geos $N$ |
| **TBR** ([[Time-Based Regression Estimator for Geo Experiments]]) | Sum controls into $x_t$, regress treated aggregate $y_t=\alpha+\beta x_t+\epsilon_t$ on pretest, predict forward | $(\alpha,\beta,\sigma)$ **stable** from pretest to test ([[TBR Design Sensitivity and the Stationarity Assumption#^def-tbr-stationarity]]) | Free intercept and slope: extrapolates in level and scale, not in shape | Closed-form $t$ posterior with $n-2$ d.f.; power from pretest length $n$ |
| **CausalImpact** ([[Bayesian Structural Time-Series Model]]) | State-space model: local level/trend + seasonality + regression on many control series with a spike-and-slab prior | Controls (plus the treated series' own dynamics) predict the treated series; controls unaffected | Unconstrained coefficients **and** a random-walk trend extrapolated over the test window | Posterior predictive draws; pointwise and cumulative impact ([[Counterfactual Impact Estimation]]) |
| **SC** ([[Synthetic Control]]) | Convex donor weights ($w_j\ge0$, $\sum w_j=1$) matching pre-period **levels** | Weights that reproduce the pre-trajectory also balance $\gamma_i$; treated unit in the convex hull | Precluded by design (interpolation only) | Permutation $p$-value on RMSPE ratios ([[Synthetic Control Inference and Diagnostics]]) |
| **GSC** ([[Generalized Synthetic Control Method]]) | Estimate $\hat F$ on controls, project each treated geo's pretest onto it to get $\hat\lambda_i$, impute $\hat\lambda_i^\top\hat f_t$ | Factor model with rank $r$ chosen by cross-validation; strict exogeneity of $\varepsilon_{it}$ only | Treated loadings may fall outside the control loadings' hull | Parametric bootstrap (needs cross-sectional independence and homoskedasticity) |
| **SDID** ([[SDID Estimator - Unit and Time Weights]]) | Ridge-penalised unit weights **with intercept**, time weights on pre-weeks, then weighted TWFE | Either the unit regression or the time regression generalises to the treated block ([[SDID vs DiD vs Synthetic Control#^thm-sdid-double-robust]]) | Level gaps absorbed by $\alpha_i$; weights stay on the simplex | Bootstrap / jackknife / placebo variance ([[SDID Inference - Bootstrap, Jackknife and Placebo]]) |

[[SDID for Geo Experiments and Marketing Panels]] gives the mapping that makes this table one family: TBR is "SC with **one** donor series, intercept and free slope"; CausalImpact is SC/"vertical regression" with a time-series prior; GBR is DiD with a lagged-outcome control; GeoLift's augmented SC coincides with SDID-without-intercept for a linear outcome model (eq. 6.1 in [[SDID vs DiD vs Synthetic Control]]).

### 2. Pairwise disagreements and the assumption behind each

**(a) DiD / Bayesian DiD vs. everything else — the interactive term.** If test markets were picked for a reason (penetration, sales team, recent growth) that reason is a latent loading $\gamma_i$ correlated with $W$, and DiD's bias is first-order. In the CPS placebo study DiD has RMSE 0.049 (bias 0.021) against SDID's 0.028; on Penn World Table data DiD's bias (0.175) is essentially its whole RMSE (0.197) while SC and SDID sit at 0.038 and 0.031. In Xu's election-day-registration example TWFE gives 0.78–0.87 pp and GSC about 5 pp because pre-period fit visibly fails. The signature: **DiD stands apart while SC, SDID and GSC cluster**. Under *random* assignment the gap is not bias but noise — DiD 0.044 vs SDID 0.024 RMSE — so in a designed geo test a DiD outlier may simply be the least precise draw.

**(b) DiD vs. Bayesian DiD.** Same identifying assumption, so large gaps come from the two things the vault's Bayesian version adds: the $\mathcal N(0,1)$ prior on $\Delta$ (material only when the geo-weeks are few or the outcome is not unit-scaled) and the single linear `trend`. *Synthesis:* with week fixed effects TWFE differences out any shared seasonal shape; a linear trend does not, so seasonal movement inside the test window lands in the residual or in $\Delta$. The i.i.d. likelihood also ignores the serial correlation that [[Standard Errors and Clustering]] warns about, so its posterior will be tighter than a clustered interval unless geo-level structure is modelled.

**(c) DiD vs. GBR — what selection looks like.** [[Differences-in-Differences]] records that fixed effects and lagged dependent variables "bracket the true effect": FE is right if a fixed unobservable drives assignment, the lagged outcome is right if past outcomes do. GBR is the lagged-outcome member. If they differ materially in a non-randomised test, the truth plausibly lies between them; in a randomised one both are unbiased.

**(d) TBR vs. SC / SDID — fixed aggregate vs. chosen weights.** TBR never chooses donors: the control aggregate is volume-weighted by construction, and rescaling it leaves the posterior scale unchanged. One slope $\beta$ can repair a difference in *scale* between treated and control aggregates but not a difference in *which factors* they load on. If the treated geos are, say, seasonal markets and the control sum is dominated by large non-seasonal DMAs, TBR's stability assumption fails while SC/SDID can up-weight the similar donors. In the other direction, TBR's free intercept and slope let it handle a treated market far larger or smaller than any donor mix, exactly where SC's convex-hull requirement ([[Synthetic Control Requirements]]) fails and "any residual level imbalance passes straight into $\hat\tau$."

**(e) TBR vs. CausalImpact — static vs. drifting relation.** TBR is "a simplified, closed-form cousin" of CausalImpact. When the treated/control relation is stable they should agree; the paper's simulations show TBR nominal coverage and squared-bias/MSE of 0.04%. Under a sustained trend (+0.5%/week) TBR becomes biased with sub-nominal coverage at low treated–control correlation, and BSTS's local level/trend/seasonal states "exist precisely to absorb" that drift. Two further sources of divergence: (i) spike-and-slab selection ([[Spike-and-Slab Prior for Covariate Selection]]) picks a few control series with **unconstrained** coefficients — the regression-style extrapolation [[Synthetic Control Bias Theory]] warns hides dissimilarity; (ii) the local linear trend's slope is a random walk, so BSTS intervals **widen with horizon** ([[Local Linear Trend and Seasonality]]), whereas TBR's closed-form scale contains only fixed-parameter uncertainty (growing like $T$) and i.i.d. noise (growing like $\sqrt T$) — no drift term at all. *Synthesis:* a BSTS with a loose trend prior is partly a univariate forecast of the treated series, so over a long cooldown it and TBR can share a pretest fit yet report very different cumulative intervals.

**(f) SC vs. SDID — levels, time weights, dispersion.** Three mechanical differences, each visible in Prop 99 (DiD $-27.3$, SC $-19.6$, SDID $-15.6$): SDID's intercept means donors need only be *parallel*; its time weights put all mass on 1986–88 rather than the full 19-year pretest; its ridge penalty spreads weight over about 30 states where SC uses five. They diverge when geo sizes are heterogeneous (SC's level matching binds), when old pretest weeks are a poor baseline (market drift), or when a heavily weighted SC donor takes an idiosyncratic shock — New Hampshire has high influence under DiD and SC, none under SDID. SC wins only when there are no additive fixed effects (CPS "No $F$" row: 0.023 vs 0.028).

**(g) GSC vs. SDID / SC — estimating $L$ vs. balancing it.** GSC needs the rank of $L$ right and well-separated singular values; SDID tolerates "arbitrarily many non-zero but very small singular values." GSC needs large $T_0$ to pin down each treated geo's loadings (an incidental-parameters problem with 8 pretest weeks) and can extrapolate when treated loadings lie outside the control loadings' convex hull — Xu's own recommended diagnostic. Divergence between GSC and the weighting estimators therefore implicates **rank selection or loading extrapolation**; divergence in the other direction (GSC fits, SC does not) implicates the convex-hull constraint.

### 3. Differences that are not about identification

*Synthesis, not stated in any single note:* the six methods do not report the same number even when every assumption holds.

- **Aggregation and scale.** TBR and CausalImpact model an *aggregate in levels*, so their cumulative $\Delta(t)$ is a volume-weighted total. SDID's $\tau$ is "the average per-geo-week lift over the treated cells," usually on log or per-capita outcomes because SDID is invariant to additive, not multiplicative, geo shifts. If lift varies with market size these differ with no bias anywhere.
- **Window.** TBR and BSTS report cumulative effects including cooldown; SDID's $\tau$ "averages over the chosen post window"; GSC reports $ATT_t$ per period. With adstock, excluding cooldown weeks understates lift ([[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]).
- **Denominator.** TBR estimates the *cost* counterfactual with a second regression; an SDID iROAS divides by planned incremental spend.

### 4. Same point estimate, different intervals

| Method | What the interval assumes | How it goes wrong in geo data |
|---|---|---|
| TBR | independent Normal $\epsilon_t$ over time | *Synthesis:* autocorrelated daily residuals make the $t$ posterior too narrow; the vault's coverage results are for the stable-regression DGP |
| CausalImpact | state-space dynamics carry the autocorrelation | prior on state variances (default $0.1\sigma_y^2$ scale) drives long-horizon width |
| SC | permutation over donors, RMSPE-ratio statistic | yields a $p$-value, not a CI; a formal randomisation test only if geos were randomised |
| SDID placebo (the only option at $N_{tr}=1$) | **homoskedastic geos** | DMAs spanning orders of magnitude violate it unless outcomes are scaled |
| SDID bootstrap / jackknife | many treated units; jackknife is conservative | undefined for a single treated market |
| GSC | cross-sectional independence, homoskedasticity | regional shocks correlate neighbouring geos |
| DiD | clustering by geo | downward-biased with fewer than ~42 clusters |

The decisive line from [[SDID Inference - Bootstrap, Jackknife and Placebo]]: DiD coverage as low as 0.30–0.57 "is a *bias* problem, not a variance problem" — no variance estimator rescues a mis-centred estimator.

### 5. Reading a disagreement

| Pattern | Assumption implicated | Check |
|---|---|---|
| DiD/Bayesian DiD apart; SC, SDID, GSC agree | parallel trends ($\gamma_i^\top\upsilon_t\neq0$, correlated with assignment) | event-study leads; report an [[Honest DiD - Sensitivity to Parallel Trends Violations]] breakdown value ($\bar M$ for shocks, $M$ for smooth drift) |
| SC apart from SDID | level matching / convex hull | pre-period gap; concentration of SC weights; leave-one-out donors |
| SDID time weights pile on recent weeks and it differs from SC/DiD | old pretest is a poor baseline | inspect $\hat\lambda_t$; backdating / in-time placebo |
| TBR apart from CausalImpact | stability of $(\alpha,\beta)$ | does $\Delta(t)$ flatten in cooldown? trending pretest residuals; consider TBR-OR only if correlation is high |
| TBR apart from SC/SDID | composition of the control aggregate | unit-weight plot; rebuild $x_t$ from the SC-selected donors |
| GSC apart from SDID | factor rank or loading extrapolation | vary $r$; plot treated vs control loadings |
| Points agree, intervals differ | inference assumptions only | placebo/A-A runs of each estimator on historical windows |

### Practical Implications

1. **Pick the primary estimator from the design regime, before seeing outcomes.** Many randomised geos, short panel: GBR or DiD, with SDID as a precision upgrade. One or few treated markets, long weekly history, 100+ donors: SDID (placebo SE, scaled outcome), with SC as the transparent cross-check. Two to a handful of geos: TBR / Matched Markets. Trending or strongly seasonal window: CausalImpact. Staggered regional waves with heterogeneous effects: GSC or cohort-wise SDID.
2. **Run the rest as a designed multiverse, not a menu.** Report the spread and use the table in §5 to name the assumption responsible; do not average estimators whose disagreement signals bias.
3. **Backtest all of them the same way.** The TBR/GBR "pseudo-geo-experiment" procedure (slide a fake test window over history) generalises to any estimator and mirrors the SDID paper's placebo studies: true effect zero, compare RMSE, bias and coverage on *your* panel.
4. **Align estimands first** — same window (with cooldown), same scale, same weighting — or the comparison is uninformative.
5. **If the lift feeds an MMM**, prefer an output with a usable uncertainty summary: a BSTS or TBR posterior, or SDID's Gaussian interval used as a likelihood summary ([[Q - Using Experiment Results as Priors in a Bayesian MMM]]).
6. **Donor hygiene applies to every method**: exclude geos with media spillover or their own shocks; SUTVA is assumed by all six.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[SDID for Geo Experiments and Marketing Panels]] | The estimator taxonomy (TBR as one-donor SC, GBR as lagged-outcome DiD), marketing readings of the placebo studies, practical checklist |
| [[SDID vs DiD vs Synthetic Control]] | Factor model, error decomposition, double robustness, Tables 2–3, ASCM equivalence, comparison with GSC |
| [[SDID Estimator - Unit and Time Weights]] | Intercept, ridge, time weights, Prop 99 weights, invariance properties |
| [[SDID Inference - Bootstrap, Jackknife and Placebo]] | Assumptions 1–4, three variance estimators, coverage table |
| [[Time-Based Regression Estimator for Geo Experiments]] | TBR model, posterior, iROAS |
| [[TBR Design Sensitivity and the Stationarity Assumption]] | Stability assumption, coverage/bias simulations, TBR-OR, design sensitivities |
| [[Geo-Experiment Methodology - Overview]] · [[Geo-Experiment Design and Power Analysis]] | GBR vs TBR, source of power, GeoLift as a third branch |
| [[Bayesian Structural Time-Series Model]] · [[Local Linear Trend and Seasonality]] · [[Counterfactual Impact Estimation]] · [[Spike-and-Slab Prior for Covariate Selection]] | CausalImpact components, widening intervals, control selection |
| [[Synthetic Control]] · [[Synthetic Control Bias Theory]] · [[Synthetic Control Requirements]] · [[Synthetic Control Inference and Diagnostics]] · [[Synthetic Control Extensions]] | Convex weights, bias bound, SC-vs-regression contrast, permutation inference, backdating, leave-one-out |
| [[Generalized Synthetic Control Method]] | IFE model, three-step estimator, rank CV, bootstrap, loading diagnostics |
| [[Differences-in-Differences]] · [[Bayesian Difference in Differences]] | Common trends; FE vs lagged-DV bracketing; PyMC model with shared linear trend |
| [[Honest DiD - Sensitivity to Parallel Trends Violations]] | Breakdown values when DiD is retained |
| [[Standard Errors and Clustering]] | Serial correlation, few-cluster bias |

## Related Concepts

- [[Randomization Inference - Overview]] — when geos are randomised, placebo reassignment regains a design-based meaning
- [[Pre-Trend Testing and Its Pitfalls]] — why a passed pre-trend test does not settle pattern 1 in §5
- [[Event Study Designs and Dynamic Treatment Effects]] — week-by-week lift profiles under carryover
- [[Forecast Evaluation and Backtesting]] — placebo backtests of counterfactual forecasts
- [[The Kalman Filter]] — the filter behind BSTS's counterfactual
- [[Interference and Marketplace Experiments]] — spillover, the assumption all six share
- [[Q - A Unified View of Sensitivity to Assumption Violations]] — Honest DiD in the wider sensitivity family
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — when to leave geo designs for user-level randomization

## Gaps

- **No ingested GeoLift / augmented-SC source**; ASCM appears only through the SDID and Abadie notes.
- **No head-to-head simulation on marketing-like panels** (daily data, heavy seasonality, DMA size skew); all quoted numbers are from CPS, Penn World Table, Prop 99 or TBR's own simulations.
- **TBR under autocorrelated errors** is not covered; the interval-width concern in §4 is synthesis.
- **Bayesian DiD coverage is a single PyMC tutorial**: no hierarchical geo-level Bayesian DiD, Bayesian synthetic control, or Bayesian factor model (Pang 2014 is mentioned in the GSC note only).
- **Estimand alignment across estimators** (§3) is not discussed in any source note.

## Follow-Up Questions

- On my own DMA panel, which estimator has the lowest placebo RMSE at 4-, 6- and 8-week test windows?
- How should a geo-lift posterior from TBR or BSTS be summarised so it can enter an MMM likelihood?
- Can Honest-DiD-style restriction sets be defined for SC/SDID residual pre-period gaps?
- What is the Bayesian analogue of SDID — a factor-model prior with unit and time shrinkage?
