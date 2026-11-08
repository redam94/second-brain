---
title: "Index: Counting the Unobserved"
tags:
  - type/index
  - source/ingested
  - topic/population-estimation
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 24
---

# Counting the Unobserved

> [!abstract] Routing Summary
> This cluster covers estimating how many things were missed: site occupancy with imperfect detection, N-mixture models and their identifiability, closed-population capture-recapture, and multiple-systems estimation (log-linear and latent-class). It has 5 sub-folders and 24 notes, written to cover the methods used in the PyMC worked examples E28, E30, E69, E109 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Aleshin-Guendel 2020: [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]]
> - Barker 2018: [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
> - MacKenzie et al 2002: [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]
> - Silverman 2020: [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
^routing-summary

## Sub-topics

- [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models/_Index|Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models]] (4 notes) — COVERS: Aleshin-Guendel (2020, arXiv:2008.09865) proves that a family of $J$-class latent class models for multiple-systems estimation with $K$ lists is identifiable if and only if $2J\le K$. Applications of Manrique-Vallier's (2016) LCMCR method that use more classes than $K/2$ (e.g. the default $J^*=5$ with fewer than 10 lists) therefore use non-identifiable
- [[Barker 2018 - Reliability of N-Mixture Models/_Index|Barker 2018 - Reliability of N-Mixture Models]] (4 notes) — COVERS: Barker, Schofield, Link and Sauer (2018, *Biometrics* 74(1): 369-377) argue that N-mixture models, which estimate abundance $N$ and detection $p$ from repeated unmarked counts, rest on an identifiability that comes from the binomial and constant-$p$ assumptions, not from the data. Plausible alternatives in which $N$ is non-identifiable or does not exist fit practically as well. Reliable inference…
- [[Concept Notes - Counting the Unobserved (no raw source)/_Index|Concept Notes - Counting the Unobserved (no raw source)]] (4 notes) — COVERS: Concept notes: [[Concept - Closed-Population Capture-Recapture and Otis Models]], [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]], [[Concept - Marginalising Latent Discrete Counts for HMC]], [[Concept - Unseen Species and Latent Class Links]]
- [[MacKenzie et al 2002 - Site Occupancy with Imperfect Detection/_Index|MacKenzie et al 2002 - Site Occupancy with Imperfect Detection]] (4 notes) — COVERS: MacKenzie, Nichols, Lachman, Droege, Royle and Langtimm (2002, *Ecology* 83(8): 2248-2255) show how to estimate the proportion of sites occupied by a species when it can be present yet go undetected. Repeated visits give detection histories; a two-part likelihood (occupancy $\psi$, detection $p$) recovers $\psi$. Key takeaway: the naive fraction of sites where the species was seen is biased low,…
- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery/_Index|Silverman 2020 - Multiple Systems Analysis for Modern Slavery]] (8 notes) — COVERS: Silverman (JRSS-A 2020; arXiv 1902.06078 "Model fitting in Multiple Systems Analysis for the quantification of Modern Slavery: Classical and Bayesian approaches") reviews how multiple systems estimation (MSE) of the "dark figure" depends on how list interactions are modelled. On four real data sets all existing methods show instabilities, so he proposes a Bayesian/thresholding approach (Gaussian…

## Motivating PyMC examples

E28, E30, E69, E109 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Aleshin-Guendel 2020 - On the Identifiability of Latent Class Models for Multiple-Systems Estimation.pdf]]
- [[raw/Barker 2018 - On the Reliability of N-Mixture Models for Count Data.pdf]]
- [[raw/MacKenzie 2002 - Estimating Site Occupancy Rates When Detection Probabilities Are Less Than One.pdf]]
- [[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
