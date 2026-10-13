---
title: "Granger 2003 - Forecasting, Decision Science and Aggregation"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/econometrics
  - topic/forecasting
  - type/concept
  - doc/paper
source: "[[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]"
source_location: "Granger (2003) Nobel Lecture: macro-economy framing, model purpose and extrapolation p. 362; Popper and probabilistic description p. 363; personal detour (AEA Distinguished Fellow, two department chairs, economics by osmosis) pp. 363-364; training in economics, economics as decision science, uses of cointegration models, forecastability, forecasting stages and evaluation, panels pp. 363-364; Amazon deforestation model pp. 364-365; variety of data and aggregation p. 365; econometricians among laureates and the 21 laureates met (Gabor prize-year discrepancy) p. 366; references and their discrepancies p. 366."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Granger 2003 - Spurious Regression and Cointegration"
doc_type: paper
depends_on:
  - "[[Granger 2003 - Cointegration and the Error-Correction Representation]]"
used_by:
  - "[[Granger 2003 - Spurious Regression and Cointegration - Overview]]"
aliases:
  - Economics as a Decision Science (Granger)
  - Granger Forecasting Process Stages
  - Granger on Aggregation and Limit Theorems
---

# Granger 2003 - Forecasting, Decision Science and Aggregation

> [!summary]
> The second half of Granger's lecture is a methodological discussion rather than new results. Its claims, each relevant to how models should be validated: (1) **the purpose of economics is to help decision makers make better decisions**, which gives the yardstick for any analysis — "how will a decision maker find this result useful?" (p. 364); (2) the main use of cointegration models has been **short- and medium-term forecasting** of integrated macro variables; growth rates are "somewhat forecastable", inflation and speculative returns much less so (p. 364); (3) forecasting has **stages** — central forecast, uncertainty bounds, and the gathering and **evaluation of past forecasts** so systematic error patterns can be learned from, plus **forecast combination** (p. 364); (4) "All models simply assume that the model is correct and extrapolate from there" (p. 362); (5) huge **aggregates** (about 100 million US households) should show special statistical properties by limit theorems, and their absence would itself be informative (p. 365).

## Overview

After the cointegration and spurious-regression material, Granger takes "a personal detour" (p. 363) and then asks what the new methods are *for*. The answers form a compact philosophy of applied time-series modelling — purpose-first, forecast-evaluated, uncertainty-aware — that lines up closely with modern model-validation practice.

## Main Content

### Models assume themselves correct (p. 362)

The paragraph opens with Granger's framing of the object being modelled: "The modern macro economy is large, diffuse, and difficult to define, measure, and control." (p. 362, paragraph 3) Economists therefore build models that "approximate it" and "have similar major properties" (p. 362), so that simple experiments can be run on the model rather than on the economy.

> "All models simply assume that the model is correct and extrapolate from there, but hopefully with an indication of uncertainty around future values." (Granger 2003, p. 362)

Context: economic theorists build models "using constraints suggested by the theory, whereas the econometrician builds empirical models using what is hopefully relevant data and which captures the main properties of the economy in the past" (p. 362). Both are approximations used to "conduct simple experiments on them, such as determining the impacts of alternative policies or the long-run implications of some new institution" (p. 362) — i.e. scenario simulation. The validation implication: an extrapolation is only as good as the assumption of correct specification, so models need external checks (forecast evaluation, uncertainty bounds) rather than internal fit.

### Probability as the right description; discovery as methodology (p. 363)

Granger's position in the Popper-Heisenberg-era debate: "it is clear that we can best describe many of the movements of economic variables, and the resulting data, using probabilistic concepts." (p. 363) He opens the aside with a qualifier, "I do not always agree with the philosopher Karl Popper," and then notes that, "in his book 'The Logic of Scientific Discovery,'" and according to Hacohen (2000, p. 244), Popper believed the "discovery was not a matter of logic" but rather the application of methodology, which "fits the discovery of cointegration" (p. 363) — the Hendry story in [[Granger 2003 - Cointegration and the Error-Correction Representation]]. Asides on the same page: Popper's book "appeared almost exactly at the time of my birth, in September 1934" (p. 363), when Popper was debating Heisenberg on probability in physics — a debate Granger says still echoes in economics; 1934 was also when Keynes finished the first draft of the *General Theory*; and the lecture was written at the University of Canterbury, New Zealand, where Popper had also spent some years after World War II (p. 363).

### Personal detour: an economist by osmosis (pp. 363-364)

Granger introduces this passage as "a personal detour" taken "Before considering the usefulness of the new methods of analysis" (p. 363). Its content, in order:

- **The year:** the Prize "climaxed a year which started with me being named a Distinguished Fellow of the American Economic Association" (p. 363).
- **Career vs training:** he had "been Chair of two economics departments, yet I have received very little formal training in economics" (p. 363). The formal training was one third of his first undergraduate year at the University of Nottingham, "with introductions to micro and in national accounts, and that was it" (p. 363).
- **Osmosis:** everything else "has come from living amongst economists for about forty years, by osmosis, attending seminars, having discussions with them, and general reading" (p. 363).
- **The question he poses:** "does this say something about me, or something about the field of economics?" (p. 363). He adds that he is "not the first Nobel Prize winner in economics to have little formal training in economics" (pp. 363-364).
- **His tentative answer:** he wonders whether "economics has less basic core material than is necessary for fields such as mathematics, physics, or chemistry, say" (p. 364). Economics has "a multitude of different aspects, applications, and viewpoints" that each form their own basis in practice. "Economic theory does seem to maintain common concepts and features but these may be quite simplistic and are not necessarily realistic." (p. 364)
- **Consequence:** partly because it is "not tied down by too many central concepts", and certainly because it covers so many topics, economics is "a hot-bed of new ideas, concepts, approaches, and models", and cheap computing "has just increased this activity even more" (p. 364).

**Validation reading:** a field whose shared theoretical core is thin, and possibly "not necessarily realistic", cannot lean on theory alone to restrict model specification. External checks such as forecast evaluation (below) carry more of the weight.

### Economics as a decision science (p. 364)

> [!definition] The decision-maker criterion (Granger 2003, p. 364) ^def-decision-criterion
> Granger endorses a statement (author forgotten) that "economics is a decision science, concerned with decision makers, such as consumers, employers, investors, and policy makers, in various forms of government, institutions, and corporations", from which "it follows that the 'purpose of economics is to help decision makers make better decisions.'" He calls this useful "because it gives us a foundation with which we can compare and evaluate specific pieces of economic analysis. We can ask 'how will a decision maker find this result useful?'" (p. 364)
>
> **Validation reading:** the evaluation criterion for a model is decision value, not fit or statistical significance — the same stance as loss-function-based forecast evaluation and as the decision-focused framing of marketing-mix models.

### What cointegration models are used for (p. 364)

> "the main uses for the economic techniques that I helped develop, such as cointegration, was to build statistical models linking major economic variables that both fit the available data better and agree with the preconceptions of the model constructors about what the construction should look like." (p. 364)

Note the two criteria — fit **and** agreement with the builders' preconceptions — which is honest about the role of priors and also a warning (preconceptions can steer specification search; see [[Researcher Degrees of Freedom]]).

Forecastability ranking (p. 364):

| Target | Forecastability per Granger |
|---|---|
| Levels of consumption, income, investment, unemployment ("all of which are integrated series") | main forecasting use of the models, short and medium term |
| Their growth rates | "somewhat forecastable" |
| Inflation rates | "Much less forecastable" |
| Returns in speculative markets (stocks, bonds, exchange rates) | "Much less forecastable" |

### The forecasting process (p. 364)

> [!algorithm] Granger's stages of forecasting (p. 364) ^alg-forecast-stages
> 1. **Central forecast** — "getting the central forecast".
> 2. **Uncertainty bounds** — "then uncertainty bounds around it to give some idea of the risks involved in using this forecast."
> 3. **Gather and evaluate past forecasts** — "Finally, previous forecasts have to be gathered and evaluated."
> 4. **Learn from error patterns** — "Hopefully any tendencies, trends, or swings in the errors can be detected so that one can learn and produce better forecasts in the future."
> 5. **Combine** — "The process of forecast evaluation, plus the use of combinations of forecasts from different series, is an on-going research project at the University of California, San Diego."
>
> (All quotes p. 364.) Modern equivalents: probabilistic forecasts and calibration checks ([[Probabilistic Forecasting - Overview]], [[Visualizing High-Dimensional Inference|Checking a forecast distribution]]), rolling-origin backtesting and error diagnostics ([[Forecast Evaluation and Backtesting]]).

**Panels (p. 364):** forecasts also come "from panels of data, which can be thought of as a group of series of a similar nature measured from different sources", e.g. "monthly inflation rates from each of the Scandinavian countries." "Once one is clear what is the purpose of the analysis, suitable techniques can be formulated." (p. 364) — the precursor of pooled / global forecasting across related series ([[Local vs Global Forecasting Models]]).

### Scenario forecasting: the Amazon (pp. 364-365)

The project's purpose was "to study the future of the Amazon rainforest in Brazil" (p. 364). Granger gives the scale and urgency: "This forest covers an area larger than all the countries in the European Union put together, but it is being cut down quite rapidly." (p. 364) He "was one of five authors who produce a report" (pp. 364-365), Andersen, Granger, Reis, Weinhold and Wunder (Cambridge University Press 2003), "which includes a model that could forecast the decline of the forest under various policy scenarios" (p. 365). The forest is cleared not for timber but "to get at the land that the timber stands upon to produce food" (p. 365). The contrast he draws: "unlike European ex-forest land, its useful life span is often rather short, often becoming 'fallow' within five years of being forested" (p. 365). The word "forested" appears this way in the source; the context (land cleared of forest) suggests "deforested" is meant.

It is an example of conditional (policy-scenario) forecasting with a purpose defined by decision makers.

### Variety of data (p. 365)

Granger lists his applications: "pricing experiments in real super markets", stock markets, commodity prices "particularly gold and silver prices", interest rates, "electricity demand in small regions, the female labor force participation, river flooding, and even sun spots" (p. 365). "All data present their own unique problems". He also notes that being an outsider to economics "occasionally ... allows one to approach a problem from a different direction than that considered by most economists" (p. 365).

### Aggregation (p. 365)

The motivation is a statistician's angle: "As a statistician I am intrigued by the pure magnitude of some of the major economies, although economists pay little attention to this aspect of the real world." (p. 365)

> [!theorem] Aggregation conjecture (Granger 2003, p. 365; informal) ^thm-aggregation
> "in the United States there are about one hundred million households, so total consumption is the sum of all these household's consumptions. The sum over such a large number of families should have very special statistical properties, given various well-known limit theorems. If these properties are not observed this also has important implications." (p. 365) He judges these and other aggregation topics "worth further study".
>
> **Formal reading:** if $C_t = \sum_{i=1}^{N} c_{it}$ with household components $c_{it} = \lambda_i F_t + e_{it}$ (common factor $F_t$ plus idiosyncratic $e_{it}$, weakly dependent across $i$), then $\operatorname{Var}(\sum_i e_{it}) = O(N)$ while $\operatorname{Var}(F_t\sum_i\lambda_i) = O(N^2)$; for $N \approx 10^8$ the aggregate is essentially the common factor. Observed aggregate behaviour that is *not* dominated by common factors would indicate strong cross-sectional dependence. Granger's own earlier work (Granger 1980, *Journal of Econometrics*; not cited in the lecture) also showed that aggregating many AR(1) components with heterogeneous coefficients can produce long memory in the aggregate.
>
> **Marketing reading:** national sales are a sum over millions of purchase decisions, so national-level models mostly see common drivers (season, macro, national media) and lose individual heterogeneity; aggregation also changes dynamics. See [[Aggregation of Relations]] (aggregation bias in marketing response models).

### Closing numbers (p. 366)

The first two economics prizes went to econometricians (Frisch, Tinbergen); "In all there are now eight of us with the Prize, representing 15% of the Economics winners. However, in the current millennium, we represent about 44% of the winners, which I view as a healthy local trend." (p. 366) (The "healthy local trend" is a time-series joke about a short-window trend in a small sample.)

Before the lecture, Granger had met twenty-one Nobel laureates (p. 366):

| Field | Laureate | Prize year as given on p. 366 |
|---|---|---|
| Physics | Dennis Gabor | 1970 |
| Peace | Phillip Noel Baker | 1959 |
| Chemistry | Harold Urey | 1934 |
| Economics | 18 laureates, not named | — |

He closes by saying that "Without exception I have found them to be both very fine scholars and also having excellent personalities, willing to help a younger, inexperienced worker when seeking their advice or meeting them socially. I hope that I am able to live up to their very high standard." (p. 366)

> [!note] Discrepancy in the source: Gabor's prize year
> The lecture gives two different years for Gabor's Physics prize. On p. 365 Gabor "later won the Nobel Prize in Physics in 1971"; in the list on p. 366 he appears as "Dennis Gabor, 1970". The 1971 figure is the correct one (Gabor received the 1971 Physics prize for holography), so the p. 366 entry is a slip in the lecture. [[Granger 2003 - Granger Causality and Its Link to Cointegration]] uses 1971. Spellings are kept as printed: "Phillip Noel Baker" (usually written Philip Noel-Baker).

### References in the lecture (p. 366)

| Reference | Used for |
|---|---|
| Andersen, Granger, Reis, Weinhold & Wunder (2003), *The Dynamics of Deforestation and Economic Growth in the Brazilian Amazon*, CUP | Amazon scenario model (pp. 364-365) |
| Hacohen (2000), *Karl Popper: The Formative Years, 1902-1945*, CUP | Popper on discovery (p. 363) |
| Popper (1959), *The Logic of Scientific Discovery*, Hutchinson | discovery as methodology (p. 363) |
| Box & Jenkins (1970), *Time Series Analysis, Forecasting, and Control*, Holden Day | single integrated series (p. 361) |

Two discrepancies between the text and the reference list:

1. **Author spelling.** The in-text first author is spelled "Anderson" (p. 365); the reference list has "Lykke Andersen".
2. **Popper's date.** The text says Popper's *The Logic of Scientific Discovery* "appeared almost exactly at the time of my birth, in September 1934" (p. 363). The reference list cites the Hutchinson, London, **1959** edition. The two are consistent once you know the history: the 1934 book is the German original (*Logik der Forschung*), and 1959 is the English translation. The lecture does not explain this, so a reader checking the reference list sees an apparent 25-year gap.

## Examples

> [!example] Applying the decision-maker criterion to a media-mix model ^ex-decision-mmm
> **Setup:** two candidate MMMs for weekly data: model A has higher in-sample $R^2$ and many "significant" channel coefficients estimated in levels; model B models the baseline as a stochastic trend, has wider intervals, and was evaluated by a rolling-origin backtest of past forecasts.
>
> **Granger's yardstick:** ask "how will a decision maker find this result useful?" (p. 364). A budget decision needs channel effects that are not artefacts of shared trends ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]), uncertainty bounds that express risk (stage 2), and evidence from evaluating previous forecasts (stage 3). Model B satisfies the criterion; model A's fit is not evidence of decision value. See [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] and [[SR 11-7 - Model Risk Management Guidance - Overview]] for the governance version of the same idea.

## Connections

- Forecast evaluation, calibration and combination: [[Forecast Evaluation and Backtesting]], [[Probabilistic Forecasting - Overview]], [[Visualizing High-Dimensional Inference|Checking a forecast distribution]].
- Purpose-first model evaluation and predictive culture: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- Panels / pooled forecasting: [[Local vs Global Forecasting Models]].
- Marketing forecasting approaches (univariate ARIMA, transfer function, VAR/ECM for long horizons under cointegration) and the decisions they feed: [[Optimal Marketing Decisions and Forecasting]]. This is Granger's p. 364 point that cointegration models are used to build forecasts and decision inputs, in a marketing setting.
- Aggregation: [[Aggregation of Relations]] (aggregation bias in marketing).
- Model risk and documented uncertainty: [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].

## See Also
- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — source map
- [[Granger 2003 - Cointegration and the Error-Correction Representation]] — the models being used for these forecasts
