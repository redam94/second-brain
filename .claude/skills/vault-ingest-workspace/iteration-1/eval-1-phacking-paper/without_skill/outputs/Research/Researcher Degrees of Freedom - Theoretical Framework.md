---
title: "Researcher Degrees of Freedom: Theoretical Framework"
type: methodology
tags:
  - statistics
  - methodology
  - hypothesis-testing
  - frequentist-statistics
source-paper: "[[Gelman and Loken 2013 - The Garden of Forking Paths]]"
---

# Researcher Degrees of Freedom: Theoretical Framework

From [[Gelman and Loken 2013 - The Garden of Forking Paths]], Section 1.2.

## Framework

The paper considers the statistical properties of hypothesis tests under hypothetical replications of the data. It identifies four testing procedures on a spectrum from fully pre-specified to explicitly exploratory:

### Procedure 1: Simple Classical Test
- A unique test statistic T applied to observed data y, yielding T(y)
- Fully pre-specified, no ambiguity

### Procedure 2: Pre-registered Classical Test
- T(y; phi), where phi is a set of analysis decisions (control variables, transformations, coding rules, which effects to test) chosen *before* seeing data
- The "gold standard" that researchers often believe they are doing

### Procedure 3: Researcher Degrees of Freedom (Without Fishing)
- T(y; phi(y)), where the function phi depends on the observed data
- Only one test is computed, but the choice of *which* test was data-contingent
- **This is what the paper argues researchers are actually doing**

### Procedure 4: Fishing / P-Hacking
- Computing T(y; phi_j) for j = 1,...,J -- running many tests and reporting the best
- **This is what critics are often perceived as accusing researchers of**

## The Core Confusion

The paper's central claim is that the debate over [[P-Hacking]] is confused because:
- Researchers assert they are not doing Procedure 4 (fishing)
- The implication is that they are doing Procedure 2 (pre-registered)
- But they are actually doing Procedure 3 (data-contingent single analysis)
- Procedure 3 has the same statistical problems as Procedure 4 from a frequentist perspective

## Why Procedure 3 Is Problematic

P-values are defined by averaging over all possible data that could have been observed. If the analysis would have been different under different data, then the effective number of comparisons is large even though only one was performed. The p-value from procedure 3 cannot be interpreted at face value because it does not account for the full [[Garden of Forking Paths]].

## Frequentist Logic

The paradoxical nature of this argument is inherent to frequentist reasoning: if you accept the p-value framework, you must consider what would have happened under alternative data realizations. This applies equally whether the researcher performed many tests or just one data-contingent test.

## Related

- [[Researcher Degrees of Freedom]]
- [[Garden of Forking Paths]]
- [[Multiple Comparisons Problem]]
- [[Statistical Significance]]
- [[Pre-registration]]
