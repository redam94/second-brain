---
title: "Degtiar 2023 - Assessing Dissimilarity Between Study and Target"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 4 intro, 4.1 and 4.2, PDF pp. 8-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Identifying Assumptions]]"
used_by:
  - "[[Degtiar 2023 - Testing Treatment Effect Heterogeneity]]"
  - "[[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]"
aliases:
  - Generalizability index
  - Standardized mean difference study target
  - Covariate shift detection study target
  - Equivalence tests for generalizability
---

# Degtiar 2023 - Assessing Dissimilarity Between Study and Target

> [!summary]
> Before estimating anything, quantify how different study and target populations are. Two families of diagnostics: comparisons of **baseline characteristics** (univariate SMDs, eligibility percentages, selection-propensity distributions, Tipton's generalizability index, classifier-based covariate shift) and comparisons of **outcomes** for groups on the same treatment (observed target outcomes versus weighted study outcomes, conditional outcome comparisons, equivalence tests, sensitivity analysis and bounds). Differences matter only insofar as they correspond to **effect modifiers**.

## Overview

"These assessments examine population differences and whether treatment effect heterogeneity exists." Methods for similarity either compare baseline characteristics or compare outcomes for groups on the same treatment. Many use the **propensity score for selection**, which also shows whether propensity adjustment with measured covariates can remove baseline differences between study and target samples. Most do not emphasize effect modifiers, so they should be combined with an assessment of whether the differences correspond to effect heterogeneity ([[Degtiar 2023 - Testing Treatment Effect Heterogeneity]]). Effect modifiers are usually pre-specified by the investigator, though data-driven approaches exist.

## Main Content

### 4.1 Baseline characteristics

| Method | Data needed | What it does | Caveat (per the review) |
|---|---|---|---|
| Generalization score (Cahan, Cahan and Cimino 2017) | summary level | ratios of means/medians of baseline characteristics, trial setting, protocol, patient selection, averaged across categories | ignores dispersion, which may reflect exclusion of more heterogeneous individuals |
| Multiplicity-adjusted univariate tests (Greenhouse et al. 2008) | summary | tests of differences in effect modifiers between study and target | applicable when only baseline characteristics drive differences |
| Absolute standardized mean difference | summary | $\text{SMD}=(\bar X_{\text{study}}-\bar X)/\sigma_{\bar X}$ per covariate (Tipton et al. 2017) | high values imply heavy extrapolation and dependence on correct model specification; chance imbalance in small samples |
| Percent eligible | individual target data | share of the target sample that would have been eligible for the study or set of studies (Weng et al. 2014; He et al. 2016; Sen et al. 2016) | categorical eligibility criteria only |
| SMD of selection propensity scores | individual | joint covariate distributions compared via the propensity score for selection (Stuart et al. 2011) | mean difference insufficient when PS distribution asymmetric |
| Generalizability index (Tipton 2014) | individual (study and target) | compares binned propensity-score distributions | patient-level data needed |
| Other PS distances | individual | Q-Q plots, Kolmogorov-Smirnov, Levy distance, overlapping coefficient, C statistic (Tipton 2014; Ding, Feller and Miratrix 2016) | focus on cumulative densities |
| Extrapolation share | individual | proportion of target sample with PS outside the 5th-95th percentiles of the study sample (Tipton et al. 2017) | |
| Covariate-shift classifier (Glauner et al. 2017) | individual | pool study and target, classify origin; dissimilarity metric above threshold implies sizable difference | failure to classify does not rule out effect-modifier differences; low score may mean misspecification or poor tuning |

> [!definition] Generalizability index (Tipton 2014)
> With $k$ propensity-score bins, target-sample proportions $w_{pj}$ and study-sample proportions $w_{sj}$, $j=1,\dots,k$:
> $$\beta=\sum_{j=1}^k\sqrt{w_{pj}\,w_{sj}}\ \in[0,1].$$
> (The PDF text extraction of the review lost the radical; the square-root form is Tipton's Bhattacharyya-type coefficient and is the form consistent with the stated bounds 0 to 1.) $\beta<0.5$: the study is "very challenging to generalize from"; $\beta>0.9$: high generalizability. Based on PS *distributions*, not just means; requires patient-level data from both samples.
^def-generalizability-index

The review's warning: these tests require **investigator knowledge of which characteristics moderate the treatment effect** (or correlate with unmeasured modifiers) and what level of difference is clinically relevant. Many covariates are often tested or put in the selection-propensity regression, which prioritizes predictors strongly associated with *selection* rather than with *effect modification*. Investigators should identify relevant effect modifiers and test that subset.

### 4.2 Outcomes

When individual-level outcomes (or joint distributions of group-level outcomes) exist in both samples for at least one treatment group, one can assess whether measured effect modifiers account for population differences.

1. **Observed target vs weighted study outcomes on the same arm.** Compare the target sample's observed outcomes with predictions from study controls (Stuart et al. 2011) or, more generally, study individuals on the same treatment (Hotz, Imbens and Mortimer 2005):
$$\frac1{n_a}\sum_{i=1}^N\mathbb 1(A_i=a)\,Y_i\quad\text{vs.}\quad\frac1{n_{s,a}}\sum_{i:S_i=1}\mathbb 1(A_i=a)\,w_i\,Y_i,$$
with $w_i$ from the weighting or matching methods of [[Degtiar 2023 - Weighting and Matching Methods]]. Hartman et al. (2015) formalize this with **equivalence tests** (and give the identifiability assumptions violated if each is rejected).
2. **Conditional outcome comparison.** $E(Y\mid X,A=a,S=1)$ versus $E(Y\mid X,A=a,S=0)$ detects *unmeasured* effect modification (other identifiability violations could also be at fault). Tests: ANCOVA, Mantel-Haenszel, U-statistic tests, stratified log-rank or rank-sum depending on the outcome (Marcus 1997; Hotz et al. 2005; Luedtke, Carone and van der Laan 2019). Example: compare study controls with target subgroups known to be excluded from the study, such as patients who declined RCT participation (Davis 1988). Disaggregating a characteristic that differentiates study from target is an imperfect test of unmeasured modification (Allcott and Mullainathan 2012). These outcome differences should not exceed those between study treatment groups (Begg 1992).
3. **Coefficient or baseline-hazard comparisons.** Test differences between study and target regression coefficients, or baseline hazards in Cox regression (Pan and Schaubel 2009).

Interpretation: identified differences reflect sample differences unaccounted for by the outcome or weighting method, i.e. unmeasured effect modification or an ineffective modeling approach. For the comparison to be meaningful, study controls must be representative of the target *after* weighting or regression adjustment.

**If unmeasured modification is suspected:** perform **sensitivity analysis** (Marcus 1997; Nguyen et al. 2017, 2018; Dahabreh et al. 2019b; Andrews and Oster 2017) or compute **bounds** on the effect when only partial identification is possible (Chan 2017).

> [!example] Python: baseline-dissimilarity diagnostics (SMD, generalizability index, extrapolation share, C-statistic)
> ```python
> import numpy as np
> rng = np.random.default_rng(3)
> xs = rng.normal(1.0, 1, 3000); xt = rng.normal(-0.5, 1, 6000)     # study vs target covariate
> smd = (xs.mean() - xt.mean()) / xt.std()
> def logit_fit(x, s, it=25):                                        # selection propensity P(S=1|x)
>     X = np.c_[np.ones(len(x)), x]; b = np.zeros(2)
>     for _ in range(it):
>         p = 1/(1+np.exp(-X@b)); W = p*(1-p); b += np.linalg.solve(X.T@(X*W[:,None]), X.T@(s-p))
>     return lambda z: 1/(1+np.exp(-(np.c_[np.ones(len(z)), z]@b)))
> x = np.r_[xs, xt]; s = np.r_[np.ones(len(xs)), np.zeros(len(xt))]
> f = logit_fit(x, s); ps_s, ps_t = f(xs), f(xt)
> L = lambda p: np.log(p/(1-p))
> k = 10; edges = np.quantile(np.r_[L(ps_s), L(ps_t)], np.linspace(0, 1, k+1)); edges[0] -= 1; edges[-1] += 1
> ws = np.histogram(L(ps_s), edges)[0]/len(xs); wt = np.histogram(L(ps_t), edges)[0]/len(xt)
> beta = np.sqrt(ws*wt).sum()
> lo, hi = np.percentile(L(ps_s), [5, 95]); outside = np.mean((L(ps_t) < lo) | (L(ps_t) > hi))
> print(round(smd,2), round(beta,3), round(outside,3))   # 1.52  0.755  0.45
> ```
> Reading: an SMD of 1.5 and 45% of the target outside the study's 5th-95th PS percentiles signal heavy extrapolation; the index of 0.755 sits between the review's "very challenging" (<0.5) and "high" (>0.9) thresholds. (Outputs verified; the C-statistic of the selection model on this toy is 0.86.)
^example-dissimilarity-python

## Examples

> [!example] Marketing: how different is the rollout from the test?
> Pool the 20 test DMAs and 200 rollout DMAs; fit a selection model on market size, digital share, awareness, seasonality index; report (i) SMDs of each modifier, (ii) the share of rollout DMAs outside the 5th-95th selection-score range of the test markets, (iii) the generalizability index. If (ii) is large, the headline "test lift" is an extrapolation for those DMAs and the recommendation is (per Sec. 4.3's closing guidance) to restrict the rollout claim to markets the test represents, or run a supplementary test in the poorly covered tier. For outcome checks (4.2), compare *control-arm* sales trajectories of the test markets, weighted to the rollout covariate mix, with actual pre-period sales of the rollout markets: a gap flags unmeasured modifiers such as local competition.

## Connections

- Failure of these diagnostics motivates the heterogeneity tests in [[Degtiar 2023 - Testing Treatment Effect Heterogeneity]] and the estimators in [[Degtiar 2023 - Weighting and Matching Methods]].
- Propensity-score balance diagnostics for *treatment* assignment: [[Propensity Score Matching - Overview]].
- Covariate-shift detection by classification is the classification view used in domain adaptation (see [[Degtiar 2023 - Doubly Robust and Combined Methods]]).

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
