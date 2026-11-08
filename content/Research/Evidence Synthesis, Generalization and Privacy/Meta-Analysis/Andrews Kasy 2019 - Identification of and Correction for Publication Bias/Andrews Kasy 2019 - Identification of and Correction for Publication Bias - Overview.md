---
title: "Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/overview
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Whole paper, Secs. 1-6 (NBER WP 23298, Nov 2017 revision, pp. 1-41)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  []
used_by:
  - "[[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]"
  - "[[Andrews Kasy 2019 - Identification Using Replication Studies]]"
  - "[[Andrews Kasy 2019 - Identification Using Meta-Studies]]"
  - "[[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]]"
  - "[[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]"
  - "[[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]"
  - "[[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]"
  - "[[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]]"
  - "[[Concept Note - Forecasting Replication from Published Effects]]"
aliases:
  - "Andrews Kasy 2019 overview"
  - "Identification of and Correction for Publication Bias (Andrews and Kasy, AER 2019)"
---
# Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview

> [!summary]
> Andrews and Kasy give the first nonparametric identification results for the *conditional publication probability* $p(\cdot)$ as a function of a study's result, using either **systematic replication studies** or **meta-studies** (estimates with varying standard errors), always up to scale. With $p$ known they give **median-unbiased estimators and exact confidence sets** for a published study's parameter. Applied to lab experiments, significant results are 30+ times more likely to be published in economics and 100+ times in psychology than insignificant ones.

> [!note] Version used
> The vault PDF is the NBER Working Paper 23298 (March 2017, revised November 2017). The published version is *American Economic Review* 109(8), 2019. Numbers below are from the working paper; the published article may differ in wording or minor numerics.

## Overview

**Research question.** Replications often find smaller or opposite-signed effects than the originals. If journals and authors select on results, published estimates are biased and published confidence sets mis-cover. Can the selection mechanism be *identified*, and can inference be *corrected*?

**Contributions.**
1. Nonparametric identification of $p(\cdot)$ up to scale from (a) replication data (asymmetry of the joint distribution of original and replication estimates) and (b) meta-study data (distribution of estimates for high-variance studies as a noisier copy of that for low-variance studies).
2. For known $p$, median-unbiased estimators and equal-tailed confidence sets for scalar parameters of individual studies; Bonferroni-corrected intervals when $p$ is estimated.
3. Applications: experimental economics (Camerer et al. 2016), psychology (Open Science Collaboration 2015), minimum-wage employment elasticities (Wolfson-Belman 2015), mass deworming (Croke et al. 2016).

**Headline results.**

| Literature | Method | Estimated relative publication probability of insignificant results |
|---|---|---|
| Economics lab (18 studies) | replication | $0.029$ (SE 0.027): significant 30+ times as likely |
| Economics lab | meta-study | $0.038$ (SE 0.051) |
| Psychology (73 studies) | replication, $|Z|<1.64$ | $0.009$ (SE 0.005); $1.64\le|Z|<1.96$: $0.205$ (SE 0.088) |
| Minimum wage (~1000 estimates, 37 studies) | meta-study | insignificant ~30% as likely as significant negative-employment results |
| Deworming (22 estimates, 20 studies) | meta-study | $2.514$ (SE 1.869): no evidence of selection toward significance |

After correction, 12 of 18 economics confidence sets include zero (2 originally), and in psychology 28 of 73 intervals exclude zero versus 62 originally.

## Main Content

### Source Map

| Paper section | Where covered |
|---|---|
| 1 Introduction (contributions, literature, roadmap) | this note; [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]] (literature) |
| 2 Setting: Def. 1, Lemma 1, notation | [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] |
| 2.1 Illustrative example (Fig 1) | [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] |
| 2.2 Alternative DGPs (observability, manipulation) | [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] |
| 3.1 Replication studies: Def. 2, Lemma 2, Thm 1, Cor. 1-2, Thm 2 (Fig 2) | [[Andrews Kasy 2019 - Identification Using Replication Studies]] |
| 3.2 Meta-studies: Def. 3, Lemma 3, Thm 3, Cor. 3 (Fig 3) | [[Andrews Kasy 2019 - Identification Using Meta-Studies]] |
| 3.3 Relation to the literature: replication probability, Lemma 4, p-value distributions | [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]] |
| 4 Corrected inference: Thm 4, Lemma 5, estimation error in $p$ (Fig 4) | [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]] |
| 5 Key assumptions, MLE; 5.1 Economics lab (Fig 5-6, Table 1); 5.2 Psychology (Fig 7-8, Table 2) | [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]] |
| 5.3 Minimum wage (Fig 9, Table 3); 5.4 Deworming (Fig 10, Table 4) | [[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]] |
| 6 Conclusion; optimal publication rules | [[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]] |
| Supplement (proofs, appendices B-K, GMM) | referenced only; not in the PDF body |

### Notation

Upper case: random variables; lower case: realisations. $\Theta$: latent parameter governing a study's observables. $X$: estimates; $Z=X/\sigma$: normalised estimates (z-statistics). Latent studies (published or not) are indexed by $i$ and carry a star ($\Theta_i^*, X_i^*$); published studies are indexed by $j$ without a star. Frequentist objects condition on $\Theta$; unconditional objects integrate over the population distribution $\mu$ of $\Theta^*$.

## Examples

See the illustrative example with a ten-fold preference for significance in [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]] and the corrected-interval numbers in [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]].

## Connections

- Egger-type meta-regressions and funnel plots: [[Sterne 2011 - Funnel Plot Asymmetry - Overview]].
- Hierarchical pooling across sites, citing this paper for nonparametric identification of the upper level: [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]].
- Why published findings are over-stated: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- The selection problem in econometrics: [[The Selection Problem]].

### Relevance to marketing measurement

The setting maps to an internal repository of experiments: tests that "won" get documented; $p(z)$ is the probability a test result enters the repository given its z-statistic. Replication analogues are re-runs of the same geo test; meta-study analogues are the repository itself with varying standard errors. The correction is a way to deflate headline lifts before using them as priors in an MMM. This extension is mine; the paper does not discuss marketing.

## See Also

- [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]
- [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]
- [[Researcher Degrees of Freedom]]
- [[Bayesian Estimation and Priors for MMM]]
- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Concept Note - Forecasting Replication from Published Effects]] — replication forecasting applied
