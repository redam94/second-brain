---
title: Propensity Score Matching - Index
tags:
  - type/index
  - source/ingested
  - topic/causal-inference
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
date_ingested: 2026-06-28
---

# Propensity Score Matching

Classical Rosenbaum-Rubin propensity-score **matching** framework and its diagnostics, ingested from Stuart (2010), "Matching Methods for Causal Inference: A Review and a Look Forward," *Statistical Science* 25(1).

> [!abstract] Routing Summary
> - Need the big picture, the four-step workflow, or the four uses of the propensity score? → [[Propensity Score Matching - Overview]]
> - Need the **definition** of the propensity score, the **balancing-score theorem**, or **strong ignorability**? → [[Propensity Score and the Balancing Property]]
> - Need a **distance measure** (exact / Mahalanobis / caliper) or a **matching algorithm** (nearest-neighbor, optimal, full, subclassification, IPTW)? → [[Matching Methods and Distance Measures]]
> - Need to **check match quality** (standardized mean differences, variance ratios, QQ plots) or know why **not** to use a balance hypothesis test? → [[Covariate Balance Diagnostics]]
> - Need the **overlap / common-support** requirement, trimming, or its effect on the estimand? → [[Common Support and Overlap]]
> - Need classical PS matching framework, balancing theorem, ATT vs ATE? → [[Propensity Score Matching - Balancing Theorem and Failure Modes]]
> - Need NN matching, caliper width, optimal/full matching algorithms? → [[Matching Algorithms and Caliper]]
> - Need love plots, SMD thresholds, overlap plots, Rubin balance criteria? → [[Covariate Balance and Matching Diagnostics]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Workflow & four uses of PS | [[Propensity Score Matching - Overview]] | overview | Potential Outcomes, Balancing Property | Separate design (no outcomes) from analysis; PS used for matching, subclassification, weighting, adjustment |
| PS definition + Rosenbaum-Rubin theorem | [[Propensity Score and the Balancing Property]] | theorem | Potential Outcomes, Conditional Independence | $e(X)=P(T=1\mid X)$ is a balancing score; under strong ignorability, conditioning on scalar $e(X)$ removes observed-covariate bias |
| Distances & matching structures | [[Matching Methods and Distance Measures]] | concept | Balancing Property | Exact/Mahalanobis/caliper distances; k:1, greedy vs. optimal, with/without replacement, full matching, IPTW |
| Balance diagnostics | [[Covariate Balance Diagnostics]] | concept | Balancing Property, Distance Measures | Use standardized mean diffs & variance ratios (<0.25, 0.5-2), QQ plots; never use balance p-values |
| Overlap / common support | [[Common Support and Overlap]] | concept | Balancing Property | Estimate effects only on the region of common support; trim outside it; overlap constrains ATE vs. ATT |
| Balancing theorem, ATT estimand, PSM vs IPW, when matching fails | [[Propensity Score Matching - Balancing Theorem and Failure Modes]] | concept | [[The Selection Problem]], [[Conditional Independence Assumption]], [[Frequentist Causal Estimation]] | $e(X)$ is a sufficient statistic for covariate balance; PSM discards units, IPW reweights — complementary methods |
| NN greedy, caliper $\delta=0.2\sigma_{\text{logit}}$, optimal/full matching, subclassification | [[Matching Algorithms and Caliper]] | concept | [[Propensity Score Matching - Balancing Theorem and Failure Modes]] | Caliper prevents poor matches; optimal matching minimises total distance globally; full matching uses all data |
| SMD, love plot, overlap plot, variance ratio, Rubin (2001) criteria | [[Covariate Balance and Matching Diagnostics]] | concept | [[Propensity Score Matching - Balancing Theorem and Failure Modes]], [[Matching Algorithms and Caliper]] | Balance assessed via effect sizes ($|\text{SMD}|<0.1$) not $p$-values; love plot is primary visual diagnostic |

## Notes

- [[Propensity Score Matching - Overview]] — CONTAINS: definition of matching, two settings, outcome-free design vs. analysis, the four implementation steps, ATT/ATE estimands, the four uses of the propensity score, Chapin curse-of-dimensionality example, matching-vs-regression complementarity.
- [[Propensity Score and the Balancing Property]] — CONTAINS: $e_i(X_i)=P(T_i=1\mid X_i)$, strong ignorability (unconfoundedness + positivity), balancing-score theorem $X\perp T\mid e(X)$, ignorability given the PS, liberal variable-selection rule (balance not c-statistic), linear/logit PS, caliper bias-reduction figures (0.2 SD → 98%).
- [[Matching Methods and Distance Measures]] — CONTAINS: four affinely-invariant distances with formulas, Mahalanobis-within-caliper formula, k:1 nearest neighbor & ratio matching, greedy vs. optimal, with/without replacement & frequency weights, subclassification (5-10 → 90% bias), full matching (Hansen SAT example), IPTW & weighting-by-odds formulas, weight trimming, doubly-robust.
- [[Covariate Balance Diagnostics]] — CONTAINS: standardized difference in means formula, Rubin (2001) three balance measures, thresholds (SMD<0.25, var ratio 0.5-2), the balance-test caution (in-sample property; tests conflate balance with power), QQ plots and before/after standardized-difference plots.
- [[Common Support and Overlap]] — CONTAINS: region of common support / positivity, propensity-score trimming and convex-hull (King-Zeng), how calipers vs. weighting handle overlap, estimand implications (ATE vs. ATT), why matching surfaces non-overlap that regression hides.
- [[Propensity Score Matching - Balancing Theorem and Failure Modes]] — CONTAINS: Propensity score definition, balancing theorem (R&R 1983 Thm 1), strong ignorability definition, ATT vs ATE estimand comparison, PSM vs IPW table, the matching workflow, why PSM fails for activity bias
- [[Matching Algorithms and Caliper]] — CONTAINS: Logit PS distance metric, NN greedy matching (with/without replacement), caliper definition and $0.2\sigma_{\text{logit}}$ width rule, optimal matching, full matching, 1:k matching, subclassification, Mahalanobis distance, common support trimming, MatchIt R code
- [[Covariate Balance and Matching Diagnostics]] — CONTAINS: SMD formula and $|$SMD$|<0.1$ threshold, why $p$-values are wrong for balance, love plot (definition + cobalt R code), propensity score overlap plot, variance ratio, KS statistic, ESS for weighting, Rubin (2001) three-criteria theorem, outcome-blinding principle, ATT estimation after matching

## External Connections

[[Potential Outcomes Framework]] · [[Conditional Independence Assumption]] · [[Frequentist Causal Estimation]] · [[The Selection Problem]] · [[Omitted Variables Bias]] · [[Synthetic Control]] · [[Bayesian Inverse Probability Weighting]] · [[Bayesian Inverse Probability Weighting]] · [[Activity Bias in Advertising]]

## Sources

- Stuart 2010 - Matching Methods for Causal Inference - A Review — Stuart, E. A. (2010). Matching Methods for Causal Inference: A Review and a Look Forward. *Statistical Science* 25(1), 1-21.
