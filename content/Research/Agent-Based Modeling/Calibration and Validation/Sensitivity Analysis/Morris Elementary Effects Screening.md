---
title: Morris Elementary Effects Screening
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/definition
  - doc/paper
source: "[[raw/Review of Global Sensitivity Analysis Methods 2024.pdf]]"
source_location: "Sec. 1.2-1.2.1 (Derivative based methods / Morris), pp. 4-5"
date_ingested: 2026-06-28
folder: "Agent-Based Modeling/Calibration and Validation/Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Global Sensitivity Analysis - Overview]]"
used_by:
  - "[[Sampling and Estimation for Sobol Indices]]"
aliases:
  - Morris Method
  - Elementary Effects
  - Morris Screening
  - mu-star sigma
  - EE method
---

# Morris Elementary Effects Screening

> [!summary]
> The **Morris method** is a derivative-based **screening** technique. It computes **elementary effects (EE)** — finite-difference changes in output from perturbing one factor by a step $\Delta$ along randomly placed trajectories through a discretized grid. Averaging the EEs gives the mean $\mu_i$ (overall influence) and standard deviation $\sigma_i$ (interaction / nonlinearity). Campolongo's revised $\mu_i^*$ averages the **absolute** EEs to avoid cancellation in non-monotonic models. At cost $O(r(p+1))$ model runs it cheaply ranks factors and flags the non-influential ones to fix — but it ranks rather than precisely quantifies.

## Overview

Morris falls under derivative-based GSA: sensitivity is based on (averaged) finite-difference derivatives of the output. The paper: "The basic idea of Morris method is built upon calculation of elementary effects (EE) for each input factor by dividing the range of each factor into $p$ levels and considering $\Delta$ as a predetermined multiple of $\frac{1}{(p-1)}$." It is the canonical **screening** tool (see [[Global Sensitivity Analysis - Overview]]): identify and discard unimportant factors before expensive variance-based quantification.

## Main Content

> [!definition] Elementary effect ^elementary-effect
> For factor $X_i$ with step $\Delta$ (where $X_i + \Delta \le 1$ on the unit grid):
> $$
> EE_i = \frac{F(X_1,\dots,X_{i-1},\,X_i+\Delta,\,X_{i+1},\dots,X_k) - F(X_1,\dots,X_{i-1},\,X_i,\,X_{i+1},\dots,X_k)}{\Delta_i}
> $$
> a finite-difference (one-step) derivative of the output with respect to $X_i$ at one point in the input space. Each trajectory of $k+1$ runs yields one $EE$ per factor.

> [!definition] Morris measures $\mu_i$ and $\sigma_i$ ^mu-sigma
> After sampling and computing $EE_i$ over $r$ trajectories:
> $$
> \mu_i = \frac{1}{r}\sum_{i=1}^{r} EE_i \qquad\qquad \sigma_i = \sqrt{\,\frac{1}{r}\sum_{i=1}^{r}\Big(EE_i - \tfrac{1}{r}\sum_{i=1}^{r} EE_i\Big)^{2}}
> $$
> - $\mu_i$ — **mean** elementary effect: overall importance of $X_i$.
> - $\sigma_i$ — **standard deviation** of the EEs: "higher values of $\sigma_i$ suggest increased interaction between $X_i$ and the other variables or a non-linear effect."

> [!definition] Revised mean $\mu_i^{*}$ (Campolongo) ^mu-star
> $$
> \mu_i^{*} = \frac{1}{r}\sum_{i=1}^{r} \big| EE_i \big|
> $$
> Campolongo et al. proposed $\mu^*$ — the mean of the **absolute** elementary effects — "to mitigate the issue of cancellation of opposite signs in non-monotonic models." Higher $\mu_i^*$ ⇒ greater influence of $X_i$ on the output. $\mu^*$ is a reliable proxy for the Sobol total-effect index $S_{Ti}$ for *ranking* purposes (see [[Variance-Based Sensitivity and Sobol Indices]]).

> [!theorem] Reading the $(\mu^*, \sigma)$ plane ^morris-plane
> Plotting factors on $(\mu^*, \sigma)$ classifies them:
> - **Low $\mu^*$, low $\sigma$** → negligible factor → **fix it** (screen out).
> - **High $\mu^*$, low $\sigma$** → important and (nearly) **linear/additive** effect.
> - **High $\mu^*$, high $\sigma$** → important with strong **interactions and/or nonlinearity** → keep and quantify with Sobol.
> Related: **DGSM** (eq. 18) generalizes Morris as $v_i = \int_{H^n}\!\left(\frac{\partial f}{\partial x_i}\right)^{2} dx$; there is a known link between DGSM and Sobol's total index.

In the MNIST case study, Morris's **$\mu^*$ and $\sigma$** were among the most reliable importance measures (alongside Sobol $S_T$), and Morris obtained good accuracy "by utilizing the minimum number of most important pixels." Sampling cost there: **50 trajectories in 4 levels** (Table 1) — the cheapest budget of all methods tested.

## Examples

A 10-parameter ABM screened with $r=20$ trajectories costs $20 \times 11 = 220$ runs. Results:

- Parameter A: $\mu^*=8.0,\ \sigma=0.5$ → strong, near-linear main driver → **keep**.
- Parameter B: $\mu^*=6.5,\ \sigma=7.0$ → strong but highly interacting/nonlinear → **keep**, expect large $S_{TB}-S_B$ in Sobol.
- Parameter C: $\mu=0.1$ but $\mu^*=5.0$ → its raw mean nearly cancelled (non-monotone); $\mu^*$ correctly flags it as **important** — exactly the case $\mu^*$ was designed for.
- Parameters D–J: $\mu^*<0.2,\ \sigma<0.2$ → **fix** all six, shrinking the space from 10 to 4 before Sobol quantification (see [[Sampling and Estimation for Sobol Indices]]).

## Connections

- [[Global Sensitivity Analysis - Overview]] — Morris as the screening half of the screen-then-quantify workflow.
- [[Variance-Based Sensitivity and Sobol Indices]] — $\mu^*$ ranks like $S_{Ti}$; $\sigma$ flags interactions that Sobol then decomposes.
- [[Sampling and Estimation for Sobol Indices]] — trajectory/Saltelli sampling and SALib implement both.
- [[Local vs Global Sensitivity Analysis]] — Morris is global (many points, full range) yet derivative-based, bridging OAT and variance methods.
- [[Population Initialization and Parameter Sensitivity]] — vault's local OAT note; Morris extends OAT-style steps to a global screen.

## See Also

- [[Uncertainty Quantification for ABM Calibration]]; [[ABM Validation Challenges]].
- Morris (1991), "Factorial sampling plans for preliminary computational experiments."
- Campolongo, Cariboni & Saltelli (2007), "An effective screening design for sensitivity analysis of large models."
