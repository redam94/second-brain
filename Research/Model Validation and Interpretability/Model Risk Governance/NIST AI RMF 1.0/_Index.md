---
title: "Index: NIST AI RMF 1.0"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/model-risk-governance
  - topic/ai-governance
parent: "[[../_Index|Model Risk Governance]]"
date_updated: 2026-10-13
concept_count: 12
---

# NIST AI RMF 1.0

> [!abstract] Routing Summary
> This folder fully captures NIST AI 100-1, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)* (January 2023). It has 12 notes covering the framing of risk, the AI lifecycle and actors (TEVV), the seven trustworthiness characteristics, all 72 subcategories of the GOVERN / MAP / MEASURE / MANAGE Core, profiles, effectiveness, and Appendices A-D, plus a synthesis applying the framework to marketing-analytics models.
> - Need the framework in one page, or the section-to-note map? → [[NIST AI RMF 1.0 - Overview]]
> - Need the definition of risk, risk tolerance, residual risk, the harm taxonomy (Fig. 1), or the seven measurement challenges? → [[NIST AI RMF - Framing AI Risk and Measurement Challenges]]
> - Need TEVV, the builder/validator separation principle, Figs. 2-3, or Appendix A actor tasks? → [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]
> - Need the seven characteristics, Fig. 4, the weakest-link principle, or validity/reliability/accuracy/robustness, safety, security? → [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]
> - Need transparency vs explainability vs interpretability, privacy, fairness, or the three bias categories? → [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]
> - Need Core structure, Fig. 5, or GOVERN Table 1 (inventory, review frequency, decommissioning)? → [[NIST AI RMF - Core Structure and the GOVERN Function]]
> - Need MAP Table 2, the go/no-go decision, knowledge limits, or construct validation (MAP 2.3)? → [[NIST AI RMF - MAP Function]]
> - Need MEASURE Table 3, independent assessors, documenting unmeasurable risks, or meta-evaluation of TEVV (MEASURE 2.13)? → [[NIST AI RMF - MEASURE Function]]
> - Need MANAGE Table 4, risk response options, residual risk, or deactivation mechanisms? → [[NIST AI RMF - MANAGE Function]]
> - Need profiles (use-case, current/target, cross-sectoral), §4 effectiveness, or Appendix D attributes? → [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]
> - Need how AI risks differ from software (App. B) or human-AI interaction and override data (App. C)? → [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]]
> - Need a worked application to a marketing model, an SR 11-7 crosswalk, or a validation checklist? → [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| AI system | [[NIST AI RMF 1.0 - Overview]] | definition | — | Any machine-based system generating predictions/recommendations/decisions for objectives |
| Risk | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] | definition | — | Composite of probability and magnitude of consequences |
| Unmeasured ≠ low risk | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] | principle | Risk | Inability to measure implies neither high nor low risk |
| Risk tolerance / residual risk | [[NIST AI RMF - Framing AI Risk and Measurement Challenges]] | definition | Risk | Not prescribed by NIST; residual = after treatment |
| TEVV and separation | [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]] | definition | — | Builders ≠ validators; testers ≠ validators |
| Seven characteristics | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] | definition | Risk | Valid & reliable is the necessary base |
| Weakest-link principle | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] | principle | Characteristics | Trustworthiness only as strong as weakest characteristic |
| Validation (ISO 9000) | [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] | definition | — | Objective evidence that intended-use requirements are met |
| What / how / why | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] | definition | Characteristics | Transparency / explainability / interpretability |
| Three bias categories | [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]] | definition | — | Systemic, computational-statistical, human-cognitive |
| Core and GOVERN | [[NIST AI RMF - Core Structure and the GOVERN Function]] | definition | Risk | 4 functions, 19 categories, 72 subcategories |
| Go/no-go | [[NIST AI RMF - MAP Function]] | principle | GOVERN | MAP ends in initial decision to proceed |
| Construct validation | [[NIST AI RMF - MAP Function]] | definition | MAP | MAP 2.3 TEVV consideration |
| Meta-evaluation | [[NIST AI RMF - MEASURE Function]] | principle | TEVV | MEASURE 2.13 evaluates TEVV metrics |
| Risk responses | [[NIST AI RMF - MANAGE Function]] | algorithm | MEASURE | Mitigate, transfer, avoid, accept |
| Profiles | [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]] | definition | Core | Current vs target gap analysis |
| AI-specific risks | [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] | concept | — | 14 new/increased risks; ground truth may not exist |
| Override data | [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]] | principle | — | Collect frequency and rationale of human overrules |
| SR 11-7 crosswalk | [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]] | example | Core | Mapping of the two regimes |

## Notes

- [[NIST AI RMF 1.0 - Overview]]: CONTAINS: opening benefits/risks framing and four risk axes (long/short-term, high/low-probability, systemic/localized, high/low-impact); socio-technical interplay; AI system definition; responsible-AI vocabulary (incl. equitable and accountable) (social responsibility, sustainability, professional responsibility, AI actors); mandates (NAII Act, NSCAI recommendations, federal standards plan) and development process; international-standards alignment; function scope (GOVERN all stages, MAP/MEASURE/MANAGE system- and stage-specific); 8 validation takeaways; full Source Map (front matter, Exec Summary, §§1-6, Figs. 1-5, Tables 1-4, Apps. A-D); structure table; reading order.
- [[NIST AI RMF - Framing AI Risk and Measurement Challenges]]: CONTAINS: §1.1 risk and risk-management definitions; over-trust remark; Fig. 1 harm taxonomy table; unmeasured-not-low principle; §1.2.1 seven challenges table; §1.2.2 risk tolerance definition; §1.2.3 prioritization principle and residual risk; §1.2.4 integration; MMM example.
- [[NIST AI RMF - AI Lifecycle, AI Actors and TEVV]]: CONTAINS: §2 audience (primary, People & Planet, four roles); TEVV definition and two-level separation principle; TEVV tasks by phase; Fig. 2 table; Fig. 3 full transcription; Appendix A table of 15 actor groups; staffing example.
- [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]]: CONTAINS: seven characteristics and Fig. 4 layout; weakest-link / tradeoff principle (8 points incl. boxed text); min-aggregation gloss; §3.1 validation, reliability, accuracy, robustness definitions; accuracy-evidence requirements; §3.2 safe; §3.3 secure vs resilient; accuracy-interpretability and test-set examples.
- [[NIST AI RMF - Accountability, Explainability, Privacy and Fairness]]: CONTAINS: §3.4 transparency/accountability definitions and necessary-not-sufficient principle; §3.5 explainability vs interpretability, what/how/why triad; §3.6 privacy definition, PETs, accuracy tradeoff; §3.7 fairness definition and three bias categories table; SHAP dashboard example.
- [[NIST AI RMF - Core Structure and the GOVERN Function]]: CONTAINS: Core definition; Fig. 5; usage guidance (algorithm) incl. diverse-team rationale and Playbook tailoring/contribution; category/subcategory counts; GOVERN definition and narrative; full Table 1 (GOVERN 1.1-6.2); validation-relevance table; minimal GOVERN layer example.
- [[NIST AI RMF - MAP Function]]: CONTAINS: MAP definition and narrative; eight benefits of broad perspectives; go/no-go principle; full Table 2 (MAP 1.1-5.2); construct validation gloss; MAP-to-practice table; segment driver-model example.
- [[NIST AI RMF - MEASURE Function]]: CONTAINS: MEASURE definition; seven measurement-process requirements (outcomes feed MANAGE); phrase-to-practice table; full Table 3 (MEASURE 1.1-4.3) with characteristic mapping; document-the-unmeasurable, independent assessment, and meta-evaluation principles; concrete checks table; validation-metric power example.
- [[NIST AI RMF - MANAGE Function]]: CONTAINS: MANAGE definition and narrative; full Table 4 (MANAGE 1.1-4.3); risk treatment loop algorithm; negative residual risk definition; non-AI alternatives; failed-attribution response example.
- [[NIST AI RMF - Profiles, Effectiveness and Framework Attributes]]: CONTAINS: §6 profile definitions (use-case, temporal current/target, cross-sectoral); gap-analysis algorithm; §4 effectiveness and nine expected benefits; Appendix D ten attributes table; versioning/update schedule; marketing use-case profile example.
- [[NIST AI RMF - How AI Risks Differ and Human-AI Interaction]]: CONTAINS: Appendix B framing, 14 AI-specific risks table, relation to other NIST frameworks, five gaps; Appendix C framing, four human-AI issues, how GOVERN/MAP address them, override-data research call; override logging and ground-truth examples.
- [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]: CONTAINS: worked Core pass on a driver model; SHAP-mass selection anti-pattern; accuracy-interpretability tradeoff example; AI RMF ↔ SR 11-7 crosswalk table; 13-step validation checklist.

## Sources

- [[raw/NIST 2023 - AI Risk Management Framework (AI RMF 1.0).pdf]]: NIST AI 100-1, January 2023 (doi:10.6028/NIST.AI.100-1). All notes derive from it; the marketing-analytics examples are vault illustrations.

## See Also

- [[SR 11-7 - Model Risk Management Guidance - Overview]]: sibling source in Model Risk Governance
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: known-truth evaluation for MEASURE 2.5 / 2.13
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]: metric gaming (§1.2.1, MAP 2.3)
- [[Dillon et al - SHAP and Causal Insights - Overview]]: explanation vs causal interpretation (§3.5)
