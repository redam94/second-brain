---
title: "Posterior Predictive Checking"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 8.2, pp. 142-147 (Figures 8.5-8.8)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Prior Predictive Checking]]"
  - "[[Simulation to Express Uncertainty]]"
  - "[[Visualizing High-Dimensional Inference]]"
used_by:
  - "[[Cross Validation Checking]]"
  - "[[Influence of Individual Data Points]]"
  - "[[LOO Model Checking and Comparison - Roaches]]"
aliases:
  - "PPC"
  - "Posterior predictive check"
  - "PIT"
  - "Probability integral transformation"
  - "PIT-ECDF"
  - "Rootogram"
  - "PAV calibration plot"
---

# Posterior Predictive Checking

> [!summary]
> Simulate replicated data from the posterior and compare to the observed data. The book's current
> practice has moved decisively away from $p$-values toward **graphical checks**, and toward the
> **probability integral transformation (PIT)** as a way to check *pointwise* rather than marginal
> calibration. It also insists on display types matched to the data type: **kernel density plots hide
> discreteness** (use a rootogram), and **bar plots are useless for binary data** (use a PAV-adjusted
> calibration plot).

## Overview

> [!definition] The posterior predictive distribution (Ch. 8.2, p. 142)
> $$
> y_1^{\text{rep}}, \dots, y_n^{\text{rep}} \sim p(y^{\text{rep}} \mid y) = \int p(y^{\text{rep}} \mid \theta)\, p(\theta \mid y)\, d\theta
> $$
> "Typically the size of the replicate dataset is the same as the original dataset."
>
> **The distinction from prior predictive checking:** "**Prior predictive checking is a way to understand
> a model and the implications of the specified priors, while posterior predictive checking also allows
> one to examine the fit of a model for a particular dataset**" (Box 1980; Rubin 1981; Gelman, Meng, and
> Stern 1996; BDA3; Gabry, Simpson, et al. 2019).
>
> **The joint distribution to keep in mind:** "$y$ and hypothetical replicated data $y^{\text{rep}}$ [are]
> **two distinct quantities existing within a joint distribution**,"
> $$
> p(y, y^{\text{rep}}, \theta) = p(\theta)\,p(y|\theta)\,p(y^{\text{rep}}|\theta)
> $$
^def-ppc

> [!important] Why the book has largely abandoned $p$-values
> "Traditionally, tests have been summarized by $p$-values: tail-area probabilities
> $$
> \Pr(T(y^{\text{rep}}) \ge T(y)) = \int \Pr(T(y^{\text{rep}}) \ge T(y)|\theta)\, p(\theta)\, d\theta \quad\text{(prior predictive)}
> $$
> $$
> \Pr(T(y^{\text{rep}}) \ge T(y)|y) = \int \Pr(T(y^{\text{rep}}) \ge T(y)|\theta)\, p(\theta|y)\, d\theta \quad\text{(posterior predictive)}
> $$
> where $T(y)$ is a **test statistic** or **test summary**.
>
> **"But in our current practice we rarely use $p$-values; we make much more use of graphical predictive
> checks, in which $T(y)$ is some sort of graphical display that can be compared to its possible
> realizations $T(y^{\text{rep}})$ under the prior or posterior predictive distribution."**

## Main Content

### Choosing test summaries

> [!definition] What makes a good test summary (Ch. 8.2, pp. 142-143)
> "**A mismatch indicates a failure of the model to describe an aspect of the data.** The most direct
> checks compare simulations from the predictive distribution to **the full distribution of the data or a
> summary statistic** computed from the data **or subgroups of the data, especially for groupings not
> included in the model.**"
>
> **The ideal:** "Ideally the summaries used would be **ancillary or close to ancillary. A function of the
> data is ancillary if its distribution is independent of the parameters of the model.**"
>
> **The obstacle:** "**When the number of parameters in the model increases, it is more difficult to come
> up with useful data summaries that are close to ancillary. In such cases, cross validation predictive
> checks are likely to be useful**" — [[Cross Validation Checking]].
^def-test-summary

> [!example] Four checks from `bayesplot` (Figure 8.5)
> | Panel | Check type | Model / data | What it shows |
> |---|---|---|---|
> | **(a)** | **"density"** | normal fit to **lognormal** data | "**the tails of the $y^{\text{rep}}$ behave very differently than for $y$**" |
> | **(b)** | **"statistic"** ($T = $ sd) | binomial fit to **beta-binomial** data | histogram of sd across $y^{\text{rep}}$ vs. sd of $y$: "**the data have larger sd than what the model can handle**" |
> | **(c)** | **"bars"** for discrete data | — | "**This check looks good**: the distribution of frequencies of individual counts in $y$ falls well within those in $y^{\text{rep}}$" |
> | **(d)** | **same, grouped by an omitted predictor** | same model and data as (c) | "**The High subgroup systematically deviates from the range of $y^{\text{rep}}$, indicating that there is an additional source of variability that the model fails to capture**" |
>
> **Panels (c) and (d) are the pair to remember:** the *same* model and data pass the ungrouped check and
> fail the grouped one. This is why the book emphasizes grouping "**especially for groupings not included
> in the model.**"

> [!important] There is no universal recipe — but there is a criterion
> "**There is no universal way to choose model checks, but running a few direct checks safeguards against
> gross misspecification.** Visualizations measuring the divergence from the data distribution to the
> posterior predictive distribution are often useful as **they are examining many aspects of the
> distribution at once.**"
>
> "**There is also no universal way to decide when a check fails or whether failure requires adjustments
> to the model. Depending on the goals of the analysis and the costs and benefits specific to the
> circumstances, we may tolerate that the model fails to capture certain aspects of the data, or it may be
> essential to invest in improving the model.**"
>
> **The criterion offered:** "In general, we try to find '**severe tests**' (Mayo 2018): **checks that are
> likely to reveal discrepancies if the model would give misleading answers to the questions we care most
> about.**"
>
> "A practical challenge … is that **it is often necessary to come up with a unique visualization tailored
> to the specific problem at hand.**"

### The probability integral transformation

> [!definition] PIT (Dawid 1984; Tesso and Vehtari 2026; Ch. 8.2, p. 144)
> "**The basic idea is that a 90% predictive interval should contain 90% of the observations. Any given
> interval is arbitrary, however.** Instead of examining just one or a few intervals, we can examine the
> calibration of the predictive distributions by looking at the **pointwise cumulative predictive
> densities**:
> $$
> \text{PIT}_i = \int_{-\infty}^{y_i} p(\tilde{y}_i \mid x, y)\, d\tilde{y}_i
> $$
>
> **If the pointwise predictive distributions are well calibrated, the PIT distribution will be close to
> $\text{uniform}(0,1)$.**"
>
> **The framing that keeps this in proportion:** "**Perfect calibration of predictive distributions is not
> the ultimate goal of Bayesian inference. A model with poor predictive calibration may still yield correct
> estimates and support good decisions. But failures of local predictive calibration can reveal
> opportunities to improve the model.**"
>
> **Why it complements ordinary PPC:** "**While posterior predictive checking often compares the marginal
> distribution of the predictions, we can also compare pointwise predictive distributions and
> observations.**"
^def-pit

> [!example] PIT checking on the Kilpisjärvi temperature model (Figure 8.6)
> Three panels for the linear model of [[Choosing an Initial Model]]:
> - **(a)** observed temperatures with **50% and 90% posterior predictive intervals** — "if the predictive
>   distributions match the data well, then a corresponding proportion of the observations should be
>   within these intervals."
> - **(b)** the **PIT-ECDF plot**: empirical CDF of the observed PIT values, with a **diagonal dashed
>   reference line** for exact uniformity. "**As there can be random variation in the observed
>   distribution, we show the result of the POT-uniformity test** (Tesso and Vehtari 2026) in the top left"
>   — here $p^{\text{POT}}_{\text{unif}} = 0.43$ at $\alpha = 0.01$, i.e. no evidence of miscalibration.
> - **(c)** the **PIT-ECDF *difference* plot**: "**There can be a lot of white space in an ECDF plot, and
>   sometimes we prefer to plot a difference from the expected ECDF to improve the dynamic range.**"
>
> **When to upgrade to cross-validated PIT:** "**If the model is flexible, with an effective number of
> parameters that is high relative to the number of observations, it is better to use cross-validated PIT
> values**" — see [[Cross Validation Checking]].

### Displays matched to the data type

> [!warning] Discrete data: kernel densities lie (Figure 8.7)
> "**If the number of distinct counts is large and the predicted probabilities for consecutive counts are
> similar, the counts behave almost as continuous observations.** In that case, an overlaid kernel density
> plot can be fine. **But for a small number of distinct counts or if there are sharp changes in
> probabilities of consecutive counts, it is better to take into account the discrete nature of the
> data.**"
>
> Figure 8.7 (roach counts, Ch. 24): the left panel's kernel density estimate "**oversmooths and hides the
> discrete nature of the data**"; the right panel shows a **discrete rootogram** — "the vertical axis shows
> the actual counts but still uses **logarithmic scaling**" (Säilynoja, Johnson, et al. 2025).
^wrn-kde-discrete

> [!warning] Binary data: bar plots are worse than useless (Figure 8.8)
> "With binary data, **overlaid kernel density estimates do not make sense at all. A bar plot showing the
> data proportions and the predicted proportions is useless, as we can get the proportions right even with
> a model which has only one intercept parameter.**"
>
> **The recommendation: PAV-adjusted calibration plots** (pool adjacent violators; Dimitriadis, Gneiting,
> and Jordan 2021).
>
> Figure 8.8 works through whether a **zero-inflation component** is needed, with the focus target binary
> (zero vs. nonzero count), comparing negative binomial and zero-inflated negative binomial models:
> - **top left** — the useless bar plot;
> - **top right** — a **binned** calibration plot: "first the predicted probabilities are **sorted and
>   binned**, and then the corresponding observed rates are shown with a dot and a **simple binomial
>   model-based interval** for each bin";
> - **bottom row** — **PAV-adjusted** calibration plots: "fits a **nonparametric monotone calibration
>   curve** for the data, with **95% pointwise consistency bands computed from posterior predictive
>   replicate datasets.**"
>
> **Two advantages of PAV over binning:** "**there is no need to select the bin size**, and **the
> monotonicity assumption makes the consistency band tighter.**"
>
> **Extensions:** "**for categorical data by checking one-vs.-others probabilities and for ordinal data by
> checking cumulative probabilities.**"
^wrn-binary-barplot

### Prior and posterior checks in one hierarchical framework

> [!definition] The building / room / urn analogy (Ch. 8.2, p. 145)
> For a hierarchical model with modeled data $y$, local parameters $\alpha$, hyperparameters $\phi$, and
> unmodeled data $x$:
> $$
> p(\alpha, \phi \mid x, y) \propto p(\phi|x)\, p(\alpha|\phi,x)\, p(y|\alpha,\phi,x)
> $$
>
> - **$\alpha$** corresponds to an **urn** from which data $y$ are drawn;
> - **$\phi$** is a **room** full of urns, one for each value of $\alpha$;
> - **the prior on $\phi$** is a **building** full of rooms.
>
> "**The entire building represents your model, and the generative process is: Go to the building, sample
> a room at random from that building, then sample an urn at random from the urns in that room, then
> sample data $y$ from your urn.**"
^def-building-room-urn

> [!important] Three replications, spelled out as algorithms
> Given posterior simulations $(\alpha,\phi)^s$, $s = 1,\dots,S$:
>
> | Replication | Analogy | Algorithm for each $s$ |
> |---|---|---|
> | **Prior predictive** | new room, new urn, new data | draw $\phi^{\text{rep}} \sim p(\phi\|x)$; then $\alpha^{\text{rep}} \sim p(\alpha\|\phi^{\text{rep}},x)$; then $y^{\text{rep}} \sim p(y\|\alpha^{\text{rep}},\phi^{\text{rep}},x)$ |
> | **Posterior predictive, new groups** | same room, new urn, new data | **keep $\phi^s$**; draw $\alpha^{\text{rep}} \sim p(\alpha\|\phi^s,x)$; then $y^{\text{rep}} \sim p(y\|\alpha^{\text{rep}},\phi^s,x)$ |
> | **Posterior predictive, existing groups** | same room, same urn, new data | **keep $\phi^s$ and $\alpha^s$**; draw $y^{\text{rep}} \sim p(y\|\alpha^s,\phi^s,x)$ |
>
> "**These three different distributions correspond to different scenarios and can all be interpreted
> directly, as predictive distributions of what you might see in alternative rooms and urns, if the model
> were true.**"
>
> "**It's not necessary to describe this all using multilevel models** — you can distinguish between prior
> and posterior predictive checks with a simple model with just $y$ and $\theta$ — **but we find the
> multilevel modeling framework to be helpful in that it allows us to better visualize the different sorts
> of replications being considered.** You could also consider other distributions in a non-nested model,
> for example predictive data on **new patients, new time periods, new hospitals**, etc."
>
> Same three scenarios as [[Simulation to Express Uncertainty#The three replication scenarios in a hierarchical model]],
> now stated as *checks* rather than as *summaries*.

## Connections

- The PIT is the bridge from posterior predictive checking to [[Cross Validation Checking]]: the same
  statistic computed with and without double-using the data, which is what Figure 8.9 contrasts.
- The "severe tests" criterion is the checking-side counterpart of
  [[There Is No Safe Haven#Convincing evidence]]'s nine sources of evidence: no single check suffices,
  so choose the ones that would matter.
- Chapter 6 of BDA3 and the chapters of *Statistical Rethinking* both supply worked PPCs; see
  [[Model Checking]].

## See Also
- [[Prior Predictive Checking]] — the same logic before conditioning on data
- [[Cross Validation Checking]] — when the same data cannot be used for fitting and checking
- [[Influence of Individual Data Points]] — following up on which observations fit badly
- [[Model Checking]] — BDA3's treatment, including $p$-values in more detail
- [[Conformity Scores and Adaptive Prediction Sets]] — conformalized Bayes
- [[Simulation-Based Calibration - Overview]] — SBC checks the computation; posterior predictive checks test the model against data — complementary halves of model criticism
