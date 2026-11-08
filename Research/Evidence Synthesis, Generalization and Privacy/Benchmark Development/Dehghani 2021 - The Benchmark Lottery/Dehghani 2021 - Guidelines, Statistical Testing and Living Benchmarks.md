---
title: "Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Secs. 7.1-7.3 and 8, pp. 14-19"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]]"
  - "[[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]]"
used_by:
  - "[[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]]"
aliases:
  - Living benchmarks
  - Benchmark guidelines
  - Statistical testing for benchmarks
---

# Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks

> [!summary]
> The recommendations section proposes (1) shared guidelines for creating benchmarks, using them and reviewing papers about them, (2) benchmark designs accompanied by a statistical-testing recipe with multiple fixed splits, and (3) "living" benchmarks that change over time to resist creeping overfitting. It also cautions that top models are often over-complex and that the right model depends on context.

## Overview

Section 7 is the constructive half of the paper: "there are reasons to be optimistic." Recommendations can be framed as checklists for making, using and evaluating on benchmarks (Appendix G: [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]]).

## Main Content

### 7.1 Guidelines

> [!definition] Benchmark building blocks
> A benchmark (suite) rests on three elements; careless choice of each feeds a specific bias:
> | Block | Requirement | Bias fed if chosen without deliberation |
> |---|---|---|
> | **Goal/task** | A clear definition of the problem and set of objectives | Community bias (Sec. 4) |
> | **Datasets** | Capture the problem, "right" size, faithfully capture the larger population | Task selection bias (Sec. 3) |
> | **Metrics** | Shared metrics that reflect progress and "dictate future research directions" | Rigging the lottery (Sec. 6) |
^def-benchmark-building-blocks

**Guidelines for creating benchmarks.** Standardise the recipe. Existing efforts cited: Zhang (2021) on robotic warehouse picking benchmarks (out-of-the-box performance, learning speed, learning potential); Kiela et al. (2021) *Dynabench* (dataset creation, model development and assessment with humans and models in the loop); Denton et al. (2020) on ethical and political dimensions of dataset construction; Bender and Friedman (2018) data statements; and Gebru et al. datasheets ([[Gebru 2021 - Datasheets for Datasets - Overview]]).

**Complexity and simplicity.** Top-scoring models are often over-complex ensembles with fancy training that "grand-father the benchmark." Proposal: reward simplicity and ease of adaptation with a quantitative metric. More generally "the assumption that there is a single ideal model" is mistaken: "the appropriate model is, in fact, a function of context." Ethayarajh and Jurafsky (2020) argue to report model size, energy efficiency, inference latency, robustness and out-of-distribution generalisation.

**Compute and tuning budgets.** Rigorous variance analysis is expensive; the community could fund reproducibility challenges or conference tracks with compute. A guideline limiting the **hyperparameter tuning budget** would curb improvements that come only from exhausting search.

**Guidelines for using a benchmark.** Most "how to" sections cover loading data and running baselines; they should expand to recommended processes for exact setup and result reporting, "avoid shortcuts that undermine the validity of findings," and standard methodologies for principled comparison. Examples: Albrecht et al. (2015) and Machado et al. (2018) standards for ALE.

**Guidelines for conferences and reviewers.** NLP conferences have called out "not being SOTA" as an invalid basis for rejection. Treat benchmark scores as sanity checks and efficient comparisons to multiple baselines, not as immediate competition with the top entry, so fundamentally new approaches can mature.

### 7.2 Statistical significance testing

> [!definition] Benchmark results as random samples
> A trained model's metric $m$ is a single draw from a distribution $p(m)$ due to uncontrolled variance. To claim model $B$ beats $A$, compare $p(m_A)$ and $p(m_B)$ and require $P(A \le B) < \alpha$ for a pre-chosen $\alpha$. Parametric tests need fewer samples; non-parametric tests estimate the distributions directly and need more. Using point estimates, "sampling $m'_A\sim p(m_A)$ and $m'_B\sim p(m_B)$ such that $m'_B>m'_A$ is only a matter of time" even if the models do not differ: "winning a lottery if you purchase enough lottery tickets."
^def-benchmark-random-sample

Points made:
- **Beyond a single train-test split.** Bouthillier et al. (2021) show dataset split contributes the most to model variance compared with other sources (initialisation, data order, augmentation, dropout, HPO), yet benchmarks ship one fixed test set, "discourag[ing] the use of accurate statistical testing." This is worst at mature (stage 4) benchmarks where gains are comparable to variance, leading to false positives and "improved overfitting." Recommendation: design benchmarks with **multiple fixed dataset splits**, enabling tests within and across publications.
- **Counterpoint.** Recht et al. (2019): ImageNet models ranked consistently on a new test split and the observed drop is explained by image difficulty, not overfitting, so a single split may be acceptable with periodic replication checks; decide case by case.
- **Design with testing in mind.** The test depends on the metric's distribution, parametric vs non-parametric assumptions, number of tests (multiplicity correction), and evolves (Demšar 2006; Bouthillier et al. 2021; Lin et al. 2021). Benchmarks should recommend: number of splits, number of replicates, sources of variance to randomise, the statistic to compute, and the significance level.
- **Beyond a single dataset.** Is the average across datasets meaningful (errors may be incommensurable; variances differ)? If the question is whether $B$ beats $A$ **on average**, Demšar (2006) recommends the **Wilcoxon signed-rank test** over datasets (limited power when few datasets). If the question is whether $B$ beats $A$ **on all datasets**, Dror et al. (2017) recommend testing each dataset separately with **multiple-testing correction**. Armstrong et al. (2009): comparing against weak baselines caused about a decade of stagnation in information retrieval.

### 7.3 Living benchmarks

"Creeping overfitting": algorithms adapt to dataset idiosyncrasies and lose generalisation; also "chasing a moving target" as the meaning of progress changes. Remedies: change the evaluation dataset regularly (as WMT and TREC do annually), withhold the test set and limit the number of queries to it, and make the benchmark a "living entity" that adds examples and tasks, deprecates old data, and fixes labels. Examples: **GEM** (living benchmark for natural language generation, Gehrmann et al. 2021) and **Dynabench** (humans and models in the data-collection loop, Kiela et al. 2021).

### 8 Epilogue

Benchmarks have driven progress, but there is a danger of "a vicious cycle of investing in making static benchmarks that soon will be rejected due to the inflexible flaws in their setup." Future topics: integrating ethical checks into mainstream evaluation, tools for rigorous testing of claimed improvements, and the social dynamics of review.

## Examples

> [!example] Choosing a test for a two-model comparison on several datasets
> **Setup.** Model $B$ is compared with $A$ on 12 datasets with 5 seeds each.
> **Average claim.** Compute per-dataset mean differences and apply the Wilcoxon signed-rank test to the 12 differences (Demšar). With few datasets, power is limited.
> **Uniform-superiority claim.** Test each dataset (e.g., paired test over seeds or splits) and apply Bonferroni or Holm correction across the 12 tests (Dror et al.).
> **Interpretation.** The two claims need different tests; state which claim the benchmark supports before looking at results.
>
> ```python
> import numpy as np
> from scipy.stats import wilcoxon, ttest_rel
> rng = np.random.default_rng(0)
> d, s = 12, 5
> base = rng.normal(0.7, 0.05, size=(d, 1))
> A = base + rng.normal(0, 0.01, size=(d, s))
> B = base + 0.004 + rng.normal(0, 0.01, size=(d, s))
> print("Wilcoxon over datasets:", wilcoxon(B.mean(1) - A.mean(1)).pvalue)
> pvals = np.array([ttest_rel(B[i], A[i]).pvalue for i in range(d)])
> holm = np.minimum(1, np.sort(pvals) * (d - np.arange(d)))
> print("min Holm-adjusted p over datasets:", holm.min())
> ```
> **Output observed (seed 0).** Wilcoxon p about 0.57; minimum Holm-adjusted p about 0.10. A true 0.004 gain is not detected by either procedure, which is the correct conclusion when the gain is small relative to noise.
^ex-wilcoxon-vs-dror

## Connections

- Multiple splits and replicates are the benchmark analogue of Monte Carlo replication in simulation studies: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]; the ACIC design used 100 replications per setting ([[Dorie 2019 - Simulation Design and Knobs]]).
- Multiplicity corrections: [[Multiple Testing Corrections]].
- Datasheet maintenance and version questions operationalise "living benchmarks": [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]]
