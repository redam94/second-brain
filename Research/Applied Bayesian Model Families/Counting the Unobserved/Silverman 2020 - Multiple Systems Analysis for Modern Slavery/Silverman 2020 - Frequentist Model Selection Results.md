---
title: "Silverman 2020 - Frequentist Model Selection Results"
tags:
  - source/ingested
  - topic/population-estimation
  - type/example
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 4.1-4.3, Tables 5-6, Figs. 1-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]"
used_by:
  - "[[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]"
aliases:
  - stepwise AIC MSE instability
  - Rcapture model selection MSE
---

# Silverman 2020 - Frequentist Model Selection Results

> [!summary]
> Stepwise AIC (the UK 2014 method) and best-BIC selection over many interaction sets can give very different totals. UK estimates range 11.4k to 14.2k by threshold; Netherlands estimates jump from 60.3k to 146.0k when the two smallest lists are merged; Kosovo with interactions is about twice the main-effects value.

## Overview

All frequentist fits use R `Rcapture` (Baillargeon and Rivest 2007), with profile-likelihood intervals (Cormack 1992) and R package `modslavmse` for the stepwise routine.

## Main Content

> [!definition] Stepwise AIC (Sec. 4.1)
> Start with main effects only; at each step add the two-list interaction $\beta_{ij}$ that best improves AIC; stop if AIC cannot improve or the new term is not significant at threshold $p$. The original analysis (Silverman 2014; Bales et al. 2015) used $p=5\%$.
^def-stepwise-aic

**Table 5 (reproduced): UK data, estimates in thousands.**

| Method | Data | 2.5% | 10% | point | 90% | 97.5% |
|---|---|---|---|---|---|---|
| Main effects only | six lists | 11.0 | 11.4 | 12.2 | 13.1 | 13.6 |
| | five lists | 12.0 | 12.5 | 13.4 | 14.5 | 15.2 |
| | four lists | 9.5 | 9.9 | 10.7 | 11.6 | 12.1 |
| Stepwise AIC, p = 0.1% | six lists | 12.6 | 13.1 | 14.2 | 15.4 | 16.1 |
| | five lists | 12.6 | 13.1 | 14.2 | 15.4 | 16.1 |
| | four lists | 10.5 | 11.0 | 12.0 | 13.1 | 13.8 |
| Stepwise AIC, p = 5% (original analysis) | six lists | 10.0 | 10.4 | 11.4 | 12.5 | 13.2 |
| | five lists | 9.9 | 10.3 | 11.3 | 12.4 | 13.1 |
| | four lists | 9.6 | 10.0 | 11.0 | 12.1 | 12.8 |

Conditional on the model, the original six- and five-list 95% intervals are about 10,000-13,000. Main effects only or a stricter criterion gives larger estimates; the four-list case gives smaller ones; none dramatic.

### All-subsets selection (Sec. 4.2)
`closedpMS.t` in Rcapture fits every subset of interactions: with six lists and pairwise terms only there are $2^{15}$ models (too heavy), so only the five-list data are examined, with $2^{10}=1024$ models (the PDF text layer prints these as "215" and "210"), ranked by BIC (Fig. 1). Best-BIC model: 12,262 (BIC 197.5); most models cluster near the Silverman estimate. With `omitOutliers = F` (Fig. 2) a **second cloud of models with much larger totals** appears, and the best-BIC model lies inside it. The top ten by AIC contain no estimate above 17,000; BIC chooses a wider range. Omitting GP (Fig. 3) removes the second cloud altogether.

**Table 6 (reproduced): other data sets, thousands.**

| Method | Data | 2.5% | 10% | point | 90% | 97.5% |
|---|---|---|---|---|---|---|
| Main effects | Netherlands | 48.5 | 50.0 | 52.8 | 55.9 | 57.6 |
| | Netherlands five lists | 48.6 | 50.0 | 52.9 | 56.0 | 57.8 |
| | New Orleans | 0.7 | 0.7 | 1.0 | 1.4 | 1.7 |
| | New Orleans five lists | 0.7 | 0.8 | 1.0 | 1.4 | 1.8 |
| | Kosovo | 7.1 | 7.2 | 7.4 | 7.6 | 7.7 |
| Stepwise AIC p=0.1% | Netherlands | 53.3 | 55.6 | 60.3 | 65.6 | 68.7 |
| | Netherlands five lists | 119.4 | 127.8 | 146.0 | 167.8 | 181.0 |
| | New Orleans | 0.7 | 0.7 | 1.0 | 1.4 | 1.7 |
| | New Orleans five lists | 0.7 | 0.8 | 1.0 | 1.4 | 1.8 |
| | Kosovo | 12.5 | 13.1 | 14.3 | 15.7 | 16.5 |
| Stepwise AIC p=5% | Netherlands | 53.3 | 55.6 | 60.3 | 65.6 | 68.7 |
| | Netherlands five lists | 119.4 | 127.8 | 146.0 | 167.8 | 181.0 |
| | New Orleans | 1.4 | 1.8 | 3.4 | 7.2 | infinity |
| | New Orleans five lists | 0.7 | 0.8 | 1.0 | 1.4 | 1.8 |
| | Kosovo | 12.5 | 13.1 | 14.3 | 15.7 | 16.5 |

> [!example] Interpretation
> Netherlands: "combining the two smallest lists more than doubles the stepwise estimates" (60.3k to 146.0k); no such jump for main effects (52.8k vs 52.9k). Fig. 4 shows a long tail of models with very large estimates; the stepwise path lands on one that is almost the largest of all, though the global best-BIC model is not in that group. New Orleans, eight lists, $p=5\%$: the upper limit is infinite and Rcapture warns. Kosovo: allowing interactions about doubles the estimate (7.4k to 14.3k), expected given strong inter-list correlation; main effects is clearly inadequate there.
^ex-frequentist-instability

## Examples

> [!example] Measurement lesson
> A point estimate that moves 2.4 times when two small lists are merged is not a measurement; it is a model-choice artefact. When the quantity of interest drives policy, report the whole family of defensible models, not the winner of one criterion. A parallel in marketing mix modelling: report sensitivity to specification, as in sensitivity analysis notes.

## Connections

- Instability is a symptom of the model-uncertainty problem addressed by Bayesian averaging: [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]].
- Information-criterion caveats under boundary estimates: [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]].

## See Also

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
- [[Stacking and Predictive Model Averaging]]
