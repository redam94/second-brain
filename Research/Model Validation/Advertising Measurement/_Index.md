---
title: "Index: Advertising Measurement"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Model Validation]]"
date_updated: 2026-10-13
concept_count: 4
---

# Advertising Measurement

> [!abstract] Routing Summary
> This folder covers large-scale ad experiments showing observational measurement is badly biased, and the data limits of media mix modelling. Contains 4 reference notes.
> - Need OLS vs experimental ad ROI (eBay)? → [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]]
> - Need do observational methods recover RCT lift? → [[Gordon et al 2019 - Advertising Measurement at Facebook]]
> - Need why ad ROI is nearly unmeasurable? → [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]]
> - Need MMM data limitations and validation? → [[Chan and Perry 2017 - Challenges in Media Mix Modeling]]

## Concept Map

| Note | Type | Key Result |
|------|------|------------|
| [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]] | definition | OLS ROI >4,100% (>1,400% with controls) vs experimental −63% |
| [[Gordon et al 2019 - Advertising Measurement at Facebook]] | definition | In half of 15 studies, estimates off by ×3 |
| [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]] | theorem | $SE(ROI)\approx(\sigma/c)\sqrt{2/N}$; tiny selection swamps observational estimates |
| [[Chan and Perry 2017 - Challenges in Media Mix Modeling]] | definition | 156 weekly points; validate with simulated, withheld ground truth |

## Notes

- [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]] — CONTAINS: Ad ROI def; brand/non-brand experiments; effect concentrated on infrequent users
- [[Gordon et al 2019 - Advertising Measurement at Facebook]] — CONTAINS: Lift/ATT under one-sided non-compliance; matching/PSM/IPW/DR comparison
- [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]] — CONTAINS: 25 Yahoo! experiments; ROI precision
- [[Chan and Perry 2017 - Challenges in Media Mix Modeling]] — CONTAINS: MMM challenges; ground-truth validation def

## Sources
- [[Research/Model Validation/raw/model-validation-references.md|Model validation references]] — bibliography and verified quotations

## See Also
- [[../_Index|Model Validation]] — parent topic
