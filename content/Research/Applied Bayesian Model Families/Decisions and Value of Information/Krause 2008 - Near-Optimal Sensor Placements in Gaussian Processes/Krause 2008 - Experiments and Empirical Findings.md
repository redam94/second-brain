---
title: "Krause 2008 - Experiments and Empirical Findings"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/example
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 9, Figs 9-19, pp. 266-275"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
  - "[[Krause 2008 - Lazy Evaluation and Local Kernels]]"
  - "[[Krause 2008 - Entropy versus Mutual Information Criteria]]"
used_by:
  - "[[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]"
aliases:
  - Sensor placement experiments Intel lab precipitation
---

# Krause 2008 - Experiments and Empirical Findings

> [!summary]
> Two real datasets (Intel Berkeley temperature, Pacific Northwest precipitation) support five findings: nonstationary GPs beat stationary ones; GP-based placements beat the disk model; MI beats entropy and A-, D-, E-optimal design on prediction error; greedy MI is near-optimal and beats random plus exchange heuristics; lazy evaluation and truncated kernels give large speedups at little cost. Figures are plotted, not tabulated, so quantitative claims below are the ones the text states.

## Overview

**Datasets (9.1).** *Temperature:* 46 sensors of the Intel Berkeley network (Fig. 1a); training data at 30-second intervals over 3 consecutive days from 28 Feb 2004; test data the following two days. *Precipitation:* daily rainfall 1949-1994 in Washington and Oregon (Widmann and Bretherton 1999), 167 equal-area regions about 50 km apart; log-transformed, daily mean removed, rainy days only; first two thirds training, last third test. Covariance estimated from training data and regularised by independent measurement noise $\sigma^2=0.1$ (chosen by cross-validation). Error bars are not reported because temporally correlated samples make them overconfident.

## Main Content

| Section | Comparison | Finding (as stated) |
|---|---|---|
| 9.2 | Stationary (isotropic exponential, bandwidth from least-squares variogram) vs nonstationary (Nott-Dunsmuir) GPs, learned from a growing initial deployment (Fig. 9) | Nonstationary GP from 10 sensors matches stationary from 40 (temperature); nonstationary from 20 sensors beats stationary from 160 (precipitation). RMS converges to the empirical-covariance placement as the initial deployment grows. |
| 9.3 | Disk model (radius $r=5$ m, chosen so 20 sensors just cover the space) vs GP-MI placements (Fig. 10) | The geometric criterion "performs poorly" relative to model-based ones; empirical-covariance placement is best, nonstationary close behind. |
| 9.4 | MI vs entropy on morning (8-9 am) and noon (12-1 pm) models and a whole-day model (Figs 11-13) | MI "in almost all cases" gives better RMS/log-likelihood with fewer sensors; on precipitation "often several sensors would have to be additionally placed for entropy to reach the same level". Entropy places sensors near the border (Fig. 11); with 22 sensors MI concentrates on the top and bottom sides where the field is most complex and yields lower predicted variance almost everywhere (Fig. 13). |
| 9.5 | MI vs classical A-, D-, E-optimal design (12 target locations $U$; model $x_S=\Sigma_{SU}\Sigma_{UU}^{-1}x_U+w$) (Fig. 14) | MI has the least RMS error on the targets except at a single sensor; E-optimal is comparable to entropy; D and A are worse. On a precipitation subsample a classical criterion slightly outperforms MI, but for the full 167 locations MI wins. Running times: entropy fastest, truncated MI ($\varepsilon=1$) next; untruncated MI is 3x faster than (fractional) D-optimal and 24x faster than A-optimal. |
| 9.6 | Greedy vs random, hill-climbing with pairwise exchange (PE), and MIP bounds (Figs 5, 15, 16) | Greedy beats the max of 100 random placements; greedy, greedy+PE and random+PE rarely differ (one size-12 case where random+PE edges greedy); greedy within 5% of optimum on 16 nodes; lazy evaluation cuts MI computations from 7125 to 1172 (41.3 s to 8.7 s) for 50 precipitation sensors. |
| 9.7 | Local kernels (Figs 17-19) | Truncation $\varepsilon\in[0.5,1]$ (text) or $[0.5,1.2]$ (caption) balances time and RMS; 7x7 grid with bandwidth 0.1..12.8: local and Gaussian kernels give very similar placements. |

*Observation in the paper that matters for decisions:* placements chosen on an *estimated* model are evaluated by RMS on held-out data, not on the model they were optimised against, so the comparison is honest about model misspecification.

## Examples

Reproducing the qualitative MI-versus-entropy contrast on synthetic data takes a few lines (see [[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]): entropy picks the endpoints of the grid; MI does not.

## Connections
- Marketing: the held-out RMS protocol (fit model on a pilot, choose sites, predict the rest) is directly usable for choosing geos for a pilot measurement design.
- Compare with the PyMC-based E89 workflow: GP with known measurement error, lazy greedy, and EVSI in place of MI ([[Value of Information Concept Note - Kriging with Known Measurement Error and EVSI for Monitor Siting]]).

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
