---
title: "Hoffman 2022 - GHMC and Neal Persistent Slice Sampling"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/definition
  - doc/paper
source: "[[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]"
source_location: "Sec. 1-2.2, pp. 1-3; eqs 1-2; Algorithm 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Sountsov 2022 - MEADS"
doc_type: paper
depends_on:
  - "[[Efficient MCMC]]"
used_by:
  - "[[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]"
  - "[[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]"
aliases:
  - "Generalized HMC"
  - "Persistent Metropolis GHMC"
  - "Neal slice sampling GHMC"
---

# Hoffman 2022 - GHMC and Neal Persistent Slice Sampling

> [!summary]
> GHMC partially refreshes the momentum every iteration, $m\leftarrow\sqrt{1-\alpha}\,m+\sqrt{\alpha}\,\xi$, takes one leapfrog step and negates momentum on rejection. It tends to underdamped Langevin dynamics for small $\epsilon,\alpha$, but suffers a "gauntlet of rejections" that forces tiny steps. Neal's (2020) persistent slice scheme keeps a slice variable $u$ that drifts non-reversibly as a triangle wave so rejections cluster in time, which makes GHMC competitive.

## Overview

Notation: target $p(\theta)$ unnormalised on $\mathbb R^D$; momentum $m$ with $p(\theta,m)=p(\theta)\mathcal N(m;0,I)$; potential $-\log p(\theta)$, kinetic $-\log\mathcal N(m;0,I)$.

## Main Content

> [!definition] HMC proposal and leapfrog (Sec. 2.1)
> With per-dimension step sizes $\epsilon_{1:D}$ the leapfrog integrator is: $m'_d=m_d+\tfrac{\epsilon_d}{2}\nabla_{\theta_d}\log p(\theta)$; $\theta'_d=\theta_d+\epsilon_dm'_d$; $m''_d=m'_d+\tfrac{\epsilon_d}{2}\nabla_{\theta_d}\log p(\theta')$ (Algorithm 1, function `leapfrog`). Reject a proposal $(\theta',m')$ with probability $\max\{0,1-p(\theta',m')/p(\theta,m)\}$. Per-dimension step sizes are equivalent to a diagonal mass matrix or to rescaling $\tilde\theta_d=\theta_d/\epsilon_d$ (Neal 2011).
^def-leapfrog-per-dim

> [!definition] Generalized HMC (Horowitz 1991), eq. 1 and following text
> Each iteration: (1) partially update momentum $m\sim\mathcal N(m\sqrt{1-\alpha},\alpha I)$ with $\alpha\in(0,1]$. This leaves $\mathcal N(0,I)$ invariant, since it adds variance $\alpha$ to variance $1-\alpha$. (2) Propose by one or more leapfrog steps followed by momentum negation and accept with the usual Metropolis ratio. (3) Unconditionally negate the momentum: after an accepted move this undoes the earlier negation; after a rejection it makes the chain "bounce" and reverse, preventing the chain from undoing progress. With $\alpha=1$ this is ordinary one-step HMC.
> In the limit of small $\epsilon,\alpha$ with one leapfrog step per iteration all proposals are accepted and the dynamics simulate underdamped Langevin
> $$
> d\theta=m\,dt,\qquad dm=(\nabla\log p(\theta)-\gamma m)\,dt+\sqrt{2\gamma}\,dW(t),\qquad \gamma=\frac{\alpha}{2\epsilon}.
> $$
^def-ghmc

(The relation $\gamma=\alpha/(2\epsilon)$ follows from matching $\sqrt{1-\alpha}\approx1-\alpha/2$ with $e^{-\gamma\epsilon}$; consistent with the paper's later $\alpha=1-e^{-2\epsilon\gamma}$.)

> [!theorem] The rejection gauntlet (eq. 2)
> Suppose HMC and GHMC both need $T$ leapfrog steps without a rejection to make optimal progress, with energy $E_t$ after $t$ steps. GHMC accepts every step independently, so
> $$
> P^{\text{accept}}_{\text{GHMC}}=\prod_t\min\{1,e^{E_{t-1}-E_t}\}=\exp\Big\{\sum_t\min\{0,E_{t-1}-E_t\}\Big\}\le\min\{1,e^{E_0-E_T}\}=P^{\text{accept}}_{\text{HMC}}.
> $$
> GHMC pays each time energy increases even if later offset, whereas HMC is robust to fluctuations around a stable mean. Symplectic integrators produce stable fluctuations rather than accumulating error, so HMC enjoys them; GHMC must use a much smaller step size to avoid random-walk behaviour from rejections.
^thm-rejection-gauntlet

> [!definition] Persistent slice-sampling GHMC (Neal 2020), Algorithm 1
> Augment with a slice variable $s\sim\text{Uniform}(0,p(\theta,m))$ so $p(\theta,m,s)\propto\mathbb I[s\le p(\theta,m)]$. Hold $s$ fixed: propose $\theta',-m'=\text{leapfrog}(\theta,m;\epsilon)$ and accept iff $s\le p(\theta',m')$. If $s$ is resampled each step this is ordinary GHMC; if $s$ is held for $T$ steps then all $T$ steps are accepted as long as energy never rises by more than $\log p(\theta,m)-\log s$, so accept/reject decisions cluster in time. Work with the reparameterised $u=s/p(\theta,m)$ and update it non-reversibly: in the absence of energy fluctuations $u$ traces a triangle wave of frequency set by $\delta$.
> **`pers_ghmc`$(\theta,m,u;\epsilon,\alpha,\delta)$:** sample $\tilde m\sim\mathcal N(m\sqrt{1-\alpha},\alpha I)$; set $\tilde u=((u+1+\delta)\bmod2)-1$; $\theta',m'=\text{leapfrog}(\theta,\tilde m;\epsilon)$. If $|\tilde u|\le\dfrac{p(\theta')\mathcal N(m';0,I)}{p(\theta)\mathcal N(\tilde m;0,I)}$ return $\big(\theta',m',\tilde u\,\tfrac{p(\theta)\mathcal N(\tilde m;0,I)}{p(\theta')\mathcal N(m';0,I)}\big)$; else return $(\theta,-\tilde m,\tilde u)$.
^def-persistent-ghmc

**Why tuning is hard (end of Sec. 2.2).** In HMC, $\epsilon$ targets an acceptance rate, but with small $\alpha$ GHMC may need a much higher nominal acceptance rate and the persistent scheme complicates its interpretation; NUTS/ChEES use ESJD against a reference state at the start of a trajectory, with no analogue in GHMC; and the drift $\delta$ has no HMC counterpart.

```python
# Persistent-MH GHMC step for a batch of chains (numpy, tested on N(0, diag(1, .5, 2)^2): sd recovered to ~2%)
import numpy as np
rng = np.random.default_rng(1)
def pers_ghmc(th, m, u, eps, alpha, delta, logp, grad):
    mt = m*np.sqrt(1-alpha) + np.sqrt(alpha)*rng.normal(size=m.shape)
    ut = ((u + 1 + delta) % 2) - 1
    m1 = mt + 0.5*eps*grad(th); th1 = th + eps*m1; m2 = m1 + 0.5*eps*grad(th1)
    lr = logp(th1) - 0.5*np.sum(m2**2, -1) - logp(th) + 0.5*np.sum(mt**2, -1)
    ok = np.abs(ut) <= np.exp(np.minimum(lr, 0))
    ratio = np.exp(np.clip(lr, -50, 50))
    return (np.where(ok[:, None], th1, th),
            np.where(ok[:, None], m2, -mt),
            np.where(ok, ut*ratio, ut))
```

## Examples

With $\epsilon=0.5$, $\alpha=0.2$, $\delta=\alpha/2$ on a 3-D Gaussian with $\sigma=(1,0.5,2)$, 2000 chains for 2000 iterations gave empirical standard deviations $(1.016,0.470,2.053)$ against truth $(1,0.5,2)$: GHMC with the persistent slice update leaves the target invariant (this was run in numpy as a check).

## Connections

[[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]] explains how to tune $(\epsilon,\alpha,\delta)$ from other chains; [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] gives the heuristics. Neal (2020) also interleaves GHMC with Gibbs updates for discrete latents, relevant to [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]]. Background: [[Efficient MCMC]].

## See Also
[[Hoffman 2022 - MEADS - Overview]], [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]]
