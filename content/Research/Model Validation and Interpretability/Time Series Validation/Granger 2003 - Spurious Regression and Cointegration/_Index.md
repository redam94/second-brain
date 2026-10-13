---
title: "Index: Granger 2003 - Spurious Regression and Cointegration"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/cointegration
parent: "[[../_Index|Time Series Validation]]"
date_updated: 2026-10-13
concept_count: 7
---

# Granger 2003 - Spurious Regression and Cointegration

> [!abstract] Routing Summary
> This folder covers Clive Granger's 2003 Nobel Lecture on time series, cointegration and applications, with citation-only background from Yule (1926), Granger & Newbold (1974), Phillips (1986) and Engle & Granger (1987), plus a reproducible Python Monte Carlo. Contains 7 notes spanning integration/stationarity, cointegration and error correction, spurious regression, Granger causality, and forecasting/decision-science methodology.
> - Need the source map or key findings? → [[Granger 2003 - Spurious Regression and Cointegration - Overview]]
> - Need what "integrated" / $I(1)$ means, or the pearls analogy? → [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]]
> - Need why regressing trending series gives fake significance, the $R^2>DW$ rule, Yule/Granger-Newbold/Phillips? → [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]
> - Need code to demonstrate spurious regression, the Engle-Granger test or an ECM? → [[Granger 2003 - Spurious Regression Monte Carlo in Python]]
> - Need cointegration, the error-correction model, the Granger representation theorem? → [[Granger 2003 - Cointegration and the Error-Correction Representation]]
> - Need Granger causality, or why cointegration implies it? → [[Granger 2003 - Granger Causality and Its Link to Cointegration]]
> - Need forecasting stages, the decision-maker criterion, aggregation? → [[Granger 2003 - Forecasting, Decision Science and Aggregation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Integrated series $I(d)$ | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] | definition | [[Single Marketing Time Series]] | $\Delta^d x_t$ stationary; changes/returns closer to stationary (p. 361) |
| Pearls and magnets analogies | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] | example | — | smooth series = linked pearls; cointegration = magnetised chains |
| Cointegration | [[Granger 2003 - Cointegration and the Error-Correction Representation]] | definition | $I(d)$ | $\boldsymbol\beta'\mathbf{x}_t \sim I(0)$; "a surprise when it occurs" |
| Granger representation theorem | [[Granger 2003 - Cointegration and the Error-Correction Representation]] | theorem | cointegration | cointegration ⇔ ECM; common factor; constant-ratio forecasts |
| Engle-Granger two-step | [[Granger 2003 - Cointegration and the Error-Correction Representation]] | algorithm | cointegration | residual ADF test with EG critical values, then ECM |
| Spurious regression | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | definition | $I(1)$ | independent random walks look related |
| Phillips asymptotics | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | theorem | spurious regression | $t = O_p(\sqrt T)$, $R^2$ non-degenerate, DW $\to 0$ |
| $R^2 > DW$ rule | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | heuristic | DW statistic | flag for spurious levels regressions |
| Spurious-regression Monte Carlo | [[Granger 2003 - Spurious Regression Monte Carlo in Python]] | example | all above | 67-90% false rejections in levels, ~5% in differences |
| Granger causality | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] | definition | VAR | precedence + unique information |
| Toda-Yamamoto causality test | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] | algorithm | VAR, $I(d)$ | levels VAR with $p+d_{\max}$ lags; Wald test on first $p$ is $\chi^2_p$ |
| Yule's conjunct series | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | definition | — | positive serial correlation; with random or conjunct differences |
| Cointegration ⇒ causality | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] | theorem | ECM | at least one adjustment coefficient nonzero |
| Decision-maker criterion; forecasting stages | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] | concept | — | evaluate analyses by decision usefulness; evaluate past forecasts |
| Aggregation and limit theorems | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] | concept | — | aggregates over ~$10^8$ units should show special properties |

## Notes

- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — CONTAINS: research question, contribution, 6 key findings, note-set table, full page-by-page Source Map including citation-only sources
- [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] — CONTAINS: opening framing (both laureates econometricians; deterministic variable; probability and Statistics); definition of econometrics by genealogy (p. 360); "internal visualization" instead of figures; string-of-pearls example; data-frequency table; stationarity and $I(d)$ definitions; Box-Jenkins remark; two-chains/magnets example; marketing classification example
- [[Granger 2003 - Cointegration and the Error-Correction Representation]] — CONTAINS: formal cointegration definition ($CI(d,b)$, cointegrating rank); 5-part consequences theorem (common factor, ECM, converse, constant-ratio forecasts, causality) with proof sketch; ECM definition with half-life; Sargan/Johansen/Hylleberg/Teräsvirta/Hendry history; users (central banks, Federal Reserve Bank, model builders) and reception; Engle-Granger algorithm (asymptotic -3.34 vs finite-T -3.37 critical value); simulated ECM example; brand-share example
- [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] — CONTAINS: spurious regression definition; Granger's p. 363 account; Yule (1926) terms (random vs conjunct series with random or conjunct differences), card-drawn design, 11-term construction, 600-correlation sampling scheme, Series X1 re-run and results table; Granger-Newbold (1974) motivation, Table 1 ($S$ distribution, factor 5.6), full Table 2 (random walk and ARIMA(0,1,1), levels and changes, % $R^2>0.7$), Section 5 recommendations and Sheppard example, G&N-vs-vault comparison table; Phillips (1986) results (all citation only); $R^2 > DW$ rule; Phillips theorem with proof idea; levels/differences decision table; 6-step screening algorithm; simulation summary; KPI-vs-media and driver-search examples
- [[Granger 2003 - Spurious Regression Monte Carlo in Python]] — CONTAINS: ADEMP table; full runnable script; Experiments 1-5 result tables (levels vs differences; $k$ regressors; Yule correlation shapes; Engle-Granger test; ECM recovery); plotting script and three figures (sample spurious pair, Yule histograms, $\sqrt{T}$ growth of $t$); persistence-matched null procedure
- [[Granger 2003 - Granger Causality and Its Link to Cointegration]] — CONTAINS: origin story (Tukey, Morgenstern, Gabor, Wiener); two-component definition and formal/VAR versions; forecasting-consequence theorem; reception quotes; cointegration ⇒ causality theorem with proof sketch and differenced-VAR corollary; VECM joint test and Toda-Yamamoto lag-augmented procedure; nonlinear extension; marketing VAR example
- [[Granger 2003 - Forecasting, Decision Science and Aggregation]] — CONTAINS: models-assume-themselves-correct remark (p. 362); Popper ("I do not always agree", *The Logic of Scientific Discovery*) and probability; personal detour (AEA Fellow, two department chairs, economics by osmosis, thin theoretical core); decision-maker criterion; uses and forecastability table; 5-stage forecasting algorithm; panels; Amazon scenario model (scale, five authors, fallow land vs European ex-forest land); data variety; aggregation conjecture with formal reading; laureate statistics and table of laureates met (Gabor 1970/1971 discrepancy); reference list table with Anderson/Andersen and Popper 1934/1959 discrepancies; MMM decision example

## Sources
- Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture) — Granger (2003) Nobel Lecture, Les Prix Nobel 2003, pp. 360-366
- Citation only (not in raw/): Yule (1926) JRSS 89(1); Granger & Newbold (1974) J. Econometrics 2(2); Phillips (1986) J. Econometrics 33(3); Engle & Granger (1987) Econometrica 55(2)

## See Also
- [[Multivariate Persistence and Cointegration]] — marketing-notation cointegration, Johansen test, persistence modelling
- [[Single Marketing Time Series]] — stationarity, ARIMA, unit roots
- [[Empirical Causal Ordering]] — Granger causality and impulse responses in marketing VARs
- [[Optimal Marketing Decisions and Forecasting]] — VAR/ECM forecasting for long horizons under cointegration
- [[Carryover Effects and Distributed Lags]] — hysteresis and long-run effects
- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] — sibling source on time-series cross-validation
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — simulation-study design
