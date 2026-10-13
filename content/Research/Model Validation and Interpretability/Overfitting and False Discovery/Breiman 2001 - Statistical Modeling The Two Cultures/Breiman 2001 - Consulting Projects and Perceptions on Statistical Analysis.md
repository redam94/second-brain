---
title: "Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis"
tags:
  - source/ingested
  - topic/model-validation
  - topic/machine-learning
  - type/example
  - type/concept
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman (2001), Statistical Science 16(3): §3 Projects in Consulting (p. 200), §3.1 The Ozone Project (pp. 200-201), §3.2 The Chlorine Project (p. 201), §3.3 Perceptions on Statistical Analysis (p. 201), §4 Return to the University (p. 202), §4.1 Statistical Research (p. 202)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]"
used_by:
  - "[[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]"
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]"
aliases:
  - Breiman ozone project
  - Breiman chlorine project
  - Breiman five perceptions on statistical analysis
---

# Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis

> [!summary]
> §3-4 give the paper's motivation through Breiman's consulting career. Two projects are described in detail: **next-day ozone prediction** for the Los Angeles Basin (450+ meteorological variables, 5 years train / 2 years test, stepwise linear regression with quadratic terms; a failure because the false-alarm rate was too high) and **chlorine detection from mass spectra** (30,000 compounds, 25,000/5,000 train/test split, 1,500 yes-no domain questions built into a decision tree that reached 95% accuracy). From this he draws five perceptions — focus on a good solution, live with the data, search for a model (algorithmic or data), judge by test-set accuracy, use computers — and contrasts them with academic statistics, where "All articles begin and end with data models" (§2, p. 200).
^sum-consulting-projects-1

## Overview

The projects show the origin of the algorithmic stance: real prediction problems with many variables, variable dimensionality and a clear accuracy target, solved by honest train/test evaluation. They also anticipate later themes — test-set validation, domain-knowledge feature construction (a preview of §10's "blessing of dimensionality"), and the question "What's the model for the data?"

## Main Content

### §3 The consulting portfolio (p. 200)

As a consultant Breiman designed and supervised surveys for the EPA and court systems, designed controlled experiments for the EPA, analysed traffic data for federal and California transportation departments, and worked mostly on prediction projects:

- next-day ozone levels;
- halogen-containing compounds from mass spectra;
- ship class from high-altitude radar returns;
- submarine class from sonar returns;
- identity of hand-sent Morse code;
- toxicity of chemicals;
- on-line prediction of the cause of a freeway traffic breakdown;
- speech recognition;
- sources of delay in criminal trials in state courts (used again in §9; see [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]).

> [!example] §3.1 The Ozone Project (pp. 200-201)
> **Problem.** In the Los Angeles Basin in the 1960s-70s ozone alerts were issued in the morning; they would be more useful 12 hours in advance. Tailpipe emissions trapped under an inversion layer produced ozone two to three hours after the morning commute. Because commuting was regular (total variation in a daylight hour only a few percent between weekdays), emissions were roughly constant and ozone depended on the preceding days' meteorology. The EPA funded a mid-1970s effort to predict ozone 12 hours ahead.
>
> **Data.** Daily and hourly readings of over 450 meteorological variables for seven years — upper- and lower-air measurements at weather stations as far away as Oregon and Arizona, and hourly surface temperature, humidity and wind speed at dozens of pollution stations — with hourly ozone and other pollutants. $\mathbf x$ is the meteorological vector on day $n$ (more than 450 variables, since several days back are included), and $y$ is ozone on day $n+1$. The task: construct $f(\mathbf x)$ that accurately predicts next-day ozone for any future day.
>
> **Validation design.** First five years = training set; last two years = test set (a time-ordered holdout).
>
> **Method.** Large linear regressions followed by variable selection; quadratic terms and interactions among retained variables added; variable selection again to prune.
>
> **Outcome.** "In the end, the project was a failure—the false alarm rate of the final predictor was too high." Breiman regrets it cannot be revisited with modern tools.
^ex-ozone

> [!example] §3.2 The Chlorine Project (p. 201)
> **Problem.** The EPA samples thousands of compounds a year for potential toxicity. Mass spectra are fast and cheap to measure, but determining chemical structure from them needs a trained chemist. Many toxic compounds contain halogens, so the EPA funded a project to predict the presence of chlorine from the mass spectrum.
>
> **Data.** A mass spectrum gives fragment frequencies by molecular weight from 1 up to the compound's weight; peaks are frequent fragments and there are many zeros. Database: known structure and spectra of 30,000 compounds. Molecular weight ranged from 30 to over 10,000, so $\mathbf x$ has **variable dimensionality**. Response: $y=1$ contains chlorine, $y=2$ does not.
>
> **Validation design.** Random split into a 25,000-compound training set and a 5,000-compound test set.
>
> **Method.** Linear then quadratic discriminant analysis were tried and were hard to adapt to variable dimensionality. Breiman turned to decision trees. The known hallmarks of chlorine in mass spectra were researched and encoded as **a set of 1,500 yes-no questions** applicable to a spectrum of any dimensionality, and these were the candidate splits.
>
> **Outcome.** A decision tree with 95% accuracy on both chlorines and non-chlorines (Breiman, Friedman, Olshen and Stone 1984).
^ex-chlorine

> [!definition] §3.3 Five perceptions on statistical analysis (p. 201)
> Breiman's perceptions on leaving consulting:
> - (a) Focus on finding a good solution — "that's what consultants get paid for."
> - (b) Live with the data before you plunge into modeling.
> - (c) Search for a model that gives a good solution, either algorithmic or data.
> - (d) Predictive accuracy on test sets is the criterion for how good the model is.
> - (e) Computers are an indispensable partner.
^def-five-perceptions

### §4 Return to the university (p. 202)

A prominent Berkeley statistician visiting in the late 1970s, on hearing about decision trees, asked first: "What's the model for the data?"

**§4.1 Statistical research.** Reading the *Annals of Statistics*, Breiman found every article starting with "Assume that the data are generated by the following model: ..." followed by mathematics on inference, testing and asymptotics. He places himself "at the very low end of the spectrum" on the usefulness of that theory for data science, while naming wavelet theory as a gem combining theory and applications. In *JASA* applications, virtually every article contains the same "Assume that the data are generated..." statement. He is "deeply troubled by the current and past use of data models in applications, where quantitative conclusions are drawn and perhaps policy decisions made."

## Examples

> [!example] Mapping perception (d) onto weekly media data
> The ozone design — fit on the first five years, test on the last two — is a time-ordered holdout. For weekly marketing data with 156 rows the analogue is fitting on the first 104 weeks and scoring the last 52, not a random 10% split, because the rows are serially dependent. See [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] for when ordinary $k$-fold CV is still valid for autoregressive models, and [[Forecast Evaluation and Backtesting]] for rolling-origin evaluation.
^ex-consulting-projects-2

## Connections

- Perception (d) is the principle behind [[Cross Validation Checking]] and [[Model Selection Using Predictive Performance]].
- The ozone project's cycle of variable selection, adding quadratic terms and interactions, then selecting again is a sequence of data-dependent choices of the kind discussed in [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]]; its honest two-year test set is what exposed the failure.
- Encoding domain knowledge as 1,500 candidate binary features anticipates §10's argument that adding features can help ([[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]).

## See Also
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
- [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]
- [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]
- [[Prediction vs Postdiction]] — why out-of-sample prediction is the stronger test
