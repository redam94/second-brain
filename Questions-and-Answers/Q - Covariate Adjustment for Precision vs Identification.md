---
title: "Q: CUPED, regression adjustment, double/debiased ML residualization and CausalImpact covariates all 'adjust for other variables'. When is adjustment for precision, and when is it for identification — and what goes wrong when the two are confused?"
tags:
  - type/qa
  - topic/causal-inference
  - topic/econometrics
  - topic/online-experimentation
  - topic/treatment-effects
  - topic/market-response
date_asked: 2026-09-18
answered_from:
  - "[[CUPED and Regression-Adjusted Variance Reduction]]"
  - "[[Logic of Regression Adjustment]]"
  - "[[Table 2 Fallacy]]"
  - "[[Nuisance Parameter Bias Simulation]]"
  - "[[Regression and the CEF]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Omitted Variables Bias]]"
  - "[[The Experimental Ideal]]"
  - "[[Regularization Bias and the Partially Linear Model]]"
  - "[[Neyman Orthogonality]]"
  - "[[Cross-Fitting and Sample Splitting]]"
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Spike-and-Slab Prior for Covariate Selection]]"
  - "[[Counterfactual Impact Estimation]]"
  - "[[CausalImpact Empirical Application]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[DAGs and Causal Identification]]"
  - "[[Spurious Association and Confounds]]"
  - "[[Studentized Randomization Tests]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
related_questions:
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - Precision vs identification in covariate adjustment
  - When do control variables reduce variance and when do they remove bias
  - Good controls vs bad controls across CUPED DML and CausalImpact
---

# CUPED, regression adjustment, double/debiased ML residualization and CausalImpact covariates all "adjust for other variables". When is adjustment for precision, and when is it for identification — and what goes wrong when the two are confused?

> [!summary]
> The algebra is the same everywhere (partial the covariates out of the outcome, Frisch–Waugh style); the *job* depends on one design fact: **is the covariate balanced across treatment arms by construction?** If randomization guarantees $\mathbb E X^{(t)}=\mathbb E X^{(c)}$, adjustment only removes outcome noise — the estimate is unbiased with or without it, a wrong model costs efficiency, and covariates should be chosen for predictive power (CUPED, ANCOVA, GBR, TBR with randomized geos). If it does not, the covariates *are* the identification argument — omit one and the bias never shrinks with $n$, so they must be chosen from a DAG, not from $R^2$ (observational regression, DML, MMM controls, CausalImpact with non-randomized control series). Confusing the two produces the vault's best-documented failures: kitchen-sink and post-treatment controls, regularization bias, the Table 2 fallacy, and narrow intervals around the wrong number.

## Answer

### One formula, two regimes

*Regression anatomy* says any multivariate coefficient is a bivariate one after partialling out the other regressors, $\beta_k=\operatorname{Cov}(Y_i,\tilde x_{ki})/V(\tilde x_{ki})$ ([[Regression and the CEF]]). The OVB formula says what happens to the treatment coefficient when a covariate $A$ is left out ([[Omitted Variables Bias]]):

$$\rho^{s}=\rho^{l}+\gamma^{l}\,\delta_{As}$$

where $\gamma^l$ is the covariate's association with the outcome and $\delta_{As}$ the coefficient from regressing the covariate on treatment. The formula is *mechanical* — it holds for any pair of nested regressions.

*Synthesis:* every method in the question is an instance of this formula, and the two regimes are the two ways the product $\gamma\delta$ can behave.

- **Precision regime: $\delta_{As}=0$ in expectation, by design.** Random assignment makes treatment independent of everything pre-treatment, so short and long regressions target the same number. [[The Experimental Ideal]] states it in one line: adding covariates "doesn't change the estimate but **reduces standard errors**". CUPED's estimator $\Delta_{cv}=(\bar Y^{(t)}-\bar Y^{(c)})-\theta(\bar X^{(t)}-\bar X^{(c)})$ subtracts the *realized* value of $\gamma\hat\delta$ — "the in-experiment difference, corrected by the chance pre-experiment imbalance between the arms" ([[CUPED and Regression-Adjusted Variance Reduction#^thm-cuped-unbiased]]). The term it removes has mean zero; removing it lowers variance to $\operatorname{var}(\Delta)(1-\rho^2)$ ([[CUPED and Regression-Adjusted Variance Reduction#^thm-cuped-variance]]).
- **Identification regime: $\delta_{As}\neq 0$ in the population.** Treatment was chosen by someone, and whatever drove that choice also drives the outcome. Now the covariates exist to make assignment "as good as random" conditional on them — the [[Conditional Independence Assumption]] $Y_{si}\perp S_i\mid X_i$, equivalently a valid back-door adjustment set ([[DAGs and Causal Identification]]). [[Logic of Regression Adjustment]] calls this set a *sacrifice* "on the altar of causal identification". Leave a member out and $\gamma\delta$ is a bias that no sample size removes.

The CUPED note names the contrast explicitly: it is "the *opposite use* of regression" to the one in [[Logic of Regression Adjustment]] — "there, covariates remove confounding; here there is no confounding to remove, and covariates only soak up outcome variance." And [[DAGs and Causal Identification]] defines a plain **covariate** as a variable that "may be added to improve precision but is not required for identification", distinct from a confounder.

### Side-by-side

| Method | Who assigned treatment | Job of the covariates | What carries identification | If the covariate model is wrong | What a "good" covariate is |
|---|---|---|---|---|---|
| CUPED / post-stratification ([[CUPED and Regression-Adjusted Variance Reduction]]) | Randomizer | Precision | Randomization alone; justification is design-based | Still unbiased; ANCOVA-type estimators are asymptotically at least as efficient as unadjusted even if misspecified | Highest correlation with $Y$: the same metric pre-period (45%+ reduction vs 9–10% for entry-day) |
| GBR, $y_{i,1}=\beta_0+\beta_1y_{i,0}+\beta_2\delta_i+\epsilon_i$ ([[Geo-Experiment Design and Power Analysis]]) | Randomizer (stratified on $y_{i,0}$) | Precision | Randomized geos | Larger $\sigma_\epsilon$, wider ROAS interval | Pretest response; stratifying on it cut CI width by about 10% |
| TBR / CausalImpact with **randomized** control geos ([[Time-Based Regression Estimator for Geo Experiments]], [[CausalImpact Empirical Application]] Analysis 1) | Randomizer, but few units | Mostly precision, partly identification | Randomization **plus** stability of $y_t=\alpha+\beta x_t+\epsilon_t$ from pretest to test ([[TBR Design Sensitivity and the Stationarity Assumption#^def-tbr-stationarity]]) | Bias, not just noise, if the relationship drifts | Control series that tracks the treated series; "high correlation … offsets" small geo counts |
| CausalImpact with **observational** controls (Analysis 2: industry search volume) | Advertiser | Identification | The control series *is* the counterfactual; the model must transfer from pre to post | Bias of unknown sign | A series that shares the treated series' shocks and is untouched by the campaign |
| Observational regression adjustment ([[Logic of Regression Adjustment]]) | Units / the business | Identification | CIA + back-door set + overlap | Bias that does not shrink with $n$ | A member of a minimal sufficient adjustment set — chosen from the DAG |
| DML partialling-out ([[Regularization Bias and the Partially Linear Model]]) | Units / the business | Identification, with ML nuisances | CIA; orthogonal score; cross-fitting | First-order bias unless *both* $Y$ and $D$ are residualized; then second-order | Confounders; note precision scales as $1/\mathbb E[V^2]$ |
| MMM controls $\sum_c\gamma_cz_{t,c}$ ([[Bayesian Media Mix Modeling - Overview]]) | Media planners | Identification | "a regression that infers causation from observational correlation" | Biased channel ROI | Drivers of both spend and sales (seasonality, price, promotions) |

### What is genuinely the same

1. **The arithmetic.** CUPED with one covariate "is numerically the ANCOVA estimate"; DML's Robinson estimator is "an ML-powered Frisch–Waugh–Lovell"; TBR is CausalImpact reduced to "a single static linear regression". Identical code, different warrants.
2. **The ban on post-treatment covariates.** It appears in every cluster: CUPED's "one hard rule", MHE's bad controls ([[Conditional Independence Assumption]]), McElreath's post-treatment bias where controlling for fungus "makes treatment appear ineffective" ([[Spurious Association and Confounds]]), and the chain/collider rules in [[Directed Acyclic Graphs]]. The precision regime is *not* exempt: randomization balances only what precedes assignment.
3. **Nuisance coefficients mean nothing causally.** CUPED's $\theta$, DML's $\hat g,\hat m$, the BSTS regression weights and MMM's $\gamma_c$ are all "Table 2" quantities ([[Table 2 Fallacy]]).

### What only looks similar

**The cost of a wrong covariate model.** In the precision regime unbiasedness "comes from randomization, not from the linear model being correct"; one may even replace $\theta X$ with a machine-learned $f(X)$. [[Neyman Orthogonality#^thm-rates]] gives the formal version: with a known propensity (an RCT) the second-order remainder vanishes and the nuisance requirement "collapses to mere consistency". In the identification regime the same sloppiness is fatal: the naive plug-in has a term of order $\sqrt n\,n^{-\varphi_g}\to\infty$ — "[[Omitted Variables Bias]] in a new guise: the 'omitted variable' is the part of $g_0(X)$ that regularization shrank away" ([[Regularization Bias and the Partially Linear Model#^thm-naive-failure]]). Residualizing $D$ as well turns it into the product $(\hat m_0-m_0)(\hat g_0-g_0)$, and [[Cross-Fitting and Sample Splitting]] removes the overfitting remainder. That note's empirical table shows both regimes at once: in the observational 401(k) study the split-adjusted s.e. is up to 30% larger; in the randomized bonus experiment "the split contributes nothing visible".

**What more predictive power does.** Precision: variance falls as $1-R^2$ of $Y$ on $X$ — more is better. Identification: DML's variance is $\sigma^2\propto 1/\mathbb E[V^2]$, "driven by the variation in treatment *not* predicted by $X$"; if $\hat m_0$ predicts $D$ almost perfectly "no method can help". *Synthesis:* a covariate that predicts treatment but not outcome cannot exist under randomization and is pure variance inflation under confounding.

**Whether data-driven selection is safe.** Picking CUPED covariates by correlation, or letting a [[Spike-and-Slab Prior for Covariate Selection|spike-and-slab prior]] choose among "tens or hundreds" of control series (expected model size $M=3$), is a *prediction* problem where sparsity is appropriate. Selecting *confounders* by predictive fit is not: one nearly collinear with treatment adds little fit, gets shrunk, and leaks into $\hat\theta$ — shrinkage priors on controls "create the same leak into a treatment coefficient".

### What goes wrong when the two are confused

| Confusion | Failure | Vault evidence |
|---|---|---|
| Treating identification as precision: "more controls can only help" | Colliders and mediators enter; "adding more variables does not necessarily improve causal identification" | [[Logic of Regression Adjustment]]; [[Directed Acyclic Graphs]] insight 1 |
| Choosing covariates by correlation with $Y$ regardless of timing | Bing: in-experiment Distinct-Queries was a near-perfect correlate; the "corrected" delta came out **significantly negative** in an experiment known to raise queries — "a narrow interval around the wrong sign" | [[CUPED and Regression-Adjusted Variance Reduction#^warn-post-treatment]] |
| Reading tight intervals as evidence of validity | Adjustment shrinks the interval whether or not the centre is right; nuisance-coefficient coverage *falls* with $n$ (16% to 7% for $L$; 0–1% for confounded $Z$) while the properly identified $X$ stays at 89–91% | [[Nuisance Parameter Bias Simulation#^ex-coverage-table]] |
| Treating precision as identification: expecting CUPED or a pre-period covariate to repair a broken or absent randomization | The correction term no longer has mean zero; it becomes an untested selection-on-observables claim | *Synthesis* from [[CUPED and Regression-Adjusted Variance Reduction#^thm-cuped-unbiased]] |
| Interpreting the adjustment coefficients | Table 2 fallacy | [[Table 2 Fallacy#^def-table2-fallacy]] |
| Regularizing confounders like predictors | $\sqrt n$-divergent bias; sample splitting alone "does **not** rescue the naive estimator" | [[Regularization Bias and the Partially Linear Model]] |
| Using model-based (pooled-variance) inference after adjusting an experiment | The OLS $F$ is improper under heterogeneity; "covariate adjustment / regression-based inference must pair the robust (HW) covariance with the FRT" | [[Studentized Randomization Tests#^thm-F-improper]] |

### The hybrid case: counterfactual time series

CausalImpact and TBR fit neither box cleanly, which makes them the easiest to misuse. The control series *construct* the counterfactual, so they do identification work even in a randomized geo test: $\phi_t=y_t-\tilde y_t$ ([[Counterfactual Impact Estimation#^def-pointwise-impact]]) is unbiased only if the pretest relationship holds in the test period ([[Time-Based Regression Estimator for Geo Experiments#^def-tbr-model]]). Randomization makes that plausible in expectation; with few geos "there is less protection from randomization". The Brodersen application reports 22% lift with randomized control DMAs and 21% with observational industry-search controls — reassuring there, but the first rests on design and the second on an untestable transfer assumption. The placebo on untreated regions (2%, $[-6\%,10\%]$) checks that the covariates are not themselves treated.

### Practical Implications

**Decision rule.** Ask, in order:

1. *Did a randomizer assign treatment?* If yes, precision regime: choose covariates to maximize $R^2$ with the outcome (lagged outcome first), use any learner, report robust or randomization-based uncertainty. If no, identification regime: draw the DAG first, adjust for a minimal sufficient set, treat every omitted confounder as bias.
2. *Is each covariate fixed before assignment?* This test applies in **both** regimes. Anything measured during the flight is suspect.
3. *Would I drop this covariate if it did not improve fit?* In the precision regime yes; in the identification regime never for that reason.
4. *Am I reporting any coefficient other than the treatment's?* If so, it needs its own identification argument.
5. *How much treatment variation is left after adjustment?* Check $\mathbb E[\hat V^2]$ (or overlap) before trusting an observational estimate.

For the owner's work:

- **User-level ad experiments.** Pre-period conversions/visits as CUPED covariates (1–2 weeks) plus a "seen in pre-period" indicator. Never in-flight engagement, impressions served, or post-exposure site visits.
- **Geo experiments.** Stratify on pretest volume, then use pretest response (GBR) or the control aggregate (TBR). Control geos exposed to spillover are post-treatment covariates. Matched markets without randomization put you in the identification regime — say so.
- **MMM.** *Synthesis:* every control is an identification claim. Drivers of both spend and sales (seasonality, price, promotions) belong; mediators of media (branded search, site traffic, when modelling upper-funnel channels) do not, by the chain rule in [[Directed Acyclic Graphs]]. Do not put sparsity priors on the confounder block merely to stabilize sampling, and do not report $\gamma_c$ as effects.
- **Bayesian causal models.** Priors do not change the regime; the nuisance simulation was fully Bayesian. Where shrinkage on controls is unavoidable, residualize the treatment (or include a propensity / expected-spend term), as the PLR note suggests.
- **Agent-based models.** *Synthesis:* covariate-adjusted experimental lifts are safe calibration targets; observationally adjusted ones import the CIA into the ABM.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[CUPED and Regression-Adjusted Variance Reduction]], [[The Experimental Ideal]] | Precision regime: $1-\rho^2$, design-based unbiasedness, post-treatment counter-example |
| [[Omitted Variables Bias]], [[Regression and the CEF]] | The mechanical formula and regression anatomy unifying both regimes |
| [[Logic of Regression Adjustment]], [[Conditional Independence Assumption]] | Identification regime: CIA, back-door set, overlap |
| [[Table 2 Fallacy]], [[Nuisance Parameter Bias Simulation]] | Adjustment coefficients are not effects; coverage worsens with $n$ |
| [[Directed Acyclic Graphs]], [[DAGs and Causal Identification]], [[Spurious Association and Confounds]] | Mediators, colliders, post-treatment bias; "covariate" vs confounder |
| [[Regularization Bias and the Partially Linear Model]], [[Neyman Orthogonality]], [[Cross-Fitting and Sample Splitting]] | Regularized confounders; RCT special case; $1/\mathbb E[V^2]$ |
| [[Bayesian Structural Time-Series Model]], [[Spike-and-Slab Prior for Covariate Selection]], [[Counterfactual Impact Estimation]], [[CausalImpact Empirical Application]] | Control series as counterfactual; predictive selection; placebo |
| [[Time-Based Regression Estimator for Geo Experiments]], [[TBR Design Sensitivity and the Stationarity Assumption]], [[Geo-Experiment Design and Power Analysis]] | Geo analogues: pretest covariate, stability assumption, stratified randomization |
| [[Studentized Randomization Tests]] | Robust inference after adjustment in experiments |
| [[Bayesian Media Mix Modeling - Overview]] | MMM controls sit in the identification regime |

## Related Concepts

- [[Common Support and Overlap]] — the identification-regime cost of covariates that predict treatment too well
- [[Horseshoe and Regularized Horseshoe Priors]] — shrinkage on controls and the leak into treatment coefficients
- [[Power Analysis and Sample Size]] — replace $\sigma^2$ with $\sigma^2(1-\rho^2)$ when planning adjusted experiments
- [[Sample Ratio Mismatch and Trustworthiness Checks]] — verifying that you really are in the precision regime
- [[Activity Bias in Advertising]] — what an unblocked back-door path looks like in ad measurement
- [[Q - The Common Structure of Doubly-Robust Estimators]] — the product-form remainder behind DML
- [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] — where each geo estimator's identifying assumption lives

## Gaps

- The BSTS/CausalImpact notes never state the assumption that control series are **unaffected by the intervention**; it is only implicit in the placebo analysis.
- No note on **Lin (2013)-style interacted adjustment** or Freedman's critique — the finite-sample design-based theory of when ANCOVA can hurt.
- No systematic "good and bad controls" catalogue (e.g. Cinelli, Forney & Pearl), including precision-harming controls and bias amplification; the $1/\mathbb E[V^2]$ remark is the only coverage.
- MMM notes list control variables but do not discuss adjustment-set selection or mediation among channels (search as a mediator of TV); the MMM bullets above are synthesis.
- Nothing on covariate adjustment under **switchback or interference** designs, where "pre-treatment" is ambiguous.

## Follow-Up Questions

- For a funnel of channels (TV to branded search to sales), which MMM controls are mediators, and how should total vs direct effects be specified?
- How much does stratified assignment plus a pretest covariate buy relative to TBR or synthetic DiD at 10, 20 and 50 geos?
- What sensitivity analysis replaces the missing "controls unaffected by treatment" check when geo spillover is plausible?
