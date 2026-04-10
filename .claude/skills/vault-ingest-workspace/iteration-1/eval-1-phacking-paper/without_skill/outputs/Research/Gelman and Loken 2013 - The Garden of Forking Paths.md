---
title: "The Garden of Forking Paths: Why Multiple Comparisons Can Be a Problem, Even When There Is No 'Fishing Expedition' or 'P-Hacking'"
authors:
  - "[[Andrew Gelman]]"
  - "[[Eric Loken]]"
date: 2013-11-14
year: 2013
type: paper
tags:
  - statistics
  - methodology
  - p-hacking
  - replication-crisis
  - multiple-comparisons
  - research-methods
status: reviewed
source: "Research/raw/p_hacking.pdf"
---

# The Garden of Forking Paths

**Authors:** [[Andrew Gelman]] (Columbia University) and [[Eric Loken]] (Penn State University)
**Date:** November 14, 2013

## Abstract

The paper argues that [[Researcher Degrees of Freedom]] can produce a [[Multiple Comparisons Problem]] even when researchers perform only a single analysis on their data. The key insight is that a large number of *potential* comparisons exist when analysis details are contingent on the observed data, without the researcher consciously fishing or examining multiple p-values.

## Core Argument

The central thesis is that the problem of multiple comparisons does not require deliberate "[[P-Hacking]]" or "fishing." Instead, the authors identify a subtler mechanism: researchers make data-contingent analysis choices that *feel* deterministic but actually represent one path through a "[[Garden of Forking Paths]]" of possible analyses. Each alternative dataset could have led to a different but equally reasonable analysis, each yielding its own statistically significant result.

### The Metaphor

The title references Borges's 1941 story about a labyrinth that branches through time. Similarly, data analysis involves branching decision points where each choice (what to exclude, which interactions to test, how to code variables) forecloses other paths. The researcher walks one path but the full garden must be considered when evaluating statistical evidence.

## Theoretical Framework

The paper distinguishes four testing procedures (see [[Researcher Degrees of Freedom - Theoretical Framework]]):

1. **Simple classical test** -- a unique pre-specified test statistic T(y)
2. **Pre-registered classical test** -- T(y; phi) with phi chosen before seeing data
3. **Researcher degrees of freedom without fishing** -- T(y; phi(y)), where the analysis choice phi depends on the observed data y, but only one test is run
4. **Explicit fishing** -- computing T(y; phi_j) for j = 1,...,J and reporting the best

The paper's central claim is that researchers are doing **procedure 3**, but the confusion is that critics think they are accusing researchers of doing **procedure 4**, while researchers themselves believe they are doing **procedure 2**. The paper focuses on why procedure 3 is problematic even though it involves only a single analysis.

## Case Studies

The paper examines several published studies to illustrate how researcher degrees of freedom operate in practice:

### 1. [[Case Study - Fat Arms and Political Attitudes]]
Petersen et al. (2013) claimed upper-body strength interacts with socioeconomic status to predict attitudes about economic redistribution. The authors show numerous forking paths in choice of main effects vs. interactions, demographic subgroups, and measures.

### 2. [[Case Study - ESP and Bem 2011]]
Bem's (2011) claim of evidence for extrasensory perception. Despite Bem's insistence that hypotheses were not exploratory, a single scientific hypothesis maps to multiple statistical hypotheses, creating hidden multiplicity.

### 3. [[Case Study - Menstrual Cycle and Vote Intentions]]
Durante, Arsena, and Griskevicius (2013) claimed ovulation affects women's political preferences. The study had enormous flexibility in defining relationship categories, choosing between main effects and interactions, and selecting outcome measures.

### 4. [[Case Study - Red Clothing and Fertility]]
Beall and Tracy (2013) reported women wear red or pink at peak fertility. This case is examined in detail for data exclusion rules, coding choices, color definitions, and cycle day boundaries -- all contingent on data. Compared with Durante et al. (2013) to show how similar studies in the same journal made different data-contingent choices leading to different significant findings.

## Why This Matters

The problem is especially severe in contexts with:
- Small effect sizes
- Small sample sizes
- Large measurement errors
- High variation

In such settings (common in social psychology), multiplicity produces unreliable results even when they reach statistical significance. The problem would be less severe with large real differences, large samples, and low variation.

## Possible Reactions to the Critique

The authors identify three ways researchers might respond:

1. **Concession** -- Accept that published p-values cannot be taken at face value (the response the authors hope for)
2. **Insistence** -- Claim the published analysis was the only one that would have been done regardless of data (the authors find this implausible)
3. **Contingency** -- Acknowledge the analysis would differ with different data, but argue that is how science should work (sympathetic, but undermines the p-value argument)

## Recommendations

- [[Pre-registration]] of data collection and analysis protocols where feasible
- [[Pre-publication Replication]] -- pairing exploratory studies with confirmatory replications using predetermined protocols
- [[Multilevel Modeling]] to analyze all relevant comparisons simultaneously
- Sharper distinction between [[Exploratory vs Confirmatory Research]]
- Awareness that even theory-driven analyses involve data-dependent choices
- Reporting results as exploratory rather than claiming strong confirmatory evidence

## Key Connections

- Relates to [[Replication Crisis]] in psychology and social sciences
- Extends work by [[Simmons Nelson and Simonsohn 2011]] on false-positive psychology
- Connects to [[Bayesian Statistics]] as an alternative framework for evaluating evidence
- Relevant to [[Philosophy of Science]] and the interpretation of [[Statistical Significance]]
- Addresses [[Type S Error]] rates in the context of small studies

## References to Follow Up

- Simmons, Nelson, and Simonsohn (2011) -- "False-positive psychology"
- Button et al. (2013) -- Power failure and reliability in neuroscience
- Nosek, Spies, and Motyl (2013) -- Pre-publication replication example
- Humphreys, Sanchez, and Windt (2013) -- Nonbinding research registration
