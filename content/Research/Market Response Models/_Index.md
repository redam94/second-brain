---
title: "Index: Market Response Models"
tags:
  - type/index
  - topic/market-response
  - source/hanssens-parsons-schultz-2001
date_updated: 2026-06-17
concept_count: 31
---

# Market Response Models

> [!abstract] Routing Summary
> Empirical response models for marketing management using econometric and time series (ETS) analysis, plus modern Bayesian media mix modeling. Sources: Hanssens, Parsons & Schultz (2001) "Market Response Models," 2nd Ed., and Jin et al. (Google, 2017) Bayesian MMM. Contains 31 notes organized across 6 subfolders.
> - Need overview and management framework? → [[Research/Market Response Models/Introduction/_Index|Introduction]]
> - Need functional forms (linear, power, ADBUDG, MCI/MNL) with LaTeX + elasticities? → [[Research/Market Response Models/Static Response Models/_Index|Static Response Models]]
> - Need Koyck/ADL carryover, reaction functions, hysteresis? → [[Research/Market Response Models/Dynamic Response Models/_Index|Dynamic Response Models]]
> - Need OLS/GLS/2SLS/Bayesian estimation, specification tests? → [[Research/Market Response Models/Estimation and Testing/_Index|Estimation and Testing]]
> - Need ARIMA, transfer functions, VAR, cointegration, ECM? → [[Research/Market Response Models/Time Series Analysis/_Index|Time Series Analysis]]
> - Need advertising/price/promotion empirical elasticities and optimal decisions? → [[Research/Market Response Models/Empirical Findings and Applications/_Index|Empirical Findings and Applications]]
> - Need **Bayesian MMM** (adstock/carryover, Hill saturation, MCMC priors, ROAS/mROAS, optimal media mix, BIC selection)? → [[Research/Market Response Models/Bayesian Media Mix Modeling/_Index|Bayesian Media Mix Modeling]]

## Concept Map

| Subfolder | Notes | Key Concepts |
|-----------|-------|-------------|
| [[Research/Market Response Models/Introduction/_Index\|Introduction]] | 3 | MRM framework, simultaneous system, management tasks, scanner data, GRPs |
| [[Research/Market Response Models/Static Response Models/_Index\|Static Response Models]] | 4 | 10 functional forms, MCI/MNL market share, aggregation bias, SCAN*PRO |
| [[Research/Market Response Models/Dynamic Response Models/_Index\|Dynamic Response Models]] | 4 | Koyck, PDL, ADL, ratchet/hysteresis, reaction functions, S-shape, pulsing |
| [[Research/Market Response Models/Estimation and Testing/_Index\|Estimation and Testing]] | 4 | OLS, GLS, SUR, 2SLS, Bayes HB/EB, RESET, specification errors, AIC/BIC |
| [[Research/Market Response Models/Time Series Analysis/_Index\|Time Series Analysis]] | 4 | ARIMA, transfer functions, VAR, cointegration, ECM, Granger causality |
| [[Research/Market Response Models/Empirical Findings and Applications/_Index\|Empirical Findings]] | 5 | Advertising elasticity ≈ 0.10, price ≈ −2.5, Dorfman-Steiner, DSS |
| [[Research/Market Response Models/Bayesian Media Mix Modeling/_Index\|Bayesian Media Mix Modeling]] | 6 | Adstock (geometric/delayed) carryover, Hill/logistic saturation, Bayesian MCMC + priors, ROAS/mROAS, optimal media mix, BIC model selection (Jin et al., Google 2017) |

## Key Equations Quick Reference

| Equation | Description |
|----------|-------------|
| $Q_t = \gamma_{12}A_t + \beta_{11}Y_t + \beta_{12}N_t + \beta_{13} + u_{1t}$ | Structural sales equation (Eq 1.1) |
| $Q = e^{\beta_0}X^{\beta_1}$; $\eta = \beta_1$ | Power/log-log constant elasticity (Eq 3.x) |
| $Q_t = (1-\lambda)\beta_0 + \beta_1(1-\lambda)X_t + \lambda Q_{t-1} + v_t$ | Koyck transformation (Eq 4.10) |
| $\hat{\boldsymbol\beta} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{q}$ | OLS (Eq 5.5) |
| $\Phi(L)z_t = \Theta(L)w_t$ | ARMA general form (Eq 6.11) |
| $y_t = \alpha_0 + V(L)x_t + n_t$ | Transfer function impulse response (Eq 7.8) |
| $\Phi(L)\mathbf{z}_t = \boldsymbol\alpha_0 + \mathbf{w}_t$ | VAR model (Eq 7.22) |
| $\Delta Y_t = \alpha_0 + \alpha_1\Delta Y_{t-1} + \alpha_2\Delta X_{t-1} + \alpha_3 e_{t-1} + u_t$ | Error-correction model (Eq 7.29) |
| $A^*/S^* = \eta_{QA} / |\eta_{QP}|$ | Dorfman-Steiner optimal A/S ratio |

## Empirical Generalizations Summary

| Marketing Instrument | Short-Run Elasticity | Long-Run Elasticity | Duration |
|---------------------|---------------------|---------------------|---------|
| Advertising | 0.10–0.22 | ≈ 2× short-run | 6–9 months (90%) |
| Price (own) | −2.5 | Similar | Immediate |
| Price (cross) | +0.52 | — | — |
| Coupon | +0.07 | — | — |
| Display/Feature | Multiplier 1.5–2.6× | Low persistence | In-period |
| Distribution | High | High (sticky) | Long-run |

## Cross-Links to Existing Vault Notes

- **Econometrics**: [[Regression and the CEF]], [[Omitted Variables Bias]], [[Instrumental Variables]], [[Differences-in-Differences]]
- **Bayesian**: [[Bayesian Workflow - Overview]], [[Hierarchical Linear Models]], [[Model Comparison]]
- **Research Methodology**: [[Garden of Forking Paths]], [[Power Analysis and Sample Size]], [[Multiple Testing Corrections]]
- **Causal Inference**: [[Activity Bias in Advertising]], [[Directed Acyclic Graphs]], [[Conditional Independence Assumption]]
- **Consumer Behavior**: [[Product Adoption and Diffusion Models]], [[Logit Purchase Decision Model]]

## Source

- [[raw/Market Response Models Econometric and Time Series Analysis.pdf|Market Response Models Econometric and Time Series Analysis]] — Hanssens, Parsons & Schultz (2001), Kluwer Academic Publishers, 2nd Edition, 455 pp.
- [[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]] — Jin, Wang, Sun, Chan & Koehler (Google, 2017), "Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects": adstock, Hill saturation, MCMC estimation, ROAS/mROAS, optimal media mix, BIC selection, shampoo case study
