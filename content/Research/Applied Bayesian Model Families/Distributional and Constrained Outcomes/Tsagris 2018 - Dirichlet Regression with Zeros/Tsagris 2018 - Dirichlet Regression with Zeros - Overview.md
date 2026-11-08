---
title: "Tsagris 2018 - Dirichlet Regression with Zeros - Overview"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/overview
  - doc/paper
source: "[[raw/Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros.pdf]]"
source_location: "Entire paper, arXiv 1410.5011v6 (Lobachevskii J. Math. 2018), 18 pp."
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Tsagris 2018 - Dirichlet Regression with Zeros"
doc_type: paper
depends_on:
  - "[[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]"
used_by:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]]"
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]]"
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]]"
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]]"
aliases:
  - Tsagris and Stewart ZADR
  - zero adjusted Dirichlet regression overview
---

# Tsagris 2018 - Dirichlet Regression with Zeros - Overview

> [!summary]
> Tsagris and Stewart modify the Dirichlet regression log-likelihood so compositions containing exact zeros can be modelled *without imputing them*: each zero pattern is a "population" whose non-zero components follow a Dirichlet with the same coefficients and precision. The resulting ZADR model competes with Aitchison's imputed log-ratio regression and the Kent/square-root model, and wins when zeros are numerous.

## Overview

**Question.** Aitchison's log-ratio regression and Dirichlet regression both fail when a component is exactly zero. Imputation (Palarea-Albaladejo and Martin-Fernandez 2008) assumes zeros are rounded values, alters every other component of an affected vector, and is sensitive to the assumed detection limit.

**Contribution.** ZADR (simple and full) built on Stewart and Field (2011) and Bear and Billheimer (2015), plus a four-step maximisation using the Aitchison fit as starting values.

**Key result.** Simple ZADR beats Aitchison+imputation on Arctic-lake data with injected zeros and on foraminifera (KL 3.126 vs 3.556), and in simulation reaches proportion 1 of runs with lower KL as $n$ grows.

## Motivating PyMC examples

**E70** (Aitchison's Arctic lake sediments: sand/silt/clay vs depth; Dirichlet regression in mean-precision form) at <https://redam94.github.io/pymc-challenges/examples.html>; see [[Greenacre 2023 - Compositional Outcome Models in PyMC]].

## Main Content — Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| 1 Introduction | 1 | this note |
| 2 Dirichlet regression (Eqs. 1-4) | 2-3 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]] |
| 3.1 Zeros and current approaches | 3-4 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]] |
| 3.2 Zero values and Dirichlet regression (Eqs. 5-9) | 4-6 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]] |
| 3.3 Maximisation of the log-likelihood | 6-7 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]] |
| 4.1 Florida election; 4.2 glass; 4.3 foraminifera; 4.4 Arctic lake | 7-12 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]] |
| 4.5 Simulation study | 11-14 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]] |
| 5 Discussion; 6 Conclusions | 14-15 | [[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]] |

## Relevance to marketing measurement

Share outcomes with structural zeros (a channel not run, a competitor absent in a market) are common. ZADR-style handling keeps observed shares unchanged rather than imputing an arbitrary epsilon.

## Connections

Foundation in [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]; [[Generalized Linear Models]] (multinomial-logit link).

## See Also

Cluster notes under [[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]].
