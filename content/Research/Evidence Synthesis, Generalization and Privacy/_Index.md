---
title: "Index: Evidence Synthesis, Generalization and Privacy"
tags:
  - type/index
  - source/ingested
  - topic/meta-analysis
  - topic/benchmarks
  - topic/causal-transportability
  - topic/differential-privacy
parent: "[[../_Index|Research]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 190
---

# Evidence Synthesis, Generalization and Privacy

> [!abstract] Routing Summary
> This topic covers **what we can legitimately conclude from many studies, from benchmark scores, from one population about another, and from data released under a privacy guarantee**. It has 4 clusters built from 24 primary sources: 190 content notes plus 28 indexes, ingested 2026-11-08.
> - Need to pool effects across studies or experiments (random effects, $\tau^2$, HKSJ, Bayesian meta-analysis, publication bias)? → [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/_Index|Meta-Analysis]]
> - Need how benchmarks are built, documented and gamed, or how to compare causal estimators on simulated ground truth? → [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/_Index|Benchmark Development]]
> - Need to carry a causal effect from a trial or test market to a new population (selection diagrams, transport formulas, participation weighting, site-selection bias)? → [[Research/Evidence Synthesis, Generalization and Privacy/Causal Transportability/_Index|Causal Transportability]]
> - Need formal privacy guarantees (Laplace/Gaussian mechanisms, composition, RDP, GDP, DP-SGD, Census TopDown)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/_Index|Differential Privacy]]
^routing-summary

## Clusters

- [[Research/Evidence Synthesis, Generalization and Privacy/Meta-Analysis/_Index|Meta-Analysis]] (48 notes, 6 sources) — COVERS: Viechtbauer 2010 (metafor: DL/REML, $Q$, $I^2$, meta-regression, BCG example), IntHout 2014 (HKSJ vs DL), Röver 2020 (bayesmeta: $\tau$ priors, DIRECT, shrinkage), Sterne 2011 (funnel asymmetry, Egger test), Andrews & Kasy 2019 (identifying and correcting publication bias), Meager 2019 (Bayesian hierarchical pooling of seven RCTs).
- [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/_Index|Benchmark Development]] (46 notes, 6 sources) — COVERS: Deng 2009 (ImageNet), Wang 2018 (GLUE), Liang 2022 (HELM), Gebru 2021 (Datasheets for Datasets), Dehghani 2021 (Benchmark Lottery), Dorie 2019 (ACIC 2016 causal-inference competition).
- [[Research/Evidence Synthesis, Generalization and Privacy/Causal Transportability/_Index|Causal Transportability]] (36 notes, 5 sources) — COVERS: Pearl & Bareinboim 2014 (selection diagrams, S-admissibility), Bareinboim & Pearl 2016 (data fusion), Degtiar & Rose 2023 (review of estimators), Dahabreh et al. 2020 (trial-to-target estimators), Allcott 2015 (Opower site-selection bias).
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/_Index|Differential Privacy]] (60 notes, 7 sources) — COVERS: Dwork et al. 2006 (Laplace mechanism), Dwork & Roth 2014 Ch. 1–3 (toolbox, composition), Wasserman & Zhou 2010 (statistical rates), Mironov 2017 (Rényi DP), Dong, Roth & Su 2022 (Gaussian DP), Abadi et al. 2016 (DP-SGD), Abowd et al. 2022 (2020 Census TopDown).

## Cross-Cutting Concepts

- **External validity has two routes**: pool sites and predict the next one ([[Meager 2019 - Pooling Factors and Measuring External Validity]], [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]), or transport by covariates and causal structure ([[Pearl 2014 - S-Admissibility and the Graphical Criterion]], [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]). [[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]] shows what goes wrong when sites self-select.
- **Selection on results**: publication bias ([[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]), benchmark task selection ([[Dehghani 2021 - Task Selection Bias Case Studies]]) and site selection ([[Allcott 2015 - Model of External Validity and Site Selection Bias]]) are the same problem: the evidence we see was filtered by its outcome.
- **Simulated ground truth**: [[Dorie 2019 - Simulation Design and Knobs]], [[IntHout 2014 - Simulation Design]] and [[Dahabreh 2020 - Simulation Study of Estimators]] all judge methods against known truth.
- **Noise with a known law**: DP outputs ([[Abowd 2022 - Least Squares and Rounder Estimators]]) and meta-analytic study estimates ([[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]) both have known sampling variance, so inverse-variance weighting and hierarchical models apply to both.

## Marketing-Measurement Entry Points

- Pooling geo/lift tests across markets → [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]]
- Transporting a test result to a new market → [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]], [[Degtiar 2023 - Marketing Application Transporting Experiment Results]], [[Allcott 2015 - Conclusions, Remedies and Marketing Implications]]
- Benchmarking measurement methods → [[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]], [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]], [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]
- Privacy-noised reporting → [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]], [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]]

## Sources

All 24 PDFs are in this folder's `raw/` directory. Planned but not ingested: Cole & Stuart 2010 and Stuart et al. 2011 (PMC-only, behind a bot check); Egger et al. 1997 was replaced by Sterne et al. 2011 for the same reason.

## See Also

- [[Research/Model Validation and Interpretability/_Index|Model Validation and Interpretability]] — false discovery, overfitting and simulation-based validation
- [[Research/Market Response Models/User-Level Ad Experiments/_Index|User-Level Ad Experiments]] — experimental benchmarks and privacy-era measurement limits
- [[Hierarchical Models]] — the shared statistical model behind meta-analysis and pooling
