---
title: "Paun 2018 - Implementation Priors Label Switching and Guidelines"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/paper
source: "[[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]"
source_location: "Sec. 3, 6, 7, 8, pp. 574-582"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Paun 2018 - Comparing Bayesian Models of Annotation"
doc_type: paper
depends_on:
  - "[[Paun 2018 - Evaluation Protocol and Results Tables]]"
used_by:
  - "[[Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)]]"
aliases:
  - annotation model guidelines
  - label switching annotation models
---

# Paun 2018 - Implementation Priors Label Switching and Guidelines

> [!summary]
> Practical guidance: fit the models in Stan with weak priors, run four chains with $\hat R<1.1$, use non-centered parameterizations for hierarchical versions, and resolve label switching by relabelling chains with a small gold sample. Prefer models with annotator structure; use partial pooling when data are small or sparse; unpooled models are fine when the population is multimodal.

## Overview

Why Bayesian? Calibrated uncertainty, ability to add submodels (logistic regression for prevalence; annotator covariates; gold-standard labels), and hierarchical posteriors that are better-behaved than classical marginal-likelihood fits.

## Main Content

**Priors (Sec. 3).** Uniform $\text{Dirichlet}(\mathbf 1_K)$ for simplexes (avoid class preferences), weakly informative normal/half-normal for locations/scales (sd 1), MACE keeps its published priors. Convergence: four chains, diffuse inits, $\hat R<1.1$ (Gelman-Rubin).

> [!definition] Non-centered parameterization
> Instead of $\beta_j\sim N(\zeta,\Omega)$, sample $z_j\sim N(0,1)$ and set $\beta_j=\zeta+\Omega z_j$. Separates local parameters from their parents, raising effective sample size and lowering $\hat R$; the paper found it essential for robust partially pooled fits (cf. Betancourt & Girolami 2015).
> ^def-noncentered

> [!definition] Label switching and its fix
> The latent-class likelihood is invariant to permuting class labels, so chains can differ by a permutation and $\hat R$ is meaningless. Fix (Gelman et al. 2013): relabel each chain post hoc using a permutation chosen to maximise accuracy on a small gold sample (e.g., 5 items per class), then combine chains. Alternatives: class-informative priors, ordering constraints, other relabelling algorithms (Stephens 2000; Felt et al. 2014).
> ^def-label-switching

**Guidelines (Sec. 6.1).**
1. Fully pooled MULTINOM underperforms almost everywhere.
2. Unpooled D&S/MACE do well against gold but overfit predictively.
3. Partially pooled models adapt: unpooled behaviour when annotators differ greatly, pooled when they do not.
4. Ignoring annotator structure (MULTINOM, ITEMDIFF, MAJVOTE) is generally poor.
5. HIERD&S loses on PD because the annotator population is bimodal (a few strong coders plus many weak ones; a multimodal hierarchical prior might fit better).
6. Domain-independent: no difference in applying them to corpus annotation vs other crowdsourcing.

**Related work (Sec. 7).** Annotation models resemble item response and ideal-point models: Rasch assumes the correctness probability depends on ability minus difficulty, but is supervised, while annotation models are unsupervised and infer the correct labels too (cf. Skrondal & Rabe-Hesketh 2004; Gelman & Hill 2007; IRT recently in NLP, Lalor et al.). Feature models: Raykar et al. 2010 (logistic regression for prevalence), Felt et al. 2014/2015, Kamar et al. 2015.

**Conclusions (Sec. 8).** Models of annotation beat majority voting and agreement statistics; all six are released as Stan code.

## Examples

> [!example] A checklist for a rater study in marketing
> **Setup.** 40 raters grade 2,000 ad creatives for brand safety, each creative graded 3 times; 5 raters are suspected spammers.
> **Solution.** Fit HIERD&S (or D&S with Dirichlet priors); check $\hat R$ after relabelling chains with ~20 gold-checked items; inspect spammers' confusion matrices (identical rows) and credibility.
> **Interpretation.** Use inferred labels and uncertainty rather than majority vote; exclude no-one a priori because spammers self-cancel in D&S.

## Connections

- Hierarchical models: [[Hierarchical Models]]; Stan/HMC: [[HMC and Stan in Practice]]; mixtures: [[Monsters and Mixtures]].
- Rasch/IRT: [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]].

## See Also

[[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]
