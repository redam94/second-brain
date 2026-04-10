---
title: "Probability as a Measure of Uncertainty"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.5, pp. 11-13"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on:
  - "[[Bayes Theorem]]"
  - "[[Statistical Notation and Framework]]"
used_by:
  - "[[Discrete Bayesian Examples]]"
aliases:
  - Subjective probability
  - Foundations of probability
  - Bayesian probability interpretation
---

# Probability as a Measure of Uncertainty

> [!summary]
> BDA3 adopts a pragmatic view of probability as a measure of uncertainty that is empirical and measurable, rather than purely subjective or purely frequentist. Probability statements express the analyst's uncertainty about unknown quantities conditional on available information, and their calibration can be assessed through observed frequencies in comparable situations.

## Overview

The foundations of probability in Bayesian statistics are the subject of philosophical debate. BDA3 takes a practical position: probability is used to quantify uncertainty about unknown quantities, and the quality of probability assessments can be evaluated by their calibration -- how well predicted probabilities match observed frequencies in practice. This section (1.5) provides the philosophical grounding for the Bayesian approach used throughout the text.

## Main Content

### The Bayesian Interpretation

In the Bayesian framework, probability statements represent the analyst's state of knowledge or uncertainty about quantities that are unknown. These statements:

- Are **conditional** on all available information and modeling assumptions
- Can be applied to **any** uncertain quantity, including one-time events, model parameters, and future observations
- Are **subjective** in the sense that they depend on the model and prior, but **objective** in the sense that their calibration can be checked empirically

### Probability as Empirical and Measurable

BDA3 (Sections 1.4-1.7) presents the view that probability is empirical and measurable. This means:

1. **Calibration checking:** If an analyst assigns probability 0.7 to a class of events, then approximately 70% of such events should actually occur
2. **Prior probabilities** can come from databases of frequencies (as in the spelling correction example) or from substantive knowledge
3. **The quality of probability assignments can be assessed** through comparison with observed outcomes

### Contrast with Other Interpretations

| Interpretation | Probability represents | Testable? |
|---------------|----------------------|-----------|
| **Frequentist** | Long-run frequency in repeated experiments | Only for repeatable events |
| **Subjective Bayesian** | Degree of belief of a rational agent | Through coherence axioms |
| **BDA3 pragmatic** | Uncertainty quantification, empirically calibrated | Through calibration checks |

## Connections

- This philosophical position underpins the entire approach of BDA3, which freely assigns probabilities to parameters, hypotheses, and predictions
- The calibration perspective connects to **posterior predictive checking** (Chapter 6), where model-implied probabilities are compared to observed data
- The practical orientation means BDA3 avoids foundational debates in favor of demonstrating that Bayesian methods produce useful, well-calibrated inferences
- The spelling correction example in [[Discrete Bayesian Examples]] illustrates how prior probabilities from frequency databases can be assessed for appropriateness

## See Also
- [[Bayes Theorem]] — The computational machinery that operates on these probability assignments
- [[Three Steps of Bayesian Data Analysis]] — Step 3 (model evaluation) connects to calibration assessment
- [[Discrete Bayesian Examples]] — Concrete examples of probability as uncertainty
