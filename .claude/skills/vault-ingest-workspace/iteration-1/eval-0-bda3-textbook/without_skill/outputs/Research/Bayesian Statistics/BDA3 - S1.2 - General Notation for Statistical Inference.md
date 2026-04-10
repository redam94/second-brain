---
title: "Section 1.2: General Notation for Statistical Inference"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
section: 1.2
tags:
  - source/textbook/section
  - topic/bayesian-statistics
  - topic/notation
  - topic/statistical-inference
created: 2026-04-09
---

# Section 1.2: General Notation for Statistical Inference

> [!info] Part of [[BDA3 - Ch01 - Probability and Inference]]

## Overview

This section establishes the notation conventions used throughout BDA3 for parameters, data, predictions, and related concepts.

## Core Notation

| Symbol | Meaning |
|--------|---------|
| $\theta$ | Unobservable vector quantities or population **parameters** |
| $y$ | Observed data |
| $\tilde{y}$ | Unknown but potentially observable quantities (predictions) |
| $x$ or $X$ | Explanatory variables / covariates |
| $n$ | Number of observational units |
| $p(\cdot)$ | Generic density or mass function (context-dependent) |

### Conventions
- Greek letters for **parameters**
- Lower case Roman letters for observed or observable scalars and vectors
- Upper case Roman letters for observed or observable matrices
- Vectors are column vectors: if $u$ has $n$ components, then $u^T u$ is a scalar and $uu^T$ is an $n \times n$ matrix

## Key Concepts

### Observational Units and Variables
- Data are gathered on $n$ objects or *units*
- The $y$ variables are the *outcomes*, considered "random" in the sense that observed values could have turned out otherwise

### Estimands
Two kinds of unobserved quantities for which statistical inferences are made:
1. **Potentially observable quantities** -- future observations, or outcomes under treatments not received
2. **Parameters** -- quantities not directly observable that govern the hypothetical process leading to observed data (e.g., regression coefficients)

### Exchangeability

> [!abstract] Definition: Exchangeability
> The $n$ values $y_i$ may be regarded as *exchangeable* if we express uncertainty as a joint probability density $p(y_1, \ldots, y_n)$ that is invariant to permutations of the indexes.

- A nonexchangeable model would be appropriate if information relevant to the outcome were conveyed in the unit indexes
- Exchangeable data are commonly modeled as independently and identically distributed (*iid*) given some unknown parameter vector $\theta$ with distribution $p(\theta)$
- Exchangeability is fundamental to statistics and recurs throughout the book

### Explanatory Variables
- Variables on each unit not modeled as random, labeled $x$ (also called *covariates* or *predictors*)
- $X$ is a matrix with $n$ rows and $k$ columns for $k$ explanatory variables
- Exchangeability given $x$: the distribution of $y$, given $x$, is the same for all units with the same value of $x$

### Hierarchical Modeling
- [[Hierarchical Models]] (also called *multilevel models*) are used when information is available on several different levels of observational units
- Exchangeability can apply at each level of the hierarchy

## Connections

- [[Exchangeability]] is developed further in [[BDA3 - Ch05 - Hierarchical Models]]
- Explanatory variables are discussed extensively in [[BDA3 - Ch08 - Modeling Accounting for Data Collection]] and regression chapters
