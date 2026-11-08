---
title: "Girosi King 2007 - Information Loss with One Principal Component"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/example
  - doc/paper
source: "[[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]"
source_location: "Sec. 2, pp. 6-10; Figure 1; Table 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
doc_type: paper
depends_on:
  - "[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]"
used_by:
  - "[[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]]"
  - "[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]"
aliases:
  - "variance explained by first principal component mortality"
  - "Lee-Carter applicability diagnostic"
  - "Table 1 Girosi King"
---

# Girosi King 2007 - Information Loss with One Principal Component

> [!summary]
> Lee-Carter keeps one principal component of the centred log-mortality age profiles. The share of variance it explains is a simple applicability diagnostic: for all-cause male mortality it is above 90% in 14 of the 24 countries tabulated (USA 93%), but for cause-specific series it is often below 50% (homicide, suicide, stomach cancer). There is no simple pattern that tells ex ante where the model works.

## Overview

Read the age profile as a point in $\mathbb R^A$ moving over time; Lee-Carter assumes it moves along a straight line. Percent variance explained by $k$ components: $\Delta E_k=1-\sum_t\|\epsilon_t^{(k)}\|^2/\sum_t\|\tilde m_t\|^2$ where $\epsilon_t^{(k)}=\tilde m_t-\sum_{j\le k}\beta_j\gamma_{jt}$ (footnote 4). Principal components in demography: Ledermann and Breas (1959); Bozik and Bell (1987); Bell and Monsell (1991).

## Main Content

> [!definition] Percent of variance explained (Eq. 10 and footnote 4)
> Full decomposition $m_{at}=\alpha_a+\sum_{j=1}^A\beta_{aj}\gamma_{tj}$ is exact; Lee-Carter is the $j=1$ term, error $=\sum_{j\ge2}\beta_{aj}\gamma_{tj}$. $\Delta E_k\in[0,1]$ measures how well $k$ components approximate the centred profiles.
^def-variance-explained

**Figure 1 (U.S. males 1950-2000, 3-D plots of first three PCs).** All-cause: 93/97/99% for 1/2/3 components; cardiovascular 90/95/99%; Sweden lung cancer 38/56/69%; Sweden homicide 37/50/57%. In the latter two, one component ignores about two-thirds of the variation, so Lee-Carter "should not be counted on to perform as well".

> [!example] Table 1: percent of variance in male mortality explained by the first principal component (bold = 90% or higher)
> | Country | All cause | Cardio-vascular | Lung cancer | Homicide | TB | Respiratory | Stomach cancer | Other cancer | Suicide | Digestive |
> |---|---|---|---|---|---|---|---|---|---|---|
> | Japan | **98** | 87 | **96** | 74 | **97** | 69 | 66 | 62 | 65 | **97** |
> | Chile | **97** | **92** | 48 | 52 | **96** | 52 | 71 | 55 | 79 | 87 |
> | Canada | **95** | 77 | 84 | 38 | 89 | 50 | 64 | 80 | 85 | 79 |
> | Australia | **95** | 79 | 64 | 16 | 84 | 37 | 61 | 67 | 66 | 79 |
> | U.K | **94** | 72 | 77 | 60 | **91** | 80 | 70 | 87 | 87 | 83 |
> | Mexico | **93** | 81 | 77 | 64 | **97** | 82 | 32 | 71 | 63 | **97** |
> | USA | **93** | **90** | 81 | 70 | **94** | 78 | 63 | **95** | **91** | 85 |
> | Austria | **93** | 49 | 44 | 16 | 86 | 35 | 61 | 69 | 34 | 76 |
> | Italy | **92** | 74 | 88 | 43 | **93** | 61 | 46 | 70 | 60 | **90** |
> | Finland | **92** | 56 | 49 | 21 | 88 | 37 | 75 | 56 | 52 | 72 |
> | Belgium | **92** | 70 | 78 | 40 | 85 | 47 | 57 | 67 | 80 | 70 |
> | Portugal | **91** | 62 | 80 | 21 | **91** | 34 | 34 | 46 | 45 | 87 |
> | Switzerland | **91** | 36 | 45 | 22 | 83 | 24 | 64 | 53 | 33 | 75 |
> | France | **90** | 89 | **93** | 44 | **94** | 78 | 56 | 74 | 80 | 84 |
> | Sweden | **90** | 41 | 55 | 37 | 82 | 29 | 69 | 62 | 38 | 64 |
> | Spain | 89 | **91** | **93** | 66 | **94** | 74 | 54 | 74 | 73 | **94** |
> | Netherlands | 89 | 40 | 78 | 41 | 81 | 39 | 61 | 70 | 72 | 70 |
> | Venezuela | 86 | 64 | 46 | 50 | **93** | 37 | 52 | 43 | 23 | **93** |
> | Hungary | 85 | 64 | 86 | 30 | 79 | 39 | 52 | 62 | 73 | 79 |
> | Norway | 84 | 29 | 64 | 24 | 82 | 24 | 66 | 64 | 66 | 56 |
> | Ireland | 83 | 57 | 68 | 28 | 86 | 37 | 59 | 43 | 70 | 71 |
> | New Zealand | 82 | 57 | 40 | 19 | 79 | 40 | 40 | 34 | 59 | 61 |
> | Denmark | 70 | 39 | 58 | 31 | 67 | 36 | 56 | 51 | 48 | 55 |
> | Iceland | 57 | 53 | 42 | 40 | 54 | 20 | 55 | 18 | 18 | 32 |
^ex-table1-variance

> [!theorem] Observations from Table 1
> (1) Some causes (all-cause, TB, partly cardiovascular) are low-dimensional across countries, suggesting an underlying reason. (2) No clear relation with country size (Iceland is low, 57%, but other small countries are not). (3) Digestive and lung cancer vary widely across countries. (4) Homicide, respiratory, stomach cancer and suicide are rarely well summarised. (5) Within a country, variance explained varies strongly with cause. Conclusion: Lee-Carter "will usually be appropriate only for idiosyncratic choices of countries and causes of death, and there is no way to know ex ante which those are".
^thm-table1-obs

## Examples

> [!example] Using $\Delta E_1$ as a pre-check
> Setup: a new country with all-cause male variance explained 84% (like Norway) and suicide 66% (like Norway too: 66%). Solution: apply a 90% rule of thumb as the bold entries suggest. Interpretation: all-cause Lee-Carter is borderline; cause-specific suicide forecasts would ignore a third of the motion. Prefer RWD, or add components, before trusting the fan.
^ex-precheck
```python
import numpy as np
def pct_var_explained(m, k=1):
    mt = m - m.mean(1, keepdims=True); s = np.linalg.svd(mt, compute_uv=False)
    return (s[:k]**2).sum() / (s**2).sum()
```

## Connections
[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]], [[Factor Analysis and PPCA]], [[Model Comparison]].

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
