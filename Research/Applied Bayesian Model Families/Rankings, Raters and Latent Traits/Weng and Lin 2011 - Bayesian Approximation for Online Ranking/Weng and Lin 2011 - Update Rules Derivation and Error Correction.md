---
title: "Weng and Lin 2011 - Update Rules Derivation and Error Correction"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Sec. 3.1-3.4, pp. 275-280; Appendix C"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[Weng and Lin 2011 - Ranking Models and the W-Stein Approximation]]"
used_by:
  - "[[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]"
aliases:
  - Weng-Lin Omega Delta update
  - full-pair partial-pair factorization
---

# Weng and Lin 2011 - Update Rules Derivation and Error Correction

> [!summary]
> The core derivation: posterior mean/variance via Corollary 2, approximated at $z=0$ to give $\mu\leftarrow\mu+\Omega$ and $\sigma^2\leftarrow\sigma^2\max(1-\Delta,\kappa)$; an exact two-team Thurstone-Mosteller check shows the approximation omits prior variance, fixed by $\beta_i^2=\beta^2+\sigma_i^2$; multi-team outcomes factor into pairs; team skill is the sum of member skills and updates are shared in proportion to $\sigma_{ij}^2$.

## Overview

Let $Z_i=(\theta_i-\mu_i)/\sigma_i$ and $f(z)=P(D\mid z)$ the outcome probability. The posterior of $Z$ has the form $C\phi_k(z)f(z)$, so Corollary 2 applies.

## Main Content

> [!theorem] Exact posterior moments (Eqs. 25-26)
> $\mu_i^{\text{new}}=\mu_i+\sigma_iE\!\left[\partial_{z_i}f/f\right]=\mu_i+E\!\left[\partial\log f/\partial\theta_i\right]$ (the average score of the outcome with respect to $\theta_i$); $(\sigma_i^{\text{new}})^2=\sigma_i^2\bigl(1+E[\nabla^2f/f]_{ii}-E[\partial_{z_i}f/f]^2\bigr)$.
> ^thm-exact-moments

> [!definition] Proposed approximation (Eqs. 27-30)
> Replace expectations by their value at $z=0$ (i.e. $\theta=\mu$):
> $$\mu_i\leftarrow\mu_i+\Omega_i,\;\;\Omega_i=\sigma_i\frac{\partial_{z_i}f(z)}{f(z)}\Big|_{z=0};\qquad\sigma_i^2\leftarrow\sigma_i^2\max(1-\Delta_i,\kappa),\;\;\Delta_i=-\frac{\partial}{\partial z_i}\!\left(\frac{\partial_{z_i}f}{f}\right)\Big|_{z=0}.$$
> $\kappa>0$ is a small floor because $1-\Delta_i$ can be negative. $\Omega_i$ is the average relative rate of change of the outcome probability with respect to $\theta_i$; $\Delta_i$ the rate of change of that score.
> ^def-omega-delta

### 3.2 Error analysis (two-team TM)

For two teams with $X_i\sim N(\theta_i,\beta_i^2)$ the joint posterior is $\propto\phi(\tfrac{\theta_1-\mu_1}{\sigma_1})\phi(\tfrac{\theta_2-\mu_2}{\sigma_2})\Phi\bigl(\tfrac{\theta_1-\theta_2}{\sqrt{\beta_1^2+\beta_2^2}}\bigr)$ and the exact posterior mean is (Eq. 33)
$$E[\theta_1]=\mu_1+\frac{\sigma_1^2}{\sqrt{\sum_i(\beta_i^2+\sigma_i^2)}}\;\frac{\phi\bigl(\tfrac{\mu_1-\mu_2}{\sqrt{\sum_i(\beta_i^2+\sigma_i^2)}}\bigr)}{\Phi\bigl(\tfrac{\mu_1-\mu_2}{\sqrt{\sum_i(\beta_i^2+\sigma_i^2)}}\bigr)}.$$
The approximation (Eq. 36) has the same form with $\sum\beta_i^2$ only. **Correction:** use $\beta_i^2\leftarrow\beta^2+\sigma_i^2$ (with a constant $\beta^2$). Appendix C shows the same argument applies to Bradley-Terry, giving $c_{iq}^2=\sigma_i^2+\sigma_q^2+2\beta^2$.

### 3.3 Factorisation of multi-team outcomes

For $k$ teams the exact TM probability needs a $(k-1)$-dimensional integral. Factor $f=\prod_{q}f_q$ so that $\partial f/f=\sum_q\partial f_q/f_q$:
- **Partial-pair** (Eq. 39): $f=\prod_{a=1}^{k-1}P(\text{team ranked }a\text{ beats team ranked }a+1)$ (adjacent ranks only).
- **Full-pair** (Eq. 40): $f=\prod_{i<q}P(\text{outcome of }i\text{ vs }q)$, all $k(k-1)/2$ pairs.
PL factors naturally by stage.

### 3.4 Individual skills inside teams

> [!definition] Team strength is additive
> $\theta_i=\sum_{j=1}^{n_i}\theta_{ij}$, so $\mu_i=\sum_j\mu_{ij}$ and $\sigma_i^2=\sum_j\sigma_{ij}^2$.
> Updates (Eqs. 43-44): $\mu_{ij}\leftarrow\mu_{ij}+\dfrac{\sigma_{ij}^2}{\sigma_i^2}\Omega_i$, $\;\sigma_{ij}^2\leftarrow\sigma_{ij}^2\max\!\bigl(1-\dfrac{\sigma_{ij}^2}{\sigma_i^2}\Delta_i,\kappa\bigr)$.
> ^def-team-additive

So the team's skill change is distributed in proportion to member variances: uncertain players move more. (Derived from $f(z)=\bar f(\bar z)$ with $Z_i=\sum_j\sigma_{ij}Z_{ij}/\sigma_i$.)

## Examples

> [!example] Variance floor in action
> **Setup.** $\mu=25$, $\sigma^2=(25/3)^2\approx69.4$ for both players, $\beta^2=(25/6)^2\approx17.4$, one win.
> **Solution.** $c^2=2\sigma^2+2\beta^2\approx173.6$; see numbers in [[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]: $\sigma^2$ falls from 69.4 to about 65.1 (a 6% reduction after one game).
> **Interpretation.** Early games move means a lot but variances slowly - which is why $\gamma_q$ (an additional damping factor in the BT algorithm) can matter.

## Connections

- Compare with the Kalman gain: gain $\approx\sigma_i^2/c_{iq}$ times a score residual $(s-\hat p)$ ([[The Kalman Filter]]).

## See Also

[[Weng and Lin 2011 - Bradley-Terry Update Algorithms]] · [[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]]
