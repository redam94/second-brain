---
title: "Granger 2003 - Spurious Regression from Yule to Granger-Newbold"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/econometrics
  - topic/cointegration
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]"
source_location: "Granger (2003) Nobel Lecture, Les Prix Nobel 2003: smoothness vs stationarity p. 361; cointegration p. 361; spurious regression and the ECM remedy p. 363; cointegration-causality link p. 366. Yule (1926) JRSS 89(1):1-63; Granger & Newbold (1974) J. Econometrics 2(2):111-120; Phillips (1986) J. Econometrics 33(3):311-340 - CITATION ONLY (not in raw/): results described, never quoted."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Granger 2003 - Spurious Regression and Cointegration"
doc_type: paper
depends_on:
  - "[[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]]"
  - "[[Single Marketing Time Series]]"
  - "[[Model Testing and Specification]]"
used_by:
  - "[[Granger 2003 - Spurious Regression Monte Carlo in Python]]"
  - "[[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]"
  - "[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]"
aliases:
  - Spurious Regression and Nonsense Correlations
  - Spurious Regression
  - Nonsense Correlation
  - Nonsense Correlations
  - Granger-Newbold Spurious Regression
  - Spurious Regressions in Econometrics
  - R-squared greater than Durbin-Watson rule
---

# Granger 2003 - Spurious Regression from Yule to Granger-Newbold

> [!summary]
> Regressing one **integrated** (random-walk-like) series on another *independent* integrated series routinely produces a large $R^2$, "significant" $t$-statistics and a Durbin-Watson statistic near zero, although the true relationship is nil. **Yule (1926)** documented the phenomenon as "nonsense correlations" and traced it to the sampling behaviour of correlations between smooth series; **Granger & Newbold (1974)** showed by a small simulation (100 replications, $T=50$) that the textbook $t$-test rejects a true null about three-quarters of the time, and warned that a high $R^2$ with a low Durbin-Watson statistic is no evidence of a relationship (later condensed into the "$R^2 > DW$" rule of thumb); **Phillips (1986)** proved that the $t$-statistic diverges with sample size. Granger's 2003 Nobel Lecture (p. 363) recalls the episode — "Many editors had to look again at their list of accepted papers" — and gives the cure: difference, or model a genuine **cointegrating** relationship with an error-correction model. For marketing analytics this is the base-rate warning behind every regression of a trending KPI on trending media, distribution or macro series.

## Overview

Most marketing and macro series — sales levels, brand search volume, cumulative distribution, media spend that ramps with budgets — are smooth and persistent. Granger's lecture explains why that matters for statistics:

> "It is this relative smoothness that makes them unsuitable for analysis with standard statistical procedures, which assumes data to have a property know as 'stationarity.'" (Granger 2003, p. 361; "know" [sic])

He adds that such series "can be called 'integrated' or, sometimes incorrectly, 'non-stationary.'" and that "when expressed in terms of changes or rates of returns, these derived series appear closer to being stationary" (p. 361). Definitions are in [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] ([[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture#^def-integrated|$I(d)$]]) and [[Single Marketing Time Series]] ([[Single Marketing Time Series#^def-stationarity|stationarity]], [[Single Marketing Time Series#^def-arima|ARIMA and differencing]]).

Spurious regression is the time-series version of the [[Garden of Forking Paths]] problem: the procedure reports confident evidence where none exists, and — unlike most false-discovery problems — the false-positive rate does not shrink with more data; it grows.

## Main Content

### The phenomenon

> [!definition] Spurious (nonsense) regression ^def-spurious-regression
> Let $x_t$ and $y_t$ be **independent** integrated processes of order one, $I(1)$, e.g. two driftless random walks
> $$x_t = x_{t-1} + u_t,\qquad y_t = y_{t-1} + v_t,\qquad u_t \perp v_s\ \ \forall\, t,s,$$
> with $u_t, v_t$ i.i.d. $(0,\sigma^2)$. A **spurious regression** is the OLS fit
> $$y_t = \alpha + \beta x_t + e_t,\qquad t = 1,\dots,T,$$
> in which the true $\beta = 0$, yet the usual OLS output (large $R^2$, $|t_{\hat\beta}| \gg 2$) suggests a strong relationship. Under the null the error $e_t = y_t - \alpha$ is itself $I(1)$, so every classical assumption behind the $t$-test (stationary, weakly dependent errors with finite variance) fails: the residual variance grows with $T$ and the usual standard error formula, which assumes independent errors, drastically understates the true sampling variability of $\hat\beta$.

Granger's summary of the 1974 finding (p. 363):

> "An example is a problem known as 'spurious regressions.' It had been observed, by Paul Newbold and myself in a small simulation published in 1974, that if two independent integrated series were used in a regression, one chosen as the 'dependent variable' and the other the 'explanatory variable,' the standard regression computer package would very often appear to 'find' a relationship whereas in fact there was none. That is, standard statistical methods would find a 'spurious regression.'" (Granger 2003, p. 363)

and its consequence:

> "This observation lead to a great deal of reevaluation of empirical work, particularly in macroeconomics, to see if apparent relationships were correct or not. Many editors had to look again at their list of accepted papers. Putting the analysis in the form of an error-correction model resolves many of the difficulties found with spurious regression." (Granger 2003, p. 363)

The lecture places this example right after saying that cointegration "could be used to explain and remove a variety of difficulties that we had observed in our own research and that of others" (p. 362).

### Yule (1926): nonsense correlations (citation only)

G. Udny Yule's presidential address to the Royal Statistical Society, "Why Do We Sometimes Get Nonsense-Correlations between Time-Series? A Study in Sampling and the Nature of Time-Series" (*JRSS* 89(1), 1926, pp. 1-63), opens with a well-known example. The proportion of Church of England marriages among all marriages and the standardised mortality rate in England and Wales, over the 46 years 1866-1911, correlate at about $+0.95$ (Yule reports 0.9512). Both series declined over the period, and there is no plausible causal link between them. Yule's diagnosis was not "beware of a common cause" but a point about **sampling**. By drawing short samples from artificial serially correlated series, he showed that the sampling distribution of the correlation coefficient between two *independent* series stops being concentrated near zero once the series are strongly serially correlated. For random series the distribution is centred tightly on zero. For series with random differences (random walks) it spreads across most of $(-1,1)$. For series whose differences are themselves correlated it becomes U-shaped, piling up near $\pm 1$. A correlation of 0.95 between two such series is therefore unremarkable. (Described from the paper, Sections I-IV; nothing here is quoted, because the paper is a citation-only source for this note set.) Experiment 3 of [[Granger 2003 - Spurious Regression Monte Carlo in Python]] reproduces the three-shape result.

**Yule's terms (described, not quoted; Section III).**

- A **random series** is one whose serial correlations are all zero in an indefinitely long series.
- A **conjunct series** is one whose serial correlations are all positive.
- Yule splits conjunct series into two sub-types: **conjunct series with random differences** (the differences form a random series, i.e. a random walk, $I(1)$), and **conjunct series with conjunct differences** (the differences are themselves positively serially correlated, roughly $I(2)$-like smoothness).

So "conjunct" describes the *series*, and both experimental cases 2 and 3 are conjunct series. What separates them is whether the *differences* are random (case 2) or conjunct (case 3). It would be a misreading to reserve "conjunct" for case 3 alone: Yule's own headings are "conjunct series with random differences" and "conjunct series with conjunct differences", and his Table IX (the random-walk case) carries the first of these labels.

**Yule's design (described, not quoted; Sections II-IV).**

- **Harmonic warm-up (Section II).** Before the random experiments, Yule considered two pure sine curves of the same period observed over only part of a cycle. The correlation between them over a short stretch depends on their phase difference and on the stretch length. Over short stretches it is pushed towards $+1$ or $-1$ much more often than towards 0. This is the deterministic version of the same point: smooth series observed over a short window look highly correlated.
- **How the random numbers were made (Section IV).** The basic random series came from **drawing playing cards**. Court cards were removed from two patience packs. Black cards counted as positive, red as negative and tens as zero, which gives a near-uniform distribution on $-9, \dots, +9$ (with two zeros), mean 0 and SD $\sqrt{28.5} \approx 5.34$. The pack was shuffled thoroughly and cut before each draw, and a fixed position from the cut was taken.
- **The three series types.**
  1. *Random series:* the card draws themselves.
  2. *Random differences:* the running (cumulative) sum of a random series, i.e. a random walk.
  3. *Conjunct differences:* Yule says the natural construction would have been the second cumulative sum, but he did not use it. He first formed **overlapping sums of 11 consecutive random terms** ($u_0..u_{10}$, $u_1..u_{11}$, and so on) to get a difference series with known serial correlations $10/11, 9/11, \dots, 1/11$ and zero after that, and then cumulated that difference series.
- **Sampling scheme (the "short samples").** For each type he built three series of 100 terms (A, B, C), cut each into 10 sets of **10 consecutive terms**, and correlated every set of A with every set of B, A with C and B with C. That gives 300 correlations, although only 30 independent sets of 10 are used. He repeated the scheme with a control triple (D, E, F), giving **600 correlations per type**. He later judged that this shortcut produced lumpy, irregular distributions.
- **Supplementary independent experiment (random differences only).** Because the two halves disagreed for random walks, he re-ran that case with fully independent samples. He used 300 numbered counters drawn from a bag with replacement (15 sets of 20 counters numbered $-9..0$ and $0..+9$), cumulated each set of 10 draws, and computed another **600 correlations** ("Series X1").

**Results by type (Yule's Tables VIII, IX, XI and Figures 16-18).**

| Series type (Yule's term) | Correlations | Mean $r$ | SD of $r$ | Shape |
|---|---|---|---|---|
| Random series (Table VIII, Fig. 16) | 600 | about $-0.013$ | about 0.32 (theory: $1/\sqrt{10} \approx 0.316$) | roughly symmetric, mode at 0, agrees with sampling theory |
| Conjunct, random differences (Table IX): first triple / control triple / combined | 300 / 300 / 600 | — | about 0.50 / 0.60 / 0.55 | much wider; the control triple is clearly bimodal, with modes near $\pm 0.7$ |
| Conjunct, random differences, independent re-run "Series X1" (Fig. 17) | 600 | about $+0.009$ | about 0.51 | flat, unimodal, close to a semi-ellipse (a symmetric Pearson curve fits, chi-squared $P \approx 0.30$); Yule still calls the shape unstable, because the last hundred of these correlations had SD about 0.55 and looked bimodal |
| Conjunct, conjunct differences (Table XI, Fig. 18) | 600 | — | — | **U-shaped**: a little over one-third of correlations exceed 0.9 in absolute value, about 58% exceed 0.8, and 108 of the 600 lie in $(+0.9, +1.0)$; the apparent mode is between 0.98 and 0.99, and 24 correlations exceed 0.99 in absolute value (11 exceed 0.995) |

**Conclusion.** The "nonsense" correlations of historical series come from the series' own serial correlation combined with short samples, not from any link between them. Correlations between samples of conjunct series with random differences have a far larger standard error than ordinary theory gives. Correlations between conjunct series with conjunct differences tend towards $\pm 1$. Yule also suggests that the marriage and mortality curves look like a segment of a conjunct series with an oscillatory component added, rather than a pure series with conjunct differences.

**How the vault's Experiment 3 maps onto this.** It uses the same three cases and the same sample length ($T = 10$), but with Gaussian innovations instead of card draws. It builds case 3 by cumulating twice, not from Yule's 11-term moving sums, and every sample is independent (like Series X1, not like the A/B/C shortcut). It reports $\Pr(|r|>0.5)$, $\Pr(|r|>0.9)$ and the SD of $r$, and draws the three histograms. The qualitative match is close: about half (0.50) of twice-cumulated pairs exceed 0.9 in absolute value, against a little over one-third in Yule's Table XI for his smoother but not fully $I(2)$ case 3. See [[Granger 2003 - Spurious Regression Monte Carlo in Python#^ex-sim-exp3|Experiment 3]].

### Granger & Newbold (1974): the simulation and the warning (citation only)

Granger & Newbold, "Spurious Regressions in Econometrics" (*Journal of Econometrics* 2(2), 1974, pp. 111-120). Everything below is described from the paper and not quoted, because the paper is a citation-only source for this note set.

**Motivation (Section 1).** Applied econometric papers often reported time-series regressions with a high $R^2$ (or corrected $R^2$) together with a very low Durbin-Watson statistic $d$. The authors give illustrative magnitudes that one could easily find in print: $R^2 = 0.997$ with $d = 0.53$, and an extreme case with $R^2 = 0.99$ and $d = 0.093$. They do **not** run a formal survey of published work. Of the three consequences of autocorrelated errors (inefficient coefficients, suboptimal forecasts, invalid significance tests), they focus on the third: how easily such errors produce spurious "discoveries".

**Simulation 1: Table 1, two random walks.** They regressed one independent random walk of length 50 on another (with a constant), 100 times, and tabulated $S = |\hat\beta_1|/\mathrm{SE}(\hat\beta_1)$:

| $S$ interval | 0-1 | 1-2 | 2-3 | 3-4 | 4-5 | 5-6 | 6-7 | 7-8 | 8-9 | 9-10 | 10-11 | 11-12 | 12-13 | 13-14 | 14-15 | 15-16 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| frequency (of 100) | 13 | 10 | 11 | 13 | 18 | 8 | 8 | 5 | 3 | 3 | 1 | 5 | 0 | 1 | 0 | 1 |

(Transcribed from the published table, which is not held in this vault's raw/ folder; the frequencies sum to 100. The 5-6 entry is hard to read in common scans, and 8 is the only value consistent with that total.) The conventional 5% $t$-test therefore rejects "no relationship" in about **three-quarters** of the cases (77 of 100 have $S > 2$). If $S$ were the absolute value of an $N(0,1)$ variable its mean would be $\sqrt{2/\pi} \approx 0.8$; the observed mean was **4.5**. They read this as the standard error being understated by a factor of about **5.6**, so a "5%-significant" coefficient would need a critical value of about **11.2** instead of 2. They compare this with a Malinvaud (1966) approximation for AR(1) regressors and errors with coefficient 0.8 and $T = 50$, which gives a variance inflation of 5.8; the simulation's inflation for random walks is about $5.6^2 \approx 31$.

**Simulation 2: Table 2, $m$ independent regressors.** One series was regressed on $m = 1, \dots, 5$ other, independently generated series of the same kind. Design: series length 50, **100 replications** per cell, all innovations $N(0,1)$, every series started at 100. The test of no relationship is the overall $F$-type test on $R^2$ at 5%. Four kinds of series were used:

1. random walks (levels);
2. white noise, which is the same thing as the *changes* of random walks (this is the control case);
3. ARIMA(0,1,1) series, built as a random walk plus independent $N(0,1)$ white noise (levels);
4. changes of the ARIMA(0,1,1) series, i.e. first-order moving averages.

> [!example] Granger & Newbold (1974) Table 2, all four cases (values as printed; citation-only source, described) ^ex-gn-table2
> $R^2$ here is the **corrected** (adjusted) $R^2$. "% $R^2 > 0.7$" is the share of the 100 replications with corrected $R^2$ above 0.7. That column is printed blank for random-walk changes and as 0 for ARIMA changes.
>
> | Case | $m$ | % $H_0$ rejected | average $d$ (DW) | average corrected $R^2$ | % $R^2 > 0.7$ |
> |---|---|---|---|---|---|
> | Random walks, levels | 1 | 76 | 0.32 | 0.26 | 5 |
> | | 2 | 78 | 0.46 | 0.34 | 8 |
> | | 3 | 93 | 0.55 | 0.46 | 25 |
> | | 4 | 95 | 0.74 | 0.55 | 34 |
> | | 5 | 96 | 0.88 | 0.59 | 37 |
> | Random walks, changes (= white noise control) | 1 | 8 | 2.00 | 0.004 | — |
> | | 2 | 4 | 1.99 | 0.001 | — |
> | | 3 | 2 | 1.91 | $-0.007$ | — |
> | | 4 | 10 | 2.01 | 0.006 | — |
> | | 5 | 6 | 1.99 | 0.012 | — |
> | ARIMA(0,1,1), levels | 1 | 64 | 0.73 | 0.20 | 3 |
> | | 2 | 81 | 0.96 | 0.30 | 7 |
> | | 3 | 82 | 1.09 | 0.37 | 11 |
> | | 4 | 90 | 1.14 | 0.44 | 9 |
> | | 5 | 90 | 1.26 | 0.45 | 19 |
> | ARIMA(0,1,1), changes (MA(1)) | 1 | 8 | 2.58 | 0.003 | 0 |
> | | 2 | 12 | 2.57 | 0.01 | 0 |
> | | 3 | 7 | 2.53 | 0.005 | 0 |
> | | 4 | 9 | 2.53 | 0.025 | 0 |
> | | 5 | 13 | 2.54 | 0.027 | 0 |
>
> **Reading.** With random walks in levels, acceptance of the true null becomes rare once $m \ge 3$. Average $R^2$ and average $d$ both rise with $m$, and the ARIMA(0,1,1) levels behave the same way, a little less extremely. In the white-noise control, classical regression works: rejections scatter around the nominal 5% (2-10% with 100 replications), $d \approx 2$ and $R^2 \approx 0$. Differenced ARIMA(0,1,1) series are MA(1) processes, so their errors are still autocorrelated (negatively, $d \approx 2.5$). There the null is rejected about **twice as often as it should be** (7-13% against a nominal 5%). Differencing removes the gross spurious-regression problem but does not guarantee correct size when the differenced errors are themselves autocorrelated.

> [!example] Granger & Newbold (1974) random-walk results vs the vault's Experiment 2 ^ex-gn-vs-exp2
> Independent random walks, $T = 50$, test of all slopes = 0 at 5%. The G&N columns are transcribed from their Table 2 (above). The vault columns are from [[Granger 2003 - Spurious Regression Monte Carlo in Python#^ex-sim-exp2|Experiment 2]] (5,000 replications, exact $F$ critical values, seed 1).
>
> | $m$ regressors | G&N % rejecting (100 reps) | vault rejection rate | G&N average corrected $R^2$ | vault mean $R^2$ | G&N average DW | vault median DW |
> |---|---|---|---|---|---|---|
> | 1 | 76% | 0.67 | 0.26 | 0.25 | 0.32 | 0.30 |
> | 2 | 78% | 0.85 | 0.34 | 0.40 | 0.46 | 0.42 |
> | 3 | 93% | 0.92 | 0.46 | 0.51 | 0.55 | 0.55 |
> | 4 | 95% | 0.95 | 0.55 | 0.58 | 0.74 | 0.68 |
> | 5 | 96% | 0.98 | 0.59 | 0.65 | 0.88 | 0.80 |
>
> **Reading.** The two agree on everything that matters. With one regressor most replications reject (about three-quarters for G&N, two-thirds here), and with five rejection is close to certain. Average $R^2$ rises with $m$ from about a quarter to about 0.6, and DW stays far below 2 while drifting up with $m$. The differences fit 100-replication Monte Carlo error (SE up to about 0.05) plus small design differences: G&N report *corrected* $R^2$ and mean DW, while the vault reports unadjusted $R^2$ and median DW. The non-monotone step from $m=1$ to $m=2$ in G&N's column (76% to 78%), compared with 0.67 to 0.85 here, is the kind of wobble expected from 100 replications.

**Conclusions and recommendations (Section 5, described).**

- Strongly autocorrelated residuals (a low $d$) mean the equation is **mis-specified**, whatever its $R^2$. A high $R^2$ together with a low $d$ is no indication of a true relationship.
- The usual remedies are a lagged dependent variable, first differences, or an AR(1) error model. Each helps, but none is guaranteed to remove the problem.
- Their preferred direction, then still in development, was to build a Box-Jenkins model for each series and look for relationships between the *residuals* (pre-whitening). This prefigures the innovation-based view behind Granger causality ([[Granger 2003 - Granger Causality and Its Link to Cointegration]]).
- Their interim rule is to take first differences of all highly autocorrelated variables. They explicitly do not offer differencing as a universal fix. They recommend fitting models in **both levels and changes** and interpreting the two together.
- **Worked example they cite (Sheppard 1971).** UK consumption regressed on autonomous expenditure and mid-year money stock, 1947-1962: in levels, corrected $R^2 = 0.99$ and $d = 0.59$; in changes, corrected $R^2 = -0.03$ and $d = 2.21$.
- **Response to a referee.** Structural models grounded in economic theory are less exposed to the problem in principle, but in practice theory rarely specifies lag structure or residual time-series properties. A very high $R^2$ also leaves no room to test added variables, whereas models in changes, with lower $R^2$, allow more testing.

> [!theorem] Rule of thumb: $R^2 > DW$ (the folk condensation of Granger & Newbold 1974) ^thm-r2-dw
> If a levels regression of one time series on others yields a coefficient of determination larger than its Durbin-Watson statistic,
> $$R^2 > d = \frac{\sum_{t=2}^{T}(\hat e_t - \hat e_{t-1})^2}{\sum_{t=1}^{T}\hat e_t^2} \approx 2(1-\hat\rho_1),$$
> suspect a spurious regression: the fit is likely an artefact of shared persistence rather than a real relationship. ($\hat\rho_1$ = first-order residual autocorrelation.)
>
> **Attribution:** the 1974 paper does not state this inequality as such. It concludes that a high $R^2$ with a low $d$ is no evidence of a relationship and that a low $d$ signals mis-specification. "$R^2 > d$" is the compact version usually attributed to Granger and Newbold in later teaching.
>
> **Conditions/caveats:** a heuristic, not a test. It flags the symptom (near-unit-root residuals, $d \approx 0$); it does not tell a spurious relationship from a genuine **cointegrating** one (where $R^2$ is also high but residuals are stationary, $d$ bounded away from 0). Its hit rate rises with $T$ (in the simulation: 31% of spurious fits flagged at $T=50$, 80% at $T=500$). The DW statistic and its interpretation are in [[Model Testing and Specification]].

Their recommended remedy was to work with **differenced** data alongside levels (or, more generally, to model the dynamics and the error autocorrelation explicitly; see the Section 5 bullets above). Granger's 2003 lecture adds the cointegration-era refinement: the error-correction model, which keeps the long-run levels information that blanket differencing throws away (p. 363).

### Phillips (1986): why it happens (citation only)

Phillips, "Understanding Spurious Regressions in Econometrics" (*Journal of Econometrics* 33(3), 1986), supplied the asymptotic theory using functional central limit theory (scaled random walks converge to Brownian motions). For independent driftless $I(1)$ series:

> [!theorem] Asymptotics of spurious regression (Phillips 1986, stated from the literature) ^thm-phillips
> Assume $x_t, y_t$ independent $I(1)$ with weakly dependent, finite-variance innovations; OLS of $y_t$ on a constant and $x_t$. As $T \to \infty$:
> 1. $\hat\beta$ does **not** converge to $0$; it converges in distribution to a non-degenerate random variable (a ratio of functionals of two independent Brownian motions).
> 2. $\hat\alpha$ diverges at rate $\sqrt{T}$.
> 3. The conventional $t$-statistic for $H_0:\beta=0$ **diverges**: $T^{-1/2} t_{\hat\beta}$ converges to a non-degenerate limit, so $\Pr(|t_{\hat\beta}| > c) \to 1$ for any fixed critical value $c$.
> 4. $R^2$ converges to a **non-degenerate** random variable — it does not shrink to zero with more data.
> 5. The Durbin-Watson statistic $d \to 0$ in probability (at rate $T^{-1}$).
>
> **Proof idea:** scale $x_{\lfloor rT \rfloor}/\sqrt{T} \Rightarrow \sigma W_1(r)$ and $y_{\lfloor rT \rfloor}/\sqrt{T} \Rightarrow \sigma W_2(r)$; sample moments $T^{-2}\sum x_t^2$, $T^{-2}\sum x_t y_t$ converge to integrals of Brownian functionals, so $\hat\beta$ converges to a random ratio of integrals rather than to a constant. The residual variance estimate $s^2$ grows like $T$, while $\sum (x_t - \bar x)^2$ grows like $T^2$, so the standard error shrinks like $T^{-1/2}$ while $\hat\beta$ does not shrink — hence $t = O_p(\sqrt{T})$.
>
> **Significance:** more data makes the false discovery *more* certain. This is the formal reason the $R^2 > DW$ heuristic works, and the reason differencing (which makes all terms $I(0)$) restores standard inference.

### Cointegration: when a levels regression is *not* spurious

Granger presents cointegration as the "missing piece in our approach to modeling groups of series" (p. 362) that turned the spurious-regression warning into a modelling strategy. Definitions and consequences are in [[Granger 2003 - Cointegration and the Error-Correction Representation]] ([[Granger 2003 - Cointegration and the Error-Correction Representation#^def-cointegration-formal|cointegration]], [[Granger 2003 - Cointegration and the Error-Correction Representation#^thm-granger-representation|representation theorem]]); the marketing version is in [[Multivariate Persistence and Cointegration]] ([[Multivariate Persistence and Cointegration#^def-cointegration|definition]], [[Multivariate Persistence and Cointegration#^def-ecm|ECM]]). The decision table:

| $y_t$ | $x_t$ | Levels regression of $y$ on $x$ | What to do |
|---|---|---|---|
| $I(0)$ | $I(0)$ | valid (with HAC/AR errors if residuals are autocorrelated) | standard regression / [[Transfer Function Model]] |
| $I(1)$ | $I(1)$, **not** cointegrated | **spurious** | difference both, or model in changes |
| $I(1)$ | $I(1)$, cointegrated | valid long-run relation (superconsistent $\hat\beta$), but standard $t$-tests still non-standard | error-correction model |
| $I(1)$ | $I(0)$ | unbalanced; $\hat\beta$ meaningless as a level effect | difference $y$, or give $y$ its own stochastic trend in the model |

### Practical diagnostics

> [!algorithm] Spurious-regression screen for levels regressions of trending series ^alg-spurious-screen
> 1. **Plot and test persistence first.** ACF decaying slowly from near 1; unit-root tests (ADF, KPSS) — see [[Single Marketing Time Series]].
> 2. **Compare $R^2$ with DW** on any levels regression of trending series ([[#^thm-r2-dw]]).
> 3. **Refit in differences.** A genuine relationship between levels usually leaves a trace in changes (possibly at lags); a spurious one collapses to $R^2 \approx 0$.
> 4. **Test residuals for a unit root** with Engle-Granger critical values ([[Granger 2003 - Cointegration and the Error-Correction Representation#^alg-engle-granger|Engle-Granger two-step]]). Stationary residuals → cointegration → ECM; unit-root residuals → spurious.
> 5. **Use a persistence-matched null.** Re-run the whole pipeline with surrogate regressors of the same persistence (independent random walks or fitted AR processes) and compare the real fit with that null distribution — a simulation-based check in the spirit of [[Designing Simulated-Data Experiments]].
> 6. **Validate out of sample in time order.** Spurious levels fits often look good under shuffled cross-validation but lose to a naive last-value forecast in a rolling-origin backtest ([[Forecast Evaluation and Backtesting]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]).

## Examples

> [!example] Simulation summary: independent random walks (full code and all experiments in [[Granger 2003 - Spurious Regression Monte Carlo in Python]]) ^ex-spurious-sim-summary
> **Setup:** 5,000 pairs of independent Gaussian random walks per $T$; OLS of $y$ on $x$ in levels and in first differences.
>
> | $T$ | Regression | $\Pr(\lvert t\rvert>1.96)$ | median $\lvert t\rvert$ | mean $R^2$ | median DW | $\Pr(R^2>DW)$ |
> |---|---|---|---|---|---|---|
> | 50 | levels | 0.67 | 3.14 | 0.24 | 0.30 | 0.31 |
> | 50 | differences | 0.06 | 0.69 | 0.02 | 2.00 | 0.00 |
> | 100 | levels | 0.76 | 4.62 | 0.25 | 0.15 | 0.55 |
> | 100 | differences | 0.05 | 0.69 | 0.01 | 2.00 | 0.00 |
> | 500 | levels | 0.90 | 10.01 | 0.24 | 0.03 | 0.80 |
> | 500 | differences | 0.04 | 0.67 | 0.00 | 2.00 | 0.00 |
>
> **Interpretation:** every prediction of [[#^thm-phillips]] is visible — rejection rates of 67-90% for a nominal 5% test, rising with $T$; median $|t|$ growing roughly like $\sqrt{T}$ ($10.01/4.62 \approx 2.17$ vs $\sqrt{5}\approx 2.24$); $R^2$ stuck near 0.24; DW collapsing toward 0. Differencing restores correct size and $R^2 \approx 0$. The $T=50$ levels row is the Granger-Newbold design; 67% here vs their roughly three-quarters from 100 replications is within Monte Carlo and design (critical value $\approx 2$ vs 1.96) noise.

> [!example] A trending KPI against trending media (applied reading) ^ex-kpi-media
> **Setup:** an analyst has ~150 weeks of a brand KPI that drifted upward and a digital channel whose spend was ramped steadily over the same period. A levels regression of KPI on spend gives $R^2 = 0.6$, $t = 9$, DW $= 0.4$.
>
> **Reading:** $R^2 > DW$ and DW is far below 2 — the [[#^thm-r2-dw|warning sign]] fires. Before interpreting the coefficient as a media effect: (i) check both series for unit roots; (ii) refit in weekly changes (with adstock-transformed spend, see [[Carryover (Adstock) Functional Forms|Adstock]]) and see whether any effect survives; (iii) if both are $I(1)$, test the levels residuals for stationarity — only if they are stationary is there a cointegrating (long-run) relationship to model with an ECM; (iv) in an MMM, give the baseline its own stochastic trend so the media coefficient is not asked to explain the drift (compare the local-level/trend components in [[Bayesian Structural Time-Series Model]] and [[Bayesian Media Mix Modeling - Overview]]; practitioner discussion in [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]). A shared trend is also the classic setting in which a shuffled-row cross-validation looks excellent while a time-ordered backtest does not.

> [!example] Searching many trending drivers ^ex-driver-search
> **Setup:** a "driver analysis" screens 40 candidate weekly series (macro indicators, category search terms, competitor activity) against a trending KPI, keeping those with $|t| > 2$ in levels.
>
> **Reading:** with independent $I(1)$ candidates and $T \approx 100$, each has about a 76% chance of passing (row $T=100$ above), so roughly 30 of 40 pure-noise candidates "pass". Multiple-testing corrections do not help, because each individual test is invalid, not merely multiplied. Screening in differences (or against persistence-matched surrogates) is the minimum fix; see [[Researcher Degrees of Freedom]] and [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] for the general flexibility problem.

## Connections

- **Stationarity and integration:** [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]], [[Single Marketing Time Series]].
- **The constructive answer:** [[Granger 2003 - Cointegration and the Error-Correction Representation]], [[Multivariate Persistence and Cointegration]]; Granger causality and impulse responses in [[Empirical Causal Ordering]] and [[Granger 2003 - Granger Causality and Its Link to Cointegration]].
- **Residual diagnostics:** Durbin-Watson and Ljung-Box statistics in [[Model Testing and Specification]].
- **Cross-sectional analogue:** [[Spurious Association and Confounds]] covers spurious association via a common cause; spurious regression needs no common cause at all — shared persistence suffices.
- **Validation:** shuffled CV is only valid under restrictive conditions for time series ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]); a levels regression on independent random walks violates them maximally. Rolling-origin evaluation: [[Forecast Evaluation and Backtesting]].
- **False discovery more broadly:** [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — a field that routinely ran levels regressions of trending series had a very low positive predictive value, which is what "Many editors had to look again" (p. 363) describes; [[Model Selection and Exploratory Analysis]] notes the same risk for specification search in market response models.
- **Marketing measurement:** stationarity assumptions behind geo-test counterfactuals in [[TBR Design Sensitivity and the Stationarity Assumption]].

## See Also

- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — source map for the lecture
- [[Granger 2003 - Spurious Regression Monte Carlo in Python]] — reproducible code, five experiments
- [[Multivariate Persistence and Cointegration]] — when a levels relationship is real, and how to model it
- [[Model Testing and Specification]] — Durbin-Watson and Ljung-Box residual tests
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — predictive accuracy as the arbiter of a model
