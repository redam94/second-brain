---
title: "Index: Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 6
---

# Philip 2020 - Protocol for Probabilistic Extreme Event Attribution

> [!abstract] Routing Summary
> Captures Philip et al. (2020), *A protocol for probabilistic extreme event attribution analyses* (ASCMO 6:177-203, CC BY 4.0): the eight-step World Weather Attribution protocol, with extreme-value statistics (GEV, GPD, Gumbel, Gaussian, gamma), shift and scale trend models on smoothed GMST, probability ratio and return periods, model evaluation, hazard synthesis, vulnerability and communication. 6 notes plus overview. Motivating PyMC example: E37 (heatwave attribution); E113 flood-frequency concept note is in the sibling concept folder.
> - Need the one-page summary and source map? -> [[Philip 2020 - Extreme Event Attribution Protocol - Overview]]
> - Need PR, FAR, return period, event definition, analysis trigger? -> [[Philip 2020 - Probability Framing, Event Definition and Return Periods]]
> - Need GEV / GPD / Gumbel / gamma formulas, return levels, bootstrap CIs? -> [[Philip 2020 - Extreme Value Distributions for Attribution]]
> - Need shift vs scale fit on GMST, worked examples (Peru, De Bilt, Louisiana), ENSO adjustment? -> [[Philip 2020 - Trend Models and Natural Variability]]
> - Need model evaluation, fixed/transient forcing, weighted-average synthesis with chi-square inflation? -> [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]]
> - Need vulnerability/exposure and communication steps? -> [[Philip 2020 - Vulnerability, Exposure and Communication]]
> - Need a Bayesian non-stationary GEV in PyMC? -> [[Philip 2020 - Bayesian GEV Attribution in PyMC]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Probability ratio, FAR | [[Philip 2020 - Probability Framing, Event Definition and Return Periods]] | definition | event class | $PR=p_1/p_0$; FAR $=1-1/PR$ |
| Event class and trigger | [[Philip 2020 - Probability Framing, Event Definition and Return Periods]] | definition | - | threshold fixed by the event |
| GEV | [[Philip 2020 - Extreme Value Distributions for Attribution]] | definition | block maxima | $\exp[-(1+\xi(x-\mu)/\sigma)^{-1/\xi}]$ |
| GPD / POT | [[Philip 2020 - Extreme Value Distributions for Attribution]] | definition | threshold | declustering difficulty |
| Shift fit | [[Philip 2020 - Trend Models and Natural Variability]] | definition | GEV/Normal | $\mu=\mu_0+\alpha T'$ |
| Scale fit | [[Philip 2020 - Trend Models and Natural Variability]] | definition | GEV/GPD | constant $\sigma/\mu$ |
| Model validation | [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]] | concept | fits | CI overlap on $\sigma$, $\xi$ |
| Hazard synthesis | [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]] | theorem | $PR$ estimates | weighted $\log PR$, $\sqrt{\chi^2/dof}$ inflation |
| Hazard/exposure/vulnerability | [[Philip 2020 - Vulnerability, Exposure and Communication]] | definition | - | separate qualitative review |
| Bayesian GEV | [[Philip 2020 - Bayesian GEV Attribution in PyMC]] | concept | GEV, shift fit | endpoint reparameterisation |

## Notes

- [[Philip 2020 - Extreme Event Attribution Protocol - Overview]] — CONTAINS: question, contribution, key numbers, E37 link, full source map.
- [[Philip 2020 - Probability Framing, Event Definition and Return Periods]] — CONTAINS: framings, Defs. PR, FAR, return period, event class; Steps 1-2; Python.
- [[Philip 2020 - Extreme Value Distributions for Attribution]] — CONTAINS: Defs. GEV, GPD, Gumbel, Gaussian, gamma; data; CIs; trigger-event handling; Python.
- [[Philip 2020 - Trend Models and Natural Variability]] — CONTAINS: shift and scale fits; examples table; ENSO/AMO; Python.
- [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]] — CONTAINS: Steps 4-6, bias correction, fixed/transient forcing, synthesis rules, Python.
- [[Philip 2020 - Vulnerability, Exposure and Communication]] — CONTAINS: Steps 7-8, risk components, conclusions.
- [[Philip 2020 - Bayesian GEV Attribution in PyMC]] — CONTAINS: Bayesian non-stationary GEV, priors, sketch, support wall.

## Sources

- [[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]] — Philip S, Kew S, van Oldenborgh GJ, Otto F, Vautard R et al. (2020), Adv. Stat. Clim. Meteorol. Oceanogr. 6:177-203.

## See Also

- [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]], [[Hierarchical Models]], [[Decision Analysis]]
