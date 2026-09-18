---
title: Experimental Benchmarks for Observational Ad Measurement
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - topic/propensity-score
  - topic/double-machine-learning
  - type/application
  - doc/paper
source:
  - "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
  - "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "Gordon et al. 2019 (working paper Apr 2018; Marketing Science 38(2)) §1, §4.1-4.3 eq. (17)-(28), §5 Table 2, §6.1, §7.2-7.3 Table 5, Fig. 10, §8 Fig. 11, Table 6, §9; Gordon, Moakler & Zettelmeyer 2023 (arXiv 2201.07055v2) §1, §3.3, §5.1-5.4 eq. (10)-(26), Tables 3-6, §6, §7.1; Lewis & Rao 2015 §II.B"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Conversion Lift Studies on Ad Platforms]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
  - "[[Propensity Score Matching - Overview]]"
  - "[[Propensity Score Matching - Balancing Theorem and Failure Modes]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - LaLonde for Advertising
  - Gordon Zettelmeyer Facebook Benchmarks
  - Close Enough Non-Experimental Ad Measurement
  - RCT vs Observational Ad Measurement
  - Within-Study Comparison for Ad Effects
---

# Experimental Benchmarks for Observational Ad Measurement

> [!summary]
> Two Facebook studies apply LaLonde's (1986) within-study-comparison logic to advertising: take an RCT, **throw away the randomized control group**, estimate the ad effect from exposed vs unexposed users in the test arm with observational methods, and compare with the RCT's ATT lift. **Gordon, Zettelmeyer, Bhargava & Chapsky (2019)**: 15 experiments, 500M user-observations; exact matching, propensity-score matching, stratification, regression adjustment, IPWRA and stratified regression with rich covariates. Observational estimates mostly **overstate** lift, sometimes understate it, no method dominates, and "in half of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods." **Gordon, Moakler & Zettelmeyer (2023)**: 663 representative experiments, >5,000 user features including the platform's own predicted action rates, deep-learning nuisance models, stratified PSM and **double/debiased ML**. Median RCT lifts of 29% / 18% / 5% (upper / mid / lower funnel) become 173% / 176% / 64% under SPSM and 83% / 58% / 24% under DML. Their verdict: "more of a 'data problem' than a 'model problem'."

## Overview

[[Activity Bias in Advertising]] and [[Observational vs Experimental Methods in Advertising]] record the first such comparison (Lewis, Rao & Reiley 2011), which had to use unexposed international users as a comparison group. The Facebook studies are the large-scale, modern-methods sequel. Their design mirrors the practitioner's situation exactly: "an advertiser ... followed customary practice by choosing a target sample and making all users eligible to see the ad. Although all users in the sample are eligible to see the ad, only a subsample is eventually exposed" (2019 §4). The only available comparison group is *eligible users who happened not to be exposed* — unlike LaLonde, where controls came from a separate survey.

The ground truth is the [[Conversion Lift Studies on Ad Platforms|Conversion Lift]] ATT lift ([[From ITT to Treatment-on-the-Treated in Ad Experiments#^def-lift|definition]]). The observational estimates target the same ATT, under **unconfoundedness** ([[Conditional Independence Assumption]]) and **overlap** ([[Common Support and Overlap]]):
$$
(Y_i(0),Y_i(1))\perp W_i\mid X_i,\qquad 0<\Pr(W_i=1\mid X_i)<1 .
$$

## Main Content

### What must be undone

Selection into exposure within the test arm has three sources (2019 §2.3): user activity, targeting optimization, and auction competition. Identification has to come from residual quasi-random variation (2019 §6.1): **budget pacing** (the system throttles bids to spend smoothly), **unrelated advertisers' bids** ("a luxury automaker and a yogurt manufacturer may both value the same segment"), and the **idiosyncratic timing of user visits**. The methods must "control for the endogenous variation without absorbing too much of the exogenous variation."

A structural caveat (2019 §4.3): as targeting becomes more deterministic, "the propensity score distribution would collapse to discrete masses at 0 and 1" given the platform's true information set, destroying common support. Observational methods work only to the extent the platform is *not* perfectly optimized — the failure mode catalogued in [[Propensity Score Matching - Balancing Theorem and Failure Modes]].

### Study 1 — fifteen experiments, six estimators (2019)

**Estimators** (§4.2), all targeting the ATT:

| Code | Method | Key formula |
|---|---|---|
| EU | Exposed vs unexposed difference | raw selection + treatment |
| EM | Exact matching on age and gender | $\hat\tau=\frac1{N_e}\sum_i W_i(Y_i-\hat Y_i(0))$, $\hat Y_i(0)$ the mean of exact matches |
| PSM | Nearest-$M$ matching with replacement on the logit propensity $\ell(x)=\ln\frac{e(x)}{1-e(x)}$ | as above |
| STRAT | Stratification on $\hat e(x)$ with data-driven strata (Imbens & Rubin) | $\hat\tau=\sum_j\frac{N_{1j}}{N_1}\hat\tau_j$ |
| RA | Regression adjustment, $\mu_0(x)$ fit on unexposed | $\frac1{N_e}\sum_iW_i[Y_i-\mu_0(X_i;\hat\beta_0)]$ |
| IPWRA | Doubly robust: outcome regression weighted by $1/(1-e(X_i))$ | consistent if either model is right |
| STRATREG | Regression within propensity strata | weighted average of $\hat\tau_j$ |

**Covariate sets**, added cumulatively (§5): (1) Facebook profile variables (age, gender, tenure, friends, phone OS); (2) about 40 Census/ACS variables by zip code; (3) **user-activity** deciles by device from the prior week, aimed at activity bias; (4) a **match score**, "a composite metric ... that summarizes thousands of behavioral variables", Facebook's look-alike similarity measure.

**Selection to overcome — Study 4** (Table 5): exposed users are older (29.3 vs 26.4), more female (96% vs 88%), more often married (19% vs 8%) and more mobile-heavy. Conversion rates of exposed vs unexposed users imply a lift of **316%** against an RCT lift of **73%**. Stratification gets to 99%; with all covariates STRATREG reaches 74% — a success. But Study 4 is the friendly case.

> [!theorem] Headline findings (2019 §7.3, Fig. 10) ^thm-g19
> 1. Observational methods "mostly overestimate the RCT lift, although in some cases, they can significantly underestimate" it (Studies 7, 10, 13, 15 flip sign or fall below the RCT).
> 2. "The point estimates in seven of the 14 studies with a checkout-conversion outcome are consistently off by more than a factor of three."
> 3. Registration and page-view outcomes are approximated better than purchases: unexposed users rarely reach campaign-specific pages, so there is little baseline to be selected on.
> 4. More covariates help, but "adding census data and activity variables helps less than the Facebook match variable."
> 5. "We do not find that one method consistently dominates."

Selected rows of Fig. 10 (checkout outcome, lift in %):

| Study | RCT | EU (Table 6) | EM age+gender | PSM, all covariates | STRATREG, all covariates |
|---|---|---|---|---|---|
| 1 | 30 | 217 | 116 | 93 | 51 |
| 2 | 1.3 | 377 | 432 | 36 | 40 |
| 4 | 73 | 316 | 222 | 95 | 74 |
| 7 | 2.7 | 131 | 37 | -36 | -33 |
| 9 | 2.4 | 4,074 | 3,414 | 1,710 | 1,656 |
| 12 | 1.2 | 233 | 129 | 82 | 82 |
| 15 | 2.4 | 126 | 26 | -13 | -14 |

> [!definition] Bias-reduction ratio and the unobservable thought experiment (2019 §8) ^def-brr
> $$
> brr=\frac{|\text{STRAT lift}-\text{RCT lift}|}{|\text{EU lift}-\text{RCT lift}|}
> $$
> is the share of the selection effect *remaining* after stratification; across the 14 checkout outcomes it ranges from 0.4% (Study 11) to 63% (Study 5), with a median of about 16% (Table 6). Following Rosenbaum & Rubin (1983) and Ichino et al. (2008), the authors simulate an unobservable $U$ that would restore unconfoundedness and express its strength relative to all observed covariates, $R^2_{Y,rel}=[R^2_Y(X,U)-R^2_Y(X)]/R^2_Y(X)$ and likewise for $W$. Study 4 needs a $U$ only as strong as the Census block; Study 1 needs one as strong as the match score; Study 9 needs "between 5 and 10 times as much explanatory power as the observables in our data." Activity and match-score variables explain *exposure* far more than *outcomes* — they are good predictors of treatment but weak deconfounders.

### Study 2 — 663 experiments, deep nets and DML (2023)

Design upgrades: a **representative** random sample of large US experiments; four feature groups (§3.3) — dense user descriptors and rolling activity measures, thousands of sparse interest features, **estimated action rates** ("a major factor in determining the winner of ad auctions"), and up to 30 days of lagged conversions; propensity and outcome models fit as deep networks with three-fold cross-fitting — 5,019 of each.

- **SPSM**: stratify on $\hat e(X)$ into 100 equal-width strata; $\hat\tau=\sum_j (N_{1j}/N_1)\hat\tau_j$ (eq. 12-14).
- **DML** (Chernozhukov et al. 2018): $Y=g(W,X)+u$, $W=e(X)+\nu$, target $\tau=E[g(1,X)-g(0,X)\mid W=1]$, estimated from the Neyman-orthogonal ATT score
$$
\psi=\frac{W\,(Y-g(0,X))}{N_1}-\frac{e(X)(1-W)(Y-g(0,X))}{N_1(1-e(X))}-\frac{W\tau}{N_1}
$$
with cross-fitting ($N_1$ is the treated share; this is the standard ATT score — the paper's eq. 20 prints the residual as $Y-g(W,X)$). This is the ATT analogue of the interactive-model score in [[DML Estimators for ATE and the Interactive Model]].

Propensity-model AUCs range from 0.6 to 0.95, median 0.76.

> [!theorem] Headline findings (2023 §5.3-5.4, Tables 3-6) ^thm-g23
> | | Upper funnel | Mid funnel | Lower funnel |
> |---|---|---|---|
> | Median RCT lift | 29% | 18% | 5% |
> | Median SPSM lift | 173% | 176% | 64% |
> | Median DML lift | 83% | 58% | 24% |
> | Median absolute % error, SPSM | 696% | 948% | 764% |
> | Median absolute % error, DML | 557% | 488% | 672% |
>
> - Equality with the RCT lift is rejected for 91% (SPSM) and 75% (DML) of RCTs with significant lifts, and for 82% / 77% of those with insignificant lifts.
> - Both methods usually *reduce* the exposed-unexposed bias — the remaining-percentage-bias distribution, $RPB=[1-(APE_{e\text{-}u}-APE_m)/APE_{e\text{-}u}]\times100$, sits mostly below 100% — but "not enough to come close". DML more often than SPSM makes things *worse* than the naive comparison.
> - Errors are multiplicatively largest where true lifts are smallest (first-decile APEs above 5,000%); absolute errors grow with the true lift.

**When do they do better?** (§6, random-forest on APE with partial-dependence plots): prospecting rather than remarketing campaigns ("remarketing introduces additional endogeneity"); **low control-group conversion rates** ("if untreated users do not convert, no selection effect needs to be corrected"); more users; upper-funnel outcomes; **lower exposure rates** (a larger pool of unexposed comparison users); for SPSM, a better-fitting propensity model. "Even in these settings, the average percentage error of both observational methods remains high."

**Why it fails** (§1, §7). Selection happens *per auction*. Undoing it would require features that model the probability that the ad "(1) participates in the auction, (2) wins the auction, conditional on participating ... and (3) is actually impressed", logged and retained at bid-request level — "hundreds of relevant data points" for "billions of auctions every day". User-level features observed before the campaign cannot reproduce that information set. The authors "conjecture that the data at the disposal of data scientists at advertisers, their third-party measurement partners, and advertising platforms would do no better."

**Paths forward** (§7.1): (i) log auction-level data (Tunuguntla's custom-DSP approach); (ii) exploit existing quasi-randomness such as budget-pacing inclusion; (iii) **inject randomness** — run RCTs on a subset of campaigns and learn a campaign-level model predicting incremental lift from cheap proxy metrics such as last-click conversions (Gordon et al. 2022), or randomize at the bid level; (iv) study decisions rather than estimates — "a biased causal effect does not necessarily lead a decision maker to the wrong decision."

### Why this was predictable

Lewis & Rao's arithmetic ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise#^thm-r2-t|$R^2$ theorem]]): a profitable campaign explains about $5\times10^{-6}$ of outcome variance, so residual confounding with a partial $R^2$ of $10^{-4}$ is twenty times the signal. Compare "wage/schooling regressions, in which the endogeneity has often been found to be 10-30% of the treatment effect." No achievable covariate set closes a gap of that relative size, and the deconfounder that would — the platform's per-auction state — is not stored.

## Examples

**A within-study comparison you can run on your own lift test.** Any advertiser with user-level exposure logs from a test arm plus the RCT result can replicate the exercise, which is the most persuasive internal argument against exposure-based attribution.

```python
import numpy as np
from sklearn.model_selection import cross_val_predict
from sklearn.ensemble import HistGradientBoostingClassifier as GB

def att_dml(y, w, X, k=3):
    """Cross-fitted doubly-robust ATT on the test arm only (no holdout used)."""
    e  = cross_val_predict(GB(), X, w, cv=k, method="predict_proba")[:, 1]
    e  = np.clip(e, 1e-3, 1 - 1e-3)
    # outcome model for the untreated state; refit per fold in real use
    g0 = np.empty_like(e)
    folds = np.arange(len(y)) % k
    for f in range(k):
        tr = (folds != f) & (w == 0)
        g0[folds == f] = GB().fit(X[tr], y[tr]).predict_proba(X[folds == f])[:, 1]
    p1 = w.mean()
    return np.mean(w * (y - g0) - e * (1 - w) * (y - g0) / (1 - e)) / p1

# lift_obs = att / (y[w == 1].mean() - att);   compare with lift_rct from the holdout
# ape = abs(lift_obs - lift_rct) / lift_rct    # Gordon-Moakler-Zettelmeyer's error metric
```

Expect the pattern of Fig. 10: a large drop from the raw exposed-unexposed contrast, then a plateau well above the RCT lift however flexible the learners.

## Connections

- [[Propensity Score Matching - Overview]] and [[Propensity Score Matching - Balancing Theorem and Failure Modes]] — the 2019 paper achieves good balance on observables and is still badly biased: balance is necessary, not sufficient.
- [[Common Support and Overlap]] — deterministic targeting destroys overlap; higher exposure rates leave fewer comparison users.
- [[DML Estimators for ATE and the Interactive Model]] — DML removes regularization and overfitting bias, not omitted-variable bias; this is the cleanest empirical demonstration in the vault.
- [[Conditional Independence Assumption]] and [[Omitted Variables Bias]] — the assumption that fails, and the form of the failure.
- [[Activity Bias in Advertising]] and [[Observational vs Experimental Methods in Advertising]] — the earlier Yahoo! evidence.
- [[Conversion Lift Studies on Ad Platforms]] — the experimental ground truth.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — the signal-to-noise explanation.
- [[User-Level Ad Experiments - Overview]].

## See Also

- [[The Selection Problem]] — EU lift = treatment effect + selection bias, measured here at anywhere from about half the treatment effect (Study 5: EU 678% vs RCT 450%) to more than a thousand times it (Study 9: 4,074% vs 2.4%).
- [[Bayesian Inverse Probability Weighting]] — a Bayesian relative of IPWRA, subject to the same identification limits.
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — vault Q&A on when observational causal estimates can be trusted.
- [[Bayesian Estimation and Priors for MMM]] — why MMM priors should come from experiments rather than attribution or observational user-level models.
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — what to do when no user-level RCT is available.
