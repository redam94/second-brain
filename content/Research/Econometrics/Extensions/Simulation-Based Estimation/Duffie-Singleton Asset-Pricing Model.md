---
title: "Duffie-Singleton Asset-Pricing Model"
tags:
  - source/ingested
  - topic/econometrics
  - type/example
  - type/concept
  - doc/paper
source: "[[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]]"
source_location: "§2 An Illustrative Asset-Pricing Model, pp. 930-933; §4.1 Eqs. 4.3-4.5, p. 937"
date_ingested: 2026-06-27
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Simulated Moments Estimation - Overview]]"
used_by:
  - "[[Simulated Moments Estimator Definition]]"
  - "[[SME Consistency]]"
aliases:
  - stochastic growth asset-pricing model
  - Brock-Michener model with taste shocks
---

# Duffie-Singleton Asset-Pricing Model

> [!summary]
> The illustrative dynamic asset-pricing model Duffie & Singleton (1993) use to motivate the [[Simulated Moments Estimation - Overview|SME]]: an extended stochastic-growth economy (Brock 1980; Michener 1984) with a representative consumer facing a **technology shock** $z_t$ and an **unobserved taste shock** $u_t$. Because the taste shock is unobserved to the econometrician, [[Method of Simulated Moments|Euler-equation GMM]] is infeasible, so equilibrium prices/quantities must be simulated. The model's state $X_t = (z_t, u_t)$ is Markov; the augmented state $Y_t = (X_t', k_t)'$ (adding the capital stock) is also Markov and is what gets simulated.

## Overview

Section 2 sets up a concrete economy that exhibits the econometric problems of simulation-based estimation: nonstationarity of the simulated series and parameter-dependence of the simulated path. It is "an informal backdrop" to the formal SME, and it recurs as the running example for the regularity conditions in [[Geometric Ergodicity and Uniform LLN]] and [[SME Consistency]].

## Main Content

### Production and the firm

> [!definition] Production and firm's problem (D&S §2, Eqs. 2.1–2.2)
> A single consumption commodity is produced by
> $$
> F(k_t, z_t) = z_t k_t^{\phi}, \qquad 0 < \phi < 1,
> $$
> where $k_t$ is the capital stock at date $t$ and $z_t$ is a technology shock. The firm rents capital at rate $r_t^k$ and pays profits as dividends $d_t$, solving each period the static problem
> $$
> d_t = \arg\max_{k_t}\left\{ z_t k_t^{\phi} - r_t^k k_t \right\}.
> $$
> In equilibrium this is equivalent to maximizing share market value.
> ^def-production

### Consumer, budget, and preferences

> [!definition] Consumer problem with taste shock (D&S §2, Eqs. 2.3–2.4)
> Given share price $p_t$, the representative consumer faces the budget constraint
> $$
> c_t + k_{t+1} + p_t s_{t+1} = (d_t + p_t)s_t + (r_t^k + \mu)k_t,
> $$
> where $c_t$ is consumption, $s_t$ are share holdings, and $(1-\mu)$ is a constant capital depreciation rate. With an **unobserved** (to the econometrician) additively-separable taste shock $u_t$, the consumer maximizes
> $$
> \max_{(c_t, k_t)} \mathbb{E}\!\left[\sum_{t=1}^{\infty} \delta^{t}\,\frac{(c_t - 1)^{1-\alpha}}{1-\alpha}\,u_t\right], \qquad \alpha < 0,
> $$
> where $\alpha$ is the constant coefficient of relative risk aversion and $\delta \in (0,1)$ is the subjective discount factor.
> ^def-consumer

### Markov state and the parameter vector

> [!definition] State process and augmented state (D&S §2, Eqs. 2.5–2.6)
> The exogenous state $X_t = (z_t, u_t)$ is Markov:
> $$
> X_t = h(X_{t-1}, \varepsilon_t, \rho_0),
> $$
> with $\{\varepsilon_t\}$ a two-dimensional i.i.d. process, $h$ a transition function, and $\rho_0$ an unknown parameter sub-vector. The full unknown parameter is
> $$
> \beta_0 = (\phi, \alpha, \rho_0, \mu, \delta)' \in \Theta.
> $$
> Solving the system (2.1)–(2.5) analytically or numerically yields the equilibrium transition function $H$ for the **augmented** state $Y_t = (X_t', k_t)'$:
> $$
> Y_{t+1} = H(Y_t, \varepsilon_{t+1}, \beta_0).
> $$
> $Y_t$ is the object that is simulated; see [[Simulated Moments Estimator Definition]].
> ^def-state

### Why simulation is needed

Three reasons (D&S §2) motivate joint solution-and-estimation by simulation:
1. **Goodness-of-fit.** Solving for the stochastic equilibrium lets one assess fit directly via the joint distribution of asset returns, consumption, and capital.
2. **Infeasible Euler-equation GMM.** With unobserved taste shocks $u_t$, [[Method of Simulated Moments|Hansen–Singleton (1982) Euler-equation estimation]] is not feasible.
3. **Temporal aggregation.** GMM with temporally aggregated data can be inconsistent (Hall 1988; Hansen–Singleton 1989), but aggregation is often accommodated by the SME.

## Examples

> [!example] Closed-form special case (D&S §4.1, Eqs. 4.3–4.5)
> Take the special case $u_t = 1$ for all $t$, $\mu = 0$ (100% depreciation), and $\alpha = 1$ (logarithmic utility), with technology shock
> $$
> \ln z_{t+1} = \zeta_z + \rho \ln z_t + \varepsilon_{t+1}.
> $$
> Then the implied equilibrium asset-pricing function and capital law of motion are (Michener 1984):
> $$
> p_t = \frac{\delta}{(1-\delta)}(1-\phi)\,z_t k_t^{\phi},
> \qquad
> d_t = (1-\phi)\,z_t k_t^{\phi},
> \qquad
> k_{t+1} = \delta \phi\, z_t k_t^{\phi}.
> $$
> If $\{\varepsilon_t\}$ is i.i.d. normal, the resulting $\{Y_t\}$ satisfies the irreducibility/recurrence **Condition B** needed for [[Geometric Ergodicity and Uniform LLN|geometric ergodicity]] — even though the capital stock $k_{t+1}$ given $X_t$ is *degenerate* (so the single-period "full support" condition fails, but the weaker Condition B holds).
> ^ex-closed-form

> [!example] Conditionally heteroskedastic shock that separates ergodicity from AUC (D&S §4.5, Eq. 4.11)
> Let the technology shock follow
> $$
> z_t = \xi + \rho z_{t-1} + \sigma \nu_{t-1}^{\gamma}\varepsilon_t, \qquad \gamma < 1,\ \sigma > 0,\ |\rho| < 1,
> $$
> with $\nu_t = z_t$ if $z_t \ge \eta > 0$ and $\nu_t = \eta$ otherwise. This process is **geometrically ergodic** (since $|\rho|<1$), so it obeys weak/strong LLNs — yet it can **violate** the Asymptotic Unit-Circle condition (the Lipschitz factor $\rho + \sigma\varepsilon(\nu^\gamma-\nu'^\gamma)/(z-z')$ can exceed unity). This is the paper's key counterexample showing that geometric ergodicity accommodates a strictly larger class of processes than the AUC condition used for strong consistency. See [[SME Consistency]].
> ^ex-het-shock

## Connections

- Provides the concrete $H$, $\varepsilon$, $f$ primitives that the abstract [[Simulated Moments Estimator Definition]] requires.
- The closed-form case is the test bed for the [[Geometric Ergodicity and Uniform LLN|geometric-ergodicity]] conditions; the heteroskedastic case motivates the split between weak (ergodicity-based) and strong (AUC-based) [[SME Consistency|consistency]].
- Structurally a stochastic growth model — compare the [[Brock-Mirman Model - SMM Estimation Exercise|Brock-Mirman SMM exercise]], a related production economy estimated by SMM.

## See Also

- [[Simulated Moments Estimation - Overview]] — where this model fits in the paper
- [[Simulated Moments Estimator Definition]] — the estimator built on $H, f$
- [[Geometric Ergodicity and Uniform LLN]] — Condition B applied to this model
