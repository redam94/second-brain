---
title: "Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. V (pp. 80-86): Table 5, Figs 7-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Hierarchical Model Specifications]]"
  - "[[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]"
used_by:
  - "[[Meager 2019 - Conclusion, Limitations and Marketing Analogues]]"
aliases:
  - "Prior business experience subgroup in microcredit"
  - "Ridge regression on site-level covariates"
---
# Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge

> [!summary]
> Household-level: only prior business ownership varies within enough sites. Households with prior businesses show larger but far more heterogeneous effects; without prior businesses the profit effect is almost exactly zero in every site. Site-level: with seven studies and at least seven covariates, a fixed-penalty ridge regression ranks interest rate, loan size and women-targeting above the randomisation unit as predictors of cross-site variation.

## Overview

Section V: interactions model (eq. 3) with the prior-business indicator (V.A, Figs 7-9) and ridge regression on site-level contextual variables (V.B, Table 5, Fig 10).

## Main Content

### V.A Household-level covariates

Loan type and urban vs rural did **not vary within site at all** for five of seven studies; prior business ownership varied within site for all studies except Karlan and Zinman (2011), so it is the natural variable.

> [!definition] Prior-business interactions model
> Fit eq. (3) with a single binary covariate $PB_{ik}=1$ if the household operated a business before any microcredit expansion, enforcing independence in the parent distribution for tractability (two subgroups $\Rightarrow$ $2$ intercepts and $2$ slopes per site).

^def-pb-model

> [!example] Findings (Figs 7-9)
> - Households with $PB_{ik}=1$ exhibit **much more heterogeneity** across sites (Fig 7: posteriors of the general impacts by group; Fig 9: site-level impacts by group; Fig 8: much wider posterior predictive distributions for the $PB=1$ group).
> - Revenues and expenditures rise for both groups (less for those with new businesses), but only prior-business households are likely to make profits; for $PB=0$ the profit effect is "almost exactly zero in every site" (Fig 9 panel A).
> - Interpretation offered: new owners may be less productive, or need learning, experimentation or time; the microfinance contract may discourage risky illiquid investment needed to start businesses; households with existing businesses may use credit for running costs. Endline surveys may be too soon to capture eventual success (long-term follow-up suggested). Consistent with Field et al. (2013): microloans do not reliably stimulate new successful entrepreneurial endeavours.
> - Multi-study analysis tempers subgroup searching: the India RCT (Banerjee et al.) found a large "statistically significant" effect in this subgroup, but across all sites the effect is sometimes negligible and sometimes large and negative; the extra effect for prior-business households is on average much higher, but its predictive distribution is diffuse and includes zero comfortably.

^ex-pb-findings

### V.B Site-level covariates

Heterogeneity across studies may be explained by differences in interest rates, loan sizes, protocols and designs (five studies randomised communities by opening branches, two randomised individuals from an applicant pool with take-up above 80%). With seven studies and at least seven contextual variables, eq. (4) would overfit, so the paper regularises.

> [!definition] Ridge regression on site-level covariates
> Regress the estimated (BHM) treatment effects on the standardised contextual variables $W_k$ with a **fixed** ridge penalty (size $0.1$ in Fig 10; ordering largely invariant over the penalties tested), and interpret **only the rank ordering of coefficient magnitudes**. Equivalent Bayesian version: $\tau_k\sim N(\tau+W_k\beta,\sigma_\tau^2)$ with a tight $N(0,\cdot)$ prior on each element of $\beta$. Variables with the strongest predictive power still get large coefficients despite the penalty (Griffin and Brown 2013). The penalty is fixed because tuning by cross-validation performs poorly with so few data points (online appendix C).

^def-ridge-site

Covariates: the site's control-group mean of the outcome; randomisation unit (individual vs community); MFI targets women; interest rate (APR); microcredit market saturation (0-3); MFI promoted loans publicly; loans collateralised; loan size as % of national income per capita (alternative: % of control mean income, appendix C).

> [!example] Table 5 - Contextual variables (pre-standardisation)
> | Country | Randomisation (1=individual) | Women (1=targets) | APR | Saturation (0-3) | Promotion | Collateral | Loan size (% national income) |
> |---|---|---|---|---|---|---|---|
> | Bosnia | 1 | 0 | 22.0 | 2 | 0 | 1 | 9.0 |
> | Ethiopia | 0 | 0 | 12.0 | 1 | 0 | 0 | 118.0 |
> | India | 0 | 1 | 24.0 | 3 | 0 | 0 | 22.0 |
> | Mexico | 0 | 1 | 100.0 | 2 | 1 | 0 | 6.0 |
> | Mongolia | 0 | 1 | 24.0 | 1 | 0 | 1 | 36.0 |
> | Morocco | 0 | 0 | 13.5 | 0 | 1 | 0 | 21.0 |
> | Philippines | 1 | 0 | 63.0 | 1 | 0 | 0 | 24.1 |
> ^ex-table5

> [!theorem] Findings (Fig 10)
> Economic factors - whether the MFI targets women, charges a high interest rate or makes large loans - are more predictive of differences in effects than the randomisation unit. All three have **negative** correlations with effects: lower interest rates, smaller loans and no gender targeting may be associated with better outcomes, though "no definitive conclusion is possible". Robust to alternative variable definitions; omitting the control mean still leaves economic coefficients larger than the randomisation unit (online appendix, Fig B.2). Market saturation is not among the most predictive, so low saturation is not reliably associated with larger effects; and the two individually randomised studies (take-up above 80%) do not reliably show larger effects. Instead MFIs with lower interest rates that do not target by gender are more reliably associated with somewhat larger effects.

^thm-ridge-findings

## Examples

> [!example] Ridge on Table 5 with hypothetical site effects
> *Setup.* Use the true Table 5 covariates but **hypothetical** site effects $(2,12,5,-4,3,9,-1)$ (the real per-site effects are only plotted). Standardise the seven covariates; fit ridge with penalty $0.1$ and $1.0$.
> *Solution.* With $K=7$ sites and 7 covariates, $Z^\top Z$ has rank $6$ (centring costs one rank), so OLS is not unique but ridge is. With the hypothetical effects the largest coefficients are APR ($-3.55$ at penalty $0.1$; $-3.06$ at 1.0), then randomisation ($-1.57$/$-1.41$), women ($-1.38$/$-1.13$), loan size ($+1.28$/$+1.29$); the ranking of the top variables is stable across penalties.
> *Interpretation.* The snippet shows the mechanics only - ranking by absolute standardised coefficient under a fixed penalty - and says nothing about microcredit.

^ex-ridge-hypothetical

```python
import numpy as np

names = ["randomization(indiv)", "women", "APR", "saturation", "promotion", "collateral", "loan size"]
W = np.array([[1, 0,  22.0, 2, 0, 1,   9.0],   # Bosnia
              [0, 0,  12.0, 1, 0, 0, 118.0],   # Ethiopia
              [0, 1,  24.0, 3, 0, 0,  22.0],   # India
              [0, 1, 100.0, 2, 1, 0,   6.0],   # Mexico
              [0, 1,  24.0, 1, 0, 1,  36.0],   # Mongolia
              [0, 0,  13.5, 0, 1, 0,  21.0],   # Morocco
              [1, 0,  63.0, 1, 0, 0,  24.1]])  # Philippines
tau = np.array([2.0, 12.0, 5.0, -4.0, 3.0, 9.0, -1.0])   # HYPOTHETICAL site effects
Z = (W - W.mean(0)) / W.std(0); y = tau - tau.mean()
for lam in [0.1, 1.0]:
    beta = np.linalg.solve(Z.T @ Z + lam * np.eye(7), Z.T @ y)
    top = np.argsort(-np.abs(beta))[:4]
    print(lam, [(names[i], round(float(beta[i]), 2)) for i in top])
print("rank(Z'Z) =", np.linalg.matrix_rank(Z.T @ Z))
```

## Connections

- Equations (3) and (4): [[Meager 2019 - Hierarchical Model Specifications]].
- Regularisation vs overfitting with few studies: [[Overfitting and Information Criteria]], [[Hierarchical Linear Models]].
- Subgroup searching and forking paths: [[Gelman Loken 2013 - Garden of Forking Paths - Overview]], [[Researcher Degrees of Freedom]].

### Relevance to marketing measurement

Prior-business status is the analogue of a customer/market segment; the lesson is that a segment effect found in one test (here India) may not generalise across tests. Site-level ridge is a template for asking which test attributes (spend level, audience, creative type, geography) predict effect variation when you have only a handful of experiments.

## See Also

- [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]
- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
