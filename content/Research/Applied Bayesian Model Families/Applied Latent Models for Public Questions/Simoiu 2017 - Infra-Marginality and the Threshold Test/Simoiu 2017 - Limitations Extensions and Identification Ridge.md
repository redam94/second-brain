---
title: "Simoiu 2017 - Limitations Extensions and Identification Ridge"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]"
source_location: "Sec. 4 Conclusion pp. 17-18; Sec. 2.3 footnotes; example E110 background"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test"
doc_type: paper
depends_on:
  - "[[Simoiu 2017 - Threshold Test Generative Model]]"
  - "[[Simoiu 2017 - Model Checks Robustness and Placebo Tests]]"
used_by:
  - "[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]"
aliases:
  - "threshold test limitations"
  - "identification ridge threshold test"
  - "officer-level threshold test"
---

# Simoiu 2017 - Limitations Extensions and Identification Ridge

> [!summary]
> The paper's own limits: within-department variation in policy, deployment patterns that lower the marginal cost of searching, unobserved suspected offence severity, and the fact that statistical analysis alone cannot establish intent. The authors suggest applying the test to lending, hiring and publication decisions. The structural counting argument leaves a near-ridge in $(t,\phi,\lambda)$; the PyMC example E110 documents it and how hierarchy resolves it.

## Main Content

**Limitations stated in Sec. 4.**
1. Search policy may differ within a department (explicit choices, or by-product of deployment), so a lower inferred threshold may reflect a legitimate local standard; a lower marginal cost of search in heavily policed areas could justify a lower threshold.
2. If officers suspect more serious offences when searching black and Hispanic drivers, lower thresholds could be non-discriminatory.
3. Tests of this kind cannot identify mechanisms; "caution is warranted" as with all past tests.
4. Only taste-based discrimination is tested; statistical discrimination (using race as information) is out of scope.
5. Model assumes officers' signal is the true probability; noisy signals are equivalent to threshold variation (checked in Fig. 8).

> [!theorem] Identification structure (paper's counting plus E110 remark)
> Without structure, each group-department pair offers two numbers (search rate $\hat s$, hit rate $\hat h$) for three parameters $(t,\phi,\lambda)$: a one-dimensional curve of $(t,\phi,\lambda)$ gives the same $(\hat s,\hat h)$. Additive structure ($2(D+R-1)$) and hierarchical shrinkage pick a point on that curve. **Remark (E110, not in the paper):** in a single-department, officer-level fit the level of the thresholds is weakly identified (a *ridge*), while gaps between groups are well-mixed; hence reporting gaps rather than levels is safer. See the example gallery for the diagnostics.
^thm-ridge

**Extensions mentioned.** Application to lending, hiring and publication decisions; the faster variant of Pierson et al. (2017) scales the test to larger data; the authors invite theory on the statistical properties of discrimination tests.

## Examples

> [!example] A moving ridge: two parameter sets with the same observable rates
> Panels (a) and (b) of Figure 1 are two points on such a ridge: search and hit rates are the same, but red's threshold is 0.30 versus blue's 0.35 in (a) and 0.30 versus 0.25 in (b). In the hierarchical model, which (a)-like or (b)-like world is chosen depends on priors and on structural restrictions across other groups and departments.
^ex-ridge

> [!tip] Relevance to marketing measurement
> Two audience segments with different baseline conversion distributions and a common "target if score above $t$" rule cannot be compared by targeted-conversion rates alone; an explicit allocation model is needed. Analogy only.

## Connections
[[Simoiu 2017 - Threshold Test Generative Model]], [[Hierarchical Models]], [[Type S and Type M Errors]], [[Sensitivity Analysis in Observational Studies]].

## See Also
[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
