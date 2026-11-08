---
title: "Silverman 2020 - Existence, Identifiability and Empty Overlaps"
tags:
  - source/ingested
  - topic/population-estimation
  - type/theorem
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 4.4 and Sec. 6.2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]"
used_by:
  - "[[Silverman 2020 - Bayesian-Threshold Method]]"
aliases:
  - extended maximum likelihood MSE
  - non-overlapping lists posterior at minus infinity
---

# Silverman 2020 - Existence, Identifiability and Empty Overlaps

> [!summary]
> When two lists share no cases, the interaction $\beta_{12}$ has a likelihood maximised at $-\infty$ (an extended MLE) and, with an improper uniform prior, a posterior that is an atom at $-\infty$. The consequence is that all cells containing both lists have Poisson mean zero, and the remaining parameters can be fitted by deleting those cells. Standard likelihood theory (and AIC/BIC justification) breaks down.

## Overview

All three modern-slavery data sets have zero cells. Section 4.4 reviews three kinds of estimability problem following Fienberg and Rinaldo (2012a,b) and Chan, Silverman and Vincent (2019, arXiv:1902.05156). Section 6.2 gives the Bayesian derivation.

## Main Content

**Three problems (Sec. 4.4).**
1. *Extended MLE.* The likelihood is maximised only as one or more parameters go to $-\infty$. This gives a bona fide estimate (possibly zero) of each $\lambda_A$ (Fienberg and Rinaldo's extended MLE). `Rcapture` handles it unsatisfactorily by returning large negative $\beta_{ij}$. The log likelihood can no longer be expanded quadratically around the maximum, so standard theory, including the justification for information criteria, breaks down (Chan et al. 2019 illustrate with a small simulation).
2. *Non-existence of the extended MLE.* May appear as an infinite or very large dark-figure estimate. Can be checked by a linear programme (Fienberg and Rinaldo 2012b; specialised in Chan et al. 2019).
3. *Non-identifiability of maximising parameters.* Check by the rank of a particular model matrix. Chan et al. (2019) give an efficient algorithm that shows whether any choice of the interaction set would fail either check.

For all data sets in the paper every model passes the checks, so the observed instabilities are **not** due to these problems.

> [!theorem] Empty-overlap posterior (Sec. 6.2)
> Suppose lists 1 and 2 have no case in common, so $N_A=0$ for every $A\supseteq\{1,2\}$. For such $B$ write $\lambda_B=C_B\exp(\beta_{12})$ where $C_B>0$ depends only on the other parameters. The conditional log likelihood of $\beta_{12}$ is
> $$\log L(\beta_{12}\mid\text{rest})=-C\,e^{\beta_{12}},\quad C=\sum_{B\supseteq\{1,2\}}C_B>0,$$
> maximised as $\beta_{12}\to-\infty$ whatever $C$ is. With an improper uniform prior, the posterior density is proportional to $\exp(-Ce^{\beta})$, which is not integrable at $-\infty$ (for every $y$, $P(\beta_{12}>y)/P(\beta_{12}\le y)=0$): the posterior is a point mass at $\beta_{12}=-\infty$ with probability 1. This holds conditional on all other parameters, hence unconditionally. Each $N_B$ with $B\supseteq\{1,2\}$ is then Poisson(0), the constant zero, and the other parameters are fitted by omitting these cells.
^thm-empty-overlap-minus-infinity

**Worked consequence for the UK data (6 lists, 63 observable cells).** LA and GP have no overlap: drop the 16 cells containing both, leaving 47 observations and 21 parameters. LA and NCA also have no overlap: drop their cells, leaving 39 observations and 20 parameters. The `modslavmse` routine `removeemptyoverlaps` (called from `MCMCfit`) does this and lists the interactions fixed at $-\infty$. In New Orleans (five lists) three of ten pairwise overlaps are empty; with eight lists, 18 of 28.

> [!remark] Why a proper prior avoids the issue
> "A proper Bayesian approach will avoid the issues considered in Section 4.4 because there will necessarily be a well-defined posterior distribution for the parameters." A Gaussian prior with variance $1/\lambda>0$ on $\beta_{ij}$ gives finite estimates even for empty overlaps; the cost is prior sensitivity ([[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]).

## Examples

> [!example] Cell counting for empty overlaps
> $K=6$ lists: 63 observable cells. Cells containing both of two given lists: $2^{4}=16$ (the other four lists are free), matching the 16 cells dropped for LA-GP. After also dropping the LA-NCA cells that survive: $47-8=39$ (the LA-NCA cells not already removed number $2^4-2^3=8$ since the LA,NCA,GP overlaps were already gone). This arithmetic reproduces the paper's 47 and 39.

## Connections

- Sparsity here is the same phenomenon motivating regularised priors: [[Horseshoe and Regularized Horseshoe Priors]].
- Boundary maxima make information criteria unreliable: [[Silverman 2020 - Frequentist Model Selection Results]].

## See Also

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
- [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]]
