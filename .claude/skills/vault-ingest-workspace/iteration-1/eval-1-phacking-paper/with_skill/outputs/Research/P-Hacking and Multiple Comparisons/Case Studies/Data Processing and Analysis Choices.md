---
title: "Data Processing and Analysis Choices"
tags:
  - source/ingested
  - topic/statistics
  - topic/research-methodology
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Section 3, pp. 8-10"
date_ingested: 2026-04-09
folder: "Research/P-Hacking and Multiple Comparisons/Case Studies"
doc_type: paper
depends_on:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Case Studies in Forking Paths]]"
used_by:
  - "[[Solutions for Multiple Comparisons]]"
aliases:
  - data processing multiplicity
  - data exclusion choices
  - coding choices
---

# Data Processing and Analysis Choices

> [!summary]
> Beyond the choice of which comparison to report, researcher degrees of freedom also arise in data processing decisions: which observations to exclude, how to code variables, how to define time periods, and whether to combine or separate studies. Gelman and Loken illustrate these forms of multiplicity through a detailed analysis of Beall and Tracy (2013), showing how seemingly reasonable and theory-driven data processing choices are actually data-contingent and create hidden multiplicity.

## Overview

Section 3 of the paper shifts focus from the choice of *which statistical comparison* to report (Section 2) to choices made *before* the comparison is even specified. These upstream decisions -- data exclusion rules, variable coding, period definitions -- are a separate and often overlooked source of researcher degrees of freedom.

## Main Content

### Data Exclusion Rules

> [!example] Example: Inconsistent Inclusion Criteria (Beall & Tracy, 2013; discussed pp. 8-9)
> **Setup:** Beall and Tracy (2013) reported that women at peak fertility were three times more likely to wear red or pink shirts.
>
> **Exclusion problems:**
> - In their second sample, 9 of 24 women did not meet the inclusion criterion of being within 5 days of menses onset, but were included anyway
> - 22% of the first sample also did not meet this criterion
> - The first sample was supposed to be restricted to women under 40, but ages ranged up to 47
> - 31% of all participants were excluded for "not providing sufficient precision and confidence" in their answers, but precision of date recall varies with time elapsed
>
> **Key point:** Each exclusion decision is a fork in the garden. Different exclusion rules would yield different datasets and potentially different results.

### Variable Coding Choices

> [!example] Example: Color Categories and Cycle Day Definitions (Beall & Tracy, 2013; discussed pp. 8-9)
> **Setup:** The study needed to define both "peak fertility" (which days of the menstrual cycle) and "red/pink clothing" (which colors to count).
>
> **Color coding forks:**
> - The authors found significance after combining red and pink. Significance for red alone, or pink alone, would have fit the theory equally well.
> - Had the data shown significance for pink but not red, the researchers could have cited the theory about pinkish skin tones in attractive faces.
> - Had white and gray emerged as significant, one could argue that bland colors serve to highlight pinkish skin tones.
>
> **Cycle day forks:**
> - Beall and Tracy defined "peak fertility" as days 6-14 of a 28-day cycle
> - Medical sources (womenshealth.gov) place peak fertility at days 10-17; babycenter.com says days 12-17
> - The authors said days 6-14 was "standard practice," but other researchers in the same field (Durante et al., 2013) used days 7-14 and excluded different day ranges entirely
> - Had significance appeared for a different day range, the researchers could have cited whichever medical source supported that range
>
> **Interpretation:** The specific definitions chosen were data-contingent even though each could be justified by existing literature.

### Combining Information from Separate Studies

> [!example] Example: Pooling vs. Separating Samples (Beall & Tracy, 2013; discussed p. 10)
> **Setup:** Beall and Tracy had two samples (internet adults, college students) and reported their pattern as significant in both.
>
> **Forking paths in study combination:**
> - A pattern in just one group could have been notable given the different ages of participants
> - A striking but not-quite-significant pattern in each sample could have justified combining samples or collecting a third
> - The option to pool data, separate data, analyze interactions between studies, or contrast studies provides a large space of possible analyses
>
> **Comparison with Durante et al.:** Working on a similar topic with similar methods, Durante et al. reported a significant *interaction* rather than a main effect, and used different day ranges and exclusion rules. In the garden of forking paths, both sets of choices are reasonable, but the existence of both paths undermines the significance of either.

### The Beall-Tracy / Durante Parallel

The paper highlights a striking comparison: two research groups studying similar phenomena (women's behavior and the menstrual cycle), published in the same journal in the same year, made completely different data-analytic choices:

| Decision | Beall & Tracy (2013) | Durante et al. (2013) |
|----------|---------------------|----------------------|
| Main finding | Main effect | Interaction (single vs. married) |
| Fertility days | Days 6-14 | Days 7-14 |
| Excluded days | Other days included | Days 1-6, 15-16, 26-28 excluded |
| Day 0 definition | Defined | Not defined |
| Sample type | College students + internet | Internet participants |
| Pre-registration | No | No |

Both sets of choices appear reasonable, but neither was pre-specified. Different data would have led to different but equally defensible choices.

## Connections

- These examples extend the concept of [[Researcher Degrees of Freedom]] beyond comparison choice to data processing
- The Beall-Tracy and Durante studies are also discussed as comparison choices in [[Case Studies in Forking Paths]]
- Solutions including preregistration of data processing protocols appear in [[Solutions for Multiple Comparisons]]

## See Also

- [[Case Studies in Forking Paths]] -- examples focused on comparison choice
- [[Researcher Degrees of Freedom]] -- the overarching concept
- [[Solutions for Multiple Comparisons]] -- how to address these issues
