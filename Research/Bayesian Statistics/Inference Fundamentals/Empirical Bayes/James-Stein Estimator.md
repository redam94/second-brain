---
title: James-Stein Estimator
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/theorem
  - doc/textbook
source: "[[raw/Efron - Empirical Bayes and the James-Stein Estimator (LSI Ch1).pdf]]"
source_location: "Ch. 1, pp. 4-7"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Inference Fundamentals/Empirical Bayes"
doc_type: textbook
depends_on:
  - "[[Empirical Bayes - Overview]]"
  - "[[Robbins Formula and Poisson Empirical Bayes]]"
used_by:
  - "[[Stein's Paradox and Risk Dominance]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - James-Stein
  - James-Stein Estimator
  - JS Estimator
  - Shrinkage Estimator
---

# James-Stein Estimator

> [!summary]
> The **James-Stein (JS) estimator** shrinks the vector of observed values $\boldsymbol{z}$ toward a center by an empirically estimated factor: $\hat\mu^{(JS)} = \left(1 - \frac{N-2}{S}\right)\boldsymbol{z}$ with $S=\|\boldsymbol{z}\|^2$. It is exactly the Bayes estimator $\hat\mu^{(Bayes)} = (1 - \tfrac{1}{A+1})\boldsymbol{z}$ with the **unknown** shrinkage term $1/(A+1)$ replaced by its unbiased estimate $(N-2)/S$ formed from the marginal distribution. The general "shrink toward the grand mean" form pulls each $z_i$ toward $\bar z$. This is empirical Bayes in action: the prior is estimated from the $N$ parallel cases.

## Overview

Consider $N$ parallel normal estimation problems (Efron eq. 1.7):
$$\mu_i \sim \mathcal{N}(0,A) \quad \text{and} \quad z_i \mid \mu_i \sim \mathcal{N}(\mu_i, 1), \qquad i = 1,\dots,N,$$
with total squared-error loss $L(\boldsymbol{\mu},\hat{\boldsymbol{\mu}}) = \|\hat{\boldsymbol{\mu}}-\boldsymbol{\mu}\|^2 = \sum_{i=1}^N (\hat\mu_i - \mu_i)^2$ and risk $R(\boldsymbol{\mu}) = E_{\boldsymbol{\mu}}\{L\}$.

The obvious estimator — used implicitly in every regression and ANOVA — is the **MLE** $\hat{\boldsymbol{\mu}}^{(MLE)} = \boldsymbol{z}$, with constant risk $R^{(MLE)}(\boldsymbol{\mu}) = N$ for every $\boldsymbol{\mu}$. If the prior were known, Bayes rule (eq. 1.10) gives posterior $\boldsymbol{\mu}\mid\boldsymbol{z} \sim \mathcal{N}_N(B\boldsymbol{z}, BI)$ with $B = A/(A+1)$, and the Bayes estimator (eq. 1.16) is
$$\hat{\boldsymbol{\mu}}^{(Bayes)} = B\boldsymbol{z} = \left(1 - \frac{1}{A+1}\right)\boldsymbol{z}.$$
With $A=1$ this shrinks the MLE **halfway** toward $\mathbf{0}$. But if $A$ is unknown we cannot use it — this is precisely where empirical Bayes enters (see [[Empirical Bayes - Overview]]).

## Main Content

> [!definition] Estimating the shrinkage factor from the marginal ^marginal-estimate
> Integrating the prior out, the marginal distribution of $\boldsymbol{z}$ (eq. 1.20) is
> $$\boldsymbol{z} \sim \mathcal{N}_N(\mathbf{0}, (A+1)I).$$
> Hence $S = \|\boldsymbol{z}\|^2 \sim (A+1)\chi^2_N$, which yields the key unbiased estimate of the shrinkage term:
> $$E\left\{\frac{N-2}{S}\right\} = \frac{1}{A+1}.$$
> The unknown Bayes quantity $1/(A+1)$ is thus estimable directly from the pooled data — see [[Robbins Formula and Poisson Empirical Bayes]] for the analogous nonparametric move.

> [!theorem] James-Stein estimator (shrink toward 0) ^js-estimator
> Substituting the unbiased estimate $(N-2)/S$ for $1/(A+1)$ in the Bayes rule gives the **James-Stein estimator** (Efron eq. 1.23):
> $$\hat{\boldsymbol{\mu}}^{(JS)} = \left(1 - \frac{N-2}{S}\right)\boldsymbol{z}, \qquad S = \|\boldsymbol{z}\|^2 = \sum_{i=1}^N z_i^2.$$
> The name "empirical Bayes" is apt: the Bayes estimator (1.16) is itself **empirically estimated from the data**. This is only possible because $N$ similar problems $z_i \sim \mathcal{N}(\mu_i,1)$ are under simultaneous consideration.

> [!theorem] James-Stein estimator (shrink toward the grand mean) ^js-grand-mean
> We need not shrink toward $0$. Starting from the more general prior $\mu_i \overset{ind}{\sim} \mathcal{N}(M, A)$, $z_i \mid \mu_i \overset{ind}{\sim} \mathcal{N}(\mu_i, \sigma_0^2)$ (eq. 1.32), the Bayes rule $\hat\mu_i^{(Bayes)} = M + B(z_i - M)$ with $B = A/(A+\sigma_0^2)$ has empirical Bayes form (eq. 1.35):
> $$\hat\mu_i^{(JS)} = \bar z + \left(1 - \frac{(N-3)\sigma_0^2}{S}\right)(z_i - \bar z),$$
> with $\bar z = \sum z_i / N$ and $S = \sum (z_i - \bar z)^2$. Each $z_i$ is **pulled toward the grand mean $\bar z$** by a data-estimated factor; the risk-dominance theorem holds now for $N \geq 4$ (one degree of freedom is spent estimating $\bar z$).

> [!definition] Overall Bayes risk and the modest EB penalty ^js-risk
> The overall Bayes risk of $\hat{\boldsymbol{\mu}}^{(Bayes)}$ is $R_A^{(Bayes)} = N\,A/(A+1)$, versus $R_A^{(MLE)} = N$. The James-Stein estimator pays only a small penalty for not knowing $A$ (eqs. 1.24-1.25):
> $$R_A^{(JS)} = N\frac{A}{A+1} + \frac{2}{A+1}, \qquad \frac{R_A^{(JS)}}{R_A^{(Bayes)}} = 1 + \frac{2}{N\cdot A}.$$
> For $N = 10$, $A = 1$, $R_A^{(JS)}$ is only **20% greater** than the true Bayes risk — almost all the Bayesian savings are recovered without knowing the prior.

> [!definition] Limited-translation compromise ^limited-translation
> To protect genuinely unusual cases from being over-shrunk, Efron's **limited-translation estimator** $\hat\mu_i^{(D)}$ (eq. 1.37) follows the JS estimate but never deviates more than $D\sigma_0$ from $z_i$:
> $$\hat\mu_i^{(D)} = \begin{cases} \max\!\left(\hat\mu_i^{(JS)},\ \hat\mu_i^{(MLE)} - D\sigma_0\right) & \text{for } z_i > \bar z,\\[4pt] \min\!\left(\hat\mu_i^{(JS)},\ \hat\mu_i^{(MLE)} + D\sigma_0\right) & \text{for } z_i \leq \bar z. \end{cases}$$
> Taking $D=1$ in the baseball data costs only ~10% of the overall JS advantage while sharply limiting damage to outliers like Clemente.

## Examples

> [!example] Baseball batting averages (Efron Table 1.1, $N = 18$)
> Early-1970-season batting averages $z_i = \hat\mu_i^{(MLE)}$ (hits/45 at-bats) predict true season averages $\mu_i$. With grand average $\bar z = 0.265$ and $\sigma_0^2 = \bar z(1-\bar z)/45$ (binomial variance), the JS estimates (1.35) shrink each player toward $0.265$:
>
> | Player | hits/AB | $\hat\mu^{(MLE)}=z_i$ | true $\mu_i$ | $\hat\mu^{(JS)}$ |
> |---|---|---|---|---|
> | Clemente | 18/45 | .400 | .346 | .294 |
> | F. Robinson | 17/45 | .378 | .298 | .289 |
> | Munson | 8/45 | .178 | .316 | .247 |
> | Alvis | 7/45 | .156 | .200 | .242 |
> | **Grand Average** | | **.265** | **.265** | **.265** |
>
> The ratio of total prediction errors is
> $$\frac{\sum_1^{18}(\hat\mu_i^{(JS)}-\mu_i)^2}{\sum_1^{18}(\hat\mu_i^{(MLE)}-\mu_i)^2} = 0.28,$$
> a roughly **3.5x** accuracy gain for the empirical Bayes estimates. (The $z_i$ are binomial here, violating the exact normal theorem conditions, but the JS effect is quite insensitive to the model.)

> [!example] Regression-based shrinkage (kidney data)
> Combining covariate information with shrinkage (eq. 1.39), JS shrinks toward a fitted **regression line** $\hat\mu_i^{(reg)} = \hat M_0 + \hat M_1\cdot\text{age}_i$ rather than toward $\bar z$:
> $$\hat\mu_i^{(JS)} = \hat\mu_i^{(reg)} + \left(1 - \frac{(N-4)\sigma_0^2}{S}\right)(z_i - \hat\mu_i^{(reg)}), \quad S = \sum(z_i - \hat\mu_i^{(reg)})^2.$$
> See [[Empirical Bayes Interpretation of Shrinkage]].

## Connections

- [[Empirical Bayes - Overview]] — places JS in the broader EB program.
- [[Robbins Formula and Poisson Empirical Bayes]] — the nonparametric sibling; both estimate the prior from the marginal.
- [[Stein's Paradox and Risk Dominance]] — the proof that JS dominates the MLE for $N \geq 3$.
- [[Empirical Bayes Interpretation of Shrinkage]] — why "$(N-2)/S$" *is* an estimated prior; link to hierarchical Bayes.
- [[Partial Pooling as Multiple Comparisons Correction]] — shrinkage toward $\bar z$ as partial pooling.
- [[Hierarchical Models]] — the fully Bayesian generalization.

## See Also

- [[Multiple Comparisons - Bayesian Perspective]]
- [[Overfitting and Information Criteria]]
- [[_Index]]
