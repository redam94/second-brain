---
title: "Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview"
tags:
  - source/ingested
  - topic/population-estimation
  - type/overview
  - doc/paper
source: "[[raw/Aleshin-Guendel 2020 - On the Identifiability of Latent Class Models for Multiple-Systems Estimation.pdf]]"
source_location: "Entire paper (arXiv:2008.09865v1, 8 pages)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]"
used_by:
  - "[[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]"
  - "[[Aleshin-Guendel 2020 - Mixed-Moments Theorem]]"
  - "[[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]"
aliases:
  - Aleshin-Guendel latent class identifiability overview
---

# Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview

> [!summary]
> Aleshin-Guendel (2020, arXiv:2008.09865) proves that a family of $J$-class latent class models for multiple-systems estimation with $K$ lists is identifiable if and only if $2J\le K$. Applications of Manrique-Vallier's (2016) LCMCR method that use more classes than $K/2$ (e.g. the default $J^*=5$ with fewer than 10 lists) therefore use non-identifiable families.

## Overview

**Why this paper stands in for Manrique-Vallier (2016).** Manrique-Vallier's Biometrics paper ("Bayesian population size estimation using Dirichlet process mixtures") is only available from the author's university site, which blocks automated downloads (not circumvented). This arXiv paper is a legal open source that restates the latent-class MSE model, states the identification condition, and shows what is wrong with the LCMCR default. LCMCR itself is covered in [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]] (concept note, no raw source). Manrique-Vallier (2016) remains a follow-on ingest.

**Contributions.** (1) A mechanism for verifying identifiability in $M_{th}$ models via moments of the mixing distribution (Theorem 1). (2) Necessary and sufficient condition for latent class models (Theorem 2): $2J\le K$.

**Key numbers.** $K=2$, $J=2$: two distinct two-class models give the same observed cell probabilities $\tilde\pi=(0.276,0.276,0.448)$ but missing-cell probabilities $0.316$ vs $0.219$, i.e. different population sizes for the same data (Table 1).

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E109** - "Counting the uncounted" (latent-class MSE with classes summed out and label switching; Kosovo via LCMCR).
- **E69** - "Truth without a gold standard: latent class models for noisy raters and diagnostic tests" (parameter vs degrees-of-freedom counting; the same latent-class identification logic).

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction (Mh, Mth, identifiability literature) | this note; [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]] |
| 2.1 Model description; 2.2 identifiability in Mth models (Def. 1); 2.3 latent class models | [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]] |
| 3 Mixed moments (Lemma 1, Theorem 1) | [[Aleshin-Guendel 2020 - Mixed-Moments Theorem]] |
| 4.1 The answer (Theorem 2, proof) | [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]] |
| 4.2 Implications (LCMCR default, Table 1, applications) | [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]] |
| Appendix 1 (full rank), Appendix 2 (counterexample moments) | [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]] |
| References | folder index (Sources section) |

## Connections

- Empirical instability of LCMCR on real data: [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]].
- N-mixture identifiability by assumption, not by data: [[Barker 2018 - Reliability of N-Mixture Models - Overview]].
- Mixture models background: [[Monsters and Mixtures]], [[Nonparametric Models Overview]].

## See Also

- [[Concept - Closed-Population Capture-Recapture and Otis Models]]
- [[Concept - Unseen Species and Latent Class Links]]
