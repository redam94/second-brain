---
title: "Wiecki 2013 - Parameter Recovery Simulations and Detection Power"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/example
  - doc/paper
source: "[[raw/Wiecki 2013 - HDDM Hierarchical Bayesian Drift-Diffusion Model in Python.pdf]]"
source_location: "Simulations and Results, pp. 7-9; Figures 6-8; Discussion"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model"
doc_type: paper
depends_on:
  - "[[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]]"
used_by:
  - "[[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]"
aliases:
  - "HDDM simulation study"
  - "parameter recovery drift diffusion"
  - "hierarchical Bayes power DDM"
---

# Wiecki 2013 - Parameter Recovery Simulations and Detection Power

> [!summary]
> Three simulation experiments compare hierarchical Bayes (HB), non-hierarchical Bayes (nHB), maximum likelihood (ML) with the Navarro-Fuss likelihood, and the $\chi^2$-quantile method. HB has the lowest trimmed mean absolute error and the highest probability of detecting a drift-rate difference (vs trials and subjects) and a trial-by-trial covariate effect, with the largest advantage at few trials.

## Overview

The paper asks which estimator is best when data are scarce. It evaluates (i) **parameter recovery** (trimmed MAE), (ii) **detection likelihood** of a between-condition drift difference, and (iii) detection of a **covariate effect on drift**. Code is in `HDDM-paper` on GitHub (not reproduced).

## Main Content

> [!definition] Simulation design
> **Experiments 1 and 2.** Two drift rates $v_1,\ v_2=2v_1$. Experiment 1: 12 subjects, trials per condition $\in\{20,30,40,50,75,100,150\}$. Experiment 2: 75 trials, subjects $\in\{8,12,16,20,24,28\}$. Thirty multi-subject data sets per cell. Group parameters drawn $v_1\sim U(0.1,0.5)$, $a\sim U(0.5,0.2)$ [as printed], $t\sim U(0.2,0.5)$, $s_v\sim U(0,2.5)$, $s_z=s_t=0$; subject parameters add zero-mean Gaussian noise with SD $0.2,0.2,0.1,0.1$ to $v_1,a,t,s_v$ (and the same noise for $v_2$).
> **Experiment 3.** 12 subjects, covariate effect size $\in\{0.1,0.3,0.5\}$, same trial grid. Subject-level auxiliary $\alpha_i\sim N(1,0.1)$; trial drift $\sim N(\alpha_i,1)$ correlated with a standard-normal covariate at the given effect size.
> **Detection rules.** For non-hierarchical methods (ML, quantiles, nHB): paired $t$-test of the two drifts (Exp. 1-2) or one-sample $t$-test of the covariate slope (Exp. 3), $p<0.05$. For HB: an effect is detected if 0 lies outside the 2.5%-97.5% posterior interval of the group difference/coefficient. Detection likelihood = detected runs / total runs. The largest 5% errors per method are dropped before computing MAE (ML and quantile estimators occasionally return absurd values).
^def-sim-design

> [!theorem] Empirical findings (qualitative; paper reports figures, not tables)
> 1. **Recovery (Fig. 6).** HB has the lowest MAE for all parameters; the HB-minus-ML error difference has an upper 95% interval bound below zero throughout, with the largest effects on **drift rate** and **threshold** at few trials.
> 2. **Detection vs trials/subjects (Fig. 7; trials version omitted).** HB plus posterior-interval testing has the highest probability of detecting the drift difference; results for Exp. 1 and 2 are very similar.
> 3. **Trial-wise covariate (Fig. 8).** Only a modest gain at effect size 0.1, but up to about **+20 points** in detection probability at larger effects and fewer trials.
> 4. **Source of the gain.** A $t$-test applied to the HB estimates raised detection "dramatically", so the benefit is **not** from Bayesian testing but from hierarchical shrinkage. (A $t$-test is invalid on hierarchical estimates because they are not independent, so those results were omitted.)
^thm-sim-findings

**Why hierarchy helps.** With 20-50 trials per subject, individual drift and threshold are weakly identified and strongly correlated, so single-subject estimators have heavy-tailed errors. Shrinkage toward the group mean trades small bias for a large variance reduction (the same logic as a [[Hierarchical Models|hierarchical model]] with few observations per unit).

## Examples

> [!example] Using the design to plan an experiment
> The authors note the simulations "can also inform experimental design by showing the minimum number of trials and subjects" needed for a target precision or power. A study with 12 subjects expecting drift effect $0.3$ would read the Figure 8 curve at the planned trial count; if detection probability is below 0.8 the simulator can be rerun with more trials per subject (cheaper in this regime than more subjects, because shrinkage makes extra trials count for more at small $n$).
^ex-design-planning

```python
# Detection-rate harness (untested pseudocode of the paper's logic)
def detect_hb(post_diff):          # post_diff: posterior samples of group v2 - v1
    lo, hi = np.percentile(post_diff, [2.5, 97.5]); return not (lo <= 0 <= hi)
rate = np.mean([detect_hb(fit_hb(simulate(n_subj, n_trials))) for _ in range(30)])
```

## Discussion and limitations
HDDM recovers latent processes "based solely on RT and choice data" and links them to EEG-measured theta; extension to fMRI is flagged as promising but noisy. Limitations noted: only binary decisions; DIC bias toward complexity; simulations use 30 data sets per cell and unequal prior assumptions favour HB when its priors match the generating distribution; inter-trial variabilities not estimated per subject.

> [!tip] Relevance to marketing measurement
> Hierarchical shrinkage gains at small $n$ per unit mirror geo-level or creative-level estimation in [[Hierarchical Models]]: pooled structure beats per-unit estimates when each unit has little data. The paper's evidence is about cognitive parameters, not marketing.

## Connections
[[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]], [[Simulation-Based Calibration - Overview]] (a more rigorous way to test recovery).

## See Also
[[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]
