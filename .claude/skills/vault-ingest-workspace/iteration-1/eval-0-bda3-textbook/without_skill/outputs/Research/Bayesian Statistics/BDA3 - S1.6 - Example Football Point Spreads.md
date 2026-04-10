---
title: "Section 1.6: Example - Probabilities from Football Point Spreads"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
section: 1.6
tags:
  - source/textbook/section
  - topic/bayesian-statistics
  - topic/probability
  - topic/examples
  - topic/normal-distribution
created: 2026-04-09
---

# Section 1.6: Example - Probabilities from Football Point Spreads

> [!info] Part of [[BDA3 - Ch01 - Probability and Inference]]

## Overview

This example illustrates methods for assigning probabilities to outcomes in professional American football games. It demonstrates three approaches: subjective assessment, empirical frequencies, and parametric probability models.

## Data

- 672 professional football games from 1981, 1983, and 1984 seasons
- For each game: point spread $x$ and actual outcome $y$ (favorite's score minus underdog's score)

## Approach 1: Empirical Frequencies

Direct probability estimates from the data:
- $\Pr(\text{favorite wins}) = 410.5/655 = 0.63$
- $\Pr(\text{favorite wins} \mid x = 3.5) = 36/59 = 0.61$
- $\Pr(\text{favorite wins by more than spread}) = 308/655 = 0.47$
- $\Pr(\text{favorite wins by more than spread} \mid x = 3.5) = 32/59 = 0.54$

**Problem**: Small sample sizes at specific point spreads lead to imprecise probability assignments (e.g., 8.5-point favorites won 5 out of 5 times, but 9-point favorites won 13 of 20).

## Approach 2: Parametric Model

> [!example] Normal Model for Game Outcomes
> Let $d = y - x$ be the difference between outcome and point spread. The data suggest:
> - Sample mean of $d$: $0.07$ (approximately zero)
> - Sample standard deviation of $d$: $13.86$ (approximately 14)
>
> Model:
> $$d \mid x \sim \text{N}(0, 14^2)$$
>
> That is, the game outcome minus the point spread is approximately normally distributed with mean zero and standard deviation 14 points (about two converted touchdowns).

This model assumes:
- The distribution of $d$ is independent of $x$
- The normal distribution is a reasonable approximation
- The model does not fit the data exactly (neither scores nor point spreads are truly continuous)

## Key Takeaway

The parametric model provides a smooth mechanism for computing probabilities at *any* point spread value, overcoming the small-sample problems of pure empirical frequency estimation. This is a general theme in statistics: parametric models allow information to be shared across similar conditions.

## Connections

- Illustrates the practical value of probability models over raw empirical frequencies
- The [[Normal Distribution]] as a modeling tool
- Relates to broader themes of [[BDA3 - S1.5 - Probability as a Measure of Uncertainty]]
- The model-checking perspective on whether the normal model is adequate connects to [[BDA3 - Ch06 - Model Checking]]
