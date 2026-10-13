---
title: Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - type/example
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) §5 pp. 20-23, Table 1 (p. 21), Table 2 (p. 22), Fig. 4 (p. 23), fn. 14"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]]"
  - "[[Randomization Inference - Overview]]"
used_by:
  - "[[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]]"
  - "[[Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies]]"
  - "[[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]"
aliases:
  - Gordon 2019 Table 1
  - Gordon 2019 Table 2
  - Gordon 2019 Variable Sets
  - FB, Census, User-Activity and Match-Score Variables
---

# Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check

> [!summary]
> Section 5 of Gordon et al. (2019). It covers the 15 US Facebook conversion-lift RCTs from January-September 2015: about 2M to 141M users each, test shares from 17% to 85%, five verticals, 22 study-outcome pairs (14 checkout, 5 registration, 3 page view). It defines the **four nested covariate sets** used by every observational method: (1) Facebook profile and usage variables, (2) about 40 zip-level Census/ACS variables, (3) prior-week activity deciles by device, and (4) a machine-learned look-alike **match score** summarizing thousands of behavioral features. A randomization check on 1,251 test-vs-control mean comparisons gives p-values consistent with uniform (KS p = 0.4).

^summary-gordon-et-al-2019-study-sample-covariate

## Overview

The observational methods are only as good as their covariates. This section therefore explains what the authors could condition on and why they think it is *better* than what a typical advertiser or third-party vendor has. It also shows the experiments were properly randomized, which justifies using them as ground truth.

## Main Content

### Study selection (§5)

Two of the authors (Gordon and Zettelmeyer) chose the 15 studies using these criteria:
1. conducted after January 2015, when Facebook opened the experimentation platform to sufficiently large advertisers;
2. at least **1 million users**;
3. business-relevant conversion tracking in place;
4. **no retargeting campaign** by the advertiser;
5. no significant sharing of ads between users.

All were run January-September 2015, US-only, with users aged 18+. The sample is "not representative of all Facebook advertising (nor is it intended to be)" but covers retail, financial services, e-commerce, telecom and tech, a range of sizes and a mix of splits. The 2023 follow-up used a representative sample of 663 experiments ([[Experimental Benchmarks for Observational Ad Measurement]]).

### Table 1 — summary statistics (p. 21)

| Study | Vertical | Observations | Test | Control | Impressions | Clicks | Conversions | Outcomes |
|---|---|---|---|---|---|---|---|---|
| 1 | Retail | 2,427,494 | 50% | 50% | 39,167,679 | 45,401 | 8,767 | C, R |
| 2 | Finan. serv. | 86,183,523 | 85% | 15% | 577,005,340 | 247,122 | 95,305 | C, P |
| 3 | E-commerce | 4,672,112 | 50% | 50% | 7,655,089 | 48,005 | 61,273 | C |
| 4 | Retail | 25,553,093 | 70% | 30% | 14,261,207 | 474,341 | 4,935 | C |
| 5 | E-commerce | 18,486,000 | 50% | 50% | 7,334,636 | 89,649 | 226,817 | C, R, P |
| 6 | Telecom | 141,254,650 | 75% | 25% | 590,377,329 | 5,914,424 | 867,033 | P |
| 7 | Retail | 67,398,350 | 17% | 83% | 61,248,021 | 139,471 | 127,976 | C |
| 8 | E-commerce | 8,333,319 | 50% | 50% | 2,250,984 | 204,688 | 4,102 | C, R |
| 9 | E-commerce | 71,068,955 | 75% | 25% | 35,197,874 | 222,050 | 113,531 | C |
| 10 | Tech | 1,955,375 | 60% | 40% | 2,943,890 | 22,390 | 7,625 | C, R |
| 11 | E-commerce | 13,339,044 | 50% | 50% | 11,633,187 | 106,534 | 225,241 | C |
| 12 | Retail | 5,566,367 | 50% | 50% | 10,070,742 | 54,423 | 215,227 | C |
| 13 | E-commerce | 3,716,015 | 77% | 23% | 2,121,967 | 22,305 | 7,518 | C, R |
| 14 | E-commerce | 86,766,019 | 80% | 20% | 36,814,315 | 471,501 | 15,722 | C |
| 15 | Retail | 9,753,847 | 50% | 50% | 8,750,270 | 19,365 | 76,177 | C |

C = checkout, R = registration, P = page view. Every study except Study 6 has a checkout pixel (14 checkout outcomes). Five have registration and three have page view. *Reader's note:* Table 1 lists Study 14's outcome as C only, but Tables 3-4 and Fig. 10 also report a Study 14 **registration** outcome. Table 1 lists R for Study 13, but no Study 13 registration result is reported. The text's count of five registration studies matches Studies 1, 5, 8, 10, 14 in the results tables. In total there are about 500M user-experiment observations and 1.6B impressions (Abstract).

### The four nested covariate sets (§5, pp. 20-21)

Each observational model is estimated four times, adding one set at a time. Sets 1-2 are user-level and do not vary by time or study. Set 3 varies by user and time. Set 4 varies by user, time and study. The authors expected sets 3-4 "should especially help us account for activity bias".

> [!definition] Variable sets 1-4 (§5)
> 1. **FB variables**: age, gender, relationship status, days on Facebook, number of friends, friend requests sent, desktop and mobile access days in the last 7 and 28 days, phone OS, tablet OS, region, zip.
> 2. **Census variables** = set 1 + nearly 40 zip-level variables from the most recent Census/ACS, matched through Facebook's estimate of the user's zip.
> 3. **User-activity variables** = set 2 + for each device type (desktop, mobile, other) the user's **decile** of total ad impressions served in the week *before* the study, across *all* Facebook campaigns running that week. This captures both time on site and how far the user scrolls. Entered as a full set of decile-by-device dummies.
> 4. **Match score** = set 3 + "a composite metric of Facebook data that summarizes thousands of behavioral variables and is a machine-learning-based metric Facebook uses to construct target audiences similar to consumers an advertiser has identified as desirable" (fn. 14 points to Facebook's look-alike audience help page). For each study it measures similarity between exposed users and all other users. Including it and functions of it lets the propensity model "condition on a summary statistic for data beyond which we had direct access".

^def-g19-varsets

### Table 2 — description of variables (p. 22)

| Set | Variable | Description | Source |
|---|---|---|---|
| 1 | age | Age of user | FB |
| 1 | gender | 1 = female, 0 = otherwise | FB |
| 1 | rel status | married, engaged, in relationship, single, other | FB |
| 1 | FB age | Days since user joined FB | FB |
| 1 | friends | # of friends | FB |
| 1 | num initiated | # of friend requests sent | FB |
| 1 | web L7 / web L28 | # of last 7 / 28 days accessed FB by desktop | FB |
| 1 | mobile L7 / mobile L28 | # of last 7 / 28 days accessed FB by mobile | FB |
| 1 | mobile phone OS | OS of primary phone | FB |
| 1 | tablet OS | OS of primary tablet (if exists) | FB |
| 1 | region | region of residence | FB |
| 1 | zip | zip code of residence | FB |
| 2 | population, housingunits | population; # housing units in zip | ACS |
| 2 | pctblack, pctasian, pctwhite, pcthisp | racial/ethnic composition | ACS |
| 2 | pctunder18, pctmarriedhh, medhhsize | % under 18; % married households; median household size | ACS |
| 2 | yearbuilt, medhvalue, pcthowned, pctvacant, vehperh | housing age, value, ownership, vacancy; vehicles per household | ACS |
| 2 | pcths, pctcol, pctgrad | education shares | ACS |
| 2 | pctbusfinance, pctstem, pctprofessional, pcthealth, pctprotective, pctfood, pctmaintenance, pcthousework, pctsales, pctadmin, pctfarmfish, pctconstruction, pctrepair, pctproduction, pcttransportation | occupation / industry shares | ACS |
| 2 | income, pctpoverty, pctunemployed | average household income; % below poverty line; % unemployment | ACS |
| 2 | pctbadenglish | % residents with "bad" English | ACS |
| 3 | mobile / desktop / other activity | decile of users' FB activity by device | FB |
| 4 | match score | Composite variable of FB data | FB |

Notes to Table 2: the first three rows are self-reported. Region and zip come from geolocation. ACS data are from 2010.

### Randomization check (§5, Fig. 4)

> [!example] Uniformity of balance-test p-values (§5, p. 21; Fig. 4)
> **Procedure.** For every study and every variable, compare test and control means. That gives **1,251 p-values**.
> **Expectation under correct randomization.** The p-values should be Uniform(0,1).
> **Result.** 10% are below 0.10, 4% below 0.05 and 0.9% below 0.01. The histogram (Fig. 4, density roughly flat at 1 over [0,1]) looks uniform, and a **Kolmogorov-Smirnov test fails to reject uniformity (p = 0.4)**. No particular variables were more likely to be imbalanced. Conclusion: "we find no evidence that the randomization was implemented improperly."
> **Why this works.** It is a meta-test that treats the collection of balance tests as draws from their null distribution, instead of reading 1,251 tests one at a time (which would produce about 125 "significant" results at 10% by chance). Compare [[Multiple Testing Corrections]].

^ex-g19-randcheck

## Examples

> [!example] A generic practitioner analogue
> An analyst who audits a platform lift test can repeat the Fig. 4 check with whatever pre-period covariates the platform exports, such as prior-period purchase counts, region and device mix. Compute a test-vs-control p-value per covariate and per cell, pool them, and KS-test the pooled set against Uniform(0,1). A pile-up near 0 points to broken assignment, for example cookie churn or arm leakage, before any lift is read.

^exa-g19-study-sample-covaria-1

## Connections

- The match score is a model-built summary of thousands of features, close to the platform's own targeting signal. The 2023 follow-up went further and used the platform's **estimated action rates** directly ([[Experimental Benchmarks for Observational Ad Measurement]]).
- Why so many covariates still fall short: [[Omitted Variables Bias]], [[Conditional Independence Assumption]].
- Randomization checks as a validation step: [[Randomization Inference - Overview]], [[Fisher Randomization Test and the Sharp Null]].

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]] — how these sets enter the LASSO propensity model.
- [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]] — how much each set explains of exposure vs outcome.
