---
title: "Deng 2009 - Applications and Future Work"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Deng 2009 - ImageNet.pdf]]"
source_location: "Sec. 4 (4.1-4.3), Figs. 8-12, and Sec. 5 (5.1-5.2), pp. 5-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Deng 2009 - ImageNet"
doc_type: paper
depends_on:
  - "[[Deng 2009 - ImageNet - Overview]]"
  - "[[Deng 2009 - Dataset Properties and Comparison with Other Datasets]]"
used_by:
  - "[[Wang 2018 - GLUE - Overview]]"
aliases:
  - ImageNet applications
  - tree-max classifier
  - ImageNet future work
---

# Deng 2009 - Applications and Future Work

> [!summary]
> Three small demonstrations show what clean, full-resolution, hierarchical data buys: (1) non-parametric recognition, where clean ImageNet beats a noisy TinyImage-like pool and full-resolution NBNN beats downsampled NN-voting; (2) a "tree-max" classifier that takes the max of classifier scores over a synset's subtree and beats independent classifiers at nearly every tree height without extra training; (3) automatic bounding-box localization and clustering that reveals viewpoint diversity. Section 5 sets out the plan: complete the ontology (about 50M images, about 50K synsets), add localization and segmentation, and foster a community platform.

## Overview

The applications are *demonstrations of the resource*, not state-of-the-art claims. Each isolates one property of the dataset from [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]].

## Main Content

### 4.1 Non-parametric object recognition

**Setup.** Query images come from the **16 categories common to Caltech256 and the mammal subtree** (bat, bear, camel, chimp, dog, elk, giraffe, goat, gorilla, greyhound, horse, killer-whale, porcupine, raccoon, skunk, zebra); about 20 duplicates per category with ImageNet were removed from the test set. Performance per category is an ROC curve with the negative set being the other 15 categories.

Four experiments:

| # | Name | Data | Method | Lesson |
|---|---|---|---|---|
| 1 | NN-voting + noisy ImageNet | original (uncleaned) candidates, downsampled to $32\times32$ (imitates TinyImage) | retrieve 100 nearest neighbours by SSD pixel distance; vote within the target category's subtree | baseline replicating Torralba et al. |
| 2 | NN-voting + clean ImageNet | clean ImageNet, $32\times32$ | same | accurate labels improve classification |
| 3 | NBNN | clean, full-resolution | Naive Bayes Nearest Neighbour (Boiman et al.) with SIFT descriptors | full-resolution/feature-level information helps substantially |
| 4 | NBNN-100 | at most 100 images per category | same as 3 | more data helps; yet NBNN-100 still beats NN-voting using the whole dataset |

> [!definition] NBNN query-class distance
> For a query $Q$ with descriptors $\{d_i\}_{i=1}^M$ and a class $C$, the query-to-class distance is
> $$
> D_C=\sum_{i=1}^{M}\lVert d_i-d_i^{C}\rVert^2,
> $$
> where $d_i^{C}$ is the nearest neighbour of $d_i$ among all descriptors of images in class $C$. Classes are ordered by $D_C$, and the classification score of a category is the minimum rank of the target class and its subclasses (so hierarchical labels are handled). ^def-nbnn

Figure 8 plots the average ROC over the 16 categories (and "elk", "killer-whale" panels): the ordering in AUC is NBNN $>$ NBNN-100 $>$ NN-voting + clean $>$ NN-voting + noisy (stated qualitatively: clean beats noisy; NBNN substantially better; NBNN-100 beats NN-voting with all data).

### 4.2 Tree-based image classification: the tree-max classifier

> [!definition] Tree-max classifier
> Let a classifier $f_s(x)$ be trained for each synset $s$ in the tree $T$. The independent classifier scores an image by $f_s(x)$ only. The **tree-max classifier** scores synset $s$ by
> $$
> g_s(x)=\max_{s'\in \operatorname{subtree}(s)} f_{s'}(x),
> $$
> the maximum response over $s$ and all its descendants (child synsets such as "German shepherd", "English terrier" for "dog"). No extra training is needed; the method is agnostic to how the node classifiers are learned. ^def-tree-max

**Protocol.** Mammal subtree; AdaBoost-based classifier (Collins et al.). For each synset, 90% of images are positives for training and 10% are held out for testing. A **common negative set** is formed by sampling 10 images from each synset; when training a synset's classifier, negatives from the same synset and its parent and child synsets are excluded. Evaluation by AUC at each **tree height** (the length of the longest path to a leaf; leaves have height 1) in Fig. 9.

**Results.** (i) Images are easier to classify near the leaves (star-nosed mole, minivan, polar bear) than near the root (vehicle, mammal, artifact), probably because visual coherence is stronger at leaves. (ii) At nearly all levels the tree-max classifier's AUC is consistently higher than the independent classifier, showing "a simple way of exploiting the ImageNet hierarchy can already provide substantial improvement for the image classification task without additional training or model learning."

### 4.3 Automatic object localization and diversity

Using the non-parametric graphical model of Li, Wang and Fei-Fei (OPTIMOL), images are bags of words; the output is the probability of each patch belonging to the topics $z_i$ of a category. The likelihood of a patch $x$ given category $c$ is
$$
p(x\mid c)=\sum_i p(x\mid z_i,c)\,p(z_i\mid c),
$$
and one bounding box is placed around the region accumulating the highest likelihood.

100 images in each of **22 categories** from the mammal and vehicle subtrees were hand-annotated with bounding boxes; Fig. 10 gives per-category precision and recall (pixel-area based: precision is the area of correctly segmented pixels over the area of detected pixels, recall the fraction of relevant pixel area detected). Precision is low because of extreme object variability and small objects with hardly any salient regions (the paper states this). k-means on grayscale $32\times32$ rescaled detected boxes (Fig. 12, "tusker" and "stealth aircraft") finds clusters that correspond to viewpoints and poses (side, front, profile; planes on the ground); average images use about 40 images. The average of all boxes is unrecognizable, demonstrating diversity.

### 5 Discussion and future work

**5.1 Completing ImageNet.** The current build is about 10% of WordNet. Plans: more efficient AMT evaluation and fewer repetitions per image; reach about 50 million clean, diverse, full-resolution images over about 50K synsets; distribute via cloud storage and public download; add localization, segmentation, cross-synset references and expert annotation for difficult synsets; build an ImageNet community and an online contribution platform.

**5.2 Exploiting ImageNet.** Four envisioned uses:
1. *A training resource*, notably for rare classes (transfer knowledge from common to rare objects).
2. *A benchmark dataset*: "We believe that the high quality, diversity and large scale of ImageNet will enable it to become a new and challenging benchmark dataset for future research" (following Caltech101/256 and PASCAL).
3. *New semantic relations for visual modeling* (part models, scene understanding across hierarchy depths).
4. *Human vision research* (whether a concept can be illustrated by images; aligning the cognitive with the visual hierarchy).

## Examples

> [!example] Tree-max on a toy hierarchy
> Suppose "dog" has children "husky" and "terrier". For an image of a husky, the "dog" classifier gives $0.55$, "husky" $0.92$, "terrier" $0.10$. The independent classifier scores "dog" at $0.55$; the tree-max classifier scores it at $\max(0.55,0.92,0.10)=0.92$. This is why tree-max helps near the root: broad categories are visually incoherent but their leaf descendants are not. The max operator also increases false-positive risk for the root score, which the paper's AUC comparison absorbs. ^ex-tree-max

```python
import numpy as np

tree = {"dog": ["husky", "terrier"], "husky": [], "terrier": []}
scores = {"dog": 0.55, "husky": 0.92, "terrier": 0.10}

def tree_max(node):
    return max([scores[node]] + [tree_max(c) for c in tree[node]])

print({n: round(tree_max(n), 2) for n in tree})
```

## Connections

- The recognition experiments are the first use of ImageNet as a benchmark; later single-score challenges are what [[Liang 2022 - HELM - Overview]] calls "traditional benchmarks like ImageNet that assign a single score".
- The idea that a dataset is both a *training resource* and a *benchmark* recurs in [[Wang 2018 - GLUE - Overview]], which releases training sets plus private test sets.
- Using subtree structure to improve a score parallels the borrowing of strength in [[Hierarchical Models]] and [[Partial Pooling as Multiple Comparisons Correction]].

**Relevance to marketing measurement.** The tree-max trick (borrow evidence from descendants) is a hierarchical-aggregation idea: campaign-level evidence informs brand-level estimates. In MMM benchmarks the analogue is evaluating a model at multiple levels of a channel hierarchy rather than one flat score.

## See Also

- [[Deng 2009 - ImageNet - Overview]]
- [[Deng 2009 - Construction Pipeline and AMT Quality Control]]
- [[Wang 2018 - GLUE - Overview]]
