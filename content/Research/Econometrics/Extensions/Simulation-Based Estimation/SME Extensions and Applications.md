---
title: "SME Extensions and Applications"
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]]"
source_location: "§6 Extensions and Conclusions, pp. 946-948"
date_ingested: 2026-06-27
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[SME Asymptotic Distribution]]"
  - "[[Simulated Moments Estimator Definition]]"
used_by: []
aliases:
  - SME with beta-dependent moments
  - calculated vs simulated moments
  - SME measurement error
  - SME option pricing
---

# SME Extensions and Applications

> [!summary]
> Section 6 extends the [[Simulated Moments Estimator Definition|SME]] to let the **observation function depend on $\beta$** ($g^\beta$), which broadens applicability to many asset-pricing problems. Two practically important consequences: (1) **mixing calculated and simulated moments** — using a known analytic moment $h_j(\beta)$ for any coordinate where it is available — *strictly increases efficiency* over simulating all moments; (2) **measurement error** in observed states is accommodated by adding a mean-zero error to the observation. A leading application is **option pricing**, where the European option price is a conditional expectation that may be infeasible to simulate directly but feasible to compute via its analytic/conditional form.

## Overview

The baseline SME assumes the observation function $f$ does not depend on $\beta$ for the actual data. Section 6 relaxes this, replacing $f_t^*$ with $g_t^{\beta_0} = g(Z_t,\beta_0)$ and matching it to a simulated $g_s^\beta$. This single generalization yields several useful special cases and a corresponding adjustment to the asymptotic covariance.

## Main Content

### $\beta$-dependent observation function

> [!definition] Extended SME with $g^\beta$ (D&S §6, Eqs. 6.1–6.4)
> Add a measurable observation function $g : \mathbb{R}^{NL}\times\Theta\to\mathbb{R}^M$ (with $L$ states entering, WLOG $L=l$). Replace $f_t^*$ by $g_t^{\beta_0} = g[(Y_t,\dots,Y_{t-L+1}),\beta_0]$, assume $\mathbb{E}[g^{\beta_0} - f^{\beta_0}] = 0$, and consider the moment difference
> $$
> G_T(\beta) = \frac{1}{T}\sum_{t=1}^{T} g_t^\beta - \frac{1}{\mathcal{T}(T)}\sum_{s=1}^{\mathcal{T}(T)} f_s^\beta.
> $$
> The extended SME minimizes $C_T(\beta) = G_T(\beta)'W_T G_T(\beta)$ as in (3.5). The relevant long-run covariance becomes the **weighted** matrix
> $$
> \Sigma_{f,g,\tau} = \tau\,\Sigma_0 + \Sigma_1,
> \qquad
> \Sigma_1 = \sum_{j=-\infty}^{\infty}\mathbb{E}\!\left(\left[g_t^{\beta_0}-\mathbb{E}(g_t^{\beta_0})\right]\left[g_{t-j}^{\beta_0}-\mathbb{E}(g_t^{\beta_0})\right]'\right),
> $$
> and (with $W_T\to\Sigma_{f,g,\tau}^{-1}$ and full-rank $D_0 = \mathbb{E}[\partial g_t^{\beta_0}/\partial\beta - \partial f_\infty^{\beta_0}/\partial\beta]$) the SME satisfies
> $$
> \sqrt{T}(b_T-\beta_0)\Rightarrow N[0,\ \Lambda_{f,g,\tau}],
> \qquad
> \Lambda_{f,g,\tau} = (D_0'\Sigma_{f,g,\tau}^{-1}D_0)^{-1}.
> $$
> The new rank condition on $D_0$ rules out trivial underidentification (e.g. multiplicative representations $g(z,\beta^1)\psi(z,\beta^1)$ vs. $f(z,\beta^2)\psi(z,\beta^2)$ with $\beta^1\ne\beta^2$). Consistent estimation of $\Lambda_{f,g,\tau}$ typically requires **two steps**, using both simulated and observed data.
> ^def-extended-sme

### Three uses of the extension

> [!example] Mixing calculated and simulated moments (efficiency gain) (D&S §6)
> If a coordinate function $g_j$ has a **known analytic** form $h_j(\beta) = \mathbb{E}[g_j(Z_\infty,\beta)]$, set $f_j(z,\beta) = h_j(\beta)$ for all $z$ — i.e. use the *calculated* moment for that coordinate and *simulated* moments for the rest. **Substituting calculated for simulated moments improves precision:** the covariance $\Lambda_{f,g,\tau}$ is smaller than the all-simulated covariance $\Lambda$, because simulation noise is removed from those coordinates.
> ^ex-calculated-moments

> [!example] Measurement error (D&S §6)
> Errors in measuring the observed state are accommodated by $g_t^{\beta_0} = f(Z_t,\beta_0) + u_t$, where $\{u_t\}$ is an ergodic, mean-zero $\mathbb{R}^M$-valued measurement error. Asymptotic efficiency is increased by **ignoring the measurement error in simulation** and comparing sample moments of the simulated $\{f(Z_t^\beta,\beta)\}$ with the noisily-measured $\{g_t^\beta\}$.
> ^ex-measurement-error

> [!example] Option pricing via conditional expectations (D&S §6)
> A coordinate may take the conditional-expectation form
> $$
> g_j[(Y_t,\dots,Y_{t-l+1}),\beta] = \mathbb{E}\!\left[h_j(Y_{t+1},\dots,Y_{t+l+2},\beta)\mid Y_t,\dots,Y_{t-l+1}\right].
> $$
> Directly simulating $g_j(Z_t^\beta,\beta)$ may be infeasible, but by the **law of iterated expectations** the feasible observation $f_j(Z_t^\beta,\beta) = h_j(Z_t^\beta,\beta)$ has the *same mean* as $g_j(Z_t^\beta,\beta)$, so $h_j$ can be used instead. The leading illustration is the **European option price**: the price $g_j(Z_t^\beta,\beta)$ is the conditional expectation of the option's discounted payoff at maturity, which can be matched using the realized discounted payoff $h_j$.
> ^ex-option-pricing

## Connections

- Generalizes the covariance $\Lambda$ of [[SME Asymptotic Distribution]] to $\Lambda_{f,g,\tau}$; the calculated-moment efficiency gain is the analytic-vs-simulated trade-off seen in [[Method of Simulated Moments]].
- The option-pricing/conditional-expectation device connects the SME to derivative-pricing applications and to [[Indirect Inference|auxiliary-model]] ideas where intractable objects are matched in mean.
- Measurement-error handling parallels errors-in-variables treatments in [[SMM Weighting Matrix and Inference|GMM/SMM inference]].

## See Also

- [[SME Asymptotic Distribution]] — the base covariance $\Lambda$ this generalizes
- [[Simulated Moments Estimator Definition]] — the estimator being extended
- [[Simulated Moments Estimation - Overview]] — paper summary and section map
