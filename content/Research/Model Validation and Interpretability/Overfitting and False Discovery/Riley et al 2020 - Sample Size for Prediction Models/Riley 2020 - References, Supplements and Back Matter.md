---
title: "Riley 2020 - References, Supplements and Back Matter"
tags:
  - source/ingested
  - topic/model-validation
  - topic/sample-size
  - topic/prediction-models
  - type/reference
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, p. 1 (introduction pointer to supplementary S1), p. 4 (Box 1 supplement pointers), p. 6 (Contributors, Funding, Competing interests, Provenance, Patient and public involvement, Dissemination, transparency statement), pp. 6-8 (References 1-78), p. 8 ('Accepted: 19 12 2019')"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley et al 2020 - Sample Size for Prediction Models - Overview]]"
used_by:
  - "[[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]"
  - "[[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]"
aliases:
  - Riley 2020 reference list
  - Riley BMJ 2020 bibliography
  - Riley 2020 supplementary materials S1-S6
---

# Riley 2020 - References, Supplements and Back Matter

> [!summary]
> This note holds the parts of Riley et al. (2020) that carry no formulas but are needed to trace claims. It covers (1) the supplementary materials S1-S6 and where the paper sends readers to each (none is in the ingested PDF), (2) the back matter: contributors, funding, competing interests, patient involvement, and the accepted (19 Dec 2019) vs published (18 Mar 2020) dates, and (3) the full reference list, refs 1-78, itemised with journal, year, volume and pages, so that the bare reference numbers in the other notes can be resolved.
^summary

## Overview

The other notes in this set cite the paper's references by number (e.g. "refs 13-16", "ref 26", "refs 75-78"). This note resolves those numbers. The BMJ uses Vancouver numbering, so refs are numbered in order of first citation. The "cluster" column below is a navigation aid inferred from that order and from the citation points checked in the text. It is not a label the paper uses.

## Main Content

### Publication record

| Field | Value (source location) |
|---|---|
| Journal | BMJ 2020;368:m441, doi 10.1136/bmj.m441, section "Research Methods & Reporting" (header, every page) |
| Accepted | 19 December 2019 ("Accepted: 19 12 2019", p. 8) |
| Published | 18 March 2020 (page header "Published 18 March 2020") |
| Provenance | Not commissioned; peer reviewed (p. 6) |
| Correspondence | R D Riley, Keele University (p. 1 footer) |
| Repository copy | The ingested PDF is the University of Manchester Research Explorer copy of the final published version: a one-page cover sheet followed by BMJ pp. 1-12 |
| Authors | R D Riley, J Ensor, K I E Snell (Keele, Centre for Prognosis Research); F E Harrell Jr (Vanderbilt); G P Martin (Manchester); J B Reitsma, K G M Moons (UMC Utrecht, Julius Center); G Collins (Oxford, Centre for Statistics in Medicine); M van Smeden (Utrecht / Oxford / Leiden) (p. 1) |

### Back matter (p. 6), paraphrased

- **Contributors.** RDR and MvS led the methodology behind the article, with contributions from all authors. RDR wrote the first and later drafts, with revisions from all authors. **JE led development of the `pmsampsize` packages** in Stata and R. RDR is guarantor.
- **Funding.** KGMM: Netherlands Organisation for Scientific Research (projects 9120.8004 and 918.10.615). FEH: CTSA award UL1 TR002243 from the US National Center for Advancing Translational Sciences. GC: NIHR Biomedical Research Centre, Oxford. KIES: NIHR School for Primary Care Research. The paper carries the standard disclaimers that the views are the authors' own and not those of the funders.
- **Competing interests.** None declared, under the BMJ policy.
- **Patient and public involvement.** Patients or the public were not involved in design, conduct, reporting or dissemination. The authors plan to share the sample-size calculations with their Patient and Public Involvement and Engagement team when they are applied in new projects.
- **Transparency statement.** The lead author affirms the manuscript is an honest, accurate and transparent account (standard BMJ declaration).

### Supplementary materials S1-S6: what each is cited for

None of the supplements is in the ingested PDF. The table records where the main text or Box 1 points to each one.

| Supplement | Cited at | Stated content / role |
|---|---|---|
| **S1** | Introduction, p. 1: "Supplementary material S1 shows examples of regression equations." Also Box 1, **C1** (p. 4): intercept precision for continuous outcomes, "see supplementary material 1" | Examples of fitted prediction (regression) equations. The paragraph citing S1 names linear, logistic and proportional-hazards regression, so S1 presumably illustrates those (inference, not stated). Per Box 1 it also holds the continuous-outcome intercept-precision criterion. |
| **S2** | Step 1, p. 2: continuous outcome needs the anticipated mean, variance and $R^2$ ("see supplementary material S2 for details", ref 16). Box 1 **C2**: residual variance ("see supplementary material 2") | Continuous-outcome precision details (mean or intercept, and residual variance) |
| **S3** | Step 2, p. 3: "Supplementary material S3 shows that to target a less than 10% multiplicative error in the estimated residual standard deviation, the required sample size is simply 234+P" | Derivation of the continuous residual-SD criterion |
| **S4** | Step 3, p. 3: continuous example ($P=30$, $R^2=0.7$, $n=206$), "see supplementary material S4 for full calculation" | Full shrinkage calculation for the continuous-outcome example |
| **S5** | Step 3, p. 3: "Supplementary material S5 shows the calculation of max(R2cs)". Also Example 1, p. 4 (max($R^2_{cs}$) = 0.33 at prevalence 0.05) | Derivation of max($R^2_{cs}$) for binary outcomes |
| **S6** | Step 4, p. 4: optimism "calculations are shown in supplementary material S6 for continuous outcomes and in figure 5 for binary and time-to-event outcomes" | Continuous-outcome optimism (Nagelkerke $R^2$) calculation |

The intro uses S1 for equation examples. Box 1 then sends C1 to "supplementary material 1" and C2 to "supplementary material 2", while the Step 1 text sends the same continuous-outcome details to S2 and the Step 2 text sends the residual-SD criterion to S3. This is the S1/S2 vs S2/S3 mismatch flagged in [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]. Each row gives only what the pointing sentence says. The supplements' actual contents are not otherwise known from the PDF.

### Reference list (refs 1-78, pp. 6-8)

Format: first author(s), short title, journal year;volume:pages. "et al" stands for further authors.

| # | Reference | Cluster (inferred) |
|---|---|---|
| 1 | Riley RD, van der Windt D, Croft P et al (eds). *Prognosis Research in Healthcare: Concepts, Methods and Impact*. OUP, 2019 | Intro: prediction models |
| 2 | Steyerberg EW, Moons KG, van der Windt DA et al (PROGRESS Group). PROGRESS 3: prognostic model research. PLoS Med 2013;10:e1001381 | Intro |
| 3 | Steyerberg EW. *Clinical Prediction Models: A Practical Approach to Development, Validation, and Updating*. Springer, 2009 | Intro |
| 4 | Wells PS, Anderson DR, Rodger M et al. Simple clinical model for pulmonary embolism probability (SimpliRED D-dimer). Thromb Haemost 2000;83:416-20 | Intro: Wells score |
| 5 | Wells PS, Anderson DR, Bormanis J et al. Pretest probability of deep-vein thrombosis. Lancet 1997;350:1795-8 | Intro: Wells score |
| 6 | Anderson KM, Odell PM, Wilson PW, Kannel WB. Cardiovascular disease risk profiles. Am Heart J 1991;121:293-8 | Intro: QRISK-type models |
| 7 | Hippisley-Cox J, Coupland C, Brindle P. Development and validation of QRISK3. BMJ 2017;357:j2099 | Intro: QRISK |
| 8 | Haybittle JL, Blamey RW, Elston CW et al. A prognostic index in primary breast cancer. Br J Cancer 1982;45:361-6 | Intro: Nottingham index |
| 9 | Galea MH, Blamey RW, Elston CE, Ellis IO. The Nottingham Prognostic Index in primary breast cancer. Breast Cancer Res Treat 1992;22:207-19 | Intro: Nottingham index |
| 10 | Harrell FE Jr. *Regression Modeling Strategies*, 2nd ed. Springer, 2015 | Intro; also cited for effective sample size, the EPP counter-proposals, residual-SD precision, Nagelkerke $R^2$, data reduction and model building |
| 11 | Whittle R, Royle KL, Jordan KP et al. Prognosis research should measure time-varying predictors at their intended moment of use. Diagn Progn Res 2017;1:1 | Intro: moment of prediction |
| 12 | Moons KG, Altman DG, Reitsma JB et al. TRIPOD: explanation and elaboration. Ann Intern Med 2015;162:W1-73 | Intro: development sample size unclear |
| 13 | **van Smeden M, de Groot JA, Moons KG et al. No rationale for 1 variable per 10 events criterion for binary logistic regression analysis. BMC Med Res Methodol 2016;16:163** | Core methodology |
| 14 | **van Smeden M, Moons KG, de Groot JA et al. Sample size for binary logistic prediction models: beyond events per variable criteria. Stat Methods Med Res 2019;28:2455-74** | Core methodology (MAPE formula, Step 2) |
| 15 | **Riley RD, Snell KI, Ensor J et al. Minimum sample size for developing a multivariable prediction model: Part II - binary and time-to-event outcomes. Stat Med 2019;38:1276-96** | Core methodology (B and T criteria) |
| 16 | **Riley RD, Snell KIE, Ensor J et al. Minimum sample size for developing a multivariable prediction model: Part I - continuous outcomes. Stat Med 2019;38:1262-75** | Core methodology (C criteria) |
| 17 | Courvoisier DS, Combescure C, Agoritsas T et al. Performance of logistic regression modeling: beyond the number of events per variable. J Clin Epidemiol 2011;64:993-1000 | EPV debate |
| 18 | de Jong VMT, Eijkemans MJC, van Calster B et al. Sample size and predictive performance of multinomial logistic prediction models. Stat Med 2019;38:1601-19 | EPV debate |
| 19 | Peduzzi P, Concato J, Feinstein AR, Holford TR. EPV in proportional hazards regression II: accuracy and precision of estimates. J Clin Epidemiol 1995;48:1503-10 | 1990s origin of 10 EPV |
| 20 | Peduzzi P, Concato J, Kemper E et al. A simulation study of the number of events per variable in logistic regression. J Clin Epidemiol 1996;49:1373-9 | 1990s origin of 10 EPV |
| 21 | Concato J, Peduzzi P, Holford TR, Feinstein AR. EPV in proportional hazards analysis I: background, goals and strategy. J Clin Epidemiol 1995;48:1495-501 | 1990s origin of 10 EPV |
| 22 | Vittinghoff E, McCulloch CE. Relaxing the rule of ten events per variable. Am J Epidemiol 2007;165:710-8 | Counter-proposals (below 10) |
| 23 | Ogundimu EO, Altman DG, Collins GS. Adequate sample size is not simply related to EPV. J Clin Epidemiol 2016;76:175-82 | Counter-proposals |
| 24 | Austin PC, Steyerberg EW. EPV and strategies for estimating out-of-sample validity of logistic models. Stat Methods Med Res 2017;26:796-808 | Counter-proposals |
| 25 | Wynants L, Bouwmeester W, Moons KG et al. Sample size and EPV in clustered data. J Clin Epidemiol 2015;68:1406-14 | Counter-proposals |
| 26 | van der Ploeg T, Austin PC, Steyerberg EW. Modern modelling techniques are data hungry. BMC Med Res Methodol 2014;14:137 | Counter-proposals; ML may need >10x EPP and can be unstable even above 200 EPP |
| 27 | Austin PC, Steyerberg EW. Subjects per variable required in linear regression. J Clin Epidemiol 2015;68:627-36 | 2-per-predictor continuous rule |
| 28 | Harrell FE Jr, Lee KL, Mark DB. Multivariable prognostic models: developing, evaluating, reducing errors. Stat Med 1996;15:361-87 | Overfitting definition (Step 3) |
| 29 | Pavlou M, Ambler G, Seaman SR et al. More accurate risk prediction with few events. BMJ 2015;351:h3868 | Shrinkage / penalisation |
| 30 | Van Houwelingen JC. Shrinkage and penalized likelihood to improve predictive accuracy. Stat Neerl 2001;55:17-34 | Shrinkage; imprecise shrinkage estimates |
| 31 | Van Houwelingen JC, Le Cessie S. Predictive value of statistical models. Stat Med 1990;9:1303-25 | Shrinkage |
| 32 | Copas JB. Regression, prediction and shrinkage. J R Stat Soc B 1983;45:311-54 | Shrinkage |
| 33 | Tibshirani R. Regression shrinkage and selection via the lasso. J R Stat Soc B 1996;58:267-88 | Shrinkage / lasso |
| 34 | Copas JB. Using regression models for prediction: shrinkage and regression to the mean. Stat Methods Med Res 1997;6:167-83 | Shrinkage |
| 35 | Cox DR, Snell EJ. *The Analysis of Binary Data*, 2nd ed. Chapman and Hall, 1989 | $R^2_{cs}$ definition |
| 36 | Debray TP, Damen JA, Snell KI et al. Systematic review and meta-analysis of prediction model performance. BMJ 2017;356:i6460 | Choosing $R^2_{cs}$ from published models |
| 37 | Wessler BS, Paulus J, Lundquist CM et al. Tufts PACE Clinical Predictive Model Registry 1990-2015. Diagn Progn Res 2017;1:20 | Choosing $R^2_{cs}$ |
| 38 | Nagelkerke N. A general definition of the coefficient of determination. Biometrika 1991;78:691-2 | Nagelkerke $R^2$ |
| 39 | McFadden D. Conditional logit analysis of qualitative choice behavior. In Zarembka P (ed), *Frontiers in Econometrics*. Academic Press, 1974:104-42 | Alternative $R^2$ measures |
| 40 | O'Quigley J, Xu R, Stare J. Explained randomness in proportional hazards models. Stat Med 2005;24:479-89 | Alternative $R^2$ measures |
| 41 | Royston P. Explained variation for survival models. Stata J 2006;6:83-96 | Alternative $R^2$ measures |
| 42 | Royston P, Sauerbrei W. A new measure of prognostic separation in survival data. Stat Med 2004;23:723-48 | Alternative $R^2$ measures |
| 43 | North RA, McCowan LM, Dekker GA et al. Clinical risk prediction for pre-eclampsia in nulliparous women. BMJ 2011;342:d1875 | Example 1 |
| 44 | Riley RD, Moons KGM, Snell KIE et al. Systematic review and meta-analysis of prognostic factor studies. BMJ 2019;364:k4597 | Applied examples |
| 45 | Ensor J, Riley RD, Moore D et al. Systematic review of prognostic models for recurrent VTE. BMJ Open 2016;6:e011190 | Example 2 |
| 46 | Ensor J, Riley RD, Jowett S et al (PIT-STOP group). Prediction of VTE recurrence after first unprovoked VTE. Health Technol Assess 2016;20:i-xxxiii, 1-190 | Example 2 inputs |
| 47 | Hudda MT, Fewtrell MS, Haroun D et al. Prediction model for fat mass in children and adolescents (IPD meta-analysis). BMJ 2019;366:l4293 | Example 3 |
| 48 | Maxwell SE, Kelley K, Rausch JR. Sample size planning for power and accuracy in parameter estimation. Annu Rev Psychol 2008;59:537-63 | Key subgroups / predictor-effect precision |
| 49 | Hsieh FY, Lavori PW, Cohen HJ, Feussner JR. Variance inflation factors for sample-size calculation. Eval Health Prof 2003;26:239-57 | Key subgroups (binary/TTE) |
| 50 | Hsieh FY, Lavori PW. Sample size for Cox regression with nonbinary covariates. Control Clin Trials 2000;21:552-60 | Key subgroups (binary/TTE) |
| 51 | Schmoor C, Sauerbrei W, Schumacher M. Sample size for evaluating prognostic factors in survival analysis. Stat Med 2000;19:441-52 | Key subgroups (binary/TTE) |
| 52 | McClelland GH. Increasing statistical power without increasing sample size. Am Psychol 2000;55:963-4 | Key subgroups (continuous) |
| 53 | Hsieh FY, Bloch DA, Larsen MD. Simple sample size calculation for linear and logistic regression. Stat Med 1998;17:1623-34 | Key subgroups (continuous) |
| 54 | Kelley K, Maxwell SE. Sample size for multiple regression: accurate, not simply significant. Psychol Methods 2003;8:305-21 | Key subgroups (continuous) |
| 55 | Kelley K. Sample size for the coefficient of variation (AIPE). Behav Res Methods 2007;39:755-66 | Key subgroups (continuous) |
| 56 | Greenland S, Mansournia MA, Altman DG. Sparse data bias: a problem hiding in plain sight. BMJ 2016;352:i1981 | Sparse-data bias |
| 57 | Riley RD, Ensor J, Snell KI et al. External validation using big datasets from e-health records or IPD meta-analysis. BMJ 2016;353:i3140 | Existing dataset: further data |
| 58 | Debray TPA, Riley RD, Rovers MM et al. IPD meta-analyses of diagnostic and prognostic modelling studies. PLoS Med 2015;12:e1001886 | Existing dataset: further data |
| 59 | Zou H, Hastie T. Regularization and variable selection via the elastic net. J R Stat Soc B 2005;67:301-20 | Variable selection |
| 60 | Heinze G, Wallisch C, Dunkler D. Variable selection: review and recommendations. Biom J 2018;60:431-49 | Variable selection |
| 61 | Sauerbrei W, Schumacher M. Bootstrap resampling procedure for model building (Cox). Stat Med 1992;11:2093-109 | Selection instability |
| 62 | Sauerbrei W, Boulesteix AL, Binder H. Stability of multivariable models from low- and high-dimensional data. J Biopharm Stat 2011;21:1206-31 | Selection instability |
| 63 | Royston P, Sauerbrei W. Stability of multivariable fractional polynomial models: bootstrap investigation. Stat Med 2003;22:639-59 | Selection instability |
| 64 | Hastie T, Tibshirani R, Friedman J. *The Elements of Statistical Learning*, 2nd ed. Springer, 2009 | Machine learning |
| 65 | Steyerberg EW, van der Ploeg T, Van Calster B. Risk prediction with machine learning and regression methods. Biom J 2014;56:601-6 | ML vs regression |
| 66 | Steyerberg EW, Borsboom GJ, van Houwelingen HC et al. Validation and updating of predictive logistic models: sample size and shrinkage. Stat Med 2004;23:2567-86 | Model updating |
| 67 | Vergouwe Y, Nieboer D, Oostenbrink R et al. Closed testing procedure for updating prediction models. Stat Med 2017;36:4529-39 | Model updating |
| 68 | Wolff RF, Moons KGM, Riley RD et al (PROBAST Group). PROBAST. Ann Intern Med 2019;170:51-8 | Conclusion: quality, representativeness |
| 69 | Moons KGM, Wolff RF, Riley RD et al. PROBAST: explanation and elaboration. Ann Intern Med 2019;170:W1-33 | Conclusion |
| 70 | Steyerberg EW, Harrell FE Jr, Borsboom GJ et al. Internal validation of predictive models. J Clin Epidemiol 2001;54:774-81 | Conclusion: bootstrap internal validation |
| 71 | Steyerberg EW, Harrell FE Jr. Prediction models need internal, internal-external and external validation. J Clin Epidemiol 2016;69:245-7 | Conclusion |
| 72 | Debray TP, Koffijberg H, Lu D et al. Incorporating published univariable associations. BMC Med Res Methodol 2012;12:121 | Conclusion: external information |
| 73 | Debray TP, Koffijberg H, Nieboer D et al. Meta-analysis and aggregation of multiple published prediction models. Stat Med 2014;33:2341-62 | Conclusion: external information |
| 74 | Debray TP, Koffijberg H, Vergouwe Y et al. Aggregating published prediction models with IPD. Stat Med 2012;31:2697-712 | Conclusion: external information |
| 75 | **Collins GS, Ogundimu EO, Altman DG. Sample size for external validation of a multivariable prognostic model: a resampling study. Stat Med 2016;35:214-26** | External-validation sample size |
| 76 | **Van Calster B, Nieboer D, Vergouwe Y et al. A calibration hierarchy for risk models was defined: from utopia to empirical data. J Clin Epidemiol 2016;74:167-76** | External-validation sample size |
| 77 | **Jinks RC, Royston P, Parmar MK. Discrimination-based sample size calculations for multivariable prognostic models for time-to-event data. BMC Med Res Methodol 2015;15:82** | External-validation sample size |
| 78 | **Vergouwe Y, Steyerberg EW, Eijkemans MJ, Habbema JD. Substantial effective sample sizes required for external validation of predictive logistic models. J Clin Epidemiol 2005;58:475-83** | External-validation sample size |
^tab-refs

Bold rows are the core methodology (13-16) and the external-validation approaches (75-78) that the paper sends readers to but does not develop.

## Examples

> [!example] Resolving a citation in another note
> [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] paraphrases the paper's p. 6 claim that machine learning "might show instability and a high optimism even with more than 200 EPP" (verbatim from the paper), citing ref 26. The table resolves this to van der Ploeg, Austin & Steyerberg (2014), *Modern modelling techniques are data hungry*, BMC Med Res Methodol 14:137.
^ex-resolve

## Connections

- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]: Source Map entry for back matter and references.
- [[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]: uses refs 13-27 and supplement S1.
- [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]]: uses refs 35-42.
- [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]: uses refs 48-78.
- Selection instability (refs 61-63) is the topic of [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- Bootstrap internal validation (refs 70-71) relates to [[Cross Validation Checking]].

## See Also

- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]: the supplement-citation mismatch, and the `pmsampsize` software that JE led
- [[Power Analysis and Sample Size]]
