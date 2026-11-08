---
title: "Blei 2003 - Latent Dirichlet Allocation - Overview"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/overview
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Whole paper, JMLR 3, pp. 993-1022"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
depends_on:
  - "[[Nonparametric Models Overview]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Blei 2003 - LDA Generative Model and Exchangeability]]"
  - "[[Blei 2003 - Related Models and the Topic Simplex]]"
  - "[[Blei 2003 - Variational Inference and Parameter Estimation]]"
  - "[[Blei 2003 - Smoothed LDA, Examples and Experiments]]"
  - "[[Blei 2003 - LDA Beyond Text Baskets and Sessions]]"
aliases:
  - "LDA paper overview"
  - "Latent Dirichlet Allocation Blei Ng Jordan"
---

# Blei 2003 - Latent Dirichlet Allocation - Overview

> [!summary]
> LDA is a three-level hierarchical Bayesian model in which each document is a random mixture $\theta\sim\text{Dir}(\alpha)$ over $k$ topics and each word is drawn from the topic-word multinomial $\beta_{z}$. Exact inference is intractable; the paper gives a variational algorithm and shows lower held-out perplexity than unigram, mixture of unigrams and pLSI, with no overfitting blow-up.

## Overview
**Research question.** Model collections of discrete data so that documents can be mixtures of several topics, new documents get probability without heuristics, and the parameter count does not grow with the corpus.

**Contribution.** (1) LDA via de Finetti exchangeability; (2) comparison with unigram, mixture of unigrams, pLSI; (3) convexity-based variational inference with updates $\phi_{ni}\propto\beta_{iw_n}\exp\{\Psi(\gamma_i)-\Psi(\sum_j\gamma_j)\}$, $\gamma_i=\alpha_i+\sum_n\phi_{ni}$; (4) variational EM and a smoothed (fully Bayesian) $\beta$; (5) experiments on document modelling, classification and collaborative filtering.

**Key result.** LDA has $k+kV$ parameters, gives each unseen document a well-defined topic mixture, and attains the best perplexity across $k$ on C. Elegans and AP while the mixture of unigrams and pLSI (with folding-in) overfit without smoothing (Table 1).

## Source Map

| Paper section | Covered in |
|---|---|
| 1 Introduction (bag of words, tf-idf, LSI, pLSI, de Finetti motivation) | [[Blei 2003 - LDA Generative Model and Exchangeability]] |
| 2 Notation and terminology | [[Blei 2003 - LDA Generative Model and Exchangeability]] |
| 3 LDA; 3.1 exchangeability; 3.2 continuous mixture of unigrams | [[Blei 2003 - LDA Generative Model and Exchangeability]] |
| 4 Relationship with other latent variable models (4.1-4.4, Figs 3-4) | [[Blei 2003 - Related Models and the Topic Simplex]] |
| 5 Inference and parameter estimation (5.1-5.3, Figs 5-6, App. A) | [[Blei 2003 - Variational Inference and Parameter Estimation]] |
| 5.4 Smoothing (Fig. 7) | [[Blei 2003 - Smoothed LDA, Examples and Experiments]] |
| 6 Example (Fig. 8, AP corpus) | [[Blei 2003 - Smoothed LDA, Examples and Experiments]] |
| 7 Applications and empirical results (7.1 perplexity, Fig. 9, Table 1; 7.2 classification, Fig. 10; 7.3 collaborative filtering, Fig. 11) | [[Blei 2003 - Smoothed LDA, Examples and Experiments]] |
| 8 Discussion | [[Blei 2003 - Smoothed LDA, Examples and Experiments]] (extensions) and [[Blei 2003 - LDA Beyond Text Baskets and Sessions]] |
| Appendix A.1-A.4 derivations | [[Blei 2003 - Variational Inference and Parameter Estimation]] |

## Motivating PyMC examples
- **E72** Topic models beyond text: LDA for headlines (Upworthy), poster colours, web sessions (msnbc.com) and shopping baskets (UCI Online Retail); LDA with token topics summed out, label switching and Hungarian alignment. See [[Blei 2003 - LDA Beyond Text Baskets and Sessions]].
- **E73** After LDA: newer topic models, problem by problem (yardsticks, GSDMM, BTM, anchor-word recovery). See [[Arora 2012 - Practical Provable Topic Modeling - Overview]] and [[Concept - Short-Text Topic Models GSDMM and BTM]].
URL: [PyMC challenges examples](https://redam94.github.io/pymc-challenges/examples.html).

## Relevance to marketing measurement
The paper's own non-text demonstration is collaborative filtering (users as documents, movies as words). The same bag-of-items construction applies to baskets, ad-exposure sequences and search queries; topics become latent "needs" or "journeys". Topic proportions can be features in downstream response models, but they inherit identification issues (label switching, sensitivity to $k$).

## Connections
[[Hierarchical Models]] (LDA is a conditionally independent hierarchical model), [[Variational Inference - Overview]], [[Mean-Field Family and Coordinate Ascent VI (CAVI)]], [[Monsters and Mixtures]], [[Teh 2010 - Dirichlet Process - Overview]] (the DP picks the number of components; LDA fixes $k$).

## See Also
[[Research/Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation/_Index|Blei 2003 index]]
