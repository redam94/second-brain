---
title: "IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/overview
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Whole paper, BMC Med. Res. Methodol. 14:25, pp. 1-12"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
used_by:
  - "[[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]]"
  - "[[IntHout 2014 - Simulation Design]]"
  - "[[IntHout 2014 - Simulation Results and Error Rates]]"
  - "[[IntHout 2014 - Cochrane Empirical Comparison]]"
  - "[[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]"
  - "[[IntHout 2014 - Discussion, Limitations and Recommendations]]"
aliases:
  - IntHout HKSJ paper
  - HKSJ outperforms DerSimonian-Laird
---

# IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview

> [!summary]
> The DerSimonian-Laird (DL) random-effects method has inflated Type I error when studies are few and heterogeneity is non-trivial, and worse when study sizes differ. IntHout, Ioannidis and Borm (2014) show by simulation (2 to 20 trials, varying size mixtures) that the Hartung-Knapp-Sidik-Jonkman (HKSJ) method (a $t$-distribution with $k-1$ df and a weighted variance) keeps error rates near 5%, at worst about 10% versus over 30% for DL. In 689 Cochrane meta-analyses, 25.1% of DL-significant findings were not significant under HKSJ. They also give a spreadsheet-style recipe to convert DL output into HKSJ output.

## Overview

**Research question.** How do DL and HKSJ compare when included trials have realistic, unequal sizes (e.g. one trial ten times larger than the rest), and how many conclusions in practice would change?

**Contribution.** (1) A simulation grid over $k=2$ to 20, trial-size mixtures, $I^2$ and outcome types (continuous, OR, RR), measuring Type I error at nominal 5%; (2) an empirical comparison on 689 first meta-analyses from the 2012 Cochrane Database; (3) a step-by-step conversion from published DL results to HKSJ using only effect sizes and DL weights; (4) the recommendation that HKSJ be the default random-effects method.

**Key results.**
- DL error rates at nominal 5%: up to 30.9% (continuous) or 33.7% (RR/OR) with $k=2$, $I^2\ge0.25$; still 5.6-8.8% at $k=10$ for equal sizes.
- HKSJ: roughly 5% for equal sizes, rarely above 7-10%; it "at most doubled".
- Cochrane: DL significant in 315/689 (45.7%); of these 79 (25.1%) not significant under HKSJ; the reverse in 14 cases. For $\le5$ studies with size ratio $>5$ the share lost is 59.1% (continuous) and 50.0% (dichotomous).
- Caution remains with $\le5$ studies of very unequal sizes even for HKSJ.

## Main Content

### Source Map

| Paper section (pages) | Content | Covered in |
|---|---|---|
| Abstract (p. 1) | Aims, results, conclusion | this note |
| Background (pp. 2-3) | DL deficiencies, HKSJ claim, size mixtures in Cochrane, software availability | [[IntHout 2014 - Discussion, Limitations and Recommendations]]; [[IntHout 2014 - Simulation Design]] |
| Methods overview (p. 3) | Pooled estimate identical; CI/test differ | [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] |
| Methods: simulations (p. 3) | Scenarios, 10,000 series, $I^2$ levels | [[IntHout 2014 - Simulation Design]] |
| Methods: Cochrane data (p. 3) | 2012 CDSR selection | [[IntHout 2014 - Cochrane Empirical Comparison]] |
| Results: continuous outcomes (pp. 3-5), Figure 1 | DL vs HKSJ error | [[IntHout 2014 - Simulation Results and Error Rates]] |
| Results: risk ratio / odds ratio (p. 5), Table 1 | Min-max error rates | [[IntHout 2014 - Simulation Results and Error Rates]] |
| Results: empirical CDSR (pp. 5-6), Table 2 | 689 meta-analyses | [[IntHout 2014 - Cochrane Empirical Comparison]] |
| Easy conversion, Examples 1-2 (pp. 6-8), Tables 3-4 | Zinc (SMD) and ALL (HR) | [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]] |
| Discussion (pp. 8-9) | Prior evidence, limitations, other methods | [[IntHout 2014 - Discussion, Limitations and Recommendations]] |
| Conclusions (p. 9) | Recommendation | this note; [[IntHout 2014 - Discussion, Limitations and Recommendations]] |
| Appendix 1 (pp. 9-10) | Model, DL, HKSJ, $I^2$ | [[IntHout 2014 - HKSJ and DerSimonian-Laird Formal Specification]] |
| Appendix 2 (pp. 10-11) | Simulation algorithm A-C | [[IntHout 2014 - Simulation Design]] |
| Appendix 3 (p. 11), Tables 5-6 | R code with metafor | [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]] |
| References (pp. 12) | 34 references | cited in the notes above |

## Examples

Both worked conversions (zinc/common cold: DL $p=0.04$ becomes HKSJ $p=0.16$; donor/ALL hazard ratio: $p=0.013$ vs $0.011$) are in [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]].

## Connections

- HKSJ is the same adjustment as `knha=TRUE` in metafor ([[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]); the fully Bayesian alternative that handles $\tau$ uncertainty exactly is [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]].
- Relevance to marketing measurement: portfolios of lift or geo experiments are typically small-$k$ with very unequal sizes (one big national test plus several small ones). That is exactly the regime where DL (and any default Wald interval) overstates significance. Use HKSJ (or a Bayesian prior on $\tau$) when summarising such portfolios, and treat "significant" claims from $k\le5$ with one dominant study as fragile. See [[Power Analysis and Sample Size]] and [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
- [[Multiple Testing Corrections]]
