---
title: "Ioannidis 2005 - Why Most Published Research Findings Are False"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/multiple-comparisons
  - type/theorem
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "PLoS Medicine 2(8), e124 (2005); quoted pp. 0697–0698"
citation: "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124."
date_ingested: 2026-10-13
folder: "Model Validation/Overfitting and Analytic Flexibility"
doc_type: paper
depends_on:
  - "[[Multiple Testing Corrections]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Simmons et al 2011 - False-Positive Psychology]]"
  - "[[Riley et al 2020 - Sample Size for Prediction Models]]"
  - "[[Garden of Forking Paths]]"
  - "[[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]]"
aliases:
  - "Ioannidis 2005"
  - "Why Most Published Research Findings Are False"
  - "Positive predictive value of research findings"
---

# Ioannidis 2005 - Why Most Published Research Findings Are False

> [!summary]
> Ioannidis models a "research finding" as a statistically significant claim and computes the probability it is true (its positive predictive value, PPV) from the pre-study odds, power, significance level, bias and number of competing teams. Under realistic conditions — small studies, small effects, many tested relationships, flexible analyses — PPV falls below 50%, so most claimed findings are false. For model validation, the same arithmetic governs any "winning" feature, segment effect or model picked out of a large, flexible search.

## Overview

Ioannidis, J. P. A. (2005). *Why most published research findings are false*. **PLoS Medicine** 2(8), e124.

**Question.** Given how research is actually conducted, what fraction of findings declared "significant" are true?

**Context.** Written for biomedical research, the essay formalises a Bayesian-style argument: a $p < 0.05$ result is informative only relative to how plausible the hypothesis was beforehand and how much analytic latitude was used to obtain it. It became a founding text of the replication-crisis literature.

## Main Content

### Setup

Let $R$ be the **pre-study odds**: the ratio of true to false relationships among those tested in a field. Let $\alpha$ be the Type I error rate and $\beta$ the Type II error rate (power $= 1-\beta$).

> [!theorem] Positive predictive value of a significant finding
> Without bias, the post-study probability that a significant finding is true is
> $$\text{PPV} = \frac{(1-\beta)R}{R - \beta R + \alpha}.$$
> A finding is more likely true than false iff $(1-\beta)R > \alpha$.
>
> With **bias** $u$ — the proportion of analyses that would not have been findings but are reported as such because of design, analysis or reporting choices —
> $$\text{PPV} = \frac{(1-\beta)R + u\beta R}{R + \alpha - \beta R + u - u\alpha + u\beta R}.$$
>
> With $n$ **independent teams** testing the same relationship and any significant result counted as a finding,
> $$\text{PPV} = \frac{R(1-\beta^{n})}{R + 1 - (1-\alpha)^{n} - R\beta^{n}}.$$

^thm-ioannidis-ppv

PPV falls as bias $u$ rises and as the number of teams $n$ rises (for typical power), because each extra analysis is another chance for a false positive.

### The six corollaries

1. The **smaller the studies**, the less likely findings are true (low power).
2. The **smaller the effect sizes**, the less likely findings are true.
3. The **greater the number and the lesser the selection of tested relationships**, the less likely findings are true (low $R$).
4. The **greater the flexibility** in designs, definitions, outcomes and analytical modes, the less likely findings are true (high $u$).
5. The **greater the financial and other interests and prejudices**, the less likely findings are true.
6. The **hotter the field** (more teams chasing significance), the less likely findings are true.

The paper tabulates PPV for illustrative scenarios (e.g. underpowered exploratory studies or discovery-oriented research with very low $R$), showing PPV can be far below 0.5, and argues that in many fields claimed findings may largely measure the prevailing bias.

## Key Passages

> "Corollary 2: The smaller the effect sizes in a scientific field, the less likely the research findings are to be true." — Ioannidis (2005), p. 0697

> "fields that use commonly agreed, stereotyped analytical methods (e.g., Kaplan-Meier plots and the log-rank test) [24] may yield a larger proportion of true findings than fields where analytical methods are still under experimentation (e.g., artificial intelligence methods) and only "best" results are reported." — Ioannidis (2005), p. 0698

## Implications for Model Validation

- **Best-of-many selection is bias $u$ and teams $n$.** Selecting the top model from a large leaderboard, or the top-ranked drivers from per-segment models, is structurally identical to many teams testing the same hypothesis; the winner's apparent edge is inflated.
- **Small effects in noisy KPIs.** Advertising and media effects on weekly business KPIs are typically small relative to noise (cf. [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]]), placing such analyses in the low-PPV regime of Corollaries 1–2.
- **Low pre-study odds for exploratory drivers.** When hundreds of candidate features are screened, most have no real effect ($R$ small), so most "important" features flagged by one fit are false.
- **Prefer stereotyped, pre-specified pipelines.** Fixing the modelling recipe in advance (and validating it on simulated data with known truth, see [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]) lowers $u$.
- **Replicate before acting.** Require that a finding reappear on held-out periods, other segments or experiments before it drives decisions.

## Connections

- [[Simmons et al 2011 - False-Positive Psychology]] demonstrates Corollary 4 by simulation: four routine choices push the false-positive rate to ~61%.
- [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]] extend the argument to data-dependent analysis choices made without explicit fishing.
- [[Riley et al 2020 - Sample Size for Prediction Models]] — the prediction-model analogue of Corollary 1.
- [[Multiple Testing Corrections]] — formal adjustments for the many-tests problem.
- [[Forking Paths and Bayesian Approaches]] — partial pooling as a remedy for many comparisons.

## See Also

- [[Simmons et al 2011 - False-Positive Psychology]] — empirical demonstration of flexibility-driven false positives
- [[Garden of Forking Paths]] — implicit multiple comparisons
- [[Multiple Testing Corrections]] — FWER/FDR control
- [[Power Analysis and Sample Size]] — power, the $(1-\beta)$ term in PPV
- [[Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns]] — small effects in advertising measurement
- [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] — selection on a noisy proxy (regressional Goodhart)
