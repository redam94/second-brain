---
title: "IntHout 2014 - Cochrane Empirical Comparison"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Methods: empirical data (p. 3), Results: empirical results CDSR 2012 (pp. 5-6), Table 2 (p. 6)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[IntHout 2014 - Simulation Results and Error Rates]]"
used_by:
  - "[[IntHout 2014 - Discussion, Limitations and Recommendations]]"
aliases:
  - Cochrane Database 2012 DL vs HKSJ
  - 689 meta-analyses
---

# IntHout 2014 - Cochrane Empirical Comparison

> [!summary]
> Applied to the first qualifying meta-analysis of each 2012 Cochrane review (689 analyses, $\ge3$ studies each), switching from DL to HKSJ turns 25.1% of the "positive" DL findings (79 of 315) into non-significant ones, while only 13 to 14 go the other way (text says 14, Table 2 sums to 13). For small meta-analyses ($\le5$ studies) with a size ratio above 5 about half or more of the DL-significant results are lost (59.1% continuous, 50.0% dichotomous).

## Overview

True effects are unknowable in real reviews, so false positive rates cannot be measured. The authors therefore count nominally significant results under each method as an indication of the practical impact of a switch. Data: statistical data added to the Cochrane Database of Systematic Reviews (CDSR) in 2012, supplied by the UK Cochrane Editorial Unit.

## Main Content

### Selection rules

- First meta-analysis in each review with at least three studies (usually the primary analysis); both the first continuous and first binary outcome meta-analysis when available (some reviews contribute none, one or two).
- A random-effects analysis was always performed, even when the review authors used fixed effects. Binary outcomes analysed on the log scale.
- Result: 689 meta-analyses, 255 continuous and 434 dichotomous.
- Continuous: median 5 trials (Q1-Q3: 3-9), median ratio of largest to smallest trial 5 (3-10). Dichotomous: median 6 trials (4-10), median ratio 6 (3-16).

> [!definition] Table 2: number (%) statistically significant ($p<0.05$)
> | Outcome | Selection | $N$ | DL significant | HKSJ significant | DL-positive but HKSJ not significant |
> |---|---|---|---|---|---|
> | Continuous | all | 255 | 130 (51.0) | 102 (40.0) | 31/130 (23.8) |
> | Continuous | ratio $>5$, $\le5$ studies | 46 | 22 (47.8) | 13 (28.3) | 13/22 (59.1) |
> | Dichotomous | all | 434 | 185 (42.6) | 147 (33.9) | 48/185 (25.9) |
> | Dichotomous | ratio $>5$, $\le5$ studies | 76 | 28 (36.8) | 15 (19.7) | 14/28 (50.0) |
>
> Text counts: 3 continuous and 10 dichotomous analyses were significant under HKSJ but not DL. Totals: DL significant 315/689 (45.7%); of these 79 (25.1%) not significant under HKSJ; the paper states the reverse happened in 14 analyses.
^def-table2-cochrane

Implied relation: continuous all: $130-31+3=102$ ✓; dichotomous all: $185-48+10=147$ ✓. Overall from Table 2: HKSJ significant $102+147=249$ (36.1%) versus DL 315 (45.7%). Note a small internal inconsistency in the paper: $315-79+13=249$ matches Table 2 (3 + 10 = 13 reversed cases), whereas the text says 14.

### Corroboration

Thorlund et al. (2011), 920 Cochrane primary-outcome meta-analyses with $\ge3$ studies: 326 (35.4%) significant using a $t$ distribution (as HKSJ) versus 414 (45%) using the normal (as DL), consistent with this paper.

## Examples

> [!example] What the numbers say about published "positive" results
> If DL-significance were reported for 100 small, unequal-sized comparisons, about 50 to 60 of the significant ones would not survive HKSJ. Since HKSJ error rates are near nominal, a large share of those lost findings were probably nominal false positives, though the paper stresses this cannot be proven for real data ("it is unknown which of the statistically significant results were in fact false positive findings").
^ex-lost-positives

```python
import numpy as np
n_dl, n_hk, lost = 315, 102 + 147, 79
print(n_dl - lost + 13 == n_hk, round(lost/n_dl, 4))     # True 0.2508 -> 25.1% of DL positives lost (13 reversed, not the text's 14)
```

## Connections

- Marketing: a review of a company's historical experiment library using DL-style pooling would exhibit the same optimistic bias; recompute with HKSJ before concluding "most tests show lift". Relates to the base-rate argument in [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- The lost-positive fraction depends on small $k$ and unequal sizes, the regime the authors flag; for $k\ge20$ equal-size trials the two methods agree more closely ([[IntHout 2014 - Simulation Results and Error Rates]]).

## See Also

- [[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
