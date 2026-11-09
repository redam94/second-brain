---
title: "Allcott 2015 - Metadata Analysis of Site Selection Mechanisms"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Sec. 7, pp. 22-28, Tables 6-7, Figures 4-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]"
  - "[[Allcott 2015 - Opower Program, Selection Mechanisms and Data]]"
used_by:
  - "[[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]"
aliases:
  - "within-utility and between-utility selection decomposition"
  - "positive selection from population preferences"
---

# Allcott 2015 - Metadata Analysis of Site Selection Mechanisms

> [!summary]
> With effect estimates from all 111 sites, Allcott shows efficacy falls 0.173 pp per year of site start date, separates a within-utility decline (heavy-user targeting, then expansion) from a between-utility decline (environmentalist, high-income, non-IOU utilities adopt early), and shows the 111-site sample is *still* positively selected from the national population: naive extrapolation overpredicts by \$350-$710$ million. Site-level observables explain only just under a third of the early-late gap.

## Overview
Two questions: (i) why were the first ten sites positively selected from all 111, and (ii) is the 111-site sample positively or negatively selected from the nationwide population? Method: metadata regressions plus selection (probit) and outcome (OLS) equations at utility level; a variable that moderates both selection and the treatment effect identifies a selection mechanism.

## Main Content

### Empirical strategy

> [!definition] Cohort trend (eq. 5)
> $$
> \tilde\tau_s=\eta M_s+\kappa+\epsilon_s,
> $$
>
> $M_s$ = program start date in years, $\tilde\tau_s$ = frequency-adjusted ATE (percent or kWh/day); variant $\tilde\tau_s\mid X=\tilde\tau_s+\hat\alpha(\bar X-X_s)$ also adjusts for individual-level observables. $\eta<0$ means earlier sites are positively selected. Observations weighted by $1/\widehat{\mathrm{Var}}(\tilde\tau_s)$; random-effects meta-regression as robustness. ^def-cohort-trend

> [!definition] Within-utility trend (eq. 6)
> $$
> \tilde\tau_{su}=\lambda L_{su}+\omega_u+\epsilon_{su},
> $$
>
> $L_{su}$ = order of site $s$ within utility $u$; $\omega_u$ = 58 utility fixed effects. $\lambda<0$ means a utility's later sites do worse. If heavy-user targeting dominates, adding control mean usage $C_s$ should attenuate $\lambda$. Caveat: expansion is endogenous, so $\lambda$ is biased toward zero relative to the case in which all utilities expanded. ^def-within-utility-trend

> [!definition] Utility selection and outcome equations (eqs. 7-8)
> Selection: $D_u=1(\rho Z_u+\upsilon_u\ge0)$ (probit), run (a) early partner (first ten utilities, $D=1$) vs. the other 48 partners, and (b) current partner (58) vs. all 882 utilities. Outcome:
>
> $$
> \tilde\tau_{su}=\theta Z_u+\lambda L_{su}+\zeta C_s+\kappa+\xi_{su}
> $$
>
> over all 111 sites, standard errors clustered by utility. If $\rho$ and $\theta$ share a sign for a variable, that mechanism creates **positive selection**; opposite signs, negative. ^def-selection-outcome-equations

### Cohort and within/between-utility results

> [!example] Table 6 - cohort trends (frequency-adjusted ATE; robust SE in parentheses; inverse-variance weights)
> | | (1) All sites | (2) Within-utility | (3) Within + usage | (4) Between + L | (5) Between + L + C |
> |---|---|---|---|---|---|
> | **Percent ATE** | | | | | |
> | Site start date (years) | -0.173 (0.032) | | | -0.174 (0.035) | -0.175 (0.035) |
> | Within-utility start number | | -0.091 (0.033) | -0.059 (0.028) | 0.003 (0.027) | 0.006 (0.030) |
> | Control mean usage | | | 0.017 (0.004) | | 0.001 (0.002) |
> | R^2 / N | 0.22 / 111 | 0.65 / 73 | 0.76 / 73 | 0.22 / 111 | 0.22 / 111 |
> | **kWh/day ATE** | | | | | |
> | Site start date (years) | -0.077 (0.013) | | | -0.044 (0.013) | -0.054 (0.010) |
> | Within-utility start number | | -0.062 (0.016) | -0.002 (0.010) | -0.046 (0.009) | -0.000 (0.007) |
> | Control mean usage | | | 0.020 (0.002) | | 0.012 (0.001) |
> | R^2 | 0.17 | 0.65 | 0.93 | 0.28 | 0.72 |
>
> Columns 2-3 use utility fixed effects and multi-site utilities only (N = 73). Mean percent ATE 1.31%, mean level ATE 0.47 kWh/day. ^tbl-cohort-trends

Reading Table 6:
- Sites starting one year later have a **0.173 pp** (0.077 kWh/day) smaller ATE. Each of the first 11 sites had a frequency-adjusted ATE of at least 1.34%; 67 of the next 100 sites were below that (Figure 4). Using $\tilde\tau_s\mid X$ gives almost identical results (Appendix Table A12), so individual-level observables do not explain it.
- Within utility: the next site performs **0.091 pp** (0.062 kWh/day) worse than the previous. Adding control mean usage attenuates this (0.091 to 0.059 pp; kWh/day to about zero) — evidence that utilities started with heavy users, i.e., **intentional targeting on gains**.
- Between utilities (cols. 4-5): earlier utilities were positively selected. The programme has moved to higher-usage utilities (e.g., away from temperate coasts) and increasingly targets heavy-user subpopulations within utilities, but consumers are increasingly less responsive *in percent terms*.
- Time vs cohort: not fully separable, but unlikely time effects — results hold with site start date controlled, with controls for county wage and utility-usage changes (Great Recession), and Allcott-Rogers (2014) find effects grow over a programme's duration. Treatment frequency has no trend, and Opower believes the treatment improved over time, which would only strengthen the conclusion.
- Random-effects meta-regression gives essentially identical estimates (Appendix Table A11).

### Utility-level mechanisms

> [!example] Table 7 - utility-level selection and outcomes
> | Variable | (1) Early partner (probit, 58) | (2) Partner (probit, 882) | (3) ATE % | (4) ATE kWh/day | (5) ATE % + start date | (6) X-adjusted ATE % + start date |
> |---|---|---|---|---|---|---|
> | Utility mean usage | -0.068 | -0.007 | -0.040*** | -0.013*** | -0.038*** | -0.062*** |
> | Normalized population preferences | 0.808** | 0.337*** | 0.122** | 0.050** | 0.094** | 0.055 |
> | Normalized other programs | 0.093 | 0.071 | -0.002 | -0.002 | 0.008 | -0.010 |
> | Municipally-owned | -2.145* | 0.405 | -0.367** | -0.188*** | -0.331** | -0.635*** |
> | Investor-owned | -3.695*** | 0.557* | -0.485*** | -0.185*** | -0.382** | -0.381*** |
> | ln(residential customers) | 0.541 | 0.494*** | -0.043 | -0.013 | -0.060 | -0.084 |
> | Within-utility start number | | | -0.070*** | -0.012*** | -0.031* | -0.013 |
> | Control mean usage | | | 0.015*** | 0.018*** | 0.016*** | 0.014*** |
> | Site start date (years) | | | | | -0.122*** | -0.141*** |
> | Pseudo-R^2 / R^2 | 0.43 | 0.44 | 0.47 | 0.80 | 0.56 | 0.60 |
> | N | 58 | 882 | 111 | 111 | 111 | 111 |
>
> Omitted ownership category: cooperatives and other non-profits. Inverse-variance weights; SE clustered by utility. Stars: * 90%, ** 95%, *** 99%. ^tbl-utility-selection

Findings:
- **Population preferences** (higher income, more environmentalist): selected into partnership ($\rho>0$) *and* larger effects ($\theta>0$) -> positive selection. The sample mean is about 1 SD above the 882-utility mean (Figure 5).
- **Ownership**: early on, IOUs were much *less* likely to adopt (col. 1), consistent with anecdotes — the programme relied on innovative, non-profit utilities and Opower's outreach targeted municipal/non-profit utilities first (a case where sales outreach independently affected selection). Overall IOUs are now *more* likely (col. 2) given EERS mandates and early results, and IOUs have lower ATEs (-0.485 pp) -> negative selection of current partners from the nation.
- **Size**: large utilities more likely to partner; point estimates of ln(customers) are negative (urban populations less responsive: urban share strongly negatively associated with effects, Appendix A15); in random-effects meta-regression three of four are significant (A14).
- **Other programmes**: positive but statistically insignificant for selection; ATE coefficients about zero.
- **Usage**: lower-usage utilities have larger percent effects conditional on control mean usage (-0.040).
- Anecdotally, very little early selection was intentional targeting of gains: neither Opower nor utilities knew how effects would vary.

**How much is explained?** Adding $Z_u$ cuts the start-date coefficient from -0.175 to **-0.122** pp/year (col. 5): site-level observables explain just under 1/3 of the early-late decline. Col. 6 (X-adjusted) shows even more selection on unobservables, consistent with individual-level observables being *negatively* correlated with the unobservables behind early selection. Utility-level data explain more than individual-level data because some selection varies only at site level (ownership, size) and utility data capture preferences better — part of the Section 6 failure arises from extrapolating to sites with different site-level observables. Footnote 23: 61 of the 101 later sites are outside the support of the "early site propensity score" fitted from col. 1, and those sites have larger absolute prediction errors.

### Nationwide prediction from the metadata
Using eq. (8) (set $C_s$ to utility mean usage, $L$ to the sample mean, sum $\tilde\tau$ times consumers times the national price): first-year savings **\$1.45 billion** (percent specification, col. 3) or **\$1.42 billion** (level specification, col. 4). This assumes $\upsilon\perp\xi$ (no unobserved moderators affected selection of the 58 from the 882); col. 5 suggests that may be false.

> [!example] Test: are the current 111 sites selected on observables?
> | Prediction method | First-year savings | vs. covariate-adjusted |
> |---|---|---|
> | Sample-mean percent ATE (1.31%) applied nationwide | \$1.80 billion | +\$350 million |
> | Sample-mean ATE in levels (0.47 kWh/day) | \$2.13 billion | +\$710 million |
> | Eq. (8) adjusted for utility observables | \$1.45 billion / \$1.42 billion | - |
>
> The substantial overpredictions show current sites are positively selected on observables from the national population. ^tbl-nationwide-prediction

## Examples
- **Heavy-user targeting as a time-series problem.** If a team first tests on its highest-spending customers (analogous to high-usage households), the first lift reading overstates what scaling to everyone delivers — the pattern captured by $\lambda<0$ shrinking when $C_s$ is controlled.

## Connections
- Meta-regression of site effects on site covariates is the same machinery as in the meta-analysis cluster (random-effects with moderators); see also [[Hierarchical Models]].
- Population-level counterpart of exchangeability over $S$ ([[Dahabreh 2020 - Identifiability Conditions and Identification]]).

## See Also
- [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]
- [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
