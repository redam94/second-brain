---
title: "Concept - Closed-Population Capture-Recapture and Otis Models"
tags:
  - source/ingested
  - topic/population-estimation
  - type/concept
  - doc/paper
source: "Concept note, no raw source (literature: Otis et al. 1978; Seber 1982; Chapman 1951; Chao 1987; Link 2003; Fienberg 1972)"
source_location: "n/a (synthesis; cross-checked against Barker 2018 Sec. 2, Aleshin-Guendel 2020 Sec. 1-2, Silverman 2020 Sec. 3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Concept Notes - Counting the Unobserved (no raw source)"
doc_type: concept
depends_on:
  - "[[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]"
used_by:
  - "[[MacKenzie 2002 - Occupancy Model and Likelihood]]"
  - "[[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]"
aliases:
  - Lincoln-Petersen estimator
  - Otis models M0 Mt Mb Mh
  - closed population capture-recapture
---

# Concept - Closed-Population Capture-Recapture and Otis Models

> [!summary]
> Closed-population capture-recapture estimates an unknown population size $N$ from the overlap of $K$ samples. Lincoln-Petersen ($K=2$) is $\hat N=n_1n_2/m$; the Otis et al. (1978) family ($M_0,M_t,M_b,M_h$ and combinations) specifies how capture probability varies. Positive dependence between samples biases the estimate low, and heterogeneity makes $N$ non-identifiable without parametric restrictions. This is a concept note (no raw source); numbers and formulas are standard and cross-checked against the ingested papers.

## Overview

Occupancy, N-mixture and multiple-systems estimation are all closed-population capture-recapture with the data partly hidden or the unit redefined:
- **Occupancy**: units are sites; the all-zero history is observed, the number of occupied sites is latent ([[MacKenzie 2002 - Occupancy Model and Likelihood]]).
- **N-mixture**: recapture identities are removed ([[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]).
- **MSE**: samples are administrative lists, dependent by construction ([[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]).

## Main Content

> [!definition] Two-sample setup and Lincoln-Petersen
> Sample 1 marks $n_1$ individuals; sample 2 captures $n_2$, of which $m$ are marked. If captures are independent and individuals are equally catchable, the marked fraction in sample 2 estimates the marked fraction in the population: $m/n_2\approx n_1/N$, so
> $$
> \hat N_{LP}=\frac{n_1n_2}{m}.
> $$
> The less biased **Chapman** estimator is $\hat N_C=\frac{(n_1+1)(n_2+1)}{m+1}-1$ with variance estimate $\frac{(n_1+1)(n_2+1)(n_1-m)(n_2-m)}{(m+1)^2(m+2)}$ (finite for $m=0$, unlike LP).
^def-lincoln-petersen

> [!theorem] Dependence bias (two lists)
> If inclusion in list 1 and list 2 are positively associated (odds ratio $\theta>1$ between the two inclusion indicators), the overlap $m$ exceeds its independence expectation, so $\hat N_{LP}$ underestimates $N$ (roughly in proportion to the excess overlap; negative dependence overestimates). With only two lists dependence is not testable; three or more lists allow pairwise interactions to be estimated and tested, which is why MSE uses $K\ge3$.
^thm-dependence-bias

> [!definition] Otis et al. (1978) models for $K$ occasions
> Let $p_{ij}$ be the capture probability of individual $i$ on occasion $j$.
> | Model | Assumption on $p_{ij}$ |
> |---|---|
> | $M_0$ | $p_{ij}=p$ |
> | $M_t$ | $p_{ij}=p_j$ (time/occasion effect; also "list effect") |
> | $M_b$ | $p$ differs before vs after first capture (behavioural response: trap-happy or trap-shy) |
> | $M_h$ | $p_{ij}=p_i$, $p_i\sim G$ (individual heterogeneity) |
> | $M_{th}$ | $p_{ij}=\lambda_{ij}$ with independent individual-by-source latent probabilities |
> | $M_{tb},M_{bh},M_{tbh}$ | combinations |
^def-otis-models

Likelihood (Fienberg 1972): the cell counts of the $2^K$ table are multinomial$(N,\pi)$ which factor as binomial$(N,1-\pi_0)$ for the observed total $n$ times a multinomial for the observed cells given $n$ (the conditional likelihood). Inference about $N$ then rests on extrapolating the conditional cell probabilities to the missing cell $\pi_0$, which is "an untestable assumption" (Fienberg 1972). Details and the identifiability implications: [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]].

**Heterogeneity and identifiability.** For $M_h$ with an unrestricted mixing distribution $G$, $N$ is not identifiable from the observed capture frequencies: different $G$ with the same distribution on $\{p_i>0\}$ can imply different mass at zero (Link 2003, Biometrics 59: 1123-1130). One must restrict $G$ to a parametric family, and different identified families can give very different $N$. A lower bound that avoids the issue is the Chao (1987) estimator, $\hat N\ge n+f_1^2/(2f_2)$ where $f_k$ is the number of individuals captured exactly $k$ times.

## Examples

> [!example] Lincoln-Petersen vs Chapman, and the dependence bias
> **Setup.** $n_1=200$, $n_2=150$, $m=30$.
> **Solution.** $\hat N_{LP}=200\cdot150/30=1000$; $\hat N_C=201\cdot151/31-1=978.1$. Suppose the true population is 1200 and inclusion is positively dependent so that the expected overlap is 40 rather than the independence value $200\cdot150/1200=25$. Then $\hat N_{LP}=200\cdot150/40=750$, a 37% underestimate.
> **Interpretation.** Compare 750 with the observed union $n_1+n_2-m=310$ (when $m=40$): the true dark figure is $1200-310=890$ but the estimate is $750-310=440$. Two-list estimates should be treated as conditional on independence.
^ex-lincoln-petersen-bias

```python
import numpy as np
n1, n2, m = 200, 150, 30
lp = n1*n2/m; chapman = (n1+1)*(n2+1)/(m+1) - 1
var_c = (n1+1)*(n2+1)*(n1-m)*(n2-m)/((m+1)**2*(m+2))
print(lp, chapman, np.sqrt(var_c))
# Chao lower bound from capture-frequency counts f1, f2
f1, f2, n = 120, 40, 300
print(n + f1**2/(2*f2))
```

> [!example] PyMC-style sketch for $M_t$ with data augmentation (untested)
> Marginalise the augmented zero-capture individuals: with $M$ the augmentation size and $\omega$ the inclusion probability, each of the $M-n$ unseen slots contributes $\omega\prod_j(1-p_j)+(1-\omega)$, the same two-part term as the occupancy all-zero history. Hence MacKenzie's likelihood is exactly Royle-Dorazio data-augmented $M_t$ with $N$ = occupied sites ([[Concept - Marginalising Latent Discrete Counts for HMC]]).

> [!example] Relevance to marketing measurement
> Two overlapping measurement systems (e.g. platform-reported conversions and a first-party CRM) are two lists; the apparent overlap understates the unobserved total only if inclusion is independent. Positively dependent lists (both biased toward heavy users) make the naive overlap-based total too small, the same sign as the capture-recapture dependence bias. Analogy only.

## Connections

- Ecology-to-human-rights migration: [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]].
- Latent class $M_{th}$ models and identification: [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]].
- Hierarchical interpretation of $M_h$: [[Hierarchical Models]].

## See Also

- [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]
- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
