---
title: "Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data"
tags:
  - source/ingested
  - topic/latent-traits
  - type/example
  - doc/paper
source: "[[raw/Elrod and Keane 1995 - A Factor-Analytic Probit Model for Market Structure in Panel Data.pdf]]"
source_location: "Empirical assessment through Conclusions, pp. 7-13 (Tables 2-3, Fig. 1, Eqs. 9-17)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Elrod and Keane 1995 - Factor-Analytic Probit Market Structure"
doc_type: paper
depends_on:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]]"
  - "[[Elrod and Keane 1995 - Simulated Moments and Panel Estimation]]"
used_by:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview]]"
aliases:
  - detergent market structure comparison
  - Elrod Winer detergent data
---

# Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data

> [!summary]
> Eight detergent brands, 100 households, two six-month periods (607 and 592 units). The two-factor probit outperforms all alternatives on holdout log-likelihood, three of five estimation-data criteria and face validity (recovering the liquid vs powder split, chance probability 2/162 = 0.0123; the Choice Map models also attain the split), while the equisimilar probit and the Dirichlet-multinomial - the structureless models - do about equally. Conclusion: market structure is genuinely present and only the probit model recovers it.

## Overview

**Data** (from Elrod & Winer 1991): count of purchases of each of eight laundry-detergent brands by each of 100 households in each of two six-month periods; 607 units in period 1 and 592 in period 2. Brand names are masked (L1, L3, L4, L6 are liquids; P2, P5, P7, P8 are powders - pseudonyms; the data provider's key identified liquid vs powder). Order of purchases, prices and attributes are not recorded.

**Models compared:** factor-analytic probit (FAP, $M=2$); Dirichlet-multinomial (DM); equisimilar probit (EP); SCULPTRE (ultrametric tree); Chintagunta's latent class map (LC with 3, 5, 7, 8, 9, 10 segments); Choice Map ideal-point (CM-IP) and vector (CM-V) versions. Choice Map assumes iid double-exponential errors and $\kappa=0$ (no brand-specific factors).

## Main Content

### Estimation notes

Probit models by simulated moments (FORTRAN mainframe program). Latent class: 50 random starts per segment count; sensitivity to starts increases with segment count; unconstrained fits for 5+ segments drifted to infinite parameters, so each segment was constrained to buy each brand with probability at least $10^{-12}$ (binding for 5+ segments); the ten-segment best solution was worse than the nine-segment one, an 11-segment fit simply split a segment. Choice Map also 50 starts; local optima were problematic.

### Table 2 - probit parameter estimates (standard errors)

> [!example] Table 2
> | Brand | FAP $l_1$ | FAP $l_2$ | Equisimilar $\alpha$ |
> |---|---|---|---|
> | L1 | -.134 (.133) | .000 | .015 (.143) |
> | P2 | .052 (.168) | -.259 (.199) | -.474 (.176) |
> | L3 | -.082 (.247) | -.091 (.195) | -.516 (.197) |
> | L4 | -.106 (.136) | -.062 (.053) | -.226 (.156) |
> | P5 | .142 (.129) | .035 (.079) | .426 (.136) |
> | L6 | -.158 (.137) | -.043 (.058) | -.142 (.151) |
> | P7 | .053 (.108) | -.043 (.048) | -.081 (.148) |
> | P8 | .000 | .000 | .000 |
> | $c$ (mean importance) | .062 (.122) | .316 (.116) | |
> | $\kappa$ | 2.220 (.701) | | 4.884 (1.060) |
> Constrained parameters (identification) are zero without standard errors. The $\kappa$ parameter is highly significant in both. It is smaller for FAP than for the equisimilar model, as expected, since common factors absorb some heterogeneity. Single-parameter significance tests are not meaningful in factor analysis, with the exception of $\kappa$.
> ^tab-fap-estimates

**Fig. 1 (map).** Brand loadings on the two factors, mean-centred, with the mean importance vector. The liquids (L) and powders (P) separate roughly along the horizontal axis, and the near-orthogonality of the mean vector to the liquid-powder dimension supports the need for two dimensions; the vertical axis is not interpretable from the data but relates strongly to the mean importance vector (maybe how established the brands are).

### Predictive validity (Eqs. 9-13)

For a household with purchase probabilities $p_i$, the multinomial likelihood of holdout frequencies $y^\#_i=(y^\#_{i1..iJ})$ with $T^\#_i=\sum_jy^\#_{ij}$ is
$$
\Pr(y_i^\#\mid p_i)=\frac{T_i^{\#}!}{\prod_jy^{\#}_{ij}!}\prod_jp_{ij}^{y^{\#}_{ij}},\qquad\exp[L^\#(\hat\theta)]=\prod_{i=1}^N\int\Pr(y_i^\#\mid p)f(p;\hat\theta)\,dp.
$$
All models differ only in the heterogeneity distribution $f(\cdot)$. Models were estimated on period 1 and scored on period 2. Also a weighted squared error $\text{MSE}_d=\sum_i\sum_jT_i^\#(p^\#_{ij}-\hat p_{ij})^2$ with $\hat p_{ij}=E[p_j\mid y_i,\hat\theta]$ (Eqs. 11-12), preferred over the unweighted frequency version (Eq. 13, used in Ramaswamy & DeSarbo's 1988 working paper) which gives too much weight to households that purchase many units - explaining why SCULPTRE appeared to beat DM there.

### Goodness of fit and penalised criteria (Eqs. 14-17)

$\text{AIC}=-2L(\hat\theta)+2k$; $\text{HQ}=-2L(\hat\theta)+2k\ln[\ln N]$; $\text{BIC}=-2L(\hat\theta)+k\ln N$; $\text{CAIC}=-2L(\hat\theta)+k(\ln N+1)$. The paper prefers HQ (dimension-consistent but not over-penalising): HQ correlates .90 with the holdout log-likelihood; AIC .89; BIC .87; CAIC .84; estimation-data log-likelihood .83. $N$ is the number of households (100); larger $N$ reduces the correlations with holdout log-likelihood.

> [!example] Table 3 - summary of results (qualitative reading)
> Parameter counts: FAP 16, DM 8, EP 8, SCULPTRE more than 17 (47 upper bound; 17 used), LC with 10/9/8/7 segments 40/37/34/31, LC5 25, LC3 19, Choice Map ideal-point 18, Choice Map vector 15.
> - On **holdout log-likelihood**, FAP is best of all models, including the two structureless ones (DM, EP); SCULPTRE beats all Choice Map and latent class models; latent class with 3 or 5 segments did worst; maps with 7+ segments did better than the two Choice Map models.
> - The first group of models (FAP, DM, EP, SCULPTRE, high-segment LC) fit the **estimation data** better than the rest, but they have many more parameters. Of the five goodness-of-fit measures, FAP is preferred on three (HQ, AIC and log-likelihood-based) and the structureless models on BIC and CAIC.
> - **MSE$_d$**: FAP is marginally outperformed by DM and EP but still beats all market-structure alternatives.
> - Because the structureless models perform comparably in fit but FAP wins on predictive likelihood, the conclusion is that FAP recovers real structure. Standardised exact values are in Table 3 of the original (not transcribed here because the scan is illegible at the resolution used).
> ^tab-fit-summary

### Face validity

Elrod & Winer (1991) hypothesised a priori that detergents would show loyalty to product form (liquid vs powder). A program searched, for each spatial model, the partitioning of the eight brands into two groups that minimised within-group variance, and counted the minimum number of brand reassignments needed to reach the liquid-powder split. FAP attained the distinction exactly (as did the Choice Map models); every other market structure method misassigned at least one brand. Of the 162 different ways of partitioning eight brands into two groups that the paper considers, only two are consistent with the hypothesis, so the probability of a partition occurring by chance is 2/162 = .0123. It is possible that the hypothesised split is wrong, but then the models that disagree would also have to agree among themselves on an alternative partitioning, which they do not.

### Conclusions and speculation

- FAP is the only model that outperforms structureless models on predictive validity or goodness of fit; it is the only successful market-structure model among those considered.
- The three best models (DM, EP, FAP) allow positive probability for every purchase probability vector; the others restrict the set of vectors (SCULPTRE assumes as many distinct vectors as segments; Choice Map restricts to a two-dimensional subspace; latent class imposes both restrictions) - these restrictions are not supported by the data.
- Parametric heterogeneity is not a fundamental flaw: the three best are parametric. Probit tests for structure (comparing FAP with EP) can be used even when other effects (history, exogenous variables, autocorrelation, household characteristics) are in the model, which the Dirichlet-multinomial cannot do.

## Examples

> [!example] The face-validity null probability
> **Setup.** The a priori hypothesis (loyalty to product form) implies a specific 2-group split of eight brands; the paper considers 162 possible two-group partitions of which two agree with it.
> **Solution.** Chance probability $=2/162=0.0123$.
> **Interpretation.** A map matching the hypothesised split is unlikely by luck, giving a computable null probability for a qualitative validation (as a model-free benchmark).
> ^ex-face-validity

## Connections

- Compare the holdout-likelihood protocol with [[Posterior Predictive Checking]] and the cross-validated lpd of [[Paun 2018 - Evaluation Protocol and Results Tables]].
- Market structure concepts: [[Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)]].

## See Also

[[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview]]
