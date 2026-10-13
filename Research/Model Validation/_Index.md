---
title: "Index: Model Validation"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-10-13
concept_count: 25
---

# Model Validation

> [!abstract] Routing Summary
> This topic collects the literature for checking whether a predictive or attribution model, especially a media-analytics model built on short weekly series, actually recovers what it claims. Contains 6 sub-topics and 25 reference notes (papers, the SHAP docs, and two governance frameworks).
> - Small samples, too many candidate predictors, best-of-many selection → [[Overfitting and Analytic Flexibility/_Index|Overfitting and Analytic Flexibility]]
> - Spurious correlation in weekly series; time-ordered validation → [[Time Series Validation/_Index|Time Series Validation]]
> - Instability and proxy bias in tree, permutation and SHAP importance → [[Feature Importance/_Index|Feature Importance]]
> - Attribution ≠ what to change; Goodhart effects → [[Interpretability and Causality/_Index|Interpretability and Causality]]
> - Observational vs experimental ad measurement; MMM data limits → [[Advertising Measurement/_Index|Advertising Measurement]]
> - Known-truth simulation studies; model-risk governance (SR 11-7, NIST) → [[Simulation and Governance/_Index|Simulation and Governance]]

## Sub-topics
- [[Overfitting and Analytic Flexibility/_Index|Overfitting and Analytic Flexibility]]. COVERS: Riley et al. (2020) sample-size criteria; Ioannidis (2005) PPV and corollaries; Simmons et al. (2011) researcher degrees of freedom (61% false positives).
- [[Time Series Validation/_Index|Time Series Validation]]. COVERS: Yule (1926) nonsense correlations; Granger & Newbold (1974) spurious regression; Granger (2003) cointegration/ECM; Breiman (2001) two cultures and Rashomon effect; Bergmeir et al. (2018) when K-fold CV is valid.
- [[Feature Importance/_Index|Feature Importance]]. COVERS: Strobl et al. (2007, 2008) RF importance bias and conditional permutation importance; Hooker et al. (2021) extrapolation; Fisher et al. (2019) model class reliance; Meinshausen & Bühlmann (2010) stability selection.
- [[Interpretability and Causality/_Index|Interpretability and Causality]]. COVERS: Dillon et al. (SHAP docs) on causal misuse; Kumar et al. (2020) Shapley problems; Janzing et al. (2020) interventional value function; Manheim & Garrabrant (2018) Goodhart variants.
- [[Advertising Measurement/_Index|Advertising Measurement]]. COVERS: Blake et al. (2015) eBay paid search; Gordon et al. (2019) Facebook lift studies; Lewis & Rao (2015) ROI precision; Chan & Perry (2017) MMM challenges.
- [[Simulation and Governance/_Index|Simulation and Governance]]. COVERS: Morris et al. (2019) ADEMP; Zhang & Vaver (2017) AMSS simulator; SR 11-7; NIST AI RMF 1.0.

## Cross-Cutting Concepts
- **Rashomon effect / many equally good models**: [[Breiman 2001 - Statistical Modeling The Two Cultures]], [[Fisher et al 2019 - Model Class Reliance]], [[Chan and Perry 2017 - Challenges in Media Mix Modeling]]
- **Best-of-many selection inflates reported fit**: [[Simmons et al 2011 - False-Positive Psychology]], [[Garden of Forking Paths]], [[Ioannidis 2005 - Why Most Published Research Findings Are False]], [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] (regressional Goodhart)
- **Correlated proxies get credited**: [[Strobl et al 2008 - Conditional Variable Importance]], [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]], [[Dillon et al - SHAP Predictive Models and Causal Insights]]
- **Small-sample MMM bias**: [[Bayesian Media Mix Modeling - Overview]] (Jin et al. 2017, already in vault), [[Chan and Perry 2017 - Challenges in Media Mix Modeling]], [[Riley et al 2020 - Sample Size for Prediction Models]]
- **Known-truth validation**: [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]], [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]], [[Simulation-Based Calibration - Overview]]
- **Observational ad measurement fails**: [[Activity Bias in Advertising]], [[Observational vs Experimental Methods in Advertising]], [[Gordon et al 2019 - Advertising Measurement at Facebook]]

## Already in the vault
Two references in this bibliography were ingested earlier and are linked rather than duplicated:
- Gelman & Loken (2013) → [[Garden of Forking Paths]]
- Jin et al. (2017) → [[Bayesian Media Mix Modeling - Overview]]

## Sources
- [[Research/Model Validation/raw/model-validation-references.md|Model validation references]]: the full bibliography (27 entries) and the verified quotations, grouped by theme, taken from an analytics model-validation review (Oct 2026). Internal findings are omitted.

## Dynamic Views
- [[Ingested Notes.base]] · [[Concept Dependencies.base]] · [[Theorems and Definitions.base]]
