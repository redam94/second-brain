---
title: "Dream: Research Gaps"
tags:
  - type/index
  - type/dream
date_updated: 2026-04-09
---

# Dream: Research Gaps

> [!abstract] Purpose
> This index tracks knowledge gaps — topics referenced or implied by existing Research notes that lack dedicated coverage. Updated each weekly cleanup run.

---

## Suggested Topics

### 1. Propensity Score Methods and Inverse Probability Weighting
**Status:** 🌱 new

**Why it's a gap:**
[[Activity Bias in Advertising]] explicitly states that "propensity score matching and regression with controls cannot fix" activity bias, but there is no note explaining what propensity score methods are, when they succeed, and why they fail here. The [[Conditional Independence Assumption]] note covers the theoretical requirement for selection-on-observables identification, and [[The Selection Problem]] motivates the challenge — but the methodological toolkit (propensity scores, IPW, doubly robust estimators) is missing.

**Adjacent notes:** [[Conditional Independence Assumption]], [[The Selection Problem]], [[Omitted Variables Bias]], [[Activity Bias in Advertising]]

**Suggested sources / search terms:**
- Rosenbaum & Rubin (1983) — "The central role of the propensity score"
- Imbens (2004) — "Nonparametric estimation of average treatment effects under exogeneity: A review"
- Search: "propensity score matching", "inverse probability weighting", "doubly robust estimation", "AIPW"

---

### 2. Synthetic Control Methods
**Status:** 🌱 new

**Why it's a gap:**
[[Differences-in-Differences]] covers panel data strategies with multiple control units, but there is no note on synthetic control (Abadie, Diamond & Hainmueller 2010) — the method for settings with a single treated unit and no natural control group. Synthetic control is referenced implicitly by DiD as a complementary quasi-experimental design; it also connects to the common trends assumption that DiD requires. The vault covers sharp and fuzzy RD and IV thoroughly but has a hole here.

**Adjacent notes:** [[Differences-in-Differences]], [[The Experimental Ideal]], [[Research Questions in Econometrics]]

**Suggested sources / search terms:**
- Abadie, Diamond & Hainmueller (2010) — "Synthetic Control Methods for Comparative Case Studies"
- Abadie (2021) — "Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects" (JEL)
- Search: "synthetic control", "comparative case studies", "single treated unit DiD"

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

---

### 4. Causal Directed Acyclic Graphs (DAGs)
**Status:** 🌱 new

**Why it's a gap:**
DAG-based reasoning is implicitly present throughout the vault but has no dedicated note. [[Spurious Association and Confounds]] invokes fork/pipe/collider logic from Statistical Rethinking. [[Missing Data - Statistical Rethinking]] is described as "DAG-based missing data analysis" in the raw sources index. [[Nonparametric Causal Inference]] uses propensity scores that implicitly rely on a DAG's back-door criterion. [[Conditional Independence Assumption]] (econometrics) and [[Data Collection Models]] (BDA3) both describe conditions that are most clearly stated via DAG d-separation. A dedicated note covering the Pearl framework — nodes, edges, d-separation, back-door criterion, front-door criterion, and collider bias — would unify these threads.

**Adjacent notes:** [[Spurious Association and Confounds]], [[Conditional Independence Assumption]], [[Counterfactual Inference]], [[Missing Data - Statistical Rethinking]], [[Nonparametric Causal Inference]], [[The Selection Problem]]

**Suggested sources / search terms:**
- Pearl, Glymour & Jewell (2016) — *Causal Inference in Statistics: A Primer*
- McElreath (2020) — Statistical Rethinking Ch. 6 (collider bias) and Ch. 5 (DAG motivation)
- Angrist & Pischke (2008) — MHE treatment of selection on observables via potential outcomes vs. DAGs
- Search: "d-separation", "back-door criterion", "front-door criterion", "collider bias", "causal graph"

---

### 5. Heterogeneous Treatment Effects and CATE Estimation
**Status:** 🌱 new

**Why it's a gap:**
[[Local Average Treatment Effects]] explicitly discusses the policy-relevance problem: LATE ≠ ATE, and different instruments identify different complier subgroups. [[Nonparametric Causal Inference]] estimates aggregate ATE/ATT using BART but does not cover conditional ATE (CATE) — i.e., how treatment effects vary by subgroup or covariate values. [[Hierarchical Models]] mentions Bayesian partial pooling for treatment effect heterogeneity, but machine learning approaches (causal forests, X-learner, R-learner, doubly robust learners) are entirely absent. This is a major active research area connecting econometrics, Bayesian statistics, and ML.

**Adjacent notes:** [[Local Average Treatment Effects]], [[Nonparametric Causal Inference]], [[Hierarchical Models]], [[Regression and the CEF]], [[Differences-in-Differences]]

**Suggested sources / search terms:**
- Wager & Athey (2018) — "Estimation and Inference of Heterogeneous Treatment Effects using Random Forests" (*JASA*)
- Künzel et al. (2019) — "Metalearners for estimating heterogeneous treatment effects" (*PNAS*)
- Kennedy (2023) — "Towards optimal doubly robust estimation of heterogeneous causal effects"
- Search: "causal forest", "X-learner", "R-learner", "CATE estimation", "heterogeneous treatment effects"

---

## Covered Gaps

*(None yet — update status to 🍂 covered when a Research note is created.)*

---

## Log

| Date | Action |
|------|--------|
| 2026-04-09 | Initial Dream index created. Three gaps identified from review of 9 Research notes. |
| 2026-04-09 | Run 2: reviewed 9 notes (Decision Analysis, Observational vs Experimental, Missing Data Models, GLMs, LATE, Forking Paths, Spurious Association, Modeling as Software Development, Power Analysis). Added gaps 4 (Causal DAGs) and 5 (Heterogeneous Treatment Effects / CATE). All prior gaps remain 🌱 new. |
