---
title: "Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - topic/replication-crisis
  - type/overview
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons JP, Nelson LD, Simonsohn U (2011), 'False-Positive Psychology: Undisclosed Flexibility in Data Collection and Analysis Allows Presenting Anything as Significant', Psychological Science 22(11): 1359-1366, DOI 10.1177/0956797611417632. Whole paper: Abstract; introduction; Demonstration (Studies 1-2); Simulations (Table 1, Fig. 1, Fig. 2); Solution (Table 2, requirements, guidelines); Solutions in Action (Table 3); General Discussion (Criticisms, Nonsolutions); Concluding Remarks; Notes 1-5; References."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Garden of Forking Paths]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]"
  - "[[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]"
  - "[[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]"
  - "[[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]]"
  - "[[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]"
  - "[[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]"
  - "[[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]"
aliases:
  - Simmons Nelson Simonsohn 2011
  - False-Positive Psychology
  - Undisclosed Flexibility in Data Collection and Analysis
  - Simmons et al 2011
---

# Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview

> [!summary]
> **Question.** How far above the nominal 5% does the false-positive rate rise when researchers use ordinary, undisclosed flexibility in data collection and analysis? **Answer.** Very far. In simulations of four common **researcher degrees of freedom** (choice among correlated DVs, adding data after a failed test, optional covariates, dropping a condition), each fork alone pushes the rate to 7.7-12.6%, and all four together reach **60.7%** at p < .05. Data-dependent stopping alone gives up to **22%**. Two real experiments with undergraduates "show" that listening to "When I'm Sixty-Four" makes people 1.5 years younger (p = .040). **Remedy:** disclosure, not prohibition. Six requirements for authors (an ex ante stopping rule, at least 20 per cell, list all variables, report all conditions, report results with exclusions restored and without covariates) and four guidelines for reviewers (enforce, tolerate imperfection, demand robustness, require an exact replication when justifications are weak). Alpha correction, Bayesian statistics, conceptual replication and data posting are rejected as fixes for this particular problem.
^summary

## Overview

The paper coined the term **researcher degrees of freedom** and is one of the founding documents of the replication-crisis literature. It does not argue that researchers cheat. It argues that **ambiguity** about the right analysis, combined with a **motivated desire** for significance, leads honest researchers to choose and sincerely justify whichever defensible path yields p ≤ .05. Standard reporting hides the forks. The vault's concept notes on the phenomenon are [[Researcher Degrees of Freedom]] (taxonomy) and [[Garden of Forking Paths]] (Gelman & Loken's extension). This note set records the *paper*: its numbers, its demonstration and its policy proposal.

**Why it matters for model validation.** Any pipeline that tries specifications, outcome definitions, data windows, exclusions or covariate sets and then reports "the" result has the Table 1 problem. Examples include a media-mix model chosen from dozens of fits on 52-156 weekly rows, a lift study with several KPIs and creative arms, and a feature-importance story chosen from several model fits. The paper's disclosure list carries over directly to model-validation documentation and effective-challenge practice ([[SR 11-7 - Model Risk Management Guidance - Overview]]).

## Main Content

### Article Metadata and Abstract

> [!info] Publication details (p. 1359 header and the publisher cover page)
> - **Article type:** General Article, *Psychological Science* 22(11): 1359-1366, © The Author(s) 2011, DOI 10.1177/0956797611417632.
> - **Authors:** Joseph P. Simmons and Uri Simonsohn (The Wharton School, University of Pennsylvania); Leif D. Nelson (Haas School of Business, University of California, Berkeley).
> - **Keywords:** methodology, motivated reasoning, publication, disclosure.
> - **History:** Received 3/17/11; Revision accepted 5/23/11; originally published online 17 October 2011 (proof Oct 17, 2011; version of record Nov 7, 2011).
> - **Corresponding authors (p. 1359 footer):** all three authors are listed. Simmons: The Wharton School, University of Pennsylvania, 551 Jon M. Huntsman Hall, 3730 Walnut St., Philadelphia, PA 19104. Nelson: Haas School of Business, University of California, Berkeley, Berkeley, CA 94720-1900. Simonsohn: The Wharton School, University of Pennsylvania, 548 Jon M. Huntsman Hall, 3730 Walnut St., Philadelphia, PA 19104. Each entry gives an institutional e-mail address, which is not reproduced here.
> - **Publisher cover page (SAGE, on behalf of the Association for Psychological Science):** gives the online version URL (pss.sagepub.com/content/22/11/1359) and an "Additional services and information for Psychological Science" block with links for Email Alerts, Subscriptions, Reprints and Permissions. The p. 1359 header also carries "Reprints and permission: sagepub.com/journalsPermissions.nav". Each page carries a download stamp from the archived copy. None of this bears on the content.
^meta

> [!quote] Abstract, key sentences (p. 1359, checked against the raw text)
> - "flexibility in data collection, analysis, and reporting dramatically increases actual false-positive rates."
> - "In many cases, a researcher is more likely to falsely find evidence that an effect exists than to correctly find evidence that it does not." This is the abstract's version of the Table 1 combined-forks result: with all four forks the false-positive rate is 60.7% at p < .05, so a false "effect" is more likely than a correct null ([[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom#^tbl-1]]).
> - "We present computer simulations and a pair of actual experiments that demonstrate how unacceptably easy it is to accumulate (and report) statistically significant evidence for a false hypothesis."
> - The proposed solution "involves six concrete requirements for authors and four guidelines for reviewers, all of which impose a minimal burden on the publication process."
^abstract

### Key Findings

| Claim | Evidence | Note |
|---|---|---|
| Flexibility over two DVs (r = .5) nearly doubles the false-positive rate | 9.5% vs 5% (Table 1, row A) | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom#^tbl-1]] |
| One extra batch of 10 per cell raises it by about 50% | 7.7% (row B) | same |
| Optional covariate or interaction | 11.7% (row C) | same |
| Reporting any 2 of 3 conditions or the trend | 12.6% (row D) | same |
| All four forks combined | **60.7%** at .05; 81.5% at .10; 21.5% at .01 | same |
| Testing after every observation from n = 10, stopping at significance or n = 50 | 22.1% | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)#^fig-1]] |
| Significance at small n does not imply significance at larger n | p-path in Fig. 2 dips below .05 and then rises to roughly .6 (approximate reading by eye from the plot; the paper gives no path values in text) | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)#^fig-2]] |
| A necessarily false hypothesis can be "confirmed" with real data | Study 2: F(1, 17) = 4.92, p = .040; without the covariate p = .33 | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]] |
| Disclosure makes such results "all but impossible to publish" | Table 3 compliant report | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies#^tbl-3]] |

### Contribution

1. **Named and quantified** analytic flexibility as a source of false positives, through simple and reproducible Monte Carlo simulations (the single-fork rows, plus the A+B and A+B+C rows under a crossing this vault infers because the paper does not specify one, are reproduced in [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]).
2. **Demonstrated** it with a real, absurd, truthfully reported result.
3. **Proposed a cheap, enforceable disclosure standard**, the basis of later "only"-style disclosure statements and a precursor of pre-registration norms ([[Pre-registration and Open Science - Overview]]).
4. **Rejected popular non-fixes** with arguments that still apply: unknown $k$ for alpha correction, extra forks in Bayesian analysis, conceptual replications as new forks, and data posting as too costly to audit.

### Source Map

Every section, table, figure and note of the paper, and the note that holds it.

| Source location | Content | Note |
|---|---|---|
| p. 1359, header / Abstract / Keywords | Article type, keywords, received/accepted/online dates; two goals; "more likely to falsely find evidence that an effect exists" claim; simulations + experiments; 6 requirements + 4 guidelines | [[#^meta]], [[#^abstract]]; [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]] |
| Publisher cover page (unnumbered) and p. 1359 footer | Publisher cover page ("Additional services" links), corresponding-author addresses | [[#^meta]] |
| p. 1359, introduction, first paragraph | Opening premise: "Our job as scientists is to discover truths about the world ... errors are inevitable" | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]] (section "The premise: errors are inevitable") |
| p. 1359, introduction | Three costs of false positives; nominal 5% vs actual; definition of researcher degrees of freedom | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives#^def-rdf-simmons]] |
| pp. 1359-1360 | Ambiguity + desire; motivated-reasoning literature | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives#^claim-ambiguity-desire]] |
| p. 1360 | Reaction-time outlier rules in about 30 *Psych Science* articles | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives#^ex-rt-outliers]] |
| p. 1360, "How Bad Can It Be? A Demonstration of Chronological Rejuvenation" | Study 1 (Hot Potato, felt age) | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies#^ex-study1]] |
| p. 1360 | Study 2 (When I'm Sixty-Four, birth date) | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies#^ex-study2]] |
| p. 1360, Discussion | Real participants, legitimate analyses, false conclusions | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]] |
| pp. 1360-1361, "'How Bad Can It Be?' Simulations" | Simulation design, Situations A-D | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] |
| p. 1361, **Table 1** and table note | False-positive rates for A-D and combinations (the paper does not say how the forks are combined; the vault note's crossing is labelled as inference) | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom#^tbl-1]] |
| p. 1361 | Estimates are conservative (omitted forks) | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom#^claim-conservative]] |
| p. 1361, "A closer look at flexibility in sample size" | 70% admit to it (John et al.); folk intuition | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]] |
| p. 1362, **Figure 1** | FPR vs testing frequency, min n 10 / 20; caption, axis labels and legend transcribed | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)#^fig-1]] |
| p. 1362, **Figure 2** | Single p-value path, n = 11-70; caption and axes transcribed; path values are approximate by-eye readings | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)#^fig-2]] |
| p. 1362, "Solution" + **Table 2** | Six requirements, four guidelines | [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^tbl-2]] |
| pp. 1362-1363, "Requirements for authors" 1-6 | Rationale for each | [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^req-5-6]] |
| p. 1363, "Guidelines for reviewers" 1-4 | Rationale (incl. "not only to rule out alternative explanations, but also ... not due to chance alone"), robustness questions | [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^guidelines]] |
| p. 1364, "The Solutions in Action" + **Table 3** | Compliant re-report of Study 2; three highlights; Study 1 non-replication F(1,17) = 2.07, p = .168 | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies#^tbl-3]] |
| p. 1364, General Discussion: Criticisms, "Not far enough" | File drawer, repository; disincentives | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^crit-file-drawer]], [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^crit-disincentive]] |
| pp. 1364-1365, "Too far" | Exploratory research | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^crit-exploratory]] |
| p. 1365, Nonsolutions | Alpha correction; Bayesian statistics; conceptual replications; posting materials and data | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]] (^nonsol-alpha, ^nonsol-bayes, ^nonsol-conceptual, ^nonsol-data) |
| p. 1365, Concluding Remarks | Truth vs publication; self-serving interpretation | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^concl]] |
| p. 1365, Acknowledgments / Conflicts | Author order "controlling for father's age"; no conflicts | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]] |
| Note 1 | Topic chosen to implicate no field | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]] |
| Note 2 | Why simulation, not closed form | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] |
| Note 3 | Lower DV correlation → higher FPR | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom#^prop-correlation]] |
| Note 4 | "Gender" as a placeholder covariate | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom#^alg-sit-c]] |
| Note 5 | Robustness results belong in the manuscript, not the private review | [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^guidelines]] |
| References | Babcock & Loewenstein 1997; Dawson et al. 2002; Gilovich 1983; Hastorf & Cantril 1954; Ioannidis 2005; John et al. 2011; Kunda 1990; Pocock 1977; Schooler 2011; Wagenmakers et al. 2011; Zuckerman 1979 | cited in the notes where used |

### Reading Path

1. [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]]: the problem and its mechanism
2. [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]: the staged false finding and its disclosed version
3. [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]: how large the inflation is, with reproduction code
4. [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]]: peeking
5. [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]: the remedy
6. [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]: objections and rejected alternatives

## Examples

> [!example] Example: Reading a model-validation report through this paper (generic illustration)
> A weekly response model is presented with one headline channel effect. Applying the paper's lens: ask how many specifications, KPIs, data windows and control sets were tried (Table 1's forks A-D), whether fitting stopped once the effect "looked right" (Figure 1), and whether the report lists every variable and variant with an explicit "only" (Requirements 3-4). If the effect survives only one specification, that is the Table 3 situation, and an exact re-run on held-out data is the reviewer's remedy (Guideline 4). The worked examples are in [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]], [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]] and [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]].
^ex-overview-validation-report

## Connections

- **Concept notes (not duplicated here):** [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[The Peeking Problem and Optional Stopping]], [[Multiple Testing Corrections]].
- **Field-level consequence:** Ioannidis's PPV model treats flexible analysis as bias $u$ and shows how it lowers the share of true findings: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- **Remedies that followed:** [[Pre-registration and Open Science - Overview]], [[Pre-registration vs Registered Reports]], [[Prediction vs Postdiction]], [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].
- **Bayesian counterpoints:** [[Forking Paths and Bayesian Approaches]], [[Multiple Comparisons - Bayesian Perspective]], [[Q - Does Peeking Matter for a Bayesian]].
- **Model-selection analogues:** [[Model Selection and Overfitting]], [[Cross Validation Checking]], [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]; the multiplicity of equally good models, [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] and [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- **Simulation methodology:** [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Designing Simulated-Data Experiments]].
- **Proxy optimisation:** chasing p < .05 instead of truth is a Goodhart failure: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- **Marketing measurement:** small-n, low-signal ad experiments are where flexibility matters most: [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]], [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].

## See Also

- [[The Replication Crisis and Multiple Levels of Variation]]
- [[Type S and Type M Errors]]
- [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] — Simmons et al. simulate the alpha inflation Ioannidis models as u
- [[Gelman Loken 2013 - Garden of Forking Paths - Overview]] — flexibility arises without conscious fishing
