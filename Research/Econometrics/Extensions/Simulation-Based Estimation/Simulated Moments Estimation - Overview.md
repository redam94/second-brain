---
title: "Simulated Moments Estimation - Overview"
tags:
  - source/ingested
  - topic/econometrics
  - type/overview
  - doc/paper
source: "[[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]]"
source_location: "§1 Introduction, pp. 929-930"
date_ingested: 2026-06-27
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Method of Simulated Moments]]"
  - "[[Simulation-Based Estimation - Overview]]"
used_by:
  - "[[Duffie-Singleton Asset-Pricing Model]]"
  - "[[Simulated Moments Estimator Definition]]"
  - "[[SME Consistency]]"
  - "[[SME Asymptotic Distribution]]"
aliases:
  - SME
  - Simulated Moments Estimator
  - Duffie Singleton 1993
  - Duffie-Singleton SME
---

# Simulated Moments Estimation - Overview

> [!summary]
> Duffie & Singleton (1993) develop the **Simulated Moments Estimator (SME)**: an extension of [[Method of Simulated Moments|GMM]] to dynamic asset-pricing models whose moment restrictions have **no analytic representation** in terms of observable variables and the parameter vector. The estimator matches sample moments of the data, $f(Y_t, \beta_0)$, to sample moments of a **simulated** equilibrium series $f(Y_s^\beta, \beta)$, choosing $\beta$ to minimize the distance. The paper's contribution is the rigorous large-sample theory — consistency (weak and strong) and asymptotic normality — under conditions on the Markov state process that overcome two problems unique to simulation: the **nonstationarity** of the simulated series and the **feedback dependence** of the entire simulated path on $\beta$.

## Overview

Many dynamic structural/asset-pricing models are characterized by a time-homogeneous Markov state vector $Y_t$ whose transition depends on an unknown parameter $\beta_0$. Asset prices are observed as $f(Y_t, \beta_0)$ for some function $f$. When the mapping $\beta \mapsto \mathbb{E}[f(Z_t, \beta)]$ is **known analytically**, [[Method of Simulated Moments|Hansen's (1982) GMM]] applies. But for a large class of asset-pricing models (e.g. with unobserved taste shocks, where [[Method of Simulated Moments|Euler-equation GMM]] is infeasible) this expectation has no closed form. The SME replaces the population moment $\mathbb{E}[f(Z_t,\beta)]$ with a **Monte-Carlo sample counterpart** computed from a simulated equilibrium series.

This note is the entry point for the Duffie–Singleton (1993) paper; the formal estimator, its assumptions, and its asymptotics are developed in the linked notes.

## Main Content

### Research question

How can one consistently estimate, and characterize the asymptotic distribution of, the parameter $\beta_0$ of a **time-series** asset-pricing model when the model's moment restrictions cannot be written analytically as a function of observables and $\beta$ — and must instead be approximated by simulating the model?

### The estimator in one line

Match data moments to simulated moments:
$$
b_T = \arg\min_{\beta \in \Theta} G_T(\beta)' W_T G_T(\beta),
\qquad
G_T(\beta) = \frac{1}{T}\sum_{t=1}^{T} f_t^* - \frac{1}{\mathcal{T}(T)}\sum_{s=1}^{\mathcal{T}(T)} f_s^\beta,
$$
where $f_t^*$ are observed-data moments and $f_s^\beta$ are moments of a simulated series of length $\mathcal{T}(T)$. See [[Simulated Moments Estimator Definition]].

### Two problems that simulation creates (and the paper's answers)

Standard GMM/SME regularity conditions (Hansen 1982; Andrews 1987; Lee & Ingram 1991; McFadden 1989; Pakes & Pollard 1989) do **not** directly apply to estimation of *time-series* models by simulation, for two reasons:

1. **Nonstationarity of the simulated series.** Pre-sample values are needed to simulate a time series, but the model's stationary distribution (as a function of $\beta$) is unknown, so the simulation is generally started off its ergodic distribution and is therefore **nonstationary**. → *Answer:* assume **geometric ergodicity** of the state process, so simulated processes are asymptotically stationary with an ergodic distribution independent of starting values. See [[Geometric Ergodicity and Uniform LLN]].

2. **Parameter feedback through the law of motion.** Functions of the current simulated state depend on $\beta$ both through the model (as in any GMM problem) **and** indirectly through the entire simulated history, because $\beta$ enters the transition law. This compounding feedback breaks the first-moment-continuity conditions used by Hansen (1982)/Andrews (1987). → *Answer:* impose a **damping condition** on the feedback effect — the "Asymptotic Unit-Circle (AUC) condition" — so past shocks decay geometrically. See [[SME Consistency]].

### Structure of the paper / note map

| Section | Content | Note |
|---------|---------|------|
| §2 | Illustrative stochastic-growth asset-pricing model | [[Duffie-Singleton Asset-Pricing Model]] |
| §3 | Formal definition of the SME | [[Simulated Moments Estimator Definition]] |
| §4.1–4.2 | Geometric ergodicity + uniform weak LLN | [[Geometric Ergodicity and Uniform LLN]] |
| §4.3–4.5 | Weak & strong consistency (Theorems 1–3) | [[SME Consistency]] |
| §5 | Asymptotic normality (Theorem 4, Cor. 3.1) | [[SME Asymptotic Distribution]] |
| §6 | Extensions: $\beta$-dependent moments, calculated moments, measurement error, option pricing | [[SME Extensions and Applications]] |

## Connections

- **Extends** [[Method of Simulated Moments]] / Hansen (1982) GMM from analytic to simulated moments, and from i.i.d. (McFadden 1989; Pakes & Pollard 1989) to **time-series** Markov settings (cf. Lee & Ingram 1991).
- The applied MSM/SMM workflow in [[Method of Simulated Moments]] and [[SMM Weighting Matrix and Inference]] is the practitioner's version of this estimator; this paper supplies its time-series asymptotic theory.
- Contrast with [[Indirect Inference]] / [[Efficient Method of Moments]], which match an auxiliary model rather than raw moments.

## See Also

- [[Simulation-Based Estimation - Overview]] — the broader sub-topic overview (MSM vs. indirect inference vs. EMM)
- [[Duffie-Singleton Asset-Pricing Model]] — the motivating example
- [[Simulated Moments Estimator Definition]] — the formal estimator
