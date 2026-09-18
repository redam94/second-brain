---
title: "Q: How does advertising carryover (adstock) violate the assumptions of switchback experiments, always-valid sequential tests and geo tests, and what design changes fix it?"
tags:
  - type/qa
  - topic/online-experimentation
  - topic/market-response
  - topic/causal-inference
  - topic/time-series
  - topic/research-methodology
date_asked: 2026-09-18
answered_from:
  - "[[Switchback Experiment Design and Analysis]]"
  - "[[Interference and Marketplace Experiments]]"
  - "[[Always-Valid p-values and the mSPRT]]"
  - "[[Confidence Sequences]]"
  - "[[The Peeking Problem and Optional Stopping]]"
  - "[[Online Experimentation - Overview]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Carryover Effects and Distributed Lags]]"
  - "[[Design of Dynamic Response Models]]"
  - "[[Advertising and Promotion Effects]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[Delayed and Censored Feedback - Overview]]"
  - "[[Delayed Feedback Model for Conversion Prediction]]"
  - "[[Bandit Models with Delayed and Censored Feedback]]"
  - "[[Time-Varying Treatments and G-computation]]"
  - "[[CUPED and Regression-Adjusted Variance Reduction]]"
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
related_questions:
  - "[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]]"
aliases:
  - Adstock versus switchback and sequential test assumptions
  - Carryover as temporal interference in ad experiments
  - Which experimental design survives advertising carryover
---

# How does advertising carryover (adstock) violate the assumptions of switchback experiments, always-valid sequential tests and geo tests, and what design changes fix it?

> [!summary]
> Adstock is **interference across time**: today's outcome depends on the whole past assignment path. Each design copes with it through a different assumption, and adstock strains each one differently. Switchbacks assume carryover ends after $m$ periods, but geometric adstock never ends, so $m$ must be a truncation horizon $L_\varepsilon=\log\varepsilon/\log\alpha$ and the effective sample size collapses to $T/L_\varepsilon$ coin flips. Always-valid tests keep their type I guarantee (no effect means nothing to carry over) but the *estimand* drifts: the effect wears in, so the earlier the test stops the more it understates the sustained effect, and geo time series are not i.i.d. streams. Geo tests need an adstock-free pretest, a cooldown that ends when the cumulative effect flattens, and separate estimands for heavy-up and go-dark. The fix is always the same trio: **size every window from the retention rate, target the sustained-treatment estimand explicitly, and separate the stopping decision from the magnitude read-out.**

## Answer

[[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] established that read-out windows must span the adstock tail, that back-to-back tests contaminate each other, and that a state-space model can absorb carryover. This note extends it to the online-experimentation cluster: which *formal assumption* of each design does adstock break, how badly, and what should change?

### 1. One idea, three disguises: carryover is interference in time

[[Interference and Marketplace Experiments]] defines interference as any failure of $Y_i(\mathbf W)=Y_i(W_i)$ and the decision-relevant estimand as the **global treatment effect**, everyone treated versus no-one treated. [[Switchback Experiment Design and Analysis]] removes cross-unit interference by treating the market as one unit and immediately meets the temporal version: potential outcomes are $Y_t(w_{1:T})$ and the estimand is the lag-$m$ effect of *sustained* treatment, $\tau_m=\frac{1}{T-m}\sum_t[Y_t(\mathbf 1_{m+1})-Y_t(\mathbf 0_{m+1})]$ ([[Switchback Experiment Design and Analysis#^def-lag-p-effect]]). [[Time-Varying Treatments and G-computation]] writes the same object as $\mathbb E[Y(\bar z)]-\mathbb E[Y(\bar z')]$ for two treatment *sequences*. These are the same idea. Adstock supplies the mechanism: the regressor is $\sum_l w(l)x_{t-l}$ with $w(l)=\alpha^l$ (geometric) or $\alpha^{(l-\theta)^2}$ (delayed peak) ([[Carryover (Adstock) Functional Forms]]), the Koyck lag with long-run multiplier $1/(1-\lambda)$ ([[Carryover Effects and Distributed Lags#^def-koyck]]).

*Synthesis:* under geometric adstock and a locally linear response, the effect $k$ periods after a sustained switch-on is $\tau_\infty(1-\alpha^{k+1})$: a **wear-in curve**. The running average over the first $n$ periods is $\tau_\infty\big[1-\alpha(1-\alpha^{n})/(n(1-\alpha))\big]$, which for weekly $\alpha=0.7$ is 56% of $\tau_\infty$ at $n=4$, 73% at $n=8$ and 82% at $n=13$. Everything below follows from this curve and its mirror image after switch-off.

What only *looks* similar: **conversion delay** ([[Delayed and Censored Feedback - Overview]]). Adstock delays the *effect*; conversion lag delays the *measurement* of an outcome that has already been caused. Both lengthen the effective $m$, but they need different repairs: a longer window for the first, a censoring likelihood for the second.

### 2. What each design assumes and how adstock strains it

| Design | Assumption that carries the inference | How adstock violates it | Symptom | Repair |
|---|---|---|---|---|
| Switchback (Bojinov et al.) | **$m$-carryover**: only the last $m+1$ assignments matter ([[Switchback Experiment Design and Analysis#^def-switchback-assumptions]]) | Geometric weights are never zero; delayed adstock peaks *after* the switch; ratchet or historical-maximum response has unbounded memory ([[Carryover Effects and Distributed Lags#^def-ratchet]]) | $p<m$ makes $\hat\tau_p$ biased toward zero; honest $m$ leaves few coin flips | Set $p\ge L_\varepsilon$; periods shorter than carryover; Fisher test for the sharp null; abandon the design if $T/L_\varepsilon$ is small |
| mSPRT / always-valid $p$-values | i.i.d. draws from $F_\theta$ with **fixed** $\theta$ ([[The Peeking Problem and Optional Stopping#^def-decision-rule]]) | $\theta_t$ ramps up with wear-in; time-aggregated sales have MA(1) Koyck errors | Null control survives, but the estimate at the stopping time understates $\tau_\infty$ and omits the post-stop tail | Use the test for *sign or harm*; pre-commit a minimum run and cooldown for *magnitude* |
| Confidence sequences | Sub-$\psi$ supermartingale; estimand may vary, $\theta_t$ ([[Confidence Sequences#^def-confidence-sequence]]) | Drift makes the **running intersection** empty; the covered quantity is the running mean effect, not the sustained effect | Valid interval for the wrong estimand | Non-intersected sequence with estimand $\mathrm{ATE}_t$; predictable $\hat X_t$ that includes lagged adstock |
| GBR geo test | Pretest $y_{i,0}$ is unaffected by treatment; test window captures the response | Residual adstock from earlier flights sits in the pretest; offline response lags by $\nu$ | Biased covariate; truncated ROAS | Washout before pretest; extend test period by $\nu$ |
| TBR geo test | **Stable** regression of the treatment aggregate on the control aggregate, absent the intervention ([[TBR Design Sensitivity and the Stationarity Assumption#^def-tbr-stationarity]]) | Decaying pre-test adstock in treatment geos is a differential trend; effect continues into cooldown | Counterfactual drifts; $\Delta(t)$ has not flattened | Cooldown until $\Delta(t)$ flattens, no longer; BSTS or TBR-OR under sustained trends |

### 3. Switchbacks: the truncation horizon eats the sample size

The Horvitz–Thompson estimator uses only periods whose whole window $t-p,\dots,t$ is all-treated or all-control, a data-driven washout ([[Switchback Experiment Design and Analysis#^thm-ht-unbiased]]). If $p<m$ the exact test remains valid for the sharp null but $\hat\tau_p$ is biased for $\tau_m$; if $p>m$ everything stays valid, only less efficient. The optimal design flips a fair coin once every $m$ periods ([[Switchback Experiment Design and Analysis#^thm-optimal-switchback]]), so the sample size is $n=T/m$ coin flips, not users or weeks.

*Synthesis:* for geometric adstock there is no true $m$. With linear response, $\mathbb E[\hat\tau_p]/\tau_\infty\in[1-\alpha^{p+1},\,1]$, the lower end applying when assignments before the window are independent of it. So pick $p=L_\varepsilon=\lceil\log\varepsilon/\log\alpha\rceil$ for a tolerated relative bias $\varepsilon$. The vault's benchmarks: Jin et al. treat $L=13$ weeks as effectively infinite for $\alpha\le0.8$, and the 90% duration interval for packaged goods is 6 to 9 months ([[Advertising and Promotion Effects#^thm-duration]]). The switchback CLT needs $n\to\infty$ and the test that identifies $m$ needs $T/m>100$, so a 13-week horizon asks for decades of data.

> [!example] Own simulation (not from the papers): weekly switchback, $\alpha=0.7$, four years
> $Y_t=10+\sum_l 0.7^l w_{t-l}+\varepsilon_t$, $\varepsilon_t\sim N(0,1)$, $T=208$, so $\tau_\infty=3.33$ and $L_{0.05}=8.4$ weeks. Outcomes centred on the known baseline; 4,000 assignment paths per design.
>
> | Design $m=p$ | Coin flips | HT mean $/\tau_\infty$ | HT sd | Naive diff. in means $/\tau_\infty$ | Naive sd |
> |---|---|---|---|---|---|
> | 0 (flip weekly) | 208 | 0.30 | 0.28 | 0.30 | 0.16 |
> | 2 | 102 | 0.71 | 0.73 | 0.40 | 0.18 |
> | 4 | 50 | 0.89 | 1.05 | 0.56 | 0.21 |
> | 8 | 24 | 0.97 | 1.47 | 0.73 | 0.22 |
>
> The HT means track the bound $1-\alpha^{p+1}$ (0.30, 0.66, 0.83, 0.96). Nearly unbiased estimation ($m=8$) costs a standard deviation of 44% of the effect after four years; weekly on/off pulsing recovers only 30% of it. The naive contrast is tight and wrong at every block length.

Two further violations are qualitative. **Ratchet and historical-maximum models** make sales depend on $\max_{i\le t}X_i$, so no finite $m$ exists and on→off is not the mirror image of off→on. And if spend follows a rule that reacts to lagged sales, as [[Design of Dynamic Response Models]] says is typical, past outcomes become time-varying confounders affected by past treatment; either the experimenter, not the pacing algorithm, must own the coin, or the analysis needs the g-formula under [[Time-Varying Treatments and G-computation#^def-sequential-ignorability|sequential ignorability]].

Switchbacks therefore suit responses with almost no memory. In Vaver and Koehler's search experiment incremental clicks flattened the instant spend returned to baseline ($\nu\approx0$) while offline sales kept climbing ([[Geo-Experiment Design and Power Analysis]]): the first metric is switchback material, the second is not.

### 4. Always-valid tests: the error rate survives, the estimand does not

*Synthesis:* carryover of the treatment cannot inflate type I error under the strict null, because a zero effect has nothing to carry over; Ville's inequality is applied under $H_0$ ([[Always-Valid p-values and the mSPRT#^def-msprt]]). Three other things go wrong.

1. **Stopping early means stopping on the steep part of the wear-in curve.** The mSPRT's selling point is that large effects stop very early. Under adstock the early effect is only $\tau_\infty(1-\alpha^{k+1})$, and [[ROAS, mROAS, and Optimal Media Mix#^roas-eq]] requires the numerator to run to $t_1+L-1$. An estimate frozen at the stopping time is biased *down* by wear-in and tail truncation and *up* by stopping on a favourable fluctuation (the type M bias in the peeking note); the two do not reliably cancel.
2. **Null contamination from earlier flights.** Residual adstock from a previous campaign, or users recycled from an earlier experiment, makes the arms differ at $t=0$ with no current treatment. Kohavi et al. report such carryover from re-used hash buckets lasting three weeks to more than three months ([[Online Experimentation - Overview]]). This *does* produce false positives. Run an A/A period, or wash out for $L_\varepsilon$.
3. **The data are not the stream the theory assumes.** For user-level tests with fresh randomized arrivals, Howard et al.'s design-based sequential ATE needs neither independence nor a common mean and covers the running $\mathrm{ATE}_t$ ([[Confidence Sequences#^thm-empirical-bernstein]]). In a geo test randomization happened once; the daily treatment-minus-counterfactual series is autocorrelated (the Koyck error is MA(1)), and dependence is already listed among the mSPRT's limitations. The vault has no always-valid method for that case (see Gaps).

**Delayed conversions** add a measurement layer. In Chapelle's data only 35% of conversions arrive within an hour and 13% arrive after two weeks; labelling pending users as negatives biases the rate down, worst for the freshest cohort ([[Delayed Feedback Model for Conversion Prediction]]). Both arms are censored alike, so the null is safe. *Synthesis:* if the ad changes the **delay distribution** (purchase acceleration), early looks show a lift in "converted so far" that shrinks as control catches up. Fix it by modelling "ever" and "when" jointly ([[Delayed Feedback Model for Conversion Prediction#^thm-dfm-likelihood]]) or by the delay-corrected estimator $\hat\theta_k=S_k/\tilde N_k$ ([[Bandit Models with Delayed and Censored Feedback#^def-bandit-delay-corrected-estimator]]). Vernade et al.'s result that delay alone costs nothing asymptotically while a hard window rescales every rate by $\tau_m$ assumes a delay CDF shared across arms, which acceleration breaks.

### 5. Geo tests: clean pretest, flat cooldown, one-sided estimands

Geo tests are cluster randomization against cross-unit interference ([[Interference and Marketplace Experiments]]); nothing in them protects against the temporal kind.

- **Pretest.** GBR regresses test-period response on pretest response; TBR fits its counterfactual on pretest data. Both are adjustments on a pre-period covariate, so the one hard rule of [[CUPED and Regression-Adjusted Variance Reduction]] applies: never use a covariate the treatment could have affected. Adstock from an earlier flight in the same geos is such an effect. *Synthesis:* leave at least $L_\varepsilon$ between the last spend change and the first pretest day, or the decaying stock becomes the differential trend that biases TBR and drops its coverage ([[TBR Design Sensitivity and the Stationarity Assumption]]).
- **Cooldown.** TBR reads $\Delta(t)$ until it flattens; a curve that never flattens signals a long-lived lagged effect or a broken model. But at fixed total spend the iROAS half-width *grows* with cooldown length, roughly $\propto\sqrt T$. *Synthesis:* each extra cooldown day adds signal of order $\alpha^k$ and a full unit of noise variance, so stop at $L_\varepsilon$ and report the truncated share as a stated bias rather than waiting for a perfectly flat line.
- **Go-dark versus heavy-up.** A holdout removes spend from a stock built before the test; the effect wears *out* along $\alpha^k$, so a short holdout understates the channel just as a short heavy-up does. Under ratchet response ($\beta_1>\beta_2$) the two designs estimate different parameters and should not be pooled.
- **Estimate $\alpha$ at the finest grain.** Clarke's aggregation bias makes carryover estimated from annual data 20 to 50 times longer than from monthly data ([[Carryover Effects and Distributed Lags#^thm-clarke]]).

### Practical Implications

A decision rule for choosing and configuring the design:

1. **Compute the horizon.** From an MMM posterior for $\alpha$ at weekly or daily grain, $L_\varepsilon=\lceil\log\varepsilon/\log\alpha\rceil$ with $\varepsilon=0.05$ to $0.10$. Use the upper posterior quantile of $\alpha$; the cost of $p>m$ is variance, the cost of $p<m$ is bias.
2. **Count coin flips.** $n=T/L_\varepsilon$. If $n$ is below a few dozen (my heuristic; the source only says the CLT needs large $n$ and the $m$-test needs $T/m>100$), do not run a switchback; use geo replication. If it is large (search, retail-media, pricing), run the optimal design, analyse with Horvitz–Thompson and the Fisher randomization test, and never with a difference in means.
3. **Split the two questions.** Monitor continuously with a confidence sequence for *harm or sign*; read *magnitude* once, at a pre-registered time $\ge$ treatment length plus $L_\varepsilon$, over the cumulative window of the ROAS definition.
4. **Wash out before, cool down after.** Both sized by $L_\varepsilon$; A/A-check the pretest.
5. **Name the estimand** (sustained-on versus sustained-off, a finite flight, heavy-up or go-dark) and simulate the planned assignment path through the MMM or ABM first, as the interference note recommends for marketplaces, to get each estimator's bias before spending.
6. **Handle conversion lag as censoring**, not by waiting: a delay model for user-level tests, or a fixed attribution window applied identically to both arms and declared part of the estimand.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Switchback Experiment Design and Analysis]] | $m$-carryover, HT estimator, optimal switching, misspecified $p$ |
| [[Interference and Marketplace Experiments]] | SUTVA, global treatment effect, simulation as a design tool |
| [[Always-Valid p-values and the mSPRT]] · [[The Peeking Problem and Optional Stopping]] | i.i.d. fixed-$\theta$ setup, stated limitations, type M bias at stopping |
| [[Confidence Sequences]] | Time-varying estimand, empirical-Bernstein sequence, running intersection under drift |
| [[Online Experimentation - Overview]] | Carryover from re-used buckets lasting weeks to months |
| [[Carryover (Adstock) Functional Forms]] · [[Carryover Effects and Distributed Lags]] · [[Design of Dynamic Response Models]] | Adstock forms, $L=13$, Koyck MA(1) error, ratchet, aggregation bias, spend rules |
| [[Advertising and Promotion Effects]] | 90% duration interval of 6 to 9 months |
| [[Geo-Experiment Design and Power Analysis]] | GBR model, lag $\nu$, clicks versus offline sales |
| [[Time-Based Regression Estimator for Geo Experiments]] · [[TBR Design Sensitivity and the Stationarity Assumption]] | Cooldown, flattening of $\Delta(t)$, stability, half-width versus cooldown |
| [[ROAS, mROAS, and Optimal Media Mix]] | ROAS numerator runs to $t_1+L-1$ |
| [[Delayed and Censored Feedback - Overview]] · [[Delayed Feedback Model for Conversion Prediction]] · [[Bandit Models with Delayed and Censored Feedback]] | Measurement delay, censoring likelihood, delay-corrected estimator |
| [[Time-Varying Treatments and G-computation]] · [[CUPED and Regression-Adjusted Variance Reduction]] | Sequence estimands; clean pre-period covariates |
| [[raw/Bojinov 2020 - Design and Analysis of Switchback Experiments.pdf]] | Secs. 2-4 and 6 |

## Related Concepts

- [[Bayesian Structural Time-Series Model]] — the model-based alternative that absorbs drifting treatment/control relationships
- [[Fisher Randomization Test and the Sharp Null]] — the inference that stays exact when $m$ is misjudged
- [[Sequential and Adaptive BED]] — choosing the next flight when the last one is still decaying
- [[Q - Does Peeking Matter for a Bayesian]] — stopping rules from the Bayesian side
- [[Q - Exchangeability and What Replaces It When It Fails]] — the i.i.d. stream assumption in a wider frame
- [[Q - Optimizing Media Spend on CLV with Delayed Feedback]] — purchase feedback as a second, much longer carryover

## Gaps

- **No always-valid inference for autocorrelated or regression-adjusted time series.** The vault's sequential notes cover i.i.d. streams and design-based sequential randomization; nothing covers anytime-valid monitoring of a TBR or BSTS counterfactual.
- **No switchback theory for infinite or model-based carryover.** The bias bound $1-\alpha^{p+1}$ and the simulation above are my own; the ingested paper treats only fixed finite $m$. Regression-adjusted or model-assisted switchback estimators are mentioned in one sentence only.
- **No formal optimal cooldown or washout length** (still open from the earlier Q&A), and no note on long-term holdouts or novelty-effect estimation.
- **Hysteresis and asymmetric response** appear only as functional forms, with no experimental-design treatment.

## Follow-Up Questions

- Can a geometric-adstock outcome model be combined with the Horvitz–Thompson switchback estimator to de-bias short blocks while keeping randomization-based inference?
- What is the variance-optimal cooldown length in TBR as a function of $\alpha$, $\sigma$ and spend intensity?
- How should a confidence sequence be built for the cumulative TBR effect $\Delta(t)$ with estimated regression parameters?
