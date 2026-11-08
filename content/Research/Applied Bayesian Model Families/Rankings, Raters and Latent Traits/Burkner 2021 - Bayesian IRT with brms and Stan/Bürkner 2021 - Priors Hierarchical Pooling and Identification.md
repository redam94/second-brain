---
title: "Bürkner 2021 - Priors Hierarchical Pooling and Identification"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Sec. 2.5-2.6, pp. 9-13; Sec. 3.3, pp. 16-18"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]"
used_by:
  - "[[Bürkner 2021 - brms Specification Stan Code and Post-Processing]]"
aliases:
  - IRT priors partial pooling
  - IRT identification weak vs strong
---

# Bürkner 2021 - Priors Hierarchical Pooling and Identification

> [!summary]
> Priors in Bayesian IRT: non-hierarchical (fixed-hyperparameter) vs hierarchical (partial pooling) item priors; persons nearly always hierarchical; LKJ priors for correlated item parameters; half-normal or half-Cauchy for standard deviations. Identification is strong (likelihood determines parameters) or weak (posterior sensible); constraints such as $\sigma_\theta=1$ in the 2PL give strong identification and comparability with other software.

## Overview

Posterior: $p(\theta,\xi\mid y)=p(y\mid\theta,\xi)\,p(\theta,\xi)/p(y)$, with the joint prior factored as $p(\theta)p(\xi)$.

## Main Content

> [!definition] Item priors
> - **Non-hierarchical:** fixed, e.g. $\xi_i\sim N(0,3)$ (68% in $[-3,3]$, 97.5% in $[-6,6]$ on the logit scale; weakly informative). Most common in IRT practice.
> - **Hierarchical:** $\xi_i\sim N(0,\sigma_\xi)$ with $\sigma_\xi$ estimated: partial pooling shrinks extreme items toward the mean. Justified by the desire for pooling, not by an "item population" assumption.
> - **Correlated item parameters** (e.g. easiness and discrimination): $(\xi_{1i},\dots,\xi_{Ki})\sim\text{MVN}(0,\Sigma_\xi)$, $\Sigma_\xi=D(\sigma_\xi)\Omega_\xi D(\sigma_\xi)$.
> ^def-irt-item-priors

> [!definition] Person priors
> Almost always hierarchical: $\theta_p\sim N(0,\sigma_\theta)$, or multivariate normal for several correlated person parameters. If both persons and items are partially pooled, add an overall intercept $b_0$: $\eta=b_0+\theta_p+\xi_i$. This puts IRT in the generalized linear multilevel model framework.
> ^def-irt-person-priors

**Hyperpriors.** Standard deviations: densities with mode at zero decreasing monotonically (half-normal, half-Cauchy). Correlation matrices: LKJ (Lewandowski, Kurowicka & Joe 2009). Covariate effects: flat default, weakly informative for mild regularisation, or horseshoe for selection. Priors are always interpreted in the context of the whole model (Gelman et al. 2017).

> [!definition] Identification
> **Strong:** $p(y\mid\theta_1,\xi_1)=p(y\mid\theta_2,\xi_2)\Rightarrow(\theta_1,\xi_1)=(\theta_2,\xi_2)$. **Weak** (informal): the posterior is sensible for all quantities of interest; with proper priors the posterior always exists, so identification is checked empirically through convergence and subject-matter knowledge. Bürkner imposes the usual constraints for strong identification (e.g. fix $\sigma_\theta=1$ in the binary 2PL) so results are comparable to other frameworks.
> ^def-irt-identification

## Examples

> [!example] Shrinkage of sparse items
> **Setup.** An item answered by only 5 of 300 respondents (4 correct); item SD $\sigma_\xi=1.2$, mean easiness 0.
> **Solution.** Non-hierarchical $N(0,3)$ barely regularises (posterior near the item's raw logit, high easiness); hierarchical $N(0,1.2)$ pulls it toward 0 with the amount set by data.
> **Interpretation.** For catalogues with many rarely-seen items (e.g. 680 vocabulary words), hierarchical priors are the robust default.

## Connections

[[Hierarchical Models]] · [[Partial Pooling as Multiple Comparisons Correction]] · [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]] (scale non-identifiability).

## See Also

[[Bürkner 2021 - brms Specification Stan Code and Post-Processing]]
