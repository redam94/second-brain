---
title: "Concept - Neural and Embedding Topic Models"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; literature: Miao et al. 2016 (NVDM), Srivastava and Sutton 2017 (ProdLDA), Dieng et al. 2020 (ETM), Angelov 2020 (Top2Vec), Grootendorst 2022 (BERTopic)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models"
doc_type: concept
depends_on:
  - "[[Blei 2003 - Variational Inference and Parameter Estimation]]"
  - "[[Reparameterization Trick and Variational Autoencoders]]"
used_by:
  - "[[Concept - Topic Model Evaluation and Stability]]"
aliases:
  - "neural topic models"
  - "ProdLDA"
  - "embedded topic model"
  - "BERTopic"
---

# Concept - Neural and Embedding Topic Models

> [!summary]
> Concept note (no raw source). Neural topic models amortise variational inference for LDA-like models with an encoder network (NVDM, ProdLDA); embedding-based models (ETM) tie topics to word embeddings; clustering-based pipelines (Top2Vec, BERTopic) cluster document embeddings and extract keywords. They trade posterior uncertainty and interpretability guarantees for flexibility and short-text performance.

## Main Content
| Model | Idea | Reference |
|---|---|---|
| NVDM | VAE for bag-of-words: Gaussian latent document code, softmax decoder | Miao, Yu, Blunsom, ICML 2016 |
| ProdLDA | Replace LDA's mixture of topic-word distributions by a product of experts; amortised VI with a Laplace approximation to the Dirichlet in the softmax basis | Srivastava and Sutton, ICLR 2017 |
| ETM | Topic-word distribution $\beta_k=\text{softmax}(\rho^T\alpha_k)$ from word embeddings $\rho$ and topic embeddings $\alpha_k$ | Dieng, Ruiz, Blei, TACL 2020 |
| Top2Vec | Joint document/word embeddings, density-based clusters in reduced space | Angelov, arXiv 2020 |
| BERTopic | Sentence-transformer embeddings, UMAP, HDBSCAN, class-based TF-IDF for topic words | Grootendorst, arXiv 2022 |

> [!definition] Amortised inference for a topic model
> Replace per-document variational parameters $(\gamma_d,\phi_d)$ by an encoder $q_\psi(\theta_d\mid\mathbf w_d)$ with parameters $\psi$ shared across documents; optimise the ELBO $E_q[\log p(\mathbf w_d\mid\theta_d)]-D_{KL}(q_\psi\Vert p(\theta))$ with the reparameterisation trick ([[Reparameterization Trick and Variational Autoencoders]], [[Stochastic and Black-Box Variational Inference]]). Compared with the per-document coordinate updates of [[Blei 2003 - Variational Inference and Parameter Estimation]], inference is a single forward pass.

^def-amortised-topic

**Practical contrasts.** (i) Non-conjugate and deep architectures are easy to add (metadata, embeddings); (ii) results vary across random seeds and training runs, so stability checks are needed ([[Concept - Topic Model Evaluation and Stability]]); (iii) a point-estimated decoder has no posterior over topics unless extended; (iv) clustering pipelines assign each document to one cluster (plus an outlier class for HDBSCAN), more like GSDMM than LDA ([[Concept - Short-Text Topic Models GSDMM and BTM]]).

## Examples
> [!example] Where each fits
> Short noisy headlines: BTM/GSDMM or embedding clustering. Large corpora with metadata and a need for speed: amortised neural models. Small baskets, need for uncertainty and a clean generative story: LDA or hierarchical models with full Bayesian inference ([[Blei 2003 - LDA Beyond Text Baskets and Sessions]]).

^ex-model-selection

## Relevance to marketing measurement
Embedding-based topics can use pretrained semantic information for sparse text (creative copy, queries). Because they are estimated, not measured, treat topic labels as noisy covariates in downstream causal or response models and propagate or bootstrap that noise.

## Connections
[[Variational Inference - Overview]], [[Teh 2010 - Extensions and Reference Map]] (HDP for nonparametric choice of the number of topics).

## See Also
[[Concept - Topic Model Evaluation and Stability]]
