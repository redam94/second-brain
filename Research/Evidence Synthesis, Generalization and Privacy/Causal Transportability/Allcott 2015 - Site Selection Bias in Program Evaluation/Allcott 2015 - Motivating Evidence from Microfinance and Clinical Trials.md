---
title: "Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/example
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Sec. 2, pp. 4-6, Tables 1-2, App. A.1"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Model of External Validity and Site Selection Bias]]"
used_by:
  - "[[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]"
aliases:
  - "RCT partner representativeness microfinance hospitals"
---

# Allcott 2015 - Motivating Evidence from Microfinance and Clinical Trials

> [!summary]
> Two descriptive tests of whether RCT sites resemble policy-relevant target sites. Microfinance institutions (MFIs) that partner on RCTs differ significantly on six of eight characteristics from the 1903-MFI population; US hospitals hosting trials differ strongly from other hospitals in size, technology, process quality and outcomes. Both reject representativeness on observables (F-test p = 0.00002 and 0.0000).

## Overview
Rare settings where many sample and target sites exist and site-level characteristics can be gathered. They show selection on observables only; the effect on *treatment effects* is suggestive, not shown. The Opower application is then chosen to study one treatment end to end.

## Main Content

### 2.1 Microfinance institutions
Population: 1903 MFIs in 115 countries from the Microfinance Information Exchange (MIX). Partners (35, about 2%): MFIs listed as RCT partners by J-PAL, IPA and the Financial Access Initiative. Eight characteristics chosen because they might correlate with outcomes such as default.

> [!example] Table 1 - MFI characteristics, partners vs non-partners (SD in parentheses)
> | Characteristic | All | Partners | Non-partners | Difference |
> |---|---|---|---|---|
> | Average loan balance ($000s) | 1.42 (3.07) | 0.58 (0.51) | 1.44 (3.10) | -0.86*** |
> | Percent portfolio at risk | 0.083 | 0.068 | 0.083 | -0.015 |
> | Percent female borrowers | 0.62 | 0.69 | 0.62 | 0.07 |
> | MFI age (years) | 13.99 | 21.86 | 13.84 | 8.02*** |
> | Non-profit | 0.63 | 0.37 | 0.64 | -0.27*** |
> | Number of borrowers (10^6) | 0.06 | 0.85 | 0.05 | 0.80*** |
> | Borrowers/staff (10^3) | 0.13 | 0.22 | 0.13 | 0.09*** |
> | Cost per borrower ($000s) | 0.18 | 0.10 | 0.18 | -0.08*** |
> | N | 1903 | 35 | 1868 | F-test p = 0.00002 |
>
> *** significant at 99%. ^tbl-mfi

Interpretation: partners have smaller loan balances and lower (insignificantly) portfolio at risk with more female borrowers — each suggesting lower baseline default — so treatment effects on default could be larger in non-partners. Partners are older, larger, more often for-profit (RCTs need large samples and well-run partners), and run leaner operations (more borrowers per staff member, i.e., fewer staff per borrower, and lower cost per borrower).

### 2.2 Clinical trials
Motivating example (Wennberg et al. 1998): two large carotid endarterectomy trials required experienced, low-mortality institutions; after positive results use nearly doubled, but mortality was significantly higher at non-trial hospitals.

Data: ClinicalTrials.gov (108,047 interventional studies; 71% drug trials, 13% procedure trials) matched to hospital characteristics from CMS Provider of Services, AHA Annual Survey and CMS Hospital Compare. Of 4653 US hospitals, 1722 hosted a drug trial and 1265 a procedure trial.

> [!example] Table 2 - hospital characteristics (selected rows; differences vs. other hospitals)
> | Characteristic | Population mean | Drug-trial sites | Procedure-trial sites |
> |---|---|---|---|
> | County % with college degree | 0.23 | +0.09*** | +0.08*** |
> | County income per capita ($000s) | 37.6 | +7.7*** | +7.4*** |
> | In urban area | 0.57 | +0.47*** | +0.42*** |
> | Bed count | 179 | +238*** | +256*** |
> | Annual admissions (000s) | 7.4 | +11.0*** | +11.9*** |
> | Annual surgeries (000s) | 5.8 | +8.0*** | +8.7*** |
> | Uses electronic medical records | 0.62 | +0.13*** | +0.15*** |
> | U.S. News technology score (of 21) | 4.92 | +5.27*** | +5.75*** |
> | U.S. News patient services score (of 13) | 4.42 | +2.87*** | +3.16*** |
> | Surgical care process score (SD units) | 0.00 | +0.35*** | +0.33*** |
> | Patient communication score | 0.00 | -0.36*** | -0.23*** |
> | Hospital-acquired condition score | 0.00 | +0.13*** | +0.14*** |
> | Patient safety indicator score | 0.00 | +0.21*** | +0.25*** |
> | Mortality rate score (lower = better) | 0.00 | -0.34*** | -0.37*** |
> | Ranked in U.S. News top 50 | 0.04 | +0.04*** | +0.07*** |
> | Specialties in top 50 | 0.20 | +0.17*** | +0.29*** |
> | N / F-test | 4653 | p = 0.0000 | p = 0.0000 |
>
> (Table 2 also reports surgical-site infection after colorectal surgery: no significant difference. Hospital-acquired-condition and patient-safety-indicator scores are *higher* = worse.) ^tbl-hospitals

Interpretation: trial sites are larger, richer, more technologically advanced, and score better on surgical process and mortality (ability bias: "technology, size, and skill are complements to clinical research"), yet show worse communication and more complications — possibly patient mix. Chandra and Staiger (2007) productivity spillovers suggest surgery effects depend on hospital volume, endangering external validity.

## Examples
- Marketing analogue: agencies/clients that participate in a vendor's lift-study programme are likely larger, with better tracking and creative operations than the advertiser population.

## Connections
Motivates the formal model in [[Allcott 2015 - Model of External Validity and Site Selection Bias]].

## See Also
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
- [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] — the participation process at individual level.
