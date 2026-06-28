---
title: "Index: State-Space and Kalman Filter"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/Causal Inference/Time Series Causal Inference/_Index|Time Series Causal Inference]]"
date_updated: 2026-06-28
concept_count: 5
---

# State-Space Models and the Kalman Filter

> [!abstract] Routing Summary
> This folder fills the vault's state-space / Kalman gap (vault gap #13), ingesting the linear-Gaussian core of Särkkä (2013), *Bayesian Filtering and Smoothing*. It explains the machinery that [[Bayesian Structural Time-Series Model]] and [[Local Linear Trend and Seasonality]] use but never derive. Contains 5 notes.
> - New here / want the big picture? → [[State-Space Models and the Kalman Filter - Overview]]
> - Need the model definition (observation + transition equations, symbols)? → [[Linear-Gaussian State-Space Models]]
> - Need the predict/update recursion, Kalman gain, innovations? → [[The Kalman Filter]]
> - Need the backward smoothing recursion / forward-backward pass? → [[The RTS Smoother]]
> - Need the likelihood for MCMC / parameter estimation? → [[Marginal Likelihood via the Kalman Filter]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Pipeline overview | [[State-Space Models and the Kalman Filter - Overview]] | overview | — | Predict→update→smooth→likelihood; filtering Eqs (4.11)-(4.13) |
| Linear-Gaussian model | [[Linear-Gaussian State-Space Models]] | definition | [[State-Space Models and the Kalman Filter - Overview]] | Eqs (4.17)-(4.18): $\mathbf{x}_k=\mathbf{A}\mathbf{x}_{k-1}+\mathbf{q}$, $\mathbf{y}_k=\mathbf{H}\mathbf{x}_k+\mathbf{r}$; Markov props (4.2),(4.4) |
| Kalman filter | [[The Kalman Filter]] | theorem | [[Linear-Gaussian State-Space Models]] | Eqs (4.20)-(4.21): predict $\mathbf{m}_k^-,\mathbf{P}_k^-$; gain $\mathbf{K}_k$; update $\mathbf{m}_k,\mathbf{P}_k$ |
| RTS smoother | [[The RTS Smoother]] | theorem | [[The Kalman Filter]] | Eq (8.6): backward gain $\mathbf{G}_k$, $\mathbf{m}_k^s,\mathbf{P}_k^s$; $\mathbf{P}_k^s\preceq\mathbf{P}_k$ |
| Marginal likelihood | [[Marginal Likelihood via the Kalman Filter]] | concept | [[The Kalman Filter]] | Eq (12.5) prediction-error decomp; energy fn (12.38); enables MCMC |

## Concept Dependency Chain

```
State-Space Models and the Kalman Filter - Overview
  └── Linear-Gaussian State-Space Models  (Eqs 4.17-4.18; Markov 4.2,4.4)
        └── The Kalman Filter  (forward: predict 4.20, update 4.21)
              ├── The RTS Smoother  (backward: G_k, m_k^s, P_k^s, Eq 8.6)
              └── Marginal Likelihood via the Kalman Filter
                    ├── Prediction-error decomposition (Eq 12.5)
                    ├── Energy function recursion (Eq 12.38) via v_k, S_k
                    └── MAP / MCMC / EM over θ → Bayesian Structural Time-Series Model
```

## Notes

- [[State-Space Models and the Kalman Filter - Overview]] — CONTAINS: the predict→update→smooth→likelihood pipeline; general filtering Eqs (4.11)-(4.13); why state-space form gives constant cost, modularity, tractable likelihood; running random-walk example
- [[Linear-Gaussian State-Space Models]] — CONTAINS: probabilistic state-space model (Def 4.1); Markov + conditional-independence properties (4.2, 4.4); linear-Gaussian model (4.17-4.18); full symbol glossary; random-walk and car-tracking examples with $\mathbf{A},\mathbf{H},\mathbf{Q},\mathbf{R}$ matrices
- [[The Kalman Filter]] — CONTAINS: Bayesian filtering equations (Thm 4.1); Kalman filter (Thm 4.2) full predict (4.20) + update (4.21) equations; innovation $\mathbf{v}_k$, innovation covariance $\mathbf{S}_k$, Kalman gain $\mathbf{K}_k$; algorithm pseudocode; scalar random-walk (4.31) and car-tracking examples
- [[The RTS Smoother]] — CONTAINS: Bayesian smoothing equations (Thm 8.1); RTS smoother (Thm 8.2) full backward recursion (8.6) with smoother gain $\mathbf{G}_k$; $\mathbf{P}_k^s\preceq\mathbf{P}_k$; two-filter alternative; algorithm pseudocode; random-walk (8.16) and car-tracking examples
- [[Marginal Likelihood via the Kalman Filter]] — CONTAINS: prediction-error decomposition (Thm 12.1, Eq 12.5); energy function recursion for linear-Gaussian model (Thm 12.3, Eq 12.38); one-step predictive Gaussian (12.41); MAP/ML/MCMC/EM/Laplace; Metropolis-Hastings acceptance (12.17); noise-variance posterior example

## Sources

- [[raw/Sarkka 2013 - Bayesian Filtering and Smoothing.pdf]] — Särkkä S. 2013. *Bayesian Filtering and Smoothing.* Cambridge University Press. Chapters 3-4 (filtering & Kalman filter), 8 (smoothing & RTS), 12 (parameter estimation).

## Cross-Links to Existing Vault Notes

- [[Bayesian Structural Time-Series Model]] — the applied state-space model whose observation/state equations (2.1-2.2) are a direct instance of (4.17); inference uses the Kalman/smoothing machinery here
- [[Local Linear Trend and Seasonality]] — concrete state components (level, slope, seasonal) assembled as block-diagonal $\mathbf{A},\mathbf{Q}$ and concatenated $\mathbf{H}$
- [[MCMC Inference for CausalImpact]] — Durbin-Koopman simulation smoother is the stochastic counterpart of the RTS smoother
- [[Single Marketing Time Series]] — ARIMA models have equivalent state-space representations; likelihoods evaluated via the Kalman filter
- [[Carryover Effects and Distributed Lags]] — AR / distributed-lag dynamics expressible in state-space form
- [[Hilbert Space Gaussian Processes]] — temporal GPs admit linear-Gaussian state-space (Kalman) representations
