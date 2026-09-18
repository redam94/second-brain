---
title: "Q: What changes in the ROAS / mROAS optimization if the outcome is customer lifetime value rather than sales, given that CLV is a model-based forecast observed with delay and censoring?"
tags:
  - type/qa
  - topic/customer-lifetime-value
  - topic/market-response
  - topic/causal-inference
  - topic/forecasting
  - topic/uncertainty-quantification
date_asked: 2026-09-18
answered_from:
  - "[[Customer Lifetime Value - Overview]]"
  - "[[Pareto-NBD Model]]"
  - "[[BG-NBD Model]]"
  - "[[Gamma-Gamma Model of Monetary Value]]"
  - "[[RFM Sufficient Statistics and Iso-Value Curves]]"
  - "[[Shifted-Beta-Geometric Model for Contractual Retention]]"
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Delayed and Censored Feedback - Overview]]"
  - "[[Delayed Feedback Model for Conversion Prediction]]"
  - "[[EM and Gradient Optimization for the Delayed Feedback Model]]"
  - "[[Bandit Models with Delayed and Censored Feedback]]"
  - "[[Survival Analysis]]"
  - "[[Decision Analysis]]"
  - "[[From Inference to Decision]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Heterogeneity in Agent Models]]"
  - "[[Instrumental Variables and Principal Stratification]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
related_questions:
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - CLV-based ROAS and media mix optimization
  - Lifetime value as the outcome of incrementality experiments
  - Budget allocation when the value metric is a censored forecast
---

# What changes in the ROAS / mROAS optimization if the outcome is customer lifetime value rather than sales, given that CLV is a model-based forecast observed with delay and censoring?

> [!summary]
> The optimization keeps its shape (maximize posterior-expected value under a budget, equalize marginal returns) but the numerator stops being an observed quantity. Incremental value becomes **incremental customers × their model-based value + the change in value of existing customers**, so a second posterior (the CLV model's) multiplies the response-curve posterior, and margin, discount rate and the dropout tail become first-order inputs. Because realized lifetime value is right-censored for every recent cohort, a short-window outcome is only usable through a model that separates "not yet" from "never"; fixed windows or constant multipliers favour fast-payback channels. And because "acquired" is a post-treatment variable, the value of ad-acquired customers is identified only by an experiment that measures **value per assigned unit in both arms, zeros included**, never by comparing the customers each channel is credited with.

## Answer

### 1. What stays and what changes

The sales version is in [[ROAS, mROAS, and Optimal Media Mix]]: ROAS is a counterfactual difference in predicted sales over the change period plus $L$ carryover periods, divided by spend ([[ROAS, mROAS, and Optimal Media Mix#^roas-eq]]); the optimal mix maximizes summed predicted sales subject to $\sum x=\mathcal C$ ([[ROAS, mROAS, and Optimal Media Mix#^optimal-mix]]); the static optimum is Dorfman–Steiner, margin × marginal response = 1 ([[Optimal Marketing Decisions and Forecasting#^thm-dorfman-steiner]]). CLV is $\text{margin}\times\text{revenue per transaction}\times\text{DET}$ ([[Customer Lifetime Value - Overview#^def-clv-decomposition]]), with $DET(\delta\mid\lambda,\mu)=\lambda/(\mu+\delta)$ at the individual level ([[RFM Sufficient Statistics and Iso-Value Curves#^thm-det]]).

*Synthesis:* write $N_m(x_m;\Phi)$ for incremental acquisitions from channel $m$ (a Hill-type response with parameters $\Phi$), $\bar v_m(x_m;\psi)$ for the mean model-based CLV of those customers (CLV parameters $\psi$), and $R(x)$ for the change in value of the existing base. Then

$$
V(x)=\sum_m N_m(x_m;\Phi)\,\bar v_m(x_m;\psi)+R(x;\Phi,\psi),\qquad
\text{mROAS}^{CLV}_m=\underbrace{\frac{\partial N_m}{\partial x_m}\bar v_m}_{\text{more customers}}+\underbrace{N_m\frac{\partial \bar v_m}{\partial x_m}}_{\text{different customers}}+\frac{\partial R}{\partial x_m}.
$$

Margin is inside CLV, so the optimum is $\text{mROAS}^{CLV}_m=1$ unconstrained, or equal across channels under a budget.

| | Sales outcome | CLV outcome |
|---|---|---|
| Numerator | Observed sales, modelled counterfactually | A **forecast** of discounted future margin |
| Horizon | $t_1+L-1$, with $L\approx13$ weeks | Infinite, discounted at $\delta=\ln(1+d)/k$ |
| Tail mechanism | Adstock: memory of the *ad* | Repeat purchase: lifetime of the *customer* |
| Uncertainty | Posterior of $\Phi$ | Joint posterior of $(\Phi,\psi)$ plus margin, $\delta$, model choice |
| Saturation | Hill curve on volume ([[Shape (Saturation) Effects]]) | Hill on customer count **and** possibly falling marginal customer quality |
| Ground truth | Arrives within weeks | Right-censored for years |
| Main failure | Extrapolating the response curve | Attributing value by credited channel; ranking channels on a truncated window |

**Two tails, easily double counted.** The geometric lag with purchase feedback already warns that the lagged-sales coefficient "captures both advertising carryover and the repeat-purchase rate" and that the two must be separated ([[Carryover Effects and Distributed Lags#^def-glpf]]). A sales MMM with a 13-week window books the repeat purchases of newly acquired customers inside that window as media effect. *Synthesis:* under a CLV objective the MMM or experiment should model **acquisitions** (adstock still applies to them), the CLV model supplies everything after acquisition, and the two are multiplied, not added to sales-based ROAS.

**The discount rate becomes first-order.** On CDNOW the dropout heterogeneity parameter is $\hat s=0.606<1$. *Synthesis:* a Pareto II lifetime with $s\le1$ has no finite mean, and the expected-purchases formula $\frac{r\beta}{\alpha(s-1)}[1-(\beta/(\beta+t))^{s-1}]$ grows without bound in $t$ ([[Pareto-NBD Model#^thm-pnbd-mean]]). Value is finite only through discounting (the $\delta^{s-1}$ factor in DET), so $\delta$ and margin (30% is simply assumed for CDNOW) move channel rankings as much as any response parameter, and neither is inside any posterior.

### 2. Acquisition versus retention effects

**Acquisition.** A new customer has no recency or frequency, so the individual-level machinery has nothing to condition on: gamma-gamma spend shrinks fully to the population mean at $x=0$ ([[Gamma-Gamma Model of Monetary Value#^thm-gg-conditional-expectation]]), and BTYD "does not apply to new customers" in the sense of differentiating them ([[Bayesian and Hierarchical Extensions of CLV Models]]). Model choice bites hardest exactly here: for a customer with no repeat purchase Pareto/NBD gives $P(\text{alive})\approx0.30$ on CDNOW while BG/NBD forces it to 1, and the zero class holds about 5% of cohort value. Differences between channels must therefore enter at the *population* level: acquisition channel as a time-invariant covariate, $\alpha=\alpha_0e^{-\gamma_1'z_1}$ ([[Bayesian and Hierarchical Extensions of CLV Models#^thm-clv-covariates]]), a cohort-indexed hierarchical fit, or a ZILN model on day-one features.

> [!example] Illustrative ranking flip (own arithmetic, built on the vault's numbers)
> Take the covariate example's $\hat\gamma_1=-0.4$ for paid social, a purchase-rate ratio of $e^{-0.4}=0.67$. Individual DET is linear in $\lambda$, so future value scales by roughly 0.67. With CDNOW's \$47 average customer value as the baseline: channel A at \$30 per incremental customer returns $47/30=1.57$; paid social at \$25 returns $0.67\times47/25=1.26$. On first-purchase ROAS paid social wins (same basket, lower cost); on CLV it loses.

**Retention.** The BTYD and sBG models assume constant individual traits, admit only *time-invariant* covariates, and their authors describe forecasts as "a baseline against which we can examine the impact of changes in marketing activity", warning that marketing covariates invite "endogeneity bias and sample selection bias" when targeting used past RFM. So $R(x)$ cannot be read from a fitted CLV model. It needs randomization among existing customers, after which arm is a legitimate covariate and the estimand is the arm difference in DET. *Synthesis, a trap:* an ad that merely **pulls purchases forward** raises frequency and recency inside the window, so the posterior on $\lambda$ and $P(\text{alive})$, and hence forecast CLV, rises although nothing durable changed. The model reads a transient as a trait because stationarity is its core assumption. Check this by comparing arms again at a later read-out.

### 3. Are ad-acquired customers different? Selection at three levels

1. **Marginal versus average.** $\partial\bar v_m/\partial x_m$ is the quality of the customers added by the *next* dollar. The vault's Hill curves saturate volume; nothing in it models declining quality, but the term is in the derivative and is plausibly negative.
2. **Credited versus caused.** [[Activity Bias in Advertising]] shows exposed users are more active regardless of ads. Customers credited to a channel are therefore enriched with would-have-bought-anyway, high-RFM people, inflating that channel's observed mean CLV. The covariate note says it directly: whether a channel "caused lower-value customers or merely selected them is not identified by this model".
3. **Post-treatment conditioning.** *Synthesis:* "became a customer" is a post-treatment variable, so comparing acquired customers across arms compares different principal strata, always-buyers versus always-buyers plus ad-induced buyers ([[Instrumental Variables and Principal Stratification]]). The identified quantity is the intention-to-treat effect on **value per assigned unit**, non-customers counted as zero. The mean value of ad-induced customers is the complier ratio $\text{ITT}_{\text{value}}/\text{ITT}_{\text{acquisition}}$, valid only under monotonicity and the exclusion restriction that ads do not change always-buyers' value, which is precisely "no retention effect". The allocation needs only the total ITT; the acquisition/retention split is a further assumption.

A time-series version of the same trap is the **ruse of heterogeneity**: aggregate retention rises with tenure though no individual changes ([[Shifted-Beta-Geometric Model for Contractual Retention#^thm-ruse-of-heterogeneity]]). A channel scaled recently has young cohorts and looks worse on blended retention. Compare cohorts at equal tenure, and distrust linear RFM scores, which miss the backward-bending iso-value curves ([[RFM Sufficient Statistics and Iso-Value Curves#^thm-increasing-frequency-paradox]]): a promotion-driven burst followed by silence signals low value.

### 4. Delay and censoring: four kinds of lateness

| Lateness | Example | Same idea as | Repair |
|---|---|---|---|
| Effect delay | Adstock | Distributed lag | Window of $L$; see [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]] |
| Customer tail | Repeat purchases for years | Purchase feedback | Transaction-flow model |
| Measurement delay | Conversion 30 days after click | Right censoring with a "never" class | Joint "ever" and "when" likelihood |
| Administrative censoring | Young cohort, short history | sBG censoring term, Kaplan–Meier | Cohort likelihood with a survivor term; pooling across cohorts |

Genuinely the same idea: the [[Delayed Feedback Model for Conversion Prediction|delayed feedback model]]'s weight $w_i=p(x_i)e^{-\lambda(x_i)e_i}$ that a silent click will still convert ([[EM and Gradient Optimization for the Delayed Feedback Model#^def-em-estep]]) and Pareto/NBD's $P(\text{alive})$, which decays in the silence $T-t_x$ at rate $\lambda+\mu$. Both are posteriors over "not yet versus never", and both extend [[Survival Analysis]] with an event that may never occur. Survival analysis also requires censoring to be noninformative: cohort age is administrative and harmless in itself, but if the channel mix shifted over time, the youngest and most model-dependent cohorts belong disproportionately to the newest channels.

Three lessons transfer to CLV:

- **The window dilemma is fatal here.** Short windows mislabel, long windows are stale (Chapelle: 30 days stale, with new campaigns already 11.3% of traffic after 26 days). A "true" CLV label needs years, so waiting is not an option.
- **Constant multipliers are the Rescale baseline.** Scaling 90-day revenue by one LTV multiplier assumes every cohort matures alike. Chapelle's analogue assumed labels missing at random and underpredicted by 30% on recent campaigns, because missingness depends on elapsed time.
- **A hard window reorders channels.** With a window $m$ the delayed bandit equals an immediate one with rates $\tau_m\theta_k$ ([[Bandit Models with Delayed and Censored Feedback#^thm-bandit-lb-censored]]), harmless for ranking only because the delay CDF is assumed *shared across arms*. *Synthesis:* channels differ in payback curves, so a windowed-value optimizer systematically favours fast-payback channels.

Model-based CLV is thus the vault's version of a surrogate: a function of short-window $(x,t_x,m_x,T)$ that, **if the model holds**, uses all the information in that window (RFM sufficiency). Its weak point is identification from young cohorts, the CLV counterpart of the delayed-feedback model's two basins (low rate and short delay versus high rate and long delay). The sBG result shows structure pays: seven years of data project year-12 survival within about 4%, where curve-fitting regressions miss by 30 to 92%.

### 5. Propagating the CLV posterior into the decision

[[Decision Analysis]] gives $d^*=\arg\max_d\mathbb E[U(d,\theta)\mid y]$ and [[From Inference to Decision]] says to "propagate it as necessary to any decisions" ([[From Inference to Decision#^def-expected-value-rule]]). Here $\theta=(\Phi,\psi)$:

- **Plug in joint draws, never posterior means** ([[ROAS, mROAS, and Optimal Media Mix#^posterior-plug-in]]). $\lambda/(\mu+\delta)$ is a ratio with a heavy right tail, so CLV at mean parameters is not mean CLV. PyMC-Marketing returns per-customer draws; note that its CLV is a finite-horizon sum, not the closed-form infinite-horizon DET.
- **Know where the uncertainty is.** With tens of thousands of customers population parameters are tight; uncertainty concentrates in small or young cohorts and in covariate coefficients, which is exactly the channel-quality term. Pool cohorts hierarchically rather than fitting each alone.
- **Optimize the expectation, report the distribution.** Route A (optimize average value over draws) yields a stable mix; route B (optimize per draw) shows how uncertain it is. The sales-only optimum was already multimodal when extrapolating; multiplying by $\bar v_m$ widens it.
- **The expected-value rule has conditions:** many small independent decisions, no foreclosed options, a trusted model. Bid-level choices satisfy the first; an annual budget split does not. Conversely, do not demand 97.5% certainty that one channel beats another before moving money; for partially pooled estimates that threshold is "very strict".
- **Score the forecast properly.** CLV is zero-inflated and heavy-tailed (the top CDNOW cell, 954 customers, holds 38% of value). CRPS is in dollars and reduces to absolute error for point forecasts, so BTYD draws, ZILN and a naive multiplier are comparable ([[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)#^def-crps]]). Backtest by rolling origin over acquisition cohorts, avoid MAPE with zeros, and check coverage of **cohort sums**, since marginals can be calibrated while sums are not ([[Forecast Evaluation and Backtesting]]). Fader and Hardie's tracking plot and conditional expectations are the same checks; run them **by channel and by arm**.

### Practical Implications

**What an experiment must measure.**

1. Randomized exposure (user-level or geo) with identity resolution, so customers and their transactions map to an arm.
2. Outcomes for **all assigned units**: value per capita or per geo, zeros included. Never only converters.
3. New-customer counts by arm, and a transaction log (id, date, amount) long enough to contain repeat purchases, giving $(x,t_x,T,m_x)$ per arm.
4. Existing customers' transactions by arm, for $R(x)$.
5. Spend by arm, so that $\text{iROAS}^{CLV}=\Delta_{\text{value}}/\Delta_{\text{cost}}$ is computed by dividing posterior draws, as TBR does for iROAS ([[Time-Based Regression Estimator for Geo Experiments#^def-iroas]]).
6. Time-to-purchase distributions by arm, to separate incrementality from acceleration.
7. Pre-registered margin, $\delta$, horizon, model family and zero-class treatment, plus scheduled re-reads (for example 3, 6 and 12 months) in which forecasts are scored against realized cohort revenue.

**Decision rule.** Model *acquisitions* in the MMM or geo test; multiply by an arm- or channel-specific CLV posterior fitted on cohorts, not on credited customers; optimize expected value over joint draws; report the distribution of the optimum; show sensitivity to $\delta$, margin and Pareto/NBD versus BG/NBD before acting. If the CLV ranking differs from the sales ranking only through a covariate estimated on observational channel labels, treat it as a hypothesis for the next experiment.

**For the ABM.** Give agents latent $(\lambda,\mu,\text{spend})$ drawn from gamma mixing distributions by acquisition source, as [[Heterogeneity in Agent Models]] recommends, and calibrate to conditional expectations by frequency class. A homogeneous loyalty-growth rule would reproduce rising retention for the wrong reason.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Customer Lifetime Value - Overview]] | CLV decomposition, baseline-not-causal warning, validation standard |
| [[Pareto-NBD Model]] · [[BG-NBD Model]] | $P(\text{alive})$, new-customer expectation, zero-class difference, $\hat s<1$ |
| [[Gamma-Gamma Model of Monetary Value]] | Shrinkage of spend; full shrinkage at $x=0$; independence assumption |
| [[RFM Sufficient Statistics and Iso-Value Curves]] | DET, discounting, increasing-frequency paradox, CDNOW cohort values |
| [[Shifted-Beta-Geometric Model for Contractual Retention]] | Ruse of heterogeneity, censored cohort likelihood, projection accuracy |
| [[Bayesian and Hierarchical Extensions of CLV Models]] | Covariates, full Bayes, cohort pooling, ZILN, channel-covariate example |
| [[ROAS, mROAS, and Optimal Media Mix]] · [[Optimal Marketing Decisions and Forecasting]] · [[Shape (Saturation) Effects]] | Sales-based objective, posterior plug-in rule, optimum instability, Dorfman–Steiner, Hill curve |
| [[Carryover Effects and Distributed Lags]] | Purchase feedback versus advertising carryover |
| [[Delayed and Censored Feedback - Overview]] · [[Delayed Feedback Model for Conversion Prediction]] · [[EM and Gradient Optimization for the Delayed Feedback Model]] · [[Bandit Models with Delayed and Censored Feedback]] | Window dilemma, "ever" and "when", Rescale failure, censored bandit equivalence |
| [[Survival Analysis]] | Right censoring; noninformative-censoring requirement |
| [[Decision Analysis]] · [[From Inference to Decision]] | Expected-utility rule and its three conditions; against thresholds |
| [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] · [[Forecast Evaluation and Backtesting]] | CRPS, rolling origin, coverage of sums |
| [[Instrumental Variables and Principal Stratification]] · [[Activity Bias in Advertising]] | Post-treatment strata; selection of credited customers |
| [[raw/Fader Hardie Lee 2005 - RFM and CLV Iso-Value Curves.pdf]] | Secs. 1-5, Eq. 2, Tables 2-3 |

## Related Concepts

- [[Metalearners for CATE]] — CLV ranks customers by worth, CATE by responsiveness; targeting needs the second
- [[Posterior Predictive Checking]] — the Bayesian form of the histogram, tracking-plot and conditional-expectation diagnostics
- [[Hierarchical Models]] — pooling young cohorts toward old ones
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]] — feeding the ITT value estimate back into the response model
- [[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]] — the shared Lagrangian structure

## Gaps

- **No note on surrogate indices or long-term effect estimation from short-term outcomes.** The surrogacy reading of model-based CLV above is my synthesis; "surrogate endpoints" appears in the vault only as a one-line application of principal stratification.
- **No model of marginal customer quality** as a function of spend, and no acquisition-versus-retention budget allocation literature.
- **No CLV model with time-varying marketing covariates** or non-stationary traits; the ingested models exclude the retention effect by construction. Abe (2009) is cited from memory in the extensions note, not ingested.
- **No value-of-information treatment** of how long to wait before re-allocating, and **no empirical evidence** in the vault that ad-acquired customers differ in CLV; the $\gamma_1=-0.4$ example is illustrative.

## Follow-Up Questions

- How should a hierarchical BG/NBD with arm and acquisition-cohort effects be specified so that the ITT on value per assigned unit comes with a posterior?
- How sensitive is the optimal mix to $\delta$ when $\hat s<1$, and should the discount rate itself carry a prior?
- What read-out schedule minimizes expected loss from acting on an immature CLV forecast versus waiting?
