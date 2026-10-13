---
title: "Index: Overfitting and False Discovery"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/false-discovery
parent: "[[../_Index|Model Validation and Interpretability]]"
date_updated: 2026-10-13
doc_type: index
concept_count: 35
---

# Overfitting and False Discovery

> [!abstract] Routing Summary
> This topic covers **why fitted models and "significant" findings fail to hold up on new data**, and how to size, check and report analyses so they do. It has two sides. **False discovery** covers field-level positive predictive value (Ioannidis 2005) and the false-positive inflation that undisclosed analytic flexibility causes (Simmons, Nelson & Simonsohn 2011). **Overfitting** covers judging models by held-out predictive accuracy instead of goodness of fit (Breiman 2001) and the minimum sample size that keeps a regression prediction model from overfitting (Riley et al. 2020). The cluster has 4 sub-topics (one per source) and 35 notes: 4 overviews and 31 detail notes.
> - Need the probability that a significant finding is true (PPV, pre-study odds $R$, bias $u$, $n$ teams)? → [[Ioannidis 2005 - Why Most Published Findings Are False/_Index|Ioannidis 2005]]
> - Need how far flexible analysis inflates the false-positive rate (61%, optional stopping 22%) or a disclosure checklist? → [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology/_Index|Simmons Nelson Simonsohn 2011]]
> - Need prediction-vs-inference, the Rashomon effect, the Occam dilemma or random-forest permutation importance? → [[Breiman 2001 - Statistical Modeling The Two Cultures/_Index|Breiman 2001]]
> - Need how many rows or events a model with $P$ candidate parameters needs (shrinkage, optimism, beyond 10 EPV)? → [[Riley et al 2020 - Sample Size for Prediction Models/_Index|Riley et al 2020]]
> - Need a one-page summary of a source? → [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]], [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]
> - Need to check a model-validation report for forking paths and overfitting? → Simmons's [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines|disclosure checklist]], Breiman's [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview|validation checklist example]] and Riley's [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting|parameter-budget criteria]]
^routing-summary

## Sub-topics

- [[Ioannidis 2005 - Why Most Published Findings Are False/_Index|Ioannidis 2005 - Why Most Published Findings Are False]] (10 notes) — COVERS: the 2x2 findings-vs-truth framework and $\text{PPV}=(1-\beta)R/(R-\beta R+\alpha)$; the more-likely-true condition $(1-\beta)R>\alpha$; bias $u$ (Table 2, Figure 1 with its legend mismatch resolved) and reverse bias; $n$ independent teams (Table 3, Figure 2, monotonicity proof); Corollaries 1-6 and the Proteus phenomenon; the Box 1 GWAS worked example (printed $1.5\times10^{-4}$ vs recomputed $2.5\times10^{-4}$); Table 4 PPV for nine study designs with Monte Carlo replication; null fields; the four remedies, model assumptions and later critiques; all 37 references with a citation map.
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology/_Index|Simmons Nelson Simonsohn 2011 - False-Positive Psychology]] (7 notes) — COVERS: the ambiguity-plus-motivated-reasoning mechanism and the three costs of false positives; the "When I'm Sixty-Four" chronological-rejuvenation studies and their Table 3 disclosed re-report; Table 1 simulations of four researcher degrees of freedom (9.5/7.7/11.7/12.6%, combined 60.7%) with reproduction code; optional stopping (Figure 1, 22.1%) and the p-value path (Figure 2); Table 2's six author requirements and four reviewer guidelines; criticisms, nonsolutions (alpha correction, Bayes, conceptual replication, data posting) and concluding remarks.
- [[Breiman 2001 - Statistical Modeling The Two Cultures/_Index|Breiman 2001 - Statistical Modeling The Two Cultures]] (10 notes) — COVERS: data-modeling vs algorithmic-modeling cultures; the consulting projects (ozone, chlorine) and five perceptions; the critique of goodness-of-fit and residual checks, multiplicity of data models and predictive (emulation) accuracy; the Rashomon effect and instability; the Occam dilemma with forest-vs-tree Tables 1-2; the blessing of dimensionality, SVMs and the Vapnik bound; random-forest permutation importance on hepatitis, liver and microarray data (Figs. 1-6); the glossary (generalization error, bagging, boosting); the Cox, Efron, Hoadley and Parzen comments and the rejoinder.
- [[Riley et al 2020 - Sample Size for Prediction Models/_Index|Riley et al 2020 - Sample Size for Prediction Models]] (8 notes) — COVERS: why 10 events per variable is wrong and how to count candidate parameters (EPP); precision criteria for overall risk, MAPE and residual SD (Figs 1-2, $234+P$); the shrinkage ($S\ge0.9$) and optimism ($\delta\le0.05$) criteria (Figs 3, 5) and the shrinkage paradox; anticipating Cox-Snell $R^2$ and its maximum (Fig 4); Box 1 (B1-B4, T1-T3, C1-C4), `pmsampsize` and Examples 1-3 (5249/5143/254); extensions to subgroups, existing datasets, variable selection, machine learning and model updating; references 1-78, supplements S1-S6 and back matter.

## Concept Map

| Concept | Source | Note | Type | Key Result |
|---|---|---|---|---|
| Positive predictive value of a finding | Ioannidis 2005 | [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] | theorem | PPV > 1/2 iff $(1-\beta)R>\alpha$ |
| Bias $u$ | Ioannidis 2005 | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] | definition | PPV falls toward $R/(R+1)$ as $u\to1$ |
| Many teams on one question | Ioannidis 2005 | [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] | theorem | PPV$_n$ strictly decreasing in $n$ iff $1-\beta>\alpha$ |
| Six corollaries / Proteus phenomenon | Ioannidis 2005 | [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] | theorem | small studies, small effects, many tests, flexibility, interests and hot fields lower PPV |
| PPV by study design | Ioannidis 2005 | [[Ioannidis 2005 - Table 4 PPV by Study Design]] | example | 0.85 (confirmatory RCT) down to 0.001 (discovery research) |
| Null field | Ioannidis 2005 | [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]] | definition | claimed effects measure net bias |
| Researcher degrees of freedom (paper definition) | Simmons 2011 | [[Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives]] | definition | ambiguity × desire, not fraud |
| Flexible-analysis false-positive rate | Simmons 2011 | [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]] | simulation | 60.7% with four forks at p < .05 |
| Optional stopping | Simmons 2011 | [[Simmons 2011 - Optional Stopping Simulations (Figures 1-2)]] | simulation | 22.1% when testing after every observation |
| False hypothesis "confirmed" | Simmons 2011 | [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]] | example | p = .040; p = .33 without the covariate |
| Disclosure standard | Simmons 2011 | [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]] | algorithm | 6 requirements, 4 guidelines |
| Nonsolutions | Simmons 2011 | [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]] | claim | alpha correction fails because $k$ is unknown |
| Two cultures | Breiman 2001 | [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] | definition | validation by fit (98%) vs prediction (2%) |
| Weakness of goodness-of-fit checks | Breiman 2001 | [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] | theorem | omnibus tests reject only extreme misfit |
| Rashomon effect | Breiman 2001 | [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] | definition | many forms with near-minimal error |
| Occam dilemma | Breiman 2001 | [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] | theorem | forests cut tree error by 1/3 to 1/2 |
| Blessing of dimensionality | Breiman 2001 | [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] | theorem | $E(GE)\le E(\#SV)/(N-1)$ |
| Permutation importance | Breiman 2001 | [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] | algorithm | forest 12.3% vs logistic 17.4% error |
| Generalization error | Breiman 2001 | [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]] | definition | $E\,L(Y,\phi(X))$ |
| Test-set overfitting / tuning dilemma | Breiman 2001 (Hoadley) | [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] | claim | holdouts get overfit by tuning |
| Candidate parameters (EPP) | Riley 2020 | [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]] | definition | count every candidate $\beta$ |
| Precision criteria | Riley 2020 | [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]] | theorem | 385 at $\phi=0.5$; $234+P$ |
| Shrinkage and optimism criteria | Riley 2020 | [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] | theorem | $n=P/[(S-1)\ln(1-R^2_{cs}/S)]$ |
| max($R^2_{cs}$) | Riley 2020 | [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]] | definition | 0.33 at prevalence 0.05 |
| Four-step procedure | Riley 2020 | [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] | algorithm | take the largest $n$ |
| ML data hunger, no data splitting | Riley 2020 | [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] | claim | ML may need over 10x EPP |

## Cross-Cutting Concepts

Concepts that span more than one sub-topic:

- **Flexibility as hidden multiplicity.** Simmons measures it as false-positive inflation in one study ([[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]). Ioannidis treats it as bias $u$ and Corollary 4 at field level ([[Ioannidis 2005 - Bias Parameter u and Reverse Bias]], [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]). Riley's rule to count *candidate*, not retained, parameters is the same idea for model building ([[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]). Breiman's Rashomon effect is the modelling version: many specifications fit equally well and tell different stories ([[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]). **They agree** that the number of paths tried, not the one reported, sets the error rate.
- **Small samples.** Ioannidis's Corollary 1 (small studies lower PPV), Simmons's at-least-20-per-cell requirement ([[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]) and Riley's minimum-$n$ criteria ([[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]) all treat small $n$ relative to flexibility as the root problem. Riley gives the only quantitative budget.
- **Held-out data as the honest test.** Breiman makes test-set or cross-validated accuracy the gate for trusting a model ([[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]). Simmons's Guideline 4 asks for an exact replication ([[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]). Ioannidis calls for the totality of evidence and large confirmatory studies ([[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]). **Tension:** Riley advises against data splitting at development and prefers bootstrap optimism correction on all the data ([[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]), while Breiman relies on test sets. Hoadley warns that test sets themselves get overfit by tuning ([[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]).
- **Significance vs prediction as the yardstick.** Ioannidis and Simmons work inside the significance-testing frame and show how it misleads. Breiman rejects that frame for predictive accuracy. **Disagreement on complexity:** Breiman's Occam dilemma says accuracy needs complex algorithmic models ([[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]), while Riley warns that ML methods need much more data than regression and are unstable at small $n$ ([[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]). Cox's comment adds that prediction accuracy is not enough when the question needs extrapolation or a causal answer.
- **Shrinkage as the remedy.** Riley's uniform shrinkage factor and the shrinkage paradox ([[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]), Ioannidis's call to estimate the prior odds $R$ explicitly ([[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]), and Breiman's bagging/forest averaging against instability ([[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]) all pull noisy estimates toward something more stable. **Disagreement on Bayes:** Simmons rejects Bayesian statistics as a fix for flexibility because priors and models add more forks ([[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]); see [[Forking Paths and Bayesian Approaches]] for the counter-view.
- **Disclosure and pre-specification.** Simmons's Table 2, Ioannidis's registration and protocol remedy, and Riley's advice to fix $P$ and the anticipated $R^2_{cs}$ before looking at the data ([[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]) all ask analysts to state the analysis before the result.
- **Variable importance under correlation.** Breiman's surrogate variables 12/17 ([[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]) and Riley's warning about unstable lasso selection ([[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]) both show that the set of "important" drivers is not identified by good fit alone.

## Sources

- [[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]] — Ioannidis JPA (2005), PLoS Medicine 2(8): e124 (Essay, 6 pp.)
- [[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]] — Simmons, Nelson & Simonsohn (2011), Psychological Science 22(11): 1359-1366
- [[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]] — Breiman (2001), Statistical Science 16(3): 199-231, with four comments and the rejoinder
- [[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]] — Riley et al. (2020), BMJ 368:m441

## See Also

- [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Forking Paths and Bayesian Approaches]] — Research Methodology concept notes
- [[Multiple Testing Corrections]], [[Type S and Type M Errors]], [[The Peeking Problem and Optional Stopping]] — testing-error concepts
- [[Model Selection and Overfitting]], [[Cross Validation Checking]], [[Power Analysis and Sample Size]] — overfitting and sample-size background
- [[Pre-registration and Open Science - Overview]] — the remedy ecosystem
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — formal Rashomon sets
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — error control for variable selection
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — designing simulations like Simmons's Table 1
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] — low-$R$ model selection in practice
