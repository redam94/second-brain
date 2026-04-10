---
title: Statistical Significance
type: concept
tags:
  - statistics
  - methodology
aliases:
  - statistical significance
  - p-value
  - significance testing
---

# Statistical Significance

A result is deemed statistically significant when the observed test statistic falls in the rejection region of a null hypothesis test, typically when p < .05.

## Critique from Garden of Forking Paths

[[Gelman and Loken 2013 - The Garden of Forking Paths]] argue that published p-values cannot generally be taken at face value because:

1. P-values are defined by averaging over all possible datasets that could have been observed
2. If the analysis would have been different under different data ([[Researcher Degrees of Freedom]]), the nominal p-value understates the true false-positive rate
3. The [[Garden of Forking Paths]] means that many roads lead to statistical significance, making any particular significant result less informative than it appears

## Ironic Role

The paper notes an irony: p-values were designed to protect researchers from declaring patterns in noise as truth, but through data-dependent analyses, they are often used to lend credence to noisy claims from small samples. Without modern statistics, nobody would take seriously a claim about a general population based on surveys of 100 internet volunteers and 24 college students -- but with a p-value, such results get published in top journals.

## Related

- [[Multiple Comparisons Problem]]
- [[P-Hacking]]
- [[Bayesian Statistics]]
- [[Gelman and Loken 2013 - The Garden of Forking Paths]]
