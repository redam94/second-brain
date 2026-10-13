---
title: Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - topic/propensity-score
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) §6.1-6.3 pp. 23-29, eq. (29), fn. 15-18, Figs. 5-6 (p. 27, p. 29; per-panel read-offs); Online Appendix Figs. A-1 to A-7 (pp. A-1 to A-7)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]"
  - "[[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]]"
  - "[[Covariate Balance Diagnostics]]"
  - "[[Common Support and Overlap]]"
used_by:
  - "[[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]"
  - "[[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]"
aliases:
  - Gordon 2019 Bootstrap Procedure
  - Pacing as Exogenous Exposure Variation
  - Gordon 2019 Balance Diagnostics
  - Gordon 2019 Figures 5 and 6
---

# Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics

> [!summary]
> Section 6 of Gordon et al. (2019). (6.1) Identification relies on three sources of quasi-random exposure: **budget pacing**, **other advertisers' unrelated budgets and bids**, and **random timing of user visits**. (6.2) The propensity score is a logistic regression on a large dictionary of dummies and interactions, with variables chosen by the Belloni-Chen-Chernozhukov-Hansen LASSO. Scores are trimmed to [0.05, 0.95] and refit. Lift comparisons use a **joint bootstrap** (S = 2,000) that re-estimates RCT and observational lift on the same resample, so the covariance in the test statistic (eq. 29) is accounted for. PSM uses subsampling instead. (6.3) Matching balances the propensity score and covariate means very well (standardized differences below 0.1), and the estimates are **still biased** (§7). Balance on observables is necessary but not sufficient.

^summary-gordon-et-al-2019-propensity-estimation

## Overview

This section closes the obvious objections to the main result: that the propensity model was too crude, that inference ignored the dependence between the two estimates, or that the methods failed because they did not balance. The authors follow Imbens's (2015) best-practice checklist. Because the methods pass every diagnostic, the failures in [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] point to **unobserved** confounding rather than poor execution.

## Main Content

### 6.1 Identification — where exogenous exposure variation comes from

> [!definition] Three sources of quasi-random exposure (§6.1, pp. 23-24)
> 1. **Pacing.** The advertiser sets a budget and campaign length. The pacing system usually aims to spend smoothly over the campaign (fn. 15 cites Facebook's pacing API documentation). *Worked illustration from the paper:* a $100,000 four-week campaign has spent $50,000 after week one, so the system **down-weights the advertiser's bids** to avoid running out early. The bid adjustments it learns vary by ad type, audience and time of day, so a campaign's impressions "always contain some variation that is plausibly exogenous to potential user outcomes".
> 2. **Other advertisers' budgets and bids.** Pacing also depends on every rival targeting the same audience. Some rivals' preferences are unrelated to the focal outcome: "a luxury automaker and a yogurt manufacturer may both value the same segment of consumers, but it is hard to imagine how one firm's outcomes could be related to the other firm's ad bids."
> 3. **Visit timing.** When a user visits is shaped by "a plethora of random factors specific to that user (e.g., local weather, work schedule, just missing a subway, etc.)".
>
> These produce exogenous variation across users and over time. The user, targeting and competitive mechanisms of §2.3 produce confounding variation ([[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]]). Under unconfoundedness, the observables must absorb the second without absorbing the first.

^def-g19-exog

### 6.2 Estimation and inference

**Propensity model.** A logit, $e(x;\phi)=\dfrac{\exp(x'\phi)}{1+\exp(x'\phi)}$. Integer variables are expanded into full dummy sets (e.g. one dummy per age). Interactions and higher-order terms are generated within and across the four variable sets, for both dummies and continuous covariates. This yields many weak predictors, so variables are selected by the **LASSO variant of Belloni, Chen, Chernozhukov & Hansen (2012)**, which chooses the penalty with an iterative, data-dependent rule. For RA, IPWRA and STRATREG a second LASSO predicts $Y_i$. The **union** of the variables selected for treatment and for outcome is kept. This is the post-double-selection idea and is close to [[DML Estimators for ATE and the Interactive Model]]. Footnote 16 says more flexible propensity models (nonparametric, ML, deep learning) were tried and "did not produce significantly different treatment effects."

**Trimming** (Imbens 2015). Refit the logit on the selected variables, drop observations with $\hat e<0.05$ or $\hat e>0.95$, and re-estimate on the trimmed data ([[Common Support and Overlap]]).

**Two inference problems.**
1. Lift is a ratio. The ATT numerator has a model-based SE. The denominator's exposed mean has a simple Bernoulli SE. But numerator and denominator are dependent, so their covariance is needed.
2. RCT and observational lifts come from the same sample, so testing whether they are equal needs their covariance:

> [!definition] Test of equal lifts (§6.2, eq. 29)
> $$
> t=\frac{\tau_\ell-\tau_\ell^m}{\sqrt{\operatorname{Var}(\tau_\ell)+\operatorname{Var}(\tau_\ell^m)-2\operatorname{Cov}(\tau_\ell,\tau_\ell^m)}}\tag{29}
> $$
> The sign of the covariance is hard to know in advance, so it is unclear which way ignoring it would bias the test.

^def-g19-ttest

> [!algorithm] Joint bootstrap for RCT-vs-observational comparisons (§6.2, pp. 25-26)
> For a given observational model $m$:
> 1. **Variable selection.** Run the modified LASSO on $W_i$ to get $\tilde X^W\subset X$. If $m$ has an outcome model, also run it on $Y_i$ to get $\tilde X^Y$. Keep $\tilde X=\tilde X^W\cup\tilde X^Y$. (Selection is done once, outside the bootstrap.)
> 2. **Bootstrap.** For $s=1,\dots,S$, draw $N$ users with replacement from the **complete experiment** (test and control). Then:
>    a. estimate the RCT ATT $\tau$ and lift $\tau_\ell$;
>    b. discard the control group;
>    c. *trimming*: estimate $e(x,\hat\phi)$ on $x\in\tilde X$, drop $\hat e<0.05$ or $\hat e>0.95$, re-estimate on the trimmed sample;
>    d. estimate $\tau^m$ and $\tau^m_\ell$ with model $m$ on the trimmed data.
> 3. **Inference.** Compute SEs and CIs from the bootstrap draws of $(\tau,\tau^m,\tau_\ell,\tau_\ell^m)$, and $\operatorname{Cov}(\tau_\ell,\tau_\ell^m)$ for eq. 29. The paper reports **bias-corrected** SEs with **S = 2,000**.
>
> **Exception for PSM** (fn. 17): Abadie & Imbens (2008) show the ordinary bootstrap is invalid for matching estimators. Valid alternatives include subsampling (Politis & Romano 1994) and the m-out-of-n bootstrap (Bickel, Götze & van Zwet 1997). The paper uses **subsampling** for PSM lift. This is why some PSM comparisons in Figs. 8-10 are marked "cannot draw an inference".

^alg-g19-bootstrap

### 6.3 Assessing balance

Unconfoundedness cannot be tested, so the authors check the two things that can be checked (following Imbens & Wooldridge 2009, Gelman & Hill 2007):

1. **Propensity-score overlap and balance.** Histograms of $\hat e$ by exposure status before and after matching. Footnote 18 quotes Imbens & Wooldridge (2009, p. 43): "a direct way of assessing the overlap in covariate distributions is to inspect histograms of the estimated propensity score by treatment status".
2. **Covariate balance.** The **standardized difference** in means between exposed and unexposed users, before and after matching:

> [!definition] Absolute standardized difference (§6.3, p. 28)
> $$
> d_k=\frac{|\bar x_{k,\text{exposed}}-\bar x_{k,\text{unexposed}}|}{s_{k,\text{pooled}}}
> $$
> This is the difference in means of covariate $k$ divided by the pooled SD across exposed and unexposed users. It is used instead of a $t$-statistic because a $t$ "might be large if the sample is large, even if the difference is substantively small". The rule of thumb is that $d_k$ should not exceed **0.25** (Stuart & Rubin 2007). See [[Covariate Balance and Matching Diagnostics]].

^def-g19-stddiff

> [!example] Study 4 balance results (Figs. 5-6, pp. 26-29)
> **Figure 5: propensity densities by exposure, four panels for variable sets 1-4, each unmatched and matched.**
> - As covariate sets are added, the *unmatched* exposed and unexposed densities **separate more**, which shows the added predictive power. Support is [0.05, 0.95] because of trimming.
> - Unmatched densities overlap substantially but differ in shape. After matching, "the matched lines overlap perfectly in the plots."
>
> **Figure 6: absolute standardized differences before (x-axis) vs after (y-axis) PSM, one panel per variable set, markers by group (FB, Census/ACS, user activity, match score).**
> - Balancing on set 1 only: FB variables start at up to about 0.4 SD and fall **below 0.1 SD**. Census, activity and match-score variables stay imbalanced, some close to **1 SD**.
> - Each added set brings its own variables into balance. With all four sets, "conditioning on the full set of observables eliminates nearly all differences in means across variables."
>
> **All other studies** (Online Appendix): Fig. A-1 (checkout, Studies 1-5, 7), Fig. A-2 (checkout, Studies 8-15) and Fig. A-3 (registration, Studies 1, 5, 8, 10, 14; page view, Studies 2, 5, 6) show propensity densities with set 4. Figs. A-4/A-5 (checkout, Studies 1-5, 7-9 and 10-15), A-6 (registration) and A-7 (page view) show standardized differences. Balance is achieved "in each study". Because the studies are so large there are always enough unexposed users to match, though matching **with replacement** is needed when most of the test group is exposed.

^ex-g19-balance

### Figure 5 read-off: Study 4 propensity densities by variable set (p. 27)

Figure 5 is titled "Study 4 density of estimated propensity scores by treatment and pre/post matching". It has four panel pairs, "Propensity Score, S4 Checkout, Variable set k" for k = 1-4. Each pair has an "Unmatched" plot above a "Matched" plot. The x-axis is the estimated propensity score (ticks 0, .2, ..., 1), with curves running from about 0.04 to 0.95-0.96 because of trimming. The y-axis is density, with ticks 0-3 for sets 1, 2 and 4 and 0-2.5 for set 3. The unexposed group is a dotted orange line and the exposed group a solid blue line. The values below are read off the plotted curves and are approximate.

| Variable set | Unexposed (unmatched) | Exposed (unmatched) | Crossing / separation | Matched panel |
|---|---|---|---|---|
| 1 | Shoulder about 2.55 at 0.19, main peak **about 3.2 at 0.28-0.30**. Falls to about 1.2 by 0.42 and about 0.5 by 0.6-0.7; near 0 above 0.8 | Peak **about 2.65 at 0.32**. Plateau about 1.25-1.4 over 0.42-0.70, then about 0.7 at 0.76-0.83; 0 at 0.95 | Curves cross near 0.35. Mass below 0.3 is mostly unexposed; mass above 0.4 is mostly exposed | Both lines follow the exposed curve (peak about 2.65 at 0.32, plateau about 1.3, shoulder about 0.7 near 0.8) |
| 2 | Single peak **about 3.0 at 0.28** (no separate shoulder); about 1.0 by 0.45; near 0 above 0.8 | Peak **about 2.35 at 0.32-0.33**. Plateau about 1.25 over 0.47-0.70, about 0.7 near 0.8 | Cross near 0.35; very similar to set 1 | Both follow the exposed curve (peak about 2.35 at 0.33) |
| 3 | **Bimodal**: sharp spike about 2.1 at 0.07, dip about 1.6 at 0.2, second peak **about 2.3 at 0.34**; about 0.6 at 0.6; 0 near 0.95 | Rises from about 0.3 at 0.07 and 0.55 at 0.2 to a peak **about 2.0 at 0.39-0.40**. Plateau about 1.35 over 0.55-0.73; about 0.9 at 0.8 | Cross near 0.40. The new low-propensity spike for unexposed users is the activity variables at work | Both follow the exposed curve (peak about 2.0 at 0.40, plateau about 1.35) |
| 4 | Spike **about 2.8 at 0.07-0.08**, then a **monotone decline** to about 1.2 at 0.42 and about 0.3 at 0.8, reaching 0 at 0.96 | **Monotone rise** from about 0.35 at 0.08 to about 1.15 at 0.42, flattening at **about 1.45 over 0.75-0.82**, then a steep drop to about 0.2 at 0.96 | Single crossing at about 0.42 (density about 1.15). This is the clearest separation of the four sets | Both follow the exposed curve (rising to about 1.45 near 0.8) |

*Reader's notes.*
- The text's claim that densities "exhibit greater separation" as covariates are added holds mainly for the step from set 2 to set 3, and most strongly from set 3 to set 4. Sets 1 and 2 look almost the same. This agrees with Fig. 6: the census variables (set 2) add little, while the activity variables and the match score reshape the distributions.
- The matched curve in every panel is the **exposed** density. PSM targets the ATT, so it reweights unexposed matches to the exposed distribution (matching with replacement). It does not meet the two curves in the middle.
- The overlap condition (§4.1) visibly holds in every panel: both groups have positive density across (0.05, 0.95). Even at set 4, the exposed density is still about 0.35 at $\hat e\approx0.08$ and the unexposed about 0.1 near 0.9.

^ex-g19-fig5-readoff

### Figure 6 read-off: Study 4 standardized differences by variable set (p. 29)

Figure 6 is titled "Absolute standardized differences of covariate means for Study 4". Each of its four panels ("Variable set 1"-"Variable set 4") plots every covariate as one marker. The x-axis is "Standardized difference before balancing" and the y-axis "Standardized difference after balancing", both running 0-1.2. Marker legend: orange circles = FB Vars, blue diamonds = Census/ACS Vars, maroon squares = User Activity Vars, green triangles = Match Score. A footnote reads "[*] The sets of variables correspond to those described on page 20." The panel for set *k* shows balance on **all** covariates after matching on a propensity model that uses only sets 1..*k*, so variables not yet in the model show how much balance "spills over". Values are approximate read-offs.

| Panel (PS model uses) | FB variables (orange) | Census/ACS (blue) | User activity (maroon) | Match score (green) |
|---|---|---|---|---|
| Set 1 (FB) | Before up to **about 0.40**; after **≤ about 0.09** | Before up to about 0.23; after **about 0.05-0.12** (partly reduced, not targeted) | Cluster before 0.15-0.23 → after 0.15-0.19 (barely moved); one at 0.36 → 0.24; outlier **0.68 → 0.59** | Before **0.13-1.0**; after **0.14-0.82** (three points near 0.92-1.0 stay at 0.75-0.82) |
| Set 2 (+ Census) | Before up to about 0.40; after ≤ about 0.07 | Before up to about 0.22; after **about 0.02 or less** | As in set 1: cluster 0.15-0.22 → 0.14-0.19; 0.36 → 0.24; **0.68 → 0.59** | As in set 1: top points 0.92-1.0 → **0.72-0.79** |
| Set 3 (+ Activity) | Before up to about 0.40; after ≤ about 0.08 | All after ≈ 0 | **All after ≈ 0**, including one at 0.50 before | Still imbalanced: before 0.10-0.90; after up to **about 0.60** (points at 0.84-0.90 → 0.57-0.60; mid-range 0.2-0.44 → 0.15-0.27) |
| Set 4 (+ Match score) | Before up to about 0.37; after ≤ about 0.08 | ≈ 0 | ≈ 0 | Before up to **about 0.83** (points at 0.55, 0.56, 0.75, 0.81, 0.83); after **≤ about 0.04** |

*Reader's notes.*
- The figure behaves as the text describes (p. 28). Each added set balances its own variables, the full set brings everything below about 0.08, and that is well under the 0.25 Stuart-Rubin threshold.
- The **match score is the variable least affected by spillover**. Balancing on demographics, census and even activity leaves the match score up to 0.6-0.8 SD imbalanced. This is the visual counterpart of Fig. 11 and Table 6, where M is the strongest predictor of exposure ([[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]).
- The "before" positions are not identical across panels. For example, the highest match-score points sit at 0.92-1.0 in sets 1-2, at 0.84-0.90 in set 3 and at 0.75-0.83 in set 4. This is most plausibly because trimming to $\hat e\in[0.05,0.95]$ is redone for each propensity model, so each panel's "before" sample differs slightly. The paper does not comment on this.

^ex-g19-fig6-readoff

### Per-study balance panels (Online Appendix Figs. A-1 to A-7, pp. A-1 to A-7)

The paper's text says only that balance is achieved in every study. The panels below are read off the figures and are approximate (they are not printed values). Propensity panels show kernel densities of $\hat e$ (variable set 4) on the trimmed support [0.05, 0.95]. The unexposed group is a dotted orange line and the exposed group a solid blue line, shown unmatched (top) and matched (bottom).

**Figs. A-1/A-2: propensity densities, checkout (Studies 1-5, 7-15).** In **every** matched panel the two densities lie on top of each other. The *unmatched* panels show four shapes of selection:

| Pattern (unmatched) | Studies | What it looks like |
|---|---|---|
| Strong separation: unexposed piled near 0, exposed spread to the right | S2, S3, S4, S5, S8, S11, S14 | Unexposed density spikes around $\hat e\approx0.05$-$0.15$ (peak heights about 3-4). Exposed mass is flat or rising toward 0.8-0.95 (S2, S3, S11 have exposed spikes near 0.9). S5 and S8 have exposed humps centred near 0.3-0.4. |
| Both groups concentrated at **high** propensity (most of the test group exposed) | S1, S10, S12, S15 | S1: both peak around 0.85-0.9, with the exposed peak sharper (about 5). S10: exposed peak near 0.88; unexposed is bimodal (about 0.08 and 0.7). S12: unexposed peak about 0.75, exposed about 0.85. S15: exposed spike (about 7) near 0.92; unexposed flat. These match Table 4 exposure shares of 76%, 65%, 77% and 81%. |
| Both groups concentrated at **low** propensity | S9, S13 | S9 (only 6.6% exposed): both densities peak at about 0.05-0.15. The unexposed spike reaches about 9.5 and the exposed about 4, with almost no mass above 0.4. S13: unexposed peak about 0.1-0.2, exposed peak about 0.45. |
| Bimodal exposed density | S7 | Unexposed peak about 0.25. Exposed has a hump near 0.55 and a spike near 0.93. |

**Fig. A-3: registration (S1, S5, S8, S10, S14) and page view (S2, S5, S6).** These panels look the same as the checkout panels for the same study (e.g. S1 registration matches S1 checkout, and S2 page view matches S2 checkout). That is expected: the propensity model uses $X$ and $W$ only, so it does not depend on which outcome is analysed. S6 page view, which appears only here, shows the strong-separation pattern: unexposed spike near 0.08 and exposed spike near 0.92. All matched panels again overlap.

**Figs. A-4 to A-7: absolute standardized differences, before (x) vs after (y) PSM with set 4**, with markers by group (FB, Census/ACS, user activity, match score). Axes run 0-1, except Fig. A-7 (page view) at 0-1.2.

| Study / outcome | Largest pre-matching differences (approx.) | Post-matching residuals (approx.) |
|---|---|---|
| S1 checkout / registration | Match score about 0.4-0.43; activity about 0.29 | **Largest residuals in the appendix**: match score about 0.08-0.09 after; one FB variable about 0.13 |
| S2 checkout / page view | Match score about 0.7; activity about 0.63; FB about 0.42 | Up to about 0.06-0.08 |
| S3 checkout | **Activity variable about 0.9**; match score 0.53-0.66 | Match score and one FB variable about 0.07-0.10 |
| S4 checkout | Match score about 0.75-0.83 | Below about 0.05 (Fig. 6 set-4 panel; see [[#^ex-g19-fig6-readoff|Fig. 6 read-off]]) |
| S5 checkout / registration / page view | Match score up to about 0.77 | About 0 |
| S7 checkout | Match score about 0.68; activity about 0.6 | Below about 0.06 |
| S8 checkout / registration | Match score about 0.87 | About 0.03 |
| S9 checkout | All below about 0.42 | About 0 |
| S10 checkout / registration | **Activity about 0.86**; match score about 0.47 | About 0.02-0.04 |
| S11 checkout | **Match score up to about 0.93**; FB about 0.6 | About 0.03-0.05 |
| S12 checkout | All below about 0.41 | About 0.01-0.02 |
| S13 checkout | Below about 0.39 | Match score about 0.06 |
| S14 checkout / registration | FB variable about 0.7 | About 0.06 at most |
| S15 checkout | Activity about 0.63 | Activity about 0.05-0.07 |
| S6 page view | **Match score about 1.12**; activity about 0.83 | Match score about 0.07; activity about 0.08 |

Every post-matching value is well below the 0.25 rule of thumb. The variables most imbalanced before matching are nearly always the **match score** or **user-activity** variables. These are also the variables Fig. A-14/A-15 show to be strong predictors of *exposure* ([[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]). Studies where balance was easy (S9, S12, S13) include the worst-performing one (S9). This is a concrete case of "balance on $X$ is not identification".

^ex-g19-balance-per-study

**What this shows.** Balance was achieved everywhere, and §7 then shows large biases anyway. Balance on $X$ cannot detect confounding by variables outside $X$. This is the main lesson the section feeds into [[Propensity Score Matching - Balancing Theorem and Failure Modes]].

## Examples

> [!example] A generic validation pipeline modeled on §6.2
> To benchmark an attribution or observational lift model against a holdout test, resample *users from both arms together*. In each resample compute the experimental lift on the full sample and the model's lift on the test arm only, then form eq. 29 from the paired draws. Bootstrapping the two estimates separately leaves out $\operatorname{Cov}(\tau_\ell,\tau_\ell^m)$, which can be large because both share the exposed users' outcomes. Fix variable selection before resampling to keep it cheap, and use subsampling for any nearest-neighbor matching step.

^exa-g19-propensity-estimatio-1

## Connections

- The three exogenous sources (pacing, unrelated rivals, visit timing) are the same quasi-random variation the 2023 follow-up suggests exploiting directly, e.g. budget-pacing inclusion ([[Experimental Benchmarks for Observational Ad Measurement]]).
- Bootstrap failure for matching and subsampling remedies: compare [[SDID Inference - Bootstrap, Jackknife and Placebo]] and [[Simultaneous Inference via Multiplier Bootstrap]].
- LASSO variable selection for nuisance models: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] covers how stable LASSO-selected sets are.
- Fixing the selection step outside the resampling loop leaves some selection uncertainty out of the SEs. This is a mild case of the issue in [[Garden of Forking Paths]].

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]
- [[Covariate Balance Diagnostics]], [[Propensity Score Matching - Overview]]
