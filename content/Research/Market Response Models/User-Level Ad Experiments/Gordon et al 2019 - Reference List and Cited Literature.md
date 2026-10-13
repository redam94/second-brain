---
title: Gordon et al 2019 - Reference List and Cited Literature
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - type/reference
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019), References pp. 43-47 (69 works); in-text citations pp. 1-42 and Online Appendix pp. A-14 to A-16"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]"
used_by:
  - "[[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]"
  - "[[Gordon et al 2019 - Conclusions, Caveats and Related Literature]]"
aliases:
  - Gordon 2019 bibliography
  - Works cited by Gordon Zettelmeyer Bhargava Chapsky
---

# Gordon et al 2019 - Reference List and Cited Literature

> [!summary]
> The paper's reference list (pp. 43-47) has **69 works**. This note lists every one, grouped by the role it plays in the argument. For each work it gives the printed page(s) where it is cited, what it is cited for, and the vault note that discusses that passage. The groups are: industry context and measurement vendors; earlier ad RCTs; within-study (LaLonde-style) comparisons; potential-outcomes foundations; matching, propensity and regression estimators; propensity-score estimation and inference; balance diagnostics; sensitivity to unobservables; and matching applications in marketing and economics. Page numbers are the paper's printed page numbers, which are one less than the PDF page index. Appendix pages are A-n.

^summary-gordon-et-al-2019-reference-list-and-cit

## Overview

Three clusters carry most of the weight:
- **Imbens and co-authors.** Imbens (2004), Imbens & Wooldridge (2009), Imbens & Rubin (2015) and especially Imbens (2015) supply the notation, the stratification algorithm, the STRATREG estimator and the best-practice checklist the authors follow (§3-§6). Imbens (2015) is also the foil: it showed modern methods *can* recover LaLonde's (1986) experimental benchmark.
- **The bootstrap and matching literature.** Abadie & Imbens (2008), Politis & Romano (1994) and Bickel, Götze & van Zwet (1997) justify replacing the joint bootstrap by **subsampling** for PSM (fn. 17).
- **Sensitivity analysis.** Rosenbaum & Rubin (1983a), Imbens (2003) and Ichino, Mealli & Nannicini (2008) are the basis of the §8 simulated-confounder analysis. Murphy & Topel (1990), Altonji, Elder & Taber (2005) and Oster are cited as the related "selection on observables informs selection on unobservables" literature (fn. 23).

## Main Content

### 1. Industry context and measurement vendors (§1, §4)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Benady, D. (2016), "Can Advertising Support A Free Internet?", *The Guardian* | 1 | Advertising as a critical funding source for internet content | [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] |
| Bond, D. (2017), "Advertising agencies squeezed by tech giants", *Financial Times* | 1 | Advertisers routinely access granular data linking exposures, clicks, visits, and online and offline purchases | same |
| Lavrakas, P. (2010), "An Evaluation of Methods Used to Assess the Effectiveness of Advertising on the Internet", IAB report | 1 | Few online campaigns rely on RCTs | same |
| Gluck, M. (2011), "Best Practices for Conducting Online Ad Effectiveness Research", IAB report | 1 | The common view that experimentation is expensive and often unnecessary | same |
| Abraham, M. (2008), "The off-line impact of online ads", *Harvard Business Review* 86(4) | 1, 14 | Example of industry reliance on observational methods | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] |
| comScore (2010), AdEffx Smart Control press release | 1, 13-14 | Vendor using matching/regression methods | same |
| Klein, C. & Wood, L. (2013), "Cross Platform Sales Impact: Cracking The Code On Single Source", Nielsen Catalina Solutions / Time Inc. report | 1, 14 | Vendor single-source observational measurement | same |
| Berkovich, P. & Wood, L. (2016), "Using Single-Source Data to Measure Advertising Effectiveness", Nielsen Discussion Paper 2 | 1, 14 | Vendor single-source observational measurement | same |

### 2. Earlier advertising RCTs and the activity-bias precedent (§1 fn. 2-3, §2.3, §7, §8)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Lewis, R., Rao, J. & Reiley, D. (2011), "Here, There, and Everywhere: Correlated Online Behaviors Can Lead to Overestimates of the Effects of Advertising", WWW 2011 | 1-3, 8, 41 | Coins **activity bias** (user-induced endogeneity, §2.3). In §8, the UA variable mainly explaining exposure is "consistent with" it | [[Activity Bias in Advertising]]; [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] |
| Lewis, R., Rao, J. & Reiley, D. (2015), "Measuring the effects of advertising: The digital frontier", in *Economic Analysis of the Digital Economy* | 1 (fn. 2) | "For a recent review" of digital ad RCTs | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Lewis, R. & Reiley, D. (2014), "Online ads and offline sales", *QME* 12(3) | 1-2 (fn. 2-3) | Ad RCT literature; precedent for using logged-in users to link outcomes | [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] |
| Lewis, R. & Rao, J. (2015), "The unfavorable economics of measuring the returns to advertising", *QJE* 130(4) | 1, 13 | Small effects relative to noise; ROI-based comparison across campaigns (the paper lacks margins to compute ROI) | [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]] |
| Johnson, G., Lewis, R. & Reiley, D. (2016), "Location, Location, Location: Repetition and Proximity Increase Advertising Effectiveness", WP | 1 (fn. 2) | Ad RCT literature | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Johnson, G., Lewis, R. & Reiley, D. (2017), "When Less is More: Data and Power in Advertising Experiments", *Marketing Science* 36(1) | 1 (fn. 2), 31 | Ad RCT literature; cited again with the Table 4 discussion | same |
| Johnson, G., Lewis, R. & Nubbemeyer, E. (2017a), "Ghost Ads: Improving the Economics of Measuring Ad Effectiveness", *JMR* 54(6) | 1 (fn. 2) | Ad RCT literature (ghost-ad design) | [[Predicted Ghost Ads and Ghost Bids Mechanics]] |
| Johnson, G., Lewis, R. & Nubbemeyer, E. (2017b), "The Online Display Ad Effectiveness Funnel & Carryover: Lessons from 432 Field Experiments", WP | 1 (fn. 2), 31 (fn. 21) | Meta-study of 432 Google Display Network experiments, used to benchmark lift magnitudes in fn. 21 | [[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]] |
| Kalyanam, K., McAteer, J., Marek, J., Hodges, J. & Lin, L. (2018), "Cross Channel Effects of Search Engine Advertising on Brick & Mortar Retail Sales", *QME* 16(1) | 1 (fn. 2) | Ad RCT literature | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Sahni, N. (2015), "Effect of Temporal Spacing between Advertising Exposures", *QME* 13(3) | 1 (fn. 2) | Ad RCT literature | same |
| Sahni, N. & Nair, H. (2016), "Native Advertising, Sponsorship Disclosure and Consumer Deception", WP | 1 (fn. 2) | Ad RCT literature | same |
| Goldfarb, A. & Tucker, C. (2011), "Online Display Advertising: Targeting and Obtrusiveness", *Marketing Science* 30(3) | 1 (fn. 2) | Ad RCT literature | same |
| Blake, T., Nosko, C. & Tadelis, S. (2015), "Consumer Heterogeneity and Paid Search Effectiveness", *Econometrica* 83(1) | 1, 3 | Prior experiment-vs-observational comparison in paid search | [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] |

### 3. Within-study comparisons of observational and experimental estimates (§1, fn. 4)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| LaLonde, R. (1986), "Evaluating the Econometric Evaluations of Training Programs with Experimental Data", *AER* 76(4) | 3 | The seminal benchmark: observational estimates "do not replicate" experiments | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature#^def-g19-lalonde]] |
| Arceneaux, K., Gerber, A. & Green, D. (2010), "A Cautionary Note on the Use of Matching...", *Sociological Methods and Research* 39(2) | 3 (fn. 4) | Same comparison for voter mobilization | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Ferraro, P. & Miranda, J. (2014), "The performance of non-experimental designs in the evaluation of environmental programs", *JEBO* 107 | 3 (fn. 4) | Same comparison for water-use reduction | same |
| Ferraro, P. & Miranda, J. (2017), "Panel Data Designs and Estimators as Substitutes for Randomized Controlled Trials...", *JAERE* 4(1) | 3 (fn. 4) | Same, with panel designs | same |

### 4. Potential-outcomes foundations and estimands (§3)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Rubin, D. (1978), "Bayesian inference for causal effects: The role of randomization", *Annals of Statistics* 6 | 10 | Origin of the term **SUTVA** | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^def-g19-po]] |
| Imbens, G. (2004), "Nonparametric Estimation of Average Treatment Effects under Exogeneity: A Review", *REStat* 86(1) | 10 | Source of the §3-§4 exposition | same |
| Imbens, G. & Wooldridge, J. (2009), "Recent Developments in the Econometrics of Program Evaluation", *JEL* 47(1) | 10, 26 (fn. 18), 28 | §3-4 exposition; advice to inspect propensity histograms (fn. 18, quoted p. 43 of that paper); standardized differences | same; [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]] |
| Imbens, G. & Rubin, D. (2015), *Causal Inference for Statistics, Social, and Biomedical Sciences* | Abstract/1, 3, 10, 17, 42 | §3 exposition; the **recursive stratification** algorithm for choosing strata (§4.2); the "improvements" in observational methods (§1, §9) | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] |
| Imbens, G. & Angrist, J. (1994), "Identification and Estimation of Local Average Treatment Effects", *Econometrica* 62(2) | 12 | ATT = ITT / exposure share as an IV result under the exclusion restriction | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^thm-g19-att]] |

### 5. Matching, propensity and regression estimators (§4.1-4.2)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Rosenbaum, P. & Rubin, D. (1983b), "The Central Role of the Propensity Score...", *Biometrika* 70 | 15, 26 | Strong ignorability; unconfoundedness given $X$ implies it given $e(X)$ | [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators#^def-g19-ignorability]] |
| Rosenbaum, P. & Rubin, D. (1985), "Constructing a Control Group Using Multivariate Matched Sampling...", *American Statistician* 39 | 16 | Mahalanobis-distance matching on all of $X$ | same |
| Gu, X. & Rosenbaum, P. (1993), "Comparison of multivariate matching methods: structures, distances, and algorithms", *JCGS* 2 | 16 | Covariate-distance matching works poorly with many covariates | same |
| Dehejia, R. & Wahba, S. (2002), "Propensity Score Matching Methods for Non-Experimental Causal Studies", *REStat* 84(1) | 16 | PSM as the most common matching approach | same; [[Propensity Score Matching - Overview]] |
| Caliendo, M. & Kopeinig, S. (2008), "Some Practical Guidance for the Implementation of Propensity Score Matching", *J. Economic Surveys* 22(1) | 16 | Same | same |
| Stuart, E. (2010), "Matching Methods for Causal Inference: A Review and a Look Forward", *Statistical Science* 25(1) | 16 | Same | same |
| Rubin, D. (2001), "Using propensity scores to help design observational studies: application to the tobacco litigation", *HSORM* 2 | 16 | Matching on the **log-odds** of the propensity score "can improve estimation" | same |
| Cochran, W. (1968), "The Effectiveness of Adjustment by Subclassification in Removing Bias...", *Biometrics* 24(2) | 17 | The conventional $J = 5$ equal-sized strata | same |
| Eckles, D. & Bakshy, E. (2017), "Bias and High-Dimensional Adjustment in Observational Studies of Peer Effects", WP | 17-18 | Number of strata growing with $n$; advocates STRATREG | same |
| Imbens, G. (2015), "Matching Methods in Practice: Three Examples", *J. Human Resources* 50(2) | Abstract/1, 3, 10, 17-18, 23, 25, 42 | Shows modern methods recover the LaLonde benchmark; STRATREG; best-practice checklist followed in §6 | same; [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Hirano, K., Imbens, G. & Ridder, G. (2003), "Efficient Estimation of Average Treatment Effects Using the Estimated Propensity Score", *Econometrica* 71(4) | 18, 24 (fn. 16) | Inverse-probability weighting behind IPWRA; nonparametric propensity models | same |
| Robins, J. & Ritov, Y. (1997), "Towards a Curse of Dimensionality Appropriate (CODA) Asymptotic Theory...", *Statistics in Medicine* 16 | 18 | The **doubly robust** property of IPWRA | same |
| Wooldridge, J. (2007), "Inverse probability weighted estimation for general missing data problems", *J. Econometrics* 141 | 18 | IPWRA estimated jointly by two-step GMM | same |
| Imai, K. & Ratkovic, M. (2014), "Covariate Balancing Propensity Score", *JRSS-B* 76(1) | 13 (fn. 12) | Newer methods left to future work | [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] |
| Zubizarreta, J. (2012), "Using Mixed Integer Programming for Matching...", *JASA* 107 | 13 (fn. 12) | Same (operations-research matching) | same |
| Zubizarreta, J. (2015), "Stable weights that balance covariates...", *JASA* 110(511) | 13 (fn. 12) | Same | same |
| Athey, S., Imbens, G. & Wager, S. (forthcoming), "Approximate Residual Balancing", *JRSS-B* | 13 (fn. 12) | Same (machine-learning balancing) | same; [[DML Estimators for ATE and the Interactive Model]] |

### 6. Propensity estimation and inference (§6.2)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Tibshirani, R. (1996), "Regression Shrinkage and Selection via the Lasso", *JRSS-B* 58(1) | 24 | The LASSO | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]] |
| Belloni, A., Chen, D., Chernozhukov, V. & Hansen, C. (2012), "Sparse Models and Methods for Optimal Instruments...", *Econometrica* 80(6) | 24-25 | The iterative, data-dependent LASSO penalty used for variable selection (bootstrap Step 1) | same, [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^alg-g19-bootstrap]] |
| McCaffrey, D., Ridgeway, G. & Morral, A. (2004), "Propensity Score Estimation with Boosted Regression...", *Psychological Methods* 9(4) | 24 (fn. 16) | ML alternatives for the propensity model | same |
| Westreich, D., Lessler, J. & Funk, M. (2010), "Propensity score estimation: machine learning and classification methods as alternatives to logistic regression", *J. Clinical Epidemiology* 63(8) | 24 (fn. 16) | Same | same |
| Pham, T. & Shen, Y. (2017), "A Deep Causal Inference Approach to Measuring the Effects of Forming Group Loans...", WP (arXiv 1706.02795) | 24 (fn. 16) | Deep-learning propensity models | same |
| Abadie, A. & Imbens, G. (2008), "On the Failure of the Bootstrap for Matching Estimators", *Econometrica* 76(6) | 25 (fn. 17) | The bootstrap is invalid for matching | same |
| Politis, D. & Romano, J. (1994), "Large Sample Confidence Regions Based on Subsamples under Minimal Assumptions", *Annals of Statistics* 22(4) | 25 (fn. 17) | **Subsampling** is valid for matching, so it is used for PSM | same |
| Bickel, P., Götze, F. & van Zwet, W. (1997), "Resampling Fewer than n observations: Gains, Losses, and Remedies for Losses", *Statistica Sinica* 7 | 25 (fn. 17) | The m-out-of-n bootstrap as a valid alternative | same |

### 7. Balance diagnostics (§6.3)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Gelman, A. & Hill, J. (2007), *Data Analysis Using Regression and Multilevel/Hierarchical Models* | 28 | Recommendation to examine standardized differences | [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics#^def-g19-stddiff]] |
| Stuart, E. & Rubin, D. (2007), "Matching methods for causal inference: Designing observational studies", in *Best Practices in Quantitative Methods* | 28 | The **0.25** standardized-difference threshold | same; [[Covariate Balance Diagnostics]] |

### 8. Sensitivity to unobservables (§1, §8, Appendix)

| Reference | Pages | Use in the paper | Vault note |
|---|---|---|---|
| Rosenbaum, P. & Rubin, D. (1983a), "Assessing Sensitivity to an Unobserved Binary Covariate in an Observational Study with Binary Outcome", *JRSS-B* 45(2) | 3, 38, A-14 | Base model for the simulated binary confounder (eq. A1-A5); fix $(\alpha,\delta)$ and estimate the rest | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^alg-g19-sens]] |
| Imbens, G. (2003), "Sensitivity to Exogeneity Assumptions in Program Evaluation", *AER* 93(2) | A-14, A-16 | Same fixed-parameter strategy; expressing U's strength as **relative variation explained** in treatment and outcome | [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio#^def-g19-relr2]] |
| Ichino, A., Mealli, F. & Nannicini, T. (2008), "From Temporary Help Jobs to Permanent Employment: What can we Learn from Matching Estimators and Their Sensitivity?", *J. Applied Econometrics* 23 | 3, 38, A-14-A-15 | Simulating U through the cell probabilities $p_{jk}$ | same |
| Murphy, K. & Topel, R. (1990), "Efficiency Wages Reconsidered: Theory and Evidence", in *Advances in the Theory and Measurement of Unemployment* | 38 (fn. 23) | Related literature: selection on X informs selection on U | same; [[Sensitivity Analysis in Observational Studies]] |
| Altonji, J., Elder, T. & Taber, C. (2005), "Selection on Observed and Unobserved Variables: Assessing the Effectiveness of Catholic Schools", *JPE* 113(1) | 38 (fn. 23) | Same | same |
| Oster, E. (forthcoming), "Unobservable Selection and Coefficient Stability: Theory and Evidence", *JBES* | 38 (fn. 23) | Same | same |

### 9. Matching applications in marketing and economics (§4 intro, p. 13)

All six are cited together as examples of "matching methods" in "related academic work". See [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]].

| Reference | Application named |
|---|---|
| Draganska, M., Hartmann, W. & Stanglein, G. (2014), *JMR* 51 | Internet vs TV ads for brand building |
| Kumar, A., Bezawada, R., Rishika, R., Janakiraman, R. & Kannan, P. (2016), *J. Marketing* 80(1) | Firm-generated social-media content and customer metrics |
| Bronnenberg, B., Dubé, J.-P. & Mela, C. (2010), *JMR* 47(6) | Whether DVR access affects sales of advertised products |
| Rubin, D. & Waterman, R. (2007, printed), *Statistical Science* 21(2) | Pharmaceutical detailing |
| Cooper, M., Gulen, H. & Rau, P. (2005), *J. Finance* 60(6) | Mutual-fund name changes and inflows |
| Ellickson, P., Collins, R., Hambarsoomians, K. & McCaffrey, D. (2005), *Addiction* 100(2) | Alcohol advertising and adolescent drinking |

### Count check

Groups 1-9 contain 8 + 13 + 4 + 5 + 17 + 8 + 2 + 6 + 6 = **69** entries. This equals the number of entries on pp. 43-47. Every entry was matched to at least one in-text citation by searching the extracted text.

### Bibliographic slips in the printed list (reader's notes)

These are visible in the raw list. They are noted here so that nobody copies them.
- **Gu & Rosenbaum (1993).** The journal and title fields are swapped. The entry reads "Journal of Computational and Graphical Statistics" as the title and the actual title as the venue.
- **Bickel, Gotze & van Zweet (1997).** The co-authors are F. Götze and W. van Zwet, and the journal is printed "Statistica Sinicia" for *Statistica Sinica*.
- **Ichino, Fabrizia & Nannicini (2008).** The second author is Fabrizia **Mealli**. "Fabrizia" is her given name, printed as a surname both in the list and in the text (p. 3).
- **Rubin & Waterman (2007).** The entry gives *Statistical Science* 21(2), which is the 2006 volume.
- **Rosenbaum & Rubin (1983b).** The journal is printed as "Biometrica" for *Biometrika*. "Overestimtes" (Lewis, Rao & Reiley 2011), "Subclassifcation" (Cochran) and "Eciency" (Murphy & Topel, a ligature lost in the PDF) are typos.

^ref-g19-bibliography

## Examples

> [!example] Using the bibliography as a reading path (generic)
> A team that wants to rebuild this paper's toolkit for its own exposed-vs-unexposed analyses could read in this order. Start with Imbens (2015) for the workflow, then Imbens & Rubin (2015, ch. on stratification) for the strata algorithm. Next, Belloni et al. (2012) for LASSO propensity selection and Abadie & Imbens (2008) plus Politis & Romano (1994) for why matching needs subsampling. Then Stuart & Rubin (2007) for balance thresholds. Finish with Rosenbaum & Rubin (1983a), Imbens (2003) and Ichino et al. (2008) for the sensitivity analysis. The paper's own lesson is that passing all these checks still did not guarantee the right answer.

^exa-g19-bibliography-1

## Connections

- [[Gordon et al 2019 - Conclusions, Caveats and Related Literature]] discusses the key works (LaLonde, Imbens, Lewis-Rao-Reiley, Blake-Nosko-Tadelis) in prose.
- [[Lewis Rao 2015 - Reference List and Cited Literature]] is the sibling bibliography for the other user-level ad-experiment source in this folder.
- [[Sensitivity Analysis in Observational Studies]], [[Propensity Score Matching - Overview]], [[Covariate Balance Diagnostics]] and [[Common Support and Overlap]] are vault concept notes for the methods literature cited in groups 5-8.

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] — source overview and Source Map.
- [[User-Level Ad Experiments - Overview]] — cluster entry point.
