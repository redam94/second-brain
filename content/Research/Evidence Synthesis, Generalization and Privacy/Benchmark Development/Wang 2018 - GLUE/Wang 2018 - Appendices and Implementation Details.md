---
title: "Wang 2018 - Appendices and Implementation Details"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Appendices A-E, Table 6, Table 7, Fig. 1, pp. 13-20"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - Baselines and Benchmark Results]]"
  - "[[Wang 2018 - Evaluation Protocol and Scoring]]"
used_by:
  - "[[Wang 2018 - GLUE - Overview]]"
aliases:
  - GLUE appendix
  - GLUE Table 6 development results
  - GLUE reproducibility details
---

# Wang 2018 - Appendices and Implementation Details

> [!summary]
> The appendices give QNLI's construction, the exact attention and training procedures, the five sentence-representation models, development-set results for all baselines (Table 6), the website's architecture, and the full definitions of the diagnostic phenomena. Table 6 shows a different picture from the test set: on dev, the best average is 67.9 (single-task +Attn,ELMo) and multi-task training is *not* uniformly better, and WNLI dev scores are very low for multi-task models because of the adversarial dev set.

## Overview

This note collects reproducibility details not covered elsewhere. Appendix A (QNLI) is summarized in [[Wang 2018 - Task Suite and Selection Criteria]], Appendix B in [[Wang 2018 - Baselines and Benchmark Results]], and the diagnostic definitions (Appendix E) in [[Wang 2018 - Diagnostic Dataset]].

## Main Content

### Appendix B: training details (reconciled with Sec. 5)

| Item | Main text (Sec. 5) | Appendix B.2 |
|---|---|---|
| Task sampling | probability proportional to number of training examples | same |
| Loss scaling | not mentioned | each task's loss scaled inversely proportional to its number of examples ("improves overall performance") |
| Optimizer | Adam | Adam, gradient clipping |
| Initial learning rate | $10^{-4}$ | $10^{-3}$ |
| Batch size | 128 | 128 |
| Validation | macro-average, stop when LR $<10^{-5}$ or no improvement after 5 checks | macro-average, check every 10k updates, divide LR by 5 when validation does not improve, stop at LR $<10^{-5}$ or no improvement after 5 checks |

The main text and Appendix B disagree on the initial learning rate ($10^{-4}$ vs $10^{-3}$); the paper does not reconcile them (the appendix gives the more detailed schedule).

### Appendix C: development-set results (Table 6, x100)

The site allows only two submissions per day to avoid overfitting to private test data, so dev results serve as the reference for future work. (For MNLI the dev number is accuracy averaged over matched and mismatched; the caption wording says "test sets" but means dev.)

| Model | Avg | CoLA | SST-2 | MRPC | QQP | STS-B | MNLI | QNLI | RTE | WNLI |
|---|---|---|---|---|---|---|---|---|---|---|
| *Single-task training* | | | | | | | | | | |
| BiLSTM | 66.7 | 17.6 | 87.5 | 77.9/85.1 | 85.3/82.0 | 71.6/72.0 | 66.7 | 77.0 | 58.5 | 56.3 |
| +ELMo | 68.7 | 44.1 | 91.5 | 70.8/82.3 | 88.0/84.3 | 70.3/70.5 | 68.6 | 71.2 | 53.4 | 56.3 |
| +CoVe | 66.8 | 25.1 | 89.2 | 76.5/83.4 | 86.2/81.8 | 70.7/70.8 | 62.4 | 74.4 | 59.6 | 54.9 |
| +Attn | 66.9 | 17.6 | 87.5 | 72.8/82.9 | 87.7/83.9 | 66.6/66.7 | 70.0 | 77.2 | 58.5 | 60.6 |
| +Attn, ELMo | 67.9 | 44.1 | 91.5 | 71.1/82.1 | 87.8/83.6 | 57.9/56.1 | 72.4 | 75.2 | 52.7 | 56.3 |
| +Attn, CoVe | 65.6 | 25.1 | 89.2 | 72.8/82.4 | 86.1/81.3 | 59.4/58.0 | 67.9 | 72.5 | 58.1 | 57.7 |
| *Multi-task training* | | | | | | | | | | |
| BiLSTM | 60.0 | 18.6 | 82.3 | 75.0/82.7 | 84.4/79.3 | 69.0/66.9 | 65.6 | 74.9 | 59.9 | 9.9 |
| +ELMo | 63.1 | 26.4 | 90.9 | 80.2/86.7 | 84.2/79.7 | 72.9/71.5 | 67.4 | 76.0 | 55.6 | 14.1 |
| +CoVe | 59.3 | 9.8 | 82.0 | 73.8/81.0 | 83.4/76.6 | 64.5/61.9 | 65.5 | 70.4 | 52.7 | 32.4 |
| +Attn | 60.5 | 15.2 | 83.1 | 77.5/85.1 | 82.6/77.2 | 72.4/70.5 | 68.0 | 73.7 | 61.7 | 9.9 |
| +Attn, ELMo | 67.3 | 36.7 | 91.1 | 80.6/86.6 | 84.6/79.6 | 74.4/72.9 | 74.6 | 80.4 | 61.4 | 22.5 |
| +Attn, CoVe | 61.4 | 17.4 | 82.1 | 71.3/80.1 | 83.4/77.7 | 68.6/66.7 | 68.2 | 73.2 | 58.5 | 29.6 |
| *Pre-trained sentence representation models* | | | | | | | | | | |
| CBoW | 61.4 | 4.6 | 79.5 | 75.0/83.7 | 75.0/65.5 | 70.6/71.1 | 57.1 | 62.5 | 71.9 | 56.3 |
| Skip-Thought | 61.8 | 0.0 | 82.0 | 76.2/84.3 | 78.9/70.7 | 74.8/74.8 | 63.4 | 58.5 | 73.4 | 49.3 |
| InferSent | 65.7 | 8.6 | 83.9 | 76.5/84.1 | 81.7/75.9 | 80.2/80.4 | 67.8 | 63.5 | 71.5 | 56.3 |
| DisSent | 63.8 | 11.7 | 82.5 | 77.0/84.4 | 81.8/75.6 | 68.9/69.0 | 61.2 | 59.9 | 73.9 | 56.3 |
| GenSen | 67.8 | 10.3 | 87.2 | 80.4/86.2 | 82.6/76.6 | 81.3/81.8 | 71.4 | 62.5 | 78.4 | 56.3 |

**Observations from comparing Tables 4 and 6.**
- On dev, multi-task training is *worse* than single-task for the BiLSTM-only baselines (60.0 vs 66.7), whereas on test it was slightly better (64.2 vs 63.9). The multi-task dev averages are dragged down by WNLI (9.9 to 32.4) because the WNLI dev set is adversarial against models that memorize training pairs. The test WNLI scores are set to the majority baseline (65.1), which hides this.
- The best dev average is 67.9 (single-task +Attn,ELMo) with GenSen (67.8) and multi-task +Attn,ELMo (67.3) close behind; on test the multi-task +Attn,ELMo wins at 70.0. Rankings differ between dev and test, evidence for why a private test set is useful.
- RTE dev scores for pre-trained encoders (71.5 to 78.4) greatly exceed their test scores (53.1 to 59.2): a large dev-test gap on a very small dataset.

### Appendix D: benchmark website

React, Redux and TypeScript front end; Google Firebase for storage; Google Cloud Functions to host and run the grading script at submission. Figure 1 shows the leaderboard with an expandable view per submission giving a brief prose description and parameter count.

### Appendix E: diagnostic details

Four broad categories subdivided into fine-grained phenomena; definitions and examples are transcribed in [[Wang 2018 - Diagnostic Dataset]], including Table 7 (counts and label proportions by coarse category).

## Examples

> [!example] Quantifying the dev-test gap
> For GenSen, RTE dev $=78.4$ vs RTE test $=59.2$ (gap $19.2$ points). For InferSent: $71.5$ vs $58.0$ ($13.5$). The RTE test set has 3k examples vs a dev set of 277 (not stated in this paper), so the dev estimate is much noisier. A gap of this size is far beyond what sampling noise at $n\approx3000$ would produce (standard error about $0.9$ points), pointing to a distribution shift between RTE dev and test. ^ex-dev-test-gap

```python
import numpy as np
dev  = {"CBoW":71.9,"Skip-Thought":73.4,"InferSent":71.5,"DisSent":73.9,"GenSen":78.4}
test = {"CBoW":54.1,"Skip-Thought":53.1,"InferSent":58.0,"DisSent":56.4,"GenSen":59.2}
gaps = {k: round(dev[k]-test[k],1) for k in dev}
print(gaps, np.mean(list(gaps.values())))
n=3000; p=0.58
print("SE of accuracy at n=3000:", round(100*np.sqrt(p*(1-p)/n),2))
```

## Connections

- The dev/test discrepancy is a concrete instance of why [[Wang 2018 - Evaluation Protocol and Scoring]] withholds test labels.
- See [[Researcher Degrees of Freedom]] for how repeated looks at a dev set inflate performance.

**Relevance to marketing measurement.** Keep a never-touched holdout set of experiments for final method comparison and treat dev-set winners cautiously; in-sample or tuned-holdout comparisons of MMM variants show the same optimism.

## See Also

- [[Wang 2018 - GLUE - Overview]]
- [[Wang 2018 - Baselines and Benchmark Results]]
