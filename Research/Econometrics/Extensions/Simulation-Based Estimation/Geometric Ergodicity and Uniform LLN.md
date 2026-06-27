---
title: "Geometric Ergodicity and Uniform LLN"
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Duffie Singleton 1993 - Simulated Moments Estimation of Markov Models of Asset Prices]]"
source_location: "§4.1 Geometric Ergodicity, §4.2 Uniform Weak LLN, pp. 936-938"
date_ingested: 2026-06-27
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Simulated Moments Estimator Definition]]"
  - "[[Duffie-Singleton Asset-Pricing Model]]"
used_by:
  - "[[SME Consistency]]"
aliases:
  - geometric ergodicity
  - rho-ergodic
  - Condition B
  - uniform weak law of large numbers
  - Lipschitz uniformly in probability
---

# Geometric Ergodicity and Uniform LLN

> [!summary]
> The first half of the SME consistency machinery. **Geometric ergodicity** of the Markov state process ensures it converges geometrically to a stationary (ergodic) distribution *independent of starting values* — this neutralizes the nonstationarity of the simulated series and delivers strong $\alpha$-mixing (hence laws of large numbers). Duffie & Singleton verify it via Mokkadem's (1985) sufficient conditions for "nonlinear AR(1)" models (irreducibility **Condition B**, aperiodicity, a contraction bound — **Lemma 1**). They then upgrade an ordinary LLN to a **uniform weak LLN** over the parameter set $\Theta$ (**Lemma 2**) using a global "Lipschitz, uniformly in probability" modulus-of-continuity condition on the simulated moments.

## Overview

To prove the SME is consistent one needs (i) a LLN that holds despite the simulated series starting off its ergodic distribution, and (ii) that LLN to hold *uniformly* in $\beta$ over the compact parameter space $\Theta$. Section 4.1 supplies (i) via geometric ergodicity; Section 4.2 supplies (ii) via a uniform weak LLN. These feed directly into [[SME Consistency]].

## Main Content

> [!definition] $\rho$-ergodic and geometrically ergodic (D&S §4.1, Eq. 4.1)
> Let $P_x^t$ denote the $t$-step transition probability (distribution of $X_t$ given $X_0 = x$) of a time-homogeneous Markov process $\{X_t\}$. The process is **$\rho$-ergodic**, for $\rho \in (0,1]$, if there is a probability measure $\pi$ (the **ergodic distribution**) such that for every initial point $x$,
> $$
> \rho^{-t}\,\lVert P_x^t - \pi \rVert_v \to 0 \quad \text{as } t \to \infty,
> $$
> where $\lVert \cdot \rVert_v$ is the total-variation norm. If $\{X_t\}$ is $\rho$-ergodic for some $\rho < 1$, it is **geometrically ergodic**.
> ^def-geometric-ergodicity

**Why it matters.** Geometric ergodicity lets ergodicity substitute for stationarity in computing asymptotic distributions: the process converges geometrically to $\pi$ regardless of initial conditions, and it implies **strong ($\alpha$-) mixing** with mixing coefficient $\alpha(m) \to 0$ geometrically (Rosenblatt 1971; Mokkadem 1985). Notation: for an ergodic process, $X_\infty$ denotes a random variable with the ergodic distribution, and $\lVert X \rVert_q = [\mathbb{E}(\lVert X \rVert^q)]^{1/q}$ is the $L^q$ norm.

> [!definition] Condition B — irreducibility (D&S §4.1, Eq. 4.2)
> For any measurable $A \subset \mathbb{R}^N$ of nonzero Lebesgue measure and any compact $K \subset \mathbb{R}^N$, there exists an integer $t > 0$ such that
> $$
> \inf_{x \in K} P_x^t(A) > 0.
> $$
> This is a **recurrence/irreducibility** condition. It is weaker than a single-period "full support" condition — important because with endogenous state variables (e.g. capital stock) the one-step distribution can be degenerate, yet Condition B can still hold over multiple steps (see [[Duffie-Singleton Asset-Pricing Model#^ex-closed-form]]). Aperiodicity is also required (a deterministic cycle is recurrent but not geometrically ergodic).
> ^def-condition-b

> [!theorem] Lemma 1 (Mokkadem): sufficient conditions for geometric ergodicity (D&S §4.1, Eq. 4.6)
> Suppose $\{Y_t\}$, defined by (3.1), is **aperiodic** and satisfies **Condition B**. Fix $\beta$ and suppose there are constants $K > 0$, $\delta \in (0,1)$, and $q > 0$ such that $H(\cdot, \varepsilon_1, \beta) : \mathbb{R}^N \to L^q$ is well defined and continuous with
> $$
> \lVert H(y, \varepsilon_1, \beta) \rVert_q < \delta \lVert y \rVert, \qquad \lVert y \rVert > K.
> $$
> Then $\{Y_t\}$ is **geometrically ergodic**, and $\lVert Y_t^\beta \rVert_q$ and $\lVert Y_\infty^\beta \rVert_q$ are uniformly bounded over $t$.
>
> **Interpretation:** condition (4.6), inspired by Tweedie (1982), says that once $\{Y_t\}$ leaves a sufficiently large ball it heads back toward the ball at a uniform geometric rate — a drift/contraction-toward-the-center condition.
> ^thm-lemma1

> [!definition] Lipschitz, uniformly in probability (D&S §4.2)
> The family $\{f_t^\beta\}$ is **Lipschitz, uniformly in probability** if there is a sequence $\{K_t\}$ such that for all $t$ and all $\beta, \theta \in \Theta$,
> $$
> \lVert f_t^\beta - f_t^\theta \rVert \le K_t \lVert \beta - \theta \rVert,
> \qquad \text{with } K^T = T^{-1}\sum_{t=1}^{T} K_t \text{ bounded in probability.}
> $$
> This is a **global** modulus-of-continuity condition (over all of $\Theta$), used in place of the more usual local condition; it is what couples uniform convergence to the parameter feedback of the simulated path.
> ^def-lipschitz-uniform

> [!theorem] Lemma 2 (Uniform Weak Law of Large Numbers) (D&S §4.2, Eq. 4.7)
> Suppose, for each $\beta \in \Theta$, that $\{Y_t^\beta\}$ is ergodic and $\mathbb{E}(\lvert f_\infty^\beta \rvert) < \infty$; suppose in addition that $\beta \mapsto \mathbb{E}(f_\infty^\beta)$ is continuous and the family $\{f_t^\beta\}$ is **Lipschitz, uniformly in probability**. Then $\{f_t^\beta : \beta \in \Theta\}$ satisfies the **uniform weak law of large numbers**:
> $$
> \lim_{T\to\infty} P\!\left[\sup_{\beta\in\Theta}\left| \mathbb{E}(f_\infty^\beta) - \frac{1}{T}\sum_{t=1}^{T} f_t^\beta \right| > \delta\right] = 0 \quad \text{for each } \delta > 0.
> $$
> The ergodicity hypothesis can be replaced by Mokkadem's geometric-ergodicity conditions on $H$ and $\varepsilon_t$ (Lemma 1) for some $q > 2$. (Proof in the Appendix, following Jennrich 1969 / Amemiya 1985; cf. Newey 1991.)
> ^thm-lemma2

## Connections

- Supplies the two ingredients — ergodicity-based LLN and its uniform version — that Assumptions 1–2 of [[SME Consistency]] package, leading to **Theorem 1** (weak consistency).
- Geometric ergodicity is a strictly **weaker** route to consistency than the AUC damping condition used for strong consistency; the [[Duffie-Singleton Asset-Pricing Model#^ex-het-shock|conditionally heteroskedastic example]] is geometrically ergodic but not AUC.
- Total-variation/mixing machinery connects to the geometric ergodicity used to justify MCMC convergence and HAC ([[Standard Errors and Clustering|Newey–West]]) variance estimation.

## See Also

- [[SME Consistency]] — Theorems 1–3 built on these lemmas
- [[Duffie-Singleton Asset-Pricing Model]] — Condition B checked for the growth model
- [[Simulated Moments Estimator Definition]] — the $f_t^\beta$, $\Theta$ this concerns
