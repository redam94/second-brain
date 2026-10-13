---
title: "Breiman 2001 - Statistical Modeling The Two Cultures - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/machine-learning
  - topic/statistical-philosophy
  - topic/false-discovery
  - type/overview
  - doc/paper
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Breiman L. (2001), 'Statistical Modeling: The Two Cultures (with comments and a rejoinder by the author)', Statistical Science 16(3): 199-231. Main paper pp. 199-215 (Abstract, §§1-12, Glossary, Acknowledgments, References; Tables 1-2, Figs. 1-6); comments by D. R. Cox pp. 216-218, B. Efron pp. 218-219, B. Hoadley pp. 220-224, E. Parzen pp. 224-226; Rejoinder pp. 226-231."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: paper
depends_on:
  - "[[Cross Validation Checking]]"
  - "[[Model Selection and Overfitting]]"
used_by:
  - "[[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]"
  - "[[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]]"
  - "[[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]"
  - "[[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]"
  - "[[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]"
  - "[[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]"
  - "[[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]"
  - "[[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]]"
  - "[[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]"
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - Breiman 2001
  - Statistical Modeling The Two Cultures
  - Statistical Modeling - The Two Cultures
  - Two Cultures paper
  - Algorithmic modeling
---

# Breiman 2001 - Statistical Modeling The Two Cultures - Overview

> [!summary]
> **Question.** Should statistics keep relying almost exclusively on stochastic **data models** fitted and checked by goodness-of-fit tests, or adopt **algorithmic models** judged by predictive accuracy? **Argument.** Breiman (Statistical Science, 2001) says data-model conclusions are about the model, not nature; goodness-of-fit tests and residual plots lack power in more than a few dimensions, so many models with different stories pass. Predictive accuracy on held-out data is the honest test. Three lessons from machine learning follow: **Rashomon** (many near-equally accurate models tell different stories), **Occam** (accuracy and simplicity conflict; forests beat single trees on all 10 data sets in Table 2, with some errors halved and others cut by a third), and **Bellman** (adding features can help, as with SVMs and the Amit-Geman forest). **Black-box information.** Random-forest permutation importance gave more reliable variable importance than logistic regression on hepatitis data (12.3% vs 17.4% error; variables 12 and 17 found as correlated surrogates). Forest proximities found clusters in liver data, and the forest ranked 4,682 genes in a microarray study. "The goal is not interpretability, but accurate information." **Discussion.** Cox disagrees (start from questions; much prediction is extrapolation that needs process models). Efron warns of hidden bias, weak theory and unfair method comparisons. Hoadley gives a credit-scoring algorithmic culture and the "Ping-Pong theorem". Parzen argues for many cultures and quantile methods. Breiman's rejoinder concedes a place for data models but holds that accuracy is the gate for trusting any extracted information.
^sum-statistical-modeling-1

## Overview

The paper is the classic statement of the prediction-first, algorithm-first stance and the source of the "Rashomon effect" and of random-forest permutation importance as a scientific tool. For model validation it supplies five durable ideas:
1. Judge a model by how well it predicts unseen data. Passing a fit test is not enough.
2. Good fit does not identify the mechanism: many models fit equally well.
3. A model barely better than a naive baseline should not be mined for drivers.
4. Variable importance in correlated data is ambiguous.
5. Test sets get overfit by tuning and go stale over time (Hoadley).

The discussion supplies the counterweights for causal and policy questions, where held-out accuracy is not enough.

**Bibliographic note.** Statistical Science 16(3), 199-231 (2001). Leo Breiman, Department of Statistics, UC Berkeley. Discussants: D. R. Cox (Nuffield College, Oxford), Brad Efron (Stanford), Bruce Hoadley (Fair, Isaac), Emanuel Parzen (Texas A&M).

## Main Content

### Research question and contribution

- **Contribution 1 — framing.** Two cultures defined by whether one models the inside of nature's black box ([[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]).
- **Contribution 2 — critique.** Data models are checked by low-power yes/no tests, admit many equally fitting rivals, and are rarely assessed by predictive accuracy ([[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]).
- **Contribution 3 — three lessons.** Rashomon, Occam, Bellman ([[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]], [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]], [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]).
- **Contribution 4 — evidence.** Accurate black boxes yield better information than less accurate data models ([[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]).

### Key findings and numbers

| Finding | Value | Location |
|---|---|---|
| Culture populations | 98% data modeling / 2% algorithmic | §1, p. 199 |
| Chlorine tree accuracy | 95% on both classes (25,000/5,000 split) | §3.2, p. 201 |
| Five-variable subsets of 30 | about 140,000; many within 1.0% of min RSS | §8, p. 206 |
| Neural net restarts | 100 runs, 32 distinct minima, equal test error | §8, p. 206 |
| Forest vs tree test error | e.g. letters 3.4% vs 12.4%, digit 6.2% vs 17.1% | Table 2, p. 207 |
| Statlog ranks | forest 1,1,1,1 (avg 1.0) vs next best 7.3 | §9.3, p. 208 |
| Amit-Geman NIST digits | 0.7% test error | §10.2, p. 208 |
| SVM ZIP code / NIST | 4.1% / 1.1% | §10.3, p. 209 |
| Vapnik bound | $E(GE)\le E(\#SV)/(N-1)$ | §10.3, p. 209 |
| Hepatitis: baseline / logistic / forest | 20.6% / 17.4% / 12.3% | §11.1, §11.4 |
| Hepatitis: vars 12 or 17 alone (forest) | 14.3% each | §11.1, p. 211 |
| Bupa forest error | 28%; tests 3, 5, 4 important; two clusters in class 2 | §11.2, pp. 212-213 |
| Lymphoma microarray | 81 samples, 4,682 genes, no selection | §11.3, p. 213 |
| Hoadley Fat Scorecard | 162 weights, 1 with $p<0.05$; beat a 2,000-weight neural net | p. 222 |

### Core claims stated as theses

> [!theorem] Breiman's theses (§§5, 9, 11, 12)
> 1. "The conclusions are about the model's mechanism, and not about nature's mechanism" (§5, p. 202).
> 2. Omnibus goodness-of-fit tests and residual analysis lack power beyond a few dimensions, so they cannot select among many acceptable models (§5.2-5.3).
> 3. Predictive accuracy on held-out data (test set or cross-validation) is the measure of how well a model emulates nature (§5.4).
> 4. "Accuracy generally requires more complex prediction methods" (§9.4).
> 5. "Higher predictive accuracy is associated with more reliable information about the underlying data mechanism" (§11.4, p. 214).
^thm-breiman-theses

## Source Map

Every section, table and figure of the source and the note that holds it.

| Source section | Pages | Content | Note |
|---|---|---|---|
| Abstract | 199 | thesis summary | this note; [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] |
| §1 Introduction | 199-200 | black box; two goals; two cultures; three charges | [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] |
| §2 Road Map | 200 | author's path; section plan; Rashomon/Occam/Bellman | [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] |
| §3 Projects in Consulting | 200 | list of projects | [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] |
| §3.1 The Ozone Project | 200-201 | 450+ variables, 5/2-year split, failure | [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] |
| §3.2 The Chlorine Project | 201 | 30,000 spectra, 1,500 questions, 95% | [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] |
| §3.3 Perceptions on Statistical Analysis | 201 | perceptions (a)-(e) | [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] |
| §4 Return to the University; §4.1 Statistical Research | 202 | "What's the model for the data?"; Annals/JASA | [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] |
| §5 The Use of Data Models | 202 | model vs nature's mechanism | [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] |
| §5.1 An Example (model R) | 202-203 | Gaussian linear model; salary/gender example | same |
| §5.2 Problems in Current Data Modeling | 203 | GOF power; residual analysis; 7-dim simulation | same |
| §5.3 The Multiplicity of Data Models | 203-204 | "greatest plus" of data models (simple picture + CIs); equally fitting models, different conclusions | same; [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] |
| §5.4 Predictive Accuracy | 204 | emulation; CV; test sets | [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] |
| §6 The Limitations of Data Models | 204-205 | frozen toolkit; hammer and nail; MCMC | same |
| §7 Algorithmic Modeling; §7.1 New Research Community; §7.2 Theory; §7.3 Recent Lessons | 205-206 | ML community; i.i.d. assumption; Vapnik; three lessons | [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] |
| §8 Rashomon and the Multiplicity of Good Models | 206 | definition; Pictures 1-3; trees, nets; instability; bagging fix | [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] |
| §9 Occam and Simplicity vs. Accuracy | 206-207 | court-delay tree | [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] |
| §9.1 Growing Forests for Prediction | 207 | forest algorithm; random forests | same |
| §9.2 Forests Compared to Trees; **Table 1**; **Table 2** | 207 | data sets; test error forest vs tree | same |
| §9.3 Random Forests are A+ Predictors | 208 | Statlog ranks; digit 5.1% vs 6.2% | same |
| §9.4 The Occam Dilemma | 208 | dilemma statement | same |
| §10 Bellman and the Curse of Dimensionality | 208 | the curse | [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] |
| §10.1 Digging It Out in Small Pieces | 208 | increase dimensionality | same |
| §10.2 The Shape Recognition Forest | 208 | Amit-Geman; 0.7% | same |
| §10.3 Support Vector Machines (incl. hyperplane diagram) | 208-209 | optimal hyperplane; Vapnik bound; 4.1%, 1.1% | same |
| §11 Information from a Black Box | 209-210 | two black boxes; accurate information | [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] |
| §11.1 Example I (hepatitis); **Fig. 1**, **Fig. 2**, **Fig. 3** | 210-212 | logistic vs forest; permutation importance; surrogates | same |
| §11.2 Example II (Bupa liver); **Fig. 4**, **Fig. 5** | 212-213 | importance; proximity clusters | same |
| §11.3 Example III (microarray); **Fig. 6** | 213 | 4,682-gene importance | same |
| §11.4 Remarks about the Examples | 213-214 | baseline 20.6%; conclusions | same |
| §12 Final Remarks | 214 | not against data models; new problems | [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]] |
| Glossary | 214-215 | generalization error; predictive accuracy; trees; dropping x; bagging; boosting | same |
| Acknowledgments; References | 215 | | same |
| Comment: D. R. Cox | 216-218 | caricature; questions first ("data looking for a question" atypical); clinical-trial and extrapolation examples of prediction; journal list (zero to 100% real data); analysis technique as a secondary step; model requirements | [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] |
| Comment: B. Efron | 218-219 | 100 years of unbiasedness; "we need all the help we can get"; Rules 1-2; hepatitis 60% vs 59% | same |
| Comment: B. Hoadley (9 subsections) | 220-224 | engineering/OR origins (jackknife, bootstrap); scorecards; treed regression; divergence; margin as a random variable; Fat Scorecard; Ping-Pong; tuning; dollars saved; importance | same |
| Comment: E. Parzen §§1-5 | 224-226 | management vs science; diagnostics; SIEVE; quantile culture (Parzen 1979, Stone 1977, "you have to sell it"); quantile and comparison densities; bin tests | same |
| Rejoinder: Cox (C1-C5), Efron (E1-E4), Hoadley, Parzen, Where Are We Heading?, Additional References | 226-231 | | same |

**Errata noted in the source.** §9.4 says "Section 10 points out that ... there is no Occam's dilemma" (the argument is made in §11). §11.1 says instability is discussed in "Section 7.1" (it is §8) and says the forest importance "is shown in Figure 1" (it is Fig. 2). Fig. 3's caption reads "Variable 17 vs. probability #1" but shows both variables 12 and 17. The paper spells Landwehr, Pregibon as "Landwher, Preibon" and Kononenko as "Konenenko".

**Reference-list inconsistencies (main References, p. 215, checked against the text).**

| In-text citation | Location | What the reference list has |
|---|---|---|
| Breiman (1999) for random forests | §9.1 (p. 207); rejoinder E4, "some simple theory that illuminates the behavior of random forests (Breiman, 1999)" (p. 230) | no 1999 entry; only Breiman (2001) "Random forests", *Machine Learning J.* 45 5-32 (presumably the published version of the work cited as 1999) |
| Friedman, Hastie and Tibshirani (1998) | §9.1 (p. 207) | listed as 2000, *Ann. Statist.* 28 337-407 |
| Cestnik, Kononenko and Bratko (1987) | §11.1 (p. 210) | missing |
| "Breiman, 1996" (bagging) | §11.1 (p. 211) | ambiguous: the list has 1996a and 1996b; bagging is 1996b |
| Freedman (1995) | §5.1 (p. 203), "data modeling (1991, 1995)" | no 1995 entry; the list has two Freedman (1991) entries instead |
| (not cited) | — | Breiman and Friedman (1985) is listed but never cited in the main text |

The full reference list, with titles and venues, is transcribed in [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]].

## Examples

> [!example] Using the paper as a validation checklist for a marketing model
> 1. **Baseline.** Does the model beat a naive forecast (seasonal naive, trend + seasonality) on held-out weeks? If barely, do not report its drivers (§11.4; rejoinder E2).
> 2. **Multiplicity.** Refit with perturbed data or alternative specifications. Do driver rankings stay stable while error stays flat? If not, report ranges (§8; [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]).
> 3. **Correlated drivers.** Are channels flighted together? Then marginal importance is ambiguous (§11.1; [[Strobl et al 2008 - Conditional Variable Importance - Overview]]).
> 4. **Holdout hygiene.** Was the holdout used for tuning? (Hoadley's tuning dilemma.)
> 5. **Extrapolation.** Is the business question a scenario outside the observed data? Then prediction accuracy is not sufficient (Cox; [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]).
^ex-statistical-modeling-2

## Connections

- **Within this run.** Rashomon is formalised in [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]. Permutation-importance problems: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]. Selection stability: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]. Importance vs causation: [[Dillon et al - SHAP and Causal Insights - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]. False discovery: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]. Sample size for prediction models: [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]. Time-series CV: [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]. Method comparisons: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]. Model governance: [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].
- **Elsewhere in the vault.** [[Cross Validation Checking]], [[Model Selection Using Predictive Performance]], [[Model Selection and Overfitting]], [[Posterior Predictive Checking]], [[Prediction vs Postdiction]], [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Honest Trees and Causal Forests]], [[Causal Machine Learning - Overview]], [[Stacking and Predictive Model Averaging]].

## See Also
- [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] — start here for definitions
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — the empirical core
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — the counterarguments
- [[Permute-and-Predict Extrapolation in Variable Importance]] — Rudin's argument against explaining black boxes
- [[Rashomon Sets and Model Class Reliance - Definitions]] — formalizes Breiman's Rashomon effect as an estimable set and interval
- [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] — ML may need more than 10x the events per parameter of regression
