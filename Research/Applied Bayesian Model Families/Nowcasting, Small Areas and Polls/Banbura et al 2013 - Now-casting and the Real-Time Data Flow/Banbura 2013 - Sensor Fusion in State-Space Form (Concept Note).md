---
title: "Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]"
source_location: "Concept note, no raw source (applies Secs. 2.1-2.3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
doc_type: paper
depends_on:
  - "[[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]]"
  - "[[Banbura 2013 - News Decomposition and Real-Time Vintages]]"
used_by:
  - "[[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]]"
aliases:
  - "sensor fusion state space"
  - "multi-instrument identification"
  - "range-only localisation"
---

# Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)

> [!summary]
> Concept note, no raw source. Combining instruments with different noise, bias and sampling is the nowcasting recipe applied to physical measurements: one latent state, several observation models, missing rows, and checks of identification and overconfidence. It covers the PyMC examples E96 (snow pillow), E97 (sea level), E98 (GDP/GDI vintages) and E99 (range-only localisation). Literature: Harvey (1989); Durbin & Koopman (2012); Särkkä (2013, *Bayesian Filtering and Smoothing*); Jacobs/Croushore on data revisions; Mariano & Murasawa (2003, *J Appl Econometrics* 18(4): 427-443, closed access).

## Overview
Four recurring ideas. Link the existing notes rather than re-deriving them: [[Linear-Gaussian State-Space Models]], [[The Kalman Filter]], [[Marginal Likelihood via the Kalman Filter]], [[The RTS Smoother]].

## Main Content

> [!definition] Multi-sensor observation model
> Latent state $x_t=Fx_{t-1}+w_t$; sensor $s$ observes $y^{(s)}_t=a_s+b_s\,H_s x_t+\epsilon^{(s)}_t$ with its own offset $a_s$, gain $b_s$, noise $\sigma_s$, and possibly a slowly drifting bias $a_{s,t}=a_{s,t-1}+\eta_t$. Joint log-likelihood from the Kalman filter, optionally added to a PyMC model via `pm.Potential` (E96) or by integrating the path out with a banded precision matrix (E98). ^def-multisensor

**E96 snow pillow.** A snow budget as state; four observation models (the dead pillow's neighbours plus snow course) with latent density and gauge catch ratio; baseline quick fixes; an eight-week backtest exposes overconfidence that a slowly drifting sensor error repairs. Lesson: independent-noise fusion is overconfident when errors are autocorrelated; model sensor drift or inflate $\sigma_s$.

**E97 three instruments.** Tide gauge measures ocean + land, altimetry measures ocean, GPS measures land. The observation matrix has era-dependent rank: gauge-only eras cannot separate ocean rise from subsidence (divergent posterior), and joining other instruments identifies them. Mission offsets and antenna steps are parameters. Posterior correlation between ocean and land rates measures how well they are identified.

> [!theorem] Identification by rank (statement)
> If $y_t=H_{e}x_t+\epsilon_t$ with $H_e$ era-dependent, and the rates $(r_o,r_\ell)$ enter only through $r_o+r_\ell$ whenever $\text{rank}(H_e)$ for the era is deficient in that direction, then the data in that era constrain only the sum; the posterior of the difference is the prior. Adding a sensor that loads on $r_\ell$ alone breaks the degeneracy, and $\text{Corr}(r_o,r_\ell\mid\text{data})$ shrinks toward 0. ^thm-rank

**E98 real-time vintages.** Monthly latent AR(1) path; quarterly GDP via [[Banbura 2013 - Mixed Frequency State Space and Mariano-Murasawa Aggregation]]; GDP and GDI are two noisy measurements with correlated errors; monthly payrolls, IP, retail sales, income are monthly sensors; ragged edge and masked pandemic months as missing rows; fit and evaluate against the vintage actually available at the time ("true vintages vs a preprocessed file that knows the future"); a revision-noise term separates first-release error from news ([[Banbura 2013 - News Decomposition and Real-Time Vintages]]).

**E99 range-only localisation.** Position state (with odometry/gyro dynamics); each beacon returns a noisy range $r=\|p-b\|\cdot s+o+\nu$; calibrate offset $o$, scale $s$ and an ex-Gaussian (Normal + Exponential) non-line-of-sight mixture against ground truth; check with LOO, posterior predictive and PIT on a held-out run; gyro drift not visible in the calibration run is a limitation. "Which beacon to ping" is a design question: choose the next range to maximise expected information (expected reduction in position variance), a Bayesian-design idea.

## Examples

> [!example] Two sensors, one state
> $x=10$. Sensor A: $\sigma_A=1$, unbiased; sensor B: $\sigma_B=0.5$ but bias $+0.8$. Naive precision-weighted mean of observations $9.7$ and $10.9$: $(9.7\cdot1+10.9\cdot4)/5=10.66$ (biased by 0.64). Model the bias with prior $N(0,0.5^2)$ and the posterior mean shifts back toward about 10.2 and the interval widens: bias is only partly identified with two sensors, so extra sensors or a calibration period are needed. ^ex-sensor

```python
# PyMC 5 sketch (untested): two sensors with offsets, shared latent random-walk state
import pymc as pm
with pm.Model():
    sigma_x = pm.HalfNormal("sigma_x", 0.5)
    x = pm.GaussianRandomWalk("x", sigma=sigma_x, shape=T)
    off = pm.Normal("off", 0, 0.5, shape=S)           # sensor offsets, first fixed to 0 by design
    sig = pm.HalfNormal("sig", 1, shape=S)
    for s in range(S):
        pm.Normal(f"y{s}", x[idx[s]] + off[s], sig[s], observed=y[s])
```

## Connections
Marketing: combining an experiment, an MMM and a tracker as three instruments of the same lift needs exactly these checks: bias per instrument, correlated errors, identification by rank, and calibration against a held-out truth (a holdout geo test). Geo-experiments: [[Geo-Experiment Methodology - Overview]].

## See Also
[[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]] · [[Bayesian Structural Time-Series Model]]
