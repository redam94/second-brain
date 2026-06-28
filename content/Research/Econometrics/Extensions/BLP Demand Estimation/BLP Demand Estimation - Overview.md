---
title: BLP Demand Estimation - Overview
tags:
  - source/ingested
  - topic/econometrics
  - type/overview
  - doc/paper
  - method/pyblp
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
source_location: "Sections 1-2, pp. 1-10"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
depends_on:
  - "[[Random Coefficients Logit Model]]"
  - "[[The BLP Contraction Mapping]]"
  - "[[GMM Estimation and Instruments for Price Endogeneity]]"
  - "[[Numerical Integration and Optimization in PyBLP]]"
  - "[[Supply Side and Markups]]"
used_by: []
aliases:
  - BLP Overview
  - Berry Levinsohn Pakes Overview
  - PyBLP Best Practices
---

# BLP Demand Estimation - Overview

> [!summary]
> The **Berry, Levinsohn, and Pakes (1995)** model is the workhorse estimator for **differentiated-products demand**. It specifies a **random-coefficients (mixed) logit** demand system that allows flexible substitution patterns, addresses **price endogeneity** via instruments, and can be paired with a **supply side** (Bertrand-Nash markups) to recover marginal costs. Conlon & Gortmaker (2020) review the modern literature, derive a slightly different formulation amenable to fixed effects and optimal instruments, and collect concrete **best practices** implemented as defaults in the **PyBLP** Python package.

## Overview

Empirical supply-and-demand models for differentiated products are central to the New Empirical Industrial Organization (NEIO) literature, used for **merger evaluation**, valuing **new goods**, and studying two-sided markets. The BLP approach scales to many products and uses both aggregate and disaggregate data.

The model is "simple to understand, challenging to estimate." At its core it is a **nonlinear change of variables** from observed market shares $\boldsymbol{\mathcal{S}}_t$ to mean utilities $\boldsymbol{\delta}_t$. After this change of variables, BLP reduces to a **linear IV regression** (demand alone) or a **two-equation linear IV problem** (supply and demand). The difficulty is that the parameters $\theta_2$ governing the nonlinear change are unknown, producing a **non-linear, non-convex GMM optimization** with a simulated objective.

The paper organizes its contribution around the major tasks of the BLP estimator: solving the fixed point (share inversion), optimization, numerical integration, instrument construction, and solving counterfactual pricing equilibria. Its headline empirical findings (via Monte Carlo) differ from prior literature: **multiple local optima appear rare** in well-identified problems, and good finite-sample performance is achievable even in small samples, especially when **optimal instruments** are used together with **supply-side restrictions**.

## Main Content

> [!definition] The BLP problem at a glance ^blp-pipeline
> 1. **Demand utility** (random-coefficients logit): $U_{ijt} = \delta_{jt} + \mu_{ijt} + \epsilon_{ijt}$ — see [[Random Coefficients Logit Model]].
> 2. **Share inversion**: invert observed shares to mean utilities, $\boldsymbol{\delta}_t \equiv D_t^{-1}(\boldsymbol{\mathcal{S}}_t, \widetilde{\theta}_2)$, via the [[The BLP Contraction Mapping|BLP contraction mapping]].
> 3. **Linear index**: $\delta_{jt} = [x_{jt}, v_{jt}]\beta - \alpha p_{jt} + \xi_{jt}$, with structural error $\xi_{jt}$.
> 4. **GMM moments**: $E[\xi_{jt} Z_{jt}^D] = 0$ using instruments for endogenous price — see [[GMM Estimation and Instruments for Price Endogeneity]].
> 5. **Optional supply side**: Bertrand-Nash FOCs give markups, recover marginal cost $c_{jt} = p_{jt} - \eta_{jt}$, add supply moments $E[\omega_{jt} Z_{jt}^S]=0$ — see [[Supply Side and Markups]].
> 6. **Estimation**: nested fixed-point (NFXP) GMM with numerical integration and gradient-based optimization — see [[Numerical Integration and Optimization in PyBLP]].

> [!definition] Parameter partition ^theta-partition
> The parameter vector $\theta$ is split into three parts:
> - $\theta_1$ ($K_1 \times 1$): linear **demand parameters** $\beta$.
> - $\theta_3$ ($K_3 \times 1$): linear **supply parameters** $\gamma$.
> - $\theta_2$ ($K_2 \times 1$): the **nonlinear parameters** — the price coefficient $\alpha$ and the parameters $\widetilde{\theta}_2$ governing heterogeneous tastes. These are common to both supply and demand and govern the endogenous objects.
>
> The NFXP algorithm concentrates out the linear $[\theta_1, \theta_3]$ and searches only over the $K_2$ nonlinear parameters $\theta_2$, so the Hessian is only $K_2 \times K_2$ and large numbers of (linear) fixed effects are "essentially free."

> [!definition] What is novel in Conlon & Gortmaker (2020) ^novelty
> - A **reformulation** of the BLP problem (placing $\alpha p_{jt}$ on the LHS of the linear system) that supports **simultaneous supply and demand** with **high-dimensional fixed effects** and **analytic gradients**.
> - A characterization of the **feasible approximation to optimal instruments** (Amemiya 1977 / Chamberlain 1987) that makes **exclusion and cross-equation restrictions explicit**, paralleling Berry & Haile (2014).
> - Concrete, benchmarked **best practices**: SQUAREM / Levenberg-Marquardt for the inner loop, Gauss-Hermite product rules (sparse grids / scrambled Halton in high dimensions) for integration, gradient-based optimization with box constraints and tight tolerances, and the log-sum-exp trick for numerical stability.

## Examples

A canonical setup is the **automobile** or **ready-to-eat cereal** application (e.g., BLP 1995; Nevo 2000b/2001):
- Markets $t$ are model-years or city-quarters; products $j$ are car models or cereal brands; the **outside good** $j=0$ is "buy nothing."
- Characteristics $x_{jt}$: horsepower, fuel economy, size (cars), or sugar/brand dummies (cereal); price $p_{jt}$ is endogenous.
- A random coefficient on a characteristic (e.g. $\mu_{ijt} = \sigma_x x_{jt}\nu_{it}$) generates realistic substitution: consumers who like big cars substitute toward other big cars when one's price rises, breaking IIA.
- The Conlon-Gortmaker Monte Carlo baseline: $T=20$ markets, firms $F_t \in \{2,5,10\}$, products per firm $J_{ft}\in\{3,4,5\}$, structural errors with $\sigma^2_\xi=\sigma^2_\omega=0.2$, $\sigma_{\xi\omega}=0.1$; demand parameters $[\beta_0,\beta_x,\alpha]=[-7,6,-1]$, $\sigma_x=3$; outside shares $0.8 < s_{0t} < 0.9$.

## Connections

- [[Discrete Choice Models]] — BLP is the aggregate-data extension of random-utility discrete choice.
- [[Market Share Models]] — BLP is a structural, micro-founded market-share model.
- [[Method of Simulated Moments]] — the simulated GMM objective is closely related to MSM (integrals approximated by simulation).
- [[Instrumental Variables]] — after share inversion, BLP is a (nonlinear) IV/GMM problem.
- [[Parameter Estimation in Market Response]] — situates BLP within structural estimation of demand.

## See Also

- [[Random Coefficients Logit Model]]
- [[The BLP Contraction Mapping]]
- [[GMM Estimation and Instruments for Price Endogeneity]]
- [[Numerical Integration and Optimization in PyBLP]]
- [[Supply Side and Markups]]
- [[_Index]]
