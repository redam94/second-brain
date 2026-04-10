---
title: "Case Studies in Forking Paths"
tags:
  - source/ingested
  - topic/statistics
  - topic/research-methodology
  - topic/social-psychology
  - type/example
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Sections 2.1-2.3, pp. 4-8"
date_ingested: 2026-04-09
folder: "Research/P-Hacking and Multiple Comparisons/Case Studies"
doc_type: paper
depends_on:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Theoretical Framework for Multiple Comparisons]]"
used_by:
  - "[[Solutions for Multiple Comparisons]]"
aliases:
  - forking paths examples
  - p-hacking case studies
---

# Case Studies in Forking Paths

> [!summary]
> Gelman and Loken illustrate the garden of forking paths with three published psychology studies: Petersen et al. (2013) on arm circumference and political attitudes, Bem (2011) on ESP, and Durante et al. (2013) on menstrual cycle and voting. In each case, the researchers had a legitimate theoretical hypothesis but many possible statistical tests could have supported it. The paper emphasizes that these are not accusations of fraud -- the researchers likely followed reasonable scientific practice -- but that the resulting p-values cannot be taken at face value.

## Overview

These case studies demonstrate that even when researchers have clear theoretical motivation and perform only one analysis, the specific analysis they chose was contingent on the data. The goal is not to criticize individual researchers but to illustrate general principles about [[Researcher Degrees of Freedom]].

## Main Content

### Case Study 1: Arm Circumference and Political Attitudes

> [!example] Example: Fat Arms and Political Attitudes (Petersen et al., 2013; discussed pp. 4-5)
> **Setup:** Petersen et al. (2013) claimed that men's upper-body strength, interacted with socioeconomic status, predicts attitudes about economic redistribution. Two of three studies used college students and measured arm circumference, not actual strength.
>
> **Forking paths identified:**
> - The authors reported a significant *interaction* with no significant main effect. Had they found a main effect, that would have fit the theory equally well.
> - Had they found no main effect and no interaction, they could have examined other interactions (e.g., comparing students with or without older siblings).
> - Arm circumference may be a proxy for age, and indeed when age is controlled, the coefficient for arm circumference disappears.
> - The interaction between arm circumference and socioeconomic status was reported without adjusting for the interaction between age and socioeconomic status -- a critical confound given that political attitudes change around college age.
>
> **Key point:** The statistically significant interaction is one of many possible patterns consistent with the theory. Different data would have led to different but equally plausible comparisons.

### Case Study 2: Evidence for ESP

> [!example] Example: Bem's ESP Experiments (Bem, 2011; discussed pp. 5-6)
> **Setup:** Bem (2011) published evidence for extrasensory perception (precognition) in a top psychology journal, reporting statistically significant results across nine experiments.
>
> **Forking paths identified:**
> - In Experiment 1 (100 students, image visualization), Bem found significance for erotic pictures but not nonerotic ones. Had all images been significant, that would have been reported instead. Had performance been higher for nonerotic pictures, a plausible story about distraction from erotic images could have been constructed.
> - Had there been sex differences, those could have been presented as evidence (the literature supports sex differences in response to erotic stimuli).
> - Had performance been better in the second half vs. first half, it would indicate learning; better in the first half would indicate fatigue.
> - The paper's scientific hypothesis (precognition) maps to many possible statistical hypotheses -- this is a one-to-many mapping.
>
> **Bem's defense:** Bem argued his hypotheses were not exploratory and were derived from prior "presentiment" experiments. Gelman and Loken's counter: even with a non-exploratory scientific hypothesis, the specific statistical test is still data-contingent because multiple statistical patterns would have been consistent with the hypothesis.

### Case Study 3: Menstrual Cycle and Voting

> [!example] Example: Menstrual Cycle and Vote Intentions (Durante et al., 2013; discussed pp. 6-8)
> **Setup:** Durante et al. (2013) published in *Psychological Science* claiming that ovulation had different effects on voting intentions for single vs. married women, with a claimed 20 percentage-point effect size.
>
> **Forking paths identified:**
> - The focus on the interaction between ovulation and marital status is one of many possible comparisons. Various main effects and interactions would also fit the theoretical perspective.
> - Had the data shown the opposite pattern (ovulation correlated with conservative attitudes in single women and liberal attitudes in married women), this could also be explained by the theory (ovulation leading women away from party identification toward biological imperatives).
> - The claimed 20-percentage-point effect size is substantively implausible given that very few people change vote intentions during presidential campaigns.
> - The study had very low power given inexact measurement of fertility from survey responses.
> - Multiple outcome variables were available (vote intention, religiosity, attitudes), demographic controls (age, ethnicity, parenthood), and flexible relationship status categories.
>
> **Key point:** The paper would not have been published without $p < 0.05$ results, and the high multiplicity of potential interactions makes any particular significant finding unreliable.

## Connections

- All three cases illustrate [[Researcher Degrees of Freedom]] in practice
- They are all instances of Procedure #3 from [[Theoretical Framework for Multiple Comparisons]]
- The Beall and Tracy (2013) study discussed in [[Data Processing and Analysis Choices]] provides a parallel comparison to the Durante et al. case
- Proposed solutions to these problems appear in [[Solutions for Multiple Comparisons]]

## See Also

- [[Researcher Degrees of Freedom]] -- the concept these examples illustrate
- [[Data Processing and Analysis Choices]] -- additional examples focusing on data processing
- [[Garden of Forking Paths - Overview]] -- paper overview
