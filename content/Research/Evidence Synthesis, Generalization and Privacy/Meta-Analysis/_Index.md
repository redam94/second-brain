---
title: "Index: Meta-Analysis"
tags:
  - type/index
  - source/ingested
  - topic/meta-analysis
parent: "[[../_Index|Evidence Synthesis, Generalization and Privacy]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 51
---

# Meta-Analysis

> [!abstract] Routing Summary
> This topic covers **how to combine effect estimates from many studies or experiments**: fixed- and random-effects models, heterogeneity ($\tau^2$, $Q$, $I^2$), small-$k$ inference, Bayesian hierarchical pooling, and detecting and correcting publication bias. There are 6 sub-topics (one per source) and 51 notes.
> - Need the standard random-effects toolkit (DerSimonian–Laird, REML, $Q$, $I^2$, meta-regression, forest/funnel plots)? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package/_Index|Viechtbauer 2010 (metafor)]]
> - Need confidence intervals that hold up with few studies (Hartung–Knapp–Sidik–Jonkman)? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis/_Index|IntHout 2014]]
> - Need a fully Bayesian random-effects analysis without MCMC (priors for $\tau$, shrinkage, prediction)? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta/_Index|Röver 2020 (bayesmeta)]]
> - Need funnel plots, small-study effects and the Egger regression test? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry/_Index|Sterne 2011]]
> - Need to identify and correct publication bias (selection probability, median-unbiased estimates)? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias/_Index|Andrews & Kasy 2019]]
> - Need a Bayesian hierarchical pooling of several RCTs, with pooling factors as a measure of external validity? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit/_Index|Meager 2019]]
> - Pooling geo tests or lift studies across markets? → [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]] and [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]
^routing-summary

## Sub-topics

- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package/_Index|Viechtbauer 2010 - metafor]] (10 notes) — COVERS: effect-size measures; fixed, random and mixed-effects models; $\tau^2$ estimators (DL, REML, ...), $Q$-test, $I^2$, $H^2$, with DerSimonian–Laird 1986 and Higgins–Thompson 2002 stated formally; moderators and Knapp–Hartung; LRT, permutation tests, BLUPs; influence diagnostics and plots; trim-and-fill; the BCG vaccine worked example (REML $\hat\mu=-0.7145$, $I^2=92\%$).
- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis/_Index|IntHout 2014 - HKSJ vs DerSimonian-Laird]] (7 notes) — COVERS: the HKSJ and DL formulas; simulation design and error rates (DL above 30% with 2 trials, HKSJ near 5%); 689 Cochrane meta-analyses compared; converting published DL results to HKSJ.
- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta/_Index|Röver 2020 - bayesmeta]] (9 notes) — COVERS: the normal–normal hierarchical model; priors for $\mu$ and $\tau$; the marginal likelihood and conditional posteriors; the DIRECT algorithm; shrinkage and prediction; posterior predictive checks and the REML link; the pediatric liver-transplant example.
- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Sterne 2011 - Funnel Plot Asymmetry/_Index|Sterne 2011 - Funnel Plot Asymmetry]] (4 notes) — COVERS: funnel plots and causes of asymmetry; the Egger regression and alternative tests (it substitutes for Egger 1997, which had no legal free copy); the magnesium example and fixed- vs random-effects choice.
- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias/_Index|Andrews & Kasy 2019 - Publication Bias]] (9 notes) — COVERS: the truncated sampling model; identification from replication studies and from meta-studies; median-unbiased estimation and corrected confidence sets; applications to economics and psychology replications, minimum wage and deworming; optimal publication rules.
- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit/_Index|Meager 2019 - Microcredit Hierarchical Analysis]] (9 notes) — COVERS: seven microcredit RCTs; hierarchical model specifications; priors and computation; pooling factors as a measure of external validity; average effects, heterogeneity and predictive distributions; covariates; marketing analogues.

## Cross-Cutting Concepts

- **Partial pooling / shrinkage**: frequentist BLUPs in [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]], Bayesian shrinkage in [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]], and pooling factors in [[Meager 2019 - Pooling Factors and Measuring External Validity]].
- **Few-study inference**: [[IntHout 2014 - Simulation Results and Error Rates]] (frequentist fix) versus the $\tau$ priors in [[Roever 2020 - Priors for the Effect and Heterogeneity]] (Bayesian fix).
- **Publication bias**: diagnostics in [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]] and [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]]; correction in [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]].
- **External validity**: Meager's predictive distribution for the next site connects to [[Research/Evidence Synthesis, Generalization and Privacy/Causal Transportability/_Index|Causal Transportability]].

## Sources

- Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package
- IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis
- Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package
- Sterne 2011 - Recommendations for Examining and Interpreting Funnel Plot Asymmetry
- Andrews 2019 - Identification of and Correction for Publication Bias
- Meager 2019 - Understanding the Average Impact of Microcredit Expansions

## See Also

- [[Research/Evidence Synthesis, Generalization and Privacy/Causal Transportability/_Index|Causal Transportability]] — generalizing effects to new populations, the other side of external validity
- [[Hierarchical Models]] — the general Bayesian model these meta-analyses specialize
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — the false-discovery rationale behind publication-bias correction
