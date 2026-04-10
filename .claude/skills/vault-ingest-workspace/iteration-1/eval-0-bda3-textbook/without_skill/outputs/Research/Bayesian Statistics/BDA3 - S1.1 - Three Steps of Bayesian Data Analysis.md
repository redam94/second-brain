---
title: "Section 1.1: The Three Steps of Bayesian Data Analysis"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
section: 1.1
tags:
  - source/textbook/section
  - topic/bayesian-statistics
  - topic/methodology
created: 2026-04-09
---

# Section 1.1: The Three Steps of Bayesian Data Analysis

> [!info] Part of [[BDA3 - Ch01 - Probability and Inference]]

## Overview

Bayesian data analysis is concerned with making inferences from data using probability models for observed and unobserved quantities. The essential characteristic of Bayesian methods is the explicit use of probability for quantifying uncertainty in inferences.

## The Three Steps

> [!abstract] Definition: Three Steps of Bayesian Data Analysis
>
> 1. **Setting up a full probability model** -- a joint probability distribution for all observable and unobservable quantities in a problem. The model should be consistent with knowledge about the underlying scientific problem and the data collection process.
>
> 2. **Conditioning on observed data** -- calculating and interpreting the appropriate [[Posterior Distribution|posterior distribution]], the conditional probability distribution of the unobserved quantities of ultimate interest, given the observed data.
>
> 3. **Evaluating the fit of the model** -- how well does the model fit the data, are the substantive conclusions reasonable, and how sensitive are the results to the modeling assumptions in step 1? In response, one can alter or expand the model and repeat the three steps.

## Key Points

- The first step remains a major stumbling block: where do our models come from?
- The second step involves computational methodology
- The third step requires a delicate balance of technique and judgment, guided by the applied context
- The dependence on "subjective" prior distributions can be examined and explored through step 3
- A primary motivation for Bayesian thinking is that it facilitates common-sense interpretation of statistical conclusions (e.g., a Bayesian interval can be directly interpreted as having a high probability of containing the unknown quantity)

## Connections

- Step 1 relates to [[Prior Distribution]] specification
- Step 2 is operationalized through [[Bayes' Theorem]]
- Step 3 connects to [[BDA3 - Ch06 - Model Checking]] and [[Posterior Predictive Checking]]
