---
title: "Manheim and Garrabrant 2018 - Variants of Goodhart's Law"
tags:
  - source/ingested
  - topic/model-validation
  - topic/goodharts-law
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "arXiv:1803.04585 (v4, Feb 2019), pp. 2, 4"
citation: "Manheim, D. & Garrabrant, S. (2018). Categorizing variants of Goodhart's law. arXiv:1803.04585."
date_ingested: 2026-10-13
folder: "Model Validation/Interpretability and Causality"
doc_type: paper
depends_on:
  - "[[Dillon et al - SHAP Predictive Models and Causal Insights]]"
  - "[[Spurious Association and Confounds]]"
used_by:
  - "[[SR 11-7 - Supervisory Guidance on Model Risk Management]]"
  - "[[NIST AI RMF 1.0 - AI Risk Management Framework]]"
aliases:
  - "Manheim Garrabrant 2018"
  - "Categorizing variants of Goodhart's law"
  - "Goodhart's law"
---

# Manheim and Garrabrant 2018 - Variants of Goodhart's Law

> [!summary]
> Manheim & Garrabrant break Goodhart's law — roughly, a measure that is optimised stops being a good measure — into four mechanisms: **regressional, extremal, causal and adversarial** Goodhart. For validators of predictive and media-analytics models, it explains why model-derived scores used as targets (driver rankings, opportunity forecasts, proxy KPIs) degrade precisely when decisions start to optimise them.

## Overview

*Manheim, D. & Garrabrant, S. (2018). Categorizing variants of Goodhart's law. arXiv:1803.04585 [v4, Feb 2019].*

Goodhart's original observation (from monetary policy) is that statistical regularities tend to break down once they are used for control; Campbell's law and Strathern's "when a measure becomes a target" phrasing are close relatives. The paper, motivated by AI-alignment concerns about optimising proxy objectives, gives a taxonomy so each failure mode can be recognised and mitigated separately. The setting: an agent optimises an observable **proxy** $V$ in the hope of improving an unobserved **goal** $U$.

## Main Content

> [!definition] Regressional Goodhart
> When the proxy is the goal plus noise, $V = U + \varepsilon$, selecting cases with high $V$ also selects for high $\varepsilon$. The selected cases' goal value regresses toward the mean: e.g. for jointly Gaussian $U$ and independent zero-mean $\varepsilon$,
> $$\mathbb E[U \mid V = v] = \mu_U + \frac{\sigma_U^2}{\sigma_U^2 + \sigma_\varepsilon^2}\,(v - \mu_U),$$
> so the true value of the top-ranked option is systematically below its proxy score (the "optimiser's curse").
^def-regressional-goodhart

> [!definition] Extremal Goodhart
> The relationship between proxy and goal observed over the usual range breaks down at extreme values. Optimisation pushes into regions where the proxy–goal relation was never observed (different regime, different mechanism), so the historical correlation no longer applies.
^def-extremal-goodhart

> [!definition] Causal Goodhart
> The proxy is correlated with the goal but does not cause it (a common cause or reverse causation links them). Intervening on the proxy then fails to move the goal — or changes the causal structure so the correlation disappears.
^def-causal-goodhart

> [!definition] Adversarial Goodhart
> Other agents respond to the optimiser's use of the metric: they game it (adversarial misalignment) or exploit the incentive it creates (the "cobra effect", where a reward for a proxy produces more of the harm). The metric is corrupted by strategic behaviour.
^def-adversarial-goodhart

The authors discuss sub-variants and mitigations: anticipate regression to the mean when selecting on noisy estimates; avoid optimising far outside the observed range; base interventions on causal rather than correlational relationships; and expect strategic responses when metrics carry incentives.

## Key Passages

> "When selecting for a proxy measure, you select not only for the true goal, but also for the difference between the proxy and the goal." — Manheim & Garrabrant (2018), p. 2

> "If a regulator intervenes to maximize a metric, the causal pathway can change such that the proxy no longer tracks the goal." — Manheim & Garrabrant (2018), p. 4

## Implications for Model Validation

- **Regressional:** choosing the best of many models, segments or opportunities by an estimated score selects for estimation error; expect realised performance to fall short and shrink or hold out accordingly ([[Simmons et al 2011 - False-Positive Psychology]]).
- **Extremal:** forecasts or response curves used to recommend spend far beyond historical levels are extrapolations; validate them only within the observed support.
- **Causal:** a feature that ranks high in a predictive model (e.g. by SHAP) is a proxy; pushing it need not move the KPI ([[Dillon et al - SHAP Predictive Models and Causal Insights]]).
- **Adversarial:** once a model score drives budgets or incentives, those affected adapt; monitoring after deployment is part of validation ([[NIST AI RMF 1.0 - AI Risk Management Framework]]).

## Connections

- Causal Goodhart is the decision-level version of the predictive-versus-causal gap in [[Dillon et al - SHAP Predictive Models and Causal Insights]], [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] and [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]].
- Regressional Goodhart is the selection effect behind the [[Garden of Forking Paths]] and best-of-many model selection; extremal Goodhart parallels the extrapolation critique of [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]].
- Spurious proxies arise from confounding: [[Spurious Association and Confounds]], [[Omitted Variables Bias]].
- Ongoing monitoring of model use is a pillar of [[SR 11-7 - Supervisory Guidance on Model Risk Management]].

## See Also

- [[Dillon et al - SHAP Predictive Models and Causal Insights]] — correlational drivers are not levers
- [[Ioannidis 2005 - Why Most Published Research Findings Are False]] — selection on noisy findings
- [[SR 11-7 - Supervisory Guidance on Model Risk Management]] — governance of model use
- [[NIST AI RMF 1.0 - AI Risk Management Framework]] — measuring and managing deployed-model risk
- [[Spurious Association and Confounds]] — the statistical root of causal Goodhart
