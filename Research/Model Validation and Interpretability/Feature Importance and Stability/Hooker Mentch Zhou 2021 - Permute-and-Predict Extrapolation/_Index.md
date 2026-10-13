---
title: "Index: Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
parent: "[[../_Index|Feature Importance and Stability]]"
date_updated: 2026-10-13
concept_count: 8
---

# Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation

> [!abstract] Routing Summary
> This folder fully captures Hooker, Mentch & Zhou (2021), *Unrestricted permutation forces extrapolation* (Statistics and Computing 31:82; arXiv:1905.03151v2), in 8 notes. The topics are permute-and-predict (PaP) importance, PDP and ICE; why random forests and neural nets inflate correlated features; Theorems 1-3; the conditional, LOCO, permute-and-relearn and condition-and-relearn alternatives; test-size inflation; the bike-share example; and alternatives for effect plots.
> - Need the paper's thesis, findings, or section map? → [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
> - Need definitions of $\mathrm{VI}^\pi$, PD, ICE, or their population targets? → [[Permute-and-Predict Extrapolation in Variable Importance]]
> - Need what PaP returns for a linear model (Theorem 1) or the simulation design and rank results? → [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]]
> - Need *why* forests and NNs extrapolate (potential nearest neighbours, Gibbs-like variance)? → [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]]
> - Need a non-extrapolating importance measure, Theorems 2-3, or the compensation effect? → [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]
> - Need to test importance, or a real-data example? → [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]]
> - Need safer effect plots or the paper's conclusions? → [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]
> - Need a cited work's venue, the funding, or the reference list? → [[Hooker Mentch Zhou 2021 - References and Acknowledgments]]
^routing-hmz2021

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Permutation importance $\mathrm{VI}^\pi_j$ | [[Permute-and-Predict Extrapolation in Variable Importance]] | definition | — | Loss increase after marginal permutation of $x_j$ |
| PD / ICE | [[Permute-and-Predict Extrapolation in Variable Importance]] | definition | — | $\mathrm{PD}_j(x)=\frac1N\sum_i f(x_i^{x,j})$ |
| PaP population targets | [[Permute-and-Predict Extrapolation in Variable Importance]] | definition | — | Integrate against **marginal** $p_j$ |
| Functional ANOVA, eq. (1) | [[Permute-and-Predict Extrapolation in Variable Importance]] | definition | [[Variance-Based Sensitivity and Sobol Indices]] | PaP VI = Sobol index under independence |
| Theorem 1 | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] | theorem | PaP definitions | $E_\pi\mathrm{VI}^\pi_j=2\hat\beta_j^2\sum(x_{ij}-\bar x_j)^2$ |
| Copula simulation, eq. (2) | [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] | example | [[Copula Estimation]] | RF/NN inflate $x_1,x_2$ at $\rho=0.9$; linear model does not |
| Potential nearest neighbours, eq. (3) | [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] | definition | [[Honest Trees and Causal Forests]] | Off-data points average distant leaves |
| $\mathrm{VI}^C,\mathrm{VI}^D,\mathrm{VI}^{\pi L},\mathrm{VI}^{CL}$ | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] | definition | PaP definitions | Need "one more model" |
| Theorem 2 | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] | theorem | [[Regression and the CEF]] | Shared target $E(f-E[f\mid x_{-j}])^2$ |
| Theorem 3 / compensation | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] | theorem | [[Omitted Variables Bias]] | Importance $\propto\beta_j^2\sum\delta_{ij}^2$ |
| Ordering vs testing | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] | example | Theorem 2 | Permute-and-relearn tests over-reject; knockoffs about 5% |
| Bike-share ranks | [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] | example | — | `temp` OOB rank 10 → relearn rank 1; `yr` 6 → 11 |
| Model class reliance (as used here) | [[Permute-and-Predict Extrapolation in Variable Importance]] | definition | [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] | Profile-CI analogue; prefer conditional version |
| Knockoff modes | [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] | definition | — | Swap-and-test (CRT) vs augment-and-filter (FDR) |
| Generalized fANOVA PD | [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] | definition | eq. (1) | Minimize $\int(f-f_1-f_{-1})^2p(x)dx$ |

## Notes

- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]] — CONTAINS: citation; thesis; contributions (i)-(iii); key-findings table; full Source Map (§1-§7, App. A); pregnant-men example; correlated media-channel illustration.
- [[Permute-and-Predict Extrapolation in Variable Importance]] — CONTAINS: "X-ray the black box" framing and Rudin (2019); notation; definitions of $\mathrm{VI}^\pi_j$ (incl. OOB), $\mathrm{PD}_j$, $\mathrm{ICE}_{i,j}$; literature on correlation bias; two-effects distinction; population targets $\mathrm{VI}^\pi_j(f)$, $f_{-j}$, $f_j$; linear yardstick; backward-elimination danger; inference vs model audit; model class reliance definition (profile-CI analogue); scope statement (algorithm class, model-agnostic, Shapley more complex); remedies preview and "gold standard" quote; functional ANOVA eq. (1); Shapley and split-improvement remarks.
- [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] — CONTAINS: eq. (2) model; design logic; Theorem 1 + proof sketch; caveat on unhatted PD/ICE constants; simulation protocol (algorithm); theoretical ranks; full Fig. 1 table (every series × feature, both panels); Fig. 2 caption check, design grid and full four-panel rank tables; Fig. 3 PD, PD-SD and ICE readings with line-type caveat; worked Theorem 1 example.
- [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] — CONTAINS: two-feature experiment setup (noise SD 0.05, SNR = 100/3 derivation); Fig. 4 three panels; Fig. 4 contour-level readings table and leaf-boundary description; eq. (3) tree weights and pNN definition; pNN mechanism; joint-inflation claim; NN variance and Gibbs effects; Fig. 5 mean/SD contour readings table; Fig. 6 PD/ICE readings table; seasonal-driver illustration.
- [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] — CONTAINS: the two families of alternatives; the two knockoff modes; definitions of $\mathrm{VI}^C,\mathrm{VI}^D,\mathrm{VI}^{\pi L},\mathrm{VI}^{CL}$; sign-convention note; condition-and-relearn algorithm; Theorem 2 + proof; how $\mathrm{VI}^D$ fits Theorem 2 (constant replacement); full Fig. 7 tables (all six panels, every measure × feature); Theorem 3 + proof; Theorem 3 notation caveats ($\hat\gamma$ vs $\gamma$, $\hat\beta_j$ vs $\beta_j$, factor 2); compensation effect; joint importance; local explanations (saliency, LIME, SHAP) and the threshold counterexample; collinear-channels example.
- [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] — CONTAINS: generic importance $H_0$; Mentch & Zhou (2020) finding; noise-feature test simulation design; full Fig. 8 rejection-rate tables (all SNR × model × $q$; knockoff and truth ranges; Monte Carlo SE); ordering-vs-testing claim; bike-share setup and full Fig. 9 rank table (approx.); target-leakage remark.
- [[Hooker Mentch Zhou 2021 - References and Acknowledgments]] — CONTAINS: affiliations; NSF grants and computing acknowledgment; all 46 references with venues, grouped by role (PaP origins, bias evidence, conditional/knockoff, re-learning tests, fANOVA/Shapley/distillation, split-improvement corrections, local explanations and data), each mapped to citing section and vault note.
- [[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]] — CONTAINS: restricted ICE; caution on averaging supported segments; generalized fANOVA projection (definition); Chastaing smoothing; GAM distillation (formal additive-model definition, distillation algorithm, link to generalized fANOVA); §7 conclusions 1-5; limitations; MMM response-curve illustration.

## Sources
- [[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]] — Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, 22 pp.

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — split-selection bias (different mechanism)
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — conditional permutation within tree partitions
- [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]] — model reliance and the Rashomon set
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — off-manifold SHAP
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — interventional vs observational relevance
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] — stable selection under noisy importances
