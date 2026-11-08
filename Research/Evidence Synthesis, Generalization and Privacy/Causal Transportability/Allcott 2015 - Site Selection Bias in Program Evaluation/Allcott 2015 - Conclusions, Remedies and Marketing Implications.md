---
title: "Allcott 2015 - Conclusions, Remedies and Marketing Implications"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Allcott 2015 - Site Selection Bias in Program Evaluation.pdf]]"
source_location: "Sec. 8, pp. 28-29; Intro pp. 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Allcott 2015 - Site Selection Bias in Program Evaluation"
doc_type: paper
depends_on:
  - "[[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]"
  - "[[Allcott 2015 - Microdata Extrapolation and the Prediction Failure]]"
used_by:
  - "[[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]"
aliases:
  - "design-based remedies for site selection bias"
  - "extrapolating marketing experiments across markets"
---

# Allcott 2015 - Conclusions, Remedies and Marketing Implications

> [!summary]
> Replication is valuable but cannot remove site selection bias unless replication sites are randomly or quasi-randomly chosen. Econometric controls, further replication, and reporting sample-vs-target comparisons help diagnose but do not solve the problem; the only guaranteed solutions are design-based (evaluate all sites, or randomise sites within strata). For marketing, this argues for deliberately diverse, randomised test-market selection and for discounting early lift results.

## Overview
Evidence in the paper: positive selection both from intentional targeting on gains (within-utility) and unintentional forces (population preferences, ownership, size); and negative-selection forces too. Rich microdata from ten sites "do not even predict the direction of overall site-level selection, let alone its magnitude."

## Main Content

### Allcott's list of responses
1. **More econometric controls for observables**: unhelpful in Opower; "no econometric approach can possibly work without external unconfoundedness".
2. **Replicate at sites differing on hypothesised moderators**: may not work either — the first ten sites already differed on potentially relevant site-level factors.
3. **Report target populations and compare sample with target on observables** (as in Tables 1-3): helps diagnose, does not solve.
4. **Design-based approaches** (only guaranteed solutions): evaluate the programme in the entire population of sites to which it may expand (Department of Labor YouthBuild; Crépon et al. 2013 job-placement evaluation in France), or, if few sites can be evaluated, **randomly select sites within strata** of potentially relevant site-level observables (as originally planned for JTPA). Parallel to prioritising randomised designs over econometric fixes for individual-level selection bias.

### Other points
- Site selection reflects rational choices by partners, like individual-level selection into training. Starting with the most responsive population is cost-effective under limited capacity or uncertainty — it is an inference problem, not misbehaviour.
- The paper does not argue RCTs should be dropped: Appendix C shows that extrapolating RCT results from other sites is still more informative than non-experimental estimates at the same site.
- Site selection bias is not limited to RCTs; sites with data adequate for quasi-experiments may differ in institutions or environment.
- JTPA background: 600 sites, 200 approached for RCTs, 16 agreed; with about 270 people per site, Heckman and Smith (1997) could not reject homogeneous effects — so Opower's large samples and many sites permit clearer analysis.
- Caveats on interpretation: results hold for one programme; predictiveness of covariates is context-specific.

## Examples

> [!example] Translating the lessons to marketing measurement (author's application, not from the paper)
> | Paper finding | Marketing analogue | Practical response |
> |---|---|---|
> | Partners are larger, better managed (MFI, hospitals) | Advertisers/agencies that run lift tests have better tracking and creative | Compare tested vs. non-tested advertisers/markets on observables; report it |
> | Early sites overpredict later by ~0.5 pp (about 30% of the 1.7% ATE) | First lift tests overstate average incrementality | Apply an explicit shrinkage or selection discount; update as later results arrive |
> | Heavy-user targeting then expansion lowers efficacy | Test on high-value customers, then scale to the broader base | Estimate effect by segment; extrapolate with segment mix of the *planned* audience |
> | Predicted and actual site effects uncorrelated after conditioning on $X$ | Observable market features may not explain which markets respond | Randomise test-market choice within strata (size, region, media mix) |
> | Effects vary 5.2-fold across sites | A single geo-test ROAS is one draw from a distribution | Treat site effects as random effects; model the distribution ([[Hierarchical Models]]) |
>
> Use experiments as priors for a [[Bayesian Media Mix Modeling - Overview]] only with a stated selection discount; compare [[Geo-Experiment Methodology - Overview]] for test-market design and [[User-Level vs Geo-Level Experiments - When to Use Which]]. The 30% figure is simple arithmetic from the paper's numbers (0.5 pp / 1.7%) and should not be generalised beyond Opower. ^ex-marketing-lessons

## Connections
- Formal adjustment methods when the target covariates are available: [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]. Allcott shows their limit: they require external unconfoundedness.
- Why randomisation inside sites is not enough: [[The Experimental Ideal]] covers internal validity only.

## See Also
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]]
- [[Allcott 2015 - Metadata Analysis of Site Selection Mechanisms]]
- [[Allcott 2015 - Model of External Validity and Site Selection Bias]]
