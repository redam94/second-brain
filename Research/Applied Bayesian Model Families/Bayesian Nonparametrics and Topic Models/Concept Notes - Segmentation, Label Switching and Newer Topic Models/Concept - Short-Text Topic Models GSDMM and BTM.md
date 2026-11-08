---
title: "Concept - Short-Text Topic Models GSDMM and BTM"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; literature: Yin and Wang 2014 (KDD), Yan et al. 2013 (WWW), Nigam et al. 2000, Blei et al. 2003 Sec. 4.2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models"
doc_type: concept
depends_on:
  - "[[Blei 2003 - Related Models and the Topic Simplex]]"
  - "[[Arora 2012 - Practical Provable Topic Modeling - Overview]]"
used_by:
  - "[[Concept - Topic Model Evaluation and Stability]]"
aliases:
  - "GSDMM"
  - "Dirichlet multinomial mixture"
  - "biterm topic model"
  - "BTM"
  - "short text topic models"
---

# Concept - Short-Text Topic Models GSDMM and BTM

> [!summary]
> Concept note (no raw source). For very short documents (headlines, queries, tweets, small baskets) LDA's per-document $\theta_d$ is poorly estimated. GSDMM (Yin and Wang 2014) assumes one topic per document and uses a collapsed Gibbs sampler that can empty clusters, thus inferring a number of clusters; BTM (Yan et al. 2013) models unordered word pairs (biterms) across the whole corpus, avoiding per-document mixing.

## Main Content
**Why LDA struggles on short text.** A 5-word document gives about 5 tokens to estimate a $K$-dimensional $\theta_d$; co-occurrence statistics within each document are sparse. Two responses: restrict each document to a single topic (DMM/GSDMM), or pool co-occurrence at corpus level (BTM). Arora's anchor-word recovery likewise works on the corpus co-occurrence matrix $Q$ ([[Arora 2012 - Recover Algorithms RecoverKL and RecoverL2]]), which is also well defined for short documents.

> [!definition] Dirichlet multinomial mixture (DMM) and GSDMM
> Each document $d$ has one topic $z_d\sim\text{Mult}(\pi)$, $\pi\sim\text{Dir}(\alpha)$; its words are iid from $\phi_{z_d}\sim\text{Dir}(\beta)$. This is the Bayesian version of the mixture of unigrams ([[Blei 2003 - Related Models and the Topic Simplex]]). Collapsed Gibbs sampling ("movie group process") draws
> $$p(z_d=k\mid\mathbf z_{\neg d},\mathbf d)\propto\frac{m_{k,\neg d}+\alpha}{D-1+K\alpha}\cdot\frac{\prod_{w\in d}\prod_{j=1}^{N_d^w}(n_{k,\neg d}^w+\beta+j-1)}{\prod_{i=1}^{N_d}(n_{k,\neg d}+V\beta+i-1)},$$
> with $m_k$ the number of documents in cluster $k$, $n_k^w$ and $n_k$ the word and total token counts in $k$, $N_d^w$ the count of word $w$ in $d$, $N_d$ its length. Starting from a large $K$, clusters become empty, so the number of non-empty clusters adapts (Yin and Wang 2014, KDD).

^def-gsdmm

> [!definition] Biterm topic model (BTM)
> A biterm is an unordered pair of distinct words co-occurring in a short context (a document). Corpus-wide: $\theta\sim\text{Dir}(\alpha)$; each topic has $\phi_k\sim\text{Dir}(\beta)$; for each biterm $b=(w_i,w_j)$ draw $z\sim\text{Mult}(\theta)$ and both words $w_i,w_j\sim\text{Mult}(\phi_z)$. $P(b)=\sum_z\theta_z\phi_{z,w_i}\phi_{z,w_j}$. Document topic proportions are recovered a posteriori by $P(z\mid d)=\sum_bP(z\mid b)P(b\mid d)$ (Yan, Guo, Lan, Cheng 2013, WWW).

^def-btm

## Examples
> [!example] GSDMM recovers 3 clusters from 150 six-word documents
> Synthetic vocabulary of 30 words in three disjoint groups of ten; each document has six words from one group; start with $K=8$. After 15 sweeps of the sampler below, 3 clusters are occupied and the adjusted Rand index against the truth is 1.0.

^ex-gsdmm-synthetic

```python
import numpy as np
from collections import Counter
rng = np.random.default_rng(0)

def gsdmm(docs, V, K=10, alpha=0.1, beta=0.1, iters=15):
    D = len(docs); z = rng.integers(0, K, D)
    m = np.zeros(K); n = np.zeros(K); nw = np.zeros((K, V))
    for d, doc in enumerate(docs):
        m[z[d]] += 1; n[z[d]] += len(doc)
        for w in doc: nw[z[d], w] += 1
    for _ in range(iters):
        for d, doc in enumerate(docs):
            k = z[d]; m[k] -= 1; n[k] -= len(doc)
            for w in doc: nw[k, w] -= 1
            cnt = Counter(doc); logp = np.log(m + alpha)
            for kk in range(K):
                s = sum(np.log(nw[kk, w] + beta + np.arange(c)).sum() for w, c in cnt.items())
                logp[kk] += s - np.log(n[kk] + V * beta + np.arange(len(doc))).sum()
            p = np.exp(logp - logp.max()); p /= p.sum(); k = rng.choice(K, p=p)
            z[d] = k; m[k] += 1; n[k] += len(doc)
            for w in doc: nw[k, w] += 1
    return z
```

## Relevance to marketing measurement
Headline or ad-creative tests and search queries are short texts. GSDMM-style single-topic assignment gives a hard label usable for grouping creatives; BTM gives corpus-level themes. Evaluate with coherence, diversity and stability ([[Concept - Topic Model Evaluation and Stability]]) and check that downstream predictive lift (e.g. in a response model) survives cross-validation.

## Connections
[[Blei 2003 - LDA Beyond Text Baskets and Sessions]] (E72), [[Teh 2010 - DP Mixture Models and Applications]] (GSDMM's emptying clusters behave like a finite approximation to the DP/CRP number-of-clusters inference).

## See Also
[[Concept - Neural and Embedding Topic Models]]
