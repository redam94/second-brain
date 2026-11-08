---
title: "Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/count-likelihoods
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature: Luria & Delbruck 1943, Genetics 28:491-511; Lea & Coulson 1949, J. Genetics 49:264-285; Ma, Sandri & Sarkar 1992, J. Applied Probability 29:255-267; Peccoud & Ycart 1995, Theor. Popul. Biol. 48:222-234; Raj et al. 2006, PLoS Biology 4:e309)"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
  - "[[Monsters and Mixtures]]"
used_by:
  - "[[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]]"
aliases:
  - Luria-Delbruck distribution
  - fluctuation test
  - telegraph model
  - transcriptional bursting
  - Poisson-Beta distribution
  - compound Poisson count likelihood
---

# Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)

> [!summary]
> Concept note, no raw source; citations from memory, verify before formal use. Two classic biology problems yield **non-standard count likelihoods built from latent stochastic processes**. The Luria-Delbruck (LD) distribution is a compound Poisson: a Poisson number of mutation events, each producing a heavy-tailed clone, whose total gives 'jackpot' cultures. The telegraph (bursting) model gives a Poisson-Beta mixture for mRNA counts. In both, the likelihood is computable (a recursion; a mixture integral) and parameters are identified only up to the combinations the distribution depends on. Examples E53 and E55.

## Overview

Both are mixtures over a latent random quantity that is integrated out: LD sums over the number and sizes of mutant clones; the telegraph model integrates over the fraction of time the gene is on. Standard Poisson or negative-binomial likelihoods misfit because the variance far exceeds the mean (overdispersion) with a specific tail shape.

## Main Content

### Luria-Delbruck fluctuation test

Setup: many parallel cultures grow from a few cells; mutants resistant to a selective agent arise at random during growth; count resistant colonies $r$ per culture after plating. Luria & Delbruck (1943) argued that if mutations are *random* (arising before selection) the variance of $r$ across cultures far exceeds the mean (jackpots from early mutations), unlike induced mutation, where $r$ would be Poisson.

> [!definition] Luria-Delbruck (Lea-Coulson) model
> Number of mutation events $N\sim\text{Poisson}(m)$, where $m$ is the expected number of mutational events per culture (mutation rate $\times$ final cell number, up to model details). Each event founds a clone of final size $K_j$ with $P(K\ge k)\approx 1/k$, i.e. $P(K=k)=1/(k(k+1))$ (heavy tail, infinite mean in the continuum limit). Observed mutants $R=\sum_{j=1}^NK_j$ — a **compound Poisson** variable.
^def-ld-model

> [!theorem] Ma-Sandri-Sarkar recursion for the LD distribution
> With $p_r=P(R=r)$:
> $$p_0=e^{-m},\qquad p_r=\frac{m}{r}\sum_{i=0}^{r-1}\frac{p_i}{r-i+1}\quad(r\ge1).$$
> *Reason:* the generating function of a compound Poisson is $\exp\{m(G_K(s)-1)\}$ and the clone-size law $1/(k(k+1))$ gives a convolution recursion for the coefficients. Verified numerically against simulation below.
^thm-ld-recursion

**Inference.** The likelihood for $C$ cultures with counts $r_1..r_C$ is $\prod_cp_{r_c}(m)$ (recursion up to the largest count; for very large counts use asymptotic tails $p_r\sim m/r^2$ or truncate with a censored treatment). The Bayesian mutation-rate estimate $m\mid r_{1:C}$ is then straightforward; a prior on $m$ (log-uniform or weakly informative lognormal) and the plating efficiency $\epsilon$ (a thinning, so mutants are Poisson-thinned) can be added. Estimating $m$ with the mean of $r$ is badly biased because of jackpots; classic estimators use the proportion of zeros (the $p_0$ method: $\hat m=-\log\hat p_0$) or the median.

### Telegraph (bursting) model

> [!definition] Telegraph model of transcription
> A gene switches on at rate $k_{on}$ and off at rate $k_{off}$; while on it makes mRNA at rate $\rho$; mRNA degrades at rate $\delta$ per molecule.
> **Stationary mRNA count** (Peccoud & Ycart 1995): a Poisson-Beta mixture
> $$X\mid p\sim\text{Poisson}\Big(\tfrac{\rho}{\delta}p\Big),\quad p\sim\text{Beta}\Big(\tfrac{k_{on}}{\delta},\tfrac{k_{off}}{\delta}\Big).$$
> Mean $=\frac{\rho}{\delta}\frac{k_{on}}{k_{on}+k_{off}}$; variance $=\text{mean}+\big(\tfrac{\rho}{\delta}\big)^2\text{Var}(p)$, so Fano factor $>1$ ("bursty").
^def-telegraph-poisson-beta

**What a snapshot identifies.** The stationary distribution depends on the rates only through $(k_{on}/\delta,\ k_{off}/\delta,\ \rho/\delta)$. A snapshot of mRNA counts across cells therefore identifies three *dimensionless ratios* but **not the absolute timescale** ($\delta$): doubling all four rates leaves the distribution unchanged. Absolute rates need additional data (time courses, half-life measurements, allele-resolved sequencing). Further, when $k_{off}\gg\delta$, $k_{on}\ll k_{off}$ the Beta approaches a gamma and the model becomes a **negative binomial** with burst size $\rho/k_{off}$ and burst frequency $k_{on}$ (in units of $\delta$), only two combinations are then identified (burst size and frequency); weak identification of the four parameters is the typical finding.

## Examples

**Check the LD recursion by simulation and the telegraph moments by Gillespie (runs; verified).**
```python
import numpy as np
rng = np.random.default_rng(3); m = 1.0
def lea_coulson(m, R):
    p = np.zeros(R+1); p[0] = np.exp(-m)
    for r in range(1, R+1): p[r] = (m/r)*sum(p[i]/(r-i+1) for i in range(r))
    return p
p = lea_coulson(m, 60)
N = rng.poisson(m, 100000)
R = np.array([0 if k == 0 else int(np.floor(1/rng.uniform(size=k)).sum()) for k in N])   # clone size K = floor(1/U)
for r in (0, 1, 2, 5, 10, 30): print(r, round(p[r], 4), round(np.mean(R == r), 4))
# 0: 0.3679 vs 0.3669; 1: 0.1839 vs 0.1837; 5: 0.0343 vs 0.0334; 30: 0.0012 vs 0.0012
print(np.mean(R >= 100))     # about 0.01: a 1% chance of a jackpot culture with >=100 mutants when m=1
```
Gillespie check for the telegraph model ($k_{on}=0.5,k_{off}=1,\rho=20,\delta=1$): SSA at $T=30$ over 3,000 cells gives mean 6.71, variance 41.1; the Poisson-Beta mixture gives mean 6.66, variance 42.0; theory mean $\rho k_{on}/(\delta(k_{on}+k_{off}))=6.67$ (Fano about 6, strongly bursty).

**PyMC sketch (untested).** `pm.Mixture` with `pm.Beta`-distributed latent $p$ is awkward; instead use `pm.CustomDist` with a log-probability computed by Gauss-Jacobi quadrature over $p$, or a negative-binomial approximation in the bursting limit. LD: `pm.CustomDist("r", m, logp=ld_logp, observed=counts)` with the recursion implemented via `pt.scan`.

## Relevance to marketing measurement

Jackpot-type heavy tails arise whenever small numbers of events trigger large cascades (viral shares, influencer posts); a compound-Poisson model with heavy-tailed cascade sizes is the right likelihood for such counts, and standard overdispersed Poisson underestimates the chance of extremes. The identifiability lesson (snapshots identify only ratios; add time-resolved data to fix the scale) parallels cross-sectional MMM data failing to identify carry-over timescales.

## Connections

[[Monsters and Mixtures]], [[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]] (Poisson mixture of normals), [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] (cascades as self-exciting processes), [[Likelihoods Built on Differential Equations (Concept Note)]] (the chemical master equation behind the telegraph model is a linear ODE system for probabilities).

## See Also

[[Surplus-Production State-Space Models for Fisheries (Concept Note)]], [[Neural Likelihood Estimation and Sequential Neural Likelihood]] (when the stationary distribution is not available in closed form).
