---
title: "Concept - Topic Model Evaluation and Stability"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/concept-note
source: "concept note, no raw source"
source_location: "Concept note, no raw source; literature: Chang et al. 2009, Mimno et al. 2011, Bouma 2009, Lau et al. 2014, Dieng et al. 2020; Arora et al. 2012 Sec. 5.1 (read)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Concept Notes - Segmentation, Label Switching and Newer Topic Models"
doc_type: concept
depends_on:
  - "[[Arora 2012 - Experiments and Evaluation Metrics]]"
  - "[[Blei 2003 - Smoothed LDA, Examples and Experiments]]"
used_by:
  - "[[Concept - Short-Text Topic Models GSDMM and BTM]]"
  - "[[Concept - Neural and Embedding Topic Models]]"
aliases:
  - "topic coherence NPMI"
  - "topic diversity"
  - "top-word stability Jaccard"
  - "topic model yardsticks"
---

# Concept - Topic Model Evaluation and Stability

> [!summary]
> Concept note (no raw source, except the coherence and uniqueness metrics taken from Arora et al.). No single score ranks topic models: held-out likelihood can disagree with human interpretability (Chang et al. 2009), so combine coherence (UMass/NPMI), diversity, top-word stability across restarts, and a downstream cross-validated task.

## Main Content
> [!definition] Yardsticks
> - *Held-out perplexity / log-likelihood*: $\exp\{-\sum\log p(\mathbf w_d)/\sum N_d\}$ ([[Blei 2003 - Smoothed LDA, Examples and Experiments]]).
> - *UMass coherence* (Mimno et al. 2011): $\sum_{w_1,w_2}\log\frac{D(w_1,w_2)+\epsilon}{D(w_2)}$ ([[Arora 2012 - Experiments and Evaluation Metrics]]).
> - *NPMI coherence* (Bouma 2009; shown to track human judgments by Lau, Newman, Baldwin 2014): mean over top-word pairs of $\dfrac{\log\{p(w_i,w_j)/(p(w_i)p(w_j))\}}{-\log p(w_i,w_j)}\in[-1,1]$, with probabilities from document co-occurrence.
> - *Topic diversity* (Dieng et al. 2020): fraction of unique words among the union of all topics' top-$N$ words. Related: unique words per topic (Arora et al.).
> - *Stability*: refit with $R$ random restarts and compare top-word sets; match topics across fits with the Hungarian algorithm on Jaccard similarity and report the mean matched Jaccard.
> - *Downstream*: cross-validated $R^2$ (or log-score) of a model using topic proportions as predictors.

^def-topic-yardsticks

**Reading them together.** High coherence with low diversity signals redundant topics; high diversity with low coherence signals junk topics; low stability signals multimodality or label-dependent fits (so also see [[Concept - Label Switching and Label-Invariant Summaries]]). Arora et al. found anchor-recovery topics with better coherence but fewer unique words than Gibbs topics.

## Examples
> [!example] Runnable yardsticks
> NPMI for a topic's top words from a document-word matrix, topic diversity, and Hungarian-matched Jaccard stability between two fits.

^ex-yardsticks

```python
import itertools, numpy as np
from scipy.optimize import linear_sum_assignment

def npmi_topic(top, D, eps=1e-12):       # D: (docs, vocab) binary presence
    p = D.mean(0); vals = []
    for i, j in itertools.combinations(top, 2):
        pij = (D[:, i] * D[:, j]).mean() + eps
        vals.append(np.log(pij / (p[i] * p[j])) / (-np.log(pij)))
    return float(np.mean(vals))

def diversity(tops):
    allw = [w for t in tops for w in t]; return len(set(allw)) / len(allw)

def stability(tops_a, tops_b):
    J = np.array([[len(set(a) & set(b)) / len(set(a) | set(b)) for b in tops_b] for a in tops_a])
    r, c = linear_sum_assignment(-J); return J[r, c].mean()

print(diversity([[0, 1, 2], [2, 3, 4]]))                            # 0.833
print(stability([[0, 1, 2], [3, 4, 5]], [[3, 4, 6], [0, 1, 2]]))    # 0.75
```

## Relevance to marketing measurement
Before using topics as features or segments, report stability across restarts and a downstream CV metric, not only coherence; cite the number of restarts and the matching rule so the results are reproducible.

## Connections
[[Posterior Predictive Checking]] (model-based checks), [[Monsters and Mixtures]].

## See Also
[[Arora 2012 - Practical Provable Topic Modeling - Overview]], [[Blei 2003 - LDA Beyond Text Baskets and Sessions]]
