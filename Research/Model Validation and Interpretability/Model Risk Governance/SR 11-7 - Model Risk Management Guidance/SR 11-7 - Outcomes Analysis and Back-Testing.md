---
title: SR 11-7 - Outcomes Analysis and Back-Testing
tags:
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - type/definition
  - type/example
  - doc/reference
source: "[[raw/Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7).pdf]]"
source_location: "SR 11-7 Attachment, §V Model Validation, '3. Outcomes Analysis', pp. 13-15 (back-testing p. 14; VaR example pp. 14-15; long horizons, thresholds, limited back-testing p. 15)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Model Risk Governance/SR 11-7 - Model Risk Management Guidance"
doc_type: reference
depends_on:
  - "[[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]"
  - "[[Forecast Evaluation and Backtesting]]"
used_by:
  - "[[SR 11-7 - Validation of Vendor and Third-Party Models]]"
  - "[[SR 11-7 - Applying Model Risk Management to Marketing Analytics]]"
aliases:
  - Outcomes Analysis (SR 11-7)
  - Back-Testing (SR 11-7)
  - Parallel Outcomes Analysis
  - VaR Back-Testing Example
---

# SR 11-7 - Outcomes Analysis and Back-Testing

> [!summary]
> The third core element of SR 11-7 validation (§V.3, pp. 13-15) compares model outputs to **actual outcomes** — accuracy, rank-ordering, or other tests chosen for the model's objective — using a **range of tests** because each has weaknesses. Key rules: **parallel outcomes analysis** (original and adjusted models both tested against reality; an adjustment that does not outperform signals redesign); **back-testing** = comparison on a period *not used in development* at a frequency matching the forecast horizon, using expected ranges or confidence intervals and investigating exceedances (omitted factors? misspecification? chance?); in-sample fit and holdout performance are "not substitutes for back-testing"; the **VaR** example demands tests of exceedance clustering and other percentiles, not just frequency; "test the model, not individual forecast values"; long-horizon models need **early-warning** metrics plus long back-tests; outcomes outside **predetermined thresholds** warrant adjustment, recalibration or redevelopment under independent review; and when back-testing is impossible, limitations get *more* scrutiny and senior management must be told.

## Overview

Outcomes analysis is the only element that confronts the model with reality. It is ongoing ("to test whether the model continues to perform in line with design objectives and business uses"), and it is where predetermined error thresholds ([[SR 11-7 - Validation Independence, Validation Gate and Periodic Review#^def-error-thresholds]]) are applied.

## Main Content

### Definition (pp. 13-14)

> [!definition] Definition: Outcomes Analysis (SR 11-7, §V.3, pp. 13-14)
> "The third core element of the validation process is outcomes analysis, a comparison of model outputs to corresponding actual outcomes. The precise nature of the comparison depends on the objectives of a model, and might include an assessment of the accuracy of estimates or forecasts, an evaluation of rank-ordering ability, or other appropriate tests."
> - Comparisons "help to evaluate model performance, by establishing expected ranges for those actual outcomes in relation to the intended objectives and assessing the reasons for observed variation between the two."
> - "If outcomes analysis produces evidence of poor performance, the bank should take action to address those issues."
> - It "typically relies on statistical tests or other quantitative measures. It can also include expert judgment to check the intuition behind the outcomes and confirm that the results make sense."
> - "When a model itself relies on expert judgment, quantitative outcomes analysis helps to evaluate the quality of that judgment."
> - It "should be conducted on an ongoing basis."
^def-outcomes-analysis

### Choice and range of tests (p. 14)

> [!theorem] Principle: A Range of Tests, Chosen for the Model (SR 11-7, §V.3, p. 14)
> "The choice of technique should be based on the model's methodology, its complexity, data availability, and the magnitude of potential model risk to the bank. Outcomes analysis should involve a range of tests because any individual test will have weaknesses. For example, some tests are better at checking a model's ability to rank-order or segment observations on a relative basis, whereas others are better at checking absolute forecast accuracy. Tests should be designed for each situation, as not all will be effective or feasible in every circumstance, and attention should be paid to choosing the appropriate type of outcomes analysis for a particular model."
^thm-range-of-tests

Concretely, relative (ranking) tests — e.g. AUC, rank correlation — and absolute tests — e.g. MAE, calibration, interval coverage — can disagree: a model can rank perfectly while being badly miscalibrated, or be calibrated on average while ranking poorly. See [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] and [[Q - Four Meanings of Calibration]].

### Parallel outcomes analysis (p. 14)

> [!definition] Definition: Parallel Outcomes Analysis (SR 11-7, §V.3, p. 14)
> "Models are regularly adjusted to take into account new data or techniques, or because of deterioration in performance. Parallel outcomes analysis, under which both the original and adjusted models' forecasts are tested against realized outcomes, provides an important test of such model adjustments. If the adjusted model does not outperform the original model, developers, users, and reviewers should realize that additional changes—or even a wholesale redesign—are likely necessary before the adjusted model replaces the original one."
^def-parallel-outcomes

This is a champion-challenger test: the adjusted model must earn replacement on realised outcomes, not on in-sample fit or plausibility.

### Back-testing (p. 14)

> [!definition] Definition: Back-Testing (SR 11-7, §V.3, p. 14)
> "Back-testing is one form of outcomes analysis; specifically, it involves the comparison of actual outcomes with model forecasts during a sample time period not used in model development and at an observation frequency that matches the forecast horizon or performance window of the model."
> - **Method:** "The comparison is generally done using expected ranges or statistical confidence intervals around the model forecasts. When outcomes fall outside those intervals, the bank should analyze the discrepancies and investigate the causes that are significant in terms of magnitude or frequency."
> - **Diagnosis of exceedances:** "whether differences stem from the omission of material factors from the model, whether they arise from errors with regard to other aspects of model specification such as interaction terms or assumptions of linearity, or whether they are purely random and thus consistent with acceptable model performance."
> - **Not substitutes:** "Analysis of in-sample fit and of model performance in holdout samples (data set aside and not used to estimate the original model) are important parts of model development but are not substitutes for back-testing."
^def-backtesting

Three defining conditions, formalised. Let the model be developed on data up to time $T_0$, produce $h$-step forecasts $\hat y_{t+h\mid t}$ with interval $I_{t+h\mid t}$ at nominal level $1-\alpha$. A back-test uses
1. **out-of-development period:** $t \ge T_0$;
2. **matching frequency:** evaluation at horizon $h$ equal to the model's forecast horizon/performance window (no evaluating a 13-week model on 1-week-ahead errors);
3. **intervals:** exceedance indicators $E_t = \mathbf{1}\{y_{t+h}\notin I_{t+h\mid t}\}$, with the exceedance rate compared to $\alpha$ and significant deviations investigated.

Why holdout ≠ back-test: a random holdout drawn from the development period shares that period's conditions and (for time series) leaks information through autocorrelation; it also typically evaluates at the wrong horizon. Rolling-origin evaluation ([[Forecast Evaluation and Backtesting]]) satisfies SR 11-7's definition; [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] gives the conditions under which $K$-fold CV is nonetheless valid for model *development* on autoregressive series.

### Worked example: VaR (pp. 14-15)

> [!example] Example: Back-testing a value-at-risk model (SR 11-7, §V.3, pp. 14-15)
> **Setup:** "A well-known example of back-testing is the evaluation of value-at-risk (VaR), in which actual profit and loss is compared with a model forecast loss distribution."
>
> **Signals of failure:** "Significant deviation in expected versus actual performance and unexplained volatility in the profits and losses of trading activities may indicate that hedging and pricing relationships are not adequately measured by a given approach."
>
> **Tests required:** "Along with measuring the frequency of losses in excess of a single VaR percentile estimator, banks should use other tests, such as assessing any clustering of exceptions and checking the distribution of losses against other estimated percentiles."
>
> **Formalisation (standard, not in source):** for a 99% VaR, exceptions $E_t=\mathbf 1\{L_t > \mathrm{VaR}_{t}\}$ should satisfy (i) *frequency*: $\Pr(E_t=1)=0.01$; (ii) *independence*: $E_t$ not clustered in time; (iii) *full distribution*: the probability integral transforms $u_t = \hat F_t(L_t)$ should be uniform, which checks "other estimated percentiles."
>
> **Interpretation:** a model with the right exception *rate* but clustered exceptions is misspecified (e.g. it ignores volatility dynamics). The general lesson matches "Any single test is rarely sufficient" (§IV p. 6). The PIT-uniformity check is the same idea as [[Simulation-Based Calibration - Overview|SBC]] and calibration checks for probabilistic forecasts.
^ex-var-backtest

### Interpreting back-tests (p. 15)

> [!theorem] Principle: Test the Model, Not the Forecast (SR 11-7, §V.3, p. 15)
> "Analysis of the results of even high-quality and well-designed back-testing can pose challenges, since it is not a straightforward, mechanical process that always produces unambiguous results. The purpose is to test the model, not individual forecast values. Back-testing may entail analysis of a large number of forecasts over different conditions at a point in time or over multiple time periods. Statistical testing is essential in such cases, yet such testing can pose challenges in both the choice of appropriate tests and the interpretation of results; banks should support and document both the choice of tests and the interpretation of results."
^thm-test-the-model

### Long horizons and early warning (p. 15)

> [!definition] Standard: Long-Horizon Models and Early-Warning Metrics (SR 11-7, §V.3, p. 15)
> "Models with long forecast horizons should be back-tested, but given the amount of time it would take to accumulate the necessary data, that testing should be supplemented by evaluation over shorter periods. Banks should employ outcomes analysis consisting of 'early warning' metrics designed to measure performance beginning very shortly after model introduction and trend analysis of performance over time. These outcomes analysis tools are not substitutes for back-testing, which should still be performed over the longer time period, but rather very important complements."
^def-early-warning

### Thresholds, remediation and re-validation (p. 15)

> [!theorem] Rule: Predetermined Thresholds and Remediation (SR 11-7, §V.3, p. 15)
> "Outcomes analysis and the other elements of the validation process may reveal significant errors or inaccuracies in model development or outcomes that consistently fall outside the bank's predetermined thresholds of acceptability. In such cases, model adjustment, recalibration, or redevelopment is warranted. Adjustments and recalibration should be governed by the principle of conservatism and should undergo independent review."
>
> "Material changes in model structure or technique, and all model redevelopment, should be subject to validation activities of appropriate range and rigor before implementation."
^thm-predetermined-thresholds

The word *predetermined* matters: thresholds fixed after seeing results become another researcher degree of freedom ([[Researcher Degrees of Freedom]], [[Prediction vs Postdiction]]).

### When back-testing is not possible (p. 15)

> [!theorem] Rule: Limited Ability to Back-Test (SR 11-7, §V.3, p. 15)
> "At times banks may have a limited ability to use key model validation tools like back-testing or sensitivity analysis for various reasons, such as lack of data or of price observability. In those cases, even more attention should be paid to the model's limitations when considering the appropriateness of model usage, and senior management should be fully informed of those limitations when using the models for decision making. Such scrutiny should be applied to individual models and models in the aggregate."
^thm-limited-backtesting

This rule is the one most directly relevant to causal and attribution models, whose estimand (a counterfactual) is never observed. See [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]].

## Examples

> [!example] Example: Back-test design for a quarterly planning forecast (generic illustration)
> **Setup:** a weekly sales model is used to forecast total sales 13 weeks ahead for quarterly planning, with 80% intervals. Development data: weeks 1-104.
> **Back-test:** each week $t=105,\dots,156$, forecast weeks $t+1..t+13$ using only data to $t$; score the 13-week total (matching the decision horizon) against realised totals. Expect ~20% of realised totals outside the 80% intervals.
> **Result:** 14 of 40 evaluable origins (35%) fall outside — and they cluster in two seasonal periods.
> **Diagnosis per SR 11-7:** frequency and clustering both indicate a specification issue (an omitted seasonal/promotion factor), not randomness. With a predetermined threshold of, say, ≤30% exceedances, remediation is triggered, followed by parallel outcomes analysis of the revised vs original model.
^ex-back-test-design-for

> [!example] Example: Parallel outcomes analysis (generic illustration)
> A recalibrated model (new priors) and the original are run side by side for 12 weeks. Mean absolute percentage error: original 6.1%, recalibrated 6.4%. Per SR 11-7, the adjustment "does not outperform the original model," so further changes or redesign are needed before replacement — regardless of how much more plausible the recalibrated model's coefficients look.
^ex-parallel-outcomes-analysis

## Connections

- Forecast evaluation machinery: [[Forecast Evaluation and Backtesting]], [[Probabilistic Forecasting - Overview]], [[Cross Validation Checking]], [[Conformal Prediction - Overview]].
- Repeated monitoring of outcomes and error inflation: [[The Peeking Problem and Optional Stopping]].
- Nonsense fits that pass in-sample tests: [[Granger 2003 - Spurious Regression and Cointegration - Overview]].
- Monte Carlo error of simulation-based validation metrics: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]
- [[SR 11-7 - Ongoing Monitoring, Process Verification, Overrides and Benchmarking]]
- [[SR 11-7 - Validation Independence, Validation Gate and Periodic Review]]
