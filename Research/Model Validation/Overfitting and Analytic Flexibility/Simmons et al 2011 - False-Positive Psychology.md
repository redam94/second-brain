---
title: "Simmons et al 2011 - False-Positive Psychology"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/multiple-comparisons
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Psychological Science 22(11), 1359–1366 (2011); quoted pp. 1, 3"
citation: "Simmons, J. P., Nelson, L. D. & Simonsohn, U. (2011). False-positive psychology: Undisclosed flexibility in data collection and analysis allows presenting anything as significant. Psychological Science, 22(11), 1359–1366."
date_ingested: 2026-10-13
folder: "Model Validation/Overfitting and Analytic Flexibility"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - Why Most Published Research Findings Are False]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Garden of Forking Paths]]"
  - "[[Riley et al 2020 - Sample Size for Prediction Models]]"
  - "[[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]"
aliases:
  - "Simmons 2011"
  - "Simmons, Nelson & Simonsohn 2011"
  - "False-Positive Psychology"
  - "p-hacking"
---

# Simmons et al 2011 - False-Positive Psychology

> [!summary]
> Simmons, Nelson & Simonsohn show by simulation that a handful of routine, individually defensible analysis choices — which outcome to report, when to stop collecting data, which covariates to include, which conditions to report — raise the actual false-positive rate from the nominal 5% to about 61% when combined. Any validation process that picks "what worked" from many analyses inherits this inflation unless the flexibility is disclosed, constrained or corrected for.

## Overview

Simmons, J. P., Nelson, L. D. & Simonsohn, U. (2011). *False-positive psychology: Undisclosed flexibility in data collection and analysis allows presenting anything as significant*. **Psychological Science** 22(11), 1359–1366.

**Question.** How much do undisclosed "researcher degrees of freedom" inflate the false-positive rate of published findings?

**Context.** The paper coined the term *researcher degrees of freedom* and, with Ioannidis (2005), framed the replication crisis. Its rhetorical centrepiece is a real experiment, analysed flexibly, "showing" that listening to the Beatles' "When I'm Sixty-Four" made participants chronologically younger — an impossible result obtained with standard-looking statistics.

## Main Content

### Simulation of four degrees of freedom

Data are generated under the null (no true effect); each strategy reports a "finding" if *any* of the allowed analyses reaches $p < .05$.

> [!definition] Researcher degrees of freedom (Simmons et al. simulation)
> Analysis choices made after seeing the data that are not reported as choices. The four simulated:
> - **A. Two dependent variables** (correlated $r = .50$): report either one, or their average → ≈ 9.5% false positives.
> - **B. Optional stopping**: test at 20 per cell, add 10 more per cell if not significant → ≈ 7.7%.
> - **C. Covariate / interaction**: control for gender or its interaction with treatment → ≈ 11.7%.
> - **D. Dropping conditions**: run three conditions, report any two or all three → ≈ 12.6%.
>
> Combining A–D yields ≈ **60.7%** false positives at nominal $\alpha = .05$.

^def-researcher-degrees-of-freedom

Repeated peeking (testing after every few observations) can push the error rate higher still.

### Proposed remedies

**Six requirements for authors:** (1) decide the data-collection termination rule in advance and report it; (2) collect at least 20 observations per cell (or justify); (3) list all variables collected; (4) report all experimental conditions, including failed manipulations; (5) if observations are eliminated, also report results with them included; (6) if a covariate is used, also report results without it.

**Four guidelines for reviewers:** ensure the requirements are followed; be more tolerant of imperfect results; require demonstration that results do not hinge on arbitrary analytic decisions; and, when justifications are not compelling, require exact replication.

## Key Passages

> "Rather, it is common (and accepted practice) for researchers to explore various analytic alternatives, to search for a combination that yields "statistical significance," and to then report only what "worked." The problem, of course, is that the likelihood of at least one (of many) analyses producing a falsely positive finding at the 5% level is necessarily greater than 5%." — Simmons, Nelson & Simonsohn (2011), p. 1

> Combining four routine choices leads "to a stunning 61% false-positive rate" — Simmons et al. (2011), p. 3

Related passage from the same theme (Gelman & Loken):

> "even if the chosen data analysis is a deterministic function of the observed data, this does not eliminate the multiple comparisons problem" — Gelman & Loken (2013), p. 13

## Implications for Model Validation

- **Model search is a degree of freedom.** Choosing among many algorithms, feature sets, lags, target transforms, segment definitions or validation windows and reporting the best is the predictive-modelling version of strategies A–D; the reported score is optimistically biased.
- **Optional stopping has an analogue.** Iterating "until the backtest looks good" (adding features, changing the holdout period) inflates apparent accuracy just as adding subjects does.
- **Disclose the whole search.** Validation documentation should record every configuration tried, not just the winner, so reviewers can judge the effective number of comparisons.
- **Robustness reporting.** Present results with and without key choices (covariates, exclusions, outlier handling) — remedies 5 and 6 transfer directly.
- **Nested / held-out evaluation.** Score the *selection procedure*, not the selected model: nested cross-validation or a locked final holdout untouched during search.
- **Simulation under the null.** Running the full pipeline on data with no true signal (cf. [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]) measures its realised false-positive rate directly, exactly as this paper did.

## Connections

- Formal base-rate argument: [[Ioannidis 2005 - Why Most Published Research Findings Are False]] (Corollary 4: flexibility lowers PPV).
- [[Garden of Forking Paths]] — generalises the problem to choices that are data-contingent without deliberate fishing; [[Researcher Degrees of Freedom]] summarises the concept in this vault.
- [[Riley et al 2020 - Sample Size for Prediction Models]] — overfitting scales with parameters *considered*, the prediction-model counterpart.
- [[Multiple Testing Corrections]] and [[Forking Paths and Bayesian Approaches]] — statistical remedies.
- [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] — optimising a metric (significance, backtest score) selects for noise in the metric.

## See Also

- [[Researcher Degrees of Freedom]] — vault concept note
- [[Garden of Forking Paths]] — Gelman & Loken's extension
- [[Ioannidis 2005 - Why Most Published Research Findings Are False]] — PPV framework
- [[Multiple Testing Corrections]] — correcting for many analyses
- [[Riley et al 2020 - Sample Size for Prediction Models]] — candidate parameters drive overfitting
- [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]] — simulating a method's error rates
