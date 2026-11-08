---
title: "Viechtbauer 2010 - Technical Details, Validation and Package Comparison"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Sec. 1 (pp. 1-3), Sec. 3.6 (pp. 38-40), Sec. 4 (p. 40), Sec. 5 and Table 2 (pp. 40-42), Sec. 6 (p. 42), References (pp. 43-48)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
  - "[[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]]"
used_by:
  - "[[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]"
aliases:
  - metafor model assumptions
  - metafor package comparison
  - Mantel-Haenszel and Peto in metafor
---

# Viechtbauer 2010 - Technical Details, Validation and Package Comparison

> [!summary]
> The paper closes with the assumptions every standard meta-analytic fit rests on (known sampling variances, plug-in $\hat\tau^2$, approximate normality of effects, independence), validation against Stata, SAS, SPSS, `meta` and `rmeta`, a feature comparison (Table 2) showing metafor uniquely offers mixed-effects models, Knapp-Hartung, LRT and permutation tests, and a note on Mantel-Haenszel and Peto fixed-effects methods for sparse 2x2 data.

## Overview

This note covers the introduction's software context, the cautionary assumptions in Sec. 3.6, the validation (Sec. 4), the comparison (Sec. 5, Table 2), the conclusions (Sec. 6) and a map of key references.

## Main Content

### Introduction (Sec. 1)

A meta-analysis is "a systematic literature review supported by statistical methods where the goal is to aggregate and contrast the findings from several related studies" (Glass 1976). Effects are quantified (e.g. odds ratios) and aggregated. Uses: average effect; moderator analysis (dose etc.); correlational summaries (gender differences in risk-taking, job satisfaction and performance). Other software: MetaWin, Comprehensive Meta-Analysis, RevMan (Cochrane), Excel add-ins MIX and MetaEasy, Stata macros, SPSS macros (Lipsey and Wilson 2001), SAS `proc mixed` (van Houwelingen et al. 2002), and R's `meta` and `rmeta`. metafor grew from the author's `mima()` function (Viechtbauer 2006).

### Assumptions to keep in mind (Sec. 3.6)

> [!theorem] Four assumptions behind the standard tests
> 1. **Known sampling variances.** $v_i$ are treated as known constants; this is usually only asymptotically true, so test and CI properties are exact/nominal only when within-study samples are large. Variance-stabilising measures (arcsine RD, Fisher $z$) make the assumption more reasonable.
> 2. **Plug-in $\hat\tau^2$.** After estimation $\tau^2$ is treated as known, ignoring its uncertainty; SEs tend to be too small, tests too large, CIs too narrow. Knapp-Hartung counters this.
> 3. **Normality of effect estimates.** Most effect measures are only approximately normal; accuracy improves with within-study sample size. Fisher's $z$ is preferable from this angle too.
> 4. **Independence.** (Sec. 6) All model-fitting functions assume independent outcomes; at least, a participant may contribute data only once. Correlated outcomes and multivariate meta-analysis need more complex models, "under development".
> Permutation tests may give better Type I control when 1-3 are violated, but "more research is needed".
^thm-assumptions

### Validation (Sec. 4)

Results for several data sets (including BCG) were compared with Stata `metan`, `metareg`, `metabias`, `metatrim` (Sterne 2009), SAS `proc mixed`, SPSS macros of Lipsey and Wilson (2001), and R's `meta` (Schwarzer 2010) and `rmeta` (Lumley 2009). They "either agreed completely or fell within a margin of error expected when using numerical methods."

### Comparison of packages (Sec. 5, Table 2)

| Capability | metafor | meta | rmeta |
|---|---|---|---|
| Fixed-effects models | yes | yes | yes |
| Random-effects models | yes | yes | yes |
| Heterogeneity estimators | various | DL | DL |
| Mantel-Haenszel | yes | yes | yes |
| Peto's method | yes | yes | no |
| Forest plots | yes | yes | yes |
| Funnel plots | yes | yes | yes |
| Radial plots | yes | yes | no |
| L'Abbe plots | no | yes | no |
| Q-Q normal plots | yes | no | no |
| Categorical moderators | multiple | single (FE only) | no |
| Continuous moderators | multiple | no | no |
| Mixed-effects models | yes | no | no |
| Knapp and Hartung adjustment | yes | no | no |
| Likelihood ratio tests | yes | no | no |
| Permutation tests | yes | no | no |
| Leave-one-out analysis | yes | yes | no |
| Influence diagnostics | yes | no | no |
| Cumulative meta-analysis | yes | yes | yes |
| Tests for funnel asymmetry | yes | yes | no |
| Trim and fill | yes | yes | no |
| Selection models | no | via copas | no |

Entry points: `meta` (`metagen`, `metabin`, `metacont`, `metaprop`, `byvar` for one categorical moderator under a fixed-effects model), `rmeta` (`meta.summaries`, `meta.DSL`, `meta.MH`).

### Mantel-Haenszel and Peto (Sec. 6)

`rma.mh()` gives the Mantel-Haenszel pooled OR, RR or RD (Mantel and Haenszel 1959); best for many tables with small samples (sparse data / increasing strata). For odds ratios it also provides the Cochran-Mantel-Haenszel test (Cochran 1985) and Tarone's heterogeneity test (Tarone 1985). `rma.peto()` gives Peto's one-step fixed-effects OR (Yusuf et al. 1985); in sparse situations under certain conditions least biased with the most accurate coverage (Bradburn et al. 2007) but can be quite biased in other situations (Greenland and Salvan 1990).

### Key-reference map

| Topic | References |
|---|---|
| $\tau^2$ estimators | DerSimonian and Laird 1986; Hedges and Olkin 1985; Sidik and Jonkman 2005a,b; Viechtbauer 2005; Morris 1983; Hunter and Schmidt 2004 |
| Heterogeneity measures | Higgins and Thompson 2002; CI for $\tau^2$: Viechtbauer 2007a; $Q$ vs LRT: Viechtbauer 2007b |
| Meta-regression | Berkey et al. 1995; van Houwelingen et al. 2002; Raudenbush 2009 |
| Improved inference | Knapp and Hartung 2003; Follmann and Proschan 1999; Higgins and Thompson 2004 |
| Fixed vs random | Hedges and Vevea 1998; Laird and Mosteller 1990 |
| Publication bias | Begg and Mazumdar 1994; Egger et al. 1997; Duval and Tweedie 2000a,b; Copas 1999; Rothstein et al. 2005 |
| Data | Colditz et al. 1994 (BCG) |
| Diagnostics | Belsley et al. 1980; Cook and Weisberg 1982; Galbraith 1988, 1994; Wang and Bushman 1998 |
| Effect sizes | Fleiss and Berlin 2009; Borenstein 2009; Fisher 1921; Olkin and Pratt 1958; Hedges 1989 |

### Planned extensions (Sec. 6)

Multivariate / correlated-outcome models, L'Abbe plots, and a credibility interval that accounts for $\tau^2$ uncertainty.

## Examples

> [!example] Why "known $v_i$" matters for marketing meta-analyses
> Suppose each of $k=6$ geo tests reports an iROAS estimate with a bootstrap SE based on only 20 matched markets. The metafor assumptions treat each reported SE as exact, understating total uncertainty in the pooled mean and (via the plug-in $\hat\tau^2$) the predictive spread for the next test. Knapp-Hartung or a Bayesian treatment ([[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]) partly repairs the second issue, but the first requires SEs that are themselves credible, a point to verify in each test's design ([[Geo-Experiment Methodology - Overview]]).
^ex-known-variance-marketing

## Connections

- Assumption 2 is the central motivation of [[IntHout 2014 - Discussion, Limitations and Recommendations]] and [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]].
- Assumption 4 matters when several estimates come from the same experiment (multiple outcomes, multiple arms) or the same market in overlapping windows, which is common in marketing; independent-estimates meta-analysis is then invalid without a multivariate or clustered extension.

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Viechtbauer 2010 - Effect Size Measures and escalc]]
