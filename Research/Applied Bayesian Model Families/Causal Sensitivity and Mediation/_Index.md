---
title: "Index: Causal Sensitivity and Mediation"
tags:
  - type/index
  - source/ingested
  - topic/causal-sensitivity
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 32
---

# Causal Sensitivity and Mediation

> [!abstract] Routing Summary
> This cluster covers how robust a causal estimate is to hidden confounding (partial-R² robustness values, Tukey-factorization sensitivity), causal mediation (ACME, sequential ignorability, the unidentified error correlation), shrinking observational estimates toward a few experiments, and keeping answers on identified quantities. It has 5 sub-folders and 32 notes, written to cover the methods used in the PyMC worked examples E35, E62, E101-E103, E107 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Cinelli Hazlett 2020: [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
> - Franks DAmour Feller 2019: [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]]
> - Imai Keele Yamamoto 2010: [[Imai 2010 - Causal Mediation Analysis - Overview]]
> - Rosenman 2020: [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
^routing-summary

## Sub-topics

- [[Cinelli Hazlett 2020 - Making Sense of Sensitivity/_Index|Cinelli Hazlett 2020 - Making Sense of Sensitivity]] (9 notes) — COVERS: Cinelli & Hazlett (JRSS-B 2020) extend the classical omitted-variable-bias (OVB) formula into a sensitivity toolkit for OLS that needs no model of the confounder or of treatment assignment. Two partial-$R^2$ numbers, the **robustness value** $RV_q$ and the **extreme-scenario** $R^2_{Y\sim D|X}$, summarise how strong unobserved confounding must be to change a conclusion; a formal **bounding**…
- [[Franks DAmour Feller 2019 - Flexible Sensitivity Analysis/_Index|Franks DAmour Feller 2019 - Flexible Sensitivity Analysis]] (7 notes) — COVERS: Franks, D'Amour & Feller (JASA 2020) build a Bayesian-friendly sensitivity analysis for unmeasured confounding from **Tukey's factorization**: the missing potential-outcome distribution is the observed one *tilted* by an unidentified selection function $f(T|Y(t),X)$. Because the observed-data model is fit once and never depends on the sensitivity parameters, the parameters are genuinely…
- [[Imai Keele Yamamoto 2010 - Causal Mediation Analysis/_Index|Imai Keele Yamamoto 2010 - Causal Mediation Analysis]] (7 notes) — COVERS: Imai, Keele & Yamamoto (Statistical Science 2010) prove that under a **sequential ignorability** assumption the average causal mediation effect (ACME) and average natural direct effects are nonparametrically identified, show that the Baron-Kenny product of coefficients $\beta_2\gamma$ is a causal ACME under that assumption plus no treatment-mediator interaction, give nonparametric estimators, and…
- [[Rosenman 2020 - Combining Observational and Experimental Datasets/_Index|Rosenman 2020 - Combining Observational and Experimental Datasets]] (7 notes) — COVERS: Rosenman, Basse, Owen & Baiocchi (arXiv 2020) combine a small randomised study (unbiased, high-variance estimates $\hat\tau_r$ of $K$ stratum effects) with a large observational study ($\hat\tau_o$, low-variance but with unknown stratum-level bias $\xi$ from unmeasured confounding). Stein-type shrinkage estimators $\kappa_1^+,\kappa_2^+$ trade off the two by minimising an unbiased risk estimate,…
- [[Unidentified Parameters and Question Contracts (concept)/_Index|Unidentified Parameters and Question Contracts (concept)]] (2 notes) — COVERS: Concept notes: [[Unidentified Parameters - Keeping the Answer on the Question]], [[Unidentified Parameters - Partial Identification and Bayesian Updating]]

## Motivating PyMC examples

E35, E62, E101-E103, E107 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]
- [[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]
- [[raw/Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation.pdf]]
- [[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
