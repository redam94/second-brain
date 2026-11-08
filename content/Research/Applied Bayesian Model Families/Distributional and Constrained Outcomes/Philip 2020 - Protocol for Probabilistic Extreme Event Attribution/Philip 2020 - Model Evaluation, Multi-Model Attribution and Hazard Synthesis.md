---
title: "Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]]"
source_location: "Sec. 5-7 (Steps 4-6), Figs. 7-9, pp. 190-195"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
doc_type: paper
depends_on:
  - "[[Philip 2020 - Trend Models and Natural Variability]]"
used_by:
  - "[[Philip 2020 - Vulnerability, Exposure and Communication]]"
aliases:
  - model evaluation attribution
  - hazard synthesis
  - weighted average log PR
  - chi-square inflation
  - fixed forcing transient forcing
---

# Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis

> [!summary]
> Step 4 asks whether climate models can represent the extreme (general properties, statistical description of extremes with overlapping CIs on $\sigma$ or $\sigma/\mu$ and $\xi$, physical causes). Step 5 computes $PR$ and $\Delta I$ from fixed-forcing (current vs counterfactual) and transient runs. Step 6 synthesises observations and models: a weighted average of $\log PR$ when intra-ensemble variability dominates, inflated by $\sqrt{\chi^2/\mathrm{dof}}$ when model differences matter, and no synthesis when observed and modelled trends are incompatible.

## Overview

Why models: they provide many more data points (smaller confidence intervals from natural variability) at the cost of systematic biases. Start with as large a set of models as possible (most are not designed to represent extremes; single models underestimate trend uncertainty: Annan and Hargreaves 2010; Yokohata et al. 2012; van Oldenborgh et al. 2013).

## Main Content

### Step 4 - model validation (three parts)

1. **General properties**: resolution and processes adequate? (tropical cyclones need ~25 km, Murakami et al. 2015; short-duration convective rain needs ~1 km non-hydrostatic, Kendon et al. 2014; orography; seasonal cycle and spatial pattern vs observations.)
2. **Statistical description of extremes**: do the fit parameters agree with those from observations within uncertainty? Allow an overall bias correction - additive for temperature, multiplicative for precipitation and wind. *The model is "good enough" if the CIs of the remaining parameters ($\sigma$ for temperature, $\sigma/\mu$ for precipitation and wind, and $\xi$ where appropriate) overlap those from observations.* The trend $\alpha$ can be compared only when the source of a discrepancy is known (e.g. CMIP5 shows a strong warming trend in India's warmest afternoon, observations none due to aerosols and irrigation - models not good enough). Natural variability can hide systematic deficiencies; Kew et al. (2019) 2017 European heat wave: models overestimated large-area variability in the Balkans so formal attribution was impossible there but possible at stations (test less powerful).
3. **Physical causes**: ENSO teleconnections realistic? meteorological conditions realistic (Louisiana: include one-third non-hurricane events)? source-water tracing less useful (Eden et al. 2018). Evaluation of the response to forcing is deferred to Step 6.

> [!definition] Bias correction
> Full-distribution correction: additive on $\mu$ (difference between model and observations) and multiplicative on $\mu/\sigma$; often yields model return values very different from observed ones. Simpler: evaluate the model at the *same return period* as in observations ($p_0$ fixed), giving up model estimation of return periods. For pooled ensembles (EURO-CORDEX) correct each model individually; or use pre-bias-corrected sets with a specific assessment for extremes (Luu et al. 2018).
^def-biascorr

### Step 5 - attribution from models

- **Fixed forcing** (Allen 2003): two experiments, current vs counterfactual (pre-industrial gases and aerosols, adjusted SSTs and sea ice, ideally sampling a set of pre-industrial SST fields, Schaller et al. 2016). $PR$ by counting (no assumptions) or by extreme-value fits (more precision, more assumptions); threshold from setting the current-run return period equal to the observed. CI from the two independent probabilities. Example: weather@home, northern England and Scotland December 2015 (storm Desmond): a 1-in-5-year event today would have been 1-in-10 (95% CI 6-18) without anthropogenic climate change; likelihood increased by a factor of 1.3-3.5 (Otto et al. 2018a).
- **Transient forcing**: analyse like observations (pooled members; same fit, e.g. GPD scaling with GMST). Avoid data to 2100 (local forcings such as aerosols differ). Alternative: short windows (e.g. 30 y) of a large ensemble treated as fixed climates (EURO-CORDEX). Example: Uhe et al. (2018) south-east Kenya 2016 drought, EC-Earth 16 members, GPD scaled with GMST: $PR=1.4$ (95% CI 1.1-2.1) between 2016 and 1920. Future statements for 1.5, 2, 3 C above pre-industrial.
- Some models give both fixed and transient estimates with independent CIs (weather@home; HadGEM3-A).

### Step 6 - hazard synthesis

> [!theorem] Synthesis rules
> 1. Bring all fits to a common baseline (often 1900) using the same shift/scale assumption; assume natural forcings small over the last century (not always true locally; aerosols, irrigation, urban heat can distort).
> 2. Compare $PR$ and $\Delta I$ graphically with 95% CIs (Fig. 9).
> 3. Compute $\chi^2/\mathrm{dof}$ of the central values vs their uncertainties, $\mathrm{dof}=$ number of fits $-1$. If $\approx1$, intra-ensemble variability (natural variability + multi-model spread) dominates (often precipitation) - take a **weighted average**, assuming $\log PR$ is normal and results independent; for shift fits $\Delta I$ is normal, for scale fits average $\log\Delta I$ and exponentiate. Asymmetric bootstrap ranges could be treated separately (open question).
> 4. If $\chi^2/\mathrm{dof}\gg1$, framing or model uncertainty matters: if SST-forced and coupled experiments form two incompatible groups, refine or split the question (conditional on the ocean state, or add SST-forced experiments from other years); if no grouping, inflate the uncertainty by $\sqrt{\chi^2/\mathrm{dof}}$ (Eden et al. 2016; van Oldenborgh et al. 2017; Philip et al. 2018c) - a better-defined method is under trial.
> 5. If observed and modelled trends are incompatible there is no way to synthesise: no attribution (or projection) statement until all factors are in the models.
^thm-synthesis

Future statements: "As the planet continues to warm, at 2 C above pre-industrial this extreme would be expected to occur about X (Y to Z) more/less often than now" - do not use the same synthesis as for the past. $PR$ depends on the threshold; near the upper end of a bounded distribution ($\xi<0$: heat waves, to a lesser extent cold waves and droughts) small threshold changes alter return periods drastically, so emphasise the more stable lower bound when communicating; with $\xi\ge0$ (high precipitation, cold events) $PR$ is less sensitive.

## Examples

> [!example] Python: inverse-variance weighted log PR with chi-square inflation
> ```python
> import numpy as np
> pr  = np.array([2.1, 3.0, 1.8, 2.6])                         # PR from different fits (illustrative)
> lo  = np.array([1.2, 1.7, 1.0, 1.5]); hi = np.array([3.9, 5.2, 3.4, 4.8])  # 95% CIs
> y = np.log(pr); se = (np.log(hi) - np.log(lo)) / (2 * 1.96)
> w = 1 / se**2
> ybar = (w * y).sum() / w.sum(); se_bar = (1 / w.sum())**0.5
> chi2 = (w * (y - ybar)**2).sum(); dof = len(y) - 1
> infl = max(1.0, np.sqrt(chi2 / dof))                          # inflate only if spread exceeds noise
> print(np.exp(ybar), np.exp(ybar - 1.96*se_bar*infl), np.exp(ybar + 1.96*se_bar*infl))
> ```
^ex-synthesis

## Connections

Combining heterogeneous estimates is meta-analysis: see [[Hierarchical Models]] (random-effects treatment of between-model spread) and the Evidence Synthesis cluster. Sensitivity of the answer to the counterfactual: [[Sensitivity Analysis in Observational Studies]].

## See Also

[[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
