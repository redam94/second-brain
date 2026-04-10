---
title: "Power Analysis and Sample Size"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/experimental-design
  - topic/power-analysis
  - type/concept
  - doc/paper
source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3409926/"
date_ingested: 2026-04-08
folder: "Research Methodology/Experimental Design"
aliases:
  - "Sample size calculation"
  - "Statistical power"
  - "Type II error"
doc_type: concept
source_location: "PMC3409926 (review article)"
depends_on:
  - "[[The Experimental Ideal]]"
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Multiple Testing Corrections]]"
  - "[[Survival Analysis]]"
  - "[[Activity Bias in Advertising]]"
---

# Power Analysis and Sample Size

> [!summary]
> Power analysis determines the minimum sample size needed to detect a meaningful effect. Under-powered studies risk missing real effects (Type II error); over-powered studies waste resources. Power depends on significance level ($\alpha$), desired power ($1-\beta$), and expected effect size.

## Core Concepts

| Term | Definition | Typical Value |
|------|-----------|---------------|
| **Type I error ($\alpha$)** | False positive — rejecting a true null | 0.05 or 0.01 |
| **Type II error ($\beta$)** | False negative — failing to reject a false null | 0.20 |
| **Power ($1-\beta$)** | Probability of detecting a real effect | 0.80 or 0.90 |
| **Effect size** | Magnitude of the difference you want to detect | From prior studies or pilot data |

## Key Normal Deviates

| $\alpha$ (two-tailed) | $Z_{\alpha/2}$ | Power | $Z_{1-\beta}$ |
|----------------------|--------------|-------|-------------|
| 0.05 | 1.96 | 80% | 0.84 |
| 0.01 | 2.58 | 90% | 1.28 |

## Sample Size Formulas

### Comparing Two Means (t-test)

$$N_{\text{per group}} = \frac{2(Z_{\alpha/2} + Z_{1-\beta})^2 \sigma^2}{d^2}$$

where $\sigma$ is the pooled SD and $d$ is the minimum detectable difference.

### Comparing Two Proportions

$$N = \frac{(Z_{\alpha/2} + Z_{1-\beta})^2 \cdot \bar{p}(1-\bar{p}) \cdot (1+r)}{r \cdot d^2}$$

where $\bar{p}$ is the average proportion, $d$ is the difference, and $r = n_1/n_2$.

### Survey / Single Proportion

$$N = \frac{Z_{\alpha/2}^2 \cdot P(1-P)}{E^2}$$

where $P$ is expected prevalence and $E$ is margin of error.

### Correlation

$$N = \left(\frac{Z_{\alpha/2} + Z_{1-\beta}}{0.5 \ln\frac{1+r}{1-r}}\right)^2$$

## Practical Adjustments

- **Attrition**: adjust $N_1 = N / (1 - q)$ where $q$ is expected dropout rate
- **One-tailed tests**: ~20% fewer subjects
- **Non-randomized designs**: add ~20% more subjects
- **Crossover designs**: ~25% of parallel group requirement
- **Categorical outcomes** require larger samples than continuous for equivalent power

> [!tip]
> Always base effect size estimates on prior literature or pilot data. Overly optimistic effect sizes lead to under-powered studies — one of the key contributors to the [[Garden of Forking Paths|replication crisis]].

## Connection to Bayesian Approaches

In Bayesian analysis, the concept of "power" is less central — instead, one can use **posterior predictive simulation** to assess whether the planned sample provides adequate precision for quantities of interest. See [[Fitting and Validating Computation]] for simulation-based approaches.

## See Also

- [[The Experimental Ideal]] — the experimental framework that power analysis serves
- [[Researcher Degrees of Freedom]] — how underpowered studies amplify forking paths
- [[Activity Bias in Advertising]] — a case where more data doesn't help if identification fails
- [[Multiple Testing Corrections]] — multiple outcomes or interim analyses require both power adjustments and multiplicity corrections
- [[Forking Paths and Bayesian Approaches]] — under-powered studies interact with analytic flexibility to inflate false discovery rates
- [[Fitting and Validating Computation]] — simulation-based calibration as a Bayesian alternative to classical power analysis
