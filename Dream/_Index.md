---
title: "Dream: Research Gaps"
tags:
  - type/index
  - type/dream
date_updated: 2026-04-12
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
