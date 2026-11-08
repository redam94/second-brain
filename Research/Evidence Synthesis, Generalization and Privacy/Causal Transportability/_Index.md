---
title: "Index: Causal Transportability"
tags:
  - type/index
  - source/ingested
  - topic/causal-transportability
parent: "[[../_Index|Evidence Synthesis, Generalization and Privacy]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 36
---

# Causal Transportability

> [!abstract] Routing Summary
> This topic covers **external validity: when and how a causal effect measured in one population (a trial, test market or campaign) carries over to another**. It has two halves. The graphical theory covers selection diagrams, do-calculus transport formulas and data fusion. The statistical estimation covers participation weights, outcome models, doubly robust estimators and empirical evidence of site-selection bias. There are 5 sub-topics and 36 notes.
> - Need the formal definition of transportability, selection diagrams and S-admissibility? → [[Pearl Bareinboim 2014 - External Validity and Transportability/_Index|Pearl & Bareinboim 2014]]
> - Need one framework for confounding, selection bias and transportability (data fusion)? → [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion/_Index|Bareinboim & Pearl 2016]]
> - Need a statistical review (PATE vs SATE, assumptions, IPPW, outcome regression, doubly robust, sensitivity)? → [[Degtiar Rose 2023 - Generalizability and Transportability Review/_Index|Degtiar & Rose 2023]]
> - Need trial-to-target estimators with a simulation and an application? → [[Dahabreh 2020 - Extending Inferences from Trial to Target Population/_Index|Dahabreh et al. 2020]]
> - Need evidence that early test sites overstate effects (Opower, 111 sites)? → [[Allcott 2015 - Site Selection Bias in Program Evaluation/_Index|Allcott 2015]]
> - Transporting a geo test or lift study to new markets? → [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]], [[Degtiar 2023 - Marketing Application Transporting Experiment Results]], [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]
^routing-summary

## Sub-topics

- [[Pearl Bareinboim 2014 - External Validity and Transportability/_Index|Pearl & Bareinboim 2014 - External Validity]] (8 notes) — COVERS: threats vs licenses and SCM basics; selection diagrams and the formal definition of transportability (Defs. 1–8); motivating examples and transport formulas; S-admissibility and Theorems 1–3; appendix derivations; a marketing application; limits.
- [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion/_Index|Bareinboim & Pearl 2016 - Data Fusion]] (4 notes) — COVERS: SCM principles, backdoor, front-door and z-identification; sample selection bias and recoverability (selection-backdoor criterion); transportability and data-fusion criteria.
- [[Degtiar Rose 2023 - Generalizability and Transportability Review/_Index|Degtiar & Rose 2023 - Review]] (10 notes) — COVERS: populations, estimands and the decomposition of external-validity bias; identifying assumptions; assessing study–target dissimilarity; weighting and matching; outcome regression; doubly robust methods; heterogeneity tests; comparison tables; marketing application.
- [[Dahabreh 2020 - Extending Inferences from Trial to Target Population/_Index|Dahabreh et al. 2020 - Trial to Target]] (7 notes) — COVERS: the participation process, designs and estimands; identifiability conditions; outcome-model, inverse-odds-weighting and doubly robust estimators; a 36-scenario simulation; the CASS application; diagnostics.
- [[Allcott 2015 - Site Selection Bias in Program Evaluation/_Index|Allcott 2015 - Site Selection Bias]] (7 notes) — COVERS: a model of external validity; the Opower program and data; microdata extrapolation overpredicting by 0.40–0.64 pp; metadata analysis of selection mechanisms; microfinance and clinical-trial evidence; remedies and marketing implications.

## Cross-Cutting Concepts

- **Reweighting to the target population**: the graphical transport formula in [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] and its estimators in [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] and [[Degtiar 2023 - Weighting and Matching Methods]].
- **Selection of study sites**: in theory, selection nodes ([[Pearl 2014 - Selection Diagrams and Definition of Transportability]]); in practice, Opower ([[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]).
- **Pooling vs transporting**: hierarchical pooling across sites in [[Meager 2019 - Pooling Factors and Measuring External Validity]] versus covariate-based transport.

## Gaps

- Cole & Stuart 2010 (ACTG 320) and Stuart et al. 2011 (propensity scores for generalizability) were planned but not ingested: their only free copies (PMC) are behind a bot check. Their methods are covered by [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] and [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]].

## Sources

- [[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]
- [[raw/Bareinboim 2016 - Causal Inference and the Data-Fusion Problem.pdf]]
- [[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]
- [[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]
- [[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]

## See Also

- [[Meta-Analysis/_Index|Meta-Analysis]] — pooling evidence across studies
- [[Do-Calculus in Summary Causal DAGs]] — the do-calculus the transport theorems rely on
- [[Geo-Experiment Methodology - Overview]] — the marketing experiments whose results need transporting
