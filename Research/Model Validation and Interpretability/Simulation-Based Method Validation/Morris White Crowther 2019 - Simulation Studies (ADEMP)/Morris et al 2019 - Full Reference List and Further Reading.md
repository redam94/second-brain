---
title: "Morris et al 2019 - Full Reference List and Further Reading"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/reference
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "References [1]-[76], pp.27-30 (refs [74]-[76] printed after Figure A1 on p.30); in-text citation pages from §1-§8.2, pp.2-27. arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]"
used_by:
  - "[[Morris et al 2019 - Motivation and Review of Simulation Practice]]"
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]"
aliases:
  - Morris et al 2019 references
  - Simulation-study methodology reading list
---

# Morris et al 2019 - Full Reference List and Further Reading

> [!summary]
> All 76 references of Morris, White & Crowther (2019), transcribed from the arXiv v3 PDF (pp.27-30). For each one the table gives the pages where it is cited in the text and the note in this set that covers that passage. A curated **further-reading** section groups the references that are follow-up reading on simulation-study methodology itself: Monte Carlo error, design, data generation, presentation, protocols and meta-research. The rest are mostly *Statistics in Medicine* Vol. 34 studies used as examples.
^summary-reference-list

## Overview

The paper cites by bracketed number. Elsewhere in this note set references appear as "Author (year) [n]". Use this note to resolve a number to a full citation. Entries are transcribed **as printed**, including the source's own slips: the "applies statistician" typo in [2], the missing initial for Haneuse in [8], the missing volume and pages in [21] and [72] and the missing volume in [32], and the "Monte Carle" spelling the paper uses in the text near [43]. Only line-break artefacts in page ranges were repaired.

> [!note] How the citation pages were found
> In-text citation pages were located by scanning each page of the PDF text layer for bracketed numbers such as "(6)" or "(23, 3)". Equation and list numbers that look like citations (e.g. "depends on (1), (2) and (3)" on p.4, Eq. (1) on p.18, Eq. (2) on p.20) were checked by hand and removed. The "Note" column maps each page to the note that holds that passage. Ref [17] appears only in Table 1 (p.3).
^note-how-citation-pages-were

## Main Content

### Curated further reading on simulation-study methodology

> [!definition] Follow-up reading grouped by topic
> | Topic | Refs | Why read it |
> |---|---|---|
> | **Monte Carlo error** | Koehler, Brown & Haneuse 2009 [8]; Díaz-Emparanza 2002 [11]; Boos & Osborne 2015 [73] | Assessing and reporting MCSE; how small a Monte Carlo study can be; resampling-based MCSEs for complex performance measures (§8, p.26) |
> | **Software for performance measures** | White 2010 *simsum* [12]; Gasparini & White 2018 *rsimsum* [67]; Wicklin 2018 zipper plot in SAS [68] | Implementations of Table 6 and the zip plot |
> | **Design of simulation studies** | Burton et al. 2006 [7]; Skrondal 2000 [23]; Hoaglin & Andrews 1975 [4]; Hauck & Anderson 1984 [5] | Closest predecessor design guide; fractional-factorial designs and meta-models for Monte Carlo experiments; early critiques of reporting |
> | **Generating data** | Ripley 1987 [6]; Morgan 1995 [9]; Chang 2011 [10]; Crowther & Lambert 2013 [14] | General simulation texts; survival data generation |
> | **RNG streams** | Haramoto et al. 2008 [17] | Jump-ahead for $\mathbb{F}_2$-linear generators |
> | **Simulation for power** | Feiveson 2002 [1] | Power by simulation |
> | **Frequentist evaluation of Bayesian methods** | Rubin 1984 [2]; Grieve 2016 [3] | Why fixed-$\theta$ frequency calculations are relevant to Bayesians |
> | **Protocols and good practice** | Smith & Marshall 2011 [13]; Holford et al. 1999 [15]; O'Kelly et al. 2017 [16] | Protocols and best practice for modelling-and-simulation projects |
> | **Presentation** | Rücker & Schwarzer 2014 [66] | Nested-loop plot |
> | **Meta-research on simulation studies** | Langan, Higgins & Simmonds 2017 [75]; Boulesteix, Wilson & Hapfelmeier 2017 [76] | A review of simulation studies (heterogeneity estimators); evidence-based computational statistics and real-data benchmarks (§8.1) |
^def-further-reading

### References [1]-[76] (pp.27-30)

> [!note] Full reference list
> | Ref | Citation (as printed) | Cited on page(s) | Note(s) |
> |---|---|---|---|
> | [1] | Feiveson A. H.. Power by simulation. The Stata Journal. 2002;2(2):107–124. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [2] | Rubin D. B.. Bayesianly justifiable and relevant frequency calculations for the applies statistician. The Annals of Statistics. 1984;12(4):1151–1172. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [3] | Grieve A. P.. Idle thoughts of a ‘well-calibrated’ Bayesian in clinical drug development. Pharmaceutical Statistics. 2016;15(2):96–108. | 2, 6, 26 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]], [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]], [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [4] | Hoaglin D. C., Andrews D. F.. The reporting of computation-based results in statistics. The American Statistician. 1975;29(3):122–126. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [5] | Hauck W. W., Anderson S.. A survey regarding the reporting of simulation studies. The American Statistician. 1984;38(3):214–216. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [6] | Ripley B. D.. Stochastic Simulation. New York: Wiley; 1987. | 2, 5, 9 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]], [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]], [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams\|Coding]] |
> | [7] | Burton A., Altman D. G., Royston P., Holder R. L.. The design of simulation studies in medical statistics. Statistics in Medicine. 2006;25(24):4279–4292. | 2, 17 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [8] | Koehler E., Brown E., Haneuse [S.] [initial missing in source]. On the assessment of Monte Carlo error in simulation-based statistical analyses. The American Statistician. 2009;63:155–162. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [9] | Morgan B. J. T.. Elements of simulation. Boca Raton: Chapman & Hall/CRC; 1995. | 2, 5 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]], [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [10] | Chang M.. Monte Carlo simulation for the pharmaceutical industry : concepts, algorithms, and case studies. CRC Press; 2011. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [11] | Díaz-Emparanza I.. Is a small Monte Carlo analysis a good analysis?. Statistical Papers. 2002;43(4):567–577. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [12] | White I. R.. simsum: Analyses of simulation studies including Monte Carlo error. Stata Journal. 2010;10(3):369–385. | 2, 26 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]], [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [13] | Smith M. K., Marshall A.. Importance of protocols for simulation studies in clinical drug development. Statistical Methods in Medical Research. 2011;20(6):613–622. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [14] | Crowther M. J., Lambert P. C.. Simulating biologically plausible complex survival data. Statistics in Medicine. 2013;32(23):4118–4134. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [15] | Holford N. H. G., Hale M., Ko H. C., et al. Simulation in drug development: good practices. 1999. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [16] | O’Kelly M., Anisimov V., Campbell C., Hamilton S.. Proposed best practice for projects that involve modelling and simulation. Pharmaceutical Statistics. 2017;16(2):107–113. | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice\|Motivation]] |
> | [17] | Haramoto H., Matsumoto M., Nishimura T., Panneton F., L’Ecuyer P.. Efficient jump ahead for F2-linear random number generators. INFORMS Journal on Computing. 2008;20(3):385–390. | 3 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams\|Coding]] |
> | [18] | Kenward M. G., Roger J. H.. Small sample inference for fixed effects from restricted maximum likelihood. Biometrics. 1997;53:983–997. | 4 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [19] | White I. R.. Letter to the Editor: Survival analysis of randomized clinical trials adjusted for patients who switch treatments by M. G. Law and J. M. Kaldor, Statistics in Medicine, 15, 2069–2076 (1996). Statistics in Medicine. 1997;16(22):2619–2620. | 5, 17 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [20] | White I. R., Thompson S. G.. Adjusting for partially missing baseline measurements in randomised trials. Statistics in Medicine. 2005;24(7):993–1007. | 5 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [21] | Hughes R. A., Sterne J. A. C., Tilling K.. Comparison of imputation variance estimators. Statistical Methods in Medical Research. 2014;:n/a+. | 5 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [22] | Morris T. P., White I. R., Royston P.. Tuning multiple imputation by predictive mean matching and local residual draws. BMC Medical Research Methodology. 2014;14(1):75+. | 5 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [23] | Skrondal A.. Design and Analysis of Monte Carlo Experiments: Attacking the Conventional Wisdom. Multivariate Behavioral Research. 2000;35(2):137–167. | 6, 18 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [24] | Graves N., Barnett A. G., Burn E., Cook D.. Smaller clinical trials for decision making; using p-values could be costly. F1000Research. 2018;7:1176+. | 6 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [25] | Senn S.. Methods for assessing difference between groups in change when initial measurement is subject to intra-individual variation. Statistics in Medicine. 1994;13(21):2280–2285. | 6 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [26] | Kuss O.. Statistical methods for meta-analyses including information from studies without any events—add nothing to nothing and succeed nevertheless. Statistics in Medicine. 2015;34(7):1097–1116. | 6, 7, 17 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [27] | Chaurasia A., Harel O.. Partial F-tests with multiply imputed data in the linear regression framework via coefficient of determination. Statistics in Medicine. 2015;34(3):432–443. | 7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [28] | Wu C., Shi X., Cui Y., Ma S.. A penalized robust semiparametric approach for gene–environment interactions. Statistics in Medicine. 2015;34(30):4016–4030. | 7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [29] | Ferrante L., Skrami E., Gesuita R., Cameriere R.. Bayesian calibration for forensic age estimation. Statistics in Medicine. 2015;34(10):1779–1790. | 7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [30] | Zhang Z., Wang C., Troendle J. F.. Optimizing the order of hypotheses in serial testing of multiple endpoints in clinical trials. Statistics in Medicine. 2015;34(9):1467–1482. | 7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [31] | Kahan B. C.. Bias in randomised factorial trials. Statistics in Medicine. 2013;32(26):4540–4549. | 7, 13, 19 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]], [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [32] | Campbell H., Dean C. B.. The consequences of proportional hazards based model selection. Statistics in Medicine. 2014;:1042–1056. | 7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [33] | Robins J. M., Wang N.. Inference for imputation estimators. Biometrika. 2000;87(1):113–124. | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [34] | Reiter J. P.. Multiple imputation when records used for imputation are not used or disseminated for analysis. Biometrika. 2008;95(4):933–946. | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [35] | Hauck W. W., Anderson S., Marcus S. M.. Should we adjust for covariates in nonlinear regression analyses of randomized trials?. Controlled Clinical Trials. 1998;19:249–256. | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [36] | Zhang Z.. Estimating a marginal causal odds ratio subject to confounding. Communications in Statistics - Theory and Methods. 2008;38(3):309–321. | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [37] | Smeden M., Groot J. A. H., Moons K. G. M., et al. No rationale for 1 variable per 10 events criterion for binary logistic regression analysis. BMC Medical Research Methodology. 2016;16(1). | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [38] | Crowther M. J., Look M. P., Riley R. D.. Multilevel mixed effects parametric survival models using adaptive Gauss–Hermite quadrature with application to recurrent events and individual participant data meta-analysis. Statistics in Medicine. 2014;33(22):3844–3858. | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [39] | Royston P., Barthel F. M-S, Parmar M. K. B., Choodari-Oskooei B., Isham V.. Designs for clinical trials with time-to-event outcomes based on stopping guidelines for lack of benefit. Trials. 2011;12(1):81+. | 8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods\|ADEMP]] |
> | [40] | Bartlett J. W.. Combining bootstrapping with multiple imputation. 2016. | 12 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams\|Coding]] |
> | [41] | Rubin D. B.. Inference and missing data. Biometrika. 1976;63:581–592. | 13 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [42] | White Ian R., Carlin John B.. Bias and efficiency of multiple imputation compared with complete-case analysis for missing covariate values.. Statistics in medicine. 2010;29(28):2920–2931. | 14 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [43] | White I. R., Royston P.. Imputing missing covariate values for the Cox model.. Statistics in Medicine. 2009;28(15):1982–1998. | 14, 19 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]], [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [44] | Neyman J.. On the Two Different Aspects of the Representative Method: The Method of Stratified Sampling and the Method of Purposive Selection. Journal of the Royal Statistical Society, Series A. 1934;97(4):558–625. | 15 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [45] | Meng X. L.. Multiple-imputation inferences with uncongenial sources of input. Statistical Science. 1994;9:538–558. | 15 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [46] | Rubin D. B.. Multiple imputation after 18+ years. Journal of the American Statistical Association. 1996;91(434):473–489. | 15 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [47] | Morris T. P.. Rank minimization with a two-step analysis should not replace randomization in clinical trials. Journal of Clinical Epidemiology. 2012;65(7):810–811. | 15 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [48] | Kimani P. K., Todd S., Stallard N.. Estimation after subpopulation selection in adaptive seamless trials. Statistics in Medicine. 2015;34(18):2581–2601. | 16 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [49] | Carreras M., Gutjahr G., Brannath W.. Adaptive seamless designs with interim treatment selection: a case study in oncology. Statistics in Medicine. 2015;34(8):1317–1333. | 16 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [50] | Efron B., Hastie T.. Computer age statistical inference. Cambridge University Press; 2016. | 17 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [51] | Gutman R., Rubin D. B.. Robust estimation of causal effects of binary treatments in unconfounded studies with dichotomous outcomes.. Statistics in medicine. 2013;32(11):1795–1814. | 17 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors\|Performance]] |
> | [52] | Taguri M., Chiba Y.. A principal stratification approach for evaluating natural direct and indirect effects in the presence of treatment-induced intermediate confounding. Statistics in Medicine. 2015;34(1):131–144. | 17 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [53] | Li P., Redden D. T.. Small sample performance of bias-corrected sandwich estimators for cluster-randomized trials with binary outcomes. Statistics in Medicine. 2015;34(2):281–296. | 17 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [54] | Marozzi M.. Multivariate multidistance tests for high-dimensional low sample size case-control studies. Statistics in Medicine. 2015;34(9):1511–1526. | 17 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [55] | Keogh R. H., Morris T. P.. Multiple imputation in Cox regression when there are time-varying effects of covariates. Statistics in Medicine. 2018;37(25):3661–3678. | 17, 25 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]], [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [56] | Morris T. P., Fisher D. J., Kenward M. G., Carpenter J. R.. Meta-analysis of Gaussian individual patient data: two stage or not two stage?. Statistics in Medicine. in-press 2017;. | 17, 25 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]], [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [57] | Cramér H. C.. Mathematical Methods of Statistics. Princeton, NJ: Princeton University Press; 1946. | 18 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [58] | Rao C. R.. Information and the accuracy attainable in the estimation of statistical parameters. Bulletin of the Calcutta Mathematical Society. 1945;37:81–91. | 18 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [59] | Williamson E. J., Forbes A., White I. R.. Variance reduction in randomised trials by inverse probability weighting using the propensity score. Statistics in Medicine. 2014;33(5):721–737. | 18 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks\|n_sim]] |
> | [60] | He X., Whitmore G. A., Loo G. Y., Hochberg M. C., Lee M-L T.. A model for time to fracture with a shock stream superimposed on progressive degradation: the Study of Osteoporotic Fractures. Statistics in Medicine. 2015;34(4):652–663. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [61] | Chen Y., Hong C., Riley R. D.. An alternative pseudolikelihood method for multivariate random-effects meta-analysis. Statistics in Medicine. 2015;34(3):361–380. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [62] | Hsu C. H., Taylor J. M. G., Hu C.. Analysis of accelerated failure time data with dependent censoring using auxiliary variables via nonparametric multiple imputation. Statistics in Medicine. 2015;34(19):2768–2780. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [63] | Alonso A., Milanzi E., Molenberghs G., Buyck C., Bijnens L.. A new modeling approach for quantifying expert opinion in the drug discovery process. Statistics in Medicine. 2015;34(9):1590–1604. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [64] | Seaman S. R., Bartlett J. W., White I. R.. Multiple imputation of missing covariates with non-linear effects and interactions: an evaluation of statistical methods.. BMC Medical Research Methodology. 2012;12(1):46+. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [65] | Lambert P. C., Dickman P. W., Rutherford M. J.. Comparison of different approaches to estimating age standardized net survival.. BMC Medical Research Methodology. 2015;15(1):64+. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [66] | Rücker G., Schwarzer G.. Presenting simulation results in a nested loop plot. BMC Medical Research Methodology. 2014;14(1):129+. | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [67] | Gasparini A., White I. R.. rsimsum: Analysis of simulation studies including monte carlo error2018. R package version 0.3.1. | 21, 26 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]], [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [68] | Wicklin R.. A zipper plot for visualizing coverage probability in simulation studies. 2018. | 21, 23 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots\|Reporting]] |
> | [69] | Austin P. C., Stuart E. A.. Optimal full matching for survival outcomes: a method that merits more widespread use. Statistics in Medicine. 2015;34(30):3949–3967. | 25 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [70] | Thompson J. A., Fielding K. L., Davey C., Aiken A. M., Hargreaves J. R., Hayes R. J.. Bias and inference from misspecified mixed-effect models in stepped wedge trial analysis. Statistics in Medicine. 2017;36(23):3670–3682. | 25 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [71] | Sayers A., Crowther M. J., Judge A., Whitehouse M. R., Blom A. W.. Determining the sample size required to establish whether a medical device is non-inferior to an external benchmark. BMJ Open. 2017;7(8):e015397+. | 25 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [72] | Pham T. M., Carpenter J. R., Morris T. P., Wood A. M., Petersen I.. Population-calibrated multiple imputation for a binary/categorical covariate in categorical regression models. Statistics in Medicine. 2018;. | 25 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [73] | Boos D. D., Osborne J. A.. Assessing Variability of Complex Descriptive Statistics in Monte Carlo Studies Using Resampling Methods. International Statistical Review. 2015;83(2):228–238. | 26 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [74] | Audigier V., White I. R., Jolani S., et al. Multiple imputation for multilevel data with continuous and binary variables. 2018. | 26 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [75] | Langan D., Higgins J. P. T., Simmonds M.. Comparative performance of heterogeneity variance estimators in meta-analysis: a review of simulation studies. Research Synthesis Methods. 2017;8(2):181–198. | 26 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
> | [76] | Boulesteix A. L., Wilson R., Hapfelmeier A.. Towards evidence-based computational statistics: lessons from clinical research on the role and design of real-data benchmark studies. BMC Medical Research Methodology. 2017;17(1). | 26 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits\|Protocols]] |
^ref-full-list

## Examples

> [!example] Resolving a citation
> The performance-measures note says Kimani, Todd & Stallard conditioned bias on each possible selected estimand, and that the paper prefers this, citing [50]. The table resolves [48] to *Stat Med* 34(18):2581-2601 and [50] to Efron & Hastie (2016), *Computer Age Statistical Inference*. See [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]].
^ex-resolving-citation

## Connections

- [[Effective Sample Size and Monte Carlo Standard Error]] — the MCMC counterpart of the Monte Carlo error literature ([8], [11], [73]).
- [[Designing Simulated-Data Experiments]] — the Bayesian-workflow treatment of fake-data simulation; Rubin [2] and Grieve [3] are the paper's bridge to it.
- [[Simulation-Based Calibration - Overview]] — prior-averaged calibration, the Bayesian alternative to fixed-$\theta$ evaluation.
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — a data generator for marketing data, the counterpart of the data-generation references ([6], [9], [14]).

## See Also

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
- [[Morris et al 2019 - Motivation and Review of Simulation Practice#^ref-background-literature]] — how §1 uses the background literature
