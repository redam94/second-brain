---
title: "Heath 2015 - Influenza Vaccine Case Study and Table 1"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/example
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Sec. 4, Table 1, Figs 1-2, pp. 6-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]]"
  - "[[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]]"
  - "[[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]]"
used_by:
  - "[[Heath 2015 - Discussion Limitations and Practical Guidance]]"
aliases:
  - Vaccine EVPPI case study
---

# Heath 2015 - Influenza Vaccine Case Study and Table 1

> [!summary]
> A 28-parameter Bayesian cost-effectiveness model of an influenza vaccine, with single-parameter EVPPI computed five ways at willingness to pay $k=20000$. All methods agree to within the Monte Carlo error of the baseline (0.04); $\beta_1$ and $\omega_1$ rank highest; nested MC takes about 55 minutes per parameter versus seconds for the rest.

## Overview

**Model (Sec. 4.1).** Two options: vaccine available ($t=1$) or not ($t=0$). A patient with influenza gets antivirals and often a GP visit; complications include pneumonia and hospitalisation, with indirect costs such as time off work. Costs: drug acquisition, hospital days, GP visits, vaccine. Benefit: QALYs, with each adverse effect contributing negatively. There are 28 key parameters (probability of infection, vaccine risk reduction, complication probabilities, monetary costs, QALY losses); the full parametrisation is in Baio (2012). Draws come from the joint posterior by MCMC.

## Main Content

**Settings (Sec. 4.2).**
- Single-parameter EVPPI for all 28 parameters with all methods.
- Sadatsafavi et al.: visual tool says 23 of 28 parameters change the optimal decision once; the other five have EVPPI $=0$ by this method.
- Strong-Oakley: $M$ chosen as the largest number of subsets with upward bias below 0.1, ranging from 20 down to 2 subsets by parameter.
- Two-step MC: outer loop 1000 posterior samples; inner loop MCMC with 2 chains of 100,000 draws, burn-in 9,500, thinned by 500 to 1000 draws. Monte Carlo error "still quite large".
- Baseline "current information": 5,000,000 MCMC draws, burn-in 9,500, thinned to 50,000, MC error about 0.04. Incremental net benefit stored per loop and $\max(\cdot,0)$ taken.
- GAM and GP via Strong et al.'s functions with automatic hyper-parameters.

**Table 1 - EVPPI values by parameter and method** (SO = Strong-Oakley, SAD = Sadatsafavi et al., GP, GAM, MC = two-step Monte Carlo). Group labels are as aligned in the PDF; groupings of $\beta,\gamma,\omega,\psi$ follow the printed row labels.

| Parameter | Group | SO | SAD | GP | GAM | MC |
|---|---|---|---|---|---|---|
| $\beta_1$ | Probability of clinical outcomes | 1.15 | 1.17 | 1.11 | 1.11 | 1.06 |
| $\beta_2$ | same | 0.26 | 0.23 | 0.11 | 0.11 | 0.25 |
| $\beta_3$ | same | 0.24 | 0.15 | 0.03 | 0.03 | 0.07 |
| $\beta_4$ | same | 0.14 | 0.13 | 0.08 | 0.09 | 0.05 |
| $\beta_5$ | same | 0.28 | 0.25 | 0.07 | 0.12 | 0.06 |
| $\beta_6$ | same | 0.27 | 0.29 | 0.18 | 0.21 | 0.21 |
| $\beta_7$ | same | 0.35 | 0.40 | 0.30 | 0.30 | 0.25 |
| $\delta$ | Number of drugs prescribed | 0.30 | 0.22 | 0.11 | 0.03 | 0.06 |
| $\eta$ | Probability of taking time off work | 0.11 | 0 | 0.04 | 0 | 0.06 |
| $\gamma_1$ | Probability of receiving drugs | 0.19 | 0.17 | 0.11 | 0.11 | 0.06 |
| $\gamma_2$ | same | 0 | 0 | 0.01 | 0.01 | 0.06 |
| $\lambda$ | Number of days off work | 0.41 | 0.44 | 0.41 | 0.43 | 0.43 |
| $\rho$ | Reduction in infection rate due to vaccine | 0.30 | 0.30 | 0.28 | 0.28 | 0.28 |
| $\xi$ | Probability of taking OTC medication | 0.24 | 0.13 | 0.03 | 0.03 | 0.06 |
| $\omega_1$ | QALY cost for each state | 0.55 | 0.57 | 0.53 | 0.53 | 0.63 |
| $\omega_4$ | same | 0.20 | 0.23 | 0 | 0 | 0.06 |
| $\omega_5$ | same | 0.11 | 0.17 | 0.05 | 0.05 | 0.06 |
| $\omega_6$ | same | 0.18 | 0.16 | 0.12 | 0.12 | 0.13 |
| $\omega_7$ | same | 0.18 | 0.29 | 0.14 | 0.16 | 0.15 |
| $\phi$ | Vaccine coverage rate | 0.13 | 0 | 0.02 | 0.02 | 0.06 |
| $\psi_1$ | Cost of resources | 0.17 | 0.17 | 0.13 | 0.13 | 0.07 |
| $\psi_2$ | same | 0.10 | 0.14 | 0.02 | 0.02 | 0.06 |
| $\psi_3$ | same | 0.37 | 0.37 | 0.31 | 0.31 | 0.29 |
| $\psi_4$ | same | 0.46 | 0.52 | 0.35 | 0.35 | 0.42 |
| $\psi_5$ | same | 0.44 | 0.38 | 0.24 | 0.38 | 0.25 |
| $\psi_6$ | same | 0.13 | 0.15 | 0.05 | 0.05 | 0.07 |
| $\psi_7$ | same | 0.20 | 0 | 0 | 0 | 0.07 |
| $\psi_8$ | same | 0.08 | 0 | 0 | 0 | 0.07 |

*Interpretation.* The two highest parameters are the same across all five methods ($\beta_1$, $\omega_1$); discrepancies in the ordering of the rest are small relative to the 0.04 MC error of the current-information term. The MC column floors near 0.05-0.07 for parameters with no true effect, a signature of the upward bias of nested MC with finite inner samples; the paper attributes variation to "the inherent nature of approximation". The paper advises reporting EVPPI to 1-2 decimals only.

**Figure 1 (EVPI and EVPPI vs willingness to pay, $k$ from 0 to 50000).** Plotted for EVPI and for $\beta_1$ and $\omega_1$, using Sadatsafavi et al. with one decision change. Both curves peak where the optimal decision changes ("uncertainty is greatest at the point when both strategies are equal"). $k=20000$ is near the break-even. Away from break-even, EVPPI values are tiny and MC error would dominate nested-MC estimates.

**Figure 2 (mean EVPPI and standard error).** Four methods (SO, SAD, GAM, GP; MC excluded) for the four highest-EVPPI parameters ($\beta_1$, $\beta_7$, $\psi_4$, $\omega_1$) show similar standard errors, hence "little difference between the estimation properties of all 4 methods". (Panel values are plotted only; not tabulated in the text.)

**Runtime.** Single-parameter methods and GAM: negligible. GP: 2-4 seconds. Nested MC: about 55 minutes for one parameter.

## Examples

Reading Table 1 as a decision memo: on every method the infection-risk reduction $\rho$, the days off work $\lambda$ and the QALY cost $\omega_1$ carry visible value of information (about 0.3-0.6 on the Table's scale; units are net benefit as scaled in the paper, which this note does not restate), while vaccine coverage $\phi$ and some cost parameters ($\psi_7,\psi_8$) are worth about nothing on the regression methods. This is the use VoI is advocated for: ranking where more data pays.

## Connections
- Methods compared: [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]], [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]], [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]].
- Marketing analogue: a ranked EVPPI table for an MMM tells you which saturation or adstock parameter deserves the next lift test.

## See Also
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
