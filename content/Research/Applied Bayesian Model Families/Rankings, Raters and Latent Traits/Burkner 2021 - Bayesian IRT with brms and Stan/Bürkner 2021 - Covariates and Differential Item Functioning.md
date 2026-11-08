---
title: "Bürkner 2021 - Covariates and Differential Item Functioning"
tags:
  - source/ingested
  - topic/latent-traits
  - type/definition
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 2.3-2.4, pp. 7-9; Sec. 5.1 DIF example, pp. 32-33"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]"
used_by:
  - "[[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]"
aliases:
  - differential item functioning
  - DIF analysis IRT
  - explanatory item response models
---

# Bürkner 2021 - Covariates and Differential Item Functioning

> [!summary]
> Person and item covariates enter the IRT linear predictor as $\eta_{pi}=\theta_p+\xi_i+\sum_jb_jx_{jpi}$. Differential item functioning (DIF) means an item behaves differently for groups of equal ability, and is tested by person-by-item interaction covariates after controlling for group main effects. Variable selection among many candidate DIF variables uses regularising (horseshoe) priors plus projective prediction.

## Overview

De Boeck et al. (2011) classify covariates by **mode** (person, item, or person-by-item) and **origin** (external, independent of responses; or internal, derived from them). Age is an external person covariate; item type an external item covariate; number of previously solved items is an internal person-by-item covariate.

## Main Content

> [!definition] Explanatory IRT predictor
> $\eta_{pi}=\theta_p+\xi_i+\sum_{j=1}^Jb_jx_{jpi}$. A covariate effect may vary over persons ($b_{jp}$, only for item covariates) or over items ($b_{ji}$, only for person covariates). Over-flexible specifications may be unidentified or hard to interpret; specify with care.
> ^def-explanatory-irt

> [!definition] Differential item functioning (DIF)
> An item shows DIF if its properties differ across groups of persons with the same latent ability (Holland & Wainer 1993). DIF is tested with (a) person covariates defining groups (gender, age, SES) and (b) item indicators or item properties over which to expect DIF; their interactions are the DIF variables. After including the person covariates' main effects, a predictive interaction indicates DIF. Main effects of group are *not* DIF (they are mean ability differences).
> ^def-dif

**Uniform vs non-uniform DIF.** The covariate-interaction approach in the paper tests **uniform** DIF - a shift in item easiness independent of the latent trait level (De Boeck et al.). Non-uniform DIF (group-specific discrimination) would need a 2PL with covariate effects on $\log\alpha_i$ (an extension implied by the distributional framework, not demonstrated in the paper).

**Caution.** Dropping all DIF items can itself threaten validity by narrowing construct coverage (Osterlind & Everson 2009).

**Many DIF candidates.** Two-stage Bayesian selection: (1) fit the all-covariate model with a regularised horseshoe prior (Carvalho et al. 2010; Piironen & Vehtari 2017); (2) apply projection-predictive selection with that model as the reference. The first step is possible in brms; the second "still needs more research".

## Examples

> [!example] DIF check across markets (marketing analogue)
> **Setup.** A 12-item brand-trust scale administered in 6 countries.
> **Solution.** Fit `y ~ market + dif + (1|item) + (1|id)` with `dif` = 1 for (market = X, item in translated block). A coefficient on `dif` away from 0 signals uniform DIF; `market` alone captures mean differences.
> **Interpretation.** Comparing countries on summed scores is only valid if no item has market-specific easiness.
> ^ex-dif-markets

## Connections

- Measurement invariance in factor-analytic language: [[Confirmatory Factor Analysis and SEM]].
- The DIF indicator is a person-by-item interaction; contrast partial pooling of interactions ([[Hierarchical Models]]).

## See Also

[[Bürkner 2021 - Worked Examples Binary Models VerbAgg]]
