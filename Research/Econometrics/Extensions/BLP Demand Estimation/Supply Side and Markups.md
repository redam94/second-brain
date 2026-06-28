---
title: Supply Side and Markups
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/pyblp
source: "[[raw/Conlon Gortmaker 2020 - Best Practices BLP Demand Estimation (PyBLP).pdf]]"
source_location: "Section 2 (Supply) & Section 3 (Pricing Equilibria), pp. 6-8, 26-28"
date_ingested: 2026-06-28
folder: "Econometrics/Extensions/BLP Demand Estimation"
doc_type: paper
depends_on:
  - "[[Random Coefficients Logit Model]]"
  - "[[GMM Estimation and Instruments for Price Endogeneity]]"
used_by: []
aliases:
  - BLP Supply Side
  - Bertrand Markups
  - Marginal Cost Recovery
  - Pricing Equilibrium
  - Merger Simulation
---

# Supply Side and Markups

> [!summary]
> BLP can be paired with a **supply side** derived from firms' Bertrand-Nash pricing first-order conditions. Given demand derivatives and an **ownership matrix** $\mathcal{H}_t$ (which products each firm owns), the model recovers **markups** $\eta_{jt}$ and hence **marginal costs** $c_{jt} = p_{jt} - \eta_{jt}$. Parameterizing marginal cost adds **supply moments** $E[\omega_{jt}Z^S_{jt}]=0$ that sharpen estimation. Solving the inverse problem — counterfactual **equilibrium prices** under a new ownership structure $\mathcal{H}^*_t$ (e.g. a merger) — uses the Morrow-Skerlos $\zeta$-markup fixed point, which is faster and more reliable than naive iteration or Newton's method.

## Overview

Including supply gives a model of marginal costs, enabling counterfactuals (merger price effects, pass-through) and adding identifying information. Its cost: the supply moments may be **misspecified** if the researcher does not know the functional form of marginal cost $f_{MC}(\cdot)$ or firm conduct $\mathcal{H}_t$. Conlon-Gortmaker find that a **correctly specified** supply side substantially improves finite-sample performance (bias all but eliminated with optimal instruments), but an **incorrectly specified** one is worse than no supply side because it biases $\alpha$. Validity is testable via overidentification (see [[GMM Estimation and Instruments for Price Endogeneity]]).

## Main Content

> [!definition] Bertrand-Nash pricing FOCs and the markup ^foc
> Multiproduct firm $f$ controlling products $J_{ft}$ maximizes $\max_{p_{jt}}\sum_{j\in J_{ft}} s_{jt}(\boldsymbol{p}_t)(p_{jt}-c_{jt})$. The FOCs in matrix form for market $t$:
> $$\boldsymbol{s}_t(\boldsymbol{p}_t) = \Delta_t(\boldsymbol{p}_t)\cdot(\boldsymbol{p}_t - \boldsymbol{c}_t), \qquad \underbrace{\Delta_t(\boldsymbol{p}_t)^{-1}\boldsymbol{s}_t(\boldsymbol{p}_t)}_{\eta_t(\boldsymbol{p}_t, \boldsymbol{s}_t, \theta_2)} = \boldsymbol{p}_t - \boldsymbol{c}_t.$$
> The **multiproduct Bertrand markup** $\eta_t$ depends on the $J_t\times J_t$ intra-firm demand-derivative matrix
> $$\Delta_t(\boldsymbol{p}_t) \equiv -\mathcal{H}_t \odot \frac{\partial \boldsymbol{s}_t}{\partial \boldsymbol{p}_t}(\boldsymbol{p}_t),$$
> the **Hadamard (element-wise) product** of the demand-derivative matrix ($\partial s_{jt}/\partial p_{kt}$) and the **ownership matrix** $\mathcal{H}_t$ (entry $(j,k)=1$ if the same firm produces $j$ and $k$, else 0). Alternative conduct (single-product, monopoly, Cournot, partial collusion) corresponds to different $\mathcal{H}_t$; Miller-Weinberg (2017) / Backus et al. (2020) even estimate a conduct parameter $\mathcal{H}_t(\kappa)$.

> [!definition] Marginal cost parameterization and supply moments ^supply-moments
> Recover $c_{jt} = p_{jt} - \eta_{jt}(\theta_2)$, then parameterize marginal cost:
> $$f_{MC}(p_{jt}-\eta_{jt}(\theta_2)) = f_{MC}(c_{jt}) = x_{jt}\gamma_1 + w_{jt}\gamma_2 + \omega_{jt},$$
> with $f_{MC}(\cdot)$ commonly the identity (or $\log$ to keep costs positive). The cost depends on product characteristics $x_{jt}$ and **cost shifters $w_{jt}$ excluded from demand**. This yields the supply moment condition $E[\omega_{jt}Z^S_{jt}]=0$, stacked with the demand moments in the GMM objective.

> [!definition] Solving counterfactual pricing equilibria ^equilibrium
> Counterfactuals (mergers, cost changes) require solving the $J_t\times J_t$ nonlinear system for new equilibrium prices, replacing $\mathcal{H}_t$ with a post-merger $\mathcal{H}^*_t$:
> $$\boldsymbol{p}_t = \boldsymbol{c}_t + \eta_t(\boldsymbol{p}_t, \mathcal{H}^*_t).$$
> Naive iteration on this is **not a contraction** and can cycle (fails 1-5% of the time, Armstrong 2016). Newton's method requires the demand Hessian and is costly. The preferred method (Morrow & Skerlos 2011) splits $\partial \boldsymbol{s}_t/\partial\boldsymbol{p}_t = \Lambda_t - \Gamma_t$ ($\Lambda_t$ diagonal, $\Gamma_t$ dense, $\alpha_i = \partial u_{ijt}/\partial p_{jt}$ the marginal disutility of price) and iterates the **$\zeta$-markup fixed point**
> $$\boldsymbol{p}_t \leftarrow \boldsymbol{c}_t + \zeta_t(\boldsymbol{p}_t), \quad \zeta_t(\boldsymbol{p}_t) = \Lambda_t^{-1}[\mathcal{H}^*_t \odot \Gamma_t](\boldsymbol{p}_t-\boldsymbol{c}_t) - \Lambda_t^{-1}\boldsymbol{s}_t(\boldsymbol{p}_t),$$
> which is **3-12x faster** than Newton-type approaches and reliably finds an equilibrium. Fast, reliable equilibrium solving is also what makes the **feasible optimal instruments** computable.

## Examples

**Merger simulation** (the canonical BLP use): estimate demand + supply on pre-merger data to recover $c_{jt}$ and demand derivatives. Construct $\mathcal{H}^*_t$ reflecting the merged firm now owning both parties' products. Solve the $\zeta$-markup fixed point for post-merger prices $\boldsymbol{p}^*_t$; the difference $\boldsymbol{p}^*_t - \boldsymbol{p}_t$ is the predicted unilateral price effect. Because the merged firm internalizes substitution between formerly-rival products, markups on close substitutes rise.

## Connections

- [[GMM Estimation and Instruments for Price Endogeneity]] — supply moments $E[\omega_{jt}Z^S_{jt}]=0$ and cross-equation restrictions enter the joint GMM objective.
- [[Random Coefficients Logit Model]] — demand derivatives $\partial s_{jt}/\partial p_{kt}$ that build $\Delta_t$ come from the RCL shares.
- [[The BLP Contraction Mapping]] — share inversion supplies the $\boldsymbol{\delta}_t$ used to evaluate demand derivatives.
- [[Numerical Integration and Optimization in PyBLP]] — equilibrium prices and optimal instruments reuse the numerical machinery.

## See Also

- [[BLP Demand Estimation - Overview]]
- [[Market Share Models]]
- [[_Index]]
