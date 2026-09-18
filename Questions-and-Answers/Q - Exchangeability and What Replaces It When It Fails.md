---
title: "Q: Exchangeability underlies permutation/randomization tests, conformal prediction and hierarchical priors. Which vault methods break when it fails (time series, covariate shift, interference, clustering), and what replaces it in each case?"
tags:
  - type/qa
  - topic/causal-inference
  - topic/conformal-prediction
  - topic/econometrics
  - topic/bayesian-statistics
  - topic/online-experimentation
date_asked: 2026-09-18
answered_from:
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Fisher Randomization Test and the Sharp Null]]"
  - "[[Randomization Inference - Overview]]"
  - "[[Sharp vs Weak Null Hypotheses]]"
  - "[[Studentized Randomization Tests]]"
  - "[[Conformal Prediction - Overview]]"
  - "[[Split Conformal Prediction and the Coverage Guarantee]]"
  - "[[Conformal Prediction Under Covariate Shift]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Conformalized Quantile Regression]]"
  - "[[Marginal vs Conditional Coverage]]"
  - "[[Hierarchical Models]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Poststratification]]"
  - "[[Modeled and Unmodeled Data]]"
  - "[[Simulation to Express Uncertainty]]"
  - "[[Influence of Individual Data Points]]"
  - "[[Synthetic Control Inference and Diagnostics]]"
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[SDID for Geo Experiments and Marketing Panels]]"
  - "[[Standard Errors and Clustering]]"
  - "[[Simultaneous Inference via Multiplier Bootstrap]]"
  - "[[Interference and Marketplace Experiments]]"
  - "[[Switchback Experiment Design and Analysis]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Cross Validation Checking]]"
  - "[[Within-Between Persons Causal Inference]]"
related_questions:
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
aliases:
  - "What replaces exchangeability"
  - "When exchangeability fails"
  - "Exchangeability in permutation tests, conformal prediction and hierarchical models"
---

# Exchangeability underlies permutation tests, conformal prediction and hierarchical priors. Which vault methods break when it fails, and what replaces it?

> [!summary]
> Exchangeability is a **symmetry**: the joint law is unchanged by permuting indices, so the rank of any one item among the rest is uniform. That single fact yields exact permutation $p$-values, the conformal $(n+1)$ quantile, synthetic-control placebo ranks and (via de Finetti) the hierarchical prior. It fails in four recognisable ways, and the vault's replacements fall into four families: **(a) shrink the permutation group** to one the design really respects (re-draw from the actual assignment mechanism, resample whole units or clusters, split in time); **(b) reweight** to restore a *weighted* exchangeability (likelihood-ratio / propensity weights, poststratification); **(c) model or condition** until the residual symmetry is plausible (hierarchical levels, state-space structure, covariates); or **(d) give up exactness** for a bound or an asymptotic statement (the drift bound, studentised tests, cluster-robust and bootstrap variances). The most useful single fact is that the [[Fisher Randomization Test and the Sharp Null|Fisher randomization test]] never needed exchangeable *outcomes* — only a known assignment mechanism — which is why designed geo tests and switchbacks keep exact inference where observational placebo tests do not.

## Answer

### Three different things are called "exchangeable" (plus one homonym)

| What is permuted | Who asserts it | What it buys | Vault anchor |
|---|---|---|---|
| **Observations** $(X_i,Y_i)$, under a sampling model | assumption about the data-generating process | uniform rank of the test score $\Rightarrow$ conformal coverage; permutation $p$-values; validity of LOO-CV | [[Split Conformal Prediction and the Coverage Guarantee]], [[Permutation Tests and Exact Inference]], [[Forecast Evaluation and Backtesting]] |
| **Treatment labels**, under a known design | the experimenter, *by construction* | exact FRT $p$-value for any statistic, fixed potential outcomes | [[Fisher Randomization Test and the Sharp Null]], [[Randomization Inference - Overview]] |
| **Parameters** $\theta_1,\dots,\theta_J$, as a prior judgement | the modeller: "no prior reason to treat any group differently" | de Finetti $\Rightarrow$ conditionally i.i.d. given $\phi$ $\Rightarrow$ partial pooling | [[Hierarchical Models]] |
| *Homonym:* $Y^a \perp\!\!\!\perp A$ | epidemiology's name for ignorability | identification of the ATE | [[Within-Between Persons Causal Inference]] |

The first two coincide *numerically* under Fisher's sharp null — "re-assigning $W$ is the same as permuting labels" — but their justifications differ: the permutation test "assumes the outcomes are exchangeable", whereas in the FRT "the validity comes from the **assignment mechanism**, not from any exchangeability or i.i.d. assumption on the outcomes" ([[Permutation Tests and Exact Inference]], [[Fisher Randomization Test and the Sharp Null]]). Everything below turns on that distinction.

> [!definition] Exchangeability ([[Hierarchical Models#^def-exchangeability]])
> $\theta_1,\dots,\theta_J$ is exchangeable if $p(\theta_1,\dots,\theta_J)=p(\theta_{\pi(1)},\dots,\theta_{\pi(J)})$ for every permutation $\pi$. "Exchangeability implies a prior, not the other way around."

**The shared engine.** If $V_1,\dots,V_{n+1}$ are exchangeable, the rank of $V_{n+1}$ is uniform on $\{1,\dots,n+1\}$ (the [[Split Conformal Prediction and the Coverage Guarantee#^thm-quantile-lemma|quantile lemma]]). The same "+1" appears in the Monte Carlo permutation $p$-value $(1+\#\{T_\pi\ge T\})/(1+B)$, in the synthetic-control placebo $p=\tfrac1{J+1}\sum_j\mathbf 1(r_j\ge r_1)$, and in SBC's discrete-uniform ranks ([[Q - Four Meanings of Calibration]]). "Conformal prediction is a permutation test, inverted" ([[Conformal Prediction - Overview]]).

### What breaks, and what replaces it

| Failure | Methods that break | What goes wrong | Replacement in the vault | Price |
|---|---|---|---|---|
| **Serial dependence / drift** | split conformal; LOO-CV and LOO-PIT; random K-fold; i.i.d. resampling of panel rows | conformal is "broken by time-series dependence"; LOO "conditions on all the others, *including future ones*" | rolling-origin / prequential evaluation; drift-weighted conformal with a TV bound; resample whole **units** so within-unit serial correlation is preserved; switchback FRT over the design's own paths; or model the dependence (TBR stationarity, BSTS states) | a bound instead of a guarantee; fewer effective observations; a stationarity assumption |
| **Covariate shift** (same $P_{Y\mid X}$, different $P_X$) | conformal coverage; any sample average meant for another population | airfoil coverage falls from 90.2% to **82.2%**; "that average is over the wrong population" | **weighted exchangeability** with $w=d\tilde P_X/dP_X$; propensity weights for counterfactuals; [[Poststratification\|MRP]] on the Bayesian side | effective sample size $\hat n=\lVert w\rVert_1^2/\lVert w\rVert_2^2$; coverage loss $\Delta_w$ with estimated weights; infinite intervals without overlap |
| **Interference** (SUTVA fails) | difference in means as an estimate of the global effect; unit-level randomization inference for the ATE; ignorability-based conformal ITE intervals | treated units face less competition, and control units more, than in the corresponding global world; naive estimators **overestimate** a positive effect | move randomization to a level where SUTVA holds: **clusters/geos**, **time** (switchbacks), both market sides (TSR), budget-split | "effective sample size is the number of clusters"; carryover replaces interference |
| **Clustering** (within-group correlation) | i.i.d. standard errors; permuting or bootstrapping individual rows when assignment was by group; observation-level LOO for group-level goals | SEs understated by $\sqrt{1+(n-1)\rho}$ ($\approx3.3\times$ at $n=100$, $\rho=0.1$) | cluster "at the level of treatment assignment"; aggregate to cluster means; wild cluster bootstrap below ~42 clusters; cluster-level multiplier weights; leave-one-**group**-out CV; a hierarchical model | power is governed by the number of clusters |
| **Non-random or unequal assignment** | synthetic-control placebo permutations; SDID placebo variance | "the exposed unit was not chosen at random, in which case placebo tests do not have the formal properties of randomization tests" | randomise the geos (design-based meaning returns); RMSPE-ratio statistic; bootstrap/jackknife when $N_{tr}$ is large; otherwise "a more qualitative lens" | placebo variance needs homoskedasticity across units |
| **Heterogeneous effects / unequal variances** (weak null) | permutation test or FRT with $\lvert\hat\tau\rvert$, pooled $F$, or Box statistic | under the weak null the arms are *not* exchangeable; the randomization distribution differs from the sampling distribution | **studentise**: $X^2$ with the Neyman / Huber–White variance | exactness only under the sharp null; asymptotically conservative otherwise |
| **Groups differ in known ways** | a single exchangeable hierarchical prior | shrinkage toward a common mean that the groups do not share | condition on group-level structure; heavier-tailed hyperpriors "when outlier groups are plausible" | see Gaps — the vault is thin here |

### 1. Time series

[[Forecast Evaluation and Backtesting]] opens with the diagnosis: "Ordinary cross-validation assumes exchangeable observations", and for forecasting that "leaks information". The replacement swaps the symmetric split for the only ordering the problem respects, $\log P(X\mid H_k)=\sum_t\log P(X_t\mid X^{t-1},H_k)$ — a rolling origin; LOO-PIT ([[Cross Validation Checking]]) inherits the same limitation. For conformal prediction the vault offers no restored guarantee, only a quantified loss:

> [!theorem] Coverage under drift ([[Conformal Prediction - Overview#^thm-drift]])
> With fixed weights $\tilde w_i$ and $\epsilon_i=d_{\mathrm{TV}}\big((X_i,Y_i),(X_{\text{test}},Y_{\text{test}})\big)$,
> $$\mathbb P\big(Y_{\text{test}}\in\mathcal C(X_{\text{test}})\big)\ge 1-\alpha-2\sum_i\tilde w_i\epsilon_i .$$
> "This is the honest route for time-series data, where exchangeability is false."

Panels are easier because the symmetry survives *across units*: "stores-within-week may be treated as exchangeable, weeks-within-store generally not" ([[Conformalized Quantile Regression]]), and SDID's bootstrap resamples whole rows because "unit-level resampling respects serial correlation" ([[SDID Inference - Bootstrap, Jackknife and Placebo]]). Most striking is the [[Switchback Experiment Design and Analysis|switchback]]: a single autocorrelated series, yet the FRT is exact because paths are re-drawn from the design with $Y^{\text{obs}}$ held fixed — "no time-series model is needed despite arbitrary autocorrelation in the outcomes." Exchangeability of *outcomes* has been replaced by knowledge of the *assignment law*, at the cost of the $m$-carryover assumption and a variance "governed by the number of *assignments*, not the number of users".

### 2. Covariate shift

Tibshirani et al. isolate the step that uses exchangeability — $\mathbb P\{V_{n+1}=v_i\mid E_v\}=1/(n+1)$ — and replace uniformity by known non-uniform weights:

> [!definition] Weighted exchangeability ([[Conformal Prediction Under Covariate Shift#^def-weighted-exch]])
> $V_1,\dots,V_n$ are weighted exchangeable if $f(v_1,\dots,v_n)=\prod_i w_i(v_i)\cdot g(v_1,\dots,v_n)$ with $g$ permutation-invariant. Independent draws $Z_i\sim P_i$ are weighted exchangeable with $w_i=dP_i/dP_1$.

Oracle or classifier-odds weights restore 90.8–91.0% coverage. [[Conformal Inference for Counterfactuals and ITEs]] reads treatment selection as the same shift, $w_1(x)\propto1/e(x)$: coverage is **exact in randomized experiments** because $e$ is known by design, doubly robust otherwise, and the interval becomes $(-\infty,\infty)$ where overlap fails — a loud failure rather than silent bias. The repair works only if $P_{Y\mid X}$ is stable; otherwise only the drift bound applies.

*Synthesis:* [[Poststratification]] is the Bayesian member of the same family. Its "weighting vs. prediction — the same arithmetic, a different frame" estimate $\sum_jN_jE(y\mid\text{cell }j,\theta)/\sum_jN_j$ reweights by cell, and MRP uses an exchangeable prior *within* the cell structure to fill sparse cells. Weighted conformal, IPW and MRP all replace "sample and target are exchangeable" with "exchangeable *given $X$*, plus a density ratio".

### 3. Interference

Interference attacks the potential-outcome notation itself: $Y_i(\mathbf W)\ne Y_i(W_i)$, so "a 50/50 experiment observes *neither* world" ([[Interference and Marketplace Experiments]]). *Synthesis:* the FRT of the sharp null that *no assignment affects anyone* stays exact, since outcomes are still fixed under re-assignment; what breaks is the estimand, and every weak-null or ITE procedure that assumes SUTVA. No reweighting fixes this. The vault's replacements are all **designs**: graph-cluster and geo randomization, switchbacks, two-sided randomization tuned to market balance $\lambda/\tau$, budget-split. Inference then "must respect the randomization unit". "Geo experiments are cluster-randomized designs."

### 4. Clustering

When the randomization (or sampling) unit is a group, only permutations of whole groups preserve the joint law. [[Standard Errors and Clustering]] gives the frequentist repairs; [[Simultaneous Inference via Multiplier Bootstrap]] extends its bootstrap "to clustering by drawing cluster-level $V$'s"; SDID's jackknife and bootstrap delete or resample units.

*Synthesis:* the Bayesian replacement is the hierarchical model itself. Clustered data are not exchangeable, but observations *within* a group and group parameters *across* groups can be — the three-level structure in [[Hierarchical Models]]. The question becomes *which replication* a check targets: [[Simulation to Express Uncertainty]] distinguishes new data from existing groups, new groups, or a new population, and [[Influence of Individual Data Points]] warns that observation-level LOO "does not always match our inferential goals" — use leave-one-group-out. [[Modeled and Unmodeled Data]] adds that every predictive simulation is conditional on the unmodeled design ($N$, $x$): exchangeability is only ever claimed *given the design*.

### 5. Placebo permutations without randomization

[[Synthetic Control Inference and Diagnostics]] calls its placebo test "design-based" against "a uniform benchmark (each assignment equally probable)" — an *assumed* assignment law. Donors are not exchangeable in fit, so the statistic is the RMSPE ratio $r_j$ (*synthesis:* the same move as studentisation in [[Studentized Randomization Tests]]); and the SDID placebo variance needs homoskedasticity across units because "there is no way we can learn $V_\tau$ from unexposed units alone". The clean fix is upstream: "If geos were **randomised**, the placebo reassignment has a genuine design-based interpretation" ([[SDID for Geo Experiments and Marketing Panels]]).

### Same idea, or only similar?

- **Same:** conformal ranks, permutation $p$-values, SC placebo ranks and SBC ranks are one uniform-rank argument. Weighted conformal, IPW and poststratification are one density-ratio repair. RMSPE ratios and studentised $X^2$ are one repair for non-exchangeable *scales*.
- **Looks the same, is not:** the ADH placebo $p$-value and an FRT (identical arithmetic; only one has a known assignment law); the SDID placebo *variance* and the ADH placebo *$p$-value* (same reshuffling, different output and assumptions); bootstrap and permutation — only the latter is "finite-sample exact under the sharp null".
- **Different in kind:** prior exchangeability of parameters is a judgement, not a premise of a theorem. When wrong it does not void a guarantee; it mis-shrinks. The z-score factor $1/\sqrt{1+\sigma_{\bar y}^2/\sigma_\theta^2}$ in [[Partial Pooling as Multiple Comparisons Correction]] adapts *how much* to pool, not *toward what*. Causal "exchangeability" is ignorability, produced by randomization rather than assumed of the data.

### Decision rule

1. **Name the symmetry**: observations, assignments, or parameters?
2. **If you randomised, permute the way you randomised** — pairs within pairs, clusters as clusters, switchback paths from the path distribution — with a studentised statistic.
3. **If you did not randomise,** placebo permutations are descriptive; prefer unit-level bootstrap/jackknife with enough treated units, and report in-time placebos and backdating.
4. **Ordered in time?** No LOO, K-fold or vanilla conformal. Rolling origin; drift-weighted conformal with the loss stated; or exploit cross-unit symmetry within a period.
5. **Target population differs?** Check $P_{Y\mid X}$ is plausibly stable, then weight or poststratify and report $\hat n$.
6. **Units affect each other?** Fix it in the design; analyse at the randomization unit.
7. **Hierarchical prior?** Ask whether you would be surprised to learn *which* group is which.

### Practical Implications

- **Geo experiments.** Stratified, paired geo randomization ([[Geo-Experiment Design and Power Analysis]]) buys an exact FRT — provided the reference distribution re-draws *within pairs* (*synthesis*, by analogy with the switchback test). With hand-picked test markets, SC/SDID placebo inference loses that status and leans on cross-geo homoskedasticity, so use per-capita or log outcomes. TBR and BSTS rely on a stable treatment–control relationship, not exchangeability — a different assumption with its own diagnostics.
- **User-level ad experiments.** Shared auctions, budgets and frequency caps make a campaign split an LR-type design and a user split a CR-type one; both overstate lift when the relevant side is constrained. Randomise at budget, geo or time level and accept the smaller effective $n$; analyse at the randomization unit.
- **MMM.** Weekly observations are not exchangeable: validate by rolling origin and do not wrap the posterior predictive in vanilla split conformal. Exchangeable priors across geos or channels are the workhorse, but pooling paid search with TV toward one mean is a judgement the adaptive $\tau$ cannot undo ([[Q - Partial Pooling Across Statistics and ML and When It Hurts]]). After a traffic-mix change, weighted conformal applies only if $P(\text{convert}\mid\text{features})$ is stable.
- **ABMs / SBI.** The symmetry is built into the architecture: "recurrent units for time series, exchangeable networks for i.i.d. sets" ([[Neural SBI for Agent-Based and Economic Models]]). A permutation-invariant embedding on a simulated time series discards exactly the dependence that identifies carryover.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Permutation Tests and Exact Inference]] | Exchangeability as the permutation-test assumption; bootstrap contrast |
| [[Fisher Randomization Test and the Sharp Null]] | Validity from the assignment mechanism |
| [[Randomization Inference - Overview]] | Design-based inference, randomization distribution |
| [[Sharp vs Weak Null Hypotheses]] | Why the weak null leaves arms non-exchangeable |
| [[Studentized Randomization Tests]] | Studentisation as the repair |
| [[Conformal Prediction - Overview]] | Inverted permutation test; drift theorem; MMM caveat |
| [[Split Conformal Prediction and the Coverage Guarantee]] | Quantile lemma; what breaks the guarantee |
| [[Conformal Prediction Under Covariate Shift]] | Weighted exchangeability, airfoil numbers, $\hat n$ |
| [[Conformal Inference for Counterfactuals and ITEs]] | Selection as covariate shift; exact in RCTs; $\Delta_w$ |
| [[Conformalized Quantile Regression]] | Stores-within-week vs weeks-within-store |
| [[Marginal vs Conditional Coverage]] | Why marginal guarantees are fragile under shift |
| [[Hierarchical Models]] | Definition, de Finetti, three-level structure |
| [[Partial Pooling as Multiple Comparisons Correction]] | Shrinkage adapts amount, not target |
| [[Poststratification]] | Sample-to-population reweighting as prediction; MRP |
| [[Modeled and Unmodeled Data]] | Simulations are conditional on the fixed design |
| [[Simulation to Express Uncertainty]] | Three replication scenarios |
| [[Influence of Individual Data Points]] | Leave-one-group-out for correlated data |
| [[Synthetic Control Inference and Diagnostics]] | Placebo permutation, RMSPE ratio, uniform benchmark |
| [[SDID Inference - Bootstrap, Jackknife and Placebo]] | Unit-level resampling; "not a randomisation test" |
| [[SDID for Geo Experiments and Marketing Panels]] | Randomised geos restore design-based meaning |
| [[Standard Errors and Clustering]] | Moulton factor, cluster level, few clusters |
| [[Simultaneous Inference via Multiplier Bootstrap]] | Cluster-level multiplier weights |
| [[Interference and Marketplace Experiments]] | SUTVA failure, GTE, design remedies |
| [[Switchback Experiment Design and Analysis]] | Exact FRT on one autocorrelated series; carryover |
| [[Forecast Evaluation and Backtesting]] | CV assumes exchangeability; prequential replacement |
| [[Cross Validation Checking]] | LOO-PIT and its exchangeable-data scope |
| [[Within-Between Persons Causal Inference]] | The causal-inference homonym |

## Related Concepts

- [[Potential Outcomes Framework]] — SUTVA and ignorability, behind the design-based rows.
- [[Propensity Score and the Balancing Property]] and [[Common Support and Overlap]] — the density-ratio weights and the overlap condition $\tilde P_X\ll P_X$.
- [[Geo-Experiment Design and Power Analysis]] and [[TBR Design Sensitivity and the Stationarity Assumption]] — stratified randomization, and the assumption TBR uses instead.
- [[Bayesian Structural Time-Series Model]] — modelling dependence rather than permuting it away.
- [[Hierarchical Linear Models]] — varying intercepts and slopes as structured partial pooling.
- [[Q - Four Meanings of Calibration]] — the same uniform-rank argument behind SBC and conformal coverage.
- [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]] — when the $m$-carryover replacement itself fails.

## Gaps

- **Partial / conditional exchangeability is not written down.** [[Hierarchical Models]] states de Finetti for fully exchangeable $\theta_j$ but not exchangeability *given group-level covariates* or within blocks. The last table row is largely synthesis.
- **No dependent-data resampling**: no block or stationary bootstrap, block permutation tests or HAC errors; "wild cluster bootstrap" is a single bullet.
- **Conformal for time series stops at the drift bound**; nothing on conformal with clustered data.
- **Randomization inference under interference** (exposure mappings, conditional randomization tests) is absent; the claim that the no-effect sharp-null FRT survives interference is my synthesis.
- **Restricted randomization tests** for paired or stratified geo designs are implied by the FRT notes but never stated; GBR/TBR use model-based intervals.
- [[Standard Errors and Clustering]] is thin (475 words) and silent on design-based versus sampling-based reasons to cluster.

## Follow-Up Questions

- For a matched-pair geo experiment, how does the exact within-pair FRT interval compare with the TBR posterior and the SDID placebo interval on the same data?
- When geos differ by an order of magnitude in size, which group-level predictors make residual geo effects plausibly exchangeable, and how would one check it?
- Can the switchback FRT be extended to geometric adstock, where $m$-carryover holds only approximately?
