---
title: "Garden of Forking Paths - Overview"
tags:
  - source/ingested
  - topic/statistics
  - topic/research-methodology
  - type/overview
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Full paper, pp. 1-17"
date_ingested: 2026-04-09
folder: "Research/P-Hacking and Multiple Comparisons"
doc_type: paper
depends_on: []
used_by:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Theoretical Framework for Multiple Comparisons]]"
  - "[[Case Studies in Forking Paths]]"
  - "[[Data Processing and Analysis Choices]]"
  - "[[Solutions for Multiple Comparisons]]"
aliases:
  - Gelman and Loken 2013
  - Garden of Forking Paths
  - p-hacking paper
---

# Garden of Forking Paths - Overview

> [!summary]
> Gelman and Loken (2013) argue that the multiple comparisons problem arises even when researchers perform only a single analysis on their data, because the analysis choices are contingent on the observed data. The key contribution is distinguishing between deliberate "fishing" (testing many hypotheses) and the subtler problem of data-contingent analysis decisions that create a large space of *potential* comparisons. This reframes p-hacking as a structural problem in research methodology rather than researcher misconduct.

## Paper Metadata

- **Title:** The garden of forking paths: Why multiple comparisons can be a problem, even when there is no "fishing expedition" or "p-hacking" and the research hypothesis was posited ahead of time
- **Authors:** Andrew Gelman (Columbia University) and Eric Loken (Penn State University)
- **Date:** 14 November 2013
- **Field:** Statistics / Research Methodology

## Research Question

How can the multiple comparisons problem undermine statistical claims even when researchers perform only one analysis and do not engage in deliberate p-hacking or fishing expeditions?

## Key Contribution

The paper introduces the metaphor of a "garden of forking paths" to describe how data-contingent analysis choices create an invisible multiplicity problem. Even though researchers only walk one path through the garden, the existence of many alternative paths they *could have* taken invalidates the nominal p-value.

## Paper Structure

The paper is organized into four main sections, each mapped to a note in this folder:

| Section | Topic | Note |
|---------|-------|------|
| 1. Multiple comparisons | Theoretical framework distinguishing four testing procedures | [[Theoretical Framework for Multiple Comparisons]] |
| 2. Main effects vs. interactions | Case studies demonstrating forking paths in published research | [[Case Studies in Forking Paths]] |
| 3. Data processing choices | How data exclusion, coding, and combining studies create hidden multiplicity | [[Data Processing and Analysis Choices]] |
| 4. Discussion | Proposed solutions including preregistration, replication, and Bayesian approaches | [[Solutions for Multiple Comparisons]] |

## Core Concept

The central concept is [[Researcher Degrees of Freedom]] -- the idea that even a single, seemingly predetermined analysis is actually one path through a garden of many possible analyses. The key formal distinction is between:

- **Procedure #2**: Preregistered test $T(y; \phi)$ with fixed $\phi$ -- the claimed standard
- **Procedure #3**: Data-contingent test $T(y; \phi(y))$ where $\phi$ depends on $y$ -- what actually happens
- **Procedure #4**: Deliberate fishing across $J$ tests -- what researchers are often accused of

The paper's main claim is that researchers are doing #3 while thinking they are doing #2, and critics accuse them of doing #4.

## Connections

- Builds on Simmons, Nelson, and Simonsohn (2011) who coined "researcher degrees of freedom"
- Related to the replication crisis in psychology and social sciences
- Connects to Bayesian approaches as an alternative framework ([[Solutions for Multiple Comparisons]])
- The "garden of forking paths" metaphor is borrowed from Borges (1941)

## See Also

- [[Theoretical Framework for Multiple Comparisons]] -- formal statistical framework
- [[Researcher Degrees of Freedom]] -- the core concept
- [[Case Studies in Forking Paths]] -- worked examples from published papers
- [[Data Processing and Analysis Choices]] -- how data processing creates hidden multiplicity
- [[Solutions for Multiple Comparisons]] -- proposed remedies
