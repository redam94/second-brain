---
title: "Granger 2003 - Spurious Regression and Cointegration - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/econometrics
  - topic/cointegration
  - type/overview
  - doc/paper
source: "[[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]"
source_location: "Granger, C.W.J. (2003) 'Time Series Analysis, Cointegration, and Applications', Nobel Lecture, December 8, 2003, Les Prix Nobel 2003, pp. 360-366 (7 PDF pages; no numbered sections). Companion citation-only sources: Yule (1926) JRSS 89(1):1-63; Granger & Newbold (1974) J. Econometrics 2(2):111-120; Phillips (1986) J. Econometrics 33(3):311-340; Engle & Granger (1987) Econometrica 55(2):251-276."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Granger 2003 - Spurious Regression and Cointegration"
doc_type: paper
depends_on:
  - "[[Single Marketing Time Series]]"
  - "[[Multivariate Persistence and Cointegration]]"
used_by:
  - "[[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]"
  - "[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]"
aliases:
  - Granger Nobel Lecture 2003
  - Time Series Analysis, Cointegration, and Applications
  - Granger (2003) Nobel Lecture
---

# Granger 2003 - Spurious Regression and Cointegration - Overview

> [!summary]
> **Source:** Clive Granger's Nobel Lecture (8 December 2003), a non-technical account of why economic time series need special methods. **Research question:** how should one model *groups* of smooth, integrated series without being fooled by them? **Contribution (as recounted):** the concept of **cointegration** — a linear combination of integrated series that is stationary — and its consequences (common factor, **error-correction representation**, constant-ratio long-run forecasts, implied **Granger causality**), which explained and resolved the **spurious regression** problem that Granger and Newbold (1974) had demonstrated by simulation. **Key findings for model validation:** standard regression inference is invalid for independent integrated series (it "would very often appear to 'find' a relationship whereas in fact there was none", p. 363); many published macro relationships had to be re-examined; the cure is differencing or an error-correction model; and models should be judged by their usefulness to decision makers through forecast evaluation with uncertainty bounds. This vault set adds the citation-only background (Yule 1926, Granger-Newbold 1974, Phillips 1986, Engle-Granger 1987) and a reproducible Python Monte Carlo.

## Overview

The lecture (7 pages, no section headings) moves from what econometrics is, through integrated series and cointegration, to spurious regression, the Hendry anecdote, a personal detour, the purpose of economics, forecasting practice, aggregation, Granger causality and closing remarks. Because it is a lecture, the formal content is implicit; the notes below state it formally, clearly separating Granger's words (quoted, with page) from standard results (labelled as from the literature).

Why it belongs in a model-validation collection: spurious regression is the canonical example of a modelling procedure that produces confident, publishable, **wrong** findings purely because an assumption (stationarity) fails, with error rates that worsen as data grow. Every analysis of trending marketing data — media-mix models of drifting KPIs, driver analyses on macro series, geo-test counterfactuals assuming stationarity — inherits the risk.

## Main Content

### Note Set

| Note | Covers |
|---|---|
| [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] | Motivation/setup: econometrics, time series, data frequencies, stationarity vs integration $I(d)$, pearls and magnets pictures |
| [[Granger 2003 - Cointegration and the Error-Correction Representation]] | Formal cointegration, Granger representation theorem (5 consequences), ECM, Engle-Granger two-step algorithm, history (Sargan, Johansen, Hendry, Popper) |
| [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | Spurious regression definition; Yule (1926) design and results table, Granger-Newbold (1974) Tables 1-2 in full, Phillips (1986) results; $R^2 > DW$ rule; decision table; diagnostic algorithm |
| [[Granger 2003 - Spurious Regression Monte Carlo in Python]] | Reproducible script; 5 experiments with result tables (size distortion, multiple regressors, Yule shapes, Engle-Granger test, ECM recovery); plotting script with three figures |
| [[Granger 2003 - Granger Causality and Its Link to Cointegration]] | Two-component definition, forecasting consequence, reception, cointegration ⇒ causality theorem, nonlinear extension |
| [[Granger 2003 - Forecasting, Decision Science and Aggregation]] | Discussion: model purpose, decision-maker criterion, forecastability, forecasting stages, panels, Amazon scenario model, aggregation, closing numbers, reference list |

### Key Findings

1. **Integrated ≠ standard data.** Smooth macro series violate the stationarity assumed by standard procedures; their changes/returns are closer to stationary (p. 361). → [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture#^def-integrated|$I(d)$ definition]]
2. **Cointegration is a surprise, but common in macro.** "Most pairs of integrated series will not have the property" (p. 361). → [[Granger 2003 - Cointegration and the Error-Correction Representation#^def-cointegration-formal|definition]]
3. **Cointegration ⇔ error correction.** Cointegrated series can be represented by an ECM, and data generated by an ECM are cointegrated (pp. 361-362). → [[Granger 2003 - Cointegration and the Error-Correction Representation#^thm-granger-representation|representation theorem]]
4. **Spurious regression.** Independent integrated series regressed on each other "very often" show a relationship; editors re-examined accepted papers; the ECM resolves many of the difficulties (p. 363). → [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^def-spurious-regression|definition]], [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-phillips|Phillips asymptotics]], [[Granger 2003 - Spurious Regression Monte Carlo in Python#^ex-sim-exp1|simulation]]
5. **Cointegration ⇒ Granger causality** in at least one direction (p. 366). → [[Granger 2003 - Granger Causality and Its Link to Cointegration#^thm-coint-causality|theorem]]
6. **Decision value is the yardstick** and forecasting needs central forecast, uncertainty bounds and evaluation of past errors (p. 364). → [[Granger 2003 - Forecasting, Decision Science and Aggregation#^alg-forecast-stages|forecast stages]]

### Source Map

The lecture has no numbered sections, theorems, tables or figures; the map is by page and paragraph topic. Every item is captured in the note listed.

| Pages | Content in the lecture | Note |
|---|---|---|
| p. 360 | Opening: both 2003 laureates are "Econometricians"; what the term means; deterministic variable defined; probabilities by the middle of the last millennium → Statistics → Biometrics/Psychometrics/Econometrics | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] |
| p. 360 | Time series defined via monthly unemployment | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] |
| p. 360 | "Internal visualization" instead of a diagram (why the lecture has no figures); string-of-pearls thought experiment (smooth series) | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture#^ex-pearls]] |
| pp. 360-361 | Data frequencies: high-frequency financial (Engle) vs quarterly/annual macro | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] |
| p. 361 | Smoothness vs stationarity; "integrated" vs "non-stationary"; changes/returns closer to stationary | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture#^def-integrated]] |
| p. 361 | Box-Jenkins (1970) for single integrated series; missing joint feature | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] |
| p. 361 | Cointegration defined (difference of integrated series stationary; "properly scaled") | [[Granger 2003 - Cointegration and the Error-Correction Representation#^def-cointegration-formal]] |
| p. 361 | Two chains thrown separately vs magnetised chains | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture#^ex-magnets]] |
| p. 361 | Linear combination stationary; "a surprise when it occurs"; common in macro | [[Granger 2003 - Cointegration and the Error-Correction Representation]] |
| pp. 361-362 | Consequences: common hidden factor; ECM representation; ECM data are cointegrated | [[Granger 2003 - Cointegration and the Error-Correction Representation#^thm-granger-representation]] |
| p. 362 | ECM invented by Sargan (stochastic growth equations) | [[Granger 2003 - Cointegration and the Error-Correction Representation]] |
| p. 362 | Scandinavian collaborators: Johansen, Juselius, Hylleberg (seasonal), Jansen (Bank of Norway model), Teräsvirta (Finland, now Stockholm; nonlinear); all present as Granger's guests | [[Granger 2003 - Cointegration and the Error-Correction Representation]] |
| p. 362 | "The modern macro economy is large, diffuse, and difficult to define, measure, and control"; purpose of macro models; theorists vs econometricians; "All models simply assume that the model is correct" | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 362 | ECMs as popular macro models; users named as central banks, the Federal Reserve Bank and various model builders (policy simulation) | [[Granger 2003 - Cointegration and the Error-Correction Representation]] |
| p. 362 | Constant-ratio long-run forecasts; equilibrium caveat | [[Granger 2003 - Cointegration and the Error-Correction Representation#^thm-granger-representation]] (item 4) |
| p. 362 | Multivariate extension; the name "cointegration"; "quickly picked up", "numerous citations and applications"; "explain and remove a variety of difficulties"; "missing piece" | [[Granger 2003 - Cointegration and the Error-Correction Representation]] |
| p. 363 | Spurious regressions: Granger-Newbold 1974 simulation; re-evaluation of macro work; editors; ECM remedy | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] |
| p. 363 | Discovery story: Hendry's claim, failed disproof, generalisation, proof of ECM representation | [[Granger 2003 - Cointegration and the Error-Correction Representation]] |
| p. 363 | "I do not always agree with" Popper; *The Logic of Scientific Discovery* (via Hacohen 2000) on discovery; probabilistic description of economics; 1934 coincidences (Popper, Keynes); 1934 vs 1959 reference-list date | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 363 | Lecture written at University of Canterbury, NZ (Popper connection) | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] (aside, no technical content) |
| pp. 363-364 | Personal detour: AEA Distinguished Fellow; chair of two economics departments; one-third-year of formal training; economics learned by osmosis over ~40 years; "about me, or ... the field?"; not the first laureate without formal training; thin core, theory concepts "not necessarily realistic"; hot-bed of ideas | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 364 | Economics as decision science; "how will a decision maker find this result useful?" | [[Granger 2003 - Forecasting, Decision Science and Aggregation#^def-decision-criterion]] |
| p. 364 | Main uses of cointegration models; forecastability ranking | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 364 | Forecasting stages: central forecast, uncertainty bounds, evaluation, learning from errors, combination | [[Granger 2003 - Forecasting, Decision Science and Aggregation#^alg-forecast-stages]] |
| p. 364 | Panels of series (Scandinavian inflation) | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| pp. 364-365 | Amazon deforestation scenario model: forest larger than the EU, cut rapidly; Granger one of five authors; land cleared for food; contrast with European ex-forest land, fallow within five years | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 365 | Variety of data analysed (supermarket pricing experiments, commodities, electricity, sunspots...) | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 365 | Aggregation over ~100 million households and limit theorems | [[Granger 2003 - Forecasting, Decision Science and Aggregation#^thm-aggregation]] |
| p. 365 | Causality: Princeton cross-spectrum, Tukey, Morgenstern, Gabor, Wiener; two-component definition; forecasting consequence | [[Granger 2003 - Granger Causality and Its Link to Cointegration#^def-granger-causality-2003]] |
| p. 366 | "Granger causation"; pragmatic definition; ridiculous papers | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] |
| p. 366 | Cointegration implies causality | [[Granger 2003 - Granger Causality and Its Link to Cointegration#^thm-coint-causality]] |
| p. 366 | Nonlinear and conditional-distribution generalisations; causality in generalised ECM | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] |
| p. 366 | Usefulness of empirical causality studies; money-prices debate | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] |
| p. 366 | Econometricians among laureates (8; 15%; 44% this millennium); 21 laureates met (Gabor 1970 [sic; 1971 on p. 365], Noel Baker 1959, Urey 1934, 18 economists); praise of laureates | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| p. 366 | Reference list (4 items); discrepancies Anderson/Andersen and Popper 1934/1959 | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] |
| citation only | Yule (1926) nonsense correlations: marriages/mortality 0.9512 (1866-1911); harmonic warm-up; random vs conjunct series (random or conjunct differences); card-drawn random numbers; 11-term moving-sum construction; A/B/C 10-term sampling, 600 correlations per type; independent re-run (Series X1); means, SDs and shapes (Tables VIII, IX, XI; Figs. 16-18) | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] |
| citation only | Granger & Newbold (1974): motivation (high $R^2$, low $d$ in published work); Table 1 distribution of $S$ (mean 4.5, factor 5.6, critical value 11.2; Malinvaud comparison); Table 2 in full (random walks and ARIMA(0,1,1), levels and changes, m=1-5: % rejected, average $d$, corrected $R^2$, % $R^2>0.7$); Section 5 conclusions (mis-specification, levels and changes, pre-whitening, Sheppard example, referee point); $R^2 > DW$ as later folk rule | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^ex-gn-table2]], [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^ex-gn-vs-exp2]], [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-r2-dw]] |
| citation only | Phillips (1986) asymptotic theory | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-phillips]] |
| citation only | Engle & Granger (1987) representation theorem and two-step test | [[Granger 2003 - Cointegration and the Error-Correction Representation#^alg-engle-granger]] |
| added | Reproducible simulation (Experiments 1-5) and figures: sample spurious pair, Yule's three histograms, $\sqrt{T}$ growth of the spurious $t$ | [[Granger 2003 - Spurious Regression Monte Carlo in Python]], [[Granger 2003 - Spurious Regression Monte Carlo in Python#^fig-sim-pair]], [[Granger 2003 - Spurious Regression Monte Carlo in Python#^fig-sim-yule]], [[Granger 2003 - Spurious Regression Monte Carlo in Python#^fig-sim-tgrowth]] |
| added | Granger-causality testing under cointegration: VECM joint test, Toda-Yamamoto lag-augmented VAR | [[Granger 2003 - Granger Causality and Its Link to Cointegration#^thm-coint-causality]] |

## Examples

> [!example] Using this note set to vet a trending-series regression ^ex-overview-workflow
> **Setup:** a weekly KPI and a media series both drift upward over about 100 weeks; a levels regression gives $t \approx 5$ and $R^2 = 0.6$ with DW $= 0.4$.
>
> **Route through the notes:** (1) classify each series as $I(0)$ or $I(1)$ ([[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture#^def-integrated|integration]]); (2) the $R^2 > DW$ flag fires ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-r2-dw|rule of thumb]]); (3) at $T = 100$ independent random walks give a median $|t|$ of about 4.6 ([[Granger 2003 - Spurious Regression Monte Carlo in Python#^ex-sim-exp1|Experiment 1]]), so $t \approx 5$ is no evidence by itself; (4) run the [[Granger 2003 - Cointegration and the Error-Correction Representation#^alg-engle-granger|Engle-Granger test]] and fit an ECM only if the residuals are stationary; (5) judge the final model by Granger's decision-maker criterion and by evaluating its past forecasts ([[Granger 2003 - Forecasting, Decision Science and Aggregation#^alg-forecast-stages|forecast stages]]).

## Connections

- Existing vault time-series notes this set builds on: [[Single Marketing Time Series]], [[Multivariate Persistence and Cointegration]], [[Empirical Causal Ordering]], [[Model Testing and Specification]], [[Design of Dynamic Response Models|Marketing Time Series Models]].
- Same-cluster sources: [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] (when CV is valid for time series), [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] (simulation-study design used for the Monte Carlo).
- False discovery: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]].
- Marketing forecasting and long-run effects: [[Optimal Marketing Decisions and Forecasting]] (VAR/ECM for long horizons), [[Carryover Effects and Distributed Lags]] (hysteresis, long-run multipliers), [[Price and Distribution Effects]] (persistent distribution effects).
- Marketing measurement: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Bayesian Media Mix Modeling - Overview]], [[TBR Design Sensitivity and the Stationarity Assumption]].

## See Also
- [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] — the core validation lesson
- [[Granger 2003 - Spurious Regression Monte Carlo in Python]] — run it yourself
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — predictive validation as the arbiter
- [[Out-of-Sample Validation for Time-Series Models]] — shuffled CV is optimistic for random-walk regressors
