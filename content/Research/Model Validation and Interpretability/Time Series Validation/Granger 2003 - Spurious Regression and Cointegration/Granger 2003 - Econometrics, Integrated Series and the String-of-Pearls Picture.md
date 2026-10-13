---
title: "Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/econometrics
  - topic/cointegration
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]"
source_location: "Granger (2003) Nobel Lecture, Les Prix Nobel 2003, pp. 360-361 (opening paragraphs through the definition of 'integrated' series and the two-chains thought experiment)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Granger 2003 - Spurious Regression and Cointegration"
doc_type: paper
depends_on:
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Granger 2003 - Cointegration and the Error-Correction Representation]]"
  - "[[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]"
  - "[[Granger 2003 - Spurious Regression and Cointegration - Overview]]"
aliases:
  - String of Pearls Time Series Analogy
  - Granger Pearls and Magnets Analogy
  - Integrated vs Stationary Series (Granger 2003)
---

# Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture

> [!summary]
> The opening of Granger's Nobel Lecture (pp. 360-361) sets up the whole argument without a single equation: econometrics exists because economic data are "not standard"; macro and financial **time series** are *smooth* — each value depends on the last — and this smoothness violates the **stationarity** assumed by standard statistics. Such series are **integrated**; their changes or returns are closer to stationary. Two physical pictures carry the intuition: a *string of pearls thrown on a table* (an integrated series), and *two strings of pearls with magnets* (two integrated series held together — cointegration). This note formalises those pictures and the definitions they stand for.

## Overview

Granger frames the lecture for a general audience, so the formal definitions are implicit. The lecture's logic is:

1. Mathematics → Statistics → field-specific "sub-sub-fields" (biometrics, psychometrics, **econometrics**) that arose because applied data were not "standard" (p. 360).
2. The data type studied by Engle and Granger is the **time series** (p. 360), from high-frequency financial data (Engle's domain) to quarterly/annual macro aggregates (p. 361).
3. Many macro series are smooth, with "local trends or with long swings" that are "not regular" (p. 361) — and that smoothness is the statistical problem.

The rest of the lecture (cointegration, error correction, spurious regression, causality) is built on the distinction drawn here between stationary and integrated series. The full formal machinery (ACF, ARIMA, differencing) is in [[Single Marketing Time Series]].

## Main Content

### What econometrics is (p. 360)

The lecture opens by noting that both 2003 economics laureates (Granger and Engle) "would describe themselves as 'Econometricians,'" so Granger starts "by explaining that term." (p. 360)

Granger defines the field by genealogy. Mathematics is "largely concerned with the discovery of relationships between deterministic variables using a rigorous argument" (p. 360); he adds a parenthetical definition: "(A deterministic variable is one whose value is known with certainty.)" (p. 360). Then "by the middle of the last millennium it became clear that some objects were not deterministic, they had to be described with the use of probabilities, so that Mathematics grew a substantial sub-field known as 'Statistics.'" (p. 360) Statistics later turned to data analysis and developed methods "for data having what may be called 'standard properties'" (p. 360). Where data were "found to be not standard", special sub-sub-fields were needed: "Biology produced Biometrics, Psychology gave us Psychometrics, and Economics produced Econometrics." (p. 360)

His running example of a time series is the monthly unemployment rate, gathered by a government agency with "a new number" announced each month: "String these value together in a simple graph and you get a 'time series.'" (p. 360)

### The string of pearls: an integrated series (p. 360)

**Why the lecture has no figures.** Granger deliberately replaces a chart with a thought experiment: "Rather than show a diagram, I would rather you use internal visualization (I think that you learn more that way)." (p. 360) The whole lecture contains no diagrams or tables; the pearl pictures stand in for them. The [[Granger 2003 - Spurious Regression Monte Carlo in Python|simulation note]] supplies the plots he chose not to show.

> [!example] Granger's string-of-pearls picture (p. 360) ^ex-pearls
> **Setup (Granger's own words):** "Suppose that you have a loosely strung string of pearls which you throw down, gently, onto a hard table top with the string of pearls roughly stretched out. You will have created a time series with time represented by the distance down the table, the size of the variable as the distance from the bottom edge of the table to a point, and the set of pearls giving the points in the series." (p. 360)
>
> **Key property:** "As the placement of one pearl will impact where the next one lies, because they are linked together, this series will appear to be rather smooth, and will not have big fluctuations in value for one term to the next." (p. 360)
>
> **Formal reading:** the position of pearl $t$ is the position of pearl $t-1$ plus a small bounded displacement — a random walk $x_t = x_{t-1} + u_t$ with small-variance increments. Later (p. 361) Granger states this explicitly: "The string of pearls would be 'integrated' as it is a smooth series."

### Data frequencies (pp. 360-361)

| Frequency | Examples in the lecture | Who studied it |
|---|---|---|
| Within seconds ("high frequency data") | "highly traded stock prices or exchange rates" (p. 361) | Engle (volatility/ARCH) |
| Quarterly | "national income, consumption, and investment" for many countries (p. 361) | Granger (macro) |
| Annual or less | population data; macro data for some countries (p. 361) | — |

Low-frequency macro series are typically "rather smooth, moving with local trends or with long swings, but the swings are not regular" (p. 361).

### Stationary vs integrated (p. 361)

The key sentence of the setup:

> "It is this relative smoothness that makes them unsuitable for analysis with standard statistical procedures, which assumes data to have a property know as 'stationarity.'" (Granger 2003, p. 361; "know" [sic])

Granger continues: many series in finance and macroeconomics "do not have this property and can be called 'integrated' or, sometimes incorrectly, 'non-stationary.' However, when expressed in terms of changes or rates of returns, these derived series appear closer to being stationary." (p. 361)

The lecture does not write the definitions down; the standard ones it relies on are:

> [!definition] Weak (covariance) stationarity ^def-stationarity-granger
> A process $\{x_t\}$ is (weakly) **stationary** if $\mathbb{E}[x_t] = \mu$ for all $t$, $\operatorname{Var}(x_t) = \sigma^2 < \infty$ for all $t$, and $\operatorname{Cov}(x_t, x_{t-k}) = \gamma_k$ depends only on the lag $k$, not on $t$. (Standard definition; see [[Single Marketing Time Series#^def-stationarity|stationarity in Single Marketing Time Series]].)

> [!definition] Integrated of order $d$, $I(d)$ ^def-integrated
> A series $x_t$ is **integrated of order $d$**, written $x_t \sim I(d)$, if it must be differenced $d$ times to obtain a stationary, invertible ARMA process: $\Delta^d x_t = (1-L)^d x_t \sim I(0)$, with $L$ the lag operator ($L x_t = x_{t-1}$) and $\Delta = 1 - L$. A stationary series is $I(0)$; a random walk $x_t = x_{t-1} + u_t$ with $u_t$ i.i.d. $(0,\sigma^2)$ is $I(1)$, and its variance $\operatorname{Var}(x_t \mid x_0) = t\sigma^2$ grows without bound.
>
> **Granger's terminological point (p. 361):** "integrated" is the precise word; Granger says such series are called, "sometimes incorrectly, 'non-stationary'" (p. 361). The lecture does not say why; the standard reason (this note's gloss) is that non-stationarity covers many other departures (deterministic trends, breaks, changing variance) that differencing does not cure. An $I(1)$ series is the specific non-stationarity removed by taking "changes or rates of returns" (p. 361) — for a log-level series, the first difference is the growth rate.

Earlier single-series methods: "Methods to analyze a single integrated series had been proposed previously by Box and Jenkins (1970) and others, but the joint analysis of pairs, or more, of such series was missing an important feature." (p. 361) — the Box-Jenkins ARIMA framework ([[Single Marketing Time Series#^def-arima|ARIMA]]) handles one integrated series by differencing; what was missing was how two of them can be jointly related. That missing feature is cointegration, developed in [[Granger 2003 - Cointegration and the Error-Correction Representation]].

### Two chains with and without magnets (p. 361)

> [!example] Two independent chains vs magnetised chains (p. 361) ^ex-magnets
> **Independent chains:** "Suppose that we had two similar chains of pearls and we threw each on the table separately, but for ease of visualization, they do not cross one another. Each would represent smooth series but would follow different shapes and have no relationship. The distances between the two sets of pearls would also give a smooth series if you plotted it." (p. 361)
>
> *Formal reading:* $x_t, y_t$ independent $I(1)$; then $y_t - x_t$ is also $I(1)$ (a sum of independent random walks is a random walk). Any linear combination wanders — **no cointegration**. This is exactly the setting in which a levels regression of $y$ on $x$ is **spurious** ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]).
>
> **Magnetised chains:** "However, if the pearls were set in small but strong magnets, it is possible that there would be an attraction between the two chains, and that they would have similar, but not identical, smooth shapes. In that case, the distance between the two sets of pearls would give a stationary series and this would give an example of cointegration." (p. 361)
>
> *Formal reading:* $x_t, y_t \sim I(1)$ but $y_t - \beta x_t \sim I(0)$ — the magnets are the error-correcting force pulling the gap back toward its mean.

## Examples

> [!example] Marketing reading: which series are pearls? ^ex-marketing-pearls
> **Setup:** weekly marketing data for one brand, 52-156 rows: unit sales, brand search volume, cumulative distribution (store count), TV GRPs, paid-search spend, a price index.
>
> **Classification by the pearls test:** series whose next value is "tied" to the last — sales levels of a growing brand, search volume, distribution, a price index with permanent changes — behave like strings of pearls and are plausibly $I(1)$; flighted media (on/off bursts of GRPs) and promotions jump around a fixed mean and are plausibly $I(0)$. Their **changes** (week-over-week growth) are the "derived series" Granger says are "closer to being stationary" (p. 361).
>
> **Why it matters:** an $I(1)$ KPI regressed on $I(0)$ media, or two independent $I(1)$ series regressed on one another, breaks the standard-statistics assumption Granger flags; see the decision table in [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] and unit-root tooling in [[Single Marketing Time Series]].

## Connections

- The stationarity / ARIMA / differencing toolkit in marketing notation: [[Single Marketing Time Series]], [[Design of Dynamic Response Models|Marketing Time Series Models]].
- The consequence of ignoring integration: [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]].
- The consequence of exploiting it: [[Granger 2003 - Cointegration and the Error-Correction Representation]], [[Multivariate Persistence and Cointegration]].
- Stationarity as an untested assumption in geo-experiment counterfactuals: [[TBR Design Sensitivity and the Stationarity Assumption]].
- Trend components that absorb an $I(1)$ baseline in structural models: [[Local Linear Trend and Seasonality]], [[Bayesian Structural Time-Series Model]].

## See Also
- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — source map for the whole lecture
- [[Granger 2003 - Cointegration and the Error-Correction Representation]] — the magnetised-chains idea made formal
- [[Single Marketing Time Series]] — formal stationarity, ACF and ARIMA definitions
