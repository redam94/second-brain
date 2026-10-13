---
title: "Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "§4.3 Model selection and uncertainty incl. footnote 1 (pp.9-10); §4.3.1 Model selection (p.10); §4.3.2 Model uncertainty incl. footnote 2, Figure 3 and Figure 4 (pp.10-12)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]]"
  - "[[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]]"
  - "[[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]]"
aliases:
  - Chan Perry five plausible models
  - Chan Perry Figure 3
  - Chan Perry Figure 4
  - MMM model uncertainty case study
  - Selection by predictive fit fails for MMM
  - Rashomon effect in media mix models
---

# Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)

> [!summary]
> Section 4.3 of Chan & Perry (2017) argues that choosing an MMM specification by $R^2$ or predictive error does not
> screen out models with wrong ROAS, because ad spend is a weak signal: seasonality, price and distribution alone predict
> sales well, and "there are dozens of such choices underlying any single MMM". The case study proves the point on a real
> US weekly dataset. Five plausible specifications all reach $R^2$ = 0.98-0.99 and four reach 6-8% holdout MAPE, yet
> their sales predictions under budget changes differ by **up to 50%** (Figure 3) and their optimal allocations disagree
> on all four major channels, most of all on the largest one (Figure 4).
^summary

## Overview

Section 4.3 (pp.9-10) starts from the ambiguity of $F(x_t,z_t;\Phi)$ and of which variables belong in $x_t$ and $z_t$.
That ambiguity has long been acknowledged (Quandt 1964) and comes from the complexity of the sales-response process.
**Footnote 1** (pp.9-10) places MMMs in the broader **demand-modeling** literature of economics (Deaton & Muellbauer 1980;
Berry, Levinsohn & Pakes 1995), which gives a starting point for which variables to include but "does not provide strong
guidance on the functional form of the model or the proper control variables".

## Main Content

### §4.3.1 Model selection (p.10)

> [!theorem] Predictive accuracy does not select the causal MMM (§4.3.1, p.10)
> **Practice described.** The modeler picks a form by accuracy metrics such as $R^2$ or predictive error "and to treat
> the model with the highest accuracy as a valid causal model".
>
> **Why it fails:**
> 1. **Few data points** relative to the dimension of the input space $(x_t,z_t)$.
> 2. **Low signal-to-noise for the ad variables.** A few inputs such as seasonal proxies, price and distribution often
>    give high predictive power *without* any ad variables. "This makes it easy to find models with high predictive
>    accuracy by trying different specifications" (p.10).
> 3. **Many specification choices.** Examples: sales volume vs. log sales volume as outcome; how to control for price;
>    how to capture lag effects and diminishing returns. "There are dozens of such choices underlying any single MMM."
> 4. **Sales variance far exceeds spend variance** in real datasets the authors have seen (cf. Lewis & Rao 2015 for
>    digital advertising). Ad spend is a weak signal, so it plays little role in which model wins.
>
> **Conclusion:** "Generally a focus on predictive accuracy will not allow a modeler to eliminate models that produce
> inaccurate ROAS estimates" (p.10).
^thm-cp-selection-by-fit

**Why (vault sketch).** If the ad term explains a share $\rho^2$ of sales variance with $\rho^2$ small, two models whose
ROAS differ by a factor of two differ in predicted sales by an amount of order $\rho\,\sigma_y$, which is below holdout
noise at $T\approx156$. Predictive criteria measure the large non-ad part of the fit; ROAS lives in the small part. This
is the aggregate form of the signal-to-noise argument in
[[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]], and a Goodhart-type proxy failure: fit is a
proxy target that can be optimized without improving the quantity of interest (see
[[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).

### §4.3.2 Model uncertainty - the five-model case study (pp.10-12)

> [!example] Five equally plausible MMMs on one real dataset (§4.3.2, pp.10-11)
> **Data.** A fairly typical MMM dataset: weekly US data collected over several years, roughly a dozen ad channels, of
> which four (A, B, C, D) are of most interest. The authors note that other plausible models could also have been fitted
> and that, from discussions with practitioners, there typically are.
>
> | Model | Specification (variation on Model 1) | $R^2$ | Holdout MAPE (last 12 weeks) |
> |---|---|---|---|
> | 1 | Baseline | 0.98 or 0.99 | 6-8% |
> | 2 | Different **proxy variable for seasonality** | 0.98 or 0.99 | 6-8% |
> | 3 | Only the **most recent two years** of data (response surface believed different earlier) | 0.98 or 0.99 | 6-8% |
> | 4 | **Excludes branded search ads** as a channel (estimates thought too biased; effect assumed captured by controls that include search query volume). Branded search is not one of A-D, so this drops a nuisance parameter | 0.98 or 0.99 | 6-8% |
> | 5 | Adds a **linear time trend** | 0.98 or 0.99 | 15% (trend did not persist out of sample) |
>
> (The paper reports $R^2$ as "either 0.98 or 0.99" across the five models and MAPE of 6-8% for Models 1-4 as a group,
> not per model.)
^ex-cp-five-models

**Footnote 2 (pp.10-11).** "The scope for meaningful cross-validation of an MMM is typically limited due to small
datasets and the time-series nature of the data which doesn't allow for simple random sampling to produce a validation
set." Compare [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] for when blocked or K-fold CV is still
valid for time series.

> [!example] Figure 3 - Sales change due to budget change (§4.3.2, p.11)
> **Axes.** x: total media budget as % of current (50-200%). y: predicted sales as % of current (about 45-200%). Each
> line is one model, holding the **current media mix** fixed and scaling the total budget. All lines pass through
> (100%, 100%), the point labelled Current Budget and Current Sales.
>
> **Shape (read off the plot, approximate):**
>
> | Model (line colour) | Sales at 50% budget | Sales at 200% budget | Group |
> |---|---|---|---|
> | Model 2 (olive) | ~50% | ~193% (highest) | steep |
> | Model 3 (green) | ~46% (lowest) | ~190% | steep |
> | Model 4 (blue) | ~71% (lowest of the shallow lines) | ~139-140% (highest of the shallow lines) | shallow |
> | Model 5 (magenta) | ~74% | ~135-136% | shallow |
> | Model 1 (red) | ~74-75% | ~132-133% (lowest overall) | shallow |
>
> Within the shallow group, **Model 4 is the steepest**: it is highest at 200% budget and lowest at 50%. Models 1 and 5
> almost coincide, with Model 5 slightly above Model 1 for budgets above 100%. Models 2 and 3 coincide up to about 150%
> and separate slightly after that. All five lines are close to linear.
>
> **Paper's reading:** the models "differ in their sales predictions by up to 50%"; Models 2 and 3 have "much higher
> slopes than the others, indicating a higher total ROAS across ad channels". "So despite fitting the data equally well,
> the models disagree on what sales are achievable under different ad spends" (p.11).
^ex-cp-fig3

> [!example] Figure 4 - Optimal spend in the major channels (§4.3.2, pp.11-12)
> **Layout.** Five panels, one per model. x: total budget (50-200). y: recommended spend for each of channels A (red),
> B (green), C (blue), D (orange). Only the top four channels are shown, so the four lines do not sum to the total budget.
> In panels 2 and 3, two channels overlap near $y=0$ and are hard to distinguish.
>
> **Recommended allocations (read off the plot, approximate, spend at total budget 50 to 200):**
>
> | Model | Channel A | Channel B | Channel C | Channel D |
> |---|---|---|---|---|
> | 1 | ~15 to ~53 | ~3 to ~8 | **~25 to ~100 (largest)** | ~0 |
> | 2 | **~35 to ~140 (largest)** | ~5 to ~22 | ~0 | ~0 |
> | 3 | ~0 (overlaps B) | ~0 (overlaps A) | **~27 to ~105 (largest), kinked** | ~15 to ~60, kinked |
> | 4 | ~12 to ~46 | ~3 to ~8 | **~28 to ~110 (largest)** | ~0 |
> | 5 | ~7 to ~25 | ~4 to ~19 | **~32 to ~120 (largest)** | ~0 |
>
> **Which lines overlap.** The caption's two overlapping lines are **C and D at $y\approx0$ in Model 2** (only the orange D
> line is visible) and **A and B at $y\approx0$ in Model 3** (only the green B line is visible). So Model 3 puts
> essentially nothing into channels A and B at any budget.
>
> **Model 3 is piecewise, not linear.** In every other panel each channel's line is close to a straight line through the
> origin's direction. In Model 3 both funded channels bend:
>
> | Total budget | 50 | 100 | 150 | 200 |
> |---|---|---|---|---|
> | Channel C (blue) | ~27 | ~52 | ~83 | ~105 |
> | Channel D (orange) | ~15 | ~30 | ~40 | ~60 |
>
> C rises by about 25 per 50 of budget up to 100, steepens to about 31 between 100 and 150, then flattens to about 22
> between 150 and 200. D's slope moves the opposite way: about 15, then about 10, then about 20 per 50 of budget. The
> optimizer under Model 3 shifts the marginal budget between C and D as one channel's response curve saturates. That
> kinked path is the signature of different saturation parameters across channels. The near-straight lines in the other
> panels show allocations that roughly scale the same proportions up and down. (Values read off the rendered p.12;
> approximate.)
>
> **Paper's reading (p.11):** the models do not agree on how to allocate across channels. Most importantly they disagree
> on **channel A**, "by far the largest channel for this advertiser": Model 2 allocates the largest budget to A across the
> whole range of total budgets, while the other models do not. They also disagree about B, C and D.
^ex-cp-fig4

> [!theorem] Lesson of the case study (§4.3.2, p.11)
> "In this example, there are five plausible models that fit the data well, but that lead to different conclusions about
> the overall value of the ad channels and about how budget should be allocated."
^thm-cp-model-uncertainty

### Interpretation

- **Fit did not discriminate.** Holdout accuracy rejected one model (Model 5), and only because its trend failed to
  extrapolate, a reason unrelated to its ROAS. Among Models 1-4, fit offers no basis for choosing.
- **Choices that look innocuous dominate the answer.** A different seasonality proxy (Model 2) or a shorter window
  (Model 3) roughly doubles the implied total ROAS. On the Figure 4 reading above, Model 3 even puts essentially nothing into channel A, the largest channel in the mix.
- **Reporting one model hides the spread.** A single chosen model presents a precise-looking allocation; the five-model
  ensemble shows the allocation is not determined by the data. Section 6 asks modelers to disclose this
  ([[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]]).

## Examples

> [!example] Same pattern in a feature-importance workflow (vault illustration)
> A team fits several per-segment tree models of a shared aggregate KPI on 52-156 weekly rows and chooses among the fits
> by total SHAP mass on media features, or by in-sample $R^2$, instead of a criterion tied to the causal quantity. Each
> fit is plausible; each gives a different driver ranking. This is §4.3.1 (selection by a proxy that does not track the
> estimand) and §4.3.2 (equal-fit models, different decisions) combined. A defensible alternative: report the spread of
> rankings across all plausible fits, and validate the pipeline on simulated data with known drivers before trusting any
> ranking.
^ex-cp-shap-model-choice

## Connections

- The multiplicity of equally good models with different variable reliance is formalized in
  [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] and named "Rashomon" in
  [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- "Dozens of such choices" is the [[Garden of Forking Paths]] / [[Researcher Degrees of Freedom]] problem; the
  false-positive consequences are simulated in [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
- Predictive vs. causal criteria in Bayesian model comparison: [[Model Selection and Overfitting]],
  [[Cross Validation Checking]]; Jin et al.'s own model-selection discussion is in [[MMM Model Selection and Application]].
- Probability that a selected finding is true under flexible analysis and weak signal:
  [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- Effective challenge of model choices in governed settings: [[SR 11-7 - Model Risk Management Guidance - Overview]].

## See Also

- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]
- [[ROAS, mROAS, and Optimal Media Mix]]: the optimization behind Figure 4
- [[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]: allocation under diminishing returns
