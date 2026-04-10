---
title: "Researcher Degrees of Freedom"
tags:
  - source/ingested
  - topic/statistics
  - topic/research-methodology
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Sections 1.1, 2, 3, pp. 1-10"
date_ingested: 2026-04-09
folder: "Research/P-Hacking and Multiple Comparisons"
doc_type: paper
depends_on:
  - "[[Theoretical Framework for Multiple Comparisons]]"
used_by:
  - "[[Case Studies in Forking Paths]]"
  - "[[Data Processing and Analysis Choices]]"
  - "[[Solutions for Multiple Comparisons]]"
aliases:
  - researcher degrees of freedom
  - garden of forking paths
  - forking paths
  - data-contingent analysis
---

# Researcher Degrees of Freedom

> [!summary]
> Researcher degrees of freedom refer to the many choices available in data analysis -- what to measure, how to code variables, which cases to exclude, which comparisons to report -- that are not predetermined but are contingent on the observed data. The "garden of forking paths" metaphor captures how each data-dependent choice creates a branching point, and the resulting multiplicity invalidates nominal p-values even when the researcher performs only a single test and has no intent to fish for results.

## Overview

The term "researcher degrees of freedom" was coined by Simmons, Nelson, and Simonsohn (2011). Gelman and Loken's contribution is to emphasize that the problem does not require conscious fishing or p-hacking. The problem is structural: reasonable scientific judgment applied to a particular dataset will naturally produce different analyses for different datasets, creating hidden multiplicity.

## Main Content

> [!definition] Definition: Researcher Degrees of Freedom (Simmons et al., 2011; Gelman & Loken, 2013)
> **Researcher degrees of freedom** are the set of choices available to a researcher during data analysis that are not fixed by the research design or preregistered protocol. These include:
> - Which statistical test to perform
> - What data to exclude or include
> - What measures to study
> - What interactions to consider
> - How to code or transform variables
> - How to define comparison groups
> - Whether to combine or separate studies
> - Which covariates to control for
>
> When these choices are made after seeing the data, the analysis is Procedure #3 in the [[Theoretical Framework for Multiple Comparisons|four-procedure taxonomy]], even if only one test is performed.
^def-researcher-dof

> [!definition] Definition: The Garden of Forking Paths (Gelman & Loken, 2013)
> The **garden of forking paths** is a metaphor (from Borges, 1941) for the space of all possible data analyses that a researcher could reasonably have conducted. Each data-dependent decision creates a fork. The researcher walks only one path, but from a frequentist perspective, the existence of many possible paths inflates the effective number of comparisons.
>
> Formally, the researcher computes $T(y; \phi(y))$ where the decision function $\phi(\cdot)$ maps data to analysis choices. The "garden" is the range of $\phi$ across all possible datasets.
^def-garden

### Categories of Researcher Degrees of Freedom

The paper identifies several categories of choices that create forking paths:

| Category | Examples | See |
|----------|----------|-----|
| **Choice of comparison** | Main effect vs. interaction, which subgroups to compare | [[Case Studies in Forking Paths]] |
| **Data exclusion** | Which participants to drop, age cutoffs, inclusion criteria | [[Data Processing and Analysis Choices]] |
| **Variable coding** | How to define categories, scale construction, item selection | [[Data Processing and Analysis Choices]] |
| **Combining studies** | Pool vs. separate, which samples to include | [[Data Processing and Analysis Choices]] |
| **Measurement choices** | Which outcome variable, which covariates | [[Case Studies in Forking Paths]] |

### Why It Doesn't Feel Like Fishing

A critical feature of researcher degrees of freedom is that each choice feels inevitable to the researcher:
- Conditional on the observed data, each step of the analysis appears deterministic
- The choices are guided by scientific common sense and substantive theory
- Only by considering what would have happened with different data does the multiplicity become apparent
- The researcher has no sense of having "chosen" among alternatives

This is what makes the problem distinct from deliberate p-hacking and harder to recognize or address.

## Connections

- The concept is formalized in [[Theoretical Framework for Multiple Comparisons]] as Procedure #3
- Concrete illustrations appear in [[Case Studies in Forking Paths]]
- Data processing as a source of degrees of freedom is covered in [[Data Processing and Analysis Choices]]
- Proposed remedies are discussed in [[Solutions for Multiple Comparisons]]
- Related to Simmons et al. (2011) "false-positive psychology" and the broader replication crisis

## See Also

- [[Theoretical Framework for Multiple Comparisons]] -- formal framework
- [[Garden of Forking Paths - Overview]] -- paper overview
- [[Case Studies in Forking Paths]] -- examples illustrating the concept
