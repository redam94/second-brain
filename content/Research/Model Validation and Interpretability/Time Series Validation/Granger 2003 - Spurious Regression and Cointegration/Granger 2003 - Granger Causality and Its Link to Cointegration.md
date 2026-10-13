---
title: "Granger 2003 - Granger Causality and Its Link to Cointegration"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/econometrics
  - topic/causal-inference
  - type/concept
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]"
source_location: "Granger (2003) Nobel Lecture, pp. 365-366: origin at Princeton (Tukey, Morgenstern, cross-spectrum), Gabor and Wiener, two-component definition p. 365; 'Granger causation' and misuse, cointegration implies causality, nonlinear/conditional-distribution generalisation, money-prices debate p. 366."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Granger 2003 - Spurious Regression and Cointegration"
doc_type: paper
depends_on:
  - "[[Granger 2003 - Cointegration and the Error-Correction Representation]]"
  - "[[Empirical Causal Ordering]]"
used_by:
  - "[[Granger 2003 - Spurious Regression and Cointegration - Overview]]"
aliases:
  - Granger's Two-Component Definition of Causality
  - Granger Causation (Nobel Lecture)
  - Cointegration Implies Granger Causality
---

# Granger 2003 - Granger Causality and Its Link to Cointegration

> [!summary]
> Granger restates his causality concept in two components — **the cause precedes the effect**, and **the cause carries unique information about the effect not contained in any other variable** (p. 365) — and stresses that the forecasting test most users apply is only a *consequence* of this definition. He calls it a pragmatic definition that critics labelled "Granger causation" rather than "true causation", admits "many ridiculous papers appeared" (p. 366), and notes the mathematical surprise that **cointegrated series must have causality in at least one direction** (p. 366). For model validation it is a reminder that predictive incrementality is not interventional causation, and that the standard test is fragile to omitted variables and to integrated data.

## Overview

The concept predates cointegration by over a decade (mid-1960s). It grew out of Granger's postdoctoral work on the **cross-spectrum** at Princeton in 1959-1960 with John Tukey and Oskar Morgenstern: "one has a pair of inter-related time series and one would like to know if there are a pair of simple relations, first from the variable X explaining Y and then from the variable Y explaining X" (p. 365). Dennis Gabor (who "later won the Nobel Prize in Physics in 1971", p. 365) pointed him to a definition in a paper by Norbert Wiener; "It was essentially this definition, somewhat refined and rounded out, that I discussed, together with proposed tests in the mid 1960's." (p. 365) *Source discrepancy:* the lecture's closing list of laureates on p. 366 gives Gabor's prize year as 1970. The correct year is 1971, as on p. 365; see [[Granger 2003 - Forecasting, Decision Science and Aggregation]] for the full list.

## Main Content

### The definition

> "The statement about causality has just two components:
> 1. The cause occurs before the effect; and
> 2. The cause contains information about the effect that that is unique, and is in no other variable." (Granger 2003, p. 365; "that that" [sic])

> [!definition] Granger causality (formalisation of the two components) ^def-granger-causality-2003
> Let $\Omega_t$ be **all** information in the universe up to time $t$, and $\Omega_t \setminus X_t$ that information with the past of $X$ removed. $X$ **Granger-causes** $Y$ if, for some set $A$,
> $$
> \Pr(Y_{t+1} \in A \mid \Omega_t) \ne \Pr(Y_{t+1} \in A \mid \Omega_t \setminus X_t).
> $$
> Component 1 (temporal precedence) is built in by conditioning only on the past; component 2 ("unique ... in no other variable") is the removal of $X$'s past from an otherwise complete information set.
>
> **Operational (testable) version.** Replace $\Omega_t$ by a finite information set $\mathcal{I}_t = \{Y_{t-j}, X_{t-j}, W_{t-j}\}_{j\ge1}$ and replace the distribution by the conditional mean, giving the familiar test in a VAR: $H_0$: all coefficients on lagged $X$ are zero in
> $$
> Y_t = c + \sum_{j=1}^{p} a_j Y_{t-j} + \sum_{j=1}^{p} b_j X_{t-j} + \sum_{j=1}^{p} \mathbf{c}_j' \mathbf{W}_{t-j} + \varepsilon_t,
> $$
> tested by an $F$ or Wald test of $b_1=\dots=b_p=0$. See [[Empirical Causal Ordering#^def-granger|Granger causality in Empirical Causal Ordering]].

> [!theorem] Forecasting consequence (Granger 2003, p. 365) ^thm-forecast-consequence
> "A consequence of these statements is that the causal variable can help forecast the effect variable after other data has first been used." (p. 365)
>
> I.e., if $X$ Granger-causes $Y$, the mean-squared forecast error of $Y_{t+1}$ given $\Omega_t$ is smaller than given $\Omega_t \setminus X_t$. Granger's complaint: "Unfortunately, many users concentrated on this forecasting implication rather than on the original definition." (p. 365) The implication runs one way; incremental forecast power in a small, incomplete information set does not establish component 2 (uniqueness with respect to *all* other variables).

### Reception (p. 366)

- "they did agree that my definition was not 'true causation' in their eyes, it was only 'Granger causation.' I would ask for a definition of true causation, but no one would reply." (p. 366)
- "However, my definition was pragmatic and any applied researcher with two or more time series could apply it, so I got plenty of citations. Of course, many ridiculous papers appeared." (p. 366)
- On usefulness: "I am not sure if the empirical studies on causation have proved to be so useful, although the debate relating to money supply and prices was interesting. The concept does help with the formulation of dynamic models in more useful ways." (p. 366)

### Cointegration implies causality

> [!theorem] Cointegration ⇒ Granger causality in at least one direction (Granger 2003, p. 366) ^thm-coint-causality
> "When the idea of cointegration was developed, over a decade later, it became clear immediately that if a pair of series was cointegrated then at least one of them must cause the other. There seems to be no special reason why there two quite different concepts should be related; it is just the way that the mathematics turned out." (p. 366, "there two" [sic])
>
> **Formal statement:** if $x_t, y_t \sim I(1)$ are cointegrated with $z_t = y_t - \beta x_t \sim I(0)$, then in the error-correction representation ([[Granger 2003 - Cointegration and the Error-Correction Representation#^thm-granger-representation|representation theorem]]) at least one adjustment coefficient $\gamma_i \ne 0$.
>
> **Proof sketch:** if $\gamma_1 \ne 0$, the equation for $\Delta y_t$ contains $\gamma_1 z_{t-1} = \gamma_1 y_{t-1} - \gamma_1\beta x_{t-1}$, so (for $\beta \ne 0$) the lagged level of $x$ helps predict $y$ given $y$'s own past: $x$ Granger-causes $y$. Symmetrically, $\gamma_2 \ne 0$ means $y$ Granger-causes $x$. Both $\gamma$'s cannot be zero, since then neither series would respond to the gap, $z_t$ would be a difference of two independently wandering $I(1)$ series and could not be stationary.
>
> **Practical corollary:** with cointegrated data, a Granger-causality test run on a VAR in **differences only** omits $z_{t-1}$ and is misspecified — it can miss causality that runs entirely through the error-correction term. Test in the VECM, or in a levels VAR with appropriate (e.g. lag-augmented) inference.
>
> **Testing procedures (standard practice, not in the lecture).**
> 1. *VECM test.* Fit $\Delta y_t = \mu_1 + \gamma_1 z_{t-1} + \sum_{j=1}^{p} a_j \Delta y_{t-j} + \sum_{j=1}^{p} b_j \Delta x_{t-j} + \varepsilon_{1t}$ with $z_{t-1} = y_{t-1} - \hat\beta x_{t-1}$ included. "$x$ does not Granger-cause $y$" is the joint null $\gamma_1 = 0$ **and** $b_1 = \dots = b_p = 0$. Testing only the $b_j$ misses long-run causality through $z_{t-1}$; testing only $\gamma_1$ misses short-run causality. Because $\hat\beta$ is superconsistent, $z_{t-1}$ can be treated as known and the joint Wald test is asymptotically $\chi^2_{p+1}$.
> 2. *Toda-Yamamoto (1995) lag-augmented levels VAR.* When integration orders or the cointegration rank are uncertain, fit a VAR in **levels** with $p + d_{\max}$ lags, where $p$ is the lag order chosen by an information criterion and $d_{\max}$ is the maximum suspected order of integration (1 for $I(1)$ data). Wald-test zero restrictions on only the first $p$ lags of $x$ in the $y$ equation, leaving the extra $d_{\max}$ lags unrestricted. The statistic is asymptotically $\chi^2_p$ whether or not the series are integrated or cointegrated. The price is a small loss of power from the extra lags. It avoids pre-test errors from unit-root and cointegration tests, which matters at the 52-156 weekly observations typical of marketing data.
> 3. *What not to do.* A VAR in differences when the series are cointegrated (omits $z_{t-1}$), or standard Wald tests in an unaugmented levels VAR with $I(1)$ data (non-standard limit distributions, a cousin of the [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold|spurious-regression]] problem).

### Extensions (p. 366)

"what I have been telling you about so far has mostly been for concepts using linear models. Everything can be generalized to the nonlinear situation and recently efforts have been pushing into using similar concepts in conditional distributions, which is a very general form. It appears that causality will play a basic role in the generalization of the error-correction model, but that is still a work-in-progress." (p. 366)

## Examples

> [!example] Granger causality in a marketing VAR ^ex-gc-marketing
> **Setup:** weekly log sales $S_t$, log paid-search clicks $C_t$ and log TV GRPs $G_t$, about 150 weeks.
>
> **Reading:** a test that lagged $G$ improves the forecast of $S$ beyond lagged $S$ and $C$ shows *incremental predictive information*, not that buying more TV would raise sales. It fails Granger's own component 2 if an omitted driver (seasonal planning, a promotion calendar, a budget rule that sets $G$ from forecast demand) explains both — the "unique ... in no other variable" condition is about **all** variables, not the three in the VAR. And it is invalid in a differences-only VAR if $S$ and $C$ are cointegrated ([[#^thm-coint-causality]]). Experimental ground truth ([[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]) is the stronger evidence for an effect of search on sales.

## Connections

- VAR-based causal ordering, impulse responses and marketing persistence: [[Empirical Causal Ordering]], [[Multivariate Persistence and Cointegration]].
- Interventional vs observational relevance — the "true causation" Granger's critics wanted: [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]].
- Predictive vs causal modelling cultures: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].
- Confounding as the failure of component 2: [[Spurious Association and Confounds]].

## See Also
- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — source map
- [[Granger 2003 - Cointegration and the Error-Correction Representation]] — the ECM that carries the causality
- [[Empirical Causal Ordering]] — Granger causality tests in marketing VARs
