---
title: "Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE"
tags:
  - source/ingested
  - topic/latent-traits
  - type/definition
  - doc/paper
source: "[[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]"
source_location: "Sec. 2.1-2.2, pp. 572-573 (Figs. 1-3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Paun 2018 - Comparing Bayesian Models of Annotation"
doc_type: paper
depends_on:
  - "[[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]"
used_by:
  - "[[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]]"
  - "[[Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)]]"
aliases:
  - Dawid-Skene model
  - MACE annotation model
  - Dawid and Skene 1979 observer error rates
---

# Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE

> [!summary]
> The simplest annotation model (MULTINOM) assumes all annotators share one response distribution per true class. Dawid & Skene (1979) give every annotator their own confusion matrix; MACE (Hovy et al. 2013) instead gives each annotator a credibility and a spamming distribution. Both unpooled models are latent class models whose latent variable is the item's true class.

## Overview

Notation: items $i=1..I$, annotators $j=1..J$, classes $k=1..K$, annotation positions $n=1..N_i$ for item $i$; $jj[i,n]$ = annotator of the $n$-th annotation of item $i$; $c_i$ = true class; $y_{i,n}$ = label given; $\mathbf 1_K$ = vector of ones.

## Main Content

> [!definition] MULTINOM (pooled; Albert & Dodd 2004; Carpenter 2008)
> $\zeta_k\sim\text{Dirichlet}(\mathbf 1_K)$ for each class $k$; prevalence $\pi\sim\text{Dirichlet}(\mathbf 1_K)$; $c_i\sim\text{Categorical}(\pi)$; $y_{i,n}\sim\text{Categorical}(\zeta_{c_i})$.
> One response distribution per true class, shared by every annotator ("same ability").
> ^def-multinom

> [!definition] Dawid-Skene (D&S; unpooled)
> $\beta_{j,k}\sim\text{Dirichlet}(\mathbf 1_K)$ for each annotator $j$ and class $k$ (row $k$ of the confusion matrix $\beta_j$); $\pi\sim\text{Dirichlet}(\mathbf 1_K)$; $c_i\sim\text{Categorical}(\pi)$; $y_{i,n}\sim\text{Categorical}(\beta_{jj[i,n],c_i})$.
> Marginal likelihood (summing out $c_i$): $p(y_i)=\sum_{k}\pi_k\prod_{n}\beta_{jj[i,n],k,y_{i,n}}$. Dawid & Skene (1979) fit by EM (MLE); here, fixed Dirichlet priors regularize and posteriors are sampled with HMC.
> ^def-dawid-skene

> [!definition] MACE (Hovy et al. 2013; unpooled)
> Per annotator: spamming preference $\xi_j\sim\text{Dirichlet}(10\cdot\mathbf 1_K)$, credibility $\theta_j\sim\text{Beta}(0.5,0.5)$. Per item: $c_i\sim\text{Uniform}$. Per annotation: spam indicator $s_{i,n}\sim\text{Bernoulli}(1-\theta_{jj[i,n]})$; if $s_{i,n}=0$ then $y_{i,n}=c_i$, else $y_{i,n}\sim\text{Categorical}(\xi_{jj[i,n]})$.
> ^def-mace

**Difference.** D&S has $K(K-1)$ free parameters per annotator and captures systematic confusions (e.g., PR mistaken for DN). MACE has $K$ per annotator and models a pure spamming strategy: with credibility $\theta_j=0$ and $\xi_j$ concentrated on one class it exactly describes "always answers DN". A D&S spammer's confusion matrix has identical rows, so their label carries no information about the true class and their contribution cancels in the posterior (Passonneau & Carpenter 2014).

> [!theorem] Posterior over true class (D&S)
> $P(c_i=k\mid y,\pi,\beta)\propto\pi_k\prod_n\beta_{jj[i,n],k,y_{i,n}}$. Majority vote implicitly corresponds to every annotator having the same symmetric confusion matrix ($\beta_{j,k,k'}=a$ if $k=k'$, equal off-diagonal otherwise) with a flat prior; this is an interpretation, not a claim made in the paper.
> ^thm-ds-posterior

## Examples

> [!example] Dawid-Skene by EM on simulated data
> **Setup.** 300 binary items, 6 annotators with accuracies $.9,.85,.8,.75,.55,.5$ (the last two near-spammers), all annotators label all items.
> **Solution.** Initialise posteriors from vote proportions; iterate (M) estimate $\pi$ and confusion matrices from soft counts, (E) update class posteriors.
> **Result (seed 1).** D&S recovers 92.3% of true labels versus 87.7% for majority vote, and estimated per-annotator accuracy (diagonal means) is $0.93,0.85,0.84,0.74,0.55,0.49$.
> **Interpretation.** Down-weighting uninformative raters beats one-person-one-vote.
> ^ex-ds-em

```python
import numpy as np
def dawid_skene(y, K, iters=50):
    """y: list of (item, annotator, label). Returns class posteriors T, prevalence pi, confusion CM[J,K,K]."""
    I = max(i for i,_,_ in y)+1; J = max(j for _,j,_ in y)+1
    T = np.zeros((I,K))
    for i,j,l in y: T[i,l]+=1
    T /= T.sum(1, keepdims=True)                   # majority-vote init
    for _ in range(iters):
        pi = T.mean(0)
        CM = np.full((J,K,K), 0.01)                # small smoothing (Dirichlet-like)
        for i,j,l in y: CM[j,:,l] += T[i]
        CM /= CM.sum(2, keepdims=True)
        logT = np.tile(np.log(pi), (I,1))
        for i,j,l in y: logT[i] += np.log(CM[j,:,l])
        T = np.exp(logT-logT.max(1,keepdims=True)); T /= T.sum(1,keepdims=True)
    return T, pi, CM
```

PyMC-style sketch (untested; marginalise the latent class with `logsumexp`):

```python
import pymc as pm, pytensor.tensor as pt
with pm.Model():
    pi = pm.Dirichlet("pi", np.ones(K))
    beta = pm.Dirichlet("beta", np.ones(K), shape=(J, K, K))     # beta[j, true, observed]
    # log_lik[i,k] = log pi[k] + sum_n log beta[j_n, k, y_n]
    ll = pt.log(pi)[None, :] + pt.zeros((I, K))
    ll = pt.inc_subtensor(ll[item_idx], pt.log(beta[ann_idx, :, label]))
    pm.Potential("lik", pm.math.logsumexp(ll, axis=1).sum())
```

## Connections

- Item-level latent class with confusion matrices is the multi-rater generalisation of the Hui-Walter two-test model; see [[Hui-Walter and Latent Class Models for Diagnostic Tests (Concept Note)]].
- Mixture and label-switching issues: [[Monsters and Mixtures]]; [[Paun 2018 - Implementation Priors Label Switching and Guidelines]].

## See Also

[[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]] · [[Paun 2018 - Evaluation Protocol and Results Tables]]
