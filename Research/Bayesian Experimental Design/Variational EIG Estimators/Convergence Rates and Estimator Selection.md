---
title: Convergence Rates and Estimator Selection
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/theorem
  - doc/paper
source: "[[raw/Foster et al 2019 - Variational Bayesian Optimal Experimental Design.pdf]]"
source_location: "Foster 2019 §4 (Theorem 1), §5, §6 (Tables 1–2), Appendix B"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Variational EIG Estimators"
doc_type: paper
depends_on:
  - "[[Variational BOED - Overview]]"
  - "[[Nested Estimation and Nested Monte Carlo]]"
used_by:
  - "[[Unified SGD BOED - Overview]]"
aliases:
  - EIG estimator convergence
  - Theorem 1 Foster 2019
  - Estimator selection BOED
---

# Convergence Rates and Estimator Selection

> [!summary]
> The variational EIG estimators converge at $\mathcal{O}(T^{-1/2})$ in total cost $T=\mathcal{O}(N+K)$ — matching ordinary Monte Carlo and beating NMC's $\mathcal{O}(T^{-1/3})$ — *when the variational family contains the target*. The error decomposes into MC variance (term I, $\propto N^{-1/2}$), optimization gap (term II, $\propto K^{-1/2}$), and an irreducible family-misspecification bias (term III). This note states the convergence theorem, summarizes the empirical bias²/variance comparison, and gives the practical rules for **choosing among the four estimators**.

## Overview

Foster 2019 §4 breaks the total error of a variational EIG estimator $\hat\mu(d,\phi_K)$ into three terms via the triangle inequality, where $\mathcal{B}(d,\phi)$ is the bound (e.g. $\mathcal{L}_{\text{post}}$, $\mathcal{U}_{\text{marg}}$, $\mathcal{U}_{\text{VNMC}}$) and $\phi^\*$ its optimal parameters:
$$\underbrace{\|\hat\mu(d,\phi_K)-\mathrm{EIG}(d)\|_2}_{\text{total error}} \le \underbrace{\|\hat\mu(d,\phi_K)-\mathcal{B}(d,\phi_K)\|_2}_{\text{I: MC variance}} + \underbrace{\|\mathcal{B}(d,\phi_K)-\mathcal{B}(d,\phi^\*)\|_2}_{\text{II: optimization}} + \underbrace{|\mathcal{B}(d,\phi^\*)-\mathrm{EIG}(d)|}_{\text{III: family gap}}.$$
Term I shrinks as $N^{-1/2}$ (LLN); term II shrinks as $K^{-1/2}$ (stochastic optimization); term III is a *constant* removable only by enlarging the variational family (or, for VNMC, by increasing $L$).

## Main Content

> [!theorem] Theorem 1 — $\mathcal{O}(T^{-1/2})$ convergence (Foster 2019, §4)
> Let $\mathcal{X}$ be a measurable space, $\Phi$ a convex subset of a finite-dimensional inner-product space, $X_1,X_2,\dots\overset{\text{i.i.d.}}{\sim}\mathcal{X}$, and $f:\mathcal{X}\times\Phi\to\mathbb{R}$ measurable. For $\mu(\phi):=\mathbb{E}[f(X_1,\phi)]$ and $\hat\mu_N(\phi):=\frac1N\sum_n f(X_n,\phi)$, if $\sup_{\phi\in\Phi}\|f(X_1,\phi)\|_2<\infty$ then $\sup_\phi\|\hat\mu_N(\phi)-\mu(\phi)\|_2=\mathcal{O}(N^{-1/2})$. If additionally $\phi^\*$ is the unique minimizer and (Assumption 1) holds, then after $K$ steps of Polyak–Ruppert-averaged SGD, $\|\mu(\phi_K)-\mu(\phi^\*)\|_2=\mathcal{O}(K^{-1/2})$, so
> $$\|\hat\mu_N(\phi_K)-\mu(\phi^\*)\|_2 = \mathcal{O}(N^{-1/2}+K^{-1/2}) = \mathcal{O}(T^{-1/2}) \quad\text{if } N\propto K.$$
> Applies directly to $\hat\mu_{\text{marg}}$, $-\hat\mu_{\text{post}}$, and $\hat\mu_{\text{VNMC}}$ (with $M=L$); via Lemma 2 to $\hat\mu_{m+\ell}$. **Total cost $T=\mathcal{O}(N+K)$**, versus NMC's $T=\mathcal{O}(NM)$.
^thm1-convergence

> [!theorem] VNMC asymptotic debiasing (Foster 2019, §4)
> Because $\mathcal{U}_{\text{VNMC}}(d,L)\to\mathrm{EIG}(d)$ as $L\to\infty$, term III can be driven to zero without enlarging the family. Train $\phi$ with fixed $L$ at rate $\mathcal{O}(K^{-1/2})$ until the family gap dominates, then increase $N,M$ with $M\propto\sqrt N$ so $\hat\mu_{\text{VNMC}}$ converges at $\mathcal{O}((NM)^{-1/3})$. Total cost $T=\mathcal{O}(KL+NM)$: a fast variational stage plus a slower NMC refinement.
^thm-vnmc-debias

### Empirical comparison (Foster 2019, Table 2)

Bias² and variance over 5 runs on four benchmarks (lower MSE in **bold**):

| Estimator | A/B test | Preference | Mixed effects | Extrapolation |
|-----------|----------|------------|---------------|---------------|
| $\hat\mu_{\text{post}}$ | good | good | — | best var |
| $\hat\mu_{\text{marg}}$ | — | **best** | — | — |
| $\hat\mu_{\text{VNMC}}$ | good | good | — | — |
| $\hat\mu_{m+\ell}$ | — | — | **best** | **best** |
| NMC (baseline) | poor | poor | — | — |
| Laplace (baseline) | **best** (exact) | — | — | — |

Takeaways: **Laplace** wins only on the Gaussian A/B model where it is exact; all variational estimators **outperform NMC**; the **implicit** estimators ($\hat\mu_{m+\ell}$) win on the implicit-likelihood problems.

### Estimator-selection rules (Foster 2019 §5, Table 1)

1. **Dimension.** $\hat\mu_{\text{marg}}$ and $\hat\mu_{m+\ell}$ approximate a distribution over $y$ — prefer them when $\dim(y)\ll\dim(\theta)$. $\hat\mu_{\text{post}}$ and $\hat\mu_{\text{VNMC}}$ approximate a distribution over $\theta$ — prefer when $\dim(\theta)\ll\dim(y)$.
2. **Explicit vs implicit likelihood.** $\hat\mu_{\text{marg}}$ and $\hat\mu_{\text{VNMC}}$ require an explicit likelihood; $\hat\mu_{\text{post}}$ and $\hat\mu_{m+\ell}$ do not. With an explicit likelihood, prefer $\hat\mu_{m+\ell}$ over $\hat\mu_{\text{marg}}$ (use the known likelihood).
3. **Consistency vs speed.** $\hat\mu_{\text{VNMC}}$ is the only one guaranteed to converge to the true EIG even when the variational family is wrong — prefer it when compute is not constrained; prefer the others when it is.
4. **Bounds.** Pair a lower ($\hat\mu_{\text{post}}$) and an upper ($\hat\mu_{\text{marg}}$/$\hat\mu_{\text{VNMC}}$) bound to **sandwich** the true EIG of competing designs.

## Examples

> [!example] Optimal budget split (Foster 2019, Fig. 1d)
> Fixing total budget $T=N+K$ and sweeping the ratio $K/T$, RMSE is minimized for $K/T$ between roughly **0.5 and 0.9** — i.e. spend a majority of the budget on variational optimization, the rest on the final MC estimate. Setting $N\propto K$ recovers the theoretical $\mathcal{O}(T^{-1/2})$ rate (Fig. 1c).

## Connections

- **Quantifies the payoff** over [[Nested Estimation and Nested Monte Carlo|NMC]]: $\mathcal{O}(T^{-1/2})$ vs $\mathcal{O}(T^{-1/3})$.
- **Selection rules** are referenced throughout [[Variational BOED - Overview]] and inherited by [[Unified SGD BOED - Overview|Foster 2020]], which adds the design gradient.
- **Strong assumptions** (Assumption 1 for SGD convergence); in practice $\phi$ converges to a *local* optimum $\phi^\dagger$, adding $|\mathcal{B}(d,\phi^\dagger)-\mathcal{B}(d,\phi^\*)|$ to term III.

## See Also
- [[Variational Posterior Estimator (Barber-Agakov)]] · [[Variational Marginal Estimator]] · [[Variational NMC Estimator]] · [[Implicit Likelihood Estimator]] — the four estimators
- [[Unified SGD BOED - Overview]] — the next step: differentiate the bound in the design too
