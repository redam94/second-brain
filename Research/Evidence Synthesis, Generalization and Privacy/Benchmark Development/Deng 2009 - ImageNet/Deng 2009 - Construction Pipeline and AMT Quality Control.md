---
title: "Deng 2009 - Construction Pipeline and AMT Quality Control"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Deng 2009 - ImageNet.pdf]]"
source_location: "Sec. 3 (3.1 Collecting Candidate Images, 3.2 Cleaning Candidate Images), Fig. 7, pp. 4-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Deng 2009 - ImageNet"
doc_type: paper
depends_on:
  - "[[Deng 2009 - ImageNet - Overview]]"
used_by:
  - "[[Deng 2009 - Dataset Properties and Comparison with Other Datasets]]"
  - "[[Deng 2009 - Applications and Future Work]]"
aliases:
  - ImageNet construction
  - ImageNet AMT adaptive consensus
  - ImageNet confidence score table
---

# Deng 2009 - Construction Pipeline and AMT Quality Control

> [!summary]
> ImageNet is built in two stages. Stage 1 over-collects candidate images (more than 10K per synset after de-duplication) by querying several image search engines with WordNet synonyms, parent-augmented queries and translations. Stage 2 has Amazon Mechanical Turk (AMT) workers verify each candidate, with the number of agreeing votes required for acceptance set *per synset* from a confidence-score table estimated on an initial heavily-voted sample. Key idea: consensus requirements must adapt to semantic difficulty ("Burmese cat" needs more votes than "cat").

## Overview

Search-engine image results are only about 10% accurate (Torralba et al., TinyImage, cited in the paper). Hand-labelling tens of millions of images is infeasible for a lab, but verifying images is a cheap binary task that scales on a crowdsourcing market. The paper's construction principle is therefore: **maximize recall cheaply, then buy precision with statistically controlled human verification**.

## Main Content

### Stage 1: collecting candidate images (Sec. 3.1)

1. **Query set per synset** = the set of WordNet synonyms for the synset.
2. **Query expansion** to beat search-engine result caps (a few hundred to about a thousand images per query): append a word from a *parent* synset when that word appears in the gloss of the target synset. Example in the paper: for "whippet" (gloss: "small slender dog of greyhound type developed in England") also query "whippet dog" and "whippet greyhound".
3. **Multilingual queries**: translate queries into Chinese, Spanish, Dutch and Italian using the WordNets of those languages, to enlarge and diversify the pool.
4. **De-duplicate within a synset**. Result: over 10K candidates per synset on average.

> [!definition] Candidate pool
> For synset $s$, the candidate pool $C_s$ is the set of de-duplicated images returned by all search-engine queries (synonyms, parent-augmented, translated) for $s$. Its precision is low (about 10%), but the target images are required to be a subset: $|C_s|$ must comfortably exceed the 500-1000 clean images wanted. ^def-candidate-pool

### Stage 2: cleaning with AMT (Sec. 3.2)

**The task.** Workers see a batch of candidate images plus the *definition of the target synset* (with a Wikipedia link) and decide, for each image, whether it contains an object of that synset. Workers are told to accept images regardless of occlusion, number of objects and scene clutter, to preserve diversity.

**Two quality problems.** (i) Workers make mistakes and some ignore instructions; (ii) workers disagree, especially for subtle, deep-in-the-tree categories. The remedy is *redundant independent labeling*: several users label the same image, and an image is positive only with a "convincing majority".

**Adaptive consensus.** Different synsets need different consensus levels. The algorithm:

1. For each synset, randomly sample an initial subset of images.
2. Ask **at least 10** workers to vote on each initial image.
3. From these votes, estimate a **confidence score table**: the probability that an image is "good" (truly depicts the synset) given the observed vote counts.
4. For the remaining candidates, keep requesting AMT votes until a pre-set confidence-score threshold is reached; then accept or reject.

> [!definition] Confidence score table
> For a synset $s$, let an image receive $a$ "Yes" and $b$ "No" votes. The confidence score is the empirical estimate
> $$\hat c_s(a,b)\;=\;\widehat{\Pr}\big(\text{image is good}\mid \#Y=a,\ \#N=b\big),$$
> estimated from the initial heavily-voted sample. An unlabeled candidate is accepted once $\hat c_s(a,b)\ge \tau$ for a predetermined threshold $\tau$, and rejected once the posterior of being good is low enough; otherwise another vote is solicited. ^def-confidence-table

The paper's Figure 7 (right) tabulates these scores for two categories ("Cat" vs "Burmese cat"; the "BCat" column) for different vote splits $(\#Y,\#N)$:

| #Y | #N | Conf, Cat | Conf, Burmese cat |
|---|---|---|---|
| 0 | 1 | 0.07 | 0.23 |
| 1 | 0 | 0.85 | 0.69 |
| 1 | 1 | 0.46 | 0.49 |
| 2 | 0 | 0.97 | 0.83 |
| 0 | 2 | 0.02 | 0.12 |
| 3 | 0 | 0.99 | 0.90 |
| 2 | 1 | 0.85 | 0.68 |

Reading the table: two "Yes" votes with no "No" already give 0.97 confidence for "Cat" but only 0.83 for "Burmese cat". More votes are needed for "Burmese cat" to reach the same confidence. The figure's left panel shows six randomly sampled users giving different answers to "is there a Burmese cat in the images?" for three images (e.g. User 1: Y, Y, Y; User 2: N, Y, Y; User 3: N, Y, Y; User 4: Y, N, Y; User 5: Y, Y, Y; User 6: N, N, Y), illustrating disagreement.

> [!theorem] Interpretation: the table measures semantic difficulty
> The confidence table is a natural measure of the "semantic difficulty" of a synset: if users fail to reach a majority on *any* image of a synset, the synset cannot be easily illustrated by images (e.g. "two-year-old horse"). The paper notes the alternative explanation (insufficient candidates) is rare given the crawl's extensiveness. ^thm-difficulty-measure

**Result of the quality control** (Fig. 4): 80 synsets sampled at every depth of the mammal and vehicle subtrees were re-verified by an *independent* group of subjects, yielding 99.7% average precision, with precision slightly lower deeper in the tree where categories (Siamese vs Burmese cat) are harder to discriminate.

## Examples

> [!example] A Beta-binomial reading of the confidence table
> A natural model (not in the paper; offered here as an interpretation) treats each worker as an independent noisy judge with sensitivity $p_1$ (says Yes when image is good) and false-positive rate $p_0$ (says Yes when image is bad), with prior probability $\pi$ that a random candidate is good. Then for $a$ Yes and $b$ No votes
> $$\Pr(\text{good}\mid a,b)=\frac{\pi\,p_1^{a}(1-p_1)^{b}}{\pi\,p_1^{a}(1-p_1)^{b}+(1-\pi)\,p_0^{a}(1-p_0)^{b}}.$$
> Harder synsets correspond to $p_1$ closer to $p_0$, so more votes are needed to reach any fixed confidence. With $\pi=0.1$ (search-engine precision), $p_1=0.9$, $p_0=0.2$: one Yes gives $0.09/(0.09+0.18)=0.33$; two Yes give $0.081/(0.081+0.036)=0.69$; three Yes give $0.0729/(0.0729+0.0072)=0.91$ (numbers illustrative, not from the paper). For a hard synset with $p_1=0.6,\ p_0=0.4$ three Yes votes reach only about 0.27, which is why harder synsets need many more votes. ^ex-vote-posterior

```python
import numpy as np

def post_good(a, b, pi=0.1, p1=0.9, p0=0.2):
    """Posterior P(good | a Yes, b No) under a conditionally-independent worker model."""
    num = pi * p1**a * (1 - p1)**b
    den = num + (1 - pi) * p0**a * (1 - p0)**b
    return num / den

for a, b in [(1,0),(2,0),(3,0),(2,1),(0,2)]:
    print(a, b, round(post_good(a, b), 3))

# harder synset: workers barely better than chance
print(round(post_good(3, 0, p1=0.6, p0=0.4), 3))
```

## Connections

- The adaptive stopping rule is a sequential-testing idea: gather evidence per item until posterior confidence crosses a threshold. Compare sequential and adaptive designs in [[Sequential and Adaptive BED]].
- Quality control by *independent re-verification of a random sample* (80 synsets, Fig. 4) is the benchmark analogue of a holdout audit.
- Dataset label noise is the label-side counterpart of the measurement error discussed in [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]: once models are optimized against the labels, residual label errors become the target.

**Relevance to marketing measurement.** Any benchmark of causal estimators needs trusted ground truth. Randomized experiments play the role of the verified labels, and the cost of each "label" (a lift test) is high, so adaptive allocation of verification effort to hard cases mirrors the confidence-table logic (see [[Experimental Benchmarks for Observational Ad Measurement]]).

## See Also

- [[Deng 2009 - ImageNet - Overview]]
- [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]]
- [[Wang 2018 - Task Suite and Selection Criteria]]
