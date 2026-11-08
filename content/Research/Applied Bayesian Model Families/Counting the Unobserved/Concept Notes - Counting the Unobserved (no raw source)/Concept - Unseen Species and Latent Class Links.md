---
title: "Concept - Unseen Species and Latent Class Links"
tags:
  - source/ingested
  - topic/population-estimation
  - type/concept
  - doc/paper
source: "Concept note, no raw source (literature: Good 1953; Chao 1984, 1987; Dawid and Skene 1979; Hui and Walter 1980; Goodman 1974; Pitman and Yor 1997)"
source_location: "n/a (synthesis; links PyMC examples E30 and E69 to this cluster)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Concept Notes - Counting the Unobserved (no raw source)"
doc_type: concept
depends_on:
  - "[[Concept - Closed-Population Capture-Recapture and Otis Models]]"
  - "[[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]"
used_by:
  - "[[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]"
aliases:
  - species richness and capture-recapture
  - latent class raters link
---

# Concept - Unseen Species and Latent Class Links

> [!summary]
> Estimating the number of unseen species (PyMC E30) is the same "count the zero cell" problem as capture-recapture, with species as individuals and sample frequencies as capture counts. Latent-class models for noisy raters (E69) are the same mixture-of-product-Bernoullis family as latent-class MSE, but with the all-zero pattern observed, which changes identification.

## Overview

This note bridges the two examples that touch the cluster only partly: **E30** (Pólya urns, Chinese restaurant process, Pitman-Yor, unseen species in Moby-Dick and Barro Colorado Island trees; handled mainly in the Bayesian nonparametrics cluster) and **E69** (latent class models for pathologists and anaesthetists; handled in the raters cluster). Both are listed at <https://redam94.github.io/pymc-challenges/examples.html>.

## Main Content

### Unseen species as capture-recapture
Let $f_k$ be the number of species observed exactly $k$ times in a sample of $n$ items, $S_{obs}=\sum_{k\ge1}f_k$, and $S$ the (unknown) richness. The unseen species are the $k=0$ cell, whose count $f_0=S-S_{obs}$ must be extrapolated from $f_1,f_2,\dots$ exactly as $N-n$ is extrapolated from capture frequencies.

> [!definition] Classical unseen-species estimators
> - **Good-Turing**: probability mass of unseen species $\approx f_1/n$ (Good 1953).
> - **Chao1 lower bound** (Chao 1984): $\hat S\ge S_{obs}+\dfrac{f_1^2}{2f_2}$, the $M_h$ lower bound of [[Concept - Closed-Population Capture-Recapture and Otis Models]].
> - **Pitman-Yor / Gibbs-type priors** (Pitman and Yor 1997) give the exchangeable-partition probability of a new species, yielding predictive richness curves without fixing $S$.
^def-unseen-species-estimators

> [!example] Chao1 worked example
> Tree census with $S_{obs}=250$ species, $f_1=60$, $f_2=40$: $\hat S\ge250+60^2/(2\cdot40)=250+45=295$. Interpretation: at least 45 unseen species are implied by the abundance of singletons relative to doubletons; the figure is a lower bound under heterogeneous detectability, as non-identifiability of $M_h$ forbids a tighter point estimate without parametric assumptions ([[Concept - Closed-Population Capture-Recapture and Otis Models]]).
^ex-chao1

### Latent class for raters versus MSE
| Aspect | Raters / diagnostic tests (E69) | Latent-class MSE (E109) |
|---|---|---|
| Units | items rated by $K$ raters | individuals on $K$ lists |
| Data | all $2^K$ patterns observed | all but $0^K$ observed |
| Latent class | true state (e.g. positive/negative) | heterogeneity classes (no direct meaning) |
| Target | class prevalence, rater error rates | total $N$ via $\pi_0$ |
| Identification | $\ge3$ conditionally independent raters give a locally identified 2-class model (parameters $2K+1\le 2^K-1$ holds for $K\ge3$); label switching remains | non-identified when $2J>K$ ([[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]) |
| Fix for label switching | Youden / better-than-chance ordering | ordering of class probabilities |

The "parameter versus degrees-of-freedom counting" in E69 is the necessary condition $J(K+1)-1\le 2^K-1$ in the rater setting (the missing cell is observed, so the table has $2^K-1$ free dimensions), versus $2^K-2$ conditional dimensions for MSE ([[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]). Counting is necessary, not sufficient.

> [!example] Counting for three raters, two classes
> Parameters: one class weight plus $2\times3$ error rates $=7$; table dimension $2^3-1=7$. Saturated but identified up to label switching (Goodman 1974 conditions); a fourth rater gives overidentification and enables testing conditional independence. In MSE with $K=3$ lists the missing cell removes one dimension: $J=2$ would need $2J\le K\Rightarrow4\le3$, false, so even this small latent-class MSE model is non-identifiable.

## Examples

> [!example] Python check of the counting argument
> ```python
> for K in (3, 4, 5, 6, 8, 10):
>     rater_max = max(J for J in range(1, 200) if J*(K+1)-1 <= 2**K - 1)
>     mse_count = max(J for J in range(1, 200) if J*(K+1)-1 <= 2**K - 2)
>     mse_thm = K // 2
>     print(K, rater_max, mse_count, mse_thm)    # counting bound vs Theorem 2 bound
> ```
> The gap between `mse_count` and `mse_thm` shows how much stricter Theorem 2 is than parameter counting.

## Connections

- Conceptual reuse: Dawid-Skene and Hui-Walter models treat raters as lists and the latent class as truth; the link to hierarchical modelling is [[Hierarchical Models]].
- Mixture machinery: [[Monsters and Mixtures]]. Nonparametric priors for unseen species: [[Nonparametric Models Overview]].

## See Also

- [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]
- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
