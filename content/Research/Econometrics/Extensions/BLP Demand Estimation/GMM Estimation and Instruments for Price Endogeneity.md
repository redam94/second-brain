---
title: GMM Estimation and Instruments for Price Endogeneity
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/pyblp
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
source_location: "Sections 2 (The Estimator) & 4 (Optimal Instruments), pp. 8-10, 28-39"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
depends_on:
  - "[[Random Coefficients Logit Model]]"
  - "[[The BLP Contraction Mapping]]"
  - "[[Instrumental Variables]]"
used_by:
  - "[[Supply Side and Markups]]"
aliases:
  - BLP GMM
  - BLP Instruments
  - Differentiation IV
  - Gandhi-Houde Instruments
  - Optimal Instruments
  - Price Endogeneity BLP
---

# GMM Estimation and Instruments for Price Endogeneity

> [!summary]
> After share inversion, BLP is a **GMM / IV problem**: the structural error $\xi_{jt}$ (unobserved product quality) is correlated with **price** $p_{jt}$ because firms set higher prices for higher-quality goods, so OLS on the demand index is biased. Valid instruments $Z^D_{jt}$ — **cost shifters**, the **BLP instruments** (functions of rival product characteristics), the **Gandhi-Houde differentiation IV**, and the **approximation to the optimal instruments** — give moment conditions $E[\xi_{jt}Z^D_{jt}]=0$. Adding a supply side yields additional moments $E[\omega_{jt}Z^S_{jt}]=0$ and cross-equation restrictions. The objective is minimized over $\theta$ with a weighting matrix $W$.

## Overview

Price is **endogenous**: $p_{jt}$ depends on the unobserved quality $\xi_{jt}$ through the firm's pricing decision, so $E[\xi_{jt}p_{jt}]\neq 0$. Identification of the price coefficient $\alpha$ (and the random-coefficient parameters $\theta_2$) requires instruments that shift prices/markups but are uncorrelated with $\xi_{jt}$. Because $\theta_2$ governs the nonlinear substitution, each nonlinear parameter needs its own excluded instrument; Berry & Haile (2014) show $D_t^{-1}(\boldsymbol{\mathcal{S}}_t,\widetilde{\theta}_2)$ depends on the endogenous shares of **all** products in the market, so each $\widetilde{\theta}_2$ parameter requires an additional instrument.

## Main Content

> [!definition] Demand moment conditions ^demand-moments
> From the inverted linear index $\delta_{jt} = [x_{jt}, v_{jt}]\beta - \alpha p_{jt} + \xi_{jt}$, with instruments $Z^D_{jt}$ (which include the exogenous regressors $x_{jt}, v_{jt}$):
> $$
> \xi_{jt} = \delta_{jt}(\boldsymbol{\mathcal{S}}_t,\widetilde{\theta}_2) - [x_{jt}, v_{jt}]\beta + \alpha p_{jt}, \qquad E[\xi_{jt} Z^D_{jt}] = 0.
> $$
> The demand-only GMM program is $\min_\theta q_D(\theta) = g_D(\theta)' W g_D(\theta)$ with $g_D(\theta) = \tfrac{1}{N}\sum_{j,t}\xi_{jt}Z^D_{jt}$.

> [!definition] The full GMM estimator (supply + demand) ^gmm-objective
> Stack demand and supply sample moments and minimize over $\theta = [\beta, \alpha, \widetilde{\theta}_2, \gamma]$:
> $$
> \min_\theta\ q(\theta) \equiv g(\theta)' W g(\theta), \qquad g(\theta) = \begin{bmatrix}\tfrac{1}{N}\sum_{j,t}\xi_{jt}Z^D_{jt}\\[2pt] \tfrac{1}{N}\sum_{j,t}\omega_{jt}Z^S_{jt}\end{bmatrix}.
> $$
> where $\omega_{jt} = f_{MC}(p_{jt}-\eta_{jt}) - [x_{jt}, w_{jt}]\gamma$ is the supply-side (marginal cost) error and $\eta_t = \Delta_t(\theta_2)^{-1}\boldsymbol{s}_t$ the markup (see [[Supply Side and Markups]]). The program is solved **twice**: once to obtain a consistent estimate of the efficient weighting matrix $W$, and again for the efficient two-step GMM estimator.

> [!definition] Why instruments — and what valid ones look like ^valid-instruments
> Three families of instruments, in increasing sophistication:
> - **Cost shifters $w_{jt}$.** Exogenous variables that shift marginal cost (hence price) but not demand — the classic exclusion restriction. These provide $K_3 - K_x$ overidentifying restrictions for demand.
> - **BLP instruments.** Functions of the **exogenous characteristics of rival (and own) products**, e.g. sums or averages of competitors' characteristics. They are relevant because markups $\eta_{jt}$ and the inverse-share term $D_t^{-1}(\boldsymbol{\mathcal{S}}_t,\widetilde{\theta}_2)$ both depend on the characteristics of all products in the market. Armstrong (2016): plain BLP instruments **become weak as the number of products grows** absent strong cost shifters.
> - **Differentiation IV (Gandhi & Houde 2019).** A second-order polynomial basis in the **differences** of product characteristics $d_{jkt} = x_{kt}-x_{jt}$. Two flavors: the **Local** measure counts the number of rival products within one standard deviation of product $j$; the **Quadratic** measure sums the aggregate distance between $j$ and other products. These outperform the sums-of-characteristics BLP instruments because differentiation more directly captures local competition.

> [!theorem] Approximation to the optimal instruments (Amemiya 1977 / Chamberlain 1987) ^optimal-iv
> The asymptotic GMM variance depends on $(D'\Omega^{-1}D)$ with $D = E[(\partial\xi_{jt}/\partial\theta, \partial\omega_{jt}/\partial\theta)\mid Z_t]$ and $\Omega = E[(\xi_{jt},\omega_{jt})'(\xi_{jt},\omega_{jt})\mid Z_t]$. Chamberlain (1987): the optimal instruments are the **expected Jacobian** $Z^{Opt}_{jt} = E[D_{jt}(Z_t)\Omega^{-1}_{jt}\mid Z_t]$. Conlon & Gortmaker partition these into demand and supply instruments,
> $$
> Z^{Opt,D}_{jt} \equiv E[(D_{jt}\Omega^{-1}_t \odot \Theta)_{\cdot 1}\mid Z_t], \qquad Z^{Opt,S}_{jt} \equiv E[(D_{jt}\Omega^{-1}_t \odot \Theta)_{\cdot 2}\mid Z_t].
> $$
> The optimal instruments from the **linear** parts are exogenous regressors rescaled by covariances; those for $\theta_2$ are **nonlinear functions of the data** ("quantity/markup shifters"). This formulation makes the **exclusion restrictions explicit**: $w_{jt}$ (cost shifters excluded from demand) give $K_3-K_x$ restrictions; $v_{jt}$ (demand shifters excluded from supply) give $K_1-K_x$ restrictions; and joint estimation adds $K_2$ cross-equation restrictions. The true optimal IV are infeasible (they require knowing the equilibrium pricing function); the **feasible approximation** (Berry et al. 1999, Algorithm 2) draws structural errors $(\xi^*_t, \omega^*_t)$, re-solves for equilibrium $(\hat{p}_t, \hat{s}_t)$ via the $\zeta$-markup fixed point, and averages the analytic Jacobian. The "approximate" variant (replacing errors by their expectation 0) performs as well as the costlier "asymptotic" and "empirical" variants.

> [!definition] Testing supply-side validity (overidentification) ^lr-test
> Including a (possibly misspecified) supply side adds moments that can be tested. A Hausman-style likelihood-ratio test compares the full-model objective with the demand-only objective:
> $$
> \mathrm{LR} = N\big[g(\hat{\theta})'W g(\hat{\theta}) - g_D(\hat{\theta}_D)'W_D g_D(\hat{\theta}_D)\big] \sim \chi^2_{K - K_x}.
> $$
> In Monte Carlo, the authors reject **misspecified** conduct assumptions but not correctly specified ones.

## Examples

A merger-evaluation pipeline (e.g. automobiles): instrument price with (i) cost shifters $w_{jt}$ such as wages/steel prices in the assembly region, (ii) Gandhi-Houde differentiation IV built from horsepower/size differences to rivals, then (iii) in a second stage compute feasible **optimal instruments** assuming Bertrand conduct. The recommended workflow (Gandhi & Houde 2019): **start with differentiation IV plus an "expected price" instrument in a first stage; if conduct is known, compute feasible optimal instruments in a second stage.** Small-sample gains from optimal IV are largest with multiple random coefficients.

## Connections

- [[Instrumental Variables]] — BLP's identification rests on IV/exclusion restrictions for endogenous price.
- [[The BLP Contraction Mapping]] — supplies the inverted $\delta_{jt}$ that defines the residual $\xi_{jt}$ (the inner loop).
- [[Random Coefficients Logit Model]] — the nonlinear parameters $\theta_2$ that each require an instrument.
- [[Supply Side and Markups]] — source of the supply moments $E[\omega_{jt}Z^S_{jt}]=0$ and cross-equation restrictions.
- [[Method of Simulated Moments]] — the simulated moments analogue.

## See Also

- [[BLP Demand Estimation - Overview]]
- [[Numerical Integration and Optimization in PyBLP]]
- [[Parameter Estimation in Market Response]]
- [[_Index]]
