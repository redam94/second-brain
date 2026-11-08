---
title: "Rabiner 1989 - HMM Types, Continuous Densities and State Duration"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. IV, pp. 266-271; eqs 45-89; Figs 7-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]"
used_by:
  - "[[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]"
  - "[[Rabiner 1989 - Speech Recognition Applications and Results]]"
aliases:
  - "Left-right HMM"
  - "Explicit duration HMM"
  - "Continuous-density HMM"
  - "Autoregressive HMM"
---

# Rabiner 1989 - HMM Types, Continuous Densities and State Duration

> [!summary]
> Beyond ergodic HMMs, the paper covers left-right (Bakis) models with $a_{ij}=0$ for $j<i$, continuous mixture emissions with closed-form reestimation, autoregressive HMMs, null transitions, parameter tying, and explicit state-duration densities. Explicit duration fixes the geometric dwell implied by self-transitions but multiplies computation by about $D^2/2$ and adds many parameters. Optimisation criteria beyond ML (MMI, MDI) and an HMM distance measure are also given.

## Overview

All Baum-Welch reestimation preserves zeros: a parameter initialised to zero stays zero (see eq. 44), so structural constraints can be imposed by initialisation.

## Main Content

> [!definition] Ergodic vs left-right models (eqs 45-48; Fig. 7)
> **Ergodic (fully connected):** every state reachable from every other, all $a_{ij}>0$. **Left-right (Bakis):** $a_{ij}=0$ for $j<i$ (eq. 45); $\pi_i=0$ for $i\ne1$, $\pi_1=1$ (eq. 46); optionally $a_{ij}=0$ for $j>i+\Delta$ (eq. 47; $\Delta=2$ in Fig. 7b). Last state: $a_{NN}=1$, $a_{Ni}=0$ for $i<N$ (eq. 48). States proceed left to right so the model suits signals whose properties change over time. Fig. 7c: 6-state parallel-path left-right model with cross-coupled paths.
^def-left-right

> [!definition] Continuous mixture emission (eqs 49-54)
> $b_j(\mathbf O)=\sum_{m=1}^Mc_{jm}\,\mathcal N[\mathbf O,\boldsymbol\mu_{jm},U_{jm}]$, $\sum_mc_{jm}=1$, $c_{jm}\ge0$, with log-concave or elliptically symmetric component (Gaussian). Reestimation (eqs 52-54): $\bar c_{jk}=\dfrac{\sum_t\gamma_t(j,k)}{\sum_t\sum_m\gamma_t(j,m)}$, $\bar{\boldsymbol\mu}_{jk}=\dfrac{\sum_t\gamma_t(j,k)\mathbf O_t}{\sum_t\gamma_t(j,k)}$, $\bar U_{jk}=\dfrac{\sum_t\gamma_t(j,k)(\mathbf O_t-\boldsymbol\mu_{jk})(\mathbf O_t-\boldsymbol\mu_{jk})'}{\sum_t\gamma_t(j,k)}$ where $\gamma_t(j,k)=\Big[\dfrac{\alpha_t(j)\beta_t(j)}{\sum_i\alpha_t(i)\beta_t(i)}\Big]\Big[\dfrac{c_{jk}\mathcal N(\mathbf O_t,\boldsymbol\mu_{jk},U_{jk})}{\sum_mc_{jm}\mathcal N(\mathbf O_t,\boldsymbol\mu_{jm},U_{jm})}\Big]$ is the probability of being in state $j$ with mixture component $k$ at time $t$.
^def-mixture-emission

> [!definition] Autoregressive HMM (eqs 55-63)
> Within a state, the observation vector $\mathbf O=(x_0..x_{K-1})$ follows an autoregression $O_k=-\sum_{i=1}^pa_iO_{k-i}+e_k$ with Gaussian $e_k$ of variance $\sigma^2$; for large $K$ the density is $f(\mathbf O)=(2\pi\sigma^2)^{-K/2}\exp\{-\tfrac1{2\sigma^2}\delta(\mathbf O,\mathbf a)\}$ with $\delta(\mathbf O,\mathbf a)=r_a(0)r(0)+2\sum_{i=1}^pr_a(i)r(i)$, where $r$ and $r_a$ are autocorrelations of the observations and of the coefficients. Gain-normalised, mixtures $b_j(\mathbf O)=\sum_mc_{jm}b_{jm}(\mathbf O)$ with reestimation $\bar r_{jk}=\sum_t\gamma_t(j,k)r_t/\sum_t\gamma_t(j,k)$ then solving normal equations for $\hat{\mathbf a}_{jk}$.
^def-ar-hmm

> [!definition] Null transitions and tied states (Sec. IV.C; Fig. 8)
> **Null transitions** ($\phi$) move between states without emitting an observation (used for deletions and arbitrary-length digit grammars). **Tying** sets equivalence classes of parameters (e.g. identical emission densities in several states) to reduce the number of free parameters when training data are scarce.
^def-null-tying

> [!theorem] Explicit duration HMM (eqs 64-83; Fig. 9)
> A standard HMM has $p_i(d)=(a_{ii})^{d-1}(1-a_{ii})$, geometric, inappropriate for many physical signals. In the variable-duration HMM, self-transitions are set to zero and each state draws a duration $d\sim p_i(d)$ (truncated at maximum $D$), emits $d$ observations, then transitions $a_{q_1q_2}$ with $a_{ii}=0$. Forward variable (eq. 65): $\alpha_t(i)=P(O_1..O_t,S_i\text{ ends at }t\mid\lambda)$, with
> $$\alpha_t(j)=\sum_{i=1}^N\sum_{d=1}^D\alpha_{t-d}(i)\,a_{ij}\,p_j(d)\prod_{s=t-d+1}^tb_j(O_s)\quad(\text{eq. 68}).$$
> Costs: about $D$ times the storage and $D^2/2$ times the computation of a standard HMM (for $D=25$, a factor of about 300 in compute); many extra parameters; fewer transitions in a finite sample to estimate $p_i(d)$. Parametric alternatives: Gaussian $p_i(d)=\mathcal N(d,\mu_i,\sigma_i^2)$ (eq. 82) or Gamma $p_i(d)=\eta_i^{\nu_i}d^{\nu_i-1}e^{-\eta_id}/\Gamma(\nu_i)$ (eq. 83, mean $\nu_i\eta_i^{-1}$, variance $\nu_i\eta_i^{-2}$). Reestimation formulas (78)-(81) use extra variables $\alpha^*_t(i)$ (state begins at $t+1$), $\beta_t(i)$, $\beta^*_t(i)$ (eqs 71-77).
^thm-explicit-duration

> [!example] Dwell-time comparison
> A state with $a_{ii}=0.9$ has geometric dwell with mean 10 and mode 1, i.e. its most likely duration is a single step. A kinesin dwell that needs two sequential hidden phases (hypoexponential) has a non-monotone density with mode away from 1. A geometric dwell cannot represent it, but a two-phase chain of states can (E59 uses a 2-phase lattice HMM), a cheaper alternative to explicit-duration HMMs.
^ex-dwell-comparison

> [!definition] ML, MMI, MDI criteria and HMM distance (eqs 84-89)
> ML: $P_v^*=\max_\lambda P(O^v\mid\lambda_v)$ per model. **MMI** maximises $I^*=\max_\lambda\{\log P(O^v\mid\lambda_v)-\log\sum_{w=1}^VP(O^v\mid\lambda_w)\}$ summed over training sequences, i.e. separates the correct model from the others; solved by steepest descent (no reestimation formula). **MDI** minimises the cross-entropy $D(Q\|P_\lambda)=\int q(y)\ln(q(y)/p(y))dy$ between signal and model densities (generalised Baum algorithm). ML, MMI and MDI can all be formulated as MDI. **HMM distance:** $D(\lambda_1,\lambda_2)=\tfrac1T[\log P(O^{(2)}\mid\lambda_1)-\log P(O^{(2)}\mid\lambda_2)]$ with $O^{(2)}$ generated by $\lambda_2$ (eq. 88), symmetrised $D_s=\tfrac12[D(\lambda_1,\lambda_2)+D(\lambda_2,\lambda_1)]$ (eq. 89). Two superficially different HMMs can be statistically equivalent (example with $p=0.6,q=0.7,r=0.2$ giving $s=13/30=0.433$), an identifiability warning relevant to label switching.
^def-criteria

## Examples (PyMC-style)

A two-state non-homogeneous movement HMM (E24/E48): transition rows are softmax of a covariate linear predictor, emission distributions for step length are gamma, ordered by mean to break label switching (untested sketch in [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]).

## Connections

[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]] supplies the reestimation these formulas extend. Applied use of left-right and duration models: [[Rabiner 1989 - Speech Recognition Applications and Results]].

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Model Building with Latent Variables - Animal Movement]]
