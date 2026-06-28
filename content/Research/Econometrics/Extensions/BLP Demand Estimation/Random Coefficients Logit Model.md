---
title: Random Coefficients Logit Model
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
source_location: "Section 2 (Demand), pp. 5-7, 11-12"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
depends_on:
  - "[[Discrete Choice Models]]"
used_by:
  - "[[The BLP Contraction Mapping]]"
  - "[[GMM Estimation and Instruments for Price Endogeneity]]"
  - "[[Numerical Integration and Optimization in PyBLP]]"
aliases:
  - Mixed Logit
  - Random Coefficients Logit
  - RCL
  - BLP Demand Model
  - Mixed Multinomial Logit
---

# Random Coefficients Logit Model

> [!summary]
> The random-coefficients (mixed) logit is the demand engine of BLP. Each consumer $i$ chooses the product with the highest indirect utility $U_{ijt} = \delta_{jt} + \mu_{ijt} + \epsilon_{ijt}$, where $\delta_{jt}$ is the **mean utility** common to all consumers, $\mu_{ijt}$ is an **individual-specific deviation** capturing heterogeneous tastes (random coefficients), and $\epsilon_{ijt}$ is i.i.d. type-I extreme value. Aggregate market shares are **integrals** of the logit choice probability over the distribution of consumer types. Because the random coefficients induce correlation in tastes across products, the model **relaxes the IIA / independence-from-irrelevant-alternatives restriction** of plain logit, yielding realistic, flexible substitution patterns.

## Overview

Plain multinomial logit imposes IIA: cross-price elasticities depend only on shares, so a price increase pushes consumers to all other products in proportion to their share — economically implausible. BLP fixes this by letting taste coefficients vary across consumers. Two consumers facing the same products can have very different substitution patterns; when aggregated, this generates rich, data-driven cross-elasticities. McFadden & Train (2000) show that **any** random-utility model can be approximated by a mixed multinomial logit with a sufficient basis of characteristics.

## Main Content

> [!definition] Indirect utility ^utility
> Individual $i$ in market $t = 1,\dots,T$ gets utility from product $j$:
> $$
> U_{ijt} = \delta_{jt} + \mu_{ijt} + \epsilon_{ijt}.
> $$
> - $\delta_{jt}$ — **mean utility** of product $j$ in market $t$ (common across $i$).
> - $\mu_{ijt}$ — **random-coefficient deviation**: the consumer-specific taste departure from the mean, parameterized by $\widetilde{\theta}_2$.
> - $\epsilon_{ijt}$ — idiosyncratic i.i.d. **type-I extreme value (Gumbel)** error.
>
> Consumers choose among $J_t = \{0, 1, \dots, J_t\}$ alternatives including the **outside good** $j=0$, normalized to $U_{i0t} = \epsilon_{i0t}$. The choice indicator is
> $$
> d_{ijt} = \begin{cases} 1 & \text{if } U_{ijt} > U_{ikt}\ \text{for all } k \neq j,\\ 0 & \text{otherwise.}\end{cases}
> $$

> [!definition] Market shares as integrals ^shares-integral
> Aggregate shares integrate the individual choices over heterogeneity:
> $$
> s_{jt} = \int d_{ijt}(\boldsymbol{\delta}_t, \boldsymbol{\mu}_{it})\, \mathrm{d}\boldsymbol{\mu}_{it}\, \mathrm{d}\boldsymbol{\epsilon}_{it}.
> $$
> With i.i.d. type-I extreme value $\epsilon_{ijt}$, the inner ($\epsilon$) integral has the closed-form **logit kernel**, leaving an integral over consumer types:
> $$
> s_{jt}(\boldsymbol{\delta}_t, \widetilde{\theta}_2) = \int \frac{\exp(\delta_{jt} + \mu_{ijt})}{\sum_{k \in J_t} \exp(\delta_{kt} + \mu_{ikt})}\, f(\boldsymbol{\mu}_{it} \mid \widetilde{\theta}_2)\, \mathrm{d}\boldsymbol{\mu}_{it}.
> $$
> Here $f(\boldsymbol{\mu}_{it}\mid\widetilde{\theta}_2)$ is the **mixing distribution** over heterogeneous types. This is why the model is called **mixed logit** or **random coefficients logit**: each individual's demand is a multinomial logit kernel, mixed over types. The integral has no closed form and must be approximated numerically — see [[Numerical Integration and Optimization in PyBLP]].

> [!definition] Mean-utility index and the structural error ^delta-index
> The key insight of Berry (1994) / BLP (1995) is the **nonlinear change of variables** $\boldsymbol{\delta}_t \equiv D_t^{-1}(\boldsymbol{\mathcal{S}}_t, \widetilde{\theta}_2)$: given observed shares, the share system can be **inverted** to recover the $J_t$-vector of mean utilities (see [[The BLP Contraction Mapping]]). Under an additivity assumption the recovered $\delta_{jt}$ is written as a linear index:
> $$
> \delta_{jt}(\boldsymbol{\mathcal{S}}_t, \widetilde{\theta}_2) = [x_{jt}, v_{jt}]\beta - \alpha p_{jt} + \xi_{jt},
> $$
> with exogenous characteristics $x_{jt}$, exogenous demand-shifters $v_{jt}$, endogenous price $p_{jt}$ (coefficient $\alpha$), and **structural unobservable** $\xi_{jt}$ (the unobserved product quality). Special cases: plain logit has $D_t^{-1} = \log s_{jt} - \log s_{0t}$ (no nonlinear parameters); nested logit has $D_t^{-1} = \log s_{jt} - \log s_{0t} - \rho \log s_{j\mid ht}$.

> [!definition] Random coefficients nested logit (RCNL) ^rcnl
> The RCNL of Brenkers & Verboven (2006) relaxes the i.i.d. assumption on $\epsilon_{ijt}$ to a two-level nested logit, adding a within-nest correlation parameter $\rho$ so that $\theta_2 \equiv [\alpha, \rho, \widetilde{\theta}_2]$ and
> $$
> U_{ijt} = \delta_{jt} + \mu_{ijt}(\widetilde{\theta}_2) + \epsilon_{ijt}(\rho).
> $$
> Shares now involve a consumer-specific **inclusive value** $IV_{iht}(\boldsymbol{\delta}_t, \boldsymbol{\mu}_{it}) = (1-\rho)\log \sum_{j\in J_{ht}} \exp\!\big(\frac{\delta_{jt}+\mu_{ijt}}{1-\rho}\big)$. RCNL is popular when the key substitution dimension is categorical (e.g. spirits, beer). It is harder to estimate because the share inversion is no longer a plain contraction and slows as $\rho \to 1$ (see [[The BLP Contraction Mapping]]).

## Examples

In the cereal application, let the one nonlinear characteristic be sugar content $x_{jt}$ with $\mu_{ijt} = \sigma_x x_{jt}\nu_{it}$, $\nu_{it}\sim N(0,1)$. A consumer with high $\nu_{it}$ strongly prefers sugary cereals; when a sugary brand's price rises she substitutes mainly toward **other sugary brands**, not toward bran flakes — exactly the non-IIA substitution plain logit cannot produce. The parameter $\sigma_x$ (in $\widetilde{\theta}_2$) governs how dispersed these tastes are; $\sigma_x = 0$ collapses to plain logit.

## Connections

- [[Discrete Choice Models]] — random-utility foundation; BLP aggregates individual choices to market shares.
- [[Market Share Models]] — RCL is a structural market-share model with micro-founded substitution.
- [[The BLP Contraction Mapping]] — how the share integrals are inverted to recover $\boldsymbol{\delta}_t$.
- [[GMM Estimation and Instruments for Price Endogeneity]] — uses the linear index in $\delta_{jt}$ to form moments.
- [[Numerical Integration and Optimization in PyBLP]] — how the share integral is approximated.

## See Also

- [[BLP Demand Estimation - Overview]]
- [[Supply Side and Markups]]
- [[Functional Forms in Marketing]]
- [[_Index]]
