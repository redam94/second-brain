---
title: "Bürkner 2021 - brms Specification Stan Code and Post-Processing"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 3-4, pp. 13-23"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - Priors Hierarchical Pooling and Identification]]"
used_by:
  - "[[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]"
aliases:
  - brms formula syntax IRT
  - brms generated Stan code
---

# Bürkner 2021 - brms Specification Stan Code and Post-Processing

> [!summary]
> An IRT model in brms is the triple family + formula + prior. Group-level terms use the non-centered parameterization; the `|ID|` syntax correlates varying effects across formulas; non-linear formulas (`nl = TRUE`) express 2PL/3PL. Post-processing offers summaries, `hypothesis`, `conditional_effects`, `posterior_predict`, `pp_check`, `loo`, `kfold`, and bridge-sampling Bayes factors.

## Overview

The package fits through Stan (adaptive HMC / NUTS). IRT-specific features are in the formula and prior arguments.

## Main Content

**Family.** `brmsfamily("bernoulli","logit")`; each family has a primary parameter $\mu$ with a link and optional parameters (e.g. `sigma` with log link).

**Formula patterns.**
| Goal | brms formula |
|---|---|
| 1PL, pooled persons and items | `y ~ 1 + (1 \| item) + (1 \| person)` |
| 1PL, non-hierarchical items | `y ~ 0 + item + (1 \| person)` |
| Covariate varying over items | `y ~ 1 + x + (1 + x \| item) + (1 \| person)` |
| Correlated varying effects across parameters | `(1 \|i\| item)` and `(1 \|p\| person)` in every distributional formula |
| 2PL (non-linear) | `bf(y ~ exp(logalpha) * eta, eta ~ 1 + (1\|i\|item) + (1\|id), logalpha ~ 1 + (1\|i\|item), nl = TRUE)` |
| Non-linear transform shared | `nlf(gamma ~ inv_logit(logitgamma))` |
| Free thresholds per item (ordinal) | `resp \| thres(gr = item) ~ 1 + (1\|id)` |
| Category-specific effect | `cs(Anger)` with `family = acat` |

**Priors.** `set_prior("cauchy(0, 5)", class = "sd", group = "person") + set_prior("lkj(2)", class = "cor", group = "person")`; `dpar=` and `nlpar=` target distributional/non-linear parameters; `constant(1)` fixes a parameter (e.g. $\sigma_\theta=1$); class "b" for non-hierarchical coefficients, `coef=` for item-specific priors.

> [!definition] Non-centered group-level effects in generated Stan code
> brms declares standardized `z_1 ~ normal(0,1)` and sets `r_1 = sd_1 * z_1` in transformed parameters, so the sampler explores independent standard normals (with Cholesky factors of correlation matrices when correlated). The linear predictor is built as `mu = X * b` plus a loop `mu[n] += r_1_1[J_1[n]] * Z_1_1[n]`; the likelihood uses `bernoulli_logit_lpmf(Y | mu)`. The half-normal prior is written `normal_lpdf(sd | 0, 3) - normal_lccdf(0 | 0, 3)`, where the constant makes bridge-sampling marginal likelihoods correct.
> ^def-brms-noncentered

**Estimation.** Adaptive HMC with at least two critical tuning parameters set automatically; gradients by algorithmic differentiation. Convergence: $\hat R<1.05$ and effective sample size at least 400; divergences handled by raising `adapt_delta` (0.99 used for diffusion models).

**Post-processing.** `summary`, `plot`, `coef`/`ranef` (person and item parameters), `hypothesis` (posterior contrasts, e.g. SD difference), `conditional_effects` (probability scale), `posterior_predict`, `pp_check`, `log_lik`, `loo` (approximate LOO-CV), `kfold`, `loo_compare`, `model_weights`, `pp_average`, `bridge_sampler`, `bayes_factor`, `post_prob`.

## Examples

> [!example] Reading the generated 1PL Stan model
> **Setup.** `y ~ 0 + item + (1 | person)` with `normal(0,5)` on item coefficients and `normal(0,3)` on the person SD.
> **Solution.** Stan block: parameters `b`, `sd_1`, `z_1`; transformed parameter `r_1_1 = sd_1 * z_1`; model block `target += normal_lpdf(b|0,5); target += bernoulli_logit_lpmf(Y | X*b + r_1_1[J_1])`.
> **Interpretation.** What you write in formula and prior maps one-to-one to blocks; vectorizing the likelihood is where brms earns its speed.

## Connections

[[HMC and Stan in Practice]] · [[Posterior Predictive Checking]]

## See Also

[[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]
