---
title: "Degtiar 2023 - Weighting and Matching Methods"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 5 intro and 5.1 (5.1.1 Matching, 5.1.2 Weighting), PDF pp. 12-16"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Identifying Assumptions]]"
used_by:
  - "[[Degtiar 2023 - Doubly Robust and Combined Methods]]"
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - IPPW
  - Inverse probability of participation weighting
  - Odds of participation weights
  - Post-stratification for generalizability
  - Matching for generalizability
---

# Degtiar 2023 - Weighting and Matching Methods

> [!summary]
> Weighting and matching estimators correct external validity bias by modelling the **probability of selection into the study** (not the probability of treatment). The review covers full matching and fine balance, nonparametric **post-stratification**, maximum-entropy weighting, **inverse probability of participation weighting (IPPW)** with the odds-of-participation variant for transportability, normalization, and propensity-stratum methods. They work best when effect modifiers strongly predict selection, and fail when target regions lack study support.

## Overview

Section 5 intro: generalizability/transportability methods "address differences in the distribution of effect modifiers between study and target populations. To do so, for weighting and matching-based approaches, these methods account for the probability of selection into the study, rather than the probability of treatment assignment. Outcome regressions require that treatment effect is allowed to vary across all effect modifiers in addition to all confounders being correctly included." Most methods were developed for randomized data. When outcomes exist from both randomized and observational studies, combining them can reduce sensitivity to selection-positivity violations (an RCT problem) and to unmeasured confounding (an observational problem), and can shrink mean squared error (see [[Degtiar 2023 - Doubly Robust and Combined Methods]]). Most approaches need individual-level data; summary-level exceptions are in the Appendix ([[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]).

When to prefer: weighting/matching is "particularly effective when effect modifiers strongly predict selection into the study". Including unnecessary covariates can reduce precision, create extreme weights and difficult matches without bias reduction (Nie et al. 2013), but omitting an effect modifier is typically worse (Stuart 2010; Dahabreh et al. 2018). Strong reliance on common support: methods "perform poorly when a portion of the target population is not well-represented in the study sample or when empirical positivity violations occur." Use the approach that gives the best effect-modifier balance and fewest assumptions.

## Main Content

### 5.1.1 Matching

- **Full matching** (Stuart et al. 2011): fully match study and target individuals on propensity scores to form sets with at least one study and one target individual; reweight each individual's outcome by the number of target individuals in the matched set. Relies heavily on the distance metric, which can be misled by covariates that do not affect the outcome.
- **Fine balance of covariate first moments** (Bennett, Vielma and Zubizarreta 2020): nonparametric approach for larger data, works with multi-valued treatments; matches samples to a target to achieve fine balance on first moments of all covariates rather than via the propensity score.
- Implementation choices: some implementations match only a subset of study individuals (revealing regions without common support); others match all. Calibration for bias-variance (caliper, study-to-target matching ratio). Distance metrics exist, "however, none specifically target effect modifiers." With unrepresentative observational data, first match treatment groups on confounders then match study pairs to the target on effect modifiers, or match each treatment group separately to the target.

### 5.1.2 Weighting

> [!definition] Post-stratification (direct adjustment, subclassification)
> For low-dimensional categorical/binary effect modifiers: estimate stratum-specific effects, then reweight to the target stratum distribution (Miettinen 1972; Prentice et al. 2005; with instrumental variables, Angrist and Fernandez-Val 2013):
> $$\hat E(Y^a)=\frac1n\sum_{l=1}^L n_l\,\bar Y^a_l,\qquad n=\sum_{l=1}^L n_l,$$
> $L$ strata, $n_l$ the target sample size in stratum $l$, $\bar Y_l^a$ the study-sample estimate (typically the stratum mean) of the potential outcome under $a$.
^def-post-stratification

Properties: needs only stratum-level summary data; closed-form variances often available. Empty strata arise quickly with continuous or many stratifiers; too few strata leaves residual external-validity bias (especially in small samples; Tipton et al. 2017). Remedy: pool across strata via **multilevel regression and post-stratification** (Pool et al. 1964; Gelman and Little 1997; Park, Gelman and Bafumi 2004; Kennedy and Gelman 2019). For higher-dimensional or continuous covariates: **maximum entropy weighting** reweights study strata to the target distribution (Hartman et al. 2015). For differing **post-treatment** variables such as adherence: **principal stratification** (never-takers, always-takers, compliers; Frangakis 2009).

**Propensity-of-selection weighting.** Most weighting approaches use a selection-propensity regression; they rely on correct specification and sufficient overlap. Advantage: one set of weights serves multiple outcomes. Plain weights can have large variance with extreme weights, give disproportionate weight to outliers and yield outcome estimates outside the outcome's support. **Weight standardization** helps; **trimming** also helps but changes the target population (a bias-variance trade).

> [!definition] Inverse probability of participation weighting (IPPW) for generalizability
> A Horvitz-Thompson-like estimator (Horvitz and Thompson 1952), the most common weighting technique for generalizability (Flores and Mitnik 2013; Baker et al. 2013; Lesko et al. 2017; Westreich et al. 2017; Correa, Tian and Bareinboim 2018; Dahabreh et al. 2018, 2019a). Observed outcomes are reweighted to obtain potential outcomes for each treatment $a$:
> $$E(Y^a)=\frac1n\sum_{i=1}^n w_iY_i,$$
> $$w_i=\frac{\mathbb I(S_i=1)\,\mathbb I(A_i=a)}{\pi_{s,i}}\ \text{(random assignment; Lesko et al. 2017)},\qquad w_i=\frac{\mathbb I(S_i=1)\,\mathbb I(A_i=a)}{\pi_{s,i}\,\pi_{a,i}}\ \text{(general; Stuart et al. 2011; Dahabreh et al. 2019a)},$$
> where $\pi_{s,i}=P(S_i=1\mid X_i)$ is the selection propensity and $\pi_{a,i}=P(A_i=a\mid S_i=1,X_i)$ the treatment propensity within the study.
^def-ippw

> [!definition] Odds of participation weights (transportability, target $S=0$)
> For transport to the target $S=0$ (Westreich et al. 2017; Dahabreh et al. 2018), with $N=n+n_s$:
> $$\hat E(Y^a\mid S=0)=\frac1n\sum_{i=1}^Nw_iY_i,\qquad w_i=\frac{1-\pi_{s,i}}{\pi_{s,i}\,\pi_{a,i}}\,\mathbb I(S_i=1)\,\mathbb I(A_i=a).$$
> **Standardization**: replace $n$ by $\sum w_i$ (weights normalized to sum to 1) (Dahabreh et al. 2018, 2019a). The result is more stable, bounded by the observed outcome range, and better when the target sample is much larger than the study.
^def-odds-weights

Further facts:
- Needs individual-level data, although joint covariate distributions from group-level data (Cole and Stuart 2010) or univariate moments with extra assumptions (Signorovitch et al. 2010; Phillippo et al. 2018) can substitute.
- Uses only study individuals on a given arm to estimate that arm's potential outcome, so power is a concern for multi-level treatments; performs poorly when selection probabilities are small, common in generalizability (Tipton 2013b).
- Weights exist for GLM parameters (Haneuse et al. 2009), Cox hazard ratios and baseline risks (Cole and Stuart 2010; Pan and Schaubel 2008).
- Under regularity conditions the estimator is consistent and asymptotically normal (Lunceford and Davidian 2004; Pan and Schaubel 2008; Cole and Stuart 2010; Correa, Tian and Bareinboim 2018; Buchanan et al. 2018). Variance: bootstrap or robust sandwich; the sandwich may be hard to compute (Haneuse et al. 2009); bootstrap performs better with substantial heterogeneity or smaller samples (Chen and Kaizar 2017; Tipton et al. 2017).

> [!definition] Propensity-score stratification
> RCT individuals are divided into strata by selection-propensity (quintiles common; may remove >90% of bias, O'Muircheartaigh and Hedges 2014). Estimate effects within strata (separate regressions, or joint regression with subgroup fixed effects and subgroup-by-RCT-status interactions) and reweight by target counts per stratum. Alternatively match the target sample to RCT individuals within the same stratum (Tipton 2013b). The post-stratification estimator is asymptotically normal with closed-form variances for independent strata (O'Muircheartaigh and Hedges 2014; Lunceford and Davidian 2004). Compared with IPPW, it is more numerically stable and easier with group-level (cluster-randomized) assignment. Caveats: it implicitly assumes effects are identical for study and target patients in the same stratum (rarely true; residual confounding, inconsistency; Lunceford and Davidian 2004); assumes heterogeneity is fully captured by the propensity score and that outcomes are continuous and bounded; too few strata leaves bias, too many gives unstable estimates (Stuart 2010; Tipton et al. 2017). Propensity strata have also been used to address positivity-of-treatment violations in the target when outcomes come from both randomized and observational studies (Rosenman et al. 2018; extension for unmeasured confounding in Rosenman et al. 2020).
^def-ps-stratification

### Summary table

| Method | Estimate of | Strength | Weakness |
|---|---|---|---|
| Post-stratification | $\frac1n\sum n_l\bar Y_l^a$ | summary data only; closed-form variance | empty strata; bias if too coarse |
| MRP | partial pooling across strata | stabilizes sparse cells | needs multilevel model |
| Maximum entropy weighting | study strata reweighted to target | continuous/high-dim | needs balance constraints |
| Full matching | outcomes weighted by target counts in set | nonparametric | distance metric not effect-modifier aware |
| Fine balance | first-moment balance | no PS, multi-valued treatments | first moments only |
| IPPW | $w=1/(\pi_s\pi_a)$ | one weight set for many outcomes | extreme weights, low power, variance |
| Odds weights (normalized) | $w=(1-\pi_s)/(\pi_s\pi_a)$ | bounded, stable for transport | needs large target sample |
| PS strata | quintile reweighting | stable, cluster designs | assumes within-stratum homogeneity |

## Examples

> [!example] IPPW on the geo-test toy (full simulation in the application note)
> Study $x\sim N(1,1)$ with 3000 units, target $x\sim N(-0.5,1)$ with 6000; effect $\tau(x)=1+0.8x$; true PATE $0.6$ versus SATE $1.8$. Fitting a quadratic-logit selection model and applying normalized odds-of-participation weights with known $\pi_a=0.5$ gives, over 200 replications, mean $0.613$ (sd $0.189$): unbiased within noise but the noisiest of the four estimators. See [[Degtiar 2023 - Marketing Application Transporting Experiment Results]].
> ```python
> # odds-of-participation weights, normalised (transport to S=0); pis = P(S=1|x) for study units
> w = (1 - pis) / pis / 0.5                     # 0.5 = known randomisation prob pi_a
> ippw = lambda a: (w[A==a]*Y[A==a]).sum() / w[A==a].sum()
> pate_hat = ippw(1) - ippw(0)
> ```

> [!example] Post-stratification in marketing
> Strata: market-size tier. $\hat E(Y^a)=\sum_l (n_l/n)\bar Y^a_l$ with the rollout's tier counts $n_l$ gives the transported ROAS of 0.96 in [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]], identical in form to Pearl and Bareinboim's Eq. (3.1). The causal-graph and potential-outcomes literatures agree on the formula and differ in how they justify it.

## Connections

- The graphical derivation of the same reweighting: [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] (Corollary 1).
- Weights of this kind appear in Bayesian form in [[Bayesian Inverse Probability Weighting]]; multilevel post-stratification is a hierarchical-modelling idea ([[Hierarchical Models]]).
- Assumptions needed: [[Degtiar 2023 - Identifying Assumptions]] (B1, B2). Augmenting with an outcome model: [[Degtiar 2023 - Doubly Robust and Combined Methods]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
- [[Propensity Score Matching - Overview]]
