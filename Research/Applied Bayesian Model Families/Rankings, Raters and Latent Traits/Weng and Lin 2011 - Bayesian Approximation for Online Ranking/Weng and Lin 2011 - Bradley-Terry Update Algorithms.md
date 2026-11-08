---
title: "Weng and Lin 2011 - Bradley-Terry Update Algorithms"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Weng and Lin 2011 - A Bayesian Approximation Method for Online Ranking.pdf]]"
source_location: "Sec. 3.5 and 4.1, pp. 280-283 (Algorithms 1-2)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Weng and Lin 2011 - Bayesian Approximation for Online Ranking"
doc_type: paper
depends_on:
  - "[[Weng and Lin 2011 - Update Rules Derivation and Error Correction]]"
used_by:
  - "[[Weng and Lin 2011 - Halo 2 Experiments and Results]]"
aliases:
  - Weng-Lin Bradley-Terry full pair
  - online Bradley-Terry update rule
---

# Weng and Lin 2011 - Bradley-Terry Update Algorithms

> [!summary]
> Closed-form online rules for the Bradley-Terry model with variance: each player's mean moves by $\sum_q(\sigma_i^2/c_{iq})(s-\hat p_{iq})$ and its variance shrinks by $\sum_q\gamma_q\sigma_i^2 \hat p_{iq}\hat p_{qi}/c_{iq}^2$. Full-pair uses all opponents; partial-pair only adjacent ranks. With two players this is an Elo step with Bayesian step size.

## Overview

Variance-augmented BT (Eq. 48): $P(i\text{ beats }q)=f_{iq}=\dfrac{e^{\theta_i/c_{iq}}}{e^{\theta_i/c_{iq}}+e^{\theta_q/c_{iq}}}$, $c_{iq}^2=\sigma_i^2+\sigma_q^2+2\beta^2$ (via $\beta_i^2=\sigma_i^2+\beta^2$). Ties follow Glicko: $P(i\text{ draws }q)=\sqrt{f_{iq}f_{qi}}$ (Eq. 51).

## Main Content

> [!theorem] Algorithm 1 (BT, full-pair)
> For team $i$ and each opponent $q\ne i$:
> $c_{iq}=(\sigma_i^2+\sigma_q^2+2\beta^2)^{1/2}$, $\hat p_{iq}=\dfrac{e^{\mu_i/c_{iq}}}{e^{\mu_i/c_{iq}}+e^{\mu_q/c_{iq}}}$,
> $\delta_q=\dfrac{\sigma_i^2}{c_{iq}}(s-\hat p_{iq})$, $\eta_q=\gamma_q\dfrac{\sigma_i^2}{c_{iq}^2}\hat p_{iq}\hat p_{qi}$, with $s=1$ if $r(q)>r(i)$ (i beats q), $\tfrac12$ if tied, $0$ if $r(q)<r(i)$.
> Then $\Omega_i=\sum_q\delta_q$, $\Delta_i=\sum_q\eta_q$; team update $\mu_i\leftarrow\mu_i+\Omega_i$, $\sigma_i^2\leftarrow\sigma_i^2\max(1-\Delta_i,\kappa)$; individuals by Eqs. 43-44. The damping weights $\gamma_q\le1$ control how fast variance falls (default $\gamma_q=\sigma_i/c_{iq}$ in the experiments).
> ^thm-bt-full

> [!theorem] Algorithm 2 (BT, partial-pair)
> Same as Algorithm 1 except that $\Omega_i,\Delta_i$ sum only over $Q$ = the teams ranked immediately above and below $i$ (one neighbour for first and last place).
> ^thm-bt-partial

*Derivation sketch.* $\partial f_{iq}/\partial z_i=\tfrac{\sigma_i}{c_{iq}}f_{iq}f_{qi}$ and $\partial f_{qi}/\partial z_i=-\tfrac{\sigma_i}{c_{iq}}f_{iq}f_{qi}$, so $\Omega_i=\sigma_i^2\sum_q\bigl[\tfrac{1}{c_{iq}}(\mathbf 1\{r(q)>r(i)\}-\hat p_{iq})+\dots\bigr]$ and $\partial_{z_i}(\partial_{z_i}f_{qi}/f_{qi})=-\tfrac{\sigma_i^2}{c_{iq}^2}f_{iq}f_{qi}$.

**Relation to Elo.** Elo: $\theta_i\leftarrow\theta_i+K(s-p^*_{iq})$ with $p^*=10^{\theta_i/400}/(10^{\theta_i/400}+10^{\theta_q/400})$. $p^*$ is a variance-free, reparameterised $\hat p$; here $K\leftrightarrow\sigma_i^2/c_{iq}$ varies per player and falls with uncertainty.

## Examples

> [!example] One game, two new players
> **Setup.** Both players $\mu=25$, $\sigma=25/3$, $\beta=25/6$; player 1 wins.
> **Solution.** $c=\sqrt{2\sigma^2+2\beta^2}\approx13.2$; $\hat p=0.5$; $\Omega_1=\sigma^2/c\cdot0.5\approx2.64$, so $\mu_1\approx27.64$, $\mu_2\approx22.36$; $\sigma^2$ drops from 69.4 to about 65.05 (verified numerically below).
> **Interpretation.** A new player moves about 2.6 points on its first result; a veteran with small $\sigma_i$ moves far less.
> ^ex-bt-online

```python
import numpy as np
def bt_full_update(mu, sig2, rank, beta2=(25/6)**2, kappa=1e-4):
    """One player per team. rank: smaller is better; equal ranks tie."""
    k = len(mu); new_mu = mu.copy(); new_s2 = sig2.copy()
    for i in range(k):
        Om = De = 0.0
        for q in range(k):
            if q == i: continue
            c = np.sqrt(sig2[i] + sig2[q] + 2*beta2)
            p = 1/(1+np.exp((mu[q]-mu[i])/c))
            s = 1.0 if rank[q] > rank[i] else (0.5 if rank[q] == rank[i] else 0.0)
            gamma = np.sqrt(sig2[i])/c
            Om += sig2[i]/c*(s-p)
            De += gamma*(sig2[i]/c**2)*p*(1-p)
        new_mu[i] = mu[i] + Om
        new_s2[i] = sig2[i]*max(1-De, kappa)
    return new_mu, new_s2
mu = np.array([25., 25.]); s2 = np.array([(25/3)**2]*2)
print(bt_full_update(mu, s2, [1, 2]))   # mu -> [27.64, 22.36], sig2 -> 65.05
```

## Connections

- Elo, Glicko and TrueSkill compared in [[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]].
- Offline counterpart: [[Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation]].

## See Also

[[Weng and Lin 2011 - Thurstone-Mosteller and Plackett-Luce Update Rules]] · [[Weng and Lin 2011 - Glicko Derivation and Comparison with Elo]]
