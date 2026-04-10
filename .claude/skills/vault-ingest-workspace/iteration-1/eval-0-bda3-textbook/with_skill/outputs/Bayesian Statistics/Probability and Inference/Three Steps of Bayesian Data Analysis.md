---
title: "Three Steps of Bayesian Data Analysis"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.1, pp. 3-4"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on: []
used_by:
  - "[[Bayes Theorem]]"
  - "[[Predictive Distributions]]"
aliases:
  - Bayesian workflow
  - Three steps of BDA
  - Bayesian data analysis process
---

# Three Steps of Bayesian Data Analysis

> [!summary]
> Bayesian data analysis is an iterative process consisting of three steps: (1) setting up a full probability model, (2) conditioning on observed data to compute the posterior distribution, and (3) evaluating the model fit and sensitivity. This cycle is the organizing framework for the entire BDA3 textbook.

## Overview

The process of Bayesian data analysis can be idealized as three steps that are applied iteratively. The essential characteristic of Bayesian methods is the explicit use of probability for quantifying uncertainty in inferences based on statistical data analysis. This distinguishes Bayesian approaches from frequentist methods, which evaluate procedures over hypothetical repetitions rather than conditioning on observed data.

## Main Content

> [!definition] Definition: The Three Steps of Bayesian Data Analysis (BDA3, Ch. 1, Sec. 1.1)
> The process of Bayesian data analysis consists of the following three steps:
>
> **Step 1 — Model specification:** Set up a *full probability model* — a joint probability distribution for all observable and unobservable quantities in the problem. The model should be consistent with knowledge about the underlying scientific problem and the data collection process.
>
> **Step 2 — Conditioning (Posterior computation):** Condition on observed data by calculating and interpreting the appropriate *posterior distribution* — the conditional probability distribution of the unobserved quantities of ultimate interest, given the observed data.
>
> **Step 3 — Model evaluation:** Evaluate the fit of the model and the implications of the resulting posterior distribution: how well does the model fit the data, are the substantive conclusions reasonable, and how sensitive are the results to the modeling assumptions in Step 1? In response, one can alter or expand the model and repeat the three steps.
^def-three-steps

## Examples

> [!example] Example: Iterative Nature of the Three Steps (BDA3, Ch. 1, Sec. 1.1)
> **Setup:** The three steps are explicitly designed to be iterative. If model evaluation (Step 3) reveals problems — such as poor fit, unreasonable conclusions, or high sensitivity to assumptions — the analyst returns to Step 1, modifies the model, and repeats.
>
> **Key insight:** Advances in computational methods (Step 2) have reduced the need to assume correct model specification at the first attempt. The dependence of conclusions on prior distributions can now be examined and explored computationally.

## Connections

- **Step 1** is addressed throughout Parts I and IV-V, where increasingly complex probability models are developed
- **Step 2** is the focus of Part III (Advanced Computation), covering MCMC and other methods for computing posterior distributions
- **Step 3** is treated in Part II (Chapters 6-9), covering model checking, comparison, and decision analysis
- The Bayesian approach facilitates common-sense interpretation of statistical conclusions — a Bayesian interval can be directly interpreted as having a high probability of containing the unknown quantity

## See Also
- [[Bayes Theorem]] — The mathematical foundation for Step 2 (conditioning)
- [[Predictive Distributions]] — Key output used in Step 3 (model checking)
- [[Statistical Notation and Framework]] — Notation conventions for expressing the three steps
