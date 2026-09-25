---
title: "Pair-Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas2009-Survey.md]]"
source_location: "Aas et al. (2009) §2–3; Czado (2010) §2–4; Bedford & Cooke (2002)"
date_ingested: 2026-09-25
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - h-function
  - conditional copula
  - vine likelihood
  - sequential MLE vine
  - IFM vine copula
---

# Pair-Copula Construction

> [!summary]
> A pair-copula construction (PCC) computes a $d$-dimensional copula density as an ordered product of bivariate copula densities via the **h-function recursion**: each conditional CDF $F(x_j|\boldsymbol{v})$ is obtained by differentiating the bivariate copula assigned to the edge $\{j, k\}$ in the vine w.r.t. the second argument. The vine likelihood is fully tractable (unlike the factor copula), enabling **sequential maximum likelihood** (tree by tree) or full joint MLE. Model selection applies AIC/BIC to choose both the pair-copula family per edge and (for R-vines) the tree structure.

## Overview

Given a vine structure (the sequence of trees $T_1,\ldots,T_{d-1}$ and the family assigned to each edge), evaluating the joint density and computing likelihood-based estimates requires a systematic recursion. The key operation is computing **pseudo-observations** at higher tree levels from the pair-copulas fit at lower levels. Aas et al. (2009) operationalised this as the h-function, which is the partial derivative of a bivariate copula with respect to one of its arguments.

## Main Content

> [!definition] The h-function
> For a bivariate copula $C(u,v;\boldsymbol{\theta})$ with density $c(u,v;\boldsymbol{\theta}) = \partial^2 C/(\partial u \,\partial v)$, define the **h-function**:
> $$h(u,v;\boldsymbol{\theta}) \;\equiv\; \frac{\partial C(u,v;\boldsymbol{\theta})}{\partial v}$$
> This is the **conditional CDF** of $U$ given $V=v$ in the bivariate copula. Algebraically, $h(u,v;\boldsymbol{\theta}) = F(F^{-1}(u)|F^{-1}(v))$ for continuous marginals. The h-function converts a bivariate copula $c_{ij|\boldsymbol{v}}$ fit at one tree level into the conditional CDF arguments needed for the next tree.
> ^def-hfunc

> [!definition] H-function for standard bivariate families (Aas et al. 2009, Table 1)
>
> | Family | $h(u,v;\boldsymbol{\theta})$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{((\nu+(t_\nu^{-1}(v))^2)(1-\rho^2))/(\nu+1)}}\right)$ |
> | Clayton($\alpha$) | $(1 + \alpha)\,u^{-\alpha-1}\,(u^{-\alpha} + v^{-\alpha} - 1)^{-1-1/\alpha}$ |
> | Gumbel($\alpha$) | $\dfrac{C_{\text{Gum}}(u,v;\alpha)}{v} \cdot \dfrac{(-\ln u)^\alpha + (-\ln v)^\alpha)^{1/\alpha - 1} \cdot (-\ln v)^{\alpha-1}}{-\ln v}$ |
> | Independence | $h(u,v) = u$ |
>
> All h-functions have closed forms for standard bivariate families, making the recursion numerically tractable.
> ^def-hfunctions

> [!definition] The h-function recursion for computing conditional CDFs
> Let the vine ordering be $1,2,\ldots,d$ and the vine a D-vine for concreteness. Then the conditional CDFs needed for pair-copulas at tree $T_j$ are:
> $$F(x_1|x_2) = h(F_1(x_1),\, F_2(x_2);\,\boldsymbol{\theta}_{12})$$
> $$F(x_2|x_3) = h(F_2(x_2),\, F_3(x_3);\,\boldsymbol{\theta}_{23})$$
> $$F(x_1|x_2,x_3) = h(F(x_1|x_2),\, F(x_3|x_2);\,\boldsymbol{\theta}_{13|2})$$
> And in general, for any edge $e = \{a,b|D(e)\}$ in tree $T_j$:
> $$F(x_a|\boldsymbol{x}_{D(e)}) = h(F(x_a|\boldsymbol{x}_{D(e)\setminus\{k\}}),\, F(x_k|\boldsymbol{x}_{D(e)\setminus\{k\}});\,\boldsymbol{\theta}_{ak|D(e)\setminus\{k\}})$$
> where $k$ is the **conditioning variable added** at tree $T_{j-1}$ (which is well-defined under the proximity condition). This recursion proceeds upward through the vine tree by tree.
> ^def-hrecursion

> [!definition] Vine copula likelihood
> Given pseudo-observations $\{u_{ti} = \hat{F}_i(x_{ti})\}_{t=1,\ldots,T;\, i=1,\ldots,d}$ and a vine $\mathcal{V}$ with pair-copulas $\{c_e(\cdot,\cdot;\boldsymbol{\theta}_e)\}_{e \in \bigcup_j E_j}$, the **log-likelihood** is
> $$\ell(\boldsymbol{\Theta}) = \sum_{t=1}^T \sum_{j=1}^{d-1} \sum_{e \in E_j} \ln c_e\!\left(F(x_{t,a(e)}|\boldsymbol{x}_{t,D(e)}),\; F(x_{t,b(e)}|\boldsymbol{x}_{t,D(e)});\;\boldsymbol{\theta}_e\right)$$
> The conditional CDF arguments are computed via the h-function recursion, starting from the empirical/fitted marginals at $T_1$.
> ^def-likelihood

> [!definition] Sequential MLE / IFM estimator (Aas et al. 2009 §3.1)
> The **inference-functions-for-margins (IFM)** estimator proceeds tree by tree:
> 1. **Marginals**: estimate/fit $\hat{F}_i$ for $i=1,\ldots,d$; transform to pseudo-observations $\hat{u}_{ti}$.
> 2. **Tree $T_1$**: for each edge $e_1 = \{i,j\} \in E_1$, maximise $\sum_t \ln c_{e_1}(\hat{u}_{ti},\hat{u}_{tj};\boldsymbol{\theta}_{e_1})$ to get $\hat{\boldsymbol{\theta}}_{e_1}$; then compute h-function values $\hat{v}_{t,e_1} = h(\hat{u}_{ti}, \hat{u}_{tj}; \hat{\boldsymbol{\theta}}_{e_1})$ for use in $T_2$.
> 3. **Tree $T_2$**: for each edge $e_2 = \{i,k|j\} \in E_2$, maximise the pair-copula log-likelihood using the h-function values from step 2; compute further h-function values.
> 4. Continue through $T_{d-1}$.
>
> **Properties**: consistent for correctly-specified models; more efficient than independence (naive) estimators; full joint MLE is more efficient but requires iterating through the entire vine repeatedly.
> ^def-seqmle

> [!definition] Bivariate pair-copula family selection
> For each edge $e$, the pair-copula family is chosen by:
> - **Information criteria**: fit Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, Independence, and rotated variants (180°, 90°, 270° rotations for asymmetric families); select by AIC or BIC.
> - **Tail dependence diagnostics**: compute empirical quantile dependence $\hat{\lambda}(q) = \hat{P}(U_1 > q | U_2 > q)$ from the pseudo-observations and compare to theoretical values for each family.
> - **Independence test**: if the Kendall $\hat{\tau}$ is not significantly different from zero, assign the independence copula (no parameters, no contribution to likelihood).
> This per-edge selection means different variable pairs can have very different dependence structures, which is the vine's key advantage over parametric multivariate families.
> ^def-selection

## Examples

> [!example] H-function computation for Gaussian pair-copula
> **Setup**: Pair $(X_1, X_2)$ with estimated Gaussian pair-copula parameter $\hat\rho = 0.6$; pseudo-observation $(u_1, u_2) = (0.7, 0.4)$.
>
> **Step 1** – compute $F(x_1|x_2)$ for use in the next tree:
> $$h(0.7, 0.4; 0.6) = \Phi\!\left(\frac{\Phi^{-1}(0.7) - 0.6\cdot\Phi^{-1}(0.4)}{\sqrt{1 - 0.6^2}}\right) = \Phi\!\left(\frac{0.524 - 0.6\cdot(-0.253)}{0.800}\right) = \Phi(0.844) \approx 0.800$$
>
> **Interpretation**: The observation $x_1$ at marginal probability 0.70 corresponds to a conditional probability of $\approx 0.80$ given $x_2$ at marginal probability 0.40. This value 0.800 is passed as a pseudo-observation to the copula for the edge $\{1,3|2\}$ in tree $T_2$.

> [!example] Tail dependence from Student-$t$ pair-copula
> **Setup**: Pair $(X_2, X_4|X_1, X_3)$ at tree $T_3$ fitted with a Student-$t$ copula with $\hat\rho = 0.5$ and $\hat\nu = 5$ degrees of freedom.
>
> **Upper tail dependence coefficient** for this pair (not the joint $d$-dimensional tail dependence, which is harder to compute):
> $$\lambda^U = 2\,t_6\!\left(-\sqrt{\frac{6(1-0.5)}{1+0.5}}\right) = 2\,t_6(-\sqrt{2}) = 2\,t_6(-1.414) \approx 2 \times 0.101 = 0.202$$
>
> **Interpretation**: Even after conditioning on two variables, this pair has non-trivial upper tail dependence — crashes in $X_4$ co-occur with crashes in $X_2$ with probability $\approx 0.20$ beyond what the conditioning already removes.
> ^tail-dependence

## Connections

- [[Vine Copulas - Overview]] — the vine tree structure that governs which h-function recursion applies.
- [[Copula Architecture Comparison]] — vine copulas vs. factor copulas: vine uses MLE because the likelihood (this note) is tractable; factor uses SMM because it is not.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copula estimation by simulated moments; vine uses the analytical likelihood here.
- [[Dependence Measures for Copulas]] — empirical Kendall's $\tau$ and quantile dependence used both for pair-copula selection and for R-vine tree selection.
- [[Tail Dependence in Factor Copulas]] — analytical tail dependence propositions for factor copulas; vine copulas inherit per-pair tail coefficients from the edge pair-copulas.

## See Also

- [[Factor Copula Construction]] — the latent-variable construction underlying the factor copula; compare the "conditional CDF via h-function" approach here vs. "latent factor simulation" approach there.
- [[Copula Estimation]] — Bayesian Gaussian copula; the bivariate Gaussian copula is a special case of a D-vine with $d=2$.
- [[../_Index|Dependence Modeling]]
