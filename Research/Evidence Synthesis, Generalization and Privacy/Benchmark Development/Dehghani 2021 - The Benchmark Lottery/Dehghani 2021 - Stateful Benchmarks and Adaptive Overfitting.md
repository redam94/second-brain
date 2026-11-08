---
title: "Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting"
tags:
  - source/ingested
  - topic/benchmarks
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Sec. 5, pp. 11-13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Community Bias and the GLUE Example]]"
used_by:
  - "[[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]"
aliases:
  - Stateful benchmarks
  - Adaptive overfitting on benchmarks
  - Boosting attack on holdout
---

# Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting

> [!summary]
> Benchmarks are stateful: each new method is designed knowing the test results and published tricks of its predecessors. In adaptive data analysis the guarantee on test error fails once the number of adaptive queries is of the order of the test-set size, and a boosting attack can achieve accuracy of order $\sqrt{i/N}$ above chance. Empirical studies on ImageNet and Kaggle find little actual overfitting, but the paper argues the risk and the tricks-accumulation effect should still be managed.

## Overview

"At any point in time, the attempt of a new idea for beating a particular benchmark depends on the information gathered from previous submissions and publications." Researchers usually have full access to the holdout set; copy-pasting hyperparameters, code and even pretrained checkpoints means new models are built on "thousands of queries, direct or indirect, to the test set."

## Main Content

### Adaptive data analysis bound (paper's statement)

> [!theorem] Adaptivity and test-set reuse (as stated in the paper)
> Let the test set have size $N$. If the designer of the $i$-th model can see the errors of the first $i-1$ models on the test set, then, by the **boosting attack** (Blum and Hardt, 2015), one can ensure the $i$-th model's test accuracy is as high as
> $$\Omega\!\left(\sqrt{i/N}\right)$$
> above its true accuracy. Hence (Dwork et al., 2015) once $i \gg N$ the test-set results "are no longer an indication of model quality." The adaptive data analysis framework instead provides evaluation mechanisms with guaranteed upper bounds on the difference between the average error on test examples and the population error.
^thm-adaptive-reuse

*Caveat on the statement.* The paper writes the bound as $\Omega(\sqrt{i/N})$ and the condition as $i \gg N$ in prose; the formulation here follows the paper's wording and does not restate the precise conditions of Blum and Hardt, which are in that reference.

### Empirical counter-evidence and refinements

| Finding | Source | Implication |
|---|---|---|
| Little overfitting to holdouts on ImageNet-like datasets; rankings stable on re-collected test sets | Recht et al. 2018, 2019; Yadav and Bottou 2019 | Adaptivity risk may be smaller than worst-case reasoning suggests |
| No significant adaptive overfitting in Kaggle classification competitions | Roelofs et al. 2019 | Same |
| Large number of classes makes overfitting substantially harder | Feldman et al. 2019a,b | Multi-class tasks are more robust |
| New test sets are not always possible (rare or one-time phenomena); need an effective upper bound on test-population gap based on **description length** of models given knowledge before and after test-set creation | Arora and Zhang 2021 | Bound-based assurance where re-collection is impossible |
| How the test set is accessed matters, not only how many times | Paper's discussion | Count queries *and* study access pattern |

**Conclusion of the paper:** prior information about test performance may influence later modelling choices and hyperparameters, and this adaptive behaviour "in principle, may have an effect on generalization and can, to different extents, create a gap between test error and full distribution error."

### Questions to ask when using a benchmark

1. Do improvements on the benchmark correspond to progress on the original problem?
2. How does the number of times, and the way, the test set has been accessed relate to the statistical validity of results?
3. How far can one get by gaming the benchmark rather than progressing on the original problem?

### Lottery tickets and tricks

- Accessing the test set more than others "can be interpreted as ... buying more lottery tickets"; the paper cites an ImageNet challenge episode (2015 announcement) where extra test-set access secured a margin.
- Echo-chamber effect: leading models are adapted by re-using code, pretrained weights and hyperparameters.
- **Accumulated tricks.** Late participants face dataset-specific recipes; e.g., pretraining on MNLI is needed for strong results on RTE and STS; "standard GLUE tricks" in pretraining and fine-tuning. Whether a novel algorithm can use these tricks "is again a form of lottery."

## Examples

> [!example] Boosting attack on a coin-flip test set (simulation, not from the paper)
> **Setup.** Test labels are fair coin flips, so every classifier has true accuracy 0.5. We query $k=400$ random classifiers on $N=2000$ test points, keep those that beat chance on the test set, and take their majority vote.
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> N, k = 2000, 400
> y = rng.choice([-1, 1], size=N)
> guesses = rng.choice([-1, 1], size=(k, N))
> acc = (guesses == y).mean(1)
> vote = np.sign(guesses[acc > 0.5].sum(0))
> print("best single model:", acc.max())
> print("ensemble on test :", (vote == y).mean())
> fresh = rng.choice([-1, 1], size=N)
> print("ensemble on fresh:", (vote == fresh).mean())
> ```
> **Output observed.** best single model 0.525; ensemble on the reused test set 0.574; on fresh labels 0.476.
> **Interpretation.** Selecting on the test set inflates measured accuracy by about 7 points over truth with no real skill; a fresh sample exposes it. This is adaptive overfitting in miniature and is the mechanism behind "buying lottery tickets."
^ex-boosting-attack-sim

## Connections

- Statistical cousin: researcher degrees of freedom and forking paths ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]]), and test-set reuse is a multiplicity problem ([[Multiple Testing Corrections]]).
- In marketing measurement, repeatedly tuning an MMM to match the same set of holdout weeks or lift tests is adaptive reuse; fresh held-out experiments are the analogue of "new test sets."

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]]
