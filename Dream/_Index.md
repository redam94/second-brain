---
title: "Dream: Research Gaps"
tags:
  - type/index
  - type/dream
date_updated: 2026-06-08
---

# Dream: Research Gaps

> [!abstract] Purpose
> This index tracks knowledge gaps — topics referenced or implied by existing Research notes that lack dedicated coverage. Updated each weekly cleanup run.

---

## Suggested Topics

### 1. Propensity Score Methods and Inverse Probability Weighting
**Status:** 🌿 still relevant

**Why it's a gap:**
[[Activity Bias in Advertising]] explicitly states that "propensity score matching and regression with controls cannot fix" activity bias, but there is no note explaining what propensity score methods are, when they succeed, and why they fail here. The [[Conditional Independence Assumption]] note covers the theoretical requirement for selection-on-observables identification, and [[The Selection Problem]] motivates the challenge — but the frequentist methodological toolkit (propensity score matching, IPW, doubly robust estimators, AIPW) is missing. The Bayesian side is covered by [[Bayesian Propensity Scores and IPW]]. The frequentist IPW and DR estimators are now in [[Frequentist Causal Estimation]] (added 2026-04-10) — but the classical Rosenbaum & Rubin matching framework and diagnostics (covariate balance, overlap plots, caliper matching) remain absent.

**Adjacent notes:** [[Bayesian Propensity Scores and IPW]], [[Frequentist Causal Estimation]], [[Conditional Independence Assumption]], [[The Selection Problem]], [[Omitted Variables Bias]], [[Activity Bias in Advertising]]

**Suggested sources / search terms:**
- Rosenbaum & Rubin (1983) — "The central role of the propensity score"
- Imbens (2004) — "Nonparametric estimation of average treatment effects under exogeneity: A review"
- Search: "propensity score matching", "inverse probability weighting", "doubly robust estimation", "AIPW", "covariate balance"

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
**Status:** 🌱 new

**Why it's a gap:**
[[Fitting and Validating Computation]] explicitly covers SBC (Cook et al., 2006; Talts et al., 2020) as a key computational validation tool: draw $\theta$ from the prior, simulate data, fit the model, and check that the rank statistic of the true $\theta$ within posterior samples is uniform. This is described as "more comprehensive than single-point fake-data checks" and detects both computational errors and model specification issues. However, there is no dedicated note that covers the procedure, its software implementations (SBC R package, `arviz`), and the failure modes it can detect (miscalibration, label-switching, non-identifiability). The procedure sits at the junction of Bayesian workflow, MCMC diagnostics, and prior predictive checking.

**Adjacent notes:** [[Fitting and Validating Computation]], [[Computational Troubleshooting]], [[MCMC Basics]], [[Choosing and Building Models]], [[Bayesian Workflow - Overview]]

**Suggested sources / search terms:**
- Talts et al. (2020) — "Validating Bayesian Inference Algorithms with Simulation-Based Calibration" (*arXiv*)
- Cook, Gelman & Rubin (2006) — "Validation of Software for Bayesian Models Using Posterior Quantiles"
- Säilynoja, Bürkner & Vehtari (2022) — "Graphical test for discrete uniformity and its applications" (ECDF-based SBC)
- Search: "simulation-based calibration", "SBC R package", "rank statistic", "Bayesian validation"

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
**Status:** 🌱 new

**Why it's a gap:**
[[Dependence Measures for Copulas]] includes a tail dependence table listing "Factor copula (Oh & Patton)" alongside Normal, Clayton, Gumbel, and Student-t copulas — but no note explains what a factor copula *is* architecturally, or how it solves the curse of dimensionality for high-dimensional dependence modeling. [[Copula Estimation]] covers Bayesian Gaussian copula estimation (bivariate). [[SMM Estimator for Copulas]] covers estimation of the factor copula model without explaining the model structure itself. Vine (pair) copulas — a flexible alternative for high-dimensional settings — are entirely absent. This gap leaves practitioners unable to choose between copula architectures for their specific application.

**Adjacent notes:** [[Dependence Measures for Copulas]], [[Copula Estimation]], [[SMM Estimator for Copulas]], [[SMM Copula Simulation and Application]], [[Factor Analysis and PPCA]]

**Suggested sources / search terms:**
- Oh & Patton (2017) — "Modelling dependence in high dimensions with factor copulas" (*JBES*)
- Aas et al. (2009) — "Pair-copula constructions of multiple dependence" (*Insurance: Mathematics and Economics*)
- Czado (2019) — *Analyzing Dependent Data with Vine Copulas*, Springer
- Search: "factor copula model", "vine copula", "pair copula construction", "high-dimensional dependence", "C-vine D-vine"

---

### 9. Causal Structure Learning from Data
**Status:** 🌱 new

**Why it's a gap:**
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
**Status:** 🌱 new

**Why it's a gap:**
[[Advertising and Promotion Effects]] gives the canonical empirical generalizations (short-run ad elasticity ≈ 0.10, duration interval 6–9 months), and [[Functional Forms in Marketing]] covers the ADBUDG saturation curve and multiplicative forms used in media response. [[Activity Bias in Advertising]] explains *why* passive observational data fails to measure advertising effects, and [[Observational vs Experimental Methods in Advertising]] documents the scale of the problem. But no note covers the end-to-end Bayesian MMM workflow as practiced in industry: hierarchical media response priors (geometric adstock, Hill saturation curves), the Robyn/Meridian/pymc-marketing frameworks, budget optimization under posterior uncertainty, or the model comparison step for selecting carryover vs saturation specifications. This gap sits precisely at the intersection of the vault's Market Response Models and Bayesian Statistics sections, and is the applied synthesis that practitioners reaching for these notes actually need.

**Adjacent notes:** [[Advertising and Promotion Effects]], [[Functional Forms in Marketing]], [[Carryover Effects and Distributed Lags]], [[Shape of the Marketing Response Function]], [[Optimal Marketing Decisions and Forecasting]], [[Activity Bias in Advertising]], [[Bayesian Workflow - Overview]], [[Hierarchical Models]]

**Suggested sources / search terms:**
- Jin et al. (2017) — "Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects" (Google Research)
- Lightweight MMM (Google), Meridian (Google, 2024), Robyn (Meta), pymc-marketing
- Search: "Bayesian marketing mix model", "media mix modeling adstock", "Hill saturation curve MMM", "Robyn MMM", "Meridian Google MMM"

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
**Status:** 🌱 new

**Why it's a gap:**
[[Synthetic Control]] explicitly compares DiD and synthetic control for different data structures, and [[Differences-in-Differences]] covers the basic 2×2 DiD design. But neither note addresses the major 2018–2022 econometric literature showing that the canonical two-way fixed effects (TWFE) DiD estimator is **biased under staggered treatment timing** when treatment effects are heterogeneous. In a staggered adoption setting (different units treated at different calendar times), OLS TWFE uses already-treated units as implicit controls for later-treated units — contaminating the estimate when effects grow over time or vary across cohorts. Callaway & Sant'Anna (2021) propose cohort-time ATT aggregation; Goodman-Bacon (2021) decomposes the TWFE estimate into all 2×2 DiD comparisons; Sun & Abraham (2021) propose an interaction-weighted estimator. The vault's DiD note is unaware of these developments, leaving readers who adopt staggered panels without guidance.

**Adjacent notes:** [[Differences-in-Differences]], [[Bayesian Difference in Differences]], [[Synthetic Control]], [[Fixed-Effects Model]], [[Generalized Synthetic Control Method]], [[Local Average Treatment Effects]]

**Suggested sources / search terms:**
- Callaway & Sant'Anna (2021) — "Difference-in-Differences with multiple time periods" (*Journal of Econometrics*)
- Goodman-Bacon (2021) — "Difference-in-differences with variation in treatment timing" (*Journal of Econometrics*)
- Sun & Abraham (2021) — "Estimating dynamic treatment effects in event studies with heterogeneous treatment effects" (*Journal of Econometrics*)
- Baker, Larcker & Wang (2022) — "How much should we trust staggered difference-in-differences estimates?" (*Journal of Financial Economics*)
- Search: "staggered DiD", "heterogeneous treatment effects TWFE", "Callaway Sant'Anna DiD", "event study staggered adoption", "did R package"

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

## Covered Gaps

| Gap | Covered By | Date Covered |
|-----|-----------|--------------|
| Synthetic Control Methods (#2) | [[Synthetic Control]] | 2026-04-10 |
| Causal DAGs (#4) | [[Directed Acyclic Graphs]] | 2026-04-10 |
| Heterogeneous Treatment Effects / CATE (#5) | [[Metalearners for CATE]], [[X-Learner]], [[T-Learner and Minimax Rate]], [[S-Learner]] | 2026-04-12 |

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
