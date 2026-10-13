---
title: "Garden of Forking Paths"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/p-values
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-10-13
folder: "Research Methodology"
aliases:
  - "Forking paths"
  - "p-hacking"
doc_type: concept
source_location: "p_hacking.pdf pp. 1-14"
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Research Questions in Econometrics]]"
used_by:
  - "[[Gelman Loken 2013 - Garden of Forking Paths - Overview]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Multiple Testing Corrections]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Prediction vs Postdiction]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Strobl 2007 - Split-Selection Bias in CART Trees]]"
  - "[[Rashomon Sets and Model Class Reliance - Definitions]]"
  - "[[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]"
  - "[[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]"
  - "[[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]"
  - "[[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]"
  - "[[Granger 2003 - Spurious Regression and Cointegration - Overview]]"
  - "[[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]]"
  - "[[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]]"
  - "[[Model Validation and Interpretability - Overview]]"
---

# The Garden of Forking Paths

> [!summary]
> Gelman & Loken (2013) argue that multiple comparisons can be a problem even when researchers perform only a single analysis and have their hypothesis in advance. The problem arises because the *details* of data analysis are contingent on the data — a "garden of forking paths" where different data would have led to different but equally justifiable analyses.
^summary

## The Core Argument

The key distinction is between four testing procedures:

1. **Simple classical test**: fixed test $T$, applied to data → $T(y)$
2. **Pre-registered test**: test chosen from a set, with $\phi$ pre-specified → $T(y; \phi)$
3. **Researcher degrees of freedom**: single test, but a *different* test would have been run on different data → $T(y; \phi(y))$
4. **Fishing/p-hacking**: explicitly trying many tests and reporting the best → $T(y; \phi^{\text{best}}(y))$

> [!warning]
> Researchers claim they are doing #2 (hypothesis specified in advance), critics accuse them of #4 (fishing). Gelman & Loken argue the real issue is #3 — the analysis is data-contingent even without explicit fishing.
^warning-not-fishing

## Why It Doesn't "Feel" Like Fishing

Conditional on the observed data, each analytic choice seems like the *only* reasonable choice. The researcher doesn't feel like they're making arbitrary decisions. But with different data, they would have made different — equally reasonable — choices. The result: the published p-value does not account for this implicit multiplicity.

## Key Examples

- **Arm circumference and political attitudes**: interaction reported as main finding, but many other interactions would have been equally reportable
- **ESP study (Bem 2011)**: nine experiments with many possible comparisons in each
- **Menstrual cycle and voting**: two similar studies in the same journal made different data-analytic choices, both finding significance
- **Red/pink clothing and fertility**: data exclusion rules, color coding choices, and date definitions all represent forking paths

## The Bayesian Connection

> [!tip]
> Once the claim of statistical significance is abandoned, one can take a Bayesian view and treat the observed comparison as evidence about the underlying effect (§4.2, pp. 12-13). Under a **flat (or locally flat) prior**, Bem's 53.1% hit rate gives a posterior probability of **over 99%** that the true hit rate exceeds 0.5, which matches the one-sided p-value of 0.01 (Greenland & Poole 2013). The paper's point is that the flat prior is **not appropriate** here: there was no track record of 53% precognition success, so a skeptical prior pulls the posterior back toward chance. The Bayesian analysis should also condition on all the data, not only the highlighted comparison, which can require hierarchical modeling. See [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]].
^tip-bayesian-connection

## See Also

- [[Researcher Degrees of Freedom]] — deeper dive into analytic flexibility
- [[Forking Paths and Bayesian Approaches]] — how Bayesian methods address this
- [[The Experimental Ideal]] — why randomized experiments mitigate these issues
- [[Hierarchical Models]] — partial pooling provides a structural Bayesian solution to the multiplicity problem
- [[Prediction vs Postdiction]] — pre-commitment makes the confirmatory/exploratory line explicit
- [[The Peeking Problem and Optional Stopping]] — the stopping rule as a forking path
- [[Strobl 2007 - Split-Selection Bias in CART Trees]] — choosing the best cutpoint among many inside CART is forking paths within the algorithm
- [[Rashomon Sets and Model Class Reliance - Definitions]] — Rashomon sets are the model-space image of analytic forking paths
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — searching over lambda and feature sets is a forking path with a false-discovery budget
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — forking paths are selection pressure on a noisy proxy
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — forking paths raise u and lower post-study probability
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — quantifies the cost of forks (61% FPR from four forks)
- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — spurious regression error rate grows with sample size
- [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] — selective reporting of favourable DGMs is forking paths in methods research
- [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] — dozens of choices behind any single MMM
- [[Model Validation and Interpretability - Overview]] — how forking paths show up when validating predictive-analytics products

## Source-Verified Detail (coverage audit 2026-10-13)

> [!note] Full section-by-section capture
> This concept note summarises the paper. The complete capture, including every section, case study, quoted reply and the authors' remedies, is in [[Gelman Loken 2013 - Garden of Forking Paths - Overview]] and its six sub-notes. Corrections and additions from re-reading the source (`p_hacking.pdf`, 14 Nov 2013 working paper, 17 pp.):
^note-full-section-by-section-capture

- **Exact definitions of the four procedures** (§1.2, p. 2), with $\varphi$ = choice of controls, transformations, coding/exclusion rules and main-effect-vs-interaction focus: [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable#^def-gl-proc3]]. Note that the source itself mislabels $T(y;\varphi(y))$ as "item #4" on p. 3. It is #3.
- **Hypothetical example missing above:** Democrats vs Republicans on a math test framed in health-care vs military contexts (p. 3), with a null-data simulation showing about 17% false positives across five reasonable paths: [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable#^ex-partisan-math-sim]].
- **Arm circumference** (Petersen et al. 2013): the interaction had no main effect; adding age removes the arm coefficient; age × SES was not adjusted for; scale items were dropped until significant ($\alpha=.72$; Argentina subscale $\alpha=.65$). See [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies#^ex-gl-fat-arms]].
- **ESP:** the key lesson is the **one-to-many mapping from scientific to statistical hypotheses** (p. 6): [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies#^def-gl-one-to-many]].
- **Menstrual cycle and voting** (Durante et al. 2013): a between-subject design described causally; a substantively implausible ~20-point swing in vote intention; flexible coding of "single". See [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies#^ex-gl-durante]].
- **Red/pink clothing:** the paper's own exclusion rules were inconsistently applied (9/24, 22%, ages to 47, 31% excluded). Fertile windows of 6-14 vs 7-14 (comparison 17-25) vs 10-17 vs 12-17. Side-by-side fork table vs Durante et al.: [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study#^ex-gl-two-studies]].
- **Bayesian connection (corrected above, 2026-10-13).** Under a *flat* prior, Bem's 53.1% gives **> 99%** posterior probability that the hit rate exceeds 0.5. That equals one minus the one-sided p-value; it is not "barely distinguishable from chance". The paper's point is that the flat prior is inappropriate and that the analysis must condition on all comparisons (hierarchical modeling). See [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent#^ex-gl-bem-flat]].
- **Not previously captured:** the three researcher reactions (Concession / Insistence / Contingency), the Nosek-Spies-Motyl replication (> 99% power, $p=.59$), the authors' limits on preregistration, and the "half as many original experiments + pre-registered replication" proposal: [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]].
