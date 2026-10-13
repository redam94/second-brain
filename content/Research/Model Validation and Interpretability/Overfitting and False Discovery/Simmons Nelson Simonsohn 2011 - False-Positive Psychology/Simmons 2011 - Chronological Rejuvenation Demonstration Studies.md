---
title: "Simmons 2011 - Chronological Rejuvenation Demonstration Studies"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - type/example
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons, Nelson & Simonsohn (2011), pp. 1360 ('How Bad Can It Be? A Demonstration of Chronological Rejuvenation': Study 1, Study 2, Discussion; note 1) and p. 1364 ('The Solutions in Action: Revisiting Chronological Rejuvenation', Table 3)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]"
  - "[[Logic of Regression Adjustment]]"
used_by:
  - "[[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]"
  - "[[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]"
aliases:
  - When I'm Sixty-Four study
  - Chronological rejuvenation experiment
  - Simmons 2011 Study 1 and Study 2
  - Simmons 2011 Table 3
---

# Simmons 2011 - Chronological Rejuvenation Demonstration Studies

> [!summary]
> To show that flexibility can "prove" something false, the authors ran two real experiments with University of Pennsylvania undergraduates. **Study 1** (n = 30) "found" that hearing a children's song makes people *feel* older: ANCOVA, F(1, 27) = 5.06, p = .033. **Study 2** (n = 20 as reported) "found" that hearing "When I'm Sixty-Four" makes people *actually younger* by birth date, about 1.5 years: F(1, 17) = 4.92, p = .040. The second hypothesis is necessarily false. Table 3 then re-reports Study 2 with every concealed choice disclosed. The true sample was 34. There was a third condition. Besides birth date and father's age, the authors measured 10 other variables (11 besides birth date, counting father's age), and they peeked roughly every 10 participants. Without the father's-age covariate the effect is F(1, 18) = 1.01, p = .33. The disclosed version would be "all but impossible to publish".
^summary

## Overview

These studies are the paper's **existence proof**. The [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom|simulations]] say how often flexibility produces false positives. These experiments show it happening with real participants, standard statistics and reports that are truthful but incomplete. The authors say "Everything reported here actually happened" (p. 1360). Note 1 explains why they picked an absurd topic: they wanted a research question "that would not implicate any particular field of research."

## Main Content

### Study 1: musical contrast and subjective age (p. 1360)

> [!example] Study 1 as originally reported (p. 1360)
> **Participants.** 30 University of Pennsylvania undergraduates, paid. They sat at computers with headphones.
>
> **Manipulation (random assignment).** Participants heard either a **control song**, "Kalimba" (an instrumental by Mr. Scruff that ships with Windows 7), or a **children's song**, "Hot Potato" by The Wiggles.
>
> **Measures.** In an "ostensibly unrelated survey", participants answered "How old do you feel right now?" on a 5-point scale (very young, young, neither young nor old, old, very old) and reported their **father's age**, used as a covariate "to control for variation in baseline age across participants."
>
> **Result.** ANCOVA: participants felt older after "Hot Potato" (adjusted M = 2.54 years) than after the control song (adjusted M = 2.06 years), **F(1, 27) = 5.06, p = .033**. The paper reports the adjusted means in "years" even though the outcome is a 5-point scale, which looks like part of the joke.
^ex-study1

### Study 2: musical contrast and chronological rejuvenation (p. 1360)

> [!example] Study 2 as originally reported (p. 1360)
> **Aim.** To "conceptually replicate and extend Study 1": if a children's song makes people feel older, does a song about old age make people *actually younger*?
>
> **Participants.** 20 University of Pennsylvania undergraduates (as reported).
>
> **Manipulation.** "When I'm Sixty-Four" by The Beatles vs "Kalimba".
>
> **Measures.** Birth date (mm/dd/yyyy) and father's age (covariate).
>
> **Result.** ANCOVA: by their birth dates, participants were "nearly a year-and-a-half younger" after "When I'm Sixty-Four" (adjusted M = 20.1 years) than after "Kalimba" (adjusted M = 21.5 years), **F(1, 17) = 4.92, p = .040**.
^ex-study2

**Discussion (p. 1360).** The studies "were conducted with real participants, employed legitimate statistical analyses, and are reported truthfully. Nevertheless, they seem to support hypotheses that are unlikely (Study 1) or necessarily false (Study 2)." The authors point impatient readers to Table 3.

### Table 3: the requirement-compliant report (p. 1364)

Table 3 prints the original Study 2 report (bold in the paper) and adds the disclosures that the [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines|six requirements]] would force (grey in the paper). Below, **bold** marks the original text and *italics* mark the added disclosure, reconstructed from p. 1364.

> [!example] Table 3. Study 2: Original report and requirement-compliant report (p. 1364)
> **Using the same method as in Study 1, we asked** ~~20~~ *34* **University of Pennsylvania undergraduates to listen** *only* **to either "When I'm Sixty-Four" by The Beatles or "Kalimba"** *or "Hot Potato" by the Wiggles. We conducted our analyses after every session of approximately 10 participants; we did not decide in advance when to terminate data collection.* **Then, in an ostensibly unrelated task, they indicated** *only* **their birth date (mm/dd/yyyy) and** *how old they felt, how much they would enjoy eating at a diner, the square root of 100, their agreement with "computers are complicated machines,"* **their father's age**, *their mother's age, whether they would take advantage of an early-bird special, their political orientation, which of four Canadian quarterbacks they believed won an award, how often they refer to the past as "the good old days," and their gender.* **We used father's age to control for variation in baseline age across participants.**
>
> **An ANCOVA revealed the predicted effect: According to their birth dates, people were nearly a year-and-a-half younger after listening to "When I'm Sixty-Four" (adjusted M = 20.1 years) rather than to "Kalimba" (adjusted M = 21.5 years), F(1, 17) = 4.92, p = .040.** *Without controlling for father's age, the age difference was smaller and did not reach significance (Ms = 20.3 and 21.2, respectively), F(1, 18) = 1.01, p = .33.*
^tbl-3

### Which degrees of freedom were exploited

Table 3 and the surrounding text (p. 1364) show the following forks behind the published Study 2. Each maps to a Table 1 situation or a Table 2 requirement.

| Hidden choice | Disclosed in Table 3 | Table 1 situation | Requirement violated |
|---|---|---|---|
| Sample size: peeked "approximately every 10 observations"; stopped at an undisclosed point | "we did not decide in advance when to terminate data collection" | B / [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)\|Fig. 1]] | 1 (stopping rule) |
| Small n | 34 in total across three conditions, so fewer than 20 per cell | — | 2 (≥ 20 per cell) |
| Choice of DV and covariate among 10 extra measures | the full list of measures | A, C (generalised) | 3 (list all variables) |
| Dropped condition ("Hot Potato") | third condition disclosed | D | 4 (all conditions) |
| Covariate-dependent result | F(1, 18) = 1.01, p = .33 without the covariate | C | 6 (report without covariate) |

The text adds three highlights (p. 1364):

1. **The other measures were redacted**, including Study 1's DV (feeling old), so a reviewer "would hence have been unable to assess the flexibility involved in selecting father's age as a control."
2. **Only covariate-adjusted results were reported**, which hid the covariate's "critical role in achieving a significant result". With the full list visible, a reviewer could ask whether Study 1 replicates in Study 2. It does not: participants felt *older*, not younger, after "When I'm Sixty-Four", though not significantly, **F(1, 17) = 2.07, p = .168**.
3. **There was no ex ante termination rule.** Significance was monitored about every 10 observations, and the sample did not reach the 20-per-cell threshold.

The conclusion (p. 1364): the redacted version "fully adheres to currently acceptable reporting standards and is, not coincidentally, deceptively persuasive." The compliant version "would be—appropriately—all but impossible to publish."

The "conceptual replication" itself was a fork. Study 1 and Study 2 used different pairs of conditions and different DVs. The [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^nonsol-conceptual|conceptual-replications nonsolution]] (p. 1365) says so: "Indeed, that is what we did in the experiments reported here." The Acknowledgments (p. 1365) carry the same joke: author order is "alphabetical, controlling for father's age (reverse-coded)."

## Examples

> [!example] Example: A "significant" campaign lift that depends on a covariate (generic marketing illustration)
> A small geo test with 20 treated and 20 control markets reports a lift that is significant only after adjusting for prior-year sales in one category. The analysis plan listed eight candidate pre-period covariates, three KPIs and a dropped third arm (a creative variant). Reported as "ANCOVA revealed a significant lift", it reads like Study 2. A compliant report would add the unadjusted estimate, list all eight covariates and three KPIs, mention the dropped arm and state the stopping rule. Covariate adjustment is still legitimate for precision ([[Q - Covariate Adjustment for Precision vs Identification]]), but a result that *hinges* on one covariate under random assignment deserves extra scrutiny (Requirement 6).
^ex-generic-application

## Connections

- In a randomised experiment the covariate is not needed for identification, only for precision. That is why the paper says results "that do hinge on covariates despite random assignment" deserve greater scrutiny. See [[Logic of Regression Adjustment]] and [[Q - Covariate Adjustment for Precision vs Identification]].
- The hidden peeking in Study 2 is the optional-stopping problem formalised in [[The Peeking Problem and Optional Stopping]].
- Small n with a large estimated effect is the setting where significant estimates exaggerate magnitude: [[Type S and Type M Errors]].

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]
- [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]: the rules Table 3 applies
- [[Researcher Degrees of Freedom]]
