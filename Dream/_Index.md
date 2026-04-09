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

## Covered Gaps

*(None yet — update status to 🍂 covered when a Research note is created.)*

---

## Log

| Date | Action |
|------|--------|
| 2026-04-09 | Initial Dream index created. Three gaps identified from review of 9 Research notes. |
