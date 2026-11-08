---
title: "Deng 2009 - Dataset Properties and Comparison with Other Datasets"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Deng 2009 - ImageNet.pdf]]"
source_location: "Sec. 1-2 and 2.1, Figs. 1-6, Table 1, pp. 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Deng 2009 - ImageNet"
doc_type: paper
depends_on:
  - "[[Deng 2009 - ImageNet - Overview]]"
  - "[[Deng 2009 - Construction Pipeline and AMT Quality Control]]"
used_by:
  - "[[Deng 2009 - Applications and Future Work]]"
aliases:
  - ImageNet properties scale hierarchy accuracy diversity
  - ImageNet vs TinyImage ESP LabelMe Lotus Hill
---

# Deng 2009 - Dataset Properties and Comparison with Other Datasets

> [!summary]
> The paper argues ImageNet is distinguished by four properties: scale (3.2M images, 5,247 synsets, over 600 images per synset), hierarchy (a dense WordNet IS-A tree), accuracy (99.7% precision on 80 sampled synsets) and diversity (measured via the lossless-JPEG file size of the per-synset average image). A property matrix (Table 1) compares it with TinyImage, LabelMe, ESP and Lotus Hill; ImageNet alone combines disambiguated labels, clean annotations, dense hierarchy, full resolution and public availability, while lacking segmentation.

## Overview

Section 2 treats ImageNet's design goals as measurable properties and compares them with existing datasets. Because each property is operationalized with a concrete statistic, the section is also a small primer on *how to audit a dataset*.

## Main Content

### Scale

At the time of writing: **12 subtrees** (mammal, bird, fish, reptile, amphibian, vehicle, furniture, musical instrument, geological formation, tool, flower, fruit), **5,247 synsets**, **3.2 million** cleanly annotated images, an average of over 600 images per synset. The histogram in Fig. 2 shows about 20% of synsets have very few images (either few web images exist, such as "vespertilian bat", or the synset is hard to illustrate, such as "two-year-old horse") while over 50% of synsets have more than 500 images.

Selected subtree statistics (Fig. 2 table):

| Subtree | # synsets | Avg. synset size | Total # images |
|---|---|---|---|
| Mammal | 1170 | 737 | 862K |
| Vehicle | 520 | 610 | 317K |
| GeoForm | 176 | 436 | 77K |
| Furniture | 197 | 797 | 157K |
| Bird | 872 | 809 | 705K |
| MusicInstr | 164 | 672 | 110K |

(Check: Mammal $1170\times737\approx862$K, Bird $872\times 809\approx705$K.) To the authors' knowledge it was already the largest clean image dataset in total images, images per category and number of categories. Relative to small datasets, "the current ImageNet offers 20x the number of categories, and 100x the number of total images". The ESP game labeled many images but only a 60K subset was public.

### Hierarchy

> [!definition] ImageNet hierarchy
> Synsets of images are interlinked by the WordNet relations, the IS-A relation being the most comprehensive and useful. A *branch* such as mammal $\to$ placental $\to$ carnivore $\to$ canine $\to$ dog $\to$ working dog $\to$ husky, or vehicle $\to$ craft $\to$ watercraft $\to$ sailing vessel $\to$ sailboat $\to$ trimaran, is a root-to-leaf path; each node has 500-1000 images in the target. ^def-imagenet-hierarchy

Any dataset with category labels can be mapped into WordNet, but the *density* is unmatched: no existing vision dataset offers images of the 147 dog categories. Fig. 3 compares the "cat" and "cattle" subtrees between ESP and ImageNet (node size proportional to the number of images): ImageNet's trees are much denser and larger (the figure prints the image count of the largest node in each tree).

### Accuracy

Labeling precision was measured on 80 synsets sampled at every depth of the mammal and vehicle subtrees, verified by an independent subject group: 99.7% average. Precision is harder to achieve deeper in the tree (Siamese vs Burmese cat). See [[Deng 2009 - Construction Pipeline and AMT Quality Control]] for how.

### Diversity

> [!definition] Average-image diversity measure
> Quantifying diversity (appearance, position, viewpoint, pose, clutter, occlusion) is hard. The paper computes, for a synset, the **average image** (pixel-wise mean, downsampled to $32\times32$) and measures the **lossless JPEG file size** of that average. A diverse synset averages to a blurry, nearly grey image, which compresses to a *smaller* file; a low-diversity synset averages to a sharper, structured image and a *larger* file. So smaller average-image JPEG size means more diversity. ^def-diversity-measure

Fig. 5 compares four randomly sampled synsets of Caltech101 and the mammal subtree (platypus, panda, okapi, elephant); for each category the average is computed from all Caltech101 images and an equal number of randomly sampled ImageNet images. File sizes (in bytes, axis range roughly 900-1100) are smaller for ImageNet, i.e. ImageNet is more diverse. A footnote reports that against Caltech256 the diversity is comparable, "reassuring since Caltech256 was specifically designed to be more diverse".

### Comparison with related datasets (Section 2.1, Table 1)

| Property | ImageNet | TinyImage | LabelMe | ESP | Lotus Hill |
|---|---|---|---|---|---|
| Label disambiguation (LabelDisam) | Y | Y | N | N | Y |
| Clean annotations (Clean) | Y | N | Y | Y | Y |
| Dense hierarchy (DenseHie) | Y | Y | N | N | N |
| Full resolution (FullRes) | Y | N | Y | Y | Y |
| Publicly available (PublicAvail) | Y | Y | Y | N | N |
| Segmentation (Segmented) | N | N | Y | N | Y |

Dataset-specific points made in the text:

- **Small datasets** (Caltech101/256, MSRC, PASCAL): well-labeled benchmarks that drove progress; larger datasets are needed for the next generation of algorithms.
- **TinyImage** (80 million $32\times32$ images collected by sending all WordNet words to search engines): average 1000 images per synset, of which only 10-25% are possibly clean. ImageNet synsets are about 99% precise with full-resolution images of average size around $400\times350$.
- **ESP game**: two players independently propose labels, scored by matching. Rosch and Lloyd's *basic level* effect (people label at "bird" rather than "sparrow" or "vertebrate") makes ESP labels cluster at the basic level (Fig. 6, mammal labels over tree depth), whereas ImageNet has a much more balanced depth distribution. ESP also lacks sense disambiguation (is "bank" a river bank or a financial institution?), whereas ImageNet disambiguates by construction via synsets. Most ESP data is not public (60K images only).
- **LabelMe and Lotus Hill**: 30K and 50K labeled, segmented images with only about 200 categories each (Lotus Hill also has 587K video frames). Complementary, since they give object outlines while ImageNet had none; but ImageNet's categories and per-category counts exceed them, and ImageNet images are crawled from the whole Internet rather than uploaded by researchers. Lotus Hill is available only through purchase.

## Examples

> [!example] Auditing a dataset with ImageNet's four properties
> To audit any proposed benchmark, ask the paper's four questions with a statistic for each. (1) Scale: number of classes, items per class, class-size histogram. (2) Hierarchy: is there a taxonomy, and how dense per level? (3) Accuracy: independent re-verification of a random sample stratified by depth. (4) Diversity: some proxy of within-class variation (here, the average-image compression size). Reporting each as a number, not an adjective, is the paper's method. ^ex-dataset-audit

```python
import numpy as np
from PIL import Image
import io

def avg_image_size(arrs):
    """arrs: list of 32x32x3 uint8 arrays. Returns the byte size of the losslessly
    compressed average image (PNG as a stand-in for the paper's lossless JPG)."""
    m = np.mean(np.stack(arrs), axis=0).astype(np.uint8)
    buf = io.BytesIO()
    Image.fromarray(m).save(buf, format="PNG")
    return buf.tell()

rng = np.random.default_rng(0)
yy, xx = np.mgrid[0:32, 0:32]
pattern = 128 + 100*np.sin(xx/3.0)*np.cos(yy/4.0)          # a structured "object"
def to_rgb(a): return np.repeat(np.clip(a, 0, 255)[..., None], 3, 2).astype(np.uint8)

# low diversity: same object in the same place; high diversity: object at random positions
low  = [to_rgb(pattern + rng.normal(0, 3, (32, 32))) for _ in range(200)]
high = [to_rgb(np.roll(pattern, (rng.integers(0, 32), rng.integers(0, 32)), (0, 1))
               + rng.normal(0, 3, (32, 32))) for _ in range(200)]
print(avg_image_size(low), avg_image_size(high))   # high diversity gives the smaller file
```

## Connections

- [[Deng 2009 - ImageNet - Overview]] lists the headline numbers; [[Deng 2009 - Applications and Future Work]] shows how the properties are used (hierarchy for tree-max classification, full resolution for NBNN).
- The ESP basic-level critique is an early example of a benchmark inheriting the *annotation protocol's bias* (compare construct-validity discussions in [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]).

**Relevance to marketing measurement.** The four-property audit transfers to a benchmark of marketing datasets (for example a collection of geo experiments): scale (number of experiments), hierarchy (channel, tactic, campaign), accuracy (confidence in the ground-truth lift), diversity (verticals, spend levels). See [[Experimental Benchmarks for Observational Ad Measurement]].

## See Also

- [[Deng 2009 - Construction Pipeline and AMT Quality Control]]
- [[Wang 2018 - Task Suite and Selection Criteria]]
