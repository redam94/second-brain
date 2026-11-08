---
title: "Abowd 2022 - Conclusion, Limitations and Marketing Relevance"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 10 Conclusion, pp. 44-45; limitations drawn from Secs. 2-9; marketing section is this vault's synthesis"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - Utility Experiments]]"
  - "[[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]"
used_by:
  - "[[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]"
aliases:
  - census TDA limitations
  - privacy-era measurement lessons census DP
  - TDA development timeline
---

# Abowd 2022 - Conclusion, Limitations and Marketing Relevance

> [!summary]
> The TopDown Algorithm was developed from 2016, tested through public demonstration products, revised after public comment, and put into production on June 25, 2021; the redistricting file was released on August 12, 2021 with all code and parameters published in September 2021. Limitations visible in the paper: invariants sit outside the formal guarantee; non-negativity and integrality induce bias and data-dependent error; tuning and quality assurance are not fully formal; semantics with invariants are deferred. For marketing measurement the lessons are about budget allocation across a hierarchy, free post-processing, transparency, and modelling known noise.

## Overview

Section 10 gives the timeline and public process. The rest of this note records limitations that follow from the earlier sections and then maps the system to marketing-measurement practice. The marketing part is the vault's synthesis; the paper does not discuss advertising.

## Main Content

### Section 10: development and release timeline

- **2016**: development begins; initial work implemented pure DP with the Laplace mechanism, culminating in April 2019 in the Redistricting Data Summary File from the 2018 End-to-End Census Test (feasibility only; little public scrutiny since the use case was limited to the dissemination format and dictionary).
- **October 2019**: first DAS demonstration data product; Harvard Data Science Review Symposium the same month; December 2019 CNSTAT expert workshop; intensive internal and public scrutiny. Dialogue continued through the **May 2020** demonstration release, prepared as the Bureau announced the COVID-19 suspension of census operations. Operations resumed July 2020 and DAS development narrowed to the redistricting summary file to accelerate production. The **September 2020, November 2020 and April 2021** demonstration products documented successive refinements.
- A one-month public comment period after April 2021 yielded 48 detailed comments plus recommendations from the Census Scientific Advisory Committee and National Advisory Committee. DSEP met a total of 4.5 hours from June 3-8, 2021 to assess privacy guarantees and accuracy on the 2010 Census Edited File; its instructions set the production parameters.
- **June 25, 2021**: production DAS starts; **June 26**: MDF released to the Demographic Programs Directorate for quality assessment; **July 17**: MDF passes full data-quality assessment and goes to tabulation; **August 12, 2021**: 2020 Census Redistricting Data (P.L. 94-171) Summary File released, with a final demonstration product from the same code and parameters on 2010 data; **September 2021**: full production code base for redistricting data released with all parameter values and supporting tables. Next: Detailed Demographic and Housing Characteristics (DHC) file, with tuning already underway.

### Limitations and open issues (read from the paper)

> [!definition] Limitations visible in the text
> 1. **Invariants lie outside the formal guarantee.** They correspond to infinite privacy loss for their tabulations; the paper's accounting "ignores any contributions from the invariants" and the privacy semantics in their presence are deferred to later work.
> 2. **Post-processing bias and data-dependent error.** Requiring non-negative integer microdata forces bias (positive for small cells, negative for large) whose size depends on confidential data and has no closed form. This is due to post-processing, not to the DP mechanism. Inference using noisy measurements directly (posterior sampling) is promising but computationally limited at census scale.
> 3. **Tuning is iterative and not itself private.** It was done on 2010 data; parameters for other data products must be re-tuned; quality assurance of the 2020 MDF used human review and "does not strictly adhere to the tenets of formal privacy".
> 4. **Single-run, geographic-variation evaluation.** The 95% criterion was evaluated using geographic variation rather than many independent runs because a run is computationally expensive; the paper says it is still working on better ways to summarize error distributions for published statistics.
> 5. **$(\varepsilon,\delta)$ summaries are partial.** A single pair such as $\delta=10^{-10}$ gives "a very incomplete analysis" of a $\rho$ setting.
> 6. **Utility trade-offs are a policy choice.** The literature gives "very little guidance on managing a privacy-loss budget to trade off accuracy on multiple dimensions"; tuning sought the smallest budget meeting stated accuracy goals.
> 7. **Joined data.** Queries joining household and person data have sensitivity equal to maximum household size; such products need different mechanisms (Detailed-DHC).
^def-census-limitations

### Marketing-measurement relevance (inference)

The census is not a marketing system, but several design lessons transfer to privacy-era measurement. Each is a mapping to be validated for a given vendor, not a claim about any ad platform or clean room.

1. **Budget is allocated across the hierarchy and sums along a path.** If an organization reports the same users at several nested levels (national, regional, metro, store or campaign), total exposure for one person is the sum of the level budgets ($\rho$ adds), while sibling nodes at one level compose in parallel ([[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]). So "more levels" is not free: adding a granular level dilutes the budget for every other level.
2. **Accuracy for aggregates is cheap; accuracy for after-the-fact slices is expensive.** Appendix A.1 shows variance 5,892,698 for a national total built from block-level noise versus 6 when measured directly. Any marketing readout whose segments are defined after the data release (custom audiences, ad-hoc geographies) behaves like the paper's *off-spine* entities, whose error grows with off-spine distance ([[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]]).
3. **Post-processing is free, but the constraints you impose create bias.** Enforcing non-negativity and integrality on noisy counts biases small cells upward and large cells downward ([[Abowd 2022 - Utility Experiments]]). A marketing pipeline that clips noisy conversion counts at zero before feeding an MMM or a lift model inherits the same bias; the unclipped, noise-variance-known measurements are the cleaner input.
4. **Model the known noise instead of ignoring it.** Because the mechanism's noise distribution is public (the paper calls TDA "inference-valid"), a Bayesian measurement-error model can use the noisy measurement $\tilde M=Qx+y$ with known variance $\sigma^2=1/\rho_g$ directly, as in the posterior-sampling approaches the paper cites. For a Bayesian MMM this means treating a DP-noised KPI as an observation with a known extra variance term; see [[Bayesian Media Mix Modeling - Overview]] and [[Hierarchical Models]].
5. **Hierarchical reconciliation.** The estimation phase is inverse-variance-weighted least squares with aggregation constraints, the same structure as forecast reconciliation ([[Hierarchical Forecast Reconciliation (MinT)]]) with non-negativity and integrality added.
6. **Transparency and tuning discipline.** Publishing the mechanism and parameters (but not the random draws) is part of the guarantee, in contrast to methods with secret parameters. Tuning on the same private data leaks information, so parameters should be tuned on public, historical or synthetic data, as the census tuned on 2010 data ([[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]).
7. **Invariants are a policy risk.** Holding some totals exact (for instance total spend or total conversions) is simple and useful for reconciliation, but, as the paper stresses, it steps outside the formal guarantee for those quantities.
8. **Experiments.** Lift and geo-experiment readouts are aggregate; how a platform adds noise or thresholds them is outside this source. For the experiment side see [[Conversion Lift Studies on Ad Platforms]] and [[Geo-Experiment Methodology - Overview]].

## Examples

> [!example] Level budget dilution
> Setup (illustrative): a measurement partner wants to publish conversions at 4 nested levels with total $\rho=1$, same queries at each.
> Solution: using the census convention that a marginal query group of $L_2$ sensitivity $\sqrt2$ gets noise variance $\sigma^2=1/\rho_g$: an equal split gives $\rho_g=0.25$ per level, so $\sigma^2=4$ per cell at each level. Adding a fifth level at equal split moves each level to $\rho_g=0.2$, so $\sigma^2=5$: 25% more noise variance everywhere.
> Interpretation: each added level taxes all others; allocating non-uniformly, as TDA does (about half to blocks for persons in April 2021), is a design decision about where accuracy matters. The numbers are arithmetic illustrations only.
^ex-level-dilution

## Connections

- DP training analogue with a quantified accountant: [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]].
- Communicating guarantees as attacker power: [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]].
- Per-order budget curves for many heterogeneous reports: [[Mironov 2017 - Discussion, Budget Curves and Open Questions]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Utility Experiments]]
