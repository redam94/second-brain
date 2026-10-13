---
title: Gordon et al 2019 - Conclusions, Caveats and Related Literature
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) Abstract; §1 pp. 1-4 (contributions, LaLonde/Imbens, prior ad benchmarks, fn. 2, 4); §4 p. 13 (matching applications), pp. 13-14 fn. 12-13 (vendors, case studies); §8 fn. 23; §9 Conclusion pp. 41-42; References pp. 43-47"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]"
  - "[[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]"
used_by:
  - "[[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Gordon 2019 Conclusion
  - LaLonde Critique for Digital Advertising
---

# Gordon et al 2019 - Conclusions, Caveats and Related Literature

> [!summary]
> How Gordon et al. (2019) frame and qualify their findings. **Three contributions:** (1) evidence that observational methods using good individual-level industry data are *not* "good enough" for ad measurement; (2) a characterization of how strong a missing covariate would have to be; (3) an update of LaLonde's (1986) experimental-vs-observational comparison for a setting where an ML targeting engine, rather than self-selection into a program, drives treatment. **Caveats:** only 15 non-representative studies, so the characteristics behind large biases cannot be identified. Facebook's closed, logged-in system is an *easier* case than open-web real-time bidding. And the authors did not see all of Facebook's delivery data, which Facebook itself may not log. **Outlook:** as targeting gets more algorithmic, observational data requirements will grow, which argues for building experimentation into targeting platforms.

^summary-gordon-et-al-2019-conclusions-caveats-an

## Overview

The conclusion (§9) restates the results and sets the scope. Section 1 places the work in two literatures: within-study comparisons that start with LaLonde, and earlier ad-effect benchmarks. These framing points matter when using the paper as evidence. It shows that common observational practice failed on *this* platform with *these* data. It does not claim every possible observational design must fail.

## Main Content

### Conclusions (§9)

- "on average, a significant discrepancy exists between the observational approaches and RCTs". Methods mostly overestimate and sometimes significantly underestimate. "In 50% of our studies, the estimated percentage increase in purchase outcomes is off by a factor of three across all methods" (§9, p. 41).
- "With our small number of studies, we could not identify campaign characteristics that are associated with strong biases." The 663-experiment follow-up later did this with random-forest partial dependence ([[Experimental Benchmarks for Observational Ad Measurement]]).
- Registration and page-view lifts are approximated better than purchase lifts. No method consistently dominates.
- **Contribution 1.** Contrary to the industry view, "the methods we study yield biased estimates of causal effects of advertising in a majority of cases". Unlike earlier academic examples, the errors go both ways (over and under), and "these biases persist even after conditioning on a rich set of observables and using a variety of flexible estimation methods" (pp. 41-42).
- **Contribution 2.** "In more than half the cases, the additional data would need to be as strong as one or two of our better-performing variables sets; obtaining such data is likely not trivial" (p. 42). See [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]].
- **Contribution 3.** Whether two decades of progress in observational causal methods (Imbens & Rubin 2015) suffice to replicate experiments in an industry that relies on them: "We found they do not—at least not with the data at our disposal."

### Caveats (§9, p. 42)

1. **Methods are only as good as the data.** The data are strong in sample size, observables and cross-device tracking.
2. **This is a favorable environment.** Facebook's "closed system makes solving selection issues an easier problem" because advertisers bid on similar information. In **real-time-bidding display**, advertisers often have *private* information (their own or from third-party data providers) that shapes bidding and creates confounding an analyst cannot see.
3. **Not all of Facebook's data.** The data "do not encompass all the data Facebook relies on in its ad-delivery system, nor does Facebook necessarily log or retain all these data for future analysis. Better data, potentially requiring additional logging, could help." The 2023 follow-up makes this concrete: deconfounding would need auction-level participation, win and impression probabilities, which are not retained.
4. **Sample.** Fifteen hand-picked studies (no retargeting, at least 1M users). They are not representative of Facebook advertising ([[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]]).
5. **Measurement scope.** The ATT is conditional on the platform's optimizer (fn. 10) and on market conditions (§2.2). Outcome windows end weeks after the campaign, so long-run effects are excluded (fn. 19).

### Outlook (§1, p. 2)

The paper presents itself as "a preview of what might come next in marketing science". Strong, high-dimensional, algorithm-driven selection will spread from advertising to pricing, promotions and inventory optimization. "Thus, the data requirements necessary to use observational models will continue to grow, increasing the need to develop and integrate experimentation directly into any targeting platform."

### Related literature (§1, fn. 2, 4, 12, 23)

> [!definition] Within-study comparison lineage (§1, p. 3)
> - **LaLonde (1986)** compared observational estimators with a job-training RCT and concluded that "many of the econometric procedures do not replicate the experimentally determined results" (quoted in §1, p. 3).
> - **Imbens (2015)** showed that modern matching methods applied to the LaLonde data *do* replicate the experiment. There the problem was that trainees differed from a comparison group drawn from the population.
> - **Why advertising is harder.** "Because of targeting, the endogeneity problems associated with digital advertising are potentially more severe: advertising exposure is determined by a sophisticated machine-learning algorithm using detailed data on individual user behavior" (p. 3).

^def-g19-lalonde

**Earlier ad-effect benchmarks:**
- **Lewis, Rao & Reiley (2011)** were the first to compare RCT estimates with exposed-vs-unexposed and regression estimates. Their experiment exposed 95% of US traffic, so the comparison group had to be matched *international* unexposed users ([[Observational vs Experimental Methods in Advertising]], [[Activity Bias in Advertising]]).
- **Blake, Nosko & Tadelis (2015)** showed non-experimental measurement can lead to highly suboptimal paid-search spending. Their benchmark was a difference-in-differences across **210 media markets**, so it "cannot implement individual-level causal inference methods" ([[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]]).
- **Outside advertising** (fn. 4): voter mobilization (Arceneaux, Gerber & Green 2010) and water-use reduction (Ferraro & Miranda 2014, 2017) compared observational and experimental estimates of message effects.

**The RCT ad-measurement literature** (fn. 2): Lewis & Reiley (2014); Johnson, Lewis & Reiley (2016, 2017); Kalyanam et al. (2018) on search ads and offline retail; Johnson, Lewis & Nubbemeyer (2017a, b), i.e. ghost ads and the 432-experiment meta-study; Sahni (2015); Sahni & Nair (2016); Goldfarb & Tucker (2011); and the review by Lewis, Rao & Reiley (2015). Vault coverage: [[Intent-to-Treat, PSA and Ghost Ad Designs]], [[Predicted Ghost Ads and Ghost Bids Mechanics]], [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]].

**Academic applications of matching** (§4, p. 13): Draganska, Hartmann & Stanglein (2014) on internet vs TV brand building; Kumar, Bezawada, Rishika, Janakiraman & Kannan (2016) on firm-generated social content; Bronnenberg, Dubé & Mela (2010) on DVRs and sales of advertised products; Rubin & Waterman (2007) on pharmaceutical detailing; Cooper, Gulen & Rau (2005) on mutual-fund name changes and inflows; Ellickson, Collins, Hambarsoomians & McCaffrey (2005) on alcohol advertising and adolescents.

**Industry vendors** (§4, pp. 13-14, fn. 13): comScore, Nielsen and Nielsen Catalina Solutions "all rely on matching and regression methods". Supporting citations: Abraham (2008), comScore (2010, AdEffx Smart Control), Klein & Wood (2013, NCS/Time Inc.), Berkovich & Wood (2016, Nielsen). Footnote 13 points to two NCS case studies (a streaming-audio toaster-pastry campaign whose URL advertises "3x ROAS", and a frozen-entrées campaign), which the paper cites as examples without evaluating them. Full table: [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]].

**Methods not tried** (fn. 12): covariate-balancing propensity scores (Imai & Ratkovic 2014), optimization-based matching and stable balancing weights (Zubizarreta 2012, 2015), and approximate residual balancing (Athey, Imbens & Wager). The DML follow-up is in [[Experimental Benchmarks for Observational Ad Measurement]] and [[DML Estimators for ATE and the Interactive Model]].

**Selection-on-observables-informs-unobservables bounds** (fn. 23): Murphy & Topel (1990); Altonji, Elder & Taber (2005); Oster.

## Examples

> [!example] Applying the caveats to an aggregate media model (generic)
> A team calibrates a Bayesian media-mix model with a platform lift test and also has an exposure-based attribution feed from the same platform. Gordon et al. suggest: (i) treat the lift test as the causal anchor but as *local* (one platform, one optimizer state, short window); (ii) treat the attribution feed as **selection-contaminated**, likely overstated, but with unknown sign in any single campaign, so it should not be used as a prior; (iii) expect the problem to be worse for open-web programmatic buys, where bidders' private data add confounding. See [[Bayesian Estimation and Priors for MMM]] and [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].

^exa-g19-conclusions-caveats-1

## Connections

- [[Gordon et al 2019 - Reference List and Cited Literature]] — the full 69-entry reference list, grouped by role, with citing pages.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — the paper is a reminder that algorithmic prediction of who gets treated (the targeting engine, the match score) is not causal identification.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — once targeting optimizes a proxy outcome, exposure-based metrics stop measuring incrementality.
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — an outside RCT benchmark is the strongest form of the "effective challenge" model-risk guidance asks for.
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — simulation offers another known-truth benchmark, at the aggregate level.

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Experimental Benchmarks for Observational Ad Measurement]]
- [[User-Level vs Geo-Level Experiments - When to Use Which]]
- [[Blake 2015 - Non-Brand DMA Geo Experiment and DiD Estimates]] — the 210-media-market DiD remark
