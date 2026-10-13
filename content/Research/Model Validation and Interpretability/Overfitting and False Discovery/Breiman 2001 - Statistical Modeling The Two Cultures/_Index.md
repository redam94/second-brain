---
title: "Index: Breiman 2001 - Statistical Modeling The Two Cultures"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Overfitting and False Discovery]]"
date_updated: 2026-10-13
concept_count: 9
source: "[[raw/Breiman 2001 - Statistical Modeling The Two Cultures.pdf]]"
source_location: "Statistical Science 16(3): 199-231 (whole paper, comments and rejoinder)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Breiman 2001 - Statistical Modeling The Two Cultures"
doc_type: index
depends_on: []
used_by: []
aliases: []
---

# Breiman 2001 - Statistical Modeling The Two Cultures

> [!abstract] Routing Summary
> This folder covers Leo Breiman's *Statistical Modeling: The Two Cultures* (Statistical Science 16(3), 2001, pp. 199-231) with the comments by Cox, Efron, Hoadley and Parzen and the rejoinder. It contains 9 notes spanning the data-modeling vs algorithmic-modeling distinction, the critique of goodness-of-fit validation, the Rashomon effect, the Occam dilemma with forest-vs-tree results, the blessing of dimensionality and SVMs, random-forest permutation importance on medical and genetic data, the glossary (generalization error, bagging, boosting), and the published discussion.
> - Need the paper map, key numbers or section-to-note table? → [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
> - Need the definitions of the two cultures or the machine-learning community's assumptions? → [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]]
> - Need the ozone/chlorine projects or the five perceptions? → [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]]
> - Need why goodness-of-fit tests and residuals fail, model (R) or the salary example? → [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]]
> - Need the original Rashomon statement, Pictures 1-3 or instability? → [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]]
> - Need Table 1-2 (forest vs single tree), the Statlog ranks or the Occam dilemma? → [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]]
> - Need Vapnik's support-vector bound or the Amit-Geman forest? → [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]]
> - Need the permutation-importance algorithm or the hepatitis/Bupa/microarray examples (Figs. 1-6)? → [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]]
> - Need the definition of generalization error or bagging? → [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]]
> - Need Cox's, Efron's, Hoadley's or Parzen's objections, the Fat Scorecard, the Ping-Pong theorem or the rejoinder? → [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]]
^abs-index-md-1

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Data vs algorithmic modeling cultures | [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] | definition | — | validation by GOF (98%) vs predictive accuracy (2%) |
| Algorithmic theory's single assumption | [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] | definition | — | data i.i.d. from an unknown distribution |
| Five perceptions (a)-(e) | [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] | definition | — | test-set accuracy is the criterion |
| Model (R) | [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] | definition | — | $y=b_0+\sum b_mx_m+\varepsilon$, $\varepsilon\sim N(0,\sigma^2)$ |
| Low power of GOF and residual checks | [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] | theorem | model (R) | omnibus tests reject only extreme misfit |
| Emulation accuracy | [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] | definition | [[Cross Validation Checking]] | closeness of $y$ and $\hat y$ on new cases |
| Rashomon effect | [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] | definition | multiplicity | many forms with near-minimal error |
| Instability | [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] | definition | Rashomon | small perturbation, large change in form |
| Forest algorithm / random forests | [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] | algorithm | bagging | errors cut by 1/3 to 1/2 (Table 2) |
| Occam dilemma | [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] | theorem | forests | accuracy needs complexity |
| Blessing of dimensionality | [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] | theorem | — | add features, extract small pieces |
| Vapnik SV bound | [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] | theorem | optimal hyperplane | $E(GE)\le E(\#SV)/(N-1)$ |
| RF permutation importance | [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] | algorithm | random forests | % increase in OOB error |
| Surrogate variables 12/17 | [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] | example | importance | explains <60% bootstrap selection |
| Generalization error | [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]] | definition | — | $E\,L(Y,\phi(X))$ |
| Bagging / boosting | [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]] | definition | bootstrap | average or vote over bootstrap fits |
| Divergence; Fat Scorecard; Ping-Pong theorem | [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] | definition/example | scorecards | 162 weights, 1 significant, best test performance |
| Efron's Rules 1-2 | [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] | definition | — | new methods look better; complex harder to criticise |
| Parzen quantile / comparison density | [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] | definition | quantile functions | independence iff $d(t,u)=1$ |

## Notes

- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — CONTAINS: research question, contributions, key-numbers table, five theses, full Source Map (every section, Tables 1-2, Figs. 1-6, each comment and rejoinder), errata, reference-list inconsistency table (citation vs list mismatches), validation-checklist example.
- [[Breiman 2001 - Data Modeling vs Algorithmic Modeling Cultures]] — CONTAINS: black-box picture, definitions of the two goals and two cultures (with population estimates), the three charges, road map, §7 precursors, §7.1 ML community, §7.2 single i.i.d. assumption and theory examples (Wahba, CART consistency, Vapnik, boosting), §7.3 three lessons.
- [[Breiman 2001 - Consulting Projects and Perceptions on Statistical Analysis]] — CONTAINS: project list, ozone project example (450+ variables, 5/2-year split, failure), chlorine project example (30,000 compounds, 1,500 questions, 95%), perceptions (a)-(e), §4 "What's the model for the data?", §4.1 Annals/JASA critique.
- [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] — CONTAINS: model-vs-nature thesis, model (R) definition, faculty salary example, six-point GOF/residual critique (7-dim simulation, Bickel-Ritov-Stoker, Cleveland), "greatest plus" premise and multiplicity (§5.3), emulation-accuracy definition and CV (§5.4), §6 limitations.
- [[Breiman 2001 - Rashomon Effect and the Multiplicity of Good Models]] — CONTAINS: Rashomon definition, Pictures 1-3 equations, tree and neural-net instances, instability definition, covariate-deletion theorem, Arena et al. bagging example, table of Rashomon recurrences.
- [[Breiman 2001 - Occam Dilemma and Random Forests vs Single Trees]] — CONTAINS: court-delay tree example, forest algorithm, random-forests definition, Table 1 and Table 2 transcribed, Table 2 protocol, Statlog ranks, digit comparison, Occam dilemma statement, grade table.
- [[Breiman 2001 - Bellman, Blessing of Dimensionality and Support Vector Machines]] — CONTAINS: curse vs blessing, "digging it out in small pieces", Amit-Geman algorithm and 0.7%, SVM definitions, monomial-expansion algorithm, Vapnik bound with proof sketch, ZIP/NIST results, Cox's reaction, scorecard feature explosion.
- [[Breiman 2001 - Information from a Black Box - Hepatitis, Liver and Microarray Examples]] — CONTAINS: two-black-boxes reframing, holdout algorithm, hepatitis analysis (Figs. 1-3 values), permutation-importance algorithm, surrogate theorem and Efron's correction, Bupa covariates and Figs. 4-5 values, proximity clustering, microarray Fig. 6, §11.4 baseline argument and conclusions, rejoinder on importance.
- [[Breiman 2001 - Final Remarks and Glossary of Algorithmic Terms]] — CONTAINS: §12 remarks (Dempster, astronomy, genetics), glossary definitions (generalization error, predictive accuracy, trees, dropping x, bagging, boosting), acknowledgments, full main reference list with titles and venues (p. 215) and rejoinder Additional References (p. 231).
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — CONTAINS: Cox's 12 points (incl. clinical-trial prediction, journal list, analysis as a secondary step), Efron's comment (incl. "all the help we can get") and Rules 1-2, Hoadley's engineering/OR origins, segmented scorecard, treed-regression parallel, divergence formula, margin-as-random-variable link, test-sample overfitting, Fat Scorecard, Ping-Pong theorem, tuning dilemma, dollars-saved objective, importance critique, Parzen's management/science, diagnostics, SIEVE/PPDAC, quantile-culture history (Parzen 1979, Stone 1977), quantile and comparison-density definitions, bin tests, full rejoinder (C1-C5, E1-E4, Hoadley, Parzen, Where Are We Heading?).

## Sources
- Breiman 2001 - Statistical Modeling The Two Cultures — Statistical Science 16(3): 199-231 (paper, four comments, rejoinder; 33 pp.)

## See Also
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — formal Rashomon sets
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — correlated predictors and permutation importance
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — why permute-and-predict can mislead
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — sibling folder on false discovery
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] — sibling folder on prediction-model overfitting
- [[Cross Validation Checking]] — estimating predictive accuracy
