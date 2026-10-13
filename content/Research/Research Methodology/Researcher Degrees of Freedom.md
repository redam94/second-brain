---
title: "Researcher Degrees of Freedom"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/replication-crisis
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-10-13
folder: "Research Methodology"
aliases:
  - "Analytic flexibility"
  - "Data-contingent analysis"
doc_type: concept
source_location: "p_hacking.pdf pp. 1-14"
depends_on:
  - "[[Garden of Forking Paths]]"
  - "[[The Experimental Ideal]]"
  - "[[Omitted Variables Bias]]"
used_by:
  - "[[Gelman Loken 2013 - Garden of Forking Paths - Overview]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]"
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
  - "[[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]"
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]"
  - "[[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]"
  - "[[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]"
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]"
  - "[[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]"
  - "[[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]"
  - "[[Out-of-Sample Validation for Time-Series Models]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
  - "[[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]"
  - "[[SR 11-7 - Model Development, Implementation and Use]]"
  - "[[NIST AI RMF - Applying the Framework to Marketing Analytics Models]]"
  - "[[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]"
  - "[[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]]"
  - "[[Model Validation and Interpretability - Overview]]"
---

# Researcher Degrees of Freedom

> [!summary]
> The concept of "researcher degrees of freedom" describes how the many decision points in data analysis — each seemingly innocuous — create an enormous space of possible analyses. Even without intent to deceive, this flexibility inflates false positive rates.
^summary

## Sources of Analytic Flexibility

From the examples in [[Garden of Forking Paths]], degrees of freedom include:

### Variable and Comparison Choices
- Which main effects vs. interactions to examine
- How to define subgroups (e.g., "single" vs. "married" definitions)
- Which covariates to include or exclude
- Whether to combine or separate samples

### Data Processing Decisions
- Inclusion/exclusion criteria (e.g., which days count as "peak fertility")
- How to handle outliers or missing data
- How to code categorical variables
- Whether to transform variables

### Statistical Modeling Choices
- Parametric vs. nonparametric tests
- Whether to pool across studies or analyze separately
- Fixed vs. random effects
- One-tailed vs. two-tailed tests

## The Combinatorial Explosion

Each decision multiplies the number of possible analyses. With just 5 binary choices, there are $2^5 = 32$ possible analysis paths. In real studies, the number is far larger. The probability that *at least one* path yields $p < 0.05$ is much higher than 5%.

## Connection to the Replication Crisis

This mechanism explains why:
- Published findings often fail to replicate
- Effect sizes shrink dramatically in replication attempts
- The problem is worst with small samples, noisy measurements, and small effects
- Pre-registration helps but cannot eliminate all flexibility

## See Also

- [[Garden of Forking Paths]] — the full paper and theoretical framework
- [[Forking Paths and Bayesian Approaches]] — alternatives to p-value-based inference
- [[Omitted Variables Bias]] — a related source of analytical error
- [[Hierarchical Models]] — partial pooling provides a structural solution by shrinking estimates across researcher-chosen subgroups
- [[Pre-registration and Open Science - Overview]] — pre-registration constrains these degrees of freedom
- [[The Peeking Problem and Optional Stopping]] — data-dependent stopping as a researcher degree of freedom
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — cutpoint search in CART is hidden multiple testing inside the algorithm
- [[Rashomon Sets and Model Class Reliance - Definitions]] — the epsilon-Rashomon set formalizes the set of defensible analyses
- [[Stability Selection - Discussion, Limitations and Practice]] — a pre-declared error target replaces the free choice of regularisation level
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — a tuning choice acting as a researcher degree of freedom
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — players, value function and explained model are analyst choices
- [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] — choosing analyses by how results look is regressional Goodhart
- [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]] — overfitting depends on all candidate parameters considered
- [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] — bias u formalizes researcher degrees of freedom at field level
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — Hoadley's test-sample tuning dilemma and Cox on automatic selection
- [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] — screening trending candidates makes about 75% look significant
- [[Out-of-Sample Validation for Time-Series Models]] — nested windows as the cure for selection-on-holdout bias
- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — data-dependent selection steps placed inside the simulation loop
- [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] — specification flexibility with equal fit
- [[SR 11-7 - Model Development, Implementation and Use]] — organisational counterpart of analytic flexibility
- [[NIST AI RMF - Applying the Framework to Marketing Analytics Models]] — SHAP-mass model-selection anti-pattern
- [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] — prior choice moves attribution by 15-20 points
- [[Carryover (Adstock) Functional Forms]] — the adstock window L as an analyst choice
- [[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]] — methodological wiggle room in ROI reporting
- [[Model Validation and Interpretability - Overview]] — analytic flexibility in model building and its remedies

## Source-Verified Fork Catalogue (coverage audit 2026-10-13)

> [!note] Provenance
> Some items listed above (e.g. parametric vs nonparametric tests, fixed vs random effects, one- vs two-tailed tests) are general analytic forks, **not** examples from Gelman & Loken (2013). The forks the paper actually documents are below, with locations. The simulation-based treatment of the term "researcher degrees of freedom" belongs to [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]. Gelman & Loken say they "regret the spread" of the term because it suggests conscious fishing (p. 2).
^note-provenance

| Fork type (Gelman & Loken) | Concrete instance in the paper | Location | Note |
|---|---|---|---|
| Main effect vs interaction | arm × SES interaction with no main effect; single vs married ovulation effects | §2.1, §2.3 | [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] |
| Which subgroup / interaction | men only, women only, their difference, female interviewers (hypothetical); older siblings; sex differences in ESP | §1.2, §2.1, §2.2 | [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]] |
| Covariate choice | age and age × SES omitted (arm study); age, ethnicity, parenthood available (Durante) | §2.1, §2.3 | [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] |
| Measurement / scale construction | dropping items 5-6 (α = .72); Argentina subscale items 1 and 4 (α = .65); several political outcomes | §2.1, §2.3 | [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] |
| Variable coding | 7-point party ID split; handling independents; "single" vs "committed relationship" | §1.2, §2.3 | [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]] |
| Exclusion rules | > 5 days from menses (violated 9/24 and 22%); age < 40 (ages to 47); 31% excluded for imprecision | §3.1 | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| Outcome category coding | red + pink combined vs red only vs pink only vs white/gray | §3.1 | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| Window / comparison definition | fertile days 6-14 vs 7-14 vs 10-17 vs 12-17; comparison all-other-days vs 17-25 | §3.1 | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| Combining studies | pool samples, isolate one, contrast them, or gather a third sample | §3.2 | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| Choosing among noisy measures | reasoning that the measure giving a significant result is probably the least noisy one, then using only it (Humphreys et al. 2013, as summarised on p. 3) | §1.2 | [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable#^def-gl-least-noisy]] |

Hub: [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].
