---
title: "Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 5.3-5.4 (pp. 33-40): Tables 3-4, Figs 9-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Identification Using Meta-Studies]]"
  - "[[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]"
used_by:
  - "[[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]]"
aliases:
  - "Minimum wage and deworming publication bias applications"
  - "Wolfson-Belman and Croke meta-study results"
---
# Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming

> [!summary]
> With no replication estimates available, the meta-study route is applied to minimum-wage employment elasticities (about 1000 estimates, 37 studies) and to mass-deworming effects on weight (22 estimates, 20 studies). Minimum wage: insignificant results are about 30% as likely to be published as significant negative-employment results and the latent mean effect is about half the naive one. Deworming: imprecise, with no reliable evidence of selection toward significance.

## Overview

Section 5.3 and 5.4, with Tables 3-4 and Figs 9-10, plus the meta-regression checks and the multiple-estimates-per-study complication.

## Main Content

### Minimum wage and employment (Wolfson and Belman 2015)

*Data.* Meta-analysis of US studies on the employment elasticity with respect to the minimum wage, published or circulated as working papers after 2000, reporting elasticities and standard errors: about a thousand estimates from **37 studies**. Because the sample includes published and unpublished papers, the paper evaluates both the full sample (reported) and the published-only subsample (supplement; qualitatively similar). $X$ is defined so $X>0$ is a **negative** employment effect.

*Histogram (Fig 9).* Suggestive jumps near $-1.96$, $0$, $1.96$, less pronounced than in the replication applications.

*Meta-regressions (Sec. 3.3), clustered by study.* Regression of $X$ on $\sigma$: slope $0.408$ (SE $0.372$). Regression of $Z$ on $1/\sigma$: intercept $0.343$ (SE $0.283$). Both point toward selection favouring negative-employment results; neither rejects no selection.

> [!theorem] Meta-study specification (minimum wage)
> $\Theta^*\sim\bar\theta+t(\tilde\nu)\cdot\tilde\tau$ (location-scale t, since signs are not normalised) and publication depends on the **sign** as well as significance:
> $$p(X/\sigma)\propto\begin{cases}\bar p_1&X/\sigma<-1.96\\\bar p_2&-1.96\le X/\sigma<0\\\bar p_3&0\le X/\sigma<1.96\\1&X/\sigma\ge1.96.\end{cases}$$
> ^def-spec-minwage

> [!example] Table 3 - Meta-study estimates, minimum wage (SE clustered by study)
> | $\bar\theta$ | $\tilde\tau$ | $\tilde\nu$ | $\bar p_1$ | $\bar p_2$ | $\bar p_3$ |
> |---|---|---|---|---|---|
> | 0.018 (0.009) | 0.019 (0.011) | 1.303 (0.279) | 0.697 (0.350) | 0.270 (0.111) | 0.323 (0.094) |
>
> Publication probabilities are relative to the omitted category (positive and significant at 5%, i.e. negative employment effect).
> *Interpretation.* Insignificant results (cells 2 and 3) are about 30% as likely to be published as significant negative-employment results. The point estimate $\bar p_1=0.697$ suggests significant *positive*-employment results may be less likely published than negative ones, but it is noisy and the hypothesis that selection depends on significance and not sign cannot be rejected. Consistent with Wolfson and Belman (2015) and Card and Krueger (1995). The latent mean effect $\bar\theta=0.018$ (small but significantly negative effect on employment) is "about half as large" as the naive mean $0.041$ (SE 0.011) that ignores selection.

^ex-table3

**Multiple estimates per study.** It is arbitrary to pick one "main" estimate. Standard errors are clustered by study because estimate-$\sigma$ pairs are not independent within study. For identification, the model needs $D_i\perp(\Theta_i^*,\sigma_i^*)|X_i^*/\sigma_i^*$; independence across $i$ can be relaxed if that conditional independence holds - justified if authors and referees judge each estimate separately, or if estimands within a study are independent. If these fail, the model is misspecified (Sec. 3.1.3).

### Deworming and child weight (Croke et al. 2016)

*Data.* RCTs reporting child body weight; intent-to-treat estimates at the longest follow-up; all studies from Taylor-Robinson et al. (2015) plus those from Welch et al. (2017); **22 estimates from 20 studies**. Standard errors clustered by study.

*Histogram (Fig 10).* The density of $Z$ appears to jump at $0$, suggesting selection toward positive estimates, but with $n=22$ it should not be over-read.

*Meta-regressions.* $X$ on $\sigma$: slope $0.296$ (SE $0.917$); $Z$ on $1/\sigma$: intercept $0.481$ (SE $0.889$). Neither rejects no selection.

> [!theorem] Meta-study specification (deworming)
> With only 22 observations, impose $\Theta^*\sim N(\bar\theta,\tilde\tau^2)$ and symmetric $p(X/\sigma)\propto\bar p$ if $|X/\sigma|<1.96$, $1$ if $|X/\sigma|\ge1.96$.

^def-spec-deworm

> [!example] Table 4 - Meta-study estimates, deworming (robust SE)
> | $\bar\theta$ | $\tilde\tau$ | $\bar p$ |
> |---|---|---|
> | 0.190 (0.120) | 0.343 (0.128) | 2.514 (1.869) |
>
> *Interpretation.* Point estimates suggest significant results are *less* likely to be included in Croke et al. than insignificant ones (insignificant 2.5 times as likely), but the SE is large and the difference is not significant; the estimated mean effect is positive but not significantly different from zero. In the supplement, asymmetric $p$ specifications suggest selection *against negative* estimates. The paper warns the findings should not be interpreted strongly given large SEs and limited robustness, in the context of the controversial deworming debate (Clemens and Sandefur 2015).

^ex-table4

## Examples

The two tables above are the worked results. Contrast: in the economics lab data selectivity is estimated at ~30x, whereas here estimates are 30% (minimum wage) or even >1 (deworming) - the degree of selectivity varies a lot by literature, which is the paper's third contribution.

## Connections

- Meta-study identification and its independence assumption: [[Andrews Kasy 2019 - Identification Using Meta-Studies]].
- Egger-type regressions used as first checks: [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]].
- Funnel-plot reading of such data: [[Sterne 2011 - Funnel Plot Asymmetry - Overview]].

### Relevance to marketing measurement

The minimum-wage application is the closest to a marketing repository: many estimates per study, signs not normalised, non-trivial heterogeneity, and selection that may depend on direction (a negative lift is less likely to be written up than a positive one). The paper's allowance for sign-dependent $p$ is the part to carry over; clustering by experiment/campaign handles multiple cuts of the same test.

## See Also

- [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Conversion Lift Studies on Ad Platforms]]
