---
title: "Index: Abadi 2016 - Deep Learning with Differential Privacy"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 7
---

# Abadi 2016 - Deep Learning with Differential Privacy

> [!abstract] Routing Summary
> This folder fully captures Abadi et al. (2016), *Deep Learning with Differential Privacy* (ACM CCS 2016; arXiv 1607.00133): DP-SGD (per-example $\ell_2$ clipping plus Gaussian noise on sampled lots), the moments accountant (Theorems 1-2, Lemma 3, Lemma C.1), hyperparameter search cost (Theorem D.1), and the MNIST/CIFAR-10 experiments. It contains 7 notes covering every section, theorem and appendix.
> - Need the paper on one page, headline numbers or the section-to-note map? -> [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
> - Need Definition 1, the Gaussian mechanism, sensitivity, or the threat model? -> [[Abadi 2016 - DP Background and Gaussian Mechanism]]
> - Need Algorithm 1, clipping, lots vs batches, the code in Figure 1, DP PCA, or a runnable DP-SGD step? -> [[Abadi 2016 - DP-SGD Algorithm and Implementation]]
> - Need Theorems 1-2, Lemma 3, Lemma C.1 with proofs, the sampled-Gaussian moments, or a script reproducing $\varepsilon=1.26$? -> [[Abadi 2016 - Moments Accountant Theorems and Proofs]]
> - Need how to tune $L$, $C$, $\sigma$, learning rate, or the cost of trying many settings (Theorem D.1)? -> [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]]
> - Need MNIST/CIFAR-10 accuracy at each $\varepsilon$, the parameter-sensitivity findings, or the accountant vs strong-composition table? -> [[Abadi 2016 - MNIST and CIFAR-10 Experiments]]
> - Need related work, caveats, or how this applies to marketing measurement? -> [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| $(\varepsilon,\delta)$-DP; sensitivity; Gaussian mechanism | [[Abadi 2016 - DP Background and Gaussian Mechanism]] | definition | none | $\delta\ge\frac45e^{-(\sigma\varepsilon)^2/2},\ \varepsilon<1$ |
| DP-SGD (Algorithm 1) | [[Abadi 2016 - DP-SGD Algorithm and Implementation]] | concept | Gaussian mechanism | clip to $C$, noise $\mathcal N(0,\sigma^2C^2I)$ on lot sum |
| Privacy loss and log moments $\alpha_{\mathcal M}(\lambda)$ | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] | definition | DP definition | moments add under composition |
| Theorem 2 (composability, tail bound) | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] | theorem | log moments | $\delta=\min_\lambda e^{\alpha(\lambda)-\lambda\varepsilon}$ |
| Lemma 3 (sampled Gaussian moments) | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] | theorem | sampled Gaussian | $\alpha(\lambda)\lesssim q^2\lambda(\lambda+1)/((1-q)\sigma^2)$ |
| Theorem 1 (main) | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] | theorem | Lemma 3, Theorem 2 | $\sigma\ge c_2q\sqrt{T\log(1/\delta)}/\varepsilon$ |
| Lemma C.1 | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] | theorem | DP definition | $\varepsilon$-DP gives a moment bound |
| Theorem D.1 (private hyperparameter search) | [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]] | theorem | $\varepsilon$-DP | about 6,700 settings at cost 4 |
| MNIST and CIFAR-10 results | [[Abadi 2016 - MNIST and CIFAR-10 Experiments]] | example | Algorithm 1, accountant | 97% / 73% at $(8,10^{-5})$ |
| Caveats and marketing reading | [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]] | concept | all of the above | report $q,\sigma,C,T,\delta$ and accountant |

## Notes

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]] — CONTAINS: research question, three contributions, threat model, headline numbers table, full Source Map (every section and appendix -> note), one-paragraph idea.
- [[Abadi 2016 - DP Background and Gaussian Mechanism]] — CONTAINS: Def. 1 approximate DP, adjacency, composability/group privacy/auxiliary information, sensitivity, Gaussian mechanism and its condition, accountant, three-step blueprint, threat model, worked $\sigma=4$ example.
- [[Abadi 2016 - DP-SGD Algorithm and Implementation]] — CONTAINS: SGD setup, Algorithm 1, norm clipping, per-layer parameters, lots vs batches, Figure 1 code description, sanitizer, per-example gradients, accountant, DP PCA, convolutional layers, noise-magnitude example, Python DP-SGD step.
- [[Abadi 2016 - Moments Accountant Theorems and Proofs]] — CONTAINS: privacy loss and log-moment definitions, Theorem 2 with proof, Eqs. 3-4, Lemma 3 with proof sketch, Theorem 1 with proof, Lemma C.1, Python reproduction of $\varepsilon=1.26$.
- [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]] — CONTAINS: tuning guidance, Theorem D.1, application to search, 6,700-settings calculation, Python check.
- [[Abadi 2016 - MNIST and CIFAR-10 Experiments]] — CONTAINS: Figure 2 comparison table, MNIST setup and accuracy table, parameter-sensitivity table (Figure 5), CIFAR-10 architecture, public-pretraining protocol, accuracy table, frontier interpretation.
- [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]] — CONTAINS: related work along three axes, conclusions, caveats, marketing-measurement reading (labelled inference), reporting example.

## Sources
- Abadi 2016 - Deep Learning with Differential Privacy — Abadi M, Chu A, Goodfellow I, McMahan HB, Mironov I, Talwar K, Zhang L (2016), CCS 2016, full version arXiv 1607.00133v2, 14 pages; the sole source for all notes.

## See Also
- [[Mironov 2017 - Renyi Differential Privacy - Overview]] — the moments accountant as a privacy definition.
- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]] — a sharper analysis of the same algorithm.
- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]] — zCDP accounting at national scale.
- [[Overfitting and Information Criteria]], [[Model Selection and Overfitting]] — generalization context.
