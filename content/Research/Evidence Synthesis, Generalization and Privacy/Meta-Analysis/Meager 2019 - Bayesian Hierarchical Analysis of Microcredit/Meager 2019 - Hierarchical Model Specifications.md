---
title: "Meager 2019 - Hierarchical Model Specifications"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. II.A (pp. 62-67): eq. 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]"
  - "[[Meager 2019 - Studies, Data and Outcomes]]"
used_by:
  - "[[Meager 2019 - Bayesian Estimation, Priors and Computation]]"
  - "[[Meager 2019 - Pooling Factors and Measuring External Validity]]"
  - "[[Meager 2019 - Average Treatment Effects - Results]]"
aliases:
  - "Rubin 1981 hierarchical model for site effects"
  - "Full-data hierarchical models with control means and covariates"
---
# Meager 2019 - Hierarchical Model Specifications

> [!summary]
> Four nested model specifications: the Rubin (1981) model on reported estimates (eq. 1), a full-data model with control means and a correlated bivariate upper level (eq. 2), a fully interacted subgroup model (eq. 3) and a model with site-level covariates (eq. 4). Classical meta-analysis ($\sigma_\tau=0$), no pooling ($\sigma_\tau=\infty$) and full-pooling OLS are special cases; partial pooling shrinks site estimates in inverse proportion to $\sigma_\tau$.

## Overview

The statistical heart of the paper. This note defines each model with every symbol, shows which familiar estimators it nests, and states the exchangeability requirement.

## Main Content

> [!definition] Equation (1) - Rubin (1981) model
> Studies $k=1,\dots,K$ report estimates $\hat\tau_k$ with standard errors $\widehat{se}_k$:
> $$
> \hat\tau_k\sim N\big(\tau_k,\widehat{se}_k^{\,2}\big),\qquad\tau_k\sim N\big(\tau,\sigma_\tau^2\big)\qquad\forall k.
> $$
> $\tau=E[\tau_k]$ is the general (average) effect; $\sigma_\tau^2=\text{var}(\tau_k)$ is genuine heterogeneity; and $\sigma_\tau^2$ also "captures a notion of external validity" as the extent to which any $\tau_k$ predicts any other $\tau_{k'}$. The first line models sampling variation, the second true heterogeneity.

^def-rubin-model

**Why Gaussian.** The link is motivated by RCT estimators being unbiased and asymptotically normal (so it often imposes no more structure than the original inference); it offers lower mean squared error in many cases (Efron and Morris 1977); and Gaussian hierarchical models give reliable inference on the mean and variance even when the true distribution is not Gaussian (McCulloch and Neuhaus 2011).

> [!theorem] Nesting of familiar estimators
> Model (1) nests: **classical meta-analysis** (set $\sigma_\tau^2=0$: all $\tau_k=\tau$; $\hat\tau$ is the inverse-variance-weighted average of the $\hat\tau_k$); the **original individual analyses / no pooling** ($\sigma_\tau^2\to\infty$ returns the original estimates); and intermediate **partial pooling** for finite $\sigma_\tau^2$. *Proof sketch:* with $\sigma_\tau^2=0$ the marginal likelihood is $\hat\tau_k\sim N(\tau,\widehat{se}_k^2)$, whose MLE is the inverse-variance average; with $\sigma_\tau^2\to\infty$ the prior on $\tau_k$ becomes flat so the posterior mean of $\tau_k$ is $\hat\tau_k$.

^thm-nesting

> [!definition] Equation (2) - Full-data joint model (main specification)
> Let $y_{ik}$ be the outcome (e.g. profit) of household $i$ in site $k$ and $T_{ik}\in\{0,1\}$ the treatment indicator:
> $$
> y_{ik}\sim N\big(\mu_k+\tau_kT_{ik},\sigma_{y_k}^2\big)\;\forall i,k,\qquad\begin{pmatrix}\mu_k\\\tau_k\end{pmatrix}\sim N\!\left(\begin{pmatrix}\mu\\\tau\end{pmatrix},V\right),\;V=\begin{pmatrix}\sigma_\mu^2&\sigma_{\tau\mu}\\\sigma_{\tau\mu}&\sigma_\tau^2\end{pmatrix}\;\forall k.
> $$
> Symbols: $\mu_k$ site control mean; $\sigma_{y_k}^2$ site-specific outcome variance; $\mu,\tau$ upper-level means; $V$ upper-level covariance including the covariance $\sigma_{\tau\mu}$ between control means and treatment effects. The Gaussian likelihood is the analogue of the OLS in the original RCTs (the Gaussian kernel is the least-squares objective; MLE point estimates equal OLS, while robust/clustered SEs have no simple likelihood counterpart). The assumption on the outcome data is acknowledged as unrealistic; alternatives are in Meager (2016).

^def-joint-model

Rationale: information in the control means $\{\mu_k\}$ may help if correlated with treatment effects.

> [!definition] Equation (3) - Fully interacted subgroup model
> With $L$ binary household-level covariates $X_{ik}$, the power set of subgroups creates $2^L$ intercepts and $2^L$ slopes. Index subgroups by $\pi(p)$: $\{1,\dots,2^L\}\to\{0,1\}^L$ and write $X_{ik}^{\pi(p)}=\prod_{l}[X_{lik}]^{\mathbf 1\{\pi(p)_l=1\}}$ (the subgroup indicator). Then
> $$
> y_{ik}\sim N\Big(\sum_{p=1}^{2^L}\big[\mu_k^{p}+\tau_k^{p}T_{ik}\big]X_{ik}^{\pi(p)},\sigma_{y_k}^2\Big),\qquad\begin{pmatrix}\mu_k^p\\\tau_k^p\end{pmatrix}\sim N\!\left(\begin{pmatrix}\mu^p\\\tau^p\end{pmatrix},V_p\right),\;V_p=\begin{pmatrix}\sigma_{\mu^p}^2&\sigma_{\tau^p\mu^p}\\\sigma_{\tau^p\mu^p}&\sigma_{\tau^p}^2\end{pmatrix}\;\forall p,k.
> $$
> Tractability is maintained by enforcing independence across the $2^L$ subgroup blocks. It extends one study's subgroup analysis to all studies, testing how general a subgroup effect is, even for covariates the original authors did not report.

^def-interactions-model

> [!definition] Equation (4) - Site-level covariates
> With $M$ site-level covariates $W_k$ (loan size, interest rate, saturation, randomisation unit, ...):
> $$
> y_{ik}\sim N(\mu_k+\tau_kT_{ik},\sigma_{y_k}^2),\qquad\begin{pmatrix}\mu_k\\\tau_k\end{pmatrix}\sim N\!\left(\begin{pmatrix}\mu+W_k\beta_\mu\\\tau+W_k\beta_\tau\end{pmatrix},V\right).
> $$
> $\beta_\tau$ ($M$-vector) captures how $W_k$ predicts $\tau_k$ and $\beta_\mu$ the analogue for $\mu_k$. With $M\ge K$ (as here: at least seven contextual variables for seven studies) the model overfits and may be analytically intractable; the paper uses a ridge approach instead ([[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]]). If the covariates correlated with effects are known, only *conditional* exchangeability is required.

^def-site-covariate-model

### Special cases of model (2)

Pooling all the data in a single OLS with site fixed effects and a common slope $\tau$ (as in Banerjee, Duflo, Goldberg, Karlan, Osei, Parienté, Shapiro et al. 2015) is the special case $\sigma_\tau^2=0$, $\sigma_{\mu\tau}=0$ and no hierarchy on $\mu$. Neither it nor classical inverse-variance meta-analysis estimates heterogeneity or uses it to inform uncertainty on $\tau$ or $\tau_{K+1}$: "These aggregation methods offer no channel through which the data can signal that the studied effects are heterogeneous".

### Pooling and shrinkage

> [!theorem] Partial pooling
> Estimation of $\sigma_\tau^2$ is possible even for small $K$. If $\hat\sigma_\tau^2\approx0$ there is perfect external validity: the hierarchical model pools all data into a single homogeneous effect and *shrinks* $\{\hat\tau_k\}$ toward each other; if $\sigma_\tau^2$ is large, there is no pooling and no shrinkage ($\tau$ becomes uninformative with wide intervals); intermediate values give partial pooling with shrinkage "inversely proportional to the size of $\sigma_\tau^2$" (Rubin 1981). In the conjugate case the posterior mean of $\tau_k$ given $\tau,\sigma_\tau$ is $\omega_k\tau+(1-\omega_k)\hat\tau_k$ with $\omega_k=\widehat{se}_k^2/(\sigma_\tau^2+\widehat{se}_k^2)$ ([[Meager 2019 - Pooling Factors and Measuring External Validity]]).

^thm-partial-pooling

### Exchangeability

> [!definition] Exchangeability requirement
> The treatment effects must be **exchangeable**: their joint distribution is invariant to permutation of the $K$ indices (Diaconis 1977), e.g. researchers have no knowledge of the relative ordering of the effects before seeing the data. Hence external validity can be assessed only for sites that are exchangeable with those studied; $\tau_{K+1}$ applies only to exchangeable sites; and since only RCT data are aggregated, results may not generalise to contexts that could not plausibly have been studied by RCTs. Policymakers must judge whether their context is comparable.

^def-exchangeability

## Examples

*Nesting check.* Take two sites with $\hat\tau=(10,0)$ and $\widehat{se}=(5,5)$. Classical meta-analysis gives $\hat\tau=5$ for both sites; no pooling returns $(10,0)$; with $\sigma_\tau=5$ the weight on the pooled mean is $\omega=25/(25+25)=0.5$, giving posterior-mean site effects $0.5\cdot5+0.5\cdot10=7.5$ and $2.5$ (taking $\tau=5$). Partial pooling lies between the two extremes.

## Connections

- General treatment of hierarchical Bayes in the vault: [[Hierarchical Models]], [[Hierarchical Linear Models]], [[Partial Pooling as Multiple Comparisons Correction]].
- Fixed vs random effects and why random-effects is not always conservative: [[Sterne 2011 - Magnesium Example, Model Choice and Adjustment]].
- Nonparametric identification of the upper-level distribution: [[Andrews Kasy 2019 - Identification Using Meta-Studies]].
- Prior regularisation for MMM coefficients: [[Bayesian Estimation and Priors for MMM]].

### Relevance to marketing measurement

Eq. (4) is the structure of a lift-calibrated MMM: channel effect in market/experiment $k$ drawn from a population with mean depending on covariates (spend level, vertical). Eq. (1) is the minimal "combine geo experiment results" model when only point estimates and SEs are available.

## See Also

- [[Meager 2019 - Bayesian Estimation, Priors and Computation]]
- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Overfitting and Information Criteria]]
- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
