---
title: "Statistical Notation and Framework"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
source_location: "Ch. 1, Sec. 1.2, pp. 4-6"
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Probability and Inference"
doc_type: textbook
depends_on: []
used_by:
  - "[[Bayes Theorem]]"
  - "[[Exchangeability]]"
  - "[[Predictive Distributions]]"
  - "[[Likelihood and Odds Ratios]]"
aliases:
  - BDA3 notation
  - Statistical inference notation
---

# Statistical Notation and Framework

> [!summary]
> BDA3 establishes a consistent notation framework: $\theta$ for unobservable parameters, $y$ for observed data, $\tilde{y}$ for future observables, and $x$ or $X$ for explanatory variables. The section also introduces the key concepts of estimands, observational units, exchangeability, and hierarchical modeling as the structural building blocks of Bayesian analysis.

## Overview

Statistical inference is concerned with drawing conclusions from numerical data about quantities that are not observed. The BDA3 notation system provides a compact, flexible language for expressing all components of a Bayesian model. Understanding this notation is prerequisite to reading any formal content in the book.

## Main Content

> [!definition] Definition: Parameters, Data, and Predictions (BDA3, Ch. 1, Sec. 1.2)
> - $\theta$ denotes unobservable vector quantities or population **parameters** of interest
> - $y$ denotes the **observed data**
> - $\tilde{y}$ denotes unknown, but potentially observable, quantities (**predictions**)
> - $x$ (or $X$ for a matrix) denotes **explanatory variables** (covariates/predictors)
>
> **Convention:** Greek letters for parameters, lower case Roman for observed/observable scalars and vectors, upper case Roman for observed/observable matrices. Vectors are column vectors; if $u$ has $n$ components, then $u^T u$ is a scalar and $u u^T$ is an $n \times n$ matrix.
^def-notation

> [!definition] Definition: Estimands (BDA3, Ch. 1, Sec. 1.2)
> **Estimands** are unobserved quantities for which statistical inferences are made. There are two kinds:
> 1. **Potentially observable quantities** — future observations of a process, or outcomes under a treatment not received
> 2. **Parameters** — quantities not directly observable that govern the hypothetical process leading to observed data (e.g., regression coefficients)
>
> The distinction between these two kinds is not always precise but is useful for understanding how a statistical model relates to the real world.
^def-estimands

> [!definition] Definition: Probability Notation (BDA3, Ch. 1, Sec. 1.3)
> - $p(\cdot|\cdot)$ denotes a conditional probability density, with arguments determined by context
> - $p(\cdot)$ denotes a marginal distribution
> - The same notation is used for continuous density functions and discrete probability mass functions
> - For named distributions: $\theta \sim \text{N}(\mu, \sigma^2)$ or $p(\theta) = \text{N}(\theta|\mu, \sigma^2)$
> - $\text{N}(\mu, \sigma^2)$ denotes a random variable distribution; $\text{N}(\theta|\mu, \sigma^2)$ denotes a density function
> - $\Pr(\cdot)$ is used for probabilities of events, e.g., $\Pr(\theta > 2) = \int_{\theta > 2} p(\theta) d\theta$
>
> Additional expressions for random variables $\theta$:
> - **Coefficient of variation:** $\text{sd}(\theta)/\text{E}(\theta)$
> - **Geometric mean:** $\exp(\text{E}[\log(\theta)])$
> - **Geometric standard deviation:** $\exp(\text{sd}[\log(\theta)])$
^def-probability-notation

> [!definition] Definition: Observational Units and Variables (BDA3, Ch. 1, Sec. 1.2)
> Data are gathered on each of a set of $n$ objects or **units**, and the data can be written as a vector $y = (y_1, \ldots, y_n)$. If several variables are measured on each unit, then each $y_i$ is a vector, and the entire dataset $y$ is a matrix (usually with $n$ rows). The $y$ variables are called the **outcomes** and are considered random in the sense that we allow for the possibility that observed values could have turned out otherwise.
^def-observational-units

## Connections

- The notation framework is used consistently throughout all 23 chapters and appendices of BDA3
- The distinction between $\theta$ (parameters) and $\tilde{y}$ (predictions) maps directly to the two types of estimands
- Explanatory variables $x$ become central in Part IV (Regression Models, Chapters 14-18)
- The concept of **hierarchical modeling** (mentioned in Sec. 1.2) receives full treatment in Chapter 5

## See Also
- [[Exchangeability]] — The key modeling assumption that justifies treating units as arising from a common distribution
- [[Bayes Theorem]] — Uses this notation to express the central inference formula
- [[Predictive Distributions]] — Defines the distribution of $\tilde{y}$ using this notation
