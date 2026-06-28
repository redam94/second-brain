---
title: Choosing the Global Scale and Effective Nonzeros
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/Piironen Vehtari 2017 - Regularized Horseshoe.pdf]]"
source_location: "Sec. 3 (3.1–3.5), pp. 9–15"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Regression Models/Shrinkage Priors"
doc_type: paper
depends_on:
  - "[[Global-Local Shrinkage Priors]]"
  - "[[The Horseshoe Prior]]"
used_by:
  - "[[Regularized Horseshoe (Finnish Horseshoe)]]"
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
aliases:
  - Effective Number of Nonzero Coefficients
  - m_eff
  - tau0 Formula
  - Global Shrinkage Parameter
  - Effective Model Size
---

# Choosing the Global Scale and Effective Nonzeros

> [!summary]
> The single most consequential hyperparameter of the horseshoe is the global scale $\tau$, and there was no principled way to set it. Piironen & Vehtari define the **effective number of nonzero coefficients** $m_\text{eff}=\sum_j(1-\kappa_j)$ and derive its prior mean as a function of $\tau$. Inverting that relation turns a prior guess $p_0$ for the number of relevant variables into a concrete scale $\tau_0 = \frac{p_0}{D-p_0}\frac{\sigma}{\sqrt n}$. The key lesson: $\tau$ must scale as $\sigma/\sqrt n$, so the popular default $\tau\sim\mathrm{C}^{+}(0,1)$ is usually a poor choice.

## Overview

For a fixed $\tau$, the implied sparsity depends on the dimension $D$, the noise $\sigma$, and the sample size $n$ — so reasoning about a single $\kappa_j$ is not enough. The right object is the aggregate effective model size. The authors prefer full Bayesian inference for $\tau$ over plug-in estimates (the marginal-likelihood estimate can collapse to $\hat\tau=0$ for very sparse vectors; cross-validation ignores posterior uncertainty), but the prior still needs a sensible location — which $m_\text{eff}$ supplies. This note builds directly on the shrinkage factor of [[Global-Local Shrinkage Priors]] and feeds the slab logic of [[Regularized Horseshoe (Finnish Horseshoe)]].

## Main Content

> [!definition] Effective number of nonzero coefficients
> $$m_\text{eff} = \sum_{j=1}^{D}(1 - \kappa_j).$$
> When the $\kappa_j$ are near 0 or 1 (as for the horseshoe), $m_\text{eff}$ counts how many coefficients are active/unshrunk — an interpretable measure of effective model size. ^meff-def

> [!theorem] Prior mean and variance of $m_\text{eff}$
> Using $\mathrm{E}(\kappa_j\mid\tau,\sigma)=\frac{1}{1+a_j}$ and $\mathrm{Var}(\kappa_j\mid\tau,\sigma)=\frac{a_j}{2(1+a_j)^2}$ with $a_j=\tau\sigma^{-1}\sqrt n\,s_j$:
> $$\mathrm{E}(m_\text{eff}\mid\tau,\sigma) = \sum_{j=1}^{D}\frac{a_j}{1+a_j}, \qquad \mathrm{Var}(m_\text{eff}\mid\tau,\sigma) = \sum_{j=1}^{D}\frac{a_j}{2(1+a_j)^2}.$$
> For standardized predictors ($s_j^2=1$) these simplify to
> $$\mathrm{E}(m_\text{eff}\mid\tau,\sigma) = \frac{\tau\sigma^{-1}\sqrt n}{1+\tau\sigma^{-1}\sqrt n}\,D, \qquad \mathrm{Var}(m_\text{eff}\mid\tau,\sigma) = \frac{\tau\sigma^{-1}\sqrt n}{2(1+\tau\sigma^{-1}\sqrt n)^2}\,D.$$ ^meff-moments

> [!theorem] Prior-guess formula for the global scale
> Solving $\mathrm{E}(m_\text{eff}\mid\tau,\sigma)=p_0$ for standardized predictors gives the scale that places most prior mass for $m_\text{eff}$ near a prior guess $p_0$:
> $$\tau_0 = \frac{p_0}{D - p_0}\,\frac{\sigma}{\sqrt n}.$$
> Either fix $\tau=\tau_0$ or, better, use it as the scale of a weakly-informative half-normal/half-Cauchy hyperprior, e.g. $\tau\sim\mathrm{C}^{+}(0,\tau_0^2)$. Two structural facts: (i) $\tau$ **must scale as $\sigma/\sqrt n$** to keep $m_\text{eff}$ beliefs invariant to $\sigma$ and $n$; (ii) $\tau_0$ is typically far from 1 or $\sigma$, the scales used by the defaults $\tau\sim\mathrm{C}^{+}(0,1)$ and $\tau\mid\sigma\sim\mathrm{C}^{+}(0,\sigma^2)$. ^tau0

> [!theorem] Connection to the oracle result
> For the simplified model $y_i = \beta_i+\varepsilon_i$ ($\mathbf X=\mathbf I$, $D=n$), van der Pas et al. (2014) prove the minimax-optimal scale (up to a log factor) is $\tau^\ast = p^\ast/n$, where $p^\ast$ is the true number of nonzeros. Setting $p_0=p^\ast$ and $\sigma=1$, the $\tau_0$ formula gives $\tau_0\to p^\ast/D = \tau^\ast$ as $n,p^\ast\to\infty$ with $p^\ast=o(n)$. So $m_\text{eff}$-based tuning recovers the oracle but is more generally applicable. ^oracle-link

**Why the default $\mathrm{C}^{+}(0,1)$ is dubious.** Sampling $\tau\sim p(\tau)$, $\lambda_j\sim\mathrm{C}^{+}(0,1)$, then computing $m_\text{eff}$, shows: $\tau=\tau_0$ gives a near-symmetric prior around $p_0$; a half-normal $\mathrm N^{+}(0,\tau_0^2)$ skews toward $m_\text{eff}<p_0$; a half-Cauchy $\mathrm C^{+}(0,\tau_0^2)$ adds a thick tail. But $\tau\sim\mathrm{C}^{+}(0,1)$ places far too much mass on large $\tau$, favoring solutions with most coefficients unshrunk — sensible only when $\tau$ is strongly identified by data. Crucially, the first three priors keep the same $m_\text{eff}$ prior under changes in $\sigma$ or $n$; $\mathrm{C}^{+}(0,1)$ does not.

## Examples

- **Worked $\tau_0$:** $D=1000$, $n=200$, $\sigma=1$, prior guess $p_0=5$ relevant variables gives $\tau_0=\frac{5}{995}\cdot\frac{1}{\sqrt{200}}\approx 3.6\times10^{-4}$.
- **Five of a hundred:** $p_0=5$ of $D=100$, $n=200$, $\sigma=1$: $\tau_0=\frac{5}{95}\cdot\frac{1}{\sqrt{200}}\approx 3.7\times10^{-3}$.
- **Sampling $m_\text{eff}$:** to inspect any $p(\tau)$, draw $\tau\sim p(\tau)$ and $\lambda_j\sim\mathrm{C}^{+}(0,1)$, compute $\kappa_j$ from the shrinkage-factor formula, then $m_\text{eff}=\sum_j(1-\kappa_j)$ — works for any scale-mixture prior even when closed-form moments are unavailable.

## Connections

- Aggregates the shrinkage factor $\kappa_j$ of [[Global-Local Shrinkage Priors]].
- Tunes $\tau$ for [[The Horseshoe Prior]]; the same $\tau_0$ (with $p_0$ = guess for coefficients far from zero) carries to the [[Regularized Horseshoe (Finnish Horseshoe)]], where $\bar m_\text{eff}=(1-b)\,m_\text{eff}$ with $b=(1+n\sigma^{-2}c^2)^{-1}$.
- "Effective model size" is the Bayesian-shrinkage analogue of effective parameters in [[Overfitting and Information Criteria]].
- $\sigma/\sqrt n$ scaling and pooling strength echo [[Hierarchical Linear Models]].

## See Also
- [[Regularized Horseshoe (Finnish Horseshoe)]] — uses $\tau_0$ and shrinks $m_\text{eff}$ by the slab
- [[The Horseshoe Prior]] — the prior whose $\tau$ this calibrates
- [[Global-Local Shrinkage Priors]] — source of the $\kappa_j$ shrinkage factor
- [[Horseshoe and Regularized Horseshoe Priors]] — overview hub
- [[Overfitting and Information Criteria]] — effective number of parameters
- [[Hierarchical Linear Models]] — global scale as a pooling hyperparameter
