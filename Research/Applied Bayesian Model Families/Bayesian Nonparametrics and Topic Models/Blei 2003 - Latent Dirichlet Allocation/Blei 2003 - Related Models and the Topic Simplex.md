---
title: "Blei 2003 - Related Models and the Topic Simplex"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Sec. 4 (4.1-4.4, Figs 3-4), pp. 1000-1004"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
depends_on:
  - "[[Blei 2003 - LDA Generative Model and Exchangeability]]"
used_by:
  - "[[Blei 2003 - Smoothed LDA, Examples and Experiments]]"
aliases:
  - "pLSI versus LDA"
  - "mixture of unigrams"
  - "topic simplex geometry"
---

# Blei 2003 - Related Models and the Topic Simplex

> [!summary]
> Unigram models use one point on the word simplex; mixture of unigrams selects one of $k$ points per document; pLSI gives each training document its own mixture but is not a generative model of new documents and has $kV+kM$ parameters; LDA uses a smooth Dirichlet distribution over the topic simplex with $k+kV$ parameters.

## Main Content

| Model | Doc probability | Parameters | Limitation |
|---|---|---|---|
| Unigram (4.1) | $p(\mathbf w)=\prod_np(w_n)$ | $V-1$ | single distribution for the whole corpus |
| Mixture of unigrams (4.2; Nigam et al. 2000) | $p(\mathbf w)=\sum_zp(z)\prod_np(w_n\mid z)$ | $k-1$ mixing + $kV$ | exactly one topic per document |
| pLSI (4.3; Hofmann 1999) | $p(d,w_n)=p(d)\sum_zp(w_n\mid z)p(z\mid d)$ | $kV+kM$ (linear in $M$) | $d$ is a dummy index; no generative model for unseen documents; overfits |
| LDA | Eq. 3 | $k+kV$ | $k$ fixed |

Mixture of unigrams has $k-1$ free mixing parameters, LDA has $k$ Dirichlet parameters, i.e. only one more.

> [!theorem] Geometric interpretation (4.4)
> All four models live on the $(V-1)$-simplex of word distributions. The unigram model is one point. Latent-variable models choose $k$ points spanning the **topic simplex**. Mixture of unigrams: each document is generated from one vertex. pLSI: documents lie at an empirical set of points inside the topic simplex (one per training document, a discrete empirical distribution on the topic simplex). LDA: a smooth distribution (Dirichlet) over the whole topic simplex.

^thm-topic-simplex

**Why pLSI overfits.** Assigning probability to a new document by marginalising over $d$ restricts it to topic proportions seen in training; folding-in refits $k-1$ parameters on the test document and is therefore an unfair advantage. In the mixture of unigrams overfitting arises from peaked posteriors (hard clustering, as in naive Bayes) producing very small word probabilities for unseen words.

## Examples
> [!example] Parameter counts
> $V=10{,}000$, $k=50$, $M=100{,}000$: LDA has $50+500{,}000=500{,}050$ parameters regardless of $M$; pLSI has $kV+kM=500{,}000+5{,}000{,}000$.

^ex-param-counts

## Connections
This is the pLSI-to-LDA step that [[Arora 2012 - Practical Provable Topic Modeling - Overview]] revisits through admixtures, and the motivation for "after LDA" comparisons (E73).

## See Also
[[Blei 2003 - Latent Dirichlet Allocation - Overview]]
