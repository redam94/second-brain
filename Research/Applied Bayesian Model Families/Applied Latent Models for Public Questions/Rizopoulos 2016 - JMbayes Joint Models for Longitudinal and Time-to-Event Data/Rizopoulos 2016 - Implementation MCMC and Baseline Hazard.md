---
title: "Rizopoulos 2016 - Implementation MCMC and Baseline Hazard"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Rizopoulos 2016 - The R Package JMbayes.pdf]]"
source_location: "Sec. 3, pp. 5-7; Appendices A-B"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Rizopoulos 2016 - JMbayes Joint Models for Longitudinal and Time-to-Event Data"
doc_type: paper
depends_on:
  - "[[Rizopoulos 2016 - Joint Model Specification and Posterior]]"
used_by:
  - "[[Rizopoulos 2016 - PBC Basic Joint Model and Extended Longitudinal Outcomes]]"
  - "[[Rizopoulos 2016 - JMbayes Joint Models Overview]]"
aliases:
  - "JMbayes MCMC implementation"
  - "joint model baseline hazard splines"
  - "hierarchical centering joint models"
---

# Rizopoulos 2016 - Implementation MCMC and Baseline Hazard

> [!summary]
> `jointModelBayes()` takes a separately fitted `lme()` or `glmmPQL()` mixed model plus a `coxph()` object, and samples by random-walk Metropolis (slice sampling for the error precision, Wishart draw for the random-effects precision) with adaptive proposals taken from the separate fits. Defaults: 3,000 adaptive and 3,000 burn-in iterations, 20,000 kept iterations thinned to 2,000, one long chain, hierarchical centring when the random-effects variance exceeds $\sigma^2/n$.

## Main Content

> [!definition] Design and defaults (Sec. 3.1-3.2)
> Required arguments: mixed-model object, Cox object (`x=TRUE`), `timeVar`. Default association: current value $\alpha\eta_i(t)$. Baseline hazard: penalised B-splines (default 15 knots, 17 coefficients, equally spaced percentiles of event times; `lng.in.kn`, `knots`, `baseHaz`). Survival integral: `GQsurv` = `"GaussKronrod"` (default; 7 or 15 points) or `"GaussLegendre"`, `GQsurv.k` points. Sampler: `n.adapt` 3000 (acceptance rate checked every `n.batch` 100), `n.burnin` 3000, `n.iter` 20000, `n.thin` retains 2000. Student-$t$ random effects if `df.RE` set (MH update of $D^{-1}$). Proposal covariances for $\beta$ and $\mathbf b_i$ come from the mixed model; survival coefficients and spline coefficients use a two-stage time-dependent Cox fit.
^def-jmbayes-design

**Convergence.** One long chain ("one long chain school"); multiple chains by re-running with different `init` and processing the `mcmc` component in `coda`. Diagnostic plots (trace, ACF, density, CPO) in Appendix B via `plot()`.

**Hierarchical centring.** Used when the largest random-effects variance exceeds $\sigma^2/n$, to improve mixing (compare E25's centred vs non-centred vs hierarchically centred parametrisations).

**Speed.** For simple models JMbayes is slower than ML-based JM; for complex models comparable. Writing the MCMC in R is still many times faster than JAGS/WinBUGS/OpenBUGS, which need the "zeros trick" for the non-standard survival likelihood and in-program numerical integration. Fit times in the paper: 2.5-5.5 min typical, 59.3 min for the estimated weight-function model. The main advantage over ML is that extensions (categorical or censored longitudinal outcomes) are simple.

> [!example] Appendix A: knot sensitivity (described in text)
> The basic PBC model is refitted with 10 and 20 knots; results are little sensitive to the number and position of knots because spline coefficients are penalised (tauBs about 520). Left-truncated survival and exogenous time-varying covariates are handled by passing a counting-process `coxph` fit (Appendix C).
^ex-knots

## Connections
[[Efficient MCMC]], [[MCMC Basics]], [[Rizopoulos 2016 - Joint Model Specification and Posterior]].

## See Also
[[Rizopoulos 2016 - JMbayes Joint Models Overview]]
