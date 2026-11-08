---
title: "Hullman 2015 - Study Design and Distribution Tables"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]"
source_location: "Sec. 3-4, Tables 1-3, pp. 5-12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Hullman 2015 - Hypothetical Outcome Plots"
doc_type: paper
depends_on:
  - "[[Hullman 2015 - Hypothetical Outcome Plots - Overview]]"
  - "[[Hullman 2015 - HOP Method and Related Work]]"
used_by:
  - "[[Hullman 2015 - Results and Mean Absolute Error]]"
aliases:
  - HOP user study design
  - Hullman Tables 1-3
---

# Hullman 2015 - Study Design and Distribution Tables

> [!summary]
> 288 US Mechanical Turk workers (96 per condition: HOPs, violin, error bar) each completed four univariate trials (three questions each), four bivariate trials (Pr(B > A)) and one trivariate trial (Pr(B > A and B > C)). Stimuli are 5000 draws from normal distributions; HOP frames advance every 400 ms. Four hypotheses (H1-H4) predict where each display should win.

## Overview

The outcome measure is **absolute error** between the reported and correct value. The authors deliberately avoid asking for confidence because "there is no correct amount of confidence to report", and follow Ibrekk and Morgan: ask for numeric properties (for example probability above a threshold). Error bars in the experiment show 95% *coverage* of the underlying distribution, not confidence intervals, to isolate visual decoding from statistical inference.

## Main Content

**Apparatus (3.1).** Values drawn from normal distributions (negative draws rounded to 0). One, two or three variables A, B, C (solute concentrations in ppm). Stimuli built in D3. HOP frame step 400 ms, enough for eye movement and silent counting; looped after 5000 frames; viewers could pause or step (35% used controls on the first screen, about 10% on later screens). Median frames viewed 89 (mean 101, SD 79).

**One-variable tasks (3.2).** Questions: (1) mean $\mu$; (2) how often measurements exceed the red dot (frequency out of 100); (3) how often between $k_2$ and $k_3$. $k_2$ is the nearest multiple of 10 below $\mu$ and $k_3$ the nearest multiple of 10 at least 20 above $\mu$.

| Type | $\sigma$ | $D=\lvert\mu-k_1\rvert$ | $\Pr(X>\mu+D)$ |
|---|---|---|---|
| 1 | 3 (low) | 5 | 5% |
| 2 | 3 (low) | 20 | 0% |
| 3 | 17 (high) | 5 | 39% |
| 4 | 17 (high) | 20 | 12% |

Four $\mu$ values (131, 344, 523, 672) are crossed with the four types by a Latin square; all 24 orders of the four types are used, giving 96 sequences; the red dot is randomly above or below $\mu$.

**Two-variable tasks (3.3).** Report how often B > A out of 100.

| Dist. | $\mu_A$ | $\sigma_A$ | $\mu_B$ | $\sigma_B$ | corr | $\Pr(B>A)$ |
|---|---|---|---|---|---|---|
| 5 | 40 | 15 | 45 | 15 | 0 | 59% |
| 6 | 50 | 10 | 60 | 10 | 0 | 76% |
| 7 | 80 | 2 | 85 | 2 | 0 | 96% |
| 8 | 55 | 15 | 60 | 15 | 0.95 | 85% |

Distribution 8 has the same mean gap and spread as 5, but a very high correlation makes Pr(B > A) high; error bars and violins do not convey correlation, HOPs do. Verified here: $\Phi(5/\sqrt{450})=0.593$; $\Phi(10/\sqrt{200})=0.760$; $\Phi(5/\sqrt8)=0.961$; for the correlated case SD of $B-A$ is $\sqrt{225+225-2(0.95)(225)}=4.74$, $\Phi(5/4.74)=0.854$.

**Three-variable task (3.4).** How often B is larger than both A and C.

| Type | $\mu_A,\sigma_A$ | $\mu_B,\sigma_B$ | $\mu_C,\sigma_C$ | $\Pr(B>A,B>C)$ |
|---|---|---|---|---|
| 9 | 40, 10 | 55, 10 | 40, 20 | 66% (Monte Carlo here: 0.667) |

**Subjects and power (3.5).** Power analysis on bivariate questions using pilot SDs of MAE of 11 (HOPs) and 18 (error bars): to detect a 10-point MAE difference with 90 subjects per treatment, rejection probability was 82%; 96 per condition were run (multiple of 24 for counterbalancing), total 288. Mechanical Turk, US workers with at least 95% approval; base USD 0.90 plus USD 0.15 per correctly answered trial (max total USD 2.25). Quality control: an item asking the value at the red dot; off by more than 30 on any of four trials (y-axis range 160) led to exclusion and replacement (1 HOPs, 4 violin, 7 error bar). Dropout 13.1% HOPs, 14.4% error bars, 9.4% violin; replaced. IRB approved (University of Michigan HUM00065618).

> [!definition] Hypotheses
> **H1** For the mean of one variable, error bars and violins have lower error than HOPs when $\sigma$ is high (types 3,4), not when low. **H2** For Pr(A > k) and Pr(between), violin plots have lower error than error bars and HOPs. **H3** For Pr(B > A), HOPs have lower error than violins and error bars. **H4** For Pr(B > A and B > C), HOPs have lower error than violins and error bars.
^def-hullman-hypotheses

Rationale: HOP mean estimates have standard error $\sigma/\sqrt n$ (one frame gives precision $\sigma$), so high $\sigma$ hurts; violins show area for CDF questions; for joint questions no simple visual operation exists on static marginals.

## Examples

Replicating the bivariate probabilities: see the verified values above.

## Connections
- The analytic precision bound underlying H1: [[Hullman 2015 - Precision of Inference from HOPs]].

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
