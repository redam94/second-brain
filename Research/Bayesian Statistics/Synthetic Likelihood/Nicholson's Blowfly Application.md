---
title: "Nicholson's Blowfly Application"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/likelihood-free-inference
  - type/example
  - doc/paper
source: "[[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]]"
source_location: "Figs. 3-4, 'Blowfly statistics', pp. 5-8"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Synthetic Likelihood"
doc_type: paper
depends_on:
  - "[[Synthetic Likelihood Construction]]"
  - "[[Synthetic Likelihood - Overview]]"
used_by: []
aliases:
  - Nicholson blowfly
  - Gurney-Nisbet blowfly model
  - blowfly limit cycles
---

# Nicholson's Blowfly Application

> [!summary]
> The flagship application of the [[Synthetic Likelihood - Overview|synthetic likelihood]]: resolving a decades-old question about Nicholson's classic sheep-blowfly experiments. A stochastic version of the Gurney–Nisbet delay-differential model is fit by synthetic-likelihood MCMC to four experimental replicates. The full model (environmental + demographic stochasticity) fits *quantitatively* ($\chi^2$ $p > 0.2$), while a demographic-stochasticity-only simplification is decisively rejected ($p \ll 0.002$; $\Delta$AIC $> 1800$). Overlaying the fitted parameters on Gurney–Nisbet's stability diagram shows the dynamics are **intrinsically-driven limit cycles perturbed by noise**, not stochastically-forced quasi-cycles — settling whether the fluctuations are noise-driven (they are not).

## Overview

Nicholson's blowfly populations exhibit large, irregular cycles. Gurney & Nisbet (1980) gave the first plausible mechanistic model, but for the food-limited replicates it was impossible to decide — with the ad hoc estimation methods then available — whether the fluctuations were externally-forced quasi-cycles or intrinsic limit cycles, because plausibly-parameterized models are chaotic or near-chaotic. The synthetic likelihood provides the missing quantitative inference.

## Main Content

> [!definition] Gurney–Nisbet delay model and its stochastic discretization (Wood 2010, Eqs. 3-4)
> The continuous model for adult population $N$:
> $$
> \frac{dN}{dt} = P\,N(t-\tau)\,e^{-N(t-\tau)/N_0} - \delta N(t),
> $$
> with parameters $P, N_0, \delta, \tau$; depending on values, dynamics range from stable equilibrium to chaos. Discretized with a daily timestep and demographic stochasticity ($N_{t+1} = R_t + S_t$):
> $$
> R_t \sim \text{Poi}\bigl\{ P\,N_{t-\tau}\,\exp(-N_{t-\tau}/N_0)\,e_t \bigr\},
> \qquad
> S_t \sim \text{binom}\bigl\{ \exp(-\delta\epsilon_t),\ N_t \bigr\},
> $$
> i.e. egg production is an independent Poisson process per female, and each adult survives a day with probability $\exp(-\delta\epsilon_t)$. The **environmental-stochasticity** terms $e_t$, $\epsilon_t$ are independent Gamma deviates with mean 1 and variances $\sigma_p^2$, $\sigma_d^2$. The simplified, **demographic-only** model sets $e_t = \epsilon_t = 1$.
> ^def-blowfly-model

### Summary statistics used

> [!definition] Blowfly summary statistics (Wood 2010, "Blowfly statistics")
> Autocovariances to lag 11; the cubic-regression "difference distribution" summary (as in the Ricker example); $\text{mean}\{N_t\}$; $\text{mean}\{N_t\} - \text{median}\{N_t\}$; the number of turning points observed; and the estimated coefficients $\hat{\boldsymbol\beta}$ of the autoregression
> $$
> N_i = \beta_0 N_{i-12} + \beta_1 N_{i-12}^2 + \beta_2 N_{i-12}^3 + \beta_3 N_{i-2} + \beta_4 N_{i-2}^2 + \varepsilon_i.
> $$
> ^def-blowfly-statistics

### Results

> [!example] Full vs. demographic-only model fit (Wood 2010, Fig. 3)
> Both models were fit to each of four experimental replicates with MCMC chains of 50,000 iterations.
> - **Full model (4):** good $\chi^2$ fit ($p > 0.2$) in all cases; simulated replicates qualitatively reproduce the irregular cycles (Fig. 3e–h).
> - **Demographic-only model:** very bad fit ($p \ll 0.002$) in all cases; produces *insufficiently variable* dynamics (Fig. 3i–l).
> - **Model comparison:** AIC differences $> 1800$ favoring the full model for all four replicates.
>
> The comprehensive rejection of the demographic-only model is because demographic stochasticity alone cannot produce the irregularity of the real cycles. So the stochastic Nisbet–Gurney model is not just qualitatively plausible — it fits *quantitatively*.
> ^ex-model-fit

> [!example] Limit cycles, not noise-driven (Wood 2010, Fig. 4)
> Uncontrolled experimental variability dwarfs demographic stochasticity, raising the question of whether *that* drove the fluctuations rather than merely perturbing them. Overlaying 1,500 values of the stability-controlling parameters $P\tau$ and $\delta\tau$ — sampled from the second half of each replicate's MCMC chain — on Gurney & Nisbet's stability diagram for model (3) shows the parameter clouds sit in the region where the **deterministic skeleton has limit-cycle (not stable-equilibrium) dynamics**.
>
> **Conclusion:** there is extremely strong statistical evidence that Nicholson's blowfly fluctuations are **limit cycles perturbed by noise** — intrinsically driven by the population dynamics — and would have occurred no matter how constant the conditions or how large the cultures. They are *not* the result of stochastic forcing or resonance excitation, despite decisive evidence for stochasticity well above demographic levels.
> ^ex-limit-cycles

## Connections

- A worked demonstration of the [[Synthetic Likelihood Construction|synthetic-likelihood algorithm]] ($l_s$, MCMC, $\chi^2$ diagnostic, AIC) on real data.
- The stochastic Gurney–Nisbet model is a delayed, demographically-and-environmentally noisy population model — the ecological analog of the structural dynamic models fit by [[Simulated Moments Estimation - Overview|simulated moments]] and calibrated by [[Approximate Bayesian Computation for ABMs|ABC]].
- Model selection by [[Model Comparison|AIC]] mirrors standard likelihood-based comparison, made possible here by the synthetic likelihood.

## See Also

- [[Synthetic Likelihood - Overview]] — the method and its broader significance
- [[Synthetic Likelihood Construction]] — the estimator used to fit these models
- [[Chaos and Phase-Insensitive Statistics]] — why these particular statistics were chosen
