---
title: Model Class Reliance - Bibliographic Details and Reference List
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/variable-importance
  - type/reference
  - doc/paper
source: "[[raw/Fisher Rudin Dominici 2019 - All Models Are Wrong but Many Are Useful.pdf]]"
source_location: "Title page p. 1 (authors, affiliations, contribution order, keywords, arXiv 1801.01489v5); Acknowledgments p. 43; App A.1 p. 43; References pp. 76-81"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Fisher Rudin Dominici 2019 - Model Class Reliance"
doc_type: paper
depends_on:
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
used_by:
  - "[[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]"
aliases:
  - MCR paper reference list
  - Fisher Rudin Dominici 2019 bibliography
---

# Model Class Reliance - Bibliographic Details and Reference List

> [!summary]
> This note records the paper's front matter (authors, affiliations, contribution order, keywords, versions), its acknowledgments and funding, its code location, and its full reference list (pp. 76-81). Each cited work is grouped by the role it plays in the paper, with the section where it is cited. Cited works that have their own note set in this vault are linked.
^summary

## Overview

The rest of this note set cites works inline where they are used. This note is the single place to find the whole bibliography and the bibliographic facts about the paper itself.

## Main Content

### Front matter (title page, p. 1)

> [!definition] Bibliographic record
> - **Title:** "All Models are Wrong, but Many are Useful: Learning a Variable's Importance by Studying an Entire Class of Prediction Models Simultaneously". The running head is "Model Class Reliance".
> - **Venue:** *Journal of Machine Learning Research* 20(177):1-81, 2019. Published copy at jmlr.org/papers/v20/18-760.html.
> - **Preprint:** arXiv:1801.01489v5 [stat.ME], 23 Dec 2019 (the version ingested here).
> - **Authors and affiliations:**
>   - Aaron Fisher: Takeda Pharmaceuticals, Cambridge, MA.
>   - Cynthia Rudin: Departments of Computer Science and Electrical and Computer Engineering, Duke University, Durham, NC.
>   - Francesca Dominici: Department of Biostatistics, Harvard T.H. Chan School of Public Health, Boston, MA.
> - **Author order:** the title page states that authors are listed in order of contribution, highest contribution first.
> - **Keywords:** Rashomon, permutation importance, conditional variable importance, U-statistics, transparency, interpretable models.
^def-biblio-record

### Acknowledgments and funding (p. 43)

> [!definition] Funding sources
> - **National Institutes of Health:** grants P01CA134294, R01GM111339, R01ES024332, R35CA197449, R01ES026217, P50MD010428, DP2MD012722, R01MD012769 and R01ES028033.
> - **Environmental Protection Agency:** grants 83615601 and 83587201-0.
> - **Health Effects Institute:** grant 4953-RFA14-3/16-4.
^def-funding

### Code (App A.1, p. 43)

R code for the §9.1 toy example and the §10 COMPAS analysis is in the GitHub repository `aaronjfisher/mcr-supplement`. See [[Model Class Reliance - Toy Example and Bootstrap Coverage Simulations]] and [[Model Class Reliance - Recidivism Case Study]].

### Reference list grouped by role (pp. 76-81)

The paper's list is alphabetical. It is regrouped here by the role each work plays, with the citing location in the paper. Every entry in the printed list appears exactly once.

> [!example] 1. Permutation and variable importance, especially for random forests (§1 p. 2; §3.2 pp. 9-10; App A.5)
> | Reference | Topic | Cited at |
> |---|---|---|
> | Breiman (2001), "Random forests", *Machine Learning* 45(1) | Original RF permutation importance; out-of-bag VI | §1, §3, §3.2 |
> | Breiman et al. (2001), "Statistical modeling: the two cultures" (with comments and rejoinder), *Statistical Science* 16(3) | Source of the "Rashomon effect" and RF VI; partial dependence | §1, §3.2, §5.2. See [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] |
> | Strobl, Boulesteix, Zeileis & Hothorn (2007), *BMC Bioinformatics* 8:25 | Bias in RF VI measures | §3.2. See [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] |
> | Strobl, Boulesteix, Kneib, Augustin & Zeileis (2008), *BMC Bioinformatics* 9:307 | Conditional VI for RFs; VI as differences | §1, §3.2, App A.5. See [[Strobl et al 2008 - Conditional Variable Importance - Overview]] |
> | Altmann, Toloşi, Sander & Lengauer (2010), *Bioinformatics* 26(10) | Permutation importance, a corrected measure | §1, §3.2 |
> | Archer & Kimes (2008), *CSDA* 52(4) | Empirical study of RF VI | §3.2 |
> | Calle & Urrea (2010), *Briefings in Bioinformatics* 12(1) | Stability of RF importance | §3.2 |
> | Wang, Yang & Luo (2016), *BMC Bioinformatics* 17:60 | Intrinsic stability of RF VI | §3.2 |
> | Hapfelmeier, Hothorn, Ulm & Strobl (2014), *Statistics and Computing* 24(1) | RF VI with missing data | §3.2 |
> | Mentch & Hooker (2016), *JMLR* 17 | Uncertainty and tests for RFs | §3.2 |
> | Louppe, Wehenkel, Sutera & Geurts (2013), NeurIPS | Theory of impurity-based importances | §3.2 |
> | Kazemitabar, Amini, Bloniarz & Talwalkar (2017), NeurIPS | VI using decision trees | §3.2 |
> | Gregorutti, Michel & Saint-Pierre (2015), *CSDA* 90 | Grouped VI with RFs | §1 |
> | Gregorutti, Michel & Saint-Pierre (2017), *Statistics and Computing* 27(3) | Correlation and VI in RFs; linear-model MR analogue | §1, §7.1 |
> | Zhu, Zeng & Kosorok (2015), *JASA* 110(512) | Reinforcement learning trees; an estimand similar to MR | §1, §3.2 |
> | Datta, Sen & Zick (2016), IEEE S&P | Quantitative input influence | §1, §3.2, App A.5 |
> | Hastie, Tibshirani & Friedman (2009), *Elements of Statistical Learning*, 2nd ed. | Lasso, partial dependence, Nadaraya-Watson | §3.2, §10 |
^ref-vi

> [!example] 2. Perturbation importance for neural networks (§1 p. 2; §3.2 p. 10; §9.1 p. 34)
> | Reference | Topic |
> |---|---|
> | Recknagel, French, Harkonen & Yabunaka (1997), *Ecological Modelling* 96 | Neural networks for algal blooms |
> | Yao, Teng, Poh & Tan (1998), *J. Inf. Sci. Eng.* 14(4) | Neural networks for marketing data |
> | Scardi & Harding (1999), *Ecological Modelling* 120(2) | Neural network for phytoplankton production |
> | Gevrey, Dimopoulos & Lek (2003), *Ecological Modelling* 160(3) | Review of variable-contribution methods for neural networks; a measure based on two models |
> | Olden, Joy & Death (2004), *Ecological Modelling* 178(3) | Comparison of neural-network VI methods on simulated data; cited in §9.1 for AR as a step toward variable rankings |
^ref-nn

> [!example] 3. Inferential (non-model-based) VI estimands (§2 p. 4; App A.5)
> | Reference | Topic |
> |---|---|
> | van der Laan (2006), *Int. J. Biostatistics* 2(1) | Statistical inference for VI |
> | Díaz, Hubbard, Decker & Cohen (2015), *PLoS ONE* 10(3) | VI for longitudinal problems with missing variables |
> | Williamson, Gilbert, Simon & Carone (2017), preprint | Nonparametric VI using ML; normalizing by $\mathrm{Var}(Y)$ without models |
^ref-inferential

> [!example] 4. The Rashomon effect and sets of good models (§1 p. 2; §5.2 pp. 18; §11)
> | Reference | Topic |
> |---|---|
> | Heider (1988), *American Anthropologist* 90(1) | The Rashomon effect when ethnographers disagree |
> | Roth & Mehta (2002), *Sociological Methods & Research* 31(2) | The Rashomon effect in contested events |
> | Lecué (2011), PhD thesis, Université Paris-Est | Concentration, complexity and geometry in learning theory |
> | Statnikov, Lytkin, Lemeire & Aliferis (2013), *JMLR* 14 | Discovering multiple Markov boundaries |
> | Tulabandhula & Rudin (2014), arXiv:1407.1097 | Robust optimization with ML-based uncertainty sets |
> | Nevo & Ritov (2017), *JMLR* 18 | A minimal class of models for high-dimensional data |
> | Letham, Letham, Rudin & Browne (2016), *Chaos* 26(6) | Prediction uncertainty and experimental design for dynamical systems |
> | Meinshausen & Bühlmann (2010), *JRSS-B* 72(4) | Stability selection; also the Kirk, Lewin and Stumpf discussion cited in §8.2.1. See [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] |
> | Azen, Budescu & Reiser (2001), *Br. J. Math. Stat. Psych.* 54(2) | Criticality of predictors in multiple regression |
> | Toloşi & Lengauer (2011), *Bioinformatics* 27(14) | Unreliable feature ranking with correlated features; regrouping covariates |
> | Coker, Rudin & King (2018), arXiv:1804.08646 | Robustness of scientific results; profile-likelihood link (§2.1, §5.1, App A.6) |
> | Semenova & Rudin (2019), arXiv:1908.01755 | Rashomon curves and volumes (future work, §11) |
> | Dong & Rudin (2019), arXiv:1901.03209 | Variable importance clouds (future work, §11) |
> | Chipman, George & McCulloch (2010), *Annals of Applied Statistics* 4(1) | BART; MCMC as approximate optimization for complex classes (§5.1, p. 18) |
^ref-rashomon

> [!example] 5. U-statistics, concentration and the delta method (§3.1 p. 9; App A.5; App B)
> | Reference | Topic |
> |---|---|
> | Hoeffding (1948), *Annals of Math. Stat.* | U-statistics and asymptotic normality |
> | Hoeffding (1963), *JASA* 58(301) | Hoeffding's inequality (Theorem 2 and Eq 5.7 used in App B) |
> | Serfling (1980), *Approximation Theorems of Mathematical Statistics* | U-statistic bounds (Theorem A, p. 201) |
> | DeLong, DeLong & Clarke-Pearson (1988), *Biometrics* 44(3) | Early use of U-statistics in ML (correlated AUCs) |
> | Demler, Pencina & D'Agostino (2012), *Stat. in Medicine* 31(23) | Caveat: misuse of the DeLong test for nested models |
> | Dorfman (1938), *Biometric Bulletin* 1 | Delta method |
> | Lehmann & Casella (2006), *Theory of Point Estimation* | Delta method |
> | Ver Hoef (2012), *American Statistician* 66(2) | History of the delta method |
^ref-ustat

> [!example] 6. Optimization (§6.1, §6.3, §7.3.1)
> | Reference | Topic |
> |---|---|
> | Dinkelbach (1967), *Management Science* 13(7) | Nonlinear fractional programming; basis for the Lemma 10 monotonicity |
> | Horst & Thoai (1999), *JOTA* 103(1) | DC programming and branch-and-bound |
> | Boyd & Vandenberghe (2004), *Convex Optimization* | QP1QC and trust-region problems |
> | Pólik & Terlaky (2007), *SIAM Review* 49(3) | Survey of the S-lemma |
> | Park & Boyd (2017), arXiv:1703.07870 | Heuristics for nonconvex QCQP |
^ref-optim

> [!example] 7. Causal inference and conditional importance (§8)
> | Reference | Topic |
> |---|---|
> | Hooker (2007), *JCGS* 16(3) | Functional ANOVA for dependent variables; evaluating models off the data distribution (§3, §8.2) |
> | Stuart (2010), *Statistical Science* 25(1) | Matching methods; used for the §8.2.1 matching estimator of CMR. Background: [[Propensity Score Matching - Overview]] |
^ref-causal

> [!example] 8. Transparency, recidivism prediction and fairness (§1; §10; §10.2; §11)
> | Reference | Topic |
> |---|---|
> | Rudin (2019), *Nature Machine Intelligence* 1 | Use interpretable models instead of explaining black boxes (§1) |
> | Rudin, Wang & Coker (2019), *Harvard Data Science Review* | Age is highly predictive of COMPAS (§10.1) |
> | Larson, Mattu, Kirchner & Angwin (2016), ProPublica | Analysis of COMPAS; source of the Broward County data |
> | Corbett-Davies, Pierson, Feller & Goel (2016), *Washington Post* | COMPAS bias debate; misdemeanor priors as a proxy |
> | Corbett-Davies, Pierson, Feller, Goel & Huq (2017), KDD | Algorithmic decision making and the cost of fairness; conditional statistical parity |
> | Kamiran, Žliobaitė & Calders (2013), *KAIS* 35(3) | Explainable versus illegal discrimination |
> | Dwork, Hardt, Pitassi, Reingold & Zemel (2012), ITCS | Fairness through awareness |
> | Kleinberg, Mullainathan & Raghavan (2017), ITCS | Inherent trade-offs in fair risk scores |
> | Chouldechova (2017), *Big Data* 5(2) | Disparate impact in recidivism instruments |
> | Nabi & Shpitser (2018), AAAI | Fair inference on outcomes |
> | Monahan & Skeem (2016), *Annu. Rev. Clin. Psych.* 12 | Risk assessment in sentencing |
> | Picard-Fritsche et al. (2017), technical report | Demystifying risk assessment |
> | Spohn (2000), *Criminal Justice* 3 | Racial neutrality in sentencing reform |
> | Blair, Judd & Chapleau (2004), *Psychological Science* 15(10) | Afrocentric features in sentencing |
> | Paternoster & Brame (2008), *Criminology* 46(4) | Race disparities in capital cases |
> | Beckett, Nyrop & Pfingst (2006), *Criminology* 44(1) | Race and drug-delivery arrests |
> | Ramchand, Pacula & Iguchi (2006), *Drug and Alcohol Dependence* 84(3) | Racial differences in marijuana arrests |
> | Lum & Isaac (2016), *Significance* 13(5) | Predictive policing; biased arrest data |
> | U.S. DOJ Civil Rights Division (2016) | Investigation of the Baltimore City Police Department |
^ref-fairness

**Counting check.** The printed list has 73 entries (Altmann et al. 2010 through Zhu et al. 2015, starting on p. 76). The eight tables above hold 17 + 5 + 3 + 14 + 8 + 5 + 2 + 19 = 73 rows, one per printed entry. Five first authors have two entries each: Breiman (2001 *Random forests*; 2001 *Two cultures*), Strobl (2007; 2008), Gregorutti (2015; 2017), Hoeffding (1948; 1963) and Corbett-Davies (2016; 2017). Kurosawa's 1950 film *Rashomon*, which inspired the term (§1, p. 2), is named in the text but is not in the reference list.

## Examples

> [!example] Using the reference map
> To see what MCR was positioned against, read group 1 (single-model RF importance) and group 4 (prior work on sets of good models). To follow up the computation, group 6 lists the optimization background. For fairness context on the case study, group 8 is the paper's whole fairness bibliography.
^ex-using-the-reference-map

## Connections

- The paper's place in the importance literature is discussed in [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- The permutation-importance lineage continues in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], which postdates this paper.

## See Also
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]
- [[Rashomon Sets and Model Class Reliance - Definitions]]
- [[Model Reliance - Permutation Importance as a U-Statistic]]
