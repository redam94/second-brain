---
title: "Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/concept
  - doc/paper
source: "[[raw/Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros.pdf]]"
source_location: "Sec. 3.1, 5, 6, pp. 3-4 and 14-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Tsagris 2018 - Dirichlet Regression with Zeros"
doc_type: paper
depends_on:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]]"
used_by:
  - "[[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]"
aliases:
  - limitations of Dirichlet regression
  - Dirichlet negative correlation limitation
  - compositional zeros rounded versus structural
---

# Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives

> [!summary]
> The authors' answer to "should zeros be treated as rounded and imputed, or naturally?" is naturally: imputing changes every other component of the vector. Limitations: the Dirichlet allows only negative correlations, cannot capture curvature without covariates, is not in the linear exponential family, and ZADR assumes common parameters across zero patterns. A Bayesian version is left as future work.

## Overview

Sec. 5 compares ZADR with alternatives; Sec. 6 concludes.

## Main Content

**Assumption of common parameters.** With $D$ components there are $\sum_{i=1}^{D-1}\binom{D}{i}$ possible zero patterns. Separate coefficients per pattern would need many observations in each, and parameter count grows quickly; hence the shared-parameter assumption is "rather necessary". Linking covariates to the zero-pattern probabilities $\theta_b$ is also impractical. Usually some patterns recur.

**Dirichlet limitations.**
- Covariance matrix allows only negative correlations (like multinomial logit).
- With no covariates the Dirichlet cannot capture the curvature of the simplex (Aitchison 2003, p. 59): a straight line in $\mathbb R^2$ maps to a curve in $S^2$; the logistic-normal can, the Dirichlet only linear relationships. With covariates and the multivariate logit link (1) this is less of a problem, and Campbell and Mosimann (1987) found Dirichlet regression to work well; see also Maier (2014), Gueorguieva et al. (2008).
- Not a linear exponential family (Gourieroux et al. 1984): only correct specification gives consistency; the extra assumption that zero-containing vectors share the full Dirichlet's parameters is not proved.

**Compared with alternatives.** Bear and Billheimer (2015) log-ratio mixture requires a component never zero; Scealy and Welsh (2011) is harder to fit and interpret; inflated beta (Ospina and Ferrari 2010) is unrelated to the conditional Dirichlet; a vector of all zeros or an all-ones vector is not allowed (point mass on 1 can be handled by a separate point mass).

**Reading the conclusions.** For the first two real examples Aitchison is slightly better; for the other two simple ZADR is slightly or much better; in simulation with injected zeros simple ZADR performs better.

## Examples

> [!example] Deciding between imputation and ZADR in practice
> If zeros arise from a detection limit and are few (Tellus: 1.1%), imputation is harmless (Greenacre et al.). If zeros are structural (competitor absent) or frequent, use a zero-pattern model such as ZADR, or amalgamate; check sensitivity to the imputation constant.
^ex-decision

## Connections

[[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]], [[Greenacre 2023 - Compositional Outcome Models in PyMC]]. For counts with zero shares allowed, Dirichlet-multinomial (see the PyMC note) sidesteps the problem because zero counts have positive probability.

## See Also

[[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]
