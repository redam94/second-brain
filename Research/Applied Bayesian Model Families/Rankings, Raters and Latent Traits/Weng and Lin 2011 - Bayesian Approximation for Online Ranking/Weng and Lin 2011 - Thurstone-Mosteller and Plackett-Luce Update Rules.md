---
title: "Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Sec. 4.2-4.3, pp. 283-287 (Algorithms 3-4); Appendices D-F"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[Weng and Lin 2011 - Bradley-Terry Update Algorithms]]"
used_by:
  - "[[Weng and Lin 2011 - Halo 2 Experiments and Results]]"
aliases:
  - TrueSkill two-team update
  - Weng-Lin Plackett-Luce algorithm
---

# Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules

> [!summary]
> The same framework applied to a Gaussian (Thurstone-Mosteller, TM) performance model with a draw margin reproduces TrueSkill's two-team update exactly, and a Plackett-Luce (PL) variant with tie handling gives a closed-form multi-team rule. TM is numerically touchy; BT-full and PL are recommended.

## Overview

With $\beta_i^2=\sigma_i^2+\beta^2$ and $c_{iq}^2=\sigma_i^2+\sigma_q^2+2\beta^2$ as before.

## Main Content

> [!definition] TM with draw margin $\varepsilon$ (Eq. 65)
> $P(i\text{ beats }q)=P(X_i>X_q+\varepsilon)=\Phi\!\left(\dfrac{\theta_i-\theta_q-\varepsilon}{c_{iq}}\right)$, $\;P(i\text{ draws }q)=P(|X_i-X_q|<\varepsilon)=\Phi\!\left(\dfrac{\varepsilon-(\theta_i-\theta_q)}{c_{iq}}\right)-\Phi\!\left(\dfrac{-\varepsilon-(\theta_i-\theta_q)}{c_{iq}}\right)$.
> ^def-tm-draw

> [!theorem] Algorithm 3 (TM, full-pair)
> Using $V(x,t)=\phi(x-t)/\Phi(x-t)$ and $W(x,t)=V(V+(x-t))$ (Eq. 67), plus draw analogues $\tilde V,\tilde W$ (Eqs. 68-69):
> $\delta_q=\dfrac{\sigma_i^2}{c_{iq}}\times\begin{cases}V(\tfrac{\mu_i-\mu_q}{c_{iq}},\tfrac{\varepsilon}{c_{iq}})&r(q)>r(i)\\ \tilde V(\cdot)&r(q)=r(i)\\ -V(\tfrac{\mu_q-\mu_i}{c_{iq}},\tfrac{\varepsilon}{c_{iq}})&r(q)<r(i)\end{cases}$, and $\eta_q=\gamma_q\dfrac{\sigma_i^2}{c_{iq}^2}\times W(\cdot)$, $\tilde W$, $W$ respectively.
> For $k=2$ and a win by $i$: $\mu_i\leftarrow\mu_i+\frac{\sigma_i^2}{c}V(\frac{\mu_i-\mu_q}{c},\frac{\varepsilon}{c})$, $\mu_q\leftarrow\mu_q-\frac{\sigma_q^2}{c}V(\cdot)$, **identical to the TrueSkill two-player update**.
> ^thm-tm-full

*Numerical safeguard.* When $x-t$ is very negative, $\phi$ and $\Phi$ underflow; as in TrueSkill, if $\Phi(x-t)\le2.22\times10^{-162}$ set $V=-x+t$ (the limit as $x-t\to-\infty$).

### Plackett-Luce with variance and ties (Sec. 4.3)

> [!definition] PL with variance (Eq. 70)
> $f(z)=\prod_{q=1}^k\dfrac{e^{\theta_q/c}}{\sum_{s\in C_q}e^{\theta_s/c}}$, $\;c=\bigl(\sum_i(\sigma_i^2+\beta^2)\bigr)^{1/2}$, $\;C_q=\{i:r(i)\ge r(q)\}$ (the teams not ranked better than $q$). A single $c$ is used for simplicity.
> With ties (Eq. 72): exponent $1/A_q$ with $A_q=|\{s:r(s)=r(q)\}|$ (the geometric mean over the $d$ tied stages).
> ^def-pl-variance

> [!theorem] Algorithm 4 (PL)
> $\hat p_{i,C_q}=\dfrac{e^{\mu_i/c}}{\sum_{s\in C_q}e^{\mu_s/c}}$;
> $\delta_q=\dfrac{\sigma_i^2}{cA_q}\times\begin{cases}1-\hat p_{i,C_q}&q=i\\ -\hat p_{i,C_q}&r(q)\le r(i),\,q\ne i\\ 0&r(q)>r(i)\end{cases}$, $\;\eta_q=\gamma_q\dfrac{\sigma_i^2}{c^2A_q}\hat p_{i,C_q}(1-\hat p_{i,C_q})$ if $r(q)\le r(i)$, else 0; $\Omega_i=\sum_q\delta_q$, $\Delta_i=\sum_q\eta_q$; $\gamma_q=\sigma_i/c$ in experiments.
> ^thm-pl-weng

Appendices D-F give the derivations for BT partial-pair, TM, and PL, using $\partial f/\partial z_i$ and $\partial^2f/\partial z_i^2$ at $z=0$ exactly as in Sec. 3.5.

## Examples

> [!example] TrueSkill-style draw
> **Setup.** Two equal players ($\mu=25$, $\sigma=25/3$, $\beta=25/6$), draw margin $\varepsilon=0.1$.
> **Solution.** For an actual draw, $\tilde V(0,\varepsilon/c)=0$ by symmetry, so means do not move but variances shrink (via $\tilde W$).
> **Interpretation.** A draw between equals carries information on uncertainty, not on the ordering.

## Connections

- TM is the probit analogue of BT; the logistic/probit trade-off mirrors logit vs probit in [[Discrete Choice Models]].

## See Also

[[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]]
