---
title: Factor Copula Application - S&P 100 and Systemic Risk
tags:
  - source/ingested
  - topic/econometrics
  - type/example
  - doc/paper
source: "[[raw/Oh-Patton-2012-Factor-Copulas.pdf]]"
source_location: "Sec. 3.3, pp. 14-18; Sec. 4, pp. 18-25; Tables 1-11"
date_ingested: 2026-06-17
date_updated: 2026-06-29
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[SMM Estimation of Factor Copulas]]"
  - "[[Tail Dependence in Factor Copulas]]"
  - "[[Multi-Factor and Block Dependence Structures]]"
used_by: []
aliases:
  - S&P 100 factor copula application
  - factor copula systemic risk
  - marginal expected shortfall factor copula
---

# Factor Copula Application - S&P 100 and Systemic Risk

> [!summary]
> The finite-sample simulation study (up to $N=100$) confirms the SMM estimator and its asymptotic theory work well. The empirical application to all 100 S&P 100 constituents (2008-2010) finds a **fat-tailed, left-skewed common factor**: significant tail dependence, heterogeneous (industry-driven) dependence, and **asymmetric dependence — crashes more correlated than booms**. The Normal copula is rejected; the skew $t$-$t$ factor copula fits best and yields **superior estimates of systemic-risk measures** (marginal expected shortfall and a multi-stock variant).

## Overview

This note collects the empirical results: the Monte Carlo validation, the equidependence and block-equidependence estimates, the asymmetric/tail-dependence findings, and the systemic-risk application. The methods are in [[SMM Estimation of Factor Copulas]]; the models in [[Multi-Factor and Block Dependence Structures]]; the tail-dependence theory in [[Tail Dependence in Factor Copulas]].

## Main Content

> [!definition] Simulation design and results (Sec. 3.3, Tables 1-5)
> Three factor copulas of form $X_i = Z + \varepsilon_i$ with $Z\sim\text{Skew }t(\sigma_z^2,\nu,\lambda)$, $\varepsilon_i\sim\text{iid }t(\nu)$, $\sigma_z^2=1$ (rank correlation $\approx 0.5$): (1) Normal ($\nu\to\infty,\lambda=0$), (2) symmetric $t$-$t$ ($\nu=4,\lambda=0$, tail dependence), (3) skew $t$-$t$ ($\nu=4,\lambda=-0.5$, asymmetric + tail dependence). Estimate $\nu^{-1}\in[0,0.5)$. Dimensions $N\in\{3,10,100\}$; for $N=100$ a block-equidependence model (10 groups). Marginals: iid Normal or AR(1)-GARCH(1,1). $T=1000$ ($\approx$4 yrs daily), $S=25T$ simulations, 100 replications, identity weight matrix.
> - **Table 1:** estimates centered on true values; small bias; precision *improves* with $N$ (equidependence). MLE→SMM efficiency loss 25% ($N{=}3$) to 10% ($N{=}100$); GMM→SMM loss ≤3%.
> - **Table 2:** $N=100$ flexible-loadings block model well estimated; shape params ($\nu^{-1},\lambda$) slightly less precise than $\sigma_z^2$.
> - **Tables 3-4:** 95% CI coverage near nominal for step size $\varepsilon_T\in\{0.01,0.03,0.1\}$; collapses if step too small.
> - **Table 5:** $J$-test rejection rates near nominal, best for $\varepsilon_T\ge 0.01$.
^def-simulation

> [!definition] Data and marginal models (Sec. 4, Table 7)
> All 100 S&P 100 constituents as of Dec 2010; April 2008-Dec 2010, $T=696$ trade days (window set by Philip Morris's April-2008 addition). Marginals filtered by **AR(1)-GJR-GARCH** with lagged market return:
> $$ r_{it} = \phi_{0i} + \phi_{1i} r_{i,t-1} + \phi_{mi} r_{m,t-1} + \varepsilon_{it} $$
> $$ \sigma_{it}^2 = \omega_i + \beta_i\sigma_{i,t-1}^2 + \alpha_i\varepsilon_{i,t-1}^2 + \gamma_i\varepsilon_{i,t-1}^2\mathbf{1}\{\varepsilon_{i,t-1}\le 0\} + \alpha_{mi}\varepsilon_{m,t-1}^2 + \gamma_{mi}\varepsilon_{m,t-1}^2\mathbf{1}\{\varepsilon_{m,t-1}\le 0\} $$
> GJR-GARCH preferred by BIC; leverage parameter $\gamma_i > 0$ for 97/100 stocks. Marginals estimated nonparametrically (EDF) given heterogeneous skewness/kurtosis. Summary dependence over 4950 pairs: linear and rank correlation both $\approx 0.42$-$0.44$; rank correlation IQR 0.37-0.50 (mild heterogeneity); 1% tail dependence $\approx 0.06$; the $\tau_{0.90}-\tau_{0.10}$ difference is **negative for >75% of pairs** — strong evidence of asymmetric dependence.
^def-data

> [!definition] Systemic-risk measures (Sec. 4.3)
> **Marginal Expected Shortfall** (Brownlees & Engle 2011): expected return on stock $i$ given the market return is below a low threshold,
> $$ MES_{it} = -E_{t-1}[r_{it}\mid r_{mt} < C] $$
> The factor copula (full model for all 100 stocks) also enables a **multi-stock variant $kES$** — expected return on $i$ given that more than $k$ stocks have crashed:
> $$ kES_{it} = -E_{t-1}\!\left[r_{it}\,\middle|\,\Big(\sum_{j=1}^N \mathbf{1}\{r_{jt}<C\}\Big) > k\right] $$
> Models are ranked by MSE/relative-MSE against realized returns on crisis days:
> $$ MSE_i = \frac{1}{T}\sum_{t=1}^T (r_{it}-MES_{it})^2\,\mathbf{1}\{r_{mt}<C\}, \qquad RelMSE_i = \frac{1}{T}\sum_{t=1}^T \Big(\frac{r_{it}-MES_{it}}{MES_{it}}\Big)^2\mathbf{1}\{r_{mt}<C\} $$
> Unlike CAPM/Brownlees-Engle (which need only a bivariate model and use the market index to flag crises), the factor copula uses crashes in *individual* stocks as turmoil flags.
^def-systemic

## Examples

> [!example] Asymmetric, fat-tailed dependence in S&P 100 returns (Tables 8-10, Figs 4-5)
> **Setup:** Eight copulas estimated by SMM — four existing (Clayton, Normal, $t$, skew $t$ with equicorrelation) and four factor copulas ($t$-Normal, skew $t$-Normal, $t$-$t$, skew $t$-$t$). Step size $\varepsilon_T=0.1$, 1000 bootstraps.
> **Result (equidependence, Table 8):** common-factor variance $\sigma_z^2\approx 0.9$ (avg correlation $\approx 0.47$); inverse DoF $\nu^{-1}\approx 1/25$, significant only for asymmetric models; asymmetry $\lambda$ **significantly negative in all models** ($t$-stats -2.1 to -4.4) → crashes more likely than booms. The three asymmetric models ($Q_{SMM}$) outperform all others, but all models fail the $J$-test ($p\approx 0$), pointing to the equidependence assumption.
> **Result (block, Tables 9-10):** with industry factors, $\nu^{-1}\approx 1/14$ (stronger tail dependence) and $\lambda$ larger/more negative. Implied **lower tail dependence averages 0.82** (range 0.70-0.99) vs **upper tail dependence 0.07** (range 0.02-0.74) — strong asymmetry. The skew $t$-$t$ block copula is the **only model passing the $J$-test** ($p=0.07$).
> **Figures 4-5:** the Normal copula overestimates upper-tail and underestimates lower-tail dependence; the skew $t$-$t$ factor copula fits both tails well. Conditioning on $j$ crashes out of 100, the Normal copula is adequate for *moderate* tail events but the skew $t$-$t$ is needed for *extreme* (once-in-a-quarter, 1/66) ones.
> **Interpretation:** Risk management using a Normal copula takes too benign a view; basket/CDO securities may be mispriced; diversification benefits are lower than under Normality because large negative shocks originate from a fat-tailed common factor hitting all stocks at once.

> [!example] Superior systemic-risk estimates (Table 11)
> **Setup:** Estimate MES and $kES$ ($k=30$) at thresholds $C\in\{-2\%,-4\%\}$, comparing Brownlees-Engle, CAPM, Historical, and four block-equidependence copulas (Normal, $t$, skew $t$, skew $t$-$t$ factor).
> **Result:** For **MES**, Brownlees-Engle is best under MSE with the skew $t$-$t$ factor copula second; under **Relative MSE the factor copula is best** for both thresholds (skew $t$ second). Historical and CAPM are worst. For **$kES$** (needs the full 100-stock joint distribution, so CAPM/Brownlees-Engle cannot apply), the **skew $t$-$t$ factor copula performs best** on both metrics and thresholds.
> **Interpretation:** The high-dimensional factor copula not only characterizes the dependence structure but delivers improved systemic-risk estimates, especially for multi-firm crash measures only a full joint model can produce.

## Connections

- [[SMM Estimation of Factor Copulas]] — the estimation method whose finite-sample properties are validated here.
- [[Tail Dependence in Factor Copulas]] — Propositions 2 & 3 supply the reported tail-dependence coefficients.
- [[Multi-Factor and Block Dependence Structures]] — the block-equidependence model used empirically.
- [[Factor Copulas - Overview]] — the crisis motivation realized in these findings.

## See Also

- [[SMM Copula Simulation and Application]] — companion-paper note on related copula simulation/application results.
- [[../_Index|Econometrics]]
