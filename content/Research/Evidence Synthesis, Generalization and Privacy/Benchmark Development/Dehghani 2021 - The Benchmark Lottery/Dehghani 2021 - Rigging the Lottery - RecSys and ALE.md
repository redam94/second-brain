---
title: "Dehghani 2021 - Rigging the Lottery - RecSys and ALE"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Sec. 6, 6.1, 6.2, pp. 13-14; Appendix F, Table 4, p. 33"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]]"
used_by:
  - "[[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]"
aliases:
  - Rigging the lottery
  - Recommender benchmark inconsistency
  - ALE evaluation inconsistency
---

# Dehghani 2021 - Rigging the Lottery - RecSys and ALE

> [!summary]
> Where no canonical benchmark or protocol exists, or many protocols coexist, researchers can unknowingly or knowingly "make their own luck" by choosing the setup that suits their model. Recommender systems lack canonical splits, metrics and datasets, so the same methods reverse rank across metrics. The Arcade Learning Environment is used by hundreds of papers under diverging protocols (episode termination, frame skip, evaluation interval, game count, stochasticity, summary statistics).

## Overview

Section 6 considers "the exact opposite" of canonical-benchmark bias: a lack of consensus. Causes: young problems, no unification effort, high compute cost of proper evaluation (reporting variance over seeds), and behaviour: researchers showcase what their methods shine at, and unsuccessful experiments "although performed, are simply not reported." The result "hinders progress in the field, while possibly creating an illusion of progress."

> [!definition] Rigging the lottery
> Fitting benchmarks and experimental setups to models, rather than models to benchmarks, enabled by inconsistent or missing community standards. It need not be intentional.
^def-rigging

## Main Content

### Recommender systems (Sec. 6.1)

- No well-established evaluation setups or canonical ranked lists. The Netflix Prize data is not widely used for benchmarking; MovieLens (Harper and Konstan, 2015) and Amazon Reviews (He and McAuley, 2016) "generally do not have a canonical test split, metric or evaluation method." Model comparisons are hard to interpret (Dacrema et al., 2019).
- Why evaluation is hard: (i) different platforms solve different problems (retrieval, ranking, multitask) needing their own setups; (ii) offline logs create an off-policy evaluation problem (Swaminathan et al., 2016); (iii) real systems train on billions of users and items, so a complete interaction dataset is impossible.
- Inconsistent tweaks to the same datasets give contradictory results (Rendle et al., 2020; Zheng et al., 2019): some papers use Hit Ratio and NDCG (He et al., 2017), others Recall@K, and "the same methods reverse their performance when a different metric is used." Holdouts differ: random split (Beutel et al., 2017) vs out-of-time split (Zhang et al., 2020).

> [!example] Table 4 (App. F): popular offline recommender datasets
> | Dataset | Number of examples | Users | Items | Sparsity |
> |---|---|---|---|---|
> | MovieLens 1M | 1,000,209 | 3,706 | 6,040 | 95.53% |
> | MovieLens 20M | 13,501,622 | 138,159 | 16,954 | 99.42% |
> | Amazon Product Review (Movies and TV) | 505K | 22,147 | 178,086 | 99.98% |
> | Amazon Product Review (Video Games) | 46K | 2,670 | 47,063 | 99.96% |
> | Yahoo Movies | 221,367 | 7,642 | 11,915 | 99.76% |
> | Pinterest | 1.5M | 9,916 | 55,187 | 99.73% |
> | Xing | 1,450,300 | 65,347 | 20,778 | 99.89% |
> | Taobao | 100M | 968K | 4M | 99.98% |
> | Last.FM | 42,346 | 1,872 | 3,846 | 99.41% |
> | Book-Crossing | 172,576 | 19,676 | 20,003 | 99.96% |
>
> Transcription note: values are as printed. For MovieLens 1M the printed Users and Items columns look swapped relative to the standard dataset (6,040 users, 3,706 items); this remark is from the note author's background knowledge, not the paper.
^ex-table4-recsys

### Arcade Learning Environment (Sec. 6.2)

Hundreds of papers use ALE (Atari 2600) under distinct protocols (Machado et al., 2018):

| Axis of divergence | Variants cited |
|---|---|
| Episode termination | Game over (Bellemare et al. 2013 etc.) vs loss of a life during training for some games (Mnih et al. 2016; Wang et al. 2016; van Hasselt et al. 2016) |
| Frame skip | Non-default skipframe in baselines (Mnih et al. 2015) |
| Evaluation frequency | Every $2\times10^5$ frames (Pritzel et al. 2017) vs every $10^6$ frames (Mnih et al. 2013, 2016) |
| Number of games | 49 (Mnih et al. 2015) vs 57 (van Hasselt et al. 2016; Wang et al. 2016) |
| Hyperparameter tuning | Entire suite as validation (Bellemare et al. 2013) vs per-game tuning (Jaderberg et al. 2016) |
| Summary statistics | Average and best run with no variance or standard error (Bellemare et al. 2013); seed variance can create statistically different distributions (Henderson et al. 2018) |
| Stochasticity | ALE is deterministic, so an open-loop action sequence can be memorised; various incompatible schemes inject stochasticity |

## Examples

> [!example] Metric reversal (constructed illustration)
> **Setup.** Two recommenders, X and Y. X places the single true item at rank 1 for 40% of users and outside the top 20 otherwise; Y places it at rank 3 for 90% of users.
> **Recall@5.** X = 0.40, Y = 0.90. **NDCG@5 (single relevant item, $1/\log_2(\text{rank}+1)$).** X = 0.40·1 = 0.40; Y = 0.90·0.5 = 0.45. Both favour Y here, but if the cutoff were 1, Recall@1 is X = 0.40, Y = 0, and X wins.
> **Interpretation.** The ranking depends on the metric cutoff; without a canonical protocol, a team can choose the metric that favours its model. The paper's point is that this has actually produced reversals between published papers.
^ex-metric-reversal

## Connections

- Marketing analogue: MMM and attribution vendor comparisons with different holdout definitions, time windows and error metrics are a rigged-lottery environment; the shared-protocol response is the checklist in [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]].
- The ACIC organisers solved the protocol problem by publishing the data generator and evaluation code, so anyone can score a method with any metric: [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]
