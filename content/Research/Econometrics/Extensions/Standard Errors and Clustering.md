---
title: Standard Errors and Clustering
aliases:
  - Nonstandard Standard Errors
  - Clustering
  - Moulton Factor
  - Robust Standard Errors
tags:
  - source/ingested
  - topic/econometrics
  - topic/inference
  - topic/standard-errors
  - type/concept
  - doc/textbook
source: "[[raw/Mostly Harmless Econometrics.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-07-13
folder: "Econometrics/Extensions"
doc_type: concept
source_location: "MHE Ch. 8, pp. 221-243"
depends_on:
  - "[[Regression and the CEF]]"
  - "[[Differences-in-Differences]]"
  - "[[Research Questions in Econometrics]]"
used_by:
  - "[[Mostly Harmless Econometrics - Overview]]"
  - "[[Activity Bias in Advertising]]"
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
---

# Standard Errors and Clustering

> [!summary]
> Getting the standard errors right is crucial for valid inference. Key issues include heteroskedasticity, clustering, serial correlation in panels, and finite-sample bias of robust standard errors.

## Robust Standard Errors

Heteroskedasticity-consistent (Eicker-White) standard errors:
- Valid under minimal assumptions
- Should be the **default** in applied work
- If robust and conventional SEs differ by more than ~30%, investigate why

## The Clustering Problem

When errors are correlated within groups (states, schools, firms), ignoring clustering **understates** standard errors, often dramatically.

### The Moulton Factor

For a group-level regressor with $n$ observations per group:
$$
\text{Moulton factor} \approx \sqrt{1 + (n-1)\rho}
$$

where $\rho$ is the intraclass correlation. With $n=100$ and $\rho=0.1$, standard errors are understated by a factor of ~3.3.

> [!warning] The Moulton Problem in DD
> Regression-DD models with state-level treatment and individual-level data are especially vulnerable. Always cluster standard errors at the level of treatment assignment.

## Serial Correlation in Panels

In DD models with many time periods, serial correlation in the error inflates standard errors beyond what simple clustering handles. Solutions:
- Cluster at the state (group) level
- Aggregate to the state-year level before estimation
- Use parametric corrections for AR(1) errors

## Fewer than 42 Clusters

With few clusters, cluster-robust standard errors are biased downward. Remedies:
- Wild cluster bootstrap
- Effective degrees of freedom corrections
- Aggregation to cluster means

## Finite-Sample Bias of Robust SEs

Robust standard errors can be biased in small samples — they tend to be **too small** when there are leverage points. The bias depends on the leverages $h_{ii} = X_i(X'X)^{-1}X_i'$ and is worse with unbalanced designs.

## See Also

- [[Regression and the CEF]]
- [[Differences-in-Differences]]
- [[Mostly Harmless Econometrics - Overview]]
- [[Hierarchical Linear Models]] — Bayesian multilevel approach to clustered data and group-level variation
- [[Simultaneous Inference via Multiplier Bootstrap]] — the multiplier (wild) bootstrap for uniform inference in staggered DiD; directly extends the cluster bootstrap to the group-time ATT setting
- [[Identifying Assumptions for Staggered DiD]] — staggered treatment adoption is the canonical context where ignoring clustering in DiD is most harmful
- [[Bayesian Difference in Differences]] — Bayesian approach to DiD; proper posterior inference automatically propagates group-level uncertainty that cluster-robust SEs address in the frequentist setting
- [[Interference and Marketplace Experiments]] — randomization unit versus analysis unit
