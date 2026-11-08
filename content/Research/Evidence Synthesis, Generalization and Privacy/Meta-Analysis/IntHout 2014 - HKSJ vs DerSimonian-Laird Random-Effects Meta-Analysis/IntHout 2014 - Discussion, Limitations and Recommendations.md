---
title: "IntHout 2014 - Discussion, Limitations and Recommendations"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Background (pp. 2-3), Discussion (pp. 8-9), Conclusions (p. 9), Competing interests / Acknowledgements (p. 12)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[IntHout 2014 - Simulation Results and Error Rates]]"
  - "[[IntHout 2014 - Cochrane Empirical Comparison]]"
  - "[[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]"
used_by:
  - "[[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]"
aliases:
  - HKSJ limitations
  - when to use HKSJ
  - alternatives to DerSimonian-Laird
---

# IntHout 2014 - Discussion, Limitations and Recommendations

> [!summary]
> The authors conclude that DL "should not be used" as the default and HKSJ "should be the standard approach" because it gave error rates closer to 5% in every study they cite and every scenario they simulated. They also state limits: HKSJ error rates still roughly doubled with one large trial, and with $\le5$ studies of very unequal size even HKSJ intervals "may be conservatively narrow" (i.e. too narrow), so inferences taken at face value may be spurious.

## Overview

Position of the paper in the literature: DL remains "almost to the exclusion of all other methods" the standard (RevMan, Comprehensive Meta-Analysis) despite repeatedly shown false-positive inflation (refs 4-10). Prior simulations (Hartung, Knapp, Makambi; Sanchez-Meca and Marin-Martinez 2008) showed HKSJ superior but did not report explicit relationships between trial-size mixtures and error rates, which Table 1 does.

## Main Content

### What the evidence shows

1. **Simulation (10,000 series per scenario).** HKSJ more adequate than DL consistently, especially for small $k$. With heterogeneity DL's mean error rate was consistently higher; HKSJ doubled to about 10% when exactly one trial was large. At $I^2=0$ DL error is below 5% and HKSJ about 5%.
2. **Empirical.** 25.1% of DL-positive Cochrane findings become non-significant under HKSJ; Thorlund et al. (2011), 920 meta-analyses: 45% significant with the normal distribution versus 35.4% with $t$.
3. **Implication.** "Among these DL significant findings in the Cochrane reviews there may be a considerable number of false positives."

### Limitations stated by the authors

> [!theorem] Caveats on HKSJ
> - HKSJ is not perfect: in some scenarios error rates "more or less doubled", though DL's could be over four times too high in the same settings. Error rates were maximal when one trial was substantially larger than the others.
> - With few studies the distribution of treatment effects is unknown and need not be normal or $t$. Kontopantelis and Reeves (2012): with slight heterogeneity HKSJ coverage was consistently 94% when true effects were non-normal; with larger heterogeneity the non-parametric permutation (PE) method of Follmann and Proschan (1999) did better, but PE requires more than five studies, whereas many meta-analyses are smaller (Davey et al. 2011).
> - Final caution: "urge caution when any random effects model, including HKSJ, is applied to situations where there are very few studies, and even more so when the sample sizes of the combined studies are very different. Even the HKSJ confidence intervals may be conservatively narrow in these situations".
> - Scope: the evaluation covers continuous and (log) OR/RR outcomes with 2-20 trials; the conversion applies to continuous and log-transformed outcomes (RR, OR, HR, Poisson rate).
^thm-hksj-caveats

(Wording note: the paper says "conservatively narrow", meaning the intervals are narrower than they should be, hence anti-conservative, as the preceding sentence about inflated error rates shows.)

### Alternatives surveyed

| Method | Reference | Comment in the paper |
|---|---|---|
| Quantile Approximation (QA) | Brockwell and Gordon 2007 | simple, but outperformed by HKSJ (Sanchez-Meca and Marin-Martinez 2008) |
| Profile likelihood | Hardy and Thompson 1996 | asymptotic; less robust for few trials |
| Natural weighting | Shuster 2010 | alternative to empirical weights |
| Fixed-effect estimate with random-effects heterogeneity | Henmi and Copas 2010 | robustness to publication bias |
| Higher-order likelihood | Guolo 2012 | asymptotic, hard to run without packages |
| Permutation (PE) | Follmann and Proschan 1999 | better at larger heterogeneity but needs $k>5$ |

Most are asymptotic and so possibly less robust for few trials, or lack accessible software. The authors restrict themselves to HKSJ because of computational simplicity and the conversion recipe.

### Software status (2014)

HKSJ included in R `metafor` and Stata `metareg`; planned for Comprehensive Meta-Analysis 3.0; not yet an option in RevMan. This motivated the paper's post-hoc conversion.

### Conclusions

"The HKSJ method for random effects meta-analysis consistently results in more adequate error rates than the common DL method, especially when the number of studies is small. The HKSJ method can easily be applied routinely in meta-analyses. However, even with the HKSJ method, extra caution is needed when there are $\le5$ studies of very unequal sizes."

## Examples

> [!example] Decision rule for a marketing evidence portfolio
> Suppose a brand has 4 geo experiments (one national, three regional at one tenth the size) with heterogeneity $I^2\approx0.5$. Under the paper's Table 1 a DL "significant" pooled lift has an actual error rate near 12-14%; HKSJ about 5-10%. Recommended reading: report HKSJ intervals, treat any threshold crossing as provisional, and add a Bayesian analysis with an explicit $\tau$ prior ([[Roever 2020 - Priors for the Effect and Heterogeneity]]) because HKSJ may still be too narrow with $\le5$ unequal studies.
^ex-portfolio-rule

## Connections

- [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] lists the plug-in $\tau^2$ problem as an explicit caveat; HKSJ (Knapp-Hartung) is its main frequentist fix.
- [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] positions fully Bayesian inference as the principled response for tiny $k$; Friede et al. (2017a,b) compared Bayesian and frequentist methods in the few-studies case.
- Broader context: the credibility of "significant" pooled results connects to [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] (a co-author of this paper), [[Power Analysis and Sample Size]] and [[Marketing Generalizations Overview]].

## See Also

- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
- [[IntHout 2014 - Simulation Design]]
