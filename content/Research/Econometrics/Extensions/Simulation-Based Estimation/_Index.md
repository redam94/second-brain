---
title: "Index: Simulation-Based Estimation"
tags:
  - type/index
  - source/ingested
parent: "[[../Extensions/_Index|Extensions]]"
date_updated: 2026-06-27
concept_count: 15
---

# Simulation-Based Estimation

> [!abstract] Routing Summary
> This folder covers simulation-based estimation methods — the general framework for estimating structural models when moment conditions or likelihoods are intractable. Contains 15 notes from Liesenfeld & Breitung (1998), Evans (2024) Ch. 19, and Duffie & Singleton (1993) Econometrica (the foundational time-series SME theory).
> - Need the high-level overview (MSM vs. indirect inference vs. EMM)? → [[Simulation-Based Estimation - Overview]]
> - Need the **rigorous time-series SME theory** (Duffie–Singleton 1993: consistency, asymptotic normality for Markov asset-pricing models)? → [[Simulated Moments Estimation - Overview]]
> - Need the formal SME definition (primitives $H,f$; simulated state; $G_T$; estimator)? → [[Simulated Moments Estimator Definition]]
> - Need geometric ergodicity / uniform LLN conditions for simulated series? → [[Geometric Ergodicity and Uniform LLN]]
> - Need SME weak/strong consistency + the AUC unit-circle condition? → [[SME Consistency]]
> - Need the SME limiting distribution + the $(1+\tau)$ simulation-noise inflation? → [[SME Asymptotic Distribution]]
> - Need SME extensions ($\beta$-dependent moments, calculated-vs-simulated efficiency, measurement error, option pricing)? → [[SME Extensions and Applications]]
> - Need MSM/SMM theory (criterion function, consistency, asymptotic normality)? → [[Method of Simulated Moments]]
> - Need indirect inference (auxiliary model as moments)? → [[Indirect Inference]]
> - Need asymptotically efficient simulation estimation (SNP/score-based)? → [[Efficient Method of Moments]]
> - Need variance reduction, step sizes, common random numbers? → [[Practical Issues in Simulation Estimation]]
> - Need weighting matrix strategies (identity, two-step, Newey-West) and Σ̂? → [[SMM Weighting Matrix and Inference]]
> - Need Python code (scipy workflow, eps fix, Jacobian)? → [[SMM Python Implementation]]
> - Need the Brock-Mirman (1972) structural macro exercise (latent TFP, policy function, 6 moments, 4 params)? → [[Brock-Mirman Model - SMM Estimation Exercise]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| MSM vs. indirect inference vs. EMM — overview | [[Simulation-Based Estimation - Overview]] | overview | [[Standard Errors and Clustering]], [[Copula Estimation]] | Replace intractable criteria with Monte Carlo; variance inflated by $(1+1/R)$ |
| MSM criterion function, consistency, asymptotic normality | [[Method of Simulated Moments]] | concept/theorem | [[Simulation-Based Estimation - Overview]] | Consistent for any $R \geq 1$; variance inflated by $(1+1/R)$ |
| Auxiliary model approach: min-distance and score-based | [[Indirect Inference]] | concept/theorem | [[Method of Simulated Moments]] | Match auxiliary model estimates between real and simulated data |
| SNP density, EMM procedure, asymptotic efficiency | [[Efficient Method of Moments]] | concept/theorem | [[Indirect Inference]] | Achieves MLE efficiency via flexible SNP auxiliary model |
| Common RNGs, variance reduction, step sizes | [[Practical Issues in Simulation Estimation]] | concept | [[Method of Simulated Moments]], [[Indirect Inference]] | Step size must be $\gg 1/\sqrt{T}$; never use software defaults |
| Identity W, two-step W, Newey-West W, Σ̂_SMM via Jacobian | [[SMM Weighting Matrix and Inference]] | concept/theorem | [[Method of Simulated Moments]], [[Standard Errors and Clustering]] | Optimal W = Ω̂⁻¹; Σ̂ = (1/S)[dᵀWd]⁻¹ |
| Python workflow: scipy, eps stepsize fix, numerical Jacobian | [[SMM Python Implementation]] | tutorial | [[SMM Weighting Matrix and Inference]], [[Method of Simulated Moments]], [[Practical Issues in Simulation Estimation]] | L-BFGS-B needs `options={'eps': 1.0}` when moments are in the 100s |
| Brock-Mirman (1972) model: system, policy function, 6-moment SMM exercise | [[Brock-Mirman Model - SMM Estimation Exercise]] | example | [[SMM Python Implementation]], [[SMM Weighting Matrix and Inference]] | Latent TFP motivates SMM; policy function $k_{t+1} = \alpha\beta e^{z_t}k_t^\alpha$ enables efficient simulation |
| SME (Duffie–Singleton 1993): paper overview, 2 simulation challenges | [[Simulated Moments Estimation - Overview]] | overview | [[Method of Simulated Moments]] | Simulate moments when $\mathbb{E}[f(Z_t,\beta)]$ has no closed form; handles nonstationarity + parameter feedback |
| Stochastic-growth asset-pricing model (Brock/Michener + taste shock) | [[Duffie-Singleton Asset-Pricing Model]] | example | [[Simulated Moments Estimation - Overview]] | Unobserved taste shock makes Euler-GMM infeasible → simulate; closed-form $k_{t+1}=\delta\phi z_t k_t^\phi$ |
| Formal SME definition ($H,f$; $G_T$; $b_T$) | [[Simulated Moments Estimator Definition]] | definition | [[Duffie-Singleton Asset-Pricing Model]], [[Method of Simulated Moments]] | $b_T=\arg\min G_T(\beta)'W_T G_T(\beta)$; replaces $\mathbb{E}[f]$ with simulated mean |
| Geometric ergodicity, Condition B, uniform weak LLN | [[Geometric Ergodicity and Uniform LLN]] | theorem | [[Simulated Moments Estimator Definition]] | $\rho$-ergodicity (Lemma 1, Mokkadem) + uniform weak LLN (Lemma 2) |
| SME weak/strong consistency, AUC & $L^2$-UC conditions | [[SME Consistency]] | theorem | [[Geometric Ergodicity and Uniform LLN]] | Thm 1 (weak, ergodicity); Thms 2–3 (strong, AUC damping) |
| SME asymptotic normality, simulation-noise inflation | [[SME Asymptotic Distribution]] | theorem | [[SME Consistency]] | $\sqrt T(b_T-\beta_0)\Rightarrow N[0,(1+\tau)(D_0'\Sigma_0^{-1}D_0)^{-1}]$ |
| SME extensions: $g^\beta$, calculated moments, measurement error, options | [[SME Extensions and Applications]] | concept | [[SME Asymptotic Distribution]] | Calculated moments cut variance; option price via iterated-expectations |

## Notes

- [[Simulation-Based Estimation - Overview]] — CONTAINS: MSM vs. indirect inference vs. EMM comparison, SV and diffusion motivating examples, $(1+1/R)$ variance structure
- [[Method of Simulated Moments]] — CONTAINS: MSM criterion function, conditional vs. unconditional moments, consistency theorem, asymptotic normality, optimal weight matrix, SV model example
- [[Indirect Inference]] — CONTAINS: Binding function, minimum distance estimator, score-based estimator, auxiliary model choice, smoothly embedded condition
- [[Efficient Method of Moments]] — CONTAINS: SNP density (location, scale, Hermite polynomial), EMM estimator, asymptotic efficiency theorem, model selection for SNP
- [[Practical Issues in Simulation Estimation]] — CONTAINS: Common random numbers, antithetic variates, control variates, auxiliary model selection strategies, step-size guidelines, simulation size trade-offs, implementation checklist
- [[SMM Weighting Matrix and Inference]] — CONTAINS: Identity W, two-step W procedure (R×S error matrix, Ω̂₂ = (1/S)EEᵀ, W̃ = Ω̂₂⁻¹), iterated W, Newey-West HAC W, Σ̂_SMM via Jacobian, identification (exact/over/under)
- [[SMM Python Implementation]] — CONTAINS: General Python SMM workflow, fixed random draws, trunc_norm_draws (inverse CDF), err_vec/criterion functions, L-BFGS-B eps stepsize fix, numerical Jacobian, two-step W code, indirect inference pattern, results comparison table
- [[Brock-Mirman Model - SMM Estimation Exercise]] — CONTAINS: BM1972 six-equation system, latent TFP AR(1), closed-form policy function, simulation algorithm, 6-moment estimation setup (mean c, mean k, mean c/y, var y, corr(c,c-1), corr(c,k)), two-part exercise (identity W + two-step W)
- [[Simulated Moments Estimation - Overview]] — CONTAINS: research question, SME-extends-GMM contribution, the two simulation challenges (nonstationarity, parameter feedback), section/note map
- [[Duffie-Singleton Asset-Pricing Model]] — CONTAINS: production/firm (Eqs. 2.1–2.2), consumer w/ taste shock (2.3–2.4), Markov state & augmented state (2.5–2.6), closed-form special case (4.4–4.5), conditionally-heteroskedastic counterexample (4.11)
- [[Simulated Moments Estimator Definition]] — CONTAINS: primitives $H,f$; actual & simulated state processes (3.1, 3.3); moment gap $G_T$ (3.4); SME (3.5); GMM comparison (3.2)
- [[Geometric Ergodicity and Uniform LLN]] — CONTAINS: $\rho$-ergodic / geometrically ergodic def (4.1), Condition B (4.2), Lemma 1 (Mokkadem), Lipschitz-uniformly-in-probability def, Lemma 2 (uniform weak LLN, 4.7)
- [[SME Consistency]] — CONTAINS: Assumptions 1–4, Theorem 1 (weak consistency), AUC condition (4.9), $S$-smoothness, Lemmas 3–4, Theorem 2 & Theorem 3 (strong consistency, $L^2$-UC), weak-vs-strong model classes
- [[SME Asymptotic Distribution]] — CONTAINS: Assumptions 6–7, Theorem 4 ($\sqrt T G_T(\beta_0)\Rightarrow N[0,\Sigma_0(1+\tau)]$), Corollary 3.1 ($\Lambda=(1+\tau)(D_0'\Sigma_0^{-1}D_0)^{-1}$), efficiency interpretation, $D(\beta)$ rank diagnostic (5.6)
- [[SME Extensions and Applications]] — CONTAINS: $\beta$-dependent observation $g^\beta$ (6.1–6.4), $\Sigma_{f,g,\tau}=\tau\Sigma_0+\Sigma_1$, calculated-vs-simulated efficiency gain, measurement error, option-pricing via iterated expectations

## Sources

- tdb136 — Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- 19 — Evans (2024), Computational Methods for Economists, Ch. 19: full SMM tutorial with Python code, truncated normal example, Brock-Mirman exercise
- Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices — Duffie & Singleton (1993), Econometrica 61(4):929–952: foundational SME theory for time-series Markov asset-pricing models (geometric ergodicity, AUC condition, consistency Thms 1–3, asymptotic normality Thm 4)

## See Also

- [[Research/Econometrics/Extensions/Copula SMM/_Index|Copula SMM]] — application of these methods to copula models (Oh & Patton 2011)
- [[Standard Errors and Clustering]] — analogous HAC inference in GMM/OLS
- [[Copula Estimation]] — Bayesian alternative for copula models
