---
title: "Index: Model Validation and Interpretability"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/interpretability
parent: "[[../_Index|Research]]"
date_updated: 2026-10-13
concept_count: 186
---

# Model Validation and Interpretability

> [!abstract] Routing Summary
> This topic covers **how to tell whether a predictive or measurement model can be trusted before it informs
> decisions**. It spans false discovery and overfitting, the biases and instability of feature importance, why SHAP
> and other explanations are not causal levers (and how optimized metrics drift from their goals), validation of
> time-series models, known-truth simulation of statistical and marketing methods, and model risk governance. It holds
> 6 sub-topics, 21 source folders and 186 notes: 185 source notes plus one cross-source synthesis, not counting 27
> index files. All 21 sources were ingested with full capture on 2026-10-13.
> - Need the **big picture, the eight failure mechanisms, the six remedies, or a validation checklist**? → [[Model Validation and Interpretability - Overview]]
> - Need why significant findings and fitted models fail on new data (PPV, researcher degrees of freedom, sample size for prediction models, the two cultures)? → [[Research/Model Validation and Interpretability/Overfitting and False Discovery/_Index|Overfitting and False Discovery]]
> - Need whether a variable-importance score or selected variable set can be trusted (RF importance bias, conditional importance, permute-and-predict, Rashomon sets, stability selection)? → [[Research/Model Validation and Interpretability/Feature Importance and Stability/_Index|Feature Importance and Stability]]
> - Need what SHAP / Shapley values compute, conditional vs interventional, why they are not causal effects, or Goodhart's Law? → [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/_Index|Explanations, Causality and Proxies]]
> - Need spurious regression, cointegration, or when K-fold / rolling-origin CV is valid for time series? → [[Research/Model Validation and Interpretability/Time Series Validation/_Index|Time Series Validation]]
> - Need to design a known-truth simulation study (ADEMP, Monte Carlo SEs), the AMSS marketing simulator, or why MMMs cannot be validated by fit? → [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/_Index|Simulation-Based Method Validation]]
> - Need the model-risk governance view (SR 11-7 effective challenge, validation gate, NIST AI RMF GOVERN/MAP/MEASURE/MANAGE)? → [[Research/Model Validation and Interpretability/Model Risk Governance/_Index|Model Risk Governance]]
> - Need the **ad-experiment ground truth** that observational measurement is checked against? → [[Research/Market Response Models/User-Level Ad Experiments/_Index|User-Level Ad Experiments]] (Gordon et al. 2019, Lewis & Rao 2015, Blake et al. 2015)

## Sub-topics

- [[Research/Model Validation and Interpretability/Overfitting and False Discovery/_Index|Overfitting and False Discovery]] — COVERS: Ioannidis (2005) PPV 2x2 framework, bias $u$, many-teams erosion, six corollaries, Table 4; Simmons, Nelson & Simonsohn (2011) researcher degrees of freedom, Table 1 (61% FPR), optional stopping (22%), disclosure requirements; Breiman (2001) two cultures, Rashomon effect, Occam dilemma, random-forest permutation importance, Cox/Efron/Hoadley/Parzen discussion; Riley et al. (2020) sample-size criteria for prediction models (shrinkage $S \ge 0.9$, optimism, $R^2_{CS}$, pmsampsize). 35 notes, 4 source folders.
- [[Research/Model Validation and Interpretability/Feature Importance and Stability/_Index|Feature Importance and Stability]] — COVERS: Strobl et al. (2007) split-selection and bootstrap bias in RF importance, cforest; Strobl et al. (2008) conditional permutation importance and its null hypotheses; Hooker, Mentch & Zhou (2021) permute-and-predict extrapolation, conditional and relearning (LOCO) importance; Fisher, Rudin & Dominici (2019) model reliance as a U-statistic, Rashomon sets, model class reliance bounds and computation; Meinshausen & Bühlmann (2010) stability selection, PFER bound, randomised Lasso. 51 notes, 5 source folders.
- [[Research/Model Validation and Interpretability/Explanations, Causality and Proxies/_Index|Explanations, Causality and Proxies]] — COVERS: Kumar et al. (2020) Shapley/SHAP value functions, conditional vs interventional catch-22, additivity limits, normative use; Janzing et al. (2020) interventional = marginal expectation, irrelevant-feature counterexample, KernelSHAP vs SHAPR; Dillon et al. SHAP vs true causal effects, DML under observed and unobserved confounding; Manheim & Garrabrant (2018) regressional, extremal, causal and adversarial Goodhart. 31 notes, 4 source folders.
- [[Research/Model Validation and Interpretability/Time Series Validation/_Index|Time Series Validation]] — COVERS: Granger (2003) spurious regression from Yule to Granger-Newbold, cointegration and ECM, Granger causality, Monte Carlo in Python; Bergmeir, Hyndman & Koo (2018) Theorem 1 validity of K-fold CV for AR models, Monte Carlo design and results, Ljung-Box filter; synthesis note on out-of-sample validation (nested rolling origin, blocked CV with gaps, null baselines, random-ranking permutation test). 16 notes, 2 source folders.
- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/_Index|Simulation-Based Method Validation]] — COVERS: Morris, White & Crowther (2019) ADEMP, performance measures and Monte Carlo SEs, $n_{sim}$, seeds, reporting, marketing application; Zhang & Vaver (2017) AMSS hidden-state consumer model, media and paid-search modules, counterfactual ROAS ground truth, MMM evaluation; Chan & Perry (2017) MMM data limits (156 rows), selection bias, five equal-fit models, opportunities, simulation-based validation. 29 notes, 3 source folders.
- [[Research/Model Validation and Interpretability/Model Risk Governance/_Index|Model Risk Governance]] — COVERS: SR 11-7 (2011) model definition and effective challenge, development and use, validation independence and gate, conceptual soundness, ongoing monitoring, outcomes analysis and back-testing, vendor models, governance, inventory, marketing application; NIST AI RMF 1.0 (2023) framing, lifecycle and TEVV, trustworthiness characteristics, GOVERN/MAP/MEASURE/MANAGE, profiles, marketing-analytics application. 23 notes, 2 source folders.

## Cross-Cutting Concepts

- **Selection on noise (best-of-many)**: [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] (false positives), [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] (model multiplicity), [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] (optimism of the maximum), [[Out-of-Sample Validation for Time-Series Models]] (nested windows as the cure), [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] (field-level consequence).
- **Permutation importance and its estimand**: [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] (origin), [[Strobl 2008 - Permutation Importance Null Hypotheses]] (which null), [[Model Reliance - Permutation Importance as a U-Statistic]] (population estimand), [[Permute-and-Predict Extrapolation in Variable Importance]] (extrapolation), [[Kumar et al - Conditional vs Interventional Shapley Catch-22]] (Shapley version).
- **Model level vs world level causality**: [[Janzing 2020 - Inputs as Causes - Interventional Equals Marginal Expectation]] (model), [[Dillon et al - SHAP Plots vs True Causal Effects]] (world), [[Model Reliance, Causal Effects and Conditional Model Reliance]] (conditions linking the two), [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] (acting on proxies).
- **Stability across resamples and near-optimal models**: [[Stability Paths and the Stable-Variable Set]], [[Rashomon Sets and Model Class Reliance - Definitions]], [[Strobl 2007 - Bootstrap-Induced Association]], [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]].
- **Known-truth simulation as validation**: [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]], [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]], [[Dillon et al - Subscriber Retention Data-Generating Process]], [[Strobl 2007 - Null and Power Case Simulation Design]], [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]], [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]].
- **Time-ordered validation**: [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]], [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]], [[SR 11-7 - Outcomes Analysis and Back-Testing]], [[NIST AI RMF - MEASURE Function]].
- **Independent challenge**: [[SR 11-7 - Model Definition, Model Risk and Effective Challenge]], [[NIST AI RMF - Core Structure and the GOVERN Function]], [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]], [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]].
- **Experiments as ground truth for observational marketing measurement**: [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]], [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]], [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]].

## Notes

- [[Model Validation and Interpretability - Overview]] — CONTAINS: cross-source synthesis; eight failure mechanisms (too few rows, best-of-many, selection by importance mass, spurious time-series fits, biased/unstable importance, importance ≠ intervention effect, Goodhart, observational ad measurement error); six remedies (forward-in-time validation, null/random-ranking baselines, retest stability, ADEMP/AMSS simulation, experiments, SR 11-7/NIST gate); 12-item validation checklist; mermaid concept map; spurious-driver selection simulation (77% significant, naive wins 72%).

## Sources

- Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction — Bergmeir, Hyndman & Koo (2018), *Computational Statistics & Data Analysis* 120: K-fold CV validity for purely autoregressive models.
- Breiman 2001 - Statistical Modeling The Two Cultures — Breiman (2001), *Statistical Science* 16(3), with comments by Cox, Efron, Hoadley, Parzen and rejoinder.
- Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling — Chan & Perry (2017), Google white paper on MMM challenges.
- Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs) — Dillon, LaRiviere, Lundberg, Roth & Syrgkanis (Microsoft), SHAP documentation case study "Be careful when interpreting predictive models in search of causal insights".
- Federal Reserve and OCC 2011 - Supervisory Guidance on Model Risk Management (SR 11-7) — Board of Governors of the Federal Reserve System & OCC (2011), SR 11-7 / OCC 2011-12.
- Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful — Fisher, Rudin & Dominici (2019), *JMLR* 20: model reliance and model class reliance.
- Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture) — Granger (2003), Nobel lecture on time series, cointegration and spurious regression.
- Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation — Hooker, Mentch & Zhou (2021), *Statistics and Computing* 31: permute-and-predict extrapolation.
- Ioannidis 2005 - Why Most Published Research Findings Are False — Ioannidis (2005), *PLoS Medicine* 2(8): e124.
- Janzing et al 2020 - Feature Relevance Quantification in Explainable AI - A Causal Problem — Janzing, Minorics & Blöbaum (2020), AISTATS: interventional vs observational feature relevance.
- Kumar et al 2020 - Problems with Shapley-Value-Based Explanations — Kumar, Venkatasubramanian, Scheidegger & Friedler (2020), "Problems with Shapley-value-based explanations as feature importance measures", ICML 2020.
- Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law — Manheim & Garrabrant (2018), arXiv:1803.04585.
- Meinshausen Buhlmann 2010 - Stability Selection — Meinshausen & Bühlmann (2010), *JRSS-B* 72(4) (arXiv version).
- Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods — Morris, White & Crowther (2019), *Statistics in Medicine* 38: ADEMP.
- NIST 2023 - AI Risk Management Framework (AI RMF 1.0) — NIST AI 100-1 (2023), AI Risk Management Framework 1.0.
- Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model — Riley et al. (2020), *BMJ* 368: m441.
- Simmons Nelson Simonsohn 2011 - False-Positive Psychology — Simmons, Nelson & Simonsohn (2011), *Psychological Science* 22(11).
- Strobl et al 2007 - Bias in Random Forest Variable Importance Measures — Strobl, Boulesteix, Zeileis & Hothorn (2007), *BMC Bioinformatics* 8: 25 (Europe PMC text).
- Strobl et al 2008 - Conditional Variable Importance for Random Forests — Strobl, Boulesteix, Kneib, Augustin & Zeileis (2008), *BMC Bioinformatics* 9: 307 (web text).
- Strobl et al 2008 - Figure 1 Selection Rates — Strobl et al. (2008) Figure 1, variable selection rates.
- Strobl et al 2008 - Figure 2 Permutation Schemes — Strobl et al. (2008) Figure 2, permutation schemes.
- Strobl et al 2008 - Figure 3 Permutation Importance — Strobl et al. (2008) Figure 3, permutation importance.
- Strobl et al 2008 - Figure 4 Peptide Binding — Strobl et al. (2008) Figure 4, peptide-binding application.
- Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator — Zhang & Vaver (2017), Google technical report on AMSS.

## See Also

- [[Research/Market Response Models/User-Level Ad Experiments/_Index|User-Level Ad Experiments]] — RCT benchmarks (Gordon et al. 2019, Lewis & Rao 2015, Blake et al. 2015)
- [[Research/Market Response Models/Bayesian Media Mix Modeling/_Index|Bayesian Media Mix Modeling]] — Jin et al. (2017) MMM and its known-truth simulations
- [[Research/Research Methodology/_Index|Research Methodology]] — garden of forking paths (Gelman & Loken 2013), researcher degrees of freedom, multiple comparisons
- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — model checking, cross-validation, simulation-based calibration
- [[Research/Econometrics/Causal Machine Learning/_Index|Causal Machine Learning]] — DML and causal forests as the causal counterpart of predictive importance
