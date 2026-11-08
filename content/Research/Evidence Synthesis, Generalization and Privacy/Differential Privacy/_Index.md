---
title: "Index: Differential Privacy"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Evidence Synthesis, Generalization and Privacy]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 60
---

# Differential Privacy

> [!abstract] Routing Summary
> This topic covers **differential privacy (DP)**, the formal guarantee that an analysis's output barely changes when any one individual's record changes. It runs from the founding definition and the Laplace mechanism, through the textbook toolbox and composition theorems, to the statistical cost of privacy, modern privacy accounting (Rényi DP, Gaussian DP / f-DP), private deep learning (DP-SGD) and the largest deployment so far (the 2020 US Census). There are 7 sub-topics and 60 notes.
> - Need the original definition, global sensitivity and the Laplace mechanism? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity/_Index|Dwork et al. 2006]]
> - Need the textbook toolbox ($(\varepsilon,\delta)$-DP, post-processing, group privacy, randomized response, the exponential mechanism, composition, sparse vector)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3/_Index|Dwork & Roth 2014, Ch. 1–3]]
> - Need DP from a statistician's view (testing-power bound, minimax rates for private histograms and densities)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy/_Index|Wasserman & Zhou 2010]]
> - Need tight composition through Rényi divergence (RDP curves, conversion to $(\varepsilon,\delta)$)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy/_Index|Mironov 2017]]
> - Need the hypothesis-testing definition (trade-off functions, f-DP, $\mu$-GDP, the composition CLT, subsampling)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy/_Index|Dong, Roth & Su 2022]]
> - Need to train a model privately (DP-SGD, per-example clipping, the moments accountant)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy/_Index|Abadi et al. 2016]]
> - Need a real deployment (zCDP, hierarchical noisy measurements, constrained post-processing, budget allocation)? → [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm/_Index|Abowd et al. 2022]]
> - Need to know what DP noise does to marketing measurement (lift readouts, clean rooms, MMM inputs)? → [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]], [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]], [[Dwork Roth 2014 - Randomized Response]]
^routing-summary

## Sub-topics

- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity/_Index|Dwork et al. 2006 - Calibrating Noise to Sensitivity]] (9 notes) — COVERS: the definition of $\varepsilon$-indistinguishability; global sensitivity and the Laplace mechanism with $S(f)/\varepsilon$ scale (adaptive version too); low-sensitivity functions; general metric spaces; post-processing and composition; the interactive vs non-interactive separation and its proof.
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3/_Index|Dwork & Roth 2014 - Ch. 1–3]] (10 notes, textbook) — COVERS: why anonymization fails; the definition and model of computation; post-processing and group privacy; randomized response; the Laplace mechanism; Report Noisy Max and the exponential mechanism; basic and advanced composition and the Gaussian mechanism; sparse vector. Two arithmetic slips in the book are flagged.
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy/_Index|Wasserman & Zhou 2010 - Statistical Framework]] (8 notes) — COVERS: release mechanisms; DP as a testing constraint (power $\le \gamma e^\varepsilon$); informative mechanisms and impossibility; histogram release; orthogonal-series density estimation; the exponential mechanism; rate tables and simulation.
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy/_Index|Mironov 2017 - Rényi DP]] (7 notes) — COVERS: Rényi divergence and the $(\alpha,\varepsilon)$-RDP definition; properties and composition; RDP of randomized response, Laplace and Gaussian ($\alpha/2\sigma^2$); conversion to approximate DP; budget curves.
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy/_Index|Dong, Roth & Su 2022 - Gaussian DP]] (9 notes) — COVERS: trade-off functions and f-DP; the $\mu$-GDP definition; post-processing, the primal–dual view and group privacy; composition and the CLT; Berry–Esseen; subsampling amplification; the noisy-SGD analysis; divergence conversions.
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy/_Index|Abadi et al. 2016 - DP-SGD]] (7 notes) — COVERS: the Gaussian mechanism; DP-SGD with per-example clipping and lots; moments-accountant theorems ($\varepsilon \approx 1.26$ vs 9.34 under strong composition); privacy cost of hyperparameter search; MNIST and CIFAR-10 experiments.
- [[Research/Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm/_Index|Abowd et al. 2022 - Census TopDown]] (10 notes) — COVERS: why DP, zCDP and curator models; the discrete Gaussian, queries and the optimization problem; invariants and policy constraints; TopDown and its accounting proof ($\rho=2.63$); least-squares and rounder estimators; budget allocation; geography spines; utility experiments.

## Cross-Cutting Concepts

- **Composition / privacy accounting**: basic and advanced composition in [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]], then RDP in [[Mironov 2017 - RDP Properties and Composition]], the moments accountant in [[Abadi 2016 - Moments Accountant Theorems and Proofs]], the GDP CLT in [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]], and zCDP in [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]].
- **DP as hypothesis testing**: [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]] and [[Dong Roth Su 2022 - Trade-off Functions and f-DP]].
- **Post-processing**: free in theory ([[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]) but a source of bias in practice ([[Abowd 2022 - Least Squares and Rounder Estimators]]).

## Sources

- Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis
- Dwork 2014 - The Algorithmic Foundations of Differential Privacy
- Wasserman 2010 - A Statistical Framework for Differential Privacy
- Mironov 2017 - Renyi Differential Privacy
- Dong Roth Su 2022 - Gaussian Differential Privacy
- Abadi 2016 - Deep Learning with Differential Privacy
- Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm

## See Also

- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — why privacy constraints matter for ad measurement
- [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/_Index|Benchmark Development]] — reusing a test set is the adaptive-data-analysis problem that DP's reusable holdout addresses
