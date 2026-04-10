---
title: "BDA3 - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/overview
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Preface, pp. xiii-xiv; Part I intro, p. 1"
date_ingested: 2026-04-09
folder: "Bayesian Statistics"
doc_type: textbook
aliases:
  - Bayesian Data Analysis Third Edition
  - BDA3
  - Gelman et al. 2021
---

# Bayesian Data Analysis, Third Edition - Overview

> [!summary]
> BDA3 by Gelman, Carlin, Stern, Dunson, Vehtari, and Rubin is a comprehensive textbook on Bayesian inference covering fundamentals, computation, regression models, and nonparametric methods. It serves as an introductory text, a graduate reference, and a handbook for applied Bayesian statistics. The book emphasizes practical application and stochastic simulation over pure theory.

## Overview

**Bayesian Data Analysis** (Third Edition, with errors fixed as of February 2025) is authored by Andrew Gelman (Columbia), John B. Carlin (Melbourne), Hal S. Stern (UC Irvine), David B. Dunson (Duke), Aki Vehtari (Aalto), and Donald B. Rubin (Harvard).

The book is organized into five parts plus appendices, covering the full arc from foundational probability to advanced nonparametric modeling.

## Book Structure

### Part I: Fundamentals of Bayesian Inference (Chapters 1-5)
- **[[Three Steps of Bayesian Data Analysis]]** — The iterative cycle of model building, conditioning, and evaluation
- **[[Bayes Theorem]]** — The core mathematical machinery
- **[[Exchangeability]]** — The foundational modeling assumption
- Chapter 2: [[Single-Parameter Models]] (not yet ingested)
- Chapter 3: [[Introduction to Multiparameter Models]] (not yet ingested)
- Chapter 4: [[Asymptotics and Non-Bayesian Connections]] (not yet ingested)
- Chapter 5: [[Hierarchical Models]] (not yet ingested)

### Part II: Fundamentals of Bayesian Data Analysis (Chapters 6-9)
- Model checking, evaluating/comparing models, data collection modeling, decision analysis

### Part III: Advanced Computation (Chapters 10-13)
- Bayesian computation, MCMC, Hamiltonian Monte Carlo, modal/distributional approximations

### Part IV: Regression Models (Chapters 14-18)
- Regression, hierarchical linear models, GLMs, robust inference, missing data

### Part V: Nonlinear and Nonparametric Models (Chapters 19-23)
- Nonlinear models, basis functions, Gaussian processes, finite mixtures, Dirichlet processes

### Appendices
- A: Standard probability distributions
- B: Outline of proofs of limit theorems
- C: Computation in R and Stan

## Scope of This Ingestion

This ingestion covers **pages 1-20 of the PDF**, corresponding to:
- Table of Contents
- Preface
- Part I introduction
- **Chapter 1: Probability and Inference** (Sections 1.1-1.4)

### Notes Created from Chapter 1

| Section | Note | Key Content |
|---------|------|-------------|
| 1.1 | [[Three Steps of Bayesian Data Analysis]] | The three-step iterative process |
| 1.2 | [[Statistical Notation and Framework]] | Notation conventions, estimands, observational units |
| 1.2 | [[Exchangeability]] | Exchangeability definition and its role |
| 1.3 | [[Bayes Theorem]] | Bayes' rule, posterior, prior, likelihood |
| 1.3 | [[Predictive Distributions]] | Prior and posterior predictive distributions |
| 1.3 | [[Likelihood and Odds Ratios]] | Likelihood function, likelihood principle, odds |
| 1.4 | [[Discrete Bayesian Examples]] | Genetics and spelling correction worked examples |

## Connections

The book's practical orientation emphasizes stochastic simulation and the combination of mathematical analysis and simulation as general methods for summarizing distributions. It treats probability as empirical and measurable (Sections 1.4-1.7), departing from purely subjective or purely frequentist interpretations.

## See Also
- [[Statistical Notation and Framework]] — Notation conventions used throughout BDA3
- [[Bayes Theorem]] — The central theorem of the entire text
- [[Three Steps of Bayesian Data Analysis]] — The iterative workflow the book is built around
