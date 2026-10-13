---
title: "Index: Feature Importance and Stability"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/interpretability
parent: "[[../_Index|Model Validation and Interpretability]]"
date_updated: 2026-10-13
concept_count: 51
---

# Feature Importance and Stability

> [!abstract] Routing Summary
> This topic covers **whether a variable-importance score or a selected variable set can be trusted**: biases in random-forest importance (scale, number of categories, correlation), the extrapolation problem of permute-and-predict diagnostics, conditional and re-learning alternatives, importance ranges over all near-optimal models (Rashomon sets), and selection stability under subsampling with finite-sample error control. It contains 5 sub-topics (one per source paper) and 51 notes.
> - Need why RF importance favours many-category or continuous noise variables, or the `cforest` + subsampling fix? → [[Strobl et al 2007 - Bias in RF Variable Importance/_Index|Strobl et al 2007 - Bias in RF Variable Importance]]
> - Need why RF permutation importance overstates **correlated** predictors, or conditional permutation importance? → [[Strobl et al 2008 - Conditional Variable Importance/_Index|Strobl et al 2008 - Conditional Variable Importance]]
> - Need why permutation importance, PDP and ICE **extrapolate** off the data, or LOCO / permute-and-relearn / condition-and-relearn? → [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation/_Index|Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation]]
> - Need the **Rashomon set**, model reliance, model class reliance (importance range over near-optimal models) or its finite-sample bounds? → [[Fisher Rudin Dominici 2019 - Model Class Reliance/_Index|Fisher Rudin Dominici 2019 - Model Class Reliance]]
> - Need **stable variable selection** across subsamples, the PFER bound, or the randomised Lasso? → [[Meinshausen Buhlmann 2010 - Stability Selection/_Index|Meinshausen Buhlmann 2010 - Stability Selection]]
> - Need a quick definition of a specific measure? → see the Concept Map below
> - Need a practical checklist before trusting a driver/importance chart? → [[Strobl 2007 - Conclusions, Scope and Practical Guidance]], [[Strobl 2008 - Discussion, mtry Guidance and Limitations]], [[Model Class Reliance - Discussion, Limitations and Extensions]], [[Stability Selection - Discussion, Limitations and Practice]]
^routing-feature-importance-stability

## Sub-topics

- [[Strobl et al 2007 - Bias in RF Variable Importance/_Index|Strobl et al 2007 - Bias in RF Variable Importance]] (8 notes) — COVERS: definitions of selection frequency, Gini importance, scaled/unscaled permutation importance, `ctree`/`cforest`, bootstrap vs 0.632 subsampling; null/power simulation design (Tables 1-2) and results (Figs 1-8, Tables 3-4: correct identification 0.413 → 0.729 at relevance 0.1); mechanism 1, cutpoint multiple testing in CART (Fig. 10); mechanism 2, bootstrap-induced association (Fig. 11); C-to-U RNA editing application (Table 5); practitioner checklist. Overview: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl et al 2008 - Conditional Variable Importance/_Index|Strobl et al 2008 - Conditional Variable Importance]] (9 notes) — COVERS: marginal vs conditional importance and the hospital spurious-correlation example; greedy split selection of correlated proxies and the role of `mtry` (Table 1, Fig. 1); OOB permutation importance (Eq. 1) and its implied nulls $X_j\perp(Y,Z)$ vs $(X_j\perp Y)\mid Z$ (Fig. 2); the tree-cutpoint-grid conditional permutation algorithm and choice of $Z$; simulation results (Fig. 3) and peptide-binding reranking (Fig. 4); digitized figure values; `mtry`/`ntree` guidance and limitations. Overview: [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation/_Index|Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation]] (8 notes) — COVERS: definitions of $\mathrm{VI}^\pi$, PD, ICE and their population targets; functional ANOVA / Sobol link; Theorem 1 (PaP for linear least squares) and the copula simulation (Figs 1-3); the extrapolation mechanism (potential nearest neighbours in trees, Gibbs-like variance in neural nets, Figs 4-6); conditional, LOCO, permute-and-relearn and condition-and-relearn measures, Theorems 2-3 and the compensation effect (Fig. 7); relearning test inflation vs knockoffs and the bike-share example (Figs 8-9); PDP alternatives (restricted ICE, generalized fANOVA, additive distillation). Overview: [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
- [[Fisher Rudin Dominici 2019 - Model Class Reliance/_Index|Fisher Rudin Dominici 2019 - Model Class Reliance]] (14 notes) — COVERS: $\epsilon$-Rashomon sets and model class reliance (MCR) definitions; model reliance as a U-statistic, algorithm reliance, ratio vs difference; outer/inner finite-sample bounds (Theorems 4-6, Corollary 22) with full Appendix B proofs; Rashomon-set CIs for any model characteristic and the profile-likelihood link (Prop. 7); binary-search computation (Lemmas 9-14, Prop. 11) with Appendix C proofs; closed-form MR for linear models and QP1QC for ridge/RKHS classes; MR and CATE (Prop. 19) and conditional model reliance; toy example and bootstrap-coverage simulations; COMPAS case study; limitations; full bibliography. Overview: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
- [[Meinshausen Buhlmann 2010 - Stability Selection/_Index|Meinshausen Buhlmann 2010 - Stability Selection]] (12 notes) — COVERS: Lasso / graphical Lasso setup; selection probabilities, stability paths and the stable set (riboflavin example); the PFER bound $E(V)\le q_\Lambda^2/((2\pi_{thr}-1)p)$ (Theorem 1) with proof and calibration; graphical-model example and computational cost; irrepresentable condition and the randomised Lasso; Theorem 2 consistency with Lemmas 3-7; randomised OMP; simulation designs A-G (Figs 5-7) and per-cell power readings; limitations, practitioner checklist and bibliography. Overview: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]

## Concept Map

| Concept | Note | Source | Key Result |
|---|---|---|---|
| Selection frequency / Gini / permutation importance | [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] | Strobl 2007 | Three standard RF measures; Gini most biased toward many categories |
| Split-selection (cutpoint) bias | [[Strobl 2007 - Split-Selection Bias in CART Trees]] | Strobl 2007 | Best-of-many-cutpoints is hidden multiple testing; `ctree` is unbiased |
| Bootstrap-induced association | [[Strobl 2007 - Bootstrap-Induced Association]] | Strobl 2007 | Resampling with replacement makes independent variables look associated, at any $n$ |
| `cforest` + subsampling remedy | [[Strobl 2007 - Null and Power Case Results]] | Strobl 2007 | Correct identification 0.413 → 0.729 (relevance 0.1); slightly better accuracy |
| Marginal vs conditional importance | [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]] | Strobl 2008 | Standard RF importance is marginal; most questions are conditional |
| Correlated-proxy split selection | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] | Strobl 2008 | Proxies win early splits, worst at small `mtry` |
| Permutation nulls | [[Strobl 2008 - Permutation Importance Null Hypotheses]] | Strobl 2008 | Marginal scheme tests $X_j\perp(Y,Z)$; conditional tests $(X_j\perp Y)\mid Z$ |
| Conditional permutation importance | [[Conditional Permutation Importance (Strobl 2008 Algorithm)]] | Strobl 2008 | Permute within the tree's own cutpoint grid; reduces, does not remove, bias |
| Permute-and-predict (PaP) extrapolation | [[Permute-and-Predict Extrapolation in Variable Importance]] | Hooker 2021 | Permuting a correlated feature queries regions with no data |
| Theorem 1 (linear PaP) | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] | Hooker 2021 | $E_\pi\mathrm{VI}^\pi_j=2\hat\beta_j^2\sum(x_{ij}-\bar x_j)^2$; RF/NN inflate correlated pair |
| Extrapolation mechanism | [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] | Hooker 2021 | Distant potential nearest neighbours (trees); high variance off-data (NNs) |
| Conditional / LOCO / relearn measures | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] | Hooker 2021 | Shared target $E(f-E[f\mid x_{-j}])^2$ (Thm 2); compensation effect (Thm 3) |
| Ordering vs testing | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] | Hooker 2021 | Permute-and-relearn tests over-reject; knockoffs hold about 5% |
| PDP alternatives | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] | Hooker 2021 | Restricted ICE, generalized fANOVA, additive distillation |
| Rashomon set, MCR | [[Rashomon Sets and Model Class Reliance - Definitions]] | Fisher 2019 | Importance range $[\min,\max]$ MR over near-optimal models; algorithm-free |
| Model reliance as U-statistic | [[Model Reliance - Permutation Importance as a U-Statistic]] | Fisher 2019 | Permutation importance over all pairings is unbiased |
| Finite-sample MCR bounds | [[Model Class Reliance - Outer and Inner Finite-Sample Bounds]] | Fisher 2019 | Outer (Thm 4), uniform MR (Thm 5), inner (Thm 6) bounds |
| Rashomon-set CIs | [[Rashomon-Set Confidence Intervals and Profile Likelihood]] | Fisher 2019 | CI for any model characteristic; equals profile likelihood under log-loss |
| MCR computation | [[Model Class Reliance - Binary Search Computation]] | Fisher 2019 | Binary search over reweighted ERM; QP1QC for linear/RKHS |
| Conditional model reliance | [[Model Reliance, Causal Effects and Conditional Model Reliance]] | Fisher 2019 | Permute within $X_2$ levels; MR links to ATE and CATE heterogeneity |
| Selection probability, stable set | [[Stability Paths and the Stable-Variable Set]] | Meinshausen 2010 | Keep variables with $\max_\lambda\hat\Pi^\lambda_k\ge\pi_{thr}$ over half-samples |
| PFER bound | [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] | Meinshausen 2010 | $E(V)\le q_\Lambda^2/((2\pi_{thr}-1)p)$ under exchangeability |
| Randomised Lasso | [[Randomised Lasso and the Irrepresentable Condition]] | Meinshausen 2010 | Random penalty weights in $[\lambda,\lambda/\alpha]$ |
| Consistency without irrepresentability | [[Randomised Lasso Consistency under Stability Selection (Theorem 2)]] | Meinshausen 2010 | Holds under a sparse-eigenvalue condition |
| Stability selection vs CV | [[Stability Selection Simulation Study - Designs A-G and Results]] | Meinshausen 2010 | Similar power, far fewer false selections than CV |

## Cross-Cutting Concepts

Concepts that span several sources:

- **Correlated predictors inflate marginal permutation importance.** All four importance papers agree on the symptom but name different causes. [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] and [[Strobl 2008 - Permutation Importance Null Hypotheses]] blame greedy split selection and the wrong null hypothesis. [[Permute-and-Predict Extrapolation in Variable Importance]] blames model extrapolation into empty regions. [[Model Reliance - Permutation Importance as a U-Statistic]] treats unconditional permutation as a well-defined estimand of one model and moves the problem to which model was chosen.
- **The conditional fix.** Strobl 2008 conditions within a tree-cutpoint grid ([[Conditional Permutation Importance (Strobl 2008 Algorithm)]]); Hooker et al. generate $x_j$ from $x_j\mid x_{-j}$ or re-learn the model ([[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]); Fisher et al. define conditional model reliance with weighting, matching and imputation estimators ([[Model Reliance, Causal Effects and Conditional Model Reliance]]). They agree that conditional importance answers "does this feature add information given the others". Hooker et al. note it suffers a **compensation effect**: a feature that is well predicted by others scores low even if the true model uses it. Strobl 2008 says its version reduces but does not remove the bias.
- **Ranking is not testing.** Strobl 2007 shows permutation importance variance grows with cardinality, so single-run rankings mislead ([[Strobl 2007 - Null and Power Case Results]]). Hooker et al. show permute-and-relearn *tests* over-reject for correlated noise ([[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]]). Meinshausen & Bühlmann replace ad hoc thresholds with a PFER guarantee ([[Stability Selection PFER Bound (Theorem 1) and Its Proof]]).
- **Resampling: source of bias or source of stability.** Strobl 2007 shows bootstrap resampling *creates* spurious association and recommends subsampling without replacement ([[Strobl 2007 - Bootstrap-Induced Association]]). Stability selection also uses half-samples without replacement, but to *measure* stability ([[Stability Paths and the Stable-Variable Set]]). The two papers agree on subsampling over bootstrap.
- **Single model vs many models.** Fisher et al. report importance as a range over the Rashomon set ([[Rashomon Sets and Model Class Reliance - Definitions]]); stability selection reports selection frequency over perturbed fits. Both reject reading importance or selection from one fitted model. MCR varies the model at fixed data; stability selection varies the data at a fixed procedure ([[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]).
- **Multiplicity inside the algorithm.** Cutpoint search ([[Strobl 2007 - Split-Selection Bias in CART Trees]]), choice of $\lambda$ ([[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]) and choice among near-optimal models ([[Rashomon Sets and Model Class Reliance - Definitions]]) are all hidden forking paths; see [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]] and [[Multiple Testing Corrections]].
- **Importance is not causal effect.** Strobl 2008, Hooker et al. and Fisher et al. all separate predictive reliance from causal effect; Fisher et al. give the exact link to CATE for a binary treatment. See [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] and [[Dillon et al - SHAP and Causal Insights - Overview]].
- **Simulation as validation.** Every source validates its claims with a designed simulation (null/power case, 12-variable linear model, copula design, polynomial toy example, designs A-G); compare [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

## Sources

- [[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]] — Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25
- [[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]] — Strobl, Boulesteix, Kneib, Augustin & Zeileis (2008), BMC Bioinformatics 9:307 (plus four figure images in `raw/`)
- [[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]] — Hooker, Mentch & Zhou (2021), Statistics and Computing 31:82; arXiv:1905.03151v2
- [[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]] — Fisher, Rudin & Dominici (2019), JMLR 20(177); arXiv:1801.01489v5
- [[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]] — Meinshausen & Bühlmann (2010), JRSS-B 72(4):417-473; arXiv:0809.2932v2

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — the same interventional vs conditional choice inside SHAP
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — causal reading of feature relevance
- [[Dillon et al - SHAP and Causal Insights - Overview]] — why predictive importance is not a causal effect
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — origin of permutation importance and the Rashomon effect
- [[Variance-Based Sensitivity and Sobol Indices]] — PaP importance equals a Sobol index under independence
- [[Model Selection and Overfitting]] — why cross-validation over-selects
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — effective challenge of model interpretations
