---
title: "Bürkner 2021 - Worked Examples Binary Models VerbAgg"
tags:
  - source/ingested
  - topic/latent-traits
  - type/example
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 5.1, pp. 23-35 (Table 1, Figs. 1-7)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - brms Specification Stan Code and Post-Processing]]"
  - "[[Bürkner 2021 - Covariates and Differential Item Functioning]]"
used_by:
  - "[[Bürkner 2021 - Bayesian IRT with brms Overview]]"
aliases:
  - VerbAgg IRT example
  - brms 1PL 2PL covariate DIF example
---

# Bürkner 2021 - Worked Examples Binary Models VerbAgg

> [!summary]
> On the VerbAgg data (316 persons x 24 items, 7,584 responses, lme4), the 1PL shows large person (SD 1.39) and item (SD 1.20) variation; the 2PL gains nothing ($r=1$ between person estimates, $\Delta\text{LOOIC}=5.97$, SE 4.78); item covariates show people "want" more verbally aggressive acts than they "do"; a gender-by-mode DIF check finds uniform DIF ($b=-0.94$).

## Overview

Responses `r2` (yes/perhaps combined vs no) to a verbal-aggression questionnaire. Columns: `Anger` (trait), `Gender`, `item`, `resp` (no/perhaps/yes), `id`, `btype` (curse/scold/shout), `situ` (other/self), `mode` (want/do), `r2`.

## Main Content

### 1PL (weakly informative priors)

`r2 ~ 1 + (1 | item) + (1 | id)`, bernoulli-logit, half-normal(0,3) priors on both SDs, 4 chains x 2000 iterations (1000 warmup).

> [!example] 1PL summary
> | Parameter | Estimate | Est. error | 95% CI | Rhat | Bulk ESS |
> |---|---|---|---|---|---|
> | sd(person intercept) | 1.39 | 0.07 | [1.25, 1.54] | 1.00 | 906 |
> | sd(item intercept) | 1.20 | 0.19 | [0.89, 1.62] | 1.00 | 531 |
> | Intercept | -0.16 | 0.26 | [-0.71, 0.34] | 1.03 | 196 |
> **Reading.** Persons and items vary substantially. In a 1PL persons with the same total score get the same estimate (blocks in Fig. 3) because all items are weighted equally.
> ^tab-verbagg-1pl

### 2PL

`bf(r2 ~ exp(logalpha) * eta, eta ~ 1 + (1|i|item) + (1|id), logalpha ~ 1 + (1|i|item), nl = TRUE)` with priors: `normal(0,5)` on the eta intercept, `normal(0,1)` on logalpha, `constant(1)` on the person SD, `normal(0,3)` on the item SD of eta, `normal(0,1)` on the item SD of logalpha.
**Result.** Discrimination posterior means 1.2-1.5, intervals roughly 1-2: very similar across items. Person parameters correlate $r=1$ with the 1PL. $\Delta$LOOIC $=5.97$ (SE $4.78$) in favour of the 2PL: small relative to its SE, so the 1PL is retained.

### Item covariates

`r2 ~ btype + situ + mode + (1 | item) + (0 + mode | id)`.

> [!example] Item-covariate model
> | Parameter | Estimate | Est. error | 95% CI |
> |---|---|---|---|
> | Intercept | 1.89 | 0.25 | [1.42, 2.40] |
> | btype scold (vs curse) | -1.13 | 0.24 | [-1.62, -0.64] |
> | btype shout | -2.24 | 0.25 | [-2.74, -1.74] |
> | situ self (vs other) | -1.12 | 0.21 | [-1.53, -0.71] |
> | mode do (vs want) | -0.78 | 0.21 | [-1.20, -0.38] |
> | sd(modewant) over persons | 1.47 | 0.09 | [1.30, 1.64] |
> | sd(modedo) over persons | 1.67 | 0.10 | [1.48, 1.87] |
> | cor(modewant, modedo) | 0.77 | 0.04 | [0.69, 0.84] |
> | sd(item intercept) | 0.46 | 0.09 | [0.31, 0.67] |
> `hypothesis(fit, "modedo - modewant > 0", class="sd", group="id")` gives estimate 0.2 (90% CI [0.02, 0.39]), posterior probability 0.97 that the SD of the "do" effects exceeds that of "want". Quantities like this are trivial from MCMC draws but awkward in frequentist fits.
> ^tab-verbagg-covariates

### Person covariates and DIF

`r2 ~ Anger + Gender + btype + situ + mode + mode:Gender + (0 + Gender | item) + (0 + mode | id)`: higher trait anger raises endorsement probability; women and men "want" equally but men "do" far more often than women, an interaction that is itself a DIF-type finding (item property `mode` has gender-differential implications).
Fine-grained uniform DIF: `dif = 1` for women on "do" items about cursing/scolding. `r2 ~ Gender + dif + (1 | item) + (1 | id)` gives $b_{\text{dif}}=-0.94$ (95% CI $[-1.22,-0.66]$): women report actually cursing/scolding less often than men, beyond the gender main effect.

**Maximal multilevel structure.** `r2 ~ 1 + Anger + Gender + btype + situ + mode + (1 + Anger + Gender | item) + (1 + btype + situ + mode | id)` triggers lme4 convergence warnings but brms/HMC converges; whether the complexity is supported is then decided by LOO or Bayes factors.

### 3PL (specification only)

Known guessing 0.25: `bf(r2 ~ 0.25 + 0.75 * inv_logit(exp(logalpha) * eta), eta ~ ..., logalpha ~ ..., nl = TRUE)` with `bernoulli(link="identity")`. Estimated guessing: add `logitgamma ~ 1 + (1|i|item)` and `nlf(gamma ~ inv_logit(logitgamma))`. Estimated guessing hampers interpretation of difficulty and discrimination (Han 2012), so design items with known guessing where possible. 4PL (lapses) is possible too.

## Examples

> [!example] Interpreting "do vs want"
> **Setup.** Coefficient $b_{\text{do}}=-0.78$ on the logit scale.
> **Solution.** With intercept 1.89 (curse, other, want) the baseline probability is $\text{logistic}(1.89)=0.87$; for "do" it is $\text{logistic}(1.11)=0.75$.
> **Interpretation.** Averaged over persons and items, people are about 12 percentage points more likely to want than to do the act.

## Connections

[[Bürkner 2021 - Covariates and Differential Item Functioning]] · [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]

## See Also

[[Bürkner 2021 - Worked Examples Ordinal and Response-Time Models]]
