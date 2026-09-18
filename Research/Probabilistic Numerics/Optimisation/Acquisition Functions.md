---
title: Acquisition Functions
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/definition
  - type/example
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 32-33, pp. 259-274"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[Bayesian Optimisation]]"
  - "[[Value Loss and Entropy Search]]"
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Further Topics in Global Optimisation]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Probability of Improvement
  - Expected Improvement
  - GP-UCB
  - Knowledge Gradient
  - PI
  - EI
  - KG
  - Portfolio of Acquisition Functions
---
# Acquisition Functions
> [!summary]
> An acquisition function is the [[Bayesian Optimisation|BO]] expected loss whose optimum places the next evaluation. This note collects the closed forms and trade-offs of the four workhorses under a [[Gaussian Process Regression|GP]] surrogate with posterior mean $m(x)$ and variance $\mathbb{V}(x)$: **Probability of Improvement (PI)**, **Expected Improvement (EI)**, **Upper/Lower Confidence Bound (GP-UCB)**, and **Knowledge Gradient (KG)**. Ordered from most exploitative to most explorative: PI $\lesssim$ EI $\lesssim$ UCB (for large $\beta$). Information-theoretic acquisitions (ES/PES/MES) are covered in [[Value Loss and Entropy Search]].

## Overview
All four are **myopic** (one-step look-ahead). PI, EI and UCB are *local* (value improvement at the next evaluation only); KG is *global* (values the posterior-mean minimum). By convention (this text minimises, so "UCB" is technically a *lower* confidence bound), we write acquisitions to be **minimised** where noted, matching Bayesian Optimisation's expected-loss framing. Let $\eta:=\min_{i<n}f(x_i)$ be the best (lowest) evaluation so far and $p(f(x_n)\mid\mathcal{D}_n)=\mathcal{N}(f(x_n);m(x_n),\mathbb{V}(x_n))$ the GP predictive; $\Phi(x;a,b^2)$ is the Gaussian CDF, $\mathcal{N}(\cdot)$ its PDF.

## Main Content
### Probability of Improvement (PI)
> [!definition] Probability of Improvement (33.1)
> One of the earliest acquisitions (Kushner 1964), a.k.a. **maximum PI**. With exploration hyperparameter $\epsilon_n\ge0$, the per-step loss is $\lambda_{n,\text{PI}}(\mathcal{D}_{n+1})=\mathbb{I}\big(f(x_n)\ge\eta_n-\epsilon_n\big)$ (indicator: 0 if improved, 1 otherwise), giving the expected loss / acquisition
> $$\alpha_{n,\text{PI}}(x_n)=P\big(f(x_n)\ge\eta_n-\epsilon_n\mid\mathcal{D}_n\big)=\Phi\big(\eta_n-\epsilon_n;m(x_n),\mathbb{V}(x_n)\big)\ \ \text{(prob. of improvement to minimise)}.$$
> Equivalently one *maximises* the probability of improvement $P(f(x_n)\le\eta_n-\epsilon_n\mid\mathcal{D}_n)\in[0,1]$. **Trade-off:** larger $\epsilon_n$ ⇒ more exploration; $\epsilon_n=0$ is aggressively **exploitative**. Kushner suggested large $\epsilon_n$ early, small late; Jones (2001) recommends scanning several $\epsilon_n$. **Deficiency:** PI does not distinguish improvement *magnitudes* — any improvement above threshold is equally valued (Eq. 33.2 shows it oddly rewards incremental improvement at each step equally). Its fixed range $[0,1]$ makes it useful for *retrospectively scoring* the exploitativeness of any acquisition's evaluations.
^def-pi

### Expected Improvement (EI)
> [!definition] Expected Improvement (32.1–32.2)
> The canonical myopic **value-loss** acquisition (Mockus et al. 1978). It integrates the *magnitude* of improvement over $\eta$:
> $$\alpha_{\text{EI}}(x_n)=\int_{-\infty}^{\eta}\big(f(x_n)-\eta\big)\,p(f(x_n)\mid\mathcal{D}_n)\,\mathrm{d}f(x_n)\tag{32.1}$$
> $$=-\mathbb{V}(x_n)\,\mathcal{N}\big(\eta;m(x_n),\mathbb{V}(x_n)\big)+\big(m(x_n)-\eta\big)\,\Phi\big(\eta;m(x_n),\mathbb{V}(x_n)\big).\tag{32.2}$$
> (Written as an expected *loss* to be minimised — most negative where best.) **Terms:** low (desirable) where $m(x_n)$ is low (**exploitation**) and/or $\mathbb{V}(x_n)$ is large (**exploration**), so EI *balances* both. **Trade-off/when to use:** cheap, multimodal, admits gradient/Hessian; a good general default, but empirically **under-exploratory** (weights exploitation too heavily) — a consequence of myopia. Unlike PI it *does* weigh improvement magnitude.
^def-ei

### Upper Confidence Bound (GP-UCB)
> [!definition] (Lower) Confidence Bound (33.3)
> Rooted in the multi-armed bandit literature (Srinivas et al. 2010), UCB is *optimistic*: assume $y_n$ takes a value better than its expectation by some fixed probability. Given the GP posterior,
> $$\alpha_{\text{UCB}}(x_n):=m(x_n)-\beta_n\,\mathbb{V}(x_n)^{1/2}\quad\text{(to be minimised)},\qquad \beta_n\in\mathbb{R}^+.$$
> (For minimisation this is a *lower* confidence bound; "UCB" kept by tradition.) **Terms:** the mean $m(x_n)$ rewards **exploitation** (evaluate near existing low values); the standard deviation $\mathbb{V}(x_n)^{1/2}$ promotes **exploration**; $\beta_n$ **explicitly** sets the trade-off. **When to use:** large $\beta_n$ ⇒ more explorative than EI, often yielding superior performance to EI/PI; simplicity enables **theoretical regret bounds** and schedules for adapting $\beta_n$ with $n$ (Srinivas et al. 2010; Freitas et al. 2012). Caveat: no known *sensible probabilistic-numerical* interpretation as a myopic expected loss under a GP (Exercise 33.1).
^def-ucb

### Knowledge Gradient (KG)
> [!definition] Knowledge Gradient (32.3)
> KG (Frazier, Powell & Dayanik 2009) relaxes EI's restriction that the returned $x_N$ be an evaluated point. With $\check x_{n+1}:=\arg\min_{x'}m_{n+1}(x')$ the minimiser of the *posterior mean after the next evaluation* and $m_{n+1}(x')=\mathbb{E}(f(x')\mid\mathcal{D}_{n+1})$, the loss is $\lambda_{\text{KG}}(\mathcal{D}_{n+1})=f(\check x_{n+1})$, giving
> $$\alpha_{\text{KG}}(x_n)=\int\min_{x'} m_{n+1}(x')\;p\big(f(x_n)\mid\mathcal{D}_n\big)\,\mathrm{d}f(x_n).$$
> **Not closed-form** (inner minimisation inside the integral); useful approximations exist. **When to use:** values improvements in the **posterior mean** (a *global* method) rather than in evaluations (EI/PI/UCB are *local*); need not evaluate at the minimum; **more robust to noise** than EI (avoids the winner's curse). Risk: the returned $f(x_N)$ may have high posterior variance, i.e. an unreliable putative minimum.
^def-kg

### Portfolios of acquisition functions (§33.4)
> [!definition] Acquisition portfolios
> Since each acquisition has limitations, a **portfolio** (Hoffman et al. 2011; Shahriari et al. 2016) proposes candidate locations from several cheap acquisitions (e.g. EI, PI, UCB), then selects the candidate maximising an independent, expensive but powerful **meta-criterion** (e.g. the LIL loss of §33.3). Decision-theoretically this is still a single loss — the meta-criterion's — so portfolios are a cheap heuristic for optimising an expensive meta-criterion.
^def-portfolio

### Ordering and interpretation
Across a common multimodal GP (Figs. 32.1, 33.1, 33.2, 33.4), the acquisition optima shift: **PI** is the *most exploitative*, **EI** intermediate, **UCB** (for $\beta=1.5$) the *most explorative* of the three. All are myopic and their optima are sensitive to the GP model and data (can move under innocuous changes). Information-theoretic acquisitions (LIL/VIL → ES/PES/MES) are truly *global* and noise-robust — see [[Value Loss and Entropy Search]].

## Examples
> [!example] PI vs. EI vs. UCB on the same posterior
> Figures 33.1 (PI), 32.1 (EI) and 33.2 (UCB, $\beta=1.5$) plot each acquisition over the same three-point GP posterior on $[-5,5]$, with the maximiser marked. PI hones tightly on the current best mode (exploitative); EI spreads slightly more; UCB's large-$\beta$ standard-deviation term pushes the next evaluation into an *unexplored* region (explorative). This visual comparison is the practical guide to acquisition choice.

> [!example] PI as a diagnostic score
> Because $\alpha_{n,\text{PI}}\in[0,1]$ regardless of the objective's units, PI (with $\epsilon_n=0$) is used *retrospectively* to score how exploitative each evaluation of a completed BO run was — revealing, e.g., that exploitation never happened or that the objective was inadequately explored, whatever acquisition actually drove the run.

## Connections
- Instances of the [[Bayesian Optimisation|BO]] acquisition = expected-loss framework, evaluated under a [[Gaussian Process Regression|GP]] surrogate.
- EI/KG derive from the value loss; the information-theoretic siblings (ES/PES/MES) live in [[Value Loss and Entropy Search]].
- EI's closed form (32.2) is the multivariate-domain analogue of the line-search EI (26.16) in [[Probabilistic Step-Size Selection and Line Searches]].
- Portfolios and batch/multi-fidelity variants of these acquisitions appear in [[Further Topics in Global Optimisation]].

## See Also
- [[Value Loss and Entropy Search]] — VL/VIL/LIL framings; ES, PES, MES, KG in depth.
- [[Bayesian Optimisation]] — how acquisitions arise as expected losses.
- [[Gaussian Process Regression]] — the $m(x),\mathbb{V}(x)$ underlying every formula here.
- [[Further Topics in Global Optimisation]] — multi-point EI, UCB, KG, PES.
