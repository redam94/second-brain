---
title: "Theoretical Framework for Multiple Comparisons"
tags:
  - source/ingested
  - topic/statistics
  - topic/hypothesis-testing
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Section 1.2, pp. 2-3"
date_ingested: 2026-04-09
folder: "Research/P-Hacking and Multiple Comparisons"
doc_type: paper
depends_on: []
used_by:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Case Studies in Forking Paths]]"
  - "[[Solutions for Multiple Comparisons]]"
aliases:
  - four testing procedures
  - testing procedure taxonomy
---

# Theoretical Framework for Multiple Comparisons

> [!summary]
> Gelman and Loken present a taxonomy of four testing procedures that clarifies the distinction between preregistered analysis, data-contingent analysis, and deliberate fishing. The critical insight is that Procedure #3 (data-contingent single test) is functionally equivalent to Procedure #4 (fishing) from a frequentist perspective, even though the researcher experiences only one analysis. This framework grounds the "garden of forking paths" argument in formal statistical terms.

## Overview

The paper adopts a frequentist framework, analyzing the statistical properties of hypothesis tests under hypothetical replications. The key question is: what is the actual Type I error rate when considering all datasets that could have been observed, not just the one that was?

## Main Content

> [!definition] Definition: Test Statistic with Decision Variable (Gelman & Loken, 2013, Sec. 1.2)
> Let $T$ be a test statistic and $y$ the observed data. The general form of a test is $T(y; \phi)$, where $\phi$ represents all analysis decisions: choice of control variables, transformations, data coding/exclusion rules, which main effect or interaction to focus on, etc.
^def-test-statistic

> [!definition] Definition: Four Testing Procedures (Gelman & Loken, 2013, Sec. 1.2)
> 1. **Simple classical test**: A unique test statistic $T$ applied to data, yielding $T(y)$. No choices involved.
> 2. **Preregistered test**: $T(y; \phi)$ with $\phi$ fixed before seeing data. The decision variable is preregistered.
> 3. **Researcher degrees of freedom (without fishing)**: $T(y; \phi(y))$ where the researcher computes a single test, but the choice of *which* test would have been different given different data. The function $\phi(\cdot)$ is observed only for the actual data.
> 4. **Fishing**: $T(y; \phi_j)$ for $j = 1, \ldots, J$ -- performing $J$ tests and reporting the best result, thus $T(y; \phi^{\text{best}}(y))$.
^def-four-procedures

### The Central Claim

The paper's core argument is that researchers are performing Procedure #3, but:
- **Researchers believe** they are doing #2 (preregistered, single analysis)
- **Critics accuse** them of doing #4 (deliberate fishing)
- **The reality** is #3: a single analysis whose specific form is contingent on the observed data

> [!theorem] Theorem: Equivalence of Procedures #3 and #4 (Gelman & Loken, 2013, implicit)
> From a frequentist perspective, Procedure #3 and Procedure #4 produce the same inflation of Type I error rates. If we average over all possible datasets $y$, the fact that $\phi(y)$ varies with $y$ means the researcher is implicitly searching over a large space of possible analyses, even though for any given dataset only one analysis is performed.
>
> **Key implication:** The nominal $p < .05$ threshold is invalid under Procedure #3 because the effective number of comparisons exceeds one, even though only one test was conducted.
^thm-equivalence

### When Multiplicity Matters

The severity of the problem depends on the research context:

- **Worst case**: Small effect sizes, small sample sizes, large measurement errors, high variation -- the typical scenario in social psychology
- **Not a problem**: Large real differences, large samples, small measurement errors, low variation

This connects to the Bayesian argument: a data-based claim is more plausible when the prior probability of a real effect is high and the estimation error is low.

## Examples

> [!example] Example: Democrats vs. Republicans Math Test (Gelman & Loken, 2013, Sec. 1.1, p. 3)
> **Setup:** A researcher studies differences between Democrats and Republicans in a short math test administered in two contexts (health care, military). Party identification is measured on a 7-point scale with demographic information available.
>
> **The forking paths:** From a single research hypothesis (context interacts with partisanship), many possible comparisons emerge:
> - The pattern could appear among men only, or women only
> - It could appear for neither group, but the *difference* could be significant
> - It could appear only when female interviewers administer the test
> - Independents could be excluded, or grouped with one party
> - The focus could be on partisans vs. nonpartisans rather than Democrats vs. Republicans
>
> **Interpretation:** Each of these outcomes is consistent with the research hypothesis, and each would yield a plausible story. The researcher need not consciously search -- the data pattern itself suggests which comparison to report.

## Connections

- The formal framework is grounded in frequentist reasoning about hypothetical replications
- Connects to de Groot's (1956) concept of "trying and selecting" of associations
- The Bayesian alternative framework is discussed in [[Solutions for Multiple Comparisons]]
- Specific applications of this framework appear in [[Case Studies in Forking Paths]]

## See Also

- [[Researcher Degrees of Freedom]] -- the concept this framework formalizes
- [[Garden of Forking Paths - Overview]] -- full paper context
- [[Solutions for Multiple Comparisons]] -- how to address the problem
