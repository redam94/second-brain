---
title: "Allcott 2015 - Site Selection Bias in Program Evaluation - Overview"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/overview
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Whole paper, pp. 1-29 (+ appendix)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Model of External Validity and Site Selection Bias]]"
  - "[[Allcott 2015 - Opower Program, Selection Mechanisms and Data]]"
used_by:
  - "[[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]"
  - "[[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]"
aliases:
  - "Allcott site selection bias overview"
  - "Opower 111 RCTs external validity"
---

# Allcott 2015 - Site Selection Bias in Program Evaluation

> [!summary]
> Allcott (2015, *Quarterly Journal of Economics* 130(3); NBER WP 18373, rev. Sept. 2014 — the PDF captured is the NBER working paper) tests whether early evaluation sites predict later ones using 111 randomized trials of Opower's Home Energy Reports (8.6M households, 58 utilities). Microdata from the first ten sites overpredict the next 101 sites' effect by about 0.5 percentage points. Mechanisms: utilities with environmentalist, higher-income populations adopt first and respond more; utilities initially target heavy users and then expand to less responsive groups. Replication does not remove bias unless sites are selected at random.

## Overview

**Research question.** If a program works in several evaluated sites, can we extrapolate to the sites that will adopt it next, or nationwide? Formally: does *external unconfoundedness* hold when sites self-select into evaluation?

**Contribution.**
1. Defines **site selection bias**: the probability a site adopts/evaluates a program is correlated with its treatment effects, so sample-site effects are systematically different from target-site effects.
2. Descriptive evidence of selection on observables in two other settings (microfinance RCT partners; clinical-trial hospitals).
3. The Opower setting: unusually high treatment fidelity, 111 RCTs, microdata for the first ten, effect estimates for all 111 — enabling an *in-sample test* of external validity.
4. Decomposition of the selection into within-utility (targeting heavy users) and between-utility (population preferences, ownership) mechanisms.

**Key results.**
- Predicted nationwide first-year effect from the 10-site microdata: about **1.7%** of electricity use (21 TWh, \$2.3 billion).
- Test on 101 later sites: predictions are too high by **0.64** (linear) and **0.40** (reweighted) percentage points; about 0.5 pp (6.3 TWh, \$690 million), $p<0.0001$.
- Efficacy declines by **0.173** pp per year of site start date (Table 6); site-level observables explain just under one third.
- Even all 111 sites are positively selected on observables vs. the national population: sample-mean extrapolation overpredicts by \$350 million (percent ATE) to \$710 million (kWh/day).

## Main Content

### Source Map

| Paper section | Pages (doc) | Covered in |
|---|---|---|
| Abstract, 1 Introduction | 1-4 | this note, [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]] |
| 2.1 Microfinance institutions (Table 1) | 4-5 | [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]] |
| 2.2 Clinical trials (Table 2) | 5-6 | [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]] |
| 3.1 External validity (Assumptions 1-4, eq. 1) | 6-7 | [[Allcott 2015 - Model of External Validity and Site Selection Bias]] |
| 3.2 Sites, replication, site selection bias (3A, 3B) | 7-9 | [[Allcott 2015 - Model of External Validity and Site Selection Bias]] |
| 4.1 Home Energy Report program | 9-10 | [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]] |
| 4.2 Site selection mechanisms | 10-12 | [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]] |
| 5.1-5.3 Data (Tables 3-4), dispersion of site effects (Figure 1) | 12-16 | [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]] |
| 6.1 Strategy (eqs. 2-4) | 16-19 | [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] |
| 6.2 Results (Table 5, Figures 2-3) | 19-22 | [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] |
| 7.1 Metadata strategy (eqs. 5-8) | 22-24 | [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]] |
| 7.2 Results (Tables 6-7, Figures 4-5) | 24-28 | [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]] |
| 8 Conclusion | 28-29 | [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]] |
| References | 30-33 | not transcribed |
| Tables 1-7, Figures 1-5 | 33-42 | in the section notes above |
| Appendix A-D (data, Democrat share, within-sample tests, formal test) | 44-73 | mentioned where cited; not individually transcribed |

## Examples
- Worked extrapolation arithmetic (eq. 3 with Table 4/5 numbers): [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]].

## Relevance to marketing measurement
This is the most direct empirical warning for extrapolating marketing experiments. Advertisers and platforms that run lift tests or geo-experiments are not a random sample of campaigns, brands, or markets: tested campaigns tend to be those where the team expects a win, run by capable partners, in markets with good data. Expect the first experiments to overstate typical incrementality, and expect the effect to fall as the programme expands to less responsive audiences (the within-utility pattern). Concretely: weight experiment results by how the test population differs from the planning population, treat the *distribution* of effects across sites as the primary object (see [[Hierarchical Models]] and [[Partial Pooling as Multiple Comparisons Correction]]), and use experiments as informative priors for [[Bayesian Media Mix Modeling - Overview]] with an explicit selection discount. This framing is an application of the paper's logic, not a claim made in it.

## Connections
- The paper's external unconfoundedness is condition (4) of [[Dahabreh 2020 - Identifiability Conditions and Identification]]; Allcott provides an empirical case where it fails even after rich conditioning.
- Experimental context: [[The Experimental Ideal]], [[Geo-Experiment Methodology - Overview]].

## See Also
- [[Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials]]
- [[Allcott 2015 - Model of External Validity and Site Selection Bias]]
- [[Allcott 2015 - Opower Program, Selection Mechanisms and Data]]
- [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]
- [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]
- [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]
