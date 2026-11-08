---
title: "Index: Kay 2016 - When-ish is My Bus"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Decisions and Value of Information]]"
date_updated: 2026-11-08
concept_count: 5
---

# Kay 2016 - When-ish is My Bus

> [!abstract] Routing Summary
> Fully captures Kay, Kola, Hullman and Munson (2016), *When (ish) is My Bus? User-centered Visualizations of Uncertainty in Everyday, Mobile Predictive Systems* (CHI '16): survey and design requirements, the quantile dotplot, the 541-participant beta-regression experiment, and design implications. 5 notes.
> - Need the paper on one page or the section-to-note map? -> [[Kay 2016 - When-ish is My Bus - Overview]]
> - Need the survey results or the five design elements? -> [[Kay 2016 - Transit User Survey and Design Requirements]]
> - Need how to build a quantile dotplot, or interval by counting? -> [[Kay 2016 - Quantile Dotplot Construction]]
> - Need the experiment, SDs, ratios or the beta regression? -> [[Kay 2016 - Experiment Beta Regression and Results]]
> - Need subitizing, trade-offs or limitations? -> [[Kay 2016 - Discussion and Design Implications]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Design requirements | [[Kay 2016 - Transit User Survey and Design Requirements]] | definition | survey of 172 users | point + probabilistic + status + freshness |
| Quantile dotplot | [[Kay 2016 - Quantile Dotplot Construction]] | definition | quantile function | dots at $Q((i-0.5)/n)$ |
| Interval by counting | [[Kay 2016 - Quantile Dotplot Construction]] | theorem | quantile dotplot | $m$ dots from tail gives $1-m/n$ |
| Error decomposition, beta regression | [[Kay 2016 - Experiment Beta Regression and Results]] | definition | logit error | bias vs variance in logit space |
| Variance results | [[Kay 2016 - Experiment Beta Regression and Results]] | example | model | dotplot-20 0.11 vs density 0.13 (1.15x) |
| Subitizing recommendation | [[Kay 2016 - Discussion and Design Implications]] | theorem | experiment | use small numbers of outcomes |

## Notes

- [[Kay 2016 - When-ish is My Bus - Overview]] — CONTAINS: question, contributions, key result, motivating E16/E90, Source Map.
- [[Kay 2016 - Transit User Survey and Design Requirements]] — CONTAINS: background arguments, survey goals and unmet needs, five design elements, layout decisions.
- [[Kay 2016 - Quantile Dotplot Construction]] — CONTAINS: Def. quantile dotplot, counting property, encodings matrix, verified 20-dot example, ggdist/PyMC sketch.
- [[Kay 2016 - Experiment Beta Regression and Results]] — CONTAINS: method, participants, model spec and priors, Fig. 6-7 values, confidence and appeal.
- [[Kay 2016 - Discussion and Design Implications]] — CONTAINS: subitizing, attitudes, trade-offs, future work, risk slider.

## Sources
- Kay Kola Hullman Munson 2016 - When (ish) is My Bus — CHI 2016, 12 pages, author-hosted at mjskay.com.

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]] — animated alternative; [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]].
