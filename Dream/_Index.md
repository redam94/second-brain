---
title: "Dream: Research Gaps"
tags:
  - type/index
  - type/dream
date_updated: 2026-08-24
---

# Dream: Research Gaps

> [!abstract] Purpose
> This index tracks knowledge gaps — topics referenced or implied by existing Research notes that lack dedicated coverage. Updated each weekly cleanup run.

---

## Suggested Topics

### 1. Propensity Score Methods and Inverse Probability Weighting
**Status:** 🍂 covered

**Why it was a gap:**
[[Activity Bias in Advertising]] explicitly states that "propensity score matching and regression with controls cannot fix" activity bias, but there is no note explaining what propensity score methods are, when they succeed, and why they fail here. The [[Conditional Independence Assumption]] note covers the theoretical requirement for selection-on-observables identification, and [[The Selection Problem]] motivates the challenge — but the frequentist methodological toolkit (propensity score matching, IPW, doubly robust estimators, AIPW) is missing. The Bayesian side is covered by [[Bayesian Inverse Probability Weighting]]. The frequentist IPW and DR estimators are now in [[Frequentist Causal Estimation]] (added 2026-04-10) — but the classical Rosenbaum & Rubin matching framework and diagnostics (covariate balance, overlap plots, caliper matching) remain absent.

**Covered by:** [[Propensity Score Matching - Overview]], [[Matching Algorithms and Caliper]], [[Covariate Balance and Matching Diagnostics]] (all in `Econometrics/Identification Strategies/`, created 2026-06-28)

**Adjacent notes:** [[Bayesian Propensity Scores and IPW]], [[Frequentist Causal Estimation]], [[Conditional Independence Assumption]], [[The Selection Problem]], [[Omitted Variables Bias]], [[Activity Bias in Advertising]]

---

### 2. Synthetic Control Methods
**Status:** 🍂 covered

**Why it was a gap:**
[[Differences-in-Differences]] covers panel data strategies with multiple control units, but there was no note on synthetic control (Abadie, Diamond & Hainmueller 2010) — the method for settings with a single treated unit and no natural control group.

**Covered by:** [[Synthetic Control]] (created 2026-04-10)

---

### 3. Pre-registration and Open Science Practices
**Status:** 🌱 new

**Why it's a gap:**
[[Forking Paths and Bayesian Approaches]] explicitly recommends "Pre-register analyses to reduce (but not eliminate) forking paths" and [[Garden of Forking Paths]] motivates why pre-registration matters — but neither note explains *how* to pre-register or the ecosystem around it (OSF, AEA RCT Registry, registered reports, pre-analysis plans in economics). [[Researcher Degrees of Freedom]] catalogs what pre-registration is meant to constrain, but the practical implementation layer is missing. This is especially relevant given the advertising causal inference work in the vault.

**Adjacent notes:** [[Forking Paths and Bayesian Approaches]], [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[The Experimental Ideal]]

**Suggested sources / search terms:**
- Nosek et al. (2018) — "The preregistration revolution" (*PNAS*)
- Casey, Glennerster & Miguel (2012) — "Reshaping institutions: Evidence on aid impacts using a pre-analysis plan"
- Search: "pre-analysis plan", "OSF preregistration", "registered reports", "pre-registration econometrics"

---

### 4. Causal Directed Acyclic Graphs (DAGs)
**Status:** 🍂 covered

**Why it was a gap:**
DAG-based reasoning was implicitly present throughout the vault but had no dedicated note. [[Spurious Association and Confounds]] invoked fork/pipe/collider logic from Statistical Rethinking. [[Missing Data - Statistical Rethinking]] is described as "DAG-based missing data analysis." [[Nonparametric Causal Inference]] uses propensity scores that implicitly rely on a DAG's back-door criterion.

**Covered by:** [[Directed Acyclic Graphs]] (exists in `Econometrics/Foundations/`)

---

### 5. Heterogeneous Treatment Effects and CATE Estimation
**Status:** 🍂 covered

**Why it was a gap:**
[[Local Average Treatment Effects]] explicitly discusses the policy-relevance problem: LATE ≠ ATE, and different instruments identify different complier subgroups. [[Nonparametric Causal Inference]] estimates aggregate ATE/ATT using BART but does not cover conditional ATE (CATE). Machine learning metalearners were absent.

**Covered by:** [[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]], [[S-Learner]], [[Künzel 2019 - Overview]] (all in `Bayesian Statistics/Causal Inference/Treatment Effect Estimation/`, discovered 2026-04-12)

---

### 6. Simulation-Based Calibration (SBC)
**Status:** 🍂 covered

**Why it was a gap:**
[[Fitting and Validating Computation]] explicitly covers SBC (Cook et al., 2006; Talts et al., 2020) as a key computational validation tool: draw $\theta$ from the prior, simulate data, fit the model, and check that the rank statistic of the true $\theta$ within posterior samples is uniform. This is described as "more comprehensive than single-point fake-data checks" and detects both computational errors and model specification issues. However, there is no dedicated note that covers the procedure, its software implementations (SBC R package, `arviz`), and the failure modes it can detect (miscalibration, label-switching, non-identifiability). The procedure sits at the junction of Bayesian workflow, MCMC diagnostics, and prior predictive checking.

**Adjacent notes:** [[Fitting and Validating Computation]], [[Computational Troubleshooting]], [[MCMC Basics]], [[Choosing and Building Models]], [[Bayesian Workflow - Overview]]

**Suggested sources / search terms:**
- Talts et al. (2020) — "Validating Bayesian Inference Algorithms with Simulation-Based Calibration" (*arXiv*)
- Cook, Gelman & Rubin (2006) — "Validation of Software for Bayesian Models Using Posterior Quantiles"
- Säilynoja, Bürkner & Vehtari (2022) — "Graphical test for discrete uniformity and its applications" (ECDF-based SBC)
- Search: "simulation-based calibration", "SBC R package", "rank statistic", "Bayesian validation"

**Covered by:** [[Simulation-Based Calibration - Overview]], [[Data-Averaged Posterior Self-Consistency]], [[Rank Statistics and Uniformity]], [[The SBC Algorithm]], [[Interpreting SBC Histograms]], [[SBC Case Studies]] (all in `Bayesian Statistics/Workflow/`, discovered 2026-06-22)

---

### 7. Permutation and Randomization Inference
**Status:** 🌱 new

**Why it's a gap:**
[[Synthetic Control]] uses Fisher's exact test / placebo tests as its primary inference method when asymptotic inference is unavailable (small $J$). The p-value is the fraction of placebo effects more extreme than the treated-unit effect. This is introduced in the context of synthetic control but is a general principle: randomization inference assumes that treatment assignment was random and asks how extreme the observed statistic is under permutations of the treatment label. It connects to [[The Experimental Ideal]] (randomisation as the gold standard), [[Power Analysis and Sample Size]] (power under permutation tests differs from parametric power), and provides a non-parametric alternative to asymptotic frequentist inference. No note covers the general theory.

**Adjacent notes:** [[Synthetic Control]], [[The Experimental Ideal]], [[Power Analysis and Sample Size]], [[Differences-in-Differences]], [[Multiple Testing Corrections]]

**Suggested sources / search terms:**
- Fisher (1935) — *The Design of Experiments* (original randomization test)
- Imbens & Rubin (2015) — *Causal Inference for Statistics, Social, and Biomedical Sciences*, Ch. 5
- Abadie et al. (2010) — placebo test section in the synthetic control paper
- Search: "randomization inference", "permutation test causal inference", "Fisher sharp null", "Ri2 R package"

---

### 8. Factor Copulas and High-Dimensional Copula Architectures
**Status:** 🌿 still relevant

**Partially addressed (2026-06-22):** The `Econometrics/Dependence Modeling/` subfolder now has 6 notes covering factor copulas comprehensively: [[Factor Copulas - Overview]], [[Factor Copula Construction]], [[Multi-Factor and Block Dependence Structures]], [[Tail Dependence in Factor Copulas]], [[SMM Estimation of Factor Copulas]], [[Factor Copula Application - S&P 100 and Systemic Risk]]. The "what is a factor copula architecturally" part of the gap is now covered. Vine/pair copulas (C-vine, D-vine) and the comparison between copula architectures remain absent.

**Why it was a gap:**
[[Dependence Measures for Copulas]] includes a tail dependence table listing "Factor copula (Oh & Patton)" alongside Normal, Clayton, Gumbel, and Student-t copulas — but no note explains what a factor copula *is* architecturally, or how it solves the curse of dimensionality for high-dimensional dependence modeling. [[Copula Estimation]] covers Bayesian Gaussian copula estimation (bivariate). [[SMM Estimator for Copulas]] covers estimation of the factor copula model without explaining the model structure itself. Vine (pair) copulas — a flexible alternative for high-dimensional settings — are entirely absent. This gap leaves practitioners unable to choose between copula architectures for their specific application.

**Adjacent notes:** [[Dependence Measures for Copulas]], [[Copula Estimation]], [[SMM Estimator for Copulas]], [[SMM Copula Simulation and Application]], [[Factor Analysis and PPCA]]

**Suggested sources / search terms:**
- Oh & Patton (2017) — "Modelling dependence in high dimensions with factor copulas" (*JBES*)
- Aas et al. (2009) — "Pair-copula constructions of multiple dependence" (*Insurance: Mathematics and Economics*)
- Czado (2019) — *Analyzing Dependent Data with Vine Copulas*, Springer
- Search: "factor copula model", "vine copula", "pair copula construction", "high-dimensional dependence", "C-vine D-vine"

---

### 9. Causal Structure Learning from Data
**Status:** 🍂 covered

**Partially addressed (2026-06-22):** The `Causal Discovery/` subfolder now covers NOTEARS comprehensively: [[NOTEARS - Overview]], [[DAG Structure Learning Problem]], [[Smooth Characterization of Acyclicity]], [[NOTEARS Algorithm]], [[NOTEARS Experiments]]. The score-based continuous-optimization approach is well-documented. Constraint-based methods (PC algorithm, conditional independence testing) and score-based search (GES / Greedy Equivalence Search) remain entirely absent.

**Covered by:** [[Markov Equivalence and CPDAGs]], [[PC Algorithm]], [[GES Algorithm]] (all in `Causal Discovery/`, created 2026-08-26)

**Why it was a gap:**
The vault has extensive coverage of DAG *reasoning* (d-separation, back-door criterion, do-calculus — [[Directed Acyclic Graphs]], [[Canonical Causal DAGs]], [[Summary Causal DAGs]]) and DAG *construction* from expert knowledge ([[LLM Expert Elicitation for Bayesian Networks]], [[BN Construction Methods Comparison]], [[Interactive Knowledge Elicitation Method]]). But there is no note on how to *learn* a causal DAG from observational data. The PC algorithm (constraint-based, uses conditional independence tests), GES (Greedy Equivalence Search, score-based), and NOTEARS (continuous optimization, differentiable structure learning) are all absent. This gap is especially salient given the vault's ABM work: ABM outputs can be used as observational data for structure learning, and the Zeng 2025 DAG summarization work (§4 of [[Summary Causal DAGs]]) assumes the DAG is given — structure learning is what precedes summarization.

**Adjacent notes:** [[Directed Acyclic Graphs]], [[Summary Causal DAGs]], [[LLM Expert Elicitation for Bayesian Networks]], [[BN Construction Methods Comparison]], [[Approximate Bayesian Computation for ABMs]]

**Suggested sources / search terms:**
- Spirtes, Glymour & Scheines (2000) — *Causation, Prediction, and Search* (PC algorithm)
- Chickering (2002) — "Optimal structure identification with greedy search" (*JMLR*) — GES
- Zheng et al. (2018) — "DAGs with NO TEARS: Continuous optimization for structure learning" (*NeurIPS*)
- Search: "PC algorithm structure learning", "GES causal discovery", "NOTEARS", "constraint-based causal discovery"

---

### 10. Global Sensitivity Analysis
**Status:** 🌱 new

**Why it's a gap:**
[[ABM Validation Challenges]] identifies "sensitivity analysis to distinguish robust from fragile results" as one of three core validation strategies, and [[Population Initialization and Parameter Sensitivity]] covers local sensitivity (one-at-a-time parameter variation). [[Uncertainty Quantification for ABM Calibration]] applies UQ ensembles that implicitly capture parameter uncertainty. But *global* sensitivity analysis (GSA) — which quantifies how much of the model output variance is attributable to each input parameter across the full parameter space — is entirely absent. Sobol variance-based indices, Morris elementary effects screening, and the Saltelli-Tarantola FAST method are standard tools for this. GSA connects ABM calibration/validation to the broader uncertainty quantification and experimental design literature, and is especially relevant when the parameter space is high-dimensional (as in the CUBES or Karakaya models with 10+ parameters per agent type).

**Adjacent notes:** [[ABM Validation Challenges]], [[Population Initialization and Parameter Sensitivity]], [[Uncertainty Quantification for ABM Calibration]], [[Approximate Bayesian Computation for ABMs]], [[History Matching for ABMs]]

**Suggested sources / search terms:**
- Saltelli et al. (2008) — *Global Sensitivity Analysis: The Primer*, Wiley
- Morris (1991) — "Factorial sampling plans for preliminary computational experiments" (*Technometrics*)
- Sobol (1993) — "Sensitivity estimates for non-linear mathematical models" (*Mathematical Modelling*)
- Search: "Sobol sensitivity indices", "Morris screening method", "global sensitivity analysis ABM", "variance-based sensitivity", "SALib Python"

---

---

### 11. ABM Software Platforms and Tooling
**Status:** 🌱 new

**Why it's a gap:**
[[CUBES Simulator Architecture]] explicitly uses the Swarm simulation engine, and the CUBES project's viability depends on platform capabilities (concurrent agent execution, spatial representation). [[ABM Methodology and Principles]] describes the paradigm but not the software ecosystem. [[ABM Calibration Case Studies]] and [[HM-ABC Calibration Framework]] both tie calibration workflows to specific software (Python scripts, R wrappers) but assume readers know which platforms exist. The ABM applications notes (CUBES, Karakaya, Bonabeau flow/organization/market simulations) span three different toolkits without any note explaining the landscape: Mesa (Python, graph-based), NetLogo (purpose-built, Logo-dialect, GIS extensions), Repast Simphony (Java, Eclipse IDE), AnyLogic (commercial, multi-paradigm), Swarm (Objective-C/Java, now mostly historical). Practitioners choosing a platform for new research — especially the Python-fluent ABM + Bayesian workflow practitioners implied by this vault — have no guide.

**Adjacent notes:** [[CUBES Simulator Architecture]], [[ABM Methodology and Principles]], [[ABM Calibration Overview]], [[ABM vs Equation-Based Modeling]], [[Approximate Bayesian Computation for ABMs]]

**Suggested sources / search terms:**
- Railsback & Grimm (2019) — *Agent-Based and Individual-Based Modeling: A Practical Introduction, 2nd Ed.* (uses NetLogo throughout)
- Kazil, Masad & Crooks (2020) — "Utilizing Python for Agent-Based Modeling: The Mesa Framework" (*SBP-BRiMS 2020*)
- Axtell (2000) — "Why Agents? On the Varied Motivations for Agent Computing in the Social Sciences" (Brookings Working Paper)
- Search: "Mesa Python ABM", "NetLogo vs Mesa", "Repast Simphony", "AnyLogic agent-based", "ABM platform comparison"

---

### 12. Empirical Bayes Methods and Shrinkage Estimation
**Status:** 🌱 new

**Why it's a gap:**
[[Partial Pooling as Multiple Comparisons Correction]] explicitly cites two foundational empirical Bayes results: (1) the James-Stein estimator (Efron & Morris, 1975) as a frequentist analogue of Bayesian shrinkage — pooled estimates dominate unpooled ones in ≥3 dimensions; (2) Efron (2006), which draws connections between empirical Bayes, hierarchical Bayes, and FDR. [[Hierarchical Models]] covers the Bayesian hierarchical model as the principled solution, and [[Multiple Comparisons - Bayesian Perspective]] covers the applied multiple-testing context. But the empirical Bayes *methodology* — estimating the prior from marginal likelihood (parametric EB), or non-parametrically via Robbins' formula, or using Efron's local FDR — is entirely absent. Empirical Bayes is an important intermediate between fully Bayesian inference and frequentist methods, and its connection to regularisation methods (ridge regression, LASSO as EB with Laplace prior) bridges Bayesian Statistics and econometric regularisation.

**Adjacent notes:** [[Partial Pooling as Multiple Comparisons Correction]], [[Hierarchical Models]], [[Multiple Comparisons - Bayesian Perspective]], [[Asymptotics and Frequentist Connections]], [[Multiple Testing Corrections]], [[Overfitting and Information Criteria]]

**Suggested sources / search terms:**
- Efron & Morris (1975) — "Data analysis using Stein's estimator and its generalizations" (*JASA*)
- Efron & Hastie (2016) — *Computer Age Statistical Inference*, Ch. 6 (EB), Ch. 15 (large-scale EB)
- Robbins (1956) — "An empirical Bayes approach to statistics" (*Berkeley Symposium*)
- Search: "empirical Bayes", "James-Stein estimator", "local FDR empirical Bayes", "Efron large-scale inference", "parametric empirical Bayes"

---

### 13. State-Space Models and the Kalman Filter
**Status:** 🌱 new

**Why it's a gap:**
[[Bayesian Structural Time-Series Model]] uses a general state-space representation — the observation equation and state transition equation (Eqs. 2.1–2.2) — as its foundation, and MCMC inference exploits the Kalman filter/smoother for the forward pass. But the Kalman filter itself is never explained in the vault. [[Single Marketing Time Series]] covers ARIMA (which can be written as a special-case state-space model). [[Carryover Effects and Distributed Lags]] covers ADL dynamic response models. [[Local Linear Trend and Seasonality]] describes specific state-space components. Yet no note covers the general machinery: the Kalman filter recursion (predict-update), the Kalman smoother (backward pass), the connection between state-space and ARMA representations (innovation form), or extensions to non-linear/non-Gaussian settings (particle filters, unscented KF). This gap leaves readers unable to understand *how* BSTS inference works, why the modular state-space form enables tractable MCMC, or how to extend the framework to new applications.

**Adjacent notes:** [[Bayesian Structural Time-Series Model]], [[Local Linear Trend and Seasonality]], [[MCMC Inference for CausalImpact]], [[Single Marketing Time Series]], [[Carryover Effects and Distributed Lags]], [[Hilbert Space Gaussian Processes]]

**Suggested sources / search terms:**
- Durbin & Koopman (2012) — *Time Series Analysis by State Space Methods*, 2nd Ed. (Oxford)
- Harvey (1989) — *Forecasting, Structural Time Series Models and the Kalman Filter*
- Petris, Petrone & Campagnoli (2009) — *Dynamic Linear Models with R*
- Search: "Kalman filter state-space model", "Kalman smoother forward-backward", "dynamic linear model", "innovation form ARMA state-space", "particle filter non-linear"

---

### 14. Bayesian Marketing Mix Modeling (MMM)
**Status:** 🍂 covered

**Why it was a gap:**
[[Advertising and Promotion Effects]] gives the canonical empirical generalizations (short-run ad elasticity ≈ 0.10, duration interval 6–9 months), and [[Functional Forms in Marketing]] covers the ADBUDG saturation curve and multiplicative forms used in media response. [[Activity Bias in Advertising]] explains *why* passive observational data fails to measure advertising effects, and [[Observational vs Experimental Methods in Advertising]] documents the scale of the problem. But no note covers the end-to-end Bayesian MMM workflow as practiced in industry: hierarchical media response priors (geometric adstock, Hill saturation curves), the Robyn/Meridian/pymc-marketing frameworks, budget optimization under posterior uncertainty, or the model comparison step for selecting carryover vs saturation specifications. This gap sits precisely at the intersection of the vault's Market Response Models and Bayesian Statistics sections, and is the applied synthesis that practitioners reaching for these notes actually need.

**Adjacent notes:** [[Advertising and Promotion Effects]], [[Functional Forms in Marketing]], [[Carryover Effects and Distributed Lags]], [[Shape of the Marketing Response Function]], [[Optimal Marketing Decisions and Forecasting]], [[Activity Bias in Advertising]], [[Bayesian Workflow - Overview]], [[Hierarchical Models]]

**Suggested sources / search terms:**
- Jin et al. (2017) — "Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects" (Google Research)
- Lightweight MMM (Google), Meridian (Google, 2024), Robyn (Meta), pymc-marketing
- Search: "Bayesian marketing mix model", "media mix modeling adstock", "Hill saturation curve MMM", "Robyn MMM", "Meridian Google MMM"

**Covered by:** [[Bayesian Media Mix Modeling - Overview]], [[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]], [[Bayesian Estimation and Priors for MMM]], [[ROAS, mROAS, and Optimal Media Mix]], [[MMM Model Selection and Application]] (all in `Market Response Models/Bayesian Media Mix Modeling/`, discovered 2026-06-22)

---

### 15. Panel Data Econometrics (Random Effects, Hausman Test, Arellano-Bond GMM)
**Status:** 🌱 new

**Why it's a gap:**
[[Within-Between Persons Distinction - Overview]] contrasts fixed-effects and random-effects designs conceptually, and [[Fixed-Effects Model]] covers the within-person FE estimator. [[Cross-Lagged and Dynamic Panel Models]] covers the dynamic panel from a research methods perspective. But the *econometric estimation* toolkit for panel data is absent: the random-effects GLS estimator, the Hausman specification test (FE vs RE; tests whether individual effects are correlated with regressors), the Mundlak–Chamberlain device for RE with correlated effects, and Arellano-Bond GMM for dynamic panels (instrumented with lagged levels to address the "dynamic panel bias" from lagged dependent variables). This gap means a reader of [[Within-Between Persons Distinction - Overview]] cannot move to estimation without leaving the vault.

**Adjacent notes:** [[Fixed-Effects Model]], [[Within-Between Persons Distinction - Overview]], [[Cross-Lagged and Dynamic Panel Models]], [[Differences-in-Differences]], [[Standard Errors and Clustering]], [[Instrumental Variables]], [[Method of Simulated Moments]]

**Suggested sources / search terms:**
- Wooldridge (2010) — *Econometric Analysis of Cross Section and Panel Data*, Chs. 10–11
- Arellano & Bond (1991) — "Some Tests of Specification for Panel Data" (*Review of Economic Studies*)
- Mundlak (1978) — "On the Pooling of Time Series and Cross Section Data" (*Econometrica*)
- Search: "Hausman test fixed effects random effects", "Arellano Bond GMM", "Mundlak device", "dynamic panel bias", "within estimator"

---

### 16. Latent Class Models and Market Segmentation
**Status:** 🌱 new

**Why it's a gap:**
[[Heterogeneity in Agent Models]] motivates the core idea: real populations consist of diverse individuals with different preference profiles, and ABM encodes this diversity explicitly. [[Monsters and Mixtures]] covers finite mixture models (Gaussian mixtures, zero-inflated models) in the Bayesian Statistics context. [[Factor Analysis and PPCA]] covers continuous latent structure. But the bridge between these — *discrete* latent class models for market segmentation — is missing. Latent class analysis (LCA), finite mixture regression (where segment membership governs response coefficients), and their connection to the random-coefficients market response models in [[Functional Forms in Marketing]] (Eq 3.44) are absent. Nor does any note cover the choice between continuous (factor analysis, PPCA) and discrete (LCA, mixture regression) latent structures, or the Bayesian estimation approaches (collapsed Gibbs sampler, variational EM). This gap is especially salient for the vault's marketing focus: customer segmentation is the most common application of these methods in the Market Response Models domain.

**Adjacent notes:** [[Heterogeneity in Agent Models]], [[Monsters and Mixtures]], [[Factor Analysis and PPCA]], [[Functional Forms in Marketing]], [[Parameter Estimation in Market Response]], [[Hierarchical Models]], [[Generalized Linear Models]]

**Suggested sources / search terms:**
- Wedel & Kamakura (2000) — *Market Segmentation: Conceptual and Methodological Foundations*, 2nd Ed., Kluwer
- Goodman (1974) — "Exploratory Latent Structure Analysis Using Both Identifiable and Unidentifiable Models" (*Biometrika*)
- Collins & Lanza (2010) — *Latent Class and Latent Transition Analysis*
- Search: "latent class analysis", "finite mixture regression market segmentation", "Bayesian latent class", "discrete choice latent segments", "mixture of regressions"

---

### 17. LKJ Distribution and Correlation Structure Priors
**Status:** 🌱 new

**Why it's a gap:**
[[Copula Estimation]] uses `LKJCholeskyCov` in its PyMC code and contains an explanatory callout referencing the LKJ distribution — but the wikilink `[[LKJ distribution]]` points to a note that does not exist. [[Hierarchical Linear Models]] also uses `LKJCholeskyCov` for correlation among random effects. The LKJ distribution (Lewandowski, Kurowicka & Joe 2009) is the standard prior for correlation matrices in Stan and PyMC, controlled by the concentration parameter `eta`: `eta=1` is uniform over valid correlations, `eta>1` concentrates mass near the identity (independence), `eta<1` pushes toward stronger correlations. No note in the vault explains what LKJ is, why it is preferred over the inverse-Wishart prior for correlation matrices, the Cholesky parameterization for computational stability, or the separation strategy (fitting standard deviations and correlations separately). This gap blocks understanding of any multivariate Bayesian model using correlated random effects or copula structures.

**Adjacent notes:** [[Copula Estimation]], [[Hierarchical Linear Models]], [[Factor Analysis and PPCA]], [[Social Network Models]], [[Bayesian Linear Regression]]

**Suggested sources / search terms:**
- Lewandowski, Kurowicka & Joe (2009) — "Generating random correlation matrices based on vines and extended onion method" (*Journal of Multivariate Analysis*)
- Stan Development Team — *Stan Reference Manual*, § Correlation Matrix Priors
- Barnard, McCulloch & Meng (2000) — "Modeling covariance matrices in terms of standard deviations and correlations" (*Statistica Sinica*)
- Search: "LKJ distribution Stan", "LKJCholeskyCov PyMC", "correlation matrix prior Bayesian", "separation strategy covariance prior"

---

### 18. Dynamic Treatment Regimes and Optimal Policy
**Status:** 🌱 new

**Why it's a gap:**
[[Time-Varying Treatments and G-computation]] explicitly flags this boundary: "Optimal dynamic treatment regimes require combining causal inference + decision theory + reinforcement learning" — but the vault has no notes that go there. Dynamic treatment regimes (DTRs) are sequences of decision rules that individualize treatment at each time point based on the patient/subject's evolving history. The `Q-learning` algorithm (backwards induction using regression on potential outcomes) and `A-learning` (advantage function learning) are the canonical estimation approaches. These connect causal inference (the g-formula identifies the value of a regime) to decision theory (maximizing expected potential outcomes) to reinforcement learning (MDPs and policy optimization). The vault covers the observational causal identification problem (g-formula in Time-Varying Treatments) and the decision analysis context ([[Decision Analysis]]) but the synthesis — how to estimate and optimize DTRs — is absent. This is increasingly relevant in personalized medicine, digital marketing (adaptive ad sequencing), and A/B testing with adaptive stopping.

**Adjacent notes:** [[Time-Varying Treatments and G-computation]], [[Potential Outcomes Framework]], [[Decision Analysis]], [[Causal Estimands]], [[Bayesian Outcome Models]], [[Metalearners for CATE]]

**Suggested sources / search terms:**
- Murphy (2003) — "Optimal dynamic treatment regimes" (*JRSS-B*)
- Schulte et al. (2014) — "Q- and A-learning methods for estimating optimal dynamic treatment regimes" (*Statistical Science*)
- Laber & Murphy (2011) — "Adaptive confidence intervals for the test error in classification" (*JASA*)
- Search: "dynamic treatment regime Q-learning", "A-learning optimal DTR", "adaptive treatment strategy", "reinforcement learning causal inference"

---

---

### 19. Staggered Treatment and Heterogeneous DiD (Callaway-Sant'Anna, Goodman-Bacon)
**Status:** 🍂 covered

**Why it was a gap:**
[[Synthetic Control]] explicitly compares DiD and synthetic control for different data structures, and [[Differences-in-Differences]] covers the basic 2×2 DiD design. But neither note addresses the major 2018–2022 econometric literature showing that the canonical two-way fixed effects (TWFE) DiD estimator is **biased under staggered treatment timing** when treatment effects are heterogeneous. In a staggered adoption setting (different units treated at different calendar times), OLS TWFE uses already-treated units as implicit controls for later-treated units — contaminating the estimate when effects grow over time or vary across cohorts. Callaway & Sant'Anna (2021) propose cohort-time ATT aggregation; Goodman-Bacon (2021) decomposes the TWFE estimate into all 2×2 DiD comparisons; Sun & Abraham (2021) propose an interaction-weighted estimator. The vault's DiD note is unaware of these developments, leaving readers who adopt staggered panels without guidance.

**Adjacent notes:** [[Differences-in-Differences]], [[Bayesian Difference in Differences]], [[Synthetic Control]], [[Fixed-Effects Model]], [[Generalized Synthetic Control Method]], [[Local Average Treatment Effects]]

**Suggested sources / search terms:**
- Callaway & Sant'Anna (2021) — "Difference-in-Differences with multiple time periods" (*Journal of Econometrics*)
- Goodman-Bacon (2021) — "Difference-in-differences with variation in treatment timing" (*Journal of Econometrics*)
- Sun & Abraham (2021) — "Estimating dynamic treatment effects in event studies with heterogeneous treatment effects" (*Journal of Econometrics*)
- Baker, Larcker & Wang (2022) — "How much should we trust staggered difference-in-differences estimates?" (*Journal of Financial Economics*)
- Search: "staggered DiD", "heterogeneous treatment effects TWFE", "Callaway Sant'Anna DiD", "event study staggered adoption", "did R package"

**Covered by:** [[Difference-in-Differences with Multiple Time Periods - Overview]], [[Group-Time Average Treatment Effects]], [[Identifying Assumptions for Staggered DiD]], [[Doubly-Robust Estimands for ATT(g,t)]], [[Aggregating Group-Time Effects]], [[Simultaneous Inference via Multiplier Bootstrap]] (all in `Econometrics/Difference-in-Differences/`, discovered 2026-06-22)

---

### 20. Shrinkage Priors: Horseshoe and Regularized Horseshoe
**Status:** 🌱 new

**Why it's a gap:**
[[Bayesian Linear Regression]] explicitly names the **horseshoe prior** as "heavy-tailed, allows large signals while shrinking noise — state of the art for sparse problems" — but provides no explanation of what it is, why it outperforms the Gaussian (ridge) or Laplace (lasso) priors, or how to set it in practice. The note also mentions the lasso prior as "Laplace(0, λ)," but the connection between this and empirical Bayes regularisation remains implicit. [[Spike-and-Slab Prior for Covariate Selection]] exists but only in the context of BSTS covariate selection ([[Bayesian Structural Time-Series Model]]), not as a general methodology. The global-local shrinkage prior family — horseshoe (Carvalho et al. 2010), regularized horseshoe (Piironen & Vehtari 2017), R2-D2 (Zhang et al. 2022) — is the standard toolkit for Bayesian variable selection and sparse regression, and it is absent from the vault. This gap blocks understanding of high-dimensional Bayesian regression, shrinkage estimation (connecting to Empirical Bayes, gap #12), and Stan/PyMC implementations of sparse models.

**Adjacent notes:** [[Bayesian Linear Regression]], [[Spike-and-Slab Prior for Covariate Selection]], [[Hierarchical Linear Models]], [[Overfitting and Information Criteria]], [[Partial Pooling as Multiple Comparisons Correction]], [[Fitting and Validating Computation]]

**Suggested sources / search terms:**
- Carvalho, Polson & Scott (2010) — "The horseshoe estimator for sparse signals" (*Biometrika*)
- Piironen & Vehtari (2017) — "Sparsity information and regularization in the horseshoe and other shrinkage priors" (*Electronic Journal of Statistics*)
- Bhadra et al. (2019) — "Lasso meets horseshoe: A survey" (*Statistical Science*)
- Stan Development Team — *Stan Reference Manual*, §Hierarchical Priors; PyMC docs on `pm.HalfStudentT` horseshoe parameterization
- Search: "horseshoe prior Stan", "regularized horseshoe PyMC", "global-local shrinkage prior", "sparse Bayesian regression", "R2-D2 prior"

---

### 21. Bayesian Networks: Foundational Methodology
**Status:** 🌱 new

**Why it's a gap:**
[[LLM-BN Decision Support Application]] and [[LLM Expert Elicitation for Bayesian Networks]] treat BN *application* and *structure elicitation* in detail, but no note explains the foundational BN machinery: the graph separation criterion (d-separation), the factorisation theorem (joint = product of conditionals), conditional probability table (CPT) parameterisation, and exact inference algorithms (variable elimination, belief propagation) vs. approximate inference (loopy BP, MCMC over BN). [[Directed Acyclic Graphs]] covers DAG causal reasoning (do-calculus, back-door criterion) from the econometric/causal inference angle — but BN inference and the distinction between causal BNs and purely probabilistic BNs is not covered. Without this foundation, readers of the LLM-BN application notes cannot understand what the PyAgrum library is doing, why d-separation determines conditional independence, or how CPTs relate to the joint likelihood.

**Adjacent notes:** [[LLM-BN Decision Support Application]], [[LLM Expert Elicitation for Bayesian Networks]], [[BN Construction Methods Comparison]], [[Directed Acyclic Graphs]], [[Entropy-Based BN Evaluation]], [[Bayesian Outcome Models]]

**Suggested sources / search terms:**
- Pearl (1988) — *Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference*
- Koller & Friedman (2009) — *Probabilistic Graphical Models: Principles and Techniques* (MIT Press)
- Darwiche (2009) — *Modeling and Reasoning with Bayesian Networks* (Cambridge)
- Search: "Bayesian network d-separation", "CPT estimation Bayesian network", "variable elimination belief propagation BN", "PyAgrum tutorial", "probabilistic graphical model"

---

### 23. Marginal Structural Models (MSMs) and the Bayesian Bootstrap
**Status:** 🌱 new

**Why it's a gap:**
[[Time-Varying Treatments and G-computation]] explicitly presents MSMs as a "popular alternative" to the g-formula for longitudinal causal inference: instead of modeling the full conditional history, an MSM models the *marginal* potential outcome distribution directly. The IPW-based frequentist MSM (Robins et al. 2000) is contrasted with the Bayesian bootstrap version (Saarela et al. 2016). The *g-null paradox* (Robins & Wasserman 2015) — that unsaturated MSMs can rule out the zero-effect null *a priori* — is introduced without further elaboration. No note covers: what an MSM actually specifies, why IPW is the right estimation strategy, how the Bayesian bootstrap achieves valid posterior inference without a full likelihood, or how to diagnose extreme weights. This gap sits at the intersection of [[Time-Varying Treatments and G-computation]] and [[Bayesian Propensity Score Weighting]], and is distinct from gap #18 (DTRs), which is about *optimizing* treatment sequences.

**Adjacent notes:** [[Time-Varying Treatments and G-computation]], [[Bayesian Propensity Score Weighting]], [[Frequentist Causal Estimation]], [[Potential Outcomes Framework]], [[Bayesian Outcome Models]]

**Suggested sources / search terms:**
- Robins, Hernán & Brumback (2000) — "Marginal structural models and causal inference in epidemiology" (*Epidemiology*)
- Saarela et al. (2016) — "A Bayesian view of doubly robust causal inference" (*Biometrika*)
- Robins & Wasserman (1997/2015) — g-null paradox discussion
- Search: "marginal structural model MSM", "IPW longitudinal causal inference", "Bayesian bootstrap MSM", "g-null paradox", "extreme propensity weights"

---

### 24. Random Coefficients Logit and BLP Demand Estimation
**Status:** 🌱 new

**Why it's a gap:**
[[Market Share Models]] explicitly lists "random coefficients logit (BLP)" as the key relaxation of the IIA property — alongside nested logit and probit — but neither a wikilink nor any note explains what the BLP model *is*. Berry, Levinsohn & Pakes (1995) is one of the most cited papers in economics: it specifies a logit demand model with consumer-level random coefficients on product attributes (relaxing IIA), and estimates it via GMM using product characteristics as instruments for price. The model bridges [[Market Share Models]] (MCI/MNL, MRM section) and [[Discrete Choice Models]] (econometrics section) with [[Instrumental Variables]] (price endogeneity) and [[Method of Simulated Moments]] (BLP requires simulated moments for the random coefficients). The vault covers each component individually but never the synthesis that is BLP demand estimation — the standard model for market-level discrete choice in IO and marketing.

**Adjacent notes:** [[Market Share Models]], [[Discrete Choice Models]], [[Instrumental Variables]], [[Method of Simulated Moments]], [[Functional Forms in Marketing]], [[Parameter Estimation in Market Response]]

**Suggested sources / search terms:**
- Berry, Levinsohn & Pakes (1995) — "Automobile Prices in Market Equilibrium" (*Econometrica*) — the original BLP paper
- Berry (1994) — "Estimating discrete-choice models of product differentiation" (*RAND Journal of Economics*)
- Nevo (2000) — "A practitioner's guide to estimation of random-coefficients logit models of demand" (*Journal of Economics & Management Strategy*)
- Search: "BLP demand estimation", "random coefficients logit", "market-level discrete choice", "pyblp Python", "RCNL model"

---

### 22. Bass Diffusion Model and Innovation Adoption Curves
**Status:** 🌱 new

**Why it's a gap:**
[[Product Adoption and Diffusion Models]] covers ABM-based diffusion driven by social network topology and WOM. [[Opinion Leaders and Social Influence]] models opinion leaders as diffusion accelerators. [[Carryover Effects and Distributed Lags]] covers advertising carryover/persistence in MRM. But no note covers the Bass (1969) diffusion model — arguably the most influential model in marketing science — which decomposes new-product adoption into innovation effects (external influence, mass media, analogous to [[Word of Mouth Mechanisms#Broadcast]] channels) and imitation effects (internal WOM influence proportional to current adopter base). The Bass model produces the S-curve adoption pattern that both the ABM social dynamics notes and the MRM dynamic response notes reference implicitly. The connection between Bass-model imitation coefficient and ABM WOM amplification, between the Bass diffusion curve and the Koyck/ADL carryover models, and between Bass curve fitting and the more general state-space/BSTS framework, is uncharted. This gap is the missing theoretical bridge between the ABM and MRM sections.

**Adjacent notes:** [[Product Adoption and Diffusion Models]], [[Opinion Leaders and Social Influence]], [[Carryover Effects and Distributed Lags]], [[Shape of the Marketing Response Function]], [[Word of Mouth Mechanisms]], [[ABM in Marketing Strategy]], [[Market Response Models - Overview]]

**Suggested sources / search terms:**
- Bass (1969) — "A new product growth for model consumer durables" (*Management Science*)
- Mahajan, Muller & Bass (1990) — "New product diffusion models in marketing: A review and directions for research" (*Journal of Marketing*)
- Bemmaor & Lee (2002) — "The impact of heterogeneity and ill-conditioning on diffusion model parameter estimates" (*Marketing Science*)
- Search: "Bass diffusion model", "innovation imitation coefficients Bass", "S-curve new product adoption", "generalised Bass model", "Bass model estimation"

---

### 25. Structural Estimation of ABMs via SMM / Indirect Inference
**Status:** 🌱 new

**Why it's a gap:**
The vault has two complementary sections that are not yet connected: `Econometrics/Extensions/Simulation-Based Estimation` covers [[Method of Simulated Moments]], [[Indirect Inference]], [[Efficient Method of Moments]], and the [[Brock-Mirman Model - SMM Estimation Exercise]] worked example; and `Agent-Based Modeling/Calibration and Validation` covers [[Genetic Algorithm Calibration for ABM]], [[HM-ABC Calibration Framework]], [[Approximate Bayesian Computation for ABMs]], and [[Uncertainty Quantification for ABM Calibration]]. But no note bridges these: the econometric simulation-based estimation methods (SMM, II) are precisely suited for ABM calibration — matching observed moments to simulated ABM output — yet the ABM calibration notes use GA/HM+ABC and never reference SMM or II. [[Method of Simulated Moments]] lists `Q - Using SMM to Calibrate Agent Based Models` in its `used_by` field, suggesting this connection was recognised but never elaborated. A synthesis note would make both sections more useful together and document the growing literature on moment-based ABM calibration.

**Adjacent notes:** [[Method of Simulated Moments]], [[Indirect Inference]], [[Efficient Method of Moments]], [[ABM Calibration Overview]], [[Approximate Bayesian Computation for ABMs]], [[HM-ABC Calibration Framework]], [[Genetic Algorithm Calibration for ABM]], [[Brock-Mirman Model - SMM Estimation Exercise]]

**Suggested sources / search terms:**
- Grazzini & Richiardi (2015) — "Estimation of ergodic agent-based models by simulated minimum distance" (*Journal of Economic Dynamics and Control*)
- Fabretti (2013) — "On the problem of calibrating an agent-based model for financial markets" (*Journal of Economic Interaction and Coordination*)
- Search: "ABM calibration SMM", "agent-based model indirect inference", "simulated minimum distance ABM", "moment-based ABM calibration"

---

### 26. Quantile Treatment Effects and Distributional Impact Analysis
**Status:** 🌱 new

**Why it's a gap:**
[[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]], and [[S-Learner]] all estimate the conditional *average* treatment effect — but no note covers treatment effects on the *distribution* of outcomes. [[Quantile Regression]] covers the Koenker-Bassett estimator for conditional quantiles but not its causal interpretation. The vault's causal inference section repeatedly estimates ATE, ATT, and LATE — but when the policy question is "does treatment reduce the variance of outcomes?" or "are effects concentrated at the bottom of the distribution?", the existing toolkit is insufficient. Quantile treatment effects (QTE, Firpo 2007), the changes-in-changes model (Athey & Imbens 2006, a nonlinear DiD generalisation), and distributional difference-in-differences connect the Econometrics and Bayesian Causal Inference sections but are entirely absent. This gap is especially relevant for advertising effectiveness research (does treatment shift the whole sales distribution or just the mean?) and inequality analysis.

**Adjacent notes:** [[Quantile Regression]], [[Metalearners for CATE]], [[Potential Outcomes Framework]], [[Causal Estimands]], [[T-Learner and Minimax Rate]], [[Differences-in-Differences]], [[Group-Time Average Treatment Effects]], [[Aggregating Group-Time Effects]]

**Suggested sources / search terms:**
- Firpo (2007) — "Efficient semiparametric estimation of quantile treatment effects" (*Econometrica*)
- Athey & Imbens (2006) — "Identification and inference in nonlinear difference-in-differences models" (*Econometrica*) — changes-in-changes
- Chernozhukov & Hansen (2005) — "An IV model of quantile treatment effects" (*Econometrica*)
- Search: "quantile treatment effects", "distributional difference-in-differences", "changes-in-changes model", "distributional synthetic control", "QTE estimation"

---

### 27. Monads and Monadicity in Category Theory
**Status:** 🌱 new

**Why it's a gap:**
[[Units and Counits]] explicitly states: "from an adjunction $F \dashv G$, the composite $T = GF: \mathcal{A} \to \mathcal{A}$ with multiplication $\mu = G\varepsilon F$ and unit $\eta$ forms a **monad** (not covered in Leinster but a direct extension)." [[Adjoint Functors]] and [[Adjunctions via Initial Objects]] complete the adjunction picture, but the adjunction-monad correspondence — the central result linking adjunctions, algebras, and Beck's monadicity theorem — is absent. Monads appear in: functional programming (Haskell's `>>=`/`return` as the Kleisli triple), algebraic theories (monads as "monoids in the category of endofunctors," Mac Lane Ch. VII), categorical logic (Lawvere theories), and effects/computational semantics (Moggi 1991). Leinster's *Basic Category Theory* does cover monads in Chapter 5 — the source material exists but was not ingested. This is the natural next chapter after the vault's coverage of adjunctions.

**Adjacent notes:** [[Units and Counits]], [[Adjoint Functors]], [[Adjunctions via Initial Objects]], [[Synthesis/Adjoints and Limits]], [[Adjoint Functor Theorems]], [[Cartesian Closed Categories]]

**Suggested sources / search terms:**
- Leinster (2014) — *Basic Category Theory*, Ch. 5: Monads — the direct continuation of the vault's source text
- Mac Lane (1971) — *Categories for the Working Mathematician*, Ch. VI: Monads and Algebras
- Moggi (1991) — "Notions of computation and monads" (*Information and Computation*) — monads in CS/PL
- Search: "monad category theory adjunction", "Beck monadicity theorem", "Kleisli category monad", "algebras over a monad", "Eilenberg-Moore category"

---

### 28. Mediation Analysis and Natural Direct/Indirect Effects
**Status:** 🌱 new

**Why it's a gap:**
[[Bayesian Moderation Analysis]] explicitly contrasts moderation with mediation: "Mediation: $x$ affects $y$ (partly) *through* $m$. Requires causal DAG reasoning. See the PyMC mediation analysis example for contrast." Yet no note in the vault covers mediation. This is a significant omission given the vault's depth in causal inference: [[Spurious Association and Confounds]] covers fork/pipe/collider patterns (mediation is the *pipe* $x \to m \to y$), [[Potential Outcomes Framework]] defines the potential outcomes that mediation analysis targets, and [[Directed Acyclic Graphs]] formalises the front-door criterion. The classical Baron-Kenny "causal steps" approach and the difference-in-coefficients/product-of-coefficients estimators are absent, as is the modern potential-outcomes approach: Pearl's natural direct effect (NDE) and natural indirect effect (NIE), the identification requirement of no unmeasured mediator-outcome confounding, and the sensitivity analysis methods (VanderWeele 2015). The Bayesian approach (posterior over mediation pathways) connects this to [[Hierarchical Linear Models]] and [[Generalized Linear Models]].

**Adjacent notes:** [[Bayesian Moderation Analysis]], [[Spurious Association and Confounds]], [[Potential Outcomes Framework]], [[Directed Acyclic Graphs]], [[Nonparametric Causal Inference]], [[Causal Estimands]], [[Generalized Linear Models]]

**Suggested sources / search terms:**
- Baron & Kenny (1986) — "The moderator-mediator variable distinction in social psychological research" (*JPSP*)
- VanderWeele (2015) — *Explanation in Causal Inference: Methods for Mediation and Interaction*, Oxford
- Pearl (2001) — "Direct and indirect effects" (*UAI proceedings*)
- Imai, Keele & Tingley (2010) — "A general approach to causal mediation analysis" (*Psychological Methods*)
- Search: "mediation analysis causal inference", "natural direct indirect effect", "Baron Kenny mediation", "PyMC mediation", "sensitivity analysis mediation"

---

### 29. GARCH and Conditional Heteroscedasticity Models
**Status:** 🌱 new

**Why it's a gap:**
[[Factor Copula Application - S&P 100 and Systemic Risk]] fits **AR(1)-GJR-GARCH** marginal models with a leverage parameter $\gamma_i > 0$ for 97/100 S&P 100 constituents before applying the factor copula. This is the standard pre-filtering step in financial econometrics, yet GARCH models are entirely absent from the vault. [[Single Marketing Time Series]] covers ARIMA for marketing data; [[Carryover Effects and Distributed Lags]] covers ADL/Koyck models — neither addresses conditional heteroscedasticity. The ARCH/GARCH family (Engle 1982; Bollerslev 1986) models time-varying variance: $\sigma_t^2 = \omega + \alpha\varepsilon_{t-1}^2 + \beta\sigma_{t-1}^2$. Extensions include EGARCH (asymmetric), GJR-GARCH (leverage), GARCH-M (risk premium in mean), and multivariate variants (DCC, BEKK). The Bayesian approach connects to [[Efficient MCMC]] and [[Introduction to Bayesian Computation]]. Without this note, readers of the Factor Copula and Dependence Modeling notes cannot understand the marginal filtering step that converts raw returns into standardised residuals suitable for copula estimation.

**Adjacent notes:** [[Factor Copula Application - S&P 100 and Systemic Risk]], [[SMM Estimation of Factor Copulas]], [[Dependence Measures for Copulas]], [[Single Marketing Time Series]], [[Carryover Effects and Distributed Lags]], [[Bayesian Structural Time-Series Model]], [[Introduction to Bayesian Computation]]

**Suggested sources / search terms:**
- Engle (1982) — "Autoregressive conditional heteroscedasticity with estimates of the variance of UK inflation" (*Econometrica*) — ARCH
- Bollerslev (1986) — "Generalized autoregressive conditional heteroscedasticity" (*Journal of Econometrics*) — GARCH
- Glosten, Jagannathan & Runkle (1993) — "On the relation between the expected value and the volatility of the nominal excess return on stocks" (*JF*) — GJR-GARCH
- Engle (2002) — "Dynamic conditional correlation" (*JBES*) — DCC multivariate GARCH
- Search: "GARCH model volatility clustering", "GJR-GARCH leverage effect", "ARCH GARCH PyMC Stan", "DCC multivariate GARCH", "GARCH copula marginal filtering"

---

### 30. Partial Identification and Manski Bounds
**Status:** 🌱 new

**Why it's a gap:**
[[Sensitivity Analysis in Observational Studies]] quantifies robustness to unmeasured confounding — it asks "how much confounding would be needed to explain away the result?" A complementary and arguably more fundamental approach is *partial identification*: characterizing the sharp range of treatment effects that is **logically compatible with the observed data** without imposing any untestable assumptions. Manski (1990) derives the "natural bounds" for average treatment effects under binary treatment and bounded outcomes — no assumptions beyond data support. Balke & Pearl (1994) derive tight bounds under binary IV. Lee (2009) provides sample selection (trimming) bounds. Rambachan & Roth (2023) derive sensitivity analysis bounds for parallel trends violations in DiD. None of this is in the vault. The gap matters because sensitivity analysis and partial identification are complementary: sensitivity analysis says "here's how robust my estimate is"; partial identification says "here's the worst case without any assumptions." Both should inform applied causal inference alongside the point estimates in [[Frequentist Causal Estimation]], [[Sensitivity Analysis in Observational Studies]], and [[Differences-in-Differences]].

**Adjacent notes:** [[Sensitivity Analysis in Observational Studies]], [[Potential Outcomes Framework]], [[Instrumental Variables]], [[The Selection Problem]], [[Differences-in-Differences]], [[Frequentist Causal Estimation]]

**Suggested sources / search terms:**
- Manski (1990) — "Nonparametric bounds on treatment effects" (*AER Papers and Proceedings*)
- Balke & Pearl (1994) — "Nonparametric bounds on causal effects from partial compliance"
- Lee (2009) — "Training, wages, and sample selection: Estimating sharp bounds on treatment effects" (*Review of Economic Studies*)
- Rambachan & Roth (2023) — "A more credible approach to parallel trends" (*Review of Economic Studies*)
- Search: "partial identification treatment effects", "Manski bounds ATE", "Balke Pearl bounds IV", "Lee bounds sample selection", "sensitivity analysis parallel trends violations"

---

### 31. Extreme Value Theory (EVT) and Tail Risk
**Status:** 🌱 new

**Why it's a gap:**
[[Factor Copulas - Overview]] describes "analytical tail-dependence results via extreme value theory" as a key feature of the fat-tailed factor copula, and [[Tail Dependence in Factor Copulas]] derives these results in detail. [[Factor Copula Application - S&P 100 and Systemic Risk]] fits AR(1)-GJR-GARCH marginals before applying the factor copula — and EVT provides the distributional theory for the tail behavior of those standardised residuals. Yet EVT itself is never introduced in the vault. The foundational content missing: the three types of extreme value distributions (Gumbel, Fréchet, Weibull), the Generalized Extreme Value (GEV) family and Fisher-Tippett-Gnedenko theorem, the Pickands-Balkema-de Haan theorem (exceedances over a threshold converge to the Generalized Pareto Distribution), Peaks-Over-Threshold (POT) methods, and max-stable distributions (the copula-level analogue of the GEV for multivariate extremes). EVT also connects to [[Operational Risk Modeling with ABM]] (extreme loss modeling) and to the copula dependence measures in [[Dependence Measures for Copulas]] (upper/lower tail dependence coefficients have EVT interpretations). Without this note, readers of the Dependence Modeling cluster cannot understand why fat-tailed factor distributions produce non-zero tail dependence or how to model extreme risks in practice.

**Adjacent notes:** [[Factor Copulas - Overview]], [[Tail Dependence in Factor Copulas]], [[Dependence Measures for Copulas]], [[Factor Copula Application - S&P 100 and Systemic Risk]], [[Operational Risk Modeling with ABM]], [[SMM Estimation of Factor Copulas]]

**Suggested sources / search terms:**
- Coles (2001) — *An Introduction to Statistical Modeling of Extreme Values*, Springer — standard reference
- McNeil, Frey & Embrechts (2005) — *Quantitative Risk Management*, Ch. 7: Extreme Value Theory — finance context
- Pickands (1975) — "Statistical inference using extreme order statistics" (*Annals of Statistics*)
- Beirlant et al. (2004) — *Statistics of Extremes: Theory and Applications*, Wiley
- Search: "extreme value theory GPD", "Pickands-Balkema-de Haan theorem", "peaks over threshold method", "GEV distribution tail risk", "EVT copula tail dependence"

---

### 32. RD Bandwidth Selection and Local Polynomial Estimation
**Status:** 🌱 new

**Why it's a gap:**
[[Regression Discontinuity Designs]] covers parametric polynomial regression and a nonparametric "small neighborhood δ" approach — but the formal bias-variance tradeoff for bandwidth selection is entirely absent. In practice, the choice of bandwidth $h$ is the most consequential decision in any RD analysis: too wide and the polynomial approximation is biased; too narrow and the estimator has high variance. Imbens & Kalyanaraman (2012) derive the MSE-optimal bandwidth selector (cross-validation over a kernel regression), and Calonico, Cattaneo & Titiunus (2014) provide bias-corrected robust confidence intervals (implemented in `rdrobust` for R and Stata). Without this, readers cannot apply the RD designs described in the vault to real data in a defensible way.

**Adjacent notes:** [[Regression Discontinuity Designs]], [[Instrumental Variables]], [[Local Average Treatment Effects]], [[Model Checking]], [[Standard Errors and Clustering]]

**Suggested sources / search terms:**
- Imbens & Kalyanaraman (2012) — "Optimal bandwidth choice for the regression discontinuity estimator" (*Review of Economic Studies*)
- Calonico, Cattaneo & Titiunus (2014) — "Robust nonparametric confidence intervals for regression-discontinuity designs" (*Econometrica*)
- Cattaneo, Idrobo & Titiunus (2020) — *A Practical Introduction to Regression Discontinuity Designs*, Cambridge
- Search: "RD optimal bandwidth", "rdrobust Stata R", "local linear regression RD", "bias-corrected robust CI RD"

---

### 33. Variational Inference (ADVI, ELBO, Mean Field)
**Status:** 🌱 new

**Why it's a gap:**
[[SBC Case Studies]] explicitly tests ADVI (Automatic Differentiation Variational Inference in Stan) on a simple linear regression and finds it "drastically underestimates the posterior for the slope β" — a sharp failure mode that makes ADVI's SBC rank histogram strongly non-uniform. The vault documents this failure but cannot explain it. The ELBO (Evidence Lower BOund) objective, mean-field factorization assumption (which forces posterior independence across parameters), the KL divergence $D_\text{KL}(q(\theta) \| p(\theta|y))$, black-box VI (BBVI), and ADVI's reparameterization trick are all absent. [[Approximation Methods]] (in `Bayesian Statistics/Computation/`) likely covers this partially, but the SBC case study makes the failure mode salient and motivates a dedicated treatment. This gap also connects to [[Hilbert Space Gaussian Processes]] (HSGPs use Laplace approximations / EP as alternatives to full VI), [[Efficient MCMC]] (VI as a cheaper but biased alternative), and [[Monsters and Mixtures]] (mean-field VI fails on mixture models due to the symmetry of mixture components).

**Adjacent notes:** [[SBC Case Studies]], [[Approximation Methods]], [[Efficient MCMC]], [[Introduction to Bayesian Computation]], [[Fitting and Validating Computation]], [[Hilbert Space Gaussian Processes]]

**Suggested sources / search terms:**
- Blei, Kucukelbir & McAuliffe (2017) — "Variational inference: A review for statisticians" (*JASA*)
- Kucukelbir et al. (2017) — "Automatic differentiation variational inference" (*JMLR*)
- Jordan et al. (1999) — "An introduction to variational methods for graphical models" (*Machine Learning*)
- Stan Development Team — *Stan User's Guide*, §Variational Inference with ADVI
- Search: "variational inference ELBO", "mean-field variational Bayes", "ADVI Stan failure", "black-box variational inference", "BBVI PyMC"

---

### 34. Curry-Howard Correspondence and Type Theory
**Status:** 🌱 new

**Why it's a gap:**
[[Cartesian Closed Categories]] explicitly describes CCCs as "the categorical models of the simply-typed lambda calculus" and includes a callout on the **propositions as types / proofs as programs** correspondence (Curry-Howard): objects = types, morphisms = proofs, products = conjunction, exponentials = implication, terminal object = truth. This connection is stated but never developed. The vault's Category Theory section covers the full adjunction-limit-representable chain through synthesis (Chapter 6 of Leinster), but the bridge to type theory and programming language semantics is entirely absent. Dependent type theory (Martin-Löf, Coq/Lean, the HoTT book), the connection to functional programming (Haskell's type class hierarchy mirrors the adjunction chain: Functor → Applicative → Monad), and the denotational semantics of programming languages (Scott domains, domain theory) are all natural next chapters. This gap is especially salient given gap #27 (Monads and Monadicity), where the Category Theory and CS/PL connections converge.

**Adjacent notes:** [[Cartesian Closed Categories]], [[Adjunctions/Adjoint Functors]], [[Adjunctions/Units and Counits]], [[Category Theory/Synthesis/Adjoints and Limits]], [[Basic Category Theory - Overview]]

**Suggested sources / search terms:**
- Wadler (2015) — "Propositions as types" (*Communications of the ACM*) — accessible survey
- Pierce (2002) — *Types and Programming Languages*, MIT Press — standard PL textbook
- Univalent Foundations Program (2013) — *Homotopy Type Theory* (HoTT Book) — CCC as model of dependent type theory
- Lambek & Scott (1986) — *Introduction to Higher-Order Categorical Logic* — original categorical logic reference
- Search: "Curry-Howard correspondence", "propositions as types proofs as programs", "CCC simply typed lambda calculus", "categorical semantics type theory", "Haskell category theory"

---

### 35. Regularization-Induced Confounding in High-Dimensional Bayesian Causal Inference
**Status:** 🌱 new

**Why it's a gap:**
[[Li et al 2022 - Overview]] explicitly identifies *regularization-induced confounding* as a "critical high-dimensional challenge unique to Bayesian causal inference": in high-dimensional outcome models, shrinkage priors (lasso, horseshoe) that regularize covariate coefficients toward zero can induce spurious apparent associations between treatment and outcome. When confounders are shrunk toward zero by a regularizing prior, the treatment coefficient must "absorb" the variation they would otherwise explain — producing a biased treatment effect estimate even when the causal model is correct and all confounders are observed. No note explains: (1) why this happens (the prior independence of treatment and outcome model parameters — Assumption 3.2 in Li et al. — acts as strongly informative in high dimensions); (2) the proposed remedies (BART avoids regularization-induced confounding by not imposing a parametric structure; separate specification of treatment and outcome models; design-stage overlap enforcement); or (3) when Bayesian regularization is safe vs. dangerous in causal settings (low-dimensional settings, or when the regularization strength is calibrated to the true sparsity level). This gap sits between [[Li et al 2022 - Overview]] and gap #20 (Horseshoe Priors) but is distinct — it concerns the *causal* implications of regularization, not the prior's statistical properties.

**Adjacent notes:** [[Li et al 2022 - Overview]], [[Bayesian Outcome Models]], [[General Structure of Bayesian CI]], [[Nonparametric Causal Inference]], [[Bayesian Linear Regression]], gap #20 (Horseshoe and Regularized Horseshoe Priors)

**Suggested sources / search terms:**
- Li, Ding & Mealli (2023) — "Bayesian causal inference: a critical review" (*Phil. Trans. R. Soc. A*) — §4 on high-dimensional outcome models
- Hahn, Murray & Carvalho (2020) — "Bayesian regression tree models for causal inference: Regularization, confounding, and heterogeneous treatment effects" (*Bayesian Analysis*) — BART-BCF as the solution
- Zigler & Cefalu (2017) — "Invited commentary: Targeted learning in real-world settings" (*American Journal of Epidemiology*)
- Search: "regularization-induced confounding Bayesian", "BART BCF causal inference", "Bayesian causal high-dimensional prior", "Hahn Murray Carvalho BCF"

---

### 36. Causal Survival Analysis and Estimand Controversy around the Hazard Ratio
**Status:** 🌱 new

**Why it's a gap:**
[[Survival Analysis]] introduces the Cox proportional hazards model and hazard ratio (HR) — but does not address the growing literature questioning the HR as a *causal* estimand. Hernán (2010, "The hazard of hazard ratios") shows the HR is *non-collapsible* and subject to built-in *survivor bias*: even under perfect randomization, conditioning on time-in-study (surviving long enough to be at risk) induces selection that changes the HR over time. The restriction mean survival time (RMST), risk difference at a fixed time, and counterfactual survival curves are proposed as causally interpretable alternatives. No note covers: the non-collapsibility issue; the structural nested failure time model (SNFTM) for estimating survivor-average causal effects; marginal structural Cox models (IPW-weighted Cox to target a marginal HR); censoring-weighted Kaplan-Meier curves; or the estimand framework applied to survival outcomes. This gap connects [[Survival Analysis]] to [[Estimands in Longitudinal Research]], [[Potential Outcomes Framework]], and [[Causal Estimands]] — and is especially salient for clinical trial analysis and time-to-event data in advertising/subscription contexts.

**Adjacent notes:** [[Survival Analysis]], [[Estimands in Longitudinal Research]], [[Potential Outcomes Framework]], [[Causal Estimands]], [[Time-Varying Treatments and G-computation]], gap #23 (Marginal Structural Models)

**Suggested sources / search terms:**
- Hernán (2010) — "The hazard of hazard ratios" (*Epidemiology*)
- Hernán & Robins (2020) — *Causal Inference: What If*, Ch. 17: Survival analysis causal inference
- Uno et al. (2014) — "Moving beyond the hazard ratio in quantifying the between-group difference in survival analysis" (*JCO*)
- ICH E9(R1) Addendum (2019) — Estimand Framework for clinical trials (includes survival setting)
- Search: "hazard ratio non-collapsible", "restricted mean survival time RMST causal", "marginal structural Cox model", "structural nested failure time model", "ICH E9 R1 estimand survival"

---

---

### 37. Bayesian Model Averaging (BMA) and Model Stacking
**Status:** 🌱 new

**Why it's a gap:**
[[Model Selection and Exploratory Analysis]] explicitly names Bayesian Model Averaging as an alternative to AIC/BIC model selection: "assign posterior probability to each model and average predictions." [[Overfitting and Information Criteria]] covers WAIC and information criteria that can be re-interpreted as model weights, and [[Model Comparison]] (BDA3 Ch. 7) likely covers Bayes factors as the weights. But no note explains the BMA machinery end-to-end: computing marginal likelihoods (or approximating them via BIC/harmonic mean), forming model weights $P(M_k \mid y) \propto P(y \mid M_k) P(M_k)$, averaging predictions $\hat{y} = \sum_k P(M_k \mid y) E[y^* \mid y, M_k]$, and the failure modes (BMA concentrates on a single model as $n \to \infty$; it is not the same as predictive stacking). Bayesian stacking (Yao et al. 2018) improves on BMA by optimizing linear prediction weights to maximize held-out log-score — treating model selection as a regularized ensemble problem. The vault's model comparison toolkit (AIC, BIC, WAIC, LOO-CV) is strong, but the synthesis step — combining rather than selecting models — is absent.

**Adjacent notes:** [[Model Selection and Exploratory Analysis]], [[Overfitting and Information Criteria]], [[Model Comparison]], [[Bayesian Workflow - Overview]], [[Hierarchical Models]], [[MMM Model Selection and Application]]

**Suggested sources / search terms:**
- Hoeting, Madigan, Raftery & Volinsky (1999) — "Bayesian model averaging: A tutorial" (*Statistical Science*)
- Yao, Vehtari, Simpson & Gelman (2018) — "Using stacking to average Bayesian predictive distributions" (*Bayesian Analysis*)
- Raftery, Madigan & Hoeting (1997) — "Bayesian model averaging for linear regression models" (*JASA*)
- Search: "Bayesian model averaging BMA", "model stacking Bayesian", "Yao stacking predictive", "LOO stacking vs BMA", "model weights WAIC"

---

### 39. Design of Computer Experiments (Latin Hypercube Sampling, Space-Filling Designs)
**Status:** 🌱 new

**Why it's a gap:**
[[History Matching for ABMs]] explicitly uses Latin Hypercube Sampling (LHS) for space-filling parameter exploration and contained a now-fixed broken wikilink to a nonexistent `[[Experimental Design for ABMs]]` note — signaling that this topic was intended to be covered but never was. [[Population Initialization and Parameter Sensitivity]] covers local (one-at-a-time) parameter sensitivity but not the global space-filling designs needed for efficient high-dimensional ABM calibration. [[Uncertainty Quantification for ABM Calibration]] and [[Approximate Bayesian Computation for ABMs]] both depend on dense, space-covering parameter samples without explaining how to generate them. The theory of computer experiments (Sacks et al. 1989; the DACE metamodeling framework) and the main space-filling design families — maximin LHS, orthogonal LHS, Sobol quasi-random sequences, Halton sequences, central composite designs — are entirely absent. This gap is the methodological foundation missing beneath the entire ABM calibration cluster and directly connects to gap #10 (Global Sensitivity Analysis), which uses Sobol sequences for the Saltelli-Tarantola method.

**Adjacent notes:** [[History Matching for ABMs]], [[Population Initialization and Parameter Sensitivity]], [[Uncertainty Quantification for ABM Calibration]], [[Approximate Bayesian Computation for ABMs]], [[HM-ABC Calibration Framework]], gap #10 (Global Sensitivity Analysis)

**Suggested sources / search terms:**
- McKay, Beckman & Conover (1979) — "A comparison of three methods for selecting values of input variables in the analysis of output from a computer code" (*Technometrics*) — original LHS paper
- Sacks, Welch, Mitchell & Wynn (1989) — "Design and analysis of computer experiments" (*Statistical Science*) — DACE metamodel framework
- Saltelli et al. (2008) — *Global Sensitivity Analysis: The Primer*, Ch. 1–2: quasi-random sampling and Sobol sequences
- Santner, Williams & Notz (2003) — *The Design and Analysis of Computer Experiments*, Springer
- Search: "Latin hypercube sampling design", "space-filling experimental design", "Sobol sequences quasi-random", "computer experiments DACE metamodel", "pyDOE Python LHS"

---

### 40. Double/Debiased Machine Learning (DML) and Neyman Orthogonality
**Status:** 🌱 new

**Why it's a gap:**
[[Synthetic Control Extensions]] covers matrix completion and elastic-net SC — methods that apply ML regularization to panel counterfactual estimation. [[Metalearners for CATE]] (X-Learner, T-Learner, S-Learner) use cross-fitting to avoid regularization bias in treatment effect estimation. [[Frequentist Causal Estimation]] establishes the doubly-robust (DR) framework that DML extends. Yet no note covers the Chernozhukov et al. (2018) Double/Debiased Machine Learning framework, which unifies all three: (1) **Neyman orthogonality** — using a loss function whose gradient is insensitive (locally orthogonal) to nuisance function errors, so that $\sqrt{n}$-consistent estimation of structural parameters is possible even with slow ($n^{1/4}$-consistent) nuisance estimators; (2) **cross-fitting** (sample splitting) — avoids the "own-observation" bias of using the same data to estimate nuisance functions and target parameters; (3) **DR scores** as the canonical Neyman-orthogonal score for the ATE/ATT/CATE. DML directly addresses the regularization-induced confounding problem (gap #35) in a frequentist framework — BART-BCF is the Bayesian solution, DML is the frequentist solution. The `EconML` (Microsoft) and `DoubleML` (Python/R) libraries implement DML and are increasingly standard in applied causal ML work.

**Adjacent notes:** [[Frequentist Causal Estimation]], [[Metalearners for CATE]], [[Synthetic Control Extensions]], [[Nonparametric Causal Inference]], [[Propensity Score Matching - Overview]], gap #35 (Regularization-Induced Confounding)

**Suggested sources / search terms:**
- Chernozhukov, Chetverikov, Demirer, Duflo, Hansen, Newey & Robins (2018) — "Double/debiased machine learning for treatment and structural parameters" (*Econometrics Journal*)
- Chernozhukov, Newey & Robins (2018) — "Double/debiased machine learning using regularized Riesz representers" (*arXiv*)
- Bach, Chernozhukov, Kurz & Spindler (2022) — "DoubleML — An object-oriented implementation of double machine learning in Python" (*JMLR*)
- Syrgkanis et al. (2019) — "Machine learning estimation of heterogeneous treatment effects with instruments" (EconML)
- Search: "double machine learning DML Chernozhukov", "Neyman orthogonality causal inference", "cross-fitting debiased ML", "EconML DoubleML Python", "partially linear model DML"

---

### 41. Granovetter Threshold Models and Social Tipping Points
**Status:** 🌱 new

**Why it's a gap:**
[[Behavioral Primitives and Thresholds]] formalizes CUBES's three-threshold BP mechanism (lower inhibiting, upper inhibiting, triggering) as the core decision unit for each consumer agent. [[Network Topology Effects on Diffusion]] shows that clustered networks produce two-wave adoption patterns invisible to mean-field models. These two notes describe — without naming it — the precise mechanism of Granovetter's (1978) threshold model of collective behavior: individuals adopt when the fraction of others who have adopted exceeds their personal threshold, and the distribution of thresholds across the population determines whether small initial shocks cascade (tipping point) or stall. No note explains: Granovetter's original binary-threshold model and its fixedpoint analysis (the S-curve emerges from heterogeneous threshold distributions); Schelling's (1978) segregation model as a parallel instantiation; the connection between threshold heterogeneity, network topology, and the multi-wave patterns in [[Network Topology Effects on Diffusion]]; or the theoretical bridge to the Bass model (gap #22, innovation/imitation = external/internal influence = threshold below/above the adopter fraction). This gap is the missing theoretical glue between the CUBES behavioral layer and the network diffusion layer of the ABM section.

**Adjacent notes:** [[Behavioral Primitives and Thresholds]], [[Network Topology Effects on Diffusion]], [[Product Adoption and Diffusion Models]], [[Opinion Leaders and Social Influence]], [[Word of Mouth Mechanisms]], [[Heterogeneity in Agent Models]], [[Social Network Formation in Consumer Markets]], gap #22 (Bass Diffusion Model)

**Suggested sources / search terms:**
- Granovetter (1978) — "Threshold models of collective behavior" (*American Journal of Sociology*)
- Watts (2002) — "A simple model of global cascades on random networks" (*PNAS*)
- Dodds & Watts (2004) — "Universal behavior in a generalized model of contagion" (*Physical Review Letters*) — generalizes the threshold model to arbitrary contagion
- Schelling (1978) — *Micromotives and Macrobehavior*, Ch. 3–4: tipping and segregation
- Search: "Granovetter threshold model collective action", "social tipping point network", "cascade threshold model", "Watts Strogatz contagion threshold", "heterogeneous threshold adoption model"

---

### 38. Sparse Gaussian Process Approximations (Inducing Points, Nyström)
**Status:** 🌱 new

**Why it's a gap:**
[[Nonparametric Models Overview]] explicitly flags the O($n^3$) cost of Gaussian processes as the key computational barrier: "challenging for large datasets." [[Hilbert Space Gaussian Processes]] covers one approximation — HSGPs, which exploit the spectral structure of stationary kernels on regular 1D/2D grids. But the general family of *sparse* GP approximations for irregular, high-dimensional inputs is entirely absent. The two main families are: (1) **inducing point methods** — Nyström approximation (Williams & Seeger 2001; approximates the kernel matrix by $m \ll n$ inducing inputs), Fully Independent Training Conditional (FITC; Snelson & Ghahramani 2006), and Stochastic Variational GP (SVGP; Hensman et al. 2013), which optimizes inducing points via ELBO and enables minibatch training; (2) **kernel approximations** — random Fourier features (Rahimi & Recht 2007) and structured kernel interpolation (SKI; Wilson & Nickisch 2015). Without these, readers of the [[Spatial Models - BYM]] and [[Hilbert Space Gaussian Processes]] notes cannot scale GP models to non-temporal, high-dimensional problems (e.g., geo-spatial marketing data, image features, embedding spaces). This gap is especially salient given the vault's interest in the [[Approximation Methods]] / ADVI connection (gap #33) and the [[Factor Analysis and PPCA]] amortized inference workflow.

**Adjacent notes:** [[Nonparametric Models Overview]], [[Hilbert Space Gaussian Processes]], [[Spatial Models - BYM]], [[Approximation Methods]], [[Factor Analysis and PPCA]], [[Efficient MCMC]]

**Suggested sources / search terms:**
- Titsias (2009) — "Variational learning of inducing variables in sparse Gaussian processes" (*AISTATS*)
- Hensman, Fusi & Lawrence (2013) — "Gaussian processes for big data" (*UAI*) — stochastic variational GP
- Williams & Seeger (2001) — "Using the Nyström method to speed up kernel machines" (*NIPS*)
- Rahimi & Recht (2007) — "Random features for large-scale kernel machines" (*NIPS*)
- Search: "sparse Gaussian process inducing points", "SVGP GPflow PyTorch", "Nyström approximation GP", "random Fourier features kernel", "HSGP vs inducing points"

---

### 42. Weak Instruments and First-Stage Diagnostics
**Status:** 🌱 new

**Why it's a gap:**
[[Instrumental Variables and Principal Stratification]] derives the CACE/LATE estimand and shows it equals the probability limit of the 2SLS estimator — but never addresses the critical practical question: *when is the instrument strong enough?* A weak instrument (one with only modest predictive power for treatment take-up) causes 2SLS estimates to be severely biased toward OLS — the "worst-case" estimator under confounding. The Staiger & Stock (1997) rule of thumb (first-stage F > 10) and the more formal Stock & Yogo (2005) critical values for weak-instrument tests are absent. Recent developments include: Olea & Pflueger (2013) robust F-statistic for non-i.i.d. errors; Anderson-Rubin (AR) confidence sets and conditional likelihood ratio (CLR) tests, which are valid regardless of instrument strength; and many-weak-instruments asymptotics (Chao & Swanson 2005, Newey & Windmeijer 2009). The vault covers IV theory thoroughly ([[Frequentist Causal Estimation]], [[Instrumental Variables and Principal Stratification]]) but gives practitioners no tools to assess instrument validity before trusting the estimate.

**Adjacent notes:** [[Instrumental Variables and Principal Stratification]], [[Frequentist Causal Estimation]], [[Causal Estimands]], [[Local Average Treatment Effects]], [[Standard Errors and Clustering]]

**Suggested sources / search terms:**
- Staiger & Stock (1997) — "Instrumental variables regression with weak instruments" (*Econometrica*)
- Stock & Yogo (2005) — "Testing for weak instruments in linear IV regression" (Andrews & Stock, eds.)
- Olea & Pflueger (2013) — "A robust F-statistic for weak instruments" (*Journal of Econometrics*)
- Andrews & Stock & Sun (2019) — "Weak instruments in instrumental variables regression: Theory and practice" (*Annual Review of Economics*)
- Search: "weak instruments F-statistic 2SLS", "Stock Yogo critical values", "Anderson-Rubin confidence set IV", "many weak instruments asymptotics", "ivregress weakiv Stata"

---

### 43. Spectral Analysis and Frequency-Domain Methods for Time Series
**Status:** 🌱 new

**Why it's a gap:**
[[Hilbert Space Gaussian Processes]] explicitly states that "The orthonormal basis is analogous to the **spectral representation** of stationary processes" — linking the HSGP approximation to the spectral density of the kernel. [[Local Linear Trend and Seasonality]] and [[Bayesian Structural Time-Series Model]] decompose time series into trend + seasonal components, which correspond to specific frequency bands. [[Single Marketing Time Series]] covers ARIMA in the time domain. Yet no note introduces the frequency domain itself: the spectral density $f(\omega) = \sum_{h=-\infty}^{\infty} \gamma(h) e^{-i\omega h}$ as the Fourier transform of the autocovariance function, the Wiener-Khintchine theorem (the two representations are equivalent for stationary processes), the periodogram as the sample analogue of the spectral density, Welch's method and smoothed spectral estimates, and the Whittle likelihood (a frequency-domain approximate likelihood that enables computationally efficient estimation of time series models including long-memory / fractionally integrated processes). The spectral perspective connects ARIMA models (rational spectral densities), HSGP kernels (smooth spectral densities), and seasonal decomposition (peaks at seasonal frequencies) in a unified framework that is entirely missing from the vault.

**Adjacent notes:** [[Hilbert Space Gaussian Processes]], [[Local Linear Trend and Seasonality]], [[Bayesian Structural Time-Series Model]], [[Single Marketing Time Series]], [[Carryover Effects and Distributed Lags]], [[Nonparametric Models Overview]]

**Suggested sources / search terms:**
- Brockwell & Davis (2016) — *Introduction to Time Series and Forecasting*, 3rd Ed., Ch. 4: Spectral Analysis
- Shumway & Stoffer (2017) — *Time Series Analysis and Its Applications with R Examples*, 4th Ed., Ch. 4
- Chatfield (2004) — *The Analysis of Time Series: An Introduction*, 6th Ed.
- Whittle (1953) — "Estimation and information in stationary time series" (*Arkiv för Matematik*)
- Search: "spectral density time series R", "periodogram smoothing Welch", "Whittle likelihood long memory", "frequency domain analysis marketing", "spectral representation stationary process"

---

### 44. Entropy Balancing and Overlap Weighting
**Status:** 🌱 new

**Why it's a gap:**
[[Covariate Balance and Matching Diagnostics]] mentions "overlap weights" alongside IPW in its discussion of the effective sample size diagnostic: "For weighting estimators (IPW, overlap weights), the ESS measures how much the weights reduce information." [[Bayesian Propensity Score Weighting]] and [[Frequentist Causal Estimation]] cover IPTW/IPW — but no note explains the newer weighting approaches that directly target covariate balance rather than estimating a propensity score first. **Entropy balancing** (Hainmueller 2012) finds weights via a constrained optimization that forces exact balance on user-specified moments (means, variances, interactions) without any model of the propensity score. **Overlap weights** (Li, Morgan & Zaslavsky 2018) use $w(X) = e(X)(1-e(X))$ as weights, down-weighting units with extreme propensity scores and focusing inference on the overlap population — the subgroup for whom treatment could plausibly be assigned either way. Both methods improve on IPTW: entropy balancing avoids propensity model misspecification; overlap weights avoid extreme weights and ESS loss. Neither is covered in the vault, leaving practitioners without the state-of-the-art balancing toolkit for when PSM or IPTW performs poorly.

**Adjacent notes:** [[Covariate Balance and Matching Diagnostics]], [[Propensity Score Matching - Overview]], [[Bayesian Propensity Score Weighting]], [[Frequentist Causal Estimation]], [[Matching Algorithms and Caliper]], [[Conditional Independence Assumption]]

**Suggested sources / search terms:**
- Hainmueller (2012) — "Entropy balancing for causal effects: A multivariate reweighting method to produce balanced samples in observational studies" (*Political Analysis*)
- Li, Morgan & Zaslavsky (2018) — "Balancing covariates via propensity score weighting" (*JASA*)
- Zubizarreta (2015) — "Stable weights that balance covariates for estimation with incomplete outcome data" (*JASA*)
- Ben-Michael, Feller & Rothstein (2021) — "The augmented synthetic control method" (*JASA*) — stable balancing weights in SC context
- Search: "entropy balancing Hainmueller R", "overlap weights propensity score", "stable balancing weights", "ebal R package", "WeightIt R overlap weights"

---

### 45. Event Study Designs and Pre-Trend Testing
**Status:** 🌱 new

**Why it's a gap:**
[[Differences-in-Differences]] mentions "leads and lags to test for pre-trends" and "state-specific trends as robustness check" — but event study methodology as a self-contained research design is absent. The event study approach centers on estimating *dynamic treatment effects* $\tau_\ell$ for each period $\ell$ relative to the treatment event time, using relative-period indicator interactions: $Y_{it} = \alpha_i + \lambda_t + \sum_{\ell \neq -1} \tau_\ell D_{it}^\ell + \varepsilon_{it}$. The pre-treatment estimates $\tau_\ell$ for $\ell < 0$ serve as a visual parallel-trends test; post-treatment $\tau_\ell$ trace the dynamic causal effect profile. [[Identifying Assumptions for Staggered DiD]] mentions "event study estimates" without explaining how they are constructed. Under staggered adoption, the standard event study estimator suffers the same TWFE bias as the static DiD (Callaway & Sant'Anna 2021 provide cohort-specific event study estimates as a solution). Roth (2022) formalizes the pre-trend test as a power problem: standard pre-trend tests are under-powered for economically meaningful parallel-trends violations, motivating honest confidence intervals and sensitivity analysis approaches (Rambachan & Roth 2023, already referenced in gap #30). No note covers the full event study design: relative-time dummies, normalization convention ($\tau_{-1} = 0$), treatment of anticipation ($\tau_\ell = 0$ for $\ell < 0$ under no-anticipation), handling of "long lags" (binning remote periods), and the connection to distributed lag models in [[Carryover Effects and Distributed Lags]].

**Adjacent notes:** [[Differences-in-Differences]], [[Difference-in-Differences with Multiple Time Periods - Overview]], [[Group-Time Average Treatment Effects]], [[Aggregating Group-Time Effects]], [[Identifying Assumptions for Staggered DiD]], [[Carryover Effects and Distributed Lags]], gap #30 (Partial Identification / Rambachan-Roth sensitivity)

**Suggested sources / search terms:**
- Schmidheiny & Siegloch (2023) — "On event studies and distributed lags in two-way fixed effects models: Identification, equivalence, and generalization" (*Journal of Applied Econometrics*) — connects event studies to distributed lag models
- Roth (2022) — "Pre-test with caution: Event study estimates after testing for parallel trends" (*AER: Insights*)
- Callaway & Sant'Anna (2021) — dynamic treatment effect aggregation by event time (§3 of their DiD paper)
- Rambachan & Roth (2023) — "A more credible approach to parallel trends" (*Review of Economic Studies*) — honest CIs for pre-trend violations
- Search: "event study design econometrics", "dynamic treatment effects DiD", "relative time indicators", "Roth pre-trend test power", "stacked DiD event study"

---

### 46. Causal Forests and Generalized Random Forests (GRF)
**Status:** 🌱 new

**Why it's a gap:**
[[Metalearners for CATE]] (X-Learner, T-Learner, S-Learner from Künzel et al. 2019) use flexible base learners in a two-stage regression strategy for CATE estimation. But Wager & Athey (2018) Causal Forests — which embed causal inference directly into the tree-splitting criterion — are entirely absent. Causal forests split leaves to maximize *heterogeneity in treatment effects* (rather than heterogeneity in outcomes), using a doubly-robust score as the objective. The key innovation is *honesty*: each tree is fit on a subsample held out from the splitting step, creating a sample-splitting structure that yields valid asymptotic confidence intervals for individual-level CATEs — something metalearners based on cross-fitting alone do not guarantee without additional assumptions. Athey & Wager (2019) extend this to the Generalized Random Forest (GRF) framework, which estimates any moment condition locally via adaptive nearest-neighbour weighting, unifying CATE, instrumental forests, local linear forests, and quantile forests (connecting to gap #26: Quantile Treatment Effects). The `grf` R package is widely used in applied economics and medicine. This gap means the vault's CATE toolkit (metalearners + BART + DR-learner) is missing the most widely-cited method for CATEs with valid pointwise confidence intervals.

**Adjacent notes:** [[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]], [[S-Learner]], [[Nonparametric Causal Inference]], [[Frequentist Causal Estimation]], [[Potential Outcomes Framework]], gap #26 (Quantile Treatment Effects), gap #40 (Double/Debiased Machine Learning)

**Suggested sources / search terms:**
- Wager & Athey (2018) — "Estimation and inference of heterogeneous treatment effects using random forests" (*JASA*)
- Athey, Tibshirani & Wager (2019) — "Generalized random forests" (*Annals of Statistics*)
- Athey & Wager (2021) — "Policy learning with observational data" (*Econometrica*)
- Künzel, Sekhon, Bickel & Yu (2019) — "Metalearners for estimating heterogeneous treatment effects using machine learning" (*PNAS*)
- Search: "causal forest grf R", "Wager Athey causal forests", "honest causal inference forest", "generalized random forest GRF", "CATE confidence intervals honest"

---

### 47. Synthetic Difference-in-Differences (SDiD)
**Status:** 🌱 new

**Why it's a gap:**
The vault covers [[Synthetic Control]] (Abadie et al., minimizes pre-treatment MSPE with non-negative unit weights), [[Differences-in-Differences]] (parallel trends with unit and time fixed effects), and [[Generalized Synthetic Control Method]] (GSC, interactive fixed effects). But Arkhangelsky et al. (2021) Synthetic DiD — which bridges SC and DiD by combining *unit weights* (like SC) with *time weights* (targeting pre-trend balance) — is entirely absent. SDiD simultaneously re-weights control units (to match the treated unit's pre-period trajectory) and down-weights early pre-period observations (to focus on recent pre-trends), producing an estimator that is valid under parallel trends *or* synthetic control assumptions — a double robustness property analogous to doubly-robust causal estimators. SDiD outperforms both SC and TWFE DiD in simulations, and the `sdid` Stata/R packages make it accessible. The connection between SDiD weights and entropy balancing (gap #44) and between SDiD placebo tests and permutation inference (gap #7) are also absent. This gap sits at the intersection of the vault's three quasi-experimental estimator clusters (SC, DiD, GSC) and resolves an architectural limitation all three share separately.

**Adjacent notes:** [[Synthetic Control]], [[Differences-in-Differences]], [[Generalized Synthetic Control Method]], [[Synthetic Control Bias Theory]], [[Difference-in-Differences with Multiple Time Periods - Overview]], [[Bayesian Difference in Differences]], gap #44 (Entropy Balancing), gap #7 (Permutation/Randomization Inference)

**Suggested sources / search terms:**
- Arkhangelsky, Athey, Hirshberg, Imbens & Wager (2021) — "Synthetic difference-in-differences" (*American Economic Review*)
- Friedman, Hastie & Tibshirani (2008) — elastic net as analogue of the time-weighting step (methodological connection)
- Clarke, Pailañir, Athey & Imbens (2023) — "Synthetic difference in differences estimation" (sdid Stata command)
- Ben-Michael, Feller & Rothstein (2021) — "The augmented synthetic control method" (*JASA*) — augmented SC with outcome model, parallel to SDiD
- Search: "synthetic difference-in-differences Arkhangelsky", "SDiD unit weights time weights", "sdid R Stata package", "augmented synthetic control", "doubly robust synthetic control"

---

---

### 48. Kan Extensions
**Status:** 🌱 new

**Why it's a gap:**
[[Limits in Presheaf Categories]] introduces the **Density Theorem**: every presheaf $X$ is canonically isomorphic to the colimit of representables indexed by its category of elements — i.e., $X \cong \mathrm{colim}_{(A,x) \in \mathcal{E}(X)} H_A$. This is precisely the *left Kan extension* of the identity functor along the Yoneda embedding, though the note does not name it as such. [[Adjoint Functor Theorems]] uses the density theorem in its proof ("every object is a canonical colimit of representables, enabling the solution set condition") but Kan extensions are never defined. Mac Lane described Kan extensions as "the most important concept in category theory." The right Kan extension $\text{Ran}_K F$ and left Kan extension $\text{Lan}_K F$ appear in: the proof of the GAFT (solution set condition via free cocompletion), the density theorem (left Kan extension along Yoneda as the universal property of presheaf categories), the semantics of type theory (globular sets, polynomial functors), and the theory of monads (gap #27: $T = GF$ is a Kan extension along the unit). This is the natural next chapter after the vault's synthesis material (Chapters 4–6 of Leinster's BCT), and connects to gap #27 (Monads) and gap #34 (Curry-Howard / type theory semantics).

**Adjacent notes:** [[Limits in Presheaf Categories]], [[Adjoint Functor Theorems]], [[Adjoint Functors]], [[Yoneda Lemma]], [[Yoneda Embedding and Consequences]], [[Units and Counits]]

**Suggested sources / search terms:**
- Leinster (2014) — *Basic Category Theory*, Ch. 4: Representables (as preparation; Kan extensions appear in the exercises)
- Mac Lane (1971) — *Categories for the Working Mathematician*, Ch. X: Kan Extensions — the canonical reference
- Riehl (2017) — *Category Theory in Context*, Ch. 6: Kan Extensions — more accessible treatment
- Search: "left Kan extension colimit representables", "right Kan extension limit", "Lan Ran adjoint functors", "density theorem Kan extension Yoneda", "pointwise Kan extensions"

---

### 49. Targeted Maximum Likelihood Estimation (TMLE)
**Status:** 🌱 new

**Why it's a gap:**
The vault covers the two inputs to doubly-robust estimation thoroughly: [[Nonparametric Causal Inference]] (BART-based outcome regression and propensity models), [[Bayesian Propensity Score Weighting]] and [[Frequentist Causal Estimation]] (IPW/DR estimators). Gap #40 (DML) covers Neyman orthogonality as the frequentist framework for semiparametric efficiency. But **Targeted Maximum Likelihood Estimation** (van der Laan & Rubin 2006) — the canonical doubly-robust, semiparametrically efficient estimator in the nonparametric efficiency bound literature — is entirely absent. TMLE proceeds in three steps: (1) estimate the initial outcome regression $\hat{Q}$; (2) fit a "fluctuation" logistic model using the clever covariate $H = T/\hat{g} - (1-T)/(1-\hat{g})$ to update $\hat{Q}$ toward the efficient influence function; (3) plug the targeted $\hat{Q}^*$ into the substitution estimator. The result is doubly robust (consistent if either $\hat{Q}$ or $\hat{g}$ is consistent) and achieves the semiparametric efficiency bound when both are correctly specified. The `tlverse` R ecosystem (SuperLearner + tmle3) and `PyATE` / `causalml` implement it. TMLE bridges [[Nonparametric Causal Inference]] (BART as the first-stage learner), [[Frequentist Causal Estimation]] (the DR score TMLE targets), and gap #40 (DML as the competing frequentist approach). Unlike DML, TMLE is also available in a Bayesian variant (Bayesian TMLE, which targets the posterior efficient influence function) connecting it to [[Bayesian Inverse Probability Weighting]].

**Adjacent notes:** [[Nonparametric Causal Inference]], [[Frequentist Causal Estimation]], [[Bayesian Inverse Probability Weighting]], [[Bayesian Propensity Score Weighting]], [[Metalearners for CATE]], gap #40 (Double/Debiased Machine Learning), gap #23 (Marginal Structural Models)

**Suggested sources / search terms:**
- van der Laan & Rubin (2006) — "Targeted maximum likelihood learning" (*Int J Biostatistics*) — original TMLE paper
- van der Laan & Rose (2011) — *Targeted Learning: Causal Inference for Observational and Experimental Data*, Springer
- Schuler & Rose (2017) — "Targeted maximum likelihood estimation for causal inference in observational studies" (*American Journal of Epidemiology*) — accessible tutorial
- Luque-Fernandez et al. (2018) — "Targeted maximum likelihood estimation for a binary treatment" (*Statistics in Medicine*)
- Search: "targeted maximum likelihood TMLE", "efficient influence function doubly robust", "tlverse SuperLearner", "tmle3 R package", "Bayesian TMLE"

---

## Covered Gaps

| Gap | Covered By | Date Covered |
|-----|-----------|--------------|
| Synthetic Control Methods (#2) | [[Synthetic Control]] | 2026-04-10 |
| Causal DAGs (#4) | [[Directed Acyclic Graphs]] | 2026-04-10 |
| Heterogeneous Treatment Effects / CATE (#5) | [[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]], [[S-Learner]] | 2026-04-12 |
| Simulation-Based Calibration (#6) | [[Simulation-Based Calibration - Overview]], [[The SBC Algorithm]], [[Interpreting SBC Histograms]], [[SBC Case Studies]] + 2 more | 2026-06-22 |
| Bayesian Marketing Mix Modeling (#14) | [[Bayesian Media Mix Modeling - Overview]], [[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]], [[ROAS, mROAS, and Optimal Media Mix]] + 2 more | 2026-06-22 |
| Staggered DiD / Callaway-Sant'Anna (#19) | [[Difference-in-Differences with Multiple Time Periods - Overview]], [[Group-Time Average Treatment Effects]], [[Doubly-Robust Estimands for ATT(g,t)]] + 3 more | 2026-06-22 |
| Propensity Score Methods / PSM (#1) | [[Propensity Score Matching - Overview]], [[Matching Algorithms and Caliper]], [[Covariate Balance and Matching Diagnostics]] | 2026-06-28 |
| Causal Structure Learning from Data (#9) | [[Markov Equivalence and CPDAGs]], [[PC Algorithm]], [[GES Algorithm]] | 2026-08-26 |

---

## Log

| Date | Action |
|------|--------|
| 2026-04-09 | Initial Dream index created. Three gaps identified from review of 9 Research notes. |
| 2026-04-09 | Run 2: reviewed 9 notes (Decision Analysis, Observational vs Experimental, Missing Data Models, GLMs, LATE, Forking Paths, Spurious Association, Modeling as Software Development, Power Analysis). Added gaps 4 (Causal DAGs) and 5 (Heterogeneous Treatment Effects / CATE). All prior gaps remain 🌱 new. |
| 2026-04-10 | Run 3: reviewed 9 notes (Synthetic Control, Fitting and Validating Computation, Iterative Model Improvement, Power Analysis, Golem of Prague, Model Comparison, Garden of Forking Data, Multiple Comparisons Bayesian, Spatial BYM). Gaps #2 and #4 marked 🍂 covered (notes now exist). Gap #1 updated to 🌿 still relevant (Bayesian IPW note exists but frequentist propensity score matching not yet covered). Added gaps #6 (Simulation-Based Calibration) and #7 (Permutation/Randomization Inference). |
| 2026-04-12 | Run 4: reviewed 9 notes (ABM Validation Challenges, Heterogeneity in Agent Models, Golem of Prague, Canonical Causal DAGs, Dependence Measures for Copulas, SMM Python Implementation, Evaluating Fitted Models, Summary Causal DAGs, Transfer Function Model). Gap #5 marked 🍂 covered (Treatment Effect Estimation subfolder exists with Metalearners for CATE, X-Learner, T-Learner, S-Learner). Gap #1 updated: Frequentist Causal Estimation note now covers IPW/DR estimators, but PSM matching diagnostics still absent. Added gaps #8 (Factor/Vine Copulas), #9 (Causal Structure Learning from Data), #10 (Global Sensitivity Analysis). |
| 2026-04-13 | Run 5: reviewed 9 notes (Computational Troubleshooting, Single Marketing Time Series, Garden of Forking Data, Organizational Simulation, Counterfactual Inference, Bayesian Structural Time-Series Model, Partial Pooling as Multiple Comparisons Correction, CUBES Simulator Architecture, LLM Expert Elicitation for Bayesian Networks). No existing gaps covered this run. Fixed frontmatter in all 9 notes (added date_updated, folder, source, aliases as needed). Fixed broken wikilink [[Bayesian Non-parametric Causal Inference]] → [[Nonparametric Causal Inference]] in Counterfactual Inference. Added cross-links: BSTS ↔ Counterfactual Inference ↔ Single Marketing Time Series cluster; CUBES ↔ Imitation/Conditioning ↔ Network Topology ↔ Social Network Formation; LLM Elicitation ↔ Directed Acyclic Graphs ↔ Canonical Causal DAGs ↔ Code Prompts; Computational Troubleshooting ↔ HMC and Stan in Practice ↔ Monsters and Mixtures. Added gaps #11 (ABM Software Platforms), #12 (Empirical Bayes Methods), #13 (State-Space Models and Kalman Filter). |
| 2026-05-18 | Run 6: reviewed 10 notes (Brock-Mirman SMM Exercise, Within-Between Persons Distinction Overview, Single-Parameter Models, Type S and Type M Errors, Heterogeneity in Agent Models, Observational vs Experimental Methods in Advertising, Functional Forms in Marketing, Advertising and Promotion Effects, Dependence Measures for Copulas, Bayesian Workflow Overview). No existing gaps covered this run. No frontmatter issues found. Added cross-links across all 10 notes: Brock-Mirman ↔ Efficient Method of Moments; Within-Between Persons ↔ Differences-in-Differences ↔ Omitted Variables Bias; Single-Parameter Models ↔ Posterior Sampling ↔ Model Checking ↔ BDA3 Overview ↔ Golem of Prague; Type S/M Errors ↔ Activity Bias in Advertising ↔ Observational vs Experimental Methods (exaggeration ratio ≈220×); Heterogeneity in Agent Models ↔ Emergent Phenomena in ABM ↔ ABM Calibration Overview; Functional Forms ↔ Discrete Choice Models (logistic section); Advertising and Promotion Effects ↔ Observational vs Experimental Methods ↔ The Experimental Ideal; Dependence Measures ↔ Factor Analysis and PPCA; Bayesian Workflow ↔ ABM Calibration Overview. Added gaps #14 (Bayesian MMM), #15 (Panel Data Econometrics), #16 (Latent Class Models / Market Segmentation). |
| 2026-05-25 | Run 7: reviewed 9 notes (Copula Estimation, Time-Varying Treatments and G-computation, Introduction to Bayesian Computation, Missing Data Models, Functors and Limits, Universal Properties Introduction, Dependence Measures for Copulas, Instrumental Variables, Quantum Entanglement). No existing gaps newly covered this run. Fixed broken wikilink `[[LKJ distribution]]` → plain text in Copula Estimation; fixed misleading alias `[[Nonparametric Models Overview\|multivariate Bayesian models]]` → `[[Nonparametric Models Overview]]`; removed raw file from `depends_on` in Introduction to Bayesian Computation. Added cross-links: Introduction to Bayesian Computation ↔ Approximation Methods; Time-Varying Treatments ↔ Estimands in Longitudinal Research ↔ Cross-Lagged and Dynamic Panel Models ↔ Instrumental Variables and Principal Stratification; Instrumental Variables ↔ Differences-in-Differences ↔ Instrumental Variables and Principal Stratification; Quantum Entanglement ↔ Schrödinger Equation and Time Evolution ↔ Uncertainty Principle. Added gaps #17 (LKJ Distribution and Correlation Priors), #18 (Dynamic Treatment Regimes and Optimal Policy). |
| 2026-06-01 | Run 8: reviewed 9 notes (Behavioral Attitudes in CUBES, Products and Equalizers, SMM Copula Simulation and Application, Dependence Measures for Copulas, Bayesian Inverse Probability Weighting, Causal Model - Cause Precondition Effect, Bayesian Linear Regression, GA Fitness Evaluation and the RAM, Synthetic Control). No existing gaps newly covered this run. Fixed frontmatter: added `folder` to Products and Equalizers; corrected `doc_type: concept` → `doc_type: textbook` in Bayesian Linear Regression. Fixed Connections section in Causal Model - Cause Precondition Effect to wikilink DAG reference. Added cross-links: Behavioral Attitudes ↔ Word of Mouth Mechanisms ↔ Opinion Leaders ↔ Product Adoption Diffusion Models ↔ Network Topology Effects; Products and Equalizers ↔ Functors and Limits; SMM Copula Simulation ↔ Method of Simulated Moments ↔ Brock-Mirman SMM; Dependence Measures ↔ Quantile Regression; Bayesian IPW ↔ Frequentist Causal Estimation ↔ Bayesian Propensity Score Weighting ↔ Propensity Score in Bayesian CI; Causal Model - CPE ↔ Directed Acyclic Graphs ↔ LLM Expert Elicitation ↔ BN Construction Methods Comparison; Bayesian Linear Regression ↔ Linear Models in StatRethink ↔ Moderation Analysis ↔ Missing Data Models; GA Fitness RAM ↔ ABC for ABMs ↔ UQ for ABM Calibration ↔ ABM Calibration Case Studies; Synthetic Control ↔ Requirements/Bias/Extensions/Inference sub-notes ↔ GSC ↔ Abadie 2021. Added gaps #19 (Staggered/Heterogeneous DiD), #20 (Horseshoe and Regularized Horseshoe Priors). |
| 2026-06-08 | Run 9: reviewed 10 notes (Opinion Leaders and Social Influence, LLM-BN Decision Support Application, Discrete Choice Models, Practical Issues in Simulation Estimation, Instrumental Variables, Bayesian Linear Regression, Copula Estimation, ABM in Marketing Strategy, Brodersen 2015 - Overview, ABM Validation Challenges). No existing gaps newly covered this run. No frontmatter errors found. Cross-links added: Opinion Leaders ↔ Carryover Effects and Distributed Lags ↔ Advertising and Promotion Effects (WOM→MRM bridge); LLM-BN ↔ Directed Acyclic Graphs ↔ Model Checking; Discrete Choice Models ↔ Market Share Models (logit bridge Econometrics↔MRM); Instrumental Variables ↔ Bayesian Propensity Score Weighting ↔ Parameter Estimation in Market Response (2SLS for price endogeneity); Bayesian Linear Regression — added wikilink for Horseshoe prior + See Also entry [[Horseshoe and Regularized Horseshoe Priors]]; Copula Estimation ↔ Discrete Choice Models (LKJ) ↔ Market Share Models; ABM in Marketing Strategy ↔ Market Response Models - Overview ↔ Advertising and Promotion Effects ↔ Marketing Generalizations Overview; Brodersen 2015 ↔ Synthetic Control ↔ Advertising and Promotion Effects; ABM Validation Challenges ↔ Model Checking ↔ Garden of Forking Paths. Added gaps #21 (Bayesian Networks Fundamentals), #22 (Bass Diffusion Model). Gaps #6 (SBC), #19 (Staggered DiD), #20 (Horseshoe priors) reinforced by this run's notes. |
| 2026-06-29 | Run 12: reviewed 9 notes (Hilbert Space Gaussian Processes, LLM Expert Elicitation for Bayesian Networks, Moderation Analysis, Natural Transformations, Factor Copula Application S&P 100, Generalized Synthetic Control Method, Local Average Treatment Effects, Design of Dynamic Response Models, Schrödinger Equation and Time Evolution). No existing gaps covered this run. Frontmatter fixes: added `date_updated: 2026-06-29` to all 9 notes; added `folder` to LLM Expert Elicitation, Moderation Analysis, Natural Transformations, Design of Dynamic Response Models; added `source` wikilink to Moderation Analysis. Fixed broken wikilink `[[Bayesian Non-parametric Causal Inference]]` → `[[Nonparametric Causal Inference]]` in Moderation Analysis. Cross-links added: LLM Expert Elicitation ↔ NOTEARS Overview + DAG Structure Learning Problem (expert elicitation vs. algorithmic discovery bridge); LATE — added [[Potential Outcomes Framework]] and [[Metalearners for CATE]] to See Also; Schrödinger Equation — added [[Quantum Entanglement]] to See Also; Moderation Analysis — added See Also section (Spurious Association, Bayesian Linear Regression, GLMs, Nonparametric Causal Inference, Hierarchical Models); Natural Transformations — added [[Limits and Colimits/General Limits]] to See Also (cones as natural transformations); Design of Dynamic Response Models — added See Also section with cross-vault links (Bayesian Structural Time-Series, HSGP, Instrumental Variables, Method of Simulated Moments). Added gaps #28 (Mediation Analysis / Natural Direct/Indirect Effects) and #29 (GARCH and Conditional Heteroscedasticity). Gaps #21 (BN Foundations), #27 (Monads), #8 (Factor/Vine Copulas) reinforced by this run's notes. |
| 2026-06-22 | Run 11: reviewed 9 notes (Practical Issues in Simulation Estimation, QFT Overview, Units and Counits, Multi-Factor and Block Dependence Structures, Price and Distribution Effects, Method of Simulated Moments, Markets Data and Sales Drivers, Spurious Association and Confounds, Regression and the CEF). Gaps #6 (SBC), #14 (Bayesian MMM), #19 (Staggered DiD) marked 🍂 covered — all now have dedicated note clusters. Gaps #8 (Factor Copulas) and #9 (Causal Structure Learning) updated to 🌿 still relevant: factor copulas now well-covered, vine copulas absent; NOTEARS covered, PC/GES absent. Frontmatter fixes: added `date_updated: 2026-06-22` to all 9 notes; added `folder` to Units and Counits, Price and Distribution Effects, Markets Data and Sales Drivers; added `date_ingested` to Price and Distribution Effects and Markets Data. Cross-links added: Practical Issues ↔ Brock-Mirman SMM ↔ SMM Estimation of Factor Copulas; QFT Overview ↔ Wave Function and Hilbert Space ↔ Uncertainty Principle ↔ Quantum Entanglement (within Physics folder) + cross-links to Theoretical Physics parallel notes (Standard Model and Gauge Groups, QFT Overview flat); Units and Counits ↔ Cartesian Closed Categories; Multi-Factor ↔ Dependence Measures for Copulas ↔ Factor Analysis and PPCA ↔ Copula Estimation; Price and Distribution ↔ Discrete Choice Models ↔ Parameter Estimation in Market Response; Method of MSM ↔ Brock-Mirman SMM ↔ SMM Estimation of Factor Copulas; Markets Data ↔ Bayesian Media Mix Modeling Overview; Spurious Association ↔ Regression and the CEF (bidirectional). Added gaps #25 (ABM Calibration via SMM/II), #26 (Quantile Treatment Effects), #27 (Monads and Monadicity). |
| 2026-06-15 | Run 10: reviewed 10 notes (s-Separation in Summary DAGs, Uncertainty Principle, BN Construction Methods Comparison, Local Linear Trend and Seasonality, Hilbert Space Gaussian Processes, Spurious Association and Confounds, Modeling as Software Development, Market Share Models, Functors and Limits, Time-Varying Treatments and G-computation). No existing gaps newly covered this run. Frontmatter fixes: added `date_updated: 2026-06-15` to all 10 notes; added `folder` to HSGP, Market Share Models, Functors and Limits; added `source:` field (wikilink) to HSGP; fixed `source_location` in Spurious Association and Confounds (Ch.9 → Ch.5); added missing H1 title header to Modeling as Software Development. Cross-links added: s-Separation ↔ Directed Acyclic Graphs; BN Construction Methods ↔ Directed Acyclic Graphs ↔ LLM Expert Elicitation (completing the BN trilogy); Local Linear Trend ↔ Single Marketing Time Series (state-space↔ARIMA bridge); HSGP — added full See Also section linking to Local Linear Trend and Seasonality ↔ Bayesian Structural Time-Series Model; Spurious Association ↔ Directed Acyclic Graphs (fork/pipe/collider → DAG formalization); Modeling as Software Development ↔ Garden of Forking Paths (version control as forking path defense); Market Share Models ↔ Discrete Choice Models (MNL/logit bridge MRM↔Econometrics) ↔ Monsters and Mixtures (heterogeneous MCI→latent segments); Functors and Limits ↔ Products and Equalizers; Time-Varying Treatments ↔ Bayesian Propensity Score Weighting (IPW-MSM connection). Added gaps #23 (Marginal Structural Models / Bayesian Bootstrap), #24 (Random Coefficients Logit / BLP Demand Estimation). Gaps #13 (State-Space/Kalman), #18 (DTRs), #21 (BN Foundations) reinforced by this run's notes. |
| 2026-06-28 | Gap #1 (Propensity Score Matching) marked 🍂 covered. Searched arXiv, NBER, PMC, and academic homepages for Rosenbaum & Rubin (1983), Imbens (2004), Stuart (2010) — all freely available but blocked by session network policy. Created synthesis survey `raw/PSM-Rosenbaum-Rubin-Stuart-Survey.md` from training knowledge of the papers. Created 3 notes in `Econometrics/Identification Strategies/`: [[Propensity Score Matching - Overview]] (balancing theorem, strong ignorability, ATT vs ATE, PSM vs IPW, matching workflow, why matching fails for activity bias), [[Matching Algorithms and Caliper]] (NN greedy, caliper $\delta=0.2\sigma_{\text{logit}}$, optimal/full matching, subclassification, Mahalanobis, MatchIt R code), [[Covariate Balance and Matching Diagnostics]] (SMD, love plot, overlap plot, variance ratio, KS, Rubin 2001 criteria, cobalt R code). Updated Identification Strategies _Index.md (16→19 notes) and Econometrics _Index.md (48→51 notes). |
| 2026-08-26 | Gap #9 (Causal Structure Learning from Data) marked 🍂 covered. Searched for Chickering (2002) JMLR and Kalisch & Bühlmann (2007) arXiv — both freely available but blocked by session network policy (arxiv.org and jmlr.org return 403 policy denials via egress proxy). Created reference stubs in `Causal Discovery/raw/`. Created 3 notes in `Causal Discovery/`: [[Markov Equivalence and CPDAGs]] (Verma & Pearl 1990 equivalence theorem, CPDAG definition, v-structures, Meek's four orientation rules R1–R4, identifiability limit from observational data), [[PC Algorithm]] (three-phase constraint-based algorithm: skeleton discovery via CI tests, v-structure orientation, Meek rule propagation; PC-stable variant; high-dimensional consistency theorem Kalisch & Bühlmann 2007; comparison with GES), [[GES Algorithm]] (score-based Greedy Equivalence Search: BIC decomposability, Forward Equivalence Search, Backward Equivalence Search, Insert/Delete CPDAG operators, global optimality theorem Chickering 2002 Thm. 18, Meek Conjecture proof, FGES extension). Updated `Causal Discovery/_Index.md` (5→8 notes) with three-paradigm comparison table (PC vs GES vs NOTEARS). |
| 2026-08-24 | Run 20: reviewed 10 notes (ABM Methodology and Principles, Xu 2016 - Overview, s-Separation in Summary DAGs, Tail Dependence in Factor Copulas, Research Questions in Econometrics, Multiple Testing Corrections, HMC and Stan in Practice, Bayesian Propensity Score Weighting, Limits in Presheaf Categories, Indirect Inference). No existing gaps newly covered this run. Frontmatter fixes: added `date_updated: 2026-08-24` to all 10 notes; added `folder: "Category Theory/Synthesis"` to Limits in Presheaf Categories; fixed `depends_on` in Limits in Presheaf Categories (path-prefixed wikilinks → bare note names); fixed `used_by` in Limits in Presheaf Categories (same); removed `[[raw/StatRethink-Bayes.pdf]]` from `depends_on` in HMC and Stan in Practice (raw PDFs should not be in depends_on); removed dead `[[Q - Handling Multiple Comparisons...]]` and `[[Q - Common Pitfalls...]]` wikilinks from `used_by` in Multiple Testing Corrections. Cross-links added: HMC and Stan in Practice → [[SBC Case Studies]] + [[Simulation-Based Calibration - Overview]] (NUTS passes where ADVI fails); Tail Dependence in Factor Copulas → [[Dependence Measures for Copulas]] + [[SMM Estimation of Factor Copulas]] (SMM uses quantile-dep. as targets) + fixed broken `[[../_Index\|Econometrics]]` → `[[Econometrics/_Index\|Econometrics]]`; Bayesian Propensity Score Weighting → [[Propensity Score Matching - Overview]] + [[Covariate Balance and Matching Diagnostics]] + [[General Structure of Bayesian CI]]; Limits in Presheaf Categories — updated See Also (bare note links + added [[Yoneda Lemma]] + [[Adjoint Functor Theorems]]); ABM Methodology and Principles → [[ABM Calibration Overview]] + [[ABM in Marketing Strategy]]; Indirect Inference → [[ABM Calibration Overview]] + [[HM-ABC Calibration Framework]] (gap #25 bridge); Research Questions in Econometrics → [[Propensity Score Matching - Overview]] + [[Difference-in-Differences with Multiple Time Periods - Overview]]; Xu 2016 → [[Difference-in-Differences with Multiple Time Periods - Overview]] (staggered DiD as IFE-level companion); s-Separation in Summary DAGs → [[NOTEARS - Overview]] (structure learning outputs → summarization pipeline). Added gaps #48 (Kan Extensions) and #49 (TMLE). |
| 2026-08-17 | Run 19: reviewed 10 notes (Differences-in-Differences, Advertising and Promotion Effects, Propensity Score Matching - Overview, Mostly Harmless Econometrics - Overview, Synthetic Control Bias Theory, Frequentist Causal Estimation, Quantum Mechanics - Overview, Omitted Variables Bias, Model Selection and Exploratory Analysis, Behavioral Primitives and Thresholds). No existing gaps newly covered this run. Frontmatter fixes: added `folder: "Econometrics/Identification Strategies"` to Mostly Harmless Econometrics - Overview; changed `date_created` → `date_ingested` in Advertising and Promotion Effects and Model Selection and Exploratory Analysis; added `folder: "Market Response Models/Empirical Findings and Applications"` to Advertising and Promotion Effects. Fixed broken wikilink `[[Conditional Expectation Function\|CEF]]` → `[[Regression and the CEF\|CEF]]` in Mostly Harmless Econometrics - Overview. Cross-links added: Differences-in-Differences → [[Difference-in-Differences with Multiple Time Periods - Overview]] (new See Also entry for staggered DiD); Propensity Score Matching → [[Sensitivity Analysis in Observational Studies]] (Rosenbaum bounds as post-match robustness check); Frequentist Causal Estimation → [[Propensity Score Matching - Overview]] (matching as the paired-unit alternative to weighting); Behavioral Primitives → [[Population Initialization and Parameter Sensitivity]] + [[Uncertainty Quantification for ABM Calibration]] (BP thresholds as calibration targets); Omitted Variables Bias → [[Directed Acyclic Graphs]] + [[DAGs and Causal Identification]] + [[Table 2 Fallacy]] + [[Spurious Association and Confounds]] (DAG identification connects OVB to the formal causal framework); Quantum Mechanics - Overview → structured Physics subfolder counterparts ([[Physics/Foundations/Wave Function and Hilbert Space]], [[Physics/Foundations/Schrödinger Equation and Time Evolution]], [[Physics/Foundations/Uncertainty Principle]], [[Physics/Foundations/Quantum Entanglement]]); Mostly Harmless Econometrics - Overview → [[Regression Discontinuity Designs]] + [[Synthetic Control]] (completing the MHE identification strategy set); Advertising and Promotion Effects → [[Bayesian Media Mix Modeling - Overview]] + [[Shape (Saturation) Effects]] + [[ROAS, mROAS, and Optimal Media Mix]] (bridging empirical generalizations → Bayesian MMM workflow). Added gaps #45 (Event Study Designs and Pre-Trend Testing), #46 (Causal Forests and Generalized Random Forests / GRF), #47 (Synthetic Difference-in-Differences / SDiD). Gaps #7 (Permutation Inference), #40 (DML), #44 (Entropy Balancing) reinforced by this run's notes. |
| 2026-08-10 | Run 18: reviewed 9 notes (Network Topology Effects on Diffusion, Instrumental Variables and Principal Stratification, Colimits, Quantum Field Theory - Overview, Yamashita 2020 - Overview, Covariate Balance and Matching Diagnostics, Factor Copula Application S&P 100, Hilbert Space Gaussian Processes, Word of Mouth Mechanisms). No existing gaps newly covered this run. Frontmatter fixes: added `date_updated: 2026-08-10` to 7 notes missing it (IV and Principal Stratification, Colimits, QFT Overview, Yamashita 2020, Covariate Balance, Factor Copula Application, Word of Mouth Mechanisms); added `folder: "Category Theory/Limits and Colimits"` to Colimits. Fixed broken relative-path wikilink `[[../_Index\|Econometrics]]` → `[[Econometrics/_Index\|Econometrics]]` in Factor Copula Application. Cross-links added: IV and Principal Stratification — inlined wikilink on "2SLS estimator" → `[[Frequentist Causal Estimation]]`, added `[[Frequentist Causal Estimation]]` and `[[Metalearners for CATE]]` to See Also; Covariate Balance — added `[[Sensitivity Analysis in Observational Studies]]` to See Also (complement: matching diagnostics check design, sensitivity analysis checks robustness post-match); Word of Mouth Mechanisms — added `[[Network Topology Effects on Diffusion]]` to See Also (WOM drives the two-wave adoption patterns; closing the bidirectional link). Added gaps #42 (Weak Instruments and First-Stage Diagnostics), #43 (Spectral Analysis and Frequency-Domain Methods for Time Series), #44 (Entropy Balancing and Overlap Weighting). |
| 2026-08-03 | Run 17: reviewed 10 notes (Parameter Estimation in Market Response, Synthetic Control Extensions, Behavioral Primitives and Thresholds, History Matching for ABMs, Within-Between Persons Causal Inference, Frequentist Causal Estimation, Directed Acyclic Graphs, Network Topology Effects on Diffusion, Synthetic Control Bias Theory, Data Collection Models). No existing gaps newly covered this run. Frontmatter fixes: added `date_updated: 2026-08-03` to all 10 notes; fixed source path in History Matching for ABMs (`Research/Agent-Based Modeling/raw/…` → `Agent-Based Modeling/raw/…`); removed nonexistent `[[Q - Uncovering Causal Estimates from Non-Experimental Data]]` from `used_by` in Frequentist Causal Estimation; fixed broken wikilink `[[Experimental Design for ABMs]]` → `[[Population Initialization and Parameter Sensitivity]]` in History Matching for ABMs; fixed broken See Also link `[[Bayesian Propensity Scores and IPW]]` → `[[Bayesian Inverse Probability Weighting]]` + `[[Bayesian Propensity Score Weighting]]` in Frequentist Causal Estimation. Cross-links added: Parameter Estimation in Market Response → [[Bayesian Estimation and Priors for MMM]] (HB shrinkage ↔ MMM hierarchical priors); Frequentist Causal Estimation → [[Metalearners for CATE]] (DR estimator ↔ DR-learner); Within-Between Persons Causal Inference → [[Standard Errors and Clustering]] + [[Cross-Lagged and Dynamic Panel Models]] (new See Also entries); Network Topology Effects on Diffusion → [[Opinion Leaders and Social Influence]] + [[Word of Mouth Mechanisms]] (new See Also entries); Data Collection Models → [[Frequentist Causal Estimation]] + [[Propensity Score Matching - Overview]] (new See Also entries). Added gaps #39 (Design of Computer Experiments / LHS), #40 (Double/Debiased Machine Learning / DML), #41 (Granovetter Threshold Models / Social Tipping Points). Gaps #10 (Global Sensitivity Analysis), #22 (Bass Diffusion Model), #35 (Regularization-Induced Confounding) reinforced by this run's notes. |
| 2026-07-27 | Run 16: reviewed 9 notes (Model Selection and Exploratory Analysis, Overfitting and Information Criteria, Factor Analysis and PPCA, Asymptotics and Frequentist Connections, Estimands in Longitudinal Research, Modeling as Software Development, Nonparametric Models Overview, Carryover (Adstock) Functional Forms, SMM Copula Asymptotic Theory). No existing gaps newly covered this run. Frontmatter fixes: added `folder` to Model Selection and Exploratory Analysis and Factor Analysis and PPCA; added `date_updated: 2026-07-27` to all 9 notes; added `aliases` to Factor Analysis and PPCA; fixed broken source path `[[Research/Research Methodology/raw/rohrer-murayama-2023.pdf]]` → `[[Research Methodology/raw/rohrer-murayama-2023.pdf]]` in Estimands in Longitudinal Research; removed `[[raw/BayesWorkflow.pdf]]` from `depends_on` in Modeling as Software Development (raw PDFs should not be in depends_on). Cross-links added: Model Selection and Exploratory Analysis → [[Bayesian Workflow - Overview]] + [[Forking Paths and Bayesian Approaches]] + [[MMM Model Selection and Application]] + [[Researcher Degrees of Freedom]] (new See Also section); Overfitting and Information Criteria → [[Model Selection and Exploratory Analysis]]; Factor Analysis and PPCA → [[Confirmatory Factor Analysis and SEM]] + [[Monsters and Mixtures]] + [[Hierarchical Linear Models]] + [[Dependence Measures for Copulas]]; Estimands in Longitudinal Research → [[Table 2 Fallacy]] + [[Survival Analysis]]; Modeling as Software Development → [[Simulation-Based Calibration - Overview]]; Nonparametric Models Overview → [[Factor Analysis and PPCA]] + [[Hilbert Space Gaussian Processes]] + [[Spatial Models - BYM]] + [[Monsters and Mixtures]] + [[Nonparametric Causal Inference]]; Carryover (Adstock) Functional Forms → [[Design of Dynamic Response Models]]; SMM Copula Asymptotic Theory → [[Factor Copulas - Overview]] + [[Indirect Inference]]. Added gaps #37 (Bayesian Model Averaging and Stacking) and #38 (Sparse GP Approximations / Inducing Points). Gaps #29 (GARCH), #33 (Variational Inference), #16 (Latent Class Models) reinforced by this run's notes. |
| 2026-07-20 | Run 15: reviewed 10 notes (Survival Analysis, Nonparametric Causal Inference, Consumer Utility Function Components, Identifying Assumptions for Staggered DiD, Moderation Analysis, Interpreting SBC Histograms, SBC Case Studies, Li et al 2022 - Overview, Bayesian Inverse Probability Weighting, Instrumental Variables). No existing gaps newly covered this run. Frontmatter fixes: added `folder` and `source` fields to Nonparametric Causal Inference. Fixed broken wikilinks: `[[Difference in differences\|DiD]]` → `[[Differences-in-Differences\|DiD]]` in Nonparametric Causal Inference (table row); `[[Bayesian Propensity Scores and IPW]]` → `[[Bayesian Inverse Probability Weighting]]` + `[[Bayesian Propensity Score Weighting]]` in Li et al 2022 - Overview; same link fixed in Dream/_Index.md gap #1 text. Fixed structure of Moderation Analysis: removed duplicate Connections/See Also sections (links appeared in both; consolidated into single See Also). Cross-links added: Nonparametric Causal Inference → [[Bayesian Inverse Probability Weighting]] + [[Propensity Score Matching - Overview]] + [[General Structure of Bayesian CI]]; Moderation Analysis → [[Metalearners for CATE]] (See Also); SBC Case Studies → [[Approximation Methods]] + [[Spatial Models - BYM]] + [[Bayesian Workflow - Overview]] (See Also); Bayesian Inverse Probability Weighting — updated `used_by` to include Li et al 2022 + General Structure of Bayesian CI; added both to See Also; Interpreting SBC Histograms → [[Bayesian Workflow - Overview]] (See Also); Survival Analysis → [[Time-Varying Treatments and G-computation]] + [[Estimands in Longitudinal Research]] + [[Hierarchical Models]] (frailty) (See Also); Identifying Assumptions for Staggered DiD → [[Bayesian Difference in Differences]] + [[Conditional Independence Assumption]] + [[Regression Discontinuity Designs]] (See Also); Consumer Utility Function Components → [[Carryover Effects and Distributed Lags]] + [[Shape of the Marketing Response Function]] + [[ABM in Marketing Strategy]] (See Also). Added gaps #35 (Regularization-Induced Confounding in High-Dimensional Bayesian CI) and #36 (Causal Survival Analysis and Estimand Controversy around the Hazard Ratio). |
| 2026-07-13 | Run 14: reviewed 9 notes (SBC Case Studies, Cartesian Closed Categories, Abadie 2021 Overview, Standard Errors and Clustering, Rank Statistics and Uniformity, Regression Discontinuity Designs, SMM Estimation of Factor Copulas, Functor Categories, Yoneda Embedding and Consequences). No existing gaps newly covered this run. Frontmatter fixes: added `date_updated: 2026-07-13` to all 9 notes; added `folder` to Cartesian Closed Categories, Functor Categories, Yoneda Embedding and Consequences (all Category Theory notes were missing this field). Cross-links added: SBC Case Studies → [[HMC and Stan in Practice]] + [[Computational Troubleshooting]] (centered/non-centered funnel geometry); Rank Statistics and Uniformity → [[SBC Case Studies]] (empirical demonstration of the uniformity theorem); Cartesian Closed Categories → [[Adjunctions/Units and Counits]] (evaluation map as counit) + [[Synthesis/Adjoints and Limits]]; Functor Categories → [[Adjunctions/Adjoint Functors]] (adjunctions between functor categories); Yoneda Embedding → [[Synthesis/Cartesian Closed Categories]] + [[Adjunctions/Adjoint Functors]] + [[Synthesis/Adjoint Functor Theorems]] (representability and GAFT); Abadie 2021 → [[Generalized Synthetic Control Method]] + [[Difference-in-Differences with Multiple Time Periods - Overview]]; Standard Errors and Clustering → [[Simultaneous Inference via Multiplier Bootstrap]] + [[Identifying Assumptions for Staggered DiD]]; Regression Discontinuity Designs → [[Standard Errors and Clustering]] (cluster at assignment unit) + [[Sensitivity Analysis in Observational Studies]]; SMM Estimation of Factor Copulas → [[Tail Dependence in Factor Copulas]] (why quantile dependence at 0.05/0.10/0.90/0.95 is chosen). Added gaps #32 (RD Bandwidth Selection / Local Polynomial Estimation), #33 (Variational Inference / ADVI / ELBO), #34 (Curry-Howard Correspondence and Type Theory). Gaps #27 (Monads), #29 (GARCH), #31 (EVT) reinforced by this run's notes. |
| 2026-07-06 | Run 13: reviewed 10 notes (Factor Copula Construction, Adjoint Functor Theorems, Asymptotics and Frequentist Connections, Synthetic Control Bias Theory, HM-ABC Calibration Framework, Instrumental Variables, Factor Copulas - Overview, Time-Varying Treatments and G-computation, Sensitivity Analysis in Observational Studies, Code Prompt Aspects Analysis). No existing gaps newly covered this run. Frontmatter fixes: added `date_updated: 2026-07-06` to 9 notes; added `folder: "Category Theory/Synthesis"` to Adjoint Functor Theorems; fixed source path in HM-ABC Calibration Framework (`Research/Agent-Based Modeling/raw/…` → `Agent-Based Modeling/raw/…`); removed `[[raw/BDA3.pdf]]` from `depends_on` in Asymptotics and Frequentist Connections (raw PDFs should not appear as depends_on). Cross-links added: Adjoint Functor Theorems → [[Units and Counits]] (adjunction-monad correspondence; the unit $\eta_A$ from GAFT is the monad unit); Asymptotics and Frequentist Connections → [[Partial Pooling as Multiple Comparisons Correction]] (James-Stein result links Bayesian shrinkage to frequentist asymptotics); HM-ABC Calibration Framework → [[Method of Simulated Moments]] (moment-based ABM calibration bridge; gap #25 connection); Instrumental Variables → [[Synthetic Control]] (primary alternative for panel settings without valid instruments); Factor Copulas - Overview → [[Dependence Measures for Copulas]] (rank statistics used as SMM targets); Sensitivity Analysis in Observational Studies → [[Propensity Score Matching - Overview]] + [[Nonparametric Causal Inference]] (sensitivity analysis reported alongside PSM/BART estimates); Synthetic Control Bias Theory → [[Generalized Synthetic Control Method]] (GSC estimates the latent factors explicitly where SC matches on them implicitly); Code Prompt Aspects Analysis → [[LLM Causal Reasoning Tasks]] (taxonomy of tasks that the intervention study evaluates). Added gaps #30 (Partial Identification / Manski Bounds) and #31 (Extreme Value Theory / Tail Risk). Gaps #7 (Permutation Inference), #8 (Factor/Vine Copulas), #12 (Empirical Bayes), #25 (ABM+SMM), #27 (Monads) reinforced by this run's notes. |
