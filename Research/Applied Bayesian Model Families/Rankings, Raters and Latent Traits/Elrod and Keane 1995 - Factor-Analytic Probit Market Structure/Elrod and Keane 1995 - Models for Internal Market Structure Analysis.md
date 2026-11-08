---
title: "Elrod and Keane 1995 - Models for Internal Market Structure Analysis"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/paper
source: "[[raw/Elrod and Keane 1995 - A Factor-Analytic Probit Model for Market Structure in Panel Data.pdf]]"
source_location: "Introduction and Models section, pp. 1-4 (Table 1)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Elrod and Keane 1995 - Factor-Analytic Probit Market Structure"
doc_type: paper
depends_on:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview]]"
used_by:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]]"
aliases:
  - internal market structure analysis review
  - market share brand switching pick-any purchase frequency models
---

# Elrod and Keane 1995 - Models for Internal Market Structure Analysis

> [!summary]
> Market structure is the explanation of brand preferences in terms of brand attributes and consumer preferences for them. Internal analysis infers both from choice data. The paper reviews methods by data type - market shares, brand-switching matrices, pick-any/n data, purchase frequencies, disaggregate panel data - and shows why each is limited in handling heterogeneity, marketing variables, or market-share differences.

## Overview

Market structure analysis lets managers verify positioning of existing brands and suggest positions for new or repositioned brands, within the set of attributes that characterise existing choices.

## Main Content

> [!definition] Market structure (as used in the paper)
> The explanation of consumer brand preferences in terms of brand attributes and consumer preferences for those attributes. Internal analysis infers attributes and preferences from preference or choice data rather than from external attribute ratings.
> ^def-market-structure

**Market share data.** DEFENDER (Hauser & Shugan 1983; Shugan 1987; Waarts et al. 1991), competitive maps (Cooper 1988) and Allenby (1989) infer structure from cross-price elasticities. They avoid multiple-purchase problems but cannot characterise consumer heterogeneity; models other than DEFENDER omit brand intercepts, so they cannot explain share differences or predict share for a new brand.

**Brand switching data.** Latent class models of switching matrices (Grover & Srinivasan 1987; Jain, Bass & Chen 1990): segments are latent, some brand-loyal, others switch among all brands. Limitations: no explanation of share differences; aggregation of brand switches loses marketing-mix information; households with more than two purchases pose a problem (ten consecutive purchases can be tallied as nine switches or five independent pairs).

**Pick-any/n (binary) data.** DeSarbo & Hoffman, DeSarbo & Cho, Jedidi & DeSarbo: ideal points or vectors estimated per household (idiosyncratic) or constrained to be linear in household characteristics. Issues: needs binary data, a third mode (occasion) requires equal occasions across households, brands assumed chosen independently, and household-specific parameters estimated by maximum likelihood are inconsistent in the number of households (and may not exist, e.g. for households choosing one brand).

**Purchase frequencies.** Deterministic methods (correspondence analysis, CGS scaling, pick-any procedures) analyse residuals from a main-effects model, removing market shares from the analysis. Probabilistic: SCULPTRE (ultrametric tree; Ramaswamy & DeSarbo 1990) and Choice Map (Elrod 1988a,b: vector or ideal-point, multivariate normal heterogeneity in one or two dimensions, numerical integration).

**Disaggregate panel data.** Chintagunta (1994): latent class with brand intercepts constrained to a low-dimensional subspace; approximates heterogeneity by a few points (2, 3 or 5 points for 1, 2, 3 dimensions) - a coarse approximation (Laird 1978; Heckman & Singer 1984 on weak recovery of mixing distributions).

> [!theorem] Dimensionality condition for vector or ideal-point maps
> A vector/ideal-point model can represent every purchase-probability vector only if the dimensionality of the space is at least one fewer than the number of brands ($J-1$). A market with only eight brands needs a seven-dimensional space, hard to estimate and to portray.
> ^thm-dimension-condition

**The key idea of the paper:** use a factor-analytic structure so a few common factors generate market structure while a $J$-dimensional covariance remains, with brand-specific unique factors (so every purchase-probability vector has positive probability).

## Examples

> [!example] Why a "few-dimension" map can still be rich
> **Setup.** Eight brands. A spatial map restricted to $M=2$ dimensions with $\kappa=0$ asserts zero probability of preference vectors outside the 2-D subspace.
> **Solution.** Adding unique variance $\kappa I$ gives $\Sigma=LL'+\kappa I$ with positive density on all $J$ dimensions, while structure stays in the loadings $L$.
> **Interpretation.** The probit model keeps interpretability of low dimensions without asserting impossible preference vectors.

## Connections

[[Discrete Choice Models]] · [[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]]

## See Also

[[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]]
