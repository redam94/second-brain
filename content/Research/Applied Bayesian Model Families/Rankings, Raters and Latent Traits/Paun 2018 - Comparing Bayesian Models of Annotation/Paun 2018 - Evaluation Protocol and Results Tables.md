---
title: "Paun 2018 - Evaluation Protocol and Results Tables"
tags:
  - source/ingested
  - topic/latent-traits
  - type/example
  - doc/paper
source: "[[raw/Paun et al 2018 - Comparing Bayesian Models of Annotation.pdf]]"
source_location: "Sec. 4-5, pp. 575-580 (Tables 1-9, Figs. 7-9)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Paun 2018 - Comparing Bayesian Models of Annotation"
doc_type: paper
depends_on:
  - "[[Paun 2018 - Pooled and Unpooled Models Multinomial Dawid-Skene MACE]]"
  - "[[Paun 2018 - Partially Pooled Models Hierarchical D&S ItemDiff LogRndEff]]"
used_by:
  - "[[Paun 2018 - Implementation Priors Label Switching and Guidelines]]"
aliases:
  - Phrase Detectives annotation results
  - annotation model evaluation lpd
---

# Paun 2018 - Evaluation Protocol and Results Tables

> [!summary]
> Four datasets (WSD, RTE, TEMP from Snow et al. 2008; Phrase Detectives PD), four evaluation tasks. Against gold labels the annotator-structure models win (RTE 0.89-0.93 vs majority vote 0.90; PD D&S 0.94 vs majority vote 0.88); in predictive density the partially pooled models win; a spammer is identified by D&S confusion matrices or MACE credibility 0.

## Overview

**Datasets (Table 1).** WSD: 177 items, 1,770 annotations, 34 annotators, 3 classes. RTE: 800 items, 8,000 annotations, 164 annotators, 2 classes. TEMP: 462 items, 4,620, 76 annotators, 2 classes. PD: 5,892 items, 43,161 annotations, 294 annotators, 4 classes (DN/DO discourse new/old, PR property, NR non-referring), one annotation per coder per item, collected in a game-with-a-purpose with confessed spammers. Items-per-annotator in PD ranges from 1 to 3,395; WSD, RTE, TEMP are dense (10 annotators per item).

## Main Content

### Metrics

1. **Gold standard:** accuracy/precision/recall/F, bootstrap shift test, 0.05 threshold with Bonferroni.
2. **Predictive accuracy:** Bayesian $K$-fold ($K=5$) cross-validated log predictive density, with folds formed by splitting each annotator's annotations so even unpooled models are scored:
$$
\text{lpd}=\sum_{k=1}^K\log p(\tilde y_k\mid y^{(-k)})\approx\sum_k\log\frac1M\sum_{m}p(\tilde y_k\mid\theta^{(k,m)}).
$$
3. **Annotator characterization:** annotator accuracy = share of an annotator's labels matching the inferred classes; correlation with gold accuracy.
4. **Item difficulty:** posterior entropy of the true-class distribution; accuracy as lowest-confidence items are filtered.

### Results against gold (Tables 2-4)

> [!example] Table 2 - RTE (micro = macro accuracy)
> | Model | Accuracy |
> |---|---|
> | MULTINOM | 0.89 |
> | D&S | 0.92 |
> | HIERD&S | 0.93 |
> | ITEMDIFF | 0.89 |
> | LOGRNDEFF | 0.93 |
> | MACE | 0.93 |
> | MAJVOTE | 0.90 |
> Significant differences (Bonferroni) include annotator-structure models above MULTINOM/ITEMDIFF/MAJVOTE.

> [!example] Table 3 - PD
> | Model | Acc. (micro) | F (macro) | Precision | Recall |
> |---|---|---|---|---|
> | MULTINOM | 0.87 | 0.79 | 0.73 | 0.85 |
> | D&S | 0.94 | 0.87 | 0.88 | 0.87 |
> | HIERD&S | 0.89 | 0.82 | 0.76 | 0.89 |
> | MACE | 0.93 | 0.83 | 0.83 | 0.84 |
> | MAJVOTE | 0.88 | 0.73 | 0.87 | 0.63 |
> ITEMDIFF and LOGRNDEFF omitted: PD is too sparse to fit item difficulties.

> [!example] Table 4 - WSD and TEMP
> WSD: ITEMDIFF and LOGRNDEFF Acc 0.99/F 0.91 (macro P 0.83, R 0.99), others 0.99/0.94 (P 0.89, R 1.00). TEMP: all models have micro accuracy 0.94; MAJVOTE has macro precision 0.93 and the others 0.94. Small, high-quality datasets show no gain from model complexity.

### Predictive density (Table 5; lpd per item, larger is better)

> [!example] Table 5
> | Model | WSD | RTE | TEMP | PD* |
> |---|---|---|---|---|
> | MULTINOM | -0.75 | -5.93 | -5.84 | -4.67 |
> | D&S | -1.19 | -4.98 | -2.61 | -2.99 |
> | HIERD&S | -0.63 | -4.71 | -2.62 | -3.02 |
> | ITEMDIFF | -0.75 | -5.97 | -5.84 | - |
> | LOGRNDEFF | -0.59 | -4.79 | -2.63 | - |
> | MACE | -0.70 | -4.86 | -2.65 | -3.52 |
> PD* is the subset where each annotator has at least 5 annotations. On WSD, D&S (-1.19) is worse than pooled MULTINOM (-0.75): the unpooled model overfits small data. Partially pooled LOGRNDEFF/HIERD&S are best on WSD, RTE, TEMP.

### Annotators (Tables 6-9)

> [!example] Table 6 - correlation of estimated and gold annotator accuracy
> | Model | WSD | RTE | TEMP | PD | PD spammers (S) | PD non-spammers (NS) |
> |---|---|---|---|---|---|---|
> | MAJVOTE | 0.90 | 0.78 | 0.91 | 0.77 | 0.98 | 0.65 |
> | MULTINOM | 0.90 | 0.84 | 0.93 | 0.75 | 0.97 | 0.84 |
> | D&S | 0.90 | 0.89 | 0.92 | 0.88 | 1.00 | 0.99 |
> | HIERD&S | 0.90 | 0.90 | 0.92 | 0.76 | 1.00 | 0.91 |
> | ITEMDIFF | 0.80 | 0.84 | 0.93 | - | - | - |
> | LOGRNDEFF | 0.80 | 0.89 | 0.92 | - | - | - |
> | MACE | 0.90 | 0.90 | 0.92 | 0.86 | 1.00 | 0.98 |

Table 7: PD has 7 known spammers (gold-accuracy quantiles 2.5/50/97.5% = 0.42/0.55/0.74) and 19 non-spammers (0.59/0.89/0.94). Poor accuracy alone is not a spam indicator: a spammer who always says the prevalent class DN (over 60% of mentions) achieves decent accuracy.

> [!example] Tables 8-9 - spammer vs non-spammer diagnostics (PD)
> Spammer: D&S rows are NR (0.03,0.92,0.03,0.03), DN (0,1,0,0), PR (0.01,0.98,0.01,0.01), DO (0,1,0,0) over columns (NR, DN, PR, DO), i.e. DN regardless of truth; MACE credibility $\theta_j\approx0$ and spamming preference (0,0.99,0,0) on DN.
> Non-spammer: D&S diagonal NR 0.79, DN 0.96, PR 0.72 (0.21 mislabelled DN), DO 0.94; MACE credibility 0.92, spamming preference (0.09,0.52,0.17,0.22).
> A D&S spammer is harmless: identical rows mean the label cancels in $P(c_i\mid y)$.

### Entropy filtering (Figs. 7-9)

On RTE, TEMP and PD, accuracy rises for every model as the highest-entropy (least confident) items are removed; WSD omitted (99% accuracy already).

## Examples

> [!example] Choosing a model from Table 5 vs Table 2
> **Setup.** Small, dense, high-quality data (WSD): choose by predictive density.
> **Solution.** LOGRNDEFF (-0.59) or HIERD&S (-0.63) beat D&S (-1.19) even though accuracy against gold is identical (0.99).
> **Interpretation.** Gold-label accuracy hides overfitting; use cross-validated lpd.

## Connections

[[Posterior Predictive Checking]] · [[Paun 2018 - Implementation Priors Label Switching and Guidelines]]

## See Also

[[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]]
