---
title: "Index: Strobl et al 2008 - Conditional Variable Importance"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
parent: "[[../_Index|Feature Importance and Stability]]"
date_updated: 2026-10-13
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, whole paper (§1-§5, Figs 1-4); index of the notes in this folder"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: index
depends_on:
  - "[[Strobl et al 2008 - Conditional Variable Importance - Overview]]"
used_by: []
aliases:
  - Strobl 2008 Conditional Importance Index
concept_count: 9
---

# Strobl et al 2008 - Conditional Variable Importance

> [!abstract] Routing Summary
> This folder fully captures Strobl, Boulesteix, Kneib, Augustin & Zeileis (2008), "Conditional variable importance for random forests" (BMC Bioinformatics 9:307). It has 9 notes on why random-forest permutation importance overstates correlated predictors and on the conditional permutation importance that reduces, but does not remove, the problem.
> - Need the paper in one page, plus the section-to-note map? → [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
> - Need the marginal vs conditional distinction, or the hospital spurious-correlation example? → [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]]
> - Need to know why trees pick correlated proxies, how `mtry` matters, or the 12-variable simulation design (Table 1, Fig. 1)? → [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]
> - Need the formal OOB permutation importance (Eq. 1) or the null hypotheses $X_j \perp Y,Z$ vs $(X_j\perp Y)\mid Z$ (Fig. 2)? → [[Strobl 2008 - Permutation Importance Null Hypotheses]]
> - Need the conditional permutation algorithm, the cutpoint grid, or how to choose $Z$? → [[Conditional Permutation Importance (Strobl 2008 Algorithm)]]
> - Need the simulation evidence (Fig. 3)? → [[Strobl 2008 - Simulation Results for Conditional Importance]]
> - Need the real-data reranking (peptide binding, Fig. 4)? → [[Strobl 2008 - Peptide-Binding Application]]
> - Need limitations, `mtry`/`ntree` advice, or later critiques? → [[Strobl 2008 - Discussion, mtry Guidance and Limitations]]
> - Need the actual numbers behind Figures 1-4 (selection rates, importance medians and IQRs at `mtry` = 1, 3, 8, peptide bar heights)? → [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]
^abstract-index-strobl2008

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Marginal vs conditional importance | [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]] | definition | [[Spurious Association and Confounds]] | Original RF importance is marginal; most applications need conditional |
| Locally optimal split selection | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] | concept | — | Root splits use marginal association only, so proxies win |
| Simulation design (Table 1) | [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]] | example | — | $\beta=(5,5,2,0,-5,-5,-2,0,\dots,0)$, $\rho_{1:4}=0.9$ |
| Tree-wise OOB permutation importance (Eq. 1) | [[Strobl 2008 - Permutation Importance Null Hypotheses]] | definition | [[Permutation Tests and Exact Inference]] | Accuracy drop after permuting $X_j$, averaged over trees |
| Marginal permutation null | [[Strobl 2008 - Permutation Importance Null Hypotheses]] | theorem | Eq. 1 | $H_0: X_j\perp Y,Z$, violated by $X_j$–$Z$ correlation alone |
| Conditional permutation null | [[Strobl 2008 - Permutation Importance Null Hypotheses]] | theorem | [[Conditional Independence Assumption]] | $H_0:(X_j\perp Y)\mid Z$ |
| Conditional permutation importance | [[Conditional Permutation Importance (Strobl 2008 Algorithm)]] | algorithm | null hypotheses | Permute within tree-cutpoint grid; average over trees |
| Simulation findings | [[Strobl 2008 - Simulation Results for Conditional Importance]] | example | algorithm | Conditional scores much closer to the coefficient pattern (bias reduced, not removed), lower variance |
| Peptide reranking | [[Strobl 2008 - Peptide-Binding Application]] | example | algorithm | pol3 rank 11 → 7; h2y8 8 → 9; flex8 9 → 8 |
| Digitized figure values | [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] | example | simulation design | Conditional $X_1$ ≈ 16/20/31 vs $X_5$ ≈ 9/13/16; marginal $X_1$ ≈ 29/50/70 |
| `mtry`/`ntree` guidance | [[Strobl 2008 - Discussion, mtry Guidance and Limitations]] | concept | results | Scan `mtry`; ensure seed stability |

## Notes

- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]: CONTAINS: research question, 3 contributions, 6 key findings, full Source Map (§1–§5, Eq. 1, Table 1, Figs 1-4, figure values), pass-3 checklist, reference key for the numbered citations, reading order, marketing relevance.
- [[Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation]]: CONTAINS: §1 Background; hospital complication–mortality example; definition of marginal vs conditional importance; terminology table; literature review (PDP, Gini bias, Breiman–Cutler test, backward elimination, Archer & Kimes, Nicodemus & Shugart, CARTscans); paper aims.
- [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]: CONTAINS: §2 intro (bagging, RF, Bühlmann–Yu); locally optimal split-selection definition; §2.1 simulation design with Table 1; §2.2 Figure 1 selection-rate findings; two-variable intuition.
- [[Strobl 2008 - Permutation Importance Null Hypotheses]]: CONTAINS: Eq. 1 tree-wise OOB importance; forest average; raw vs z-score; permutation-test lens; marginal $H_0$ and factorization; conditional $H_0$ and factorizations; stated aim of the conditional measure (§2.4 para. 4); corollary on when the schemes agree; Figure 2; proof sketch; oracle linear-model derivation.
- [[Conditional Permutation Importance (Strobl 2008 Algorithm)]]: CONTAINS: grid requirements (i)-(iii); any tree partition usable, conditional inference trees used; tree-induced grid definition (bisector simplification); 4-step algorithm, labelled editorial assumptions (OOB shuffling, regression variant) and pseudo-code; table of strategies for choosing $Z$; computational remarks (tree depth, coverage across trees); worked grid example.
- [[Strobl 2008 - Simulation Results for Conditional Importance]]: CONTAINS: §3 settings (500 reps, $r\ge .2$); Figure 3; findings 1-4 (marginal inflation, conditional pattern, variance, two tasks, piecewise-constant remark); qualitative results table.
- [[Strobl 2008 - Peptide-Binding Application]]: CONTAINS: §4 data table (n = 310, 104 predictors, 1000 trees, `mtry` = 104, $Z$ by Pearson threshold with unreported value); Figure 4; rank table for h2y8 / flex8 / pol3; pol8 explanation; conclusion.
- [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]: CONTAINS: how the figures were digitized; Fig. 1 first-split and all-split selection-rate tables (`mtry` 1/3/8); Fig. 2 layout transcribed; Fig. 3 median and IQR table for both schemes; caption vs image line-style mismatch; readings (inflation ratios, the "almost equal" discrepancy, variance); Fig. 4 bar-height and rank table; what cannot be recovered (identities of the top variables, unreported `mtry` fits).
- [[Strobl 2008 - Discussion, mtry Guidance and Limitations]]: CONTAINS: §5 claims 1-5; software note; authors' contributions and acknowledgements; limitations table; critical commentary from outside the source (unique-information interpretation, Hooker et al., Fisher et al., permimp, SHAP parallel); practitioner checklist.

## Sources

- [[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]: open-access full text (markdown, cited by section).
- [[raw/Strobl et al 2008 - Figure 1 Selection Rates.jpg]], [[raw/Strobl et al 2008 - Figure 2 Permutation Schemes.jpg]], [[raw/Strobl et al 2008 - Figure 3 Permutation Importance.jpg]], [[raw/Strobl et al 2008 - Figure 4 Peptide Binding.jpg]]: published figure images (open access), used for digitization.

## See Also

- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]: predecessor on bias from scale and number of categories.
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]: the extrapolation critique of marginal permutation.
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]]: model reliance and the Rashomon set.
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]: stability of variable selection.
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]]: the same marginal-vs-conditional choice in SHAP.
