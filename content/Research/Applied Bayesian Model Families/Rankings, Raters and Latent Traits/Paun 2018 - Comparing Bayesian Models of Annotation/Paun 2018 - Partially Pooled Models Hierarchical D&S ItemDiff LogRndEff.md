---
title: "Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff"
tags:
  - source/ingested
  - topic/latent-traits
  - type/definition
  - doc/paper
source: "[[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]"
source_location: "Sec. 2.3, pp. 573-574 (Figs. 4-6)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Paun 2018 - Comparing Bayesian Models of Annotation"
doc_type: paper
depends_on:
  - "[[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Paun 2018 - Evaluation Protocol and Results Tables]]"
aliases:
  - Hierarchical Dawid-Skene
  - Logistic random effects annotation model
  - Item difficulty annotation model
---

# Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff

> [!summary]
> Hierarchical priors let the data decide how much annotators (or items) are alike. HIERD&S puts Normal priors on confusion-matrix logits; ITEMDIFF models item difficulty only; LOGRNDEFF combines annotator ability and item difficulty in a logistic (Rasch-like) subtractive structure.

## Overview

All three use softmax-link logits instead of Dirichlet rows: annotator ability $\beta_{j,k,\cdot}\in\mathbb R^K$ is a logit vector for responses when the true class is $k$.

## Main Content

> [!definition] Hierarchical Dawid-Skene (HIERD&S)
> Class-level hyperparameters: $\zeta_{k,k'}\sim N(0,1)$, $\Omega_{k,k'}\sim\text{HalfNormal}(0,1)$. Annotator abilities $\beta_{j,k,k'}\sim N(\zeta_{k,k'},\Omega_{k,k'})$. Prevalence $\pi\sim\text{Dirichlet}(\mathbf 1_K)$, $c_i\sim\text{Cat}(\pi)$, $y_{i,n}\sim\text{Categorical}(\text{softmax}(\beta_{jj[i,n],c_i}))$.
> Partial pooling regularises annotators with few annotations toward the population mean; it asymptotes to unpooled D&S when $\Omega$ is large and to the pooled model when $\Omega\to0$.
> ^def-hier-ds

> [!definition] Item difficulty (ITEMDIFF; extends Carpenter's "Beta-Binomial by Item")
> Class-level difficulty means $\eta_{k,k'}\sim N(0,1)$ and s.d.'s $X_{k,k'}\sim\text{HalfNormal}(0,1)$; $c_i\sim\text{Cat}(\pi)$; item difficulty vector $\theta_{i,k}\sim N(\eta_{c_i,k},X_{c_i,k})$; $y_{i,n}\sim\text{Categorical}(\text{softmax}(\theta_i))$. No annotator structure. Each item's label distribution is its own.
> ^def-itemdiff

> [!definition] Logistic random effects (LOGRNDEFF; Carpenter 2008)
> Annotator ability as in HIERD&S ($\zeta,\Omega$) and item difficulty $\theta_{i,k}\sim N(0,X_{c_i,k})$ with $X\sim\text{HalfNormal}(0,1)$. Annotation:
> $$
> y_{i,n}\sim\text{Categorical}\bigl(\text{softmax}(\beta_{jj[i,n],c_i}-\theta_i)\bigr).
> $$
> The subtractive "ability minus difficulty" is the Rasch-model structure (see [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]).
> ^def-logrndeff

**Remark.** The name "difficulty" is slightly misleading in ITEMDIFF: without annotator parameters it indicates the most likely annotation classes. The paper therefore uses an independent model-confidence (entropy) measure of difficulty.

## Examples

> [!example] How partial pooling acts on a sparse annotator
> **Setup.** Annotator A labelled 3 items (3 correct); population mean accuracy 0.8 with between-annotator s.d. (logit scale) 0.5.
> **Solution.** Unpooled D&S would estimate accuracy near 1 (or Dirichlet-smoothed ~0.8 with a flat prior); HIERD&S shrinks toward 0.8 in proportion to $1/\Omega^2$ relative to the data precision.
> **Interpretation.** Partially pooled models avoid the predictive overfitting seen for unpooled D&S/MACE on small datasets (WSD).

PyMC-style non-centered sketch (untested):

```python
with pm.Model():
    zeta = pm.Normal("zeta", 0, 1, shape=(K, K))
    omega = pm.HalfNormal("omega", 1, shape=(K, K))
    z = pm.Normal("z", 0, 1, shape=(J, K, K))
    beta = zeta + omega * z                       # non-centered
    # then softmax(beta[j, c_i]) as the response probabilities
```

## Connections

- Hierarchical structure: [[Hierarchical Models]]; non-centered parameterization is the paper's recommended implementation ([[Paun 2018 - Implementation Priors Label Switching and Guidelines]]).

## See Also

[[Paun 2018 - Evaluation Protocol and Results Tables]]
